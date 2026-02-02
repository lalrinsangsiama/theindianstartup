-- THE INDIAN STARTUP - Toolkits T13, T14, T15 - Complete Resources
-- Migration: 20260129_023_toolkits_t13_t14_t15.sql
-- Purpose: Create toolkit products with templates and interactive tools

BEGIN;

-- Insert Toolkit Products
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
VALUES
(
    gen_random_uuid()::text,
    'T13',
    'Food Processing Toolkit',
    'Essential toolkit for food processing entrepreneurs - 12 premium templates including FSSAI applications, HACCP plans, cold chain calculators, and export documentation.',
    3999,
    false,
    NULL,
    NOW(),
    NOW()
),
(
    gen_random_uuid()::text,
    'T14',
    'Impact/CSR Toolkit',
    'Complete CSR engagement toolkit - 12 templates for proposals, impact reports, NGO registrations, and corporate partnership agreements plus 8 interactive calculators.',
    3999,
    false,
    NULL,
    NOW(),
    NOW()
),
(
    gen_random_uuid()::text,
    'T15',
    'Carbon Credits Toolkit',
    'Professional carbon business toolkit - 12 templates for project design documents, carbon accounting, trading agreements, and green finance applications plus 8 calculators.',
    3999,
    false,
    NULL,
    NOW(),
    NOW()
)
ON CONFLICT (code) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    price = EXCLUDED.price,
    "updatedAt" = NOW();

-- Create Resource table if not exists
CREATE TABLE IF NOT EXISTS "Resource" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "productCode" TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    "type" TEXT NOT NULL, -- 'template', 'tool', 'calculator', 'checklist', 'guide'
    category TEXT,
    "fileUrl" TEXT,
    "url" TEXT,
    "isDownloadable" BOOLEAN DEFAULT false,
    "orderIndex" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- T13: Food Processing Toolkit Resources
-- ========================================

-- Templates (12)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "fileUrl", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T13', 'FSSAI License Application Template', 'Complete Form A and Form B templates with instructions for Basic, State, and Central license applications', 'template', 'FSSAI Compliance', '/templates/t13/fssai-application-template.xlsx', false, 1, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'HACCP Plan Template', 'Comprehensive HACCP plan template covering all 7 principles with hazard analysis worksheets and CCP monitoring forms', 'template', 'Quality Certifications', '/templates/t13/haccp-plan-template.docx', false, 2, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Food Safety Manual Template', 'Complete food safety management system manual aligned with Schedule 4 and ISO 22000 requirements', 'template', 'Quality Certifications', '/templates/t13/food-safety-manual.docx', false, 3, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Product Label Design Template', 'FSSAI-compliant label design template with all mandatory declarations, nutrition facts format, and legal requirements checklist', 'template', 'Packaging & Labeling', '/templates/t13/product-label-template.ai', false, 4, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Cold Chain SOP Manual', 'Standard operating procedures for cold storage, refrigerated transport, and temperature monitoring', 'template', 'Cold Chain', '/templates/t13/cold-chain-sop-manual.docx', false, 5, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'PMFME DPR Template', 'Detailed Project Report template for PM Formalisation of Micro Food Processing scheme application', 'template', 'Government Schemes', '/templates/t13/pmfme-dpr-template.docx', false, 6, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Export Documentation Pack', 'Complete export documentation including commercial invoice, packing list, certificate of origin, and phytosanitary certificate formats', 'template', 'Export', '/templates/t13/export-documentation-pack.zip', false, 7, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'APEDA Registration Application', 'Step-by-step APEDA registration application with all supporting document formats', 'template', 'Export', '/templates/t13/apeda-registration.docx', false, 8, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Factory Layout Planning Template', 'Food processing facility layout templates with material flow, zoning, and hygiene requirements', 'template', 'Manufacturing', '/templates/t13/factory-layout-template.dwg', false, 9, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Quality Control Checklist Pack', 'Complete QC checklists for raw material inspection, in-process control, and finished goods testing', 'template', 'Quality Certifications', '/templates/t13/qc-checklist-pack.xlsx', false, 10, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Supplier Qualification Form', 'Vendor assessment and approval forms for raw material suppliers with audit checklist', 'template', 'Manufacturing', '/templates/t13/supplier-qualification.xlsx', false, 11, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Recall Plan Template', 'Product recall procedure template meeting FSSAI requirements with communication templates', 'template', 'FSSAI Compliance', '/templates/t13/recall-plan-template.docx', false, 12, NOW(), NOW());

