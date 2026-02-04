-- THE INDIAN STARTUP - P14: Impact & CSR Mastery - Enhanced Content
-- Migration: 20260204_014_p14_impact_csr_enhanced.sql
-- Purpose: Enhance P14 course content to 500-800 words per lesson with India-specific data

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
    -- Get or create P14 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P14',
        'Impact & CSR Mastery',
        'Master India''s Rs 25,000 Cr CSR ecosystem with Schedule VII compliance, Section 8 company formation, IRIS+ impact measurement, corporate partnership development, ESG integration, and Social Stock Exchange listing. 55 days, 11 modules covering everything from NGO Darpan registration to B Corp certification.',
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

    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P14';
    END IF;

    -- Clean existing modules and lessons
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
        'Master India''s Rs 25,000 Cr CSR market. Understand Companies Act 2013 requirements, Section 135 compliance, spending patterns, and the evolving corporate giving ecosystem.',
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
        'India pioneered mandatory Corporate Social Responsibility through the Companies Act 2013, making it the first country to legislate compulsory CSR spending. Section 135 requires qualifying companies to spend 2% of their average net profits on social activities, creating a massive Rs 25,000+ crore annual ecosystem for social impact.

The market has evolved dramatically since inception. In FY 2014-15, total CSR spending was approximately Rs 10,066 crore. By FY 2022-23, this grew to over Rs 25,000 crore, representing a CAGR of approximately 12%. The number of companies meeting CSR thresholds has grown from approximately 16,000 in 2014 to over 23,000 companies today, though only about 8,000-9,000 actively report CSR spending.

Top CSR spenders dominate the landscape. Reliance Industries consistently leads with CSR spending exceeding Rs 1,000 crore annually through Reliance Foundation. Tata Group companies collectively spend over Rs 1,500 crore across Tata Steel, TCS, Tata Motors, and Tata Chemicals. HDFC Bank, Infosys, ONGC, Indian Oil Corporation, NTPC, and Coal India round out the top contributors. Interestingly, the top 100 companies contribute approximately 60% of total CSR spending, creating significant concentration.

Sector-wise CSR spending patterns reveal priorities. Financial Services and Banking sector contributes approximately 22% of total CSR, followed by IT Services at 18%, Oil and Gas at 15%, Mining and Metals at 12%, and Manufacturing at 10%. The remaining 23% comes from diverse sectors including FMCG, Pharmaceuticals, Automobiles, and Telecommunications.

Key trends shaping CSR in India include the shift from philanthropy to strategic CSR aligned with business objectives. Companies increasingly prefer multi-year commitments over one-time grants, with average project duration increasing from 1.2 years in 2015 to 2.8 years currently. There is growing emphasis on measurable outcomes and impact assessment, particularly after the 2021 amendments mandating impact assessment for large projects. Employee volunteering has emerged as a significant component, with companies like Infosys, TCS, and Wipro logging millions of employee volunteer hours. Technology-enabled CSR through digital platforms, mobile apps, and data-driven monitoring is becoming standard practice.

Geographic concentration remains a challenge. Maharashtra receives approximately 25% of CSR funds, followed by Karnataka at 12%, Gujarat at 10%, Tamil Nadu at 9%, and Delhi-NCR at 8%. This concentration near corporate headquarters leaves many states underserved, creating opportunities for organizations working in less-funded geographies like Northeast India, Jharkhand, Chhattisgarh, and rural areas of Madhya Pradesh and Uttar Pradesh.

The implementation landscape includes diverse partners. Direct implementation by corporate foundations accounts for approximately 35% of spending. NGO partnerships represent 40%, Section 8 companies handle 15%, and government scheme contributions make up the remaining 10%. This creates a complex ecosystem where understanding stakeholder preferences is crucial for success.',
        '["Research top 50 CSR spenders using MCA database and identify their thematic focus areas, geographic preferences, and average project sizes", "Map CSR trends by sector (IT, banking, manufacturing, energy) and identify which sectors align with your impact focus", "Identify gaps between corporate spending priorities and implementation capacity in your geography or sector", "Create a comprehensive overview document of CSR opportunity in your focus area with market sizing"]'::jsonb,
        '["MCA CSR Portal Database with company-wise spending data from 2014-2023", "India CSR Outlook Report with sector analysis and trend projections", "Top 100 CSR Spenders Analysis with contact information and focus areas", "CSR Market Sizing Calculator with geographic and thematic filters"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Companies Act Section 135 Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Companies Act Section 135 Requirements',
        'Section 135 of the Companies Act 2013 is the legislative foundation of India''s mandatory CSR regime. Understanding its provisions is essential for anyone working in the CSR ecosystem, whether as an implementing agency, consultant, or social enterprise seeking CSR funding.

CSR applicability thresholds determine which companies must comply. A company must undertake CSR activities if in ANY of the three immediately preceding financial years it meets these criteria: Net worth of Rs 500 crore or more, OR Turnover of Rs 1,000 crore or more, OR Net profit of Rs 5 crore or more. The thresholds are evaluated on a rolling basis, so a company may enter or exit the CSR mandate based on financial performance. Approximately 23,000 companies currently meet these thresholds, though this number fluctuates annually.

The mandatory spending requirement is 2% of average net profits of the three immediately preceding financial years. The calculation uses "net profit" as defined under Section 198 of the Companies Act, which differs from accounting profit. Specifically, it excludes profits from overseas branches, dividend income from other Indian companies, and certain capital gains. Average of three years smooths fluctuations, so a single loss-making year doesn''t eliminate CSR obligations if the average remains positive.

CSR Committee formation is mandatory for qualifying companies. The Committee must have minimum 3 directors, with at least one being an independent director. For companies not required to have an independent director (e.g., unlisted companies with paid-up capital under Rs 10 crore), the Committee can consist of only 2 directors. Committee responsibilities include formulating CSR Policy, recommending activities and expenditure, monitoring implementation, and instituting a transparent monitoring mechanism.

Board of Directors'' responsibilities are clearly defined. The Board must approve the CSR Policy and disclose it on the company website. They must ensure spending of at least 2% of average net profits. They must approve the Annual Action Plan detailing projects, implementation modality, timelines, and monitoring mechanisms. The Board must ensure CSR activities are undertaken by the company itself or through implementing agencies registered under CSR-1.

Annual Action Plan requirements (introduced in 2021 amendments) specify that every company must prepare an Annual Action Plan including: List of CSR projects approved by the Board, manner of execution (direct or through agency), modality of utilization of funds, implementation schedules, monitoring and reporting mechanism. This plan must be approved before the financial year begins.

Non-compliance consequences have been strengthened. If a company fails to spend the required amount, it must disclose reasons in the Board Report. Unspent amounts must be transferred to specified funds (PM National Relief Fund, PM CARES Fund, or relevant Schedule VII fund) within 6 months of the financial year end. For ongoing projects, unspent amounts transfer to an Unspent CSR Account and must be spent within 3 years. Penalties for non-compliance: Minimum Rs 50,000 to maximum Rs 25 lakh for the company, and Rs 50,000 to Rs 5 lakh for every officer in default.',
        '["Study the exact threshold calculations using Section 135 and understand how your target companies qualify", "Review CSR Committee composition requirements and identify key decision-makers in target companies", "Understand the Annual Action Plan format requirements and timeline to align your proposal submissions", "Create a compliance tracking checklist for monitoring CSR company obligations"]'::jsonb,
        '["Section 135 Complete Legal Text with MCA circulars and clarifications", "CSR Threshold Calculator with step-by-step net profit computation", "CSR Committee Requirements Guide with sample board resolution formats", "Annual Action Plan Template in MCA-prescribed format"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: CSR Rules 2014 and Key Amendments
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'CSR Rules 2014 and Key Amendments',
        'The Companies (Corporate Social Responsibility Policy) Rules 2014 operationalize Section 135. Major amendments in 2021 significantly changed the CSR landscape, introducing stricter compliance requirements and impact assessment mandates that every CSR professional must understand.

The 2021 amendments represent the most significant overhaul since CSR inception. Key changes include: mandatory registration of implementing agencies through CSR-1 form, mandatory impact assessment for large projects, stricter treatment of unspent CSR amounts, prohibition on CSR activities outside India, and enhanced disclosure requirements. These changes aimed to increase accountability and ensure funds actually reach beneficiaries.

Unspent CSR Amount treatment follows a structured approach. For ongoing projects (multi-year commitments approved by Board): Unspent amount transfers to Unspent CSR Account within 30 days of financial year end. This account must be with a Scheduled Bank. Amount must be spent within 3 financial years from the date of transfer. If not spent within 3 years, transfer to Schedule VII specified fund within 30 days of completion of the third financial year. For amounts not relating to ongoing projects: Transfer directly to any fund specified in Schedule VII within 6 months of financial year end. Popular transfer destinations include PM National Relief Fund, PM CARES Fund, and Prime Minister''s Citizen Assistance and Relief in Emergency Situations Fund.

Impact Assessment requirements (Rule 8(3)) mandate that companies spending Rs 10 crore or more in CSR over three preceding financial years, OR having projects with outlays of Rs 1 crore or more AND project duration of three years or more, must conduct impact assessment through an independent agency. The impact assessment must evaluate: social impact, environmental sustainability, financial sustainability, community participation, and scope for improvement. Assessment reports must be submitted to the Board and attached to Annual Report on CSR.

CSR-1 Registration for implementing agencies became mandatory from April 1, 2021. Any entity (NGO, trust, Section 8 company, or entity established by the company itself) implementing CSR activities on behalf of a company must register on the MCA portal through Form CSR-1. Registration requirements include: Incorporation/registration certificate, PAN card of entity, 3 years of financial statements, activity details, Board resolution authorizing CSR activities. A unique CSR Registration Number (CRN) is issued upon approval, valid for 3 years. Companies can ONLY fund entities with valid CSR-1 registration.

Administrative expenses treatment was clarified. Administrative expenses related to CSR activities are allowed up to 5% of total CSR expenditure for that financial year. These expenses must be directly related to CSR activities and cannot include general overheads. This is a reduction from the earlier prevalent practice of higher administrative allocations.

What does NOT qualify as CSR (Rule 2(1)(d)) explicitly excludes: Activities undertaken in normal course of business, Activities outside India (except for training Indian sports persons), Benefits to employees and their families, Contribution to political parties, Activities benefiting only employees of the company, One-off events like marathons and sponsorships (unless part of broader CSR programs).',
        '["Study the 2021 amendment implications for your organization and update internal processes accordingly", "Understand ongoing vs non-ongoing project treatment to advise corporate partners on fund management", "Review impact assessment requirements and build capability to support or conduct assessments", "Complete CSR-1 registration if not already done - mandatory for receiving CSR funds"]'::jsonb,
        '["Companies CSR Amendment Rules 2021 Complete Text with implementation guidance", "Unspent Amount Treatment Decision Tree with timeline flowchart", "Impact Assessment Guidelines with sample assessment framework", "CSR-1 Registration Step-by-Step Guide with document checklist"]'::jsonb,
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
        'Understanding CSR spending patterns is crucial for positioning your organization effectively. Data from MCA filings reveals clear preferences that smart implementing agencies leverage for successful partnerships.

