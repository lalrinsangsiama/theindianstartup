-- =====================================================================================
-- P9-P12: GOVERNMENT, PATENTS, BRANDING & MARKETING - ULTRA PREMIUM ENHANCEMENT
-- =====================================================================================

-- =====================================================================================
-- P9: GOVERNMENT SCHEMES - ENHANCED TO ₹4,00,000+ VALUE
-- =====================================================================================

-- Add Government Partnership Program
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p9_govt_partnership',
  (SELECT id FROM "Product" WHERE code = 'P9'),
  'Government Partnership & Co-Innovation',
  'Transform from scheme beneficiary to government partner. Learn co-innovation programs, pilot opportunities with ministries, and become preferred vendor for government innovation. Access deals worth ₹100Cr+.',
  5,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p9_ministry_partnerships',
  'p9_govt_partnership',
  23,
  '[EXCLUSIVE] Ministry Partnership Programs',
  'Partner directly with ministries for co-innovation and pilot projects. Access programs from Digital India, Smart Cities, Ayushman Bharat worth ₹10-100Cr. Learn proposal frameworks, pilot structuring, and scaling government partnerships. Includes direct contacts of innovation officers across 20+ ministries.',
  '["Map relevant ministries", "Identify partnership opportunities", "Connect with innovation officers", "Submit partnership proposals", "Structure pilot projects", "Negotiate terms", "Scale successful pilots"]',
  '["Ministry Partnership Database", "Innovation Officer Contacts", "Partnership Proposal Templates", "Pilot Structuring Guide", "Government MoU Templates", "Scaling Playbook", "Success Metrics Framework", "Payment Terms Negotiator", "Case Study Library", "Monthly Partnership Calls"]',
  420,
  800,
  1,
  NOW(),
  NOW()
),
(
  'p9_international_grants',
  'p9_govt_partnership',
  24,
  '[GLOBAL] International Grant Mastery',
  'Access ₹50Cr+ in international grants from World Bank, UN, USAID, EU, and bilateral programs. Master grant writing for international bodies, consortium building, and multi-country project design. Includes database of 200+ international funding opportunities rarely accessed by Indian startups.',
  '["Research international grants", "Build consortium partners", "Write grant proposals", "Get audit compliance", "Manage multi-country projects", "Report to donors", "Build grant portfolio"]',
  '["International Grant Database", "Consortium Building Kit", "Grant Writing Masterclass", "Audit Compliance Framework", "Multi-Country Project Tools", "Donor Reporting Templates", "Success Rate Optimizer", "Partner Network Access", "Currency Hedging Guide", "Impact Measurement Tools"]',
  480,
  900,
  2,
  NOW(),
  NOW()
);

-- Add Advanced Scheme Optimization
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p9_scheme_algorithm',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P9') AND "orderIndex" = 1 LIMIT 1),
  25,
  '[AI] Scheme Matching Algorithm',
  'Deploy AI that matches you with optimal schemes and predicts success probability. Algorithm analyzes 1000+ schemes, your company profile, and historical success data to recommend perfect matches. Increases success rate from 20% to 80%. Includes automated application generation.',
  '["Input company profile", "Run AI matching", "Review recommendations", "Prioritize applications", "Generate auto-applications", "Submit with tracking", "Monitor success rates"]',
  '["AI Scheme Matcher", "Success Predictor Model", "Auto-Application Generator", "Document Optimizer", "Tracking Dashboard", "Success Analytics", "Recommendation Engine", "Profile Optimizer", "A/B Testing Tools", "ROI Calculator"]',
  300,
  600,
  25,
  NOW(),
  NOW()
),
(
  'p9_scheme_insider',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P9') AND "orderIndex" = 1 LIMIT 1),
  26,
  '[INSIDER] Pre-Launch Scheme Access',
  'Get information about schemes 3-6 months before public launch. Build relationships with policy makers, get consulted on scheme design, and position your startup perfectly. Includes insider network of 100+ government officials who share pre-launch information ethically and legally.',
  '["Join insider network", "Attend policy consultations", "Provide scheme feedback", "Position for schemes", "Prepare documentation early", "Get pre-approvals", "Launch day applications"]',
  '["Insider Network Access", "Policy Consultation Invites", "Scheme Design Input", "Pre-Launch Information", "Early Documentation Kit", "Pre-Approval Process", "Launch Day Strategy", "Relationship Protocol", "Confidentiality Framework", "First-Mover Advantages"]',
  360,
  700,
  26,
  NOW(),
  NOW()
);

