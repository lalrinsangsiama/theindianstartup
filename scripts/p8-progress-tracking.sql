-- P8 Lesson Progress Tracking System
-- Enables tracking of user progress through P8 lessons

-- Create ProductLessonProgress table for tracking progress per product
CREATE TABLE IF NOT EXISTS "ProductLessonProgress" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "lessonId" TEXT NOT NULL,
  "productCode" TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  "completedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "timeSpent" INTEGER DEFAULT 0, -- in seconds
  "tasksCompleted" JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  "xpEarned" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "ProductLessonProgress_userId_lessonId_key" UNIQUE ("userId", "lessonId"),
  CONSTRAINT "ProductLessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  CONSTRAINT "ProductLessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_product_lesson_progress_user" ON "ProductLessonProgress"("userId");
CREATE INDEX IF NOT EXISTS "idx_product_lesson_progress_lesson" ON "ProductLessonProgress"("lessonId");
CREATE INDEX IF NOT EXISTS "idx_product_lesson_progress_product" ON "ProductLessonProgress"("productCode");
CREATE INDEX IF NOT EXISTS "idx_product_lesson_progress_completed" ON "ProductLessonProgress"(completed);

-- Create ProductModuleProgress table for module-level tracking
CREATE TABLE IF NOT EXISTS "ProductModuleProgress" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "moduleId" TEXT NOT NULL,
  "productCode" TEXT NOT NULL,
  "completedLessons" INTEGER DEFAULT 0,
  "totalLessons" INTEGER DEFAULT 0,
  "progressPercentage" INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  "completedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "totalTimeSpent" INTEGER DEFAULT 0, -- in seconds
  "xpEarned" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "ProductModuleProgress_userId_moduleId_key" UNIQUE ("userId", "moduleId"),
  CONSTRAINT "ProductModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
  CONSTRAINT "ProductModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "idx_product_module_progress_user" ON "ProductModuleProgress"("userId");
CREATE INDEX IF NOT EXISTS "idx_product_module_progress_module" ON "ProductModuleProgress"("moduleId");
CREATE INDEX IF NOT EXISTS "idx_product_module_progress_product" ON "ProductModuleProgress"("productCode");

-- Create ProductProgress table for overall product tracking
CREATE TABLE IF NOT EXISTS "ProductProgress" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL,
  "productCode" TEXT NOT NULL,
  "completedLessons" INTEGER DEFAULT 0,
  "totalLessons" INTEGER DEFAULT 0,
  "completedModules" INTEGER DEFAULT 0,
  "totalModules" INTEGER DEFAULT 0,
  "progressPercentage" INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  "completedAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "lastAccessedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "totalTimeSpent" INTEGER DEFAULT 0, -- in seconds
  "totalXpEarned" INTEGER DEFAULT 0,
  "certificateIssued" BOOLEAN DEFAULT FALSE,
  "certificateIssuedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "ProductProgress_userId_productCode_key" UNIQUE ("userId", "productCode"),
  CONSTRAINT "ProductProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "idx_product_progress_user" ON "ProductProgress"("userId");
CREATE INDEX IF NOT EXISTS "idx_product_progress_product" ON "ProductProgress"("productCode");
CREATE INDEX IF NOT EXISTS "idx_product_progress_completed" ON "ProductProgress"(completed);

-- Function to update module progress when lesson is completed
CREATE OR REPLACE FUNCTION update_module_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_module_id TEXT;
  v_product_code TEXT;
  v_completed_count INTEGER;
  v_total_count INTEGER;
BEGIN
  -- Get module ID and product code
  SELECT l."moduleId", m."productId" INTO v_module_id, v_product_code
  FROM "Lesson" l
  JOIN "Module" m ON l."moduleId" = m.id
  WHERE l.id = NEW."lessonId";
  
  -- Count completed and total lessons in module
  SELECT 
    COUNT(CASE WHEN plp.completed THEN 1 END),
    COUNT(*)
  INTO v_completed_count, v_total_count
  FROM "Lesson" l
  LEFT JOIN "ProductLessonProgress" plp ON l.id = plp."lessonId" AND plp."userId" = NEW."userId"
  WHERE l."moduleId" = v_module_id;
  
  -- Update or insert module progress
  INSERT INTO "ProductModuleProgress" (
    "userId", "moduleId", "productCode", 
    "completedLessons", "totalLessons", "progressPercentage",
    completed, "completedAt"
  ) VALUES (
    NEW."userId", v_module_id, NEW."productCode",
    v_completed_count, v_total_count, 
    CASE WHEN v_total_count > 0 THEN (v_completed_count * 100 / v_total_count) ELSE 0 END,
    v_completed_count = v_total_count,
    CASE WHEN v_completed_count = v_total_count THEN NOW() ELSE NULL END
  )
  ON CONFLICT ("userId", "moduleId") 
  DO UPDATE SET
    "completedLessons" = v_completed_count,
    "totalLessons" = v_total_count,
    "progressPercentage" = CASE WHEN v_total_count > 0 THEN (v_completed_count * 100 / v_total_count) ELSE 0 END,
    completed = v_completed_count = v_total_count,
    "completedAt" = CASE WHEN v_completed_count = v_total_count THEN NOW() ELSE NULL END,
    "updatedAt" = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for module progress update
