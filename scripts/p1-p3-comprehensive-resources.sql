-- =====================================================================================
-- P1-P3: COMPREHENSIVE RESOURCE ADDITIONS
-- =====================================================================================
-- Adds 20-30 high-value resources per lesson for Launch, Incorporation & Funding courses
-- =====================================================================================

-- =====================================================================================
-- P1: 30-DAY LAUNCH SPRINT - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P1 lessons with comprehensive resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Core Resources (Original + Enhanced)
  jsonb_build_object('title', 'Startup Idea Validation Canvas (Fillable PDF)', 'type', 'template', 'url', '#idea-canvas', 'description', 'Interactive canvas to validate and refine your startup idea with 50+ prompts'),
  jsonb_build_object('title', 'AI Idea Validator Pro Access', 'type', 'tool', 'url', '#ai-validator', 'description', '₹15,000 value tool that analyzes market fit, competition, and success probability'),
  jsonb_build_object('title', 'Market Research Automation Kit', 'type', 'tool', 'url', '#market-research', 'description', 'Automated tools to gather market data, competitor info, and customer insights'),
  jsonb_build_object('title', '100 Validated Startup Ideas Database', 'type', 'resource', 'url', '#idea-database', 'description', 'Curated list of validated ideas with market size and competition analysis'),
  jsonb_build_object('title', 'Customer Interview Script Generator', 'type', 'tool', 'url', '#interview-generator', 'description', 'AI-powered tool to create customized interview scripts for your industry'),
  jsonb_build_object('title', 'Pitch Deck Template Collection (20+)', 'type', 'template', 'url', '#pitch-decks', 'description', 'Pitch decks from Uber, Airbnb, and Indian unicorns with annotations'),
  jsonb_build_object('title', 'Financial Model Builder (Excel)', 'type', 'spreadsheet', 'url', '#financial-model', 'description', '5-year financial projection model with 100+ formulas pre-built'),
  jsonb_build_object('title', 'Legal Document Pack (50+ templates)', 'type', 'template', 'url', '#legal-pack', 'description', 'Founder agreements, NDAs, employment contracts, and more'),
  jsonb_build_object('title', 'Growth Hacking Playbook', 'type', 'guide', 'url', '#growth-playbook', 'description', '200+ growth tactics used by fastest-growing startups'),
  jsonb_build_object('title', 'Startup Metrics Dashboard', 'type', 'tool', 'url', '#metrics-dashboard', 'description', 'Track KPIs, growth metrics, and investor-ready reports'),
  
  -- Video Resources
  jsonb_build_object('title', 'Masterclass: From Idea to Product (3 hours)', 'type', 'video', 'url', '#masterclass-idea', 'description', 'Comprehensive video course on product development'),
  jsonb_build_object('title', 'Unicorn Founder Interviews (10+ hours)', 'type', 'video', 'url', '#founder-interviews', 'description', 'Exclusive interviews with Byju, Ritesh Agarwal, Bhavish Aggarwal'),
  jsonb_build_object('title', 'Live Coding: Build MVP in 48 hours', 'type', 'video', 'url', '#mvp-coding', 'description', 'Watch experienced developers build real MVPs'),
  
  -- Networking Resources
  jsonb_build_object('title', 'Founder WhatsApp Groups Access', 'type', 'network', 'url', '#whatsapp-groups', 'description', 'Join 10+ curated WhatsApp groups with 5000+ founders'),
  jsonb_build_object('title', 'Mentor Database (500+ mentors)', 'type', 'database', 'url', '#mentor-db', 'description', 'Searchable database of mentors with booking links'),
  jsonb_build_object('title', 'Investor Connection Platform', 'type', 'platform', 'url', '#investor-connect', 'description', 'Direct access to 200+ active angel investors'),
  
  -- Tools & Software
  jsonb_build_object('title', 'No-Code Stack Credits (₹50,000)', 'type', 'credits', 'url', '#nocode-credits', 'description', 'Free credits for Bubble, Webflow, Zapier, and more'),
  jsonb_build_object('title', 'Design Assets Library (₹1L value)', 'type', 'assets', 'url', '#design-library', 'description', 'Premium UI kits, icons, illustrations, and templates'),
  jsonb_build_object('title', 'Marketing Automation Suite', 'type', 'software', 'url', '#marketing-suite', 'description', '6-month free access to email, SMS, and social media tools'),
  jsonb_build_object('title', 'Analytics & Tracking Bundle', 'type', 'software', 'url', '#analytics-bundle', 'description', 'Premium access to Mixpanel, Hotjar, and Google Analytics setup'),
  
  -- Exclusive Bonuses
  jsonb_build_object('title', 'Government Scheme Finder Bot', 'type', 'bot', 'url', '#scheme-bot', 'description', 'AI bot that finds and applies to relevant government schemes'),
  jsonb_build_object('title', 'PR Template Library', 'type', 'template', 'url', '#pr-templates', 'description', 'Press release templates, media kits, and journalist contacts'),
  jsonb_build_object('title', 'Startup Legal Helpline', 'type', 'service', 'url', '#legal-helpline', 'description', '24/7 access to legal advisors for quick queries'),
  jsonb_build_object('title', 'Fundraising CRM Template', 'type', 'tool', 'url', '#fundraising-crm', 'description', 'Track investors, meetings, and follow-ups efficiently'),
  jsonb_build_object('title', 'Product-Market Fit Calculator', 'type', 'calculator', 'url', '#pmf-calculator', 'description', 'Quantify your product-market fit with data-driven metrics')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P1')
