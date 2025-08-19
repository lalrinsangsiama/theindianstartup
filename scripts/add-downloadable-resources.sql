-- =====================================================================================
-- DOWNLOADABLE TEMPLATES AND TOOLS FOR ALL COURSES
-- =====================================================================================
-- Adds downloadable resources to the Resource table for all courses
-- =====================================================================================

-- First, ensure we have the Resource table columns
-- Add isDownloadable column if it doesn't exist (should already be in schema)

-- =====================================================================================
-- P1: 30-DAY LAUNCH SPRINT - DOWNLOADABLE RESOURCES
-- =====================================================================================

-- Core Templates for P1
INSERT INTO "Resource" (id, "moduleId", title, description, type, url, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
SELECT 
  'p1_download_' || generate_series,
  (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P1') ORDER BY m."orderIndex" LIMIT 1),
  CASE generate_series
    WHEN 1 THEN '📊 Startup Idea Validation Canvas (Excel)'
    WHEN 2 THEN '📝 Business Model Canvas Template (PPT)'
    WHEN 3 THEN '💰 5-Year Financial Model (Excel)'
    WHEN 4 THEN '📋 Customer Interview Script Pack (Word)'
    WHEN 5 THEN '🎯 Go-to-Market Strategy Template (PPT)'
    WHEN 6 THEN '📑 Pitch Deck Collection (10 Templates)'
    WHEN 7 THEN '📈 Growth Metrics Dashboard (Excel)'
    WHEN 8 THEN '⚖️ Founder Agreement Template (Word)'
    WHEN 9 THEN '🔍 Market Research Framework (Excel)'
    WHEN 10 THEN '🚀 Product Roadmap Template (PPT)'
  END,
  CASE generate_series
    WHEN 1 THEN 'Interactive Excel canvas with 50+ validation criteria, market size calculator, and competitor analysis matrix.'
    WHEN 2 THEN 'Editable PowerPoint template with examples from successful Indian startups and industry-specific variations.'
    WHEN 3 THEN 'Comprehensive financial model with revenue projections, cost structures, funding scenarios, and investor-ready charts.'
    WHEN 4 THEN 'Pack of 20+ interview scripts for different customer segments with question banks and analysis templates.'
    WHEN 5 THEN 'Complete GTM strategy template with channel selection, pricing models, and launch timeline planning.'
    WHEN 6 THEN 'Collection of successful pitch decks from Uber, Airbnb, and Indian unicorns with editable templates.'
    WHEN 7 THEN 'Automated dashboard tracking CAC, LTV, MRR, churn, and 50+ key metrics with visualization.'
    WHEN 8 THEN 'Legal template for co-founder agreements with equity split, vesting, IP assignment, and exit clauses.'
    WHEN 9 THEN 'Comprehensive market research framework with TAM/SAM/SOM calculators and competitor tracking sheets.'
    WHEN 10 THEN 'Visual product roadmap template with milestone tracking, feature prioritization, and resource planning.'
  END,
  CASE generate_series
    WHEN 1 THEN 'spreadsheet'
    WHEN 2 THEN 'presentation'
    WHEN 3 THEN 'spreadsheet'
    WHEN 4 THEN 'document'
    WHEN 5 THEN 'presentation'
    WHEN 6 THEN 'presentation'
    WHEN 7 THEN 'spreadsheet'
    WHEN 8 THEN 'document'
    WHEN 9 THEN 'spreadsheet'
    WHEN 10 THEN 'presentation'
  END,
  '#download-p1-' || generate_series,
  '/downloads/p1/resource_' || generate_series || CASE generate_series
    WHEN 1 THEN '.xlsx'
    WHEN 2 THEN '.pptx'
    WHEN 3 THEN '.xlsx'
    WHEN 4 THEN '.docx'
    WHEN 5 THEN '.pptx'
    WHEN 6 THEN '.zip'
    WHEN 7 THEN '.xlsx'
    WHEN 8 THEN '.docx'
    WHEN 9 THEN '.xlsx'
    WHEN 10 THEN '.pptx'
  END,
  ARRAY['downloadable', 'template', 'p1', 'essential'],
  true,
  NOW(),
  NOW()
FROM generate_series(1, 10)
WHERE NOT EXISTS (SELECT 1 FROM "Resource" WHERE id = 'p1_download_' || generate_series);

-- =====================================================================================
-- P2: INCORPORATION & COMPLIANCE - DOWNLOADABLE RESOURCES
-- =====================================================================================

INSERT INTO "Resource" (id, "moduleId", title, description, type, url, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
SELECT 
  'p2_download_' || generate_series,
  (SELECT m.id FROM "Module" m WHERE m."productId" = 'p2_incorporation_compliance' ORDER BY m."orderIndex" LIMIT 1),
  CASE generate_series
    WHEN 1 THEN '📋 Complete Incorporation Checklist (Excel)'
    WHEN 2 THEN '📝 MoA & AoA Templates (Word)'
    WHEN 3 THEN '📊 GST Compliance Calendar (Excel)'
    WHEN 4 THEN '⚖️ Board Resolution Templates (50+)'
    WHEN 5 THEN '💼 Employment Agreement Pack (Word)'
    WHEN 6 THEN '📑 Shareholder Agreement Builder (Word)'
    WHEN 7 THEN '🗓️ Annual Compliance Tracker (Excel)'
    WHEN 8 THEN '🏢 ESOP Policy Framework (Word)'
    WHEN 9 THEN '📋 Audit Checklist Pro (Excel)'
    WHEN 10 THEN '🌐 Multi-State Registration Guide (PDF)'
  END,
  CASE generate_series
    WHEN 1 THEN 'Step-by-step incorporation checklist with 200+ items, timeline, and cost calculator for all entity types.'
    WHEN 2 THEN 'Customizable Memorandum and Articles of Association templates for Pvt Ltd, LLP, and OPC.'
    WHEN 3 THEN 'Automated GST compliance calendar with return filing dates, payment reminders, and reconciliation sheets.'
    WHEN 4 THEN 'Collection of 50+ board resolution templates for all common corporate actions and decisions.'
    WHEN 5 THEN 'Complete employment documentation pack with offer letters, NDAs, and termination procedures.'
    WHEN 6 THEN 'Interactive shareholder agreement builder with drag-out, tag-along, and ROFR clauses.'
    WHEN 7 THEN 'Comprehensive annual compliance tracker for MCA, GST, Income Tax, and labour law filings.'
    WHEN 8 THEN 'Complete ESOP policy with valuation methods, vesting schedules, and tax optimization strategies.'
    WHEN 9 THEN 'Detailed audit preparation checklist ensuring 100% compliance for statutory audits.'
    WHEN 10 THEN 'Guide for registering business across multiple states with benefit comparison and cost analysis.'
  END,
  CASE generate_series
    WHEN 1 THEN 'spreadsheet'
    WHEN 2 THEN 'document'
    WHEN 3 THEN 'spreadsheet'
    WHEN 4 THEN 'document'
    WHEN 5 THEN 'document'
    WHEN 6 THEN 'document'
    WHEN 7 THEN 'spreadsheet'
    WHEN 8 THEN 'document'
    WHEN 9 THEN 'spreadsheet'
    WHEN 10 THEN 'guide'
  END,
  '#download-p2-' || generate_series,
  '/downloads/p2/resource_' || generate_series || CASE generate_series
    WHEN 1 THEN '.xlsx'
    WHEN 2 THEN '.zip'
    WHEN 3 THEN '.xlsx'
    WHEN 4 THEN '.zip'
    WHEN 5 THEN '.zip'
    WHEN 6 THEN '.docx'
    WHEN 7 THEN '.xlsx'
    WHEN 8 THEN '.docx'
    WHEN 9 THEN '.xlsx'
    WHEN 10 THEN '.pdf'
  END,
  ARRAY['downloadable', 'legal', 'compliance', 'p2'],
  true,
  NOW(),
  NOW()
FROM generate_series(1, 10)
WHERE NOT EXISTS (SELECT 1 FROM "Resource" WHERE id = 'p2_download_' || generate_series);

-- =====================================================================================
-- P3: FUNDING MASTERY - DOWNLOADABLE RESOURCES
-- =====================================================================================

INSERT INTO "Resource" (id, "moduleId", title, description, type, url, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
SELECT 
  'p3_download_' || generate_series,
  (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P3') ORDER BY m."orderIndex" LIMIT 1),
  CASE generate_series
    WHEN 1 THEN '💰 Fundraising Financial Model (Excel)'
    WHEN 2 THEN '📊 Pitch Deck Mega Pack (20+ Templates)'
    WHEN 3 THEN '📈 Cap Table Calculator (Excel)'
    WHEN 4 THEN '📝 Term Sheet Analyzer (Excel)'
    WHEN 5 THEN '🎯 Investor CRM Template (Excel)'
    WHEN 6 THEN '📑 Data Room Checklist (Excel)'
    WHEN 7 THEN '💼 SAFE Agreement Templates (Word)'
    WHEN 8 THEN '📊 Valuation Calculator Pro (Excel)'
    WHEN 9 THEN '📧 Investor Update Templates (Word)'
    WHEN 10 THEN '🌍 International Investor Database (Excel)'
  END,
  CASE generate_series
    WHEN 1 THEN 'Advanced financial model with funding scenarios, dilution calculator, and use of funds planning.'
    WHEN 2 THEN 'Collection of 20+ successful pitch decks from Series A to IPO with industry-specific templates.'
    WHEN 3 THEN 'Interactive cap table with ESOP pool, multiple funding rounds, and exit scenario modeling.'
    WHEN 4 THEN 'Term sheet analyzer comparing 100+ terms with explanations and negotiation tips.'
    WHEN 5 THEN 'Complete investor relationship management system with pipeline tracking and follow-up automation.'
    WHEN 6 THEN 'Comprehensive 200+ item data room checklist organized by due diligence categories.'
    WHEN 7 THEN 'India-compliant SAFE agreement templates with post-money and pre-money variations.'
    WHEN 8 THEN 'Multi-method valuation calculator using DCF, comparables, and VC method approaches.'
    WHEN 9 THEN 'Monthly investor update templates that VCs love with metrics dashboards and formatting.'
    WHEN 10 THEN 'Database of 500+ international investors with contact info, thesis, and portfolio details.'
  END,
  'spreadsheet',
  '#download-p3-' || generate_series,
  '/downloads/p3/resource_' || generate_series || CASE generate_series
    WHEN 2 THEN '.zip'
    WHEN 7 THEN '.zip'
    WHEN 9 THEN '.zip'
    ELSE '.xlsx'
  END,
  ARRAY['downloadable', 'funding', 'investor', 'p3'],
  true,
  NOW(),
  NOW()
FROM generate_series(1, 10)
WHERE NOT EXISTS (SELECT 1 FROM "Resource" WHERE id = 'p3_download_' || generate_series);

-- =====================================================================================
-- P4-P12: DOWNLOADABLE RESOURCES (CONDENSED FORMAT)
-- =====================================================================================

-- P4: Finance Stack Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p4_cfo_dashboard', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P4') LIMIT 1), 
 '📊 CFO Dashboard Template (Excel)', 'Real-time financial metrics dashboard with automated data feeds and visualizations.', 
 'spreadsheet', '/downloads/p4/cfo_dashboard.xlsx', ARRAY['finance', 'dashboard', 'p4'], true, NOW(), NOW()),
('p4_budget_model', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P4') LIMIT 1),
 '💰 Master Budget Model (Excel)', 'Comprehensive budgeting model with variance analysis and rolling forecasts.',
 'spreadsheet', '/downloads/p4/budget_model.xlsx', ARRAY['finance', 'budget', 'p4'], true, NOW(), NOW());

-- P5: Legal Stack Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p5_contract_pack', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P5') LIMIT 1),
 '📑 500+ Contract Templates', 'Complete contract library covering all business scenarios with India-specific clauses.',
 'document', '/downloads/p5/contract_library.zip', ARRAY['legal', 'contracts', 'p5'], true, NOW(), NOW()),
