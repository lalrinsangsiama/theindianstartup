-- P9 Enhanced Resources - Government Schemes & Funding Mastery
-- Adds comprehensive resources for P9 course

-- Get P9 module IDs
WITH p9_modules AS (
    SELECT m.id, m.title, m."orderIndex"
    FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P9'
)

-- Insert comprehensive P9 resources
INSERT INTO "Resource" (
    "id", "moduleId", "title", "description", "type", 
    "url", "fileUrl", "tags", "isDownloadable", 
    "viewCount", "downloadCount", "useCount", "createdAt", "updatedAt"
) VALUES

-- Module 1: Foundation & Ecosystem Navigation Resources
(
    'p9_res_01', 
    (SELECT id FROM p9_modules WHERE "orderIndex" = 1),
    '🏛️ Complete Government Schemes Database',
    'Comprehensive database of 500+ central and state government schemes with eligibility criteria, funding amounts, and application processes.',
    'database',
    '/templates/p9-schemes-database.html',
    NULL,
    ARRAY['government', 'schemes', 'database', 'funding'],
    false,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_02',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 1),
    '📋 Ministry Contact Directory',
    'Direct contact details of 50+ ministry officials and scheme nodal officers for expedited processing.',
    'document',
    NULL,
    '/downloads/p9-ministry-contacts.pdf',
    ARRAY['contacts', 'ministry', 'government', 'officials'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_03',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 1),
    '🎯 Eligibility Assessment Tool',
    'Interactive tool to instantly check eligibility across 100+ government schemes based on your startup profile.',
    'tool',
    '/templates/p9-eligibility-calculator.html',
    NULL,
    ARRAY['eligibility', 'calculator', 'assessment', 'tool'],
    false,
    0, 0, 0, NOW(), NOW()
),

-- Module 2: The Money Map - Funding Strategies Resources
(
    'p9_res_04',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 2),
    '💰 Grant Writing Templates',
    'Battle-tested grant application templates for PMEGP, SISFS, CGTMSE, and 47+ other schemes.',
    'template',
    NULL,
    '/downloads/p9-grant-templates.zip',
    ARRAY['grant', 'templates', 'applications', 'funding'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_05',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 2),
    '📊 Funding Calculator & Planner',
    'Calculate potential funding from multiple schemes and create your 18-month funding roadmap.',
    'spreadsheet',
    NULL,
    '/downloads/p9-funding-calculator.xlsx',
    ARRAY['calculator', 'funding', 'planning', 'financial'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_06',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 2),
    '🎬 Success Story Case Studies',
    'Video case studies of 25 startups who secured ₹25L-₹5Cr through government schemes.',
    'video',
    '/resources/p9-success-stories',
    NULL,
    ARRAY['case studies', 'success stories', 'video', 'examples'],
    false,
    0, 0, 0, NOW(), NOW()
),

-- Module 3: Category & Sector Mastery Resources
(
    'p9_res_07',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 3),
    '🏭 Sector-Specific Scheme Guide',
    'Curated scheme lists for Tech, Manufacturing, Agriculture, Services, and Export sectors.',
    'guide',
    NULL,
    '/downloads/p9-sector-schemes.pdf',
    ARRAY['sector', 'industry', 'specific', 'guide'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_08',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 3),
    '👩‍💼 Women Entrepreneur Benefits',
    'Complete guide to additional 10-15% benefits available for women entrepreneurs across schemes.',
    'document',
    NULL,
    '/downloads/p9-women-benefits.pdf',
    ARRAY['women', 'entrepreneur', 'benefits', 'special'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_09',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 3),
    '🗺️ State Benefits Comparison',
    'Interactive map comparing benefits across all 28 states and 8 UTs for location optimization.',
    'tool',
    '/templates/p9-state-comparison.html',
    NULL,
    ARRAY['state', 'comparison', 'benefits', 'location'],
    false,
    0, 0, 0, NOW(), NOW()
),

-- Module 4: Implementation Mastery & Tools Resources
(
    'p9_res_10',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '📱 Application Tracker System',
    'Track all your government scheme applications with automated reminders and status updates.',
    'tool',
    '/templates/p9-application-tracker.html',
    NULL,
    ARRAY['tracker', 'applications', 'management', 'tool'],
    false,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_11',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '📄 Document Preparation Checklist',
    'Master checklist of 50+ documents needed for various schemes with preparation templates.',
    'checklist',
    NULL,
    '/downloads/p9-document-checklist.pdf',
    ARRAY['documents', 'checklist', 'preparation', 'compliance'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_12',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '🏆 GeM Registration Guide',
    'Step-by-step guide to register on Government e-Marketplace and win government contracts.',
    'guide',
    NULL,
    '/downloads/p9-gem-guide.pdf',
    ARRAY['GeM', 'marketplace', 'government', 'contracts'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_13',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '💼 Consultant Network Directory',
    'Verified list of 100+ consultants specializing in government scheme applications with success rates.',
    'directory',
    NULL,
    '/downloads/p9-consultant-directory.xlsx',
    ARRAY['consultants', 'network', 'directory', 'experts'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_14',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '📈 ROI Optimization Framework',
    'Framework to maximize returns from government schemes through strategic stacking and timing.',
    'framework',
    NULL,
    '/downloads/p9-roi-framework.pdf',
    ARRAY['ROI', 'optimization', 'strategy', 'framework'],
    true,
    0, 0, 0, NOW(), NOW()
),
(
    'p9_res_15',
    (SELECT id FROM p9_modules WHERE "orderIndex" = 4),
    '🔗 Quick Links Dashboard',
    'Bookmarkable dashboard with direct links to 100+ government scheme portals and application forms.',
    'tool',
    '/templates/p9-quick-links.html',
    NULL,
    ARRAY['links', 'portals', 'dashboard', 'bookmarks'],
    false,
    0, 0, 0, NOW(), NOW()
)

ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    type = EXCLUDED.type,
    url = EXCLUDED.url,
    "fileUrl" = EXCLUDED."fileUrl",
    tags = EXCLUDED.tags,
    "updatedAt" = NOW();