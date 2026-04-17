import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .select('source')

    if (error) throw error

    const counts = new Map<string, number>()
    for (const row of data || []) {
      const src = row.source || 'website'
      counts.set(src, (counts.get(src) || 0) + 1)
    }

    const sources = Array.from(counts.entries())
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)

    return NextResponse.json({ sources })
  } catch (error) {
    console.error('Error fetching sources:', error)
    return NextResponse.json({ error: 'Failed to fetch sources' }, { status: 500 })
  }
}
