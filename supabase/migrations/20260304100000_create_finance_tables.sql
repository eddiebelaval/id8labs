-- Finance module: expense tracking, asset management, balance sheet
-- Part of id8Labs admin panel at /admin/finance

-- Expense categories (SaaS, Infrastructure, API Usage, etc.)
CREATE TABLE IF NOT EXISTS public.expense_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  color text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on expense_categories"
  ON public.expense_categories
  FOR ALL
  USING (auth.role() = 'service_role');

-- Recurring/one-time expense definitions
CREATE TABLE IF NOT EXISTS public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  category_id uuid REFERENCES public.expense_categories(id) ON DELETE SET NULL,
  amount_cents integer NOT NULL,
  currency text DEFAULT 'usd',
  frequency text NOT NULL CHECK (frequency IN ('monthly', 'annual', 'one-time', 'usage-based')),
  vendor text,
  project text,
  start_date date,
  end_date date,
  is_active boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on expenses"
  ON public.expenses
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE INDEX idx_expenses_category ON public.expenses(category_id);
CREATE INDEX idx_expenses_active ON public.expenses(is_active);
CREATE INDEX idx_expenses_vendor ON public.expenses(vendor);

-- Actual payment entries for each expense period
CREATE TABLE IF NOT EXISTS public.expense_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  expense_id uuid NOT NULL REFERENCES public.expenses(id) ON DELETE CASCADE,
  amount_cents integer NOT NULL,
  period_start date NOT NULL,
  period_end date NOT NULL,
  paid_at date,
  receipt_url text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.expense_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on expense_entries"
  ON public.expense_entries
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE INDEX idx_expense_entries_expense ON public.expense_entries(expense_id);
CREATE INDEX idx_expense_entries_period ON public.expense_entries(period_start, period_end);

-- Company assets (hardware, domains, IP, etc.)
CREATE TABLE IF NOT EXISTS public.assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('hardware', 'domain', 'software_ip', 'financial', 'other')),
  description text,
  purchase_date date,
  purchase_cost_cents integer,
  current_value_cents integer,
  vendor text,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on assets"
  ON public.assets
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE INDEX idx_assets_category ON public.assets(category);
CREATE INDEX idx_assets_active ON public.assets(is_active);

-- Capital contributions (owner investment into the LLC)
CREATE TABLE IF NOT EXISTS public.capital_contributions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  description text NOT NULL,
  amount_cents integer NOT NULL,
  contributed_at date NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.capital_contributions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on capital_contributions"
  ON public.capital_contributions
  FOR ALL
  USING (auth.role() = 'service_role');

-- Seed expense categories
INSERT INTO public.expense_categories (name, color) VALUES
  ('SaaS/Subscriptions', '#3B82F6'),
  ('Infrastructure/Hosting', '#8B5CF6'),
  ('API Usage', '#F59E0B'),
  ('Domains', '#10B981'),
  ('Legal/Compliance', '#EF4444'),
  ('Hardware', '#6366F1'),
  ('Marketing', '#EC4899'),
  ('Other', '#6B7280')
ON CONFLICT (name) DO NOTHING;

-- Seed known recurring expenses (amounts in cents)
INSERT INTO public.expenses (description, category_id, amount_cents, frequency, vendor, project, start_date, is_active) VALUES
  ('Vercel Pro', (SELECT id FROM public.expense_categories WHERE name = 'Infrastructure/Hosting'), 2000, 'monthly', 'Vercel', 'all', '2024-01-01', true),
  ('Supabase Pro', (SELECT id FROM public.expense_categories WHERE name = 'Infrastructure/Hosting'), 2500, 'monthly', 'Supabase', 'all', '2024-01-01', true),
  ('Anthropic API', (SELECT id FROM public.expense_categories WHERE name = 'API Usage'), 0, 'usage-based', 'Anthropic', 'all', '2024-01-01', true),
  ('Railway', (SELECT id FROM public.expense_categories WHERE name = 'Infrastructure/Hosting'), 500, 'monthly', 'Railway', 'hydra', '2024-06-01', true),
  ('Resend', (SELECT id FROM public.expense_categories WHERE name = 'SaaS/Subscriptions'), 0, 'usage-based', 'Resend', 'id8labs', '2024-01-01', true),
  ('Upstash Redis', (SELECT id FROM public.expense_categories WHERE name = 'Infrastructure/Hosting'), 0, 'usage-based', 'Upstash', 'all', '2024-06-01', true),
  ('ElevenLabs', (SELECT id FROM public.expense_categories WHERE name = 'API Usage'), 500, 'monthly', 'ElevenLabs', 'parallax', '2025-06-01', true),
  ('Deepgram', (SELECT id FROM public.expense_categories WHERE name = 'API Usage'), 0, 'usage-based', 'Deepgram', 'rune', '2025-09-01', true),
  ('Twilio', (SELECT id FROM public.expense_categories WHERE name = 'API Usage'), 0, 'usage-based', 'Twilio', 'hydra', '2025-06-01', true),
  ('Google Maps API', (SELECT id FROM public.expense_categories WHERE name = 'API Usage'), 0, 'usage-based', 'Google', 'homer', '2024-06-01', true),
  ('FL LLC Annual Report', (SELECT id FROM public.expense_categories WHERE name = 'Legal/Compliance'), 13875, 'annual', 'State of Florida', 'all', '2024-01-01', true),
  ('tryparallax.space domain', (SELECT id FROM public.expense_categories WHERE name = 'Domains'), 1200, 'annual', 'Namecheap', 'parallax', '2025-01-01', true),
  ('tryhomer.vip domain', (SELECT id FROM public.expense_categories WHERE name = 'Domains'), 3500, 'annual', 'Namecheap', 'homer', '2024-01-01', true),
  ('id8labs.app domain', (SELECT id FROM public.expense_categories WHERE name = 'Domains'), 1500, 'annual', 'Namecheap', 'id8labs', '2024-01-01', true)
ON CONFLICT DO NOTHING;

-- Seed known assets
INSERT INTO public.assets (name, category, description, vendor, is_active) VALUES
  ('Mac Studio', 'hardware', 'Primary development machine — Apple Silicon', 'Apple', true),
  ('tryparallax.space', 'domain', 'Parallax product domain', 'Namecheap', true),
  ('tryhomer.vip', 'domain', 'Homer product domain', 'Namecheap', true),
  ('id8labs.app', 'domain', 'Company website domain', 'Namecheap', true),
  ('justpause.partners', 'domain', 'Pause product domain (dormant)', 'Namecheap', true),
  ('aiplaces.art', 'domain', 'aiPlaces product domain', 'Namecheap', true),
  ('Parallax', 'software_ip', 'AI companion platform — Ava solo/mediation/academy modes', null, true),
  ('Homer', 'software_ip', 'AI-augmented dashboard platform', null, true),
  ('Rune', 'software_ip', 'Voice-first book writer', null, true),
  ('HYDRA', 'software_ip', 'Autonomous agent orchestration system', null, true),
  ('Consciousness as Filesystem', 'software_ip', 'Research paper — mind as ~/mind/ filesystem', null, true)
ON CONFLICT DO NOTHING;
