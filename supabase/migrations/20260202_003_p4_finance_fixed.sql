-- P4: Finance Stack - CFO-Level Mastery (Fixed)
-- 45 days, 12 modules, comprehensive financial infrastructure
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
        'P4',
        'Finance Stack - CFO-Level Mastery',
        'Build world-class financial infrastructure with complete accounting systems and strategic finance. 45 days, 12 modules covering accounting, GST, tax compliance, FP&A, investor reporting, and treasury management.',
        6999,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P4';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Financial Foundation (Days 1-4)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Financial Foundation', 'Build the foundation of your startup financial infrastructure', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Startup Finance Fundamentals', 'Master the fundamentals of startup finance including key concepts, metrics, and mindset for financial success.', '["Understand startup finance basics", "Learn key financial terms", "Set up financial mindset", "Create finance goals"]'::jsonb, '{"templates": ["Finance Glossary", "Goal Setting Template"], "tools": ["Finance Assessment"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Chart of Accounts Setup', 'Design and implement a comprehensive chart of accounts aligned with Indian accounting standards.', '["Design COA structure", "Set up account codes", "Configure accounting software", "Map to Ind AS requirements"]'::jsonb, '{"templates": ["Chart of Accounts Template", "Account Code Guide"], "tools": ["COA Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Accounting Software Selection', 'Select and implement the right accounting software for your startup stage and needs.', '["Evaluate software options", "Compare features and pricing", "Plan implementation", "Set up integrations"]'::jsonb, '{"templates": ["Software Comparison Matrix", "Implementation Checklist"], "tools": ["Software Selector"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Financial Policies & Controls', 'Establish financial policies and internal controls for sound financial governance.', '["Draft financial policies", "Set up approval workflows", "Implement segregation of duties", "Create audit trail"]'::jsonb, '{"templates": ["Finance Policy Manual", "Control Framework"], "tools": ["Control Assessment"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 2: Bookkeeping Excellence (Days 5-8)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Bookkeeping Excellence', 'Master professional bookkeeping practices for accurate financial records', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 5, 'Daily Bookkeeping Practices', 'Establish daily bookkeeping routines for accurate and up-to-date financial records.', '["Set up daily recording process", "Implement bank reconciliation", "Track daily transactions", "Review exceptions"]'::jsonb, '{"templates": ["Daily Checklist", "Reconciliation Template"], "tools": ["Transaction Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Expense Management', 'Implement comprehensive expense management system with proper documentation and approvals.', '["Design expense policy", "Set up expense tracking", "Implement approval workflow", "Automate reimbursements"]'::jsonb, '{"templates": ["Expense Policy", "Claim Form Template"], "tools": ["Expense Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Invoice Management', 'Master invoice creation, tracking, and collections for healthy cash flow.', '["Create invoice templates", "Set up tracking system", "Implement AR process", "Manage collections"]'::jsonb, '{"templates": ["Invoice Templates", "AR Tracker"], "tools": ["Invoice Generator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Month-End Close Process', 'Establish efficient month-end close process for timely financial reporting.', '["Create close checklist", "Set timeline targets", "Implement review process", "Prepare adjustments"]'::jsonb, '{"templates": ["Close Checklist", "Adjustment Template"], "tools": ["Close Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 3: GST Compliance Mastery (Days 9-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'GST Compliance Mastery', 'Master GST compliance including e-invoicing, e-way bill, and ITC optimization', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 9, 'GST Framework Deep Dive', 'Deep understanding of GST framework, rates, and applicability for your business.', '["Map GST applicability", "Understand rate structures", "Identify exemptions", "Plan compliance strategy"]'::jsonb, '{"templates": ["GST Rate Matrix", "Applicability Guide"], "tools": ["Rate Finder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 10, 'ITC Optimization Strategies', 'Maximize Input Tax Credit through proper documentation and reconciliation.', '["Understand ITC rules", "Set up documentation", "Implement reconciliation", "Identify blocked credits"]'::jsonb, '{"templates": ["ITC Tracker", "Reconciliation Sheet"], "tools": ["ITC Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 11, 'E-Invoicing Implementation', 'Implement e-invoicing system compliant with latest GST requirements.', '["Check applicability", "Register on IRP", "Configure systems", "Test and go-live"]'::jsonb, '{"templates": ["E-Invoice Guide", "Testing Checklist"], "tools": ["E-Invoice Generator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'GST Return Filing Excellence', 'Master GST return filing with accurate data and timely submissions.', '["Understand return types", "Set filing calendar", "Prepare reconciliation", "Handle notices"]'::jsonb, '{"templates": ["Return Calendar", "Filing Checklist"], "tools": ["Return Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 4: Income Tax Compliance (Days 13-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Income Tax Compliance', 'Master income tax compliance including advance tax, TDS, and return filing', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 13, 'Corporate Tax Planning', 'Strategic tax planning to optimize corporate tax liability legally.', '["Understand tax structure", "Identify deductions", "Plan investments", "Optimize timing"]'::jsonb, '{"templates": ["Tax Planning Checklist", "Deduction Tracker"], "tools": ["Tax Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 14, 'TDS Compliance', 'Master TDS compliance including deduction, deposit, and return filing.', '["Map TDS requirements", "Set up deduction process", "Implement deposit tracking", "File quarterly returns"]'::jsonb, '{"templates": ["TDS Matrix", "Return Calendar"], "tools": ["TDS Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 15, 'Advance Tax Management', 'Plan and manage advance tax payments to avoid penalties.', '["Estimate annual income", "Calculate quarterly payments", "Track payments", "Manage variations"]'::jsonb, '{"templates": ["Advance Tax Calculator", "Payment Tracker"], "tools": ["Tax Estimator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Income Tax Return Filing', 'File accurate income tax returns with proper documentation.', '["Prepare computation", "Gather documents", "File return", "Handle scrutiny"]'::jsonb, '{"templates": ["Return Checklist", "Documentation Guide"], "tools": ["ITR Preparation Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 5: MCA Compliance (Days 17-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'MCA Compliance', 'Master Companies Act compliance and annual filing requirements', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 17, 'Companies Act Compliance Framework', 'Understand comprehensive Companies Act compliance requirements for your company.', '["Map compliance requirements", "Create compliance calendar", "Assign responsibilities", "Set up tracking"]'::jsonb, '{"templates": ["Compliance Matrix", "Calendar Template"], "tools": ["Compliance Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 18, 'Board Meeting Management', 'Conduct board meetings with proper notices, agendas, and documentation.', '["Plan meeting calendar", "Prepare board papers", "Record minutes", "Maintain registers"]'::jsonb, '{"templates": ["Board Pack Template", "Minutes Format"], "tools": ["Meeting Scheduler"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 19, 'Annual Filing Requirements', 'Complete all annual filing requirements including AOC-4 and MGT-7.', '["Prepare financial statements", "Draft director reports", "File annual returns", "Update registers"]'::jsonb, '{"templates": ["Filing Checklist", "Report Templates"], "tools": ["Filing Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 20, 'Event-Based Filings', 'Handle event-based filings for changes in directors, capital, and other events.', '["Identify filing triggers", "Prepare documentation", "File within timelines", "Update records"]'::jsonb, '{"templates": ["Event Filing Matrix", "Form Templates"], "tools": ["Event Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 6: Financial Planning & Analysis (Days 21-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Financial Planning & Analysis', 'Build FP&A capabilities for strategic decision making', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 21, 'Budgeting & Forecasting', 'Build comprehensive budgets and rolling forecasts for financial planning.', '["Create annual budget", "Implement rolling forecast", "Set up variance analysis", "Track vs actuals"]'::jsonb, '{"templates": ["Budget Template", "Forecast Model"], "tools": ["Budget Builder"]}'::jsonb, 75, 60, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 22, 'Financial Modeling', 'Build financial models for business planning and investor presentations.', '["Design model structure", "Build assumptions", "Create scenarios", "Validate outputs"]'::jsonb, '{"templates": ["Financial Model Template", "Assumption Library"], "tools": ["Model Builder"]}'::jsonb, 75, 60, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 23, 'Unit Economics Deep Dive', 'Master unit economics for sustainable business growth.', '["Calculate CAC and LTV", "Understand contribution margin", "Analyze cohorts", "Optimize unit economics"]'::jsonb, '{"templates": ["Unit Economics Calculator", "Cohort Analysis"], "tools": ["Metrics Dashboard"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 24, 'Scenario Planning', 'Develop scenario planning capabilities for strategic decision making.', '["Build base case", "Create upside/downside scenarios", "Identify triggers", "Plan responses"]'::jsonb, '{"templates": ["Scenario Template", "Decision Matrix"], "tools": ["Scenario Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 7: Investor Reporting (Days 25-28)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Investor Reporting', 'Build investor-grade reporting systems and dashboards', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 25, 'Investor Metrics Framework', 'Define and track metrics that matter to investors at each stage.', '["Identify key metrics", "Set up tracking", "Create benchmarks", "Monitor trends"]'::jsonb, '{"templates": ["Metrics Framework", "Benchmark Guide"], "tools": ["Metrics Dashboard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 26, 'Monthly Investor Updates', 'Create compelling monthly investor updates that build confidence.', '["Design update format", "Write effective narratives", "Include key metrics", "Highlight asks"]'::jsonb, '{"templates": ["Update Template", "Narrative Guide"], "tools": ["Update Generator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 27, 'Board Reporting', 'Prepare comprehensive board reporting packages for effective governance.', '["Design board pack", "Include financial analysis", "Prepare strategic updates", "Create discussion materials"]'::jsonb, '{"templates": ["Board Pack Template", "Financial Summary"], "tools": ["Pack Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 28, 'Financial Dashboards', 'Build real-time financial dashboards for management and investors.', '["Define KPIs", "Select dashboard tools", "Build visualizations", "Automate updates"]'::jsonb, '{"templates": ["Dashboard Template", "KPI Definitions"], "tools": ["Dashboard Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 8: Treasury Management (Days 29-32)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Treasury Management', 'Master cash management and treasury operations', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 29, 'Cash Flow Management', 'Implement comprehensive cash flow management for healthy liquidity.', '["Build cash flow forecast", "Optimize cash cycle", "Manage working capital", "Build reserves"]'::jsonb, '{"templates": ["Cash Flow Template", "WC Analyzer"], "tools": ["Cash Flow Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 30, 'Banking Relationships', 'Optimize banking relationships for better terms and services.', '["Evaluate banking partners", "Negotiate terms", "Optimize fee structure", "Access credit facilities"]'::jsonb, '{"templates": ["Bank Comparison", "Negotiation Guide"], "tools": ["Bank Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 31, 'Forex Management', 'Manage foreign exchange exposure for international transactions.', '["Understand forex exposure", "Implement hedging", "Optimize timing", "Track positions"]'::jsonb, '{"templates": ["Forex Tracker", "Hedging Guide"], "tools": ["Forex Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 32, 'Surplus Fund Investment', 'Invest surplus funds safely while maintaining liquidity.', '["Define investment policy", "Evaluate options", "Implement treasury bills/FDs", "Track returns"]'::jsonb, '{"templates": ["Investment Policy", "Options Comparison"], "tools": ["Return Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 9: Audit Preparation (Days 33-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Audit Preparation', 'Prepare for and manage statutory and internal audits', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 33, 'Statutory Audit Preparation', 'Prepare comprehensively for statutory audit to ensure clean reports.', '["Create audit checklist", "Prepare schedules", "Organize documentation", "Brief team"]'::jsonb, '{"templates": ["Audit Checklist", "Schedule Templates"], "tools": ["Audit Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 34, 'Tax Audit Requirements', 'Meet tax audit requirements under Section 44AB with proper documentation.', '["Check applicability", "Prepare Form 3CD", "Gather evidence", "Review with auditor"]'::jsonb, '{"templates": ["Tax Audit Guide", "Documentation Checklist"], "tools": ["Audit Preparation Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 35, 'Internal Audit Framework', 'Establish internal audit function for ongoing compliance and risk management.', '["Design audit plan", "Implement controls testing", "Report findings", "Track remediation"]'::jsonb, '{"templates": ["Internal Audit Plan", "Report Template"], "tools": ["Audit Management System"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 36, 'Audit Issue Management', 'Handle audit observations and implement remediation effectively.', '["Respond to observations", "Create action plans", "Implement remediation", "Track closure"]'::jsonb, '{"templates": ["Response Template", "Action Tracker"], "tools": ["Issue Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 10: Financial Risk Management (Days 37-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Financial Risk Management', 'Identify and manage financial risks proactively', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 37, 'Financial Risk Assessment', 'Identify and assess financial risks facing your startup.', '["Map risk categories", "Assess likelihood and impact", "Prioritize risks", "Create risk register"]'::jsonb, '{"templates": ["Risk Assessment Template", "Risk Register"], "tools": ["Risk Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 38, 'Credit Risk Management', 'Manage customer credit risk and collections effectively.', '["Implement credit policy", "Assess customer risk", "Monitor receivables", "Manage collections"]'::jsonb, '{"templates": ["Credit Policy", "Assessment Template"], "tools": ["Credit Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 39, 'Fraud Prevention', 'Implement controls to prevent and detect financial fraud.', '["Identify fraud risks", "Implement controls", "Set up monitoring", "Create response plan"]'::jsonb, '{"templates": ["Fraud Risk Assessment", "Control Framework"], "tools": ["Fraud Detection Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 40, 'Insurance Planning', 'Develop comprehensive insurance coverage for financial protection.', '["Assess insurance needs", "Evaluate options", "Optimize coverage", "Manage claims"]'::jsonb, '{"templates": ["Insurance Checklist", "Coverage Comparison"], "tools": ["Insurance Planner"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 11: Finance Team Building (Days 41-43)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'Finance Team Building', 'Build and manage an effective finance team', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 41, 'Finance Team Structure', 'Design optimal finance team structure for your stage and needs.', '["Define roles needed", "Create job descriptions", "Plan team growth", "Set reporting structure"]'::jsonb, '{"templates": ["Team Structure Template", "JD Library"], "tools": ["Org Designer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 42, 'Hiring Finance Talent', 'Hire the right finance talent for your startup stage.', '["Define hiring criteria", "Source candidates", "Conduct interviews", "Make offers"]'::jsonb, '{"templates": ["Interview Guide", "Assessment Template"], "tools": ["Candidate Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 43, 'Outsourcing vs In-house', 'Make smart decisions on outsourcing vs building in-house capabilities.', '["Evaluate functions", "Compare costs", "Select partners", "Manage relationships"]'::jsonb, '{"templates": ["Decision Matrix", "Vendor Comparison"], "tools": ["Cost Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 12: CFO Strategic Role (Days 44-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'CFO Strategic Role', 'Master the strategic aspects of the CFO role', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 44, 'Strategic Business Partnership', 'Act as a strategic business partner beyond traditional finance.', '["Understand business drivers", "Provide strategic insights", "Support decision making", "Drive profitability"]'::jsonb, '{"templates": ["Business Review Template", "Insight Framework"], "tools": ["Analysis Dashboard"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 45, 'Fundraising Support', 'Provide expert financial support for fundraising activities.', '["Prepare financial model", "Build data room", "Support due diligence", "Negotiate terms"]'::jsonb, '{"templates": ["Data Room Checklist", "Model Template"], "tools": ["Fundraising Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW());

END $$;

COMMIT;
