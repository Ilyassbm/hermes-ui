// Guards the model picker's first level, which is what closed the menu on a real click: ~60 radio rows (one per model,
// per provider) laid out on open, the thread blocked for 1.5 s, and the release of the click arriving on an open menu
// that Base UI then closed (lot 8).
//
// The rule the picker keeps: the first level shows at most MODEL_MENU_TOP models per provider, taken from `topModels`
// (which slices with that constant); the whole catalogue lives in the `UI.model.allModels(provider.name)` submenu
// ("All … models…"), whose list is mounted with the submenu and opens on a filter field.
//
// Checked statically, with the TypeScript AST (no browser, no gateway):
//   1. MODEL_MENU_TOP is a number, and at most 8;
//   2. every `.slice(...)` in topModels is capped by MODEL_MENU_TOP (or a literal ≤ 8), so the constant is the real cap;
//   3. in the model menu's first level, every DropdownMenuRadioItem is fed by `topModels(...)` — not by
//      `provider.models` directly, and not by a numeric slice above 8;
//   4. the level has an all-models submenu (`UI.model.allModels(…)`), and `AllModels` renders a filter field before
//      the full list.
//
//   node scripts/check-model-menu.mjs
//
// Exits 1 with one line per problem (`path:line:col: what and why`), 0 otherwise. Run by `npm run build`.
import { readFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const MODELS = join(ROOT, 'src/app/models.ts')
const HEADER = join(ROOT, 'src/app/model-menu.tsx')

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

/** The property name of `a.b(...)`: 'b'. */
function calledName(call) {
  return ts.isPropertyAccessExpression(call.expression) ? call.expression.name.getText() : ''
}

/** The text of the list a `.map(...)` iterates. */
function mappedOver(mapCall) {
  const over = mapCall.expression.expression
  return over ? over.getText() : ''
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

if (problems.length) {
  for (const problem of problems) console.error(problem)
  console.error(`\ncheck-model-menu: ${problems.length} problem(s) — the picker's first level must stay at ${MAX_TOP} models per provider.`)
  process.exit(1)
}
console.log(`check-model-menu: OK — MODEL_MENU_TOP = ${top?.initializer?.getText() ?? '?'}, first level capped by topModels, all-models submenu with a filter.`)
