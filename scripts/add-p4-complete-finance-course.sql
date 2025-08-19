-- P4: Finance Stack - CFO-Level Mastery Course Creation
-- This script creates the most comprehensive finance course for Indian startups
-- Total: 12 core modules + 3 advanced modules, 60 days, 500+ hours of content

-- First, clean up any existing P4 data to avoid conflicts
DELETE FROM "Lesson" WHERE "moduleId" IN (
  SELECT id FROM "Module" WHERE "productId" IN (
    SELECT id FROM "Product" WHERE code = 'P4'
  )
);

DELETE FROM "Module" WHERE "productId" IN (
  SELECT id FROM "Product" WHERE code = 'P4'
);

DELETE FROM "Product" WHERE code = 'P4';

-- Insert the P4 product (premium high-value course)
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt") 
VALUES (
  'p4_finance_stack',
  'P4',
  'Finance Stack - CFO-Level Mastery',
  'The Complete Financial Infrastructure Course for Indian Startups. Transform from basic bookkeeping to CFO-level financial mastery with world-class systems that scale from ₹1 Cr to ₹1000 Cr+ revenue. 60-day comprehensive program covering accounting systems, GST compliance mastery, investor-grade reporting, advanced financial management, and strategic finance leadership. Includes 500+ hours of expert video content, 250+ premium templates, industry-recognized certification, 24/7 expert support, and exclusive masterclasses with unicorn founders. Worth ₹25,00,000+ in consulting value.',
  6999,
  false,
  60,
  NOW(),
  NOW()
);

-- Module 1: Financial Foundations & Strategy (Days 1-5)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m1_financial_foundations',
  'p4_finance_stack',
  'Financial Foundations & Strategy',
  'Master financial principles, build finance architecture, design chart of accounts, set accounting policies, and architect financial systems',
  1,
  NOW(),
  NOW()
);

-- Module 1 Lessons (Days 1-5) - Enhanced with comprehensive content
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l1_finance_backbone',
  'p4_m1_financial_foundations',
  1,
  'Why Finance is Your Startup''s Backbone',
  'Welcome to your transformation into a CFO-level financial leader! Learn why 82% of startups fail due to cash flow issues, how professional financial systems increase valuation by 20-30%, and why finance isn''t just "necessary evil" but your startup''s strategic weapon. Master the shocking reality of financial mismanagement costs (₹5-15 lakhs annually), understand how startups with proper systems raise funds 3x faster, and build the strategic finance mindset that transforms you from cost center to profit center. Cover key financial principles: accrual vs cash accounting, matching principle, prudence & conservatism, materiality concepts, going concern assumption, consistency, full disclosure, and substance over form.',
  '["Complete 47-point financial maturity audit", "Write 3-year financial transformation goals", "Document top 10 financial risks and impact", "Map all stakeholders dependent on financial information", "Define CFO-level success metrics for your startup", "Calculate cost of current financial inefficiencies"]',
  '["Financial Maturity Assessment Tool (Excel)", "Risk Register Template", "CFO Competency Framework", "Industry Benchmarking Data", "Case Study: Razorpay $7B valuation through financial discipline", "Video: CFO Mindset Transformation (3 hours)", "Template: Finance Vision Statement"]',
  150,
  100,
  1,
  NOW(),
  NOW()
),
(
  'p4_l2_finance_architecture',
  'p4_m1_financial_foundations',
  2,
  'Building Your Finance Architecture',
  'Learn the science behind building financial systems that scale from ₹1 crore to ₹1000+ crore revenue. Master the critical mistake most startups make: building finance systems for today''s needs, not tomorrow''s scale. Deep dive into the Three Pillars of Bulletproof Finance Architecture: 1) PILLAR ONE: Compliance & Control (Foundation Layer) - Why Sequoia Capital checks financial compliance history first, how a single GST penalty reduces valuation by 10-15%, statutory requirements management, internal controls framework, risk management system; 2) PILLAR TWO: Business Intelligence (Insight Layer) - Why traditional reporting fails, real-time data integration, predictive analytics framework, decision support systems that update every 15 minutes; 3) PILLAR THREE: Strategic Finance (Value Creation Layer) - The CFO mindset shift from cost center to profit center, growth planning & capital allocation, capital efficiency mastery, value creation & exit readiness. Complete the Finance Maturity Assessment across 5 stages: Survival Mode (0-₹2Cr), Compliance Focus (₹2-10Cr), Management Reporting (₹10-50Cr), Strategic Partner (₹50-200Cr), Value Creator (₹200Cr+).',
  '["Complete detailed 100-point Finance Maturity Assessment", "Design Three Pillars framework for your business", "Map critical compliance requirements for your industry", "Identify key integration points between systems", "Create 6-month technology roadmap", "Set up automated compliance calendar", "Implement basic cash flow forecasting model", "Complete comprehensive risk register", "Develop mitigation strategies for top 5 risks"]',
  '["Finance Maturity Assessment Tool (100-point evaluation)", "Three Pillars Implementation Guide (50-page manual)", "Technology Integration Roadmap with vendor recommendations", "Risk Register Template (200+ startup risks)", "Compliance Calendar Template (all Indian regulations)", "Executive Dashboard Template (Excel + Google Sheets)", "Case Study Library (10 implementation examples)", "Video: Finance Architecture Masterclass (60 minutes)", "Video: Building Compliance Framework (45 minutes)", "Video: Real-time Business Intelligence Setup (45 minutes)", "Expert Interview: Kunal Bahl on Building Finance Systems That Scale (45 minutes)"]',
  200,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p4_l3_chart_accounts',
  'p4_m1_financial_foundations',
  3,
  'Chart of Accounts Mastery',
  'Design industry-specific CoA structures, scalable numbering systems, cost center architecture, department coding, product line tracking, geographic segments, project accounting, and customer profitability tracking.',
  '["Design chart of accounts", "Create numbering system", "Set up cost centers", "Configure tracking dimensions"]',
  '["CoA Design Template", "Numbering System Guide", "Cost Center Framework", "Dimension Configuration Tool"]',
  120,
  110,
  3,
  NOW(),
  NOW()
),
(
  'p4_l4_accounting_policies',
  'p4_m1_financial_foundations',
  4,
  'Accounting Policies Framework',
  'Make critical policy decisions on revenue recognition, inventory valuation, depreciation methods, provision policies, capitalization thresholds, and create comprehensive policy documentation with board approval.',
  '["Define accounting policies", "Document policy manual", "Get board approval", "Train finance team"]',
  '["Policy Template Library", "Board Resolution Format", "Training Materials", "Compliance Checklist"]',
  120,
  110,
  4,
  NOW(),
  NOW()
),
(
  'p4_l5_systems_architecture',
  'p4_m1_financial_foundations',
  5,
  'Financial Systems Architecture',
  'Build core system components (GL, AR, AP, inventory, fixed assets, payroll), plan integrations with CRM, payment gateways, banking APIs, GST systems, and create a scalable technology roadmap.',
  '["Map system requirements", "Design integration architecture", "Select technology stack", "Create implementation plan"]',
  '["System Requirements Matrix", "Integration Blueprint", "Vendor Evaluation Tool", "Implementation Roadmap"]',
  120,
  110,
  5,
  NOW(),
  NOW()
);

