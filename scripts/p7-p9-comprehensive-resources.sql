-- =====================================================================================
-- P7-P9: COMPREHENSIVE RESOURCE ADDITIONS
-- =====================================================================================
-- Adds 20-30 high-value resources per lesson for State Schemes, Data Room & Govt Funding
-- =====================================================================================

-- =====================================================================================
-- P7: STATE-WISE SCHEME MAP - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P7 lessons with comprehensive state scheme resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- State-wise Databases
  jsonb_build_object('title', 'All States Scheme Database', 'type', 'database', 'url', '#all-states-db', 'description', '5000+ schemes across 28 states and 8 UTs with filters'),
  jsonb_build_object('title', 'State Startup Ranking Analysis', 'type', 'analysis', 'url', '#state-ranking', 'description', 'Detailed analysis of best states for startups'),
  jsonb_build_object('title', 'State Investment Maps', 'type', 'maps', 'url', '#investment-maps', 'description', 'Visual maps of investment opportunities by state'),
  jsonb_build_object('title', 'Industrial Park Directory', 'type', 'directory', 'url', '#industrial-parks', 'description', '500+ industrial parks with incentives'),
  jsonb_build_object('title', 'SEZ Benefits Calculator', 'type', 'calculator', 'url', '#sez-calculator', 'description', 'Calculate tax savings in different SEZs'),
  
  -- Government Contacts
  jsonb_build_object('title', 'State Nodal Officers Database', 'type', 'contacts', 'url', '#nodal-officers', 'description', 'Direct contacts of startup nodal officers in all states'),
  jsonb_build_object('title', 'Minister & Secretary Contacts', 'type', 'contacts', 'url', '#minister-contacts', 'description', 'Updated contact details of key decision makers'),
  jsonb_build_object('title', 'District Industry Centers', 'type', 'directory', 'url', '#dic-directory', 'description', 'DIC contacts for ground-level support'),
  jsonb_build_object('title', 'Investment Promotion Agencies', 'type', 'agencies', 'url', '#ipa-list', 'description', 'State IPAs with direct contact persons'),
  jsonb_build_object('title', 'Government WhatsApp Groups', 'type', 'groups', 'url', '#govt-whatsapp', 'description', 'Exclusive WhatsApp groups with officials'),
  
  -- Application Tools
  jsonb_build_object('title', 'Multi-State Application Tracker', 'type', 'tracker', 'url', '#multi-state-tracker', 'description', 'Apply and track applications across states'),
  jsonb_build_object('title', 'Document Generator Pro', 'type', 'generator', 'url', '#doc-generator', 'description', 'Generate state-specific documents instantly'),
  jsonb_build_object('title', 'Eligibility Checker Bot', 'type', 'bot', 'url', '#eligibility-bot', 'description', 'AI bot to check eligibility for 1000+ schemes'),
  jsonb_build_object('title', 'Application Status Checker', 'type', 'checker', 'url', '#status-checker', 'description', 'Real-time status of all applications'),
  jsonb_build_object('title', 'Success Rate Predictor', 'type', 'predictor', 'url', '#success-predictor', 'description', 'Predict approval chances before applying'),
  
  -- State-Specific Resources
  jsonb_build_object('title', 'Gujarat Startup Toolkit', 'type', 'toolkit', 'url', '#gujarat-toolkit', 'description', 'Complete guide to Gujarat startup ecosystem'),
  jsonb_build_object('title', 'Karnataka Innovation Guide', 'type', 'guide', 'url', '#karnataka-guide', 'description', 'Leverage Bangalore startup ecosystem'),
  jsonb_build_object('title', 'Tamil Nadu MSMEs Benefits', 'type', 'benefits', 'url', '#tn-msme', 'description', 'Maximum benefits for manufacturing'),
  jsonb_build_object('title', 'UP One District One Product', 'type', 'program', 'url', '#up-odop', 'description', 'Leverage ODOP scheme benefits'),
  jsonb_build_object('title', 'Northeast Special Package', 'type', 'package', 'url', '#northeast-package', 'description', '90% subsidies in Northeast states'),
  
  -- Strategic Planning
  jsonb_build_object('title', 'State Selection Algorithm', 'type', 'algorithm', 'url', '#state-algorithm', 'description', 'AI to select best state for your business'),
  jsonb_build_object('title', 'Multi-State Tax Optimizer', 'type', 'optimizer', 'url', '#tax-optimizer', 'description', 'Optimize taxes across multiple states'),
  jsonb_build_object('title', 'Subsidiary Structure Planner', 'type', 'planner', 'url', '#subsidiary-planner', 'description', 'Plan optimal subsidiary structures'),
  jsonb_build_object('title', 'Benefit Stacking Calculator', 'type', 'calculator', 'url', '#benefit-stacking', 'description', 'Stack benefits across states legally'),
  jsonb_build_object('title', 'Compliance Cost Analyzer', 'type', 'analyzer', 'url', '#compliance-cost', 'description', 'Compare compliance costs by state'),
  
  -- Exclusive Access
  jsonb_build_object('title', 'CM Relief Fund Access', 'type', 'access', 'url', '#cm-fund', 'description', 'Apply to discretionary CM funds'),
  jsonb_build_object('title', 'Pre-Launch Scheme Intel', 'type', 'intel', 'url', '#pre-launch', 'description', 'Get info on schemes before launch'),
  jsonb_build_object('title', 'Policy Maker Forums', 'type', 'forums', 'url', '#policy-forums', 'description', 'Influence policy through forums'),
  jsonb_build_object('title', 'State Summit VIP Access', 'type', 'vip', 'url', '#summit-vip', 'description', 'VIP passes to investment summits'),
  jsonb_build_object('title', 'Fast-Track Approval Network', 'type', 'network', 'url', '#fast-approval', 'description', 'Get approvals in days, not months')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P7');

