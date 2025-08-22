-- P8: Modules and Lessons Only Migration
-- Date: 2025-08-21

BEGIN;

-- Delete existing modules and lessons for P8 to recreate with enhanced content  
DELETE FROM "Lesson" WHERE "moduleId" IN (
    SELECT id FROM "Module" WHERE "productId" = 'p8_investor_ready'
);
DELETE FROM "Module" WHERE "productId" = 'p8_investor_ready';

-- Create 8 comprehensive modules for P8
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p8_mod_1', 'p8_investor_ready',
    'Investor Psychology & Data Room Architecture Mastery',
    'Master VC decision psychology and Goldman Sachs-standard data room architecture. Learn exact frameworks used by top-tier investors to evaluate startups within 15 minutes.',
    1, NOW(), NOW()
),
(
    'p8_mod_2', 'p8_investor_ready', 
    'Legal Foundation Excellence',
    'Build bulletproof legal infrastructure with corporate governance, IP protection, and compliance frameworks that pass rigorous institutional due diligence.',
    2, NOW(), NOW()
),
(
    'p8_mod_3', 'p8_investor_ready',
    'Financial Excellence - CFO-Grade Infrastructure', 
    'Create investment banking-grade financial models, projections, and statements that demonstrate clear path to profitability and justify target valuations.',
    3, NOW(), NOW()
),
(
    'p8_mod_4', 'p8_investor_ready',
    'Business Operations Excellence',
    'Document systematic operations with market analysis, customer success metrics, and scalable processes that prove execution capability.',
    4, NOW(), NOW()
),
(
    'p8_mod_5', 'p8_investor_ready',
    'Team & Human Capital Excellence', 
    'Showcase team strength with leadership profiles, organizational design, and culture documentation that demonstrates scalability.',
    5, NOW(), NOW()
),
(
    'p8_mod_6', 'p8_investor_ready',
    'Customer & Revenue Excellence',
    'Prove product-market fit with customer analytics, revenue quality metrics, and success stories that validate market opportunity.',
    6, NOW(), NOW()
),
(
    'p8_mod_7', 'p8_investor_ready',
    'Due Diligence Preparation Mastery',
    'Master comprehensive due diligence preparation with Q&A frameworks, red flag remediation, and negotiation strategies.',
    7, NOW(), NOW()
),
(
    'p8_mod_8', 'p8_investor_ready', 
    'Advanced Topics & Crisis Management',
    'Navigate complex scenarios including crisis management, down rounds, international expansion, and M&A preparation.',
    8, NOW(), NOW()
);

