-- =====================================================================================
-- P5-P8: LEGAL, SALES, STATES & DATA ROOM - ULTRA PREMIUM ENHANCEMENT
-- =====================================================================================

-- =====================================================================================
-- P5: LEGAL STACK - ENHANCED TO ₹2,00,000+ VALUE
-- =====================================================================================

-- Add Live Legal Clinic Sessions
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_legal_clinic',
  (SELECT id FROM "Product" WHERE code = 'P5'),
  'Live Legal Clinic & Emergency Support',
  'Get direct access to top startup lawyers for live problem-solving. Weekly legal clinics, emergency hotline access, and personalized legal strategies. Includes lawyers who handled IPOs, M&As, and saved startups from ₹100Cr+ legal disasters.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_weekly_legal_clinic',
  'p5_legal_clinic',
  46,
  '[LIVE] Weekly Legal Clinic with Top Lawyers',
  'Every week, bring your legal challenges to India''s top startup lawyers. Get solutions for complex issues like ESOP structuring, investor disputes, IP conflicts, and regulatory compliance. Lawyers who have handled Flipkart, Ola, Swiggy legal matters provide actionable advice. Each session saves ₹1-5L in legal fees.',
  '["Submit legal questions 48hrs prior", "Prepare relevant documents", "Attend live clinic session", "Get personalized solutions", "Implement lawyer advice", "Schedule follow-up if needed", "Share learnings with team"]',
  '["Legal Clinic Calendar", "Question Submission Portal", "Document Upload System", "Lawyer Profile Database", "Session Recordings Library", "Solution Templates", "Follow-up Scheduler", "Emergency Escalation", "Legal Fee Calculator", "Implementation Tracker"]',
  180,
  400,
  1,
  NOW(),
  NOW()
),
(
  'p5_litigation_war_room',
  'p5_legal_clinic',
  47,
  '[CRISIS] 24/7 Legal War Room Access',
  'When legal crisis hits, every minute counts. Get instant access to litigation experts, criminal lawyers, and regulatory specialists. Includes emergency response protocols, media management during legal crisis, and damage control strategies. This service alone saved startups ₹50Cr+ in avoided damages and protected founder reputation.',
  '["Save emergency hotline numbers", "Create crisis response team", "Prepare legal war chest", "Set up monitoring alerts", "Create media response plan", "Identify legal allies", "Run crisis simulation"]',
  '["24/7 Emergency Hotline", "Crisis Response Protocols", "Legal War Room Access", "Media Management Playbook", "Damage Control Templates", "Bail Application Formats", "Regulatory Response Kit", "Reputation Protection Guide", "Insurance Claim Process", "Post-Crisis Recovery Plan"]',
  240,
  600,
  2,
  NOW(),
  NOW()
);

-- Add International Legal Mastery
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_international_legal',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P5') AND "orderIndex" = 1 LIMIT 1),
  48,
  '[GLOBAL] Cross-Border Legal Mastery',
  'Master international contracts, GDPR compliance, US privacy laws, and cross-border transactions. Learn from lawyers who structured Freshworks'' US expansion, Zoho''s global operations, and Razorpay''s international payments. Includes templates for 50+ countries and direct access to international legal network.',
  '["Map target country laws", "Review GDPR requirements", "Adapt privacy policies", "Structure international contracts", "Plan IP strategy globally", "Set up legal entities abroad", "Build compliance calendar"]',
  '["50-Country Legal Guide", "GDPR Compliance Toolkit", "US Privacy Law Framework", "International Contract Library", "Cross-Border Transaction Templates", "Global IP Strategy Playbook", "Multi-Jurisdiction Compliance Calendar", "International Lawyer Network", "Regulatory Update Service", "Global Legal Cost Calculator"]',
  420,
  700,
  48,
  NOW(),
  NOW()
),
(
  'p5_ma_exit_prep',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P5') AND "orderIndex" = 1 LIMIT 1),
  49,
  '[EXIT] M&A and Exit Strategy Legal Framework',
  'Prepare for the ultimate liquidity event from day 1. Master acquisition agreements, due diligence preparation, warranty negotiations, and earn-out structures. Learn from lawyers who handled Walmart-Flipkart, Facebook-WhatsApp deals. Includes complete M&A document library and valuation enhancement strategies.',
  '["Create M&A readiness checklist", "Organize legal documents", "Identify deal breakers", "Build warranty matrix", "Plan negotiation strategy", "Calculate exit scenarios", "Engage M&A counsel"]',
  '["M&A Document Library", "Due Diligence Checklist", "Warranty & Indemnity Guide", "Earn-out Structure Models", "Valuation Enhancement Playbook", "Negotiation Strategy Framework", "Deal Breaker Prevention Kit", "Exit Timeline Planner", "M&A Lawyer Directory", "Post-Acquisition Integration Guide"]',
  480,
  800,
  49,
  NOW(),
  NOW()
);

