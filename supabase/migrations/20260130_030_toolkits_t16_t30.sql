-- Toolkits T16-T30 Migration
-- Resources and templates for all new courses

BEGIN;

-- Insert Toolkit Products
INSERT INTO "Product" (id, code, title, description, price, "createdAt", "updatedAt")
VALUES
-- T16: HR & Team Toolkit
(gen_random_uuid()::text, 'T16', 'HR & Team Toolkit', 'Essential HR toolkit - 15 templates including offer letters, employment contracts, ESOP agreements, POSH policies, and 8 interactive tools like salary benchmarking and PF/ESI calculators.', 3499, NOW(), NOW()),

-- T17: Product Development Toolkit
(gen_random_uuid()::text, 'T17', 'Product Development Toolkit', 'Product management toolkit - 12 templates for PRDs, user personas, roadmaps, and 10 tools including TAM calculator, feature prioritization matrix, and experiment tracker.', 3499, NOW(), NOW()),

-- T18: Operations Toolkit
(gen_random_uuid()::text, 'T18', 'Operations Toolkit', 'Operations management toolkit - 15 templates for SOPs, vendor agreements, quality manuals, and 8 tools for inventory optimization and process mapping.', 3499, NOW(), NOW()),

-- T19: Technology Stack Toolkit
(gen_random_uuid()::text, 'T19', 'Technology Stack Toolkit', 'CTO toolkit - 10 templates for architecture documentation, security policies, and 12 tools for tech stack evaluation, cloud cost optimization, and security assessment.', 3499, NOW(), NOW()),

-- T20: FinTech Toolkit
(gen_random_uuid()::text, 'T20', 'FinTech Toolkit', 'FinTech compliance toolkit - 12 templates for RBI applications, KYC policies, and 10 tools including compliance checkers and loan eligibility calculators.', 3999, NOW(), NOW()),

-- T21: HealthTech Toolkit
(gen_random_uuid()::text, 'T21', 'HealthTech Toolkit', 'Healthcare startup toolkit - 15 templates for CDSCO applications, clinical protocols, and 8 tools for device classification and regulatory pathway planning.', 3999, NOW(), NOW()),

-- T22: E-commerce Toolkit
(gen_random_uuid()::text, 'T22', 'E-commerce Toolkit', 'E-commerce operations toolkit - 12 templates for seller agreements, return policies, and 10 tools for unit economics, pricing optimization, and logistics planning.', 3499, NOW(), NOW()),

-- T23: EV & Mobility Toolkit
(gen_random_uuid()::text, 'T23', 'EV & Mobility Toolkit', 'EV startup toolkit - 12 templates for PLI applications, homologation documents, and 8 tools for subsidy calculations and DVA compliance tracking.', 3999, NOW(), NOW()),

-- T24: Manufacturing Toolkit
(gen_random_uuid()::text, 'T24', 'Manufacturing Toolkit', 'Manufacturing excellence toolkit - 15 templates for factory licensing, PLI applications, and 10 tools for capacity planning and export documentation.', 3999, NOW(), NOW()),

-- T25: EdTech Toolkit
(gen_random_uuid()::text, 'T25', 'EdTech Toolkit', 'EdTech launch toolkit - 10 templates for UGC applications, content licensing, and 8 tools for LMS comparison and student engagement tracking.', 3499, NOW(), NOW()),

-- T26: AgriTech Toolkit
(gen_random_uuid()::text, 'T26', 'AgriTech Toolkit', 'AgriTech toolkit - 12 templates for FPO registration, APEDA applications, and 8 tools for crop planning and subsidy eligibility assessment.', 3499, NOW(), NOW()),

-- T27: PropTech Toolkit
(gen_random_uuid()::text, 'T27', 'PropTech Toolkit', 'Real estate tech toolkit - 12 templates for RERA registration, lease agreements, and 8 tools for property valuation and compliance tracking.', 3499, NOW(), NOW()),

-- T28: Biotech Toolkit
(gen_random_uuid()::text, 'T28', 'Biotech Toolkit', 'Biotech regulatory toolkit - 15 templates for CDSCO applications, clinical trial protocols, and 10 tools for regulatory pathway mapping and GMP compliance.', 3999, NOW(), NOW()),

-- T29: SaaS Toolkit
(gen_random_uuid()::text, 'T29', 'SaaS Toolkit', 'SaaS business toolkit - 10 templates for terms of service, DPA, SLA agreements, and 12 tools for pricing optimization, churn analysis, and metrics dashboards.', 3499, NOW(), NOW()),

-- T30: International Expansion Toolkit
(gen_random_uuid()::text, 'T30', 'International Expansion Toolkit', 'Global expansion toolkit - 15 templates for FEMA filings, international contracts, and 8 tools for market assessment and entity structure planning.', 3999, NOW(), NOW())

ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "updatedAt" = NOW();

-- Create Resource table if not exists (for toolkit resources)
CREATE TABLE IF NOT EXISTS "ToolkitResource" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "toolkitCode" TEXT NOT NULL,
    "resourceType" TEXT NOT NULL, -- 'template' or 'tool'
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    "downloadUrl" TEXT,
    "toolUrl" TEXT,
    "orderIndex" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index if not exists
CREATE INDEX IF NOT EXISTS idx_toolkit_resource_code ON "ToolkitResource"("toolkitCode");

