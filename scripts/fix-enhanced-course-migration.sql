-- Fixed Enhanced Course Content Migration Script
-- This script properly updates course content with correct schema

BEGIN;

-- Create activity types for enhanced course integration with proper schema
INSERT INTO "ActivityType" ("id", "name", "description", "category", "portfolioSection", "portfolioField", "dataSchema", "version", "isActive", "createdAt", "updatedAt")
VALUES 
  ('enhanced_opportunity_assessment', 'Enhanced Opportunity Assessment', 'Complete opportunity scoring using the PAINS framework with market analysis', 'validation', 'idea_vision', 'problem_statement', '{"fields": ["problem", "score", "market_size", "pain_level"]}', 1, true, NOW(), NOW()),
  ('customer_interview_execution', 'Customer Interview Execution', 'Conduct systematic customer interviews using LISTEN methodology', 'validation', 'market_research', 'customer_insights', '{"fields": ["interview_notes", "insights", "persona_data"]}', 1, true, NOW(), NOW()),
  ('competitive_positioning_analysis', 'Competitive Positioning Analysis', 'Create comprehensive competitive analysis with positioning strategy', 'strategy', 'market_research', 'competitive_analysis', '{"fields": ["competitors", "positioning", "advantages"]}', 1, true, NOW(), NOW()),
  ('value_proposition_design', 'Value Proposition Design', 'Design compelling value proposition using proven canvas methodology', 'strategy', 'business_model', 'value_proposition', '{"fields": ["customer_jobs", "pains", "gains", "value_map"]}', 1, true, NOW(), NOW()),
  ('legal_structure_selection', 'Legal Structure Selection', 'Choose optimal legal structure with comprehensive analysis', 'legal', 'legal_compliance', 'business_structure', '{"fields": ["entity_type", "reasoning", "compliance_requirements"]}', 1, true, NOW(), NOW()),
  ('funding_readiness_assessment', 'Funding Readiness Assessment', 'Assess funding readiness across all stages with gap analysis', 'funding', 'business_model', 'funding_strategy', '{"fields": ["stage", "readiness_score", "gap_analysis"]}', 1, true, NOW(), NOW()),
  ('financial_architecture_design', 'Financial Architecture Design', 'Build professional Chart of Accounts and financial systems', 'finance', 'financial_planning', 'financial_systems', '{"fields": ["chart_of_accounts", "processes", "compliance"]}', 1, true, NOW(), NOW()),
  ('legal_vulnerability_audit', 'Legal Vulnerability Audit', 'Conduct comprehensive legal risk assessment and mitigation planning', 'legal', 'legal_compliance', 'risk_assessment', '{"fields": ["vulnerabilities", "risk_score", "mitigation_plan"]}', 1, true, NOW(), NOW()),
  ('buyer_psychology_analysis', 'Indian Buyer Psychology Analysis', 'Master Indian market dynamics and cultural buying patterns', 'sales', 'market_research', 'buyer_personas', '{"fields": ["personas", "psychology", "cultural_factors"]}', 1, true, NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;

-- Add XP tracking for enhanced content without payloadJson
INSERT INTO "XPEvent" ("id", "userId", "type", "points", "description", "createdAt")
SELECT 
  'enhanced_content_' || generate_random_uuid(),
  'system',
  'course_content_enhanced', 
  1000,
  'Enhanced course content deployed with comprehensive frameworks and real-world examples',
  NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM "XPEvent" WHERE "type" = 'course_content_enhanced'
);

