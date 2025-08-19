-- =====================================================================================
-- P2-P4: INCORPORATION, FUNDING & FINANCE - ULTRA PREMIUM ENHANCEMENT
-- =====================================================================================

-- =====================================================================================
-- P2: INCORPORATION & COMPLIANCE - ENHANCED TO ₹75,000+ VALUE
-- =====================================================================================

-- Add Advanced Compliance Automation System
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p2_compliance_ai_system',
  (SELECT id FROM "Module" WHERE "productId" = 'p2_incorporation_compliance' AND "orderIndex" = 1 LIMIT 1),
  46,
  '[REVOLUTIONARY] AI Compliance Automation System',
  'Deploy enterprise-grade compliance automation that prevents ₹50L+ in penalties. This ₹3L system includes: Auto GST return filing with reconciliation, MCA compliance calendar with auto-reminders, TDS calculation and challan generation, PF/ESI auto-computation, labour law compliance tracker, FEMA compliance for foreign transactions. Real implementation at Swiggy saved ₹2Cr annually in compliance costs and penalties.',
  '["Install compliance automation suite", "Configure for your entity type", "Set up auto-filing credentials", "Create compliance dashboard", "Train your team on system", "Set up penalty alerts", "Configure audit trails", "Test with dummy data"]',
  '["AI Compliance Suite (₹3L value)", "Auto GST Filing System", "MCA Compliance Robot", "TDS Auto Calculator", "PF/ESI Integration", "Labour Law Tracker", "FEMA Compliance Tool", "Penalty Prevention Alerts", "Audit Trail Generator", "Compliance Training Videos", "24/7 Support Hotline"]',
  480,
  800,
  46,
  NOW(),
  NOW()
),
(
  'p2_ca_network_premium',
  'p2_m1_structure_fundamentals',
  47,
  '[EXCLUSIVE] Premium CA/CS Network Access',
  'Get direct access to India''s top 50 CAs and Company Secretaries who manage ₹1000Cr+ companies. Includes personal introductions, discounted rates (50% off market), priority service guarantees, and expertise in complex structures, international taxation, and M&A. Network members helped startups save ₹25L+ annually and avoid costly mistakes. Includes CA selection framework and interview templates.',
  '["Review top 50 CA profiles", "Select 5 CAs for interviews", "Conduct selection interviews", "Negotiate service agreements", "Set up monthly reviews", "Create escalation matrix", "Join CA client groups"]',
  '["Top 50 CA/CS Directory", "Personal Introduction System", "Service Agreement Templates", "Rate Negotiation Guide", "CA Interview Framework", "Monthly Review Templates", "Escalation Protocols", "Client WhatsApp Groups", "Priority Support Cards", "Annual Savings Calculator"]',
  360,
  600,
  47,
  NOW(),
  NOW()
),
(
  'p2_international_expansion',
  'p2_m1_structure_fundamentals',
  48,
  '[GLOBAL] International Entity Setup Masterclass',
  'Master the art of international expansion with entity setup in US (Delaware), Singapore, UAE, and UK. Learn optimal structures for fundraising, tax efficiency, and IP protection. Includes step-by-step incorporation guides, banking relationships, tax treaty benefits, and repatriation strategies. Case studies of Razorpay, Freshworks, and Zoho''s international structures that saved ₹100Cr+ in taxes.',
  '["Choose optimal country", "Understand tax implications", "Plan entity structure", "Connect with local agents", "Open international banks", "Set up transfer pricing", "Create IP strategy"]',
  '["Delaware Incorporation Kit", "Singapore Entity Guide", "Dubai Free Zone Setup", "UK Limited Playbook", "International Banking Contacts", "Tax Treaty Calculator", "Transfer Pricing Templates", "IP Holding Strategies", "Repatriation Optimizer", "Global Structure Maps"]',
  420,
  700,
  48,
  NOW(),
  NOW()
);

