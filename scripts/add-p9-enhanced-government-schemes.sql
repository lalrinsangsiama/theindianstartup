-- P9: Government Schemes & Funding Mastery - ENHANCED VERSION
-- Based on comprehensive content from "The Indian Entrepreneur's Advantage" with detailed case studies, calculators, and practical tools
-- This script creates the most comprehensive government schemes course with specific amounts, real case studies, and step-by-step tools

-- Insert P9 Product (Enhanced)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p9_government_schemes',
  'P9',
  'Government Schemes & Funding Mastery',
  'Master access to ₹50L-₹5Cr government funding through 100+ schemes. Includes detailed case studies, calculators, 30-day action plans, and proven templates used by entrepreneurs who accessed ₹45L+ benefits.',
  4999,
  false,
  21,
  NOW(),
  NOW()
);

-- Insert Enhanced Modules for P9
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt") VALUES

-- Module 1: Foundation & Ecosystem Navigation (Days 1-5)
('p9_m1_foundation', 'p9_government_schemes', 'Foundation & Ecosystem Navigation', 'Master the ₹2.5L crore ecosystem, 23-ministry navigation, and your personal benefits calculator', 1, NOW(), NOW()),

-- Module 2: The Money Map - Detailed Funding Strategies (Days 6-12)
('p9_m2_funding', 'p9_government_schemes', 'The Money Map - Funding Strategies', 'Deep-dive into grants, loans, equity with real case studies and stacking strategies for ₹2-5Cr combinations', 2, NOW(), NOW()),

-- Module 3: Category & Sector Mastery (Days 13-17)
('p9_m3_advantages', 'p9_government_schemes', 'Category & Sector Mastery', 'Unlock enhanced benefits: Women (+10%), SC/ST (+20%), Manufacturing PLI, Tech exemptions, State bonuses', 3, NOW(), NOW()),

-- Module 4: Implementation Mastery & Tools (Days 18-21)
('p9_m4_implementation', 'p9_government_schemes', 'Implementation Mastery & Tools', 'Master application systems, documentation mastery, GeM access, and your 90-day ₹10-50L roadmap', 4, NOW(), NOW());

-- Insert Enhanced Detailed Lessons with Real Case Studies and Tools
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES

-- MODULE 1: Foundation & Ecosystem Navigation (Days 1-5)
('p9_l1', 'p9_m1_foundation', 1, 'The ₹2.5L Crore Hidden Goldmine Decoded', 
'Discover why 95% of entrepreneurs never access the annual ₹2.5 lakh crore government support budget. Learn the 23-ministry ecosystem architecture and how Priya accessed 8 ministries for ₹45L+ benefits. Master the multi-layered system that most founders miss completely.',
'[{"task": "Complete ecosystem awareness quiz", "description": "Test your knowledge of the ₹2.5L crore support system with our diagnostic tool"}, {"task": "Use the Benefits Calculator", "description": "Calculate your potential funding pool across ministries (target: ₹50L-5Cr)"}, {"task": "Study Priya''s case study", "description": "Analyze how one entrepreneur accessed ₹45L across 8 ministries in 12 months"}]',
'[{"title": "₹2.5L Crore Budget Breakdown Interactive Map", "url": "#", "type": "interactive"}, {"title": "23-Ministry Function Matrix", "url": "#", "type": "reference"}, {"title": "Personal Benefits Calculator", "url": "#", "type": "calculator"}, {"title": "Priya''s ₹45L Journey Case Study", "url": "#", "type": "case-study"}]',
75, 75, 1, NOW(), NOW()),

