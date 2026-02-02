-- THE INDIAN STARTUP - P13: Food Processing Mastery - Complete Content
-- Migration: 20260129_020_p13_food_processing_course.sql
-- Purpose: Create comprehensive food processing course with 10 modules and 50 lessons

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
    v_module_5_id TEXT;
    v_module_6_id TEXT;
    v_module_7_id TEXT;
    v_module_8_id TEXT;
    v_module_9_id TEXT;
    v_module_10_id TEXT;
BEGIN
    -- Insert P13 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P13',
        'Food Processing Mastery',
        'Complete guide to food processing business in India - FSSAI compliance, manufacturing setup, quality certifications, cold chain logistics, government subsidies (PMFME, PMKSY, PLI), and APEDA export regulations.',
        7999,
        false,
        50,
        NOW(),
        NOW()
    )
    ON CONFLICT (code) DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        price = EXCLUDED.price,
        "estimatedDays" = EXCLUDED."estimatedDays",
        "updatedAt" = NOW()
    RETURNING id INTO v_product_id;

    -- Clean existing modules and lessons for P13
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Food Processing Fundamentals (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Food Processing Fundamentals',
        'Understand the Indian food processing landscape, market opportunities, regulatory environment, and strategic business models',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Indian Food Processing Industry Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Indian Food Processing Industry Overview',
        'India''s food processing industry is valued at $535 billion and growing at 11% CAGR. The sector contributes 13% to India''s GDP and employs 13 million people. Key sub-sectors include dairy processing (largest), fruits & vegetables, grains & cereals, meat & poultry, fisheries, packaged foods, and beverages. Government initiatives like PM Kisan SAMPADA, PLI scheme, and PMFME are driving formalization and growth.',
        '["Analyze market size and growth trends for your target food category", "Identify top 10 players in your chosen sub-sector and study their business models", "Map the value chain from farm to consumer for your product category", "Calculate addressable market size using TAM-SAM-SOM framework"]'::jsonb,
        '["Industry Overview Template", "Market Size Calculator", "Value Chain Mapping Tool", "Competitor Analysis Matrix"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Business Model Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Business Model Selection for Food Processing',
        'Choose from 5 proven business models: B2C branded products (direct consumer), B2B bulk processing (institutional sales), Contract manufacturing (white label), Export-focused processing (APEDA/global markets), or Farm-to-Fork integrated model. Each model has different capital requirements, margins, and regulatory compliance needs. B2C offers 40-60% margins but requires marketing investment; B2B provides 15-25% margins with volume stability.',
        '["Evaluate each business model against your capital and expertise", "Create financial projections for top 2 business models", "Identify key success factors and risks for your chosen model", "Define your unique value proposition and competitive moat"]'::jsonb,
        '["Business Model Canvas Template", "Financial Projection Model", "Risk Assessment Framework", "Value Proposition Designer"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Regulatory Landscape Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Regulatory Landscape for Food Processing',
        'Food processing is regulated by multiple agencies: FSSAI (food safety), State FDA (licensing), BIS (standards), APEDA (exports), AGMARK (grading), and state pollution control boards. Key legislations include Food Safety and Standards Act 2006, Legal Metrology Act 2009, and Environment Protection Act 1986. Compliance costs range from Rs 50,000 for small units to Rs 10+ lakhs for large manufacturing facilities.',
        '["Create a compliance checklist for your food category", "Map all regulatory bodies and their jurisdiction", "Estimate total compliance costs for Year 1", "Create a regulatory timeline with all milestones"]'::jsonb,
        '["Regulatory Compliance Checklist", "Authority Contact Directory", "Compliance Cost Calculator", "Timeline Planning Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Location Strategy and Site Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Location Strategy and Site Selection',
        'Location significantly impacts profitability through proximity to raw materials, labor costs, infrastructure, and state incentives. Food processing zones and Mega Food Parks offer ready infrastructure with 35-50% subsidies. Key states with incentives: Andhra Pradesh (35% capital subsidy), Gujarat (25% subsidy + interest subvention), Maharashtra (Mega Food Parks), Karnataka (50% on quality certification), and Punjab (dairy focus).',
        '["Score potential locations using the Location Assessment Matrix", "Compare state-wise incentives for your food category", "Visit 2-3 potential sites and document infrastructure", "Calculate landed cost comparison across locations"]'::jsonb,
        '["Location Score Calculator", "State Incentive Comparison Tool", "Site Visit Checklist", "Landed Cost Analysis Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Financial Planning and Capital Structure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Financial Planning and Capital Structure',
        'Food processing requires significant working capital due to raw material seasonality and inventory requirements. Typical capital structure: 30-40% equity, 40-50% term loan, 10-20% working capital loan. NABARD, SIDBI, and commercial banks offer specialized schemes. Key ratios to maintain: Current ratio >1.33, Debt-equity <2:1, DSCR >1.5. Plan for 18-24 months to break-even for new units.',
        '["Create detailed project report with capital requirements", "Apply for NABARD/SIDBI eligibility assessment", "Design optimal capital structure with cost of capital analysis", "Build 5-year financial model with sensitivity analysis"]'::jsonb,
        '["Project Report Template", "Financial Model with Break-even", "Loan Eligibility Calculator", "Sensitivity Analysis Tool"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: FSSAI Compliance Mastery (Days 6-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'FSSAI Compliance Mastery',
        'Complete guide to FSSAI registration, licensing, food safety standards, labeling requirements, and compliance management',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 6: FSSAI License Categories
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'FSSAI License Categories and Selection',
        'FSSAI licenses are categorized by turnover: Basic Registration (up to Rs 12 lakh turnover, fee Rs 100/year), State License (Rs 12 lakh to Rs 20 crore, fee Rs 2,000-5,000/year), and Central License (above Rs 20 crore or multi-state operations, fee Rs 7,500/year). Manufacturing units always require minimum State License regardless of turnover. License validity is 1-5 years; apply 60 days before expiry for renewal.',
        '["Determine correct license category for your operation", "Calculate total FSSAI fees for 5-year license", "Prepare list of documents required for application", "Create timeline for license application process"]'::jsonb,
        '["FSSAI License Category Selector Tool", "Fee Calculator", "Document Checklist by Category", "Application Timeline Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Basic and State License Application
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Basic and State License Application Process',
        'Apply through FSSAI FoSCoS portal (foscos.fssai.gov.in). Basic registration requires Form A with address proof and photo. State License requires Form B with: Blueprint/layout plan, List of equipment, Water test report, Food category details, NOC from municipality/panchayat, and Photo ID. Processing time: 7 days for Basic, 60 days for State. Track application through FoSCoS dashboard.',
        '["Create FoSCoS portal account and verify email/mobile", "Prepare all documents as per checklist", "Complete Form A/B with accurate information", "Submit application and note reference number"]'::jsonb,
        '["Form A/B Filling Guide", "Document Preparation Checklist", "FoSCoS Portal Navigation Guide", "Common Rejection Reasons and Solutions"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Central License Application
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Central License Application and Inspection',
        'Central License requires additional documents: Manufacturing process flow chart, HACCP/ISO certification (if any), List of directors/partners, Recall plan, Source of raw materials. Inspection is mandatory before Central License issuance. Inspector checks: Hygiene standards, Equipment calibration, Pest control measures, Water quality, Personal hygiene of workers, Record keeping systems.',
        '["Prepare manufacturing process documentation", "Design and implement recall plan procedure", "Schedule pre-inspection internal audit", "Train staff on inspection readiness protocols"]'::jsonb,
        '["Central License Document Checklist", "Inspection Preparation Guide", "Manufacturing Process Documentation Template", "Recall Plan Template"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Food Safety Standards Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Food Safety Standards and Product Standards',
        'FSS Regulations 2011 define standards for all food categories. Key regulations: Licensing & Registration (Chapter 2), Packaging & Labelling (Chapter 3), Contaminants & Toxins (Chapter 4), Food Additives (Chapter 5). Product-specific standards cover composition, additives limits, microbiological criteria. Non-compliance attracts penalties from Rs 25,000 to Rs 10 lakh and imprisonment up to 6 years for serious violations.',
        '["Identify applicable product standards for your food category", "Create specification sheet meeting all FSSAI standards", "Design quality control protocols for each standard", "Set up testing schedule for regulatory parameters"]'::jsonb,
        '["Product Standards Quick Reference", "Specification Sheet Template", "Quality Control Protocol Guide", "Testing Schedule Planner"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Labeling Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Food Labeling Regulations and Compliance',
        'Mandatory label declarations: Product name, List of ingredients (descending order), Nutritional information (per 100g and per serve), Allergen declaration, Net quantity, Date markings (MFG, BB/EXP), FSSAI license number with logo, Name and address of manufacturer/importer, Country of origin, Veg/Non-veg symbol. Font sizes: Principal display ≥1.5mm for small packs, ≥3mm for large. Claims must comply with FSS (Claims & Advertisement) Regulations.',
        '["Design label layout meeting all FSSAI requirements", "Calculate and verify nutritional information accuracy", "Review claims against permissible claims list", "Get label artwork approved by regulatory consultant"]'::jsonb,
        '["Label Design Checklist", "Nutritional Calculator Tool", "Permissible Claims Database", "Label Compliance Validator"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 11: Food Safety Management System
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'Implementing Food Safety Management System',
        'Schedule 4 of FSS Licensing Regulations mandates food safety management system. Components: Personal hygiene program, Sanitation program, Pest control program, Water quality program, Traceability system, Training records, Equipment maintenance, Temperature monitoring, Incoming material inspection, and Complaint handling. Large units (>Rs 20 Cr) should implement HACCP; smaller units follow Schedule 4 requirements.',
        '["Develop SOPs for each food safety program area", "Create training calendar for food handlers", "Set up traceability system with batch coding", "Design monitoring and record-keeping formats"]'::jsonb,
        '["Food Safety Manual Template", "SOP Templates Library", "Training Calendar Template", "Traceability System Guide"]'::jsonb,
        120,
        75,
        5,
        NOW(),
        NOW()
    );

    -- Day 12: FSSAI Compliance Maintenance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Ongoing FSSAI Compliance and Renewal',
        'Annual compliance requirements: Maintain all records for 2 years, Annual returns filing (Form D-1 before May 31), License modification for any changes, Product approval for new categories, Regular internal audits. Renewal application: Submit 30 days before expiry through FoSCoS. Non-renewal attracts penalty of Rs 100/day. Common compliance issues: Incorrect labeling (40%), Poor hygiene (25%), Substandard products (20%), Missing records (15%).',
        '["Set up compliance calendar with all deadlines", "Create monthly internal audit schedule", "File Form D-1 annual return", "Review and update all compliance records"]'::jsonb,
        '["Compliance Calendar Template", "Internal Audit Checklist", "Form D-1 Filing Guide", "Record Keeping Checklist"]'::jsonb,
        90,
        50,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Manufacturing Setup & Licensing (Days 13-18)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Manufacturing Setup & Licensing',
        'Complete guide to factory planning, pollution control, fire safety, labour compliance, and equipment selection',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 13: Factory Layout and Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Factory Layout Planning and Design',
        'Food processing facility design must ensure unidirectional product flow to prevent cross-contamination. Key zones: Raw material receiving, Storage (ambient/cold), Processing area, Packaging area, Finished goods storage, Dispatch, Utilities, and QC lab. Minimum requirements: Ceiling height 3m, Smooth washable surfaces, Adequate lighting (540 lux in inspection areas), Proper drainage with 1:200 slope, Separate areas for allergen handling.',
        '["Create detailed factory layout drawing with material flow", "Design zone separation plan with air pressure differentials", "Plan utility requirements (power, water, steam, compressed air)", "Get layout approved by food technologist and civil engineer"]'::jsonb,
        '["Factory Layout Templates by Product Category", "Material Flow Design Guide", "Utility Planning Calculator", "Zoning Requirements Checklist"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: Pollution Control Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'Pollution Control Board Compliance',
        'Food processing units require Consent to Establish (CTE) before construction and Consent to Operate (CTO) before production. Classification: Green (low pollution), Orange (moderate), Red (high). Most food processing is Orange category. Requirements: EIA for large projects (>Rs 100 Cr), ETP for liquid waste, Air pollution control measures, Solid waste management plan. Apply through PARIVESH portal. CTO validity: 5 years for Green/Orange, 1 year for Red.',
        '["Determine pollution category for your unit", "Prepare environmental management plan", "Design effluent treatment system specifications", "Apply for CTE through PARIVESH portal"]'::jsonb,
        '["Pollution Category Identifier Tool", "CTE/CTO Application Guide", "ETP Design Guidelines", "Waste Management Plan Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Fire Safety and NOC
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Fire Safety Compliance and NOC',
        'Fire NOC mandatory for: All food processing units, Buildings above 15m height, Units with flammable materials. Requirements: Fire extinguishers (ABC type, 1 per 200 sqm), Fire detection system, Emergency exits with illuminated signs, Fire-resistant construction, Sprinkler system for large units (>1000 sqm), Fire hydrant for very large units. Apply to Chief Fire Officer with building plan and fire safety measures. Inspection and approval takes 30-45 days.',
        '["Calculate fire safety equipment requirements", "Design emergency evacuation plan and routes", "Install fire detection and alarm system", "Apply for Fire NOC with all documentation"]'::jsonb,
        '["Fire Safety Calculator", "Evacuation Plan Template", "Fire Equipment Specifications", "Fire NOC Application Checklist"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Labour Law Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'Labour Law Compliance for Food Processing',
        'Key compliances: Factory License (Factories Act, if 10+ workers with power/20+ without), ESI registration (if 10+ employees), EPF registration (if 20+ employees), Professional Tax registration, State-specific shop establishment, Minimum Wages compliance, Contract Labour registration (if using contractors). New Labour Codes (when implemented): OSH Code, Wage Code, Industrial Relations Code, Social Security Code will consolidate 29 laws into 4.',
        '["Register on Shram Suvidha Portal for central compliances", "Apply for Factory License through state portal", "Register for ESI and EPF on respective portals", "Create compliance calendar for all statutory returns"]'::jsonb,
        '["Labour Compliance Checklist", "Registration Process Guides", "Minimum Wage Calculator by State", "Return Filing Calendar Template"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 17: Equipment Selection and Procurement
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Equipment Selection and Procurement',
        'Equipment selection criteria: Food-grade materials (SS 304/316), Easy to clean design, Capacity matching production plan, Energy efficiency (star rating), After-sales support availability, Spare parts availability. Major equipment categories: Processing (cooking, mixing, grinding), Packaging (form-fill-seal, labeling), Utilities (boiler, chiller, compressor), Material handling (conveyors, pumps). Consider refurbished equipment for 40-50% savings on secondary equipment.',
        '["Prepare equipment specification sheet for each major equipment", "Get quotes from minimum 3 suppliers per equipment", "Negotiate payment terms and warranty conditions", "Plan equipment installation sequence and timeline"]'::jsonb,
        '["Equipment Specification Templates", "Supplier Evaluation Matrix", "Procurement Checklist", "Installation Planning Guide"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 18: Pre-operative Compliance Checklist
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'Pre-operative Compliance Checklist',
        'Before starting production, ensure all approvals are in place: FSSAI License (mandatory), Factory License (if applicable), Fire NOC, PCB CTO, Shop Establishment Registration, GST Registration, Trade License from local body, Weights & Measures verification, EPF/ESI registration. Create a compliance dashboard to track expiry dates and renewal requirements. Non-compliance can result in production stoppage and penalties.',
        '["Complete pre-operative compliance audit using checklist", "Create compliance dashboard with all license expiry dates", "Set up renewal reminders 60 days before expiry", "Document all approvals in organized digital/physical files"]'::jsonb,
        '["Pre-operative Compliance Checklist", "Compliance Dashboard Template", "Renewal Tracking System", "Document Organization Guide"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Quality Certifications (Days 19-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Quality Certifications',
        'Master ISO 22000, HACCP, FSSC 22000, BRC, and organic certifications for market access and premium positioning',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 19: HACCP Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'HACCP Principles and Implementation',
        'HACCP (Hazard Analysis Critical Control Points) is the foundation of food safety management. Seven principles: 1) Conduct hazard analysis, 2) Determine Critical Control Points (CCPs), 3) Establish critical limits, 4) Establish monitoring procedures, 5) Establish corrective actions, 6) Establish verification procedures, 7) Establish documentation. Common CCPs: Cooking temperature, Chilling temperature, Metal detection, pH control. HACCP certification costs Rs 50,000-2,00,000.',
        '["Form HACCP team and assign responsibilities", "Create process flow diagram for each product", "Conduct hazard analysis using decision tree", "Identify CCPs and establish critical limits"]'::jsonb,
        '["HACCP Implementation Guide", "Hazard Analysis Worksheet", "CCP Decision Tree", "HACCP Plan Template"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 20: ISO 22000 Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'ISO 22000 Food Safety Management System',
        'ISO 22000:2018 integrates HACCP with ISO management system principles. Key elements: Context of organization, Leadership commitment, Planning (risk-based), Support (resources, competence), Operation (PRPs, HACCP), Performance evaluation, Improvement. Certification process: Gap analysis (2-4 weeks), Documentation (4-8 weeks), Implementation (8-12 weeks), Internal audit, Certification audit (Stage 1 & 2). Certification cost: Rs 1-3 lakhs for SMEs.',
        '["Conduct ISO 22000 gap analysis against current practices", "Develop food safety policy and objectives", "Create documented procedures and work instructions", "Implement internal audit program"]'::jsonb,
        '["ISO 22000 Gap Analysis Checklist", "FSMS Documentation Templates", "Internal Audit Procedure", "Management Review Template"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 21: FSSC 22000 Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'FSSC 22000 Certification for GFSI Recognition',
        'FSSC 22000 is GFSI-benchmarked, recognized by major global retailers. It adds to ISO 22000: ISO/TS 22002-1 (PRPs), Additional requirements (food defense, food fraud prevention, allergen management, environmental monitoring). Required by: Walmart, Carrefour, Tesco, Metro. Certification cost: Rs 2-5 lakhs. Implementation timeline: 6-12 months. Major benefit: Single audit accepted by multiple retailers, reducing audit fatigue.',
        '["Implement ISO/TS 22002-1 prerequisite programs", "Develop food defense plan and vulnerability assessment", "Create allergen management program", "Establish environmental monitoring program"]'::jsonb,
        '["FSSC 22000 Implementation Guide", "Food Defense Plan Template", "Allergen Management Program", "Environmental Monitoring Plan"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 22: BRC and IFS Certifications
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'BRC Global Standard and IFS Food',
        'BRC Global Standard for Food Safety (UK retailers) and IFS Food (European retailers) are GFSI-benchmarked standards. BRC has 7 sections: Senior management commitment, HACCP, FSMS, Site standards, Product control, Process control, Personnel. Grades: AA/A/B/C/D based on non-conformities. IFS has similar structure with scoring system. Choose based on target markets. Cost: Rs 2-4 lakhs each. Some companies get both for comprehensive market access.',
        '["Assess export market requirements for BRC/IFS", "Conduct gap analysis against chosen standard", "Implement site standards and GMP requirements", "Schedule certification audit with accredited body"]'::jsonb,
        '["BRC Gap Analysis Checklist", "IFS Gap Analysis Checklist", "Site Standards Implementation Guide", "Certification Body Selection Guide"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 23: Organic Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'Organic Certification - NPOP and Global Standards',
        'For domestic market: NPOP (National Programme for Organic Production) certification through APEDA-accredited agencies. For exports: USDA NOP (USA), EU Organic Regulation (Europe), JAS (Japan). Processing requirements: No synthetic additives, Segregation from non-organic, Traceability from farm to pack, No GMO ingredients. Certification cost: Rs 30,000-1,00,000 depending on complexity. Premium: 20-50% higher prices for organic products.',
        '["Identify organic certification scope and target markets", "Select accredited certification body", "Implement organic handling plan and segregation", "Maintain traceability records from source to product"]'::jsonb,
        '["Organic Standards Comparison Chart", "Organic Handling Plan Template", "Traceability Documentation Guide", "Certification Body List"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 24: Halal and Kosher Certifications
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'Halal and Kosher Certifications for Export Markets',
        'Halal certification required for: Middle East, Malaysia, Indonesia, Gulf countries. Requirements: No pork/alcohol, Halal slaughter for meat, Clean equipment, Muslim supervision. Certification bodies: Jamiat Ulama-i-Hind, Halal India. Cost: Rs 20,000-50,000. Kosher certification for: USA, Israel, Jewish communities. Requirements: Separation of meat and dairy, Specific processing methods. Rabbinical supervision required. Cost: Rs 50,000-2,00,000.',
        '["Assess export market requirements for Halal/Kosher", "Review ingredients and processes for compliance", "Select appropriate certification body", "Implement required segregation and documentation"]'::jsonb,
        '["Halal Requirements Guide", "Kosher Requirements Guide", "Certification Body Directory", "Compliance Implementation Checklist"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 25: Certification ROI and Audit Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        25,
        'Certification ROI and Audit Management',
        'Calculate certification ROI: New market access value, Premium pricing (10-30% for quality brands), Reduced rejections and recalls, Lower insurance premiums. Audit management: Maintain audit-ready status always, Schedule internal audits monthly, Address non-conformities immediately, Document all corrective actions. Common audit findings: Documentation gaps (35%), Training records (25%), Calibration issues (15%), Traceability gaps (15%).',
        '["Calculate ROI for each certification using provided template", "Create annual audit schedule (internal + external)", "Develop non-conformity tracking and closure system", "Train team on audit-ready practices"]'::jsonb,
        '["Certification ROI Calculator", "Audit Schedule Template", "Non-conformity Management System", "Audit Readiness Checklist"]'::jsonb,
        90,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Cold Chain & Logistics (Days 26-31)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Cold Chain & Logistics',
        'Design and manage cold chain infrastructure, storage operations, transportation, and last-mile delivery',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 26: Cold Chain Infrastructure Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        26,
        'Cold Chain Infrastructure Planning',
        'India wastes Rs 92,000 crore food annually due to inadequate cold chain. Components: Pre-cooling at farm, Cold storage (4°C for chilled, -18°C for frozen), Refrigerated transport, Retail cold cabinets. Temperature requirements by product: Dairy (2-8°C), Meat (-18°C), Fruits/vegetables (2-12°C), Ice cream (-25°C). Capacity planning: Factor 1.5x peak season requirement. Capital cost: Rs 5-10 lakhs per 100 MT cold storage.',
        '["Calculate cold chain capacity requirements by product", "Map temperature requirements through supply chain", "Design cold chain network with locations and capacities", "Evaluate build vs rent decision for infrastructure"]'::jsonb,
        '["Cold Chain Capacity Calculator", "Temperature Requirement Guide", "Network Design Template", "Build vs Buy Analysis Tool"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Cold Storage Operations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        27,
        'Cold Storage Design and Operations',
        'Cold storage design elements: Insulated panels (PUF/PIR), Refrigeration system sizing, Racking and storage systems, Loading dock design, Temperature monitoring systems. Operations: FIFO/FEFO inventory management, Temperature logging every 4 hours, Door discipline (minimize open time), Defrost scheduling, Energy management (night cooling utilization). Operating cost: Rs 3-5 per kg per month including electricity.',
        '["Design cold storage layout with racking plan", "Specify refrigeration system with redundancy", "Implement temperature monitoring and alert system", "Create SOPs for cold storage operations"]'::jsonb,
        '["Cold Storage Design Guide", "Refrigeration Sizing Calculator", "Temperature Monitoring Protocol", "Cold Storage SOP Templates"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28: Refrigerated Transportation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        28,
        'Refrigerated Transportation Management',
        'Reefer vehicles: Light (1-3 ton), Medium (5-10 ton), Heavy (16-20 ton). Refrigeration options: Diesel-powered, Eutectic plates, Plug-in electric. Pre-cooling essential before loading. Temperature monitoring: Real-time GPS-enabled data loggers mandatory for quality compliance. Cost: Own fleet Rs 15-30 lakhs per vehicle, Third-party Rs 8-15 per ton-km. Route optimization reduces cost by 15-20%.',
        '["Assess refrigerated transport requirements (own vs outsource)", "Specify vehicle and refrigeration requirements", "Implement real-time temperature monitoring system", "Design route optimization plan"]'::jsonb,
        '["Transport Requirement Calculator", "Vehicle Specification Guide", "GPS Temperature Logger Selection", "Route Optimization Tool"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 29: Last-Mile Cold Chain
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        29,
        'Last-Mile Cold Chain Solutions',
        'Last-mile challenge: Maintaining cold chain from distribution center to consumer. Solutions: Insulated boxes with gel packs (maintain 6-8 hours), Portable coolers, Dark stores with cold storage, Click-and-collect from cold points. D2C brands: Partner with cold-chain-enabled logistics (Delhivery, Blue Dart, Shadowfax). Cost: Rs 50-200 per delivery for cold chain last mile. Customer communication of handling instructions critical.',
        '["Design last-mile solution for your distribution model", "Select packaging solution for temperature maintenance", "Partner with cold-chain logistics providers", "Create customer handling instructions"]'::jsonb,
        '["Last-Mile Solution Selector", "Insulated Packaging Guide", "Logistics Partner Evaluation Matrix", "Customer Instruction Templates"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 30: IoT and Cold Chain Monitoring
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        30,
        'IoT-Enabled Cold Chain Monitoring',
        'IoT solutions for cold chain: Temperature sensors with cloud connectivity, Door sensors, Humidity monitors, GPS trackers, Energy meters. Benefits: Real-time visibility, Automated alerts, Compliance documentation, Predictive maintenance, Energy optimization. Solution providers: Emerson, Thermo King, Indian startups (Tessol, Inficold). Investment: Rs 50,000-5,00,000 depending on scale. ROI: 20-30% reduction in wastage.',
        '["Assess IoT monitoring requirements and budget", "Select IoT solution provider and sensors", "Implement pilot in one facility", "Create alert protocols and escalation matrix"]'::jsonb,
        '["IoT Solution Comparison Matrix", "Sensor Selection Guide", "Implementation Checklist", "Alert Protocol Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 31: Cold Chain Cost Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        31,
        'Cold Chain Cost Optimization',
        'Cold chain typically 15-30% of product cost. Optimization strategies: Energy management (35% of operating cost), Route optimization, Consolidation with other shippers, Night operations (lower electricity cost), Solar integration, Efficient loading patterns, Preventive maintenance to avoid breakdowns. Benchmark: Best-in-class cold chain costs 8-12% of product value. Target continuous improvement of 5% cost reduction annually.',
        '["Analyze current cold chain cost breakdown", "Identify top 5 cost optimization opportunities", "Implement energy management measures", "Create cost tracking dashboard"]'::jsonb,
        '["Cold Chain Cost Analysis Template", "Energy Optimization Guide", "Benchmarking Tool", "Cost Tracking Dashboard"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Government Schemes & Subsidies (Days 32-37)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Government Schemes & Subsidies',
        'Access PMFME, PMKSY, PLI scheme, and state subsidies for maximum financial support',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 32: PMFME Scheme
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        32,
        'PM Formalization of Micro Food Processing (PMFME)',
        'PMFME provides Rs 10 lakh subsidy (35% for individuals, 40% for groups/FPOs) for micro food processing units. Eligibility: Existing unregistered units or new units with investment up to Rs 10 lakh in plant & machinery. One District One Product (ODOP) gets priority. Support includes: Capital subsidy, Credit linked subsidy, Common facility centers, Branding & marketing support. Apply through state nodal agencies or udyamimitra.in.',
        '["Check ODOP product for your district", "Prepare Detailed Project Report for PMFME", "Collect all required documents", "Apply through state nodal agency or portal"]'::jsonb,
        '["PMFME Eligibility Checker", "DPR Template for PMFME", "Document Checklist", "State Nodal Agency Directory"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 33: PMKSY - Cold Chain Subsidy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        33,
        'PM Kisan SAMPADA - Cold Chain Infrastructure',
        'PMKSY provides 35% subsidy (50% for NE/Himalayan states) for cold chain projects. Components covered: Pack houses, Pre-cooling units, Ripening chambers, Cold storage, CA storage, Reefer vehicles. Minimum project size: Rs 5 crore, Maximum subsidy: Rs 10 crore per project. Apply to Ministry of Food Processing Industries. Success rate higher for projects with backward linkage to farmers and forward linkage to organized retail.',
        '["Calculate project cost and eligible subsidy amount", "Prepare detailed project report with backward-forward linkages", "Get letters of intent from farmer groups and buyers", "Apply to MOFPI with complete documentation"]'::jsonb,
        '["PMKSY Project Calculator", "DPR Template for Cold Chain", "LOI Templates", "MOFPI Application Guide"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 34: PLI Scheme for Food Processing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        34,
        'Production Linked Incentive (PLI) Scheme',
        'PLI provides 4-6% of incremental sales as incentive for 6 years. Categories: Category 1 (RTE/RTC, Marine, Mozzarella, etc.) - 4% incentive, Minimum investment Rs 10 crore. Category 2 (Organic, Free-range, etc.) - 6% incentive, Minimum investment Rs 50 lakh. Sales threshold: Category 1 - Rs 250 crore Year 1, Category 2 - Rs 5 crore Year 1. Application through MOFPI portal. 170+ companies approved in Round 1.',
        '["Check eligibility for PLI Category 1 or 2", "Prepare 6-year sales projection meeting thresholds", "Complete application on MOFPI PLI portal", "Plan investment and production ramp-up"]'::jsonb,
        '["PLI Eligibility Checker", "Sales Projection Template", "PLI Application Guide", "Investment Planning Tool"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 35: State-Level Food Processing Subsidies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        35,
        'State-Level Subsidies and Incentives',
        'Major states offer attractive incentives: Andhra Pradesh (35% capital subsidy), Gujarat (25% + interest subvention), Karnataka (50% on certifications), Maharashtra (VAT incentives), Tamil Nadu (SIPCOT land subsidy), UP (25% capital + interest), Madhya Pradesh (FPI policy with multiple incentives). Benefits: Capital subsidy, Interest subvention, Land cost rebate, Power tariff concession, Quality certification support, Training support. Stack with central schemes for maximum benefit.',
        '["Research incentives in your target state", "Calculate total stackable benefits", "Apply to state industries department", "Maintain compliance for benefit continuation"]'::jsonb,
        '["State Incentive Comparison Tool", "Subsidy Stacking Calculator", "State Application Checklist", "Compliance Tracker"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 36: Mega Food Parks and Food Processing Zones
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        36,
        'Mega Food Parks and Processing Zones',
        'Mega Food Parks (MFPs) provide ready infrastructure: Central processing center, Collection centers, Roads & utilities, Common facilities (cold storage, labs, warehousing). 41 MFPs sanctioned across India. Benefits: Reduced capital cost (no land development), Faster setup (6-12 months), Shared facilities, Cluster benefits. Rental: Rs 15-30/sqft/month. Agro-processing clusters and food processing zones by states offer similar benefits.',
        '["Identify nearest Mega Food Park or food zone", "Evaluate plot availability and rental terms", "Compare with standalone setup cost", "Apply for plot allocation if viable"]'::jsonb,
        '["Mega Food Park Directory", "Cost Comparison Tool", "Plot Application Process", "Infrastructure Checklist"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 37: Scheme Application Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        37,
        'Government Scheme Application Strategy',
        'Success factors: Well-prepared DPR with realistic projections, Strong backward-forward linkages, Demonstrated technical capability, Financial credibility, Timely document submission. Common rejection reasons: Incomplete documents (40%), Unrealistic projections (25%), Missing NOCs (15%), Ineligible category (10%). Engage consultant for schemes above Rs 1 crore. Timeline: PMFME 3-6 months, PMKSY 6-12 months, PLI ongoing applications.',
        '["Create scheme application roadmap", "Engage consultant for large scheme applications", "Prepare master documentation file", "Track applications and follow up systematically"]'::jsonb,
        '["Scheme Selection Matrix", "Consultant Evaluation Checklist", "Master Document Checklist", "Application Tracking System"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Export Regulations & APEDA (Days 38-43)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Export Regulations & APEDA',
        'Navigate APEDA registration, export documentation, international standards, and export incentives',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 38: APEDA Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        38,
        'APEDA Registration and Product Categories',
        'APEDA (Agricultural and Processed Food Products Export Development Authority) registration mandatory for scheduled product exports. Categories: Fruits/vegetables, Meat products, Dairy, Cereals, Floriculture, Organic products. Registration through apeda.gov.in portal. Fee: Rs 5,000 (valid for 5 years). Benefits: RCMC eligibility, Export infrastructure support, Market development assistance, Participation in international fairs. Registration processed in 15-30 days.',
        '["Check if your product requires APEDA registration", "Create account on APEDA portal", "Prepare all documents (IEC, FSSAI, GST, etc.)", "Submit application and track status"]'::jsonb,
        '["APEDA Product List", "Registration Document Checklist", "Portal Navigation Guide", "Application Timeline"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 39: Export Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        39,
        'Export Documentation and Procedures',
        'Key export documents: Commercial Invoice, Packing List, Bill of Lading/Airway Bill, Certificate of Origin, Phytosanitary Certificate (EQ), Health Certificate, FSSAI Product Approval (for processed foods), Lab test reports, Halal/Kosher certificates (market specific). Customs: File shipping bill on ICEGATE, HS code classification critical for duty calculation. Documentation errors cause 20% of export shipment delays.',
        '["Create document checklist for your export market", "Obtain IEC (Import Export Code) if not done", "Register on ICEGATE for customs filing", "Build relationships with customs broker and freight forwarder"]'::jsonb,
        '["Export Document Checklist by Country", "IEC Registration Guide", "ICEGATE Tutorial", "Customs Broker Selection Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 40: International Food Safety Standards
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        40,
        'International Food Safety and Import Requirements',
        'Market-specific requirements: USA (FDA registration, FSVP, FSMA compliance), EU (RASFF registration, novel food approval, MRL compliance), UK (post-Brexit FSA registration), Gulf (Halal, GSO standards), Japan (JAS, quarantine), Australia (DAFF import permits). Each market has specific pesticide MRL limits, additive restrictions, and labeling requirements. Non-compliance leads to detention, destruction, and future import alerts.',
        '["Research requirements for target export markets", "Get product tested for importing country standards", "Obtain market-specific certifications if required", "Establish relationship with importer for compliance guidance"]'::jsonb,
        '["Market Requirement Matrix", "International MRL Database", "Certification Requirements Guide", "Importer Due Diligence Checklist"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 41: Export Incentives - RoDTEP and Other Schemes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        41,
        'Export Incentives and Schemes',
        'RoDTEP (Remission of Duties and Taxes on Exported Products): 0.5-4.3% of FOB value for food products. Other schemes: EPCG (zero duty on capital goods against export obligation), Advance Authorization (duty-free import of inputs), Duty Drawback (refund of customs/excise), TMA (Transport and Marketing Assistance from APEDA). Claim through ICEGATE. Total benefits can reach 8-12% of export value when stacked properly.',
        '["Calculate eligible RoDTEP benefit for your HS code", "Evaluate EPCG benefit for machinery imports", "Register for TMA scheme with APEDA", "Create incentive tracking system"]'::jsonb,
        '["RoDTEP Rate Finder", "EPCG Calculator", "TMA Application Guide", "Export Benefit Calculator"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 42: Export Market Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        42,
        'Export Market Development Strategy',
        'Market selection: Consider market size, growth rate, competition, import regulations, logistics cost, and cultural fit. Top markets for Indian food exports: USA ($2.5B), UAE ($1.8B), Saudi Arabia, Vietnam, UK. Entry strategies: Direct export (higher margin, higher risk), Agent/distributor (local market knowledge), E-commerce (Amazon Global, Alibaba). APEDA assistance: Trade fairs, buyer-seller meets, sample cost reimbursement.',
        '["Analyze top 5 target markets using selection matrix", "Identify potential importers/distributors", "Plan participation in APEDA-sponsored trade fair", "Create export marketing plan"]'::jsonb,
        '["Market Selection Matrix", "Importer Database by Country", "Trade Fair Calendar", "Export Marketing Plan Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 43: Export Readiness Assessment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        43,
        'Export Readiness Self-Assessment',
        'Key export readiness factors: Production capacity for consistent supply, Quality meeting international standards, Documentation capability, Financial resources for working capital (60-90 day cycle), Packaging meeting destination requirements, Management bandwidth for export business. Score yourself on each parameter. Address gaps before committing to export orders. Start with small trial shipments before scaling.',
        '["Complete export readiness self-assessment", "Identify and prioritize gaps to address", "Plan trial shipment to target market", "Build export management team/capability"]'::jsonb,
        '["Export Readiness Assessment Tool", "Gap Analysis Template", "Trial Shipment Checklist", "Export Team Structure Guide"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Packaging & Labeling (Days 44-47)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Packaging & Labeling',
        'Master packaging material selection, design, labeling regulations, and EPR compliance',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 44: Packaging Material Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        44,
        'Packaging Material Selection',
        'Packaging types: Primary (product contact), Secondary (outer box), Tertiary (shipping). Material options: Flexible (pouches, films) - lowest cost, Rigid plastic (PET, HDPE), Glass (premium, fragile), Metal (cans - long shelf life), Paper/carton (eco-friendly). Selection criteria: Product compatibility, Barrier properties (oxygen, moisture, light), Shelf life requirements, Cost, Sustainability, Consumer appeal. Migration testing mandatory for food-contact materials.',
        '["Define packaging requirements (barrier, shelf life, etc.)", "Evaluate 3+ packaging options with cost comparison", "Get migration testing done for selected materials", "Design packaging specifications document"]'::jsonb,
        '["Packaging Selection Guide", "Material Comparison Matrix", "Migration Testing Protocol", "Specification Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 45: Packaging Design and Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        45,
        'Packaging Design and Development',
        'Design process: Brief development, Concept design, Structural design, Graphic design, Prototype, Testing, Production. Key considerations: Shelf presence (3 seconds to attract), Brand consistency, Information hierarchy, Ease of use, Portion visibility, Resealability. Work with packaging designer experienced in FMCG. Budget: Rs 50,000-3,00,000 for design depending on complexity. Include consumer testing before finalization.',
        '["Create design brief with brand guidelines", "Select packaging designer/agency", "Develop 3 concept designs", "Conduct consumer testing of prototypes"]'::jsonb,
        '["Design Brief Template", "Designer Evaluation Checklist", "Concept Testing Protocol", "Consumer Research Guide"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 46: Advanced Labeling Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        46,
        'Advanced Labeling Compliance',
        'Beyond basic requirements: Nutrition facts format (energy, protein, carbohydrates, fat, sodium), Front-of-pack labeling (HFSS declaration from 2024), Claims validation (nutrition claims, health claims), QR code for traceability. Export labeling: Country-specific requirements (FDA Nutrition Facts, EU format), Bilingual requirements, Country of origin rules. Legal Metrology: Net quantity declaration, unit price, packed by details.',
        '["Design label layout with all mandatory elements", "Validate nutritional claims with documentation", "Create artwork for domestic and export versions", "Get legal review of all label claims"]'::jsonb,
        '["Label Design Checklist", "Claims Substantiation Guide", "Multi-market Label Template", "Legal Review Checklist"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 47: EPR and Sustainable Packaging
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        47,
        'EPR Compliance and Sustainable Packaging',
        'Extended Producer Responsibility (EPR) mandatory under Plastic Waste Management Rules 2022. Requirements: Registration on CPCB portal, Annual EPR action plan, Collection and recycling targets (increasing yearly), EPR certificates from authorized recyclers. Sustainable packaging trends: Compostable materials, Recycled content, Mono-material design, Reduced packaging. Consumer preference shifting - 65% willing to pay more for sustainable packaging.',
        '["Register on CPCB EPR portal", "Calculate plastic footprint for EPR compliance", "Identify authorized recyclers for EPR certificates", "Develop sustainable packaging roadmap"]'::jsonb,
        '["EPR Registration Guide", "Plastic Footprint Calculator", "Recycler Directory", "Sustainability Roadmap Template"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Sales & Distribution (Days 48-49)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Sales & Distribution',
        'Build effective sales channels, distribution networks, and pricing strategies',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- Day 48: Channel Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        48,
        'Sales Channel Strategy',
        'Channel options: General trade (kirana - 12M stores, 80% FMCG sales), Modern trade (supermarkets - 15-25% margin), E-commerce (Amazon, BigBasket, Blinkit - fastest growing), HoReCa (hotels, restaurants, catering), Institutional (bulk B2B), D2C (own website - highest margin, highest CAC). Multi-channel approach recommended. Start focused, expand systematically. Each channel has different margin structure, payment terms, and operational requirements.',
        '["Define channel mix strategy for Year 1-3", "Calculate margin structure for each channel", "Create channel-specific go-to-market plan", "Set up distribution infrastructure"]'::jsonb,
        '["Channel Selection Matrix", "Margin Calculator by Channel", "GTM Plan Template", "Distribution Setup Guide"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 49: Pricing and Margin Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        49,
        'Pricing Strategy and Margin Management',
        'Pricing methods: Cost-plus (add target margin to cost), Competitive (benchmark against competitors), Value-based (price based on perceived value). Typical margins: Manufacturing 15-30%, Distributor 8-12%, Retailer 15-25%, Modern trade 25-40%. Price pack architecture: Create entry, regular, and premium variants. Trade schemes: Quantity discounts, Early payment discounts, Display incentives. MRP compliance mandatory with max retail price on pack.',
        '["Build bottom-up cost sheet for pricing", "Conduct competitive price mapping", "Design price pack architecture", "Create trade scheme structure"]'::jsonb,
        '["Cost Sheet Template", "Competitive Pricing Analysis", "Price Pack Architecture Guide", "Trade Scheme Templates"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Growth & Scaling (Day 50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Growth & Scaling',
        'Scale your food processing business through capacity expansion, new products, and strategic growth',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 50: Scaling Your Food Business
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        50,
        'Scaling Your Food Processing Business',
        'Growth levers: Capacity expansion (brownfield vs greenfield), Geographic expansion, Product line extension, Channel deepening, Export growth, Acquisitions. Scaling challenges: Working capital (typically 15-20% of revenue), Quality consistency at scale, Team building, Process documentation. Success factors: Strong unit economics before scaling, Systematic processes, Technology adoption, Strategic partnerships. Target: Profitability first, then scale.',
        '["Create 3-year growth roadmap", "Identify key scaling constraints", "Build business case for capacity expansion", "Develop capability building plan"]'::jsonb,
        '["Growth Roadmap Template", "Scaling Readiness Assessment", "Capacity Expansion Business Case", "Capability Development Plan"]'::jsonb,
        120,
        100,
        0,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P13 Food Processing Mastery course created successfully with % modules and lessons', 10;
END $$;

COMMIT;
