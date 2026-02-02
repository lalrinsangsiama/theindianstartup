-- THE INDIAN STARTUP - Purchase Table RLS Security
-- Migration: 20260129_001_purchase_rls.sql
-- Purpose: Add Row Level Security to Purchase table for data protection

-- ================================================
-- STEP 1: ENABLE RLS ON PURCHASE TABLE
-- ================================================
ALTER TABLE "Purchase" ENABLE ROW LEVEL SECURITY;

-- ================================================
-- STEP 2: DROP EXISTING POLICIES (if they exist)
-- ================================================
DROP POLICY IF EXISTS "Users can view own purchases" ON "Purchase";
DROP POLICY IF EXISTS "Users can insert own purchases" ON "Purchase";
DROP POLICY IF EXISTS "Users can update own purchases" ON "Purchase";
DROP POLICY IF EXISTS "Service role full access to purchases" ON "Purchase";

-- ================================================
-- STEP 3: CREATE USER POLICIES
-- ================================================

-- Users can view their own purchases
CREATE POLICY "Users can view own purchases" ON "Purchase"
FOR SELECT USING (auth.uid()::text = "userId");

-- Users can insert their own purchases (for initiating payment)
CREATE POLICY "Users can insert own purchases" ON "Purchase"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

-- Users can update their own purchases (status updates via webhook go through service role)
CREATE POLICY "Users can update own purchases" ON "Purchase"
FOR UPDATE USING (auth.uid()::text = "userId");

-- ================================================
-- STEP 4: CREATE SERVICE ROLE POLICY
-- ================================================
-- Service role needs full access for webhooks and admin operations
CREATE POLICY "Service role full access to purchases" ON "Purchase"
FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- STEP 5: VERIFY SETUP
-- ================================================
SELECT
    tablename,
    CASE WHEN rowsecurity THEN '✅ RLS Enabled' ELSE '❌ RLS Disabled' END as "RLS Status"
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'Purchase';

SELECT policyname, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
AND tablename = 'Purchase';