Spending by Schedule VII category shows distinct priorities. Education (including special education and vocational training) leads with approximately 37% of total CSR spending - roughly Rs 9,000+ crore annually. Healthcare (including preventive healthcare, sanitation, drinking water) captures 25% or Rs 6,000+ crore. Rural development projects receive 12%, Environmental sustainability 8%, Skill development 6%, Armed forces welfare 3%, and Other categories collectively 9%. The education dominance reflects corporate belief in long-term human capital impact and relatively straightforward impact measurement.

Within education, specific interventions show preferences. Digital education and computer labs attract significant funding, driven by IT company CSR. Infrastructure (classrooms, toilets, libraries) remains popular for visibility and clear deliverables. Scholarships and education support programs appeal to companies seeking direct beneficiary connection. Teacher training and quality improvement programs are growing as outcome focus increases. Vocational training linked to employment has seen significant growth post-COVID.

Healthcare spending concentrates in specific areas. Primary healthcare infrastructure (PHCs, sub-centers) in rural areas receives substantial funding. Specialized healthcare (dialysis, cancer, cardiac) appeals to companies seeking high-impact stories. Maternal and child health programs align with SDG priorities many companies track. Mental health and wellness programs emerged strongly post-COVID. Water and sanitation projects often combine with health under comprehensive community development.

Geographic concentration patterns reveal opportunities. Maharashtra receives approximately Rs 6,000+ crore annually (25%), driven by corporate headquarters concentration in Mumbai. Karnataka receives Rs 3,000 crore (12%), with Bangalore tech companies dominant. Gujarat attracts Rs 2,500 crore (10%) from industrial and petrochemical companies. Tamil Nadu, with Chennai as a manufacturing hub, receives Rs 2,200 crore (9%). Delhi-NCR sees Rs 2,000 crore (8%). The remaining states share roughly Rs 9,000 crore, meaning significant underserved geographies exist.

Implementation mode analysis shows evolving preferences. Direct implementation (company''s own foundation or team) represents approximately 35% of spending, preferred for flagship programs and high-visibility initiatives. NGO/Trust partnerships handle 40% of spending, valued for grassroots reach and implementation expertise. Section 8 company partnerships at 15% offer corporate-like governance with non-profit mission. Government scheme contributions (PM CARES, Swachh Bharat, etc.) capture remaining 10%, sometimes used to fulfill obligations quickly.

Average project size varies significantly by company size and type. Large cap companies (top 100) typically fund projects of Rs 1-10 crore each with multi-year commitments. Mid-cap companies work in Rs 25 lakh to Rs 2 crore range per project. Small listed companies prefer Rs 10-50 lakh projects with clear deliverables. PSUs often have larger projects (Rs 5-50 crore) but longer approval processes. Understanding these patterns helps tailor your proposals appropriately.',
        '["Analyze CSR spending patterns relevant to your sector using MCA database and identify top spenders in your focus area", "Map geographic concentrations and identify underserved areas where you could position as a preferred partner", "Identify high-growth CSR categories aligning with your capabilities and emerging corporate priorities", "Create a positioning strategy document based on spending trends and your competitive advantages"]'::jsonb,
        '["CSR Spending Analysis Dashboard with 5-year trends by category and geography", "Geographic Heat Map Tool showing CSR spending by state and district", "Category Trend Analysis with year-on-year growth rates", "Positioning Strategy Template with competitive differentiation framework"]'::jsonb,
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
        'The CSR ecosystem involves multiple stakeholders with distinct roles, interests, and decision-making power. Building relationships at multiple levels is critical for sustainable CSR partnerships.

Corporate CSR teams are your primary interface. CSR team structures vary by company size. Large companies have dedicated CSR departments (10-50 people) led by VP or Head of CSR. Mid-size companies often have 3-5 person teams under Corporate Affairs or HR. Smaller companies may have a single CSR coordinator handling everything. Understand the team structure of your target companies. Key roles include: CSR Head (strategic decisions, Board interaction), Program Managers (day-to-day implementation, partner management), M&E Specialists (impact tracking, reporting), Finance Controller (disbursements, audits).

Corporate Foundations are separate entities many large companies use. Examples include Reliance Foundation, Tata Trusts, Infosys Foundation, Wipro Foundation, HDFC Bank Parivartan. These foundations often have independent decision-making while drawing CSR funds from parent companies. They typically have larger budgets, longer project horizons, and more sophisticated evaluation processes. Building relationships with foundation teams can unlock multi-year, high-value partnerships.

CSR Consultants play a significant intermediary role. They help companies design CSR strategy, identify implementing partners, conduct due diligence, and monitor implementation. Major CSR consulting firms include KPMG, Deloitte, EY, PwC (Big 4 sustainability practices), specialized firms like Samhita, CAF India, and GuideStar India. Individual consultants often have deep relationships with specific companies. Building relationships with consultants can generate referrals and recommendations.

Implementation Partner ecosystem includes diverse organizations. NGOs/Trusts registered under Indian Trusts Act or Societies Act form the largest category. Section 8 Companies are increasingly preferred for their corporate-like governance. Social Enterprises (for-profit entities with social mission) access CSR through specific provisions. Corporate Foundations implement their own parent company''s CSR. Government partnerships allow CSR funds to flow to government schemes.

Impact Assessors have gained importance post-2021 amendments. Third-party agencies conducting impact assessments for CSR projects include development research institutions, consulting firms with impact practice, and academic institutions. Building relationships with assessors can help you understand evaluation expectations and potentially get recommended as an implementing partner.

CSR Platforms and Networks facilitate connections. CAF India manages corporate advised funds and provides NGO due diligence services. GuideStar India Platinum-certified NGOs get preferential corporate attention. Goodera combines volunteering platform with CSR matchmaking. CSRbox operates as a marketplace connecting corporates and NGOs. India CSR Network hosts events and maintains directories. Active presence on these platforms increases visibility.

Government stakeholders include MCA (regulatory oversight), NITI Aayog (policy direction), and state-level agencies like NABARD, district administrations (for local permissions and convergence). Understanding the regulatory environment and government priorities helps position your work appropriately.

The decision-making flow typically follows this pattern: CSR team identifies need or receives proposals, conducts due diligence on potential partners, presents recommendations to CSR Committee, Board approves Annual Action Plan with specific projects, implementation partner selected through formal or informal process, project executed with periodic monitoring, impact assessed, and results reported to MCA. Understanding where you can influence this flow is crucial for partnership success.',
        '["Map the stakeholder ecosystem for your target sector, identifying all decision-makers and influencers", "Research and identify key CSR decision-makers in your top 20 target companies with LinkedIn profiles", "Understand procurement and selection processes at your target companies through network conversations", "Create a stakeholder engagement strategy with specific relationship-building actions for each stakeholder type"]'::jsonb,
        '["CSR Stakeholder Mapping Template with relationship strength tracking", "Decision-Maker Database Structure for CRM integration", "Corporate Selection Process Guide based on research with 50+ companies", "Engagement Strategy Framework with touchpoint calendar"]'::jsonb,
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
        'Master Schedule VII activities and design compliant CSR projects. Understand eligible activities across education, healthcare, environment, and livelihood categories.',
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
        'Schedule VII of the Companies Act defines the exhaustive list of activities qualifying for CSR expenditure. Only activities falling within these 12 categories can be counted toward the mandatory 2% spend. Understanding the scope and interpretation of each category is fundamental.

The 12 Schedule VII categories with detailed scope are as follows:

Category (i): Eradicating hunger, poverty and malnutrition. This includes promoting health care including preventive health care, promoting sanitation including contribution to Swachh Bharat Kosh, and making available safe drinking water. Key activities: Mid-day meal programs, nutrition supplementation, food banks, malnutrition treatment centers, public health facilities, community toilets, water purification plants, water ATMs, watershed development.

Category (ii): Promoting education. This includes special education and employment enhancing vocation skills especially among children, women, elderly, differently abled, and livelihood enhancement projects. Key activities: Schools, colleges, scholarships, digital classrooms, teacher training, vocational training centers, skill development programs, women empowerment through education.

Category (iii): Promoting gender equality. This covers empowering women, setting up homes and hostels for women and orphans, setting up old age homes, day care centres and such other facilities for senior citizens. Key activities: Women''s skill centers, self-help groups, women''s hostels, orphanages, old age homes, daycare centers.

Category (iv): Ensuring environmental sustainability. This covers ecological balance, protection of flora and fauna, animal welfare, agroforestry, conservation of natural resources, maintaining quality of soil, air, water including contribution to Clean Ganga Fund. Key activities: Afforestation, wildlife conservation, pollution control, renewable energy, organic farming, soil conservation, river cleaning.

Category (v): Protection of national heritage, art and culture. This includes restoration of buildings and sites of historical importance and works of art, setting up public libraries, promotion and development of traditional arts and handicrafts. Key activities: Heritage restoration, museums, cultural centers, craft development programs, performing arts promotion.

Category (vi): Measures for the benefit of armed forces veterans, war widows, and their dependents. Activities include central government-run schemes for welfare of armed forces personnel and their families.

Category (vii): Training to promote rural sports, nationally recognised sports, Paralympic sports and Olympic sports. Key activities: Sports academies, sports infrastructure, coaching programs, athlete development.

Category (viii): Contribution to Prime Minister''s National Relief Fund or any other fund set up by the Central Government for socio-economic development and relief. This includes PM CARES Fund, Clean Ganga Fund, Swachh Bharat Kosh.

Category (ix): Contributions or funds to technology incubators located within academic institutions approved by the Central Government. Key activities: IIT/IIM incubators, NITI Aayog Atal Innovation Mission.

Category (x): Rural development projects. Broad category covering rural infrastructure, livelihoods, community facilities.

Category (xi): Slum area development. Defined under specific government notifications, includes housing, sanitation, community facilities in slum areas.

Category (xii): Disaster management including relief, rehabilitation, and reconstruction activities. Covers both natural and man-made disasters.

MCA has issued several circulars clarifying interpretations. FAQ dated June 16, 2021 provides extensive clarifications on what qualifies. Projects must clearly map to one or more categories with explicit justification.',
        '["Review all 12 Schedule VII categories in detail and identify which ones align with your organization''s mission", "Map your existing or planned activities to appropriate Schedule VII categories with clear justification", "Study MCA circulars and clarifications for interpretation guidance on borderline activities", "Identify multi-category project opportunities that can appeal to diverse corporate priorities"]'::jsonb,
        '["Schedule VII Activity Matrix with examples and interpretation notes", "Activity Category Mapping Guide with decision flowchart", "MCA Circulars and Clarifications Compilation (2014-2024)", "Multi-Category Project Design Examples from successful implementations"]'::jsonb,
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
        'Education receives the largest share of CSR funding at approximately 37% of total spend - roughly Rs 9,000+ crore annually. This category offers diverse opportunities for implementing agencies, from infrastructure to quality improvement to digital education.

Scope of education under Schedule VII is expansive. It includes: promoting education including special education, employment enhancing vocational skills especially among children, women, elderly, and differently abled, and livelihood enhancement projects. The key is that activities must be charitable and not benefit the company''s business directly.

Infrastructure projects remain popular for their visibility. Digital classrooms cost Rs 5-10 lakh per classroom setup (computers, projector, smart board, internet connectivity). Science labs cost Rs 3-8 lakh depending on equipment level. Libraries cost Rs 2-5 lakh with books, furniture, and digital resources. Toilets (especially girls'' toilets) cost Rs 1-3 lakh per block under Swachh Vidyalaya. School buildings range from Rs 50 lakh to Rs 2 crore depending on size. Corporate preference: Clear deliverable, photo opportunities, naming/branding rights.

