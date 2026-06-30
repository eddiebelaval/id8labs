/**
 * Workshops — the cohort sessions ID8Labs runs in the open, before an
 * engagement begins. A workshop is where we tune a business into a system
 * in a room, together: map how the operation actually works, find the one
 * workflow worth tuning first, and sketch its primitive chain with human
 * gates. The inaugural edition is The Tuning Fork I.
 *
 * This file is the single source of truth for workshop content. Edit the
 * constants below to change pricing, seats, format, or scheduling — the
 * workshop page, the registration API, and the confirmation emails all read
 * from here, so nothing drifts.
 */

export type WorkshopFormat = 'virtual' | 'in-person' | 'hybrid'

/**
 * Scheduling model.
 * - 'rolling-cohort': no fixed calendar date. The cohort is confirmed and
 *   scheduled once `seats` interest registrations come in ("the room runs
 *   when it's full"). This is how The Tuning Fork I opens.
 * - 'fixed-date': a specific date is set (populate `date`).
 */
export type WorkshopScheduling = 'rolling-cohort' | 'fixed-date'

export interface AgendaItem {
  title: string
  body: string
}

export interface Workshop {
  slug: string
  /** Roman-numbered edition name, e.g. "The Tuning Fork I". */
  name: string
  /** One-line tagline shown under the title. */
  tagline: string
  /** The promise — what you walk out with. */
  deck: string
  format: WorkshopFormat
  /** Where the in-person seats are held. */
  location: string
  /** Price in whole units of `currency`. */
  price: number
  /** ISO 4217 currency code. */
  currency: string
  /** Seats that fill the first cohort. The room runs when this is reached. */
  seats: number
  /** Roughly how long the session runs. */
  duration: string
  scheduling: WorkshopScheduling
  /** Set when `scheduling === 'fixed-date'`. */
  date?: string
  /** What the session covers, in order. */
  agenda: AgendaItem[]
  /** Who the room is for. */
  forWhom: string[]
}

/**
 * The Tuning Fork I — the inaugural workshop.
 *
 * A tuning fork sets a true reference pitch. The session does the same for
 * an operation: it finds the reference the whole business should run against,
 * then tunes the first workflow to it. Edition I opens as a rolling cohort —
 * it runs once twelve seats are spoken for.
 */
export const THE_TUNING_FORK_I: Workshop = {
  slug: 'the-tuning-fork',
  name: 'The Tuning Fork I',
  tagline: 'The inaugural ID8Labs workshop.',
  deck: 'A working session where we tune your operation into a system. You leave with a one-page build plan for the first workflow worth automating — the primitive chain, its human gates, and the order to build it in.',
  format: 'hybrid',
  location: 'Miami, FL — or join remote',
  price: 500,
  currency: 'USD',
  seats: 12,
  duration: 'Half day',
  scheduling: 'rolling-cohort',
  agenda: [
    {
      title: 'Map the operation',
      body: 'We put how your business actually runs on the table — the handoffs, the follow-ups, the things that only happen because someone remembers. Then we find where it leaks.',
    },
    {
      title: 'Find the reference pitch',
      body: 'Every operation has one workflow worth tuning first: high-frequency, high-drift, low-risk to get wrong. We find yours and agree on what "true" looks like for it.',
    },
    {
      title: 'Design the primitive chain',
      body: 'We sketch that workflow as a chain of primitives with human gates by design — where judgment stays yours, and where the system can run on its own.',
    },
    {
      title: 'Leave with the plan',
      body: 'You walk out with a one-page build plan you could hand to any builder — or to us — and the order to build it in so it ships, not stalls.',
    },
  ],
  forWhom: [
    'Founders and small operators who run on their own judgment and want it to scale',
    'Solo builders and makers who want their own way of working to scale',
    'Agencies and studios tired of work drifting between people',
    'Media and production teams with a way of working worth keeping true',
  ],
}

export const WORKSHOPS: Record<string, Workshop> = {
  [THE_TUNING_FORK_I.slug]: THE_TUNING_FORK_I,
}

export function getWorkshop(slug: string): Workshop | null {
  return WORKSHOPS[slug] ?? null
}

/** Human-readable price, e.g. "$500". USD assumed for the symbol. */
export function formatPrice(workshop: Workshop): string {
  const symbol = workshop.currency === 'USD' ? '$' : `${workshop.currency} `
  return `${symbol}${workshop.price.toLocaleString('en-US')}`
}

/**
 * How a seat is secured, in plain words — reused by the page copy and the
 * confirmation email so the promise stays identical in both places.
 */
export function schedulingSummary(workshop: Workshop): string {
  if (workshop.scheduling === 'fixed-date' && workshop.date) {
    return `Held ${workshop.date}.`
  }
  return `The first cohort is capped at ${workshop.seats} seats and runs once the room is full. Register your interest and we'll confirm the date with you directly.`
}
