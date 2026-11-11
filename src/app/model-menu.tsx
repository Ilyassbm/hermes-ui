// The model picker, at the foot of the composer: the provider's mark, the model's short name, the effort — and the
// menu it opens, one group per provider with its own mark, at most MODEL_MENU_TOP models each, the whole catalogue
// behind "All … models…" with a filter, and the effort control at the top.
//
// Lot 14 moved it here from the centre's header (which keeps the title, the conversation tabs and the panel's toggle).
// The interaction is lot 9's, unchanged: the button is a plain Glaze Button, not a Base UI trigger, and the menu is
// controlled — a press on the button closes the menu as an outside press, and the click that follows must close it
// rather than open it again. `/model` and the model shortcut still ask the menu open through `view.modelMenu`.
import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Icon, ChevronDown } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Input } from '@/components/glaze/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from '@/components/glaze/ui/dropdown-menu'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { prefsFor, savePrefs, store } from '@/lib/hermes'
import { modelLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { EFFORTS, effortLabel, loadCatalog, MODEL_MENU_TOP, topModels, type Provider } from './models'
import { ProviderLogo, logoFor } from './provider-logo'
import { UI } from './strings'
import { view } from './ui-state'

/** "Med" — the effort in the small print the trigger carries. */
const effortShort = (value?: string | null) => UI.model.effortShort[String(value || 'medium')] || effortLabel(value)

export function ModelMenu() {
  const bot = useStore(store, s => s.bot)
  // A preference change is written to storage, not to React: reading `info` back re-renders the trigger.
  useStore(store, s => s.info)
  const meta = useStore(store, s => s.bots).find(b => b.name === bot)
  const prefs = prefsFor(bot)
  // The same model the trigger names: the bot's preference first, then the profile's own default, so the check mark sits
  // on the model a send would really use.
  const model = prefs.model || meta?.model || ''
  const effort = prefs.effort || 'medium'
  const label = model ? modelLabel(model) : UI.header.model
  const [providers, setProviders] = useState<Provider[]>([])
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement | null>(null)
  const measured = useRef(false)

  // A press on this button is an outside press to Base UI: the button anchors the menu, it is not its
  // DropdownMenuTrigger, so the press closes the menu on pointerdown, before the click. The click that follows must
  // then leave the menu closed instead of opening it again. `onOpenChange` marks the press and the click spends the
  // mark, so the two events agree whatever order React flushes them in; the timestamp keeps a press that ended off the
  // button from swallowing the next real click (lot 9).
  const pressedWhileOpen = useRef(false)
  const pressedAt = useRef(0)
  // `/model` (and the model shortcut) asks the composer to open this menu.
  const asked = useStore(view, s => s.modelMenu)

  // The catalogue is asked for when the composer mounts, not when the menu opens: a first open that also waits on the
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
      console.info(`[hui:perf] model picker, first open render: ${Math.round(entry?.duration ?? 0)} ms`)
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

  /**
   * The menu's own open state, with the one thing the controlled menu must remember: a press on the button closes it
   * as an outside press, and the click that follows lands on the same button. Marking that press here is what lets the
   * click close instead of reopen.
   */
  const changeOpen = (next: boolean, details?: { reason?: string; event?: Event }) => {
    pressedWhileOpen.current = false
    if (!next && details?.reason === 'outside-press') {
      const target = details.event?.target
      if (target instanceof Node && button.current?.contains(target)) {
        pressedWhileOpen.current = true
        pressedAt.current = Date.now()
      }
    }
    setOpen(next)
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
        aria-label={UI.model.trigger(label, effortShort(effort))}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => {
          // The click of a press that closed the menu (see `changeOpen`) must not open it again.
          const fromThisPress = pressedWhileOpen.current && Date.now() - pressedAt.current < 1000
          pressedWhileOpen.current = false
          if (fromThisPress) {
            setOpen(false)
            return
          }
          toggle()
        }}
        onKeyDown={event => {
          if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'ArrowDown') return
          event.preventDefault()
          // Enter and Space on an open menu close it; the arrow keys only ever open.
          if (open) {
            if (event.key !== 'ArrowDown') setOpen(false)
            return
          }
          show()
        }}
      >
        {/* The mark of the house that serves the model — OpenCode Go, Anthropic — not of the family it runs: a
            DeepSeek served by OpenCode Go is billed and rate-limited by OpenCode Go. */}
        <ProviderLogo provider={logoFor(prefs.provider || meta?.provider || model)} size={16} className="hui-model-logo" />
        <span className="hui-model-name">{label}</span>{' '}
        <span className="hui-model-effort-tag">{effortShort(effort)}</span>
        <Icon icon={ChevronDown} size={12} />
      </Button>
      <DropdownMenu open={open} onOpenChange={changeOpen}>
        <DropdownMenuContent
          anchor={button as any}
          finalFocus={button}
          align="start"
          side="top"
          sideOffset={8}
          size="sm"
          className="hui-model-menu"
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel>{UI.header.effort}</DropdownMenuLabel>
            <div className="hui-model-effort" onKeyDown={e => e.stopPropagation()}>
              <SegmentedControl size="sm" value={effort} onValueChange={pickEffort} aria-label={UI.header.effortLabel}>
                {EFFORTS.map(([value, text]) => (
                  <Fragment key={value}>
                    <SegmentedControlItem value={value}>{text}</SegmentedControlItem>
                  </Fragment>
                ))}
              </SegmentedControl>
            </div>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {providers.length === 0 ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel>{UI.model.unavailable}</DropdownMenuLabel>
            </DropdownMenuGroup>
          ) : null}
          {providers.map(provider => (
            <DropdownMenuGroup key={provider.slug}>
              <DropdownMenuLabel className="hui-model-provider">
                <ProviderLogo provider={provider.slug} size={18} />
                <span>{provider.name}</span>
              </DropdownMenuLabel>
              {/* `topModels`: the current model, then the provider's own order, never more than MODEL_MENU_TOP rows
                  (the first render has to stay light enough for the click that opened it). */}
              <DropdownMenuRadioGroup value={model} onValueChange={next => pick(next, provider.slug)}>
                {topModels(provider, model).map(next => (
                  <DropdownMenuRadioItem key={`${provider.slug}:${next}`} value={next}>
                    {next === model ? <ProviderLogo provider={provider.slug} size={14} /> : null}
                    <span>{modelLabel(next)}</span>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
              {provider.models.length > MODEL_MENU_TOP ? (
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>{UI.model.allModels(provider.name)}</DropdownMenuSubTrigger>
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

/** The whole catalogue of one provider, behind "All … models…": a filter field on top, then every model. */
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
          placeholder={UI.model.filterModels(provider.name)}
          aria-label={UI.model.filterModels(provider.name)}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.stopPropagation()}
        />
      </div>
      <DropdownMenuRadioGroup value={model} onValueChange={onPick}>
        {shown.map(next => (
          <DropdownMenuRadioItem key={next} value={next}>
            {next === model ? <ProviderLogo provider={provider.slug} size={14} /> : null}
            <span>{modelLabel(next)}</span>
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
      {!shown.length ? <p className="hui-conv-empty">{UI.model.noModel}</p> : null}
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
