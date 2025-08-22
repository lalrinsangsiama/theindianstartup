-- P10: Patent Mastery for Indian Startups - Complete Database Schema
-- Migration Script for Comprehensive Patent Management System

-- =============================================
-- P10 Core Course Structure
-- =============================================

-- Insert P10 Product
INSERT INTO "Product" (
    id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt"
) VALUES (
    'p10_patent_mastery',
    'P10',
    'Patent Mastery for Indian Startups',
    'Master intellectual property from filing to monetization with comprehensive patent strategy development',
    799900, -- ₹7,999
    60,
    NOW(),
    NOW()
);

-- =============================================
-- P10 Module Structure (12 Comprehensive Modules)
-- =============================================

-- Module 1: Patent Fundamentals & IP Landscape (Days 1-5)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_1',
    'p10_patent_mastery',
    'Patent Fundamentals & IP Landscape',
    'Master all forms of IP protection, economic value of patents, and Indian patent system navigation',
    1,
    NOW(),
    NOW()
);

-- Module 2: Pre-Filing Strategy & Preparation (Days 6-10)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_2',
    'p10_patent_mastery',
    'Pre-Filing Strategy & Preparation',
    'Systematic invention documentation, patentability assessment, professional patent drafting, and claims development',
    2,
    NOW(),
    NOW()
);

-- Module 3: Filing Process Mastery (Days 11-16)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_3',
    'p10_patent_mastery',
    'Filing Process Mastery',
    'Strategic jurisdiction selection, Indian Patent Office navigation, international filing optimization',
    3,
    NOW(),
    NOW()
);

-- Module 4: Prosecution & Examination (Days 17-22)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_4',
    'p10_patent_mastery',
    'Prosecution & Examination',
    'Office action responses, rejection handling, opposition proceedings, and grant procedures',
    4,
    NOW(),
    NOW()
);

-- Module 5: Patent Portfolio Management (Days 23-27)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_5',
    'p10_patent_mastery',
    'Patent Portfolio Management',
    'Strategic portfolio building, landscaping, optimization, IP governance, and analytics',
    5,
    NOW(),
    NOW()
);

-- Module 6: Commercialization & Monetization (Days 28-33)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_6',
    'p10_patent_mastery',
    'Commercialization & Monetization',
    'Patent valuation, licensing strategies, sales, strategic partnerships, and revenue generation',
    6,
    NOW(),
    NOW()
);

-- Module 7: Industry-Specific Strategies (Days 34-38)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_7',
    'p10_patent_mastery',
    'Industry-Specific Strategies',
    'Specialized patent strategies for software/AI, biotech/pharma, hardware, fintech, and traditional industries',
    7,
    NOW(),
    NOW()
);

-- Module 8: International Patent Strategy (Days 39-43)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_8',
    'p10_patent_mastery',
    'International Patent Strategy',
    'Global filing strategies, major jurisdiction deep-dive, translation/localization, enforcement',
    8,
    NOW(),
    NOW()
);

-- Module 9: Cost Management & Funding (Days 44-45)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_9',
    'p10_patent_mastery',
    'Cost Management & Funding',
    'Complete cost breakdown analysis and funding/support strategy development',
    9,
    NOW(),
    NOW()
);

-- Module 10: Advanced Litigation & Disputes (Days 46-50)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_10',
    'p10_patent_mastery',
    'Advanced Litigation & Disputes',
    'Patent litigation process, evidence collection, damages calculation, settlement strategies',
    10,
    NOW(),
    NOW()
);

-- Module 11: Advanced Prosecution (Days 51-55)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_11',
    'p10_patent_mastery',
    'Advanced Prosecution',
    'Complex response strategies, appeal procedures, international prosecution coordination',
    11,
    NOW(),
    NOW()
);

-- Module 12: Emerging Technologies (Days 56-60)
INSERT INTO "Module" (
    id, "productId", title, description, "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_module_12',
    'p10_patent_mastery',
    'Emerging Technologies',
    'Patent strategies for quantum computing, gene editing, autonomous vehicles, Web3, and future technologies',
    12,
    NOW(),
    NOW()
);

-- =============================================
-- P10 Lessons - Module 1: Patent Fundamentals
-- =============================================

