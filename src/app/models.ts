// The model list, read once per page from the gateway and shared by the header's picker and the composer's commands.
//
// `model.options` answers `{providers:[{slug, name, models[]}]}`; a provider with no models is dropped, so the menu
// never shows an empty group. The request is memoised: opening the picker twice asks the gateway once.
import { host } from '@hermes/plugin-sdk'

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
          // A provider the gateway is not authenticated for lists models it cannot call: it is left out of the menu.
          (p: Provider) => p && p.authenticated !== false && Array.isArray(p.models) && p.models.length
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