-- Create comprehensive lessons for each module
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
-- Module 1 Lessons
(
    'p8_l1', 'p8_mod_1', 1,
    'Decoding the VC Mind - Investment Decision Psychology',
    'Exclusive masterclass with former Sequoia Capital Partner revealing how VCs make ₹100Cr+ decisions within 15 minutes. Master Goldman Sachs 7-point risk evaluation matrix.',
    '[
        "Complete investor psychology assessment using Sequoia framework",
        "Identify 10 potential red flags using AI-powered analyzer", 
        "Build risk mitigation strategy for top 3 risks",
        "Create investor persona profiles for 5 target VCs",
        "Complete VC simulation exercise with 5 sample data rooms",
        "Watch 90-minute masterclass with former Sequoia Partner"
    ]',
    '{
        "masterclass": "Former Sequoia Capital Partner - Investment Decision Psychology (90 min)",
        "templates": ["Investor Decision Tree Analyzer", "Risk Assessment Matrix", "VC Interview Prep"],
        "tools": ["AI Red Flag Identifier", "VC Simulation Platform", "Psychology Assessment"]
    }',
    90, 100, 1, NOW(), NOW()
),
(
    'p8_l2', 'p8_mod_1', 2,
    'Data Room Architecture - Goldman Sachs Standard',
    'Learn exact 10-folder structure used for ₹1000Cr+ deals. Master cognitive load theory and predictive navigation enabling <60 second document discovery.',
    '[
        "Implement Goldman Sachs 10-folder structure",
        "Apply professional naming conventions across documents",
        "Set up comprehensive version control system", 
        "Create access permission matrix for investor types",
        "Complete Data Room Builder simulation",
        "Test navigation efficiency for <60 second discovery"
    ]',
    '{
        "templates": ["Goldman Sachs Folder Structure", "Naming Convention Guide", "Version Control System"],
        "expert": "Ex-Goldman Sachs Investment Banker on data room secrets",
        "tools": ["Interactive Data Room Builder", "Navigation Speed Tester"]
    }',
    90, 100, 2, NOW(), NOW()
),
(
    'p8_l3', 'p8_mod_1', 3,
    'Stage-Specific Data Room Engineering',
    'Master evolution from pre-seed (₹25L) to pre-IPO requirements. Learn from CFOs who navigated multiple rounds and M&A vs investment differences.',
    '[
        "Assess current funding stage requirements",
        "Identify critical gaps for your specific stage",
        "Create upgrade roadmap for next funding level",
        "Implement stage-appropriate improvements",
        "Study Razorpay seed to Series E evolution",
        "Plan M&A vs investment differentiation"
    ]',
    '{
        "templates": ["Stage-Specific Checklists", "Upgrade Timeline Planner", "Benchmark Framework"],
        "case_studies": ["Razorpay evolution", "Freshworks IPO prep", "Paytm M&A vs IPO"],
        "expert_panel": "CFOs from multiple funding stages"
    }',
    90, 100, 3, NOW(), NOW()
),
(
    'p8_l4', 'p8_mod_1', 4,
    'Advanced Document Indexing & Search Optimization',
    'Implement AI-powered indexing and metadata management from top law firms. Master cross-referencing and compliance mapping for instant discovery.',
    '[
        "Set up AI-powered document indexing system",
        "Create comprehensive metadata framework",
        "Implement cross-reference linking system",
        "Optimize search for <10 second discovery",
        "Complete document lifecycle management",
        "Test search efficiency and optimization"
    ]',
    '{
        "templates": ["AI Indexing Setup", "Metadata Framework", "Cross-Reference System"],
        "expert": "Legal Tech Expert from Khaitan & Co",
        "tools": ["AI Indexing Platform", "Search Optimization Suite"]
    }',
    90, 100, 4, NOW(), NOW()
),
(
    'p8_l5', 'p8_mod_1', 5,
    'Enterprise Security & Compliance Framework',
    'Implement bank-grade security with multi-factor authentication, encryption, GDPR compliance, and disaster recovery planning.',
    '[
        "Implement enterprise-grade security measures",
        "Ensure GDPR and Indian data protection compliance",
        "Set up multi-layered access control matrix",
        "Create disaster recovery procedures",
        "Complete security audit with enterprise tools",
        "Test all security and backup systems"
    ]',
    '{
        "templates": ["Enterprise Security Checklist", "GDPR Compliance Framework", "Access Control Matrix"],
        "expert": "Cybersecurity Expert on enterprise data room security",
        "compliance": ["GDPR", "Indian data protection", "Industry-specific requirements"]
    }',
    90, 100, 5, NOW(), NOW()
),

-- Module 2 Lessons
(
    'p8_l6', 'p8_mod_2', 6,
    'Corporate Structure Documentation - Legal Fortress',
    'Build bulletproof corporate governance with AZB Partners insights. Master incorporation optimization, investor-friendly articles, world-class ESOP programs.',
    '[
        "Audit and optimize corporate structure",
        "Update Articles of Association for investor appeal",
        "Organize board resolutions systematically",
        "Design comprehensive ESOP documentation",
        "Implement subsidiary structure optimization",
        "Complete corporate governance assessment"
    ]',
    '{
        "templates": ["Investor-Friendly Articles", "Board Resolution Library", "ESOP Documentation Suite"],
        "expert": "AZB Partners Senior Partner on Corporate Governance",
        "case_studies": ["Flipkart ₹1,25,000Cr acquisition structure", "Zomato international expansion", "BYJU ESOP for talent"]
    }',
    120, 120, 6, NOW(), NOW()
),
(
    'p8_l7', 'p8_mod_2', 7,
    'Investment History & Shareholder Documentation Excellence',
    'Master complex investment structures including convertible notes, SAFE agreements, multi-tier shareholding for investor confidence building.',
    '[
        "Organize complete investment history documentation",
        "Create comprehensive cap table with dilution scenarios", 
        "Document convertible instruments and mechanics",
        "Prepare investor-ready investment summary",
        "Implement liquidation preference modeling",
        "Complete investment structure optimization"
    ]',
    '{
        "templates": ["Investment History Framework", "Cap Table with Dilution", "Convertible Tracking", "Liquidation Waterfall"],
        "frameworks": ["Investment timeline standards", "Shareholder optimization", "Conversion mechanics"]
    }',
    90, 100, 7, NOW(), NOW()
),

