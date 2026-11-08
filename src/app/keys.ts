// The page's shortcuts, in one place: the default combos the keybinds register with, and the key caps the tooltips
// show.
//
// The desktop SDK exposes the keybind registry (KEYBINDS_AREA) but no reader for the person's own binding
// (`bindingsFor` stays inside the app), so the caps show the default combo. A rebind still works — the app routes the
// new combo to the same action — only the tooltip keeps saying the default, which is the fallback the spec allows.

/** The default combo per action id, written the way the keybind registry writes them. */
export const DEFAULT_COMBOS: Record<string, string> = {
  'hermes-ui.newChatWithBot': 'mod+alt+n',
  'hermes-ui.newConversation': 'mod+shift+o',
  'hermes-ui.search': 'mod+alt+k',
  'hermes-ui.toggleAside': 'mod+alt+b',
  // Alt+digit since lot 10: ⌘⌥+digit belongs to the app's own profile.switch.10..18, and a built-in default always
  // wins over a contributed one in `$comboIndex`.
  ...Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`hermes-ui.bot${i + 1}`, `alt+${i + 1}`]))
}

const isMacPlatform = () =>
  typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '')

/** The one key cap a token draws: `mod` is ⌘ on a Mac and Ctrl elsewhere. */
const CAPS: Record<string, { mac: string; other: string }> = {
  mod: { mac: '⌘', other: 'Ctrl' },
  cmd: { mac: '⌘', other: 'Win' },
  ctrl: { mac: '⌃', other: 'Ctrl' },
  shift: { mac: '⇧', other: 'Shift' },
  alt: { mac: '⌥', other: 'Alt' },
  enter: { mac: '↵', other: 'Enter' },
  esc: { mac: 'Esc', other: 'Esc' }
}

/** The combo as display caps, for a Tooltip's `shortcut`: ['⌘', '⌥', 'N'] or ['Ctrl', 'Alt', 'N']. */
export function shortcutCaps(combo: string): string[] {
  const mac = isMacPlatform()
  return combo
    .split('+')
    .map(key => key.trim())
    .filter(Boolean)
    .map(key => {
      const known = CAPS[key.toLowerCase()]
      if (known) return mac ? known.mac : known.other
      return key.length === 1 ? key.toUpperCase() : key
    })
}

/** The default combo of an action, or '' when the page never registered it. */
export function comboOf(id: string): string {
  return DEFAULT_COMBOS[id] || ''
}

/** The caps of an action's default combo. */
export function capsOf(id: string): string[] {
  const combo = comboOf(id)
  return combo ? shortcutCaps(combo) : []
}
