/**
 * Shipped. — Front-page derivations
 *
 * The /shipped hub leads with a front page: the latest daily as the lead
 * story, the latest sweeps beside it, and a strip of auto-derived "big
 * stories" above the archives. Everything here is computed from the
 * AUTO-GENERATED manifests (dailies.data.ts, sweeps.data.ts) — no new data
 * files, no hand curation. Regenerating the manifests refreshes the front
 * page.
 */

import { SHIPPED_DAILIES, type ShippedDaily } from './dailies.data'

/** The lead story: the most recent daily edition. */
export function getLeadDaily(): ShippedDaily | undefined {
  return SHIPPED_DAILIES[0]
}

/**
 * Auto-derived big stories: the heaviest coverage days.
 *
 * Word count is the one signal the manifest carries, and for a release
 * digest it is an honest proxy — a 3,000-word day is a day the labs shipped
 * a lot. Three guards keep the strip honest:
 *
 *  - only days in the archive's top word-count quartile qualify, so the
 *    strip never pads itself out with ordinary days (fewer than `limit`
 *    cards is the correct outcome on a thin archive),
 *  - at most two days per calendar month, so one giant launch week can't
 *    monopolize the strip, and
 *  - the current lead story is excluded, since it already owns the top of
 *    the page.
 *
 * Returned newest-first so the strip reads like a timeline.
 */
export function getBigStories(excludeDate?: string, limit = 6): ShippedDaily[] {
  const perMonth = new Map<string, number>()
  const picked: ShippedDaily[] = []

  const counts = SHIPPED_DAILIES.map((d) => d.wordCount).sort((a, b) => a - b)
  const floor = counts[Math.floor(counts.length * 0.75)] ?? 0

  const byWeight = [...SHIPPED_DAILIES]
    .filter((d) => d.date !== excludeDate && d.wordCount >= floor)
    .sort((a, b) => b.wordCount - a.wordCount)

  for (const daily of byWeight) {
    if (picked.length >= limit) break
    const month = daily.date.slice(0, 7)
    const used = perMonth.get(month) ?? 0
    if (used >= 2) continue
    perMonth.set(month, used + 1)
    picked.push(daily)
  }

  return picked.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export interface ShippedDailyMonth {
  /** Month key, e.g. "2026-08" */
  key: string
  /** Human label, e.g. "August 2026" */
  label: string
  /** Editions in the month, newest first */
  editions: ShippedDaily[]
  /** Total visible words across the month's editions */
  totalWords: number
}

/**
 * The daily archive grouped by calendar month, newest month first.
 * Months collapse better than ISO weeks at this volume: ~96 editions is
 * four month groups instead of fifteen week groups.
 */
export function groupDailiesByMonth(): ShippedDailyMonth[] {
  const months = new Map<string, ShippedDailyMonth>()

  for (const daily of SHIPPED_DAILIES) {
    const key = daily.date.slice(0, 7)
    let month = months.get(key)
    if (!month) {
      const parsed = new Date(daily.date + 'T00:00:00.000Z')
      month = {
        key,
        label: parsed.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC',
        }),
        editions: [],
        totalWords: 0,
      }
      months.set(key, month)
    }
    month.editions.push(daily)
    month.totalWords += daily.wordCount
  }

  return [...months.values()].sort((a, b) => (a.key < b.key ? 1 : -1))
}
