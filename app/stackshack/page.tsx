import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  getAllSkills,
  getAllCategories,
  getAllCollections,
  getSkillCounts,
} from '@/lib/skills'
import { getAllCommands, getCommandCategories } from '@/lib/commands'
import { getAllSettings, getSettingCategories } from '@/lib/settings'
import { getAllPlugins, getPluginCategories } from '@/lib/plugins'
import { getPublicStacks } from '@/lib/stacks-db'
import { SkillCard } from '@/components/skills/SkillCard'
import { CommandCard } from '@/components/commands/CommandCard'
import { SettingCard } from '@/components/settings/SettingCard'
import { PluginCard } from '@/components/plugins/PluginCard'
import { GalleryStackCard } from '@/components/gallery/GalleryStackCard'
import { SkillSearchBar } from '@/components/skills/SkillSearchBar'
import { StackShackLogo } from '@/components/StackShackLogo'
import { ServerSkillsGrid } from '@/components/skills/ServerSkillsGrid'
import dynamic from 'next/dynamic'
const StackBuilder = dynamic(() => import('@/components/stack/StackBuilder').then(m => m.StackBuilder), { ssr: false })
import { MarketplaceTabs, type MarketplaceTab } from '@/components/stackshack/MarketplaceTabs'
import { MarketplaceSidebar } from '@/components/stackshack/MarketplaceSidebar'
import { GenerateToolButton } from '@/components/tool-factory'
import {
  Container,
  Kicker,
  Deck,
  Rule,
  SectionHead,
  MetaRow,
  EditorialButton,
  EditorialCard,
} from '@/components/editorial'

export const revalidate = 3600

interface PageProps {
  searchParams: Promise<{ tab?: MarketplaceTab; type?: string; category?: string }>
}

// Every filtered view of the marketplace (?tab=, ?type=, ?category=) is the
// same page pre-filtered. Without a canonical, Google indexed each combination
// as its own not-indexed URL under one shared title. Point all of them,
// including the unfiltered base page, at the one URL that should rank.
export async function generateMetadata(): Promise<Metadata> {
  return {
    alternates: {
      canonical: 'https://id8labs.app/stackshack',
    },
  }
}

