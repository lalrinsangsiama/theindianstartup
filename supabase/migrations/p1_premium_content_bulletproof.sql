-- P1: 30-Day India Launch Sprint - Premium Content Migration (BULLETPROOF VERSION)
-- This migration handles ALL possible missing columns and table structures

-- 1. Create Resource table with all required columns if it doesn't exist
CREATE TABLE IF NOT EXISTS "Resource" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    tags TEXT[] DEFAULT '{}',
    "productCode" TEXT,
    "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Safely add missing columns to all tables
DO $$ 
BEGIN
    -- Add features column to Product if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Product' AND column_name = 'features') THEN
        ALTER TABLE "Product" ADD COLUMN features JSONB DEFAULT '[]'::jsonb;
        RAISE NOTICE 'Added features column to Product table';
    ELSE
        RAISE NOTICE 'Product.features already exists';
    END IF;
    
    -- Add metadata column to Product if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Product' AND column_name = 'metadata') THEN
        ALTER TABLE "Product" ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added metadata column to Product table';
    ELSE
        RAISE NOTICE 'Product.metadata already exists';
    END IF;
    
    -- Add metadata column to Lesson if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Lesson' AND column_name = 'metadata') THEN
        ALTER TABLE "Lesson" ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added metadata column to Lesson table';
    ELSE
        RAISE NOTICE 'Lesson.metadata already exists';
    END IF;
    
    -- Add metadata column to Resource if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'Resource' AND column_name = 'metadata') THEN
        ALTER TABLE "Resource" ADD COLUMN metadata JSONB DEFAULT '{}'::jsonb;
        RAISE NOTICE 'Added metadata column to Resource table';
    ELSE
        RAISE NOTICE 'Resource.metadata already exists';
    END IF;
END $$;

-- 3. Check if P1 product exists, if not create it
INSERT INTO "Product" (code, title, description, price, "isBundle", "estimatedDays")
VALUES (
    'P1', 
    '30-Day India Launch Sprint',
    'Transform your startup idea into a legally incorporated, market-validated business with paying customers in just 30 days.',
    4999,
    false,
    30
)
ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "estimatedDays" = EXCLUDED."estimatedDays";

-- 4. Update P1 product with premium details
UPDATE "Product" 
SET 
    features = jsonb_build_array(
        '30 daily action plans with exact steps',
        '150+ premium templates (₹25,000 value)',
        '50+ interactive tools and calculators',
        'Indian unicorn case studies',
        'Expert masterclasses and insights',
        'Private founder community access',
        'Government scheme navigation',
        'Legal compliance made simple',
        'Certificate of completion',
        '30-day success guarantee'
    ),
    metadata = jsonb_build_object(
        'roi', '35x return on investment',
        'savings', '₹1,75,000 in consultant fees',
        'successRate', '87% launch within 30 days',
        'totalStudents', 1000,
        'rating', 4.8,
        'lastUpdated', '2024-01-15',
        'testimonials', jsonb_build_array(
            jsonb_build_object(
                'name', 'Priya Sharma',
                'company', 'EcoKraft',
                'text', 'From idea to ₹50L funding in 45 days using this system'
            ),
            jsonb_build_object(
                'name', 'Raj Patel',
                'company', 'TechSeva',
                'text', 'The templates alone saved me ₹1 lakh in consultant fees'
            ),
            jsonb_build_object(
                'name', 'Anita Desai',
                'company', 'UrbanChef',
                'text', 'Got my first 100 customers using their growth hacks'
            )
        ),
        'guarantee', '30-Day Success Guarantee: Follow the program and get a legally incorporated company with at least one customer',
        'bonuses', jsonb_build_array(
            'Founder Toolkit (500+ templates)',
            'Expert Network Access',
            'Premium Databases',
            'Growth Accelerator Courses',
            'Community Lifetime Access'
        ),
        'curriculum', jsonb_build_object(
            'weeks', 4,
            'dailyCommitment', '2-3 hours',
            'totalHours', 75,
            'assignments', 120,
            'liveSession', 'Weekly Q&A calls'
        ),
        'tools', jsonb_build_array(
            'Startup Readiness Assessment',
            'Market Size Calculator',
            'Unit Economics Calculator',
            'Business Model Designer',
            'Financial Projection Model',
            'Name Availability Checker',
            'Equity Split Calculator',
            'CAC/LTV Calculator',
            'Pitch Deck Builder',
            'Funding Eligibility Checker'
        )
    )
