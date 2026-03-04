import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const getSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

function computeMonthlyBurn(expenses: { amount_cents: number; frequency: string }[]): number {
  return expenses.reduce((total, exp) => {
    switch (exp.frequency) {
      case 'monthly': return total + exp.amount_cents
      case 'annual': return total + Math.round(exp.amount_cents / 12)
      case 'one-time': return total
      case 'usage-based': return total + exp.amount_cents
      default: return total
    }
  }, 0)
}

function computeAnnualExpenses(expenses: { amount_cents: number; frequency: string }[]): number {
  return expenses.reduce((total, exp) => {
    switch (exp.frequency) {
      case 'monthly': return total + (exp.amount_cents * 12)
      case 'annual': return total + exp.amount_cents
      case 'one-time': return total + exp.amount_cents
      case 'usage-based': return total + (exp.amount_cents * 12)
      default: return total
    }
  }, 0)
}

export async function GET() {
  try {
    const supabase = getSupabase()

    // Parallel fetch all finance data
    const [expResult, assetResult, purchaseResult, entriesResult, capitalResult] = await Promise.all([
      supabase.from('expenses').select('*, category:expense_categories(name, color)').eq('is_active', true),
      supabase.from('assets').select('*'),
      supabase.from('purchases').select('amount, currency, created_at, product_id, status'),
      supabase.from('expense_entries').select('amount_cents, period_start, expense_id').order('period_start', { ascending: true }),
      supabase.from('capital_contributions').select('*').order('contributed_at', { ascending: true }),
    ])

    if (expResult.error) throw expResult.error
    if (assetResult.error) throw assetResult.error
    if (purchaseResult.error) throw purchaseResult.error
    if (entriesResult.error) throw entriesResult.error
    if (capitalResult.error) throw capitalResult.error

    const activeExpenses = expResult.data || []
    const allAssets = assetResult.data || []
    const activeAssets = allAssets.filter((a: { is_active: boolean }) => a.is_active)
    const allPurchases = purchaseResult.data || []
    const completedPurchases = allPurchases.filter((p: { status: string }) => p.status === 'completed')
    const entries = entriesResult.data || []
    const contributions = capitalResult.data || []

    // --- Core metrics ---
    const monthlyBurn = computeMonthlyBurn(activeExpenses)
    const annualExpenses = computeAnnualExpenses(activeExpenses)

    const totalRevenue = completedPurchases.reduce(
      (sum: number, p: { amount: number }) => sum + (p.amount || 0), 0
    )

    const totalCapital = contributions.reduce(
      (sum: number, c: { amount_cents: number }) => sum + c.amount_cents, 0
    )

    // Asset valuation
    const totalAssets = activeAssets.reduce(
      (sum: number, a: { current_value_cents: number | null; purchase_cost_cents: number | null }) =>
        sum + (a.current_value_cents || a.purchase_cost_cents || 0), 0
    )

    // --- EBITDA calculation ---
    // For a bootstrapped startup: EBITDA = Revenue - Operating Expenses
    // No interest, taxes minimal, no depreciation/amortization tracked yet
    // Use trailing 12 months or annualized current rates
    const ebitda = totalRevenue - annualExpenses

    // --- Runway ---
    // Cash position = capital contributions + revenue - total expenses paid
    // For simplicity: use revenue + capital - annualized expenses as rough cash
    const totalEntriesPaid = entries.reduce((s: number, e: { amount_cents: number }) => s + e.amount_cents, 0)
    const cashPosition = totalCapital + totalRevenue - totalEntriesPaid
    const runwayMonths = monthlyBurn > 0 ? Math.max(0, Math.round(cashPosition / monthlyBurn)) : Infinity

    // --- Expenses by category ---
    const categoryMap = new Map<string, { name: string; color: string; total_cents: number; count: number }>()
    for (const exp of activeExpenses) {
      const catName = exp.category?.name || 'Uncategorized'
      const catColor = exp.category?.color || '#6B7280'
      const annualized = exp.frequency === 'monthly'
        ? exp.amount_cents * 12
        : exp.frequency === 'annual'
        ? exp.amount_cents
        : exp.amount_cents * 12
      const existing = categoryMap.get(catName)
      if (existing) {
        existing.total_cents += annualized
        existing.count += 1
      } else {
        categoryMap.set(catName, { name: catName, color: catColor, total_cents: annualized, count: 1 })
      }
    }

    // --- Expenses by project ---
    const projectMap = new Map<string, { project: string; monthly_cents: number; annual_cents: number; count: number }>()
    for (const exp of activeExpenses) {
      const proj = exp.project || 'unassigned'
      const monthly = exp.frequency === 'monthly' ? exp.amount_cents
        : exp.frequency === 'annual' ? Math.round(exp.amount_cents / 12)
        : exp.amount_cents
      const annual = exp.frequency === 'monthly' ? exp.amount_cents * 12
        : exp.frequency === 'annual' ? exp.amount_cents
        : exp.amount_cents * 12
      const existing = projectMap.get(proj)
      if (existing) {
        existing.monthly_cents += monthly
        existing.annual_cents += annual
        existing.count += 1
      } else {
        projectMap.set(proj, { project: proj, monthly_cents: monthly, annual_cents: annual, count: 1 })
      }
    }

    // --- Expenses by vendor (top spenders) ---
    const vendorMap = new Map<string, { vendor: string; monthly_cents: number }>()
    for (const exp of activeExpenses) {
      const v = exp.vendor || 'Unknown'
      const monthly = exp.frequency === 'monthly' ? exp.amount_cents
        : exp.frequency === 'annual' ? Math.round(exp.amount_cents / 12)
        : exp.amount_cents
      const existing = vendorMap.get(v)
      if (existing) {
        existing.monthly_cents += monthly
      } else {
        vendorMap.set(v, { vendor: v, monthly_cents: monthly })
      }
    }

    // --- Monthly timeline (entries + revenue) ---
    const monthlyExpensesMap = new Map<string, number>()
    for (const entry of entries) {
      const month = entry.period_start.substring(0, 7)
      monthlyExpensesMap.set(month, (monthlyExpensesMap.get(month) || 0) + entry.amount_cents)
    }

    const monthlyRevenueMap = new Map<string, number>()
    for (const purchase of completedPurchases) {
      const month = purchase.created_at.substring(0, 7)
      monthlyRevenueMap.set(month, (monthlyRevenueMap.get(month) || 0) + (purchase.amount || 0))
    }

    const allMonths = new Set<string>()
    monthlyExpensesMap.forEach((_, k) => allMonths.add(k))
    monthlyRevenueMap.forEach((_, k) => allMonths.add(k))

    // --- Revenue by product ---
    const productRevenueMap = new Map<string, { product_id: string; total_cents: number; count: number }>()
    for (const p of completedPurchases) {
      const existing = productRevenueMap.get(p.product_id)
      if (existing) {
        existing.total_cents += p.amount || 0
        existing.count += 1
      } else {
        productRevenueMap.set(p.product_id, { product_id: p.product_id, total_cents: p.amount || 0, count: 1 })
      }
    }

    // --- Asset breakdown by category ---
    const assetCategoryMap = new Map<string, { category: string; count: number; total_value_cents: number }>()
    for (const a of activeAssets) {
      const val = a.current_value_cents || a.purchase_cost_cents || 0
      const existing = assetCategoryMap.get(a.category)
      if (existing) {
        existing.count += 1
        existing.total_value_cents += val
      } else {
        assetCategoryMap.set(a.category, { category: a.category, count: 1, total_value_cents: val })
      }
    }

    return NextResponse.json({
      // Top-line metrics
      total_revenue_cents: totalRevenue,
      total_monthly_burn_cents: monthlyBurn,
      total_annual_expenses_cents: annualExpenses,
      total_assets_cents: totalAssets,
      total_capital_cents: totalCapital,
      cash_position_cents: cashPosition,
      ebitda_cents: ebitda,
      runway_months: runwayMonths === Infinity ? null : runwayMonths,
      net_position_cents: totalRevenue + totalCapital - annualExpenses,

      // Counts
      active_expense_count: activeExpenses.length,
      active_asset_count: activeAssets.length,
      total_purchase_count: completedPurchases.length,

      // Breakdowns
      expense_by_category: Array.from(categoryMap.values()).sort((a, b) => b.total_cents - a.total_cents),
      expense_by_project: Array.from(projectMap.values()).sort((a, b) => b.annual_cents - a.annual_cents),
      expense_by_vendor: Array.from(vendorMap.values()).sort((a, b) => b.monthly_cents - a.monthly_cents),
      revenue_by_product: Array.from(productRevenueMap.values()).sort((a, b) => b.total_cents - a.total_cents),
      asset_by_category: Array.from(assetCategoryMap.values()).sort((a, b) => b.total_value_cents - a.total_value_cents),

      // Timeline
      monthly_timeline: Array.from(allMonths).sort().map(month => ({
        month,
        expenses_cents: monthlyExpensesMap.get(month) || 0,
        revenue_cents: monthlyRevenueMap.get(month) || 0,
        net_cents: (monthlyRevenueMap.get(month) || 0) - (monthlyExpensesMap.get(month) || 0),
      })),

      // Capital contributions
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
