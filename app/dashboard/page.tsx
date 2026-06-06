'use client'

import { useEffect, useState, useCallback } from 'react'
import { subDays, format, startOfDay, endOfDay } from 'date-fns'
import dynamic from 'next/dynamic'

// Dynamically import chart components with SSR disabled
// These are loaded as complete components to preserve internal context
const TrafficChart = dynamic(
  () => import('@/components/charts/TrafficChartClient').then(mod => mod.TrafficChartClient),
  { ssr: false, loading: () => <ChartSkeleton title="TRAFFIC OVER TIME" /> }
)

const WorldMapVisualization = dynamic(
  () => import('@/components/charts/WorldMapClient').then(mod => mod.WorldMapClient),
  { ssr: false, loading: () => <ChartSkeleton title="GLOBAL TRAFFIC" /> }
)

// Loading skeleton for charts
function ChartSkeleton({ title }: { title: string }) {
  return (
    <div className="border border-[var(--hair)] bg-[var(--paper)] p-5 font-[family-name:var(--font-mono)] animate-pulse">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{title}</span>
      </div>
      <div className="h-64 bg-[var(--paper-shadow)]" />
    </div>
  )
}

interface Stats {
  pageviews: number
  visitors: number
  visits: number
  bounces: number
  totaltime: number
  comparison: {
    pageviews: number
    visitors: number
    visits: number
    bounces: number
    totaltime: number
  }
}

// Extract number from API response - handles both { value: 128 } and raw 128
const num = (v: unknown): number =>
  typeof v === 'number' ? v : (v as { value?: number })?.value ?? 0

// Normalize Umami API response to consistent shape
function normalizeStats(raw: Record<string, unknown>): Stats | null {
  if (!raw) return null
  const c = raw.comparison as Record<string, unknown> | undefined
  return {
    pageviews: num(raw.pageviews),
    visitors: num(raw.visitors),
    visits: num(raw.visits),
    bounces: num(raw.bounces),
    totaltime: num(raw.totaltime),
    comparison: {
      pageviews: num(c?.pageviews),
      visitors: num(c?.visitors),
      visits: num(c?.visits),
      bounces: num(c?.bounces),
      totaltime: num(c?.totaltime),
    }
  }
}

interface PageviewData {
  x: string
  y: number
  views?: number
  visitors?: number
}

interface MetricItem {
  x: string
  y: number
}

type TimeRange = '24h' | '7d' | '30d' | '90d'

const TIME_RANGES: { value: TimeRange; label: string }[] = [
  { value: '24h', label: '24H' },
  { value: '7d', label: '7D' },
  { value: '30d', label: '30D' },
  { value: '90d', label: '90D' },
]

function getDateRange(range: TimeRange) {
  const now = new Date()
  const end = endOfDay(now)
  let start: Date
  let unit: string

  switch (range) {
    case '24h':
      start = subDays(now, 1)
      unit = 'hour'
      break
    case '7d':
      start = startOfDay(subDays(now, 7))
      unit = 'day'
      break
    case '30d':
      start = startOfDay(subDays(now, 30))
      unit = 'day'
      break
    case '90d':
      start = startOfDay(subDays(now, 90))
      unit = 'day'
      break
  }

  return {
    startAt: start.getTime().toString(),
    endAt: end.getTime().toString(),
    unit,
  }
}