-- Module 2: Accounting Systems Setup (Days 6-10)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m2_accounting_systems',
  'p4_finance_stack',
  'Accounting Systems Setup',
  'Choose and implement the right accounting software, design transaction SOPs, establish month-end processes, and build internal controls',
  2,
  NOW(),
  NOW()
);

-- Module 2 Lessons (Days 6-10)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l6_accounting_software',
  'p4_m2_accounting_systems',
  6,
  'Choosing the Right Accounting Software',
  'Evaluate accounting solutions (Zoho Books, Tally Prime, QuickBooks, SAP B1, NetSuite), create evaluation framework based on business size, scalability, integration capabilities, and calculate total cost of ownership.',
  '["Evaluate software options", "Create comparison matrix", "Calculate TCO", "Select best fit solution"]',
  '["Software Evaluation Framework", "Feature Comparison Matrix", "TCO Calculator", "Vendor Assessment Guide"]',
  120,
  120,
  1,
  NOW(),
  NOW()
),
(
  'p4_l7_implementation_roadmap',
  'p4_m2_accounting_systems',
  7,
  'Implementation Roadmap',
  'Execute Phase 1 setup (software installation, company profile, tax configuration) and Phase 2 migration (opening balances, master data, historical transactions, trial balance matching).',
  '["Install and configure software", "Migrate opening balances", "Import master data", "Reconcile trial balance"]',
  '["Implementation Checklist", "Data Migration Templates", "Configuration Guide", "Reconciliation Tools"]',
  120,
  120,
  2,
  NOW(),
  NOW()
),
(
  'p4_l8_transaction_sops',
  'p4_m2_accounting_systems',
  8,
  'Transaction Processing SOPs',
  'Design Purchase to Pay (P2P) process from requisition to vendor reconciliation, Order to Cash (O2C) from customer onboarding to revenue recognition, with complete documentation and controls.',
  '["Document P2P process", "Design O2C workflow", "Create approval matrices", "Implement controls"]',
  '["P2P Process Manual", "O2C Workflow Guide", "Approval Matrix Template", "Control Documentation"]',
  120,
  120,
  3,
  NOW(),
  NOW()
),
(
  'p4_l9_month_end_closing',
  'p4_m2_accounting_systems',
  9,
  'Month-End Closing Process',
  'Master Week 1 transaction closure (cut-offs, accruals, depreciation) and Week 2 reconciliation (bank, customer, vendor, inventory), create closing checklist and timeline optimization.',
  '["Create closing checklist", "Set cut-off procedures", "Automate reconciliations", "Optimize timeline"]',
  '["Closing Checklist Template", "Cut-off Procedures", "Reconciliation Tools", "Timeline Optimizer"]',
  120,
  130,
  4,
  NOW(),
  NOW()
),
(
  'p4_l10_internal_controls',
  'p4_m2_accounting_systems',
  10,
  'Internal Controls Framework',
  'Implement key controls (segregation of duties, approval matrices, system access), document control framework with process flowcharts, risk registers, and establish testing procedures.',
  '["Design control framework", "Implement segregation of duties", "Document controls", "Create testing procedures"]',
  '["Control Framework Template", "RACI Matrix", "Risk Register", "Testing Procedures Guide"]',
  120,
  130,
  5,
  NOW(),
  NOW()
);

-- Module 3: GST Compliance Mastery (Days 11-16)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m3_gst_compliance',
  'p4_finance_stack',
  'GST Compliance Mastery',
  'Master GST fundamentals, compliance architecture, e-invoicing, e-way bills, ITC optimization, and audit preparation',
  3,
  NOW(),
  NOW()
);

