-- P10 Patent Mastery - Fixed Deployment Script
-- Handles missing tables and completes all 60 lessons

-- First, create CourseTemplate table if it doesn't exist
CREATE TABLE IF NOT EXISTS "CourseTemplate" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "productCode" TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    category TEXT,
    type TEXT,
    "fileUrl" TEXT,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create InteractiveTool table if it doesn't exist
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

-- Check if P10 product exists first
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM "Product" WHERE code = 'P10') THEN
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
    END IF;
END $$;

-- Clear existing P10 lessons to avoid duplicates
DELETE FROM "Lesson" WHERE "moduleId" LIKE 'p10_module_%';
DELETE FROM "Module" WHERE "productId" = 'p10_patent_mastery';

-- Now insert all modules
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES 
('p10_module_1', 'p10_patent_mastery', 'Patent Fundamentals & IP Landscape', 'Master all forms of IP protection, economic value of patents, and Indian patent system navigation', 1, NOW(), NOW()),
('p10_module_2', 'p10_patent_mastery', 'Pre-Filing Strategy & Preparation', 'Systematic invention documentation, patentability assessment, professional patent drafting, and claims development', 2, NOW(), NOW()),
('p10_module_3', 'p10_patent_mastery', 'Filing Process Mastery', 'Strategic jurisdiction selection, Indian Patent Office navigation, international filing optimization', 3, NOW(), NOW()),
('p10_module_4', 'p10_patent_mastery', 'Prosecution & Examination', 'Office action responses, rejection handling, opposition proceedings, and grant procedures', 4, NOW(), NOW()),
('p10_module_5', 'p10_patent_mastery', 'Patent Portfolio Management', 'Strategic portfolio building, landscaping, optimization, IP governance, and analytics', 5, NOW(), NOW()),
('p10_module_6', 'p10_patent_mastery', 'Commercialization & Monetization', 'Patent valuation, licensing strategies, sales, strategic partnerships, and revenue generation', 6, NOW(), NOW()),
('p10_module_7', 'p10_patent_mastery', 'Industry-Specific Strategies', 'Specialized patent strategies for software/AI, biotech/pharma, hardware, fintech, and traditional industries', 7, NOW(), NOW()),
('p10_module_8', 'p10_patent_mastery', 'International Patent Strategy', 'Global filing strategies, major jurisdiction deep-dive, translation/localization, enforcement', 8, NOW(), NOW()),
('p10_module_9', 'p10_patent_mastery', 'Cost Management & Funding', 'Complete cost breakdown analysis and funding/support strategy development', 9, NOW(), NOW()),
('p10_module_10', 'p10_patent_mastery', 'Advanced Litigation & Disputes', 'Patent litigation process, evidence collection, damages calculation, settlement strategies', 10, NOW(), NOW()),
('p10_module_11', 'p10_patent_mastery', 'Advanced Prosecution', 'Complex response strategies, appeal procedures, international prosecution coordination', 11, NOW(), NOW()),
('p10_module_12', 'p10_patent_mastery', 'Emerging Technologies', 'Patent strategies for quantum computing, gene editing, autonomous vehicles, Web3, and future technologies', 12, NOW(), NOW());

-- Insert all 60 lessons (simplified with essential data)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
-- Module 1: Days 1-5
('p10_lesson_1', 'p10_module_1', 1, 'Understanding the Intellectual Property Ecosystem', 'Master all forms of IP protection, economic value of patents for startups, and navigate the Indian IP landscape confidently.', 180, 120, 1, NOW(), NOW()),
('p10_lesson_2', 'p10_module_1', 2, 'What Can and Cannot Be Patented in India', 'Master Section 3 exclusions and circumvention strategies, understand software patentability in Indian context.', 120, 100, 2, NOW(), NOW()),
('p10_lesson_3', 'p10_module_1', 3, 'Types of Patent Applications', 'Master provisional vs complete specifications, understand convention applications, PCT strategies.', 90, 80, 3, NOW(), NOW()),
('p10_lesson_4', 'p10_module_1', 4, 'Patent Lifecycle & Timelines', 'Understand 20-year patent term, master priority dates, publication rules, examination timelines.', 90, 80, 4, NOW(), NOW()),
('p10_lesson_5', 'p10_module_1', 5, 'Building Patent Intelligence', 'Master patent searching, database utilization, freedom to operate analysis.', 120, 100, 5, NOW(), NOW()),

