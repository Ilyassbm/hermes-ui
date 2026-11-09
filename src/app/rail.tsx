// The rail: the bots, the way into the rest of the app, and what is left on each subscription.
//
// Laid out like the OpenBot column Dex described: a 38px top bar (the app's menu on the left, the new-discussion
// button on the right), a search field drawn as a button, the pinned bots as tiles, the rest of the team as rows, and
// the usage cards at the foot. The data is the same as lot 2's rail — `use-bots` for what each bot said last and when,
// `store` for the selection and the conversation lists, `labels` for names, roles and the avatar identities.
//
// The styles live in src/styles/rail.css, on Glaze's tokens, scoped to .glaze: the shapes the spec pins (280, 38, 62,
// 72×102) are hand-set, and the lint stays at zero because no rule of it is restyled through a className.
import { cloneElement, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent as ReactMouseEvent, type ReactElement, type ReactNode } from 'react'
import { Icon, Add, ChevronDown, ChevronRight, Search, Settings, Time } from '@/components/glaze/icon'
import { ActivityArc } from '@/components/glaze/ai/activity'
import { Badge } from '@/components/glaze/ui/badge'
import { Button } from '@/components/glaze/ui/button'
import { Kbd } from '@/components/glaze/ui/kbd'
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { newConversation, selectBot, store } from '@/lib/hermes'
import { botLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { toast } from '@/components/glaze/ui/toast'
import { setReplaceNative } from './native-takeover'
import { BotAvatar } from './bot-avatar'
import { botIdentity, botRole, sinceLabel } from './format'
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
  const { rows } = useBots(ctx)

  const [pinned, setPinned] = useState<string[]>(() => read(ctx, 'pinned', DEFAULT_PINNED))
  const [teamOpen, setTeamOpen] = useState<boolean>(() => read(ctx, 'teamOpen', true))
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

  const pin = (name: string, on: boolean) => {
    const next = on ? [...pinned.filter(n => n !== name), name] : pinned.filter(n => n !== name)
    setPinned(next)
    write(ctx, 'pinned', next)
  }

  const fold = () => {
    const next = !teamOpen
    setTeamOpen(next)
    write(ctx, 'teamOpen', next)
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
  }, [pinnedRows.length, team.length, teamOpen])

  const busy = (name: string) => Boolean(live) && name === current
  const waiting = (name: string) => Boolean(approval) && name === current

  return (
    <aside className="hui-rail">
      <div className="hui-rail-top">
        <AppMenu ctx={ctx} />
        <div className="hui-rail-actions">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<div role="button" tabIndex={0} className="hui-icon-btn hui-rail-gear" aria-label={UI.rail.settings} onClick={() => openSettings()} onKeyDown={enter(() => openSettings())} />}
              >
                <Icon icon={Settings} size={14} />
              </TooltipTrigger>
              <TooltipContent>{UI.rail.settings}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<div role="button" tabIndex={0} className="hui-icon-btn" aria-label={UI.rail.newWithBot} onClick={() => openPicker('new')} onKeyDown={enter(() => openPicker('new'))} />}
              >
                <Icon icon={Add} size={16} />
              </TooltipTrigger>
              <TooltipContent shortcut={capsOf('hermes-ui.newChatWithBot')}>{UI.rail.newWithBot}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="hui-rail-search">
        <div
          role="button"
          tabIndex={0}
          className="hui-search"
          aria-label={UI.rail.searchLabel}
          onClick={() => openPicker('search')}
          onKeyDown={enter(() => openPicker('search'))}
        >
          <Icon icon={Search} size={14} />
          <span>{UI.rail.search}</span>
          <Kbd keys="mod+alt+k" />
        </div>
      </div>

      <div
        ref={listRef}
        className="hui-rail-list"
        data-shade-top={shade.top || undefined}
        data-shade-bottom={shade.bottom || undefined}
      >
        {pinnedRows.length ? (
          <div className="hui-pinned" role="listbox" aria-label={UI.rail.pinnedLabel}>
            {pinnedRows.map(row => (
              <BotContextMenu key={row.name} row={row} pinned onPin={() => pin(row.name, false)} ctx={ctx}>
                <div
                  role="option"
                  tabIndex={0}
                  className="hui-tile"
                  aria-selected={row.name === current}
                  aria-label={row.label}
                  onClick={() => selectBot(row.name)}
                  onKeyDown={enter(() => selectBot(row.name))}
                >
                  <span className="hui-avatar">
                    <BotAvatar size={56} colors={row.identity.colors} shape={row.identity.shape} label={row.label} />
                    {busy(row.name) ? (
                      <span className="hui-work" role="img" aria-label={UI.rail.working}>
                        <ActivityArc />
                      </span>
                    ) : null}
                  </span>
                  <span className="hui-tile-name">{row.label}</span>
                  {row.role ? <span className="hui-role">{row.role}</span> : null}
                </div>
              </BotContextMenu>
            ))}
          </div>
        ) : null}

        <section className="hui-team" data-open={teamOpen}>
          <div
            role="button"
            tabIndex={0}
            className="hui-team-head"
            aria-expanded={teamOpen}
            aria-controls="hui-team-body"
            onClick={fold}
            onKeyDown={enter(fold)}
          >
            <span>{UI.rail.team}</span>
            <Icon icon={ChevronRight} size={12} />
          </div>
          <div className="hui-team-body" id="hui-team-body">
            <div>
              <div role="listbox" aria-label={UI.rail.teamLabel} data-ui-stack="">
                {team.map(row => (
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
                      aria-label={row.label}
                      onClick={() => selectBot(row.name)}
                      onKeyDown={enter(() => selectBot(row.name))}
                    >
                      <span className="hui-avatar">
                        <BotAvatar size={46} colors={row.identity.colors} shape={row.identity.shape} label={row.label} />
                        {busy(row.name) ? (
                          <span className="hui-work" role="img" aria-label={UI.rail.working}>
                            <ActivityArc />
                          </span>
                        ) : null}
                      </span>
                      <span className="hui-row-text">
                        <span className="hui-row-line">
                          <span className="hui-row-name">{row.label}</span>
                          {row.role ? <span className="hui-role">{row.role}</span> : null}
                          {waiting(row.name) ? (
                            <Badge variant="warn" size="sm" className="ms-auto">
                              <Icon icon={Time} size={12} />
                              {UI.rail.waiting}
                            </Badge>
                          ) : sinceLabel(row.active) ? (
                            <span className="hui-row-time" data-ui-number="">{sinceLabel(row.active)}</span>
                          ) : null}
                        </span>
                        {row.output ? <span className="hui-row-output">{row.output}</span> : null}
                      </span>
                    </div>
                  </BotContextMenu>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="hui-rail-foot">
        <UsageMeters cards={usageCards(usage)} ctx={ctx} />
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
        render={<Button variant="ghost" size="sm" className="hui-rail-app" aria-label={UI.rail.appMenu} />}
      >
        <span>Agentise</span>
        <Icon icon={ChevronDown} size={12} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="bottom" size="sm">
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
