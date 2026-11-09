// The two doors into the app's Settings: our own page (Settings ▸ Plugins ▸ Hermes UI) and the native keybindings.
//
// `pluginSettingsHref` is the SDK's own deep link (apps/desktop/src/sdk/index.ts re-exports it from
// contrib/settings-pages.ts: `/settings?tab=plugins&plugin=hermes-ui&ppage=settings`). It is read through a namespace
// import and feature-detected: a desktop older than the settings registry has no such export, and a missing named
// binding would fail the whole module at load time — the plugin would not register at all. The fallback is the app's
// existing `#/settings` route.
import * as sdk from '@hermes/plugin-sdk'

export function settingsHref(): string {
  try {
    const href = (sdk as any).pluginSettingsHref?.('hermes-ui', 'settings')
    if (typeof href === 'string' && href) return href
  } catch {
    /* an older desktop: the hash route below */
  }
  return '#/settings'
}

/** Opens Settings on our page. */
export function openSettings(): void {
  try {
    sdk.host.navigate(settingsHref())
  } catch {
    /* no router: the person can still reach Settings from the app menu */
  }
}

/**
 * Opens the app's own keybindings page. `keybinds.openPanel` is the action the palette and the shortcut use, so a
 * rebound combo still lands; an older host without it falls back to the Settings route.
 */
export function openKeybindings(ctx?: any): void {
  try {
    const result = ctx?.runAction?.('keybinds.openPanel')
    if (result && result.ok === false) throw new Error(result.error || 'refused')
    if (result) return
  } catch {
    /* fall through to the route */
  }
  try {
    sdk.host.navigate('#/settings')
  } catch {
    /* nothing to navigate */
  }
}