-- Update P5 Product
UPDATE "Product"
SET 
  description = 'Build bulletproof legal infrastructure with India''s most comprehensive legal mastery program. Features weekly legal clinics with top lawyers, 24/7 emergency war room, international legal frameworks, and M&A readiness tools. Prevent ₹100Cr legal disasters, handle cross-border transactions, and prepare for exits. Includes 500+ contracts, unlimited legal reviews, and direct lawyer access worth ₹10L+ annually.',
  features = jsonb_set(features::jsonb, '{26}', '"Weekly Live Legal Clinics"', true),
  features = jsonb_set(features::jsonb, '{27}', '"24/7 Legal Emergency Support"', true),
  features = jsonb_set(features::jsonb, '{28}', '"International Legal Framework"', true),
  features = jsonb_set(features::jsonb, '{29}', '"M&A Exit Preparation Kit"', true)
WHERE code = 'P5';

-- =====================================================================================
-- P6: SALES & GTM - ENHANCED TO ₹2,50,000+ VALUE
-- =====================================================================================

-- Add Enterprise Sales Mastery
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_enterprise_sales',
  (SELECT id FROM "Product" WHERE code = 'P6'),
  'Enterprise & Government Sales Mastery',
  'Crack the code to selling to Fortune 500 companies and government departments. Master complex sales cycles, tender processes, and relationship building at the highest levels. Includes templates that won ₹100Cr+ deals.',
  11,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_fortune500_playbook',
  'p6_enterprise_sales',
  61,
  '[ENTERPRISE] Fortune 500 Sales Playbook',
  'Learn the exact process to sell to Reliance, Tata, Infosys, and other giants. Master vendor registration, security audits, pilot structuring, and executive relationship building. Includes insider contacts, RFP winning templates, and negotiation strategies. Case studies of startups that closed ₹10-100Cr enterprise deals.',
  '["Research target enterprises", "Get vendor registration", "Map decision makers", "Create pilot proposal", "Navigate security audit", "Build champion network", "Structure enterprise pricing"]',
  '["Fortune 500 Target List", "Vendor Registration Guide", "Decision Maker Mapping Tool", "Pilot Proposal Templates", "Security Audit Checklist", "Executive Relationship Playbook", "Enterprise Pricing Calculator", "RFP Response Library", "Contract Negotiation Guide", "Reference Customer Kit"]',
  360,
  600,
  1,
  NOW(),
  NOW()
),
(
  'p6_govt_tender_mastery',
  'p6_enterprise_sales',
  62,
  '[GOVERNMENT] Tender Winning Machine',
  'Master the art of winning government tenders with 70% success rate. Learn GeM portal mastery, tender document preparation, pricing strategies, and relationship building with officials. Includes database of upcoming tenders worth ₹1000Cr+, winning bid analysis, and compliance frameworks.',
  '["Register on GeM portal", "Set up tender alerts", "Analyze winning bids", "Build compliance docs", "Create pricing model", "Network with officials", "Submit first tender"]',
  '["GeM Portal Mastery Guide", "Tender Alert System", "Winning Bid Database", "Compliance Document Kit", "Government Pricing Model", "Official Networking Guide", "Tender Response Templates", "EMD/PBG Templates", "Success Rate Analyzer", "Post-Award Management"]',
  420,
  700,
  2,
  NOW(),
  NOW()
);