-- Day 1: Understanding the Intellectual Property Ecosystem
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_lesson_1',
    'p10_module_1',
    1,
    'Understanding the Intellectual Property Ecosystem',
    'Master all forms of IP protection, economic value of patents for startups, and navigate the Indian IP landscape confidently. Create comprehensive IP strategy framework.',
    '[
        {
            "title": "Complete IP Portfolio Audit",
            "description": "List all potentially patentable innovations, identify trademark needs, document trade secrets, and evaluate copyright-worthy materials",
            "timeRequired": "120 minutes",
            "deliverable": "Complete IP asset inventory with 50+ identified opportunities"
        },
        {
            "title": "Develop IP Strategy Framework",
            "description": "Answer strategic questions about innovation portfolio, market analysis, business strategy, and resource planning",
            "timeRequired": "90 minutes",
            "deliverable": "Strategic IP framework document with decision criteria"
        },
        {
            "title": "Cost-Benefit Analysis Completion",
            "description": "Calculate patent investment ROI using provided framework and establish portfolio justification",
            "timeRequired": "60 minutes",
            "deliverable": "ROI analysis with 3x benefit threshold validation"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "IP Strategy Canvas",
            "description": "Business Model Canvas adaptation for intellectual property strategy development",
            "url": "/templates/p10/ip-strategy-canvas.xlsx"
        },
        {
            "type": "template",
            "title": "Innovation Disclosure Template",
            "description": "Systematic template for capturing and documenting invention details",
            "url": "/templates/p10/innovation-disclosure-template.docx"
        },
        {
            "type": "calculator",
            "title": "IP ROI Calculator",
            "description": "Comprehensive tool for calculating return on IP investment with scenario analysis",
            "url": "/templates/p10/ip-roi-calculator.xlsx"
        },
        {
            "type": "video",
            "title": "Building IP Strategy for Startups Masterclass",
            "description": "60-minute expert masterclass on developing comprehensive IP strategy",
            "url": "/videos/p10/ip-strategy-masterclass.mp4"
        }
    ]'::jsonb,
    180,
    120,
    1,
    NOW(),
    NOW()
);

-- Day 2: What Can and Cannot Be Patented in India
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES (
    'p10_lesson_2',
    'p10_module_1',
    2,
    'What Can and Cannot Be Patented in India',
    'Master Section 3 exclusions and circumvention strategies, understand software patentability in Indian context, navigate AI/ML patent claiming requirements.',
    '[
        {
            "title": "Innovation Patentability Assessment",
            "description": "Evaluate each innovation using comprehensive patentability scorecard with 55-point assessment framework",
            "timeRequired": "150 minutes",
            "deliverable": "Patentability scores for 5+ innovations with filing recommendations"
        },
        {
            "title": "Technical Effect Documentation",
            "description": "Document technical effects for software/AI innovations with performance improvements and system architecture",
            "timeRequired": "90 minutes",
            "deliverable": "Technical effect evidence packages for software innovations"
        },
        {
            "title": "Circumvention Strategy Development",
            "description": "Develop strategies to overcome Section 3 challenges with alternative technical implementations",
            "timeRequired": "60 minutes",
            "deliverable": "Circumvention strategy document for each Section 3 challenge"
        }
    ]'::jsonb,
    '[
        {
            "type": "tool",
            "title": "Patentability Checker",
            "description": "AI-powered initial assessment tool for patent eligibility evaluation",
            "url": "/tools/p10/patentability-checker"
        },
        {
            "type": "template",
            "title": "Technical Effect Documentation Template",
            "description": "Structured template for documenting software patent technical effects",
            "url": "/templates/p10/technical-effect-template.docx"
        },
        {
            "type": "guide",
            "title": "Section 3 Navigator Guide",
            "description": "Comprehensive guide for exclusion avoidance and circumvention strategies",
            "url": "/guides/p10/section-3-navigator.pdf"
        }
    ]'::jsonb,
    120,
    100,
    2,
    NOW(),
    NOW()
);

-- Continue with remaining lessons for Module 1 (Days 3-5)
INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_3',
    'p10_module_1',
    3,
    'Types of Patent Applications',
    'Master provisional vs complete specifications, understand convention applications, PCT strategies, and divisional application planning.',
    '[]'::jsonb,
    '[]'::jsonb,
    90,
    80,
    3,
    NOW(),
    NOW()
),
(
    'p10_lesson_4',
    'p10_module_1',
    4,
    'Patent Lifecycle & Timelines',
    'Understand 20-year patent term, master priority dates, publication rules, examination timelines, and renewal strategies.',
    '[]'::jsonb,
    '[]'::jsonb,
    90,
    80,
    4,
    NOW(),
    NOW()
),
(
    'p10_lesson_5',
    'p10_module_1',
    5,
    'Building Patent Intelligence',
    'Master patent searching, database utilization, freedom to operate analysis, and competitive intelligence gathering.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    100,
    5,
    NOW(),
    NOW()
);