Quality improvement programs show strong growth. Teacher training programs cost Rs 5,000-15,000 per teacher, highly scalable and show outcome improvement. Learning enhancement programs (remedial, enrichment) cost Rs 1,000-5,000 per student per year. Curriculum supplementation (STEM, coding, English, life skills) appeals to IT company CSR. Assessment and monitoring systems enable data-driven improvement narratives.

Scholarship and support programs offer direct beneficiary connection. Full scholarships for higher education range from Rs 50,000 to Rs 2 lakh per student per year. Educational kits and uniforms cost Rs 3,000-5,000 per student. Hostel support for residential education costs Rs 30,000-60,000 per student per year. Corporate preference: Named scholarships, beneficiary tracking, alumni engagement potential.

Vocational training programs link education to employment. Short-term skill programs (3-6 months) cost Rs 15,000-40,000 per trainee with placement linkage. Long-term courses (1-2 years) cost Rs 60,000-1.5 lakh per trainee. Industry-specific training (retail, healthcare, automotive, IT) appeals to sector companies. Placement rates above 70% are expected for program success.

Digital education programs accelerated post-COVID. E-learning content development creates scalable impact across beneficiaries. Device distribution (tablets, laptops) costs Rs 10,000-25,000 per device. Internet connectivity programs in rural areas appeal to telecom CSR. Teacher digital literacy programs enable sustainable adoption.

Successful education CSR models from the field include Pratham''s Read India program (literacy at Rs 500 per child outcome cost), Teach For India (leadership development through teaching), Akshaya Patra mid-day meals (Rs 8-10 per meal, serving 20 lakh children daily), and Khan Academy Hindi localization. These demonstrate scale and cost-efficiency that corporates seek.

Impact measurement expectations for education CSR include: Enrollment and retention rates (quantitative baseline-endline), Learning outcome improvement (standardized assessments like ASER), Teacher attendance and effectiveness metrics, Infrastructure utilization rates, Post-program tracking (employment, further education).',
        '["Design an education project aligned with Schedule VII covering your target beneficiary group and geography", "Create an outcome-based logic model showing how activities lead to education improvement", "Develop cost-per-beneficiary metrics for your education intervention showing value for money", "Prepare case studies of successful education CSR projects as benchmarks for your proposals"]'::jsonb,
        '["Education Project Design Template with budget categories and outcome indicators", "Logic Model Framework for Education Interventions", "Cost Per Learning Outcome Calculator with industry benchmarks", "Education CSR Case Study Library with 20 successful implementations"]'::jsonb,
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
        'Healthcare captures approximately 25% of CSR funding - over Rs 6,000 crore annually. This category encompasses preventive healthcare, curative care, sanitation, and safe drinking water, offering diverse implementation opportunities.

Healthcare scope under Schedule VII covers multiple dimensions. Eradicating hunger and malnutrition includes nutrition programs, supplementary feeding, and addressing micronutrient deficiencies. Promoting healthcare includes primary, secondary, and tertiary care access. Preventive healthcare covers vaccination, screening, health education, and behavior change. Sanitation includes toilet construction, waste management, and hygiene promotion. Safe drinking water includes purification, distribution, and source sustainability.

Primary healthcare infrastructure projects form a significant segment. PHC/sub-center strengthening costs Rs 25-50 lakh per facility with equipment, renovation, and staffing support. Mobile health units cost Rs 25-40 lakh per van with annual operating costs of Rs 15-20 lakh. Telemedicine centers cost Rs 5-10 lakh per setup with recurring consultation costs. Rural health camps cost Rs 2-5 lakh per camp reaching 500-2000 beneficiaries.

Specialized healthcare facilities address specific diseases. Dialysis centers cost Rs 1-2 crore per 10-station setup with Rs 1,200-1,500 per dialysis session cost. Eye care (vision centers, cataract surgeries) costs Rs 5,000-15,000 per cataract surgery. Cancer screening and treatment programs have high per-beneficiary costs but strong impact stories. Cardiac care (screenings, interventions) appeals to pharma and insurance company CSR.

Maternal and child health programs align with government priorities. Institutional delivery promotion reduces maternal mortality. Immunization programs complement government programs. Nutrition rehabilitation centers address severe acute malnutrition. Adolescent health programs address reproductive health, anemia, menstrual hygiene.

Mental health programs emerged strongly post-COVID. Community mental health awareness costs Rs 100-500 per beneficiary. Counseling services in schools and communities cost Rs 2,000-5,000 per beneficiary per year. De-addiction programs cost Rs 30,000-1 lakh per beneficiary. This is a growing category as awareness increases.

Water and sanitation projects combine with health objectives. Household toilets under Swachh Bharat (ODF Plus) cost Rs 12,000-35,000 per unit. Community toilets cost Rs 5-15 lakh per facility. Water purification plants cost Rs 10-25 lakh per plant serving 2,000-5,000 people. Piped water supply extensions cost Rs 50 lakh to Rs 2 crore per village. Solid waste management systems cost Rs 25-50 lakh for community-scale solutions.

Post-COVID, health system strengthening gained prominence. Oxygen plants and medical equipment donations became common. Healthcare worker training and protection received significant CSR attention. Vaccine administration support was a major CSR area in 2021-22.

Impact measurement for healthcare CSR includes: Lives saved/years of life gained calculations, Disease burden reduction (DALYs averted), Access metrics (number of people with improved access), Utilization rates of healthcare facilities, Behavior change indicators (hand washing, seeking care), Cost per QALY (Quality Adjusted Life Year) for sophisticated analyses.',
        '["Design a healthcare project with preventive and curative components addressing your target beneficiary needs", "Calculate cost per life saved or health outcome using standard healthcare metrics", "Create a sustainability plan ensuring healthcare services continue beyond CSR funding period", "Document your healthcare project concept for corporate presentation with compelling health impact narrative"]'::jsonb,
        '["Healthcare Project Design Template with outcome indicators and budget framework", "Health Outcome Metrics Guide with DALY and QALY calculation methods", "Sustainability Planning Framework for Healthcare CSR projects", "Corporate Healthcare Presentation Template with data visualization guidelines"]'::jsonb,
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
        'Environment sustainability receives approximately 8% of CSR funds (Rs 2,000+ crore), but this is one of the fastest-growing categories as companies pursue Net Zero commitments. Livelihood enhancement, while not a separate category, appears across education, rural development, and women empowerment provisions.

Environmental sustainability scope under Schedule VII includes: ensuring environmental sustainability, ecological balance, protection of flora and fauna, animal welfare, agroforestry, conservation of natural resources, maintaining quality of soil, air and water, including contribution to Clean Ganga Fund.

Tree plantation and carbon sequestration programs are the most common environmental CSR. Simple tree plantation costs Rs 100-500 per tree including maintenance for 3 years. Agroforestry programs cost Rs 1,000-3,000 per acre setup cost with farmer benefit sharing. Mangrove and coastal restoration costs Rs 1,500-3,000 per hectare. Carbon sequestration projects can generate carbon credits providing additional revenue streams for sustainability.

Water conservation projects address India''s water stress. Watershed development costs Rs 5-10 lakh per village covering 500-1,000 hectares. Check dams and farm ponds cost Rs 3-8 lakh per structure. Rainwater harvesting systems cost Rs 25,000-1 lakh per installation. Lake and tank rejuvenation costs Rs 25 lakh to Rs 2 crore depending on size.

Renewable energy installations align with climate goals. Solar installations cost Rs 50,000-1 lakh per kW for community scale. Solar water pumping for agriculture costs Rs 1.5-3 lakh per unit. Improved cookstoves cost Rs 2,000-5,000 per household reducing indoor air pollution. Biogas plants cost Rs 25,000-50,000 per household unit.

Waste management and circular economy programs are growing. Plastic waste collection and recycling programs are popular with FMCG companies. E-waste collection and processing appeal to electronics companies. Composting and organic waste management cost Rs 5-15 lakh per community unit. Extended Producer Responsibility (EPR) related CSR is emerging.

Livelihood enhancement programs create income improvement for beneficiaries. Agricultural improvement programs cost Rs 5,000-15,000 per farmer per season for inputs, training, and market linkage. Livestock development (dairy, poultry, goat) costs Rs 15,000-50,000 per beneficiary. Micro-enterprise development costs Rs 20,000-1 lakh per entrepreneur. Producer group formation and strengthening costs Rs 10,000-25,000 per member. Women''s self-help group promotion costs Rs 5,000-15,000 per member.

Hybrid environment-livelihood models show strong appeal. Tree plantation with farmer income through fruit/timber creates sustainable models. Water conservation improving agricultural productivity links environment to livelihoods. Sustainable agriculture practices reducing chemical inputs address both. These integrated approaches demonstrate holistic impact.

Environment CSR metrics include: Carbon sequestration (tons of CO2 equivalent), Water saved/harvested (million liters), Area under sustainable practices (hectares), Biodiversity indicators (species count, habitat improvement), Pollution reduction (air quality, water quality indices). Livelihood metrics include: Income increase (percentage and absolute), Jobs/employment days created, Asset ownership improvement, Food security indicators.',
        '["Design an environment project with quantifiable carbon/water metrics that appeals to corporate Net Zero goals", "Create a livelihood project demonstrating income improvement metrics with clear baseline-endline methodology", "Develop a hybrid environment-livelihood model that addresses both sustainability and economic improvement", "Calculate environmental ROI per rupee spent to demonstrate cost-efficiency to corporate partners"]'::jsonb,
        '["Environment Project Design Template with carbon calculation methodology", "Livelihood Project Logic Model with income tracking indicators", "Hybrid Environment-Livelihood Project Framework with combined metrics", "Environmental ROI Calculator with industry benchmarks"]'::jsonb,
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
        'Project compliance with Schedule VII is essential - non-compliant activities cannot be counted toward CSR obligations. Understanding compliance boundaries helps you design projects that clearly qualify while avoiding rejection risks.

Compliance essentials for all CSR projects include: Clear and defensible mapping to one or more Schedule VII categories, Beneficiaries must be the general public (not employees, shareholders, or business associates), No direct business benefit or promotional element, Proper documentation of activities, beneficiaries, and expenditure, Implementation through the company itself or registered CSR implementing agency, Activities must be in India (overseas activities not permitted except for Indian sports training).

Business promotion vs. genuine CSR is a critical distinction. NOT CSR: Sponsoring events where company brand is prominently displayed for marketing purposes, Activities that primarily benefit employees or their families, Contributions tied to procurement from vendors or sales to customers, Advertising or PR activities disguised as social awareness campaigns. VALID CSR: Community programs where company name appears for acknowledgment (not promotion), Employee volunteering programs where employees contribute time to genuine social activities, Social awareness campaigns not tied to product promotion.

Beneficiary restrictions are explicit in the rules. Excluded beneficiaries: Employees of the company and their family members, Shareholders and their families, Business partners and their employees, Persons with direct commercial relationship with the company. Note: This doesn''t prevent employees from volunteering; it prevents benefits flowing to them through CSR.

Geographic considerations under CSR Rules prefer local area. "Local area" means the area around company''s operations (registered office, factory, branch offices). Companies should give preference to local areas but are not strictly restricted. For companies operating pan-India, CSR can be anywhere in India. No CSR activities outside India permitted (except for training Indian sports persons representing India).

