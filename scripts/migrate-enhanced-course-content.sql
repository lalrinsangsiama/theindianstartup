-- Enhanced Course Content Migration Script
-- This script updates all course content with enhanced, comprehensive materials

-- First, fix any pricing inconsistencies
UPDATE "Product" SET price = 7999 WHERE code = 'P11';
UPDATE "Product" SET price = 9999 WHERE code = 'P12';

-- Update product descriptions with enhanced value propositions
UPDATE "Product" SET 
  description = 'Transform Your Startup Idea Into A Real Business In Just 30 Days - Master India-specific startup launch with daily action plans, expert frameworks, and proven methodologies used by 1,200+ successful startups.',
  "updatedAt" = NOW()
WHERE code = 'P1';

UPDATE "Product" SET 
  description = 'Master India''s Business Incorporation Laws and Build Bulletproof Legal Infrastructure - Complete DIY incorporation guidance with automated compliance systems preventing ₹10+ lakh penalties annually.',
  "updatedAt" = NOW()
WHERE code = 'P2';

UPDATE "Product" SET 
  description = 'Master the Indian Funding Ecosystem and Raise Capital Like a Pro - Access ₹50L-₹5Cr in funding through systematic navigation of 200+ active investors and government schemes.',
  "updatedAt" = NOW()
WHERE code = 'P3';

UPDATE "Product" SET 
  description = 'Build World-Class Financial Infrastructure and Master CFO-Level Financial Operations - Save ₹50L+ annually through strategic financial management and automated compliance systems.',
  "updatedAt" = NOW()
WHERE code = 'P4';

UPDATE "Product" SET 
  description = 'Master India''s Legal System and Build Litigation-Proof Business Infrastructure - Prevent 95% of startup legal disasters through bulletproof documentation and expert frameworks.',
  "updatedAt" = NOW()
WHERE code = 'P5';

UPDATE "Product" SET 
  description = 'Transform Your Startup Into a Revenue-Generating Machine with India-Specific Sales Mastery - Achieve 3x+ revenue growth through proven sales strategies and cultural insights.',
  "updatedAt" = NOW()
WHERE code = 'P6';

UPDATE "Product" SET 
  description = 'Master India''s State Ecosystem - Navigate all 28 states + 8 UTs with comprehensive scheme database and 30-50% cost savings through strategic state benefits.',
  "updatedAt" = NOW()
WHERE code = 'P7';

UPDATE "Product" SET 
  description = 'Transform your startup with professional data room that accelerates fundraising and increases valuation - Expert insights and unicorn-scale documentation templates.',
  "updatedAt" = NOW()
WHERE code = 'P8';

UPDATE "Product" SET 
  description = 'Access ₹50 lakhs to ₹5 crores in government funding through systematic scheme navigation - Complete eligibility mapping and application templates.',
  "updatedAt" = NOW()
WHERE code = 'P9';

UPDATE "Product" SET 
  description = 'Master intellectual property from filing to monetization with comprehensive patent strategy - Complete patent mastery with IP portfolio management and monetization capabilities.',
  "updatedAt" = NOW()
WHERE code = 'P10';

UPDATE "Product" SET 
  description = 'Transform into a recognized industry leader through powerful brand building and strategic PR - Systematic PR engine generating continuous positive coverage and industry recognition.',
  "updatedAt" = NOW()
WHERE code = 'P11';

UPDATE "Product" SET 
  description = 'Build a data-driven marketing machine generating predictable growth across all channels - Multi-channel campaigns with measurable ROI and predictable customer acquisition.',
  "updatedAt" = NOW()
WHERE code = 'P12';

-- Update module titles and descriptions for enhanced content

-- P1 Module Updates
UPDATE "Module" SET 
  title = 'Foundation & Validation',
  description = 'Master entrepreneurial mindset, opportunity recognition, customer development, competitive analysis, and value proposition design with real-world frameworks and Indian market insights.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'Building Blocks',
  description = 'Learn legal structure decisions, incorporation preparation, branding creation, technology stack selection, and team building strategies with comprehensive templates and expert guidance.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 2;

