// The centre's header: the open bot's conversations as tabs on the left, the model picker and the panel's toggle on
// the right. 38px, no rule, no fill: the paper of the sheet shows through, and the row sits on the same line as the
// rail's top bar.
//
// The tabs are the bot itself, the three most recent conversations (the open one is always there, even older), the way
// into the full list, and a new conversation. The model picker that used to hang off the composer lives here now, with
// one group for the effort and one group per provider for its models.
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Icon, Add, ChevronDown, List, SidebarSimple } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Input } from '@/components/glaze/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/glaze/ui/dropdown-menu'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { newConversation, openConversation, prefsFor, savePrefs, store } from '@/lib/hermes'
import { botLabel, convGroup, CONV_GROUPS, modelLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { botIdentity, sinceLabel } from './format'
import { capsOf } from './keys'
import { EFFORTS, effortLabel, loadCatalog, type Provider } from './models'
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
      <div className="hui-hdr-tabs" role="tablist" aria-label={`Conversations de ${name}`}>
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
            title={s.title || 'Conversation'}
            onClick={() => void openConversation(s.id)}
            onKeyDown={press(() => void openConversation(s.id))}
          >
            <span className="hui-tab-text">{s.title || 'Conversation'}</span>
          </div>
        ))}

        {sessions.length ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<div role="button" tabIndex={0} className="hui-icon-btn hui-tab-list" aria-label="Toutes les conversations" />}
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
                  placeholder="Filtrer les conversations"
                  aria-label="Filtrer les conversations"
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
                        <span className="hui-conv-title">{s.title || 'Conversation'}</span>
                        <span className="hui-conv-time">{sinceLabel(s.at)}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                )
              })}
              {!shown.length ? <p className="hui-conv-empty">Aucune conversation</p> : null}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<div role="button" tabIndex={0} className="hui-icon-btn hui-tab-new" aria-label="Nouvelle conversation" onClick={() => newConversation()} onKeyDown={press(() => newConversation())} />}
            >
              <Icon icon={Add} size={14} />
            </TooltipTrigger>
            <TooltipContent shortcut={capsOf('hermes-ui.newConversation')}>Nouvelle conversation</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="hui-hdr-right">
        <ModelMenu />
        {narrowRail ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<div role="button" tabIndex={0} className="hui-icon-btn" aria-label="Afficher ou masquer la liste des bots" onClick={() => view.set({ railOpen: !railOpen })} />}
              >
                <Icon icon={SidebarSimple} size={14} />
              </TooltipTrigger>
              <TooltipContent>Afficher les bots</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label={asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'} onClick={() => toggleAside(ctx)} />}
            >
              <Icon icon={SidebarSimple} size={14} mirrored />
            </TooltipTrigger>
            <TooltipContent shortcut={capsOf('hermes-ui.toggleAside')}>{asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

/** "DeepSeek V4.1 Flash · Moyen" — the model the open bot will use, and how hard it thinks. */
function useModelLabel(bot: string | null): string {
  // A preference change is written to storage, not to React: reading `info` back re-renders the trigger.
  useStore(store, s => s.info)
  const meta = useStore(store, s => s.bots).find(b => b.name === bot)
  const prefs = prefsFor(bot)
  const model = prefs.model || meta?.model || ''
  const effort = effortLabel(prefs.effort || 'medium')
  const label = model ? modelLabel(model) : 'Modèle'
  return effort ? `${label} · ${effort}` : label
}

function ModelMenu() {
  const bot = useStore(store, s => s.bot)
  const trigger = useModelLabel(bot)
  const prefs = prefsFor(bot)
  // The same model the trigger names: the bot's preference first, then the profile's own default, so the check mark sits
  // on the model a send would really use.
  const meta = useStore(store, s => s.bots).find(b => b.name === bot)
  const model = prefs.model || meta?.model || ''
  const effort = prefs.effort || 'medium'
  const [providers, setProviders] = useState<Provider[]>([])
  const [open, setOpen] = useState(false)
  // `/model` (and the model shortcut) asks the header to open this menu.
  const asked = useStore(view, s => s.modelMenu)

  useEffect(() => {
    let alive = true
    void loadCatalog().then(list => {
      if (alive) setProviders(list)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    if (asked > 0) setOpen(true)
  }, [asked])

  const pick = (next: string, provider: string) => {
    if (!bot) return
    savePrefs(bot, { model: next, provider })
    store.set(s => ({ info: { ...s.info } }))
  }

  const pickEffort = (value: string) => {
    if (!bot) return
    savePrefs(bot, { effort: value })
    store.set(s => ({ info: { ...s.info } }))
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={<div role="button" tabIndex={0} className="hui-model-trigger" aria-label={`Modèle et effort, ${trigger}`} />}
      >
        <span>{trigger}</span>
        <Icon icon={ChevronDown} size={12} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" size="sm" className="hui-model-menu">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Effort</DropdownMenuLabel>
          <div className="hui-model-effort" onKeyDown={e => e.stopPropagation()}>
            <SegmentedControl size="sm" value={effort} onValueChange={pickEffort} aria-label="Effort de raisonnement">
              {EFFORTS.map(([value, label]) => (
                <Fragment key={value}>
                  <SegmentedControlItem value={value}>{label}</SegmentedControlItem>
                </Fragment>
              ))}
            </SegmentedControl>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {providers.length === 0 ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Modèles indisponibles</DropdownMenuLabel>
          </DropdownMenuGroup>
        ) : null}
        {providers.map(provider => (
          <DropdownMenuGroup key={provider.slug}>
            <DropdownMenuLabel>{provider.name}</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={model} onValueChange={next => pick(next, provider.slug)}>
              {provider.models.slice(0, 24).map(next => (
                <DropdownMenuRadioItem key={`${provider.slug}:${next}`} value={next}>
                  {modelLabel(next)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuGroup>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Enter and Space on a div that acts as a tab. */
const press = (run: () => void) => (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    run()
  }
}