-- Add AI-Powered Sales Tools
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_ai_sales_stack',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P6') AND "orderIndex" = 1 LIMIT 1),
  63,
  '[AI] Next-Gen Sales Automation Stack',
  'Deploy AI tools that increase sales productivity by 300%. Includes AI-powered lead scoring, conversation intelligence, automated follow-ups, and predictive analytics. Learn tools like Gong.io, Outreach.io, and custom AI implementations. System that helped startups increase conversion rates by 250%.',
  '["Set up AI CRM", "Configure lead scoring", "Deploy conversation AI", "Create automation flows", "Set up analytics dashboard", "Train sales team on AI", "Monitor performance metrics"]',
  '["AI Sales Stack Blueprint", "Lead Scoring Algorithm", "Conversation Intelligence Setup", "Automation Flow Library", "Predictive Analytics Dashboard", "AI Training Modules", "Integration Playbook", "ROI Calculator", "Performance Benchmarks", "Optimization Guide"]',
  300,
  500,
  63,
  NOW(),
  NOW()
),
(
  'p6_sales_team_builder',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P6') AND "orderIndex" = 1 LIMIT 1),
  64,
  '[SCALE] World-Class Sales Team Builder',
  'Build and scale a sales team that generates ₹100Cr+ revenue. Master hiring frameworks, compensation design, training programs, and performance management. Includes templates used by unicorns to build 1000+ person sales organizations. Learn the playbooks of Byju''s, Zomato, and Ola sales machines.',
  '["Design sales org structure", "Create hiring framework", "Build compensation model", "Develop training program", "Set up performance metrics", "Create sales culture", "Plan territory mapping"]',
  '["Sales Org Design Templates", "Hiring Framework & Tests", "Compensation Calculator", "30-60-90 Day Plans", "Training Module Library", "Performance Dashboard", "Territory Mapping Tool", "Sales Culture Playbook", "Career Path Framework", "Retention Strategies"]',
  480,
  800,
  64,
  NOW(),
  NOW()
);

-- Update P6 Product
UPDATE "Product"
SET 
  description = 'Transform into a revenue-generating machine with India''s most advanced sales mastery program. Master enterprise sales to Fortune 500, win government tenders with 70% success rate, deploy AI sales tools for 300% productivity, and build world-class sales teams. Includes playbooks that closed ₹100Cr+ deals, tender database worth ₹1000Cr+, and sales automation suite worth ₹5L+.',
  features = jsonb_set(features::jsonb, '{30}', '"Fortune 500 Sales Playbook"', true),
  features = jsonb_set(features::jsonb, '{31}', '"Government Tender Mastery"', true),
  features = jsonb_set(features::jsonb, '{32}', '"AI Sales Automation Stack"', true),
  features = jsonb_set(features::jsonb, '{33}', '"Sales Team Scaling Framework"', true)
WHERE code = 'P6';

-- =====================================================================================
-- P7: STATE SCHEMES - ENHANCED TO ₹3,00,000+ VALUE
-- =====================================================================================

