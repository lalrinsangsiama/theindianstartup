-- P11: Branding & PR Mastery - Enhancement Migration (Fixed)
-- Upgrade existing P11 with premium features, tools, and enhanced content
-- Version: 2.0.0 - High-Ticket Enhancement (Fixed Schema)
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
    
    -- Update each module with enhanced descriptions (only if modules exist)
    IF array_length(module_ids, 1) >= 12 THEN
        UPDATE "Module" SET
            title = 'Brand Foundations & Strategy Mastery',
            description = 'Build bulletproof brand foundations with comprehensive strategy framework, positioning, and messaging. Includes Brand Strategy Calculator tool and 50+ templates.',
            "updatedAt" = now()
        WHERE id = module_ids[1];
        
        UPDATE "Module" SET
            title = 'Brand Identity & Visual System Excellence',
            description = 'Create professional brand identity with logos, colors, typography, and visual guidelines. Master the Brand Asset Generator tool with unlimited design variations.',
            "updatedAt" = now()
        WHERE id = module_ids[2];
        
        UPDATE "Module" SET
            title = 'PR Strategy & Media Relations Mastery',
            description = 'Build strategic PR campaigns and strong media relationships. Master the PR Campaign Manager and Media Relationship CRM tools for maximum coverage.',
            "updatedAt" = now()
        WHERE id = module_ids[3];
        
        UPDATE "Module" SET
            title = 'Content Marketing & Thought Leadership',
            description = 'Establish thought leadership through strategic content marketing, byline articles, speaking engagements, and industry recognition.',
            "updatedAt" = now()
        WHERE id = module_ids[4];
        
        UPDATE "Module" SET
            title = 'Crisis Communications & Reputation Management',
            description = 'Master crisis communication strategies, reputation management, and damage control with proven frameworks and real-time response protocols.',
            "updatedAt" = now()
        WHERE id = module_ids[5];
        
        UPDATE "Module" SET
            title = 'Award Strategies & Industry Recognition',
            description = 'Systematic approach to winning industry awards, building credibility, and achieving recognition through strategic positioning and compelling narratives.',
            "updatedAt" = now()
        WHERE id = module_ids[6];
        
        UPDATE "Module" SET
            title = 'Digital PR & Social Media Excellence',
            description = 'Master digital PR across all social platforms, influencer relations, community management, and viral campaign strategies for maximum reach.',
            "updatedAt" = now()
        WHERE id = module_ids[7];
        
        UPDATE "Module" SET
            title = 'Personal Branding for Founders & Executives',
            description = 'Build powerful personal brands for founders and executives with LinkedIn mastery, thought leadership positioning, and speaking engagement strategies.',
            "updatedAt" = now()
        WHERE id = module_ids[8];
        
        UPDATE "Module" SET
            title = 'Agency Relations & Vendor Management',
            description = 'Optimize relationships with PR agencies, marketing vendors, and external partners for maximum ROI and strategic alignment.',
            "updatedAt" = now()
        WHERE id = module_ids[9];
        
        UPDATE "Module" SET
            title = 'Global PR & International Expansion',
            description = 'Scale your brand internationally with cross-cultural PR strategies, global media relations, and international award positioning.',
            "updatedAt" = now()
        WHERE id = module_ids[10];
        
        UPDATE "Module" SET
            title = 'Analytics, Measurement & ROI Optimization',
            description = 'Master PR analytics, brand measurement, ROI calculation, and continuous optimization using data-driven insights and performance metrics.',
            "updatedAt" = now()
        WHERE id = module_ids[11];
        
        UPDATE "Module" SET
            title = 'Professional Certification & Mastery Assessment',
            description = 'Complete comprehensive assessment, earn professional certification, join alumni network, and establish ongoing brand & PR excellence practices.',
            "updatedAt" = now()
        WHERE id = module_ids[12];
    END IF;
END $$;

-- Add enhanced lesson content with tool integration
DO $$
DECLARE
    p11_product_id text;
    module_1_id text;
    module_2_id text;
    module_3_id text;
    lesson_1_id text;
    lesson_6_id text;
    lesson_15_id text;
BEGIN
    SELECT id INTO p11_product_id FROM "Product" WHERE code = 'P11';
    
    -- Get module IDs
    SELECT id INTO module_1_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 1;
    SELECT id INTO module_2_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 2;
    SELECT id INTO module_3_id FROM "Module" WHERE "productId" = p11_product_id AND "orderIndex" = 3;
    
    -- Get lesson IDs for specific days
    SELECT id INTO lesson_1_id FROM "Lesson" WHERE "moduleId" = module_1_id AND day = 1 LIMIT 1;
    SELECT id INTO lesson_6_id FROM "Lesson" WHERE "moduleId" = module_2_id AND day = 6 LIMIT 1;
    SELECT id INTO lesson_15_id FROM "Lesson" WHERE "moduleId" = module_3_id AND day = 15 LIMIT 1;
    
    -- Update first lesson with Brand Strategy Calculator integration
    IF lesson_1_id IS NOT NULL THEN
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
        WHERE id = lesson_1_id;
    END IF;
    
    -- Update lesson with Brand Asset Generator integration
    IF lesson_6_id IS NOT NULL THEN
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
        WHERE id = lesson_6_id;
    END IF;
    
    -- Update lesson with PR Campaign Manager integration
    IF lesson_15_id IS NOT NULL THEN
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
        WHERE id = lesson_15_id;
    END IF;