-- Module 2: Days 6-10
('p10_lesson_6', 'p10_module_2', 6, 'Invention Disclosure & Documentation', 'Master systematic invention documentation, co-inventor determination, evidence chains.', 120, 120, 6, NOW(), NOW()),
('p10_lesson_7', 'p10_module_2', 7, 'Patentability Assessment', 'Master DIY prior art searching, systematic patentability evaluation, professional opinion writing.', 150, 140, 7, NOW(), NOW()),
('p10_lesson_8', 'p10_module_2', 8, 'Patent Drafting Basics', 'Learn professional patent application structure, strategic title crafting, abstract excellence.', 120, 120, 8, NOW(), NOW()),
('p10_lesson_9', 'p10_module_2', 9, 'Claims - The Heart of Patents', 'Master claim drafting, understand different claim types, balance broad vs narrow protection.', 150, 140, 9, NOW(), NOW()),
('p10_lesson_10', 'p10_module_2', 10, 'Drawings and Specifications', 'Master patent drawing requirements, learn technical drawing software.', 120, 120, 10, NOW(), NOW()),

-- Module 3: Days 11-16
('p10_lesson_11', 'p10_module_3', 11, 'Choosing Where to File', 'Master global filing strategy, jurisdiction selection optimization, cost-benefit analysis.', 150, 140, 11, NOW(), NOW()),
('p10_lesson_12', 'p10_module_3', 12, 'Indian Patent Office Navigation', 'Master IPO system architecture, e-filing procedures, fee optimization.', 120, 120, 12, NOW(), NOW()),
('p10_lesson_13', 'p10_module_3', 13, 'Forms and Documentation Deep Dive', 'Excel at all patent application forms, priority document handling.', 120, 120, 13, NOW(), NOW()),
('p10_lesson_14', 'p10_module_3', 14, 'Practical Filing Workshop', 'Hands-on e-filing demonstration, error correction, document formatting.', 180, 150, 14, NOW(), NOW()),
('p10_lesson_15', 'p10_module_3', 15, 'Startup Benefits & Schemes', 'Master Startup India patent scheme, SIPP program, expedited examination.', 90, 100, 15, NOW(), NOW()),
('p10_lesson_16', 'p10_module_3', 16, 'International Filing Strategies', 'Optimize PCT route, direct filing strategies, priority management.', 120, 120, 16, NOW(), NOW()),

-- Module 4: Days 17-22
('p10_lesson_17', 'p10_module_4', 17, 'First Examination Report Response', 'Master FER response strategies, overcome Section 3 rejections.', 150, 140, 17, NOW(), NOW()),
('p10_lesson_18', 'p10_module_4', 18, 'Overcoming Novelty and Obviousness Rejections', 'Master prior art differentiation, unexpected results documentation.', 120, 120, 18, NOW(), NOW()),
('p10_lesson_19', 'p10_module_4', 19, 'Hearing Preparation and Advocacy', 'Excel at oral hearing preparation, examiner interview strategies.', 120, 120, 19, NOW(), NOW()),
('p10_lesson_20', 'p10_module_4', 20, 'Opposition Proceedings', 'Master pre-grant and post-grant opposition strategies.', 150, 140, 20, NOW(), NOW()),
('p10_lesson_21', 'p10_module_4', 21, 'Expedited Examination Strategies', 'Leverage startup benefits, fast-track procedures, PPH programs.', 90, 100, 21, NOW(), NOW()),
('p10_lesson_22', 'p10_module_4', 22, 'Grant Procedures and Post-Grant Management', 'Navigate grant procedures, annuity management, maintenance strategies.', 120, 120, 22, NOW(), NOW()),

-- Module 5: Days 23-27
('p10_lesson_23', 'p10_module_5', 23, 'Strategic Portfolio Building', 'Design patent portfolio architecture, technology roadmap alignment.', 150, 140, 23, NOW(), NOW()),
('p10_lesson_24', 'p10_module_5', 24, 'Patent Landscaping and White Space Analysis', 'Master competitive intelligence gathering, technology gap identification.', 180, 150, 24, NOW(), NOW()),
('p10_lesson_25', 'p10_module_5', 25, 'Portfolio Optimization and Pruning', 'Evaluate patent value, make abandonment decisions.', 120, 120, 25, NOW(), NOW()),
('p10_lesson_26', 'p10_module_5', 26, 'IP Governance and Policies', 'Establish IP committees, decision frameworks, approval processes.', 120, 120, 26, NOW(), NOW()),
('p10_lesson_27', 'p10_module_5', 27, 'Patent Analytics and Reporting', 'Master KPI development, dashboard creation, executive reporting.', 150, 140, 27, NOW(), NOW()),