function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
  return num.toLocaleString()
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  if (mins >= 60) {
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours}h ${remainingMins}m`
  }
  return `${mins}m ${secs}s`
}

function calculateChange(current: number, previous: number): { value: number; positive: boolean } {
  if (previous === 0) return { value: current > 0 ? 100 : 0, positive: current >= 0 }
  const change = ((current - previous) / previous) * 100
  return { value: Math.abs(change), positive: change >= 0 }
}

// Animated counter component
function AnimatedNumber({ value, format: formatFn = formatNumber }: { value: number; format?: (n: number) => string }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const duration = 1000
    const steps = 30
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span>{formatFn(displayValue)}</span>
}

// Premium stat card with sparkline
function StatCard({
  label,
  value,
  previousValue,
  format: formatFn = formatNumber,
  invertChange = false,
  icon,
  sparklineData = [],
}: {
  label: string
  value: number
  previousValue?: number
  format?: (n: number) => string
  invertChange?: boolean
  icon?: React.ReactNode
  sparklineData?: number[]
}) {
  const change = previousValue !== undefined ? calculateChange(value, previousValue) : null
  const isPositive = invertChange ? !change?.positive : change?.positive

  return (
    <div className="border border-[var(--hair)] bg-[var(--paper)] p-5 hover:bg-[var(--paper-shadow)] hover:border-[var(--hair-hard)] transition-colors duration-150">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {icon}
          {label}
        </div>
        {change && (
          <div
            className={`flex items-center gap-1 font-[family-name:var(--font-mono)] text-xs ${
              isPositive ? 'text-[var(--teal)]' : 'text-id8-orange'
            }`}
          >
            <span className="text-[10px]">{isPositive ? '▲' : '▼'}</span>
            {change.value.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="font-[family-name:var(--font-mono)] text-3xl font-medium text-[var(--ink)] mb-3">
        <AnimatedNumber value={value} format={formatFn} />
      </div>

      {/* Mini sparkline */}
      {sparklineData.length > 0 && (
        <div className="h-8 flex items-end gap-0.5">
          {sparklineData.slice(-12).map((val, i) => {
            const max = Math.max(...sparklineData.slice(-12), 1)
            const height = Math.max(4, (val / max) * 32)
            return (
              <div
                key={i}
                className="flex-1 bg-[var(--hair-hard)]"
                style={{ height }}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

// Real-time indicator
function RealtimeIndicator({ count }: { count: number }) {
  return (
    <div className="relative border border-id8-orange bg-[var(--paper)] p-5">
      <div className="absolute top-5 right-5">
        <span className="inline-block w-2 h-2 bg-id8-orange rounded-full" />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.22em] text-id8-orange">Live</span>
      </div>
      <div className="font-[family-name:var(--font-mono)] text-4xl font-medium text-[var(--ink)] mb-1">
        <AnimatedNumber value={count} />
      </div>
      <div className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">active now</div>
    </div>
  )
}


// Top items with horizontal bars
function TopList({
  title,
  data,
  icon,
}: {
  title: string
  data: MetricItem[]
  icon: React.ReactNode
}) {
  const maxValue = Math.max(...data.map((d) => d.y), 1)

  return (
    <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
      <h3 className="flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] mb-4">
        {icon}
        {title}
      </h3>

      <div className="space-y-3">
        {data.slice(0, 8).map((item, i) => (
          <div key={i} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--body)] truncate max-w-[70%]">
                {item.x || '(direct)'}
              </span>
              <div className="flex items-center gap-2 font-[family-name:var(--font-mono)]">
                <span className="text-sm text-[var(--ink)]">{formatNumber(item.y)}</span>
                <span className="text-xs text-[var(--muted)]">
                  {((item.y / maxValue) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <div className="h-1.5 bg-[var(--paper-mid)] overflow-hidden">
              <div
                className="h-full bg-id8-orange transition-all duration-500"
                style={{ width: `${(item.y / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <div className="text-center py-10 border border-dashed border-[var(--hair)]">
            <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--muted)] mb-2">[ NO DATA ]</div>
            <p className="text-xs text-[var(--muted)]">Waiting for traffic...</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Browser/Device pie chart alternative - horizontal bars