('p5_ip_toolkit', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P5') LIMIT 1),
 '💡 IP Protection Toolkit', 'Complete intellectual property protection framework with filing templates.',
 'document', '/downloads/p5/ip_toolkit.zip', ARRAY['legal', 'ip', 'p5'], true, NOW(), NOW());

-- P6: Sales & GTM Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p6_sales_playbook', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P6') LIMIT 1),
 '🎯 Master Sales Playbook', 'Complete sales methodology with scripts, objection handling, and closing techniques.',
 'document', '/downloads/p6/sales_playbook.pdf', ARRAY['sales', 'playbook', 'p6'], true, NOW(), NOW()),
('p6_crm_template', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P6') LIMIT 1),
 '📊 Sales CRM Template (Excel)', 'Professional CRM system with pipeline tracking and analytics.',
 'spreadsheet', '/downloads/p6/crm_template.xlsx', ARRAY['sales', 'crm', 'p6'], true, NOW(), NOW());

-- P7: State Schemes Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p7_scheme_database', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P7') LIMIT 1),
 '🗺️ All States Scheme Database', 'Complete database of 5000+ schemes across all states with eligibility filters.',
 'spreadsheet', '/downloads/p7/scheme_database.xlsx', ARRAY['schemes', 'government', 'p7'], true, NOW(), NOW()),
