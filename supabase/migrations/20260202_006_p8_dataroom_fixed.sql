-- P8: Investor-Ready Data Room Mastery (Fixed)
-- 45 days, 8 modules, comprehensive data room guide
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

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P8',
        'Investor-Ready Data Room Mastery',
        'Transform your startup with professional data room that accelerates fundraising. 45 days, 8 modules covering data room setup, documentation, legal compliance, financial models, and investor management.',
        9999,
        45,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P8';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Data Room Foundation (Days 1-6)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Data Room Foundation', 'Build the foundation for a professional investor data room', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Data Room Strategy', 'Understand the role of data rooms in fundraising and develop your data room strategy.', '["Define data room objectives", "Understand investor expectations", "Plan data room structure", "Choose platform"]'::jsonb, '{"templates": ["Data Room Strategy Guide", "Platform Comparison"], "tools": ["Strategy Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Platform Selection', 'Select and set up the right data room platform for your needs.', '["Evaluate platform options", "Compare features and pricing", "Set up chosen platform", "Configure security"]'::jsonb, '{"templates": ["Platform Evaluation Matrix", "Setup Checklist"], "tools": ["Platform Selector"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Folder Structure Design', 'Create intuitive folder structure that investors can navigate easily.', '["Design folder hierarchy", "Create standardized naming", "Set up access controls", "Test navigation"]'::jsonb, '{"templates": ["Folder Structure Template", "Naming Convention Guide"], "tools": ["Structure Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Document Index Creation', 'Create comprehensive document index and checklist for data room population.', '["Build document checklist", "Prioritize by importance", "Identify missing documents", "Create timeline"]'::jsonb, '{"templates": ["Document Index Template", "Gap Analysis Tool"], "tools": ["Index Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Access Management', 'Set up access controls and permissions for different stakeholders.', '["Define access levels", "Create user roles", "Set up permissions", "Plan onboarding"]'::jsonb, '{"templates": ["Access Matrix Template", "Permission Guide"], "tools": ["Access Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 6, 'Security & Compliance', 'Implement security measures and ensure compliance with data protection requirements.', '["Configure security settings", "Enable watermarking", "Set up NDA tracking", "Implement audit trails"]'::jsonb, '{"templates": ["Security Checklist", "Compliance Guide"], "tools": ["Security Analyzer"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 2: Corporate Documentation (Days 7-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Corporate Documentation', 'Organize and prepare all corporate documents for the data room', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Incorporation Documents', 'Organize all incorporation and constitutional documents.', '["Gather COI and certificates", "Organize MoA and AoA", "Compile share certificates", "Update statutory registers"]'::jsonb, '{"templates": ["Incorporation Checklist", "Document Formats"], "tools": ["Document Organizer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Board & Governance Documents', 'Prepare board resolutions, minutes, and governance documents.', '["Compile board minutes", "Organize resolutions", "Gather director documents", "Update consents"]'::jsonb, '{"templates": ["Board Documents Checklist", "Resolution Templates"], "tools": ["Governance Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Cap Table & Equity Documents', 'Create clean cap table and organize all equity-related documents.', '["Update cap table", "Organize share transfers", "Compile ESOP documents", "Verify calculations"]'::jsonb, '{"templates": ["Cap Table Template", "ESOP Summary"], "tools": ["Cap Table Manager"]}'::jsonb, 75, 60, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'Previous Investment Documents', 'Organize all previous investment documentation.', '["Gather term sheets", "Compile investment agreements", "Organize SHA and SSA", "Summarize rights"]'::jsonb, '{"templates": ["Investment Doc Checklist", "Rights Summary"], "tools": ["Investment Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 11, 'Compliance & Regulatory Documents', 'Compile all compliance certificates and regulatory filings.', '["Gather ROC filings", "Compile tax returns", "Organize compliance certificates", "Create status summary"]'::jsonb, '{"templates": ["Compliance Checklist", "Status Dashboard"], "tools": ["Compliance Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 12, 'Corporate Document Quality Check', 'Review and ensure quality of all corporate documents.', '["Review for completeness", "Check document quality", "Verify signatures", "Fix identified issues"]'::jsonb, '{"templates": ["QC Checklist", "Issue Tracker"], "tools": ["Document Validator"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 3: Financial Documentation (Days 13-18)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Financial Documentation', 'Prepare comprehensive financial documentation and models', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 13, 'Historical Financials', 'Prepare and organize historical financial statements.', '["Compile audited statements", "Organize management accounts", "Create summary dashboards", "Explain variances"]'::jsonb, '{"templates": ["Financial Summary Template", "Variance Analysis"], "tools": ["Financial Organizer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Financial Model Building', 'Build comprehensive financial model for investor presentations.', '["Design model structure", "Build revenue model", "Add expense projections", "Create scenarios"]'::jsonb, '{"templates": ["Financial Model Template", "Assumption Library"], "tools": ["Model Builder"]}'::jsonb, 90, 75, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Unit Economics Analysis', 'Document and present unit economics clearly.', '["Calculate CAC and LTV", "Document contribution margin", "Analyze cohorts", "Create visualizations"]'::jsonb, '{"templates": ["Unit Economics Template", "Cohort Analysis"], "tools": ["Metrics Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 16, 'Revenue & Growth Metrics', 'Prepare detailed revenue breakdown and growth metrics.', '["Segment revenue data", "Calculate growth rates", "Analyze trends", "Create charts"]'::jsonb, '{"templates": ["Revenue Dashboard", "Growth Analysis"], "tools": ["Metrics Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 17, 'Tax & Compliance Records', 'Organize tax filings and compliance records.', '["Compile tax returns", "Organize GST filings", "Gather TDS certificates", "Create summary"]'::jsonb, '{"templates": ["Tax Compliance Checklist", "Summary Template"], "tools": ["Tax Organizer"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 18, 'Financial Q&A Preparation', 'Prepare for common financial due diligence questions.', '["Anticipate questions", "Prepare answers", "Create FAQ document", "Train team"]'::jsonb, '{"templates": ["Financial FAQ", "Answer Templates"], "tools": ["Q&A Generator"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 4: Legal Documentation (Days 19-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Legal Documentation', 'Organize all legal documents and contracts', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Material Contracts', 'Organize all material commercial contracts.', '["Identify material contracts", "Organize by category", "Summarize key terms", "Flag renewal dates"]'::jsonb, '{"templates": ["Contract Summary Template", "Key Terms Matrix"], "tools": ["Contract Manager"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Customer Agreements', 'Compile customer contracts and subscription documents.', '["Gather customer contracts", "Organize by revenue", "Summarize terms", "Flag any issues"]'::jsonb, '{"templates": ["Customer Contract Index", "Summary Template"], "tools": ["Customer Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 21, 'Vendor & Partner Agreements', 'Organize vendor and partnership agreements.', '["Compile vendor contracts", "Organize partnerships", "Summarize dependencies", "Assess risks"]'::jsonb, '{"templates": ["Vendor Index", "Risk Assessment"], "tools": ["Vendor Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 22, 'Employment Documentation', 'Prepare employment contracts and HR documents.', '["Organize employment contracts", "Compile ESOP agreements", "Gather HR policies", "Summary headcount"]'::jsonb, '{"templates": ["HR Document Checklist", "Headcount Summary"], "tools": ["HR Organizer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 23, 'IP Documentation', 'Compile all intellectual property documentation.', '["Gather IP registrations", "Organize assignments", "Compile licenses", "Create IP summary"]'::jsonb, '{"templates": ["IP Portfolio Summary", "Assignment Index"], "tools": ["IP Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 24, 'Litigation & Disputes', 'Document any litigation, disputes, or potential claims.', '["List pending matters", "Summarize claims", "Assess potential exposure", "Document status"]'::jsonb, '{"templates": ["Litigation Summary", "Risk Assessment"], "tools": ["Dispute Tracker"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 5: Business Documentation (Days 25-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Business Documentation', 'Prepare comprehensive business and operational documentation', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 25, 'Pitch Deck & Executive Summary', 'Create compelling pitch materials for the data room.', '["Update pitch deck", "Create executive summary", "Design one-pager", "Add to data room"]'::jsonb, '{"templates": ["Pitch Deck Template", "Executive Summary"], "tools": ["Deck Builder"]}'::jsonb, 75, 60, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 26, 'Business Plan Documentation', 'Document comprehensive business plan and strategy.', '["Write business overview", "Document market analysis", "Explain strategy", "Include milestones"]'::jsonb, '{"templates": ["Business Plan Template", "Strategy Document"], "tools": ["Plan Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 27, 'Product & Technology Overview', 'Document product architecture and technology stack.', '["Create product overview", "Document architecture", "Explain tech stack", "Include roadmap"]'::jsonb, '{"templates": ["Product Doc Template", "Tech Architecture"], "tools": ["Product Documenter"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 28, 'Market & Competitive Analysis', 'Prepare market research and competitive analysis.', '["Document market size", "Analyze competition", "Explain differentiation", "Include trends"]'::jsonb, '{"templates": ["Market Analysis Template", "Competitive Matrix"], "tools": ["Market Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 29, 'Customer & Traction Data', 'Compile customer testimonials and traction metrics.', '["Gather testimonials", "Document case studies", "Summarize traction", "Include logos"]'::jsonb, '{"templates": ["Traction Summary", "Case Study Format"], "tools": ["Traction Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 30, 'Team & Organization', 'Document team composition and organizational structure.', '["Create org chart", "Write team bios", "Document experience", "Include culture"]'::jsonb, '{"templates": ["Org Chart Template", "Bio Format"], "tools": ["Org Builder"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 6: Due Diligence Readiness (Days 31-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Due Diligence Readiness', 'Prepare for thorough investor due diligence', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 31, 'DD Checklist Preparation', 'Create comprehensive due diligence checklist and preparation plan.', '["Build DD checklist", "Assign owners", "Set timeline", "Track completion"]'::jsonb, '{"templates": ["DD Checklist Template", "Project Plan"], "tools": ["DD Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 32, 'Red Flag Assessment', 'Identify and address potential red flags before DD.', '["Identify potential issues", "Assess severity", "Plan remediation", "Prepare explanations"]'::jsonb, '{"templates": ["Red Flag Checklist", "Remediation Plan"], "tools": ["Risk Assessor"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 33, 'Disclosure Schedule Preparation', 'Prepare comprehensive disclosure schedules.', '["Draft disclosure items", "Cross-reference documents", "Review with legal", "Finalize schedule"]'::jsonb, '{"templates": ["Disclosure Template", "Review Checklist"], "tools": ["Disclosure Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 34, 'Management Presentation', 'Prepare for management presentations and Q&A sessions.', '["Create presentation", "Prepare talking points", "Anticipate questions", "Practice sessions"]'::jsonb, '{"templates": ["Management Deck", "Q&A Prep Guide"], "tools": ["Presentation Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 35, 'Expert Calls Preparation', 'Prepare team for expert calls and reference checks.', '["Brief team members", "Prepare reference list", "Create talking points", "Coordinate availability"]'::jsonb, '{"templates": ["Expert Call Guide", "Reference Template"], "tools": ["Call Scheduler"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 36, 'DD Response System', 'Set up system for managing DD requests and responses.', '["Create response workflow", "Assign responsibilities", "Set up tracking", "Plan turnaround"]'::jsonb, '{"templates": ["Response Workflow", "Tracking System"], "tools": ["DD Manager"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 7: Investor Management (Days 37-42)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Investor Management', 'Manage investor interactions through the data room', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 37, 'Investor Onboarding', 'Create smooth onboarding process for investors accessing data room.', '["Create welcome email", "Set up NDA process", "Design onboarding flow", "Prepare guides"]'::jsonb, '{"templates": ["Welcome Email", "NDA Template"], "tools": ["Onboarding Flow"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 38, 'Activity Tracking', 'Monitor investor activity and engagement in data room.', '["Set up analytics", "Track document views", "Monitor time spent", "Identify engaged investors"]'::jsonb, '{"templates": ["Activity Dashboard", "Engagement Report"], "tools": ["Activity Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 39, 'Q&A Management', 'Manage investor questions and responses effectively.', '["Set up Q&A system", "Route questions", "Track responses", "Maintain log"]'::jsonb, '{"templates": ["Q&A Log Template", "Response Guide"], "tools": ["Q&A Manager"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 40, 'Update Communications', 'Send relevant updates to investors during due diligence.', '["Plan update cadence", "Create update templates", "Share progress", "Manage expectations"]'::jsonb, '{"templates": ["Update Template", "Communication Plan"], "tools": ["Update Scheduler"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 41, 'Competitive Process Management', 'Manage multiple investors in competitive fundraise.', '["Create investor matrix", "Track progress", "Manage timelines", "Coordinate access"]'::jsonb, '{"templates": ["Investor Matrix", "Timeline Tracker"], "tools": ["Process Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 42, 'Closing Documentation', 'Prepare data room for transaction closing.', '["Organize closing docs", "Create signing checklist", "Set up closing folder", "Archive DD materials"]'::jsonb, '{"templates": ["Closing Checklist", "Archive Guide"], "tools": ["Closing Manager"]}'::jsonb, 60, 50, 6, NOW(), NOW());

    -- Module 8: Data Room Excellence (Days 43-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Data Room Excellence', 'Achieve best-in-class data room standards', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 43, 'Quality Assurance Review', 'Conduct comprehensive quality review of entire data room.', '["Review all sections", "Check document quality", "Verify completeness", "Fix issues"]'::jsonb, '{"templates": ["QA Checklist", "Issue Log"], "tools": ["Quality Reviewer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 44, 'Continuous Improvement', 'Establish process for continuous data room improvement.', '["Gather feedback", "Identify improvements", "Implement changes", "Document learnings"]'::jsonb, '{"templates": ["Feedback Form", "Improvement Log"], "tools": ["Feedback Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 45, 'Post-Round Maintenance', 'Plan for data room maintenance and future fundraises.', '["Archive current round", "Plan updates", "Maintain relationships", "Prepare for next round"]'::jsonb, '{"templates": ["Maintenance Plan", "Archive Guide"], "tools": ["Long-term Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW());

END $$;

COMMIT;