-- =============================================
-- P10 Lessons - Module 2: Pre-Filing Strategy
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_6',
    'p10_module_2',
    6,
    'Invention Disclosure & Documentation',
    'Master systematic invention documentation, co-inventor determination, evidence chains, and comprehensive tracking systems.',
    '[
        {
            "title": "Documentation System Setup",
            "description": "Configure digital documentation platform with blockchain verification and systematic numbering",
            "timeRequired": "180 minutes",
            "deliverable": "Operational documentation system with 5 inventions documented"
        },
        {
            "title": "Legal Framework Implementation",
            "description": "Update employment agreements and contractor contracts with comprehensive IP assignment clauses",
            "timeRequired": "120 minutes",
            "deliverable": "Updated legal framework with executed agreements"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Digital Invention Disclosure Form",
            "description": "Interactive PDF with blockchain timestamp capability for legal admissibility",
            "url": "/templates/p10/invention-disclosure-blockchain.pdf"
        },
        {
            "type": "template",
            "title": "Employment IP Agreement Template",
            "description": "Comprehensive employment agreement with work-for-hire and assignment provisions",
            "url": "/templates/p10/employment-ip-agreement.docx"
        }
    ]'::jsonb,
    120,
    120,
    6,
    NOW(),
    NOW()
),
(
    'p10_lesson_7',
    'p10_module_2',
    7,
    'Patentability Assessment',
    'Master DIY prior art searching, systematic patentability evaluation, professional opinion writing, and go/no-go decision matrices.',
    '[]'::jsonb,
    '[]'::jsonb,
    150,
    140,
    7,
    NOW(),
    NOW()
),
(
    'p10_lesson_8',
    'p10_module_2',
    8,
    'Patent Drafting Basics',
    'Learn professional patent application structure, strategic title crafting, abstract excellence, and technical writing mastery.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    120,
    8,
    NOW(),
    NOW()
),
(
    'p10_lesson_9',
    'p10_module_2',
    9,
    'Claims - The Heart of Patents',
    'Master claim drafting, understand different claim types, balance broad vs narrow protection, and avoid common rejections.',
    '[]'::jsonb,
    '[]'::jsonb,
    150,
    140,
    9,
    NOW(),
    NOW()
),
(
    'p10_lesson_10',
    'p10_module_2',
    10,
    'Drawings and Specifications',
    'Master patent drawing requirements, learn technical drawing software, understand reference numeral systems, and create professional visuals.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    120,
    10,
    NOW(),
    NOW()
);

-- =============================================
-- P10 Lessons - Module 3: Filing Process
-- =============================================

INSERT INTO "Lesson" (
    id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
) VALUES 
(
    'p10_lesson_11',
    'p10_module_3',
    11,
    'Choosing Where to File',
    'Master global filing strategy, jurisdiction selection optimization, cost-benefit analysis, and market-based filing decisions.',
    '[
        {
            "title": "Comprehensive Market Assessment",
            "description": "Analyze top 10 target markets using market scoring matrix and competitor filing patterns",
            "timeRequired": "180 minutes",
            "deliverable": "Market prioritization with 5-year filing roadmap"
        },
        {
            "title": "Cost-Benefit Financial Modeling",
            "description": "Create ROI models for all target jurisdictions with sensitivity analysis",
            "timeRequired": "120 minutes",
            "deliverable": "Financial model with 300%+ ROI threshold validation"
        }
    ]'::jsonb,
    '[
        {
            "type": "template",
            "title": "Jurisdiction Selection Matrix",
            "description": "Comprehensive market evaluation framework with 100-point scoring system",
            "url": "/templates/p10/jurisdiction-selection-matrix.xlsx"
        },
        {
            "type": "calculator",
            "title": "Global Filing Cost-Benefit Calculator",
            "description": "ROI analysis tool for international patent portfolio decisions",
            "url": "/templates/p10/global-filing-calculator.xlsx"
        }
    ]'::jsonb,
    150,
    140,
    11,
    NOW(),
    NOW()
),
(
    'p10_lesson_12',
    'p10_module_3',
    12,
    'Indian Patent Office Navigation',
    'Master IPO system architecture, e-filing procedures, fee optimization, and physical filing requirements.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    120,
    12,
    NOW(),
    NOW()
),
(
    'p10_lesson_13',
    'p10_module_3',
    13,
    'Forms and Documentation Deep Dive',
    'Excel at all patent application forms, priority document handling, power of attorney procedures, and startup benefit optimization.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    120,
    13,
    NOW(),
    NOW()
),
(
    'p10_lesson_14',
    'p10_module_3',
    14,
    'Practical Filing Workshop',
    'Hands-on e-filing demonstration, error correction, document formatting, and fee calculation with real applications.',
    '[]'::jsonb,
    '[]'::jsonb,
    180,
    150,
    14,
    NOW(),
    NOW()
),
(
    'p10_lesson_15',
    'p10_module_3',
    15,
    'Startup Benefits & Schemes',
    'Master Startup India patent scheme, SIPP program, expedited examination, and state government benefits.',
    '[]'::jsonb,
    '[]'::jsonb,
    90,
    100,
    15,
    NOW(),
    NOW()
),
(
    'p10_lesson_16',
    'p10_module_3',
    16,
    'International Filing Strategies',
    'Optimize PCT route, direct filing strategies, priority management, and cost optimization for global protection.',
    '[]'::jsonb,
    '[]'::jsonb,
    120,
    120,
    16,
    NOW(),
    NOW()
);

