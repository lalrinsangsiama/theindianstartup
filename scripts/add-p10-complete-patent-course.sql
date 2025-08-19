-- P10: Patent Mastery for Indian Startups - Complete Course Creation
-- This script creates a comprehensive 60-lesson patent mastery course with 12 modules

-- Insert the P10 product (premium pricing for advanced IP course)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p10_patent_mastery',
  'P10',
  'Patent Mastery for Indian Startups',
  'Master intellectual property from filing to monetization. 60-day comprehensive course covering patent strategy, prosecution, portfolio management, and commercialization with 100+ templates and expert guidance.',
  7999,
  false,
  60,
  NOW(),
  NOW()
);

-- Module 1: Patent Fundamentals & IP Landscape (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m1_fundamentals',
  'p10_patent_mastery',
  'Patent Fundamentals & IP Landscape',
  'Master the intellectual property ecosystem, understand different types of IP protection, and learn the economic value of patents for startups',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons (Days 1-5)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l1_ip_ecosystem',
  'p10_m1_fundamentals',
  1,
  'Understanding Intellectual Property Ecosystem',
  'Comprehensive overview of IP types: Patents vs Trademarks vs Copyrights vs Trade Secrets. Learn when to choose which protection, global IP conventions (TRIPS, Paris Convention), and Indian Patent Act evolution.',
  '["Map your startup''s IP assets", "Choose appropriate IP protection for each asset", "Understand economic value potential", "Create IP protection timeline"]',
  '["IP Asset Mapping Template", "Protection Type Selection Guide", "Economic Valuation Framework", "Global IP Convention Summary"]',
  120,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p10_l2_patentability_criteria',
  'p10_m1_fundamentals',
  2,
  'What Can and Cannot Be Patented',
  'Master patentability criteria: Novelty, Inventive Step, Industrial Application. Navigate Section 3 exclusions, software patent strategies in India, AI/ML patent approaches, and common rejection reasons.',
  '["Assess your invention''s patentability", "Identify Section 3 exclusion risks", "Develop software patent strategy", "Create patent rejection mitigation plan"]',
  '["Patentability Assessment Framework", "Section 3 Exclusions Checklist", "Software Patent Strategy Guide", "AI/ML Patent Template"]',
  120,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p10_l3_application_types',
  'p10_m1_fundamentals',
  3,
  'Types of Patent Applications',
  'Navigate different application types: Provisional vs Complete specifications, Convention applications, PCT National Phase, Divisional applications, and strategic filing approaches.',
  '["Choose optimal application type", "Plan filing timeline", "Understand priority strategies", "Create divisional application roadmap"]',
  '["Application Type Decision Matrix", "Filing Timeline Planner", "Priority Strategy Guide", "Divisional Application Templates"]',
  120,
  150,
  3,
  NOW(),
  NOW()
),
(
  'p10_l4_patent_lifecycle',
  'p10_m1_fundamentals',
  4,
  'Patent Lifecycle & Timelines',
  'Understand the complete 20-year patent journey: priority dates, publication rules, examination timelines, opposition windows, renewal schedules, and strategic lifecycle management.',
  '["Create patent lifecycle timeline", "Plan renewal strategy", "Understand opposition risks", "Set up monitoring systems"]',
  '["Patent Lifecycle Timeline", "Renewal Strategy Calculator", "Opposition Monitoring System", "Lifecycle Management Dashboard"]',
  120,
  150,
  4,
  NOW(),
  NOW()
),
(
  'p10_l5_patent_intelligence',
  'p10_m1_fundamentals',
  5,
  'Building Patent Intelligence',
  'Master patent searching, databases (IPAIRS, Google Patents, Espacenet), Freedom to Operate analysis, prior art searching, competitor tracking, and technology landscape analysis.',
  '["Conduct comprehensive patent search", "Perform FTO analysis", "Set up competitor monitoring", "Create technology landscape map"]',
  '["Patent Search Guide", "FTO Analysis Template", "Competitor Monitoring Setup", "Technology Landscape Tools"]',
  120,
  150,
  5,
  NOW(),
  NOW()
);

