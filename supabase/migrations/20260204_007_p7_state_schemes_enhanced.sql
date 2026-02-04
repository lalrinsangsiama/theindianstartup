-- THE INDIAN STARTUP - P7: State-wise Scheme Map - Enhanced Content
-- Migration: 20260204_007_p7_state_schemes_enhanced.sql
-- Purpose: Enhance P7 course content to 500-800 words per lesson with India-specific state scheme data

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
    -- Get or create P7 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P7',
        'State-wise Scheme Map - Complete Navigation',
        'Master India''s 28 states and 8 Union Territories startup ecosystem. Navigate state-specific policies, access capital subsidies up to 50%, interest subvention of 5-9%, seed funds worth Rs 10-50 lakhs, land allocation at subsidized rates, and sector-specific incentives. Comprehensive coverage of Karnataka Elevate, Maharashtra Startup Policy, Gujarat Industrial Policy, Telangana T-Hub, Kerala Startup Mission, and more.',
        4999,
        false,
        30,
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

    -- Get product ID if already exists
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P7';
    END IF;

    -- Clean existing modules and lessons for P7
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: India's Federal Framework (Days 1-3)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'India''s Federal Framework & State Ecosystem',
        'Understand India''s federal structure with 28 states and 8 Union Territories. Learn how concurrent list powers enable states to create unique startup policies, and develop a framework for evaluating state-level opportunities.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: India's State Ecosystem Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'India''s State Ecosystem Overview',
        'India operates as a federal republic with 28 states and 8 Union Territories, each with varying degrees of legislative autonomy. The Constitution''s Seventh Schedule divides powers into Union List (97 subjects), State List (66 subjects), and Concurrent List (47 subjects). For startups, this federal structure creates both opportunities and complexity - while central schemes like Startup India provide a national framework, state policies offer additional incentives worth Rs 10-50 lakhs or more.

The startup ecosystem varies dramatically by state. Karnataka leads with over 14,000 DPIIT-recognized startups, followed by Maharashtra (13,000+), Delhi NCR (12,000+), Gujarat (8,000+), and Telangana (7,000+). These top 5 states account for approximately 65% of India''s total startup population. However, emerging states like Kerala, Tamil Nadu, Rajasthan, and Uttar Pradesh are rapidly building competitive ecosystems with aggressive incentive packages.

Understanding the state policy landscape is crucial because incentives can significantly reduce your capital requirements. A typical startup in Karnataka can access: Rs 50 lakh seed fund, 50% subsidy on patent costs, 100% stamp duty exemption, and Rs 2 lakh marketing support. Combine this with central Startup India benefits (tax holiday, self-certification compliance), and your effective cost of starting drops by 30-40%.

State policies generally cover six benefit categories: Financial Incentives (seed funding, grants, subsidies), Tax Benefits (stamp duty exemption, SGST reimbursement, electricity duty waiver), Infrastructure Support (incubator access, co-working subsidies, land allocation), Capacity Building (mentorship, training, networking), Market Access (procurement preference, exhibition support), and IP Support (patent/trademark reimbursement).

The key strategic insight is that states compete for startup investment. This competition creates arbitrage opportunities - a fintech startup might find better incentives in Gujarat (GIFT City benefits), while a manufacturing startup benefits more from Tamil Nadu''s industrial policy. Your location decision should factor in: incentive value, talent availability, market proximity, infrastructure quality, and ease of doing business. States like Gujarat, Telangana, and Andhra Pradesh consistently rank high on World Bank''s Ease of Doing Business index.

Most state policies require DPIIT recognition as a prerequisite. Ensure your startup is registered on the Startup India portal before applying for state benefits. The recognition process takes 2-5 days and requires: incorporation certificate, brief about innovation, and founder details.',
        '["Complete DPIIT Startup India registration if not already done - this is prerequisite for most state schemes", "Map the top 5 states relevant to your sector using the State Ecosystem Scorecard - evaluate based on incentives, talent, market, and infrastructure", "Research the specific startup policy document for your primary state - note application deadlines and eligibility criteria", "Create a State Benefits Tracker spreadsheet listing all potential schemes, their values, and application requirements"]'::jsonb,
        '["State Ecosystem Scorecard Template with weighted evaluation criteria for 15 factors", "DPIIT Registration Guide with step-by-step screenshots and common rejection reasons", "State Startup Policy Compendium with links to all 28 state policy documents", "Benefits Tracker Spreadsheet with auto-calculation of total incentive value"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Top Startup-Friendly States Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Top Startup-Friendly States Deep Dive',
        'Karnataka leads India''s startup ecosystem through its Karnataka Startup Policy 2022-27 with a Rs 400 crore corpus. Key benefits include: Seed funding up to Rs 50 lakhs (Rs 30 lakh for product startups, Rs 20 lakh for service startups), Elevate 100 program providing Rs 50 lakh to top 100 startups annually, 100% stamp duty exemption on first Rs 30 crore investment, patent cost reimbursement up to Rs 10 lakh (domestic) and Rs 20 lakh (international), and marketing support of Rs 2 lakh for exhibitions.

Maharashtra''s Startup Policy 2018 (updated 2023) offers comprehensive support through Mumbai and Pune ecosystems. Benefits include: Seed funding up to Rs 15 lakhs via Maharashtra State Innovation Society, 100% stamp duty refund, 100% electricity duty exemption for 5 years, and SGST reimbursement for 3 years. Mumbai FinTech Hub provides sector-specific support with Rs 5 crore grants for fintech startups.

Gujarat is renowned for manufacturing and industrial startups through its Industrial Policy 2020 and GIFT City for fintech. Manufacturing startups receive: Capital subsidy of 25% up to Rs 5 crore, interest subsidy of 7% for 5 years, land at 50% of market rate in industrial estates, and net SGST refund for 10 years. GIFT City offers IFSC benefits including zero GST, 100% tax exemption for 10 years, and forex transaction freedom.

Telangana has emerged as a startup powerhouse through T-Hub (India''s largest incubator) and WE-Hub for women entrepreneurs. Key benefits: Seed fund up to Rs 10 lakh, 100% reimbursement of patent costs, 100% stamp duty exemption, 50% rebate on registration charges, and monthly stipend of Rs 10,000 for women founders for 6 months. T-Hub provides world-class mentorship and global connections.

Kerala Startup Mission (KSUM) is recognized as one of India''s most active state initiatives. Benefits include: Product Development Grant up to Rs 25 lakh, equity funding up to Rs 1 crore through KSUM Fund, interest-free loan up to Rs 20 lakh, 100% stamp duty exemption, and Rs 12 lakh subsidy for setting up startups. Kerala also offers unique "Idea Grant" of Rs 2 lakh for validating concepts before incorporation.

Tamil Nadu''s StartupTN offers: Seed Grant up to Rs 10 lakh, 30% capital subsidy for manufacturing (up to Rs 30 lakh), 100% stamp duty exemption, and marketing support up to Rs 5 lakh. TIDCO Venture Fund provides equity funding up to Rs 5 crore.',
        '["Download and analyze the complete startup policy documents for Karnataka, Maharashtra, Gujarat, Telangana, and Kerala", "Create a detailed comparison matrix showing incentive values across top 5 states for your specific business type", "Identify which state offers the highest total incentive value for your startup stage and sector", "Calculate the 5-year total benefit value including all applicable subsidies, tax exemptions, and grants"]'::jsonb,
        '["Top 5 States Policy Comparison Matrix with detailed benefit values and eligibility criteria", "State Incentive Calculator with sector-wise projections for 5-year benefit realization", "State Nodal Agency Contact Directory with dedicated startup cell numbers and emails", "Application Timeline Planner showing optimal sequence for multi-state benefit capture"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Location Selection Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Location Selection Framework',
        'Choosing your startup location involves balancing multiple factors beyond just incentives. The optimal location delivers maximum benefit across: Incentive Value (state schemes worth), Talent Pool (availability and cost of skilled workforce), Market Access (proximity to customers and partners), Infrastructure (physical, digital, and startup support), Ease of Operations (regulatory efficiency, corruption levels), and Cost Structure (real estate, salaries, utilities).

Develop a weighted scoring model based on your priorities. For a deep-tech startup, weight talent pool heavily (40%) - this favors Bangalore, Hyderabad, and Pune. For a manufacturing startup, infrastructure and incentives matter more - favoring Gujarat, Tamil Nadu, and Maharashtra industrial zones. For a services/consulting startup, market access is paramount - favoring metro locations despite lower incentives.

The "registered office vs operating office" strategy allows optimizing for both incentives and operations. Register your company in a high-incentive state (Gujarat, Karnataka) while maintaining operational presence in your market city. This is completely legal as long as you maintain proper compliance and the registered office has a genuine presence. Many startups maintain Rs 5,000-10,000/month virtual office in incentive-friendly states while operating from metros.

Consider Tier 2 city advantages: Cities like Ahmedabad, Pune, Jaipur, Coimbatore, and Kochi offer 40-60% lower operating costs than metros, often with equivalent or better state incentives. Talent arbitrage is significant - a software developer costing Rs 15-20 lakh annually in Bangalore might cost Rs 8-12 lakh in Tier 2 cities. Remote-first culture post-COVID has made Tier 2 operations increasingly viable.

Special Economic Zones (SEZs) and Industrial Parks offer additional incentives: 100% income tax exemption for first 5 years, 50% exemption for next 5 years, duty-free imports, and dedicated infrastructure. GIFT City in Gujarat, Mahindra World City in Tamil Nadu, and Sri City in Andhra Pradesh are notable examples. For export-oriented startups, SEZ benefits can be more valuable than state startup policies.

Multi-state presence strategy: As you scale, consider establishing presence in multiple states to capture different benefits. Common pattern: Head office in metro (for funding and hiring), development center in Tier 2 (cost optimization), manufacturing in industrial state (Gujarat/Tamil Nadu), and sales offices in key markets. Each entity can independently claim state benefits.',
        '["Complete the Location Decision Matrix scoring your top 5 potential locations across all evaluation criteria", "Calculate Total Cost of Operations for each location including salaries, rent, utilities, and compliance costs", "Evaluate the registered office arbitrage strategy - identify optimal combination of incentive state and operating city", "Research SEZ and Industrial Park options if your business model suits - compare benefits with state startup schemes"]'::jsonb,
        '["Location Decision Matrix Template with 15 weighted criteria and automated scoring", "Total Cost of Operations Calculator comparing 10 major Indian startup cities", "Registered Office Strategy Guide with compliance checklist and legal considerations", "SEZ vs State Startup Policy Comparison Tool for sector-specific analysis"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Northern States (Days 4-6)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Northern States Ecosystem',
        'Navigate startup policies of Delhi NCR, Uttar Pradesh, Haryana, Punjab, Rajasthan, Uttarakhand, Himachal Pradesh, and Jammu & Kashmir. Access region-specific incentives and build relationships with state nodal agencies.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 4: Delhi NCR Ecosystem
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        4,
        'Delhi NCR Ecosystem',
        'Delhi NCR (National Capital Region) encompasses Delhi, Gurugram (Haryana), Noida/Greater Noida (Uttar Pradesh), and Faridabad - creating India''s most concentrated business hub with unique multi-state arbitrage opportunities. With over 12,000 DPIIT-recognized startups, Delhi NCR is second only to Karnataka in startup density but leads in funding attracted.

Delhi Startup Policy 2022 offers substantial benefits despite Delhi''s smaller geographic size. Key incentives include: Seed Fund up to Rs 10 lakhs for early-stage startups, 100% reimbursement of stamp duty on first transaction, collateral-free loans up to Rs 20 lakhs at 6% interest through Delhi Credit Guarantee Fund, Rs 2 lakh grant for patent registration, and monthly stipend of Rs 25,000 for first-generation entrepreneurs for 12 months. Delhi''s Innovation Fund of Rs 100 crore provides follow-on funding for successful startups.

