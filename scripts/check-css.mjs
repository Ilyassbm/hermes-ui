// Guards the compiled Glaze stylesheet: no rule may restyle the native app around our page.
// Fails when the CSS carries a `:root`, `:host`, `html`, `body`, `*` or `::backdrop` selector that is not
// scoped under `.glaze` (or `[data-system="glaze"]`). Run by `npm run build` right after Tailwind compiles,
// and on its own: `node scripts/check-css.mjs [file]`.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'

export const DEFAULT_FILE = 'src/styles/.compiled.css'

/** The theme's `customCSS`: the one sheet allowed to reach the app, under its own guards (see `checkNativeSkin`). */
export const NATIVE_SKIN_FILE = 'src/app/native-skin.css'
/** Its budget in bytes: it ships inside desktop/plugin.js and is injected on every theme apply. */
export const NATIVE_SKIN_MAX = 8 * 1024

/** The selectors that would reach the native app if they were left unscoped. Bare `::before` / `::after` are in the
 *  list because Tailwind emits them beside `*` for its `--tw-*` defaults. */
const GLOBAL_START = /^(:root|:host|html|body|\*|::backdrop|::before|::after)(?![\w-])/

/** A selector list part is scoped when its subject is `.glaze` or `[data-system="glaze"]`. */
function isScoped(selector) {
  const sel = selector.trim()
  if (/^\.glaze(?![\w-])/.test(sel)) return true
  if (/^\[data-system\s*=\s*["']?glaze/.test(sel)) return true
  if (/^:where\(\.glaze/.test(sel) || /^:is\(\.glaze/.test(sel)) return true
  return false
}

/** Splits a selector list on commas that are not inside (…) or […]. */
function splitSelectorList(selector) {
  const parts = []
  let depth = 0
  let quote = null
  let start = 0
  for (let i = 0; i < selector.length; i++) {
    const c = selector[i]
    if (quote) {
      if (c === quote && selector[i - 1] !== '\\') quote = null
      continue
    }
    if (c === '"' || c === "'") { quote = c; continue }
    if (c === '(' || c === '[') depth++
    else if (c === ')' || c === ']') depth--
    else if (c === ',' && depth === 0) { parts.push(selector.slice(start, i)); start = i + 1 }
  }
  parts.push(selector.slice(start))
  return parts
}

/**
 * Returns every global selector found in `css`, with the at-rule it sits in.
 * @returns {{selector: string, atRule: string|null}[]}
 */
export function findGlobalSelectors(css) {
  const root = postcss.parse(css)
  const found = []
  root.walkRules(rule => {
    // `0%`, `to`, `from`: a keyframe step, never a selector on the page.
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return
    for (const part of splitSelectorList(rule.selector)) {
      const sel = part.trim()
      if (!sel) continue
      if (!GLOBAL_START.test(sel)) continue
      if (isScoped(sel)) continue
      found.push({ selector: sel, atRule: rule.parent?.type === 'atrule' ? `@${rule.parent.name}` : null })
    }
  })
  return found
}

/** Rewrites the same global selectors under `.glaze`, so the bundle never restyles the app. */
export function scopeGlobalSelectors(css) {
  const root = postcss.parse(css)
  let changed = 0
  root.walkRules(rule => {
    if (rule.parent?.type === 'atrule' && /keyframes$/i.test(rule.parent.name)) return
    if (!rule.selector) return
    const parts = splitSelectorList(rule.selector).map(part => {
      const sel = part.trim()
      if (!sel || isScoped(sel) || !GLOBAL_START.test(sel)) return sel
      changed++
      // A bare universal or pseudo-element covers every element (or its pseudo): prefix it with the scope, never
      // replace it — `.glaze ::before` is the pseudo of a scoped element, `.glaze` is not the same rule.
      if (sel.startsWith('*') || sel.startsWith('::')) return `.glaze ${sel}`
      // :root, :host, html, body → the page root, which is the `.glaze` element here.
      return sel.replace(GLOBAL_START, '.glaze')
    })
    const unique = [...new Set(parts)]
    rule.selector = unique.join(', ')
  })
  return { css: root.toString(), changed }
}

/**
 * Guards the native skin (the theme's `customCSS`), which is the one stylesheet meant to reach the app.
 *
 * Its two rules, both hard:
 *  - it must never target `.glaze`: the page owns its own look, and a skin rule that lands inside it is a regression
 *    of "no rule may restyle Hermes UI";
 *  - every rule must carry the `:not(.glaze …)` guard, so the app is skinned and the page is left alone;
 *  - and it stays under 8 kB, because it ships inside the bundle and is injected on every theme apply.
 *
 * @returns {{errors: string[], bytes: number, rules: number}}
 */
export function checkNativeSkin(css) {
  const errors = []
  const bytes = Buffer.byteLength(css, 'utf8')
  let rules = 0

  if (bytes >= NATIVE_SKIN_MAX) {
    errors.push(`${bytes} bytes — the budget is ${NATIVE_SKIN_MAX} (< 8 kB)`)
  }

  const root = postcss.parse(css)
  root.walkRules(rule => {
    if (!rule.selector) return
    rules++
    for (const part of splitSelectorList(rule.selector)) {
      const sel = part.trim()
      if (!sel) continue
      // The guard itself mentions .glaze — that is the point of it. Strip it, then look for a real target.
      const bare = sel.replace(/:not\(\s*\.glaze[^)]*\)/g, '')
      if (/\.glaze(?![\w-])/.test(bare) || /\[data-system\s*=\s*["']?glaze/.test(bare)) {
        errors.push(`targets Hermes UI: ${sel}`)
        continue
      }
      if (!sel.includes(':not(.glaze')) errors.push(`missing the :not(.glaze …) guard: ${sel}`)
    }
  })

  return { errors, bytes, rules }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const file = process.argv[2] ?? DEFAULT_FILE
  // `.compiled.css` is a build artifact and is not committed, so on a fresh clone this standalone run has nothing to
  // read yet. Say so and still check the one sheet that ships by hand rather than failing a gate nobody can satisfy
  // without a build. `npm run build` runs the same assertion on the real output, and fails it there.
  let css = ''
  try {
    css = readFileSync(file, 'utf8')
  } catch (e) {
    if (e?.code !== 'ENOENT') throw e
    console.log(`check-css: ${file} is not built yet — skipping the compiled assertion (npm run build enforces it)`)
  }
  if (!css) {
    const skinOnly = checkNativeSkin(readFileSync(NATIVE_SKIN_FILE, 'utf8'))
    if (skinOnly.errors.length) {
      console.error(`check-css: ${skinOnly.errors.length} problem(s) in ${NATIVE_SKIN_FILE}`)
      for (const error of skinOnly.errors.slice(0, 20)) console.error(`  ${error}`)
      process.exit(1)
    }
    console.log(`check-css: OK — ${NATIVE_SKIN_FILE} is ${skinOnly.bytes} bytes, ${skinOnly.rules} rules, all guarded`)
    process.exit(0)
  }
  const found = findGlobalSelectors(css)
  if (found.length) {
    console.error(`check-css: ${found.length} global selector(s) escape .glaze in ${file}`)
    for (const hit of found.slice(0, 20)) console.error(`  ${hit.atRule ? `${hit.atRule} → ` : ''}${hit.selector}`)
    process.exit(1)
  }
  console.log(`check-css: OK — ${file} has no :root, :host, html, body, * or ::backdrop outside .glaze`)

  const skin = checkNativeSkin(readFileSync(NATIVE_SKIN_FILE, 'utf8'))
  if (skin.errors.length) {
    console.error(`check-css: ${skin.errors.length} problem(s) in ${NATIVE_SKIN_FILE}`)
    for (const error of skin.errors.slice(0, 20)) console.error(`  ${error}`)
    process.exit(1)
  }
  console.log(
    `check-css: OK — ${NATIVE_SKIN_FILE} is ${skin.bytes} bytes, ${skin.rules} rules, none targeting .glaze and all guarded by :not(.glaze …)`
  )
}
