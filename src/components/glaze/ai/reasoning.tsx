'use client';

import {Collapsible as CollapsiblePrimitive} from '@base-ui/react/collapsible';
import {createContext, useContext, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ActivityArc, ActivityText, Disclosure, rowVariants} from '@/components/glaze/ai/activity';
import {Status} from '@/components/glaze/ui/status';
import {useStickToBottom} from '@/components/glaze/ai/conversation';
import {Response} from '@/components/glaze/ai/response';
import {cn, mergeClass} from '@/lib/glaze/utils';

// The model's reasoning, as a disclosure above its answer. It opens on its own while the
// reasoning streams and folds when it ends, so the answer is what stays on screen. The person stays in
// charge:
// - Opening it after it folds pins it open, from the top.
// - Closing it while it streams keeps it closed until the next stream.
// - Reopening it while it streams pins it, so it no longer folds at the end.
//
// The label comes from the reasoning itself. While it streams the trigger reads "Thinking" and then the
// first heading of the newest reasoning part: an HTML or ATX
// heading, a setext heading, or a line that is all bold, cleaned of code ticks, links and emphasis.
// When it ends it reads "Thought for 12s".
//
// The body is paced streaming markdown (Response at the small size), in a pane 160px tall at most that
// follows new text with the thread's gesture-only model: scrolling up to reread lets go.
//
// It is the same line as a folded group of tool rows ("Worked for 14s"): 32px, the caret in the 16px leading cell, the
// label in text-2, the newest heading in text-3 and at the end the arc (with "Thinking" once a heading is the label)
// while it streams, so a turn's sections share one column. The row is flat, a wash under the pointer and never glass:
// opening it shows, it does not act. The body is reading, not output, so it sits on the page under the words in text-2,
// not in the well. It opens and folds with a cut.

/** 0 while the element's content overflows it, so Tab reaches a pane only a pointer could scroll; undefined while it fits. */
function useScrollTabStop(ref: React.RefObject<HTMLElement | null>, enabled = true): 0 | undefined {
  const [scrolls, setScrolls] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) { setScrolls(false); return; }
    const measure = () => setScrolls(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);
    const resize = new ResizeObserver(measure);
    const watch = () => { resize.disconnect(); resize.observe(el); for (const child of el.children) resize.observe(child); measure(); };
    const swap = new MutationObserver(watch);
    swap.observe(el, {childList: true});
    watch();
    return () => { resize.disconnect(); swap.disconnect(); };
  }, [ref, enabled]);
  return scrolls ? 0 : undefined;
}

/** The first heading in a reasoning part, cleaned to plain text, or undefined. */
function reasoningHeading(text: string): string | undefined {
  const html = text.match(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/i)?.[1];
  const atx = text.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/m)?.[1];
  const setext = text.match(/^(?!\s*$)([^\n]+)\n\s{0,3}(=+|-+)\s*$/m)?.[1];
  const bold = text.match(/^\s*(?:\*\*|__)([^*_\n]+)(?:\*\*|__)\s*$/m)?.[1];
  // The earliest one in the text wins.
  const found = [html, atx, setext, bold]
    .filter((h): h is string => !!h)
    .map(h => ({h, at: text.indexOf(h)}))
    .sort((a, b) => a.at - b.at)[0]?.h;
  if (!found) return undefined;
  const clean = found
    .replace(/<[^>]+>/g, '')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(\*\*|__|\*|_)(.+?)\1/g, '$2')
    .trim();
  return clean || undefined;
}

type ReasoningLabels = {
  /** The trigger while it streams, before a heading arrives, and the quiet word before the heading. */
  thinking?: string;
  /** The trigger when it ended before any reasoning arrived. */
  stoppedEarly?: string;
  /** The folded trigger, from the time spent: "12s", "1m 04s" or `moment`. */
  thoughtFor?: (time: string) => string;
  /** The time when it took under a second, or no duration was given. */
  moment?: string;
};

