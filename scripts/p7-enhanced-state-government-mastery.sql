-- P7: Enhanced State Government Mastery Course Update
-- Complete state government navigation and relationship building

-- Update Product Information
UPDATE "Product" SET
    "title" = 'State Government Mastery - Complete State Ecosystem Navigation',
    "description" = 'Master India''s 28 state governments to unlock ₹10L-₹5Cr in benefits + build strategic government relations. From complete beginner to state government insider.',
    "price" = 4999,
    "estimatedDays" = 45,
    "updatedAt" = NOW()
WHERE "code" = 'P7';

-- Clear existing P7 modules and lessons
DELETE FROM "Lesson" WHERE "moduleId" IN (
    SELECT "id" FROM "Module" WHERE "productId" = (
        SELECT "id" FROM "Product" WHERE "code" = 'P7'
    )
);

DELETE FROM "Module" WHERE "productId" = (
    SELECT "id" FROM "Product" WHERE "code" = 'P7'
);

-- Create Enhanced P7 Modules
INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'State Government Fundamentals',
    'Master how state governments really work - from complete beginner to insider understanding',
    1,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Northern States Powerhouse',
    'UP, Haryana, Punjab, Delhi NCR - Unlock North India''s ₹50,000 Cr opportunity',
    2,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Western States Excellence',
    'Maharashtra, Gujarat, Rajasthan, Goa - Access India''s industrial powerhouse',
    3,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Southern States Innovation Hub',
    'Karnataka, Tamil Nadu, Telangana, Andhra Pradesh, Kerala - Tech & manufacturing goldmine',
    4,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Eastern States Emerging Markets',
    'West Bengal, Odisha, Jharkhand, Bihar - Emerging economy benefits with maximum subsidies',
    5,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'North-Eastern Special Benefits',
    'Assam & 7 sisters - Maximum subsidies up to 90% with special central support',
    6,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Central States Opportunities',
    'Madhya Pradesh, Chhattisgarh, Uttarakhand - Strategic location advantages',
    7,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Strategic Government Relationships',
    'Build lasting relationships with state officials - from clerks to Chief Ministers',
    8,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Government Platforms Mastery',
    'Navigate all state portals, documentation, and bureaucratic systems like an insider',
    9,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

INSERT INTO "Module" ("productId", "title", "description", "orderIndex", "createdAt", "updatedAt")
SELECT 
    p.id,
    'Implementation and Execution',
    'Multi-state operations, SEZs, investment summits, and advanced strategies',
    10,
    NOW(),
    NOW()
FROM "Product" p WHERE p.code = 'P7';

-- Create Detailed Lessons for Module 1: State Government Fundamentals
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    1,
    'State Government 101 - The Power Structure',
    'Understand exactly how state governments function and where the real power lies for business decisions. From CM to local officials - who decides your fate.',
    '[
        "Research your state structure and create contact database",
        "Download state budget and identify scheme allocations", 
        "Map the power hierarchy in your target state",
        "Create government contact database with 10 key officials"
    ]',
    '[
        "State Government Organizational Chart Template",
        "Budget Analysis Worksheet", 
        "Contact Database Template",
        "Power Structure Mapping Guide"
    ]',
    60,
    75,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 1;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    2,
    'Psychology of State Government Officials',
    'Master the psychology and motivations of politicians, bureaucrats, and technocrats. Learn exactly how to approach each type for maximum success.',
    '[
        "Profile key officials in your target state",
        "Identify their motivations and communication styles",
        "Plan your first formal introduction strategy", 
        "Create value propositions for different official types"
    ]',
    '[
        "Official Psychology Guide",
        "Communication Templates for Each Official Type",
        "Relationship Building 5-Touch Strategy",
        "Government Calendar and Timing Guide"
    ]',
    60,
    75,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 1;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    3,
    'Government Documentation Navigation System',
    'Master complex government documentation, portals, and bureaucratic language. Transform from confused applicant to documentation expert.',
    '[
        "Register on your state investment portal",
        "Create comprehensive document library",
        "Set up compliance and renewal calendar",
        "Master bureaucratic language translation"
    ]',
    '[
        "Document Hierarchy Guide",
        "Bureaucratic Language Translation Dictionary",
        "Portal Navigation Masterclass", 
        "Compliance Matrix Template"
    ]',
    75,
    100,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 1;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    4,
    'State Government Funding Mechanisms',
    'Deep dive into how states actually fund schemes - from own revenue to central transfers. Understand the money flow to time your applications perfectly.',
    '[
        "Analyze your state budget allocation for schemes",
        "Identify peak funding periods", 
        "Calculate total scheme pool sizes",
        "Plan application timing strategy"
    ]',
    '[
        "State Budget Analysis Guide",
        "Funding Source Breakdown", 
        "Application Timing Calendar",
        "Scheme Pool Size Calculator"
    ]',
    60,
    75,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 1;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    5,
    'State Competition Dynamics',
    'Understand why states compete for your business and how to leverage this competition for maximum benefits across multiple states.',
    '[
        "Map interstate competition in your sector",
        "Create multi-state comparison matrix",
        "Identify competitive advantages of each state", 
        "Plan multi-state negotiation strategy"
    ]',
    '[
        "State Competition Analysis Framework",
        "Multi-State Comparison Matrix",
        "Negotiation Strategy Guide",
        "Interstate Leverage Techniques"
    ]',
    60,
    75,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 1;