-- Clean existing resources for T16-T30
DELETE FROM "ToolkitResource" WHERE "toolkitCode" IN ('T16', 'T17', 'T18', 'T19', 'T20', 'T21', 'T22', 'T23', 'T24', 'T25', 'T26', 'T27', 'T28', 'T29', 'T30');

-- T16: HR & Team Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T16', 'template', 'Job Description Template Library', 'Comprehensive JD templates for 30+ startup roles', 'Recruitment', 1),
('T16', 'template', 'Offer Letter Template (India-Compliant)', 'Standard offer letter with all legal requirements', 'Recruitment', 2),
('T16', 'template', 'Employment Contract Template', 'Comprehensive employment agreement with IP assignment', 'Compliance', 3),
('T16', 'template', 'ESOP Grant Letter Template', 'Stock option grant agreement with vesting terms', 'Compensation', 4),
('T16', 'template', 'ESOP Plan Document', 'Complete ESOP scheme document', 'Compensation', 5),
('T16', 'template', 'Employee Handbook Template', 'Complete employee handbook with all policies', 'Policies', 6),
('T16', 'template', 'POSH Policy Document', 'Prevention of Sexual Harassment policy', 'Compliance', 7),
('T16', 'template', 'Leave Policy Template', 'Comprehensive leave policy document', 'Policies', 8),
('T16', 'template', 'Remote Work Policy', 'Work from home and hybrid policy template', 'Policies', 9),
('T16', 'template', 'Performance Review Template', 'Annual review and feedback forms', 'Performance', 10),
('T16', 'template', 'PIP Template', 'Performance Improvement Plan document', 'Performance', 11),
('T16', 'template', 'Exit Interview Questionnaire', 'Structured exit interview questions', 'Offboarding', 12),
('T16', 'template', 'Reference Check Template', 'Background verification questions', 'Recruitment', 13),
('T16', 'template', 'Onboarding Checklist', '30-60-90 day onboarding plan', 'Onboarding', 14),
('T16', 'template', 'Code of Conduct Template', 'Employee code of conduct document', 'Policies', 15),
-- Tools (8)
('T16', 'tool', 'Salary Benchmarking Calculator', 'Compare salaries by role, city, and experience', 'Compensation', 16),
('T16', 'tool', 'ESOP Valuation Calculator', 'Calculate equity grant values and scenarios', 'Compensation', 17),
('T16', 'tool', 'PF/ESI Calculator', 'Calculate statutory contributions', 'Compliance', 18),
('T16', 'tool', 'Gratuity Calculator', 'Calculate gratuity liability', 'Compliance', 19),
('T16', 'tool', 'Cost-per-Hire Calculator', 'Track recruitment costs by channel', 'Recruitment', 20),
('T16', 'tool', 'Attrition Analysis Dashboard', 'Track and analyze employee turnover', 'Analytics', 21),
('T16', 'tool', 'eNPS Calculator', 'Measure employee engagement', 'Engagement', 22),
('T16', 'tool', 'HR Compliance Checker', 'Assess compliance across labor laws', 'Compliance', 23);

-- T17: Product Development Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T17', 'template', 'Product Requirements Document (PRD)', 'Comprehensive PRD template', 'Documentation', 1),
('T17', 'template', 'User Persona Template', 'Detailed user persona framework', 'Research', 2),
('T17', 'template', 'Customer Interview Script', 'Problem discovery interview guide', 'Research', 3),
('T17', 'template', 'Product Roadmap Template', 'Strategic roadmap presentation', 'Planning', 4),
('T17', 'template', 'Feature Specification Document', 'Detailed feature specs template', 'Documentation', 5),
('T17', 'template', 'Sprint Planning Template', 'Agile sprint planning document', 'Agile', 6),
('T17', 'template', 'Retrospective Template', 'Sprint retrospective format', 'Agile', 7),
('T17', 'template', 'A/B Test Plan Template', 'Experiment documentation', 'Experimentation', 8),
('T17', 'template', 'Release Notes Template', 'Product release communication', 'Communication', 9),
('T17', 'template', 'Competitive Analysis Framework', 'Competitor comparison matrix', 'Research', 10),
('T17', 'template', 'User Journey Map Template', 'End-to-end journey mapping', 'Research', 11),
('T17', 'template', 'Product Strategy Document', 'Strategic product direction', 'Strategy', 12),
-- Tools (10)
('T17', 'tool', 'TAM/SAM/SOM Calculator', 'Market sizing with India data', 'Research', 13),
('T17', 'tool', 'Feature Prioritization Matrix (RICE)', 'Score and prioritize features', 'Planning', 14),
('T17', 'tool', 'User Persona Builder', 'Interactive persona creation', 'Research', 15),
('T17', 'tool', 'Product Metrics Dashboard', 'Track key product KPIs', 'Analytics', 16),
('T17', 'tool', 'Experiment Tracker', 'A/B test tracking and analysis', 'Experimentation', 17),
('T17', 'tool', 'Roadmap Timeline Builder', 'Visual roadmap creation', 'Planning', 18),
('T17', 'tool', 'User Story Generator', 'Create structured user stories', 'Agile', 19),
('T17', 'tool', 'Sprint Velocity Calculator', 'Track and forecast velocity', 'Agile', 20),
('T17', 'tool', 'Cohort Analysis Tool', 'User retention analysis', 'Analytics', 21),
('T17', 'tool', 'MoSCoW Prioritizer', 'Must/Should/Could/Wont analysis', 'Planning', 22);