-- =============================================
-- P10 Advanced Patent Management Tables
-- =============================================

-- Patent Database for Prior Art and Competitive Intelligence
CREATE TABLE IF NOT EXISTS "PatentDatabase" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "patentNumber" TEXT NOT NULL,
    title TEXT NOT NULL,
    abstract TEXT,
    applicant TEXT NOT NULL,
    inventors TEXT[] DEFAULT '{}',
    "filingDate" DATE,
    "publicationDate" DATE,
    "grantDate" DATE,
    "expiryDate" DATE,
    jurisdiction TEXT NOT NULL,
    "ipcCodes" TEXT[] DEFAULT '{}',
    "cpcCodes" TEXT[] DEFAULT '{}',
    "technologyArea" TEXT,
    "legalStatus" TEXT DEFAULT 'active',
    claims JSONB,
    "forwardCitations" TEXT[] DEFAULT '{}',
    "backwardCitations" TEXT[] DEFAULT '{}',
    "familyMembers" TEXT[] DEFAULT '{}',
    "isCompetitorPatent" BOOLEAN DEFAULT false,
    "competitorName" TEXT,
    "relevanceScore" INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    notes TEXT,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Patent Portfolio Management
CREATE TABLE IF NOT EXISTS "PatentPortfolio" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "portfolioName" TEXT NOT NULL,
    description TEXT,
    "totalPatents" INTEGER DEFAULT 0,
    "activePatents" INTEGER DEFAULT 0,
    "pendingApplications" INTEGER DEFAULT 0,
    "grantedPatents" INTEGER DEFAULT 0,
    "portfolioValue" DECIMAL(15,2),
    "annualMaintenanceCost" DECIMAL(12,2),
    "technologyAreas" TEXT[] DEFAULT '{}',
    jurisdictions TEXT[] DEFAULT '{}',
    "strategicGoals" JSONB,
    "performanceMetrics" JSONB,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Individual Patent Applications Tracking
CREATE TABLE IF NOT EXISTS "PatentApplication" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT,
    "applicationNumber" TEXT,
    title TEXT NOT NULL,
    "inventionType" TEXT NOT NULL,
    status TEXT DEFAULT 'draft', -- draft, filed, examination, granted, rejected, abandoned
    jurisdiction TEXT NOT NULL,
    "filingDate" DATE,
    "priorityDate" DATE,
    "publicationDate" DATE,
    "grantDate" DATE,
    "expiryDate" DATE,
    inventors JSONB DEFAULT '[]',
    applicants JSONB DEFAULT '[]',
    "patentAgent" TEXT,
    "filingCosts" DECIMAL(10,2),
    "prosecutionCosts" DECIMAL(10,2),
    "maintenanceCosts" DECIMAL(10,2),
    "totalInvestment" DECIMAL(12,2),
    "estimatedValue" DECIMAL(12,2),
    "technologyArea" TEXT,
    "businessUnit" TEXT,
    "commercialStatus" TEXT,
    "licenseStatus" TEXT,
    milestones JSONB DEFAULT '[]',
    documents JSONB DEFAULT '[]',
    "officeActions" JSONB DEFAULT '[]',
    "competitiveAnalysis" JSONB,
    notes TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("portfolioId") REFERENCES "PatentPortfolio"(id) ON DELETE SET NULL
);

