// The rail: the bots, the open bot's conversations, usage, and the way into the rest of the app.
//
// One scroll column holds the actions, the pinned Branco tile, the other bots and their conversations; the usage
// meters and the person stay pinned at the bottom. When the tile and the list leave the top, a compact avatar bar
// sticks over the column so the bots stay one click away.
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Icon, Add, Search, SquaresFour, Star } from '@/components/glaze/icon'
import { Avatar } from '@/components/glaze/ui/avatar'
import { Button } from '@/components/glaze/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from '@/components/glaze/ui/dropdown-menu'
import { Input } from '@/components/glaze/ui/input'
import { Item } from '@/components/glaze/ui/item'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { cn } from '@/lib/glaze/utils'
import { newConversation, openConversation, selectBot, store } from '@/lib/hermes'
import { CONV_GROUPS, botLabel, convGroup } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { botHeading, botIdentity, botRole, pct, sinceLabel } from './format'
import { useBots } from './use-bots'

const BRANCO = 'default'

type Row = {
  name: string
  label: string
  heading: string
  /** The role alone, when the profile has one. */
  role: string
  output: string
  active: number | null
  identity: ReturnType<typeof botIdentity>
}

/** Glaze's usage meters come as providers with named windows; the rail shows the 5 h one and the week.
 *  The gateway names them differently per provider (`session`/`five_hour`, `week`/`weekly`), so both spellings of each
 *  window are accepted; a provider that sends neither simply has no meter to draw for it. */
function meters(usage: any) {
  const list = Array.isArray(usage) ? usage : []
  return list
    .filter(p => p && (p.id === 'claude' || p.id === 'opencode_go'))
    .map(p => {
      const windows = Array.isArray(p.windows) ? p.windows : []
      const window = (...ids: string[]) => windows.find((w: any) => w && ids.includes(w.id))
      return {
        id: p.id,
        label: p.label || p.id,
        session: window('session', 'five_hour'),
        week: window('week', 'weekly')
      }
    })
}

/** A usage bar's fill: ink, then the two status colours the way Glaze reads a number that is running out. */
function fillFor(used: number): string {
  if (used > 95) return 'bg-fail'
  if (used > 80) return 'bg-warn'
  return 'bg-ink-80'
}

/**
 * A selectable row. The shell is a div that carries the shape (radius, height, wash, focus ring) and the click; the row
 * inside is Item, which owns the layout and gives the pressed wash to the selected row. Glaze's Button is one line and
 * one pill by definition, and the lint refuses a restyled radius or fill on Item as well, so the shape lives on this
 * wrapper and nothing inside it restyles anything.
 */
function Row({
  selected,
  className,
  innerClassName,
  onClick,
  label,
  children
}: {
  key?: string
  selected?: boolean
  className?: string
  innerClassName?: string
  onClick: () => void
  label: string
  children: ReactNode
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-current={selected ? 'true' : undefined}
      onClick={onClick}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onClick()
        }
      }}
      className={cn('rounded-tag focus-visible:focus-ring-row', selected ? 'bg-pressed' : 'hover:bg-hover', className)}
    >
      <Item size="sm" className={cn('h-full gap-2.5 px-2.5', innerClassName)}>
        {children}
      </Item>
    </div>
  )
}

