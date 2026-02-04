-- Migration: Modular Products Schema
-- Description: Adds support for multiple products (P1-P8) with individual access control
-- Date: 2025-01-18

-- 1. Create Products table
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL UNIQUE, -- P1, P2, P3, etc.
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL, -- Price in rupees
    "isBundle" BOOLEAN DEFAULT false,
    "bundleProducts" TEXT[], -- Array of product codes included in bundle
    features JSONB DEFAULT '[]'::jsonb,
    outcomes JSONB DEFAULT '[]'::jsonb,
    "estimatedDays" INTEGER,
    modules INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Modules table
CREATE TABLE IF NOT EXISTS "Module" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "productId" TEXT NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    "orderIndex" INTEGER NOT NULL,
    "estimatedDays" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Lessons table
CREATE TABLE IF NOT EXISTS "Lesson" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    title TEXT NOT NULL,
    "briefContent" TEXT,
    "actionItems" JSONB DEFAULT '[]'::jsonb,
    resources JSONB DEFAULT '[]'::jsonb,
    "estimatedTime" INTEGER DEFAULT 45, -- in minutes
    "xpReward" INTEGER DEFAULT 50,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Update Purchase table to support multiple products
ALTER TABLE "Purchase" 
ADD COLUMN IF NOT EXISTS "productCode" TEXT,
ADD COLUMN IF NOT EXISTS "expiresAt" TIMESTAMPTZ;

-- Migrate existing purchases to new structure
UPDATE "Purchase" 
SET 
    "productCode" = 'P1',
    "productName" = '30-Day India Launch Sprint',
    "expiresAt" = "accessEndDate"
WHERE "productType" = '30_day_guide' AND "productCode" IS NULL;

-- 5. Create LessonProgress table for tracking progress per lesson
CREATE TABLE IF NOT EXISTS "LessonProgress" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "lessonId" TEXT NOT NULL REFERENCES "Lesson"(id) ON DELETE CASCADE,
    "purchaseId" TEXT NOT NULL REFERENCES "Purchase"(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    "completedAt" TIMESTAMPTZ,
    "tasksCompleted" JSONB DEFAULT '[]'::jsonb,
    "proofUploads" TEXT[], -- Array of file URLs
    reflection TEXT,
    "xpEarned" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("userId", "lessonId")
);

-- 6. Create ModuleProgress table for tracking module completion
CREATE TABLE IF NOT EXISTS "ModuleProgress" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
    "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
    "purchaseId" TEXT NOT NULL REFERENCES "Purchase"(id) ON DELETE CASCADE,
    "completedLessons" INTEGER DEFAULT 0,
    "totalLessons" INTEGER DEFAULT 0,
    "progressPercentage" INTEGER DEFAULT 0,
    "completedAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ DEFAULT NOW(),
    "updatedAt" TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE("userId", "moduleId")
);

-- 7. Insert initial product catalog
INSERT INTO "Product" (code, title, description, price, "isBundle", "bundleProducts", "estimatedDays", modules) VALUES
('P1', '30-Day India Launch Sprint', 'Go from idea to incorporated startup with daily action plans and India-specific guidance.', 999, false, '{}', 30, 4),
('P2', 'Incorporation & Compliance Kit', 'Complete legal setup guide with templates, forms, and step-by-step compliance roadmap.', 2999, false, '{}', 7, 3),
('P3', 'Funding in India', 'Navigate grants, loans, and equity funding with eligibility checkers and application templates.', 3999, false, '{}', 14, 4),
('P4', 'Finance Stack', 'CFO-level financial management with accounting setup, GST compliance, and financial modeling.', 2999, false, '{}', 7, 3),
('P5', 'Legal Stack', 'Comprehensive legal templates and IP protection with founder agreements and contracts.', 4999, false, '{}', 7, 4),
('P6', 'Sales & GTM in India', 'Master Indian market sales with scripts, processes, and distribution strategies.', 3999, false, '{}', 14, 5),
('P7', 'State-wise Scheme Map', 'Navigate state government benefits, incentives, and location-specific opportunities.', 2999, false, '{}', 3, 2),
('P8', 'Investor-Ready Data Room', 'Professional due diligence preparation with templates and investor presentation materials.', 4999, false, '{}', 7, 3),
('ALL_ACCESS', 'All-Access Bundle', 'Get all 8 products with 1-year access plus exclusive bonuses and priority support.', 19999, true, '{P1,P2,P3,P4,P5,P6,P7,P8}', 90, 26)
ON CONFLICT (code) DO NOTHING;

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_module_product ON "Module"("productId");
CREATE INDEX IF NOT EXISTS idx_lesson_module ON "Lesson"("moduleId");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_user ON "LessonProgress"("userId");
CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson ON "LessonProgress"("lessonId");
CREATE INDEX IF NOT EXISTS idx_module_progress_user ON "ModuleProgress"("userId");
CREATE INDEX IF NOT EXISTS idx_purchase_product_code ON "Purchase"("productCode");
CREATE INDEX IF NOT EXISTS idx_purchase_expires ON "Purchase"("expiresAt");

