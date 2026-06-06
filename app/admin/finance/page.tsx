'use client'

import { useState, useEffect, useCallback } from 'react'
import type {
  Expense, Asset, ExpenseCategory, BalanceSummary, ExpenseFrequency, AssetCategory,
} from '@/lib/finance/types'

// --- Helpers ---

const USD = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

function fmt(cents: number): string {
  return USD.format(cents / 100)
}

function fmtCompact(cents: number): string {
  const abs = Math.abs(cents / 100)
  if (abs >= 1000) return `${cents < 0 ? '-' : ''}$${(abs / 1000).toFixed(1)}k`
  return fmt(cents)
}

const FREQUENCY_LABELS: Record<ExpenseFrequency, string> = {
  monthly: 'Monthly', annual: 'Annual', 'one-time': 'One-time', 'usage-based': 'Usage',
}
function frequencyLabel(f: ExpenseFrequency): string { return FREQUENCY_LABELS[f] }

const ASSET_CATEGORY_LABELS: Record<AssetCategory, string> = {
  hardware: 'Hardware', domain: 'Domain', software_ip: 'Software IP', financial: 'Financial', other: 'Other',
}
function assetCategoryLabel(c: AssetCategory): string { return ASSET_CATEGORY_LABELS[c] }

// Shared form styles
const inputClass = "w-full px-3 py-2 bg-[var(--paper)] border border-[var(--hair)] text-[var(--ink)] text-sm focus:outline-none focus:border-[var(--ink)] transition-colors duration-150"
const labelClass = "block font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] mb-1"

// Shared recharts lazy loader
function useRecharts() {
  const [mod, setMod] = useState<any>(null)
  useEffect(() => { import('recharts').then(setMod) }, [])
  return mod
}

// --- Components ---

function MetricCard({ label, value, subtext, trend, color }: {
  label: string; value: string; subtext?: string; trend?: 'up' | 'down' | 'neutral'; color?: string
}) {
  const trendColor = trend === 'up' ? 'text-[var(--teal)]' : trend === 'down' ? 'text-id8-orange' : 'text-[var(--muted)]'
  return (
    <div className="p-5 bg-[var(--paper)] border border-[var(--hair)]">
      <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] mb-1">{label}</p>
      <p className={`font-[family-name:var(--font-mono)] text-2xl font-medium ${color || 'text-[var(--ink)]'}`}>{value}</p>
      {subtext && <p className={`text-xs mt-1 ${trendColor}`}>{subtext}</p>}
    </div>
  )
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-normal tracking-[-0.01em] text-[var(--ink)]">{title}</h2>
      {action}
    </div>
  )
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 px-4 py-2 bg-[var(--ink)] text-[var(--paper)] border border-[var(--ink)] hover:bg-id8-orange hover:border-id8-orange transition-colors duration-150 font-[family-name:var(--font-narrow)] text-[11px] font-bold uppercase tracking-[0.18em]">
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      {label}
    </button>
  )
}

// --- Charts wrapper (lazy loaded to avoid SSR issues) ---

