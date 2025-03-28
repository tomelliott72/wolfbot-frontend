// utils/citation.ts

/**
 * Strips citation references like [filename.pdf#page=2] from a response string.
 * Used to clean up bot output before displaying in the UI.
 */
export function stripCitations(text: string): string {
  return text.replace(/\[.*?\]/g, "").trim();
}

/**
 * Placeholder: later, you could map known filenames to customer website URLs.
 * Example:
 * {
 *   "hydrosense-legionella.pdf": "https://yourdomain.com/products/legionella"
 * }
 */
export const citationLinkMap: Record<string, string> = {};