('p9_l2', 'p9_m1_foundation', 2, 'Ministry Navigation GPS & Contact Mastery', 
'Master the art of navigating 23 ministries: MSME (general), DPIIT (startups), SIDBI (loans), NABARD (rural), MeitY (tech), Commerce (exports). Learn the multiplier secret: how entrepreneurs legally tap 4-8 ministries simultaneously for compound benefits.',
'[{"task": "Build your ministry cluster map", "description": "Identify your 3-5 core ministries based on sector, stage, and category"}, {"task": "Create contact database", "description": "Build personalized contact list with officials, portals, and helpline numbers"}, {"task": "Master the GPS commands", "description": "Learn quick navigation shortcuts for common funding needs"}]',
'[{"title": "Ministry Function Quick Reference Guide", "url": "#", "type": "reference"}, {"title": "Ministry Contact Database Template", "url": "#", "type": "template"}, {"title": "GPS Quick Commands Cheat Sheet", "url": "#", "type": "cheatsheet"}, {"title": "Multi-Ministry Success Stories", "url": "#", "type": "case-studies"}]',
75, 75, 2, NOW(), NOW()),

('p9_l3', 'p9_m1_foundation', 3, 'Documentation Mastery & 15-Document Power', 
'Master the 15 core documents that unlock 90% of all schemes. Complete the 7-day documentation transformation: Udyam registration (10 minutes = 200+ schemes), GST setup, digital organization system. Learn the One-Source-of-Truth method used by successful entrepreneurs.',
'[{"task": "Complete Udyam registration", "description": "Get your 12-digit Udyam number - gateway to 200+ schemes (10 minutes investment)"}, {"task": "Set up One-Source-of-Truth system", "description": "Implement digital organization system that saves 50+ hours annually"}, {"task": "Complete documentation scorecard", "description": "Use our 100-point checklist to achieve Document Master status"}]',
'[{"title": "15 Core Documents Checklist", "url": "#", "type": "checklist"}, {"title": "7-Day Documentation Transformation Plan", "url": "#", "type": "plan"}, {"title": "One-Source-of-Truth Setup Guide", "url": "#", "type": "guide"}, {"title": "Document Master Scorecard", "url": "#", "type": "scorecard"}]',
60, 75, 3, NOW(), NOW()),

('p9_l4', 'p9_m1_foundation', 4, '10-Minute Eligibility Scanner & Benefits Calculator', 
'Use our proprietary assessment tool to identify eligible schemes in 10 minutes. See real example: Food Processing + Woman + Rural + Karnataka = ₹85.5L total benefits. Get your personalized report with priority schemes and timeline.',
'[{"task": "Complete 10-minute assessment", "description": "Use the eligibility scanner to identify your top 20 schemes with amounts"}, {"task": "Analyze your benefits report", "description": "Review personalized report showing potential ₹85.5L+ total benefits"}, {"task": "Create priority application list", "description": "Rank schemes by ROI, ease, and deadlines for optimal sequence"}]',
'[{"title": "10-Minute Eligibility Scanner Tool", "url": "#", "type": "interactive"}, {"title": "Benefits Calculator (₹85.5L Example)", "url": "#", "type": "calculator"}, {"title": "Personalized Scheme Report Generator", "url": "#", "type": "generator"}, {"title": "Priority Matrix Template", "url": "#", "type": "template"}]',
45, 75, 4, NOW(), NOW()),

('p9_l5', 'p9_m1_foundation', 5, '30-Day Navigation Plan & Quick Wins', 
'Master the 30-day navigation plan used by successful entrepreneurs. Week 1: Base camp (registrations), Week 2: Territory exploration (scheme identification), Week 3: Route plotting (applications), Week 4: Journey begins (submissions). Target: First approvals within 30 days.',
'[{"task": "Complete Week 1 base camp", "description": "Finish all registrations and documentation setup within 7 days"}, {"task": "Execute territory exploration", "description": "Identify and prioritize your top 20 schemes with calculated benefits"}, {"task": "Create your journey timeline", "description": "Plot 30-day, 90-day, and 6-month funding acquisition roadmap"}]',
'[{"title": "30-Day Navigation Master Plan", "url": "#", "type": "plan"}, {"title": "Weekly Action Checklists", "url": "#", "type": "checklists"}, {"title": "Journey Timeline Template", "url": "#", "type": "template"}, {"title": "Quick Wins Strategy Guide", "url": "#", "type": "guide"}]',
75, 75, 5, NOW(), NOW()),

