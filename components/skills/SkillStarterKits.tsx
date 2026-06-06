'use client'

import Link from 'next/link'
import type { SkillCollection } from '@/lib/skill-types'

// Shared helpers to reduce duplication
function getKitHref(slug: string): string {
  return `/stackshack/starter-kits/${slug}`
}

function getSkillCount(collection: SkillCollection): number {
  return collection.skill_count || collection.skills?.length || 0
}

// Official badge component
function OfficialBadge(): JSX.Element {
  return (
    <span className="flex-shrink-0 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-id8-orange">
      Official
    </span>
  )
}

// Skill preview tags for card view
function SkillPreviewTags({ skills }: { skills: { id: string; name: string }[] }): JSX.Element {
  const visibleSkills = skills.slice(0, 4)
  const remainingCount = skills.length - 4

  return (
    <div className="flex flex-wrap gap-1.5 mb-4">
      {visibleSkills.map((skill) => (
        <span
          key={skill.id}
          className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]"
        >
          {skill.name}
        </span>
      ))}
      {remainingCount > 0 && (
        <span className="px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
          +{remainingCount} more
        </span>
      )}
    </div>
  )
}

// Content type indicator (configuration vs skills)
function ContentTypeIndicator({
  isConfiguration,
  skillCount,
}: {
  isConfiguration: boolean
  skillCount: number
}): JSX.Element {
  return (
    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
      {isConfiguration ? 'Configuration' : `${skillCount} skills`}
    </span>
  )
}

interface SkillStarterKitsProps {
  collections: SkillCollection[]
  variant?: 'grid' | 'carousel' | 'list'
  className?: string
}

export function SkillStarterKits({
  collections,
  variant = 'grid',
  className = '',
}: SkillStarterKitsProps) {
  if (collections.length === 0) {
    return null
  }

  if (variant === 'list') {
    return (
      <div className={`space-y-3 ${className}`}>
        {collections.map((collection) => (
          <StarterKitListItem key={collection.id} collection={collection} />
        ))}
      </div>
    )
  }

  if (variant === 'carousel') {
    return (
      <div className={`relative ${className}`}>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {collections.map((collection) => (
            <div key={collection.id} className="flex-shrink-0 w-80 snap-start">
              <StarterKitCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default: grid
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}
    >
      {collections.map((collection) => (
        <StarterKitCard key={collection.id} collection={collection} />
      ))}
    </div>
  )
}

function StarterKitCard({ collection }: { collection: SkillCollection }): JSX.Element {
  const isConfiguration = collection.content_type === 'configuration'
  const skillCount = getSkillCount(collection)
  const showSkillPreview = !isConfiguration && collection.skills && collection.skills.length > 0

  return (
    <Link
      href={getKitHref(collection.slug)}
      className="group flex flex-col h-full border border-[var(--hair)] p-6 transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-[family-name:var(--font-display)] font-normal text-lg text-[var(--ink)] group-hover:text-id8-orange transition-colors">
          {collection.name}
        </h3>
        {collection.is_official && <OfficialBadge />}
      </div>

      <p className="text-sm text-[var(--body)] leading-relaxed mb-4 line-clamp-2">
        {collection.description}
      </p>

      {showSkillPreview && <SkillPreviewTags skills={collection.skills!} />}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--hair)]">
        <ContentTypeIndicator isConfiguration={isConfiguration} skillCount={skillCount} />
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange">
          View Kit &rarr;
        </span>
      </div>
    </Link>
  )
}

function StarterKitListItem({ collection }: { collection: SkillCollection }): JSX.Element {
  const isConfiguration = collection.content_type === 'configuration'
  const skillCount = getSkillCount(collection)

  return (
    <Link
      href={getKitHref(collection.slug)}
      className="group flex items-center justify-between gap-4 border border-[var(--hair)] p-4 transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-[family-name:var(--font-display)] font-normal text-[var(--ink)] group-hover:text-id8-orange transition-colors">
            {collection.name}
          </h4>
          {collection.is_official && <OfficialBadge />}
        </div>
        <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] truncate mt-0.5">
          {isConfiguration ? 'Configuration' : `${skillCount} skills`}
        </p>
      </div>
      <span className="font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange">&rarr;</span>
    </Link>
  )
}

// Featured collection banner
export function FeaturedStarterKit({
  collection,
  className = '',
}: {
  collection: SkillCollection
  className?: string
}): JSX.Element {
  return (
    <Link
      href={getKitHref(collection.slug)}
      className={`group block border border-[var(--rule)] relative before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-id8-orange p-8 transition-colors duration-150 hover:bg-[var(--paper-shadow)] ${className}`}
    >
      <div className="max-w-lg">
        {collection.is_official && (
          <p className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.22em] text-id8-orange mb-3">
            Official Starter Kit
          </p>
        )}
        <h3 className="font-[family-name:var(--font-display)] font-normal text-3xl text-[var(--ink)] mb-2 group-hover:text-id8-orange transition-colors">
          {collection.name}
        </h3>
        <p className="font-[family-name:var(--font-serif)] italic text-lg text-[var(--muted)] mb-6">
          {collection.description}
        </p>
        <span className="inline-flex items-center gap-2.5 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] group-hover:bg-id8-orange group-hover:border-id8-orange transition-colors duration-150">
          Get Started &rarr;
        </span>
      </div>
    </Link>
  )
}

export default SkillStarterKits
