-- ============================================================
-- SECURITY AUDIT FIXES
-- Run: 2026-02-02
--
-- Fixes the following linter errors:
-- 1. policy_exists_rls_disabled: User table has policies but RLS disabled
-- 2. security_definer_view: active_government_schemes view uses SECURITY DEFINER
-- 3. rls_disabled_in_public: Multiple tables missing RLS
-- ============================================================

-- ============================================================
-- PART 1: ENABLE RLS ON USER TABLE (has policies but RLS disabled)
-- ============================================================
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 2: ENABLE RLS ON CONTENT TABLES
-- ============================================================
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Resource" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 3: ENABLE RLS ON GAMIFICATION TABLES
-- ============================================================
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ActivityType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Badge" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 4: ENABLE RLS ON REFERENCE DATA TABLES
-- ============================================================
ALTER TABLE "Coupon" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Incubator" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Scheme" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Investor" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 5: ENABLE RLS ON USER-GENERATED CONTENT TABLES
-- ============================================================
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FounderLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Referral" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 6: FIX SECURITY DEFINER VIEW
-- Recreate active_government_schemes with SECURITY INVOKER
-- ============================================================
DROP VIEW IF EXISTS active_government_schemes;

CREATE VIEW active_government_schemes
WITH (security_invoker = true)
AS
SELECT
    scheme_code,
    scheme_name,
    scheme_type,
    category,
    subcategory,
    applicable_states,
    implementing_agency,
    min_funding_amount,
    max_funding_amount,
    funding_type,
    eligibility_criteria,
    application_url,
    contact_email,
    website_url,
    success_rate,
    average_approval_time
FROM government_schemes
WHERE is_active = true
ORDER BY scheme_type, category, max_funding_amount DESC;

-- ============================================================
-- PART 7: RLS POLICIES FOR CONTENT TABLES (public read)
-- ============================================================

-- Product: Public can read products (catalog)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Product'
    AND policyname = 'Public can read products'
  ) THEN
    CREATE POLICY "Public can read products" ON "Product"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Admin can manage products
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Product'
    AND policyname = 'Admin can manage products'
  ) THEN
    CREATE POLICY "Admin can manage products" ON "Product"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Module: Public can read modules
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Module'
    AND policyname = 'Public can read modules'
  ) THEN
    CREATE POLICY "Public can read modules" ON "Module"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Admin can manage modules
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Module'
    AND policyname = 'Admin can manage modules'
  ) THEN
    CREATE POLICY "Admin can manage modules" ON "Module"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Lesson: Public can read lessons (content access checked at API level)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Lesson'
    AND policyname = 'Public can read lessons'
  ) THEN
    CREATE POLICY "Public can read lessons" ON "Lesson"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Admin can manage lessons
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Lesson'
    AND policyname = 'Admin can manage lessons'
  ) THEN
    CREATE POLICY "Admin can manage lessons" ON "Lesson"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Resource: Public can read resources
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Resource'
    AND policyname = 'Public can read resources'
  ) THEN
    CREATE POLICY "Public can read resources" ON "Resource"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Admin can manage resources
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Resource'
    AND policyname = 'Admin can manage resources'
  ) THEN
    CREATE POLICY "Admin can manage resources" ON "Resource"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- ============================================================
-- PART 8: RLS POLICIES FOR GAMIFICATION TABLES
-- ============================================================

-- XPEvent: Users can read their own XP events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'XPEvent'
    AND policyname = 'Users can read own XP events'
  ) THEN
    CREATE POLICY "Users can read own XP events" ON "XPEvent"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- XPEvent: Users can create own XP events (via system)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'XPEvent'
    AND policyname = 'Users can create own XP events'
  ) THEN
    CREATE POLICY "Users can create own XP events" ON "XPEvent"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

-- XPEvent: Service role can manage XP events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'XPEvent'
    AND policyname = 'Service role can manage XP events'
  ) THEN
    CREATE POLICY "Service role can manage XP events" ON "XPEvent"
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- ActivityType: Public can read activity types (reference data)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ActivityType'
    AND policyname = 'Public can read activity types'
  ) THEN
    CREATE POLICY "Public can read activity types" ON "ActivityType"
    FOR SELECT USING (true);
  END IF;
END $$;

-- ActivityType: Admin can manage activity types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ActivityType'
    AND policyname = 'Admin can manage activity types'
  ) THEN
    CREATE POLICY "Admin can manage activity types" ON "ActivityType"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Badge: Public can read badges (reference data)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Badge'
    AND policyname = 'Public can read badges'
  ) THEN
    CREATE POLICY "Public can read badges" ON "Badge"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Badge: Admin can manage badges
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Badge'
    AND policyname = 'Admin can manage badges'
  ) THEN
    CREATE POLICY "Admin can manage badges" ON "Badge"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- ============================================================
-- PART 9: RLS POLICIES FOR REFERENCE DATA TABLES
-- ============================================================

