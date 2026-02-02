-- THE INDIAN STARTUP - P14: Impact & CSR Mastery - Complete Content
-- Migration: 20260129_021_p14_impact_csr_course.sql
-- Purpose: Create comprehensive impact/CSR course with 11 modules and 55 lessons

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
BEGIN
    -- Insert P14 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P14',
        'Impact & CSR Mastery',
        'Master India''s Rs 25,000 Cr CSR ecosystem with Schedule VII compliance, social enterprise registration, IRIS+ impact measurement, corporate partnership development, and ESG integration.',
        8999,
        false,
        55,
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

    -- Clean existing modules and lessons for P14
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: CSR Landscape in India (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CSR Landscape in India',
        'Understanding India''s Rs 25,000 Cr CSR market, Companies Act requirements, and the evolving corporate giving ecosystem',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: India CSR Market Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'India CSR Market Overview',
        'India pioneered mandatory CSR through Companies Act 2013 (Section 135). The market has grown from Rs 10,000 Cr (2014) to Rs 25,000 Cr+ annually. 8,000+ companies mandate CSR spending. Top spenders: Reliance Industries (Rs 1,000 Cr+), TCS, HDFC Bank, Infosys. Key trends: Shift from charity to strategic CSR, Focus on SDGs, Preference for implementation partners with track record, Growing emphasis on impact measurement.',
        '["Research top 50 CSR spenders and their focus areas", "Map CSR trends by sector (IT, banking, manufacturing, energy)", "Identify gaps between corporate priorities and implementation capacity", "Create overview of CSR opportunity in your focus area"]'::jsonb,
        '["Top 100 CSR Spenders Database", "CSR Trends Report Template", "Sector Analysis Framework", "Market Sizing Calculator"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Companies Act Section 135
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Companies Act Section 135 Requirements',
        'CSR applicability threshold: Net worth Rs 500 Cr OR Turnover Rs 1,000 Cr OR Net profit Rs 5 Cr (any in preceding 3 years). Mandatory spend: 2% of average net profit of 3 preceding years. CSR Committee: Minimum 3 directors, 1 independent. Board responsibilities: Approve CSR policy, Annual Action Plan, ensure implementation, report in Annual Report. Non-compliance: Explain in board report or face penalty of Rs 50 lakh - Rs 25 Cr.',
        '["Understand threshold calculations and applicability", "Study CSR Committee composition requirements", "Review Annual Action Plan format requirements", "Create compliance checklist for CSR companies"]'::jsonb,
        '["Section 135 Compliance Guide", "Threshold Calculator", "CSR Committee Requirements", "Annual Report Disclosure Format"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: CSR Rules and Amendments
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'CSR Rules 2014 and Key Amendments',
        'Key amendments (2021): Unspent CSR must be transferred to separate account within 30 days. If unspent relates to ongoing project, transfer to Unspent CSR Account; otherwise to Schedule VII fund (PM CARES, PM National Relief Fund, etc.) within 6 months. Impact assessment mandatory for projects Rs 1 Cr+ running for 3+ years. Registration on MCA CSR-1 portal mandatory for implementation agencies.',
        '["Study 2021 amendment implications", "Understand ongoing vs non-ongoing project treatment", "Learn impact assessment requirements", "Prepare for CSR-1 registration requirements"]'::jsonb,
        '["CSR Rules 2021 Summary", "Unspent Amount Treatment Guide", "Impact Assessment Guidelines", "CSR-1 Registration Process"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: CSR Spending Patterns Analysis
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'CSR Spending Patterns and Priorities',
        'Spending by category (2023-24): Education (37%), Healthcare (25%), Rural development (12%), Environment (8%), Skill development (6%), Others (12%). Geographic concentration: Maharashtra (25%), Karnataka (12%), Gujarat (10%), Tamil Nadu (9%). Mode of implementation: Direct (45%), Through NGOs (40%), Through Section 8 companies (15%). Average project size: Rs 50 lakh - Rs 5 Cr for mid-size companies.',
        '["Analyze CSR spending patterns relevant to your sector", "Map geographic concentrations and underserved areas", "Identify high-growth CSR categories", "Create positioning strategy based on spending trends"]'::jsonb,
        '["CSR Spending Analysis Dashboard", "Geographic Heat Map Tool", "Category Trend Analysis", "Positioning Strategy Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: CSR Ecosystem Stakeholders
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'CSR Ecosystem Stakeholders',
        'Key stakeholders: Corporate CSR teams (budget owners), CSR consultants (project design), Implementation partners (NGOs/social enterprises), Impact assessors (evaluation), CSR platforms (matching), Government (policy/oversight). Decision flow: CSR team identifies need → Board approves budget → Implementation partner selected → Project executed → Impact assessed → Reported to MCA. Relationship building at multiple levels is critical.',
        '["Map stakeholder ecosystem for your target sector", "Identify key CSR decision-makers in target companies", "Understand procurement/selection processes", "Create stakeholder engagement strategy"]'::jsonb,
        '["Stakeholder Mapping Template", "Decision-Maker Database Structure", "Selection Process Guide", "Engagement Strategy Framework"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Schedule VII Compliance (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Schedule VII Compliance',
        'Master Schedule VII activities and design compliant CSR projects',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 6: Schedule VII Activities Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Schedule VII Activities Overview',
        'Schedule VII defines 12 eligible CSR activities: (i) Hunger, poverty, malnutrition; (ii) Education including special education; (iii) Healthcare including preventive; (iv) Environment, ecological balance, conservation; (v) Protection of national heritage, art, culture; (vi) Armed forces welfare; (vii) Rural sports, Paralympics, Olympics; (viii) PM Relief Fund and similar; (ix) Slum area development; (x) Disaster management; (xi) COVID-related activities; (xii) Contributions to incubators.',
        '["Review all 12 Schedule VII categories in detail", "Map your activities to appropriate categories", "Understand interpretation guidelines from MCA", "Identify multi-category project opportunities"]'::jsonb,
        '["Schedule VII Activity Matrix", "Category Mapping Guide", "MCA Circulars and Clarifications", "Multi-Category Project Examples"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Education CSR Projects
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Education Category CSR Projects',
        'Education receives 37% of CSR funds. Eligible activities: Promoting education (formal, special, vocational), Establishing schools/colleges, Providing scholarships, Livelihood enhancement through skilling, Setting up libraries and e-learning infrastructure. Successful models: Digital classrooms (Rs 5-10L per school), Skill centers (Rs 25-50L), Scholarships (Rs 25,000-1L per student), Teacher training programs. Corporate preference: Scalable models with measurable outcomes.',
        '["Design education project aligned with Schedule VII", "Create outcome-based logic model", "Develop cost-per-beneficiary metrics", "Prepare case studies of successful education CSR"]'::jsonb,
        '["Education Project Design Template", "Logic Model Framework", "Cost Per Outcome Calculator", "Education CSR Case Studies"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Healthcare CSR Projects
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Healthcare Category CSR Projects',
        'Healthcare receives 25% of CSR funds. Eligible: Promoting healthcare, Preventive healthcare, Sanitation, Safe drinking water, Making healthcare accessible (especially underprivileged). High-impact models: Mobile health camps (Rs 2-5L per camp), PHC upgradation (Rs 25-50L), Dialysis centers (Rs 1-2 Cr), Ambulance services (Rs 30-50L per vehicle), Water purification plants (Rs 10-25L). Post-COVID, mental health and preventive care gaining priority.',
        '["Design healthcare project with preventive focus", "Calculate cost per life saved/health outcome", "Create sustainability plan beyond CSR funding", "Document healthcare project for corporate presentation"]'::jsonb,
        '["Healthcare Project Template", "Health Outcome Metrics Guide", "Sustainability Planning Framework", "Corporate Presentation Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Environment and Livelihood Projects
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Environment and Livelihood CSR Projects',
        'Environment (8% of CSR): Ecological balance, Conservation, Animal welfare, Agroforestry, Water conservation, Renewable energy, Carbon sequestration. Livelihood (within multiple categories): Vocational skills, Women empowerment, Agriculture improvement, Rural enterprises. Growing categories as companies pursue Net Zero. Models: Tree plantation (Rs 100-500 per tree), Watershed development (Rs 5-10L per village), Solar installations (Rs 1L per kW), Skill training (Rs 10-25K per trainee).',
        '["Design environment project with carbon/water metrics", "Create livelihood project with income improvement metrics", "Develop hybrid environment-livelihood model", "Calculate environmental impact per rupee spent"]'::jsonb,
        '["Environment Project Template", "Livelihood Logic Model", "Hybrid Project Framework", "Environmental ROI Calculator"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Designing Compliant Projects
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Designing Schedule VII Compliant Projects',
        'Compliance essentials: Clear mapping to Schedule VII category, No business promotion element, Beneficiaries not employees/families, Geographic focus (preferably local area), Measurable outcomes, Proper documentation. Red flags: Marketing/brand building disguised as CSR, Benefits to business associates, Overseas spending, Political contributions, Sponsorships without social impact. Get legal review for borderline activities.',
        '["Audit project design for Schedule VII compliance", "Remove any business promotion elements", "Define clear beneficiary criteria", "Create compliance documentation checklist"]'::jsonb,
        '["Compliance Audit Checklist", "Business Promotion vs CSR Guide", "Beneficiary Documentation Template", "Legal Review Checklist"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Social Enterprise Registration (Days 11-16)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Social Enterprise Registration',
        'Navigate Section 8 company, Trust, Society registration and tax exemptions',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 11: Legal Structure Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        11,
        'Legal Structure Selection for Social Enterprises',
        'Options: Trust (simplest, state-registered), Society (member-based, state-registered), Section 8 Company (most credible, centrally registered), Private Limited (for-profit social enterprise). CSR preference: Section 8 > Trust > Society. Factors: Credibility with corporates, Compliance burden, Tax benefits, Foreign funding eligibility (FCRA), Exit/wind-up flexibility. Section 8 recommended for serious CSR partnerships.',
        '["Evaluate each legal structure for your needs", "Compare compliance requirements and costs", "Assess corporate funder preferences", "Select optimal structure with legal advice"]'::jsonb,
        '["Legal Structure Comparison Tool", "Compliance Cost Calculator", "Corporate Preference Survey Data", "Structure Selection Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: Section 8 Company Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        12,
        'Section 8 Company Registration Process',
        'Section 8 Company: Limited company for charitable purposes with no profit distribution. Process: Apply for name availability, Draft MOA/AOA with charitable objects, Apply for Section 8 license from Regional Director, Incorporate on MCA portal post-license. Requirements: Minimum 2 directors, No minimum capital, Registered office, Objects clause covering Schedule VII activities. Timeline: 3-6 months. Cost: Rs 50,000-1,00,000 including professional fees.',
        '["Reserve company name on MCA portal", "Draft MOA with Schedule VII aligned objects", "Prepare Section 8 license application", "File incorporation documents post-license"]'::jsonb,
        '["Name Availability Check Guide", "Model MOA for Section 8", "License Application Format", "Incorporation Checklist"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 13: Trust and Society Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Trust and Society Registration',
        'Trust: Governed by Indian Trusts Act 1882 or state-specific acts. Requires Trust Deed with settlor, trustees, and objects. Registration with local Sub-Registrar. Minimum 2 trustees. Cost: Rs 10,000-25,000. Society: Governed by Societies Registration Act 1860 or state acts. Requires MOA signed by minimum 7 members. Registration with Registrar of Societies. Cost: Rs 15,000-30,000. Both require annual compliance filings.',
        '["Decide between Trust and Society based on needs", "Draft Trust Deed or Society MOA", "Prepare registration documents", "File with appropriate registrar"]'::jsonb,
        '["Trust Deed Template", "Society MOA Template", "State-wise Registration Guide", "Post-Registration Compliance Calendar"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: 12A and 80G Tax Exemptions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        '12A and 80G Registration',
        '12A: Income tax exemption for the organization. Without 12A, entire income is taxable. Apply within 3 months of registration. Validity: Permanent for older entities, 5 years for new. 80G: Donors get 50% or 100% tax deduction on donations. Critical for CSR as companies seek tax benefit clarity. Apply to Commissioner of Income Tax. Timeline: 3-6 months. Both require: Registration certificate, Trust deed/MOA, Financial statements, Activity reports.',
        '["Apply for 12A registration within timeline", "Prepare 80G application with supporting documents", "Maintain records for compliance", "Communicate 80G status to potential donors"]'::jsonb,
        '["12A Application Guide", "80G Application Format", "Document Checklist", "Donor Communication Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: FCRA Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'FCRA Registration for Foreign Funding',
        'FCRA (Foreign Contribution Regulation Act) required to receive foreign donations. Eligibility: 3 years of activity with minimum Rs 15 lakh spending. Categories: Prior Permission (project-specific) or Registration (general). FCRA 2020 amendments: No sub-granting allowed, Administrative expenses capped at 20%, FCRA account only at SBI New Delhi Main Branch. Timeline: 6-12 months. Compliance: Annual return to MCA, Maintain separate accounts.',
        '["Assess FCRA eligibility requirements", "Prepare 3-year activity and financial records", "Open SBI New Delhi FCRA account", "Apply through FCRA portal"]'::jsonb,
        '["FCRA Eligibility Checklist", "Application Document Guide", "SBI Account Opening Process", "Annual Compliance Calendar"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 16: CSR-1 Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'CSR-1 Registration on MCA Portal',
        'CSR-1 registration mandatory from April 2021 for all CSR implementing agencies. Register on MCA portal with: Registration certificate, 12A/80G certificates (if applicable), 3 years audited financials, Activity reports, Board resolution. Unique CSR Registration Number issued. Companies can only fund registered entities. Validity: 3 years, renewable. Invalid CSR-1 means companies cannot claim CSR expenditure.',
        '["Gather all required documents for CSR-1", "Create MCA portal account if not existing", "File CSR-1 application with all attachments", "Share CSR-1 number with corporate partners"]'::jsonb,
        '["CSR-1 Document Checklist", "MCA Portal Registration Guide", "Application Filing Process", "Corporate Communication Template"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Impact Measurement Fundamentals (Days 17-22)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Impact Measurement Fundamentals',
        'Master Theory of Change, impact indicators, data collection, and Social Return on Investment',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 17: Theory of Change
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        17,
        'Developing Theory of Change',
        'Theory of Change (ToC) maps how activities lead to impact. Components: Ultimate Goal (long-term change), Outcomes (intermediate changes), Outputs (direct results of activities), Activities (what you do), Inputs (resources used), Assumptions (conditions needed). Build backwards from goal to activities. ToC guides measurement strategy and helps communicate impact logic to funders. Review and update ToC annually based on learning.',
        '["Define ultimate goal for your organization/program", "Map pathway from activities to outcomes to goal", "Identify and document key assumptions", "Create visual ToC diagram for stakeholder communication"]'::jsonb,
        '["Theory of Change Template", "Pathway Mapping Guide", "Assumption Testing Framework", "ToC Visualization Tool"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 18: Impact Indicators Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        18,
        'Selecting Impact Indicators',
        'Indicator types: Output (direct results - students trained), Outcome (behavior change - students employed), Impact (systemic change - income increased). SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound. Core indicators per sector: Education (enrollment, learning outcomes, completion), Health (cases treated, behavior change, mortality reduction), Livelihoods (income increase, jobs created). Limit to 15-20 key indicators.',
        '["Review IRIS+ catalog for sector indicators", "Select 15-20 indicators covering outputs-outcomes-impact", "Define measurement methodology for each indicator", "Create indicator reference sheet with targets"]'::jsonb,
        '["IRIS+ Indicator Catalog Link", "Indicator Selection Matrix", "Measurement Methodology Guide", "Indicator Reference Sheet Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 19: Data Collection Methods
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'Data Collection Methods and Tools',
        'Methods: Surveys (quantitative - large scale), Interviews (qualitative - depth), Focus groups (group dynamics), Observation (behavior verification), Administrative data (existing records). Tools: Paper forms (simple but error-prone), Mobile data collection (KoBoToolbox, ODK, SurveyCTO - recommended), MIS integration. Sampling: Census for small populations, Random sampling for large. Data quality: Training, Double entry, Spot checks.',
        '["Design data collection forms for your indicators", "Select data collection technology platform", "Create sampling plan for beneficiary surveys", "Develop data quality protocols"]'::jsonb,
        '["Survey Design Template", "Mobile Data Collection Platform Comparison", "Sampling Calculator", "Data Quality Checklist"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 20: Attribution and Counterfactual
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Attribution and Counterfactual Analysis',
        'Attribution: Proving outcomes are because of your intervention, not other factors. Counterfactual: What would have happened without intervention. Methods: Randomized Control Trials (gold standard but expensive), Quasi-experimental (comparison groups), Pre-post with comparison, Contribution analysis (qualitative). Challenges: Selection bias, Contamination, External factors. For most CSR projects, well-designed pre-post with comparison group is practical.',
        '["Assess attribution requirements for your funder", "Design comparison group methodology", "Plan baseline and endline data collection", "Document contribution vs attribution claims clearly"]'::jsonb,
        '["Attribution Methods Guide", "Comparison Group Design Template", "Baseline-Endline Protocol", "Claims Documentation Framework"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 21: Social Return on Investment (SROI)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'Social Return on Investment (SROI)',
        'SROI assigns monetary value to social outcomes. Formula: SROI Ratio = Present Value of Benefits / Present Value of Investment. A ratio of 3:1 means Rs 3 social value for every Rs 1 invested. Steps: Map outcomes, Evidence outcomes, Value outcomes (using proxies), Establish impact, Calculate SROI. Financial proxies: Value of education (increased lifetime earnings), Health (QALYs), Employment (income generated). SROI analysis costs Rs 3-10 lakh.',
        '["Identify key outcomes for SROI analysis", "Research financial proxies for each outcome", "Collect outcome data for SROI calculation", "Calculate and validate SROI ratio"]'::jsonb,
        '["SROI Calculator Template", "Financial Proxy Database", "Outcome Valuation Guide", "SROI Report Template"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 22: Impact Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'Impact Reporting Best Practices',
        'Report components: Executive summary, Program description, Theory of Change, Methodology, Findings (outputs, outcomes, impact), Lessons learned, Recommendations. Frequency: Quarterly operational reports, Annual impact reports. Visualization: Dashboards, Infographics, Beneficiary stories. Corporate requirements: Input-output-outcome metrics, Cost per beneficiary, Comparison to targets, Photos and testimonials. Tailor depth to audience.',
        '["Create impact report template for your organization", "Develop dashboard with key metrics", "Collect and document beneficiary stories", "Schedule regular reporting calendar"]'::jsonb,
        '["Impact Report Template", "Dashboard Design Guide", "Story Collection Protocol", "Reporting Calendar Template"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: IRIS+ & Global Standards (Days 23-28)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'IRIS+ & Global Standards',
        'Implement IRIS+ framework, align with SDGs, and achieve GIIRS and B Corp recognition',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 23: IRIS+ Framework Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        23,
        'IRIS+ Framework Overview',
        'IRIS+ (Impact Reporting and Investment Standards) is the global standard for impact measurement, managed by Global Impact Investing Network (GIIN). Components: Catalog of 600+ standardized metrics, Core Metrics Sets by theme (Climate, Gender, Workforce), Strategic Goals (Impact Categories, SDGs), Evidence and best practices. Benefits: Credibility with global funders, Comparability across organizations, Alignment with impact investing requirements.',
        '["Create IRIS+ account on iris.thegiin.org", "Explore catalog relevant to your sector", "Identify applicable Core Metrics Sets", "Map existing indicators to IRIS+ metrics"]'::jsonb,
        '["IRIS+ Registration Guide", "Catalog Navigation Tutorial", "Core Metrics Set Overview", "Indicator Mapping Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 24: SDG Alignment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        24,
        'SDG Alignment and Reporting',
        'UN Sustainable Development Goals: 17 goals with 169 targets. Key SDGs for CSR: SDG 1 (No Poverty), SDG 2 (Zero Hunger), SDG 3 (Good Health), SDG 4 (Quality Education), SDG 5 (Gender Equality), SDG 6 (Clean Water), SDG 8 (Decent Work), SDG 13 (Climate Action). SDG mapping: Identify primary and secondary SDGs, Map activities to specific targets, Report using SDG framework. Growing corporate interest in SDG-aligned CSR.',
        '["Map your programs to relevant SDGs and targets", "Identify SDG indicators applicable to your work", "Create SDG contribution statement", "Design SDG-aligned reporting format"]'::jsonb,
        '["SDG Mapping Template", "SDG Indicator Reference", "Contribution Statement Guide", "SDG Reporting Framework"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 25: GIIRS Rating
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        25,
        'GIIRS Rating Process',
        'GIIRS (Global Impact Investing Rating System) provides third-party impact ratings using B Impact Assessment methodology. Rating areas: Governance, Workers, Community, Environment, Customers/Beneficiaries. Scoring: Bronze/Silver/Gold based on assessment score. Process: Complete B Impact Assessment, Verification review, Rating issuance. Cost: Variable based on organization size. Benefits: Credibility with impact investors, Benchmark against peers, Continuous improvement roadmap.',
        '["Complete B Impact Assessment online", "Identify areas for improvement", "Prepare documentation for verification", "Develop action plan for rating improvement"]'::jsonb,
        '["B Impact Assessment Guide", "Documentation Checklist", "Improvement Planning Template", "Peer Benchmarking Tool"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 26: B Corp Certification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        26,
        'B Corp Certification for Social Enterprises',
        'B Corp certification verifies social and environmental performance standards. Requirements: Score 80+ on B Impact Assessment (out of 200), Legal requirement (benefit company or mission lock), Pass verification. Cost: Rs 50,000-5,00,000/year based on revenue. Timeline: 6-12 months. Benefits: Global community of 6,000+ B Corps, Marketing differentiation, Talent attraction, Corporate partnership credibility. Growing B Corp movement in India with 100+ certified.',
        '["Complete B Impact Assessment with 80+ target", "Review legal requirements for benefit company", "Prepare for verification process", "Plan B Corp marketing strategy"]'::jsonb,
        '["B Corp Certification Roadmap", "Legal Requirements Guide", "Verification Preparation Checklist", "B Corp Marketing Guide"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 27: GRI Reporting Standards
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        27,
        'GRI Sustainability Reporting',
        'GRI (Global Reporting Initiative) provides world''s most widely used sustainability reporting standards. Structure: Universal Standards (governance, strategy), Sector Standards (specific sectors), Topic Standards (specific topics like emissions, diversity). Reporting levels: Core (minimum disclosures), Comprehensive (all relevant disclosures). Used by major corporations globally; understanding GRI helps in CSR conversations and positioning impact data appropriately.',
        '["Review GRI Standards relevant to your sector", "Map your reporting to GRI framework", "Identify gaps in current reporting", "Create GRI-aligned annual report outline"]'::jsonb,
        '["GRI Standards Overview", "Sector-specific Standards Guide", "Gap Analysis Template", "GRI Report Template"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 28: Integrated Impact Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        28,
        'Integrated Impact Management System',
        'Impact management is ongoing practice, not one-time measurement. Components: Strategy (ToC, goals), Measurement (indicators, data), Management (decisions, learning), Reporting (stakeholder communication). Impact Management Project (IMP) 5 dimensions: What (outcome), Who (stakeholder), How Much (scale, depth, duration), Contribution (vs counterfactual), Risk (of impact not occurring). Build systems that integrate impact into operations.',
        '["Assess current impact management maturity", "Design integrated impact management system", "Create decision-making processes using impact data", "Establish continuous improvement practices"]'::jsonb,
        '["Impact Management Maturity Assessment", "System Design Framework", "Decision Protocol Template", "Continuous Improvement Guide"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: CSR Proposal Writing (Days 29-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CSR Proposal Writing',
        'Master corporate priorities research, proposal structure, budgeting, and pitch presentations',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 29: Understanding Corporate CSR Priorities
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        29,
        'Understanding Corporate CSR Priorities',
        'Research corporate priorities before pitching. Sources: CSR policy (website/annual report), Past CSR spending (MCA filings), Business priorities and brand positioning, Leadership statements on social causes. Key factors: Geographic focus (often near operations), Thematic focus (often aligned to business), Scale preferences, Implementation model preference (direct vs partnership). Top trends: Employee engagement CSR, Measurable outcomes, Multi-year commitments.',
        '["Research target company CSR policy and history", "Analyze geographic and thematic priorities", "Identify decision-makers and their preferences", "Map your fit with corporate priorities"]'::jsonb,
        '["Corporate Research Template", "CSR Policy Analysis Framework", "Decision-Maker Mapping Tool", "Fit Assessment Matrix"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 30: Proposal Structure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        30,
        'Proposal Structure and Content',
        'Standard proposal structure: Executive Summary (1 page), Organization Profile (credibility), Problem Statement (with data), Solution/Approach (Theory of Change), Implementation Plan (activities, timeline, geography), Team and Capabilities, Impact Measurement Plan, Budget with Justification, Sustainability Plan, Appendices (registration documents, past reports). Keep main proposal under 15 pages; detail in appendices.',
        '["Create proposal template with all sections", "Develop compelling problem statement with local data", "Design clear implementation plan with milestones", "Write executive summary that sells the proposal"]'::jsonb,
        '["Proposal Template", "Problem Statement Guide", "Implementation Plan Template", "Executive Summary Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 31: Budget Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        31,
        'CSR Budget Development',
        'Budget categories: Program costs (70-80%), Administrative costs (15-20% max often specified), Monitoring & Evaluation (5-10%). Line items: Personnel (salaries, benefits), Activities (training, materials), Travel, Equipment, Indirect costs. Budget notes: Justify each line item, Show cost efficiency, Include assumptions. Corporate expectations: Reasonable admin ratio, No padding, Clear cost per beneficiary, Value for money demonstration.',
        '["Create detailed line item budget", "Calculate and justify cost per beneficiary", "Develop budget narrative with assumptions", "Prepare multi-year budget if applicable"]'::jsonb,
        '["Budget Template", "Cost Per Beneficiary Calculator", "Budget Narrative Guide", "Multi-year Budget Framework"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 32: Pitch Deck Creation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        32,
        'CSR Pitch Deck Creation',
        'Pitch deck structure (10-12 slides): Title slide, Problem overview, Solution and approach, Impact achieved (track record), Proposed project overview, Implementation plan, Team, Budget summary, Partnership ask, Contact/Next steps. Design: Clean professional look, Minimal text, Strong visuals, Impact numbers prominently, Beneficiary photos/stories. Customize for each corporate; highlight alignment with their priorities.',
        '["Create master pitch deck template", "Develop compelling visual story of impact", "Prepare 5-minute and 15-minute presentation versions", "Practice pitch with feedback"]'::jsonb,
        '["Pitch Deck Template", "Visual Storytelling Guide", "Presentation Script Outline", "Pitch Practice Checklist"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 33: Customization Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        33,
        'Proposal Customization Strategy',
        'Generic proposals rarely succeed; customization shows understanding of corporate needs. Customization points: Executive summary highlighting fit, Problem localized to their geography, Solution aligned to their focus areas, Impact metrics matching their reporting needs, Budget fitting their typical grant sizes, References from similar corporates. Research time: Spend 20-30% of proposal time on research and customization.',
        '["Develop customization checklist", "Create modular proposal sections for quick customization", "Build corporate-specific talking points", "Practice articulating fit for different corporates"]'::jsonb,
        '["Customization Checklist", "Modular Content Library", "Talking Points Template", "Fit Articulation Scripts"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 34: Common Objections and Responses
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        34,
        'Handling Common CSR Objections',
        'Common objections: "We fund only in our operating areas" (propose neighboring districts or offer consultation), "Budget too high" (offer phased approach), "We prefer implementation partners with X years experience" (highlight team experience, offer pilot), "We need different impact metrics" (customize M&E plan), "We have existing partners" (offer complementary program or collaboration). Always acknowledge objection, understand underlying concern, provide solution.',
        '["Document common objections encountered", "Prepare responses for each objection", "Develop alternative proposals for budget objections", "Create objection handling scripts"]'::jsonb,
        '["Objection Response Guide", "Budget Alternative Framework", "Pilot Project Template", "Objection Handling Scripts"]'::jsonb,
        90,
        50,
        5,
        NOW(),
        NOW()
    );

    -- Day 35: Proposal Submission and Follow-up
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        35,
        'Proposal Submission and Follow-up',
        'Submission best practices: Confirm submission requirements (format, portal, email), Submit before deadline with buffer, Send confirmation email, Include all supporting documents. Follow-up: Wait 2 weeks post-deadline, Polite inquiry email to point of contact, Offer to provide additional information, Request feedback even if not selected. Track all submissions in pipeline with status and next actions.',
        '["Create proposal submission checklist", "Develop follow-up email templates", "Set up proposal tracking system", "Build feedback collection process"]'::jsonb,
        '["Submission Checklist", "Follow-up Email Templates", "Pipeline Tracking Spreadsheet", "Feedback Request Template"]'::jsonb,
        90,
        75,
        6,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Corporate Partnership Development (Days 36-41)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Corporate Partnership Development',
        'Build sustainable corporate partnerships through pipeline development, negotiation, and relationship management',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 36: Pipeline Development
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        36,
        'Building CSR Partnership Pipeline',
        'Pipeline stages: Prospect (identified potential funder), Lead (initial contact made), Qualified (confirmed interest), Proposal (submitted), Negotiation (terms discussed), Closed (agreement signed). Sources: MCA CSR data analysis, Corporate websites, LinkedIn, CSR events, Referrals from existing partners. Target: 50+ prospects to yield 10 qualified leads to yield 3-5 partnerships. Maintain pipeline with regular updates.',
        '["Build target list of 50 corporate prospects", "Qualify prospects based on fit criteria", "Set up CRM or tracking system for pipeline", "Create outreach plan for top 20 prospects"]'::jsonb,
        '["Prospect List Template", "Qualification Criteria Checklist", "CRM Setup Guide", "Outreach Plan Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: Outreach and Initial Contact
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        37,
        'Corporate Outreach Strategies',
        'Outreach channels: LinkedIn (identify CSR head, personalized connection), Email (concise, specific ask), Referral (most effective - 5x higher response rate), Events (CSR conferences, roundtables), CSR platforms (CAF, GuideStar, Give India). Outreach message: Brief intro (1 line), Relevance to their priorities (1-2 lines), Specific ask (meeting, call), Clear value proposition. Follow-up: 3 attempts over 3 weeks before moving on.',
        '["Identify contact person for each target corporate", "Draft personalized outreach messages", "Plan multi-channel outreach approach", "Set up follow-up reminder system"]'::jsonb,
        '["Contact Research Template", "Outreach Message Templates", "Multi-Channel Plan", "Follow-up Calendar"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: Discovery Meetings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        38,
        'Conducting Discovery Meetings',
        'Discovery meeting goals: Understand their CSR strategy and priorities, Identify decision-making process and timeline, Assess potential fit, Identify specific opportunities. Key questions: What are CSR priorities for coming year? What are geographic focus areas? What is typical project size? What is decision-making timeline? What do they look for in implementation partners? Listen more than talk (70/30 rule). End with clear next steps.',
        '["Prepare discovery meeting question list", "Research corporate before meeting", "Practice active listening techniques", "Create meeting follow-up template"]'::jsonb,
        '["Discovery Questions Template", "Pre-Meeting Research Checklist", "Meeting Notes Template", "Follow-up Email Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: Partnership Negotiation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        39,
        'Partnership Negotiation',
        'Negotiation areas: Grant amount (start higher, justify value), Payment terms (upfront vs milestone-based), Reporting frequency and format, Duration (prefer multi-year), Branding and visibility rights, Geographic scope, Exclusivity clauses. Negotiation approach: Understand their constraints, Highlight your flexibility, Find win-win solutions, Document all agreements. Red flags: Unreasonable reporting burden, Punitive clauses, Unclear payment terms.',
        '["Identify negotiable and non-negotiable items", "Prepare justification for key asks", "Document negotiation outcomes", "Review agreement with legal counsel"]'::jsonb,
        '["Negotiation Preparation Checklist", "Justification Documents", "Agreement Summary Template", "Legal Review Checklist"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: MOU and Agreement
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        40,
        'MOU and Partnership Agreements',
        'Agreement types: Letter of Intent (non-binding), MOU (semi-binding), Grant Agreement (binding). Key clauses: Parties and purpose, Scope of work, Deliverables and timeline, Grant amount and payment schedule, Reporting requirements, Branding guidelines, Termination conditions, Dispute resolution, Intellectual property. Review: Legal review essential, Negotiate unfavorable clauses, Keep copies of signed documents.',
        '["Review standard MOU template", "Identify clauses requiring modification", "Prepare clause alternatives for negotiation", "Create agreement tracking system"]'::jsonb,
        '["MOU Template", "Agreement Clause Guide", "Negotiation Alternatives Document", "Agreement Tracking Sheet"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 41: Relationship Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        41,
        'Long-term Relationship Management',
        'Relationship management activities: Regular reporting (exceed requirements), Site visits by corporate team, Employee volunteering opportunities, Senior leadership engagement, Quick response to queries, Proactive issue communication. Renewal strategy: Start renewal conversation 6 months before end, Demonstrate impact, Propose expansion. Upgrade path: Pilot → Full program → Multi-year → Strategic partnership.',
        '["Create partner communication calendar", "Plan corporate engagement opportunities", "Develop renewal strategy timeline", "Track relationship health indicators"]'::jsonb,
        '["Communication Calendar Template", "Engagement Activity Ideas", "Renewal Strategy Framework", "Relationship Health Dashboard"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: ESG Integration (Days 42-46)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'ESG Integration',
        'Master SEBI BRSR, ESG pillars, and reporting requirements',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 42: ESG Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        42,
        'ESG Fundamentals and Corporate Relevance',
        'ESG: Environmental, Social, and Governance factors for corporate sustainability assessment. Environmental: Climate change, Emissions, Waste, Water, Biodiversity. Social: Labor practices, Human rights, Community impact, Product safety, Diversity. Governance: Board composition, Executive pay, Business ethics, Transparency. CSR intersection: Social pillar strongly linked to CSR activities. Growing investor pressure driving ESG adoption.',
        '["Understand ESG framework and pillars", "Identify ESG-CSR intersection opportunities", "Research ESG trends in target sectors", "Position impact work within ESG context"]'::jsonb,
        '["ESG Framework Overview", "ESG-CSR Intersection Guide", "Sector ESG Trends", "Positioning Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 43: SEBI BRSR Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        43,
        'SEBI BRSR Reporting Requirements',
        'Business Responsibility and Sustainability Report (BRSR): Mandatory for top 1000 listed companies by market cap from FY 2022-23. Structure: General disclosures, Management and process disclosures, Principle-wise performance disclosure (9 principles). Principles cover: Ethics, Sustainable products, Employee wellbeing, Stakeholder engagement, Human rights, Environment, Policy advocacy, Inclusive growth, Customer value. BRSR Core for value chain assurance from FY 2024-25.',
        '["Review BRSR format and requirements", "Understand 9 principles and indicators", "Identify how your work supports BRSR reporting", "Prepare BRSR-aligned impact data"]'::jsonb,
        '["BRSR Format Overview", "9 Principles Guide", "BRSR-Impact Alignment Matrix", "Data Preparation Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 44: Social Pillar Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        44,
        'ESG Social Pillar Deep Dive',
        'Social pillar categories: Labor and Working Conditions (wages, safety, benefits), Human Rights (supply chain, community), Community Relations (local impact, CSR), Product Responsibility (safety, access), Diversity and Inclusion (workforce, leadership). Social metrics: Employee turnover, Safety incidents, Community investment, Beneficiaries reached, Diversity ratios. CSR activities directly contribute to Community Relations and can support broader Social pillar performance.',
        '["Map your impact to social pillar categories", "Identify metrics that support corporate social reporting", "Design programs supporting multiple social areas", "Create social pillar impact report template"]'::jsonb,
        '["Social Pillar Mapping Tool", "Metric Alignment Guide", "Program Design Framework", "Social Impact Report Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 45: Environmental Pillar for Impact Organizations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        45,
        'Environmental Pillar Opportunities',
        'Environmental pillar: Climate (emissions, Net Zero), Natural resources (water, materials), Pollution (waste, chemicals), Biodiversity. Growing corporate Net Zero commitments driving environmental CSR. Opportunity areas: Tree plantation/carbon sequestration, Renewable energy for communities, Water conservation, Waste management, Sustainable livelihoods. Position impact work to support corporate environmental goals.',
        '["Identify environmental impact opportunities", "Quantify environmental outcomes of your work", "Design programs supporting Net Zero goals", "Create environmental impact measurement system"]'::jsonb,
        '["Environmental Opportunity Matrix", "Environmental Metrics Guide", "Net Zero Program Ideas", "Measurement System Template"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 46: ESG Reporting and Communication
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        46,
        'ESG Reporting Support for Corporates',
        'Value proposition: Help corporates meet ESG reporting requirements through impact programs. Support areas: Data collection for BRSR social indicators, Story and case studies for reports, Third-party validation of social initiatives, Program design for ESG goals. Service offerings: ESG-aligned impact assessment, BRSR data support, Sustainability report content, Stakeholder engagement programs.',
        '["Develop ESG reporting support capabilities", "Create service offerings for corporate ESG support", "Build sample BRSR content from impact work", "Position organization as ESG partner"]'::jsonb,
        '["ESG Support Service Menu", "BRSR Content Templates", "Case Study Format", "Partner Positioning Document"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Impact Investing Ecosystem (Days 47-51)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Impact Investing Ecosystem',
        'Navigate impact investors, prepare for investment, and structure impact-linked deals',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- Day 47: Impact Investing Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        47,
        'Impact Investing Landscape in India',
        'India impact investment: $10+ billion AUM, growing 25%+ annually. Key investors: Omidyar Network, Acumen, Aavishkaar, Elevar Equity, Lok Capital, Caspian Impact Investment. Sectors: Financial inclusion (40%), Agriculture (15%), Healthcare (15%), Education (10%), Clean energy (10%). Investment types: Equity, Debt, Grants, Blended finance. Ticket sizes: Rs 50 lakh - Rs 50 crore typically. Growing domestic investor interest.',
        '["Map impact investors relevant to your sector", "Understand investment criteria and preferences", "Identify right-fit investors for your stage", "Create impact investor target list"]'::jsonb,
        '["Impact Investor Database", "Investment Criteria Comparison", "Fit Assessment Tool", "Target List Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 48: Investment Readiness Assessment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        48,
        'Investment Readiness Assessment',
        'Readiness factors: Clear impact thesis and measurement, Sustainable business model (revenue/earned income), Strong leadership team, Governance and legal structure, Financial controls and reporting, Growth strategy, Market opportunity validation. Assessment areas: Score 1-5 on each factor. Address gaps before fundraising. Typical preparation time: 6-12 months for first impact investment.',
        '["Complete investment readiness self-assessment", "Identify and prioritize gaps", "Create gap closure action plan", "Estimate timeline to investment readiness"]'::jsonb,
        '["Investment Readiness Scorecard", "Gap Analysis Template", "Action Plan Framework", "Readiness Timeline Planner"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 49: Impact Pitch Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        49,
        'Preparing Impact Investor Pitch',
        'Impact pitch elements: Problem and market opportunity, Solution and impact model, Business model and financials, Impact thesis and measurement, Team and track record, Funding ask and use of funds. Impact-specific: Lead with impact, but show financial sustainability. Investors seek: Scalable impact, Strong team, Path to sustainability/exit. Pitch practice: Refine through multiple presentations.',
        '["Develop impact investor pitch deck", "Prepare financial model with impact metrics", "Create compelling impact narrative", "Practice pitch with feedback"]'::jsonb,
        '["Impact Pitch Deck Template", "Financial Model Template", "Impact Narrative Guide", "Pitch Practice Checklist"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 50: Impact-Linked Finance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        50,
        'Impact-Linked Finance Structures',
        'Impact-linked finance: Financial terms linked to impact achievement. Types: Social Impact Bonds (outcomes-based payment), Development Impact Bonds (donor-funded), Impact-linked loans (interest rate tied to impact), Pay-for-success contracts. Components: Outcomes payer (government/donor), Investor (capital provider), Service provider (implementer), Evaluator (independent verification). Growing in India: Education, skilling, health outcomes contracts.',
        '["Understand impact-linked finance structures", "Assess fit for outcomes-based model", "Identify potential outcomes payers", "Design outcomes metrics for impact-linked deal"]'::jsonb,
        '["Impact-Linked Finance Guide", "Fit Assessment Tool", "Outcomes Payer Mapping", "Metrics Design Framework"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 51: Term Sheet Basics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        51,
        'Understanding Impact Investment Terms',
        'Key terms: Valuation (pre/post-money), Investment amount and structure (equity/debt/hybrid), Board composition and voting rights, Protective provisions (veto rights), Anti-dilution provisions, Liquidation preference, Exit expectations. Impact-specific: Impact reporting requirements, Impact covenants, Impact-linked returns. Negotiate: Valuation, Governance control, Reporting burden. Get legal advice.',
        '["Review sample term sheets", "Understand key negotiation points", "Identify acceptable terms for your organization", "Build relationship with impact-focused lawyer"]'::jsonb,
        '["Term Sheet Guide", "Negotiation Points Checklist", "Terms Assessment Framework", "Legal Resource List"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: NGO-Corporate Matchmaking (Days 52-54)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'NGO-Corporate Matchmaking',
        'Master CSR spending analysis, geographic and thematic matching strategies',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 52: CSR Spending Analysis
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        52,
        'Analyzing CSR Spending Data',
        'Data sources: MCA CSR filings (annual), Company annual reports, CSR databases (CSRbox, Goodera, India CSR Network), Direct research. Analysis dimensions: By company (spending, focus, geography), By sector (trends, gaps), By geography (concentration, underserved areas). Use data to: Identify target companies, Understand market trends, Find underserved opportunities. Regular analysis (quarterly) to track changes.',
        '["Access MCA CSR spending data", "Build analysis of target sector spending", "Identify companies with matching priorities", "Create target list with spending insights"]'::jsonb,
        '["MCA Data Access Guide", "Sector Analysis Template", "Company Matching Matrix", "Target List with Insights"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 53: Geographic and Thematic Matching
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        53,
        'Geographic and Thematic Matching',
        'Geographic matching: Companies prefer local area (near plants, offices). Map corporate presence to your operating areas. Thematic matching: Align your programs with corporate focus (education, health, environment, livelihoods). Multi-factor matching: Score prospects on geography fit + thematic fit + budget fit + past pattern. Prioritize high-score matches. Consider expanding geography or programs to access new funding.',
        '["Map your geography to corporate presence", "Create thematic alignment matrix", "Score and prioritize prospects using multi-factor matching", "Identify expansion opportunities for better match"]'::jsonb,
        '["Geography Mapping Tool", "Thematic Alignment Matrix", "Multi-Factor Scoring Model", "Expansion Opportunity Analysis"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 54: Partnership Platform Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        54,
        'Leveraging CSR Partnership Platforms',
        'CSR platforms: CAF India (corporate advised funds), GuideStar India (NGO directory), Goodera (volunteering + grants), CSRbox (matching platform), India CSR Network (events + directory). Platform benefits: Visibility to corporates, Credibility through listing, Matching algorithms, Event access. Strategy: Complete profiles on major platforms, Participate in platform events, Respond quickly to platform leads.',
        '["Register on major CSR platforms", "Complete detailed organizational profiles", "Monitor platform leads and opportunities", "Participate in platform events and webinars"]'::jsonb,
        '["Platform Registration Checklist", "Profile Optimization Guide", "Lead Management Process", "Event Participation Strategy"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Scaling Impact (Day 55)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Scaling Impact',
        'Strategies for growing impact through replication, technology, and partnerships',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_11_id;

    -- Day 55: Scaling Impact Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_11_id,
        55,
        'Scaling Impact: Strategies and Pathways',
        'Scaling approaches: Organizational growth (expand directly), Replication (others adopt your model), Network building (coordinate others), Policy influence (systemic change). Prerequisites: Proven model with evidence, Documented processes, Strong team, Sustainable funding model. Key decisions: Scale depth vs breadth, Centralized vs decentralized, Organic vs partnership growth. Technology: Enable scale through digital tools, data systems, remote delivery.',
        '["Assess scaling readiness", "Choose appropriate scaling strategy", "Document model for replication", "Create scaling roadmap"]'::jsonb,
        '["Scaling Readiness Assessment", "Strategy Selection Framework", "Model Documentation Guide", "Scaling Roadmap Template"]'::jsonb,
        120,
        100,
        0,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P14 Impact & CSR Mastery course created successfully with 11 modules and 55 lessons';
END $$;

COMMIT;
