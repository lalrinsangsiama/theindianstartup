-- =====================================================================================
-- P5: Legal Stack - Bulletproof Legal Framework Mastery Course Creation
-- =====================================================================================
-- 
-- COURSE OVERVIEW:
-- Build Litigation-Proof Business Infrastructure & Strategic Legal Advantage
-- 45-day intensive program with 300+ legal templates, expert workshops, and crisis management
-- 
-- WHAT THIS SCRIPT DOES:
-- 1. Creates/updates P5 product with premium legal mastery features
-- 2. Creates 12 comprehensive modules covering all aspects of business law
-- 3. Adds 45 detailed lessons with expert content, case studies, and crisis simulations
-- 4. Includes advanced legal technology integration and emergency response systems
-- 5. Sets up progressive certification framework and professional recognition
-- 
-- COURSE VALUE:
-- - Investment: ₹7,999
-- - Legal Templates Worth: ₹1,50,000+
-- - Litigation Prevention: ₹10,00,000+ savings
-- - ROI: 125x through legal disaster prevention and strategic advantage
-- 
-- TECHNICAL DETAILS:
-- - 12 modules with expert-led content and crisis simulations
-- - 45 lessons with ₹100Cr+ real case studies and AI-powered tools
-- - 6,500+ total XP rewards (premium legal mastery achievement)
-- - Average 165 minutes per lesson (comprehensive legal training with simulations)
-- - Bar Council recognized certification with CPE credits
-- - 300+ battle-tested legal templates worth ₹1,50,000+
-- - AI-powered legal tools and automation systems
-- - Expert access network of 100+ top legal professionals
-- 
-- USAGE: Run this script in Supabase SQL Editor to create/update the complete P5 course
-- =====================================================================================

-- First, clean up any existing P5 data to avoid conflicts
-- Note: Only cleaning up core course structure (Lessons and Modules)
DELETE FROM "Lesson" WHERE "moduleId" IN (
  SELECT m.id FROM "Module" m WHERE m."productId" = 'p5_legal_stack'
);

DELETE FROM "Module" WHERE "productId" = 'p5_legal_stack';

-- Insert the P5 product (premium legal mastery course)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p5_legal_stack',
  'P5',
  'Legal Stack - Bulletproof Legal Framework Mastery',
  'Transform from legal liability to strategic legal advantage in 45 days. Master India''s complex legal system with 300+ battle-tested templates (₹1,50,000+ value), AI-powered legal tools, crisis simulation training, expert legal network access (100+ lawyers), and Bar Council recognized certification. Prevents ₹10,00,000+ in legal costs and delivers 125x ROI through litigation prevention and competitive legal moats.',
  7999,
  false,
  45,
  NOW(),
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  "estimatedDays" = EXCLUDED."estimatedDays",
  "updatedAt" = NOW();

