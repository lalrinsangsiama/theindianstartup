-- ============================================================
-- MISSING TABLES AND RLS POLICIES
-- Run: 2026-02-02
--
-- Creates 15 tables that were identified in the RLS security audit
-- but don't exist yet, plus their RLS policies.
-- ============================================================

-- ============================================================
-- PART 1: BLOG SYSTEM TABLES
-- ============================================================

-- BlogCategory: Categories for organizing blog posts
CREATE TABLE IF NOT EXISTS "BlogCategory" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "description" TEXT,
  "parentId" TEXT REFERENCES "BlogCategory"("id") ON DELETE SET NULL,
  "order" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- BlogTag: Tags for blog posts
CREATE TABLE IF NOT EXISTS "BlogTag" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL UNIQUE,
  "slug" TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- BlogPost: Main blog posts table
CREATE TABLE IF NOT EXISTS "BlogPost" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL UNIQUE,
  "excerpt" TEXT,
  "content" TEXT NOT NULL,
  "featuredImage" TEXT,
  "authorId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "categoryId" TEXT REFERENCES "BlogCategory"("id") ON DELETE SET NULL,
  "status" TEXT NOT NULL DEFAULT 'draft', -- draft, published, archived
  "publishedAt" TIMESTAMP(3),
  "metaTitle" TEXT,
  "metaDescription" TEXT,
  "viewCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- BlogPostTag: Many-to-many relationship between posts and tags
CREATE TABLE IF NOT EXISTS "BlogPostTag" (
  "postId" TEXT NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "tagId" TEXT NOT NULL REFERENCES "BlogTag"("id") ON DELETE CASCADE,
  PRIMARY KEY ("postId", "tagId")
);

-- BlogPostView: Analytics for blog post views
CREATE TABLE IF NOT EXISTS "BlogPostView" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "postId" TEXT NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "userId" TEXT REFERENCES "User"("id") ON DELETE SET NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "referrer" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- BlogComment: Comments on blog posts
CREATE TABLE IF NOT EXISTS "BlogComment" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "postId" TEXT NOT NULL REFERENCES "BlogPost"("id") ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "parentId" TEXT REFERENCES "BlogComment"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending', -- pending, approved, rejected, spam
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- BlogMedia: Media files for blog posts
CREATE TABLE IF NOT EXISTS "BlogMedia" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "filename" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "url" TEXT NOT NULL,
  "altText" TEXT,
  "caption" TEXT,
  "uploadedBy" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PART 2: SUPPORT SYSTEM TABLES
-- ============================================================

-- SupportTicket: Support tickets from users
CREATE TABLE IF NOT EXISTS "SupportTicket" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "subject" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'general', -- general, billing, technical, account, other
  "priority" TEXT NOT NULL DEFAULT 'normal', -- low, normal, high, urgent
  "status" TEXT NOT NULL DEFAULT 'open', -- open, in_progress, waiting, resolved, closed
  "assignedTo" TEXT REFERENCES "User"("id") ON DELETE SET NULL,
  "resolvedAt" TIMESTAMP(3),
  "closedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TicketResponse: Responses to support tickets
CREATE TABLE IF NOT EXISTS "TicketResponse" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "ticketId" TEXT NOT NULL REFERENCES "SupportTicket"("id") ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "responderType" TEXT NOT NULL DEFAULT 'user', -- user, admin, system
  "isInternal" BOOLEAN DEFAULT false, -- internal notes not visible to user
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PART 3: ADMIN/CRM TABLES
-- ============================================================

-- UserNote: Admin notes about users
CREATE TABLE IF NOT EXISTS "UserNote" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "adminId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "content" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- UserTag: Tags for categorizing users (admin use)
CREATE TABLE IF NOT EXISTS "UserTag" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "tag" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "tag")
);

-- ============================================================
-- PART 4: NOTIFICATION SYSTEM
-- ============================================================