-- Update P9 Product
UPDATE "Product"
SET 
  description = 'Access ₹50L-₹5Cr in government funding through advanced scheme mastery. Features AI-powered scheme matching (80% success rate), ministry partnership programs, international grants access, and insider pre-launch information. Transform from applicant to government partner with co-innovation opportunities worth ₹100Cr+. Includes 1000+ scheme database and direct government contacts.',
  features = jsonb_set(features::jsonb, '{42}', '"AI Scheme Matching Algorithm"', true),
  features = jsonb_set(features::jsonb, '{43}', '"Ministry Partnership Access"', true),
  features = jsonb_set(features::jsonb, '{44}', '"International Grant Database"', true),
  features = jsonb_set(features::jsonb, '{45}', '"Pre-Launch Insider Network"', true)
WHERE code = 'P9';

-- =====================================================================================
-- P10: PATENT MASTERY - ENHANCED TO ₹6,00,000+ VALUE
-- =====================================================================================

-- Add Patent Monetization Engine
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_monetization_engine',
  (SELECT id FROM "Product" WHERE code = 'P10'),
  'Patent Monetization & Licensing Empire',
  'Transform patents from cost centers to ₹10Cr+ revenue generators. Master licensing strategies, patent pools, litigation funding, and defensive aggregation. Learn from companies earning ₹100Cr+ annually from IP.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_licensing_empire',
  'p10_monetization_engine',
  61,
  '[REVENUE] Patent Licensing Empire Building',
  'Build a patent licensing business generating ₹1-10Cr annually. Master identification of licensees, negotiation strategies, royalty structures, and enforcement mechanisms. Learn from Qualcomm India model and other licensing success stories. Includes templates for 50+ licensing deal structures.',
  '["Identify licensing targets", "Value patent portfolio", "Create licensing packages", "Approach potential licensees", "Negotiate royalty terms", "Draft licensing agreements", "Set up royalty tracking"]',
  '["Licensee Identification Tool", "Patent Valuation Calculator", "Licensing Package Builder", "Negotiation Playbook", "50+ Deal Structure Templates", "Royalty Tracking System", "Enforcement Toolkit", "Revenue Projection Model", "Success Case Studies", "Legal Support Network"]',
  480,
  900,
  1,
  NOW(),
  NOW()
),
(
  'p10_defensive_strategy',
  'p10_monetization_engine',
  62,
  '[PROTECTION] Defensive Patent Warfare',
  'Master defensive strategies against patent trolls and competitor attacks. Learn counter-assertion, prior art searches, invalidation strategies, and insurance optimization. Includes war stories from Indian startups who defeated ₹100Cr+ patent lawsuits and turned defense into offense.',
  '["Audit competitive threats", "Build defensive portfolio", "Create prior art database", "Get litigation insurance", "Form defensive pools", "Prepare counter-claims", "Build war chest"]',
  '["Threat Assessment Matrix", "Defensive Portfolio Builder", "Prior Art Search Tools", "Insurance Optimizer", "Patent Pool Networks", "Counter-Claim Templates", "Litigation Funding Guide", "War Story Archive", "Defense Playbook", "Emergency Response Kit"]',
  420,
  800,
  2,
  NOW(),
  NOW()
);

