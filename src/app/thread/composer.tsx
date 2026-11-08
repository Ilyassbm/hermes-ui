// The composer: one Glaze PromptInput, anchored at the bottom of the sheet, as wide as the thread's reading measure.
//
// It is one surface, not a field in a box: PromptInput's own shell holds the editor, the paperclip, the model pill and
// Send. The model and the effort live in one menu behind the pill; both are remembered per bot and applied to the
// session by `applyPrefsToSession` right before the next prompt.
import { Fragment, useEffect, useState, type RefObject } from 'react'
import { host } from '@hermes/plugin-sdk'
import { PromptInput, PromptInputModel, type Attachment, type PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/glaze/ui/dropdown-menu'
import { SegmentedControl, SegmentedControlItem } from '@/components/glaze/ui/segmented-control'
import { shortModel } from '@/lib/labels'
import { prefsFor, savePrefs, send, stop, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'

const EFFORTS = [
  ['low', 'Bas'],
  ['medium', 'Moyen'],
  ['high', 'Élevé']
] as const

type Provider = { slug: string; name: string; models: string[]; is_current?: boolean }

let catalog: Provider[] | null = null
let loading: Promise<Provider[]> | null = null

/** The models the gateway offers, read once per page: the picker opens on the list it already has. */
function loadCatalog(): Promise<Provider[]> {
  if (catalog) return Promise.resolve(catalog)
  if (!loading) {
    loading = host
      .request('model.options', {})
      .then((res: any) => {
        catalog = (Array.isArray(res?.providers) ? res.providers : []).filter((p: Provider) => p && Array.isArray(p.models) && p.models.length)
        return catalog as Provider[]
      })
      .catch(() => {
        catalog = []
        return [] as Provider[]
      })
  }
  return loading
}

type Picked = { id: string; file: File; name: string; size: number }

type ComposerProps = {
  bot: string | null
  name: string
  input: RefObject<PromptInputHandle | null>
  /** The open conversation: its id is what moves the caret when another one opens. */
  sid?: string | null
  status: 'ready' | 'submitted' | 'streaming'
  generation?: string | number
  /** Runs once the prompt is handed to the gateway, so the thread can go back to its end. */
  onSent?: () => void
}

export function Composer({ bot, name, input, sid, status, generation, onSent }: ComposerProps) {
  const [files, setFiles] = useState<Picked[]>([])
  const [providers, setProviders] = useState<Provider[]>(catalog || [])
  // A preference change is written to storage, not to React: reading `info` back re-renders this menu.
  useStore(store, s => s.info)
  const prefs = prefsFor(bot)
  const meta = useStore(store, s => s.bots).find(b => b.name === bot)
  const model = prefs.model || meta?.model || ''
  const effort = prefs.effort || ''

  useEffect(() => {
    let alive = true
    void loadCatalog().then(list => {
      if (alive) setProviders(list)
    })
    return () => {
      alive = false
    }
  }, [])

  // The caret belongs in the editor when the conversation changes, and when the bot does.
  useEffect(() => {
    input.current?.focus()
  }, [bot, sid, input])

  const attachments: Attachment[] = files.map(f => ({ id: f.id, name: f.name, size: f.size, status: 'done' }))

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
    <div className="px-4 pb-4">
      <div className="mx-auto w-full max-w-measure">
        <PromptInput
          ref={input}
          label={`Écrire à ${name}`}
          placeholder={`Écris à ${name}…`}
          // One draft per thread: a draft written in one conversation is never carried into another.
          draftKey={`hermes-ui-${bot || 'default'}-${sid || 'new'}`}
          status={status}
          generation={generation}
          onStop={() => void stop()}
          attachments={attachments}
          onAttach={list =>
            setFiles(fs => [
              ...fs,
              ...list.map((file, i) => ({ id: `${Date.now().toString(36)}-${i}-${file.name}`, file, name: file.name, size: file.size }))
            ])
          }
          onRemoveAttachment={id => setFiles(fs => fs.filter(f => f.id !== id))}
          labels={{
            send: 'Envoyer',
            stop: 'Arrêter',
            stopping: 'Arrêt…',
            sendAgain: 'Renvoyer',
            attach: 'Joindre un fichier',
            drop: 'Déposer pour joindre',
            uploading: percent => `Envoi ${percent} %`,
            uploadFailed: 'Envoi impossible',
            attached: 'Joint',
            retryFile: fileName => `Réessayer ${fileName}`,
            cancelUpload: fileName => `Annuler l’envoi de ${fileName}`,
            removeFile: fileName => `Retirer ${fileName}`,
            attachments: 'Pièces jointes',
            removed: label => `${label} retiré`,
            textOnly: 'Ce champ prend du texte seulement',
            waiting: n => `En attente de ${n} envoi${n > 1 ? 's' : ''}`,
            held: n => `En attente de ${n} envoi${n > 1 ? 's' : ''}. Part dès qu’ils sont finis`,
            failed: names => `${names.join(', ')} : envoi impossible. Retire le fichier ou réessaie`
          }}
          onSubmit={value => {
            const list = files.map(f => f.file)
            setFiles([])
            void send(value.serialized || value.text, list)
            onSent?.()
          }}
          tools={
            <DropdownMenu>
              <DropdownMenuTrigger render={<PromptInputModel model={model ? shortModel(model) : 'Modèle'} aria-label="Modèle et effort" />} />
              <DropdownMenuContent align="start" side="top" size="sm" className="min-w-(--menu-min)">
                <DropdownMenuLabel>Effort de raisonnement</DropdownMenuLabel>
                <div className="px-2 pb-2">
                  <SegmentedControl size="sm" value={effort || 'medium'} onValueChange={pickEffort} aria-label="Effort de raisonnement">
                    {EFFORTS.map(([value, label]) => (
                      <Fragment key={value}>
                        <SegmentedControlItem value={value}>{label}</SegmentedControlItem>
                      </Fragment>
                    ))}
                  </SegmentedControl>
                </div>
                <DropdownMenuSeparator />
                {providers.length === 0 ? <DropdownMenuLabel>Modèles indisponibles</DropdownMenuLabel> : null}
                {providers.map(provider => (
                  <div key={provider.slug}>
                    <DropdownMenuLabel>{provider.name}</DropdownMenuLabel>
                    {provider.models.slice(0, 24).map(next => (
                      <DropdownMenuItem key={`${provider.slug}:${next}`} onClick={() => pick(next, provider.slug)}>
                        <span className="truncate">{shortModel(next)}</span>
                        {model === next ? <span className="ms-auto type-caption text-text-3">actuel</span> : null}
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          }
        />
      </div>
    </div>
  )
}