-- Patent Office Actions and Prosecution History
CREATE TABLE IF NOT EXISTS "PatentOfficeAction" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "applicationId" TEXT NOT NULL,
    "actionType" TEXT NOT NULL, -- first-examination-report, office-action, notice, grant-certificate
    "actionDate" DATE NOT NULL,
    "responseDeadline" DATE,
    "actionContent" TEXT,
    "examinerName" TEXT,
    "examinerComments" TEXT,
    "claimRejections" JSONB DEFAULT '[]',
    "formalObjections" JSONB DEFAULT '[]',
    "priorArtReferences" JSONB DEFAULT '[]',
    "responseStatus" TEXT DEFAULT 'pending', -- pending, responded, late, abandoned
    "responseDate" DATE,
    "responseContent" TEXT,
    "responseStrategy" TEXT,
    "attorneyFees" DECIMAL(8,2),
    "isResolved" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("applicationId") REFERENCES "PatentApplication"(id) ON DELETE CASCADE
);

-- Patent Licensing and Commercialization
CREATE TABLE IF NOT EXISTS "PatentLicense" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "applicationId" TEXT NOT NULL,
    "licenseeCompany" TEXT NOT NULL,
    "licenseType" TEXT NOT NULL, -- exclusive, non-exclusive, sole
    "licenseScope" TEXT, -- field-of-use, geographic, temporal
    "effectiveDate" DATE NOT NULL,
    "expiryDate" DATE,
    "upfrontPayment" DECIMAL(12,2),
    "royaltyRate" DECIMAL(5,2),
    "minimumRoyalty" DECIMAL(10,2),
    "milestonePayments" JSONB DEFAULT '[]',
    "totalRevenue" DECIMAL(15,2) DEFAULT 0,
    "revenueToDate" DECIMAL(15,2) DEFAULT 0,
    "paymentTerms" TEXT,
    "performanceMetrics" JSONB,
    "complianceStatus" TEXT DEFAULT 'active',
    "contractDocument" TEXT,
    notes TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("applicationId") REFERENCES "PatentApplication"(id) ON DELETE CASCADE
);

-- Prior Art and Competitive Intelligence
CREATE TABLE IF NOT EXISTS "PriorArtSearch" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "applicationId" TEXT,
    "searchQuery" TEXT NOT NULL,
    "searchStrategy" TEXT,
    "databasesSearched" TEXT[] DEFAULT '{}',
    "searchDate" DATE DEFAULT CURRENT_DATE,
    "totalResults" INTEGER DEFAULT 0,
    "relevantResults" INTEGER DEFAULT 0,
    "topReferences" JSONB DEFAULT '[]',
    "noveltyAssessment" TEXT,
    "obviousnessAnalysis" TEXT,
    "patentabilityOpinion" TEXT,
    "searchReport" TEXT,
    "searchCost" DECIMAL(8,2),
    "searcherName" TEXT,
    "qualityScore" INTEGER,
    "isCompleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("applicationId") REFERENCES "PatentApplication"(id) ON DELETE SET NULL
);

-- IP Strategy and Analytics
CREATE TABLE IF NOT EXISTS "IPStrategy" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "strategyName" TEXT NOT NULL,
    "strategicObjectives" JSONB DEFAULT '[]',
    "targetMarkets" TEXT[] DEFAULT '{}',
    "competitiveAnalysis" JSONB,
    "technologyRoadmap" JSONB,
    "filingStrategy" JSONB,
    "budgetAllocation" JSONB,
    "riskAssessment" JSONB,
    "performanceKpis" JSONB,
    "reviewSchedule" TEXT,
    "lastReviewDate" DATE,
    "nextReviewDate" DATE,
    "strategicValue" DECIMAL(15,2),
    "implementationStatus" TEXT DEFAULT 'planning',
    "approvalStatus" TEXT DEFAULT 'draft',
    "approvedBy" TEXT,
    "approvalDate" DATE,
    notes TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Patent Analytics and Reporting