-- Create comprehensive resources with proper schema
INSERT INTO "Resource" ("id", "title", "description", "type", "fileUrl", "tags", "isDownloadable", "createdAt", "updatedAt", "metadata")
VALUES 
  ('p1_problem_inventory_template', 'Problem Inventory Template', 'Comprehensive Excel template for systematic problem identification and scoring using the PAINS framework', 'template', '/templates/p1-problem-inventory.xlsx', '{"template", "validation", "opportunity", "P1"}', true, NOW(), NOW(), '{"course": "P1", "module": "Foundation", "difficulty": "beginner"}'),
  ('p1_customer_interview_guide', 'Customer Interview Guide', 'Complete interview framework with LISTEN methodology and question banks for effective customer discovery', 'guide', '/guides/p1-customer-interview-guide.pdf', '{"guide", "interviews", "validation", "P1"}', true, NOW(), NOW(), '{"course": "P1", "module": "Foundation", "difficulty": "intermediate"}'),
  ('p1_competitive_analysis_matrix', 'Competitive Analysis Matrix', 'Strategic framework for analyzing competition and identifying positioning opportunities', 'tool', '/tools/p1-competitive-analysis.xlsx', '{"tool", "competition", "strategy", "P1"}', true, NOW(), NOW(), '{"course": "P1", "module": "Foundation", "difficulty": "intermediate"}'),
  ('p1_value_proposition_canvas', 'Value Proposition Canvas', 'Proven canvas methodology for designing compelling value propositions that customers will pay for', 'canvas', '/canvas/p1-value-proposition.pdf', '{"canvas", "value-prop", "strategy", "P1"}', true, NOW(), NOW(), '{"course": "P1", "module": "Foundation", "difficulty": "intermediate"}'),
  ('p2_entity_comparison_matrix', 'Business Entity Comparison Matrix', 'Detailed comparison of all Indian business structures with decision framework and tax implications', 'tool', '/tools/p2-entity-comparison.xlsx', '{"tool", "legal", "incorporation", "P2"}', true, NOW(), NOW(), '{"course": "P2", "module": "Legal Structure", "difficulty": "beginner"}'),
  ('p2_incorporation_checklist', 'Incorporation Checklist', 'Complete step-by-step checklist for incorporating different entity types in India', 'checklist', '/checklists/p2-incorporation.pdf', '{"checklist", "legal", "incorporation", "P2"}', true, NOW(), NOW(), '{"course": "P2", "module": "Legal Structure", "difficulty": "intermediate"}'),
  ('p3_investor_database', 'Indian Investor Database', 'Database of 500+ active investors with contact details, investment thesis, and funding history', 'database', '/databases/p3-investor-database.xlsx', '{"database", "funding", "investors", "P3"}', true, NOW(), NOW(), '{"course": "P3", "module": "Funding", "difficulty": "advanced"}'),
  ('p3_pitch_deck_template', 'Investor Pitch Deck Template', 'Proven pitch deck template with storytelling framework used by successful Indian startups', 'template', '/templates/p3-pitch-deck.pptx', '{"template", "pitching", "investors", "P3"}', true, NOW(), NOW(), '{"course": "P3", "module": "Funding", "difficulty": "intermediate"}'),
  ('p4_chart_of_accounts', 'Startup Chart of Accounts Template', 'Professional Chart of Accounts template for Indian startups with GST compliance and best practices', 'template', '/templates/p4-chart-of-accounts.xlsx', '{"template", "finance", "accounting", "P4"}', true, NOW(), NOW(), '{"course": "P4", "module": "Finance", "difficulty": "intermediate"}'),
  ('p4_financial_dashboard', 'Financial Dashboard Template', 'Real-time financial dashboard template with key metrics and automated reporting', 'template', '/templates/p4-financial-dashboard.xlsx', '{"template", "finance", "dashboard", "P4"}', true, NOW(), NOW(), '{"course": "P4", "module": "Finance", "difficulty": "advanced"}'),
  ('p5_legal_vulnerability_audit', 'Legal Vulnerability Assessment Tool', 'Comprehensive legal risk assessment tool covering all 15 critical legal areas for startups', 'tool', '/tools/p5-legal-audit.xlsx', '{"tool", "legal", "risk-assessment", "P5"}', true, NOW(), NOW(), '{"course": "P5", "module": "Legal", "difficulty": "intermediate"}'),
  ('p5_contract_templates_library', 'Contract Templates Library', 'Complete library of 25+ legal contract templates for all business needs', 'template', '/templates/p5-contracts-library.zip', '{"template", "legal", "contracts", "P5"}', true, NOW(), NOW(), '{"course": "P5", "module": "Legal", "difficulty": "advanced"}'),
  ('p6_indian_buyer_persona_canvas', 'Indian Buyer Persona Canvas', 'Culture-specific buyer persona template for Indian market segments with regional variations', 'canvas', '/canvas/p6-buyer-persona.pdf', '{"canvas", "sales", "personas", "P6"}', true, NOW(), NOW(), '{"course": "P6", "module": "Sales", "difficulty": "intermediate"}'),
  ('p6_sales_scripts_library', 'Indian Sales Scripts Library', 'Collection of proven sales scripts and conversation frameworks for Indian markets', 'template', '/templates/p6-sales-scripts.docx', '{"template", "sales", "scripts", "P6"}', true, NOW(), NOW(), '{"course": "P6", "module": "Sales", "difficulty": "intermediate"}')
ON CONFLICT ("id") DO NOTHING;

-- Update lessons with more comprehensive action items for key lessons
UPDATE "Lesson" SET 
  "actionItems" = '[
    {
      "title": "Complete Opportunity Scoring Matrix",
      "description": "Use the PAINS framework to score 20+ problems on market size, pain intensity, ability to pay, competition level, and your expertise. Identify your top 3 opportunities.",
      "timeRequired": "90 mins",
      "deliverable": "Ranked list of top 3 business opportunities with detailed scoring and reasoning"
    },
    {
      "title": "Set Up Entrepreneur Productivity System", 
      "description": "Create dedicated workspace (physical/digital), implement project management system, and establish daily 2-hour startup work routine.",
      "timeRequired": "60 mins",
      "deliverable": "Functional productivity system with workspace, tools, and schedule"
    },
    {
      "title": "Begin Market Research",
      "description": "Research your top opportunity using online sources, competitor analysis, and initial customer conversations to validate market potential.",
      "timeRequired": "120 mins", 
      "deliverable": "Market research summary with opportunity validation data"
    }
  ]',
  "resources" = '[
    {
      "title": "Problem Inventory Template",
      "resourceId": "p1_problem_inventory_template",
      "type": "template",
      "description": "Excel template for systematic problem identification using PAINS framework"
    },
    {
      "title": "Opportunity Scoring Calculator",
      "type": "tool", 
      "description": "Interactive calculator for ranking and comparing business opportunities"
    },
    {
      "title": "Entrepreneur Success Stories",
      "type": "case_study",
      "description": "20+ case studies of successful Indian entrepreneurs and their opportunity recognition journey"
    }
  ]',
  "updatedAt" = NOW()
