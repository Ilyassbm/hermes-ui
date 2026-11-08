// Bundles src/ into desktop/plugin.js — one ESM file the Hermes desktop loader accepts:
// only `@hermes/plugin-sdk`, `react` and `react/jsx-runtime` stay as imports.
//
// Steps: compile the Glaze stylesheet (Tailwind v4, no preflight) → scope its global selectors under .glaze →
// guard it with scripts/check-css.mjs → bundle with esbuild. The stylesheet is imported as text by the
// Glaze surface and injected in a <style id="hermes-ui-glaze"> on mount, so nothing lands in the page head.
//
// --install HERMES_ROOT=<root> : also copies it as a standalone desktop plugin (dev only).
import { build } from 'esbuild'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'
import { findGlobalSelectors, scopeGlobalSelectors } from './check-css.mjs'
import { checkBundle } from './check-bundle.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const from = resolve(root, 'src/styles/app.css')
const cssOut = resolve(root, 'src/styles/.compiled.css')

const install = process.argv.includes('--install')
const watch = process.argv.includes('--watch')

// 1. Tailwind v4 → one stylesheet. app.css pulls `tailwindcss/theme` + `tailwindcss/utilities` in (never the full
//    `tailwindcss`, whose Preflight is a global reset) and Glaze's own scoped entry.
const compiled = await postcss([tailwind()]).process(readFileSync(from, 'utf8'), { from, to: cssOut })

// 2. Any :root / :host / html / body / * / ::backdrop left in it is rewritten under .glaze.
const scoped = scopeGlobalSelectors(compiled.css)

// 3. Hard gate: a global selector at this point fails the build instead of shipping.
const leaks = findGlobalSelectors(scoped.css)
if (leaks.length) {
  console.error(`build: ${leaks.length} global selector(s) escaped .glaze — refusing to bundle`)
  for (const hit of leaks.slice(0, 20)) console.error(`  ${hit.atRule ? `${hit.atRule} → ` : ''}${hit.selector}`)
  process.exit(1)
}

writeFileSync(cssOut, scoped.css)
console.log(`css: src/styles/app.css → src/styles/.compiled.css (${(scoped.css.length / 1024).toFixed(1)} kB, ${scoped.changed} selector(s) scoped)`)

const options = {
  entryPoints: ['src/plugin.jsx'],
  outfile: 'desktop/plugin.js',
  bundle: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  // Every dependency that picks its build through NODE_ENV (React's CJS paths and everything built on them) must take
  // the production branch: a development build reaches `react` through `require`, which the ESM loader cannot run.
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  // The loader provides these three and nothing else. `react-dom` is aliased to our shim: bundling a second
  // React copy breaks hooks, and the app never hands its react-dom to a plugin.
  external: ['@hermes/plugin-sdk', 'react', 'react/jsx-runtime'],
  alias: {
    '@': resolve(root, 'src'),
    'react-dom': resolve(root, 'src/shims/react-dom.ts'),
    'react-dom/client': resolve(root, 'src/shims/react-dom.ts'),
    // use-sync-external-store (a @base-ui dependency) only ships CommonJS, and its shim requires `react` at run time.
    // Both shim entry points are replaced by ESM versions built on React 19's own useSyncExternalStore.
    'use-sync-external-store/shim': resolve(root, 'src/shims/use-sync-external-store-shim.ts'),
    'use-sync-external-store/shim/index.js': resolve(root, 'src/shims/use-sync-external-store-shim.ts'),
    'use-sync-external-store/shim/with-selector': resolve(root, 'src/shims/use-sync-external-store-with-selector.ts'),
    'use-sync-external-store/shim/with-selector.js': resolve(root, 'src/shims/use-sync-external-store-with-selector.ts'),
    'use-sync-external-store/with-selector': resolve(root, 'src/shims/use-sync-external-store-with-selector.ts'),
    'use-sync-external-store/with-selector.js': resolve(root, 'src/shims/use-sync-external-store-with-selector.ts')
  },
  resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.json'],
  loader: { '.css': 'text' },
  // The bundle keeps its French accents and the CSS as written: escaping them as \uXXXX only inflates the string.
  charset: 'utf8',
  legalComments: 'inline',
  // One 1.5 MB plugin file is served from disk by the app, not over a network: minifying buys load time and keeps the
  // development warnings that hide in unminified dependencies out of the file.
  minify: true,
  banner: { js: '// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.' },
  logLevel: 'info',
}

await build(options)

// 4. Hard gate on what the loader will execute: no CommonJS require, no development build, no import outside the three
//    modules it resolves. A bundle that fails here would throw at load time inside the app, so the build refuses it.
const bundle = readFileSync('desktop/plugin.js', 'utf8')
const { violations, modules, imports } = checkBundle(bundle)
if (violations.length) {
  console.error(`build: bundle rejected — ${violations.length} problem(s) in desktop/plugin.js`)
  for (const v of violations.slice(0, 20)) console.error(`  ${v}`)
  process.exit(1)
}
console.log(`bundle: ${(bundle.length / 1024 / 1024).toFixed(2)} MB, ${imports} import statement(s), modules: ${modules.join(', ') || 'none'}`)

if (install) {
  const hermesRoot = process.env.HERMES_ROOT || join(homedir(), '.hermes')
  const dir = join(hermesRoot, 'desktop-plugins', 'hermes-ui')
  mkdirSync(dir, { recursive: true })
  copyFileSync('desktop/plugin.js', join(dir, 'plugin.js'))
  console.log(`installed → ${join(dir, 'plugin.js')}`)
}
if (watch) console.log('watch not implemented; rerun the build')
