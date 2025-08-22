-- Create missing tables for P7 enhanced content

-- Government Schemes table
CREATE TABLE IF NOT EXISTS "GovernmentScheme" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "eligibility" TEXT,
    "benefits" TEXT,
    "applicationProcess" TEXT,
    "state" TEXT,
    "category" TEXT,
    "maximumBenefit" BIGINT,
    "sector" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GovernmentScheme_pkey" PRIMARY KEY ("id")
);

-- Investment Promotion Organizations table
CREATE TABLE IF NOT EXISTS "InvestmentPromotion" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "organizationName" TEXT NOT NULL,
    "description" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "website" TEXT,
    "state" TEXT,
    "services" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InvestmentPromotion_pkey" PRIMARY KEY ("id")
);

-- State Government Officials table
CREATE TABLE IF NOT EXISTS "StateOfficial" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "department" TEXT,
    "state" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "officeAddress" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StateOfficial_pkey" PRIMARY KEY ("id")
);

-- Continue with remaining P7 lessons for all modules

-- Module 3: Western States Excellence Lessons
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    11,
    'Gujarat - India''s Business Paradise',
    'Master Gujarat''s gold standard single-window system. Navigate iNDEXTb, understand Vibrant Gujarat model, and access India''s most business-friendly ecosystem.',
    '[
        "Register on iNDEXTb portal and complete full profile",
        "Study Gujarat Industrial Policy 2020-25 thoroughly", 
        "Connect with GIDC officials for site visits",
        "Plan participation in Vibrant Gujarat Summit"
    ]',
    '[
        "Gujarat iNDEXTb Navigation Masterclass",
        "GIDC Contact Directory with Direct Numbers", 
        "Vibrant Gujarat Summit Networking Guide",
        "Gujarat Success Stories Case Studies"
    ]',
    120,
    150,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 3;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    12,
    'Maharashtra - Industrial Powerhouse Navigation',
    'Navigate Maharashtra''s MAITRI system, understand Mumbai-Pune corridor advantages, and master MIDC relationships for maximum industrial benefits.',
    '[
        "Complete MAITRI portal registration and KYC",
        "Analyze Mumbai-Pune-Nashik industrial triangle", 
        "Connect with MIDC regional offices",
        "Plan Maharashtra industrial visit"
    ]',
    '[
        "MAITRI Portal Complete Guide",
        "MIDC Industrial Parks Directory", 
        "Mumbai-Pune Corridor Analysis Report",
        "Maharashtra Government Contact Database"
    ]',
    120,
    150,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 3;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    13,
    'Rajasthan - Heritage Meets Industry',
    'Unlock Rajasthan''s mineral wealth advantages, textile cluster benefits, and tourism-industry integration opportunities.',
    '[
        "Explore Rajasthan RIICO industrial areas",
        "Study mineral-based industry opportunities", 
        "Connect with textile cluster organizations",
        "Plan heritage tourism integration strategies"
    ]',
    '[
        "RIICO Industrial Area Master Plan",
        "Rajasthan Mineral Resources Map", 
        "Textile Cluster Contact Directory",
        "Tourism-Industry Integration Templates"
    ]',
    90,
    120,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 3;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    14,
    'Goa - Niche Market Opportunities',
    'Navigate Goa''s unique advantages - pharmaceuticals, IT services, and tourism-linked industries with special coastal state benefits.',
    '[
        "Research Goa IT policy and pharmaceutical incentives",
        "Connect with Goa Industrial Development Corporation", 
        "Explore coastal industry advantages",
        "Plan sustainable tourism integration"
    ]',
    '[
        "Goa IT and Pharma Policy Analysis",
        "GIDC Contact and Services Guide", 
        "Coastal Industry Advantages Framework",
        "Sustainable Tourism Integration Models"
    ]',
    75,
    100,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 3;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    15,
    'Western States Ecosystem Integration',
    'Create integrated western states strategy leveraging Mumbai financial hub, Gujarat manufacturing, and Maharashtra-Goa coastal advantages.',
    '[
        "Design multi-state western region strategy",
        "Plan supply chain optimization across western states", 
        "Create financial hub integration approach",
        "Develop coastal-inland connectivity plan"
    ]',
    '[
        "Western States Integration Strategy Template",
        "Multi-state Supply Chain Optimization Guide", 
        "Financial Hub Integration Framework",
        "Coastal-Inland Connectivity Planning Tool"
    ]',
    90,
    120,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 3;

