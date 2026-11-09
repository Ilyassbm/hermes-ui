// One assistant turn: what the bot is doing, what it called, then what it answered.
//
// The order is Glaze's fixed one — reasoning, tool calls, the answer, the footer — and every section but the answer is
// optional. The turn owns its own tool-call list: the store appends the actions (`tool-events`), this component replays
// them through Glaze's reducer, so a finished call folds away without a state machine of its own.
import { useEffect, useReducer, useRef } from 'react'
import { Activity } from '@/components/glaze/ai/activity'
import { AgentTurn, MessageFooter } from '@/components/glaze/ai/message'
import { ToolCallList, toolCallsReducer, type ToolCallData } from '@/components/glaze/ai/tool-call'
import { Button } from '@/components/glaze/ui/button'
import { CopyButton } from '@/components/glaze/ui/copy-button'
import { humanDuration, modelLabel } from '@/lib/labels'
import { replyApproval, store } from '@/lib/hermes'
import { useStore } from '@/lib/store'
import { settings } from '../settings-state'
import { UI } from '../strings'
import { IUI_TAGS } from '../iui/block'
import { BotAvatar } from '../bot-avatar'
import { MessageText } from './media'
import { Thinking } from './thinking'
import { emptyCalls, turnReducer, type ToolAction } from './tool-events'
import { TOOL_LABELS } from './tools'

const reduce = (state: ReturnType<typeof emptyCalls>, action: ToolAction) => turnReducer(state, action, toolCallsReducer)

/**
 * Replays the turn's actions into Glaze's reducer once, then applies the ones that arrive while it streams. The list is
 * append-only for the life of the turn, so the number already applied is the whole of the bookkeeping.
 */
function useTurnCalls(actions: readonly ToolAction[]): ToolCallData[] {
  const [state, dispatch] = useReducer(reduce, actions, list => list.reduce(reduce, emptyCalls()))
  const applied = useRef(actions.length)
  useEffect(() => {
    for (; applied.current < actions.length; applied.current++) dispatch(actions[applied.current])
  }, [actions])
  return state.calls
}

type TurnProps = {
  key?: string
  message: any
  name: string
  identity: { colors: [string, string]; shape: any }
}

export function AssistantTurn({ message, name, identity }: TurnProps) {
  const calls = useTurnCalls(message.toolActions || [])
  const approval = useStore(store, s => s.approval)
  // Settings ▸ Chat: the activity line can be turned off; the reasoning, the calls and the answer stay.
  const activity = useStore(settings, s => s.activity)
  const streaming = message.status === 'streaming'
  const failed = message.status === 'failed'
  const reasoning = typeof message.reasoning === 'string' ? message.reasoning : ''
  const text = typeof message.text === 'string' ? message.text : ''
  // Before the first token: a bot that has started but said nothing yet. As soon as reasoning, a call or a word lands,
  // the turn says what it is doing itself, so the line goes.
  const waiting = streaming && !text && !reasoning && calls.length === 0
  const thinking = message.thinkStart && message.thinkEnd ? Math.max(0, (message.thinkEnd - message.thinkStart) / 1000) : undefined

  return (
    <AgentTurn
      name={name}
      time={undefined}
      state={failed ? 'fail' : streaming ? 'live' : 'done'}
      data-turn={message.id}
    >
      {/* The speaker, quietly: the avatar, the name, and the model that answered. */}
      <div className="flex min-h-(--control-sm) min-w-0 items-center gap-2">
        <BotAvatar size={20} colors={identity.colors} shape={identity.shape} label={name} hoverGiggle={false} />
        <span className="truncate type-label-sm text-text-1">{name}</span>
        {message.model ? (
          <span data-hui-part="turn-model" title={message.model} className="truncate type-caption text-text-3">
            {modelLabel(message.model)}
          </span>
        ) : null}
      </div>

      {waiting && activity ? <Activity waiting announce={false} label={UI.turn.thinking(name)} className="py-1" /> : null}

      {reasoning ? (
        <Thinking
          id={String(message.id ?? '')}
          text={reasoning}
          streaming={streaming && !text}
          duration={thinking}
          labels={{ thinking: UI.turn.reasoning.thinking, thoughtFor: time => UI.turn.reasoning.thoughtFor(humanDuration(time)), moment: UI.turn.reasoning.moment, stoppedEarly: UI.turn.reasoning.stoppedEarly }}
        />
      ) : null}

      {calls.length ? (
        <ToolCallList
          calls={calls}
          live={streaming}
          labels={TOOL_LABELS}
          actions={call =>
            call.status === 'awaiting-permission' && approval?.allowPermanent !== false ? (
              <>
                {/* The third answer: this command, from now on. Flat, beside the one green Allow. */}
                <Button size="sm" variant="secondary" onClick={() => replyApproval(call.id, 'once', true)}>
                  {UI.turn.always}
                </Button>
                <Button size="sm" variant="secondary" onClick={() => replyApproval(call.id, 'reject')}>
                  {UI.turn.refuse}
                </Button>
                <Button size="sm" variant="confirm" onClick={() => replyApproval(call.id, 'once')}>
                  {UI.turn.allow}
                </Button>
              </>
            ) : approval && call.status === 'awaiting-permission' ? (
              <>
                <Button size="sm" variant="secondary" onClick={() => replyApproval(call.id, 'reject')}>
                  {UI.turn.refuse}
                </Button>
                <Button size="sm" variant="confirm" onClick={() => replyApproval(call.id, 'once')}>
                  {UI.turn.allow}
                </Button>
              </>
            ) : null
          }
        />
      ) : null}

      {text ? <MessageText text={text} streaming={streaming} tags={IUI_TAGS} /> : null}

      {text && !streaming ? (
        <MessageFooter>
          <CopyButton value={text} label={UI.turn.copyResponse} />
        </MessageFooter>
      ) : null}
    </AgentTurn>
  )
}