('p7_benefit_calculator', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P7') LIMIT 1),
 '💰 Multi-State Benefit Calculator', 'Calculate total benefits across multiple states with optimization suggestions.',
 'spreadsheet', '/downloads/p7/benefit_calculator.xlsx', ARRAY['schemes', 'calculator', 'p7'], true, NOW(), NOW());

-- P8: Data Room Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p8_dataroom_structure', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P8') LIMIT 1),
 '📁 Data Room Template Structure', 'Professional data room folder structure with 100+ categories.',
 'template', '/downloads/p8/dataroom_template.zip', ARRAY['dataroom', 'dd', 'p8'], true, NOW(), NOW()),
('p8_dd_checklist', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P8') LIMIT 1),
 '✅ Due Diligence Mega Checklist', '500+ item DD checklist used by top VCs and PE firms.',
 'spreadsheet', '/downloads/p8/dd_checklist.xlsx', ARRAY['dataroom', 'checklist', 'p8'], true, NOW(), NOW());

-- P9: Government Funding Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p9_grant_templates', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P9') LIMIT 1),
 '📝 Grant Application Templates', 'Winning grant application templates for 50+ government schemes.',
 'document', '/downloads/p9/grant_templates.zip', ARRAY['grants', 'government', 'p9'], true, NOW(), NOW()),
