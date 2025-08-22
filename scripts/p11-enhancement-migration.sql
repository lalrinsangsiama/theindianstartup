-- P11: Branding & PR Mastery - Enhancement Migration
-- Upgrade existing P11 with premium features, tools, and enhanced content
-- Version: 2.0.0 - High-Ticket Enhancement
-- Date: 2025-08-21

BEGIN;

-- Update P11 Product with enhanced features and metadata
UPDATE "Product" 
SET 
    price = 799900, -- ₹7,999 in paise
    description = 'Transform into a recognized industry leader through powerful brand building and strategic PR. Complete 54-day intensive program with 4 interactive tools, 300+ templates worth ₹1,50,000, media training, award strategies, and professional certification.',
    features = '[
        "4 Interactive Professional Tools (₹50,000 value)",
        "300+ Brand & PR Templates (₹1,50,000 value)",
        "Brand Strategy Calculator with AI Analysis",
        "PR Campaign Management System",
        "Brand Asset Generator with Logo Builder",
        "Media Relationship Management CRM",
        "Award Winning Strategies Framework",
        "Crisis Communication Playbooks",
        "Personal Branding for Founders",
        "Media Training & Interview Preparation",
        "Professional Certification Program",
        "Exclusive Alumni Network Access"
    ]'::jsonb,
    metadata = '{
        "duration": "54 days intensive",
        "modules": 12,
        "tools": 4,
        "templates": "300+",
        "template_value": "₹1,50,000+",
        "tools_value": "₹50,000+",
        "total_value": "₹2,00,000+",
        "certification": "Professional Brand & PR Certification",
        "support": "Priority support and mentorship",
        "updates": "Lifetime template updates",
        "guarantee": "30-day money back guarantee",
        "outcomes": [
            "Complete brand identity system with professional assets",
            "Active PR campaigns generating media coverage",
            "Strong media relationships with journalists and influencers",
            "Award-winning brand recognition strategies",
            "Crisis-proof communication systems",
            "Personal brand as industry thought leader",
            "Professional certification in Brand & PR",
            "ROI of 25x+ through strategic brand building"
        ],
        "bonus_content": [
            "Exclusive journalist database (500+ contacts)",
            "Award submission calendar with deadlines",
            "Crisis communication war room access",
            "Monthly brand health reports",
            "Quarterly strategy review sessions",
            "Access to brand & PR expert community"
        ]
    }'::jsonb,
    "updatedAt" = now()
WHERE code = 'P11';

-- Update Module descriptions with enhanced content
DO $$
DECLARE
    p11_product_id text;
    module_ids text[];
BEGIN
    SELECT id INTO p11_product_id FROM "Product" WHERE code = 'P11';
    
    -- Get all module IDs for P11 in order
    SELECT ARRAY_AGG(id ORDER BY "orderIndex") INTO module_ids 
    FROM "Module" 
    WHERE "productId" = p11_product_id;
    
    -- Update each module with enhanced descriptions
    UPDATE "Module" SET
        title = 'Brand Foundations & Strategy Mastery',
        description = 'Build bulletproof brand foundations with comprehensive strategy framework, positioning, and messaging. Includes Brand Strategy Calculator tool and 50+ templates.'
    WHERE id = module_ids[1];
    
    UPDATE "Module" SET
        title = 'Brand Identity & Visual System Excellence',
        description = 'Create professional brand identity with logos, colors, typography, and visual guidelines. Master the Brand Asset Generator tool with unlimited design variations.'
    WHERE id = module_ids[2];
    
    UPDATE "Module" SET
        title = 'PR Strategy & Media Relations Mastery',
        description = 'Build strategic PR campaigns and strong media relationships. Master the PR Campaign Manager and Media Relationship CRM tools for maximum coverage.'
    WHERE id = module_ids[3];
    
    UPDATE "Module" SET
        title = 'Content Marketing & Thought Leadership',
        description = 'Establish thought leadership through strategic content marketing, byline articles, speaking engagements, and industry recognition.'
    WHERE id = module_ids[4];
    
    UPDATE "Module" SET
        title = 'Crisis Communications & Reputation Management',
        description = 'Master crisis communication strategies, reputation management, and damage control with proven frameworks and real-time response protocols.'
    WHERE id = module_ids[5];
    
    UPDATE "Module" SET
        title = 'Award Strategies & Industry Recognition',
        description = 'Systematic approach to winning industry awards, building credibility, and achieving recognition through strategic positioning and compelling narratives.'
    WHERE id = module_ids[6];
    
    UPDATE "Module" SET
        title = 'Digital PR & Social Media Excellence',
        description = 'Master digital PR across all social platforms, influencer relations, community management, and viral campaign strategies for maximum reach.'
    WHERE id = module_ids[7];
    
    UPDATE "Module" SET
        title = 'Personal Branding for Founders & Executives',
        description = 'Build powerful personal brands for founders and executives with LinkedIn mastery, thought leadership positioning, and speaking engagement strategies.'
    WHERE id = module_ids[8];
    
    UPDATE "Module" SET
        title = 'Agency Relations & Vendor Management',
        description = 'Optimize relationships with PR agencies, marketing vendors, and external partners for maximum ROI and strategic alignment.'
    WHERE id = module_ids[9];
    
    UPDATE "Module" SET
        title = 'Global PR & International Expansion',
        description = 'Scale your brand internationally with cross-cultural PR strategies, global media relations, and international award positioning.'
    WHERE id = module_ids[10];
    
    UPDATE "Module" SET
        title = 'Analytics, Measurement & ROI Optimization',
        description = 'Master PR analytics, brand measurement, ROI calculation, and continuous optimization using data-driven insights and performance metrics.'
    WHERE id = module_ids[11];
    
    UPDATE "Module" SET
        title = 'Professional Certification & Mastery Assessment',
        description = 'Complete comprehensive assessment, earn professional certification, join alumni network, and establish ongoing brand & PR excellence practices.'
    WHERE id = module_ids[12];
