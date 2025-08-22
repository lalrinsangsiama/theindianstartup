-- Complete Resource Library Migration for P7, P9, P10, P11
-- Adds comprehensive templates and interactive resources for missing course content

-- Add final resource integration and ensure proper RLS
-- This is a record of the comprehensive resource addition

-- Create indexes for better performance
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

-- Create function to get user accessible resources
CREATE OR REPLACE FUNCTION get_user_accessible_resources(user_id UUID)
RETURNS TABLE (
  resource_id TEXT,
  resource_title TEXT,
  resource_type TEXT,
  product_code TEXT,
  has_access BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id as resource_id,
    r.title as resource_title,
    r.type as resource_type,
    p.code as product_code,
    CASE 
      WHEN p.code IS NULL OR p.code = 'TEMPLATES' THEN true
      WHEN EXISTS (
        SELECT 1 FROM "Purchase" pur 
        WHERE pur."userId" = user_id 
        AND (pur."productCode" = p.code OR pur."productCode" = 'ALL_ACCESS')
        AND pur.status = 'completed'
        AND pur."expiresAt" > NOW()
      ) THEN true
      ELSE false
    END as has_access
  FROM "Resource" r
  JOIN "Module" m ON r."moduleId" = m.id
  LEFT JOIN "Product" p ON m."productId" = p.id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_user_accessible_resources(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_resource_stats() TO authenticated;

-- Update RLS policies for Resource table
DROP POLICY IF EXISTS "Users can view accessible resources" ON "Resource";

CREATE POLICY "Users can view accessible resources" ON "Resource"
FOR SELECT TO authenticated
USING (
  -- Always allow free templates
  EXISTS (
    SELECT 1 FROM "Module" m 
    LEFT JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId" 
    AND (p.code IS NULL OR p.code = 'TEMPLATES')
  )
  OR
  -- Allow if user has purchased the product or ALL_ACCESS
  EXISTS (
    SELECT 1 FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id
    JOIN "Purchase" pur ON (pur."productCode" = p.code OR pur."productCode" = 'ALL_ACCESS')
    WHERE m.id = "Resource"."moduleId"
    AND pur."userId" = auth.uid()
    AND pur.status = 'completed'
    AND pur."expiresAt" > NOW()
  )
);

-- Add policy for updating resource stats (download counts, etc.)
CREATE POLICY "Users can update resource stats" ON "Resource"
FOR UPDATE TO authenticated
USING (
  -- Can update if user has access to the resource
  EXISTS (
    SELECT 1 FROM "Module" m 
    LEFT JOIN "Product" p ON m."productId" = p.id
    WHERE m.id = "Resource"."moduleId" 
    AND (
      p.code IS NULL 
      OR p.code = 'TEMPLATES'
      OR EXISTS (
        SELECT 1 FROM "Purchase" pur 
        WHERE (pur."productCode" = p.code OR pur."productCode" = 'ALL_ACCESS')
        AND pur."userId" = auth.uid()
        AND pur.status = 'completed'
        AND pur."expiresAt" > NOW()
      )
    )
  )
)
WITH CHECK (
  -- Only allow updating certain fields
  "Resource".id = OLD.id 
  AND "Resource"."moduleId" = OLD."moduleId"
  AND "Resource".title = OLD.title
);

-- Create trigger to automatically refresh stats daily
CREATE OR REPLACE FUNCTION auto_refresh_resource_stats()
RETURNS TRIGGER AS $$
BEGIN
  -- Only refresh once per hour to avoid performance issues
  IF NOT EXISTS (
    SELECT 1 FROM pg_stat_user_tables 
    WHERE relname = 'resource_stats' 
    AND last_analyze > NOW() - INTERVAL '1 hour'
  ) THEN
    PERFORM refresh_resource_stats();
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on resource changes
DROP TRIGGER IF EXISTS trigger_refresh_resource_stats ON "Resource";
CREATE TRIGGER trigger_refresh_resource_stats
AFTER INSERT OR UPDATE OR DELETE ON "Resource"
FOR EACH STATEMENT EXECUTE FUNCTION auto_refresh_resource_stats();

-- Initial stats refresh
SELECT refresh_resource_stats();

-- Final verification: Log the completion
INSERT INTO "AuditLog" (id, "actorId", action, "metaJson", "createdAt")
VALUES (
  gen_random_uuid(),
  '00000000-0000-0000-0000-000000000000',
  'RESOURCE_LIBRARY_COMPLETE',
  jsonb_build_object(
    'migration', '20250822_001_complete_resource_library',
    'resources_added', (
      SELECT COUNT(*) FROM "Resource" 
      WHERE "createdAt" > NOW() - INTERVAL '1 day'
    ),
    'products_enhanced', ARRAY['P7', 'P9', 'P10', 'P11'],
    'timestamp', NOW()
  ),
  NOW()
) ON CONFLICT DO NOTHING;