// Guards how a link of a response leaves the page (1.5.4).
//
// The bug: `[site](https://example.com)` in a bot's answer looked dead in the desktop app. An `<a href>` the window
// follows leaves the app (its router is a hash router) or does nothing at all; a `javascript:` URL, one the parser let
// through with `safeHref`, would run in the page. The rule this file keeps:
//
//   - the anchor is a real `<a href>` (accessibility, ⌘-click, "copy link", the pointer's underline) whose click is
//     intercepted — `preventDefault()` and `stopPropagation()`, so the bubble under it never sees the click;
//   - the address leaves through the host's OS door, `ctx.os.openExternal(url)`; `window.open(url, '_blank',
//     'noopener,noreferrer')` is the answer when the door is missing (the Webapp, an SDK that predates it);
//   - only http(s) and mailto are links at all: `javascript:`, `file:`, `data:` and a relative path render as their
//     label, so nothing that cannot be opened is offered as a link.
//
//   node scripts/check-links.mjs
//
// Exits 1 with one line per problem, 0 otherwise. Run by `npm run build`.
import { build } from 'esbuild'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const RESPONSE = join(ROOT, 'src/components/glaze/ai/response.tsx')
const DOOR = join(ROOT, 'src/lib/open-link.ts')

const problems = []
const fail = (file, node, message) => {
  const pos = node ? node.getStart(file.source) : 0
  const { line, character } = ts.getLineAndCharacterOfPosition(file.source, pos)
  problems.push(`${relative(ROOT, file.path)}:${line + 1}:${character + 1}: ${message}`)
}

function parse(path) {
  const text = readFileSync(path, 'utf8')
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  return { path, text, source }
}

/** Every node of the tree, pre-order. */
function walk(node, run) {
  run(node)
  node.forEachChild(child => walk(child, run))
}

function tagOf(node) {
  if (ts.isJsxElement(node)) return node.openingElement.tagName.getText().replace(/[<>]/g, '').trim()
  if (ts.isJsxSelfClosingElement(node)) return node.tagName.getText().replace(/[<>]/g, '').trim()
  return ''
}

/** The text of one JSX attribute, or ''. */
function attributeOf(element, name) {
  for (const attr of element.openingElement.attributes.properties) {
    if (!ts.isJsxAttribute(attr) || attr.name.getText() !== name) continue
    return attr.initializer ? attr.initializer.getText() : 'true'
  }
  return ''
}

/** The first function / arrow declaration named `name`, or null. */
function functionNamed(file, name) {
  let hit = null
  walk(file.source, node => {
    if (hit) return
    if (ts.isFunctionDeclaration(node) && node.name?.getText() === name) hit = node
    if (ts.isVariableDeclaration(node) && node.name.getText() === name) hit = node
  })
  return hit
}

/* ------------------------------------------------------------------ the source -- */

const response = parse(RESPONSE)

