// Finance module types — expense tracking, asset management, balance sheet

export interface ExpenseCategory {
  id: string
  name: string
  color: string | null
  created_at: string
}

export type ExpenseFrequency = 'monthly' | 'annual' | 'one-time' | 'usage-based'

export interface Expense {
  id: string
  description: string
  category_id: string | null
  amount_cents: number
  currency: string
  frequency: ExpenseFrequency
  vendor: string | null
  project: string | null
  start_date: string | null
  end_date: string | null
  is_active: boolean
  notes: string | null
  created_at: string
  updated_at: string
  // Joined fields
  category?: ExpenseCategory
}

export interface ExpenseEntry {
  id: string
  expense_id: string
  amount_cents: number
  period_start: string
  period_end: string
  paid_at: string | null
  receipt_url: string | null
  notes: string | null
  created_at: string
  // Joined fields
  expense?: Expense
}

export type AssetCategory = 'hardware' | 'domain' | 'software_ip' | 'financial' | 'other'

export interface Asset {
  id: string
  name: string
  category: AssetCategory
  description: string | null
  purchase_date: string | null
  purchase_cost_cents: number | null
  current_value_cents: number | null
  vendor: string | null
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CapitalContribution {
  id: string
  description: string
  amount_cents: number
  contributed_at: string
  notes: string | null
  created_at: string
}

export interface BalanceSummary {
  // Top-line metrics
  total_revenue_cents: number
  total_monthly_burn_cents: number
  total_annual_expenses_cents: number
  total_assets_cents: number
  total_capital_cents: number
  cash_position_cents: number
  ebitda_cents: number
  runway_months: number | null
  net_position_cents: number

  // Counts
  active_expense_count: number
  active_asset_count: number
  total_purchase_count: number

  // Breakdowns
  expense_by_category: { name: string; color: string; total_cents: number; count: number }[]
  expense_by_project: { project: string; monthly_cents: number; annual_cents: number; count: number }[]
  expense_by_vendor: { vendor: string; monthly_cents: number }[]
  revenue_by_product: { product_id: string; total_cents: number; count: number }[]
  asset_by_category: { category: string; count: number; total_value_cents: number }[]

  // Timeline
  monthly_timeline: { month: string; expenses_cents: number; revenue_cents: number; net_cents: number }[]

  // Capital
  capital_contributions: CapitalContribution[]
}

// API request types
export interface CreateExpenseRequest {
  description: string
  category_id?: string
  amount_cents: number
  currency?: string
  frequency: ExpenseFrequency
  vendor?: string
  project?: string
  start_date?: string
  end_date?: string
  is_active?: boolean
  notes?: string
}

export interface CreateExpenseEntryRequest {
  expense_id: string
  amount_cents: number
  period_start: string
  period_end: string
  paid_at?: string
  receipt_url?: string
  notes?: string
}

export interface CreateAssetRequest {
  name: string
  category: AssetCategory
  description?: string
  purchase_date?: string
  purchase_cost_cents?: number
  current_value_cents?: number
  vendor?: string
  notes?: string
  is_active?: boolean
}
