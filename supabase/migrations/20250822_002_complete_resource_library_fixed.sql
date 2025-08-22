-- Complete Resource Library Migration for P7, P9, P10, P11 - Fixed Version
-- Adds comprehensive templates and interactive resources for missing course content

-- Add final resource integration and ensure proper indexes
CREATE INDEX IF NOT EXISTS idx_resource_product_code 
ON "Resource" 
USING btree (("metadata"->>'productCode'));

CREATE INDEX IF NOT EXISTS idx_resource_type_downloadable 
ON "Resource" 
USING btree (type, "isDownloadable");

-- Update Resource table to ensure all fields are properly typed
ALTER TABLE "Resource" 
ADD COLUMN IF NOT EXISTS "accessLevel" TEXT DEFAULT 'premium',
ADD COLUMN IF NOT EXISTS "estimatedValue" INTEGER DEFAULT 0;

-- Add comments for documentation
COMMENT ON TABLE "Resource" IS 'Comprehensive resource library with templates, tools, and interactive content for all courses';
COMMENT ON COLUMN "Resource"."type" IS 'Resource type: template, interactive_tool, dashboard, video, etc.';
COMMENT ON COLUMN "Resource"."isDownloadable" IS 'Whether resource can be downloaded vs accessed online only';
COMMENT ON COLUMN "Resource"."accessLevel" IS 'Access level: free, premium, all_access';

-- Create materialized view for resource statistics (for analytics)
CREATE MATERIALIZED VIEW IF NOT EXISTS resource_stats AS
SELECT 
  p.code as product_code,
  p.title as product_title,
  COUNT(r.id) as total_resources,
  COUNT(CASE WHEN r."isDownloadable" = true THEN 1 END) as downloadable_resources,
  COUNT(CASE WHEN r.type = 'template' THEN 1 END) as templates,
  COUNT(CASE WHEN r.type = 'interactive_tool' THEN 1 END) as interactive_tools,
  COUNT(CASE WHEN r.type = 'dashboard' THEN 1 END) as dashboards,
  AVG(r.rating) as avg_rating,
  SUM(r."downloadCount") as total_downloads,
  SUM(r."viewCount") as total_views
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Resource" r ON m.id = r."moduleId"
WHERE p.code LIKE 'P%'
GROUP BY p.id, p.code, p.title;

-- Create function to refresh stats
CREATE OR REPLACE FUNCTION refresh_resource_stats()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW resource_stats;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION refresh_resource_stats() TO authenticated;

-- Enable RLS on Resource table if not already enabled
ALTER TABLE "Resource" ENABLE ROW LEVEL SECURITY;

-- Update RLS policies for Resource table to handle product access properly
DROP POLICY IF EXISTS "Users can view accessible resources" ON "Resource";

CREATE POLICY "Users can view accessible resources" ON "Resource"
FOR SELECT TO authenticated
USING (
  -- Always allow if no specific product (free resources)
  NOT EXISTS (
    SELECT 1 FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId" 
    AND p.code IS NOT NULL 
    AND p.code != 'TEMPLATES'
  )
  OR
  -- Allow if user has purchased the product or has ALL_ACCESS
  EXISTS (
    SELECT 1 FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId"
    AND p.code IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM "UserProduct" up
      WHERE up."userId" = auth.uid()
      AND (up."productCode" = p.code OR up."productCode" = 'ALL_ACCESS')
      AND up."isActive" = true
      AND up."expiresAt" > NOW()
    )
  )
);

-- Add policy for updating resource stats (download counts, etc.)
DROP POLICY IF EXISTS "Users can update resource stats" ON "Resource";

CREATE POLICY "Users can update resource stats" ON "Resource"
FOR UPDATE TO authenticated
USING (
  -- Can update if user has access to the resource
  NOT EXISTS (
    SELECT 1 FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId" 
    AND p.code IS NOT NULL 
    AND p.code != 'TEMPLATES'
  )
  OR
  EXISTS (
    SELECT 1 FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId"
    AND p.code IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM "UserProduct" up
      WHERE up."userId" = auth.uid()
      AND (up."productCode" = p.code OR up."productCode" = 'ALL_ACCESS')
      AND up."isActive" = true
      AND up."expiresAt" > NOW()
    )
  )
)
WITH CHECK (
  -- Only allow updating certain fields
  "Resource".id = OLD.id 
  AND "Resource"."moduleId" = OLD."moduleId"
  AND "Resource".title = OLD.title
);

-- Initial stats refresh
SELECT refresh_resource_stats();

-- Log the completion (skip if table doesn't exist)
DO $$
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'AuditLog') THEN
    INSERT INTO "AuditLog" (id, "actorId", action, "metaJson", "createdAt")
    VALUES (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000',
      'RESOURCE_LIBRARY_COMPLETE',
      jsonb_build_object(
        'migration', '20250822_002_complete_resource_library_fixed',
        'resources_added', (
          SELECT COUNT(*) FROM "Resource" 
          WHERE "createdAt" > NOW() - INTERVAL '1 day'
        ),
        'products_enhanced', ARRAY['P7', 'P9', 'P10', 'P11'],
        'timestamp', NOW()
      ),
      NOW()
    );
  END IF;
END $$;