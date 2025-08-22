-- Comprehensive Support System Schema
-- Run this in your Supabase SQL Editor

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS "SupportTicket" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "userEmail" TEXT NOT NULL,
  "userName" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "category" TEXT NOT NULL DEFAULT 'general' CHECK ("category" IN ('technical', 'billing', 'content', 'account', 'feature_request', 'general')),
  "priority" TEXT NOT NULL DEFAULT 'medium' CHECK ("priority" IN ('low', 'medium', 'high', 'urgent')),
  "status" TEXT NOT NULL DEFAULT 'open' CHECK ("status" IN ('open', 'in_progress', 'waiting_user', 'resolved', 'closed')),
  "assignedTo" UUID REFERENCES "User"("id"),
  "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "responseCount" INTEGER DEFAULT 0,
  "resolvedAt" TIMESTAMPTZ,
  "lastResponseAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Ticket Responses Table
CREATE TABLE IF NOT EXISTS "TicketResponse" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "ticketId" UUID NOT NULL REFERENCES "SupportTicket"("id") ON DELETE CASCADE,
  "responderId" UUID NOT NULL,
  "responderName" TEXT NOT NULL,
  "responderType" TEXT NOT NULL DEFAULT 'user' CHECK ("responderType" IN ('user', 'admin')),
  "message" TEXT NOT NULL,
  "isInternal" BOOLEAN DEFAULT FALSE,
  "attachments" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- User Notes Table (for admin to track user interactions)
CREATE TABLE IF NOT EXISTS "UserNote" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "adminId" UUID NOT NULL REFERENCES "User"("id"),
  "note" TEXT NOT NULL,
  "category" TEXT DEFAULT 'general',
  "isPrivate" BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- User Tags Table (for segmentation)
CREATE TABLE IF NOT EXISTS "UserTag" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "User"("id") ON DELETE CASCADE,
  "tag" TEXT NOT NULL,
  "createdBy" UUID NOT NULL REFERENCES "User"("id"),
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("userId", "tag")
);

-- System Notifications Table
CREATE TABLE IF NOT EXISTS "SystemNotification" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID REFERENCES "User"("id") ON DELETE CASCADE, -- NULL for system-wide notifications
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "type" TEXT NOT NULL DEFAULT 'info' CHECK ("type" IN ('info', 'warning', 'error', 'success')),
  "priority" TEXT NOT NULL DEFAULT 'normal' CHECK ("priority" IN ('low', 'normal', 'high')),
  "isRead" BOOLEAN DEFAULT FALSE,
  "actionUrl" TEXT,
  "actionText" TEXT,
  "expiresAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Email Queue Table (for managing email sending)
CREATE TABLE IF NOT EXISTS "EmailQueue" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "toEmail" TEXT NOT NULL,
  "toName" TEXT,
  "subject" TEXT NOT NULL,
  "htmlBody" TEXT NOT NULL,
  "textBody" TEXT,
  "templateId" TEXT,
  "templateData" JSONB,
  "status" TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'sent', 'failed', 'cancelled')),
  "priority" INTEGER DEFAULT 5, -- 1 = highest, 10 = lowest
  "scheduledFor" TIMESTAMPTZ DEFAULT NOW(),
  "sentAt" TIMESTAMPTZ,
  "failureReason" TEXT,
  "retryCount" INTEGER DEFAULT 0,
  "maxRetries" INTEGER DEFAULT 3,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Activity Log
CREATE TABLE IF NOT EXISTS "AdminActivityLog" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "adminId" UUID NOT NULL REFERENCES "User"("id"),
  "action" TEXT NOT NULL, -- 'user_updated', 'ticket_resolved', 'content_seeded', etc.
  "entityType" TEXT NOT NULL, -- 'user', 'ticket', 'product', etc.
  "entityId" UUID,
  "details" JSONB,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Automated Tasks Table
CREATE TABLE IF NOT EXISTS "AutomatedTask" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "type" TEXT NOT NULL, -- 'follow_up_ticket', 'welcome_email', 'course_reminder', etc.
  "entityId" UUID NOT NULL,
  "entityType" TEXT NOT NULL,
  "scheduledFor" TIMESTAMPTZ NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending' CHECK ("status" IN ('pending', 'running', 'completed', 'failed', 'cancelled')),
  "payload" JSONB,
  "result" JSONB,
  "failureReason" TEXT,
  "retryCount" INTEGER DEFAULT 0,
  "maxRetries" INTEGER DEFAULT 3,
  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "completedAt" TIMESTAMPTZ
);

