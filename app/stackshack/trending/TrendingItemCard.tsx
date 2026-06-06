'use client'

import Link from 'next/link'
import { Download, Eye, CheckCircle, Plus } from 'lucide-react'
import type { TrendingItem, TrendingItemType } from '@/lib/trending'
import { useStackStore } from '@/lib/stores/stack-store'

interface TrendingItemCardProps {
  item: TrendingItem
  featured?: boolean
  showBadge?: 'new' | 'featured'
}

export function TrendingItemCard({ item, featured, showBadge }: TrendingItemCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(item.id)

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(item.id)
    } else {
      addItem({
        id: item.id,
        slug: item.slug,
        name: item.name,
        description: item.description,
        type: item.type,
        category: item.category,
      })
    }
  }

  const href = getItemHref(item)

  const borderClass = featured
    ? 'border-[var(--rule)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange'
    : inStack
      ? 'border-teal bg-[var(--paper-shadow)]'
      : 'border-[var(--hair)] hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]'

  return (
    <article
      className={`group relative flex flex-col h-full border p-6 transition-colors duration-150 ${borderClass}`}
    >
      {/* Stretched link - covers entire card for navigation */}
      <Link
        href={href}
        className="absolute inset-0 z-0"
        aria-label={`View ${item.name} details`}
      />

      {/* Top meta row */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3 relative z-10 pointer-events-none font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em]">
        <span className="bg-[var(--paper-mid)] px-2 py-1 text-[var(--muted)]">{item.type}</span>
        {item.official && <span className="text-id8-orange">Official</span>}
        {item.verified && !item.official && <span className="text-teal">Verified</span>}
        {showBadge === 'new' && <span className="text-teal ml-auto">New</span>}
        {showBadge === 'featured' && <span className="text-id8-orange ml-auto">Featured</span>}
      </div>

      {/* Title and description */}
      <div className="mb-4 flex-1 relative z-10 pointer-events-none">
        <h3 className="font-[family-name:var(--font-display)] font-normal text-lg mb-1.5 leading-[1.2] tracking-[-0.01em] text-[var(--ink)] group-hover:text-id8-orange transition-colors line-clamp-1">
          {item.name}
        </h3>
        <p className="text-sm text-[var(--body)] leading-[1.6] line-clamp-2">
          {item.description}
        </p>
      </div>

      {/* Stats and actions */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--hair)] relative z-10">
        <div className="flex items-center gap-4 pointer-events-none font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <Download className="w-3.5 h-3.5" />
            {item.install_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {item.view_count.toLocaleString()}
          </span>
        </div>

        {/* Add to Stack button */}
        <button
          onClick={handleAddToStack}
          className={`relative z-20 flex items-center gap-1.5 px-3 py-1.5 border font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-150 ${
            inStack
              ? 'bg-transparent text-teal border-teal'
              : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange'
          }`}
        >
          {inStack ? (
            <>
              <CheckCircle className="w-3.5 h-3.5" />
              In Stack
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              Add
            </>
          )}
        </button>
      </div>
    </article>
  )
}

function getItemHref(item: TrendingItem): string {
  switch (item.type) {
    case 'skill':
      return `/stackshack/${item.slug}`
    case 'command':
      return `/stackshack?tab=commands`
    case 'setting':
      return `/stackshack?tab=settings`
    case 'plugin':
      return `/stackshack/plugins/${item.slug}`
    default:
      return '/stackshack'
  }
}