-- Module 2: Pre-Filing Strategy & Preparation (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m2_prefiling',
  'p10_patent_mastery',
  'Pre-Filing Strategy & Preparation',
  'Develop invention disclosure systems, conduct patentability assessments, master patent drafting basics, and create comprehensive filing preparation strategies',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons (Days 6-10)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l6_invention_disclosure',
  'p10_m2_prefiling',
  6,
  'Invention Disclosure & Documentation',
  'Establish robust invention documentation systems: inventor notebooks, digital documentation, invention disclosure forms, co-inventor determination, and IP assignment protocols.',
  '["Set up invention notebook system", "Create disclosure forms", "Establish documentation protocols", "Implement IP assignment process"]',
  '["Invention Notebook Templates", "Digital Documentation System", "Disclosure Form Library", "IP Assignment Templates"]',
  120,
  160,
  1,
  NOW(),
  NOW()
),
(
  'p10_l7_patentability_assessment',
  'p10_m2_prefiling',
  7,
  'Patentability Assessment',
  'Conduct DIY prior art searches, read and understand patents, prepare claim charts, evaluate novelty and inventive step, and create comprehensive patentability opinions.',
  '["Perform prior art search", "Create claim charts", "Assess novelty and inventive step", "Write patentability opinion"]',
  '["Prior Art Search Toolkit", "Claim Chart Templates", "Novelty Assessment Framework", "Patentability Opinion Format"]',
  120,
  160,
  2,
  NOW(),
  NOW()
),
(
  'p10_l8_patent_drafting',
  'p10_m2_prefiling',
  8,
  'Patent Drafting Basics',
  'Master patent application anatomy: title crafting, abstract writing, background section, summary of invention, and detailed description requirements for strong applications.',
  '["Draft patent title", "Write compelling abstract", "Create background section", "Develop detailed description"]',
  '["Patent Drafting Template", "Title Crafting Guide", "Abstract Writing Framework", "Description Writing Checklist"]',
  120,
  160,
  3,
  NOW(),
  NOW()
),
(
  'p10_l9_claims_mastery',
  'p10_m2_prefiling',
  9,
  'Claims - The Heart of Patents',
  'Master claim types (Product, Process, Use), independent vs dependent claims, claim drafting strategies, broad vs narrow balance, and software claim approaches.',
  '["Draft independent claims", "Create dependent claim strategy", "Balance broad vs narrow scope", "Develop software claims"]',
  '["Claim Drafting Templates", "Independent Claim Guide", "Dependent Claim Strategy", "Software Claim Examples"]',
  120,
  160,
  4,
  NOW(),
  NOW()
),
(
  'p10_l10_drawings_specs',
  'p10_m2_prefiling',
  10,
  'Drawings and Specifications',
  'Create patent-quality drawings, flowcharts, block diagrams, sequence listings, chemical structures, and understand reference numeral systems and common rejections.',
  '["Create patent drawings", "Develop flowcharts", "Design block diagrams", "Set up reference numeral system"]',
  '["Patent Drawing Software Guide", "Flowchart Templates", "Block Diagram Examples", "Drawing Rejection Prevention"]',
  120,
  160,
  5,
  NOW(),
  NOW()
);

-- Module 3: Filing Process Mastery (Days 11-16)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m3_filing',
  'p10_patent_mastery',
  'Filing Process Mastery',
  'Navigate jurisdiction selection, master Indian Patent Office procedures, understand forms and documentation, leverage startup benefits, and develop international filing strategies',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons (Days 11-16)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l11_jurisdiction_strategy',
  'p10_m3_filing',
  11,
  'Choosing Where to File',
  'Develop filing strategies: India-first vs US-first, important jurisdictions analysis, cost-benefit analysis, market-based decisions, and budget allocation strategies.',
  '["Analyze target jurisdictions", "Conduct cost-benefit analysis", "Create filing priority list", "Allocate filing budget"]',
  '["Jurisdiction Analysis Matrix", "Cost-Benefit Calculator", "Filing Priority Framework", "Budget Allocation Tool"]',
  120,
  170,
  1,
  NOW(),
  NOW()
),
(
  'p10_l12_indian_patent_office',
  'p10_m3_filing',
  12,
  'Indian Patent Office Navigation',
  'Master the four patent offices (Delhi, Mumbai, Chennai, Kolkata), jurisdiction determination, e-filing system, fee structures, and documentation requirements.',
  '["Determine optimal office", "Master e-filing system", "Calculate fees accurately", "Prepare documentation"]',
  '["Patent Office Comparison", "E-Filing Step-by-Step Guide", "Fee Calculator", "Documentation Checklist"]',
  120,
  170,
  2,
  NOW(),
  NOW()
),
(
  'p10_l13_forms_documentation',
  'p10_m3_filing',
  13,
  'Forms and Documentation Deep Dive',
  'Master all patent forms: Form 1, Form 2, Form 3, Form 5, priority documents, power of attorney, assignments, and small entity benefits.',
  '["Complete all required forms", "Prepare priority documents", "Create power of attorney", "Claim small entity benefits"]',
  '["Patent Forms Library", "Priority Document Guide", "Power of Attorney Templates", "Small Entity Benefit Guide"]',
  120,
  170,
  3,
  NOW(),
  NOW()
),
(
  'p10_l14_filing_workshop',
  'p10_m3_filing',
  14,
  'Practical Filing Workshop',
  'Hands-on e-filing demonstration, common error solutions, document formatting, fee calculations, receipt handling, and priority claim procedures.',
  '["Complete practice filing", "Handle common errors", "Format documents correctly", "Process receipts properly"]',
  '["E-Filing Demo Video", "Error Solution Guide", "Document Format Templates", "Receipt Processing Checklist"]',
  120,
  170,
  4,
  NOW(),
  NOW()
),
(
  'p10_l15_startup_benefits',
  'p10_m3_filing',
  15,
  'Startup Benefits & Schemes',
  'Leverage Startup India patent scheme (80% fee reduction), SIPP facilitator program, expedited examination, state schemes, and various benefit programs.',
  '["Apply for startup benefits", "Claim fee reductions", "Request expedited examination", "Access state schemes"]',
  '["Startup Benefits Guide", "Fee Reduction Calculator", "Expedited Examination Criteria", "State Schemes Directory"]',
  120,
  170,
  5,
  NOW(),
  NOW()
),
(
  'p10_l16_international_filing',
  'p10_m3_filing',
  16,
  'International Filing Strategies',
  'Navigate PCT routes, direct filing vs PCT, priority rights management, translation requirements, national phase strategies, and cost optimization.',
  '["Choose PCT vs direct filing", "Manage priority rights", "Plan translations", "Optimize international costs"]',
  '["PCT vs Direct Filing Matrix", "Priority Rights Manager", "Translation Cost Calculator", "International Filing Planner"]',
  120,
  170,
  6,
  NOW(),
  NOW()
);

