// The centre: the thread with the open bot, and a plain Glaze composer under it.
//
// This lot shows the finished turns (user bubble, agent turn with its answer); the streaming turn, the tools, the
// approvals and the full composer are lot 3. The floating pill at the top names the bot and stays over the thread as
// it scrolls; the one icon button on its right opens or closes the right panel.
import { useRef, type RefObject } from 'react'
import { Icon, Columns } from '@/components/glaze/icon'
import { Conversation, ConversationContent, ConversationProvider, ConversationViewport, useConversation } from '@/components/glaze/ai/conversation'
import { AgentTurn, Message, MessageBubble, MessageBubbleContent, MessageContent, MessageHeader, MessageTime } from '@/components/glaze/ai/message'
import { PromptInput, type PromptInputHandle } from '@/components/glaze/ai/prompt-input'
import { Response } from '@/components/glaze/ai/response'
import { Button } from '@/components/glaze/ui/button'
import { Chip, ChipGroup } from '@/components/glaze/ui/chip'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/glaze/ui/tooltip'
import { send, stop, store } from '@/lib/hermes'
import { botLabel, hourOf } from '@/lib/labels'
import { useStore } from '@/lib/store'
import { BotAvatar } from './bot-avatar'
import { botIdentity } from './format'
import { toggleAside, view } from './ui-state'

const SUGGESTIONS = ['Fais le point sur tes tâches', "Qu'as-tu produit aujourd'hui ?", 'Propose-moi la prochaine action']

type CenterProps = {
  ctx: any
  narrowRail: boolean
}

export function Center({ ctx, narrowRail }: CenterProps) {
  const messages = useStore(store, s => s.messages)
  const live = useStore(store, s => s.live)
  const sid = useStore(store, s => s.sid)
  const current = useStore(store, s => s.bot)
  const bots = useStore(store, s => s.bots)
  const ready = useStore(store, s => s.ready)
  const asideOpen = useStore(view, s => s.asideOpen)
  const railOpen = useStore(view, s => s.railOpen)
  const composer = useRef<PromptInputHandle | null>(null)

  const meta = bots.find(b => b.name === current)
  const name = botLabel(meta || current)
  const identity = botIdentity(current)
  const status = live ? 'streaming' : 'idle'
  const composerStatus = live ? 'streaming' : 'ready'

  return (
    <main className="relative my-2 me-2 flex min-h-0 min-w-0 flex-col overflow-hidden rounded-panel bg-paper">
      {/* The one control the centre keeps: the right panel's toggle. */}
      <div className="absolute end-3 top-3 z-(--z-raised) flex items-center gap-1">
        {narrowRail ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                render={<Button variant="ghost" size="icon-sm" aria-label="Afficher ou masquer la liste des bots" onClick={() => view.set({ railOpen: !railOpen })} />}
              >
                <Icon icon={Columns} size={14} />
              </TooltipTrigger>
              <TooltipContent>Afficher les bots</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              render={<Button variant="ghost" size="icon-sm" aria-label={asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'} onClick={() => toggleAside(ctx)} />}
            >
              <Icon icon={Columns} size={14} />
            </TooltipTrigger>
            <TooltipContent shortcut={['mod', 'alt', 'B']}>{asideOpen ? 'Masquer le panneau' : 'Afficher le panneau'}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <ConversationProvider status={status}>
        <Conversation className="min-h-0 flex-1">
          <ConversationViewport aria-label={`Conversation avec ${name}`} className="px-4">
            <ConversationContent className="mx-auto flex w-full max-w-measure flex-col gap-6 pb-6">
              {/* The bot, in a pill that stays over the thread: opaque, no shadow, one line. */}
              <div className="sticky top-3 z-(--z-raised) flex justify-center pt-1">
                <span className="inline-flex items-center gap-2 rounded-pill bg-shell px-3 py-1.5 type-label text-text-1">
                  <BotAvatar size={20} colors={identity.colors} shape={identity.shape} label={name} hoverGiggle={false} />
                  {name}
                </span>
              </div>

              {!ready ? (
                <p className="py-10 text-center type-body-sm text-text-3">Connexion à Hermes…</p>
              ) : messages.length ? (
                messages.map(m =>
                  m.role === 'user' ? (
                    <Message key={m.id} from="user">
                      <MessageContent>
                        <MessageHeader>
                          Ilyass
                          <MessageTime>{hourOf(m.at)}</MessageTime>
                        </MessageHeader>
                        <MessageBubble>
                          <MessageBubbleContent>{m.text}</MessageBubbleContent>
                        </MessageBubble>
                      </MessageContent>
                    </Message>
                  ) : (
                    <AgentTurn
                      key={m.id}
                      name={name}
                      time={hourOf(m.at)}
                      state={m.status === 'failed' ? 'fail' : m.status === 'streaming' ? 'live' : 'done'}
                    >
                      <Response streaming={m.status === 'streaming'}>{m.text}</Response>
                    </AgentTurn>
                  )
                )
              ) : (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <BotAvatar size={72} colors={identity.colors} shape={identity.shape} label={name} />
                  <h1 className="type-heading text-text-1">Que fait-on avec {name} ?</h1>
                  <ChipGroup aria-label="Suggestions">
                    {SUGGESTIONS.map(s => (
                      <Chip key={s} onClick={() => composer.current?.insert(s)}>
                        {s}
                      </Chip>
                    ))}
                  </ChipGroup>
                </div>
              )}
            </ConversationContent>
          </ConversationViewport>
        </Conversation>
        <Composer composer={composer} status={composerStatus} sid={sid} current={current} name={name} />
      </ConversationProvider>
    </main>
  )
}

/** The composer sits inside the provider so a send can snap the thread back to the end. */
function Composer({
  composer,
  status,
  sid,
  current,
  name
}: {
  composer: RefObject<PromptInputHandle | null>
  status: 'ready' | 'streaming'
  sid: string | null
  current: string | null
  name: string
}) {
  const { snap } = useConversation()
  return (
    <div className="px-4 pb-4">
      <div className="mx-auto w-full max-w-measure">
        <PromptInput
          ref={composer}
          status={status}
          generation={sid || undefined}
          draftKey={`hermes-ui-${current || 'default'}`}
          placeholder={`Écrire à ${name}`}
          onStop={() => void stop()}
          onSubmit={value => {
            void send(value.serialized || value.text)
            snap()
          }}
        />
      </div>
    </div>
  )
}