-- MODULE 2: The Money Map - Detailed Funding Strategies (Days 6-12)
('p9_l6', 'p9_m2_funding', 6, 'Government Grants Mastery - ₹17.5L Free Money', 
'Master grants that never need repayment: PMEGP (35% subsidy on ₹50L = ₹17.5L free), Food Processing (35% capital grant), PLI schemes (₹1.97L Cr budget), STPI (99% tax exemption worth crores). Learn Kavitha''s ₹92L grant stacking strategy.',
'[{"task": "Map your grant opportunities", "description": "Identify applicable grants with exact amounts and percentages for your sector"}, {"task": "Study Kavitha''s ₹92L case", "description": "Analyze how she combined 8 schemes for manufacturing pivot success"}, {"task": "Calculate your grant potential", "description": "Use sector-specific calculators to estimate maximum free money available"}]',
'[{"title": "25+ Grant Schemes Database with Exact Amounts", "url": "#", "type": "database"}, {"title": "Kavitha''s ₹92L Grant Stacking Case Study", "url": "#", "type": "case-study"}, {"title": "Grant Calculator by Sector", "url": "#", "type": "calculator"}, {"title": "Winning Application Templates", "url": "#", "type": "templates"}]',
90, 75, 6, NOW(), NOW()),

('p9_l7', 'p9_m2_funding', 7, 'MUDRA, PMEGP & Subsidized Loan Secrets', 
'Deep-dive into loan schemes: MUDRA (₹10L at 0% processing), Stand-Up India (₹10L-₹1Cr for women/SC-ST), PMEGP (₹50L with 35% subsidy). Master bank negotiation with CGTMSE (85% guarantee for women). Learn the Raj Brothers'' ₹133L technique.',
'[{"task": "Calculate exact loan eligibility", "description": "Determine maximum amounts across MUDRA (₹10L), Stand-Up India (₹1Cr), PMEGP (₹50L)"}, {"task": "Master CGTMSE advantage", "description": "Understand 85% guarantee for women vs 75% for others and bank negotiations"}, {"task": "Study Raj Brothers case", "description": "Learn their ₹133L scheme combination for dhaba-to-cloud kitchen transformation"}]',
'[{"title": "Loan Scheme Comparison with Exact Rates", "url": "#", "type": "comparison"}, {"title": "CGTMSE Guarantee Calculator", "url": "#", "type": "calculator"}, {"title": "Raj Brothers ₹133L Case Study", "url": "#", "type": "case-study"}, {"title": "Bank Negotiation Scripts", "url": "#", "type": "scripts"}]',
90, 75, 7, NOW(), NOW()),

('p9_l8', 'p9_m2_funding', 8, 'Hidden High-Value Schemes & Treasure Hunt', 
'Access lesser-known gems: SFURTI (₹5Cr cluster development), ASPIRE (₹1Cr for tier-2 cities), CLCSS (15% tech upgrade to ₹1Cr), Venture Capital for SC/ST (₹5Cr equity). Master the treasure hunt mindset that finds opportunities others miss.',
'[{"task": "Explore hidden scheme opportunities", "description": "Research SFURTI, ASPIRE, CLCSS, and category-specific high-value schemes"}, {"task": "Assess cluster/group opportunities", "description": "Identify if you can form groups for ₹5Cr SFURTI or similar benefits"}, {"task": "Create treasure hunt system", "description": "Set up alerts and monitoring for new or underutilized high-value schemes"}]',
'[{"title": "Hidden High-Value Schemes Database", "url": "#", "type": "database"}, {"title": "Cluster Formation Guide for ₹5Cr Benefits", "url": "#", "type": "guide"}, {"title": "Treasure Hunt Monitoring System", "url": "#", "type": "system"}, {"title": "Underutilized Schemes Alert Setup", "url": "#", "type": "setup"}]',
75, 75, 8, NOW(), NOW()),

