import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    const { id } = await params
    const body = await request.json()

    const { data, error } = await supabase
      .from('expenses')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, category:expense_categories(*)')
      .single()

    if (error) throw error

    return NextResponse.json({ expense: data })
  } catch (error) {
    console.error('Error updating expense:', error)
    return NextResponse.json(
      { error: 'Failed to update expense' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })
    const { id } = await params

    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting expense:', error)
    return NextResponse.json(
      { error: 'Failed to delete expense' },
      { status: 500 }
    )
  }
}