function Charts({ summary }: { summary: BalanceSummary }) {
  const recharts = useRecharts()
  if (!recharts) return <p className="text-sm text-[var(--text-tertiary)] p-4">Loading charts...</p>

  const { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } = recharts
  // On-palette ramp only — ink, orange, teal, hairline tones.
  const PIE_COLORS = ['#0b0b0b', '#ff6b35', '#2a8d83', '#5a5a5a', '#b4afa0', '#d6d3c9', '#2a2a2a', '#ededdf']
  const s = summary

  return (
    <>
      {/* Expense by Category — Pie */}
      {s.expense_by_category.length > 0 && (
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={140} height={140}>
            <PieChart>
              <Pie data={s.expense_by_category} dataKey="total_cents" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                {s.expense_by_category.map((entry: { name: string }, i: number) => (
                  <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => fmt(Number(value))} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-1.5">
            {s.expense_by_category.map((cat: { name: string; total_cents: number }, i: number) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                  <span className="text-[var(--body)]">{cat.name}</span>
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[var(--ink)]">{fmtCompact(cat.total_cents)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function CashFlowChart({ summary }: { summary: BalanceSummary }) {
  const recharts = useRecharts()
  if (!recharts || summary.monthly_timeline.length === 0) return null

  const { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend } = recharts
  return (
    <div className="p-5 bg-[var(--paper)] border border-[var(--hair)]">
      <p className="font-[family-name:var(--font-narrow)] text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] mb-4">Monthly Cash Flow</p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={summary.monthly_timeline.map((t: { month: string; revenue_cents: number; expenses_cents: number }) => ({
          month: t.month, revenue: t.revenue_cents / 100, expenses: t.expenses_cents / 100,
        }))}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--hair)" />
          <XAxis dataKey="month" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
          <YAxis tick={{ fill: 'var(--muted)', fontSize: 11 }} tickFormatter={(v: number) => `$${v}`} />
          <Tooltip contentStyle={{ background: 'var(--paper)', border: '1px solid var(--hair)', borderRadius: '0px', fontSize: '12px' }} formatter={(value: number) => `$${Number(value).toFixed(2)}`} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#2a8d83" fill="#2a8d83" fillOpacity={0.15} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#ff6b35" fill="#ff6b35" fillOpacity={0.1} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function VendorChart({ summary }: { summary: BalanceSummary }) {
  const recharts = useRecharts()
  const vendors = summary.expense_by_vendor.filter((v: { monthly_cents: number }) => v.monthly_cents > 0)
  if (!recharts || vendors.length === 0) return <p className="text-sm text-[var(--text-tertiary)]">No vendor data</p>

  const { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } = recharts
  return (
    <ResponsiveContainer width="100%" height={Math.min(vendors.length * 36, 250)}>
      <BarChart data={vendors} layout="vertical" margin={{ left: 80, right: 20, top: 0, bottom: 0 }}>
        <XAxis type="number" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} tickFormatter={(v: number) => `$${(v / 100).toFixed(0)}`} />
        <YAxis type="category" dataKey="vendor" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} width={80} />
        <Tooltip formatter={(value: number) => fmt(Number(value))} />
        <Bar dataKey="monthly_cents" name="Monthly" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

// --- Add Expense Modal ---

function AddExpenseForm({ categories, onSave, onCancel }: {
  categories: ExpenseCategory[]; onSave: (data: Record<string, unknown>) => void; onCancel: () => void
}) {
  const [form, setForm] = useState({ description: '', category_id: '', amount: '', frequency: 'monthly' as ExpenseFrequency, vendor: '', project: '', notes: '' })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      description: form.description, category_id: form.category_id || undefined,
      amount_cents: Math.round(parseFloat(form.amount) * 100), frequency: form.frequency,
      vendor: form.vendor || undefined, project: form.project || undefined, notes: form.notes || undefined,
    })
  }
  const ic = inputClass
  const lc = labelClass
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
      <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Add Expense</h3>
        <div><label className={lc}>Description *</label><input className={ic} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Amount (USD) *</label><input className={ic} type="number" step="0.01" min="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required /></div>
          <div><label className={lc}>Frequency *</label><select className={ic} value={form.frequency} onChange={e => setForm(f => ({ ...f, frequency: e.target.value as ExpenseFrequency }))}><option value="monthly">Monthly</option><option value="annual">Annual</option><option value="one-time">One-time</option><option value="usage-based">Usage-based</option></select></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Category</label><select className={ic} value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}><option value="">None</option>{categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div><label className={lc}>Vendor</label><input className={ic} value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} /></div>
        </div>
        <div><label className={lc}>Project</label><input className={ic} placeholder="parallax, homer, all..." value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} /></div>
        <div><label className={lc}>Notes</label><textarea className={ic} rows={2} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} /></div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] text-sm">Cancel</button>
          <button type="submit" className="flex-1 px-4 py-2 bg-[var(--id8-orange)] text-white rounded-lg hover:opacity-90 text-sm font-medium">Save</button>
        </div>
      </form>
    </div>
  )
}

// --- Add Asset Modal ---

