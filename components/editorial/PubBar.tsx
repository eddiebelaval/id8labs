import type { ReactNode } from 'react'

/**
 * PubBar — a magazine masthead strip for editorial section/landing pages
 * (the "publication line" under the global header). Italic serif mark with
 * an orange dot, a narrow uppercase subtitle, and mono meta pushed right.
 */
export function PubBar({
  mark,
  subtitle,
  meta,
}: {
  mark: ReactNode
  subtitle?: ReactNode
  meta?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-[var(--rule)] py-3.5">
      <span className="font-[family-name:var(--font-serif)] text-2xl font-medium italic tracking-[-0.015em] text-[var(--ink)]">
        {mark}
      </span>
      {subtitle && (
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)] before:mr-4 before:inline-block before:h-3 before:w-px before:bg-[var(--hair)] before:align-middle">
          {subtitle}
        </span>
      )}
      {meta && (
        <span className="ml-auto font-[family-name:var(--font-mono)] text-[11px] text-[var(--muted)]">
          {meta}
        </span>
      )}
    </div>
  )
}