-- Module 4: Prosecution & Examination (Days 17-22)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m4_prosecution',
  'p10_patent_mastery',
  'Prosecution & Examination',
  'Master the examination process, responding to office actions, handling common rejections, advanced prosecution strategies, opposition proceedings, and grant procedures',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons (Days 17-22)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l17_examination_process',
  'p10_m4_prosecution',
  17,
  'Examination Process',
  'Understand examination timelines, First Examination Report (FER), types of objections, examiner interview strategies, and third-party observations.',
  '["Request examination strategically", "Analyze FER thoroughly", "Prepare examiner interview", "Monitor third-party observations"]',
  '["Examination Timeline Planner", "FER Analysis Framework", "Examiner Interview Guide", "Third-Party Observation Monitor"]',
  120,
  180,
  1,
  NOW(),
  NOW()
),
(
  'p10_l18_office_actions',
  'p10_m4_prosecution',
  18,
  'Responding to Office Actions',
  'Master response drafting strategies, claim amendment tactics, argument structuring, prior art distinction, and response timeline management.',
  '["Draft comprehensive response", "Amend claims strategically", "Structure persuasive arguments", "Manage response timelines"]',
  '["Response Drafting Templates", "Claim Amendment Guide", "Argument Structure Framework", "Timeline Management Tool"]',
  120,
  180,
  2,
  NOW(),
  NOW()
),
(
  'p10_l19_common_rejections',
  'p10_m4_prosecution',
  19,
  'Common Rejections & Solutions',
  'Handle Section 3(k) software rejections, lack of novelty responses, inventive step arguments, industrial applicability issues, and claim clarity problems.',
  '["Address software rejections", "Argue novelty effectively", "Demonstrate inventive step", "Clarify industrial applicability"]',
  '["Rejection Response Library", "Novelty Argument Templates", "Inventive Step Framework", "Clarity Enhancement Guide"]',
  120,
  180,
  3,
  NOW(),
  NOW()
),
(
  'p10_l20_advanced_prosecution',
  'p10_m4_prosecution',
  20,
  'Advanced Prosecution Strategies',
  'Master examiner interviews, divisional application timing, claim amendment strategies, prosecution history estoppel, and appeal procedures.',
  '["Conduct examiner interviews", "Time divisional applications", "Plan claim amendments", "Prepare appeal strategies"]',
  '["Interview Preparation Guide", "Divisional Timing Tool", "Amendment Strategy Framework", "Appeal Procedure Manual"]',
  120,
  180,
  4,
  NOW(),
  NOW()
),
(
  'p10_l21_opposition_proceedings',
  'p10_m4_prosecution',
  21,
  'Opposition Proceedings',
  'Navigate pre-grant and post-grant opposition, document preparation, evidence submission, expert witness management, and hearing preparation.',
  '["Prepare opposition documents", "Submit compelling evidence", "Manage expert witnesses", "Prepare for hearings"]',
  '["Opposition Document Templates", "Evidence Submission Guide", "Expert Witness Management", "Hearing Preparation Checklist"]',
  120,
  180,
  5,
  NOW(),
  NOW()
),
(
  'p10_l22_grant_procedures',
  'p10_m4_prosecution',
  22,
  'Grant and Post-Grant Procedures',
  'Handle patent grant publication, certificate issuance, post-grant amendments, error corrections, reissue procedures, and maintenance strategies.',
  '["Process grant publication", "Obtain certificates", "Plan post-grant amendments", "Set up maintenance schedule"]',
  '["Grant Processing Checklist", "Certificate Management", "Amendment Planning Tool", "Maintenance Calendar"]',
  120,
  180,
  6,
  NOW(),
  NOW()
);

