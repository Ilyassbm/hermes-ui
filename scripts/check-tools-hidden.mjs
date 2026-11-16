// Guards the clean thread: the tool calls of a turn are not drawn (the working line says what the bot is doing), but a
// call waiting on the person's permission still is — a permission nobody can see is a turn that never ends.
//
// esbuild bundles the real `AssistantTurn` for node, React's server renderer draws it.
//
//   node scripts/check-tools-hidden.mjs
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-tools-hidden.bundle.mjs')

const ENTRY = `
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { AssistantTurn } from '@/app/thread/turn'
import { askStep, emptyToolAdapter, toolEventStep } from '@/app/thread/tool-events'
export { askStep, emptyToolAdapter, toolEventStep }
export const draw = message => renderToStaticMarkup(React.createElement(AssistantTurn, { message, name: 'Dex', identity: { shape: 'blob', eyes: 'calm', color: '#7c5cff' } }))
`

let mod
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-tools-hidden-entry.tsx', loader: 'tsx' },
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
  console.error('FAIL the turn cannot be drawn at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-tools-hidden: 1 problem — a turn has nowhere to be seen.')
  process.exit(1)
}
const { askStep, draw, emptyToolAdapter, toolEventStep } = mod

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

// A turn that read a file and ran a command, then answered.
let state = emptyToolAdapter(1)
const actions = []
const feed = ev => {
  const step = toolEventStep(state, ev)
  state = step.state
  actions.push(...step.actions)
}
feed({ type: 'tool.start', payload: { tool_id: 't1', tool_name: 'read_file', args: { path: '/srv/app/config.yaml' } } })
feed({ type: 'tool.complete', payload: { tool_id: 't1', tool_name: 'read_file', result: 'port: 80' } })
feed({ type: 'tool.start', payload: { tool_id: 't2', tool_name: 'terminal', args: { command: 'grep -rn needle src/' } } })
feed({ type: 'tool.complete', payload: { tool_id: 't2', tool_name: 'terminal', result: 'src/a.ts:1' } })

// While the turn streams: that is when a tool list is open and shown, and when the person watches the work.
const done = { id: 'm1', role: 'assistant', status: 'streaming', text: 'It listens on port 80.', reasoning: '', toolActions: actions }
const html = draw(done)
check('la réponse est affichée', html.includes('It listens on port 80.'))
check('aucune ligne d\'outil dans le fil', !/config\.yaml|grep -rn|needle/.test(html), `${html.length} chars`)
check('ni résumé replié « ran 2 commands »', !/ran \d+ command|read a file|Ran a command/i.test(html))

// A call waiting on the person stays visible.
feed({ type: 'tool.start', payload: { tool_id: 't3', tool_name: 'terminal', args: { command: 'rm -rf build' } } })
const asked = askStep(state, 't3', ['rm -rf build'], 'Run this command?', 'terminal')
const waiting = draw({ ...done, text: '', toolActions: [...actions, ...asked.actions] })
check('une demande d\'autorisation reste visible', /rm -rf build|Run this command/.test(waiting), waiting.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 90))
check('sans montrer les appels déjà terminés', !/config\.yaml|needle/.test(waiting))

const failed = results.filter(r => !r.ok)
for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`)
if (failed.length) {
  console.error(`\ncheck-tools-hidden: ${failed.length} problem(s) — the thread shows the tools again, or hides a permission.`)
  process.exit(1)
}
console.log(`\ncheck-tools-hidden: OK — ${results.length} check(s).`)
