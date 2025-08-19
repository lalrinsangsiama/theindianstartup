-- Product Seeding Script for The Indian Startup Platform
-- Run this AFTER the main schema deployment

DO $$ 
BEGIN 
    RAISE NOTICE 'Starting product seeding...';
END $$;

-- 1. Clear existing products (for re-seeding)
DELETE FROM "LessonProgress" WHERE "purchaseId" IN (SELECT "id" FROM "Purchase");
DELETE FROM "ModuleProgress" WHERE "purchaseId" IN (SELECT "id" FROM "Purchase");
DELETE FROM "Purchase";
DELETE FROM "Lesson";
DELETE FROM "Module";
DELETE FROM "Product";

-- Reset sequences if needed
-- (Note: We use cuid() so no sequences to reset)

-- 2. Insert all products
INSERT INTO "Product" ("id", "code", "title", "description", "price", "estimatedDays", "modules", "isBundle", "bundleProducts") VALUES
-- Foundation Products
('p1_launch_sprint', 'P1', '30-Day India Launch Sprint', 'Go from idea to incorporated startup with daily action plans', 4999, 30, 4, false, ARRAY[]::TEXT[]),
('p2_incorporation', 'P2', 'Incorporation & Compliance Kit - Complete', 'Master Indian business incorporation and ongoing compliance with comprehensive legal framework', 4999, 40, 10, false, ARRAY[]::TEXT[]),
('p3_funding_mastery', 'P3', 'Funding in India - Complete Mastery', 'Master the Indian funding ecosystem from government grants to venture capital', 5999, 45, 12, false, ARRAY[]::TEXT[]),
('p4_finance_stack', 'P4', 'Finance Stack - CFO-Level Mastery', 'Build world-class financial infrastructure with complete accounting systems and strategic finance', 6999, 45, 12, false, ARRAY[]::TEXT[]),

-- Growth & Protection Products
('p5_legal_stack', 'P5', 'Legal Stack - Bulletproof Legal Framework', 'Build bulletproof legal infrastructure with contracts, IP protection, and dispute prevention', 7999, 45, 12, false, ARRAY[]::TEXT[]),
('p6_sales_gtm', 'P6', 'Sales & GTM in India - Master Course', 'Transform your startup into a revenue-generating machine with India-specific sales strategies', 6999, 60, 10, false, ARRAY[]::TEXT[]),
('p7_state_schemes', 'P7', 'State-wise Scheme Map - Complete Navigation', 'Master India''s state ecosystem with comprehensive coverage of all states and UTs', 4999, 30, 10, false, ARRAY[]::TEXT[]),
('p8_data_room', 'P8', 'Investor-Ready Data Room Mastery', 'Transform your startup with professional data room that accelerates fundraising and increases valuation', 9999, 45, 8, false, ARRAY[]::TEXT[]),

-- Advanced Mastery Products
('p9_govt_schemes', 'P9', 'Government Schemes & Funding Mastery', 'Access ₹50 lakhs to ₹5 crores in government funding through systematic scheme navigation', 4999, 21, 4, false, ARRAY[]::TEXT[]),
('p10_patent_mastery', 'P10', 'Patent Mastery for Indian Startups', 'Master intellectual property from filing to monetization with comprehensive patent strategy', 7999, 60, 12, false, ARRAY[]::TEXT[]),
('p11_branding_pr', 'P11', 'Branding & Public Relations Mastery', 'Transform into a recognized industry leader through powerful brand building and strategic PR', 7999, 54, 12, false, ARRAY[]::TEXT[]),
('p12_marketing_mastery', 'P12', 'Marketing Mastery - Complete Growth Engine', 'Build a data-driven marketing machine generating predictable growth across all channels', 9999, 60, 12, false, ARRAY[]::TEXT[]),

-- All-Access Bundle
('all_access_bundle', 'ALL_ACCESS', 'All-Access Bundle - Complete Startup Ecosystem', 'Get all 12 products with 22% savings - everything you need from idea to IPO readiness', 54999, 365, 132, true, ARRAY['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12']);

-- 3. Create modules for each product

-- P1 - 30-Day Launch Sprint Modules
INSERT INTO "Module" ("id", "productId", "title", "description", "orderIndex") VALUES
('p1_m1_foundation', 'p1_launch_sprint', 'Foundation Week', 'Idea validation, market research, business model, and brand identity', 1),
('p1_m2_building', 'p1_launch_sprint', 'Building Blocks', 'Legal structure, compliance roadmap, MVP planning, and banking setup', 2),
('p1_m3_real', 'p1_launch_sprint', 'Making it Real', 'Company registration, GST/tax setup, product development, and testing', 3),
('p1_m4_launch', 'p1_launch_sprint', 'Launch Ready', 'Go-to-market strategy, pitch deck, investor readiness, and first customers', 4);

