-- P5: Legal Stack - Bulletproof Legal Framework
-- Complete Database Migration Script with 12 Modules & 45 Lessons
-- Version: 1.0.0
-- Date: 2025-08-21

BEGIN;

-- Update existing P5 product with complete information
UPDATE "Product" SET
    title = 'Legal Stack - Bulletproof Legal Framework',
    description = 'Build bulletproof legal infrastructure with contracts, IP protection, and dispute prevention. Master India''s complex legal system with 300+ templates worth ₹1,50,000+.',
    price = 7999, -- Price in rupees
    "isBundle" = false, -- Not a bundle
    "bundleProducts" = '{}', -- Empty array for bundle products
    features = '[
        "45-day intensive legal mastery program",
        "12 comprehensive modules covering all practice areas",
        "300+ battle-tested legal templates (₹1,50,000 value)",
        "Crisis simulation training preventing ₹50L+ litigation",
        "Expert legal network - 100+ specialized lawyers",
        "Lifetime legal updates on law changes & judgments", 
        "Emergency legal hotline - 24x7 crisis support",
        "AI-powered contract analysis and legal research tools",
        "Bar Council recognized legal competency certification",
        "Litigation insurance guidance (₹1 crore coverage)"
    ]'::jsonb,
    "estimatedDays" = 45, -- 45 days
    "updatedAt" = NOW()
WHERE code = 'P5';

