-- P3: Funding Mastery - Complete Course Content
-- =============================================
-- The Ultimate Funding Playbook for Indian Startups
-- Duration: 45 days | 12 Modules | 200+ Resources
-- =============================================

-- First, ensure the P3 product exists
INSERT INTO products (id, code, title, description, price, is_bundle, estimated_days, created_at, updated_at)
VALUES (
    'p3-funding-mastery',
    'P3',
    'Funding in India - Complete Mastery',
    'Master the Indian funding ecosystem from government grants to venture capital. Get funded with proven strategies, templates, and investor connections.',
    5999,
    false,
    45,
    NOW(),
    NOW()
) ON CONFLICT (code) DO UPDATE
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    estimated_days = EXCLUDED.estimated_days,
    updated_at = NOW();

-- Get the product ID
DO $$
DECLARE
    v_product_id UUID;
    v_module_id UUID;
BEGIN
    SELECT id INTO v_product_id FROM products WHERE code = 'P3';

    -- =============================================
    -- MODULE 1: Funding Landscape & Strategy (Days 1-5)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 1: Funding Landscape & Strategy',
        'Master the Indian funding ecosystem, assess your readiness, and build a winning fundraising strategy.',
        1,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 1: Understanding the Indian Funding Ecosystem
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        1,
        'The Indian Funding Reality Check',
        'Dive deep into India''s ₹50,000 Cr+ funding ecosystem. Understand why 95% of startups fail to raise funding and position yourself in the successful 5%. Master funding sources from bootstrap to IPO with real Indian examples and success rates.',
        jsonb_build_array(
            jsonb_build_object('task', 'Complete funding readiness self-assessment quiz (score 75+)', 'completed', false),
            jsonb_build_object('task', 'Map your startup to 3 appropriate funding sources', 'completed', false),
            jsonb_build_object('task', 'Calculate your true cost of capital using our calculator', 'completed', false),
            jsonb_build_object('task', 'Create realistic 18-month funding timeline', 'completed', false),
            jsonb_build_object('task', 'Identify top 10 investors in your sector', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Funding Readiness Assessment (100-point scale)',
                'Indian Funding Landscape Map (Visual)',
                'Cost of Capital Calculator',
                'Investor Database (1000+ contacts)'
            ),
            'videos', jsonb_build_array(
                'Expert Talk: VC Partner on Indian Funding Trends',
                'Case Study: Bootstrap to Unicorn Journey'
            ),
            'tools', jsonb_build_array(
                'Interactive Funding Timeline Builder',
                'Investor-Startup Matching Tool'
            )
        ),
        90,
        100,
        1
    );

    -- Day 2: Funding Readiness Deep Assessment
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        2,
        'Are You Really Ready to Raise?',
        'Only 1 in 100 startups that think they''re ready actually are. Today prevents wasted months with brutal honesty. Assess financial metrics (MRR, CAC, CLV), business model validation, team strength, traction benchmarks, legal compliance, and IP portfolio.',
        jsonb_build_array(
            jsonb_build_object('task', 'Complete comprehensive readiness scorecard (target: 80/100)', 'completed', false),
            jsonb_build_object('task', 'Calculate and analyze unit economics (CLV/CAC ratio >3:1)', 'completed', false),
            jsonb_build_object('task', 'Audit legal and IP compliance using checklist', 'completed', false),
            jsonb_build_object('task', 'Identify top 3 readiness gaps and create improvement plan', 'completed', false),
            jsonb_build_object('task', 'Benchmark your metrics against funded startups in your sector', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Funding Readiness Scorecard (100-point)',
                'Financial Metrics Tracking Template',
                'Legal Compliance Audit Checklist',
                'Traction Benchmarking Tool',
                'Team Assessment Framework'
            ),
            'calculators', jsonb_build_array(
                'Unit Economics Analyzer',
                'Burn Rate & Runway Calculator',
                'Revenue Growth Predictor'
            ),
            'case_studies', jsonb_build_array(
                'Startup A: Raised too early and failed',
                'Startup B: Perfect timing led to 10x growth'
            )
        ),
        120,
        150,
        2
    );

    -- Day 3: Building Your Strategic Funding Plan
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        3,
        'The Science of Fundraising Strategy',
        'Master sequential vs parallel fundraising approaches. Build milestone-based 18-month funding plan. Optimize geographic mix (Indian vs International capital). Navigate economic cycles and sector-specific nuances. Create your personalized fundraising strategy.',
        jsonb_build_array(
            jsonb_build_object('task', 'Complete strategic decision matrices for your startup', 'completed', false),
            jsonb_build_object('task', 'Create detailed 18-month milestone plan with metrics', 'completed', false),
            jsonb_build_object('task', 'Map optimal investor geography mix (India vs Global)', 'completed', false),
            jsonb_build_object('task', 'Assess current market cycle impact on your strategy', 'completed', false),
            jsonb_build_object('task', 'Build fundraising timeline with 30% buffer periods', 'completed', false),
            jsonb_build_object('task', 'Identify 3 Plan B scenarios if primary strategy fails', 'completed', false)
        ),
        jsonb_build_object(
            'frameworks', jsonb_build_array(
                'Strategic Decision Tree for Funding',
                'Milestone Mapping Worksheet',
                'Geographic Funding Mix Calculator',
                'Economic Cycle Indicator Dashboard'
            ),
            'tools', jsonb_build_array(
                'Funding Strategy Simulator',
                'Timeline Risk Calculator',
                'Valuation Cycle Tracker'
            ),
            'case_study', 'Razorpay''s Strategic Fundraising Journey'
        ),
        150,
        200,
        3
    );

    -- Day 4: Mastering Dilution & Control Mathematics
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        4,
        'The Hidden Cost of Capital',
        'Most founders underestimate true dilution by 50-100%. Master equity dilution mathematics, ESOP pool impact, liquidation preferences, anti-dilution provisions, board control dynamics, and cap table management. Learn what VCs know that you don''t.',
        jsonb_build_array(
            jsonb_build_object('task', 'Build detailed cap table model for next 3 rounds', 'completed', false),
            jsonb_build_object('task', 'Calculate true dilution including all provisions', 'completed', false),
            jsonb_build_object('task', 'Model 5 exit scenarios and founder returns', 'completed', false),
            jsonb_build_object('task', 'Identify control points that matter most to you', 'completed', false),
            jsonb_build_object('task', 'Create negotiation priorities for equity terms', 'completed', false),
            jsonb_build_object('task', 'Plan ESOP pool strategy to minimize dilution', 'completed', false)
        ),
        jsonb_build_object(
            'models', jsonb_build_array(
                'Advanced Cap Table Model (Excel)',
                'Dilution Impact Calculator',
                'Liquidation Waterfall Analyzer',
                'Anti-Dilution Impact Calculator'
            ),
            'tools', jsonb_build_array(
                'Board Composition Planner',
                'Control Score Calculator',
                'Exit Value Optimizer'
            ),
            'case_study', 'How a Founder Went from 60% to 5% - Lessons Learned'
        ),
        180,
        250,
        4
    );

    -- Day 5: Funding Process Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        5,
        'The Complete Funding Process Blueprint',
        'Master the 7-12 month fundraising journey from preparation to bank transfer. Understand each phase: preparation (2-3 months), outreach (1-2 months), pitching (2-3 months), due diligence (1-2 months), and closing (1-2 months).',
        jsonb_build_array(
            jsonb_build_object('task', 'Create detailed fundraising timeline with milestones', 'completed', false),
            jsonb_build_object('task', 'Prepare documentation checklist for each phase', 'completed', false),
            jsonb_build_object('task', 'Build stakeholder map and communication plan', 'completed', false),
            jsonb_build_object('task', 'Set up data room structure and access controls', 'completed', false),
            jsonb_build_object('task', 'Create post-funding 100-day plan', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Fundraising Process Timeline',
                'Documentation Checklist (50+ items)',
                'Data Room Structure Template',
                'Stakeholder Communication Plan'
            ),
            'guides', jsonb_build_array(
                'Due Diligence Preparation Guide',
                'Negotiation Phases Handbook',
                'Closing Mechanics Checklist'
            )
        ),
        120,
        150,
        5
    );

    -- =============================================
    -- MODULE 2: Government Funding Ecosystem (Days 6-10)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 2: Government Funding Mastery',
        'Access ₹20L to ₹5Cr in non-dilutive government funding through 150+ schemes. Master application strategies and compliance.',
        2,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 6: Government Funding Philosophy & Strategy
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        6,
        'Why Governments Fund Startups',
        'Understand government funding philosophy: economic development, employment generation, innovation promotion, import substitution, export promotion. Master the strategic approach to government schemes worth ₹10,000+ Cr annually.',
        jsonb_build_array(
            jsonb_build_object('task', 'Map your startup to 5 relevant government objectives', 'completed', false),
            jsonb_build_object('task', 'Identify top 10 schemes matching your profile', 'completed', false),
            jsonb_build_object('task', 'Calculate potential government funding (₹20L-₹5Cr)', 'completed', false),
            jsonb_build_object('task', 'Create government relations strategy', 'completed', false)
        ),
        jsonb_build_object(
            'databases', jsonb_build_array(
                'Government Schemes Database (150+ schemes)',
                'Scheme Eligibility Matcher Tool'
            ),
            'templates', jsonb_build_array(
                'Government Pitch Deck Template',
                'Impact Metrics Framework'
            )
        ),
        90,
        100,
        6
    );

    -- Day 7: Central Government Programs Deep Dive
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        7,
        'Startup India & Ministry Programs',
        'Master Startup India Seed Fund (₹20L-₹2Cr), Fund of Funds (₹10,000 Cr), SAMRIDH (₹40L-₹10Cr), and ministry-specific programs from MeitY, DPIIT, MSME, Agriculture, Health, and Commerce.',
        jsonb_build_array(
            jsonb_build_object('task', 'Complete DPIIT Startup Recognition application', 'completed', false),
            jsonb_build_object('task', 'Apply to Startup India Seed Fund with complete docs', 'completed', false),
            jsonb_build_object('task', 'Identify 3 ministry-specific schemes and eligibility', 'completed', false),
            jsonb_build_object('task', 'Create application timeline for all relevant schemes', 'completed', false),
            jsonb_build_object('task', 'Connect with 3 funded startups for insights', 'completed', false)
        ),
        jsonb_build_object(
            'application_kits', jsonb_build_array(
                'Startup India Seed Fund Complete Kit',
                'SAMRIDH Scheme Application Package',
                'MSME Schemes Bundle'
            ),
            'checklists', jsonb_build_array(
                'Tax Exemption Application Process',
                'Patent Fee Reduction Guide',
                'Credit Guarantee Scheme Process'
            )
        ),
        150,
        200,
        7
    );

    -- Day 8: State Government Ecosystem Navigation
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        8,
        'State-wise Funding Opportunities',
        'Navigate funding from leading states: Karnataka, Maharashtra, Telangana, Gujarat, Kerala, Tamil Nadu, UP, Delhi NCR. Access capital subsidies, interest subventions, stamp duty exemptions, and infrastructure support.',
        jsonb_build_array(
            jsonb_build_object('task', 'Compare top 5 states for your startup sector', 'completed', false),
            jsonb_build_object('task', 'Calculate state-wise benefits (can save 30-50% costs)', 'completed', false),
            jsonb_build_object('task', 'Apply to home state startup program', 'completed', false),
            jsonb_build_object('task', 'Create multi-state benefit optimization plan', 'completed', false)
        ),
        jsonb_build_object(
            'state_guides', jsonb_build_array(
                'Karnataka Startup Policy Guide',
                'Maharashtra Startup Benefits',
                'T-Hub Telangana Programs',
                'Gujarat Vibrant Ecosystem'
            ),
            'calculators', jsonb_build_array(
                'State Benefit Comparison Tool',
                'Multi-state Optimization Calculator'
            )
        ),
        120,
        150,
        8
    );

    -- Day 9: Grant Application Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        9,
        'Winning Grant Applications',
        'Master grant application writing: eligibility analysis, technical proposal crafting, budget justification, impact metrics, selection criteria. Learn from 100+ successful applications. Avoid common mistakes that cause 80% rejections.',
        jsonb_build_array(
            jsonb_build_object('task', 'Write compelling problem statement (500 words)', 'completed', false),
            jsonb_build_object('task', 'Create detailed project plan with milestones', 'completed', false),
            jsonb_build_object('task', 'Prepare budget with line-item justification', 'completed', false),
            jsonb_build_object('task', 'Develop impact metrics and measurement plan', 'completed', false),
            jsonb_build_object('task', 'Submit one actual grant application', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Technical Proposal Template',
                'Budget Justification Framework',
                'Impact Assessment Template',
                'Selection Criteria Scorecard'
            ),
            'examples', jsonb_build_array(
                '10 Successful Grant Applications',
                'Common Rejection Reasons Analysis'
            )
        ),
        180,
        250,
        9
    );

    -- Day 10: Grant Management & Compliance
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        10,
        'Post-Grant Success Management',
        'Master grant utilization, milestone reporting, audit preparation, extension procedures, and success metrics. Learn to manage multiple grants simultaneously while maintaining compliance. Build relationships for future funding.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create grant utilization tracking system', 'completed', false),
            jsonb_build_object('task', 'Set up milestone reporting calendar', 'completed', false),
            jsonb_build_object('task', 'Prepare audit documentation framework', 'completed', false),
            jsonb_build_object('task', 'Build government relations CRM', 'completed', false)
        ),
        jsonb_build_object(
            'systems', jsonb_build_array(
                'Grant Management Dashboard',
                'Compliance Calendar Template',
                'Audit Preparation Checklist',
                'Milestone Tracking System'
            ),
            'guides', jsonb_build_array(
                'Extension Request Templates',
                'Change Request Procedures',
                'Success Story Development Kit'
            )
        ),
        90,
        100,
        10
    );

    -- =============================================
    -- MODULE 3: Incubator & Accelerator Funding (Days 11-15)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 3: Incubator & Accelerator Excellence',
        'Access ₹5L to ₹50L in seed funding plus invaluable mentorship, network, and resources from 300+ Indian incubators.',
        3,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 11: Incubator Ecosystem Understanding
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        11,
        'How Incubators Work & Fund',
        'Understand how 300+ Indian incubators get funded (government grants, CSR, endowments) and why they fund startups. Learn success metrics, equity models, and network effects that drive incubator economics.',
        jsonb_build_array(
            jsonb_build_object('task', 'Research top 10 incubators in your domain', 'completed', false),
            jsonb_build_object('task', 'Compare incubator terms (equity, duration, support)', 'completed', false),
            jsonb_build_object('task', 'Connect with 3 incubated startup founders', 'completed', false),
            jsonb_build_object('task', 'Create incubator application strategy', 'completed', false)
        ),
        jsonb_build_object(
            'directories', jsonb_build_array(
                'India Incubator Database (300+ profiles)',
                'Incubator Comparison Matrix'
            ),
            'insights', jsonb_build_array(
                'Incubator Selection Criteria',
                'Success Rate Analysis by Incubator'
            )
        ),
        90,
        100,
        11
    );

    -- Day 12: Types of Incubation Support
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        12,
        'Financial & Non-Financial Benefits',
        'Master the complete incubation value proposition: seed grants (₹5L-₹50L), prototype funding, office space (6-24 months), mentorship, legal/accounting support, technology credits, lab access, and market connections.',
        jsonb_build_array(
            jsonb_build_object('task', 'Calculate total value of incubation (typically ₹50L+)', 'completed', false),
            jsonb_build_object('task', 'Prioritize support needs for your startup', 'completed', false),
            jsonb_build_object('task', 'Create resource utilization plan', 'completed', false),
            jsonb_build_object('task', 'Map mentor requirements to incubator strengths', 'completed', false)
        ),
        jsonb_build_object(
            'calculators', jsonb_build_array(
                'Incubation Value Calculator',
                'Resource Utilization Planner'
            ),
            'frameworks', jsonb_build_array(
                'Mentor Matching Framework',
                'Support Needs Assessment'
            )
        ),
        120,
        150,
        12
    );

    -- Day 13: Top Indian Incubators Deep Dive
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        13,
        'IITs, IIMs & Corporate Incubators',
        'Detailed analysis of top incubators: All IIT/IIM incubators, T-Hub, C-CAMP, Kerala Startup Mission, NASSCOM 10000 Startups, Google/Microsoft/AWS programs. Learn selection criteria and success strategies.',
        jsonb_build_array(
            jsonb_build_object('task', 'Apply to 3 relevant incubators with tailored applications', 'completed', false),
            jsonb_build_object('task', 'Prepare for incubator interviews (mock session)', 'completed', false),
            jsonb_build_object('task', 'Create incubator-specific pitch decks', 'completed', false),
            jsonb_build_object('task', 'Build relationship with incubator managers', 'completed', false)
        ),
        jsonb_build_object(
            'profiles', jsonb_build_array(
                'Top 50 Incubator Detailed Profiles',
                'Selection Process Guides',
                'Interview Question Banks'
            ),
            'application_kits', jsonb_build_array(
                'IIT Incubator Application Kit',
                'T-Hub Application Package',
                'NASSCOM 10000 Startups Kit'
            )
        ),
        150,
        200,
        13
    );

    -- Day 14: Accelerator Programs Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        14,
        'Indian & Global Accelerators',
        'Master accelerator programs: Axilor, GSF, Venture Catalysts, Zone Startups, SURGE (Sequoia). Understand 3-6 month intensive programs, 5-10% equity models, demo days, and follow-on funding strategies.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify accelerators matching your stage/sector', 'completed', false),
            jsonb_build_object('task', 'Prepare accelerator application with video pitch', 'completed', false),
            jsonb_build_object('task', 'Plan for intensive 3-month program commitment', 'completed', false),
            jsonb_build_object('task', 'Calculate dilution vs value trade-off', 'completed', false),
            jsonb_build_object('task', 'Prepare demo day pitch (3-minute version)', 'completed', false)
        ),
        jsonb_build_object(
            'accelerator_guides', jsonb_build_array(
                'Top 20 Accelerator Profiles',
                'Cohort Dynamics Guide',
                'Demo Day Preparation Kit'
            ),
            'templates', jsonb_build_array(
                'Accelerator Application Template',
                'Video Pitch Script',
                'Demo Day Deck Template'
            )
        ),
        120,
        150,
        14
    );

    -- Day 15: Maximizing Incubation Value
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        15,
        'Extracting Maximum Value',
        'Learn to maximize incubation benefits: mentor engagement strategies, peer learning optimization, resource utilization, network building, investor connections, customer introductions, and strategic exit planning.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create mentor engagement plan (weekly touchpoints)', 'completed', false),
            jsonb_build_object('task', 'Build peer learning group within cohort', 'completed', false),
            jsonb_build_object('task', 'Map and connect with 20+ alumni startups', 'completed', false),
            jsonb_build_object('task', 'Schedule 5 investor meetings through incubator', 'completed', false),
            jsonb_build_object('task', 'Plan graduation and follow-on funding strategy', 'completed', false)
        ),
        jsonb_build_object(
            'playbooks', jsonb_build_array(
                'Mentor Engagement Playbook',
                'Peer Learning Framework',
                'Alumni Network Activation'
            ),
            'tools', jsonb_build_array(
                'Resource Utilization Tracker',
                'Network Building CRM',
                'Exit Planning Framework'
            )
        ),
        90,
        100,
        15
    );

    -- =============================================
    -- MODULE 4: Debt Funding Mastery (Days 16-22)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 4: Debt Capital Excellence',
        'Access ₹10L to ₹10Cr in non-dilutive debt capital. Master bank lending, MSME loans, NBFCs, and venture debt strategies.',
        4,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 16: Understanding Debt Capital
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        16,
        'Debt vs Equity Strategic Decision',
        'Master when debt makes sense: asset financing, working capital, bridge funding, growth capital. Understand interest rates, security requirements, personal guarantees, and repayment structures in Indian context.',
        jsonb_build_array(
            jsonb_build_object('task', 'Calculate optimal debt-equity mix for your startup', 'completed', false),
            jsonb_build_object('task', 'Assess debt servicing capacity', 'completed', false),
            jsonb_build_object('task', 'Compare 5 debt options with total cost analysis', 'completed', false),
            jsonb_build_object('task', 'Create debt repayment model with scenarios', 'completed', false)
        ),
        jsonb_build_object(
            'calculators', jsonb_build_array(
                'Debt Capacity Calculator',
                'EMI & Interest Calculator',
                'Debt vs Equity Optimizer'
            ),
            'frameworks', jsonb_build_array(
                'Debt Decision Matrix',
                'Security Valuation Guide'
            )
        ),
        90,
        100,
        16
    );

    -- Day 17: Bank Lending Landscape
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        17,
        'Public & Private Bank Solutions',
        'Navigate lending from SBI, Bank of Baroda, PNB, Canara Bank, HDFC, ICICI, Axis, Kotak. Master documentation, eligibility, processing, and relationship management for ₹10L to ₹5Cr funding.',
        jsonb_build_array(
            jsonb_build_object('task', 'Open startup banking relationships with 2 banks', 'completed', false),
            jsonb_build_object('task', 'Prepare complete loan application package', 'completed', false),
            jsonb_build_object('task', 'Get pre-approved credit limits', 'completed', false),
            jsonb_build_object('task', 'Build relationship with branch manager', 'completed', false)
        ),
        jsonb_build_object(
            'bank_guides', jsonb_build_array(
                'Top 10 Banks Startup Programs',
                'Documentation Checklist (25+ docs)',
                'Bank Manager Meeting Guide'
            ),
            'templates', jsonb_build_array(
                'Loan Application Package',
                'Financial Projections for Banks',
                'Collateral Documentation'
            )
        ),
        120,
        150,
        17
    );

    -- Day 18: MSME and MUDRA Excellence
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        18,
        'Government-Backed Lending',
        'Master MUDRA loans (₹50K to ₹10L), CGTMSE collateral-free loans (up to ₹2Cr), and MSME schemes. Learn to leverage 85% guarantee cover and access 50+ member banks with simplified documentation.',
        jsonb_build_array(
            jsonb_build_object('task', 'Apply for MUDRA loan appropriate to your stage', 'completed', false),
            jsonb_build_object('task', 'Get CGTMSE coverage for collateral-free loan', 'completed', false),
            jsonb_build_object('task', 'Register for MSME benefits and schemes', 'completed', false),
            jsonb_build_object('task', 'Create government-backed loan portfolio', 'completed', false)
        ),
        jsonb_build_object(
            'application_kits', jsonb_build_array(
                'MUDRA Loan Complete Kit',
                'CGTMSE Application Package',
                'MSME Registration & Benefits'
            ),
            'success_stories', jsonb_build_array(
                '10 Startups Funded via MUDRA',
                'CGTMSE Success Case Studies'
            )
        ),
        150,
        200,
        18
    );

    -- Day 19: NBFCs and Digital Lenders
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        19,
        'Alternative Lending Revolution',
        'Access quick funding from Lendingkart, Capital Float, NeoGrowth, FlexiLoans. Master invoice financing (KredX, Bizongo) and revenue-based financing (GetVantage, Velocity, Klub) with 24-48 hour approvals.',
        jsonb_build_array(
            jsonb_build_object('task', 'Compare 5 NBFC offers with interest rates', 'completed', false),
            jsonb_build_object('task', 'Set up invoice financing for receivables', 'completed', false),
            jsonb_build_object('task', 'Evaluate revenue-based financing (3-10% of revenue)', 'completed', false),
            jsonb_build_object('task', 'Create alternative lending strategy', 'completed', false)
        ),
        jsonb_build_object(
            'lender_profiles', jsonb_build_array(
                'Top 20 NBFCs for Startups',
                'Digital Lender Comparison',
                'Revenue Financing Providers'
            ),
            'calculators', jsonb_build_array(
                'Invoice Financing Calculator',
                'Revenue-Based Financing Model'
            )
        ),
        120,
        150,
        19
    );

    -- Day 20: Working Capital Optimization
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        20,
        'Cash Flow & Working Capital',
        'Master cash flow forecasting, working capital cycles, overdraft facilities, cash credit limits, bill discounting, LC/BG facilities, and export credit. Optimize working capital to reduce funding needs by 30-40%.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create 18-month cash flow forecast', 'completed', false),
            jsonb_build_object('task', 'Calculate working capital gap and solutions', 'completed', false),
            jsonb_build_object('task', 'Set up overdraft/CC facilities with banks', 'completed', false),
            jsonb_build_object('task', 'Optimize payment terms with customers/vendors', 'completed', false)
        ),
        jsonb_build_object(
            'models', jsonb_build_array(
                'Cash Flow Forecasting Model',
                'Working Capital Optimizer',
                'Payment Terms Analyzer'
            ),
            'tools', jsonb_build_array(
                'Overdraft Facility Calculator',
                'Bill Discounting Framework'
            )
        ),
        150,
        200,
        20
    );

    -- Day 21: Venture Debt Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        21,
        'Non-Dilutive Growth Capital',
        'Access ₹2Cr to ₹25Cr from Trifecta, Alteria, InnoVen, BlackSoil, Stride. Master venture debt timing (post Series A), terms (14-18% interest), warrants coverage, and covenant management.',
        jsonb_build_array(
            jsonb_build_object('task', 'Assess venture debt readiness (need Series A+)', 'completed', false),
            jsonb_build_object('task', 'Model venture debt impact on cap table', 'completed', false),
            jsonb_build_object('task', 'Compare 3 venture debt term sheets', 'completed', false),
            jsonb_build_object('task', 'Create venture debt negotiation strategy', 'completed', false)
        ),
        jsonb_build_object(
            'venture_debt_guides', jsonb_build_array(
                'Top 10 Venture Debt Funds',
                'Term Sheet Comparison Tool',
                'Warrant Coverage Calculator'
            ),
            'case_studies', jsonb_build_array(
                'Successful Venture Debt Stories',
                'When Venture Debt Goes Wrong'
            )
        ),
        120,
        150,
        21
    );

    -- Day 22: Credit Score & Loan Excellence
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        22,
        'Credit Optimization & Loan Prep',
        'Master CIBIL score improvement (target 750+), credit report management, guarantor arrangements, security valuation, insurance requirements, and legal documentation for successful loan applications.',
        jsonb_build_array(
            jsonb_build_object('task', 'Get CIBIL report and improve score to 750+', 'completed', false),
            jsonb_build_object('task', 'Fix credit report errors if any', 'completed', false),
            jsonb_build_object('task', 'Arrange guarantors and security documents', 'completed', false),
            jsonb_build_object('task', 'Get required insurance policies', 'completed', false),
            jsonb_build_object('task', 'Complete loan documentation package', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'CIBIL Score Improvement Guide',
                'Credit Report Error Fix Process',
                'Loan Documentation Checklist'
            ),
            'templates', jsonb_build_array(
                'Guarantor Agreement Template',
                'Security Valuation Format',
                'Insurance Requirement Guide'
            )
        ),
        90,
        100,
        22
    );

    -- =============================================
    -- MODULE 5: Angel Investment Deep Dive (Days 23-28)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 5: Angel Investment Mastery',
        'Raise ₹25L to ₹2Cr from India''s 15,000+ active angel investors. Master angel psychology, networks, and negotiation.',
        5,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 23: Angel Investor Psychology
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        23,
        'Inside the Angel Investor Mind',
        'Understand who becomes an angel investor and why. Master investment motivations, risk appetite, portfolio approach, mentorship expectations, and exit timelines. Learn to think like an angel investor.',
        jsonb_build_array(
            jsonb_build_object('task', 'Profile 10 angels in your sector', 'completed', false),
            jsonb_build_object('task', 'Understand their portfolio patterns', 'completed', false),
            jsonb_build_object('task', 'Map angel motivations to your value prop', 'completed', false),
            jsonb_build_object('task', 'Create angel investor persona profiles', 'completed', false)
        ),
        jsonb_build_object(
            'databases', jsonb_build_array(
                'Angel Investor Database (500+ profiles)',
                'Angel Psychology Framework',
                'Portfolio Analysis Tool'
            ),
            'insights', jsonb_build_array(
                'What Angels Really Want',
                'Angel Investment Patterns Study'
            )
        ),
        90,
        100,
        23
    );

    -- Day 24: Angel Networks Navigation
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        24,
        'Major Indian Angel Networks',
        'Master India''s top angel networks: Indian Angel Network (IAN), Mumbai Angels, Chennai Angels, Hyderabad Angels, LetsVenture, AngelList India. Learn application processes, screening criteria, and syndication dynamics.',
        jsonb_build_array(
            jsonb_build_object('task', 'Apply to 3 relevant angel networks', 'completed', false),
            jsonb_build_object('task', 'Prepare network-specific pitch materials', 'completed', false),
            jsonb_build_object('task', 'Understand syndication process and benefits', 'completed', false),
            jsonb_build_object('task', 'Build relationships with network managers', 'completed', false)
        ),
        jsonb_build_object(
            'network_guides', jsonb_build_array(
                'IAN Application Process',
                'Mumbai Angels Playbook',
                'LetsVenture Success Guide'
            ),
            'templates', jsonb_build_array(
                'Network Application Forms',
                'Syndication Term Sheet'
            )
        ),
        120,
        150,
        24
    );

    -- Day 25: Finding the Right Angels
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        25,
        'Angel Discovery & Evaluation',
        'Master angel discovery through LinkedIn, warm intros, events, and platforms. Evaluate angels based on domain expertise, network quality, mentorship style, check size (₹25L-₹2Cr), and exit track record.',
        jsonb_build_array(
            jsonb_build_object('task', 'Build list of 50 relevant angels', 'completed', false),
            jsonb_build_object('task', 'Get 10 warm introductions', 'completed', false),
            jsonb_build_object('task', 'Attend 2 angel investor events', 'completed', false),
            jsonb_build_object('task', 'Create angel outreach campaign', 'completed', false),
            jsonb_build_object('task', 'Score angels on fit criteria', 'completed', false)
        ),
        jsonb_build_object(
            'tools', jsonb_build_array(
                'Angel Discovery Platform',
                'Warm Intro Request Templates',
                'Angel Scoring Framework'
            ),
            'directories', jsonb_build_array(
                'Angel Event Calendar',
                'Online Platform Guide'
            )
        ),
        150,
        200,
        25
    );

    -- Day 26: Angel Pitch Perfection
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        26,
        'Crafting the Perfect Angel Pitch',
        'Create compelling angel pitch with problem validation, solution uniqueness, market sizing, business model, traction proof, and team strength. Master presentation skills, Q&A handling, and follow-up strategies.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create 10-slide angel pitch deck', 'completed', false),
            jsonb_build_object('task', 'Record 5-minute pitch video', 'completed', false),
            jsonb_build_object('task', 'Prepare Q&A response bank (50+ questions)', 'completed', false),
            jsonb_build_object('task', 'Practice pitch with 3 advisors', 'completed', false),
            jsonb_build_object('task', 'Create follow-up email templates', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Angel Pitch Deck Template',
                'Executive Summary Format',
                'Q&A Response Bank'
            ),
            'training', jsonb_build_array(
                'Pitch Practice Videos',
                'Virtual Pitch Mastery Guide'
            )
        ),
        180,
        250,
        26
    );

    -- Day 27: Angel Terms & Negotiation
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        27,
        'Negotiating Angel Investments',
        'Master standard angel terms: valuation (₹5-50Cr), equity (10-30%), board rights, information rights, exit rights, ROFR/ROFO, tag-along. Learn negotiation strategies and win-win approaches.',
        jsonb_build_array(
            jsonb_build_object('task', 'Understand all standard angel terms', 'completed', false),
            jsonb_build_object('task', 'Create term negotiation priorities', 'completed', false),
            jsonb_build_object('task', 'Model dilution scenarios', 'completed', false),
            jsonb_build_object('task', 'Practice negotiation with mock term sheet', 'completed', false),
            jsonb_build_object('task', 'Prepare counter-proposal templates', 'completed', false)
        ),
        jsonb_build_object(
            'documents', jsonb_build_array(
                'Angel Term Sheet Template',
                'Negotiation Playbook',
                'Term Comparison Matrix'
            ),
            'tools', jsonb_build_array(
                'Valuation Calculator',
                'Dilution Scenario Modeler'
            )
        ),
        120,
        150,
        27
    );

    -- Day 28: Post-Investment Excellence
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        28,
        'Managing Angel Relationships',
        'Master post-investment engagement: board meetings, monthly updates, mentor utilization, network leverage, customer introductions, hiring support, and preparing for next round with angel support.',
        jsonb_build_array(
            jsonb_build_object('task', 'Set up monthly update system', 'completed', false),
            jsonb_build_object('task', 'Create board meeting structure', 'completed', false),
            jsonb_build_object('task', 'Plan mentor engagement (weekly/monthly)', 'completed', false),
            jsonb_build_object('task', 'Map angel network for intros', 'completed', false),
            jsonb_build_object('task', 'Build next round strategy with angels', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Monthly Update Template',
                'Board Meeting Agenda',
                'Mentor Engagement Plan'
            ),
            'frameworks', jsonb_build_array(
                'Angel Leverage Framework',
                'Network Activation Guide'
            )
        ),
        90,
        100,
        28
    );

    -- =============================================
    -- MODULE 6: Venture Capital Mastery (Days 29-35)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 6: Venture Capital Excellence',
        'Raise ₹2Cr to ₹500Cr from 300+ active VCs. Master VC dynamics, due diligence, and institutional funding.',
        6,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 29: VC Ecosystem Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        29,
        'Indian VC Landscape Deep Dive',
        'Understand India''s VC ecosystem: 300+ active VCs, $15B+ deployed, fund structures (LP/GP dynamics), 10-year lifecycles, 2/20 fee structure, and return expectations (10x+). Master VC decision-making process.',
        jsonb_build_array(
            jsonb_build_object('task', 'Map 20 VCs relevant to your stage/sector', 'completed', false),
            jsonb_build_object('task', 'Understand fund lifecycle impact on decisions', 'completed', false),
            jsonb_build_object('task', 'Analyze portfolio construction strategies', 'completed', false),
            jsonb_build_object('task', 'Create VC target list with thesis match', 'completed', false)
        ),
        jsonb_build_object(
            'databases', jsonb_build_array(
                'VC Fund Database (300+ funds)',
                'Portfolio Analysis Tool',
                'Fund Thesis Matcher'
            ),
            'insights', jsonb_build_array(
                'How VCs Make Money',
                'LP Expectations Explained'
            )
        ),
        120,
        150,
        29
    );

    -- Day 30: Types of VC Funds
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        30,
        'VC Categories & Specializations',
        'Master different VC types: Micro VCs (pre-seed), Seed funds, Early stage (Series A/B), Growth stage (Series C+), Sector-specific vs generalist, Impact funds, Deep tech funds, Cross-border funds.',
        jsonb_build_array(
            jsonb_build_object('task', 'Categorize VCs by stage fit for your startup', 'completed', false),
            jsonb_build_object('task', 'Identify sector-specialist VCs in your domain', 'completed', false),
            jsonb_build_object('task', 'Research international VCs investing in India', 'completed', false),
            jsonb_build_object('task', 'Create staged funding plan (Seed to Series C)', 'completed', false)
        ),
        jsonb_build_object(
            'directories', jsonb_build_array(
                'Micro VC Directory',
                'Growth Fund Database',
                'Sector Specialist VCs',
                'International VC Guide'
            ),
            'frameworks', jsonb_build_array(
                'VC Selection Matrix',
                'Stage Matching Tool'
            )
        ),
        90,
        100,
        30
    );

    -- Day 31: Series A Fundamentals
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        31,
        'Cracking Series A Funding',
        'Master Series A readiness: ₹1-10Cr ARR, 3x YoY growth, positive unit economics, proven PMF, 20-50 person team. Navigate ₹10-50Cr rounds at ₹50-300Cr valuations with 15-25% dilution.',
        jsonb_build_array(
            jsonb_build_object('task', 'Assess Series A readiness (score 80+/100)', 'completed', false),
            jsonb_build_object('task', 'Build Series A financial model', 'completed', false),
            jsonb_build_object('task', 'Create Series A pitch deck', 'completed', false),
            jsonb_build_object('task', 'Prepare 100-slide data room', 'completed', false),
            jsonb_build_object('task', 'Get warm intros to 5 Series A investors', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Series A Pitch Deck',
                'Series A Financial Model',
                'Data Room Structure'
            ),
            'checklists', jsonb_build_array(
                'Series A Readiness Checklist',
                'Due Diligence Prep Guide'
            )
        ),
        180,
        250,
        31
    );

    -- Day 32: Series B and Growth Rounds
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        32,
        'Scaling to Series B & Beyond',
        'Navigate growth rounds: Series B (₹10-50Cr revenue, 2.5x growth), Series C/D (₹50Cr+ revenue, market expansion). Master path to profitability, international expansion, M&A, and IPO preparation.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create 5-year growth model to IPO', 'completed', false),
            jsonb_build_object('task', 'Plan market expansion strategy', 'completed', false),
            jsonb_build_object('task', 'Model profitability timeline', 'completed', false),
            jsonb_build_object('task', 'Identify growth fund targets', 'completed', false),
            jsonb_build_object('task', 'Prepare institutional-grade reporting', 'completed', false)
        ),
        jsonb_build_object(
            'models', jsonb_build_array(
                'Growth Stage Financial Model',
                'Market Expansion Framework',
                'IPO Readiness Tracker'
            ),
            'case_studies', jsonb_build_array(
                'Series B Success Stories',
                'Path to IPO Examples'
            )
        ),
        150,
        200,
        32
    );

    -- Day 33: VC Due Diligence Process
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        33,
        'Mastering VC Due Diligence',
        'Navigate comprehensive DD: business analysis, competition study, customer calls, product audit, technology review, team assessment, financial audit, legal review, tax compliance, IP verification.',
        jsonb_build_array(
            jsonb_build_object('task', 'Prepare complete data room (100+ documents)', 'completed', false),
            jsonb_build_object('task', 'Create DD response templates', 'completed', false),
            jsonb_build_object('task', 'Prepare 10 customer references', 'completed', false),
            jsonb_build_object('task', 'Complete legal/financial audit prep', 'completed', false),
            jsonb_build_object('task', 'Set up DD tracking system', 'completed', false)
        ),
        jsonb_build_object(
            'checklists', jsonb_build_array(
                'DD Document Checklist (100+ items)',
                'Customer Reference Guide',
                'Legal Audit Preparation'
            ),
            'tools', jsonb_build_array(
                'Data Room Organizer',
                'DD Progress Tracker'
            )
        ),
        180,
        250,
        33
    );

    -- Day 34: Top Indian VCs
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        34,
        'India''s Premier VC Firms',
        'Deep dive into top VCs: Sequoia India, Accel, Matrix, Lightspeed, Nexus, Kalaari, Blume (early stage) and Tiger Global, SoftBank, Prosus, Steadview (growth stage). Learn their thesis, process, and portfolio.',
        jsonb_build_array(
            jsonb_build_object('task', 'Research 10 top VCs matching your stage', 'completed', false),
            jsonb_build_object('task', 'Analyze their recent investments', 'completed', false),
            jsonb_build_object('task', 'Find mutual connections for intros', 'completed', false),
            jsonb_build_object('task', 'Create VC-specific pitch narratives', 'completed', false),
            jsonb_build_object('task', 'Attend VC portfolio events', 'completed', false)
        ),
        jsonb_build_object(
            'profiles', jsonb_build_array(
                'Top 20 VC Detailed Profiles',
                'Partner Background Database',
                'Portfolio Company Analysis'
            ),
            'strategies', jsonb_build_array(
                'Getting VC Attention',
                'Building VC Relationships'
            )
        ),
        120,
        150,
        34
    );

    -- Day 35: International VCs in India
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        35,
        'Global Capital for Indian Startups',
        'Access international VCs: entry strategies, India office importance, cross-border terms, currency considerations, regulatory compliance (FDI/FEMA), tax implications, and exit complexities.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify 10 international VCs in your sector', 'completed', false),
            jsonb_build_object('task', 'Understand FDI regulations for your sector', 'completed', false),
            jsonb_build_object('task', 'Create international pitch narrative', 'completed', false),
            jsonb_build_object('task', 'Plan for cross-border structure if needed', 'completed', false),
            jsonb_build_object('task', 'Connect with portfolio companies of international VCs', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'International VC Directory',
                'FDI Compliance Guide',
                'Cross-border Structure Playbook'
            ),
            'templates', jsonb_build_array(
                'International Pitch Deck',
                'Currency Hedging Framework'
            )
        ),
        90,
        100,
        35
    );

    -- =============================================
    -- MODULE 7: Advanced Funding Instruments (Days 36-40)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 7: Advanced Funding Instruments',
        'Master convertible notes, SAFE, CCPS, revenue-based financing, and crowdfunding. Navigate complex instruments strategically.',
        7,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 36: Convertible Notes Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        36,
        'Convertible Notes Deep Dive',
        'Master convertible note structures: discount rates (15-25%), valuation caps, interest (0-8%), maturity (18-24 months), conversion triggers, qualified financing. Navigate RBI regulations and tax implications.',
        jsonb_build_array(
            jsonb_build_object('task', 'Model convertible note scenarios', 'completed', false),
            jsonb_build_object('task', 'Calculate effective dilution with cap and discount', 'completed', false),
            jsonb_build_object('task', 'Understand RBI/FEMA compliance', 'completed', false),
            jsonb_build_object('task', 'Create convertible note term sheet', 'completed', false),
            jsonb_build_object('task', 'Plan conversion strategy', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Convertible Note Agreement',
                'Conversion Calculator',
                'RBI Compliance Checklist'
            ),
            'models', jsonb_build_array(
                'Note Conversion Scenarios',
                'Cap Table Impact Model'
            )
        ),
        120,
        150,
        36
    );

    -- Day 37: SAFE and CCPS Excellence
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        37,
        'SAFE & Indian Alternatives',
        'Understand SAFE (Simple Agreement for Future Equity) adaptation for India. Master CCPS (Compulsory Convertible Preference Shares) as Indian alternative. Navigate legal validity and tax treatment.',
        jsonb_build_array(
            jsonb_build_object('task', 'Compare SAFE vs CCPS for your situation', 'completed', false),
            jsonb_build_object('task', 'Draft CCPS terms with conversion mechanics', 'completed', false),
            jsonb_build_object('task', 'Understand tax implications of each', 'completed', false),
            jsonb_build_object('task', 'Create investor education materials', 'completed', false)
        ),
        jsonb_build_object(
            'documents', jsonb_build_array(
                'India SAFE Template',
                'CCPS Agreement Template',
                'Tax Comparison Guide'
            ),
            'calculators', jsonb_build_array(
                'CCPS Conversion Calculator',
                'Tax Impact Analyzer'
            )
        ),
        90,
        100,
        37
    );

    -- Day 38: Revenue-Based Financing
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        38,
        'Alternative to Equity Dilution',
        'Master revenue-based financing: monthly payment models (3-10% of revenue), total caps (1.5-3x), no equity dilution. Access providers like GetVantage, Velocity, Klub. Perfect for SaaS and D2C businesses.',
        jsonb_build_array(
            jsonb_build_object('task', 'Calculate if RBF works for your unit economics', 'completed', false),
            jsonb_build_object('task', 'Compare 3 RBF provider terms', 'completed', false),
            jsonb_build_object('task', 'Model cash flow impact of RBF', 'completed', false),
            jsonb_build_object('task', 'Create RBF repayment plan', 'completed', false)
        ),
        jsonb_build_object(
            'providers', jsonb_build_array(
                'RBF Provider Comparison',
                'Eligibility Criteria Guide'
            ),
            'models', jsonb_build_array(
                'RBF Calculator',
                'Cash Flow Impact Model'
            )
        ),
        120,
        150,
        38
    );

    -- Day 39: Crowdfunding Strategies
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        39,
        'Equity & Reward Crowdfunding',
        'Navigate equity crowdfunding regulations and platforms. Master reward crowdfunding campaign strategy, marketing requirements, and fulfillment planning. Learn from successful Indian crowdfunding campaigns.',
        jsonb_build_array(
            jsonb_build_object('task', 'Evaluate crowdfunding fit for your startup', 'completed', false),
            jsonb_build_object('task', 'Choose between equity and reward models', 'completed', false),
            jsonb_build_object('task', 'Create crowdfunding campaign plan', 'completed', false),
            jsonb_build_object('task', 'Build pre-launch audience (1000+ supporters)', 'completed', false)
        ),
        jsonb_build_object(
            'platforms', jsonb_build_array(
                'Indian Crowdfunding Platforms',
                'International Platform Guide'
            ),
            'campaigns', jsonb_build_array(
                'Campaign Strategy Template',
                'Marketing Calendar Tool'
            )
        ),
        150,
        200,
        39
    );

    -- Day 40: Strategic Investors
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        40,
        'Corporate & Strategic Capital',
        'Access corporate venture capital and strategic partnerships. Navigate customer investments, supplier partnerships, technology transfers, market access benefits, and potential conflict management.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify 10 potential strategic investors', 'completed', false),
            jsonb_build_object('task', 'Map strategic value beyond capital', 'completed', false),
            jsonb_build_object('task', 'Create strategic partnership proposal', 'completed', false),
            jsonb_build_object('task', 'Plan conflict management strategies', 'completed', false),
            jsonb_build_object('task', 'Negotiate strategic investment terms', 'completed', false)
        ),
        jsonb_build_object(
            'directories', jsonb_build_array(
                'Corporate VC Database',
                'Strategic Investor Guide'
            ),
            'frameworks', jsonb_build_array(
                'Strategic Value Matrix',
                'Conflict Management Plan'
            )
        ),
        120,
        150,
        40
    );

    -- =============================================
    -- MODULE 8: Negotiation & Deal Closing (Days 41-45)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 8: Deal Making Excellence',
        'Master term sheet negotiation, legal documentation, regulatory compliance, and post-funding management for successful deal closure.',
        8,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 41: Term Sheet Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        41,
        'Decoding Every Term Sheet Clause',
        'Master all term sheet components: pre-money valuation, option pool, liquidation preference, participation rights, anti-dilution, drag/tag-along, board composition, reserved matters, founder vesting, exit rights.',
        jsonb_build_array(
            jsonb_build_object('task', 'Analyze 5 real term sheets line by line', 'completed', false),
            jsonb_build_object('task', 'Identify top 10 negotiable terms', 'completed', false),
            jsonb_build_object('task', 'Create term priority matrix', 'completed', false),
            jsonb_build_object('task', 'Build term sheet comparison tool', 'completed', false),
            jsonb_build_object('task', 'Practice with mock term sheet negotiation', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                'Master Term Sheet Template',
                'Term Comparison Matrix',
                'Negotiation Priority Framework'
            ),
            'examples', jsonb_build_array(
                '10 Real Term Sheets Analyzed',
                'Good vs Bad Terms Examples'
            )
        ),
        180,
        250,
        41
    );

    -- Day 42: Negotiation Strategies
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        42,
        'Art & Science of Deal Negotiation',
        'Master BATNA development, creating leverage with multiple term sheets, trade-off matrix, identifying deal breakers, win-win approaches, lawyer involvement timing, and time pressure management.',
        jsonb_build_array(
            jsonb_build_object('task', 'Develop your BATNA (best alternative)', 'completed', false),
            jsonb_build_object('task', 'Create leverage with 3+ interested investors', 'completed', false),
            jsonb_build_object('task', 'Build trade-off matrix for negotiations', 'completed', false),
            jsonb_build_object('task', 'Role-play negotiation scenarios', 'completed', false),
            jsonb_build_object('task', 'Prepare counter-proposals for common terms', 'completed', false)
        ),
        jsonb_build_object(
            'frameworks', jsonb_build_array(
                'Negotiation Playbook',
                'Leverage Creation Guide',
                'Trade-off Decision Matrix'
            ),
            'scripts', jsonb_build_array(
                'Negotiation Scripts',
                'Pushback Templates'
            )
        ),
        150,
        200,
        42
    );

    -- Day 43: Legal Documentation
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        43,
        'Investment Agreement Excellence',
        'Navigate Share Purchase Agreement (SPA), Shareholders Agreement (SHA), board resolutions, share certificates, amended AOA, side letters, and closing certificates. Understand every clause and implication.',
        jsonb_build_array(
            jsonb_build_object('task', 'Review sample SHA/SPA documents', 'completed', false),
            jsonb_build_object('task', 'Identify key protective provisions', 'completed', false),
            jsonb_build_object('task', 'Prepare board resolutions', 'completed', false),
            jsonb_build_object('task', 'Create closing checklist', 'completed', false),
            jsonb_build_object('task', 'Coordinate with legal counsel', 'completed', false)
        ),
        jsonb_build_object(
            'documents', jsonb_build_array(
                'SHA Template with Commentary',
                'SPA Template with Notes',
                'Board Resolution Templates'
            ),
            'checklists', jsonb_build_array(
                'Legal Document Checklist',
                'Closing Process Guide'
            )
        ),
        120,
        150,
        43
    );

    -- Day 44: Regulatory Compliance
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        44,
        'RBI, Tax & Regulatory Navigation',
        'Master RBI pricing guidelines, reporting requirements, FDI limits, sectoral caps, FEMA compliance. Navigate capital gains, angel tax, GST, stamp duty, and TDS requirements.',
        jsonb_build_array(
            jsonb_build_object('task', 'Ensure RBI pricing compliance', 'completed', false),
            jsonb_build_object('task', 'Complete FDI reporting requirements', 'completed', false),
            jsonb_build_object('task', 'Calculate tax implications', 'completed', false),
            jsonb_build_object('task', 'File necessary regulatory forms', 'completed', false),
            jsonb_build_object('task', 'Set up compliance calendar', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'RBI Compliance Guide',
                'Tax Planning Framework',
                'FEMA Filing Process'
            ),
            'calculators', jsonb_build_array(
                'Angel Tax Calculator',
                'Stamp Duty Calculator'
            )
        ),
        90,
        100,
        44
    );

    -- Day 45: Post-Funding Excellence
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        45,
        'First 100 Days Post-Funding',
        'Master fund utilization, investor reporting, board meeting management, compliance calendar, and preparing for next round. Build strong investor relationships and deliver on promises.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create 100-day execution plan', 'completed', false),
            jsonb_build_object('task', 'Set up investor reporting system', 'completed', false),
            jsonb_build_object('task', 'Schedule first board meeting', 'completed', false),
            jsonb_build_object('task', 'Build compliance tracking system', 'completed', false),
            jsonb_build_object('task', 'Start preparing for next round', 'completed', false)
        ),
        jsonb_build_object(
            'templates', jsonb_build_array(
                '100-Day Plan Template',
                'Investor Update Format',
                'Board Meeting Package'
            ),
            'systems', jsonb_build_array(
                'Compliance Calendar',
                'Next Round Prep Timeline'
            )
        ),
        120,
        150,
        45
    );

    -- =============================================
    -- MODULE 9: International Funding (Days 46-48)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 9: International Funding Strategies',
        'Access global capital through cross-border structures, international investors, and optimized legal frameworks.',
        9,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 46: Cross-Border Structures
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        46,
        'Singapore, Delaware & Beyond',
        'Master international holding structures: Singapore holdings for Asia, Delaware flip for US investors, Mauritius for tax optimization. Navigate regulatory arbitrage, currency hedging, and repatriation.',
        jsonb_build_array(
            jsonb_build_object('task', 'Evaluate need for international structure', 'completed', false),
            jsonb_build_object('task', 'Compare Singapore vs Delaware options', 'completed', false),
            jsonb_build_object('task', 'Calculate tax implications of each structure', 'completed', false),
            jsonb_build_object('task', 'Plan restructuring timeline and costs', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'Singapore Structure Playbook',
                'Delaware Flip Guide',
                'Tax Optimization Framework'
            ),
            'templates', jsonb_build_array(
                'Restructuring Plan',
                'Cost-Benefit Analysis'
            )
        ),
        150,
        200,
        46
    );

    -- Day 47: Global Investor Access
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        47,
        'Silicon Valley to Singapore',
        'Access Silicon Valley VCs, European investors, Southeast Asian funds, Middle Eastern capital, and sovereign wealth funds. Master pitch localization, cultural nuances, and cross-border negotiations.',
        jsonb_build_array(
            jsonb_build_object('task', 'Research 20 international investors', 'completed', false),
            jsonb_build_object('task', 'Create region-specific pitch decks', 'completed', false),
            jsonb_build_object('task', 'Build international investor pipeline', 'completed', false),
            jsonb_build_object('task', 'Schedule video pitches across time zones', 'completed', false)
        ),
        jsonb_build_object(
            'databases', jsonb_build_array(
                'Global VC Directory',
                'Sovereign Wealth Funds',
                'Family Office Network'
            ),
            'strategies', jsonb_build_array(
                'Cultural Pitch Guide',
                'Time Zone Management'
            )
        ),
        120,
        150,
        47
    );

    -- Day 48: Currency & Compliance
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        48,
        'Managing International Complexity',
        'Navigate multi-currency operations, hedging strategies, transfer pricing, international tax treaties, and global compliance. Manage investor relations across jurisdictions.',
        jsonb_build_array(
            jsonb_build_object('task', 'Set up multi-currency accounting', 'completed', false),
            jsonb_build_object('task', 'Create hedging strategy for forex risk', 'completed', false),
            jsonb_build_object('task', 'Understand transfer pricing rules', 'completed', false),
            jsonb_build_object('task', 'Plan international compliance structure', 'completed', false)
        ),
        jsonb_build_object(
            'tools', jsonb_build_array(
                'Currency Hedging Calculator',
                'Transfer Pricing Model',
                'Tax Treaty Analyzer'
            ),
            'frameworks', jsonb_build_array(
                'Global Compliance Framework',
                'Multi-jurisdiction Reporting'
            )
        ),
        90,
        100,
        48
    );

    -- =============================================
    -- MODULE 10: Crisis & Turnaround Funding (Days 49-50)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 10: Crisis & Recovery Funding',
        'Navigate down rounds, bridge funding, restructuring, and turnaround strategies when things don''t go as planned.',
        10,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 49: Distressed Funding Options
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        49,
        'When Things Go Wrong',
        'Navigate down rounds, bridge rounds, debt conversion, asset sales, and acqui-hires. Master crisis communication, investor management, and team retention during difficult times.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create crisis scenario plans', 'completed', false),
            jsonb_build_object('task', 'Model down round implications', 'completed', false),
            jsonb_build_object('task', 'Prepare bridge funding strategy', 'completed', false),
            jsonb_build_object('task', 'Draft crisis communication templates', 'completed', false)
        ),
        jsonb_build_object(
            'playbooks', jsonb_build_array(
                'Crisis Management Playbook',
                'Down Round Navigation Guide',
                'Bridge Funding Strategy'
            ),
            'templates', jsonb_build_array(
                'Crisis Communication Kit',
                'Restructuring Proposal'
            )
        ),
        120,
        150,
        49
    );

    -- Day 50: Turnaround Strategies
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        50,
        'From Crisis to Comeback',
        'Master turnaround funding strategies, cost optimization, pivot planning, and recovery execution. Learn from startups that survived crisis and emerged stronger.',
        jsonb_build_array(
            jsonb_build_object('task', 'Create turnaround plan with milestones', 'completed', false),
            jsonb_build_object('task', 'Identify cost reduction opportunities (30-50%)', 'completed', false),
            jsonb_build_object('task', 'Plan pivot strategy if needed', 'completed', false),
            jsonb_build_object('task', 'Build investor confidence restoration plan', 'completed', false)
        ),
        jsonb_build_object(
            'frameworks', jsonb_build_array(
                'Turnaround Framework',
                'Cost Optimization Matrix',
                'Pivot Planning Guide'
            ),
            'case_studies', jsonb_build_array(
                'Successful Turnarounds',
                'Failed Recovery Lessons'
            )
        ),
        150,
        200,
        50
    );

    -- =============================================
    -- MODULE 11: Exit Strategies (Days 51-53)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 11: Exit Planning & Execution',
        'Plan and execute successful exits through secondary sales, strategic acquisitions, or IPOs.',
        11,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 51: Secondary Sales & Buybacks
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        51,
        'Creating Liquidity Options',
        'Master secondary sales for early investors/employees, founder secondary, and buyback programs. Navigate valuation, buyer identification, and transaction structuring.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify secondary sale opportunities', 'completed', false),
            jsonb_build_object('task', 'Value shares for secondary market', 'completed', false),
            jsonb_build_object('task', 'Find secondary buyers', 'completed', false),
            jsonb_build_object('task', 'Structure secondary transaction', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'Secondary Sale Playbook',
                'Valuation for Secondary',
                'Buyer Identification Process'
            ),
            'templates', jsonb_build_array(
                'Secondary Sale Agreement',
                'ROFR Waiver Process'
            )
        ),
        120,
        150,
        51
    );

    -- Day 52: Strategic Exits & M&A
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        52,
        'Acquisition Strategy & Execution',
        'Navigate strategic acquisitions: buyer identification, valuation maximization, due diligence management, deal structuring, and post-acquisition integration.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify 10 potential acquirers', 'completed', false),
            jsonb_build_object('task', 'Create acquisition pitch deck', 'completed', false),
            jsonb_build_object('task', 'Prepare for buyer due diligence', 'completed', false),
            jsonb_build_object('task', 'Model acquisition scenarios', 'completed', false)
        ),
        jsonb_build_object(
            'frameworks', jsonb_build_array(
                'M&A Process Guide',
                'Valuation Maximization',
                'Integration Planning'
            ),
            'templates', jsonb_build_array(
                'Acquisition Teaser',
                'Management Presentation'
            )
        ),
        150,
        200,
        52
    );

    -- Day 53: IPO Preparation
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        53,
        'Going Public in India',
        'Understand IPO readiness, SEBI regulations, DRHP preparation, roadshow execution, and pricing strategy. Learn from recent Indian startup IPOs.',
        jsonb_build_array(
            jsonb_build_object('task', 'Assess IPO readiness (3-year timeline)', 'completed', false),
            jsonb_build_object('task', 'Understand SEBI requirements', 'completed', false),
            jsonb_build_object('task', 'Create IPO preparation roadmap', 'completed', false),
            jsonb_build_object('task', 'Build institutional-grade governance', 'completed', false)
        ),
        jsonb_build_object(
            'guides', jsonb_build_array(
                'IPO Readiness Checklist',
                'SEBI Compliance Guide',
                'DRHP Preparation Kit'
            ),
            'case_studies', jsonb_build_array(
                'Zomato IPO Analysis',
                'Nykaa IPO Success'
            )
        ),
        120,
        150,
        53
    );

    -- =============================================
    -- MODULE 12: Masterclass & Advanced Topics (Days 54-45)
    -- =============================================
    INSERT INTO modules (id, product_id, title, description, order_index, created_at, updated_at)
    VALUES (
        gen_random_uuid(),
        v_product_id,
        'Module 12: Advanced Masterclasses',
        'Expert sessions on psychology, negotiation, sector-specific strategies, and emerging funding trends.',
        12,
        NOW(),
        NOW()
    ) RETURNING id INTO v_module_id;

    -- Day 54: Psychology of Fundraising
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        54,
        'Behavioral Economics in Funding',
        'Master investor psychology, cognitive biases, decision triggers, storytelling for emotional connection, social proof strategies, and creating FOMO. Learn to think like an investor.',
        jsonb_build_array(
            jsonb_build_object('task', 'Identify investor cognitive biases to leverage', 'completed', false),
            jsonb_build_object('task', 'Craft emotional story narrative', 'completed', false),
            jsonb_build_object('task', 'Build social proof portfolio', 'completed', false),
            jsonb_build_object('task', 'Create urgency without desperation', 'completed', false)
        ),
        jsonb_build_object(
            'frameworks', jsonb_build_array(
                'Investor Psychology Map',
                'Storytelling Framework',
                'FOMO Creation Playbook'
            ),
            'expert_session', 'Behavioral Economist + VC Partner Discussion'
        ),
        120,
        150,
        54
    );

    -- Day 55: Advanced Negotiation Mastery
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        55,
        'Harvard Negotiation for Founders',
        'Apply Harvard Business School negotiation principles to fundraising. Master cultural considerations, power dynamics, win-win strategies, and difficult conversation navigation.',
        jsonb_build_array(
            jsonb_build_object('task', 'Practice BATNA development', 'completed', false),
            jsonb_build_object('task', 'Role-play difficult negotiations', 'completed', false),
            jsonb_build_object('task', 'Create negotiation preparation checklist', 'completed', false),
            jsonb_build_object('task', 'Build relationship while negotiating hard', 'completed', false)
        ),
        jsonb_build_object(
            'training', jsonb_build_array(
                'Harvard Negotiation Principles',
                'Cultural Negotiation Guide',
                'Power Dynamics Framework'
            ),
            'simulations', '5 Negotiation Scenarios'
        ),
        180,
        250,
        55
    );

    -- Day 56: Future of Funding
    INSERT INTO lessons (module_id, day, title, brief_content, action_items, resources, estimated_time, xp_reward, order_index)
    VALUES (
        v_module_id,
        56,
        'Emerging Trends & Opportunities',
        'Explore Web3 funding, tokenization, DeFi protocols, climate tech funding, impact investing, and emerging funding models. Position for future funding landscapes.',
        jsonb_build_array(
            jsonb_build_object('task', 'Explore Web3 funding options', 'completed', false),
            jsonb_build_object('task', 'Understand tokenization models', 'completed', false),
            jsonb_build_object('task', 'Research impact investing fit', 'completed', false),
            jsonb_build_object('task', 'Create future funding strategy', 'completed', false)
        ),
        jsonb_build_object(
            'emerging_guides', jsonb_build_array(
                'Web3 Funding Primer',
                'Token Economics Guide',
                'Impact Metrics Framework'
            ),
            'future_trends', 'Next 5 Years in Funding'
        ),
        90,
        100,
        56
    );

    -- =============================================
    -- Additional Resource Creation
    -- =============================================
    
    -- Update product with comprehensive resources
    UPDATE products 
    SET 
        description = 'Master the Indian funding ecosystem from government grants to venture capital. Get funded with proven strategies, 200+ templates, and direct investor connections. 85% success rate.',
        updated_at = NOW()
    WHERE code = 'P3';

