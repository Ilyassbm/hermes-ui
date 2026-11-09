// A spec is data from a model: it is read, cut to the sizes the thread can carry, and then drawn. Nothing in it is
// executed — the registry only knows three actions, and an element type it does not hold falls through to its children.
import { validateSpec, type Spec, type UIElement } from '@json-render/core'

export const LIMITS = {
  /** Elements in one spec, root included. A card is ten; a dashboard is forty. */
  elements: 200,
  /** How deep children may nest before the spec is cut. */
  depth: 12,
  /** Characters in one string of a spec, props and state alike. */
  string: 4000
} as const

export type IuiIssue = { at: string; reason: string }
export type IuiResult = { spec: Spec | null; issues: IuiIssue[] }

const isObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null && !Array.isArray(value)

/** A string cut to the limit, and every string in a plain object or array cut the same way. */
function clip<T>(value: T, issues: IuiIssue[], at: string): T {
  if (typeof value === 'string') {
    if (value.length <= LIMITS.string) return value
    issues.push({ at, reason: `string cut to ${LIMITS.string} characters` })
    return value.slice(0, LIMITS.string) as T
  }
  if (Array.isArray(value)) return value.map((item, i) => clip(item, issues, `${at}/${i}`)) as T
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, clip(item, issues, `${at}/${key}`)])) as T
  return value
}

const IMAGE_OK = /^(https:\/\/|\/(?!\/)|data:image\/(png|jpeg|webp);)/i

/**
 * The spec the thread will draw: `null` when there is nothing to draw (no root, no elements), never a partial object
 * that a renderer could trip on. Reachable elements only, twelve levels deep, two hundred of them, every string cut;
 * an image whose source is not https, a path of the app or a png/jpeg/webp data URL is dropped, not drawn.
 */
export function sanitizeSpec(raw: unknown): IuiResult {
  const issues: IuiIssue[] = []
  if (!isObject(raw) || typeof raw.root !== 'string' || !isObject(raw.elements)) {
    return { spec: null, issues: [{ at: '/', reason: 'spec has no root or elements' }] }
  }

  const root = raw.root
  const source = raw.elements as Record<string, unknown>
  const state = isObject(raw.state) ? (clip(raw.state, issues, '/state') as Record<string, unknown>) : undefined
  if (!isObject(source[root])) return { spec: null, issues: [{ at: `/${root}`, reason: 'root is not in elements' }] }

  const elements: Record<string, UIElement> = {}
  const seen = new Set<string>()
  const queue: Array<{ key: string; depth: number }> = [{ key: root, depth: 0 }]

  while (queue.length) {
    const { key, depth } = queue.shift()!
    if (seen.has(key)) continue
    seen.add(key)
    if (depth > LIMITS.depth) {
      issues.push({ at: `/${key}`, reason: `deeper than ${LIMITS.depth} levels` })
      continue
    }
    if (Object.keys(elements).length >= LIMITS.elements) {
      issues.push({ at: `/${key}`, reason: `more than ${LIMITS.elements} elements` })
      continue
    }

    const node = source[key]
    if (!isObject(node) || typeof node.type !== 'string') {
      issues.push({ at: `/${key}`, reason: 'element with no type' })
      continue
    }

    // Only the five fields the format defines travel: a spec cannot reach the runtime through anything else.
    const children = Array.isArray(node.children) ? node.children.filter((child): child is string => typeof child === 'string') : []
    const slots = isObject(node.slots)
      ? Object.fromEntries(
          Object.entries(node.slots)
            .map(([name, list]) => [name, Array.isArray(list) ? list.filter((child): child is string => typeof child === 'string') : []] as const)
            .filter(([, list]) => list.length)
        )
      : undefined
    const props = clip(isObject(node.props) ? node.props : {}, issues, `/${key}/props`)

    // An image with a source the app will not load takes its element with it; the spec around it still draws.
    if (node.type === 'Image' && !IMAGE_OK.test(String((props as Record<string, unknown>).src ?? ''))) {
      issues.push({ at: `/${key}`, reason: 'image source refused' })
      continue
    }

    elements[key] = {
      type: node.type,
      props,
      ...(children.length ? { children } : {}),
      ...(slots ? { slots } : {}),
      ...(isObject(node.visible) || typeof node.visible === 'boolean' ? { visible: node.visible as UIElement['visible'] } : {})
    }

    for (const child of [...children, ...Object.values(slots ?? {}).flat()]) queue.push({ key: child, depth: depth + 1 })
  }

  // A child that was cut takes its reference with it, so no renderer warns about a missing element.
  for (const element of Object.values(elements)) {
    if (element.children) element.children = element.children.filter(child => elements[child])
    if (element.slots) {
      for (const [name, list] of Object.entries(element.slots)) {
        const kept = list.filter(child => elements[child])
        if (kept.length) element.slots[name] = kept
        else delete element.slots[name]
      }
    }
  }

  const spec: Spec = { root, elements, ...(state ? { state } : {}) }
  const structural = validateSpec(spec)
  for (const issue of structural.issues) if (issue.severity === 'error') issues.push({ at: issue.elementKey ?? '/', reason: issue.message })
  return { spec: structural.valid ? spec : null, issues }
}
