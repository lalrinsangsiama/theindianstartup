-- P7: Final Advanced Modules - Complete State Government Mastery

-- Complete remaining lessons for all modules

-- Module 5: Eastern States Emerging Markets (Days 21-25)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    21,
    'West Bengal - Eastern Gateway Excellence',
    'Navigate West Bengal''s strategic location advantages, industrial heritage, and emerging opportunities in IT and manufacturing sectors.',
    '[
        "Research West Bengal industrial policy and incentives",
        "Connect with WBIDC for industrial opportunities", 
        "Explore Kolkata IT sector and port connectivity",
        "Plan eastern region market entry strategy"
    ]',
    '[
        "West Bengal Industrial Policy Comprehensive Guide",
        "WBIDC Contact Directory and Services", 
        "Kolkata IT Sector and Port Connectivity Analysis",
        "Eastern Region Market Entry Strategy Framework"
    ]',
    90,
    120,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 5;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    22,
    'Odisha - Mineral Rich Industrial Paradise',
    'Unlock Odisha''s mineral wealth, steel and aluminum advantages, with government offering up to 50% capital subsidies for manufacturing units.',
    '[
        "Study Odisha mineral-based industry opportunities",
        "Connect with IDCO for mega project discussions", 
        "Explore coastal industrial corridor benefits",
        "Plan mineral value-addition strategies"
    ]',
    '[
        "Odisha Mineral Resources and Industrial Policy",
        "IDCO Mega Projects Contact and Process Guide", 
        "Coastal Industrial Corridor Development Plan",
        "Mineral Value-addition Strategy Templates"
    ]',
    90,
    120,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 5;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    23,
    'Jharkhand & Bihar - Emerging Economy Goldmines',
    'Access maximum government support in emerging economies with special focus areas and higher subsidy rates for early movers.',
    '[
        "Research Jharkhand and Bihar industrial policies",
        "Connect with state industrial development agencies", 
        "Identify first-mover advantage opportunities",
        "Plan early entry strategies for emerging markets"
    ]',
    '[
        "Jharkhand-Bihar Industrial Policy Comparison",
        "State Agency Contact Directory and Services", 
        "First-mover Advantage Analysis Framework",
        "Emerging Market Entry Strategy Guide"
    ]',
    75,
    100,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 5;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    24,
    'Eastern States Integration Strategy',
    'Create comprehensive eastern region strategy leveraging Kolkata port, mineral resources, and emerging market advantages.',
    '[
        "Design integrated eastern states operational strategy",
        "Plan mineral-port connectivity supply chains", 
        "Create competitive advantage framework",
        "Develop long-term eastern region expansion plan"
    ]',
    '[
        "Eastern States Integration Strategy Template",
        "Mineral-Port Supply Chain Optimization Guide", 
        "Competitive Advantage Framework",
        "Long-term Expansion Planning Tools"
    ]',
    75,
    100,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 5;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    25,
    'Eastern States Government Relationship Building',
    'Master relationship building in eastern states with focus on local political dynamics and bureaucratic culture.',
    '[
        "Map political and bureaucratic networks in eastern states",
        "Plan relationship building visits and meetings", 
        "Create state-specific value propositions",
        "Establish long-term partnership frameworks"
    ]',
    '[
        "Eastern States Political-Bureaucratic Network Map",
        "Relationship Building Visit Planning Templates", 
        "State-specific Value Proposition Development",
        "Long-term Partnership Framework Guide"
    ]',
    60,
    85,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 5;

