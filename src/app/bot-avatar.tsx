// The aicss bot avatar, ported from src/ui/BotAvatar.jsx to TSX for lot 2. Same vendored engine, same API: the engine
// drives the SVG outside React's render (one update per frame from its own loop), the component only mounts it and
// hands it the options on every change.
//
// The avatar's colours come from src/lib/labels.js (a fixed table per bot, an assumed exception to Glaze's
// avatar-no-hue rule: it is the bots' visual identity). Everything else on the page is tokens.
import { useEffect, useId, useRef, type CSSProperties } from 'react'
import { AI_BOT_SVG, createAiBot, type AiBotActivity, type AiBotEmotion, type AiBotMotion, type AiBotOptions, type AiBotShape } from '@/vendor/aicss/engine'

type BotAvatarProps = {
  colors?: [string, string]
  size?: number
  label?: string
  emotion?: AiBotEmotion
  activity?: AiBotActivity
  shape?: AiBotShape
  motion?: AiBotMotion | null
  motionKey?: number
  lookAround?: boolean
  hoverGiggle?: boolean
  className?: string
}

export function BotAvatar({
  colors,
  size = 24,
  label = 'Agent',
  emotion = 'neutral',
  activity = 'idle',
  shape = 'pebble',
  motion,
  motionKey,
  lookAround = false,
  hoverGiggle = true,
  className = ''
}: BotAvatarProps) {
  const gradId = `hui-bot-${useId().replace(/:/g, '')}`
  const refs = {
    svg: useRef<SVGSVGElement | null>(null),
    mover: useRef<SVGGElement | null>(null),
    bodyGroup: useRef<SVGGElement | null>(null),
    body: useRef<SVGPathElement | null>(null),
    face: useRef<SVGGElement | null>(null),
    mouth: useRef<SVGPathElement | null>(null),
    ground: useRef<SVGEllipseElement | null>(null),
    core: useRef<SVGEllipseElement | null>(null)
  }
  const eyes = useRef<(SVGPathElement | null)[]>([])
  const blush = useRef<(SVGEllipseElement | null)[]>([])
  const hearts = useRef<(SVGPathElement | null)[]>([])
  const bot = useRef<ReturnType<typeof createAiBot> | null>(null)
  const options: AiBotOptions = { emotion, activity, shape, lookAround, hoverGiggle, ...(motion ? { motion, motionKey } : {}) }
  const latest = useRef(options)

  useEffect(() => {
    latest.current = options
    bot.current?.update?.(options)
  })

  useEffect(() => {
    const els = {
      svg: refs.svg.current,
      mover: refs.mover.current,
      bodyGroup: refs.bodyGroup.current,
      body: refs.body.current,
      face: refs.face.current,
      mouth: refs.mouth.current,
      ground: refs.ground.current,
      core: refs.core.current
    }
    if (Object.values(els).some(v => !v)) return undefined
    try {
      bot.current = createAiBot(
        { ...(els as Required<typeof els>), eyes: eyes.current, blush: blush.current, hearts: hearts.current },
        latest.current
      )
    } catch {
      bot.current = null
    }
    return () => {
      bot.current?.destroy?.()
      bot.current = null
    }
  }, [])

  const style = { '--bot-size': `${size}px`, ...(colors ? { '--bot-1': colors[0], '--bot-2': colors[1] } : null) } as CSSProperties

  return (
    <span className={`hui-bot ${className}`} style={style} role="img" aria-label={label}>
      <svg ref={refs.svg} viewBox={AI_BOT_SVG.viewBox} aria-hidden="true">
        <defs>
          <radialGradient id={gradId} gradientUnits="userSpaceOnUse" cx="-4.8" cy="-6.4" r="24">
            <stop className="stop1" offset="0" />
            <stop className="stop2" offset="1" />
          </radialGradient>
          <filter id={`${gradId}-soft`} x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="1.3" /></filter>
          <filter id={`${gradId}-core`} x="-50%" y="-300%" width="200%" height="700%"><feGaussianBlur stdDeviation="0.8" /></filter>
          <filter id={`${gradId}-blush`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="0.55" /></filter>
        </defs>
        <ellipse ref={refs.ground} className="ground" cx="0" cy={AI_BOT_SVG.groundY} rx="10" ry="2.1" filter={`url(#${gradId}-soft)`} />
        <ellipse ref={refs.core} className="core" cx="0" cy={AI_BOT_SVG.groundY} rx="6.5" ry="0.9" filter={`url(#${gradId}-core)`} />
        <g ref={refs.mover}>
          <g ref={refs.bodyGroup}>
            <path ref={refs.body} d={AI_BOT_SVG.body} fill={`url(#${gradId})`} />
          </g>
          <g ref={refs.face}>
            {AI_BOT_SVG.blush.map((b, i) => (
              <ellipse key={`b${i}`} ref={n => { blush.current[i] = n }} className="blush" cx={b.cx} cy={b.cy} rx="1.9" ry="1.1" opacity="0" filter={`url(#${gradId}-blush)`} />
            ))}
            {AI_BOT_SVG.eyes.map((d, i) => (
              <path key={`e${i}`} ref={n => { eyes.current[i] = n }} className="face" d={d} strokeWidth={0} strokeLinejoin="round" />
            ))}
            <path ref={refs.mouth} className="face" d={AI_BOT_SVG.mouth} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        {Array.from({ length: AI_BOT_SVG.hearts }, (_, i) => (
          <path key={i} ref={n => { hearts.current[i] = n }} className="heart" d={AI_BOT_SVG.heart} opacity="0" />
        ))}
      </svg>
    </span>
  )
}