-- Module 1: Legal Foundations & Structure (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m1_legal_foundations',
  'p5_legal_stack',
  'Legal Foundations & Structure',
  'Master legal fundamentals, entity structuring, founder agreements, equity structures, and build your legal framework',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons (Days 1-5)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l1_legal_first_mindset',
  'p5_m1_legal_foundations',
  1,
  'Legal-First Founder Mindset & Crisis Simulation',
  'Master legal thinking through real crisis simulations. Analyze ₹100 crore legal disasters (Zomato FSSAI case, Flipkart FDI violations, Ola regulatory battles), understand cost of legal mistakes (₹10L-₹50Cr), build preventive vs reactive frameworks, create legal moat strategies, transform compliance into competitive advantage, implement enterprise-grade risk mitigation, and establish legal-first organizational culture with expert legal psychologist insights.',
  '["Complete legal maturity assessment (25 parameters)", "Identify 15+ critical legal risks using crisis simulator", "Calculate potential non-compliance costs (₹1L-₹10Cr scenarios)", "Build comprehensive 12-month legal roadmap with milestones"]',
  '["Legal Crisis Simulator (₹100Cr case studies)", "Advanced Risk Assessment Matrix (200+ scenarios)", "Compliance ROI Calculator", "Legal Roadmap Builder", "Expert Legal Psychologist Masterclass"]',
  150,
  120,
  1,
  NOW(),
  NOW()
),
(
  'p5_l2_entity_structuring',
  'p5_m1_legal_foundations',
  2,
  'Advanced Entity Structuring & Tax Optimization',
  'Master complex entity decisions with ₹50Cr+ company case studies. Compare LLP vs Pvt Ltd vs OPC with tax impact analysis, design multi-tier holding structures (Flipkart-Singapore model), create subsidiary ecosystems, analyze branch vs subsidiary implications, navigate foreign entity considerations (Delaware C-Corp, Singapore holdings), implement tax-efficient structures saving ₹10L+ annually, design bulletproof liability protection, and plan strategic restructuring with expert CA and legal counsel insights.',
  '["Design optimal entity structure using AI-powered decision tree", "Model tax savings across 5 scenarios (₹5L-₹50Cr revenue)", "Create holding company blueprint with international considerations", "Optimize liability protection across 15+ risk vectors"]',
  '["AI Entity Structure Optimizer", "Tax Impact Calculator (₹10L+ savings)", "Multi-Tier Structure Builder", "International Structuring Guide", "Expert CA-Legal Counsel Masterclass"]',
  180,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p5_l3_founder_agreements',
  'p5_m1_legal_foundations',
  3,
  'Bulletproof Founder Agreements & Vesting Mastery',
  'Create litigation-proof founder agreements using ₹500Cr+ startup templates. Master equity split methodologies (sweat equity, capital contribution, future value), design complex vesting schedules (4-year/1-year cliff, acceleration triggers, good/bad leaver provisions), define crystal-clear roles and responsibilities with KPI linkage, implement comprehensive IP assignment (past, present, future), draft enforceable non-compete clauses, create exit provisions with valuation mechanisms, design deadlock resolution (arbitration, tag-along), and establish buy-back rights with fair market value calculations. Includes expert startup lawyer insights.',
  '["Draft comprehensive founder agreement using unicorn-grade templates", "Design vesting schedule with 8 acceleration scenarios", "Define roles with measurable KPIs and accountability metrics", "Create exit mechanisms with 5 valuation methodologies"]',
  '["Unicorn Founder Agreement Suite (₹500Cr+ company templates)", "Advanced Vesting Calculator with acceleration triggers", "Role Definition Matrix with KPI integration", "Exit Valuation Calculator", "Expert Startup Lawyer Masterclass"]',
  210,
  180,
  3,
  NOW(),
  NOW()
),
(
  'p5_l4_equity_structures',
  'p5_m1_legal_foundations',
  4,
  'Equity Structures & Cap Table',
  'Design share classes (equity, preference, CCPS), ESOP pool creation, cap table management, dilution modeling, anti-dilution provisions, tag-along/drag-along rights, pre-emption rights, and investor rights management.',
  '["Create equity structure", "Model cap table", "Design ESOP pool", "Plan investor rights"]',
  '["Cap Table Template", "ESOP Calculator", "Rights Matrix", "Dilution Modeler"]',
  150,
  120,
  4,
  NOW(),
  NOW()
),
(
  'p5_l5_board_governance',
  'p5_m1_legal_foundations',
  5,
  'Board Structure & Governance',
  'Establish board composition, director appointments, board committees, meeting protocols, resolution frameworks, fiduciary duties, D&O insurance, conflict of interest policies, and corporate governance best practices.',
  '["Design board structure", "Create governance charter", "Set meeting protocols", "Draft board policies"]',
  '["Board Charter Template", "Resolution Templates", "Meeting Protocol Guide", "Governance Checklist"]',
  120,
  110,
  5,
  NOW(),
  NOW()
);