CREATE TABLE IF NOT EXISTS "PatentAnalytics" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "portfolioId" TEXT,
    "reportType" TEXT NOT NULL, -- landscape, competitive, valuation, roi
    "reportTitle" TEXT NOT NULL,
    "analysisScope" TEXT,
    "dataSource" TEXT[] DEFAULT '{}',
    "analysisMethod" TEXT,
    "keyFindings" JSONB DEFAULT '[]',
    "visualizations" JSONB DEFAULT '[]',
    "recommendations" JSONB DEFAULT '[]',
    "marketInsights" JSONB,
    "competitiveGaps" JSONB,
    "investmentPriorities" JSONB,
    "riskFactors" JSONB,
    "reportDocument" TEXT,
    "reportDate" DATE DEFAULT CURRENT_DATE,
    "reportStatus" TEXT DEFAULT 'draft',
    "confidentialityLevel" TEXT DEFAULT 'internal',
    "distributionList" TEXT[] DEFAULT '{}',
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("portfolioId") REFERENCES "PatentPortfolio"(id) ON DELETE SET NULL
);

-- =============================================
-- P10 Course Templates and Resources
-- =============================================

INSERT INTO "CourseTemplate" ("productCode", name, description, category, type, "fileUrl", "isActive")
VALUES 
-- Module 1 Templates
('P10', 'IP Strategy Canvas', 'Business Model Canvas adaptation for intellectual property strategy development', 'strategy', 'template', '/templates/p10/ip-strategy-canvas.xlsx', true),
('P10', 'Innovation Disclosure Template', 'Systematic template for capturing and documenting invention details', 'documentation', 'template', '/templates/p10/innovation-disclosure-template.docx', true),
('P10', 'Competitive IP Analysis Template', 'Track competitor patents and identify strategic opportunities', 'analysis', 'template', '/templates/p10/competitive-analysis-template.xlsx', true),
('P10', 'IP Budget Planning Template', '3-year financial planning for patent portfolio development', 'financial', 'template', '/templates/p10/budget-planning-template.xlsx', true),
('P10', 'Patent Cost Calculator', 'Estimate filing and maintenance costs across jurisdictions', 'financial', 'calculator', '/templates/p10/patent-cost-calculator.xlsx', true),
('P10', 'IP ROI Calculator', 'Calculate return on IP investment with scenario analysis', 'financial', 'calculator', '/templates/p10/ip-roi-calculator.xlsx', true),

-- Module 2 Templates
('P10', 'Digital Invention Disclosure Form', 'Interactive PDF with blockchain timestamp capability', 'documentation', 'template', '/templates/p10/invention-disclosure-blockchain.pdf', true),
('P10', 'Employment IP Agreement Template', 'Comprehensive employment agreement with IP assignment provisions', 'legal', 'template', '/templates/p10/employment-ip-agreement.docx', true),
('P10', 'Patentability Assessment Form', 'Comprehensive evaluation framework with 55-point scoring system', 'assessment', 'template', '/templates/p10/patentability-assessment.docx', true),
('P10', 'Claim Chart Template', 'Element-by-element prior art comparison format', 'analysis', 'template', '/templates/p10/claim-chart-template.docx', true),
('P10', 'Patent Application Structure Template', 'Professional format with comprehensive guidance', 'drafting', 'template', '/templates/p10/application-structure-template.docx', true),

-- Module 3 Templates
('P10', 'Jurisdiction Selection Matrix', 'Comprehensive market evaluation framework', 'strategy', 'template', '/templates/p10/jurisdiction-selection-matrix.xlsx', true),
('P10', 'Global Filing Cost-Benefit Calculator', 'ROI analysis tool for international portfolio decisions', 'financial', 'calculator', '/templates/p10/global-filing-calculator.xlsx', true),
('P10', 'E-Filing Checklist', 'Complete pre-filing preparation guide', 'process', 'checklist', '/templates/p10/e-filing-checklist.pdf', true),
('P10', 'Patent Office Form Templates', 'All Indian Patent Office forms with guidance', 'forms', 'template', '/templates/p10/patent-office-forms.zip', true),
('P10', 'Fee Optimization Calculator', 'Calculate maximum available benefits and reductions', 'financial', 'calculator', '/templates/p10/fee-optimization-calculator.xlsx', true),