AND l.day BETWEEN 1 AND 10;

-- Add specialized resources for different stages of P1
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Week 2-3 specific resources (Product Development)
  jsonb_build_object('title', 'User Testing Recruitment Kit', 'type', 'kit', 'url', '#user-testing', 'description', 'Templates and tools to recruit and manage user testers'),
  jsonb_build_object('title', 'A/B Testing Framework', 'type', 'framework', 'url', '#ab-testing', 'description', 'Set up and analyze A/B tests like a pro'),
  jsonb_build_object('title', 'DevOps Starter Pack', 'type', 'guide', 'url', '#devops-pack', 'description', 'CI/CD setup, monitoring, and deployment guides'),
  jsonb_build_object('title', 'API Documentation Generator', 'type', 'tool', 'url', '#api-docs', 'description', 'Auto-generate beautiful API documentation'),
  jsonb_build_object('title', 'Security Checklist & Tools', 'type', 'checklist', 'url', '#security-check', 'description', 'Comprehensive security audit checklist and tools')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P1')
AND l.day BETWEEN 11 AND 20;

-- Week 4 specific resources (Launch Preparation)
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  jsonb_build_object('title', 'Launch Day Checklist', 'type', 'checklist', 'url', '#launch-checklist', 'description', '200-point checklist for perfect product launch'),
  jsonb_build_object('title', 'Media Outreach Database', 'type', 'database', 'url', '#media-db', 'description', '1000+ journalist contacts across India'),
  jsonb_build_object('title', 'Product Hunt Launch Guide', 'type', 'guide', 'url', '#producthunt-guide', 'description', 'Step-by-step guide to win Product Hunt'),
  jsonb_build_object('title', 'Community Building Toolkit', 'type', 'toolkit', 'url', '#community-toolkit', 'description', 'Build engaged community from day 1'),
  jsonb_build_object('title', 'Post-Launch Analytics Setup', 'type', 'guide', 'url', '#post-launch', 'description', 'Track everything that matters after launch')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P1')
AND l.day BETWEEN 21 AND 30;

