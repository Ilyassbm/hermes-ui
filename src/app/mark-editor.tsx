// Change a bot's look: its shape, its eyes and its colour, with the result drawn big while you choose.
//
// The dialog edits a draft; nothing is saved until "Save", and "Back to automatic" saves the removal of the mark (the
// bot then takes its roster colour, or the one its name gives it). Opened from the rail's menu and from the panel's
// avatar, mounted only while open, so closing it takes the whole overlay with it.
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Button } from '@/components/glaze/ui/button'
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/glaze/ui/dialog'
import { Input } from '@/components/glaze/ui/input'
import { saveMark, store } from '@/lib/hermes'
import { autoLook, botLabel } from '@/lib/labels'
import { MARK_COLORS, MARK_EYES, MARK_SHAPES, normalizeHex, sanitizeMark, type Look, type Mark } from '@/lib/mark'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { closeMarkEditor, view } from './ui-state'
import { UI } from './strings'

const titleCase = (id: string) => id.charAt(0).toUpperCase() + id.slice(1)

export function MarkEditor() {
  const name = useStore(view, s => s.markEditor)
  if (!name) return null
  return <Editor key={name} name={name} />
}

function Editor({ name }: { key?: string; name: string }) {
  const bots = useStore(store, s => s.bots)
  const bot = bots.find(b => b.name === name)
  const label = botLabel(bot || name)
  // The draft starts from what is saved; a field left unset stays the bot's automatic one.
  const [draft, setDraft] = useState<Mark>(() => sanitizeMark(bot?.mark))
  const [hex, setHex] = useState('')
  const [saving, setSaving] = useState(false)
  useEffect(() => {
    setHex(draft.color && !MARK_COLORS.some(c => c.hex === draft.color) ? draft.color : '')
  }, [draft.color])

  // What a field left on "Auto" becomes: the look the bot has with no mark of its own.
  const auto = useMemo(() => autoLook(name) as Look, [name, bot?.color, bot?.shape])
  const shown: Look = { shape: draft.shape || auto.shape, eyes: draft.eyes || auto.eyes, color: draft.color || auto.color }

  const set = (patch: Partial<Mark>) => setDraft(current => ({ ...current, ...patch }))
  const unset = (field: keyof Mark) =>
    setDraft(current => {
      const next = { ...current }
      delete next[field]
      return next
    })
  const shuffle = () => {
    const pick = <T,>(list: readonly T[]) => list[Math.floor(Math.random() * list.length)]
    setDraft({ shape: pick(MARK_SHAPES), eyes: pick(MARK_EYES), color: pick(MARK_COLORS.filter(c => c.id !== 'slate' && c.id !== 'white')).hex })
  }
  const commit = async (next: Mark | null) => {
    if (saving) return
    setSaving(true)
    const ok = await saveMark(name, next)
    setSaving(false)
    if (ok) closeMarkEditor()
  }
  const custom = normalizeHex(hex)
  const draftIsEmpty = !draft.shape && !draft.eyes && !draft.color

  return (
    <Dialog open onOpenChange={next => { if (!next) closeMarkEditor() }}>
      <DialogContent showCloseButton={false} className="hui-mark-editor">
        <DialogHeader>
          <DialogTitle>{UI.mark.title}</DialogTitle>
          <DialogDescription>{UI.mark.preview(label)}</DialogDescription>
        </DialogHeader>

        <DialogBody className="hui-mark-form">
        <div className="hui-mark-stage">
          <BotAvatar look={shown} size={88} label={UI.mark.preview(label)} />
          <Button variant="ghost" size="sm" onClick={shuffle} disabled={saving}>
            {UI.mark.shuffle}
          </Button>
        </div>

        <fieldset className="hui-mark-group" aria-label={UI.mark.shape}>
          <legend>{UI.mark.shape}</legend>
          <div className="hui-mark-grid">
            <Cell on={!draft.shape} aria-label={`${UI.mark.shape}: ${UI.mark.auto}`} onPick={() => unset('shape')} auto>
              {UI.mark.auto}
            </Cell>
            {MARK_SHAPES.map(shape => (
              <Cell key={shape} on={draft.shape === shape} aria-label={UI.mark.shapeOption(titleCase(shape))} onPick={() => set({ shape })}>
                <BotAvatar look={{ ...shown, shape }} size={30} label="" />
              </Cell>
            ))}
          </div>
        </fieldset>

        <fieldset className="hui-mark-group" aria-label={UI.mark.eyes}>
          <legend>{UI.mark.eyes}</legend>
          <div className="hui-mark-grid">
            <Cell on={!draft.eyes} aria-label={`${UI.mark.eyes}: ${UI.mark.auto}`} onPick={() => unset('eyes')} auto>
              {UI.mark.auto}
            </Cell>
            {MARK_EYES.map(eyes => (
              <Cell key={eyes} on={draft.eyes === eyes} aria-label={UI.mark.eyesOption(titleCase(eyes))} onPick={() => set({ eyes })}>
                <BotAvatar look={{ ...shown, eyes }} size={30} label="" />
              </Cell>
            ))}
          </div>
        </fieldset>

        <fieldset className="hui-mark-group" aria-label={UI.mark.color}>
          <legend>{UI.mark.color}</legend>
          <div className="hui-mark-swatches">
            <Cell on={!draft.color} aria-label={`${UI.mark.color}: ${UI.mark.auto}`} onPick={() => unset('color')} auto round>
              {UI.mark.auto}
            </Cell>
            {MARK_COLORS.map(color => (
              <Cell key={color.id} on={draft.color === color.hex} aria-label={UI.mark.colorOption(color.name)} onPick={() => set({ color: color.hex })} round>
                <span className="hui-mark-swatch" style={{ '--swatch': color.hex } as CSSProperties} />
              </Cell>
            ))}
          </div>
          <Input
            size="sm"
            value={hex}
            placeholder="#rrggbb"
            aria-label={UI.mark.custom}
            onChange={event => {
              setHex(event.target.value)
              const next = normalizeHex(event.target.value)
              if (next) set({ color: next })
            }}
            aria-invalid={hex.trim() !== '' && !custom ? true : undefined}
          />
        </fieldset>
        </DialogBody>

        <DialogFooter defaultAction="dismiss">
          <Button variant="ghost" size="sm" onClick={() => void commit(null)} disabled={saving || (!bot || Object.keys(sanitizeMark(bot.mark)).length === 0)}>
            {UI.mark.reset}
          </Button>
          <Button variant="ghost" size="sm" onClick={closeMarkEditor} disabled={saving}>
            {UI.mark.cancel}
          </Button>
          <Button size="sm" onClick={() => void commit(draftIsEmpty ? null : draft)} disabled={saving} data-hui-part="mark-save">
            {UI.mark.save}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Cell({
  on,
  auto = false,
  round = false,
  onPick,
  children,
  ...rest
}: {
  key?: string
  on: boolean
  auto?: boolean
  round?: boolean
  onPick: () => void
  children: ReactNode
  'aria-label': string
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`hui-mark-cell${auto ? ' is-auto' : ''}${round ? ' is-round' : ''}`}
      aria-pressed={on}
      data-on={on || undefined}
      onClick={onPick}
      {...rest}
    >
      {children}
    </Button>
  )
}