-- Module 6: Days 28-33
('p10_lesson_28', 'p10_module_6', 28, 'Patent Valuation Methods', 'Master cost, market, and income approaches to patent valuation.', 150, 140, 28, NOW(), NOW()),
('p10_lesson_29', 'p10_module_6', 29, 'Licensing Strategy Development', 'Design licensing programs, structure deals, negotiate terms.', 180, 150, 29, NOW(), NOW()),
('p10_lesson_30', 'p10_module_6', 30, 'Patent Sales and Acquisitions', 'Master patent transaction strategies, due diligence processes.', 120, 120, 30, NOW(), NOW()),
('p10_lesson_31', 'p10_module_6', 31, 'Strategic Partnerships and Joint Ventures', 'Structure IP partnerships, cross-licensing arrangements.', 150, 140, 31, NOW(), NOW()),
('p10_lesson_32', 'p10_module_6', 32, 'Royalty Structures and Revenue Models', 'Design royalty frameworks, milestone payments, hybrid models.', 120, 120, 32, NOW(), NOW()),
('p10_lesson_33', 'p10_module_6', 33, 'Patent Enforcement Economics', 'Evaluate enforcement ROI, litigation funding options.', 120, 120, 33, NOW(), NOW()),

-- Module 7: Days 34-38
('p10_lesson_34', 'p10_module_7', 34, 'Software and AI Patent Strategies', 'Master software patentability, AI/ML claiming strategies.', 150, 140, 34, NOW(), NOW()),
('p10_lesson_35', 'p10_module_7', 35, 'Biotech and Pharmaceutical Patents', 'Navigate biotech patentability, sequence claiming.', 150, 140, 35, NOW(), NOW()),
('p10_lesson_36', 'p10_module_7', 36, 'Hardware and Electronics Patents', 'Master device claiming, system architecture patents.', 120, 120, 36, NOW(), NOW()),
('p10_lesson_37', 'p10_module_7', 37, 'Fintech and Business Method Patents', 'Navigate business method patentability, fintech innovations.', 120, 120, 37, NOW(), NOW()),
('p10_lesson_38', 'p10_module_7', 38, 'Traditional Industry Patents', 'Master mechanical inventions, chemical formulations.', 120, 120, 38, NOW(), NOW()),

-- Module 8: Days 39-43
('p10_lesson_39', 'p10_module_8', 39, 'Global Filing Strategies', 'Master PCT national phase strategy, direct filing optimization.', 150, 140, 39, NOW(), NOW()),
('p10_lesson_40', 'p10_module_8', 40, 'United States Patent Strategy', 'Navigate USPTO procedures, continuation practice.', 120, 120, 40, NOW(), NOW()),
('p10_lesson_41', 'p10_module_8', 41, 'European Patent Strategy', 'Master EPO procedures, validation strategies.', 120, 120, 41, NOW(), NOW()),
('p10_lesson_42', 'p10_module_8', 42, 'China and Asia-Pacific Patents', 'Navigate CNIPA procedures, utility models.', 150, 140, 42, NOW(), NOW()),
('p10_lesson_43', 'p10_module_8', 43, 'Translation and Localization Strategies', 'Master technical translation requirements.', 90, 100, 43, NOW(), NOW()),

-- Module 9: Days 44-45
('p10_lesson_44', 'p10_module_9', 44, 'Complete Patent Cost Analysis', 'Master cost breakdown structures, budget planning.', 120, 120, 44, NOW(), NOW()),
('p10_lesson_45', 'p10_module_9', 45, 'Patent Funding and Support Programs', 'Access government grants, startup schemes.', 120, 120, 45, NOW(), NOW()),

-- Module 10: Days 46-50
('p10_lesson_46', 'p10_module_10', 46, 'Patent Litigation Process', 'Understand litigation lifecycle, court procedures.', 120, 120, 46, NOW(), NOW()),
('p10_lesson_47', 'p10_module_10', 47, 'Infringement Analysis', 'Master claim charts, evidence collection.', 150, 140, 47, NOW(), NOW()),
('p10_lesson_48', 'p10_module_10', 48, 'Defensive Strategies', 'Develop invalidity defenses, prior art challenges.', 120, 120, 48, NOW(), NOW()),
('p10_lesson_49', 'p10_module_10', 49, 'Damages Calculation', 'Master reasonable royalty analysis, lost profits calculation.', 150, 140, 49, NOW(), NOW()),
('p10_lesson_50', 'p10_module_10', 50, 'Settlement and Alternative Dispute Resolution', 'Navigate settlement negotiations, mediation strategies.', 120, 120, 50, NOW(), NOW()),

