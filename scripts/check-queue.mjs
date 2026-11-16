// Guards the follow-up queue: a message written while the bot works is kept, shown under the composer, and sent in
// order when the turn ends — it is never dropped, and a failed head holds the rest.
//
// No browser and no gateway: esbuild bundles the real `lib/hermes.js` for node and `host.request` goes to a recorder.
//
//   node scripts/check-queue.mjs
//
// Exits 1 with one line per failed check, 0 otherwise.
import { build } from 'esbuild'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-queue.bundle.mjs')

const ENTRY = `
import * as hermes from '@/lib/hermes'
export const { bindContext, handleEvent, newConversation, send, store } = hermes
export const queue = { edit: hermes.queueEdit, remove: hermes.queueRemove, move: hermes.queueMove, retry: hermes.queueRetry, sendNow: hermes.queueSendNow }
`

let mod
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-queue-entry.ts', loader: 'ts' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: { '@hermes/plugin-sdk': join(root, 'scripts', 'fixtures', 'sdk-stub.mjs'), '@': resolve(root, 'src') },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  mod = await import(pathToFileURL(outfile).href)
} catch (error) {
  console.error('FAIL the queue cannot be mounted at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-queue: 1 problem — a message written while the bot works has nowhere to wait.')
  process.exit(1)
}
const { bindContext, handleEvent, newConversation, send, store, queue } = mod

const requests = []
let refuse = false
globalThis.__hostRequest = (method, params) => {
  requests.push({ method, params })
  if (method === 'prompt.submit' && refuse) return Promise.reject(new Error('gateway refused'))
  return Promise.resolve({ status: 'ok', interrupted: true })
}
bindContext({
  storage: { get: (_key, fallback) => fallback, set: () => {} },
  setTimeout: () => 0,
  setInterval: () => 0,
  rest: async () => ({})
})

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })
const submits = () => requests.filter(r => r.method === 'prompt.submit').map(r => r.params.text)
const settle = () => new Promise(r => setTimeout(r, 25))
const SID = 'session-queue-1'
const complete = () => handleEvent({ type: 'message.complete', session_id: SID, payload: { text: 'done', status: 'complete' } })

/* 1. a message written while a turn runs is kept, not dropped */
newConversation()
store.set({ bot: 'dex', sid: SID })
await send('first')
await settle()
check('un premier message part tout de suite', submits().join('|') === 'first', submits().join('|'))
check('le tour est en cours', Boolean(store.get().live))

await send('second')
await send('third')
check('deux messages écrits pendant le tour sont mis en file', store.get().queue.length === 2, `queue=${store.get().queue.length}`)
check('rien ne part pendant le tour', submits().join('|') === 'first', submits().join('|'))
check('la file garde le texte et l\'ordre', store.get().queue.map(m => m.text).join('|') === 'second|third')
check('le fil ne dessine pas encore les messages en attente', !store.get().messages.some(m => m.role === 'user' && m.text === 'second'))

/* 2. edit, move, remove */
const [second, third] = store.get().queue
queue.edit(second.id, 'second, edited')
check('modifier un message en file', store.get().queue[0].text === 'second, edited')
queue.move(third.id, 0)
check('déplacer un message en file', store.get().queue.map(m => m.text).join('|') === 'third|second, edited')
queue.remove(third.id)
check('retirer un message de la file', store.get().queue.map(m => m.text).join('|') === 'second, edited')

/* 3. the end of the turn sends the head */
complete()
await settle()
check('à la fin du tour, le message en file part', submits().join('|') === 'first|second, edited', submits().join('|'))
check('il quitte la file une fois parti', store.get().queue.length === 0)
check('le fil le dessine alors', store.get().messages.some(m => m.role === 'user' && m.text === 'second, edited'))

/* 4. several queued messages go one per turn, in order */
await send('a')
await send('b')
check('deux messages en file pendant le tour du suivant', store.get().queue.length === 2)
complete()
await settle()
check('un seul message par tour', submits().slice(-1)[0] === 'a' && store.get().queue.length === 1, submits().join('|'))
complete()
await settle()
check('puis le suivant, dans l\'ordre', submits().slice(-1)[0] === 'b' && store.get().queue.length === 0, submits().join('|'))
complete()

/* 5. a failed head is kept, marked, and holds the rest */
await send('x')
await settle()
await send('y')
await send('z')
refuse = true
complete()
await settle()
refuse = false
check('un message refusé par le gateway reste en file', store.get().queue.length === 2, `queue=${store.get().queue.length}`)
const held = store.get().queue[0]
check('il est marqué en échec', held?.status === 'failed' && held.text === 'y', held?.status)
check('le suivant attend derrière', store.get().queue[1]?.text === 'z' && store.get().queue[1].status === 'queued')
const count = submits().length
complete()
await settle()
check('un message en échec retient la file', submits().length === count)
queue.retry(held.id)
await settle()
check('Retry le renvoie', submits().slice(-1)[0] === 'y' && !store.get().queue.some(m => m.id === held.id), submits().slice(-2).join('|'))
complete()
await settle()
check('puis la file reprend', submits().slice(-1)[0] === 'z' && store.get().queue.length === 0, submits().slice(-2).join('|'))

/* 6. a new conversation leaves no queue behind */
store.set(st => ({ queue: [...st.queue, { id: 'q-left', text: 'left', files: [], status: 'queued' }] }))
newConversation()
check('une nouvelle conversation vide la file', store.get().queue.length === 0)

/* 7. the composer hands the queue to Glaze */
const composer = readFileSync(resolve(root, 'src/app/thread/composer.tsx'), 'utf8')
check('le compositeur monte la file sous le champ', /queue=\{[\s\S]*<PromptQueue/.test(composer))
check('Entrée sur un champ vide envoie la tête de file', /onSendQueuedNow=/.test(composer))
check('Flèche haut modifie le dernier message en file', /onEditQueued=/.test(composer))

const failed = results.filter(r => !r.ok)
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`)
if (failed.length) {
  console.error(`\ncheck-queue: ${failed.length} problem(s) — a follow-up can still be lost.`)
  process.exit(1)
}
console.log(`\ncheck-queue: OK — ${results.length} check(s).`)
