// The centre's header, after the Grok Bot reference: a pill in the middle names the open bot and opens its
// conversations (a new one first, then by day, with a filter past six), and two round buttons at the end start a new
// conversation and toggle the bot panel. No bar, no tab strip: the thread scrolls under it and fades out at the top.
import { useMemo, useState } from 'react'
import { Icon, Add, ChevronDown, SidebarSimple } from '@/components/glaze/icon'
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
import { botIdentity, botRole, sinceLabel } from './format'
import { capsOf } from './keys'
import { UI } from './strings'
import { toggleAside, view } from './ui-state'
import { WorkingDot } from './thread/working'
import { useMediaQuery } from './use-media'

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
  const narrowAside = useMediaQuery('(max-width: 1099px)')

  const meta = bots.find(b => b.name === bot)
  const name = botLabel(meta || bot)
  const role = botRole(bot || undefined, meta?.description)
  const identity = botIdentity(bot || 'default')
  const sessions = (bot && sessionsByBot[bot]) || []
  const open = storedId ? sessions.find(s => s.id === storedId) : null

  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const shown = useMemo(
    () => (needle ? sessions.filter(s => String(s.title || '').toLowerCase().includes(needle)) : sessions),
    [needle, sessions]
  )

  return (
    // The reference's header: no bar, no tabs. The bot floats as a pill in the middle — its avatar, "Name · Role" and,
    // once a conversation is open, its title in small print — and the pill opens every conversation of the bot. The
    // new conversation and the panel's toggle are round buttons at the end.
    <div className="hui-hdr" data-ui-container="" data-ui-actions="">
      {/* The veil over the thread: the page's own top colour, opaque at the top, clear by 60px. A real element rather
          than a ::before, so nothing generated sits between a control's words and the surface they are read on. */}
      <div className="hui-veil" aria-hidden />
      <div className="hui-hdr-start">
        {narrowRail ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-36"
                    className="hui-round"
                    aria-label={UI.header.toggleRail}
                    data-ui-tooltip="hui-tip-header-rail"
                    onClick={() => view.set({ railOpen: !railOpen })}
                  />
                }
              >
                <Icon icon={SidebarSimple} size={12} />
              </TooltipTrigger>
              <TooltipContent id="hui-tip-header-rail">{UI.header.toggleRail}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger
          openOnHover={false}
          render={<Button variant="ghost" className="hui-pill" title={open?.title || UI.header.allConversations} />}
        >
          <BotAvatar size={22} colors={identity.colors} shape={identity.shape} label={name} hoverGiggle={false} />
          <span className="hui-pill-name">{role ? `${name} · ${role}` : name}</span>
          {open?.title ? <span className="hui-pill-title">{open.title}</span> : null}
          {live ? <WorkingDot className="hui-tab-dot" /> : null}
          <Icon icon={ChevronDown} size={12} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" side="bottom" size="sm" className="hui-conv-menu">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => newConversation()}>
              <Icon icon={Add} size={14} />
              <span className="hui-conv-title">{UI.header.newConversation}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {sessions.length > 6 ? (
            <div className="hui-conv-filter">
              <Input
                mode="search"
                size="sm"
                value={query}
                placeholder={UI.header.filterConversations}
                aria-label={UI.header.filterConversations}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.stopPropagation()}
              />
            </div>
          ) : null}
          {CONV_GROUPS.map(group => {
            const inGroup = shown.filter(s => convGroup(s.at) === group)
            if (!inGroup.length) return null
            return (
              <DropdownMenuGroup key={group}>
                <DropdownMenuLabel>{group}</DropdownMenuLabel>
                {inGroup.map(s => (
                  <DropdownMenuItem key={s.id} onClick={() => void openConversation(s.id)} data-current={s.id === storedId || undefined}>
                    <span className="hui-conv-title">{s.title || UI.header.conversation}</span>
                    <span className="hui-conv-time" data-ui-number="">{sinceLabel(s.at)}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            )
          })}
          {sessions.length && !shown.length ? <p className="hui-conv-empty">{UI.header.noConversation}</p> : null}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hui-hdr-right">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-36" className="hui-round hui-tab-new" aria-label={UI.header.newConversation} data-ui-tooltip="hui-tip-header-new" onClick={() => newConversation()} />}
            >
              <Icon icon={Add} size={12} />
            </TooltipTrigger>
            <TooltipContent id="hui-tip-header-new" shortcut={capsOf('hermes-ui.newConversation')}>{UI.header.newConversation}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* Open, the panel carries its own close button at the same height: the toggle steps aside instead of doubling it. */}
        {asideOpen && !narrowAside ? null : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-36" className="hui-round" aria-label={asideOpen ? UI.header.hideAside : UI.header.showAside} data-ui-tooltip="hui-tip-header-aside" onClick={() => toggleAside(ctx)} />}
            >
              <Icon icon={SidebarSimple} size={12} mirrored />
            </TooltipTrigger>
            <TooltipContent id="hui-tip-header-aside" shortcut={capsOf('hermes-ui.toggleAside')}>{asideOpen ? UI.header.hideAside : UI.header.showAside}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        )}
      </div>
    </div>
  )
}