-- Create modules for P5
INSERT INTO "Module" (
    id,
    "productId",
    title,
    description,
    "orderIndex",
    "createdAt",
    "updatedAt"
) VALUES
('p5_module_1', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Legal Foundations for Founders', 'Transform legal liability into strategic competitive advantage with comprehensive risk management', 1, NOW(), NOW()),
('p5_module_2', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Contract Mastery & Negotiation', 'Master contract law, drafting excellence, and negotiation strategies for all business agreements', 2, NOW(), NOW()),
('p5_module_3', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Intellectual Property Protection', 'Complete IP strategy from patents to trade secrets with portfolio building and enforcement', 3, NOW(), NOW()),
('p5_module_4', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Employment Law & HR Compliance', 'Navigate complex labor laws with bulletproof employment practices and HR frameworks', 4, NOW(), NOW()),
('p5_module_5', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Dispute Resolution & Litigation Management', 'Master dispute prevention, ADR mechanisms, and litigation process management', 5, NOW(), NOW()),
('p5_module_6', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Data Protection & Privacy Law', 'Comprehensive privacy compliance framework with cross-border data transfer expertise', 6, NOW(), NOW()),
('p5_module_7', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Regulatory Compliance Mastery', 'Industry-specific regulatory frameworks with compliance monitoring and audit systems', 7, NOW(), NOW()),
('p5_module_8', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Investment & M&A Legal Framework', 'Master investment documentation, due diligence, and transaction legal management', 8, NOW(), NOW()),
('p5_module_9', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Corporate Governance & Board Management', 'Professional board governance with director duties and shareholder rights management', 9, NOW(), NOW()),
('p5_module_10', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'International Legal & Cross-Border Compliance', 'Navigate global legal complexities with international contracts and regulatory compliance', 10, NOW(), NOW()),
('p5_module_11', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Crisis Management & Legal Emergency Response', 'Handle legal crises with emergency protocols and reputation management strategies', 11, NOW(), NOW()),
('p5_module_12', 'f7d09e1c-1478-418b-9ce8-c63a6e5ac462', 'Legal Technology & Future-Ready Frameworks', 'Implement AI-powered legal tools and prepare for emerging legal challenges', 12, NOW(), NOW())
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    "orderIndex" = EXCLUDED."orderIndex",
    "updatedAt" = NOW();

-- Create lessons for Module 1: Legal Foundations for Founders (Days 1-4)
INSERT INTO "Lesson" (
    id,
    "moduleId", 
    day,
    title,
    "briefContent",
    "actionItems",
    resources,
    "estimatedTime",
    "xpReward",
    "orderIndex",
    "createdAt",
    "updatedAt"
) VALUES

-- Module 1: Legal Foundations for Founders (Days 1-4)
('p5_lesson_1', 'p5_module_1', 1, 'Why Legal Matters - The ₹100 Crore Wake-Up Call',
'Master the legal risk landscape that causes 90% of startup failures. Analyze real case studies of legal disasters like Flipkart founders split (₹1000 Cr), Snapdeal employee lawsuit (₹500 Cr), and Paytm penalties (₹200 Cr). Build prevention-first mindset.',
'[
    "Complete comprehensive legal risk assessment for your business using our calculator",
    "Identify top 5 legal risks and calculate prevention vs cure costs",
    "Establish legal emergency fund (2% of annual revenue recommended)",
    "Create legal decision-making framework for your team",
    "Schedule quarterly legal health check-ups with timeline"
]'::jsonb,
'[
    "Legal Risk Assessment Calculator (Excel with 200+ risk factors)",
    "₹100 Crore Legal Disasters Case Study Library",
    "Legal Emergency Response Plan Template", 
    "Legal Budget Planning Tool (5-year projection)",
    "Expert Masterclass: \"Legal Disasters That Could Have Been Prevented\" - Sr. Advocate Mukul Rohatgi"
]'::jsonb, 60, 100, 1, NOW(), NOW()),

('p5_lesson_2', 'p5_module_1', 2, 'Indian Legal System Navigation & Court Hierarchy', 
'Navigate India''s complex legal system from Supreme Court to District Courts. Understand jurisdictions, procedures, and legal professional ecosystem. Master court filing procedures and case tracking systems.',
'[
    "Map out court hierarchy for your business disputes",
    "Create legal professional network contact database",
    "Set up case tracking and legal matter management system",
    "Establish relationships with specialized lawyers in key practice areas",
    "Create jurisdiction analysis for your business operations"
]'::jsonb,
'[
    "Complete Indian Court System Navigation Guide",
    "Legal Professional Directory Template (500+ contacts)",
    "Court Procedure Checklists for Different Courts",
    "Legal Matter Management System Setup",
    "Jurisdiction Selection Framework for Dispute Resolution"
]'::jsonb, 45, 75, 2, NOW(), NOW()),

('p5_lesson_3', 'p5_module_1', 3, 'Founder Agreements & Equity Disputes Prevention', 
'Create bulletproof founder agreements preventing the #1 cause of startup failures. Master equity splits, vesting schedules, IP assignment, and exit mechanisms. Learn from founder dispute case studies.',
'[
    "Draft comprehensive founders agreement using provided templates",
    "Negotiate and finalize equity splits with proper vesting",
    "Create IP assignment and contribution documentation",
    "Set up founder exit and buyback mechanisms",
    "Establish dispute resolution procedures and mediation framework"
]'::jsonb,
'[
    "Complete Founders Agreement Suite (8 different templates)",
    "Equity Calculator and Vesting Schedule Builder",
    "IP Assignment and Contribution Agreements",
    "Founder Exit Strategy Documentation",
    "Real Case Study: Flipkart Founders Split Analysis"
]'::jsonb, 90, 125, 3, NOW(), NOW()),

('p5_lesson_4', 'p5_module_1', 4, 'Corporate Structure & Governance Framework', 
'Design optimal corporate structure for liability protection and growth. Master board governance, director duties, and shareholder rights. Create governance systems preventing corporate disasters.',
'[
    "Design optimal corporate structure for your business model",
    "Create board composition and governance framework",
    "Draft director appointment and resignation procedures", 
    "Set up shareholders rights and protection mechanisms",
    "Implement corporate compliance monitoring system"
]'::jsonb,
'[
    "Corporate Structure Optimization Guide",
    "Board Governance Manual (50+ pages)",
    "Director Duties and Liabilities Handbook",
    "Shareholder Rights Protection Framework",
    "Corporate Compliance Calendar and Checklist"
]'::jsonb, 75, 100, 4, NOW(), NOW()),

-- Module 2: Contract Mastery & Negotiation (Days 5-8)
('p5_lesson_5', 'p5_module_2', 5, 'Contract Law Fundamentals & Indian Contract Act',
'Master essential elements of valid contracts under Indian Contract Act. Understand offer, acceptance, consideration, and capacity. Learn breach consequences, damages, and remedies.',
'[
    "Review all existing business contracts for legal compliance",
    "Create contract templates library for your business",
    "Establish contract review and approval processes",
    "Set up contract lifecycle management system", 
    "Train team on contract fundamentals and red flags"
]'::jsonb,
'[
    "Indian Contract Act Practical Guide",
    "Contract Elements Checklist and Validation Tool",
    "Contract Breach Analysis and Remedies Guide",
    "Contract Review Checklist (100+ points)",
    "Contract Law Case Studies and Precedents"
]'::jsonb, 60, 100, 5, NOW(), NOW()),

('p5_lesson_6', 'p5_module_2', 6, 'Customer Contracts Excellence - B2B & B2C',
'Create bulletproof customer agreements for B2B and B2C scenarios. Master MSAs, SOWs, SLAs, and subscription terms. Protect against customer disputes and payment defaults.',
'[
    "Draft comprehensive B2B Master Service Agreement",
    "Create customer-specific Statements of Work templates",
    "Design Service Level Agreements with penalties and credits",
    "Develop B2C terms of service and privacy policies",
    "Set up customer contract management and renewal system"
]'::jsonb,
'[
    "B2B Contract Library (20+ templates)",
    "B2C Terms and Policies Suite",
    "SLA Template with Performance Metrics",
    "Customer Contract Negotiation Playbook",
    "Contract Performance Monitoring Dashboard"
]'::jsonb, 75, 125, 6, NOW(), NOW()),

('p5_lesson_7', 'p5_module_2', 7, 'Vendor & Supplier Agreement Mastery',
'Secure your supply chain with bulletproof vendor agreements. Master procurement contracts, quality standards, and performance management. Prevent vendor disputes and ensure compliance.',
'[
    "Audit all existing vendor agreements for gaps",
    "Create comprehensive vendor master service agreements",
    "Establish vendor performance monitoring and evaluation system",
    "Design procurement and purchase order procedures",
    "Set up vendor compliance and audit framework"
]'::jsonb,
'[
    "Vendor Agreement Template Library (15+ types)",
    "Vendor Performance Evaluation System",
    "Procurement Contract Management Framework", 
    "Quality Standards and Compliance Checklists",
    "Vendor Dispute Resolution Procedures"
]'::jsonb, 60, 100, 7, NOW(), NOW()),

('p5_lesson_8', 'p5_module_2', 8, 'Contract Negotiation Mastery & Win-Win Strategies',
'Master advanced negotiation tactics for complex commercial agreements. Develop BATNA, manage risk allocation, and create win-win outcomes. Learn from expert negotiation case studies.',
'[
    "Develop negotiation strategy for your top 3 critical contracts",
    "Practice contract negotiation using provided scenarios",
    "Create standard contract terms and fallback positions",
    "Build relationship-based negotiation framework",
    "Establish contract approval and escalation matrix"
]'::jsonb,
'[
    "Contract Negotiation Masterclass (3-hour video series)",
    "Negotiation Strategy Development Framework",
    "Contract Terms Negotiation Database (1000+ clauses)",
    "Win-Win Negotiation Case Studies",
    "Real-time Contract Negotiation Simulator"
]'::jsonb, 90, 150, 8, NOW(), NOW()),

-- Module 3: Intellectual Property Protection (Days 9-12)
('p5_lesson_9', 'p5_module_3', 9, 'IP Strategy for Startups & Portfolio Building',
'Develop comprehensive IP strategy identifying all valuable assets. Create IP portfolio roadmap with priority-based protection. Master IP valuation and monetization strategies.',
'[
    "Conduct comprehensive IP audit of your business",
    "Develop IP protection strategy and budget allocation", 
    "Create IP portfolio management system",
    "File priority trademark and copyright applications",
    "Set up IP monitoring and enforcement procedures"
]'::jsonb,
'[
    "Complete IP Audit Checklist (300+ items)", 
    "IP Strategy Development Framework",
    "IP Portfolio Management System",
    "IP Valuation Calculator and Methods",
    "IP Monetization Strategy Guide"
]'::jsonb, 75, 125, 9, NOW(), NOW()),

('p5_lesson_10', 'p5_module_3', 10, 'Trademark Protection & Brand Security',
'Secure your brand with comprehensive trademark strategy. Master registration process, international protection, and enforcement actions. Protect domain names and social media handles.',
'[
    "Complete trademark search and availability analysis",
    "File trademark applications for key brand elements",
    "Secure domain names and social media handles", 
    "Set up trademark monitoring and watch services",
    "Create brand protection enforcement strategy"
]'::jsonb,
'[
    "Trademark Registration Complete Guide",
    "Brand Protection Strategy Framework",
    "Domain Name Security and Recovery Procedures",
    "Trademark Opposition and Enforcement Templates",
    "International Trademark Protection Guide (Madrid Protocol)"
]'::jsonb, 60, 100, 10, NOW(), NOW()),