UPDATE "Module" SET 
  title = 'Making It Real', 
  description = 'Master MVP development planning, customer development process, marketing strategies, financial projections, and regulatory compliance with actionable frameworks and real examples.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 3;

UPDATE "Module" SET 
  title = 'Launch Ready',
  description = 'Execute go-to-market strategies, build customer acquisition systems, implement revenue models, prepare for funding, and create scale frameworks with proven methodologies.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 4;

-- P2 Module Updates  
UPDATE "Module" SET 
  title = 'Legal Structure Decisions',
  description = 'Master all business entity types in India, compare pros/cons, understand tax implications, and choose optimal structure with comprehensive decision frameworks and real case studies.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P2') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'Private Limited Company Incorporation',
  description = 'Complete step-by-step incorporation process with required documents, government portal navigation, and professional filing procedures with detailed screenshots and guidance.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P2') AND "orderIndex" = 2;

-- P3 Module Updates
UPDATE "Module" SET 
  title = 'Funding Landscape & Strategy', 
  description = 'Master the complete Indian funding ecosystem from pre-seed to IPO, understand investor psychology, and create personalized funding roadmaps with access to 200+ active investors.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P3') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'Pitch Mastery & Storytelling',
  description = 'Create compelling pitch decks that win investor attention, master storytelling frameworks, and practice with real investor feedback sessions and proven templates.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P3') AND "orderIndex" = 2;

-- P4 Module Updates
UPDATE "Module" SET 
  title = 'Financial Foundations & Accounting Systems',
  description = 'Build professional financial architecture from ground up, implement Chart of Accounts, and create automated workflows with CFO-level systems and compliance frameworks.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P4') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'GST Compliance & Tax Management',
  description = 'Master GST compliance, e-invoicing, and complete Indian tax framework with automated systems, penalty prevention, and strategic tax optimization techniques.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P4') AND "orderIndex" = 2;

-- P5 Module Updates
UPDATE "Module" SET 
  title = 'Legal Foundation & Risk Assessment',
  description = 'Understand 15 critical legal areas, assess vulnerabilities, create risk mitigation plans, and design legal infrastructure preventing 95% of startup legal disasters.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P5') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'Contract Law & Agreement Mastery',
  description = 'Master contract law, draft bulletproof agreements, and create litigation-proof documentation with comprehensive templates and legal frameworks for all business needs.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P5') AND "orderIndex" = 2;

-- P6 Module Updates
UPDATE "Module" SET 
  title = 'Indian Market Fundamentals',
  description = 'Master Indian buyer psychology, regional market dynamics, cultural considerations, and create buyer personas specific to Indian market segments with proven frameworks.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P6') AND "orderIndex" = 1;

UPDATE "Module" SET 
  title = 'Customer Segmentation & ICP Development', 
  description = 'Develop ideal customer profiles, master segmentation strategies, and create targeted approaches for different market segments with data-driven methodologies.'
WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P6') AND "orderIndex" = 2;

-- Update lesson content with enhanced materials for key lessons
-- P1 Day 1 Enhanced Content
UPDATE "Lesson" SET 
  "briefContent" = 'Master the entrepreneurial transformation from employee to entrepreneur mindset. Learn the PAINS framework for problem identification and create your opportunity scoring matrix.',
  "actionItems" = '[
    {
      "title": "Problem Inventory Exercise",
      "description": "Create comprehensive list of 40 problems using personal and observed problems template",
      "timeRequired": "60 mins",
      "deliverable": "Completed problem inventory with pain levels and costs"
    },
    {
      "title": "Opportunity Scoring Matrix",
      "description": "Rate each problem on market size, pain intensity, ability to pay, competition level, and your expertise",
      "timeRequired": "45 mins", 
      "deliverable": "Top 3 ranked opportunities with detailed scoring"
    },
    {
      "title": "Entrepreneur OS Setup",
      "description": "Create dedicated workspace, project management system, and daily startup work routine",
      "timeRequired": "30 mins",
      "deliverable": "Functional productivity system for startup work"
    }
  ]',
  "resources" = '[
    {
      "title": "Problem Inventory Template",
      "type": "spreadsheet",
      "description": "Excel/Google Sheets template for systematic problem documentation"
    },
    {
      "title": "Opportunity Scoring Calculator", 
      "type": "tool",
      "description": "Interactive calculator for ranking business opportunities"
    },
    {
      "title": "Entrepreneur Productivity System Setup Guide",
      "type": "guide",
      "description": "Step-by-step guide for setting up your startup workspace"
    }
  ]',
  "updatedAt" = NOW()
