-- P11: Final Fix Script for Remaining Issues
-- Fix column references and complete the enhancement

-- 1. Add P11-specific activity types for portfolio integration
INSERT INTO "ActivityType" ("id", "name", "description", "category", "portfolioSection")
VALUES
  ('p11_brand_identity_creation', 'Brand Identity Creation', 'Complete brand identity system with visual and verbal elements', 'branding', 'brand_assets'),
  ('p11_media_kit_development', 'Media Kit Development', 'Professional media kit with press releases, photos, and brand materials', 'pr', 'brand_assets'),
  ('p11_pr_strategy_creation', 'PR Strategy Creation', 'Comprehensive PR strategy with media outreach and campaign planning', 'pr', 'brand_assets'),
  ('p11_award_application', 'Award Application', 'Strategic award applications for industry recognition', 'recognition', 'brand_assets'),
  ('p11_founder_brand_building', 'Founder Brand Building', 'Personal branding strategy and LinkedIn optimization for founders', 'personal_branding', 'brand_assets'),
  ('p11_crisis_communication_plan', 'Crisis Communication Plan', 'Crisis management protocols and communication frameworks', 'crisis_management', 'legal_compliance')
ON CONFLICT (id) DO NOTHING;

-- 2. Clean up duplicate modules created
-- Delete duplicate modules that were created
DELETE FROM "Module" 
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11')
AND title IN ('Entertainment & Sports PR Mastery', 'Financial Communications & Investor PR', 'Global Brand Expansion Strategies')
AND id LIKE 'mod_p11_%';

-- 3. Update existing module titles to match the 54-day structure
-- Update Module 10 to Entertainment & Sports PR
UPDATE "Module" 
SET title = 'Entertainment & Sports PR Mastery',
    description = 'Master celebrity partnerships, sports sponsorships, and cultural moment marketing'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11')
AND "orderIndex" = 10;

-- Update Module 11 to Financial Communications  
UPDATE "Module"
SET title = 'Financial Communications & Investor PR',
    description = 'Master investor relations, earnings communication, and IPO readiness'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11')
AND "orderIndex" = 11;

-- Update Module 12 to Global Brand Expansion
UPDATE "Module"
SET title = 'Global Brand Expansion Strategies', 
    description = 'Master international expansion, multi-market campaigns, and global media relations'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11')
AND "orderIndex" = 12;

-- 4. Add enhanced lessons with proper structure
-- Get module IDs and add lessons for Entertainment & Sports PR (Module 10)
DO $$
DECLARE
    mod10_id TEXT;
    mod11_id TEXT;
    mod12_id TEXT;
