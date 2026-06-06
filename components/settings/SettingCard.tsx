'use client'

import Link from 'next/link'
import { Settings, Download, CheckCircle, Plus, Sparkles } from 'lucide-react'
import type { Setting } from '@/lib/settings'
import { formatModelName } from '@/lib/utils/format'
import { useStackStore } from '@/lib/stores/stack-store'

interface SettingCardProps {
  setting: Setting
}

const CATEGORY_EMOJI: Record<string, string> = {
  model: '🤖',
  permissions: '🔐',
  context: '📚',
  budget: '💰',
  optimization: '⚡',
  safety: '🛡️',
}

export function SettingCard({ setting }: SettingCardProps) {
  const { addItem, removeItem, isInStack } = useStackStore()
  const inStack = isInStack(setting.id)

  const emoji = CATEGORY_EMOJI[setting.category] || '⚙️'

  const handleAddToStack = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (inStack) {
      removeItem(setting.id)
    } else {
      addItem({
        id: setting.id,
        slug: setting.slug,
        name: setting.name,
        description: setting.description,
        type: 'setting',
        category: setting.category,
        tags: setting.tags,
      })
    }
  }

  const selectedClasses = inStack ? 'border-id8-orange' : ''

  return (
    <Link href={`/settings/${setting.slug}`}>
      <article
        className={`card group relative flex flex-col h-full ${selectedClasses} transition-colors duration-150`}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <span className="text-3xl">{emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {setting.verified && (
                <span className="inline-flex items-center gap-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--teal)]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
              <span className="inline-flex items-center px-2 py-0.5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] bg-[var(--paper-mid)] text-id8-orange">
                {setting.category}
              </span>
            </div>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-3 flex-1">
          <h3 className="font-[family-name:var(--font-display)] font-normal text-lg mb-1 text-[var(--ink)] group-hover:text-id8-orange transition-colors duration-150 line-clamp-1">
            {setting.name}
          </h3>
          <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">
            {setting.description}
          </p>

          {/* Model info */}
          {setting.model && (
            <div className="flex items-center gap-2 p-2 bg-[var(--paper-shadow)] border border-[var(--hair)] text-xs">
              <Sparkles className="w-3.5 h-3.5 text-id8-orange" />
              <span className="font-[family-name:var(--font-mono)] text-[var(--ink)]">{formatModelName(setting.model)}</span>
              {setting.max_tokens && (
                <span className="font-[family-name:var(--font-mono)] text-[var(--muted)]">
                  • {setting.max_tokens.toLocaleString()} tokens
                </span>
              )}
            </div>
          )}

          {/* Use case */}
          {setting.use_case && (
            <div className="mt-2 text-xs text-[var(--muted)]">
              <span className="font-semibold text-[var(--ink)]">Use case:</span> {setting.use_case}
            </div>
          )}
        </div>

        {/* Tags */}
        {setting.tags && setting.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {setting.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] bg-[var(--paper-mid)] text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
            {setting.tags.length > 3 && (
              <span className="px-2 py-0.5 text-xs text-[var(--muted)]">
                +{setting.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-3 border-t border-[var(--hair)]">
          <span className="flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">
            <Download className="w-4 h-4" />
            {setting.install_count.toLocaleString()}
          </span>

          {/* Add to Stack button */}
          <button
            onClick={handleAddToStack}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] border transition-colors duration-150 ${
              inStack
                ? 'bg-transparent text-[var(--teal)] border-[var(--teal)]'
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
    </Link>
  )
}