const reasoningLabels: Required<ReasoningLabels> = {thinking: 'Thinking', stoppedEarly: 'Stopped before thinking', thoughtFor: time => `Thought for ${time}`, moment: 'a moment'};

type ReasoningContextValue = {
  streaming: boolean;
  words: Required<ReasoningLabels>;
  open: boolean;
  duration?: number;
  heading?: string;
  text: string;
  /** The text came as string parts, not composed children. */
  parts: boolean;
  fromTop: React.RefObject<boolean>;
};

const ReasoningContext = createContext<ReasoningContextValue | null>(null);

function useReasoning() {
  const ctx = useContext(ReasoningContext);
  if (!ctx) throw new Error('Reasoning parts must be used inside <Reasoning>');
  return ctx;
}

/** Open while streaming, fold at the end unless pinned, and track what the person did. */
function useAutoOpen(streaming: boolean, defaultOpen: boolean) {
  const [open, setOpen] = useState(streaming || defaultOpen);
  const pinned = useRef(false);
  const fromTop = useRef(false);
  const wasStreaming = useRef(streaming);

  useEffect(() => {
    const was = wasStreaming.current;
    wasStreaming.current = streaming;
    if (streaming && !was) { pinned.current = false; setOpen(true); }
    else if (!streaming && was && !pinned.current) setOpen(false);
  }, [streaming]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    pinned.current = next;
    if (!streaming && next) fromTop.current = true;
  };
  return {open, onOpenChange, fromTop};
}

type ReasoningProps = Omit<CollapsiblePrimitive.Root.Props, 'open' | 'defaultOpen' | 'onOpenChange' | 'children'> & {
  /** Reasoning is arriving now. Opens the disclosure; ending folds it unless pinned. */
  streaming?: boolean;
  /** Seconds spent reasoning, for the folded label: "Thought for 12s". */
  duration?: number;
  /** Open on first render when not streaming. */
  defaultOpen?: boolean;
  /** Controlled open state. Turns off the automatic open and fold. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Overrides the heading taken from the text. */
  heading?: string;
  /** The trigger's words, for another language. */
  labels?: ReasoningLabels;
  /**
   * The reasoning: one string, or its parts (summaries arrive as several). The label takes the first
   * heading of the newest part. Pass parts to compose your own trigger and pane.
   */
  children?: string | string[] | React.ReactNode;
};