-- SystemNotification: System-wide and user notifications
CREATE TABLE IF NOT EXISTS "SystemNotification" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT REFERENCES "User"("id") ON DELETE CASCADE, -- NULL for system-wide
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'info', -- info, success, warning, error
  "category" TEXT DEFAULT 'general', -- general, purchase, course, system, promotion
  "link" TEXT, -- optional link to relevant page
  "isRead" BOOLEAN DEFAULT false,
  "readAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PART 5: BACKGROUND JOBS
-- ============================================================

-- EmailQueue: Queue for sending emails
CREATE TABLE IF NOT EXISTS "EmailQueue" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "to" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "templateId" TEXT,
  "templateData" JSONB,
  "status" TEXT NOT NULL DEFAULT 'pending', -- pending, processing, sent, failed
  "attempts" INTEGER DEFAULT 0,
  "maxAttempts" INTEGER DEFAULT 3,
  "lastAttemptAt" TIMESTAMP(3),
  "sentAt" TIMESTAMP(3),
  "errorMessage" TEXT,
  "scheduledFor" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- AutomatedTask: Scheduled/automated tasks
CREATE TABLE IF NOT EXISTS "AutomatedTask" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "name" TEXT NOT NULL,
  "type" TEXT NOT NULL, -- email, report, cleanup, sync, etc.
  "schedule" TEXT, -- cron expression
  "config" JSONB,
  "status" TEXT NOT NULL DEFAULT 'active', -- active, paused, completed, failed
  "lastRunAt" TIMESTAMP(3),
  "nextRunAt" TIMESTAMP(3),
  "lastResult" JSONB,
  "errorCount" INTEGER DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- AdminActivityLog: Log of admin actions
CREATE TABLE IF NOT EXISTS "AdminActivityLog" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "adminId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "action" TEXT NOT NULL,
  "entityType" TEXT, -- user, purchase, product, etc.
  "entityId" TEXT,
  "details" JSONB,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PART 6: CONTENT FEEDBACK
-- ============================================================

-- ContentFeedback: User feedback on content (lessons, modules)
CREATE TABLE IF NOT EXISTS "ContentFeedback" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "contentType" TEXT NOT NULL, -- lesson, module, product
  "contentId" TEXT NOT NULL,
  "rating" INTEGER CHECK ("rating" >= 1 AND "rating" <= 5),
  "feedback" TEXT,
  "isHelpful" BOOLEAN,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "contentType", "contentId")
);

-- ============================================================
-- PART 7: DAILY PROGRESS
-- ============================================================

-- DailyProgress: Daily progress tracking for users
CREATE TABLE IF NOT EXISTS "DailyProgress" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "date" DATE NOT NULL,
  "lessonsCompleted" INTEGER DEFAULT 0,
  "minutesSpent" INTEGER DEFAULT 0,
  "xpEarned" INTEGER DEFAULT 0,
  "streakDay" INTEGER DEFAULT 0,
  "notes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE("userId", "date")
);

-- ============================================================
-- PART 8: INDEXES FOR PERFORMANCE
-- ============================================================