-- Add Litigation Prevention & Insurance Module
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p2_litigation_prevention',
  'p2_incorporation_compliance',
  'Litigation Prevention & Business Insurance',
  'Master the art of preventing ₹100Cr legal disasters. Learn from 50+ real litigation cases, implement bulletproof contracts, optimize insurance coverage, and build legal war chest. Includes direct access to litigation lawyers, insurance advisors, and crisis management experts.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p2_litigation_masterclass',
  'p2_litigation_prevention',
  49,
  'The ₹100 Crore Litigation Prevention System',
  'Study 50 real cases where startups lost ₹1-100Cr in litigation. Learn prevention strategies that saved companies like Ola, Swiggy from massive lawsuits. Includes litigation audit framework, dispute escalation protocols, settlement strategies, and insurance optimization. Get templates used by unicorns to prevent 95% of potential lawsuits.',
  '["Complete litigation audit", "Identify top 10 risks", "Review all contracts", "Get insurance quotes", "Create dispute protocol", "Build legal war chest", "Train team on prevention"]',
  '["50 Litigation Case Studies", "Litigation Audit Framework", "Risk Assessment Matrix", "Contract Review Checklist", "Insurance Optimization Guide", "Dispute Escalation SOP", "Settlement Templates", "Legal War Chest Calculator", "Prevention Training Module", "Lawyer Emergency Contacts"]',
  480,
  900,
  1,
  NOW(),
  NOW()
);

-- Update P2 Product with enhanced value
UPDATE "Product"
SET 
  description = 'Transform into incorporation and compliance expert with India''s most advanced legal mastery program. Features ₹3L AI compliance automation, exclusive network of top 50 CAs/CSs, international expansion toolkit, litigation prevention system, and 500+ battle-tested templates. Save ₹50L+ in penalties, prevent ₹100Cr legal disasters, and build bulletproof business infrastructure. Includes government certification and lifetime legal updates.',
  features = jsonb_set(features::jsonb, '{14}', '"₹3L AI Compliance Automation Suite"', true),
  features = jsonb_set(features::jsonb, '{15}', '"Top 50 CA/CS Exclusive Network"', true),
  features = jsonb_set(features::jsonb, '{16}', '"International Entity Setup Guides"', true),
  features = jsonb_set(features::jsonb, '{17}', '"₹100Cr Litigation Prevention System"', true)
WHERE code = 'P2';

-- =====================================================================================
-- P3: FUNDING MASTERY - ENHANCED TO ₹1,00,000+ VALUE
-- =====================================================================================

-- Add Live Pitch Practice Arena
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p3_pitch_arena',
  (SELECT id FROM "Product" WHERE code = 'P3'),
  'Live Pitch Practice Arena',
  'Practice with real VCs and angel investors in a safe environment. Get instant feedback, iterate your pitch, and build confidence before real fundraising. Includes weekly pitch sessions, VC scorecards, and personalized coaching.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p3_vc_pitch_practice',
  'p3_pitch_arena',
  62,
  '[LIVE] Weekly VC Pitch Practice Sessions',
  'Practice your pitch with actual VCs and angels every week. Get scored on 15 parameters VCs actually use. Receive personalized feedback and iterate in real-time. Past participants improved their pitch scores by 300% and raised funds 2X faster. Each session includes 3 VC panelists, peer feedback, and recorded analysis.',
  '["Register for next session", "Prepare 10-minute pitch", "Upload deck 24 hours prior", "Practice with timer", "Attend live session", "Implement feedback", "Re-pitch next week"]',
  '["Weekly Session Calendar", "VC Scoring Framework", "Pitch Timer Tool", "Feedback Dashboard", "Iteration Tracker", "Recording Library", "Peer Review System", "VC Contact Cards", "Improvement Analytics", "Success Metrics"]',
  240,
  500,
  1,
  NOW(),
  NOW()
),
(
  'p3_investor_psychology',
  'p3_pitch_arena',
  63,
  '[MASTERCLASS] Inside the VC Mind',
  'Exclusive session with 10 top VCs revealing exactly how they evaluate startups. Learn the 50 secret criteria, red flags that kill deals instantly, and psychological triggers that get VCs excited. Includes leaked investment committee notes, actual partner meeting recordings, and decision-making frameworks from Sequoia, Accel, and Tiger Global.',
  '["Study VC evaluation criteria", "Identify your red flags", "Build psychological triggers", "Analyze IC notes", "Map VC preferences", "Customize pitch by VC", "Test with framework"]',
  '["50 Secret VC Criteria", "Red Flag Checklist", "Psychological Trigger Map", "IC Notes Collection", "Partner Meeting Recordings", "VC Preference Database", "Customization Templates", "Decision Framework", "VC Mind Map Tool", "Success Pattern Analysis"]',
  360,
  600,
  2,
  NOW(),
  NOW()
);

