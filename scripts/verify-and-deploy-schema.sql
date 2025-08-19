-- Complete Database Schema Verification and Deployment Script
-- The Indian Startup Platform - Production Ready Schema
-- Run this in Supabase SQL Editor

-- 1. First, verify current database state
DO $$ 
BEGIN 
    RAISE NOTICE 'Starting database verification and migration...';
END $$;

-- Check if we need to create the modular product system
DO $$ 
DECLARE
    table_exists boolean;
BEGIN
    -- Check if Product table exists with new schema
    SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'Product'
    ) INTO table_exists;
    
    IF NOT table_exists THEN
        RAISE NOTICE 'Product table does not exist. Will create modular product system.';
    ELSE
        RAISE NOTICE 'Product table exists. Checking schema...';
    END IF;
END $$;

-- 2. Create enum types
CREATE TYPE IF NOT EXISTS "UserRole" AS ENUM ('USER', 'ADMIN');
CREATE TYPE IF NOT EXISTS "PurchaseStatus" AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 3. User table with enhanced fields
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "startupName" TEXT,
    "startupIdea" TEXT,
    "targetMarket" TEXT,
    
    -- Progress tracking
    "currentDay" INTEGER NOT NULL DEFAULT 1,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    
    -- Gamification
    "totalXP" INTEGER NOT NULL DEFAULT 0,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,
    "badges" TEXT[],
    
    -- Timestamps
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Create unique index on email if not exists
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

-- 4. Product system
CREATE TABLE IF NOT EXISTS "Product" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isBundle" BOOLEAN NOT NULL DEFAULT false,
    "bundleProducts" TEXT[],
    "estimatedDays" INTEGER,
    "modules" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Product_code_key" ON "Product"("code");

-- 5. Module system
CREATE TABLE IF NOT EXISTS "Module" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- 6. Lesson system
CREATE TABLE IF NOT EXISTS "Lesson" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "briefContent" TEXT,
    "actionItems" JSONB,
    "resources" JSONB,
    "estimatedTime" INTEGER NOT NULL DEFAULT 45,
    "xpReward" INTEGER NOT NULL DEFAULT 50,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- 7. Coupon system
CREATE TABLE IF NOT EXISTS "Coupon" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "discountType" TEXT NOT NULL DEFAULT 'percentage',
    "discountValue" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "usageLimit" INTEGER,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "validFrom" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validUntil" TIMESTAMP(3),
    "applicableProducts" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Coupon_code_key" ON "Coupon"("code");

-- 8. Purchase system with new schema
CREATE TABLE IF NOT EXISTS "Purchase" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    
    -- Payment details
    "amount" INTEGER NOT NULL,
    "originalAmount" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    
    -- Coupon usage
    "couponId" TEXT,
    "discountAmount" INTEGER,
    
    -- Access control
    "status" "PurchaseStatus" NOT NULL DEFAULT 'pending',
    "purchasedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    
    -- Progress tracking
    "progressPercentage" INTEGER NOT NULL DEFAULT 0,
    "completedLessons" INTEGER NOT NULL DEFAULT 0,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "lastAccessedAt" TIMESTAMP(3),
    
    -- Timestamps
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- 9. Progress tracking tables
CREATE TABLE IF NOT EXISTS "LessonProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "tasksCompleted" JSONB,
    "proofUploads" TEXT[],
    "reflection" TEXT,
    "xpEarned" INTEGER NOT NULL DEFAULT 0,
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LessonProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "LessonProgress_userId_lessonId_key" ON "LessonProgress"("userId", "lessonId");

CREATE TABLE IF NOT EXISTS "ModuleProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "purchaseId" TEXT NOT NULL,
    
    "completedLessons" INTEGER NOT NULL DEFAULT 0,
    "totalLessons" INTEGER NOT NULL DEFAULT 0,
    "progressPercentage" INTEGER NOT NULL DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ModuleProgress_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ModuleProgress_userId_moduleId_key" ON "ModuleProgress"("userId", "moduleId");

