-- =====================================================================================
-- CREATE RESOURCE TABLE FOR ADDITIONAL COURSE RESOURCES
-- =====================================================================================
-- This script creates the Resource table that's defined in the Prisma schema
-- Run this BEFORE deploying resource content
-- =====================================================================================

-- Create Resource table matching Prisma schema
CREATE TABLE IF NOT EXISTS "Resource" (
  id              TEXT PRIMARY KEY,
  "moduleId"      TEXT,
  title           TEXT NOT NULL,
  description     TEXT,
  type            TEXT NOT NULL, -- template, guide, tool, video, etc.
  url             TEXT,
  "fileUrl"       TEXT,
  
  -- Metadata
  tags            TEXT[] DEFAULT '{}',
  "isDownloadable" BOOLEAN DEFAULT false,
  
  -- Analytics (optional columns)
  "viewCount"     INT DEFAULT 0,
  "downloadCount" INT DEFAULT 0,
  "useCount"      INT DEFAULT 0,
  rating          DECIMAL(2,1),
  "lastAccessedAt" TIMESTAMP,
  "lastDownloadedAt" TIMESTAMP,
  
  -- Timestamps
  "createdAt"     TIMESTAMP DEFAULT NOW(),
  "updatedAt"     TIMESTAMP DEFAULT NOW(),
  
  -- Foreign key constraint
  CONSTRAINT fk_module
    FOREIGN KEY("moduleId") 
    REFERENCES "Module"(id)
    ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resource_module ON "Resource" ("moduleId");
CREATE INDEX IF NOT EXISTS idx_resource_type ON "Resource" (type);
CREATE INDEX IF NOT EXISTS idx_resource_tags ON "Resource" USING GIN (tags);
CREATE INDEX IF NOT EXISTS idx_resource_downloadable ON "Resource" ("isDownloadable") WHERE "isDownloadable" = true;

-- Add trigger to update "updatedAt" timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_resource_updated_at ON "Resource";
CREATE TRIGGER update_resource_updated_at 
  BEFORE UPDATE ON "Resource" 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Verify table creation
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'Resource'
ORDER BY ordinal_position;

-- Grant appropriate permissions (adjust based on your database user)
-- GRANT ALL ON "Resource" TO your_app_user;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Resource table created successfully!';
  RAISE NOTICE 'You can now run the resource deployment scripts.';
END $$;