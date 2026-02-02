-- ============================================================
-- COMPLETE RLS POLICIES - Security Audit Remediation
-- Run: 2026-02-02
--
-- This migration adds RLS policies to progress and portfolio tables.
-- Many tables in the original audit plan don't exist yet (blog, support,
-- notifications, etc.) - policies for those will be added when
-- the tables are created.
-- ============================================================

-- ============================================================
-- ENABLE RLS ON PROGRESS TABLES
-- ============================================================

ALTER TABLE "LessonProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ModuleProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PortfolioActivity" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- LESSONPROGRESS POLICIES
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'LessonProgress'
    AND policyname = 'Users can view own lesson progress'
  ) THEN
    CREATE POLICY "Users can view own lesson progress" ON "LessonProgress"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'LessonProgress'
    AND policyname = 'Users can insert own lesson progress'
  ) THEN
    CREATE POLICY "Users can insert own lesson progress" ON "LessonProgress"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'LessonProgress'
    AND policyname = 'Users can update own lesson progress'
  ) THEN
    CREATE POLICY "Users can update own lesson progress" ON "LessonProgress"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'LessonProgress'
    AND policyname = 'Users can delete own lesson progress'
  ) THEN
    CREATE POLICY "Users can delete own lesson progress" ON "LessonProgress"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- ============================================================
-- MODULEPROGRESS POLICIES
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ModuleProgress'
    AND policyname = 'Users can view own module progress'
  ) THEN
    CREATE POLICY "Users can view own module progress" ON "ModuleProgress"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ModuleProgress'
    AND policyname = 'Users can insert own module progress'
  ) THEN
    CREATE POLICY "Users can insert own module progress" ON "ModuleProgress"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ModuleProgress'
    AND policyname = 'Users can update own module progress'
  ) THEN
    CREATE POLICY "Users can update own module progress" ON "ModuleProgress"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'ModuleProgress'
    AND policyname = 'Users can delete own module progress'
  ) THEN
    CREATE POLICY "Users can delete own module progress" ON "ModuleProgress"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- ============================================================
-- PORTFOLIOACTIVITY POLICIES
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'PortfolioActivity'
    AND policyname = 'Users can view own portfolio activity'
  ) THEN
    CREATE POLICY "Users can view own portfolio activity" ON "PortfolioActivity"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'PortfolioActivity'
    AND policyname = 'Users can insert own portfolio activity'
  ) THEN
    CREATE POLICY "Users can insert own portfolio activity" ON "PortfolioActivity"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'PortfolioActivity'
    AND policyname = 'Users can update own portfolio activity'
  ) THEN
    CREATE POLICY "Users can update own portfolio activity" ON "PortfolioActivity"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'PortfolioActivity'
    AND policyname = 'Users can delete own portfolio activity'
  ) THEN
    CREATE POLICY "Users can delete own portfolio activity" ON "PortfolioActivity"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- ============================================================
-- STARTUPPORTFOLIO POLICIES
-- ============================================================

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'StartupPortfolio'
    AND policyname = 'Users can view own portfolio'
  ) THEN
    CREATE POLICY "Users can view own portfolio" ON "StartupPortfolio"
    FOR SELECT USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'StartupPortfolio'
    AND policyname = 'Users can insert own portfolio'
  ) THEN
    CREATE POLICY "Users can insert own portfolio" ON "StartupPortfolio"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'StartupPortfolio'
    AND policyname = 'Users can update own portfolio'
  ) THEN
    CREATE POLICY "Users can update own portfolio" ON "StartupPortfolio"
    FOR UPDATE USING (auth.uid()::text = "userId");
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'StartupPortfolio'
    AND policyname = 'Users can delete own portfolio'
  ) THEN
    CREATE POLICY "Users can delete own portfolio" ON "StartupPortfolio"
    FOR DELETE USING (auth.uid()::text = "userId");
  END IF;
END $$;

-- ============================================================
-- PROTECTED TABLES (No user DELETE - service role only)
-- These tables require audit trails and should not allow
-- user-initiated deletes:
-- ============================================================
-- Purchase - financial audit trail (RLS enabled, has 4 policies)
-- IdempotencyKey - payment safety (RLS enabled, has 3 policies)
-- AuditLog - security audit trail (RLS enabled, has 2 policies)
-- XPEvent - gamification audit trail
-- User - account deletion via dedicated endpoint

-- ============================================================
-- TABLES NOT YET CREATED (policies to add when tables exist):
-- ============================================================
-- Blog system: BlogCategory, BlogTag, BlogPostView, BlogComment, BlogMedia
-- Support system: TicketResponse, SupportTicket
-- Admin system: UserNote, UserTag, SystemNotification, EmailQueue,
--               AdminActivityLog, AutomatedTask, ContentFeedback
-- Progress: DailyProgress
