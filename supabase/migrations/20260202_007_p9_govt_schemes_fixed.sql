-- P9: Government Schemes & Funding Mastery (Fixed)
-- 21 days, 4 modules, comprehensive government funding guide
-- Uses correct PascalCase table names and camelCase columns

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
BEGIN
    -- Generate IDs
    v_product_id := gen_random_uuid()::text;
    v_mod_1_id := gen_random_uuid()::text;
    v_mod_2_id := gen_random_uuid()::text;
    v_mod_3_id := gen_random_uuid()::text;
    v_mod_4_id := gen_random_uuid()::text;

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P9',
        'Government Schemes & Funding Mastery',
        'Access ₹50 lakhs to ₹5 crores in government funding through systematic scheme navigation. 21 days, 4 modules covering scheme discovery, eligibility, applications, and ongoing compliance.',
        4999,
        21,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P9';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Government Scheme Landscape (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Government Scheme Landscape', 'Understand the complete government funding ecosystem in India', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Government Funding Ecosystem Overview', 'Master the ₹8.5 lakh crore government funding ecosystem. Understand the hierarchy from central to state schemes and identify opportunities for your startup.', '["Map government funding sources", "Understand scheme categories", "Identify relevant ministries", "Create funding matrix"]'::jsonb, '{"templates": ["Funding Ecosystem Map", "Ministry Directory"], "tools": ["Scheme Finder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Startup India & DPIIT Recognition', 'Navigate Startup India registration and DPIIT recognition process. Unlock tax benefits, easier compliance, and access to government schemes.', '["Apply for DPIIT recognition", "Understand eligibility criteria", "Complete registration process", "Access benefits dashboard"]'::jsonb, '{"templates": ["DPIIT Application Guide", "Benefits Calculator"], "tools": ["Eligibility Checker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Central Government Schemes', 'Deep dive into major central government schemes including SIDBI, NABARD, NSIC, and ministry-specific programs.', '["Study SIDBI schemes", "Explore NABARD programs", "Map sector-specific schemes", "Identify applicable programs"]'::jsonb, '{"templates": ["Central Schemes Matrix", "Application Guides"], "tools": ["Scheme Comparison Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'State Government Schemes', 'Access state-specific startup schemes and incentives from all 28 states and 8 UTs.', '["Map state startup policies", "Compare state incentives", "Identify best fit states", "Plan applications"]'::jsonb, '{"templates": ["State Schemes Database", "Incentive Calculator"], "tools": ["State Benefit Finder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Sector-Specific Funding Programs', 'Access specialized funding for tech, manufacturing, agriculture, social impact, and emerging sectors.', '["Identify sector schemes", "Map eligibility requirements", "Compare funding amounts", "Plan sector-specific strategy"]'::jsonb, '{"templates": ["Sector Funding Guide", "Eligibility Matrix"], "tools": ["Sector Scheme Finder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: Eligibility & Application Strategy (Days 6-11)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Eligibility & Application Strategy', 'Master eligibility assessment and application strategies', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Eligibility Assessment Framework', 'Develop systematic framework to assess eligibility across multiple schemes simultaneously.', '["Create eligibility matrix", "Assess current status", "Identify gaps", "Plan improvement steps"]'::jsonb, '{"templates": ["Eligibility Assessment Tool", "Gap Analysis Template"], "tools": ["Multi-Scheme Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Documentation Requirements', 'Master documentation requirements across different schemes and build your document repository.', '["List required documents", "Gather existing documents", "Identify missing documents", "Create document repository"]'::jsonb, '{"templates": ["Document Checklist", "Repository Guide"], "tools": ["Document Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Application Form Mastery', 'Master the art of filling government scheme applications with high approval rates.', '["Study form requirements", "Learn best practices", "Avoid common mistakes", "Practice with templates"]'::jsonb, '{"templates": ["Application Templates Pack", "Best Practices Guide"], "tools": ["Form Validator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Project Proposal Writing', 'Write compelling project proposals that get approved for government funding.', '["Understand proposal structure", "Write compelling narratives", "Include required components", "Review and refine"]'::jsonb, '{"templates": ["Proposal Templates", "Writing Guide"], "tools": ["Proposal Builder"]}'::jsonb, 75, 60, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'Financial Projections for Government', 'Create financial projections aligned with government scheme requirements.', '["Understand financial requirements", "Create compliant projections", "Document assumptions", "Prepare supporting data"]'::jsonb, '{"templates": ["Financial Projection Template", "Assumption Guide"], "tools": ["Projection Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 11, 'Application Review & Submission', 'Final review process and submission strategies for maximum success.', '["Complete final review", "Verify all requirements", "Submit strategically", "Track submission"]'::jsonb, '{"templates": ["Review Checklist", "Submission Guide"], "tools": ["Application Tracker"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 3: Grant & Subsidy Navigation (Days 12-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Grant & Subsidy Navigation', 'Navigate specific grant and subsidy programs effectively', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 12, 'SIDBI & MUDRA Schemes', 'Access SIDBI and MUDRA schemes for startup and MSME funding up to ₹10 crore.', '["Understand SIDBI schemes", "Apply for MUDRA loan", "Compare options", "Plan applications"]'::jsonb, '{"templates": ["SIDBI Application Guide", "MUDRA Calculator"], "tools": ["Loan Eligibility Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, 'Credit Guarantee Schemes', 'Leverage CGTMSE and other credit guarantee schemes for collateral-free funding.', '["Understand CGTMSE", "Calculate guarantee coverage", "Apply through banks", "Track approval"]'::jsonb, '{"templates": ["CGTMSE Guide", "Bank Approach Template"], "tools": ["Guarantee Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Innovation & R&D Grants', 'Access R&D grants from DST, DBT, BIRAC, and other research funding bodies.', '["Map R&D schemes", "Understand eligibility", "Prepare research proposals", "Submit applications"]'::jsonb, '{"templates": ["R&D Grant Guide", "Research Proposal Template"], "tools": ["R&D Scheme Finder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Export Promotion Schemes', 'Access export incentives including MEIS, SEIS, and other trade promotion schemes.', '["Understand export schemes", "Calculate incentives", "Complete documentation", "Claim benefits"]'::jsonb, '{"templates": ["Export Scheme Guide", "Incentive Calculator"], "tools": ["Export Benefit Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 16, 'Capital Subsidy Programs', 'Access capital subsidies for equipment, technology, and infrastructure investments.', '["Identify subsidy programs", "Calculate eligible amounts", "Document investments", "Apply for reimbursement"]'::jsonb, '{"templates": ["Subsidy Programs Guide", "Calculation Sheet"], "tools": ["Subsidy Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 4: Compliance & Optimization (Days 17-21)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Compliance & Optimization', 'Ensure compliance and optimize government funding benefits', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 17, 'Post-Approval Compliance', 'Manage compliance requirements after scheme approval to maintain benefits.', '["Understand compliance requirements", "Set up tracking systems", "Document utilization", "Prepare reports"]'::jsonb, '{"templates": ["Compliance Checklist", "Reporting Templates"], "tools": ["Compliance Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'Fund Utilization & Reporting', 'Properly utilize and report on government funds to maintain good standing.', '["Track fund utilization", "Maintain proper records", "Prepare utilization reports", "Submit on time"]'::jsonb, '{"templates": ["Utilization Report Template", "Record Keeping Guide"], "tools": ["Fund Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Audit Preparation', 'Prepare for government audits and inspections of funded projects.', '["Understand audit requirements", "Organize documentation", "Prepare responses", "Conduct mock audits"]'::jsonb, '{"templates": ["Audit Preparation Checklist", "Document Organizer"], "tools": ["Audit Simulator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Benefit Optimization Strategies', 'Maximize benefits through strategic planning and multi-scheme approach.', '["Identify stacking opportunities", "Plan multi-scheme strategy", "Optimize timing", "Track total benefits"]'::jsonb, '{"templates": ["Optimization Strategy Guide", "Benefits Tracker"], "tools": ["ROI Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 21, 'Long-Term Government Relationship', 'Build sustainable relationships with government bodies for ongoing support.', '["Identify key contacts", "Maintain relationships", "Stay updated on policies", "Plan future applications"]'::jsonb, '{"templates": ["Relationship Management Guide", "Contact Database"], "tools": ["Policy Monitor"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
