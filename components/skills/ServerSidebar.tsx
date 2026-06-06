import Link from 'next/link'
import type { SkillCategory, SkillCollection } from '@/lib/skill-types'

interface ServerSidebarProps {
    categories: SkillCategory[]
    collections: SkillCollection[]
    counts: {
        total: number
        skills: number
        agents: number
        byCategory: Record<string, number>
    }
    currentType: string
    currentCategory: string | null
}

const headingCls =
    'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]'

function filterRowCls(active: boolean): string {
    return (
        'flex items-center gap-3 px-3 py-2 border-l-2 transition-colors duration-150 ' +
        (active
            ? 'border-id8-orange text-id8-orange bg-[var(--paper-shadow)]'
            : 'border-transparent text-[var(--body)] hover:bg-[var(--paper-shadow)]')
    )
}

const labelCls = 'font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] flex-1 truncate'
const countCls = 'font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]'

/**
 * Server-rendered sidebar using URL-based filtering.
 * No client state - fully compatible with Server Components.
 */
export function ServerSidebar({
    categories,
    collections,
    counts,
    currentType,
    currentCategory,
}: ServerSidebarProps) {
    // Build URL with preserved filters
    const buildFilterUrl = (type?: string, category?: string | null) => {
        const params = new URLSearchParams()
        const targetType = type ?? currentType
        const targetCategory = category === undefined ? currentCategory : category

        if (targetType && targetType !== 'all') {
            params.set('type', targetType)
        }
        if (targetCategory) {
            params.set('category', targetCategory)
        }

        const queryString = params.toString()
        return `/skills${queryString ? `?${queryString}` : ''}`
    }

    const hasActiveFilters = currentType !== 'all' || currentCategory !== null

    return (
        <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-20 space-y-7 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
                <div className="space-y-7">
                    <div className="flex items-center justify-between">
                        <h3 className={headingCls}>Filters</h3>
                        {hasActiveFilters && (
                            <Link
                                href="/stackshack"
                                className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-id8-orange"
                            >
                                Clear
                            </Link>
                        )}
                    </div>

                    {/* Type Filter */}
                    <div>
                        <h4 className={`${headingCls} mb-3`}>Type</h4>
                        <div className="space-y-0.5">
                            <Link href={buildFilterUrl('all', currentCategory)} className={filterRowCls(currentType === 'all')}>
                                <span className={labelCls}>All Items</span>
                                <span className={countCls}>{counts.total}</span>
                            </Link>
                            <Link href={buildFilterUrl('skills', currentCategory)} className={filterRowCls(currentType === 'skills')}>
                                <span className={labelCls}>Skills</span>
                                <span className={countCls}>{counts.skills}</span>
                            </Link>
                            <Link href={buildFilterUrl('agents', currentCategory)} className={filterRowCls(currentType === 'agents')}>
                                <span className={labelCls}>Agents</span>
                                <span className={countCls}>{counts.agents}</span>
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-[var(--hair)]" />

                    {/* Category Filter */}
                    <div>
                        <h4 className={`${headingCls} mb-3`}>Categories</h4>
                        <div className="space-y-0.5 max-h-64 overflow-y-auto scrollbar-thin">
                            {categories
                                .filter(cat => (counts.byCategory[cat.id] || 0) > 0)
                                .map((category) => {
                                    const count = counts.byCategory[category.id] || 0
                                    const isSelected = currentCategory === category.id
                                    return (
                                        <Link
                                            key={category.id}
                                            href={
                                                isSelected
                                                    ? buildFilterUrl(currentType, null)
                                                    : buildFilterUrl(currentType, category.id)
                                            }
                                            className={filterRowCls(isSelected)}
                                        >
                                            <span className={labelCls}>{category.name}</span>
                                            <span className={countCls}>{count}</span>
                                        </Link>
                                    )
                                })}
                        </div>
                    </div>
                </div>

                <div className="border-t border-[var(--hair)]" />

                {/* Starter Kits Widget */}
                {collections.length > 0 && (
                    <div>
                        <h3 className={`${headingCls} mb-3`}>Starter Kits</h3>
                        <div className="space-y-2">
                            {collections.slice(0, 3).map((collection) => (
                                <Link
                                    key={collection.id}
                                    href={`/skills/starter-kits#${collection.id}`}
                                    className="block border border-[var(--hair)] p-3 transition-colors duration-150 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)]"
                                >
                                    <span className="font-[family-name:var(--font-display)] font-normal text-sm text-[var(--ink)]">
                                        {collection.name}
                                    </span>
                                    <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)] mt-1 line-clamp-1">
                                        {collection.skill_count || 0} skills included
                                    </p>
                                </Link>
                            ))}
                        </div>
                        <Link
                            href="/stackshack/starter-kits"
                            className="block mt-3 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
                        >
                            Browse all kits &rarr;
                        </Link>
                    </div>
                )}

                <div className="border-t border-[var(--hair)]" />

                {/* Help Section */}
                <div>
                    <h3 className={`${headingCls} mb-3`}>Help</h3>
                    <div className="space-y-2">
                        <details className="group">
                            <summary className="cursor-pointer font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                                How to Install
                            </summary>
                            <div className="mt-2 text-xs space-y-2 text-[var(--muted)]">
                                <p>1. Click any skill to view details</p>
                                <p>2. Copy the install command</p>
                                <p>3. Run in your Claude Code project</p>
                            </div>
                        </details>
                        <details className="group">
                            <summary className="cursor-pointer font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                                Skills vs Agents
                            </summary>
                            <div className="mt-2 text-xs space-y-2 text-[var(--muted)]">
                                <p><strong className="text-[var(--ink)]">Skills:</strong> Single-purpose tools for specific tasks</p>
                                <p><strong className="text-[var(--ink)]">Agents:</strong> Multi-step workflows with decision-making</p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </aside>
    )
}

/**
 * Mobile filter button (minimal client interactivity via CSS)
 */
export function MobileFilterButton({
    currentType,
    currentCategory,
}: {
    currentType: string
    currentCategory: string | null
}) {
    const activeCount = (currentType !== 'all' ? 1 : 0) + (currentCategory ? 1 : 0)

    return (
        <Link
            href="/stackshack"
            className="lg:hidden flex items-center gap-2 px-4 py-2 border border-[var(--hair)] font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--body)] hover:border-[var(--hair-hard)] transition-colors"
        >
            <span>Filters</span>
            {activeCount > 0 && (
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-id8-orange">
                    {activeCount}
                </span>
            )}
        </Link>
    )
}
