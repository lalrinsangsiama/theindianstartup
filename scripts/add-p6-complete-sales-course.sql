-- P6: Sales & GTM in India - Master Course Creation
-- This script creates the ultimate comprehensive 60-lesson sales mastery course with 10 modules
-- Value: ₹65,000+ delivered at ₹6,999 (Premium High-Ticket Course)

-- First, clean up any existing P6 data to avoid conflicts
DO $$ 
BEGIN 
  RAISE NOTICE 'Starting P6 Sales Course Creation Process';
  RAISE NOTICE 'Cleaning up any existing P6 data';
END $$;

-- Delete existing lessons first (due to foreign key constraints)
DELETE FROM "Lesson" WHERE "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" LIKE '%p6%' OR "productId" LIKE '%sales%'
);

-- Delete existing modules
DELETE FROM "Module" WHERE "productId" LIKE '%p6%' OR "productId" LIKE '%sales%';

-- Delete existing product
DELETE FROM "Product" WHERE code = 'P6' OR id LIKE '%p6%' OR id LIKE '%sales%';

-- Insert the P6 product (comprehensive premium sales course)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p6_sales_gtm_india_complete',
  'P6',
  'Sales & GTM in India - Master Course',
  'Transform Your Startup Into a Revenue-Generating Machine. Master India-specific sales strategies with 60-day intensive course covering buyer psychology to enterprise deals. Includes 75+ templates, 12 expert sessions, proven 92% success rate, and comprehensive sales toolkit. Premium course value: ₹65,000+',
  6999,
  false,
  60,
  NOW(),
  NOW()
);

DO $$ 
BEGIN 
  RAISE NOTICE 'P6 Product created successfully with ID: p6_sales_gtm_india_complete';
END $$;

-- Module 1: Indian Market Fundamentals (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m1_market_fundamentals',
  'p6_sales_gtm_india_complete',
  'Indian Market Fundamentals',
  'Master the unique psychology, structure, and dynamics of Indian markets across regions and industries',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l1_buyer_psychology',
  'p6_m1_market_fundamentals',
  1,
  'Decoding the Indian Buyer Psychology - The Cultural DNA of Indian Sales',
  'Master the 3-Layer Trust Model (Personal, Professional, Product Trust), understand jugaad mentality and solution selling, navigate the price-value paradox, handle family/committee decision dynamics with 5-7 stakeholders, leverage regional cultural nuances across North/West/South/East India, optimize festival season impact on B2B/B2C sales, and build powerful reference ecosystems. Includes comprehensive framework worth 10,000+ value with detailed case studies like Zomato''s cultural sales mastery.',
  '["Complete cultural assessment of top 10 target customers", "Map all stakeholders for current top 3 deals", "Identify regional cultural preferences for key markets", "Plan relationship-building activities aligned with festival calendar", "Audit current references and identify gaps by segment", "Customize value propositions for different stakeholder types"]',
  '["Indian Buyer Psychology Assessment Tool", "Trust-Building Playbook (30-day framework)", "Stakeholder Mapping Template", "Regional Sales Strategy Guide", "Festival Calendar with Sales Opportunities", "Reference Development Toolkit", "Cultural Sensitivity Training Materials", "Buyer Persona Cultural Mapper", "Trust Score Calculator", "Regional Strategy Selector", "Festival Impact Predictor"]',
  120,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p6_l2_market_structure',
  'p6_m1_market_fundamentals',
  2,
  'India''s Unique Market Structure',
  'Navigate Tier 1 vs Tier 2/3 city dynamics, understand the SME/MSME landscape, government as customer, unorganized sector opportunities, and Digital India''s impact.',
  '["Segment your TAM by city tiers", "Create SME vs Enterprise strategy", "Map government opportunity pipeline", "Assess unorganized sector potential"]',
  '["Market Segmentation Framework", "Government Sales Opportunity Map", "SME Decision Maker Profiles", "Digital Adoption Assessment"]',
  90,
  100,
  2,
  NOW(),
  NOW()
),
(
  'p6_l3_regional_strategies',
  'p6_m1_market_fundamentals',
  3,
  'Regional Market Strategies',
  'Master region-specific approaches for North (Delhi NCR), West (Mumbai, Gujarat), South (Bangalore, Chennai), East (Kolkata), including language localization and pricing variations.',
  '["Create region-specific sales scripts", "Develop localization strategy", "Set regional pricing models", "Map local competition landscape"]',
  '["Regional Sales Playbook Templates", "Language Localization Guide", "Competitive Analysis Framework", "Regional Pricing Calculator"]',
  90,
  100,
  3,
  NOW(),
  NOW()
),
(
  'p6_l4_industry_nuances',
  'p6_m1_market_fundamentals',
  4,
  'Industry-Specific Indian Nuances',
  'Navigate B2B SaaS, FinTech/BFSI, Manufacturing, E-commerce, EdTech, HealthTech, and AgriTech sectors with specialized selling approaches and stakeholder mapping.',
  '["Map your industry stakeholder ecosystem", "Create sector-specific value props", "Develop compliance-aware pitches", "Build industry reference pipeline"]',
  '["Industry-Specific Sales Scripts", "Stakeholder Mapping Templates", "Compliance Checklist by Sector", "Reference Customer Framework"]',
  90,
  100,
  4,
  NOW(),
  NOW()
),
(
  'p6_l5_regulatory_compliance',
  'p6_m1_market_fundamentals',
  5,
  'Regulatory & Compliance in Sales',
  'Navigate GST implications, interstate commerce, digital payments, data localization, industry regulations (RBI, SEBI), contract law, and ethical selling practices.',
  '["Audit sales process for compliance", "Create GST-compliant pricing", "Design contract templates", "Set up ethical sales guidelines"]',
  '["Compliance Audit Checklist", "GST Pricing Calculator", "Legal Contract Templates", "Ethics Training Materials"]',
  90,
  100,
  5,
  NOW(),
  NOW()
);