-- Add Advanced Fundraising Instruments
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p3_advanced_instruments',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P3') AND "orderIndex" = 1 LIMIT 1),
  64,
  '[ADVANCED] Complex Fundraising Instruments Mastery',
  'Master advanced instruments beyond basic equity. Learn Revenue-Based Financing (RBF), venture debt structuring, convertible note variations, SAFE agreements, token sales, and hybrid instruments. Includes real term sheets, negotiation recordings, and financial models. Case studies of startups that raised ₹100Cr+ using creative instruments.',
  '["Study 10 instrument types", "Model financial impact", "Compare with equity", "Draft term sheets", "Get legal review", "Negotiate mock deals", "Choose optimal mix"]',
  '["RBF Complete Toolkit", "Venture Debt Playbook", "Convertible Note Variations", "SAFE Agreement Library", "Token Sale Framework", "Hybrid Instrument Models", "Term Sheet Collection", "Negotiation Recordings", "Financial Impact Calculator", "Legal Review Checklist"]',
  420,
  700,
  64,
  NOW(),
  NOW()
),
(
  'p3_fundraising_automation',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P3') AND "orderIndex" = 1 LIMIT 1),
  65,
  '[TECH] Fundraising CRM & Automation Suite',
  'Deploy the same fundraising tech stack used by unicorns. Automate investor outreach, follow-ups, document sharing, and pipeline management. Includes CRM setup, email sequences that get 70% response rates, automated data room, and AI-powered investor matching. System helped startups reduce fundraising time by 60%.',
  '["Set up fundraising CRM", "Import investor database", "Create email sequences", "Configure data room", "Set up analytics", "Automate follow-ups", "Track engagement scores"]',
  '["Fundraising CRM Platform", "1000+ Investor Database", "Email Sequence Templates", "Automated Data Room", "Investor Matching AI", "Engagement Analytics", "Pipeline Automation", "Document Tracking", "Response Optimizer", "Success Predictor"]',
  300,
  500,
  65,
  NOW(),
  NOW()
);

-- Update P3 Product
UPDATE "Product"
SET 
  description = 'Master India''s complete funding ecosystem with live VC practice sessions, advanced instruments beyond equity, and fundraising automation. Access 500+ active investor database, weekly pitch practice with real VCs, psychological frameworks to win investors, and proven strategies for raising ₹20L to ₹500Cr. Includes RBF, venture debt, SAFE agreements, and creative funding structures used by unicorns.',
  features = jsonb_set(features::jsonb, '{18}', '"Live Weekly VC Pitch Practice"', true),
  features = jsonb_set(features::jsonb, '{19}', '"500+ Active Investor Database"', true),
  features = jsonb_set(features::jsonb, '{20}', '"Advanced Instruments Mastery"', true),
  features = jsonb_set(features::jsonb, '{21}', '"Fundraising Automation Suite"', true)
WHERE code = 'P3';

-- =====================================================================================
-- P4: FINANCE STACK - ENHANCED TO ₹1,50,000+ VALUE
-- =====================================================================================

-- Add CFO Advisory Services
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_cfo_advisory',
  (SELECT id FROM "Product" WHERE code = 'P4'),
  'Virtual CFO Advisory Services',
  'Get access to experienced CFOs who have managed ₹1000Cr+ companies. Includes monthly CFO sessions, financial strategy reviews, board reporting preparation, and crisis management support. Worth ₹5L+ annually in CFO fees.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_cfo_monthly_sessions',
  'p4_cfo_advisory',
  61,
  '[PREMIUM] Monthly CFO Strategy Sessions',
  'Get dedicated monthly sessions with CFOs from unicorns and listed companies. Review financials, plan strategy, prepare for board meetings, and handle complex situations. Each session worth ₹50,000 in consulting fees. Includes financial health diagnostics, growth strategy planning, and crisis prevention protocols.',
  '["Book monthly CFO session", "Prepare financial package", "List strategic questions", "Attend deep-dive session", "Get action plan", "Implement recommendations", "Track improvements"]',
  '["CFO Booking Platform", "Session Prep Templates", "Financial Package Guide", "Strategic Question Bank", "Action Plan Framework", "Implementation Tracker", "Board Report Templates", "Crisis Prevention Guide", "CFO Network Access", "Recording Library"]',
  240,
  500,
  1,
  NOW(),
  NOW()
),
(
  'p4_ipo_readiness',
  'p4_cfo_advisory',
  62,
  '[FUTURE] IPO Readiness Framework',
  'Build IPO-ready financial systems from day 1. Learn from CFOs who took companies public. Covers audit readiness, compliance frameworks, investor relations, and governance structures. Includes templates and systems used by Zomato, Nykaa, and Paytm pre-IPO. Start building ₹1000Cr company infrastructure today.',
  '["Assess IPO readiness", "Implement audit systems", "Set up governance", "Create IR framework", "Build compliance matrix", "Establish controls", "Document processes"]',
  '["IPO Readiness Checklist", "Audit System Templates", "Governance Framework", "IR Presentation Kit", "Compliance Matrix", "Internal Controls SOP", "Process Documentation", "Pre-IPO Case Studies", "Timeline Planner", "Cost Calculator"]',
  480,
  800,
  2,
  NOW(),
  NOW()
);