Unique Delhi benefits: Incubation support through Delhi Technological University, NSUT, and IP University incubators with free co-working space for 2 years, dedicated Startup Resource Cell for single-window clearances, and preference in Delhi government procurement up to Rs 50 lakh without tender.

Haryana (Gurugram focus) offers the Haryana Enterprises and Employment Policy 2020 with startup-specific provisions: Capital subsidy of 25% on fixed capital investment up to Rs 25 lakhs, 5% interest subvention on term loans for 5 years, 100% stamp duty refund, 100% SGST refund for first 3 years, and Rs 5 lakh grant for patent registration. Gurugram houses India''s largest corporate workforce, making it ideal for B2B startups.

Uttar Pradesh (Noida/Greater Noida) has emerged aggressively with the UP Startup Policy 2020 backed by Rs 1000 crore Startup Fund. Benefits include: Seed funding up to Rs 50 lakhs for DPIIT-recognized startups, 100% stamp duty exemption, 100% SGST reimbursement for 3 years, Rs 10 lakh patent subsidy (50% of cost), interest subsidy of 5% on loans up to Rs 1 crore, and monthly sustenance allowance of Rs 20,000 for 1 year. UP''s Electronics Manufacturing Cluster in Noida offers additional sector-specific incentives.

NCR arbitrage strategy: Register in UP for highest seed funding (Rs 50 lakh), maintain Gurugram presence for corporate access, and leverage Delhi incubators for mentorship. Many startups establish Noida registered office while operating from Gurugram - capturing best of both policies. The NCR metro connectivity makes multi-city operations seamless.',
        '["Analyze Delhi, Haryana (Haryana Enterprise Promotion Board), and UP (UP Startup Policy) schemes to identify maximum benefit combination", "Identify relevant incubators in NCR: IIT Delhi, DTU, NSUT, Startup Oasis, T-Hub Hyderabad extensions, 91springboard", "Calculate total incentive value available if operating across NCR with strategic entity placement", "Connect with respective nodal agencies: Startup Delhi, Haryana Enterprise Promotion Board, UP Startup Council"]'::jsonb,
        '["NCR Multi-State Strategy Guide with entity structure recommendations", "Delhi-Haryana-UP Incentive Comparison with sector-specific benefits", "NCR Incubator Directory with application timelines and selection criteria", "NCR Nodal Agency Contact Sheet with dedicated startup cell officers"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 5: Uttar Pradesh ODOP & Haryana Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        5,
        'Uttar Pradesh ODOP & Haryana Manufacturing',
        'Uttar Pradesh''s One District One Product (ODOP) scheme is a unique state initiative that offers exceptional benefits for startups working on district-specific traditional products. With 75 districts each mapped to a unique product (Varanasi-silk, Lucknow-chikan embroidery, Agra-leather, Moradabad-brassware, etc.), ODOP provides: Common Facility Centers with shared manufacturing infrastructure, margin money subsidy of 25% up to Rs 62.5 lakhs, interest subsidy of 5% for 5 years, and 50% transport subsidy for marketing.

UP Electronics Manufacturing Cluster (Yamuna Expressway) offers massive incentives for hardware/electronics startups: 25% capital subsidy up to Rs 50 crore, 100% stamp duty exemption, 100% electricity duty exemption for 10 years, and dedicated infrastructure in Japan Industrial Township and Korean Industrial Park. For deep-tech and hardware startups, this cluster rivals Gujarat''s Sanand and Tamil Nadu''s SIPCOT.

UP IT/ITeS Policy provides specific benefits for software startups: Reimbursement of 100% stamp duty, 100% electricity duty exemption for 10 years, 15% additional subsidy for startups employing more than 30% women, and land at 25% of market rate in IT Parks. Noida and Lucknow IT Parks offer plug-and-play infrastructure.

Haryana Manufacturing Focus: Haryana''s proximity to Delhi makes it ideal for manufacturing startups serving the North Indian market. The Haryana Enterprise and Employment Policy 2020 offers manufacturing-specific incentives: Capital subsidy of 25% on plant and machinery (up to Rs 1 crore), 50% reimbursement on Quality Certification costs, 5% interest subvention for 5 years, and 75% net SGST refund for 10 years.

Haryana Special Incentives for Specific Sectors: Food Processing - 35% capital subsidy (vs 25% general), additional Rs 5 lakh for FSSAI certification; Textile - 30% capital subsidy + Rs 10,000 per employee for skill development; Automobile Ancillaries - 35% capital subsidy in IMT areas + dedicated industrial plots at concessional rates; Electronics Manufacturing - 25% capital subsidy + additional incentives under state M-SIPS equivalent policy.

Haryana Startup Incubators: CII-Haryana Incubation Center, STPI Gurugram, IIT Ropar (nearby), and several private incubators like 91springboard, WeWork, and Innov8 offer subsidized space under state partnership programs.',
        '["If your product aligns with any ODOP category, research district-specific benefits and Common Facility Center access procedures", "Evaluate UP Electronics Manufacturing Cluster benefits if building hardware/electronics products", "Compare Haryana manufacturing incentives with Gujarat and Tamil Nadu for your sector", "Identify relevant incubators in UP and Haryana - shortlist 3 for application"]'::jsonb,
        '["ODOP District-Product Mapping with benefit values for all 75 UP districts", "UP Electronics Cluster Investment Guide with application procedures", "Haryana Sector-Specific Incentive Calculator for 8 priority sectors", "UP-Haryana Incubator Application Templates with success tips"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 6: Punjab, Rajasthan & Hill States
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Punjab, Rajasthan & Hill States',
        'Punjab Startup and Innovation Policy 2022 focuses on agritech, food processing, and manufacturing given the state''s agricultural strengths. Key incentives: Seed funding up to Rs 5 lakhs, Rs 10 lakh innovation grant for prototype development, 50% patent subsidy up to Rs 10 lakhs, 100% stamp duty exemption, SGST reimbursement for 5 years, and 15% capital subsidy for manufacturing. Punjab also offers Rs 1 lakh monthly co-working subsidy for startups in state-recognized incubators.

Punjab''s unique Agritech Focus: Given Punjab''s agricultural dominance (producing 15% of India''s wheat, 11% rice), agritech startups receive enhanced benefits: 35% capital subsidy for food processing units, cold chain infrastructure subsidy up to 50%, and direct access to FPO (Farmer Producer Organizations) network covering 5000+ farmers. Punjab Agri Export Corporation provides export facilitation for agri-startups.

Rajasthan Startup Policy 2022 (iStart Rajasthan) is one of India''s most comprehensive state policies. Benefits include: Sustenance allowance of Rs 20,000/month for 2 years, seed funding up to Rs 25 lakhs, marketing assistance up to Rs 10 lakhs, patent subsidy of Rs 10 lakh (domestic) and Rs 25 lakh (international), 100% stamp duty exemption, and 100% electricity duty exemption for 7 years. Unique "Uplift" program provides Rs 1.5 crore funding for high-potential startups.

Rajasthan''s Bhamashah Techno Hub in Jaipur is a world-class facility offering: 50,000 sq ft incubation space, prototyping labs, dedicated mentorship, and global exposure programs. The state''s focus on IT/ITeS, renewable energy, and tourism tech creates sector-specific opportunities. Rajasthan Solar Policy offers additional 30% capital subsidy for solar/cleantech startups.

Hill States Special Category Benefits: Uttarakhand, Himachal Pradesh, and J&K enjoy special category status providing enhanced central scheme benefits. Uttarakhand Startup Policy offers: Rs 25 lakh seed fund, 30% capital subsidy (vs 25% elsewhere), additional 5% interest subvention, and 100% GST refund for 5 years. The pharma corridor in Baddi (Himachal) and Haridwar (Uttarakhand) offers exceptional benefits for pharma startups.

J&K New Industrial Policy 2021 offers India''s highest incentives: Capital subsidy up to 50% (vs 25% in most states), working capital loan at 5% interest, 100% SGST reimbursement for 7 years, and dedicated industrial land at Rs 1/sq meter. For manufacturing startups, J&K potentially offers the highest financial returns, though operational challenges exist.',
        '["If in agritech/food processing, deep-dive into Punjab''s agriculture-focused incentives and FPO network access", "Evaluate Rajasthan iStart program - one of India''s most generous for early-stage startups with Rs 20K/month sustenance", "Consider hill state (Uttarakhand/HP/J&K) registration for manufacturing if you can manage remote operations", "Calculate comparative benefit value across Punjab, Rajasthan, and hill states for your specific sector"]'::jsonb,
        '["Punjab Agritech Opportunity Guide with FPO network access procedures", "iStart Rajasthan Complete Application Guide with eligibility checklist", "Hill States Manufacturing Incentive Comparison with operational feasibility assessment", "Northern States Incentive Calculator for multi-state benefit optimization"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Western States (Days 7-9)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Western States Ecosystem',
        'Master policies of Maharashtra, Gujarat, Goa, and Madhya Pradesh. Learn to leverage MIDC industrial parks, GIFT City IFSC benefits, and sector-specific incentives in India''s industrial powerhouse region.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 7: Maharashtra Ecosystem
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        7,
        'Maharashtra Startup Ecosystem',
        'Maharashtra ranks second in India''s startup ecosystem with over 13,000 DPIIT-recognized startups, primarily concentrated in Mumbai (financial services, media, consumer) and Pune (IT, automotive, manufacturing). The state''s comprehensive Maharashtra Startup Policy 2018 (updated 2023) backed by Maharashtra State Innovation Society (MSInS) offers substantial benefits.

Core Maharashtra Startup Benefits: Seed Fund up to Rs 15 lakhs via MSInS, 100% stamp duty reimbursement on first transaction, 100% electricity duty exemption for 5 years, SGST reimbursement (50% for Tier 1, 75% for Tier 2 cities) for 3 years, Rs 10 lakh subsidy for patent filing (50% of cost), and Rs 3 lakh for trademark registration. Monthly subsidy of Rs 10,000 for co-working space for 2 years.

Mumbai FinTech Hub (MFH): India''s dedicated fintech initiative offers sector-specific support: Sandbox access for testing innovative products, Rs 5 crore grant for exceptional fintech startups, direct RBI and SEBI liaison for regulatory clarity, partnership with banks for pilot programs, and global exposure through international fintech events. For fintech startups, Mumbai remains the undisputed hub due to proximity to financial institutions.

Pune IT/Manufacturing Excellence: Pune houses major IT companies, automotive manufacturers, and a robust engineering talent pool. MIDC (Maharashtra Industrial Development Corporation) offers industrial plots at subsidized rates: 20-30% below market price, ready-to-use built-up space, and dedicated industrial infrastructure. Hinjewadi IT Park is Asia''s largest IT park with plug-and-play facilities.

MIDC Industrial Areas: Maharashtra has 289 industrial areas across 36 districts. Key zones include: Taloja (chemicals, pharma), Chakan (automotive), Hinjewadi (IT), SEEPZ (gems, jewelry, electronics), and Navi Mumbai (logistics, warehousing). MIDC offers: Land at concessional rates (varies by zone), ready sheds from 1000 sq ft, common effluent treatment plants, and uninterrupted power supply.

