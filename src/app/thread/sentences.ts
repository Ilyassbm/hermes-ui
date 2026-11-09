// The reasoning, cut into the lines the thinking block shows: one sentence per line.
//
// aicss's ThinkingReasoning reveals a list of phrases; ours comes from the model, so the list is the reasoning itself —
// the `reasoning` deltas the turn already collects (`src/lib/hermes.js`, `reasoning.delta`). Nothing is invented,
// dropped or reordered: every line is a slice of that text. What the split does is cut at a full stop, a question or an
// exclamation mark followed by a space (or the end of the text), at a paragraph break, and at each list item, and take
// the markdown a renderer would have eaten with it — a leading `#`, `-`, `1.`, `>` or a fence line, and paired `**`,
// `__`, backticks and a link's URL. A short line ("Ok.") stays a line of its own: the block shows what arrived, not
// sentences it composed.
//
// Abbreviations ("e.g.", "i.e.", "vs.") do not end a sentence, and a decimal point (3.5) never does: a mark only cuts
// the text when a space or the end follows it.

/** Markers a markdown renderer would have consumed: a heading, a bullet, an ordered item, a quote. They also start a
 *  new line, because a list item is as much an item of thought as a sentence is. */
const MARKER = /^\s*(?:#{1,6}\s+|[-*+]\s+|\d+[.)]\s+|>\s*)/;
/** A fence line: the code inside stays, the ``` itself is markup. */
const FENCE = /^\s*(?:```|~~~)/;
/** Pieces that never end a sentence on their own. */
const ABBREVIATION = /(?:\b(?:e\.g|i\.e|etc|vs|cf|approx|fig|no|dr|mr|ms|st)\.)$/i;
/** The characters a sentence can close on. */
const END = new Set(['.', '!', '?', '…']);
/** What may follow a closing mark and still belong to the sentence: a quote or a bracket. */
const CLOSING = new Set(['"', "'", ')', ']', '”', '’']);
/** Paired inline markdown, removed with its markers: bold, inline code, a link's target. */
const INLINE: ReadonlyArray<readonly [RegExp, string]> = [
  [/\*\*([^*]+)\*\*/g, '$1'],
  [/__([^_]+)__/g, '$1'],
  [/`([^`]*)`/g, '$1'],
  [/\[([^\]]+)\]\([^)]*\)/g, '$1'],
];

/** One line as a person reads it: markup gone, whitespace collapsed. */
function plain(line: string): string {
  let out = line.replace(FENCE, '').replace(MARKER, '');
  for (const [pattern, replacement] of INLINE) out = out.replace(pattern, replacement);
  return out.replace(/\s+/g, ' ').trim();
}

/** Cuts one paragraph into sentences at the marks that end them, and pushes what is left. */
function cut(paragraph: string, out: string[]): void {
  let start = 0;
  for (let i = 0; i < paragraph.length; i++) {
    if (!END.has(paragraph[i])) continue;
    // The run of closing marks, then any quote or bracket that closes with them.
    let end = i + 1;
    while (end < paragraph.length && (END.has(paragraph[end]) || CLOSING.has(paragraph[end]))) end++;
    // A mark inside a word (3.5, file.ts) and an abbreviation are not the end of a sentence.
    if (end < paragraph.length && !/\s/.test(paragraph[end])) { i = end - 1; continue; }
    const piece = paragraph.slice(start, end).trim();
    if (ABBREVIATION.test(piece)) { i = end - 1; continue; }
    if (piece) out.push(piece);
    start = end;
    i = end - 1;
  }
  const tail = paragraph.slice(start).trim();
  if (tail) out.push(tail);
}

/**
 * The reasoning as lines. Joined by a space, they are the reasoning with its whitespace collapsed and its markdown
 * markers gone; no line is longer than the sentence or list item it came from.
 */
export function sentences(text: string): string[] {
  const out: string[] = [];
  for (const block of text.replace(/\r\n?/g, '\n').split(/\n\s*\n/)) {
    // A line that opens a list item (or a heading, or a quote) is an item of its own; a line that does not continues the
    // one before it, so a hard-wrapped sentence is not cut in two.
    const items: string[] = [];
    for (const raw of block.split('\n')) {
      const line = plain(raw);
      if (!line) continue;
      if (!items.length || MARKER.test(raw)) items.push(line);
      else items[items.length - 1] += ` ${line}`;
    }
    for (const item of items) cut(item, out);
  }
  return out;
}
