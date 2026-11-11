// Every shape a stored conversation has come back in, replayed through `openConversation`.
//
// Opening an old conversation has broken three times, each for a different reason, and each time a real session was
// the only thing that showed it: a deferred ack with no messages, a message list whose words are in `text` instead of
// `content`, and a live resume that names roles `human`/`ai` and nests the row under `message`. Each shape below is
// copied from a payload the gateway actually sent; the check fails if a conversation comes back empty or produces
// nothing readable.
//
//   node scripts/check-resume.mjs
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-resume.bundle.mjs')

await build({
  entryPoints: [join(root, 'src', 'lib', 'hermes.js')],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: {
    '@hermes/plugin-sdk': join(root, 'scripts', 'fixtures', 'sdk-stub.mjs'),
    '@': resolve(root, 'src')
  },
  loader: { '.css': 'empty' },
  logLevel: 'warning'
})

const { bindContext, openConversation, store } = await import(pathToFileURL(outfile).href)

bindContext({
  storage: { get: (_k, fallback) => fallback, set: () => {} },
  setInterval: () => () => {},
  setTimeout: (fn) => { void Promise.resolve().then(fn); return 0 },
  rest: async () => ({})
})

const user = text => ({ role: 'user', content: text, timestamp: 1762000000, message_uid: `u-${text.length}` })
const assistant = text => ({ role: 'assistant', content: text, timestamp: 1762000001, message_uid: `a-${text.length}` })

const shapes = [
  {
    name: 'deferred ack, transcript through session.history',
    resume: { session_id: 'live-1', messages: [], message_count: 2, hydrating: true },
    handler: method =>
      method === 'session.history'
        ? { count: 2, messages: [user('Post praising Hermes AI agents'), assistant('Here is a post that works.')] }
        : null
  },
  {
    name: 'display projection — role/text/timestamp/row_id, no content',
    resume: {
      session_id: 'live-2',
      message_count: 3,
      messages: [
        { role: 'user', text: 'Media check', timestamp: 1762000000, row_id: 1 },
        { role: 'assistant', text: 'It is a cat.', timestamp: 1762000001, row_id: 2 },
        { role: 'tool', text: 'vision_analyze: done', timestamp: 1762000002, row_id: 3 }
      ]
    }
  },
  {
    name: 'live resume — human/ai roles, rows nested under message, content as blocks',
    resume: {
      session_id: 'live-3',
      message_count: 2,
      messages: [
        { message: { role: 'human', content: [{ type: 'text', text: 'Salut' }] }, timestamp: 1762000000 },
        { message: { role: 'ai', content: [{ type: 'text', text: 'Bonjour.' }] }, timestamp: 1762000001 }
      ]
    }
  }
]

const results = []
for (const shape of shapes) {
  globalThis.__hostRequest = (method) => {
    if (method === 'session.resume') return Promise.resolve(shape.resume)
    const extra = shape.handler?.(method)
    if (extra) return Promise.resolve(extra)
    return Promise.resolve({})
  }
  store.set({ bot: 'dex', messages: [], error: '', errorDetail: '' })
  await openConversation('stored-1')
  const { messages, error, errorDetail } = store.get()

  const problems = []
  if (!messages.length) problems.push('no turn was produced')
  if (error) problems.push(`banner shown: ${error}`)
  if (!messages.some(m => m.role === 'assistant' && (m.text || '').trim())) problems.push('no assistant text')
  results.push({ name: shape.name, turns: messages.length, problems, errorDetail })
}

// A reloaded tool call carries the transcript's own times: start at its assistant row, end at its tool row. Before
// 1.3.11 both ends were stamped "now" by the reducer and every replayed call read "0ms".
{
  globalThis.__hostRequest = (method) => method === 'session.resume'
    ? Promise.resolve({ messages: [
        { role: 'user', content: 'Look', timestamp: 1762000000 },
        { role: 'assistant', content: '', timestamp: 1762000001, tool_calls: [{ id: 'c1', function: { name: 'vision_analyze', arguments: '{}' } }] },
        { role: 'tool', tool_call_id: 'c1', content: 'a cat', timestamp: 1762000004.5 },
        { role: 'assistant', content: 'It is a cat.', timestamp: 1762000005 }
      ] })
    : Promise.resolve({})
  store.set({ bot: 'dex', messages: [], error: '', errorDetail: '' })
  await openConversation('stored-2')
  const actions = store.get().messages.flatMap(m => m.toolActions || []).filter(a => a.id === 'c1')
  const start = actions.find(a => a.type === 'start')?.at
  const end = actions.find(a => a.type === 'result')?.at
  const problems = start === 1762000001000 && end === 1762000004500 ? [] : [`start ${start}, end ${end}`]
  results.push({ name: 'replayed tool call keeps its own duration (3.5 s)', turns: store.get().messages.length, problems, errorDetail: '' })
}

let failed = 0
for (const r of results) {
  const ok = r.problems.length === 0
  if (!ok) failed += 1
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${r.name} — ${r.turns} turn(s)${ok ? '' : ` · ${r.problems.join('; ')}`}`)
}

if (failed) {
  console.error(`\ncheck-resume: ${failed} shape(s) came back empty or unreadable`)
  for (const r of results.filter(r => r.problems.length)) console.error(`  ${r.name} — ${r.errorDetail || '(no detail)'}`)
  process.exit(1)
}
console.log(`check-resume: OK — ${results.length} case(s): every payload shape reads back, replayed calls keep their times`)
