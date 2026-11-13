// Copy and numbers the rail turns into words: a bot's role, its last activity as a distance from now.
import { botLabel, botLook } from '@/lib/labels'
import { UI } from './strings'

/** The role a bot plays is what its profile says about it (`description`), or nothing. */
export function botRole(_name?: string, description?: string): string {
  return (description || '').trim()
}

/** "Name · Role", or just the name when the profile says nothing about its role. */
export function botHeading(name: string | undefined, description?: string): string {
  const role = botRole(name, description)
  return role ? `${botLabel(name)} · ${role}` : botLabel(name)
}

/** Colour and shape for a bot: fixed per profile in labels.js, hashed for anyone unknown. */
export function botIdentity(name?: string): { colors: [string, string]; shape: any } {
  const look = botLook(name || 'default')
  return { colors: [look.colors[0], look.colors[1]], shape: look.shape }
}

const MIN = 60_000
const HOUR = 60 * MIN
const DAY = 24 * HOUR

/**
 * A time as the rail says it: "now" under a minute, "4 min", "2h", "yesterday", "3d", then a short date.
 * `ts` is epoch milliseconds; a bot with no `last_active` has no time to show at all, so it returns '' — never a
 * placeholder that reads as "just now" for a bot that never answered.
 */
export function sinceLabel(ts?: number | null): string {
  if (!ts) return ''
  const delta = Date.now() - ts
  if (!Number.isFinite(delta)) return ''
  if (delta < MIN) return UI.time.now
  if (delta < HOUR) return `${Math.floor(delta / MIN)} min`
  if (delta < DAY) return `${Math.floor(delta / HOUR)}${UI.time.hourShort}`
  if (delta < 2 * DAY) return UI.time.yesterday
  if (delta < 7 * DAY) return `${Math.floor(delta / DAY)}${UI.time.dayShort}`
  return new Date(ts).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}
