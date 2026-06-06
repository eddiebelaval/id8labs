'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Subscriber {
  id: string
  email: string
  status: 'active' | 'unsubscribed'
  source: string
  subscribed_at: string
  unsubscribed_at: string | null
  is_academy_member: boolean
}

interface SubscriberResponse {
  subscribers: Subscriber[]
  total: number
  page: number
  limit: number
  totalPages: number
}

interface SourceCount {
  source: string
  count: number
}

export default function SubscribersPage() {
  const [data, setData] = useState<SubscriberResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sourceFilter, setSourceFilter] = useState('all')
  const [sources, setSources] = useState<SourceCount[]>([])
  const [page, setPage] = useState(1)

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        status: statusFilter,
        source: sourceFilter,
        ...(search && { search }),
      })

      const response = await fetch(`/api/admin/newsletter/subscribers?${params}`)
      if (response.ok) {
        const result = await response.json()
        setData(result)
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error)
    } finally {
      setLoading(false)
    }
  }, [page, statusFilter, sourceFilter, search])

  useEffect(() => {
    fetchSubscribers()
  }, [fetchSubscribers])

  useEffect(() => {
    fetch('/api/admin/newsletter/sources')
      .then((r) => r.ok && r.json())
      .then((j) => j && setSources(j.sources || []))
      .catch(() => {})
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/newsletter"
            className="p-2 text-[var(--muted)] hover:text-[var(--ink)] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.02em] text-[var(--ink)]">Subscribers</h1>
            <p className="text-[var(--muted)]">
              {data ? `${data.total} total subscribers` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="w-full px-4 py-2 border border-[var(--hair)]  bg-[var(--paper-shadow)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--ink)]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border border-[var(--hair)]  bg-[var(--paper-shadow)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => {
            setSourceFilter(e.target.value)
            setPage(1)
          }}
          className="px-4 py-2 border border-[var(--hair)]  bg-[var(--paper-shadow)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
        >
          <option value="all">All Sources</option>
          <option value="shipped-magazine-*">All Shipped issues</option>
          {sources.map((s) => (
            <option key={s.source} value={s.source}>
              {s.source} ({s.count})
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[var(--paper)] border border-[var(--hair)]  overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--paper-shadow)]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
                Source
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
                Subscribed
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-[var(--muted)] uppercase tracking-wide">
                Academy
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--hair)]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--muted)]">
                  Loading...
                </td>
              </tr>
            ) : data?.subscribers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--muted)]">
                  No subscribers found
                </td>
              </tr>
            ) : (
              data?.subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-[var(--paper-shadow)] transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-[var(--ink)]">{subscriber.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-gray-500/10 text-gray-500'
                      }`}
                    >
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--muted)]">
                      {subscriber.source || 'website'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[var(--muted)]">
                      {formatDate(subscriber.subscribed_at)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {subscriber.is_academy_member ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium border border-id8-orange text-id8-orange">
                        Member
                      </span>
                    ) : (
                      <span className="text-sm text-[var(--muted)]">-</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-[var(--muted)]">
            Showing {((data.page - 1) * data.limit) + 1} to{' '}
            {Math.min(data.page * data.limit, data.total)} of {data.total}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-[var(--hair)]  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--paper)] transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
              className="px-4 py-2 text-sm border border-[var(--hair)]  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--paper)] transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
