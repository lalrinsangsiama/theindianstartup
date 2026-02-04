-- THE INDIAN STARTUP - P24: Manufacturing & Make in India Mastery - Enhanced Content
-- Migration: 20260204_024_p24_manufacturing_enhanced.sql
-- Purpose: Enhance P24 course content to 500-800 words per lesson with India-specific manufacturing data
-- Course: 55 days, 11 modules covering complete manufacturing startup journey in India

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
    -- Get or create P24 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P24',
        'Manufacturing & Make in India Mastery',
        'Complete guide to manufacturing startups in India - 11 modules covering Make in India initiative, 13 PLI schemes worth Rs 1.97 lakh crore, factory setup and industrial licensing, BIS certification, quality standards, manufacturing technology, lean operations, export strategies, defense manufacturing, and semiconductor opportunities. Master MSME classification, Udyam registration, Factory Act compliance, and pollution control clearances.',
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P24';
    END IF;

    -- Clean existing modules and lessons for P24
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Make in India Overview (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Make in India Overview',
        'Understand India''s manufacturing ecosystem comprehensively - the Make in India initiative, manufacturing sector contribution to GDP, key policy frameworks, competitive advantages, and emerging opportunities across 27 focus sectors.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_1_id;

    -- Day 1: Make in India Initiative
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        1,
        'Make in India Initiative Deep Dive',
        'The Make in India initiative, launched in September 2014, represents India''s most ambitious manufacturing transformation program. The vision: transform India into a global manufacturing hub, increase manufacturing sector contribution to GDP from 16% to 25%, and create 100 million additional jobs by 2025. While targets have been revised, the initiative has fundamentally reshaped India''s industrial policy landscape.

Key Objectives: Facilitate investment both domestic and foreign in manufacturing. Foster innovation and protect intellectual property. Build best-in-class manufacturing infrastructure. Develop a skilled workforce for industry needs. Create a conducive business environment through policy reforms.

27 Focus Sectors: Make in India identifies 27 sectors with high growth potential. Priority sectors include: Automobiles and Auto Components (Rs 7.5 lakh crore industry), Pharmaceuticals (India supplies 20% of global generics), Textiles (second largest employer after agriculture), Electronics (target Rs 26 lakh crore by 2025), Defense (Rs 1 lakh crore+ annual procurement), Food Processing (Rs 40 lakh crore market), Chemicals (6th largest globally), and emerging sectors like Semiconductors and Medical Devices.

Policy Framework Evolution: National Manufacturing Policy 2011 set foundation with National Investment and Manufacturing Zones (NIMZs). Make in India 2.0 (2019) added focus on 12 champion sectors. PLI schemes (2020-2023) added Rs 1.97 lakh crore production incentives. PM Gati Shakti (2021) integrated infrastructure for manufacturing corridors.

Progress and Impact: FDI inflows doubled from $36 billion (2013-14) to $83 billion (2021-22). India''s Ease of Doing Business ranking improved from 142 (2014) to 63 (2019). Manufacturing GVA grew from Rs 17 lakh crore (2014) to Rs 28 lakh crore (2023). Electronics manufacturing increased from $29 billion (2014) to $105 billion (2023). Defense exports grew from Rs 1,521 crore (2016-17) to Rs 15,920 crore (2022-23).

Competitive Advantages: Large domestic market (1.4 billion consumers), young workforce (median age 28), competitive labor costs ($2-3/hour vs $6-8 in China), improving infrastructure, English-speaking talent pool, and democracy providing policy stability.

Challenges Remain: Land acquisition complexities, power cost and reliability issues, logistics costs (14% of GDP vs 8% global average), regulatory compliance burden, skill gaps in technical areas, and scale limitations for many MSMEs.',
        '["Study the Make in India portal and identify your sector''s specific opportunities, incentives, and policy support available", "Analyze India''s competitive position in your target manufacturing sector vs China, Vietnam, and other competing nations", "Map the complete policy ecosystem applicable to your manufacturing venture - central, state, and sector-specific schemes", "Identify top 5 challenges for manufacturing in your sector and research successful companies that overcame them"]'::jsonb,
        '["Make in India Sector Analysis Framework with 27 sectors evaluated on growth potential and policy support", "India Manufacturing Competitiveness Report comparing cost structures across major manufacturing nations", "Policy Ecosystem Navigator mapping 100+ schemes relevant to manufacturing ventures", "Manufacturing Success Stories compilation with strategies from 20 Indian manufacturing champions"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Manufacturing Sector Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        2,
        'Manufacturing Sector Landscape in India',
        'India''s manufacturing sector represents a Rs 45 lakh crore opportunity with distinct characteristics across heavy, light, and process industries. Understanding sectoral dynamics, value chains, and entry points is essential for strategic positioning.

Heavy Manufacturing: Automobiles and Auto Components: Rs 7.5 lakh crore industry, 4th largest globally. OEMs include Maruti, Tata, Mahindra, Hyundai. Tier 1 suppliers: Motherson Sumi, Bharat Forge, Bosch India. Entry through Tier 2/3 component manufacturing (Rs 10-50 crore investment). Steel and Metals: Rs 5.5 lakh crore industry, 2nd largest producer globally. Major players: Tata Steel, JSW, SAIL, Jindal. Downstream opportunities in specialty steel, fabrication, precision components. Capital Goods: Rs 3.5 lakh crore covering machinery, equipment, tools. Growing domestic capability in CNC machines, textile machinery, packaging equipment.

Light Manufacturing: Electronics: Rs 8 lakh crore industry, fastest growing segment. Mobile phones (Rs 2.75 lakh crore), consumer electronics, industrial electronics. PLI driving domestic manufacturing. Textiles and Apparel: Rs 10 lakh crore industry, largest employer in manufacturing. Technical textiles growing at 12% CAGR. PM MITRA parks creating integrated manufacturing zones. Consumer Goods: FMCG manufacturing, home appliances, furniture. Large unorganized sector creating consolidation opportunities.

Process Industries: Pharmaceuticals: Rs 4.5 lakh crore industry, pharmacy of the world. API manufacturing push through PLI (Rs 15,000 crore scheme). Formulation exports to 200+ countries. Chemicals and Petrochemicals: Rs 6 lakh crore industry, import substitution opportunity. Specialty chemicals, agrochemicals, dyes growing rapidly. Food Processing: Rs 40 lakh crore market, only 10% processed. PM Kisan SAMPADA targeting infrastructure development.

Regional Manufacturing Clusters: Western India (Maharashtra, Gujarat): Automobiles, chemicals, pharmaceuticals, textiles. Southern India (Tamil Nadu, Karnataka, Andhra Pradesh): Electronics, automobiles, aerospace. Northern India (Delhi NCR, Punjab, Haryana): Auto components, textiles, light engineering. Eastern India (West Bengal, Odisha): Steel, mining equipment, jute.

Value Chain Positioning: OEM/Brand Owner: Highest margins, highest capital and brand investment. Contract Manufacturer: Lower margins but predictable volumes, OEM relationships key. Component Supplier: Tier 1 (systems), Tier 2 (sub-assemblies), Tier 3 (parts). Typical progression: start as Tier 3, build capability to move up.',
        '["Map your target sector''s complete value chain - identify major players at each tier and typical investment requirements", "Analyze regional manufacturing clusters for your sector - evaluate infrastructure, talent, supply chain ecosystem", "Identify your optimal value chain position based on capital, capability, and competitive dynamics", "Research sector-specific entry barriers and strategies used by successful entrants"]'::jsonb,
        '["Manufacturing Sector Deep Dive Reports for 15 major sectors with market size, growth, and key players", "Regional Manufacturing Cluster Analysis with infrastructure, talent, and incentive comparison", "Value Chain Positioning Framework with entry strategies for different capability levels", "Sector Entry Barrier Analysis with mitigation strategies from successful companies"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: MSME Classification and Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        3,
        'MSME Classification and Udyam Registration',
        'Micro, Small and Medium Enterprises (MSMEs) form the backbone of Indian manufacturing with 6.3 crore enterprises contributing 30% of GDP and 45% of exports. Understanding MSME classification and leveraging associated benefits is crucial for manufacturing startups.

Revised MSME Classification (2020): Based on composite criteria of Investment and Turnover. Micro Enterprise: Investment up to Rs 1 crore, Turnover up to Rs 5 crore. Small Enterprise: Investment up to Rs 10 crore, Turnover up to Rs 50 crore. Medium Enterprise: Investment up to Rs 50 crore, Turnover up to Rs 250 crore. Note: Investment in plant and machinery only (land and building excluded). Turnover excludes exports (encouraging export-oriented MSMEs).

Udyam Registration Process: Replaced UAM (Udyog Aadhaar Memorandum) from July 2020. Completely online through udyamregistration.gov.in. Requirements: Aadhaar number, PAN, GST (if applicable), bank account details. Self-declaration based, no documents upload required. Automatic verification through government databases. Registration number format: UDYAM-XX-00-0000000. Free of cost, single registration valid nationwide.

Key MSME Benefits: Credit Access: Priority sector lending (40% of bank credit targeted to MSMEs). CGTMSE: Credit Guarantee up to Rs 5 crore without collateral. Interest subvention of 2% on loans up to Rs 1 crore. MUDRA loans for micro enterprises up to Rs 10 lakh. Emergency Credit Line Guarantee Scheme (ECLGS) during crises.

Government Procurement: 25% mandatory procurement from MSMEs by central government. 4% reserved for SC/ST entrepreneurs. 3% reserved for women entrepreneurs. GeM (Government e-Marketplace) registration enables direct selling. No EMD (Earnest Money Deposit) required from MSMEs.

Regulatory Benefits: Delayed payment protection (45 days mandatory payment by buyers). MSME Samadhaan portal for delayed payment disputes. Exemption from certain labor law inspections. Simplified environmental compliance for low-risk activities.

Tax and Duty Benefits: Reduced corporate tax rate of 15% for new manufacturing companies (Sec 115BAB). No MAT (Minimum Alternate Tax) applicability. Accelerated depreciation on plant and machinery. Concessional customs duty on capital goods imports.

Technology and Quality Support: CLCSS (Credit Linked Capital Subsidy Scheme): 15% subsidy on technology upgradation up to Rs 15 lakh. ZED Certification: Zero Defect Zero Effect manufacturing quality certification. Technology Centers: 18 MSME Technology Centers providing technical support. Testing facilities at subsidized rates through MSME Testing Centers.',
        '["Complete Udyam Registration for your manufacturing enterprise - ensure correct classification based on investment and turnover projections", "Map all MSME benefits applicable to your venture - create benefit realization roadmap with application timelines", "Apply for CGTMSE coverage for your working capital and term loan requirements", "Register on GeM portal and identify government procurement opportunities in your product category"]'::jsonb,
        '["MSME Classification Calculator with investment and turnover scenarios", "Udyam Registration Step-by-Step Guide with screenshots and common issues resolution", "MSME Benefit Navigator covering 50+ schemes with eligibility and application process", "Government Procurement Opportunity Guide with GeM registration and bidding strategies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Manufacturing Business Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        4,
        'Manufacturing Business Models in India',
        'Selecting the right manufacturing business model significantly impacts capital requirements, risk profile, and scalability. Indian manufacturing offers multiple proven models from asset-heavy OEM to asset-light trading with manufacturing tie-ups.

Own Manufacturing (OEM Model): Full control over production quality and capacity. Highest capital requirement (Rs 5-500 crore depending on sector). Maximum margins but highest risk. Requirements: Factory setup, equipment, workforce, working capital. Best for: Proprietary products, quality-critical sectors, large scale operations. Examples: Dixon Technologies (electronics), Varroc (auto components), Havells (electricals).

Contract Manufacturing (CM): Manufacturing for other brands/OEMs. Lower risk with guaranteed volumes through contracts. Margins: 8-15% depending on value addition. Key success factors: Quality consistency, cost efficiency, delivery reliability. Growing model in electronics (Foxconn, Wistron in India for Apple). Best for: Scale operations without brand building, technical capability focus.

Original Design Manufacturing (ODM): Design and manufacture for others to sell under their brand. Higher margins than pure CM (15-25%). Requires R&D capability and design team. Examples: Many Indian pharma companies for global generics. Best for: Technical expertise with limited brand/distribution capability.

Assembly Operations: Lower capital than full manufacturing. Import CKD/SKD kits, assemble locally. Typical in electronics, automobiles (initially). Phased Manufacturing Program (PMP) pushing towards full manufacturing. Best for: Market testing before full manufacturing investment.

Job Work/Tolling: Process raw materials provided by customer. Minimal working capital as materials supplied. Focus on specialized processing capability. Common in textiles, chemicals, food processing. Best for: Specialized capability monetization.

Trading with Manufacturing Tie-up: Asset-light model with outsourced manufacturing. Focus on brand, design, and distribution. Requires strong supplier management capability. Popular in consumer goods, fashion, home decor. Best for: Brand-focused entrepreneurs with limited capital.

Hybrid Models: Many successful companies combine models. Example: Own manufacturing for core products, contract manufacturing for seasonal demand. Example: Assembly operations transitioning to full manufacturing as scale builds.

Model Selection Framework: Assess based on: Available capital, technical expertise, market access, risk appetite, competitive dynamics. Key question: Where is your competitive advantage - manufacturing efficiency, design capability, brand/distribution, or technical specialization?',
        '["Evaluate 3 manufacturing business models for your product - compare capital requirements, margins, risks, and scalability", "Identify successful companies in your sector using each model - analyze their strategies and evolution", "Calculate detailed financials for your preferred model - investment, working capital, unit economics, break-even", "Design hybrid model strategy if applicable - what to manufacture in-house vs outsource"]'::jsonb,
        '["Manufacturing Business Model Comparison Framework with 6 models evaluated on 10 parameters", "Sector-wise Business Model Analysis showing predominant models and success patterns", "Financial Model Templates for each manufacturing business model with unit economics", "Business Model Transition Roadmap for evolving from asset-light to full manufacturing"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Manufacturing Location Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        5,
        'Manufacturing Location Strategy',
        'Location selection is among the most critical and irreversible decisions for manufacturing ventures. A structured evaluation framework considering infrastructure, talent, incentives, and ecosystem factors can significantly impact long-term competitiveness.

Key Location Factors: Infrastructure: Power availability and cost (ranges from Rs 5-12/unit across states). Water supply reliability and cost. Road connectivity to markets and ports. Rail connectivity for bulk movement. Proximity to airports for time-sensitive logistics.

Talent Availability: Technical workforce availability (ITI graduates, diploma holders, engineers). Labor cost variations (Rs 12,000-25,000/month for skilled workers across states). Industrial relations history (strike-prone vs stable regions). Training infrastructure (ITIs, polytechnics, engineering colleges).

Supply Chain Ecosystem: Raw material proximity. Vendor cluster availability. Logistics service providers. Customs and port proximity for imports/exports.

Policy Environment: State industrial policy incentives. Land acquisition process and costs. Single window clearance effectiveness. Labor law implementation (stringency varies by state).

Top Manufacturing Destinations by Sector: Electronics: Tamil Nadu (Chennai corridor), Karnataka (Bangalore), Uttar Pradesh (Noida), Andhra Pradesh (Sri City). Automobiles: Maharashtra (Pune-Chakan), Tamil Nadu (Chennai), Gujarat (Sanand), Haryana (Gurugram-Manesar). Pharmaceuticals: Hyderabad, Ahmedabad, Baddi (Himachal), Sikkim (tax benefits). Textiles: Tamil Nadu (Tirupur, Coimbatore), Gujarat (Surat, Ahmedabad), Karnataka (Bangalore). Chemicals: Gujarat (Dahej, Ankleshwar), Maharashtra (MIDC areas), Andhra Pradesh (Vizag).

Industrial Areas and Parks: State Industrial Development Corporations: GIDC (Gujarat), MIDC (Maharashtra), SIPCOT (Tamil Nadu), APIIC (Andhra Pradesh). Special Economic Zones: 268 operational SEZs with export incentives. National Investment and Manufacturing Zones: Delhi-Mumbai Industrial Corridor, Chennai-Bangalore Industrial Corridor. Private Industrial Parks: Growing trend with better infrastructure and services.

Location Evaluation Process: Create shortlist based on sector fit and primary requirements. Visit shortlisted locations, meet existing industrialists. Compare costs: land, power, water, labor, logistics comprehensively. Evaluate incentives and ease of actual disbursement. Assess scalability - room for future expansion. Final decision based on total cost of operations over 10 years, not just incentives.',
        '["Create location evaluation matrix for your manufacturing venture with weighted scoring on 15+ parameters", "Visit top 3 shortlisted locations - meet local industries, assess infrastructure quality, understand actual implementation challenges", "Calculate total cost of operations for each location over 5 years including all factors", "Negotiate with state industrial development corporation for best available plot and incentive package"]'::jsonb,
        '["Manufacturing Location Evaluation Matrix with customizable weights for different manufacturing types", "State Industrial Policy Comparison covering top 15 manufacturing states", "Industrial Area Directory with 500+ locations evaluated on infrastructure and connectivity", "Location Decision Case Studies from 10 manufacturing companies with decision frameworks"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: 13 PLI Schemes (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        '13 PLI Schemes Worth Rs 1.97 Lakh Crore',
        'Master the Production Linked Incentive schemes across 14 sectors with Rs 1.97 lakh crore total outlay. Understand eligibility criteria, incentive structures, application processes, and compliance requirements for accessing these transformational manufacturing incentives.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_2_id;

    -- Day 6: PLI Scheme Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        6,
        'PLI Schemes Overview and Structure',
        'Production Linked Incentive (PLI) schemes represent India''s most significant industrial policy intervention with Rs 1.97 lakh crore committed across 14 sectors over 5-6 years. These schemes aim to make Indian manufacturing globally competitive by providing incentives based on incremental sales.

PLI Scheme Philosophy: Move beyond input-based subsidies to output-linked incentives. Reward production and sales growth, not just investment. Create scale advantages for Indian manufacturing. Attract global supply chains to India. Build domestic champions in strategic sectors.

14 PLI Sectors with Outlay: Large Scale Electronics Manufacturing: Rs 40,951 crore. Automobiles and Auto Components: Rs 25,938 crore. Advanced Chemistry Cell (ACC) Battery: Rs 18,100 crore. Pharmaceuticals: Rs 15,000 crore. Telecom and Networking Products: Rs 12,195 crore. Textile Products (MMF and Technical): Rs 10,683 crore. Food Processing: Rs 10,900 crore. High Efficiency Solar PV Modules: Rs 24,000 crore. White Goods (ACs and LEDs): Rs 6,238 crore. Specialty Steel: Rs 6,322 crore. IT Hardware: Rs 7,350 crore. Drones and Drone Components: Rs 120 crore. Advanced Medical Devices: Rs 3,420 crore. Total: Rs 1.97 lakh crore over 5-6 years.

Common PLI Structure: Base Year: Reference year for calculating incremental sales. Incentive Rate: Percentage of incremental sales (typically 4-12%). Duration: 5-6 years of incentive disbursement. Minimum Investment: Threshold investment to qualify. Domestic Value Addition: Minimum localization requirement (typically 25-60%). Sales Threshold: Minimum sales to claim incentives.

Application Process Overview: Expression of Interest (EOI) submission during open window. Preliminary evaluation based on eligibility criteria. Detailed Project Report (DPR) submission by shortlisted applicants. Evaluation committee review and scoring. Selection and approval by Empowered Group of Secretaries. Agreement execution with implementing ministry. Compliance monitoring and incentive disbursement.

Current Status (as of 2024): Electronics: 32 companies approved, Apple suppliers (Foxconn, Wistron, Pegatron) manufacturing in India. Pharma: 55 companies selected for bulk drugs and medical devices. Auto: 115 applicants approved across OEMs and component manufacturers. Textiles: 61 companies selected, focus on MMF and technical textiles. Most schemes in implementation phase with incentive disbursements commenced.',
        '["Study all 14 PLI scheme documents and identify sectors relevant to your manufacturing plans or capabilities", "Analyze selected beneficiaries in your target sector - understand their investment commitments and production plans", "Calculate if your existing or planned operations qualify for any PLI scheme based on investment and sales thresholds", "Create PLI opportunity assessment - direct participation potential vs supply chain opportunity to PLI beneficiaries"]'::jsonb,
        '["PLI Scheme Master Document with all 14 sectors summarized including eligibility, incentives, and status", "PLI Beneficiary Database with 500+ selected companies and their commitments", "PLI Eligibility Calculator for each scheme with investment and sales threshold analysis", "PLI Supply Chain Opportunity Map identifying requirements of selected beneficiaries"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Electronics and IT Hardware PLI
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        7,
        'Electronics and IT Hardware PLI Deep Dive',
        'The electronics manufacturing PLI schemes with Rs 48,301 crore combined outlay (Large Scale Electronics Rs 40,951 crore + IT Hardware Rs 7,350 crore) are driving India''s transformation into a global electronics manufacturing hub.

PLI for Large Scale Electronics Manufacturing: Outlay: Rs 40,951 crore over 6 years (FY21-FY26). Target Products: Mobile phones, specified electronic components. Eligibility: Minimum investment Rs 1,000 crore for global companies, Rs 200 crore for domestic companies. Incentive Rates: 6% of incremental sales in Year 1, declining to 4% by Year 6. Additional 1% for domestic companies in years 4-6.

Selected Beneficiaries: Global: Foxconn (Hon Hai), Wistron, Pegatron (all Apple suppliers), Samsung, Rising Star (Oppo). Domestic: Dixon Technologies, Lava, Micromax, Padget Electronics, Optiemus. Total approved investment: Rs 11,000 crore. Target production: Rs 10.5 lakh crore over 5 years.

Impact So Far: Mobile phone production increased from Rs 1.9 lakh crore (FY21) to Rs 4.1 lakh crore (FY24). Apple iPhone production in India crossed $14 billion (FY24). Export of mobiles grew from Rs 13,000 crore (FY20) to Rs 90,000 crore (FY24). Employment created: 100,000+ direct jobs.

PLI for IT Hardware: Outlay: Rs 7,350 crore over 6 years. Target Products: Laptops, tablets, all-in-one PCs, servers. Eligibility: Minimum investment Rs 20 crore. Incentive Rates: 4-2% of incremental sales declining over years. Domestic Value Addition: Minimum 20% in Year 1, rising to 45% by Year 4.

Selected Beneficiaries: Global: Dell, HP, Foxconn, Wistron, Flextronics. Domestic: Dixon Technologies, Syrma SGS. Target: Reduce import dependence for IT hardware from current 80%+.

Opportunity Analysis: Direct PLI Participation: Window closed for current scheme, future tranches possible. Component Manufacturing: PCBs, displays, battery cells, chargers, cables in high demand. Design and Engineering: Growing need for product design, testing, validation services. EMS (Electronics Manufacturing Services): Contract manufacturing for brands, lower entry barrier than OEM.

Supply Chain Gaps: PCB manufacturing limited (importing $3 billion annually). Display panels 100% imported. Semiconductor chips 100% imported (separate scheme for fabs). Passive components (resistors, capacitors) largely imported. Opportunity for component manufacturing to serve PLI beneficiaries.',
        '["Analyze electronics manufacturing opportunity in your capability area - component, sub-assembly, or EMS", "Identify supply chain gaps that PLI beneficiaries are facing - connect with their vendor development teams", "Calculate investment and sales requirements if planning PLI application in future tranches", "Explore EMS model partnering with brands targeting India manufacturing under PLI"]'::jsonb,
        '["Electronics PLI Scheme Complete Guide with notification, amendments, and FAQ", "PLI Beneficiary Vendor Requirements Database with component sourcing needs", "Electronics Component Import Analysis identifying localization opportunities", "EMS Business Model Framework for partnering with PLI beneficiaries"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Auto and Pharma PLI
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        8,
        'Automobile and Pharmaceutical PLI Schemes',
        'The automobile (Rs 25,938 crore) and pharmaceutical (Rs 15,000 crore) PLI schemes target two of India''s most established manufacturing sectors, pushing them towards advanced technology and reduced import dependence.

PLI for Automobiles and Auto Components: Outlay: Rs 25,938 crore over 5 years. Two Categories: Champion OEM Incentive Scheme: For vehicle manufacturers. Minimum investment: Rs 2,000 crore (Group A) or Rs 500 crore (Group B). Focus: Electric vehicles, hydrogen fuel cell vehicles. Incentive: 13-18% of determined sales value. Component Champion Incentive Scheme: For component manufacturers. Minimum investment: Rs 10 crore (Category B2) to Rs 250 crore (Category A). Focus: Advanced automotive technology components. Incentive: 8-13% of incremental sales.

Target Components: Powertrain: EV motors, controllers, battery systems, fuel cells. Electronics: Vehicle control units, sensors, ADAS components. Chassis: Lightweight materials, advanced suspension systems. Safety: Airbag modules, ABS, ESC systems.

Selected Beneficiaries: OEMs: Tata Motors, Mahindra, Hyundai, Kia, Suzuki, Toyota. Components: Bosch, Motherson Sumi, Varroc, Bharat Forge, Sona Comstar, Minda Industries. Total 115 applicants approved with Rs 74,850 crore investment commitment.

PLI for Pharmaceuticals: Three Sub-schemes: PLI for Critical Bulk Drugs: Rs 6,940 crore for 41 products. Target: Reduce import dependence from China (68% of API imports). Products: Fermentation-based (antibiotics), synthesis-based (paracetamol, metformin). Incentive: 20% of sales in Year 1, declining to 5% by Year 6.

PLI for Large Scale Pharma Manufacturing: Rs 15,000 crore for complex generics and patented drugs. Minimum investment: Rs 300 crore (Category 1), Rs 200 crore (Category 2). Target: Biopharmaceuticals, complex generics, cell/gene therapy.

PLI for Medical Devices: Rs 3,420 crore for diagnostic equipment and consumables. Target: CT/PET scanners, MRI, cancer care equipment. Minimum investment: Rs 10-25 crore depending on product.

Pharma PLI Status: 55 companies selected for bulk drugs. 23 applications approved for large scale manufacturing. Investment commitments: Rs 17,275 crore. Expected production: Rs 2.94 lakh crore over scheme tenure.

Opportunities: Auto: Advanced technology components, EV parts, electronics integration. Pharma: API manufacturing, specialty chemicals, contract research and manufacturing (CRAMS).',
        '["Evaluate auto component PLI eligibility for your products or planned products - focus on advanced technology categories", "Analyze pharma PLI for API or formulation manufacturing opportunities in your capability area", "Calculate investment commitment and sales growth requirements for your target PLI category", "Identify partnership opportunities with selected PLI beneficiaries in auto or pharma sectors"]'::jsonb,
        '["Auto PLI Complete Guide with component categories, eligibility criteria, and selected beneficiaries", "Pharma PLI Navigator covering all three sub-schemes with product-wise analysis", "Investment and Sales Threshold Calculator for auto and pharma PLI participation", "PLI Beneficiary Partnership Framework for supply chain integration"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Textiles and Food Processing PLI
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        9,
        'Textiles and Food Processing PLI Schemes',
        'The textile (Rs 10,683 crore) and food processing (Rs 10,900 crore) PLI schemes target employment-intensive sectors with significant MSME participation, offering more accessible entry points compared to capital-intensive schemes.

PLI for Textiles: Outlay: Rs 10,683 crore over 5 years. Focus: Man-Made Fiber (MMF) apparel and Technical Textiles. Rationale: India strong in cotton but weak in MMF (30% global demand). Technical textiles import $2 billion annually.

Two Parts: Part 1 - High Investment: Minimum investment Rs 300 crore. Target: Integrated large-scale MMF and technical textiles units. Incentive: 15% of incremental turnover in Year 1, declining to 11% by Year 5.

Part 2 - Lower Investment: Minimum investment Rs 100 crore. Target: Smaller integrated units. Incentive: 11% of incremental turnover declining to 8%.

Target Products: MMF Apparel: Polyester, nylon, viscose garments. Technical Textiles: Geotextiles, medical textiles, protective textiles, agrotextiles.

Selected Beneficiaries: 61 companies with Rs 19,077 crore investment commitment. Major players: Welspun, Trident, Shahi Exports, Gokaldas Exports. Expected employment: 2.4 lakh direct jobs.

PLI for Food Processing: Outlay: Rs 10,900 crore over 6 years. Three Components: Category 1 - Large Entities: Minimum investment Rs 50 crore for mozzarella cheese, ready-to-eat products. Incentive: 10% of incremental sales.

Category 2 - SMEs: Minimum investment Rs 10 crore for innovative/organic products. Incentive: 10% of incremental sales. More accessible for MSMEs.

Category 3 - Branding and Marketing: Support for Indian food brands going global. Incentive for branding and export promotion activities.

Selected Beneficiaries: 176 applications approved covering dairy, fruits, vegetables, cereals. Major players: ITC, Nestle, Britannia, Parle Products, Haldirams. Small players getting opportunity through Category 2.

Opportunity Analysis: Textiles: MMF spinning and weaving, technical textile products, processing and finishing. Lower entry barrier through PM MITRA textile parks. Food Processing: Innovative products, organic foods, regional specialties. Category 2 specifically designed for smaller players.',
        '["Assess textile PLI eligibility - focus on MMF or technical textiles manufacturing capabilities or plans", "Evaluate food processing PLI Category 2 for smaller scale innovative product manufacturing", "Calculate investment requirements and expected incentives for your target PLI category", "Explore PM MITRA textile parks for integrated manufacturing facility setup"]'::jsonb,
        '["Textile PLI Complete Guide with MMF and technical textile product categories", "Food Processing PLI Navigator with Category 1, 2, and 3 eligibility analysis", "PM MITRA Park Overview with location, incentives, and application process", "SME Food Processing Opportunity Framework for PLI Category 2 participation"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Other PLI Schemes and Application Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        10,
        'Other PLI Schemes and Application Strategy',
        'Beyond the major PLI schemes, several sector-specific schemes offer opportunities in solar, white goods, specialty steel, telecom, drones, and medical devices. Understanding application strategy is crucial for successful participation.

PLI for High Efficiency Solar PV Modules: Outlay: Rs 24,000 crore (enhanced from Rs 4,500 crore). Target: Fully integrated solar PV manufacturing (polysilicon to modules). Minimum capacity: 1 GW. Selected players: Reliance, Adani, Tata Power, Waaree, First Solar. Opportunity: Equipment supply, ancillary manufacturing.

PLI for White Goods: Outlay: Rs 6,238 crore. Products: Air conditioners and LED lights. Minimum investment: Rs 25 crore for ACs, Rs 10 crore for LED. Incentive: 4-6% of incremental sales. Selected: 42 companies including Voltas, Blue Star, Daikin, Havells, Syska.

PLI for Specialty Steel: Outlay: Rs 6,322 crore. Products: Coated steel, high-strength steel, specialty rails, alloy steel. Minimum investment: Rs 300 crore. Target: Import substitution in auto-grade steel. Selected: Tata Steel, JSW, SAIL, AMNS India.

PLI for Telecom and Networking: Outlay: Rs 12,195 crore. Products: Core equipment, customer premise equipment, enterprise products. Minimum investment: Rs 10-100 crore depending on product category. Target: Reduce dependence on Chinese equipment. Selected: 31 companies including Dixon, HFCL, Tejas Networks.

PLI for Drones: Outlay: Rs 120 crore over 3 years. Products: Drones and drone components. Minimum investment: Rs 2 crore (components), Rs 50 lakh (drones). Most accessible PLI for startups. Incentive: 20% of value addition. Selected: 23 companies.

PLI Application Strategy: Pre-Application: Monitor ministry websites for new tranches. Prepare capability documentation in advance. Build financial credibility (audited financials, bank relationships). Develop technology partnerships if required.

Application Phase: Study scheme guidelines meticulously. Prepare comprehensive DPR with realistic projections. Demonstrate clear execution capability. Highlight export potential and employment generation.

Post-Selection: Execute agreement within timeline. Deploy investment per committed schedule. Establish compliance systems early. Build relationship with implementing ministry.

Common Application Mistakes: Overcommitting on investment or sales. Weak technology demonstration. Inadequate financial backing evidence. Missing documentation. Unrealistic timelines.',
        '["Review all 14 PLI schemes and shortlist 2-3 most relevant to your capabilities or plans", "Prepare PLI readiness documentation: technology capability, financial strength, manufacturing infrastructure", "Monitor MHI and sector ministry websites for future PLI tranche announcements", "Build relationships with industry associations for PLI scheme updates and application guidance"]'::jsonb,
        '["Complete PLI Scheme Directory with all 14 sectors, eligibility, and status", "PLI Application Preparation Checklist covering documentation and capability requirements", "PLI Compliance Management Framework for post-selection requirements", "Industry Association Directory for PLI scheme engagement and updates"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Factory Setup and Licensing (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Factory Setup and Industrial Licensing',
        'Navigate factory establishment comprehensively - land acquisition, building construction, utilities setup, Factories Act compliance, labor licensing, industrial licensing requirements, and single window clearance systems across states.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_3_id;

    -- Day 11: Land Acquisition and Site Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        11,
        'Land Acquisition and Site Selection',
        'Land acquisition is often the most challenging and time-consuming aspect of factory setup in India. Understanding acquisition routes, due diligence requirements, and common pitfalls is essential for smooth project execution.

Land Acquisition Routes: Industrial Development Corporation Land: State IDCs (GIDC, MIDC, SIPCOT, etc.) offer pre-acquired land. Advantages: Clear title, basic infrastructure, streamlined approvals. Process: Application, allotment, lease deed execution. Timeline: 3-6 months typically. Cost: Rs 1,000-10,000 per sq meter depending on location.

Private Land Purchase: Direct negotiation with landowners. Requires comprehensive title due diligence. Risk: Litigation, multiple claimants, agricultural land conversion. Timeline: 6-18 months for clear transfer. Often cheaper but higher risk.

SEZ/Industrial Park Land: Private developers offering plug-and-play facilities. Premium pricing but faster setup. Built-up factory options available.

Land Due Diligence Checklist: Title Verification: 30-year title search minimum. Verify complete chain of ownership. Check for mortgages, liens, litigation. Obtain non-encumbrance certificate from sub-registrar.

Land Classification: Agricultural vs non-agricultural status. NA (Non-Agricultural) conversion required for agricultural land. Timeline: 3-12 months for NA conversion depending on state.

Zoning and Permissions: Industrial zone classification in master plan. Check for environmental restrictions (CRZ, forest, green belt). Verify building height and FSI restrictions.

Infrastructure Assessment: Power line proximity and load availability. Water source (municipal, borewell, river). Road connectivity and widening plans. Drainage and sewage infrastructure.

Land Size Planning: Production area requirement based on equipment layout. Raw material and finished goods storage. Utilities: DG set, transformer, ETP, STP. Employee facilities: parking, canteen, amenities. Future expansion provision (typically 50-100% buffer).

Cost Components: Basic land cost (60-70% of total). Registration and stamp duty (7-10%). NA conversion charges (varies by state). Development charges to IDC. Infrastructure development cost. Boundary wall, leveling, approach road.

Common Pitfalls: Inadequate title verification leading to litigation. Underestimating NA conversion timeline. Ignoring infrastructure assessment. Not checking future master plan changes. Insufficient size for future expansion.',
        '["Identify 5 potential land options across IDC plots and private land in shortlisted locations", "Conduct preliminary title verification for shortlisted plots using local lawyer", "Assess infrastructure availability: power load sanction potential, water source, road connectivity", "Calculate total land acquisition cost including all charges, duties, and development costs"]'::jsonb,
        '["Land Due Diligence Checklist with 50+ verification points", "State IDC Directory with contact details, plot availability, and allotment process", "Land Cost Calculator with all components including development charges", "Common Land Acquisition Pitfalls Guide with mitigation strategies"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: Factories Act Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        12,
        'Factories Act 1948 Compliance',
        'The Factories Act 1948 is the primary legislation governing manufacturing establishments in India. Compliance is mandatory for any premises with 10+ workers using power or 20+ workers without power. Understanding requirements prevents costly violations and ensures worker safety.

Factory Definition: Premises with 10 or more workers engaged in manufacturing with power. Premises with 20 or more workers without power. Continuous process operations regardless of worker count.

Factory License Registration: Application to Chief Inspector of Factories (state-specific). Required before commencing operations.

Documentation Required: Site plan showing factory layout. Building plan approved by local authority. List of manufacturing processes. List of machinery with HP rating. Proposed workforce strength. Safety provisions in place. Fire safety arrangements.

Processing: Plan approval by Factory Inspectorate (15-30 days). Site inspection by Factory Inspector. License issuance with conditions. Annual renewal required.

Health Provisions (Chapter III): Cleanliness: Daily cleaning, whitewashing every 14 months. Ventilation: Adequate fresh air circulation. Lighting: Natural and artificial lighting standards. Drinking water: Clean water within 6 meters. Latrines and urinals: Adequate, clean, gender-separate. Spittoons: Where required.

Safety Provisions (Chapter IV): Fencing of machinery: Moving parts, dangerous machinery. Work on near machinery in motion: Restrictions and safeguards. Employment prohibitions: Near cotton openers, certain dangerous operations. Hoists and lifts: Periodic testing, safe working load. Pressure vessels: Registration, periodic testing. Fire safety: Fire extinguishers, fire exits, fire drills. Safety officers: Mandatory above 1,000 workers.

Welfare Provisions (Chapter V): Washing facilities: Adequate based on workforce. Facilities for storing clothes. Sitting arrangements for workers. First-aid: Boxes per 150 workers, ambulance room above 500 workers. Canteens: Mandatory above 250 workers. Shelters, rest rooms, and lunch rooms. Creches: For 30+ women workers.

Working Hours and Leave (Chapter VI): Maximum 9 hours/day, 48 hours/week. Spread over: Maximum 10.5 hours. Intervals for rest: 30 minutes after 5 hours. Weekly holiday: Compensatory if missed. Overtime: Double wages, maximum 50 hours/quarter.

Penalties: Non-registration: Rs 2 lakh fine and/or 2 years imprisonment. Safety violations: Rs 1-2 lakh per violation. Repeat offenses: Enhanced penalties. Accident concealment: Severe penalties including closure.',
        '["Apply for factory license with complete documentation before commencing production", "Conduct factory premises audit against all Factories Act requirements - health, safety, welfare", "Implement required safety provisions: machine guarding, fire safety, PPE, first aid", "Train designated Safety Officer and establish safety committee if workforce exceeds thresholds"]'::jsonb,
        '["Factories Act 1948 Compliance Checklist with 100+ requirements categorized", "Factory License Application Guide with state-specific forms and procedures", "Factory Safety Audit Template covering all statutory requirements", "Welfare Facilities Planning Guide with workforce-based thresholds"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 13: Pollution Control Clearances
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        13,
        'Pollution Control Clearances',
        'Environmental clearances from State Pollution Control Boards (SPCB) are mandatory for all manufacturing operations. The complexity depends on your industry classification under the Environmental Impact Assessment (EIA) notification. Understanding requirements early prevents costly delays.

Industry Classification: White Category: Least polluting industries. No consent required in many states. Examples: Assembly operations, packaging. Green Category: Minor pollution potential. Simplified consent process. Examples: Textile processing (small), food processing (small).

Orange Category: Moderate pollution potential. Consent required from SPCB. Examples: Pharmaceuticals (formulation), chemicals (small), engineering. Red Category: High pollution potential. Requires Environmental Clearance (EC) from MoEF/SEIAA. Examples: Chemicals (bulk), cement, steel, pharmaceuticals (bulk drugs).

Consent to Establish (CTE): Required before construction begins. Application to State Pollution Control Board.

Documentation: Project report with manufacturing process. Site layout with pollution control equipment location. Water balance showing consumption and treatment. Air emission inventory with control measures. Waste management plan (solid, hazardous). ETP (Effluent Treatment Plant) design for water discharge. Stack emission control design.

Timeline: Green/Orange: 30-60 days. Red: 60-120 days (after EC if required).

Consent to Operate (CTO): Required before commencing production. Issued after CTE compliance verification.

Requirements: Construction as per approved plans. Pollution control equipment installation. Trial run results within prescribed limits. Hazardous waste storage facility ready.

Environmental Clearance (for Red/Category A): Required for large projects above investment thresholds. Two categories: Category A (Central MoEF) and Category B (State SEIAA). Process: Pre-feasibility report, scoping, EIA study, public hearing, appraisal, clearance. Timeline: 6-12 months for Category A, 3-6 months for Category B.

Ongoing Compliance: Regular monitoring of emissions and effluents. Annual environmental statement submission. Hazardous waste manifests and records. Five-yearly consent renewal.

Common Issues: Underestimating pollution load leading to inadequate ETP. Missing hazardous waste authorization. Non-compliance during operations leading to closure notices. Changes in process without consent amendment.',
        '["Determine your industry classification under EIA notification - identify applicable clearance requirements", "Prepare complete CTE application with project report, pollution control plans, and supporting documents", "Design and budget for required pollution control infrastructure: ETP, air pollution control, waste management", "Establish environmental monitoring and compliance management system for ongoing operations"]'::jsonb,
        '["Industry Classification Guide under EIA Notification 2006 with category-wise requirements", "CTE Application Template with documentation checklist for different industry categories", "ETP Design Guide with sizing calculations and technology options", "Environmental Compliance Calendar with monitoring and reporting requirements"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: Industrial and Other Licenses
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        14,
        'Industrial and Other Required Licenses',
        'Beyond factory and environmental clearances, manufacturing operations require various sector-specific and location-specific licenses. Creating a comprehensive license requirement matrix prevents compliance gaps that can disrupt operations.

Industrial Licensing: Post-1991 liberalization, most industries delicensed. Licensed industries still requiring Industrial License: Defense equipment and ammunition. Industrial explosives. Hazardous chemicals. Cigarettes and tobacco. Electronics aerospace and defense equipment. Application through eBiz portal to DPIIT. Timeline: 4-6 weeks.

Industrial Entrepreneur Memorandum (IEM): For delicensed industries above investment threshold (earlier Rs 10 crore, now largely replaced by Udyam). Simple acknowledgment process, not approval. Filed through eBiz portal.

Trade License: Issued by local municipal corporation. Required for any commercial/industrial activity. Annual renewal based on premises size. Fee varies by municipality.

Shop and Establishment Act: State-specific legislation for commercial establishments. Registration of premises. Defines working hours, holidays, leave. Mandatory display of registration certificate.

Fire Safety NOC: Required from Fire Department before occupancy. Building plan approval for fire safety. Inspection of fire safety systems. Annual renewal in some states. Requirements: Fire extinguishers, sprinklers (if required), fire exits, emergency lighting.

Boiler Registration: Required under Indian Boilers Act if using boilers. Registration with Chief Inspector of Boilers. Annual inspection mandatory. Competency certificate for boiler operator.

Weights and Measures: Registration under Legal Metrology Act. Required if using weighing/measuring instruments. Verification of instruments annually. Packed commodities labeling compliance.

Product-Specific Licenses: Food (FSSAI): Central/State license based on turnover. Drugs (Drug License): Manufacturing and sales license from State FDA. Cosmetics: Manufacturing license from State Licensing Authority. Medical Devices: Manufacturing license from CDSCO/State. Chemicals: License under Chemical Rules for specified substances. Explosives: License under Explosives Act.

Labor Law Registrations: Provident Fund: Registration above 20 employees. ESI: Registration above 10 employees. Professional Tax: Registration with state authority. Labor Welfare Fund: State-specific requirements.

Import-Export: IEC (Importer Exporter Code): For any import/export activity. AD Code: Bank authorization for forex transactions. Product-specific: DGFT licenses for restricted items.',
        '["Create comprehensive license requirement matrix for your manufacturing operation - list all applicable licenses with timelines", "Prioritize license applications based on criticality and processing time - some required before construction, others before operations", "Identify single window clearance availability in your state - apply through integrated portal where available", "Engage compliance consultant or legal advisor for specialized licenses in your sector"]'::jsonb,
        '["Manufacturing License Requirement Matrix covering 50+ common licenses", "Single Window Clearance Portal Directory for all states with applicable licenses", "Product-Specific License Guide for food, pharma, chemicals, and electronics", "License Application Timeline Planner with dependencies and critical path"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: Single Window Clearance Systems
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_3_id,
        15,
        'Single Window Clearance Systems',
        'Single Window Clearance (SWC) systems aim to streamline the approval process by providing unified platform for multiple licenses. Most states now offer SWC with varying levels of integration. Understanding and leveraging these systems significantly reduces setup time.

National Single Window System: Launched October 2021 as unified portal. Integrates central government approvals: IEM, Industrial License, CTE/CTO (some states), import licenses. Currently 32 central ministries integrated. State integration ongoing.

State Single Window Systems: Gujarat: Investor Facilitation Portal (IFP). 40+ approvals integrated. Deemed approval if not processed in time. Among best implementation.

Maharashtra: MAITRI portal. 70+ services integrated. Investment-based fast track available. Good integration with MIDC.

Karnataka: Single Window for Industry Clearance (KSWDC). 50+ approvals covered. Time-bound clearance commitment.

Tamil Nadu: Single Window Portal. Good integration with SIPCOT. Special cells for large investments.

Telangana: TS-iPASS. 23 approvals under self-certification. Among fastest clearance regimes. Model for other states.

Uttar Pradesh: Nivesh Mitra. 150+ services integrated. Good for large projects.

How to Leverage SWC: Pre-Registration: Create business profile with accurate information. Upload common documents once (reduces redundancy). Understand approval dependencies.

Application Submission: Submit all related applications together where possible. Track status through portal. Respond to queries promptly. Maintain document versions carefully.

Follow-up: Use portal tracking rather than physical visits. Escalate through portal grievance mechanism. Document all interactions.

Fast Track Options: Large investment projects (typically Rs 50+ crore) get dedicated relationship managers. Time-bound clearances with deemed approval. Pre-clearance consultation available.

Limitations of SWC: Not all approvals integrated (especially sector-specific). Backend department processes still manual often. Query response still requires physical documentation sometimes. Integration between center and state incomplete.

Best Practices: Engage professional consultant for complex projects. Complete documentation before submission (reduces queries). Use state Invest facilitation services. Attend pre-submission meetings where available. Maintain relationship with Industrial Development Corporation.',
        '["Register on National Single Window System and your state SWC portal - complete business profile", "Map your required approvals against available SWC services - identify what can be obtained through portal vs offline", "Prepare complete digital documentation pack for SWC submission - ensure consistency across applications", "Engage state Industries Department for large investment facilitation support if eligible"]'::jsonb,
        '["State Single Window Portal Directory with URLs, services covered, and timelines", "SWC Documentation Checklist with common requirements across portals", "State Invest Facilitation Services Guide with eligibility and engagement process", "Common SWC Issues and Resolution Guide based on user experiences"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 1-3 created successfully for P24';

END $$;

COMMIT;
