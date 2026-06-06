import { Suspense } from 'react'
import { Settings, Search } from 'lucide-react'
import { getAllSettings, getSettingCategories } from '@/lib/settings'
import { SettingCard } from '@/components/settings/SettingCard'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function SettingsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const categoryFilter = params.category || null

  const [allSettings, categories] = await Promise.all([
    getAllSettings(),
    getSettingCategories(),
  ])

  // Filter by category if specified
  const filteredSettings = categoryFilter
    ? allSettings.filter((setting) => setting.category === categoryFilter)
    : allSettings

  const categoryNames = Object.keys(categories).sort()

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 border-b border-[var(--rule)]">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-id8-orange font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] border border-id8-orange">
              <Settings className="w-3.5 h-3.5" />
              <span>{allSettings.length} Configuration Settings</span>
            </div>

            {/* Title */}
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-normal tracking-[-0.02em] mb-6 text-[var(--ink)]">
              Configuration Settings
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[var(--muted)] mb-10 max-w-2xl mx-auto">
              Optimize your AI workflow with pre-configured settings
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container">
          {/* Category Filters */}
          <div className="mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href="/settings"
                className={`px-4 py-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-150 ${
                  !categoryFilter
                    ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]'
                    : 'bg-transparent border border-[var(--hair)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                }`}
              >
                All ({allSettings.length})
              </a>
              {categoryNames.map((category) => (
                <a
                  key={category}
                  href={`/settings?category=${category}`}
                  className={`px-4 py-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-150 ${
                    categoryFilter === category
                      ? 'bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)]'
                      : 'bg-transparent border border-[var(--hair)] text-[var(--muted)] hover:border-[var(--ink)] hover:text-[var(--ink)]'
                  }`}
                >
                  {category} ({categories[category]})
                </a>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6 font-[family-name:var(--font-mono)] text-sm text-[var(--muted)]">
            {filteredSettings.length === allSettings.length
              ? `Showing all ${allSettings.length} settings`
              : `Showing ${filteredSettings.length} ${categoryFilter} settings`}
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSettings.map((setting) => (
              <SettingCard key={setting.id} setting={setting} />
            ))}
          </div>

          {/* Empty State */}
          {filteredSettings.length === 0 && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 mx-auto mb-4 text-[var(--muted)]" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-normal mb-2 text-[var(--ink)]">No settings found</h3>
              <p className="text-[var(--muted)] mb-6">
                Try a different category or view all settings
              </p>
              <a
                href="/settings"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150"
              >
                View All Settings
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-[var(--rule)] bg-[var(--paper-shadow)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-normal tracking-[-0.02em] mb-6 text-[var(--ink)]">
              Install with StackShack CLI
            </h2>
            <p className="text-xl text-[var(--muted)] mb-8">
              All settings available via our CLI tool
            </p>
            <div className="p-6 bg-[var(--paper)] border border-[var(--hair)] text-left">
              <code className="text-sm font-[family-name:var(--font-mono)] text-id8-orange">
                npx stackshack install claude-opus-max-quality
              </code>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