Maharashtra''s Unique Programs: MahaStartup Hub provides single-window access to all state schemes. Mahila Udyam Nidhi offers additional 15% subsidy for women entrepreneurs. Smart Village Smart Ward program supports rural-focused startups with Rs 5 lakh additional grant. The state also operates Fintech Fund, Agritech Fund, and Healthcare Fund with Rs 100 crore corpus each for sector-specific support.',
        '["Register on Maharashtra Startup Hub portal for single-window access to all state schemes", "If in fintech, apply for Mumbai FinTech Hub membership for sandbox access and banking partnerships", "Evaluate MIDC industrial areas if planning manufacturing - compare Pune, Aurangabad, and Nagpur zones", "Calculate total Maharashtra benefit value including seed fund, stamp duty, electricity duty, and sector-specific grants"]'::jsonb,
        '["Maharashtra Startup Hub Registration Guide with documentation checklist", "Mumbai FinTech Hub Application Kit with sandbox access procedures", "MIDC Industrial Area Comparison across 10 major zones with land rates", "Maharashtra Sector-Specific Fund Directory with application procedures"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 8: Gujarat Industrial Powerhouse
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        8,
        'Gujarat Industrial Powerhouse & GIFT City',
        'Gujarat consistently ranks #1 in India''s Ease of Doing Business index with a pro-industry administration and exceptional infrastructure. The Gujarat Industrial Policy 2020, combined with Startup Gujarat initiative, creates India''s most compelling manufacturing ecosystem. Gujarat houses 8,000+ startups with strengths in chemicals, pharmaceuticals, textiles, and increasingly fintech through GIFT City.

Gujarat Industrial Policy 2020 Core Benefits: Capital subsidy of 25% on fixed assets up to Rs 5 crore for MSME, 7% interest subsidy on term loans for 5 years, 100% electricity duty exemption for 5 years, net SGST refund for 10 years, 50% stamp duty exemption, and land in GIDC estates at subsidized rates. For large projects (Rs 50 crore+), customized packages are negotiated case-by-case.

Startup Gujarat Benefits: Seed support up to Rs 30 lakhs, sustenance allowance of Rs 20,000/month for 2 years, Rs 10 lakh patent subsidy, Rs 2 lakh trademark subsidy, 100% stamp duty exemption, and dedicated mentorship through iCreate and other incubators. Gujarat Student Startup Fund provides Rs 2 lakh for student entrepreneurs.

GIFT City IFSC (International Financial Services Centre) offers India''s only international finance hub with exceptional benefits: 100% income tax exemption for 10 years out of first 15, zero GST on IFSC services, zero stamp duty, free foreign currency transactions, and IFSCA regulatory framework. For fintech, financial services, and global-facing startups, GIFT City benefits exceed any other Indian location.

Specific GIFT City Advantages for Startups: IFSC fintech license enabling global operations, aircraft leasing benefits (zero GST, no customs duty), offshore banking unit license, international arbitration center, and global talent hiring without work permits. The GIFT SEZ offers world-class infrastructure with international standards.

Gujarat Sector-Specific Clusters: Sanand Cluster (automotive - Tata, Ford, Honda suppliers), Dahej PCPIR (petroleum, chemicals - largest in Asia), Mundra SEZ (logistics, exports), and Morbi Ceramic Cluster (world''s second-largest ceramic hub). Each cluster offers additional sector-specific incentives above base policy. Gujarat Vibrant Summit (biennial investment event) provides direct government access and often results in customized incentive packages for promising startups.',
        '["If manufacturing-focused, evaluate Gujarat vs Maharashtra vs Tamil Nadu using the Manufacturing Location Scorecard", "For fintech/financial services, deep-dive into GIFT City IFSC benefits and registration process", "Identify relevant GIDC industrial estates for your sector - compare land costs and infrastructure", "Register for Vibrant Gujarat Summit updates for investment opportunities and government access"]'::jsonb,
        '["Gujarat Industrial Policy 2020 Complete Guide with sector-specific benefit values", "GIFT City IFSC Registration Roadmap with timeline and documentation requirements", "GIDC Industrial Estate Comparison across 20 major locations with rental costs", "Gujarat Vibrant Summit Opportunity Guide with past investment commitments by sector"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 9: Goa & Madhya Pradesh
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        9,
        'Goa IT Hub & Madhya Pradesh Opportunities',
        'Goa IT Policy 2018 and Goa Startup Policy 2017 create a unique proposition combining lifestyle benefits with solid incentives. While Goa''s startup ecosystem is smaller (500+ startups), it offers exceptional quality of life and is increasingly attracting remote-first and creative startups.

Goa Startup Policy Benefits: Seed funding up to Rs 10 lakhs, 100% stamp duty exemption, Rs 5 lakh patent subsidy, 50% rent reimbursement for office space up to Rs 20,000/month, marketing assistance up to Rs 3 lakhs, and dedicated startup desk for clearances. Goa IT Policy adds: 100% electricity duty exemption for 5 years, VAT/GST reimbursement for 5 years, and 30% capital subsidy for IT hardware.

Goa''s Unique Advantages: Quality of life attracts top talent willing to relocate, international airport with direct global flights, tourism infrastructure supports business events, English-first environment ideal for global startups, and IT Park in Dona Paula offers plug-and-play infrastructure. Many founders use Goa as a "thinking retreat" location for product development while maintaining sales presence elsewhere.

Madhya Pradesh Startup Policy 2022 has emerged with aggressive incentives to attract startups to the state. Key benefits: Seed funding up to Rs 15 lakhs, sustenance allowance of Rs 15,000/month for 2 years, 100% stamp duty exemption, 100% electricity duty exemption for 7 years, Rs 15 lakh patent subsidy, and mentor assistance of Rs 1 lakh. MP also offers unique "Idea to IPO" program supporting startups through entire journey.

MP Manufacturing Incentives: Capital subsidy of 25% up to Rs 2.5 crore, interest subsidy of 5% for 7 years, 50% land cost subsidy in industrial areas, and 100% SGST reimbursement for 7 years. MP''s pharmaceutical cluster in Indore and food processing cluster in Bhopal offer additional sector-specific benefits. Pithampur industrial area near Indore has emerged as a significant manufacturing hub with lower land costs than Gujarat or Maharashtra.

MP Emerging Focus Areas: MP is actively promoting: Agritech (state is major soybean and wheat producer), Tourism tech (heritage sites), Healthcare tech (Bhopal has major medical institutions), and Renewable energy (large solar parks). The state offers additional 10% incentive for startups in these priority sectors.',
        '["Evaluate Goa for lifestyle-focused founders or remote-first startups - calculate total benefit value vs quality of life benefits", "If considering Tier 2 manufacturing, compare MP Pithampur with Gujarat Sanand and Maharashtra Chakan", "For agritech startups, explore MP''s agricultural focus areas and FPO network", "Research Madhya Pradesh incubators: STPI Bhopal, MPIDC incubators, and IIM Indore startup cell"]'::jsonb,
        '["Goa Startup Relocation Guide with cost of living comparison vs metros", "MP Manufacturing Cluster Analysis comparing Pithampur, Mandideep, and Bhopal industrial areas", "Goa-MP Incentive Comparison Calculator for sector-specific decisions", "Western States Complete Benefit Matrix covering all 4 states"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Southern States (Days 10-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Southern States Ecosystem',
        'Master India''s most developed startup ecosystems - Karnataka (Bangalore), Tamil Nadu (Chennai), Telangana (Hyderabad), Kerala (Kochi), and Andhra Pradesh (Vizag). Learn to access T-Hub, Kerala Startup Mission, and sector-specific incentives.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 10: Karnataka - India's Startup Capital
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        10,
        'Karnataka - India''s Startup Capital',
        'Karnataka leads India with 14,000+ DPIIT-recognized startups, 45+ unicorns, and has attracted over 40% of total Indian startup funding. Bangalore is undisputedly India''s Silicon Valley with the highest concentration of tech talent, VCs, and startup infrastructure. Karnataka Startup Policy 2022-27 with Rs 400 crore corpus is among India''s most comprehensive state policies.

Karnataka Startup Policy 2022-27 Core Benefits: Seed funding up to Rs 50 lakhs (Rs 30 lakh for product startups, Rs 20 lakh for service startups), Elevate 100 program providing Rs 50 lakhs to top 100 startups annually selected through competitive process, 100% stamp duty exemption on first Rs 30 crore investment, 100% reimbursement on patent filing costs up to Rs 10 lakh (domestic) and Rs 20 lakh (international), marketing support of Rs 2 lakhs for exhibitions and events.

Elevate 100 Program Deep Dive: This flagship program selects 100 startups annually through rigorous evaluation. Benefits include: Rs 50 lakh grant (Rs 40 lakh for incubation, Rs 10 lakh for marketing), priority access to government procurement, dedicated mentorship from industry leaders, international exposure through trade missions, and fast-track access to Karnataka Industrial Policy benefits for manufacturing scale-up. Application typically opens in January with results by March.

KITS (Karnataka Information Technology Startup) Hub provides: 5-year incubation with subsidized space, access to NASSCOM and TiE networks, mentorship from 500+ successful founders, and direct VC introduction program. KITS operates nodal incubators in Bangalore, Mysore, Hubli, and Mangalore ensuring state-wide coverage.

Beyond Bangalore - Tier 2 Opportunities: Mysore Software Technology Park offers 50% lower operating costs than Bangalore with excellent quality of life. Hubli-Dharwad emerging as North Karnataka IT hub with dedicated incentives. Mangalore''s proximity to port makes it attractive for export-oriented startups. State offers additional 15% incentive for startups setting up primary operations outside Bangalore.

Karnataka Sector-Specific Programs: BioTech Policy (Rs 100 crore corpus, 50% capital subsidy for biotech), Animation Visual Effects Gaming Comic (AVGC) Policy (25% production expenditure subsidy), Electric Vehicle Policy (capital subsidy up to Rs 2 crore for manufacturing), Aerospace and Defense Policy (30% capital subsidy up to Rs 5 crore). Each sector has dedicated nodal officers and streamlined processes.',
        '["If not already in Karnataka, evaluate relocation economics - calculate incremental benefit vs ecosystem access value", "Apply for Elevate 100 program if applications are open - this is Karnataka''s flagship with Rs 50 lakh grant", "Register with KITS Hub for incubation and mentorship access - even remote access to mentorship programs is valuable", "Explore Tier 2 Karnataka (Mysore, Hubli) for cost optimization while maintaining Bangalore network access"]'::jsonb,
        '["Karnataka Startup Policy 2022-27 Complete Application Guide with all scheme details", "Elevate 100 Application Preparation Kit with evaluation criteria and past winner analysis", "KITS Hub Registration Guide and Mentorship Program Access", "Karnataka Tier 2 City Comparison for cost-optimized operations"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 11: Telangana & Tamil Nadu
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        11,
        'Telangana T-Hub & Tamil Nadu Manufacturing',
        'Telangana has emerged as India''s second-most attractive startup destination after Karnataka, with Hyderabad housing 7,000+ startups. T-Hub, India''s largest innovation campus, anchors the ecosystem. Tamil Nadu offers unmatched manufacturing infrastructure through TIDCO, SIPCOT, and dedicated auto, electronics, and pharma clusters.

Telangana Startup Policy Benefits: Seed funding up to Rs 10 lakhs, 100% reimbursement on patent/design/trademark filing costs without upper limit, 100% stamp duty exemption, 50% rebate on registration charges, monthly stipend of Rs 10,000 for women founders for 6 months through WE-Hub, and 25% subsidy on marketing and branding expenses up to Rs 2 lakhs.

T-Hub Excellence: T-Hub 2.0 spans 350,000 sq ft - world''s largest innovation campus. Benefits include: Subsidized co-working at Rs 5,000-8,000/seat vs Rs 15,000+ market rate, access to 80+ corporate innovation partners (Microsoft, Google, Nvidia, etc.), international soft-landing programs in US, UK, Singapore, 500+ mentor network, and prototype development support. T-Hub has graduated 1000+ startups with Rs 5,000 crore+ funding raised.

WE-Hub for Women Founders: India''s first and only state-led incubator for women entrepreneurs. Benefits: Rs 10 lakh seed fund, Rs 10,000/month stipend, dedicated mentorship, access to Rs 200 crore fund of funds for women-led startups, and international exposure programs. WE-Hub has supported 500+ women-founded startups.

Tamil Nadu StartupTN Policy: Seed Grant up to Rs 10 lakhs, 30% capital subsidy for manufacturing up to Rs 30 lakhs, 100% stamp duty exemption, marketing support up to Rs 5 lakhs, and access to TIDEL park co-working at subsidized rates. TIDCO Venture Fund provides equity funding up to Rs 5 crore for exceptional startups.