if (!/from ['"]@\/lib\/open-link['"]/.test(response.text)) {
  fail(response, null, 'Response does not import the OS door (@/lib/open-link): its links would be followed by the window, which is what breaks the page')
}

// The anchor: a real <a href>, with the click intercepted by the door's handler.
const inlines = []
walk(response.source, node => {
  if (ts.isFunctionDeclaration(node) && node.name?.getText() === 'Inline') inlines.push(node)
})
const inInline = node => inlines.some(fn => fn.pos <= node.pos && node.end <= fn.end)

let anchor = null
walk(response.source, node => {
  if (anchor) return
  if (tagOf(node) === 'a' && inInline(node)) anchor = node
})
if (!anchor) {
  fail(response, null, 'no <a> in Inline: a markdown link would render as plain text')
} else {
  if (!attributeOf(anchor, 'href')) {
    fail(response, anchor, 'the link anchor carries no href: the element must stay a real link (⌘-click, right-click, hover)')
  }
  const click = attributeOf(anchor, 'onClick')
  if (!click) {
    fail(response, anchor, 'the link anchor has no onClick: the window follows the href, and the app leaves itself')
  } else if (!click.includes('followLink(')) {
    fail(response, anchor, `the link anchor's onClick is "${click}", not the door's followLink: nothing would take the click from the window`)
  }
}

// One rule for "is this a link": the response's own scheme test must be the door's.
const safe = functionNamed(response, 'safeHref')
if (!safe) {
  fail(response, null, 'safeHref is gone: no single place decides which addresses are links')
} else if (!safe.getText().includes('isOpenableLink(')) {
  fail(response, safe, 'safeHref does not use the door\'s isOpenableLink: a javascript: or a relative address would render as a link that cannot be opened')
}

if (/\bwindow\s*\.\s*open\b/.test(response.text)) {
  fail(response, null, 'Response opens windows itself: the fallback belongs in the door (src/lib/open-link.ts), not in the renderer')
}

if (!existsSync(DOOR)) {
  problems.push('src/lib/open-link.ts:1:1: the OS door is gone: a response\'s link has no way out of the page')
}
const door = existsSync(DOOR) ? parse(DOOR) : { path: DOOR, text: '', source: null }
const openFn = door.source ? functionNamed(door, 'openLink') : null
if (!openFn) {
  problems.push('src/lib/open-link.ts:1:1: openLink is gone: a response link has no way out of the page')
} else {
  const body = openFn.getText()
  if (!body.includes('openExternal')) fail(door, openFn, 'openLink never calls ctx.os.openExternal: the desktop app would still follow the link in its own window')
  if (!body.includes('open(')) fail(door, openFn, 'openLink has no window.open fallback: the Webapp and an older SDK would lose the link')
  if (!body.includes('noopener,noreferrer')) fail(door, openFn, `openLink's fallback does not ask for 'noopener,noreferrer': the opened page would keep a handle on this one`)
}
const followFn = door.source ? functionNamed(door, 'followLink') : null
if (!followFn) {
  problems.push('src/lib/open-link.ts:1:1: followLink is gone: the anchor has no click handler')
} else {
  const body = followFn.getText()
  for (const call of ['preventDefault', 'stopPropagation']) {
    if (!body.includes(call)) fail(door, followFn, `followLink never calls ${call}(): the click would reach the window (or the bubble under the link)`)
  }
}

if (problems.length) {
  for (const problem of problems) console.error(problem)
  console.error(`\ncheck-links: ${problems.length} problem(s) — a link of a response goes through the host's OS door, never through the window.`)
  process.exit(1)
}

/* ------------------------------------------------------- the behaviour, run for real -- */

const scratch = process.env.HUI_SCRATCH || join(ROOT, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-links.bundle.mjs')

const ENTRY = `
export { bindOsDoor, followLink, isOpenableLink, openLink } from '@/lib/open-link'
export { Response } from '@/components/glaze/ai/response'
`

let runtime
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: ROOT, sourcefile: 'check-links-entry.tsx', loader: 'tsx' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: { '@hermes/plugin-sdk': join(ROOT, 'scripts', 'fixtures', 'sdk-stub.mjs'), '@': resolve(ROOT, 'src') },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  runtime = await import(pathToFileURL(outfile).href)
} catch (error) {
  console.error('FAIL the link path cannot be run at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-links: 1 problem — a response\'s links cannot be exercised.')
  process.exit(1)
}

const { bindOsDoor, followLink, openLink, Response } = runtime
const { createElement } = await import('react')
const { renderToStaticMarkup } = await import('react-dom/server')

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

/** What the desktop hands `os.openExternal`: a Promise<boolean>, and every address it was asked for. */
const opened = []
bindOsDoor({ os: { openExternal: url => {
  opened.push(url)
  return Promise.resolve(true)
} } })

const TEXT = 'See [site](https://example.com) and [mail](mailto:a@b.c) and [x](javascript:alert(1)) and [path](/hui/x) and [file](file:///etc/passwd).'
const html = renderToStaticMarkup(createElement(Response, {}, TEXT))

const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>/g)].map(match => match[1])
check(
  'le rendu garde de vrais liens pour http(s) et mailto',
  anchors.includes('https://example.com') && anchors.includes('mailto:a@b.c'),
  anchors.join(', ') || 'aucune ancre'
)
check(
  'javascript:, file: et un chemin relatif ne sont pas des liens',
  !anchors.some(href => /^(javascript|file|data):/i.test(href)) && !anchors.includes('/hui/x'),
  anchors.join(', ') || 'aucune ancre'
)
check(
  'le libellé d’un lien refusé reste lisible',
  /\sand x and path and file\./.test(html),
  html.slice(0, 140)
)

/** A click as React hands it to the anchor: the two methods it may call, and what they did. */
function click() {
  const event = { defaultPrevented: false, stopped: false }
  event.preventDefault = () => { event.defaultPrevented = true }
  event.stopPropagation = () => { event.stopped = true }
  return event
}

const web = click()
followLink(web, 'https://example.com')
check('un clic sur un lien web part à la porte OS', opened.includes('https://example.com'), opened.join(', ') || 'rien')
check('le clic est pris à la fenêtre', web.defaultPrevented === true && web.stopped === true, `defaultPrevented=${web.defaultPrevented} stopped=${web.stopped}`)

const mail = click()
followLink(mail, 'mailto:a@b.c')
check('mailto part aussi à la porte OS', opened.includes('mailto:a@b.c'), opened.join(', ') || 'rien')
check('le clic mailto est pris à la fenêtre', mail.defaultPrevented === true && mail.stopped === true)

const before = opened.length
const script = click()
followLink(script, 'javascript:alert(1)')
const file = click()
followLink(file, 'file:///etc/passwd')
const local = click()
followLink(local, '/hui/x')
check(
  'javascript:, file: et un chemin relatif ne sont jamais ouverts',
  opened.length === before,
  opened.slice(before).join(', ') || 'rien de plus'
)
check('le clic refusé est quand même pris à la fenêtre', script.defaultPrevented && file.defaultPrevented && local.defaultPrevented)

check('http(s) et mailto sont les seuls schémas ouverts', openLink('https://a.b') === true && openLink('http://a.b') === true && openLink('mailto:a@b.c') === true && openLink('javascript:1') === false && openLink('#top') === false)

// The Webapp, and an SDK older than the door: the window's own open, asked the same way.
bindOsDoor(null)
const windows = []
globalThis.window = { open: (...args) => { windows.push(args); return {} } }
const fallback = openLink('https://example.com/docs')
delete globalThis.window
check(
  'sans porte, le lien part à window.open en onglet neuf',
  fallback === true && windows.length === 1 && windows[0][0] === 'https://example.com/docs' && windows[0][1] === '_blank' && String(windows[0][2]).includes('noopener') && String(windows[0][2]).includes('noreferrer'),
  JSON.stringify(windows) || 'rien'
)

/* ------------------------------------------------------------------- the report -- */

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`)
}

if (failed) {
  console.error(`\ncheck-links: ${failed} problem(s) — a response's link is a real anchor whose click goes to the host's OS door, and only http(s) and mailto are links.`)
  process.exit(1)
}
console.log('check-links: OK — a response\'s http(s) and mailto links leave through ctx.os.openExternal with the click taken from the window, javascript: and file: stay text, and window.open is the fallback.')