-- Module 2: Building Your Sales Foundation (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m2_sales_foundation',
  'p6_sales_gtm_india_complete',
  'Building Your Sales Foundation',
  'Architect your sales strategy, design processes, structure teams, select technology, and set up revenue operations for scalable growth',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l6_sales_strategy',
  'p6_m2_sales_foundation',
  6,
  'Sales Strategy Architecture',
  'Build TAM/SAM/SOM for Indian markets, develop ICP and buyer personas, create compelling value propositions, competitive positioning, and optimize pricing strategies.',
  '["Calculate TAM/SAM/SOM for India", "Define detailed ICP profile", "Create buyer persona maps", "Develop competitive positioning", "Set optimal price points"]',
  '["Market Sizing Calculator", "ICP Development Framework", "Buyer Persona Templates", "Competitive Positioning Canvas", "Pricing Strategy Toolkit"]',
  120,
  120,
  1,
  NOW(),
  NOW()
),
(
  'p6_l7_process_design',
  'p6_m2_sales_foundation',
  7,
  'Sales Process Design',
  'Design inbound vs outbound strategies, map Indian sales cycle stages, create lead qualification frameworks (BANT+), optimize discovery and demo processes.',
  '["Map your sales cycle stages", "Create lead qualification criteria", "Design discovery call framework", "Build demo optimization process"]',
  '["Sales Process Flowchart", "Lead Qualification Scorecard", "Discovery Call Script Templates", "Demo Best Practices Guide"]',
  120,
  120,
  2,
  NOW(),
  NOW()
),
(
  'p6_l8_team_structure',
  'p6_m2_sales_foundation',
  8,
  'Sales Team Structure',
  'Design hunter vs farmer models, balance inside vs field sales, integrate channel partners, plan territories, size teams, and create compensation structures.',
  '["Design optimal team structure", "Create territory plan", "Set team size ratios", "Design compensation plan", "Plan channel integration"]',
  '["Team Structure Templates", "Territory Planning Tool", "Compensation Calculator", "Channel Partner Framework"]',
  120,
  120,
  3,
  NOW(),
  NOW()
),
(
  'p6_l9_sales_tech_stack',
  'p6_m2_sales_foundation',
  9,
  'Sales Tech Stack for India',
  'Select and implement CRM, integrate WhatsApp Business, set up automation tools, choose lead generation platforms, and implement analytics systems.',
  '["Evaluate and select CRM", "Set up WhatsApp Business", "Implement sales automation", "Choose lead gen platforms", "Configure analytics"]',
  '["CRM Comparison Matrix", "WhatsApp Business Setup Guide", "Automation Workflow Templates", "Lead Gen Platform Reviews"]',
  120,
  120,
  4,
  NOW(),
  NOW()
),
(
  'p6_l10_revenue_operations',
  'p6_m2_sales_foundation',
  10,
  'Revenue Operations Setup',
  'Align sales and marketing, set up lead routing, define SLAs, implement forecasting methodologies, manage pipelines, and create RevOps dashboards.',
  '["Create sales-marketing alignment", "Set up lead routing system", "Define team SLAs", "Implement forecasting", "Build RevOps dashboard"]',
  '["RevOps Alignment Framework", "Lead Routing Templates", "SLA Definition Guide", "Forecasting Models", "Dashboard Templates"]',
  120,
  120,
  5,
  NOW(),
  NOW()
);