('p9_l9', 'p9_m2_funding', 9, 'Startup India Seed Fund & Equity Mastery', 
'Navigate equity funding systematically: Startup India Seed Fund (₹20L debt + ₹50L equity), Fund of Funds (₹10,000Cr corpus), Angel Tax exemption process. Learn Amit''s journey from IIT idea to ₹25Cr valuation using government equity support.',
'[{"task": "Assess equity readiness", "description": "Evaluate if your startup meets SISFS criteria and equity funding requirements"}, {"task": "Prepare seed fund applications", "description": "Complete Startup India Seed Fund documentation for ₹20L debt + ₹50L equity"}, {"task": "Study Amit''s ₹25Cr journey", "description": "Learn how government equity support led to private Series A and ₹25Cr valuation"}]',
'[{"title": "Startup India Seed Fund Complete Kit", "url": "#", "type": "kit"}, {"title": "Amit''s ₹25Cr Equity Journey Case Study", "url": "#", "type": "case-study"}, {"title": "Angel Tax Exemption Process Guide", "url": "#", "type": "guide"}, {"title": "Equity Readiness Assessment", "url": "#", "type": "assessment"}]',
75, 75, 9, NOW(), NOW()),

('p9_l10', 'p9_m2_funding', 10, 'Legal Grant Stacking & ₹2-5Cr Combinations', 
'Master the art of legal scheme combinations. Learn the Route B strategy: 90-day ₹50L funding vs traditional 180-day process. Understand which schemes stack legally and create ₹2-5Cr funding combinations used by successful entrepreneurs.',
'[{"task": "Design optimal funding route", "description": "Plan Route B (90-day) vs Route A (180-day) for ₹50L+ funding goals"}, {"task": "Map legal stacking opportunities", "description": "Identify which schemes combine legally for ₹2-5Cr total benefits"}, {"task": "Create stacking timeline", "description": "Sequence applications optimally to maximize benefits and minimize conflicts"}]',
'[{"title": "Legal Stacking Matrix (₹2-5Cr Combinations)", "url": "#", "type": "matrix"}, {"title": "Route Optimization Guide (90-day vs 180-day)", "url": "#", "type": "guide"}, {"title": "Stacking Timeline Templates", "url": "#", "type": "templates"}, {"title": "₹2-5Cr Success Case Studies", "url": "#", "type": "case-studies"}]',
75, 75, 10, NOW(), NOW()),

('p9_l11', 'p9_m2_funding', 11, 'R&D Funding & Innovation Support Deep-Dive', 
'Access innovation funding systematically: Technology Development Board (₹5-50Cr), BIRAC (₹50L-10Cr biotech), DST schemes, CSIR funding. Master R&D tax benefits (200% deduction) and the Multiplier Grants Scheme (2x matching funds).',
'[{"task": "Map R&D funding landscape", "description": "Identify relevant innovation schemes: TDB, BIRAC, DST, CSIR based on your technology"}, {"task": "Plan R&D tax optimization", "description": "Calculate 200% tax deduction benefits and implementation strategy"}, {"task": "Explore Multiplier Grants", "description": "Understand 2x government matching for industry-academia R&D collaboration"}]',
'[{"title": "R&D Funding Schemes by Technology Sector", "url": "#", "type": "database"}, {"title": "200% R&D Tax Deduction Calculator", "url": "#", "type": "calculator"}, {"title": "Multiplier Grants Scheme Guide", "url": "#", "type": "guide"}, {"title": "Innovation Documentation Templates", "url": "#", "type": "templates"}]',
75, 75, 11, NOW(), NOW()),

('p9_l12', 'p9_m2_funding', 12, 'Financial Modeling & ROI Optimization', 
'Build 5-year financial models incorporating all government support. Calculate scheme ROI: time invested vs funding received. Create funding pipeline for continuous access. Master the financial planning that turns schemes into sustainable growth engines.',
'[{"task": "Build comprehensive financial model", "description": "Create 5-year projections including all grants, loans, and tax benefits"}, {"task": "Calculate scheme ROI metrics", "description": "Measure return on time/effort invested across different schemes"}, {"task": "Design funding pipeline system", "description": "Create systematic approach for ongoing scheme applications and renewals"}]',
'[{"title": "5-Year Financial Model Template with Schemes", "url": "#", "type": "template"}, {"title": "Scheme ROI Calculator & Analytics", "url": "#", "type": "calculator"}, {"title": "Funding Pipeline Management System", "url": "#", "type": "system"}, {"title": "Continuous Access Strategy Guide", "url": "#", "type": "strategy"}]',
75, 75, 12, NOW(), NOW()),