-- Module 11: Days 51-55
('p10_lesson_51', 'p10_module_11', 51, 'Complex Response Strategies', 'Master multi-reference rejections, combination arguments.', 150, 140, 51, NOW(), NOW()),
('p10_lesson_52', 'p10_module_11', 52, 'Appeal Procedures', 'Navigate appeal briefs, oral hearings, IPAB procedures.', 150, 140, 52, NOW(), NOW()),
('p10_lesson_53', 'p10_module_11', 53, 'International Prosecution Coordination', 'Manage multi-jurisdiction prosecution.', 120, 120, 53, NOW(), NOW()),
('p10_lesson_54', 'p10_module_11', 54, 'Post-Grant Procedures', 'Master reissue applications, reexamination procedures.', 120, 120, 54, NOW(), NOW()),
('p10_lesson_55', 'p10_module_11', 55, 'Continuation and Divisional Strategies', 'Optimize continuation practice, divisional applications.', 120, 120, 55, NOW(), NOW()),

-- Module 12: Days 56-60
('p10_lesson_56', 'p10_module_12', 56, 'Quantum Computing Patents', 'Navigate quantum algorithm patents, hardware protection.', 120, 120, 56, NOW(), NOW()),
('p10_lesson_57', 'p10_module_12', 57, 'Gene Editing and Synthetic Biology', 'Master CRISPR patents, gene therapy protection.', 120, 120, 57, NOW(), NOW()),
('p10_lesson_58', 'p10_module_12', 58, 'Autonomous Systems and Robotics', 'Navigate autonomous vehicle patents, robotics innovations.', 120, 120, 58, NOW(), NOW()),
('p10_lesson_59', 'p10_module_12', 59, 'Web3 and Blockchain Technologies', 'Master DeFi patents, NFT innovations.', 120, 120, 59, NOW(), NOW()),
('p10_lesson_60', 'p10_module_12', 60, 'Future Technologies and Patent Strategy', 'Prepare for emerging technologies, adapt to changing regulations.', 150, 200, 60, NOW(), NOW());

-- Add P10 Course Templates (100+ templates)
INSERT INTO "CourseTemplate" ("productCode", name, description, category, type, "fileUrl", "isActive")
VALUES 
-- Core Templates (1-20)
('P10', 'IP Strategy Canvas', 'Business Model Canvas adaptation for IP strategy', 'strategy', 'template', '/templates/p10/ip-strategy-canvas.xlsx', true),
('P10', 'Innovation Disclosure Template', 'Systematic invention documentation', 'documentation', 'template', '/templates/p10/innovation-disclosure.docx', true),
('P10', 'Patent Application Template', 'Professional patent application format', 'drafting', 'template', '/templates/p10/patent-application.docx', true),
('P10', 'Claims Drafting Guide', 'Step-by-step claims writing', 'drafting', 'guide', '/templates/p10/claims-drafting-guide.pdf', true),
('P10', 'Prior Art Search Report', 'Comprehensive search documentation', 'research', 'template', '/templates/p10/prior-art-report.docx', true),
('P10', 'Patentability Assessment', '55-point evaluation framework', 'assessment', 'template', '/templates/p10/patentability-assessment.xlsx', true),
('P10', 'FER Response Template', 'First Examination Report response', 'prosecution', 'template', '/templates/p10/fer-response.docx', true),
('P10', 'Patent Cost Calculator', 'Multi-jurisdiction cost estimation', 'financial', 'calculator', '/templates/p10/patent-cost-calc.xlsx', true),
('P10', 'IP ROI Calculator', 'Return on IP investment analysis', 'financial', 'calculator', '/templates/p10/ip-roi-calc.xlsx', true),
('P10', 'Licensing Agreement Template', 'Professional licensing contract', 'legal', 'template', '/templates/p10/licensing-agreement.docx', true),
('P10', 'Patent Portfolio Dashboard', 'Portfolio management and analytics', 'management', 'template', '/templates/p10/portfolio-dashboard.xlsx', true),
('P10', 'Jurisdiction Selection Matrix', 'Global filing decision framework', 'strategy', 'template', '/templates/p10/jurisdiction-matrix.xlsx', true),
('P10', 'Patent Landscape Report', 'Competitive analysis template', 'analysis', 'template', '/templates/p10/landscape-report.pptx', true),
('P10', 'Patent Valuation Model', 'Multi-method valuation framework', 'financial', 'calculator', '/templates/p10/valuation-model.xlsx', true),
('P10', 'Opposition Defense Playbook', 'Strategies for patent opposition', 'litigation', 'guide', '/templates/p10/opposition-defense.pdf', true),
('P10', 'PCT Filing Guide', 'International filing strategies', 'international', 'guide', '/templates/p10/pct-filing-guide.pdf', true),
('P10', 'Patent Drawings Template', 'Technical drawing standards', 'drafting', 'template', '/templates/p10/patent-drawings.pdf', true),
('P10', 'Employment IP Agreement', 'Employee invention assignment', 'legal', 'template', '/templates/p10/employment-ip.docx', true),
('P10', 'Patent Filing Checklist', 'Pre-filing verification list', 'process', 'checklist', '/templates/p10/filing-checklist.pdf', true),
('P10', 'Appeal Brief Template', 'Patent appeal documentation', 'prosecution', 'template', '/templates/p10/appeal-brief.docx', true),