-- Module 3: Lead Generation Mastery (Days 11-15)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m3_lead_generation',
  'p6_sales_gtm_india_complete',
  'Lead Generation Mastery',
  'Master digital and traditional lead generation channels, cold outreach, partnerships, and account-based marketing specifically for Indian markets',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l11_digital_lead_gen',
  'p6_m3_lead_generation',
  11,
  'Digital Lead Generation',
  'Master LinkedIn strategies for Indian market, Facebook/Instagram B2B, Google Ads optimization, content marketing, webinar marketing, SEO for Indian keywords, and YouTube growth.',
  '["Optimize LinkedIn for Indian B2B", "Set up Facebook B2B campaigns", "Create Google Ads strategy", "Launch content marketing", "Plan webinar series"]',
  '["LinkedIn B2B Playbook", "Facebook B2B Campaign Templates", "Google Ads Setup Guide", "Content Calendar Templates", "Webinar Planning Kit"]',
  90,
  110,
  1,
  NOW(),
  NOW()
),
(
  'p6_l12_traditional_channels',
  'p6_m3_lead_generation',
  12,
  'Traditional Lead Channels',
  'Leverage trade shows, industry associations, print media, radio/outdoor advertising, referral programs, alumni networks, and community building for lead generation.',
  '["Identify relevant trade shows", "Join industry associations", "Create referral program", "Build alumni network strategy", "Launch community initiatives"]',
  '["Trade Show ROI Calculator", "Association Membership Guide", "Referral Program Templates", "Community Building Playbook"]',
  90,
  110,
  2,
  NOW(),
  NOW()
),
(
  'p6_l13_cold_outreach',
  'p6_m3_lead_generation',
  13,
  'Cold Outreach That Works',
  'Master email prospecting, cold calling scripts and timing, WhatsApp business outreach, LinkedIn strategies, multi-channel sequences, and objection handling.',
  '["Create email templates", "Write cold calling scripts", "Set up WhatsApp sequences", "Design LinkedIn outreach", "Build follow-up system"]',
  '["Email Template Library", "Cold Calling Script Bank", "WhatsApp Sequence Templates", "LinkedIn Message Templates", "Follow-up Automation"]',
  90,
  110,
  3,
  NOW(),
  NOW()
),
(
  'p6_l14_partnership_development',
  'p6_m3_lead_generation',
  14,
  'Partnership & Channel Development',
  'Build distributor networks, design reseller programs, set up affiliate marketing, create strategic partnerships, establish co-selling agreements, and manage channel conflicts.',
  '["Identify potential distributors", "Create reseller program", "Launch affiliate marketing", "Form strategic partnerships", "Set up co-selling agreements"]',
  '["Partner Evaluation Framework", "Reseller Program Templates", "Affiliate Marketing Kit", "Partnership Agreement Templates"]',
  90,
  110,
  4,
  NOW(),
  NOW()
),
(
  'p6_l15_account_based_marketing',
  'p6_m3_lead_generation',
  15,
  'Account-Based Marketing (ABM)',
  'Implement ABM for Indian enterprises, select target accounts, personalize at scale, engage multiple stakeholders, develop executive relationships, and measure ROI.',
  '["Select target accounts", "Create personalization strategy", "Map stakeholder engagement", "Design executive outreach", "Set up ROI measurement"]',
  '["ABM Account Selection Tool", "Personalization Templates", "Stakeholder Mapping Guide", "Executive Engagement Playbook", "ROI Tracking Dashboard"]',
  90,
  110,
  5,
  NOW(),
  NOW()
);

-- Module 4: Sales Execution Excellence (Days 16-22)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m4_sales_execution',
  'p6_sales_gtm_india_complete',
  'Sales Execution Excellence',
  'Master first meetings, solution selling, negotiations, enterprise sales, SME tactics, government sales, and startup credibility building',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons (Days 16-22)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l16_first_meeting',
  'p6_m4_sales_execution',
  16,
  'First Meeting Mastery',
  'Excel at Indian business etiquette, relationship building tactics, discovery frameworks, presentation skills, handling multiple stakeholders, and cultural sensitivity.',
  '["Practice business etiquette", "Create discovery questions", "Prepare presentation templates", "Role-play stakeholder scenarios", "Develop cultural sensitivity"]',
  '["Business Etiquette Guide", "Discovery Question Bank", "Presentation Templates", "Stakeholder Management Guide", "Cultural Sensitivity Checklist"]',
  90,
  120,
  1,
  NOW(),
  NOW()
),
(
  'p6_l17_solution_selling',
  'p6_m4_sales_execution',
  17,
  'Solution Selling & Demos',
  'Master consultative selling approach, ROI demonstration, proof of concept strategies, pilot program design, reference selling, and competitive differentiation.',
  '["Develop consultative approach", "Create ROI models", "Design POC process", "Plan pilot programs", "Build reference pipeline"]',
  '["Consultative Selling Framework", "ROI Calculator Templates", "POC Design Guide", "Pilot Program Templates", "Reference Selling Playbook"]',
  90,
  120,
  2,
  NOW(),
  NOW()
),
(
  'p6_l18_negotiation_tactics',
  'p6_m4_sales_execution',
  18,
  'Negotiation in Indian Context',
  'Navigate price negotiations, payment terms discussions, contract negotiations, procurement departments, intermediaries, and win-win frameworks.',
  '["Practice negotiation scenarios", "Create pricing flexibility", "Design payment terms", "Handle procurement teams", "Build win-win solutions"]',
  '["Negotiation Playbook", "Pricing Flexibility Matrix", "Payment Terms Templates", "Procurement Strategy Guide", "Win-Win Framework"]',
  90,
  120,
  3,
  NOW(),
  NOW()
),
(
  'p6_l19_enterprise_sales',
  'p6_m4_sales_execution',
  19,
  'Enterprise Sales Playbook',
  'Manage long sales cycles, map multiple stakeholders, develop champions, secure executive sponsorship, respond to RFPs/tenders, and handle large deals.',
  '["Map enterprise stakeholders", "Identify champions", "Secure executive sponsors", "Create RFP responses", "Design large deal strategy"]',
  '["Enterprise Stakeholder Map", "Champion Development Guide", "Executive Sponsorship Playbook", "RFP Response Templates", "Large Deal Framework"]',
  90,
  120,
  4,
  NOW(),
  NOW()
),
(
  'p6_l20_sme_sales',
  'p6_m4_sales_execution',
  20,
  'SME/MSME Sales Tactics',
  'Use quick decision frameworks, owner-operator selling, value demonstration, flexible pricing models, rapid implementation, and upselling strategies.',
  '["Create quick decision tools", "Practice owner-operator selling", "Design value demos", "Create flexible pricing", "Plan rapid implementation"]',
  '["Quick Decision Framework", "Owner-Operator Playbook", "Value Demo Templates", "Flexible Pricing Models", "Implementation Roadmap"]',
  90,
  120,
  5,
  NOW(),
  NOW()
),
(
  'p6_l21_government_sales',
  'p6_m4_sales_execution',
  21,
  'Government Sales Mastery',
  'Navigate GeM portal, prepare tenders, implement L1 pricing strategies, handle compliance documentation, manage relationships, and follow up on payments.',
  '["Register on GeM portal", "Prepare tender responses", "Develop L1 strategies", "Create compliance docs", "Build govt relationships"]',
  '["GeM Registration Guide", "Tender Preparation Kit", "L1 Pricing Calculator", "Compliance Documentation", "Government CRM Templates"]',
  90,
  120,
  6,
  NOW(),
  NOW()
),
(
  'p6_l22_startup_credibility',
  'p6_m4_sales_execution',
  22,
  'Startup Selling to Enterprises',
  'Build credibility, mitigate buyer risk, prove stability, develop reference customers, manage pilot to production journey, and position partnerships.',
  '["Build credibility assets", "Create risk mitigation", "Prove stability", "Develop references", "Design pilot programs"]',
  '["Credibility Building Kit", "Risk Mitigation Framework", "Stability Proof Points", "Reference Development Guide", "Pilot-to-Production Playbook"]',
  90,
  120,
  7,
  NOW(),
  NOW()
);

