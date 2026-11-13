// Settings ▸ Plugins ▸ Hermes UI: the workspace's own preferences, drawn with the page's Glaze components.
//
// Registered from plugin.tsx with `ctx.registerSettingsPage({ id: 'settings', … })` — the SDK's door for a desktop
// plugin's page in Settings ▸ Plugins (apps/desktop/src/contrib/settings-pages.ts). The gear in the rail deep-links
// here with `pluginSettingsHref('hermes-ui', 'settings')`.
//
// Four sections, each a row per choice:
//   Appearance — theme, density, reading measure, animations;
//   Chat       — the current bot's default model and effort, the send key, the activity line;
//   Shortcuts  — the plugin's bindings with the combo the app really dispatches, and the native keybindings page;
//   About      — version, repository, licence, and what the plugin talks to on the network.
//
// Nothing here owns state: the form writes the same `settings` store (and the same `prefs` storage) the page and the
// composer read, so a change made here is already in force when the person goes back to the chat.
import { Fragment, useEffect, useMemo, useState, type ReactNode } from 'react'
import { Icon, External } from '@/components/glaze/icon'
import { Button } from '@/components/glaze/ui/button'
import { Kbd } from '@/components/glaze/ui/kbd'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/glaze/ui/select'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { Switch } from '@/components/glaze/ui/switch'
import { openExternal, prefsFor, savePrefs, store } from '@/lib/hermes'
import { botLabel, modelLabel } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { useGlazeStyle } from './glaze-style'
import { GlazePortalProvider } from '@/lib/glaze/portal'
import { comboOf } from './keys'
import { EFFORTS, loadCatalog, providerReady, type Provider } from './models'
import { openKeybindings } from './settings-link'
import { loadSettings, saveSettings, settings, type DensityChoice, type MeasureChoice, type MotionChoice, type SendKeyChoice, type ThemeChoice } from './settings-state'
import { UI } from './strings'
import pkg from '../../package.json'

const REPO = 'https://github.com/Ilyassbm/hermes-ui'

/** One option of a segmented choice: the stored value, then the words it shows. */
type Option = readonly [string, string]

const THEMES: Option[] = [
  ['system', UI.settings.themeSystem],
  ['dark', UI.settings.themeDark],
  ['light', UI.settings.themeLight]
]
const DENSITIES: Option[] = [
  ['comfortable', UI.settings.densityComfortable],
  ['compact', UI.settings.densityCompact]
]
const MEASURES: Option[] = [
  ['680', UI.settings.measureValue(680)],
  ['760', UI.settings.measureValue(760)],
  ['840', UI.settings.measureValue(840)],
  ['960', UI.settings.measureValue(960)]
]
const MOTIONS: Option[] = [
  ['on', UI.settings.animationsOn],
  ['reduced', UI.settings.animationsReduced]
]
const SEND_KEYS: Option[] = [
  ['enter', UI.settings.sendKeyEnter],
  ['mod+enter', UI.settings.sendKeyModEnter]
]

/** The plugin's bindings, in the order the page registers them. */
const SHORTCUTS: { id: string; label: string }[] = [
  { id: 'hermes-ui.newChatWithBot', label: UI.plugin.newWithBot },
  { id: 'hermes-ui.newConversation', label: UI.plugin.newConversation },
  { id: 'hermes-ui.search', label: UI.plugin.search },
  { id: 'hermes-ui.toggleAside', label: UI.plugin.toggleAside },
  ...Array.from({ length: 9 }, (_, i) => ({ id: `hermes-ui.bot${i + 1}`, label: UI.plugin.goToBot(i + 1) }))
]

