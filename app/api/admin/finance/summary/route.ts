import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import type { ExpenseFrequency } from '@/lib/finance/types'

function normalizeExpense(amount_cents: number, frequency: ExpenseFrequency): { monthly: number; annual: number } {
  switch (frequency) {
    case 'monthly': return { monthly: amount_cents, annual: amount_cents * 12 }
    case 'annual': return { monthly: Math.round(amount_cents / 12), annual: amount_cents }
    case 'one-time': return { monthly: 0, annual: amount_cents }
    case 'usage-based': return { monthly: amount_cents, annual: amount_cents * 12 }
    default: return { monthly: 0, annual: 0 }
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient()
    if (!supabase) return NextResponse.json({ error: 'Server config error' }, { status: 500 })

    const [expResult, assetResult, purchaseResult, entriesResult, capitalResult] = await Promise.all([
      supabase.from('expenses').select('*, category:expense_categories(name, color)').eq('is_active', true),
      supabase.from('assets').select('*').eq('is_active', true),
      supabase.from('purchases').select('amount, currency, created_at, product_id, status').eq('status', 'completed'),
      supabase.from('expense_entries').select('amount_cents, period_start, expense_id').order('period_start', { ascending: true }),
      supabase.from('capital_contributions').select('*').order('contributed_at', { ascending: true }),
    ])

    if (expResult.error) throw expResult.error
    if (assetResult.error) throw assetResult.error
    if (purchaseResult.error) throw purchaseResult.error
    if (entriesResult.error) throw entriesResult.error
    if (capitalResult.error) throw capitalResult.error

    const activeExpenses = expResult.data || []
    const activeAssets = assetResult.data || []
    const purchases = purchaseResult.data || []
    const entries = entriesResult.data || []
    const contributions = capitalResult.data || []

    // --- Single pass over activeExpenses: burn, annual, category, project, vendor ---
    let monthlyBurn = 0
    let annualExpenses = 0
    const categoryMap = new Map<string, { name: string; color: string; total_cents: number; count: number }>()
    const projectMap = new Map<string, { project: string; monthly_cents: number; annual_cents: number; count: number }>()
    const vendorMap = new Map<string, { vendor: string; monthly_cents: number }>()

    for (const exp of activeExpenses) {
      const { monthly, annual } = normalizeExpense(exp.amount_cents, exp.frequency)
      monthlyBurn += monthly
      annualExpenses += annual

      // Category
      const catName = exp.category?.name || 'Uncategorized'
      const catColor = exp.category?.color || '#6B7280'
      const catEntry = categoryMap.get(catName)
      if (catEntry) { catEntry.total_cents += annual; catEntry.count += 1 }
      else { categoryMap.set(catName, { name: catName, color: catColor, total_cents: annual, count: 1 }) }

      // Project
      const proj = exp.project || 'unassigned'
      const projEntry = projectMap.get(proj)
      if (projEntry) { projEntry.monthly_cents += monthly; projEntry.annual_cents += annual; projEntry.count += 1 }
      else { projectMap.set(proj, { project: proj, monthly_cents: monthly, annual_cents: annual, count: 1 }) }

      // Vendor
      const v = exp.vendor || 'Unknown'
      const vendorEntry = vendorMap.get(v)
      if (vendorEntry) { vendorEntry.monthly_cents += monthly }
      else { vendorMap.set(v, { vendor: v, monthly_cents: monthly }) }
    }

    // --- Revenue ---
    const totalRevenue = purchases.reduce(
      (sum: number, p: { amount: number }) => sum + (p.amount || 0), 0
    )

    const totalCapital = contributions.reduce(
      (sum: number, c: { amount_cents: number }) => sum + c.amount_cents, 0
    )

    const totalAssets = activeAssets.reduce(
      (sum: number, a: { current_value_cents: number | null; purchase_cost_cents: number | null }) =>
        sum + (a.current_value_cents || a.purchase_cost_cents || 0), 0
    )

    // EBITDA = Revenue - Operating Expenses (bootstrapped startup, no D&A tracked)
    const ebitda = totalRevenue - annualExpenses

    // Cash position = capital + revenue - actual entries paid
    const totalEntriesPaid = entries.reduce((s: number, e: { amount_cents: number }) => s + e.amount_cents, 0)
    const cashPosition = totalCapital + totalRevenue - totalEntriesPaid
    const runwayMonths = monthlyBurn > 0 ? Math.max(0, Math.round(cashPosition / monthlyBurn)) : Infinity

    // --- Monthly timeline ---
    const monthlyExpensesMap = new Map<string, number>()
    for (const entry of entries) {
      const month = entry.period_start.substring(0, 7)
      monthlyExpensesMap.set(month, (monthlyExpensesMap.get(month) || 0) + entry.amount_cents)
    }

    const monthlyRevenueMap = new Map<string, number>()
    for (const purchase of purchases) {
      const month = purchase.created_at.substring(0, 7)
      monthlyRevenueMap.set(month, (monthlyRevenueMap.get(month) || 0) + (purchase.amount || 0))
    }

    const allMonths = new Set<string>()
    monthlyExpensesMap.forEach((_, k) => allMonths.add(k))
    monthlyRevenueMap.forEach((_, k) => allMonths.add(k))

    // --- Revenue by product ---
    const productRevenueMap = new Map<string, { product_id: string; total_cents: number; count: number }>()
    for (const p of purchases) {
      const existing = productRevenueMap.get(p.product_id)
      if (existing) { existing.total_cents += p.amount || 0; existing.count += 1 }
      else { productRevenueMap.set(p.product_id, { product_id: p.product_id, total_cents: p.amount || 0, count: 1 }) }
    }

    // --- Asset breakdown ---
    const assetCategoryMap = new Map<string, { category: string; count: number; total_value_cents: number }>()
    for (const a of activeAssets) {
      const val = a.current_value_cents || a.purchase_cost_cents || 0
      const existing = assetCategoryMap.get(a.category)
      if (existing) { existing.count += 1; existing.total_value_cents += val }
      else { assetCategoryMap.set(a.category, { category: a.category, count: 1, total_value_cents: val }) }
    }

    return NextResponse.json({
      total_revenue_cents: totalRevenue,
      total_monthly_burn_cents: monthlyBurn,
      total_annual_expenses_cents: annualExpenses,
      total_assets_cents: totalAssets,
      total_capital_cents: totalCapital,
      cash_position_cents: cashPosition,
      ebitda_cents: ebitda,
      runway_months: runwayMonths === Infinity ? null : runwayMonths,
      net_position_cents: totalRevenue + totalCapital - annualExpenses,

      active_expense_count: activeExpenses.length,
      active_asset_count: activeAssets.length,
      total_purchase_count: purchases.length,

      expense_by_category: Array.from(categoryMap.values()).sort((a, b) => b.total_cents - a.total_cents),
      expense_by_project: Array.from(projectMap.values()).sort((a, b) => b.annual_cents - a.annual_cents),
      expense_by_vendor: Array.from(vendorMap.values()).sort((a, b) => b.monthly_cents - a.monthly_cents),
      revenue_by_product: Array.from(productRevenueMap.values()).sort((a, b) => b.total_cents - a.total_cents),
      asset_by_category: Array.from(assetCategoryMap.values()).sort((a, b) => b.total_value_cents - a.total_value_cents),

      monthly_timeline: Array.from(allMonths).sort().map(month => ({
        month,
        expenses_cents: monthlyExpensesMap.get(month) || 0,
        revenue_cents: monthlyRevenueMap.get(month) || 0,
        net_cents: (monthlyRevenueMap.get(month) || 0) - (monthlyExpensesMap.get(month) || 0),
      })),

      capital_contributions: contributions,
    })
  } catch (error) {
    console.error('Error computing finance summary:', error)
    return NextResponse.json(
      { error: 'Failed to compute finance summary' },
      { status: 500 }
    )
  }
}
