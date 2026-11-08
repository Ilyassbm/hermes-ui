// What a person typed, as the composer has to treat it: a prompt, one of the few commands this page runs itself, or a
// command the gateway runs.
//
// Pure on purpose: no React, no `host`, no imports at all, so `scripts/check-slash.mjs` can bundle this file alone and
// show what each input classifies to. The rules:
//
//   bonjour            a prompt
//   /new  /clear       the page's own: a fresh conversation, no round trip
//   /model             the page's own: opens the header's model menu
//   /model gpt-6       a gateway command (the argument is the model to switch to)
//   /goal finir le lot a gateway command with its argument kept whole
//   / espace           an empty command name: plain text, the person meant a slash
//   //double           a literal slash typed twice: plain text
//   /stop              the page's own: stops the running turn
//
// A leading slash only counts at the very start of the message, after the whitespace a composer may keep, and only when
// the name is a word: `/` alone, `/ x` and `//x` are text.

export type Classified =
  | { kind: 'prompt' }
  | { kind: 'client'; name: string; arg: string }
  | { kind: 'slash'; name: string; arg: string }

/** The commands this page answers without asking the gateway. */
export const CLIENT_COMMANDS = new Set(['new', 'clear', 'model', 'stop'])

/**
 * Classifies one composer value.
 *
 * `client` only comes back for a command the page can run on its own: `/model` with no argument opens the menu, while
 * `/model gpt-6` goes to the gateway so it can actually switch the session's model.
 */
export function classifyInput(text: string): Classified {
  const value = String(text ?? '')
  const body = value.trim()
  if (!body.startsWith('/')) return { kind: 'prompt' }
  // `//` is how a person writes a slash at the start of a message: never a command.
  if (body.startsWith('//')) return { kind: 'prompt' }
  const rest = body.slice(1)
  const space = rest.search(/\s/)
  const name = (space < 0 ? rest : rest.slice(0, space)).trim()
  const arg = space < 0 ? '' : rest.slice(space + 1).trim()
  // No name at all (`/`, `/  `, `/ ça`): the slash is part of the sentence.
  if (!name || !/^[a-z0-9][a-z0-9:_-]*$/i.test(name)) return { kind: 'prompt' }
  const lower = name.toLowerCase()
  if (CLIENT_COMMANDS.has(lower) && (lower !== 'model' || !arg)) return { kind: 'client', name: lower, arg }
  return { kind: 'slash', name: lower, arg }
}

/** The command a classified value asks the gateway to run, without its leading slash. */
export function commandText(classified: Classified): string {
  if (classified.kind !== 'slash') return ''
  return classified.arg ? `${classified.name} ${classified.arg}` : classified.name
}