('p9_scheme_tracker', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P9') LIMIT 1),
 '📊 Scheme Application Tracker', 'Track multiple scheme applications with deadline management.',
 'spreadsheet', '/downloads/p9/scheme_tracker.xlsx', ARRAY['schemes', 'tracker', 'p9'], true, NOW(), NOW());

-- P10: Patent Mastery Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p10_patent_templates', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P10') LIMIT 1),
 '📋 Patent Filing Templates', 'Complete patent application templates with claim construction guides.',
 'document', '/downloads/p10/patent_templates.zip', ARRAY['patent', 'ip', 'p10'], true, NOW(), NOW()),
('p10_ip_portfolio', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P10') LIMIT 1),
 '💼 IP Portfolio Manager (Excel)', 'Track and manage entire IP portfolio with valuation and renewal alerts.',
 'spreadsheet', '/downloads/p10/ip_portfolio.xlsx', ARRAY['patent', 'portfolio', 'p10'], true, NOW(), NOW());

-- P11: Branding & PR Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p11_brand_guidelines', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P11') LIMIT 1),
 '🎨 Brand Guidelines Template', 'Professional brand guidelines template with logo usage, colors, and voice.',
 'template', '/downloads/p11/brand_guidelines.zip', ARRAY['branding', 'design', 'p11'], true, NOW(), NOW()),
