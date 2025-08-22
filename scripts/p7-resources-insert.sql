-- Insert P7 State Scheme Resources one by one

-- First, get module IDs
WITH module_ids AS (
  SELECT m.id, m."orderIndex"
  FROM "Module" m
  JOIN "Product" p ON p.id = m."productId"
  WHERE p.code = 'P7'
)

-- Insert resources for Module 1
INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_federal_structure_templates',
  'Federal Structure Navigation Templates (25+)',
  'Complete federal governance mapping with constitutional framework, central scheme database, and multi-level engagement protocols',
  'template_collection',
  '/templates/p7-federal-structure-templates.zip',
  id,
  '{"federal", "governance", "central", "schemes"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 25, "value": "₹25,000"}'
FROM module_ids WHERE "orderIndex" = 1;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_central_schemes_database',
  'Central Government Schemes Database (50+ Schemes)',
  'Comprehensive database of central schemes with eligibility criteria, application processes, and optimization strategies',
  'database_resource',
  '/resources/p7-central-schemes-database.xlsx',
  id,
  '{"central", "schemes", "database", "eligibility"}',
  true,
  '{"productCode": "P7", "category": "database", "schemeCount": 50, "value": "₹30,000"}'
FROM module_ids WHERE "orderIndex" = 1;

-- Continue with other modules
INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_northern_states_templates',
  'Northern States Opportunity Templates (40+)',
  'Complete Northern states analysis including UP Industrial Policy, NCR integration, Punjab-Haryana synergies, and Rajasthan renewable benefits',
  'template_collection',
  '/templates/p7-northern-states-templates.zip',
  id,
  '{"northern", "UP", "NCR", "Punjab", "Haryana", "Rajasthan"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 40, "value": "₹40,000"}'
FROM module_ids WHERE "orderIndex" = 2;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_western_states_templates',
  'Western States Excellence Templates (50+)',
  'Complete Western states coverage including Maharashtra financial hub, Gujarat business excellence, Goa integration, and MP advantages',
  'template_collection',
  '/templates/p7-western-states-templates.zip',
  id,
  '{"western", "Maharashtra", "Gujarat", "Goa", "MP"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 50, "value": "₹50,000"}'
FROM module_ids WHERE "orderIndex" = 3;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_southern_states_templates',
  'Southern States Innovation Templates (45+)',
  'Complete Southern states analysis including Karnataka Silicon Valley, Tamil Nadu manufacturing, Telangana tech hub, and Kerala integration',
  'template_collection',
  '/templates/p7-southern-states-templates.zip',
  id,
  '{"southern", "Karnataka", "Tamil Nadu", "Telangana", "Kerala"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 45, "value": "₹45,000"}'
FROM module_ids WHERE "orderIndex" = 4;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_eastern_states_templates',
  'Eastern States Potential Templates (35+)',
  'Complete Eastern states coverage including West Bengal revival, Odisha resources, Jharkhand mining, and Bihar agricultural advantages',
  'template_collection',
  '/templates/p7-eastern-states-templates.zip',
  id,
  '{"eastern", "West Bengal", "Odisha", "Jharkhand", "Bihar"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 35, "value": "₹35,000"}'
FROM module_ids WHERE "orderIndex" = 5;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_northeast_incentive_maximizer',
  'North-East Maximum Incentive Templates (60+)',
  'Complete NE states coverage with 100% tax exemption guide, ASEAN connectivity, and maximum subsidy optimization across all 9 states',
  'template_collection',
  '/templates/p7-northeast-incentive-templates.zip',
  id,
  '{"northeast", "incentives", "tax-exemption", "ASEAN", "subsidies"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 60, "value": "₹60,000"}'
FROM module_ids WHERE "orderIndex" = 6;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_multi_state_strategy_templates',
  'Multi-State Implementation Templates (55+)',
  'Complete implementation framework with location selection, legal optimization, government relations, and project management',
  'template_collection',
  '/templates/p7-implementation-templates.zip',
  id,
  '{"multi-state", "implementation", "strategy", "framework"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 55, "value": "₹55,000"}'
FROM module_ids WHERE "orderIndex" = 7;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_sector_optimization_templates',
  'Sector-Specific State Benefits Templates (70+)',
  'Complete sector analysis including manufacturing clusters, IT hubs, agriculture zones, and services optimization across all states',
  'template_collection',
  '/templates/p7-sector-templates.zip',
  id,
  '{"sector", "manufacturing", "IT", "agriculture", "services"}',
  true,
  '{"productCode": "P7", "category": "templates", "templateCount": 70, "value": "₹70,000"}'
FROM module_ids WHERE "orderIndex" = 8;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_financial_optimization_suite',
  'Financial Optimization & ROI Calculator Suite',
  'Complete financial planning tools including cost-benefit analysis, ROI calculators, tax optimization, and 30-50% savings achievement',
  'calculator_suite',
  '/tools/p7-financial-suite.html',
  id,
  '{"financial", "ROI", "optimization", "calculator", "savings"}',
  true,
  '{"productCode": "P7", "category": "tools", "value": "₹50,000"}'
FROM module_ids WHERE "orderIndex" = 9;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_policy_monitoring_system',
  'Advanced Policy Monitoring & Future-Proofing System',
  'Complete system for policy tracking, change anticipation, adaptation strategies, and long-term sustainability',
  'monitoring_system',
  '/tools/p7-policy-monitoring.html',
  id,
  '{"policy", "monitoring", "future-proofing", "adaptation"}',
  true,
  '{"productCode": "P7", "category": "system", "value": "₹45,000"}'
FROM module_ids WHERE "orderIndex" = 10;

-- Premium resources
INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_500_state_schemes_database',
  '500+ State Schemes Master Database',
  'Comprehensive database of 500+ state schemes across all Indian states with eligibility, benefits, and application processes',
  'premium_database',
  '/resources/p7-state-schemes-database.xlsx',
  id,
  '{"schemes", "database", "comprehensive", "all-states"}',
  true,
  '{"productCode": "P7", "category": "premium", "schemeCount": 500, "value": "₹100,000"}'
FROM module_ids WHERE "orderIndex" = 1;

INSERT INTO "Resource" (
  id, title, description, type, "fileUrl", "moduleId", tags, "isDownloadable", metadata
) 
SELECT 
  'p7_interactive_state_navigator',
  'Interactive All-India State Navigator',
  'Advanced interactive tool for comprehensive state comparison, benefit analysis, and optimal location selection',
  'interactive_premium',
  '/tools/p7-state-navigator.html',
  id,
  '{"interactive", "navigator", "comparison", "analysis"}',
  true,
  '{"productCode": "P7", "category": "premium", "value": "₹80,000"}'
FROM module_ids WHERE "orderIndex" = 7;