WHERE "moduleId" = (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 1)
  AND day = 1;

-- P1 Day 2 Enhanced Content  
UPDATE "Lesson" SET 
  "briefContent" = 'Master customer development and market validation using the LISTEN framework. Conduct professional customer interviews and create data-driven buyer personas.',
  "actionItems" = '[
    {
      "title": "Interview Planning",
      "description": "Select top 3 problems, create interview guides, and plan outreach strategy",
      "timeRequired": "45 mins",
      "deliverable": "Interview guides and target customer lists"
    },
    {
      "title": "Outreach Execution", 
      "description": "Send 20 outreach messages and schedule first 3 interviews",
      "timeRequired": "90 mins",
      "deliverable": "3 scheduled customer interviews"
    },
    {
      "title": "Conduct First Interview",
      "description": "Execute first customer interview using LISTEN framework",
      "timeRequired": "30 mins",
      "deliverable": "Detailed interview notes and insights"
    }
  ]',
  "resources" = '[
    {
      "title": "Customer Interview Guide Templates",
      "type": "template", 
      "description": "Proven interview guides for different customer segments"
    },
    {
      "title": "100+ Outreach Message Templates",
      "type": "template",
      "description": "Professional outreach templates for different channels"
    },
    {
      "title": "Customer Persona Canvas",
      "type": "canvas",
      "description": "Structured template for creating detailed buyer personas"
    }
  ]',
  "updatedAt" = NOW()
WHERE "moduleId" = (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1') AND "orderIndex" = 1)
  AND day = 2;

-- Add success metrics tracking
INSERT INTO "XPEvent" ("userId", "type", "payloadJson", "points", "createdAt")
SELECT 
  'system',
  'course_content_enhanced',
  '{"courses": ["P1", "P2", "P3", "P4", "P5", "P6"], "enhancement_type": "comprehensive_content_update"}',
  1000,
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "XPEvent" WHERE "type" = 'course_content_enhanced'
);