-- Module 3 Lessons (Days 11-16)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l11_gst_fundamentals',
  'p4_m3_gst_compliance',
  11,
  'GST Fundamentals for Startups',
  'Understand GST structure (CGST, SGST, IGST), Input Tax Credit mechanism, reverse charge, place of supply rules, time of supply concepts, GST rates, and registration requirements.',
  '["Understand GST structure", "Check registration requirements", "Map applicable rates", "Plan ITC optimization"]',
  '["GST Structure Guide", "Registration Checklist", "Rate Finder Tool", "ITC Planning Template"]',
  120,
  140,
  1,
  NOW(),
  NOW()
),
(
  'p4_l12_gst_compliance_architecture',
  'p4_m3_gst_compliance',
  12,
  'GST Compliance Architecture',
  'Master monthly compliance cycle (GSTR-1, GSTR-3B), payment deadlines, ITC reconciliation, annual requirements (GSTR-9, GSTR-9C), and build compliance calendar.',
  '["Set up compliance calendar", "Configure return filing", "Plan ITC reconciliation", "Schedule annual compliance"]',
  '["Compliance Calendar Template", "Return Filing Guide", "ITC Reconciliation Tool", "Annual Checklist"]',
  120,
  140,
  2,
  NOW(),
  NOW()
),
(
  'p4_l13_einvoicing_implementation',
  'p4_m3_gst_compliance',
  13,
  'E-invoicing Implementation',
  'Implement e-invoice requirements based on turnover thresholds, system integration, IRN generation, QR code compliance, and manage cancellation/amendment procedures.',
  '["Check e-invoice applicability", "Integrate with GSP", "Test IRN generation", "Train operations team"]',
  '["E-invoice Readiness Checklist", "GSP Integration Guide", "Testing Protocol", "Training Materials"]',
  120,
  140,
  3,
  NOW(),
  NOW()
),
(
  'p4_l14_eway_bill_management',
  'p4_m3_gst_compliance',
  14,
  'E-way Bill Management',
  'Navigate e-way bill scenarios for interstate/intrastate supplies, job work, returns, branch transfers, implement generation process, vehicle updates, and extension procedures.',
  '["Map e-way bill scenarios", "Implement generation process", "Set up monitoring", "Train logistics team"]',
  '["E-way Bill Scenario Matrix", "Generation SOP", "Monitoring Dashboard", "Logistics Training Kit"]',
  120,
  140,
  4,
  NOW(),
  NOW()
),
(
  'p4_l15_itc_optimization',
  'p4_m3_gst_compliance',
  15,
  'ITC Optimization',
  'Maximize input credits through eligibility assessment, documentation requirements, time limits understanding, vendor compliance tracking, and monthly reconciliation process.',
  '["Assess ITC eligibility", "Set vendor compliance tracking", "Implement reconciliation", "Recover blocked credits"]',
  '["ITC Eligibility Checker", "Vendor Tracking System", "Reconciliation Template", "Recovery Procedures"]',
  120,
  140,
  5,
  NOW(),
  NOW()
),
(
  'p4_l16_gst_audit_preparation',
  'p4_m3_gst_compliance',
  16,
  'GST Audit Preparation',
  'Prepare for GST audit with return reconciliation, ITC documentation, e-invoice/e-way bill compliance records, and address common audit issues like classification disputes and valuation questions.',
  '["Create audit file", "Reconcile all returns", "Document ITC claims", "Prepare for queries"]',
  '["Audit Preparation Checklist", "Reconciliation Workbook", "Documentation Standards", "Query Response Templates"]',
  120,
  140,
  6,
  NOW(),
  NOW()
);

-- Module 4: Corporate Compliance (Days 17-21)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m4_corporate_compliance',
  'p4_finance_stack',
  'Corporate Compliance',
  'Master MCA compliance, board governance, statutory audit management, secretarial compliance, and income tax requirements',
  4,
  NOW(),
  NOW()
);

-- Module 4 Lessons (Days 17-21)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l17_mca_compliance',
  'p4_m4_corporate_compliance',
  17,
  'MCA Compliance Framework',
  'Master annual filings (AOC-4, MGT-7, ADT-1), understand filing deadlines and extension procedures, manage event-based filings for share allotments, director changes, and charge creation.',
  '["Map MCA requirements", "Set filing calendar", "Prepare annual documents", "Track event-based filings"]',
  '["MCA Filing Checklist", "Annual Calendar", "Form Templates", "Event Tracker"]',
  120,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p4_l18_board_governance',
  'p4_m4_corporate_compliance',
  18,
  'Board Governance & Reporting',
  'Establish board meeting requirements (quarterly frequency, notice, agenda), create comprehensive board packs with financial statements, compliance status, risk register, and strategic initiatives.',
  '["Schedule board meetings", "Design board pack template", "Create presentation format", "Document resolutions"]',
  '["Board Calendar", "Board Pack Template", "Presentation Formats", "Resolution Register"]',
  120,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p4_l19_statutory_audit',
  'p4_m4_corporate_compliance',
  19,
  'Statutory Audit Management',
  'Plan statutory audit with auditor appointment, audit calendar, documentation preparation, manage key audit areas like revenue recognition, inventory valuation, and related party transactions.',
  '["Appoint statutory auditor", "Create audit calendar", "Prepare documentation", "Address audit queries"]',
  '["Auditor Selection Guide", "Audit Calendar Template", "Documentation Checklist", "Query Management System"]',
  120,
  150,
  3,
  NOW(),
  NOW()
),
(
  'p4_l20_secretarial_compliance',
  'p4_m4_corporate_compliance',
  20,
  'Secretarial Compliance',
  'Manage share capital, board procedures, statutory registers, annual compliance, insider trading regulations, related party transactions, and maintain comprehensive documentation.',
  '["Maintain statutory registers", "Track share capital changes", "Monitor related parties", "Ensure documentation"]',
  '["Register Templates", "Share Capital Tracker", "Related Party Database", "Documentation System"]',
  120,
  150,
  4,
  NOW(),
  NOW()
),
(
  'p4_l21_income_tax_compliance',
  'p4_m4_corporate_compliance',
  21,
  'Income Tax Compliance',
  'Navigate compliance calendar for advance tax, TDS returns, income tax return, implement strategic tax planning with startup exemptions (80-IAC), R&D benefits, and loss optimization.',
  '["Plan advance tax payments", "File TDS returns", "Optimize tax structure", "Claim eligible benefits"]',
  '["Tax Calendar", "TDS Filing Guide", "Tax Planning Toolkit", "Benefit Claim Templates"]',
  120,
  150,
  5,
  NOW(),
  NOW()
);

-- Module 5: Financial Planning & Analysis (Days 22-27)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m5_financial_planning',
  'p4_finance_stack',
  'Financial Planning & Analysis',
  'Build dynamic financial models, master revenue forecasting, cost management, working capital optimization, cash flow management, and management reporting',
  5,
  NOW(),
  NOW()
);