Tamil Nadu Manufacturing Excellence: SIPCOT industrial parks offer: Land at Rs 50-200 per sq ft (vs Rs 500+ in Bangalore/Mumbai), ready-built industrial sheds, dedicated power infrastructure, and single-window clearances. Chennai auto cluster (Ford, Hyundai, Renault), electronics cluster (Foxconn, Samsung, Dell), and pharma cluster (major API manufacturers) provide excellent supply chain access. Tamil Nadu''s skilled labor pool (3 lakh engineering graduates annually) ensures talent availability.',
        '["Apply for T-Hub membership for access to India''s largest innovation campus and corporate partner network", "If women-founded startup, apply to WE-Hub for dedicated support and Rs 10 lakh seed fund", "For manufacturing startups, compare Tamil Nadu SIPCOT with Karnataka and Gujarat industrial parks", "Evaluate Hyderabad vs Chennai for operations based on sector fit and talent requirements"]'::jsonb,
        '["T-Hub Membership Application Guide with program selection criteria", "WE-Hub Complete Application Kit for women entrepreneurs", "Tamil Nadu SIPCOT Industrial Park Comparison across 10 major locations", "Telangana-Tamil Nadu Incentive Calculator for sector-specific analysis"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 12: Kerala & Andhra Pradesh
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        12,
        'Kerala Startup Mission & Andhra Pradesh Incentives',
        'Kerala Startup Mission (KSUM) is recognized as one of India''s most innovative state startup initiatives, known for ecosystem building beyond just financial incentives. Andhra Pradesh offers India''s most aggressive investment incentives, particularly for manufacturing, with the Vizag-Chennai industrial corridor emerging as a major manufacturing hub.

Kerala Startup Mission (KSUM) Benefits: Product Development Grant up to Rs 25 lakhs for building MVPs, equity funding up to Rs 1 crore through KSUM Fund, interest-free loan up to Rs 20 lakhs for 3 years, 100% stamp duty exemption, Rs 12 lakh subsidy for setting up startups, and Idea Grant of Rs 2 lakhs for pre-incorporation concept validation - unique in India.

KSUM Ecosystem Programs: Kerala has pioneered several innovative programs: Innovation Lab Network (50+ school-level labs), College-level Startup Bootcamps (300+ colleges), Technology Innovation Zone in Kochi (100+ startups), International soft-landing in US, UK, Singapore, and dedicated sector verticals for HealthTech, AgriTech, and TourismTech.

Kochi Startup Village and Maker Village provide: Fabrication facilities for hardware prototyping, electronic design automation tools, 3D printing and CNC machines, and embedded systems lab. For hardware startups, Maker Village offers unmatched prototyping support at heavily subsidized rates.

Andhra Pradesh Industrial Policy 2020-23: Among India''s most aggressive incentive packages: 40% capital subsidy for mega projects (vs 25% in most states), 50% for electronics manufacturing, 9% interest subvention for 9 years, 100% stamp duty reimbursement, 200% electricity duty exemption for 5 years, and net SGST reimbursement for 7 years. AP actively competes with Tamil Nadu for manufacturing investment.

Vizag-Chennai Industrial Corridor (VCIC): World Bank-supported corridor spanning 800 km offers dedicated manufacturing zones. Benefits include: Land at Rs 30-50 per sq ft (among India''s lowest), ready industrial infrastructure, port connectivity (Vizag, Chennai, Krishnapatnam), and special incentives for electronics, food processing, and textiles. AP is positioning Vizag as "India''s Tech Coast" with GITAM University providing talent pipeline.

AP YSR Innovation Hub: Government-backed incubator offering: Rs 15 lakh seed fund, 12-month acceleration program, industry mentorship, and automatic eligibility for AP industrial incentives. Focus sectors: AI/ML, Healthcare, Agritech, and Sustainable technologies.',
        '["Explore Kerala''s Idea Grant (Rs 2 lakh) for concept validation - unique pre-incorporation support", "For hardware startups, evaluate Maker Village Kerala for prototyping support and facilities", "Compare AP industrial incentives with Tamil Nadu for manufacturing location decision", "If eyeing coastal manufacturing, research Vizag-Chennai corridor for land and logistics advantages"]'::jsonb,
        '["Kerala Startup Mission Complete Program Guide with all scheme application procedures", "Maker Village Kochi Facilities Guide with prototyping services pricing", "Andhra Pradesh Industrial Incentive Calculator with VCIC-specific benefits", "Southern States Manufacturing Comparison Matrix covering all 5 states"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Eastern States (Days 13-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Eastern States Ecosystem',
        'Navigate startup opportunities in West Bengal, Odisha, Bihar, Jharkhand, and Chhattisgarh. Access emerging ecosystem benefits, lower competition for incentives, and unique sector-specific opportunities in India''s eastern frontier.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 13: West Bengal & Kolkata
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        13,
        'West Bengal & Kolkata Ecosystem',
        'West Bengal Startup Policy 2020 marks a significant shift in the state''s approach to entrepreneurship. With Kolkata''s rich intellectual heritage, strong educational institutions (IIT-KGP, ISI, IIM-C), and lower operating costs than other metros, the state offers emerging opportunities for startups. The ecosystem has 2,000+ startups with growing momentum.

West Bengal Startup Policy Benefits: Seed funding up to Rs 10 lakhs, 100% stamp duty exemption, 100% electricity duty exemption for 3 years, 5% interest subsidy on loans up to Rs 1 crore, Rs 5 lakh patent subsidy, and monthly sustenance allowance of Rs 15,000 for 1 year. Additional 25% subsidy for women and SC/ST founders.

Bengal Silicon Valley Hub (BSVH): Dedicated IT township spanning 200 acres offers: Plug-and-play IT infrastructure, subsidized space at Rs 8-12 per sq ft (vs Rs 40+ in Bangalore), uninterrupted power, and direct connectivity to airport. BSVH targets to house 50,000 IT professionals and provides startups with ready-to-use office space.

Kolkata Ecosystem Strengths: Lower talent costs (Rs 8-10 lakh for engineers vs Rs 15-20 lakh in Bangalore), large English-speaking educated workforce, Eastern India market gateway (Bihar, Jharkhand, Odisha, NE states), strong traditional industry networks (jute, tea, steel), and excellent connectivity (major port, international airport).

West Bengal''s Sector Focus: The state offers enhanced benefits for: IT/ITeS (additional 10% capital subsidy), Food Processing (30% capital subsidy, links to state agricultural output), Leather (dedicated cluster with 35% subsidy), Textiles (handloom and technical textiles focus), and Handicrafts/Artisan products (100% subsidy on certification costs).

NASSCOM 10,000 Startups Kolkata Chapter: Active community providing: Mentorship from 100+ mentors, networking events, investor connects, and access to NASSCOM ecosystem nationally. Startup Kolkata Foundation and Kolkata Ventures are emerging private ecosystem players providing incubation and early-stage funding.

Emerging Opportunities: With lower competition for government schemes (vs Karnataka/Maharashtra), West Bengal offers higher probability of scheme approval. Eastern India market (200 million population) is underserved by startups, creating less competitive market opportunity.',
        '["Evaluate Kolkata as a cost-effective base if your market includes Eastern India (Bihar, Jharkhand, Odisha, NE)", "Research Bengal Silicon Valley Hub for IT/tech startup operations - significant cost advantage", "Connect with Startup Kolkata Foundation and IIT-KGP STEP incubator for ecosystem access", "Calculate cost arbitrage: compare total operating costs (talent + real estate + utilities) with Bangalore/Mumbai"]'::jsonb,
        '["West Bengal Startup Policy Complete Application Guide with eligibility criteria", "Bengal Silicon Valley Hub Facilities Guide with space options and pricing", "Kolkata Ecosystem Map with incubators, investors, and community organizations", "Eastern India Market Opportunity Analysis for underserved sectors"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: Odisha & Bihar
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        14,
        'Odisha & Bihar Emerging Ecosystems',
        'Odisha and Bihar represent India''s emerging startup frontier with aggressive new policies aimed at attracting entrepreneurs. Both states offer generous incentives with lower competition compared to established ecosystems. Odisha''s Startup Policy 2024 and Bihar''s Startup Policy 2022 provide substantial benefits for early movers.

Odisha Startup Policy 2024 Benefits: Seed funding up to Rs 15 lakhs through Odisha Startup Fund, sustenance allowance of Rs 15,000/month for 2 years, 100% stamp duty exemption, Rs 10 lakh patent subsidy, 100% electricity duty exemption for 5 years, and marketing support up to Rs 5 lakhs. Additional 25% incentive for women/SC/ST founders. Unique "Startup Yatra" program takes successful entrepreneurs to colleges statewide for inspiration.

O-Hub (Odisha Startup Hub): State-backed incubator in Bhubaneswar providing: 20,000 sq ft co-working space, prototyping facilities, mentorship from 100+ advisors, and access to state government procurement opportunities. O-Hub has graduated 150+ startups since launch.

Odisha Sector Opportunities: Large coastline and ports (Paradip, Dhamra) favor logistics/export startups. Mining belt (iron ore, coal, bauxite) creates mining-tech opportunities. Large agricultural base supports agritech. Handicraft heritage (Pattachitra, Sambalpuri) offers artisan-tech opportunities.

Bihar Startup Policy 2022 Benefits: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 15,000/month for 2 years, 100% stamp duty exemption, Rs 10 lakh patent subsidy, 5% interest subsidy for 5 years, and Rs 5 lakh marketing support. Bihar offers land in Software Technology Parks at Rs 5,000 per sq meter - among India''s lowest.

Bihar''s Unique Proposition: Population of 128 million creates massive domestic market, lowest real estate costs among major states, educational institutions (IIT Patna, NIT Patna, BITS Patna campus) providing talent, and agricultural strength (fruits, vegetables, fisheries) supporting agritech. Bihar is India''s largest producer of vegetables and third-largest fish producer.

Patna IT Hub Development: Bihar IT Policy offers: 100% electricity duty exemption for 10 years, 50% capital subsidy for IT units, dedicated BPO promotion scheme with Rs 1 lakh per seat subsidy, and specialized incentives for data centers. Software Technology Park Patna offers plug-and-play infrastructure.',
        '["Evaluate Odisha/Bihar if targeting large markets with minimal startup competition", "For agritech startups, compare Odisha/Bihar agricultural ecosystems with Punjab/Maharashtra", "Research O-Hub (Odisha) and Bihar Innovation Hub for incubation opportunities", "Calculate the total incentive arbitrage: Odisha/Bihar typically approve higher percentage of applications due to lower competition"]'::jsonb,
        '["Odisha Startup Policy 2024 Complete Guide with O-Hub application process", "Bihar Startup Policy 2022 Application Kit with eligibility criteria", "Eastern India Agritech Opportunity Map covering Bihar, Odisha, and Jharkhand", "Odisha-Bihar Incentive Comparison Calculator"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Jharkhand & Chhattisgarh
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        15,
        'Jharkhand & Chhattisgarh Resource-Rich States',
        'Jharkhand and Chhattisgarh are India''s mineral-rich states with unique opportunities in mining-tech, industrial automation, and resource-based startups. Both states have launched startup policies offering generous incentives to build ecosystems from ground up, providing early-mover advantages for startups.

Jharkhand Startup Policy 2021 Benefits: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 10,000/month for 1 year, 100% stamp duty exemption, 100% electricity duty exemption for 5 years, Rs 5 lakh patent subsidy, and 5% interest subsidy for 5 years. Women-led startups receive additional 25% on all financial incentives.

Jharkhand''s Unique Opportunities: Houses 40% of India''s mineral reserves (iron ore, coal, copper, uranium). Mining-tech opportunities: drone-based surveying, safety systems, logistics optimization, environmental monitoring. Ranchi IT Hub emerging with BIT Mesra, IIT-ISM Dhanbad providing talent. Steel city Jamshedpur offers industrial automation opportunities with Tata Steel ecosystem.

