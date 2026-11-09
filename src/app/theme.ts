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

/** Glaze's dark tokens, by the role the app paints with each. No accent: Glaze has none. */
const dark: DesktopThemeColors = {
  background: '#0c0c0c', // --page
  foreground: '#f4f4f3', // --text-1
  card: '#1f1f1f', // --paper
  cardForeground: '#f4f4f3',
  muted: '#161616', // --shell
  mutedForeground: 'rgba(244,244,243,0.60)', // --text-2
  popover: '#1f1f1f', // --paper
  popoverForeground: '#f4f4f3',
  primary: '#f4f4f3',
  primaryForeground: '#0c0c0c',
  secondary: '#2a2a2a', // --field
  secondaryForeground: '#f4f4f3',
  accent: '#2a2a2a',
  accentForeground: '#f4f4f3',
  border: 'rgba(244,244,243,0.10)', // --line
  input: 'rgba(244,244,243,0.15)', // --line-control
  ring: 'rgba(244,244,243,0.45)',
  midground: '#f4f4f3',
  composerRing: 'rgba(244,244,243,0.32)',
  destructive: '#ec6f5a', // --fail
  destructiveForeground: '#0c0c0c',
  sidebarBackground: '#0c0c0c',
  sidebarBorder: 'rgba(244,244,243,0.06)', // --line-faint
  userBubble: '#2a2a2a', // --field
  userBubbleBorder: 'rgba(244,244,243,0.06)'
}

export const glazeNoir: DesktopTheme = {
  name: THEME_NAME,
  label: 'Glaze Noir',
  description: 'Black and white, the Hermes UI theme',
  // Dark is the theme; `colors` carries the same palette so nothing synthesises a light variant from a half-set.
  colors: dark,
  darkColors: dark,
  typography: {
    // Glaze Sans / Glaze Mono first, then Geist, then the platform: no `fontUrl`, so the theme loads nothing from a CDN.
    fontSans: '"Glaze Sans", "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
    fontMono: '"Glaze Mono", "Geist Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace'
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