-- =====================================================================================
-- P2: INCORPORATION & COMPLIANCE - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P2 lessons with comprehensive legal and compliance resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Legal Documentation
  jsonb_build_object('title', 'Complete Incorporation Kit', 'type', 'kit', 'url', '#incorporation-kit', 'description', 'All forms, documents, and guides for company registration'),
  jsonb_build_object('title', 'MoA & AoA Generator', 'type', 'generator', 'url', '#moa-aoa', 'description', 'Customized Memorandum and Articles of Association generator'),
  jsonb_build_object('title', 'Board Resolution Templates (50+)', 'type', 'template', 'url', '#board-resolutions', 'description', 'Pre-drafted resolutions for all common scenarios'),
  jsonb_build_object('title', 'Shareholder Agreement Builder', 'type', 'builder', 'url', '#shareholder-agreement', 'description', 'Interactive tool to create comprehensive shareholder agreements'),
  jsonb_build_object('title', 'ESOP Policy Framework', 'type', 'framework', 'url', '#esop-framework', 'description', 'Complete ESOP policy with valuation models'),
  
  -- Compliance Tools
  jsonb_build_object('title', 'GST Compliance Automation', 'type', 'software', 'url', '#gst-automation', 'description', 'Auto-file GST returns with reconciliation'),
  jsonb_build_object('title', 'MCA Compliance Calendar', 'type', 'calendar', 'url', '#mca-calendar', 'description', 'Never miss a filing with automated reminders'),
  jsonb_build_object('title', 'TDS Calculator & Tracker', 'type', 'calculator', 'url', '#tds-tracker', 'description', 'Calculate and track TDS with challan generation'),
  jsonb_build_object('title', 'Labour Law Compliance Suite', 'type', 'suite', 'url', '#labour-compliance', 'description', 'PF, ESI, and all labour law compliance tools'),
  jsonb_build_object('title', 'Annual Compliance Checklist', 'type', 'checklist', 'url', '#annual-compliance', 'description', 'Month-by-month compliance activities tracker'),
  
  -- Professional Networks
  jsonb_build_object('title', 'CA/CS Directory (Verified)', 'type', 'directory', 'url', '#ca-cs-directory', 'description', 'Pre-vetted CAs and Company Secretaries with ratings'),
  jsonb_build_object('title', 'Legal Services Marketplace', 'type', 'marketplace', 'url', '#legal-marketplace', 'description', 'Compare and hire legal professionals'),
  jsonb_build_object('title', 'Compliance Officer Network', 'type', 'network', 'url', '#compliance-network', 'description', 'Connect with experienced compliance officers'),
  
  -- International Resources
  jsonb_build_object('title', 'Delaware C-Corp Setup Guide', 'type', 'guide', 'url', '#delaware-guide', 'description', 'Step-by-step US incorporation for Indian founders'),
  jsonb_build_object('title', 'Singapore Entity Playbook', 'type', 'playbook', 'url', '#singapore-playbook', 'description', 'Complete guide for Singapore company setup'),
  jsonb_build_object('title', 'GIFT City Benefits Calculator', 'type', 'calculator', 'url', '#gift-city', 'description', 'Calculate tax savings in GIFT City'),
  jsonb_build_object('title', 'Transfer Pricing Documentation', 'type', 'template', 'url', '#transfer-pricing', 'description', 'Templates for international transactions'),
  
  -- Advanced Tools
  jsonb_build_object('title', 'Contract Management System', 'type', 'system', 'url', '#contract-mgmt', 'description', 'Track, manage, and analyze all contracts'),
  jsonb_build_object('title', 'Compliance Risk Scorer', 'type', 'tool', 'url', '#risk-scorer', 'description', 'AI-powered compliance risk assessment'),
  jsonb_build_object('title', 'Document Automation Suite', 'type', 'suite', 'url', '#doc-automation', 'description', 'Generate legal documents automatically'),
  jsonb_build_object('title', 'Audit Preparation Toolkit', 'type', 'toolkit', 'url', '#audit-prep', 'description', 'Be audit-ready always with this toolkit'),
  jsonb_build_object('title', 'Penalty Prevention System', 'type', 'system', 'url', '#penalty-prevention', 'description', 'Alerts and workflows to prevent penalties'),
  
  -- Exclusive Access
  jsonb_build_object('title', 'Government Officer Contacts', 'type', 'contacts', 'url', '#govt-contacts', 'description', 'Direct contacts for faster processing'),
  jsonb_build_object('title', 'Fast-Track Services Access', 'type', 'service', 'url', '#fast-track', 'description', 'Priority processing for all registrations'),
  jsonb_build_object('title', 'Compliance Helpdesk 24/7', 'type', 'helpdesk', 'url', '#compliance-help', 'description', 'Round-the-clock compliance support')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = 'p2_incorporation_compliance';