-- Module 5: Patent Portfolio Management (Days 23-27)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m5_portfolio',
  'p10_patent_mastery',
  'Patent Portfolio Management',
  'Build comprehensive patent strategies, conduct patent landscaping, optimize portfolios, establish IP governance, and implement analytics and intelligence systems',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons (Days 23-27)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l23_patent_strategy',
  'p10_m5_portfolio',
  23,
  'Building a Patent Strategy',
  'Develop offensive vs defensive strategies, core technology protection, patent thickets, white space identification, and portfolio valuation methods.',
  '["Create patent strategy", "Identify core technologies", "Build patent thickets", "Value patent portfolio"]',
  '["Patent Strategy Framework", "Core Technology Map", "Patent Thicket Guide", "Portfolio Valuation Tool"]',
  120,
  190,
  1,
  NOW(),
  NOW()
),
(
  'p10_l24_patent_landscaping',
  'p10_m5_portfolio',
  24,
  'Patent Landscaping',
  'Master technology domain mapping, competitor analysis, white space analysis, citation networks, inventor tracking, and trend identification.',
  '["Map technology domains", "Analyze competitors", "Identify white spaces", "Track key inventors"]',
  '["Technology Mapping Tools", "Competitor Analysis Framework", "White Space Identifier", "Inventor Tracking System"]',
  120,
  190,
  2,
  NOW(),
  NOW()
),
(
  'p10_l25_portfolio_optimization',
  'p10_m5_portfolio',
  25,
  'Portfolio Optimization',
  'Implement patent pruning strategies, maintenance fee decisions, geographic coverage review, claim scope optimization, and ROI measurement.',
  '["Prune patent portfolio", "Optimize maintenance fees", "Review geographic coverage", "Measure portfolio ROI"]',
  '["Patent Pruning Framework", "Maintenance Fee Calculator", "Geographic Coverage Tool", "ROI Measurement System"]',
  120,
  190,
  3,
  NOW(),
  NOW()
),
(
  'p10_l26_ip_governance',
  'p10_m5_portfolio',
  26,
  'IP Governance',
  'Establish IP policies, invention disclosure systems, review committees, decision frameworks, budget allocation, and board reporting structures.',
  '["Create IP policy", "Set up disclosure system", "Establish review committee", "Design decision frameworks"]',
  '["IP Policy Templates", "Disclosure System Setup", "Review Committee Guide", "Decision Framework Tools"]',
  120,
  190,
  4,
  NOW(),
  NOW()
),
(
  'p10_l27_patent_analytics',
  'p10_m5_portfolio',
  27,
  'Patent Analytics & Intelligence',
  'Master patent databases, analytics tools, competitive intelligence, technology forecasting, M&A due diligence, and innovation metrics.',
  '["Set up analytics tools", "Build competitive intelligence", "Forecast technology trends", "Prepare M&A due diligence"]',
  '["Analytics Tools Guide", "Competitive Intelligence Framework", "Technology Forecasting Model", "Due Diligence Checklist"]',
  120,
  190,
  5,
  NOW(),
  NOW()
);

