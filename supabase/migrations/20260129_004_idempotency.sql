-- THE INDIAN STARTUP - Idempotency Keys Table
-- Migration: 20260129_004_idempotency.sql
-- Purpose: Prevent duplicate order creation from rapid double-clicks

-- ================================================
-- CREATE IDEMPOTENCY TABLE
-- ================================================
CREATE TABLE IF NOT EXISTS "IdempotencyKey" (
    id TEXT PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "requestHash" TEXT NOT NULL,
    response JSONB,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "expiresAt" TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),

    CONSTRAINT fk_idempotency_user
        FOREIGN KEY ("userId")
        REFERENCES "User"(id)
        ON DELETE CASCADE
);

-- ================================================
-- CREATE INDEXES
-- ================================================
CREATE INDEX IF NOT EXISTS idx_idempotency_user_hash
ON "IdempotencyKey"("userId", "requestHash");

CREATE INDEX IF NOT EXISTS idx_idempotency_expires
ON "IdempotencyKey"("expiresAt");

-- ================================================
-- ENABLE RLS
-- ================================================
ALTER TABLE "IdempotencyKey" ENABLE ROW LEVEL SECURITY;

-- Users can only access their own idempotency keys
CREATE POLICY "Users can view own idempotency keys" ON "IdempotencyKey"
FOR SELECT USING (auth.uid()::text = "userId");

CREATE POLICY "Users can insert own idempotency keys" ON "IdempotencyKey"
FOR INSERT WITH CHECK (auth.uid()::text = "userId");

CREATE POLICY "Service role full access to idempotency keys" ON "IdempotencyKey"
FOR ALL USING (auth.jwt()->>'role' = 'service_role');

-- ================================================
-- CLEANUP FUNCTION
-- ================================================
-- Function to clean up expired idempotency keys
CREATE OR REPLACE FUNCTION cleanup_expired_idempotency_keys()
RETURNS void AS $$
BEGIN
    DELETE FROM "IdempotencyKey"
    WHERE "expiresAt" < NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ================================================
-- SCHEDULED CLEANUP (Optional - run via cron)
-- ================================================
-- Call this function periodically to clean up expired keys:
-- SELECT cleanup_expired_idempotency_keys();
