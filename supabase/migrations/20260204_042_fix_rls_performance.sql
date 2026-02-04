-- Migration: Fix RLS Performance Issues
-- 1. auth_rls_initplan - Use (select auth.uid()) instead of auth.uid()
-- 2. multiple_permissive_policies - Consolidate overlapping policies
-- 3. duplicate_index - Remove duplicate indexes

-- ============================================================================
-- PART 1: Fix auth_rls_initplan warnings
-- Replace auth.uid() with (select auth.uid()) in all affected policies
-- ============================================================================

-- Helper function to check if user is admin (with subquery optimization)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public."User"
    WHERE id = (select auth.uid()::text)
    AND role = 'admin'
  );
$$;

-- ============================================================================
-- IdempotencyKey Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own idempotency keys" ON public."IdempotencyKey";
DROP POLICY IF EXISTS "Users can insert own idempotency keys" ON public."IdempotencyKey";
DROP POLICY IF EXISTS "Service role full access to idempotency keys" ON public."IdempotencyKey";

-- Consolidated policy for users (SELECT + INSERT)
CREATE POLICY "Users can manage own idempotency keys"
ON public."IdempotencyKey"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- Service role policy (separate for service_role)
CREATE POLICY "Service role full access idempotency"
ON public."IdempotencyKey"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- government_schemes Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Allow authenticated read access" ON public.government_schemes;
DROP POLICY IF EXISTS "Allow public read access to active schemes" ON public.government_schemes;

-- Consolidated public read policy
CREATE POLICY "Public can read active government schemes"
ON public.government_schemes
FOR SELECT
TO anon, authenticated
USING (status = 'active' OR (select auth.uid()) IS NOT NULL);

-- ============================================================================
-- AuditLog Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own audit logs" ON public."AuditLog";
DROP POLICY IF EXISTS "admin_read_audit_logs" ON public."AuditLog";
DROP POLICY IF EXISTS "user_insert_own_audit_logs" ON public."AuditLog";
DROP POLICY IF EXISTS "Service role can insert audit logs" ON public."AuditLog";

-- Users read own logs
CREATE POLICY "Users read own audit logs"
ON public."AuditLog"
FOR SELECT
TO authenticated
USING (
  "userId" = (select auth.uid()::text)
  OR public.is_admin()
);

-- Insert policy (users can insert their own, service role can insert any)
CREATE POLICY "Insert audit logs"
ON public."AuditLog"
FOR INSERT
TO authenticated
WITH CHECK ("userId" = (select auth.uid()::text));

CREATE POLICY "Service role insert audit logs"
ON public."AuditLog"
FOR INSERT
TO service_role
WITH CHECK (true);

-- ============================================================================
-- Purchase Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own purchases" ON public."Purchase";
DROP POLICY IF EXISTS "Users can insert own purchases" ON public."Purchase";
DROP POLICY IF EXISTS "Users can update own purchases" ON public."Purchase";
DROP POLICY IF EXISTS "Service role full access to purchases" ON public."Purchase";
DROP POLICY IF EXISTS "admin_read_all_purchases" ON public."Purchase";
DROP POLICY IF EXISTS "admin_update_all_purchases" ON public."Purchase";

-- Consolidated user policy
CREATE POLICY "Users manage own purchases"
ON public."Purchase"
FOR ALL
TO authenticated
USING (
  "userId" = (select auth.uid()::text)
  OR public.is_admin()
)
WITH CHECK (
  "userId" = (select auth.uid()::text)
  OR public.is_admin()
);

-- Service role full access
CREATE POLICY "Service role full access purchases"
ON public."Purchase"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- LessonProgress Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own lesson progress" ON public."LessonProgress";
DROP POLICY IF EXISTS "Users can insert own lesson progress" ON public."LessonProgress";
DROP POLICY IF EXISTS "Users can update own lesson progress" ON public."LessonProgress";
DROP POLICY IF EXISTS "Users can delete own lesson progress" ON public."LessonProgress";

CREATE POLICY "Users manage own lesson progress"
ON public."LessonProgress"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- ModuleProgress Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own module progress" ON public."ModuleProgress";
DROP POLICY IF EXISTS "Users can insert own module progress" ON public."ModuleProgress";
DROP POLICY IF EXISTS "Users can update own module progress" ON public."ModuleProgress";
DROP POLICY IF EXISTS "Users can delete own module progress" ON public."ModuleProgress";

