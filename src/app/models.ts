// The model list, read once per page from the gateway and shared by the header's picker and the composer's commands.
//
// `model.options` answers `{providers:[{slug, name, models[]}]}`; a provider with no models is dropped, so the menu
// never shows an empty group. The request is memoised: opening the picker twice asks the gateway once.
import { host } from '@hermes/plugin-sdk'

export type Provider = { slug: string; name: string; models: string[]; is_current?: boolean }

/** The reasoning efforts the header offers, low to high. */
export const EFFORTS = [
  ['low', 'Bas'],
  ['medium', 'Moyen'],
  ['high', 'Élevé']
] as const

const EFFORT_LABELS: Record<string, string> = { low: 'Bas', medium: 'Moyen', high: 'Élevé' }

/** "Bas", "Moyen", "Élevé". */
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