-- Module 4: Southern States Innovation Hub Lessons
INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    16,
    'Karnataka - Silicon Valley of India Mastery',
    'Navigate Karnataka''s tech ecosystem, understand Bengaluru advantages, access startup support systems, and master innovation-focused schemes.',
    '[
        "Register on Karnataka Udyog Mitra portal",
        "Connect with Karnataka Digital Economy Mission", 
        "Explore Bengaluru startup ecosystem opportunities",
        "Plan innovation center collaborations"
    ]',
    '[
        "Karnataka Udyog Mitra Complete Navigation",
        "Bengaluru Startup Ecosystem Directory", 
        "Innovation Center Partnership Templates",
        "Karnataka Digital Economy Policy Guide"
    ]',
    120,
    150,
    1,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 4;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    17,
    'Tamil Nadu - Manufacturing Excellence Hub',
    'Master Tamil Nadu''s automotive and manufacturing cluster advantages, navigate TIDCO systems, and access Chennai-Coimbatore corridor benefits.',
    '[
        "Complete TNeGA portal registration and profile",
        "Study Tamil Nadu automotive cluster ecosystem", 
        "Connect with TIDCO and SIPCOT officials",
        "Plan Chennai-Coimbatore corridor strategy"
    ]',
    '[
        "TNeGA Portal Comprehensive Guide",
        "Tamil Nadu Automotive Cluster Directory", 
        "TIDCO-SIPCOT Services and Contact Guide",
        "Chennai-Coimbatore Corridor Analysis"
    ]',
    120,
    150,
    2,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 4;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    18,
    'Telangana - Hyderabad Innovation Ecosystem',
    'Navigate Telangana''s IT and pharma excellence, master T-Hub relationships, access world-class infrastructure, and leverage government innovation focus.',
    '[
        "Register on Telangana State Portal (TS-iPASS)",
        "Connect with T-Hub and HITEC City ecosystem", 
        "Explore pharma city opportunities",
        "Plan innovation and R&D collaboration"
    ]',
    '[
        "TS-iPASS Portal Navigation Guide",
        "T-Hub and HITEC City Network Directory", 
        "Telangana Pharma City Opportunities Map",
        "Innovation Collaboration Framework"
    ]',
    120,
    150,
    3,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 4;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    19,
    'Andhra Pradesh - Amaravati Future City',
    'Access Andhra Pradesh''s greenfield capital advantages, navigate new infrastructure opportunities, and leverage first-mover benefits in Amaravati.',
    '[
        "Research Andhra Pradesh industrial promotion policies",
        "Connect with APIIC for infrastructure opportunities", 
        "Explore Amaravati development prospects",
        "Plan first-mover advantage strategy"
    ]',
    '[
        "Andhra Pradesh Industrial Policy Analysis",
        "APIIC Infrastructure Development Guide", 
        "Amaravati Development Master Plan",
        "First-mover Advantage Strategy Framework"
    ]',
    90,
    120,
    4,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 4;

INSERT INTO "Lesson" ("moduleId", "day", "title", "briefContent", "actionItems", "resources", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
SELECT 
    m.id,
    20,
    'Kerala - Knowledge Economy Excellence',
    'Navigate Kerala''s IT services strength, access skilled workforce advantages, leverage port connectivity, and integrate with knowledge economy initiatives.',
    '[
        "Explore Kerala IT Mission opportunities",
        "Connect with Technopark and other IT parks", 
        "Study port connectivity for export businesses",
        "Plan skilled workforce utilization strategy"
    ]',
    '[
        "Kerala IT Mission Policy and Contact Guide",
        "IT Parks and Infrastructure Directory", 
        "Port Connectivity and Export Guide",
        "Skilled Workforce Utilization Framework"
    ]',
    90,
    120,
    5,
    NOW(),
    NOW()
