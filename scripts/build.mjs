// Bundles src/ into desktop/plugin.js — one ESM file the Hermes desktop loader accepts:
// only `@hermes/plugin-sdk`, `react` and `react/jsx-runtime` stay as imports.
//
// Steps: compile the Glaze stylesheet (Tailwind v4, no preflight) → scope its global selectors under .glaze →
// guard it with scripts/check-css.mjs → bundle with esbuild. The stylesheet is imported as text by the
// Glaze surface and injected in a <style id="hermes-ui-glaze"> on mount, so nothing lands in the page head.
//
// --install HERMES_ROOT=<root> : also copies it as a standalone desktop plugin (dev only).
import { build, transform } from 'esbuild'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import tailwind from '@tailwindcss/postcss'
import { checkNativeSkin, findGlobalSelectors, NATIVE_SKIN_FILE, scopeGlobalSelectors } from './check-css.mjs'
import { checkBundle } from './check-bundle.mjs'
import { checkSurface } from './check-surface.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const from = resolve(root, 'src/styles/app.css')
const cssOut = resolve(root, 'src/styles/.compiled.css')

const install = process.argv.includes('--install')
const watch = process.argv.includes('--watch')

// 0. The skill a bot reads is generated from the catalogue before anything is bundled: catalog.ts is the source, the
//    committed skills/intelligent-ui/SKILL.md is what the plugin registers. A failure here stops the build.
const gen = spawnSync(process.execPath, [resolve(root, 'scripts/gen-iui-skill.mjs')], { stdio: 'inherit' })
if (gen.status !== 0) process.exit(gen.status ?? 1)

// 0b. The menu gate: a DropdownMenuLabel outside a Menu.Group throws at render (Base UI #31), which is what took the
//     model picker down. Cheap (the TypeScript parser, no bundling), so it runs before anything is compiled.
const menus = spawnSync(process.execPath, [resolve(root, 'scripts/check-menus.mjs')], { stdio: 'inherit' })
if (menus.status !== 0) process.exit(menus.status ?? 1)

// 0c. The click gate: a DropdownMenuTrigger on a non-button opened on the keyboard but not on a click, and a trigger
//     wrapped around a clickable row took the row's left click. Static too (the same parser).
const menuOpen = spawnSync(process.execPath, [resolve(root, 'scripts/check-menu-open.mjs')], { stdio: 'inherit' })
if (menuOpen.status !== 0) process.exit(menuOpen.status ?? 1)

// 0c2. The model picker's weight: the first level must stay at MODEL_MENU_TOP models per provider, from topModels, with
//      the full catalogue behind a submenu — 60 rows laid out on open is what closed the menu on the release.
const modelMenu = spawnSync(process.execPath, [resolve(root, 'scripts/check-model-menu.mjs')], { stdio: 'inherit' })
if (modelMenu.status !== 0) process.exit(modelMenu.status ?? 1)

// 0d. The slash gate: the classifier's cases and the composer's `/help` → slash.exec → note path, on stubs.
const slash = spawnSync(process.execPath, [resolve(root, 'scripts/check-slash.mjs')], { stdio: 'inherit' })
if (slash.status !== 0) process.exit(slash.status ?? 1)

// 0e. The keybind gate: a default combo the app already spends never fires (⌘⌥1…⌘⌥9 switched profile, not bot). The
//     app's list is embedded in the script — `apps/` is not in this repository.
const keybinds = spawnSync(process.execPath, [resolve(root, 'scripts/check-keybinds.mjs')], { stdio: 'inherit' })
if (keybinds.status !== 0) process.exit(keybinds.status ?? 1)

// 0f. The unmount gate (lot 11): Base UI unmounts a popup on `getAnimations()`, so a transition on the node it follows
//     parks the dialog — and its scrim, which eats every click — when the close lands during the entrance. A tracked
//     `dialog-content` / `dialog-overlay` must end on duration 0 and carry no overlay-motion, and the picker must keep
//     its 400ms guard. Static, the same TypeScript parser, before anything is compiled.
const overlay = spawnSync(process.execPath, [resolve(root, 'scripts/check-overlay-unmount.mjs')], { stdio: 'inherit' })
if (overlay.status !== 0) process.exit(overlay.status ?? 1)

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

