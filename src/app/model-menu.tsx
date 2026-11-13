// The model picker, at the foot of the composer: the provider's mark, the model's short name, the effort — and the
// menu it opens, one group per provider with its own mark, at most MODEL_MENU_TOP models each, the whole catalogue
// behind "All … models…" with a filter, and the effort control at the top.
//
// Lot 14 moved it here from the centre's header (which keeps the title, the conversation tabs and the panel's toggle).
// The interaction is lot 9's, unchanged: the button is a plain Glaze Button, not a Base UI trigger, and the menu is
// controlled — a press on the button closes the menu as an outside press, and the click that follows must close it
// rather than open it again. `/model` and the model shortcut still ask the menu open through `view.modelMenu`.
//
// 1.5.3: a row is a *switch*, not a preference. `chooseModel` runs the same `/model … --provider …` the next turn
// used to run, at the click, and the trigger only names a model the session took — so a refused switch is visible
// instead of looking like a click that did nothing, and a press on the portalled submenu no longer closes the menu
// out from under the row that was clicked.
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
import { chooseModel, prefsFor, savePrefs, store } from '@/lib/hermes'
import { modelLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { chosenModel, EFFORTS, effortLabel, foldSearch, loadCatalog, MODEL_MENU_TOP, providerReady, searchModels, topModels, type ModelHit, type Provider } from './models'
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
  // on the model a send would really use. It only moves once the session took the choice (`chooseModel`).
  const model = chosenModel(prefs, meta)
  const effort = prefs.effort || 'medium'
  const label = model ? modelLabel(model) : UI.header.model
  const [providers, setProviders] = useState<Provider[]>([])
  const [open, setOpen] = useState(false)
  // A choice is on its way to the session: a second click would send a second `/model`, so the menu waits.
  const [applying, setApplying] = useState(false)
  // The search at the top of the menu: typing replaces the provider groups with one flat list of hits.
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const search = useRef<HTMLInputElement | null>(null)
  const hits = searchModels(providers, query)
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

  // The field takes the cursor when the menu opens, and typing starts there: the point of the search is that a model
  // can be named without opening a submenu first. A fresh query starts on its first hit.
  useEffect(() => {
    if (!open) return undefined
    setQuery('')
    setActive(0)
    const timer = setTimeout(() => search.current?.focus(), 0)
    return () => clearTimeout(timer)
  }, [open])

  useEffect(() => {
    setActive(0)
  }, [query])

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
      // The submenu is portalled, so a press on one of its rows reaches Base UI as an outside press and the whole
      // menu closed on the pointerdown, before the click that chose the model could land. A press inside either
      // popup is ours: the menu stays, and the row's own click does the work.
      if (target instanceof Element && target.closest('.hui-model-menu, .hui-model-sub')) return
      if (target instanceof Node && button.current?.contains(target)) {
        pressedWhileOpen.current = true
        pressedAt.current = Date.now()
      }
    }
    setOpen(next)
  }

  /**
   * A model chosen at either level of the menu. The session is told now, with the same command the next turn would
   * have run (`chooseModel`), and the trigger only moves once it took it: a click that the gateway refused leaves the
   * menu on the model the conversation really runs, and says so.
   */
  const pick = async (next: string, provider: string) => {
    if (!bot || applying) return
    setApplying(true)
    const ok = await chooseModel(bot, next, provider)
    setApplying(false)
    if (ok) setOpen(false)
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
        data-ui-tooltip="hui-tip-model"
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
            DeepSeek served by OpenCode Go is billed and rate-limited by OpenCode Go. The composer draws the trigger
            as the reference's small print (the name and the effort, 13px); the mark stays in the DOM for the narrow
            composer, where the name would not fit and the mark is the only thing left to press (shell.css). */}
        <ProviderLogo provider={logoFor(prefs.provider || meta?.provider || model)} size={16} className="hui-model-logo" />
        <span className="hui-model-name">{label}</span>
        <span className="hui-model-effort-tag">{`· ${effortShort(effort)}`}</span>
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
          {/* A model named outright, from any provider. The field keeps the cursor and the keys: the menu's own
              arrow navigation stops at this field (`stopPropagation`), so typing never closes the menu or moves a
              highlight that is not the one below the list. */}
          <div className="px-1 pb-1">
            <Input
              ref={search}
              mode="search"
              size="sm"
              autoFocus
              data-hui-part="model-search"
              value={query}
              placeholder={UI.model.searchPlaceholder}
              aria-label={UI.model.searchLabel}
              // The field is the list's own combobox: the rows below are what it addresses, and the highlighted one is
              // the answer `Enter` sends.
              role="combobox"
              aria-expanded={Boolean(query.trim())}
              aria-autocomplete="list"
              aria-controls={query.trim() ? 'hui-model-hits' : undefined}
              aria-activedescendant={hits.length ? `hui-model-hit-${active}` : undefined}
              onChange={event => setQuery(event.target.value)}
              onKeyDown={event => {
                // Every key the menu would answer belongs to the field while the person is typing.
                event.stopPropagation()
                if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                  if (!hits.length) return
                  event.preventDefault()
                  setActive(current => (event.key === 'ArrowDown' ? (current + 1) % hits.length : (current - 1 + hits.length) % hits.length))
                  return
                }
                if (event.key === 'Enter') {
                  const hit = hits[active]
                  if (!hit) return
                  event.preventDefault()
                  void pick(hit.model, hit.provider.slug)
                  return
                }
                // The menu's Escape handler is upstream of this field; closing here keeps the one key one behaviour.
                if (event.key === 'Escape') {
                  event.preventDefault()
                  setOpen(false)
                }
              }}
            />
          </div>
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
          {query.trim() ? (
            <ModelHits hits={hits} active={active} onHover={setActive} onPick={hit => void pick(hit.model, hit.provider.slug)} />
          ) : null}
          {query.trim() ? null : providers.length === 0 ? (
            <DropdownMenuGroup>
              <DropdownMenuLabel>{UI.model.unavailable}</DropdownMenuLabel>
            </DropdownMenuGroup>
          ) : null}
          {query.trim() ? null : providers.map(provider => {
            // A provider the profile has no key for: its group stays (the person knows they use it) and says why, and
            // none of its rows is clickable — a row that cannot apply is the same lie as a trigger that never moves.
            const ready = providerReady(provider)
            return (
              <DropdownMenuGroup key={provider.slug}>
                <DropdownMenuLabel className="hui-model-provider">
                  <ProviderLogo provider={provider.slug} size={18} />
                  <span>{provider.name}</span>
                  {ready ? null : <span className="hui-model-provider-key">{UI.model.needsKey}</span>}
                </DropdownMenuLabel>
                {/* `topModels`: the current model, then the provider's own order, never more than MODEL_MENU_TOP rows
                    (the first render has to stay light enough for the click that opened it). */}
                <DropdownMenuRadioGroup value={model} onValueChange={next => ready && pick(next, provider.slug)}>
                  {topModels(provider, model).map(next => (
                    <DropdownMenuRadioItem key={`${provider.slug}:${next}`} value={next} disabled={!providerReady(provider)}>
                      {next === model ? <ProviderLogo provider={provider.slug} size={14} /> : null}
                      <span>{modelLabel(next)}</span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
                {ready && provider.models.length > MODEL_MENU_TOP ? (
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
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

/**
 * The whole catalogue of one provider, behind "All … models…": a filter field on top, then every model. Its own
 * filter stays its own (a provider at a time), folded the way the menu's search is: case and accents.
 */
function AllModels({ provider, model, onPick }: { provider: Provider; model: string; onPick: (next: string) => void }) {
  const [query, setQuery] = useState('')
  const needle = foldSearch(query)
  const shown = needle ? provider.models.filter(next => foldSearch(modelLabel(next)).includes(needle)) : provider.models
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

/**
 * The search's answers, every provider at once: the provider's mark, the model's name, and the provider's slug in the
 * small print. The highlighted row is the one `↓` / `↑` moved and `Enter` chooses; a pointer over a row highlights it
 * too, so the keyboard and the mouse always agree on what Enter would do. A query that matches nothing says so instead
 * of leaving an empty box under the field.
 */
export function ModelHits({
  hits,
  active,
  onHover,
  onPick
}: {
  hits: ModelHit[]
  active: number
  onHover: (index: number) => void
  onPick: (hit: ModelHit) => void
}) {
  if (!hits.length) {
    return (
      <p className="px-2 py-2 type-caption text-text-3" data-hui-part="model-no-hit">
        {UI.model.noModel}
      </p>
    )
  }
  // The listbox pattern, not a row of buttons: the cursor stays in the field above, which is what types, arrows and
  // Enter belong to. `aria-selected` is the row Enter would choose, and the pointer lights the same one.
  return (
    <div id="hui-model-hits" className="hui-model-hits" role="listbox" aria-label={UI.model.searchResults} data-hui-part="model-hits">
      {hits.map((hit, index) => (
        <div
          key={`${hit.provider.slug}:${hit.model}`}
          id={`hui-model-hit-${index}`}
          role="option"
          aria-selected={index === active}
          data-model-hit={`${hit.provider.slug}:${hit.model}`}
          data-model-provider={hit.provider.slug}
          data-active={index === active ? 'true' : undefined}
          className="hui-model-hit"
          // The press must not take the cursor out of the field: the row's click does the choosing.
          onPointerDown={event => event.preventDefault()}
          onMouseEnter={() => onHover(index)}
          onClick={() => onPick(hit)}
        >
          <ProviderLogo provider={hit.provider.slug} size={14} />
          <span className="hui-model-hit-name">{modelLabel(hit.model)}</span>
          <span className="hui-model-hit-provider">{hit.provider.slug}</span>
        </div>
      ))}
    </div>
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
