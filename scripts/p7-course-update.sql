-- P7: State-wise Scheme Map - Update to 30-day course structure
-- Update existing course to match promised 30-day, 10-module structure

BEGIN;

-- Update Product details
UPDATE "Product" SET
  title = 'State-wise Scheme Map - Complete Navigation',
  description = 'Master India''s state ecosystem with comprehensive coverage of all states and UTs. Navigate 500+ state schemes, optimize multi-state presence, and achieve 30-50% cost savings through strategic state benefits. 30 days, 10 modules, complete state mastery.',
  "updatedAt" = NOW()
WHERE code = 'P7';

-- Get P7 product ID
WITH p7_product AS (
  SELECT id FROM "Product" WHERE code = 'P7'
),

-- Update existing modules to match 10-module structure
module_updates AS (
  UPDATE "Module" SET
    title = CASE "orderIndex"
      WHEN 1 THEN 'Federal Structure & Central Government Benefits'
      WHEN 2 THEN 'Northern States Powerhouse (UP, Punjab, Haryana, Delhi, Rajasthan)'
      WHEN 3 THEN 'Western States Excellence (Maharashtra, Gujarat, Goa, MP)'
      WHEN 4 THEN 'Southern States Innovation Hub (Karnataka, Tamil Nadu, Telangana, AP, Kerala)'
      WHEN 5 THEN 'Eastern States Potential (West Bengal, Odisha, Jharkhand, Bihar)'
      WHEN 6 THEN 'North-Eastern States Advantages (8 Sister States + Sikkim)'
      WHEN 7 THEN 'Implementation Framework & Multi-State Strategy'
      WHEN 8 THEN 'Sector-Specific State Benefits Mapping'
      WHEN 9 THEN 'Financial Planning & ROI Optimization'
      WHEN 10 THEN 'Advanced Strategies & Policy Monitoring'
    END,
    description = CASE "orderIndex"
      WHEN 1 THEN 'Master India''s federal governance structure, central government schemes, and national-level benefits for startups and businesses.'
      WHEN 2 THEN 'Deep dive into Northern India''s industrial landscape, policy benefits, and massive market opportunities.'
      WHEN 3 THEN 'Navigate India''s industrial heartland with comprehensive scheme mapping and optimization strategies.'
      WHEN 4 THEN 'Master the South Indian innovation ecosystem with tech-focused benefits and startup-friendly policies.'
      WHEN 5 THEN 'Unlock Eastern India''s emerging opportunities and government incentive programs.'
      WHEN 6 THEN 'Explore India''s most incentivized region with maximum subsidies, tax benefits, and development schemes.'
      WHEN 7 THEN 'Build systematic approach to leverage multiple state benefits and create optimized business presence.'
      WHEN 8 THEN 'Navigate industry-specific incentives across manufacturing, technology, agriculture, and services sectors.'
      WHEN 9 THEN 'Master the art of maximizing state benefits to achieve 30-50% cost savings and optimal ROI.'
      WHEN 10 THEN 'Stay ahead with policy tracking, relationship building, and future-proofing strategies.'
    END,
    "updatedAt" = NOW()
  WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
    AND "orderIndex" <= 10
  RETURNING id, "orderIndex"
),

-- Delete extra modules beyond 10
extra_modules_cleanup AS (
  DELETE FROM "Lesson" 
  WHERE "moduleId" IN (
    SELECT id FROM "Module" 
    WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
    AND "orderIndex" > 10
  )
),

extra_modules_delete AS (
  DELETE FROM "Module" 
  WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
  AND "orderIndex" > 10
),

-- Update lessons to 30-day structure (3 lessons per module)
lesson_updates AS (
  UPDATE "Lesson" SET
    day = CASE 
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 1) THEN 
        CASE "orderIndex" WHEN 1 THEN 1 WHEN 2 THEN 2 WHEN 3 THEN 3 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 2) THEN 
        CASE "orderIndex" WHEN 1 THEN 4 WHEN 2 THEN 5 WHEN 3 THEN 6 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 3) THEN 
        CASE "orderIndex" WHEN 1 THEN 7 WHEN 2 THEN 8 WHEN 3 THEN 9 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 4) THEN 
        CASE "orderIndex" WHEN 1 THEN 10 WHEN 2 THEN 11 WHEN 3 THEN 12 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 5) THEN 
        CASE "orderIndex" WHEN 1 THEN 13 WHEN 2 THEN 14 WHEN 3 THEN 15 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 6) THEN 
        CASE "orderIndex" WHEN 1 THEN 16 WHEN 2 THEN 17 WHEN 3 THEN 18 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 7) THEN 
        CASE "orderIndex" WHEN 1 THEN 19 WHEN 2 THEN 20 WHEN 3 THEN 21 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 8) THEN 
        CASE "orderIndex" WHEN 1 THEN 22 WHEN 2 THEN 23 WHEN 3 THEN 24 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 9) THEN 
        CASE "orderIndex" WHEN 1 THEN 25 WHEN 2 THEN 26 WHEN 3 THEN 27 END
      WHEN "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 10) THEN 
        CASE "orderIndex" WHEN 1 THEN 28 WHEN 2 THEN 29 WHEN 3 THEN 30 END
    END,
    "estimatedTime" = CASE 
      WHEN day IN (28, 29, 30) THEN 120  -- Final module gets more time
      ELSE 90  -- Standard lesson time
    END,
    "xpReward" = CASE 
      WHEN day IN (28, 29, 30) THEN 200  -- Final module gets more XP
      ELSE 150  -- Standard XP reward
    END,
    "updatedAt" = NOW()
  WHERE "moduleId" IN (
    SELECT id FROM "Module" 
    WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
    AND "orderIndex" <= 10
  )
  AND "orderIndex" <= 3  -- Keep only first 3 lessons per module
),

-- Delete extra lessons beyond 3 per module
extra_lessons_cleanup AS (
  DELETE FROM "Lesson" 
  WHERE "moduleId" IN (
    SELECT id FROM "Module" 
    WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')
    AND "orderIndex" <= 10
  )
  AND "orderIndex" > 3
)

-- Summary of updates
SELECT 
  'P7 Course Updated to 30-Day Structure!' as status,
  (SELECT COUNT(*) FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7')) as modules_count,
  (SELECT COUNT(*) FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7'))) as lessons_count,
  (SELECT MIN(day) FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7'))) as first_day,
  (SELECT MAX(day) FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7'))) as last_day,
  (SELECT SUM("estimatedTime") FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7'))) as total_minutes,
  (SELECT SUM("xpReward") FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P7'))) as total_xp;

COMMIT;