END $$;

-- Add sample enhanced lessons with interactive tool integration
DO $$
DECLARE
    p11_product_id text;
    module_1_id text;
    module_2_id text;
    module_3_id text;
BEGIN
    SELECT id INTO p11_product_id FROM "Product" WHERE code = 'P11';
    SELECT id INTO module_1_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 1;
    SELECT id INTO module_2_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 2;
    SELECT id INTO module_3_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 3;
    
    -- Update first lesson with Brand Strategy Calculator integration
    UPDATE "Lesson" SET
        title = 'Brand Foundation Assessment & Strategy Development',
        "briefContent" = 'Master the fundamentals of brand strategy using our interactive Brand Strategy Calculator tool. Analyze your current brand strength and get personalized recommendations.',
        "actionItems" = '[
            "Complete Brand Strategy Calculator assessment",
            "Analyze your brand score and category positioning", 
            "Download personalized brand strategy recommendations",
            "Create 12-month brand development roadmap",
            "Set up brand tracking metrics and KPIs"
        ]'::jsonb,
        resources = '[
            {"title": "Brand Strategy Calculator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-strategy"},
            {"title": "Brand Foundation Templates (15 docs)", "type": "template_library", "isPremium": true},
            {"title": "Competitive Analysis Framework", "type": "worksheet", "isPremium": true},
            {"title": "Brand Positioning Canvas", "type": "canvas", "isPremium": true},
            {"title": "Brand Strategy Video Masterclass", "type": "video", "isPremium": true}
        ]'::jsonb,
        "estimatedTime" = 90,
        "xpReward" = 150,
        metadata = '{
            "difficulty": "Foundation",
            "category": "Brand Strategy",
            "tools_used": ["Brand Strategy Calculator"],
            "templates_included": 15,
            "interactive_elements": ["Calculator", "Assessment", "Roadmap Generator"]
        }'::jsonb,
        "updatedAt" = now()
    WHERE "moduleId" = module_1_id AND day = 1;
    
    -- Update a lesson with Brand Asset Generator integration
    UPDATE "Lesson" SET
        title = 'Professional Brand Asset Creation & Visual Identity',
        "briefContent" = 'Create professional brand assets using our Brand Asset Generator tool. Design logos, color palettes, typography systems, and complete visual identity packages.',
        "actionItems" = '[
            "Use Brand Asset Generator to create logo variations",
            "Generate professional color palette with psychology insights",
            "Select and customize typography pairings",
            "Create complete brand template library",
            "Download all brand assets in multiple formats"
        ]'::jsonb,
        resources = '[
            {"title": "Brand Asset Generator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-assets"},
            {"title": "Visual Identity Templates (35 docs)", "type": "template_library", "isPremium": true},
            {"title": "Logo Design Brief Template", "type": "template", "isPremium": true},
            {"title": "Color Psychology Guide", "type": "guide", "isPremium": true},
            {"title": "Typography Pairing Masterclass", "type": "video", "isPremium": true}
        ]'::jsonb,
        "estimatedTime" = 120,
        "xpReward" = 200,
        metadata = '{
            "difficulty": "Intermediate",
            "category": "Visual Identity",
            "tools_used": ["Brand Asset Generator"],
            "templates_included": 35,
            "deliverables": ["Logo Suite", "Color Palette", "Typography System", "Brand Guidelines"]
        }'::jsonb,
        "updatedAt" = now()
    WHERE "moduleId" = module_2_id AND day = 6;
    
    -- Update a lesson with PR Campaign Manager integration
    UPDATE "Lesson" SET
        title = 'PR Campaign Planning & Media Outreach Strategy',
        "briefContent" = 'Launch your first PR campaign using our professional PR Campaign Manager tool. Plan campaigns, manage media targets, and track performance like a PR agency.',
        "actionItems" = '[
            "Create your first PR campaign in the Campaign Manager",
            "Build media target database with journalist contacts",
            "Set campaign milestones and tracking metrics",
            "Launch media outreach with pitch templates",
            "Monitor campaign performance and optimize"
        ]'::jsonb,
        resources = '[
            {"title": "PR Campaign Manager Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#pr-campaigns"},
            {"title": "Media Relations Templates (25 docs)", "type": "template_library", "isPremium": true},
            {"title": "Pitch Email Templates", "type": "template", "isPremium": true},
            {"title": "Media Kit Builder", "type": "tool", "isPremium": true},
            {"title": "PR Campaign Strategy Masterclass", "type": "video", "isPremium": true}
        ]'::jsonb,
        "estimatedTime" = 105,
        "xpReward" = 175,
        metadata = '{
            "difficulty": "Advanced",
            "category": "PR Campaigns",
            "tools_used": ["PR Campaign Manager"],
            "templates_included": 25,
            "practical_outcome": "Live PR campaign launch"
        }'::jsonb,
        "updatedAt" = now()
    WHERE "moduleId" = module_3_id AND day = 15;
    
