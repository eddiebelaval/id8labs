import type { ReactNode } from 'react'
import Link from 'next/link'
import { TagRow } from './primitives'

/**
 * Editorial cards — flat, hairline-bordered, sharp. Hover warms the paper.
 * EditorialCard is the generic surface; IssueCard is the magazine archive
 * row (big serif index number · title + deck + tags · date/read column).
 */

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function EditorialCard({
  children,
  href,
  external = false,
  featured = false,
  className = '',
}: {
  children: ReactNode
  href?: string
  /**
   * Render a plain anchor instead of next/link. Required for static files
   * served straight out of public/ (e.g. /periodic-table.html): the App
   * Router has no route for them, so next/link would attempt a client-side
   * navigation to a route that does not exist.
   */
  external?: boolean
  featured?: boolean
  className?: string
}) {
  const cls = cx(
    'block border p-7 transition-colors duration-200',
    featured
      ? 'border-[var(--rule)] relative before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange'
      : 'border-[var(--hair)] hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]',
    className
  )
  if (href && external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    )
  }
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return <div className={cls}>{children}</div>
}

export function IssueCard({
  number,
  title,
  deck,
  tags,
  date,
  label,
  href,
}: {
  number: ReactNode
  title: ReactNode
  deck?: ReactNode
  tags?: ReactNode[]
  date?: ReactNode
  label?: ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[72px_1fr] md:grid-cols-[120px_1fr_auto] items-start gap-5 md:gap-8 border-b border-[var(--hair)] py-7 transition-colors hover:bg-[var(--paper-shadow)]"
    >
      <div className="font-[family-name:var(--font-display)] font-normal leading-none tracking-[-0.04em] text-[var(--ink)] text-5xl md:text-7xl">
        {number}
        <span className="text-id8-orange">.</span>
      </div>

      <div>
        <h2 className="mb-2 font-[family-name:var(--font-display)] font-normal leading-[1.15] tracking-[-0.015em] text-[var(--ink)] text-[1.375rem] md:text-[1.875rem]">
          {title}
        </h2>
        {deck && (
          <p className="mb-3.5 max-w-[560px] font-[family-name:var(--font-serif)] italic leading-[1.5] text-[var(--muted)]">
            {deck}
          </p>
        )}
        {tags && tags.length > 0 && <TagRow tags={tags} />}
      </div>

      <div className="col-span-2 md:col-span-1 flex flex-row md:flex-col items-center md:items-end justify-between gap-1.5 border-t border-[var(--hair)] md:border-t-0 pt-3 md:pt-0 md:text-right font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] md:min-h-[100px]">
        {date && <div className="text-[13px] font-medium text-[var(--ink)]">{date}</div>}
        {label && <div className="hidden md:block">{label}</div>}
        <div className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.22em] text-id8-orange md:mt-auto">
          Read &rarr;
        </div>
      </div>
    </Link>
  )
}
