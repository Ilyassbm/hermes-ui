// The gateway's guard on a model switch, put in front of the person.
//
// `config.set` answers `confirm_required` + `confirm_message` for a switch that costs more, changes the data policy or
// drops the context cache. The message is the gateway's own sentence, shown as it came; "Switch" is the only thing that
// resends the request with `confirm_expensive_model: true`. Escape, the scrim and "Keep current" all decline. Mounted
// only while a question is pending, so closing it removes the whole overlay with the node.
import { answerConfirm, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { Button } from '@/components/glaze/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/glaze/ui/dialog'
import { UI } from './strings'

export function ModelConfirm() {
  const confirm = useStore(store, s => s.confirm)
  if (!confirm) return null
  const say = (accepted: boolean) => answerConfirm(confirm.id, accepted)
  return (
    <Dialog key={confirm.id} role="alertdialog" open onOpenChange={next => { if (!next) say(false) }}>
      <DialogContent showCloseButton={false} className="hui-confirm">
        <DialogHeader>
          <DialogTitle>{UI.model.confirmTitle}</DialogTitle>
          <DialogDescription>{confirm.text || UI.model.confirmFallback}</DialogDescription>
        </DialogHeader>
        <DialogFooter defaultAction="dismiss">
          <Button variant="ghost" size="sm" onClick={() => say(false)}>
            {UI.model.confirmKeep}
          </Button>
          <Button size="sm" onClick={() => say(true)} data-hui-part="model-confirm-switch">
            {UI.model.confirmSwitch}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
