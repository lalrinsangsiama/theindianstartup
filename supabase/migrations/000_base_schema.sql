-- THE INDIAN STARTUP - Base Schema
-- Migration: 000_base_schema.sql
-- Purpose: Create all base tables required for the platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. User table
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    phone TEXT,
    bio TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "websiteUrl" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),

    -- Gamification
    "totalXP" INTEGER DEFAULT 0,
    "currentStreak" INTEGER DEFAULT 0,
    "longestStreak" INTEGER DEFAULT 0,
    badges TEXT[] DEFAULT '{}'
);

-- 2. Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT NOT NULL UNIQUE,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    "originalPrice" INTEGER,
    features JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    "estimatedTime" INTEGER,
    "estimatedDays" INTEGER,
    "xpReward" INTEGER DEFAULT 0,
    modules INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "isBundle" BOOLEAN DEFAULT false,
    "bundleProducts" TEXT[] DEFAULT '{}',
    "sortOrder" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Module table
CREATE TABLE IF NOT EXISTS "Module" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    "order" INTEGER,
    "orderIndex" INTEGER,
    title TEXT NOT NULL,
    description TEXT,
    content JSONB DEFAULT '{}'::jsonb,
    prerequisites TEXT[] DEFAULT '{}',
    "estimatedTime" INTEGER DEFAULT 0,
    "estimatedDays" INTEGER DEFAULT 1,
    "xpReward" INTEGER DEFAULT 20,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lesson table
CREATE TABLE IF NOT EXISTS "Lesson" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
    "order" INTEGER,
    "orderIndex" INTEGER,
    day INTEGER,
    title TEXT NOT NULL,
    "briefContent" TEXT,
    "actionItems" JSONB DEFAULT '[]'::jsonb,
    resources JSONB DEFAULT '{}'::jsonb,
    "estimatedTime" INTEGER DEFAULT 30,
    "xpReward" INTEGER DEFAULT 20,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Resource table
CREATE TABLE IF NOT EXISTS "Resource" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "moduleId" TEXT REFERENCES "Module"(id) ON DELETE CASCADE,
    "productCode" TEXT,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT,
    category TEXT,
    url TEXT,
    "fileUrl" TEXT,
    tags TEXT[] DEFAULT '{}',
    "isDownloadable" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Purchase table
CREATE TABLE IF NOT EXISTS "Purchase" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "productId" TEXT REFERENCES "Product"(id),
    "productCode" TEXT,
    "productName" TEXT,
    "productType" TEXT,
    amount INTEGER NOT NULL,
    "originalAmount" INTEGER,
    currency TEXT DEFAULT 'INR',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "couponId" TEXT UNIQUE,
    "discountAmount" INTEGER,
    status TEXT DEFAULT 'pending',
    "isActive" BOOLEAN DEFAULT true,
    "purchasedAt" TIMESTAMPTZ DEFAULT NOW(),
    "purchaseDate" TIMESTAMPTZ,
    "accessStartDate" TIMESTAMPTZ,
    "accessEndDate" TIMESTAMPTZ,
    "expiresAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 7. LessonProgress table
CREATE TABLE IF NOT EXISTS "LessonProgress" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
    "purchaseId" TEXT REFERENCES "Purchase"(id) ON DELETE CASCADE,
    "productCode" TEXT,
    "startedAt" TIMESTAMPTZ DEFAULT NOW(),
    completed BOOLEAN DEFAULT false,
    "completedAt" TIMESTAMPTZ,
    "tasksCompleted" JSONB DEFAULT '[]'::jsonb,
    "proofUploads" TEXT[] DEFAULT '{}',
    reflection TEXT,
    "xpEarned" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("userId", "lessonId")
);

-- 8. ModuleProgress table
CREATE TABLE IF NOT EXISTS "ModuleProgress" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
    "purchaseId" TEXT REFERENCES "Purchase"(id) ON DELETE CASCADE,
    "completedLessons" INTEGER DEFAULT 0,
    "totalLessons" INTEGER DEFAULT 0,
    "progressPercentage" INTEGER DEFAULT 0,
    "completedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("userId", "moduleId")
);

-- 9. XPEvent table
CREATE TABLE IF NOT EXISTS "XPEvent" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    points INTEGER NOT NULL,
    description TEXT,
    metadata JSONB,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 10. StartupPortfolio table
