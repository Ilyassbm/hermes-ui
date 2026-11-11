// Guards the rule that took the lot 6 menus down in the app: a `DropdownMenuTrigger` must be a real button, and a
// clickable container must not also be a trigger.
//
// What was seen in the Webapp, with real pointer events: the model picker (`.hui-model-trigger`) and the
// button opened on focus + Enter but not on a click — or opened and closed at once. Base UI's `Menu.Trigger` takes
// `nativeButton` (default true): with a `<div role="button">` in `render`, the component warns that it expected a
// native `<button>`, keyboard activation is skipped, and the document mouseup that follows the click re-closes the
// popup the click had just opened. A second trigger around a clickable row (a bot tile with its own `onClick`) is the
// same failure from the other side: the left click that selects the bot also opens or closes the context menu.
//
// So two static rules, parsed with the TypeScript AST (no regex, no browser):
//   1. a `DropdownMenuTrigger` with `render=` must render a native `<button>` (or one of the components below, which
//      render one through Base UI's Button), or carry `nativeButton={false}`;
//   2. a JSX element that contains a `DropdownMenuTrigger` must not carry `onClick` / `onPointerDown` of its own.
//
//   node scripts/check-menu-open.mjs            # src
//   node scripts/check-menu-open.mjs src/app    # one folder
//   node scripts/check-menu-open.mjs --list     # every file that was read
//
// Exits 1 with one line per problem (`path:line:col: what and why`), 0 otherwise. Run by `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const DEFAULT_ROOTS = ['src']

export const TRIGGER = 'DropdownMenuTrigger'

/** Renders a native `<button>` once mounted: the DOM tag, and the Glaze components documented to render one. */
export const NATIVE_RENDERS = new Set(['button', 'Button', 'PromptInputModel'])

/** Handlers that make a container clickable: a trigger inside one fights the click for the same press. */
export const CLICK_HANDLERS = new Set(['onClick', 'onPointerDown'])

/** Every `.tsx` under `dir`, recursively, sorted. */
function tsxFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) out.push(...tsxFiles(path))
    else if (entry.endsWith('.tsx')) out.push(path)
  }
  return out
}

/** The tag as written, without punctuation: `Button`, `Menu.Item`, `div`. */
function tagName(node) {
  const tag = node.tagName
  if (!tag) return ''
  return tag.getText().replace(/^<|>$/g, '').trim()
}

/** The attributes of a JSX opening element, by name. */
function attributesOf(opening) {
  const map = new Map()
  for (const attr of opening.attributes.properties) {
    if (!ts.isJsxAttribute(attr) || !attr.name) continue
    map.set(attr.name.getText(), attr)
  }
  return map
}

/** The JSX element a `render={...}` attribute holds, or null when it is an identifier or nothing. */
function renderedElement(attr) {
  let value = attr.initializer
  if (!value) return null
  if (ts.isJsxExpression(value) && value.expression) {
    value = value.expression
    if (ts.isParenthesizedExpression(value)) value = value.expression
  }
  if (ts.isJsxSelfClosingElement(value)) return value
  if (ts.isJsxElement(value)) return value.openingElement
  return null
}

/**
 * The rule-1 problems in one file's text: a trigger whose render element is not a native button.
 * @returns {{line: number, column: number, message: string}[]}
 */
export function findTriggersOutsideButtons(fileName, text) {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const found = []

  const walk = node => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node
      if (tagName(opening) === TRIGGER) {
        const attrs = attributesOf(opening)
        const render = attrs.get('render')
        const nativeOff = attrs.get('nativeButton')
        const nativeFalse = nativeOff && nativeOff.initializer?.getText().replace(/[{}]/g, '').trim() === 'false'
        if (render && !nativeFalse) {
          const element = renderedElement(render)
          const tag = element ? tagName(element) : ''
          if (!element || !NATIVE_RENDERS.has(tag)) {
            const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source))
            found.push({
              line: line + 1,
              column: character + 1,
              message: element
                ? `render={<${tag} …>} is not a native <button>; use <button type="button"> (or add nativeButton={false})`
                : 'render= does not name an element; use <button type="button"> (or add nativeButton={false})'
            })
          }
        }
      }
    }
    ts.forEachChild(node, walk)
  }

  walk(source)
  return found
}

/**
 * The rule-2 problems in one file's text: a trigger inside an element that handles the click itself.
 * @returns {{line: number, column: number, message: string}[]}
 */
export function findTriggersInClickableContainers(fileName, text) {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const found = []
  /** The open JSX elements above the node being walked: their tags and the click handlers they carry. */
  let stack = []

  const visit = node => {
    let pushed = false
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = ts.isJsxElement(node) ? node.openingElement : node
      const tag = tagName(opening)
      if (tag === TRIGGER) {
        const clickable = stack.find(entry => entry.handlers.length)
        if (clickable) {
          const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source))
          found.push({
            line: line + 1,
            column: character + 1,
            message: `<${clickable.tag}> contains a <${TRIGGER}> and its own ${clickable.handlers.join(', ')}: the same click both activates the container and opens/closes the menu. Open the menu from the container's onContextMenu with a controlled open + anchor.`
          })
        }
      }
      const handlers = []
      for (const name of CLICK_HANDLERS) if (attributesOf(opening).has(name)) handlers.push(name)
      stack = [...stack, { tag, handlers }]
      pushed = true
    }
    ts.forEachChild(node, visit)
    if (pushed) stack = stack.slice(0, -1)
  }

  visit(source)
  return found
}

/** Runs both rules over folders (relative to the repo root). */
export function checkMenuOpen(roots = DEFAULT_ROOTS) {
  const problems = []
  for (const dir of roots) {
    const abs = resolve(ROOT, dir)
    let files = []
    try {
      files = tsxFiles(abs)
    } catch {
      continue // a folder this lot does not have yet
    }
    for (const file of files) {
      const text = readFileSync(file, 'utf8')
      for (const hit of [...findTriggersOutsideButtons(file, text), ...findTriggersInClickableContainers(file, text)]) {
        problems.push({ file: relative(ROOT, file), line: hit.line, column: hit.column, message: hit.message })
      }
    }
  }
  return problems
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
  const roots = args.length ? args : DEFAULT_ROOTS
  if (process.argv.includes('--list')) {
    for (const dir of roots) for (const file of tsxFiles(resolve(ROOT, dir))) console.log(relative(ROOT, file))
  }
  const problems = checkMenuOpen(roots)
  if (problems.length) {
    console.error(`check-menu-open: ${problems.length} problem(s)`)
    for (const p of problems) console.error(`  ${p.file}:${p.line}:${p.column}: ${p.message}`)
    process.exit(1)
  }
  console.log(`check-menu-open: OK — every <${TRIGGER}> renders a native button, none sits in a clickable container (${roots.join(', ')})`)
}
