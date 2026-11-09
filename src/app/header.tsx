// The centre's header: the open bot's conversations as tabs on the left, then the controls (the full list, a new
// conversation), and the panel's toggle on the right. 44px, no rule, no fill: the paper of the sheet shows through,
// and the row sits on the same line as the rail's 44px top bar. The tablist holds tabs only (lot 17).
//
// The tabs are the bot itself, the three most recent conversations (the open one is always there, even older), the way
// into the full list, and a new conversation. Lot 14 moved the model picker to the composer's bottom bar, where it sits
// beside the attach button with the provider's mark; the header keeps the title (the bot's own tab), the tabs and the
// panel's toggle.
import { useMemo, useState } from 'react'
import { Icon, Add, List, SidebarSimple } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Input } from '@/components/glaze/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/glaze/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { newConversation, openConversation, store } from '@/lib/hermes'
import { botLabel, convGroup, CONV_GROUPS } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { botIdentity, sinceLabel } from './format'
import { capsOf } from './keys'
import { UI } from './strings'
import { toggleAside, view } from './ui-state'
import { WorkingDot } from './thread/working'

type HeaderProps = {
  ctx: any
  narrowRail: boolean
}

export function Header({ ctx, narrowRail }: HeaderProps) {
  const bot = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const storedId = useStore(store, s => s.storedId)
  const live = useStore(store, s => s.live)
  const asideOpen = useStore(view, s => s.asideOpen)
  const railOpen = useStore(view, s => s.railOpen)

  const meta = bots.find(b => b.name === bot)
  const name = botLabel(meta || bot)
  const identity = botIdentity(bot || 'default')
  const sessions = (bot && sessionsByBot[bot]) || []

  /** The open conversation stays visible in the tab row even when it is older than the three most recent. */
  const tabs = useMemo(() => {
    const first = sessions.slice(0, 3)
    const open = storedId ? sessions.find(s => s.id === storedId) : null
    return open && !first.some(s => s.id === open.id) ? [...first, open] : first
  }, [sessions, storedId])

  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const shown = needle ? sessions.filter(s => String(s.title || '').toLowerCase().includes(needle)) : sessions

  const openMostRecent = () => {
    const latest = sessions[0]
    if (latest) void openConversation(latest.id)
    else newConversation()
  }

  return (
    <div className="hui-hdr" data-ui-container="" data-ui-actions="">
      <div className="hui-hdr-tabs" role="tablist" aria-label={UI.header.conversations(name)}>
        <div
          role="tab"
          tabIndex={0}
          aria-selected={!storedId}
          className="hui-tab hui-tab-bot"
          onClick={openMostRecent}
          onKeyDown={press(openMostRecent)}
        >
          <BotAvatar size={18} colors={identity.colors} shape={identity.shape} label={name} hoverGiggle={false} />
          {live && !storedId ? <WorkingDot className="hui-tab-dot" /> : null}
          <span className="hui-tab-text">{name}</span>
        </div>

        {tabs.map(s => (
          <div
            key={s.id}
            role="tab"
            tabIndex={0}
            aria-selected={s.id === storedId}
            className="hui-tab hui-tab-conv"
            title={s.title || UI.header.conversation}
            onClick={() => void openConversation(s.id)}
            onKeyDown={press(() => void openConversation(s.id))}
          >
            <span className="hui-tab-text">{s.title || UI.header.conversation}</span>
            {live && s.id === storedId ? <WorkingDot className="hui-tab-dot" /> : null}
          </div>
        ))}
      </div>

      {/* The list and the new conversation are controls, not tabs: they sit outside the tablist (a `role="tablist"`
          may only hold tabs) and 8px apart, the gap the icon cluster needs (lot 17). */}
      <div className="hui-hdr-actions">
        {sessions.length ? (
          <DropdownMenu>
            {/* Glaze's Button in the render slot: a real <button>, where a `div role="button"` opened the menu on a
                keypress but let the click's mouseup close it again (lot 7). The tooltip is the hover hint now, and
                it carries the same string as the name: Base UI nests the two triggers (TooltipTrigger rendering the
                DropdownMenuTrigger, which renders the Button), so one element opens the menu and shows the hint
                (lot 19). data-ui-tooltip names the chip's id, which a text check follows to its role="tooltip". */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  aria-label={UI.header.allConversations}
                  render={
                    <DropdownMenuTrigger
                      openOnHover={false}
                      render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-tab-list" aria-label={UI.header.allConversations} data-ui-tooltip="hui-tip-header-conversations" />}
                    >
                      <Icon icon={List} size={12} />
                    </DropdownMenuTrigger>
                  }
                />
                <TooltipContent id="hui-tip-header-conversations">{UI.header.allConversations}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="start" side="bottom" size="sm" className="hui-conv-menu">
              <div className="hui-conv-filter">
                <Input
                  mode="search"
                  size="sm"
                  autoFocus
                  value={query}
                  placeholder={UI.header.filterConversations}
                  aria-label={UI.header.filterConversations}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.stopPropagation()}
                />
              </div>
              {CONV_GROUPS.map(group => {
                const inGroup = shown.filter(s => convGroup(s.at) === group)
                if (!inGroup.length) return null
                return (
                  <DropdownMenuGroup key={group}>
                    <DropdownMenuLabel>{group}</DropdownMenuLabel>
                    {inGroup.map(s => (
                      <DropdownMenuItem key={s.id} onClick={() => void openConversation(s.id)}>
                        <span className="hui-conv-title">{s.title || UI.header.conversation}</span>
                        <span className="hui-conv-time" data-ui-number="">{sinceLabel(s.at)}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                )
              })}
              {!shown.length ? <p className="hui-conv-empty">{UI.header.noConversation}</p> : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<div role="button" tabIndex={0} className="hui-icon-btn hui-tab-new" aria-label={UI.header.newConversation} data-ui-tooltip="hui-tip-header-new" onClick={() => newConversation()} onKeyDown={press(() => newConversation())} />}
            >
              <Icon icon={Add} size={12} />
            </TooltipTrigger>
            <TooltipContent id="hui-tip-header-new" shortcut={capsOf('hermes-ui.newConversation')}>{UI.header.newConversation}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="hui-hdr-right">
        {narrowRail ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<div role="button" tabIndex={0} className="hui-icon-btn" aria-label={UI.header.toggleRail} onClick={() => view.set({ railOpen: !railOpen })} />}
              >
                <Icon icon={SidebarSimple} size={12} />
              </TooltipTrigger>
              <TooltipContent>{UI.header.toggleRail}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn" aria-label={asideOpen ? UI.header.hideAside : UI.header.showAside} data-ui-tooltip="hui-tip-header-aside" onClick={() => toggleAside(ctx)} />}
            >
              <Icon icon={SidebarSimple} size={12} mirrored />
            </TooltipTrigger>
            <TooltipContent id="hui-tip-header-aside" shortcut={capsOf('hermes-ui.toggleAside')}>{asideOpen ? UI.header.hideAside : UI.header.showAside}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

/** Enter and Space on a div that acts as a tab. */
const press = (run: () => void) => (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    run()
  }
}