END $$;

-- Create P11 portfolio activity types with correct schema
INSERT INTO "ActivityType" (
    id, 
    name, 
    category, 
    "portfolioSection", 
    "portfolioField", 
    "dataSchema", 
    version, 
    "isActive",
    "createdAt", 
    "updatedAt"
)
VALUES 
(
    gen_random_uuid()::text,
    'brand_strategy_development',
    'Brand Development',
    'brand_assets',
    'brandStrategy',
    '{
        "type": "object",
        "properties": {
            "brandName": {"type": "string", "title": "Brand Name", "required": true},
            "industry": {"type": "string", "title": "Industry", "required": true},
            "targetAudience": {"type": "string", "title": "Target Audience", "required": true},
            "brandScore": {"type": "number", "title": "Brand Score (0-100)", "minimum": 0, "maximum": 100},
            "brandCategory": {"type": "string", "title": "Brand Category", "enum": ["Emerging Brand", "Growing Brand", "Brand Leader"]},
            "strategyRecommendations": {"type": "array", "title": "Key Recommendations", "items": {"type": "string"}},
            "investmentAreas": {"type": "array", "title": "Investment Areas", "items": {"type": "string"}},
            "expectedROI": {"type": "string", "title": "Expected ROI"},
            "timeline": {"type": "string", "title": "Implementation Timeline"},
            "brandValue": {"type": "number", "title": "Estimated Brand Value (₹)"}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'pr_campaign_execution',
    'PR & Marketing',
    'go_to_market',
    'prCampaign',
    '{
        "type": "object",
        "properties": {
            "campaignName": {"type": "string", "title": "Campaign Name", "required": true},
            "objective": {"type": "string", "title": "Campaign Objective", "required": true},
            "budget": {"type": "number", "title": "Budget (₹)", "minimum": 0},
            "timeline": {"type": "string", "title": "Timeline", "required": true},
            "mediaTargets": {"type": "array", "title": "Media Targets", "items": {"type": "string"}},
            "keyMessages": {"type": "array", "title": "Key Messages", "items": {"type": "string"}},
            "channels": {"type": "array", "title": "PR Channels", "items": {"type": "string"}},
            "impressions": {"type": "number", "title": "Total Impressions"},
            "mentions": {"type": "number", "title": "Media Mentions"},
            "mediaValue": {"type": "number", "title": "Earned Media Value (₹)"},
            "positiveSentiment": {"type": "number", "title": "Positive Sentiment %", "minimum": 0, "maximum": 100}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'brand_asset_creation',
    'Brand Development', 
    'brand_assets',
    'visualIdentity',
    '{
        "type": "object",
        "properties": {
            "logoVariations": {"type": "number", "title": "Logo Variations Created"},
            "colorPalette": {"type": "object", "title": "Brand Color Palette", "properties": {
                "primary": {"type": "string", "title": "Primary Color"},
                "secondary": {"type": "string", "title": "Secondary Color"},
                "accent": {"type": "string", "title": "Accent Color"}
            }},
            "typography": {"type": "object", "title": "Typography System", "properties": {
                "heading": {"type": "string", "title": "Heading Font"},
                "body": {"type": "string", "title": "Body Font"}
            }},
            "brandGuidelines": {"type": "string", "title": "Brand Guidelines Document"},
            "templateLibrary": {"type": "number", "title": "Templates Created"},
            "assetFormats": {"type": "array", "title": "Asset Formats", "items": {"type": "string"}}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
);

COMMIT;

-- Verification queries
SELECT 'P11 Product Enhanced' as status, code, title, price, 
       jsonb_array_length(features) as feature_count,
       (metadata->>'total_value') as total_value
FROM "Product" WHERE code = 'P11';

SELECT 'P11 Modules Updated' as status, COUNT(*) as module_count,
       string_agg(title, ', ') as sample_titles
FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11');

SELECT 'P11 Enhanced Lessons' as status, COUNT(*) as enhanced_lesson_count
FROM "Lesson" 
WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" IN (SELECT id FROM "Product" WHERE code = 'P11'))
AND metadata IS NOT NULL;

SELECT 'P11 Activity Types' as status, COUNT(*) as activity_count,
       string_agg(name, ', ') as activity_names
FROM "ActivityType" WHERE category IN ('Brand Development', 'PR & Marketing');