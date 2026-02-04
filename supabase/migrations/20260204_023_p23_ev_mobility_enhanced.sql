-- THE INDIAN STARTUP - P23: EV & Clean Mobility Mastery - Enhanced Content
-- Migration: 20260204_023_p23_ev_mobility_enhanced.sql
-- Purpose: Enhance P23 course content to 500-800 words per lesson with India-specific EV data
-- Course: 55 days, 11 modules covering complete EV startup journey in India

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
BEGIN
    -- Get or create P23 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P23',
        'EV & Clean Mobility Mastery',
        'Complete guide to building EV startups in India - 11 modules covering FAME II subsidies worth Rs 10,000 Cr, PLI schemes for Advanced Chemistry Cells (Rs 18,100 Cr), battery supply chain, vehicle homologation through ARAI/ICAT, charging infrastructure, state EV policies, fleet electrification, and scaling strategies. India targets 30% EV penetration by 2030 with Rs 25,938 Cr PLI for auto components.',
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

    -- Get product ID if already exists
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P23';
    END IF;

    -- Clean existing modules and lessons for P23
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: EV Landscape India (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'EV Landscape India',
        'Understand India''s EV ecosystem comprehensively - market size projections of $206 billion by 2030, key players across segments, government vision under NEMMP, FAME II and PLI schemes, and emerging opportunities in the world''s largest two-wheeler market.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_1_id;

    -- Day 1: India EV Market Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        1,
        'India EV Market Overview',
        'India''s electric vehicle market is experiencing unprecedented growth, projected to reach $206 billion by 2030 from approximately $8 billion in 2023, representing a CAGR of 49%. In FY 2023-24, India sold over 1.5 million EVs across all segments, with electric two-wheelers dominating at 56% market share (approximately 950,000 units), followed by electric three-wheelers at 38% (approximately 570,000 units), and electric cars at 6% (approximately 90,000 units).

The two-wheeler segment represents India''s largest EV opportunity. India is the world''s largest two-wheeler market with 15+ million annual sales, but EV penetration remains below 6%. Key players include Ola Electric (35% market share, Rs 7,000 Cr valuation), Ather Energy (15% share, backed by Hero MotoCorp), TVS iQube (12% share), Bajaj Chetak (10% share), and emerging players like Revolt, Okinawa, and Hero Electric. The average selling price ranges from Rs 80,000 to Rs 1.5 lakh for mass-market scooters.

Electric three-wheelers show highest EV penetration at 50%+ in the e-rickshaw segment. Over 2 million e-rickshaws operate across India, primarily in Tier 2/3 cities. Key manufacturers include Mahindra, Piaggio, Kinetic Green, and numerous local assemblers. The segment benefits from low purchase cost (Rs 1.5-3 lakh), favorable running economics (Rs 0.40/km vs Rs 2.50/km for diesel), and relaxed regulatory requirements.

The four-wheeler segment is dominated by Tata Motors with 70%+ market share through Nexon EV and Tiago EV. MG Motor (ZS EV), Mahindra (XUV400), and Hyundai (Kona, Ioniq 5) compete in the premium segment. The luxury segment features BYD, Mercedes EQS, and BMW iX. Average EV car prices range from Rs 10 lakh (Tiago EV) to Rs 2+ crore (luxury imports). Key challenge: limited charging infrastructure outside metros restricts adoption.

Government vision under NEMMP 2020 targets 30% EV penetration across vehicle segments by 2030, requiring approximately 80 million EVs on Indian roads. This translates to annual production capacity of 10 million EVs by 2030. The policy push includes Rs 10,000 Cr FAME II scheme (extended to March 2024, successor scheme expected), Rs 18,100 Cr PLI for Advanced Chemistry Cells, Rs 25,938 Cr PLI for Auto and Auto Components, and aggressive state-level policies with additional subsidies.',
        '["Research current EV sales data by segment from VAHAN dashboard and SIAM reports - document monthly registration trends for past 12 months", "Map top 15 EV players across 2W/3W/4W segments with market share, funding raised, manufacturing capacity, and geographic presence", "Identify 5 underserved EV niches in India: cargo 3W, premium e-bikes, electric tractors, e-ambulances, or electric boats", "Calculate TAM, SAM, SOM for your chosen EV opportunity using CRISIL/ICRA industry projections"]'::jsonb,
        '["EV Market Analysis Framework with segment-wise growth projections from NITI Aayog and CEEW", "India EV Competitive Landscape Map with funding data, capacity, and market positioning", "VAHAN Dashboard Guide for extracting state-wise EV registration data", "EV Opportunity Assessment Matrix with 20+ niche opportunities rated by market size and competition"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: EV Value Chain Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        2,
        'EV Value Chain Deep Dive',
        'The EV value chain presents multiple entry points for startups, with total value creation of approximately Rs 15 lakh crore by 2030. Understanding where value concentrates and India''s current import dependencies is crucial for strategic positioning.

Raw Materials (Rs 2 lakh crore opportunity): India imports 100% of lithium, 100% of cobalt, and 70% of nickel - critical battery materials. KABIL (joint venture of NALCO, HCL, and MECL) is pursuing overseas lithium assets in Argentina, Australia, and Chile. India has discovered lithium reserves in Jammu & Kashmir (5.9 million tonnes) and Rajasthan, but commercial extraction is 5-7 years away. Graphite (anode material) is available domestically in Karnataka and Odisha. Rare earth elements for motors are imported primarily from China (60% global supply).

Cell Manufacturing (Rs 3 lakh crore opportunity): Currently 100% imported from China (CATL, BYD, EVE, CALB), Korea (Samsung SDI, LG Chem, SK Innovation), and Japan (Panasonic). Cell costs represent 65-70% of battery pack cost and 35-40% of EV cost. PLI-ACC scheme awarded 50 GWh capacity to Ola Electric (20 GWh), Rajesh Exports (5 GWh), Reliance New Energy (5 GWh), and Amara Raja (16 GWh through technical partner). Commercial production expected from 2025-26. Import duty on lithium-ion cells: 5% (under Project Import) to 15% (normal).

Battery Pack Assembly (Rs 1.5 lakh crore opportunity): Growing domestic capability with 30+ pack assemblers. Key players: Exide Energy Solutions, Amara Raja, Ather Energy (in-house), Ola Electric (in-house), Log9 Materials, and Nexcharge (Exide-Leclanché JV). Pack assembly adds 20-30% value over cells. BMS (Battery Management System) remains largely imported, presenting opportunity for software-focused startups. Import duty on battery packs: 15-18%.

Motors and Controllers (Rs 80,000 crore opportunity): BLDC motors for 2W/3W largely imported from China (QS Motor, Golden Motor). Domestic players emerging: Rexnord, Greaves Electric, Minda Corporation. Motor controllers (inverters) represent high-value electronics opportunity. PMSM motors for 4W imported from global suppliers. Local content increasing due to FAME II requirements.

Vehicle Assembly (Rs 4 lakh crore opportunity): Established automotive ecosystem adapting to EV. OEMs: Tata Motors, Mahindra, TVS, Bajaj, Hero, Ola Electric. Contract manufacturers: Foxconn (exploring), Motherson Sumi. Assembly adds 15-25% value. India has competitive labor costs (Rs 15,000-25,000/month for assembly workers vs Rs 150,000+ in China).

Charging Infrastructure (Rs 50,000 crore opportunity): Nascent market with 12,000+ public chargers installed. Key players: Tata Power, Fortum (Quench), EESL, Statiq, Charge Zone, Ather Grid. FAME II allocated Rs 1,000 crore for 2,877 charging stations. Revenue models evolving: per-unit, subscription, advertising.

Aftermarket Services (Rs 30,000 crore opportunity): EV servicing requires new skills - high voltage training, battery diagnostics. Battery recycling and second-life applications emerging. Insurance products being customized for EVs.',
        '["Map the complete EV value chain for your target segment - identify current players, import percentages, and margin structures at each stage", "Calculate import dependency percentage for each major component: cells (100%), BMS (80%), motors (60%), controllers (70%), chargers (40%)", "Identify 5 value chain positions with best risk-reward for startups: consider capital requirements, technology barriers, and margin potential", "List domestic vs imported component ratios for a typical electric 2-wheeler - calculate localization percentage under FAME II norms"]'::jsonb,
        '["EV Value Chain Map with India-specific import dependencies and domestic alternatives", "Component Cost Breakdown Analysis for 2W, 3W, and 4W EVs with supplier options", "PLI Scheme Value Chain Coverage showing which segments receive government support", "Make vs Buy Decision Framework for EV startups with capital and capability requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Government EV Vision & Policy Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        3,
        'Government EV Vision & Policy Framework',
        'India''s EV policy architecture involves multiple ministries and schemes, creating a complex but supportive regulatory environment. Understanding this framework is essential for maximizing benefits and ensuring compliance.

National Electric Mobility Mission Plan (NEMMP) 2020: Launched in 2013, set foundation for EV adoption. Targets by 2020 (revised to 2030): 6-7 million EVs annually, reduce crude oil imports by Rs 60,000 crore, create 7 lakh jobs. Key principles: demand incentives, manufacturing push, charging infrastructure, and technology development.

FAME Scheme Evolution: FAME I (2015-2019): Rs 895 crore budget, supported 2.8 lakh vehicles, focused on demand incentives for 2W/3W/4W and buses. Technology-agnostic approach with mild hybrid inclusion. FAME II (2019-2024): Rs 10,000 crore budget (Rs 8,596 Cr allocated), extended to March 2024. Stricter localization requirements (50% domestic value addition). Higher subsidy rates: Rs 15,000/kWh for 2W (capped at 40% of vehicle cost), Rs 10,000/kWh for 3W, Rs 10,000/kWh for 4W (capped at Rs 1.5 lakh), Rs 20,000/kWh for buses. Performance requirements: minimum range 80 km, maximum speed 40 kmph for 2W eligibility. Successor scheme (PM-VIDYUT?) expected with focus on charging infrastructure and commercial vehicles.

PLI Schemes for EV Ecosystem: PLI for Advanced Chemistry Cell (ACC): Rs 18,100 crore over 5 years, target 50 GWh domestic cell manufacturing, subsidy Rs 2,000-3,000/kWh based on localization and capacity utilization. PLI for Auto and Auto Components: Rs 25,938 crore over 5 years, covers electric vehicles, hydrogen fuel cells, and advanced automotive technology. Minimum investment thresholds: Rs 500 crore for Champion OEM, Rs 10 crore for Component Champion. Sales growth targets of 10-30% annually required.

Ministry Coordination: Ministry of Heavy Industries (MHI): FAME scheme implementation, PLI administration, vehicle specifications. Ministry of Power: Charging infrastructure policy, EV tariffs, grid integration. Ministry of Road Transport & Highways: Vehicle homologation, registration, safety standards. Ministry of New and Renewable Energy (MNRE): Renewable energy integration, green hydrogen mission. Bureau of Energy Efficiency (BEE): Energy efficiency standards, star labeling. NITI Aayog: Policy coordination, EV mission monitoring, target setting.

State EV Policies: 25+ states have dedicated EV policies with additional incentives. Best policies: Gujarat (100% road tax exemption, Rs 12,000/kWh capital subsidy for manufacturers), Maharashtra (Rs 5,000/kWh consumer incentive, 100% road tax waiver), Karnataka (100% exemption on road tax and registration, 15% capital subsidy), Tamil Nadu (100% road tax exemption, land at subsidized rates), Telangana (100% road tax exemption, first-mover incentives). Policy comparison crucial for manufacturing location decision.',
        '["Study FAME II scheme document in detail - download from MHI website and create summary of eligibility criteria, subsidy rates, and compliance requirements", "Map all applicable central schemes for your EV business: FAME II, PLI-ACC, PLI-Auto, Startup India, MSME schemes", "List all state EV policies relevant to your segment - create comparison matrix for top 5 states on consumer incentives, manufacturing subsidies, and ease of doing business", "Create policy compliance checklist and timeline - identify key milestones for FAME II registration, PLI application, and state incentive claims"]'::jsonb,
        '["FAME II Complete Guide with scheme document, notification updates, and FAQ compilation from MHI", "PLI Scheme Navigator covering ACC and Auto Components with application timelines and eligibility criteria", "State EV Policy Comparison Matrix with 25 states ranked on incentives, infrastructure, and policy stability", "Ministry Contact Directory with nodal officers for EV-related queries and clarifications"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: EV Startup Success Stories Analysis
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        4,
        'EV Startup Success Stories Analysis',
        'Learning from Indian EV pioneers provides actionable insights for new entrants. Each successful startup followed a distinct strategy, faced unique challenges, and carved different paths to scale.

Ola Electric (2017): Founded by Bhavish Aggarwal (Ola co-founder). Pivoted from ride-hailing to EV manufacturing. Funding: $800+ million from SoftBank, Temasek, Tiger Global. Valuation: Rs 40,000+ crore. Strategy: Vertical integration from cells to vehicles to charging. Key moves: Acquired Amsterdam-based Etergo for scooter platform, building Futurefactory (world''s largest 2W factory, 10 million/year capacity) in Tamil Nadu. Cell manufacturing under PLI-ACC (20 GWh). Products: S1 Pro, S1 Air, S1 X. Market share: 35%+. Challenges faced: quality issues, service network gaps, customer complaints. Lessons: Scale requires massive capital, vertical integration is risky but defensible, brand matters in consumer EV.

Ather Energy (2013): Founded by IIT Madras alumni Tarun Mehta and Swapnil Jain. Bootstrapped initially, then raised $180+ million from Hero MotoCorp (35% stake), Sachin Bansal, Tiger Global. Strategy: Premium positioning with technology differentiation. Products: Ather 450X, 450S (Rs 1.2-1.5 lakh price point). Key differentiators: In-house developed powertrain, touchscreen dashboard, OTA updates, Ather Grid (own charging network with 1500+ points). Manufacturing: Chennai facility with 400,000/year capacity. Market share: 12-15%. Lessons: Premium positioning works in 2W, technology can command price premium, charging network is competitive moat.

Euler Motors (2018): Founded by Saurav Kumar (ex-Ola, PayTM). Focused on B2B commercial EVs. Funding: $100+ million from GIC Singapore, Blume Ventures, Athera Venture Partners. Products: HiLoad (cargo 3W), Storm (cargo van). Strategy: Fleet-first approach targeting Amazon, BigBasket, Flipkart. Differentiation: 150+ km range, 500+ kg payload, 3-year warranty. Key insight: B2B has faster adoption than B2C due to TCO focus. Achieved 5,000+ vehicles deployed. Lessons: B2B is easier path to revenue, fleet requirements drive product design, service SLAs are critical for commercial customers.

Sun Mobility (2017): Founded by Chetan Maini (Reva creator) and Uday Khemka. Raised $100+ million from Vitol, SBI. Strategy: Battery-as-a-Service (BaaS) model, separating battery from vehicle. Products: Swap Points (battery swapping stations), QuickInterchange batteries. Partnerships: Ashok Leyland (buses), Piaggio (3W), Bounce (2W). Key innovation: Interoperable battery packs across OEMs. Deployed 500+ swap stations. Business model: Vehicle OEMs sell battery-less vehicles (lower upfront cost), Sun Mobility sells energy subscription. Lessons: Asset-light for customers, recurring revenue model, requires OEM partnerships.

Other notable players: Ultraviolette (premium e-bike, Rs 4.5 lakh), Revolt (mid-market 2W, acquired by RattanIndia), Yulu (shared mobility), Simple Energy, Okinawa, and Greaves Electric (component to vehicle transition).',
        '["Analyze 5 successful Indian EV startups in depth - document founding story, funding journey, product evolution, go-to-market strategy, and current challenges", "Study their differentiation strategies: vertical integration (Ola), premium tech (Ather), B2B focus (Euler), asset-light (Sun Mobility) - identify which aligns with your capabilities", "Map their funding rounds chronologically - identify investor types (strategic vs financial), valuation milestones, and use of funds at each stage", "Extract 10 actionable lessons from their journeys that apply to your startup - create implementation plan for top 3 lessons"]'::jsonb,
        '["EV Startup Case Study Library with detailed analysis of 15 Indian EV companies including failures", "Funding Journey Map showing round sizes, investors, and valuations for top EV startups", "Go-to-Market Strategy Comparison for B2B vs B2C vs Battery-as-a-Service models", "Founder Interview Compilation with key insights from EV entrepreneur podcasts and articles"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Identifying Your EV Opportunity
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        5,
        'Identifying Your EV Opportunity',
        'Selecting the right EV opportunity requires matching market gaps with your capabilities, capital access, and risk appetite. The EV ecosystem offers diverse entry points from capital-intensive manufacturing to capital-light software and services.

Manufacturing Opportunities: Electric 2-Wheelers: Highly competitive but massive market (15M+ units/year potential). Entry requires Rs 50-200 crore for manufacturing setup. Best niches: premium performance bikes (Ultraviolette path), ultra-affordable <Rs 50,000 segment, specialized fleet vehicles. Electric 3-Wheelers: Less competitive, strong unit economics. Entry requires Rs 20-50 crore. Best niches: goods carrier (L5N), passenger variants for specific routes, premium e-rickshaws. Electric 4-Wheelers: Capital intensive (Rs 500+ crore), dominated by existing OEMs. Best entry: platform partnerships, niche commercial vehicles (ambulance, school van). EV Components: Motors and controllers (Rs 10-30 crore entry), battery packs (Rs 5-20 crore), chargers (Rs 2-10 crore).

Charging Infrastructure Opportunities: Public charging networks require Rs 10-50 crore for meaningful scale. Home charging solutions need Rs 2-5 crore. Revenue streams: per-unit charging (Rs 15-20/unit), subscription models, advertising, data monetization. Key success factors: prime locations, reliability, fast charging capability. Battery swapping: Requires Rs 20-50 crore, OEM partnerships essential.

Software and Services Opportunities: Fleet management platforms (Rs 2-5 crore to build), telematics (Rs 1-3 crore), charging network software (Rs 1-2 crore), battery analytics and diagnostics (Rs 50 lakh-2 crore), EV financing platforms (Rs 5-10 crore). Lower capital requirements but longer sales cycles.

Aftermarket Opportunities: EV servicing and repair (Rs 50 lakh-2 crore per center), battery refurbishment (Rs 2-5 crore), spare parts distribution (Rs 1-5 crore), used EV marketplace (Rs 1-3 crore platform cost).

Opportunity Assessment Framework: Score opportunities on: Market Size (TAM in Rs crore), Competition Intensity (number of well-funded players), Capital Required (your access vs requirement), Time to Revenue (months to first sale), Regulatory Complexity (certifications needed), Your Expertise Match (1-10 rating), Margin Potential (gross margin %), and Scalability (geographic/segment expansion potential).

Validation approach: Conduct 20+ customer discovery interviews for your chosen opportunity. For B2B: talk to fleet operators, OEMs, dealers. For B2C: talk to current EV owners and intenders. For infrastructure: talk to property owners, RWAs, fuel station operators. Key questions: What''s their biggest EV-related pain point? What would they pay to solve it? Who makes the buying decision?',
        '["Complete EV opportunity assessment scoring 10+ opportunities across manufacturing, infrastructure, software, and services using the provided framework", "Conduct 15 customer discovery interviews for your top 3 opportunities - use LISTEN framework, document pain points and willingness to pay", "Define your unique value proposition for chosen opportunity - what makes you 10x better than alternatives?", "Create initial business model canvas including customer segments, value proposition, channels, revenue streams, key activities, key resources, key partnerships, and cost structure"]'::jsonb,
        '["EV Opportunity Assessment Matrix with 30+ opportunities scored on 8 criteria with market size estimates", "Customer Interview Guide for EV ventures with segment-specific questions for fleet operators, consumers, and infrastructure partners", "Business Model Canvas Template with EV-specific prompts and examples from successful startups", "Capital Requirement Calculator for different EV business models with typical funding stages"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: FAME II Subsidies (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'FAME II Scheme Mastery',
        'Master the Rs 10,000 crore FAME II scheme - eligibility criteria, subsidy calculations by vehicle category, application process through MHI portal, localization requirements under Phased Manufacturing Program, and ongoing compliance for demand incentives.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_2_id;

    -- Day 6: FAME II Scheme Structure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        6,
        'FAME II Scheme Structure',
        'FAME II (Faster Adoption and Manufacturing of Electric Vehicles in India - Phase II) is the cornerstone demand incentive program with Rs 10,000 crore total outlay from April 2019 to March 2024. Understanding its structure is essential for any EV venture in India.

Budget Allocation: Total outlay Rs 10,000 crore distributed as: Demand Incentives Rs 8,596 crore (86%), Charging Infrastructure Rs 1,000 crore (10%), Administrative/IEC Rs 404 crore (4%). Demand incentive allocation by segment: Electric 2-Wheelers Rs 2,000 crore (target 10 lakh vehicles), Electric 3-Wheelers Rs 750 crore (target 5 lakh vehicles), Electric 4-Wheelers Rs 1,200 crore (target 55,000 vehicles), Electric Buses Rs 3,500 crore (target 7,090 buses through STUs).

Subsidy Structure: Electric 2-Wheelers: Rs 15,000/kWh of battery capacity, capped at 40% of ex-factory price. Effective subsidy Rs 22,500-45,000 per vehicle depending on battery size (1.5-3 kWh typical). Electric 3-Wheelers: Rs 10,000/kWh, capped at 40% of vehicle cost. Typical subsidy Rs 30,000-50,000 for e-rickshaws, Rs 60,000-1 lakh for L5 category. Electric 4-Wheelers: Rs 10,000/kWh, capped at Rs 1.5 lakh per vehicle. Only commercial/fleet vehicles eligible (private cars excluded). Electric Buses: Rs 20,000/kWh, capped at Rs 50 lakh per 12m bus, Rs 35 lakh per 9m bus. Procured through CESL (Convergence Energy Services Limited) aggregated demand.

Eligibility Criteria: Technical Requirements: Minimum top speed 40 km/h for 2W (revised from 25 km/h), minimum range 80 km for 2W on single charge, energy consumption efficiency standards per AIS 156 certification. Localization Requirements: Minimum 50% domestic value addition mandatory, calculated per Phased Manufacturing Program (PMP) methodology, verified through localization certificate from testing agencies.

OEM Registration Process: Apply through FAME India portal (fame2.heavyindustries.gov.in), submit company registration documents, manufacturing license, GST registration, obtain testing agency certification (ARAI/ICAT), get model-wise approval for each variant, execute agreement with MHI for subsidy disbursement.

Compliance Requirements: Submit monthly sales reports through portal, claim subsidies within 60 days of vehicle registration, maintain localization compliance documentation, subject to random audits by MHI/testing agencies.

Key Policy Changes: April 2021: Subsidy rates increased (2W: Rs 10,000 to Rs 15,000/kWh), May 2021: Minimum speed requirement raised from 25 to 40 km/h, June 2022: Battery safety standards tightened post-fire incidents, March 2024: Scheme extended, successor scheme under development.',
        '["Download and study complete FAME II scheme notification and subsequent amendments from MHI website - create summary document with key provisions", "Calculate applicable subsidy for your planned vehicle models - optimize battery capacity for maximum subsidy capture while meeting range requirements", "Verify 50% localization requirement feasibility - map your planned BOM against localization calculation methodology", "List all technical specifications your vehicle must meet: speed, range, efficiency, safety standards - create compliance checklist"]'::jsonb,
        '["FAME II Master Document with all notifications, amendments, and clarifications consolidated", "Subsidy Calculator Tool with segment-wise cap calculations and optimization suggestions", "Localization Calculation Methodology Guide with component-wise value addition norms", "Technical Specification Compliance Checklist aligned with AIS 156 and CMVR requirements"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: FAME II Application Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        7,
        'FAME II Application Process',
        'The FAME II application process requires systematic documentation and coordination with testing agencies. Successful registration enables subsidy claims that can reduce effective vehicle cost by 15-40%, creating significant competitive advantage.

Pre-Application Requirements: Company must be incorporated in India (Indian promoter shareholding requirements may apply). Manufacturing facility or contract manufacturing arrangement in India. Valid GST registration and MSME/Industrial registration. Product must meet all CMVR (Central Motor Vehicles Rules) requirements.

Step 1 - OEM Registration: Create account on FAME India portal, submit company profile with CIN, GST, PAN, authorized signatory details. Upload incorporation certificate, board resolution, and manufacturing license. Processing time: 7-15 working days for approval.

Step 2 - Model Registration: For each vehicle variant, submit detailed specifications including battery capacity, motor power, range, top speed. Upload homologation certificate (Form 22) from ARAI/ICAT. Provide Bill of Materials (BOM) with component-wise sourcing details. Submit localization certificate calculating domestic value addition. Processing time: 15-30 working days per model.

Step 3 - Testing Agency Certification: Select approved testing agency (ARAI Pune, ICAT Manesar, CIRT Pune, VRDE Ahmednagar). Submit prototype vehicles for testing (2-3 units typically). Tests include: performance (range, speed, gradeability), safety (AIS 156 compliance), electromagnetic compatibility. Testing duration: 4-8 weeks depending on vehicle category. Cost: Rs 5-15 lakh for 2W, Rs 15-25 lakh for 3W/4W.

Step 4 - Agreement Execution: Execute tripartite agreement between OEM, MHI, and CESL. Agreement specifies subsidy rates, claim process, compliance requirements. Bank guarantee may be required (typically 10% of estimated annual subsidy claims).

Step 5 - Dealer Registration: Register authorized dealers through portal. Dealers must have valid GST registration. Each sale point mapped for subsidy claim verification.

Documentation Checklist: Corporate: CIN, PAN, GST registration, Board resolution, Audited financials. Technical: Homologation certificate (Form 22), Test reports, Battery test certificate. Localization: Value addition certificate, Component sourcing declarations, Supplier invoices. Sales: Vehicle invoice, Registration certificate (RC), Chassis/motor number mapping.

Common Rejection Reasons: Incomplete documentation (40% of rejections), localization percentage below 50% (25%), technical specifications not meeting criteria (20%), dealer registration issues (15%). Build relationships with MHI officials through industry associations like SMEV for pre-submission guidance.',
        '["Register your company on FAME India portal - complete OEM registration with all required documents", "Prepare documentation package for model registration - compile BOM, specifications, and testing requirements", "Schedule pre-consultation meeting with ARAI/ICAT to understand testing requirements and timelines for your vehicle type", "Create FAME II application project plan with milestones, responsibilities, and contingency buffer for delays"]'::jsonb,
        '["FAME India Portal Navigation Guide with screenshots and field-by-field instructions", "Model Registration Document Checklist with sample formats for BOM and specifications", "Testing Agency Comparison (ARAI vs ICAT vs CIRT) with cost, timeline, and capability assessment", "FAME II Application Timeline Template with typical durations and buffer recommendations"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Subsidy Calculations by Segment
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        8,
        'Subsidy Calculations by Segment',
        'Optimizing vehicle design for maximum FAME II subsidy capture can mean the difference between market-competitive pricing and being priced out. This requires understanding the interplay between battery capacity, vehicle cost, and subsidy caps.

Electric 2-Wheeler Calculations: Subsidy rate: Rs 15,000 per kWh. Cap: 40% of ex-factory price. Example 1: Entry-level scooter with 1.5 kWh battery, ex-factory price Rs 85,000. Calculated subsidy: 1.5 × 15,000 = Rs 22,500. Cap check: 40% × 85,000 = Rs 34,000. Effective subsidy: Rs 22,500 (below cap). Customer price: Rs 62,500 + taxes/dealer margin. Example 2: Premium scooter with 3 kWh battery, ex-factory price Rs 1,20,000. Calculated subsidy: 3 × 15,000 = Rs 45,000. Cap check: 40% × 1,20,000 = Rs 48,000. Effective subsidy: Rs 45,000 (below cap). Optimization insight: For premium vehicles, larger battery = higher absolute subsidy. For budget vehicles, may hit 40% cap quickly.

Electric 3-Wheeler Calculations: Subsidy rate: Rs 10,000 per kWh. Cap: 40% of ex-factory price. E-Rickshaw example: 3.5 kWh battery, ex-factory Rs 1,50,000. Subsidy: 3.5 × 10,000 = Rs 35,000. Cap: 40% × 1,50,000 = Rs 60,000. Effective: Rs 35,000. L5 Cargo example: 7 kWh battery, ex-factory Rs 3,00,000. Subsidy: 7 × 10,000 = Rs 70,000. Cap: 40% × 3,00,000 = Rs 1,20,000. Effective: Rs 70,000.

Electric 4-Wheeler Calculations: Subsidy rate: Rs 10,000 per kWh. Cap: Rs 1,50,000 per vehicle (absolute cap, not percentage). Note: Only commercial vehicles eligible (taxi, fleet, corporate). Example: Commercial taxi with 30 kWh battery, ex-factory Rs 12,00,000. Calculated subsidy: 30 × 10,000 = Rs 3,00,000. Cap: Rs 1,50,000 (absolute). Effective subsidy: Rs 1,50,000 (capped). Customer price benefit: Rs 10,50,000 + taxes.

Electric Bus Calculations: Subsidy rate: Rs 20,000 per kWh. Caps: Rs 50 lakh for 12m bus, Rs 35 lakh for 9m bus. Example: 12m city bus with 300 kWh battery. Calculated subsidy: 300 × 20,000 = Rs 60 lakh. Cap: Rs 50 lakh. Effective: Rs 50 lakh. Bus cost reduction from Rs 1.2 crore to Rs 70 lakh makes TCO competitive with diesel.

Price Optimization Strategy: Work backwards from target customer price. Consider competitive landscape (ICE equivalents, competing EVs). Factor in dealer margin (8-12% for 2W, 4-6% for 3W), GST (5% for EVs vs 28% for ICE), and state incentives. Model different battery configurations to find optimal subsidy capture.

Competitive Analysis: Compare effective customer price with: ICE equivalent (factor in Rs 1-2/km running cost difference), Competing EVs (feature-normalized comparison), Used vehicles (relevant for 3W segment). FAME II subsidy should enable EV price within 20-30% of ICE equivalent for mass adoption.',
        '["Calculate detailed subsidy for each planned vehicle model across all variants - create spreadsheet with battery size, ex-factory price, calculated subsidy, cap check, and effective subsidy", "Optimize battery configuration for maximum subsidy benefit - model 3 scenarios: minimum range compliance, optimal subsidy capture, maximum range premium", "Model final customer price including ex-factory, subsidy, GST (5%), dealer margin, and state incentives - compare with ICE equivalent", "Create competitive pricing analysis comparing your subsidized price with 5 direct competitors and 3 ICE alternatives"]'::jsonb,
        '["FAME II Subsidy Calculator Excel with automated cap checks and optimization recommendations", "Battery Size Optimization Guide balancing range, cost, weight, and subsidy capture", "Customer Price Modeling Template with all cost components and margin waterfall", "EV vs ICE TCO Calculator showing 3-year and 5-year ownership cost comparison"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Localization Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        9,
        'Localization Requirements Under PMP',
        'The 50% domestic value addition requirement under FAME II is calculated using the Phased Manufacturing Program (PMP) methodology. Understanding and meeting this requirement is mandatory for subsidy eligibility and represents both compliance challenge and opportunity for cost optimization.

Phased Manufacturing Program (PMP) Background: Introduced in 2019 to boost domestic EV component manufacturing. Sets increasing localization targets over time. Currently requires minimum 50% domestic value addition. Future phases may increase to 60-70% by 2026-27.

Value Addition Calculation Methodology: Domestic Value Addition (DVA) = [(Total Vehicle Value - Value of Imported Components) / Total Vehicle Value] × 100. Total Vehicle Value: Ex-factory price including all components, assembly labor, overheads, and margins. Imported Components: CIF (Cost, Insurance, Freight) value of all imported parts.

Component-wise Treatment: Lithium-Ion Cells: Currently 100% imported; counts against localization. However, battery pack assembly in India adds domestic value (housing, BMS integration, wiring). Under PLI-ACC, domestically manufactured cells will count as local content from 2025. Motors: Imported motors count against DVA. Indian suppliers (Rexnord, Minda) available for BLDC motors. Domestic motor adds 8-12% to DVA. Controllers/Inverters: Mostly imported; significant opportunity for localization. Indian assembly with imported components provides partial credit. Chargers: Domestic manufacturing well-established (Delta, Exicom). Full domestic charger adds 3-5% to DVA.

Strategies to Achieve 50% DVA: Option 1: Maximum Local Sourcing. Source motors domestically (saves 10-15% import content), use Indian BMS (saves 3-5%), domestic charger (saves 3-5%), local fabrication for body/frame (adds 15-20%). Challenge: May compromise on quality/technology initially. Option 2: Local Assembly Focus. Import cells but assemble battery packs locally (adds 5-8% value), significant domestic content in vehicle body, chassis, wiring harness (adds 25-30%), labor-intensive assembly adds value (10-15%). Option 3: Strategic Component Mix. Import high-tech components (cells, controllers), localize commodity components (body, chassis, wiring, brakes, suspension), target 50-55% DVA with buffer for audit.

Documentation Requirements: Maintain supplier invoices distinguishing domestic vs imported. For each domestic supplier, obtain localization declaration. For imports, maintain customs documentation (Bill of Entry). Testing agency verifies calculations during certification.

Common Pitfalls: Underestimating imported content in domestic assemblies (e.g., domestic motor may contain imported magnets). Incorrect CIF valuation of imports. Missing documentation for supplier declarations. Changes in BOM post-certification affecting DVA.

Localization Roadmap: Year 1: Achieve 50% minimum through local assembly and commodity components. Year 2-3: Develop domestic motor and controller sourcing to reach 55-60%. Year 4+: Benefit from domestic cell manufacturing under PLI-ACC to reach 70%+.',
        '["Map your current/planned BOM with domestic vs imported classification for every component - calculate current DVA percentage", "Identify top 5 imported components by value and research domestic alternatives - get quotes from 3 Indian suppliers each", "Calculate value addition for each component considering assembly operations - determine path to 50%+ DVA", "Create 3-year localization roadmap with milestones for increasing DVA from 50% to 70% - identify supplier development requirements"]'::jsonb,
        '["PMP Calculation Methodology Guide with worked examples for 2W, 3W, and 4W vehicles", "Domestic EV Component Supplier Directory with 200+ suppliers categorized by component type and capability", "Localization Certificate Template with supporting documentation requirements", "DVA Improvement Roadmap Framework with component-wise localization potential and timeline"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: FAME II Compliance & Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        10,
        'FAME II Compliance & Reporting',
        'Ongoing FAME II compliance requires systematic processes for sales reporting, subsidy claims, and audit readiness. Non-compliance can result in subsidy recovery, penalties, and debarment from the scheme.

Sales Reporting Requirements: Monthly sales report submission through FAME portal by 10th of following month. Data required: Vehicle model, chassis number, motor number, battery number, dealer code, customer name, registration number, registration date, invoice amount. Sales count must match RTO registration data (verified through VAHAN integration).

Subsidy Claim Process: Claims submitted monthly or quarterly (OEM choice). Claim documentation: Sales register, registration certificates (RC), dealer invoices, bank account details. Verification: MHI cross-checks with VAHAN database. Processing time: 60-90 days for claim settlement. Payment: Direct transfer to OEM bank account. Typical claim rejection reasons: RC not matching sales data (15%), dealer not registered (10%), vehicle specifications mismatch (10%), documentation incomplete (25%).

Audit Framework: Regular audits conducted by MHI empaneled agencies. Audit scope: Sales data verification, localization compliance, technical specification adherence. Random sample: 5-10% of claimed vehicles physically inspected. Factory audit: Production records, component sourcing, quality systems. Document retention: Maintain records for 7 years post-claim.

Compliance Calendar: Monthly (by 10th): Sales report submission. Quarterly: Subsidy claims, compliance self-certification. Annually: Localization certificate renewal, capacity utilization report. As required: Audit cooperation, specification change intimation.

Common Compliance Issues: Dealer Network Issues: Unauthorized dealers selling FAME vehicles (subsidy not claimable), dealer GST registration lapses, dealer location changes not updated. Vehicle Specification Issues: Post-certification modifications affecting eligibility, range degradation in field vs test conditions, software updates changing performance parameters. Localization Issues: Supplier changes affecting DVA calculation, imported content in domestic assemblies not accounted, documentation gaps for value addition.

Penalty Framework: Subsidy recovery: Full subsidy plus 15% penalty for non-compliance. Interest: 18% per annum on recovered amounts. Debarment: Serious violations can lead to 1-3 year scheme exclusion. Criminal liability: Fraudulent claims can attract prosecution.

Best Practices: Implement ERP system tracking every vehicle from production to registration. Conduct monthly internal audits of sales data accuracy. Maintain real-time localization tracking with supplier integration. Build relationships with MHI officials through industry associations. Keep buffer documentation beyond minimum requirements.',
        '["Set up internal compliance management system - create monthly reporting calendar with responsibilities and checklists", "Design documentation workflow from vehicle production through registration with audit trail", "Conduct mock audit of your current sales and localization documentation - identify gaps", "Establish relationship contacts at DHI and CESL - attend industry association meetings for policy updates"]'::jsonb,
        '["FAME II Compliance Calendar Template with automated reminders and task assignments", "Sales Data Management System Requirements for ERP integration with VAHAN", "Audit Preparation Guide with sample audit queries and recommended documentation", "Compliance Issue Resolution Framework with escalation matrix and penalty mitigation strategies"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: PLI Scheme Navigation (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'PLI Scheme Navigation',
        'Access Rs 44,000+ crore in PLI schemes - Rs 18,100 crore for Advanced Chemistry Cells and Rs 25,938 crore for Auto Components. Master eligibility criteria, application strategies, and compliance requirements for production-linked incentives.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_3_id;

    -- Day 11: PLI ACC Battery Scheme
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        11,
        'PLI ACC Battery Scheme Deep Dive',
        'The PLI scheme for Advanced Chemistry Cell (ACC) manufacturing represents India''s most ambitious push for battery self-reliance with Rs 18,100 crore outlay over 5 years. While direct participation requires massive capital, understanding the scheme creates partnership and supply chain opportunities.

Scheme Structure: Total outlay: Rs 18,100 crore. Incentive: Rs 2,000-3,000/kWh based on domestic value addition achieved. Duration: 5 years of incentives post commercial production commencement. Target: 50 GWh domestic cell manufacturing capacity.

Selected Beneficiaries (March 2022): Ola Electric: 20 GWh capacity, investing Rs 7,500 crore in Tamil Nadu gigafactory. Technology: In-house cell development, NMC and LFP chemistries. Timeline: Commercial production expected 2025-26. Rajesh Exports: 5 GWh capacity, proposed investment Rs 4,000 crore in Karnataka. Status: Project under development, technology partnerships being finalized. Hyundai Global Motors: 20 GWh capacity (consortium bid), investment Rs 5,000+ crore. Partners: LG Energy Solution for technology. Location: Tamil Nadu. Reliance New Energy: 5 GWh capacity (acquired through Faradion UK), sodium-ion technology focus. Amara Raja Advanced Cell Technologies: 16 GWh capacity through Gotion High-Tech (China) partnership.

Eligibility Requirements: Minimum manufacturing capacity: 5 GWh at single location. Minimum investment: Rs 225 crore per GWh (total Rs 1,125 crore for 5 GWh). Domestic value addition: 25% in Year 1, increasing to 60% by Year 5. Technology requirements: Mother unit capability (cell to pack), energy density minimums. Bidding parameter: Lowest incentive sought per kWh.

Incentive Structure: Base incentive: Rs 2,000/kWh for 25% DVA. Enhanced incentive: Rs 2,750/kWh for 45% DVA, Rs 3,000/kWh for 60% DVA. Disbursement: Based on actual production and sales to domestic customers. Cap: Total incentive limited to bid commitment over 5 years.

Opportunities for Non-Selected Companies: Component Supply: Cell manufacturers need raw materials (graphite, electrolyte, separators, current collectors), equipment (coating machines, calendering, formation), and services (testing, quality). Current suppliers largely Chinese - opportunity for domestic development. Technology Licensing: Global cell technology providers seeking India entry. Partnership opportunity for smaller players with manufacturing capabilities. Second Tranche: Government considering PLI-ACC 2.0 for additional capacity. Window for new applicants possible in 2024-25. Equipment Manufacturing: Cell manufacturing equipment opportunity. Coating machines, dry rooms, formation equipment largely imported. Battery Recycling: Selected PLI-ACC beneficiaries will generate significant scrap. Recycling capacity needed - Attero, Lohum emerging players.',
        '["Study PLI ACC scheme guidelines in detail - understand eligibility, incentive calculation, and compliance requirements", "Assess realistic participation potential - calculate capital requirements and technology needs for minimum 5 GWh capacity", "Identify partnership opportunities with selected beneficiaries - map supply chain needs and your potential contribution", "Create business case for component supply or services to PLI-ACC beneficiaries - target at least 2 potential customers"]'::jsonb,
        '["PLI-ACC Complete Scheme Document with incentive calculation methodology and compliance matrix", "Selected Beneficiary Analysis with project status, technology approach, and supply chain requirements", "Cell Manufacturing Supply Chain Map with domestic vs import analysis for equipment and materials", "Partnership Opportunity Framework for engaging with PLI-ACC beneficiaries"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: PLI Auto Components Scheme
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        12,
        'PLI Auto Components Scheme',
        'The PLI scheme for Automobile and Auto Components offers Rs 25,938 crore over 5 years, specifically targeting EV components, hydrogen fuel cells, and advanced automotive technology. This scheme has more accessible entry points for mid-sized companies compared to PLI-ACC.

Scheme Overview: Total outlay: Rs 25,938 crore. Duration: FY 2023-24 to FY 2027-28. Two categories: Champion OEM Incentive (for vehicle manufacturers) and Component Champion Incentive (for component manufacturers).

Champion OEM Incentive: Minimum investment: Rs 2,000 crore over 5 years (Group A) or Rs 500 crore (Group B). Applicable sales: Electric vehicles, hydrogen fuel cell vehicles, from 3rd year onwards. Incentive rate: 13-18% of determined sales value in Year 1, declining over 5 years. Eligible OEMs: Tata Motors, Mahindra, Suzuki, and others have applied. Total allocation: Rs 7,680 crore.

Component Champion Incentive: Minimum investment: Rs 250 crore (Category A) or Rs 50 crore (Category B1) or Rs 10 crore (Category B2). Focus areas: EV components (motors, controllers, battery systems, chargers), hydrogen fuel cell components, advanced technology products. Incentive rate: 8-13% of incremental sales for Component Champions. Total allocation: Rs 18,258 crore across 80+ selected companies.

EV Component Categories Covered: Category 1 - EV Powertrain: Permanent magnet motors (PMSM), motor controllers/inverters, integrated drive units. Typical investment Rs 50-200 crore. Category 2 - Battery Systems: Battery management systems (BMS), battery packs (assembly with domestic cells), thermal management systems. Investment Rs 30-150 crore. Category 3 - Charging Equipment: AC chargers (3.3-22 kW), DC fast chargers (50-150 kW), charging connectors and cables. Investment Rs 20-100 crore. Category 4 - Electronic Components: Vehicle control units, power electronics, on-board diagnostic systems. Investment Rs 20-100 crore.

Application and Selection: Applications through MHI portal (closed for current tranche). Evaluation criteria: Investment commitment, technology capability, export potential, employment generation. Selected applicants sign agreement with MHI specifying targets. Performance milestones verified annually.

Compliance Requirements: Achieve minimum domestic value addition (starts at 50%, increases annually). Meet investment commitments within specified timelines. Achieve sales targets (base year + incremental growth). Submit quarterly reports on production, sales, employment. Subject to annual audits by empaneled agencies.

Incentive Calculation Example: Year 3 Component Champion (Category B2, Rs 10 Cr investment). Base year determined sales: Rs 50 crore. Year 3 actual sales: Rs 80 crore. Incentive rate: 10% of incremental. Incentive: 10% × (80-50) = Rs 3 crore. Total 5-year incentive potential: Rs 15-25 crore for Rs 10 Cr investment.',
        '["Review PLI Auto Components scheme document - identify categories applicable to your products or planned products", "Calculate minimum investment requirement and 5-year sales growth targets for your eligible category", "Prepare capability assessment: technology readiness, manufacturing infrastructure, quality certifications", "Monitor MHI announcements for future PLI tranches - prepare application readiness documentation"]'::jsonb,
        '["PLI Auto Components Scheme Document with category-wise eligibility and incentive rates", "Selected Applicant List with investment commitments and product categories", "Investment and Sales Target Calculator for different PLI categories", "Application Readiness Checklist covering technology, manufacturing, and financial requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 13-15: Continue PLI module lessons...
    -- Day 13: PLI Application Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        13,
        'PLI Application Strategy',
        'Building a winning PLI application requires understanding evaluation criteria, preparing comprehensive documentation, and demonstrating long-term commitment to domestic manufacturing. While current tranches are closed, preparation for future rounds and understanding compliance is essential.

Evaluation Criteria Analysis: Investment Commitment (25% weightage): Higher investment scores better. Phased investment plan with milestones. Land acquisition, equipment ordering evidence strengthens application. Bank sanction letters for project financing.

Technology Capability (25% weightage): In-house R&D facilities and team. Patents, design registrations, proprietary technology. Technology transfer agreements with global partners. Product certifications (ISO, IATF 16949, AIS compliance).

Manufacturing Readiness (20% weightage): Existing manufacturing infrastructure. Factory layout, equipment specifications. Environmental clearances, factory licenses. Quality management systems.

Export Potential (15% weightage): Existing export track record. Export market identification and strategy. Global customer relationships or LOIs. FTA benefit utilization plan.

Employment Generation (15% weightage): Direct employment commitments. Skill development programs. Local hiring plans.

Detailed Project Report (DPR) Preparation: Executive Summary: Company background, project overview, investment and output targets. Market Analysis: Domestic and export market sizing, competitive landscape, growth projections. Technical Plan: Product specifications, manufacturing process, technology source, capacity planning. Financial Projections: 5-year P&L, balance sheet, cash flows. Investment detailed breakup. Unit economics showing viability post-incentive. Implementation Timeline: Month-wise project milestones, equipment delivery, commissioning, production ramp-up. Risk Analysis: Technology risks, market risks, policy risks with mitigation strategies.

Application Documentation: Corporate Documents: Company registration, PAN, GST, audited financials (3 years), board resolution. Technical Documents: Product specifications, test certifications, technology agreements. Financial Documents: Project financing letters, promoter contribution evidence, bank statements. Statutory Documents: Environmental clearance, factory license, land documents.

Common Application Mistakes: Unrealistic sales projections (30%+ annual growth difficult to justify). Inadequate technology demonstration (no working prototype or certifications). Weak financial backing (insufficient promoter contribution). Incomplete documentation (missing clearances or approvals). Poor presentation (unclear DPR, inconsistent data).

Post-Selection Strategy: Execute MoU with MHI within specified timeline. Begin investment deployment per committed schedule. Establish compliance monitoring systems. Build relationship with MHI officials for smooth operations.',
        '["Create comprehensive Detailed Project Report (DPR) for PLI application - follow standard format with all required sections", "Compile technology capability documentation: patents, certifications, R&D team credentials, technology partnerships", "Prepare 5-year financial projections with sensitivity analysis on key assumptions", "Build investment commitment evidence: land, equipment quotes, bank sanctions, promoter contribution proof"]'::jsonb,
        '["PLI DPR Template with section-by-section guidance and sample content", "Financial Model Template for PLI application with incentive calculation", "Technology Capability Documentation Guide with evidence requirements", "Common PLI Application Mistakes Analysis with correction strategies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: Combining FAME II and PLI Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        14,
        'Combining FAME II and PLI Benefits',
        'Strategic scheme stacking can maximize government support by combining demand-side incentives (FAME II) with supply-side incentives (PLI). A well-structured entity can access multiple schemes simultaneously, significantly improving project economics.

Scheme Stacking Framework: Demand Side (FAME II): Benefits vehicle buyers through purchase subsidy. Claimed by OEM on behalf of customer. Reduces effective vehicle price, boosting demand. Supply Side (PLI Auto): Benefits manufacturers through production incentive. Based on incremental sales growth. Improves manufacturing margins and investment returns. Battery Supply (PLI-ACC): Benefits cell manufacturers. Claimed by cell producers, passed through as lower component cost.

Dual Benefit Example - EV 2W Manufacturer: FAME II Benefit: Selling 50,000 scooters annually. Average battery: 2.5 kWh, average subsidy Rs 37,500/vehicle. Total annual FAME II benefit: Rs 187.5 crore (claimed on behalf of customers). PLI Auto Benefit: Component Champion with Rs 50 crore investment. Base year sales Rs 150 crore, Year 3 sales Rs 300 crore. Incremental sales Rs 150 crore × 10% incentive = Rs 15 crore. Combined benefit: Rs 202.5 crore annually enhancing viability.

Entity Structuring Considerations: Single Entity Approach: One company handles manufacturing and sales. Simpler compliance but concentration of risk. FAME II and PLI compliance in same entity. Separate Entities Approach: Manufacturing company claims PLI. Sales/distribution company handles FAME II. Transfer pricing must be arm''s length. More complex but better risk segregation.

Additional Scheme Layering: State Incentives: Gujarat capital subsidy (Rs 12,000/kWh for manufacturing), Maharashtra incentive package, Tamil Nadu EV policy benefits. MSME Benefits: Credit guarantee (CGTMSE), interest subvention, technology upgradation. Export Incentives: RoDTEP (Remission of Duties), SEZ benefits for export-focused units. R&D Benefits: Section 35(2AB) weighted deduction for R&D expenses.

Compliance Integration: Create unified compliance calendar covering all schemes. Single MIS system tracking production, sales, investment across schemes. Integrated audit preparation (documents satisfy multiple schemes). Common documentation repository with version control.

Risk Management: Scheme Discontinuation Risk: FAME II successor scheme uncertainty. Build business model viable without subsidies as target. Policy Change Risk: Localization requirements, subsidy rates may change. Build buffer in projections. Compliance Risk: Multiple schemes mean multiple audit exposures. Invest in robust documentation. Clawback Risk: Non-compliance can trigger subsidy recovery. Conservative claims, buffer documentation.

Case Study - Ola Electric: Accessing multiple schemes simultaneously: FAME II demand incentives for scooter sales, PLI-ACC for cell manufacturing (20 GWh), PLI Auto for vehicle manufacturing, Tamil Nadu state incentives. Combined government support could exceed Rs 2,000 crore over 5 years.',
        '["Map all applicable government schemes for your EV business - list eligibility status, potential benefit, and compliance requirements", "Calculate combined 5-year benefit potential from FAME II + PLI + state incentives - model conservative, base, and optimistic scenarios", "Design entity structure for optimal scheme capture - consider single vs multiple entities, implications for compliance", "Create unified compliance calendar and documentation system covering all applicable schemes"]'::jsonb,
        '["Multi-Scheme Benefit Calculator with FAME II, PLI, and state incentive integration", "Entity Structure Decision Framework for EV ventures with tax and compliance implications", "Unified Compliance Management System design requirements", "Scheme Stacking Case Studies from Ola Electric, Ather, and Tata Motors"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: State-Level EV Incentives
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        15,
        'State-Level EV Incentives Deep Dive',
        'State EV policies provide additional incentive layers that can significantly impact manufacturing location decisions and consumer pricing. With 25+ states having dedicated EV policies, understanding comparative advantages is crucial for strategic planning.

Gujarat EV Policy 2021: Consumer Incentives: 100% road tax and registration fee exemption. Rs 10,000 subsidy for e-2W, Rs 20,000 for e-3W, Rs 1.5 lakh for e-4W (capped). Manufacturing Incentives: Capital subsidy 12% of fixed capital investment (max Rs 30 crore). Interest subsidy 7% for 5 years. Rs 12,000/kWh for battery manufacturing. Stamp duty exemption. Infrastructure: Rs 3 lakh subsidy per public charger. Special EV industrial zones proposed. Advantages: Strong auto component ecosystem, port access for imports/exports, GIFT City for financing.

Maharashtra EV Policy 2021: Consumer Incentives: 100% road tax exemption. Rs 5,000/kWh subsidy for 2W (max Rs 10,000), Rs 5,000/kWh for 3W (max Rs 30,000). Early bird incentive 15% for first 1 lakh vehicles. Manufacturing Incentives: 15% capital subsidy (max Rs 50 crore). 100% stamp duty exemption. Power tariff subsidy Rs 1/unit. Advantages: Existing auto hub (Pune, Chakan), skilled workforce, proximity to ports.

Karnataka EV Policy 2017 (Updated 2021): Consumer Incentives: 100% exemption on road tax and registration. Additional incentive Rs 10,000 for 2W, Rs 30,000 for 3W. Manufacturing Incentives: 15% capital subsidy (max Rs 30 crore). Land at subsidized rates in industrial areas. Interest subsidy 5% for 5 years. Advantages: IT ecosystem (Bangalore), R&D talent, startup ecosystem, Ather and TVS presence.

Tamil Nadu EV Policy 2023: Consumer Incentives: 100% road tax exemption. Manufacturing Incentives: 15% capital subsidy on investments above Rs 50 crore. 100% stamp duty exemption. Employment subsidy Rs 5,000/person/month for first year. Special incentives in Hosur, Sriperumbudur auto clusters. Advantages: Chennai auto corridor, port access, skilled workforce, Ola gigafactory location.

Telangana EV Policy 2020: Consumer Incentives: 100% road tax exemption, registration fee waiver. 100% SGST reimbursement on EV purchases. Manufacturing Incentives: 20% capital subsidy (max Rs 20 crore). 50% net SGST reimbursement for 10 years. Land allotment at reserved prices. Advantages: Hyderabad talent pool, aerospace/defense manufacturing expertise, renewable energy availability.

Delhi EV Policy 2020: Consumer Incentives: Rs 5,000/kWh subsidy for 2W (max Rs 30,000), 3W (max Rs 30,000). Road tax and registration exemption. Rs 30,000 scrapping incentive for replacing ICE vehicle. Low-interest financing with 5% interest subvention. Advantages: Largest passenger vehicle market, captive demand for commercial EVs.

Location Decision Framework: Score states on: Consumer market size, manufacturing incentive value, infrastructure availability, talent pool, supply chain ecosystem, ease of doing business, power costs, logistics connectivity. Different strategies for different businesses: Consumer-facing: Locate near major markets (Maharashtra, Delhi, Karnataka). Export-focused: Gujarat (port), Tamil Nadu (port + ecosystem). Component manufacturing: Proximity to OEM customers critical.',
        '["Create detailed comparison matrix for top 5 state EV policies relevant to your business - consumer incentives, manufacturing incentives, infrastructure support", "Calculate location-wise total incentive value over 5 years combining state + central schemes", "Visit shortlisted states to assess: industrial areas, talent availability, infrastructure, and actual policy implementation", "Apply for applicable state-level incentives - prepare documentation as per state industrial policy requirements"]'::jsonb,
        '["State EV Policy Comparison Matrix with 25 states ranked on 15 parameters", "Location Decision Calculator with weighted scoring for different business types", "State Industrial Policy Contact Directory with nodal officers and application portals", "State Incentive Application Templates for Gujarat, Maharashtra, Karnataka, Tamil Nadu"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Commit Module 3
    RAISE NOTICE 'Modules 1-3 created successfully';

END $$;

COMMIT;
