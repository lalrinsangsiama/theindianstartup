-- P5: Legal Stack - Bulletproof Legal Framework (Fixed)
-- 45 days, 12 modules, comprehensive legal infrastructure
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
    v_mod_11_id TEXT;
    v_mod_12_id TEXT;
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
    v_mod_11_id := gen_random_uuid()::text;
    v_mod_12_id := gen_random_uuid()::text;

    -- Insert/Update Product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        v_product_id,
        'P5',
        'Legal Stack - Bulletproof Legal Framework',
        'Build bulletproof legal infrastructure with contracts, IP protection, and dispute prevention. 45 days, 12 modules covering contract mastery, IP strategy, employment law, data protection, and M&A readiness.',
        7999,
        45,
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
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P5';

    -- Clean existing modules and lessons for this product
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- Module 1: Legal Foundation (Days 1-4)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_1_id, v_product_id, 'Legal Foundation', 'Build the foundation of your legal infrastructure', 1, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_1_id, 1, 'Legal Landscape for Startups', 'Understand the legal landscape for Indian startups including key laws, regulations, and compliance requirements.', '["Map applicable laws", "Identify compliance requirements", "Understand regulatory landscape", "Plan legal infrastructure"]'::jsonb, '{"templates": ["Legal Landscape Guide", "Compliance Matrix"], "tools": ["Legal Assessment"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 2, 'Building Legal Infrastructure', 'Design comprehensive legal infrastructure for your startup from day one.', '["Define legal needs", "Select legal partners", "Create document management", "Set up legal processes"]'::jsonb, '{"templates": ["Legal Infrastructure Checklist", "Partner Selection Guide"], "tools": ["Legal Needs Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 3, 'Legal Team & Advisors', 'Build your legal team and advisor network for comprehensive legal support.', '["Identify legal needs", "Select external counsel", "Build advisor network", "Manage relationships"]'::jsonb, '{"templates": ["Advisor Selection Matrix", "Engagement Letter"], "tools": ["Legal Partner Finder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_1_id, 4, 'Legal Risk Assessment', 'Conduct comprehensive legal risk assessment and develop mitigation strategies.', '["Identify legal risks", "Assess likelihood and impact", "Prioritize risks", "Create mitigation plan"]'::jsonb, '{"templates": ["Risk Assessment Template", "Mitigation Tracker"], "tools": ["Risk Analyzer"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 2: Contract Mastery (Days 5-8)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_2_id, v_product_id, 'Contract Mastery', 'Master the art of drafting and negotiating contracts', 2, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_2_id, 5, 'Contract Fundamentals', 'Master contract fundamentals including essential elements, enforceability, and common pitfalls.', '["Understand contract elements", "Learn enforceability rules", "Identify common pitfalls", "Create contract checklist"]'::jsonb, '{"templates": ["Contract Essentials Guide", "Review Checklist"], "tools": ["Contract Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 6, 'Commercial Contracts', 'Draft and negotiate commercial contracts including sales, services, and partnership agreements.', '["Draft sales agreement", "Create service contract", "Negotiate partnership terms", "Review liability clauses"]'::jsonb, '{"templates": ["Commercial Contract Pack", "Negotiation Guide"], "tools": ["Contract Generator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 7, 'Vendor Agreements', 'Create robust vendor agreements with proper terms, SLAs, and liability protection.', '["Draft vendor agreement", "Define SLAs", "Include termination clauses", "Manage vendor relationships"]'::jsonb, '{"templates": ["Vendor Agreement Template", "SLA Framework"], "tools": ["Vendor Contract Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_2_id, 8, 'Contract Negotiation', 'Master contract negotiation techniques for favorable terms.', '["Prepare negotiation strategy", "Identify negotiable terms", "Handle pushback", "Close deals effectively"]'::jsonb, '{"templates": ["Negotiation Playbook", "Term Priority Matrix"], "tools": ["Negotiation Tracker"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 3: Founder Agreements (Days 9-12)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_3_id, v_product_id, 'Founder Agreements', 'Create bulletproof founder agreements and equity structures', 3, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_3_id, 9, 'Founders Agreement Essentials', 'Draft comprehensive founders agreement covering all critical aspects.', '["Define equity split", "Include vesting provisions", "Add IP assignment", "Set decision-making rules"]'::jsonb, '{"templates": ["Founders Agreement Template", "Equity Calculator"], "tools": ["FA Builder"]}'::jsonb, 75, 60, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 10, 'Vesting & Cliff Structures', 'Design vesting schedules that protect all parties and incentivize long-term commitment.', '["Design vesting schedule", "Set cliff period", "Plan acceleration triggers", "Document clearly"]'::jsonb, '{"templates": ["Vesting Schedule Template", "Acceleration Guide"], "tools": ["Vesting Calculator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 11, 'Founder Exit Mechanisms', 'Plan for founder exits with proper buyback provisions and dispute resolution.', '["Define exit scenarios", "Set buyback terms", "Include non-compete clauses", "Plan dispute resolution"]'::jsonb, '{"templates": ["Exit Provisions Template", "Buyback Calculator"], "tools": ["Exit Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_3_id, 12, 'Shareholder Agreements', 'Create shareholder agreements with investor-friendly and founder-protective provisions.', '["Draft SHA", "Include protective provisions", "Add transfer restrictions", "Plan for future rounds"]'::jsonb, '{"templates": ["SHA Template", "Provision Library"], "tools": ["SHA Builder"]}'::jsonb, 75, 60, 4, NOW(), NOW());

    -- Module 4: IP Strategy (Days 13-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_4_id, v_product_id, 'IP Strategy & Protection', 'Build comprehensive IP strategy for protecting your innovations', 4, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_4_id, 13, 'IP Portfolio Strategy', 'Develop comprehensive IP strategy aligned with your business objectives.', '["Identify IP assets", "Evaluate protection options", "Create IP roadmap", "Allocate budget"]'::jsonb, '{"templates": ["IP Strategy Template", "Asset Inventory"], "tools": ["IP Assessment Tool"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 14, 'Trademark Protection', 'Protect your brand through comprehensive trademark strategy.', '["Conduct TM search", "File applications", "Monitor for infringement", "Enforce rights"]'::jsonb, '{"templates": ["TM Application Guide", "Watch Service Setup"], "tools": ["TM Search Tool"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 15, 'Copyright & Trade Secrets', 'Protect software, content, and confidential information effectively.', '["Register copyrights", "Implement trade secret protection", "Create confidentiality policies", "Train employees"]'::jsonb, '{"templates": ["Copyright Registration Guide", "Trade Secret Policy"], "tools": ["Protection Checklist"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_4_id, 16, 'IP Agreements', 'Create comprehensive IP agreements including assignments, licenses, and NDAs.', '["Draft IP assignment", "Create license agreements", "Prepare robust NDAs", "Manage IP contracts"]'::jsonb, '{"templates": ["IP Agreement Pack", "NDA Templates"], "tools": ["Agreement Generator"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 5: Employment Law (Days 17-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_5_id, v_product_id, 'Employment Law Compliance', 'Master employment law compliance for safe and compliant hiring', 5, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_5_id, 17, 'Employment Contract Mastery', 'Draft comprehensive employment contracts with proper protections.', '["Create employment template", "Include IP assignment", "Add confidentiality clauses", "Set termination terms"]'::jsonb, '{"templates": ["Employment Contract Template", "Clause Library"], "tools": ["Contract Builder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 18, 'Contractor vs Employee', 'Navigate contractor vs employee classification and avoid misclassification risks.', '["Understand classification rules", "Evaluate relationships", "Draft contractor agreements", "Manage compliance"]'::jsonb, '{"templates": ["Classification Guide", "Contractor Agreement"], "tools": ["Classification Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 19, 'HR Policies & Handbook', 'Create comprehensive HR policies and employee handbook.', '["Draft policy manual", "Create employee handbook", "Include required policies", "Get legal review"]'::jsonb, '{"templates": ["Policy Manual Template", "Handbook Template"], "tools": ["Policy Builder"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_5_id, 20, 'Termination & Separation', 'Handle employee termination and separation legally and professionally.', '["Understand termination rules", "Create separation process", "Draft release agreements", "Manage exit interviews"]'::jsonb, '{"templates": ["Termination Checklist", "Release Agreement"], "tools": ["Separation Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 6: Data Protection (Days 21-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_6_id, v_product_id, 'Data Protection & Privacy', 'Implement comprehensive data protection and privacy compliance', 6, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_6_id, 21, 'Indian Data Protection Framework', 'Understand Indian data protection laws and compliance requirements.', '["Study DPDP Act", "Map data processing activities", "Identify compliance gaps", "Create action plan"]'::jsonb, '{"templates": ["DPDP Compliance Guide", "Data Mapping Template"], "tools": ["Compliance Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 22, 'Privacy Policy & Notices', 'Create compliant privacy policies and consent mechanisms.', '["Draft privacy policy", "Create consent forms", "Implement cookie notices", "Update regularly"]'::jsonb, '{"templates": ["Privacy Policy Template", "Consent Form"], "tools": ["Policy Generator"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 23, 'Data Processing Agreements', 'Implement proper data processing agreements with vendors and partners.', '["Draft DPA template", "Review vendor contracts", "Include required provisions", "Track agreements"]'::jsonb, '{"templates": ["DPA Template", "Vendor Review Checklist"], "tools": ["DPA Manager"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_6_id, 24, 'Data Breach Response', 'Develop comprehensive data breach response plan and procedures.', '["Create incident response plan", "Set notification procedures", "Train response team", "Document incidents"]'::jsonb, '{"templates": ["Breach Response Plan", "Notification Template"], "tools": ["Incident Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 7: Regulatory Compliance (Days 25-28)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_7_id, v_product_id, 'Regulatory Compliance', 'Navigate industry-specific regulatory requirements', 7, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_7_id, 25, 'Regulatory Landscape Mapping', 'Map all regulatory requirements applicable to your business.', '["Identify applicable regulations", "Map compliance requirements", "Create compliance calendar", "Assign responsibilities"]'::jsonb, '{"templates": ["Regulatory Matrix", "Compliance Calendar"], "tools": ["Regulation Finder"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 26, 'Industry-Specific Compliance', 'Navigate industry-specific regulations like fintech, healthtech, or e-commerce.', '["Identify sector regulations", "Understand requirements", "Plan compliance", "Monitor changes"]'::jsonb, '{"templates": ["Sector Compliance Guide", "Requirement Tracker"], "tools": ["Sector Analyzer"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 27, 'Consumer Protection', 'Comply with consumer protection laws and e-commerce regulations.', '["Understand consumer rights", "Draft compliant terms", "Handle complaints", "Maintain records"]'::jsonb, '{"templates": ["T&C Template", "Complaint Resolution Guide"], "tools": ["Consumer Compliance Tool"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_7_id, 28, 'Advertising & Marketing Law', 'Navigate advertising regulations and avoid legal pitfalls in marketing.', '["Understand ad regulations", "Review marketing materials", "Comply with disclosure rules", "Handle influencer agreements"]'::jsonb, '{"templates": ["Ad Compliance Checklist", "Influencer Agreement"], "tools": ["Marketing Review Tool"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 8: Dispute Prevention (Days 29-32)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_8_id, v_product_id, 'Dispute Prevention & Resolution', 'Prevent disputes and resolve them effectively when they occur', 8, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_8_id, 29, 'Dispute Prevention Strategies', 'Implement proactive strategies to prevent disputes before they arise.', '["Identify dispute risks", "Improve contract clarity", "Document interactions", "Train team"]'::jsonb, '{"templates": ["Risk Assessment Template", "Documentation Guide"], "tools": ["Risk Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 30, 'Dispute Resolution Mechanisms', 'Design effective dispute resolution clauses and mechanisms.', '["Choose resolution method", "Draft ADR clauses", "Select arbitration rules", "Plan enforcement"]'::jsonb, '{"templates": ["ADR Clause Library", "Arbitration Guide"], "tools": ["Clause Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 31, 'Managing Active Disputes', 'Handle active disputes effectively with proper documentation and strategy.', '["Assess dispute", "Develop strategy", "Document evidence", "Engage counsel"]'::jsonb, '{"templates": ["Dispute Log Template", "Evidence Checklist"], "tools": ["Dispute Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_8_id, 32, 'Settlement Negotiations', 'Negotiate favorable settlements while protecting business interests.', '["Evaluate settlement options", "Prepare negotiation", "Draft settlement agreement", "Ensure enforcement"]'::jsonb, '{"templates": ["Settlement Agreement Template", "Negotiation Guide"], "tools": ["Settlement Calculator"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 9: Corporate Governance (Days 33-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_9_id, v_product_id, 'Corporate Governance', 'Implement best-in-class corporate governance practices', 9, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_9_id, 33, 'Board Governance', 'Establish effective board governance practices and structures.', '["Define board composition", "Create governance charter", "Set meeting cadence", "Document procedures"]'::jsonb, '{"templates": ["Governance Charter", "Board Policy"], "tools": ["Governance Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 34, 'Director Duties & Liabilities', 'Understand director duties, liabilities, and protections.', '["Study director duties", "Understand liabilities", "Implement D&O insurance", "Create indemnification"]'::jsonb, '{"templates": ["Duties Guide", "Indemnification Agreement"], "tools": ["Liability Assessment"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 35, 'Related Party Transactions', 'Navigate related party transaction compliance and approvals.', '["Identify RPTs", "Implement approval process", "Document transactions", "File disclosures"]'::jsonb, '{"templates": ["RPT Policy", "Approval Template"], "tools": ["RPT Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_9_id, 36, 'Corporate Records Management', 'Maintain comprehensive corporate records and documentation.', '["Organize records", "Maintain statutory registers", "Archive documents", "Ensure accessibility"]'::jsonb, '{"templates": ["Records Checklist", "Register Templates"], "tools": ["Records Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 10: Investment Documentation (Days 37-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_10_id, v_product_id, 'Investment Documentation', 'Master investment documentation for fundraising', 10, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_10_id, 37, 'Term Sheet Navigation', 'Understand and negotiate term sheets effectively.', '["Understand term sheet provisions", "Identify key terms", "Negotiate effectively", "Avoid pitfalls"]'::jsonb, '{"templates": ["Term Sheet Guide", "Negotiation Checklist"], "tools": ["Term Analyzer"]}'::jsonb, 75, 60, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 38, 'Investment Agreements', 'Draft and review investment agreements including SHA and SSA.', '["Review SHA provisions", "Negotiate protective terms", "Handle representations", "Plan closing"]'::jsonb, '{"templates": ["SHA Template", "SSA Template"], "tools": ["Agreement Analyzer"]}'::jsonb, 75, 60, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 39, 'Due Diligence Support', 'Prepare for and manage legal due diligence process.', '["Organize documents", "Prepare disclosure schedule", "Address red flags", "Support DD process"]'::jsonb, '{"templates": ["DD Checklist", "Disclosure Template"], "tools": ["DD Tracker"]}'::jsonb, 60, 50, 3, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_10_id, 40, 'Closing & Post-Closing', 'Manage transaction closing and post-closing compliance.', '["Prepare closing checklist", "Execute documents", "Complete filings", "Implement governance"]'::jsonb, '{"templates": ["Closing Checklist", "Filing Tracker"], "tools": ["Closing Manager"]}'::jsonb, 60, 50, 4, NOW(), NOW());

    -- Module 11: International Operations (Days 41-43)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_11_id, v_product_id, 'International Operations', 'Navigate legal requirements for international operations', 11, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_11_id, 41, 'Cross-Border Transactions', 'Navigate legal requirements for international transactions.', '["Understand FEMA requirements", "Structure transactions", "Handle forex compliance", "Document properly"]'::jsonb, '{"templates": ["Cross-Border Guide", "FEMA Checklist"], "tools": ["Transaction Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 42, 'International Contracts', 'Draft contracts for international customers and vendors.', '["Choose governing law", "Handle jurisdiction", "Include arbitration", "Plan enforcement"]'::jsonb, '{"templates": ["International Contract Template", "Jurisdiction Guide"], "tools": ["Contract Builder"]}'::jsonb, 60, 50, 2, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_11_id, 43, 'Entity Structuring', 'Plan international entity structures for operations and tax efficiency.', '["Evaluate structures", "Plan subsidiaries", "Handle transfer pricing", "Maintain compliance"]'::jsonb, '{"templates": ["Structure Analysis", "TP Documentation"], "tools": ["Structure Planner"]}'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Module 12: M&A Readiness (Days 44-45)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (v_mod_12_id, v_product_id, 'M&A Readiness', 'Prepare your legal infrastructure for M&A transactions', 12, NOW(), NOW());

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt") VALUES
    (gen_random_uuid()::text, v_mod_12_id, 44, 'M&A Legal Preparation', 'Prepare legal infrastructure for potential M&A transactions.', '["Organize legal records", "Clean up cap table", "Address pending issues", "Prepare documentation"]'::jsonb, '{"templates": ["M&A Readiness Checklist", "Legal Audit Template"], "tools": ["Readiness Analyzer"]}'::jsonb, 60, 50, 1, NOW(), NOW()),
    (gen_random_uuid()::text, v_mod_12_id, 45, 'Exit Documentation', 'Understand and prepare for M&A transaction documentation.', '["Understand M&A structures", "Review typical terms", "Prepare for DD", "Plan transaction"]'::jsonb, '{"templates": ["M&A Guide", "Exit Checklist"], "tools": ["Exit Planner"]}'::jsonb, 60, 50, 2, NOW(), NOW());

END $$;

COMMIT;