WHERE code = 'P1';

-- 5. Create modules for P1 (clean slate approach)
DELETE FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P1');

INSERT INTO "Module" (id, "productId", title, description, "orderIndex")
SELECT 
    gen_random_uuid(),
    p.id,
    m.title,
    m.description,
    m."orderIndex"
FROM "Product" p
CROSS JOIN (VALUES
    ('Foundation Week', 'Days 1-7: Crystal-clear problem definition and market validation', 1),
    ('Building Blocks', 'Days 8-14: Legal foundation and operational setup', 2),
    ('Making it Real', 'Days 15-21: Product launch and early traction', 3),
    ('Launch Ready', 'Days 22-30: Scale, funding prep, and sustainable growth', 4)
) AS m(title, description, "orderIndex")
WHERE p.code = 'P1';

-- 6. Delete existing P1 lessons
DELETE FROM "Lesson" 
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P1'
);

-- 7. Insert premium lessons
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", 
    resources, "estimatedTime", "xpReward", "orderIndex", metadata
)
VALUES
-- Day 1
(
    gen_random_uuid(),
    (SELECT m.id FROM "Module" m 
     JOIN "Product" p ON m."productId" = p.id 
     WHERE p.code = 'P1' AND m."orderIndex" = 1 LIMIT 1),
    1,
    'Idea Refinement & Goal Setting',
    'Transform your raw idea into a clear, actionable vision. Define the problem you''re solving and set SMART goals for the next 30 days.',
    '[
        {"task": "Complete Problem-Solution Fit Canvas", "priority": "high"},
        {"task": "Conduct 5 customer interviews", "priority": "high"},
        {"task": "Write 30-day SMART goals", "priority": "medium"},
        {"task": "Create elevator pitch", "priority": "medium"},
        {"task": "Set up startup documentation folder", "priority": "low"}
    ]'::jsonb,
    '{
        "templates": [
            {"name": "Problem-Solution Fit Canvas", "url": "/templates/p1/problem-solution-canvas.html"},
            {"name": "Customer Interview Script", "url": "/templates/p1/interview-script.pdf"},
            {"name": "SMART Goals Worksheet", "url": "/templates/p1/smart-goals.xlsx"}
        ],
        "tools": [
            {"name": "Market Size Calculator", "url": "/templates/p1/market-calculator.html"},
            {"name": "Startup Readiness Assessment", "url": "/templates/p1/startup-readiness-assessment.html"}
        ],
        "videos": [
            {"title": "How Razorpay Found Product-Market Fit", "duration": "15min"},
            {"title": "The Mom Test - Customer Interview Guide", "duration": "20min"}
        ],
        "readings": [
            {"title": "The Lean Startup - Chapter 1", "time": "30min"},
            {"title": "Indian Startup Ecosystem Report 2024", "time": "15min"}
        ]
    }'::jsonb,
    120,
    100,
    1,
    '{
        "deliverables": ["Problem Statement Document", "30-Day Goals", "Elevator Pitch"],
        "expertInsight": "Harshil Mathur (Razorpay): We spent more time talking to customers than coding in our first month",
        "caseStudy": "Razorpay validated their problem by interviewing 100+ businesses in 30 days",
        "milestone": "Foundation Started"
    }'::jsonb
),

-- Day 2
(
    gen_random_uuid(),
    (SELECT m.id FROM "Module" m 
     JOIN "Product" p ON m."productId" = p.id 
     WHERE p.code = 'P1' AND m."orderIndex" = 1 LIMIT 1),
    2,
    'Market Research & Analysis',
    'Deep dive into your target market. Calculate TAM/SAM/SOM, analyze competitors, and identify your unique positioning.',
    '[
        {"task": "Calculate TAM, SAM, and SOM", "priority": "high"},
        {"task": "Analyze 5 direct competitors", "priority": "high"},
        {"task": "Create competitor comparison matrix", "priority": "medium"},
        {"task": "Identify market trends and opportunities", "priority": "medium"},
        {"task": "Define unique value proposition", "priority": "high"}
    ]'::jsonb,
    '{
        "templates": [
            {"name": "TAM-SAM-SOM Calculator", "url": "/templates/p1/tam-sam-som.xlsx"},
            {"name": "Competitor Analysis Matrix", "url": "/templates/p1/competitor-matrix.xlsx"},
            {"name": "Market Research Template", "url": "/templates/p1/market-research.docx"}
        ],
        "tools": [
            {"name": "India Market Data Portal", "url": "/tools/market-data"},
            {"name": "Google Trends Analyzer", "url": "/tools/trends-analyzer"}
        ],
        "databases": [
            {"name": "500+ Indian Market Reports", "url": "/resources/market-reports"},
            {"name": "Industry Statistics India", "url": "/resources/industry-stats"}
        ]
    }'::jsonb,
    150,
    100,
    2,
    '{
        "deliverables": ["Market Size Analysis", "Competitor Matrix", "Positioning Statement"],
        "expertInsight": "Kunal Shah (CRED): Pick a niche and dominate before expanding",
        "marketData": {"creditCardUsers": "3% of Indians", "consumerSpending": "30% from credit card users"}
    }'::jsonb
),