-- T18: Operations Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T18', 'template', 'Standard Operating Procedure (SOP) Template', 'Comprehensive SOP format', 'Process', 1),
('T18', 'template', 'Process Map Template', 'Visual workflow documentation', 'Process', 2),
('T18', 'template', 'Vendor Evaluation Scorecard', 'Supplier comparison matrix', 'Sourcing', 3),
('T18', 'template', 'Vendor Agreement Template', 'Standard vendor contract', 'Sourcing', 4),
('T18', 'template', 'Quality Manual Template', 'QMS documentation', 'Quality', 5),
('T18', 'template', 'Quality Inspection Checklist', 'Product quality checks', 'Quality', 6),
('T18', 'template', 'Inventory Tracking Sheet', 'Stock management template', 'Inventory', 7),
('T18', 'template', 'Purchase Order Template', 'Standard PO format', 'Sourcing', 8),
('T18', 'template', 'Goods Receipt Note', 'GRN documentation', 'Logistics', 9),
('T18', 'template', '3PL Contract Template', 'Logistics partner agreement', 'Logistics', 10),
('T18', 'template', 'Warehouse Layout Planner', 'Storage optimization guide', 'Logistics', 11),
('T18', 'template', 'Returns Process SOP', 'Reverse logistics procedure', 'Logistics', 12),
('T18', 'template', 'Cost Analysis Template', 'Operations cost tracking', 'Finance', 13),
('T18', 'template', 'Capacity Planning Template', 'Production capacity document', 'Planning', 14),
('T18', 'template', 'Operations Dashboard Template', 'Key metrics visualization', 'Analytics', 15),
-- Tools (8)
('T18', 'tool', 'EOQ Calculator', 'Economic Order Quantity calculation', 'Inventory', 16),
('T18', 'tool', 'Reorder Point Calculator', 'Safety stock and reorder planning', 'Inventory', 17),
('T18', 'tool', 'Process Efficiency Analyzer', 'Identify bottlenecks and waste', 'Process', 18),
('T18', 'tool', '3PL Cost Comparison Tool', 'Compare logistics partners', 'Logistics', 19),
('T18', 'tool', 'Vendor Scorecard Dashboard', 'Track supplier performance', 'Sourcing', 20),
('T18', 'tool', 'Quality Metrics Tracker', 'Monitor quality KPIs', 'Quality', 21),
('T18', 'tool', 'Operations Cost Calculator', 'Total cost of operations', 'Finance', 22),
('T18', 'tool', 'Demand Forecasting Tool', 'Predict future demand', 'Planning', 23);

-- T19: Technology Stack Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (10)
('T19', 'template', 'System Architecture Document', 'Architecture documentation template', 'Architecture', 1),
('T19', 'template', 'API Design Specification', 'REST/GraphQL API documentation', 'Architecture', 2),
('T19', 'template', 'Technical Design Document', 'Feature technical specification', 'Architecture', 3),
('T19', 'template', 'Security Policy Template', 'Information security policies', 'Security', 4),
('T19', 'template', 'Incident Response Plan', 'Security incident handling', 'Security', 5),
('T19', 'template', 'DevOps Runbook Template', 'Operational procedures', 'DevOps', 6),
('T19', 'template', 'Database Schema Document', 'Data model documentation', 'Database', 7),
('T19', 'template', 'Technology Roadmap Template', 'Tech evolution planning', 'Strategy', 8),
('T19', 'template', 'Code Review Checklist', 'Pull request review guide', 'Engineering', 9),
('T19', 'template', 'Engineering Hiring Rubric', 'Technical interview guide', 'Hiring', 10),
-- Tools (12)
('T19', 'tool', 'Cloud Cost Calculator', 'Compare AWS/GCP/Azure costs', 'Cloud', 11),
('T19', 'tool', 'Tech Stack Evaluator', 'Framework comparison tool', 'Architecture', 12),
('T19', 'tool', 'Security Assessment Tool', 'OWASP vulnerability checker', 'Security', 13),
('T19', 'tool', 'Performance Benchmarking Tool', 'Load testing calculator', 'Performance', 14),
('T19', 'tool', 'Database Selection Guide', 'SQL vs NoSQL decision tool', 'Database', 15),
('T19', 'tool', 'CI/CD Pipeline Builder', 'Pipeline configuration generator', 'DevOps', 16),
('T19', 'tool', 'Technical Debt Tracker', 'Code quality monitoring', 'Engineering', 17),
('T19', 'tool', 'Scalability Calculator', 'Infrastructure scaling planner', 'Architecture', 18),
('T19', 'tool', 'API Rate Limit Calculator', 'API capacity planning', 'Architecture', 19),
('T19', 'tool', 'Build vs Buy Decision Matrix', 'Make or buy analysis', 'Strategy', 20),
('T19', 'tool', 'Uptime SLA Calculator', 'Availability target planning', 'DevOps', 21),
('T19', 'tool', 'Engineering Team Velocity Tracker', 'Development productivity', 'Engineering', 22);

