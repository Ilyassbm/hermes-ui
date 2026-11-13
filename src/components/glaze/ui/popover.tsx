'use client';

import * as React from 'react';
import {Popover as PopoverPrimitive} from '@base-ui/react/popover';
import {useGlazePortal} from '@/lib/glaze/portal';
import {overlayEndsNow, overlayMotion, overlaySurface} from '@/lib/glaze/overlay';
import {cn, mergeClass} from '@/lib/glaze/utils';

// Glaze's popover, on Base UI's Popover: a panel anchored to a control, for detail a row has no room to print in
// place — a menu that keeps its anchor's place on the page. Not a dialog: no scrim, no focus trap, the page stays live,
// and Escape or a press outside closes it.
//
// It is the overlay recipe (paper, the 1px --line ring, --radius-overlay, no shadow) with 12px of padding; content is
// the caller's, laid out by the caller. The entrance is the same overlay motion every menu takes, and the popup ends
// on duration 0 so a close is never held by a transition that had not started (lot 11).

const popoverClass = cn(
  overlaySurface,
  overlayMotion,
  overlayEndsNow,
  'flex w-72 max-w-(--available-width) flex-col p-3',
);

type PopoverContentProps = PopoverPrimitive.Popup.Props & {
  align?: PopoverPrimitive.Positioner.Props['align'];
  side?: PopoverPrimitive.Positioner.Props['side'];
  sideOffset?: number;
  alignOffset?: number;
  collisionPadding?: number;
};

function Popover(props: PopoverPrimitive.Root.Props & { key?: React.Key }) {
  return <PopoverPrimitive.Root data-hui-part="popover" {...props}/>;
}

/** The control a panel hangs from. `render` hands the button's props to the caller's own element. */
function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-hui-part="popover-trigger" {...props}/>;
}

function PopoverContent({className, align = 'start', side = 'bottom', sideOffset = 6, alignOffset = 0, collisionPadding = 8, ...props}: PopoverContentProps) {
  const container = useGlazePortal();
  return <PopoverPrimitive.Portal container={container ?? undefined}>
    <PopoverPrimitive.Positioner
      className="isolate z-(--z-overlay) outline-none"
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
    >
      <PopoverPrimitive.Popup data-hui-part="popover-content" className={mergeClass(popoverClass, className)} {...props}/>
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>;
}

export {Popover, PopoverTrigger, PopoverContent, type PopoverContentProps};