DROP TRIGGER IF EXISTS trigger_update_module_progress ON "ProductLessonProgress";
CREATE TRIGGER trigger_update_module_progress
AFTER INSERT OR UPDATE ON "ProductLessonProgress"
FOR EACH ROW
EXECUTE FUNCTION update_module_progress();

-- Function to update product progress when module is updated
CREATE OR REPLACE FUNCTION update_product_progress()
RETURNS TRIGGER AS $$
DECLARE
  v_product_id TEXT;
  v_completed_modules INTEGER;
  v_total_modules INTEGER;
  v_completed_lessons INTEGER;
  v_total_lessons INTEGER;
BEGIN
  -- Get product ID
  SELECT "productId" INTO v_product_id
  FROM "Module"
  WHERE id = NEW."moduleId";
  
  -- Count completed modules and lessons
  SELECT 
    COUNT(CASE WHEN pmp.completed THEN 1 END),
    COUNT(DISTINCT m.id),
    SUM(CASE WHEN pmp."completedLessons" IS NOT NULL THEN pmp."completedLessons" ELSE 0 END),
    COUNT(DISTINCT l.id)
  INTO v_completed_modules, v_total_modules, v_completed_lessons, v_total_lessons
  FROM "Module" m
  LEFT JOIN "ProductModuleProgress" pmp ON m.id = pmp."moduleId" AND pmp."userId" = NEW."userId"
  LEFT JOIN "Lesson" l ON l."moduleId" = m.id
  WHERE m."productId" = v_product_id;
  
  -- Update or insert product progress
  INSERT INTO "ProductProgress" (
    "userId", "productCode",
    "completedModules", "totalModules",
    "completedLessons", "totalLessons",
    "progressPercentage", completed, "completedAt"
  ) VALUES (
    NEW."userId", NEW."productCode",
    v_completed_modules, v_total_modules,
    v_completed_lessons, v_total_lessons,
    CASE WHEN v_total_lessons > 0 THEN (v_completed_lessons * 100 / v_total_lessons) ELSE 0 END,
    v_completed_modules = v_total_modules AND v_total_modules > 0,
    CASE WHEN v_completed_modules = v_total_modules AND v_total_modules > 0 THEN NOW() ELSE NULL END
  )
  ON CONFLICT ("userId", "productCode")
  DO UPDATE SET
    "completedModules" = v_completed_modules,
    "totalModules" = v_total_modules,
    "completedLessons" = v_completed_lessons,
    "totalLessons" = v_total_lessons,
    "progressPercentage" = CASE WHEN v_total_lessons > 0 THEN (v_completed_lessons * 100 / v_total_lessons) ELSE 0 END,
    completed = v_completed_modules = v_total_modules AND v_total_modules > 0,
    "completedAt" = CASE WHEN v_completed_modules = v_total_modules AND v_total_modules > 0 THEN NOW() ELSE NULL END,
    "lastAccessedAt" = NOW(),
    "updatedAt" = NOW();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for product progress update
DROP TRIGGER IF EXISTS trigger_update_product_progress ON "ProductModuleProgress";
CREATE TRIGGER trigger_update_product_progress
AFTER INSERT OR UPDATE ON "ProductModuleProgress"
FOR EACH ROW
EXECUTE FUNCTION update_product_progress();

-- Verify tables created
SELECT 'ProductLessonProgress' as table_name, COUNT(*) as row_count FROM "ProductLessonProgress"
UNION ALL
SELECT 'ProductModuleProgress', COUNT(*) FROM "ProductModuleProgress"
UNION ALL
SELECT 'ProductProgress', COUNT(*) FROM "ProductProgress";

-- Grant permissions
GRANT ALL ON "ProductLessonProgress" TO authenticated;
GRANT ALL ON "ProductModuleProgress" TO authenticated;
GRANT ALL ON "ProductProgress" TO authenticated;

GRANT ALL ON "ProductLessonProgress" TO anon;
GRANT ALL ON "ProductModuleProgress" TO anon;
GRANT ALL ON "ProductProgress" TO anon;