-- Advanced Templates
('P10', 'Patent Portfolio Dashboard', 'Comprehensive portfolio management and analytics', 'management', 'template', '/templates/p10/portfolio-dashboard.xlsx', true),
('P10', 'Licensing Agreement Template', 'Professional licensing contract with terms optimization', 'legal', 'template', '/templates/p10/licensing-agreement-template.docx', true),
('P10', 'Patent Valuation Model', 'Professional patent valuation using multiple methodologies', 'financial', 'calculator', '/templates/p10/valuation-model.xlsx', true),
('P10', 'Prior Art Search Report Template', 'Professional search report format for patentability opinions', 'analysis', 'template', '/templates/p10/search-report-template.docx', true),
('P10', 'International Filing Timeline Planner', 'Coordinate global filing deadlines and priorities', 'planning', 'template', '/templates/p10/international-timeline-planner.xlsx', true);

-- =============================================
-- P10 Interactive Tools and Calculators
-- =============================================

-- IP Strategy Assessment Tool
INSERT INTO "InteractiveTool" (id, "productCode", name, description, category, "toolUrl", "isActive", "createdAt", "updatedAt")
VALUES 
('ip_strategy_assessment', 'P10', 'IP Strategy Assessment Tool', 'Comprehensive assessment tool for developing optimal IP strategy based on business objectives', 'strategy', '/tools/p10/ip-strategy-assessment', true, NOW(), NOW()),
('patentability_checker', 'P10', 'Patentability Checker', 'AI-powered initial assessment for patent eligibility evaluation', 'assessment', '/tools/p10/patentability-checker', true, NOW(), NOW()),
('prior_art_search_engine', 'P10', 'Prior Art Search Engine', 'Comprehensive search interface across global patent databases', 'research', '/tools/p10/prior-art-search', true, NOW(), NOW()),
('patent_landscape_analyzer', 'P10', 'Patent Landscape Analyzer', 'Competitive intelligence and white space analysis tool', 'analysis', '/tools/p10/landscape-analyzer', true, NOW(), NOW()),
('portfolio_optimizer', 'P10', 'Portfolio Optimizer', 'Optimize patent portfolio for maximum strategic value', 'optimization', '/tools/p10/portfolio-optimizer', true, NOW(), NOW()),
('licensing_calculator', 'P10', 'Licensing Revenue Calculator', 'Calculate optimal licensing terms and revenue projections', 'financial', '/tools/p10/licensing-calculator', true, NOW(), NOW());

-- Create table for Interactive Tools if it doesn't exist
CREATE TABLE IF NOT EXISTS "InteractiveTool" (
    id TEXT PRIMARY KEY,
    "productCode" TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    "toolUrl" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- P10 Expert Network and Resources
-- =============================================

-- Patent Attorneys and Experts Directory
CREATE TABLE IF NOT EXISTS "PatentExpert" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    name TEXT NOT NULL,
    title TEXT,
    firm TEXT,
    specializations TEXT[] DEFAULT '{}',
    jurisdictions TEXT[] DEFAULT '{}',
    "technologyAreas" TEXT[] DEFAULT '{}',
    "yearsExperience" INTEGER,
    "patentsFiled" INTEGER,
    "successRate" DECIMAL(5,2),
    languages TEXT[] DEFAULT '{}',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "linkedinProfile" TEXT,
    "professionalProfile" TEXT,
    "consultationRate" DECIMAL(8,2),
    "availabilityStatus" TEXT DEFAULT 'available',
    rating DECIMAL(3,2),
    "reviewCount" INTEGER DEFAULT 0,
    "isVerified" BOOLEAN DEFAULT false,
    "joinedAt" TIMESTAMP DEFAULT NOW(),
    "lastActive" TIMESTAMP DEFAULT NOW()
);

-- Insert sample patent experts
INSERT INTO "PatentExpert" (name, title, firm, specializations, jurisdictions, "technologyAreas", "yearsExperience", "patentsFiled", "successRate", languages, "contactEmail")
VALUES 
('Dr. Rajesh Kumar', 'Senior Patent Attorney', 'Kumar & Associates', ARRAY['Software Patents', 'AI/ML', 'Fintech'], ARRAY['India', 'US', 'EU'], ARRAY['Information Technology', 'Financial Services'], 15, 500, 85.5, ARRAY['English', 'Hindi'], 'rajesh@kumarassociates.com'),
('Priya Sharma', 'Patent Agent & IP Strategist', 'IP Innovations Ltd', ARRAY['Biotechnology', 'Pharmaceuticals', 'Medical Devices'], ARRAY['India', 'US'], ARRAY['Life Sciences', 'Healthcare'], 12, 300, 82.3, ARRAY['English', 'Hindi', 'Tamil'], 'priya@ipinnovations.co.in'),
('Amit Patel', 'Patent Portfolio Manager', 'TechIP Solutions', ARRAY['Electronics', 'Telecommunications', 'IoT'], ARRAY['India', 'China', 'Japan'], ARRAY['Electronics', 'Telecommunications'], 18, 750, 88.7, ARRAY['English', 'Hindi', 'Gujarati'], 'amit@techiipsolutions.com');

