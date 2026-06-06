import Link from 'next/link'

export type MarketplaceTab = 'skills' | 'commands' | 'settings' | 'plugins' | 'kits'

interface TabConfig {
  id: MarketplaceTab
  label: string
  count?: number
}

interface MarketplaceTabsProps {
  activeTab?: MarketplaceTab
  basePath?: string
  counts?: {
    skills?: number
    commands?: number
    settings?: number
    plugins?: number
    kits?: number
  }
}

export function MarketplaceTabs({ activeTab = 'skills', counts, basePath = '/stackshack' }: MarketplaceTabsProps) {

  const tabs: TabConfig[] = [
    { id: 'skills', label: 'Skills', count: counts?.skills },
    { id: 'commands', label: 'Commands', count: counts?.commands },
    { id: 'settings', label: 'Settings', count: counts?.settings },
    { id: 'plugins', label: 'Plugins', count: counts?.plugins },
    { id: 'kits', label: 'Starter Kits', count: counts?.kits },
  ]

  return (
    <div className="sticky top-0 z-30 bg-[var(--paper)] border-b border-[var(--rule)]">
      <div className="mx-auto w-full px-6 md:px-9" style={{ maxWidth: '1200px' }}>
        <nav className="flex items-center justify-center gap-7 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const href = tab.id === 'skills' ? basePath : basePath + '?tab=' + tab.id

            return (
              <Link
                key={tab.id}
                href={href}
                className={
                  'flex items-center gap-2 py-4 -mb-px border-b-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-150 ' +
                  (isActive
                    ? 'border-id8-orange text-id8-orange'
                    : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]')
                }
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                    {tab.count}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
