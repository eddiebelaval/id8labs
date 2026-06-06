'use client'

import Link from 'next/link'
import type { Skill } from '@/lib/skill-types'
import { useStackStore } from '@/lib/stores/stack-store'

interface SkillCardProps {
  skill: Skill
  onAddToStack?: (skill: Skill) => void
  isInStack?: boolean
  variant?: 'default' | 'compact' | 'featured'
  enableFlip?: boolean
}

export function SkillCard({
  skill,
  onAddToStack,
  isInStack: isInStackProp,
  variant = 'default',
}: SkillCardProps) {
  const { addItem, removeItem, isInStack: isInStackStore } = useStackStore()

  // Use store state if no prop provided
  const isInStack = isInStackProp !== undefined ? isInStackProp : isInStackStore(skill.id)

  const complexityLabel =
    skill.complexity === 'multi-agent'
      ? 'Multi-Agent'
      : skill.complexity === 'complex'
        ? 'Complex'
        : 'Simple'

  const handleAddToStack = () => {
    if (isInStack) {
      removeItem(skill.id)
    } else {
      // Convert Skill to StackItem format
      const isAgent = skill.tags?.includes('agent')
      addItem({
        id: skill.id,
        slug: skill.slug,
        name: skill.name,
        description: skill.description || '',
        type: isAgent ? 'agent' : 'skill',
        category: skill.category_id || undefined,
        tags: skill.tags,
      })
    }
    if (onAddToStack) {
      onAddToStack(skill)
    }
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/skills/${skill.slug}`}
        className="group flex items-center gap-3 border border-[var(--hair)] p-3 transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-[family-name:var(--font-display)] font-normal text-base truncate text-[var(--ink)]">{skill.name}</h4>
          <p className="text-xs text-[var(--muted)] truncate">
            {skill.description}
          </p>
        </div>
        {skill.verified && (
          <span className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-teal flex-shrink-0">
            Verified
          </span>
        )}
      </Link>
    )
  }

  return (
    <article
      className={`group relative flex flex-col h-full border p-6 transition-colors duration-150 ${
        skill.featured
          ? 'border-[var(--rule)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange'
          : isInStack
            ? 'border-teal bg-[var(--paper-shadow)]'
            : 'border-[var(--hair)] hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]'
      }`}
    >
      {/* Top meta row: verified / complexity / tier */}
      <div className="flex items-center gap-2.5 flex-wrap mb-3 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em]">
        {skill.verified && <span className="text-teal">Verified</span>}
        <span className="bg-[var(--paper-mid)] px-2 py-1 text-[var(--muted)]">{complexityLabel}</span>
        {skill.quality_tier && (
          <span className="bg-[var(--paper-mid)] px-2 py-1 text-[var(--muted)]">{skill.quality_tier}</span>
        )}
        {skill.featured && <span className="text-id8-orange ml-auto">Featured</span>}
      </div>

      {/* Title and description */}
      <Link href={`/skills/${skill.slug}`} className="block mb-4 flex-1">
        <h3
          className="font-[family-name:var(--font-display)] font-normal text-xl mb-1.5 leading-[1.2] tracking-[-0.01em] text-[var(--ink)] group-hover:text-id8-orange transition-colors line-clamp-1"
          title={skill.name}
        >
          {skill.name}
        </h3>
        <p className="text-sm text-[var(--body)] leading-[1.6] line-clamp-3 min-h-[3em]">
          {skill.description || 'No description available.'}
        </p>
      </Link>

      {/* Tags */}
      {skill.tags && skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
          {skill.tags.length > 3 && (
            <span className="px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
              +{skill.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Stats row */}
      <div className="flex items-center gap-5 mt-auto pt-3 border-t border-[var(--hair)] font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
        <span>{skill.install_count.toLocaleString()} installs</span>
        {skill.avg_rating > 0 && <span>{skill.avg_rating.toFixed(1)} ★</span>}
        <span className="ml-auto">v{skill.version}</span>
      </div>

      {/* Add to Stack button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          handleAddToStack()
        }}
        className={`mt-4 w-full py-3 px-4 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 ${
          isInStack
            ? 'bg-transparent text-teal border-teal'
            : 'bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange'
        }`}
      >
        {isInStack ? 'In Stack' : 'Add to Stack'}
      </button>
    </article>
  )
}

export default SkillCard