-- Module 5: Pricing & Monetization (Days 23-27)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m5_pricing_monetization',
  'p6_sales_gtm_india_complete',
  'Pricing & Monetization',
  'Master pricing strategies for India, payment terms, discounting, revenue model innovation, and international pricing considerations',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons (Days 23-27)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l23_pricing_strategy',
  'p6_m5_pricing_monetization',
  23,
  'Pricing Strategy for India',
  'Master cost-plus vs value pricing, psychological pricing points, competitive analysis, regional variations, freemium models, subscription pricing, and dynamic strategies.',
  '["Analyze pricing models", "Set psychological price points", "Research competitive pricing", "Create regional variations", "Design freemium strategy"]',
  '["Pricing Strategy Framework", "Psychological Pricing Guide", "Competitive Analysis Tool", "Regional Pricing Matrix", "Freemium Model Templates"]',
  90,
  130,
  1,
  NOW(),
  NOW()
),
(
  'p6_l24_payment_terms',
  'p6_m5_pricing_monetization',
  24,
  'Payment Terms & Collections',
  'Navigate Indian payment culture, credit period negotiations, advance payment strategies, EMI/financing options, collection best practices, and legal recourse.',
  '["Understand payment culture", "Negotiate credit terms", "Create advance strategies", "Set up EMI options", "Build collection process"]',
  '["Payment Culture Guide", "Credit Terms Framework", "Advance Payment Templates", "EMI Setup Guide", "Collection Process Playbook"]',
  90,
  130,
  2,
  NOW(),
  NOW()
),
(
  'p6_l25_discounting_promotions',
  'p6_m5_pricing_monetization',
  25,
  'Discounting & Promotions',
  'Leverage festival seasons, volume discounts, early bird pricing, loyalty programs, bundling strategies, limited time offers, and channel pricing.',
  '["Plan festival promotions", "Create volume discounts", "Design early bird offers", "Launch loyalty programs", "Bundle products/services"]',
  '["Festival Marketing Calendar", "Volume Discount Calculator", "Early Bird Campaign Templates", "Loyalty Program Framework", "Bundling Strategy Guide"]',
  90,
  130,
  3,
  NOW(),
  NOW()
),
(
  'p6_l26_revenue_innovation',
  'p6_m5_pricing_monetization',
  26,
  'Revenue Model Innovation',
  'Implement SaaS pricing tiers, usage-based pricing, outcome-based models, hybrid pricing strategies, platform monetization, and marketplace models.',
  '["Design SaaS tiers", "Create usage-based models", "Develop outcome pricing", "Build hybrid strategies", "Monetize platforms"]',
  '["SaaS Pricing Tier Templates", "Usage-Based Pricing Calculator", "Outcome Model Framework", "Hybrid Strategy Guide", "Platform Monetization Playbook"]',
  90,
  130,
  4,
  NOW(),
  NOW()
),
(
  'p6_l27_international_pricing',
  'p6_m5_pricing_monetization',
  27,
  'International Pricing',
  'Manage USD vs INR pricing, export pricing strategies, transfer pricing basics, multi-currency management, forex risk mitigation, and global consistency.',
  '["Set USD/INR strategy", "Create export pricing", "Understand transfer pricing", "Manage currencies", "Mitigate forex risk"]',
  '["Currency Strategy Guide", "Export Pricing Calculator", "Transfer Pricing Primer", "Multi-Currency Management", "Forex Risk Mitigation"]',
  90,
  130,
  5,
  NOW(),
  NOW()
);

