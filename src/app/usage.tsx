// The foot of the rail: what is left on each subscription, as one compact row per provider that opens its detail.
//
// Lot 14: the two cards took half the rail (~350px). Each provider is now a 34px row — its mark, its name, the
// binding window in tabular figures at the inline end, and a 2px bar under the line — and the detail that was
// reading (every window, its reset, its percentage, a full-width bar) lives in a popover the row opens. One panel at a
// time, remembered per provider, collapsed by default: the foot measures 94px when both are shut (2 × 34 + the 8px
// between the rows + the foot's 8 + 10 of padding) instead of ~350px.
//
// The gateway's `/usage` names its windows per provider (`session`/`five_hour`, `week`/`weekly`, `monthly`), so the
// three spellings are read for each, and a provider that sends none simply has no row. The reset time is the window's
// `resetsAt`: under a day away it is just the hour, further out it is the short weekday and the hour, and with no date
// at all the row keeps only the percentage.
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Icon, Refresh } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/glaze/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { store } from '@/lib/hermes'
import { ProviderLogo } from './provider-logo'
import { UI } from './strings'

export type UsageWindow = { id?: string; used?: number | string; resetsAt?: string }
export type UsageProvider = { id?: string; label?: string; plan?: string; tier?: string; windows?: UsageWindow[] }

export type UsageRow = {
  key: 'session' | 'week' | 'month'
  /** "5-hour limit" — the panel's whole label. */
  label: string
  /** "5h" — the compact row's window. */
  short: string
  used: number
  reset: string
}

export type UsageCard = {
  id: string
  /** "Claude", "OpenCode Go". */
  name: string
  plan: string
  /** "Usage limits · Claude · Pro" */
  title: string
  rows: UsageRow[]
  /** The window the compact row prints: the 5-hour one when it exists, else the one closest to its limit. */
  binding: UsageRow
}

/** The three windows the rail draws, in the order a person reads them, with the label the amendment pins. */
const WINDOWS: { key: UsageRow['key']; ids: string[]; label: string; short: string }[] = [
  { key: 'session', ids: ['session', 'five_hour', 'rolling'], label: UI.usage.fiveHour, short: UI.usage.short.session },
  { key: 'week', ids: ['week', 'weekly'], label: UI.usage.weekly, short: UI.usage.short.week },
  { key: 'month', ids: ['month', 'monthly'], label: UI.usage.monthly, short: UI.usage.short.month }
]

/** The providers with a meter, in the rail's order, and the name to print when the gateway sends none. */
const PROVIDERS: { id: string; name: string }[] = [
  { id: 'claude', name: UI.usage.providerNames.claude },
  { id: 'opencode_go', name: UI.usage.providerNames.opencode_go }
]

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

/** The row the compact line prints: the 5-hour window when the provider has one, else the fullest of the others. */
function bindingOf(rows: UsageRow[]): UsageRow {
  return rows.find(row => row.key === 'session') || rows.reduce((worst, row) => (row.used > worst.used ? row : worst), rows[0])
}

/** One card per provider the rail shows, with its windows. */
export function usageCards(usage: unknown, now = Date.now()): UsageCard[] {
  const list = Array.isArray(usage) ? (usage as UsageProvider[]) : []
  return list
    .filter(p => p && PROVIDERS.some(provider => provider.id === String(p.id)))
    .map(p => {
      const windows = Array.isArray(p.windows) ? p.windows : []
      const plan = (p.plan || p.tier || '').trim()
      const known = PROVIDERS.find(provider => provider.id === String(p.id))
      const name = (p.label || known?.name || p.id || '').trim()
      const rows: UsageRow[] = WINDOWS.flatMap(w => {
        const window = windows.find(candidate => candidate && w.ids.includes(String(candidate.id)))
        if (!window) return []
        return [{ key: w.key, short: w.short, label: w.label, used: pct(window.used), reset: resetLabel(window.resetsAt, now) }]
      })
      return { id: String(p.id), name, plan, title: UI.usage.title(name, plan), rows, binding: bindingOf(rows) }
    })
    // A provider with nothing to show keeps no meter: a name over empty space reads as a bug.
    .filter(card => card.rows.length)
}

/** A fill's colour, the way Glaze reads a number that is running out: ink, amber past 80, coral past 95. */
function fillClass(used: number): string {
  if (used > 95) return 'hui-fill-fail'
  if (used > 80) return 'hui-fill-warn'
  return ''
}

/** A stored value, with the default when storage is unavailable. */
function read(ctx: any, key: string, fallback: string): string {
  try {
    const value = ctx?.storage?.get(key, fallback)
    return typeof value === 'string' ? value : fallback
  } catch {
    return fallback
  }
}

