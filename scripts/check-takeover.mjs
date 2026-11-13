// Guards the takeover: the routing table, then the one sentence it says.
//
// `classifyRoute(hash)` must read the app's routes the way the app does (below, on the real module). Then 1.5.3's
// question, which no static table can answer: the app restores its own route at startup, and that route can name a
// conversation that no longer exists. `revealSession` is bundled and run for real here — no window, no router, with
// `host.request` and the roster handed to recorders — to check that a *launch* pass says nothing and lands on the
// home, that a *click* is the only thing that says "Conversation not found", and that a launch does not ask about the
// same gone id twice.
//
// The function is bundled from src/app/native-routes.ts on the fly (esbuild, node platform) into the scratch folder, then
// imported and run against the cases the spec names. Nothing is stubbed: it is the file the plugin ships.
//
//   node scripts/check-takeover.mjs
//
// Scratch folder: $HUI_SCRATCH, else /opt/data/profiles/dex/cache/scratch, else the OS temp dir.
import { build } from 'esbuild'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'check-takeover.routes.mjs')

const CASES = [
  ['#/', 'new-chat'],
  ['', 'new-chat'],
  ['#/local-abc123', 'session'],
  ['#/abc%2Fdef', 'session'],
  ['#/settings', 'native'],
  ['#/capabilities/plugins', 'native'],
  ['#/cron', 'native'],
  ['#/hui', 'hui'],
  ['#/hui/glaze', 'hui'],
  ['#/profiles', 'native'],
  ['#/agents', 'native']
]

