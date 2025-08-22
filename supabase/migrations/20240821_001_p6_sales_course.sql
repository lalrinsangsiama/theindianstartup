-- P6: Sales & GTM in India - Master Course
-- Database Migration Script (Matching Actual Table Structure)
-- Version: 3.0.0
-- Date: 2025-01-20

BEGIN;

-- First check if P6 product already exists and update or insert
INSERT INTO "Product" (
    id,
    code,
    title,
    description,
    price,
    "isBundle",
    "bundleProducts",
    features,
    outcomes,
    "estimatedDays",
    modules,
    "createdAt",
    "updatedAt"
) VALUES (
    'p6_sales_gtm',
    'P6',
    'Sales & GTM in India - Master Course',
    'Transform your startup into a revenue-generating machine with India-specific sales strategies, proven frameworks, and 75+ ready-to-use templates.',
    6999, -- Price in rupees
    false, -- Not a bundle
    '{}', -- Empty array for bundle products
    '[
        "60-day intensive program with daily action plans",
        "10 comprehensive modules covering Indian market dynamics",
        "75+ sales templates, scripts, and frameworks",
        "12 expert masterclasses with sales leaders",
        "India-specific strategies for all market tiers",
        "Complete sales tech stack guidance",
        "Industry-specific playbooks (SaaS, FinTech, etc.)",
        "Lifetime access to updates and community"
    ]'::jsonb,
    '[
        "Build a scalable sales engine from scratch",
        "Master Indian buyer psychology and cultural nuances",
        "Achieve 250%+ revenue growth within 6 months",
        "Reduce sales cycle by 40% on average",
        "Improve conversion rates by 150%+",
        "Create predictable revenue streams",
        "Build and manage high-performing sales teams",
        "Excel in both enterprise and SME markets"
    ]'::jsonb,
    60, -- 60 days
    10, -- 10 modules
    NOW(),
    NOW()
) ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    features = EXCLUDED.features,
    outcomes = EXCLUDED.outcomes,
    "estimatedDays" = EXCLUDED."estimatedDays",
    modules = EXCLUDED.modules,
    "updatedAt" = NOW();

-- Get the product ID for P6
DO $$
DECLARE
    v_product_id TEXT;
    v_module_id TEXT;
    v_day_counter INT := 0;