Jharkhand Momentum Program: Unique initiative by government partnering with UNDP for startup ecosystem development. Benefits: Dedicated mentorship, international exposure, and connection with Tata Group innovation programs. Jharkhand also operates a Startup Udyami scheme providing Rs 25 lakh collateral-free loan at 4% interest.

Chhattisgarh Startup Policy 2021 Benefits: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 15,000/month for 2 years, 100% stamp duty exemption, 100% electricity duty exemption for 5 years, Rs 5 lakh patent subsidy, and interest subsidy of 5% for 5 years. State also offers land in industrial parks at Rs 50 per sq meter (among India''s lowest).

Chhattisgarh Mining & Forestry Tech Opportunities: India''s largest coal producer and major steel manufacturing hub. Mining-tech opportunities similar to Jharkhand. Additionally: Forest-tech (Chhattisgarh is 44% forested), tribal handicraft-tech (GI products), and rice-tech (major rice producer).

36 Inc Incubator Raipur: State-supported incubator providing: 15,000 sq ft co-working, prototyping lab, mentorship, and dedicated startup helpdesk. Unique focus on resource-based and rural-focused startups. Annual Chhattisgarh Startup Fest provides exposure and investment opportunities.

Common Eastern India Theme: All five eastern states (WB, Odisha, Bihar, Jharkhand, Chhattisgarh) face similar challenges: lower ecosystem maturity, limited VC presence, infrastructure gaps. However, they offer: Higher scheme approval rates, lower operating costs, underserved local markets, and first-mover advantages in emerging sectors.',
        '["For mining-tech, industrial automation, or resource-focused startups, seriously evaluate Jharkhand/Chhattisgarh", "Research Jharkhand Momentum program for UNDP partnership benefits and Tata ecosystem access", "Connect with 36 Inc Raipur for Chhattisgarh incubation and state government relationship building", "Calculate total operating cost advantage: Jharkhand/Chhattisgarh offer 60-70% lower costs than metros for many functions"]'::jsonb,
        '["Jharkhand Startup Policy 2021 Complete Guide with Momentum program details", "Chhattisgarh Startup Policy Application Kit with 36 Inc incubation process", "Mining-Tech Opportunity Analysis for Jharkhand-Chhattisgarh mineral belt", "Eastern India Complete State Comparison covering all 5 states"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: North-Eastern States (Days 16-18)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'North-Eastern States Special Category',
        'Access enhanced incentives available to North-Eastern states including Assam, Meghalaya, Manipur, Tripura, Nagaland, Mizoram, Arunachal Pradesh, and Sikkim. Learn to leverage special category status and Act East Policy benefits.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 16: NE Region Special Status Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        16,
        'North-Eastern Special Category Benefits',
        'All eight North-Eastern states enjoy Special Category Status providing enhanced central scheme benefits. The North East Industrial Policy (NEIP) 2024 and Act East Policy create a unique incentive framework worth potentially 30-50% more than regular state benefits. For startups able to establish genuine NE presence, this creates significant arbitrage opportunities.

Central Government NE Incentives (NEIP 2024): Capital Investment Incentive of 30% vs 25% elsewhere (up to Rs 5 crore), 3% interest subsidy vs standard 2%, 100% income tax exemption for first 5 years + 25% for next 5 years, 100% excise duty/GST refund for 10 years, 100% transport subsidy to/from NE (critical for logistics), and additional 10% subsidy for women/SC/ST entrepreneurs.

Make in NE Initiative: Central government scheme promoting manufacturing with: 35% capital subsidy for manufacturing units, 100% GST reimbursement, dedicated freight subsidy to overcome distance penalty, and access to Border Area Development Programme funds. The goal is to make NE manufacturing cost-competitive with mainland despite geographical challenges.

NE Startup Hub (DPIIT Initiative): Centralized support for NE startups including: Priority processing for Startup India recognition, dedicated mentorship from successful NE entrepreneurs, connection with IIM Shillong and IIT Guwahati incubators, and international exposure through Act East trade missions to Southeast Asia.

Individual State Startup Policies (Common Benefits): All NE states offer: Seed funding Rs 5-15 lakhs, 100% stamp duty exemption, 100% electricity duty exemption, patent subsidies, and sustenance allowances. Most NE states have lower thresholds for scheme eligibility, making it easier for early-stage startups to qualify.

Strategic Location Advantage: NE shares borders with Bangladesh, Myanmar, Bhutan, Nepal, and China. Act East Policy promotes trade with Southeast Asia through: Moreh (Manipur)-Myanmar border trade, Agartala-Bangladesh connectivity, and planned India-Myanmar-Thailand highway. For startups targeting ASEAN export, NE provides proximity advantage.

Realistic Assessment: Despite generous incentives, NE faces challenges: Limited local market (46 million total population), infrastructure gaps (though improving rapidly), talent migration to metros, and higher logistics costs. Best suited for: Agritech (NE produces 50% of India''s organic produce), Tourism-tech, Handicraft-tech, and Tea/Bamboo/Silk sector startups.',
        '["Evaluate if your startup can establish genuine NE presence - incentives are substantial but require real operations", "Research specific sectors where NE has competitive advantage: organic agriculture, tourism, handicrafts", "Connect with NE Startup Hub and IIM Shillong incubator for ecosystem access", "Calculate total incentive value: Central NEIP benefits + State benefits + transport subsidy can be 30-50% higher than other regions"]'::jsonb,
        '["North East Industrial Policy 2024 Complete Guide with startup-specific benefits", "NE Special Category Benefits Calculator comparing with regular states", "NE Startup Hub Registration Guide with mentorship program access", "Sector Opportunity Map for all 8 NE states with competitive advantage analysis"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 17: Assam & Meghalaya
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        17,
        'Assam & Meghalaya Ecosystems',
        'Assam is NE''s largest economy and most developed startup ecosystem with Guwahati emerging as the region''s commercial hub. Meghalaya offers unique tourism-tech and organic agriculture opportunities with strong government support. Both states have active startup policies building upon central NE benefits.

Assam Startup Policy 2020 Benefits: Seed funding up to Rs 20 lakhs (highest in NE), sustenance allowance of Rs 15,000/month for 2 years, 100% stamp duty exemption, 100% electricity duty exemption for 5 years, Rs 10 lakh patent subsidy, and marketing support up to Rs 5 lakhs. Women founders receive additional 25% on all benefits.

Assam Ecosystem Infrastructure: IIT Guwahati Technology Incubation Centre is NE''s premier incubator with: Prototyping facilities, IP support, industry connections, and international partnerships. Guwahati Biotech Park offers specialized facilities for biotech/pharma startups. Assam Startup (assam.gov.in/startup) provides single-window access to all state schemes.

Assam Sector Opportunities: Tea industry (world''s largest contiguous tea-growing region) - tea-tech opportunities in processing, logistics, quality assessment. Oil & Gas (Digboi - Asia''s oldest refinery) - energy-tech opportunities. Tourism (Kaziranga, Majuli) - tourism-tech. Silk (Sualkuchi - Assam silk hub) - textile-tech. Bamboo (India''s largest bamboo resources) - sustainable materials.

Meghalaya Startup Policy 2021 Benefits: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 10,000/month for 1 year, 100% stamp duty exemption, 100% electricity duty exemption for 5 years, and Rs 5 lakh patent subsidy. Meghalaya also offers land in Shillong Technology Park at heavily subsidized rates.

Meghalaya Unique Opportunities: India''s organic capital - 80%+ farmers practice organic farming without external inputs. Meghalaya Basin Development Authority promotes food processing. Tourism-tech opportunities with UNESCO sites (living root bridges) and highest rainfall areas. Music industry (Shillong - India''s rock capital) offers entertainment-tech opportunities.

IIM Shillong Incubation Centre: Only IIM in NE providing: Business mentorship, access to IIM alumni network, national investor connections, and research collaboration opportunities. Active in promoting NE entrepreneurship nationally.',
        '["If in agritech (especially organic), tea-tech, or tourism-tech, seriously evaluate Assam/Meghalaya presence", "Apply to IIT Guwahati TIC or IIM Shillong Incubation Centre for premier NE ecosystem access", "Research tea industry partnerships if building agricultural logistics or processing solutions", "Connect with Meghalaya Basin Development Authority for food processing sector support"]'::jsonb,
        '["Assam Startup Policy 2020 Complete Application Guide with IIT-G incubation process", "Meghalaya Startup Policy Guide with Basin Development Authority connections", "Tea-Tech Opportunity Analysis with Assam Tea Board partnership possibilities", "NE Organic Agriculture Market Report with export opportunity assessment"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 18: Other NE States
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        18,
        'Other North-Eastern States',
        'Manipur, Tripura, Nagaland, Mizoram, Arunachal Pradesh, and Sikkim each offer unique opportunities despite smaller ecosystems. These states have the lowest startup competition in India, meaning higher success rates for scheme applications and first-mover advantages in emerging sectors.

Manipur Startup Policy 2021: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 10,000/month for 1 year, 100% stamp duty/electricity duty exemption. Unique opportunities: Handloom/handicrafts (world-renowned Manipuri textiles), sports-tech (India''s sports powerhouse - boxing, football), and border trade with Myanmar (Moreh crossing for ASEAN trade).

Tripura Startup Policy 2020: Seed funding up to Rs 8 lakhs, sustenance allowance of Rs 10,000/month, standard exemptions. Unique opportunities: Natural rubber (India''s second-largest producer), bamboo processing (Agartala-Akhaura rail link improves connectivity with Bangladesh), and IT services (strong education system with literacy rate 90%+).

Nagaland Startup Policy 2022: Seed funding up to Rs 10 lakhs, sustenance allowance of Rs 15,000/month for 2 years. Unique opportunities: Hornbill Festival (tourism-tech), organic farming (Naga King Chili - world''s hottest), handicrafts, and unique cultural IP (fashion, music, art).

Mizoram Startup Policy 2019: Seed funding up to Rs 10 lakhs, standard exemptions. Unique opportunities: Myanmar/Bangladesh border trade, bamboo industry (74% area forested), organic spices (Mizo ginger), and eco-tourism (cleanest state).

Arunachal Pradesh Startup Policy 2020: Seed funding up to Rs 15 lakhs (enhanced due to remote location), sustenance allowance of Rs 20,000/month (highest in NE). Unique opportunities: Adventure tourism (Tawang, Mechuka), organic kiwi and oranges, hydropower (huge potential), and unique tribal crafts.

Sikkim Startup Policy 2019: Seed funding up to Rs 10 lakhs, standard benefits. Unique opportunities: India''s only fully organic state (government mandate since 2016), tourism-tech (Himalayan trekking), and cardamom (world''s largest producer).

Common Strategy for Smaller NE States: These states have very few startups competing for incentives - application success rates are often 80%+ vs 20-30% in Karnataka/Maharashtra. For startups that can operate remotely with occasional physical presence, registering in smaller NE states captures maximum incentives. Many startups maintain NE registered office while operating from metros.',
        '["Evaluate smaller NE states if your startup can operate with minimal physical presence - scheme approval rates are dramatically higher", "For handicraft, organic food, or tourism startups, identify the best-fit NE state based on sector strengths", "Research border trade opportunities with Myanmar/Bangladesh if building export-focused business", "Calculate the total benefit differential: Central NEIP + State benefits + lower competition = potentially highest ROI among all Indian states"]'::jsonb,
        '["Complete NE State Comparison covering all 8 states with sector-wise strengths", "NE Border Trade Opportunity Guide covering Myanmar, Bangladesh, and ASEAN access", "NE Handicraft and Organic Certification Guide with GI tag opportunities", "Remote Operation Model for NE Registration with compliance requirements"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Union Territories (Days 19-21)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Union Territories & Special Zones',
        'Navigate unique opportunities in India''s 8 Union Territories including Chandigarh, Puducherry, Andaman & Nicobar, and Lakshadweep. Learn to leverage SEZ benefits and special economic zone advantages.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 19: Chandigarh & Punjab IT Hub
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        19,
        'Chandigarh IT Hub & UT Opportunities',
        'Chandigarh is India''s first Smart City and houses significant IT infrastructure serving Punjab, Haryana, and Himachal Pradesh. As a Union Territory directly administered by central government, Chandigarh offers unique positioning combining central administration efficiency with proximity to northern markets. The tricity (Chandigarh-Mohali-Panchkula) forms a significant IT hub.

