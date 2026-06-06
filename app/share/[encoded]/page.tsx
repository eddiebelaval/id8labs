import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Package, ArrowLeft } from 'lucide-react'
import { decodeStackData } from '@/lib/utils/share'
import { ImportStackButton } from '@/components/stack/ImportStackButton'
import { StackStats, buildStackStats, groupItemsByType } from '@/components/stack/StackStats'
import { StackItemSection } from '@/components/stack/StackItemSection'

interface PageProps {
  params: Promise<{ encoded: string }>
}

export default async function SharedStackPage({ params }: PageProps): Promise<React.ReactElement> {
  const { encoded } = await params
  const stack = decodeStackData(encoded)

  if (!stack) {
    notFound()
  }

  const { skills, agents, commands, settings } = groupItemsByType(stack.items)
  const stats = buildStackStats(stack.items)

  return (
    <main className="relative">
      {/* Back Button */}
      <section className="py-8 border-b border-[var(--hair)]">
        <div className="container">
          <Link
            href="/stackshack"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] hover:text-id8-orange transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Browse StackShack
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 border-b border-[var(--rule)]">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex p-4 bg-[var(--paper-shadow)] mb-6">
              <Package className="w-12 h-12 text-id8-orange" />
            </div>

            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-normal tracking-[-0.02em] mb-4 text-[var(--ink)]">{stack.name}</h1>

            {stack.description && (
              <p className="text-xl text-[var(--muted)] mb-8 max-w-2xl mx-auto">
                {stack.description}
              </p>
            )}

            <StackStats stats={stats} />

            <div className="flex flex-wrap items-center justify-center gap-4">
              <ImportStackButton stack={stack} />
            </div>
          </div>
        </div>
      </section>

      {/* Stack Contents */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Stack Contents</h2>

            <div className="space-y-6">
              <StackItemSection title="Skills" emoji="🎯" items={skills} />
              <StackItemSection title="Agents" emoji="🤖" items={agents} />
              <StackItemSection title="Commands" emoji="⚡" items={commands} />
              <StackItemSection title="Settings" emoji="⚙️" items={settings} />
            </div>
          </div>
        </div>
      </section>

      {/* How to Install */}
      <section className="py-16 bg-[var(--bg-secondary)]">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Install?</h2>
            <p className="text-xl text-[var(--text-secondary)] mb-8">
              Import this stack to your collection and install everything at once.
            </p>
            <ImportStackButton stack={stack} />
          </div>
        </div>
      </section>
    </main>
  )
}
