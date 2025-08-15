-- Add new fields to startup_portfolios table
ALTER TABLE startup_portfolios
ADD COLUMN IF NOT EXISTS sales_channels JSONB,
ADD COLUMN IF NOT EXISTS funding_purpose TEXT,
ADD COLUMN IF NOT EXISTS burn_rate INTEGER,
ADD COLUMN IF NOT EXISTS runway_months INTEGER,
ADD COLUMN IF NOT EXISTS break_even_timeline TEXT,
ADD COLUMN IF NOT EXISTS investor_ask TEXT,
ADD COLUMN IF NOT EXISTS traction_metrics TEXT,
ADD COLUMN IF NOT EXISTS use_of_funds TEXT,
ADD COLUMN IF NOT EXISTS exit_strategy TEXT;