Chandigarh Startup Policy 2020: Seed funding up to Rs 5 lakhs, 100% stamp duty exemption, 100% electricity duty exemption for 3 years, Rs 3 lakh patent subsidy, and co-working subsidy of Rs 5,000/month for 2 years. Chandigarh also offers priority in government procurement for local startups.

Chandigarh IT Ecosystem: IT Park Chandigarh (Sector 13) offers plug-and-play infrastructure at Rs 15-20 per sq ft (vs Rs 40+ in metros). Strong talent pipeline from PEC, Punjab University, Panjab Engineering College, and numerous engineering colleges in tricity. Cost of living 30-40% lower than Delhi while maintaining quality infrastructure.

Mohali (Punjab) IT City: Adjacent to Chandigarh, Mohali houses IT City and Knowledge City developments with: Subsidized space at Rs 8-12 per sq ft, 100% electricity duty exemption, and dedicated startup incubator. Many startups maintain Mohali operations to capture Punjab state benefits while accessing Chandigarh ecosystem.

Puducherry Startup Policy 2019: Seed funding up to Rs 8 lakhs, 100% stamp duty exemption, 100% electricity duty exemption, Rs 5 lakh patent subsidy. Unique benefits: Lower bureaucracy than large states, French Quarter lifestyle appeal, and proximity to Chennai talent pool. IT Park Puducherry offers subsidized space.

Delhi UT Note: Delhi is technically a UT with special status (NCT - National Capital Territory). Delhi startup benefits covered in Module 2. Key point: Delhi''s UT status provides more streamlined administration compared to full states.

Andaman & Nicobar and Lakshadweep: These island UTs have minimal startup ecosystem but offer: Extreme incentives for establishing presence (up to 50% capital subsidy), tourism-tech opportunities, marine/fisheries-tech potential, and unique location for specific use cases (satellite connectivity, oceanic research). For niche startups, these UTs offer unmatched incentives.

Strategic UT Positioning: UTs generally offer: Streamlined administration (no state legislature complexity), direct central government linkage, faster approvals, and lower bureaucratic layers. For startups seeking efficiency over incentive maximization, UT registration can accelerate operations.',
        '["Evaluate Chandigarh/Mohali tricity for cost-effective North India operations with quality infrastructure", "Compare Chandigarh IT Park with Mohali IT City for optimal cost and benefit balance", "Research Puducherry for lifestyle-focused founders seeking Chennai proximity with lower complexity", "For marine/tourism-tech, explore Andaman & Nicobar extreme incentives (50% capital subsidy)"]'::jsonb,
        '["Chandigarh Startup Policy Complete Guide with IT Park application process", "Mohali IT City Investment Guide with Punjab state benefit integration", "Puducherry Startup Ecosystem Overview with IT Park details", "Union Territory Comparison Matrix across all 8 UTs"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 20: Special Economic Zones Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        20,
        'Special Economic Zones (SEZ) Benefits',
        'India has 270+ operational SEZs across states offering export-focused incentives that can significantly exceed standard state benefits. For startups with export potential (software services, hardware exports, manufacturing for global markets), SEZ registration provides tax-free operations for extended periods.

Core SEZ Benefits (Central Government): 100% income tax exemption for first 5 years, 50% exemption for next 5 years, 50% of ploughed-back export profit exempt for next 5 years, exemption from customs/excise duty on imports for production, exemption from GST on procurement of goods/services, and single-window clearance for all approvals.

SEZ for IT/ITeS Startups: Software Technology Parks (STPI) and IT SEZs offer: Zero customs duty on hardware imports, 100% income tax exemption on export profits for specified period, and dedicated infrastructure (power backup, connectivity, security). Major IT SEZs: Bangalore (Electronics City, Whitefield), Hyderabad (HITEC City), Chennai (Sholinganallur), Pune (Hinjewadi), and NCR (Noida, Gurugram).

Manufacturing SEZ Opportunities: Multi-product SEZs for diverse manufacturing, sector-specific SEZs (electronics, pharma, textiles), and Free Trade Warehousing Zones (FTWZ) for logistics. Notable manufacturing SEZs: SEEPZ Mumbai (gems, jewelry, electronics), Sri City Andhra Pradesh (multi-product), Mundra Gujarat (port-based), and Mahindra World City Chennai (multi-product).

GIFT City IFSC Special Case: GIFT City is India''s only International Financial Services Centre operating as SEZ with global benchmarks. Benefits exceed regular SEZs: 100% tax exemption for 10 years (vs 5 years), zero GST on all IFSC services, zero stamp duty, free currency convertibility, and international arbitration. Ideal for: Fintech, global trading, aircraft leasing, offshore banking, and international insurance.

SEZ Compliance Requirements: Minimum 51% export obligation (NFE - Net Foreign Exchange positive), regular compliance reporting, physical presence in SEZ premises, and specific documentation for duty-free imports. Developer/Co-developer model allows smaller startups to operate within larger SEZ setups.

SEZ vs State Startup Policy: For export-oriented startups, SEZ benefits often exceed state startup schemes. However, SEZ comes with export obligations and compliance requirements. Optimal strategy: Evaluate whether your export potential justifies SEZ compliance burden. Many startups maintain SEZ unit for export operations and separate unit for domestic sales.',
        '["Assess your export potential - if >50% revenue can be from exports, SEZ likely offers better benefits than state schemes", "Identify relevant SEZs for your sector and location using the SEZ Directory", "Compare GIFT City benefits if in fintech/financial services - potentially India''s best incentive package", "Calculate SEZ compliance cost vs benefit - factor in compliance team, audit requirements, and export obligations"]'::jsonb,
        '["India SEZ Complete Directory with 270+ operational SEZs by sector and location", "SEZ vs State Startup Policy Comparison Calculator", "GIFT City IFSC Complete Registration Guide with compliance requirements", "SEZ Compliance Checklist with monthly/quarterly/annual requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 21: Industrial Parks & Clusters
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        21,
        'Industrial Parks & Sector Clusters',
        'Beyond state startup policies and SEZs, India''s industrial parks and sector clusters offer specialized infrastructure and incentives. State Industrial Development Corporations (GIDC, MIDC, SIPCOT, KIADB) manage thousands of industrial estates with built-up infrastructure ideal for manufacturing startups.

State Industrial Development Corporations: GIDC (Gujarat) - 200+ estates with land at Rs 100-500/sq ft, MIDC (Maharashtra) - 289 industrial areas with ready sheds from Rs 5,000/month, SIPCOT (Tamil Nadu) - Modern infrastructure in Chennai/Coimbatore belts, KIADB (Karnataka) - Industrial plots near Bangalore from Rs 200/sq ft, and APIIC (Andhra Pradesh) - VCIC corridor with among India''s lowest land rates.

Industrial Park Advantages Over Open Market: Ready infrastructure (roads, power, water, effluent treatment), faster clearances (single-window within park), proximity to suppliers and customers in cluster, shared facilities reducing capital requirement, and often subsidized land/rental rates.

Sector-Specific Clusters for Startups: Auto Cluster (Pune, Chennai, Sanand) - Auto-tech startups benefit from OEM proximity; Pharma Cluster (Hyderabad, Ahmedabad, Baddi) - Pharma-tech with regulatory expertise; Electronics Cluster (Noida, Chennai, Bangalore) - Hardware startups near manufacturing partners; Textile Cluster (Surat, Tirupur, Ludhiana) - Textile-tech opportunities; Food Processing Cluster (Rae Bareli, Tumkur, Fazilka) - Food-tech with processing infrastructure.

Mega Industrial Parks: Dholera (Gujarat) - India''s first greenfield smart city industrial park with 920 sq km area; Delhi-Mumbai Industrial Corridor (DMIC) - 8 industrial cities under development; Chennai-Bangalore Industrial Corridor - Manufacturing hub development; and Amritsar-Kolkata Industrial Corridor - Northern belt connectivity.

Startup-Friendly Industrial Parks: Many parks now include startup incubation facilities. Examples: SIPCOT Startup Hub in Irungattukottai, MIDC Innovation Hub in Airoli, GIDC Innovation Centre in Ahmedabad. These combine manufacturing infrastructure with startup support services.

Location Strategy Integration: Combine industrial park infrastructure benefits with state startup policy financial benefits. Example: A hardware startup could operate from SIPCOT park (infrastructure) while claiming Tamil Nadu StartupTN benefits (seed funding, subsidy) and STPI export benefits (tax exemption). This layered approach maximizes total benefit capture.',
        '["Identify relevant industrial parks for your manufacturing/hardware needs using the State IDC Directory", "Compare land/rental costs across GIDC, MIDC, SIPCOT, KIADB for your sector", "Evaluate cluster benefits - being near OEMs/suppliers often matters more than incentive value", "Design a layered benefit strategy combining industrial park + state startup policy + SEZ/STPI where applicable"]'::jsonb,
        '["State Industrial Development Corporation Directory with contact details and land rates", "India Industrial Cluster Map showing sector concentrations by geography", "Industrial Park vs Open Market Cost Comparison Calculator", "Layered Benefit Strategy Template for maximum incentive capture"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: MSME & Sector Benefits (Days 22-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'MSME & Sector-Specific Benefits',
        'Master MSME registration and benefits available across all states. Learn to layer MSME benefits with state startup policies for maximum incentive capture. Access sector-specific schemes for IT, manufacturing, agritech, and other priority sectors.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 22: MSME Benefits Across States
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        22,
        'MSME Registration & Benefits',
        'Udyam Registration (MSME) is perhaps the most important registration for Indian startups after DPIIT recognition. MSME status unlocks benefits worth Rs 10-50 lakhs across central and state schemes. The registration is free, online, and takes less than 30 minutes. Every startup should have Udyam Registration.

MSME Classification (Revised 2020): Micro Enterprise - Investment up to Rs 1 crore AND turnover up to Rs 5 crore; Small Enterprise - Investment up to Rs 10 crore AND turnover up to Rs 50 crore; Medium Enterprise - Investment up to Rs 50 crore AND turnover up to Rs 250 crore. Most startups qualify as Micro or Small.

Central Government MSME Benefits: Credit Guarantee Fund Trust (CGTMSE) - Collateral-free loans up to Rs 2 crore; Prime Minister''s Employment Generation Programme (PMEGP) - 35% subsidy for manufacturing, 25% for services up to Rs 25 lakhs; Interest Subvention - 2% interest subsidy on loans up to Rs 1 crore; Technology Upgradation Fund - 15% capital subsidy for technology adoption; and Marketing Support - Exhibition participation, vendor development programs.

State-Level MSME Benefits: Every state adds benefits on top of central MSME schemes. Common state benefits: Additional 5-10% capital subsidy, enhanced interest subvention (total 7-9% including central), priority in state government procurement (20% reserved for MSMEs), electricity duty exemption, and quality certification reimbursement.

MSME + Startup India Combination: Having both DPIIT Startup Recognition and Udyam MSME Registration unlocks maximum benefits. Example calculation for Karnataka: DPIIT benefits (Rs 50 lakh seed fund, tax exemption) + MSME benefits (collateral-free loans, 15% subsidy) + Karnataka policy benefits (stamp duty exemption, SGST refund) = Total potential benefit Rs 80+ lakhs.

