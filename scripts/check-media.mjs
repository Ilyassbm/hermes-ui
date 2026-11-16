// Guards the images of an answer: every way the bot can point at a picture has to become a picture in the thread.
//
// The bug: the thread only knew a `MEDIA:/path` that sat alone on its line. A markdown image — `![chart](/tmp/c.png)`,
// `![chart](https://…/c.png)`, `![chart](file:///tmp/c.png)` — went to the markdown renderer, which has no image rule
// and printed `!chart`; a `MEDIA:/path` in the middle of a sentence stayed raw text. The picture was there, the answer
// said so, and the page showed a word.
//
// What it does, with no browser and no gateway (esbuild bundles the real modules for node):
//   1. cuts answers the way the thread does (`splitMedia`) and checks which pieces are pictures and which stay text;
//   2. leaves alone what must stay text: a fenced block, inline code, a markdown *link* to a MEDIA path, a relative path;
//   3. renders an answer with a web image (React's server renderer) and checks it is an <img> that sends no referrer.
//
//   node scripts/check-media.mjs
//
// Exits 1 with one line per failed check, 0 otherwise. Run by `npm run build`.
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-media.bundle.mjs')

const ENTRY = `
import { MessageText, splitMedia } from '@/app/thread/media'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export { splitMedia }
export const render = text => renderToStaticMarkup(React.createElement(MessageText, { text }))
`

let mod
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-media-entry.tsx', loader: 'tsx' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: {
      '@hermes/plugin-sdk': join(root, 'scripts', 'fixtures', 'sdk-stub.mjs'),
      '@': resolve(root, 'src')
    },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  mod = await import(pathToFileURL(outfile).href)
} catch (error) {
  console.error('FAIL the thread cannot be mounted at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-media: 1 problem — a picture has nowhere to go.')
  process.exit(1)
}

const { render, splitMedia } = mod
const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

const shape = text =>
  splitMedia(text)
    .map(piece => (piece.kind === 'media' ? `media(${piece.paths.join(',')})` : `text(${piece.text})`))
    .join(' | ')

/* ------------------------------------------------ 1. every way to point at a picture -- */

const cases = [
  ['une image markdown au chemin absolu', '![chart](/tmp/a/shot.png)', 'media(/tmp/a/shot.png)'],
  ['… au milieu d’une phrase', 'Look: ![x](/tmp/a.png) nice', 'text(Look:) | media(/tmp/a.png) | text(nice)'],
  ['… en file:// (avec un espace encodé)', '![x](file:///tmp/a%20b.png)', 'media(/tmp/a b.png)'],
  ['… avec un titre', '![x](/tmp/a.png "A title")', 'media(/tmp/a.png)'],
  ['… dont le chemin est donné par MEDIA:', '![x](MEDIA:/tmp/a.png)', 'media(/tmp/a.png)'],
  ['une image web', '![x](https://example.com/a.png?x=1)', 'media(https://example.com/a.png?x=1)'],
  ['un MEDIA: collé dans une phrase', 'see MEDIA:/tmp/a.png please', 'text(see) | media(/tmp/a.png) | text(please)'],
  ['deux images à la suite font un seul bloc', '![a](/tmp/a.png)\n![b](/tmp/b.png)', 'media(/tmp/a.png,/tmp/b.png)'],
  ['un MEDIA: seul sur sa ligne marche toujours', 'Here:\n\nMEDIA:/tmp/a.png\n', 'text(Here:) | media(/tmp/a.png)']
]
for (const [name, text, want] of cases) {
  const got = shape(text)
  check(name, got === want, got === want ? want : `got ${got} — want ${want}`)
}

/* ------------------------------------------------------ 2. what must stay text -- */

const stays = [
  ['un bloc de code garde son image en texte', '```md\n![x](/tmp/a.png)\n```'],
  ['du code en ligne aussi', 'write `![x](/tmp/a.png)` to embed it'],
  ['un lien markdown vers un chemin MEDIA reste un lien', 'See [Script v2](MEDIA:/tmp/script.md) now'],
  ['un chemin relatif n’est pas une image qu’on sait lire', '![x](images/a.png)'],
  ['une image à demi arrivée reste du texte', '![x](/tmp/a.p']
]
for (const [name, text] of stays) {
  const pieces = splitMedia(text)
  check(name, pieces.length === 1 && pieces[0].kind === 'text', shape(text))
}

/* ------------------------------------------------------- 3. the web image renders -- */

const web = render('Here it is:\n\n![chart](https://example.com/c.png)\n\nDone.')
check('une image web devient une balise <img>', /<img[^>]+src="https:\/\/example\.com\/c\.png"/.test(web), web.slice(0, 160))
check('qui n’envoie pas de referrer', /referrerpolicy="no-referrer"/i.test(web), (web.match(/<img[^>]*>/) || [''])[0].slice(0, 160))
check('et qui ne laisse ni « !chart » ni un « ! » devant un lien', !/!chart|!<a /.test(web), web.slice(0, 160))

/* ------------------------------------------------------------------- the report -- */

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`)
}
if (failed) {
  console.error(`\ncheck-media: ${failed} problem(s) — a picture the bot points at has to be a picture in the thread.`)
  process.exit(1)
}
console.log(`check-media: OK — ${results.length} checks: markdown images (local, file://, web), MEDIA: in a sentence, code left alone, no referrer on a web image.`)