-- MODULE 3: Category & Sector Mastery (Days 13-17)
('p9_l13', 'p9_m3_advantages', 13, 'Manufacturing PLI & Make in India Mastery', 
'Unlock manufacturing powerhouse benefits: PLI (₹1.97L Cr across 14 sectors, 4-6% turnover incentives), TUFS (10% capital subsidy), Industrial parks. Sector specifics: Auto (25%), Electronics (6%), Textiles (15% PowerTex). Master the manufacturing advantage.',
'[{"task": "Map your PLI opportunities", "description": "Identify specific PLI schemes in your sector with exact incentive percentages"}, {"task": "Calculate TUFS benefits", "description": "Estimate technology upgradation fund benefits for equipment and machinery"}, {"task": "Research industrial park advantages", "description": "Find parks offering maximum infrastructure benefits and tax advantages"}]',
'[{"title": "PLI Schemes Guide (14 Sectors with Exact Rates)", "url": "#", "type": "guide"}, {"title": "TUFS Benefits Calculator", "url": "#", "type": "calculator"}, {"title": "Industrial Parks Database with Benefits", "url": "#", "type": "database"}, {"title": "Manufacturing Success Case Studies", "url": "#", "type": "case-studies"}]',
90, 75, 13, NOW(), NOW()),

('p9_l14', 'p9_m3_advantages', 14, 'Technology & Digital Economy Advantages', 
'Access tech ecosystem benefits: Software Export (STPI 99% tax exemption worth crores), Patent support (80% fee reduction), 100+ AICs (₹10L seed funding), TBI funding (₹50L-2Cr). Master the complete tech entrepreneur support system.',
'[{"task": "Evaluate STPI registration benefits", "description": "Calculate 99% tax exemption value for your software/IT services business"}, {"task": "Plan IP protection strategy", "description": "Use government patent support for 80% cost reduction on filing and prosecution"}, {"task": "Target tech incubators", "description": "Apply to 3-5 government incubators offering ₹10L-2Cr funding and support"}]',
'[{"title": "STPI Benefits Calculator (99% Tax Exemption)", "url": "#", "type": "calculator"}, {"title": "Patent Support Schemes (80% Savings)", "url": "#", "type": "schemes"}, {"title": "Tech Incubator Directory with Funding", "url": "#", "type": "directory"}, {"title": "Digital Economy Success Stories", "url": "#", "type": "stories"}]',
75, 75, 14, NOW(), NOW()),

('p9_l15', 'p9_m3_advantages', 15, 'Women Entrepreneurs - The Extra 10% Edge', 
'Unlock women-specific advantages: Enhanced subsidies (+5-10% across schemes), 85% credit guarantee vs 75% for others, Mahila E-Haat platform, Stand-Up India (₹10L-1Cr), Udyogini scheme. Master the systematic advantage that women entrepreneurs possess.',
'[{"task": "Calculate enhanced benefit amounts", "description": "Quantify the additional 5-10% subsidies across all applicable schemes"}, {"task": "Master Mahila E-Haat platform", "description": "Set up comprehensive profile and leverage free marketing opportunities"}, {"task": "Optimize credit guarantee advantage", "description": "Use 85% vs 75% CGTMSE advantage for better loan negotiations"}]',
'[{"title": "Women-Specific Enhanced Benefits Calculator", "url": "#", "type": "calculator"}, {"title": "Mahila E-Haat Success Strategies", "url": "#", "type": "strategies"}, {"title": "85% Credit Guarantee Optimization Guide", "url": "#", "type": "guide"}, {"title": "Women Entrepreneur Networks", "url": "#", "type": "networks"}]',
75, 75, 15, NOW(), NOW()),