-- P2 - Incorporation & Compliance Modules (10 modules)
INSERT INTO "Module" ("id", "productId", "title", "description", "orderIndex") VALUES
('p2_m1_prep', 'p2_incorporation', 'Pre-Incorporation Preparation', 'Business structure decisions and documentation preparation', 1),
('p2_m2_registration', 'p2_incorporation', 'Company Registration Process', 'Step-by-step incorporation with MCA filing', 2),
('p2_m3_pan_tan', 'p2_incorporation', 'PAN & TAN Registration', 'Tax registration and compliance setup', 3),
('p2_m4_gst', 'p2_incorporation', 'GST Registration & Compliance', 'Complete GST ecosystem and ongoing compliance', 4),
('p2_m5_banking', 'p2_incorporation', 'Corporate Banking Setup', 'Business banking, loans, and financial infrastructure', 5),
('p2_m6_labor', 'p2_incorporation', 'Labor & Employment Compliance', 'PF, ESI, and employment law compliance', 6),
('p2_m7_licenses', 'p2_incorporation', 'Sector-Specific Licenses', 'Industry permits and regulatory approvals', 7),
('p2_m8_agreements', 'p2_incorporation', 'Legal Agreements & Contracts', 'Founder agreements, NDAs, and contract templates', 8),
('p2_m9_ongoing', 'p2_incorporation', 'Ongoing Compliance Management', 'Annual filings, board resolutions, and maintenance', 9),
('p2_m10_automation', 'p2_incorporation', 'Compliance Automation Systems', 'Tools and systems for automated compliance', 10);

-- P3 - Funding Mastery Modules (12 modules)
INSERT INTO "Module" ("id", "productId", "title", "description", "orderIndex") VALUES
('p3_m1_landscape', 'p3_funding_mastery', 'Indian Funding Landscape', 'Complete ecosystem mapping and opportunities', 1),
('p3_m2_govt_grants', 'p3_funding_mastery', 'Government Grants & Schemes', '₹20L-₹5Cr grant opportunities and applications', 2),
('p3_m3_angel', 'p3_funding_mastery', 'Angel Investment Strategy', '₹25L-₹2Cr angel funding and investor relations', 3),
('p3_m4_vc_series', 'p3_funding_mastery', 'VC & Series Funding', 'Series A-D venture capital fundraising', 4),
('p3_m5_debt', 'p3_funding_mastery', 'Debt Funding Mastery', 'MUDRA to venture debt financing options', 5),
('p3_m6_instruments', 'p3_funding_mastery', 'Advanced Funding Instruments', 'Convertible notes, SAFE, and equity structures', 6),
('p3_m7_valuation', 'p3_funding_mastery', 'Startup Valuation Methods', 'Valuation techniques and negotiation strategies', 7),
('p3_m8_pitch', 'p3_funding_mastery', 'Pitch Deck Mastery', 'Investor-winning presentations and storytelling', 8),
('p3_m9_due_diligence', 'p3_funding_mastery', 'Due Diligence Preparation', 'Document preparation and investor queries', 9),
('p3_m10_negotiation', 'p3_funding_mastery', 'Term Sheet Negotiation', 'Deal structuring and legal negotiations', 10),
('p3_m11_post_funding', 'p3_funding_mastery', 'Post-Funding Management', 'Investor relations and follow-on rounds', 11),
('p3_m12_exit', 'p3_funding_mastery', 'Exit Strategies', 'IPO, acquisition, and exit planning', 12);

-- Continue with other products (abbreviated for space - in production, all 12 products would have full modules)

-- 4. Create sample lessons for P1 (30 lessons)
DO $$
DECLARE
    lesson_day INTEGER;
    module_id TEXT;
    lesson_id TEXT;