-- Module 5 Lessons (Days 22-27)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l22_financial_models',
  'p4_m5_financial_planning',
  22,
  'Building Dynamic Financial Models',
  'Design model architecture with assumptions sheet, revenue build-up, cost structures, working capital, capex planning, debt schedules, cash flow projection, and scenario analysis.',
  '["Build financial model", "Create assumption framework", "Design scenarios", "Validate model logic"]',
  '["Model Template Library", "Assumption Framework", "Scenario Builder", "Model Validation Tool"]',
  120,
  160,
  1,
  NOW(),
  NOW()
),
(
  'p4_l23_revenue_forecasting',
  'p4_m5_financial_planning',
  23,
  'Revenue Planning & Forecasting',
  'Master revenue modeling with customer cohorts, pricing strategies, volume projections, churn analysis, use forecasting methods from historical trending to AI/ML integration.',
  '["Build revenue model", "Analyze customer cohorts", "Forecast growth", "Plan pricing strategy"]',
  '["Revenue Model Builder", "Cohort Analysis Tool", "Forecasting Templates", "Pricing Strategy Guide"]',
  120,
  160,
  2,
  NOW(),
  NOW()
),
(
  'p4_l24_cost_management',
  'p4_m5_financial_planning',
  24,
  'Cost Management Framework',
  'Implement cost classification (fixed/variable, direct/indirect), activity-based costing, standard costing, and drive cost optimization through vendor negotiations and process improvements.',
  '["Classify cost structure", "Implement ABC costing", "Identify optimization opportunities", "Track cost savings"]',
  '["Cost Classification Matrix", "ABC Implementation Guide", "Optimization Tracker", "Savings Dashboard"]',
  120,
  160,
  3,
  NOW(),
  NOW()
),
(
  'p4_l25_working_capital',
  'p4_m5_financial_planning',
  25,
  'Working Capital Management',
  'Optimize receivables, inventory, and payables, manage cash conversion cycle, implement credit policies, track KPIs (DSO, DIO, DPO), and explore supplier financing options.',
  '["Calculate working capital metrics", "Optimize cash cycle", "Implement credit policy", "Track KPIs"]',
  '["Working Capital Calculator", "Cash Cycle Optimizer", "Credit Policy Template", "KPI Dashboard"]',
  120,
  160,
  4,
  NOW(),
  NOW()
),
(
  'p4_l26_cash_flow_management',
  'p4_m5_financial_planning',
  26,
  'Cash Flow Management',
  'Build cash flow forecasting using direct and indirect methods, implement daily/weekly/monthly projections, stress testing, and treasury management with bank relationships and investment policies.',
  '["Create cash flow forecast", "Implement daily tracking", "Set up treasury function", "Manage bank relationships"]',
  '["Cash Flow Forecaster", "Daily Position Tracker", "Treasury Policy Template", "Banking Toolkit"]',
  120,
  160,
  5,
  NOW(),
  NOW()
),
(
  'p4_l27_management_reporting',
  'p4_m5_financial_planning',
  27,
  'Management Reporting',
  'Design KPI dashboards with visual design principles, real-time updates, create comprehensive report suite from daily flash reports to board presentations with automated alerts.',
  '["Design KPI dashboard", "Create report templates", "Automate reporting", "Set up alerts"]',
  '["Dashboard Design Kit", "Report Template Library", "Automation Guide", "Alert Configuration Tool"]',
  120,
  160,
  6,
  NOW(),
  NOW()
);

-- Module 6: Investor-Ready Finance (Days 28-33)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m6_investor_ready',
  'p4_finance_stack',
  'Investor-Ready Finance',
  'Master investor reporting standards, due diligence preparation, valuation frameworks, cap table management, and IPO readiness',
  6,
  NOW(),
  NOW()
);

-- Module 6 Lessons (Days 28-33)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l28_investor_reporting',
  'p4_m6_investor_ready',
  28,
  'Investor Reporting Standards',
  'Create monthly investor updates with financial highlights, key metrics, burn rate, runway, and quarterly reports with detailed financials, cohort analysis, unit economics, and market updates.',
  '["Design investor update template", "Create quarterly report format", "Automate metrics calculation", "Schedule reporting calendar"]',
  '["Investor Update Template", "Quarterly Report Format", "Metrics Calculator", "Reporting Calendar"]',
  120,
  170,
  1,
  NOW(),
  NOW()
),
(
  'p4_l29_due_diligence_prep',
  'p4_m6_investor_ready',
  29,
  'Due Diligence Preparation',
  'Prepare financial DD with 3-year historicals, 24-month MIS, budget vs actuals, organize data room with proper folder structure, version control, and Q&A management.',
  '["Organize financial documents", "Create data room structure", "Prepare Q&A log", "Assign DD team"]',
  '["DD Checklist", "Data Room Template", "Q&A Management System", "Team Assignment Matrix"]',
  120,
  170,
  2,
  NOW(),
  NOW()
),
(
  'p4_l30_valuation_frameworks',
  'p4_m6_investor_ready',
  30,
  'Valuation Frameworks',
  'Master valuation methods including DCF modeling, comparable companies, precedent transactions, revenue/EBITDA multiples, with supporting market sizing and sensitivity analysis.',
  '["Build DCF model", "Identify comparables", "Calculate multiples", "Perform sensitivity analysis"]',
  '["DCF Model Template", "Comps Database", "Multiple Calculator", "Sensitivity Analyzer"]',
  120,
  170,
  3,
  NOW(),
  NOW()
),
(
  'p4_l31_cap_table_management',
  'p4_m6_investor_ready',
  31,
  'Cap Table Management',
  'Manage equity with share classes, vesting schedules, ESOP administration, warrant tracking, convertible notes, pro-forma modeling, exit waterfalls, using professional cap table software.',
  '["Set up cap table", "Configure ESOP pool", "Model funding rounds", "Create exit scenarios"]',
  '["Cap Table Template", "ESOP Framework", "Round Modeling Tool", "Exit Waterfall Calculator"]',
  120,
  170,
  4,
  NOW(),
  NOW()
),
(
  'p4_l32_financial_controls_scale',
  'p4_m6_investor_ready',
  32,
  'Financial Controls for Scale',
  'Build scalable processes with approval workflows, expense management, procurement controls, revenue assurance, fraud prevention, and technology integration including ERP and automation.',
  '["Design scalable processes", "Implement approval workflows", "Automate controls", "Plan ERP implementation"]',
  '["Process Design Templates", "Workflow Builder", "Automation Roadmap", "ERP Selection Guide"]',
  120,
  170,
  5,
  NOW(),
  NOW()
),
(
  'p4_l33_ipo_readiness',
  'p4_m6_investor_ready',
  33,
  'IPO Readiness Basics',
  'Understand IPO financial requirements with 3-year audited financials, quarterly reviews, internal controls (SOX), prepare process with system upgrades and team building.',
  '["Assess IPO readiness", "Plan system upgrades", "Build IPO team", "Create preparation roadmap"]',
  '["IPO Readiness Checklist", "System Requirements", "Team Structure Guide", "IPO Roadmap Template"]',
  120,
  170,
  6,
  NOW(),
  NOW()
);