('p9_l16', 'p9_m3_advantages', 16, 'SC/ST, OBC & Minority Funding Advantages', 
'Access special category benefits: NSFDC loans (₹15L at 5% interest), NSKFDC (₹7.5L for minorities), 15-20% additional subsidies across schemes, reserved procurement quotas, dedicated VC funds (₹5Cr equity). Master category-specific advantages.',
'[{"task": "Map category-specific benefits", "description": "Calculate total additional subsidies (15-20%) across all applicable schemes"}, {"task": "Research dedicated funding sources", "description": "Explore NSFDC, NSKFDC, and specialized venture capital opportunities"}, {"task": "Understand procurement reservations", "description": "Learn how to access reserved quotas in government procurement"}]',
'[{"title": "Category Benefits Enhancement Matrix", "url": "#", "type": "matrix"}, {"title": "NSFDC/NSKFDC Complete Loan Guide", "url": "#", "type": "guide"}, {"title": "Reserved Procurement Access Process", "url": "#", "type": "process"}, {"title": "₹5Cr Equity Funding Opportunities", "url": "#", "type": "opportunities"}]',
75, 75, 16, NOW(), NOW()),

('p9_l17', 'p9_m3_advantages', 17, 'State-wise Benefits & Location Optimization', 
'Master state advantages: Gujarat (25% capital subsidy), Maharashtra (25% for priority districts), Karnataka (₹100Cr startup fund), Telangana (T-Hub ecosystem), Rajasthan (35% investment subsidy). Learn location optimization strategies for maximum benefits.',
'[{"task": "Analyze your state benefits", "description": "Research comprehensive state-specific incentives, subsidies, and support programs"}, {"task": "Compare interstate opportunities", "description": "Evaluate if operations in other states offer significantly better benefits"}, {"task": "Plan multi-state strategy", "description": "Design operations across states to legally maximize total benefits"}]',
'[{"title": "28 States + 8 UTs Complete Benefits Database", "url": "#", "type": "database"}, {"title": "Interstate Benefits Comparison Tool", "url": "#", "type": "tool"}, {"title": "Multi-state Operations Strategy Guide", "url": "#", "type": "guide"}, {"title": "Location Optimization Success Cases", "url": "#", "type": "cases"}]',
90, 75, 17, NOW(), NOW()),

-- MODULE 4: Implementation Mastery & Tools (Days 18-21)
('p9_l18', 'p9_m4_implementation', 18, 'Application System Mastery & Templates', 
'Master the application system using 30+ proven templates: Project reports, DPR formats, financial projections. Learn the tracking system that ensures 100% follow-through. Implement the One-Source-of-Truth documentation approach for maximum efficiency.',
'[{"task": "Set up master application system", "description": "Implement comprehensive tracking for all applications with automated reminders"}, {"task": "Customize proven templates", "description": "Adapt 30+ professional templates for your specific business and sectors"}, {"task": "Implement follow-up system", "description": "Set up systematic follow-up processes to ensure applications progress efficiently"}]',
'[{"title": "30+ Professional Application Templates", "url": "#", "type": "templates"}, {"title": "Master Application Tracking System", "url": "#", "type": "system"}, {"title": "Follow-up and Escalation Protocols", "url": "#", "type": "protocols"}, {"title": "100% Success Rate Optimization Guide", "url": "#", "type": "guide"}]',
90, 75, 18, NOW(), NOW()),

