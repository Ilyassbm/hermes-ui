// Guards the gate that took `session.resume` down in the app (lot 14): the SDK's `host.request` has a generic 30 s
// deadline (`apps/desktop/src/sdk/index.ts:1506`, `request: async (method, params, timeoutMs?)`), and a session call
// whose backend contract is minutes long dies at 30 s with an unclassified timeout — the banner read “request timed out
// after 30s: session.resume” over a conversation that would have opened on a second try.
//
// The rule, checked statically over src/ (no gateway, no browser):
//   - `host.request('session.resume' | 'session.create' | 'prompt.submit', …)` must pass a third argument, and that
//     timeout must be at least MIN_TIMEOUT_MS (60 s);
//   - the shared helper (`longRequest`) is the sanctioned door: its method is a variable, so no literal is scanned
//     there, and every caller of the three methods must go through it with the same 120 s.
//
//   node scripts/check-request-timeouts.mjs            # src
//   node scripts/check-request-timeouts.mjs src/lib    # one folder
//
// Exits 1 with one line per finding (`path:line:col: what and why`), 0 otherwise. Run by `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const DEFAULT_ROOTS = ['src']

/** The methods whose backend can run for minutes, and the floor the SDK's 30 s default cannot meet. */
export const LONG_METHODS = new Set(['session.resume', 'session.create', 'prompt.submit'])
export const MIN_TIMEOUT_MS = 60_000

const files = []
function sourceFiles(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue
      sourceFiles(path)
    } else if (/\.(jsx?|tsx?)$/.test(entry)) files.push(path)
  }
}

/** Every path under the requested roots (default: src). */
export function collect(roots = DEFAULT_ROOTS) {
  for (const root of roots) sourceFiles(resolve(ROOT, root))
  return files
}

/**
 * The file's text with comments blanked out, offsets and line breaks kept: a `host.request('session.resume')` quoted
 * in a comment is prose, not a call.
 */
export function stripComments(text) {
  let out = ''
  let i = 0
  while (i < text.length) {
    const two = text.slice(i, i + 2)
    if (two === '//') {
      while (i < text.length && text[i] !== '\n') {
        out += ' '
        i += 1
      }
      continue
    }
    if (two === '/*') {
      while (i < text.length && text.slice(i, i + 2) !== '*/') {
        out += text[i] === '\n' ? '\n' : ' '
        i += 1
      }
      out += '  '
      i += 2
      continue
    }
    const ch = text[i]
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      out += ch
      i += 1
      while (i < text.length) {
        const c = text[i]
        out += c
        i += 1
        if (c === '\\') {
          if (i < text.length) {
            out += text[i]
            i += 1
          }
          continue
        }
        if (c === quote) break
      }
      continue
    }
    out += ch
    i += 1
  }
  return out
}

/**
 * The top-level arguments of the call whose `(` sits at `open`: a list of raw texts. Strings, template literals and
 * nested brackets are walked so a comma inside an object or a string never splits an argument.
 */
export function callArgs(text, open) {
  const args = []
  let depth = 0
  let start = open + 1
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i]
    if (ch === "'" || ch === '"' || ch === '`') {
      const quote = ch
      i += 1
      while (i < text.length) {
        if (text[i] === '\\') i += 1
        else if (text[i] === quote) break
        i += 1
      }
      continue
    }
    if (ch === '(' || ch === '[' || ch === '{') depth += 1
    else if (ch === ')' || ch === ']' || ch === '}') {
      depth -= 1
      if (depth === 0) {
        args.push(text.slice(start, i))
        return args
      }
    } else if (ch === ',' && depth === 1) {
      args.push(text.slice(start, i))
      start = i + 1
    }
  }
  return args
}

/** `120_000` → 120000, `60_000` → 60000, `undefined` → NaN. */
export function timeoutOf(raw) {
  const value = String(raw ?? '').trim()
  const match = /^(\d[\d_]*)$/.exec(value)
  if (!match) return NaN
  return Number(match[1].replace(/_/g, ''))
}

/** The findings for one file's text, with 1-based line/column. */
export function findingsIn(path, raw) {
  const text = stripComments(raw)
  const out = []
  for (const match of text.matchAll(/host\s*\.\s*request\s*\(/g)) {
    const open = match.index + match[0].length - 1
    const args = callArgs(text, open)
    const first = String(args[0] ?? '').trim()
    const methodMatch = /^['"]([a-z_.]+)['"]$/.exec(first)
    if (!methodMatch || !LONG_METHODS.has(methodMatch[1])) continue
    const line = text.slice(0, match.index).split('\n').length
    const column = match.index - text.lastIndexOf('\n', match.index - 1)
    if (args.length < 3) {
      out.push({ path, line, column, method: methodMatch[1], message: 'no timeout: host.request dies at the SDK default of 30 s' })
      continue
    }
    const timeout = timeoutOf(args[2])
    if (!Number.isFinite(timeout)) {
      out.push({ path, line, column, method: methodMatch[1], message: `the third argument "${String(args[2]).trim().slice(0, 40)}" is not a number of milliseconds` })
      continue
    }
    if (timeout < MIN_TIMEOUT_MS) {
      out.push({ path, line, column, method: methodMatch[1], message: `${timeout} ms is under the ${MIN_TIMEOUT_MS} ms floor` })
    }
  }
  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const roots = process.argv.slice(2).filter(arg => !arg.startsWith('-'))
  const list = collect(roots.length ? roots : DEFAULT_ROOTS)
  const findings = list.flatMap(path => findingsIn(path, readFileSync(path, 'utf8')))
  if (findings.length) {
    for (const finding of findings) {
      console.error(`${relative(ROOT, finding.path)}:${finding.line}:${finding.column}: ${finding.method} — ${finding.message}`)
    }
    console.error(`\ncheck-request-timeouts: ${findings.length} finding(s) — session.resume, session.create and prompt.submit must ask for at least ${MIN_TIMEOUT_MS / 1000} s.`)
    process.exit(1)
  }
  console.log(`check-request-timeouts: OK — ${list.length} file(s), every session call asks for ≥ ${MIN_TIMEOUT_MS / 1000} s.`)
}
