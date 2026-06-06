import Link from 'next/link'
import type { SkillCategory, SkillCollection } from '@/lib/skill-types'
import type { MarketplaceTab } from './MarketplaceTabs'

interface MarketplaceSidebarProps {
  activeTab: MarketplaceTab
  basePath?: string
  skillCategories?: SkillCategory[]
  collections?: SkillCollection[]
  skillCounts?: {
    total: number
    skills: number
    agents: number
    byCategory: Record<string, number>
  }
  commandCategories?: Record<string, number>
  settingCategories?: Record<string, number>
  pluginCategories?: Record<string, number>
  kitsCount?: number
  currentType?: string
  currentCategory?: string | null
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

export function MarketplaceSidebar({
  activeTab,
  basePath = '/stackshack',
  skillCategories = [],
  collections = [],
  skillCounts,
  commandCategories = {},
  settingCategories = {},
  pluginCategories = {},
  kitsCount = 0,
  currentType = 'all',
  currentCategory = null,
}: MarketplaceSidebarProps) {
  const buildFilterUrl = (type?: string, category?: string | null) => {
    const params = new URLSearchParams()
    if (activeTab !== 'skills') {
      params.set('tab', activeTab)
    }
    const targetType = type ?? currentType
    const targetCategory = category === undefined ? currentCategory : category
    if (targetType && targetType !== 'all') {
      params.set('type', targetType)
    }
    if (targetCategory) {
      params.set('category', targetCategory)
    }
    const queryString = params.toString()
    return basePath + (queryString ? '?' + queryString : '')
  }

  const hasActiveFilters = currentType !== 'all' || currentCategory !== null
  const clearUrl = activeTab === 'skills' ? basePath : basePath + '?tab=' + activeTab

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-20 space-y-7 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
        <div className="space-y-7">
          <div className="flex items-center justify-between">
            <h3 className={headingCls}>Filters</h3>
            {hasActiveFilters && (
              <Link
                href={clearUrl}
                className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-id8-orange"
              >
                Clear
              </Link>
            )}
          </div>

          {activeTab === 'skills' && skillCounts && (
            <>
              <div>
                <h4 className={`${headingCls} mb-3`}>Categories</h4>
                <div className="space-y-0.5">
                  <Link href={buildFilterUrl(currentType, null)} className={filterRowCls(!currentCategory)}>
                    <span className={labelCls}>All Skills</span>
                    <span className={countCls}>{skillCounts.total}</span>
                  </Link>
                  {skillCategories
                    .filter(cat => (skillCounts.byCategory[cat.id] || 0) > 0)
                    .map((category) => {
                      const count = skillCounts.byCategory[category.id] || 0
                      const isSelected = currentCategory === category.id
                      return (
                        <Link
                          key={category.id}
                          href={isSelected ? buildFilterUrl(currentType, null) : buildFilterUrl(currentType, category.id)}
                          className={filterRowCls(isSelected)}
                        >
                          <span className={labelCls}>{category.name}</span>
                          <span className={countCls}>{count}</span>
                        </Link>
                      )
                    })}
                </div>
              </div>
              <div className="border-t border-[var(--hair)]" />
              <div>
                <h4 className={`${headingCls} mb-3`}>Type</h4>
                <div className="space-y-0.5">
                  <Link href={buildFilterUrl('all', currentCategory)} className={filterRowCls(currentType === 'all')}>
                    <span className={labelCls}>All Items</span>
                    <span className={countCls}>{skillCounts.total}</span>
                  </Link>
                  <Link href={buildFilterUrl('skills', currentCategory)} className={filterRowCls(currentType === 'skills')}>
                    <span className={labelCls}>Skills Only</span>
                    <span className={countCls}>{skillCounts.skills}</span>
                  </Link>
                  <Link href={buildFilterUrl('agents', currentCategory)} className={filterRowCls(currentType === 'agents')}>
                    <span className={labelCls}>Agents Only</span>
                    <span className={countCls}>{skillCounts.agents}</span>
                  </Link>
                </div>
              </div>
            </>
          )}

          {activeTab === 'commands' && (
            <div>
              <h4 className={`${headingCls} mb-3`}>Categories</h4>
              <div className="space-y-0.5">
                <Link href={basePath + '?tab=commands'} className={filterRowCls(!currentCategory)}>
                  <span className={labelCls}>All Commands</span>
                  <span className={countCls}>
                    {Object.values(commandCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(commandCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const isSelected = currentCategory === category
                    return (
                      <Link
                        key={category}
                        href={isSelected ? basePath + '?tab=commands' : basePath + '?tab=commands&category=' + category}
                        className={filterRowCls(isSelected)}
                      >
                        <span className={labelCls}>{category}</span>
                        <span className={countCls}>{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h4 className={`${headingCls} mb-3`}>Categories</h4>
              <div className="space-y-0.5">
                <Link href={basePath + '?tab=settings'} className={filterRowCls(!currentCategory)}>
                  <span className={labelCls}>All Settings</span>
                  <span className={countCls}>
                    {Object.values(settingCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(settingCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const isSelected = currentCategory === category
                    return (
                      <Link
                        key={category}
                        href={isSelected ? basePath + '?tab=settings' : basePath + '?tab=settings&category=' + category}
                        className={filterRowCls(isSelected)}
                      >
                        <span className={labelCls}>{category}</span>
                        <span className={countCls}>{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'plugins' && (
            <div>
              <h4 className={`${headingCls} mb-3`}>Categories</h4>
              <div className="space-y-0.5">
                <Link href={basePath + '?tab=plugins'} className={filterRowCls(!currentCategory)}>
                  <span className={labelCls}>All Plugins</span>
                  <span className={countCls}>
                    {Object.values(pluginCategories).reduce((a, b) => a + b, 0)}
                  </span>
                </Link>
                {Object.entries(pluginCategories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([category, count]) => {
                    const isSelected = currentCategory === category
                    const displayName = category.split('-').map(word =>
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')
                    return (
                      <Link
                        key={category}
                        href={isSelected ? basePath + '?tab=plugins' : basePath + '?tab=plugins&category=' + category}
                        className={filterRowCls(isSelected)}
                      >
                        <span className={labelCls}>{displayName}</span>
                        <span className={countCls}>{count}</span>
                      </Link>
                    )
                  })}
              </div>
            </div>
          )}

          {activeTab === 'kits' && (
            <div>
              <h4 className={`${headingCls} mb-3`}>Browse</h4>
              <div className="space-y-0.5">
                <Link href={basePath + '?tab=kits'} className={filterRowCls(true)}>
                  <span className={labelCls}>All Starter Kits</span>
                  <span className={countCls}>{kitsCount}</span>
                </Link>
              </div>
              <p className="mt-4 text-xs text-[var(--muted)]">
                Pre-configured tool bundles for common workflows.
              </p>
            </div>
          )}
        </div>

        {activeTab === 'skills' && collections.length > 0 && (
          <>
            <div className="border-t border-[var(--hair)]" />
            <div>
              <h3 className={`${headingCls} mb-3`}>Starter Kits</h3>
              <div className="space-y-2">
                {collections.slice(0, 3).map((collection) => (
                  <Link
                    key={collection.id}
                    href={`${basePath}/starter-kits#${collection.id}`}
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
                href={`${basePath}/starter-kits`}
                className="block mt-3 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
              >
                Browse all kits &rarr;
              </Link>
            </div>
          </>
        )}

        <div className="border-t border-[var(--hair)]" />

        <div>
          <h3 className={`${headingCls} mb-3`}>Help</h3>
          <div className="space-y-2 text-sm text-[var(--body)]">
            <details className="group">
              <summary className="cursor-pointer font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                How to Install
              </summary>
              <div className="mt-2 text-xs space-y-2 text-[var(--muted)]">
                <p>1. Click any item to view details</p>
                <p>2. Copy the install command</p>
                <p>3. Run in your Claude Code project</p>
              </div>
            </details>
            {activeTab === 'skills' && (
              <details className="group">
                <summary className="cursor-pointer font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                  Skills vs Agents
                </summary>
                <div className="mt-2 text-xs space-y-2 text-[var(--muted)]">
                  <p><strong className="text-[var(--ink)]">Skills:</strong> Single-purpose tools for specific tasks</p>
                  <p><strong className="text-[var(--ink)]">Agents:</strong> Multi-step workflows with decision-making</p>
                </div>
              </details>
            )}
            {activeTab === 'kits' && (
              <details className="group">
                <summary className="cursor-pointer font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors">
                  About Starter Kits
                </summary>
                <div className="mt-2 text-xs space-y-2 text-[var(--muted)]">
                  <p><strong className="text-[var(--ink)]">Kits:</strong> Pre-configured tool bundles</p>
                  <p><strong className="text-[var(--ink)]">Install:</strong> Paste prompt into Claude Code</p>
                </div>
              </details>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