-- Add State Government Relations
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p7_govt_relations',
  (SELECT id FROM "Product" WHERE code = 'P7'),
  'Government Relations & Lobbying Mastery',
  'Build relationships that unlock millions in benefits. Learn ethical lobbying, government partnership building, and policy influence. Includes exclusive access to bureaucrat networks and political advisors.',
  11,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p7_bureaucrat_network',
  'p7_govt_relations',
  31,
  '[EXCLUSIVE] Bureaucrat Network Access',
  'Get warm introductions to IAS officers, state startup nodal officers, and department secretaries across India. Learn protocol, meeting etiquette, and relationship building strategies. Includes mobile numbers, email IDs, and preferred communication methods. Network that unlocked ₹500Cr+ in benefits for members.',
  '["Map relevant bureaucrats", "Get warm introductions", "Schedule courtesy meetings", "Build relationship calendar", "Create value propositions", "Maintain regular contact", "Track benefit realization"]',
  '["Bureaucrat Database (2000+ contacts)", "Introduction Request System", "Meeting Protocol Guide", "Relationship CRM", "Communication Templates", "Gift Policy Compliance", "Event Invitation Tracker", "Benefit Realization Dashboard", "Success Story Archive", "Referral Network"]',
  360,
  700,
  1,
  NOW(),
  NOW()
),
(
  'p7_policy_influence',
  'p7_govt_relations',
  32,
  '[ADVANCED] Policy Influence Strategies',
  'Learn how to shape policies in your favor through ethical lobbying. Master the art of policy submissions, industry association leadership, and media advocacy. Case studies of startups that influenced GST rates, regulatory changes, and created new subsidy programs worth ₹1000Cr+.',
  '["Identify policy gaps", "Draft policy proposals", "Build industry coalition", "Engage policy makers", "Create media narrative", "Submit recommendations", "Track policy changes"]',
  '["Policy Proposal Templates", "Coalition Building Guide", "Media Advocacy Toolkit", "Lobbying Ethics Framework", "Policy Maker Database", "Industry Association Directory", "Media Contact List", "Policy Tracking System", "Success Measurement Tools", "Implementation Support"]',
  420,
  800,
  2,
  NOW(),
  NOW()
);

-- Add Multi-State Optimization
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p7_multistate_optimizer',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 1 LIMIT 1),
  33,
  '[OPTIMIZER] Multi-State Benefit Maximizer',
  'Advanced strategies to legally maximize benefits across multiple states. Learn subsidiary structuring, benefit stacking, and location optimization. Includes AI tool that calculates optimal state presence for maximum benefits. Case studies of startups that saved ₹10Cr+ through multi-state optimization.',
  '["Run state benefit analysis", "Model subsidiary structures", "Calculate tax savings", "Plan phased expansion", "Optimize benefit timing", "Ensure compliance", "Track realized savings"]',
  '["Multi-State Optimizer AI", "Subsidiary Structure Models", "Tax Saving Calculator", "Benefit Stacking Matrix", "Location Analysis Tool", "Compliance Checklist", "Expansion Timeline Planner", "Savings Tracker", "Legal Opinion Templates", "Case Study Database"]',
  480,
  900,
  33,
  NOW(),
  NOW()
),
(
  'p7_exclusive_schemes',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P7') AND "orderIndex" = 1 LIMIT 1),
  34,
  '[SECRET] Unadvertised Scheme Access',
  'Access schemes not publicly advertised worth ₹100Cr+. Learn about discretionary funds, CM relief funds, and special purpose vehicles. Includes insider information on upcoming schemes, pre-launch access, and direct application channels. Members received ₹5-50Cr through these exclusive schemes.',
  '["Access exclusive database", "Identify eligible schemes", "Build insider network", "Prepare applications early", "Get pre-approval", "Submit through special channel", "Maintain confidentiality"]',
  '["Exclusive Scheme Database", "Discretionary Fund Guide", "Insider Network Access", "Pre-Launch Information", "Special Channel Forms", "Confidentiality Agreements", "Success Rate Data", "Fund Utilization Templates", "Relationship Maps", "ROI Calculator"]',
  300,
  600,
  34,
  NOW(),
  NOW()
);

