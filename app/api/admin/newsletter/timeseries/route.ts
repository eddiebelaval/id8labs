import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const searchParams = request.nextUrl.searchParams
    const days = Math.max(1, Math.min(365, parseInt(searchParams.get('days') || '30', 10)))
    const source = searchParams.get('source') || 'all'

    const since = new Date()
    since.setUTCHours(0, 0, 0, 0)
    since.setUTCDate(since.getUTCDate() - (days - 1))

    let query = supabase
      .from('newsletter_subscribers')
      .select('subscribed_at, source, status')
      .gte('subscribed_at', since.toISOString())

    if (source !== 'all') {
      if (source.endsWith('*')) {
        query = query.ilike('source', source.replace('*', '%'))
      } else {
        query = query.eq('source', source)
      }
    }

    const { data, error } = await query
    if (error) throw error

    const buckets = new Map<string, number>()
    for (let i = 0; i < days; i++) {
      const d = new Date(since)
      d.setUTCDate(d.getUTCDate() + i)
      buckets.set(d.toISOString().slice(0, 10), 0)
    }

    for (const row of data || []) {
      const day = (row.subscribed_at as string).slice(0, 10)
      if (buckets.has(day)) buckets.set(day, (buckets.get(day) || 0) + 1)
    }

    const series = Array.from(buckets.entries()).map(([date, count]) => ({ date, count }))
    const total = series.reduce((s, p) => s + p.count, 0)

    return NextResponse.json({ series, total, days, source })
  } catch (error) {
    console.error('Error fetching timeseries:', error)
    return NextResponse.json({ error: 'Failed to fetch timeseries' }, { status: 500 })
  }
}
