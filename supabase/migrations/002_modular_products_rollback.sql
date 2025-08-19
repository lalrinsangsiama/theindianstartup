-- Rollback: Modular Products Schema
-- Description: Reverts the modular products schema changes
-- Date: 2025-01-18
-- WARNING: This will delete all data in the new tables!

-- Drop views and functions
DROP VIEW IF EXISTS p1_journey_view;
DROP FUNCTION IF EXISTS get_p1_user_progress(TEXT);
DROP FUNCTION IF EXISTS get_user_products(TEXT);
DROP FUNCTION IF EXISTS check_product_access(TEXT, TEXT);
DROP FUNCTION IF EXISTS migrate_daily_lessons();

-- Drop triggers
DROP TRIGGER IF EXISTS update_product_updated_at ON "Product";
DROP TRIGGER IF EXISTS update_module_updated_at ON "Module";
DROP TRIGGER IF EXISTS update_lesson_updated_at ON "Lesson";
DROP TRIGGER IF EXISTS update_lesson_progress_updated_at ON "LessonProgress";
DROP TRIGGER IF EXISTS update_module_progress_updated_at ON "ModuleProgress";

-- Drop policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON "Product";
DROP POLICY IF EXISTS "Modules are viewable by everyone" ON "Module";
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON "Lesson";
DROP POLICY IF EXISTS "Users can view own lesson progress" ON "LessonProgress";
DROP POLICY IF EXISTS "Users can insert own lesson progress" ON "LessonProgress";
DROP POLICY IF EXISTS "Users can update own lesson progress" ON "LessonProgress";
DROP POLICY IF EXISTS "Users can view own module progress" ON "ModuleProgress";
DROP POLICY IF EXISTS "Users can insert own module progress" ON "ModuleProgress";
DROP POLICY IF EXISTS "Users can update own module progress" ON "ModuleProgress";

-- Drop indexes
DROP INDEX IF EXISTS idx_module_product;
DROP INDEX IF EXISTS idx_lesson_module;
DROP INDEX IF EXISTS idx_lesson_progress_user;
DROP INDEX IF EXISTS idx_lesson_progress_lesson;
DROP INDEX IF EXISTS idx_module_progress_user;
DROP INDEX IF EXISTS idx_purchase_product_code;
DROP INDEX IF EXISTS idx_purchase_expires;

-- Drop tables
DROP TABLE IF EXISTS "LessonProgress" CASCADE;
DROP TABLE IF EXISTS "ModuleProgress" CASCADE;
DROP TABLE IF EXISTS "Lesson" CASCADE;
DROP TABLE IF EXISTS "Module" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;

-- Revert Purchase table changes
ALTER TABLE "Purchase" 
DROP COLUMN IF EXISTS "productCode",
DROP COLUMN IF EXISTS "expiresAt";

-- Note: This doesn't restore the original productType values that were changed from '30_day_guide'