BEGIN
    -- Generate 30 lessons for P1 across 4 modules
    FOR lesson_day IN 1..30 LOOP
        -- Determine which module this lesson belongs to
        IF lesson_day <= 7 THEN
            module_id := 'p1_m1_foundation';
        ELSIF lesson_day <= 14 THEN
            module_id := 'p1_m2_building';
        ELSIF lesson_day <= 23 THEN
            module_id := 'p1_m3_real';
        ELSE
            module_id := 'p1_m4_launch';
        END IF;
        
        lesson_id := 'p1_lesson_' || lesson_day;
        
        INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "orderIndex", "estimatedTime", "xpReward")
        VALUES (
            lesson_id,
            module_id,
            lesson_day,
            'Day ' || lesson_day || ': ' || 
            CASE 
                WHEN lesson_day = 1 THEN 'Welcome & Platform Overview'
                WHEN lesson_day = 2 THEN 'Validate Your Startup Idea'
                WHEN lesson_day = 3 THEN 'Market Research Fundamentals'
                WHEN lesson_day = 4 THEN 'Competitor Analysis Framework'
                WHEN lesson_day = 5 THEN 'Business Model Canvas'
                WHEN lesson_day = 6 THEN 'Value Proposition Design'
                WHEN lesson_day = 7 THEN 'Brand Identity & Naming'
                WHEN lesson_day = 8 THEN 'Legal Structure Selection'
                WHEN lesson_day = 9 THEN 'Founder Agreement Creation'
                WHEN lesson_day = 10 THEN 'Intellectual Property Basics'
                WHEN lesson_day = 11 THEN 'MVP Planning & Design'
                WHEN lesson_day = 12 THEN 'Technology Stack Selection'
                WHEN lesson_day = 13 THEN 'Financial Planning Basics'
                WHEN lesson_day = 14 THEN 'Banking & Finance Setup'
                WHEN lesson_day = 15 THEN 'Company Registration Process'
                WHEN lesson_day = 16 THEN 'Tax Registration (PAN/TAN/GST)'
                WHEN lesson_day = 17 THEN 'Compliance Checklist'
                WHEN lesson_day = 18 THEN 'Product Development Start'
                WHEN lesson_day = 19 THEN 'Build Your MVP'
                WHEN lesson_day = 20 THEN 'User Testing & Feedback'
                WHEN lesson_day = 21 THEN 'Iterate Based on Feedback'
                WHEN lesson_day = 22 THEN 'Prepare for Launch'
                WHEN lesson_day = 23 THEN 'Final Product Testing'
                WHEN lesson_day = 24 THEN 'Go-to-Market Strategy'
                WHEN lesson_day = 25 THEN 'Marketing Campaign Setup'
                WHEN lesson_day = 26 THEN 'Sales Process & CRM'
                WHEN lesson_day = 27 THEN 'Launch Day Execution'
                WHEN lesson_day = 28 THEN 'Customer Acquisition'
                WHEN lesson_day = 29 THEN 'Gather Initial Traction'
                WHEN lesson_day = 30 THEN 'Next Steps & Scaling'
            END,
            'Complete daily action items to build your startup step-by-step. Each lesson includes practical exercises, templates, and resources.',
            lesson_day,
            45,
            CASE WHEN lesson_day % 5 = 0 THEN 100 ELSE 50 END -- Bonus XP every 5th day
        );
    END LOOP;
END $$;

-- 5. Create some sample coupons
INSERT INTO "Coupon" ("id", "code", "description", "discountType", "discountValue", "usageLimit", "validUntil") VALUES
('welcome10', 'WELCOME10', 'Welcome discount for new users', 'percentage', 10, 1000, '2025-12-31 23:59:59'),
('student20', 'STUDENT20', 'Student discount', 'percentage', 20, 500, '2025-12-31 23:59:59'),
('earlybird15', 'EARLYBIRD15', 'Early bird special offer', 'percentage', 15, 200, '2025-06-30 23:59:59'),
('bundle25', 'BUNDLE25', 'Bundle purchase discount', 'percentage', 25, 100, '2025-12-31 23:59:59');

-- Update coupon applicability
UPDATE "Coupon" SET "applicableProducts" = ARRAY['P1','P2','P3','P4','P5','P6','P7','P8','P9','P10','P11','P12'] WHERE "code" IN ('WELCOME10', 'STUDENT20', 'EARLYBIRD15');
UPDATE "Coupon" SET "applicableProducts" = ARRAY['ALL_ACCESS'] WHERE "code" = 'BUNDLE25';

-- Success message
DO $$ 
BEGIN 
    RAISE NOTICE 'Product seeding completed successfully!';
    RAISE NOTICE 'Created:';
    RAISE NOTICE '- 13 Products (P1-P12 + ALL_ACCESS)';
    RAISE NOTICE '- 16 Modules (4 for P1, 10 for P2, 12 for P3, etc.)';
    RAISE NOTICE '- 30 Lessons for P1';
    RAISE NOTICE '- 4 Sample Coupons';
    RAISE NOTICE '';
    RAISE NOTICE 'Next: Run portfolio activity seeding script';
END $$;