-- P3: Funding in India - Complete Mastery (Fixed)
-- 45 days, 12 modules, comprehensive funding guide
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
        'P3',
        'Funding in India - Complete Mastery',
        'Master the Indian funding ecosystem from government grants to venture capital. 45 days, 12 modules covering bootstrapping, grants, angel investment, VC funding, debt financing, and advanced instruments.',
        5999,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P3';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Funding Landscape (Days 1-4)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Understanding the Funding Landscape', 'Master the Indian startup funding ecosystem and assess your funding readiness', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'The Indian Funding Ecosystem', 'Comprehensive overview of the Indian startup funding landscape. Understand funding stages, investor types, and the current state of startup funding in India.', '["Map the funding ecosystem", "Identify relevant funding sources", "Understand funding stages", "Research recent funding trends"]'::jsonb, '{"templates": ["Funding Landscape Map", "Investor Type Guide"], "tools": ["Funding Stage Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Funding Readiness Assessment', 'Assess your startup''s readiness for different types of funding. Understand what investors look for at each stage.', '["Complete readiness assessment", "Identify gaps", "Create improvement plan", "Set funding timeline"]'::jsonb, '{"templates": ["Readiness Scorecard", "Gap Analysis Template"], "tools": ["Funding Readiness Quiz"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Funding Strategy Development', 'Develop a comprehensive funding strategy aligned with your business goals and stage.', '["Define funding requirements", "Choose funding path", "Create timeline", "Set milestones"]'::jsonb, '{"templates": ["Funding Strategy Template", "Milestone Tracker"], "tools": ["Strategy Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Building Your Funding Roadmap', 'Create a detailed 18-month funding roadmap with specific targets and action items.', '["Map funding milestones", "Set quarterly targets", "Plan investor outreach", "Create timeline"]'::jsonb, '{"templates": ["Funding Roadmap Template", "Quarterly Planning Sheet"], "tools": ["Roadmap Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 2: Bootstrapping Mastery (Days 5-8)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Bootstrapping Mastery', 'Master the art of building without external funding', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 5, 'The Bootstrapping Mindset', 'Develop the mindset and strategies for successful bootstrapping. Learn from profitable bootstrapped Indian startups.', '["Analyze bootstrapped success stories", "Calculate runway requirements", "Identify revenue opportunities", "Create lean operating model"]'::jsonb, '{"templates": ["Bootstrapping Playbook", "Case Study Pack"], "tools": ["Runway Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Revenue-First Business Models', 'Design business models that generate revenue from day one. Focus on cash flow positive operations.', '["Evaluate business model options", "Design revenue streams", "Plan for profitability", "Create pricing strategy"]'::jsonb, '{"templates": ["Revenue Model Canvas", "Pricing Calculator"], "tools": ["Business Model Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Cash Flow Management', 'Master cash flow management for bootstrapped startups. Extend runway through smart financial decisions.', '["Create cash flow forecast", "Optimize payment terms", "Manage working capital", "Build cash reserves"]'::jsonb, '{"templates": ["Cash Flow Forecast Template", "Working Capital Optimizer"], "tools": ["Cash Flow Dashboard"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Friends, Family & Founder Funding', 'Navigate personal network funding including best practices for F&F rounds.', '["Approach strategy for F&F", "Structure informal investments", "Create clear agreements", "Manage relationships"]'::jsonb, '{"templates": ["F&F Investment Agreement", "Conversation Guide"], "tools": ["F&F Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 3: Government Grants (Days 9-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Government Grants & Schemes', 'Access ₹20 lakhs to ₹5 crore through government funding programs', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 9, 'Startup India Benefits', 'Master the Startup India program including DPIIT recognition, tax benefits, and funding access.', '["Apply for DPIIT recognition", "Understand tax benefits", "Access funding schemes", "Leverage startup ecosystem"]'::jsonb, '{"templates": ["DPIIT Application Guide", "Benefits Calculator"], "tools": ["Eligibility Checker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 10, 'Central Government Schemes', 'Navigate central government schemes including SIDBI, NIDHI, and sector-specific programs.', '["Map relevant schemes", "Understand eligibility", "Prepare applications", "Track status"]'::jsonb, '{"templates": ["Scheme Comparison Matrix", "Application Templates"], "tools": ["Scheme Finder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 11, 'State Government Incentives', 'Leverage state-specific startup policies and incentives for maximum benefits.', '["Identify state benefits", "Apply for incentives", "Optimize location decisions", "Claim reimbursements"]'::jsonb, '{"templates": ["State-wise Benefits Guide", "Incentive Calculator"], "tools": ["State Benefit Finder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Grant Application Mastery', 'Master the art of writing winning grant applications with high success rates.', '["Structure grant proposal", "Write compelling narrative", "Prepare supporting documents", "Follow up effectively"]'::jsonb, '{"templates": ["Grant Proposal Template", "Supporting Docs Checklist"], "tools": ["Proposal Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 4: Angel Investment (Days 13-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Angel Investment Strategies', 'Raise ₹25 lakhs to ₹2 crore from angel investors', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 13, 'Understanding Angel Investors', 'Learn what angel investors look for and how to identify the right angels for your startup.', '["Research angel investor profiles", "Identify target angels", "Understand investment thesis", "Map angel networks"]'::jsonb, '{"templates": ["Angel Investor Database", "Profile Template"], "tools": ["Angel Matcher"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 14, 'Angel Network Navigation', 'Navigate Indian angel networks including Mumbai Angels, Indian Angel Network, and regional groups.', '["Join angel networks", "Understand application process", "Prepare for screening", "Build relationships"]'::jsonb, '{"templates": ["Network Comparison Guide", "Application Checklist"], "tools": ["Network Finder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 15, 'Angel Pitch Preparation', 'Create compelling pitches for angel investors with focus on early traction and founder story.', '["Craft angel pitch deck", "Prepare one-pager", "Practice elevator pitch", "Anticipate questions"]'::jsonb, '{"templates": ["Angel Pitch Deck Template", "One-Pager Format"], "tools": ["Pitch Practice Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Angel Deal Structuring', 'Structure angel deals with proper documentation and founder-friendly terms.', '["Understand term sheet basics", "Negotiate valuation", "Structure investment rounds", "Complete documentation"]'::jsonb, '{"templates": ["Angel Term Sheet Template", "SAFE Agreement"], "tools": ["Valuation Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 5: Pre-Seed & Seed Funding (Days 17-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Pre-Seed & Seed Funding', 'Raise your first institutional round of ₹50 lakhs to ₹5 crore', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 17, 'Pre-Seed Fundamentals', 'Understand pre-seed funding landscape and what it takes to raise your first check.', '["Define pre-seed requirements", "Identify pre-seed investors", "Prepare for due diligence", "Set realistic expectations"]'::jsonb, '{"templates": ["Pre-Seed Checklist", "Investor Database"], "tools": ["Stage Assessment Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 18, 'Seed Stage Investors', 'Navigate the seed-stage investor landscape including micro VCs, seed funds, and accelerators.', '["Map seed investors", "Understand focus areas", "Research portfolio companies", "Identify warm introductions"]'::jsonb, '{"templates": ["Seed Investor Matrix", "Outreach Tracker"], "tools": ["Investor Finder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 19, 'Seed Pitch Deck Mastery', 'Create an investor-ready seed pitch deck that tells your story and showcases potential.', '["Build compelling narrative", "Structure pitch deck", "Include key metrics", "Design for impact"]'::jsonb, '{"templates": ["Seed Pitch Deck Template", "Metrics Dashboard"], "tools": ["Deck Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 20, 'Accelerators & Incubators', 'Leverage accelerators and incubators for funding, mentorship, and network access.', '["Evaluate accelerator options", "Prepare applications", "Maximize program benefits", "Build lasting relationships"]'::jsonb, '{"templates": ["Accelerator Comparison", "Application Guide"], "tools": ["Program Finder"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 6: Series A Preparation (Days 21-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Series A Preparation', 'Prepare for and raise Series A funding of ₹5 crore to ₹30 crore', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 21, 'Series A Readiness', 'Assess and build Series A readiness with product-market fit and growth metrics.', '["Evaluate PMF indicators", "Build Series A metrics", "Identify gaps", "Create improvement plan"]'::jsonb, '{"templates": ["Series A Readiness Scorecard", "Metrics Template"], "tools": ["PMF Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 22, 'Series A Investor Targeting', 'Identify and research Series A investors aligned with your sector and stage.', '["Build target investor list", "Research investment thesis", "Map decision makers", "Plan outreach strategy"]'::jsonb, '{"templates": ["Series A Investor Database", "Research Template"], "tools": ["Investor Matcher"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 23, 'Series A Pitch Deck', 'Create a comprehensive Series A pitch deck that demonstrates traction and scale potential.', '["Structure Series A narrative", "Showcase metrics and growth", "Build financial model", "Design professional deck"]'::jsonb, '{"templates": ["Series A Pitch Template", "Financial Model"], "tools": ["Deck Analyzer"]}'::jsonb, 75, 60, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 24, 'Series A Process Management', 'Manage the Series A process from first meeting to term sheet signing.', '["Plan fundraising timeline", "Manage multiple conversations", "Navigate term sheet negotiation", "Coordinate closing"]'::jsonb, '{"templates": ["Process Tracker", "Timeline Template"], "tools": ["Deal Flow Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 7: Growth Stage Funding (Days 25-28)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Growth Stage Funding', 'Navigate Series B, C, and beyond for scaling your startup', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 25, 'Series B & Beyond', 'Understand the dynamics of growth-stage funding and what investors expect at each stage.', '["Define growth metrics", "Understand Series B requirements", "Plan capital allocation", "Set growth targets"]'::jsonb, '{"templates": ["Growth Stage Guide", "Metrics Framework"], "tools": ["Stage Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 26, 'Growth Stage Investors', 'Navigate the growth-stage investor landscape including growth funds, PE firms, and strategics.', '["Map growth investors", "Understand investment criteria", "Build relationships early", "Plan long-term partnerships"]'::jsonb, '{"templates": ["Growth Investor Database", "Relationship Tracker"], "tools": ["Investor Finder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 27, 'International Investors', 'Access international capital from global VCs and growth funds investing in India.', '["Identify global investors", "Understand cross-border dynamics", "Prepare for international DD", "Navigate foreign investment rules"]'::jsonb, '{"templates": ["Global Investor List", "FEMA Compliance Guide"], "tools": ["Cross-border Calculator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 28, 'Strategic Investments', 'Leverage strategic investors including corporate VCs and industry partners.', '["Identify strategic fit", "Approach corporate VCs", "Structure strategic partnerships", "Balance strategic vs financial"]'::jsonb, '{"templates": ["Strategic Investor Matrix", "Partnership Agreement"], "tools": ["Strategic Fit Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 8: Debt Financing (Days 29-32)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Debt Financing', 'Access non-dilutive capital through various debt instruments', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 29, 'Debt Financing Landscape', 'Understand the debt financing options available for startups including banks, NBFCs, and alternative lenders.', '["Map debt options", "Understand eligibility criteria", "Compare interest rates", "Evaluate collateral requirements"]'::jsonb, '{"templates": ["Debt Options Matrix", "Comparison Calculator"], "tools": ["Debt Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 30, 'Venture Debt', 'Access venture debt from specialized lenders to extend runway without dilution.', '["Understand venture debt terms", "Identify venture debt providers", "Evaluate timing and fit", "Negotiate terms"]'::jsonb, '{"templates": ["Venture Debt Guide", "Term Comparison Sheet"], "tools": ["Debt Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 31, 'Revenue-Based Financing', 'Explore revenue-based financing and other alternative debt instruments.', '["Evaluate RBF providers", "Understand repayment terms", "Calculate effective cost", "Compare with equity"]'::jsonb, '{"templates": ["RBF Comparison Guide", "Cost Calculator"], "tools": ["RBF Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 32, 'Working Capital Management', 'Optimize working capital through credit facilities and supplier financing.', '["Set up credit facilities", "Negotiate payment terms", "Optimize working capital cycle", "Manage cash conversion"]'::jsonb, '{"templates": ["Working Capital Template", "Credit Facility Tracker"], "tools": ["WC Optimizer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 9: Advanced Instruments (Days 33-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Advanced Funding Instruments', 'Master convertible notes, SAFEs, and other advanced instruments', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 33, 'Convertible Notes', 'Master convertible note structures including terms, caps, and conversion mechanics.', '["Understand CN mechanics", "Evaluate terms", "Negotiate favorable terms", "Plan conversion scenarios"]'::jsonb, '{"templates": ["Convertible Note Template", "Terms Glossary"], "tools": ["CN Calculator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 34, 'SAFE Agreements', 'Navigate SAFE (Simple Agreement for Future Equity) structures for fast fundraising.', '["Understand SAFE types", "Evaluate valuation caps", "Compare with convertible notes", "Use SAFE effectively"]'::jsonb, '{"templates": ["SAFE Template Pack", "Comparison Guide"], "tools": ["SAFE Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 35, 'Term Sheet Negotiation', 'Master the art of term sheet negotiation with investor-favorable and founder-friendly terms.', '["Understand all term sheet provisions", "Identify negotiable terms", "Plan negotiation strategy", "Avoid common mistakes"]'::jsonb, '{"templates": ["Term Sheet Template", "Negotiation Playbook"], "tools": ["Term Sheet Analyzer"]}'::jsonb, 75, 60, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 36, 'Cap Table Management', 'Manage your cap table effectively through multiple funding rounds.', '["Set up cap table", "Model dilution scenarios", "Plan ESOP pool", "Prepare for future rounds"]'::jsonb, '{"templates": ["Cap Table Template", "Dilution Calculator"], "tools": ["Cap Table Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 10: Due Diligence (Days 37-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Due Diligence Mastery', 'Prepare for and navigate investor due diligence successfully', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 37, 'Due Diligence Preparation', 'Prepare comprehensive due diligence documentation before starting fundraise.', '["Create DD checklist", "Organize documentation", "Address potential red flags", "Build data room"]'::jsonb, '{"templates": ["DD Checklist", "Documentation Guide"], "tools": ["DD Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 38, 'Financial Due Diligence', 'Navigate financial due diligence with audit-ready books and clear metrics.', '["Prepare financial statements", "Document key metrics", "Address financial queries", "Explain variances"]'::jsonb, '{"templates": ["Financial DD Pack", "Metrics Template"], "tools": ["Financial Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 39, 'Legal Due Diligence', 'Prepare for legal due diligence covering corporate, IP, contracts, and compliance.', '["Organize legal documents", "Review compliance status", "Address pending issues", "Prepare disclosure schedule"]'::jsonb, '{"templates": ["Legal DD Checklist", "Disclosure Template"], "tools": ["Legal DD Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 40, 'Technical Due Diligence', 'Navigate technical due diligence for tech startups including code review and architecture assessment.', '["Prepare tech documentation", "Review code quality", "Document architecture", "Address security concerns"]'::jsonb, '{"templates": ["Tech DD Guide", "Architecture Template"], "tools": ["Tech Assessment Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 11: Investor Relations (Days 41-43)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'Investor Relations', 'Build and maintain strong investor relationships post-funding', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 41, 'Post-Funding Reporting', 'Set up effective investor reporting cadence and communication systems.', '["Design reporting template", "Set reporting cadence", "Define key metrics", "Create dashboard"]'::jsonb, '{"templates": ["Investor Update Template", "Metrics Dashboard"], "tools": ["Report Generator"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 42, 'Board Management', 'Manage board meetings, documentation, and investor relationships effectively.', '["Plan board meetings", "Prepare board materials", "Manage board dynamics", "Handle difficult conversations"]'::jsonb, '{"templates": ["Board Deck Template", "Meeting Agenda"], "tools": ["Board Portal"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 43, 'Leveraging Investor Network', 'Maximize value from investor relationships beyond capital.', '["Map investor network", "Request strategic introductions", "Leverage investor expertise", "Build long-term relationships"]'::jsonb, '{"templates": ["Network Mapping Guide", "Introduction Request"], "tools": ["Network Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 12: Exit Planning (Days 44-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'Exit Planning', 'Plan for successful exits including M&A and IPO', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 44, 'Exit Options & Planning', 'Understand exit options including M&A, IPO, and secondary sales and plan accordingly.', '["Evaluate exit options", "Understand timelines", "Plan exit readiness", "Build exit strategy"]'::jsonb, '{"templates": ["Exit Planning Guide", "Timeline Template"], "tools": ["Exit Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 45, 'Exit Execution', 'Execute exit transactions successfully with proper preparation and professional support.', '["Prepare exit documentation", "Engage advisors", "Manage process", "Negotiate terms"]'::jsonb, '{"templates": ["Exit Checklist", "Advisor Selection Guide"], "tools": ["Exit Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW());

END $$;

COMMIT;