function write(ctx: any, key: string, value: string) {
  try {
    ctx?.storage?.set(key, value)
  } catch {
    /* the panel lives for this session */
  }
}

/**
 * The two compact meters. `openId` is the one panel allowed open ('' = none): opening the other closes the first, and
 * the choice is remembered per provider — shut by default, so the foot starts at its 86px.
 */
export function UsageMeters({ cards, ctx }: { cards: UsageCard[]; ctx: any }) {
  const [openId, setOpenId] = useState<string>(() => read(ctx, 'usageOpen', ''))
  // The foot's refresh: one request at a time, the icon turning while it runs, and the last numbers kept on failure.
  const [refreshing, setRefreshing] = useState(false)
  const [refreshFailed, setRefreshFailed] = useState(false)
  const refresh = async () => {
    if (refreshing) return
    setRefreshing(true)
    setRefreshFailed(false)
    try {
      const res = await ctx?.rest?.('/usage?fresh=1', { timeoutMs: 20000 })
      const providers = Array.isArray(res?.providers) ? res.providers : null
      if (providers) store.set({ usage: providers })
    } catch {
      // The last reading stays on screen: an empty meter would read as "no subscription".
      setRefreshFailed(true)
    } finally {
      setRefreshing(false)
    }
  }
  // The collapsed height, in the DOM: `data-hui-usage-height` on the block is what a reviewer reads in the app (86
  // with both panels shut), instead of trusting the stylesheet's arithmetic alone.
  const box = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const el = box.current
    if (!el) return undefined
    const measure = () => el.setAttribute('data-hui-usage-height', String(Math.round(el.getBoundingClientRect().height)))
    measure()
    if (typeof ResizeObserver !== 'function') return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [cards.length, openId])

  const setOpen = (id: string, next: boolean) => {
    const value = next ? id : ''
    setOpenId(value)
    write(ctx, 'usageOpen', value)
  }

  return (
    <div className="hui-usage-wrap">
      <div ref={box} className="hui-usage" data-hui-usage-count={cards.length}>
        {cards.map(card => {
        const open = openId === card.id
        return (
          <Popover key={card.id} open={open} onOpenChange={next => setOpen(card.id, next)}>
            <PopoverTrigger
              render={<Button type="button" variant="ghost" size="sm" className="hui-usage-row" data-provider={card.id} />}
              // No aria-label: the row says "Claude 5h · 33 %" on screen, and the name must be that text (an
              // aria-label of "Expand Claude" left the visible words out of the name — lot 17). The detail's own
              // title is the hover hint.
              title={card.title}
            >
              <ProviderLogo provider={card.id} size={12} className="hui-usage-logo" />
              <span className="hui-usage-name">{card.name}</span>
              <span className="hui-usage-value" data-ui-number="">{UI.usage.compact(card.binding.short, card.binding.used)}</span>
              <span className="hui-usage-bar" aria-hidden="true">
                <span
                  className={`hui-usage-bar-fill ${fillClass(card.binding.used)}`}
                  style={{ '--pct': `${card.binding.used}%` } as CSSProperties}
                />
              </span>
            </PopoverTrigger>
            <PopoverContent side="top" align="start" className="hui-usage-pop">
              <h2 className="hui-usage-pop-title">{card.title}</h2>
              {card.rows.map(row => (
                <div key={`${card.id}-${row.key}`} className="hui-usage-window">
                  {/* The whole label across the panel, then the reset and the percentage at the inline end. */}
                  <div className="hui-usage-meta">
                    <p className="hui-usage-label">{row.label}</p>
                    <p className="hui-usage-reset" data-ui-number="">{row.reset ? `${row.reset}  ${row.used} %` : `${row.used} %`}</p>
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
            </PopoverContent>
          </Popover>
        )
        })}
      </div>
      {/* Right of the two meters: one 24×24 control, its icon turning while `/usage?fresh=1` runs. */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="hui-usage-refresh"
                aria-label={UI.usage.refresh}
                aria-busy={refreshing || undefined}
                data-ui-tooltip="hui-tip-usage-refresh"
                disabled={refreshing}
                onClick={() => void refresh()}
              />
            }
          >
            <span className={refreshing ? 'hui-usage-refresh-icon' : undefined}>
              <Icon icon={Refresh} size={12} />
            </span>
          </TooltipTrigger>
          <TooltipContent id="hui-tip-usage-refresh">{refreshFailed ? UI.usage.refreshFailed : UI.usage.refresh}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
