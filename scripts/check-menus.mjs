// Guards the Base UI menu rule that took the composer down in lot 6: `Base UI error #31 — MenuGroupContext is
// missing. Menu group parts must be used within <Menu.Group> or <Menu.RadioGroup>`.
//
// Why it happens: `DropdownMenuLabel` renders Base UI's `Menu.GroupLabel`, and a group label only has a context
// inside a group. One label written directly in `DropdownMenuContent` throws at render, so the whole menu — here the
// model picker — never opens. The rule is mechanical: every `<DropdownMenuLabel>` needs a JSX ancestor
// `<DropdownMenuGroup>` or `<DropdownMenuRadioGroup>` in the same file.
//
// How it reads the file: the TypeScript parser the repo already has (`typescript`, a dev dependency through
// `@typescript-eslint/parser` / `tsc`), which parses TSX natively — no regex, no bracket counting. It walks the AST
// with a stack of the JSX elements it enters, so a label inside a group inside a menu is fine and a label inside a
// `<div>` beside the group is not.
//
//   node scripts/check-menus.mjs            # src/app and src/ui
//   node scripts/check-menus.mjs src/app    # one folder
//   node scripts/check-menus.mjs --list     # every file that was read
//
// Exits 1 with one line per offending label (`path:line:col`), 0 otherwise. Run by `npm run build`.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const ROOT = resolve(fileURLToPath(import.meta.url), '../..')
const DEFAULT_ROOTS = ['src/app', 'src/ui']

/** The label that needs a group, and the two group parts that give it one. */
export const LABEL = 'DropdownMenuLabel'
export const GROUPS = new Set(['DropdownMenuGroup', 'DropdownMenuRadioGroup'])

/** Every `.tsx` under `dir`, recursively, sorted. */
function tsxFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir).sort()) {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) out.push(...tsxFiles(path))
    else if (entry.endsWith('.tsx')) out.push(path)
  }
  return out
}

/** `Foo`, `Menu.Foo` and `<Foo>` all read as their last name: the tag as written, without punctuation. */
function tagName(node) {
  const tag = node.tagName
  if (!tag) return ''
  const text = tag.getText()
  return text.replace(/^<|>$/g, '').trim()
}

/**
 * The offending labels in one file's text.
 * @returns {{line: number, column: number, element: string}[]}
 */
export function findLabelsOutsideGroups(fileName, text) {
  const source = ts.createSourceFile(fileName, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const found = []

  /** Walks a node with the JSX elements currently open above it. */
  const walk = (node, open) => {
    let next = open
    if (ts.isJsxElement(node)) {
      const name = tagName(node.openingElement)
      if (name === LABEL && !open.some(ancestor => GROUPS.has(ancestor))) {
        const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source))
        found.push({ line: line + 1, column: character + 1, element: name })
      }
      next = [...open, name]
    } else if (ts.isJsxSelfClosingElement(node)) {
      const name = tagName(node)
      if (name === LABEL && !open.some(ancestor => GROUPS.has(ancestor))) {
        const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source))
        found.push({ line: line + 1, column: character + 1, element: name })
      }
      next = [...open, name]
    }
    ts.forEachChild(node, child => walk(child, next))
  }

  walk(source, [])
  return found
}

/** Runs the check over folders (relative to the repo root). @returns {{file: string, line: number, column: number}[]} */
export function checkMenus(roots = DEFAULT_ROOTS) {
  const problems = []
  for (const dir of roots) {
    const abs = resolve(ROOT, dir)
    let files = []
    try {
      files = tsxFiles(abs)
    } catch {
      continue // a folder this lot does not have yet
    }
    for (const file of files) {
      for (const hit of findLabelsOutsideGroups(file, readFileSync(file, 'utf8'))) {
        problems.push({ file: relative(ROOT, file), line: hit.line, column: hit.column })
      }
    }
  }
  return problems
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const args = process.argv.slice(2).filter(arg => !arg.startsWith('--'))
  const roots = args.length ? args : DEFAULT_ROOTS
  if (process.argv.includes('--list')) {
    for (const dir of roots) for (const file of tsxFiles(resolve(ROOT, dir))) console.log(relative(ROOT, file))
  }
  const problems = checkMenus(roots)
  if (problems.length) {
    console.error(`check-menus: ${problems.length} <${LABEL}> outside a group`)
    for (const p of problems) console.error(`  ${p.file}:${p.line}:${p.column}: wrap it in <DropdownMenuGroup> or <DropdownMenuRadioGroup>`)
    process.exit(1)
  }
  console.log(`check-menus: OK — every <${LABEL}> sits in a group (${roots.join(', ')})`)
}
