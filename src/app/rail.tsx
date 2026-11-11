// The rail: the bots, the way into the rest of the app, and what is left on each subscription.
//
// Laid out like the OpenBot column Dex described: a 44px top bar (the app's menu on the left, the new-discussion
// button on the right), a search field drawn as a button, the pinned bots as tiles, the rest of the team as rows, and
// the usage cards at the foot. The data is the same as lot 2's rail — `use-bots` for what each bot said last and when,
// `store` for the selection and the conversation lists, `labels` for names, roles and the avatar identities.
//
// The styles live in src/styles/rail.css, on Glaze's tokens, scoped to .glaze: the shapes the spec pins (280, 44, 62,
// 72×102) are hand-set, and the lint stays at zero because no rule of it is restyled through a className.
import { cloneElement, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode } from 'react'
import { Icon, Add, Search, Settings, SquaresFour, Star, Time } from '@/components/glaze/icon'
import { WorkingDot, WorkingStatus } from './thread/working'
import { Badge } from '@/components/glaze/ui/badge'
import { Button } from '@/components/glaze/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/glaze/ui/dropdown-menu'
import { newConversation, selectBot, store } from '@/lib/hermes'
import { botLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { toast } from '@/components/glaze/ui/toast'
import { setReplaceNative } from './native-takeover'
import { BotAvatar } from './bot-avatar'
import { botIdentity, botRole } from './format'
import { capsOf } from './keys'
import { openSettings } from './settings-link'
import { UI } from './strings'
import { openPicker } from './ui-state'
import { usageCards, UsageMeters } from './usage'
import { useBots } from './use-bots'

type Row = {
  name: string
  label: string
  role: string
  output: string
  section: string
  active: number | null
  identity: ReturnType<typeof botIdentity>
}

/** The pinned list's first name: Branco runs the house, so its tile is there before anything is pinned. */
const DEFAULT_PINNED = ['default']

export function Rail({ ctx }: { ctx: any }) {
  const bots = useStore(store, s => s.bots)
  const current = useStore(store, s => s.bot)
  const live = useStore(store, s => s.live)
  const approval = useStore(store, s => s.approval)
  const usage = useStore(store, s => s.usage)
  const connecting = useStore(store, s => s.connecting)
  const { rows } = useBots(ctx)

  const [pinned, setPinned] = useState<string[]>(() => read(ctx, 'pinned', DEFAULT_PINNED))
  const [shade, setShade] = useState({ top: false, bottom: false })
  const listRef = useRef<HTMLDivElement | null>(null)

  /** Newest activity first; a bot that never answered goes after every bot that has, then by name. */
  const ordered: Row[] = [...bots]
    .map(b => {
      const row = rows.find(r => r.name === b.name)
      const active = typeof row?.last_active === 'number' && row.last_active > 0 ? row.last_active * 1000 : null
      return {
        name: b.name,
        label: botLabel(b),
        role: botRole(b.name, b.description),
        output: row?.last_output || '',
        section: String((b as any).section || ''),
        active,
        identity: botIdentity(b.name)
      }
    })
    .sort((a, b) => {
      if (a.active !== b.active) {
        if (a.active === null) return 1
        if (b.active === null) return -1
        return b.active - a.active
      }
      return a.label.localeCompare(b.label, 'en')
    })

  const pinnedRows = pinned.map(name => ordered.find(row => row.name === name)).filter((row): row is Row => Boolean(row))
  const team = ordered.filter(row => !pinned.includes(row.name))
  // The team in the roster's own sections, in the order they first appear; bots the roster files nowhere go under
  // "Team", after the named sections.
  const sections: { title: string; rows: Row[] }[] = []
  for (const row of [...team.filter(r => r.section), ...team.filter(r => !r.section)]) {
    const title = row.section || UI.rail.team
    let group = sections.find(g => g.title === title)
    if (!group) sections.push((group = { title, rows: [] }))
    group.rows.push(row)
  }

  const pin = (name: string, on: boolean) => {
    const next = on ? [...pinned.filter(n => n !== name), name] : pinned.filter(n => n !== name)
    setPinned(next)
    write(ctx, 'pinned', next)
  }

  // The fade at an end only while that end hides something, read from the list's own scroll position.
  useEffect(() => {
    const el = listRef.current
    if (!el) return undefined
    const update = () =>
      setShade({
        top: el.scrollTop > 2,
        bottom: el.scrollTop + el.clientHeight < el.scrollHeight - 2
      })
    update()
    el.addEventListener('scroll', update, { passive: true })
    const observer = typeof ResizeObserver === 'function' ? new ResizeObserver(update) : null
    observer?.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      observer?.disconnect()
    }
  }, [pinnedRows.length, team.length])

  const busy = (name: string) => Boolean(live) && name === current
  const waiting = (name: string) => Boolean(approval) && name === current

  return (
    <aside className="hui-rail">
      {/* The top: two round buttons at the inline end, search and a new conversation, as in the reference. The app's
          own menu moved to the foot, behind the grid button. */}
      <div className="hui-rail-top">
        <Button
          variant="ghost"
          size="icon-lg"
          className="hui-round"
          aria-label={`${UI.rail.search} ${capsOf('hermes-ui.search').join(' ')}`}
          title={UI.rail.searchLabel}
          onClick={() => openPicker('search')}
        >
          <Icon icon={Search} size={16} />
        </Button>
        <Button variant="ghost" size="icon-lg" className="hui-round" aria-label={UI.rail.newChat} title={UI.rail.newWithBot} onClick={() => openPicker('new')}>
          <Icon icon={Add} size={16} />
        </Button>
      </div>

      <div
        ref={listRef}
        className="hui-rail-list"
        data-shade-top={shade.top || undefined}
        data-shade-bottom={shade.bottom || undefined}
      >
        {/* The gateway socket is still opening (Desktop connects after the first render): one quiet line where the
            roster will land, instead of an empty rail that reads as "no bots". */}
        {connecting ? (
          <p className="hui-rail-state" role="status">{UI.rail.connecting}</p>
        ) : null}
        {pinnedRows.length ? (
          <div className="hui-pinned" role="listbox" aria-label={UI.rail.pinnedLabel}>
            {pinnedRows.map((row, index) => (
              <BotContextMenu key={row.name} row={row} pinned onPin={() => pin(row.name, false)} ctx={ctx}>
                <div
                  role="option"
                  tabIndex={0}
                  className="hui-tile"
                  aria-selected={row.name === current}
                  aria-label={row.role ? `${row.label}, ${row.role}` : row.label}
                  onClick={() => selectBot(row.name)}
                  onKeyDown={enter(() => selectBot(row.name))}
                >
                  <span className="hui-avatar">
                    <BotAvatar size={58} colors={row.identity.colors} shape={row.identity.shape} label={row.label} />
                    {busy(row.name) ? (
                      <span className="hui-work" role="img" aria-label={UI.rail.working}>
                        <WorkingDot />
                      </span>
                    ) : index === 0 ? (
                      // The first pin is the house bot: a small star on its corner, nothing to read.
                      <span className="hui-star" aria-hidden>
                        <Icon icon={Star} size={8} weight="fill" />
                      </span>
                    ) : null}
                  </span>
                  <span className="hui-tile-name">{row.label}</span>
                </div>
              </BotContextMenu>
            ))}
          </div>
        ) : null}

        {sections.map(group => (
          <section key={group.title} className="hui-team">
            <div className="hui-team-head">{group.title}</div>
            <div role="listbox" aria-label={group.title} data-ui-stack="">
              {group.rows.map(row => (
                    <BotContextMenu
                      key={row.name}
                      row={row}
                      pinned={false}
                      onPin={() => pin(row.name, true)}
                      ctx={ctx}
                    >
                      <div
                        role="option"
                        tabIndex={0}
                        className="hui-bot-row"
                        aria-selected={row.name === current}
                        // No aria-label: the row's name is its own content — "Growth, Chief of Staff, 9h, the last
                        // message" — which is exactly what the eye reads. A label of "Growth, Chief of Staff" left
                        // the time and the message out of the name, so the visible text was not part of it (lot 18).
                        onClick={() => selectBot(row.name)}
                        onKeyDown={enter(() => selectBot(row.name))}
                      >
                        <span className="hui-avatar">
                          <BotAvatar size={36} colors={row.identity.colors} shape={row.identity.shape} label={row.label} />
                          {busy(row.name) ? (
                            <span className="hui-work" role="img" aria-label={UI.rail.working}>
                              <WorkingDot />
                            </span>
                          ) : null}
                        </span>
                        <span className="hui-row-text">
                          <span className="hui-row-line">
                            {/* "Forge · Engineering": the name and the role on one line, the way the reference titles a row. */}
                            <span className="hui-row-name">{row.role ? `${row.label} · ${row.role}` : row.label}</span>
                            {waiting(row.name) ? (
                              <Badge variant="warn" size="sm" className="ms-auto">
                                <Icon icon={Time} size={12} />
                                {UI.rail.waiting}
                              </Badge>
                            ) : null}
                          </span>
                          {/* While the turn runs, the last output gives its line to the working clock; it returns after. */}
                          {busy(row.name) ? (
                            <WorkingStatus live={live} />
                          ) : row.output ? (
                            <span className="hui-row-output" title={row.output}>{row.output}</span>
                          ) : null}
                        </span>
                      </div>
                    </BotContextMenu>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="hui-rail-foot">
        <UsageMeters cards={usageCards(usage)} ctx={ctx} />
        <div className="hui-rail-foot-actions">
          <span className="hui-rail-app-name">{UI.rail.appName}</span>
          <Button variant="ghost" size="icon-lg" className="hui-round" aria-label={UI.rail.settings} title={UI.rail.settings} onClick={() => openSettings()}>
            <Icon icon={Settings} size={16} />
          </Button>
          <AppMenu ctx={ctx} />
        </div>
      </div>
    </aside>
  )
}

/** The app's own menu, behind the workspace's name. It opens under the button, in groups (Base UI needs a group
 *  around a label, which is what made the model picker throw before this lot). */
function AppMenu({ ctx }: { ctx: any }) {
  const run = (id: string) => {
    try {
      void ctx?.runAction?.(id)
    } catch {
      /* an older app without that action: the row simply does nothing */
    }
  }
  return (
    <DropdownMenu>
      {/* Glaze's Button in the render slot: a real <button>, where a `<div role="button">` opened the menu on the
          keypress and the mouseup that followed a mouse click closed it at once (lot 7). */}
      <DropdownMenuTrigger
        openOnHover={false}
        render={<Button variant="ghost" size="icon-lg" className="hui-round" aria-label={`${UI.rail.appName}, ${UI.rail.appMenu.toLowerCase()}`} />}
      >
        <Icon icon={SquaresFour} size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" size="sm">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Hermes</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openSettings()}>
            {UI.rail.settings}
            <DropdownMenuShortcut keys={['⌘', ',']} />
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => run('nav.capabilities')}>Capabilities</DropdownMenuItem>
          <DropdownMenuItem onClick={() => run('nav.messaging')}>Messaging</DropdownMenuItem>
          <DropdownMenuItem onClick={() => run('nav.artifacts')}>Artifacts</DropdownMenuItem>
          <DropdownMenuItem onClick={() => run('nav.cron')}>{UI.rail.scheduled}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => run('nav.agents')}>{UI.rail.agents}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => run('keybinds.openPanel')}>
            {UI.rail.shortcuts}
            <DropdownMenuShortcut keys={['⌘', '/']} />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setReplaceNative(ctx, false)
              toast(UI.rail.useNativeTitle, { description: UI.rail.useNativeBody })
            }}
          >
            {UI.rail.useNative}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Right click (or Shift+F10) on a tile or a row. The menu is a plain dropdown whose `open` state and anchor come from
 *  the row's own `onContextMenu`: a `DropdownMenuTrigger` around the row would take the left click of the selection too,
 *  opening or closing the menu when the person only meant to pick the bot (lot 7). */
function BotContextMenu({
  row,
  pinned,
  onPin,
  ctx,
  children
}: {
  key?: string
  row: Row
  pinned: boolean
  onPin: () => void
  ctx: any
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [point, setPoint] = useState({ x: 0, y: 0 })
  const rowRef = useRef<HTMLElement | null>(null)
  // A zero-sized anchor at the pointer, which is where Base UI places the popup.
  const anchor = useMemo(
    () => ({
      getBoundingClientRect: () => ({
        x: point.x,
        y: point.y,
        top: point.y,
        left: point.x,
        right: point.x,
        bottom: point.y,
        width: 0,
        height: 0
      })
    }),
    [point]
  )
  const show = (x: number, y: number) => {
    setPoint({ x, y })
    setOpen(true)
  }

  // The row keeps its own handlers (selection on click, Enter/Space): the context menu only adds the right click.
  const child = children as ReactElement<any>
  const own = child.props ?? {}
  const trigger = cloneElement(child, {
    ref: (node: HTMLElement | null) => {
      rowRef.current = node
    },
    'data-menu-open': open || undefined,
    onContextMenu: (event: ReactMouseEvent) => {
      own.onContextMenu?.(event)
      if (event.defaultPrevented) return
      event.preventDefault()
      show(event.clientX, event.clientY)
    },
    onKeyDown: (event: ReactKeyboardEvent) => {
      own.onKeyDown?.(event)
      // Shift+F10 and the Menu key open a context menu at the focused row, as the platform does.
      if (!((event.shiftKey && event.key === 'F10') || event.key === 'ContextMenu')) return
      const box = rowRef.current?.getBoundingClientRect()
      if (!box) return
      event.preventDefault()
      show(box.left + Math.min(box.width / 2, 160), box.top + box.height / 2)
    }
  })

  return (
    <>
      {trigger}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuContent anchor={anchor as any} align="start" side="bottom" size="sm" finalFocus={rowRef}>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                void selectBot(row.name).then(() => newConversation())
              }}
            >
              {UI.rail.newConversation}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onPin}>{pinned ? UI.rail.unpin : UI.rail.pin}</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                try {
                  void ctx?.runAction?.('nav.profiles')
                } catch {
                  /* no profiles page in this app version */
                }
              }}
            >
              {UI.rail.profileSettings}
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

/** Enter and Space on a div that acts as a button. */
const enter = (run: () => void) => (event: ReactKeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    run()
  }
}

/** A stored value, with the default when storage is unavailable. */
function read<T>(ctx: any, key: string, fallback: T): T {
  try {
    const value = ctx?.storage?.get(key, fallback)
    return value === undefined || value === null ? fallback : value
  } catch {
    return fallback
  }
}

function write(ctx: any, key: string, value: unknown) {
  try {
    ctx?.storage?.set(key, value)
  } catch {
    /* the choice lives for this session */
  }
}
