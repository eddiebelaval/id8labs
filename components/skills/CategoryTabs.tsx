'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import type { SkillCategory } from '@/lib/skill-types'

interface CategoryTabsProps {
  categories: SkillCategory[]
  selectedCategory?: string
  variant?: 'tabs' | 'pills' | 'dropdown'
  showAll?: boolean
  className?: string
}

const tagCls =
  'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] px-3 py-2 border transition-colors duration-150'

export function CategoryTabs({
  categories,
  selectedCategory,
  variant = 'tabs',
  showAll = true,
  className = '',
}: CategoryTabsProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentCategory = selectedCategory || searchParams.get('category') || null

  if (variant === 'dropdown') {
    return (
      <select
        value={currentCategory || ''}
        onChange={(e) => {
          const url = new URL(window.location.href)
          if (e.target.value) {
            url.searchParams.set('category', e.target.value)
          } else {
            url.searchParams.delete('category')
          }
          window.location.href = url.toString()
        }}
        className="px-4 py-2 bg-[var(--paper)] border border-[var(--hair)] font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] focus:outline-none focus:border-id8-orange"
      >
        {showAll && <option value="">All Categories</option>}
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    )
  }

  // pills + tabs collapse to the same flat editorial control row
  const activeCls = 'border-id8-orange text-id8-orange'
  const inactiveCls = 'border-[var(--hair)] text-[var(--muted)] hover:border-[var(--hair-hard)] hover:text-[var(--ink)]'

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {showAll && (
        <Link href={pathname} className={`${tagCls} ${!currentCategory ? activeCls : inactiveCls}`}>
          All
        </Link>
      )}
      {categories.map((category) => {
        const isActive = currentCategory === category.id
        return (
          <Link
            key={category.id}
            href={`${pathname}?category=${category.id}`}
            className={`${tagCls} ${isActive ? activeCls : inactiveCls}`}
          >
            {category.name}
          </Link>
        )
      })}
    </div>
  )
}

// Simpler category list for sidebar/footer
export function CategoryList({
  categories,
  className = '',
}: {
  categories: SkillCategory[]
  className?: string
}) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/skills/categories/${category.id}`}
            className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-id8-orange transition-colors"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Category badge component
export function CategoryBadge({
  categoryId,
  categoryName,
}: {
  categoryId: string
  categoryName?: string
  size?: 'sm' | 'default' | 'lg'
}) {
  return (
    <Link
      href={`/skills/categories/${categoryId}`}
      className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
    >
      {categoryName || categoryId}
    </Link>
  )
}

export default CategoryTabs