-- Coupon: Admin only
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Coupon'
    AND policyname = 'Admin can manage coupons'
  ) THEN
    CREATE POLICY "Admin can manage coupons" ON "Coupon"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Coupon: Service role for validation
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Coupon'
    AND policyname = 'Service role can read coupons'
  ) THEN
    CREATE POLICY "Service role can read coupons" ON "Coupon"
    FOR SELECT USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- Incubator: Public can read incubators (directory)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Incubator'
    AND policyname = 'Public can read incubators'
  ) THEN
    CREATE POLICY "Public can read incubators" ON "Incubator"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Incubator: Admin can manage incubators
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Incubator'
    AND policyname = 'Admin can manage incubators'
  ) THEN
    CREATE POLICY "Admin can manage incubators" ON "Incubator"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Scheme: Public can read schemes (directory)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Scheme'
    AND policyname = 'Public can read schemes'
  ) THEN
    CREATE POLICY "Public can read schemes" ON "Scheme"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Scheme: Admin can manage schemes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Scheme'
    AND policyname = 'Admin can manage schemes'
  ) THEN
    CREATE POLICY "Admin can manage schemes" ON "Scheme"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- Investor: Public can read investors (directory)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Investor'
    AND policyname = 'Public can read investors'
  ) THEN
    CREATE POLICY "Public can read investors" ON "Investor"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Investor: Admin can manage investors
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Investor'
    AND policyname = 'Admin can manage investors'
  ) THEN
    CREATE POLICY "Admin can manage investors" ON "Investor"
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM "User"
        WHERE "User"."id" = auth.uid()::text
        AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
      )
    );
  END IF;
END $$;

-- ============================================================
-- PART 10: RLS POLICIES FOR USER-GENERATED CONTENT
-- ============================================================

-- Review: Users can read all reviews (public)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Review'
    AND policyname = 'Public can read reviews'
  ) THEN
    CREATE POLICY "Public can read reviews" ON "Review"
    FOR SELECT USING (true);
  END IF;
END $$;

-- Review: Users can create their own reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Review'
    AND policyname = 'Users can create own reviews'
  ) THEN
    CREATE POLICY "Users can create own reviews" ON "Review"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

-- Review: Users can update their own reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Review'
    AND policyname = 'Users can update own reviews'
  ) THEN
    CREATE POLICY "Users can update own reviews" ON "Review"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- Review: Users can delete their own reviews
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Review'
    AND policyname = 'Users can delete own reviews'
  ) THEN
    CREATE POLICY "Users can delete own reviews" ON "Review"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- FounderLog: Users can read their own logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'FounderLog'
    AND policyname = 'Users can read own founder logs'
  ) THEN
    CREATE POLICY "Users can read own founder logs" ON "FounderLog"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- FounderLog: Users can create their own logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'FounderLog'
    AND policyname = 'Users can create own founder logs'
  ) THEN
    CREATE POLICY "Users can create own founder logs" ON "FounderLog"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

-- FounderLog: Users can update their own logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'FounderLog'
    AND policyname = 'Users can update own founder logs'
  ) THEN
    CREATE POLICY "Users can update own founder logs" ON "FounderLog"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- FounderLog: Users can delete their own logs
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'FounderLog'
    AND policyname = 'Users can delete own founder logs'
  ) THEN
    CREATE POLICY "Users can delete own founder logs" ON "FounderLog"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- Referral: Users can read their own referrals
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Referral'
    AND policyname = 'Users can read own referrals'
  ) THEN
    CREATE POLICY "Users can read own referrals" ON "Referral"
    FOR SELECT USING (auth.uid()::text = "referrerId" OR auth.uid()::text = "refereeId");
  END IF;
END $$;

-- Referral: Users can create referrals (as referrer)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Referral'
    AND policyname = 'Users can create referrals'
  ) THEN
    CREATE POLICY "Users can create referrals" ON "Referral"
    FOR INSERT WITH CHECK (auth.uid()::text = "referrerId");
  END IF;
END $$;

-- Referral: Service role can manage referrals
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'Referral'
    AND policyname = 'Service role can manage referrals'
  ) THEN
    CREATE POLICY "Service role can manage referrals" ON "Referral"
    FOR ALL USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- ============================================================
-- PART 11: VERIFICATION QUERY
-- ============================================================
-- Run this after migration to verify fixes:
/*
SELECT
    tablename,
    CASE WHEN rowsecurity THEN '✅ RLS Enabled' ELSE '❌ RLS Disabled' END as rls_status,
    (SELECT COUNT(*) FROM pg_policies WHERE pg_policies.tablename = pg_tables.tablename) as policy_count
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN (
    'User', 'Product', 'Module', 'Lesson', 'Resource',
    'XPEvent', 'ActivityType', 'Badge', 'Coupon',
    'Incubator', 'Scheme', 'Investor', 'Review', 'FounderLog', 'Referral'
)
ORDER BY tablename;

-- Check view security
SELECT
    viewname,
    CASE
        WHEN definition LIKE '%security_invoker%' THEN '✅ SECURITY INVOKER'
        ELSE '⚠️ SECURITY DEFINER (default)'
    END as security_mode
FROM pg_views
WHERE schemaname = 'public'
AND viewname = 'active_government_schemes';
*/
