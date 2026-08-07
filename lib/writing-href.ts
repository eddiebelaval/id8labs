/**
 * The single source of truth for "where does this piece of writing live?"
 *
 * Every renderer that links a WritingItem — the homepage "Latest from the lab"
 * rail, the /writing index, anything added later — MUST resolve the URL through
 * `writingHref`. Before this existed, /writing/[slug] and the homepage list read
 * the same data but derived links differently: the index honoured an item's
 * explicit `href`, the homepage hardcoded `/writing/{slug}`. Standalone pieces,
 * magazine issues and newsletter issues were therefore linked to routes that do
 * not exist (The Gaps Are the Product 404'd from the homepage for that reason).
 *
 * Lives in its own module — with no filesystem imports — so client components
 * can import it. `@/lib/writing` pulls in `fs` and gray-matter and is
 * server-only.
 */

import type { WritingItem } from './writing'

/** The minimum a renderer needs in order to link an item. */
export type LinkableWritingItem = Pick<WritingItem, 'slug' | 'category'> &
  Partial<Pick<WritingItem, 'href'>>

/**
 * Resolve the canonical URL for a piece of writing.
 *
 * - Explicit `href` wins. Magazine issues live at /shipped/{NN}; standalone
 *   pieces are hosted HTML under /public and carry their own path.
 * - Newsletter issues carry a slug that is already prefixed (`newsletter/x`),
 *   so they resolve to /newsletter/{slug}, not /writing/newsletter/{slug}.
 * - Everything else is an MDX essay served by app/writing/[slug].
 */
export function writingHref(item: LinkableWritingItem): string {
  if (item.href) return item.href
  if (item.category === 'newsletter') return `/${item.slug}`
  return `/writing/${item.slug}`
}