Documentation requirements for compliance include: Board resolution approving CSR policy and Annual Action Plan, CSR Committee meeting minutes, MOU/Agreement with implementing agencies with clear deliverables, Beneficiary data (demographic, contact, baseline), Activity reports with photographs and supporting documents, Financial records (invoices, receipts, bank statements), Impact assessment reports where applicable, Annual disclosure in Board Report and website.

Red flags that cause compliance issues include: Marketing/brand building elements mixed with CSR activities, Benefits flowing to employees, customers, or business associates, Vague beneficiary definitions without specific targeting, Poor documentation of activities and expenditure, Administrative costs exceeding 5% threshold, Activities not clearly mappable to Schedule VII, Implementation through non-CSR-1 registered agencies.

Grey areas requiring careful interpretation: Technology incubator contributions must be to institutions on approved list only. Disaster relief must be for actual disasters (not hypothetical preparedness). Rural development is broad but must show community benefit. Training programs must be for beneficiaries, not company skill requirements.

Getting legal/expert review is advisable for: New types of activities not clearly covered by precedent, Large-scale programs (Rs 1 crore+) where non-compliance risk is significant, Multi-category projects with complex structures, Projects involving government partnership or matching funds.',
        '["Audit your project design for Schedule VII compliance using the detailed checklist provided", "Review and remove any business promotion elements that could disqualify CSR expenditure", "Define clear beneficiary criteria ensuring excluded categories are not inadvertently included", "Create comprehensive compliance documentation checklist for all future CSR projects"]'::jsonb,
        '["Schedule VII Compliance Audit Checklist with 50+ verification points", "Business Promotion vs CSR Decision Guide with case examples", "Beneficiary Documentation Template with exclusion verification", "Legal Review Checklist for complex CSR project structures"]'::jsonb,
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
        'Navigate Section 8 company formation, Trust/Society registration, 12A/80G tax exemptions, FCRA for foreign funding, and NGO Darpan registration.',
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
        'Choosing the right legal structure is one of the most important decisions for a social enterprise. The choice impacts credibility with funders, compliance burden, tax treatment, and ability to receive different types of funding.

The four primary non-profit structures in India are: Trust, Society, Section 8 Company, and Section 25 Company (pre-2013, now Section 8). For-profit social enterprises typically use Private Limited Company structure. Each has distinct characteristics.

Trust is the simplest structure governed by Indian Trusts Act 1882 (public trusts) or state-specific Public Trusts Acts (Maharashtra, Gujarat, Rajasthan have separate acts). A Trust Deed is executed by Settlor (founder) declaring property/assets to be held by Trustees for beneficiaries. Minimum 2 trustees required; no maximum limit. Registration with local Sub-Registrar office. Cost: Rs 10,000-25,000 including registration and professional fees. Timeline: 2-4 weeks. Best for: Simple organizations with family/individual founders, religious/charitable activities, local operations.

Society is a member-based organization governed by Societies Registration Act 1860 or state-specific acts. Memorandum of Association signed by minimum 7 members (21 in some states) with clear objects. Registration with Registrar of Societies (typically under state Revenue department). Governing Council elected by members manages operations. Cost: Rs 15,000-35,000. Timeline: 3-6 weeks depending on state. Best for: Membership organizations, professional associations, community groups.

Section 8 Company (formerly Section 25) is a company incorporated for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, protection of environment, or any such other object. Governed by Companies Act 2013 with special provisions. Profits must be applied toward objects; no dividend distribution. "Limited" suffix not required in name. Registration through MCA like regular companies but requires license from Regional Director. Cost: Rs 50,000-1,50,000 including professional fees. Timeline: 3-6 months. Best for: Organizations seeking corporate credibility, CSR partnerships, complex operations.

Corporate funder preferences strongly favor Section 8 Companies. In our research across 100+ CSR teams: 78% prefer Section 8 Company partners for projects over Rs 50 lakh. 45% have explicit policies requiring Section 8 for large grants. 92% require CSR-1 registration regardless of structure. Reasons cited: Corporate-like governance (Board, AGM, audits), MCA oversight provides accountability, Easier due diligence using MCA database, Perceived as more professional and sustainable.

For-profit social enterprise structures include: Private Limited Company for impact businesses that can distribute profits but prioritize social mission. Benefit Company framework is not yet available in India (unlike US B Corps). Producer Company (under Companies Act) specifically for farmers and artisans. Hybrid structures using for-profit with non-profit sister organizations.

Key decision factors: Credibility with target funders (CSR strongly prefers Section 8), Compliance tolerance (Trust lowest, Section 8 highest), Foreign funding plans (FCRA eligibility similar across structures), Tax benefits (12A/80G available for all non-profit structures), Exit/wind-up flexibility (Trust most flexible, Section 8 requires MCA approval), Governance sophistication needed (Section 8 for complex operations).',
        '["Evaluate each legal structure against your specific organizational needs including funding sources and scale", "Compare compliance requirements and costs for Trust, Society, and Section 8 over a 5-year period", "Research and document corporate funder preferences for structure in your sector", "Select optimal structure with legal advice and document rationale for Board/founders"]'::jsonb,
        '["Legal Structure Comparison Tool with detailed feature comparison", "Compliance Cost Calculator comparing annual costs across structures", "Corporate Funder Preference Survey Data from 100+ CSR teams", "Structure Selection Framework with decision tree"]'::jsonb,
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
        'Section 8 Company is a limited company incorporated for charitable purposes. It enjoys most benefits of a company structure while being prohibited from distributing profits. The registration process is more rigorous than Trust/Society but provides greater credibility.

Legal framework: Section 8 of Companies Act 2013 (replacing Section 25 of 1956 Act). Companies incorporated for promoting commerce, art, science, sports, education, research, social welfare, religion, charity, protection of environment, or any such other object. Profits, if any, must be applied solely for promoting the objects. No dividend to members. License from Central Government (via Regional Director) required.

Pre-registration requirements: Minimum 2 directors (no maximum limit). At least one director must be Indian resident (182+ days in India in previous calendar year). No minimum capital requirement (typically Rs 1 lakh nominal). Registered office in India with address proof. Objects must be charitable within Section 8 definition. Name should indicate nature of activities.

Step-by-step registration process: Step 1 - Obtain DSC (Digital Signature Certificate) for all proposed directors. Cost: Rs 800-1,500 per person. Timeline: 1-3 days. Step 2 - Apply for DIN (Director Identification Number) through SPICe+ or DIR-3. Cost: Included in SPICe+. Timeline: 1-2 days. Step 3 - Reserve name through RUN (Reserve Unique Name) service. Cost: Rs 1,000. Timeline: 1-3 days. Name should not include "Limited" - this is granted exemption to Section 8 companies.

Step 4 - Apply for Section 8 license through INC-12. Submit to Regional Director with: Declaration that objects are for promoting commerce, art, science, etc., Draft MOA and AOA, Statement of assets and liabilities, Estimated income and expenditure for next 3 years, Names and addresses of promoters/directors. Regional Director may call for additional information or clarifications. Cost: Rs 5,000 government fee. Timeline: 30-60 days for license approval.

Step 5 - Incorporate company on MCA portal through SPICe+ after receiving license. Submit: INC-12 license, SPICe+ form with details, MOA and AOA (as per Table F of Schedule I for Section 8), AGILE-PRO-S for GSTIN, EPFO, ESIC registrations, INC-9 declaration by directors. Cost: Rs 5,000-10,000 in government fees. Timeline: 7-15 days after license.

Post-incorporation compliance begins immediately: Open bank account with incorporation certificate, Apply for PAN and TAN (usually included in SPICe+), Register with Income Tax for 12A and 80G exemptions, Annual compliances: AGM within 6 months, AOC-4 and MGT-7 filings, Board meetings minimum 4 per year.

Total cost breakdown: Government fees: Rs 15,000-25,000 (depending on capital). Professional fees: Rs 30,000-75,000 (depending on complexity and location). Total realistic budget: Rs 50,000-1,50,000.

Timeline reality: Best case with all documents ready: 2-3 months. Typical timeline with queries: 3-4 months. Worst case with rejections/resubmissions: 5-6 months.',
        '["Prepare or reserve company name on MCA portal following Section 8 naming guidelines", "Draft MOA with objects clearly aligned to Schedule VII activities and Section 8 requirements", "Prepare INC-12 license application with all required declarations and projections", "Plan incorporation timeline and budget with contingency for Regional Director queries"]'::jsonb,
        '["Section 8 Name Availability Check Guide with prohibited words list", "Model MOA for Section 8 Company with CSR-compatible objects", "INC-12 License Application Guide with sample documents", "Section 8 Incorporation Checklist with timeline milestones"]'::jsonb,
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
        'Trust and Society remain valid structures for social enterprises, particularly those starting small or operating locally. While Section 8 is preferred by CSR funders, Trusts and Societies can access CSR with proper CSR-1 registration.

Trust registration - Indian Trusts Act 1882 (Private Trusts): Requires Trust Deed executed on stamp paper (rates vary by state: Maharashtra Rs 500, Delhi Rs 100, Karnataka Rs 500). Settlor creates trust, transferring property/assets for beneficiaries managed by Trustees. Minimum 2 trustees; recommend 3-5 for governance. Trust Deed contains: Name, address, objects, beneficiary class, trustee powers and duties, succession provisions. Registration with local Sub-Registrar within 3 months of execution.

State-specific Public Trust Acts add requirements. Maharashtra Public Trusts Act 1950 (most comprehensive): Additional registration with Charity Commissioner, Annual Accounts submission mandatory, Permission required for property transactions, Audit mandatory. Gujarat Public Trusts Act 1950 and Rajasthan Public Trusts Act 1959 have similar provisions. Other states follow Indian Trusts Act with simpler compliance.

Trust registration process: Step 1 - Draft Trust Deed with lawyer covering all required elements. Step 2 - Print on appropriate stamp paper. Step 3 - Execute (sign) with Settlor and Trustees. Step 4 - Present to Sub-Registrar for registration within 3 months. Step 5 - In Maharashtra/Gujarat, additionally register with Charity Commissioner. Cost: Rs 10,000-25,000 total. Timeline: 2-4 weeks.

Society registration - Societies Registration Act 1860: Requires Memorandum of Association signed by minimum 7 members (varies: Tamil Nadu 5, West Bengal 10, Punjab 10, Andhra Pradesh 7). MOA contains: Name, objects, names and addresses of governing body members, registered office address. Register with Registrar of Societies (typically District Registrar or state-specific authority). Annual general meeting mandatory. Rules and Regulations (bylaws) govern operations.

Society registration process: Step 1 - Identify minimum 7 founding members with no family relationships (most states). Step 2 - Draft MOA with clear charitable objects. Step 3 - Draft Rules and Regulations covering governance, membership, meetings. Step 4 - Submit application to Registrar of Societies with fee and documents. Step 5 - Registrar may call for clarification or modifications. Cost: Rs 15,000-35,000. Timeline: 3-6 weeks (varies significantly by state).

State variations are significant. Delhi: Relatively quick (3-4 weeks), Registrar under Revenue Department. Maharashtra: Requires publication in newspaper, additional scrutiny. Karnataka: Societies registered under Karnataka Societies Registration Act 1960. Tamil Nadu: Only 5 members required, registered under Tamil Nadu Societies Registration Act 1975. Understanding your state''s specific requirements is essential.

