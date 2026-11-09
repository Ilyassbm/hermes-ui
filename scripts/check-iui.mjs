// Checks the Intelligent UI path without a browser: the catalogue accepts the three shipped specs, cuts a spec to its
// limits, refuses an image source it will not load and drops a type it does not know.
//
// Bundles src/app/iui (catalogue, spec sanitiser, examples) with esbuild into the scratch cache — no React, no DOM, no
// react-dom — then runs the same functions the thread runs. Exit 1 on any failed check.
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HERMES_UI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, `iui-check-${process.pid}.mjs`)
mkdirSync(scratch, { recursive: true })

await build({
  stdin: {
    contents: [
      "export { catalog } from '@/app/iui/catalog'",
      "export { sanitizeSpec, parseSpec, LIMITS } from '@/app/iui/spec'",
      "export { EXAMPLES } from '@/app/iui/examples'"
    ].join('\n'),
    resolveDir: root,
    sourcefile: 'check-iui-entry.ts',
    loader: 'ts'
  },
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  alias: { '@': resolve(root, 'src') },
  logLevel: 'error'
})

const mod = await import(pathToFileURL(outfile).href)
const { catalog, sanitizeSpec, LIMITS, EXAMPLES } = mod

const results = []
const check = (name, ok, detail = '') => {
  results.push({ name, ok, detail })
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? ` — ${detail}` : ''}`)
}

// 1. The three examples, through the catalogue's own zod schema.
for (const example of EXAMPLES) {
  const spec = JSON.parse(example.json)
  const verdict = catalog.validate(spec)
  check(`exemple « ${example.id} » valide pour le catalogue`, verdict.success, verdict.success ? `${Object.keys(spec.elements).length} éléments` : JSON.stringify(verdict.error?.issues?.slice(0, 3)))
}

// 2. A type the catalogue does not hold: refused by zod, and drawn as its children only by the sanitiser.
const unknown = { root: 'r', elements: { r: { type: 'Hologram', props: {}, children: ['t'] }, t: { type: 'Text', props: { text: 'Bonjour' } } } }
const unknownVerdict = catalog.validate(unknown)
check('type inconnu refusé par le catalogue', !unknownVerdict.success, unknownVerdict.error?.issues?.[0]?.message ?? '')
const unknownClean = sanitizeSpec(unknown)
check(
  'type inconnu assaini : élément gardé, enfants rendus par le fallback',
  Boolean(unknownClean.spec) && unknownClean.spec.elements.r.type === 'Hologram' && unknownClean.spec.elements.r.children?.[0] === 't',
  'le registre dessine les enfants, pas l’élément'
)

// 3. An image whose source is javascript: is dropped with its element, and the rest of the spec still draws.
const badImage = {
  root: 'r',
  elements: {
    r: { type: 'Stack', props: { direction: 'column' }, children: ['i', 't'] },
    i: { type: 'Image', props: { src: 'javascript:alert(1)', alt: 'x' } },
    t: { type: 'Text', props: { text: 'Le reste tient.' } }
  }
}
const badImageClean = sanitizeSpec(badImage)
check(
  'Image en javascript: refusée',
  Boolean(badImageClean.spec) && !badImageClean.spec.elements.i && badImageClean.spec.elements.r.children?.join() === 't',
  badImageClean.issues.map(issue => issue.reason).join(', ')
)
const dataImage = sanitizeSpec({ root: 'r', elements: { r: { type: 'Image', props: { src: 'data:text/html;base64,PHNjcmlwdD4=', alt: 'x' } } } })
check('Image data:text/html refusée', !dataImage.spec, dataImage.issues.map(issue => issue.reason).join(', '))
const pngImage = sanitizeSpec({ root: 'r', elements: { r: { type: 'Image', props: { src: 'data:image/png;base64,iVBORw0KGgo=', alt: 'capture' } } } })
check('Image data:image/png acceptée', Boolean(pngImage.spec), 'png, jpeg et webp seulement')

// 4. Five hundred elements: cut at the limit, reachable first, the spec still renders.
const big = { root: 'e0', elements: { e0: { type: 'Stack', props: { direction: 'column' }, children: [] } } }
for (let i = 1; i < 500; i++) {
  big.elements[`e${i}`] = { type: 'Text', props: { text: `ligne ${i}` } }
  big.elements.e0.children.push(`e${i}`)
}
const bigClean = sanitizeSpec(big)
const bigCount = bigClean.spec ? Object.keys(bigClean.spec.elements).length : 0
check(`500 éléments coupés à ${LIMITS.elements}`, bigCount === LIMITS.elements, `${bigCount} gardés, ${bigClean.issues.length} note(s)`)

// 4b. A chain deeper than twelve levels loses what sits under it, and says so.
const deep = { root: 'd0', elements: {} }
for (let i = 0; i < 40; i++) deep.elements[`d${i}`] = { type: i ? 'Text' : 'Stack', props: i ? { text: `niveau ${i}` } : { direction: 'column' }, ...(i < 39 ? { children: [`d${i + 1}`] } : {}) }
const deepClean = sanitizeSpec(deep)
const deepCount = deepClean.spec ? Object.keys(deepClean.spec.elements).length : 0
check('profondeur coupée à 12 niveaux', deepCount === LIMITS.depth && deepClean.issues.some(issue => /level/i.test(issue.reason)), `${deepCount} niveaux gardés`)

// 5. A string past the limit is cut, not dropped.
const longText = sanitizeSpec({ root: 'r', elements: { r: { type: 'Text', props: { text: 'a'.repeat(5000) } } } })
check('chaîne de 5000 caractères coupée à 4000', longText.spec?.elements.r.props.text.length === LIMITS.string, `${longText.spec?.elements.r.props.text.length} caractères`)

// 6. Broken JSON and a spec without root draw nothing.
check('JSON cassé : rien', sanitizeSpec('{"root":').spec === null)
check('spec sans root : rien', sanitizeSpec({ elements: {} }).spec === null)

const failed = results.filter(result => !result.ok).length
console.log(`\ncheck-iui : ${results.length - failed}/${results.length} vérifications passées`)
if (failed) process.exit(1)