-- T20: FinTech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T20', 'template', 'RBI PA/PG Application Template', 'Payment Aggregator license application', 'Licensing', 1),
('T20', 'template', 'NBFC Application Checklist', 'RBI NBFC registration guide', 'Licensing', 2),
('T20', 'template', 'KYC Policy Document', 'Know Your Customer procedures', 'Compliance', 3),
('T20', 'template', 'AML Policy Template', 'Anti-Money Laundering policy', 'Compliance', 4),
('T20', 'template', 'Digital Lending Policy', 'RBI DL Guidelines compliance', 'Compliance', 5),
('T20', 'template', 'Terms of Service (FinTech)', 'User agreement template', 'Legal', 6),
('T20', 'template', 'Privacy Policy (Financial Data)', 'Data privacy for FinTech', 'Legal', 7),
('T20', 'template', 'Credit Policy Document', 'Lending underwriting policy', 'Lending', 8),
('T20', 'template', 'Collections Policy Template', 'Debt collection procedures', 'Lending', 9),
('T20', 'template', 'Partner Bank Agreement', 'Banking partnership contract', 'Partnerships', 10),
('T20', 'template', 'Grievance Redressal Policy', 'Customer complaint handling', 'Compliance', 11),
('T20', 'template', 'Nodal Officer Appointment', 'Regulatory officer designation', 'Compliance', 12),
-- Tools (10)
('T20', 'tool', 'RBI Compliance Checker', 'Assess regulatory compliance', 'Compliance', 13),
('T20', 'tool', 'Loan Eligibility Calculator', 'Credit assessment tool', 'Lending', 14),
('T20', 'tool', 'EMI Calculator', 'Loan repayment calculator', 'Lending', 15),
('T20', 'tool', 'Interest Rate Comparator', 'Market rate benchmarking', 'Lending', 16),
('T20', 'tool', 'UPI Integration Checklist', 'NPCI integration guide', 'Payments', 17),
('T20', 'tool', 'PCI-DSS Compliance Tracker', 'Card data security assessment', 'Security', 18),
('T20', 'tool', 'Fraud Detection Rules Builder', 'Transaction monitoring setup', 'Security', 19),
('T20', 'tool', 'Net Worth Calculator (NBFC)', 'NBFC capital requirements', 'Licensing', 20),
('T20', 'tool', 'License Timeline Tracker', 'RBI application progress', 'Licensing', 21),
('T20', 'tool', 'Account Aggregator Readiness', 'AA framework assessment', 'Integration', 22);

-- T21: HealthTech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T21', 'template', 'CDSCO Device Registration Form', 'Medical device application', 'Regulatory', 1),
('T21', 'template', 'Import License Application', 'Medical device import license', 'Regulatory', 2),
('T21', 'template', 'Clinical Trial Protocol Template', 'CTRI registration document', 'Clinical', 3),
('T21', 'template', 'Informed Consent Form', 'Patient consent document', 'Clinical', 4),
('T21', 'template', 'Ethics Committee Submission', 'IEC application format', 'Clinical', 5),
('T21', 'template', 'Telemedicine Practice SOP', 'Teleconsultation procedures', 'Operations', 6),
('T21', 'template', 'E-Prescription Template', 'Digital prescription format', 'Operations', 7),
('T21', 'template', 'ABDM Integration Checklist', 'Health ID integration guide', 'Integration', 8),
('T21', 'template', 'Hospital Partnership Agreement', 'Healthcare partner contract', 'Partnerships', 9),
('T21', 'template', 'Diagnostic Lab Agreement', 'Lab partner template', 'Partnerships', 10),
('T21', 'template', 'ISO 13485 Checklist', 'Medical device QMS requirements', 'Quality', 11),
('T21', 'template', 'Post-Market Surveillance Plan', 'Device monitoring template', 'Quality', 12),
('T21', 'template', 'Adverse Event Reporting Form', 'Safety reporting template', 'Safety', 13),
('T21', 'template', 'Technical File Template', 'Device technical documentation', 'Regulatory', 14),
('T21', 'template', 'Health Data Security Policy', 'Patient data protection', 'Security', 15),
-- Tools (8)
('T21', 'tool', 'CDSCO Device Classifier', 'Determine device class A-D', 'Regulatory', 16),
('T21', 'tool', 'Regulatory Pathway Planner', 'CDSCO approval roadmap', 'Regulatory', 17),
('T21', 'tool', 'Clinical Trial Cost Estimator', 'Trial budget planning', 'Clinical', 18),
('T21', 'tool', 'GMP Readiness Assessment', 'Manufacturing compliance check', 'Quality', 19),
('T21', 'tool', 'CE Marking Checklist', 'European conformity guide', 'Regulatory', 20),
('T21', 'tool', 'FDA 510(k) Decision Tree', 'US regulatory pathway', 'Regulatory', 21),
('T21', 'tool', 'ABDM Sandbox Checklist', 'Digital health integration', 'Integration', 22),
('T21', 'tool', 'HealthTech Investor Database', 'Sector-specific VCs list', 'Funding', 23);

