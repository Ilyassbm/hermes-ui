// The foot of the rail: what is left on each subscription, one card per provider.
//
// The gateway's `/usage` names its windows per provider (`session`/`five_hour`, `week`/`weekly`, `monthly`), so the
// three spellings are read for each, and a provider that sends none simply has no row. The reset time is the window's
// `resetsAt`: under a day away it is just the hour, further out it is the short weekday and the hour, and with no date
// at all the row keeps only the percentage.
import type { CSSProperties } from 'react'
import { UI } from './strings'

export type UsageWindow = { id?: string; used?: number | string; resetsAt?: string }
export type UsageProvider = { id?: string; label?: string; plan?: string; tier?: string; windows?: UsageWindow[] }

type Card = {
  id: string
  /** "Usage limits · Claude · Pro" */
  title: string
  rows: { key: string; label: string; used: number; reset: string }[]
}

/** The three windows the rail draws, in the order a person reads them, with the label the amendment pins. */
const WINDOWS: { key: string; ids: string[]; label: string }[] = [
  { key: 'session', ids: ['session', 'five_hour', 'rolling'], label: UI.usage.fiveHour },
  { key: 'week', ids: ['week', 'weekly'], label: UI.usage.weekly },
  { key: 'month', ids: ['month', 'monthly'], label: UI.usage.monthly }
]

/** The providers with a card, in the rail's order. */
const PROVIDERS = ['claude', 'opencode_go']

const pct = (value: unknown): number => {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n)) return 0
  return Math.max(0, Math.min(100, Math.round(n)))
}

const hourMinute = (date: Date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

/** "Resets Mon 03:20", "Resets at 03:20" under a day, "" without a date. */
export function resetLabel(iso?: string, now = Date.now()): string {
  if (!iso) return ''
  const date = new Date(iso)
  const at = date.getTime()
  if (!Number.isFinite(at)) return ''
  const left = at - now
  if (left > 0 && left < 86_400_000) return UI.usage.resetsAt(hourMinute(date))
  const day = date.toLocaleDateString('en-GB', { weekday: 'short' })
  return UI.usage.resetsOn(day, hourMinute(date))
}

/** One card per provider the rail shows, with its windows. */
export function usageCards(usage: unknown, now = Date.now()): Card[] {
  const list = Array.isArray(usage) ? (usage as UsageProvider[]) : []
  return list
    .filter(p => p && PROVIDERS.includes(String(p.id)))
    .map(p => {
      const windows = Array.isArray(p.windows) ? p.windows : []
      const plan = (p.plan || p.tier || '').trim()
      return {
        id: String(p.id),
        title: UI.usage.title(p.label || p.id, plan),
        rows: WINDOWS.flatMap(w => {
          const window = windows.find(candidate => candidate && w.ids.includes(String(candidate.id)))
          if (!window) return []
          return [{ key: w.key, label: w.label, used: pct(window.used), reset: resetLabel(window.resetsAt, now) }]
        })
      }
    })
    // A provider with nothing to show keeps no card: a title over empty space reads as a bug.
    .filter(card => card.rows.length)
}

/** A fill's colour, the way Glaze reads a number that is running out. */
function fillClass(used: number): string {
  if (used > 95) return 'hui-fill-fail'
  if (used > 80) return 'hui-fill-warn'
  return ''
}

export function UsageCards({ cards }: { cards: Card[] }) {
  return (
    <div className="hui-usage">
      {cards.map(card => (
        <section key={card.id} className="hui-usage-card" aria-label={card.title}>
          <h2 className="hui-usage-title">{card.title}</h2>
          {card.rows.map(row => (
            <div key={`${card.id}-${row.key}`} className="hui-usage-window">
              {/* Two lines, as Ilyass reads them: the whole label across the card, then the reset and the percentage
                  at the inline end. Neither line truncates the label. */}
              <div className="hui-usage-meta">
                <p className="hui-usage-label">{row.label}</p>
                <p className="hui-usage-reset">{row.reset ? `${row.reset}  ${row.used} %` : `${row.used} %`}</p>
              </div>
              <div className="hui-usage-track" role="presentation">
                <div
                  className={`hui-usage-fill ${fillClass(row.used)}`}
                  style={{ '--pct': `${row.used}%` } as CSSProperties}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export type { Card as UsageCard }
