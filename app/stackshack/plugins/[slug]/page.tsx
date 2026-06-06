import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ExternalLink, Github, CheckCircle } from 'lucide-react'
import { getPlugin, getAllPlugins, getPluginsByCategory } from '@/lib/plugins'
import { PluginCard } from '@/components/plugins/PluginCard'
import { PluginViewTracker } from './PluginViewTracker'
import { PluginInstallButton } from './PluginInstallButton'
import { Container, Kicker, Deck, Rule, SectionHead } from '@/components/editorial'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const plugin = await getPlugin(slug)

    if (!plugin) {
      return {
        title: 'Plugin Not Found',
      }
    }

    return {
      title: `${plugin.name} | Claude Code Plugin`,
      description: plugin.description,
      openGraph: {
        title: `${plugin.name} | StackShack`,
        description: plugin.description,
        type: 'article',
      },
    }
  } catch (error) {
    console.error('[generateMetadata] Error:', error)
    return {
      title: 'Plugin',
    }
  }
}

export async function generateStaticParams() {
  try {
    const plugins = await getAllPlugins()
    return plugins.map((plugin) => ({
      slug: plugin.slug,
    }))
  } catch {
    return []
  }
}

export default async function PluginDetailPage({ params }: PageProps) {
  const { slug } = await params
  const plugin = await getPlugin(slug)

  if (!plugin) {
    notFound()
  }

  // Get related plugins from the same category
  const relatedPlugins = await getPluginsByCategory(plugin.category)
  const filteredRelated = relatedPlugins.filter((p) => p.id !== plugin.id).slice(0, 3)

  const categoryDisplay = plugin.category.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')

  return (
    <main className="bg-[var(--paper)] pb-20">
      {/* Track view client-side */}
      <PluginViewTracker pluginId={plugin.id} />

      {/* Masthead */}
      <div className="border-b border-[var(--hair)]">
        <Container className="py-10 md:py-14">
          <Link
            href="/stackshack?tab=plugins"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange mb-7 transition-colors"
          >
            &larr; Back to Plugins
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            {/* Plugin Info */}
            <div className="flex-1">
              <Kicker className="mb-4">
                {categoryDisplay}
                {plugin.official && ' · Official'}
              </Kicker>

              <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-4">
                {plugin.name}
              </h1>

              <Deck className="max-w-2xl mb-6">{plugin.description}</Deck>

              <div className="flex flex-wrap items-center gap-3 mb-5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em]">
                {plugin.official && <span className="text-id8-orange">Official</span>}
                {plugin.verified && !plugin.official && <span className="text-teal">Verified</span>}
                {plugin.featured && <span className="text-id8-orange">Featured</span>}
                <span className="bg-[var(--paper-mid)] px-2 py-1 text-[var(--muted)]">{categoryDisplay}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-8 gap-y-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                <span><b className="font-medium text-[var(--ink)]">{plugin.install_count.toLocaleString()}</b> installs</span>
                <span><b className="font-medium text-[var(--ink)]">{plugin.view_count.toLocaleString()}</b> views</span>
              </div>
            </div>

            {/* Install Card */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="p-6 bg-[var(--paper-shadow)] border border-[var(--hair)]">
                <PluginInstallButton plugin={plugin} />

                <div className="mt-6 pt-6 border-t border-[var(--hair)] space-y-3 font-[family-name:var(--font-mono)] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Author</span>
                    <span className="text-[var(--ink)]">{plugin.author}</span>
                  </div>
                  {plugin.original_author && plugin.original_author !== plugin.author && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted)]">Original Author</span>
                      <span className="text-[var(--ink)]">{plugin.original_author}</span>
                    </div>
                  )}
                  {plugin.author_org && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted)]">Organization</span>
                      <span className={plugin.author_org === 'Anthropic' ? 'text-id8-orange' : 'text-[var(--ink)]'}>
                        {plugin.author_org}
                      </span>
                    </div>
                  )}
                  {plugin.created_at && (
                    <div className="flex items-center justify-between">
                      <span className="text-[var(--muted)]">Added</span>
                      <span className="text-[var(--ink)]">
                        {new Date(plugin.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {plugin.github_repo && (
                    <a
                      href={`https://github.com/${plugin.github_repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full mt-4 py-2 border border-[var(--hair)] text-[var(--body)] hover:border-id8-orange hover:text-id8-orange transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Install Command */}
            <section className="mb-10">
              <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-2">Installation</h2>
              <p className="text-sm text-[var(--muted)] mb-4">
                Run this command in your Claude Code terminal to install the plugin:
              </p>
              <div className="p-4 bg-[var(--paper-shadow)] border border-[var(--hair)] font-[family-name:var(--font-mono)] text-sm">
                <code className="text-id8-orange">{plugin.install_command}</code>
              </div>
              {plugin.slash_command && plugin.slash_command !== plugin.install_command && (
                <div className="mt-4">
                  <p className="text-sm text-[var(--muted)] mb-2">Or use the slash command:</p>
                  <div className="p-4 bg-[var(--paper-shadow)] border border-[var(--hair)] font-[family-name:var(--font-mono)] text-sm">
                    <code className="text-[var(--body)]">{plugin.slash_command}</code>
                  </div>
                </div>
              )}
            </section>

            {/* Use Cases */}
            {plugin.use_cases && plugin.use_cases.length > 0 && (
              <section className="mb-10">
                <h2 className="font-[family-name:var(--font-display)] font-normal text-xl text-[var(--ink)] mb-4">Use Cases</h2>
                <ul className="space-y-3">
                  {plugin.use_cases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                      <span className="text-[var(--body)]">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Tags */}
            {plugin.tags && plugin.tags.length > 0 && (
              <section className="mb-8">
                <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {plugin.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/stackshack/search?q=${encodeURIComponent(tag)}`}
                      className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Stats */}
            <section className="mb-8 p-4 bg-[var(--paper-shadow)] border border-[var(--hair)]">
              <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">
                Statistics
              </h3>
              <div className="space-y-3 font-[family-name:var(--font-mono)] text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Installs</span>
                  <span className="text-[var(--ink)]">{plugin.install_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Views</span>
                  <span className="text-[var(--ink)]">{plugin.view_count.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Category</span>
                  <span className="text-[var(--ink)]">{categoryDisplay}</span>
                </div>
              </div>
            </section>

            {/* Plugin Type Info */}
            <section className="p-4 bg-[var(--paper-shadow)] border border-[var(--hair)]">
              <h3 className="font-[family-name:var(--font-display)] font-normal text-[var(--ink)] mb-3">About Plugins</h3>
              <p className="text-sm text-[var(--body)] leading-relaxed">
                Plugins extend Claude Code with new capabilities. They can add agents,
                commands, hooks, and more. Install plugins to customize your workflow.
              </p>
            </section>
          </div>
        </div>

        {/* Related Plugins */}
        {filteredRelated.length > 0 && (
          <section className="mt-16">
            <Rule className="mb-10" />
            <SectionHead title={<>Related <em className="italic text-id8-orange">plugins</em></>} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {filteredRelated.map((related) => (
                <PluginCard key={related.id} plugin={related} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </main>
  )
}