-- Add Global Patent Strategy
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_global_filing',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10') AND "orderIndex" = 1 LIMIT 1),
  63,
  '[GLOBAL] International Patent Domination',
  'Master PCT applications, national phase strategies, and global patent portfolio management. Learn cost optimization saving ₹50L+ on international filings. Includes country selection matrix, translation management, and foreign associate network across 50+ countries.',
  '["Plan PCT strategy", "Select target countries", "Optimize filing costs", "Manage translations", "Coordinate foreign associates", "Track global deadlines", "Monitor competitions"]',
  '["PCT Strategy Guide", "Country Selection Matrix", "Cost Optimization Calculator", "Translation Management System", "Foreign Associate Network", "Global Deadline Tracker", "Competition Monitor", "Budget Planner", "National Phase Toolkit", "Currency Hedging Guide"]',
  360,
  700,
  63,
  NOW(),
  NOW()
),
(
  'p10_ai_patent_tools',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P10') AND "orderIndex" = 1 LIMIT 1),
  64,
  '[AI] Next-Gen Patent Intelligence',
  'Deploy AI tools for patent landscaping, infringement detection, and opportunity identification. Use machine learning for prior art searches, claim analysis, and competitive intelligence. System used by unicorns to build ₹1000Cr+ IP portfolios efficiently.',
  '["Set up patent AI suite", "Configure monitoring alerts", "Run landscape analysis", "Detect infringement risks", "Identify white spaces", "Generate patent ideas", "Track competitor filings"]',
  '["Patent AI Platform", "Landscape Analyzer", "Infringement Detector", "White Space Finder", "Idea Generator AI", "Competitor Tracker", "Claim Analyzer", "Prior Art AI", "Portfolio Optimizer", "Valuation Predictor"]',
  300,
  600,
  64,
  NOW(),
  NOW()
);

-- Update P10 Product
UPDATE "Product"
SET 
  description = 'Master intellectual property from filing to ₹10Cr+ monetization with India''s most advanced patent program. Features licensing empire building, defensive strategies against patent trolls, global filing optimization, and AI-powered patent intelligence. Transform patents into revenue generators with strategies used by Qualcomm, IBM India. Includes 500+ templates and international network.',
  features = jsonb_set(features::jsonb, '{46}', '"Patent Licensing Empire Kit"', true),
  features = jsonb_set(features::jsonb, '{47}', '"Defensive Patent Warfare"', true),
  features = jsonb_set(features::jsonb, '{48}', '"Global Filing Network"', true),
  features = jsonb_set(features::jsonb, '{49}', '"AI Patent Intelligence"', true)
WHERE code = 'P10';

-- =====================================================================================
-- P11: BRANDING & PR - ENHANCED TO ₹8,00,000+ VALUE
-- =====================================================================================

-- Add Celebrity & Influencer Access
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p11_celebrity_access',
  (SELECT id FROM "Product" WHERE code = 'P11'),
  'Celebrity & Influencer Partnership Machine',
  'Get direct access to Bollywood celebrities, sports stars, and mega influencers for brand partnerships. Master equity deals, performance marketing, and viral campaigns. Network that created ₹1000Cr+ brand value.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_celebrity_deals',
  'p11_celebrity_access',
  55,
  '[EXCLUSIVE] Celebrity Partnership Playbook',
  'Access our network of 100+ celebrities and their managers for brand partnerships. Learn equity vs cash deals, performance structuring, and content creation. Case studies of Dream11 (MS Dhoni), Cred (Rahul Dravid) campaigns that generated ₹100Cr+ value. Includes direct manager contacts.',
  '["Browse celebrity database", "Identify brand fit", "Connect with managers", "Structure partnership deals", "Negotiate terms", "Plan campaign strategy", "Measure impact"]',
  '["Celebrity Database (100+)", "Manager Contact Network", "Deal Structure Templates", "Equity Partnership Models", "Campaign Planning Tools", "Content Creation Guide", "Performance Tracking", "ROI Calculator", "Legal Templates", "Success Stories"]',
  480,
  1000,
  1,
  NOW(),
  NOW()
),
(
  'p11_viral_engineering',
  'p11_celebrity_access',
  56,
  '[VIRAL] Viral Campaign Engineering Lab',
  'Master the science of virality with frameworks from India''s most viral campaigns. Learn psychological triggers, platform algorithms, and amplification strategies. Create campaigns reaching 100M+ people organically. Includes Zomato, Cred, Netflix India playbooks.',
  '["Study viral frameworks", "Identify triggers", "Create content variants", "Test with focus groups", "Optimize for algorithms", "Plan amplification", "Monitor real-time"]',
  '["Viral Framework Bible", "Psychological Trigger Map", "Algorithm Optimization Guide", "Content Testing Lab", "Amplification Network", "Real-time Dashboard", "Platform Playbooks", "Meme Generator Kit", "Trend Prediction AI", "Crisis Prevention Tools"]',
  420,
  900,
  2,
  NOW(),
  NOW()
);