-- 10. XP Events table
CREATE TABLE IF NOT EXISTS "XPEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "XPEvent_pkey" PRIMARY KEY ("id")
);

-- 11. Portfolio system
CREATE TABLE IF NOT EXISTS "StartupPortfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    
    -- Basic Info
    "startupName" TEXT NOT NULL,
    "startupIdea" TEXT,
    "tagline" TEXT,
    "founderName" TEXT,
    "targetMarket" TEXT,
    
    -- Business Model
    "businessModel" JSONB,
    "revenueStreams" JSONB,
    "keyPartners" TEXT[],
    "keyActivities" TEXT[],
    
    -- Market & Competition
    "marketResearch" JSONB,
    "competitorAnalysis" JSONB,
    "targetCustomers" JSONB,
    
    -- Product & Technology
    "productDescription" TEXT,
    "technologyStack" TEXT[],
    "developmentStage" TEXT,
    "features" JSONB,
    
    -- Financials
    "financialProjections" JSONB,
    "fundingRequirement" INTEGER,
    "currentFunding" INTEGER,
    
    -- Legal & Compliance
    "legalStructure" TEXT,
    "intellectualProperty" JSONB,
    "regulatoryCompliance" JSONB,
    
    -- Marketing & Sales
    "marketingStrategy" JSONB,
    "salesStrategy" JSONB,
    "brandAssets" JSONB,
    
    -- Operations
    "operationalPlan" JSONB,
    "teamStructure" JSONB,
    "milestones" JSONB,
    
    -- Meta
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "completionPercentage" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StartupPortfolio_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "StartupPortfolio_userId_key" ON "StartupPortfolio"("userId");

-- 12. Portfolio Activity system (from previous work)
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

CREATE TABLE IF NOT EXISTS "PortfolioActivity" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    
    -- Activity metadata
    "activityTypeId" TEXT NOT NULL,
    "activityVersion" INTEGER NOT NULL DEFAULT 1,
    
    -- Source tracking
    "sourceLesson" TEXT,
    "sourceCourse" TEXT,
    "sourceModule" TEXT,
    
    -- Activity data
    "data" JSONB NOT NULL,
    "dataVersion" INTEGER NOT NULL DEFAULT 1,
    "isLatest" BOOLEAN NOT NULL DEFAULT true,
    
    -- Status
    "status" TEXT NOT NULL DEFAULT 'draft',
    
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioActivity_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "PortfolioSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "icon" TEXT,
    "fields" JSONB NOT NULL,
    "requiredActivities" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PortfolioSection_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioSection_name_key" ON "PortfolioSection"("name");

-- 13. Add all foreign key constraints
DO $$
BEGIN
    -- Module constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Module_productId_fkey') THEN
        ALTER TABLE "Module" ADD CONSTRAINT "Module_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- Lesson constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Lesson_moduleId_fkey') THEN
        ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- Purchase constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Purchase_userId_fkey') THEN
        ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Purchase_productId_fkey') THEN
        ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'Purchase_couponId_fkey') THEN
        ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
    
    -- Progress constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LessonProgress_userId_fkey') THEN
        ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LessonProgress_lessonId_fkey') THEN
        ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'LessonProgress_purchaseId_fkey') THEN
        ALTER TABLE "LessonProgress" ADD CONSTRAINT "LessonProgress_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- Module progress constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ModuleProgress_userId_fkey') THEN
        ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ModuleProgress_moduleId_fkey') THEN
        ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'ModuleProgress_purchaseId_fkey') THEN
        ALTER TABLE "ModuleProgress" ADD CONSTRAINT "ModuleProgress_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- XP Events
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'XPEvent_userId_fkey') THEN
        ALTER TABLE "XPEvent" ADD CONSTRAINT "XPEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- Portfolio constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'StartupPortfolio_userId_fkey') THEN
        ALTER TABLE "StartupPortfolio" ADD CONSTRAINT "StartupPortfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    -- Portfolio activity constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PortfolioActivity_userId_fkey') THEN
        ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PortfolioActivity_portfolioId_fkey') THEN
        ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "StartupPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PortfolioActivity_activityTypeId_fkey') THEN
        ALTER TABLE "PortfolioActivity" ADD CONSTRAINT "PortfolioActivity_activityTypeId_fkey" FOREIGN KEY ("activityTypeId") REFERENCES "ActivityType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;

