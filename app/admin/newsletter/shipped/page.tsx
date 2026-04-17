'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SubscriberGrowthChart } from '@/components/admin/SubscriberGrowthChart'

interface SourceCount {
  source: string
  count: number
}

interface Subscriber {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  source: string
  subscribed_at: string
}

const SHIPPED_PREFIX = 'shipped-magazine-'

export default function ShippedDashboard() {
  const [sources, setSources] = useState<SourceCount[]>([])
  const [recent, setRecent] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [srcRes, recentRes] = await Promise.all([
          fetch('/api/admin/newsletter/sources'),
          fetch(`/api/admin/newsletter/subscribers?source=${SHIPPED_PREFIX}*&limit=10&page=1`),
        ])
        if (srcRes.ok) {
          const j = await srcRes.json()
          setSources(j.sources || [])
        }
        if (recentRes.ok) {
          const j = await recentRes.json()
          setRecent(j.subscribers || [])
        }
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const shippedSources = sources
    .filter((s) => s.source.startsWith(SHIPPED_PREFIX))
    .sort((a, b) => a.source.localeCompare(b.source))

  const totalShipped = shippedSources.reduce((s, x) => s + x.count, 0)
  const issueCount = shippedSources.length

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const formatIssueName = (source: string) => {
    const rest = source.replace(SHIPPED_PREFIX, '')
    return rest.replace(/^issue-/, 'Issue ').replace(/-/g, ' ')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/newsletter"
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Shipped. Subscribers</h1>
            <p className="text-[var(--text-secondary)]">
              {loading
                ? 'Loading...'
                : `${totalShipped.toLocaleString()} subscribers across ${issueCount} issue${issueCount === 1 ? '' : 's'}`}
            </p>
          </div>
        </div>
        <Link
          href={`/admin/newsletter/subscribers?source=${SHIPPED_PREFIX}*`}
          className="text-sm text-[var(--text-secondary)] hover:text-[var(--id8-orange)] transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* Growth Chart */}
      <div className="mb-8">
        <SubscriberGrowthChart
          days={30}
          source={`${SHIPPED_PREFIX}*`}
          title="Shipped. subscriber growth — last 30 days"
        />
      </div>

      {/* By issue + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signups by Issue */}
        <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Signups by issue</h3>
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
          ) : shippedSources.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">
              No Shipped. subscribers yet. Every signup from a <code>/shipped/*</code> page will land here.
            </p>
          ) : (
            <div className="space-y-2">
              {shippedSources.map((s) => {
                const pct = totalShipped > 0 ? (s.count / totalShipped) * 100 : 0
                return (
                  <div key={s.source}>
                    <div className="flex items-baseline justify-between mb-1">
                      <Link
                        href={`/admin/newsletter/subscribers?source=${encodeURIComponent(s.source)}`}
                        className="text-sm text-[var(--text-primary)] hover:text-[var(--id8-orange)] transition-colors"
                      >
                        {formatIssueName(s.source)}
                      </Link>
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {s.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[var(--bg-primary)] rounded overflow-hidden">
                      <div
                        className="h-full bg-[var(--id8-orange)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Subscribers */}
        <div className="p-6 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
          <h3 className="font-semibold text-[var(--text-primary)] mb-4">Latest 10 signups</h3>
          {loading ? (
            <p className="text-sm text-[var(--text-secondary)]">Loading...</p>
          ) : recent.length === 0 ? (
            <p className="text-sm text-[var(--text-secondary)]">No signups yet.</p>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {recent.map((s) => (
                <div key={s.id} className="py-2 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-primary)]">{s.email}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">
                      {formatIssueName(s.source)}
                    </p>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {formatDate(s.subscribed_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