/** One choice of an enum, in the small segmented control the settings rows use. */
function Choice({
  label,
  value,
  options,
  numbered = false,
  onChange
}: {
  label: string
  value: string
  options: Option[]
  /** The options print a number (a reading measure): tabular digits, marked for the UI linter. */
  numbered?: boolean
  onChange: (next: string) => void
}) {
  return (
    <SegmentedControl size="sm" value={value} onValueChange={onChange} aria-label={label}>
      {options.map(([option, text]) => (
        <Fragment key={option}>
          <SegmentedControlItem value={option}>
            {numbered ? <span className="data" data-ui-number="">{text}</span> : text}
          </SegmentedControlItem>
        </Fragment>
      ))}
    </SegmentedControl>
  )
}

function Row({ label, hint, control }: { label: string; hint?: string; control: ReactNode }) {
  return (
    <div className="hui-set-row">
      <div className="hui-set-text">
        <span className="hui-set-label">{label}</span>
        {hint ? <span className="hui-set-hint">{hint}</span> : null}
      </div>
      {control ? <div className="hui-set-control">{control}</div> : null}
    </div>
  )
}

export function SettingsPage({ ctx }: { ctx: any }) {
  useGlazeStyle()
  const current = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const prefs = useStore(settings, s => s)
  const [providers, setProviders] = useState<Provider[]>([])
  // The model and the effort live in `prefs` (plugin storage), not in this store: a bump re-reads them after a save.
  const [, setTick] = useState(0)

  // The page reads the stored object once; `prefs` is the live copy every control writes through `saveSettings`.
  useEffect(() => {
    loadSettings(ctx)
    void loadCatalog().then(setProviders)
  }, [ctx])

  const meta = bots.find(b => b.name === current)
  const name = botLabel(meta || current)
  const modelPrefs = prefsFor(current)
  const model = modelPrefs.model || ''
  const provider = modelPrefs.provider || ''
  const effort = modelPrefs.effort || 'medium'

  const models = useMemo(
    () => [
      { value: '__default', label: UI.settings.modelProfileDefault },
      // A provider without a key cannot be the default either: it would be a choice the gateway refuses at the first
      // turn (`providerReady`, the picker's own rule).
      ...providers.filter(providerReady).flatMap(p => p.models.map(m => ({ value: `${p.slug}:${m}`, label: `${modelLabel(m)} — ${p.name}` })))
    ],
    [providers]
  )

  const setModel = (value: string) => {
    if (!current) return
    if (!value || value === '__default') savePrefs(current, { model: '', provider: '' })
    else {
      const cut = value.indexOf(':')
      savePrefs(current, { provider: value.slice(0, cut), model: value.slice(cut + 1) })
    }
    // The rail reads its label through `info`: bump it so a mount of the chat page shows the new default at once.
    store.set(s => ({ info: { ...s.info } }))
    setTick(n => n + 1)
  }

  const setEffort = (value: string) => {
    if (!current) return
    savePrefs(current, { effort: value })
    store.set(s => ({ info: { ...s.info } }))
    setTick(n => n + 1)
  }

  return (
    <div className="glaze hui-set" data-theme={prefs.theme === 'light' ? 'light' : 'dark'} data-density={prefs.density}>
      {/* The page carries its own portal root: a Select's popup must land inside this .glaze, or it would wear the
          native Settings tokens instead of ours. */}
      <GlazePortalProvider>
        <div className="hui-set-inner">
        <header className="hui-set-head">
          <h1 className="hui-set-title">{UI.settings.title}</h1>
          <p className="hui-set-intro">{UI.settings.intro}</p>
        </header>

        <section className="hui-set-section" data-ui-stack="" aria-labelledby="hui-set-appearance">
          <h2 className="hui-set-h" id="hui-set-appearance">
            {UI.settings.appearance}
          </h2>
          <Row
            label={UI.settings.theme}
            control={<Choice label={UI.settings.theme} value={prefs.theme} options={THEMES} onChange={theme => saveSettings(ctx, { theme: theme as ThemeChoice })} />}
          />
          <Row
            label={UI.settings.density}
            control={<Choice label={UI.settings.density} value={prefs.density} options={DENSITIES} onChange={density => saveSettings(ctx, { density: density as DensityChoice })} />}
          />
          <Row
            label={UI.settings.measure}
            control={<Choice label={UI.settings.measure} value={String(prefs.measure)} options={MEASURES} numbered onChange={measure => saveSettings(ctx, { measure: Number(measure) as MeasureChoice })} />}
          />
          <Row
            label={UI.settings.animations}
            control={<Choice label={UI.settings.animations} value={prefs.motion} options={MOTIONS} onChange={motion => saveSettings(ctx, { motion: motion as MotionChoice })} />}
          />
        </section>

        <section className="hui-set-section" data-ui-stack="" aria-labelledby="hui-set-chat">
          <h2 className="hui-set-h" id="hui-set-chat">
            {UI.settings.chat}
          </h2>
          <Row label={UI.settings.chatDefaults(name)} hint={UI.settings.chatDefaultsHint} control={<span className="hui-set-value">{name}</span>} />
          <Row
            label={UI.settings.model}
            hint={UI.settings.modelHint}
            control={
              <Select items={models} value={model ? `${provider}:${model}` : '__default'} onValueChange={next => setModel(String(next ?? ''))}>
                <SelectTrigger size="sm" aria-label={UI.settings.model}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {models.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            }
          />
          <Row
            label={UI.settings.effort}
            control={
              <SegmentedControl size="sm" value={effort} onValueChange={setEffort} aria-label={UI.settings.effort}>
                {EFFORTS.map(([value, label]) => (
                  <SegmentedControlItem key={value} value={value}>
                    {label}
                  </SegmentedControlItem>
                ))}
              </SegmentedControl>
            }
          />
          <Row
            label={UI.settings.sendKey}
            hint={UI.settings.sendKeyHint}
            control={<Choice label={UI.settings.sendKey} value={prefs.sendKey} options={SEND_KEYS} onChange={sendKey => saveSettings(ctx, { sendKey: sendKey as SendKeyChoice })} />}
          />
          <Row
            label={UI.settings.activity}
            hint={UI.settings.activityHint}
            control={
              <Switch checked={prefs.activity} onCheckedChange={next => saveSettings(ctx, { activity: next === true })} aria-label={UI.settings.activity} />
            }
          />
        </section>

        <section className="hui-set-section" data-ui-stack="" aria-labelledby="hui-set-shortcuts">
          <h2 className="hui-set-h" id="hui-set-shortcuts">
            {UI.settings.shortcuts}
          </h2>
          <p className="hui-set-hint hui-set-hint-block">{UI.settings.shortcutsHint}</p>
          <div className="hui-set-keys">
            {SHORTCUTS.map(shortcut => (
              <div key={shortcut.id} className="hui-set-key-row">
                <span className="hui-set-label">{shortcut.label}</span>
                <Kbd keys={comboOf(shortcut.id)} />
              </div>
            ))}
          </div>
          <div className="hui-set-actions">
            <Button variant="secondary" size="sm" onClick={() => openKeybindings(ctx)}>
              {UI.settings.changeKeybindings}
            </Button>
          </div>
        </section>

        <section className="hui-set-section" data-ui-stack="" aria-labelledby="hui-set-about">
          <h2 className="hui-set-h" id="hui-set-about">
            {UI.settings.about}
          </h2>
          <Row label={UI.settings.version} control={<span className="hui-set-value" data-ui-number="">{pkg.version}</span>} />
          <Row
            label={UI.settings.repository}
            control={
              <Button variant="ghost" size="sm" onClick={() => openExternal(REPO)}>
                {UI.settings.openRepository}
                <Icon icon={External} size={12} />
              </Button>
            }
          />
          <Row label={UI.settings.license} control={<span className="hui-set-value">{UI.settings.licenseName}</span>} />
          <Row label={UI.settings.network} hint={UI.settings.networkBody} control={null} />
        </section>
        </div>
      </GlazePortalProvider>
    </div>
  )
}
