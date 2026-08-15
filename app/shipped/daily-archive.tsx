import { Kicker } from '@/components/editorial'
import { groupDailiesByMonth } from '@/lib/shipped/frontpage'

/**
 * Daily-edition archive — every published Shipped. Daily, collapsed into
 * calendar-month groups so ~100 editions scan as a handful of bars instead
 * of a wall. The newest month ships open; the rest expand on demand via
 * native <details>, so the whole thing server-renders with no client state.
 *
 * Each edition is a compact hairline row (day · standfirst · word count)
 * linking to its published github.io page (external, new tab).
 *
 * Pure presentation over the AUTO-GENERATED lib/shipped/dailies.data.ts.
 */
export function DailyArchive() {
  const months = groupDailiesByMonth()

  if (months.length === 0) {
    return (
      <div className="py-8">
        <Kicker dot>Nothing yet</Kicker>
        <p className="mt-3 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
          The daily archive is empty. Run the manifest builder to populate it.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {months.map((month, index) => (
        <details
          key={month.key}
          open={index === 0}
          className="group rounded-[13px] border border-[var(--hair)] open:border-[var(--hair-hard)]"
        >
          <summary className="flex cursor-pointer list-none flex-wrap items-baseline justify-between gap-3 px-6 py-5 transition-colors hover:bg-[var(--paper-shadow)] [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-4">
              <span className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[1.375rem] md:text-[1.625rem]">
                {month.label}
              </span>
              <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-id8-orange opacity-0 transition-opacity group-open:hidden group-hover:opacity-100">
                Expand
              </span>
            </span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] tabular-nums">
              {month.editions.length} edition
              {month.editions.length !== 1 ? 's' : ''} ·{' '}
              {month.totalWords.toLocaleString('en-US')} words
            </span>
          </summary>

          <ul className="border-t border-[var(--hair)] px-6 pb-3">
            {month.editions.map((edition) => (
              <li key={edition.date}>
                <a
                  href={edition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row grid grid-cols-[88px_1fr] md:grid-cols-[120px_1fr_auto] items-baseline gap-4 md:gap-8 border-b border-[var(--hair)] py-4 transition-colors last:border-b-0 hover:bg-[var(--paper-shadow)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
                    {edition.dayLabel}
                  </span>

                  <span className="font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[var(--body)] transition-colors group-hover/row:text-[var(--ink)]">
                    {edition.title}
                  </span>

                  <span className="col-span-2 mt-1 flex items-center gap-4 md:col-span-1 md:mt-0 md:justify-end font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
                    <span className="tabular-nums">
                      {edition.wordCount.toLocaleString('en-US')} words
                    </span>
                    <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-id8-orange opacity-0 transition-opacity group-hover/row:opacity-100">
                      Read ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  )
}
