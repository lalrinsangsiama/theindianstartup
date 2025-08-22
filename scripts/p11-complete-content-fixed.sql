-- P11: Branding & PR Mastery - Complete Content Deployment (Fixed Schema)
-- Deploy full resources, templates, and integration for all 54 lessons
-- Version: 3.1.0 - Fixed Resource Schema
-- Date: 2025-08-21

BEGIN;

-- First, let's update all lessons with comprehensive resources
DO $$
DECLARE
    p11_product_id text;
    lesson_record RECORD;
BEGIN
    SELECT id INTO p11_product_id FROM "Product" WHERE code = 'P11';
    
    -- Update lessons in batches by module for better organization
    FOR lesson_record IN 
        SELECT l.id, l.day, l.title, m."orderIndex" as module_order
        FROM "Lesson" l
        JOIN "Module" m ON l."moduleId" = m.id
        WHERE m."productId" = p11_product_id
        ORDER BY l.day
    LOOP
        -- Update each lesson based on its module
        CASE 
            WHEN lesson_record.module_order IN (1, 2) THEN -- Brand Foundations & Visual Identity
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Brand Strategy Calculator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-strategy", "value": 15000},
                        {"title": "Brand Foundation Templates (15 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/brand-foundations.zip", "value": 25000},
                        {"title": "Visual Identity Templates (35 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/visual-identity.zip", "value": 40000},
                        {"title": "Brand Asset Generator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-assets", "value": 20000},
                        {"title": "Color Psychology Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/color-psychology.pdf", "value": 5000},
                        {"title": "Typography Masterclass", "type": "video", "isPremium": true, "duration": "45min", "value": 12000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '117000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (3, 4) THEN -- PR Strategy & Content Marketing
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "PR Campaign Manager Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#pr-campaigns", "value": 25000},
                        {"title": "Media Relations Templates (25 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/media-relations.zip", "value": 30000},
                        {"title": "Content Marketing Templates (20 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/content-marketing.zip", "value": 25000},
                        {"title": "Press Release Templates (10 formats)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/press-releases.zip", "value": 12000},
                        {"title": "Media Kit Builder", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p11/media-kit.zip", "value": 18000},
                        {"title": "Journalist Database (500+ contacts)", "type": "database", "isPremium": true, "contacts": "500+", "value": 35000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '145000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (5, 6) THEN -- Crisis Communications & Awards
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Crisis Communication Playbook (35 pages)", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p11/crisis-playbook.pdf", "value": 22000},
                        {"title": "Crisis Response Templates (15 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/crisis-templates.zip", "value": 18000},
                        {"title": "Award Submission Templates (15 awards)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/award-submissions.zip", "value": 20000},
                        {"title": "Award Calendar & Deadlines", "type": "calendar", "isPremium": true, "downloadUrl": "/templates/p11/award-calendar.xlsx", "value": 8000},
                        {"title": "Reputation Management Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/reputation-management.pdf", "value": 12000},
                        {"title": "Crisis Training Videos", "type": "video", "isPremium": true, "duration": "90min", "value": 20000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '100000'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order IN (7, 8) THEN -- Digital PR & Personal Branding
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Social Media Templates (50+ designs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/social-media.zip", "value": 16000},
                        {"title": "LinkedIn Personal Branding Kit", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/linkedin-personal.zip", "value": 12000},
                        {"title": "Influencer Outreach Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/influencer-outreach.zip", "value": 10000},
                        {"title": "Executive Bio Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/executive-bios.zip", "value": 8000},
                        {"title": "Digital PR Strategies", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/digital-pr-guide.pdf", "value": 15000},
                        {"title": "Personal Branding Masterclass", "type": "video", "isPremium": true, "duration": "75min", "value": 18000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '79000'
                    )
                WHERE id = lesson_record.id;
                
            ELSE -- Remaining modules (9-12)
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Advanced PR Templates", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/advanced-pr.zip", "value": 20000},
                        {"title": "International PR Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/international-pr.pdf", "value": 15000},
                        {"title": "Analytics Dashboard Template", "type": "dashboard", "isPremium": true, "downloadUrl": "/templates/p11/analytics-dashboard.xlsx", "value": 12000},
                        {"title": "ROI Calculator", "type": "calculator", "isPremium": true, "downloadUrl": "/templates/p11/roi-calculator.xlsx", "value": 8000},
                        {"title": "Certification Study Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/certification-guide.pdf", "value": 15000},
                        {"title": "Professional Network Access", "type": "network", "isPremium": true, "contacts": "500+", "value": 25000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{total_template_value}',
                        '95000'
                    )
                WHERE id = lesson_record.id;
        END CASE;
    END LOOP;
END $$;

-- Create comprehensive resources in Resource table with correct schema
DO $$
DECLARE
    p11_modules RECORD;
BEGIN
    -- Create resources for each P11 module
    FOR p11_modules IN 
        SELECT m.id, m.title, m."orderIndex" 
        FROM "Module" m
        JOIN "Product" p ON m."productId" = p.id
        WHERE p.code = 'P11'
        ORDER BY m."orderIndex"
    LOOP
        -- Insert comprehensive resources for each module
        INSERT INTO "Resource" (
            id,
            "moduleId",
            title,
            description,
            type,
            url,
            "fileUrl",
            tags,
            "isDownloadable",
            metadata,
            "createdAt",
            "updatedAt"
        )
        VALUES 
        (
            gen_random_uuid()::text,
            p11_modules.id,
            'Interactive Tools Suite',
            'Access to all 4 professional branding and PR tools including Brand Strategy Calculator, PR Campaign Manager, Brand Asset Generator, and Media Relationship Manager',
            'interactive_tool',
            '/products/p11',
            null,
            ARRAY['interactive', 'tools', 'branding', 'PR', 'professional'],
            false,
            jsonb_build_object(
                'tools_included', 4,
                'total_value', 85000,
                'access_url', '/products/p11',
                'category', 'Interactive Tools'
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p11_modules.id,
            'Template Library Access',
            'Complete access to 300+ professional brand and PR templates worth ₹1,50,000+ including brand guidelines, PR materials, and marketing collateral',
            'template_library',
            '/branding/templates',
            '/templates/p11/complete-library.zip',
            ARRAY['templates', 'brand', 'PR', 'marketing', 'professional'],
            true,
            jsonb_build_object(
                'templates_count', 300,
                'total_value', 150000,
                'categories', 6,
                'formats', ARRAY['PDF', 'DOCX', 'PPTX', 'AI', 'PSD', 'XLSX']
            ),
            now(),
            now()
        ),
        (
            gen_random_uuid()::text,
            p11_modules.id,
            'Video Masterclass Series',
            'Comprehensive video training series covering all aspects of brand building and PR management with expert insights and practical demonstrations',
            'video_series',
            null,
            '/videos/p11/masterclass-series.zip',
            ARRAY['video', 'training', 'masterclass', 'expert', 'practical'],
            true,
            jsonb_build_object(
                'total_duration', '12 hours',
                'video_count', 25,
                'total_value', 50000,
                'quality', '4K HD'
            ),
            now(),
            now()
        );
    END LOOP;
END $$;

-- Add comprehensive portfolio activity integration
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
    'brand_identity_development',
    'Brand Development',
    'brand_assets',
    'brandIdentity',
    '{
        "type": "object",
        "properties": {
            "brandName": {"type": "string", "title": "Brand Name", "required": true},
            "logoVariations": {"type": "number", "title": "Logo Variations Created", "minimum": 1},
            "colorPalette": {
                "type": "object", 
                "title": "Brand Colors",
                "properties": {
                    "primary": {"type": "string", "title": "Primary Color"},
                    "secondary": {"type": "string", "title": "Secondary Color"},
                    "accent": {"type": "string", "title": "Accent Color"}
                }
            },
            "typography": {
                "type": "object",
                "title": "Typography Selection",
                "properties": {
                    "heading": {"type": "string", "title": "Heading Font"},
                    "body": {"type": "string", "title": "Body Font"}
                }
            },
            "brandGuidelines": {"type": "string", "title": "Brand Guidelines Document"},
            "brandScore": {"type": "number", "title": "Brand Strategy Score", "minimum": 0, "maximum": 100}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'pr_media_coverage',
    'PR & Marketing',
    'go_to_market',
    'mediaCoverage',
    '{
        "type": "object",
        "properties": {
            "campaignName": {"type": "string", "title": "PR Campaign Name", "required": true},
            "mediaOutlets": {"type": "array", "title": "Media Outlets Covered", "items": {"type": "string"}},
            "pressReleases": {"type": "number", "title": "Press Releases Sent", "minimum": 0},
            "mediaInterviews": {"type": "number", "title": "Media Interviews Conducted", "minimum": 0},
            "totalReach": {"type": "number", "title": "Total Media Reach", "minimum": 0},
            "mediaValue": {"type": "number", "title": "Earned Media Value (₹)", "minimum": 0},
            "sentimentScore": {"type": "number", "title": "Media Sentiment Score", "minimum": 0, "maximum": 100},
            "coverageLinks": {"type": "array", "title": "Media Coverage Links", "items": {"type": "string"}}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
),
(
    gen_random_uuid()::text,
    'thought_leadership_content',
    'Content Marketing',
    'go_to_market',
    'thoughtLeadership',
    '{
        "type": "object",
        "properties": {
            "contentPieces": {"type": "number", "title": "Thought Leadership Articles", "minimum": 0},
            "speakingEngagements": {"type": "number", "title": "Speaking Engagements", "minimum": 0},
            "linkedinFollowers": {"type": "number", "title": "LinkedIn Followers Gained", "minimum": 0},
            "engagementRate": {"type": "number", "title": "Content Engagement Rate %", "minimum": 0, "maximum": 100},
            "industryRecognition": {"type": "array", "title": "Industry Recognition", "items": {"type": "string"}},
            "contentTopics": {"type": "array", "title": "Content Topics Covered", "items": {"type": "string"}},
            "platformsUsed": {"type": "array", "title": "Platforms Used", "items": {"type": "string"}}
        }
    }'::jsonb,
    1,
    true,
    now(),
    now()
);

COMMIT;

-- Comprehensive verification
SELECT 
    'P11 Complete Content Status' as verification,
    COUNT(DISTINCT l.id) as total_lessons,
    COUNT(DISTINCT CASE WHEN jsonb_array_length(l.resources) >= 6 THEN l.id END) as lessons_with_full_resources,
    COUNT(DISTINCT r.id) as resource_entries,
    COUNT(DISTINCT at.id) as activity_types
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
LEFT JOIN "Resource" r ON r."moduleId" = m.id
LEFT JOIN "ActivityType" at ON at.category IN ('Brand Development', 'PR & Marketing', 'Content Marketing')
WHERE p.code = 'P11';

SELECT 'P11 Template Value Summary' as summary,
       SUM((l.metadata->>'total_template_value')::numeric) as total_template_value
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P11' AND l.metadata->>'total_template_value' IS NOT NULL;