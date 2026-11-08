// Bundles src/ into desktop/plugin.js — one ESM file the Hermes desktop loader accepts:
// only `@hermes/plugin-sdk`, `react` and `react/jsx-runtime` stay as imports.
// --install HERMES_ROOT=<root> : also copies it as a standalone desktop plugin (dev only).
import { build } from 'esbuild'
import { copyFileSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

const install = process.argv.includes('--install')
const watch = process.argv.includes('--watch')

const options = {
  entryPoints: ['src/plugin.jsx'],
  outfile: 'desktop/plugin.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  external: ['@hermes/plugin-sdk', 'react', 'react/jsx-runtime'],
  loader: { '.css': 'text' },
  legalComments: 'inline',
  banner: { js: '// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.' },
  logLevel: 'info'
}

await build(options)

if (install) {
  const root = process.env.HERMES_ROOT || join(homedir(), '.hermes')
  const dir = join(root, 'desktop-plugins', 'hermes-ui')
  mkdirSync(dir, { recursive: true })
  copyFileSync('desktop/plugin.js', join(dir, 'plugin.js'))
  console.log(`installed → ${join(dir, 'plugin.js')}`)
}
if (watch) console.log('watch not implemented; rerun the build')
