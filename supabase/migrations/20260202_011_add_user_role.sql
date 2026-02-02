-- Add role column to User table for proper RBAC
-- This replaces email-based admin checks with database-driven roles

-- Add role column with default 'user'
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role" TEXT NOT NULL DEFAULT 'user';

-- Add check constraint for valid roles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_role_check'
  ) THEN
    ALTER TABLE "User" ADD CONSTRAINT user_role_check
      CHECK (role IN ('user', 'admin', 'support', 'moderator'));
  END IF;
END $$;

-- Create index for role lookups
CREATE INDEX IF NOT EXISTS idx_user_role ON "User" (role);

-- Set existing admins by email (these are the known admin emails)
UPDATE "User"
SET role = 'admin'
WHERE email IN ('lalrin.sangsiama@gmail.com', 'admin@theindianstartup.in')
  AND role = 'user';

-- Update RLS policies to use the role column properly

-- Drop existing admin policies that reference hardcoded emails
DROP POLICY IF EXISTS "Admin access to all users" ON "User";
DROP POLICY IF EXISTS "Admins can view all purchases" ON "Purchase";
DROP POLICY IF EXISTS "Admins can update purchases" ON "Purchase";
DROP POLICY IF EXISTS "Admins can view all audit logs" ON "AuditLog";

-- Create new role-based admin policies for User table
CREATE POLICY "admin_read_all_users" ON "User"
  FOR SELECT
  TO authenticated
  USING (
    auth.uid()::text = id
    OR EXISTS (
      SELECT 1 FROM "User" u
      WHERE u.id = auth.uid()::text
      AND u.role = 'admin'
    )
  );

CREATE POLICY "admin_update_all_users" ON "User"
  FOR UPDATE
  TO authenticated
  USING (
    auth.uid()::text = id
    OR EXISTS (
      SELECT 1 FROM "User" u
      WHERE u.id = auth.uid()::text
      AND u.role = 'admin'
    )
  );

-- Create role-based admin policies for Purchase table
CREATE POLICY "admin_read_all_purchases" ON "Purchase"
  FOR SELECT
  TO authenticated
  USING (
    "userId" = auth.uid()::text
    OR EXISTS (
      SELECT 1 FROM "User" u
      WHERE u.id = auth.uid()::text
      AND u.role = 'admin'
    )
  );

CREATE POLICY "admin_update_all_purchases" ON "Purchase"
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "User" u
      WHERE u.id = auth.uid()::text
      AND u.role = 'admin'
    )
  );

-- Create role-based admin policies for AuditLog table
CREATE POLICY "admin_read_audit_logs" ON "AuditLog"
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM "User" u
      WHERE u.id = auth.uid()::text
      AND u.role = 'admin'
    )
  );

-- Allow service role to insert audit logs (for server-side logging)
CREATE POLICY "service_insert_audit_logs" ON "AuditLog"
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Also allow authenticated users to insert their own audit logs
CREATE POLICY "user_insert_own_audit_logs" ON "AuditLog"
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid()::text OR user_id IS NULL);

-- Add comment explaining the role system
COMMENT ON COLUMN "User"."role" IS 'User role for access control: user, admin, support, moderator';
