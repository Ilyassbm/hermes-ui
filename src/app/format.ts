// Copy and numbers the rail turns into words: a bot's role, its last activity as a distance from now.
import { botLabel, botLook } from '@/lib/labels'

/** The role a bot plays in Ilyass's setup. `description` from the profile is the fallback, then nothing. */
const ROLES: Record<string, string> = {
  default: 'Chief of Staff',
  dex: 'CTO',
  preto: 'Head of SEO',
  mint: 'Head of Growth',
  prism: 'Head of Content',
  youtubot: 'Head of YouTube',
  'bot-builder': 'Bot Builder'
}

export function botRole(name?: string, description?: string): string {
  if (name && ROLES[name]) return ROLES[name]
  return (description || '').trim()
}

/** "Nom · Rôle", or just the name when the profile says nothing about its role. */
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
 * A time as the rail says it: "maint." under a minute, "4 min", "2 h", "hier", "3 j", then a short date.
 * `ts` is epoch milliseconds; 0/undefined reads as "maint." because the row has nothing better to say.
 */
export function sinceLabel(ts?: number | null): string {
  if (!ts) return 'maint.'
  const delta = Date.now() - ts
  if (!Number.isFinite(delta)) return 'maint.'
  if (delta < MIN) return 'maint.'
  if (delta < HOUR) return `${Math.floor(delta / MIN)} min`
  if (delta < DAY) return `${Math.floor(delta / HOUR)} h`
  if (delta < 2 * DAY) return 'hier'
  if (delta < 7 * DAY) return `${Math.floor(delta / DAY)} j`
  return new Date(ts).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/** A percentage for a usage meter, clamped to what a bar can draw. */
export function pct(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}
