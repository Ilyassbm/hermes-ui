// ESM stand-in for `use-sync-external-store/shim`.
//
// @base-ui depends on use-sync-external-store, whose npm entry is CommonJS and picks a build through
// `process.env.NODE_ENV` (`require('./cjs/…development.js')`). esbuild keeps that require in the bundle as
// `__require("react")`, and the desktop loader has no `require` at all: the plugin died at load with
// "Dynamic require of react is not supported". The app's React 19 already ships useSyncExternalStore, so the shim has
// nothing left to do but re-export it.
export { useSyncExternalStore } from 'react'