WHERE day = 1 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1')
);

-- Update P1 Day 2 with comprehensive customer development content
UPDATE "Lesson" SET 
  "actionItems" = '[
    {
      "title": "Master LISTEN Interview Framework",
      "description": "Learn and practice the LISTEN methodology: Learn, Identify, Seek, Test, Explore, Navigate customer conversations for maximum insights.",
      "timeRequired": "45 mins",
      "deliverable": "Mastery of LISTEN framework with practice scenarios"
    },
    {
      "title": "Execute Customer Outreach Campaign",
      "description": "Send 20 personalized outreach messages across LinkedIn, email, and social media to schedule customer interviews.",
      "timeRequired": "90 mins",
      "deliverable": "20 outreach messages sent with tracking spreadsheet"
    },
    {
      "title": "Conduct First Customer Interview",
      "description": "Complete first 30-minute customer interview using LISTEN framework, focusing on problem validation and customer insights.",
      "timeRequired": "45 mins",
      "deliverable": "Completed interview with detailed notes and key insights"
    }
  ]',
  "resources" = '[
    {
      "title": "Customer Interview Guide",
      "resourceId": "p1_customer_interview_guide", 
      "type": "guide",
      "description": "Complete framework with LISTEN methodology and 50+ proven questions"
    },
    {
      "title": "Outreach Message Templates",
      "type": "template",
      "description": "100+ proven outreach templates for different channels and customer types"
    },
    {
      "title": "Interview Recording Setup",
      "type": "guide", 
      "description": "Technical guide for recording and analyzing customer interviews"
    }
  ]',
  "updatedAt" = NOW()
WHERE day = 2 AND "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P1')
);

-- Add comprehensive course completion tracking
INSERT INTO "Lesson" ("id", "moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
  'enhanced_' || code || '_completion',
  (SELECT id FROM "Module" WHERE "productId" = p.id ORDER BY "orderIndex" DESC LIMIT 1),
  CASE 
    WHEN code = 'P1' THEN 31
    WHEN code = 'P2' THEN 46
    WHEN code = 'P3' THEN 46  
    WHEN code = 'P4' THEN 46
    WHEN code = 'P5' THEN 46
    WHEN code = 'P6' THEN 61
    ELSE 31
  END,
  'Course Completion & Certification',
  'Congratulations on completing this comprehensive course! This final lesson covers certification, next steps, and advanced resources for continued learning.',
  '[
    {
      "title": "Complete Final Assessment",
      "description": "Take the comprehensive final exam covering all key concepts and frameworks from the course.",
      "timeRequired": "60 mins",
      "deliverable": "Passed final assessment with 80%+ score"
    },
    {
      "title": "Create Implementation Plan",
      "description": "Develop your personalized 90-day implementation plan using frameworks and tools from the course.",
      "timeRequired": "90 mins", 
      "deliverable": "Detailed 90-day action plan with milestones and deadlines"
    },
    {
      "title": "Join Alumni Community",
      "description": "Connect with fellow graduates, access ongoing resources, and participate in monthly expert sessions.",
      "timeRequired": "30 mins",
      "deliverable": "Active participation in alumni community"
    }
  ]',
  '[
    {
      "title": "Final Assessment",
      "type": "assessment",
      "description": "Comprehensive exam covering all course materials and practical applications"
    },
    {
      "title": "Implementation Toolkit",
      "type": "toolkit", 
      "description": "Advanced tools and templates for implementing course concepts in your business"
    },
    {
      "title": "Alumni Directory",
      "type": "directory",
      "description": "Network with 1000+ course graduates and industry professionals"
    }
  ]',
  45,
  200,
  999,
  NOW(),
  NOW()
FROM "Product" p 
WHERE code IN ('P1', 'P2', 'P3', 'P4', 'P5', 'P6')
ON CONFLICT DO NOTHING;

-- Update all timestamps to reflect recent enhancements
UPDATE "Product" SET "updatedAt" = NOW() WHERE code LIKE 'P%';
UPDATE "Module" SET "updatedAt" = NOW();

COMMIT;

-- Final verification
SELECT 'Enhanced Course Migration Completed' as status;
SELECT 'Products Updated' as status, COUNT(*) as count FROM "Product" WHERE "updatedAt" > NOW() - INTERVAL '5 minutes';
SELECT 'Activity Types Added' as status, COUNT(*) as count FROM "ActivityType" WHERE "createdAt" > NOW() - INTERVAL '5 minutes';
SELECT 'Resources Added' as status, COUNT(*) as count FROM "Resource" WHERE "createdAt" > NOW() - INTERVAL '5 minutes';
SELECT 'Enhanced Lessons' as status, COUNT(*) as count FROM "Lesson" WHERE "xpReward" >= 100;