BEGIN
    -- Get P6 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P6';
    
    -- Delete existing modules and lessons for P6 if they exist (for clean slate)
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Indian Market Fundamentals (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m1',
        v_product_id,
        'Module 1: Indian Market Fundamentals',
        'Master the cultural nuances, regional dynamics, and psychological drivers of Indian buyers to build authentic relationships and close more deals.',
        1,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Module 1 Lessons
    v_day_counter := 1;
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES 
    ('p6_m1_l1', v_module_id, v_day_counter, 'Decoding Indian Buyer Psychology',
    'Master the cultural DNA of Indian sales including trust-building in relationship-driven markets, the jugaad mentality, price-value dynamics, and family/committee decision-making.',
    '[
        {"id": "1", "task": "Complete Indian Buyer Psychology Assessment", "completed": false},
        {"id": "2", "task": "Map stakeholders for your top 3 prospects", "completed": false},
        {"id": "3", "task": "Create 30-day trust-building plan", "completed": false},
        {"id": "4", "task": "Identify regional preferences for target markets", "completed": false}
    ]'::jsonb,
    '[
        {"title": "Indian Buyer Psychology Assessment Tool", "type": "assessment", "url": "/resources/p6/buyer-assessment"},
        {"title": "Trust Building Playbook", "type": "guide", "url": "/resources/p6/trust-playbook"},
        {"title": "Stakeholder Mapping Template", "type": "template", "url": "/resources/p6/stakeholder-map"},
        {"title": "Regional Sales Strategy Guide", "type": "guide", "url": "/resources/p6/regional-guide"}
    ]'::jsonb,
    90, 100, 1, NOW(), NOW());

    v_day_counter := 2;
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES 
    ('p6_m1_l2', v_module_id, v_day_counter, 'India''s Unique Market Structure',
    'Navigate Tier 1, 2, and 3 markets with specific strategies for metros, SMEs, enterprises, and government sectors.',
    '[
        {"id": "1", "task": "Analyze your market by tiers", "completed": false},
        {"id": "2", "task": "Create tier-specific value propositions", "completed": false},
        {"id": "3", "task": "Map competition by market segment", "completed": false},
        {"id": "4", "task": "Design pricing for different tiers", "completed": false}
    ]'::jsonb,
    '[
        {"title": "Market Segmentation Framework", "type": "framework", "url": "/resources/p6/market-segments"},
        {"title": "City-wise Sales Approach Guide", "type": "guide", "url": "/resources/p6/city-guide"},
        {"title": "Government Sales Playbook", "type": "playbook", "url": "/resources/p6/gov-sales"},
        {"title": "SME vs Enterprise Comparison", "type": "comparison", "url": "/resources/p6/sme-enterprise"}
    ]'::jsonb,
    75, 100, 2, NOW(), NOW());

    v_day_counter := 3;
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES 
    ('p6_m1_l3', v_module_id, v_day_counter, 'Regional Market Strategies',
    'Customize your approach for North, South, West, and East India with language localization and cultural adaptation.',
    '[
        {"id": "1", "task": "Create regional sales playbooks", "completed": false},
        {"id": "2", "task": "Design language-specific collateral", "completed": false},
        {"id": "3", "task": "Adjust pricing by region", "completed": false},
        {"id": "4", "task": "Build local partnerships", "completed": false}
    ]'::jsonb,
    '[
        {"title": "Regional Sales Playbooks", "type": "playbook", "url": "/resources/p6/regional-playbooks"},
        {"title": "Language Localization Guide", "type": "guide", "url": "/resources/p6/language-guide"},
        {"title": "Regional Pricing Calculator", "type": "calculator", "url": "/resources/p6/regional-pricing"},
        {"title": "Competition Mapping Template", "type": "template", "url": "/resources/p6/competition-map"}
    ]'::jsonb,
    60, 100, 3, NOW(), NOW());

    v_day_counter := 4;
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES 
    ('p6_m1_l4', v_module_id, v_day_counter, 'Industry-Specific Indian Nuances',
    'Master vertical sales for B2B SaaS, FinTech, HealthTech, EdTech, Manufacturing, and traditional industries.',
    '[
        {"id": "1", "task": "Select your primary industry vertical", "completed": false},
        {"id": "2", "task": "Create industry-specific pitch deck", "completed": false},
        {"id": "3", "task": "Identify compliance requirements", "completed": false},
        {"id": "4", "task": "Build industry reference list", "completed": false}
    ]'::jsonb,
    '[
        {"title": "Industry Vertical Playbooks", "type": "playbook", "url": "/resources/p6/industry-playbooks"},
        {"title": "Compliance Checklists", "type": "checklist", "url": "/resources/p6/compliance-checks"},
        {"title": "Sector-specific Pitch Decks", "type": "template", "url": "/resources/p6/pitch-decks"},
        {"title": "Industry Benchmark Reports", "type": "report", "url": "/resources/p6/benchmarks"}
    ]'::jsonb,
    90, 100, 4, NOW(), NOW());

    v_day_counter := 5;
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES 
    ('p6_m1_l5', v_module_id, v_day_counter, 'Regulatory & Compliance in Sales',
    'Navigate GST, interstate commerce, digital payments, and data localization requirements in sales.',
    '[
        {"id": "1", "task": "Review GST implications on pricing", "completed": false},
        {"id": "2", "task": "Ensure contract compliance", "completed": false},
        {"id": "3", "task": "Set up data protection measures", "completed": false},
        {"id": "4", "task": "Create compliance checklist", "completed": false}
    ]'::jsonb,
    '[
        {"title": "Sales Compliance Checklist", "type": "checklist", "url": "/resources/p6/sales-compliance"},
        {"title": "GST Calculator for Sales", "type": "calculator", "url": "/resources/p6/gst-calculator"},
        {"title": "Contract Templates Library", "type": "template", "url": "/resources/p6/contracts"},
        {"title": "Data Protection Guidelines", "type": "guide", "url": "/resources/p6/data-protection"}
    ]'::jsonb,
    60, 100, 5, NOW(), NOW());

    -- Module 2: Building Your Sales Foundation (Days 6-10)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m2',
        v_product_id,
        'Module 2: Building Your Sales Foundation',
        'Design your sales strategy, process, team structure, and technology stack to create a scalable revenue engine.',
        2,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 5 lessons for Module 2
    FOR i IN 6..10 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 6 THEN 'Sales Strategy Architecture'
                WHEN 7 THEN 'Sales Process Design'
                WHEN 8 THEN 'Sales Team Structure'
                WHEN 9 THEN 'Sales Tech Stack for India'
                WHEN 10 THEN 'Revenue Operations Setup'
            END,
            CASE v_day_counter
                WHEN 6 THEN 'Calculate TAM/SAM/SOM, develop ICPs, create buyer personas, and design value propositions.'
                WHEN 7 THEN 'Build your sales cycle blueprint with stages, qualification frameworks, and closing techniques.'
                WHEN 8 THEN 'Design optimal team structure, define roles, create compensation plans, and establish metrics.'
                WHEN 9 THEN 'Select CRM, integrate WhatsApp Business, set up automation, and configure analytics.'
                WHEN 10 THEN 'Align sales and marketing, define SLAs, establish forecasting, and build predictable revenue.'
            END,
            '[]'::jsonb, -- Action items would be added here
            '[]'::jsonb, -- Resources would be added here
            CASE v_day_counter
                WHEN 6 THEN 90
                WHEN 7 THEN 75
                WHEN 8 THEN 60
                WHEN 9 THEN 75
                WHEN 10 THEN 90
            END,
            100,
            v_day_counter - 5, -- orderIndex for module 2
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 3: Lead Generation Mastery (Days 11-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m3',
        v_product_id,
        'Module 3: Lead Generation Mastery',
        'Master multi-channel lead generation strategies tailored for the Indian market.',
        3,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 5 lessons for Module 3
    FOR i IN 11..15 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 11 THEN 'Digital Lead Generation'
                WHEN 12 THEN 'Traditional Lead Channels'
                WHEN 13 THEN 'Cold Outreach That Works'
                WHEN 14 THEN 'Partnership & Channel Development'
                WHEN 15 THEN 'Account-Based Marketing (ABM)'
            END,
            CASE v_day_counter
                WHEN 11 THEN 'Master LinkedIn, WhatsApp Business, Google Ads, and content marketing for India.'
                WHEN 12 THEN 'Leverage trade shows, industry associations, print media, and referral programs.'
                WHEN 13 THEN 'Write compelling cold emails, master cold calling, and create multi-channel sequences.'
                WHEN 14 THEN 'Build distribution networks, reseller programs, and strategic partnerships.'
                WHEN 15 THEN 'Target and engage high-value accounts with personalized campaigns.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            CASE v_day_counter
                WHEN 11 THEN 90
                WHEN 12 THEN 60
                WHEN 13 THEN 75
                WHEN 14 THEN 90
                WHEN 15 THEN 75
            END,
            100,
            v_day_counter - 10, -- orderIndex for module 3
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 4: Sales Execution Excellence (Days 16-22)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m4',
        v_product_id,
        'Module 4: Sales Execution Excellence',
        'Master the art of sales conversations from first meetings to closing deals with India-specific tactics.',
        4,
        7,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 7 lessons for Module 4
    FOR i IN 16..22 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 16 THEN 'First Meeting Mastery'
                WHEN 17 THEN 'Solution Selling & Demos'
                WHEN 18 THEN 'Negotiation in Indian Context'
                WHEN 19 THEN 'Enterprise Sales Playbook'
                WHEN 20 THEN 'SME/MSME Sales Tactics'
                WHEN 21 THEN 'Government Sales Mastery'
                WHEN 22 THEN 'Startup Selling to Enterprises'
            END,
            CASE v_day_counter
                WHEN 16 THEN 'Master Indian business etiquette, build instant rapport, and handle multiple stakeholders.'
                WHEN 17 THEN 'Master consultative selling, deliver compelling demos, and calculate ROI effectively.'
                WHEN 18 THEN 'Win-win negotiation strategies for Indian markets with cultural sensitivity.'
                WHEN 19 THEN 'Navigate long sales cycles, map stakeholders, and win large enterprise deals.'
                WHEN 20 THEN 'Fast-track SME sales with quick decision frameworks and value demonstration.'
                WHEN 21 THEN 'Navigate GeM portal, master tender processes, and build government relationships.'
                WHEN 22 THEN 'Build credibility as a startup, mitigate risk perception, and win against incumbents.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            CASE v_day_counter
                WHEN 16 THEN 90
                WHEN 17 THEN 75
                WHEN 18 THEN 90
                WHEN 19 THEN 90
                WHEN 20 THEN 60
                WHEN 21 THEN 75
                WHEN 22 THEN 60
            END,
            100,
            v_day_counter - 15, -- orderIndex for module 4
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 5: Pricing & Monetization (Days 23-27)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m5',
        v_product_id,
        'Module 5: Pricing & Monetization',
        'Master pricing strategies, payment terms, and revenue models optimized for the Indian market.',
        5,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 5 lessons for Module 5
    FOR i IN 23..27 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 23 THEN 'Pricing Strategy for India'
                WHEN 24 THEN 'Payment Terms & Collections'
                WHEN 25 THEN 'Discounting & Promotions'
                WHEN 26 THEN 'Revenue Model Innovation'
                WHEN 27 THEN 'International Pricing'
            END,
            CASE v_day_counter
                WHEN 23 THEN 'Design psychological pricing points, compare models, and create pricing tiers.'
                WHEN 24 THEN 'Understand Indian payment culture, negotiate terms, and manage collections.'
                WHEN 25 THEN 'Smart discounting strategies with festival seasons and volume incentives.'
                WHEN 26 THEN 'Explore hybrid revenue models, value-based pricing, and expansion revenue.'
                WHEN 27 THEN 'Set USD vs INR pricing, manage forex risks, and ensure global consistency.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            75,
            100,
            v_day_counter - 22, -- orderIndex for module 5
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 6: Sales Team Management (Days 28-33)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m6',
        v_product_id,
        'Module 6: Sales Team Management',
        'Build, train, and manage high-performing sales teams with proven strategies.',
        6,
        6,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 6 lessons for Module 6
    FOR i IN 28..33 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 28 THEN 'Hiring Sales Talent'
                WHEN 29 THEN 'Sales Training & Enablement'
                WHEN 30 THEN 'Performance Management'
                WHEN 31 THEN 'Sales Culture & Motivation'
                WHEN 32 THEN 'Sales Compensation Design'
                WHEN 33 THEN 'Remote Sales Management'
            END,
            CASE v_day_counter
                WHEN 28 THEN 'Build your A-team with structured hiring processes and competency assessments.'
                WHEN 29 THEN 'Comprehensive onboarding, continuous learning, and certification programs.'
                WHEN 30 THEN 'Set KPIs, conduct reviews, implement coaching, and manage performance.'
                WHEN 31 THEN 'Create high-performance culture with recognition and motivation systems.'
                WHEN 32 THEN 'Design compensation structures, commission plans, and incentive programs.'
                WHEN 33 THEN 'Manage distributed teams with virtual leadership and remote performance tracking.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            75,
            100,
            v_day_counter - 27, -- orderIndex for module 6
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 7: Customer Success & Retention (Days 34-38)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m7',
        v_product_id,
        'Module 7: Customer Success & Retention',
        'Maximize customer lifetime value through onboarding, account management, and retention strategies.',
        7,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 5 lessons for Module 7
    FOR i IN 34..38 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 34 THEN 'Customer Onboarding Excellence'
                WHEN 35 THEN 'Account Management'
                WHEN 36 THEN 'Customer Support Systems'
                WHEN 37 THEN 'NPS & Feedback Loops'
                WHEN 38 THEN 'Expansion Revenue'
            END,
            CASE v_day_counter
                WHEN 34 THEN 'Design onboarding frameworks to accelerate time to value and prevent churn.'
                WHEN 35 THEN 'Strategic account planning, QBRs, upselling, and relationship deepening.'
                WHEN 36 THEN 'Build world-class support with tiers, Indian language options, and escalation.'
                WHEN 37 THEN 'Implement NPS programs, collect feedback, and close the loop effectively.'
                WHEN 38 THEN 'Land and expand strategies for upselling, cross-selling, and maximizing LTV.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            75,
            100,
            v_day_counter - 33, -- orderIndex for module 7
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 8: Channel & Partnership Sales (Days 39-43)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m8',
        v_product_id,
        'Module 8: Channel & Partnership Sales',
        'Build and manage profitable channel partnerships, distribution networks, and strategic alliances.',
        8,
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 5 lessons for Module 8
    FOR i IN 39..43 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 39 THEN 'Channel Strategy Development'
                WHEN 40 THEN 'Partner Enablement'
                WHEN 41 THEN 'Distribution Network Management'
                WHEN 42 THEN 'Strategic Alliances'
                WHEN 43 THEN 'Marketplace Strategies'
            END,
            CASE v_day_counter
                WHEN 39 THEN 'Design channel strategy, select partners, define economics, manage conflicts.'
                WHEN 40 THEN 'Create enablement programs, partner portals, certification, and sales support.'
                WHEN 41 THEN 'Structure distribution tiers, manage inventory, track performance.'
                WHEN 42 THEN 'Build strategic partnerships with joint GTM plans and success metrics.'
                WHEN 43 THEN 'Optimize marketplace listings, drive sales, manage reviews and ratings.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            75,
            100,
            v_day_counter - 38, -- orderIndex for module 8
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 9: Sales Technology & Analytics (Days 44-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m9',
        v_product_id,
        'Module 9: Sales Technology & Analytics',
        'Leverage technology and data analytics to optimize sales performance.',
        9,
        2,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 2 lessons for Module 9
    FOR i IN 44..45 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE v_day_counter
                WHEN 44 THEN 'Sales Analytics & Reporting'
                WHEN 45 THEN 'AI & Automation in Sales'
            END,
            CASE v_day_counter
                WHEN 44 THEN 'Design dashboards, track metrics, analyze trends, make data-driven decisions.'
                WHEN 45 THEN 'Implement AI tools, automate processes, use predictive analytics for scale.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            90,
            100,
            v_day_counter - 43, -- orderIndex for module 9
            NOW(),
            NOW()
        );
    END LOOP;

    -- Module 10: Advanced Sales Strategies (Days 46-60)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        'p6_m10',
        v_product_id,
        'Module 10: Advanced Sales Strategies',
        'Master advanced techniques including international expansion, M&A, and vertical specializations.',
        10,
        15,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Add 15 lessons for Module 10 (Days 46-60)
    FOR i IN 46..60 LOOP
        v_day_counter := i;
        INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
        VALUES (
            v_module_id, 
            v_day_counter,
            CASE 
                WHEN v_day_counter = 46 THEN 'International Expansion from India'
                WHEN v_day_counter = 47 THEN 'M&A and Strategic Sales'
                WHEN v_day_counter = 48 THEN 'B2B SaaS Sales Mastery'
                WHEN v_day_counter = 49 THEN 'FinTech Sales Excellence'
                WHEN v_day_counter = 50 THEN 'HealthTech Sales Strategies'
                WHEN v_day_counter = 51 THEN 'EdTech Customer Acquisition'
                WHEN v_day_counter = 52 THEN 'Manufacturing Sector Sales'
                WHEN v_day_counter = 53 THEN 'Product-Led Growth'
                WHEN v_day_counter = 54 THEN 'Community-Led Sales'
                WHEN v_day_counter = 55 THEN 'Video Selling Mastery'
                WHEN v_day_counter = 56 THEN 'Social Selling Excellence'
                WHEN v_day_counter = 57 THEN 'Sales Leadership Development'
                WHEN v_day_counter = 58 THEN 'Founder-Led Sales'
                WHEN v_day_counter = 59 THEN 'Investor Relations'
                ELSE 'Future of Sales in India'
            END,
            CASE 
                WHEN v_day_counter = 46 THEN 'Plan international expansion to SAARC, Middle East, Southeast Asia, and Western markets.'
                WHEN v_day_counter = 47 THEN 'Prepare for M&A opportunities through strategic sales and value creation.'
                WHEN v_day_counter = 48 THEN 'Master SaaS-specific metrics, pricing models, and customer success strategies.'
                WHEN v_day_counter = 49 THEN 'Navigate FinTech regulations, build trust, and excel in financial services sales.'
                WHEN v_day_counter = 50 THEN 'Master healthcare sales with compliance, doctor engagement, and patient acquisition.'
                WHEN v_day_counter = 51 THEN 'Excel in education sales with parent engagement and institutional partnerships.'
                WHEN v_day_counter = 52 THEN 'Industrial sales mastery with long cycles, customization, and ROI focus.'
                WHEN v_day_counter = 53 THEN 'Build product-led growth engines with self-serve and viral loops.'
                WHEN v_day_counter = 54 THEN 'Leverage communities for organic growth and customer acquisition.'
                WHEN v_day_counter = 55 THEN 'Use video for prospecting, demos, proposals, and relationship building.'
                WHEN v_day_counter = 56 THEN 'Master LinkedIn, Twitter, and social platforms for B2B sales.'
                WHEN v_day_counter = 57 THEN 'Develop strategic leadership skills for sales organizations.'
                WHEN v_day_counter = 58 THEN 'Master founder-led sales from first customer to first hire.'
                WHEN v_day_counter = 59 THEN 'Excel at fundraising through investor relations and pitch mastery.'
                ELSE 'Prepare for the future of sales with emerging trends and technologies.'
            END,
            '[]'::jsonb,
            '[]'::jsonb,
            90,
            100,
            v_day_counter - 45, -- orderIndex for module 10
            NOW(),
            NOW()
        );
    END LOOP;

END $$;

-- Add P6 to the ALL_ACCESS bundle if it exists
UPDATE "Product" 
SET "bundleProducts" = array_append("bundleProducts", 'P6')
WHERE code = 'ALL_ACCESS' 
AND NOT ('P6' = ANY("bundleProducts"));

COMMIT;

-- Verification Query
SELECT 
    p.code,
    p.title,
    p.price as price_inr,
    p."estimatedDays",
    p.modules as module_count,
    COUNT(DISTINCT m.id) as actual_modules,
    COUNT(DISTINCT l.id) as total_lessons
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p.code = 'P6'
GROUP BY p.code, p.title, p.price, p."estimatedDays", p.modules;