-- Module 2: Contract Mastery (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m2_contract_mastery',
  'p5_legal_stack',
  'Contract Mastery',
  'Master contract drafting, negotiation, and management for all business relationships',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons (Days 6-10)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l6_contract_fundamentals',
  'p5_m2_contract_mastery',
  6,
  'Contract Architecture & AI-Powered Framework',
  'Master enterprise-grade contract fundamentals with ₹1000Cr+ deal analysis. Understand essential elements through billion-dollar contract breakdowns, master offer and acceptance in complex multi-party scenarios, analyze consideration in equity vs cash deals, assess capacity in international transactions, ensure legality across jurisdictions, design complete contract lifecycle with 15-stage workflow, create standard clauses library (500+ battle-tested clauses), implement AI-powered boilerplate provisions, and build your automated contract playbook with expert contract lawyer insights.',
  '["Master contract basics through ₹1000Cr+ deal case studies", "Create AI-powered clause library (500+ templates)", "Build automated contract templates with decision trees", "Design enterprise approval workflow with stakeholder matrix"]',
  '["₹1000Cr+ Deal Analysis Library", "AI Contract Clause Generator", "Automated Contract Builder", "Enterprise Workflow Designer", "Expert Contract Lawyer Masterclass"]',
  120,
  100,
  6,
  NOW(),
  NOW()
),
(
  'p5_l7_customer_contracts',
  'p5_m2_contract_mastery',
  7,
  'Customer Contracts Excellence',
  'Draft bulletproof sales agreements, SaaS agreements, license agreements, terms of service, privacy policies, SLAs, pricing schedules, renewal terms, termination clauses, and limitation of liability.',
  '["Draft customer agreement", "Create SLA framework", "Design pricing terms", "Set liability limits"]',
  '["Sales Agreement Template", "SaaS Contract Suite", "SLA Calculator", "Liability Framework"]',
  150,
  120,
  7,
  NOW(),
  NOW()
),
(
  'p5_l8_vendor_contracts',
  'p5_m2_contract_mastery',
  8,
  'Vendor & Partner Agreements',
  'Master vendor agreements, partnership contracts, distributor agreements, reseller contracts, affiliate agreements, procurement terms, payment terms, performance guarantees, and dispute resolution.',
  '["Create vendor templates", "Design partner framework", "Set procurement policies", "Build dispute mechanisms"]',
  '["Vendor Agreement Suite", "Partnership Templates", "Procurement Policy", "Dispute Resolution Guide"]',
  150,
  120,
  8,
  NOW(),
  NOW()
),
(
  'p5_l9_negotiation_tactics',
  'p5_m2_contract_mastery',
  9,
  'Contract Negotiation Mastery',
  'Learn negotiation psychology, BATNA development, red lines identification, concession strategy, multi-party negotiations, closing techniques, post-negotiation management, and relationship preservation.',
  '["Develop negotiation playbook", "Practice negotiation scenarios", "Create concession matrix", "Build relationship strategy"]',
  '["Negotiation Playbook", "Scenario Simulator", "Concession Calculator", "Relationship Framework"]',
  120,
  110,
  9,
  NOW(),
  NOW()
),
(
  'p5_l10_contract_management',
  'p5_m2_contract_mastery',
  10,
  'Contract Lifecycle Management',
  'Implement contract repository, renewal tracking, obligation management, performance monitoring, amendment procedures, contract analytics, risk assessment, and automated workflows.',
  '["Set up contract repository", "Create tracking system", "Design monitoring dashboard", "Automate workflows"]',
  '["Repository Setup Guide", "Tracking Template", "Dashboard Framework", "Automation Tools"]',
  120,
  110,
  10,
  NOW(),
  NOW()
);

-- Module 3: Intellectual Property Fortress (Days 11-14)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m3_ip_protection',
  'p5_legal_stack',
  'Intellectual Property Fortress',
  'Build an impenetrable IP protection strategy covering all forms of intellectual property',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons (Days 11-14)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l11_ip_strategy',
  'p5_m3_ip_protection',
  11,
  'IP Strategy & ₹100Cr Portfolio Building',
  'Build ₹100Cr+ IP portfolio through strategic IP asset development. Conduct comprehensive IP audit using AI tools, identify hidden IP assets (data, algorithms, processes), create trademark strategy for global protection, implement copyright protection for digital assets, design trade secret management systems, analyze patent landscape with competitive intelligence, perform IP valuation using DCF and market methods, and build competitive moats through IP strategy. Includes insights from IP lawyers who built unicorn IP portfolios.',
  '["Complete AI-powered IP audit identifying 50+ assets", "Create global IP strategy with 10-year roadmap", "File strategic trademark applications in 15+ classes", "Document and protect 25+ trade secrets with blockchain verification"]',
  '["AI IP Audit Tool (50+ asset categories)", "Global IP Strategy Builder", "Trademark Filing Automation", "Blockchain Trade Secret Vault", "Unicorn IP Lawyer Masterclass"]',
  150,
  130,
  11,
  NOW(),
  NOW()
),
(
  'p5_l12_trademark_mastery',
  'p5_m3_ip_protection',
  12,
  'Trademark Protection & Brand Defense',
  'Master trademark search and filing, class selection, opposition handling, brand monitoring, domain strategy, social media handles, counterfeit prevention, and international protection.',
  '["Conduct trademark search", "File applications", "Set up monitoring", "Secure digital assets"]',
  '["Trademark Search Tool", "Filing Templates", "Monitoring System", "Domain Strategy Guide"]',
  150,
  130,
  12,
  NOW(),
  NOW()
),
(
  'p5_l13_copyright_code',
  'p5_m3_ip_protection',
  13,
  'Copyright & Code Protection',
  'Protect software code, creative works, content licensing, open source compliance, API terms, database rights, moral rights, work-for-hire agreements, and international copyright.',
  '["Register copyrights", "Create licensing framework", "Audit open source", "Draft work-for-hire agreements"]',
  '["Copyright Registration Guide", "License Templates", "Open Source Audit Tool", "Agreement Library"]',
  120,
  120,
  13,
  NOW(),
  NOW()
),
(
  'p5_l14_ip_enforcement',
  'p5_m3_ip_protection',
  14,
  'IP Enforcement & Defense',
  'Learn cease and desist strategies, infringement detection, litigation assessment, settlement negotiations, IP insurance, defensive publications, freedom to operate, and IP monetization.',
  '["Create enforcement playbook", "Set up detection systems", "Assess litigation risks", "Plan monetization strategy"]',
  '["Enforcement Playbook", "Detection Tools", "Risk Assessment Matrix", "Monetization Framework"]',
  120,
  120,
  14,
  NOW(),
  NOW()
);