-- T22: E-commerce Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T22', 'template', 'Seller Agreement Template', 'Marketplace seller contract', 'Legal', 1),
('T22', 'template', 'Return Policy Document', 'Customer return guidelines', 'Policy', 2),
('T22', 'template', 'Refund Policy Template', 'Refund terms and conditions', 'Policy', 3),
('T22', 'template', 'Privacy Policy (E-commerce)', 'Customer data privacy', 'Legal', 4),
('T22', 'template', 'Terms of Service Template', 'Website terms and conditions', 'Legal', 5),
('T22', 'template', 'Product Listing Template', 'Optimized product descriptions', 'Catalog', 6),
('T22', 'template', '3PL Contract Template', 'Logistics partner agreement', 'Logistics', 7),
('T22', 'template', 'Warehouse SOP', 'Fulfillment center procedures', 'Operations', 8),
('T22', 'template', 'Customer Service Scripts', 'Support team responses', 'Support', 9),
('T22', 'template', 'Influencer Agreement', 'Marketing partnership contract', 'Marketing', 10),
('T22', 'template', 'Consumer Complaint Response', 'Legal metrology compliance', 'Compliance', 11),
('T22', 'template', 'GST Invoice Template', 'Tax-compliant invoicing', 'Finance', 12),
-- Tools (10)
('T22', 'tool', 'Unit Economics Calculator', 'Profitability per order', 'Finance', 13),
('T22', 'tool', 'Pricing Optimizer', 'Dynamic pricing recommendations', 'Pricing', 14),
('T22', 'tool', 'Shipping Cost Calculator', 'Multi-carrier rate comparison', 'Logistics', 15),
('T22', 'tool', 'Inventory Forecaster', 'Stock level predictions', 'Inventory', 16),
('T22', 'tool', 'CAC Calculator', 'Customer acquisition cost', 'Marketing', 17),
('T22', 'tool', 'LTV Calculator', 'Customer lifetime value', 'Marketing', 18),
('T22', 'tool', 'Marketplace Fee Calculator', 'Amazon/Flipkart fee estimator', 'Finance', 19),
('T22', 'tool', 'Return Rate Analyzer', 'Returns pattern analysis', 'Operations', 20),
('T22', 'tool', 'SKU Performance Dashboard', 'Product analytics tracker', 'Analytics', 21),
('T22', 'tool', 'Conversion Rate Optimizer', 'A/B test recommendations', 'Optimization', 22);

-- T23: EV & Mobility Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T23', 'template', 'PLI Application Template', 'Auto PLI scheme application', 'Subsidies', 1),
('T23', 'template', 'FAME II Subsidy Application', 'Demand incentive application', 'Subsidies', 2),
('T23', 'template', 'State EV Policy Summary', 'State-wise incentive guide', 'Subsidies', 3),
('T23', 'template', 'Homologation Checklist', 'ARAI/iCAT testing requirements', 'Compliance', 4),
('T23', 'template', 'Type Approval Application', 'Vehicle certification form', 'Compliance', 5),
('T23', 'template', 'Battery Supplier Agreement', 'Cell/pack supply contract', 'Sourcing', 6),
('T23', 'template', 'Charging Station Agreement', 'CPO partnership contract', 'Infrastructure', 7),
('T23', 'template', 'Fleet Lease Agreement', 'B2B vehicle leasing contract', 'Fleet', 8),
('T23', 'template', 'Dealer Agreement Template', 'Distribution partner contract', 'Sales', 9),
('T23', 'template', 'EV Warranty Policy', 'Vehicle warranty terms', 'After-Sales', 10),
('T23', 'template', 'Battery Warranty Document', 'Battery-specific warranty', 'After-Sales', 11),
('T23', 'template', 'Service Center SOP', 'EV service procedures', 'After-Sales', 12),
-- Tools (8)
('T23', 'tool', 'FAME II Subsidy Calculator', 'Calculate demand incentives', 'Subsidies', 13),
('T23', 'tool', 'State Subsidy Comparator', 'Compare state EV policies', 'Subsidies', 14),
('T23', 'tool', 'PLI Eligibility Checker', 'Auto/ACC PLI requirements', 'Subsidies', 15),
('T23', 'tool', 'DVA Calculator', 'Domestic Value Addition tracking', 'Compliance', 16),
('T23', 'tool', 'Battery Cost Estimator', 'Cell and pack cost modeling', 'Sourcing', 17),
('T23', 'tool', 'Charging Infrastructure Planner', 'Station network planning', 'Infrastructure', 18),
('T23', 'tool', 'TCO Calculator', 'Total Cost of Ownership vs ICE', 'Sales', 19),
('T23', 'tool', 'Homologation Timeline Tracker', 'Certification progress', 'Compliance', 20);