async function bundle() {
  const result = await build({
    entryPoints: [resolve(root, 'src/app/native-routes.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent'
  })
  mkdirSync(scratch, { recursive: true })
  writeFileSync(outfile, result.outputFiles[0].text)
  return import(pathToFileURL(outfile).href)
}

let mod
try {
  mod = await bundle()
} catch (e) {
  // A read-only scratch folder must not make the check unrunnable: retry where the OS allows writes.
  console.warn(`check-takeover: ${scratch} unusable (${e.message}); falling back to ${tmpdir()}`)
  const fallback = join(tmpdir(), 'hermes-ui-check-takeover.routes.mjs')
  const result = await build({
    entryPoints: [resolve(root, 'src/app/native-routes.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent'
  })
  writeFileSync(fallback, result.outputFiles[0].text)
  mod = await import(pathToFileURL(fallback).href)
}

const failures = []
const rows = CASES.map(([hash, expected]) => {
  const got = mod.classifyRoute(hash)
  const ok = got === expected
  if (!ok) failures.push({ hash, expected, got })
  return { hash, expected, got, ok }
})

// The decoded ids come from the same table: a session route must carry its id, and nothing else must.
const ID_CASES = [
  ['#/local-abc123', 'local-abc123'],
  ['#/abc%2Fdef', 'abc/def'],
  ['#/settings', null],
  ['#/hui', null],
  ['#/', null]
]

const idRows = ID_CASES.map(([hash, expected]) => {
  const got = mod.sessionIdOf(hash)
  const ok = got === expected
  if (!ok) failures.push({ hash, expected, got })
  return { hash, expected, got, ok }
})

// The launch watch's question: does this address belong to the app's chat, which /hui replaces?
const CHAT_CASES = [
  ['#/', true],
  ['', true],
  ['#/local-abc123', true],
  ['#/abc%2Fdef', true],
  ['#/hui', false],
  ['#/hui/glaze', false],
  ['#/settings', false],
  ['#/capabilities/plugins', false]
]
const chatRows = CHAT_CASES.map(([hash, expected]) => {
  const got = mod.isChatRoute(hash)
  const ok = got === expected
  if (!ok) failures.push({ hash, expected, got })
  return { hash, expected, got, ok }
})

const pad = (value, width) => String(value).padEnd(width)
console.log(`check-takeover: bundled ${outfile}\n`)
console.log(`${pad('hash', 24)} ${pad('attendu', 10)} ${pad('obtenu', 10)} ok`)
for (const row of rows) {
  console.log(`${pad(JSON.stringify(row.hash), 24)} ${pad(row.expected, 10)} ${pad(row.got, 10)} ${row.ok ? 'oui' : 'NON'}`)
}
console.log(`\n${pad('hash', 24)} ${pad('id attendu', 12)} ${pad('id obtenu', 12)} ok`)
for (const row of idRows) {
  console.log(`${pad(JSON.stringify(row.hash), 24)} ${pad(JSON.stringify(row.expected), 12)} ${pad(JSON.stringify(row.got), 12)} ${row.ok ? 'oui' : 'NON'}`)
}
console.log(`\n${pad('hash', 24)} ${pad('chat', 10)} ${pad('chat attendu', 12)} ok`)
for (const row of chatRows) {
  console.log(`${pad(JSON.stringify(row.hash), 24)} ${pad(String(row.got), 10)} ${pad(String(row.expected), 12)} ${row.ok ? 'oui' : 'NON'}`)
}

/* ------------------------------------------------------------------------------------------------
 * The launch pass and the click: does the page say "Conversation not found", and when?
 * ------------------------------------------------------------------------------------------------ */

const takeoverOut = join(scratch, 'check-takeover.launch.mjs')
const ENTRY = `
export { handleRoute, installTakeover, revealSession, setTakeoverContext } from '@/app/native-takeover'
export { store } from '@/lib/hermes'
export { UI } from '@/app/strings'
`

let takeover
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-takeover-entry.ts', loader: 'ts' },
    outfile: takeoverOut,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: {
      '@hermes/plugin-sdk': join(root, 'scripts', 'fixtures', 'sdk-stub.mjs'),
      // The takeover's one sentence goes to a recorder: the question is whether it was said, not what it drew.
      '@/components/glaze/ui/toast': join(root, 'scripts', 'fixtures', 'toast-stub.mjs'),
      '@': resolve(root, 'src')
    },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  takeover = await import(pathToFileURL(takeoverOut).href)
} catch (error) {
  console.error('FAIL le pass de lancement ne peut pas être exécuté')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error(`\ncheck-takeover: 1 cas en échec — revealSession n'est pas exporté par native-takeover`)
  process.exit(1)
}

const { handleRoute, installTakeover, revealSession, setTakeoverContext, store, UI } = takeover
const toasts = []
globalThis.__toasts = toasts
globalThis.__hermesRoutes = []

/** Every gateway call the takeover makes, so "asked once" is a fact and not a hope. */
const asked = []
let resumeAnswer = () => {
  // The gateway's own refusal: `session.resume` rejects with an error, it does not answer an empty payload.
  throw new Error('unknown session')
}

globalThis.__hostRequest = (method, params) => {
  asked.push({ method, params })
  if (method === 'profiles.list') return Promise.resolve({ profiles: [{ name: 'dex', model: 'm', provider: 'p' }] })
  // A refusal is a rejection, the way the gateway's own "unknown session" arrives: not a resolved empty payload.
  if (method === 'session.resume') return Promise.resolve().then(() => resumeAnswer(params))
  if (method === 'session.history') return Promise.resolve({ messages: [], count: 0 })
  return Promise.resolve({})
}
globalThis.__hermesSessions = () => Promise.resolve({ sessions: [] })

const ctx = {
  storage: { get: (_key, fallback) => fallback, set: () => {} },
  setTimeout: fn => {
    void Promise.resolve().then(fn)
    return 0
  },
  setInterval: () => 0,
  addEventListener: () => {},
  onDispose: () => {},
  rest: async () => ({})
}

// The seam `setTakeoverContext` is 1.5.3's. A build that predates it has one door only — `installTakeover`, which
// also wires the launch watch — and the check takes it, so the old behaviour is measured too (that is how the
// "Conversation not found" at launch was seen).
if (typeof setTakeoverContext === 'function') setTakeoverContext(ctx)
else if (typeof installTakeover === 'function') {
  globalThis.window = { location: { hash: '' }, addEventListener: () => {}, removeEventListener: () => {} }
  installTakeover(ctx)
  toasts.length = 0
}

store.set({
  ready: true,
  bots: [{ name: 'dex', model: 'm', provider: 'p', route: null }],
  bot: 'dex',
  sessionsByBot: {},
  sid: null,
  storedId: null,
  messages: [],
  error: '',
  errorDetail: ''
})

const resumes = () => asked.filter(call => call.method === 'session.resume')
const launchCases = []
const launchCheck = (name, ok, detail = '') => launchCases.push({ name, ok, detail })

// 1. The launch: an id the gateway does not know. Nothing is said, and the page stays on its own home.
toasts.length = 0
asked.length = 0
await handleRoute('#/ghost-launch', { launch: true })
launchCheck('un pass de lancement avec un id inconnu n’émet aucun toast', toasts.length === 0, JSON.stringify(toasts.map(t => t.message)))
launchCheck('il ne laisse pas de bandeau d’erreur', store.get().error === '', JSON.stringify(store.get().error))
launchCheck('il rend l’accueil (rien d’ouvert)', store.get().storedId === null && store.get().messages.length === 0, JSON.stringify({ storedId: store.get().storedId, turns: store.get().messages.length }))
launchCheck('il a bien demandé l’id une fois au gateway avant de conclure', resumes().length === 1, `${resumes().length} resume(s)`)

// 2. The same id again, in the same launch: not re-asked. `revealSession` is the direct door; a build without it is
//    asked through `handleRoute`, past the 500 ms hash guard, so both builds see the same question.
asked.length = 0
toasts.length = 0
let expectedAsks = 0
if (typeof revealSession === 'function') {
  await revealSession('ghost-launch', { launch: true })
  await revealSession('ghost-launch', { launch: true })
} else {
  await handleRoute('#/ghost-retry', { launch: true })
  await new Promise(resolve => setTimeout(resolve, 600))
  await handleRoute('#/ghost-retry', { launch: true })
  expectedAsks = 1
}
launchCheck('un id déjà introuvable n’est pas re-testé pendant ce lancement', resumes().length === expectedAsks, `${resumes().length} resume(s), ${expectedAsks} attendu(s)`)
launchCheck('et il n’émet toujours aucun toast', toasts.length === 0, JSON.stringify(toasts.map(t => t.message)))

// 3. An explicit click on an unknown id: this one speaks, with the existing translated copy.
toasts.length = 0
asked.length = 0
await handleRoute('#/ghost-click', { launch: false })
launchCheck('un clic explicite sur un id inconnu émet un toast', toasts.length === 1, JSON.stringify(toasts.map(t => t.message)))
launchCheck('le toast porte la copie existante', toasts[0]?.message === UI.plugin.sessionMissing, JSON.stringify(toasts[0]?.message ?? null))

// 4. A conversation that exists is still opened by a launch pass, silently.
toasts.length = 0
asked.length = 0
resumeAnswer = params => ({ session_id: params.session_id, stored_session_id: params.session_id, messages: [{ role: 'user', content: 'hello' }], message_count: 1 })
await handleRoute('#/real-session', { launch: true })
launchCheck('un id réel s’ouvre au lancement, sans toast', toasts.length === 0 && store.get().storedId === 'real-session', JSON.stringify({ toasts: toasts.length, storedId: store.get().storedId }))

const pad2 = (value, width) => String(value).padEnd(width)
console.log(`\n${pad2('cas de lancement', 62)} ok`)
for (const row of launchCases) console.log(`${pad2(row.name, 62)} ${row.ok ? 'oui' : 'NON'}${row.ok || !row.detail ? '' : ` — ${row.detail}`}`)
if (launchCases.some(row => !row.ok)) failures.push({ launch: launchCases.filter(row => !row.ok).map(row => row.name) })

if (failures.length) {
  console.error(`\ncheck-takeover: ${failures.length} cas en échec`)
  process.exit(1)
}
console.log(`\ncheck-takeover: OK — ${rows.length + idRows.length + chatRows.length} cas, route, id et chat conformes ; ${launchCases.length} cas de lancement, aucun toast au lancement, un seul au clic`)