-- =============================================
-- Sample Data and Test Cases
-- =============================================

-- Sample patent portfolio for testing
INSERT INTO "PatentPortfolio" ("userId", "portfolioName", description, "totalPatents", "activePatents", "portfolioValue", "technologyAreas", jurisdictions)
VALUES 
('user_sample', 'Startup AI Portfolio', 'AI and machine learning patent portfolio for fintech startup', 5, 3, 2500000.00, ARRAY['Artificial Intelligence', 'Financial Technology'], ARRAY['India', 'United States']);

-- Sample patent application
INSERT INTO "PatentApplication" ("userId", "portfolioId", title, "inventionType", status, jurisdiction, "filingDate", inventors, "technologyArea", "totalInvestment")
VALUES 
('user_sample', (SELECT id FROM "PatentPortfolio" WHERE "portfolioName" = 'Startup AI Portfolio'), 'AI-Powered Fraud Detection System', 'Software System', 'examination', 'India', '2024-01-15', 
'[{"name": "John Doe", "role": "Lead Developer"}, {"name": "Jane Smith", "role": "Data Scientist"}]'::jsonb, 'Artificial Intelligence', 150000.00);

-- =============================================
-- Indexes for Performance Optimization
-- =============================================

-- Patent Database indexes
CREATE INDEX IF NOT EXISTS idx_patent_database_applicant ON "PatentDatabase"("applicant");
CREATE INDEX IF NOT EXISTS idx_patent_database_jurisdiction ON "PatentDatabase"("jurisdiction");
CREATE INDEX IF NOT EXISTS idx_patent_database_technology ON "PatentDatabase"("technologyArea");
CREATE INDEX IF NOT EXISTS idx_patent_database_filing_date ON "PatentDatabase"("filingDate");
CREATE INDEX IF NOT EXISTS idx_patent_database_legal_status ON "PatentDatabase"("legalStatus");

-- Patent Portfolio indexes
CREATE INDEX IF NOT EXISTS idx_patent_portfolio_user ON "PatentPortfolio"("userId");
CREATE INDEX IF NOT EXISTS idx_patent_application_user ON "PatentApplication"("userId");
CREATE INDEX IF NOT EXISTS idx_patent_application_portfolio ON "PatentApplication"("portfolioId");
CREATE INDEX IF NOT EXISTS idx_patent_application_status ON "PatentApplication"("status");

-- Patent Office Action indexes
CREATE INDEX IF NOT EXISTS idx_office_action_application ON "PatentOfficeAction"("applicationId");
CREATE INDEX IF NOT EXISTS idx_office_action_date ON "PatentOfficeAction"("actionDate");
CREATE INDEX IF NOT EXISTS idx_office_action_response_status ON "PatentOfficeAction"("responseStatus");

-- Analytics and Search indexes
CREATE INDEX IF NOT EXISTS idx_prior_art_user ON "PriorArtSearch"("userId");
CREATE INDEX IF NOT EXISTS idx_prior_art_application ON "PriorArtSearch"("applicationId");
CREATE INDEX IF NOT EXISTS idx_ip_strategy_user ON "IPStrategy"("userId");
CREATE INDEX IF NOT EXISTS idx_patent_analytics_user ON "PatentAnalytics"("userId");

-- Expert directory indexes
CREATE INDEX IF NOT EXISTS idx_expert_specializations ON "PatentExpert" USING GIN(specializations);
CREATE INDEX IF NOT EXISTS idx_expert_jurisdictions ON "PatentExpert" USING GIN(jurisdictions);
CREATE INDEX IF NOT EXISTS idx_expert_technology_areas ON "PatentExpert" USING GIN("technologyAreas");

-- =============================================
-- Completion Message
-- =============================================

-- Add completion tracking
INSERT INTO "SystemLog" (event_type, description, created_at)
VALUES ('MIGRATION', 'P10 Patent Mastery course database schema completed successfully', NOW());

-- Success confirmation
SELECT 'P10 Patent Mastery database setup completed successfully!' as status,
       COUNT(*) as total_lessons 
FROM "Lesson" 
WHERE "moduleId" LIKE 'p10_module_%';