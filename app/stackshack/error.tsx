'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: Props): React.JSX.Element {
  useEffect(() => {
    console.error('StackShack Error:', error)
  }, [error])

  return (
    <div className="mx-auto w-full px-6 md:px-9 py-20 text-center" style={{ maxWidth: '760px' }}>
      <h2 className="font-[family-name:var(--font-display)] font-normal text-3xl text-[var(--ink)] mb-5">Something went wrong</h2>
      <div className="mb-8 bg-[var(--paper-shadow)] border border-[var(--hair)] p-4 text-left overflow-auto font-[family-name:var(--font-mono)] text-sm text-[var(--body)]">
        <p>{error.message}</p>
        {error.digest && (
          <span className="block text-xs mt-2 text-[var(--muted)]">
            Digest: {error.digest}
          </span>
        )}
      </div>
      <div className="flex justify-center gap-3.5">
        <button
          onClick={reset}
          className="inline-flex items-center justify-center px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
        >
          Try again
        </button>
        <Link
          href="/stackshack"
          className="inline-flex items-center justify-center px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-transparent text-[var(--ink)] border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
        >
          Back to StackShack
        </Link>
      </div>
    </div>
  )
}
