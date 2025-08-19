-- =================================================================
-- Course Content Verification Script
-- =================================================================
-- Run this after loading all courses to verify content quality
-- =================================================================

-- 1. Overall Course Summary
SELECT 
  '📊 COURSE PORTFOLIO SUMMARY' as report_section,
  COUNT(DISTINCT CASE WHEN NOT "isBundle" THEN id END) as total_courses,
  COUNT(DISTINCT CASE WHEN "isBundle" THEN id END) as bundle_products,
  SUM(CASE WHEN NOT "isBundle" THEN price END) / 100 as total_individual_price,
  SUM(CASE WHEN "isBundle" THEN price END) / 100 as bundle_price,
  (SUM(CASE WHEN NOT "isBundle" THEN price END) - SUM(CASE WHEN "isBundle" THEN price END)) / 100 as bundle_savings
FROM "Product";

-- 2. Detailed Course Inventory
SELECT 
  '📚 COURSE DETAILS' as report_section,
  code,
  title,
  price / 100 as price_inr,
  "estimatedDays" as days,
  CASE WHEN "isBundle" THEN 'Bundle' ELSE 'Course' END as type
FROM "Product"
ORDER BY 
  CASE WHEN "isBundle" THEN 0 ELSE 1 END,
  code;

-- 3. Content Volume by Course
WITH content_stats AS (
  SELECT 
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as modules,
    COUNT(DISTINCT l.id) as lessons,
    SUM(l."estimatedTime") as total_minutes,
    SUM(l."xpReward") as total_xp,
    AVG(LENGTH(l."briefContent")) as avg_brief_length,
    AVG(jsonb_array_length(l."actionItems")) as avg_actions,
    AVG(jsonb_array_length(l."resources")) as avg_resources
  FROM "Product" p
  LEFT JOIN "Module" m ON m."productId" = p.id
  LEFT JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE NOT p."isBundle"
  GROUP BY p.code, p.title
)
SELECT 
  '📈 CONTENT VOLUME' as report_section,
  code,
  modules,
  lessons,
  ROUND(total_minutes / 60.0, 1) as total_hours,
  total_xp,
  ROUND(avg_brief_length) as avg_content_chars,
  ROUND(avg_actions) as avg_action_items,
  ROUND(avg_resources) as avg_resources_per_lesson
FROM content_stats
ORDER BY code;

-- 4. Content Quality Check
WITH quality_check AS (
  SELECT 
    p.code,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(DISTINCT CASE WHEN LENGTH(l."briefContent") < 300 THEN l.id END) as short_briefs,
    COUNT(DISTINCT CASE WHEN jsonb_array_length(l."actionItems") < 3 THEN l.id END) as few_actions,
    COUNT(DISTINCT CASE WHEN jsonb_array_length(l."resources") < 5 THEN l.id END) as few_resources,
    COUNT(DISTINCT CASE WHEN l."estimatedTime" < 30 THEN l.id END) as quick_lessons
  FROM "Product" p
  JOIN "Module" m ON m."productId" = p.id
  JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE NOT p."isBundle"
  GROUP BY p.code
)
SELECT 
  '⚠️ QUALITY METRICS' as report_section,
  code,
  total_lessons,
  CASE WHEN short_briefs = 0 THEN '✅' ELSE '❌' END || ' Brief Content (>300 chars)' as brief_quality,
  CASE WHEN few_actions = 0 THEN '✅' ELSE '❌' END || ' Action Items (>3 per lesson)' as action_quality,
  CASE WHEN few_resources = 0 THEN '✅' ELSE '❌' END || ' Resources (>5 per lesson)' as resource_quality,
  CASE WHEN quick_lessons = 0 THEN '✅' ELSE '❌' END || ' Lesson Time (>30 min)' as time_quality
FROM quality_check
ORDER BY code;

-- 5. Missing Content Check
SELECT 
  '🔍 MISSING CONTENT CHECK' as report_section,
  p.code,
  p.title,
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM "Module" WHERE "productId" = p.id) THEN '❌ No Modules'
    WHEN NOT EXISTS (SELECT 1 FROM "Lesson" l JOIN "Module" m ON l."moduleId" = m.id WHERE m."productId" = p.id) THEN '❌ No Lessons'
    ELSE '✅ Content Loaded'
  END as status
FROM "Product" p
WHERE NOT p."isBundle"
ORDER BY p.code;

-- 6. Sample Lesson Content (First lesson of each course)
WITH first_lessons AS (
  SELECT DISTINCT ON (p.code)
    p.code,
    m.title as module_title,
    l.title as lesson_title,
    LEFT(l."briefContent", 200) || '...' as brief_preview,
    jsonb_array_length(l."actionItems") as actions,
    jsonb_array_length(l."resources") as resources
  FROM "Product" p
  JOIN "Module" m ON m."productId" = p.id
  JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE NOT p."isBundle"
  ORDER BY p.code, m."orderIndex", l."order"
)
SELECT 
  '📝 SAMPLE CONTENT' as report_section,
  code,
  lesson_title,
  brief_preview,
  actions || ' actions, ' || resources || ' resources' as content_stats
FROM first_lessons
ORDER BY code;

-- 7. Resource Distribution
WITH resource_types AS (
  SELECT 
    p.code,
    l."resources"->0->>'type' as first_resource_type,
    COUNT(*) as count
  FROM "Product" p
  JOIN "Module" m ON m."productId" = p.id
  JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE NOT p."isBundle" AND jsonb_array_length(l."resources") > 0
  GROUP BY p.code, l."resources"->0->>'type'
)
SELECT 
  '📦 RESOURCE TYPES' as report_section,
  code,
  STRING_AGG(first_resource_type || ' (' || count || ')', ', ') as resource_distribution
FROM resource_types
GROUP BY code
ORDER BY code;

-- 8. Final Status Report
WITH course_status AS (
  SELECT 
    p.code,
    CASE 
      WHEN COUNT(m.id) = 0 THEN 'Empty'
      WHEN COUNT(l.id) < 10 THEN 'Partial'
      WHEN AVG(LENGTH(l."briefContent")) < 500 THEN 'Low Quality'
      ELSE 'Ready'
    END as status
  FROM "Product" p
  LEFT JOIN "Module" m ON m."productId" = p.id
  LEFT JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE NOT p."isBundle"
  GROUP BY p.code
)
SELECT 
  '✅ DEPLOYMENT STATUS' as report_section,
  COUNT(CASE WHEN status = 'Ready' THEN 1 END) || '/' || COUNT(*) as ready_courses,
  STRING_AGG(CASE WHEN status != 'Ready' THEN code || ' (' || status || ')' END, ', ') as issues
FROM course_status;

-- Expected Results:
-- ✅ All 12 courses should show as "Ready"
-- ✅ Total modules: 126+
-- ✅ Total lessons: 535+
-- ✅ All quality metrics should show ✅
-- ✅ Bundle savings should be ₹19,997+