-- Advanced Templates (21-40)
('P10', 'AI Patent Claim Templates', 'Machine learning patent claims', 'industry', 'template', '/templates/p10/ai-claims.docx', true),
('P10', 'Software Patent Guide', 'Software patentability in India', 'industry', 'guide', '/templates/p10/software-patent-guide.pdf', true),
('P10', 'Biotech Patent Playbook', 'Biotechnology patent strategies', 'industry', 'guide', '/templates/p10/biotech-playbook.pdf', true),
('P10', 'Fintech Patent Framework', 'Financial technology patents', 'industry', 'template', '/templates/p10/fintech-framework.docx', true),
('P10', 'Hardware Patent Template', 'Electronics and device patents', 'industry', 'template', '/templates/p10/hardware-patent.docx', true),
('P10', 'Patent Mining Workshop', 'Innovation capture process', 'innovation', 'template', '/templates/p10/patent-mining.pptx', true),
('P10', 'Freedom to Operate Analysis', 'FTO assessment framework', 'analysis', 'template', '/templates/p10/fto-analysis.xlsx', true),
('P10', 'Patent Citation Network Tool', 'Citation analysis visualization', 'analysis', 'tool', '/templates/p10/citation-network.xlsx', true),
('P10', 'Infringement Claim Chart', 'Element-by-element comparison', 'litigation', 'template', '/templates/p10/infringement-chart.docx', true),
('P10', 'Damages Calculator', 'Patent damages estimation', 'litigation', 'calculator', '/templates/p10/damages-calc.xlsx', true),
('P10', 'Settlement Agreement Template', 'Patent dispute settlement', 'legal', 'template', '/templates/p10/settlement-agreement.docx', true),
('P10', 'Technology Transfer Agreement', 'IP transfer documentation', 'legal', 'template', '/templates/p10/tech-transfer.docx', true),
('P10', 'Patent Audit Checklist', 'Portfolio audit framework', 'management', 'checklist', '/templates/p10/patent-audit.pdf', true),
('P10', 'Maintenance Fee Tracker', 'Annuity payment management', 'management', 'template', '/templates/p10/maintenance-tracker.xlsx', true),
('P10', 'USPTO Filing Guide', 'US patent procedures', 'international', 'guide', '/templates/p10/uspto-guide.pdf', true),
('P10', 'EPO Filing Guide', 'European patent procedures', 'international', 'guide', '/templates/p10/epo-guide.pdf', true),
('P10', 'China Patent Strategy', 'CNIPA filing strategies', 'international', 'guide', '/templates/p10/china-strategy.pdf', true),
('P10', 'Translation Management System', 'Patent translation tracking', 'international', 'template', '/templates/p10/translation-mgmt.xlsx', true),
('P10', 'Patent Family Tree Visualizer', 'Patent family relationships', 'analysis', 'tool', '/templates/p10/family-tree.xlsx', true),
('P10', 'Competitive Intelligence Dashboard', 'Competitor patent tracking', 'analysis', 'template', '/templates/p10/competitive-intel.xlsx', true),

