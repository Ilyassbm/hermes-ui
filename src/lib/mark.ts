// The bot's mark: one flat body and two capsule eyes. Drawn here, from nothing but a few formulas — no outline, no
// gradient, no asset — so a bot's look is three small words (a shape, a pair of eyes, a colour) that can be stored in a
// profile, edited in a dialog and read back anywhere.
//
// Shapes are closed curves sampled around the centre of a 100 × 100 box and smoothed into cubic Béziers (Catmull-Rom),
// so the path is a few hundred bytes and every size draws the same silhouette. The eyes are capsules; the mood is only
// their size, their gap and their lean (mirrored: both tops toward the centre reads stern, away from it reads sad).

export const MARK_SHAPES = ['circle', 'pebble', 'squircle', 'blob', 'drop', 'dome', 'flower', 'scallop'] as const
export type MarkShape = (typeof MARK_SHAPES)[number]

export const MARK_EYES = ['calm', 'happy', 'wide', 'sleepy', 'stern', 'sad', 'wink', 'curious'] as const
export type MarkEyes = (typeof MARK_EYES)[number]

/** The palette the editor offers. `auto` is not a colour: it is the bot's own (Hermes roster, else its name). */
export const MARK_COLORS: ReadonlyArray<{ id: string; name: string; hex: string }> = [
  { id: 'coral', name: 'Coral', hex: '#ff7a59' },
  { id: 'red', name: 'Red', hex: '#e5484d' },
  { id: 'pink', name: 'Pink', hex: '#ec4f9c' },
  { id: 'violet', name: 'Violet', hex: '#8e5cf0' },
  { id: 'blue', name: 'Blue', hex: '#5b8def' },
  { id: 'sky', name: 'Sky', hex: '#4fb3ea' },
  { id: 'teal', name: 'Teal', hex: '#2fb8a6' },
  { id: 'green', name: 'Green', hex: '#46a96a' },
  { id: 'lime', name: 'Lime', hex: '#8fd14f' },
  { id: 'amber', name: 'Amber', hex: '#f5c542' },
  { id: 'orange', name: 'Orange', hex: '#f0a33c' },
  { id: 'slate', name: 'Slate', hex: '#8a8a8a' },
  { id: 'white', name: 'White', hex: '#f4f4f4' }
]

/** A bot's mark as stored: any field may be absent, and an absent field is the bot's automatic one. */
export type Mark = { shape?: MarkShape; eyes?: MarkEyes; color?: string }

/** A mark with every field decided. */
export type Look = { shape: MarkShape; eyes: MarkEyes; color: string }

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

/** `#abc` → `#aabbcc`, lower-cased; '' when `value` is not a hex colour. */
export function normalizeHex(value: unknown): string {
  const text = typeof value === 'string' ? value.trim() : ''
  if (!HEX.test(text)) return ''
  const body = text.slice(1).toLowerCase()
  return `#${body.length === 3 ? [...body].map(c => c + c).join('') : body}`
}

/**
 * What a profile may carry under `ui_meta['hermes-ui'].mark`. The file is anyone's to edit and rides every roster paint,
 * so each field is checked on the way in: an unknown shape, a colour that is not hex, a non-object — all read as "not
 * set", never as an error and never passed on to the drawing.
 */
export function sanitizeMark(raw: unknown): Mark {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
  const row = raw as Record<string, unknown>
  const out: Mark = {}
  if ((MARK_SHAPES as readonly unknown[]).includes(row.shape)) out.shape = row.shape as MarkShape
  if ((MARK_EYES as readonly unknown[]).includes(row.eyes)) out.eyes = row.eyes as MarkEyes
  const color = normalizeHex(row.color)
  if (color) out.color = color
  return out
}

// ── shapes ────────────────────────────────────────────────────────────────────────────────────────────────────────────

type Point = [number, number]

const TAU = Math.PI * 2
const SAMPLES = 96

/** A superellipse point: `n` 2 is an ellipse, higher squares it off. */
const super2 = (t: number, rx: number, ry: number, n: number): Point => {
  const c = Math.cos(t)
  const s = Math.sin(t)
  return [rx * Math.sign(c) * Math.abs(c) ** (2 / n), ry * Math.sign(s) * Math.abs(s) ** (2 / n)]
}

const polar = (r: number, t: number): Point => [r * Math.cos(t), r * Math.sin(t)]

/** The outline point at angle `t` (radians, y down) of each shape, centred on (0, 0) in a ±45 box. */
const OUTLINE: Record<MarkShape, (t: number) => Point> = {
  circle: t => polar(44, t),
  pebble: t => polar(43 * (1 + 0.05 * Math.sin(2 * t + 0.6) + 0.035 * Math.sin(3 * t + 1.9)), t),
  squircle: t => super2(t, 45, 45, 4.4),
  blob: t => polar(40 * (1 + 0.11 * Math.sin(3 * t + 0.4) + 0.05 * Math.sin(2 * t)), t),
  drop: t => {
    // A circle with a soft point straight up (angle −π/2): a Gaussian bump on the radius.
    const d = Math.atan2(Math.sin(t + Math.PI / 2), Math.cos(t + Math.PI / 2))
    const [x, y] = polar(37 * (1 + 0.42 * Math.exp(-((d / 0.42) ** 2))), t)
    return [x, y + 6]
  },
  dome: t => {
    // A round top over a flatter belly.
    const top = Math.sin(t) < 0
    const [x, y] = super2(t, 44, top ? 42 : 36, top ? 2 : 6)
    return [x, y + 3]
  },
  flower: t => polar(38 * (1 + 0.11 * Math.cos(7 * t)), t),
  scallop: t => polar(40 * (1 + 0.055 * Math.cos(10 * t)), t)
}

