import { SHIPPED_DAILY_WEEKS } from '@/lib/shipped/dailies.data'
import { Kicker } from '@/components/editorial'

/**
 * Daily-edition archive — the published Shipped. Daily editions grouped into
 * weekly "issue" buckets. Each week is a group header; each edition is a compact
 * hairline row (date · standfirst · word count) linking to its published
 * github.io page (external, new tab). Newest week first.
 *
 * Pure presentation over the AUTO-GENERATED lib/shipped/dailies.data.ts; no
 * client state, so it server-renders.
 */
export function DailyArchive() {
  return (
    <div className="space-y-16">
      {SHIPPED_DAILY_WEEKS.map((week) => (
        <section key={week.isoWeek}>
          {/* Week (issue bucket) header */}
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--rule)] pb-3">
            <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[1.375rem] md:text-[1.625rem]">
              {week.label}
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              {week.editions.length} edition
              {week.editions.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Editions */}
          <ul>
            {week.editions.map((edition) => (
              <li key={edition.date}>
                <a
                  href={edition.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[88px_1fr] md:grid-cols-[120px_1fr_auto] items-baseline gap-4 md:gap-8 border-b border-[var(--hair)] py-4 transition-colors hover:bg-[var(--paper-shadow)]"
                >
                  <span className="font-[family-name:var(--font-mono)] text-xs font-medium text-[var(--ink)]">
                    {edition.dayLabel}
                  </span>

                  <span className="font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[var(--body)] transition-colors group-hover:text-[var(--ink)]">
                    {edition.title}
                  </span>

                  <span className="col-span-2 mt-1 flex items-center gap-4 md:col-span-1 md:mt-0 md:justify-end font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
                    <span className="tabular-nums">
                      {edition.wordCount.toLocaleString('en-US')} words
                    </span>
                    <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-id8-orange opacity-0 transition-opacity group-hover:opacity-100">
                      Read &nearr;
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {SHIPPED_DAILY_WEEKS.length === 0 && (
        <div className="py-8">
          <Kicker dot>Nothing yet</Kicker>
          <p className="mt-3 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
            The daily archive is empty. Run the manifest builder to populate it.
          </p>
        </div>
      )}
    </div>
  )
}