-- Create activity types for enhanced course integration
INSERT INTO "ActivityType" ("id", "name", "description", "category", "portfolioSection", "createdAt", "updatedAt")
VALUES 
  ('enhanced_opportunity_assessment', 'Enhanced Opportunity Assessment', 'Complete opportunity scoring using the PAINS framework with market analysis', 'validation', 'idea_vision', NOW(), NOW()),
  ('customer_interview_execution', 'Customer Interview Execution', 'Conduct systematic customer interviews using LISTEN methodology', 'validation', 'market_research', NOW(), NOW()),
  ('competitive_positioning_analysis', 'Competitive Positioning Analysis', 'Create comprehensive competitive analysis with positioning strategy', 'strategy', 'market_research', NOW(), NOW()),
  ('value_proposition_design', 'Value Proposition Design', 'Design compelling value proposition using proven canvas methodology', 'strategy', 'business_model', NOW(), NOW()),
  ('legal_structure_selection', 'Legal Structure Selection', 'Choose optimal legal structure with comprehensive analysis', 'legal', 'legal_compliance', NOW(), NOW()),
  ('funding_readiness_assessment', 'Funding Readiness Assessment', 'Assess funding readiness across all stages with gap analysis', 'funding', 'business_model', NOW(), NOW()),
  ('financial_architecture_design', 'Financial Architecture Design', 'Build professional Chart of Accounts and financial systems', 'finance', 'financial_planning', NOW(), NOW()),
  ('legal_vulnerability_audit', 'Legal Vulnerability Audit', 'Conduct comprehensive legal risk assessment and mitigation planning', 'legal', 'legal_compliance', NOW(), NOW()),
  ('buyer_psychology_analysis', 'Indian Buyer Psychology Analysis', 'Master Indian market dynamics and cultural buying patterns', 'sales', 'market_research', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Update lesson XP rewards for enhanced content
UPDATE "Lesson" SET "xpReward" = 100 WHERE day <= 7; -- Foundation days get higher XP
UPDATE "Lesson" SET "xpReward" = 75 WHERE day > 7 AND day <= 14;
UPDATE "Lesson" SET "xpReward" = 50 WHERE day > 14;

-- Create comprehensive resources table entries
INSERT INTO "Resource" ("id", "title", "description", "category", "fileUrl", "tags", "productCodes", "createdAt", "updatedAt")
VALUES 
  ('p1_problem_inventory_template', 'Problem Inventory Template', 'Comprehensive Excel template for systematic problem identification and scoring', 'template', '/templates/p1-problem-inventory.xlsx', '["template", "validation", "opportunity"]', '["P1"]', NOW(), NOW()),
  ('p1_customer_interview_guide', 'Customer Interview Guide', 'Complete interview framework with LISTEN methodology and question banks', 'guide', '/guides/p1-customer-interview-guide.pdf', '["guide", "interviews", "validation"]', '["P1"]', NOW(), NOW()),
  ('p2_entity_comparison_matrix', 'Business Entity Comparison Matrix', 'Detailed comparison of all Indian business structures with decision framework', 'tool', '/tools/p2-entity-comparison.xlsx', '["tool", "legal", "incorporation"]', '["P2"]', NOW(), NOW()),
  ('p3_investor_database', 'Indian Investor Database', 'Database of 500+ active investors with contact details and investment thesis', 'database', '/databases/p3-investor-database.xlsx', '["database", "funding", "investors"]', '["P3"]', NOW(), NOW()),
  ('p4_chart_of_accounts', 'Startup Chart of Accounts Template', 'Professional Chart of Accounts template for Indian startups with GST compliance', 'template', '/templates/p4-chart-of-accounts.xlsx', '["template", "finance", "accounting"]', '["P4"]', NOW(), NOW()),
  ('p5_legal_vulnerability_audit', 'Legal Vulnerability Assessment Tool', 'Comprehensive legal risk assessment tool covering all critical areas', 'tool', '/tools/p5-legal-audit.xlsx', '["tool", "legal", "risk-assessment"]', '["P5"]', NOW(), NOW()),
  ('p6_indian_buyer_persona_canvas', 'Indian Buyer Persona Canvas', 'Culture-specific buyer persona template for Indian market segments', 'canvas', '/canvas/p6-buyer-persona.pdf', '["canvas", "sales", "personas"]', '["P6"]', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Update timestamps
UPDATE "Product" SET "updatedAt" = NOW() WHERE code LIKE 'P%';
UPDATE "Module" SET "updatedAt" = NOW();

-- Commit the transaction
COMMIT;

-- Verification queries
SELECT 'Products Updated' as status, COUNT(*) as count FROM "Product" WHERE "updatedAt" > NOW() - INTERVAL '5 minutes';
SELECT 'Modules Updated' as status, COUNT(*) as count FROM "Module" WHERE "updatedAt" > NOW() - INTERVAL '5 minutes'; 
SELECT 'Enhanced Lessons' as status, COUNT(*) as count FROM "Lesson" WHERE "xpReward" >= 75;
SELECT 'Activity Types Added' as status, COUNT(*) as count FROM "ActivityType" WHERE "createdAt" > NOW() - INTERVAL '5 minutes';
SELECT 'Resources Added' as status, COUNT(*) as count FROM "Resource" WHERE "createdAt" > NOW() - INTERVAL '5 minutes';