-- Interactive Tools (8)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "url", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T13', 'FSSAI License Category Selector', 'Interactive tool to determine the correct FSSAI license category based on turnover, operations, and product type', 'tool', 'FSSAI Compliance', '/tools/t13/fssai-license-selector', true, 13, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Location Score Calculator', 'Multi-factor location analysis tool scoring potential sites on proximity to raw materials, infrastructure, labor, and state incentives', 'calculator', 'Manufacturing', '/tools/t13/location-score-calculator', true, 14, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Cold Chain Capacity Calculator', 'Calculate cold storage and refrigerated transport requirements based on production volumes and distribution network', 'calculator', 'Cold Chain', '/tools/t13/cold-chain-calculator', true, 15, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Export Readiness Assessment', 'Self-assessment tool evaluating production capacity, quality certifications, documentation readiness, and financial resources for export', 'tool', 'Export', '/tools/t13/export-readiness', true, 16, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Scheme Eligibility Checker', 'Check eligibility for PMFME, PMKSY, PLI and state schemes based on your business parameters', 'tool', 'Government Schemes', '/tools/t13/scheme-eligibility', true, 17, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Project Financial Model', 'Complete financial model with break-even analysis, IRR calculation, and sensitivity analysis for food processing projects', 'calculator', 'Financial Planning', '/tools/t13/financial-model', true, 18, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Label Compliance Validator', 'Check your product label against FSSAI labeling requirements and generate compliance report', 'tool', 'Packaging & Labeling', '/tools/t13/label-validator', true, 19, NOW(), NOW()),
(gen_random_uuid()::text, 'T13', 'Subsidy Stacking Calculator', 'Calculate total stackable subsidies from central and state schemes for your food processing project', 'calculator', 'Government Schemes', '/tools/t13/subsidy-stacking', true, 20, NOW(), NOW());

-- ========================================
-- T14: Impact/CSR Toolkit Resources
-- ========================================

-- Templates (12)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "fileUrl", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T14', 'CSR Proposal Template', 'Comprehensive CSR proposal template with executive summary, problem statement, solution approach, budget, and impact measurement plan', 'template', 'CSR Proposals', '/templates/t14/csr-proposal-template.docx', false, 1, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'CSR Pitch Deck Template', 'Professional 12-slide pitch deck template for CSR presentations with design guidelines', 'template', 'CSR Proposals', '/templates/t14/csr-pitch-deck.pptx', false, 2, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Impact Report Template', 'Annual impact report template with Theory of Change visualization, outcome metrics, and beneficiary stories', 'template', 'Impact Measurement', '/templates/t14/impact-report-template.docx', false, 3, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Section 8 Company MOA Template', 'Model Memorandum of Association for Section 8 company registration with Schedule VII aligned objects clause', 'template', 'Registration', '/templates/t14/section8-moa-template.docx', false, 4, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Trust Deed Template', 'Model Trust Deed with charitable objects for trust registration', 'template', 'Registration', '/templates/t14/trust-deed-template.docx', false, 5, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'CSR-1 Registration Guide', 'Complete guide and document checklist for CSR-1 registration on MCA portal', 'guide', 'Registration', '/templates/t14/csr1-registration-guide.pdf', false, 6, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Theory of Change Template', 'Visual Theory of Change template with inputs-activities-outputs-outcomes-impact pathway mapping', 'template', 'Impact Measurement', '/templates/t14/theory-of-change-template.pptx', false, 7, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'MOU Template for CSR Partnership', 'Standard MOU template for CSR partnerships with key clauses and negotiation guidance', 'template', 'Partnerships', '/templates/t14/csr-mou-template.docx', false, 8, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Budget Template with Justification', 'CSR project budget template with line items, unit costs, and narrative justification format', 'template', 'CSR Proposals', '/templates/t14/budget-template.xlsx', false, 9, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'FCRA Application Checklist', 'Complete FCRA registration checklist with document requirements and process guide', 'checklist', 'Registration', '/templates/t14/fcra-checklist.xlsx', false, 10, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', '12A/80G Application Pack', 'Application formats and document checklists for 12A and 80G registration', 'template', 'Registration', '/templates/t14/12a-80g-application-pack.zip', false, 11, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'ESG Compliance Tracker', 'SEBI BRSR-aligned ESG compliance tracking template for corporate reporting support', 'template', 'ESG', '/templates/t14/esg-compliance-tracker.xlsx', false, 12, NOW(), NOW());

