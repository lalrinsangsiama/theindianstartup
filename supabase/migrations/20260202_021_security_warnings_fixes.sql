-- ============================================================
-- SECURITY WARNINGS FIXES
-- Run: 2026-02-02
--
-- Fixes the following linter warnings:
-- 1. function_search_path_mutable: 4 functions without search_path
-- 2. rls_policy_always_true: 2 overly permissive INSERT policies
--
-- NOTE: auth_leaked_password_protection must be enabled in
-- Supabase Dashboard > Authentication > Settings > Security
-- ============================================================

-- ============================================================
-- PART 1: FIX FUNCTION SEARCH PATHS
-- Recreate functions with SET search_path = ''
-- ============================================================

-- 1. cleanup_expired_idempotency_keys
CREATE OR REPLACE FUNCTION public.cleanup_expired_idempotency_keys()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    DELETE FROM public."IdempotencyKey"
    WHERE "expiresAt" < NOW();
END;
$$;

-- 2. increment_user_xp
CREATE OR REPLACE FUNCTION public.increment_user_xp(user_id TEXT, xp_amount INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public."User"
    SET "totalXP" = COALESCE("totalXP", 0) + xp_amount
    WHERE id = user_id;
END;
$$;

-- 3. search_schemes_by_criteria
CREATE OR REPLACE FUNCTION public.search_schemes_by_criteria(
    p_category TEXT DEFAULT NULL,
    p_state TEXT DEFAULT NULL,
    p_min_amount BIGINT DEFAULT 0,
    p_max_amount BIGINT DEFAULT NULL,
    p_sector TEXT DEFAULT NULL
)
RETURNS TABLE (
    scheme_code VARCHAR(50),
    scheme_name VARCHAR(255),
    funding_range TEXT,
    eligibility TEXT,
    contact_info TEXT
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT
        gs.scheme_code,
        gs.scheme_name,
        CASE
            WHEN gs.max_funding_amount IS NOT NULL
            THEN '₹' || (gs.min_funding_amount/100000)::TEXT || 'L - ₹' || (gs.max_funding_amount/100000)::TEXT || 'L'
            ELSE '₹' || (gs.min_funding_amount/100000)::TEXT || 'L+'
        END as funding_range,
        LEFT(gs.eligibility_criteria, 200) || '...' as eligibility,
        'Email: ' || gs.contact_email || ' | Website: ' || gs.website_url as contact_info
    FROM public.government_schemes gs
    WHERE gs.is_active = true
    AND (p_category IS NULL OR gs.category = p_category)
    AND (p_state IS NULL OR 'ALL' = ANY(gs.applicable_states) OR p_state = ANY(gs.applicable_states))
    AND (gs.min_funding_amount >= p_min_amount)
    AND (p_max_amount IS NULL OR gs.max_funding_amount <= p_max_amount OR gs.max_funding_amount IS NULL)
    AND (p_sector IS NULL OR p_sector = ANY(gs.sector_focus))
    ORDER BY gs.max_funding_amount DESC NULLS LAST;
END;
$$;

-- 4. get_scheme_recommendations
CREATE OR REPLACE FUNCTION public.get_scheme_recommendations(
    p_startup_stage TEXT,
    p_sector TEXT,
    p_state TEXT,
    p_funding_need BIGINT
)
RETURNS TABLE (
    scheme_code VARCHAR(50),
    scheme_name VARCHAR(255),
    match_score INT,
    recommendation_reason TEXT
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT
        gs.scheme_code,
        gs.scheme_name,
        (
            -- Stage match score
            CASE
                WHEN p_startup_stage = 'idea' AND gs.category = 'startup' AND gs.subcategory = 'seed_funding' THEN 30
                WHEN p_startup_stage = 'early' AND gs.category IN ('startup', 'msme') THEN 25
                WHEN p_startup_stage = 'growth' AND gs.funding_type IN ('equity_debt', 'loan') THEN 20
                ELSE 10
            END +
            -- Sector match score
            CASE
                WHEN p_sector = ANY(gs.sector_focus) THEN 25
                WHEN 'technology' = ANY(gs.sector_focus) AND p_sector IN ('software', 'hardware') THEN 20
                ELSE 5
            END +
            -- Geographic match score
            CASE
                WHEN 'ALL' = ANY(gs.applicable_states) THEN 20
                WHEN p_state = ANY(gs.applicable_states) THEN 30
                ELSE 0
            END +
            -- Funding match score
            CASE
                WHEN gs.min_funding_amount <= p_funding_need AND
                     (gs.max_funding_amount IS NULL OR gs.max_funding_amount >= p_funding_need) THEN 25
                ELSE 10
            END
        ) as match_score,
        CASE
            WHEN gs.success_rate > 80 THEN 'High success rate (' || gs.success_rate || '%) with ' || gs.average_approval_time || ' processing time'
            WHEN gs.funding_type = 'grant' THEN 'Non-dilutive grant funding - no equity required'
            WHEN gs.subsidy_percentage > 0 THEN gs.subsidy_percentage || '% subsidy on eligible expenses'
            ELSE 'Good funding option for your stage and sector'
        END as recommendation_reason
    FROM public.government_schemes gs
    WHERE gs.is_active = true
    AND (
        'ALL' = ANY(gs.applicable_states) OR
        p_state = ANY(gs.applicable_states)
    )
    HAVING (
        -- Stage match score calculation (repeated for HAVING clause)
        CASE
            WHEN p_startup_stage = 'idea' AND gs.category = 'startup' AND gs.subcategory = 'seed_funding' THEN 30
            WHEN p_startup_stage = 'early' AND gs.category IN ('startup', 'msme') THEN 25
            WHEN p_startup_stage = 'growth' AND gs.funding_type IN ('equity_debt', 'loan') THEN 20
            ELSE 10
        END +
        CASE
            WHEN p_sector = ANY(gs.sector_focus) THEN 25
            WHEN 'technology' = ANY(gs.sector_focus) AND p_sector IN ('software', 'hardware') THEN 20
            ELSE 5
        END +
        CASE
            WHEN 'ALL' = ANY(gs.applicable_states) THEN 20
            WHEN p_state = ANY(gs.applicable_states) THEN 30
            ELSE 0
        END +
        CASE
            WHEN gs.min_funding_amount <= p_funding_need AND
                 (gs.max_funding_amount IS NULL OR gs.max_funding_amount >= p_funding_need) THEN 25
            ELSE 10
        END
    ) >= 40
    ORDER BY match_score DESC, gs.success_rate DESC NULLS LAST
    LIMIT 10;
END;
$$;

-- ============================================================
-- PART 2: FIX OVERLY PERMISSIVE RLS POLICIES
-- ============================================================

-- Fix AuditLog policy: Only service role can insert
DROP POLICY IF EXISTS "Service role can insert audit logs" ON "AuditLog";
DROP POLICY IF EXISTS "service_insert_audit_logs" ON "AuditLog";
CREATE POLICY "Service role can insert audit logs" ON "AuditLog"
FOR INSERT WITH CHECK (
    (current_setting('request.jwt.claims', true)::json->>'role') = 'service_role'
);

-- Fix BlogPostView policy: Require valid post reference
DROP POLICY IF EXISTS "Anyone can record blog views" ON "BlogPostView";
CREATE POLICY "Authenticated users can record blog views" ON "BlogPostView"
FOR INSERT WITH CHECK (
    -- Must reference an existing published post
    EXISTS (
        SELECT 1 FROM public."BlogPost"
        WHERE "BlogPost"."id" = "postId"
        AND "BlogPost"."status" = 'published'
    )
);

-- ============================================================
-- VERIFICATION QUERY
-- ============================================================
-- Run this after migration to verify fixes:
/*
-- Check function search_path settings
SELECT
    p.proname as function_name,
    CASE
        WHEN p.proconfig IS NULL THEN '❌ No search_path set'
        WHEN 'search_path=' = ANY(p.proconfig) THEN '✅ Empty search_path'
        WHEN array_to_string(p.proconfig, ',') LIKE '%search_path%' THEN '✅ search_path set'
        ELSE '⚠️ Check config'
    END as search_path_status,
    p.proconfig
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public'
AND p.proname IN (
    'cleanup_expired_idempotency_keys',
    'get_scheme_recommendations',
    'search_schemes_by_criteria',
    'increment_user_xp'
);

-- Check RLS policies
SELECT
    policyname,
    tablename,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename IN ('AuditLog', 'BlogPostView')
AND policyname IN ('Service role can insert audit logs', 'Authenticated users can record blog views');
*/
