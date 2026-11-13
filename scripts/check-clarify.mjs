// Guards the question card: the bot's `clarify.request` has to become a card in the thread, and the answer has to be
// the shape the gateway's own schema takes.
//
// What it does, with no browser and no gateway (esbuild bundles the real modules for node, `host.request` is handed to
// a recorder):
//   1. emits a real `clarify.request` through `handleEvent` — the payload the gateway publishes — and checks the store
//      holds the question;
//   2. mounts the card with React's server renderer and checks the question, one button per choice, the free field and
//      the countdown are in the markup;
//   3. answers through `answerClarify` (the function the choice buttons call) and captures the exact `clarify.respond`
//      payload: `{session_id, execution_generation, prompt_id, answer}`, four keys, nothing else — the gateway refuses
//      a fifth with `invalid_params`;
//   4. checks one send per `prompt_id` (the card locks, a second call sends nothing);
//   5. checks a question asked while its conversation was not on screen is kept for that conversation;
//   6. checks `clarify.settled` takes the card away, from the store and from the markup.
//
//   node scripts/check-clarify.mjs
//
// Exits 1 with one line per failed check, 0 otherwise.
import { build } from 'esbuild'
import { mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, `hui-clarify.bundle.mjs`)

const ENTRY = `
import * as hermes from '@/lib/hermes'
import { ClarifyCard } from '@/app/thread/clarify'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export const { answerClarify, bindContext, handleEvent, newConversation, pendingClarify, store } = hermes
export const card = () => renderToStaticMarkup(React.createElement(ClarifyCard))
`

let mod
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: root, sourcefile: 'check-clarify-entry.tsx', loader: 'tsx' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    // React stays out of the bundle: node resolves it from node_modules, and bundling react-dom/server into ESM
    // leaves a `require('util')` that the ESM loader refuses.
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    // A vendored dependency ships CommonJS that `require`s React; the ESM output has no `require`, so node's own is
    // handed to it — which is also the copy `react-dom/server` renders with, so the hooks in the card find their
    // dispatcher.
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
  console.error('FAIL the question card cannot be mounted at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-clarify: 1 problem — a clarify.request has nowhere to go.')
  process.exit(1)
}

const { answerClarify, bindContext, card, handleEvent, newConversation, pendingClarify, store } = mod

/* ------------------------------------------------------------------ the fakes -- */

const requests = []
globalThis.__hostRequest = (method, params) => {
  requests.push({ method, params })
  return Promise.resolve({ status: 'resolved', prompt_id: params?.prompt_id })
}

bindContext({
  storage: { get: (_key, fallback) => fallback, set: () => {} },
  setTimeout: fn => {
    void Promise.resolve().then(fn)
    return 0
  },
  setInterval: () => 0,
  rest: async () => ({})
})

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })

const SID = 'session-clarify-1'
const GEN = 7
const PROMPT = 'prompt-1'
const QUESTION = 'Which branch should I ship?'
const CHOICES = ['main', 'fix/1.5.3']

const request = (overrides = {}, sessionId = SID) => ({
  type: 'clarify.request',
  session_id: sessionId,
  payload: {
    kind: 'clarify',
    prompt_id: PROMPT,
    execution_generation: GEN,
    question: QUESTION,
    choices: CHOICES,
    multi_select: false,
    timeout_s: 30,
    ...overrides
  }
})

/* ---------------------------------------------------- 1. the card appears at all -- */

newConversation()
store.set({ bot: 'dex', sid: SID })
handleEvent(request())

const asked = pendingClarify(store.get())
check('un clarify.request met la question dans le store', Boolean(asked) && asked.question === QUESTION, JSON.stringify(asked?.question ?? null))
check('les choix du gateway sont portés tels quels', JSON.stringify(asked?.choices) === JSON.stringify(CHOICES), JSON.stringify(asked?.choices ?? null))
check('la génération est retenue pour la réponse', asked?.generation === GEN, String(asked?.generation))

const markup = card()
check('la carte est montée dans le fil', markup.includes('data-hui-part="clarify"'), markup.slice(0, 70))
check('la question est affichée', markup.includes(QUESTION))
check(
  'un bouton par choix',
  CHOICES.every(choice => markup.includes(`data-clarify-choice="${choice}"`)),
  `buttons: ${(markup.match(/data-clarify-choice=/g) || []).length}`
)
check('un compte à rebours quand timeout_s est fourni', /\d+s left/.test(markup), (markup.match(/\d+s left/) || [])[0] || 'none')
check('la question peut être passée', markup.includes('Skip'))