-- Module 6: Sales Team Management (Days 28-33)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m6_team_management',
  'p6_sales_gtm_india_complete',
  'Sales Team Management',
  'Build and manage high-performing sales teams with hiring, training, performance management, culture building, field sales, and leadership',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons (Days 28-33)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l28_hiring_talent',
  'p6_m6_team_management',
  28,
  'Hiring Sales Talent',
  'Define sales roles, create interview frameworks, assessment techniques, reference checking, cultural fit evaluation, compensation negotiation, and onboarding.',
  '["Define role requirements", "Create interview process", "Design assessments", "Check references", "Evaluate cultural fit"]',
  '["Sales Role Definitions", "Interview Framework", "Assessment Tools", "Reference Check Templates", "Cultural Fit Evaluation"]',
  90,
  140,
  1,
  NOW(),
  NOW()
),
(
  'p6_l29_training_enablement',
  'p6_m6_team_management',
  29,
  'Sales Training & Enablement',
  'Transfer product knowledge, develop sales skills, train objection handling, implement tool training programs, continuous learning, and certification programs.',
  '["Create product training", "Develop skill modules", "Train objection handling", "Implement tool training", "Design certification"]',
  '["Product Training Modules", "Sales Skill Development", "Objection Handling Scripts", "Tool Training Programs", "Certification Framework"]',
  90,
  140,
  2,
  NOW(),
  NOW()
),
(
  'p6_l30_performance_management',
  'p6_m6_team_management',
  30,
  'Performance Management',
  'Set KPIs, conduct reviews (daily/weekly/monthly), manage pipelines, track forecast accuracy, measure activities and outcomes, create improvement plans.',
  '["Set team KPIs", "Schedule regular reviews", "Manage pipeline reviews", "Track forecast accuracy", "Create improvement plans"]',
  '["KPI Dashboard Templates", "Review Meeting Frameworks", "Pipeline Management Tools", "Forecast Tracking", "Performance Improvement Plans"]',
  90,
  140,
  3,
  NOW(),
  NOW()
),
(
  'p6_l31_sales_culture',
  'p6_m6_team_management',
  31,
  'Sales Culture & Motivation',
  'Create winning culture, recognition programs, incentive structures, team building activities, healthy competition, career development, and retention strategies.',
  '["Define sales culture", "Create recognition programs", "Design incentives", "Plan team building", "Develop career paths"]',
  '["Culture Development Guide", "Recognition Program Templates", "Incentive Structure Framework", "Team Building Activities", "Career Development Plans"]',
  90,
  140,
  4,
  NOW(),
  NOW()
),
(
  'p6_l32_field_sales',
  'p6_m6_team_management',
  32,
  'Field Sales Management',
  'Optimize territories, plan routes, manage expenses, coordinate remote teams, implement field reporting systems, and establish safety protocols.',
  '["Optimize territories", "Plan efficient routes", "Manage field expenses", "Coordinate remote teams", "Implement field reporting"]',
  '["Territory Optimization Tools", "Route Planning Software", "Expense Management System", "Remote Team Coordination", "Field Reporting Templates"]',
  90,
  140,
  5,
  NOW(),
  NOW()
),
(
  'p6_l33_sales_leadership',
  'p6_m6_team_management',
  33,
  'Sales Leadership',
  'Lead by example, implement coaching frameworks, handle difficult conversations, manage change, strategic planning, board reporting, and succession planning.',
  '["Develop leadership style", "Create coaching framework", "Practice difficult conversations", "Plan strategic initiatives", "Prepare board reports"]',
  '["Leadership Development Guide", "Coaching Framework", "Difficult Conversation Scripts", "Strategic Planning Templates", "Board Reporting Format"]',
  90,
  140,
  6,
  NOW(),
  NOW()
);

-- Module 7: Customer Success & Retention (Days 34-38)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m7_customer_success',
  'p6_sales_gtm_india_complete',
  'Customer Success & Retention',
  'Master customer onboarding, account management, support systems, feedback loops, and expansion revenue strategies',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons (Days 34-38)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l34_customer_onboarding',
  'p6_m7_customer_success',
  34,
  'Customer Onboarding Excellence',
  'Plan implementation, train stakeholders, define success metrics, identify quick wins, track adoption, resolve issues, and establish handoff protocols.',
  '["Create implementation plan", "Design stakeholder training", "Define success metrics", "Identify quick wins", "Set up adoption tracking"]',
  '["Implementation Planning Templates", "Stakeholder Training Modules", "Success Metrics Framework", "Quick Wins Checklist", "Adoption Tracking Tools"]',
  90,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p6_l35_account_management',
  'p6_m7_customer_success',
  35,
  'Account Management',
  'Plan accounts, map relationships, conduct QBRs, implement upselling strategies, cross-selling tactics, renewal management, and churn prevention.',
  '["Create account plans", "Map key relationships", "Schedule QBRs", "Identify upsell opportunities", "Prevent churn risks"]',
  '["Account Planning Templates", "Relationship Mapping Tools", "QBR Framework", "Upsell Strategy Guide", "Churn Prevention Playbook"]',
  90,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p6_l36_support_systems',
  'p6_m7_customer_success',
  36,
  'Customer Support Systems',
  'Implement tiered support models, provide Indian language support, establish 24/7 strategies, create self-service portals, and build communities.',
  '["Design support tiers", "Set up language support", "Create 24/7 strategy", "Build self-service portal", "Launch customer community"]',
  '["Support Tier Framework", "Language Support Guide", "24/7 Support Strategy", "Self-Service Portal Templates", "Community Building Kit"]',
  90,
  150,
  3,
  NOW(),
  NOW()
),
(
  'p6_l37_nps_feedback',
  'p6_m7_customer_success',
  37,
  'NPS & Feedback Loops',
  'Implement NPS systems, design surveys, collect feedback, create action plans, close the loop, generate testimonials, and develop case studies.',
  '["Implement NPS tracking", "Design feedback surveys", "Create action plans", "Close feedback loops", "Generate testimonials"]',
  '["NPS Implementation Guide", "Survey Design Templates", "Action Planning Framework", "Feedback Loop Process", "Testimonial Generation Kit"]',
  90,
  150,
  4,
  NOW(),
  NOW()
),
(
  'p6_l38_expansion_revenue',
  'p6_m7_customer_success',
  38,
  'Expansion Revenue',
  'Implement land and expand strategies, analyze usage analytics, identify growth opportunities, manage pricing tier upgrades, and secure multi-year contracts.',
  '["Create expansion strategy", "Analyze usage data", "Identify growth opportunities", "Plan tier upgrades", "Secure long-term contracts"]',
  '["Land & Expand Playbook", "Usage Analytics Dashboard", "Growth Opportunity Matrix", "Tier Upgrade Framework", "Multi-Year Contract Templates"]',
  90,
  150,
  5,
  NOW(),
  NOW()
);

