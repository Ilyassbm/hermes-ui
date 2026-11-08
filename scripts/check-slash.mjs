// Proves the one pure function the slash commands rest on: `classifyInput`, from src/lib/slash.ts.
//
// The file has no imports by design, so it is bundled on the fly with the repo's own esbuild into the scratch folder
// (`os.tmpdir()`, which this machine points at /opt/data/profiles/dex/cache/scratch) as an ES module, imported, and
// asked about the inputs the spec names. Each row prints the expected verdict, the one it got, and PASS/FAIL; a single
// mismatch exits 1.
//
//   node scripts/check-slash.mjs
//   node scripts/check-slash.mjs --keep    # keep the bundle to read it
import { mkdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const outDir = process.env.HUI_SCRATCH || tmpdir()
const outFile = join(outDir, 'hermes-ui-check-slash.mjs')
mkdirSync(outDir, { recursive: true })

await build({
  entryPoints: ['src/lib/slash.ts'],
  outfile: outFile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  logLevel: 'silent'
})

const { classifyInput, commandText } = await import(pathToFileURL(outFile).href)

/** The spec's nine inputs, with the verdict each one must get. */
const CASES = [
  ['bonjour', { kind: 'prompt' }],
  ['/new', { kind: 'client', name: 'new' }],
  ['/clear', { kind: 'client', name: 'clear' }],
  ['/model', { kind: 'client', name: 'model' }],
  ['/model gpt-6', { kind: 'slash', name: 'model', arg: 'gpt-6' }],
  ['/goal finir le lot', { kind: 'slash', name: 'goal', arg: 'finir le lot' }],
  ['/ espace', { kind: 'prompt' }],
  ['//double', { kind: 'prompt' }],
  ['/stop', { kind: 'client', name: 'stop' }]
]

const show = value => {
  if (value.kind === 'prompt') return '{kind:prompt}'
  const arg = value.arg ? `, arg:${JSON.stringify(value.arg)}` : ''
  return `{kind:${value.kind}, name:${value.name}${arg}}`
}

let failed = 0
console.log(`check-slash: src/lib/slash.ts bundled to ${outFile}`)
console.log(`${'input'.padEnd(22)} ${'attendu'.padEnd(34)} ${'obtenu'.padEnd(34)}`)
for (const [input, expected] of CASES) {
  const got = classifyInput(input)
  const ok = show(got) === show(expected)
  if (!ok) failed += 1
  console.log(`${JSON.stringify(input).padEnd(22)} ${show(expected).padEnd(34)} ${show(got).padEnd(34)} ${ok ? 'PASS' : 'FAIL'}`)
}

// The command the gateway receives keeps the argument whole and drops the leading slash.
const dispatched = commandText(classifyInput('/goal finir le lot'))
console.log(`\nslash.exec receives: ${JSON.stringify(dispatched)}`)
if (dispatched !== 'goal finir le lot') {
  console.error('check-slash: commandText did not keep the argument')
  failed += 1
}

if (!process.argv.includes('--keep')) rmSync(outFile, { force: true })
if (failed) {
  console.error(`check-slash: ${failed} case(s) failed`)
  process.exit(1)
}
console.log(`check-slash: OK — ${CASES.length} cases`)