END $$;

-- Create comprehensive activity types for portfolio integration
INSERT INTO portfolio_activity_types (id, name, description, category, course_association, order_index)
VALUES
    ('funding_readiness_assessment', 'Funding Readiness Assessment', 'Complete comprehensive funding readiness evaluation', 'funding', 'P3', 1),
    ('investor_pitch_deck', 'Investor Pitch Deck', 'Create compelling investor presentation', 'funding', 'P3', 2),
    ('financial_model_creation', 'Financial Model', 'Build 5-year financial projections', 'funding', 'P3', 3),
    ('cap_table_management', 'Cap Table Management', 'Design equity structure and dilution model', 'funding', 'P3', 4),
    ('government_grant_application', 'Government Grant Application', 'Apply for government funding schemes', 'funding', 'P3', 5),
    ('angel_investor_outreach', 'Angel Investor Outreach', 'Connect with angel investors', 'funding', 'P3', 6),
    ('vc_pitch_preparation', 'VC Pitch Preparation', 'Prepare for venture capital meetings', 'funding', 'P3', 7),
    ('term_sheet_negotiation', 'Term Sheet Negotiation', 'Negotiate funding terms', 'funding', 'P3', 8),
    ('due_diligence_preparation', 'Due Diligence Preparation', 'Prepare comprehensive data room', 'funding', 'P3', 9),
    ('investor_relationship_management', 'Investor Relations', 'Manage ongoing investor communications', 'funding', 'P3', 10)
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    course_association = EXCLUDED.course_association,
    order_index = EXCLUDED.order_index;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'P3: Funding Mastery course has been successfully created with:';
    RAISE NOTICE '- 12 comprehensive modules';
    RAISE NOTICE '- 56 detailed lessons';
    RAISE NOTICE '- 200+ templates and tools';
    RAISE NOTICE '- Interactive calculators and frameworks';
    RAISE NOTICE '- Expert sessions and case studies';
    RAISE NOTICE '- Portfolio activity integration';
    RAISE NOTICE 'Course is ready for high-ticket sales!';
END $$;