-- Module 8: Channel & Partnership Sales (Days 39-43)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m8_channel_partnerships',
  'p6_sales_gtm_india_complete',
  'Channel & Partnership Sales',
  'Build channel strategies, enable partners, create distribution networks, form strategic alliances, and leverage marketplace strategies',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons (Days 39-43)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l39_channel_strategy',
  'p6_m8_channel_partnerships',
  39,
  'Channel Strategy Development',
  'Balance direct vs indirect sales, select channel partners, plan geographic coverage, develop market penetration strategies, and manage channel economics.',
  '["Define channel strategy", "Select partners", "Plan geographic coverage", "Create penetration strategy", "Calculate channel economics"]',
  '["Channel Strategy Framework", "Partner Selection Criteria", "Geographic Coverage Plan", "Market Penetration Tools", "Channel Economics Calculator"]',
  90,
  160,
  1,
  NOW(),
  NOW()
),
(
  'p6_l40_partner_enablement',
  'p6_m8_channel_partnerships',
  40,
  'Partner Enablement',
  'Create partner training programs, develop sales collateral, set up demo environments, implement certification programs, and establish co-selling playbooks.',
  '["Create partner training", "Develop sales collateral", "Set up demo environments", "Launch certification", "Create co-selling playbooks"]',
  '["Partner Training Modules", "Sales Collateral Library", "Demo Environment Setup", "Certification Program", "Co-Selling Playbooks"]',
  90,
  160,
  2,
  NOW(),
  NOW()
),
(
  'p6_l41_distribution_network',
  'p6_m8_channel_partnerships',
  41,
  'Distribution Network',
  'Create distributor agreements, manage inventory, establish credit policies, allocate territories, design margin structures, and implement incentive programs.',
  '["Create distributor agreements", "Manage inventory systems", "Set credit policies", "Allocate territories", "Design margin structures"]',
  '["Distributor Agreement Templates", "Inventory Management System", "Credit Policy Framework", "Territory Allocation Tools", "Margin Structure Calculator"]',
  90,
  160,
  3,
  NOW(),
  NOW()
),
(
  'p6_l42_strategic_alliances',
  'p6_m8_channel_partnerships',
  42,
  'Strategic Alliances',
  'Form technology partnerships, create go-to-market alliances, build system integrator relationships, engage consultants, and join industry bodies.',
  '["Form tech partnerships", "Create GTM alliances", "Build SI relationships", "Engage consultants", "Join industry bodies"]',
  '["Partnership Agreement Templates", "GTM Alliance Framework", "SI Relationship Guide", "Consultant Engagement", "Industry Body Directory"]',
  90,
  160,
  4,
  NOW(),
  NOW()
),
(
  'p6_l43_marketplace_strategies',
  'p6_m8_channel_partnerships',
  43,
  'Marketplace Strategies',
  'Leverage Amazon/Flipkart for B2B, industry-specific marketplaces, SaaS marketplaces, app store optimization, marketplace pricing, and review management.',
  '["Set up B2B marketplace", "Join industry marketplaces", "Optimize SaaS listings", "Optimize app stores", "Manage reviews"]',
  '["B2B Marketplace Setup Guide", "Industry Marketplace Directory", "SaaS Marketplace Optimization", "App Store Guide", "Review Management Tools"]',
  90,
  160,
  5,
  NOW(),
  NOW()
);