function AddAssetForm({ onSave, onCancel }: { onSave: (data: Record<string, unknown>) => void; onCancel: () => void }) {
  const [form, setForm] = useState({ name: '', category: 'other' as AssetCategory, description: '', purchase_cost: '', current_value: '', vendor: '', notes: '' })
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: form.name, category: form.category, description: form.description || undefined,
      purchase_cost_cents: form.purchase_cost ? Math.round(parseFloat(form.purchase_cost) * 100) : undefined,
      current_value_cents: form.current_value ? Math.round(parseFloat(form.current_value) * 100) : undefined,
      vendor: form.vendor || undefined, notes: form.notes || undefined,
    })
  }
  const ic = inputClass
  const lc = labelClass
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onCancel}>
      <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()} className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl p-6 w-full max-w-md space-y-3">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">Add Asset</h3>
        <div><label className={lc}>Name *</label><input className={ic} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Category *</label><select className={ic} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as AssetCategory }))}><option value="hardware">Hardware</option><option value="domain">Domain</option><option value="software_ip">Software IP</option><option value="financial">Financial</option><option value="other">Other</option></select></div>
          <div><label className={lc}>Vendor</label><input className={ic} value={form.vendor} onChange={e => setForm(f => ({ ...f, vendor: e.target.value }))} /></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className={lc}>Purchase Cost (USD)</label><input className={ic} type="number" step="0.01" min="0" value={form.purchase_cost} onChange={e => setForm(f => ({ ...f, purchase_cost: e.target.value }))} /></div>
          <div><label className={lc}>Current Value (USD)</label><input className={ic} type="number" step="0.01" min="0" value={form.current_value} onChange={e => setForm(f => ({ ...f, current_value: e.target.value }))} /></div>
        </div>
        <div><label className={lc}>Description</label><textarea className={ic} rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} /></div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onCancel} className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] text-sm">Cancel</button>
          <button type="submit" className="flex-1 px-4 py-2 bg-[var(--id8-orange)] text-white rounded-lg hover:opacity-90 text-sm font-medium">Save</button>
        </div>
      </form>
    </div>
  )
}

// --- Main Dashboard ---

type Tab = 'overview' | 'expenses' | 'assets'

