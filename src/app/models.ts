// The model list, read once per page from the gateway and shared by the header's picker and the composer's commands.
//
// `model.options` answers `{providers:[{slug, name, models[]}]}`; a provider with no models is dropped, so the menu
// never shows an empty group. The request is memoised: opening the picker twice asks the gateway once.
import { host } from '@hermes/plugin-sdk'
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
 * first, then the profile's own default. `chooseModel` writes the preference only once the session took the choice,
 * so this value moves on success and stays put on a refusal.
 */
export function chosenModel(prefs?: { model?: string } | null, meta?: { model?: string } | null): string {
  return prefs?.model || meta?.model || ''
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

let catalog: Provider[] | null = null
let loading: Promise<Provider[]> | null = null

/** The models the gateway offers, read once per page. */
export function loadCatalog(): Promise<Provider[]> {
  if (catalog) return Promise.resolve(catalog)
  if (!loading) {
    loading = host
      .request('model.options', {})
      .then((res: any) => {
        catalog = (Array.isArray(res?.providers) ? res.providers : []).filter(
          // A provider with no model is dropped: an empty group is noise. A provider the gateway is not authenticated
          // for is kept (1.5.4): the picker names it with "Key missing" and disables its rows, which says more than a
          // provider that silently vanishes — `providerReady` is the one door for "can this apply".
          (p: Provider) => p && Array.isArray(p.models) && p.models.length
        )
        return catalog as Provider[]
      })
      .catch(() => {
        catalog = []
        return [] as Provider[]
      })
  }
  return loading
}