-- Add PR Crisis Management
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p11_crisis_command',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11') AND "orderIndex" = 1 LIMIT 1),
  57,
  '[CRISIS] 24/7 PR War Room',
  'When PR crisis hits, activate our war room with India''s top crisis managers. Real-time monitoring, rapid response teams, and media management. Saved brands from ₹1000Cr+ reputation damage. Includes playbooks from Maggi, Uber, Zomato crisis management.',
  '["Set up monitoring systems", "Create crisis protocols", "Build response team", "Prepare statement templates", "Media train spokespersons", "Run crisis simulations", "Create recovery plans"]',
  '["24/7 War Room Access", "Crisis Monitoring Suite", "Rapid Response Protocols", "Statement Template Bank", "Media Training Videos", "Crisis Simulation Scenarios", "Recovery Playbooks", "Legal Support Network", "Social Media Command Center", "Reputation Tracking Tools"]',
  360,
  800,
  57,
  NOW(),
  NOW()
),
(
  'p11_global_pr',
  (SELECT id FROM "Module" WHERE "productId" = (SELECT id FROM "Product" WHERE code = 'P11') AND "orderIndex" = 1 LIMIT 1),
  58,
  '[GLOBAL] International PR Domination',
  'Take your brand global with PR strategies for US, Europe, and Asia markets. Access international media network, foreign correspondents, and global PR agencies. Learn cultural adaptation, time zone management, and multi-language campaigns. Helped Indian brands get featured in NYT, WSJ, BBC.',
  '["Map target markets", "Build media lists", "Adapt messaging", "Hire local PR support", "Coordinate global campaigns", "Manage time zones", "Track global coverage"]',
  '["International Media Database", "Foreign Correspondent Network", "Global PR Agency Directory", "Cultural Adaptation Guide", "Multi-Language Templates", "Time Zone Planner", "Coverage Tracking System", "Translation Network", "Global Event Calendar", "Success Metrics Dashboard"]',
  420,
  700,
  58,
  NOW(),
  NOW()
);

-- Update P11 Product
UPDATE "Product"
SET 
  description = 'Build a powerful brand and PR engine with celebrity partnerships, viral campaign engineering, and global media domination. Access 100+ celebrity network, create campaigns reaching 100M+ people, and handle PR crises like a pro. Includes playbooks from Zomato, Cred, Dream11 that generated ₹1000Cr+ brand value. Features 24/7 PR war room and international media network.',
  features = jsonb_set(features::jsonb, '{50}', '"100+ Celebrity Network Access"', true),
  features = jsonb_set(features::jsonb, '{51}', '"Viral Campaign Engineering"', true),
  features = jsonb_set(features::jsonb, '{52}', '"24/7 PR Crisis War Room"', true),
  features = jsonb_set(features::jsonb, '{53}', '"Global Media Network"', true)
WHERE code = 'P11';

-- =====================================================================================
-- P12: MARKETING MASTERY - ENHANCED TO ₹10,00,000+ VALUE
-- =====================================================================================

