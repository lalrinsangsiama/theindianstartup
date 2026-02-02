-- THE INDIAN STARTUP - Performance Indexes
-- Migration: 20260129_006_performance_indexes.sql
-- Purpose: Add composite indexes to optimize database queries for 10,000+ concurrent users

-- ================================================
-- PURCHASE TABLE INDEXES
-- ================================================

-- Optimize user access checks (most common query pattern)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_purchase_user_expires_status
ON "Purchase"("userId", "expiresAt" DESC, status);

-- Optimize product access validation
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_purchase_user_product_status
ON "Purchase"("userId", "productCode", status, "expiresAt");

-- Optimize expiration queries for cleanup/warning jobs
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_purchase_expires_active
ON "Purchase"("expiresAt")
WHERE status = 'completed';

-- Optimize pending order lookups (for idempotency)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_purchase_user_pending
ON "Purchase"("userId", "createdAt" DESC)
WHERE status = 'pending';

-- Optimize Razorpay order lookups (for webhooks)
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_purchase_razorpay_order
ON "Purchase"("razorpayOrderId")
WHERE "razorpayOrderId" IS NOT NULL;

-- ================================================
-- USER TABLE INDEXES
-- ================================================

-- Optimize email lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_email
ON "User"(email);

-- Optimize XP leaderboard queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_user_total_xp
ON "User"("totalXP" DESC NULLS LAST);

-- ================================================
-- LESSON PROGRESS INDEXES
-- ================================================

-- Optimize user progress queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lesson_progress_user
ON "LessonProgress"("userId", "completedAt" DESC NULLS LAST);

-- Optimize module progress calculation
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_lesson_progress_module
ON "LessonProgress"("purchaseId", "lessonId", completed);

-- ================================================
-- MODULE PROGRESS INDEXES
-- ================================================

-- Optimize user module progress queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_module_progress_user
ON "ModuleProgress"("userId", "completedAt" DESC NULLS LAST);

-- ================================================
-- XP EVENT INDEXES
-- ================================================

-- Optimize user XP history queries
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_xp_event_user_created
ON "XPEvent"("userId", "createdAt" DESC);

-- ================================================
-- IDEMPOTENCY KEY INDEXES (already created in migration 004)
-- ================================================

-- ================================================
-- BLOG/CONTENT INDEXES
-- ================================================

-- Optimize blog article lookups
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blog_article_slug
ON "BlogArticle"(slug)
WHERE status = 'published';

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_blog_article_category
ON "BlogArticle"(category, "publishedAt" DESC)
WHERE status = 'published';

-- ================================================
-- ANALYZE TABLES
-- ================================================
-- Update statistics for query planner
ANALYZE "Purchase";
ANALYZE "User";
ANALYZE "LessonProgress";
ANALYZE "ModuleProgress";
ANALYZE "XPEvent";

-- ================================================
-- VERIFY INDEXES
-- ================================================
SELECT
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('Purchase', 'User', 'LessonProgress', 'ModuleProgress', 'XPEvent')
ORDER BY tablename, indexname;