export default function FinanceDashboard() {
  const [tab, setTab] = useState<Tab>('overview')
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<BalanceSummary | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [assets, setAssets] = useState<Asset[]>([])
  const [categories, setCategories] = useState<ExpenseCategory[]>([])
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [showAddAsset, setShowAddAsset] = useState(false)
  const [expenseFilter, setExpenseFilter] = useState<'all' | ExpenseFrequency>('all')

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [sumRes, expRes, assetRes, catRes] = await Promise.all([
        fetch('/api/admin/finance/summary'),
        fetch('/api/admin/finance/expenses'),
        fetch('/api/admin/finance/assets'),
        fetch('/api/admin/finance/categories'),
      ])
      const [sumData, expData, assetData, catData] = await Promise.all([
        sumRes.json(), expRes.json(), assetRes.json(), catRes.json(),
      ])
      setSummary(sumData)
      setExpenses(expData.expenses || [])
      setAssets(assetData.assets || [])
      setCategories(catData.categories || [])
    } catch (err) {
      console.error('Failed to fetch finance data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleAddExpense = async (data: Record<string, unknown>) => {
    try {
      const res = await fetch('/api/admin/finance/expenses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) { setShowAddExpense(false); fetchAll() }
    } catch (err) { console.error('Failed to add expense:', err) }
  }

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Delete this expense?')) return
    try { await fetch(`/api/admin/finance/expenses/${id}`, { method: 'DELETE' }); fetchAll() }
    catch (err) { console.error('Failed to delete expense:', err) }
  }

  const handleAddAsset = async (data: Record<string, unknown>) => {
    try {
      const res = await fetch('/api/admin/finance/assets', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (res.ok) { setShowAddAsset(false); fetchAll() }
    } catch (err) { console.error('Failed to add asset:', err) }
  }

  const handleDeleteAsset = async (id: string) => {
    if (!confirm('Delete this asset?')) return
    try { await fetch(`/api/admin/finance/assets/${id}`, { method: 'DELETE' }); fetchAll() }
    catch (err) { console.error('Failed to delete asset:', err) }
  }

  const filteredExpenses = expenseFilter === 'all' ? expenses : expenses.filter(e => e.frequency === expenseFilter)

  const tabClass = (t: Tab) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
      tab === t ? 'bg-[var(--id8-orange)] text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
    }`

  const s = summary

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Finance</h1>
          <p className="text-sm text-[var(--text-secondary)]">id8Labs LLC Financial Dashboard</p>
        </div>
        <div className="flex gap-2">
          <button className={tabClass('overview')} onClick={() => setTab('overview')}>Overview</button>
          <button className={tabClass('expenses')} onClick={() => setTab('expenses')}>Expenses</button>
          <button className={tabClass('assets')} onClick={() => setTab('assets')}>Assets</button>
        </div>
      </div>

      {/* ==================== OVERVIEW TAB ==================== */}
      {tab === 'overview' && (
        <div className="space-y-6">
          {/* Row 1: Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <MetricCard label="Monthly Burn" value={loading ? '...' : fmt(s?.total_monthly_burn_cents || 0)} subtext="Active recurring" color="text-red-500" />
            <MetricCard label="Annual Expenses" value={loading ? '...' : fmt(s?.total_annual_expenses_cents || 0)} subtext={`${s?.active_expense_count || 0} active items`} />
            <MetricCard label="Total Revenue" value={loading ? '...' : fmt(s?.total_revenue_cents || 0)} subtext={`${s?.total_purchase_count || 0} purchases`} color="text-green-500" />
            <MetricCard label="EBITDA" value={loading ? '...' : fmt(s?.ebitda_cents || 0)} subtext="Revenue - OpEx" color={(s?.ebitda_cents || 0) >= 0 ? 'text-green-500' : 'text-red-500'} />
            <MetricCard label="Total Assets" value={loading ? '...' : fmt(s?.total_assets_cents || 0)} subtext={`${s?.active_asset_count || 0} active`} color="text-blue-500" />
            <MetricCard label="Runway" value={loading ? '...' : s?.runway_months != null ? `${s.runway_months} mo` : 'N/A'} subtext="At current burn rate" trend={s?.runway_months != null && s.runway_months > 12 ? 'up' : s?.runway_months != null && s.runway_months < 6 ? 'down' : 'neutral'} />
          </div>

          {/* Row 2: Cash Position + Category Pie */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Cash Position</p>
              <p className="text-3xl font-bold text-[var(--text-primary)]">{loading ? '...' : fmt(s?.cash_position_cents || 0)}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Capital + Revenue - Paid Expenses</p>
              <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Capital In</p>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{loading ? '...' : fmt(s?.total_capital_cents || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Revenue</p>
                  <p className="text-sm font-medium text-green-500">{loading ? '...' : fmt(s?.total_revenue_cents || 0)}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-tertiary)]">Net Position</p>
                  <p className={`text-sm font-medium ${(s?.net_position_cents || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>{loading ? '...' : fmt(s?.net_position_cents || 0)}</p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2">Annual Spend by Category</p>
              {s ? <Charts summary={s} /> : <p className="text-sm text-[var(--text-tertiary)]">{loading ? 'Loading...' : 'No data'}</p>}
            </div>
          </div>

          {/* Row 3: Cash Flow Chart */}
          {s && <CashFlowChart summary={s} />}

          {/* Row 4: Cost by Project + Top Vendors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Cost by Project</p>
              {s && s.expense_by_project.length > 0 ? (
                <div className="space-y-3">
                  {s.expense_by_project.map(proj => {
                    const maxAnnual = s.expense_by_project[0]?.annual_cents || 1
                    const pct = (proj.annual_cents / maxAnnual) * 100
                    return (
                      <div key={proj.project}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-[var(--text-primary)] font-medium">{proj.project}</span>
                          <span className="text-xs text-[var(--text-secondary)]">{fmt(proj.monthly_cents)}/mo &middot; {fmt(proj.annual_cents)}/yr</span>
                        </div>
                        <div className="h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--id8-orange)] rounded-full transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : <p className="text-sm text-[var(--text-tertiary)]">{loading ? 'Loading...' : 'No project data'}</p>}
            </div>
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Top Vendors (Monthly)</p>
              {s ? <VendorChart summary={s} /> : <p className="text-sm text-[var(--text-tertiary)]">{loading ? 'Loading...' : 'No data'}</p>}
            </div>
          </div>

          {/* Row 5: Revenue + Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Revenue by Product</p>
              {s && s.revenue_by_product.length > 0 ? (
                <div className="space-y-2">
                  {s.revenue_by_product.map(prod => (
                    <div key={prod.product_id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                      <div><p className="text-sm text-[var(--text-primary)] font-medium">{prod.product_id}</p><p className="text-xs text-[var(--text-tertiary)]">{prod.count} purchase{prod.count !== 1 ? 's' : ''}</p></div>
                      <p className="text-sm font-bold text-green-500">{fmt(prod.total_cents)}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-[var(--text-tertiary)]">{loading ? 'Loading...' : 'No revenue yet'}</p>}
            </div>
            <div className="p-5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
              <p className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">Asset Breakdown</p>
              {s && s.asset_by_category.length > 0 ? (
                <div className="space-y-2">
                  {s.asset_by_category.map(cat => (
                    <div key={cat.category} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                      <div><p className="text-sm text-[var(--text-primary)] font-medium">{assetCategoryLabel(cat.category as AssetCategory)}</p><p className="text-xs text-[var(--text-tertiary)]">{cat.count} item{cat.count !== 1 ? 's' : ''}</p></div>
                      <p className="text-sm font-bold text-blue-500">{cat.total_value_cents > 0 ? fmt(cat.total_value_cents) : 'Not valued'}</p>
                    </div>
                  ))}
                </div>
              ) : <p className="text-sm text-[var(--text-tertiary)]">{loading ? 'Loading...' : 'No assets'}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ==================== EXPENSES TAB ==================== */}
      {tab === 'expenses' && (
        <div className="space-y-4">
          <SectionHeader title="Expense Tracker" action={
            <div className="flex items-center gap-3">
              <select className="px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-[var(--text-secondary)] text-xs" value={expenseFilter} onChange={e => setExpenseFilter(e.target.value as typeof expenseFilter)}>
                <option value="all">All Frequencies</option><option value="monthly">Monthly</option><option value="annual">Annual</option><option value="one-time">One-time</option><option value="usage-based">Usage-based</option>
              </select>
              <AddButton label="Add Expense" onClick={() => setShowAddExpense(true)} />
            </div>
          } />
          <div className="grid grid-cols-4 gap-3">
            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center"><p className="text-lg font-bold text-[var(--text-primary)]">{filteredExpenses.length}</p><p className="text-[10px] text-[var(--text-tertiary)] uppercase">Items</p></div>
            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center"><p className="text-lg font-bold text-[var(--text-primary)]">{fmt(filteredExpenses.filter(e => e.frequency === 'monthly').reduce((acc, e) => acc + e.amount_cents, 0))}</p><p className="text-[10px] text-[var(--text-tertiary)] uppercase">Monthly Total</p></div>
            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center"><p className="text-lg font-bold text-[var(--text-primary)]">{fmt(filteredExpenses.filter(e => e.frequency === 'annual').reduce((acc, e) => acc + e.amount_cents, 0))}</p><p className="text-[10px] text-[var(--text-tertiary)] uppercase">Annual Total</p></div>
            <div className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg text-center"><p className="text-lg font-bold text-[var(--text-primary)]">{filteredExpenses.filter(e => e.is_active).length}</p><p className="text-[10px] text-[var(--text-tertiary)] uppercase">Active</p></div>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]/50">
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Description</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Category</th>
                <th className="text-right px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Freq</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Vendor</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Project</th>
                <th className="w-10"></th>
              </tr></thead>
              <tbody>
                {filteredExpenses.map(exp => (
                  <tr key={exp.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/30 transition-colors">
                    <td className="px-4 py-3 text-[var(--text-primary)]">{exp.description}{!exp.is_active && <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-500 rounded">inactive</span>}</td>
                    <td className="px-4 py-3">{exp.category ? <span className="inline-flex items-center gap-1.5 text-xs"><span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: exp.category.color || '#6B7280' }} /><span className="text-[var(--text-secondary)]">{exp.category.name}</span></span> : <span className="text-[var(--text-tertiary)] text-xs">--</span>}</td>
                    <td className="px-4 py-3 text-right text-[var(--text-primary)] font-medium tabular-nums">{fmt(exp.amount_cents)}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)]">{frequencyLabel(exp.frequency)}</span></td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">{exp.vendor || '--'}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">{exp.project || '--'}</td>
                    <td className="px-4 py-3"><button onClick={() => handleDeleteExpense(exp.id)} className="text-[var(--text-tertiary)] hover:text-red-500 transition-colors" title="Delete"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-[var(--text-tertiary)] text-sm">No expenses {expenseFilter !== 'all' ? `with ${expenseFilter} frequency` : 'yet'}.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================== ASSETS TAB ==================== */}
      {tab === 'assets' && (
        <div className="space-y-4">
          <SectionHeader title="Asset Register" action={<AddButton label="Add Asset" onClick={() => setShowAddAsset(true)} />} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(['hardware', 'domain', 'software_ip', 'other'] as const).map(cat => {
              const items = assets.filter(a => a.category === cat && a.is_active)
              const value = items.reduce((acc, a) => acc + (a.current_value_cents || a.purchase_cost_cents || 0), 0)
              return (
                <div key={cat} className="p-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg">
                  <p className="text-[10px] text-[var(--text-tertiary)] uppercase tracking-wider mb-1">{assetCategoryLabel(cat)}</p>
                  <p className="text-lg font-bold text-[var(--text-primary)]">{items.length}</p>
                  {value > 0 && <p className="text-xs text-blue-500">{fmt(value)}</p>}
                </div>
              )
            })}
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-[var(--border)] bg-[var(--bg-primary)]/50">
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Description</th>
                <th className="text-right px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Cost</th>
                <th className="text-right px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Value</th>
                <th className="text-left px-4 py-3 text-[var(--text-tertiary)] font-medium text-xs uppercase tracking-wider">Vendor</th>
                <th className="w-10"></th>
              </tr></thead>
              <tbody>
                {assets.map(asset => (
                  <tr key={asset.id} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg-primary)]/30 transition-colors">
                    <td className="px-4 py-3 text-[var(--text-primary)] font-medium">{asset.name}{!asset.is_active && <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-red-500/10 text-red-500 rounded">inactive</span>}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-secondary)]">{assetCategoryLabel(asset.category)}</span></td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] text-xs max-w-[200px] truncate">{asset.description || '--'}</td>
                    <td className="px-4 py-3 text-right text-[var(--text-primary)] tabular-nums">{asset.purchase_cost_cents ? fmt(asset.purchase_cost_cents) : '--'}</td>
                    <td className="px-4 py-3 text-right text-blue-500 font-medium tabular-nums">{asset.current_value_cents ? fmt(asset.current_value_cents) : '--'}</td>
                    <td className="px-4 py-3 text-[var(--text-secondary)] text-xs">{asset.vendor || '--'}</td>
                    <td className="px-4 py-3"><button onClick={() => handleDeleteAsset(asset.id)} className="text-[var(--text-tertiary)] hover:text-red-500 transition-colors" title="Delete"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button></td>
                  </tr>
                ))}
                {assets.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-[var(--text-tertiary)] text-sm">No assets registered yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAddExpense && <AddExpenseForm categories={categories} onSave={handleAddExpense} onCancel={() => setShowAddExpense(false)} />}
      {showAddAsset && <AddAssetForm onSave={handleAddAsset} onCancel={() => setShowAddAsset(false)} />}
    </div>
  )
}