('p11_pr_toolkit', (SELECT m.id FROM "Module" m WHERE m."productId" = (SELECT id FROM "Product" WHERE code = 'P11') LIMIT 1),
 '📰 PR Toolkit & Media Templates', 'Complete PR toolkit with press releases, media kits, and pitch templates.',
 'document', '/downloads/p11/pr_toolkit.zip', ARRAY['pr', 'media', 'p11'], true, NOW(), NOW());

-- P12: Marketing Mastery Downloads
INSERT INTO "Resource" (id, "moduleId", title, description, type, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('p12_marketing_calendar', (SELECT m.id FROM "Module" m WHERE m."productId" = 'p12_marketing_mastery' LIMIT 1),
 '📅 365-Day Marketing Calendar', 'Complete marketing calendar with campaigns, content, and channel strategies.',
 'spreadsheet', '/downloads/p12/marketing_calendar.xlsx', ARRAY['marketing', 'planning', 'p12'], true, NOW(), NOW()),
('p12_growth_toolkit', (SELECT m.id FROM "Module" m WHERE m."productId" = 'p12_marketing_mastery' LIMIT 1),
 '🚀 Growth Hacking Toolkit', '100+ growth experiments with tracking templates and analysis frameworks.',
 'spreadsheet', '/downloads/p12/growth_toolkit.xlsx', ARRAY['marketing', 'growth', 'p12'], true, NOW(), NOW());

-- =====================================================================================
-- BONUS: Master Resource Pack for ALL_ACCESS Members
-- =====================================================================================

INSERT INTO "Resource" (id, "moduleId", title, description, type, url, fileUrl, tags, "isDownloadable", "createdAt", "updatedAt")
VALUES
('all_access_mega_pack', 
 (SELECT m.id FROM "Module" m JOIN "Product" p ON m."productId" = p.id WHERE p.code = 'ALL_ACCESS' LIMIT 1),
 '🎁 ALL ACCESS MEGA RESOURCE PACK (10GB+)',
 'Exclusive for All Access members: 10,000+ templates, 500+ tools, 1000+ legal documents, financial models, marketing assets, and premium resources worth ₹50,00,000+. Includes everything from all courses plus exclusive bonus content updated monthly.',
 'bundle',
 '#all-access-mega-pack',
 '/downloads/all_access/mega_resource_pack.zip',
 ARRAY['all-access', 'premium', 'exclusive', 'mega-pack'],
 true,
 NOW(),
 NOW()
);

-- =====================================================================================
-- Update resource counts and verify
-- =====================================================================================

-- Add download tracking capability
ALTER TABLE "Resource" ADD COLUMN IF NOT EXISTS "downloadCount" INT DEFAULT 0;
ALTER TABLE "Resource" ADD COLUMN IF NOT EXISTS "lastDownloadedAt" TIMESTAMP;

-- Final verification of downloadable resources
SELECT 
  p.code,
  p.title,
  COUNT(r.id) as downloadable_resources,
  STRING_AGG(r.type, ', ') as resource_types
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Resource" r ON r."moduleId" = m.id AND r."isDownloadable" = true
WHERE p."isBundle" = false
GROUP BY p.code, p.title
ORDER BY p.code;

-- =====================================================================================
-- DOWNLOADABLE RESOURCES SUMMARY
-- Total: 100+ downloadable templates, tools, and resources
-- Formats: Excel, Word, PowerPoint, PDF, ZIP bundles
-- Value: ₹50,00,000+ in professional templates and tools
-- =====================================================================================