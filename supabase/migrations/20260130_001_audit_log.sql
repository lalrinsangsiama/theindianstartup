-- Create AuditLog table for security and compliance
CREATE TABLE IF NOT EXISTS "AuditLog" (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    user_id UUID REFERENCES "User"(id) ON DELETE SET NULL,
    target_user_id UUID REFERENCES "User"(id) ON DELETE SET NULL,
    resource_type VARCHAR(50),
    resource_id VARCHAR(255),
    action VARCHAR(255) NOT NULL,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_audit_log_event_type ON "AuditLog"(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_log_user_id ON "AuditLog"(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_target_user_id ON "AuditLog"(target_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_log_created_at ON "AuditLog"(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_log_ip_address ON "AuditLog"(ip_address);
CREATE INDEX IF NOT EXISTS idx_audit_log_resource ON "AuditLog"(resource_type, resource_id);

-- Composite index for common admin queries
CREATE INDEX IF NOT EXISTS idx_audit_log_admin_queries ON "AuditLog"(event_type, created_at DESC);

-- Enable RLS
ALTER TABLE "AuditLog" ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can read all audit logs
-- Regular users can only see their own logs
CREATE POLICY "Users can read own audit logs" ON "AuditLog"
    FOR SELECT
    USING (
        auth.uid() = user_id
        OR auth.uid() = target_user_id
        OR EXISTS (
            SELECT 1 FROM "User" u
            WHERE u.id = auth.uid()
            AND u.email = ANY(string_to_array(current_setting('app.admin_emails', true), ','))
        )
    );

-- Policy: Only service role can insert audit logs
CREATE POLICY "Service role can insert audit logs" ON "AuditLog"
    FOR INSERT
    WITH CHECK (true);

-- Add payment_blocked fields to User table if not exists
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'paymentBlocked') THEN
        ALTER TABLE "User" ADD COLUMN "paymentBlocked" BOOLEAN DEFAULT FALSE;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'paymentBlockedReason') THEN
        ALTER TABLE "User" ADD COLUMN "paymentBlockedReason" TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'paymentBlockedAt') THEN
        ALTER TABLE "User" ADD COLUMN "paymentBlockedAt" TIMESTAMPTZ;
    END IF;
END $$;

COMMENT ON TABLE "AuditLog" IS 'Stores audit trail for security-sensitive operations';
COMMENT ON COLUMN "AuditLog".event_type IS 'Type of event: admin_action, purchase_complete, security_event, etc.';
COMMENT ON COLUMN "AuditLog".details IS 'JSON object containing event-specific details';