function DeviceBreakdown({ browsers, title }: { browsers: MetricItem[]; title: string }) {
  const colors = ['#0b0b0b', '#ff6b35', '#2a8d83', '#b4afa0', '#d6d3c9']
  const total = browsers.reduce((sum, b) => sum + b.y, 0)

  return (
    <div className="border border-[var(--hair)] bg-[var(--paper)] p-5">
      <h3 className="flex items-center gap-2 font-[family-name:var(--font-narrow)] text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--ink)] mb-4">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        {title}
      </h3>

      {/* Stacked bar */}
      <div className="h-4 flex overflow-hidden mb-4">
        {browsers.slice(0, 5).map((browser, i) => (
          <div
            key={i}
            className="h-full transition-opacity duration-150 hover:opacity-80"
            style={{
              width: `${(browser.y / total) * 100}%`,
              backgroundColor: colors[i % colors.length]
            }}
            title={`${browser.x}: ${formatNumber(browser.y)}`}
          />
        ))}
      </div>

      <div className="space-y-2">
        {browsers.slice(0, 5).map((browser, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className="w-3 h-3 flex-shrink-0"
              style={{ backgroundColor: colors[i % colors.length] }}
            />
            <span className="text-sm flex-1 truncate text-[var(--body)]">{browser.x}</span>
            <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">{((browser.y / total) * 100).toFixed(1)}%</span>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--ink)]">{formatNumber(browser.y)}</span>
          </div>
        ))}
        {browsers.length === 0 && (
          <div className="text-center py-8 border border-dashed border-[var(--hair)]">
            <div className="font-[family-name:var(--font-mono)] text-sm text-[var(--muted)] mb-2">[ NO DATA ]</div>
            <p className="text-xs text-[var(--muted)]">No browser data yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')
  const [stats, setStats] = useState<Stats | null>(null)
  const [pageviews, setPageviews] = useState<PageviewData[]>([])
  const [pages, setPages] = useState<MetricItem[]>([])
  const [referrers, setReferrers] = useState<MetricItem[]>([])
  const [countries, setCountries] = useState<MetricItem[]>([])
  const [browsers, setBrowsers] = useState<MetricItem[]>([])
  const [activeVisitors, setActiveVisitors] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    const { startAt, endAt, unit } = getDateRange(timeRange)

    try {
      const [statsRes, pageviewsRes, pagesRes, referrersRes, countriesRes, browsersRes, activeRes] =
        await Promise.all([
          fetch(`/api/analytics?endpoint=stats&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=pageviews&startAt=${startAt}&endAt=${endAt}&unit=${unit}`),
          fetch(`/api/analytics?endpoint=metrics&type=path&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=referrer&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=country&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=metrics&type=browser&startAt=${startAt}&endAt=${endAt}`),
          fetch(`/api/analytics?endpoint=active`),
        ])

      if (statsRes.ok) {
        const data = await statsRes.json()
        setStats(normalizeStats(data))
      }

      if (pageviewsRes.ok) {
        const data = await pageviewsRes.json()
        const chartData = (data.pageviews || []).map((item: { x: string; y: number }) => ({
          x: format(new Date(item.x), timeRange === '24h' ? 'HH:mm' : 'MMM d'),
          y: item.y,
        }))
        setPageviews(chartData)
      }

      if (pagesRes.ok) {
        const data = await pagesRes.json()
        setPages(data)
      }

      if (referrersRes.ok) {
        const data = await referrersRes.json()
        setReferrers(data)
      }

      if (countriesRes.ok) {
        const data = await countriesRes.json()
        setCountries(data)
      }

      if (browsersRes.ok) {
        const data = await browsersRes.json()
        setBrowsers(data)
      }

      if (activeRes.ok) {
        const data = await activeRes.json()
        setActiveVisitors(data[0]?.x || 0)
      }

      setLastUpdated(new Date())
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60000)
    return () => clearInterval(interval)
  }, [fetchData])

  const bounceRate = stats
    ? stats.visits > 0
      ? (stats.bounces / stats.visits) * 100
      : 0
    : 0
  const prevBounceRate = stats?.comparison
    ? stats.comparison.visits > 0
      ? (stats.comparison.bounces / stats.comparison.visits) * 100
      : 0
    : 0
  const avgDuration = stats
    ? stats.visits > 0
      ? stats.totaltime / stats.visits
      : 0
    : 0
  const prevAvgDuration = stats?.comparison
    ? stats.comparison.visits > 0
      ? stats.comparison.totaltime / stats.comparison.visits
      : 0
    : 0

  // Generate sparkline data from pageviews
  const sparklineData = pageviews.map(p => p.y)

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--body)]">
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-[var(--rule)] pb-7">
            <div>
              <h1 className="flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl font-normal tracking-[-0.02em] text-[var(--ink)]">
                id8Labs <em className="not-italic text-id8-orange font-[family-name:var(--font-display)] italic">analytics</em>
                <span className="font-[family-name:var(--font-narrow)] text-[10px] font-bold uppercase tracking-[0.2em] text-id8-orange border border-id8-orange px-2 py-0.5">
                  Beta
                </span>
              </h1>
              <p className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--muted)] mt-2">
                <span className="inline-block w-1.5 h-1.5 bg-id8-orange rounded-full" />
                {lastUpdated && `Last synced ${format(lastUpdated, 'HH:mm:ss')}`}
              </p>
            </div>

            {/* Time range selector */}
            <div className="flex border border-[var(--hair)]">
              {TIME_RANGES.map((range) => (
                <button
                  key={range.value}
                  onClick={() => setTimeRange(range.value)}
                  className={`px-4 py-2 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-150 focus:outline-none ${
                    timeRange === range.value
                      ? 'bg-[var(--ink)] text-[var(--paper)]'
                      : 'text-[var(--muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <p className="font-[family-name:var(--font-mono)] text-sm text-[var(--muted)] animate-pulse">Loading analytics...</p>
            </div>
          ) : (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <RealtimeIndicator count={activeVisitors} />
                <StatCard
                  label="Visitors"
                  value={stats?.visitors || 0}
                  previousValue={stats?.comparison?.visitors}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Page Views"
                  value={stats?.pageviews || 0}
                  previousValue={stats?.comparison?.pageviews}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Sessions"
                  value={stats?.visits || 0}
                  previousValue={stats?.comparison?.visits}
                  sparklineData={sparklineData}
                  icon={
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Bounce Rate"
                  value={bounceRate}
                  previousValue={prevBounceRate}
                  format={(n) => `${n.toFixed(1)}%`}
                  invertChange
                  icon={
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                    </svg>
                  }
                />
                <StatCard
                  label="Avg Duration"
                  value={avgDuration}
                  previousValue={prevAvgDuration}
                  format={formatDuration}
                  icon={
                    <svg className="w-4 h-4 text-[var(--muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </div>

              {/* Traffic chart */}
              <div className="mb-8">
                <TrafficChart data={pageviews} timeRange={timeRange} />
              </div>

              {/* World map and devices row */}
              <div className="grid lg:grid-cols-2 gap-4 mb-8">
                <WorldMapVisualization data={countries} />
                <DeviceBreakdown browsers={browsers} title="BROWSERS" />
              </div>

              {/* Metrics grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <TopList
                  title="TOP PAGES"
                  data={pages}
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />
                <TopList
                  title="TRAFFIC SOURCES"
                  data={referrers}
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  }
                />
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-[var(--rule)] text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">id8Labs dashboard</span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--muted)]">
                  Powered by{' '}
                  <a
                    href="https://umami.is"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--ink)] hover:text-id8-orange transition-colors"
                  >
                    Umami
                  </a>
                  {' '}• Privacy-first analytics • No cookies required
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
