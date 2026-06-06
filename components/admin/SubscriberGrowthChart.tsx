'use client'

import { useState, useEffect } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'

interface SeriesPoint {
  date: string
  count: number
}

interface Props {
  source?: string
  days?: number
  title?: string
}

export function SubscriberGrowthChart({ source = 'all', days = 30, title }: Props) {
  const [series, setSeries] = useState<SeriesPoint[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams({ days: days.toString(), source })
    fetch(`/api/admin/newsletter/timeseries?${params}`)
      .then((r) => r.json())
      .then((j) => {
        setSeries(j.series || [])
        setTotal(j.total || 0)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [source, days])

  const formatDay = (iso: unknown) => {
    if (typeof iso !== 'string') return ''
    const d = new Date(iso + 'T00:00:00Z')
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
  }

  return (
    <div className="p-6 bg-[var(--paper)] border border-[var(--hair)]">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-normal text-[var(--ink)]">
            {title || 'Subscriber growth'}
          </h3>
          <p className="text-sm text-[var(--muted)]">
            {loading ? 'Loading...' : `${total.toLocaleString()} signups in the last ${days} days`}
          </p>
        </div>
        <span className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
          {source === 'all' ? 'all sources' : source}
        </span>
      </div>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={series} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--hair)" opacity={0.6} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDay}
              tick={{ fontSize: 11, fill: 'var(--muted)' }}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: 'var(--muted)' }}
              allowDecimals={false}
              width={32}
            />
            <Tooltip
              labelFormatter={formatDay}
              contentStyle={{
                background: 'var(--paper)',
                border: '1px solid var(--hair)',
                borderRadius: 0,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--id8-orange)"
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