export function Rail({ ctx }: { ctx: any }) {
  const bots = useStore(store, s => s.bots)
  const current = useStore(store, s => s.bot)
  const live = useStore(store, s => s.live)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const storedId = useStore(store, s => s.storedId)
  const usage = useStore(store, s => s.usage)
  const { rows } = useBots(ctx)

  const [query, setQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Newest activity first, from /bots: a bot that answered two minutes ago leads the list, whatever its name. A bot
  // that never answered has no time to sort by, so it goes after every bot that has one, then by name.
  const ordered = useMemo<Row[]>(() => {
    const byName = new Map(rows.map(r => [r.name, r]))
    const time = (name: string) => {
      const value = byName.get(name)?.last_active
      return typeof value === 'number' && value > 0 ? value : null
    }
    return [...bots]
      .sort((a, b) => {
        const ta = time(a.name)
        const tb = time(b.name)
        if (ta !== tb) {
          if (ta === null) return 1
          if (tb === null) return -1
          return tb - ta
        }
        return botLabel(a).localeCompare(botLabel(b), 'fr')
      })
      .map(b => {
        const row = byName.get(b.name)
        return {
          name: b.name,
          label: botLabel(b),
          heading: botHeading(b.name, b.description),
          role: botRole(b.name, b.description),
          output: row?.last_output || '',
          active: time(b.name) ? time(b.name)! * 1000 : null,
          identity: botIdentity(b.name)
        }
      })
  }, [bots, rows])

  const branco = ordered.find(b => b.name === BRANCO) || null
  const others = ordered.filter(b => b.name !== BRANCO)

  // The search narrows both lists at once: a bot by name or role, a conversation by title.
  const needle = query.trim().toLowerCase()
  const matchBot = (b: Row) => !needle || `${b.label} ${b.heading} ${b.output}`.toLowerCase().includes(needle)
  const shownOthers = others.filter(matchBot)
  const shownBranco = branco && matchBot(branco) ? branco : null

  const sessions = (current ? sessionsByBot[current] : null) || []
  const shownSessions = needle ? sessions.filter(s => String(s.title || '').toLowerCase().includes(needle)) : sessions
  const working = (name: string) => Boolean(live) && name === current

  const closeSearch = () => {
    setSearching(false)
    setQuery('')
  }

  // The compact bar appears once the sentinel is above the column's top edge: the tile and the list have scrolled away.
  useEffect(() => {
    const root = scrollRef.current
    const sentinel = sentinelRef.current
    if (!root || !sentinel || typeof IntersectionObserver !== 'function') return undefined
    const io = new IntersectionObserver(
      entries => {
        const entry = entries[0]
        if (!entry) return
        const top = entry.rootBounds ? entry.rootBounds.top : 0
        setCollapsed(!entry.isIntersecting && entry.boundingClientRect.top < top)
      },
      { root, threshold: 0 }
    )
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  const run = (id: string) => {
    try {
      void ctx?.runAction?.(id)
    } catch {
      /* an older app without that action: the menu simply does nothing */
    }
  }

  const avatarBar = branco ? [branco, ...others] : others

  return (
    <aside className="relative flex h-full min-h-0 min-w-0 flex-col bg-page">
      {collapsed ? (
        <div className="absolute inset-x-0 top-0 z-(--z-raised) flex items-center gap-1 bg-page px-3 py-2" data-enter="rail-bar">
          {avatarBar.map(b => (
            <span
              key={b.name}
              role="button"
              tabIndex={0}
              onClick={() => selectBot(b.name)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  selectBot(b.name)
                }
              }}
              aria-label={b.label}
              aria-current={b.name === current ? 'true' : undefined}
              className={cn('cursor-pointer rounded-pill p-0.5', b.name === current ? 'focus-ring focus-sm' : 'hover:bg-hover')}
            >
              <BotAvatar size={24} colors={b.identity.colors} shape={b.identity.shape} label={b.label} />
            </span>
          ))}
        </div>
      ) : null}

      <div ref={scrollRef} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 pt-2">
        {/* Action bar: search and a new conversation, right-aligned, ghost and round. */}
        <div className="flex items-center justify-end gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon" aria-label="Rechercher un bot ou une conversation" onClick={() => setSearching(v => !v)} />}
              >
                <Icon icon={Search} size={16} />
              </TooltipTrigger>
              <TooltipContent shortcut={['/']}>Rechercher</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon" aria-label="Nouvelle conversation" onClick={() => newConversation()} />}
              >
                <Icon icon={Add} size={16} />
              </TooltipTrigger>
              <TooltipContent shortcut={['mod', 'shift', 'O']}>Nouvelle conversation</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {searching ? (
          <Input
            mode="search"
            size="sm"
            autoFocus
            aria-label="Filtrer les bots et les conversations"
            value={query}
            placeholder="Filtrer les bots et les conversations"
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                e.stopPropagation()
                closeSearch()
              }
            }}
          />
        ) : null}

        {/* The pinned Branco tile. Its star is the one colour outside status in the page: the profile that runs the
            house, marked so it is never mistaken for another bot. Documented exception (--warn + --text-inverse). */}
        {shownBranco ? (
          <div className="flex justify-center pb-1">
            <Row
              selected={shownBranco.name === current}
              onClick={() => selectBot(shownBranco.name)}
              label={shownBranco.label}
              className="size-30 rounded-panel"
              innerClassName="flex-col justify-center gap-2 px-0"
            >
              <span className="relative">
                <BotAvatar size={64} colors={shownBranco.identity.colors} shape={shownBranco.identity.shape} label={shownBranco.label} />
                <span className="absolute end-0 bottom-0 grid size-4.5 place-items-center rounded-pill bg-warn text-text-inverse">
                  <Icon icon={Star} size={12} weight="fill" />
                </span>
              </span>
              <span className="type-label text-text-1">{shownBranco.label}</span>
            </Row>
          </div>
        ) : null}

        {/* The other bots: who answered last, and when, newest first. */}
        <div className="flex flex-col gap-1">
          {shownOthers.map(b => (
            <Row
              key={b.name}
              selected={b.name === current}
              onClick={() => selectBot(b.name)}
              label={b.heading}
              className="h-14"
            >
              <BotAvatar size={36} colors={b.identity.colors} shape={b.identity.shape} label={b.label} />
              <span className={cn('flex min-w-0 flex-1 flex-col gap-0.5', !b.output && 'justify-center')}>
                <span className="flex min-w-0 items-center gap-1.5">
                  {/* With something to say, the line carries the role; with nothing, the role takes the second line. */}
                  <span className="truncate type-label text-text-1">{b.output ? b.heading : b.label}</span>
                  <span className="ms-auto flex shrink-0 items-center gap-1">
                    {working(b.name) ? <SessionDot /> : null}
                    {sinceLabel(b.active) ? <span className="type-caption text-text-3">{sinceLabel(b.active)}</span> : null}
                  </span>
                </span>
                {b.output || b.role ? <span className="truncate type-body-sm text-text-2">{b.output || b.role}</span> : null}
              </span>
            </Row>
          ))}
        </div>

        {/* Sentinel: once it sits above the column's top edge, the compact bar takes over. */}
        <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

        {/* The open bot's conversations, grouped the way the labels file groups them. */}
        <div className="flex min-h-0 flex-col">
          <div className="flex items-center justify-between gap-2 pb-1">
            <h2 className="type-caption text-text-2">Conversations</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Nouvelle conversation" onClick={() => newConversation()} />}>
                  <Icon icon={Add} size={12} />
                </TooltipTrigger>
                <TooltipContent>Nouvelle conversation</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {CONV_GROUPS.map(group => {
            const inGroup = shownSessions.filter(s => convGroup(s.at) === group)
            if (!inGroup.length) return null
            return (
              <div key={group} className="flex flex-col pb-2">
                <span className="px-2 pb-1 type-caption text-text-3">{group}</span>
                {inGroup.map(s => (
                  <Row
                    key={s.id}
                    selected={s.id === storedId}
                    onClick={() => openConversation(s.id)}
                    label={s.title || 'Conversation'}
                    className="h-8"
                    innerClassName="gap-2 px-2"
                  >
                    <span className="min-w-0 flex-1 truncate type-body-sm text-text-1">{s.title || 'Conversation'}</span>
                    <span className="shrink-0 type-caption text-text-3">{sinceLabel(s.at)}</span>
                  </Row>
                ))}
              </div>
            )
          })}
          {!shownSessions.length && needle ? <span className="px-2 type-caption text-text-3">Aucune conversation</span> : null}
        </div>
      </div>

      {/* Foot: the two subscription meters, then who is signed in and the way out to the rest of the app. */}
      <div className="flex flex-col gap-3 px-3 pb-3 pt-2">
        {meters(usage).map(m => {
          const session = pct(m.session?.used)
          return (
            <div key={m.id} className="flex flex-col gap-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="type-caption text-text-2">{m.label}</span>
                <span className="type-caption tabular-nums text-text-3">{m.session ? `${session} %` : '—'}</span>
              </div>
              <div className="h-(--progress-bar-sm) w-full overflow-hidden rounded-pill bg-field">
                <div className={cn('h-full w-(--pct) rounded-pill', fillFor(session))} style={{ '--pct': `${session}%` } as CSSProperties} />
              </div>
              <span className="type-caption text-text-3">{m.week ? `Semaine ${pct(m.week.used)} %` : 'Semaine —'}</span>
            </div>
          )
        })}

        <div className="flex items-center gap-2">
          {/* The initials come from `name`; an explicit AvatarFallback with no children draws the person glyph, which is
              nothing — the empty circle Dex saw. Let Avatar render its own fallback. */}
          <Avatar type="person" size="default" name="Ilyass Bm" />
          <span className="min-w-0 flex-1 truncate type-label text-text-1">Ilyass Bm</span>
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Ouvrir les réglages et les pages de l'application" />}>
              <Icon icon={SquaresFour} size={14} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" size="sm">
              <DropdownMenuLabel>Hermes</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => run('nav.settings')}>
                Réglages
                <DropdownMenuShortcut keys={['⌘', ',']} />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => run('nav.capabilities')}>Capabilities</DropdownMenuItem>
              <DropdownMenuItem onClick={() => run('nav.messaging')}>Messaging</DropdownMenuItem>
              <DropdownMenuItem onClick={() => run('nav.artifacts')}>Artifacts</DropdownMenuItem>
              <DropdownMenuItem onClick={() => run('nav.cron')}>Tâches planifiées</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => run('nav.agents')}>Agents et connexions</DropdownMenuItem>
              <DropdownMenuItem onClick={() => run('keybinds.openPanel')}>
                Raccourcis
                <DropdownMenuShortcut keys={['⌘', '/']} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  )
}

/**
 * A bot at work: the 6px --ok dot the spec asks for, drawn as a circle so it carries a name for assistive tech.
 * The spec pins this mark (a live session, not a status column); Glaze's lint reads a rounded box as a status dot, a
 * glyph as the status itself, so the shape here is the circle and the meaning is the label.
 */
function SessionDot() {
  return (
    <span role="img" aria-label="Travaille" className="inline-flex size-1.5 text-ok">
      <svg viewBox="0 0 6 6" aria-hidden="true" className="size-full">
        <circle cx="3" cy="3" r="2.6" fill="currentColor" />
      </svg>
    </span>
  )
}