-- Specialized Tools (41-60)
('P10', 'Startup Patent Scheme Application', 'SIPP program application', 'government', 'template', '/templates/p10/sipp-application.docx', true),
('P10', 'Patent Grant Calculator', 'Success probability estimator', 'assessment', 'calculator', '/templates/p10/grant-probability.xlsx', true),
('P10', 'Office Action Response Library', '50+ response templates', 'prosecution', 'template', '/templates/p10/response-library.docx', true),
('P10', 'Patent Prosecution Timeline', 'Multi-jurisdiction tracker', 'management', 'template', '/templates/p10/prosecution-timeline.xlsx', true),
('P10', 'IP Budget Planner', '3-year IP budget framework', 'financial', 'template', '/templates/p10/ip-budget-planner.xlsx', true),
('P10', 'Patent Quality Scorer', 'Patent strength assessment', 'assessment', 'tool', '/templates/p10/quality-scorer.xlsx', true),
('P10', 'Licensing Revenue Model', 'Revenue projection framework', 'monetization', 'calculator', '/templates/p10/licensing-revenue.xlsx', true),
('P10', 'Patent Pool Agreement', 'Pool participation template', 'legal', 'template', '/templates/p10/patent-pool.docx', true),
('P10', 'Open Source Patent Policy', 'OS contribution framework', 'policy', 'template', '/templates/p10/opensource-policy.docx', true),
('P10', 'Defensive Publication Guide', 'Strategic disclosure tactics', 'strategy', 'guide', '/templates/p10/defensive-publication.pdf', true),
('P10', 'Patent Insurance Guide', 'IP insurance strategies', 'risk', 'guide', '/templates/p10/patent-insurance.pdf', true),
('P10', 'M&A Due Diligence Checklist', 'IP due diligence framework', 'transaction', 'checklist', '/templates/p10/ma-due-diligence.pdf', true),
('P10', 'Patent Escrow Agreement', 'Escrow arrangement template', 'legal', 'template', '/templates/p10/patent-escrow.docx', true),
('P10', 'IP Holding Structure Guide', 'Optimal IP entity structures', 'corporate', 'guide', '/templates/p10/ip-holding-guide.pdf', true),
('P10', 'Patent Securitization Model', 'IP-backed financing', 'financial', 'template', '/templates/p10/patent-securitization.xlsx', true),
('P10', 'Litigation Finance Calculator', 'Litigation funding analysis', 'litigation', 'calculator', '/templates/p10/litigation-finance.xlsx', true),
('P10', 'Patent War Game Simulator', 'Strategic scenario planning', 'strategy', 'tool', '/templates/p10/war-game-simulator.xlsx', true),
('P10', 'SEP Licensing Guide', 'Standard essential patents', 'licensing', 'guide', '/templates/p10/sep-licensing.pdf', true),
('P10', 'FRAND Calculator', 'Fair and reasonable terms', 'licensing', 'calculator', '/templates/p10/frand-calculator.xlsx', true),
('P10', 'Patent Thicket Navigator', 'Complex landscape navigation', 'strategy', 'guide', '/templates/p10/thicket-navigator.pdf', true),

-- Industry-Specific (61-80)
('P10', 'Medical Device Patent Guide', 'Medical device strategies', 'healthcare', 'guide', '/templates/p10/medical-device.pdf', true),
('P10', 'Pharma Patent Lifecycle', 'Drug patent management', 'healthcare', 'template', '/templates/p10/pharma-lifecycle.xlsx', true),
('P10', 'Clean Tech Patent Playbook', 'Sustainable technology IP', 'cleantech', 'guide', '/templates/p10/cleantech-playbook.pdf', true),
('P10', 'AgTech Patent Framework', 'Agricultural innovation IP', 'agtech', 'template', '/templates/p10/agtech-framework.docx', true),
('P10', 'Gaming Patent Strategy', 'Gaming technology patents', 'gaming', 'guide', '/templates/p10/gaming-patents.pdf', true),
('P10', 'EdTech Patent Guide', 'Education technology IP', 'edtech', 'guide', '/templates/p10/edtech-patents.pdf', true),
('P10', 'Fashion Tech Patents', 'Fashion innovation IP', 'fashion', 'guide', '/templates/p10/fashion-tech.pdf', true),
('P10', 'Space Tech Patent Guide', 'Space technology IP', 'aerospace', 'guide', '/templates/p10/space-tech.pdf', true),
('P10', 'Cybersecurity Patents', 'Security innovation IP', 'security', 'guide', '/templates/p10/cybersecurity.pdf', true),
('P10', 'IoT Patent Architecture', 'Internet of Things IP', 'iot', 'template', '/templates/p10/iot-architecture.xlsx', true),
('P10', '5G Patent Landscape', 'Telecom patent strategies', 'telecom', 'guide', '/templates/p10/5g-landscape.pdf', true),
('P10', 'Blockchain Patent Guide', 'DLT and crypto patents', 'blockchain', 'guide', '/templates/p10/blockchain-patents.pdf', true),
('P10', 'Quantum Computing Patents', 'Quantum technology IP', 'quantum', 'guide', '/templates/p10/quantum-patents.pdf', true),
('P10', 'Gene Editing Patent Guide', 'CRISPR and biotech IP', 'biotech', 'guide', '/templates/p10/gene-editing.pdf', true),
('P10', 'Autonomous Vehicle Patents', 'Self-driving technology IP', 'automotive', 'guide', '/templates/p10/autonomous-vehicles.pdf', true),
('P10', 'Robotics Patent Framework', 'Robotics innovation IP', 'robotics', 'template', '/templates/p10/robotics-framework.docx', true),
('P10', 'AR/VR Patent Guide', 'Extended reality IP', 'xr', 'guide', '/templates/p10/ar-vr-patents.pdf', true),
('P10', 'Drone Patent Landscape', 'UAV technology patents', 'aerospace', 'guide', '/templates/p10/drone-patents.pdf', true),
('P10', 'Energy Storage Patents', 'Battery and storage IP', 'energy', 'guide', '/templates/p10/energy-storage.pdf', true),
('P10', 'Nanotech Patent Guide', 'Nanotechnology IP strategies', 'nanotech', 'guide', '/templates/p10/nanotech-patents.pdf', true),

