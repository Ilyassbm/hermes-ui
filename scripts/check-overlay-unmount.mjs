// Guards the lot 11 failure: Escape or a digit closes the picker while its entrance is still running, Base UI waits on
// `element.getAnimations()` to unmount the popup (node_modules/@base-ui/react/internals/useAnimationsFinished.mjs), a
// CSS transition that never started yields an Animation stuck in `pending`, `animation.finished` never settles — and
// the dialog and its scrim stay mounted over the app, eating every click.
//
// So two static rules, parsed with the TypeScript AST (no regex over the source, no browser):
//
//   1. an element Base UI tracks — `data-hui-part="dialog-content"`, `data-hui-part="dialog-overlay"` or
//      `data-hui-part="dialog-backdrop"` — must not carry `overlay-motion` (a transition on the tracked node parks it) and
//      must end on `data-ending-style:duration-0`, so the unmount is synchronous whatever the entrance was doing.
//      A class may come from a constant or a cva() array, so every identifier in the expression is expanded from the
//      top-level `const` of the tree it is written in, four levels deep.
//   2. `src/app/bot-picker.tsx` keeps the belt: a `setTimeout` (≤ 1 s) that looks for a leftover
//      `[data-hui-part="dialog-content"]…[data-open]` once the picker is closed, and a `key` on its `<Dialog>` so the
//      React remount is what removes the node.
//
//   node scripts/check-overlay-unmount.mjs            # src
//   node scripts/check-overlay-unmount.mjs src/app    # one folder
//   node scripts/check-overlay-unmount.mjs --list     # every file that was read
//
// Exits 1 with one line per problem (`path:line:col: what and why`), 0 otherwise. Run by `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const DEFAULT_ROOTS = ['src']

/** The slots Base UI mounts and unmounts on its own animation clock. */
export const TRACKED_SLOTS = new Set(['dialog-content', 'dialog-overlay', 'dialog-backdrop'])

/** The class that parks a tracked node, and the class that frees it. */
export const MOTION = /overlay-motion|overlayMotion|overlayMotionClass/
export const INSTANT = /data-ending-style:duration-0|duration-0/

/** The picker, and the guard it must keep. */
export const PICKER_FILE = 'src/app/bot-picker.tsx'
export const GUARD_MAX_MS = 1000

/** Every `.tsx` / `.ts` under `dir`, recursively, sorted. */
function sourceFiles(dir, out = []) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      if (entry === 'node_modules') continue
      sourceFiles(path, out)
    } else if (entry.endsWith('.tsx') || entry.endsWith('.ts')) out.push(path)
  }
  return out
}

/** The file as a TypeScript AST; TSX when the extension says so. */
function parseFile(path) {
  const text = readFileSync(path, 'utf8')
  const kind = path.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  return { path, text, source: ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true, kind) }
}

/** Every top-level `const NAME = <initializer>` of the tree, by name: the class strings live there. */
function collectConsts(files, into = new Map()) {
  for (const file of files) {
    for (const statement of file.source.statements) {
      if (!ts.isVariableStatement(statement)) continue
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue
        const list = into.get(declaration.name.text) ?? []
        list.push({ text: declaration.initializer.getText(file.source), file: file.path })
        into.set(declaration.name.text, list)
      }
    }
  }
  return into
}

/**
 * The text a class expression actually stands for: what is written, plus the initializer of every identifier it names,
 * four levels down. A cva() array or a shared constant is what carries `overlay-motion` in this repo.
 */
export function expand(text, consts, depth = 4) {
  if (depth <= 0) return text
  let out = text
  const names = new Set(text.match(/[A-Za-z_$][\w$]*/g) ?? [])
  for (const name of names) {
    const found = consts.get(name)
    if (!found || found.length > 2) continue
    for (const entry of found) out += ` ${expand(entry.text, consts, depth - 1)}`
  }
  return out
}

/** The attributes of a JSX opening element, by name. */
function attributesOf(opening) {
  const map = new Map()
  for (const attr of opening.attributes.properties) {
    if (!ts.isJsxAttribute(attr) || !attr.name) continue
    map.set(attr.name.getText(), attr)
  }
  return map
}

/** The literal a JSX attribute holds, or null when it is an expression or missing. */
function literalOf(attr) {
  if (!attr || !attr.initializer) return null
  const init = attr.initializer
  if (ts.isStringLiteral(init)) return init.text
  if (ts.isJsxExpression(init) && init.expression) {
    const expr = ts.isParenthesizedExpression(init.expression) ? init.expression.expression : init.expression
    if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) return expr.text
  }
  return null
}

/** Every JSX opening element of a file, nested ones included. */
function jsxOpenings(source) {
  const out = []
  const visit = node => {
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) out.push(node.openingElement ?? node)
    ts.forEachChild(node, visit)
  }
  visit(source)
  return out
}

/**
 * Rule 1: a tracked slot must not carry `overlay-motion`, and must end on duration 0.
 * @returns {{line: number, column: number, message: string}[]}
 */
