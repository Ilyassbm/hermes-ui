// The page's settings, in one store read by the shell, the composer and the settings page itself.
//
// Lot 14: Settings ▸ Plugins ▸ Hermes UI used to be a native page with nothing behind it. These are the preferences
// the page owns; they live in the plugin's own storage (`ctx.storage`), the same door the rail uses for its pins, so
// the form and the page can never disagree about a value.
//
// The defaults are today's look: dark, comfortable, 960px of reading measure (the direction's column, spec §3), motion
// on, Enter sends, activity shown.
// A load merges only known, well-typed values, so a stored object from an older version cannot put the page in a state
// no control offers.
import { createStore } from '@/lib/store'

export type ThemeChoice = 'system' | 'dark' | 'light'
export type DensityChoice = 'comfortable' | 'compact'
export type MeasureChoice = 680 | 760 | 840 | 960
export type MotionChoice = 'on' | 'reduced'
export type SendKeyChoice = 'enter' | 'mod+enter'

export type Settings = {
  theme: ThemeChoice
  density: DensityChoice
  measure: MeasureChoice
  motion: MotionChoice
  sendKey: SendKeyChoice
  /** The live activity line above a working bot's reply. */
  activity: boolean
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  density: 'comfortable',
  measure: 960,
  motion: 'on',
  sendKey: 'enter',
  activity: true
}

const KEY = 'settings'

const THEMES: ThemeChoice[] = ['system', 'dark', 'light']
const DENSITIES: DensityChoice[] = ['comfortable', 'compact']
const MEASURES: MeasureChoice[] = [680, 760, 840, 960]
const MOTIONS: MotionChoice[] = ['on', 'reduced']
const SEND_KEYS: SendKeyChoice[] = ['enter', 'mod+enter']

export const settings = createStore(DEFAULT_SETTINGS) as {
  get: () => Settings
  set: (patch: Partial<Settings> | ((state: Settings) => Partial<Settings> | null)) => void
  subscribe: (fn: () => void) => () => void
}

/** The stored preferences, with every unknown or ill-typed field replaced by its default. */
export function sanitize(raw: unknown): Settings {
  const value = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {}
  return {
    theme: THEMES.includes(value.theme as ThemeChoice) ? (value.theme as ThemeChoice) : DEFAULT_SETTINGS.theme,
    density: DENSITIES.includes(value.density as DensityChoice) ? (value.density as DensityChoice) : DEFAULT_SETTINGS.density,
    measure: MEASURES.includes(value.measure as MeasureChoice) ? (value.measure as MeasureChoice) : DEFAULT_SETTINGS.measure,
    motion: MOTIONS.includes(value.motion as MotionChoice) ? (value.motion as MotionChoice) : DEFAULT_SETTINGS.motion,
    sendKey: SEND_KEYS.includes(value.sendKey as SendKeyChoice) ? (value.sendKey as SendKeyChoice) : DEFAULT_SETTINGS.sendKey,
    activity: typeof value.activity === 'boolean' ? value.activity : DEFAULT_SETTINGS.activity
  }
}

/** Reads the stored settings once, when the page (or the settings form) mounts. */
export function loadSettings(ctx: any): Settings {
  let raw: unknown = null
  try {
    raw = ctx?.storage?.get(KEY, null)
  } catch {
    raw = null
  }
  const next = sanitize(raw)
  settings.set(next)
  return next
}

/** Writes one change, to the store and to storage: the form and the page read the same object. */
export function saveSettings(ctx: any, patch: Partial<Settings>): void {
  settings.set(patch)
  try {
    ctx?.storage?.set(KEY, settings.get())
  } catch {
    /* the change still holds for this mount */
  }
}
