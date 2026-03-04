import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get('category') || 'all'
    const project = searchParams.get('project') || 'all'
    const frequency = searchParams.get('frequency') || 'all'
    const active = searchParams.get('active') // 'true', 'false', or null (all)

    let query = supabase
      .from('expenses')
      .select('*, category:expense_categories(*)')
      .order('created_at', { ascending: false })

    if (category !== 'all') {
      query = query.eq('category_id', category)
    }

    if (project !== 'all') {
      query = query.eq('project', project)
    }

    if (frequency !== 'all') {
      query = query.eq('frequency', frequency)
    }

    if (active !== null) {
      query = query.eq('is_active', active === 'true')
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ expenses: data || [] })
  } catch (error) {
    console.error('Error fetching expenses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expenses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    const body = await request.json()

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        description: body.description,
        category_id: body.category_id || null,
        amount_cents: body.amount_cents,
        currency: body.currency || 'usd',
        frequency: body.frequency,
        vendor: body.vendor || null,
        project: body.project || null,
        start_date: body.start_date || null,
        end_date: body.end_date || null,
        is_active: body.is_active ?? true,
        notes: body.notes || null,
      })
      .select('*, category:expense_categories(*)')
      .single()

    if (error) throw error

    return NextResponse.json({ expense: data }, { status: 201 })
  } catch (error) {
    console.error('Error creating expense:', error)
    return NextResponse.json(
      { error: 'Failed to create expense' },
      { status: 500 }
    )
  }
}
