import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Editorial button — rounded, narrow uppercase label. On hover the fill
 * SWEEPS in from the left (a ::before that scales on the x-axis) like ink
 * spreading across paper, and the label colour flips. CSS-only, restrained.
 * primary fills orange over ink; secondary/ghost fill ink over paper.
 * Renders as a Next <Link> when `href` is provided.
 */

type Variant = 'primary' | 'secondary' | 'ghost'

// Shared shape + the sweep mechanics. The ::before is the wiping panel:
// anchored left, scaled to 0 on the x-axis, easing to full width on hover.
const base =
  'group relative isolate overflow-hidden rounded-[10px] inline-flex items-center justify-center px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] cursor-pointer no-underline transition-colors duration-200 ' +
  'before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-[10px] before:transition-transform before:duration-[320ms] before:[transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:before:scale-x-100'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] before:bg-id8-orange hover:border-id8-orange hover:text-[var(--paper)]',
  secondary:
    'bg-transparent text-[var(--ink)] border-[var(--ink)] before:bg-[var(--ink)] hover:text-[var(--paper)]',
  ghost:
    'bg-transparent text-[var(--ink)] border-[var(--hair)] before:bg-[var(--ink)] hover:text-[var(--paper)] hover:border-[var(--ink)]',
}

function cx(...parts: Array<string | false | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function EditorialButton({
  children,
  href,
  variant = 'primary',
  className = '',
  external = false,
  onClick,
  type,
}: {
  children: ReactNode
  href?: string
  variant?: Variant
  className?: string
  external?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const cls = cx(base, variants[variant], className)
  // Label rides above the sweeping panel and nudges a hair on hover.
  const label = (
    <span className="relative z-10 inline-flex items-center gap-2.5 transition-transform duration-200 ease-out group-hover:translate-x-0.5">
      {children}
    </span>
  )

  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {label}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} className={cls} onClick={onClick}>
      {label}
    </button>
  )
}