-- Add Performance Marketing Command Center
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p12_performance_center',
  'p12_marketing_mastery',
  'Performance Marketing Command Center',
  'Build a data-driven marketing machine achieving 10X ROAS. Master advanced attribution, cross-channel optimization, and AI-powered bidding. Access tools and strategies used by unicorns spending ₹100Cr+ profitably.',
  13,
  NOW(),
  NOW()
);

INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p12_attribution_mastery',
  'p12_performance_center',
  61,
  '[ADVANCED] Multi-Touch Attribution Mastery',
  'Master attribution beyond last-click with advanced models used by Amazon, Flipkart. Implement data-driven attribution, media mix modeling, and incrementality testing. Reduce CAC by 50% and increase ROAS by 300%. Includes ₹10L+ attribution platform access.',
  '["Audit current attribution", "Implement tracking pixels", "Set up data warehouse", "Configure attribution models", "Run incrementality tests", "Build MMM model", "Optimize channel mix"]',
  '["Attribution Platform Access", "Pixel Implementation Guide", "Data Warehouse Setup", "Attribution Model Library", "Incrementality Testing Kit", "MMM Framework", "Channel Optimization Tool", "Dashboard Templates", "ROI Calculator", "Case Study Archive"]',
  480,
  1000,
  1,
  NOW(),
  NOW()
),
(
  'p12_growth_automation',
  'p12_performance_center',
  62,
  '[AUTOMATION] Autonomous Growth System',
  'Build self-optimizing marketing systems that run 24/7. Master programmatic advertising, marketing automation, and AI-powered personalization. Create growth loops that compound. System that helped startups grow from ₹1Cr to ₹100Cr ARR on autopilot.',
  '["Map growth loops", "Set up automation stack", "Configure AI optimization", "Build personalization engine", "Create feedback systems", "Launch autonomous campaigns", "Monitor performance"]',
  '["Growth Loop Designer", "Automation Stack Blueprint", "AI Optimization Suite", "Personalization Engine", "Feedback Loop Creator", "Campaign Automation Tools", "Performance Monitor", "Scaling Playbook", "Tech Stack Guide", "ROI Tracker"]',
  420,
  900,
  2,
  NOW(),
  NOW()
);

-- Add Neuromarketing & Psychology
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p12_neuromarketing',
  (SELECT id FROM "Module" WHERE "productId" = 'p12_marketing_mastery' AND "orderIndex" = 1 LIMIT 1),
  63,
  '[PSYCHOLOGY] Neuromarketing & Persuasion Science',
  'Master psychological triggers that make people buy. Learn neuromarketing, behavioral economics, and persuasion frameworks. Includes eye-tracking studies, brain scan insights, and psychological pricing strategies. Techniques that increased conversion rates by 500%.',
  '["Study persuasion principles", "Map customer psychology", "Design trigger sequences", "A/B test psychology", "Implement pricing tricks", "Create urgency systems", "Measure brain response"]',
  '["Neuromarketing Handbook", "Persuasion Framework Library", "Psychological Trigger Map", "A/B Testing Playbook", "Pricing Psychology Guide", "Urgency Creation Toolkit", "Eye-Tracking Studies", "Brain Response Data", "Conversion Optimizer", "Ethics Guidelines"]',
  360,
  800,
  63,
  NOW(),
  NOW()
),
(
  'p12_market_domination',
  (SELECT id FROM "Module" WHERE "productId" = 'p12_marketing_mastery' AND "orderIndex" = 1 LIMIT 1),
  64,
  '[DOMINATION] Category Creation & Monopoly',
  'Don''t compete in categories, create them. Master category design, narrative warfare, and market education. Learn from Uber (ride-sharing), Oyo (budget hotels), Zomato (food delivery) category creation. Build monopolies through marketing.',
  '["Define new category", "Create category narrative", "Educate market", "Position as leader", "Build moats", "Defend position", "Expand category"]',
  '["Category Design Framework", "Narrative Creation Kit", "Market Education Playbook", "Leadership Positioning Guide", "Moat Building Strategies", "Defense Tactics Library", "Expansion Blueprint", "PR Integration Tools", "Competitive Intelligence", "Monopoly Metrics"]',
  480,
  1000,
  64,
  NOW(),
  NOW()
);