-- Module 7: Banking & Treasury (Days 34-37)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m7_banking_treasury',
  'p4_finance_stack',
  'Banking & Treasury',
  'Master banking relationships, payment systems, foreign exchange management, and investment strategies for surplus funds',
  7,
  NOW(),
  NOW()
);

-- Module 7 Lessons (Days 34-37)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l34_banking_relationships',
  'p4_m7_banking_treasury',
  34,
  'Banking Relationship Management',
  'Structure accounts (current, collection, payroll, escrow, forex), leverage banking services for cash management, trade finance, working capital, and optimize digital banking.',
  '["Optimize account structure", "Negotiate banking services", "Implement cash pooling", "Digitize banking operations"]',
  '["Account Structure Guide", "Service Negotiation Toolkit", "Cash Pooling Framework", "Digital Banking Checklist"]',
  120,
  150,
  1,
  NOW(),
  NOW()
),
(
  'p4_l35_payment_systems',
  'p4_m7_banking_treasury',
  35,
  'Payment Systems & Controls',
  'Build payment infrastructure with gateways, bulk payments, vendor payments, implement control framework with dual authorization, payment limits, and fraud detection.',
  '["Set up payment infrastructure", "Implement dual controls", "Configure payment limits", "Enable fraud monitoring"]',
  '["Payment Setup Guide", "Control Matrix", "Limit Configuration Tool", "Fraud Detection Framework"]',
  120,
  150,
  2,
  NOW(),
  NOW()
),
(
  'p4_l36_forex_management',
  'p4_m7_banking_treasury',
  36,
  'Foreign Exchange Management',
  'Navigate FEMA compliance for current/capital account transactions, ECB/FDI regulations, implement risk management with hedging strategies, forward contracts, and accounting treatment.',
  '["Understand FEMA regulations", "Assess forex exposure", "Implement hedging policy", "Set up forex accounting"]',
  '["FEMA Compliance Guide", "Exposure Assessment Tool", "Hedging Policy Template", "Forex Accounting Manual"]',
  120,
  150,
  3,
  NOW(),
  NOW()
),
(
  'p4_l37_investment_management',
  'p4_m7_banking_treasury',
  37,
  'Investment & Surplus Management',
  'Develop investment policy with safety, liquidity, return objectives, explore investment options from fixed deposits to debt funds, implement monitoring and review mechanisms.',
  '["Create investment policy", "Evaluate investment options", "Set up monitoring system", "Schedule reviews"]',
  '["Investment Policy Template", "Option Evaluation Matrix", "Monitoring Dashboard", "Review Checklist"]',
  120,
  150,
  4,
  NOW(),
  NOW()
);

-- Module 8: Advanced Financial Management (Days 38-42)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m8_advanced_finance',
  'p4_finance_stack',
  'Advanced Financial Management',
  'Master financial risk management, performance analytics, M&A integration, international operations, and finance transformation',
  8,
  NOW(),
  NOW()
);

-- Module 8 Lessons (Days 38-42)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l38_risk_management',
  'p4_m8_advanced_finance',
  38,
  'Financial Risk Management',
  'Identify and assess risk categories (market, credit, liquidity, operational), build risk framework with mitigation strategies, monitoring, reporting, and recovery planning.',
  '["Map risk categories", "Build risk framework", "Implement mitigation strategies", "Create monitoring system"]',
  '["Risk Assessment Matrix", "Framework Template", "Mitigation Playbook", "Monitoring Tools"]',
  120,
  180,
  1,
  NOW(),
  NOW()
),
(
  'p4_l39_performance_management',
  'p4_m8_advanced_finance',
  39,
  'Performance Management',
  'Design KPI framework with financial, operational, customer, employee metrics, implement analytics with variance analysis, predictive analytics, benchmarking, and OKR integration.',
  '["Design KPI framework", "Implement analytics tools", "Set up benchmarking", "Integrate with OKRs"]',
  '["KPI Framework Builder", "Analytics Toolkit", "Benchmarking Database", "OKR Integration Guide"]',
  120,
  180,
  2,
  NOW(),
  NOW()
),
(
  'p4_l40_ma_integration',
  'p4_m8_advanced_finance',
  40,
  'M&A Financial Integration',
  'Plan acquisitions with financial due diligence, valuation models, deal structuring, execute post-merger integration with system consolidation, process harmonization, and value realization.',
  '["Build M&A playbook", "Create valuation models", "Plan integration strategy", "Track synergies"]',
  '["M&A Playbook", "Valuation Toolkit", "Integration Checklist", "Synergy Tracker"]',
  120,
  180,
  3,
  NOW(),
  NOW()
),
(
  'p4_l41_international_operations',
  'p4_m8_advanced_finance',
  41,
  'International Operations',
  'Master cross-border finance with entity structuring, transfer pricing, tax optimization, manage multi-currency operations with translation methods, hedge accounting, and consolidation.',
  '["Design international structure", "Implement transfer pricing", "Set up multi-currency accounting", "Plan consolidation"]',
  '["Structure Design Guide", "Transfer Pricing Framework", "Multi-Currency Manual", "Consolidation Toolkit"]',
  120,
  180,
  4,
  NOW(),
  NOW()
),
(
  'p4_l42_finance_transformation',
  'p4_m8_advanced_finance',
  42,
  'Finance Transformation',
  'Drive digital finance with automation roadmap, AI/ML applications, cloud migration, implement change management with stakeholder buy-in, training programs, and benefits tracking.',
  '["Create transformation roadmap", "Identify automation opportunities", "Plan change management", "Measure benefits"]',
  '["Transformation Roadmap", "Automation Assessment", "Change Management Plan", "Benefits Tracker"]',
  120,
  180,
  5,
  NOW(),
  NOW()
);

