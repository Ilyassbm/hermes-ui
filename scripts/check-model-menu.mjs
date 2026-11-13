// Guards the model picker: its first level's weight, the click that really chooses, and the search that names a model.
//
// The first level, which is what closed the menu on a real click: ~60 radio rows (one per model, per provider) laid out
// on open, the thread blocked for 1.5 s, and the release of the click arriving on an open menu that Base UI then
// closed (lot 8). The rule the picker keeps: at most MODEL_MENU_TOP models per provider on the first level, taken from
// `topModels`; the whole catalogue lives behind "All … models…", whose list mounts with the submenu.
//
// 1.5.3 adds three things this file has to keep true, because each one is a click that used to be lost:
//   - a row is a *switch*: `chooseModel` applies it to the session at the click (the same `/model … --provider …` the
//     next turn used to run), the trigger only moves on success, and a refusal puts the preference back and says so;
//   - a press inside the portalled submenu must not close the whole menu before the row's click lands;
//   - the search at the top of the menu names a model outright, every provider at once, and its rows apply through
//     that same `chooseModel` — one implementation of "choose a model", not two.
//
//   node scripts/check-model-menu.mjs
//
// Exits 1 with one line per problem (`path:line:col: what and why`), 0 otherwise. Run by `npm run build`.
import { build } from 'esbuild'
import { mkdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const MODELS = join(ROOT, 'src/app/models.ts')
const HEADER = join(ROOT, 'src/app/model-menu.tsx')
const HERMES = join(ROOT, 'src/lib/hermes.js')
const STRINGS = join(ROOT, 'src/app/strings.ts')

/** The constant's documented ceiling. */
export const MAX_TOP = 8

const problems = []
const fail = (file, node, message) => {
  const pos = node ? node.getStart(file.source) : 0
  const { line, character } = ts.getLineAndCharacterOfPosition(file.source, pos)
  problems.push(`${relative(ROOT, file.path)}:${line + 1}:${character + 1}: ${message}`)
}

function parse(path) {
  const text = readFileSync(path, 'utf8')
  const source = ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  return { path, text, source }
}

/** Every node of the tree, pre-order. */
function walk(node, run) {
  run(node)
  node.forEachChild(child => walk(child, run))
}

/** The tag an element is written with: `Button`, `DropdownMenu.Sub`, `div`. */
function tagOf(node) {
  if (ts.isJsxElement(node)) return node.openingElement.tagName.getText().replace(/[<>]/g, '').trim()
  if (ts.isJsxSelfClosingElement(node)) return node.tagName.getText().replace(/[<>]/g, '').trim()
  return ''
}

function elements(root, tag) {
  const found = []
  walk(root, node => {
    if (tagOf(node) === tag) found.push(node)
  })
  return found
}

/** The `className="…"` string of an element, or ''. */
function classNameOf(element) {
  for (const attr of element.openingElement.attributes.properties) {
    if (!ts.isJsxAttribute(attr) || attr.name.getText() !== 'className') continue
    const value = attr.initializer
    if (value && ts.isStringLiteral(value)) return value.text
  }
  return ''
}

/** The text of one JSX attribute, or ''. */
function attributeOf(element, name) {
  const attributes = element.openingElement?.attributes?.properties ?? (element.attributes?.properties ?? [])
  for (const attr of attributes) {
    if (!ts.isJsxAttribute(attr) || attr.name.getText() !== name) continue
    // A valueless attribute (`autoFocus`) is `true`, not an empty string.
    return attr.initializer ? attr.initializer.getText() : 'true'
  }
  return ''
}

/** The property name of `a.b(...)`: 'b'. */
function calledName(call) {
  return ts.isPropertyAccessExpression(call.expression) ? call.expression.name.getText() : ''
}

/** The text of the list a `.map(...)` iterates. */
function mappedOver(mapCall) {
  const over = mapCall.expression.expression
  return over ? over.getText() : ''
}

/** The first function / arrow assigned to `name` in `file`, or null. */
function functionNamed(file, name) {
  let hit = null
  walk(file.source, node => {
    if (hit) return
    if (ts.isFunctionDeclaration(node) && node.name?.getText() === name) hit = node
    if (ts.isVariableDeclaration(node) && node.name.getText() === name) hit = node
  })
  return hit
}

/** Every call to `name(...)` inside `node`. */
function callsTo(node, name) {
  const out = []
  walk(node, child => {
    if (ts.isCallExpression(child) && child.expression.getText() === name) out.push(child)
  })
  return out
}

/* ---------------------------------------------------------------- models.ts -- */

const models = parse(MODELS)
let top = null
walk(models.source, node => {
  if (!ts.isVariableDeclaration(node)) return
  if (node.name.getText() !== 'MODEL_MENU_TOP') return
  top = node
})

if (!top) {
  problems.push('src/app/models.ts:1:1: MODEL_MENU_TOP is gone: the picker has no cap on its first level')
} else {
  const value = top.initializer && ts.isNumericLiteral(top.initializer) ? Number(top.initializer.text) : NaN
  if (!Number.isFinite(value)) fail(models, top, 'MODEL_MENU_TOP must be a number: the check reads it to size the level')
  else if (value > MAX_TOP) {
    fail(models, top, `MODEL_MENU_TOP is ${value}: the first level would lay out ${value} rows per provider, which is what blocked the click (at most ${MAX_TOP})`)
  } else if (value < 1) fail(models, top, 'MODEL_MENU_TOP is below 1: a provider would show no model at all')
}

// Every slice in topModels has to be capped by the constant — a `.slice(0, 60)` beside it would defeat the cap.
let topModelsFn = null
walk(models.source, node => {
  if (ts.isFunctionDeclaration(node) && node.name?.getText() === 'topModels') topModelsFn = node
})
if (!topModelsFn) {
  problems.push('src/app/models.ts:1:1: topModels is gone: the first level must take its rows from it')
} else {
  walk(topModelsFn, node => {
    if (!ts.isCallExpression(node) || calledName(node) !== 'slice') return
    const args = node.arguments.map(arg => arg.getText())
    const capped = args.some(arg => arg.includes('MODEL_MENU_TOP'))
    const over = args.some(arg => ts.isNumericLiteral(arg) && Number(arg.text) > MAX_TOP)
    if (!capped || over) fail(models, node, `slice(${args.join(', ')}) ignores MODEL_MENU_TOP: the cap has to be the constant`)
  })
}

// The search: one flat list across providers, folded on case and accents, matching a model's label and its provider.
const searchFn = functionNamed(models, 'searchModels')
if (!searchFn) {
  problems.push('src/app/models.ts:1:1: searchModels is gone: typing a model name has nothing to search')
} else {
  const body = searchFn.getText()
  if (!body.includes('foldSearch(')) fail(models, searchFn, 'searchModels does not fold case and accents (foldSearch): "Créer" and "creer" must find the same model')
  if (!body.includes('modelLabel(')) fail(models, searchFn, 'searchModels does not match on the model\'s label: the person types the name they read, not the id')
  if (!body.includes('provider.name') && !body.includes('provider.slug')) fail(models, searchFn, 'searchModels ignores the provider: typing a provider name must list what it serves')
}

const foldFn = functionNamed(models, 'foldSearch')
if (!foldFn) problems.push('src/app/models.ts:1:1: foldSearch is gone: the search and the submenu filter share one normalisation')
else if (!foldFn.getText().includes('normalize(')) fail(models, foldFn, 'foldSearch does not normalize NFD: accented names would not match')

// The trigger's model, and the value `chooseModel` only writes on success.
if (!functionNamed(models, 'chosenModel')) {
  problems.push('src/app/models.ts:1:1: chosenModel is gone: the trigger and the check must read the model the same way')
}

/* ------------------------------------------------------------- model-menu.tsx -- */

const header = parse(HEADER)
const menu = elements(header.source, 'DropdownMenuContent').find(el => classNameOf(el).includes('hui-model-menu'))
if (!menu) {
  problems.push('src/app/model-menu.tsx:1:1: no DropdownMenuContent.hui-model-menu: the model picker is gone')
} else {
  // First level = everything in the model menu that is not inside a submenu's content.
  const subs = elements(menu, 'DropdownMenuSubContent')
  const inSub = node => subs.some(sub => sub.pos <= node.pos && node.end <= sub.end)

  const rows = elements(menu, 'DropdownMenuRadioItem').filter(row => !inSub(row))
  if (!rows.length) problems.push('src/app/model-menu.tsx:1:1: the model picker has no model row')

  for (const row of rows) {
    // The `.map(...)` whose callback renders this row.
    let map = null
    for (let node = row.parent; node && node !== menu.parent; node = node.parent) {
      if (ts.isCallExpression(node) && calledName(node) === 'map') map = node
      if (map) break
    }
    const over = map ? mappedOver(map) : ''
    if (!over.includes('topModels(')) {
      fail(header, row, `this row is rendered from "${over || 'a literal'}", not from topModels(provider, model): the first level could exceed ${MAX_TOP} models per provider`)
      continue
    }
    const literal = over.match(/slice\(\s*0\s*,\s*(\d+)\s*\)/)
    if (literal && Number(literal[1]) > MAX_TOP) fail(header, row, `"${over}" slices ${literal[1]} models`)
  }

  // The rest of the catalogue, behind the submenu, with its filter.
  const subTrigger = elements(menu, 'DropdownMenuSubTrigger').find(el => el.getText().includes('allModels('))
  if (!subTrigger) fail(header, menu, 'no all-models submenu row (UI.model.allModels(provider.name)): the catalogue would be unreachable')
  if (!subs.length) fail(header, menu, 'no DropdownMenuSubContent under the model menu: the submenu list has nowhere to open')

  // The search field, at the top of the menu, with the keys the field has to keep for itself.
  const searchEl = elements(menu, 'Input').find(el => attributeOf(el, 'data-hui-part').includes('model-search'))
  if (!searchEl) {
    fail(header, menu, 'no search field (Input with data-hui-part="model-search") in the menu: a model cannot be typed in')
  } else {
    const keys = attributeOf(searchEl, 'onKeyDown')
    for (const key of ['stopPropagation', 'ArrowDown', 'ArrowUp', 'Enter', 'Escape']) {
      if (!keys.includes(key)) fail(header, searchEl, `the search field's onKeyDown never handles ${key}: the menu would take the keystroke away from the field`)
    }
    if (!attributeOf(searchEl, 'autoFocus')) fail(header, searchEl, 'the search field is not focused on open: the person has to click it before typing')
    // It has to be the first thing in the menu: above the provider groups.
    if (menu.getText().indexOf('model-search') > menu.getText().indexOf('DropdownMenuRadioGroup')) {
      fail(header, searchEl, 'the search field is rendered below the provider groups: it belongs at the top of the menu')
    }
  }

  // While a query is typed, the groups are replaced by the flat list.
  if (!menu.getText().includes('<ModelHits')) fail(header, menu, 'the menu never renders ModelHits: a query would filter nothing')
  if (!/query\.trim\(\)/.test(menu.getText())) fail(header, menu, 'the menu does not switch on a non-empty query: the provider groups would stay under the flat list')
}

// `AllModels`: the submenu's own component, filter field first, then the provider's whole list.
let all = null
walk(header.source, node => {
  if (ts.isFunctionDeclaration(node) && node.name?.getText() === 'AllModels') all = node
})
if (!all) {
  problems.push('src/app/model-menu.tsx:1:1: AllModels is gone: the submenu list must mount with the submenu, not with the composer')
} else {
  const body = all.body?.getText() ?? ''
  if (!elements(all, 'Input').length) fail(header, all, 'AllModels has no filter field: the full list needs its search box on top')
  if (!body.includes('provider.models')) fail(header, all, 'AllModels no longer lists provider.models')
  if (body.indexOf('provider.models') > body.indexOf('DropdownMenuRadioItem') && body.indexOf('DropdownMenuRadioItem') !== -1) {
    fail(header, all, 'AllModels renders its rows before reading the catalogue')
  }
}

// `ModelHits`: the flat list — the provider's mark, the model's name, and the provider's slug in the small print.
const hitsFn = functionNamed(header, 'ModelHits')
if (!hitsFn) {
  problems.push('src/app/model-menu.tsx:1:1: ModelHits is gone: the search has no flat list to show')
} else {
  const body = hitsFn.getText()
  if (!body.includes('data-model-hit=')) fail(header, hitsFn, 'ModelHits rows carry no data-model-hit: the check cannot address a result')
  if (!body.includes('modelLabel(hit.model)')) fail(header, hitsFn, 'ModelHits does not print the model label')
  if (!body.includes('hit.provider.slug')) fail(header, hitsFn, 'ModelHits does not print the provider slug beside the model')
  if (!body.includes('noModel')) fail(header, hitsFn, 'ModelHits says nothing when nothing matches: an empty box reads as a bug')
  if (!body.includes('onPick')) fail(header, hitsFn, 'ModelHits has no click path: a result could not be chosen')
}

// The click path: a row applies through `chooseModel` and never writes the preference itself.
const pick = functionNamed(header, 'pick')
if (!pick) {
  problems.push('src/app/model-menu.tsx:1:1: pick is gone: the rows have no handler')
} else {
  const body = pick.getText()
  if (!body.includes('chooseModel(')) fail(header, pick, 'pick does not call chooseModel: the choice would only be stored, not applied to the session')
  if (body.includes('savePrefs(')) fail(header, pick, 'pick writes savePrefs directly: the trigger would move on a model the gateway refused')
}

// The press that used to close the menu out from under the submenu's rows.
const changeOpen = functionNamed(header, 'changeOpen')
if (!changeOpen) {
  problems.push('src/app/model-menu.tsx:1:1: changeOpen is gone: the menu has no outside-press handling')
} else if (!changeOpen.getText().includes('.hui-model-menu, .hui-model-sub')) {
  fail(header, changeOpen, 'changeOpen closes on an outside press that lands inside the portalled submenu: the row that was clicked never sees its click')
}

/* ------------------------------------------------- 1.5.4: the provider with no key -- */

// A provider the profile has no key for cannot apply a model: its rows are disabled and the group says why
// (`UI.model.needsKey`). A row that looks clickable and cannot land is the same lie as a trigger that never moves.
const strings = parse(STRINGS)
if (!/needsKey\s*:/.test(strings.text)) {
  problems.push('src/app/strings.ts:1:1: UI.model.needsKey is gone: a provider without a key would offer rows with nothing to say')
}
if (!header.text.includes('needsKey')) {
  fail(header, header.source, 'the model menu never prints UI.model.needsKey: a provider without a key would offer rows as if it had one')
}
if (!header.text.includes('providerReady(') && !header.text.includes('authenticated')) {
  fail(header, header.source, 'the model menu never reads `authenticated` / providerReady: a provider without a key would offer clickable models')
} else if (menu) {
  const disabled = elements(menu, 'DropdownMenuRadioItem')
    .filter(row => !elements(menu, 'DropdownMenuSubContent').some(sub => sub.pos <= row.pos && row.end <= sub.end))
    .filter(row => attributeOf(row, 'disabled').includes('providerReady(') || attributeOf(row, 'disabled').includes('authenticated'))
  if (!disabled.length) {
    fail(header, menu, 'no provider row is disabled on `authenticated`: a provider without a key would list models that cannot be applied')
  }
}

/* ------------------------------------------------------------------ hermes.js -- */

const hermes = parse(HERMES)

// Both paths go through one application: the picker's click, and the next prompt after a stored preference changed.
const applyFn = functionNamed(hermes, 'applyModel')
if (!applyFn) {
  problems.push('src/lib/hermes.js:1:1: applyModel is gone: the picker and the next turn would each build their own command')
}
const applyPrefs = functionNamed(hermes, 'applyPrefsToSession')
if (!applyPrefs) {
  problems.push('src/lib/hermes.js:1:1: applyPrefsToSession is gone: a stored preference would never reach the session')
} else if (!callsTo(applyPrefs, 'applyModel').length) {
  fail(hermes, applyPrefs, 'applyPrefsToSession does not call applyModel: two implementations of "apply a model" would drift apart')
}
const chooseFn = functionNamed(hermes, 'chooseModel')
if (!chooseFn) {
  problems.push('src/lib/hermes.js:1:1: chooseModel is gone: the picker has no switch that can refuse')
} else if (!callsTo(chooseFn, 'applyModel').length) {
  fail(hermes, chooseFn, 'chooseModel does not call applyModel: the click would not use the session path')
}

if (problems.length) {
  for (const problem of problems) console.error(problem)
  console.error(`\ncheck-model-menu: ${problems.length} problem(s) — the picker's first level must stay at ${MAX_TOP} models per provider, a click must really switch, and a typed name must find its model.`)
  process.exit(1)
}

/* ------------------------------------------------------- the behaviour, run for real -- */

const scratch = process.env.HUI_SCRATCH || join(ROOT, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const outfile = join(scratch, 'hui-model-menu.bundle.mjs')

const ENTRY = `
import { applyModel, bindContext, chooseModel, prefsFor, store } from '@/lib/hermes'
import { chosenModel, foldSearch, searchModels } from '@/app/models'
import { ModelHits } from '@/app/model-menu'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
export { applyModel, bindContext, chooseModel, prefsFor, store, chosenModel, foldSearch, searchModels, ModelHits, React, renderToStaticMarkup }
`

let runtime
try {
  await build({
    stdin: { contents: ENTRY, resolveDir: ROOT, sourcefile: 'check-model-menu-entry.tsx', loader: 'tsx' },
    outfile,
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    jsx: 'automatic',
    external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
    // A vendored dependency ships CommonJS that `require`s React; node's own `require` is handed to it, which is
    // also the copy `react-dom/server` renders with, so the card's hooks find their dispatcher.
    banner: { js: "import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);" },
    define: { 'process.env.NODE_ENV': '"production"' },
    alias: {
      '@hermes/plugin-sdk': join(ROOT, 'scripts', 'fixtures', 'sdk-stub.mjs'),
      '@': resolve(ROOT, 'src')
    },
    loader: { '.css': 'empty' },
    logLevel: 'silent'
  })
  runtime = await import(pathToFileURL(outfile).href)
} catch (error) {
  console.error('FAIL the picker cannot be run at all')
  console.error(`     ${String(error?.message || error).split('\n').slice(0, 6).join('\n     ')}`)
  console.error('\ncheck-model-menu: 1 problem — the click path cannot be exercised.')
  process.exit(1)
}

const { applyModel, bindContext, chooseModel, prefsFor, store, chosenModel, foldSearch, searchModels, ModelHits, React, renderToStaticMarkup } = runtime

const calls = []
let slashAnswer = () => ({ success: true })
globalThis.__hostRequest = (method, params) => {
  calls.push({ method, params })
  if (method === 'slash.exec') return Promise.resolve(slashAnswer(params))
  return Promise.resolve({})
}

const memory = new Map()
bindContext({
  storage: { get: (key, fallback) => (memory.has(key) ? memory.get(key) : fallback), set: (key, value) => memory.set(key, value) },
  setTimeout: fn => {
    void Promise.resolve().then(fn)
    return 0
  },
  setInterval: () => 0,
  rest: async () => ({})
})

/** A catalogue shaped like `model.options` answers it: two providers, one accented model, one label per model. */
const PROVIDERS = [
  { slug: 'opencode-go', name: 'OpenCode Go', models: ['gpt-6', 'deepseek-v4'] },
  { slug: 'anthropic', name: 'Anthropic', models: ['claude-sonnet-5', 'claude-haiku-4-5', 'modèle-test'] }
]

const results = []
const check = (name, ok, detail = '') => results.push({ name, ok, detail })
const lastSlash = () => [...calls].reverse().find(call => call.method === 'slash.exec')?.params || {}

/* ---- the search ---- */

check('une recherche vide ne filtre rien', searchModels(PROVIDERS, '').length === 0 && searchModels(PROVIDERS, '   ').length === 0)
check('« Créer » et « creer » se replient pareil', foldSearch('Créer') === 'creer', foldSearch('Créer'))

// Typing "g", then "gp", then "gpt": the list is rebuilt on every keystroke, and the last one names one model.
let hits = []
for (const query of ['g', 'gp', 'gpt']) hits = searchModels(PROVIDERS, query)
check('trois lettres nomment le modèle', hits.length === 1 && hits[0].model === 'gpt-6', hits.map(hit => `${hit.provider.slug}:${hit.model}`).join(', ') || 'aucun')

const wide = searchModels(PROVIDERS, 'e')
check('la liste est plate et couvre deux providers', new Set(wide.map(hit => hit.provider.slug)).size === 2, [...new Set(wide.map(hit => hit.provider.slug))].join(', '))
check('un nom accentué se trouve sans accent', searchModels(PROVIDERS, 'modele').some(hit => hit.model === 'modèle-test'))
check('le nom du provider liste ce qu’il sert', searchModels(PROVIDERS, 'anthropic').length === 3)

const markup = renderToStaticMarkup(React.createElement(ModelHits, { hits: wide, active: 0, onHover: () => {}, onPick: () => {} }))
check('la liste plate est rendue', markup.includes('data-hui-part="model-hits"'), markup.slice(0, 60))
check(
  'chaque résultat porte le modèle et le provider',
  wide.every(hit => markup.includes(`data-model-hit="${hit.provider.slug}:${hit.model}"`)) && markup.includes('anthropic'),
  `${(markup.match(/data-model-hit=/g) || []).length} row(s)`
)
check('la ligne surlignée est balisée', markup.includes('data-active="true"'))
const empty = renderToStaticMarkup(React.createElement(ModelHits, { hits: [], active: 0, onHover: () => {}, onPick: () => {} }))
check('aucun résultat dit « No model »', empty.includes('No model'), empty.slice(0, 60))

/* ---- the click, first level, then the submenu, then the search's Enter ---- */

store.set({ bot: 'dex', sid: 'session-1' })
memory.set('prefs', {})

calls.length = 0
slashAnswer = () => ({ success: true })
const firstLevel = await chooseModel('dex', 'claude-sonnet-5', 'opencode-go')
check('un clic au premier niveau applique le modèle à la session', lastSlash().command === '/model claude-sonnet-5 --provider opencode-go', JSON.stringify(lastSlash()))
check('la commande emporte la confirmation du modèle cher', lastSlash().confirm_expensive_model === true, String(lastSlash().confirm_expensive_model))
check(
  'la préférence et le déclencheur suivent le succès',
  firstLevel === true && prefsFor('dex').model === 'claude-sonnet-5' && chosenModel(prefsFor('dex'), { model: 'profile-default' }) === 'claude-sonnet-5',
  JSON.stringify(prefsFor('dex'))
)

calls.length = 0
const submenu = await chooseModel('dex', 'claude-haiku-4-5', 'anthropic')
check('un clic dans le sous-menu passe par le même chemin', submenu === true && lastSlash().command === '/model claude-haiku-4-5 --provider anthropic', JSON.stringify(lastSlash()))

calls.length = 0
const fromSearch = await chooseModel('dex', hits[0].model, hits[0].provider.slug)
check(
  'Entrée sur un résultat applique le modèle surligné',
  fromSearch === true && lastSlash().command === `/model ${hits[0].model} --provider ${hits[0].provider.slug}`,
  JSON.stringify(lastSlash())
)

/* ---- the refusal: back to the old model, and said ---- */

const before = { ...prefsFor('dex') }
store.set({ notice: null })
calls.length = 0
slashAnswer = () => ({ success: false, error: 'unknown provider' })
const refused = await chooseModel('dex', 'deepseek-v4', 'opencode-go')
check('un refus du gateway n’applique rien', refused === false, String(refused))
check(
  'le déclencheur revient à l’ancienne valeur',
  prefsFor('dex').model === before.model && prefsFor('dex').provider === before.provider && chosenModel(prefsFor('dex'), { model: '' }) === before.model,
  `${JSON.stringify(prefsFor('dex'))} vs ${JSON.stringify(before)}`
)
check('le refus est dit, dans la copie traduite', /Couldn't switch to Deepseek v4/.test(store.get().notice?.text || ''), JSON.stringify(store.get().notice?.text || null))

/* ---- a thrown RPC reads as a refusal too ---- */

slashAnswer = () => {
  throw new Error('gateway said no')
}
const thrown = await chooseModel('dex', 'claude-haiku-4-5', 'anthropic')
check('une erreur du RPC ne change pas la préférence', thrown === false && prefsFor('dex').model === before.model, JSON.stringify(prefsFor('dex')))

/* ---- no session: the preference is all there is ---- */

slashAnswer = () => ({ success: true })
store.set({ sid: null })
calls.length = 0
const fresh = await chooseModel('dex', 'gpt-6', 'opencode-go')
check('sans session, la préférence est écrite sans appel', fresh === true && prefsFor('dex').model === 'gpt-6' && !calls.some(call => call.method === 'slash.exec'), `${calls.length} call(s)`)

/* ---- one application per change: the next prompt does not re-send it ---- */

store.set({ sid: 'session-1' })
calls.length = 0
const again = await applyModel('session-1', { model: 'gpt-6', provider: 'opencode-go' })
check('applyModel ne renvoie pas une commande déjà appliquée', again.ok === true && !calls.some(call => call.method === 'slash.exec'), `${calls.length} call(s)`)

/* ---- 1.5.4, A2: the slug the menu read is not the slug /model wants ---- */

// The gateway resolves the provider from the model id. So a refusal that named a provider is tried once more without
// `--provider` before the picker gives up — that refusal is what a person saw on Step 3.7 Flash:free.
store.set({ notice: null })
memory.set('prefs', {})
calls.length = 0
slashAnswer = params => (/--provider /.test(params.command) ? { success: false, error: 'provider "opencode-go" is not authenticated' } : { success: true })
const retried = await chooseModel('dex', 'stepfun/step-3.7-flash:free', 'opencode-go')
const commands = calls.filter(call => call.method === 'slash.exec').map(call => call.params.command)
check(
  'un refus nommant un provider se retente sans --provider',
  retried === true && commands.join(' then ') === '/model stepfun/step-3.7-flash:free --provider opencode-go then /model stepfun/step-3.7-flash:free',
  commands.join(' then ') || 'aucune commande'
)
check(
  'la seconde tentative passe : la préférence est écrite, rien n’est dit',
  prefsFor('dex').model === 'stepfun/step-3.7-flash:free' && prefsFor('dex').provider === 'opencode-go' && !store.get().notice,
  `${JSON.stringify(prefsFor('dex'))} notice=${JSON.stringify(store.get().notice)}`
)

/* ---- and when both fail: the gateway's own words, and the old model ---- */

const kept = { ...prefsFor('dex') }
store.set({ notice: null })
calls.length = 0
slashAnswer = () => ({ success: false, error: 'model not found: stepfun/ghost-1' })
const twice = await chooseModel('dex', 'stepfun/ghost-1', 'opencode-go')
const both = calls.filter(call => call.method === 'slash.exec').map(call => call.params.command)
check('deux refus : rien n’est appliqué', twice === false && prefsFor('dex').model === kept.model && prefsFor('dex').provider === kept.provider, JSON.stringify(prefsFor('dex')))
check(
  'deux refus : deux essais, le second sans --provider',
  both.join(' then ') === '/model stepfun/ghost-1 --provider opencode-go then /model stepfun/ghost-1',
  both.join(' then ') || 'aucune commande'
)
const told = store.get().notice?.text || ''
check(
  'la notice dit la raison du gateway',
  told.includes('model not found: stepfun/ghost-1'),
  JSON.stringify(told || null)
)
check('la notice garde la copie traduite en tête', /^Couldn't switch to /.test(told), JSON.stringify(told.slice(0, 60)))
check('la notice ne montre pas de JSON brut', !/[{}]/.test(told), JSON.stringify(told))

/* ---- A2, the menu side: a provider with no key offers nothing ---- */

const keyless = [...PROVIDERS, { slug: 'no-key-co', name: 'No Key Co', models: ['orphan-1'], authenticated: false }]
check('un provider sans clé ne sort pas de la recherche par son modèle', searchModels(keyless, 'orphan').length === 0, JSON.stringify(searchModels(keyless, 'orphan')))
check('ni par son nom', searchModels(keyless, 'no key').length === 0, JSON.stringify(searchModels(keyless, 'no key')))
check('les providers avec clé restent cherchables', searchModels(keyless, 'anthropic').length === 3, String(searchModels(keyless, 'anthropic').length))

/* ------------------------------------------------------------------- the report -- */

let failed = 0
for (const result of results) {
  if (!result.ok) failed += 1
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.detail ? ` — ${result.detail}` : ''}`)
}

if (failed) {
  console.error(`\ncheck-model-menu: ${failed} problem(s) — a click must apply, a refusal must revert and say so, and a typed name must find its model.`)
  process.exit(1)
}
console.log(`check-model-menu: OK — MODEL_MENU_TOP = ${top?.initializer?.getText() ?? '?'}, first level capped by topModels, all-models submenu with a filter, the click applies through applyModel, a refusal reverts, the search lists ${wide.length} hits across providers and Enter applies the highlighted one.`)
