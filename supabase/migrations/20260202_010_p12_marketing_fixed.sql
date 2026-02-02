-- P12: Marketing Mastery - Complete Growth Engine (Fixed)
-- 60 days, 12 modules, comprehensive marketing mastery
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
        'P12',
        'Marketing Mastery - Complete Growth Engine',
        'Build a data-driven marketing machine generating predictable growth across all channels. 60 days, 12 modules covering digital marketing, content, SEO, social media, performance marketing, and growth hacking.',
        9999,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P12';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Marketing Foundation (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Marketing Foundation', 'Build the strategic foundation for marketing success', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Marketing Strategy Development', 'Develop comprehensive marketing strategy aligned with business objectives.', '["Define marketing objectives", "Identify target audience", "Map customer journey", "Set KPIs"]'::jsonb, '{"templates": ["Marketing Strategy Canvas", "KPI Framework"], "tools": ["Strategy Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Customer Research & Personas', 'Conduct customer research and build detailed buyer personas.', '["Conduct research", "Create personas", "Map pain points", "Identify motivations"]'::jsonb, '{"templates": ["Persona Template", "Research Guide"], "tools": ["Persona Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Competitive Analysis', 'Analyze competitor marketing strategies and identify opportunities.', '["Identify competitors", "Analyze strategies", "Find gaps", "Identify differentiation"]'::jsonb, '{"templates": ["Competitive Matrix", "Analysis Template"], "tools": ["Competitor Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Marketing Budget Planning', 'Plan and allocate marketing budget for maximum ROI.', '["Assess resources", "Allocate by channel", "Plan campaigns", "Set targets"]'::jsonb, '{"templates": ["Budget Template", "Allocation Guide"], "tools": ["Budget Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Marketing Team Structure', 'Build optimal marketing team structure for your stage.', '["Define roles", "Plan hiring", "Set up processes", "Build culture"]'::jsonb, '{"templates": ["Team Structure", "JD Templates"], "tools": ["Org Designer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: Content Marketing (Days 6-10)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Content Marketing', 'Master content marketing for sustainable growth', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Content Strategy Development', 'Develop comprehensive content strategy that drives results.', '["Define content goals", "Map content to journey", "Plan content calendar", "Set metrics"]'::jsonb, '{"templates": ["Content Strategy Template", "Calendar Template"], "tools": ["Content Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Blog & Article Writing', 'Create compelling blog content that ranks and converts.', '["Research topics", "Write compelling content", "Optimize for SEO", "Promote effectively"]'::jsonb, '{"templates": ["Blog Template", "Writing Checklist"], "tools": ["Content Editor"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Video Content Creation', 'Create engaging video content for maximum engagement.', '["Plan video content", "Create production process", "Edit effectively", "Distribute widely"]'::jsonb, '{"templates": ["Video Script Template", "Production Guide"], "tools": ["Video Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Ebooks & Lead Magnets', 'Create valuable lead magnets that generate quality leads.', '["Identify topics", "Create content", "Design professionally", "Promote effectively"]'::jsonb, '{"templates": ["Ebook Template", "Lead Magnet Guide"], "tools": ["Lead Magnet Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 10, 'Content Distribution', 'Master content distribution for maximum reach.', '["Plan distribution strategy", "Leverage channels", "Repurpose content", "Track performance"]'::jsonb, '{"templates": ["Distribution Plan", "Repurposing Guide"], "tools": ["Distribution Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 3: SEO Mastery (Days 11-15)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'SEO Mastery', 'Master search engine optimization for organic growth', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 11, 'SEO Strategy & Audit', 'Develop SEO strategy and conduct comprehensive audit.', '["Audit current SEO", "Set SEO goals", "Create strategy", "Plan execution"]'::jsonb, '{"templates": ["SEO Audit Template", "Strategy Guide"], "tools": ["SEO Auditor"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Keyword Research', 'Master keyword research for targeted organic traffic.', '["Research keywords", "Analyze competition", "Map to pages", "Track rankings"]'::jsonb, '{"templates": ["Keyword Research Template", "Mapping Guide"], "tools": ["Keyword Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, 'On-Page SEO', 'Optimize on-page elements for better rankings.', '["Optimize titles and metas", "Structure content", "Improve internal linking", "Optimize images"]'::jsonb, '{"templates": ["On-Page Checklist", "Optimization Guide"], "tools": ["Page Optimizer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 14, 'Technical SEO', 'Master technical SEO for better crawlability and indexing.', '["Improve site speed", "Fix technical issues", "Optimize structure", "Submit sitemaps"]'::jsonb, '{"templates": ["Technical Checklist", "Site Speed Guide"], "tools": ["Technical Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 15, 'Link Building', 'Build high-quality backlinks for domain authority.', '["Plan link strategy", "Create linkable content", "Outreach effectively", "Monitor profile"]'::jsonb, '{"templates": ["Link Building Plan", "Outreach Templates"], "tools": ["Backlink Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 4: Social Media Marketing (Days 16-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'Social Media Marketing', 'Build engaged communities across social platforms', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Social Media Strategy', 'Develop comprehensive social media strategy.', '["Define social goals", "Select platforms", "Create content plan", "Set engagement targets"]'::jsonb, '{"templates": ["Social Strategy Template", "Platform Guide"], "tools": ["Social Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 17, 'LinkedIn Marketing', 'Master LinkedIn for B2B marketing and thought leadership.', '["Optimize profiles", "Create content", "Build network", "Generate leads"]'::jsonb, '{"templates": ["LinkedIn Guide", "Content Calendar"], "tools": ["LinkedIn Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'Instagram & Facebook', 'Build presence on Instagram and Facebook.', '["Create visual content", "Optimize profiles", "Engage audience", "Run campaigns"]'::jsonb, '{"templates": ["Instagram Guide", "FB Strategy"], "tools": ["Social Scheduler"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 19, 'Twitter & Emerging Platforms', 'Leverage Twitter and emerging platforms effectively.', '["Build Twitter presence", "Engage in conversations", "Explore new platforms", "Test and learn"]'::jsonb, '{"templates": ["Twitter Guide", "Platform Tracker"], "tools": ["Social Monitor"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 20, 'Community Building', 'Build and engage communities around your brand.', '["Define community strategy", "Create engagement programs", "Moderate effectively", "Grow organically"]'::jsonb, '{"templates": ["Community Guide", "Engagement Plan"], "tools": ["Community Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 5: Performance Marketing (Days 21-25)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Performance Marketing', 'Master paid advertising for predictable growth', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 21, 'Paid Advertising Strategy', 'Develop comprehensive paid advertising strategy.', '["Set paid goals", "Allocate budget", "Plan campaigns", "Define metrics"]'::jsonb, '{"templates": ["Paid Strategy Template", "Budget Allocation"], "tools": ["Campaign Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Google Ads Mastery', 'Master Google Ads for search and display advertising.', '["Set up campaigns", "Research keywords", "Write compelling ads", "Optimize bids"]'::jsonb, '{"templates": ["Google Ads Guide", "Campaign Checklist"], "tools": ["Ads Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 23, 'Facebook & Instagram Ads', 'Create effective social media advertising campaigns.', '["Set up Business Manager", "Target audiences", "Create compelling ads", "Optimize performance"]'::jsonb, '{"templates": ["FB Ads Guide", "Creative Templates"], "tools": ["Social Ads Manager"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 24, 'LinkedIn Advertising', 'Master LinkedIn Ads for B2B marketing.', '["Set up campaigns", "Target professionals", "Create content", "Measure ROI"]'::jsonb, '{"templates": ["LinkedIn Ads Guide", "B2B Targeting"], "tools": ["LinkedIn Ads Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 25, 'Retargeting & Remarketing', 'Implement effective retargeting campaigns.', '["Set up pixels", "Create audiences", "Design campaigns", "Optimize frequency"]'::jsonb, '{"templates": ["Retargeting Guide", "Audience Templates"], "tools": ["Pixel Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 6: Email Marketing (Days 26-30)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Email Marketing', 'Build email marketing system that converts', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 26, 'Email Strategy & List Building', 'Develop email strategy and build quality email lists.', '["Define email goals", "Plan list building", "Create lead magnets", "Set up capture"]'::jsonb, '{"templates": ["Email Strategy Template", "List Building Guide"], "tools": ["Email Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'Email Automation Setup', 'Set up email automation for scalable engagement.', '["Map customer journey", "Create workflows", "Set up triggers", "Test automation"]'::jsonb, '{"templates": ["Automation Workflows", "Journey Map"], "tools": ["Automation Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 28, 'Email Copywriting', 'Write compelling emails that get opened and clicked.', '["Write subject lines", "Craft compelling copy", "Design effectively", "Include CTAs"]'::jsonb, '{"templates": ["Email Templates", "Copywriting Guide"], "tools": ["Email Editor"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 29, 'Email Segmentation', 'Segment lists for personalized, relevant messaging.', '["Define segments", "Create rules", "Personalize content", "Test segments"]'::jsonb, '{"templates": ["Segmentation Guide", "Personalization Tips"], "tools": ["Segment Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 30, 'Email Analytics & Optimization', 'Analyze and optimize email performance.', '["Track key metrics", "A/B test elements", "Improve deliverability", "Optimize timing"]'::jsonb, '{"templates": ["Analytics Dashboard", "A/B Test Guide"], "tools": ["Email Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 7: Growth Hacking (Days 31-35)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Growth Hacking', 'Master growth hacking for rapid scaling', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 31, 'Growth Framework', 'Build systematic growth framework for experimentation.', '["Define growth model", "Identify growth levers", "Set up process", "Build team culture"]'::jsonb, '{"templates": ["Growth Framework", "Lever Analysis"], "tools": ["Growth Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 32, 'Viral Loop Design', 'Design viral loops for exponential growth.', '["Identify viral potential", "Design loop mechanics", "Implement tracking", "Optimize k-factor"]'::jsonb, '{"templates": ["Viral Loop Template", "K-Factor Calculator"], "tools": ["Loop Designer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 33, 'Referral Programs', 'Build referral programs that drive word-of-mouth.', '["Design referral program", "Set incentives", "Build mechanics", "Launch and optimize"]'::jsonb, '{"templates": ["Referral Program Guide", "Incentive Matrix"], "tools": ["Referral Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 34, 'Growth Experiments', 'Run systematic growth experiments at scale.', '["Generate hypotheses", "Prioritize experiments", "Run tests", "Analyze results"]'::jsonb, '{"templates": ["Experiment Template", "ICE Scoring"], "tools": ["Experiment Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 35, 'Product-Led Growth', 'Implement product-led growth strategies.', '["Identify PLG opportunities", "Design onboarding", "Create activation", "Drive expansion"]'::jsonb, '{"templates": ["PLG Framework", "Activation Guide"], "tools": ["PLG Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 8: Marketing Analytics (Days 36-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Marketing Analytics', 'Build data-driven marketing capabilities', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 36, 'Analytics Setup', 'Set up comprehensive marketing analytics infrastructure.', '["Set up Google Analytics", "Configure tracking", "Create dashboards", "Define metrics"]'::jsonb, '{"templates": ["Analytics Setup Guide", "Dashboard Templates"], "tools": ["Analytics Manager"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 37, 'Attribution Modeling', 'Implement attribution to understand channel performance.', '["Choose attribution model", "Set up tracking", "Analyze results", "Optimize allocation"]'::jsonb, '{"templates": ["Attribution Guide", "Model Comparison"], "tools": ["Attribution Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 38, 'Customer Analytics', 'Analyze customer behavior for better marketing.', '["Track customer journey", "Analyze cohorts", "Calculate LTV", "Identify patterns"]'::jsonb, '{"templates": ["Customer Analytics Guide", "Cohort Template"], "tools": ["Customer Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 39, 'Marketing ROI Analysis', 'Measure and optimize marketing ROI.', '["Calculate channel ROI", "Optimize spend", "Forecast results", "Report performance"]'::jsonb, '{"templates": ["ROI Calculator", "Reporting Template"], "tools": ["ROI Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 40, 'Predictive Analytics', 'Use predictive analytics for marketing optimization.', '["Identify use cases", "Build models", "Test predictions", "Implement insights"]'::jsonb, '{"templates": ["Predictive Guide", "Model Templates"], "tools": ["Prediction Builder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 9: Marketing Technology (Days 41-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Marketing Technology', 'Build effective marketing technology stack', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 41, 'Martech Stack Design', 'Design optimal marketing technology stack.', '["Assess needs", "Evaluate options", "Plan integration", "Budget allocation"]'::jsonb, '{"templates": ["Martech Landscape", "Stack Planning Guide"], "tools": ["Stack Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 42, 'CRM & Marketing Automation', 'Implement CRM and marketing automation platforms.', '["Select platform", "Set up CRM", "Configure automation", "Train team"]'::jsonb, '{"templates": ["CRM Guide", "Automation Setup"], "tools": ["Platform Evaluator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 43, 'Customer Data Platform', 'Leverage CDP for unified customer view.', '["Understand CDP", "Evaluate options", "Implement solution", "Activate data"]'::jsonb, '{"templates": ["CDP Guide", "Implementation Plan"], "tools": ["CDP Evaluator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 44, 'Marketing AI Tools', 'Leverage AI tools for marketing efficiency.', '["Identify AI use cases", "Evaluate tools", "Implement solutions", "Measure impact"]'::jsonb, '{"templates": ["AI Marketing Guide", "Tool Comparison"], "tools": ["AI Evaluator"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 45, 'Integration & Data Flow', 'Integrate martech stack for seamless data flow.', '["Map data flows", "Build integrations", "Ensure quality", "Monitor performance"]'::jsonb, '{"templates": ["Integration Map", "Data Flow Guide"], "tools": ["Integration Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 10: B2B Marketing (Days 46-50)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'B2B Marketing', 'Master B2B marketing strategies and tactics', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 46, 'B2B Marketing Strategy', 'Develop B2B marketing strategy for enterprise sales.', '["Define B2B goals", "Map buying process", "Create content strategy", "Plan campaigns"]'::jsonb, '{"templates": ["B2B Strategy Template", "Buyer Journey Map"], "tools": ["B2B Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 47, 'Account-Based Marketing', 'Implement ABM for targeted enterprise marketing.', '["Select target accounts", "Develop account plans", "Create personalized content", "Coordinate with sales"]'::jsonb, '{"templates": ["ABM Playbook", "Account Plan Template"], "tools": ["ABM Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 48, 'Lead Generation', 'Generate quality B2B leads at scale.', '["Define lead criteria", "Create lead magnets", "Implement scoring", "Nurture leads"]'::jsonb, '{"templates": ["Lead Gen Guide", "Scoring Model"], "tools": ["Lead Manager"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 49, 'Sales & Marketing Alignment', 'Align sales and marketing for better results.', '["Define SLA", "Share data", "Coordinate activities", "Measure together"]'::jsonb, '{"templates": ["SLA Template", "Alignment Guide"], "tools": ["Alignment Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 50, 'B2B Content Marketing', 'Create B2B content that drives pipeline.', '["Create thought leadership", "Develop case studies", "Produce webinars", "Build resources"]'::jsonb, '{"templates": ["B2B Content Guide", "Case Study Template"], "tools": ["Content Manager"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 11: B2C Marketing (Days 51-55)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'B2C Marketing', 'Master B2C marketing for consumer engagement', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 51, 'B2C Marketing Strategy', 'Develop B2C marketing strategy for consumer brands.', '["Define B2C goals", "Understand consumers", "Create brand strategy", "Plan campaigns"]'::jsonb, '{"templates": ["B2C Strategy Template", "Consumer Insights"], "tools": ["B2C Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 52, 'Influencer Marketing', 'Leverage influencers for brand awareness and sales.', '["Identify influencers", "Develop partnerships", "Create campaigns", "Measure ROI"]'::jsonb, '{"templates": ["Influencer Guide", "Campaign Template"], "tools": ["Influencer Finder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 53, 'User-Generated Content', 'Encourage and leverage user-generated content.', '["Create UGC strategy", "Build campaigns", "Moderate content", "Amplify winners"]'::jsonb, '{"templates": ["UGC Guide", "Campaign Template"], "tools": ["UGC Manager"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 54, 'Loyalty & Retention', 'Build loyalty programs that drive repeat business.', '["Design loyalty program", "Create engagement", "Measure retention", "Optimize lifetime value"]'::jsonb, '{"templates": ["Loyalty Program Guide", "Retention Metrics"], "tools": ["Loyalty Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 55, 'Mobile Marketing', 'Master mobile marketing for on-the-go consumers.', '["Optimize for mobile", "Create mobile content", "Implement SMS", "Track mobile metrics"]'::jsonb, '{"templates": ["Mobile Marketing Guide", "SMS Templates"], "tools": ["Mobile Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 12: Marketing Leadership (Days 56-60)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'Marketing Leadership', 'Lead marketing teams and drive organizational impact', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 56, 'Marketing Team Management', 'Build and lead high-performing marketing teams.', '["Define structure", "Hire talent", "Set goals", "Build culture"]'::jsonb, '{"templates": ["Team Guide", "Hiring Playbook"], "tools": ["Team Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 57, 'Agency Management', 'Work effectively with marketing agencies.', '["Select agencies", "Set expectations", "Manage relationships", "Evaluate performance"]'::jsonb, '{"templates": ["Agency Guide", "RFP Template"], "tools": ["Agency Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 58, 'Marketing & Sales Collaboration', 'Drive revenue through marketing and sales partnership.', '["Align on goals", "Share insights", "Coordinate activities", "Measure impact"]'::jsonb, '{"templates": ["Revenue Marketing Guide", "Alignment Template"], "tools": ["Revenue Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 59, 'Executive Marketing Reporting', 'Report marketing performance to executives and board.', '["Define metrics", "Create dashboards", "Tell data stories", "Drive decisions"]'::jsonb, '{"templates": ["Executive Dashboard", "Board Deck Template"], "tools": ["Report Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 60, 'Future of Marketing', 'Stay ahead of marketing trends and innovations.', '["Track trends", "Experiment with new channels", "Build adaptability", "Future-proof strategy"]'::jsonb, '{"templates": ["Trends Report", "Innovation Guide"], "tools": ["Trend Analyzer"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