// 3b. The native skin (the theme's customCSS) is the one sheet allowed to reach the app: it must stay small, never
//     target .glaze, and guard every rule with :not(.glaze …).
const nativeSkin = checkNativeSkin(readFileSync(resolve(root, NATIVE_SKIN_FILE), 'utf8'))
if (nativeSkin.errors.length) {
  console.error(`build: ${nativeSkin.errors.length} problem(s) in ${NATIVE_SKIN_FILE} — refusing to bundle`)
  for (const error of nativeSkin.errors.slice(0, 20)) console.error(`  ${error}`)
  process.exit(1)
}
console.log(`skin: ${NATIVE_SKIN_FILE} (${nativeSkin.bytes} bytes, ${nativeSkin.rules} rules, none targeting .glaze)`)

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
  minifyIdentifiers: true,
  minifySyntax: true,
  minifyWhitespace: false, // the app loader finds imports with a code/string scanner that one-line output confuses
  banner: { js: '// Hermes UI — built from src/ by scripts/build.mjs. Do not edit by hand.' },
  logLevel: 'info',
}

await build(options)

// 4. Hard gate on what the loader will execute: no CommonJS require, no development build, no import outside the three
//    modules it resolves. A bundle that fails here would throw at load time inside the app, so the build refuses it.
const bundle = readFileSync('desktop/plugin.js', 'utf8')
const { violations, modules, imports, lines } = checkBundle(bundle)
if (violations.length) {
  console.error(`build: bundle rejected — ${violations.length} problem(s) in desktop/plugin.js`)
  for (const v of violations.slice(0, 20)) console.error(`  ${v}`)
  process.exit(1)
}
console.log(`bundle: ${(bundle.length / 1024 / 1024).toFixed(2)} MB, ${lines} lines, ${imports} import statement(s), modules: ${modules.join(', ') || 'none'}`)

// 4a. Invisible characters, in the file as written. esbuild's printer emits a `\u200c` escape as the raw character
//     again under `charset: 'utf8'`, so a node module's own zero-width joiners (zod's Persian and Kannada messages)
//     reach `desktop/plugin.js` raw and the catalog's security scan reports `invisible_unicode` on the bundle. They
//     only ever sit inside a string, template or regex literal, where the escape is the same value at run time and a
//     visible one in a diff; the file is parsed again right after, so a bad rewrite cannot ship.
// The exact set the security scan refuses (/opt/hermes/tools/threat_patterns.py::INVISIBLE_CHARS, read 2026-11-09):
// zero-width space/non-joiner/joiner, word joiner, invisible times/separator/plus, BOM, the bidi embeddings and
// isolates with their pops and overrides.
const INVISIBLE = /[\u200B-\u200D\u2060\u2062-\u2064\uFEFF\u202A-\u202E\u2066-\u2069]/g
const escaped = bundle.replace(INVISIBLE, ch => `\\u${ch.charCodeAt(0).toString(16).padStart(4, '0')}`)
if (escaped !== bundle) {
  await transform(escaped, { loader: 'js', format: 'esm' })
  writeFileSync('desktop/plugin.js', escaped)
  console.log(`invisible: ${(bundle.match(INVISIBLE) ?? []).length} character(s) escaped as \\uXXXX in desktop/plugin.js`)
}

// 4b. The catalog's Desktop-surface gate, on the bundle just written: the same rules `hermes plugins validate .`
//     applies (scripts/check-surface.mjs transcribes plugin_validate_desktop.py). A refused construct here would ship
//     to the renderer, so the build stops before the file is copied anywhere.
const surface = checkSurface('desktop/plugin.js')
if (surface.findings.length) {
  console.error(`build: desktop surface refused — ${surface.findings.length} construct(s) in desktop/plugin.js`)
  for (const finding of surface.findings.slice(0, 20)) console.error(`  ${finding.rule} (desktop/plugin.js:${finding.line})`)
  process.exit(1)
}
console.log(`surface: desktop/plugin.js — no refused construct, ${surface.cues.length} review cue(s)`)

if (install) {
  const hermesRoot = process.env.HERMES_ROOT || join(homedir(), '.hermes')
  const dir = join(hermesRoot, 'desktop-plugins', 'hermes-ui')
  mkdirSync(dir, { recursive: true })
  copyFileSync('desktop/plugin.js', join(dir, 'plugin.js'))
  console.log(`installed → ${join(dir, 'plugin.js')}`)
}
if (watch) console.log('watch not implemented; rerun the build')