CREATE POLICY "Users manage own module progress"
ON public."ModuleProgress"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- StartupPortfolio Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own portfolio" ON public."StartupPortfolio";
DROP POLICY IF EXISTS "Users can insert own portfolio" ON public."StartupPortfolio";
DROP POLICY IF EXISTS "Users can update own portfolio" ON public."StartupPortfolio";
DROP POLICY IF EXISTS "Users can delete own portfolio" ON public."StartupPortfolio";

CREATE POLICY "Users manage own portfolio"
ON public."StartupPortfolio"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- PortfolioActivity Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own portfolio activity" ON public."PortfolioActivity";
DROP POLICY IF EXISTS "Users can insert own portfolio activity" ON public."PortfolioActivity";
DROP POLICY IF EXISTS "Users can update own portfolio activity" ON public."PortfolioActivity";
DROP POLICY IF EXISTS "Users can delete own portfolio activity" ON public."PortfolioActivity";

CREATE POLICY "Users manage own portfolio activity"
ON public."PortfolioActivity"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- User Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "admin_read_all_users" ON public."User";
DROP POLICY IF EXISTS "admin_update_all_users" ON public."User";

-- Admin policies with optimized auth check
CREATE POLICY "Admin read all users"
ON public."User"
FOR SELECT
TO authenticated
USING (
  id = (select auth.uid()::text)
  OR public.is_admin()
);

CREATE POLICY "Admin update all users"
ON public."User"
FOR UPDATE
TO authenticated
USING (
  id = (select auth.uid()::text)
  OR public.is_admin()
)
WITH CHECK (
  id = (select auth.uid()::text)
  OR public.is_admin()
);

-- ============================================================================
-- Blog Tables Policies
-- ============================================================================

-- BlogCategory
DROP POLICY IF EXISTS "Admin can manage blog categories" ON public."BlogCategory";
DROP POLICY IF EXISTS "Public can read blog categories" ON public."BlogCategory";

CREATE POLICY "Public read blog categories"
ON public."BlogCategory"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage blog categories"
ON public."BlogCategory"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- BlogTag
DROP POLICY IF EXISTS "Admin can manage blog tags" ON public."BlogTag";
DROP POLICY IF EXISTS "Public can read blog tags" ON public."BlogTag";

CREATE POLICY "Public read blog tags"
ON public."BlogTag"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage blog tags"
ON public."BlogTag"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- BlogPost
DROP POLICY IF EXISTS "Admin can manage all posts" ON public."BlogPost";
DROP POLICY IF EXISTS "Public can read published posts" ON public."BlogPost";

CREATE POLICY "Public read published posts"
ON public."BlogPost"
FOR SELECT
TO anon, authenticated
USING (status = 'published' OR public.is_admin());

CREATE POLICY "Admin manage all posts"
ON public."BlogPost"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- BlogPostTag
DROP POLICY IF EXISTS "Admin can manage post tags" ON public."BlogPostTag";
DROP POLICY IF EXISTS "Public can read post tags" ON public."BlogPostTag";

CREATE POLICY "Public read post tags"
ON public."BlogPostTag"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage post tags"
ON public."BlogPostTag"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- BlogPostView
DROP POLICY IF EXISTS "Admin can read blog views" ON public."BlogPostView";

CREATE POLICY "Admin read blog views"
ON public."BlogPostView"
FOR SELECT
TO authenticated
USING (public.is_admin());

-- BlogComment
DROP POLICY IF EXISTS "Users can manage own comments" ON public."BlogComment";
DROP POLICY IF EXISTS "Admin can manage all comments" ON public."BlogComment";
DROP POLICY IF EXISTS "Public can read approved comments" ON public."BlogComment";

CREATE POLICY "Public read approved comments"
ON public."BlogComment"
FOR SELECT
TO anon, authenticated
USING (status = 'approved' OR "userId" = (select auth.uid()::text) OR public.is_admin());

CREATE POLICY "Users manage own comments"
ON public."BlogComment"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text) OR public.is_admin())
WITH CHECK ("userId" = (select auth.uid()::text) OR public.is_admin());

-- BlogMedia
DROP POLICY IF EXISTS "Admin can manage blog media" ON public."BlogMedia";

CREATE POLICY "Admin manage blog media"
ON public."BlogMedia"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- SystemNotification Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own notifications" ON public."SystemNotification";
DROP POLICY IF EXISTS "Users can mark own notifications read" ON public."SystemNotification";
DROP POLICY IF EXISTS "Admin can manage notifications" ON public."SystemNotification";