CREATE TABLE IF NOT EXISTS "StartupPortfolio" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE CASCADE,
    "startupName" TEXT,
    tagline TEXT,
    logo TEXT,
    "problemStatement" TEXT,
    solution TEXT,
    "valueProposition" TEXT,
    "targetMarket" JSONB,
    competitors JSONB,
    "marketSize" JSONB,
    "revenueStreams" JSONB,
    "pricingStrategy" JSONB,
    domain TEXT,
    "socialHandles" JSONB,
    "entityType" TEXT,
    "complianceStatus" JSONB,
    "mvpDescription" TEXT,
    features JSONB,
    "userFeedback" JSONB,
    "salesStrategy" JSONB,
    "customerPersonas" JSONB,
    projections JSONB,
    "fundingNeeds" INTEGER,
    "pitchDeck" TEXT,
    "onePageSummary" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 11. ActivityType table
CREATE TABLE IF NOT EXISTS "ActivityType" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    category TEXT,
    "portfolioSection" TEXT,
    "portfolioField" TEXT,
    "dataSchema" JSONB,
    version INTEGER DEFAULT 1,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 12. PortfolioActivity table
CREATE TABLE IF NOT EXISTS "PortfolioActivity" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "portfolioId" TEXT NOT NULL REFERENCES "StartupPortfolio"(id) ON DELETE CASCADE,
    "activityTypeId" TEXT NOT NULL REFERENCES "ActivityType"(id),
    "activityVersion" INTEGER DEFAULT 1,
    "sourceLesson" TEXT,
    "sourceCourse" TEXT,
    "sourceModule" TEXT,
    data JSONB,
    "dataVersion" INTEGER DEFAULT 1,
    "isLatest" BOOLEAN DEFAULT true,
    status TEXT DEFAULT 'draft',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Badge table
CREATE TABLE IF NOT EXISTS "Badge" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    "requirementType" TEXT,
    "requirementValue" JSONB,
    color TEXT,
    rarity TEXT DEFAULT 'common',
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Coupon table
CREATE TABLE IF NOT EXISTS "Coupon" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT NOT NULL UNIQUE,
    "userId" TEXT REFERENCES "User"(id) ON DELETE CASCADE,
    "discountPercent" INTEGER,
    description TEXT,
    "maxUses" INTEGER DEFAULT 1,
    "usedCount" INTEGER DEFAULT 0,
    "applicableProducts" TEXT[] DEFAULT '{}',
    "excludedProducts" TEXT[] DEFAULT '{"ALL_ACCESS"}',
    "validFrom" TIMESTAMPTZ DEFAULT NOW(),
    "validUntil" TIMESTAMPTZ,
    "usedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 15. Incubator table
CREATE TABLE IF NOT EXISTS "Incubator" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    state TEXT,
    city TEXT,
    "equityTake" FLOAT,
    stipend INTEGER,
    duration INTEGER,
    "sectorTags" TEXT[] DEFAULT '{}',
    "stageTags" TEXT[] DEFAULT '{}',
    benefits JSONB,
    "applicationWindow" TEXT,
    website TEXT,
    "contactEmail" TEXT,
    "acceptanceRate" FLOAT,
    "alumniCount" INTEGER,
    "avgRaised" INTEGER,
    "averageRating" FLOAT DEFAULT 0,
    "reviewCount" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 16. Scheme table
CREATE TABLE IF NOT EXISTS "Scheme" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    owner TEXT,
    state TEXT,
    "sectorTags" TEXT[] DEFAULT '{}',
    "stageTags" TEXT[] DEFAULT '{}',
    "incentiveType" TEXT,
    "maxAmount" INTEGER,
    "isRolling" BOOLEAN DEFAULT false,
    deadline TIMESTAMPTZ,
    "eligibilityCriteria" JSONB,
    "requiredDocuments" JSONB,
    "officialUrl" TEXT,
    "applicationUrl" TEXT,
    "contactInfo" JSONB,
    "successRate" FLOAT,
    "avgTimeToApproval" INTEGER,
    "isActive" BOOLEAN DEFAULT true,
    "lastVerified" TIMESTAMPTZ DEFAULT NOW(),
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 17. Investor table
CREATE TABLE IF NOT EXISTS "Investor" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    type TEXT,
    "chequeMin" INTEGER,
    "chequeMax" INTEGER,
    "stageTags" TEXT[] DEFAULT '{}',
    "sectorTags" TEXT[] DEFAULT '{}',
    "leadInvestment" BOOLEAN DEFAULT false,
    "followInvestment" BOOLEAN DEFAULT true,
    "avgTimeToDecision" INTEGER,
    website TEXT,
    "linkedinUrl" TEXT,
    "contactEmail" TEXT,
    "focusStates" TEXT[] DEFAULT '{}',
    "globalInvestment" BOOLEAN DEFAULT false,
    "isActive" BOOLEAN DEFAULT true,
    "isVerified" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 18. Review table
