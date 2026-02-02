-- P2: Incorporation & Compliance Kit - Complete Migration (Fixed)
-- 40 days, 10 modules, comprehensive legal framework
-- Uses correct PascalCase table names and camelCase columns

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_1_id TEXT;
    v_mod_2_id TEXT;
    v_mod_3_id TEXT;
    v_mod_4_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
BEGIN
    -- Generate IDs
    v_product_id := gen_random_uuid()::text;
    v_mod_1_id := gen_random_uuid()::text;
    v_mod_2_id := gen_random_uuid()::text;
    v_mod_3_id := gen_random_uuid()::text;
    v_mod_4_id := gen_random_uuid()::text;
    v_mod_5_id := gen_random_uuid()::text;
    v_mod_6_id := gen_random_uuid()::text;
    v_mod_7_id := gen_random_uuid()::text;
    v_mod_8_id := gen_random_uuid()::text;
    v_mod_9_id := gen_random_uuid()::text;
    v_mod_10_id := gen_random_uuid()::text;

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P2',
        'Incorporation & Compliance Kit - Complete',
        'Master Indian business incorporation and ongoing compliance with comprehensive legal framework. 40 days, 10 modules covering business structure selection, incorporation process, licenses, GST, banking, contracts, and ongoing compliance management.',
        4999,
        40,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW();

    -- Get the product ID (in case of conflict)
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P2';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Business Structure Selection (Days 1-4)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Business Structure Selection', 'Master all 15 business structures in India and choose the optimal structure for your startup', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Understanding Business Structures in India', 'Master all 15 business structures available in India. Understand the differences between Sole Proprietorship, Partnership, LLP, Private Limited, and more. Learn about liability protection, funding access, and tax implications for each structure.', '["Complete Business Structure Assessment", "Calculate 5-year compliance costs for each structure", "Review real case studies of structure choices", "Draft your structure justification document"]'::jsonb, '{"templates": ["Business Structure Comparison Matrix", "Cost-Benefit Analysis Calculator"], "tools": ["AI Structure Selector Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Private Limited Company Deep Dive', 'Deep dive into Private Limited Company structure - the most preferred choice for funded startups. Learn about director requirements, authorized capital, share classes, and investor-friendly provisions.', '["Understand director eligibility requirements", "Calculate optimal authorized capital", "Learn about different share classes", "Review investor-friendly clauses"]'::jsonb, '{"templates": ["Director Eligibility Checklist", "Capital Structure Template"], "tools": ["Share Class Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'LLP and Other Structures', 'Explore Limited Liability Partnership and other structures like OPC, Section 8 Company, and Partnership Firm. Understand when each is appropriate and conversion pathways.', '["Compare LLP vs Pvt Ltd for your use case", "Understand OPC limitations", "Learn Section 8 Company benefits", "Map conversion pathways"]'::jsonb, '{"templates": ["LLP Agreement Draft", "Structure Conversion Guide"], "tools": ["Structure Comparison Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Making Your Final Decision', 'Finalize your business structure decision with expert framework. Consider future funding plans, compliance burden, tax implications, and exit strategies.', '["Complete final structure decision matrix", "Document your decision rationale", "Prepare for incorporation process", "Set up professional advisor network"]'::jsonb, '{"templates": ["Decision Matrix Template", "Advisor Engagement Letter"], "tools": ["Structure Decision Wizard"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 2: Pre-Incorporation Preparation (Days 5-8)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Pre-Incorporation Preparation', 'Complete all prerequisites including DSC, DIN, and name approval before incorporation', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 5, 'Digital Signature Certificate (DSC)', 'Obtain Class 2 or Class 3 Digital Signature Certificate required for all MCA filings. Understand DSC types, vendor selection, and the application process.', '["Apply for Class 2/3 DSC", "Select authorized DSC vendor", "Complete identity verification", "Install DSC on your system"]'::jsonb, '{"templates": ["DSC Application Guide", "Vendor Comparison Chart"], "tools": ["DSC Verification Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Director Identification Number (DIN)', 'Apply for Director Identification Number for all proposed directors. Understand DIN requirements, documentation, and the SPICe+ integration.', '["Gather DIN required documents", "Submit DIN application", "Track DIN approval status", "Understand DIN compliance requirements"]'::jsonb, '{"templates": ["DIN Application Checklist", "Director KYC Form"], "tools": ["DIN Status Tracker"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Company Name Selection & Approval', 'Master the art of selecting and getting company name approved. Understand RUN process, naming guidelines, and common rejection reasons.', '["Conduct name availability search", "Prepare 2-3 name options", "Submit RUN application", "Handle name objections"]'::jsonb, '{"templates": ["Name Search Report Template", "RUN Application Guide"], "tools": ["Name Availability Checker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Document Preparation', 'Prepare all required documents for incorporation including address proof, identity documents, and authorized capital documentation.', '["Compile founder identity documents", "Arrange registered office proof", "Prepare capital subscription details", "Get documents notarized if required"]'::jsonb, '{"templates": ["Document Checklist", "Registered Office Declaration"], "tools": ["Document Verification Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 3: Incorporation Process (Days 9-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Incorporation Process', 'Execute the incorporation through SPICe+ form with all required attachments', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 9, 'SPICe+ Form Overview', 'Master the SPICe+ (INC-32) form for one-stop incorporation. Understand all parts including company incorporation, DIN allotment, PAN, TAN, GSTIN, EPFO, and ESIC registration.', '["Understand SPICe+ form structure", "Map required attachments", "Prepare form filling strategy", "Set up MCA portal access"]'::jsonb, '{"templates": ["SPICe+ Guide", "Attachment Mapping Sheet"], "tools": ["SPICe+ Form Validator"]}'::jsonb, 90, 75, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 10, 'MoA and AoA Drafting', 'Draft Memorandum of Association and Articles of Association with investor-friendly clauses. Include proper object clauses and protective provisions.', '["Draft MoA with main and ancillary objects", "Customize AoA for your needs", "Include investor-friendly provisions", "Review with legal counsel"]'::jsonb, '{"templates": ["MoA Template - Tech Startup", "AoA with ESOP Provisions"], "tools": ["MoA Object Clause Generator"]}'::jsonb, 90, 75, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 11, 'SPICe+ Filing & Submission', 'Complete SPICe+ filing with all attachments. Handle DSC signing, payment, and submission process.', '["Complete SPICe+ form filling", "Attach all required documents", "Sign with DSC", "Submit and track application"]'::jsonb, '{"templates": ["Filing Checklist", "Payment Receipt Template"], "tools": ["Application Tracker"]}'::jsonb, 90, 75, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Certificate of Incorporation', 'Receive and verify Certificate of Incorporation. Complete post-incorporation formalities and set up company records.', '["Download COI from MCA", "Verify PAN and TAN allotment", "Set up statutory registers", "Order company seal"]'::jsonb, '{"templates": ["COI Verification Checklist", "Statutory Register Formats"], "tools": ["Post-Incorporation Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 4: GST Registration (Days 13-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'GST Registration & Compliance', 'Complete GST registration and set up compliance systems for seamless tax management', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 13, 'GST Registration Process', 'Complete GST registration through the GST portal. Understand registration types, required documents, and verification process.', '["Determine GST registration type", "Gather required documents", "Complete GST REG-01 form", "Schedule Aadhaar authentication"]'::jsonb, '{"templates": ["GST Registration Guide", "Document Checklist"], "tools": ["GST Registration Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 14, 'GST Compliance Setup', 'Set up GST compliance infrastructure including invoicing, return filing calendar, and input tax credit management.', '["Configure GST-compliant invoicing", "Set up return filing calendar", "Understand ITC rules", "Implement reconciliation process"]'::jsonb, '{"templates": ["GST Invoice Format", "ITC Reconciliation Sheet"], "tools": ["GST Return Calendar"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 15, 'E-Invoicing & E-Way Bill', 'Implement e-invoicing system and e-way bill compliance for goods movement. Understand thresholds and integration requirements.', '["Check e-invoicing applicability", "Set up e-invoice generation", "Understand e-way bill rules", "Configure ERP integration"]'::jsonb, '{"templates": ["E-Invoice Setup Guide", "E-Way Bill Checklist"], "tools": ["E-Invoice Generator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 16, 'GST Return Filing Mastery', 'Master GST return filing including GSTR-1, GSTR-3B, and annual returns. Set up automated filing systems.', '["Understand return filing timeline", "Set up automated reminders", "Learn GSTR-1 and GSTR-3B filing", "Plan for annual return"]'::jsonb, '{"templates": ["Return Filing Calendar", "GSTR Reconciliation Sheet"], "tools": ["GST Filing Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 5: Banking & Financial Setup (Days 17-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Banking & Financial Setup', 'Establish corporate banking relationships and financial infrastructure', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 17, 'Corporate Bank Account Opening', 'Open corporate bank account with proper documentation. Select the right banking partner and understand account types.', '["Compare banking options", "Prepare account opening documents", "Draft board resolution", "Complete KYC process"]'::jsonb, '{"templates": ["Bank Comparison Matrix", "Board Resolution Format"], "tools": ["Bank Selection Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 18, 'Payment Gateway Setup', 'Set up payment gateway for online transactions. Understand integration options and compliance requirements.', '["Compare payment gateway options", "Complete merchant onboarding", "Integrate with website/app", "Test payment flows"]'::jsonb, '{"templates": ["Gateway Comparison Chart", "Integration Checklist"], "tools": ["Payment Gateway Selector"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 19, 'Accounting System Setup', 'Implement accounting system aligned with Indian accounting standards. Set up chart of accounts and reporting structure.', '["Select accounting software", "Configure chart of accounts", "Set up tax configurations", "Train team on usage"]'::jsonb, '{"templates": ["Chart of Accounts Template", "Accounting Policy Manual"], "tools": ["Software Comparison Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 20, 'Financial Controls & Policies', 'Establish financial controls, approval workflows, and expense policies for sound financial management.', '["Define approval matrix", "Create expense policies", "Set up reimbursement process", "Implement audit trails"]'::jsonb, '{"templates": ["Approval Matrix Template", "Expense Policy Document"], "tools": ["Workflow Builder"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 6: Licenses & Permits (Days 21-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Licenses & Permits', 'Obtain all required business licenses and permits for legal operations', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 21, 'Shop & Establishment Registration', 'Register under Shop & Establishment Act applicable to your state. Understand requirements and compliance obligations.', '["Identify applicable state rules", "Gather required documents", "Submit application", "Obtain registration certificate"]'::jsonb, '{"templates": ["S&E Application Guide", "State-wise Requirements"], "tools": ["S&E Compliance Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 22, 'Professional Tax Registration', 'Register for Professional Tax in applicable states. Understand rate slabs and compliance requirements.', '["Check PT applicability", "Register as employer", "Set up PT deductions", "File periodic returns"]'::jsonb, '{"templates": ["PT Registration Guide", "State-wise PT Rates"], "tools": ["PT Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 23, 'Industry-Specific Licenses', 'Identify and obtain industry-specific licenses required for your business operations.', '["Map required licenses", "Prepare applications", "Submit to authorities", "Track approval status"]'::jsonb, '{"templates": ["License Mapping Template", "Application Formats"], "tools": ["License Requirement Analyzer"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 24, 'License Compliance Management', 'Set up ongoing license compliance management including renewals and amendments.', '["Create license inventory", "Set renewal reminders", "Plan for amendments", "Maintain compliance records"]'::jsonb, '{"templates": ["License Inventory Sheet", "Renewal Calendar"], "tools": ["Compliance Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 7: Employment & Labor Compliance (Days 25-28)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Employment & Labor Compliance', 'Master labor law compliance including PF, ESI, and employment documentation', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 25, 'EPF Registration & Compliance', 'Register for Employee Provident Fund and understand contribution rules and compliance requirements.', '["Register for EPF", "Understand contribution structure", "Set up monthly filings", "Handle employee queries"]'::jsonb, '{"templates": ["EPF Registration Guide", "Contribution Calculator"], "tools": ["EPF Compliance Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 26, 'ESI Registration & Benefits', 'Register for Employee State Insurance and understand coverage, contributions, and benefits.', '["Check ESI applicability", "Complete registration", "Understand contribution rates", "Inform employees about benefits"]'::jsonb, '{"templates": ["ESI Registration Guide", "Benefits Summary"], "tools": ["ESI Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 27, 'Employment Documentation', 'Create comprehensive employment documentation including offer letters, contracts, and HR policies.', '["Draft employment contracts", "Create HR policy manual", "Prepare offer letter templates", "Set up employee files"]'::jsonb, '{"templates": ["Employment Contract Template", "HR Policy Manual"], "tools": ["Contract Generator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 28, 'Labor Law Compliance Calendar', 'Set up comprehensive labor law compliance calendar and reporting systems.', '["Map all compliance deadlines", "Set up automated reminders", "Create filing checklists", "Establish audit procedures"]'::jsonb, '{"templates": ["Compliance Calendar", "Filing Checklist"], "tools": ["Labor Compliance Dashboard"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 8: Contracts & Agreements (Days 29-32)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Contracts & Agreements', 'Draft and manage essential business contracts and agreements', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 29, 'Founders Agreement', 'Draft comprehensive founders agreement covering equity, vesting, IP assignment, and decision-making.', '["Draft founders agreement", "Define equity structure", "Include vesting schedule", "Add IP assignment clause"]'::jsonb, '{"templates": ["Founders Agreement Template", "Equity Calculator"], "tools": ["Vesting Schedule Generator"]}'::jsonb, 75, 60, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 30, 'Vendor & Client Contracts', 'Create standard vendor and client contracts with appropriate terms and protections.', '["Draft vendor agreement", "Create client contract", "Include payment terms", "Add liability clauses"]'::jsonb, '{"templates": ["Vendor Agreement Template", "Client Contract Template"], "tools": ["Contract Clause Library"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 31, 'NDA & Confidentiality', 'Master non-disclosure agreements and confidentiality provisions for protecting business secrets.', '["Draft mutual NDA", "Create one-way NDA", "Understand confidentiality scope", "Set up NDA tracking"]'::jsonb, '{"templates": ["Mutual NDA Template", "One-Way NDA Template"], "tools": ["NDA Generator"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 32, 'Contract Management System', 'Implement contract management system for tracking, renewals, and compliance.', '["Select contract management tool", "Digitize existing contracts", "Set up renewal alerts", "Implement approval workflow"]'::jsonb, '{"templates": ["Contract Inventory Sheet", "Renewal Tracker"], "tools": ["Contract Management Software Comparison"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 9: Ongoing Compliance (Days 33-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Ongoing Compliance', 'Master annual compliance requirements and corporate governance', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 33, 'Annual ROC Filings', 'Master annual ROC filings including AOC-4, MGT-7, and other statutory returns.', '["Understand filing requirements", "Prepare financial statements", "Complete AOC-4 filing", "File MGT-7 annual return"]'::jsonb, '{"templates": ["ROC Filing Checklist", "Timeline Template"], "tools": ["Filing Tracker"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 34, 'Board Meetings & Minutes', 'Conduct board meetings with proper documentation and maintain minutes as per Companies Act.', '["Schedule board meetings", "Prepare meeting agenda", "Record minutes properly", "Maintain minute book"]'::jsonb, '{"templates": ["Board Meeting Agenda", "Minutes Template"], "tools": ["Meeting Scheduler"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 35, 'Statutory Registers', 'Maintain all statutory registers required under Companies Act and ensure regular updates.', '["Set up register of members", "Maintain register of directors", "Update charge register", "Keep share transfer register"]'::jsonb, '{"templates": ["Register Formats Pack", "Update Checklist"], "tools": ["Register Management System"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 36, 'Income Tax Compliance', 'Complete income tax compliance including advance tax, TDS, and return filing.', '["Calculate advance tax", "Set up TDS compliance", "File income tax returns", "Handle tax notices"]'::jsonb, '{"templates": ["Tax Calendar", "TDS Matrix"], "tools": ["Tax Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 10: Compliance Automation (Days 37-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Compliance Automation & Scaling', 'Automate compliance processes and prepare for scaling your business', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 37, 'Compliance Dashboard Setup', 'Create comprehensive compliance dashboard for real-time monitoring and alerts.', '["Select compliance software", "Configure dashboards", "Set up alert systems", "Train team on monitoring"]'::jsonb, '{"templates": ["Dashboard Template", "KPI Definitions"], "tools": ["Compliance Software Comparison"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 38, 'Automation Tools & Integration', 'Implement automation tools for routine compliance tasks and integrate systems.', '["Map automation opportunities", "Select tools", "Configure integrations", "Test automated workflows"]'::jsonb, '{"templates": ["Automation Checklist", "Integration Map"], "tools": ["Automation Platform Comparison"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 39, 'Scaling Compliance Systems', 'Prepare compliance systems for business growth including multi-state and multi-entity operations.', '["Plan for multi-state presence", "Understand entity structuring", "Prepare for international expansion", "Build scalable processes"]'::jsonb, '{"templates": ["Scaling Checklist", "Entity Structure Guide"], "tools": ["Growth Planning Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 40, 'Compliance Audit & Review', 'Conduct comprehensive compliance audit and establish ongoing review processes.', '["Perform self-audit", "Identify gaps", "Create remediation plan", "Establish review cadence"]'::jsonb, '{"templates": ["Audit Checklist", "Gap Analysis Template"], "tools": ["Audit Management System"]}'::jsonb, 60, 50, 4, NOW(), NOW());

END $$;

COMMIT;