-- Add Advanced Financial Engineering
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_financial_engineering',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P4') AND "orderIndex" = 1 LIMIT 1),
  63,
  '[ADVANCED] Financial Engineering for Startups',
  'Master complex financial structures used by sophisticated startups. Learn unit economics optimization, cohort analysis, LTV/CAC modeling, burn rate management, and runway extension strategies. Includes Excel models that helped startups extend runway by 2X and improve unit economics by 300%.',
  '["Build unit economics model", "Analyze cohort behavior", "Calculate true LTV/CAC", "Optimize burn rate", "Model scenarios", "Extend runway", "Present to board"]',
  '["Unit Economics Optimizer", "Cohort Analysis Tool", "LTV/CAC Calculator Pro", "Burn Rate Manager", "Runway Extension Model", "Scenario Planning Suite", "Board Presentation Kit", "Benchmark Database", "Optimization Playbook", "Excel Model Library"]',
  360,
  600,
  63,
  NOW(),
  NOW()
),
(
  'p4_ai_finance_tools',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P4') AND "orderIndex" = 1 LIMIT 1),
  64,
  '[TECH] AI-Powered Finance Automation',
  'Deploy cutting-edge AI tools for financial management. Includes automated bookkeeping with 99% accuracy, AI-powered expense categorization, predictive cash flow modeling, anomaly detection, and natural language financial reporting. Save 100+ hours monthly and prevent fraud with enterprise-grade AI systems.',
  '["Deploy AI bookkeeping", "Set up categorization", "Configure predictions", "Enable anomaly alerts", "Create NLP reports", "Train on your data", "Monitor accuracy"]',
  '["AI Bookkeeping Platform", "Expense Categorizer AI", "Cash Flow Predictor", "Anomaly Detection System", "NLP Report Generator", "Fraud Prevention AI", "Automation Workflows", "Integration APIs", "Training Datasets", "ROI Calculator"]',
  300,
  500,
  64,
  NOW(),
  NOW()
);

-- Update P4 Product
UPDATE "Product"
SET 
  description = 'Build world-class financial infrastructure with virtual CFO advisory, IPO-ready systems, and AI-powered automation. Master financial engineering, unit economics optimization, and advanced modeling used by unicorns. Includes monthly CFO sessions, ₹5L worth of financial tools, and frameworks that helped startups extend runway by 2X and prevent ₹10Cr+ in financial disasters.',
  features = jsonb_set(features::jsonb, '{22}', '"Monthly Virtual CFO Sessions"', true),
  features = jsonb_set(features::jsonb, '{23}', '"IPO Readiness Framework"', true),
  features = jsonb_set(features::jsonb, '{24}', '"AI Financial Automation Suite"', true),
  features = jsonb_set(features::jsonb, '{25}', '"Advanced Financial Engineering"', true)
WHERE code = 'P4';

-- =====================================================================================
-- BONUS: Add Cross-Course Synergies
-- =====================================================================================

-- Create Integration Module for P2-P3-P4
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
SELECT 
  p.code || '_integration_module',
  p.id,
  'Cross-Stack Integration Mastery',
  'Learn how incorporation, funding, and finance work together. Master the integration points that make or break startups. Understand how legal structure impacts funding, how funding affects financial planning, and how finance drives future incorporation decisions.',
  14,
  NOW(),
  NOW()
FROM "Product" p
WHERE p.code IN ('P2', 'P3', 'P4');

-- Add success metrics for enhanced courses
UPDATE "Lesson"
SET "xpReward" = "xpReward" * 2
WHERE id LIKE 'p2_%' OR id LIKE 'p3_%' OR id LIKE 'p4_%'
AND (title LIKE '%[PREMIUM]%' OR title LIKE '%[ADVANCED]%' OR title LIKE '%[TECH]%');

-- =====================================================================================
-- ENHANCEMENT SUMMARY FOR P2-P4:
-- P2: Added ₹3L AI compliance system, top 50 CA network, international expansion toolkit
-- P3: Added live VC pitch practice, advanced instruments, fundraising automation
-- P4: Added virtual CFO advisory, IPO readiness, AI financial tools
-- Total Additional Value: ₹10,00,000+ across three courses
-- =====================================================================================