// Generates skills/intelligent-ui/SKILL.md from the catalogue, the examples and the skill's French body.
//
// The bundle is built in the scratch cache, outside the repo: catalog.prompt() reads zod, and node cannot import the
// TypeScript source directly. The written file is committed — it is what the plugin registers in every profile.
//
// Usage: node scripts/gen-iui-skill.mjs [--check]
//   --check  fails when the committed file differs from the generated one, and writes nothing.
import { build } from 'esbuild'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HERMES_UI_SCRATCH || join(root, 'scripts', '.tmp')
mkdirSync(scratch, { recursive: true })
const entry = resolve(root, 'src/app/iui/skill.ts')
const outfile = join(scratch, `iui-skill-${process.pid}.mjs`)
const target = resolve(root, 'skills/intelligent-ui/SKILL.md')
const check = process.argv.includes('--check')

mkdirSync(scratch, { recursive: true })
mkdirSync(dirname(target), { recursive: true })

await build({
  entryPoints: [entry],
  outfile,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'error'
})

const { renderSkill } = await import(pathToFileURL(outfile).href)
const text = renderSkill()
const lines = text.split('\n').length

if (check) {
  let current = ''
  try {
    current = readFileSync(target, 'utf8')
  } catch {
    console.error(`gen-iui-skill: ${target} is missing — run npm run gen:iui`)
    process.exit(1)
  }
  if (current !== text) {
    console.error('gen-iui-skill: skills/intelligent-ui/SKILL.md is stale — run npm run gen:iui')
    process.exit(1)
  }
  console.log(`gen-iui-skill: skills/intelligent-ui/SKILL.md up to date (${lines} lines)`)
} else {
  writeFileSync(target, text)
  console.log(`gen-iui-skill: skills/intelligent-ui/SKILL.md written (${lines} lines, ${(text.length / 1024).toFixed(1)} kB)`)
}