export default async function StackShackMarketplacePage({
  searchParams,
  basePath = '/stackshack',
}: PageProps & { basePath?: string }) {
  const params = await searchParams
  const activeTab = params?.tab || 'skills'
  const typeFilter = params?.type || 'all'
  const categoryFilter = params?.category || null

  const [
    allSkills,
    categories,
    collections,
    skillCounts,
    allCommands,
    commandCategories,
    allSettings,
    settingCategories,
    allPlugins,
    pluginCategories,
    publicStacks,
  ] = await Promise.all([
    getAllSkills(),
    getAllCategories(),
    getAllCollections(true),
    getSkillCounts(),
    getAllCommands(),
    getCommandCategories(),
    getAllSettings(),
    getSettingCategories(),
    getAllPlugins(),
    getPluginCategories(),
    getPublicStacks(50),
  ])

  const tabCounts = {
    skills: skillCounts.published,
    commands: allCommands.length,
    settings: allSettings.length,
    plugins: allPlugins.length,
    kits: collections.length,
  }

  let filteredSkills = allSkills
  if (typeFilter === 'skills') {
    filteredSkills = filteredSkills.filter((s) => !s.tags?.includes('agent'))
  } else if (typeFilter === 'agents') {
    filteredSkills = filteredSkills.filter((s) => s.tags?.includes('agent'))
  }
  if (categoryFilter && activeTab === 'skills') {
    filteredSkills = filteredSkills.filter((s) => s.category_id === categoryFilter)
  }

  let filteredCommands = allCommands
  if (categoryFilter && activeTab === 'commands') {
    filteredCommands = allCommands.filter((c) => c.category === categoryFilter)
  }

  let filteredSettings = allSettings
  if (categoryFilter && activeTab === 'settings') {
    filteredSettings = allSettings.filter((s) => s.category === categoryFilter)
  }

  let filteredPlugins = allPlugins
  if (categoryFilter && activeTab === 'plugins') {
    filteredPlugins = allPlugins.filter((p) => p.category === categoryFilter)
  }

  const skillsCount = allSkills.filter((s) => !s.tags?.includes('agent')).length
  const agentsCount = allSkills.filter((s) => s.tags?.includes('agent')).length
  const totalTools =
    tabCounts.skills + tabCounts.commands + tabCounts.settings + tabCounts.plugins

  return (
    <div className="relative bg-[var(--paper)]">
      <StackBuilder />

      {/* Masthead */}
      <section className="border-b border-[var(--hair)] py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker dot className="mb-6 justify-center">
              The Lab · Marketplace · {totalTools}+ tools
            </Kicker>

            <h1 className="mb-5">
              <StackShackLogo size="xl" />
            </h1>

            <Deck className="mx-auto max-w-2xl mb-9">
              Free skills, commands, and settings for Claude Code. Build your
              stack, ship faster.
            </Deck>

            <div className="flex justify-center mb-7">
              <div className="w-full max-w-xl">
                <Suspense fallback={<div className="h-14 border border-[var(--hair)]" />}>
                  <SkillSearchBar placeholder="Search all tools..." />
                </Suspense>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-3">
              <GenerateToolButton variant="primary" />
              <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-teal">
                100% Free
              </span>
              <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
                Verified
              </span>
            </div>
          </div>
        </Container>
      </section>

      <MarketplaceTabs activeTab={activeTab} counts={tabCounts} basePath={basePath} />

      <section className="py-10 md:py-14">
        <Container>
          <div className="flex gap-10">
            <MarketplaceSidebar
              activeTab={activeTab}
              basePath={basePath}
              skillCategories={categories}
              collections={collections}
              skillCounts={{
                total: skillCounts.published,
                skills: skillsCount,
                agents: agentsCount,
                byCategory: skillCounts.byCategory,
              }}
              commandCategories={commandCategories}
              settingCategories={settingCategories}
              pluginCategories={pluginCategories}
              kitsCount={collections.length}
              currentType={typeFilter}
              currentCategory={categoryFilter}
            />

            <div className="flex-1 min-w-0">
              {activeTab === 'skills' && (
                <ServerSkillsGrid skills={filteredSkills} totalCount={skillCounts.published} />
              )}

              {activeTab === 'commands' && (
                <div>
                  <div className="mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    Showing <span className="text-[var(--ink)]">{filteredCommands.length}</span> of{' '}
                    <span className="text-[var(--ink)]">{allCommands.length}</span> commands
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredCommands.map((command) => (
                      <CommandCard key={command.id} command={command} />
                    ))}
                  </div>
                  {filteredCommands.length === 0 && (
                    <div className="text-center py-12 text-[var(--muted)]">
                      No commands found in this category.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <div className="mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    Showing <span className="text-[var(--ink)]">{filteredSettings.length}</span> of{' '}
                    <span className="text-[var(--ink)]">{allSettings.length}</span> settings
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredSettings.map((setting) => (
                      <SettingCard key={setting.id} setting={setting} />
                    ))}
                  </div>
                  {filteredSettings.length === 0 && (
                    <div className="text-center py-12 text-[var(--muted)]">
                      No settings found in this category.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'plugins' && (
                <div>
                  <SectionHead
                    title={<>Claude Code <em className="italic text-id8-orange">plugins</em></>}
                    meta={`${allPlugins.filter(p => p.official).length} official`}
                  />
                  <div className="mt-5 mb-6 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                    Showing <span className="text-[var(--ink)]">{filteredPlugins.length}</span> of{' '}
                    <span className="text-[var(--ink)]">{allPlugins.length}</span> plugins
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredPlugins.map((plugin) => (
                      <PluginCard key={plugin.id} plugin={plugin} />
                    ))}
                  </div>
                  {filteredPlugins.length === 0 && (
                    <div className="text-center py-12 text-[var(--muted)]">
                      No plugins found in this category.
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'kits' && (
                <div>
                  <SectionHead
                    title={<>Starter <em className="italic text-id8-orange">kits</em></>}
                    meta={`${collections.length} kits`}
                  />
                  <p className="mt-5 mb-8 text-[var(--muted)]">
                    Pre-configured tool bundles for common workflows. Copy the prompt into Claude Code to install.
                  </p>
                  {collections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {collections.map((kit) => {
                        const isConfiguration = kit.content_type === 'configuration'
                        return (
                          <EditorialCard key={kit.id} href={`/stackshack/starter-kits/${kit.slug}`} className="h-full">
                            <Kicker className="mb-3">
                              {isConfiguration ? 'Configuration' : `${kit.skill_count || 0} skills`}
                            </Kicker>
                            <h3 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">
                              {kit.name}
                            </h3>
                            <p className="text-sm text-[var(--body)] leading-relaxed line-clamp-2">
                              {kit.description}
                            </p>
                          </EditorialCard>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16 border border-[var(--hair)]">
                      <h3 className="font-[family-name:var(--font-display)] font-normal text-xl mb-2 text-[var(--ink)]">No starter kits yet</h3>
                      <p className="text-[var(--muted)]">
                        Check back soon for curated tool bundles.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <Rule />

      <section className="py-16 md:py-20">
        <Container narrow>
          <div className="text-center">
            <SectionHead
              title={<>Build your stack. <em className="italic text-id8-orange">Ship faster.</em></>}
              className="border-0 pb-0 justify-center"
            />
            <p className="mt-7 mb-9 text-lg text-[var(--muted)]">
              All tools are 100% free. Add to your stack and install in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
              <EditorialButton href="/stackshack/starter-kits">Browse Starter Kits</EditorialButton>
              <EditorialButton href="/stackshack?tab=skills" variant="secondary">
                View All Skills
              </EditorialButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