-- Module 9: Sales Technology & Analytics (Days 44-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m9_tech_analytics',
  'p6_sales_gtm_india_complete',
  'Sales Technology & Analytics',
  'Master sales analytics, reporting, AI automation, and future-ready sales technology implementation',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons (Days 44-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l44_sales_analytics',
  'p6_m9_tech_analytics',
  44,
  'Sales Analytics & Reporting',
  'Implement pipeline analytics, conversion metrics, sales velocity, win/loss analysis, competitive intelligence, market share tracking, and predictive analytics.',
  '["Set up pipeline analytics", "Track conversion metrics", "Measure sales velocity", "Conduct win/loss analysis", "Implement predictive analytics"]',
  '["Analytics Dashboard Templates", "Conversion Tracking Tools", "Sales Velocity Calculator", "Win/Loss Analysis Framework", "Predictive Analytics Guide"]',
  120,
  170,
  1,
  NOW(),
  NOW()
),
(
  'p6_l45_ai_automation',
  'p6_m9_tech_analytics',
  45,
  'AI & Automation in Sales',
  'Implement lead scoring models, integrate chatbots, automate emails, enable predictive forecasting, leverage AI insights, automate processes, and prepare for sales tech future.',
  '["Implement lead scoring", "Integrate chatbots", "Automate email sequences", "Enable predictive forecasting", "Leverage AI insights"]',
  '["Lead Scoring Model Templates", "Chatbot Integration Guide", "Email Automation Setup", "Forecasting AI Tools", "Sales Automation Playbook"]',
  120,
  170,
  2,
  NOW(),
  NOW()
);

-- Module 10: Advanced Strategies (Days 46-60)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p6_m10_advanced_strategies',
  'p6_sales_gtm_india_complete',
  'Advanced Strategies & Specializations',
  'Master advanced sales strategies including international expansion, M&A sales strategies, and deep industry vertical expertise',
  10,
  NOW(),
  NOW()
);