-- T24: Manufacturing Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T24', 'template', 'Factory License Application', 'State factory act registration', 'Licensing', 1),
('T24', 'template', 'Environmental Clearance Checklist', 'MoEFCC EC requirements', 'Compliance', 2),
('T24', 'template', 'PLI Application Templates', 'Sector-wise PLI applications', 'Subsidies', 3),
('T24', 'template', 'ISO 9001 Documentation', 'Quality management system', 'Quality', 4),
('T24', 'template', 'BIS Certification Checklist', 'Indian standards compliance', 'Quality', 5),
('T24', 'template', 'Labor Compliance Registers', 'Statutory record formats', 'Labor', 6),
('T24', 'template', 'Safety Manual Template', 'Factory safety procedures', 'Safety', 7),
('T24', 'template', 'Supplier Qualification Form', 'Vendor approval process', 'Sourcing', 8),
('T24', 'template', 'Production Planning Template', 'Manufacturing schedule', 'Planning', 9),
('T24', 'template', 'Quality Control Checklist', 'Inspection procedures', 'Quality', 10),
('T24', 'template', 'Export Documentation Kit', 'Shipping/customs documents', 'Export', 11),
('T24', 'template', 'SEZ Application Template', 'Special Economic Zone setup', 'Setup', 12),
('T24', 'template', 'State Incentive Application', 'Industrial policy benefits', 'Subsidies', 13),
('T24', 'template', 'Technology Transfer Agreement', 'IP and know-how licensing', 'Partnerships', 14),
('T24', 'template', 'Contract Manufacturing Agreement', 'CMO partnership contract', 'Partnerships', 15),
-- Tools (10)
('T24', 'tool', 'PLI Eligibility Checker', 'Multi-scheme eligibility', 'Subsidies', 16),
('T24', 'tool', 'Capacity Planning Calculator', 'Production capacity modeling', 'Planning', 17),
('T24', 'tool', 'Factory Cost Estimator', 'Setup cost projection', 'Finance', 18),
('T24', 'tool', 'Location Selection Matrix', 'Site comparison tool', 'Setup', 19),
('T24', 'tool', 'State Incentive Comparator', 'State policy comparison', 'Subsidies', 20),
('T24', 'tool', 'Export Duty Calculator', 'RoDTEP/duty drawback', 'Export', 21),
('T24', 'tool', 'Labor Compliance Tracker', 'Multi-state compliance', 'Labor', 22),
('T24', 'tool', 'Quality Audit Checklist', 'ISO/BIS readiness', 'Quality', 23),
('T24', 'tool', 'DVA Calculator', 'Domestic content tracking', 'Compliance', 24),
('T24', 'tool', 'Industry 4.0 Readiness', 'Digital maturity assessment', 'Technology', 25);

-- T25: EdTech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (10)
('T25', 'template', 'UGC ODL Application', 'Online degree program approval', 'Regulatory', 1),
('T25', 'template', 'AICTE Approval Checklist', 'Technical course approval', 'Regulatory', 2),
('T25', 'template', 'Content Licensing Agreement', 'Educational content license', 'Legal', 3),
('T25', 'template', 'University Partnership MoU', 'Academic collaboration', 'Partnerships', 4),
('T25', 'template', 'Student Terms of Service', 'Platform user agreement', 'Legal', 5),
('T25', 'template', 'Privacy Policy (EdTech)', 'Student data privacy', 'Legal', 6),
('T25', 'template', 'Course Curriculum Template', 'Learning outcome design', 'Content', 7),
('T25', 'template', 'Assessment Framework', 'Exam and evaluation design', 'Content', 8),
('T25', 'template', 'Instructor Agreement', 'Faculty/mentor contract', 'Operations', 9),
('T25', 'template', 'Cohort Program Template', 'Cohort-based course design', 'Content', 10),
-- Tools (8)
('T25', 'tool', 'LMS Comparison Tool', 'Platform selection guide', 'Technology', 11),
('T25', 'tool', 'Course Pricing Calculator', 'Revenue and margin analysis', 'Finance', 12),
('T25', 'tool', 'Student Engagement Tracker', 'Completion and activity metrics', 'Analytics', 13),
('T25', 'tool', 'CAC/LTV Calculator (EdTech)', 'Student economics analysis', 'Finance', 14),
('T25', 'tool', 'Content Production Calculator', 'Video/content cost estimator', 'Content', 15),
('T25', 'tool', 'Accreditation Tracker', 'Approval status monitor', 'Regulatory', 16),
('T25', 'tool', 'Student Feedback Analyzer', 'NPS and satisfaction metrics', 'Analytics', 17),
('T25', 'tool', 'Vernacular Expansion Planner', 'Language localization guide', 'Strategy', 18);

-- T26: AgriTech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T26', 'template', 'FPO Registration Application', 'Producer organization setup', 'Registration', 1),
('T26', 'template', 'FPO Bylaws Template', 'Governance document', 'Registration', 2),
('T26', 'template', 'APEDA Registration Form', 'Export registration application', 'Export', 3),
('T26', 'template', 'Organic Certification Checklist', 'NPOP certification guide', 'Certification', 4),
('T26', 'template', 'Contract Farming Agreement', 'Farmer partnership contract', 'Partnerships', 5),
('T26', 'template', 'Warehouse Receipt Template', 'WDRA negotiable receipt', 'Storage', 6),
('T26', 'template', 'Cold Storage License Application', 'Infrastructure licensing', 'Infrastructure', 7),
('T26', 'template', 'Farm Input Retail License', 'Fertilizer/seed dealer license', 'Licensing', 8),
('T26', 'template', 'CHC Business Plan', 'Custom Hiring Center model', 'Mechanization', 9),
('T26', 'template', 'e-NAM Trading Account', 'Electronic trading registration', 'Trading', 10),
('T26', 'template', 'Mandi License Application', 'Trader license format', 'Trading', 11),
('T26', 'template', 'Food Processing License', 'FSSAI for agri processing', 'Processing', 12),
-- Tools (8)
('T26', 'tool', 'PM-KISAN Eligibility Checker', 'Farmer scheme eligibility', 'Subsidies', 13),
('T26', 'tool', 'PMFBY Premium Calculator', 'Crop insurance premium', 'Insurance', 14),
('T26', 'tool', 'KCC Loan Calculator', 'Kisan Credit Card eligibility', 'Finance', 15),
('T26', 'tool', 'Cold Chain Subsidy Calculator', 'Infrastructure subsidy estimate', 'Infrastructure', 16),
('T26', 'tool', 'Crop Selection Tool', 'Region-wise crop recommendations', 'Planning', 17),
('T26', 'tool', 'Mandi Price Tracker', 'APMC price monitoring', 'Trading', 18),
('T26', 'tool', 'Export Documentation Checker', 'Phytosanitary compliance', 'Export', 19),
('T26', 'tool', 'FPO Performance Dashboard', 'Producer org analytics', 'Analytics', 20);

