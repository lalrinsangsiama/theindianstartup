-- THE INDIAN STARTUP - P15: Carbon Credits & Sustainability - Complete Content
-- Migration: 20260129_022_p15_carbon_credits_course.sql
-- Purpose: Create comprehensive carbon credits course with 12 modules and 60 lessons

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
    v_module_11_id TEXT;
    v_module_12_id TEXT;
BEGIN
    -- Insert P15 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P15',
        'Carbon Credits & Sustainability',
        'Build a carbon business with GHG Protocol accounting, Verra VCS and Gold Standard certifications, carbon credit trading, green finance, Net Zero strategy, and SEBI BRSR compliance.',
        9999,
        false,
        60,
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

    -- Clean existing modules and lessons for P15
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Climate & Carbon Fundamentals (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Climate & Carbon Fundamentals',
        'Understanding climate science, India''s climate commitments, and the global carbon market landscape',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Climate Science Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Climate Science Fundamentals',
        'Greenhouse gases (GHGs) trap heat in Earth''s atmosphere causing global warming. Major GHGs: CO2 (76% of emissions, 100-year lifespan), Methane CH4 (16%, 12-year lifespan but 80x warming potential), N2O (6%, 114-year lifespan, 298x warming potential), F-gases (2%, thousands of years). Global warming potential (GWP) standardizes to CO2 equivalent (CO2e). Current atmospheric CO2: 420 ppm vs pre-industrial 280 ppm. 1.1°C warming already occurred; limiting to 1.5°C requires 45% emission reduction by 2030.',
        '["Understand GHG types and warming potentials", "Study IPCC reports on climate change impacts", "Review carbon cycle and sinks", "Calculate sample CO2e conversions"]'::jsonb,
        '["GHG Types and GWP Reference", "IPCC Summary for Policymakers", "Carbon Cycle Diagram", "CO2e Conversion Calculator"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: India's Climate Commitments
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'India''s NDCs and Net Zero 2070',
        'India''s Nationally Determined Contributions (NDCs) updated 2022: 45% reduction in emission intensity by 2030 (from 2005 levels), 50% cumulative electric power from non-fossil sources by 2030, Additional carbon sink of 2.5-3 billion tonnes CO2e through forest cover. Net Zero by 2070 announced at COP26. India is world''s 3rd largest emitter but lowest per capita among major economies. National missions: Solar, Energy Efficiency, Green India, Sustainable Agriculture, Water, Himalayan Ecosystem.',
        '["Review India''s NDC commitments in detail", "Understand emission intensity vs absolute emissions", "Study National Action Plan on Climate Change", "Identify business opportunities from NDC targets"]'::jsonb,
        '["India NDC Document", "Emission Intensity Explainer", "National Missions Overview", "NDC Business Opportunities Matrix"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Global Carbon Markets Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Global Carbon Markets Overview',
        'Carbon market types: Compliance markets (regulated, cap-and-trade - EU ETS, China ETS) and Voluntary Carbon Markets (VCM - corporate purchases). Global VCM: $2 billion in 2021, projected $50 billion by 2030. Credit types: Avoidance/reduction (prevent emissions), Removal (capture existing CO2). Price ranges: Compliance markets $50-100/tCO2e, VCM $5-50/tCO2e (nature-based lower, tech-based higher). Key registries: Verra, Gold Standard, ACR, CAR.',
        '["Map global carbon market ecosystem", "Understand compliance vs voluntary markets", "Study price trends by credit type", "Identify India''s position in global markets"]'::jsonb,
        '["Carbon Market Ecosystem Map", "Compliance vs Voluntary Comparison", "Price Trend Analysis", "India Market Position Report"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: India Carbon Credit Trading Scheme (CCTS)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'India Carbon Credit Trading Scheme (CCTS)',
        'CCTS launched 2023 under Energy Conservation Act 2001 amendment. Coverage: Initially energy-intensive sectors (thermal power, steel, cement, petrochemicals, pulp & paper). Mechanism: Emission intensity targets, Carbon Credit Certificates (CCCs), Trading on power exchanges. Timeline: 2023-2025 pilot, Mandatory from 2026+. Bureau of Energy Efficiency (BEE) as administrator. Links to PAT scheme experience. India''s first compliance carbon market.',
        '["Study CCTS rules and regulations", "Understand covered sectors and thresholds", "Review trading mechanism design", "Assess implications for businesses"]'::jsonb,
        '["CCTS Gazette Notification", "Covered Sectors Guide", "Trading Mechanism Overview", "Business Implications Analysis"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Carbon Business Opportunities
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Carbon Business Opportunities in India',
        'Business opportunities: Project development (generate credits), Trading/brokerage (buy-sell credits), Advisory/consulting (help corporates with climate strategy), Technology (MRV, carbon accounting software), Financing (climate/green finance). Growing demand from: Corporate Net Zero commitments (200+ Indian companies with targets), International buyers (voluntary market), CCTS compliance buyers. Market growth: India VCM expected $1+ billion by 2030.',
        '["Assess carbon business opportunity fit", "Identify target customer segments", "Evaluate competitive landscape", "Create carbon business model canvas"]'::jsonb,
        '["Opportunity Assessment Framework", "Customer Segment Analysis", "Competitive Landscape Map", "Carbon Business Model Canvas"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Carbon Accounting (Days 6-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Carbon Accounting',
        'Master GHG Protocol, Scope 1/2/3 emissions, organizational boundaries, and corporate carbon footprinting',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 6: GHG Protocol Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'GHG Protocol Overview',
        'GHG Protocol: Most widely used corporate carbon accounting standard. Developed by WRI and WBCSD. Components: Corporate Standard (Scope 1 & 2), Scope 3 Standard (value chain), Product Standard (product lifecycle), Project Protocol (project-level). Principles: Relevance, Completeness, Consistency, Transparency, Accuracy. Used by 90%+ of Fortune 500 reporting emissions. Foundation for CDP, SBTi, TCFD reporting.',
        '["Download and study GHG Protocol standards", "Understand five accounting principles", "Review applicability to your context", "Identify relevant standards for your work"]'::jsonb,
        '["GHG Protocol Corporate Standard", "Principles Application Guide", "Standard Selection Matrix", "Implementation Overview"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Scope 1 Direct Emissions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Scope 1: Direct Emissions',
        'Scope 1: Emissions from sources owned or controlled by organization. Categories: Stationary combustion (boilers, furnaces, generators), Mobile combustion (company vehicles, equipment), Process emissions (chemical/physical processing), Fugitive emissions (refrigerant leaks, coal seams). Calculation: Activity data × Emission factor = Emissions. Key data: Fuel consumption by type, Fleet records, Refrigerant logs, Process inputs. India emission factors from IPCC, CEA, MoEFCC.',
        '["Identify all Scope 1 emission sources", "Collect activity data for each source", "Select appropriate emission factors", "Calculate Scope 1 emissions"]'::jsonb,
        '["Scope 1 Source Identification Checklist", "Activity Data Collection Template", "India Emission Factor Database", "Scope 1 Calculation Spreadsheet"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Scope 2 Indirect Emissions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Scope 2: Indirect Energy Emissions',
        'Scope 2: Emissions from purchased electricity, steam, heating, and cooling. Two methods: Location-based (grid average emission factor) and Market-based (specific supplier/contract factor). India grid factor: ~0.82 kgCO2/kWh national average (CEA 2023), varies by region. Market-based accounting requires: Contractual instruments (PPAs, RECs, I-RECs), Supplier-specific factors. Dual reporting recommended: Both location and market-based.',
        '["Collect electricity and energy purchase data", "Identify regional grid emission factors", "Assess market-based accounting instruments", "Calculate Scope 2 using both methods"]'::jsonb,
        '["Energy Data Collection Template", "India Grid Emission Factors by Region", "Market-Based Instruments Guide", "Scope 2 Calculator"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Scope 3 Value Chain Emissions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Scope 3: Value Chain Emissions',
        'Scope 3: All other indirect emissions in value chain. 15 categories: Upstream (1-8) - Purchased goods, Capital goods, Fuel/energy activities, Transportation, Waste, Business travel, Employee commuting, Leased assets. Downstream (9-15) - Distribution, Product use, End-of-life, Leased assets, Franchises, Investments. Scope 3 often 70-90% of total footprint. Prioritize: Screen all categories, Focus on material ones (>5% of total or influence).',
        '["Screen all 15 Scope 3 categories for relevance", "Collect data for material categories", "Select calculation approaches (spend-based, activity-based)", "Calculate priority Scope 3 emissions"]'::jsonb,
        '["Scope 3 Screening Template", "Data Collection by Category", "Calculation Approach Guide", "Scope 3 Calculator"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Organizational Boundaries
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Setting Organizational Boundaries',
        'Consolidation approaches: Equity share (emissions based on ownership %), Financial control (100% if financial control), Operational control (100% if operational control - most common). Operational control: Organization has authority to introduce operating policies. Considerations: Joint ventures, Leased assets, Franchises, Outsourced operations. Document boundary decisions and apply consistently. Re-evaluate boundaries with acquisitions/divestitures.',
        '["Map organizational structure and ownership", "Select consolidation approach with justification", "Identify boundary edge cases (JVs, leases)", "Document boundary decisions"]'::jsonb,
        '["Organizational Mapping Template", "Consolidation Approach Decision Tree", "Edge Case Assessment Guide", "Boundary Documentation Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 11: Emission Factors for India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'India-Specific Emission Factors',
        'India emission factor sources: CEA (grid electricity - updated annually), MoEFCC (sectoral factors), IPCC (default factors), Industry associations (sector-specific). Grid factors: National average ~0.82 kgCO2/kWh, Regional variation 0.7-1.0 based on coal share. Fuel factors: Diesel 2.68 kgCO2/liter, Petrol 2.31, LPG 1.5 kg/kg, Natural gas 2.0 kgCO2/m3. Always use most recent, local factors. Document factor sources and versions.',
        '["Compile India-specific emission factors database", "Map factors to your emission sources", "Document factor sources and update schedule", "Create factor update monitoring process"]'::jsonb,
        '["India Emission Factor Database", "Source Mapping Template", "Documentation Standards", "Factor Update Protocol"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 12: Corporate Carbon Footprint Report
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Corporate Carbon Footprint Report',
        'Report elements: Executive summary, Organizational description, Reporting period and boundaries, Methodology, Results (Scope 1, 2, 3), Trend analysis (if not first year), Intensity metrics (tCO2e/revenue, employee, unit), Reduction initiatives, Targets and progress. Quality requirements: Third-party verification recommended for credibility, Documentation trail, Uncertainty assessment. Use for: CDP reporting, BRSR compliance, SBTi validation, Stakeholder communication.',
        '["Complete carbon footprint calculation", "Create comprehensive report following best practices", "Develop intensity metrics", "Plan for third-party verification"]'::jsonb,
        '["Carbon Footprint Report Template", "Intensity Metrics Calculator", "Verification Readiness Checklist", "Stakeholder Communication Guide"]'::jsonb,
        120,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Carbon Credit Project Development (Days 13-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Carbon Credit Project Development',
        'Develop carbon credit projects from concept to registration',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 13: Carbon Credit Types
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Carbon Credit Types and Project Categories',
        'Credit types: Avoidance/Reduction (prevent emissions that would have occurred) vs Removal (capture existing CO2). Project categories: Renewable energy (solar, wind, hydro, biomass), Energy efficiency (industrial, buildings), Forestry (REDD+, afforestation, reforestation), Agriculture (soil carbon, rice methane), Waste (landfill gas, composting), Industrial gas destruction (HFCs, N2O), Carbon capture (CCUS, BECCS, DAC). India strengths: Renewables, cookstoves, forestry, waste.',
        '["Map project categories by type", "Assess India-relevant project opportunities", "Evaluate risk-return by category", "Select priority project type for focus"]'::jsonb,
        '["Project Category Matrix", "India Opportunity Assessment", "Risk-Return Analysis", "Project Selection Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: Additionality Concept
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'Understanding Additionality',
        'Additionality: Project would not have happened without carbon credit revenue. Foundation of carbon credit integrity. Tests: Regulatory surplus (beyond legal requirements), Financial additionality (not financially viable without credits), Barrier analysis (technical, institutional barriers), Common practice (not already common). Investment additionality: IRR without credits < benchmark; with credits > benchmark. Document additionality clearly - most common reason for project rejection.',
        '["Understand additionality requirements", "Apply additionality tests to project concept", "Document financial additionality with IRR analysis", "Prepare barrier analysis evidence"]'::jsonb,
        '["Additionality Tests Guide", "Financial Model Template", "Barrier Analysis Framework", "Documentation Checklist"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Baseline Setting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Baseline Scenario Development',
        'Baseline: Emissions that would occur without project (business-as-usual scenario). Approaches: Project-specific (calculate for each project), Performance benchmark (sector standard), Historical (past emissions trajectory). Baseline emissions - Project emissions = Emission reductions (credits). Key considerations: Conservative assumptions, Regulatory environment changes, Technology evolution, Common practice evolution. Baseline validity: Typically 10 years, then renewal.',
        '["Identify baseline scenario options", "Select and justify baseline approach", "Gather data for baseline calculation", "Calculate baseline emissions"]'::jsonb,
        '["Baseline Approach Selection Guide", "Data Collection Template", "Baseline Calculation Spreadsheet", "Justification Documentation"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Monitoring Plan Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'Developing Monitoring Plans',
        'Monitoring plan: How project emissions and reductions will be measured over time. Components: Parameters to monitor (activity data, emission factors), Monitoring frequency (continuous, daily, annual), Equipment and calibration, Quality assurance/quality control (QA/QC), Data management and archiving, Responsibility assignment. Conservative approach: Where measurement uncertain, use conservative values. Monitoring costs: Factor into project economics.',
        '["Identify all parameters requiring monitoring", "Design monitoring procedures for each parameter", "Specify equipment and calibration requirements", "Create QA/QC procedures and data management plan"]'::jsonb,
        '["Monitoring Parameter Template", "Procedure Design Guide", "Equipment Specification Template", "QA/QC Protocol Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 17: Project Design Document (PDD)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Project Design Document (PDD)',
        'PDD: Primary document describing carbon credit project for registration. Sections: Project description, Methodology application, Additionality demonstration, Baseline scenario, Project emissions, Emission reductions calculation, Monitoring plan, Environmental and social impacts, Stakeholder consultation, Local stakeholder comments. PDD reviewed during validation. Quality of PDD determines validation success. Use standard templates from registries.',
        '["Review PDD template requirements", "Draft each PDD section", "Compile supporting evidence and annexes", "Internal review before submission"]'::jsonb,
        '["PDD Template (Verra/GS)", "Section Writing Guide", "Evidence Compilation Checklist", "Internal Review Protocol"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 18: Stakeholder Consultation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'Stakeholder Consultation Requirements',
        'Stakeholder consultation: Mandatory for carbon credit registration. Requirements vary by standard: Verra requires 30-day public comment period, Gold Standard requires physical meeting with local stakeholders. Stakeholders: Local communities, Local government, NGOs, Technical experts. Document: Invitations sent, Attendance/participation, Issues raised, Responses provided, How feedback incorporated. Address all material concerns.',
        '["Identify relevant stakeholders for your project", "Plan stakeholder consultation process", "Conduct consultation and document thoroughly", "Address stakeholder feedback in project design"]'::jsonb,
        '["Stakeholder Mapping Template", "Consultation Planning Guide", "Documentation Template", "Feedback Response Matrix"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 19: Sustainable Development Goals Assessment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        19,
        'SDG Co-Benefits Assessment',
        'Carbon projects should demonstrate co-benefits beyond climate. SDG alignment increasingly important for buyers. Gold Standard requires SDG impact by design. Common co-benefits: SDG 3 (Good health - clean cookstoves), SDG 7 (Clean energy - renewables), SDG 8 (Decent work - job creation), SDG 13 (Climate action - primary), SDG 15 (Life on land - forestry). Quantify co-benefits where possible. Higher SDG impact = premium pricing potential.',
        '["Map project activities to relevant SDGs", "Identify quantifiable co-benefits", "Design monitoring for SDG impacts", "Create SDG impact story for marketing"]'::jsonb,
        '["SDG Mapping Template", "Co-Benefits Quantification Guide", "SDG Monitoring Framework", "Impact Story Template"]'::jsonb,
        90,
        50,
        6,
        NOW(),
        NOW()
    );

    -- Day 20: Project Economics and Feasibility
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        20,
        'Carbon Project Economics',
        'Project costs: Development (PDD, validation) Rs 15-50 lakh, Monitoring and verification (annual) Rs 5-15 lakh, Registry fees Rs 1-5 lakh. Revenue: Credits generated × Price - Transaction costs (10-30%). Break-even: Typically need 10,000+ credits/year for viable standalone project. Economics improve with: Scale, Bundled projects, Higher credit prices, Efficient monitoring. Financial analysis: NPV, IRR, Payback period with carbon revenue sensitivity.',
        '["Build project financial model", "Conduct sensitivity analysis on credit prices", "Calculate break-even credit price and volume", "Assess project viability and risk"]'::jsonb,
        '["Project Financial Model Template", "Sensitivity Analysis Tool", "Break-even Calculator", "Risk Assessment Framework"]'::jsonb,
        120,
        75,
        7,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Verra VCS Certification (Days 21-27)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Verra VCS Certification',
        'Navigate Verified Carbon Standard requirements for project registration and credit issuance',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 21: VCS Program Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'VCS Program Overview',
        'Verra: Largest voluntary carbon credit registry globally. VCS (Verified Carbon Standard): 1,900+ projects, 1+ billion credits issued. Project types: Renewable energy, Energy efficiency, Forestry/land use, Agriculture, Waste, Transport, Industrial processes. Credit type: VCU (Verified Carbon Unit). Crediting period: 7-10 years (renewable up to 30 years). Market acceptance: Widely recognized, used by major corporates.',
        '["Create Verra registry account", "Review VCS Program Guide and rules", "Identify applicable project category", "Study registration requirements"]'::jsonb,
        '["Verra Account Setup Guide", "VCS Program Guide", "Project Category Overview", "Registration Requirements Checklist"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: VCS Methodology Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'VCS Methodology Selection',
        'Methodology: Approved procedure for calculating emission reductions. 100+ VCS methodologies available. Selection criteria: Applicability conditions, Baseline approach, Additionality requirements, Monitoring requirements. Common methodologies for India: VM0006 (Energy efficiency), VM0007 (REDD+), VM0010 (Cookstoves), VM0015 (Avoided deforestation), AMS-I.D (Grid renewable energy). If no methodology fits, can develop new (costly, 18+ months).',
        '["Search VCS methodology database for applicable options", "Review applicability conditions for shortlisted methodologies", "Select methodology with justification", "Study methodology requirements in detail"]'::jsonb,
        '["Methodology Search Guide", "Applicability Assessment Template", "Methodology Selection Checklist", "Implementation Requirements Summary"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: VCS Validation Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'VCS Validation Process',
        'Validation: Third-party assessment confirming project meets VCS requirements before registration. Steps: Select VVB (Validation/Verification Body), Contract engagement, Document review, Site visit, Validation report, Public comment period (30 days), Address comments, Final validation statement. VVBs in India: DNV, Bureau Veritas, TUV, SCS Global, Earthood. Timeline: 3-6 months. Cost: Rs 8-20 lakh depending on complexity.',
        '["Select and contract VVB", "Prepare documentation for validation", "Coordinate site visit logistics", "Respond to validation findings"]'::jsonb,
        '["VVB Selection Guide", "Document Preparation Checklist", "Site Visit Protocol", "Findings Response Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: VCS Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'VCS Project Registration',
        'Registration: Project listed on Verra registry after successful validation. Process: Submit registration request on Verra portal, Upload PDD and validation documents, Pay registration fee, Verra completeness review (2-4 weeks), Registration confirmation. Registration fee: $0.10 per VCU (estimated issuance) + account fee. Post-registration: Project listed publicly, Can proceed to verification for credit issuance.',
        '["Prepare registration submission package", "Submit registration request on Verra portal", "Pay registration fees", "Track registration status"]'::jsonb,
        '["Registration Package Checklist", "Portal Submission Guide", "Fee Calculator", "Status Tracking Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 25: VCS Verification and Credit Issuance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        25,
        'VCS Verification and Credit Issuance',
        'Verification: Periodic assessment confirming actual emission reductions achieved. Frequency: At least every 5 years, typically annually or biennially. Process: Prepare monitoring report, Contract VVB, Document review and site visit, Verification report. Issuance: Submit issuance request with verification documents, Verra review, VCUs issued to registry account. Issuance fee: $0.20 per VCU. Credits can then be sold or transferred.',
        '["Prepare monitoring report for verification period", "Contract VVB for verification", "Complete verification process", "Submit credit issuance request"]'::jsonb,
        '["Monitoring Report Template", "Verification Preparation Checklist", "Issuance Request Guide", "Credit Tracking System"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 26: VCS Project Lifecycle Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        26,
        'VCS Project Lifecycle Management',
        'Lifecycle activities: Ongoing monitoring per monitoring plan, Periodic verification (every 1-5 years), Crediting period renewal (at end of crediting period), Project description updates (for material changes), Baseline renewal (every 10 years for methodology update). Common issues: Missed monitoring data, Delayed verification, Methodology updates, Regulatory changes affecting additionality. Maintain project documentation and institutional knowledge.',
        '["Create project lifecycle calendar", "Establish monitoring and data management systems", "Plan verification schedule", "Monitor methodology and regulatory updates"]'::jsonb,
        '["Lifecycle Calendar Template", "Monitoring System Setup Guide", "Verification Planning Tool", "Update Monitoring Protocol"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 27: VCS Quality Assurance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        27,
        'Ensuring VCS Credit Quality',
        'Credit quality factors: Additionality rigor, Methodology appropriateness, Monitoring robustness, Verification thoroughness, Environmental integrity. Quality risks: Over-crediting, Non-permanence (for forestry), Leakage, Double counting. Verra quality mechanisms: Validation/verification by accredited bodies, Public comment periods, Methodology approvals, Registry checks. Proactive quality: Conservative assumptions, Robust documentation, Transparent reporting.',
        '["Conduct quality self-assessment of project", "Address potential quality concerns proactively", "Implement conservative approaches", "Document quality assurance measures"]'::jsonb,
        '["Quality Self-Assessment Tool", "Risk Mitigation Strategies", "Conservative Approach Guide", "QA Documentation Template"]'::jsonb,
        90,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Gold Standard Certification (Days 28-33)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Gold Standard Certification',
        'Master Gold Standard for Global Goals certification with focus on SDG impact',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 28: Gold Standard Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        28,
        'Gold Standard for Global Goals Overview',
        'Gold Standard: Premium carbon credit standard with mandatory SDG impact. Founded by WWF, endorsed by 100+ NGOs. GS4GG: Rebranded to Gold Standard for Global Goals in 2017. Differentiators: Mandatory SDG contribution (at least 3 SDGs), Rigorous stakeholder consultation, Do-no-harm safeguards, Higher integrity standards. Credits: GSVERs (Gold Standard Verified Emission Reductions). Price premium: 20-50% over basic VCUs. 2,500+ projects globally.',
        '["Create Gold Standard registry account", "Review GS4GG requirements and rules", "Understand SDG requirement differences from VCS", "Assess fit for premium standard"]'::jsonb,
        '["GS Account Setup Guide", "GS4GG Requirements Summary", "SDG Requirement Guide", "Fit Assessment Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 29: Gold Standard SDG Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        29,
        'Gold Standard SDG Impact Requirements',
        'SDG requirements: Contribute to at least 3 SDGs including SDG 13 (Climate Action). SDG impact matrix required in project design. Quantify contributions where possible. Approved SDG indicators from GS methodology. Report SDG outcomes in monitoring. SDG labels: Projects can earn SDG Impact Quantification labels. Co-benefits premium: Buyers pay more for quantified, third-party verified SDG impacts.',
        '["Map project to SDG framework", "Select SDG indicators for contribution claims", "Design SDG monitoring approach", "Create SDG impact quantification plan"]'::jsonb,
        '["SDG Impact Matrix Template", "Indicator Selection Guide", "SDG Monitoring Framework", "Quantification Methodology"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 30: Gold Standard Stakeholder Consultation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        30,
        'Gold Standard Stakeholder Consultation',
        'GS stakeholder requirements more stringent than VCS. Requirements: Physical meeting with local stakeholders (mandatory), Ongoing stakeholder engagement, Grievance mechanism establishment, Free Prior Informed Consent (FPIC) for community-based projects. Documentation: Meeting invitations and attendance, Issues raised and responses, How feedback incorporated, Continuous feedback mechanism. NGO support letters add credibility.',
        '["Plan comprehensive stakeholder consultation", "Conduct physical local stakeholder meeting", "Document all engagement thoroughly", "Establish grievance mechanism"]'::jsonb,
        '["GS Stakeholder Consultation Guide", "Meeting Documentation Template", "Grievance Mechanism Setup", "FPIC Process Guide"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 31: Gold Standard Safeguarding
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        31,
        'Safeguarding Principles and Requirements',
        'GS Safeguarding Principles: Do-no-harm assessment required. Principles: Human rights, Gender equality, Community health/safety, Labor rights, Land tenure, Biodiversity, Indigenous peoples. Assessment: Screen project against each principle, Identify risks, Design mitigation measures, Monitor and report. Gender: Specific gender assessment and benefits consideration required. Document safeguarding compliance.',
        '["Conduct safeguarding principles assessment", "Identify risks and mitigation measures", "Complete gender assessment", "Document safeguarding compliance"]'::jsonb,
        '["Safeguarding Assessment Template", "Risk Mitigation Planning Tool", "Gender Assessment Guide", "Compliance Documentation Checklist"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 32: Gold Standard Registration Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        32,
        'Gold Standard Registration Process',
        'GS registration pathway: Preliminary Review (optional but recommended), Design Review (validation), Design Certification, Performance Certification (verification + issuance). Key documents: Project Design Document (PDD), Stakeholder consultation report, Safeguarding assessment, SDG impact documentation. Timeline: 6-12 months design to certification. Fees: Higher than VCS reflecting premium standard. Cost: Rs 20-40 lakh total including VVB.',
        '["Submit for Preliminary Review (recommended)", "Prepare Design Review documentation", "Complete Design Certification", "Plan Performance Certification timeline"]'::jsonb,
        '["Preliminary Review Guide", "Design Review Checklist", "Certification Process Timeline", "Cost Estimation Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 33: Gold Standard Premium Positioning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        33,
        'Marketing Gold Standard Credits',
        'Premium positioning: Gold Standard commands 20-50% price premium. Buyer value proposition: Higher integrity, SDG co-benefits, Community engagement, Third-party verified impacts. Target buyers: Premium brands, ESG-focused companies, European buyers (strong GS preference), Companies with SDG commitments. Marketing: Impact stories, SDG quantification, Community testimonials, GS certification recognition. Pricing: Track GS market prices for your project type.',
        '["Develop premium marketing materials", "Create impact stories and case studies", "Identify premium buyer segments", "Set pricing strategy based on market research"]'::jsonb,
        '["Premium Marketing Guide", "Impact Story Templates", "Buyer Segment Analysis", "Pricing Strategy Framework"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Carbon Credit Trading (Days 34-39)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Carbon Credit Trading',
        'Navigate carbon market dynamics, trading platforms, pricing, and deal structuring',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 34: Carbon Market Dynamics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        34,
        'Understanding Carbon Market Dynamics',
        'Market drivers: Corporate Net Zero commitments (demand), Regulatory pressure (CCTS, CBAM), ESG investing growth, Voluntary offsetting. Supply factors: Project pipeline, Methodology availability, Verification capacity, Registry processing. Price drivers: Credit type/vintage, Project quality, Co-benefits, Supply-demand balance. Market trends: Rising prices, Quality differentiation, Removal credits premium, Article 6 uncertainty.',
        '["Analyze current market supply-demand dynamics", "Track price trends by credit type", "Identify emerging market trends", "Assess market positioning opportunities"]'::jsonb,
        '["Market Dynamics Dashboard", "Price Tracking Template", "Trend Analysis Framework", "Market Position Assessment"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 35: Carbon Trading Platforms
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        35,
        'Carbon Trading Platforms and Exchanges',
        'Trading channels: Exchanges (CBL, ICE, India carbon exchanges), Marketplaces (ACX, Carbonplace, Xpansiv), OTC (bilateral trades), Brokers (intermediated deals). Global platforms: CBL (largest VCM), Xpansiv (data-driven), ACX (Singapore-based). India: IEX and PXIL planning carbon segments. Platform selection: Liquidity, Credit types, Geographic reach, Transaction costs. OTC still dominates (~80% of VCM volume).',
        '["Research major trading platforms", "Compare platform features and costs", "Identify platforms for your credit type", "Set up accounts on selected platforms"]'::jsonb,
        '["Platform Comparison Matrix", "Feature-Cost Analysis", "Platform Selection Guide", "Account Setup Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 36: Credit Pricing and Valuation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        36,
        'Credit Pricing and Valuation',
        'Pricing factors: Project type (removal > avoidance), Standard (GS > VCS > others), Vintage (recent > old), Location (developing country origin), Co-benefits (SDG-verified premium), Verification status (verified > expected). Price benchmarks: Nature-based $5-20, Renewable energy $2-8, Tech removal $50-150+. Valuation: DCF of future credit stream, Comparable transactions. Price forecasting: Growing demand, tightening quality = rising prices.',
        '["Analyze pricing for comparable credits", "Value your credit pipeline", "Develop pricing strategy", "Create price monitoring system"]'::jsonb,
        '["Pricing Benchmark Database", "Credit Valuation Model", "Pricing Strategy Template", "Market Price Monitor"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 37: ERPAs and Offtake Agreements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        37,
        'ERPAs and Offtake Agreements',
        'ERPA: Emission Reduction Purchase Agreement - contract for future credit delivery. Key terms: Volume (minimum/maximum), Price (fixed, floating, indexed), Delivery schedule, Quality requirements, Registration/verification requirements, Payment terms, Termination conditions. Agreement types: Forward purchase (future delivery), Spot (immediate), Option (right to purchase). Negotiation: Balance price certainty with market upside.',
        '["Review sample ERPA templates", "Identify key terms for negotiation", "Draft term sheet for potential buyer", "Negotiate and execute ERPA"]'::jsonb,
        '["ERPA Template", "Term Negotiation Guide", "Term Sheet Template", "Contract Execution Checklist"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 38: Risk Management in Carbon Trading
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        38,
        'Carbon Trading Risk Management',
        'Risks: Delivery risk (project underperformance), Price risk (market volatility), Counterparty risk (buyer default), Regulatory risk (policy changes), Reputational risk (credit quality concerns). Mitigation: Conservative credit estimates, Price hedging, Credit insurance, Due diligence, Quality focus. Buffer pools: Registries hold percentage of credits as insurance. Portfolio diversification reduces concentration risk.',
        '["Identify and assess key risks", "Develop risk mitigation strategies", "Create risk monitoring dashboard", "Plan contingencies for key risks"]'::jsonb,
        '["Risk Assessment Matrix", "Mitigation Strategy Template", "Risk Monitoring Dashboard", "Contingency Planning Guide"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 39: Building Trading Capabilities
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        39,
        'Building Carbon Trading Capabilities',
        'Capabilities needed: Market intelligence, Deal origination, Negotiation skills, Contract management, Operations (registry, transfers), Risk management. Team roles: Originator (deal sourcing), Trader (execution), Operations (settlement), Analyst (market research). Systems: CRM for relationships, Position tracking, Market data feeds. Start small: Build track record with smaller deals before scaling.',
        '["Assess current trading capabilities", "Identify capability gaps", "Build trading team and systems", "Execute first trades to build experience"]'::jsonb,
        '["Capability Assessment Tool", "Gap Analysis Template", "Team Building Guide", "Trading Operations Setup"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Green Finance & Climate Bonds (Days 40-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Green Finance & Climate Bonds',
        'Access green bonds, climate funds, blended finance, and sustainability-linked loans',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 40: Green Finance Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        40,
        'Green Finance Landscape in India',
        'Green finance: Financing for environmental and climate objectives. Market size: India green bonds issued $20+ billion cumulative. Instruments: Green bonds (project-specific), Sustainability bonds, Sustainability-linked loans (SLL), Climate funds, Blended finance. Key players: Banks (SBI, Yes Bank, Axis), DFIs (IFC, ADB, GCF), Investors (climate funds). SEBI Green Bonds Framework: Disclosure requirements for listed green bonds.',
        '["Map green finance ecosystem in India", "Identify relevant financing instruments", "Research active green finance providers", "Assess green finance fit for your projects"]'::jsonb,
        '["Green Finance Ecosystem Map", "Instrument Comparison Guide", "Provider Database", "Fit Assessment Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 41: Green Bonds
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        41,
        'Green Bonds Issuance and Investment',
        'Green bonds: Fixed income for green projects. Eligible uses: Renewable energy, Energy efficiency, Clean transport, Sustainable water, Green buildings, Pollution control. Standards: Climate Bonds Standard, ICMA Green Bond Principles. SEBI framework: Disclosure requirements, Use of proceeds, External review, Reporting. Issuance process: Framework development, External review, Issue structure, Marketing, Allocation, Reporting. Minimum viable size: Rs 50-100 crore.',
        '["Develop green bond framework", "Obtain external review (Second Party Opinion)", "Structure bond issuance", "Plan use of proceeds and reporting"]'::jsonb,
        '["Green Bond Framework Template", "External Review Process Guide", "Issuance Structuring Checklist", "Reporting Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 42: Climate Funds (GCF, GEF)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        42,
        'Accessing Climate Funds',
        'Major climate funds: Green Climate Fund (GCF - largest, $10+ billion), Global Environment Facility (GEF), Climate Investment Funds (CIF), Adaptation Fund. GCF in India: Accredited entities include NABARD, SIDBI, IFCI, Yes Bank. Access: Through accredited entities or as executing entity under accredited entity. Focus areas: Mitigation (renewable energy, transport), Adaptation (water, agriculture), Cross-cutting. Project size: Micro (<$10M), Small, Medium, Large (>$250M).',
        '["Identify relevant climate fund opportunities", "Connect with accredited entities in India", "Develop project concept for climate fund", "Navigate application process"]'::jsonb,
        '["Climate Fund Comparison", "India Accredited Entities List", "Concept Note Template", "Application Process Guide"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 43: Blended Finance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        43,
        'Blended Finance Structures',
        'Blended finance: Combining concessional (DFI/foundation) with commercial capital. Structures: Junior/senior tranches, Guarantees, First-loss capital, Technical assistance grants. Purpose: De-risk projects to attract commercial investment. Key providers: DFIs (IFC, DEG, FMO), Foundations (Rockefeller, Omidyar), Development agencies (USAID, DFID). India examples: Solar rooftop financing, MSME clean energy, Agriculture resilience.',
        '["Understand blended finance structures", "Identify potential providers for your sector", "Design blended finance concept", "Approach providers with structured proposal"]'::jsonb,
        '["Blended Finance Structure Guide", "Provider Database", "Concept Design Template", "Proposal Framework"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 44: Sustainability-Linked Loans
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        44,
        'Sustainability-Linked Loans (SLLs)',
        'SLLs: Loan terms linked to sustainability performance. Mechanism: Interest rate varies based on achieving Sustainability Performance Targets (SPTs). SPTs: Emission reduction, Renewable energy share, Water efficiency, Diversity metrics. Rate adjustment: Typically 5-25 bps reduction for meeting targets. Principles: LMA/APLMA Sustainability-Linked Loan Principles. Growing in India: Major banks offering SLL products.',
        '["Identify potential SPTs for your organization", "Approach banks with SLL products", "Negotiate SPT targets and rate adjustments", "Implement SPT monitoring and reporting"]'::jsonb,
        '["SPT Identification Framework", "Bank SLL Product Comparison", "Negotiation Guide", "Monitoring Protocol"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 45: Carbon Finance Integration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        45,
        'Integrating Carbon Credits with Project Finance',
        'Carbon credits as additional revenue: Include in project financial model. Bankability: Lenders increasingly recognize carbon revenue for debt sizing. Structures: Carbon credit purchase agreements (CPA) supporting project finance, Carbon credit monetization facilities, Carbon-backed lending. Considerations: Price assumption conservatism, Delivery risk, Credit quality acceptance. Early engagement: Include carbon strategy in project planning, not afterthought.',
        '["Model carbon revenue in project finance", "Engage lenders on carbon credit treatment", "Structure carbon credits to support financing", "Negotiate carbon-aware facility terms"]'::jsonb,
        '["Carbon-Integrated Financial Model", "Lender Engagement Guide", "Structuring Options", "Term Negotiation Checklist"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Renewable Energy Certificates (Days 46-49)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Renewable Energy Certificates',
        'Navigate India REC market, international I-RECs, and renewable procurement strategies',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 46: India REC Market
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        46,
        'India Renewable Energy Certificate Market',
        'India REC: Tradable certificate representing 1 MWh of renewable energy. Purpose: Help obligated entities meet Renewable Purchase Obligations (RPO). Types: Solar REC, Non-solar REC. Trading: On power exchanges (IEX, PXIL), Last Wednesday of month. Prices: Floor (Rs 1,000) and forbearance (Rs 2,500/3,500). Validity: Perpetual (recent change). Market evolution: Growing volumes, stable prices, increasing RPO targets driving demand.',
        '["Understand India REC market structure", "Analyze REC price trends", "Identify REC generation or purchase opportunity", "Register on power exchange for trading"]'::jsonb,
        '["India REC Market Guide", "Price Trend Analysis", "Opportunity Assessment Tool", "Exchange Registration Guide"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: International RECs (I-RECs)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        47,
        'International RECs (I-RECs)',
        'I-REC: International renewable energy certificate for Scope 2 market-based accounting. Administrator: I-REC Standard (Netherlands). India I-REC: Growing market for multinational corporate buyers. Benefits: Scope 2 emission reduction claims, RE100 compliance, Global recognition. Generation: Register facility, Verify generation, Issue certificates. Price: $1-3 per MWh (varies by project type). Growing demand from global companies with India operations.',
        '["Understand I-REC system and requirements", "Assess I-REC generation opportunity", "Register as I-REC participant", "Connect with I-REC buyers"]'::jsonb,
        '["I-REC System Guide", "Generation Registration Process", "Participant Registration", "Buyer Connection Strategy"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 48: RE100 and Corporate Renewable Procurement
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        48,
        'RE100 and Corporate Renewable Procurement',
        'RE100: Global corporate initiative for 100% renewable electricity. 400+ members globally, 40+ in India (Infosys, Wipro, Mahindra, etc.). Procurement options: On-site generation, Off-site PPAs (physical, virtual), Utility green tariffs, Unbundled RECs (I-RECs). Hierarchy: Self-generation > PPAs > RECs. India market: Growing open access, green tariffs, PPA market. Opportunity: Supporting RE100 corporates with procurement solutions.',
        '["Map RE100 companies in India", "Understand procurement hierarchy", "Identify service opportunities", "Develop RE procurement solutions"]'::jsonb,
        '["RE100 India Members List", "Procurement Option Comparison", "Opportunity Assessment", "Solution Development Framework"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 49: REC Trading Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        49,
        'REC Trading Strategies',
        'Trading strategies: Spot trading (monthly auctions), Forward contracts (OTC agreements), Bundled sales (with power), Portfolio approach (mix of sources). Price factors: RPO deadlines, Supply volumes, Policy changes, Seasonal demand. Risk management: Diversify purchase timing, Monitor policy changes, Hedge with forwards. Arbitrage: India REC vs I-REC price differential for eligible buyers.',
        '["Develop REC trading strategy", "Monitor market and policy developments", "Execute trades optimally", "Manage price and volume risk"]'::jsonb,
        '["Trading Strategy Framework", "Market Monitoring System", "Trade Execution Checklist", "Risk Management Protocol"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Net Zero Strategy (Days 50-54)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Net Zero Strategy',
        'Develop corporate Net Zero strategies with Science-Based Targets and decarbonization pathways',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- Day 50: Net Zero Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        50,
        'Net Zero Fundamentals',
        'Net Zero: Reducing emissions to minimum and neutralizing residual with removals. Differs from Carbon Neutral: Net Zero requires deep decarbonization (90%+), Carbon Neutral allows offsetting. Net Zero timeline: 2050 for 1.5°C alignment. Components: Emission reduction (primary), Value chain engagement, Neutralization of residual. Net Zero Standard (SBTi): Sets requirements for credible Net Zero claims. 200+ Indian companies have Net Zero targets.',
        '["Understand Net Zero vs Carbon Neutral difference", "Review SBTi Net Zero Standard requirements", "Assess current emission baseline", "Set Net Zero ambition timeline"]'::jsonb,
        '["Net Zero vs Carbon Neutral Guide", "SBTi Net Zero Standard Summary", "Baseline Assessment Template", "Timeline Planning Tool"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 51: Science-Based Targets
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        51,
        'Setting Science-Based Targets',
        'Science-Based Targets initiative (SBTi): Validates corporate emission targets against climate science. Target types: Near-term (5-10 years), Long-term (Net Zero). Methods: Absolute contraction, Sector decarbonization approach (SDA). Requirements: Cover Scope 1 & 2 (mandatory), Scope 3 if significant (>40% of total). Process: Commit letter, Target development (24 months), Target submission, Validation (typically 2-3 months). 100+ Indian companies committed/validated.',
        '["Submit SBTi commitment letter", "Calculate baseline emissions", "Set near-term and long-term targets", "Submit for SBTi validation"]'::jsonb,
        '["SBTi Commitment Process", "Target Setting Methods Guide", "Calculation Tools", "Validation Preparation Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 52: Decarbonization Pathway Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        52,
        'Developing Decarbonization Pathways',
        'Decarbonization levers: Energy efficiency (reduce consumption), Electrification (fuel switching), Renewable energy (clean electricity), Process changes (industrial), Value chain engagement (Scope 3). Prioritization: Marginal abatement cost curve (MACC) - cost per tCO2e reduced. Typical pathway: Quick wins (efficiency) first, Then renewable energy, Then process changes (longer term), Residual neutralization. Develop roadmap with annual milestones.',
        '["Identify decarbonization levers by scope", "Build marginal abatement cost curve", "Prioritize interventions by cost and impact", "Develop phased decarbonization roadmap"]'::jsonb,
        '["Decarbonization Lever Inventory", "MACC Builder Tool", "Prioritization Framework", "Roadmap Template"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 53: Interim Targets and Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        53,
        'Interim Targets and Progress Tracking',
        'Interim targets: 5-year milestones to 2050 Net Zero. SBTi near-term: 4.2% annual reduction for 1.5°C. Target setting: Scope 1 & 2 combined, Scope 3 separate, Intensity or absolute. Reporting: Annual emission inventory, Progress against targets, Actions taken, Updated plans. Disclosure: CDP, TCFD, BRSR, Annual report. Accountability: Board-level oversight, Incentive alignment, External assurance.',
        '["Set interim milestone targets", "Implement progress tracking system", "Create annual reporting process", "Establish accountability mechanisms"]'::jsonb,
        '["Interim Target Setting Guide", "Progress Tracking Dashboard", "Reporting Template", "Governance Framework"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 54: Carbon Offsets in Net Zero
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        54,
        'Role of Offsets in Net Zero Strategy',
        'Offsets role: Neutralize residual emissions ONLY after deep decarbonization. SBTi position: Offsets don''t count toward near-term targets; only for neutralization of residual (<10%) at Net Zero. Quality requirements: Additionality, Permanence, No double counting, Verified by credible standard. Preference hierarchy: Removal > Avoidance, High-quality > Basic. Beyond value chain mitigation (BVCM): Invest in climate action beyond your value chain.',
        '["Understand appropriate role of offsets", "Develop offset quality criteria", "Plan offset procurement for residual", "Consider BVCM investment strategy"]'::jsonb,
        '["Offset Role in Net Zero Guide", "Quality Criteria Framework", "Procurement Strategy Template", "BVCM Planning Guide"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: ESG Compliance & Reporting (Days 55-58)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'ESG Compliance & Reporting',
        'Master SEBI BRSR, TCFD, CDP disclosure and integrated sustainability reporting',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 55: SEBI BRSR Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        55,
        'SEBI BRSR Framework Deep Dive',
        'BRSR: Mandatory sustainability reporting for top 1000 listed companies (from FY22-23). Structure: Section A (Company details), Section B (Management principles), Section C (Principle-wise performance). 9 Principles covering: Ethics, Sustainability, Employees, Stakeholders, Human rights, Environment, Policy advocacy, Inclusive growth, Customer value. BRSR Core: Extended to value chain from FY24-25. Assurance: Limited assurance requirement evolving.',
        '["Review complete BRSR format requirements", "Map current disclosures to BRSR", "Identify data gaps for BRSR compliance", "Create BRSR preparation plan"]'::jsonb,
        '["BRSR Format Detailed Guide", "Disclosure Mapping Tool", "Gap Assessment Template", "Preparation Roadmap"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 56: TCFD Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        56,
        'TCFD Climate Risk Disclosure',
        'TCFD: Task Force on Climate-related Financial Disclosures. Four pillars: Governance (board oversight), Strategy (climate risks and opportunities), Risk Management (climate risk processes), Metrics and Targets (emission metrics). Climate risks: Physical (extreme weather), Transition (policy, technology, market). Scenario analysis: 1.5°C, 2°C, 4°C scenarios. SEBI aligning BRSR with TCFD. Growing investor demand for TCFD disclosure.',
        '["Understand TCFD four pillars", "Assess climate risks and opportunities", "Conduct scenario analysis", "Prepare TCFD-aligned disclosure"]'::jsonb,
        '["TCFD Recommendations Guide", "Risk-Opportunity Assessment Tool", "Scenario Analysis Framework", "Disclosure Template"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 57: CDP Disclosure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        57,
        'CDP Climate Disclosure',
        'CDP: Global environmental disclosure system used by 18,000+ companies. Questionnaires: Climate Change, Forests, Water Security. Climate questionnaire: Governance, Risks/opportunities, Emissions (Scope 1,2,3), Targets, Strategy. Scoring: A (Leadership) to D- (Disclosure). Benefits: Investor requirement, Benchmarking, Improvement roadmap. India: 200+ companies responding. Supply chain program: Cascading disclosure to suppliers.',
        '["Register for CDP disclosure", "Understand questionnaire requirements", "Prepare response with evidence", "Submit and receive score"]'::jsonb,
        '["CDP Registration Guide", "Questionnaire Overview", "Response Preparation Checklist", "Scoring Criteria Guide"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 58: Integrated Sustainability Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        58,
        'Integrated Sustainability Reporting',
        'Integration challenge: Multiple frameworks (BRSR, TCFD, CDP, GRI). Solution: Build unified data system, Map requirements across frameworks, Single source of truth. Integrated report: Combines financial and sustainability information. ISSB: New global sustainability standards (IFRS S1, S2) harmonizing landscape. Future: Convergence toward global baseline standards. Build systems now for efficient multi-framework reporting.',
        '["Map overlapping requirements across frameworks", "Design unified data collection system", "Create integrated reporting template", "Plan for ISSB adoption"]'::jsonb,
        '["Framework Requirement Mapping", "Data System Design Guide", "Integrated Template", "ISSB Preparation Guide"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Sustainability Compliance (Day 59)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Sustainability Compliance',
        'Navigate PCB, E-waste, plastic waste, and EPR regulations',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_11_id;

    -- Day 59: Environmental Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_11_id,
        59,
        'Environmental Compliance Overview',
        'Key regulations: Environment Protection Act 1986, Water/Air Prevention and Control of Pollution Acts, Hazardous Waste Management Rules, E-Waste Management Rules, Plastic Waste Management Rules, Battery Waste Management Rules 2022. EPR: Extended Producer Responsibility for packaging, electronics, batteries. PCB: Consent to Establish (CTE) and Consent to Operate (CTO). Compliance: Register on CPCB/SPCB portals, File returns, Maintain records.',
        '["Map applicable environmental regulations", "Ensure CTE/CTO compliance", "Register for EPR obligations", "Create compliance calendar"]'::jsonb,
        '["Regulation Applicability Matrix", "CTE/CTO Process Guide", "EPR Registration Guide", "Compliance Calendar Template"]'::jsonb,
        120,
        100,
        0,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 12: Building a Carbon Business (Day 60)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Building a Carbon Business',
        'Launch and grow a successful carbon consulting and advisory business',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_12_id;

    -- Day 60: Carbon Business Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_12_id,
        60,
        'Building a Carbon Business',
        'Business models: Project development (generate credits), Advisory/consulting (help clients), Trading/brokerage (buy-sell), Technology (software, MRV), Carbon credit retail (corporate offsetting). Service offerings: Carbon footprint calculation, Net Zero strategy, BRSR/ESG reporting, Carbon credit sourcing, Offset procurement, SBTi target setting. Market opportunity: Growing corporate demand, Regulatory drivers (CCTS, BRSR), Evolving standards. Build credibility through certifications and track record.',
        '["Select carbon business model", "Define service offerings", "Build team capabilities", "Create go-to-market strategy"]'::jsonb,
        '["Business Model Canvas for Carbon", "Service Definition Template", "Capability Assessment Tool", "GTM Strategy Framework"]'::jsonb,
        120,
        100,
        0,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P15 Carbon Credits & Sustainability course created successfully with 12 modules and 60 lessons';
END $$;

COMMIT;
