import { SHIPPED_WEEKLY_SWEEPS, SHIPPED_MONTHLY_SWEEPS } from '@/lib/shipped/sweeps.data'
import type { ShippedSweep } from '@/lib/shipped/sweeps.data'
import { Kicker } from '@/components/editorial'

/**
 * Weekly + monthly sweep list — the routine-published Anthropic roundups that
 * live on the same branch as the dailies but were never linked from the hub.
 *
 * Distinct from the numbered magazine issues: those are the marquee editions
 * written by hand; these are the cadence sweeps. Rows mirror the daily archive
 * (period · standfirst · word count), newest first, opening the published
 * github.io page in a new tab.
 *
 * Pure presentation over the AUTO-GENERATED lib/shipped/sweeps.data.ts.
 */
function SweepRows({ sweeps }: { sweeps: ShippedSweep[] }) {
  return (
    <ul>
      {sweeps.map((sweep) => (
        <li key={sweep.period}>
          <a
            href={sweep.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border-b border-[var(--hair)] py-4 transition-colors hover:bg-[var(--paper)]"
          >
            <span className="flex items-baseline justify-between gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
              <span className="text-xs font-medium text-[var(--ink)]">
                {sweep.label}
              </span>
              <span className="flex items-center gap-4">
                <span className="tabular-nums">
                  {sweep.wordCount.toLocaleString('en-US')} words
                </span>
                <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.18em] text-id8-orange opacity-0 transition-opacity group-hover:opacity-100">
                  Read ↗
                </span>
              </span>
            </span>

            <span className="mt-1.5 block font-[family-name:var(--font-sans)] text-[15px] leading-[1.5] text-[var(--body)] transition-colors group-hover:text-[var(--ink)]">
              {sweep.title}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export function SweepList() {
  const hasWeekly = SHIPPED_WEEKLY_SWEEPS.length > 0
  const hasMonthly = SHIPPED_MONTHLY_SWEEPS.length > 0

  if (!hasWeekly && !hasMonthly) {
    return (
      <div className="py-8">
        <Kicker dot>Nothing yet</Kicker>
        <p className="mt-3 font-[family-name:var(--font-serif)] italic text-[var(--muted)]">
          No sweeps published yet. Run the manifest builder to populate them.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[3fr_2fr] lg:gap-16">
      {hasWeekly && (
        <section>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--rule)] pb-3">
            <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[1.375rem] md:text-[1.625rem]">
              Weekly
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              {SHIPPED_WEEKLY_SWEEPS.length} sweep
              {SHIPPED_WEEKLY_SWEEPS.length !== 1 ? 's' : ''}
            </span>
          </div>
          <SweepRows sweeps={SHIPPED_WEEKLY_SWEEPS} />
        </section>
      )}

      {hasMonthly && (
        <section>
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--rule)] pb-3">
            <h3 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.015em] text-[var(--ink)] text-[1.375rem] md:text-[1.625rem]">
              Monthly
            </h3>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
              {SHIPPED_MONTHLY_SWEEPS.length} roundup
              {SHIPPED_MONTHLY_SWEEPS.length !== 1 ? 's' : ''}
            </span>
          </div>
          <SweepRows sweeps={SHIPPED_MONTHLY_SWEEPS} />
        </section>
      )}
    </div>
  )
}
