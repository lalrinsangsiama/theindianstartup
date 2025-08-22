-- Create LessonProgress table for proper course-specific progress tracking
-- This fixes the conflict between P1 and P7 (and other courses) that share day numbers

BEGIN;

-- Create LessonProgress table if it doesn't exist
CREATE TABLE IF NOT EXISTS "LessonProgress" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "productCode" TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  "completedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "xpEarned" INTEGER NOT NULL DEFAULT 0,
  reflection TEXT,
  "tasksCompleted" JSONB,
  "proofUploads" TEXT[],
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure each user can only have one progress record per lesson
  CONSTRAINT unique_user_lesson UNIQUE("userId", "lessonId"),
  
  -- Foreign key to User table
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON "LessonProgress"("userId");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON "LessonProgress"("lessonId");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_product ON "LessonProgress"("productCode");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_completed ON "LessonProgress"(completed);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user_product ON "LessonProgress"("userId", "productCode");

-- Create function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_lesson_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updatedAt
DROP TRIGGER IF EXISTS update_lesson_progress_updated_at_trigger ON "LessonProgress";
CREATE TRIGGER update_lesson_progress_updated_at_trigger
  BEFORE UPDATE ON "LessonProgress"
  FOR EACH ROW
  EXECUTE FUNCTION update_lesson_progress_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE "LessonProgress" ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only read their own progress
CREATE POLICY "Users read own lesson progress" ON "LessonProgress"
  FOR SELECT
  USING ((auth.uid())::text = "userId");

-- Users can only create their own progress records
CREATE POLICY "Users create own lesson progress" ON "LessonProgress"
  FOR INSERT
  WITH CHECK ((auth.uid())::text = "userId");

-- Users can only update their own progress
CREATE POLICY "Users update own lesson progress" ON "LessonProgress"
  FOR UPDATE
  USING ((auth.uid())::text = "userId");

-- Users can delete their own progress (for reset functionality)
CREATE POLICY "Users delete own lesson progress" ON "LessonProgress"
  FOR DELETE
  USING ((auth.uid())::text = "userId");

-- Skip migration for now since we don't have existing P7 users yet
-- This table will be used for all future P7 progress tracking

-- Create function to get user's course progress
CREATE OR REPLACE FUNCTION get_course_progress(
  p_user_id TEXT,
  p_product_code TEXT
)
RETURNS TABLE (
  total_lessons INTEGER,
  completed_lessons INTEGER,
  total_xp INTEGER,
  progress_percentage INTEGER,
  current_lesson_id TEXT
) AS $$
DECLARE
  v_total_lessons INTEGER;
  v_completed_lessons INTEGER;
  v_total_xp INTEGER;
  v_progress_percentage INTEGER;
  v_current_lesson_id TEXT;
BEGIN
  -- Get total lessons for the product
  SELECT COUNT(DISTINCT l.id)
  INTO v_total_lessons
  FROM "Lesson" l
  JOIN "Module" m ON l."moduleId" = m.id
  JOIN "Product" p ON m."productId" = p.id
  WHERE p.code = p_product_code;

  -- Get completed lessons and total XP
  SELECT 
    COUNT(*) FILTER (WHERE completed = true),
    COALESCE(SUM("xpEarned"), 0)
  INTO v_completed_lessons, v_total_xp
  FROM "LessonProgress"
  WHERE "userId" = p_user_id
  AND "productCode" = p_product_code;

  -- Calculate progress percentage
  v_progress_percentage := CASE 
    WHEN v_total_lessons > 0 THEN 
      ROUND((v_completed_lessons::NUMERIC / v_total_lessons) * 100)::INTEGER
    ELSE 0
  END;

  -- Find current lesson (next incomplete)
  SELECT l.id
  INTO v_current_lesson_id
  FROM "Lesson" l
  JOIN "Module" m ON l."moduleId" = m.id
  JOIN "Product" p ON m."productId" = p.id
  LEFT JOIN "LessonProgress" lp ON lp."lessonId" = l.id 
    AND lp."userId" = p_user_id
  WHERE p.code = p_product_code
  AND (lp.completed IS NULL OR lp.completed = false)
  ORDER BY m."orderIndex", l."orderIndex"
  LIMIT 1;

  RETURN QUERY SELECT 
    v_total_lessons,
    v_completed_lessons,
    v_total_xp,
    v_progress_percentage,
    v_current_lesson_id;
END;
$$ LANGUAGE plpgsql;

-- Add comment to table
COMMENT ON TABLE "LessonProgress" IS 'Tracks user progress for individual lessons across all products, replacing the day-based DailyProgress system';

COMMIT;

-- Verification
SELECT 
  'LessonProgress table created successfully' as status,
  COUNT(*) as migrated_records
FROM "LessonProgress"
WHERE "productCode" = 'P7';