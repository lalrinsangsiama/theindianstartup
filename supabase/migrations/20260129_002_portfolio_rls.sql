-- THE INDIAN STARTUP - PortfolioActivity Table RLS Security
-- Migration: 20260129_002_portfolio_rls.sql
-- Purpose: Add Row Level Security to PortfolioActivity table for data protection

-- ================================================
-- STEP 1: ENABLE RLS ON PORTFOLIOACTIVITY TABLE
-- ================================================
ALTER TABLE "PortfolioActivity" ENABLE ROW LEVEL SECURITY;

-- ================================================
-- STEP 2: DROP EXISTING POLICIES (if they exist)
-- ================================================
DROP POLICY IF EXISTS "Users can view own activities" ON "PortfolioActivity";
DROP POLICY IF EXISTS "Users can insert own activities" ON "PortfolioActivity";
DROP POLICY IF EXISTS "Users can update own activities" ON "PortfolioActivity";
DROP POLICY IF EXISTS "Users can delete own activities" ON "PortfolioActivity";
DROP POLICY IF EXISTS "Service role full access to portfolio activities" ON "PortfolioActivity";

-- ================================================
-- STEP 3: CREATE USER POLICIES
-- ================================================

-- Users can view their own portfolio activities
CREATE POLICY "Users can view own activities" ON "PortfolioActivity"
FOR SELECT USING (auth.uid()::text = "userId");

-- Users can insert their own portfolio activities
CREATE POLICY "Users can insert own activities" ON "PortfolioActivity"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own portfolio activities
CREATE POLICY "Users can update own activities" ON "PortfolioActivity"
FOR UPDATE USING (auth.uid()::text = "userId");

-- Users can delete their own portfolio activities
CREATE POLICY "Users can delete own activities" ON "PortfolioActivity"
FOR DELETE USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 4: CREATE SERVICE ROLE POLICY
-- ================================================
-- Service role needs full access for admin operations
CREATE POLICY "Service role full access to portfolio activities" ON "PortfolioActivity"
FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- STEP 5: VERIFY SETUP
-- ================================================
SELECT
    tablename,
    CASE WHEN rowsecurity THEN '✅ RLS Enabled' ELSE '❌ RLS Disabled' END as "RLS Status"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'PortfolioActivity';

SELECT policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'PortfolioActivity';
