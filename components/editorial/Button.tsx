import type { ReactNode } from 'react'
import Link from 'next/link'

/**
 * Editorial button — ink fill that flips to orange on hover (primary),
 * or ghost outline that fills ink (secondary). Cut top-right corner,
 * narrow uppercase label. Renders as a Next <Link> when `href` is provided.
 */

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'cut-tr inline-flex items-center justify-center gap-2.5 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 cursor-pointer no-underline'

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange hover:text-[var(--paper)]',
  secondary:
    'bg-transparent text-[var(--ink)] border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]',
  ghost:
    'bg-transparent text-[var(--ink)] border-[var(--hair)] hover:border-[var(--ink)]',
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

  if (href) {
    if (external) {
      return (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type ?? 'button'} className={cls} onClick={onClick}>
      {children}
    </button>
  )
}
