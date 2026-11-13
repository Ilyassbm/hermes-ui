// Test double for `@hermes/plugin-sdk`, used only by the checks in this folder (scripts/check-resume.mjs,
// scripts/check-takeover.mjs).
//
// The page reaches the gateway through one door: `host.request`. This stub hands every call to a handler the check
// installs on `globalThis.__hostRequest`, so a check can replay a real payload shape without a gateway, a browser or a
// desktop shell. It is bundled in place of the real module by esbuild's `alias`, and never ships in desktop/plugin.js.
export const host = {
  state: { profile: { get: () => globalThis.__hermesProfile || 'default' }, gateway: { get: () => 'open', listen: () => () => {} } },
  request(method, params, timeoutMs) {
    if (typeof globalThis.__hostRequest !== 'function') {
      return Promise.reject(new Error(`check: no handler for ${method}`))
    }
    return globalThis.__hostRequest(method, params, timeoutMs)
  },
  navigate() {},
  addEventListener() {},
  onDispose() {},
  profileRoutes() {
    return Promise.resolve(globalThis.__hermesRoutes || [])
  },
  /** The roster's persisted sessions: the takeover's sweep reads this, so the check hands it `globalThis.__hermesSessions`. */
  listPersistedSessions(route, options) {
    if (typeof globalThis.__hermesSessions === 'function') return globalThis.__hermesSessions(route, options)
    return Promise.resolve({ sessions: [] })
  },
  ensureAgent() {
    return Promise.resolve()
  }
}