CREATE INDEX IF NOT EXISTS "idx_blogpost_author" ON "BlogPost"("authorId");
CREATE INDEX IF NOT EXISTS "idx_blogpost_category" ON "BlogPost"("categoryId");
CREATE INDEX IF NOT EXISTS "idx_blogpost_status" ON "BlogPost"("status");
CREATE INDEX IF NOT EXISTS "idx_blogpost_published" ON "BlogPost"("publishedAt");
CREATE INDEX IF NOT EXISTS "idx_blogpostview_post" ON "BlogPostView"("postId");
CREATE INDEX IF NOT EXISTS "idx_blogpostview_created" ON "BlogPostView"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_blogcomment_post" ON "BlogComment"("postId");
CREATE INDEX IF NOT EXISTS "idx_blogcomment_user" ON "BlogComment"("userId");
CREATE INDEX IF NOT EXISTS "idx_blogcomment_status" ON "BlogComment"("status");
CREATE INDEX IF NOT EXISTS "idx_supportticket_user" ON "SupportTicket"("userId");
CREATE INDEX IF NOT EXISTS "idx_supportticket_status" ON "SupportTicket"("status");
CREATE INDEX IF NOT EXISTS "idx_supportticket_assigned" ON "SupportTicket"("assignedTo");
CREATE INDEX IF NOT EXISTS "idx_ticketresponse_ticket" ON "TicketResponse"("ticketId");
CREATE INDEX IF NOT EXISTS "idx_usernote_user" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "idx_usertag_user" ON "UserTag"("userId");
CREATE INDEX IF NOT EXISTS "idx_usertag_tag" ON "UserTag"("tag");
CREATE INDEX IF NOT EXISTS "idx_notification_user" ON "SystemNotification"("userId");
CREATE INDEX IF NOT EXISTS "idx_notification_read" ON "SystemNotification"("isRead");
CREATE INDEX IF NOT EXISTS "idx_emailqueue_status" ON "EmailQueue"("status");
CREATE INDEX IF NOT EXISTS "idx_emailqueue_scheduled" ON "EmailQueue"("scheduledFor");
CREATE INDEX IF NOT EXISTS "idx_adminactivity_admin" ON "AdminActivityLog"("adminId");
CREATE INDEX IF NOT EXISTS "idx_adminactivity_entity" ON "AdminActivityLog"("entityType", "entityId");
CREATE INDEX IF NOT EXISTS "idx_contentfeedback_user" ON "ContentFeedback"("userId");
CREATE INDEX IF NOT EXISTS "idx_contentfeedback_content" ON "ContentFeedback"("contentType", "contentId");
CREATE INDEX IF NOT EXISTS "idx_dailyprogress_user" ON "DailyProgress"("userId");
CREATE INDEX IF NOT EXISTS "idx_dailyprogress_date" ON "DailyProgress"("date");

-- ============================================================
-- PART 9: ENABLE RLS ON ALL TABLES
-- ============================================================

ALTER TABLE "BlogCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPostTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPostView" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogComment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogMedia" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SupportTicket" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TicketResponse" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserNote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SystemNotification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EmailQueue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AutomatedTask" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminActivityLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContentFeedback" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DailyProgress" ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- PART 10: RLS POLICIES - BLOG SYSTEM
-- ============================================================

-- BlogCategory: Public read, admin write
CREATE POLICY "Public can read blog categories" ON "BlogCategory"
FOR SELECT USING (true);

CREATE POLICY "Admin can manage blog categories" ON "BlogCategory"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogTag: Public read, admin write
CREATE POLICY "Public can read blog tags" ON "BlogTag"
FOR SELECT USING (true);

CREATE POLICY "Admin can manage blog tags" ON "BlogTag"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogPost: Public reads published, admin manages all
CREATE POLICY "Public can read published posts" ON "BlogPost"
FOR SELECT USING ("status" = 'published');

CREATE POLICY "Admin can manage all posts" ON "BlogPost"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogPostTag: Public read, admin write
CREATE POLICY "Public can read post tags" ON "BlogPostTag"
FOR SELECT USING (true);

CREATE POLICY "Admin can manage post tags" ON "BlogPostTag"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogPostView: Anyone can insert (analytics), admin can read
CREATE POLICY "Anyone can record blog views" ON "BlogPostView"
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can read blog views" ON "BlogPostView"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogComment: Users manage own, public reads approved
CREATE POLICY "Users can manage own comments" ON "BlogComment"
FOR ALL USING ("userId" = auth.uid()::text);

CREATE POLICY "Public can read approved comments" ON "BlogComment"
FOR SELECT USING ("status" = 'approved');

CREATE POLICY "Admin can manage all comments" ON "BlogComment"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- BlogMedia: Admin only
CREATE POLICY "Admin can manage blog media" ON "BlogMedia"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- ============================================================
-- PART 11: RLS POLICIES - SUPPORT SYSTEM
-- ============================================================

