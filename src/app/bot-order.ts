// Which bot is "the third one": the pinned list first (Branco unless the person unpinned it), then the team, in the
// order the rail draws them. The bot shortcuts and the picker's digit keys both count this way, so pressing 3 and
// reading the third row never disagree.
import { selectBot, store } from '@/lib/hermes'

export const DEFAULT_PINNED = ['default']

/** The stored pin list, or Branco alone when storage is empty or unavailable. */
export function pinnedNames(ctx: any): string[] {
  try {
    const value = ctx?.storage?.get('pinned', DEFAULT_PINNED)
    return Array.isArray(value) && value.length ? value : DEFAULT_PINNED
  } catch {
    return DEFAULT_PINNED
  }
}

/** Every bot's name, pinned first, then the rest in roster order. */
export function orderedBotNames(ctx: any): string[] {
  const names = store.get().bots.map(bot => bot.name)
  const pinned = pinnedNames(ctx).filter(name => names.includes(name))
  return [...pinned, ...names.filter(name => !pinned.includes(name))]
}

/** Selects the n-th bot (1-based) and swallows the case where the roster is shorter. */
export function goToBot(ctx: any, n: number): void {
  const name = orderedBotNames(ctx)[n - 1]
  if (name) void selectBot(name)
}