/* --------------------------------------------------- 2. the exact answer payload -- */

requests.length = 0
const sent = await answerClarify(CHOICES[1])
const respond = requests.find(call => call.method === 'clarify.respond')
check('un choix envoie clarify.respond', Boolean(respond), requests.map(c => c.method).join(', ') || 'no call')
check('la réponse est le choix tel qu’il a été offert', respond?.params?.answer === CHOICES[1], JSON.stringify(respond?.params?.answer ?? null))
check(
  'le payload porte exactement les quatre clés du contrat',
  Boolean(respond) && JSON.stringify(Object.keys(respond.params).sort()) === JSON.stringify(['answer', 'execution_generation', 'prompt_id', 'session_id']),
  JSON.stringify(Object.keys(respond?.params || {}))
)
check(
  'les quatre valeurs sont celles de l’événement',
  respond?.params?.session_id === SID && respond?.params?.execution_generation === GEN && respond?.params?.prompt_id === PROMPT,
  JSON.stringify(respond?.params || {})
)
check('l’envoi est signalé comme accepté', sent === true, String(sent))

/* ------------------------------------------------------ 3. one send per prompt id -- */

const second = await answerClarify('main')
check('un seul envoi par prompt_id : la carte est verrouillée', second === false, String(second))
check(
  'aucun second clarify.respond n’est parti',
  requests.filter(call => call.method === 'clarify.respond').length === 1,
  `${requests.filter(call => call.method === 'clarify.respond').length} call(s)`
)

/* ------------------------------------------------ 4. settled takes the card away -- */

handleEvent({ type: 'clarify.settled', session_id: SID, payload: { prompt_id: PROMPT, execution_generation: GEN } })
check('clarify.settled retire la carte du store', pendingClarify(store.get()) === null, JSON.stringify(pendingClarify(store.get())))
check('clarify.settled retire la carte du fil', card() === '', card().slice(0, 60))

/* --------------------------------------------- 5. a question from another session -- */

const OTHER = 'session-clarify-2'
store.set({ sid: SID })
handleEvent(request({ prompt_id: 'prompt-other', choices: [], timeout_s: null }, OTHER))
check('une question d’une autre session n’est pas perdue', Array.isArray(store.get().clarifyBySession?.[OTHER]) && store.get().clarifyBySession[OTHER].length === 1, JSON.stringify(Object.keys(store.get().clarifyBySession || {})))
check('elle ne s’affiche pas dans la session ouverte', pendingClarify(store.get()) === null)
store.set({ sid: OTHER })
const back = pendingClarify(store.get())
check('elle s’affiche quand on revient dans sa session', back?.promptId === 'prompt-other', JSON.stringify(back?.promptId ?? null))
check('une question sans choix ouvre la saisie libre', card().includes('aria-label="Or type an answer"'), card().slice(0, 80))

/* ------------------------------------------------- 6. multi-select answers as JSON -- */

newConversation()
store.set({ bot: 'dex', sid: SID })
handleEvent(request({ prompt_id: 'prompt-multi', multi_select: true }))
const multi = card()
check('une question multi_select propose ses choix cochables', (multi.match(/aria-pressed=/g) || []).length === CHOICES.length, `${(multi.match(/aria-pressed=/g) || []).length} pressed button(s)`)
requests.length = 0
await answerClarify(JSON.stringify([CHOICES[0], CHOICES[1]]))
const multiAnswer = requests.find(call => call.method === 'clarify.respond')?.params?.answer
check('une réponse multi_select part en tableau JSON', multiAnswer === JSON.stringify(CHOICES), String(multiAnswer))

/* ------------------------------------------------------------------- the report -- */

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`)
}

if (failed) {
  console.error(`\ncheck-clarify: ${failed} problème(s) — la question du bot doit exister dans le fil et se répondre en quatre clés.`)
  process.exit(1)
}
console.log(`\ncheck-clarify: OK — ${results.length} vérifications : la carte est dans le fil, la réponse porte {session_id, execution_generation, prompt_id, answer}, un envoi par prompt_id, settle la retire`)