-- SupportTicket: Users manage own, admin manages all
CREATE POLICY "Users can view own tickets" ON "SupportTicket"
FOR SELECT USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can create tickets" ON "SupportTicket"
FOR INSERT WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can update own tickets" ON "SupportTicket"
FOR UPDATE USING ("userId" = auth.uid()::text);

CREATE POLICY "Admin can manage all tickets" ON "SupportTicket"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- TicketResponse: Users read own ticket responses, admin manages all
CREATE POLICY "Users can read responses to own tickets" ON "TicketResponse"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "SupportTicket"
    WHERE "SupportTicket"."id" = "TicketResponse"."ticketId"
    AND "SupportTicket"."userId" = auth.uid()::text
  )
  AND "isInternal" = false
);

CREATE POLICY "Users can add responses to own tickets" ON "TicketResponse"
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM "SupportTicket"
    WHERE "SupportTicket"."id" = "ticketId"
    AND "SupportTicket"."userId" = auth.uid()::text
  )
  AND "responderType" = 'user'
);

CREATE POLICY "Admin can manage all ticket responses" ON "TicketResponse"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- ============================================================
-- PART 12: RLS POLICIES - ADMIN/CRM
-- ============================================================

-- UserNote: Admin only
CREATE POLICY "Admin can manage user notes" ON "UserNote"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- UserTag: Admin only
CREATE POLICY "Admin can manage user tags" ON "UserTag"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- ============================================================
-- PART 13: RLS POLICIES - NOTIFICATIONS
-- ============================================================

-- SystemNotification: Users read own + system-wide, admin manages
CREATE POLICY "Users can read own notifications" ON "SystemNotification"
FOR SELECT USING (
  "userId" = auth.uid()::text
  OR "userId" IS NULL  -- system-wide notifications
);

CREATE POLICY "Users can mark own notifications read" ON "SystemNotification"
FOR UPDATE USING ("userId" = auth.uid()::text)
WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Admin can manage notifications" ON "SystemNotification"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- ============================================================
-- PART 14: RLS POLICIES - BACKGROUND JOBS
-- ============================================================

-- EmailQueue: Service role only (server-side)
CREATE POLICY "Service role manages email queue" ON "EmailQueue"
FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- AutomatedTask: Service role only
CREATE POLICY "Service role manages automated tasks" ON "AutomatedTask"
FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- AdminActivityLog: Admin read only (insert via service role)
CREATE POLICY "Admin can read activity logs" ON "AdminActivityLog"
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

CREATE POLICY "Service role inserts activity logs" ON "AdminActivityLog"
FOR INSERT WITH CHECK (auth.jwt()->>'role' = 'service_role');

-- ============================================================
-- PART 15: RLS POLICIES - CONTENT FEEDBACK
-- ============================================================

-- ContentFeedback: Users manage own, admin reads all
CREATE POLICY "Users can view own feedback" ON "ContentFeedback"
FOR SELECT USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can create feedback" ON "ContentFeedback"
FOR INSERT WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can update own feedback" ON "ContentFeedback"
FOR UPDATE USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can delete own feedback" ON "ContentFeedback"
FOR DELETE USING ("userId" = auth.uid()::text);

CREATE POLICY "Admin can manage all feedback" ON "ContentFeedback"
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM "User"
    WHERE "User"."id" = auth.uid()::text
    AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
  )
);

-- ============================================================
-- PART 16: RLS POLICIES - DAILY PROGRESS
-- ============================================================

-- DailyProgress: Users manage own
CREATE POLICY "Users can view own daily progress" ON "DailyProgress"
FOR SELECT USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can create own daily progress" ON "DailyProgress"
FOR INSERT WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can update own daily progress" ON "DailyProgress"
FOR UPDATE USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can delete own daily progress" ON "DailyProgress"
FOR DELETE USING ("userId" = auth.uid()::text);