-- Module 6: North-Eastern Special Benefits (Days 26-28)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    26,
    'North-East India - Maximum Subsidy Paradise',
    'Access India''s highest subsidies (up to 90%) with complete tax holidays, special central assistance, and minimal competition.',
    '[
        "Study North-East Industrial Policy and special packages",
        "Research sector-specific opportunities and incentives", 
        "Connect with North Eastern Council (NEC) officials",
        "Plan reconnaissance visit to potential locations"
    ]',
    '[
        "North-East Industrial Policy Comprehensive Analysis",
        "Sector-wise Opportunity and Incentive Matrix", 
        "NEC and State Government Contact Directory",
        "North-East Business Setup Complete Guide"
    ]',
    120,
    200,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 6;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    27,
    'Assam & Seven Sisters - Strategic Advantages',
    'Navigate unique advantages of each North-Eastern state, from Assam''s oil and tea to other states'' mineral and agricultural wealth.',
    '[
        "Analyze each North-Eastern state comparative advantages",
        "Identify state-specific business opportunities", 
        "Plan multi-state North-Eastern strategy",
        "Create logistics and connectivity solutions"
    ]',
    '[
        "Eight North-Eastern States Comparative Analysis",
        "State-wise Business Opportunity Database", 
        "Multi-state Strategy Framework for North-East",
        "Logistics and Connectivity Solutions Guide"
    ]',
    90,
    150,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 6;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    28,
    'North-East Special Schemes and Central Support',
    'Master special central schemes, NEC funding, and ministry support programs exclusive to North-Eastern states.',
    '[
        "Research all central schemes specific to North-East",
        "Connect with Ministry of Development of North Eastern Region", 
        "Identify sector-specific central support programs",
        "Plan comprehensive funding application strategy"
    ]',
    '[
        "Central Schemes for North-East Complete Database",
        "Ministry of DONER Contact and Process Guide", 
        "Sector-specific Central Support Program Directory",
        "Multi-scheme Funding Application Strategy"
    ]',
    90,
    150,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 6;

-- Module 7: Central States Opportunities (Days 29-31)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    29,
    'Madhya Pradesh - Heart of India Advantages',
    'Navigate MP''s central location benefits, industrial infrastructure, and government''s proactive approach to industrial development.',
    '[
        "Study MP industrial policy and incentive structures",
        "Connect with MP State Industrial Development Corporation", 
        "Explore central location logistics advantages",
        "Plan MP industrial visit and site selection"
    ]',
    '[
        "Madhya Pradesh Industrial Policy Deep Dive",
        "MPSIDCL Services and Contact Directory", 
        "Central Location Logistics Advantage Analysis",
        "MP Industrial Areas and Infrastructure Guide"
    ]',
    90,
    120,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 7;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    30,
    'Chhattisgarh - Mineral & Power Rich State',
    'Access Chhattisgarh''s abundant mineral resources, cheap power, and government incentives for mineral-based industries.',
    '[
        "Research Chhattisgarh mineral and power advantages",
        "Connect with Chhattisgarh State Industrial Development Corporation", 
        "Explore mineral-based industry opportunities",
        "Plan power-intensive industry strategies"
    ]',
    '[
        "Chhattisgarh Mineral and Power Resources Guide",
        "CSIDC Contact Directory and Services", 
        "Mineral-based Industry Opportunity Analysis",
        "Power-intensive Industry Strategy Framework"
    ]',
    90,
    120,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 7;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    31,
    'Uttarakhand - Hill State Special Benefits',
    'Navigate Uttarakhand''s special hill state benefits, pharmaceutical industry advantages, and tourism-linked opportunities.',
    '[
        "Study Uttarakhand hill state industrial policy benefits",
        "Connect with SIDCUL for industrial infrastructure", 
        "Explore pharmaceutical and herbal industry opportunities",
        "Plan hill state specific compliance and benefits"
    ]',
    '[
        "Uttarakhand Hill State Industrial Policy Guide",
        "SIDCUL Industrial Infrastructure and Contact Info", 
        "Pharmaceutical and Herbal Industry Opportunity Map",
        "Hill State Compliance and Benefits Framework"
    ]',
    75,
    100,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 7;

