-- P11: Branding & PR Mastery - Complete Content Deployment
-- Deploy full resources, templates, and integration for all 54 lessons
-- Version: 3.0.0 - Full Content Integration
-- Date: 2025-08-21

BEGIN;

-- Update lessons with comprehensive resources and templates
DO $$
DECLARE
    p11_product_id text;
    lesson_record RECORD;
BEGIN
    SELECT id INTO p11_product_id FROM "Product" WHERE code = 'P11';
    
    -- Loop through all P11 lessons and enhance them with comprehensive resources
    FOR lesson_record IN 
        SELECT l.id, l.day, l.title, m."orderIndex" as module_order
        FROM "Lesson" l
        JOIN "Module" m ON l."moduleId" = m.id
        WHERE m."productId" = p11_product_id
        ORDER BY l.day
    LOOP
        -- Update each lesson based on its module and content type
        CASE 
            WHEN lesson_record.module_order = 1 THEN -- Brand Foundations & Strategy
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Brand Strategy Calculator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-strategy", "value": 15000},
                        {"title": "Brand Foundation Templates (15 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/brand-foundations.zip", "value": 25000},
                        {"title": "Competitive Analysis Framework", "type": "worksheet", "isPremium": true, "downloadUrl": "/templates/p11/competitive-analysis.pdf", "value": 5000},
                        {"title": "Brand Positioning Canvas", "type": "canvas", "isPremium": true, "downloadUrl": "/templates/p11/positioning-canvas.pdf", "value": 8000},
                        {"title": "Brand Strategy Video Masterclass", "type": "video", "isPremium": true, "duration": "45min", "value": 12000},
                        {"title": "Indian Market Research Database", "type": "database", "isPremium": true, "entries": "500+ companies", "value": 20000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '15'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 2 THEN -- Brand Identity & Visual System
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Brand Asset Generator Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#brand-assets", "value": 20000},
                        {"title": "Visual Identity Templates (35 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/visual-identity.zip", "value": 40000},
                        {"title": "Logo Design Brief Template", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/logo-brief.docx", "value": 3000},
                        {"title": "Color Psychology Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/color-psychology.pdf", "value": 5000},
                        {"title": "Typography Pairing Masterclass", "type": "video", "isPremium": true, "duration": "35min", "value": 8000},
                        {"title": "Brand Guidelines Template (40 pages)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/brand-guidelines.indd", "value": 15000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '35'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 3 THEN -- PR Strategy & Media Relations
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "PR Campaign Manager Tool", "type": "interactive_tool", "isPremium": true, "url": "/products/p11#pr-campaigns", "value": 25000},
                        {"title": "Media Relations Templates (25 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/media-relations.zip", "value": 30000},
                        {"title": "Press Release Template Library (10 formats)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/press-releases.zip", "value": 12000},
                        {"title": "Media Kit Builder", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p11/media-kit.zip", "value": 18000},
                        {"title": "Journalist Database (500+ contacts)", "type": "database", "isPremium": true, "contacts": "500+", "value": 35000},
                        {"title": "PR Campaign Strategy Masterclass", "type": "video", "isPremium": true, "duration": "60min", "value": 15000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '25'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 4 THEN -- Content Marketing & Thought Leadership
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Content Calendar Template", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/content-calendar.xlsx", "value": 5000},
                        {"title": "Thought Leadership Framework (20 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/thought-leadership.zip", "value": 25000},
                        {"title": "Byline Article Templates (5 formats)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/byline-articles.zip", "value": 10000},
                        {"title": "Speaking Engagement Kit", "type": "kit", "isPremium": true, "downloadUrl": "/templates/p11/speaking-kit.zip", "value": 15000},
                        {"title": "LinkedIn Content Templates (50 posts)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/linkedin-content.zip", "value": 8000},
                        {"title": "Content Marketing Masterclass", "type": "video", "isPremium": true, "duration": "50min", "value": 12000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '20'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 5 THEN -- Crisis Communications & Reputation Management
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Crisis Communication Playbook (35 pages)", "type": "playbook", "isPremium": true, "downloadUrl": "/templates/p11/crisis-playbook.pdf", "value": 22000},
                        {"title": "Crisis Response Templates (15 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/crisis-templates.zip", "value": 18000},
                        {"title": "Media Monitoring Setup Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/media-monitoring.pdf", "value": 8000},
                        {"title": "Reputation Recovery Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p11/reputation-recovery.pdf", "value": 12000},
                        {"title": "Crisis Training Video Series", "type": "video", "isPremium": true, "duration": "90min", "value": 20000},
                        {"title": "Legal Review Checklist", "type": "checklist", "isPremium": true, "downloadUrl": "/templates/p11/legal-checklist.pdf", "value": 5000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '15'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 6 THEN -- Award Strategies & Industry Recognition
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Award Submission Templates (15 major awards)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/award-submissions.zip", "value": 20000},
                        {"title": "Award Calendar & Deadlines", "type": "calendar", "isPremium": true, "downloadUrl": "/templates/p11/award-calendar.xlsx", "value": 8000},
                        {"title": "Achievement Documentation Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p11/achievement-docs.pdf", "value": 10000},
                        {"title": "Industry Recognition Strategy", "type": "strategy", "isPremium": true, "downloadUrl": "/templates/p11/recognition-strategy.pdf", "value": 15000},
                        {"title": "Award Winning Case Studies", "type": "case_study", "isPremium": true, "studies": "25+", "value": 12000},
                        {"title": "Testimonial Collection Kit", "type": "kit", "isPremium": true, "downloadUrl": "/templates/p11/testimonial-kit.zip", "value": 7000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '15'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 7 THEN -- Digital PR & Social Media Excellence
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Social Media Template Library (50+ designs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/social-media.zip", "value": 16000},
                        {"title": "Influencer Outreach Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/influencer-outreach.zip", "value": 10000},
                        {"title": "Digital PR Campaign Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/digital-pr.zip", "value": 15000},
                        {"title": "Community Management Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/community-management.pdf", "value": 8000},
                        {"title": "Viral Content Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p11/viral-content.pdf", "value": 12000},
                        {"title": "Social Media Masterclass", "type": "video", "isPremium": true, "duration": "75min", "value": 18000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '50'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 8 THEN -- Personal Branding for Founders & Executives
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "LinkedIn Personal Branding Templates", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/linkedin-personal.zip", "value": 12000},
                        {"title": "Executive Bio Templates (5 lengths)", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/executive-bios.zip", "value": 8000},
                        {"title": "Thought Leadership Content Calendar", "type": "calendar", "isPremium": true, "downloadUrl": "/templates/p11/thought-leadership-calendar.xlsx", "value": 6000},
                        {"title": "Speaking Engagement Proposal Kit", "type": "kit", "isPremium": true, "downloadUrl": "/templates/p11/speaking-proposals.zip", "value": 15000},
                        {"title": "Personal Brand Audit Tool", "type": "tool", "isPremium": true, "downloadUrl": "/templates/p11/brand-audit.xlsx", "value": 10000},
                        {"title": "Founder Branding Masterclass", "type": "video", "isPremium": true, "duration": "65min", "value": 15000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '12'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 9 THEN -- Agency Relations & Vendor Management
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Agency Evaluation Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p11/agency-evaluation.pdf", "value": 8000},
                        {"title": "PR Agency Contract Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/agency-contracts.zip", "value": 12000},
                        {"title": "Vendor Management System", "type": "system", "isPremium": true, "downloadUrl": "/templates/p11/vendor-management.xlsx", "value": 10000},
                        {"title": "ROI Measurement Framework", "type": "framework", "isPremium": true, "downloadUrl": "/templates/p11/roi-measurement.pdf", "value": 15000},
                        {"title": "Agency Briefing Templates", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/agency-briefing.zip", "value": 7000},
                        {"title": "Vendor Optimization Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/vendor-optimization.pdf", "value": 8000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '10'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 10 THEN -- Global PR & International Expansion
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "International PR Templates (25 docs)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/international-pr.zip", "value": 25000},
                        {"title": "Cross-Cultural Communication Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/cross-cultural.pdf", "value": 12000},
                        {"title": "Global Media Database", "type": "database", "isPremium": true, "contacts": "1000+", "value": 40000},
                        {"title": "International Awards Directory", "type": "directory", "isPremium": true, "awards": "100+", "value": 15000},
                        {"title": "Market Entry PR Strategy", "type": "strategy", "isPremium": true, "downloadUrl": "/templates/p11/market-entry.pdf", "value": 18000},
                        {"title": "Global Expansion Case Studies", "type": "case_study", "isPremium": true, "studies": "15+", "value": 20000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '25'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 11 THEN -- Analytics, Measurement & ROI Optimization
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "PR Analytics Dashboard Template", "type": "dashboard", "isPremium": true, "downloadUrl": "/templates/p11/analytics-dashboard.xlsx", "value": 15000},
                        {"title": "ROI Calculator Tool", "type": "calculator", "isPremium": true, "downloadUrl": "/templates/p11/roi-calculator.xlsx", "value": 8000},
                        {"title": "Brand Tracking Survey Template", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/brand-tracking.docx", "value": 10000},
                        {"title": "Media Value Measurement Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/media-value.pdf", "value": 12000},
                        {"title": "Performance Reporting Templates (12 formats)", "type": "template_library", "isPremium": true, "downloadUrl": "/templates/p11/performance-reports.zip", "value": 18000},
                        {"title": "Analytics Masterclass", "type": "video", "isPremium": true, "duration": "55min", "value": 15000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '12'
                    )
                WHERE id = lesson_record.id;
                
            WHEN lesson_record.module_order = 12 THEN -- Professional Certification & Mastery Assessment
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Certification Study Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/certification-guide.pdf", "value": 15000},
                        {"title": "Practice Examination Bank (100 questions)", "type": "exam", "isPremium": true, "questions": "100+", "value": 20000},
                        {"title": "Portfolio Showcase Template", "type": "template", "isPremium": true, "downloadUrl": "/templates/p11/portfolio-showcase.pptx", "value": 10000},
                        {"title": "Professional Network Directory", "type": "directory", "isPremium": true, "contacts": "500+", "value": 25000},
                        {"title": "Continuing Education Resources", "type": "resource", "isPremium": true, "resources": "50+", "value": 18000},
                        {"title": "Alumni Success Stories", "type": "case_study", "isPremium": true, "stories": "25+", "value": 12000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '15'
                    )
                WHERE id = lesson_record.id;
                
            ELSE
                -- Default resources for any unmatched lessons
                UPDATE "Lesson" SET
                    resources = '[
                        {"title": "Brand & PR Resource Library", "type": "library", "isPremium": true, "downloadUrl": "/templates/p11/general-resources.zip", "value": 10000},
                        {"title": "Best Practices Guide", "type": "guide", "isPremium": true, "downloadUrl": "/templates/p11/best-practices.pdf", "value": 8000},
                        {"title": "Case Study Examples", "type": "case_study", "isPremium": true, "studies": "10+", "value": 12000},
                        {"title": "Implementation Checklist", "type": "checklist", "isPremium": true, "downloadUrl": "/templates/p11/implementation.pdf", "value": 5000}
                    ]'::jsonb,
                    metadata = jsonb_set(
                        COALESCE(metadata, '{}'),
                        '{templates_included}',
                        '5'
                    )
                WHERE id = lesson_record.id;
        END CASE;
    END LOOP;
END $$;

-- Create comprehensive resource hub entries for P11
INSERT INTO "Resource" (
    id,
    title,
    description,
    category,
    subcategory,
    type,
    "downloadUrl",
    "previewUrl",
    "isPremium",
    value,
    format,
    "productCode",
    tags,
    "createdAt",
    "updatedAt"
)
VALUES 
-- Brand Strategy Resources
(
    gen_random_uuid()::text,
    'Brand Strategy Calculator Tool',
    'AI-powered brand analysis tool with 8 key metrics, personalized recommendations, and ROI projections',
    'Interactive Tools',
    'Brand Strategy',
    'tool',
    '/products/p11#brand-strategy',
    '/products/p11#brand-strategy',
    true,
    15000,
    'Web App',
    'P11',
    '["brand strategy", "AI analysis", "recommendations", "calculator"]'::jsonb,
    now(),
    now()
),
-- PR Campaign Resources
(
    gen_random_uuid()::text,
    'PR Campaign Manager',
    'Complete PR campaign planning and management system with media tracking and performance analytics',
    'Interactive Tools',
    'PR Management',
    'tool',
    '/products/p11#pr-campaigns',
    '/products/p11#pr-campaigns',
    true,
    25000,
    'Web App',
    'P11',
    '["PR campaigns", "media relations", "campaign management", "analytics"]'::jsonb,
    now(),
    now()
),
-- Brand Assets Resources
(
    gen_random_uuid()::text,
    'Brand Asset Generator',
    'Professional brand asset creation tool with logo builder, color palettes, and typography selection',
    'Interactive Tools',
    'Brand Assets',
    'tool',
    '/products/p11#brand-assets',
    '/products/p11#brand-assets',
    true,
    20000,
    'Web App',
    'P11',
    '["brand assets", "logo design", "color palette", "typography"]'::jsonb,
    now(),
    now()
),
-- Media Relations Resources
(
    gen_random_uuid()::text,
    'Media Relationship Manager',
    'Comprehensive media relationship management system with journalist database and pitch tracking',
    'Interactive Tools',
    'Media Relations',
    'tool',
    '/products/p11#media-relations',
    '/products/p11#media-relations',
    true,
    25000,
    'Web App',
    'P11',
    '["media relations", "journalist database", "pitch tracking", "CRM"]'::jsonb,
    now(),
    now()
),
-- Template Library Access
(
    gen_random_uuid()::text,
    'Complete Template Library (300+ Templates)',
    'Access to complete library of 300+ professional brand and PR templates worth ₹1,50,000+',
    'Templates',
    'Complete Library',
    'library',
    '/branding/templates',
    '/branding/templates',
    true,
    150000,
    'Multiple Formats',
    'P11',
    '["templates", "brand identity", "PR", "marketing", "complete library"]'::jsonb,
    now(),
    now()
);

COMMIT;

-- Verification queries
SELECT 'P11 Content Deployment' as status,
       COUNT(*) as total_lessons,
       COUNT(CASE WHEN jsonb_array_length(resources) >= 6 THEN 1 END) as lessons_with_full_resources
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P11';

SELECT 'P11 Resource Hub' as status,
       COUNT(*) as resource_count,
       SUM(value) as total_resource_value
FROM "Resource" 
WHERE "productCode" = 'P11';