END $$;

-- Create sample activity types for P11 portfolio integration
INSERT INTO "ActivityType" (id, name, description, section, "orderIndex", "inputSchema", "outputSchema", version, "createdAt", "updatedAt")
VALUES 
(
    gen_random_uuid()::text,
    'brand_strategy_development',
    'Develop comprehensive brand strategy using Brand Strategy Calculator',
    'brand_assets',
    1,
    '{
        "type": "object",
        "properties": {
            "brand_name": {"type": "string", "title": "Brand Name"},
            "industry": {"type": "string", "title": "Industry"},
            "target_audience": {"type": "string", "title": "Target Audience"},
            "brand_score": {"type": "number", "title": "Brand Score"},
            "strategy_recommendations": {"type": "array", "title": "Key Recommendations"}
        }
    }'::jsonb,
    '{
        "type": "object", 
        "properties": {
            "brand_strategy": {"type": "string", "title": "Brand Strategy Document"},
            "positioning_statement": {"type": "string", "title": "Brand Positioning"},
            "implementation_plan": {"type": "string", "title": "Implementation Roadmap"}
        }
    }'::jsonb,
    1,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'pr_campaign_launch',
    'Launch professional PR campaign using PR Campaign Manager',
    'go_to_market',
    2,
    '{
        "type": "object",
        "properties": {
            "campaign_name": {"type": "string", "title": "Campaign Name"},
            "objective": {"type": "string", "title": "Campaign Objective"},
            "budget": {"type": "number", "title": "Budget"},
            "timeline": {"type": "string", "title": "Timeline"},
            "media_targets": {"type": "array", "title": "Media Targets"}
        }
    }'::jsonb,
    '{
        "type": "object",
        "properties": {
            "campaign_results": {"type": "string", "title": "Campaign Performance"},
            "media_coverage": {"type": "string", "title": "Media Coverage Achieved"},
            "roi_analysis": {"type": "string", "title": "ROI Analysis"}
        }
    }'::jsonb,
    1,
    now(),
    now()
);

COMMIT;

-- Verification queries
SELECT 'P11 Product Enhanced' as status, code, title, price, 
       jsonb_array_length(features) as feature_count,
       (metadata->>'total_value') as total_value
FROM "Product" WHERE code = 'P11';

SELECT 'P11 Modules Updated' as status, COUNT(*) as module_count 
FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11');

SELECT 'P11 Lessons Available' as status, COUNT(*) as lesson_count 
FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11'));

SELECT 'P11 Activity Types Added' as status, COUNT(*) as activity_count 
FROM "ActivityType" WHERE name LIKE '%brand%' OR name LIKE '%pr_%';