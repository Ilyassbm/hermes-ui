// Guards the takeover's routing table: `classifyRoute(hash)` must read the app's routes the way the app does.
//
// The function is bundled from src/app/native-routes.ts on the fly (esbuild, node platform) into the scratch folder, then
// imported and run against the cases the spec names. Nothing is stubbed: it is the file the plugin ships.
//
//   node scripts/check-takeover.mjs
//
// Scratch folder: $HUI_SCRATCH, else /opt/data/profiles/dex/cache/scratch, else the OS temp dir.
import { build } from 'esbuild'
import { mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const scratch = process.env.HUI_SCRATCH || '/opt/data/profiles/dex/cache/scratch'
const outfile = join(scratch, 'check-takeover.routes.mjs')

const CASES = [
  ['#/', 'new-chat'],
  ['', 'new-chat'],
  ['#/local-abc123', 'session'],
  ['#/abc%2Fdef', 'session'],
  ['#/settings', 'native'],
  ['#/capabilities/plugins', 'native'],
  ['#/cron', 'native'],
  ['#/hui', 'hui'],
  ['#/hui/glaze', 'hui'],
  ['#/profiles', 'native'],
  ['#/agents', 'native']
]

async function bundle() {
  const result = await build({
    entryPoints: [resolve(root, 'src/app/native-routes.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent'
  })
  mkdirSync(scratch, { recursive: true })
  writeFileSync(outfile, result.outputFiles[0].text)
  return import(pathToFileURL(outfile).href)
}

let mod
try {
  mod = await bundle()
} catch (e) {
  // A read-only scratch folder must not make the check unrunnable: retry where the OS allows writes.
  console.warn(`check-takeover: ${scratch} unusable (${e.message}); falling back to ${tmpdir()}`)
  const fallback = join(tmpdir(), 'hermes-ui-check-takeover.routes.mjs')
  const result = await build({
    entryPoints: [resolve(root, 'src/app/native-routes.ts')],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    logLevel: 'silent'
  })
  writeFileSync(fallback, result.outputFiles[0].text)
  mod = await import(pathToFileURL(fallback).href)
}

const failures = []
const rows = CASES.map(([hash, expected]) => {
  const got = mod.classifyRoute(hash)
  const ok = got === expected
  if (!ok) failures.push({ hash, expected, got })
  return { hash, expected, got, ok }
})

// The decoded ids come from the same table: a session route must carry its id, and nothing else must.
const ID_CASES = [
  ['#/local-abc123', 'local-abc123'],
  ['#/abc%2Fdef', 'abc/def'],
  ['#/settings', null],
  ['#/hui', null],
  ['#/', null]
]

const idRows = ID_CASES.map(([hash, expected]) => {
  const got = mod.sessionIdOf(hash)
  const ok = got === expected
  if (!ok) failures.push({ hash, expected, got })
  return { hash, expected, got, ok }
})

const pad = (value, width) => String(value).padEnd(width)
console.log(`check-takeover: bundled ${outfile}\n`)
console.log(`${pad('hash', 24)} ${pad('attendu', 10)} ${pad('obtenu', 10)} ok`)
for (const row of rows) {
  console.log(`${pad(JSON.stringify(row.hash), 24)} ${pad(row.expected, 10)} ${pad(row.got, 10)} ${row.ok ? 'oui' : 'NON'}`)
}
console.log(`\n${pad('hash', 24)} ${pad('id attendu', 12)} ${pad('id obtenu', 12)} ok`)
for (const row of idRows) {
  console.log(`${pad(JSON.stringify(row.hash), 24)} ${pad(JSON.stringify(row.expected), 12)} ${pad(JSON.stringify(row.got), 12)} ${row.ok ? 'oui' : 'NON'}`)
}

if (failures.length) {
  console.error(`\ncheck-takeover: ${failures.length} cas en échec`)
  process.exit(1)
}
console.log(`\ncheck-takeover: OK — ${rows.length + idRows.length} cas, route et id conformes`)