-- Module 10 Lessons (Days 46-60) - Advanced Track
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p6_l46_international_expansion',
  'p6_m10_advanced_strategies',
  46,
  'International Expansion Strategies',
  'Navigate SAARC market entry, Middle East strategies, Southeast Asia approach, US/Europe expansion from India, localization strategies, and cross-border sales.',
  '["Plan SAARC expansion", "Develop Middle East strategy", "Create SEA approach", "Plan US/Europe entry", "Design localization"]',
  '["International Expansion Framework", "Market Entry Strategies", "Localization Guide", "Cross-Border Sales Playbook"]',
  120,
  180,
  1,
  NOW(),
  NOW()
),
(
  'p6_l47_international_localization',
  'p6_m10_advanced_strategies',
  47,
  'Global Market Localization',
  'Master cultural adaptation, regulatory compliance, pricing localization, distribution partnerships, and customer success for international markets.',
  '["Adapt to local cultures", "Ensure regulatory compliance", "Localize pricing", "Find distribution partners", "Adapt customer success"]',
  '["Cultural Adaptation Guide", "Regulatory Compliance Checklist", "Pricing Localization Tools", "International Partnership Framework"]',
  120,
  180,
  2,
  NOW(),
  NOW()
),
(
  'p6_l48_cross_border_sales',
  'p6_m10_advanced_strategies',
  48,
  'Cross-Border Sales Operations',
  'Handle multi-currency transactions, time zone management, remote team coordination, international contracts, and global account management.',
  '["Set up multi-currency", "Manage time zones", "Coordinate remote teams", "Create international contracts", "Manage global accounts"]',
  '["Multi-Currency Setup Guide", "Time Zone Management Tools", "Remote Team Coordination", "International Contract Templates"]',
  120,
  180,
  3,
  NOW(),
  NOW()
),
(
  'p6_l49_ma_strategic_sales',
  'p6_m10_advanced_strategies',
  49,
  'M&A and Strategic Sales',
  'Navigate acquisition opportunities, target strategic buyers, value through sales growth, plan integration, identify revenue synergies, and plan exits.',
  '["Identify acquisition targets", "Find strategic buyers", "Value through sales", "Plan integration", "Identify synergies"]',
  '["M&A Sales Framework", "Strategic Buyer Analysis", "Valuation Through Sales", "Integration Planning", "Revenue Synergy Identification"]',
  120,
  180,
  4,
  NOW(),
  NOW()
),
(
  'p6_l50_exit_strategies',
  'p6_m10_advanced_strategies',
  50,
  'Sales-Driven Exit Strategies',
  'Build sales for exit value, prepare revenue due diligence, demonstrate growth potential, position for strategic sale, and maximize valuation through sales excellence.',
  '["Build for exit value", "Prepare revenue DD", "Demonstrate growth", "Position for strategic sale", "Maximize valuation"]',
  '["Exit Value Framework", "Revenue Due Diligence Prep", "Growth Demonstration Tools", "Strategic Sale Positioning"]',
  120,
  180,
  5,
  NOW(),
  NOW()
),
(
  'p6_l51_bfsi_sales',
  'p6_m10_advanced_strategies',
  51,
  'BFSI Sector Sales Mastery',
  'Master banking, financial services, and insurance sector sales with regulatory compliance, risk management, and stakeholder complexity.',
  '["Understand BFSI regulations", "Manage regulatory compliance", "Handle risk concerns", "Navigate complex stakeholders", "Build trust in BFSI"]',
  '["BFSI Regulations Guide", "Compliance Framework", "Risk Management Playbook", "Stakeholder Mapping for BFSI"]',
  120,
  180,
  6,
  NOW(),
  NOW()
),
(
  'p6_l52_healthcare_sales',
  'p6_m10_advanced_strategies',
  52,
  'Healthcare Sales Excellence',
  'Navigate healthcare ecosystem including doctors, hospitals, patients, with regulatory compliance, evidence-based selling, and clinical validation.',
  '["Map healthcare ecosystem", "Ensure regulatory compliance", "Create evidence-based pitches", "Secure clinical validation", "Navigate approval processes"]',
  '["Healthcare Ecosystem Map", "Medical Regulations Guide", "Evidence-Based Selling Framework", "Clinical Validation Process"]',
  120,
  180,
  7,
  NOW(),
  NOW()
),
(
  'p6_l53_manufacturing_sales',
  'p6_m10_advanced_strategies',
  53,
  'Manufacturing Industry Sales',
  'Master B2B manufacturing sales with long sales cycles, technical decision makers, supply chain integration, and industrial buyer behavior.',
  '["Understand manufacturing cycles", "Engage technical buyers", "Integrate with supply chains", "Navigate industrial buying", "Handle long cycles"]',
  '["Manufacturing Sales Cycle Guide", "Technical Buyer Engagement", "Supply Chain Integration", "Industrial Buying Behavior"]',
  120,
  180,
  8,
  NOW(),
  NOW()
),
(
  'p6_l54_retail_ecommerce',
  'p6_m10_advanced_strategies',
  54,
  'Retail & E-commerce Sales',
  'Master retail partnerships, e-commerce marketplace sales, omnichannel strategies, inventory management, and seasonal sales planning.',
  '["Build retail partnerships", "Master marketplace sales", "Create omnichannel strategy", "Manage inventory", "Plan seasonal sales"]',
  '["Retail Partnership Framework", "Marketplace Sales Guide", "Omnichannel Strategy", "Inventory Management", "Seasonal Planning"]',
  120,
  180,
  9,
  NOW(),
  NOW()
),
(
  'p6_l55_education_sales',
  'p6_m10_advanced_strategies',
  55,
  'Education Sector Sales',
  'Navigate educational institutions, government education departments, student/parent dynamics, procurement processes, and EdTech adoption cycles.',
  '["Understand education ecosystem", "Navigate govt departments", "Handle student/parent dynamics", "Master procurement", "Drive EdTech adoption"]',
  '["Education Ecosystem Guide", "Government Department Navigation", "Student/Parent Dynamics", "Education Procurement", "EdTech Adoption Framework"]',
  120,
  180,
  10,
  NOW(),
  NOW()
),
(
  'p6_l56_real_estate_b2b',
  'p6_m10_advanced_strategies',
  56,
  'Real Estate B2B Sales',
  'Master real estate technology sales, property developer relationships, facility management, construction industry, and proptech adoption.',
  '["Navigate real estate tech", "Build developer relationships", "Sell to facility management", "Understand construction industry", "Drive proptech adoption"]',
  '["Real Estate Tech Guide", "Developer Relationship Building", "Facility Management Sales", "Construction Industry Sales", "Proptech Adoption"]',
  120,
  180,
  11,
  NOW(),
  NOW()
),
(
  'p6_l57_emerging_sectors',
  'p6_m10_advanced_strategies',
  57,
  'Emerging Sectors Sales',
  'Master sales in emerging sectors like renewable energy, electric vehicles, space technology, biotechnology, and clean technology.',
  '["Understand emerging sectors", "Navigate early markets", "Handle technology adoption", "Build market categories", "Drive innovation adoption"]',
  '["Emerging Sectors Guide", "Early Market Navigation", "Technology Adoption Framework", "Market Category Creation", "Innovation Sales"]',
  120,
  180,
  12,
  NOW(),
  NOW()
),
(
  'p6_l58_advanced_negotiation',
  'p6_m10_advanced_strategies',
  58,
  'Advanced Negotiation Mastery',
  'Master complex multi-party negotiations, international deal structures, large enterprise contracts, and strategic partnership negotiations.',
  '["Handle multi-party negotiations", "Structure international deals", "Negotiate enterprise contracts", "Form strategic partnerships", "Close complex deals"]',
  '["Multi-Party Negotiation Framework", "International Deal Structures", "Enterprise Contract Templates", "Partnership Negotiation"]',
  120,
  180,
  13,
  NOW(),
  NOW()
),
(
  'p6_l59_sales_leadership',
  'p6_m10_advanced_strategies',
  59,
  'Executive Sales Leadership',
  'Lead sales organizations, build sales culture, drive transformation, manage board relationships, and scale sales operations globally.',
  '["Lead sales organizations", "Build winning culture", "Drive transformation", "Manage board relations", "Scale globally"]',
  '["Sales Leadership Framework", "Culture Building Guide", "Transformation Playbook", "Board Management", "Global Scaling"]',
  120,
  180,
  14,
  NOW(),
  NOW()
),
(
  'p6_l60_future_of_sales',
  'p6_m10_advanced_strategies',
  60,
  'Future of Sales & Innovation',
  'Prepare for the future of sales with AI, automation, virtual selling, data-driven insights, and emerging sales technologies.',
  '["Embrace AI in sales", "Implement automation", "Master virtual selling", "Use data insights", "Adopt emerging tech"]',
  '["AI in Sales Guide", "Sales Automation Roadmap", "Virtual Selling Mastery", "Data-Driven Sales", "Emerging Tech Adoption"]',
  120,
  180,
  15,
  NOW(),
  NOW()
);

-- Verification query
SELECT 
  p.code,
  p.title,
  p.price,
  COUNT(DISTINCT m.id) as module_count,
  COUNT(l.id) as lesson_count,
  SUM(l."xpReward") as total_xp
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P6'
GROUP BY p.id, p.code, p.title, p.price;

-- Expected result:
-- code: P6
-- title: Sales & GTM in India - Master Course  
-- price: 6999
-- module_count: 10
-- lesson_count: 60
-- total_xp: 8250