-- Module 3 Lessons
(
    'p8_l13', 'p8_mod_3', 13,
    'Investment-Grade Financial Statements Excellence',
    'Transform basic financials into investor-compelling narratives with Razorpay CFO insights. Create management accounts demonstrating financial discipline.',
    '[
        "Redesign financial statements using CFO playbook",
        "Create compelling growth narrative with key drivers",
        "Optimize notes to accounts for strategic insights",
        "Establish monthly reporting with KPI dashboards",
        "Complete auditor collaboration optimization",
        "Build growth metrics emphasizing VC priorities"
    ]',
    '{
        "templates": ["Investor-Grade Financial Statements", "Growth Narrative Framework", "KPI Dashboards"],
        "expert": "Razorpay CFO on Investment-Grade Financial Statements",
        "case_studies": ["Paytm ₹18,300Cr IPO evolution", "Zomato loss-to-profit narrative", "Freshworks US investor appeal"]
    }',
    120, 120, 13, NOW(), NOW()
),
(
    'p8_l14', 'p8_mod_3', 14,
    'Financial Modeling Mastery - The Valuation Engine',
    'Build institutional-grade models using ex-Goldman Sachs methodologies. Master unit economics, cohort analysis, scenario planning for premium valuations.',
    '[
        "Build comprehensive 5-year model using Goldman framework",
        "Optimize unit economics with sophisticated LTV/CAC analysis",
        "Create robust scenario planning with Monte Carlo simulations",
        "Integrate multiple valuation methodologies",
        "Complete sensitivity analysis on key drivers",
        "Build investor-ready financial dashboard"
    ]',
    '{
        "templates": ["Institutional 5-Year Model", "Unit Economics Suite", "Monte Carlo Framework", "Multi-Method Valuation"],
        "expert": "Ex-Goldman Sachs MD on Unicorn-Grade Financial Models (2 hours)",
        "case_studies": ["Ola ₹3,000Cr+ model", "Swiggy ₹10,000Cr+ valuation", "BYJU cohort analysis"]
    }',
    150, 150, 14, NOW(), NOW()
),

-- Module 4 Lessons
(
    'p8_l15', 'p8_mod_4', 15,
    'Market Analysis & Competitive Intelligence Excellence',
    'Create world-class market analysis with credible TAM/SAM/SOM, competitive positioning, customer segmentation demonstrating systematic market approach.',
    '[
        "Build comprehensive market analysis with credible sizing",
        "Create detailed competitive matrix with win/loss analysis",
        "Develop customer segmentation with market sizing",
        "Implement competitive intelligence tracking",
        "Complete business model optimization analysis",
        "Create strategic roadmap with measurable milestones"
    ]',
    '{
        "templates": ["Market Analysis with TAM/SAM/SOM", "Competitive Intelligence Matrix", "Customer Segmentation Framework"],
        "frameworks": ["Market sizing methodologies", "Competitive positioning", "Strategic roadmap planning"]
    }',
    120, 120, 15, NOW(), NOW()
),

-- Module 5 Lessons  
(
    'p8_l20', 'p8_mod_5', 20,
    'Leadership Excellence & Organizational Design',
    'Showcase exceptional team strength with leadership profiles, organizational design, culture documentation demonstrating execution capability and scalability.',
    '[
        "Create compelling founder and leadership profiles",
        "Design scalable organizational structure",
        "Document company culture and values framework",
        "Build advisory board value documentation",
        "Create succession planning for key positions",
        "Complete team capability competitive analysis"
    ]',
    '{
        "templates": ["Executive Leadership Profiles", "Organizational Design Framework", "Culture Documentation", "Advisory Board Value"],
        "frameworks": ["Leadership storytelling", "Organizational scalability", "Culture measurement"]
    }',
    90, 100, 20, NOW(), NOW()
),

-- Module 6 Lessons
(
    'p8_l23', 'p8_mod_6', 23,
    'Customer Analytics & Product-Market Fit Validation', 
    'Prove strong product-market fit with sophisticated analytics, cohort analysis, revenue quality metrics validating market opportunity and sustainability.',
    '[
        "Build comprehensive customer segmentation with behavioral analysis",
        "Create detailed cohort analysis showing retention and expansion",
        "Develop customer success metrics and NPS tracking", 
        "Document revenue quality and predictability indicators",
        "Complete customer concentration risk analysis",
        "Build reference customer and success story portfolio"
    ]',
    '{
        "templates": ["Customer Analytics Framework", "Cohort Analysis Suite", "Revenue Quality Tools", "Success Story Documentation"],
        "metrics": ["Customer segmentation", "Retention modeling", "Revenue predictability", "Success measurement"]
    }',
    120, 120, 23, NOW(), NOW()
),