-- Advanced Prosecution (81-100)
('P10', 'Terminal Disclaimer Template', 'Double patenting response', 'prosecution', 'template', '/templates/p10/terminal-disclaimer.docx', true),
('P10', 'IDS Template', 'Information disclosure statement', 'prosecution', 'template', '/templates/p10/ids-template.docx', true),
('P10', 'Patent Term Calculator', 'Term adjustment calculation', 'prosecution', 'calculator', '/templates/p10/term-calculator.xlsx', true),
('P10', 'Inventorship Correction', 'Correcting inventor errors', 'prosecution', 'template', '/templates/p10/inventorship-correction.docx', true),
('P10', 'Certificate of Correction', 'Error correction template', 'prosecution', 'template', '/templates/p10/certificate-correction.docx', true),
('P10', 'Supplemental Examination Guide', 'Post-grant procedure guide', 'prosecution', 'guide', '/templates/p10/supplemental-exam.pdf', true),
('P10', 'Reissue Application Template', 'Patent reissue procedures', 'prosecution', 'template', '/templates/p10/reissue-application.docx', true),
('P10', 'Reexamination Guide', 'Ex parte and inter partes', 'prosecution', 'guide', '/templates/p10/reexamination-guide.pdf', true),
('P10', 'IPR Defense Strategy', 'Inter partes review defense', 'litigation', 'guide', '/templates/p10/ipr-defense.pdf', true),
('P10', 'PTAB Appeal Guide', 'Patent trial and appeal board', 'prosecution', 'guide', '/templates/p10/ptab-appeal.pdf', true),
('P10', 'Continuation Strategy Planner', 'Continuation practice optimization', 'prosecution', 'template', '/templates/p10/continuation-planner.xlsx', true),
('P10', 'Divisional Application Guide', 'Strategic divisional filing', 'prosecution', 'guide', '/templates/p10/divisional-guide.pdf', true),
('P10', 'CIP Strategy Framework', 'Continuation-in-part strategies', 'prosecution', 'template', '/templates/p10/cip-framework.docx', true),
('P10', 'Design Patent Application', 'Design patent templates', 'design', 'template', '/templates/p10/design-patent.docx', true),
('P10', 'Plant Patent Guide', 'Agricultural patent strategies', 'agriculture', 'guide', '/templates/p10/plant-patent.pdf', true),
('P10', 'Utility Model Strategy', 'Minor patent approaches', 'international', 'guide', '/templates/p10/utility-model.pdf', true),
('P10', 'Madrid Protocol Guide', 'International trademark link', 'trademark', 'guide', '/templates/p10/madrid-protocol.pdf', true),
('P10', 'Patent Cooperation Treaty Form', 'PCT application template', 'international', 'template', '/templates/p10/pct-form.docx', true),
('P10', 'National Phase Entry Guide', 'PCT national phase strategies', 'international', 'guide', '/templates/p10/national-phase.pdf', true),
('P10', 'PPH Application Template', 'Patent prosecution highway', 'international', 'template', '/templates/p10/pph-application.docx', true),