-- Create Lessons for Module 2: Northern States Powerhouse
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    6,
    'Uttar Pradesh - Manufacturing Giant Mastery',
    'Navigate UP''s ₹4.68 lakh crore investment ecosystem. Master UPSIDA, district selection, and relationship building with India''s largest state government.',
    '[
        "Register on UP Nivesh portal", 
        "Shortlist 3 districts for your project",
        "Contact target DIC offices",
        "Calculate UP-specific benefits for your project"
    ]',
    '[
        "UP Government Contact Directory", 
        "District-wise Opportunity Analysis",
        "UPSIDA Navigation Guide",
        "UP Scheme Benefits Calculator"
    ]',
    90,
    100,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 2;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    7,
    'Haryana - Delhi NCR Strategic Advantage',
    'Master Haryana''s ₹200 crore maximum subsidy system. Navigate HSIIDC, understand the Delhi proximity advantage, and build automotive sector connections.',
    '[
        "Register on Saral Haryana portal",
        "Plan 2-day Haryana visit for district evaluation", 
        "Connect with HSIIDC officials",
        "Finalize location strategy"
    ]',
    '[
        "Haryana HCIPS Scheme Guide",
        "District Location Analysis", 
        "HSIIDC Contact Directory",
        "Automotive Sector Opportunities Map"
    ]',
    90,
    100,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 2;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    8,
    'Punjab - Agricultural Powerhouse Benefits',
    'Navigate Punjab''s agriculture-industry linkage programs. Master food processing incentives, export infrastructure, and farmer-industry collaboration schemes.',
    '[
        "Explore Punjab food processing schemes",
        "Connect with Punjab Agro Industries Corporation", 
        "Identify raw material supplier networks",
        "Plan farmer linkage programs"
    ]',
    '[
        "Punjab Food Processing Schemes Guide",
        "Farmer Linkage Program Templates", 
        "Export Infrastructure Directory",
        "Agro Industries Corporation Contact Guide"
    ]',
    75,
    90,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 2;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    9,
    'Delhi NCR Integration Strategy',
    'Master the tri-state advantage of Delhi-UP-Haryana. Understand how to leverage proximity for maximum benefits while minimizing costs.',
    '[
        "Create tri-state operational strategy",
        "Compare costs and benefits across NCR", 
        "Plan multi-state compliance approach",
        "Design supply chain optimization"
    ]',
    '[
        "NCR Integration Strategy Guide",
        "Tri-state Cost-Benefit Analysis",
        "Multi-state Compliance Framework", 
        "Supply Chain Optimization Templates"
    ]',
    75,
    90,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 2;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    10,
    'Northern States Relationship Network',
    'Build strategic relationships across northern states. Master the political-bureaucratic networks and create lasting partnerships.',
    '[
        "Map relationship networks across northern states",
        "Plan introduction strategies for key officials", 
        "Create value propositions for each state",
        "Schedule relationship building activities"
    ]',
    '[
        "Northern States Official Directory",
        "Relationship Mapping Templates", 
        "Introduction Strategy Framework",
        "Value Proposition Development Guide"
    ]',
    60,
    85,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 2;

-- Add comprehensive state schemes data
INSERT INTO "GovernmentScheme" ("name", "description", "eligibility", "benefits", "applicationProcess", "state", "category", "maximumBenefit", "sector", "createdAt", "updatedAt")
VALUES 
-- UP Schemes
(
    'UP Capital Investment Promotion Scheme',
    'Capital subsidy for manufacturing units to promote industrial development',
    'Manufacturing units with minimum ₹25 lakh investment',
    '15-25% capital subsidy up to ₹2 crore for general areas, ₹10 crore for mega projects',
    'Apply through UP Nivesh portal with detailed project report',
    'Uttar Pradesh',
    'Capital Subsidy',
    1000000000,
    'Manufacturing',
    NOW(),
    NOW()
),
(
    'UP Interest Subsidy Scheme',
    '7% interest subsidy on loans for industrial development',
    'Manufacturing units with bank loan arrangements',
    '7% interest subsidy for 5 years, maximum ₹1 crore per year',
    'Apply through UPSIDA with bank loan documents',
    'Uttar Pradesh', 
    'Interest Subsidy',
    50000000,
    'All Sectors',
    NOW(),
    NOW()
),
(
    'UP Employment Generation Incentive',
    'Cash incentive for creating employment in industrial units',
    'Units creating minimum 10 jobs for local residents',
    '₹48,000 per job created, paid over 3 years',
    'Submit employment details through district industries center',
    'Uttar Pradesh',
    'Employment Incentive', 
    4800000,
    'All Sectors',
    NOW(),
    NOW()
),

