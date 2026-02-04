-- Migration: Fix function search_path security warnings
-- These functions need SET search_path = '' to prevent search path injection attacks
-- All table references must be fully qualified with schema prefix

-- ============================================================================
-- 1. Fix check_product_access function
-- ============================================================================
CREATE OR REPLACE FUNCTION public.check_product_access(
    p_user_id TEXT,
    p_product_code TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
    v_has_access BOOLEAN := false;
BEGIN
    -- Check direct product purchase
    SELECT EXISTS (
        SELECT 1 FROM public."Purchase"
        WHERE "userId" = p_user_id
        AND "productCode" = p_product_code
        AND status = 'completed'
        AND "isActive" = true
        AND "expiresAt" > NOW()
    ) INTO v_has_access;

    -- If no direct access, check for any bundle that includes this product
    IF NOT v_has_access THEN
        SELECT EXISTS (
            SELECT 1 FROM public."Purchase" pur
            JOIN public."Product" prod ON pur."productCode" = prod.code
            WHERE pur."userId" = p_user_id
            AND prod."isBundle" = true
            AND p_product_code = ANY(prod."bundleProducts")
            AND pur.status = 'completed'
            AND pur."isActive" = true
            AND pur."expiresAt" > NOW()
        ) INTO v_has_access;
    END IF;

    RETURN v_has_access;
END;
$$;

-- ============================================================================
-- 2. Fix get_user_products function
-- ============================================================================
CREATE OR REPLACE FUNCTION public.get_user_products(p_user_id TEXT)
RETURNS TABLE(
    code TEXT,
    title TEXT,
    description TEXT,
    price INTEGER,
    "hasAccess" BOOLEAN,
    "expiresAt" TIMESTAMPTZ,
    "purchaseId" TEXT
)
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.code,
        p.title,
        p.description,
        p.price,
        CASE
            WHEN pur.id IS NOT NULL THEN true
            WHEN bundle.id IS NOT NULL THEN true
            ELSE false
        END as "hasAccess",
        COALESCE(pur."expiresAt", bundle."expiresAt") as "expiresAt",
        COALESCE(pur.id, bundle.id) as "purchaseId"
    FROM public."Product" p
    LEFT JOIN public."Purchase" pur ON pur."productCode" = p.code
        AND pur."userId" = p_user_id
        AND pur.status = 'completed'
        AND pur."isActive" = true
        AND pur."expiresAt" > NOW()
    LEFT JOIN public."Purchase" bundle ON bundle."productCode" = 'ALL_ACCESS'
        AND bundle."userId" = p_user_id
        AND bundle.status = 'completed'
        AND bundle."isActive" = true
        AND bundle."expiresAt" > NOW()
    WHERE p."isBundle" = false
    ORDER BY p.code;
END;
$$;

-- ============================================================================
-- 3. Fix update_updated_at_column function
-- ============================================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$;

-- ============================================================================
-- 4. Fix increment_user_xp function (ensure latest version with search_path)
-- ============================================================================
CREATE OR REPLACE FUNCTION public.increment_user_xp(user_id TEXT, xp_amount INT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public."User"
    SET "totalXP" = COALESCE("totalXP", 0) + xp_amount,
        "updatedAt" = NOW()
    WHERE id = user_id;
END;
$$;

-- ============================================================================
-- Grant permissions
-- ============================================================================

-- check_product_access - callable by authenticated users
GRANT EXECUTE ON FUNCTION public.check_product_access(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.check_product_access(TEXT, TEXT) TO service_role;

-- get_user_products - callable by authenticated users
GRANT EXECUTE ON FUNCTION public.get_user_products(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_products(TEXT) TO service_role;

-- update_updated_at_column - trigger function, no direct grants needed
-- (executes in the context of the trigger)

-- increment_user_xp - callable by authenticated users
GRANT EXECUTE ON FUNCTION public.increment_user_xp(TEXT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.increment_user_xp(TEXT, INT) TO service_role;

-- ============================================================================
-- Verification
-- ============================================================================
DO $$
DECLARE
    func_count INT;
BEGIN
    -- Count functions with proper search_path setting
    SELECT COUNT(*) INTO func_count
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
    AND p.proname IN ('check_product_access', 'get_user_products', 'update_updated_at_column', 'increment_user_xp')
    AND p.proconfig IS NOT NULL
    AND 'search_path=' = ANY(p.proconfig);

    IF func_count >= 4 THEN
        RAISE NOTICE 'SUCCESS: All 4 functions now have search_path set';
    ELSE
        RAISE NOTICE 'WARNING: Only % of 4 functions have search_path set', func_count;
    END IF;
END $$;