BEGIN
    -- Get module IDs
    SELECT m.id INTO mod10_id FROM "Module" m 
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P11' AND m."orderIndex" = 10;
    
    SELECT m.id INTO mod11_id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P11' AND m."orderIndex" = 11;
    
    SELECT m.id INTO mod12_id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id 
    WHERE p.code = 'P11' AND m."orderIndex" = 12;
    
    -- Add lessons for Module 10: Entertainment & Sports PR (Days 46-50)
    IF mod10_id IS NOT NULL THEN
        -- Check if lessons already exist to avoid duplicates
        IF NOT EXISTS (SELECT 1 FROM "Lesson" WHERE "moduleId" = mod10_id AND "day" = 46) THEN
            INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex")
            VALUES 
            ('lesson_p11_d46_' || substr(md5(random()::text), 1, 8), mod10_id, 46, 'Celebrity Partnership Strategy & Execution', 
             '🌟 Master celebrity partnerships that can multiply your brand value by 10x through strategic identification, negotiation, and activation.', 
             '[{"task": "Identify 10 celebrities aligned with your brand values", "deliverable": "Celebrity alignment matrix"}, {"task": "Create celebrity partnership proposal template", "deliverable": "Professional proposal document"}, {"task": "Design ROI measurement framework", "deliverable": "Performance tracking system"}]'::json,
             '[{"title": "Celebrity Partnership ROI Calculator", "type": "calculator", "url": "/resources/celebrity-roi-calc"}, {"title": "Celebrity Database Access", "type": "database", "url": "/resources/celebrity-database"}]'::json,
             75, 100, 1),
             
            ('lesson_p11_d47_' || substr(md5(random()::text), 1, 8), mod10_id, 47, 'Sports Sponsorship & Fan Engagement',
             '🏆 Unlock sports marketing power through strategic sponsorship deals that build emotional connections with millions of passionate fans.',
             '[{"task": "Evaluate 5 sports sponsorship opportunities", "deliverable": "Sponsorship evaluation report"}, {"task": "Create fan engagement activation plan", "deliverable": "Activation strategy document"}, {"task": "Design sports content calendar", "deliverable": "12-month content plan"}]'::json,
             '[{"title": "Sports Sponsorship Database", "type": "database", "url": "/resources/sports-sponsorship-db"}, {"title": "Fan Engagement Toolkit", "type": "toolkit", "url": "/resources/fan-engagement-tools"}]'::json,
             75, 100, 2),
             
            ('lesson_p11_d48_' || substr(md5(random()::text), 1, 8), mod10_id, 48, 'Entertainment Marketing & Cultural Moments',
             '🎬 Master entertainment marketing by strategically aligning your brand with cultural moments, movies, music, and trending content.',
             '[{"task": "Identify 10 cultural moments for brand integration", "deliverable": "Cultural moment calendar"}, {"task": "Create entertainment partnership strategy", "deliverable": "Partnership framework"}, {"task": "Develop viral moment activation plan", "deliverable": "Activation playbook"}]'::json,
             '[{"title": "Cultural Moment Calendar", "type": "calendar", "url": "/resources/cultural-calendar"}, {"title": "Viral Marketing Toolkit", "type": "toolkit", "url": "/resources/viral-tools"}]'::json,
             75, 100, 3),
             
            ('lesson_p11_d49_' || substr(md5(random()::text), 1, 8), mod10_id, 49, 'Event Activations & Fan Experiences',
             '🎪 Create memorable brand experiences through strategic event activations that generate massive social media buzz and brand loyalty.',
             '[{"task": "Design signature brand activation concept", "deliverable": "Activation blueprint"}, {"task": "Create fan experience journey map", "deliverable": "Experience design document"}, {"task": "Plan social media amplification strategy", "deliverable": "Amplification plan"}]'::json,
             '[{"title": "Event Activation Templates", "type": "templates", "url": "/resources/activation-templates"}, {"title": "Experience Design Toolkit", "type": "toolkit", "url": "/resources/experience-tools"}]'::json,
             75, 100, 4),
             
            ('lesson_p11_d50_' || substr(md5(random()::text), 1, 8), mod10_id, 50, 'Content Integration & Influencer Campaigns',
             '📱 Master content integration with entertainment properties and design influencer campaigns that drive authentic engagement.',
             '[{"task": "Develop content integration framework", "deliverable": "Integration strategy"}, {"task": "Create influencer campaign brief", "deliverable": "Campaign brief document"}, {"task": "Build measurement dashboard", "deliverable": "Analytics framework"}]'::json,
             '[{"title": "Content Integration Playbook", "type": "playbook", "url": "/resources/content-integration"}, {"title": "Influencer Campaign Templates", "type": "templates", "url": "/resources/influencer-templates"}]'::json,
             75, 100, 5);
        END IF;
    END IF;
    
    -- Add lessons for Module 11: Financial Communications (Days 51-54)
    IF mod11_id IS NOT NULL THEN
        IF NOT EXISTS (SELECT 1 FROM "Lesson" WHERE "moduleId" = mod11_id AND "day" = 51) THEN
            INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex")
            VALUES 
            ('lesson_p11_d51_' || substr(md5(random()::text), 1, 8), mod11_id, 51, 'Investor Relations & Financial Storytelling',
             '💰 Master investor communications that build confidence, attract funding, and maintain strong stakeholder relationships.',
             '[{"task": "Create investor communication calendar", "deliverable": "Annual communication plan"}, {"task": "Develop financial story framework", "deliverable": "Storytelling template"}, {"task": "Design investor update template", "deliverable": "Update format"}]'::json,
             '[{"title": "Investor Relations Toolkit", "type": "toolkit", "url": "/resources/investor-relations"}, {"title": "Financial Storytelling Guide", "type": "guide", "url": "/resources/financial-storytelling"}]'::json,
             90, 125, 1),
             
            ('lesson_p11_d52_' || substr(md5(random()::text), 1, 8), mod11_id, 52, 'IPO Readiness & Public Company Communications',
             '📈 Prepare for public markets with world-class financial communications that meet regulatory requirements and investor expectations.',
             '[{"task": "Develop IPO communication strategy", "deliverable": "IPO communication plan"}, {"task": "Create regulatory compliance framework", "deliverable": "Compliance checklist"}, {"task": "Design public company processes", "deliverable": "Process documentation"}]'::json,
             '[{"title": "IPO Communication Playbook", "type": "playbook", "url": "/resources/ipo-playbook"}, {"title": "Regulatory Compliance Guide", "type": "guide", "url": "/resources/compliance-guide"}]'::json,
             90, 125, 2),
             
            ('lesson_p11_d53_' || substr(md5(random()::text), 1, 8), mod11_id, 53, 'M&A Communications & Crisis Financial PR',
             '🤝 Master merger and acquisition communications while managing financial crises with transparency and stakeholder confidence.',
             '[{"task": "Create M&A communication strategy", "deliverable": "M&A communication plan"}, {"task": "Develop financial crisis protocols", "deliverable": "Crisis response framework"}, {"task": "Design stakeholder engagement plan", "deliverable": "Engagement strategy"}]'::json,
             '[{"title": "M&A Communication Templates", "type": "templates", "url": "/resources/ma-templates"}, {"title": "Financial Crisis Playbook", "type": "playbook", "url": "/resources/financial-crisis"}]'::json,
             90, 125, 3),
             
            ('lesson_p11_d54_' || substr(md5(random()::text), 1, 8), mod11_id, 54, 'Analyst Relations & Institutional Communication',
             '📊 Build strong relationships with financial analysts and institutional investors through strategic communication and transparency.',
             '[{"task": "Build analyst relationship strategy", "deliverable": "Analyst engagement plan"}, {"task": "Create institutional communication framework", "deliverable": "Institutional strategy"}, {"task": "Develop earnings communication process", "deliverable": "Earnings playbook"}]'::json,
             '[{"title": "Analyst Relations Guide", "type": "guide", "url": "/resources/analyst-relations"}, {"title": "Earnings Communication Kit", "type": "kit", "url": "/resources/earnings-kit"}]'::json,
             90, 125, 4);
        END IF;
    END IF;
END $$;

-- 5. Update Product to reflect correct 54-day duration
UPDATE "Product" 
SET "estimatedDays" = 54,
    description = 'Transform into a recognized industry leader through powerful brand building and strategic PR (54 days, 12 modules, ₹7,999)'
WHERE code = 'P11';

-- 6. Final verification
SELECT 
  'P11 ENHANCEMENT COMPLETE' as status,
  p.code,
  p.title,
  p.price as "Price (₹)",
  p."estimatedDays" as "Duration (Days)",
  COUNT(DISTINCT m.id) as "Modules",
  COUNT(l.id) as "Total Lessons",
  ROUND(SUM(l."estimatedTime")/60.0, 1) as "Total Hours",
  SUM(l."xpReward") as "Total XP"
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"  
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P11'
GROUP BY p.id, p.code, p.title, p.price, p."estimatedDays";