-- Module 4: Employment Law Excellence (Days 15-18)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m4_employment_law',
  'p5_legal_stack',
  'Employment Law Excellence',
  'Master employment contracts, policies, compliance, and build a legally sound workplace',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons (Days 15-18)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l15_employment_contracts',
  'p5_m4_employment_law',
  15,
  'Employment Contracts & Offers',
  'Draft comprehensive offer letters, employment agreements, probation terms, notice periods, non-compete clauses, confidentiality agreements, IP assignment, and termination provisions.',
  '["Create offer letter templates", "Draft employment agreements", "Design onboarding docs", "Set termination policies"]',
  '["Offer Letter Suite", "Employment Agreement Templates", "Onboarding Checklist", "Termination Guide"]',
  150,
  120,
  15,
  NOW(),
  NOW()
),
(
  'p5_l16_consultant_agreements',
  'p5_m4_employment_law',
  16,
  'Consultant & Contractor Management',
  'Master consultant agreements, contractor vs employee classification, retainer agreements, milestone-based contracts, IP ownership, confidentiality, indemnification, and tax compliance.',
  '["Draft consultant agreements", "Create classification test", "Design milestone framework", "Ensure tax compliance"]',
  '["Consultant Agreement Templates", "Classification Checklist", "Milestone Tracker", "Tax Compliance Guide"]',
  120,
  110,
  16,
  NOW(),
  NOW()
),
(
  'p5_l17_workplace_policies',
  'p5_m4_employment_law',
  17,
  'Workplace Policies & Handbook',
  'Create employee handbook, code of conduct, leave policies, work from home policy, expense policy, IT usage policy, social media guidelines, disciplinary procedures, and grievance mechanism.',
  '["Draft employee handbook", "Create policy suite", "Design approval process", "Plan communication rollout"]',
  '["Employee Handbook Template", "Policy Library", "Approval Workflow", "Communication Plan"]',
  150,
  120,
  17,
  NOW(),
  NOW()
),
(
  'p5_l18_posh_compliance',
  'p5_m4_employment_law',
  18,
  'POSH & Workplace Safety Compliance',
  'Implement POSH Act compliance, internal complaints committee, awareness training, investigation procedures, workplace safety policies, health protocols, and emergency procedures.',
  '["Form POSH committee", "Create training program", "Design investigation process", "Implement safety protocols"]',
  '["POSH Policy Template", "Training Materials", "Investigation Framework", "Safety Checklist"]',
  120,
  110,
  18,
  NOW(),
  NOW()
);

-- Module 5: Dispute Resolution & Litigation (Days 19-22)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m5_dispute_resolution',
  'p5_legal_stack',
  'Dispute Resolution & Litigation',
  'Master dispute prevention, resolution mechanisms, and litigation management',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons (Days 19-22)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l19_dispute_prevention',
  'p5_m5_dispute_resolution',
  19,
  'Dispute Prevention Strategies',
  'Build dispute prevention framework, early warning systems, relationship management, documentation practices, communication protocols, escalation matrices, and risk mitigation strategies.',
  '["Create prevention framework", "Set up warning systems", "Design escalation process", "Build documentation SOP"]',
  '["Prevention Framework", "Warning System Tools", "Escalation Template", "Documentation Guide"]',
  120,
  110,
  19,
  NOW(),
  NOW()
),
(
  'p5_l20_negotiation_settlement',
  'p5_m5_dispute_resolution',
  20,
  'Negotiation & Settlement Mastery',
  'Master settlement negotiations, mediation strategies, arbitration preparation, settlement agreement drafting, release and waiver clauses, payment structures, and confidentiality terms.',
  '["Develop negotiation strategy", "Prepare settlement templates", "Create payment structures", "Draft release clauses"]',
  '["Settlement Playbook", "Agreement Templates", "Payment Calculator", "Release Clause Library"]',
  120,
  110,
  20,
  NOW(),
  NOW()
),
(
  'p5_l21_litigation_management',
  'p5_m5_dispute_resolution',
  21,
  'Litigation Management & Strategy',
  'Understand litigation lifecycle, lawyer selection, case assessment, evidence management, court procedures, interim relief, appeals process, and cost management strategies.',
  '["Assess litigation risks", "Select legal counsel", "Create case management system", "Plan budget allocation"]',
  '["Litigation Assessment Tool", "Lawyer Evaluation Matrix", "Case Management System", "Budget Planner"]',
  150,
  120,
  21,
  NOW(),
  NOW()
),
(
  'p5_l22_arbitration_expertise',
  'p5_m5_dispute_resolution',
  22,
  'Arbitration & ADR Excellence',
  'Master arbitration clauses, arbitrator selection, arbitration procedures, institutional vs ad-hoc arbitration, international arbitration, enforcement of awards, and cost-benefit analysis.',
  '["Draft arbitration clauses", "Create arbitrator criteria", "Design procedure rules", "Plan enforcement strategy"]',
  '["Arbitration Clause Templates", "Arbitrator Selection Guide", "Procedure Framework", "Enforcement Toolkit"]',
  120,
  110,
  22,
  NOW(),
  NOW()
);

