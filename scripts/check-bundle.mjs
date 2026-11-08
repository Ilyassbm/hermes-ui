// Guards the bundle the desktop loader has to run: one ESM file, imports only from the three modules the loader
// provides, and no CommonJS escape hatch left in it.
//
// Why each rule exists:
//  - `__require("…")` / `require("…")` : the plugin is loaded as an ES module, where `require` is undefined, so esbuild
//    turns a leftover CJS `require` into a function that throws "Dynamic require of X is not supported" at run time. A
//    single one from a dependency (use-sync-external-store via @base-ui, typically) takes the whole page down at load.
//  - `.development.js` : a development build reached through `process.env.NODE_ENV` ships the unminified React paths,
//    asserts and warning strings. The build defines NODE_ENV=production; if one of these names still shows up, that
//    define stopped working.
//  - imports : the loader hands the plugin `@hermes/plugin-sdk`, `react` and `react/jsx-runtime` and nothing else. Any
//    other bare import resolves to nothing inside the app and throws at load.
//
// Run by `npm run build` after esbuild, and on its own: `node scripts/check-bundle.mjs [file]`.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export const DEFAULT_FILE = 'desktop/plugin.js'

/** The only modules the Hermes Desktop plugin loader resolves for us. */
export const ALLOWED_IMPORTS = new Set(['@hermes/plugin-sdk', 'react', 'react/jsx-runtime'])

const isIdentStart = c => /[A-Za-z_$]/.test(c)
const isIdentPart = c => /[A-Za-z0-9_$]/.test(c)

/** Skips a quoted string starting at `i` (the opening quote) and returns the index after its closing quote. */
function skipString(code, i) {
  const quote = code[i]
  i++
  while (i < code.length) {
    const c = code[i]
    if (c === '\\') { i += 2; continue }
    if (c === quote) return i + 1
    if (c === '\n') return i // an unterminated string: stop at the line, never swallow the file
    i++
  }
  return i
}

/** Skips a template literal starting at `i` (the backtick); `${…}` blocks may nest strings and templates. */
function skipTemplate(code, i) {
  i++
  while (i < code.length) {
    const c = code[i]
    if (c === '\\') { i += 2; continue }
    if (c === '`') return i + 1
    if (c === '$' && code[i + 1] === '{') { i = skipExpression(code, i + 2); continue }
    i++
  }
  return i
}

/** Skips a `${…}` body up to and including its closing brace, so a quote inside it is not read as code. */
function skipExpression(code, i) {
  let depth = 1
  while (i < code.length) {
    const c = code[i]
    if (c === '"' || c === "'") { i = skipString(code, i); continue }
    if (c === '`') { i = skipTemplate(code, i); continue }
    if (c === '/' && code[i + 1] === '/') { const e = code.indexOf('\n', i); i = e < 0 ? code.length : e; continue }
    if (c === '/' && code[i + 1] === '*') { const e = code.indexOf('*/', i + 2); i = e < 0 ? code.length : e + 2; continue }
    if (c === '{') depth++
    else if (c === '}' && --depth === 0) return i + 1
    i++
  }
  return i
}

/** Skips a regular expression literal starting at `i` (the slash), plus its flags. */
function skipRegex(code, i) {
  let inClass = false
  i++
  while (i < code.length) {
    const c = code[i]
    if (c === '\\') { i += 2; continue }
    if (c === '[') inClass = true
    else if (c === ']') inClass = false
    else if (c === '/' && !inClass) { i++; break }
    else if (c === '\n') return i
    i++
  }
  while (i < code.length && /[a-z]/i.test(code[i])) i++
  return i
}

/**
 * Every module specifier a static `import` / `export … from` names, with the byte offset it was read at.
 * Strings, comments, template literals and regexes are skipped, so text that merely looks like an import is not one.
 * @returns {{specifier: string, at: number, dynamic?: boolean}[]}
 */