-- T27: PropTech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (12)
('T27', 'template', 'RERA Registration Application', 'Project registration form', 'Regulatory', 1),
('T27', 'template', 'RERA Quarterly Returns', 'Progress update format', 'Regulatory', 2),
('T27', 'template', 'Allotment Letter Template', 'Property booking document', 'Sales', 3),
('T27', 'template', 'Sale Agreement Template', 'Property sale contract', 'Legal', 4),
('T27', 'template', 'Lease Agreement Template', 'Commercial/residential lease', 'Legal', 5),
('T27', 'template', 'Co-living License Checklist', 'PG/hostel licensing guide', 'Licensing', 6),
('T27', 'template', 'Co-working Fit-out Specs', 'Office space requirements', 'Operations', 7),
('T27', 'template', 'Property Management Agreement', 'Facility management contract', 'Operations', 8),
('T27', 'template', 'Brokerage Agreement', 'Real estate agent contract', 'Sales', 9),
('T27', 'template', 'Title Due Diligence Checklist', 'Property verification guide', 'Legal', 10),
('T27', 'template', 'Construction Agreement', 'Builder contract template', 'Construction', 11),
('T27', 'template', 'Fire Safety NOC Application', 'Fire department approval', 'Compliance', 12),
-- Tools (8)
('T27', 'tool', 'RERA Compliance Tracker', 'Multi-state RERA monitoring', 'Regulatory', 13),
('T27', 'tool', 'Property Valuation Calculator', 'Market value estimation', 'Valuation', 14),
('T27', 'tool', 'Stamp Duty Calculator', 'State-wise stamp duty', 'Finance', 15),
('T27', 'tool', 'Rental Yield Calculator', 'Investment returns analysis', 'Finance', 16),
('T27', 'tool', 'EMI Calculator (Home Loan)', 'Mortgage payment calculator', 'Finance', 17),
('T27', 'tool', 'Co-living Unit Economics', 'Per-bed revenue analysis', 'Operations', 18),
('T27', 'tool', 'Construction Cost Estimator', 'Per sq ft cost projection', 'Construction', 19),
('T27', 'tool', 'RERA Project Search', 'Registered project database', 'Research', 20);

-- T28: Biotech Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T28', 'template', 'CDSCO Drug Application (Form 44)', 'New drug approval application', 'Regulatory', 1),
('T28', 'template', 'Clinical Trial Protocol Template', 'Phase I/II/III design', 'Clinical', 2),
('T28', 'template', 'CTRI Registration Form', 'Trial registry submission', 'Clinical', 3),
('T28', 'template', 'Ethics Committee Application', 'IEC submission format', 'Clinical', 4),
('T28', 'template', 'Investigator Brochure Template', 'IB documentation', 'Clinical', 5),
('T28', 'template', 'GMP Facility Design Checklist', 'Manufacturing compliance', 'Manufacturing', 6),
('T28', 'template', 'Batch Manufacturing Record', 'Production documentation', 'Manufacturing', 7),
('T28', 'template', 'Drug Master File Template', 'API documentation', 'Regulatory', 8),
('T28', 'template', 'Biosimilar Development Plan', 'Biosimilar pathway document', 'Development', 9),
('T28', 'template', 'Technology Transfer Agreement', 'Manufacturing tech transfer', 'Partnerships', 10),
('T28', 'template', 'BIRAC Grant Application', 'Government funding proposal', 'Funding', 11),
('T28', 'template', 'Patent Application (India)', 'IP filing documentation', 'IP', 12),
('T28', 'template', 'CRO Agreement Template', 'Contract research organization', 'Partnerships', 13),
('T28', 'template', 'CMO/CDMO Agreement', 'Contract manufacturing', 'Partnerships', 14),
('T28', 'template', 'Product Dossier Template (CTD)', 'Common Technical Document', 'Regulatory', 15),
-- Tools (10)
('T28', 'tool', 'CDSCO Regulatory Pathway Mapper', 'Drug approval roadmap', 'Regulatory', 16),
('T28', 'tool', 'Clinical Trial Cost Estimator', 'Phase-wise budgeting', 'Clinical', 17),
('T28', 'tool', 'GMP Readiness Assessment', 'Manufacturing compliance', 'Manufacturing', 18),
('T28', 'tool', 'Biosimilar Comparability Tool', 'Reference product analysis', 'Development', 19),
('T28', 'tool', 'BIRAC Scheme Finder', 'Grant eligibility checker', 'Funding', 20),
('T28', 'tool', 'Patent Landscape Analyzer', 'Freedom to operate analysis', 'IP', 21),
('T28', 'tool', 'FDA 505(b)(2) Decision Tree', 'US regulatory pathway', 'Regulatory', 22),
('T28', 'tool', 'WHO Prequalification Checklist', 'Global market access', 'Regulatory', 23),
('T28', 'tool', 'Biotech Investor Database', 'Life sciences VCs list', 'Funding', 24),
('T28', 'tool', 'Clinical Trial Site Finder', 'CRO and site database', 'Clinical', 25);

