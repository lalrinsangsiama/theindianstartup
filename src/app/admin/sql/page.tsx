'use client';

import { Heading, Text } from '@/components/ui';
import { logger } from '@/lib/logger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Button } from '@/components/ui';
import { Database, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function SQLCommandsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const sqlCommands = [
    {
      name: 'User Table',
      sql: `CREATE TABLE IF NOT EXISTS public."User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "currentDay" INTEGER DEFAULT 1,
  "startedAt" TIMESTAMP,
  "completedAt" TIMESTAMP,
  "totalXP" INTEGER DEFAULT 0,
  "currentStreak" INTEGER DEFAULT 0,
  "longestStreak" INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  avatar TEXT,
  bio TEXT,
  "linkedinUrl" TEXT,
  "twitterUrl" TEXT,
  "websiteUrl" TEXT
);`
    },
    {
      name: 'StartupPortfolio Table',
      sql: `CREATE TABLE IF NOT EXISTS public."StartupPortfolio" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId" TEXT UNIQUE NOT NULL,
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
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
);`
    },
    {
      name: 'XPEvent Table',
      sql: `CREATE TABLE IF NOT EXISTS public."XPEvent" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  points INTEGER NOT NULL,
  description TEXT NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_xp FOREIGN KEY ("userId") REFERENCES public."User"(id) ON DELETE CASCADE
);`
    },
    {
      name: 'P1 Premium Content Migration (DEPLOY NOW)',
      sql: `-- P1: 30-Day India Launch Sprint - Premium Content Migration (BULLETPROOF VERSION)
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

-- 7. Insert premium lessons with rich content
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", 
    resources, "estimatedTime", "xpReward", "orderIndex", metadata
)
VALUES
-- Day 1: Foundation
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

-- Day 2: Market Research
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

-- Day 3: Customer Discovery
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

-- 9. Insert premium resources
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

-- 10. Update resources with metadata
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
END $$;`
    },
    {
      name: 'P3 Funding Mastery Course - Complete Setup',
      sql: `-- P3: Funding in India - Complete Mastery Course Setup
-- First, create or update the P3 product
INSERT INTO public."Product" (id, code, title, description, price, "isBundle", "bundleProducts", "estimatedDays", "createdAt", "updatedAt")
VALUES (
  'p3_funding_mastery',
  'P3',
  'Funding in India - Complete Mastery',
  'Master the Indian funding ecosystem from government grants to venture capital with comprehensive coverage of all funding sources, stages, and strategies.',
  5999,
  false,
  '{}',
  45,
  NOW(),
  NOW()
)
ON CONFLICT (code) 
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  "estimatedDays" = EXCLUDED."estimatedDays",
  "updatedAt" = NOW();

-- Delete existing P3 modules and lessons to avoid conflicts
DELETE FROM public."Lesson" WHERE "moduleId" IN (
  SELECT id FROM public."Module" WHERE "productId" = 'p3_funding_mastery'
);
DELETE FROM public."Module" WHERE "productId" = 'p3_funding_mastery';

-- Insert P3 modules
INSERT INTO public."Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt") VALUES
('p3_m1', 'p3_funding_mastery', 'Indian Funding Landscape Mastery', 'Comprehensive understanding of India''s funding ecosystem', 1, NOW(), NOW()),
('p3_m2', 'p3_funding_mastery', 'Government Funding & Schemes', 'Master government grants, subsidies, and startup schemes', 2, NOW(), NOW()),
('p3_m3', 'p3_funding_mastery', 'Startup Incubators & Accelerators', 'Navigate incubator programs and acceleration opportunities', 3, NOW(), NOW()),
('p3_m4', 'p3_funding_mastery', 'Debt Funding Mastery', 'Complete guide to business loans and debt instruments', 4, NOW(), NOW()),
('p3_m5', 'p3_funding_mastery', 'Angel Investment Strategy', 'Attract and negotiate with angel investors effectively', 5, NOW(), NOW()),
('p3_m6', 'p3_funding_mastery', 'Venture Capital Mastery', 'Series A to D funding strategies and VC relationships', 6, NOW(), NOW()),
('p3_m7', 'p3_funding_mastery', 'Advanced Funding Instruments', 'Convertible notes, SAFE, revenue-based financing', 7, NOW(), NOW()),
('p3_m8', 'p3_funding_mastery', 'Deal Closing & Negotiations', 'Master term sheets, valuations, and closing strategies', 8, NOW(), NOW()),
('p3_m9', 'p3_funding_mastery', 'International Funding', 'Access global investors and international markets', 9, NOW(), NOW()),
('p3_m10', 'p3_funding_mastery', 'Crisis & Bridge Funding', 'Emergency funding and bridge financing strategies', 10, NOW(), NOW()),
('p3_m11', 'p3_funding_mastery', 'Exit Strategies & Returns', 'Plan successful exits and investor returns', 11, NOW(), NOW()),
('p3_m12', 'p3_funding_mastery', 'Funding Masterclass Series', 'Expert interviews and advanced strategies', 12, NOW(), NOW());

-- Insert comprehensive lesson content for all 12 modules (45 lessons total)
-- Module 1: Indian Funding Landscape (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l1', 'p3_m1', 1, 'Understanding India''s Funding Ecosystem', 'Master the complete funding landscape in India', '[
  "Map all funding sources available in India",
  "Identify 5 funding sources relevant to your startup stage",
  "Create funding stage roadmap for next 18 months"
]'::jsonb, '[
  {"title": "India Funding Ecosystem Map", "url": "/templates/p3-funding-readiness-assessment.html"},
  {"title": "Funding Stage Calculator", "url": "/templates/p3-financial-model.html"}
]'::jsonb, 60, 100, 1, NOW(), NOW()),

('p3_l2', 'p3_m1', 2, 'Funding Readiness Assessment', 'Evaluate your startup''s funding readiness', '[
  "Complete comprehensive funding readiness assessment",
  "Identify gaps in funding preparation",
  "Create improvement action plan"
]'::jsonb, '[
  {"title": "Funding Readiness Tool", "url": "/templates/p3-funding-readiness-assessment.html"},
  {"title": "Gap Analysis Template", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 45, 75, 2, NOW(), NOW()),

('p3_l3', 'p3_m1', 3, 'Building Your Funding Strategy', 'Develop comprehensive funding strategy', '[
  "Define funding goals and timeline",
  "Choose optimal funding mix",
  "Create detailed funding action plan"
]'::jsonb, '[
  {"title": "Funding Strategy Template", "url": "/templates/p3-financial-model.html"},
  {"title": "Timeline Planner", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 3, NOW(), NOW()),

('p3_l4', 'p3_m1', 4, 'Funding Documentation Preparation', 'Prepare essential funding documents', '[
  "Gather all required documentation",
  "Prepare financial statements and projections",
  "Create investor data room structure"
]'::jsonb, '[
  {"title": "Document Checklist", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Financial Model Template", "url": "/templates/p3-financial-model.html"}
]'::jsonb, 120, 200, 4, NOW(), NOW());

-- Module 2: Government Funding (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l5', 'p3_m2', 5, 'Startup India & Government Schemes', 'Master government startup initiatives', '[
  "Apply for Startup India recognition",
  "Identify eligible government schemes",
  "Prepare scheme application documents"
]'::jsonb, '[
  {"title": "Government Scheme Database", "url": "/templates/p3-government-grant-application.html"},
  {"title": "Application Templates", "url": "/templates/p3-government-grant-application.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l6', 'p3_m2', 6, 'SAMRIDH & Ministry Schemes', 'Access ministry-specific funding programs', '[
  "Apply to relevant ministry schemes",
  "Prepare sector-specific proposals",
  "Submit applications with required documentation"
]'::jsonb, '[
  {"title": "Ministry Scheme Guide", "url": "/templates/p3-government-grant-application.html"},
  {"title": "Proposal Templates", "url": "/templates/p3-government-grant-application.html"}
]'::jsonb, 120, 200, 2, NOW(), NOW()),

('p3_l7', 'p3_m2', 7, 'State Government Benefits', 'Maximize state-level funding opportunities', '[
  "Research state-specific schemes",
  "Apply for state subsidies and grants",
  "Optimize location for maximum benefits"
]'::jsonb, '[
  {"title": "State Scheme Database", "url": "/templates/p3-government-grant-application.html"},
  {"title": "Location Optimizer", "url": "/templates/p3-government-grant-application.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW()),

('p3_l8', 'p3_m2', 8, 'Grant Application Mastery', 'Perfect grant application process', '[
  "Submit 3 grant applications",
  "Follow up on application status",
  "Create grant tracking system"
]'::jsonb, '[
  {"title": "Grant Tracker", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Follow-up Templates", "url": "/templates/p3-government-grant-application.html"}
]'::jsonb, 60, 100, 4, NOW(), NOW());

-- Module 3: Incubators & Accelerators (3 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l9', 'p3_m3', 9, 'Top Indian Incubators & Selection', 'Access premium incubator programs', '[
  "Research and shortlist 10 relevant incubators",
  "Prepare incubator application package",
  "Apply to 5 target incubators"
]'::jsonb, '[
  {"title": "Incubator Database", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Application Kit", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l10', 'p3_m3', 10, 'Accelerator Programs & Demo Days', 'Master accelerator selection and demo days', '[
  "Apply to 3 accelerator programs",
  "Prepare demo day presentation",
  "Network with accelerator alumni"
]'::jsonb, '[
  {"title": "Demo Day Deck", "url": "/templates/p3-investor-pitch-deck.html"},
  {"title": "Alumni Network", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 2, NOW(), NOW()),

('p3_l11', 'p3_m3', 11, 'Corporate Incubators & Partnerships', 'Access corporate incubation programs', '[
  "Identify relevant corporate incubators",
  "Develop partnership proposals",
  "Submit corporate incubator applications"
]'::jsonb, '[
  {"title": "Corporate Directory", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Partnership Templates", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW());

-- Module 4: Debt Funding (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l12', 'p3_m4', 12, 'MUDRA & Small Business Loans', 'Access government-backed loan schemes', '[
  "Apply for MUDRA loan",
  "Prepare loan documentation",
  "Submit applications to 3 banks"
]'::jsonb, '[
  {"title": "Loan Calculator", "url": "/templates/p3-financial-model.html"},
  {"title": "Documentation Guide", "url": "/templates/p3-due-diligence-checklist.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l13', 'p3_m4', 13, 'Working Capital & Trade Finance', 'Optimize cash flow with debt instruments', '[
  "Set up working capital facilities",
  "Arrange trade finance solutions",
  "Negotiate favorable terms"
]'::jsonb, '[
  {"title": "Cash Flow Model", "url": "/templates/p3-financial-model.html"},
  {"title": "Term Comparison", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 75, 125, 2, NOW(), NOW()),

('p3_l14', 'p3_m4', 14, 'Equipment & Asset Financing', 'Finance equipment and asset purchases', '[
  "Identify financing-eligible assets",
  "Compare financing options",
  "Secure equipment financing"
]'::jsonb, '[
  {"title": "Asset Calculator", "url": "/templates/p3-financial-model.html"},
  {"title": "Financing Comparison", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 60, 100, 3, NOW(), NOW()),

('p3_l15', 'p3_m4', 15, 'Venture Debt & Growth Capital', 'Access venture debt for scaling', '[
  "Research venture debt providers",
  "Prepare venture debt proposal",
  "Negotiate venture debt terms"
]'::jsonb, '[
  {"title": "Venture Debt Guide", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "Provider Database", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 4, NOW(), NOW());

-- Module 5: Angel Investment (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l16', 'p3_m5', 16, 'Angel Investor Landscape in India', 'Map and access angel investors', '[
  "Research 50 relevant angel investors",
  "Create angel investor database",
  "Identify warm introduction paths"
]'::jsonb, '[
  {"title": "Angel Database", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Research Template", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l17', 'p3_m5', 17, 'Angel Pitch Deck & Presentation', 'Create compelling angel pitch', '[
  "Develop angel-specific pitch deck",
  "Practice pitch presentation",
  "Record pitch video"
]'::jsonb, '[
  {"title": "Angel Pitch Template", "url": "/templates/p3-investor-pitch-deck.html"},
  {"title": "Presentation Guide", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 120, 200, 2, NOW(), NOW()),

('p3_l18', 'p3_m5', 18, 'Angel Networks & Platforms', 'Access organized angel networks', '[
  "Join 3 angel investor platforms",
  "Submit applications to angel networks",
  "Prepare for angel network pitches"
]'::jsonb, '[
  {"title": "Network Directory", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Platform Guide", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW()),

('p3_l19', 'p3_m5', 19, 'Angel Investment Terms & Negotiation', 'Negotiate favorable angel terms', '[
  "Understand angel investment terms",
  "Prepare negotiation strategy",
  "Review and negotiate term sheets"
]'::jsonb, '[
  {"title": "Term Sheet Guide", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "Negotiation Toolkit", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 90, 150, 4, NOW(), NOW());

-- Module 6: Venture Capital (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l20', 'p3_m6', 20, 'VC Landscape & Fund Selection', 'Navigate the VC ecosystem strategically', '[
  "Research 30 relevant VC funds",
  "Analyze fund portfolios and thesis",
  "Create VC target list and outreach plan"
]'::jsonb, '[
  {"title": "VC Database", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Fund Analysis Tool", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 1, NOW(), NOW()),

('p3_l21', 'p3_m6', 21, 'Series A Fundraising Strategy', 'Master Series A fundraising process', '[
  "Prepare Series A documentation",
  "Develop Series A pitch strategy",
  "Initiate Series A conversations"
]'::jsonb, '[
  {"title": "Series A Kit", "url": "/templates/p3-investor-pitch-deck.html"},
  {"title": "Due Diligence Prep", "url": "/templates/p3-due-diligence-checklist.html"}
]'::jsonb, 150, 250, 2, NOW(), NOW()),

('p3_l22', 'p3_m6', 22, 'Growth Stage Funding (Series B+)', 'Scale through growth stage funding', '[
  "Prepare growth metrics and projections",
  "Develop scaling strategy presentation",
  "Connect with growth stage investors"
]'::jsonb, '[
  {"title": "Growth Metrics Dashboard", "url": "/templates/p3-financial-model.html"},
  {"title": "Scaling Presentation", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 90, 150, 3, NOW(), NOW()),

('p3_l23', 'p3_m6', 23, 'VC Due Diligence & Data Room', 'Master VC due diligence process', '[
  "Set up comprehensive data room",
  "Prepare for due diligence questions",
  "Manage due diligence process"
]'::jsonb, '[
  {"title": "Data Room Setup", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "DD Question Bank", "url": "/templates/p3-due-diligence-checklist.html"}
]'::jsonb, 120, 200, 4, NOW(), NOW());

-- Continue with remaining modules (7-12) with 3-4 lessons each...
-- Module 7: Advanced Instruments (3 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l24', 'p3_m7', 24, 'Convertible Notes & SAFE Agreements', 'Master convertible instruments', '[
  "Understand convertible note structures",
  "Prepare SAFE agreement templates",
  "Negotiate convertible terms"
]'::jsonb, '[
  {"title": "Convertible Calculator", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "SAFE Templates", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l25', 'p3_m7', 25, 'Revenue-Based Financing', 'Access alternative funding structures', '[
  "Evaluate RBF suitability",
  "Connect with RBF providers",
  "Structure RBF agreements"
]'::jsonb, '[
  {"title": "RBF Calculator", "url": "/templates/p3-financial-model.html"},
  {"title": "Provider Network", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 75, 125, 2, NOW(), NOW()),

('p3_l26', 'p3_m7', 26, 'Crowd Funding & Token Sales', 'Explore crowd funding options', '[
  "Research crowdfunding platforms",
  "Prepare crowdfunding campaign",
  "Launch pilot campaign"
]'::jsonb, '[
  {"title": "Campaign Planner", "url": "/templates/p3-investor-pitch-deck.html"},
  {"title": "Platform Guide", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 60, 100, 3, NOW(), NOW());

-- Module 8: Deal Closing (4 lessons)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
('p3_l27', 'p3_m8', 27, 'Valuation & Term Sheet Negotiation', 'Master valuation and term negotiations', '[
  "Calculate startup valuation using multiple methods",
  "Prepare term sheet negotiation strategy",
  "Practice negotiation scenarios"
]'::jsonb, '[
  {"title": "Valuation Calculator", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "Negotiation Simulator", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 120, 200, 1, NOW(), NOW()),

('p3_l28', 'p3_m8', 28, 'Legal Documentation & Compliance', 'Handle legal aspects of funding', '[
  "Review legal documentation",
  "Ensure regulatory compliance",
  "Prepare closing documents"
]'::jsonb, '[
  {"title": "Legal Checklist", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Compliance Guide", "url": "/templates/p3-due-diligence-checklist.html"}
]'::jsonb, 90, 150, 2, NOW(), NOW()),

('p3_l29', 'p3_m8', 29, 'Closing Process & Post-Investment', 'Complete the funding process', '[
  "Execute closing procedures",
  "Set up post-investment reporting",
  "Establish investor relations"
]'::jsonb, '[
  {"title": "Closing Checklist", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Investor Relations", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW()),

('p3_l30', 'p3_m8', 30, 'Managing Multiple Funding Sources', 'Coordinate complex funding rounds', '[
  "Manage multi-investor rounds",
  "Coordinate funding timelines",
  "Optimize funding mix"
]'::jsonb, '[
  {"title": "Round Manager", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Timeline Coordinator", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 4, NOW(), NOW());

-- Modules 9-12 with remaining lessons (15 more lessons to complete 45 total)
INSERT INTO public."Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
-- Module 9: International Funding (4 lessons)
('p3_l31', 'p3_m9', 31, 'Global VC Access Strategy', 'Access international venture capital', '[
  "Research global VC funds",
  "Prepare international pitch materials",
  "Initiate global investor outreach"
]'::jsonb, '[
  {"title": "Global VC Database", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "International Pitch Deck", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l32', 'p3_m9', 32, 'Cross-Border Regulations', 'Navigate international funding regulations', '[
  "Understand FEMA regulations",
  "Prepare cross-border documentation",
  "Ensure regulatory compliance"
]'::jsonb, '[
  {"title": "FEMA Guide", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Compliance Tracker", "url": "/templates/p3-due-diligence-checklist.html"}
]'::jsonb, 75, 125, 2, NOW(), NOW()),

('p3_l33', 'p3_m9', 33, 'US & Singapore Funding', 'Access US and Singapore markets', '[
  "Research US/Singapore investors",
  "Prepare market entry strategy",
  "Submit funding applications"
]'::jsonb, '[
  {"title": "Market Entry Guide", "url": "/templates/p3-investor-pitch-deck.html"},
  {"title": "Investor Database", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 3, NOW(), NOW()),

('p3_l34', 'p3_m9', 34, 'Global Grant Programs', 'Access international grant opportunities', '[
  "Identify global grant programs",
  "Apply to international grants",
  "Manage global applications"
]'::jsonb, '[
  {"title": "Global Grants Database", "url": "/templates/p3-government-grant-application.html"},
  {"title": "Application Tracker", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 60, 100, 4, NOW(), NOW()),

-- Module 10: Crisis & Bridge Funding (3 lessons)
('p3_l35', 'p3_m10', 35, 'Emergency Funding Strategies', 'Secure funding during crisis', '[
  "Assess emergency funding needs",
  "Identify crisis funding sources",
  "Implement emergency funding plan"
]'::jsonb, '[
  {"title": "Crisis Assessment Tool", "url": "/templates/p3-financial-model.html"},
  {"title": "Emergency Contacts", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l36', 'p3_m10', 36, 'Bridge Financing & Extensions', 'Manage bridge funding rounds', '[
  "Structure bridge financing",
  "Negotiate bridge terms",
  "Secure bridge funding"
]'::jsonb, '[
  {"title": "Bridge Calculator", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "Extension Templates", "url": "/templates/p3-term-sheet-negotiation.html"}
]'::jsonb, 75, 125, 2, NOW(), NOW()),

('p3_l37', 'p3_m10', 37, 'Turnaround & Recovery Funding', 'Access recovery funding options', '[
  "Develop turnaround plan",
  "Identify recovery investors",
  "Secure turnaround funding"
]'::jsonb, '[
  {"title": "Turnaround Planner", "url": "/templates/p3-financial-model.html"},
  {"title": "Recovery Investors", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 3, NOW(), NOW()),

-- Module 11: Exit Strategies (4 lessons)
('p3_l38', 'p3_m11', 38, 'Exit Planning & Strategy', 'Plan successful exit strategies', '[
  "Develop exit strategy roadmap",
  "Prepare exit planning documents",
  "Align stakeholders on exit goals"
]'::jsonb, '[
  {"title": "Exit Planner", "url": "/templates/p3-financial-model.html"},
  {"title": "Stakeholder Alignment", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l39', 'p3_m11', 39, 'IPO Preparation & Process', 'Prepare for public offerings', '[
  "Assess IPO readiness",
  "Prepare IPO documentation",
  "Engage IPO advisors"
]'::jsonb, '[
  {"title": "IPO Readiness Tool", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Advisor Network", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 120, 200, 2, NOW(), NOW()),

('p3_l40', 'p3_m11', 40, 'M&A & Strategic Exits', 'Execute merger and acquisition exits', '[
  "Identify strategic buyers",
  "Prepare M&A materials",
  "Negotiate acquisition terms"
]'::jsonb, '[
  {"title": "M&A Preparation Kit", "url": "/templates/p3-due-diligence-checklist.html"},
  {"title": "Buyer Database", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW()),

('p3_l41', 'p3_m11', 41, 'Secondary Sales & Liquidity', 'Manage secondary market transactions', '[
  "Explore secondary sale options",
  "Prepare for secondary transactions",
  "Execute partial liquidity events"
]'::jsonb, '[
  {"title": "Secondary Market Guide", "url": "/templates/p3-term-sheet-negotiation.html"},
  {"title": "Liquidity Planner", "url": "/templates/p3-financial-model.html"}
]'::jsonb, 60, 100, 4, NOW(), NOW()),

-- Module 12: Masterclass Series (4 lessons)
('p3_l42', 'p3_m12', 42, 'Investor Relations Mastery', 'Build strong investor relationships', '[
  "Develop investor communication strategy",
  "Create investor update templates",
  "Implement regular investor engagement"
]'::jsonb, '[
  {"title": "IR Strategy Guide", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Update Templates", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 90, 150, 1, NOW(), NOW()),

('p3_l43', 'p3_m12', 43, 'Advanced Financial Modeling', 'Master complex financial modeling', '[
  "Build advanced financial models",
  "Create scenario analysis tools",
  "Develop investor-grade projections"
]'::jsonb, '[
  {"title": "Advanced Models", "url": "/templates/p3-financial-model.html"},
  {"title": "Scenario Tools", "url": "/templates/p3-financial-model.html"}
]'::jsonb, 120, 200, 2, NOW(), NOW()),

('p3_l44', 'p3_m12', 44, 'Funding Success Stories & Case Studies', 'Learn from successful funding stories', '[
  "Analyze successful funding cases",
  "Extract key success factors",
  "Apply lessons to your strategy"
]'::jsonb, '[
  {"title": "Case Study Database", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Success Framework", "url": "/templates/p3-investor-pitch-deck.html"}
]'::jsonb, 75, 125, 3, NOW(), NOW()),

('p3_l45', 'p3_m12', 45, 'Building Your Funding Legacy', 'Create sustainable funding ecosystem', '[
  "Develop long-term funding strategy",
  "Build funding ecosystem network",
  "Create mentorship pipeline"
]'::jsonb, '[
  {"title": "Legacy Planner", "url": "/templates/p3-investor-crm-tracker.html"},
  {"title": "Network Builder", "url": "/templates/p3-investor-crm-tracker.html"}
]'::jsonb, 60, 100, 4, NOW(), NOW());

-- Add portfolio activity types for P3 funding activities
INSERT INTO public."PortfolioActivityType" (id, name, description, category, "outputFields", "validationRules", "displayOrder", "isActive", "createdAt", "updatedAt")
VALUES 
('funding_strategy_plan', 'Funding Strategy Development', 'Develop comprehensive funding strategy and roadmap', 'Financial Planning', 
'[{"name": "fundingGoals", "type": "text", "required": true}, {"name": "timeline", "type": "text", "required": true}, {"name": "targetAmount", "type": "number", "required": true}, {"name": "fundingSources", "type": "array", "required": true}, {"name": "milestones", "type": "array", "required": false}]'::jsonb,
'[{"field": "targetAmount", "min": 100000, "message": "Minimum funding target should be ₹1L"}]'::jsonb,
25, true, NOW(), NOW()),

('investor_pipeline', 'Investor Pipeline Management', 'Track and manage investor relationships and pipeline', 'Financial Planning',
'[{"name": "investors", "type": "array", "required": true}, {"name": "stages", "type": "object", "required": true}, {"name": "totalPipeline", "type": "number", "required": false}, {"name": "conversionRate", "type": "number", "required": false}]'::jsonb,
'[{"field": "investors", "minLength": 1, "message": "At least one investor must be tracked"}]'::jsonb,
26, true, NOW(), NOW()),

('funding_documents', 'Funding Documentation', 'Prepare and organize funding-related documents', 'Legal Compliance',
'[{"name": "pitchDeck", "type": "file", "required": true}, {"name": "financialModel", "type": "file", "required": true}, {"name": "businessPlan", "type": "file", "required": false}, {"name": "legalDocs", "type": "array", "required": false}]'::jsonb,
'[{"field": "pitchDeck", "required": true, "message": "Pitch deck is required for funding"}, {"field": "financialModel", "required": true, "message": "Financial model is required"}]'::jsonb,
27, true, NOW(), NOW()),

('government_grants', 'Government Grant Applications', 'Track government grant applications and status', 'Government Relations',
'[{"name": "schemes", "type": "array", "required": true}, {"name": "applications", "type": "array", "required": true}, {"name": "approvedAmount", "type": "number", "required": false}, {"name": "status", "type": "text", "required": true}]'::jsonb,
'[{"field": "schemes", "minLength": 1, "message": "At least one scheme must be applied to"}]'::jsonb,
28, true, NOW(), NOW())

ON CONFLICT (id) DO UPDATE SET
name = EXCLUDED.name,
description = EXCLUDED.description,
category = EXCLUDED.category,
"outputFields" = EXCLUDED."outputFields",
"validationRules" = EXCLUDED."validationRules",
"displayOrder" = EXCLUDED."displayOrder",
"updatedAt" = NOW();`
    }
  ];

  const copyToClipboard = async (sql: string, name: string) => {
    try {
      await navigator.clipboard.writeText(sql);
      setCopied(name);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      logger.error('Failed to copy: ', err);
    }
  };

  const copyAllCommands = async () => {
    const allSQL = sqlCommands.map(cmd => `-- ${cmd.name}\n${cmd.sql}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(allSQL);
      setCopied('all');
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      logger.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Heading as="h1" className="mb-2 flex items-center gap-2">
            <Database className="w-8 h-8" />
            SQL Commands for Database Setup
          </Heading>
          <Text color="muted">
            Copy and execute these SQL commands in Supabase SQL Editor to create the required tables.
          </Text>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Go to your <a href="https://supabase.com/dashboard/projects" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">Supabase Dashboard <ExternalLink className="w-3 h-3" /></a></li>
              <li>Select your project: <strong>enotnyhykuwnfiyzfoko</strong></li>
              <li>Click on <strong>"SQL Editor"</strong> in the left sidebar</li>
              <li>Create a new query</li>
              <li>Copy and paste the SQL commands below (you can copy all at once)</li>
              <li>Click <strong>"Run"</strong> to execute the commands</li>
              <li>Verify that the tables were created successfully</li>
            </ol>
            
            <div className="mt-4 flex gap-3">
              <Button
                onClick={copyAllCommands}
                className="flex items-center gap-2"
                variant={copied === 'all' ? 'primary' : 'outline'}
              >
                <Copy className="w-4 h-4" />
                {copied === 'all' ? 'Copied All!' : 'Copy All Commands'}
              </Button>
              
              <a href="https://supabase.com/dashboard/projects" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Open Supabase Dashboard
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {sqlCommands.map((command, index) => (
          <Card key={index} className="mb-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{command.name}</span>
                <Button
                  onClick={() => copyToClipboard(command.sql, command.name)}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-3 h-3" />
                  {copied === command.name ? 'Copied!' : 'Copy'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {command.sql}
              </pre>
            </CardContent>
          </Card>
        ))}

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <Text className="text-green-700">
              <strong>After running these commands:</strong> The onboarding flow will work properly, 
              users will be able to complete onboarding and access the dashboard without redirect loops.
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}