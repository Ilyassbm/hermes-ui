// The model list, read once per page from the gateway and shared by the header's picker and the composer's commands.
//
// `model.options` answers `{providers:[{slug, name, models[]}]}`; a provider with no models is dropped, so the menu
// never shows an empty group. The request is memoised: opening the picker twice asks the gateway once.
import { requestReady } from '../lib/hermes'
import { modelLabel } from '../lib/labels'

export type Provider = {
  slug: string
  name: string
  models: string[]
  is_current?: boolean
  /** The gateway's own flag: a provider whose key is missing answers `false` and has no model to offer. */
  authenticated?: boolean
}

/**
 * How many models the picker's first level shows per provider (lot 8). The rest waits behind "All … models…",
 * in a submenu whose list is only rendered once it opens: the first render used to lay out ~60 radio rows, block the
 * thread for 1.5 s, and the release of the click closed the menu it had just opened.
 */
export const MODEL_MENU_TOP = 8

/**
 * The rows the first level shows for one provider: the current model first — a check that is not on screen reads as
 * "nothing is chosen" — then the provider's own order (the gateway lists the recent and recommended ones first), at
 * most `MODEL_MENU_TOP` rows all told.
 */
export function topModels(provider: Provider, current: string): string[] {
  const head = provider.models.slice(0, MODEL_MENU_TOP)
  if (!current || head.includes(current) || !provider.models.includes(current)) return head
  return [current, ...provider.models.slice(0, MODEL_MENU_TOP - 1)]
}

/**
 * The model the picker's trigger names, and the model a click would really replace: the bot's stored preference
 * first, then the profile's own default, then the one its gateway reports (`catalogCurrent`) — the roster leaves the
 * default empty for a bot it does not serve. `chooseModel` writes the preference only once the session took the choice,
 * so this value moves on success and stays put on a refusal.
 */
export function chosenModel(
  prefs?: { model?: string } | null,
  meta?: { model?: string } | null,
  current?: { model?: string } | null
): string {
  return prefs?.model || meta?.model || current?.model || ''
}

/** One model the flat search lists, with the provider that serves it. */
export type ModelHit = { provider: Provider; model: string }

/** Case and accents folded away: "Créer", "creer" and "CREER" are the same search. */
export function foldSearch(value: unknown): string {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Whether the gateway can call this provider at all. `authenticated: false` is the gateway's own flag for "this profile
 * has no key here": every model of that provider is a click that cannot land. The catalogue keeps the group — the menu
 * names it, with "Key missing", instead of hiding a provider the person knows they use — and both the search and the
 * settings page leave it out.
 */
export function providerReady(provider: Provider): boolean {
  return provider.authenticated !== false
}

/**
 * What a typed search shows: one flat list, every provider at once. A model matches on its own label, and a provider
 * name matches everything it serves (typing "anthropic" lists Anthropic's models). An empty query answers no hits at
 * all — the menu then keeps its groups, which is the catalogue as it was. A provider without a key is never a hit: a
 * model that cannot be applied must not be offered.
 */
export function searchModels(providers: Provider[], query: string): ModelHit[] {
  const needle = foldSearch(query)
  if (!needle) return []
  const hits: ModelHit[] = []
  for (const provider of providers) {
    if (!providerReady(provider)) continue
    const wholeProvider = foldSearch(provider.name).includes(needle) || foldSearch(provider.slug).includes(needle)
    for (const model of provider.models) {
      if (wholeProvider || foldSearch(modelLabel(model)).includes(needle)) hits.push({ provider, model })
    }
  }
  return hits
}

/** The reasoning efforts the header offers, low to high. */
export const EFFORTS = [
  ['low', 'Low'],
  ['medium', 'Medium'],
  ['high', 'High']
] as const

const EFFORT_LABELS: Record<string, string> = { low: 'Low', medium: 'Medium', high: 'High' }

/** "Low", "Medium", "High". */
export function effortLabel(value?: string | null): string {
  if (!value) return ''
  return EFFORT_LABELS[value] || value
}

/** What the gateway says a profile runs right now: `model.options` answers it next to the providers. */
export type Current = { model: string; provider: string }

const catalogs = new Map<string, Provider[]>()
const currents = new Map<string, Current>()
const loading = new Map<string, Promise<Provider[]>>()

/**
 * The models one bot's gateway offers, read once per bot and per page.
 *
 * `model.options {profile}`: the providers a profile can call differ with its keys, so the catalogue is the bot's own,
 * never the first bot's. The same answer names the model the profile runs (`model`, `provider`), which the roster does
 * not for a profile the answering gateway does not serve (`profiles.list` sends `model: ''`): `catalogCurrent` hands it
 * to the trigger. A failure is not remembered — the picker would stay empty until the page was reloaded — and the
 * next ask goes to the gateway again.
 */
export function loadCatalog(profile = ''): Promise<Provider[]> {
  const key = profile || ''
  const known = catalogs.get(key)
  if (known) return Promise.resolve(known)
  const pending = loading.get(key)
  if (pending) return pending
  const ask = requestReady('model.options', key ? { profile: key } : {}, { long: Boolean(key), bot: key })
    .then((res: any) => {
      // A provider with no model is dropped: an empty group is noise. A provider the gateway is not authenticated
      // for is kept (1.5.4): the picker names it with "Key missing" and disables its rows, which says more than a
      // provider that silently vanishes — `providerReady` is the one door for "can this apply".
      const list = (Array.isArray(res?.providers) ? res.providers : []).filter(
        (p: Provider) => p && Array.isArray(p.models) && p.models.length
      ) as Provider[]
      catalogs.set(key, list)
      currents.set(key, { model: typeof res?.model === 'string' ? res.model : '', provider: typeof res?.provider === 'string' ? res.provider : '' })
      return list
    })
    .catch(() => [] as Provider[])
    .finally(() => {
      loading.delete(key)
    })
  loading.set(key, ask)
  return ask
}

/** The model the gateway reported for `profile` with its catalogue, or an empty answer before it has. */
export function catalogCurrent(profile = ''): Current {
  return currents.get(profile || '') || { model: '', provider: '' }
}
