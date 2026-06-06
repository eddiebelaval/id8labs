import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Terminal, ExternalLink } from 'lucide-react'
import { getCommand, getAllCommands } from '@/lib/commands'
import { AddToStackButton } from '@/components/commands/AddToStackButton'
import { Container, Kicker, Deck, SectionHead } from '@/components/editorial'

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const commands = await getAllCommands()
  return commands.map((command) => ({
    slug: command.slug,
  }))
}

const cardCls = 'border border-[var(--hair)] p-6'
const codeBlockCls = 'p-4 bg-[var(--paper-shadow)] border border-[var(--hair)]'

export default async function CommandDetailPage({ params }: PageProps) {
  const { slug } = await params
  const command = await getCommand(slug)

  if (!command) {
    notFound()
  }

  return (
    <div className="relative bg-[var(--paper)]">
      {/* Back Button */}
      <section className="py-8 border-b border-[var(--hair)]">
        <Container>
          <Link
            href="/commands"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange transition-colors"
          >
            &larr; Back to Commands
          </Link>
        </Container>
      </section>

      {/* Masthead */}
      <section className="py-12 md:py-16 border-b border-[var(--hair)]">
        <Container>
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-5 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em]">
              {command.verified && <span className="text-teal">Verified</span>}
              <span className="bg-[var(--paper-mid)] px-2 py-1 text-[var(--muted)]">{command.category}</span>
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] normal-case tracking-normal">
                {command.install_count.toLocaleString()} installs
              </span>
            </div>

            <Kicker className="mb-4">Command</Kicker>
            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] leading-[1.05] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-4">
              {command.name}
            </h1>

            <Deck className="max-w-2xl mb-8">{command.description}</Deck>

            <div className="flex flex-wrap gap-4">
              <AddToStackButton command={command} />
            </div>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Command */}
              <div className={cardCls}>
                <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4 flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-id8-orange" />
                  Command
                </h2>
                <div className={codeBlockCls}>
                  <code className="text-sm font-[family-name:var(--font-mono)] text-[var(--body)] break-all">
                    {command.command}
                  </code>
                </div>
              </div>

              {/* Installation */}
              <div className={cardCls}>
                <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">Installation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2">
                      Via StackShack CLI
                    </h3>
                    <div className={codeBlockCls}>
                      <code className="text-sm font-[family-name:var(--font-mono)] text-id8-orange">
                        npx stackshack install {command.slug}
                      </code>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)] mb-2">
                      Manual Installation
                    </h3>
                    <p className="text-sm text-[var(--muted)] mb-2">
                      Copy and run the command in your terminal:
                    </p>
                    <div className={codeBlockCls}>
                      <code className="text-sm font-[family-name:var(--font-mono)] text-[var(--body)] break-all">
                        {command.command}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              {command.prerequisites && command.prerequisites.length > 0 && (
                <div className={cardCls}>
                  <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">Prerequisites</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {command.prerequisites.map((prereq) => (
                      <span
                        key={prereq}
                        className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]"
                      >
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {command.tags && command.tags.length > 0 && (
                <div className={cardCls}>
                  <h2 className="font-[family-name:var(--font-display)] font-normal text-2xl text-[var(--ink)] mb-4">Tags</h2>
                  <div className="flex flex-wrap gap-1.5">
                    {command.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[var(--paper-mid)] px-2 py-1 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className={cardCls}>
                <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <AddToStackButton command={command} fullWidth />
                  <Link
                    href="/commands"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-[var(--ink)] font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors duration-150"
                  >
                    Browse All Commands
                  </Link>
                </div>
              </div>

              {/* Stats */}
              <div className={cardCls}>
                <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] mb-4">Stats</h3>
                <div className="space-y-3 font-[family-name:var(--font-mono)] text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Installs</span>
                    <span className="text-[var(--ink)]">{command.install_count.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Category</span>
                    <span className="text-[var(--ink)] capitalize">{command.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--muted)]">Status</span>
                    <span className="text-teal capitalize">{command.status}</span>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className={cardCls}>
                <h3 className="font-[family-name:var(--font-display)] font-normal text-[var(--ink)] mb-2">Need Help?</h3>
                <p className="text-sm text-[var(--body)] mb-4">
                  Check our documentation or reach out to the community.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange"
                >
                  Get Support
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Commands Section */}
      <section className="py-12 md:py-16 border-t border-[var(--hair)]">
        <Container>
          <SectionHead title={<>More {command.category} <em className="italic text-id8-orange">commands</em></>} className="mb-8" />
          <div className="text-center py-8">
            <Link
              href={`/commands?category=${command.category}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 border font-[family-name:var(--font-narrow)] text-xs font-bold uppercase tracking-[0.18em] transition-colors duration-150 bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange"
            >
              Browse {command.category} Commands
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