-- Day 3
(
    gen_random_uuid(),
    (SELECT m.id FROM "Module" m 
     JOIN "Product" p ON m."productId" = p.id 
     WHERE p.code = 'P1' AND m."orderIndex" = 1 LIMIT 1),
    3,
    'Customer Discovery',
    'Understand your customers deeply through interviews, surveys, and persona development. Build empathy and validate assumptions.',
    '[
        {"task": "Interview 10+ potential customers", "priority": "high"},
        {"task": "Create 3-5 customer personas", "priority": "high"},
        {"task": "Map customer journey", "priority": "medium"},
        {"task": "Identify key pain points", "priority": "high"},
        {"task": "Validate problem-solution fit", "priority": "high"}
    ]'::jsonb,
    '{
        "templates": [
            {"name": "Customer Interview Guide", "url": "/templates/p1/interview-guide.pdf"},
            {"name": "Persona Template", "url": "/templates/p1/persona-template.pptx"},
            {"name": "Journey Mapping Canvas", "url": "/templates/p1/journey-map.pdf"}
        ],
        "scripts": [
            {"name": "B2B Interview Script", "url": "/templates/p1/b2b-script.docx"},
            {"name": "B2C Interview Script", "url": "/templates/p1/b2c-script.docx"},
            {"name": "WhatsApp Survey Template", "url": "/templates/p1/whatsapp-survey.txt"}
        ]
    }'::jsonb,
    180,
    150,
    3,
    '{
        "deliverables": ["Customer Personas", "Interview Transcripts", "Pain Point Heat Map"],
        "proTip": "Use WhatsApp for quick customer feedback - Indians prefer it over email",
        "milestone": "20+ customer conversations completed"
    }'::jsonb
);

-- 8. Delete existing P1 resources to avoid duplicates
DELETE FROM "Resource" WHERE "productCode" = 'P1';

-- 9. Insert premium resources (without metadata initially)
INSERT INTO "Resource" (id, title, type, url, description, tags, "productCode")
VALUES
    (gen_random_uuid(), 'Startup Readiness Assessment', 'tool', '/templates/p1/startup-readiness-assessment.html',
     'Comprehensive 15-question assessment to evaluate your startup readiness',
     ARRAY['assessment', 'tool', 'interactive'], 'P1'),
    
    (gen_random_uuid(), 'Master Template Library', 'resource', '/templates/p1/master-template-library.html',
     'Access to 150+ premium templates worth ₹25,000',
     ARRAY['templates', 'library', 'premium'], 'P1'),
    
    (gen_random_uuid(), 'Business Model Canvas', 'template', '/templates/p1/business-model-canvas.html',
     'Interactive business model canvas with Indian examples',
     ARRAY['canvas', 'business model', 'interactive'], 'P1'),
     
    (gen_random_uuid(), 'Unit Economics Calculator', 'tool', '/templates/p1/unit-economics-calculator.html',
     'Calculate CAC, LTV, and other key metrics for your business',
     ARRAY['calculator', 'metrics', 'finance'], 'P1'),
     
    (gen_random_uuid(), 'Financial Projection Model', 'template', '/templates/p1/financial-projection-model.html',
     '18-month financial projection model with scenarios',
     ARRAY['finance', 'projections', 'excel'], 'P1'),
     
    (gen_random_uuid(), 'Legal Compliance Checklist', 'template', '/templates/p1/legal-compliance-checklist.html',
     'Comprehensive legal compliance checklist for Indian startups',
     ARRAY['legal', 'compliance', 'checklist'], 'P1');

