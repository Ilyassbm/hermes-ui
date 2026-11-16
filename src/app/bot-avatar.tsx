// The bot's mark: a flat body and two capsule eyes, drawn from `src/lib/mark.ts` — three words (shape, eyes, colour) and
// nothing else, so it is the same picture at 18 px in a tab and at 72 px on an empty thread, in both themes.
//
// The colour is the bot's identity, the one hue the page allows itself (everything else is a token); the eyes take the
// ink that reads on it. Motion is two small things, both off under reduced motion: a bot at work breathes and blinks,
// and a bot you point at looks up. No gradient, no filter, no outline — a body is one fill.
import type { CSSProperties } from 'react'
import { eyeShapes, inkFor, shapePath, type Look } from '@/lib/mark'

export type BotActivity = 'idle' | 'working'

type BotAvatarProps = {
  look: Look
  size?: number
  label?: string
  activity?: BotActivity
  className?: string
}

export function BotAvatar({ look, size = 24, label = 'Agent', activity = 'idle', className = '' }: BotAvatarProps) {
  const eyes = eyeShapes(look.eyes)
  const ink = inkFor(look.color)
  const style = { '--bot-size': `${size}px` } as CSSProperties

  return (
    <span
      className={`hui-bot ${className}`.trim()}
      style={style}
      role="img"
      aria-label={label}
      data-shape={look.shape}
      data-eyes={look.eyes}
      data-activity={activity}
    >
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path className="hui-mark-body" d={shapePath(look.shape)} fill={look.color} />
        <g className="hui-mark-face">
          {eyes.map((eye, index) => (
            <rect
              key={index}
              className="hui-mark-eye"
              x={eye.x - eye.w / 2}
              y={eye.y - eye.h / 2}
              width={eye.w}
              height={eye.h}
              rx={Math.min(eye.w, eye.h) / 2}
              fill={ink}
              transform={eye.tilt ? `rotate(${eye.tilt} ${eye.x} ${eye.y})` : undefined}
            />
          ))}
        </g>
      </svg>
    </span>
  )
}