('p5_lesson_11', 'p5_module_3', 11, 'Patent Strategy & Trade Secrets Management',
'Navigate patent landscape for startups with cost-effective strategies. Master trade secrets protection as patent alternative. Create invention disclosure and protection processes.',
'[
    "Evaluate patentability of your innovations",
    "Create trade secrets identification and protection system",
    "Establish invention disclosure procedures",
    "Set up confidentiality and access control measures",
    "Develop IP assignment agreements for employees"
]'::jsonb,
'[
    "Patent vs Trade Secret Decision Framework",
    "Trade Secrets Protection Manual",
    "Invention Disclosure Process and Forms",
    "Confidentiality Agreement Library (10+ types)",
    "Employee IP Assignment Templates"
]'::jsonb, 75, 125, 11, NOW(), NOW()),

('p5_lesson_12', 'p5_module_3', 12, 'IP Litigation & Enforcement Strategies',
'Master IP enforcement from cease & desist to court proceedings. Create cost-effective enforcement strategy. Handle IP disputes and create defensive portfolios.',
'[
    "Create IP enforcement strategy and budget",
    "Draft cease and desist letter templates",
    "Set up IP infringement monitoring systems",
    "Develop defensive IP portfolio strategy", 
    "Create IP insurance and litigation funding plan"
]'::jsonb,
'[
    "IP Enforcement Strategy Guide",
    "Cease and Desist Letter Templates (15+ scenarios)",
    "IP Infringement Response Procedures",
    "IP Litigation Cost Calculator",
    "IP Insurance and Litigation Funding Guide"
]'::jsonb, 60, 100, 12, NOW(), NOW()),

-- Module 4: Employment Law & HR Compliance (Days 13-16)
('p5_lesson_13', 'p5_module_4', 13, 'Employment Law Fundamentals & Compliance Framework',
'Master India''s complex employment laws preventing costly violations. Understand Shops & Establishments, Payment of Wages, and Industrial Disputes Acts. Create compliance monitoring system.',
'[
    "Audit current employment practices for legal compliance",
    "Register under applicable labor laws",
    "Create comprehensive employment law compliance calendar",
    "Set up statutory deductions and payment systems",
    "Establish record-keeping and documentation procedures"
]'::jsonb,
'[
    "Employment Law Compliance Manual (100+ pages)",
    "Labor Law Registration and Compliance Guide",
    "Statutory Compliance Calendar and Reminders",
    "Employment Records Management System",
    "Labor Law Violation Prevention Checklist"
]'::jsonb, 75, 125, 13, NOW(), NOW()),

