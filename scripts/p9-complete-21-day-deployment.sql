-- P9: Government Schemes & Funding Mastery - Complete 21-Day Course Deployment
-- Transform from 5 lessons to complete 21-day structure as promised

-- First, get the P9 product ID
DO $$
DECLARE
    p9_product_id TEXT;
    module1_id UUID;
    module2_id UUID;
    module3_id UUID;
    module4_id UUID;
BEGIN
    -- Get P9 product ID
    SELECT id INTO p9_product_id FROM "Product" WHERE code = 'P9';
    
    -- Delete existing modules and lessons to recreate with proper structure
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = p9_product_id
    );
    DELETE FROM "Module" WHERE "productId" = p9_product_id;
    
    -- Update P9 product information
    UPDATE "Product" 
    SET 
        title = 'Government Schemes & Funding Mastery - Complete 21-Day Transformation',
        description = 'Master the ₹8.5 Lakh Crore Government Ecosystem: From Village Panchayat to PMO - Your Ultimate Street-Smart Guide to Non-Dilutive Funding & Government Relationships',
        "estimatedDays" = 21,
        "updatedAt" = NOW()
    WHERE code = 'P9';
    
    -- Create 4 modules as promised
    INSERT INTO "Module" ("productId", title, description, "orderIndex", "createdAt", "updatedAt") VALUES
    (p9_product_id, 'Government Funding Universe - Foundation to Insider', 'How government funding actually works, who controls what, and why 94% of businesses fail to access it. Strategic ecosystem mapping, relationship identification, and advanced insider tactics.', 1, NOW(), NOW()),
    (p9_product_id, 'Strategic Government Relationships - The Art of Partnership', 'Understanding bureaucratic psychology, communication protocols, and relationship fundamentals. Building strategic networks across ministries and becoming a government strategic partner.', 2, NOW(), NOW()),
    (p9_product_id, 'Application Mastery & Documentation Excellence', 'Professional application writing, documentation requirements, and submission protocols. Multi-scheme coordination, timing strategies, and success optimization techniques.', 3, NOW(), NOW()),
    (p9_product_id, 'Execution, Compliance & Strategic Scaling', 'Fund management, compliance requirements, and reporting excellence. Scaling strategies, reinvestment approaches, and building government-backed business empires.', 4, NOW(), NOW());
    
    -- Get module IDs for lesson creation
    SELECT id INTO module1_id FROM "Module" WHERE "productId" = p9_product_id AND "orderIndex" = 1;
    SELECT id INTO module2_id FROM "Module" WHERE "productId" = p9_product_id AND "orderIndex" = 2;
    SELECT id INTO module3_id FROM "Module" WHERE "productId" = p9_product_id AND "orderIndex" = 3;
    SELECT id INTO module4_id FROM "Module" WHERE "productId" = p9_product_id AND "orderIndex" = 4;
    
    -- MODULE 1: Government Funding Universe - Foundation to Insider (Days 1-6)
    INSERT INTO "Lesson" ("moduleId", day, title, "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    
    -- Day 1
    (module1_id, 1, 'Government Funding 101 - How the ₹8.5 Lakh Crore Machine Actually Works', 
    'Understand how government funding decisions are actually made (not the official process). Map the complete government funding ecosystem from village to PMO level. Learn why most entrepreneurs fail and how to avoid their mistakes.',
    '[
        {"task": "Complete Strategic Government Readiness Assessment", "timeRequired": "60 minutes", "description": "Assess your business profile and identify immediate funding opportunities"},
        {"task": "Create Government Funding Opportunity Map", "timeRequired": "45 minutes", "description": "Research and map potential funding opportunities worth ₹2Cr+ total"},
        {"task": "Analyze Success Stories in Your Sector", "timeRequired": "30 minutes", "description": "Study 3 companies who secured government funding and identify patterns"},
        {"task": "Identify Quick Win Opportunities", "timeRequired": "45 minutes", "description": "Find schemes you can apply to within 30 days"}
    ]',
    '[
        {"title": "Government Ecosystem Mapper", "type": "tool", "description": "Complete org chart of 47 ministries with contact details"},
        {"title": "Scheme Intelligence Database", "type": "database", "description": "850+ active schemes with insider success rates"},
        {"title": "Eligibility Optimization Matrix", "type": "framework", "description": "Maximize scheme combinations for your profile"},
        {"title": "Strategic Timing Calendar", "type": "calendar", "description": "Application cycles and decision-making timelines"}
    ]',
    270, 100, 1, NOW(), NOW()),
    
    -- Day 2
    (module1_id, 2, 'Central Government Architecture - Mastering the Decision-Making Ecosystem',
    'Map the complete central government decision-making hierarchy. Understand how different ministries coordinate and compete. Identify key decision makers for your sector.',
    '[
        {"task": "Ministry Relationship Mapping", "timeRequired": "90 minutes", "description": "Map all ministries relevant to your business sector and identify decision makers"},
        {"task": "Create Contact Database", "timeRequired": "60 minutes", "description": "Build database of 20+ key government contacts across ministries"},
        {"task": "Develop Relationship Strategy", "timeRequired": "45 minutes", "description": "Plan systematic approach for building government relationships"}
    ]',
    '[
        {"title": "Ministry Contact Database", "type": "database", "description": "1,200+ verified official contacts across all ministries"},
        {"title": "Government Hierarchy Charts", "type": "reference", "description": "Complete organizational structure of central government"},
        {"title": "Decision Maker Identification Tool", "type": "tool", "description": "Find the right officials for your sector"}
    ]',
    240, 100, 2, NOW(), NOW()),
    
    -- Day 3
    (module1_id, 3, 'State Government Integration - Multi-Level Government Strategy',
    'Understand how central and state governments coordinate. Master multi-level government relationships. Create integrated central+state funding strategy.',
    '[
        {"task": "State Government Mapping", "timeRequired": "60 minutes", "description": "Research your home state business promotion policies and key officials"},
        {"task": "Multi-State Analysis", "timeRequired": "75 minutes", "description": "Identify 3 states with best opportunities and compare benefits"},
        {"task": "Integrated Strategy Development", "timeRequired": "60 minutes", "description": "Create coordinated central+state funding approach"}
    ]',
    '[
        {"title": "State Government Database", "type": "database", "description": "All 28 states + 8 UTs comprehensive coverage"},
        {"title": "Multi-State Coordination Framework", "type": "framework", "description": "Systematic approach for multi-level government engagement"},
        {"title": "Location Optimization Calculator", "type": "calculator", "description": "Find best states for your business expansion"}
    ]',
    240, 100, 3, NOW(), NOW()),
    
    -- Day 4
    (module1_id, 4, 'MSME Ministry - Your Primary Funding Gateway',
    'Master the complete MSME ecosystem with ₹25,000 Cr annual budget. Understand MSME classification and optimization strategies. Access SIDBI, NABARD, and NSIC funding channels.',
    '[
        {"task": "MSME Registration Optimization", "timeRequired": "45 minutes", "description": "Complete Udyam registration and optimize classification"},
        {"task": "PMEGP Application Preparation", "timeRequired": "90 minutes", "description": "Prepare complete PMEGP application worth ₹10L-₹25L"},
        {"task": "SIDBI Relationship Building", "timeRequired": "45 minutes", "description": "Connect with local SIDBI officials and intermediaries"}
    ]',
    '[
        {"title": "MSME Scheme Portfolio Guide", "type": "guide", "description": "Complete guide to all 12+ MSME schemes"},
        {"title": "PMEGP Application Template", "type": "template", "description": "Professional application template with success examples"},
        {"title": "SIDBI Network Directory", "type": "directory", "description": "Contact details of SIDBI offices nationwide"}
    ]',
    270, 150, 4, NOW(), NOW()),
    
    -- Day 5
    (module1_id, 5, 'Science & Technology Ministry - Innovation Funding Master Class',
    'Access the ₹18,000 Cr science and technology ecosystem. Master Technology Development Board (TDB) funding process. Build relationships with scientific institutions.',
    '[
        {"task": "Technology Assessment", "timeRequired": "60 minutes", "description": "Identify commercializable technology and research IP landscape"},
        {"task": "TDB Application Preparation", "timeRequired": "90 minutes", "description": "Develop complete TDB proposal worth ₹50L-₹10Cr"},
        {"task": "Research Institution Partnerships", "timeRequired": "45 minutes", "description": "Identify academic partnerships for joint applications"}
    ]',
    '[
        {"title": "TDB Funding Guide", "type": "guide", "description": "Complete guide to Technology Development Board funding"},
        {"title": "Research Partnership Database", "type": "database", "description": "1000+ research institutions and collaboration opportunities"},
        {"title": "IP Strategy Framework", "type": "framework", "description": "Patent filing and commercialization strategy"}
    ]',
    270, 150, 5, NOW(), NOW()),
    
    -- Day 6
    (module1_id, 6, 'International Cooperation - Global Government Funding',
    'Access international cooperation programs worth ₹1 Lakh Cr annually. Master bilateral and multilateral funding opportunities. Build relationships with embassies.',
    '[
        {"task": "Bilateral Program Mapping", "timeRequired": "60 minutes", "description": "Research bilateral programs relevant to your sector"},
        {"task": "Embassy Relationship Building", "timeRequired": "45 minutes", "description": "Connect with commercial attachés for key countries"},
        {"task": "Multilateral Agency Applications", "timeRequired": "75 minutes", "description": "Explore World Bank, ADB, and other multilateral opportunities"}
    ]',
    '[
        {"title": "International Cooperation Database", "type": "database", "description": "All bilateral and multilateral funding programs"},
        {"title": "Embassy Contact Directory", "type": "directory", "description": "Commercial attachés and trade promotion officials"},
        {"title": "Global Expansion Framework", "type": "framework", "description": "Government-backed international expansion strategy"}
    ]',
    270, 150, 6, NOW(), NOW()),
    
    -- MODULE 2: Strategic Government Relationships - The Art of Partnership (Days 7-12)
    
    -- Day 7
    (module2_id, 7, 'Bureaucratic Psychology - Understanding the Government Mindset',
    'Understand the psychology of government officials. Learn communication protocols that work with bureaucrats. Master value proposition for government partners.',
    '[
        {"task": "Official Perspective Analysis", "timeRequired": "60 minutes", "description": "Research background and priorities of 5 key officials"},
        {"task": "Value Proposition Development", "timeRequired": "90 minutes", "description": "Create compelling value propositions for government partners"},
        {"task": "Communication Protocol Design", "timeRequired": "45 minutes", "description": "Develop professional communication templates"}
    ]',
    '[
        {"title": "Bureaucratic Psychology Guide", "type": "guide", "description": "Complete guide to understanding government official mindset"},
        {"title": "Communication Templates", "type": "templates", "description": "Professional templates for government communication"},
        {"title": "Value Proposition Framework", "type": "framework", "description": "Create compelling government partnership proposals"}
    ]',
    240, 100, 7, NOW(), NOW()),
    
    -- Day 8
    (module2_id, 8, 'Building Strategic Networks Across Ministries',
    'Map and prioritize relationships across multiple ministries. Build systematic approach to relationship development.',
    '[
        {"task": "Multi-Ministry Relationship Mapping", "timeRequired": "60 minutes", "description": "Create relationship map across 8-10 relevant ministries"},
        {"task": "Consultation Calendar Planning", "timeRequired": "45 minutes", "description": "Identify upcoming consultations and participation strategy"},
        {"task": "Industry Event Strategy", "timeRequired": "75 minutes", "description": "Research events and speaking opportunities for next 6 months"}
    ]',
    '[
        {"title": "Network Building Framework", "type": "framework", "description": "Systematic approach to building government networks"},
        {"title": "Consultation Calendar", "type": "calendar", "description": "Never miss consultation opportunities"},
        {"title": "Government Event Database", "type": "database", "description": "All major government events and conferences"}
    ]',
    270, 120, 8, NOW(), NOW()),
    
    -- Day 9
    (module2_id, 9, 'Policy Influence and Advisory Positions',
    'Understand how to influence policy development. Position yourself for advisory roles with government.',
    '[
        {"task": "Policy Research", "timeRequired": "75 minutes", "description": "Research current policy developments and influence opportunities"},
        {"task": "Thought Leadership Content", "timeRequired": "90 minutes", "description": "Develop white paper demonstrating expertise"},
        {"task": "Advisory Position Applications", "timeRequired": "60 minutes", "description": "Apply for relevant advisory positions and committees"}
    ]',
    '[
        {"title": "Policy Influence Guide", "type": "guide", "description": "Complete guide to influencing government policy"},
        {"title": "Advisory Position Database", "type": "database", "description": "All government advisory positions and committees"},
        {"title": "Thought Leadership Templates", "type": "templates", "description": "Templates for policy papers and white papers"}
    ]',
    300, 150, 9, NOW(), NOW()),
    
    -- Day 10
    (module2_id, 10, 'Government Event Mastery and Speaking Opportunities',
    'Master government events for relationship building. Develop speaking skills for government audience.',
    '[
        {"task": "Event Calendar Research", "timeRequired": "60 minutes", "description": "Create calendar of relevant government events for 12 months"},
        {"task": "Speaking Topic Development", "timeRequired": "90 minutes", "description": "Develop 3-5 speaking topics for government audiences"},
        {"task": "Event Organizer Relationship Building", "timeRequired": "75 minutes", "description": "Connect with organizers and express speaking interest"}
    ]',
    '[
        {"title": "Government Event Calendar", "type": "calendar", "description": "Complete calendar of government events and conferences"},
        {"title": "Speaking Proposal Templates", "type": "templates", "description": "Professional templates for speaking proposals"},
        {"title": "Event Organizer Directory", "type": "directory", "description": "Contact details of government event organizers"}
    ]',
    270, 120, 10, NOW(), NOW()),
    
    -- Day 11
    (module2_id, 11, 'International Delegation and Trade Mission Access',
    'Access government-sponsored international delegations. Master embassy relationships for international business support.',
    '[
        {"task": "Delegation Opportunity Research", "timeRequired": "75 minutes", "description": "Research upcoming international delegations and missions"},
        {"task": "Embassy Relationship Building", "timeRequired": "60 minutes", "description": "Connect with commercial attachés and trade officials"},
        {"task": "Qualification Assessment", "timeRequired": "45 minutes", "description": "Assess business against delegation selection criteria"}
    ]',
    '[
        {"title": "International Delegation Database", "type": "database", "description": "All government international delegations and missions"},
        {"title": "Embassy Support Guide", "type": "guide", "description": "Complete guide to leveraging embassy support"},
        {"title": "Trade Mission Templates", "type": "templates", "description": "Application templates for trade missions"}
    ]',
    270, 150, 11, NOW(), NOW()),
    
    -- Day 12
    (module2_id, 12, 'Advanced Relationship Maintenance and Success Multiplication',
    'Master long-term relationship maintenance with government partners. Learn systematic approach to relationship nurturing.',
    '[
        {"task": "Relationship Audit", "timeRequired": "60 minutes", "description": "Evaluate current government relationships by strength and importance"},
        {"task": "Success Documentation", "timeRequired": "75 minutes", "description": "Create comprehensive case studies of government successes"},
        {"task": "Success Multiplication Strategy", "timeRequired": "60 minutes", "description": "Plan how to leverage current success for broader opportunities"}
    ]',
    '[
        {"title": "Relationship Management System", "type": "system", "description": "CRM system for managing government relationships"},
        {"title": "Success Story Templates", "type": "templates", "description": "Templates for documenting and showcasing success"},
        {"title": "Ecosystem Integration Guide", "type": "guide", "description": "Become integral part of government business ecosystem"}
    ]',
    240, 150, 12, NOW(), NOW()),
    
    -- MODULE 3: Application Mastery & Documentation Excellence (Days 13-18)
    
    -- Day 13
    (module3_id, 13, 'Professional Application Writing - The Art of Persuasive Proposals',
    'Master the art of writing compelling government proposals. Understand evaluation criteria and scoring systems.',
    '[
        {"task": "Application Framework Customization", "timeRequired": "60 minutes", "description": "Adapt the IMPACT framework for your specific funding opportunity"},
        {"task": "Executive Summary Mastery", "timeRequired": "75 minutes", "description": "Craft compelling executive summary that captures attention"},
        {"task": "Technical Proposal Development", "timeRequired": "90 minutes", "description": "Develop detailed technical proposal with innovation strategy"}
    ]',
    '[
        {"title": "IMPACT Application Framework", "type": "framework", "description": "Professional framework for government applications"},
        {"title": "Executive Summary Templates", "type": "templates", "description": "Compelling templates for executive summaries"},
        {"title": "Evaluation Criteria Guide", "type": "guide", "description": "Understanding government evaluation process"}
    ]',
    300, 150, 13, NOW(), NOW()),
    
    -- Day 14
    (module3_id, 14, 'Documentation Excellence - Creating Bulletproof Applications',
    'Master documentation requirements for different government schemes. Learn quality control processes for error-free submissions.',
    '[
        {"task": "Document Audit and Gap Analysis", "timeRequired": "75 minutes", "description": "Review all documents and identify missing items"},
        {"task": "Document Standardization", "timeRequired": "90 minutes", "description": "Create standardized versions with professional formatting"},
        {"task": "Quality Control System", "timeRequired": "45 minutes", "description": "Develop comprehensive quality assurance checklist"}
    ]',
    '[
        {"title": "Documentation Checklist", "type": "checklist", "description": "Complete checklist for government applications"},
        {"title": "Document Templates", "type": "templates", "description": "Standardized templates for all required documents"},
        {"title": "Quality Control Framework", "type": "framework", "description": "PERFECT documentation quality system"}
    ]',
    270, 130, 14, NOW(), NOW()),
    
    -- Day 15
    (module3_id, 15, 'Multi-Scheme Coordination - Portfolio Application Strategy',
    'Master the art of applying to multiple schemes simultaneously. Understand scheme compatibility and conflict avoidance.',
    '[
        {"task": "Scheme Compatibility Analysis", "timeRequired": "75 minutes", "description": "Map all schemes and analyze compatibility and conflicts"},
        {"task": "Portfolio Optimization", "timeRequired": "90 minutes", "description": "Select optimal combination for maximum impact"},
        {"task": "Timeline Coordination", "timeRequired": "60 minutes", "description": "Create master timeline for multiple applications"}
    ]',
    '[
        {"title": "Scheme Compatibility Matrix", "type": "matrix", "description": "Complete analysis of scheme combinations"},
        {"title": "Portfolio Optimization Tool", "type": "tool", "description": "Optimize funding portfolio for maximum success"},
        {"title": "Master Timeline Template", "type": "template", "description": "Coordinate multiple application deadlines"}
    ]',
    300, 140, 15, NOW(), NOW()),
    
    -- Day 16
    (module3_id, 16, 'Advanced Persuasion Techniques for Government Audiences',
    'Master psychological persuasion techniques for bureaucratic decision-makers. Learn storytelling that resonates with officials.',
    '[
        {"task": "Government Priority Research", "timeRequired": "60 minutes", "description": "Research current priorities and alignment opportunities"},
        {"task": "Compelling Narrative Development", "timeRequired": "90 minutes", "description": "Develop persuasive narrative using PERSUADE framework"},
        {"task": "Evidence Assembly", "timeRequired": "75 minutes", "description": "Compile compelling evidence and endorsements"}
    ]',
    '[
        {"title": "PERSUADE Framework", "type": "framework", "description": "Advanced persuasion framework for government proposals"},
        {"title": "Narrative Templates", "type": "templates", "description": "Compelling storytelling templates"},
        {"title": "Evidence Library", "type": "library", "description": "Database of supporting evidence and data"}
    ]',
    300, 150, 16, NOW(), NOW()),
    
    -- Day 17
    (module3_id, 17, 'Success Optimization - Advanced Application Engineering',
    'Engineer applications for maximum success probability. Position proposals as risk-free strategic investments.',
    '[
        {"task": "Scoring System Analysis", "timeRequired": "60 minutes", "description": "Analyze evaluation criteria and identify optimization opportunities"},
        {"task": "Strategic Positioning Development", "timeRequired": "90 minutes", "description": "Develop positioning that maximizes evaluation scores"},
        {"task": "Risk Mitigation Plan", "timeRequired": "75 minutes", "description": "Create comprehensive risk mitigation framework"}
    ]',
    '[
        {"title": "Success Optimization Guide", "type": "guide", "description": "Complete guide to optimizing application success"},
        {"title": "Scoring Optimization Tool", "type": "tool", "description": "Maximize evaluation scores systematically"},
        {"title": "Risk Mitigation Templates", "type": "templates", "description": "Professional risk management templates"}
    ]',
    300, 150, 17, NOW(), NOW()),
    
    -- Day 18
    (module3_id, 18, 'Application Submission and Follow-up Excellence',
    'Master professional submission processes and protocols. Build systematic approach for application tracking and management.',
    '[
        {"task": "Submission Protocol Development", "timeRequired": "60 minutes", "description": "Create detailed submission protocol and quality checklist"},
        {"task": "Follow-up Strategy Planning", "timeRequired": "75 minutes", "description": "Develop systematic post-submission relationship building"},
        {"task": "Application Tracking System", "timeRequired": "45 minutes", "description": "Set up tracking system for multiple applications"}
    ]',
    '[
        {"title": "Submission Protocol Guide", "type": "guide", "description": "Professional submission process and protocols"},
        {"title": "Follow-up Templates", "type": "templates", "description": "Systematic follow-up communication templates"},
        {"title": "Application Tracker", "type": "tool", "description": "Complete system for tracking applications"}
    ]',
    270, 140, 18, NOW(), NOW()),
    
    -- MODULE 4: Execution, Compliance & Strategic Scaling (Days 19-21)
    
    -- Day 19
    (module4_id, 19, 'Fund Management and Compliance Excellence',
    'Master government fund management requirements and compliance. Build systematic compliance monitoring and documentation.',
    '[
        {"task": "Compliance Framework Setup", "timeRequired": "75 minutes", "description": "Establish comprehensive compliance monitoring system"},
        {"task": "Reporting System Development", "timeRequired": "90 minutes", "description": "Create systematic reporting framework with templates"},
        {"task": "Fund Utilization Optimization", "timeRequired": "75 minutes", "description": "Plan optimal fund utilization for maximum impact"}
    ]',
    '[
        {"title": "VALUE Fund Management Framework", "type": "framework", "description": "Complete fund management and compliance system"},
        {"title": "Compliance Monitoring System", "type": "system", "description": "Automated compliance tracking and alerts"},
        {"title": "Reporting Templates", "type": "templates", "description": "Professional templates for all government reporting"}
    ]',
    300, 140, 19, NOW(), NOW()),
    
    -- Day 20
    (module4_id, 20, 'Success Multiplication and Portfolio Scaling',
    'Learn how to scale success across multiple government programs. Develop long-term strategic partnership approach.',
    '[
        {"task": "Success Documentation", "timeRequired": "90 minutes", "description": "Create comprehensive success documentation for multiplication"},
        {"task": "Cross-Program Opportunity Mapping", "timeRequired": "75 minutes", "description": "Identify opportunities to leverage success across programs"},
        {"task": "Ecosystem Building Strategy", "timeRequired": "90 minutes", "description": "Develop strategy for building government-backed ecosystem"}
    ]',
    '[
        {"title": "Success Multiplication Framework", "type": "framework", "description": "Systematic approach to scaling government success"},
        {"title": "Ecosystem Building Guide", "type": "guide", "description": "Build government-backed business ecosystems"},
        {"title": "REINVEST Strategy Framework", "type": "framework", "description": "Strategic reinvestment for sustained growth"}
    ]',
    330, 150, 20, NOW(), NOW()),
    
    -- Day 21
    (module4_id, 21, 'Building Government-Backed Business Empire and Legacy',
    'Master long-term strategic positioning as government-backed enterprise. Create systematic approach for multi-generational relationships.',
    '[
        {"task": "Strategic Positioning Assessment", "timeRequired": "75 minutes", "description": "Assess positioning and identify pathways to strategic partnership"},
        {"task": "Legacy Vision Development", "timeRequired": "90 minutes", "description": "Develop comprehensive legacy vision and multi-generational strategy"},
        {"task": "Implementation Roadmap Creation", "timeRequired": "90 minutes", "description": "Create detailed roadmap for empire building and legacy development"}
    ]',
    '[
        {"title": "Empire Building Framework", "type": "framework", "description": "Complete framework for building government-backed empires"},
        {"title": "LEGACY Relationship System", "type": "system", "description": "Multi-generational relationship building system"},
        {"title": "Strategic Partnership Roadmap", "type": "roadmap", "description": "Detailed roadmap from entrepreneur to strategic partner"}
    ]',
    330, 200, 21, NOW(), NOW());

    RAISE NOTICE 'P9: Government Schemes & Funding Mastery - Complete 21-Day Course Successfully Deployed!';
    RAISE NOTICE 'Total Lessons: 21 | Total Modules: 4 | Estimated Days: 21';
    RAISE NOTICE 'Course Structure: Days 1-6 (Module 1), Days 7-12 (Module 2), Days 13-18 (Module 3), Days 19-21 (Module 4)';

END $$;