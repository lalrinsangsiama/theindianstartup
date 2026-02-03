-- Two-Factor Authentication System
-- Priority: P2 - MEDIUM
-- Date: 2026-02-03

-- 1. Add 2FA columns to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorEnabled" BOOLEAN DEFAULT FALSE;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorSecret" TEXT; -- Encrypted TOTP secret
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorBackupCodes" TEXT[]; -- Hashed backup codes
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorEnabledAt" TIMESTAMPTZ;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "twoFactorMethod" TEXT DEFAULT 'totp'; -- totp, sms, email

-- 2. Create TrustedDevice table for "Remember this device" functionality
CREATE TABLE IF NOT EXISTS "TrustedDevice" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,

  -- Device identification
  "deviceFingerprint" TEXT NOT NULL,
  "deviceName" TEXT, -- e.g., "Chrome on Windows", "Safari on iPhone"
  "userAgent" TEXT,
  "ipAddress" TEXT,

  -- Trust settings
  "trustedAt" TIMESTAMPTZ DEFAULT NOW(),
  "expiresAt" TIMESTAMPTZ NOT NULL,
  "lastUsedAt" TIMESTAMPTZ DEFAULT NOW(),

  -- Revocation
  "revokedAt" TIMESTAMPTZ,
  "revokedReason" TEXT,

  "createdAt" TIMESTAMPTZ DEFAULT NOW(),
  "updatedAt" TIMESTAMPTZ DEFAULT NOW(),

  -- Unique constraint: one trust record per device per user
  UNIQUE("userId", "deviceFingerprint")
);

-- 3. Create TwoFactorRecoveryAttempt table for tracking recovery
CREATE TABLE IF NOT EXISTS "TwoFactorRecoveryAttempt" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,

  -- Attempt details
  method TEXT NOT NULL, -- backup_code, support_ticket, identity_verification
  status TEXT NOT NULL DEFAULT 'pending', -- pending, approved, denied, expired

  -- For backup code usage
  "backupCodeIndex" INTEGER,

  -- For support ticket
  "supportTicketId" TEXT,
  reason TEXT,

  -- Audit
  "ipAddress" TEXT,
  "userAgent" TEXT,

  "attemptedAt" TIMESTAMPTZ DEFAULT NOW(),
  "resolvedAt" TIMESTAMPTZ,
  "resolvedBy" TEXT,

  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create indexes
CREATE INDEX IF NOT EXISTS idx_trusted_device_user ON "TrustedDevice"("userId");
CREATE INDEX IF NOT EXISTS idx_trusted_device_expires ON "TrustedDevice"("expiresAt");
CREATE INDEX IF NOT EXISTS idx_trusted_device_fingerprint ON "TrustedDevice"("deviceFingerprint");
CREATE INDEX IF NOT EXISTS idx_2fa_recovery_user ON "TwoFactorRecoveryAttempt"("userId");
CREATE INDEX IF NOT EXISTS idx_user_2fa_enabled ON "User"("twoFactorEnabled") WHERE "twoFactorEnabled" = TRUE;

-- 5. Enable RLS
ALTER TABLE "TrustedDevice" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TwoFactorRecoveryAttempt" ENABLE ROW LEVEL SECURITY;

-- Users can view their own trusted devices
CREATE POLICY "Users can view own trusted devices"
  ON "TrustedDevice"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Users can delete (revoke) their own trusted devices
CREATE POLICY "Users can revoke own trusted devices"
  ON "TrustedDevice"
  FOR UPDATE
  USING (auth.uid()::text = "userId");

-- Users can view their own recovery attempts
CREATE POLICY "Users can view own recovery attempts"
  ON "TwoFactorRecoveryAttempt"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- 6. Function to clean up expired trusted devices
CREATE OR REPLACE FUNCTION cleanup_expired_trusted_devices()
RETURNS void AS $$
BEGIN
  DELETE FROM "TrustedDevice"
  WHERE "expiresAt" < NOW()
  OR "revokedAt" IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

-- 7. Comments
COMMENT ON TABLE "TrustedDevice" IS 'Stores devices trusted for 2FA bypass (Remember this device)';
COMMENT ON TABLE "TwoFactorRecoveryAttempt" IS 'Tracks 2FA recovery attempts for audit';
COMMENT ON COLUMN "User"."twoFactorSecret" IS 'Encrypted TOTP secret for authenticator apps';
COMMENT ON COLUMN "User"."twoFactorBackupCodes" IS 'Array of hashed one-time backup codes';