-- Haryana Schemes  
(
    'Haryana Capital Investment Promotion Scheme (HCIPS)',
    'Comprehensive capital investment subsidy for all sectors',
    'All industrial units with minimum ₹10 lakh investment',
    '15-35% capital subsidy up to ₹200 crore, extra benefits for backward areas',
    'Online application through Saral Haryana portal',
    'Haryana',
    'Capital Subsidy',
    20000000000,
    'All Sectors', 
    NOW(),
    NOW()
),
(
    'Haryana Employment Generation Subsidy',
    'Incentive for employing SC/ST and local candidates',
    'Units employing minimum 10 local candidates',
    '₹36,000 per SC/ST employee, ₹24,000 per general category over 3 years',
    'Apply through HSIIDC with employment records',
    'Haryana',
    'Employment Incentive',
    3600000,
    'All Sectors',
    NOW(),
    NOW()
),
(
    'Haryana Interest Subsidy Scheme',
    '6% interest subsidy on industrial loans',
    'Manufacturing units with institutional finance',
    '6% interest subsidy for 5 years, maximum ₹1.5 crore annually',
    'Submit loan documents through HSIIDC',
    'Haryana',
    'Interest Subsidy',
    75000000,
    'Manufacturing',
    NOW(),
    NOW()
),

-- Gujarat Schemes
(
    'Gujarat Industrial Policy Package Scheme',
    'Comprehensive incentive package for industrial development',
    'All industrial units as per sector-specific criteria', 
    'Capital subsidy, interest subsidy, infrastructure support',
    'Apply through iNDEXTb portal with complete documentation',
    'Gujarat',
    'Comprehensive Package',
    5000000000,
    'All Sectors',
    NOW(),
    NOW()
),

-- Maharashtra Schemes
(
    'Maharashtra Package Scheme of Incentives',
    'State package scheme for industrial promotion',
    'Manufacturing and service sector units',
    'Capital subsidy, interest subsidy, power subsidy, employment incentive',
    'Online application through MAITRI portal',
    'Maharashtra', 
    'Comprehensive Package',
    10000000000,
    'All Sectors',
    NOW(),
    NOW()
),

-- Tamil Nadu Schemes
(
    'Tamil Nadu Industrial Promotion Policy',
    'Comprehensive industrial promotion with focus on employment',
    'All industrial sectors with job creation commitment',
    'Capital subsidy up to ₹3 crore, additional benefits for backward areas',
    'Apply through TNeGA portal',
    'Tamil Nadu',
    'Capital Subsidy',
    300000000,
    'All Sectors',
    NOW(),
    NOW()
);

-- Add state-specific investment promotion organizations
INSERT INTO "InvestmentPromotion" ("organizationName", "description", "contactEmail", "contactPhone", "website", "state", "services", "createdAt", "updatedAt")  
VALUES
(
    'Uttar Pradesh State Industrial Development Authority (UPSIDA)',
    'Nodal agency for industrial development and investment promotion in UP',
    'info@upsida.gov.in',
    '0522-2393001',
    'https://upsida.gov.in',
    'Uttar Pradesh',
    'Land allotment, industrial infrastructure, single window clearance',
    NOW(),
    NOW()
),
(
    'Haryana State Industrial and Infrastructure Development Corporation (HSIIDC)', 
    'Apex industrial development agency of Haryana government',
    'info@hsiidc.org',
    '0172-2560200', 
    'https://hsiidc.org.in',
    'Haryana',
    'Industrial infrastructure, investment facilitation, scheme implementation',
    NOW(),
    NOW()
),
(
    'Gujarat Industrial Development Corporation (GIDC)',
    'Premier industrial development organization of Gujarat',
    'info@gidc.gov.in',
    '079-23253051',
    'https://gidc.gujarat.gov.in', 
    'Gujarat',
    'Industrial parks, infrastructure development, investment promotion',
    NOW(),
    NOW()
),
(
    'Maharashtra Industrial Development Corporation (MIDC)',
    'State industrial development and investment promotion agency',
    'info@midcindia.org',
    '022-26824306',
    'https://www.midcindia.org',
    'Maharashtra',
    'Industrial estate development, investment facilitation, policy implementation',
    NOW(),
    NOW()
),
(
    'Tamil Nadu Industrial Development Corporation (TIDCO)',
    'Industrial development and investment promotion in Tamil Nadu',
    'info@tidco.com',
    '044-24327000',
    'https://www.tidco.com',
    'Tamil Nadu', 
    'Industrial promotion, infrastructure development, scheme administration',
    NOW(),
    NOW()
);

COMMIT;