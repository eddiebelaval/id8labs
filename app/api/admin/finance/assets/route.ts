import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    const searchParams = request.nextUrl.searchParams

    const category = searchParams.get('category') || 'all'
    const active = searchParams.get('active')

    let query = supabase
      .from('assets')
      .select('*')
      .order('created_at', { ascending: false })

    if (category !== 'all') {
      query = query.eq('category', category)
    }

    if (active !== null) {
      query = query.eq('is_active', active === 'true')
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ assets: data || [] })
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
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
      .from('assets')
      .insert({
        name: body.name,
        category: body.category,
        description: body.description || null,
        purchase_date: body.purchase_date || null,
        purchase_cost_cents: body.purchase_cost_cents || null,
        current_value_cents: body.current_value_cents || null,
        vendor: body.vendor || null,
        notes: body.notes || null,
        is_active: body.is_active ?? true,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ asset: data }, { status: 201 })
  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Failed to create asset' },
      { status: 500 }
    )
  }
}
