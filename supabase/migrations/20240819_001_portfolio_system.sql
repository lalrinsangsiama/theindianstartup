-- Portfolio System Migration
-- Add Portfolio Activity tables to support flexible portfolio building

-- Create ActivityType table
CREATE TABLE IF NOT EXISTS "ActivityType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "portfolioSection" TEXT NOT NULL,
    "portfolioField" TEXT NOT NULL,
    "dataSchema" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityType_pkey" PRIMARY KEY ("id")
);

-- Create ActivityTypeVersion table
CREATE TABLE IF NOT EXISTS "ActivityTypeVersion" (
    "id" TEXT NOT NULL,
    "activityTypeId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "dataSchema" JSONB NOT NULL,
    "migrationScript" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ActivityTypeVersion_pkey" PRIMARY KEY ("id")
);

-- Create PortfolioActivity table
CREATE TABLE IF NOT EXISTS "PortfolioActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "activityTypeId" TEXT NOT NULL,
    "activityVersion" INTEGER NOT NULL DEFAULT 1,
    "sourceLesson" TEXT,
    "sourceCourse" TEXT,
    "sourceModule" TEXT,
    "data" JSONB NOT NULL,
    "dataVersion" INTEGER NOT NULL DEFAULT 1,
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioActivity_pkey" PRIMARY KEY ("id")
);

-- Create PortfolioSection table
CREATE TABLE IF NOT EXISTS "PortfolioSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "icon" TEXT,
    "fields" JSONB NOT NULL,
    "requiredActivities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioSection_pkey" PRIMARY KEY ("id")
);

-- Create unique constraints and indexes
CREATE UNIQUE INDEX IF NOT EXISTS "ActivityType_id_version_key" ON "ActivityType"("id", "version");
CREATE UNIQUE INDEX IF NOT EXISTS "ActivityTypeVersion_activityTypeId_version_key" ON "ActivityTypeVersion"("activityTypeId", "version");
CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioSection_name_key" ON "PortfolioSection"("name");

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS "PortfolioActivity_userId_activityTypeId_idx" ON "PortfolioActivity"("userId", "activityTypeId");
CREATE INDEX IF NOT EXISTS "PortfolioActivity_sourceLesson_idx" ON "PortfolioActivity"("sourceLesson");
CREATE INDEX IF NOT EXISTS "PortfolioActivity_sourceCourse_idx" ON "PortfolioActivity"("sourceCourse");

-- Add foreign key constraints (skip if already exist)
DO $$ BEGIN
    ALTER TABLE "ActivityTypeVersion" ADD CONSTRAINT "ActivityTypeVersion_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
    ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
    ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "StartupPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
DO $$ BEGIN
    ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Update functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_activity_type_updated_at ON "ActivityType";
CREATE TRIGGER update_activity_type_updated_at BEFORE UPDATE ON "ActivityType" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS update_portfolio_activity_updated_at ON "PortfolioActivity";
CREATE TRIGGER update_portfolio_activity_updated_at BEFORE UPDATE ON "PortfolioActivity" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
DROP TRIGGER IF EXISTS update_portfolio_section_updated_at ON "PortfolioSection";
CREATE TRIGGER update_portfolio_section_updated_at BEFORE UPDATE ON "PortfolioSection" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comment for documentation
COMMENT ON TABLE "ActivityType" IS 'Defines types of activities that can contribute to portfolio sections';
COMMENT ON TABLE "PortfolioActivity" IS 'Stores user activity data that populates portfolio fields';
COMMENT ON TABLE "PortfolioSection" IS 'Defines portfolio sections and their structure';
COMMENT ON TABLE "ActivityTypeVersion" IS 'Version history for activity type schemas';