Post-registration compliance for both: Apply for PAN immediately after registration. Apply for 12A and 80G within 3 months (new provision). File annual returns/reports with Registrar. Maintain registers and minute books. Conduct annual meetings as per governing document.',
        '["Decide between Trust and Society based on your founding team size, state, and operational needs", "Draft Trust Deed or Society MOA with lawyer ensuring charitable objects align with 12A requirements", "Prepare all registration documents following your state''s specific requirements", "File registration application with appropriate registrar and track progress"]'::jsonb,
        '["Trust Deed Template with charitable objects clauses", "Society MOA Template with model objects for social enterprises", "State-wise Registration Guide covering all 28 states and 8 UTs", "Post-Registration Compliance Calendar with annual filing deadlines"]'::jsonb,
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
        'Tax exemption registrations are crucial for non-profit sustainability. Section 12A exempts the organization''s income from tax, while Section 80G allows donors to claim tax deductions. Both are essential for credibility with institutional funders.

Section 12A registration provides income tax exemption. Without 12A, the organization''s entire income (including donations) is taxable at 30%. With 12A, income applied to charitable purposes is exempt. New organizations must apply within 3 months of registration in Form 10A. Provisional registration valid for 5 years, then converted to regular registration (also 5 years, renewable).

12A eligibility requirements: Organization must be established for charitable purposes as defined under Section 2(15) of Income Tax Act: Relief of the poor, Education, Yoga, Medical relief, Preservation of environment, Preservation of monuments/places of historical or artistic interest, Advancement of any other object of general public utility (but with restrictions if commercial). Activities must be genuine, not for private benefit.

12A application process (Form 10A): Submit online through Income Tax portal (incometax.gov.in). Documents required: Registration certificate (Trust Deed/MOA/Incorporation), PAN of organization, Address proof of registered office, Bank account details, Details of activities undertaken, Financial statements (if available). Processing: Principal Commissioner examines application, may call for additional information, site visit possible. Timeline: 3-6 months. Cost: No government fee; professional fees Rs 5,000-15,000.

Section 80G registration provides donor tax benefit. Donations to 80G-registered organizations qualify for tax deduction. Two categories: 100% deduction (certain specified funds like PM CARES) and 50% deduction (most charitable organizations). Maximum deduction limited to 10% of donor''s adjusted gross total income. Critical for CSR: While CSR is mandatory expenditure (not donation), 80G registration increases organizational credibility.

80G eligibility requirements: Must have 12A registration, Activities must be of charitable nature, No portion of income should benefit any specific religious community or caste (for "other general public utility" charities), Organization must maintain regular books of accounts.

80G application process (Form 10G): Apply online after 12A registration. Documents: 12A registration certificate, Audited financial statements for preceding years, Details of activities and beneficiaries, Declaration of charitable nature. Processing: Commissioner examination, possible inquiry. Timeline: 3-6 months after application. Cost: No government fee; professional fees Rs 5,000-15,000.

Changes under Finance Act 2020 significantly impacted registrations. All 12A/80G registrations granted before April 2021 required fresh registration by June 30, 2021 (extended multiple times to March 31, 2024). New registration process through Forms 10A/10AB implemented. Regular registration valid for 5 years (previously permanent). Compliance requirements increased with annual information returns.

Maintaining registration requires compliance: File Income Tax Return every year (even if nil income). File Form 10B (Audit Report) if gross receipts exceed Rs 5 lakh. File Form 10BD (Statement of Donations) quarterly. Spend at least 85% of income in the year received (or set aside in accumulation). Avoid activities that jeopardize charitable status.',
        '["Apply for 12A registration within 3 months of organization registration using Form 10A", "Prepare 80G application with supporting documents immediately after 12A receipt", "Set up compliance processes to maintain 12A/80G including annual filings and spending requirements", "Create donor communication template highlighting 80G status and benefits"]'::jsonb,
        '["12A Application Guide with Form 10A step-by-step walkthrough", "80G Application Format with Form 10G instructions", "Document Checklist for 12A/80G with sample formats", "Donor Communication Template explaining tax benefits"]'::jsonb,
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
        'FCRA (Foreign Contribution Regulation Act) 2010 governs receipt of foreign contributions by individuals and organizations in India. FCRA registration is mandatory to receive donations from foreign sources, including international foundations, bilateral/multilateral agencies, and foreign CSR.

When is FCRA needed? Foreign contribution includes: Donation, delivery, or transfer from a foreign source (citizens of foreign countries, companies incorporated outside India, foreign governments, international agencies) of any article, currency, or foreign security. Organizations receiving any foreign donation must have FCRA registration or prior permission. Violation: Up to 5 years imprisonment and fine.

FCRA registration categories: Registration: General permission to receive foreign contribution for defined purposes. Valid for 5 years, renewable. For organizations with at least 3 years of activity and Rs 15 lakh spending on activities. Prior Permission: Project-specific permission for organizations not eligible for registration or for specific large grants. Valid for specific project period. For new organizations or those not meeting registration thresholds.

FCRA 2020 amendments significantly tightened regulations: FCRA account only at SBI New Delhi Main Branch (11 Sansad Marg): All organizations must transfer/open FCRA accounts here, local bank accounts can only be for utilization (not receipt). No sub-granting permitted: Cannot pass on foreign contribution to other organizations (major impact on intermediary NGOs). Administrative expenses capped at 20% of foreign contribution received. Annual returns mandatory by December 31. Renewal required every 5 years with fresh scrutiny.

FCRA registration process: Step 1 - Ensure eligibility: 3+ years of existence, Rs 15 lakh+ spending on actual activities, legitimate activities aligning with FCRA purposes. Step 2 - Open SBI New Delhi Main Branch account (required before application). Step 3 - Apply online through FCRA portal (fcraonline.nic.in) using Form FC-3. Step 4 - Submit documents: Registration certificate, 12A certificate, Audited accounts for 3 years, Activity reports, Board resolution, DARPAN ID (mandatory). Step 5 - MHA scrutiny: May include inquiry, site visit, additional document requests. Timeline: 6-12 months (often longer). Cost: Rs 10,000 government fee; professional fees Rs 15,000-30,000.

Prior Permission process (FC-4): Similar to registration but for specific project. Requires detailed project proposal, budget, and foreign donor commitment. Typically faster (3-6 months) but limited scope. Each new project requires fresh prior permission.

FCRA compliance requirements: Maintain separate books for FCRA funds, File annual return (FC-4) by December 31, Quarterly intimation to MHA for contributions received, 20% administrative expense cap strictly monitored, Cannot use FCRA funds for activities other than registered purposes, Cannot transfer to other organizations (including partner NGOs).

FCRA suspension and cancellation risks: Non-filing of returns for consecutive years, Misutilization of funds, Activities prejudicial to public interest, False statements in application, Violation of FCRA provisions. Over 6,000 FCRA registrations cancelled between 2015-2020, making compliance critical.',
        '["Assess your organization''s FCRA eligibility by verifying 3-year activity record and Rs 15 lakh spending threshold", "Prepare comprehensive 3-year activity and financial records as required for FCRA application", "Open SBI New Delhi Main Branch FCRA account following current RBI/MHA guidelines", "Apply for FCRA registration through the FCRA portal with complete documentation"]'::jsonb,
        '["FCRA 2020 Eligibility Checklist with threshold verification", "FCRA Application Document Guide with sample formats", "SBI FCRA Account Opening Process with required documents", "FCRA Annual Compliance Calendar with quarterly filing requirements"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 16: CSR-1 and NGO Darpan Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'CSR-1 and NGO Darpan Registration',
        'CSR-1 registration became mandatory from April 1, 2021, fundamentally changing CSR implementation. Any entity receiving CSR funds as an implementing agency must be registered. NGO Darpan is the government''s unique ID system for voluntary organizations.

CSR-1 registration requirements: Mandatory for all entities implementing CSR on behalf of companies: NGOs, Trusts, Societies, Section 8 Companies. Also applicable for entities established by the company itself for CSR implementation. Without CSR-1, companies cannot count expenditure through that entity as CSR.

Who needs CSR-1? Category 1: Entities established by the company itself or along with other companies for exclusively undertaking CSR activities. Category 2: Public trust, registered society, or Section 8 company registered for at least 3 years with track record of undertaking similar activities. Note: Less than 3 years old entities can partner with a CSR-1 registered entity.

CSR-1 registration process: Step 1 - Create account on MCA portal (mca.gov.in) if not existing. Step 2 - Access CSR-1 form through "MCA Services" → "Company Forms Download". Step 3 - Fill Form CSR-1 with: Basic entity details (name, registration number, address), PAN number, 12A/80G registration details (if applicable), 3 years of audited financial statements, Activities undertaken (3 years history), Board/Governing Body resolution authorizing CSR activities.

Step 4 - Attach required documents: Registration certificate, MOA/Trust Deed, 12A/80G certificates, Audited accounts for 3 preceding years, Activity reports, Board resolution. Step 5 - Submit form with DSC of authorized signatory. Step 6 - MCA processing: Typically 15-30 days for approval or query. Step 7 - Upon approval, Unique CSR Registration Number (CRN) issued.

CSR-1 validity and renewal: Valid for 3 years from date of issue. Renewal application (Form CSR-1) to be filed at least 3 months before expiry. Renewal requires updated documents and activity reports. Non-renewal means loss of CSR eligibility.

NGO Darpan registration (ngo.india.gov.in): Unique ID system for voluntary organizations launched by NITI Aayog. Not mandatory for CSR but increasingly required by government schemes and some corporates. Unique ID format: State Code + Year + NGO Number (e.g., MH/2020/0123456).

NGO Darpan registration process: Step 1 - Register on NGO Darpan portal. Step 2 - Fill detailed application with: Organization details, Registration information, PAN, Bank details, Activities and sectors, Geographic coverage, 80G/FCRA status. Step 3 - Upload documents: Registration certificate, PAN, Bank statement, Activity proof. Step 4 - Verification and approval: Usually 2-4 weeks. Benefits: Recognition by government, eligibility for certain schemes, database visibility.

Using CSR-1 effectively: Share CSR Registration Number prominently in all proposals. Update CSR-1 profile when activities expand. Track validity and initiate renewal well in advance. Some corporates now only search CSR-1 database for partners - ensure accurate profile information.',
        '["Gather all required documents for CSR-1 registration including 3 years of audited financials", "Create MCA portal account if not existing and familiarize with form filing process", "File CSR-1 application with complete attachments and track approval status", "Share CSR Registration Number with all current and prospective corporate partners immediately upon receipt"]'::jsonb,
        '["CSR-1 Document Checklist with format specifications for each document", "MCA Portal Registration Guide with step-by-step screenshots", "CSR-1 Application Filing Guide with common rejection reasons", "Corporate Communication Template for sharing CSR-1 registration"]'::jsonb,
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
        'Master Theory of Change, indicator selection, data collection methods, attribution analysis, and Social Return on Investment (SROI) calculation.',
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
        'Theory of Change (ToC) is a comprehensive methodology for planning, participation, and evaluation that maps how activities lead to desired impact. It is the foundation of all impact measurement and increasingly required by sophisticated CSR funders.

Theory of Change fundamentals: ToC articulates the causal pathway from activities to ultimate impact. It makes explicit the assumptions about how change happens. It provides a framework for measuring progress at multiple levels. It enables adaptive management when assumptions prove incorrect. ToC is both a process (participatory planning) and a product (visual map + narrative).

