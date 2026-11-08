// JSX port of aicss AiBotAvatar (MIT, github.com/kvnkld/aicss). The engine is vendored unmodified.
import { useEffect, useId, useRef } from 'react'
import { AI_BOT_SVG, createAiBot } from '../vendor/aicss/engine'

export function BotAvatar({ colors, size = 24, label = 'Agent', emotion = 'neutral', activity = 'idle', shape = 'pebble', motion, motionKey, lookAround = false, hoverGiggle = true, className = '' }) {
  const gradId = `hui-bot-${useId().replace(/:/g, '')}`
  const refs = {
    svg: useRef(null),
    mover: useRef(null),
    bodyGroup: useRef(null),
    body: useRef(null),
    face: useRef(null),
    mouth: useRef(null),
    ground: useRef(null),
    core: useRef(null)
  }
  const eyes = useRef([])
  const blush = useRef([])
  const hearts = useRef([])
  const bot = useRef(null)
  const options = { emotion, activity, shape, lookAround, hoverGiggle, ...(motion ? { motion, motionKey } : {}) }
  const latest = useRef(options)

  useEffect(() => {
    latest.current = options
    bot.current?.update?.(options)
  })

  useEffect(() => {
    const els = Object.fromEntries(Object.entries(refs).map(([k, r]) => [k, r.current]))
    if (Object.values(els).some(v => !v)) return undefined
    try {
      bot.current = createAiBot({ ...els, eyes: eyes.current, blush: blush.current, hearts: hearts.current }, latest.current)
    } catch {
      bot.current = null
    }
    return () => {
      bot.current?.destroy?.()
      bot.current = null
    }
  }, [])

  const style = { '--bot-size': `${size}px`, ...(colors ? { '--bot-1': colors[0], '--bot-2': colors[1] } : null) }

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