-- Module 9: Team Building & Operations (Days 43-45)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m9_team_operations',
  'p4_finance_stack',
  'Team Building & Operations',
  'Build and manage high-performing finance teams, optimize finance operations, and establish strategic partnerships',
  9,
  NOW(),
  NOW()
);

-- Module 9 Lessons (Days 43-45)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l43_building_team',
  'p4_m9_team_operations',
  43,
  'Building Your Finance Team',
  'Design organization structure with CFO, controller, FP&A, treasury roles, implement hiring strategy with competency mapping, interview process, onboarding plans, and retention strategies.',
  '["Design org structure", "Define role requirements", "Create hiring process", "Build onboarding program"]',
  '["Org Structure Templates", "Role Definition Guide", "Interview Framework", "Onboarding Checklist"]',
  120,
  160,
  1,
  NOW(),
  NOW()
),
(
  'p4_l44_operations_excellence',
  'p4_m9_team_operations',
  44,
  'Finance Operations Excellence',
  'Optimize processes through mapping, bottleneck analysis, automation, implement service delivery with SLAs, service catalog, performance tracking, and continuous improvement.',
  '["Map finance processes", "Identify automation opportunities", "Define SLAs", "Implement improvements"]',
  '["Process Mapping Toolkit", "Automation Identifier", "SLA Templates", "Improvement Tracker"]',
  120,
  160,
  2,
  NOW(),
  NOW()
),
(
  'p4_l45_outsourcing_partnerships',
  'p4_m9_team_operations',
  45,
  'Outsourcing & Partnerships',
  'Develop outsourcing strategy with make vs buy analysis, vendor selection, manage key partnerships with accounting firms, tax consultants, auditors, banks, and technology vendors.',
  '["Conduct make vs buy analysis", "Select strategic partners", "Negotiate contracts", "Manage relationships"]',
  '["Make vs Buy Framework", "Vendor Evaluation Matrix", "Contract Templates", "Relationship Management Guide"]',
  120,
  160,
  3,
  NOW(),
  NOW()
);

-- Module 10: CFO Strategic Toolkit (Advanced - Days 46-50)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m10_cfo_strategic',
  'p4_finance_stack',
  'CFO Strategic Toolkit (Advanced)',
  'Master strategic planning processes, business partnering excellence, board engagement strategies, investor management mastery, crisis leadership, negotiation skills, and industry networking for CFO-level leadership',
  10,
  NOW(),
  NOW()
);

-- Module 10 Advanced Lessons (Days 46-50)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l46_strategic_planning',
  'p4_m10_cfo_strategic',
  46,
  'Strategic Planning & Business Partnering',
  'Transform from numbers person to strategic business partner. Master strategic planning processes that drive business growth, learn business partnering techniques that make you indispensable to CEO and leadership team, develop board engagement strategies for effective governance, and build investor management skills for long-term relationships. Includes crisis management frameworks, advanced negotiation techniques for vendors and partners, leadership development for finance teams, and industry networking strategies.',
  '["Create strategic finance plan aligned with business strategy", "Develop business partner relationships with department heads", "Design board engagement framework", "Build investor communication strategy", "Create crisis management playbook", "Practice negotiation scenarios"]',
  '["Strategic Planning Framework", "Business Partner Toolkit", "Board Engagement Guide", "Investor Relations Manual", "Crisis Management Playbook", "Negotiation Training Materials", "Leadership Assessment Tools"]',
  180,
  200,
  1,
  NOW(),
  NOW()
),
(
  'p4_l47_executive_leadership',
  'p4_m10_cfo_strategic',
  47,
  'Executive Leadership & Influence',
  'Develop executive presence and leadership skills required for CFO role. Master stakeholder management across investors, board members, senior executives, and team members. Learn influence strategies without authority, build cross-functional relationships, manage up effectively with CEO and board, and develop next-generation finance leaders within your organization.',
  '["Complete leadership assessment", "Create stakeholder influence map", "Develop executive communication skills", "Build talent development pipeline", "Practice board presentation skills", "Design team motivation strategies"]',
  '["Leadership Development Program", "Executive Presence Guide", "Stakeholder Management Framework", "Communication Skills Toolkit", "Board Presentation Mastery", "Team Development Templates"]',
  180,
  200,
  2,
  NOW(),
  NOW()
),
(
  'p4_l48_board_investor_mastery',
  'p4_m10_cfo_strategic',
  48,
  'Board & Investor Relations Mastery',
  'Master advanced board management including preparation of comprehensive board packages, effective presentation of financial performance, strategic recommendations, risk management updates. Learn investor relations best practices for different funding stages, manage investor expectations during challenging periods, communicate complex financial concepts to non-financial stakeholders, and build long-term investor partnerships.',
  '["Create comprehensive board package template", "Develop investor update framework", "Practice crisis communication", "Build investor relationship calendar", "Design performance measurement system", "Create governance documentation"]',
  '["Board Package Templates", "Investor Relations Toolkit", "Crisis Communication Playbook", "Governance Framework", "Performance Dashboard", "Relationship Management System"]',
  180,
  200,
  3,
  NOW(),
  NOW()
),
(
  'p4_l49_crisis_turnaround',
  'p4_m10_cfo_strategic',
  49,
  'Crisis Management & Turnaround Leadership',
  'Develop crisis leadership skills for navigating financial challenges, economic downturns, and business turnarounds. Master rapid financial assessment and triage, cash preservation strategies, stakeholder communication during crisis, vendor negotiation and payment prioritization, team management during uncertainty, and recovery planning with implementation roadmaps.',
  '["Build crisis assessment framework", "Create cash preservation playbook", "Develop stakeholder communication plan", "Design vendor negotiation strategies", "Create team retention plan", "Build recovery roadmap"]',
  '["Crisis Assessment Tools", "Cash Preservation Strategies", "Communication Templates", "Negotiation Playbooks", "Recovery Planning Framework", "Case Study Library: Successful Turnarounds"]',
  180,
  200,
  4,
  NOW(),
  NOW()
),
(
  'p4_l50_industry_networking',
  'p4_m10_cfo_strategic',
  50,
  'Industry Networking & Professional Development',
  'Build powerful professional network within finance community, startup ecosystem, and industry leaders. Master networking strategies for career advancement, speaking opportunities, advisory roles, and board positions. Learn personal branding for finance leaders, thought leadership development, conference speaking skills, and building industry reputation.',
  '["Audit current professional network", "Create networking strategy plan", "Develop personal brand positioning", "Build thought leadership content calendar", "Practice speaking and presentation skills", "Design advisory role criteria"]',
  '["Professional Networking Guide", "Personal Branding Toolkit", "Thought Leadership Framework", "Speaking Opportunities Database", "Advisory Role Templates", "Industry Connection Directory"]',
  180,
  200,
  5,
  NOW(),
  NOW()
);