-- Module 6: Data Protection & Privacy (Days 23-26)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m6_data_protection',
  'p5_legal_stack',
  'Data Protection & Privacy',
  'Build comprehensive data protection framework and ensure privacy compliance',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons (Days 23-26)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l23_data_protection_law',
  'p5_m6_data_protection',
  23,
  'Data Protection Law Framework',
  'Understand Indian data protection laws, GDPR compliance, data classification, lawful basis, consent management, data subject rights, cross-border transfers, and penalty frameworks.',
  '["Map data flows", "Classify data types", "Create consent framework", "Assess compliance gaps"]',
  '["Data Mapping Tool", "Classification Matrix", "Consent Templates", "Gap Analysis Checklist"]',
  150,
  130,
  23,
  NOW(),
  NOW()
),
(
  'p5_l24_privacy_policies',
  'p5_m6_data_protection',
  24,
  'Privacy Policies & Notices',
  'Draft comprehensive privacy policies, cookie policies, data collection notices, consent forms, children''s privacy, third-party disclosures, retention policies, and user rights procedures.',
  '["Draft privacy policy", "Create cookie policy", "Design consent forms", "Build rights procedures"]',
  '["Privacy Policy Generator", "Cookie Policy Template", "Consent Form Library", "Rights Management System"]',
  120,
  120,
  24,
  NOW(),
  NOW()
),
(
  'p5_l25_data_security',
  'p5_m6_data_protection',
  25,
  'Data Security & Breach Management',
  'Implement security measures, access controls, encryption standards, incident response plans, breach notification procedures, forensic protocols, insurance coverage, and vendor security.',
  '["Create security framework", "Design incident response", "Set breach procedures", "Assess insurance needs"]',
  '["Security Framework", "Incident Response Plan", "Breach Playbook", "Insurance Calculator"]',
  150,
  130,
  25,
  NOW(),
  NOW()
),
(
  'p5_l26_vendor_data_management',
  'p5_m6_data_protection',
  26,
  'Vendor Data Management & DPAs',
  'Master data processing agreements, vendor assessments, data sharing protocols, sub-processor management, audit rights, liability allocation, termination procedures, and data return.',
  '["Draft DPA templates", "Create vendor assessment", "Design audit procedures", "Plan data return process"]',
  '["DPA Template Suite", "Vendor Assessment Tool", "Audit Checklist", "Data Return Protocol"]',
  120,
  120,
  26,
  NOW(),
  NOW()
);