-- Module 7 Lessons
(
    'p8_l26', 'p8_mod_7', 26,
    'Due Diligence Q&A Mastery & Red Flag Remediation',
    'Master comprehensive DD preparation with expert responses to 50+ questions, red flag remediation, negotiation preparation accelerating closure by 75%.',
    '[
        "Prepare comprehensive responses to 50+ standard DD questions",
        "Complete red flag identification and remediation",
        "Create optimized management presentation materials",
        "Build reference customer validation network",
        "Implement DD timeline and team coordination",
        "Master negotiation preparation and term sheet analysis"
    ]',
    '{
        "templates": ["DD Q&A Response Library (50+ responses)", "Red Flag Remediation Framework", "Management Presentation Templates"],
        "systems": ["DD Timeline Management", "Team Coordination", "Negotiation Preparation"]
    }',
    150, 150, 26, NOW(), NOW()
),

-- Module 8 Lessons
(
    'p8_l35', 'p8_mod_8', 35,
    'Crisis Management & Down Round Navigation Excellence',
    'Master crisis management with BYJU former CFO insights from ₹22,000 Cr to restructuring. Learn stakeholder communication and down round negotiation.',
    '[
        "Develop comprehensive crisis management protocols",
        "Master down round negotiation with valuation reset",
        "Create stakeholder communication for crisis scenarios",
        "Build operational restructuring frameworks",
        "Implement bridge financing coordination",
        "Complete turnaround planning with success metrics"
    ]',
    '{
        "templates": ["Crisis Management Protocol", "Down Round Negotiation Strategy", "Restructuring Plans", "Bridge Financing"],
        "expert": "BYJU Former CFO - Crisis Management During Down Rounds (2 hours)",
        "frameworks": ["90-day crisis response", "Stakeholder communication", "Valuation reset tactics"]
    }',
    180, 200, 35, NOW(), NOW()
),
(
    'p8_l42', 'p8_mod_8', 42,
    'International Expansion & Cross-Border Excellence',
    'Master international expansion with structure optimization, transfer pricing, multi-jurisdiction compliance for global scaling and investor access.',
    '[
        "Design optimal international structure for tax efficiency",
        "Create comprehensive transfer pricing documentation", 
        "Establish multi-jurisdiction compliance systems",
        "Build international banking and treasury procedures",
        "Implement global IP protection strategies",
        "Complete international expansion planning framework"
    ]',
    '{
        "templates": ["International Structure Optimization", "Transfer Pricing Suite", "Multi-Jurisdiction Compliance", "Global IP Protection"],
        "specializations": ["Singapore/US/Netherlands comparison", "Tax efficiency", "Regulatory compliance"]
    }',
    120, 150, 42, NOW(), NOW()
),
(
    'p8_l45', 'p8_mod_8', 45,
    'Capstone Project: Complete Investment-Ready Data Room',
    'Final integration creating complete institutional-grade data room with all course learnings, templates, frameworks for immediate fundraising success.',
    '[
        "Complete comprehensive data room using all templates",
        "Integrate financial models, legal docs, business strategy",
        "Implement AI optimization and analytics tracking",
        "Create investor outreach and communication strategy",
        "Build crisis management and special situations docs",
        "Complete triple certification with expert panel review"
    ]',
    '{
        "deliverables": ["Investment-Ready Data Room (150+ docs)", "Institutional Financial Model", "DD Q&A (50+ responses)", "Investor Strategy"],
        "assessment": ["Professional Quality", "Content Completeness", "Investor Readiness", "Implementation Excellence"], 
        "certifications": ["Investment Readiness", "Data Room Excellence (VC-endorsed)", "Financial Transparency (IB-validated)"]
    }',
    300, 500, 45, NOW(), NOW()
);

COMMIT;

SELECT 'P8: 8 Modules and 12 Comprehensive Lessons Successfully Created!' as status,
       COUNT(m.id) as total_modules,
       COUNT(l.id) as total_lessons
FROM "Module" m 
LEFT JOIN "Lesson" l ON m.id = l."moduleId" 
WHERE m."productId" = 'p8_investor_ready';