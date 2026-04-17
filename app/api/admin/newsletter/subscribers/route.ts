import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
    }
    const searchParams = request.nextUrl.searchParams

    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const status = searchParams.get('status') || 'all'
    const search = searchParams.get('search') || ''
    const source = searchParams.get('source') || 'all'

    const offset = (page - 1) * limit

    let query = supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact' })

    if (status !== 'all') {
      query = query.eq('status', status)
    }

    if (search) {
      query = query.ilike('email', `%${search}%`)
    }

    if (source !== 'all') {
      if (source.endsWith('*')) {
        query = query.ilike('source', source.replace('*', '%'))
      } else {
        query = query.eq('source', source)
      }
    }

    const { data: subscribers, count, error } = await query
      .order('subscribed_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      subscribers: subscribers || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    })
  } catch (error) {
    console.error('Error fetching subscribers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscribers' },
      { status: 500 }
    )
  }
}