CREATE POLICY "Users manage own notifications"
ON public."SystemNotification"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text) OR public.is_admin())
WITH CHECK ("userId" = (select auth.uid()::text) OR public.is_admin());

-- ============================================================================
-- SupportTicket Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own tickets" ON public."SupportTicket";
DROP POLICY IF EXISTS "Users can create tickets" ON public."SupportTicket";
DROP POLICY IF EXISTS "Users can update own tickets" ON public."SupportTicket";
DROP POLICY IF EXISTS "Admin can manage all tickets" ON public."SupportTicket";

CREATE POLICY "Users manage own tickets"
ON public."SupportTicket"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text) OR public.is_admin())
WITH CHECK ("userId" = (select auth.uid()::text) OR public.is_admin());

-- ============================================================================
-- TicketResponse Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can read responses to own tickets" ON public."TicketResponse";
DROP POLICY IF EXISTS "Users can add responses to own tickets" ON public."TicketResponse";
DROP POLICY IF EXISTS "Admin can manage all ticket responses" ON public."TicketResponse";

CREATE POLICY "Users manage ticket responses"
ON public."TicketResponse"
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public."SupportTicket" t
    WHERE t.id = "TicketResponse"."ticketId"
    AND (t."userId" = (select auth.uid()::text) OR public.is_admin())
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public."SupportTicket" t
    WHERE t.id = "TicketResponse"."ticketId"
    AND (t."userId" = (select auth.uid()::text) OR public.is_admin())
  )
);

-- ============================================================================
-- ContentFeedback Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own feedback" ON public."ContentFeedback";
DROP POLICY IF EXISTS "Users can create feedback" ON public."ContentFeedback";
DROP POLICY IF EXISTS "Users can update own feedback" ON public."ContentFeedback";
DROP POLICY IF EXISTS "Users can delete own feedback" ON public."ContentFeedback";
DROP POLICY IF EXISTS "Admin can manage all feedback" ON public."ContentFeedback";

CREATE POLICY "Users manage own feedback"
ON public."ContentFeedback"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text) OR public.is_admin())
WITH CHECK ("userId" = (select auth.uid()::text) OR public.is_admin());

-- ============================================================================
-- DailyProgress Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can view own daily progress" ON public."DailyProgress";
DROP POLICY IF EXISTS "Users can create own daily progress" ON public."DailyProgress";
DROP POLICY IF EXISTS "Users can update own daily progress" ON public."DailyProgress";
DROP POLICY IF EXISTS "Users can delete own daily progress" ON public."DailyProgress";

CREATE POLICY "Users manage own daily progress"
ON public."DailyProgress"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- Product/Module/Lesson/Resource Table Policies (Public read, Admin manage)
-- ============================================================================

-- Product
DROP POLICY IF EXISTS "Admin can manage products" ON public."Product";
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public."Product";
DROP POLICY IF EXISTS "Public can read products" ON public."Product";

CREATE POLICY "Public read products"
ON public."Product"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage products"
ON public."Product"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Module
DROP POLICY IF EXISTS "Admin can manage modules" ON public."Module";
DROP POLICY IF EXISTS "Modules are viewable by everyone" ON public."Module";
DROP POLICY IF EXISTS "Public can read modules" ON public."Module";

CREATE POLICY "Public read modules"
ON public."Module"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage modules"
ON public."Module"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Lesson
DROP POLICY IF EXISTS "Admin can manage lessons" ON public."Lesson";
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON public."Lesson";
DROP POLICY IF EXISTS "Public can read lessons" ON public."Lesson";

CREATE POLICY "Public read lessons"
ON public."Lesson"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage lessons"
ON public."Lesson"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Resource
DROP POLICY IF EXISTS "Admin can manage resources" ON public."Resource";
DROP POLICY IF EXISTS "Public can read resources" ON public."Resource";

CREATE POLICY "Public read resources"
ON public."Resource"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage resources"
ON public."Resource"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- XPEvent Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own XP events" ON public."XPEvent";
DROP POLICY IF EXISTS "Users can create own XP events" ON public."XPEvent";
DROP POLICY IF EXISTS "Service role can manage XP events" ON public."XPEvent";

CREATE POLICY "Users manage own XP events"
ON public."XPEvent"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

CREATE POLICY "Service role manage XP events"
ON public."XPEvent"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- ActivityType Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage activity types" ON public."ActivityType";
DROP POLICY IF EXISTS "Public can read activity types" ON public."ActivityType";

