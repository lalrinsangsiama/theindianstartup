-- Migration Validation Script
-- Description: Validates the modular products migration was successful
-- Date: 2025-01-18

-- 1. Validate Products Table
DO $$
DECLARE
    v_product_count INTEGER;
    v_p1_exists BOOLEAN;
    v_bundle_exists BOOLEAN;
BEGIN
    -- Check product count
    SELECT COUNT(*) INTO v_product_count FROM "Product";
    IF v_product_count != 9 THEN
        RAISE NOTICE 'WARNING: Expected 9 products, found %', v_product_count;
    ELSE
        RAISE NOTICE 'OK: All 9 products created';
    END IF;
    
    -- Check P1 exists
    SELECT EXISTS(SELECT 1 FROM "Product" WHERE code = 'P1') INTO v_p1_exists;
    IF NOT v_p1_exists THEN
        RAISE NOTICE 'ERROR: P1 product not found!';
    ELSE
        RAISE NOTICE 'OK: P1 product exists';
    END IF;
    
    -- Check ALL_ACCESS bundle
    SELECT EXISTS(
        SELECT 1 FROM "Product" 
        WHERE code = 'ALL_ACCESS' 
        AND "isBundle" = true
        AND price = 19999
    ) INTO v_bundle_exists;
    IF NOT v_bundle_exists THEN
        RAISE NOTICE 'ERROR: ALL_ACCESS bundle not properly configured!';
    ELSE
        RAISE NOTICE 'OK: ALL_ACCESS bundle configured correctly';
    END IF;
END $$;

-- 2. Validate P1 Content Structure
DO $$
DECLARE
    v_module_count INTEGER;
    v_lesson_count INTEGER;
BEGIN
    -- Check P1 modules
    SELECT COUNT(*) INTO v_module_count
    FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P1';
    
    IF v_module_count != 4 THEN
        RAISE NOTICE 'ERROR: Expected 4 modules for P1, found %', v_module_count;
    ELSE
        RAISE NOTICE 'OK: P1 has 4 modules';
    END IF;
    
    -- Check P1 lessons
    SELECT COUNT(*) INTO v_lesson_count
    FROM "Lesson" l
    JOIN "Module" m ON l."moduleId" = m.id
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P1';
    
    IF v_lesson_count != 30 THEN
        RAISE NOTICE 'ERROR: Expected 30 lessons for P1, found %', v_lesson_count;
    ELSE
        RAISE NOTICE 'OK: P1 has 30 lessons';
    END IF;
END $$;

-- 3. Validate Purchase Table Updates
DO $$
DECLARE
    v_has_product_code BOOLEAN;
    v_has_expires_at BOOLEAN;
    v_migrated_count INTEGER;
BEGIN
    -- Check columns exist
    SELECT EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Purchase' 
        AND column_name = 'productCode'
    ) INTO v_has_product_code;
    
    SELECT EXISTS(
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Purchase' 
        AND column_name = 'expiresAt'
    ) INTO v_has_expires_at;
    
    IF NOT v_has_product_code OR NOT v_has_expires_at THEN
        RAISE NOTICE 'ERROR: Purchase table missing required columns!';
    ELSE
        RAISE NOTICE 'OK: Purchase table has new columns';
    END IF;
    
    -- Check migration of existing purchases
    SELECT COUNT(*) INTO v_migrated_count
    FROM "Purchase"
    WHERE "productType" = '30_day_guide'
    AND "productCode" = 'P1';
    
    RAISE NOTICE 'INFO: Migrated % existing purchases to P1', v_migrated_count;
END $$;

-- 4. Test Access Functions
DO $$
DECLARE
    v_function_exists BOOLEAN;
BEGIN
    -- Check check_product_access function
    SELECT EXISTS(
        SELECT 1 FROM pg_proc 
        WHERE proname = 'check_product_access'
    ) INTO v_function_exists;
    
    IF NOT v_function_exists THEN
        RAISE NOTICE 'ERROR: check_product_access function not found!';
    ELSE
        RAISE NOTICE 'OK: check_product_access function exists';
    END IF;
    
    -- Check get_user_products function
    SELECT EXISTS(
        SELECT 1 FROM pg_proc 
        WHERE proname = 'get_user_products'
    ) INTO v_function_exists;
    
    IF NOT v_function_exists THEN
        RAISE NOTICE 'ERROR: get_user_products function not found!';
    ELSE
        RAISE NOTICE 'OK: get_user_products function exists';
    END IF;
END $$;

-- 5. Validate RLS Policies
DO $$
DECLARE
    v_policy_count INTEGER;
BEGIN
    -- Count policies on new tables
    SELECT COUNT(*) INTO v_policy_count
    FROM pg_policies
    WHERE tablename IN ('Product', 'Module', 'Lesson', 'LessonProgress', 'ModuleProgress');
    
    IF v_policy_count < 9 THEN
        RAISE NOTICE 'WARNING: Expected at least 9 RLS policies, found %', v_policy_count;
    ELSE
        RAISE NOTICE 'OK: RLS policies created (% policies)', v_policy_count;
    END IF;
END $$;

-- 6. Summary Report
SELECT 
    'Migration Validation Summary' as report,
    NOW() as validated_at;

-- Product Summary
SELECT 
    'Products' as category,
    COUNT(*) as total_count,
    COUNT(CASE WHEN "isBundle" = false THEN 1 END) as individual_products,
    COUNT(CASE WHEN "isBundle" = true THEN 1 END) as bundles,
    SUM(CASE WHEN "isBundle" = false THEN price ELSE 0 END) as total_individual_price,
    MIN(CASE WHEN "isBundle" = true THEN price END) as bundle_price
FROM "Product";

-- Content Summary  
SELECT 
    'P1 Content' as category,
    COUNT(DISTINCT m.id) as modules,
    COUNT(DISTINCT l.id) as lessons,
    SUM(l."estimatedTime") as total_minutes,
    SUM(l."xpReward") as total_xp
FROM "Product" p
JOIN "Module" m ON m."productId" = p.id
JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p.code = 'P1';

-- Purchase Summary
SELECT 
    'Purchases' as category,
    COUNT(*) as total_purchases,
    COUNT(CASE WHEN "productCode" = 'P1' THEN 1 END) as p1_purchases,
    COUNT(CASE WHEN "productCode" = 'ALL_ACCESS' THEN 1 END) as bundle_purchases,
    COUNT(CASE WHEN "productCode" IS NULL THEN 1 END) as unmigrated_purchases
FROM "Purchase"
WHERE status = 'completed';

-- Active Access Summary
SELECT 
    'Active Access' as category,
    COUNT(DISTINCT "userId") as unique_users,
    COUNT(CASE WHEN "expiresAt" > NOW() THEN 1 END) as active_access,
    COUNT(CASE WHEN "expiresAt" <= NOW() THEN 1 END) as expired_access,
    COUNT(CASE WHEN "expiresAt" IS NULL THEN 1 END) as no_expiry_set
FROM "Purchase"
WHERE status = 'completed';