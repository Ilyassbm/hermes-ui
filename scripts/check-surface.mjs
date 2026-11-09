// The catalog's Desktop-surface gate, on the built bundle.
//
// `hermes plugins validate .` lints `desktop/plugin.js` with the rules in
// /opt/hermes/hermes_cli/plugin_validate_desktop.py (read 2026-11-09, rules at lines 20-46: `_FORBIDDEN`). A build
// that bundles a refused construct ships it straight into the renderer, so the same rules run here, before the file
// is copied anywhere. The patterns below are that file's, transcribed one for one — when the validator changes, this
// gate changes with it (the comment above each rule names it).
//
//   node scripts/check-surface.mjs                 # desktop/plugin.js
//   node scripts/check-surface.mjs path/to/plugin.js
//   node scripts/check-surface.mjs --quiet         # count only
//
// Exits 1 with `<rule> (<file>:<line>)` per hit, 0 otherwise. Run by `npm run build`.
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')

/**
 * The validator's `_FORBIDDEN`, in its order. `markup` marks the rules it runs on regex-masked source
 * (`_MARKUP_RULES` = {script injection}).
 */
export const FORBIDDEN = [
  // "(dynamic code evaluation"
  { rule: 'dynamic code evaluation', pattern: /(?<![\w$.])eval\(|\bnew\s+Function\(/g },
  // "(dynamic import outside the SDK"
  { rule: 'dynamic import outside the SDK', pattern: /\bimport\(\s*(?!['"](?:@hermes\/plugin-sdk|react)(?:\/[\w/-]*)?['"]\s*\))/g },
  // "(remote import outside the SDK"
  { rule: 'remote import outside the SDK', pattern: /\bimport\s+(?:[^;'"]*?\bfrom\s*)?['"][a-zA-Z][\w+.-]*:/g },
  // "(script injection" — markup rule
  { rule: 'script injection', pattern: /createElement\(\s*['"]script['"]\s*\)|<script\b/g, markup: true },
  // "(app DOM reach" — the one the picker used to trip
  {
    rule: 'app DOM reach',
    pattern: /\bdocument\.(?:querySelector(?:All)?|getElementsBy\w+|getElementById)\(\s*[`'"][^`'"]*\[data-(?:slot|tour|sidebar|testid)\b/g,
  },
  // "(app DOM reach" — a MutationObserver on the app's body
  { rule: 'app DOM reach', pattern: /\.observe\(\s*document\.body\s*,\s*\{[^}]*\b(?:childList|subtree)\b/g },
  // "(preview guest reach"
  { rule: 'preview guest reach', pattern: /\b(?:querySelector(?:All)?|closest|getElementsByTagName|createElement)\(\s*[`'"]webview\b/g }
]

/** The validator's review cue `_REVIEW`, warned there and reported here (never a failure). */
export const REVIEW = [
  { rule: 'raw bridge window.hermesDesktop', pattern: /\b(?:window|globalThis|self)\s*(?:\?\.|\.)\s*hermesDesktop\b/g },
  { rule: 'app markup selector', pattern: /\[data-(?:slot|tour|sidebar|testid|tree-[\w-]+|pane-host|titlebar-cluster)\b/g }
]

// plugin_validate_desktop.py::_COMMENT. String literals are matched first and kept, so a `/*` or `//` inside a string
// (a glob, a URL) cannot open a "comment" that blanks the lines up to the next `*/`.
const COMMENT = /("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\*[\s\S]*?\*\/)|(?<![:\\w])\/\/[^\n]*/g

export function stripComments(source) {
  return source.replace(COMMENT, (match, literal) => literal ?? '\n'.repeat((match.match(/\n/g) ?? []).length))
}

// plugin_validate_desktop.py::_REGEX_LITERAL / _REGEXP_CTOR_MATCHER: a regex literal that STRIPS markup is not a
// payload, so the markup-shaped rules read it masked.
const REGEX_LITERAL_FULL = new RegExp(String.raw`(?<![\w)\]])/(?:[^/\\\n\[]|\\.|\[(?:[^\]\\\n]|\\.)*\])+/[a-z]*`, 'g')
const JS_STRING = `(?:"(?:[^"\\\\\\n]|\\\\.)*"|'(?:[^'\\\\\\n]|\\\\.)*')`
const REGEXP_CTOR_MATCHER = new RegExp(
  `\\.(?:replace|replaceAll|split|match|matchAll|search)\\(\\s*new\\s+RegExp\\(\\s*${JS_STRING}`
    + `|\\bnew\\s+RegExp\\(\\s*${JS_STRING}(?=[^()\\n]*\\)\\s*\\.\\s*(?:test|exec)\\()`,
  'g'
)

export function maskRegexLiterals(source) {
  const masked = source.replace(REGEX_LITERAL_FULL, match => ' '.repeat(match.length))
  return masked.replace(REGEXP_CTOR_MATCHER, match => ' '.repeat(match.length))
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length

/** `[{rule, line}]` for every refused construct in one plugin source. */
export function surfaceFindings(source) {
  const stripped = stripComments(source)
  const noRegex = maskRegexLiterals(stripped)
  const findings = []
  for (const { rule, pattern, markup } of FORBIDDEN) {
    const haystack = markup ? noRegex : stripped
    pattern.lastIndex = 0
    for (const match of haystack.matchAll(pattern)) findings.push({ rule, line: lineOf(haystack, match.index) })
  }
  return findings.sort((a, b) => a.line - b.line)
}

/** `[{rule, line}]` for every review cue, skipping the lines a refusal already covers. */
export function reviewFindings(source) {
  const stripped = stripComments(source)
  const refused = new Set(surfaceFindings(source).map(finding => finding.line))
  const cues = new Map()
  for (const { rule, pattern } of REVIEW) {
    pattern.lastIndex = 0
    for (const match of stripped.matchAll(pattern)) {
      const line = lineOf(stripped, match.index)
      if (!refused.has(line)) cues.set(`${rule}:${line}`, { rule, line })
    }
  }
  return [...cues.values()].sort((a, b) => a.line - b.line)
}

/** Runs the surface rules over `file` and returns `{ file, findings, cues }`. */
export function checkSurface(file) {
  const source = readFileSync(file, 'utf8')
  return { file, findings: surfaceFindings(source), cues: reviewFindings(source) }
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
  const quiet = process.argv.includes('--quiet')
  const file = resolve(ROOT, args[0] ?? 'desktop/plugin.js')
  const { findings, cues } = checkSurface(file)
  const rel = file.startsWith(ROOT) ? file.slice(ROOT.length + 1) : file
  if (!quiet) for (const cue of cues) console.log(`cue: ${cue.rule} (${rel}:${cue.line}) — review only, not a failure`)
  if (findings.length) {
    console.error(`surface: ${findings.length} refused construct(s) in ${rel}`)
    for (const finding of findings) console.error(`  ${finding.rule} (${rel}:${finding.line})`)
    process.exit(1)
  }
  console.log(`surface: ${rel} — no refused construct (${FORBIDDEN.length} rules; ${cues.length} review cue(s))`)
}