-- T29: SaaS Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (10)
('T29', 'template', 'Terms of Service Template', 'SaaS user agreement', 'Legal', 1),
('T29', 'template', 'Privacy Policy (SaaS)', 'Data processing transparency', 'Legal', 2),
('T29', 'template', 'Data Processing Agreement', 'GDPR-compliant DPA', 'Legal', 3),
('T29', 'template', 'Service Level Agreement', 'SLA with uptime guarantees', 'Legal', 4),
('T29', 'template', 'Master Services Agreement', 'Enterprise contract template', 'Sales', 5),
('T29', 'template', 'Security Questionnaire Response', 'Enterprise security Q&A', 'Security', 6),
('T29', 'template', 'SOC 2 Type II Checklist', 'Compliance preparation', 'Security', 7),
('T29', 'template', 'Pricing Page Template', 'Conversion-optimized pricing', 'Marketing', 8),
('T29', 'template', 'Partner Agreement Template', 'Channel partner contract', 'Partnerships', 9),
('T29', 'template', 'Investor Update Template', 'Monthly/quarterly reports', 'Investor Relations', 10),
-- Tools (12)
('T29', 'tool', 'SaaS Metrics Dashboard', 'ARR/MRR/churn tracking', 'Analytics', 11),
('T29', 'tool', 'Pricing Optimizer', 'Price sensitivity analysis', 'Pricing', 12),
('T29', 'tool', 'Churn Analysis Tool', 'Customer retention analysis', 'Analytics', 13),
('T29', 'tool', 'NRR Calculator', 'Net Revenue Retention', 'Analytics', 14),
('T29', 'tool', 'LTV/CAC Calculator', 'Unit economics analysis', 'Finance', 15),
('T29', 'tool', 'Magic Number Calculator', 'Sales efficiency metric', 'Sales', 16),
('T29', 'tool', 'Cohort Analysis Tool', 'Revenue cohort tracking', 'Analytics', 17),
('T29', 'tool', 'SaaS Valuation Calculator', 'Revenue multiple analysis', 'Finance', 18),
('T29', 'tool', 'Feature Adoption Tracker', 'Product usage analytics', 'Product', 19),
('T29', 'tool', 'Expansion Revenue Planner', 'Upsell/cross-sell modeling', 'Sales', 20),
('T29', 'tool', 'Customer Health Scorer', 'Churn risk prediction', 'Customer Success', 21),
('T29', 'tool', 'GDPR Compliance Checker', 'Data protection assessment', 'Legal', 22);

-- T30: International Expansion Toolkit Resources
INSERT INTO "ToolkitResource" ("toolkitCode", "resourceType", title, description, category, "orderIndex") VALUES
-- Templates (15)
('T30', 'template', 'FEMA ODI Application', 'Overseas Direct Investment form', 'FEMA', 1),
('T30', 'template', 'LRS Declaration Form', 'Liberalised Remittance Scheme', 'FEMA', 2),
('T30', 'template', 'Delaware C-Corp Formation', 'US entity incorporation', 'Entity Setup', 3),
('T30', 'template', 'Subsidiary Board Resolution', 'Parent company approval', 'Entity Setup', 4),
('T30', 'template', 'Intercompany Loan Agreement', 'Cross-border funding', 'Finance', 5),
('T30', 'template', 'Transfer Pricing Policy', 'Arms length documentation', 'Tax', 6),
('T30', 'template', 'International Employment Contract', 'Global employee agreement', 'HR', 7),
('T30', 'template', 'EOR Service Agreement', 'Employer of Record contract', 'HR', 8),
('T30', 'template', 'Export Invoice Template', 'International billing format', 'Trade', 9),
('T30', 'template', 'Shipping Documents Kit', 'Bill of lading, packing list', 'Trade', 10),
('T30', 'template', 'International NDA Template', 'Multi-jurisdiction NDA', 'Legal', 11),
('T30', 'template', 'Cross-Border License Agreement', 'IP licensing contract', 'Legal', 12),
('T30', 'template', 'DTAA Benefit Claim Form', 'Tax treaty application', 'Tax', 13),
('T30', 'template', 'PE Risk Assessment', 'Permanent Establishment analysis', 'Tax', 14),
('T30', 'template', 'Market Entry Business Plan', 'International expansion plan', 'Strategy', 15),
-- Tools (8)
('T30', 'tool', 'Market Assessment Matrix', 'Country comparison tool', 'Strategy', 16),
('T30', 'tool', 'FEMA Compliance Checker', 'RBI regulation assessment', 'FEMA', 17),
('T30', 'tool', 'Entity Structure Planner', 'Holding company optimizer', 'Entity Setup', 18),
('T30', 'tool', 'Transfer Pricing Calculator', 'Arms length pricing tool', 'Tax', 19),
('T30', 'tool', 'DTAA Benefit Estimator', 'Tax treaty savings', 'Tax', 20),
('T30', 'tool', 'EOR Cost Comparator', 'Global hiring cost analysis', 'HR', 21),
('T30', 'tool', 'Export Incentive Calculator', 'RoDTEP/MEIS benefits', 'Trade', 22),
('T30', 'tool', 'Currency Hedging Planner', 'Forex risk management', 'Finance', 23);

COMMIT;
