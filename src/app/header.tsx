// The centre's header: the open bot's conversations as tabs on the left, the panel's toggle on the right. 38px, no
// rule, no fill: the paper of the sheet shows through, and the row sits on the same line as the rail's top bar.
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

type HeaderProps = {
  ctx: any
  narrowRail: boolean
}

export function Header({ ctx, narrowRail }: HeaderProps) {
  const bot = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const sessionsByBot = useStore(store, s => s.sessionsByBot)
  const storedId = useStore(store, s => s.storedId)
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
    <div className="hui-hdr">
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
          </div>
        ))}

        {sessions.length ? (
          <DropdownMenu>
            {/* Glaze's Button in the render slot: a real <button>, where a `div role="button"` opened the menu on a
                keypress but let the click's mouseup close it again (lot 7). */}
            <DropdownMenuTrigger
              openOnHover={false}
              render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-tab-list" aria-label={UI.header.allConversations} />}
            >
              <Icon icon={List} size={14} />
            </DropdownMenuTrigger>
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
                        <span className="hui-conv-time">{sinceLabel(s.at)}</span>
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
              render={<div role="button" tabIndex={0} className="hui-icon-btn hui-tab-new" aria-label={UI.header.newConversation} onClick={() => newConversation()} onKeyDown={press(() => newConversation())} />}
            >
              <Icon icon={Add} size={14} />
            </TooltipTrigger>
            <TooltipContent shortcut={capsOf('hermes-ui.newConversation')}>{UI.header.newConversation}</TooltipContent>
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
                <Icon icon={SidebarSimple} size={14} />
              </TooltipTrigger>
              <TooltipContent>{UI.header.showBots}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label={asideOpen ? UI.header.hideAside : UI.header.showAside} onClick={() => toggleAside(ctx)} />}
            >
              <Icon icon={SidebarSimple} size={14} mirrored />
            </TooltipTrigger>
            <TooltipContent shortcut={capsOf('hermes-ui.toggleAside')}>{asideOpen ? UI.header.hideAside : UI.header.showAside}</TooltipContent>
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