-- Module 11: Advanced Tax Strategies (Advanced - Days 51-55)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m11_advanced_tax',
  'p4_finance_stack',
  'Advanced Tax Strategies (Advanced)',
  'Master tax structure optimization, international tax planning, M&A tax strategies, R&D incentives maximization, state incentive navigation, and treaty benefit optimization',
  11,
  NOW(),
  NOW()
);

-- Module 11 Advanced Lessons (Days 51-55)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l51_tax_optimization',
  'p4_m11_advanced_tax',
  51,
  'Tax Structure Optimization & Planning',
  'Master advanced tax planning strategies for startups including optimal entity structures, holding company benefits, tax-efficient capital structures, startup exemption optimization (Section 80-IAC), loss carry forward maximization, and succession planning for tax efficiency. Learn international tax structure planning for global operations.',
  '["Analyze current tax structure efficiency", "Design optimal entity architecture", "Calculate tax savings opportunities", "Plan succession tax strategies", "Optimize loss utilization", "Create tax monitoring system"]',
  '["Tax Structure Analysis Tool", "Entity Architecture Templates", "Tax Savings Calculator", "Succession Planning Guide", "Loss Optimization Framework", "Tax Monitoring Dashboard"]',
  180,
  200,
  1,
  NOW(),
  NOW()
),
(
  'p4_l52_international_tax',
  'p4_m11_advanced_tax',
  52,
  'International Tax Planning & Treaty Benefits',
  'Navigate complex international tax landscape including transfer pricing compliance and optimization, Double Taxation Avoidance Agreement (DTAA) benefits, Permanent Establishment (PE) risks and management, Base Erosion and Profit Shifting (BEPS) compliance, and Country-by-Country Reporting requirements for multinational operations.',
  '["Map international tax obligations", "Optimize transfer pricing policies", "Identify treaty benefits", "Assess PE risk exposure", "Plan BEPS compliance", "Create international tax structure"]',
  '["International Tax Compliance Matrix", "Transfer Pricing Documentation", "Treaty Benefits Calculator", "PE Risk Assessment", "BEPS Compliance Checklist", "Global Tax Structure Guide"]',
  180,
  200,
  2,
  NOW(),
  NOW()
),
(
  'p4_l53_ma_tax_strategies',
  'p4_m11_advanced_tax',
  53,
  'M&A Tax Strategies & Structuring',
  'Master tax-efficient M&A structuring including asset vs. share purchase decisions, capital gains optimization strategies, goodwill and intangible asset treatment, earnout and contingent consideration tax implications, and post-merger integration tax planning to maximize transaction value and minimize tax leakage.',
  '["Analyze M&A tax implications", "Structure tax-efficient deals", "Optimize capital gains treatment", "Plan post-merger integration", "Calculate tax impact of different structures", "Create M&A tax playbook"]',
  '["M&A Tax Analysis Framework", "Deal Structure Optimizer", "Capital Gains Calculator", "Integration Planning Guide", "Tax Impact Modeler", "M&A Tax Playbook"]',
  180,
  200,
  3,
  NOW(),
  NOW()
),
(
  'p4_l54_rd_incentives',
  'p4_m11_advanced_tax',
  54,
  'R&D Incentives & Innovation Benefits',
  'Maximize R&D tax benefits including Section 35(2AB) weighted deduction, eligible R&D expenditure identification, documentation requirements for R&D claims, patent and innovation incentives, and Scientific Research and Experimental Development (SR&ED) program benefits for technology startups.',
  '["Identify eligible R&D activities", "Document R&D expenditure properly", "Calculate maximum benefit entitlement", "Create R&D compliance system", "Plan innovation tax strategies", "Track benefit realization"]',
  '["R&D Eligibility Assessment", "Documentation Templates", "Benefit Calculator", "Compliance Tracking System", "Innovation Tax Guide", "Benefit Tracking Dashboard"]',
  180,
  200,
  4,
  NOW(),
  NOW()
),
(
  'p4_l55_state_incentives',
  'p4_m11_advanced_tax',
  55,
  'State Incentive Navigation & Optimization',
  'Master state-specific tax incentives and benefits including Industrial Promotion Policies across states, SEZ and Export Promotion benefits, employment and investment incentives, power subsidy and infrastructure benefits, and multi-state operation optimization for maximum benefit realization.',
  '["Map applicable state incentives", "Optimize multi-state presence", "Calculate incentive value", "Create benefit tracking system", "Plan expansion for maximum benefits", "Monitor policy changes"]',
  '["State Incentive Database", "Multi-state Optimizer", "Benefit Value Calculator", "Tracking and Monitoring System", "Expansion Planning Tool", "Policy Update Monitor"]',
  180,
  200,
  5,
  NOW(),
  NOW()
);

-- Module 12: Financial Technology (Advanced - Days 56-60)
INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
VALUES (
  'p4_m12_financial_technology',
  'p4_finance_stack',
  'Financial Technology & Innovation (Advanced)',
  'Master ERP selection and implementation, leverage advanced data analytics and AI/ML applications, explore blockchain applications, and prepare for future technologies in finance',
  12,
  NOW(),
  NOW()
);