('p9_l19', 'p9_m4_implementation', 19, 'GeM Mastery & Government Customer Pipeline', 
'Master Government e-Marketplace (₹1L Cr+ procurement): Registration optimization, MSME 25% reservation advantage, tender strategies. Build government customer pipeline worth ₹50L-5Cr annually. Learn the GeM success framework used by smart entrepreneurs.',
'[{"task": "Optimize GeM registration", "description": "Create comprehensive profile maximizing visibility and category coverage"}, {"task": "Master tender participation", "description": "Identify and analyze high-probability tenders with detailed bidding strategies"}, {"task": "Build government sales pipeline", "description": "Create systematic approach to win ₹50L-5Cr in government contracts annually"}]',
'[{"title": "GeM Optimization Complete Guide", "url": "#", "type": "guide"}, {"title": "Tender Analysis & Bidding Toolkit", "url": "#", "type": "toolkit"}, {"title": "Government Sales Pipeline System", "url": "#", "type": "system"}, {"title": "₹50L-5Cr GeM Success Case Studies", "url": "#", "type": "case-studies"}]',
90, 75, 19, NOW(), NOW()),

('p9_l20', 'p9_m4_implementation', 20, 'Export Benefits & International Market Access', 
'Master export support ecosystem: ECGC (90% risk coverage), MAI benefits, Trade fair subsidies (75%), Duty drawback, MEIS/SEIS benefits. Build systematic ₹1-10Cr export pipeline with government support as your competitive advantage.',
'[{"task": "Assess export readiness", "description": "Complete export readiness evaluation and identify government support opportunities"}, {"task": "Plan comprehensive export strategy", "description": "Map all available export benefits: ECGC, subsidies, trade fair support"}, {"task": "Build international pipeline", "description": "Create systematic approach to access global markets with government backing"}]',
'[{"title": "Complete Export Benefits Master Guide", "url": "#", "type": "guide"}, {"title": "Export Readiness Assessment Tool", "url": "#", "type": "tool"}, {"title": "₹1-10Cr Export Pipeline Builder", "url": "#", "type": "builder"}, {"title": "International Market Access Roadmap", "url": "#", "type": "roadmap"}]',
75, 75, 20, NOW(), NOW()),

('p9_l21', 'p9_m4_implementation', 21, 'Your 90-Day ₹10-50L Action Roadmap', 
'Your complete implementation roadmap: Week 1-2 (Base camp setup), Week 3-4 (Scheme applications), Week 5-8 (Follow-up & optimization), Week 9-12 (First approvals & scaling). Target: ₹10-50L in benefits within first 90 days using proven frameworks.',
'[{"task": "Finalize personalized 90-day plan", "description": "Complete your detailed roadmap targeting ₹10-50L in first 90 days"}, {"task": "Set up success tracking dashboard", "description": "Implement KPI tracking: applications, approvals, funding received, timeline"}, {"task": "Plan continuous optimization", "description": "Set up systems for ongoing scheme monitoring and pipeline expansion"}]',
'[{"title": "90-Day ₹10-50L Implementation Roadmap", "url": "#", "type": "roadmap"}, {"title": "Success Tracking Dashboard Template", "url": "#", "type": "dashboard"}, {"title": "Continuous Optimization System", "url": "#", "type": "system"}, {"title": "Document Master Certification", "url": "#", "type": "certification"}]',
90, 75, 21, NOW(), NOW());

-- Update All-Access Bundle to include P9 (PostgreSQL compatible syntax)
UPDATE "Product" 
SET 
  description = 'All 9 products included - complete startup ecosystem access with 45% savings (₹20,989 off)',
  price = 24999,
  "bundleProducts" = '["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9"]'::jsonb,
  "updatedAt" = NOW()
WHERE code = 'ALL_ACCESS';

-- Create helpful indexes for optimized performance
CREATE INDEX IF NOT EXISTS idx_lesson_module_day ON "Lesson" ("moduleId", day);
CREATE INDEX IF NOT EXISTS idx_module_product_order ON "Module" ("productId", "orderIndex");
CREATE INDEX IF NOT EXISTS idx_product_code ON "Product" (code);

-- Verification query to confirm P9 setup
SELECT 
  p.code,
  p.title,
  p.price,
  COUNT(DISTINCT m.id) as module_count,
  COUNT(DISTINCT l.id) as lesson_count,
  SUM(l."xpReward") as total_xp
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P9'
GROUP BY p.id, p.code, p.title, p.price;