-- Module 6: Commercialization & Monetization (Days 28-33)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m6_commercialization',
  'p10_patent_mastery',
  'Commercialization & Monetization',
  'Master patent valuation methods, licensing strategies, sales and acquisitions, strategic partnerships, assertion and defense, and revenue generation models',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons (Days 28-33)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l28_patent_valuation',
  'p10_m6_commercialization',
  28,
  'Patent Valuation Methods',
  'Master cost, market, and income approaches, real options valuation, relief from royalty, industry standards, valuation for funding, and tax implications.',
  '["Value patents using multiple methods", "Apply real options approach", "Calculate relief from royalty", "Consider tax implications"]',
  '["Valuation Method Comparison", "Real Options Calculator", "Royalty Relief Model", "Tax Implication Guide"]',
  120,
  200,
  1,
  NOW(),
  NOW()
),
(
  'p10_l29_licensing_strategies',
  'p10_m6_commercialization',
  29,
  'Licensing Strategies',
  'Develop exclusive vs non-exclusive strategies, field of use restrictions, geographic limitations, royalty structures, and technology transfer approaches.',
  '["Design licensing strategy", "Set royalty structures", "Create licensing agreements", "Plan technology transfer"]',
  '["Licensing Strategy Framework", "Royalty Structure Calculator", "Licensing Agreement Templates", "Technology Transfer Guide"]',
  120,
  200,
  2,
  NOW(),
  NOW()
),
(
  'p10_l30_patent_sales',
  'p10_m6_commercialization',
  30,
  'Patent Sales & Acquisitions',
  'Navigate patent broker engagement, valuation for sale, due diligence preparation, purchase agreements, and tax optimization strategies.',
  '["Engage patent brokers", "Prepare for due diligence", "Negotiate purchase agreements", "Optimize tax implications"]',
  '["Broker Engagement Guide", "Due Diligence Preparation", "Purchase Agreement Templates", "Tax Optimization Strategies"]',
  120,
  200,
  3,
  NOW(),
  NOW()
),
(
  'p10_l31_strategic_partnerships',
  'p10_m6_commercialization',
  31,
  'Strategic Partnerships',
  'Structure joint development agreements, IP ownership structures, cross-licensing deals, patent pools, and defensive publication strategies.',
  '["Structure joint developments", "Define IP ownership", "Create cross-licensing deals", "Join patent pools"]',
  '["Joint Development Templates", "IP Ownership Structures", "Cross-Licensing Framework", "Patent Pool Guide"]',
  120,
  200,
  4,
  NOW(),
  NOW()
),
(
  'p10_l32_assertion_defense',
  'p10_m6_commercialization',
  32,
  'Patent Assertion & Defense',
  'Conduct infringement analysis, send cease and desist letters, develop negotiation strategies, understand litigation basics, and explore settlement frameworks.',
  '["Analyze infringement", "Draft cease and desist", "Develop negotiation strategy", "Explore settlement options"]',
  '["Infringement Analysis Tool", "Cease and Desist Templates", "Negotiation Strategy Guide", "Settlement Framework"]',
  120,
  200,
  5,
  NOW(),
  NOW()
),
(
  'p10_l33_revenue_models',
  'p10_m6_commercialization',
  33,
  'Revenue Generation Models',
  'Explore direct product protection, licensing revenue streams, patent sale strategies, assertion programs, and defensive aggregator approaches.',
  '["Identify revenue opportunities", "Build licensing streams", "Plan patent sales", "Consider assertion programs"]',
  '["Revenue Model Comparison", "Licensing Stream Builder", "Patent Sale Planner", "Assertion Program Guide"]',
  120,
  200,
  6,
  NOW(),
  NOW()
);

-- Module 7: Industry-Specific Strategies (Days 34-38)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m7_industry_specific',
  'p10_patent_mastery',
  'Industry-Specific Strategies',
  'Master patent strategies for software & AI, biotech & pharma, hardware & electronics, FinTech & business methods, and traditional industries',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons (Days 34-38)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l34_software_ai',
  'p10_m7_industry_specific',
  34,
  'Software & AI Patents',
  'Master algorithm patenting, technical effect requirements, hardware claims inclusion, GUI patents, AI/ML claim drafting, and SaaS patent strategies.',
  '["Develop software patent strategy", "Draft AI/ML claims", "Include hardware elements", "Create GUI patent applications"]',
  '["Software Patent Strategy", "AI/ML Claim Templates", "Hardware Integration Guide", "GUI Patent Examples"]',
  120,
  210,
  1,
  NOW(),
  NOW()
),
(
  'p10_l35_biotech_pharma',
  'p10_m7_industry_specific',
  35,
  'Biotech & Pharma Patents',
  'Navigate compound patents, method of treatment, formulation patents, biosimilar strategies, Section 3(d) navigation, and regulatory exclusivity.',
  '["Patent pharmaceutical compounds", "Handle treatment methods", "Navigate Section 3(d)", "Plan biosimilar strategies"]',
  '["Pharma Patent Strategy", "Treatment Method Guide", "Section 3(d) Navigation", "Biosimilar Framework"]',
  120,
  210,
  2,
  NOW(),
  NOW()
),
(
  'p10_l36_hardware_electronics',
  'p10_m7_industry_specific',
  36,
  'Hardware & Electronics',
  'Develop system claims, component patents, standard essential patents, design patents integration, and IoT patent strategies.',
  '["Create system claims", "Patent key components", "Develop SEP strategy", "Integrate design patents"]',
  '["Hardware Patent Strategy", "System Claim Templates", "SEP Development Guide", "IoT Patent Framework"]',
  120,
  210,
  3,
  NOW(),
  NOW()
),
(
  'p10_l37_fintech_business',
  'p10_m7_industry_specific',
  37,
  'FinTech & Business Methods',
  'Focus on technical solutions, system architecture claims, blockchain patents, payment systems, security features, and regulatory compliance.',
  '["Develop FinTech patent strategy", "Patent blockchain innovations", "Protect payment systems", "Ensure regulatory compliance"]',
  '["FinTech Patent Strategy", "Blockchain Patent Guide", "Payment System Templates", "Compliance Framework"]',
  120,
  210,
  4,
  NOW(),
  NOW()
),
(
  'p10_l38_traditional_industries',
  'p10_m7_industry_specific',
  38,
  'Traditional Industries',
  'Cover mechanical inventions, chemical processes, material science, manufacturing methods, agricultural technology, and construction innovations.',
  '["Patent mechanical innovations", "Protect chemical processes", "Cover manufacturing methods", "Patent agricultural tech"]',
  '["Traditional Industry Guide", "Mechanical Patent Templates", "Chemical Process Framework", "Manufacturing Patent Strategy"]',
  120,
  210,
  5,
  NOW(),
  NOW()
);

