import Link from 'next/link'
import { Metadata } from 'next'
import { getTrendingItems, getFeaturedItems, getRisingStars, getLeaderboard, type TrendingItem, type TrendingItemType } from '@/lib/trending'
import { StackShackLogo } from '@/components/StackShackLogo'
import dynamic from 'next/dynamic'
const StackBuilder = dynamic(() => import('@/components/stack/StackBuilder').then(m => m.StackBuilder), { ssr: false })
import { TrendingItemCard } from './TrendingItemCard'
import { Container, Kicker, Deck, Rule, SectionHead, EditorialButton } from '@/components/editorial'

export const metadata: Metadata = {
  title: 'Trending | StackShack',
  description: 'Discover the most popular skills, commands, settings, and plugins for Claude Code.',
}

export const revalidate = 3600 // Revalidate every hour

interface PageProps {
  searchParams: Promise<{ type?: TrendingItemType | 'all' }>
}

const TYPE_LABEL: Record<string, string> = {
  all: 'All',
  skill: 'Skills',
  command: 'Commands',
  setting: 'Settings',
  plugin: 'Plugins',
}

export default async function TrendingPage({ searchParams }: PageProps) {
  const params = await searchParams
  const activeType = params?.type || 'all'

  // Fetch data in parallel
  const [featured, trending, risingStars, skillLeaders, commandLeaders, settingLeaders, pluginLeaders] = await Promise.all([
    getFeaturedItems(6),
    getTrendingItems({ type: activeType, limit: 24 }),
    getRisingStars(8),
    getLeaderboard('skill', 5),
    getLeaderboard('command', 5),
    getLeaderboard('setting', 5),
    getLeaderboard('plugin', 5),
  ])

  return (
    <div className="relative bg-[var(--paper)]">
      <StackBuilder />

      {/* Masthead */}
      <section className="border-b border-[var(--hair)] py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Kicker dot className="mb-6 justify-center">Marketplace · Popular tools</Kicker>
            <h1 className="font-[family-name:var(--font-display)] font-normal tracking-[-0.02em] text-[var(--ink)] text-[clamp(2.25rem,5vw,3.5rem)] mb-5">
              Trending on <StackShackLogo size="lg" />
            </h1>
            <Deck className="mx-auto max-w-2xl">
              What the community is using. The most popular tools for Claude Code, all in one place.
            </Deck>
          </div>
        </Container>
      </section>

      {/* Featured Section */}
      {featured.length > 0 && (
        <section className="py-12 border-b border-[var(--hair)]">
          <Container>
            <SectionHead title={<>Featured</>} className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} featured />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Type Filter Tabs */}
      <section className="sticky top-0 z-30 bg-[var(--paper)] border-b border-[var(--rule)]">
        <Container>
          <nav className="flex items-center justify-center gap-7 overflow-x-auto scrollbar-hide">
            {Object.entries(TYPE_LABEL).map(([type, label]) => {
              const isActive = activeType === type
              const href = type === 'all' ? '/stackshack/trending' : `/stackshack/trending?type=${type}`

              return (
                <Link
                  key={type}
                  href={href}
                  className={
                    'py-4 -mb-px border-b-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.18em] whitespace-nowrap transition-colors duration-150 ' +
                    (isActive
                      ? 'border-id8-orange text-id8-orange'
                      : 'border-transparent text-[var(--muted)] hover:text-[var(--ink)]')
                  }
                >
                  {label}
                </Link>
              )
            })}
          </nav>
        </Container>
      </section>

      {/* Main Trending Section */}
      <section className="py-12">
        <Container>
          <SectionHead
            title={activeType === 'all' ? <>Trending <em className="italic text-id8-orange">now</em></> : <>Trending {TYPE_LABEL[activeType]}</>}
            className="mb-8"
          />
          {trending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {trending.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--muted)] border border-[var(--hair)]">
              No trending items found.
            </div>
          )}
        </Container>
      </section>

      {/* Rising Stars */}
      {risingStars.length > 0 && (
        <section className="py-12 border-t border-[var(--hair)]">
          <Container>
            <SectionHead title={<>Rising <em className="italic text-id8-orange">stars</em></>} meta="Last 30 days" className="mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {risingStars.map((item) => (
                <TrendingItemCard key={`${item.type}-${item.id}`} item={item} showBadge="new" />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Leaderboards */}
      <section className="py-12 border-t border-[var(--hair)]">
        <Container>
          <SectionHead title={<>Leaderboards</>} className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <LeaderboardCard title="Top Skills" items={skillLeaders} href="/stackshack?tab=skills" />
            <LeaderboardCard title="Top Commands" items={commandLeaders} href="/stackshack?tab=commands" />
            <LeaderboardCard title="Top Settings" items={settingLeaders} href="/stackshack?tab=settings" />
            <LeaderboardCard title="Top Plugins" items={pluginLeaders} href="/stackshack?tab=plugins" />
          </div>
        </Container>
      </section>

      <Rule />

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container narrow>
          <div className="text-center">
            <SectionHead
              title={<>Build your stack. <em className="italic text-id8-orange">Ship faster.</em></>}
              className="border-0 pb-0 justify-center"
            />
            <p className="mt-7 mb-9 text-lg text-[var(--muted)]">
              All tools are 100% free. Add trending tools to your stack and install in seconds.
            </p>
            <EditorialButton href="/stackshack">Browse All Tools</EditorialButton>
          </div>
        </Container>
      </section>
    </div>
  )
}

// Leaderboard Card Component
function LeaderboardCard({
  title,
  items,
  href,
}: {
  title: string
  items: TrendingItem[]
  href: string
}) {
  return (
    <div className="border border-[var(--hair)]">
      <div className="p-4 border-b border-[var(--hair)]">
        <h3 className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{title}</h3>
      </div>
      <div className="divide-y divide-[var(--hair)]">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={getItemHref(item)}
            className="flex items-center gap-3 p-3 hover:bg-[var(--paper-shadow)] transition-colors"
          >
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] w-5 text-right">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-[family-name:var(--font-display)] font-normal text-sm text-[var(--ink)] truncate">{item.name}</p>
              <p className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--muted)]">
                {item.install_count.toLocaleString()} installs
              </p>
            </div>
            {item.official && <span className="font-[family-name:var(--font-narrow)] text-[9px] font-semibold uppercase tracking-[0.15em] text-id8-orange">Official</span>}
            {item.verified && !item.official && <span className="font-[family-name:var(--font-narrow)] text-[9px] font-semibold uppercase tracking-[0.15em] text-teal">Verified</span>}
          </Link>
        ))}
      </div>
      <Link
        href={href}
        className="block p-3 text-center font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] text-id8-orange hover:bg-[var(--paper-shadow)] transition-colors border-t border-[var(--hair)]"
      >
        View All &rarr;
      </Link>
    </div>
  )
}

function getItemHref(item: TrendingItem): string {
  switch (item.type) {
    case 'skill':
      return `/stackshack/${item.slug}`
    case 'command':
      return `/stackshack?tab=commands`
    case 'setting':
      return `/stackshack?tab=settings`
    case 'plugin':
      return `/stackshack/plugins/${item.slug}`
    default:
      return '/stackshack'
  }
}