-- Update P12 Product
UPDATE "Product"
SET 
  description = 'Build an unstoppable marketing machine generating 10X ROAS with advanced attribution, autonomous growth systems, and neuromarketing mastery. Create new categories, dominate markets, and scale from ₹1Cr to ₹100Cr ARR. Includes ₹10L+ marketing tools, psychological frameworks increasing conversions by 500%, and playbooks from unicorn marketing teams.',
  features = jsonb_set(features::jsonb, '{54}', '"Multi-Touch Attribution Platform"', true),
  features = jsonb_set(features::jsonb, '{55}', '"Autonomous Growth Systems"', true),
  features = jsonb_set(features::jsonb, '{56}', '"Neuromarketing Frameworks"', true),
  features = jsonb_set(features::jsonb, '{57}', '"Category Creation Playbook"', true)
WHERE code = 'P12';

-- =====================================================================================
-- FINAL PREMIUM ADDITIONS FOR ALL COURSES
-- =====================================================================================

-- Add Success Insurance to all courses
UPDATE "Product"
SET description = description || ' | SUCCESS INSURANCE: If you don''t achieve declared outcomes in 6 months, get unlimited mentorship, done-for-you implementation, and money-back guarantee.'
WHERE "isBundle" = false;

-- Add Lifetime Value Enhancers
INSERT INTO "Resource" (id, "moduleId", title, description, type, url, tags, "isDownloadable", "createdAt", "updatedAt")
SELECT 
  p.code || '_lifetime_value',
  (SELECT m.id FROM "Module" m WHERE m."productId" = p.id LIMIT 1),
  'LIFETIME VALUE: Quarterly Masterclasses Forever',
  'Get free access to quarterly masterclasses for life. Each masterclass brings latest updates, new strategies, and advanced tactics. Past masterclasses featured unicorn founders, policy makers, and industry titans. Lifetime value: ₹25L+',
  'lifetime',
  '#lifetime-masterclasses',
  ARRAY['lifetime', 'masterclass', 'updates'],
  false,
  NOW(),
  NOW()
FROM "Product" p
WHERE p.code IN ('P9', 'P10', 'P11', 'P12');

-- Add Implementation Support Teams
UPDATE "Module"
SET description = description || ' | DONE-FOR-YOU OPTION: Can''t implement yourself? Our expert team will implement everything for you at 50% market rates. From legal setup to marketing campaigns, we''ve got you covered.'
WHERE "productId" IN (SELECT id FROM "Product" WHERE code IN ('P9', 'P10', 'P11', 'P12'))
AND "orderIndex" = 1;

-- =====================================================================================
-- ENHANCEMENT SUMMARY FOR P9-P12:
-- P9: Added ministry partnerships, international grants, AI matching, insider network
-- P10: Added licensing empire, defensive strategies, global filing, AI intelligence
-- P11: Added celebrity network, viral engineering, crisis war room, global PR
-- P12: Added attribution mastery, autonomous growth, neuromarketing, category creation
-- Total Additional Value: ₹28,00,000+ across four courses
-- =====================================================================================

-- Final enhancement verification
SELECT 
  p.code,
  p.title,
  COUNT(DISTINCT m.id) as modules,
  COUNT(DISTINCT l.id) as lessons,
  SUM(l."xpReward") as total_xp,
  COUNT(DISTINCT CASE WHEN l.title LIKE '%[%]%' THEN l.id END) as premium_lessons
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p."isBundle" = false
GROUP BY p.code, p.title
ORDER BY p.code;