-- Update P7 Product
UPDATE "Product"
SET 
  description = 'Master India''s complex state ecosystem with exclusive access to 2000+ bureaucrats, unadvertised schemes worth ₹100Cr+, and multi-state optimization strategies. Learn ethical lobbying, policy influence, and benefit maximization across all 28 states and 8 UTs. Includes AI optimizer, government relations CRM, and insider networks that unlocked ₹500Cr+ for members.',
  features = jsonb_set(features::jsonb, '{34}', '"2000+ Bureaucrat Network"', true),
  features = jsonb_set(features::jsonb, '{35}', '"Exclusive Scheme Access"', true),
  features = jsonb_set(features::jsonb, '{36}', '"Multi-State Optimizer AI"', true),
  features = jsonb_set(features::jsonb, '{37}', '"Policy Influence Training"', true)
WHERE code = 'P7';

-- =====================================================================================
-- P8: DATA ROOM MASTERY - ENHANCED TO ₹5,00,000+ VALUE
-- =====================================================================================

-- Add Live DD Simulation
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p8_dd_simulation',
  (SELECT id FROM "Product" WHERE code = 'P8'),
  'Live Due Diligence Simulation',
  'Experience real due diligence with actual VCs and investment bankers. Get your data room stress-tested, identify gaps, and optimize for maximum valuation. Worth ₹10L in DD preparation costs.',
  9,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p8_vc_dd_simulation',
  'p8_dd_simulation',
  46,
  '[SIMULATION] Live VC Due Diligence',
  'Experience exactly what happens in VC due diligence. Real VC partners and associates conduct mock DD on your data room. Get 100+ questions VCs actually ask, identify red flags before real DD, and optimize documents for quick closes. Simulation participants closed funding 3X faster.',
  '["Prepare data room for simulation", "Submit for VC review", "Attend live DD session", "Answer VC questions", "Receive gap analysis", "Fix identified issues", "Get DD-ready certification"]',
  '["DD Simulation Portal", "100+ VC Question Bank", "Document Review Checklist", "Red Flag Identifier", "Gap Analysis Report", "Quick Fix Templates", "VC Feedback Dashboard", "DD Readiness Score", "Certification Process", "Post-Simulation Support"]',
  480,
  1000,
  1,
  NOW(),
  NOW()
),
(
  'p8_ma_dd_prep',
  'p8_dd_simulation',
  47,
  '[ADVANCED] M&A Due Diligence Preparation',
  'Prepare for acquisition DD which is 10X more intensive than VC DD. Learn from investment bankers who handled billion-dollar deals. Master financial quality of earnings, legal deep dives, and technical architecture reviews. Includes templates from Walmart-Flipkart DD process.',
  '["Study M&A DD framework", "Prepare QoE documents", "Organize legal archive", "Document tech architecture", "Create integration plans", "Build synergy models", "Simulate buyer DD"]',
  '["M&A DD Framework", "Quality of Earnings Kit", "Legal Archive Organizer", "Tech Documentation Guide", "Integration Playbook", "Synergy Calculator", "Buyer Question Database", "Deal Timeline Template", "Negotiation Levers", "Post-DD Strategy"]',
  420,
  800,
  2,
  NOW(),
  NOW()
);

-- Add Valuation Optimization
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p8_valuation_hacks',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 1 LIMIT 1),
  48,
  '[SECRET] Valuation Enhancement Strategies',
  'Learn 50 legal ways to increase your valuation by 2-5X. Master financial engineering, strategic metrics presentation, and competitive positioning. Includes tactics that added ₹100Cr+ to startup valuations. Used by unicorns before funding rounds.',
  '["Audit current metrics", "Identify enhancement opportunities", "Restructure financials", "Optimize unit economics", "Create growth narrative", "Build competitive moats", "Calculate valuation impact"]',
  '["50 Valuation Hacks Guide", "Financial Engineering Toolkit", "Metrics Optimization Framework", "Growth Narrative Builder", "Competitive Analysis Tools", "Moat Documentation Kit", "Valuation Calculator Pro", "Investor Psychology Guide", "Benchmark Database", "Success Stories"]',
  360,
  700,
  48,
  NOW(),
  NOW()
),
(
  'p8_automated_dataroom',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P8') AND "orderIndex" = 1 LIMIT 1),
  49,
  '[TECH] AI-Powered Data Room Automation',
  'Deploy advanced data room technology used by unicorns. Includes AI document organization, automated updates, intelligent Q&A, and engagement analytics. Track which investors spend most time on which documents. System that helped close deals 60% faster.',
  '["Deploy automated data room", "Configure AI categorization", "Set up auto-updates", "Enable engagement tracking", "Create investor personas", "Optimize based on analytics", "Integrate with CRM"]',
  '["AI Data Room Platform", "Document Categorization AI", "Auto-Update Workflows", "Engagement Analytics Dashboard", "Investor Behavior Tracker", "Q&A Automation Bot", "CRM Integration APIs", "Security Audit Tools", "Performance Optimizer", "ROI Calculator"]',
  300,
  600,
  49,
  NOW(),
  NOW()
);