CREATE POLICY "Public read activity types"
ON public."ActivityType"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage activity types"
ON public."ActivityType"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- Badge Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage badges" ON public."Badge";
DROP POLICY IF EXISTS "Public can read badges" ON public."Badge";

CREATE POLICY "Public read badges"
ON public."Badge"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage badges"
ON public."Badge"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- Coupon Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage coupons" ON public."Coupon";
DROP POLICY IF EXISTS "Service role can read coupons" ON public."Coupon";

CREATE POLICY "Admin manage coupons"
ON public."Coupon"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Service role read coupons"
ON public."Coupon"
FOR SELECT
TO service_role
USING (true);

-- ============================================================================
-- Incubator Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage incubators" ON public."Incubator";
DROP POLICY IF EXISTS "Public can read incubators" ON public."Incubator";

CREATE POLICY "Public read incubators"
ON public."Incubator"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage incubators"
ON public."Incubator"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- Scheme Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage schemes" ON public."Scheme";
DROP POLICY IF EXISTS "Public can read schemes" ON public."Scheme";

CREATE POLICY "Public read schemes"
ON public."Scheme"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage schemes"
ON public."Scheme"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- Investor Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage investors" ON public."Investor";
DROP POLICY IF EXISTS "Public can read investors" ON public."Investor";

CREATE POLICY "Public read investors"
ON public."Investor"
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admin manage investors"
ON public."Investor"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- Review Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can create own reviews" ON public."Review";
DROP POLICY IF EXISTS "Users can update own reviews" ON public."Review";
DROP POLICY IF EXISTS "Users can delete own reviews" ON public."Review";

CREATE POLICY "Users manage own reviews"
ON public."Review"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- FounderLog Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can read own founder logs" ON public."FounderLog";
DROP POLICY IF EXISTS "Users can create own founder logs" ON public."FounderLog";
DROP POLICY IF EXISTS "Users can update own founder logs" ON public."FounderLog";
DROP POLICY IF EXISTS "Users can delete own founder logs" ON public."FounderLog";

CREATE POLICY "Users manage own founder logs"
ON public."FounderLog"
FOR ALL
TO authenticated
USING ("userId" = (select auth.uid()::text))
WITH CHECK ("userId" = (select auth.uid()::text));

-- ============================================================================
-- Referral Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Users can create referrals" ON public."Referral";
DROP POLICY IF EXISTS "Users can read own referrals" ON public."Referral";
DROP POLICY IF EXISTS "Service role can manage referrals" ON public."Referral";

CREATE POLICY "Users manage own referrals"
ON public."Referral"
FOR ALL
TO authenticated
USING ("referrerId" = (select auth.uid()::text) OR "referredId" = (select auth.uid()::text))
WITH CHECK ("referrerId" = (select auth.uid()::text));

CREATE POLICY "Service role manage referrals"
ON public."Referral"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- UserNote Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage user notes" ON public."UserNote";

CREATE POLICY "Admin manage user notes"
ON public."UserNote"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- UserTag Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can manage user tags" ON public."UserTag";

CREATE POLICY "Admin manage user tags"
ON public."UserTag"
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================================
-- EmailQueue Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Service role manages email queue" ON public."EmailQueue";

CREATE POLICY "Service role manages email queue"
ON public."EmailQueue"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- AutomatedTask Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Service role manages automated tasks" ON public."AutomatedTask";

CREATE POLICY "Service role manages automated tasks"
ON public."AutomatedTask"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- AdminActivityLog Table Policies
-- ============================================================================
DROP POLICY IF EXISTS "Admin can read activity logs" ON public."AdminActivityLog";
DROP POLICY IF EXISTS "Service role inserts activity logs" ON public."AdminActivityLog";

CREATE POLICY "Admin read activity logs"
ON public."AdminActivityLog"
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Service role insert activity logs"
ON public."AdminActivityLog"
FOR INSERT
TO service_role
WITH CHECK (true);

-- ============================================================================
-- PART 3: Fix duplicate index
-- ============================================================================
DROP INDEX IF EXISTS public.idx_purchase_product_code;
-- Keep idx_purchase_product

-- ============================================================================
-- Verification
-- ============================================================================
DO $$
DECLARE
  policy_count INT;
BEGIN
  SELECT COUNT(*) INTO policy_count
  FROM pg_policies
  WHERE schemaname = 'public';

  RAISE NOTICE 'RLS performance migration complete. Total policies: %', policy_count;
END $$;