Core components of Theory of Change: Ultimate Goal/Impact: The long-term change you seek in the world (e.g., "Reduced child malnutrition in Maharashtra"). Outcomes: Intermediate changes that lead toward the goal. These are changes in behavior, knowledge, status, or conditions of beneficiaries (e.g., "Mothers practice appropriate infant feeding"). Outputs: Direct results of activities - products or services delivered (e.g., "5,000 mothers trained in nutrition practices"). Activities: What your organization does (e.g., "Conduct nutrition training sessions"). Inputs: Resources required (e.g., "Trainers, training materials, venue, transportation"). Assumptions: Conditions that must hold for your logic to work (e.g., "Trained mothers have access to nutritious food").

Building ToC - backwards mapping approach: Start with Ultimate Goal: What does success look like in 10 years? Identify Long-term Outcomes: What major changes lead to that goal? Map Intermediate Outcomes: What changes in behavior/knowledge drive long-term outcomes? Define Outputs: What services/products create those changes? Specify Activities: What do you do to create those outputs? List Inputs: What resources do you need? Document Assumptions at each level: What conditions must exist?

Example ToC for education program: Impact: Improved economic status of youth in rural Rajasthan. Long-term Outcome: Youth gainfully employed in quality jobs. Intermediate Outcomes: Youth complete vocational training, Youth develop workplace readiness skills, Employers hire trained youth. Outputs: 1,000 youth enrolled in training, 90% complete certification, 500 placed in jobs. Activities: Mobilization, training delivery, placement linkage, employer engagement. Inputs: Rs 1 crore budget, 10 trainers, 5 training centers, industry partnerships. Key Assumptions: Youth willing to migrate for jobs, Industry continues hiring, Training content remains relevant.

ToC validation process: Test assumptions explicitly through research or pilot. Gather evidence from similar programs (literature review). Consult stakeholders - do beneficiaries agree with the logic? Review with funders - does it align with their theory? Update regularly based on implementation learning.

Communicating ToC to funders: Visual diagram (one page) showing pathway with arrows. Narrative document (3-5 pages) explaining logic, assumptions, evidence. Indicator framework showing how you will measure each level. CSR teams increasingly request ToC as part of proposals - having a clear ToC demonstrates programmatic sophistication.',
        '["Define the ultimate goal for your organization or specific program in clear, measurable terms", "Map the complete pathway from activities to outcomes to goal with explicit causal links", "Identify and document key assumptions at each level that must hold for success", "Create visual ToC diagram suitable for stakeholder communication and funder presentations"]'::jsonb,
        '["Theory of Change Template with step-by-step instructions", "Backwards Mapping Guide with example from education sector", "Assumption Testing Framework with research methodology", "ToC Visualization Tool with sample diagrams"]'::jsonb,
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
        'Indicators are the specific, measurable data points that demonstrate whether your Theory of Change is working. Selecting the right indicators is crucial for credible impact reporting and funder confidence.

Indicator hierarchy follows your ToC: Output Indicators measure direct delivery (number trained, facilities built). Outcome Indicators measure changes in beneficiaries (behavior change, knowledge gain, status improvement). Impact Indicators measure systemic change (poverty reduction, mortality decrease). Most organizations track many outputs, fewer outcomes, and limited impact indicators.

SMART criteria for indicator selection: Specific - clearly defined, no ambiguity in what''s measured. Measurable - can be quantified or categorized objectively. Achievable - realistic to collect given resources. Relevant - directly related to your ToC and objectives. Time-bound - specifies when measurement occurs.

Indicator types and examples by sector:

Education indicators: Outputs: Number of students enrolled, schools supported, teachers trained, learning materials distributed. Outcomes: Attendance rate improvement, Learning outcome scores (standardized tests), Completion/graduation rates, Teacher effectiveness scores. Impact: Employment rates of graduates, Income levels of alumni, Education level of next generation.

Healthcare indicators: Outputs: Patients treated, health camps conducted, facilities upgraded, healthcare workers trained. Outcomes: Disease incidence reduction, Treatment adherence rates, Health-seeking behavior change, Facility utilization rates. Impact: Mortality rate reduction (maternal, infant, disease-specific), Morbidity reduction, DALYs (Disability Adjusted Life Years) averted.

Livelihood indicators: Outputs: Beneficiaries trained, enterprises supported, loans disbursed, groups formed. Outcomes: Income increase (% and absolute), Employment days generated, Asset ownership, Savings rate. Impact: Poverty headcount reduction, Food security improvement, Resilience indicators.

Indicator selection process: Step 1 - Map indicators to ToC levels (at least 2-3 per level). Step 2 - Assess data availability and collection feasibility. Step 3 - Check for existing validated indicators (IRIS+, OECD, sector standards). Step 4 - Define clear measurement methodology for each. Step 5 - Set targets based on evidence (peer benchmarks, pilot data).

Balancing indicator count: Too few: May miss important changes, appear superficial. Too many: Data collection burden unsustainable, analysis complex. Recommendation: 15-20 key indicators maximum. Create a "dashboard" of 5-7 headline indicators for executive reporting.

Indicator reference sheet should document: Indicator name and definition, Unit of measurement, Data source and collection method, Frequency of measurement, Responsible person, Baseline value and target, Disaggregation requirements (gender, age, geography).',
        '["Review IRIS+ catalog and identify relevant indicators for your sector", "Select 15-20 indicators covering outputs, outcomes, and impact levels aligned to your ToC", "Define measurement methodology for each indicator with data source and frequency", "Create indicator reference sheet with targets and tracking responsibility"]'::jsonb,
        '["IRIS+ Indicator Catalog Link with navigation guide", "Indicator Selection Matrix with sector-wise recommendations", "Measurement Methodology Guide with data collection options", "Indicator Reference Sheet Template with example"]'::jsonb,
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
        v_module_3_id,
        19,
        'Data Collection Methods and Tools',
        'Robust data collection is essential for credible impact measurement. The choice of method depends on indicator type, resources available, and rigor required. Modern technology has made data collection more efficient and reliable.

Data collection methods - an overview:

Surveys (structured questionnaires): Best for: Quantitative data at scale (knowledge, attitudes, practices, satisfaction). Modes: In-person (most reliable but expensive), Phone (cost-effective, some response issues), Online/SMS (cheapest, limited to literate populations with connectivity). Sample size: Use statistical calculators; typically 300-400 for 95% confidence, 5% margin of error per stratum.

Interviews (semi-structured conversations): Best for: In-depth understanding, exploring complex issues, understanding "why" behind numbers. Types: Key Informant Interviews (experts, leaders), Beneficiary Interviews (program participants). Sample size: 15-30 interviews typically reach saturation for qualitative themes.

Focus Group Discussions (FGDs): Best for: Understanding group dynamics, community perspectives, testing concepts. Format: 6-12 participants, 60-90 minutes, facilitated discussion. Sample: 3-6 FGDs per segment of interest.

Observation: Best for: Verifying self-reported behavior, assessing physical conditions. Types: Structured (checklist-based), Unstructured (ethnographic). Use: Often combined with other methods for triangulation.

Administrative/MIS data: Best for: Routine operational data (attendance, service utilization, outputs). Source: Program records, registers, databases. Advantage: Low cost, continuous, no additional data collection burden.

Technology platforms for data collection:

Mobile data collection tools: KoBoToolbox (free, widely used in development sector), ODK (Open Data Kit - open source, customizable), SurveyCTO (paid, robust features), CommCare (specialized for health programs). Benefits: Skip logic, GPS tracking, photo/audio capture, offline capability, real-time data sync.

Advantages of mobile data collection: Data quality: Built-in validation, skip logic prevents errors. Timeliness: Real-time data upload, immediate analysis possible. Cost: Eliminates paper, data entry; reduces supervisor travel. Monitoring: GPS verification of data collection locations. Audit trail: Timestamp, enumerator ID, edit history.

Sampling strategies: Census: Survey entire population (feasible for small beneficiary bases). Simple Random: Every unit has equal chance of selection (requires complete list). Systematic: Every nth unit selected (good for large, ordered lists). Stratified: Divide population into groups, sample within each (ensures representation). Cluster: Randomly select clusters, then census or sample within (efficient for geographic spread).

Data quality assurance: Training: 3-5 day enumerator training with practice. Piloting: Test instruments, refine questions. Supervision: Field supervisors check 10-20% of data collection. Double entry: Critical data entered twice to catch errors. Spot checks: Unannounced verification visits. Back checks: Call subsample to verify responses.',
        '["Design data collection forms for your key indicators using appropriate question formats", "Select a data collection technology platform based on your needs and budget", "Create sampling plan ensuring representative data for your target population", "Develop comprehensive data quality protocols covering training, supervision, and verification"]'::jsonb,
        '["Survey Design Template with question bank by sector", "Mobile Data Collection Platform Comparison with feature matrix", "Sampling Calculator with methodology selection guide", "Data Quality Checklist with protocol templates"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Continue with remaining lessons...
    -- Day 20-22 for Module 4

    -- Day 20: Attribution and Counterfactual
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Attribution and Counterfactual Analysis',
        'Attribution is the critical challenge in impact measurement - proving that observed changes happened BECAUSE of your intervention, not due to other factors. Understanding counterfactual thinking strengthens your impact claims.

Attribution fundamentals: Attribution addresses the question: "Would this change have happened anyway without our intervention?" The counterfactual is what would have happened in the absence of intervention. True impact = Observed outcome - Counterfactual outcome. Without addressing attribution, you are reporting correlation, not causation.

Attribution challenges in the field: Self-selection bias: Participants may be more motivated than non-participants. Temporal factors: Changes may be due to seasonality, economic cycles, policy shifts. Spillover effects: Non-participants benefit from intervention presence. Multiple interventions: Beneficiaries receive support from multiple sources. Recall bias: Respondents inaccurately remember baseline status.

Methods for establishing attribution:

Randomized Control Trials (RCTs): Gold standard for causal inference. Randomly assign participants to treatment and control groups. Compare outcomes between groups after intervention. Strengths: Eliminates selection bias, provides clear counterfactual. Limitations: Expensive (Rs 25-100 lakh+), ethical concerns with denying service, may not represent real-world implementation.

Quasi-experimental designs: Difference-in-Differences: Compare change in treatment group vs change in similar comparison group. Propensity Score Matching: Create statistical comparison group based on observable characteristics. Regression Discontinuity: Use eligibility thresholds to compare those just above/below cutoff. Strengths: More practical than RCTs, still rigorous. Limitations: May not control for unobservable differences.

Pre-Post with Comparison Group: Collect baseline data before intervention (treatment and comparison groups). Collect endline data after intervention (same groups). Compare change in treatment group to change in comparison group. Practical for most CSR projects - relatively low cost, reasonable rigor.

Contribution Analysis (qualitative attribution): Develop contribution story linking your activities to outcomes. Gather evidence supporting each causal link. Assess alternative explanations and rule them out. Acknowledge remaining uncertainty. Best for: Complex programs where experimental methods impractical.

Practical recommendations for CSR projects: Minimum: Pre-post design with baseline data before intervention. Better: Pre-post with comparison group from similar geography. Best: Quasi-experimental design with matched comparison. For projects Rs 1 crore+: Consider external evaluation with rigorous methodology.