export function checkTrackedSlots(file, consts) {
  const problems = []
  for (const opening of jsxOpenings(file.source)) {
    const attrs = attributesOf(opening)
    const slot = literalOf(attrs.get('data-hui-part'))
    if (!slot || !TRACKED_SLOTS.has(slot)) continue
    const at = file.source.getLineAndCharacterOfPosition(opening.getStart(file.source))
    const where = { line: at.line + 1, column: at.character + 1 }
    const className = attrs.get('className')
    const text = className ? expand(className.getText(file.source), consts) : ''
    if (MOTION.test(text) && !INSTANT.test(text)) {
      problems.push({
        ...where,
        message: `data-hui-part="${slot}" porte overlay-motion sans data-ending-style:duration-0 : Base UI démonte sur getAnimations(), une transition non démarrée ne se termine jamais et le nœud (avec son voile) reste sur l'app.`,
      })
    } else if (!INSTANT.test(text)) {
      problems.push({
        ...where,
        message: `data-hui-part="${slot}" n'a pas data-ending-style:duration-0 : le démontage doit être synchrone, il ne doit dépendre d'aucune transition.`,
      })
    }
  }
  return problems
}

/** A number a call argument stands for, literal or through a top-level `const`. */
function numberFrom(text, consts) {
  const literal = text.trim()
  if (/^\d+$/.test(literal)) return Number(literal)
  const found = consts.get(literal)
  if (!found) return null
  for (const entry of found) if (/^\d+$/.test(entry.text.trim())) return Number(entry.text.trim())
  return null
}

/**
 * Rule 2: the picker keeps a timeout guard that reads its own content ref once the dialog is closed (a node still
 * connected is the leftover), and a `key` on the <Dialog> — or on the element wrapping it, so a fragment key counts —
 * so a forced remount is what clears the node. Lot 13: no `document.querySelector` with a `[data-…]` selector in that
 * timer — the catalog refuses a plugin that reaches the app's markup.
 * @returns {{line: number, column: number, message: string}[]}
 */
export function checkPickerGuard(file, consts) {
  const problems = []
  let guard = false
  let keyed = false
  const visit = (node, keyedAbove) => {
    if (ts.isCallExpression(node)) {
      const callee = node.expression.getText(file.source)
      if (/(^|\.)setTimeout$/.test(callee) && node.arguments.length >= 2) {
        const body = node.arguments[0].getText(file.source)
        const delay = numberFrom(node.arguments[1].getText(file.source), consts)
        if (
          delay !== null &&
          delay <= GUARD_MAX_MS &&
          /\.current\b/.test(body) &&
          /isConnected/.test(body) &&
          !/querySelector|querySelectorAll/.test(body) &&
          !/\[data-/.test(body)
        ) {
          guard = true
        }
      }
    }
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      const opening = node.openingElement ?? node
      const attrs = attributesOf(opening)
      const tag = (opening.tagName?.getText(file.source) ?? '').trim()
      const keyHere = keyedAbove || attrs.has('key')
      if (tag === 'Dialog' && keyHere) keyed = true
      const children = ts.isJsxElement(node) ? node.children : undefined
      if (children) for (const child of children) visit(child, keyHere)
      else for (const attr of opening.attributes.properties) visit(attr, keyHere)
      return
    }
    ts.forEachChild(node, child => visit(child, keyedAbove))
  }
  visit(file.source, false)
  if (!guard) {
    problems.push({
      line: 1,
      column: 1,
      message: `pas de garde-fou : un setTimeout(≤ ${GUARD_MAX_MS} ms) doit vérifier qu'aucun [data-hui-part="dialog-content"][data-open] ni voile du picker ne reste dans le DOM après la fermeture, et le démonter.`,
    })
  }
  if (!keyed) {
    problems.push({
      line: 1,
      column: 1,
      message: 'the picker\'s <Dialog> has no `key`: a forced unmount must be able to go through a React remount (an incremented key).',
    })
  }
  return problems
}

/** Runs both rules over `roots` (relative to the repo). */
export function run(roots = DEFAULT_ROOTS) {
  const files = []
  for (const dir of roots) sourceFiles(resolve(ROOT, dir), files)
  const parsed = files.map(parseFile)
  const consts = collectConsts(parsed)
  const problems = []
  for (const file of parsed) {
    for (const problem of checkTrackedSlots(file, consts)) problems.push({ file: file.path, ...problem })
  }
  const picker = parsed.find(file => relative(ROOT, file.path) === PICKER_FILE)
  if (!picker) {
    problems.push({ file: resolve(ROOT, PICKER_FILE), line: 1, column: 1, message: 'fichier absent : le garde-fou du picker ne peut pas être vérifié.' })
  } else {
    for (const problem of checkPickerGuard(picker, consts)) problems.push({ file: picker.path, ...problem })
  }
  return { files: parsed.length, problems }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const args = process.argv.slice(2)
  if (args.includes('--list')) {
    const files = []
    for (const dir of DEFAULT_ROOTS) sourceFiles(resolve(ROOT, dir), files)
    for (const path of files) console.log(relative(ROOT, path))
  } else {
    const roots = args.filter(arg => !arg.startsWith('--'))
    const { files, problems } = run(roots.length ? roots : DEFAULT_ROOTS)
    if (problems.length) {
      console.error(`overlay-unmount: ${problems.length} problème(s) — le picker peut laisser un voile sur l'app`)
      for (const problem of problems) {
        console.error(`  ${relative(ROOT, problem.file)}:${problem.line}:${problem.column}: ${problem.message}`)
      }
      process.exit(1)
    }
    console.log(`overlay-unmount: ${files} fichier(s), aucun élément suivi par Base UI sous overlay-motion sans duration-0, garde-fou du picker présent`)
  }
}
