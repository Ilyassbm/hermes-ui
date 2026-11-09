// Guards the interface language: the plugin ships to an English catalog, so no French copy may survive in src/.
//
// Why this exists: lot 24 found two French strings still leaving through a JS error path (`Profils illisibles : …`),
// where no translation gate looked. English is a product rule, not a style preference, and a reviewer reading the
// bundle should never have to notice a French sentence for us.
//
// The rule, over every .js/.jsx/.ts/.tsx/.mjs/.cjs file under src/ (tests excluded):
//   - a banned word from the list below, outside a comment;
//   - any accented character (À-ÿ, Œ, œ) outside a comment.
// Comments are blanked by the same scanner the timeout gate uses, so the French prose that explains this code base
// stays allowed — only what could reach a screen is refused.
//
//   node scripts/check-copy.mjs            # src
//   node scripts/check-copy.mjs src/lib    # one folder
//
// Exits 1 with one line per finding (`path:line:col: …`), 0 otherwise. Run by `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripComments } from './check-request-timeouts.mjs'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const DEFAULT_ROOTS = ['src']

/** The words the French surface used before the catalog translation. A hit outside a comment fails the build. */
export const BANNED = ['illisible', 'Profils', 'Conversation illisible', 'Réessayer', 'Chargement', 'Équipe', 'Rechercher', 'Réinitialisation', 'introuvable', 'sans root']

/** Any accented Latin letter is French copy trying to leave: the English surface uses none. */
export const ACCENT = /[\u00C0-\u00FF\u0152\u0153]/

const CODE = /\.(jsx?|tsx?|mjs|cjs)$/
const TEST = /(^|\/)(__tests__|__mocks__)\/|\.(test|spec)\.[cm]?[jt]sx?$/

const files = []
function sourceFiles(dir) {
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      if (entry === 'node_modules' || entry.startsWith('.')) continue
      sourceFiles(path)
    } else if (CODE.test(entry)) {
      files.push(path)
    }
  }
}

/** Every path under the requested roots (default: src), tests left out. */
export function collect(roots = DEFAULT_ROOTS) {
  files.length = 0
  for (const root of roots) sourceFiles(resolve(ROOT, root))
  return files.filter(path => !TEST.test(path.replaceAll('\\', '/')))
}

/** The findings for one file's text, with 1-based line/column. */
export function findingsIn(path, raw) {
  const text = stripComments(raw)
  const out = []

  for (const word of BANNED) {
    for (const match of text.matchAll(new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))) {
      const line = text.slice(0, match.index).split('\n').length
      const column = match.index - text.lastIndexOf('\n', match.index - 1)
      out.push({ path, line, column, message: `banned copy “${word}” — move it to src/app/strings.ts in English` })
    }
  }

  for (const match of text.matchAll(new RegExp(ACCENT, 'g'))) {
    const line = text.slice(0, match.index).split('\n').length
    const column = match.index - text.lastIndexOf('\n', match.index - 1)
    out.push({ path, line, column, message: `accented character “${match[0]}” outside a comment — copy belongs in src/app/strings.ts, in English` })
  }

  return out
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const roots = process.argv.slice(2).filter(arg => !arg.startsWith('-'))
  const list = collect(roots.length ? roots : DEFAULT_ROOTS)
  const findings = list.flatMap(path => findingsIn(path, readFileSync(path, 'utf8')))
  if (findings.length) {
    for (const finding of findings) {
      console.error(`${relative(ROOT, finding.path)}:${finding.line}:${finding.column}: ${finding.message}`)
    }
    console.error(`\ncheck-copy: ${findings.length} finding(s) — the interface ships in English; strings live in src/app/strings.ts.`)
    process.exit(1)
  }
  console.log(`check-copy: OK — ${list.length} file(s), no French copy outside comments.`)
}
