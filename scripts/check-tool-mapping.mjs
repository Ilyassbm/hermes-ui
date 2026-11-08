// Replays a real gateway capture through the thread's tool mapping and prints the calls it ends with.
//
// The mapping under test is the one the app uses: `src/app/thread/tool-events.ts` turns gateway events into ToolCall
// events, and Glaze's own `toolCallsReducer` folds them. Nothing here re-implements either — the two modules are
// bundled as they ship (they are TypeScript, so esbuild builds them on the fly) and the replay runs on the result.
//
//   node scripts/check-tool-mapping.mjs [capture.json]
//
// The capture is read-only. Reads `/opt/data/profiles/dex/cache/scratch/hui-turn1.json` by default (override with
// HUI_EVENTS); its temporary bundle lands beside it (override the directory with HUI_SCRATCH).
//
// Passes when the turn ends with no call left pending or running, and when the search it made is `completed` — a
// pending row left behind is the bug this script exists to catch.
import { build } from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || '/opt/data/profiles/dex/cache/scratch'
const capture = process.env.HUI_EVENTS || join(scratch, 'hui-turn1.json')

// The entry only re-exports: the logic stays in the app's own modules.
const entry = join(scratch, 'hui-tool-mapping.entry.ts')
writeFileSync(
  entry,
  [
    "export { emptyToolAdapter, emptyCalls, toolEventStep, turnEndStep, turnReducer } from '@/app/thread/tool-events'",
    "export { toolCallsReducer } from '@/components/glaze/ai/tool-call'",
    "import '@/app/thread/tools'",
    ''
  ].join('\n')
)

const outfile = join(scratch, 'hui-tool-mapping.bundle.mjs')
await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'es2022',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  alias: {
    '@': resolve(root, 'src'),
    // The app never gets a real react-dom from the loader; the shim is what its components see.
    'react-dom': resolve(root, 'src/shims/react-dom.ts'),
    'react-dom/client': resolve(root, 'src/shims/react-dom.ts')
  },
  resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  logLevel: 'warning'
})

const { emptyToolAdapter, emptyCalls, toolEventStep, turnEndStep, turnReducer, toolCallsReducer } = await import(pathToFileURL(outfile).href)

const { events } = JSON.parse(readFileSync(capture, 'utf8'))
if (!Array.isArray(events)) {
  console.error(`check-tool-mapping: ${capture} has no events array`)
  process.exit(1)
}

let adapter = emptyToolAdapter(0)
const actions = []
let replayed = 0
for (const ev of events) {
  const type = String(ev?.type || '')
  const step = type === 'tool.generating' || type === 'tool.start' || type === 'tool.complete'
    ? toolEventStep(adapter, ev)
    : type === 'message.complete'
      ? turnEndStep(adapter)
      : null
  if (!step) continue
  adapter = step.state
  actions.push(...step.actions)
  replayed++
}

const state = actions.reduce((acc, action) => turnReducer(acc, action, toolCallsReducer), emptyCalls())
const calls = state.calls

const pad = (text, width) => String(text).padEnd(width)
console.log(`check-tool-mapping: ${events.length} event(s) in ${capture}, ${replayed} for tool calls, ${actions.length} action(s)`)
console.log(`  ${pad('id', 36)}${pad('tool', 18)}status`)
for (const call of calls) console.log(`  ${pad(call.id, 36)}${pad(call.tool, 18)}${call.status}`)

const open = calls.filter(c => c.status === 'pending' || c.status === 'running' || c.status === 'awaiting-permission')
const searched = calls.filter(c => c.tool === 'search_files')
const problems = []
if (!calls.length) problems.push('no call was mapped at all')
if (searched.length !== 1) problems.push(`expected one search_files call, got ${searched.length}`)
else if (searched[0].status !== 'completed') problems.push(`search_files ended ${searched[0].status}, not completed`)
if (open.length) problems.push(`${open.length} call(s) still open: ${open.map(c => `${c.tool}/${c.status}`).join(', ')}`)

if (problems.length) {
  for (const problem of problems) console.error(`check-tool-mapping: ${problem}`)
  process.exit(1)
}
console.log(`check-tool-mapping: OK — ${calls.length} call(s), all terminal, search_files completed`)