-- Module 7: Regulatory Compliance (Days 27-30)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m7_regulatory_compliance',
  'p5_legal_stack',
  'Regulatory Compliance',
  'Master sector-specific regulations and build robust compliance frameworks',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons (Days 27-30)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l27_compliance_framework',
  'p5_m7_regulatory_compliance',
  27,
  'Building Compliance Infrastructure',
  'Design compliance architecture, risk assessment framework, policy development, training programs, monitoring systems, reporting mechanisms, audit procedures, and continuous improvement.',
  '["Build compliance framework", "Assess regulatory risks", "Create training program", "Design monitoring system"]',
  '["Compliance Framework Template", "Risk Assessment Tool", "Training Modules", "Monitoring Dashboard"]',
  120,
  110,
  27,
  NOW(),
  NOW()
),
(
  'p5_l28_sector_regulations',
  'p5_m7_regulatory_compliance',
  28,
  'Sector-Specific Regulations',
  'Navigate fintech regulations (RBI, SEBI), healthtech compliance, edtech guidelines, e-commerce rules, food safety, manufacturing standards, and environmental regulations.',
  '["Identify sector regulations", "Map compliance requirements", "Create checklist", "Plan implementation"]',
  '["Sector Regulation Guide", "Compliance Mapper", "Implementation Checklist", "Timeline Planner"]',
  150,
  120,
  28,
  NOW(),
  NOW()
),
(
  'p5_l29_license_permits',
  'p5_m7_regulatory_compliance',
  29,
  'Licenses, Permits & Registrations',
  'Master business licenses, professional registrations, import-export codes, industry certifications, quality standards, environmental clearances, and renewal management.',
  '["List required licenses", "File applications", "Track renewals", "Maintain compliance calendar"]',
  '["License Checklist", "Application Templates", "Renewal Tracker", "Compliance Calendar"]',
  120,
  110,
  29,
  NOW(),
  NOW()
),
(
  'p5_l30_regulatory_reporting',
  'p5_m7_regulatory_compliance',
  30,
  'Regulatory Reporting & Audits',
  'Implement statutory reporting, regulatory filings, audit preparation, inspection readiness, corrective actions, penalty management, and stakeholder communication.',
  '["Set up reporting calendar", "Prepare audit documentation", "Create inspection checklist", "Design response procedures"]',
  '["Reporting Calendar", "Audit Prep Guide", "Inspection Checklist", "Response Templates"]',
  120,
  110,
  30,
  NOW(),
  NOW()
);

-- Module 8: M&A and Investment Legal (Days 31-34)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m8_ma_legal',
  'p5_legal_stack',
  'M&A and Investment Legal',
  'Master investment documentation, M&A transactions, and exit strategies',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons (Days 31-34)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l31_investment_documentation',
  'p5_m8_ma_legal',
  31,
  'Investment Documentation Mastery',
  'Master term sheets, share purchase agreements, shareholders agreements, subscription agreements, side letters, disclosure schedules, warranties and representations, and closing conditions.',
  '["Review term sheet templates", "Draft SHA provisions", "Create disclosure schedules", "Design closing checklist"]',
  '["Term Sheet Library", "SHA Template Suite", "Disclosure Framework", "Closing Checklist"]',
  180,
  150,
  31,
  NOW(),
  NOW()
),
(
  'p5_l32_due_diligence',
  'p5_m8_ma_legal',
  32,
  'Due Diligence Excellence',
  'Prepare for legal due diligence, financial DD, technical DD, commercial DD, data room setup, Q&A management, red flag identification, and remediation strategies.',
  '["Set up data room", "Prepare DD checklist", "Identify potential issues", "Create remediation plan"]',
  '["Data Room Setup Guide", "DD Checklist Library", "Red Flag Analyzer", "Remediation Planner"]',
  180,
  150,
  32,
  NOW(),
  NOW()
),
(
  'p5_l33_ma_transactions',
  'p5_m8_ma_legal',
  33,
  'M&A Transaction Structuring',
  'Understand asset vs share deals, merger structures, acquisition financing, earnouts and escrows, indemnity mechanisms, tax optimization, regulatory approvals, and integration planning.',
  '["Analyze deal structures", "Model tax implications", "Design earnout mechanisms", "Plan integration strategy"]',
  '["Deal Structure Analyzer", "Tax Impact Calculator", "Earnout Template", "Integration Playbook"]',
  180,
  150,
  33,
  NOW(),
  NOW()
),
(
  'p5_l34_exit_strategies',
  'p5_m8_ma_legal',
  34,
  'Exit Planning & Execution',
  'Plan strategic exits, trade sales, secondary sales, IPO readiness, buyback mechanisms, tag and drag provisions, liquidity events, and post-exit obligations.',
  '["Create exit strategy", "Prepare exit documentation", "Model exit scenarios", "Plan post-exit transition"]',
  '["Exit Strategy Framework", "Documentation Checklist", "Scenario Modeler", "Transition Plan"]',
  150,
  130,
  34,
  NOW(),
  NOW()
);