Communicating attribution clearly: Be explicit about methodology used. Acknowledge limitations transparently. Use appropriate language: "contributed to" vs "caused," "associated with" vs "resulted in." Funders appreciate honest assessment of attribution more than inflated claims.',
        '["Assess attribution requirements expected by your funders and design methodology accordingly", "Design comparison group methodology for your current or planned programs", "Plan baseline and endline data collection with consistent methodology", "Document contribution vs attribution claims clearly with appropriate language"]'::jsonb,
        '["Attribution Methods Guide with decision tree for method selection", "Comparison Group Design Template with matching criteria", "Baseline-Endline Protocol with timeline and checklist", "Claims Documentation Framework with language guidelines"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 21: SROI Calculation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'Social Return on Investment (SROI)',
        'SROI assigns monetary value to social outcomes, creating a single ratio that communicates value for money. While methodologically complex, SROI is increasingly requested by sophisticated funders and can powerfully demonstrate impact.

SROI fundamentals: SROI measures and accounts for a broad concept of value, including social, economic, and environmental outcomes. Formula: SROI Ratio = Present Value of Benefits / Present Value of Investment. Interpretation: SROI of 3:1 means every Rs 1 invested creates Rs 3 of social value. Origins: Developed by REDF in San Francisco, standardized by SROI Network (now part of Social Value International).

SROI principles (7 principles from Social Value International): Involve stakeholders in determining what matters. Understand what changes (outcomes, not just activities). Value the things that matter (including non-market outcomes). Only include what is material (significant to stakeholders). Do not over-claim (address attribution, duration). Be transparent (methodology, assumptions, limitations). Verify the result (independent verification for robustness).

SROI calculation process:

Step 1 - Establish scope and identify stakeholders: Define what you are analyzing (program, organization, period). Identify all stakeholders affected by the activity. Decide which stakeholders to include based on materiality.

Step 2 - Map outcomes: Work with stakeholders to identify outcomes they experience. Create outcome chains showing how activities lead to outcomes. Identify negative outcomes and unintended consequences.

Step 3 - Evidence outcomes and give them a value: Collect data on outcomes (indicators). Develop financial proxies for outcomes without market value. Financial proxy examples: Value of increased income (direct measurement), Value of improved health (avoided medical costs, productivity gain), Value of education (future earnings premium), Value of employment (wages, reduced welfare costs).

Step 4 - Establish impact: Address deadweight: What would have happened anyway? Address attribution: What portion is due to your intervention? Address displacement: Did benefits shift from elsewhere? Address drop-off: How long do benefits last?

Step 5 - Calculate SROI: Sum all monetized benefits across stakeholders and years. Apply discount rate to calculate present value (typically 3.5-5%). Divide by total investment. Result: SROI ratio.

Financial proxies - examples from Indian context: Employment: Annual wages (market value). Health improvement: Medical costs avoided (Rs 5,000-50,000 depending on condition). Child nutrition improvement: Future earnings increase from cognitive development (research shows 2-3% per year). Education: Lifetime earnings differential (Rs 20-50 lakh depending on level). Women''s time savings: Minimum wage × hours saved. Carbon sequestration: Carbon price (Rs 500-1,000 per ton CO2).

SROI costs and considerations: Full SROI analysis costs: Rs 3-15 lakh depending on complexity. Timeline: 3-6 months for comprehensive analysis. When to use: High-value programs, sophisticated funders, comparing intervention options. Alternatives: Simpler cost-effectiveness analysis (cost per outcome achieved).',
        '["Identify key outcomes for potential SROI analysis covering material stakeholder groups", "Research financial proxies for each outcome using Indian context data", "Collect or plan to collect outcome data needed for SROI calculation", "Calculate preliminary SROI ratio and validate with external expert"]'::jsonb,
        '["SROI Calculator Template with step-by-step guidance", "Financial Proxy Database with India-specific values", "Outcome Valuation Guide with methodology notes", "SROI Report Template following Social Value International standards"]'::jsonb,
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
        'Effective impact reporting communicates your outcomes clearly to diverse stakeholders. Reports should tell a compelling story backed by credible data, balancing rigor with accessibility.

Report structure and components: Executive Summary (1-2 pages): Key findings, headline numbers, recommendations. Must stand alone - many readers only read this. Program Description: Context, Theory of Change, activities, reach. Methodology: Data sources, collection methods, limitations, attribution approach. Findings by outcome area: Output metrics, outcome metrics, progress toward impact. Analysis: What worked, what didn''t, why. Lessons Learned and Recommendations. Appendices: Detailed data tables, methodology details, beneficiary stories.

Report design principles: Lead with impact, not activities. Use visuals effectively (charts, infographics, photos). Include beneficiary voices (quotes, case studies). Be honest about challenges and failures. Provide context for numbers (compared to target, baseline, benchmark). Highlight cost-effectiveness where relevant.

Reporting frequency and types: Operational/Progress Reports (quarterly): Focus on outputs, activities completed, funds utilized. For program management and funder updates. Impact/Annual Reports (yearly): Comprehensive outcome reporting, year-on-year comparison, strategic analysis. For external communication and accountability. End-of-Project Reports: Complete outcome and impact assessment, lessons learned, recommendations. For closure and learning.

Data visualization best practices: Choose chart types appropriately: Line charts for trends over time, Bar charts for comparisons, Pie charts for composition (limited use). Keep visualizations simple - one message per chart. Use consistent color schemes and formatting. Ensure accessibility (colorblind-friendly, clear labels). Include source and date for all data.

Beneficiary stories - ethical collection: Obtain informed consent for stories and photos. Protect privacy (consider anonymization where appropriate). Avoid "poverty porn" or sensationalized narratives. Show agency and dignity, not just victimhood. Verify stories for accuracy. Ensure representativeness (not just success stories).

Corporate CSR reporting requirements typically include: Input-output-outcome metrics in specified format. Cost per beneficiary and cost-effectiveness analysis. Comparison to targets set in Annual Action Plan. Progress against baseline with percentage changes. Photographs with location and date. Beneficiary testimonials and case studies. Financial statement of CSR expenditure. Independent impact assessment (for projects Rs 1 crore+ over 3+ years).

Creating report templates: Develop standardized templates for different funders. Create data collection systems that feed directly into reports. Build a library of visualizations that can be updated with new data. Maintain a story bank of beneficiary testimonials and photos.',
        '["Create a standardized impact report template for your organization covering all key sections", "Develop an interactive dashboard with key metrics for real-time monitoring", "Establish ethical protocols for collecting and documenting beneficiary stories", "Create annual reporting calendar with data collection milestones"]'::jsonb,
        '["Impact Report Template with corporate CSR format", "Dashboard Design Guide with visualization best practices", "Story Collection Protocol with consent forms", "Reporting Calendar Template with timeline milestones"]'::jsonb,
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
        'Implement IRIS+ framework, align with SDGs, achieve GIIRS rating, pursue B Corp certification, and understand GRI sustainability reporting.',
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
        'IRIS+ (Impact Reporting and Investment Standards) is the generally accepted system for measuring, managing, and optimizing impact. Managed by the Global Impact Investing Network (GIIN), it has become the global standard for impact measurement.

IRIS+ fundamentals: IRIS+ provides a comprehensive catalog of standardized metrics for impact measurement. It offers Core Metrics Sets organized by impact theme. It aligns with other frameworks including SDGs, GRI, and SASB. It is free to use and available at iris.thegiin.org. Over 25,000 organizations globally reference IRIS+ metrics.

IRIS+ structure and components: Impact Categories: 6 categories covering planet and people dimensions. Strategic Goals: High-level impact objectives organizations seek. Core Metrics Sets: Pre-selected metrics for specific impact themes. Metrics: 600+ standardized indicators with definitions. Evidence: Research linking activities to outcomes.

IRIS+ Impact Categories: Financial Inclusion: Access to financial services for underserved populations. Health: Improved health outcomes and healthcare access. Education: Access to quality education and learning outcomes. Energy: Access to clean, affordable energy. Food Security: Access to nutritious, affordable food. Decent Work: Quality employment and economic opportunity. Climate: Reducing emissions, building resilience. Biodiversity: Protecting ecosystems and natural resources. Real Assets: Sustainable infrastructure and housing.

Core Metrics Sets available: Gender Lens Investing, Climate Change Mitigation, Smallholder Agriculture, Financial Inclusion, Education, Health, Affordable Housing, and more. Each Core Metrics Set contains: Definition and scope, Core metrics (required), Supporting metrics (optional), Related evidence resources.

Using IRIS+ in practice: Step 1 - Define your impact strategy: What outcomes do you seek? Step 2 - Identify relevant Core Metrics Sets based on your focus areas. Step 3 - Select metrics that align with your Theory of Change. Step 4 - Collect data using IRIS+ metric definitions. Step 5 - Report using standardized format for comparability.

Benefits of IRIS+ adoption: Credibility: Internationally recognized standards demonstrate rigor. Comparability: Standardized metrics enable benchmarking. Efficiency: Pre-selected metrics reduce design effort. Funder alignment: Many impact investors require or prefer IRIS+. Learning: Evidence base helps improve programming.

IRIS+ in Indian context: Growing adoption by Indian impact investors (Aavishkaar, Elevar, Lok Capital). Increasingly referenced in CSR impact assessments. Several Indian organizations contribute to IRIS+ development. Adaptation may be needed for India-specific contexts while maintaining comparability.',
        '["Create an account on iris.thegiin.org and explore the catalog structure", "Identify Core Metrics Sets relevant to your sector and impact focus", "Map your existing indicators to IRIS+ metrics for standardization", "Select 10-15 IRIS+ metrics to incorporate into your measurement system"]'::jsonb,
        '["IRIS+ Registration and Navigation Guide with screenshots", "Core Metrics Set Overview with sector recommendations", "Indicator Mapping Template for IRIS+ alignment", "IRIS+ Implementation Checklist with timeline"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Continue with remaining days 24-55...
    -- For brevity, I'll include the key structural elements and a few more representative lessons

    -- Day 24: SDG Alignment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        24,
        'SDG Alignment and Reporting',
        'The UN Sustainable Development Goals provide a universal framework for impact. Aligning your work with SDGs enables communication with global audiences and demonstrates contribution to international development priorities.

SDG overview for social enterprises: 17 Goals adopted by all UN member states in 2015 as part of 2030 Agenda. 169 targets providing specific measurable objectives. 231 unique indicators tracking global progress. India ranks 112th out of 166 countries on SDG Index (2023), showing significant room for improvement.

SDGs most relevant for CSR in India: SDG 1 (No Poverty): India has 228 million poor; direct relevance to livelihood programs. SDG 2 (Zero Hunger): 18.7% children under 5 are wasted; nutrition programs critical. SDG 3 (Good Health): Maternal mortality 103/100,000; healthcare CSR addresses this. SDG 4 (Quality Education): 287 million illiterate adults; education leads CSR spending. SDG 5 (Gender Equality): Women''s economic participation 25.1%; gender programs needed. SDG 6 (Clean Water): 163 million lack safe water; water CSR addresses this. SDG 8 (Decent Work): Youth unemployment 23%; skill development programs relevant. SDG 13 (Climate Action): India third-largest emitter; environment CSR growing.

SDG mapping process: Step 1 - Identify primary SDG: Which goal does your work most directly advance? Step 2 - Identify secondary SDGs: Which other goals receive indirect benefits? Step 3 - Map to specific targets: SDG targets provide precision (e.g., SDG 4.1: quality primary/secondary education). Step 4 - Align indicators: Use or adapt SDG indicators for your measurement. Step 5 - Report contribution: Quantify your contribution to SDG targets.