FROM "Module" m 
JOIN "Product" p ON m."productId" = p.id 
WHERE p.code = 'P7' AND m."orderIndex" = 4;

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
),

-- Karnataka Schemes
(
    'Karnataka Industrial Policy Incentives',
    'Comprehensive industrial development incentive package',
    'Manufacturing and IT sector units with minimum investment',
    'Capital subsidy up to ₹5 crore, additional IT sector benefits',
    'Apply through Udyog Mitra portal',
    'Karnataka',
    'Capital Subsidy',
    500000000,
    'All Sectors',
    NOW(),
    NOW()
),

-- Telangana Schemes
(
    'Telangana State Industrial Project Approval and Self Certification System (TS-iPASS)',
    'Single window clearance with comprehensive incentive package',
    'All industrial and service sector investments',
    'Capital subsidy, power cost reimbursement, stamp duty exemption',
    'Online application through TS-iPASS portal',
    'Telangana',
    'Comprehensive Package',
    15000000000,
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
),
(
    'Karnataka Industrial Areas Development Board (KIADB)',
    'Industrial area development and land acquisition in Karnataka',
    'info@kiadb.in',
    '080-22267426',
    'https://www.kiadb.in',
    'Karnataka',
    'Industrial area development, land allotment, infrastructure creation',
    NOW(),
    NOW()
),
(
    'Telangana State Industrial Infrastructure Corporation (TSIIC)',
    'Industrial infrastructure development in Telangana',
    'info@tsiic.telangana.gov.in',
    '040-23120111',
    'https://tsiic.telangana.gov.in',
    'Telangana',
    'Industrial infrastructure, TS-iPASS implementation, investment facilitation',
    NOW(),
    NOW()
);

-- Add state government key officials data
INSERT INTO "StateOfficial" ("name", "designation", "department", "state", "contactEmail", "contactPhone", "officeAddress", "createdAt", "updatedAt")
VALUES
(
    'Alok Kumar',
    'Principal Secretary',
    'Industries Department',
    'Uttar Pradesh',
    'ps.industries@up.gov.in',
    '0522-2239204',
    'Udyog Bandhu, 3rd Floor, Nirman Bhawan, Gomti Nagar, Lucknow - 226010',
    NOW(),
    NOW()
),
(
    'Navdeep Singh Virk',
    'Principal Secretary',
    'Industries and Commerce',
    'Haryana',
    'psindustries@hry.gov.in',
    '0172-2564006',
    'Civil Secretariat, Sector-1, Chandigarh - 160001',
    NOW(),
    NOW()
),
(
    'Rajesh Kumar Singh',
    'Principal Secretary',
    'Industries and Mines',
    'Gujarat',
    'psindustries@gujarat.gov.in',
    '079-23252489',
    'Block No. 11, 3rd Floor, Sardar Bhawan, Gandhinagar - 382010',
    NOW(),
    NOW()
),
(
    'Harshadeep Kamble',
    'Principal Secretary',
    'Industries Department',
    'Maharashtra',
    'psindustries@maharashtra.gov.in',
    '022-22025482',
    'Mantralaya, Mumbai - 400032',
    NOW(),
    NOW()
),
(
    'N. Muruganandam',
    'Principal Secretary',
    'Industries Department',
    'Tamil Nadu',
    'psindustries@tn.gov.in',
    '044-28511001',
    'Secretariat, Fort St. George, Chennai - 600009',
    NOW(),
    NOW()
),
(
    'Dr. E.V. Ramana Reddy',
    'Principal Secretary',
    'Industries and Commerce',
    'Karnataka',
    'psindustries@karnataka.gov.in',
    '080-22252596',
    'Vidhana Soudha, Bangalore - 560001',
    NOW(),
    NOW()
),
(
    'Jayesh Ranjan',
    'Principal Secretary',
    'Industries and Commerce',
    'Telangana',
    'psindustries@telangana.gov.in',
    '040-23450114',
    'BRKR Bhawan, Tank Bund Road, Hyderabad - 500063',
    NOW(),
    NOW()
);

COMMIT;