-- Module 8: International Patent Strategy (Days 39-43)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m8_international',
  'p10_patent_mastery',
  'International Patent Strategy',
  'Master global filing strategies, major jurisdiction practices, translation and localization, international enforcement, and treaty navigation',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons (Days 39-43)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l39_global_filing',
  'p10_m8_international',
  39,
  'Global Filing Strategies',
  'Master PCT system, national phase decisions, EP validation strategies, US continuation practice, China filing tactics, and budget optimization.',
  '["Plan global filing strategy", "Optimize PCT route", "Plan national phases", "Allocate international budget"]',
  '["Global Filing Strategy", "PCT Optimization Guide", "National Phase Planner", "International Budget Tool"]',
  120,
  220,
  1,
  NOW(),
  NOW()
),
(
  'p10_l40_major_jurisdictions',
  'p10_m8_international',
  40,
  'Major Jurisdiction Deep Dive',
  'Navigate USPTO practices, EPO approaches, CNIPA strategies, JPO requirements, IP5 harmonization, and prosecution highways.',
  '["Master USPTO practices", "Navigate EPO procedures", "Understand CNIPA requirements", "Leverage prosecution highways"]',
  '["USPTO Practice Guide", "EPO Navigation Manual", "CNIPA Strategy Framework", "Prosecution Highway Tool"]',
  120,
  220,
  2,
  NOW(),
  NOW()
),
(
  'p10_l41_translation_localization',
  'p10_m8_international',
  41,
  'Translation & Localization',
  'Handle translation requirements, certified translation, technical terminology, claim accuracy, cost management, and quality control.',
  '["Plan translation strategy", "Ensure claim accuracy", "Manage translation costs", "Control translation quality"]',
  '["Translation Strategy Guide", "Terminology Management", "Cost Management Tool", "Quality Control Checklist"]',
  120,
  220,
  3,
  NOW(),
  NOW()
),
(
  'p10_l42_international_enforcement',
  'p10_m8_international',
  42,
  'International Enforcement',
  'Navigate multi-jurisdiction litigation, ITC proceedings, customs enforcement, parallel imports, and online enforcement strategies.',
  '["Plan multi-jurisdiction strategy", "Understand ITC proceedings", "Set up customs enforcement", "Handle online infringement"]',
  '["Multi-Jurisdiction Guide", "ITC Proceedings Manual", "Customs Enforcement Setup", "Online Enforcement Tools"]',
  120,
  220,
  4,
  NOW(),
  NOW()
),
(
  'p10_l43_treaties_conventions',
  'p10_m8_international',
  43,
  'Treaties & Conventions',
  'Navigate Paris Convention benefits, PCT advantages, Madrid Protocol, Hague Agreement, Budapest Treaty, and bilateral agreements.',
  '["Leverage treaty benefits", "Understand PCT advantages", "Use international agreements", "Navigate bilateral treaties"]',
  '["Treaty Benefits Guide", "PCT Advantage Analysis", "International Agreement Navigator", "Bilateral Treaty Framework"]',
  120,
  220,
  5,
  NOW(),
  NOW()
);

-- Module 9: Cost Management & Funding (Days 44-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m9_cost_funding',
  'p10_patent_mastery',
  'Cost Management & Funding',
  'Master complete cost breakdown analysis and explore funding opportunities including government grants, schemes, and alternative funding sources',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons (Days 44-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l44_cost_breakdown',
  'p10_m9_cost_funding',
  44,
  'Complete Cost Breakdown',
  'Analyze government fees, attorney costs, translation expenses, maintenance fees, international filing costs, prosecution expenses, and enforcement budgets.',
  '["Calculate total patent costs", "Analyze fee structures", "Plan prosecution budgets", "Estimate enforcement costs"]',
  '["Patent Cost Calculator", "Fee Structure Analysis", "Budget Planning Tool", "Cost Optimization Guide"]',
  120,
  230,
  1,
  NOW(),
  NOW()
),
(
  'p10_l45_funding_support',
  'p10_m9_cost_funding',
  45,
  'Funding & Support',
  'Access government grants (BIRAC, DST), state schemes, MSME support, venture debt for IP, IP-backed loans, and international support programs.',
  '["Apply for government grants", "Access state schemes", "Explore IP-backed loans", "Find international support"]',
  '["Government Grant Guide", "State Schemes Directory", "IP Loan Framework", "International Support Programs"]',
  120,
  230,
  2,
  NOW(),
  NOW()
);

-- Module 10: Litigation & Disputes (Days 46-50)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m10_litigation',
  'p10_patent_mastery',
  'Litigation & Disputes',
  'Master patent litigation processes, court procedures, evidence collection, expert witnesses, damages calculation, and settlement strategies',
  10,
  NOW(),
  NOW()
);

