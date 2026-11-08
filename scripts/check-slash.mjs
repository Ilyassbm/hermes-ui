// Proves the slash commands' two paths:
//
//   1. `classifyInput` (src/lib/slash.ts) — what a person typed, as the composer must treat it. The file has no
//      imports by design, so it is bundled on the fly with the repo's own esbuild and asked about the spec's inputs.
//
//   1b. `leadingSlashToken` (src/components/glaze/ai/prompt-input/slash.ts) — how much of the editor's text the palette
//      stands over: choosing a command replaces that run, so "[/help]" never sits beside the "/he" that opened the list.
//
//   2. the composer's send path — `onSubmit('/help')` → `runCommand` (src/app/slash-run.ts) → a gateway request
//      `slash.exec {command:'help'}` → the answer written in the thread as a system note. slash-run talks to
//      `@hermes/plugin-sdk` (`host.request`), `@/lib/hermes` (`store`, `ensureSession`, `addNote`), `./editor` and
//      `./ui-state`; each of those is stubbed in the scratch folder and bundled in their place, so the real
//      classification and the real dispatch code run against a fake gateway and a fake store. No jsdom: the two lines
//      composer.tsx runs on submit are mirrored here, nothing else of the UI is involved.
//
//   node scripts/check-slash.mjs
//   node scripts/check-slash.mjs --keep    # keep the bundles to read them
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'esbuild'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const outDir = process.env.HUI_SCRATCH || tmpdir()
const outFile = join(outDir, 'hermes-ui-check-slash.mjs')
const harnessDir = join(outDir, 'hermes-ui-check-slash-harness')
const harnessOut = join(harnessDir, 'entry.mjs')
mkdirSync(outDir, { recursive: true })

let failed = 0
const fail = message => {
  failed += 1
  console.error(`FAIL ${message}`)
}
const pass = message => console.log(`PASS ${message}`)

// ---------- 1. classifyInput ----------