-- Interactive Tools (8)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "url", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T14', 'Schedule VII Activity Mapper', 'Map your activities to Schedule VII categories with compliance guidance and documentation tips', 'tool', 'CSR Compliance', '/tools/t14/schedule-vii-mapper', true, 13, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Legal Structure Decision Tool', 'Compare Trust vs Society vs Section 8 based on your requirements and get recommendation', 'tool', 'Registration', '/tools/t14/legal-structure-selector', true, 14, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Impact Indicator Selector (IRIS+)', 'Select appropriate IRIS+ aligned impact indicators based on your program sector and outcomes', 'tool', 'Impact Measurement', '/tools/t14/impact-indicator-selector', true, 15, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'SROI Calculator', 'Calculate Social Return on Investment with financial proxy database and outcome valuation guidance', 'calculator', 'Impact Measurement', '/tools/t14/sroi-calculator', true, 16, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'CSR Company Research Tool', 'Research corporate CSR spending, focus areas, and contact information using MCA and annual report data', 'tool', 'Partnerships', '/tools/t14/csr-company-research', true, 17, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'SDG Alignment Scorer', 'Score your project alignment with UN Sustainable Development Goals and generate SDG impact statement', 'tool', 'Impact Measurement', '/tools/t14/sdg-alignment-scorer', true, 18, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'CSR Budget Builder', 'Build CSR project budgets with automatic category allocation, admin ratio calculation, and cost-per-beneficiary metrics', 'calculator', 'CSR Proposals', '/tools/t14/budget-builder', true, 19, NOW(), NOW()),
(gen_random_uuid()::text, 'T14', 'Investment Readiness Assessment', 'Self-assess readiness for impact investment across impact thesis, business model, team, governance, and financials', 'tool', 'Impact Investing', '/tools/t14/investment-readiness', true, 20, NOW(), NOW());

-- ========================================
-- T15: Carbon Credits Toolkit Resources
-- ========================================

-- Templates (12)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "url", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T15', 'Carbon Footprint Report Template', 'GHG Protocol compliant corporate carbon footprint report template with Scope 1, 2, 3 sections', 'template', 'Carbon Accounting', '/templates/t15/carbon-footprint-report.docx', false, 1, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Project Design Document (PDD) Template', 'VCS and Gold Standard aligned PDD template with all required sections and annexes', 'template', 'Project Development', '/templates/t15/pdd-template.docx', false, 2, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Monitoring Report Template', 'Verification-ready monitoring report template with data tables and emission reduction calculations', 'template', 'Project Development', '/templates/t15/monitoring-report-template.xlsx', false, 3, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'ERPA Template', 'Emission Reduction Purchase Agreement template with key terms, pricing mechanisms, and delivery conditions', 'template', 'Trading', '/templates/t15/erpa-template.docx', false, 4, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Stakeholder Consultation Report', 'Template for documenting stakeholder consultation process meeting VCS/GS requirements', 'template', 'Project Development', '/templates/t15/stakeholder-consultation-report.docx', false, 5, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Net Zero Strategy Template', 'Corporate Net Zero strategy document template with target setting, decarbonization pathway, and action plan', 'template', 'Net Zero', '/templates/t15/net-zero-strategy-template.docx', false, 6, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'BRSR Environment Disclosures Template', 'SEBI BRSR Principle 6 (Environment) disclosure template with data collection formats', 'template', 'ESG Compliance', '/templates/t15/brsr-environment-template.xlsx', false, 7, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'TCFD Disclosure Template', 'TCFD-aligned climate risk disclosure template covering governance, strategy, risk management, and metrics', 'template', 'ESG Compliance', '/templates/t15/tcfd-disclosure-template.docx', false, 8, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Green Bond Framework Template', 'Green bond framework template aligned with ICMA Green Bond Principles', 'template', 'Green Finance', '/templates/t15/green-bond-framework.docx', false, 9, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'SBTi Target Submission Template', 'Science Based Targets initiative target submission template with calculation worksheets', 'template', 'Net Zero', '/templates/t15/sbti-submission-template.xlsx', false, 10, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Carbon Credit Due Diligence Checklist', 'Comprehensive due diligence checklist for carbon credit quality assessment and procurement', 'checklist', 'Trading', '/templates/t15/credit-due-diligence.xlsx', false, 11, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Offset Portfolio Management Template', 'Template for managing carbon offset portfolio with vintage, registry, and retirement tracking', 'template', 'Trading', '/templates/t15/offset-portfolio-tracker.xlsx', false, 12, NOW(), NOW());

