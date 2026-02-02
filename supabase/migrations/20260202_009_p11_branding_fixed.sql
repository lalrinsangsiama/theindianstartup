-- P11: Branding & Public Relations Mastery (Fixed)
-- 54 days, 12 modules, comprehensive brand building and PR
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
        'P11',
        'Branding & Public Relations Mastery',
        'Transform into a recognized industry leader through powerful brand building and strategic PR. 54 days, 12 modules covering brand identity, media relations, crisis management, and global PR.',
        7999,
        54,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P11';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Brand Foundation (Days 1-5)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Brand Foundation', 'Build the foundation of a powerful brand identity', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Brand Strategy Fundamentals', 'Understand brand fundamentals and develop your strategic brand framework.', '["Define brand purpose", "Identify target audience", "Map competitive landscape", "Create brand positioning"]'::jsonb, '{"templates": ["Brand Strategy Canvas", "Positioning Template"], "tools": ["Strategy Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Brand Identity Development', 'Create comprehensive brand identity including visual and verbal elements.', '["Define brand personality", "Develop visual identity", "Create brand voice", "Document brand guidelines"]'::jsonb, '{"templates": ["Brand Identity Guide", "Voice & Tone Guide"], "tools": ["Identity Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Logo & Visual Design', 'Create or refine your logo and visual identity system.', '["Review logo options", "Define color palette", "Select typography", "Create visual system"]'::jsonb, '{"templates": ["Visual Identity Template", "Color Guide"], "tools": ["Design Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Brand Messaging Architecture', 'Develop clear, consistent brand messaging framework.', '["Create messaging hierarchy", "Write key messages", "Develop proof points", "Build message matrix"]'::jsonb, '{"templates": ["Messaging Framework", "Proof Point Template"], "tools": ["Message Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 5, 'Brand Guidelines', 'Create comprehensive brand guidelines for consistent application.', '["Document visual standards", "Write usage rules", "Create templates", "Plan distribution"]'::jsonb, '{"templates": ["Brand Guidelines Template", "Usage Examples"], "tools": ["Guidelines Builder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 2: Customer Experience Branding (Days 6-9)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Customer Experience Branding', 'Create memorable brand experiences at every touchpoint', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Touchpoint Mapping', 'Map and optimize brand touchpoints across the customer journey.', '["Map all touchpoints", "Assess brand consistency", "Identify gaps", "Plan improvements"]'::jsonb, '{"templates": ["Touchpoint Map", "Audit Template"], "tools": ["Journey Mapper"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Digital Brand Experience', 'Optimize digital brand experience across web, app, and social.', '["Audit digital presence", "Optimize website", "Align social profiles", "Ensure consistency"]'::jsonb, '{"templates": ["Digital Audit Checklist", "Optimization Guide"], "tools": ["Digital Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Physical Brand Experience', 'Create memorable physical brand experiences in offices and events.', '["Design office experience", "Plan event branding", "Create merchandise", "Build environment"]'::jsonb, '{"templates": ["Office Design Guide", "Event Branding Kit"], "tools": ["Experience Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 9, 'Brand Service Standards', 'Establish service standards that reinforce brand promise.', '["Define service standards", "Train team", "Create scripts", "Monitor delivery"]'::jsonb, '{"templates": ["Service Standards", "Training Guide"], "tools": ["Standards Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 3: Team & Culture Branding (Days 10-13)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Team & Culture Branding', 'Build internal brand champions and culture', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 10, 'Employer Brand Development', 'Build employer brand that attracts top talent.', '["Define EVP", "Create employer messaging", "Develop careers content", "Plan recruitment marketing"]'::jsonb, '{"templates": ["EVP Template", "Career Page Guide"], "tools": ["Employer Brand Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 11, 'Internal Brand Communication', 'Engage employees as brand ambassadors.', '["Create internal campaigns", "Build engagement programs", "Train brand ambassadors", "Recognize champions"]'::jsonb, '{"templates": ["Internal Campaign Kit", "Ambassador Program"], "tools": ["Engagement Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Culture Integration', 'Integrate brand values into company culture.', '["Align values with culture", "Create rituals", "Reinforce through policies", "Celebrate examples"]'::jsonb, '{"templates": ["Culture Integration Guide", "Rituals Template"], "tools": ["Culture Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 13, 'Brand Training Program', 'Create comprehensive brand training for all employees.', '["Develop training content", "Create onboarding", "Build certification", "Track completion"]'::jsonb, '{"templates": ["Training Program", "Certification Template"], "tools": ["Training Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 4: PR Fundamentals (Days 14-18)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'PR Fundamentals', 'Master the fundamentals of public relations', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 14, 'PR Strategy Development', 'Develop comprehensive PR strategy aligned with business goals.', '["Define PR objectives", "Identify target media", "Create messaging", "Plan calendar"]'::jsonb, '{"templates": ["PR Strategy Template", "Calendar Template"], "tools": ["Strategy Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 15, 'Media Landscape Mapping', 'Map the media landscape relevant to your industry and audience.', '["Identify key outlets", "Research journalists", "Build media list", "Track coverage"]'::jsonb, '{"templates": ["Media List Template", "Journalist Profiles"], "tools": ["Media Database"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 16, 'Press Release Writing', 'Master the art of writing newsworthy press releases.', '["Learn press release format", "Write compelling headlines", "Craft news angle", "Include quotes"]'::jsonb, '{"templates": ["Press Release Templates", "Writing Guide"], "tools": ["PR Writer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 17, 'Media Pitching', 'Develop effective pitching strategies for media coverage.', '["Create pitch templates", "Personalize outreach", "Time pitches right", "Follow up effectively"]'::jsonb, '{"templates": ["Pitch Templates", "Follow-up Guide"], "tools": ["Pitch Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 18, 'Media Kit Development', 'Create professional media kit for journalists.', '["Compile company info", "Create fact sheet", "Gather executive bios", "Prepare assets"]'::jsonb, '{"templates": ["Media Kit Template", "Fact Sheet Format"], "tools": ["Media Kit Builder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 5: Award Strategies (Days 19-22)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Award Strategies', 'Win industry awards and recognition', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 19, 'Award Landscape Analysis', 'Identify relevant awards and develop winning strategy.', '["Research industry awards", "Prioritize opportunities", "Understand criteria", "Plan calendar"]'::jsonb, '{"templates": ["Award Calendar", "Criteria Checklist"], "tools": ["Award Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 20, 'Award Application Writing', 'Write compelling award applications that win.', '["Understand requirements", "Write strong narratives", "Gather evidence", "Meet deadlines"]'::jsonb, '{"templates": ["Application Templates", "Evidence Guide"], "tools": ["Application Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 21, 'Speaker Opportunities', 'Secure speaking slots at conferences and events.', '["Identify conferences", "Develop topics", "Submit proposals", "Prepare presentations"]'::jsonb, '{"templates": ["Speaker Proposal", "Topic Development"], "tools": ["Event Finder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 22, 'Thought Leadership Content', 'Create thought leadership content for industry recognition.', '["Identify expertise areas", "Create content plan", "Write articles", "Distribute widely"]'::jsonb, '{"templates": ["Content Plan", "Article Templates"], "tools": ["Content Planner"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 6: Digital PR (Days 23-27)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Digital PR', 'Master digital and online PR strategies', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 23, 'Online Media Relations', 'Build relationships with digital media and influencers.', '["Identify digital outlets", "Research bloggers", "Build online relationships", "Track digital coverage"]'::jsonb, '{"templates": ["Digital Media List", "Influencer Database"], "tools": ["Online PR Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 24, 'Social Media PR', 'Leverage social media for PR and brand building.', '["Optimize social profiles", "Create PR content", "Engage in conversations", "Monitor mentions"]'::jsonb, '{"templates": ["Social PR Guide", "Content Calendar"], "tools": ["Social Monitor"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 25, 'Content Marketing PR', 'Integrate content marketing with PR for maximum impact.', '["Align content and PR", "Create newsworthy content", "Distribute strategically", "Measure results"]'::jsonb, '{"templates": ["Content PR Plan", "Distribution Guide"], "tools": ["Content Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 26, 'SEO & PR Integration', 'Optimize PR for search engines and digital visibility.', '["Understand SEO PR", "Build quality backlinks", "Optimize press releases", "Track rankings"]'::jsonb, '{"templates": ["SEO PR Guide", "Backlink Tracker"], "tools": ["SEO Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 27, 'Podcast & Video PR', 'Secure appearances on podcasts and video channels.', '["Identify opportunities", "Create pitches", "Prepare for interviews", "Leverage appearances"]'::jsonb, '{"templates": ["Podcast Pitch", "Video PR Guide"], "tools": ["Podcast Finder"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 7: Agency Relations (Days 28-31)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Agency Relations', 'Work effectively with PR agencies', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 28, 'PR Agency Selection', 'Select the right PR agency for your needs.', '["Define requirements", "Research agencies", "Conduct pitches", "Evaluate proposals"]'::jsonb, '{"templates": ["Agency RFP Template", "Evaluation Matrix"], "tools": ["Agency Finder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 29, 'Agency Onboarding', 'Onboard PR agency effectively for quick results.', '["Create briefing docs", "Share assets", "Set expectations", "Establish rhythms"]'::jsonb, '{"templates": ["Agency Brief", "Onboarding Checklist"], "tools": ["Onboarding Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 30, 'Agency Management', 'Manage agency relationships for maximum value.', '["Set KPIs", "Conduct reviews", "Provide feedback", "Optimize relationship"]'::jsonb, '{"templates": ["KPI Dashboard", "Review Template"], "tools": ["Agency Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 31, 'In-House vs Agency', 'Balance in-house capabilities with agency support.', '["Assess capabilities", "Define roles", "Optimize structure", "Control costs"]'::jsonb, '{"templates": ["Capability Matrix", "Structure Template"], "tools": ["Cost Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 8: Regional PR (Days 32-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Regional PR', 'Master regional and cultural PR in India', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 32, 'Regional Media Landscape', 'Navigate regional media in different Indian markets.', '["Map regional media", "Identify key outlets", "Understand dynamics", "Build relationships"]'::jsonb, '{"templates": ["Regional Media Map", "Contact Database"], "tools": ["Regional Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 33, 'Vernacular Communications', 'Create content in regional languages for deeper reach.', '["Plan language strategy", "Translate key content", "Adapt messaging", "Work with translators"]'::jsonb, '{"templates": ["Translation Guide", "Style Guide"], "tools": ["Language Manager"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 34, 'Cultural PR Considerations', 'Navigate cultural nuances in PR across regions.', '["Understand cultural differences", "Adapt approaches", "Avoid missteps", "Build local trust"]'::jsonb, '{"templates": ["Cultural Guide", "Sensitivity Checklist"], "tools": ["Culture Advisor"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 35, 'Tier 2/3 City PR', 'Build presence in tier 2 and tier 3 cities.', '["Identify opportunities", "Adapt messaging", "Build local media", "Create local stories"]'::jsonb, '{"templates": ["Tier 2/3 Strategy", "Local Media List"], "tools": ["City Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 36, 'Government & Institutional PR', 'Navigate PR with government and institutions.', '["Understand protocols", "Build relationships", "Create appropriate content", "Follow regulations"]'::jsonb, '{"templates": ["Government PR Guide", "Protocol Checklist"], "tools": ["Institutional Tracker"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 9: Founder Branding (Days 37-41)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Founder Branding', 'Build powerful personal brand for founders', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 37, 'Founder Brand Strategy', 'Develop strategic founder personal brand aligned with company.', '["Define founder positioning", "Align with company brand", "Create narrative", "Set goals"]'::jsonb, '{"templates": ["Founder Brand Canvas", "Narrative Template"], "tools": ["Strategy Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 38, 'LinkedIn Mastery', 'Build powerful LinkedIn presence for founder visibility.', '["Optimize profile", "Create content strategy", "Build network", "Engage consistently"]'::jsonb, '{"templates": ["LinkedIn Guide", "Content Calendar"], "tools": ["LinkedIn Optimizer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 39, 'Media Interview Training', 'Prepare founders for media interviews and appearances.', '["Develop key messages", "Practice techniques", "Handle difficult questions", "Build confidence"]'::jsonb, '{"templates": ["Media Training Guide", "Message House"], "tools": ["Practice Simulator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 40, 'Public Speaking Excellence', 'Develop founder as compelling public speaker.', '["Craft signature talk", "Develop stories", "Practice delivery", "Seek opportunities"]'::jsonb, '{"templates": ["Speaker Toolkit", "Story Framework"], "tools": ["Speaking Coach"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 41, 'Founder Content Creation', 'Create authentic founder content for thought leadership.', '["Plan content themes", "Create regularly", "Share authentically", "Build audience"]'::jsonb, '{"templates": ["Content Framework", "Publishing Calendar"], "tools": ["Content Planner"]}'::jsonb, 60, 50, 5, NOW(), NOW());

    -- Module 10: Entertainment PR (Days 42-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Entertainment & Celebrity PR', 'Leverage entertainment and celebrity partnerships', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 42, 'Celebrity Partnerships', 'Partner with celebrities for brand visibility.', '["Identify aligned celebrities", "Develop proposals", "Negotiate terms", "Manage relationships"]'::jsonb, '{"templates": ["Partnership Proposal", "Contract Template"], "tools": ["Celebrity Finder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 43, 'Entertainment Integrations', 'Integrate brand into entertainment content.', '["Identify opportunities", "Create proposals", "Execute integrations", "Measure impact"]'::jsonb, '{"templates": ["Integration Proposal", "Measurement Guide"], "tools": ["Entertainment Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 44, 'Event Marketing', 'Create and leverage events for PR impact.', '["Plan events", "Create buzz", "Maximize coverage", "Build relationships"]'::jsonb, '{"templates": ["Event PR Plan", "Media Event Guide"], "tools": ["Event Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 45, 'Sports Marketing PR', 'Leverage sports partnerships for brand building.', '["Identify sports opportunities", "Create sponsorship proposals", "Execute activations", "Measure ROI"]'::jsonb, '{"templates": ["Sports Proposal", "Activation Guide"], "tools": ["Sports Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 11: Financial Communications (Days 46-49)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'Financial Communications', 'Master investor relations and financial PR', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 46, 'Investor Communications', 'Communicate effectively with investors and analysts.', '["Develop IR strategy", "Create materials", "Plan engagements", "Manage relationships"]'::jsonb, '{"templates": ["IR Plan", "Materials Guide"], "tools": ["IR Manager"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 47, 'Funding Announcement PR', 'Maximize impact of funding announcements.', '["Plan announcement", "Prepare materials", "Coordinate timing", "Maximize coverage"]'::jsonb, '{"templates": ["Announcement Playbook", "Press Release"], "tools": ["Launch Planner"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 48, 'Financial Media Relations', 'Build relationships with financial and business media.', '["Identify financial media", "Build relationships", "Pitch stories", "Manage coverage"]'::jsonb, '{"templates": ["Financial Media List", "Pitch Templates"], "tools": ["Financial PR Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 49, 'Crisis Communications Finance', 'Manage financial crisis communications effectively.', '["Plan for scenarios", "Prepare statements", "Manage disclosure", "Protect reputation"]'::jsonb, '{"templates": ["Crisis Playbook", "Statement Templates"], "tools": ["Crisis Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 12: Global PR (Days 50-54)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'Global PR', 'Expand PR reach to international markets', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 50, 'Global PR Strategy', 'Develop global PR strategy for international expansion.', '["Define global goals", "Map target markets", "Adapt messaging", "Plan resources"]'::jsonb, '{"templates": ["Global Strategy Template", "Market Analysis"], "tools": ["Global Planner"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 51, 'International Media Relations', 'Build relationships with international media.', '["Research global media", "Identify journalists", "Adapt pitches", "Track coverage"]'::jsonb, '{"templates": ["Global Media List", "Pitch Templates"], "tools": ["International Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 52, 'Cross-Cultural Communications', 'Navigate cultural differences in global PR.', '["Understand cultural nuances", "Adapt communications", "Avoid missteps", "Build local teams"]'::jsonb, '{"templates": ["Cultural Guide", "Adaptation Checklist"], "tools": ["Culture Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 53, 'Global Agency Network', 'Build and manage global PR agency network.', '["Select global agencies", "Coordinate activities", "Ensure consistency", "Manage costs"]'::jsonb, '{"templates": ["Agency Network Guide", "Coordination Template"], "tools": ["Network Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 54, 'Global Crisis Management', 'Manage PR crises across international markets.', '["Plan global response", "Coordinate teams", "Manage time zones", "Control narrative"]'::jsonb, '{"templates": ["Global Crisis Plan", "Response Templates"], "tools": ["Crisis Coordinator"]}'::jsonb, 60, 50, 5, NOW(), NOW());

END $$;

COMMIT;