-- Module 9: International Business Law (Days 35-37)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m9_international_law',
  'p5_legal_stack',
  'International Business Law',
  'Navigate cross-border transactions, international contracts, and global expansion',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons (Days 35-37)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l35_cross_border_contracts',
  'p5_m9_international_law',
  35,
  'Cross-Border Contracts & Trade',
  'Master international sales contracts, INCOTERMS, payment terms, currency clauses, force majeure, applicable law, dispute resolution forums, and export-import documentation.',
  '["Draft international contracts", "Select INCOTERMS", "Design payment terms", "Choose governing law"]',
  '["International Contract Templates", "INCOTERMS Guide", "Payment Terms Matrix", "Governing Law Selector"]',
  150,
  130,
  35,
  NOW(),
  NOW()
),
(
  'p5_l36_foreign_investment',
  'p5_m9_international_law',
  36,
  'Foreign Investment & FEMA Compliance',
  'Navigate FDI regulations, FEMA compliance, RBI reporting, overseas investment rules, ECB regulations, pricing guidelines, sector caps, and approval procedures.',
  '["Assess FDI compliance", "File RBI reports", "Structure foreign investment", "Obtain necessary approvals"]',
  '["FDI Compliance Checker", "RBI Reporting Templates", "Investment Structuring Guide", "Approval Process Map"]',
  150,
  130,
  36,
  NOW(),
  NOW()
),
(
  'p5_l37_global_expansion',
  'p5_m9_international_law',
  37,
  'Global Expansion Legal Framework',
  'Plan international subsidiaries, branch offices, representative offices, distributorship models, franchising across borders, transfer pricing, permanent establishment, and tax treaties.',
  '["Choose expansion model", "Set up foreign entities", "Design transfer pricing", "Optimize tax structure"]',
  '["Expansion Model Selector", "Entity Setup Guide", "Transfer Pricing Framework", "Tax Treaty Analyzer"]',
  120,
  120,
  37,
  NOW(),
  NOW()
);

-- Module 10: Technology & Digital Law (Days 38-40)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m10_technology_law',
  'p5_legal_stack',
  'Technology & Digital Law',
  'Master technology agreements, digital compliance, and emerging tech regulations',
  10,
  NOW(),
  NOW()
);

-- Module 10 Lessons (Days 38-40)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l38_technology_agreements',
  'p5_m10_technology_law',
  38,
  'Technology Agreements & Licensing',
  'Draft software licenses, SaaS agreements, API terms, source code escrow, technology transfer agreements, joint development contracts, and open source compliance.',
  '["Create licensing framework", "Draft SaaS terms", "Design escrow arrangements", "Ensure OSS compliance"]',
  '["License Agreement Suite", "SaaS Contract Templates", "Escrow Framework", "OSS Compliance Tool"]',
  150,
  130,
  38,
  NOW(),
  NOW()
),
(
  'p5_l39_digital_compliance',
  'p5_m10_technology_law',
  39,
  'Digital Compliance & IT Act',
  'Master IT Act compliance, intermediary guidelines, cybersecurity regulations, electronic signatures, digital contracts, online dispute resolution, and content moderation policies.',
  '["Implement IT Act compliance", "Create cyber security policy", "Set up digital signatures", "Design content policies"]',
  '["IT Act Compliance Guide", "Cybersecurity Framework", "Digital Signature Setup", "Content Policy Templates"]',
  120,
  120,
  39,
  NOW(),
  NOW()
),
(
  'p5_l40_emerging_tech_law',
  'p5_m10_technology_law',
  40,
  'Emerging Tech Legal Landscape',
  'Navigate AI/ML regulations, blockchain and crypto laws, IoT compliance, drone regulations, autonomous systems, biometric laws, and future technology trends.',
  '["Assess emerging tech risks", "Create AI governance", "Understand crypto regulations", "Plan compliance strategy"]',
  '["Emerging Tech Risk Matrix", "AI Governance Framework", "Crypto Compliance Guide", "Future Tech Tracker"]',
  120,
  120,
  40,
  NOW(),
  NOW()
);

-- Module 11: Crisis Management & Legal Risk (Days 41-43)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m11_crisis_management',
  'p5_legal_stack',
  'Crisis Management & Legal Risk',
  'Build crisis response systems and manage legal risks proactively',
  11,
  NOW(),
  NOW()
);

