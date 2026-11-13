// Motion gate — the rules of the motion pass (lot 27), enforced instead of remembered.
//
// The method behind it is emilkowalski/skills (MIT): motion earns its place, and the mistakes an agent makes are
// always the same six. This script refuses them in the app's own sheets and components. The vendored design system
// (src/components/glaze) is exempt: it ships its own overlay motion, and its overlay exit curve is deliberate.
//
//   node scripts/check-motion.mjs
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

const ROOT = new URL('..', import.meta.url).pathname
const files = execFileSync('git', ['ls-files', 'src/styles', 'src/app'], { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(f => /\.(css|tsx|ts)$/.test(f))
  .filter(f => !f.includes('.compiled.css'))
  // aicss is vendored (MIT, credited in the README): its thinking pane owns its 360/560ms curves, the way the Glaze
  // package owns its overlay motion. Exempt as a whole rather than carving exceptions into our own sheets.
  .filter(f => f !== 'src/styles/thinking.css')
  // `git ls-files` still lists a file this working tree deleted (a removal in progress, before its commit): there is
  // nothing to read, and nothing to gate.
  .filter(f => existsSync(new URL(f, `file://${ROOT}`)))

const findings = []
const add = (file, line, rule, text) => findings.push({ file, line, rule, text: text.trim().slice(0, 90) })

// A comment is not code: strip block and line comments before matching, keeping the line count by blanking them.
function codeOf(text) {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
    .replace(/(^|\s)\/\/[^\n]*/g, m => m.replace(/[^\n]/g, ' '))
}

for (const file of files) {
  const raw = readFileSync(new URL(file, `file://${ROOT}`), 'utf8')
  const lines = codeOf(raw).split('\n')
  // Markers live in comments, which `codeOf` blanks on purpose: look them up in the raw text.
  const rawLines = raw.split('\n')

  lines.forEach((line, i) => {
    const n = i + 1
    // 1. `transition: all` animates whatever a later commit happens to touch.
    if (/transition(?:-property)?\s*:\s*all\b/.test(line)) add(file, n, 'transition-all', line)

    // 2. Nothing appears from nothing. (The vendored sheets are exempt; this list is ours.)
    if (/scale\(\s*0\s*\)|scale\s*:\s*0\s*[;}]/.test(line)) add(file, n, 'scale-zero', line)

    // 3. `ease-in` delays the exact moment a person is watching. `ease-in-out` and the house tokens are fine.
    if (/ease-in\b(?!-out)/.test(line) && !/--ease-in\b/.test(line) && !/var\(--ease-in\)/.test(line)) {
      add(file, n, 'ease-in', line)
    }

    // 4. UI motion stays under 400ms. The refresh spin is 700ms on purpose; tokens are not literals.
    for (const m of line.matchAll(/(\d{3,4})\s*ms/g)) {
      const ms = Number(m[1])
      if (ms > 400 && ms !== 700) add(file, n, 'duration', line)
    }

    // 5. Layout properties are not transitioned. A width may move only when it carries a number and says so.
    if (/(?:transition|animation)(?:-property)?\s*:[^;]*\b(width|height|top|left|margin)\b/.test(line)) {
      const above = rawLines.slice(Math.max(0, i - 4), i + 1).join('\n')
      const marked = above.includes('motion:data-bar') || above.includes('motion:layout')
      if (!marked) add(file, n, 'layout-property', line)
    }
  })

  // 6. A keyframe with no reduced-motion counterpart runs for people who asked it not to.
  if (file.endsWith('.css') && raw.includes('@keyframes')) {
    const names = [...raw.matchAll(/@keyframes\s+([\w-]+)/g)].map(m => m[1])
    for (const name of names) {
      const used = new RegExp(`animation[^;]*\\b${name}\\b`).test(raw)
      if (!used) continue
      // Two accepted answers: cut every animation in the reduce block, or redefine that very keyframe there with no
      // travel (which is what app.css does for the rail and aside entrances).
      const reduced = /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*animation:\s*none/.test(raw)
      const redefined = new RegExp(`@media\\s*\\(prefers-reduced-motion:\\s*reduce\\)[\\s\\S]*@keyframes\\s+${name}\\b`).test(raw)
      if (!reduced && !redefined) add(file, 0, 'reduced-motion', `@keyframes ${name}`)
    }
  }

  // 7. A hover state on a touch screen sticks after the tap. Every :hover sits behind a fine pointer.
  if (file.endsWith('.css')) {
    let depth = 0
    let gatedAt = -1
    lines.forEach((line, i) => {
      if (/@media[^{]*\(hover:\s*hover\)/.test(line)) gatedAt = depth
      for (const ch of line) {
        if (ch === '{') depth += 1
        if (ch === '}') {
          depth -= 1
          if (depth === gatedAt) gatedAt = -1
        }
      }
      if (/:hover\b/.test(line) && gatedAt === -1) add(file, i + 1, 'hover-ungated', line)
    })
  }
}

const byRule = findings.reduce((acc, f) => ({ ...acc, [f.rule]: (acc[f.rule] || 0) + 1 }), {})
for (const f of findings.slice(0, 25)) console.log(`${f.file}:${f.line}: ${f.rule} — ${f.text}`)
if (findings.length) {
  console.log(`\ncheck-motion: ${findings.length} finding(s) — ${JSON.stringify(byRule)}`)
  console.log('Rules: emilkowalski/skills, skills/review-animations/STANDARDS.md.')
  process.exit(1)
}
console.log(`check-motion: OK — ${files.length} file(s), no refused motion.`)