Public Procurement Advantage: Government e-Marketplace (GeM) reserves 25% procurement for MSMEs, with additional 3% for women-owned MSMEs. State governments have similar reservations. For B2G (Business to Government) startups, MSME registration is essential for accessing this Rs 3+ lakh crore annual procurement market.

State MSME Facilitation: Each state has dedicated MSME Facilitation Centre. Services include: Scheme information, application assistance, grievance redressal, and buyer-seller meets. District Industries Centres (DIC) provide ground-level support for MSME registration and scheme access.',
        '["Complete Udyam Registration immediately if not already done - it is free and unlocks substantial benefits", "Calculate total MSME benefit value you can capture: central schemes + state schemes + procurement preference", "Register on Government e-Marketplace (GeM) for access to government procurement opportunities", "Connect with your state MSME Facilitation Centre and District Industries Centre for personalized scheme guidance"]'::jsonb,
        '["Udyam Registration Step-by-Step Guide with screenshot walkthrough", "MSME Benefit Calculator showing central + state combined value", "GeM Registration Guide for MSME vendors with bid preparation tips", "State-wise MSME Facilitation Centre Directory with contact details"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 23: IT/ITeS Sector Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        23,
        'IT/ITeS Sector-Specific Benefits',
        'IT and IT-enabled Services startups have access to specialized schemes through STPI (Software Technology Parks of India), state IT policies, and sector-specific incentives. The combination can provide 100% income tax exemption on export profits, zero customs duty on hardware, and substantial state subsidies.

STPI Registration Benefits: STPI operates under Ministry of Electronics and IT providing: 100% income tax exemption on export profits (Section 10AA), duty-free import of capital goods, fast-track customs clearance, and dedicated high-speed connectivity. STPI has 60+ centers across India - registration is straightforward and provides immediate benefits for export-oriented IT startups.

State IT Policy Incentives (Examples): Karnataka IT Policy - Rs 30 lakh capital subsidy for IT SMEs, Rs 1 lakh per employee for skill development; Telangana IT Policy - 100% stamp duty exemption, 100% electricity duty exemption, 15% capital subsidy; Maharashtra IT Policy - 100% electricity duty exemption, SGST reimbursement, rent subsidy; Tamil Nadu IT Policy - 30% capital subsidy up to Rs 30 lakhs, marketing support.

IT Park Benefits: Major IT parks (Whitefield, HITEC City, Hinjewadi, etc.) offer: Ready plug-and-play infrastructure, subsidized rental (often 30-40% below market), uninterrupted power with backup, high-speed connectivity, and proximity to talent pool. For early-stage startups, IT park co-working facilities offer Rs 5,000-10,000/seat vs Rs 15,000+ in commercial spaces.

Digital India Programme: Central government digitalization initiative creates opportunities: Common Services Centres (CSC) partnership for rural-focused IT services, National AI Portal initiatives for AI startups, Bhashini platform for language-tech startups, and Digital Infrastructure for Knowledge Sharing (DIKSHA) for ed-tech. These provide non-financial support through market access and partnerships.

Emerging Technology Focus: Special incentives for AI/ML, Blockchain, IoT, and Cybersecurity startups. Karnataka AVGC Policy provides 25% production expenditure subsidy for gaming/animation. Telangana has dedicated AI Mission with sandbox environment. Maharashtra Fintech Policy supports blockchain experimentation. These emerging technology incentives layer on top of general IT benefits.

Export Services Strategy: For IT services startups, structuring for exports unlocks maximum benefits. Invoice in foreign currency, receive payment in forex account, claim STPI benefits on export profits. Even startups serving Indian companies can structure exports if clients have foreign subsidiaries that can contract services.',
        '["Complete STPI registration if your startup has any export potential (software services to global clients)", "Research your state''s IT/ITeS specific policy - often separate and more generous than general startup policy", "Evaluate IT Park co-working vs commercial space - IT parks often offer significant cost advantage", "Identify emerging technology incentives relevant to your tech stack: AI, blockchain, IoT, cybersecurity"]'::jsonb,
        '["STPI Registration Guide with documentation checklist and processing timeline", "State IT Policy Comparison Matrix covering top 10 IT hub states", "IT Park Directory across India with rental rates and facilities", "Emerging Technology Incentives Guide covering AI, blockchain, IoT schemes"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 24: Manufacturing & Other Sector Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        24,
        'Manufacturing & Sector-Specific Benefits',
        'Manufacturing startups have access to India''s most generous incentive packages through PLI schemes, state industrial policies, and sector-specific programs. The Production-Linked Incentive (PLI) scheme alone covers 14 sectors with Rs 1.97 lakh crore allocation - potentially the world''s largest manufacturing incentive program.

PLI Scheme Overview (14 Sectors): Mobile Manufacturing - 4-6% on incremental sales; Pharmaceuticals - 3-10% on sales; Medical Devices - 5% on incremental sales; Automobiles & Components - up to 18% on sales; ACC Battery - up to Rs 45/kWh; Textile - 15% on incremental revenue; Food Processing - up to 10%; White Goods (AC, LED) - 4-6%; Solar PV - up to Rs 14,500/MW capacity; Telecom - 4-7%; Electronic Components - 3-6%; Specialty Steel - up to Rs 6,800/MT; Drones - up to 20%; and IT Hardware - 2-4%.

State Manufacturing Incentives: States compete aggressively for manufacturing investment. Top packages: Gujarat - 25% capital subsidy + 7% interest subvention + net SGST refund for 10 years; Tamil Nadu - 30% capital subsidy + 6% interest subvention + land at subsidized rates; Andhra Pradesh - 40% capital subsidy for mega projects + 100% SGST reimbursement; Uttar Pradesh - 25% capital subsidy + dedicated industrial plots.

Agritech Sector Benefits: Ministry of Agriculture schemes: Sub-Mission on Agricultural Mechanization (SMAM) - 25-50% subsidy on agri equipment; Agri-Infrastructure Fund - Rs 1 lakh crore fund with 3% interest subvention; PMFME for food processing - 35% capital subsidy. State schemes add: FPO integration support, cold chain subsidies, and agricultural marketing infrastructure.

Healthcare/MedTech Benefits: Pharma clusters (Hyderabad, Ahmedabad, Baddi) offer enhanced incentives. Medical device parks provide ready infrastructure. Ayushman Bharat Digital Mission creates healthtech opportunities. State health department partnerships for pilot programs. BIRAC (Biotechnology Industry Research Assistance Council) provides up to Rs 50 lakh for healthcare innovation.

Clean Energy/EV Sector: FAME II provides Rs 10,000 crore for EV adoption. State EV policies offer: Capital subsidy up to 25%, road tax exemption, registration fee waiver. Solar/Wind projects have RPO (Renewable Purchase Obligation) creating guaranteed demand. Green hydrogen mission creates emerging opportunities.

Textile & Fashion Sector: Amended Technology Upgradation Fund (ATUFS) provides 15% capital subsidy. PLI for textiles offers 15% on incremental production. State textile policies add: Common facility centers, design support, and marketing assistance.',
        '["Evaluate PLI scheme eligibility for your sector - these are India''s most valuable manufacturing incentives", "Compare state manufacturing policies: Gujarat vs Tamil Nadu vs Andhra Pradesh for your sector", "For agritech, research SMAM, Agri-Infrastructure Fund, and state agricultural department partnerships", "Identify sector-specific incentives beyond general startup schemes: pharma clusters, food parks, EV policies"]'::jsonb,
        '["PLI Scheme Complete Guide covering all 14 sectors with eligibility and application process", "State Manufacturing Policy Comparison across top 10 industrial states", "Agritech Incentive Directory covering central and state agricultural schemes", "Sector-Specific Incentive Calculator for manufacturing, agritech, healthcare, and cleantech"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Application & Compliance (Days 25-27)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Application Strategy & Compliance',
        'Master the application process for state startup schemes. Learn documentation requirements, common rejection reasons, and strategies for successful applications. Understand compliance requirements for maintaining scheme benefits.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- Day 25: Application Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        25,
        'State Scheme Application Strategy',
        'Successful scheme applications require strategic planning, proper documentation, and understanding of evaluation criteria. With thousands of startups applying for limited scheme funds, your application must stand out while meeting all technical requirements. The difference between approved and rejected applications often comes down to presentation quality.

Application Prioritization Framework: Not all schemes are worth applying for. Prioritize based on: Benefit Value (higher monetary value first), Success Probability (your fit with criteria), Application Effort (documentation complexity), and Timeline (disbursement speed). Create a scheme application pipeline with priority ranking.

Common Rejection Reasons: Incomplete documentation (40% of rejections), Eligibility criteria not met (25%), Poor business plan presentation (15%), Missing deadlines (10%), Technical errors in forms (10%). Most rejections are preventable with proper preparation.

Documentation Excellence: Standard documents required across most schemes: DPIIT Recognition Certificate, Company Incorporation Certificate (CIN), PAN and GST Registration, Bank Account Statement (6 months), Audited Financial Statements (if applicable), Business Plan/Pitch Deck, Team Profiles with LinkedIn links, Technology/Product Documentation, Market Validation Evidence (LOIs, MOUs, Early Customers).

Business Plan Requirements: State evaluation committees look for: Clear problem-solution fit, Market size and opportunity (with credible sources), Competitive differentiation, Revenue model and unit economics, Team capability and commitment, Fund utilization plan with timelines, and Job creation potential (important for government schemes).

Application Timing Strategy: Many state schemes have quarterly or annual cycles. Apply early in the cycle - later applications face budget exhaustion. Track scheme announcement dates: Karnataka Elevate (January), Maharashtra Innovation Society (quarterly), Gujarat (rolling). Some schemes have year-round applications but monthly committee reviews.

Relationship Building: Beyond applications, build relationships with: Nodal Officers in state startup cells, Incubator managers who often have committee access, Industry association representatives (NASSCOM, TiE, CII), and Successful founders who can provide references. In India, relationships often accelerate applications.',
        '["Prioritize your scheme application pipeline using the Benefit Value x Success Probability matrix", "Prepare master documentation folder with all standard documents in both PDF and original formats", "Create a professional business plan specifically designed for government scheme evaluation criteria", "Build relationships with state startup nodal officers - attend state-organized events, respond to consultations"]'::jsonb,
        '["Scheme Application Priority Matrix Template with weighted scoring", "Master Documentation Checklist covering requirements across all major state schemes", "Government Scheme Business Plan Template with evaluation criteria mapping", "State Nodal Officer Contact Directory with engagement best practices"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 26: Documentation Excellence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        26,
        'Documentation & Presentation Excellence',
        'Government scheme evaluation committees review hundreds of applications. Your documentation must be comprehensive, well-organized, and professionally presented. Poor documentation is the #1 reason for application rejections - even excellent startups fail due to presentation issues.

Document Organization System: Create a hierarchical folder structure: Legal Documents (incorporation, registrations, licenses), Financial Documents (statements, projections, audits), Business Documents (pitch deck, business plan, market research), Technical Documents (product specs, IP filings, prototypes), and Validation Documents (LOIs, MOUs, customer testimonials). Maintain both digital (cloud) and physical (bound) copies.

Business Plan for Government Schemes: Unlike VC pitch decks, government business plans require: Executive Summary (2 pages max), Company Overview (history, structure, team), Product/Service Description (with technical specifications), Market Analysis (with cited data sources - use MOSPI, RBI, industry reports), Competitive Analysis, Marketing and Sales Strategy, Operations Plan, Financial Projections (3-5 years with assumptions clearly stated), Fund Utilization Plan (scheme-specific), Job Creation Plan, and Risk Analysis with Mitigation Strategies.

Financial Projection Requirements: Government committees scrutinize financials closely. Include: Revenue projections with bottom-up calculations, Expense projections by category, Profitability timeline, Cash flow projections, Break-even analysis, and Assumption documentation (customer acquisition cost, pricing rationale, growth rates). Conservative projections with clear assumptions are better than aggressive ones that seem unrealistic.