-- Interactive Tools (12)
INSERT INTO "Resource" (id, "productCode", title, description, "type", category, "url", "isDownloadable", "orderIndex", "createdAt", "updatedAt")
VALUES
(gen_random_uuid()::text, 'T15', 'Carbon Footprint Calculator (Scope 1-2-3)', 'Comprehensive GHG Protocol aligned carbon footprint calculator with India-specific emission factors', 'calculator', 'Carbon Accounting', '/tools/t15/carbon-footprint-calculator', true, 13, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'India Emission Factor Database', 'Searchable database of India-specific emission factors from CEA, IPCC, and industry sources', 'tool', 'Carbon Accounting', '/tools/t15/emission-factor-database', true, 14, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Project Additionality Screener', 'Screen carbon credit project concepts against additionality requirements with scoring', 'tool', 'Project Development', '/tools/t15/additionality-screener', true, 15, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Baseline Calculator', 'Calculate baseline emissions for carbon credit projects with methodology-specific approaches', 'calculator', 'Project Development', '/tools/t15/baseline-calculator', true, 16, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Carbon Credit Revenue Estimator', 'Estimate carbon credit revenue potential based on project type, volume, and market prices', 'calculator', 'Project Development', '/tools/t15/revenue-estimator', true, 17, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'VCS Methodology Selector', 'Find applicable VCS methodology based on project type and characteristics', 'tool', 'Project Development', '/tools/t15/methodology-selector', true, 18, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Net Zero Pathway Planner', 'Design corporate Net Zero pathway with decarbonization levers, timelines, and investment requirements', 'tool', 'Net Zero', '/tools/t15/net-zero-planner', true, 19, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Marginal Abatement Cost Curve Generator', 'Build MACC for your organization showing emission reduction options ranked by cost per tCO2e', 'calculator', 'Net Zero', '/tools/t15/macc-generator', true, 20, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Green Finance Eligibility Checker', 'Check eligibility for green bonds, climate funds, and sustainability-linked loans', 'tool', 'Green Finance', '/tools/t15/green-finance-eligibility', true, 21, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'REC Trading Calculator', 'Calculate REC requirements, costs, and trading strategies for renewable energy compliance', 'calculator', 'RECs', '/tools/t15/rec-calculator', true, 22, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'ESG Compliance Tracker', 'Track ESG compliance across BRSR, TCFD, and CDP with gap analysis and action planning', 'tool', 'ESG Compliance', '/tools/t15/esg-tracker', true, 23, NOW(), NOW()),
(gen_random_uuid()::text, 'T15', 'Carbon Credit Price Forecaster', 'Analyze carbon credit price trends and forecast future prices by credit type and standard', 'tool', 'Trading', '/tools/t15/price-forecaster', true, 24, NOW(), NOW());

COMMIT;
