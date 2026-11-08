// The `/` trigger a command list stands over, measured in plain text.
//
// The list opens two ways. Over the editor, the state carries the text node and the offset of the `/`, and the composer
// deletes that range when a command is picked. As the palette (the `/` shortcut), the editor holds the `/` it typed and
// a search field sits on top, so there is no node to point at: the trigger is the leading run of text, and the same
// pick must replace it. Both cases share this one measure, and it has no DOM, so a script can ask it directly.

/**
 * Length, from the start of `text`, of the bare `/…` run a command list stands over; 0 when there is none.
 * It is the whole run up to the first space: "/he" is 3, "/he bonjour" is 3, "bonjour /he" is 0.
 */
export function leadingSlashToken(text: string): number {
  const match = /^[ \u00a0]*\/[^\s\u00a0@/]{0,40}/.exec(text)
  return match ? match[0].length : 0
}
