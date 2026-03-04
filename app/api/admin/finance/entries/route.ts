import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const searchParams = request.nextUrl.searchParams

    const expenseId = searchParams.get('expense_id')

    let query = supabase
      .from('expense_entries')
      .select('*, expense:expenses(description, vendor)')
      .order('period_start', { ascending: false })

    if (expenseId) {
      query = query.eq('expense_id', expenseId)
    }

    const { data, error } = await query

    if (error) throw error

    return NextResponse.json({ entries: data || [] })
  } catch (error) {
    console.error('Error fetching expense entries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch expense entries' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase()
    const body = await request.json()

    const { data, error } = await supabase
      .from('expense_entries')
      .insert({
        expense_id: body.expense_id,
        amount_cents: body.amount_cents,
        period_start: body.period_start,
        period_end: body.period_end,
        paid_at: body.paid_at || null,
        receipt_url: body.receipt_url || null,
        notes: body.notes || null,
      })
      .select('*, expense:expenses(description, vendor)')
      .single()

    if (error) throw error

    return NextResponse.json({ entry: data }, { status: 201 })
  } catch (error) {
    console.error('Error creating expense entry:', error)
    return NextResponse.json(
      { error: 'Failed to create expense entry' },
      { status: 500 }
    )
  }
}
