// "Glaze Noir": the whole app in Hermes UI's palette, not just our page.
//
// Registered through the `themes` registry area (`THEMES_AREA`), which is the supported door for a plugin theme: the
// app merges it with its built-ins and its installed skins, so it shows up in Settings ▸ Appearance and ⌘K like any
// other. The colours are Glaze's dark tokens (`src/components/glaze/tokens.css`), the black and white the page already
// wears. Glaze has no accent, so neither does the theme.
//
// Selection happens once per installation: `requestTheme` asks for it, and a refusal (the theme not resolved yet) is
// retried once on the first `gateway` open, then dropped. After that the user picks their own theme, and we never
// force it back.
import { host, requestTheme, THEMES_AREA, type DesktopTheme, type DesktopThemeColors } from '@hermes/plugin-sdk'
import skin from './native-skin.css'

export const THEME_NAME = 'hermes-ui-glaze-noir'

/** The direction's dark tokens (spec §1), by the role the app paints with each. No accent but the signal blues. */
const dark: DesktopThemeColors = {
  background: '#121212', // --bg-app
  foreground: '#f5f5f5', // --text-1
  card: '#1f1f1f', // --surface-1
  cardForeground: '#f5f5f5',
  muted: '#1b1b1b', // --surface-hover
  mutedForeground: '#a8a8a8', // --text-2
  popover: '#1f1f1f', // --surface-1
  popoverForeground: '#f5f5f5',
  primary: '#f5f5f5',
  primaryForeground: '#121212',
  secondary: '#272727', // --btn-secondary
  secondaryForeground: '#f5f5f5',
  accent: '#242424', // --nav-active
  accentForeground: '#f5f5f5',
  border: '#2c2c2c', // --border-control
  input: '#353535', // --border-composer
  ring: '#4e4e4e', // --border-composer-focus
  midground: '#f5f5f5',
  composerRing: '#4e4e4e',
  destructive: '#ed6e69', // --danger
  destructiveForeground: '#121212',
  sidebarBackground: '#0e0e0e', // --bg-sidebar
  sidebarBorder: '#1c1c1c', // --hairline-sidebar
  userBubble: '#3c3c3c', // --bubble-user
  userBubbleBorder: '#434343'
}

export const glazeNoir: DesktopTheme = {
  name: THEME_NAME,
  label: 'Glaze Noir',
  description: 'Black and white, the Hermes UI theme',
  // Dark is the theme; `colors` carries the same palette so nothing synthesises a light variant from a half-set.
  colors: dark,
  darkColors: dark,
  typography: {
    // The platform's own faces, as the direction sets them: no `fontUrl`, so the theme loads nothing from a CDN.
    fontSans: '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    fontMono: 'ui-monospace, "SF Mono", Menlo, monospace'
  },
  // The native pages that stay native (Settings, Capabilities…) get Glaze's geometry; every rule excludes .glaze.
  customCSS: skin
}

/**
 * Registers the theme for everybody, and selects it once for this installation.
 * @param ctx the plugin context, at `register`.
 */
export function installTheme(ctx: any): void {
  try {
    ctx.register({ id: 'glaze-noir', area: THEMES_AREA, data: glazeNoir })
  } catch (e) {
    // An older host without the themes area: the page still looks right, the rest of the app keeps its own theme.
    console.warn('[hermes-ui] theme registration refused', e)
    return
  }

  try {
    if (ctx?.storage?.get('themeAppliedV2', false)) return
  } catch {
    return
  }

  if (requestTheme(THEME_NAME)) {
    markApplied(ctx)
    return
  }

  // The registry may not have merged our contribution yet: one retry, on the first gateway open, then silence.
  const off = host.state.gateway.listen(state => {
    if (state !== 'open') return
    off()
    if (requestTheme(THEME_NAME)) markApplied(ctx)
  })
  ctx.onDispose?.(() => off())
}

function markApplied(ctx: any): void {
  try {
    ctx?.storage?.set('themeAppliedV2', true)
  } catch {
    /* nothing to remember: the flag is a convenience, not a guarantee */
  }
}
