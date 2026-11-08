'use client';

import * as React from 'react';
import {Icon, Microphone, MicrophoneOff} from '@/components/glaze/icon';
import {Button} from '@/components/glaze/ui/button';
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/glaze/ui/tooltip';
import {cn, mergeClass} from '@/lib/glaze/utils';

// Voice input, the action that sits in the composer's toolbar beside Send. It never records itself: it reports presses,
// and the caller owns the stream. It is a ghost icon Button, never glass: Send is the toolbar's one primary, so a
// listening mic shows its state as the pressed wash and three level bars, not as a second glass key.

type MicState = 'idle' | 'listening' | 'denied' | 'unsupported';

type PromptInputMicLabels = {
  /** The button's name in each state. */
  start?: string;
  stop?: string;
  blocked?: string;
  unavailable?: string;
  /** The tooltip in each state. A blocked or unavailable tip is also the button's description. */
  startTip?: string;
  stopTip?: string;
  blockedTip?: string;
  unavailableTip?: string;
};

const micLabels: Required<PromptInputMicLabels> = {
  start: 'Start voice input',
  stop: 'Stop voice input',
  blocked: 'Voice input blocked',
  unavailable: 'Voice input unavailable',
  startTip: 'Voice input',
  stopTip: 'Stop listening',
  blockedTip: 'Microphone access is blocked. Allow it in the browser\'s site settings, then press again.',
  unavailableTip: 'This browser can\'t record audio. Type your message instead.',
};
const micBars = [0.6, 1, 0.75];

type PromptInputMicProps = Omit<React.ComponentProps<typeof Button>, 'size' | 'variant' | 'children' | 'pending'> & {
  state?: MicState;
  /** Input level while listening, 0 to 1, from the caller's AnalyserNode. */
  level?: number;
  /** Called with true to start listening (from idle or denied) and false to stop. */
  onListeningChange?: (listening: boolean) => void;
  /** 26px in the composer; 32px or 36px elsewhere. */
  size?: 'sm' | 'default' | 'lg';
  /** Replaces the reason for denied or unsupported, when the product knows more. */
  reason?: string;
  /** Wraps the button in a tooltip. On by default. */
  tooltip?: boolean;
  /** The button's names and tips, for another language. */
  labels?: PromptInputMicLabels;
};

function PromptInputMic({state = 'idle', level = 0, onListeningChange, size = 'sm', reason, tooltip = true, labels, className, onClick, ...props}: PromptInputMicProps) {
  const words = {...micLabels, ...labels};
  const descriptionId = React.useId();
  const listening = state === 'listening';
  const blocked = state === 'denied' || state === 'unsupported';
  const name = {idle: words.start, listening: words.stop, denied: words.blocked, unsupported: words.unavailable}[state];
  const tip = blocked && reason ? reason : {idle: words.startTip, listening: words.stopTip, denied: words.blockedTip, unsupported: words.unavailableTip}[state];
  const clamped = Math.min(1, Math.max(0, Number.isFinite(level) ? level : 0));
  const glyph = size === 'lg' ? 16 : size === 'sm' ? 12 : 14;
  const button = <Button
    data-slot="prompt-input-mic"
    data-state={state}
    variant="ghost"
    size={size === 'sm' ? 'icon-sm' : size === 'lg' ? 'icon-lg' : 'icon'}
    aria-label={name}
    aria-pressed={state === 'unsupported' ? undefined : listening}
    aria-describedby={blocked ? descriptionId : undefined}
    disabled={state === 'unsupported'}
    focusableWhenDisabled={state === 'unsupported'}
    onClick={event => { onClick?.(event); if (!event.defaultPrevented && state !== 'unsupported') onListeningChange?.(!listening); }}
    className={mergeClass(cn('relative', listening && 'bg-pressed'), className)}
    {...props}
  >
    {listening
      ? <span aria-hidden data-slot="prompt-input-mic-level" className={cn('flex items-center justify-center gap-0.5', size === 'sm' ? 'size-3' : 'size-4')}>
          {micBars.map((peak, i) => <span
            key={i}
            // The bar's height follows the live input level, a value only known at run time.
            style={{'--live': `${(0.2 + 0.8 * clamped * peak) * 100}%`, '--rest': `${peak * 70}%`} as React.CSSProperties}
            className="h-(--live) w-0.5 rounded-pill bg-current transition-[height] duration-(--dur-state) ease-out motion-reduce:h-(--rest) motion-reduce:transition-none"
          />)}
        </span>
      : <Icon icon={blocked ? MicrophoneOff : Microphone} size={glyph}/>}
  </Button>;
  return <>
    {tooltip ? <Tooltip><TooltipTrigger render={button}/><TooltipContent>{tip}</TooltipContent></Tooltip> : button}
    {blocked && <span id={descriptionId} hidden>{tip}</span>}
  </>;
}

export {PromptInputMic, type PromptInputMicProps, type PromptInputMicLabels, type MicState};
