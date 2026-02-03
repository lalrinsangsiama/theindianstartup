-- Notification Center System
-- Priority: P2 - MEDIUM
-- Date: 2026-02-03

-- 1. Create Notification table
CREATE TABLE IF NOT EXISTS "Notification" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,

  -- Notification content
  type TEXT NOT NULL, -- achievement, xp_earned, course_update, community_reply, system, welcome
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  "iconType" TEXT, -- trophy, zap, book, message, bell, gift

  -- Link to action
  "actionUrl" TEXT,
  "actionLabel" TEXT,

  -- Metadata for rich notifications
  metadata JSONB DEFAULT '{}'::jsonb,

  -- Status
  "isRead" BOOLEAN DEFAULT FALSE,
  "readAt" TIMESTAMPTZ,

  -- Archival
  "isArchived" BOOLEAN DEFAULT FALSE,
  "archivedAt" TIMESTAMPTZ,

  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "expiresAt" TIMESTAMPTZ -- Optional expiration

);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_notification_user ON "Notification"("userId");
CREATE INDEX IF NOT EXISTS idx_notification_unread ON "Notification"("userId", "isRead") WHERE "isRead" = FALSE;
CREATE INDEX IF NOT EXISTS idx_notification_created ON "Notification"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS idx_notification_type ON "Notification"(type);

-- 3. Enable RLS
ALTER TABLE "Notification" ENABLE ROW LEVEL SECURITY;

-- Users can view their own notifications
CREATE POLICY "Users can view own notifications"
  ON "Notification"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
  ON "Notification"
  FOR UPDATE
  USING (auth.uid()::text = "userId");

-- 4. Create NotificationPreference table
CREATE TABLE IF NOT EXISTS "NotificationPreference" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE UNIQUE,

  -- In-app notification preferences
  achievements BOOLEAN DEFAULT TRUE,
  "xpEarned" BOOLEAN DEFAULT TRUE,
  "courseUpdates" BOOLEAN DEFAULT TRUE,
  "communityReplies" BOOLEAN DEFAULT TRUE,
  "systemAlerts" BOOLEAN DEFAULT TRUE,
  promotions BOOLEAN DEFAULT FALSE,

  -- Email notification preferences
  "emailAchievements" BOOLEAN DEFAULT TRUE,
  "emailWeeklyProgress" BOOLEAN DEFAULT TRUE,
  "emailCommunityDigest" BOOLEAN DEFAULT FALSE,
  "emailPromotions" BOOLEAN DEFAULT FALSE,

  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE "NotificationPreference" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own preferences"
  ON "NotificationPreference"
  FOR ALL
  USING (auth.uid()::text = "userId");

-- 5. Function to create notification
CREATE OR REPLACE FUNCTION create_notification(
  p_user_id TEXT,
  p_type TEXT,
  p_title TEXT,
  p_message TEXT,
  p_icon_type TEXT DEFAULT NULL,
  p_action_url TEXT DEFAULT NULL,
  p_action_label TEXT DEFAULT NULL,
  p_metadata JSONB DEFAULT '{}'::jsonb
)
RETURNS TEXT AS $$
DECLARE
  v_notification_id TEXT;
  v_pref_enabled BOOLEAN := TRUE;
BEGIN
  -- Check user preferences
  SELECT CASE p_type
    WHEN 'achievement' THEN achievements
    WHEN 'xp_earned' THEN "xpEarned"
    WHEN 'course_update' THEN "courseUpdates"
    WHEN 'community_reply' THEN "communityReplies"
    WHEN 'system' THEN "systemAlerts"
    ELSE TRUE
  END INTO v_pref_enabled
  FROM "NotificationPreference"
  WHERE "userId" = p_user_id;

  -- Default to enabled if no preference exists
  IF v_pref_enabled IS NULL THEN
    v_pref_enabled := TRUE;
  END IF;

  -- Only create if enabled
  IF v_pref_enabled THEN
    INSERT INTO "Notification" (
      "userId", type, title, message, "iconType",
      "actionUrl", "actionLabel", metadata
    ) VALUES (
      p_user_id, p_type, p_title, p_message, p_icon_type,
      p_action_url, p_action_label, p_metadata
    )
    RETURNING id INTO v_notification_id;

    RETURN v_notification_id;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 6. Function to clean up old notifications
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
  -- Delete read notifications older than 30 days
  DELETE FROM "Notification"
  WHERE "isRead" = TRUE
  AND "readAt" < NOW() - INTERVAL '30 days';

  -- Delete unread notifications older than 90 days
  DELETE FROM "Notification"
  WHERE "isRead" = FALSE
  AND "createdAt" < NOW() - INTERVAL '90 days';

  -- Delete expired notifications
  DELETE FROM "Notification"
  WHERE "expiresAt" IS NOT NULL
  AND "expiresAt" < NOW();
END;
$$ LANGUAGE plpgsql;

-- 7. Comments
COMMENT ON TABLE "Notification" IS 'In-app notification center for user engagement';
COMMENT ON TABLE "NotificationPreference" IS 'User preferences for notification types';
COMMENT ON FUNCTION create_notification IS 'Creates notification respecting user preferences';