function Reasoning({streaming = false, duration, defaultOpen = false, open: openProp, onOpenChange: onOpenChangeProp, heading, labels, className, children, ...props}: ReasoningProps) {
  const words = {...reasoningLabels, ...labels};
  const auto = useAutoOpen(streaming, defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : auto.open;
  const parts = typeof children === 'string' ? [children] : Array.isArray(children) && children.every(c => typeof c === 'string') ? children as string[] : null;
  const text = parts ? parts.join('\n\n') : '';
  const label = heading ?? (parts ? reasoningHeading(parts.at(-1) ?? '') : undefined);
  const onOpenChange = (next: boolean) => {
    if (!controlled) auto.onOpenChange(next);
    onOpenChangeProp?.(next);
  };
  return <ReasoningContext.Provider value={{streaming, words, open, duration, heading: label, text, parts: !!parts, fromTop: auto.fromTop}}>
    <CollapsiblePrimitive.Root
      data-slot="reasoning"
      data-streaming={streaming || undefined}
      open={open}
      onOpenChange={next => onOpenChange(next)}
      className={mergeClass('group/reasoning @container/reasoning flex min-w-0 flex-col', className)}
      // Base UI marks an open root data-open, which a turn's section rules read as the selected row. An open
      // reasoning row is only open, so the root drops it.
      render={rootProps => {
        const {'data-open': _open, ...rest} = rootProps as typeof rootProps & {'data-open'?: string};
        return <div {...rest}/>;
      }}
      {...props}
    >
      {parts ? <><ReasoningTrigger/><ReasoningContent/></> : children as React.ReactNode}
    </CollapsiblePrimitive.Root>
  </ReasoningContext.Provider>;
}

/** 12s, 1m 04s. It rounds to the second before it splits, so 59.6s reads 1m 00s, never 60s or 1m 60s. */
function seconds(duration: number, moment: string) {
  if (!Number.isFinite(duration) || duration < 1) return moment;
  const s = Math.round(duration);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`;
}

type TriggerProps = CollapsiblePrimitive.Trigger.Props & {
  /** Replaces the label. */
  label?: (state: {streaming: boolean; duration?: number; heading?: string}) => React.ReactNode;
};

function ReasoningTrigger({className, label, children, ...props}: TriggerProps) {
  const {streaming, words, duration, heading, text: body, parts} = useReasoning();
  // Ended before any reasoning arrived: the turn was stopped, not thought through.
  const empty = parts && !body.trim();
  const text = label?.({streaming, duration, heading}) ?? (streaming ? (heading ?? words.thinking) : empty ? words.stoppedEarly : words.thoughtFor(duration === undefined ? words.moment : seconds(duration, words.moment)));
  return <CollapsiblePrimitive.Trigger
    data-slot="reasoning-trigger"
    className={mergeClass(rowVariants(), className)}
    {...props}
  >
    <Disclosure open/>
    {children ?? <>
      <ActivityText active={streaming} className={cn('max-w-full min-w-0 shrink-0 truncate text-text-2')}>{text}</ActivityText>
      {/* Folded, the newest heading follows the time spent; streaming, it is the label itself. */}
      <span data-slot="reasoning-heading" className="min-w-0 truncate text-text-2 empty:hidden">{!streaming && !label ? heading : null}</span>
      <span data-slot="reasoning-status" className="flex shrink-0 items-center justify-end whitespace-nowrap text-text-2">
        {/* The label already says "Thinking" until a heading replaces it; then the word returns beside the arc. */}
        {streaming && (heading ? <Status status="running" size="sm" className="text-text-2">{words.thinking}</Status> : <ActivityArc/>)}
      </span>
    </>}
  </CollapsiblePrimitive.Trigger>;
}

function ReasoningContent({className, children, ...props}: React.ComponentProps<'div'>) {
  const {streaming, open, fromTop, text} = useReasoning();
  const pane = useRef<HTMLDivElement>(null);
  // The pane mounts only when the panel opens, so it takes the hook's callback ref and is followed
  // from the moment it appears, not from the Reasoning's first render.
  const stick = useStickToBottom(pane, {enabled: streaming && open});
  // A tab stop while it scrolls, measured on every resize, so a keyboard reaches what is past its edge.
  const tabStop = useScrollTabStop(pane, open);

  useLayoutEffect(() => {
    const el = pane.current;
    if (!el || !open) return;
    if (fromTop.current && !streaming) { el.scrollTop = 0; fromTop.current = false; }
  }, [children, text, open, streaming, fromTop]);

  // The panel cuts open and closed: no height tween.
  return <CollapsiblePrimitive.Panel data-slot="reasoning-content">
    <div
      ref={stick.ref}
      data-slot="reasoning-content"
      data-attached={stick.attached}
      aria-busy={streaming || undefined}
      tabIndex={tabStop}
      className={cn(
        // No fade at the top: it scrolls with a thin scrollbar.
        'max-h-40 min-w-0 overflow-y-auto ps-6 pb-3 type-body-sm text-text-2',
        'focus-visible:focus-ring-inset',
        className,
      )}
      {...props}
    >{children ?? <Response size="sm" streaming={streaming} className="text-text-2">{text}</Response>}</div>
  </CollapsiblePrimitive.Panel>;
}

export {Reasoning, ReasoningTrigger, ReasoningContent, reasoningHeading, type ReasoningProps, type ReasoningLabels};