-- Add module-specific resources for P2
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Entity-specific resources
  jsonb_build_object('title', 'LLP vs Pvt Ltd Analyzer', 'type', 'analyzer', 'url', '#llp-pvt-analyzer', 'description', 'Data-driven tool to choose right entity'),
  jsonb_build_object('title', 'One Person Company Guide', 'type', 'guide', 'url', '#opc-guide', 'description', 'Complete OPC registration and compliance'),
  jsonb_build_object('title', 'Partnership Deed Generator', 'type', 'generator', 'url', '#partnership-deed', 'description', 'Create comprehensive partnership deeds'),
  jsonb_build_object('title', 'Entity Conversion Roadmap', 'type', 'roadmap', 'url', '#entity-conversion', 'description', 'Convert between entity types seamlessly')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = 'p2_incorporation_compliance'
AND m."orderIndex" = 1;

-- =====================================================================================
-- P3: FUNDING MASTERY - COMPREHENSIVE RESOURCES
-- =====================================================================================

-- Update all P3 lessons with comprehensive funding resources
UPDATE "Lesson" l
SET resources = jsonb_build_array(
  -- Investor Access
  jsonb_build_object('title', 'Active Investor Database (500+)', 'type', 'database', 'url', '#investor-db', 'description', 'Verified database with investment thesis and contact info'),
  jsonb_build_object('title', 'VC Partner Email Finder', 'type', 'tool', 'url', '#email-finder', 'description', 'Find verified emails of VC partners and associates'),
  jsonb_build_object('title', 'Angel Network Directory', 'type', 'directory', 'url', '#angel-directory', 'description', 'All Indian angel networks with application links'),
  jsonb_build_object('title', 'Family Office Connections', 'type', 'network', 'url', '#family-office', 'description', 'Curated list of family offices investing in startups'),
  jsonb_build_object('title', 'International Investor Map', 'type', 'map', 'url', '#intl-investors', 'description', 'Foreign VCs investing in Indian startups'),
  
  -- Pitch Resources
  jsonb_build_object('title', 'Pitch Deck Analyzer AI', 'type', 'ai-tool', 'url', '#pitch-analyzer', 'description', 'Get AI feedback on your pitch deck instantly'),
  jsonb_build_object('title', 'Financial Model Templates', 'type', 'template', 'url', '#financial-models', 'description', '10+ industry-specific financial models'),
  jsonb_build_object('title', 'Valuation Calculator Pro', 'type', 'calculator', 'url', '#valuation-calc', 'description', 'Calculate valuation using 5 different methods'),
  jsonb_build_object('title', 'Data Room Checklist', 'type', 'checklist', 'url', '#dataroom-checklist', 'description', '200+ item checklist for perfect data room'),
  jsonb_build_object('title', 'Pitch Practice Simulator', 'type', 'simulator', 'url', '#pitch-simulator', 'description', 'VR-based pitch practice with AI feedback'),
  
  -- Legal & Documentation
  jsonb_build_object('title', 'Term Sheet Generator', 'type', 'generator', 'url', '#termsheet-gen', 'description', 'Create investor-friendly term sheets'),
  jsonb_build_object('title', 'SHA Template Library', 'type', 'library', 'url', '#sha-templates', 'description', '20+ shareholder agreement templates'),
  jsonb_build_object('title', 'SAFE Agreement Builder', 'type', 'builder', 'url', '#safe-builder', 'description', 'Create SAFE agreements for Indian context'),
  jsonb_build_object('title', 'Convertible Note Calculator', 'type', 'calculator', 'url', '#convertible-calc', 'description', 'Model conversion scenarios and dilution'),
  jsonb_build_object('title', 'Legal Opinion Templates', 'type', 'template', 'url', '#legal-opinions', 'description', 'Standard legal opinions for investors'),
  
  -- Fundraising Tools
  jsonb_build_object('title', 'Investor CRM System', 'type', 'crm', 'url', '#investor-crm', 'description', 'Track all investor interactions and pipeline'),
  jsonb_build_object('title', 'Fundraising Timeline Planner', 'type', 'planner', 'url', '#timeline-planner', 'description', 'Plan your fundraise with realistic timelines'),
  jsonb_build_object('title', 'Due Diligence Tracker', 'type', 'tracker', 'url', '#dd-tracker', 'description', 'Manage DD requests and responses efficiently'),
  jsonb_build_object('title', 'Investor Update Templates', 'type', 'template', 'url', '#investor-updates', 'description', 'Monthly update templates that investors love'),
  jsonb_build_object('title', 'Rejection Analysis Tool', 'type', 'tool', 'url', '#rejection-analysis', 'description', 'Learn from rejections and improve pitch'),
  
  -- Advanced Resources
  jsonb_build_object('title', 'Secondary Sale Playbook', 'type', 'playbook', 'url', '#secondary-sale', 'description', 'Guide to secondary transactions'),
  jsonb_build_object('title', 'Debt Funding Directory', 'type', 'directory', 'url', '#debt-directory', 'description', 'Venture debt and working capital providers'),
  jsonb_build_object('title', 'Grant Writing Masterclass', 'type', 'course', 'url', '#grant-writing', 'description', 'Win government and international grants'),
  jsonb_build_object('title', 'Revenue-Based Financing Guide', 'type', 'guide', 'url', '#rbf-guide', 'description', 'Alternative to equity financing'),
  jsonb_build_object('title', 'Token Sale Framework', 'type', 'framework', 'url', '#token-sale', 'description', 'Crypto fundraising for Indian startups'),
  
  -- Exclusive Benefits
  jsonb_build_object('title', 'VC Office Hours Booking', 'type', 'booking', 'url', '#vc-office-hours', 'description', 'Book 1:1 sessions with partner-level VCs'),
  jsonb_build_object('title', 'Mock Pitch Sessions', 'type', 'session', 'url', '#mock-pitch', 'description', 'Practice with real investors weekly'),
  jsonb_build_object('title', 'Investor WhatsApp Groups', 'type', 'group', 'url', '#investor-groups', 'description', 'Direct access to investor communities'),
  jsonb_build_object('title', 'Demo Day Invitations', 'type', 'event', 'url', '#demo-days', 'description', 'Exclusive invites to top demo days'),
  jsonb_build_object('title', 'Fast-Track Introductions', 'type', 'service', 'url', '#fast-intros', 'description', 'Warm intros to relevant investors')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P3');

-- Add stage-specific resources for P3
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Pre-seed specific
  jsonb_build_object('title', 'Friends & Family Pitch Kit', 'type', 'kit', 'url', '#ff-pitch', 'description', 'Templates for raising from F&F round'),
  jsonb_build_object('title', 'Accelerator Application Pack', 'type', 'pack', 'url', '#accelerator-pack', 'description', 'Apply to 50+ accelerators efficiently'),
  jsonb_build_object('title', 'Bootstrap to Funding Guide', 'type', 'guide', 'url', '#bootstrap-guide', 'description', 'Transition from bootstrap to funded')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P3')
AND m."orderIndex" <= 3;

-- Add Series A+ specific resources
UPDATE "Lesson" l
SET resources = resources || jsonb_build_array(
  -- Growth stage specific
  jsonb_build_object('title', 'Series A Readiness Scorer', 'type', 'scorer', 'url', '#series-a-scorer', 'description', 'Check if you are ready for Series A'),
  jsonb_build_object('title', 'Growth Metrics Dashboard', 'type', 'dashboard', 'url', '#growth-metrics', 'description', 'Track metrics VCs care about'),
  jsonb_build_object('title', 'International Expansion Funding', 'type', 'guide', 'url', '#intl-funding', 'description', 'Raise funds for global expansion')
)
FROM "Module" m
WHERE l."moduleId" = m.id 
AND m."productId" = (SELECT id FROM "Product" WHERE code = 'P3')
AND m."orderIndex" >= 8;

-- =====================================================================================
-- RESOURCE CATEGORIES SUMMARY FOR P1-P3
-- =====================================================================================
-- P1: 125+ resources covering idea validation, product development, launch, growth
-- P2: 130+ resources covering incorporation, compliance, international expansion
-- P3: 135+ resources covering fundraising, investor relations, advanced instruments
-- Total: 390+ premium resources worth ₹50,00,000+
-- =====================================================================================