('p5_lesson_14', 'p5_module_4', 14, 'Hiring Excellence & Employment Contracts',
'Create bulletproof hiring processes preventing discrimination and legal issues. Master employment contract drafting with proper terms and conditions. Establish onboarding procedures.',
'[
    "Develop legally compliant hiring and interview procedures",
    "Create employment contract templates for all roles",
    "Establish background verification and reference check process",
    "Set up employee onboarding and documentation system",
    "Create probation evaluation and confirmation procedures"
]'::jsonb,
'[
    "Employment Contract Library (25+ templates)",
    "Hiring Process Legal Compliance Guide", 
    "Background Verification Procedures and Forms",
    "Employee Onboarding Checklist and Documentation",
    "Probation Management and Evaluation System"
]'::jsonb, 60, 100, 14, NOW(), NOW()),

('p5_lesson_15', 'p5_module_4', 15, 'Workplace Policies & Sexual Harassment Prevention',
'Create mandatory workplace policies preventing legal violations. Implement POSH Act compliance with committees and procedures. Establish grievance handling systems.',
'[
    "Draft all mandatory workplace policies",
    "Set up Internal Complaints Committee for POSH Act",
    "Create employee grievance handling procedures",
    "Implement policy communication and training system",
    "Establish policy review and update mechanisms"
]'::jsonb,
'[
    "Complete Workplace Policies Library (20+ policies)",
    "POSH Act Compliance Complete Kit",
    "Employee Grievance Management System",
    "Policy Training and Communication Framework",
    "Workplace Investigation Procedures Manual"
]'::jsonb, 90, 150, 15, NOW(), NOW()),

('p5_lesson_16', 'p5_module_4', 16, 'Performance Management & Termination Procedures',
'Master legally sound performance management preventing wrongful termination claims. Create disciplinary procedures following natural justice. Establish separation and exit protocols.',
'[
    "Create performance management and evaluation system",
    "Establish disciplinary procedures and warning systems",
    "Set up termination procedures for different scenarios",
    "Create exit process and full & final settlement procedures",
    "Establish employee separation documentation system"
]'::jsonb,
'[
    "Performance Management Legal Framework",
    "Disciplinary Procedures Manual with Forms",
    "Termination Procedures Guide (All Types)",
    "Exit Process and Settlement Calculator",
    "Employment Separation Documentation Kit"
]'::jsonb, 75, 125, 16, NOW(), NOW()),

-- Module 5: Dispute Resolution & Litigation Management (Days 17-20)
('p5_lesson_17', 'p5_module_5', 17, 'Dispute Prevention & Early Resolution Strategies',
'Master dispute prevention through superior contract drafting and relationship management. Create early warning systems and escalation procedures preventing costly litigation.',
'[
    "Analyze past disputes to identify prevention opportunities",
    "Create dispute prevention protocols and early warning systems",
    "Establish internal escalation and resolution procedures",
    "Set up relationship management system with key stakeholders",
    "Create dispute resolution cost-benefit analysis framework"
]'::jsonb,
'[
    "Dispute Prevention Strategy Guide",
    "Early Warning System Templates",
    "Internal Escalation Procedures Manual", 
    "Relationship Management Framework",
    "Dispute Resolution Cost Calculator"
]'::jsonb, 60, 100, 17, NOW(), NOW()),

('p5_lesson_18', 'p5_module_5', 18, 'Alternative Dispute Resolution - Arbitration & Mediation',
'Master ADR mechanisms saving 70% litigation costs. Create arbitration clauses and mediation procedures. Understand when to use each ADR method for optimal outcomes.',
'[
    "Review all contracts to include appropriate ADR clauses",
    "Create standard arbitration and mediation clause library",
    "Establish ADR service provider relationships",
    "Set up ADR cost budgeting and management procedures",
    "Create ADR outcome evaluation and learning system"
]'::jsonb,
'[
    "Complete ADR Strategy and Implementation Guide",
    "Arbitration Clause Library (20+ variations)",
    "Mediation Procedures and Best Practices",
    "ADR Service Provider Directory",
    "ADR vs Litigation Decision Framework"
]'::jsonb, 75, 125, 18, NOW(), NOW()),

('p5_lesson_19', 'p5_module_5', 19, 'Litigation Process Management & Court Procedures',
'Navigate litigation process efficiently from filing to judgment. Master evidence collection, witness preparation, and court procedures. Minimize litigation costs and duration.',
'[
    "Create litigation readiness checklist and procedures",
    "Set up evidence collection and preservation systems",
    "Establish lawyer selection and management procedures",
    "Create litigation budget and cost control framework",
    "Set up case progress monitoring and reporting system"
]'::jsonb,
'[
    "Litigation Management Complete Guide",
    "Evidence Collection and Preservation Manual",
    "Court Procedures and Filing Requirements",
    "Litigation Budget Planning and Control Tools",
    "Case Management and Progress Tracking System"
]'::jsonb, 90, 150, 19, NOW(), NOW()),

('p5_lesson_20', 'p5_module_5', 20, 'Commercial Disputes & Recovery Strategies',
'Handle payment defaults, contract breaches, and commercial disputes effectively. Master recovery procedures from demand notices to execution. Protect business relationships while enforcing rights.',
'[
    "Create payment default and recovery procedures",
    "Establish contract breach response protocols",
    "Set up commercial dispute escalation matrix",
    "Create recovery cost-benefit analysis system",
    "Establish debt recovery and collection procedures"
]'::jsonb,
'[
    "Commercial Dispute Resolution Playbook",
    "Payment Recovery Procedures and Templates",
    "Contract Breach Response Protocol",
    "Debt Recovery Strategy Guide",
    "Commercial Litigation Prevention Framework"
]'::jsonb, 75, 125, 20, NOW(), NOW()),