Innovation/Technology Documentation: For innovation-focused schemes, demonstrate: Problem uniqueness and your novel approach, Technical differentiation from existing solutions, Intellectual property (filed or planned), Prototype/MVP evidence (screenshots, demos, user testing results), and Technology roadmap. Include technical architecture diagrams for tech startups.

Validation Evidence: Strongest validation types for government schemes: Letters of Intent from potential customers (on their letterhead), MOUs with partners or channel partners, Early revenue (even Rs 10,000 monthly shows market acceptance), Pilot program results, User testimonials, and Media coverage. Government committees are risk-averse - evidence reduces perceived risk.',
        '["Organize all company documents into the recommended hierarchical folder structure with clear naming conventions", "Create a government-specific business plan following the outlined structure - different from VC pitch deck", "Prepare detailed financial projections with documented assumptions for next 3-5 years", "Compile all validation evidence: LOIs, MOUs, customer testimonials, media coverage in single portfolio"]'::jsonb,
        '["Document Organization Template with folder structure and naming conventions", "Government Scheme Business Plan Template (15-20 pages) with section guidance", "Financial Projection Model with assumption documentation framework", "Validation Evidence Portfolio Template with sample LOI/MOU formats"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 27: Compliance & Benefit Realization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        27,
        'Compliance & Benefit Realization',
        'Receiving scheme approval is only the beginning - benefit realization requires proper compliance and claim procedures. Many startups fail to realize full benefits due to compliance gaps. Understanding ongoing requirements ensures you capture maximum value from approved schemes.

Common Compliance Requirements: Quarterly progress reports to nodal agency, Annual utilization certificates for funds received, Employment records (often schemes require job creation), Financial audit requirements (CA-certified statements), Technology milestone demonstrations, and Physical verification visits by scheme officers.

Benefit Claim Procedures: Different schemes have different claim processes. Subsidy Schemes: Submit investment proof (invoices, payment receipts) → Verification by officers → Subsidy disbursement (typically 60-90 days). Reimbursement Schemes: Pay full amount → Submit claim with proof → Receive reimbursement. Tax Exemption Schemes: Claim in tax returns with supporting documentation.

Maintaining Eligibility: Scheme benefits often have continuing eligibility conditions. Common conditions: Maintain DPIIT recognition throughout claim period, Remain within turnover limits for MSME classification, Meet employment generation commitments, Use funds for specified purposes only, Maintain registered office in state throughout benefit period.

Multi-Scheme Compliance Management: When claiming multiple schemes (recommended), track: Different reporting periods (quarterly/half-yearly/annual), Different document requirements per scheme, Overlapping and non-overlapping benefits (some schemes don''t allow stacking), and Scheme-specific compliance officers.

Record Keeping Requirements: Maintain for at least 8 years: All scheme application documents, Approval letters and agreements, Utilization records and receipts, Progress reports submitted, Correspondence with nodal agencies, and Audit reports. Digital backup with cloud storage is essential.

Dealing with Compliance Issues: Common issues and solutions: Delayed disbursement - Escalate through official channels, file RTI if needed. Audit queries - Respond promptly with documented evidence. Benefit clawback risk - Ensure all conditions are met continuously. Change in scheme terms - Document grandfather clauses if applicable.',
        '["Create a compliance calendar tracking all reporting deadlines for your approved/applied schemes", "Set up proper documentation system for utilization tracking - maintain invoices, payment proof, employment records", "Establish quarterly review process to ensure continuing eligibility conditions are met", "Build relationship with scheme compliance officers for smooth verification and disbursement"]'::jsonb,
        '["Scheme Compliance Calendar Template with automated reminders", "Utilization Documentation System with record-keeping best practices", "Compliance Checklist for major state startup schemes", "Escalation Guide for scheme-related issues with RTI templates"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Strategic Implementation (Days 28-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Strategic Implementation',
        'Develop your comprehensive state benefits strategy. Learn to optimize multi-state presence, track policy changes, and build long-term government relationships. Create your personalized action plan for maximum benefit capture.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 28: Multi-State Optimization Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        28,
        'Multi-State Optimization Strategy',
        'Strategic multi-state presence can significantly increase total benefit capture. Many successful startups maintain entities in multiple states to access different incentive packages while operating efficiently. This requires careful planning to balance benefits against compliance complexity.

Multi-State Entity Structures: Common structures: Holding-Subsidiary (parent company in one state, subsidiary in another), Branch Office (same company with registered branches), and Associate Company (separate legal entities with common ownership). Each has different tax, compliance, and benefit implications.

Optimal State Combinations: Based on analysis, optimal combinations by startup type: Tech Startups - Karnataka (ecosystem, talent) + Gujarat GIFT City (if fintech/global) or Maharashtra (market access). Manufacturing Startups - Gujarat/Tamil Nadu (infrastructure, incentives) + Bihar/Jharkhand (lower costs, additional incentives). Agritech Startups - Punjab/UP (agricultural base) + Karnataka (tech talent). Services Startups - Maharashtra/Delhi (market) + NE states (tax benefits if genuine presence possible).

Legal Considerations: Ensure multi-state structure is legally compliant. Key considerations: Transfer pricing between related entities, GST implications of inter-state transactions, Different state compliance requirements, Anti-avoidance provisions in scheme rules, and Genuine business substance in each state (avoid shell structures).

Cost-Benefit Analysis Framework: Calculate for each additional state: Incremental benefits (schemes, tax savings, market access) vs. Incremental costs (compliance, registration, operations). Generally beneficial if net benefit exceeds Rs 10-15 lakhs annually. Include intangible benefits (talent access, market proximity) in qualitative assessment.

Scaling State Presence: Start with one state, add others strategically. Typical progression: Year 1 - Single state (home base with primary operations), Year 2-3 - Second state (either for market access or incentive arbitrage), Year 4+ - Third state and beyond (as business requires). Each addition should have clear strategic rationale.

Common Multi-State Pitfalls: Avoid: Creating shell companies without real operations (scheme fraud risk), Ignoring compliance in non-primary states (penalties accumulate), Overcomplicating structure (complexity has costs), and Choosing states purely for incentives without operational logic.',
        '["Evaluate if multi-state presence makes sense for your startup stage - typically beneficial post Product-Market Fit", "Design optimal state combination based on your sector, market, and operational requirements", "Calculate cost-benefit analysis for adding second state to your structure", "Consult with CA/legal advisor on optimal entity structure for multi-state operations"]'::jsonb,
        '["Multi-State Entity Structure Comparison with tax and compliance implications", "Optimal State Combination Guide by startup type and sector", "Multi-State Cost-Benefit Calculator with ROI analysis", "Legal Compliance Checklist for multi-state operations"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 29: Policy Monitoring & Adaptation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        29,
        'Policy Monitoring & Adaptation',
        'State startup policies change frequently - new schemes launch, existing ones modify or expire. Continuous monitoring ensures you capture new opportunities and adapt to policy changes. Building a systematic policy tracking system provides competitive advantage.

Policy Change Patterns: State policies typically reviewed: Every 3-5 years (major policy revision), Budget announcements (annual, February-March), Election cycles (new governments often launch new schemes), and Industrial events (Vibrant Gujarat, Bengal Global Business Summit often announce new incentives). Central schemes change with union budget and ministerial priorities.

Policy Monitoring Sources: Official sources: State startup portals, Department of Industries websites, State Industrial Development Corporation sites, and Gazette notifications. News sources: Economic Times, Business Standard, state editions of major newspapers. Community sources: NASSCOM updates, TiE chapter communications, industry association newsletters.

Setting Up Monitoring System: Google Alerts for: "[State Name] startup policy", "[State Name] industrial incentive", "DPIIT startup scheme", sector-specific terms. RSS feeds from state government portals. LinkedIn following of state ministers, secretaries, nodal officers. WhatsApp groups of state startup communities.

Adapting to Policy Changes: When policy changes: Assess impact on existing benefits (are you grandfathered?), Identify new opportunities created, Update compliance procedures if requirements change, Reconsider state strategy if relative attractiveness changes. Quick adaptation often provides first-mover advantage in new schemes.

Preparing for Future Policies: Emerging policy directions likely to create opportunities: Green/sustainable business incentives (net zero commitments driving policy), Semiconductor and electronics manufacturing (India''s chip ambition), Space-tech deregulation (ISRO commercial arm expansion), Data center policies (digital sovereignty push), and Defense manufacturing (Atmanirbhar Bharat).

Building Policy Intelligence Network: Connect with: Policy consultants specializing in government schemes, CA firms with government advisory practice, Industry associations with policy advocacy role, and Other founders active in scheme applications. Information sharing within network provides early policy intelligence.',
        '["Set up Google Alerts for policy changes in your primary states and sectors", "Join state startup community WhatsApp groups and LinkedIn groups for real-time updates", "Create quarterly policy review calendar to systematically assess changes and opportunities", "Build network of founders, consultants, and industry association contacts for policy intelligence"]'::jsonb,
        '["Policy Monitoring Setup Guide with Google Alert templates", "State Startup Community Directory with WhatsApp group links", "Policy Change Impact Assessment Framework", "Emerging Policy Trends Analysis with opportunity identification"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 30: Personal Action Plan & Summary
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        30,
        'Personal Action Plan & Course Summary',
        'Congratulations on completing the State-wise Scheme Map course. You now have comprehensive knowledge of India''s 28 states and 8 Union Territories startup ecosystems. This final lesson helps you create a personalized action plan to capture maximum benefits based on your specific situation.

Course Knowledge Summary: You have learned: Federal structure and state policy framework, Detailed benefits across all states and UTs, Special category status and SEZ benefits, MSME and sector-specific schemes, Application strategies and documentation requirements, Compliance and benefit realization procedures, and Multi-state optimization strategies.

Personalized State Strategy Framework: Based on course learnings, define: Primary State (main operations - consider ecosystem, talent, market), Secondary State(s) (for incentive arbitrage or market access), Scheme Priority List (top 10 schemes by benefit value and success probability), Timeline (when to apply for each scheme), and Resource Allocation (internal vs. consultant support).

Immediate Action Items (30 Days): Complete DPIIT and Udyam registration if not done, Register on primary state startup portal, Prepare master documentation folder, Apply for top 3 priority schemes, Connect with state nodal officer.

Medium-Term Actions (90 Days): Complete applications for all priority schemes, Track application status and follow up, Begin compliance procedures for approved schemes, Evaluate secondary state presence, and Build government relationship network.

Long-Term Strategy (12 Months): Realize benefits from approved schemes, Add strategic state presence if beneficial, Monitor and adapt to policy changes, Share learnings with startup community, and Consider mentoring other founders on scheme navigation.

Total Benefit Potential Calculation: Based on typical startup profile, total accessible benefits: State Startup Scheme (Rs 10-50 lakhs), MSME Benefits (Rs 5-25 lakhs), Sector-Specific Schemes (Rs 10-50 lakhs), Tax Exemptions (5-15% of revenue), and Infrastructure Subsidies (Rs 5-20 lakhs). Total potential: Rs 30-150 lakhs over 3-5 years depending on startup stage and eligibility.

Final Recommendations: Start small, validate process, then scale applications. Documentation quality matters more than application quantity. Relationships accelerate approvals - invest in government connects. Compliance is non-negotiable - budget time and resources. Share successes - help build the ecosystem.',
        '["Create your Personal State Strategy Document defining primary state, secondary states, and scheme priorities", "Build your 30-60-90 day action plan with specific schemes, deadlines, and resource allocation", "Calculate your total benefit potential based on your startup profile and eligible schemes", "Commit to one action item today: either registration, application, or relationship building"]'::jsonb,
        '["Personal State Strategy Template with guided completion framework", "30-60-90 Day Action Plan Builder with milestone tracking", "Total Benefit Potential Calculator based on startup profile", "State Scheme Quick Reference Card for ongoing use"]'::jsonb,
        120,
        100,
        2,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