CREATE TABLE IF NOT EXISTS "Review" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "entityType" TEXT,
    "entityId" TEXT,
    rating INTEGER,
    title TEXT,
    pros TEXT,
    cons TEXT,
    advice TEXT,
    "proofFiles" TEXT[] DEFAULT '{}',
    "isVerified" BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'pending',
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 19. FounderLog table
CREATE TABLE IF NOT EXISTS "FounderLog" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    title TEXT,
    content TEXT,
    tags TEXT[] DEFAULT '{}',
    attachments TEXT[] DEFAULT '{}',
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    "isPublished" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 20. Referral table
CREATE TABLE IF NOT EXISTS "Referral" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "referrerId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "refereeId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "rewardStatus" TEXT DEFAULT 'pending',
    "rewardAmount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("referrerId", "refereeId")
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_product_code ON "Product"(code);
CREATE INDEX IF NOT EXISTS idx_module_product ON "Module"("productId");
CREATE INDEX IF NOT EXISTS idx_lesson_module ON "Lesson"("moduleId");
CREATE INDEX IF NOT EXISTS idx_lesson_day ON "Lesson"(day);
CREATE INDEX IF NOT EXISTS idx_purchase_user ON "Purchase"("userId");
CREATE INDEX IF NOT EXISTS idx_purchase_product ON "Purchase"("productCode");
CREATE INDEX IF NOT EXISTS idx_purchase_status ON "Purchase"(status);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON "LessonProgress"("userId");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON "LessonProgress"("lessonId");
CREATE INDEX IF NOT EXISTS idx_resource_product ON "Resource"("productCode");
CREATE INDEX IF NOT EXISTS idx_xp_event_user ON "XPEvent"("userId");

-- Create function to increment user XP
CREATE OR REPLACE FUNCTION increment_user_xp(user_id TEXT, xp_amount INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE "User"
    SET "totalXP" = COALESCE("totalXP", 0) + xp_amount
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Insert base products catalog
INSERT INTO "Product" (code, title, description, price, "isBundle", "bundleProducts", "estimatedDays", modules)
VALUES
    ('P1', '30-Day India Launch Sprint', 'Go from idea to incorporated startup with daily action plans and India-specific guidance.', 4999, false, '{}', 30, 4),
    ('P2', 'Incorporation & Compliance Kit - Complete', 'Master Indian business incorporation and compliance with comprehensive modules and templates.', 4999, false, '{}', 40, 10),
    ('P3', 'Funding in India - Complete Mastery', 'Master the Indian funding ecosystem from government grants to venture capital.', 5999, false, '{}', 45, 12),
    ('P4', 'Finance Stack - CFO-Level Mastery', 'Build world-class financial infrastructure with complete accounting systems.', 6999, false, '{}', 45, 12),
    ('P5', 'Legal Stack - Bulletproof Legal Framework', 'Build bulletproof legal infrastructure with contracts, IP protection, and more.', 7999, false, '{}', 45, 12),
    ('P6', 'Sales & GTM in India - Master Course', 'Transform into a revenue-generating machine with India-specific sales strategies.', 6999, false, '{}', 60, 10),
    ('P7', 'State-wise Scheme Map - Complete Navigation', 'Master all 28 states and 8 UTs with comprehensive scheme coverage.', 4999, false, '{}', 30, 10),
    ('P8', 'Investor-Ready Data Room Mastery', 'Build professional data rooms that accelerate fundraising.', 9999, false, '{}', 45, 8),
    ('P9', 'Government Schemes & Funding Mastery', 'Access government funding through systematic scheme navigation.', 4999, false, '{}', 21, 4),
    ('P10', 'Patent Mastery for Indian Startups', 'Master intellectual property from filing to monetization.', 7999, false, '{}', 60, 12),
    ('P11', 'Branding & Public Relations Mastery', 'Transform into a recognized industry leader through brand building and PR.', 7999, false, '{}', 54, 12),
    ('P12', 'Marketing Mastery - Complete Growth Engine', 'Build a data-driven marketing machine generating predictable growth.', 9999, false, '{}', 60, 12),
    ('ALL_ACCESS', 'All-Access Bundle - Complete Startup Mastery', 'Get lifetime access to all products - complete startup mastery from idea to scale.', 64999, true, '{"P1","P2","P3","P4","P5","P6","P7","P8","P9","P10","P11","P12","P13","P14","P15"}', 365, 0)
ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "isBundle" = EXCLUDED."isBundle",
    "bundleProducts" = EXCLUDED."bundleProducts",
    "estimatedDays" = EXCLUDED."estimatedDays",
    modules = EXCLUDED.modules,
    "updatedAt" = NOW();

RAISE NOTICE 'Base schema created successfully!';
