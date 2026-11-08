// The centre's header: the open bot's conversations as tabs on the left, the model picker and the panel's toggle on
// the right. 38px, no rule, no fill: the paper of the sheet shows through, and the row sits on the same line as the
// rail's top bar.
//
// The tabs are the bot itself, the three most recent conversations (the open one is always there, even older), the way
// into the full list, and a new conversation. The model picker that used to hang off the composer lives here now, with
// one group for the effort and one group per provider for its models.
import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
import { EFFORTS, effortLabel, loadCatalog, MODEL_MENU_TOP, topModels, type Provider } from './models'
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
            {/* Glaze's Button in the render slot: a real <button>, where a `div role="button"` opened the menu on a
                keypress but let the click's mouseup close it again (lot 7). */}
            <DropdownMenuTrigger
              openOnHover={false}
              render={<Button variant="ghost" size="icon-sm" className="hui-icon-btn hui-tab-list" aria-label="Toutes les conversations" />}
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
  const button = useRef<HTMLButtonElement | null>(null)
  const measured = useRef(false)
  // A press on the button while the menu is open closes the menu (Base UI's outside press) and the click that follows
  // would open it again: the flag lets that click land on a closed menu instead of toggling it back on.
  const pressedWhileOpen = useRef(false)
  // `/model` (and the model shortcut) asks the header to open this menu.
  const asked = useStore(view, s => s.modelMenu)

  // The catalogue is asked for when the header mounts, not when the menu opens: a first open that also waits on the
  // gateway would be a second reason for the menu to arrive after the click.
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

  // `localStorage['hui:perf']` times the first open (dev only, nothing to see otherwise): a mark when the button takes
  // the click, a measure once React has put the menu in the DOM.
  useLayoutEffect(() => {
    if (!open || measured.current || !perfOn()) return
    measured.current = true
    try {
      performance.measure('hui:model-menu', 'hui:model-menu:open')
      const entry = performance.getEntriesByName('hui:model-menu').pop()
      console.info(`[hui:perf] sélecteur de modèle, premier rendu ouvert : ${Math.round(entry?.duration ?? 0)} ms`)
    } catch {
      /* the mark was cleared, or the browser keeps no entries: the timing is a development aid, not a feature */
    }
  }, [open])

  /**
   * The menu opens on the click alone. Base UI's trigger opens on the press; when the first render ran long, the
   * release that followed arrived on an open menu and closed it (lot 8). A controlled menu with no trigger at all has
   * no press-and-release to lose that race — the technique the bot context menus took in lot 7.
   */
  const show = () => {
    if (perfOn()) performance.mark('hui:model-menu:open')
    setOpen(true)
  }

  const toggle = () => {
    if (open) setOpen(false)
    else show()
  }

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
    <>
      {/* A plain Glaze Button, not a `DropdownMenuTrigger`: see `show` above. It keeps the menu's keyboard contract
          itself — aria-haspopup/-expanded, Enter, Space and ArrowDown open, and the menu hands focus back here. */}
      <Button
        ref={button}
        variant="ghost"
        size="sm"
        className="hui-model-trigger"
        aria-label={`Modèle et effort, ${trigger}`}
        aria-haspopup="menu"
        aria-expanded={open}
        onPointerDown={() => {
          pressedWhileOpen.current = open
        }}
        onClick={() => {
          if (pressedWhileOpen.current) {
            pressedWhileOpen.current = false
            setOpen(false)
            return
          }
          toggle()
        }}
        onKeyDown={event => {
          if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'ArrowDown') return
          event.preventDefault()
          if (!open) show()
        }}
      >
        <span>{trigger}</span>
        <Icon icon={ChevronDown} size={12} />
      </Button>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuContent
          anchor={button as any}
          finalFocus={button}
          align="end"
          side="bottom"
          size="sm"
          className="hui-model-menu"
        >
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
              {/* `topModels`: the current model, then the provider's own order, never more than MODEL_MENU_TOP rows
                  (the first render has to stay light enough for the click that opened it). */}
              <DropdownMenuRadioGroup value={model} onValueChange={next => pick(next, provider.slug)}>
                {topModels(provider, model).map(next => (
                  <DropdownMenuRadioItem key={`${provider.slug}:${next}`} value={next}>
                    {modelLabel(next)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              {provider.models.length > MODEL_MENU_TOP ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{`Tous les modèles ${provider.name}…`}</DropdownMenuSubTrigger>
                  {/* `AllModels` mounts with the submenu, so the rest of the catalogue is listed — and filtered —
                      only once this level opens. */}
                  <DropdownMenuSubContent size="sm" className="hui-model-sub">
                    <AllModels provider={provider} model={model} onPick={next => pick(next, provider.slug)} />
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ) : null}
            </DropdownMenuGroup>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

/** The whole catalogue of one provider, behind "Tous les modèles…": a filter field on top, then every model. */
function AllModels({ provider, model, onPick }: { provider: Provider; model: string; onPick: (next: string) => void }) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const shown = needle ? provider.models.filter(next => modelLabel(next).toLowerCase().includes(needle)) : provider.models
  return (
    <>
      <div className="hui-model-filter">
        <Input
          mode="search"
          size="sm"
          autoFocus
          value={query}
          placeholder={`Filtrer les modèles ${provider.name}`}
          aria-label={`Filtrer les modèles ${provider.name}`}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />
      </div>
      <DropdownMenuRadioGroup value={model} onValueChange={onPick}>
        {shown.map(next => (
          <DropdownMenuRadioItem key={next} value={next}>
            {modelLabel(next)}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
      {!shown.length ? <p className="hui-conv-empty">Aucun modèle</p> : null}
    </>
  )
}

/** `localStorage['hui:perf']` (any value) turns on the model picker's first-open timing; nothing is measured without it. */
function perfOn(): boolean {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem('hui:perf') !== null
  } catch {
    return false
  }
}

/** Enter and Space on a div that acts as a tab. */
const press = (run: () => void) => (event: { key: string; preventDefault: () => void }) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    run()
  }
}
