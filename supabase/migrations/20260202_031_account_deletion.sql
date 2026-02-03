-- Account Deletion System (GDPR Compliance)
-- Priority: P1 - HIGH
-- Date: 2026-02-02

-- 1. Add deletion-related columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletionRequestedAt" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletionScheduledFor" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "deletionReason" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "isAnonymized" BOOLEAN DEFAULT FALSE;

-- 2. Create AccountDeletionRequest table for tracking
CREATE TABLE IF NOT EXISTS "AccountDeletionRequest" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,

  -- Request details
  reason TEXT,
  "additionalFeedback" TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending',
  "requestedAt" TIMESTAMPTZ DEFAULT NOW(),
  "scheduledDeletionAt" TIMESTAMPTZ,
  "cancelledAt" TIMESTAMPTZ,
  "completedAt" TIMESTAMPTZ,

  -- Data export
  "dataExportRequested" BOOLEAN DEFAULT FALSE,
  "dataExportCompletedAt" TIMESTAMPTZ,
  "dataExportUrl" TEXT,

  -- Audit trail
  "processedBy" TEXT,
  notes TEXT,

  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),

  CONSTRAINT deletion_status_check
    CHECK (status IN ('pending', 'scheduled', 'cancelled', 'processing', 'completed'))
);

-- 3. Create indexes
CREATE INDEX IF NOT EXISTS idx_deletion_request_user ON "AccountDeletionRequest"("userId");
CREATE INDEX IF NOT EXISTS idx_deletion_request_status ON "AccountDeletionRequest"(status);
CREATE INDEX IF NOT EXISTS idx_deletion_scheduled ON "AccountDeletionRequest"("scheduledDeletionAt");
CREATE INDEX IF NOT EXISTS idx_user_deletion_scheduled ON "User"("deletionScheduledFor");

-- 4. Enable RLS
ALTER TABLE "AccountDeletionRequest" ENABLE ROW LEVEL SECURITY;

-- Users can view their own deletion requests
CREATE POLICY "Users can view own deletion requests"
  ON "AccountDeletionRequest"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Users can create deletion requests for themselves
CREATE POLICY "Users can create own deletion requests"
  ON "AccountDeletionRequest"
  FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");

-- Users can cancel their own pending deletion requests
CREATE POLICY "Users can cancel own deletion requests"
  ON "AccountDeletionRequest"
  FOR UPDATE
  USING (auth.uid()::text = "userId" AND status = 'pending');

-- 5. Function to anonymize user data
CREATE OR REPLACE FUNCTION anonymize_user_data(user_id_param TEXT)
RETURNS VOID AS $$
BEGIN
  -- Anonymize User table
  UPDATE "User"
  SET
    email = 'deleted_' || id || '@anonymized.local',
    name = 'Deleted User',
    phone = NULL,
    bio = NULL,
    avatar = NULL,
    linkedinUrl = NULL,
    twitterUrl = NULL,
    websiteUrl = NULL,
    "isAnonymized" = TRUE,
    "updatedAt" = NOW()
  WHERE id = user_id_param;

  -- Anonymize StartupPortfolio
  UPDATE "StartupPortfolio"
  SET
    "startupName" = 'Deleted Startup',
    tagline = NULL,
    logo = NULL,
    "problemStatement" = NULL,
    solution = NULL,
    "valueProposition" = NULL,
    "targetMarket" = NULL,
    competitors = NULL,
    "marketSize" = NULL,
    "revenueStreams" = NULL,
    domain = NULL,
    "socialHandles" = NULL,
    "mvpDescription" = NULL,
    features = NULL,
    "userFeedback" = NULL,
    "pitchDeck" = NULL,
    "onePageSummary" = NULL,
    "updatedAt" = NOW()
  WHERE "userId" = user_id_param;

  -- Anonymize community posts (keep content for context but remove personal info)
  UPDATE "CommunityPost"
  SET
    "authorName" = 'Deleted User',
    "updatedAt" = NOW()
  WHERE "authorId" = user_id_param;

END;
$$ LANGUAGE plpgsql;

-- 6. Function to permanently delete user data
CREATE OR REPLACE FUNCTION permanently_delete_user(user_id_param TEXT)
RETURNS VOID AS $$
BEGIN
  -- Delete in order of dependencies

  -- Delete XP events
  DELETE FROM "XPEvent" WHERE "userId" = user_id_param;

  -- Delete lesson progress
  DELETE FROM "LessonProgress" WHERE "userId" = user_id_param;

  -- Delete module progress
  DELETE FROM "ModuleProgress" WHERE "userId" = user_id_param;

  -- Delete refund requests
  DELETE FROM "RefundRequest" WHERE "userId" = user_id_param;

  -- Delete purchases (anonymize for financial records if needed)
  UPDATE "Purchase"
  SET
    "userId" = 'deleted_' || user_id_param,
    "updatedAt" = NOW()
  WHERE "userId" = user_id_param;

  -- Delete portfolio
  DELETE FROM "StartupPortfolio" WHERE "userId" = user_id_param;

  -- Delete community posts
  DELETE FROM "CommunityPost" WHERE "authorId" = user_id_param;

  -- Delete deletion requests
  DELETE FROM "AccountDeletionRequest" WHERE "userId" = user_id_param;

  -- Delete audit logs (after retention period)
  DELETE FROM "AuditLog"
  WHERE "userId" = user_id_param
  AND "createdAt" < NOW() - INTERVAL '90 days';

  -- Finally delete the user
  DELETE FROM "User" WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql;

-- 7. Comments for documentation
COMMENT ON TABLE "AccountDeletionRequest" IS 'GDPR-compliant account deletion request tracking';
COMMENT ON FUNCTION anonymize_user_data(TEXT) IS 'Anonymizes user data while preserving structural integrity';
COMMENT ON FUNCTION permanently_delete_user(TEXT) IS 'Permanently deletes user and all associated data';
