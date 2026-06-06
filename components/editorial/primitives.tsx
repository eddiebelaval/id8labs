import type { ReactNode, ElementType } from 'react'

/**
 * Editorial primitives — the shared vocabulary of the "Shipped." design
 * language. Warm paper, ink, hairline rules, Fraunces display with
 * italic-orange emphasis, Archivo Narrow kickers, JetBrains Mono meta.
 *
 * See docs/EDITORIAL_SYSTEM.md for usage rules.
 */

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/* ── Container ── */
export function Container({
  children,
  narrow = false,
  className = '',
}: {
  children: ReactNode
  narrow?: boolean
  className?: string
}) {
  return (
    <div
      className={cx('mx-auto w-full px-6 md:px-9', className)}
      style={{ maxWidth: narrow ? '760px' : '1200px' }}
    >
      {children}
    </div>
  )
}

/* ── Kicker: narrow uppercase orange label, optional leading dot ── */
export function Kicker({
  children,
  dot = false,
  className = '',
}: {
  children: ReactNode
  dot?: boolean
  className?: string
}) {
  return (
    <p
      className={cx(
        'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange',
        dot && 'flex items-center gap-2.5',
        className
      )}
    >
      {dot && (
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-id8-orange" />
      )}
      {children}
    </p>
  )
}

/* ── Deck: italic serif standfirst ── */
export function Deck({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <p
      className={cx(
        'font-[family-name:var(--font-serif)] italic text-[var(--muted)] text-xl md:text-[1.375rem] leading-[1.45]',
        className
      )}
    >
      {children}
    </p>
  )
}

/* ── Rules ── */
export function Rule({ className = '' }: { className?: string }) {
  return <hr className={cx('h-px border-0 bg-[var(--rule)]', className)} />
}

export function Hairline({ className = '' }: { className?: string }) {
  return <hr className={cx('h-px border-0 bg-[var(--hair)]', className)} />
}

/* ── SectionHead: title with italic-orange <em> support + side meta ── */
export function SectionHead({
  title,
  meta,
  as: Heading = 'h2',
  className = '',
}: {
  title: ReactNode
  meta?: ReactNode
  as?: ElementType
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-wrap items-baseline justify-between gap-5 border-b border-[var(--rule)] pb-7',
        className
      )}
    >
      <Heading className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-none text-[var(--ink)] text-[clamp(2rem,4vw,2.75rem)]">
        {title}
      </Heading>
      {meta && (
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {meta}
        </span>
      )}
    </div>
  )
}

/* ── MetaRow: mono key/value strip ── */
export function MetaRow({
  items,
  className = '',
}: {
  items: Array<{ label: ReactNode; value?: ReactNode }>
  className?: string
}) {
  return (
    <div
      className={cx(
        'flex flex-wrap gap-x-8 gap-y-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]',
        className
      )}
    >
      {items.map((item, i) => (
        <span key={i}>
          {item.value != null && (
            <b className="font-medium text-[var(--ink)]">{item.value} </b>
          )}
          {item.label}
        </span>
      ))}
    </div>
  )
}

/* ── Tags ── */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
      {children}
    </span>
  )
}

export function TagRow({
  tags,
  className = '',
}: {
  tags: ReactNode[]
  className?: string
}) {
  return (
    <div className={cx('flex flex-wrap gap-1.5', className)}>
      {tags.map((t, i) => (
        <Tag key={i}>{t}</Tag>
      ))}
    </div>
  )
}