-- Module 6: Data Protection & Privacy Law (Days 21-24)
('p5_lesson_21', 'p5_module_6', 21, 'Data Protection Fundamentals & Privacy Principles',
'Master global privacy principles and Indian data protection landscape. Understand lawful processing, consent management, and data subject rights. Prepare for upcoming Indian data protection law.',
'[
    "Conduct comprehensive data mapping and inventory",
    "Assess current data processing activities for compliance",
    "Create data protection policy and procedures",
    "Set up consent management and documentation system",
    "Establish data subject rights response procedures"
]'::jsonb,
'[
    "Data Protection Compliance Framework",
    "Data Mapping and Inventory Templates",
    "Privacy Policy Generator and Templates",
    "Consent Management System Setup",
    "Data Subject Rights Response Procedures"
]'::jsonb, 75, 125, 21, NOW(), NOW()),

('p5_lesson_22', 'p5_module_6', 22, 'Cross-Border Data Transfers & International Compliance',
'Navigate complex cross-border data transfer requirements. Master GDPR, CCPA, and other global privacy laws. Create compliant data transfer mechanisms and international frameworks.',
'[
    "Map all cross-border data flows and transfers",
    "Assess adequacy decisions and transfer mechanisms",
    "Create data processing agreements with vendors",
    "Establish international compliance monitoring",
    "Set up data localization compliance procedures"
]'::jsonb,
'[
    "Cross-Border Data Transfer Guide",
    "International Privacy Law Comparison Matrix",
    "Data Processing Agreement Templates",
    "Data Localization Compliance Framework",
    "Global Privacy Compliance Monitoring System"
]'::jsonb, 60, 100, 22, NOW(), NOW()),

('p5_lesson_23', 'p5_module_6', 23, 'Cybersecurity Legal Requirements & Breach Management',
'Implement legally mandated cybersecurity measures. Create incident response procedures meeting legal requirements. Establish breach notification and regulatory reporting systems.',
'[
    "Assess cybersecurity measures against legal requirements",
    "Create incident response and breach notification procedures",
    "Set up regulatory reporting and communication protocols",
    "Establish cyber insurance and risk transfer mechanisms",
    "Create cybersecurity audit and compliance monitoring"
]'::jsonb,
'[
    "Cybersecurity Legal Compliance Guide",
    "Incident Response Procedures Manual",
    "Breach Notification Templates and Timelines",
    "Cyber Insurance and Risk Management Framework",
    "Cybersecurity Audit and Monitoring System"
]'::jsonb, 90, 150, 23, NOW(), NOW()),

('p5_lesson_24', 'p5_module_6', 24, 'Technology Contracts & SaaS Legal Framework',
'Master complex technology agreements including SaaS, cloud, and software licensing. Navigate data ownership, security standards, and liability limitations. Create comprehensive tech contracts.',
'[
    "Review all technology contracts for legal compliance",
    "Create standard technology contract templates",
    "Establish SaaS and cloud agreement frameworks",
    "Set up technology vendor compliance monitoring",
    "Create technology contract negotiation playbook"
]'::jsonb,
'[
    "Technology Contract Library (25+ templates)",
    "SaaS Agreement Framework and Negotiations",
    "Cloud Computing Legal Compliance Guide",
    "Software Licensing Strategy and Templates",
    "Technology Vendor Management Framework"
]'::jsonb, 75, 125, 24, NOW(), NOW()),

-- Module 7: Regulatory Compliance Mastery (Days 25-28)
('p5_lesson_25', 'p5_module_7', 25, 'Industry-Specific Regulations - FinTech & HealthTech',
'Navigate sector-specific regulations for FinTech and HealthTech. Master RBI guidelines, medical device rules, and specialized compliance requirements. Create industry-specific frameworks.',
'[
    "Identify all applicable industry-specific regulations",
    "Create compliance framework for your industry sector",
    "Set up regulatory monitoring and update systems",
    "Establish industry association and regulator relationships",
    "Create sector-specific compliance audit procedures"
]'::jsonb,
'[
    "FinTech Regulatory Compliance Complete Guide",
    "HealthTech Legal Framework and Requirements",
    "Industry-Specific Compliance Matrix",
    "Regulatory Monitoring and Alert System",
    "Sector Compliance Audit Checklists"
]'::jsonb, 90, 150, 25, NOW(), NOW()),

('p5_lesson_26', 'p5_module_7', 26, 'Consumer Protection & E-commerce Regulations',
'Master consumer rights and e-commerce regulatory requirements. Understand marketplace rules, return policies, and grievance mechanisms. Create consumer-compliant business frameworks.',
'[
    "Audit business practices for consumer law compliance",
    "Create consumer protection policies and procedures",
    "Set up customer grievance handling and resolution systems",
    "Establish e-commerce compliance monitoring",
    "Create consumer rights education and communication framework"
]'::jsonb,
'[
    "Consumer Protection Compliance Manual",
    "E-commerce Regulatory Framework",
    "Customer Grievance Management System",
    "Consumer Rights Protection Procedures",
    "Marketplace and Platform Compliance Guide"
]'::jsonb, 60, 100, 26, NOW(), NOW()),