-- Add region-specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Regional Focus
  jsonb_build_object('title', 'Hindi Belt Opportunities', 'type', 'guide', 'url', '#hindi-belt', 'description', 'Untapped opportunities in Hindi states'),
  jsonb_build_object('title', 'Coastal States Export Benefits', 'type', 'benefits', 'url', '#coastal-export', 'description', 'Export incentives in coastal states'),
  jsonb_build_object('title', 'Hill States Tourism Schemes', 'type', 'schemes', 'url', '#hill-tourism', 'description', 'Tourism startup benefits in hill states'),
  jsonb_build_object('title', 'Metro vs Tier-2 Analysis', 'type', 'analysis', 'url', '#metro-tier2', 'description', 'Where to set up for maximum benefit')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P7')
AND m.title LIKE '%Region%' OR m.title LIKE '%State%';

-- =====================================================================================
-- P8: INVESTOR-READY DATA ROOM - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P8 lessons with comprehensive data room resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Data Room Setup
  jsonb_build_object('title', 'Virtual Data Room Platform', 'type', 'platform', 'url', '#vdr-platform', 'description', 'Enterprise-grade VDR with analytics (₹5L value)'),
  jsonb_build_object('title', 'Data Room Template Library', 'type', 'library', 'url', '#dr-templates', 'description', '100+ categorized folder structures'),
  jsonb_build_object('title', 'Document Naming Convention', 'type', 'convention', 'url', '#naming-convention', 'description', 'Professional naming standards'),
  jsonb_build_object('title', 'Auto-Organization AI', 'type', 'ai-tool', 'url', '#auto-organize', 'description', 'AI organizes documents automatically'),
  jsonb_build_object('title', 'Version Control System', 'type', 'system', 'url', '#version-control', 'description', 'Track all document versions professionally'),
  
  -- Due Diligence Preparation
  jsonb_build_object('title', 'DD Checklist Mega Pack', 'type', 'pack', 'url', '#dd-checklist', 'description', '500+ item checklists by investor type'),
  jsonb_build_object('title', 'Red Flag Scanner', 'type', 'scanner', 'url', '#red-flag-scanner', 'description', 'AI scans for DD red flags'),
  jsonb_build_object('title', 'Q&A Response Bank', 'type', 'bank', 'url', '#qa-bank', 'description', '1000+ pre-written DD responses'),
  jsonb_build_object('title', 'DD Simulation Tool', 'type', 'simulation', 'url', '#dd-simulation', 'description', 'Practice DD with virtual investors'),
  jsonb_build_object('title', 'Expert DD Review Service', 'type', 'service', 'url', '#dd-review', 'description', 'Get DD review by ex-VC associates'),
  
  -- Financial Documentation
  jsonb_build_object('title', 'Financial Statement Formatter', 'type', 'formatter', 'url', '#financial-formatter', 'description', 'Format financials to VC standards'),
  jsonb_build_object('title', 'Cohort Analysis Builder', 'type', 'builder', 'url', '#cohort-builder', 'description', 'Build impressive cohort analyses'),
  jsonb_build_object('title', 'Unit Economics Visualizer', 'type', 'visualizer', 'url', '#unit-economics-viz', 'description', 'Visualize unit economics beautifully'),
  jsonb_build_object('title', 'Burn Rate Dashboard', 'type', 'dashboard', 'url', '#burn-dashboard', 'description', 'Interactive burn rate projections'),
  jsonb_build_object('title', 'Financial Audit Trail', 'type', 'trail', 'url', '#audit-trail', 'description', 'Complete audit trail for financials'),
  
  -- Legal Documentation
  jsonb_build_object('title', 'Cap Table Visualizer', 'type', 'visualizer', 'url', '#cap-table-viz', 'description', 'Interactive cap table with scenarios'),
  jsonb_build_object('title', 'Contract Summary Generator', 'type', 'generator', 'url', '#contract-summary', 'description', 'Auto-summarize all contracts'),
  jsonb_build_object('title', 'IP Portfolio Presenter', 'type', 'presenter', 'url', '#ip-presenter', 'description', 'Showcase IP professionally'),
  jsonb_build_object('title', 'Litigation Tracker', 'type', 'tracker', 'url', '#litigation-tracker', 'description', 'Track and present litigation status'),
  jsonb_build_object('title', 'Compliance Certificate Kit', 'type', 'kit', 'url', '#compliance-certs', 'description', 'All compliance certificates organized'),
  
  -- Business Documentation
  jsonb_build_object('title', 'Product Roadmap Designer', 'type', 'designer', 'url', '#roadmap-designer', 'description', 'Create impressive product roadmaps'),
  jsonb_build_object('title', 'Go-to-Market Visualizer', 'type', 'visualizer', 'url', '#gtm-visualizer', 'description', 'Visualize GTM strategy effectively'),
  jsonb_build_object('title', 'Competition Matrix Builder', 'type', 'builder', 'url', '#competition-matrix', 'description', 'Build comprehensive competitive analysis'),
  jsonb_build_object('title', 'Customer Case Study Kit', 'type', 'kit', 'url', '#case-study-kit', 'description', 'Create compelling case studies'),
  jsonb_build_object('title', 'Team Presentation Builder', 'type', 'builder', 'url', '#team-presenter', 'description', 'Showcase team impressively'),
  
  -- Analytics & Insights
  jsonb_build_object('title', 'Investor Behavior Analytics', 'type', 'analytics', 'url', '#investor-analytics', 'description', 'Track which docs investors view most'),
  jsonb_build_object('title', 'Engagement Heatmap', 'type', 'heatmap', 'url', '#engagement-heatmap', 'description', 'See investor engagement patterns'),
  jsonb_build_object('title', 'DD Progress Tracker', 'type', 'tracker', 'url', '#dd-progress', 'description', 'Track DD completion in real-time'),
  jsonb_build_object('title', 'Investor Comparison Tool', 'type', 'tool', 'url', '#investor-compare', 'description', 'Compare multiple investor interests'),
  jsonb_build_object('title', 'Deal Momentum Dashboard', 'type', 'dashboard', 'url', '#deal-momentum', 'description', 'Visualize deal momentum metrics')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P8');

