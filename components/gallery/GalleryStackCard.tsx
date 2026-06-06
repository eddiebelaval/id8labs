'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Download, CheckCircle } from 'lucide-react'
import type { DbStack } from '@/lib/stacks-db'
import { forkStack } from '@/lib/stacks-db-client'
import { useRouter } from 'next/navigation'

interface GalleryStackCardProps {
  stack: DbStack
}

export function GalleryStackCard({ stack }: GalleryStackCardProps) {
  const router = useRouter()
  const [forking, setForking] = useState(false)
  const [forked, setForked] = useState(false)

  const handleFork = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setForking(true)

    try {
      const newStackId = await forkStack(stack.id, `${stack.name} (forked)`)
      if (newStackId) {
        setForked(true)
        setTimeout(() => router.push('/profile'), 1500)
      } else {
        alert('Please sign in to fork stacks')
      }
    } catch (error) {
      alert('Failed to fork stack')
    } finally {
      setForking(false)
    }
  }

  return (
    <Link href={`/gallery/${stack.share_id}`}>
      <article className="group flex flex-col h-full border border-[var(--hair)] p-6 transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]">
        <div className="mb-4">
          <h3 className="font-[family-name:var(--font-display)] font-normal text-lg mb-1.5 text-[var(--ink)] group-hover:text-id8-orange transition-colors line-clamp-1">
            {stack.name}
          </h3>
          {stack.description && (
            <p className="text-sm text-[var(--body)] leading-relaxed line-clamp-2">
              {stack.description}
            </p>
          )}
        </div>

        <div className="mb-4 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          {stack.items?.length || 0} items
        </div>

        <div className="mt-auto pt-3 border-t border-[var(--hair)]">
          <button
            onClick={handleFork}
            disabled={forking || forked}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
              forked
                ? 'bg-transparent text-teal border-teal'
                : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange'
            }`}
          >
            {forked ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Forked
              </>
            ) : forking ? (
              'Forking...'
            ) : (
              <>
                <Download className="w-4 h-4" />
                Fork
              </>
            )}
          </button>
        </div>
      </article>
    </Link>
  )
}