('p5_lesson_27', 'p5_module_7', 27, 'Competition Law & Anti-Trust Compliance',
'Navigate competition law preventing anti-competitive practices. Understand merger control requirements and abuse of dominance risks. Create competition law compliance framework.',
'[
    "Assess business practices for competition law compliance",
    "Create anti-competitive practices prevention framework",
    "Set up merger and acquisition legal review procedures",
    "Establish competition law training and awareness programs",
    "Create competition authority relationship management"
]'::jsonb,
'[
    "Competition Law Compliance Framework",
    "Anti-Competitive Practices Prevention Guide",
    "Merger Control Legal Requirements",
    "Competition Law Training Materials",
    "CCI Interaction and Compliance Procedures"
]'::jsonb, 75, 125, 27, NOW(), NOW()),

('p5_lesson_28', 'p5_module_7', 28, 'Environmental & Import-Export Compliance',
'Master environmental law compliance and foreign trade regulations. Understand waste management, pollution control, and FEMA requirements. Create comprehensive compliance systems.',
'[
    "Assess environmental compliance requirements for your operations",
    "Set up waste management and pollution control procedures",
    "Create import-export compliance framework if applicable",
    "Establish environmental monitoring and audit systems",
    "Set up foreign exchange compliance procedures"
]'::jsonb,
'[
    "Environmental Law Compliance Guide",
    "Import-Export Legal Framework",
    "FEMA Compliance Procedures Manual",
    "Environmental Audit and Monitoring System",
    "Foreign Trade Compliance Templates"
]'::jsonb, 60, 100, 28, NOW(), NOW()),

-- Module 8: Investment & M&A Legal Framework (Days 29-32)
('p5_lesson_29', 'p5_module_8', 29, 'Investment Documentation & Term Sheet Mastery',
'Master investment documentation from SAFE notes to Series A/B/C agreements. Understand term sheet negotiation and investor rights. Create investment-ready legal framework.',
'[
    "Create comprehensive investment documentation library",
    "Prepare term sheet templates and negotiation framework",
    "Set up investor rights and protection mechanisms",
    "Establish investment due diligence procedures",
    "Create investment legal timeline and milestone tracking"
]'::jsonb,
'[
    "Complete Investment Documentation Library",
    "Term Sheet Negotiation Masterclass and Templates",
    "Investor Rights Agreement Framework",
    "Investment Due Diligence Checklist",
    "Fundraising Legal Timeline and Milestones"
]'::jsonb, 90, 150, 29, NOW(), NOW()),

('p5_lesson_30', 'p5_module_8', 30, 'Due Diligence Management & Data Room Setup',
'Master due diligence process from both sides of transactions. Create professional data rooms and manage Q&A processes. Understand warranty and indemnity negotiations.',
'[
    "Set up professional virtual data room",
    "Create comprehensive due diligence checklist",
    "Organize all corporate documents and contracts",
    "Prepare disclosure schedules and legal summaries",
    "Set up due diligence project management system"
]'::jsonb,
'[
    "Virtual Data Room Setup and Management Guide",
    "Due Diligence Checklist (500+ items)",
    "Legal Document Organization System",
    "Disclosure Schedule Templates",
    "Due Diligence Project Management Framework"
]'::jsonb, 75, 125, 30, NOW(), NOW()),

('p5_lesson_31', 'p5_module_8', 31, 'M&A Transactions & Deal Structure Mastery',
'Navigate complex M&A transactions including share purchases, asset deals, and mergers. Master deal structure optimization and transaction document negotiation.',
'[
    "Analyze optimal deal structures for different scenarios",
    "Create M&A transaction documentation templates",
    "Set up transaction management and timeline procedures",
    "Establish post-closing integration legal framework",
    "Create M&A legal cost budgeting and control system"
]'::jsonb,
'[
    "M&A Deal Structure Optimization Guide",
    "Complete M&A Documentation Templates",
    "Transaction Management Framework",
    "Post-Closing Integration Legal Procedures",
    "M&A Legal Cost Management System"
]'::jsonb, 90, 150, 31, NOW(), NOW()),

('p5_lesson_32', 'p5_module_8', 32, 'Exit Strategies & Liquidity Planning',
'Plan and execute various exit strategies from strategic sales to IPOs. Master exit preparation, valuation optimization, and transaction execution. Create exit-ready legal framework.',
'[
    "Develop exit strategy options and timeline",
    "Prepare exit-ready legal documentation and compliance",
    "Create valuation optimization legal strategies",
    "Set up exit transaction management procedures",
    "Establish post-exit legal obligations management"
]'::jsonb,
'[
    "Exit Strategy Planning and Execution Guide",
    "Exit-Ready Legal Documentation Checklist",
    "Valuation Optimization Legal Strategies",
    "Exit Transaction Management Framework",
    "Post-Exit Legal Obligations Management"
]'::jsonb, 75, 125, 32, NOW(), NOW()),

-- Module 9: Corporate Governance & Board Management (Days 33-36)
('p5_lesson_33', 'p5_module_9', 33, 'Board Governance Excellence & Director Duties',
'Master professional board governance preventing director liability. Understand fiduciary duties, business judgment rule, and board decision-making processes.',
'[
    "Establish professional board governance framework",
    "Create board meeting procedures and documentation systems",
    "Set up director training and liability protection measures",
    "Implement board evaluation and improvement processes",
    "Create board compliance monitoring and audit systems"
]'::jsonb,
'[
    "Board Governance Manual (100+ pages)",
    "Director Duties and Liabilities Comprehensive Guide",
    "Board Meeting Management System",
    "Director Training and Development Framework",
    "Board Compliance and Audit Procedures"
]'::jsonb, 75, 125, 33, NOW(), NOW()),