-- Module 10 Lessons (Days 46-50)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l46_litigation_process',
  'p10_m10_litigation',
  46,
  'Patent Litigation Process',
  'Navigate patent litigation procedures, court selection strategies, case preparation, pleading requirements, and litigation timelines.',
  '["Understand litigation process", "Select optimal court", "Prepare case strategy", "Plan litigation timeline"]',
  '["Litigation Process Guide", "Court Selection Framework", "Case Preparation Checklist", "Timeline Planning Tool"]',
  120,
  240,
  1,
  NOW(),
  NOW()
),
(
  'p10_l47_evidence_collection',
  'p10_m10_litigation',
  47,
  'Evidence Collection',
  'Master evidence gathering, document discovery, technical evidence preparation, prior art collection, and evidence preservation strategies.',
  '["Collect relevant evidence", "Conduct document discovery", "Prepare technical evidence", "Preserve evidence properly"]',
  '["Evidence Collection Guide", "Discovery Framework", "Technical Evidence Prep", "Evidence Preservation Tools"]',
  120,
  240,
  2,
  NOW(),
  NOW()
),
(
  'p10_l48_expert_witnesses',
  'p10_m10_litigation',
  48,
  'Expert Witnesses',
  'Select and manage expert witnesses, prepare expert reports, conduct expert depositions, and present expert testimony effectively.',
  '["Select expert witnesses", "Prepare expert reports", "Conduct depositions", "Present expert testimony"]',
  '["Expert Selection Guide", "Report Preparation Framework", "Deposition Preparation", "Testimony Presentation Tools"]',
  120,
  240,
  3,
  NOW(),
  NOW()
),
(
  'p10_l49_damages_calculation',
  'p10_m10_litigation',
  49,
  'Damages Calculation',
  'Calculate patent damages, lost profits analysis, reasonable royalty determination, willful infringement implications, and enhanced damages.',
  '["Calculate patent damages", "Analyze lost profits", "Determine reasonable royalty", "Assess willful infringement"]',
  '["Damages Calculator", "Lost Profits Analysis", "Royalty Determination Tool", "Willfulness Assessment"]',
  120,
  240,
  4,
  NOW(),
  NOW()
),
(
  'p10_l50_settlement_strategies',
  'p10_m10_litigation',
  50,
  'Settlement Strategies',
  'Develop settlement negotiation strategies, licensing agreements, cross-licensing deals, and alternative dispute resolution approaches.',
  '["Develop settlement strategy", "Negotiate licensing deals", "Explore cross-licensing", "Use alternative dispute resolution"]',
  '["Settlement Strategy Framework", "Licensing Negotiation Guide", "Cross-Licensing Templates", "ADR Process Guide"]',
  120,
  240,
  5,
  NOW(),
  NOW()
);

-- Module 11: Advanced Prosecution (Days 51-55)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m11_advanced_prosecution',
  'p10_patent_mastery',
  'Advanced Prosecution',
  'Master complex response strategies, appeal procedures, IPAB processes, writ petitions, and international prosecution coordination',
  11,
  NOW(),
  NOW()
);

-- Module 11 Lessons (Days 51-55)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l51_complex_responses',
  'p10_m11_advanced_prosecution',
  51,
  'Complex Response Strategies',
  'Develop sophisticated response strategies for complex objections, multi-reference rejections, and challenging prosecution scenarios.',
  '["Analyze complex objections", "Develop response strategies", "Handle multi-reference rejections", "Navigate challenging scenarios"]',
  '["Complex Response Framework", "Multi-Reference Strategy", "Objection Analysis Tool", "Prosecution Strategy Guide"]',
  120,
  250,
  1,
  NOW(),
  NOW()
),
(
  'p10_l52_appeal_procedures',
  'p10_m11_advanced_prosecution',
  52,
  'Appeal Brief Writing',
  'Master appeal brief writing, argument structuring, legal precedent citation, and appellate strategy development.',
  '["Write appeal briefs", "Structure legal arguments", "Cite relevant precedents", "Develop appellate strategy"]',
  '["Appeal Brief Templates", "Argument Structure Guide", "Precedent Citation Tool", "Appellate Strategy Framework"]',
  120,
  250,
  2,
  NOW(),
  NOW()
),
(
  'p10_l53_ipab_procedures',
  'p10_m11_advanced_prosecution',
  53,
  'IPAB Procedures',
  'Navigate Intellectual Property Appellate Board procedures, hearing preparation, evidence submission, and decision implementation.',
  '["Understand IPAB procedures", "Prepare for hearings", "Submit evidence effectively", "Implement IPAB decisions"]',
  '["IPAB Procedure Guide", "Hearing Preparation Checklist", "Evidence Submission Framework", "Decision Implementation Tool"]',
  120,
  250,
  3,
  NOW(),
  NOW()
),
(
  'p10_l54_writ_petitions',
  'p10_m11_advanced_prosecution',
  54,
  'Writ Petitions',
  'Understand writ petition procedures, high court jurisdiction, petition drafting, and constitutional law applications in patent cases.',
  '["Understand writ procedures", "Draft effective petitions", "Navigate high court jurisdiction", "Apply constitutional law"]',
  '["Writ Petition Guide", "Petition Drafting Templates", "Jurisdiction Framework", "Constitutional Law Applications"]',
  120,
  250,
  4,
  NOW(),
  NOW()
),
(
  'p10_l55_international_coordination',
  'p10_m11_advanced_prosecution',
  55,
  'International Prosecution Coordination',
  'Coordinate prosecution across multiple jurisdictions, manage prosecution highways, synchronize arguments, and optimize global strategies.',
  '["Coordinate global prosecution", "Use prosecution highways", "Synchronize arguments", "Optimize global strategies"]',
  '["Global Coordination Guide", "Prosecution Highway Tool", "Argument Synchronization", "Global Strategy Optimizer"]',
  120,
  250,
  5,
  NOW(),
  NOW()
);