-- Module 8: Strategic Government Relationships (Days 32-35)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    32,
    'Advanced Relationship Building Techniques',
    'Master advanced techniques for building lasting relationships with state government officials from clerks to Chief Ministers.',
    '[
        "Create comprehensive relationship mapping for target states",
        "Plan systematic relationship building campaigns", 
        "Develop value addition strategies for each official level",
        "Set up long-term relationship maintenance systems"
    ]',
    '[
        "Advanced Relationship Mapping Templates",
        "Systematic Campaign Planning Framework", 
        "Value Addition Strategy Development Guide",
        "Long-term Relationship Maintenance System"
    ]',
    120,
    180,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 8;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    33,
    'Government Event Mastery and Networking',
    'Master the art of government events, investment summits, and policy conclaves for maximum relationship building impact.',
    '[
        "Research all upcoming state government events",
        "Plan strategic participation in investment summits", 
        "Develop event-specific networking strategies",
        "Create post-event relationship nurturing plans"
    ]',
    '[
        "Government Events Calendar and Strategic Analysis",
        "Investment Summit Participation Strategy Guide", 
        "Event-specific Networking Techniques Manual",
        "Post-event Relationship Nurturing Framework"
    ]',
    90,
    140,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 8;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    34,
    'Crisis Management and Relationship Recovery',
    'Learn to manage government relationship crises, policy changes, and official transfers while maintaining continuous benefits.',
    '[
        "Develop crisis management protocols for government relations",
        "Create relationship recovery strategies", 
        "Plan for official transfer and policy change scenarios",
        "Set up early warning systems for relationship risks"
    ]',
    '[
        "Government Relations Crisis Management Protocols",
        "Relationship Recovery Strategy Templates", 
        "Transfer and Policy Change Management Guide",
        "Early Warning System Setup Manual"
    ]',
    75,
    120,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 8;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    35,
    'Long-term Partnership and Institutional Relationships',
    'Build institutional relationships that survive individual transfers and create long-term partnership frameworks with state governments.',
    '[
        "Create institutional partnership frameworks",
        "Develop transfer-proof relationship strategies", 
        "Plan long-term value creation for states",
        "Set up systematic partnership renewal processes"
    ]',
    '[
        "Institutional Partnership Framework Templates",
        "Transfer-proof Relationship Strategy Guide", 
        "Long-term Value Creation Planning Tools",
        "Partnership Renewal Process Automation"
    ]',
    90,
    140,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 8;

-- Module 9: Government Platforms Mastery (Days 36-40)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    36,
    'Complete State Platform Navigation System',
    'Master all state government digital platforms, portals, and systems to navigate bureaucracy like an insider.',
    '[
        "Register and optimize profiles on all relevant state portals",
        "Master platform-specific navigation techniques", 
        "Set up automated monitoring and alert systems",
        "Create backup and alternative access strategies"
    ]',
    '[
        "All State Portals Complete Navigation Guide",
        "Platform Optimization and Profile Setup Manual", 
        "Automated Monitoring and Alert System Setup",
        "Backup Access Strategy Implementation Guide"
    ]',
    150,
    200,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 9;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    37,
    'Advanced Documentation Strategies',
    'Master government documentation from understanding complex bureaucratic language to creating compelling applications.',
    '[
        "Create state-specific documentation templates",
        "Master bureaucratic language translation and communication", 
        "Set up comprehensive compliance monitoring systems",
        "Develop advanced application optimization techniques"
    ]',
    '[
        "State-specific Documentation Template Library",
        "Bureaucratic Language Translation Dictionary", 
        "Comprehensive Compliance Monitoring System",
        "Advanced Application Optimization Toolkit"
    ]',
    120,
    170,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 9;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    38,
    'Government Communication and Follow-up Mastery',
    'Perfect the art of government communication, follow-up strategies, and maintaining continuous engagement.',
    '[
        "Develop state-specific communication protocols",
        "Create systematic follow-up and tracking systems", 
        "Master official and unofficial communication channels",
        "Set up relationship maintenance automation"
    ]',
    '[
        "State-specific Communication Protocol Manual",
        "Systematic Follow-up and Tracking System", 
        "Official and Unofficial Channel Access Guide",
        "Relationship Maintenance Automation Setup"
    ]',
    90,
    140,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 9;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    39,
    'Insider Secrets and Street Smart Techniques',
    'Learn insider secrets, unofficial processes, and street smart techniques that separate successful applicants from others.',
    '[
        "Master unofficial but legitimate process optimization",
        "Learn insider timing and approach strategies", 
        "Understand ground-level implementation realities",
        "Create competitive intelligence gathering systems"
    ]',
    '[
        "Insider Process Optimization Techniques Manual",
        "Timing and Approach Strategy Insider Guide", 
        "Ground-level Implementation Reality Check",
        "Competitive Intelligence System Setup"
    ]',
    120,
    180,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 9;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    40,
    'Government Relations Technology and Automation',
    'Leverage technology for government relations management, automated compliance, and relationship maintenance at scale.',
    '[
        "Set up comprehensive government relations CRM",
        "Implement automated compliance and renewal systems", 
        "Create relationship scoring and priority systems",
        "Deploy technology for relationship maintenance at scale"
    ]',
    '[
        "Government Relations CRM Setup and Management",
        "Automated Compliance and Renewal System", 
        "Relationship Scoring and Priority Framework",
        "Technology-enabled Relationship Maintenance"
    ]',
    90,
    140,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 9;