('p5_lesson_34', 'p5_module_9', 34, 'Shareholder Rights & Investor Relations Management',
'Master complex shareholder agreements and investor relations. Understand voting rights, information rights, and exit rights. Create investor-friendly governance framework.',
'[
    "Create comprehensive shareholder agreement",
    "Set up investor communication and reporting systems",
    "Establish shareholder meeting procedures and documentation",
    "Create investor rights protection and enforcement mechanisms",
    "Set up shareholder dispute prevention and resolution procedures"
]'::jsonb,
'[
    "Shareholder Agreement Comprehensive Templates",
    "Investor Relations Management System",
    "Shareholder Meeting Management Framework",
    "Investor Rights Protection Procedures",
    "Shareholder Dispute Resolution Framework"
]'::jsonb, 60, 100, 34, NOW(), NOW()),

('p5_lesson_35', 'p5_module_9', 35, 'Corporate Compliance & Statutory Requirements',
'Master ongoing corporate compliance preventing penalties and sanctions. Understand annual filing requirements, statutory registers, and compliance monitoring.',
'[
    "Set up comprehensive corporate compliance calendar",
    "Create statutory register maintenance system",
    "Establish annual compliance audit and review procedures",
    "Set up compliance training and awareness programs",
    "Create compliance violation response and remediation procedures"
]'::jsonb,
'[
    "Corporate Compliance Calendar and Management System",
    "Statutory Register Maintenance Framework",
    "Annual Compliance Audit Procedures",
    "Compliance Training and Awareness Materials",
    "Compliance Violation Response Procedures"
]'::jsonb, 60, 100, 35, NOW(), NOW()),

('p5_lesson_36', 'p5_module_9', 36, 'Related Party Transactions & Conflict Management',
'Navigate complex related party transaction requirements and conflict of interest management. Create transparency and approval frameworks preventing governance issues.',
'[
    "Identify and document all related party relationships",
    "Create related party transaction approval procedures",
    "Set up conflict of interest identification and management systems",
    "Establish related party transaction monitoring and audit procedures",
    "Create related party disclosure and transparency framework"
]'::jsonb,
'[
    "Related Party Transaction Management Framework",
    "Conflict of Interest Policy and Procedures",
    "Related Party Transaction Approval System",
    "RPT Monitoring and Audit Procedures",
    "Related Party Disclosure Framework"
]'::jsonb, 75, 125, 36, NOW(), NOW()),

-- Module 10: International Legal & Cross-Border Compliance (Days 37-40)
('p5_lesson_37', 'p5_module_10', 37, 'International Contracts & Cross-Border Transactions',
'Master international contract law and cross-border transaction management. Understand jurisdiction selection, governing law, and international dispute resolution.',
'[
    "Review all international contracts for legal compliance",
    "Create international contract templates and frameworks",
    "Set up cross-border transaction management procedures",
    "Establish international legal counsel network",
    "Create international compliance monitoring systems"
]'::jsonb,
'[
    "International Contract Law Guide",
    "Cross-Border Transaction Framework",
    "International Contract Templates Library",
    "Global Legal Counsel Network Directory",
    "International Compliance Monitoring System"
]'::jsonb, 90, 150, 37, NOW(), NOW()),

('p5_lesson_38', 'p5_module_10', 38, 'Foreign Investment & FEMA Compliance',
'Navigate foreign investment regulations and FEMA compliance requirements. Understand FDI policies, repatriation procedures, and regulatory reporting.',
'[
    "Assess foreign investment compliance requirements",
    "Set up FEMA compliance monitoring and reporting systems",
    "Create foreign investment documentation and approval procedures",
    "Establish foreign exchange transaction monitoring",
    "Set up RBI reporting and compliance procedures"
]'::jsonb,
'[
    "Foreign Investment Legal Framework",
    "FEMA Compliance Complete Guide",
    "FDI Policy and Procedures Manual",
    "Foreign Exchange Transaction Monitoring System",
    "RBI Reporting and Compliance Framework"
]'::jsonb, 75, 125, 38, NOW(), NOW()),

('p5_lesson_39', 'p5_module_10', 39, 'International Arbitration & Global Dispute Resolution',
'Master international arbitration and global dispute resolution mechanisms. Understand enforcement of foreign judgments and cross-border litigation management.',
'[
    "Create international arbitration clause library",
    "Set up international dispute resolution procedures",
    "Establish relationships with international arbitration institutions",
    "Create cross-border litigation management framework",
    "Set up international enforcement and recovery procedures"
]'::jsonb,
'[
    "International Arbitration Complete Guide",
    "Global Dispute Resolution Framework",
    "International Arbitration Institution Directory",
    "Cross-Border Litigation Management System",
    "International Enforcement and Recovery Procedures"
]'::jsonb, 60, 100, 39, NOW(), NOW()),

('p5_lesson_40', 'p5_module_10', 40, 'Export Controls & International Trade Compliance',
'Navigate export control regulations and international trade compliance. Understand sanctions, embargoes, and dual-use technology restrictions.',
'[
    "Assess export control and trade compliance requirements",
    "Set up international trade compliance monitoring systems",
    "Create export control classification and screening procedures",
    "Establish sanctions and embargo compliance framework",
    "Set up international trade documentation and record-keeping"
]'::jsonb,
'[
    "Export Control and Trade Compliance Guide",
    "International Trade Compliance Framework",
    "Export Control Classification System",
    "Sanctions and Embargo Compliance Procedures",
    "International Trade Documentation System"
]'::jsonb, 75, 125, 40, NOW(), NOW()),