-- Update P8 Product
UPDATE "Product"
SET 
  description = 'Master the art of due diligence and secure higher valuations with India''s most comprehensive data room program. Features live DD simulations with real VCs, valuation enhancement strategies that add ₹100Cr+, M&A preparation frameworks, and AI-powered automation. Close deals 60% faster and increase valuations by 2-5X. Includes templates from billion-dollar deals and direct access to investment bankers.',
  features = jsonb_set(features::jsonb, '{38}', '"Live VC DD Simulation"', true),
  features = jsonb_set(features::jsonb, '{39}', '"Valuation Enhancement Hacks"', true),
  features = jsonb_set(features::jsonb, '{40}', '"M&A DD Preparation"', true),
  features = jsonb_set(features::jsonb, '{41}', '"AI Data Room Automation"', true)
WHERE code = 'P8';

-- =====================================================================================
-- CROSS-COURSE SYNERGIES FOR P5-P8
-- =====================================================================================

-- Add Integration Bonus
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
  p.code || '_integration_bonus',
  (SELECT m.id FROM "Module" m WHERE m."productId" = p.id ORDER BY m."orderIndex" DESC LIMIT 1),
  CASE p.code
    WHEN 'P5' THEN 50
    WHEN 'P6' THEN 65
    WHEN 'P7' THEN 35
    WHEN 'P8' THEN 50
  END,
  '[SYNERGY] ' || p.code || ' Integration Mastery',
  'Master how ' || p.title || ' integrates with other business functions. Learn cross-functional optimization, synergy creation, and holistic business building. This integration knowledge is what separates good startups from great ones.',
  '["Map integration points", "Identify synergies", "Create optimization plan", "Build cross-functional team", "Implement integrations", "Measure impact", "Share learnings"]',
  '["Integration Mapping Tool", "Synergy Calculator", "Cross-Functional Playbook", "Team Alignment Framework", "Implementation Roadmap", "Impact Measurement Dashboard", "Best Practices Library", "Case Study Collection", "Expert Network Access", "Optimization Guide"]',
  240,
  500,
  99,
  NOW(),
  NOW()
FROM "Product" p
WHERE p.code IN ('P5', 'P6', 'P7', 'P8');

-- Update XP rewards for premium content
UPDATE "Lesson"
SET "xpReward" = GREATEST("xpReward" * 1.5, 500)
WHERE id LIKE 'p5_%' OR id LIKE 'p6_%' OR id LIKE 'p7_%' OR id LIKE 'p8_%'
AND (title LIKE '%[LIVE]%' OR title LIKE '%[SECRET]%' OR title LIKE '%[SIMULATION]%');

-- =====================================================================================
-- ENHANCEMENT SUMMARY FOR P5-P8:
-- P5: Added weekly legal clinics, 24/7 emergency support, international legal framework
-- P6: Added enterprise sales playbook, government tender mastery, AI sales stack
-- P7: Added bureaucrat network access, policy influence training, exclusive schemes
-- P8: Added live DD simulation, valuation hacks, AI-powered data room
-- Total Additional Value: ₹12,50,000+ across four courses
-- =====================================================================================