-- Content Feedback Table
CREATE TABLE IF NOT EXISTS "ContentFeedback" (
  "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "userId" UUID NOT NULL REFERENCES "User"("id"),
  "productCode" TEXT NOT NULL,
  "lessonId" UUID REFERENCES "Lesson"("id"),
  "rating" INTEGER CHECK ("rating" >= 1 AND "rating" <= 5),
  "feedback" TEXT,
  "category" TEXT DEFAULT 'general' CHECK ("category" IN ('content_quality', 'difficulty', 'clarity', 'usefulness', 'technical_issues', 'general')),
  "isPublic" BOOLEAN DEFAULT FALSE,
  "adminResponse" TEXT,
  "respondedAt" TIMESTAMPTZ,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "idx_support_ticket_status" ON "SupportTicket"("status");
CREATE INDEX IF NOT EXISTS "idx_support_ticket_priority" ON "SupportTicket"("priority");
CREATE INDEX IF NOT EXISTS "idx_support_ticket_user" ON "SupportTicket"("userId");
CREATE INDEX IF NOT EXISTS "idx_support_ticket_created" ON "SupportTicket"("createdAt");
CREATE INDEX IF NOT EXISTS "idx_ticket_response_ticket" ON "TicketResponse"("ticketId");
CREATE INDEX IF NOT EXISTS "idx_user_note_user" ON "UserNote"("userId");
CREATE INDEX IF NOT EXISTS "idx_user_tag_user" ON "UserTag"("userId");
CREATE INDEX IF NOT EXISTS "idx_system_notification_user" ON "SystemNotification"("userId");
CREATE INDEX IF NOT EXISTS "idx_email_queue_status" ON "EmailQueue"("status");
CREATE INDEX IF NOT EXISTS "idx_admin_activity_admin" ON "AdminActivityLog"("adminId");
CREATE INDEX IF NOT EXISTS "idx_automated_task_scheduled" ON "AutomatedTask"("scheduledFor");
CREATE INDEX IF NOT EXISTS "idx_content_feedback_product" ON "ContentFeedback"("productCode");

-- Create RLS policies (adjust as needed for your security requirements)
ALTER TABLE "SupportTicket" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TicketResponse" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserNote" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserTag" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "SystemNotification" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "EmailQueue" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminActivityLog" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AutomatedTask" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ContentFeedback" ENABLE ROW LEVEL SECURITY;

-- Allow admin full access (adjust user role checks as needed)
CREATE POLICY "Admin full access to support tickets" ON "SupportTicket"
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM "User" 
      WHERE "User"."id" = auth.uid() 
      AND ("User"."email" = 'admin@theindianstartup.in' OR "User"."role" = 'admin')
    )
  );

CREATE POLICY "Users can view own tickets" ON "SupportTicket"
  FOR SELECT USING ("userId" = auth.uid());

CREATE POLICY "Users can create tickets" ON "SupportTicket"
  FOR INSERT WITH CHECK ("userId" = auth.uid());

-- Similar policies for other tables...

-- Functions for common operations
CREATE OR REPLACE FUNCTION increment_response_count(ticket_id UUID)
RETURNS INTEGER AS $$
BEGIN
  UPDATE "SupportTicket" 
  SET "responseCount" = "responseCount" + 1 
  WHERE "id" = ticket_id;
  
  RETURN (SELECT "responseCount" FROM "SupportTicket" WHERE "id" = ticket_id);
END;
$$ LANGUAGE plpgsql;

-- Function to get user stats
CREATE OR REPLACE FUNCTION get_user_stats(user_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'totalPurchases', COALESCE((SELECT COUNT(*) FROM "Purchase" WHERE "userId" = user_id), 0),
    'totalSpent', COALESCE((SELECT SUM("amount") FROM "Purchase" WHERE "userId" = user_id AND "status" = 'completed'), 0),
    'supportTickets', COALESCE((SELECT COUNT(*) FROM "SupportTicket" WHERE "userId" = user_id), 0),
    'openTickets', COALESCE((SELECT COUNT(*) FROM "SupportTicket" WHERE "userId" = user_id AND "status" = 'open'), 0),
    'lastPurchaseDate', (SELECT MAX("purchaseDate") FROM "Purchase" WHERE "userId" = user_id),
    'registrationDate', (SELECT "createdAt" FROM "User" WHERE "id" = user_id)
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;