-- P7: State-wise Scheme Map - Complete Navigation (Fixed)
-- 30 days, 10 modules, comprehensive state schemes coverage
-- Uses correct PascalCase table names and camelCase columns

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
BEGIN
    -- Generate IDs
    v_product_id := gen_random_uuid()::text;
    v_mod_1_id := gen_random_uuid()::text;
    v_mod_2_id := gen_random_uuid()::text;
    v_mod_3_id := gen_random_uuid()::text;
    v_mod_4_id := gen_random_uuid()::text;
    v_mod_5_id := gen_random_uuid()::text;
    v_mod_6_id := gen_random_uuid()::text;
    v_mod_7_id := gen_random_uuid()::text;
    v_mod_8_id := gen_random_uuid()::text;
    v_mod_9_id := gen_random_uuid()::text;
    v_mod_10_id := gen_random_uuid()::text;

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P7',
        'State-wise Scheme Map - Complete Navigation',
        'Master India''s state ecosystem with comprehensive coverage of all 28 states and 8 UTs. 30 days, 10 modules covering federal structure, state schemes, sector-specific benefits, and implementation strategies.',
        4999,
        30,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW();

    -- Get the product ID (in case of conflict)
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P7';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Federal Structure & Framework (Days 1-3)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Federal Structure & Framework', 'Understand India''s federal structure and how state schemes work', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'India''s State Ecosystem Overview', 'Understand India''s federal structure with 28 states and 8 UTs. Learn how state policies impact startups and how to leverage the ecosystem.', '["Map state-wise business landscape", "Identify key states for your sector", "Understand state policy frameworks", "Research state startup policies"]'::jsonb, '{"templates": ["State Ecosystem Map", "Policy Framework Guide"], "tools": ["State Comparator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'State Startup Policies', 'Deep dive into state startup policies including incentives, subsidies, and support mechanisms.', '["Analyze top state policies", "Compare incentive structures", "Identify best fit states", "Plan application strategy"]'::jsonb, '{"templates": ["Policy Comparison Matrix", "Incentive Calculator"], "tools": ["Policy Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Location Strategy Framework', 'Develop location strategy based on state incentives, infrastructure, and ecosystem factors.', '["Evaluate location factors", "Score potential locations", "Consider operational costs", "Plan multi-state presence"]'::jsonb, '{"templates": ["Location Scoring Matrix", "Cost Comparison Tool"], "tools": ["Location Optimizer"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 2: Northern States (Days 4-6)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Northern States', 'Master schemes from Delhi, UP, Haryana, Punjab, and other northern states', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 4, 'Delhi NCR Ecosystem', 'Navigate Delhi''s startup ecosystem including Delhi Startup Policy, incubators, and funding support.', '["Analyze Delhi Startup Policy", "Identify Delhi incentives", "Connect with incubators", "Apply for relevant schemes"]'::jsonb, '{"templates": ["Delhi Scheme Guide", "Application Templates"], "tools": ["Eligibility Checker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 5, 'UP & Haryana Opportunities', 'Leverage schemes from UP (ODOP, Film City) and Haryana (Enterprises Promotion Policy).', '["Study UP startup schemes", "Analyze Haryana incentives", "Evaluate manufacturing benefits", "Plan applications"]'::jsonb, '{"templates": ["UP Scheme Matrix", "Haryana Benefits Guide"], "tools": ["Benefit Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Punjab, Rajasthan & Others', 'Access schemes from Punjab, Rajasthan, HP, J&K, and other northern states.', '["Map Punjab incentives", "Study Rajasthan schemes", "Evaluate hill state benefits", "Identify best opportunities"]'::jsonb, '{"templates": ["Northern States Guide", "Scheme Comparison"], "tools": ["State Selector"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 3: Western States (Days 7-9)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Western States', 'Access schemes from Maharashtra, Gujarat, Goa, and western states', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 7, 'Maharashtra Startup Ecosystem', 'Navigate Maharashtra''s startup policy, MIDC benefits, and Mumbai/Pune ecosystem.', '["Study Maharashtra policy", "Explore MIDC incentives", "Connect with ecosystem", "Apply for schemes"]'::jsonb, '{"templates": ["Maharashtra Guide", "MIDC Application Templates"], "tools": ["MH Benefit Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 8, 'Gujarat Manufacturing Hub', 'Leverage Gujarat''s industry-friendly policies, GIFT City benefits, and manufacturing incentives.', '["Analyze Gujarat policy", "Explore GIFT City", "Study manufacturing schemes", "Plan implementation"]'::jsonb, '{"templates": ["Gujarat Scheme Guide", "GIFT City Benefits"], "tools": ["GJ Eligibility Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 9, 'Goa & MP Opportunities', 'Access unique opportunities in Goa (IT Policy, tourism) and Madhya Pradesh.', '["Study Goa IT Policy", "Analyze MP schemes", "Evaluate lifestyle benefits", "Plan strategically"]'::jsonb, '{"templates": ["Western States Comparison", "Scheme Applications"], "tools": ["Benefits Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 4: Southern States (Days 10-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Southern States', 'Master schemes from Karnataka, Tamil Nadu, Kerala, AP, and Telangana', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 10, 'Karnataka & Bangalore Ecosystem', 'Navigate Karnataka''s tech ecosystem, ELEVATE program, and Bangalore startup infrastructure.', '["Study Karnataka policy", "Apply for ELEVATE", "Connect with KITS", "Leverage ecosystem"]'::jsonb, '{"templates": ["Karnataka Guide", "ELEVATE Application"], "tools": ["KA Benefits Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 11, 'Tamil Nadu & Telangana', 'Access TN''s manufacturing incentives and Telangana''s T-Hub, We-Hub programs.', '["Analyze TN schemes", "Study Telangana programs", "Compare incentives", "Plan applications"]'::jsonb, '{"templates": ["TN-TS Comparison", "Application Guides"], "tools": ["South India Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 12, 'Kerala & Andhra Pradesh', 'Leverage Kerala Startup Mission and AP''s industry incentives.', '["Study Kerala Mission", "Analyze AP incentives", "Evaluate opportunities", "Plan engagement"]'::jsonb, '{"templates": ["KL-AP Guide", "Scheme Templates"], "tools": ["Eligibility Checker"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 5: Eastern States (Days 13-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Eastern States', 'Access schemes from West Bengal, Odisha, Bihar, and Jharkhand', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 13, 'West Bengal & Kolkata', 'Navigate West Bengal''s industrial policy and Kolkata startup ecosystem.', '["Study WB policy", "Analyze Kolkata ecosystem", "Identify opportunities", "Plan applications"]'::jsonb, '{"templates": ["WB Scheme Guide", "Application Templates"], "tools": ["WB Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 14, 'Odisha & Bihar', 'Access Odisha''s startup policy and Bihar''s industry incentives.', '["Analyze Odisha schemes", "Study Bihar incentives", "Compare benefits", "Plan strategy"]'::jsonb, '{"templates": ["Eastern States Guide", "Scheme Comparison"], "tools": ["Benefits Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 15, 'Jharkhand & Chhattisgarh', 'Leverage natural resource-based incentives and emerging startup support.', '["Study Jharkhand policy", "Analyze Chhattisgarh schemes", "Identify sector benefits", "Plan applications"]'::jsonb, '{"templates": ["JH-CG Guide", "Application Forms"], "tools": ["Eligibility Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 6: North-Eastern States (Days 16-18)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'North-Eastern States', 'Access special incentives for NE states including Assam, Meghalaya, and others', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 16, 'NE Region Special Incentives', 'Understand special category status and enhanced incentives for North-Eastern states.', '["Study NE special status", "Understand tax benefits", "Identify central schemes", "Plan NE presence"]'::jsonb, '{"templates": ["NE Benefits Guide", "Tax Exemption Guide"], "tools": ["NE Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 17, 'Assam & Meghalaya', 'Navigate startup ecosystems in Assam (Guwahati) and Meghalaya.', '["Study Assam schemes", "Analyze Meghalaya policy", "Connect with incubators", "Apply for benefits"]'::jsonb, '{"templates": ["Assam-Meghalaya Guide", "Application Templates"], "tools": ["Eligibility Checker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 18, 'Other NE States', 'Access opportunities in Manipur, Tripura, Nagaland, Mizoram, Arunachal, and Sikkim.', '["Map NE opportunities", "Study individual policies", "Identify unique benefits", "Plan applications"]'::jsonb, '{"templates": ["NE States Matrix", "Scheme Applications"], "tools": ["NE Benefits Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 7: Implementation Framework (Days 19-21)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Implementation Framework', 'Execute your state benefits strategy effectively', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 19, 'Application Strategy', 'Develop comprehensive application strategy for multiple state schemes.', '["Prioritize schemes", "Prepare documentation", "Create timeline", "Track applications"]'::jsonb, '{"templates": ["Application Tracker", "Document Checklist"], "tools": ["Priority Matrix"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 20, 'Documentation Excellence', 'Master documentation requirements for state scheme applications.', '["Gather required documents", "Prepare standard formats", "Create document repository", "Maintain updates"]'::jsonb, '{"templates": ["Document Templates", "Format Guide"], "tools": ["Doc Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 21, 'Government Engagement', 'Build relationships with state government bodies for smooth approvals.', '["Identify key contacts", "Plan engagement", "Follow up systematically", "Build relationships"]'::jsonb, '{"templates": ["Contact Directory", "Engagement Guide"], "tools": ["Relationship Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 8: Sector-Specific Benefits (Days 22-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Sector-Specific Benefits', 'Access sector-specific state incentives for your industry', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 22, 'Tech & IT Sector Benefits', 'Access IT/ITeS specific incentives across states.', '["Map IT incentives", "Compare state offers", "Identify best fit", "Plan applications"]'::jsonb, '{"templates": ["IT Sector Guide", "State Comparison"], "tools": ["IT Benefits Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 23, 'Manufacturing Incentives', 'Leverage manufacturing-specific state schemes and industrial policies.', '["Study manufacturing incentives", "Analyze SEZ/industrial parks", "Compare benefits", "Plan location"]'::jsonb, '{"templates": ["Manufacturing Guide", "Industrial Zone Matrix"], "tools": ["Mfg Benefits Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 24, 'Services & Other Sectors', 'Access schemes for services, agriculture, healthcare, and other sectors.', '["Map sector schemes", "Identify opportunities", "Compare across states", "Apply strategically"]'::jsonb, '{"templates": ["Sector Matrix", "Scheme Applications"], "tools": ["Sector Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 9: Financial Planning (Days 25-27)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Financial Planning', 'Optimize financial benefits from state schemes', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 25, 'Incentive Calculation', 'Calculate total benefits available from different state schemes.', '["List available incentives", "Calculate monetary benefits", "Project cash flows", "Plan utilization"]'::jsonb, '{"templates": ["Incentive Calculator", "Cash Flow Template"], "tools": ["Benefits Estimator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 26, 'ROI Optimization', 'Maximize ROI from state incentive programs.', '["Analyze cost-benefit", "Optimize timing", "Plan compliance", "Track realization"]'::jsonb, '{"templates": ["ROI Calculator", "Benefit Tracker"], "tools": ["ROI Optimizer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 27, 'Multi-State Strategy', 'Develop optimal multi-state presence strategy for maximum benefits.', '["Evaluate locations", "Plan entity structure", "Optimize benefits", "Manage compliance"]'::jsonb, '{"templates": ["Multi-State Planner", "Entity Structure Guide"], "tools": ["Location Optimizer"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 10: Advanced Strategies (Days 28-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Advanced Strategies', 'Master advanced strategies for state benefit optimization', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 28, 'Investment Summits & Events', 'Leverage state investment summits and events for opportunities.', '["Track upcoming summits", "Plan participation", "Prepare pitches", "Follow up deals"]'::jsonb, '{"templates": ["Summit Calendar", "Pitch Templates"], "tools": ["Event Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 29, 'Policy Monitoring', 'Set up systems to track policy changes and new opportunities.', '["Set up monitoring", "Track changes", "Adapt strategies", "Capture new benefits"]'::jsonb, '{"templates": ["Policy Monitor Template", "Alert System Guide"], "tools": ["Policy Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 30, 'Long-Term Planning', 'Develop long-term state benefits strategy aligned with growth plans.', '["Create 5-year plan", "Align with growth", "Plan transitions", "Build relationships"]'::jsonb, '{"templates": ["5-Year Planner", "Growth Alignment Guide"], "tools": ["Strategic Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW());

END $$;

COMMIT;