export function scanImports(code) {
  const found = []
  let i = 0
  let lastSignificant = ''
  const readSpecifier = at => {
    // Optional spaces, then a quoted module path. `from"react"` (minified) and `from "react"` both read the same.
    let j = at
    while (j < code.length && /\s/.test(code[j])) j++
    const q = code[j]
    if (q !== '"' && q !== "'") return null
    const end = code.indexOf(q, j + 1)
    if (end < 0) return null
    return { specifier: code.slice(j + 1, end), at: j, end: end + 1 }
  }

  while (i < code.length) {
    const c = code[i]
    if (c === '/' && code[i + 1] === '/') {
      const e = code.indexOf('\n', i)
      i = e < 0 ? code.length : e
      continue
    }
    if (c === '/' && code[i + 1] === '*') {
      const e = code.indexOf('*/', i + 2)
      i = e < 0 ? code.length : e + 2
      continue
    }
    if (c === '"' || c === "'") { i = skipString(code, i); lastSignificant = 'x'; continue }
    if (c === '`') { i = skipTemplate(code, i); lastSignificant = 'x'; continue }
    // A regex may follow an operator, an opening bracket, a comma or nothing; after a value it is a division.
    if (c === '/' && (lastSignificant === '' || '(,=:[!&|?{};+-*%<>~^'.includes(lastSignificant))) {
      i = skipRegex(code, i)
      lastSignificant = 'x'
      continue
    }
    if (isIdentStart(c)) {
      const start = i
      while (i < code.length && isIdentPart(code[i])) i++
      const word = code.slice(start, i)
      if (word === 'import' && code[i] !== ':') {
        let j = i
        while (j < code.length && /\s/.test(code[j])) j++
        if (code[j] === '(') {
          // A dynamic import of a bare module fails in the loader exactly like a static one.
          const hit = readSpecifier(j + 1)
          if (hit) found.push({ specifier: hit.specifier, at: hit.at, dynamic: true })
          continue
        }
        const hit = readSpecifier(j)
        if (hit) {
          found.push({ specifier: hit.specifier, at: hit.at })
          i = hit.end
        } else {
          // `import{…}from"x"` / `import a from"x"`: the specifier is read at its own `from`.
          if (code[j] === '{') i = j
        }
        lastSignificant = 'x'
        continue
      }
      if (word === 'from') {
        const hit = readSpecifier(i)
        // `from` is also a property name and a local variable; only a quoted path right after it is an import.
        if (hit) {
          found.push({ specifier: hit.specifier, at: hit.at })
          i = hit.end
          lastSignificant = 'x'
          continue
        }
      }
      lastSignificant = 'x'
      continue
    }
    if (!/\s/.test(c)) lastSignificant = c
    i++
  }
  return found
}

/**
 * Everything wrong with a bundle string, as words a person can act on.
 * @returns {{violations: string[], modules: string[], imports: number}}
 */
export function checkBundle(code) {
  const violations = []
  const imports = scanImports(code)
  const modules = [...new Set(imports.map(hit => hit.specifier))].sort()

  for (const hit of imports) {
    if (hit.dynamic) violations.push(`dynamic import of "${hit.specifier}" at byte ${hit.at}`)
    else if (!ALLOWED_IMPORTS.has(hit.specifier)) violations.push(`import of "${hit.specifier}" at byte ${hit.at}`)
  }
  const cjs = /__require\(\s*["'`]/.exec(code) || /\brequire\(\s*["'`]/.exec(code)
  if (cjs) {
    const at = cjs.index
    violations.push(`CommonJS require at byte ${at}: ${JSON.stringify(code.slice(Math.max(0, at - 40), at + 60))}`)
  }
  if (code.includes('.development.js')) {
    const at = code.indexOf('.development.js')
    violations.push(`development build reference at byte ${at}: ${JSON.stringify(code.slice(Math.max(0, at - 60), at + 30))}`)
  }
  return { violations, modules, imports: imports.length }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  const file = process.argv[2] ?? DEFAULT_FILE
  const { violations, modules, imports } = checkBundle(readFileSync(file, 'utf8'))
  if (violations.length) {
    console.error(`check-bundle: ${violations.length} problem(s) in ${file}`)
    for (const v of violations.slice(0, 20)) console.error(`  ${v}`)
    process.exit(1)
  }
  console.log(`check-bundle: OK — ${file}, ${imports} import statement(s), modules: ${modules.join(', ') || 'none'}; no require, no development build`)
}