-- Module 10: Implementation and Execution (Days 41-45)
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    41,
    'Multi-State Operations Strategy',
    'Design and implement multi-state operational strategies to maximize benefits and minimize risks across different states.',
    '[
        "Create comprehensive multi-state operational framework",
        "Design state-wise benefit optimization strategies", 
        "Plan integrated supply chain across multiple states",
        "Set up multi-state compliance and relationship management"
    ]',
    '[
        "Multi-state Operational Framework Design Manual",
        "State-wise Benefit Optimization Strategy Guide", 
        "Integrated Multi-state Supply Chain Planning",
        "Multi-state Compliance and Relationship System"
    ]',
    120,
    180,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 10;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    42,
    'SEZ and Special Economic Zone Mastery',
    'Master Special Economic Zones across states for maximum tax benefits, export advantages, and simplified compliance.',
    '[
        "Analyze SEZ opportunities across all target states",
        "Compare SEZ benefits vs regular industrial areas", 
        "Plan SEZ setup and compliance strategies",
        "Create SEZ-specific operational frameworks"
    ]',
    '[
        "All-India SEZ Opportunity Analysis Report",
        "SEZ vs Regular Area Benefit Comparison Matrix", 
        "SEZ Setup and Compliance Strategy Guide",
        "SEZ-specific Operational Framework Manual"
    ]',
    90,
    140,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 10;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    43,
    'Investment Summit Mastery and Government Showcase',
    'Master participation in state investment summits for maximum visibility, relationship building, and benefit access.',
    '[
        "Plan strategic participation in multiple state investment summits",
        "Create compelling showcase presentations for government audiences", 
        "Develop summit-specific relationship building strategies",
        "Set up post-summit benefit realization systems"
    ]',
    '[
        "Investment Summit Strategic Participation Guide",
        "Government Showcase Presentation Templates", 
        "Summit-specific Relationship Building Framework",
        "Post-summit Benefit Realization System"
    ]',
    90,
    140,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 10;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    44,
    'Advanced Policy Advocacy and Influence',
    'Learn to influence state policies, participate in policy making, and position yourself as industry thought leader.',
    '[
        "Develop policy advocacy capabilities and strategies",
        "Create thought leadership positioning in target states", 
        "Plan participation in policy consultation processes",
        "Build industry representation and influence networks"
    ]',
    '[
        "Policy Advocacy Strategy Development Manual",
        "Thought Leadership Positioning Framework", 
        "Policy Consultation Participation Guide",
        "Industry Representation and Influence Network"
    ]',
    90,
    140,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 10;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    45,
    'State Government Mastery Graduation',
    'Complete assessment, create your personalized state government mastery plan, and establish your ongoing success framework.',
    '[
        "Complete comprehensive state government mastery assessment",
        "Create personalized 5-year state government strategy", 
        "Establish ongoing learning and adaptation systems",
        "Set up success measurement and optimization frameworks"
    ]',
    '[
        "State Government Mastery Assessment and Certification",
        "Personalized 5-year Strategy Development Tool", 
        "Ongoing Learning and Adaptation System Setup",
        "Success Measurement and Optimization Framework"
    ]',
    150,
    250,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 10;

COMMIT;