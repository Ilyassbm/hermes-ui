// The app's hash router, read from the outside: what a `#/…` route means for Hermes UI.
//
// Pure on purpose — no SDK, no React, no store. `scripts/check-takeover.mjs` bundles this one file and runs it, so the
// table below is the thing under test, not a copy of it.
//
// The routes come from the desktop app (`apps/desktop/src/app/routes.ts`): new chat is `#/`, a session is a single
// segment that is not a known route, and every other path (settings, capabilities, …) is a native page. A path that
// merely STARTS with a known route (`/capabilities/plugins`) is native too: it is a full page, never a session.
// Our own page sits under `/hui`, which the app treats as a contributed route, so it must never be read as a session.

export type RouteClass = 'new-chat' | 'session' | 'native' | 'hui'

/** Our page and everything under it (`/hui`, `/hui/glaze`). */
export const HUI_PATH = '/hui'

/** The app's own top-level pages. Anything at or under one of these stays native. */
export const KNOWN_ROUTES = [
  '/settings',
  '/command-center',
  '/session-import',
  '/capabilities',
  '/messaging',
  '/webhooks',
  '/artifacts',
  '/cron',
  '/profiles',
  '/agents',
  '/starmap'
] as const

/**
 * The pathname a hash points at, normalised: no leading `#`, no query, no fragment, `/` when empty.
 * `#/local-abc?x=1` → `/local-abc`, `#` → `/`, `#/hui/glaze` → `/hui/glaze`.
 */
export function routePathOf(hash: string | null | undefined): string {
  const raw = String(hash ?? '').trim()
  const withoutHash = raw.startsWith('#') ? raw.slice(1) : raw
  const cut = withoutHash.search(/[?#]/)
  const path = cut === -1 ? withoutHash : withoutHash.slice(0, cut)
  return path.startsWith('/') ? path : `/${path}`
}

/** True when `path` is a known app page (or sits under one). */
function isKnownRoute(path: string): boolean {
  return KNOWN_ROUTES.some(route => path === route || path.startsWith(`${route}/`))
}

/** True when `path` is our page (or one of its sub-pages). */
function isHuiRoute(path: string): boolean {
  return path === HUI_PATH || path.startsWith(`${HUI_PATH}/`)
}

/**
 * What a hash is, for the takeover:
 *  - `new-chat` : the app's new-conversation route (`#/`, an empty hash, `#`)
 *  - `session`  : one segment that is neither a known page nor ours — `#/local-abc123`, `#/abc%2Fdef`
 *  - `hui`      : our own page, which must never be redirected (that is where we send people)
 *  - `native`   : a known page (`#/settings`, `#/capabilities/plugins`, `#/cron`, …), left to the app
 */
export function classifyRoute(hash: string | null | undefined): RouteClass {
  const path = routePathOf(hash)
  if (path === '/') return 'new-chat'
  if (isHuiRoute(path)) return 'hui'
  if (isKnownRoute(path)) return 'native'
  const rest = path.slice(1)
  if (rest && !rest.includes('/')) return 'session'
  return 'native'
}

/** The stored session id a `session` route carries, decoded; null when the route is anything else. */
export function sessionIdOf(hash: string | null | undefined): string | null {
  if (classifyRoute(hash) !== 'session') return null
  const rest = routePathOf(hash).slice(1)
  try {
    return decodeURIComponent(rest) || null
  } catch {
    // A malformed escape (`%E0%A4%A`) is not an id: leave the route alone rather than throw during a hashchange.
    return null
  }
}