const round = (n: number) => Math.round(n * 10) / 10

/** A closed Catmull-Rom spline through `points`, as one SVG path of cubic Béziers. */
function smooth(points: Point[]): string {
  const n = points.length
  const at = (i: number) => points[(i + n) % n]
  let d = `M${round(at(0)[0])} ${round(at(0)[1])}`
  for (let i = 0; i < n; i += 1) {
    const p0 = at(i - 1)
    const p1 = at(i)
    const p2 = at(i + 1)
    const p3 = at(i + 2)
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${round(c1[0])} ${round(c1[1])} ${round(c2[0])} ${round(c2[1])} ${round(p2[0])} ${round(p2[1])}`
  }
  return `${d}Z`
}

const PATHS = new Map<MarkShape, string>()

/** The body of `shape`, in a 100 × 100 box centred on (50, 50). Drawn once per shape and kept. */
export function shapePath(shape: MarkShape): string {
  const known = PATHS.get(shape)
  if (known) return known
  const outline = OUTLINE[shape] || OUTLINE.pebble
  const points: Point[] = []
  for (let i = 0; i < SAMPLES; i += 1) {
    const [x, y] = outline((i / SAMPLES) * TAU)
    points.push([50 + x, 50 + y])
  }
  const path = smooth(points)
  PATHS.set(shape, path)
  return path
}

// ── eyes ──────────────────────────────────────────────────────────────────────────────────────────────────────────────

export type Eye = { x: number; y: number; w: number; h: number; tilt: number }

type EyeSet = { y: number; gap: number; left: { w: number; h: number; tilt: number }; right: { w: number; h: number; tilt: number } }

const pair = (w: number, h: number, tilt = 0): EyeSet['left'][] => [
  { w, h, tilt },
  { w, h, tilt: -tilt }
]

const SETS: Record<MarkEyes, EyeSet> = {
  calm: { y: 46, gap: 13, left: pair(9, 20)[0], right: pair(9, 20)[1] },
  happy: { y: 48, gap: 14, left: pair(11, 10, -14)[0], right: pair(11, 10, -14)[1] },
  wide: { y: 45, gap: 15, left: pair(12, 27)[0], right: pair(12, 27)[1] },
  sleepy: { y: 50, gap: 14, left: pair(12, 5)[0], right: pair(12, 5)[1] },
  stern: { y: 46, gap: 13, left: pair(9, 18, 22)[0], right: pair(9, 18, 22)[1] },
  sad: { y: 47, gap: 13, left: pair(9, 18, -22)[0], right: pair(9, 18, -22)[1] },
  wink: { y: 46, gap: 13, left: { w: 9, h: 20, tilt: 0 }, right: { w: 12, h: 4, tilt: 0 } },
  curious: { y: 46, gap: 13, left: { w: 9, h: 25, tilt: 0 }, right: { w: 9, h: 15, tilt: 8 } }
}

/** The two capsules of `eyes`: centre, size and lean, left then right. */
export function eyeShapes(eyes: MarkEyes): [Eye, Eye] {
  const set = SETS[eyes] || SETS.calm
  const grow = (eye: EyeSet['left']) => ({ w: round(eye.w * EYE_SCALE), h: round(eye.h * EYE_SCALE), tilt: eye.tilt })
  const gap = set.gap * EYE_SCALE
  return [
    { x: round(50 - gap), y: set.y, ...grow(set.left) },
    { x: round(50 + gap), y: set.y, ...grow(set.right) }
  ]
}

/** The eyes are drawn at this scale of the table above: at 33 px, the size of a rail row, the first cut read as dots. */
const EYE_SCALE = 1.2

// ── colour ────────────────────────────────────────────────────────────────────────────────────────────────────────────

/** The eyes' colour on `hex`: near-black on a light body, white on a dark one (relative luminance, WCAG weights). */
export function inkFor(hex: string): string {
  const body = normalizeHex(hex).slice(1) || '888888'
  const channel = (i: number) => {
    const v = parseInt(body.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4
  }
  const luminance = 0.2126 * channel(0) + 0.7152 * channel(2) + 0.0722 * channel(4)
  return luminance > 0.32 ? '#111111' : '#ffffff'
}

/** The colours a bot may be given by its name alone: the vivid ones, never the neutrals. */
export const AUTO_COLORS = MARK_COLORS.filter(c => c.id !== 'slate' && c.id !== 'white').map(c => c.hex)
/** The eyes a bot may be given by its name alone: the friendly ones. */
export const AUTO_EYES: readonly MarkEyes[] = ['calm', 'happy', 'curious', 'wink']