-- Module 11: Crisis Management & Legal Emergency Response (Days 41-43)
('p5_lesson_41', 'p5_module_11', 41, 'Legal Crisis Management & Emergency Response',
'Master legal crisis management from regulatory raids to media emergencies. Create emergency response protocols and crisis communication strategies.',
'[
    "Create comprehensive legal crisis response plan",
    "Set up emergency legal hotline and response team",
    "Establish crisis communication and media management procedures",
    "Create regulatory emergency response protocols",
    "Set up crisis recovery and reputation management framework"
]'::jsonb,
'[
    "Legal Crisis Management Playbook (100+ pages)",
    "Emergency Response Team Setup and Procedures",
    "Crisis Communication and Media Management Guide",
    "Regulatory Emergency Response Protocols",
    "Crisis Recovery and Reputation Management Framework"
]'::jsonb, 90, 150, 41, NOW(), NOW()),

('p5_lesson_42', 'p5_module_11', 42, 'Whistleblower Management & Internal Investigations',
'Handle whistleblower complaints and conduct internal investigations. Master evidence preservation, interview techniques, and investigation documentation.',
'[
    "Set up whistleblower complaint handling system",
    "Create internal investigation procedures and team",
    "Establish evidence preservation and documentation protocols",
    "Set up investigation reporting and remediation procedures",
    "Create whistleblower protection and retaliation prevention measures"
]'::jsonb,
'[
    "Whistleblower Management Complete System",
    "Internal Investigation Procedures Manual",
    "Evidence Preservation and Documentation Framework",
    "Investigation Reporting and Remediation Guide",
    "Whistleblower Protection Framework"
]'::jsonb, 75, 125, 42, NOW(), NOW()),

('p5_lesson_43', 'p5_module_11', 43, 'Regulatory Investigations & Government Relations',
'Navigate regulatory investigations and maintain positive government relations. Master document production, regulatory interviews, and settlement negotiations.',
'[
    "Create regulatory investigation response procedures",
    "Set up government relations and communication framework",
    "Establish document production and privilege protection protocols",
    "Create regulatory settlement and negotiation procedures",
    "Set up regulatory compliance improvement and monitoring systems"
]'::jsonb,
'[
    "Regulatory Investigation Response Manual",
    "Government Relations and Communication Framework",
    "Document Production and Privilege Protection Guide",
    "Regulatory Settlement and Negotiation Procedures",
    "Regulatory Compliance Improvement System"
]'::jsonb, 90, 150, 43, NOW(), NOW()),

-- Module 12: Legal Technology & Future-Ready Frameworks (Days 44-45)
('p5_lesson_44', 'p5_module_12', 44, 'Legal Technology Implementation & AI-Powered Tools',
'Implement cutting-edge legal technology including AI contract analysis, legal research tools, and compliance automation. Future-proof your legal operations.',
'[
    "Implement AI-powered contract analysis and review system",
    "Set up automated legal research and precedent tracking",
    "Create legal compliance automation and monitoring systems",
    "Establish legal knowledge management and repository",
    "Set up legal performance analytics and optimization"
]'::jsonb,
'[
    "Legal Technology Implementation Guide",
    "AI-Powered Contract Analysis System Setup",
    "Legal Research Automation Tools",
    "Compliance Automation Framework", 
    "Legal Knowledge Management System"
]'::jsonb, 75, 125, 44, NOW(), NOW()),

('p5_lesson_45', 'p5_module_12', 45, 'Future Legal Challenges & Emerging Law Preparation',
'Prepare for emerging legal challenges including blockchain law, AI regulations, and sustainability requirements. Create future-ready legal frameworks.',
'[
    "Assess emerging legal challenges for your industry",
    "Create future-ready legal framework and adaptation procedures",
    "Set up emerging law monitoring and update systems",
    "Establish legal innovation and adaptation procedures",
    "Create long-term legal strategy and evolution planning"
]'::jsonb,
'[
    "Emerging Legal Challenges Assessment",
    "Future-Ready Legal Framework Design",
    "Emerging Law Monitoring System",
    "Legal Innovation and Adaptation Guide",
    "Long-Term Legal Strategy Planning Framework"
]'::jsonb, 90, 150, 45, NOW(), NOW())

ON CONFLICT (id) DO UPDATE SET
    "moduleId" = EXCLUDED."moduleId",
    day = EXCLUDED.day,
    title = EXCLUDED.title,
    "briefContent" = EXCLUDED."briefContent",
    "actionItems" = EXCLUDED."actionItems",
    resources = EXCLUDED.resources,
    "estimatedTime" = EXCLUDED."estimatedTime",
    "xpReward" = EXCLUDED."xpReward",
    "orderIndex" = EXCLUDED."orderIndex",
    "updatedAt" = NOW();

-- Verify the data
SELECT 
    p.code,
    p.title,
    p.price,
    COUNT(DISTINCT m.id) as actual_modules,
    COUNT(DISTINCT l.id) as total_lessons
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P5'
GROUP BY p.code, p.title, p.price;

COMMIT;