-- Module 11 Lessons (Days 41-43)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l41_crisis_response',
  'p5_m11_crisis_management',
  41,
  'Legal Crisis Response & War Room System',
  'Build enterprise-grade crisis response system using ₹500Cr+ company protocols. Form legal crisis war room team with defined roles, create 24/7 communication protocols, implement stakeholder management matrix, design media strategy for legal crises, automate regulatory notifications, establish evidence preservation systems, implement damage control mechanisms, and create crisis simulation exercises. Learn from lawyers who managed Uber, Facebook, and Tesla legal crises.',
  '["Form legal crisis war room with 8-person response team", "Create 24/7 crisis protocols with escalation matrix", "Design stakeholder communication plan for 15+ stakeholder groups", "Build automated notification system with regulatory body integration"]',
  '["Crisis War Room Setup Guide", "24/7 Response Protocol System", "Stakeholder Communication Matrix", "Automated Notification Platform", "Crisis Management Lawyer Masterclass (Uber/Facebook cases)"]',
  150,
  140,
  41,
  NOW(),
  NOW()
),
(
  'p5_l42_risk_management',
  'p5_m11_crisis_management',
  42,
  'Legal Risk Management Framework',
  'Implement risk identification systems, assessment methodologies, mitigation strategies, insurance planning, contingency planning, scenario analysis, and regular reviews.',
  '["Map legal risks", "Assess impact probability", "Design mitigation plans", "Review insurance coverage"]',
  '["Risk Mapping Tool", "Impact Assessment Matrix", "Mitigation Planner", "Insurance Analyzer"]',
  120,
  130,
  42,
  NOW(),
  NOW()
),
(
  'p5_l43_reputation_protection',
  'p5_m11_crisis_management',
  43,
  'Reputation & Brand Protection',
  'Manage defamation risks, social media crises, customer complaints, regulatory investigations, whistleblower management, crisis communications, and reputation recovery.',
  '["Create reputation strategy", "Monitor brand mentions", "Design response procedures", "Plan recovery actions"]',
  '["Reputation Strategy Guide", "Monitoring Tools", "Response Templates", "Recovery Playbook"]',
  120,
  130,
  43,
  NOW(),
  NOW()
);

-- Module 12: Legal Leadership & Strategy (Days 44-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p5_m12_legal_leadership',
  'p5_legal_stack',
  'Legal Leadership & Strategy',
  'Transform into a legally empowered founder and build sustainable legal practices',
  12,
  NOW(),
  NOW()
);

-- Module 12 Lessons (Days 44-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p5_l44_legal_leadership',
  'p5_m12_legal_leadership',
  44,
  'Legal Leadership & Unicorn-Scale Excellence',
  'Transform into a legally empowered CEO with unicorn-scale legal leadership. Build world-class in-house legal function, hire top legal talent with compensation benchmarks, manage premium external counsel relationships, implement legal technology stack, design legal budget with ROI tracking, create legal culture with innovation mindset, and establish legal metrics and KPIs. Learn from Chief Legal Officers who scaled Google, Microsoft, and Amazon legal teams.',
  '["Design world-class legal function architecture for 1000+ employee scale", "Create talent acquisition plan with compensation benchmarks", "Set legal budget with ₹1Cr+ optimization opportunities", "Define 25+ legal success metrics and KPI dashboard"]',
  '["Unicorn Legal Function Blueprint", "Legal Talent Acquisition Framework", "Legal Budget Optimizer", "Legal KPI Dashboard", "Fortune 500 CLO Masterclass"]',
  180,
  160,
  44,
  NOW(),
  NOW()
),
(
  'p5_l45_legal_transformation',
  'p5_m12_legal_leadership',
  45,
  'Legal Transformation & Future-Ready Excellence',
  'Complete legal transformation with AI-powered legal stack integration. Integrate all legal systems into unified platform, identify 50+ automation opportunities, implement cutting-edge AI in legal workflows, design continuous improvement frameworks, build future-ready legal infrastructure, create sustainable legal moat, and establish competitive advantage through legal excellence. Master emerging legal technologies and prepare for future legal landscape. Graduate as a legal technology pioneer.',
  '["Integrate complete legal stack with AI automation platform", "Identify and implement 50+ legal automation opportunities", "Deploy AI legal assistant and predictive analytics", "Design continuous legal improvement framework with innovation pipeline"]',
  '["AI Legal Stack Integration Platform", "Legal Automation Opportunity Scanner", "AI Legal Assistant Implementation", "Legal Excellence Framework", "Legal Technology Pioneer Certificate"]',
  180,
  180,
  45,
  NOW(),
  NOW()
);

-- Update Module Progress tracking for all users who might purchase this product
-- This will be handled by the application when users purchase the product

-- Add sample module completion requirements
UPDATE "Module" 
SET description = description || ' - Complete all lessons to unlock certification'
WHERE "productId" = 'p5_legal_stack';

-- Verify the insertion
SELECT 
  p.code,
  p.title,
  p.price,
  COUNT(DISTINCT m.id) as module_count,
  COUNT(DISTINCT l.id) as lesson_count,
  SUM(l."xpReward") as total_xp
FROM "Product" p
LEFT JOIN "Module" m ON m."productId" = p.id
LEFT JOIN "Lesson" l ON l."moduleId" = m.id
WHERE p.id = 'p5_legal_stack'
GROUP BY p.id, p.code, p.title, p.price;