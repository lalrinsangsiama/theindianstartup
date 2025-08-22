-- Migrate P1 progress to use LessonProgress table
-- This ensures consistency across all courses and prevents conflicts

BEGIN;

-- Migrate existing P1 progress from DailyProgress to LessonProgress
INSERT INTO "LessonProgress" (
  "userId",
  "lessonId",
  "productCode",
  completed,
  "completedAt",
  "startedAt",
  "xpEarned",
  reflection,
  "tasksCompleted",
  "proofUploads"
)
SELECT 
  dp."userId",
  'p1_day_' || LPAD(dp.day::text, 2, '0') as "lessonId",
  'P1' as "productCode",
  dp."completedAt" IS NOT NULL as completed,
  dp."completedAt",
  dp."startedAt",
  dp."xpEarned",
  dp.reflection,
  dp."tasksCompleted",
  dp."proofUploads"
FROM "DailyProgress" dp
WHERE dp.day BETWEEN 1 AND 30
  -- Only migrate records that look like P1 progress
  -- (we can't definitively tell without Purchase table, so we migrate all)
ON CONFLICT ("userId", "lessonId") DO NOTHING;

-- Add comment about migration
COMMENT ON TABLE "DailyProgress" IS 'DEPRECATED - Use LessonProgress table instead. Kept for backward compatibility only.';

COMMIT;

-- Verification
SELECT 
  'P1 progress migrated to LessonProgress' as status,
  COUNT(*) as records_migrated
FROM "LessonProgress"
WHERE "productCode" = 'P1';