-- Module 12: Emerging Technologies (Days 56-60)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p10_m12_emerging_tech',
  'p10_patent_mastery',
  'Emerging Technologies',
  'Master patent strategies for cutting-edge technologies including quantum computing, gene editing, autonomous vehicles, and Web3 technologies',
  12,
  NOW(),
  NOW()
);

-- Module 12 Lessons (Days 56-60)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p10_l56_quantum_computing',
  'p10_m12_emerging_tech',
  56,
  'Quantum Computing Patents',
  'Develop patent strategies for quantum computing innovations, quantum algorithms, hardware implementations, and quantum software applications.',
  '["Patent quantum innovations", "Protect quantum algorithms", "Cover hardware implementations", "Patent quantum software"]',
  '["Quantum Patent Strategy", "Algorithm Protection Guide", "Hardware Patent Framework", "Software Application Templates"]',
  120,
  260,
  1,
  NOW(),
  NOW()
),
(
  'p10_l57_gene_editing',
  'p10_m12_emerging_tech',
  57,
  'Gene Editing (CRISPR)',
  'Navigate gene editing patent landscape, CRISPR technology patents, therapeutic applications, and ethical considerations in biotechnology patents.',
  '["Understand gene editing patents", "Navigate CRISPR landscape", "Patent therapeutic applications", "Address ethical considerations"]',
  '["Gene Editing Patent Guide", "CRISPR Landscape Analysis", "Therapeutic Patent Framework", "Ethics Consideration Checklist"]',
  120,
  260,
  2,
  NOW(),
  NOW()
),
(
  'p10_l58_autonomous_vehicles',
  'p10_m12_emerging_tech',
  58,
  'Autonomous Vehicles',
  'Patent autonomous vehicle technologies, AI-driven systems, sensor technologies, safety systems, and transportation innovations.',
  '["Patent AV technologies", "Protect AI systems", "Cover sensor innovations", "Patent safety systems"]',
  '["Autonomous Vehicle Patents", "AI System Protection", "Sensor Technology Guide", "Safety System Framework"]',
  120,
  260,
  3,
  NOW(),
  NOW()
),
(
  'p10_l59_space_technology',
  'p10_m12_emerging_tech',
  59,
  'Space Technology',
  'Develop space technology patent strategies, satellite innovations, space exploration technologies, and commercial space applications.',
  '["Patent space technologies", "Protect satellite innovations", "Cover exploration tech", "Patent commercial applications"]',
  '["Space Technology Patents", "Satellite Innovation Guide", "Exploration Tech Framework", "Commercial Space Templates"]',
  120,
  260,
  4,
  NOW(),
  NOW()
),
(
  'p10_l60_web3_technologies',
  'p10_m12_emerging_tech',
  60,
  'Web3 Technologies',
  'Navigate Web3 patent strategies, blockchain innovations beyond fintech, NFT technologies, decentralized systems, and metaverse applications.',
  '["Develop Web3 strategy", "Patent blockchain innovations", "Protect NFT technologies", "Cover metaverse applications"]',
  '["Web3 Patent Strategy", "Blockchain Innovation Guide", "NFT Technology Framework", "Metaverse Application Templates"]',
  120,
  260,
  5,
  NOW(),
  NOW()
);

-- Verification query
SELECT 
  p.code,
  p.title,
  p.price,
  COUNT(DISTINCT m.id) as module_count,
  COUNT(l.id) as lesson_count,
  SUM(l."xpReward") as total_xp
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P10'
GROUP BY p.id, p.code, p.title, p.price;

-- Expected result:
-- code: P10
-- title: Patent Mastery for Indian Startups
-- price: 7999
-- module_count: 12
-- lesson_count: 60
-- total_xp: 12750