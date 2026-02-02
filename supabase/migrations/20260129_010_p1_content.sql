-- THE INDIAN STARTUP - P1: 30-Day India Launch Sprint - Complete Content
-- Migration: 20260129_010_p1_content.sql
-- Purpose: Seed comprehensive lesson content for P1 course (30 days)

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
BEGIN
    -- Get P1 product
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P1';

    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product P1 not found. Please ensure products are seeded first.';
    END IF;

    -- Clean existing data
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Foundation & Validation (Days 1-7)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Foundation & Validation',
        'Build your entrepreneurial mindset and validate your startup idea through customer discovery',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: The Startup Mindset & Opportunity Recognition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'The Startup Mindset & Opportunity Recognition',
        'Transform from employee thinking to entrepreneur thinking. Learn the PAINS framework for problem identification: Personal problems you face, Access to markets you can reach, Impact and significance, Numbers of people affected, and Solutions that are missing or inadequate. Understand market timing assessment through technology enablement, regulatory changes, social shifts, and economic factors.',
        '["Complete Problem Inventory Exercise - list 20 personal problems and 20 problems you see others facing", "Create Opportunity Scoring Matrix rating each problem on Market Size, Pain Intensity, Ability to Pay, Competition Level, and Your Expertise", "Set up your Entrepreneur OS with dedicated workspace and project management system", "Block daily 2-hour startup work time and join relevant online communities"]'::jsonb,
        '["Problem Inventory Template", "Opportunity Scoring Calculator", "Entrepreneur Productivity System Setup Guide", "50+ Problem-Finding Prompts"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Customer Development & Market Validation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Customer Development & Market Validation',
        'Master the LISTEN customer interview framework: Learn about their world, Identify specific problems, Seek concrete examples, Test your assumptions, Explore their decision process, Navigate to next steps. 90% of startups fail because they build something nobody wants. Get out of the building and talk to real customers.',
        '["Create interview guides with 8-10 questions for your top 3 problems", "Build list of 50 potential interview candidates across LinkedIn, Facebook groups, Reddit, and industry forums", "Send 20 outreach messages using the provided template", "Conduct your first customer interview using the LISTEN framework"]'::jsonb,
        '["LISTEN Framework Guide", "Customer Interview Question Bank", "Outreach Message Templates", "Interview Recording Setup Guide"]'::jsonb,
        120,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Market Research Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Market Research Deep Dive',
        'Learn systematic market research using TAM, SAM, SOM methodology. TAM is Total Addressable Market (everyone who could potentially use your product), SAM is Serviceable Available Market (the portion you can realistically reach), SOM is Serviceable Obtainable Market (what you can capture in 1-3 years). Use primary and secondary research methods to validate market size.',
        '["Calculate TAM, SAM, and SOM for your startup idea", "Conduct secondary research using industry reports and government data", "Complete competitive analysis for top 5 competitors", "Create market trends document identifying 3-5 favorable trends"]'::jsonb,
        '["TAM SAM SOM Calculator Template", "Industry Research Sources List", "Competitive Analysis Framework", "Market Trends Analysis Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Competitive Analysis Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Competitive Analysis Framework',
        'Master competitive analysis using Porter''s Five Forces and the competitive positioning map. Analyze direct competitors (same solution, same problem), indirect competitors (different solution, same problem), and potential competitors (could enter the market). Identify your sustainable competitive advantage.',
        '["Map all competitors using the Competitor Analysis Matrix", "Complete Porter''s Five Forces analysis for your market", "Create competitive positioning map showing your differentiation", "Identify 3 sustainable competitive advantages for your startup"]'::jsonb,
        '["Competitor Analysis Matrix Template", "Porter''s Five Forces Worksheet", "Competitive Positioning Map Tool", "Differentiation Strategy Guide"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Target Customer Identification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Target Customer Identification',
        'Create detailed customer personas based on your interview insights. Define your Ideal Customer Profile (ICP) including demographics, psychographics, behaviors, and pain points. Learn customer segmentation strategies and identify your beachhead market - the specific niche you will dominate first.',
        '["Create 3 detailed customer personas based on interviews", "Define your Ideal Customer Profile with specific criteria", "Identify and document your beachhead market", "Map the customer journey from awareness to purchase"]'::jsonb,
        '["Customer Persona Template", "ICP Definition Worksheet", "Beachhead Market Selection Framework", "Customer Journey Map Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 6: Value Proposition Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        6,
        'Value Proposition Design',
        'Create a compelling value proposition using the Value Proposition Canvas. Understand customer jobs (functional, social, emotional), pains (frustrations, obstacles, risks), and gains (outcomes, benefits, desires). Design your product/service to address specific pains and create specific gains.',
        '["Complete the Value Proposition Canvas for your startup", "Craft your value proposition statement in under 10 words", "Test your value proposition with 5 potential customers", "Refine based on feedback and document final version"]'::jsonb,
        '["Value Proposition Canvas Template", "Value Proposition Generator Tool", "Customer Feedback Collection Script", "Value Statement Examples Library"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 7: Business Model Canvas Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        7,
        'Business Model Canvas Fundamentals',
        'Complete your first Business Model Canvas covering all 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure. Week 1 validation milestone check.',
        '["Complete full Business Model Canvas for your startup", "Identify top 3 riskiest assumptions in your model", "Plan experiments to test each risky assumption", "Document Week 1 learnings and insights"]'::jsonb,
        '["Business Model Canvas Template", "Assumption Testing Guide", "Week 1 Validation Checklist", "Business Model Examples Library"]'::jsonb,
        120,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Building Blocks (Days 8-14)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Building Blocks',
        'Establish the foundational elements of your startup including legal structure, branding, and technology',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 8: Legal Structure Decisions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Legal Structure Decisions',
        'Understand Indian business entity options: Sole Proprietorship, Partnership, LLP, Private Limited Company, and OPC. Learn the implications of each structure for liability, taxation, funding capability, compliance requirements, and ownership transfer. Make an informed decision based on your startup goals.',
        '["Compare all entity types using the decision matrix", "Evaluate tax implications for each structure", "Assess funding requirements and choose appropriate structure", "Create timeline for incorporation process"]'::jsonb,
        '["Entity Type Comparison Matrix", "Tax Implications Calculator", "Incorporation Checklist", "Legal Structure Decision Framework"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 9: Incorporation Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Incorporation Preparation',
        'Prepare all documents for company registration. Understand Director Identification Number (DIN), Digital Signature Certificate (DSC), and company name reservation process. Learn about Memorandum of Association (MOA), Articles of Association (AOA), and founder agreements.',
        '["Apply for DIN and DSC for all directors", "Reserve 3-5 company name options on MCA portal", "Draft initial MOA and AOA based on your business model", "Create founder agreement covering equity, vesting, and exit terms"]'::jsonb,
        '["DIN/DSC Application Guide", "Company Name Guidelines", "MOA/AOA Templates", "Founder Agreement Template"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 10: Branding Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Branding Fundamentals',
        'Create your brand foundation including brand name, visual identity, and brand voice. Understand the psychology of colors, typography, and logo design. Define your brand archetype and personality traits. Learn domain name selection and social media handle strategies.',
        '["Brainstorm and finalize brand name using naming frameworks", "Create brand mood board with colors, fonts, and imagery", "Secure domain name and all major social media handles", "Write brand guidelines covering voice, tone, and personality"]'::jsonb,
        '["Brand Naming Workshop Guide", "Brand Mood Board Template", "Domain Name Checklist", "Brand Guidelines Template"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 11: Visual Identity Creation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'Visual Identity Creation',
        'Design your logo, select brand colors and typography. Create brand assets including social media templates, presentation templates, and email signatures. Learn to use free design tools like Canva for professional-looking materials.',
        '["Design or commission your logo (at least 3 variations)", "Create color palette with primary, secondary, and accent colors", "Select and download brand fonts for web and print", "Build initial brand asset library with 10+ templates"]'::jsonb,
        '["Logo Design Guide", "Color Psychology Reference", "Typography Selection Guide", "Canva Templates Collection"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 12: Technology Stack Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Technology Stack Selection',
        'Choose the right technology stack for your MVP. Understand the trade-offs between no-code tools, low-code platforms, and custom development. Learn about hosting options, databases, and third-party integrations. Plan for scalability without over-engineering.',
        '["Evaluate no-code vs custom development for your MVP", "Select technology stack based on requirements matrix", "Set up development and testing environments", "Create technical specification document"]'::jsonb,
        '["Tech Stack Decision Matrix", "No-Code Tools Comparison", "Development Environment Setup Guide", "Technical Specification Template"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 13: Team Building Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        13,
        'Team Building Strategies',
        'Identify the key roles needed for your startup. Understand co-founder dynamics, equity splits, and vesting schedules. Learn about advisory boards, freelancers, and early employees. Master the art of recruiting without a budget.',
        '["Define key roles needed for next 6-12 months", "Create equity split framework and vesting schedule", "Build list of 20 potential co-founders or key hires", "Draft job descriptions for critical roles"]'::jsonb,
        '["Team Building Framework", "Equity Split Calculator", "Vesting Schedule Guide", "Startup Recruiting Playbook"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- Day 14: Week 2 Review & Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        14,
        'Week 2 Review & MVP Planning',
        'Review building blocks progress and plan for MVP development. Consolidate all decisions made about legal structure, branding, technology, and team. Create detailed MVP planning document and timeline.',
        '["Complete Week 2 progress checklist", "Finalize all building block decisions", "Create MVP development plan with milestones", "Set up project management for MVP development"]'::jsonb,
        '["Week 2 Checklist", "Building Blocks Summary Template", "MVP Planning Document", "Project Management Setup Guide"]'::jsonb,
        120,
        100,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Making It Real (Days 15-21)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Making It Real',
        'Build your MVP, develop customers, and prepare for market entry',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 15: MVP Development Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'MVP Development Planning',
        'Define your Minimum Viable Product scope using the MoSCoW prioritization method (Must have, Should have, Could have, Won''t have). Create user stories and acceptance criteria. Plan development sprints and set realistic timelines.',
        '["List all features and prioritize using MoSCoW method", "Write user stories for MVP Must-have features", "Create sprint plan with daily/weekly milestones", "Set up development tracking and communication"]'::jsonb,
        '["MoSCoW Prioritization Template", "User Story Templates", "Sprint Planning Guide", "Agile Project Setup"]'::jsonb,
        90,
        100,
        0,
        NOW(),
        NOW()
    );

    -- Day 16: MVP Development Kickoff
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'MVP Development Kickoff',
        'Start building your MVP using chosen technology. Focus on core value delivery over perfection. Learn rapid prototyping techniques and user feedback loops. Understand the build-measure-learn cycle.',
        '["Set up development environment completely", "Build core MVP feature (main value proposition)", "Create basic user flow from signup to key action", "Implement feedback collection mechanism"]'::jsonb,
        '["Development Environment Checklist", "MVP Core Feature Guide", "User Flow Templates", "Feedback Collection Tools"]'::jsonb,
        180,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 17: Customer Development Continuation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Customer Development Continuation',
        'Continue customer interviews while building MVP. Get early feedback on prototypes and mockups. Start building your beta tester list. Learn about landing page validation and pre-launch marketing.',
        '["Conduct 5 more customer interviews with prototype demos", "Collect feedback on MVP features and user experience", "Build email list of 100+ potential beta testers", "Create pre-launch landing page with email capture"]'::jsonb,
        '["Customer Interview V2 Guide", "Prototype Feedback Template", "Beta List Building Tactics", "Landing Page Templates"]'::jsonb,
        120,
        100,
        2,
        NOW(),
        NOW()
    );

    -- Day 18: Initial Marketing Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'Initial Marketing Strategy',
        'Develop your pre-launch marketing strategy. Understand content marketing, social media strategy, and community building. Learn about growth hacking for early-stage startups. Create your marketing calendar.',
        '["Define 3 primary marketing channels for launch", "Create content calendar for first month", "Set up social media profiles with consistent branding", "Plan pre-launch campaign activities"]'::jsonb,
        '["Marketing Channel Selection Guide", "Content Calendar Template", "Social Media Setup Checklist", "Pre-Launch Campaign Playbook"]'::jsonb,
        90,
        100,
        3,
        NOW(),
        NOW()
    );

    -- Day 19: Financial Projections Basics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        19,
        'Financial Projections Basics',
        'Create your first financial model including revenue projections, cost structure, and break-even analysis. Learn about startup unit economics, customer acquisition cost (CAC), and lifetime value (LTV). Understand cash flow management basics.',
        '["Build 12-month revenue projection model", "Calculate unit economics (CAC, LTV, payback period)", "Create cost structure breakdown", "Determine break-even point and runway requirements"]'::jsonb,
        '["Financial Model Template", "Unit Economics Calculator", "Cost Structure Template", "Break-Even Analysis Tool"]'::jsonb,
        120,
        100,
        4,
        NOW(),
        NOW()
    );

    -- Day 20: Regulatory Compliance Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        20,
        'Regulatory Compliance Overview',
        'Understand key compliance requirements for Indian startups. Learn about GST registration, MSME registration, and industry-specific licenses. Know when you need legal help vs when you can DIY. Plan your compliance calendar.',
        '["Complete compliance requirements checklist for your industry", "Register for GST if applicable (or plan timeline)", "Apply for MSME registration (free benefits)", "Create compliance calendar for next 12 months"]'::jsonb,
        '["Compliance Requirements Checklist", "GST Registration Guide", "MSME Registration Guide", "Compliance Calendar Template"]'::jsonb,
        90,
        100,
        5,
        NOW(),
        NOW()
    );

    -- Day 21: Week 3 Review & Launch Prep
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        21,
        'Week 3 Review & Launch Preparation',
        'Review MVP development progress and prepare for launch. Finalize beta testing plan, marketing collateral, and launch timeline. Address any blockers and adjust timeline if needed.',
        '["Complete Week 3 progress checklist", "Finalize MVP for beta launch", "Create launch checklist with all requirements", "Set up analytics and tracking for launch"]'::jsonb,
        '["Week 3 Checklist", "Beta Launch Checklist", "Launch Preparation Guide", "Analytics Setup Guide"]'::jsonb,
        120,
        125,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Launch Ready (Days 22-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Launch Ready',
        'Execute your go-to-market strategy and prepare for growth',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 22: Go-to-Market Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'Go-to-Market Strategy',
        'Finalize your go-to-market strategy including positioning, pricing, channels, and launch tactics. Create your GTM playbook covering first 90 days post-launch. Define success metrics and key milestones.',
        '["Complete GTM strategy document", "Finalize pricing strategy with 3 pricing experiments", "Map customer journey from awareness to purchase", "Define launch success metrics and targets"]'::jsonb,
        '["GTM Strategy Template", "Pricing Strategy Guide", "Customer Journey Map", "Launch Metrics Dashboard"]'::jsonb,
        90,
        125,
        0,
        NOW(),
        NOW()
    );

    -- Day 23: Customer Acquisition Systems
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'Customer Acquisition Systems',
        'Build systematic customer acquisition processes. Set up marketing automation, lead capture, and nurturing workflows. Create content for each stage of the customer journey.',
        '["Set up marketing automation tool (free options available)", "Create lead capture forms and landing pages", "Build email nurture sequence (5-7 emails)", "Launch first customer acquisition experiment"]'::jsonb,
        '["Marketing Automation Setup Guide", "Lead Capture Best Practices", "Email Nurture Templates", "Customer Acquisition Playbook"]'::jsonb,
        120,
        125,
        1,
        NOW(),
        NOW()
    );

    -- Day 24: Sales Process Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'Sales Process Development',
        'Create your sales process from lead to close. Learn consultative selling for startups. Develop sales scripts, objection handling, and follow-up sequences. Set up CRM for tracking.',
        '["Map your sales process stages", "Write sales scripts for initial calls", "Create objection handling guide", "Set up CRM and configure pipeline"]'::jsonb,
        '["Sales Process Template", "Sales Script Library", "Objection Handling Guide", "CRM Setup Guide"]'::jsonb,
        90,
        125,
        2,
        NOW(),
        NOW()
    );

    -- Day 25: Revenue Model Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        25,
        'Revenue Model Implementation',
        'Implement your revenue model including payment processing, invoicing, and revenue tracking. Set up Razorpay or equivalent payment gateway. Create pricing page and checkout flow.',
        '["Set up payment gateway (Razorpay/PayU)", "Create pricing page with clear value tiers", "Build checkout flow and test purchases", "Set up revenue tracking dashboard"]'::jsonb,
        '["Payment Gateway Setup Guide", "Pricing Page Templates", "Checkout Flow Best Practices", "Revenue Dashboard Template"]'::jsonb,
        120,
        125,
        3,
        NOW(),
        NOW()
    );

    -- Day 26: Funding Readiness Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        26,
        'Funding Readiness Preparation',
        'Prepare for future fundraising. Create initial pitch deck, one-pager, and data room structure. Understand funding stages and what investors look for at each stage. Build investor target list.',
        '["Create 10-slide pitch deck for your startup", "Write one-page executive summary", "Set up data room with key documents", "Research and list 20 relevant investors"]'::jsonb,
        '["Pitch Deck Template", "One-Pager Template", "Data Room Checklist", "Investor Research Guide"]'::jsonb,
        120,
        125,
        4,
        NOW(),
        NOW()
    );

    -- Day 27: Scale Preparation Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        27,
        'Scale Preparation Framework',
        'Plan for scaling beyond MVP. Understand operational scalability, technology scalability, and team scalability. Create your 100-day post-launch roadmap.',
        '["Document current manual processes for automation", "Create technology scaling roadmap", "Plan team growth for next 6 months", "Build 100-day post-launch action plan"]'::jsonb,
        '["Process Documentation Template", "Technology Scaling Guide", "Team Growth Planning", "100-Day Roadmap Template"]'::jsonb,
        90,
        125,
        5,
        NOW(),
        NOW()
    );

    -- Day 28: Launch Execution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        28,
        'Launch Execution',
        'Execute your launch plan. Soft launch to beta testers, gather initial feedback, and iterate. Prepare for public launch with press release, social media campaign, and outreach.',
        '["Execute soft launch to beta list", "Collect and analyze initial user feedback", "Fix critical issues from beta feedback", "Prepare public launch materials"]'::jsonb,
        '["Launch Checklist", "Beta Feedback Collection", "Bug Tracking Guide", "Public Launch Prep"]'::jsonb,
        180,
        150,
        6,
        NOW(),
        NOW()
    );

    -- Day 29: Post-Launch Operations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        29,
        'Post-Launch Operations',
        'Manage post-launch operations including customer support, feedback loops, and continuous improvement. Set up customer success processes and monitor key metrics.',
        '["Set up customer support system (email, chat)", "Create FAQ and self-service knowledge base", "Implement feedback collection process", "Configure daily metrics monitoring"]'::jsonb,
        '["Customer Support Setup", "Knowledge Base Template", "Feedback Process Guide", "Metrics Dashboard"]'::jsonb,
        90,
        150,
        7,
        NOW(),
        NOW()
    );

    -- Day 30: Course Completion & Next Steps
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        30,
        'Course Completion & Next Steps',
        'Celebrate your achievement! Review all learnings, consolidate documentation, and plan next 90 days. Get access to alumni network and continued support resources. Set goals for your startup journey ahead.',
        '["Complete 30-day course review and reflection", "Consolidate all documentation and assets", "Set 90-day goals with specific milestones", "Connect with alumni network and mentors"]'::jsonb,
        '["30-Day Review Template", "Documentation Checklist", "90-Day Goal Setting", "Alumni Network Access"]'::jsonb,
        120,
        200,
        8,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P1 Content: Successfully inserted 4 modules with 30 lessons';

END $$;

COMMIT;

-- Verify insertion
SELECT
    p.code,
    p.title,
    COUNT(DISTINCT m.id) as modules,
    COUNT(l.id) as lessons,
    SUM(l."xpReward") as total_xp
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P1'
GROUP BY p.code, p.title;