await build({
  entryPoints: [join(ROOT, 'src/lib/slash.ts')],
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

// ---------- 1b. the trigger a picked command replaces ----------
//
// The palette opens over the `/…` that opened it (the shortcut's `/`, plus whatever was typed before the search field
// took focus). Choosing a command must delete that run, not land the chip in front of it. The measure is DOM-free
// (src/components/glaze/ai/prompt-input/slash.ts), so it is asked here directly, and the replacement is replayed on
// plain text: "/he" + /help must read "/help", never "/help /he".
const triggerOut = join(outDir, 'hermes-ui-check-slash-trigger.mjs')
await build({
  entryPoints: [join(ROOT, 'src/components/glaze/ai/prompt-input/slash.ts')],
  outfile: triggerOut,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  logLevel: 'silent'
})

const { leadingSlashToken } = await import(pathToFileURL(triggerOut).href)

const TRIGGERS = [
  ['/he', 3, 'le déclencheur tapé dans l’éditeur'],
  ['/', 1, 'le `/` du raccourci, seul'],
  ['/help ', 5, 'une commande entière : l’espace qui suit reste'],
  ['/he bonjour', 3, 'un brouillon derrière le déclencheur reste intact'],
  ['bonjour', 0, 'un prompt sans `/` : rien à retirer'],
  ['bonjour /he', 0, 'un `/` au milieu n’est pas un déclencheur']
]

console.log(`\n${'texte'.padEnd(22)} ${'retiré'.padEnd(8)} ${'cas'.padEnd(52)} verdict`)
for (const [text, expected, label] of TRIGGERS) {
  const got = leadingSlashToken(text)
  const ok = got === expected
  if (!ok) failed += 1
  console.log(`${JSON.stringify(text).padEnd(22)} ${String(got).padEnd(8)} ${label.padEnd(52)} ${ok ? 'PASS' : 'FAIL (attendu ' + expected + ')'}`)
}

// The composer: delete the trigger at the head of the editor, then prepend the chip. Replayed on the text.
const pick = (editorText, command) => command + ' ' + editorText.slice(leadingSlashToken(editorText))
const picked = pick('/he', '/help')
console.log(`\npick: ${JSON.stringify('/he')} + /help → ${JSON.stringify(picked)}`)
if (picked === '/help ' || picked.startsWith('/help') && !picked.includes('/he')) pass(`le déclencheur est remplacé : ${JSON.stringify(picked)}`)
else fail(`le déclencheur est resté : ${JSON.stringify(picked)}`)

// ---------- 2. onSubmit('/help') → slash.exec → the note ----------

// The fake gateway and the fake store the stubs below share. `respond` is swapped per case.
globalThis.__hui = {
  calls: [],
  notes: [],
  state: { sid: 'session-de-test', live: null, bot: 'default' },
  respond: () => ({})
}

const stubs = {
  'sdk.mjs': `
    export const host = {
      async request(method, params) {
        globalThis.__hui.calls.push({ method, params })
        return globalThis.__hui.respond(method, params)
      }
    }
  `,
  'hermes.mjs': `
    export const store = {
      get: () => globalThis.__hui.state,
      set: patch => Object.assign(globalThis.__hui.state, typeof patch === 'function' ? patch(globalThis.__hui.state) : patch)
    }
    export function addNote(text) {
      const body = typeof text === 'string' ? text.trim() : ''
      if (body) globalThis.__hui.notes.push(body)
    }
    export async function ensureSession() {
      return globalThis.__hui.state.sid
    }
    export function newConversation() {}
    export async function send() {}
    export async function stop() {}
  `,
  'editor.mjs': `
    export function focusEditor() {}
    export function insertInEditor() {}
  `,
  'ui-state.mjs': `
    export function openModelMenu() {}
  `
}
mkdirSync(harnessDir, { recursive: true })
for (const [name, body] of Object.entries(stubs)) writeFileSync(join(harnessDir, name), body.trimStart(), 'utf8')

const harness = join(harnessDir, 'entry.ts')
writeFileSync(
  harness,
  `import { runCommand } from ${JSON.stringify(join(ROOT, 'src/app/slash-run.ts'))}\n` +
    `const submit = value => {\n` +
    `  // The two lines composer.tsx runs on submit.\n` +
    `  const plain = String(value.text || '')\n` +
    `  if (/^\\s*\\//.test(plain) && runCommand(plain)) return 'command'\n` +
    `  return 'send'\n` +
    `}\n` +
    `export { submit, runCommand }\n`,
  'utf8'
)

await build({
  entryPoints: [harness],
  outfile: harnessOut,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node18',
  logLevel: 'silent',
  alias: {
    '@hermes/plugin-sdk': join(harnessDir, 'sdk.mjs'),
    '@/lib/hermes': join(harnessDir, 'hermes.mjs')
  },
  // slash-run's two sibling imports (the editor and the app's ui-state) are React/DOM modules in the page: stub them.
  plugins: [
    {
      name: 'stub-siblings',
      setup(b) {
        b.onResolve({ filter: /^\.\/(editor|ui-state)$/ }, args => ({
          path: join(harnessDir, args.path === './editor' ? 'editor.mjs' : 'ui-state.mjs')
        }))
      }
    }
  ]
})

const { submit } = await import(`${pathToFileURL(harnessOut).href}?t=${Date.now()}`)

/** Lets the promise chain inside execSlash run: ensureSession, then the request. */
const settle = () => new Promise(resolve => setTimeout(resolve, 20))

console.log('\ncheck-slash: le chemin du composer')
console.log('  onSubmit("/help") → runCommand → slash.exec → note système')

globalThis.__hui.respond = () => ({ type: 'exec', output: 'Aide de Hermes : /new /model /goal…' })
const outcome = submit({ text: '/help' })
await settle()

if (outcome === 'command') pass('onSubmit("/help") est traité comme une commande, pas comme un prompt')
else fail(`onSubmit("/help") est parti comme un prompt (${outcome})`)

const call = globalThis.__hui.calls[0]
const expectedCall = { method: 'slash.exec', params: { session_id: 'session-de-test', command: 'help' } }
if (call && call.method === expectedCall.method && JSON.stringify(call.params) === JSON.stringify(expectedCall.params)) {
  pass(`host.request appelé : ${call.method} ${JSON.stringify(call.params)}`)
} else {
  fail(`host.request attendu ${JSON.stringify(expectedCall)}, obtenu ${JSON.stringify(globalThis.__hui.calls)}`)
}

if (globalThis.__hui.notes.includes('Aide de Hermes : /new /model /goal…')) {
  pass(`note système ajoutée : ${JSON.stringify(globalThis.__hui.notes[0])}`)
} else {
  fail(`aucune note système dans le store (${JSON.stringify(globalThis.__hui.notes)})`)
}

// A plain prompt is never a command, and asks the gateway nothing.
globalThis.__hui.calls = []
const plain = submit({ text: 'bonjour' })
await settle()
if (plain === 'send' && globalThis.__hui.calls.length === 0) pass('onSubmit("bonjour") reste un prompt, aucun appel')
else fail(`"bonjour" a été classé ${plain} avec ${globalThis.__hui.calls.length} appel(s)`)

// A command the gateway refuses falls back to command.dispatch, as the native composer does.
globalThis.__hui.calls = []
globalThis.__hui.notes = []
let first = true
globalThis.__hui.respond = method => {
  if (method === 'slash.exec' && first) {
    first = false
    throw new Error('unknown command')
  }
  return { type: 'exec', output: 'dispatch ok' }
}
submit({ text: '/help' })
await settle()
const methods = globalThis.__hui.calls.map(c => c.method)
if (JSON.stringify(methods) === JSON.stringify(['slash.exec', 'command.dispatch'])) {
  pass(`repli après refus : ${methods.join(' → ')}`)
} else {
  fail(`repli attendu slash.exec → command.dispatch, obtenu ${JSON.stringify(methods)}`)
}

if (!process.argv.includes('--keep')) {
  rmSync(outFile, { force: true })
  rmSync(triggerOut, { force: true })
  rmSync(harnessDir, { recursive: true, force: true })
}
if (failed) {
  console.error(`\ncheck-slash: ${failed} case(s) failed`)
  process.exit(1)
}
console.log(`\ncheck-slash: OK — ${CASES.length} cas de classement + ${TRIGGERS.length} cas de déclencheur remplacé + 5 preuves du chemin de commande`)
