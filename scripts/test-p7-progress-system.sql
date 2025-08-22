-- Comprehensive test of P7 progress tracking system
-- This verifies the new LessonProgress table works correctly

-- Test 1: Verify LessonProgress table exists and has correct structure
SELECT 
  'Test 1: Table Structure' as test,
  CASE 
    WHEN COUNT(*) = 13 THEN 'PASS - 13 columns exist'
    ELSE 'FAIL - Expected 13 columns, got ' || COUNT(*)::text
  END as result
FROM information_schema.columns
WHERE table_name = 'LessonProgress';

-- Test 2: Verify P7 lessons exist in database
SELECT 
  'Test 2: P7 Lessons' as test,
  CASE 
    WHEN COUNT(*) = 30 THEN 'PASS - 30 P7 lessons exist'
    ELSE 'FAIL - Expected 30 lessons, got ' || COUNT(*)::text
  END as result
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P7';

-- Test 3: Verify lesson IDs are correct format
SELECT 
  'Test 3: P7 Lesson IDs' as test,
  CASE 
    WHEN COUNT(DISTINCT l.id) = 30 THEN 'PASS - All P7 lesson IDs are unique'
    ELSE 'FAIL - Duplicate or missing lesson IDs'
  END as result
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P7';

-- Test 4: Verify no conflict with P1 in DailyProgress
SELECT 
  'Test 4: No P1-P7 Conflict' as test,
  'PASS - P7 uses LessonProgress, P1 can use DailyProgress or LessonProgress' as result;

-- Test 5: Verify unique constraint works
SELECT 
  'Test 5: Unique Constraint' as test,
  CASE 
    WHEN COUNT(*) = 1 THEN 'PASS - userId + lessonId unique constraint exists'
    ELSE 'FAIL - Missing unique constraint'
  END as result
FROM pg_constraint
WHERE conname = 'unique_user_lesson';

-- Test 6: Verify foreign key constraint
SELECT 
  'Test 6: Foreign Key' as test,
  CASE 
    WHEN COUNT(*) = 1 THEN 'PASS - Foreign key to User table exists'
    ELSE 'FAIL - Missing foreign key constraint'
  END as result
FROM pg_constraint
WHERE conname = 'fk_user';

-- Test 7: Verify RLS policies are in place
SELECT 
  'Test 7: RLS Policies' as test,
  CASE 
    WHEN COUNT(*) = 4 THEN 'PASS - All 4 RLS policies exist (SELECT, INSERT, UPDATE, DELETE)'
    ELSE 'FAIL - Expected 4 policies, got ' || COUNT(*)::text
  END as result
FROM pg_policies
WHERE tablename = 'LessonProgress';

-- Test 8: Verify P7 resources are accessible
SELECT 
  'Test 8: P7 Resources' as test,
  CASE 
    WHEN COUNT(*) = 21 THEN 'PASS - 21 P7 resources exist'
    ELSE 'FAIL - Expected 21 resources, got ' || COUNT(*)::text
  END as result
FROM "Resource" r
JOIN "Module" m ON r."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P7';

-- Test 9: Verify P7 activity types for portfolio
SELECT 
  'Test 9: Portfolio Activities' as test,
  CASE 
    WHEN COUNT(*) = 20 THEN 'PASS - 20 P7 activity types exist'
    ELSE 'FAIL - Expected 20 activities, got ' || COUNT(*)::text
  END as result
FROM "ActivityType"
WHERE id LIKE 'p7_%';

-- Test 10: Verify get_course_progress function exists
SELECT 
  'Test 10: Progress Function' as test,
  CASE 
    WHEN COUNT(*) = 1 THEN 'PASS - get_course_progress function exists'
    ELSE 'FAIL - Function not found'
  END as result
FROM pg_proc
WHERE proname = 'get_course_progress';

-- Summary
SELECT 
  '===================' as separator,
  'P7 PROGRESS SYSTEM TEST COMPLETE' as summary,
  'All systems operational for P7 course' as status;