-- Bonus Advanced Tools (101-110)
('P10', 'AI Claim Generator', 'Automated claim drafting', 'ai-tools', 'tool', '/tools/p10/ai-claim-generator', true),
('P10', 'Prior Art Search Engine', 'Advanced patent search', 'search', 'tool', '/tools/p10/prior-art-search', true),
('P10', 'Patentability Checker', 'AI-powered assessment', 'assessment', 'tool', '/tools/p10/patentability-checker', true),
('P10', 'Portfolio Optimizer', 'Strategic portfolio planning', 'optimization', 'tool', '/tools/p10/portfolio-optimizer', true),
('P10', 'Landscape Analyzer', 'Competitive intelligence', 'analysis', 'tool', '/tools/p10/landscape-analyzer', true),
('P10', 'FTO Analyzer', 'Freedom to operate assessment', 'analysis', 'tool', '/tools/p10/fto-analyzer', true),
('P10', 'Citation Network Tool', 'Patent citation analysis', 'analysis', 'tool', '/tools/p10/citation-network', true),
('P10', 'Quality Scorer', 'Patent quality metrics', 'assessment', 'tool', '/tools/p10/quality-scorer', true),
('P10', 'Licensing Optimizer', 'Revenue optimization', 'monetization', 'tool', '/tools/p10/licensing-optimizer', true),
('P10', 'Portfolio Health Dashboard', 'Real-time portfolio metrics', 'management', 'tool', '/tools/p10/portfolio-dashboard', true);

-- Add P10 Interactive Tools
INSERT INTO "InteractiveTool" (id, "productCode", name, description, category, "toolUrl", "isActive")
VALUES 
('p10_strategy_assessment', 'P10', 'IP Strategy Assessment', 'Comprehensive IP strategy development tool', 'strategy', '/tools/p10/strategy-assessment', true),
('p10_patentability_checker', 'P10', 'Patentability Checker', 'AI-powered patent eligibility assessment', 'assessment', '/tools/p10/patentability-checker', true),
('p10_prior_art_search', 'P10', 'Prior Art Search Engine', 'Global patent database search', 'research', '/tools/p10/prior-art-search', true),
('p10_landscape_analyzer', 'P10', 'Patent Landscape Analyzer', 'Competitive intelligence tool', 'analysis', '/tools/p10/landscape-analyzer', true),
('p10_portfolio_optimizer', 'P10', 'Portfolio Optimizer', 'Strategic portfolio optimization', 'optimization', '/tools/p10/portfolio-optimizer', true),
('p10_licensing_calculator', 'P10', 'Licensing Revenue Calculator', 'Optimal licensing terms calculator', 'financial', '/tools/p10/licensing-calculator', true);

-- Add P10 Portfolio Activity Types
-- First check and add column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'ActivityType' 
                   AND column_name = 'description') THEN
        ALTER TABLE "ActivityType" ADD COLUMN description TEXT;
    END IF;
END $$;

-- Now insert activity types with proper structure
INSERT INTO "ActivityType" (id, name, category, "sectionName", "productCode", "orderIndex", "createdAt", "updatedAt")
VALUES 
('p10_patent_landscape', 'Patent Landscape Analysis', 'research', 'product', 'P10', 1, NOW(), NOW()),
('p10_invention_disclosure', 'Invention Disclosure', 'documentation', 'product', 'P10', 2, NOW(), NOW()),
('p10_patent_draft', 'Patent Application Draft', 'drafting', 'legal_compliance', 'P10', 3, NOW(), NOW()),
('p10_prior_art', 'Prior Art Search', 'research', 'product', 'P10', 4, NOW(), NOW()),
('p10_portfolio_plan', 'Patent Portfolio Plan', 'strategy', 'business_model', 'P10', 5, NOW(), NOW()),
('p10_fto_analysis', 'Freedom to Operate Analysis', 'analysis', 'go_to_market', 'P10', 6, NOW(), NOW()),
('p10_patent_valuation', 'Patent Valuation', 'financial', 'financials', 'P10', 7, NOW(), NOW()),
('p10_licensing_strategy', 'Licensing Strategy', 'monetization', 'business_model', 'P10', 8, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Success confirmation
SELECT 
    'P10 Patent Mastery Deployment Complete!' as status,
    (SELECT COUNT(*) FROM "Lesson" WHERE "moduleId" LIKE 'p10_module_%') as total_lessons,
    (SELECT COUNT(*) FROM "CourseTemplate" WHERE "productCode" = 'P10') as total_templates,
    (SELECT COUNT(*) FROM "ActivityType" WHERE "productCode" = 'P10') as portfolio_activities;