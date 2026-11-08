/**
 * Minimal `react-dom` surface for the plugin bundle.
 *
 * The Hermes Desktop plugin loader only hands a plugin three bare imports: `@hermes/plugin-sdk`, `react` and
 * `react/jsx-runtime`. It never provides `react-dom`, and bundling the real one would ship a SECOND copy of React
 * (its own reconciler and hook dispatcher), which breaks every hook in this plugin. So `scripts/build.mjs` aliases
 * both `react-dom` and `react-dom/client` to this file, and everything that asks for react-dom gets the two things
 * the app can actually do for us:
 *
 * - `createPortal` builds the element React itself understands (`react.portal`), so Base UI's portals — Glaze's
 *   menus, tooltips, dialogs, the GlazePortalProvider container — render through the app's own renderer, into a
 *   container that lives inside our `.glaze` root.
 * - `flushSync` runs the callback synchronously. React's public `flushSync` needs the reconciler, so a plain call
 *   is the honest approximation: it keeps callers working, and it keeps ordering, which is all Base UI relies on.
 *
 * The rest are no-ops: nothing in this plugin uses resource preloading, and `unstable_batchedUpdates` only ever
 * needed to batch, which React 18+ already does on its own.
 */
import * as React from 'react'

const PORTAL = Symbol.for('react.portal')

/** `react-dom`'s createPortal, as the element React reconciles. */
export function createPortal(children, container, key = null) {
  return { $$typeof: PORTAL, key: key == null ? null: '' + key, children, containerInfo: container, implementation: null }
}

/** No reconciler here: run the update now, which is what a flush means for our callers. */
export function flushSync(fn) {
  return fn ? fn() : undefined
}

export function unstable_batchedUpdates(fn) {
  return fn()
}

// Resource hints and the like. Base UI never calls them; keep them defined so an import never resolves to undefined.
export function preload() {}
export function preinit() {}
export function preconnect() {}
export function prefetchDNS() {}

export const version = React.version

export default {
  createPortal,
  flushSync,
  unstable_batchedUpdates,
  preload,
  preinit,
  preconnect,
  prefetchDNS,
  version,
}
