-- P10: Patent Mastery for Indian Startups (Fixed)
-- 60 days, 12 modules, comprehensive IP strategy
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
    v_mod_11_id TEXT;
    v_mod_12_id TEXT;
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
    v_mod_11_id := gen_random_uuid()::text;
    v_mod_12_id := gen_random_uuid()::text;

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P10',
        'Patent Mastery for Indian Startups',
        'Master intellectual property from filing to monetization with comprehensive patent strategy. 60 days, 12 modules covering patent fundamentals, drafting, prosecution, portfolio management, and monetization.',
        7999,
        60,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P10';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Patent Fundamentals (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Patent Fundamentals', 'Master the fundamentals of patent law and IP strategy', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Introduction to Patents', 'Understand what patents are, how they work, and why they matter for startups.', '["Learn patent basics", "Understand patent types", "Identify patentable inventions", "Assess your IP potential"]'::jsonb, '{"templates": ["Patent Basics Guide", "IP Assessment Template"], "tools": ["Patentability Checker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Indian Patent Law Overview', 'Deep dive into Indian Patents Act 1970 and recent amendments affecting startups.', '["Study Patents Act 1970", "Understand amendments", "Learn startup provisions", "Map compliance requirements"]'::jsonb, '{"templates": ["Law Summary Guide", "Compliance Checklist"], "tools": ["Legal Reference Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Patentability Criteria', 'Master the three key criteria: novelty, inventive step, and industrial applicability.', '["Understand novelty", "Assess inventive step", "Check industrial applicability", "Evaluate your inventions"]'::jsonb, '{"templates": ["Patentability Analysis Template", "Criteria Checklist"], "tools": ["Criteria Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Types of IP Protection', 'Understand different IP types: patents, trademarks, copyrights, and trade secrets.', '["Compare IP types", "Identify appropriate protection", "Plan IP strategy", "Assess coverage gaps"]'::jsonb, '{"templates": ["IP Comparison Matrix", "Strategy Template"], "tools": ["IP Type Selector"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Patent vs Trade Secret', 'Make strategic decisions between patent protection and trade secret strategy.', '["Evaluate patent benefits", "Assess trade secret option", "Make strategic choice", "Document decision"]'::jsonb, '{"templates": ["Decision Framework", "Trade Secret Policy"], "tools": ["Strategy Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: IP Strategy Development (Days 6-10)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'IP Strategy Development', 'Develop comprehensive IP strategy aligned with business goals', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'IP Audit & Assessment', 'Conduct comprehensive IP audit to identify existing and potential IP assets.', '["Inventory existing IP", "Identify new opportunities", "Assess protection status", "Create IP register"]'::jsonb, '{"templates": ["IP Audit Template", "Asset Register"], "tools": ["Audit Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Competitive Patent Analysis', 'Analyze competitor patents to inform your IP strategy.', '["Identify competitors", "Search patent databases", "Analyze patent claims", "Map competitive landscape"]'::jsonb, '{"templates": ["Analysis Template", "Landscape Map"], "tools": ["Patent Search Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'IP Strategy Framework', 'Create comprehensive IP strategy aligned with your business objectives.', '["Define IP objectives", "Align with business goals", "Set priorities", "Create roadmap"]'::jsonb, '{"templates": ["Strategy Framework", "Roadmap Template"], "tools": ["Strategy Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'IP Budget Planning', 'Plan and allocate budget for patent filing, maintenance, and enforcement.', '["Estimate filing costs", "Plan maintenance fees", "Budget for enforcement", "Allocate resources"]'::jsonb, '{"templates": ["Budget Template", "Cost Estimator"], "tools": ["IP Budget Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'IP Policy & Governance', 'Establish IP policies and governance framework for your organization.', '["Draft IP policy", "Define ownership rules", "Create inventor agreements", "Set up governance"]'::jsonb, '{"templates": ["IP Policy Template", "Inventor Agreement"], "tools": ["Policy Generator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 3: Invention Documentation (Days 11-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Invention Documentation', 'Learn to document inventions for patent filing', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 11, 'Invention Capture Process', 'Establish systematic process to capture inventions across your organization.', '["Set up capture process", "Train team", "Create submission forms", "Implement review system"]'::jsonb, '{"templates": ["Capture Process Guide", "Submission Form"], "tools": ["Invention Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Invention Disclosure Writing', 'Write comprehensive invention disclosures that enable strong patents.', '["Understand disclosure structure", "Document technical details", "Explain advantages", "Include examples"]'::jsonb, '{"templates": ["Disclosure Template", "Writing Guide"], "tools": ["Disclosure Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, 'Prior Art Searching', 'Conduct effective prior art searches to assess patentability and strengthen claims.', '["Search patent databases", "Search publications", "Analyze results", "Document findings"]'::jsonb, '{"templates": ["Search Report Template", "Database Guide"], "tools": ["Prior Art Search Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Technical Documentation', 'Create technical documentation that supports patent applications.', '["Document specifications", "Create diagrams", "Write technical descriptions", "Organize materials"]'::jsonb, '{"templates": ["Technical Doc Template", "Diagram Guide"], "tools": ["Documentation Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Lab Notebooks & Evidence', 'Maintain proper records to establish invention dates and support claims.', '["Set up lab notebooks", "Document experiments", "Maintain records", "Secure evidence"]'::jsonb, '{"templates": ["Lab Notebook Template", "Evidence Guide"], "tools": ["Record Keeper"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 4: Patent Drafting (Days 16-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Patent Drafting', 'Master the art of drafting patent applications', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Patent Application Structure', 'Understand the structure and components of patent applications.', '["Learn application structure", "Understand each section", "Study examples", "Plan your application"]'::jsonb, '{"templates": ["Structure Guide", "Section Templates"], "tools": ["Structure Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 17, 'Claims Drafting', 'Master the critical skill of drafting patent claims.', '["Understand claim types", "Draft independent claims", "Write dependent claims", "Review and refine"]'::jsonb, '{"templates": ["Claims Templates", "Drafting Guide"], "tools": ["Claims Builder"]}'::jsonb, 75, 60, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'Specification Writing', 'Write detailed specifications that support your claims.', '["Write background section", "Describe invention", "Include embodiments", "Add examples"]'::jsonb, '{"templates": ["Specification Template", "Writing Checklist"], "tools": ["Spec Writer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Patent Drawings', 'Create effective patent drawings that clarify and support your invention.', '["Understand drawing requirements", "Create figures", "Add reference numerals", "Review for compliance"]'::jsonb, '{"templates": ["Drawing Guidelines", "Reference System"], "tools": ["Drawing Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Abstract & Summary', 'Write compelling abstracts and summaries for your applications.', '["Understand abstract requirements", "Write concise summary", "Highlight key features", "Review character limits"]'::jsonb, '{"templates": ["Abstract Template", "Summary Guide"], "tools": ["Word Counter"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 5: Filing Process (Days 21-25)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Filing Process', 'Navigate the patent filing process in India', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 21, 'Indian Patent Office Procedures', 'Understand IPO procedures, forms, and filing requirements.', '["Learn IPO procedures", "Understand form requirements", "Study timelines", "Plan filing strategy"]'::jsonb, '{"templates": ["IPO Procedures Guide", "Forms Checklist"], "tools": ["Procedure Navigator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Provisional vs Complete Application', 'Strategize between provisional and complete application filing.', '["Understand differences", "Evaluate timing", "Plan filing strategy", "Prepare documents"]'::jsonb, '{"templates": ["Filing Strategy Guide", "Timeline Planner"], "tools": ["Strategy Selector"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 23, 'Startup & MSME Benefits', 'Leverage special benefits for startups including expedited examination and fee discounts.', '["Understand startup benefits", "Apply for expedited exam", "Claim fee discounts", "Document eligibility"]'::jsonb, '{"templates": ["Benefits Guide", "Eligibility Checklist"], "tools": ["Benefit Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 24, 'Online Filing System', 'Master the IPO e-filing system for efficient application submission.', '["Set up e-filing account", "Navigate the system", "Upload documents", "Submit application"]'::jsonb, '{"templates": ["E-Filing Guide", "Upload Checklist"], "tools": ["E-Filing Helper"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 25, 'Fee Calculation & Payment', 'Calculate and pay patent fees correctly.', '["Calculate applicable fees", "Understand discounts", "Make payment", "Track receipts"]'::jsonb, '{"templates": ["Fee Schedule", "Payment Guide"], "tools": ["Fee Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 6: Patent Prosecution (Days 26-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Patent Prosecution', 'Navigate the examination and grant process', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 26, 'Examination Request', 'Request examination and understand the examination timeline.', '["File examination request", "Understand timeline", "Plan responses", "Track status"]'::jsonb, '{"templates": ["Request Form Guide", "Timeline Tracker"], "tools": ["Status Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'First Examination Report', 'Understand and respond to First Examination Report (FER).', '["Analyze objections", "Prepare responses", "Amend claims if needed", "File response"]'::jsonb, '{"templates": ["FER Response Template", "Amendment Guide"], "tools": ["Response Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 28, 'Claim Amendments', 'Master the art of amending claims during prosecution.', '["Understand amendment rules", "Draft amendments", "Avoid new matter", "Support with specification"]'::jsonb, '{"templates": ["Amendment Templates", "Rules Guide"], "tools": ["Amendment Checker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 29, 'Hearings & Appeals', 'Navigate hearings before the patent office and understand appeal options.', '["Prepare for hearings", "Present arguments", "Understand appeal process", "Plan strategy"]'::jsonb, '{"templates": ["Hearing Preparation Guide", "Appeal Template"], "tools": ["Hearing Planner"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 30, 'Grant & Certification', 'Complete the grant process and obtain your patent certificate.', '["Respond to grant notice", "Pay grant fees", "Obtain certificate", "Celebrate success"]'::jsonb, '{"templates": ["Grant Checklist", "Certificate Guide"], "tools": ["Grant Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 7: International Filing (Days 31-35)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'International Filing', 'Protect your inventions globally through international filing', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 31, 'PCT System Overview', 'Understand the Patent Cooperation Treaty system for international filing.', '["Learn PCT benefits", "Understand timeline", "Plan PCT strategy", "Calculate costs"]'::jsonb, '{"templates": ["PCT Guide", "Timeline Template"], "tools": ["PCT Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 32, 'PCT Application Filing', 'File PCT applications and navigate the international phase.', '["Prepare PCT application", "File with RO/IN", "Track international phase", "Plan national entry"]'::jsonb, '{"templates": ["PCT Filing Guide", "Forms Checklist"], "tools": ["PCT Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 33, 'National Phase Entry', 'Enter national phase in target countries strategically.', '["Select target countries", "Prepare translations", "File national applications", "Track deadlines"]'::jsonb, '{"templates": ["Country Selection Matrix", "Entry Checklist"], "tools": ["Deadline Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 34, 'US Patent Filing', 'Navigate USPTO procedures for US patent protection.', '["Understand USPTO requirements", "File US application", "Respond to office actions", "Obtain grant"]'::jsonb, '{"templates": ["USPTO Guide", "US Filing Checklist"], "tools": ["US Patent Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 35, 'Other Key Jurisdictions', 'File in other important jurisdictions like Europe, China, and Japan.', '["Understand EPO procedures", "Navigate CNIPA", "File in JPO", "Track globally"]'::jsonb, '{"templates": ["Multi-Jurisdiction Guide", "Global Tracker"], "tools": ["World IP Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 8: Portfolio Management (Days 36-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Portfolio Management', 'Build and manage your patent portfolio effectively', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 36, 'Portfolio Strategy', 'Develop strategic approach to building your patent portfolio.', '["Define portfolio goals", "Align with business", "Set priorities", "Plan growth"]'::jsonb, '{"templates": ["Portfolio Strategy Template", "Planning Guide"], "tools": ["Strategy Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 37, 'Portfolio Maintenance', 'Maintain your portfolio through renewals and strategic decisions.', '["Track renewal deadlines", "Evaluate portfolio", "Make maintenance decisions", "Budget renewals"]'::jsonb, '{"templates": ["Maintenance Calendar", "Evaluation Template"], "tools": ["Renewal Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 38, 'Patent Valuation', 'Learn to value patents for business decisions and transactions.', '["Understand valuation methods", "Apply appropriate method", "Document valuation", "Update regularly"]'::jsonb, '{"templates": ["Valuation Template", "Method Guide"], "tools": ["Valuation Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 39, 'Portfolio Analytics', 'Use analytics to optimize your patent portfolio.', '["Track portfolio metrics", "Analyze performance", "Identify gaps", "Plan improvements"]'::jsonb, '{"templates": ["Analytics Dashboard", "Metrics Guide"], "tools": ["Portfolio Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 40, 'Continuation Strategies', 'Use continuation applications to strengthen your portfolio.', '["Understand continuation types", "Plan continuations", "File strategically", "Track family"]'::jsonb, '{"templates": ["Continuation Guide", "Family Tracker"], "tools": ["Family Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 9: Patent Enforcement (Days 41-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Patent Enforcement', 'Protect your patents through monitoring and enforcement', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 41, 'Infringement Monitoring', 'Set up systems to monitor for patent infringement.', '["Set up watch services", "Monitor competitors", "Track products", "Document infringement"]'::jsonb, '{"templates": ["Monitoring Plan", "Watch Setup Guide"], "tools": ["Infringement Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 42, 'Infringement Analysis', 'Conduct thorough infringement analysis when potential infringement is detected.', '["Analyze claims", "Compare products", "Document evidence", "Assess strength"]'::jsonb, '{"templates": ["Analysis Template", "Claim Chart"], "tools": ["Claim Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 43, 'Enforcement Strategy', 'Develop strategic approach to patent enforcement.', '["Evaluate options", "Assess costs vs benefits", "Plan approach", "Engage counsel"]'::jsonb, '{"templates": ["Enforcement Playbook", "Decision Matrix"], "tools": ["Strategy Evaluator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 44, 'Cease & Desist Letters', 'Draft and send effective cease and desist letters.', '["Draft letter", "Identify recipient", "Send properly", "Track response"]'::jsonb, '{"templates": ["C&D Template", "Follow-up Guide"], "tools": ["Letter Generator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 45, 'Litigation Basics', 'Understand patent litigation basics and when to proceed.', '["Understand litigation process", "Evaluate case strength", "Assess costs", "Make informed decisions"]'::jsonb, '{"templates": ["Litigation Guide", "Cost Estimator"], "tools": ["Case Evaluator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 10: Patent Monetization (Days 46-50)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Patent Monetization', 'Generate revenue from your patent portfolio', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 46, 'Monetization Strategies', 'Understand different approaches to patent monetization.', '["Learn monetization options", "Evaluate strategies", "Choose approach", "Plan execution"]'::jsonb, '{"templates": ["Monetization Guide", "Strategy Template"], "tools": ["Strategy Selector"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 47, 'Patent Licensing', 'License your patents for ongoing royalty income.', '["Identify licensees", "Negotiate terms", "Draft agreements", "Manage licenses"]'::jsonb, '{"templates": ["License Agreement Template", "Negotiation Guide"], "tools": ["License Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 48, 'Patent Sales', 'Sell patents or portfolios for capital.', '["Value patents for sale", "Find buyers", "Negotiate deal", "Complete transaction"]'::jsonb, '{"templates": ["Sale Agreement Template", "Valuation Guide"], "tools": ["Sale Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 49, 'Cross-Licensing', 'Engage in cross-licensing to access technology and reduce litigation risk.', '["Identify opportunities", "Analyze portfolios", "Negotiate terms", "Execute agreements"]'::jsonb, '{"templates": ["Cross-License Template", "Analysis Guide"], "tools": ["Portfolio Comparator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 50, 'Patent-Backed Financing', 'Use patents as collateral for financing.', '["Understand IP financing", "Prepare documentation", "Approach lenders", "Structure deal"]'::jsonb, '{"templates": ["Financing Guide", "Documentation Checklist"], "tools": ["Financing Calculator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 11: Defensive Strategies (Days 51-55)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'Defensive Strategies', 'Protect against patent infringement claims', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 51, 'Freedom to Operate', 'Conduct FTO analysis before launching products.', '["Identify relevant patents", "Analyze claims", "Assess risk", "Plan mitigation"]'::jsonb, '{"templates": ["FTO Analysis Template", "Risk Assessment"], "tools": ["FTO Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 52, 'Design Around Strategies', 'Design around existing patents to avoid infringement.', '["Analyze blocking patents", "Identify alternatives", "Document design choices", "Verify non-infringement"]'::jsonb, '{"templates": ["Design Around Guide", "Documentation Template"], "tools": ["Design Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 53, 'Invalidity Analysis', 'Analyze patent validity for defensive purposes.', '["Search prior art", "Analyze claims", "Document findings", "Prepare defense"]'::jsonb, '{"templates": ["Invalidity Template", "Prior Art Guide"], "tools": ["Validity Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 54, 'Responding to Claims', 'Respond effectively when accused of infringement.', '["Analyze claims", "Evaluate options", "Prepare response", "Engage counsel"]'::jsonb, '{"templates": ["Response Playbook", "Evaluation Guide"], "tools": ["Response Planner"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 55, 'Defensive Publications', 'Use defensive publications to protect freedom to operate.', '["Understand defensive publications", "Identify opportunities", "Prepare publications", "File strategically"]'::jsonb, '{"templates": ["Publication Guide", "Filing Template"], "tools": ["Publication Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 12: Advanced IP Mastery (Days 56-60)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'Advanced IP Mastery', 'Master advanced IP strategies for competitive advantage', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 56, 'Software & Business Method Patents', 'Navigate the complex area of software and business method patents in India.', '["Understand patentability", "Draft compliant applications", "Handle rejections", "Build portfolio"]'::jsonb, '{"templates": ["Software Patent Guide", "Drafting Template"], "tools": ["Software Patent Checker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 57, 'Standard Essential Patents', 'Understand and leverage standard essential patents.', '["Identify SEP opportunities", "Understand FRAND", "Participate in standards", "License SEPs"]'::jsonb, '{"templates": ["SEP Guide", "FRAND Template"], "tools": ["SEP Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 58, 'Open Source & IP', 'Navigate IP considerations in open source environments.', '["Understand OS licenses", "Manage IP in OS", "Plan contribution strategy", "Protect proprietary IP"]'::jsonb, '{"templates": ["OS IP Guide", "License Comparison"], "tools": ["License Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 59, 'IP in M&A Transactions', 'Manage IP in mergers, acquisitions, and investments.', '["Conduct IP due diligence", "Value IP portfolio", "Structure transactions", "Complete transfers"]'::jsonb, '{"templates": ["IP DD Checklist", "Transfer Template"], "tools": ["M&A IP Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 60, 'Future of IP & Innovation', 'Stay ahead of emerging trends in IP and innovation.', '["Track IP trends", "Plan for AI and blockchain", "Adapt strategy", "Future-proof portfolio"]'::jsonb, '{"templates": ["Trends Report", "Future Planning Guide"], "tools": ["Trend Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