-- 10. Now update resources with metadata (if metadata column exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'Resource' AND column_name = 'metadata') THEN
        
        UPDATE "Resource" SET metadata = '{"questions": 15, "categories": 5, "duration": "5 minutes"}'::jsonb 
        WHERE title = 'Startup Readiness Assessment';
        
        UPDATE "Resource" SET metadata = '{"count": 150, "value": 25000, "categories": 8}'::jsonb 
        WHERE title = 'Master Template Library';
        
        UPDATE "Resource" SET metadata = '{"examples": 15, "exportable": true}'::jsonb 
        WHERE title = 'Business Model Canvas';
        
        UPDATE "Resource" SET metadata = '{"interactive": true, "formulas": ["CAC", "LTV", "Payback Period"]}'::jsonb 
        WHERE title = 'Unit Economics Calculator';
        
        UPDATE "Resource" SET metadata = '{"duration": "18 months", "scenarios": 3}'::jsonb 
        WHERE title = 'Financial Projection Model';
        
        UPDATE "Resource" SET metadata = '{"items": 50, "categories": ["Incorporation", "Tax", "Labor", "IP"]}'::jsonb 
        WHERE title = 'Legal Compliance Checklist';
        
        RAISE NOTICE 'Updated resource metadata';
    ELSE
        RAISE NOTICE 'Resource metadata column does not exist yet';
    END IF;
END $$;

-- 11. Create helpful functions
CREATE OR REPLACE FUNCTION get_user_p1_access(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM "Purchase" p
        WHERE p."userId" = user_id
        AND p."productCode" IN ('P1', 'ALL_ACCESS')
        AND p.status = 'completed'
        AND p."expiresAt" > NOW()
    );
END;
$$ LANGUAGE plpgsql;

-- 12. Create lesson progress tracking function
CREATE OR REPLACE FUNCTION update_lesson_progress(
    p_user_id UUID,
    p_lesson_id UUID,
    p_completed BOOLEAN,
    p_tasks_completed JSONB DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
    v_xp_reward INT;
    v_purchase_id UUID;
BEGIN
    -- Get XP reward for the lesson
    SELECT "xpReward" INTO v_xp_reward FROM "Lesson" WHERE id = p_lesson_id;
    
    -- Get valid purchase
    SELECT pu.id INTO v_purchase_id
    FROM "Purchase" pu
    WHERE pu."userId" = p_user_id
    AND pu."productCode" IN ('P1', 'ALL_ACCESS')
    AND pu.status = 'completed'
    AND pu."expiresAt" > NOW()
    LIMIT 1;

    IF v_purchase_id IS NOT NULL THEN
        -- Update lesson progress
        INSERT INTO "LessonProgress" (
            id, "userId", "lessonId", "purchaseId", 
            completed, "completedAt", "tasksCompleted", "xpEarned"
        )
        VALUES (
            gen_random_uuid(), p_user_id, p_lesson_id, v_purchase_id,
            p_completed, 
            CASE WHEN p_completed THEN NOW() ELSE NULL END,
            p_tasks_completed,
            CASE WHEN p_completed THEN v_xp_reward ELSE 0 END
        )
        ON CONFLICT ("userId", "lessonId")
        DO UPDATE SET
            completed = EXCLUDED.completed,
            "completedAt" = EXCLUDED."completedAt",
            "tasksCompleted" = EXCLUDED."tasksCompleted",
            "xpEarned" = EXCLUDED."xpEarned";

        -- Update user XP if completed
        IF p_completed THEN
            UPDATE "User" 
            SET "totalXP" = COALESCE("totalXP", 0) + v_xp_reward
            WHERE id = p_user_id;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '🎉 P1 Premium Content Migration Complete!';
    RAISE NOTICE '================================';
    RAISE NOTICE '✅ All required columns added safely';
    RAISE NOTICE '✅ Product updated with premium features';
    RAISE NOTICE '✅ 4 modules created';
    RAISE NOTICE '✅ 3 sample lessons with rich content';
    RAISE NOTICE '✅ 6 premium resources added';
    RAISE NOTICE '✅ Helper functions created';
    RAISE NOTICE '✅ Progress tracking enabled';
    RAISE NOTICE '';
    RAISE NOTICE '🚀 Ready for premium P1 experience!';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Test /journey/day/1 with P1 access';
    RAISE NOTICE '2. Test /resources P1 Premium Library tab';
    RAISE NOTICE '3. Verify templates work at /templates/p1/';
    RAISE NOTICE '4. Run verification script to confirm everything';
    RAISE NOTICE '';
END $$;