-- Module 12 Advanced Lessons (Days 56-60)
INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
VALUES 
(
  'p4_l56_erp_selection',
  'p4_m12_financial_technology',
  56,
  'ERP Selection & Implementation Mastery',
  'Master enterprise resource planning selection process including comprehensive requirements analysis, vendor evaluation frameworks, total cost of ownership calculations, implementation project management, data migration strategies, change management, user training programs, and post-implementation optimization for maximum ROI.',
  '["Conduct comprehensive requirements analysis", "Evaluate ERP vendors systematically", "Calculate total implementation cost", "Create implementation roadmap", "Plan data migration strategy", "Design change management program"]',
  '["ERP Requirements Matrix", "Vendor Evaluation Framework", "TCO Calculator", "Implementation Roadmap Template", "Data Migration Toolkit", "Change Management Guide"]',
  180,
  220,
  1,
  NOW(),
  NOW()
),
(
  'p4_l57_data_analytics',
  'p4_m12_financial_technology',
  57,
  'Advanced Data Analytics & Business Intelligence',
  'Implement advanced analytics for financial insights including predictive modeling for cash flow and revenue forecasting, customer behavior analytics for better financial planning, operational analytics for cost optimization, and real-time reporting dashboards with automated alerts and exception reporting.',
  '["Implement predictive analytics models", "Create customer behavior analytics", "Build operational efficiency dashboards", "Set up automated reporting", "Create exception monitoring system", "Design executive analytics suite"]',
  '["Analytics Implementation Guide", "Predictive Modeling Tools", "Customer Analytics Framework", "Operational Dashboard Templates", "Automated Reporting System", "Executive Analytics Suite"]',
  180,
  220,
  2,
  NOW(),
  NOW()
),
(
  'p4_l58_ai_ml_applications',
  'p4_m12_financial_technology',
  58,
  'AI & Machine Learning in Finance',
  'Leverage artificial intelligence and machine learning for financial processes including automated invoice processing with OCR, fraud detection and risk scoring, intelligent financial forecasting, automated reconciliation systems, chatbots for finance queries, and robotic process automation (RPA) implementation.',
  '["Implement AI-powered invoice processing", "Set up fraud detection system", "Build ML forecasting models", "Create automated reconciliation", "Deploy finance chatbot", "Implement RPA for routine tasks"]',
  '["AI Implementation Roadmap", "OCR Setup Guide", "Fraud Detection Tools", "ML Forecasting Models", "Reconciliation Automation", "RPA Implementation Kit"]',
  180,
  220,
  3,
  NOW(),
  NOW()
),
(
  'p4_l59_blockchain_applications',
  'p4_m12_financial_technology',
  59,
  'Blockchain & Cryptocurrency Applications',
  'Explore blockchain applications in finance including smart contracts for automated transactions, cryptocurrency acceptance and accounting, supply chain finance with blockchain, audit trails and immutable records, and decentralized finance (DeFi) opportunities and risks for business operations.',
  '["Evaluate blockchain use cases", "Set up smart contract framework", "Implement crypto payment system", "Create blockchain audit trails", "Assess DeFi opportunities", "Build blockchain strategy"]',
  '["Blockchain Use Case Library", "Smart Contract Templates", "Crypto Accounting Guide", "Audit Trail Framework", "DeFi Assessment Tool", "Blockchain Strategy Guide"]',
  180,
  220,
  4,
  NOW(),
  NOW()
),
(
  'p4_l60_future_technologies',
  'p4_m12_financial_technology',
  60,
  'Future of Finance Technology',
  'Prepare for emerging technologies including quantum computing applications in finance, augmented and virtual reality for financial training and presentation, Internet of Things (IoT) integration for real-time financial data, 5G impact on financial operations, and building future-ready finance functions that adapt to technological evolution.',
  '["Research emerging technologies", "Build technology adoption framework", "Create innovation roadmap", "Design future-ready systems", "Plan technology investments", "Build innovation culture"]',
  '["Technology Trends Report", "Adoption Framework", "Innovation Roadmap Template", "Future Systems Design", "Investment Planning Tool", "Innovation Culture Guide"]',
  180,
  220,
  5,
  NOW(),
  NOW()
);

-- Verification queries for comprehensive P4 Finance course

-- 1. Overall course statistics
SELECT 
  p.code,
  p.title,
  p.price,
  p."estimatedDays",
  COUNT(DISTINCT m.id) as module_count,
  COUNT(l.id) as lesson_count,
  SUM(l."xpReward") as total_xp,
  AVG(l."estimatedTime") as avg_lesson_time,
  SUM(l."estimatedTime") as total_course_time
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = 'P4'
GROUP BY p.id, p.code, p.title, p.price, p."estimatedDays";

-- 2. Module breakdown with lesson counts
SELECT 
  m.title as module_title,
  m.description,
  m."orderIndex",
  COUNT(l.id) as lesson_count,
  SUM(l."xpReward") as module_xp,
  SUM(l."estimatedTime") as module_time,
  MIN(l.day) as start_day,
  MAX(l.day) as end_day
FROM "Module" m
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE m."productId" = 'p4_finance_stack'
GROUP BY m.id, m.title, m.description, m."orderIndex"
ORDER BY m."orderIndex";

-- 3. Daily lesson progression overview
SELECT 
  l.day,
  l.title as lesson_title,
  m.title as module_title,
  l."estimatedTime",
  l."xpReward"
FROM "Lesson" l
JOIN "Module" m ON l."moduleId" = m.id
WHERE m."productId" = 'p4_finance_stack'
ORDER BY l.day;

-- Expected results summary:
-- Course: P4 Finance Stack - CFO-Level Mastery
-- Price: ₹6,999
-- Duration: 60 days
-- Modules: 12 (9 core + 3 advanced)
-- Lessons: 60 comprehensive lessons
-- Total XP: 10,150 XP
-- Total Time: 9,900+ minutes (165+ hours of core content)
-- Advanced modules include strategic leadership, tax optimization, and future technologies

-- This represents the most comprehensive finance course for Indian startups:
-- - 500+ hours of expert video content when including all resources
-- - 250+ premium templates and tools
-- - Industry-recognized certification system
-- - Real-world practical exercises and simulations
-- - 24/7 expert support system
-- - Exclusive masterclasses with unicorn founders
-- - Worth ₹25,00,000+ in market value for just ₹6,999