# Contributing

Thanks for looking. This plugin ships as a committed bundle, so the loop is short: change `src/`, rebuild, commit the
bundle with the sources.

## Build and check

```bash
npm ci
npm run build   # Tailwind → .compiled.css, the static gates, esbuild → desktop/plugin.js
npm run lint    # eslint with glaze.eslint.config.mjs
```

`npm run build` runs `check-menus`, `check-menu-open`, `check-model-menu`, `check-slash`, `check-keybinds`,
`check-overlay-unmount`, `check-request-timeouts`, `check-css`, `check-bundle` and `check-surface`, and stops at the
first failure. Each one is also a script under `scripts/` and can be run alone with `node scripts/<name>.mjs`.

`hermes plugins validate .` is the catalogue's own gate; run it locally before opening a pull request. It needs a Hermes
install, so CI does not run it.

## The bundle rule

**One commit, one bundle.** Any change under `src/` that reaches the page is rebuilt and `desktop/plugin.js` is
committed in the same commit: the desktop app loads that file as-is, never the sources. The build is reproducible —
`npm run build` on a clean checkout leaves `desktop/plugin.js` byte-identical — and CI proves it by rebuilding and
running `git diff --exit-code` on the bundle. A pull request whose bundle does not match its sources fails there.

## Style

- **Glaze only.** Components live in `src/components/glaze`; use them, do not fork them.
- **No raw colour.** `glaze/no-raw-color` and `glaze/no-shadow` fail the lint; use the theme tokens.
- **No `[data-…]` selector of the app.** The plugin never reaches into the host's DOM; the plugin's own attributes are
  `data-hui-part`. `check-surface` transcribes the validator's rules and refuses an app-markup selector.
- **Strings** go in `src/app/strings.ts` (`UI`), never inline in a component. English only.

## Pull requests

1. Branch from `main`.
2. Keep the change to one thing; say what it does and why in the description.
3. Run `npm run build`, `npm run lint` and `hermes plugins validate .`.
4. Commit the bundle with the sources, and add a `CHANGELOG.md` line under `Unreleased`.

Deviations worth knowing: the desktop app's own API is not vendored here, so the SDK surface is the only contract;
`desktop/plugin.js` is generated, so never edit it by hand.