-- 9. Create RLS policies for new tables
ALTER TABLE "Product" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Module" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Lesson" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "LessonProgress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ModuleProgress" ENABLE ROW LEVEL SECURITY;

-- Product table: Everyone can read
DROP POLICY IF EXISTS "Products are viewable by everyone" ON "Product";
CREATE POLICY "Products are viewable by everyone" ON "Product"
    FOR SELECT USING (true);

-- Module table: Everyone can read
DROP POLICY IF EXISTS "Modules are viewable by everyone" ON "Module";
CREATE POLICY "Modules are viewable by everyone" ON "Module"
    FOR SELECT USING (true);

-- Lesson table: Everyone can read basic info
DROP POLICY IF EXISTS "Lessons are viewable by everyone" ON "Lesson";
CREATE POLICY "Lessons are viewable by everyone" ON "Lesson"
    FOR SELECT USING (true);

-- LessonProgress: Users can only see and update their own progress
DROP POLICY IF EXISTS "Users can view own lesson progress" ON "LessonProgress";
CREATE POLICY "Users can view own lesson progress" ON "LessonProgress"
    FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can insert own lesson progress" ON "LessonProgress";
CREATE POLICY "Users can insert own lesson progress" ON "LessonProgress"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can update own lesson progress" ON "LessonProgress";
CREATE POLICY "Users can update own lesson progress" ON "LessonProgress"
    FOR UPDATE USING (auth.uid()::text = "userId");

-- ModuleProgress: Users can only see and update their own progress
DROP POLICY IF EXISTS "Users can view own module progress" ON "ModuleProgress";
CREATE POLICY "Users can view own module progress" ON "ModuleProgress"
    FOR SELECT USING (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can insert own module progress" ON "ModuleProgress";
CREATE POLICY "Users can insert own module progress" ON "ModuleProgress"
    FOR INSERT WITH CHECK (auth.uid()::text = "userId");

DROP POLICY IF EXISTS "Users can update own module progress" ON "ModuleProgress";
CREATE POLICY "Users can update own module progress" ON "ModuleProgress"
    FOR UPDATE USING (auth.uid()::text = "userId");

-- 10. Create function to check product access
CREATE OR REPLACE FUNCTION check_product_access(
    p_user_id TEXT,
    p_product_code TEXT
) RETURNS BOOLEAN AS $$
DECLARE
    v_has_access BOOLEAN := false;
BEGIN
    -- Check direct product purchase
    SELECT EXISTS (
        SELECT 1 FROM "Purchase"
        WHERE "userId" = p_user_id
        AND "productCode" = p_product_code
        AND status = 'completed'
        AND "isActive" = true
        AND "expiresAt" > NOW()
    ) INTO v_has_access;
    
    -- If no direct access, check for ALL_ACCESS bundle
    IF NOT v_has_access THEN
        SELECT EXISTS (
            SELECT 1 FROM "Purchase"
            WHERE "userId" = p_user_id
            AND "productCode" = 'ALL_ACCESS'
            AND status = 'completed'
            AND "isActive" = true
            AND "expiresAt" > NOW()
        ) INTO v_has_access;
    END IF;
    
    RETURN v_has_access;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create function to get user's owned products
CREATE OR REPLACE FUNCTION get_user_products(p_user_id TEXT)
RETURNS TABLE(
    code TEXT,
    title TEXT,
    description TEXT,
    price INTEGER,
    "hasAccess" BOOLEAN,
    "expiresAt" TIMESTAMPTZ,
    "purchaseId" TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.code,
        p.title,
        p.description,
        p.price,
        CASE 
            WHEN pur.id IS NOT NULL THEN true
            WHEN bundle.id IS NOT NULL THEN true
            ELSE false
        END as "hasAccess",
        COALESCE(pur."expiresAt", bundle."expiresAt") as "expiresAt",
        COALESCE(pur.id, bundle.id) as "purchaseId"
    FROM "Product" p
    LEFT JOIN "Purchase" pur ON pur."productCode" = p.code 
        AND pur."userId" = p_user_id 
        AND pur.status = 'completed' 
        AND pur."isActive" = true
        AND pur."expiresAt" > NOW()
    LEFT JOIN "Purchase" bundle ON bundle."productCode" = 'ALL_ACCESS'
        AND bundle."userId" = p_user_id
        AND bundle.status = 'completed'
        AND bundle."isActive" = true
        AND bundle."expiresAt" > NOW()
    WHERE p.code != 'ALL_ACCESS'
    ORDER BY p.code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Add trigger to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON "Product"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_updated_at BEFORE UPDATE ON "Module"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_updated_at BEFORE UPDATE ON "Lesson"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lesson_progress_updated_at BEFORE UPDATE ON "LessonProgress"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_module_progress_updated_at BEFORE UPDATE ON "ModuleProgress"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();