'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { Container, Kicker, Deck } from '@/components/editorial'

export default function StarterKitsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[StarterKits ErrorBoundary]', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    })
  }, [error])

  return (
    <div className="bg-[var(--paper)] min-h-screen">
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Marketplace
          </Link>

          <Kicker className="mb-4">Marketplace</Kicker>
          <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-3">
            Starter <em className="italic text-id8-orange">kits</em>
          </h1>
          <Deck className="max-w-2xl">Curated skill bundles for common workflows.</Deck>
        </Container>
      </div>

      <Container className="py-12">
        <div className="text-center py-16 border border-[var(--hair)]">
          <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Something went wrong</h3>
          <p className="text-[var(--muted)] max-w-md mx-auto mb-6">
            We encountered an unexpected error while loading the starter kits.
          </p>

          {process.env.NODE_ENV === 'development' && (
            <div className="mb-6 p-4 bg-[var(--paper-shadow)] border border-[var(--hair)] max-w-lg mx-auto">
              <p className="text-xs text-[var(--body)] font-[family-name:var(--font-mono)] text-left break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-[var(--muted)] mt-2 font-[family-name:var(--font-mono)]">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}

          <div className="flex items-center justify-center gap-3.5">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/stackshack"
              className="inline-flex items-center gap-2 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-transparent text-[var(--ink)] border-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)]"
            >
              Browse all skills
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
