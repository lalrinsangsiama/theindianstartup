-- Migration: Enable RLS on ActivityTypeVersion and PortfolioSection tables
-- These are reference/configuration tables that should be readable by authenticated users
-- but only modifiable by admins/service role

-- ============================================================================
-- ActivityTypeVersion Table RLS
-- ============================================================================

-- Enable RLS
ALTER TABLE "ActivityTypeVersion" ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read activity type versions
CREATE POLICY "ActivityTypeVersion: authenticated users can read"
ON "ActivityTypeVersion"
FOR SELECT
TO authenticated
USING (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "ActivityTypeVersion: service role has full access"
ON "ActivityTypeVersion"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- PortfolioSection Table RLS
-- ============================================================================

-- Enable RLS
ALTER TABLE "PortfolioSection" ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read portfolio sections
CREATE POLICY "PortfolioSection: authenticated users can read"
ON "PortfolioSection"
FOR SELECT
TO authenticated
USING (true);

-- Allow service role full access (for admin operations)
CREATE POLICY "PortfolioSection: service role has full access"
ON "PortfolioSection"
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- ============================================================================
-- Verify RLS is enabled
-- ============================================================================
DO $$
BEGIN
    -- Check ActivityTypeVersion
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE tablename = 'ActivityTypeVersion'
        AND schemaname = 'public'
        AND rowsecurity = true
    ) THEN
        RAISE EXCEPTION 'RLS not enabled on ActivityTypeVersion';
    END IF;

    -- Check PortfolioSection
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables
        WHERE tablename = 'PortfolioSection'
        AND schemaname = 'public'
        AND rowsecurity = true
    ) THEN
        RAISE EXCEPTION 'RLS not enabled on PortfolioSection';
    END IF;

    RAISE NOTICE 'RLS successfully enabled on ActivityTypeVersion and PortfolioSection';
END $$;