END $$;

-- 14. Create indexes for performance
CREATE INDEX IF NOT EXISTS "Purchase_userId_status_idx" ON "Purchase"("userId", "status");
CREATE INDEX IF NOT EXISTS "Purchase_expiresAt_idx" ON "Purchase"("expiresAt");
CREATE INDEX IF NOT EXISTS "LessonProgress_userId_completed_idx" ON "LessonProgress"("userId", "completed");
CREATE INDEX IF NOT EXISTS "PortfolioActivity_userId_activityTypeId_idx" ON "PortfolioActivity"("userId", "activityTypeId");
CREATE INDEX IF NOT EXISTS "PortfolioActivity_sourceLesson_idx" ON "PortfolioActivity"("sourceLesson");
CREATE INDEX IF NOT EXISTS "PortfolioActivity_sourceCourse_idx" ON "PortfolioActivity"("sourceCourse");

-- 15. Set up Row Level Security (RLS)
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Purchase" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LessonProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ModuleProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "XPEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "StartupPortfolio" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PortfolioActivity" ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (users can only access their own data)
DROP POLICY IF EXISTS "Users can view own data" ON "User";
CREATE POLICY "Users can view own data" ON "User" FOR SELECT USING (auth.uid()::text = id);

DROP POLICY IF EXISTS "Users can update own data" ON "User";
CREATE POLICY "Users can update own data" ON "User" FOR UPDATE USING (auth.uid()::text = id);

DROP POLICY IF EXISTS "Users can view own purchases" ON "Purchase";
CREATE POLICY "Users can view own purchases" ON "Purchase" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can view own progress" ON "LessonProgress";
CREATE POLICY "Users can view own progress" ON "LessonProgress" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can manage own progress" ON "LessonProgress";
CREATE POLICY "Users can manage own progress" ON "LessonProgress" FOR ALL USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can view own module progress" ON "ModuleProgress";
CREATE POLICY "Users can view own module progress" ON "ModuleProgress" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can manage own module progress" ON "ModuleProgress";
CREATE POLICY "Users can manage own module progress" ON "ModuleProgress" FOR ALL USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can view own portfolio" ON "StartupPortfolio";
CREATE POLICY "Users can view own portfolio" ON "StartupPortfolio" FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can manage own portfolio" ON "StartupPortfolio";
CREATE POLICY "Users can manage own portfolio" ON "StartupPortfolio" FOR ALL USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can manage own portfolio activities" ON "PortfolioActivity";
CREATE POLICY "Users can manage own portfolio activities" ON "PortfolioActivity" FOR ALL USING (auth.uid()::text = "userId");

-- Products, Modules, Lessons are public (read-only)
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ActivityType" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PortfolioSection" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view products" ON "Product";
CREATE POLICY "Anyone can view products" ON "Product" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view modules" ON "Module";
CREATE POLICY "Anyone can view modules" ON "Module" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view lessons" ON "Lesson";
CREATE POLICY "Anyone can view lessons" ON "Lesson" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view activity types" ON "ActivityType";
CREATE POLICY "Anyone can view activity types" ON "ActivityType" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Anyone can view portfolio sections" ON "PortfolioSection";
CREATE POLICY "Anyone can view portfolio sections" ON "PortfolioSection" FOR SELECT USING (true);

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Database schema verification and deployment completed successfully!';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run the product seeding script to populate products';
    RAISE NOTICE '2. Run the portfolio seeding script to set up activity types';
    RAISE NOTICE '3. Test the application thoroughly';
END $$;