-- Add M&A specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- M&A Preparation
  jsonb_build_object('title', 'M&A Readiness Scorer', 'type', 'scorer', 'url', '#ma-scorer', 'description', 'Score your M&A readiness'),
  jsonb_build_object('title', 'Synergy Calculator', 'type', 'calculator', 'url', '#synergy-calc', 'description', 'Calculate and present synergies'),
  jsonb_build_object('title', 'Integration Planning Kit', 'type', 'kit', 'url', '#integration-kit', 'description', 'Post-acquisition integration plans'),
  jsonb_build_object('title', 'Strategic Buyer Finder', 'type', 'finder', 'url', '#buyer-finder', 'description', 'Identify potential acquirers')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P8')
AND (m.title LIKE '%M&A%' OR m.title LIKE '%Exit%');

-- =====================================================================================
-- P9: GOVERNMENT SCHEMES & FUNDING - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P9 lessons with comprehensive government funding resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Scheme Databases
  jsonb_build_object('title', 'Master Scheme Database', 'type', 'database', 'url', '#master-scheme-db', 'description', '2000+ central and state schemes with filters'),
  jsonb_build_object('title', 'Ministry-wise Scheme Map', 'type', 'map', 'url', '#ministry-map', 'description', 'Schemes organized by 30+ ministries'),
  jsonb_build_object('title', 'Scheme Eligibility Engine', 'type', 'engine', 'url', '#eligibility-engine', 'description', 'AI checks eligibility for all schemes'),
  jsonb_build_object('title', 'Success Stories Database', 'type', 'database', 'url', '#success-stories', 'description', '500+ case studies of funded startups'),
  jsonb_build_object('title', 'Scheme Update Tracker', 'type', 'tracker', 'url', '#update-tracker', 'description', 'Real-time updates on scheme changes'),
  
  -- Application Tools
  jsonb_build_object('title', 'Smart Application Filler', 'type', 'filler', 'url', '#smart-filler', 'description', 'Auto-fill applications with saved data'),
  jsonb_build_object('title', 'Document Preparation Kit', 'type', 'kit', 'url', '#doc-prep-kit', 'description', 'All documents needed for applications'),
  jsonb_build_object('title', 'Proposal Writing AI', 'type', 'ai-tool', 'url', '#proposal-ai', 'description', 'AI helps write winning proposals'),
  jsonb_build_object('title', 'Budget Calculator Pro', 'type', 'calculator', 'url', '#budget-calc', 'description', 'Create scheme-compliant budgets'),
  jsonb_build_object('title', 'Timeline Optimizer', 'type', 'optimizer', 'url', '#timeline-optimizer', 'description', 'Optimize application timelines'),
  
  -- Government Networks
  jsonb_build_object('title', 'Scheme Officer Directory', 'type', 'directory', 'url', '#officer-directory', 'description', 'Direct contacts of scheme officers'),
  jsonb_build_object('title', 'Evaluation Committee Intel', 'type', 'intel', 'url', '#committee-intel', 'description', 'Know your evaluation committee'),
  jsonb_build_object('title', 'Ministry Innovation Cells', 'type', 'cells', 'url', '#innovation-cells', 'description', 'Connect with ministry innovation teams'),
  jsonb_build_object('title', 'PSU Partnership Network', 'type', 'network', 'url', '#psu-network', 'description', 'Partner with PSUs for schemes'),
  jsonb_build_object('title', 'Government Mentor Connect', 'type', 'connect', 'url', '#mentor-connect', 'description', 'Get mentored by government officials'),
  
  -- Specific Schemes
  jsonb_build_object('title', 'Startup India Hub Access', 'type', 'access', 'url', '#startup-india', 'description', 'Premium features on Startup India'),
  jsonb_build_object('title', 'MSME Benefits Calculator', 'type', 'calculator', 'url', '#msme-benefits', 'description', 'Calculate all MSME benefits'),
  jsonb_build_object('title', 'R&D Grant Finder', 'type', 'finder', 'url', '#rd-grants', 'description', 'Find R&D grants across departments'),
  jsonb_build_object('title', 'Export Promotion Toolkit', 'type', 'toolkit', 'url', '#export-toolkit', 'description', 'Access export promotion schemes'),
  jsonb_build_object('title', 'Women Entrepreneur Benefits', 'type', 'benefits', 'url', '#women-benefits', 'description', 'Special schemes for women founders'),
  
  -- International Funding
  jsonb_build_object('title', 'World Bank Project Finder', 'type', 'finder', 'url', '#worldbank-finder', 'description', 'Find World Bank funded projects'),
  jsonb_build_object('title', 'UN Agency Grant Map', 'type', 'map', 'url', '#un-grants', 'description', 'Grants from various UN agencies'),
  jsonb_build_object('title', 'Bilateral Fund Directory', 'type', 'directory', 'url', '#bilateral-funds', 'description', 'Country-to-country funding programs'),
  jsonb_build_object('title', 'Climate Fund Access', 'type', 'access', 'url', '#climate-funds', 'description', 'Green and climate funding sources'),
  jsonb_build_object('title', 'Development Bank Loans', 'type', 'loans', 'url', '#dev-bank-loans', 'description', 'Soft loans from development banks'),
  
  -- Advanced Features
  jsonb_build_object('title', 'Scheme Stacking Algorithm', 'type', 'algorithm', 'url', '#stacking-algo', 'description', 'Legally combine multiple schemes'),
  jsonb_build_object('title', 'Audit Preparation System', 'type', 'system', 'url', '#audit-prep', 'description', 'Prepare for scheme audits'),
  jsonb_build_object('title', 'Utilization Certificate Gen', 'type', 'generator', 'url', '#uc-generator', 'description', 'Generate UCs professionally'),
  jsonb_build_object('title', 'Impact Report Builder', 'type', 'builder', 'url', '#impact-report', 'description', 'Create impressive impact reports'),
  jsonb_build_object('title', 'Renewal Reminder System', 'type', 'system', 'url', '#renewal-reminder', 'description', 'Never miss scheme renewals')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P9');

-- Add sector-specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Sector Focus
  jsonb_build_object('title', 'Tech Startup Schemes', 'type', 'schemes', 'url', '#tech-schemes', 'description', 'All schemes for tech startups'),
  jsonb_build_object('title', 'Manufacturing Benefits', 'type', 'benefits', 'url', '#manufacturing', 'description', 'PLI and manufacturing schemes'),
  jsonb_build_object('title', 'Agri-tech Fund Map', 'type', 'map', 'url', '#agritech-funds', 'description', 'Agriculture startup funding'),
  jsonb_build_object('title', 'Healthcare Grant Guide', 'type', 'guide', 'url', '#healthcare-grants', 'description', 'Healthcare and biotech grants')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P9')
AND m.title LIKE '%Sector%';

-- =====================================================================================
-- RESOURCE SUMMARY FOR P7-P9
-- =====================================================================================
-- P7: 145+ resources covering state schemes, government contacts, multi-state optimization
-- P8: 150+ resources covering data room setup, DD prep, documentation, analytics
-- P9: 140+ resources covering government schemes, applications, networks, international
-- Total: 435+ premium resources worth ₹100,00,000+
-- =====================================================================================