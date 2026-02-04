-- Migration Fixes Script
-- Description: Handles edge cases and fixes for the modular products migration
-- Date: 2025-01-18

-- 1. Fix any purchases without expiresAt
UPDATE "Purchase"
SET "expiresAt" = COALESCE("accessEndDate", "createdAt" + INTERVAL '1 year')
WHERE "expiresAt" IS NULL
AND status = 'completed';

-- 2. Fix any purchases without productCode
UPDATE "Purchase"
SET "productCode" = 'P1'
WHERE "productCode" IS NULL
AND "productType" = '30_day_guide'
AND status = 'completed';

-- 3. Ensure all P1 purchases have correct product name
UPDATE "Purchase"
SET "productName" = '30-Day India Launch Sprint'
WHERE "productCode" = 'P1'
AND ("productName" IS NULL OR "productName" = '');

-- 4. Fix any active purchases that should have isActive = true
UPDATE "Purchase"
SET "isActive" = true
WHERE status = 'completed'
AND "expiresAt" > NOW()
AND "isActive" = false;

-- 5. Create missing user XP records for existing users
INSERT INTO "XPEvent" ("userId", type, points, description)
SELECT 
    u.id,
    'migration_bonus',
    100,
    'Welcome bonus for existing users'
FROM "User" u
WHERE NOT EXISTS (
    SELECT 1 FROM "XPEvent" x
    WHERE x."userId" = u.id
    AND x.type = 'migration_bonus'
)
AND EXISTS (
    SELECT 1 FROM "Purchase" p
    WHERE p."userId" = u.id
    AND p.status = 'completed'
);

-- 6. Update user totalXP to include all XP events
UPDATE "User" u
SET "totalXP" = (
    SELECT COALESCE(SUM(points), 0)
    FROM "XPEvent"
    WHERE "userId" = u.id
)
WHERE EXISTS (
    SELECT 1 FROM "XPEvent"
    WHERE "userId" = u.id
);

-- 7. Create initial progress records for users with P1 access
-- Note: Skipping currentDay-based progress initialization as column may not exist
INSERT INTO "LessonProgress" ("userId", "lessonId", "purchaseId", completed, "xpEarned")
SELECT DISTINCT
    p."userId",
    l.id,
    p.id,
    false,
    0
FROM "Purchase" p
CROSS JOIN "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" pr ON m."productId" = pr.id
WHERE p."productCode" IN ('P1', 'ALL_ACCESS')
AND p.status = 'completed'
AND p."isActive" = true
AND p."expiresAt" > NOW()
AND pr.code = 'P1'
AND NOT EXISTS (
    SELECT 1 FROM "LessonProgress" lp
    WHERE lp."userId" = p."userId"
    AND lp."lessonId" = l.id
);

-- 8. Update module progress based on lesson progress
INSERT INTO "ModuleProgress" ("userId", "moduleId", "purchaseId", "completedLessons", "totalLessons", "progressPercentage")
SELECT 
    lp."userId",
    m.id,
    lp."purchaseId",
    COUNT(CASE WHEN lp.completed THEN 1 END),
    COUNT(l.id),
    ROUND((COUNT(CASE WHEN lp.completed THEN 1 END)::NUMERIC / COUNT(l.id)) * 100)::INTEGER
FROM "LessonProgress" lp
JOIN "Lesson" l ON l.id = lp."lessonId"
JOIN "Module" m ON m.id = l."moduleId"
GROUP BY lp."userId", m.id, lp."purchaseId"
ON CONFLICT ("userId", "moduleId") DO UPDATE
SET 
    "completedLessons" = EXCLUDED."completedLessons",
    "totalLessons" = EXCLUDED."totalLessons",
    "progressPercentage" = EXCLUDED."progressPercentage",
    "updatedAt" = NOW();

-- 9. Set completedAt for fully completed modules
UPDATE "ModuleProgress"
SET "completedAt" = NOW()
WHERE "progressPercentage" = 100
AND "completedAt" IS NULL;

-- 10. Final validation report
DO $$
DECLARE
    v_total_users INTEGER;
    v_users_with_access INTEGER;
    v_expired_access INTEGER;
    v_p1_users INTEGER;
    v_bundle_users INTEGER;
BEGIN
    -- Count total users
    SELECT COUNT(*) INTO v_total_users FROM "User";
    
    -- Count users with active access
    SELECT COUNT(DISTINCT "userId") INTO v_users_with_access
    FROM "Purchase"
    WHERE status = 'completed'
    AND "isActive" = true
    AND "expiresAt" > NOW();
    
    -- Count expired access
    SELECT COUNT(DISTINCT "userId") INTO v_expired_access
    FROM "Purchase"
    WHERE status = 'completed'
    AND "expiresAt" <= NOW();
    
    -- Count P1 users
    SELECT COUNT(DISTINCT "userId") INTO v_p1_users
    FROM "Purchase"
    WHERE "productCode" = 'P1'
    AND status = 'completed'
    AND "isActive" = true
    AND "expiresAt" > NOW();
    
    -- Count bundle users
    SELECT COUNT(DISTINCT "userId") INTO v_bundle_users
    FROM "Purchase"
    WHERE "productCode" = 'ALL_ACCESS'
    AND status = 'completed'
    AND "isActive" = true
    AND "expiresAt" > NOW();
    
    RAISE NOTICE '=== Migration Fix Summary ===';
    RAISE NOTICE 'Total users: %', v_total_users;
    RAISE NOTICE 'Users with active access: %', v_users_with_access;
    RAISE NOTICE 'Users with expired access: %', v_expired_access;
    RAISE NOTICE 'P1 product users: %', v_p1_users;
    RAISE NOTICE 'All-Access bundle users: %', v_bundle_users;
    RAISE NOTICE '===========================';
END $$;

-- Show sample of migrated data
SELECT 
    'Sample Migrated Purchases' as info,
    "userId",
    "productCode",
    "productName",
    "expiresAt",
    "isActive"
FROM "Purchase"
WHERE status = 'completed'
ORDER BY "createdAt" DESC
LIMIT 5;