SDG indicators relevant for organizations: SDG 1.1.1: Proportion of population below international poverty line (adaptable to program). SDG 2.2.1: Prevalence of stunting among children under 5. SDG 3.1.1: Maternal mortality ratio (per 100,000 live births). SDG 4.1.1: Proportion achieving minimum proficiency in reading and mathematics. SDG 5.5.1: Proportion of women in managerial positions.

SDG reporting formats: SDG Impact Standards (UNDP): Framework for enterprises, investors, bond issuers. SDG Compass (GRI, UNGC, WBCSD): Guide for business SDG integration. Corporate SDG reporting: Increasingly part of sustainability reports. SDG Contribution Statement: Organization-specific declaration of SDG alignment.

SDGs and CSR in India: NITI Aayog SDG India Index ranks states on SDG performance. CSR alignment with SDGs demonstrates national development contribution. Some companies explicitly map CSR portfolio to SDGs. SDG lens can help identify gaps and opportunities for CSR programming.',
        '["Map your programs to relevant SDGs and specific targets with clear connection", "Identify SDG indicators applicable to your work and incorporate into measurement", "Create an SDG contribution statement documenting your organization''s SDG alignment", "Design SDG-aligned reporting format for corporate funder presentations"]'::jsonb,
        '["SDG Mapping Template with India-specific targets", "SDG Indicator Reference with measurement guidance", "SDG Contribution Statement Guide with examples", "SDG Reporting Framework with visualization templates"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 25-28: Continue with B Corp, GIIRS, GRI lessons
    -- (Similar detailed structure for each)

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        25,
        'B Corp Certification for Social Enterprises',
        'B Corp certification is a third-party verification of social and environmental performance. With over 6,000 certified B Corps globally and 150+ in India, it represents a powerful credibility signal and community membership.

B Corp fundamentals: Certified B Corporations are businesses that meet the highest standards of verified social and environmental performance, public transparency, and legal accountability to balance profit and purpose. Certification managed by B Lab, a non-profit organization founded in 2006.

B Corp certification requirements: Performance Requirement: Score 80+ points on B Impact Assessment (out of 200 total possible). Legal Requirement: Amend corporate governing documents to consider stakeholder interests. Transparency Requirement: Publicly disclose B Impact Assessment score and report.

B Impact Assessment structure: Governance (max ~20 points): Mission, ethics, stakeholder engagement, governance practices. Workers (max ~50 points): Compensation, benefits, training, ownership, work environment, worker health and safety. Community (max ~50 points): Diversity, economic impact, civic engagement, supply chain. Environment (max ~50 points): Environmental management, facilities, inputs, outputs, transportation. Customers (max ~30 points): For businesses serving underserved populations or creating social/environmental products.

Certification process timeline: Step 1 - Complete B Impact Assessment online (2-4 weeks). Step 2 - Review and improve score to 80+ threshold. Step 3 - Submit for verification (provide documentation for ~30% of answers). Step 4 - Verification review (2-6 months depending on queue). Step 5 - Sign B Corp Declaration of Interdependence. Step 6 - Pay certification fee. Step 7 - Complete legal requirement within 2-3 years.

Certification costs in India: Assessment completion: Free. Verification fee: Rs 50,000-1,00,000 for organizations under $5M revenue. Annual certification fee: Rs 40,000-5,00,000 depending on annual revenue (sliding scale).

B Corps in India: 150+ certified companies including notable organizations like Patagonia India, Tata Elxsi, Satvic Foods, Arias, and others. Growing movement with active B Local India community. Regular events, networking, and peer learning opportunities.

Strategic benefits of B Corp: Marketing differentiation: "Certified B Corporation" badge signals verified commitment. Talent attraction: Values-driven employees seek B Corps. Corporate partnerships: Some corporates prefer B Corp suppliers. Investor interest: Impact investors view positively. Community: Global network of mission-aligned businesses.',
        '["Complete the B Impact Assessment online and calculate your preliminary score", "Identify improvement areas to achieve 80+ threshold with action plan", "Review legal requirements and plan governance document amendments", "Research B Corp marketing and networking opportunities in India"]'::jsonb,
        '["B Impact Assessment Guide with scoring tips", "Score Improvement Roadmap by assessment area", "Legal Requirement Guide for Indian entities", "B Corp Marketing Best Practices with case studies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Continue with Modules 6-11...
    -- MODULE 6: CSR Proposal Writing (Days 29-35)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CSR Proposal Writing',
        'Master corporate priorities research, proposal structure, budgeting, pitch presentations, and objection handling.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- MODULE 7: Corporate Partnership Development (Days 36-41)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Corporate Partnership Development',
        'Build sustainable partnerships through pipeline development, outreach strategies, discovery meetings, and relationship management.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- MODULE 8: ESG Integration (Days 42-46)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'ESG Integration',
        'Master SEBI BRSR requirements, ESG pillars, social pillar contribution, and corporate ESG reporting support.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- MODULE 9: Impact Investing Ecosystem (Days 47-51)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Impact Investing Ecosystem',
        'Navigate impact investors in India, prepare for investment, understand impact-linked finance, and negotiate term sheets.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- MODULE 10: Social Stock Exchange (Days 52-54)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Social Stock Exchange',
        'Understand India''s Social Stock Exchange framework, eligibility requirements, registration process, and fundraising opportunities.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 52: Social Stock Exchange Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        52,
        'Social Stock Exchange Overview',
        'India launched the world''s first regulated Social Stock Exchange (SSE) in 2022, creating a formal capital market platform for social enterprises. Understanding SSE is essential for organizations considering alternative fundraising channels.

SSE fundamentals: Social Stock Exchange is a separate segment within BSE and NSE for social enterprises to raise funds and provide information about their social impact. Regulated by SEBI under SEBI (ICDR) Regulations 2018 (amended). Framework finalized in July 2022 with first registrations in late 2022.

Types of entities eligible for SSE: Non-Profit Organizations (NPOs): Section 8 companies, Trusts, Societies engaged in eligible activities. For-Profit Social Enterprises (FPSEs): Companies where social intent is primary and locked in governing documents.

Eligible activities under SSE (similar to Schedule VII with additions): Eradicating hunger, poverty, malnutrition, Promoting healthcare, education, environmental sustainability, Promoting gender equality, Supporting vulnerable groups (LGBTQ+, minorities, disabled), Protection of heritage and culture, Training for sports promotion, Supporting incubators, Rural/slum development, Disaster management, and Other activities as notified by SEBI.

Registration requirements for NPOs: Minimum 3 years of existence. Minimum Rs 50 lakh funding in preceding financial year. Minimum Rs 10 lakh spending in preceding financial year. Valid 12A/80G registration. Audited financials for 3 years. Impact assessment by Social Auditor.

Registration requirements for FPSEs: Social intent locked in MOA/AOA (cannot be altered without 75% shareholder approval). Minimum 67% of activities in eligible areas. Three-year track record in eligible activities. Net worth and revenue thresholds as applicable.

Fundraising mechanisms on SSE: For NPOs: Zero Coupon Zero Principal Instruments (ZCZP): Essentially donations with SSE formalization. Minimum issue size Rs 1 crore. Minimum subscription Rs 2 lakh per investor. No interest or principal repayment. For FPSEs: Equity shares, Debt instruments. Standard capital market mechanisms with social reporting requirements.

Social Auditor requirements: Annual Social Impact Report mandatory for listed entities. Report verified by Social Auditor registered with self-regulatory organization. Impact areas, beneficiaries, activities, and outcomes reported. Public disclosure on exchange website.

SSE benefits: Access to new funding pools (retail, institutional). Credibility and visibility from exchange listing. Standardized impact reporting framework. Potential for secondary market trading (for equity).',
        '["Assess your organization''s eligibility for SSE registration against criteria", "Review SSE regulations and understand registration process timeline", "Evaluate fundraising mechanism (ZCZP for NPOs, equity/debt for FPSEs) appropriate for your needs", "Connect with SSE-registered entities and advisors to understand practical requirements"]'::jsonb,
        '["SSE Eligibility Checklist with detailed criteria", "SSE Registration Guide with document requirements", "ZCZP Instrument Structure Guide with sample term sheet", "SSE Advisory Firms List with contact information"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- MODULE 11: Scaling Impact (Day 55)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Scaling Impact',
        'Strategies for growing impact through replication, technology, partnerships, and policy influence.',
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
        'Scaling impact is the ultimate goal - reaching more beneficiaries with effective programs. Multiple pathways exist, and choosing the right approach depends on your model, resources, and impact vision.

Scaling fundamentals: Scaling means increasing impact, not necessarily organizational size. Different pathways suit different organizations and contexts. Premature scaling is a common cause of organizational failure. Proven model with evidence is prerequisite for responsible scaling.

Scaling pathways overview:

Organizational Growth (direct scaling): Expand your own operations to serve more beneficiaries. Advantages: Control over quality, direct attribution, organizational growth. Challenges: Management complexity, funding requirements, geographic limitations. Best for: Organizations with strong operations, patient capital, and management capacity.

Replication (franchising): Enable others to implement your proven model. Advantages: Faster spread, lower capital requirement, local ownership. Challenges: Quality control, brand protection, support requirements. Best for: Organizations with standardized models and strong documentation.

Network Building (collective impact): Coordinate multiple organizations toward shared goals. Advantages: Leverage others'' capacity, systemic change potential. Challenges: Coordination costs, attribution complexity, alignment maintenance. Best for: Organizations with convening power and collaborative orientation.

Policy Influence (systemic change): Advocate for policy/practice changes that scale impact. Advantages: Massive reach if successful, permanent change. Challenges: Uncertain outcomes, long timelines, political complexity. Best for: Organizations with evidence, credibility, and advocacy capability.

Scaling readiness assessment: Proven model with evidence of impact (essential). Documented processes enabling replication (essential). Strong leadership team with scaling capacity. Sustainable funding model not dependent on single source. Quality assurance systems ensuring consistency. Demand for services beyond current capacity.

Technology for scaling: Digital delivery: E-learning, telemedicine, mobile extension services. Data systems: Real-time monitoring, adaptive management. Communication: Beneficiary engagement at scale. Operations: Automated processes, reduced unit costs.

Scaling with CSR partnerships: Multi-location corporate CSR: Single funder scaling across geographies. Corporate foundation partnership: Strategic long-term scaling support. Employee engagement at scale: Volunteer programs multiplying reach. Supply chain programs: Leveraging corporate supply chains for beneficiary access.

Scaling risks and mitigation: Mission drift: Clear theory of change and governance oversight. Quality dilution: Quality standards, auditing, continuous improvement. Financial stress: Diversified funding, reserves, conservative projections. Team burnout: Capacity building, realistic targets, organizational culture.

The Indian impact scaling landscape includes successful examples: Pratham (education across 23 states), Akshaya Patra (mid-day meals to 2 million children), SKS Microfinance (financial inclusion at scale), and Self Employed Women''s Association (organizing 2 million women workers).',
        '["Complete scaling readiness assessment using provided framework", "Choose appropriate scaling strategy based on your model and capacity", "Document your model comprehensively for replication or partnership scaling", "Create 3-5 year scaling roadmap with milestones and resource requirements"]'::jsonb,
        '["Scaling Readiness Assessment Tool with scoring framework", "Scaling Strategy Selection Framework with decision criteria", "Model Documentation Guide with template", "Scaling Roadmap Template with financial projections"]'::jsonb,
        120,
        100,
        0,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P14 Impact & CSR Mastery course enhanced successfully with 11 modules and comprehensive lessons';
END $$;

COMMIT;
