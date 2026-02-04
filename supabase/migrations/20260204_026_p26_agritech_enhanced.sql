-- THE INDIAN STARTUP - P26: AgriTech & Farm-to-Fork - Enhanced Content
-- Migration: 20260204_026_p26_agritech_enhanced.sql
-- Complete course with detailed lessons, action items, and resources
-- Duration: 45 days | 9 modules | Price: Rs 6,999

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_m1_id TEXT;
    v_m2_id TEXT;
    v_m3_id TEXT;
    v_m4_id TEXT;
    v_m5_id TEXT;
    v_m6_id TEXT;
    v_m7_id TEXT;
    v_m8_id TEXT;
    v_m9_id TEXT;
BEGIN
    -- Upsert the product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P26',
        'AgriTech & Farm-to-Fork',
        'Master the Indian agricultural technology ecosystem from FPO formation to APEDA exports. Learn precision farming, agri-fintech, supply chain optimization, and organic certification under NPOP standards.',
        6999,
        45,
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

    -- Get the product ID (in case of conflict)
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P26';
    END IF;

    -- Delete existing modules and lessons for clean re-insert
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- =====================================================
    -- MODULE 1: AgriTech Overview & Market Landscape
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'AgriTech Overview & Market Landscape', 'Understanding the Indian agriculture sector, technology adoption trends, and startup opportunities in the $370 billion market.', 1, NOW(), NOW())
    RETURNING id INTO v_m1_id;

    -- Lesson 1.1: Indian Agriculture Sector Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 1, 'Indian Agriculture Sector Overview',
    'The Indian agriculture sector represents one of the largest and most complex agricultural ecosystems globally, contributing approximately 18-20% to the nation''s GDP while employing over 42% of the workforce. Understanding this landscape is crucial for any AgriTech entrepreneur seeking to create meaningful impact and build sustainable businesses.

India''s agricultural diversity is unparalleled, spanning 15 distinct agro-climatic zones that support cultivation of virtually every crop known to humanity. From the wheat-growing plains of Punjab and Haryana to the rice paddies of West Bengal and Tamil Nadu, from the cotton fields of Gujarat to the spice gardens of Kerala, each region presents unique opportunities and challenges for technology intervention.

The sector faces structural challenges that create massive opportunities for innovation. Average farm size has declined to just 1.08 hectares, with 86% of farmers classified as small and marginal holders operating less than 2 hectares. This fragmentation creates inefficiencies in input procurement, mechanization, and market access that technology can address through aggregation models and shared services.

Water stress affects nearly 60% of Indian agriculture, with groundwater depletion reaching critical levels in states like Punjab, Haryana, and Rajasthan. Climate variability has increased crop losses from extreme weather events by 50% over the past decade. These challenges create urgent demand for precision irrigation, weather intelligence, and climate-resilient farming solutions.

The post-harvest infrastructure gap results in an estimated Rs 92,000 crore annual losses, representing nearly 16% of total production. Cold chain coverage remains below 4% of requirements, and processing capacity handles only 10% of production compared to 70% in developed countries. This infrastructure deficit presents opportunities for cold chain startups, food processing ventures, and logistics technology companies.

Market access remains a critical pain point, with farmers typically capturing only 25-30% of consumer prices due to long intermediary chains. The Agricultural Produce Market Committee (APMC) system, while reformed in many states, still creates barriers to direct farmer-consumer linkages. Digital platforms that enable price discovery, quality standardization, and direct sales have demonstrated ability to increase farmer incomes by 15-25%.

Government policy has shifted decisively toward agricultural modernization, with initiatives like Digital Agriculture Mission allocating Rs 2,817 crore for agri-stack development, drone subsidies covering 100% cost for FPOs, and PM-KISAN providing direct income support to 11 crore farmers. Understanding and leveraging these policy frameworks is essential for AgriTech business models.

The venture capital interest in Indian AgriTech has grown significantly, with over $2 billion invested in the sector between 2020-2025. Successful startups have demonstrated path to profitability through B2B models serving agri-input companies, food processors, and exporters, while B2C models struggle with unit economics given low farmer purchasing power and fragmented demand.',
    '["Map your state''s agricultural profile including major crops, farm sizes, and irrigation coverage", "Identify top 5 pain points in your target crop or geography through farmer interviews", "Research government schemes applicable to your AgriTech concept", "Analyze 3 successful AgriTech startups in your focus area and document their business models"]'::jsonb,
    '["Agricultural Statistics at a Glance 2024 - https://agricoop.gov.in/statistics", "NABARD All India Rural Financial Inclusion Survey - https://nabard.org/nafis", "India AgriTech Investment Report - Omnivore - https://omnivore.vc/research", "Digital Agriculture Mission Guidelines - https://agricoop.gov.in/dam"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 1.2: AgriTech Business Models & Value Chains
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 2, 'AgriTech Business Models & Value Chains',
    'AgriTech business models in India have evolved significantly from early marketplace plays to sophisticated technology-enabled services that address specific value chain inefficiencies. Understanding where value is created and captured across the agricultural value chain is essential for building sustainable businesses.

The input supply segment represents a $45 billion market encompassing seeds, fertilizers, pesticides, and farm equipment. Traditional distribution relies on a fragmented network of 280,000+ agri-input retailers, creating opportunities for B2B platforms that improve inventory management, provide credit access, and enable direct manufacturer-retailer relationships. Successful models like DeHaat and AgroStar have demonstrated unit economics by combining input sales with advisory services and output procurement.

Farm services including mechanization, soil testing, crop advisory, and pest management represent the fastest-growing AgriTech segment. The custom hiring center model, supported by government subsidies, enables smallholders to access tractors, harvesters, and drones without capital investment. Drone-as-a-service for crop spraying has achieved product-market fit with demonstrated 90% cost reduction versus manual spraying and 10x productivity improvement.

Precision agriculture technologies including IoT sensors, satellite imagery, and AI-powered advisory represent the technology frontier but face adoption challenges with small farmers. Successful approaches bundle technology with tangible services like crop insurance or market linkages rather than selling technology directly. Companies like CropIn and SatSure have built sustainable businesses by serving agribusiness enterprises rather than individual farmers.

Output aggregation and market linkages address the farmer''s fundamental challenge of price realization. Models range from physical aggregation through collection centers to virtual aggregation through digital platforms. The key success factors include quality standardization, payment reliability, and consistent demand. Platforms connecting farmers directly to food processors, exporters, or organized retail have demonstrated 15-25% price improvement for farmers while reducing procurement costs for buyers.

Agri-fintech addresses the massive credit gap in Indian agriculture, estimated at Rs 12 lakh crore. Traditional approaches face challenges of information asymmetry and collection risks in rural markets. Innovative models use satellite imagery, farm activity data, and digital transaction history to underwrite crop loans with demonstrated default rates below 3%. Embedded finance within input supply or output procurement creates natural repayment mechanisms that reduce credit risk.

Post-harvest infrastructure including cold storage, pack houses, and processing facilities require significant capital but benefit from government subsidies covering 35-50% of project costs. Asset-light models that aggregate capacity across multiple facilities and provide technology-enabled operations management have emerged as an alternative to capital-intensive ownership models.

Farm-to-consumer models including online grocery, subscription boxes, and farm tourism have struggled with unit economics at scale but succeed in niche segments like organic produce, exotic vegetables, and artisanal products where consumers pay premium prices. The B2B2C approach serving restaurants, caterers, and corporate cafeterias offers better unit economics through larger order sizes and predictable demand.',
    '["Map the complete value chain for your target crop from seed to consumer", "Calculate unit economics for your proposed business model including CAC, LTV, and contribution margin", "Identify potential B2B customers and their procurement pain points through 5 interviews", "Research subsidy schemes applicable to your infrastructure or service model"]'::jsonb,
    '["AgriTech Business Model Canvas Templates - https://agfunder.com/research", "India Food Processing Industry Report - https://mofpi.gov.in/reports", "Rabobank Food & AgriTech Research - https://research.rabobank.com", "FICCI AgriTech Summit Presentations - https://ficci.in/agritech"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 1.3: Technology Stack for AgriTech Startups
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 3, 'Technology Stack for AgriTech Startups',
    'Building technology for agricultural applications requires understanding unique constraints including intermittent connectivity, diverse user literacy levels, harsh environmental conditions, and the need for multilingual interfaces. The technology stack decisions made early in a startup''s journey significantly impact scalability, cost structure, and market reach.

Mobile-first architecture is non-negotiable for AgriTech applications given that 65% of rural internet access occurs through smartphones. However, the app development approach must account for low-end Android devices with limited memory, 2G/3G connectivity in many rural areas, and the need for offline functionality. Progressive Web Apps (PWAs) offer advantages of reduced download size, automatic updates, and cross-platform compatibility while maintaining near-native performance.

Voice and vernacular interfaces have proven essential for farmer-facing applications. India''s agricultural workforce speaks 22 official languages and hundreds of dialects, with Hindi literacy at only 40% even in Hindi-speaking states. Successful applications implement voice input/output using speech recognition APIs, support 8-10 major regional languages, and use visual/icon-based navigation that transcends literacy barriers.

Geospatial technology forms the backbone of precision agriculture applications. Free satellite imagery from Sentinel-2 (10m resolution, 5-day revisit) enables vegetation index calculation, crop type classification, and basic yield estimation. Commercial providers like Planet Labs offer daily imagery at 3m resolution for applications requiring higher precision. Integration with government land records through the Digital India Land Records Modernization Programme (DILRMP) APIs enables plot-level services.

IoT infrastructure for farm applications must withstand extreme temperatures, dust, humidity, and water exposure while operating on limited power. LoRaWAN networks offer 10-15km range with minimal power consumption, making them suitable for distributed sensor networks. Solar-powered base stations with cellular backhaul provide connectivity in areas lacking grid power. Sensor costs have declined to Rs 500-2000 for basic soil moisture and weather monitoring, making deployment economics viable.

Data architecture must handle both structured transactional data and unstructured data including images, voice recordings, and sensor streams. Cloud-native architectures using managed services from AWS, GCP, or Azure provide scalability without infrastructure management overhead. Edge computing at the village or district level reduces latency for time-critical applications like pest alerts while minimizing data transfer costs.

Machine learning applications in agriculture include crop disease identification from images (95%+ accuracy demonstrated), yield prediction from satellite imagery, price forecasting, and chatbot-based advisory. Pre-trained models from Google''s TensorFlow Hub and Microsoft''s Custom Vision reduce development time while transfer learning enables customization for Indian crop varieties. Model deployment on edge devices using TensorFlow Lite or ONNX Runtime enables offline inference.

Integration with government platforms is increasingly important as Digital Agriculture Mission creates the India AgriStack including farmer registry, geo-referenced land records, and crop sown registry. Early API integration positions startups for data access and potential government partnerships. Payment integration through UPI has reached 80% rural penetration, enabling direct farmer payments without cash handling.',
    '["Define your minimum viable technology stack with build vs buy decisions for each component", "Test your app concept with 10 target users for vernacular and voice interface requirements", "Evaluate satellite imagery providers and calculate cost per hectare for your coverage requirements", "Map government APIs available for land records, weather, and market prices in your target states"]'::jsonb,
    '["Google Earth Engine for Agriculture - https://earthengine.google.com/agriculture", "India AgriStack Documentation - https://agricoop.gov.in/agristack", "AWS Agriculture Solutions - https://aws.amazon.com/agriculture", "PlantVillage Disease Detection Models - https://plantvillage.psu.edu"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 2: FPO Formation & Management
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'FPO Formation & Management', 'Complete guide to forming and managing Farmer Producer Organizations with Rs 15 lakh equity grant access.', 2, NOW(), NOW())
    RETURNING id INTO v_m2_id;

    -- Lesson 2.1: FPO Fundamentals & Legal Structure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 4, 'FPO Fundamentals & Legal Structure',
    'Farmer Producer Organizations (FPOs) represent the most significant institutional innovation in Indian agriculture since the cooperative movement, offering a farmer-owned and farmer-controlled structure that combines the benefits of scale with democratic governance. Understanding FPO fundamentals is essential whether you are forming an FPO, providing services to FPOs, or building technology for the FPO ecosystem.

An FPO is a registered body of farmer-producers with the core objective of improving farmer incomes through collective action in input procurement, production planning, aggregation, processing, and marketing. The FPO model addresses the fundamental challenge of small farm sizes by creating virtual scale without requiring land consolidation.

Legal structure options include registration as a Producer Company under the Companies Act 2013 (Part IXA), as a Cooperative Society under the Multi-State Cooperative Societies Act or State Cooperative Acts, or as a Society under the Societies Registration Act. The Producer Company structure has emerged as the preferred choice due to its combination of cooperative principles with corporate governance, limited liability protection, and operational flexibility.

Producer Company registration requires minimum 10 individual producers or 2 producer institutions as members. The memorandum of association must specify objectives limited to production, harvesting, procurement, grading, pooling, marketing, processing, or any activities for the benefit of members. The name must include "Producer Company Limited" as suffix.

Governance structure mandates a Board of Directors with minimum 5 directors, including at least one-third women directors for FPOs promoted under central schemes. Directors must be members and are elected by the general body. The Chief Executive (CEO) may be a non-member professional appointed by the Board. Annual General Meetings require minimum 25% member attendance for quorum.

Membership is limited to primary producers engaged in activities specified in the memorandum. Each member holds one vote regardless of shareholding, maintaining democratic control. Share capital contribution is typically Rs 1,000-10,000 per member, with the FPO Scheme providing matching equity grant of Rs 15 lakh over three years.

The Rs 15 lakh equity grant under the Formation and Promotion of 10,000 FPOs Scheme is released in three tranches: Rs 5 lakh at registration and mobilization of minimum 300 members, Rs 5 lakh at achievement of Rs 50 lakh business turnover, and Rs 5 lakh at Rs 1 crore turnover. This equity grant transforms FPO economics by providing working capital without debt burden.

FPO promotion requires engagement with a Cluster-Based Business Organization (CBBO) implementing agency like NABARD, SFAC, or State Rural Livelihoods Missions. The CBBO provides handholding support for 5 years including registration assistance, business planning, market linkages, and capacity building with a budget of Rs 18 lakh per FPO.

Key compliance requirements include maintenance of statutory registers, annual filing with the Registrar of Companies, GST registration if turnover exceeds Rs 40 lakh (Rs 20 lakh for special category states), income tax filing with exemption under Section 80PA for producer companies, and annual audit by a qualified auditor.',
    '["Identify potential FPO members in your target geography and assess their interest through village meetings", "Contact the nearest CBBO implementing agency (NABARD/SFAC/SRLM) for guidance on FPO registration", "Draft preliminary memorandum of association specifying proposed FPO activities", "Prepare 5-year business plan projection for equity grant eligibility assessment"]'::jsonb,
    '["FPO Scheme Guidelines - Ministry of Agriculture - https://agricoop.gov.in/fpo", "NABARD FPO Development Portal - https://nabfpo.in", "SFAC Producer Company Registration Guide - https://sfacindia.com/fpo", "Producer Company Act Provisions - https://mca.gov.in/producercompany"]'::jsonb,
    60, 150, 1, NOW(), NOW());

    -- Lesson 2.2: FPO Business Planning & Operations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 5, 'FPO Business Planning & Operations',
    'Successful FPO operations require robust business planning that balances member service with financial sustainability. The business plan must demonstrate clear value proposition for members while achieving scale economics that enable self-sufficiency beyond the initial promotion support period.

The business planning process begins with comprehensive baseline assessment of member landholding, cropping patterns, current yields, input usage, and market access. This data informs crop-wise aggregation potential, input requirement estimation, and market linkage opportunities. Geographic mapping of member farms enables logistics planning and identification of collection point locations.

Input business typically offers the fastest path to FPO viability given immediate farmer need and straightforward operations. The FPO procures seeds, fertilizers, pesticides, and farm equipment directly from manufacturers or authorized distributors, achieving 15-25% cost savings versus retail purchase. Initial inventory financing comes from equity grant and member advance payments, with credit lines from NABARD or commercial banks as the FPO establishes track record.

Output aggregation requires higher operational sophistication but offers greater long-term value. The FPO establishes collection centers with weighing, grading, and temporary storage facilities. Quality standardization through training and incentive pricing improves aggregate produce quality. Market linkages to processors, exporters, or organized retail provide premium prices compared to APMC sales.

Custom Hiring Centers (CHCs) enable mechanization access for small farmers while generating service revenue for the FPO. Government subsidy covers 80% of equipment cost for FPO-operated CHCs, with machinery including tractors, rotavators, seed drills, sprayers, and harvesters. Digital booking systems optimize equipment utilization across member farms.

Processing and value addition offer highest margins but require significant capital and technical expertise. Entry-level processing includes cleaning, grading, packing, and branding of raw produce. Advanced processing such as oil extraction, flour milling, or food product manufacturing requires FSSAI licensing and quality management systems. Government subsidies under PMFME cover 35% of project cost for FPO-owned processing units.

Financial management systems must maintain transparent accounting with member-wise transaction records, clear patronage calculation for profit distribution, and timely statutory compliance. Recommended software includes NABARD''s FPO-Soft or commercial accounting packages with cooperative accounting features. Bank account with multiple signatories and clear authorization matrix prevents misappropriation.

Working capital management is the primary operational challenge for FPOs. Input business requires advance procurement before selling season, while output business requires payment to farmers before receiving buyer payment. The cash conversion cycle typically ranges 30-90 days depending on business mix. Working capital facilities from NABARD under the Producer Organization Development Fund (PODF) or commercial banks help bridge the gap.

Performance monitoring should track key metrics including active member percentage (target >70%), business per member (target >Rs 50,000/year), input cost savings delivered, output price premium achieved, and return on equity. Quarterly review meetings with full Board participation ensure timely course correction.',
    '["Conduct baseline survey of 50+ potential members documenting landholding, crops, and current market channels", "Develop input business plan with supplier quotes, margin analysis, and working capital requirement", "Identify collection center locations and estimate infrastructure cost with subsidy analysis", "Design FPO accounting system with chart of accounts, member ledgers, and reporting templates"]'::jsonb,
    '["NABARD FPO Business Planning Toolkit - https://nabard.org/fpo-toolkit", "FPO Financial Management Guide - SFAC - https://sfacindia.com/fpo-finance", "Custom Hiring Centre Guidelines - https://farmech.dac.gov.in/chc", "PMFME Scheme for FPOs - https://pmfme.mofpi.gov.in"]'::jsonb,
    60, 150, 2, NOW(), NOW());

    -- Lesson 2.3: FPO Credit Access & Financial Linkages
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 6, 'FPO Credit Access & Financial Linkages',
    'Access to adequate and timely credit is critical for FPO operations, yet remains a significant challenge due to limited collateral, nascent track records, and banker unfamiliarity with the FPO model. Understanding the full spectrum of credit facilities and building bankable propositions enables FPOs to secure the working capital and term loans needed for growth.

The Rs 15 lakh equity grant under the FPO Scheme serves as foundation capital that improves creditworthiness by providing debt-equity cushion. Banks are mandated to consider equity grant as promoter contribution when evaluating FPO loan proposals. The matching grant structure incentivizes member equity contribution that further strengthens the capital base.

NABARD''s Producer Organisation Development Fund (PODF) offers specialized credit facilities for FPOs including working capital loans up to Rs 1 crore at concessional interest rates (repo rate + 2%), and term loans for infrastructure like collection centers, storage, and processing. The Fund has a corpus of Rs 1,500 crore with simplified documentation requirements compared to commercial banks.

Priority Sector Lending (PSL) classification for FPO lending incentivizes commercial banks to extend credit. RBI guidelines classify FPO loans as agriculture priority sector regardless of loan size, making them attractive for banks meeting PSL targets. Large banks including SBI, Punjab National Bank, and HDFC Bank have dedicated FPO lending programs.

Credit Guarantee Fund for FPOs provides collateral-free loans up to Rs 2 crore with guarantee coverage of 85% for loans up to Rs 50 lakh and 75% for loans between Rs 50 lakh and Rs 2 crore. The guarantee fee of 0.85% annually is funded by the government scheme, eliminating cost to FPOs. This facility enables working capital access without mortgaging member lands.

Warehouse Receipt Financing enables FPOs to obtain credit against stored produce, converting inventory into working capital while waiting for favorable market prices. Warehousing Development and Regulatory Authority (WDRA) registered warehouses issue electronic negotiable warehouse receipts accepted by banks as collateral. Loan-to-value ratios typically range 60-70% of stored produce value.

Agricultural Infrastructure Fund (AIF) provides interest subvention of 3% on loans up to Rs 2 crore for FPO infrastructure projects including collection centers, sorting and grading units, cold storage, and processing facilities. The facility includes credit guarantee coverage reducing collateral requirements. Over 10,000 FPO projects have been sanctioned under AIF since launch.

Kisan Credit Card (KCC) limits for FPOs enable working capital drawdown for input purchase and crop production expenses. FPOs can obtain KCC limits based on crop loan assessment of aggregated member acreage. Interest subvention of 2% plus additional 3% for timely repayment reduces effective interest rate to 4% for loans up to Rs 3 lakh per farmer.

Building bank relationships requires professional documentation including audited financials, business plan, cash flow projections, and collateral schedule. Regular engagement with bank branch managers and participation in bank-organized FPO meets improves visibility. Timely repayment of initial small facilities builds credit history that enables larger subsequent loans.',
    '["Prepare loan proposal documentation package for NABARD PODF working capital facility", "Apply for Credit Guarantee Fund registration through implementing agency", "Identify WDRA-registered warehouses in your district and understand warehouse receipt financing process", "Meet with 3 bank branch managers to understand their FPO lending criteria and build relationships"]'::jsonb,
    '["NABARD PODF Guidelines - https://nabard.org/podf", "Credit Guarantee Fund for FPOs - https://agricoop.gov.in/creditguarantee", "Agricultural Infrastructure Fund Portal - https://agriinfra.dac.gov.in", "WDRA Warehouse Receipt System - https://wdra.gov.in"]'::jsonb,
    60, 150, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 3: e-NAM Integration & Digital Trading
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'e-NAM Integration & Digital Trading', 'Leveraging the National Agriculture Market for price discovery and inter-state trade.', 3, NOW(), NOW())
    RETURNING id INTO v_m3_id;

    -- Lesson 3.1: Understanding e-NAM Platform
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 7, 'Understanding e-NAM Platform',
    'The National Agriculture Market (e-NAM) represents India''s most ambitious agricultural marketing reform, creating a unified national market for agricultural commodities through an online trading platform that connects APMC mandis across states. Understanding e-NAM''s architecture, benefits, and operational requirements is essential for FPOs, traders, and AgriTech entrepreneurs.

e-NAM launched in 2016 with 21 pilot mandis and has expanded to cover 1,389 mandis across 23 states and 4 Union Territories, with over 1.77 crore farmers and 2.4 lakh traders registered on the platform. The platform has facilitated trade worth over Rs 2.75 lakh crore, demonstrating significant adoption despite implementation challenges.

The platform architecture comprises three layers: the central e-NAM portal maintained by Small Farmers Agribusiness Consortium (SFAC), state-level integrations with APMC MIS systems, and mandi-level infrastructure including assaying laboratories, weighbridges, and quality testing equipment. This architecture enables both intra-state trade within integrated mandis and inter-state trade between mandis in different states.

Key features include online bidding that enables traders anywhere in India to bid for produce displayed on the platform, eliminating geographic constraints on price discovery. Quality assaying with standardized parameters for each commodity enables sight-unseen trading by providing buyers confidence in produce quality. Unified farmer registration creates a single identity for farmers to sell in any integrated mandi.

The Farmer Producer Organization (FPO) Trading Module launched in 2020 enables FPOs to trade directly on e-NAM without going through a licensed commission agent. FPOs can list produce, receive bids from registered traders nationwide, and receive payments directly. This facility has been utilized by over 8,000 FPOs accounting for trade worth Rs 4,000 crore.

Price discovery benefits are substantial, with studies showing 5-15% higher prices for farmers selling through e-NAM compared to traditional auction. The transparent bidding process eliminates cartelization by local traders while competition from distant buyers improves price realization. Real-time price information across mandis enables farmers to choose optimal selling locations.

Inter-state trade facilitation addresses the historical fragmentation of agricultural markets along state boundaries. The platform enables a buyer in Tamil Nadu to purchase wheat from a mandi in Madhya Pradesh with seamless logistics coordination. Unified licensing and single-point levy of market fees simplifies regulatory compliance for inter-state trade.

Integration requirements for AgriTech platforms include API access for price information, lot details, and trade execution. The e-NAM API suite enables third-party applications to display prices, submit bids on behalf of registered users, and receive trade confirmations. AgriTech startups have built farmer advisory services, price comparison tools, and trading bots leveraging these APIs.

Challenges include variable quality of mandi infrastructure, resistance from traditional commission agents, limited awareness among farmers, and integration gaps between e-NAM and state APMC systems. Addressing these challenges through awareness campaigns, infrastructure support, and user experience improvement is ongoing.',
    '["Register your FPO on e-NAM platform through the nearest integrated mandi", "Visit an integrated mandi to understand the assaying, weighing, and trading workflow", "Compare prices on e-NAM across 5 mandis for your primary commodity over the past month", "Identify potential inter-state buyers for your FPO produce through e-NAM trader directory"]'::jsonb,
    '["e-NAM Official Portal - https://enam.gov.in", "e-NAM FPO Trading Module Guide - https://enam.gov.in/fpo", "e-NAM API Documentation - https://enam.gov.in/api", "State-wise Integrated Mandi List - https://enam.gov.in/mandilist"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 3.2: e-NAM Trading Operations for FPOs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 8, 'e-NAM Trading Operations for FPOs',
    'Operating effectively on e-NAM requires understanding the complete workflow from produce arrival to payment receipt. This lesson provides a practical guide for FPOs to maximize value from e-NAM trading while managing operational requirements efficiently.

The pre-trading preparation begins with produce aggregation from member farmers. The FPO must maintain member-wise records of quantity and initial quality assessment at the collection point. Produce should be cleaned, graded to remove damaged items, and packed in standard packaging (typically 50kg bags) suitable for mandi handling. Transportation to the integrated mandi should be timed to avoid peak arrival periods.

Gate entry process at the integrated mandi involves registration of arrival at the mandi gate with details including seller name (FPO), commodity, estimated quantity, and vehicle number. The gate entry generates a unique lot number that tracks the produce through the trading process. Some mandis have implemented RFID-based vehicle tracking for automated gate entry.

Quality assaying is the critical step that determines price realization. The mandi assaying laboratory tests samples for parameters specified in e-NAM commodity profiles including moisture content, foreign matter, broken grains, damaged grains, and commodity-specific parameters like oil content for oilseeds or fibre length for cotton. Assay reports are uploaded to e-NAM and visible to all potential bidders.

Lot creation on the platform includes uploading assay report, photographs of produce, quantity confirmation from weighbridge, and seller price expectation (optional). The lot is then available for bidding by registered traders during the trading session. FPOs can set a reserve price below which bids are not accepted.

The bidding process typically operates in two modes: continuous bidding during trading hours or auction-style bidding with defined start and end times. Traders view lot details including assay parameters and photos before bidding. Multiple rounds of bidding improve price discovery. The highest bidder at session close wins the lot.

Post-trading settlement involves generation of the e-NAM trading slip specifying buyer, seller, commodity, quantity, price, and market fee. The buyer must pay within 24-48 hours through the e-NAM payment system linked to bank accounts. The FPO receives payment directly after deduction of market fee (typically 0.5-1.5% depending on state).

Market fee and cess under e-NAM is typically lower than traditional APMC transactions. Several states have eliminated commission agent fees for e-NAM trades, resulting in 2-3% savings for farmers. Single-point levy for inter-state trade eliminates the cascading taxes that previously inflated prices.

Common operational issues include delays in assay testing during peak seasons, discrepancies between assay results and buyer expectations, payment delays from buyers, and system downtime. FPOs should maintain relationships with multiple traders to ensure consistent sales, document quality evidence in case of disputes, and time sales to avoid peak congestion.

Optimizing e-NAM performance involves analyzing historical price patterns to time sales optimally, building trader relationships for premium purchases, maintaining consistent quality to build reputation, and leveraging inter-state trade opportunities when local prices are depressed.',
    '["Complete a mock trading session with your FPO team using e-NAM demo environment", "Develop standard operating procedures for produce aggregation, transport, and mandi operations", "Build relationships with 5 traders registered on e-NAM who purchase your commodity", "Analyze price patterns for your commodity across seasons and mandis to plan sales timing"]'::jsonb,
    '["e-NAM Seller User Manual - https://enam.gov.in/seller-guide", "Commodity Assaying Parameters - https://enam.gov.in/commodities", "e-NAM Price Discovery Analysis - https://sfacindia.com/enam-research", "Market Fee Structure by State - https://enam.gov.in/marketfee"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 3.3: Building AgriTech Solutions on e-NAM
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 9, 'Building AgriTech Solutions on e-NAM',
    'The e-NAM platform provides a foundation for AgriTech innovation through its API ecosystem, standardized data formats, and national reach. Entrepreneurs can build value-added services that enhance e-NAM utility for farmers, traders, and other stakeholders while creating sustainable business models.

The e-NAM API suite provides programmatic access to platform functionality including commodity price feeds with real-time and historical data across all integrated mandis, lot listing and search enabling traders to discover available produce, bid submission for registered traders through third-party applications, trade confirmation and settlement status, and user authentication for seamless login across platforms.

API access requires registration as an e-NAM technology partner through SFAC. The partnership process includes application submission, technical evaluation, security assessment, and agreement execution. Approved partners receive API credentials, documentation, and sandbox environment access. Production API calls are rate-limited based on partnership tier.

Price intelligence applications represent the most developed e-NAM integration category. These applications aggregate price data across mandis to help farmers identify optimal selling locations, track price trends to time sales, and compare realization versus benchmarks. Monetization models include freemium with premium analytics, advertising from input companies, and B2B licensing to FPOs and traders.

Trading facilitation platforms enable users to discover, compare, and transact across mandis from a single interface. Features include intelligent lot matching based on buyer requirements, automated bidding within user-specified parameters, logistics coordination for inter-state trade, and trade finance integration. These platforms typically charge transaction fees or subscription fees to traders.

Farmer advisory integration combines e-NAM price data with crop advisory services. Recommendations account for local prices when suggesting crop varieties, harvesting timing, and quality improvement practices. Price forecasting models using machine learning on historical e-NAM data help farmers make planting and selling decisions.

Quality assaying technology startups address the infrastructure gap in mandis lacking proper assaying facilities. Mobile NIR spectroscopy devices enable rapid non-destructive quality testing in the field. Computer vision applications assess grain quality from smartphone images. These solutions can operate as mandi service providers or direct-to-farmer quality certification services.

FPO management platforms integrate e-NAM trading within comprehensive FPO operations software including member management, input distribution, aggregation tracking, and accounting. The integrated workflow enables seamless movement from member produce receipt to mandi sale with complete traceability. These platforms typically follow SaaS pricing models with per-FPO monthly fees.

Supply chain visibility applications leverage e-NAM trade data to provide transparency for food processors, retailers, and consumers. Traceability from farm to fork builds consumer trust and supports premium pricing for quality produce. Integration with blockchain provides immutable records for export-grade traceability requirements.

Technical considerations for e-NAM integration include handling API rate limits through caching and queuing, managing connectivity challenges in rural areas through offline-capable architectures, supporting vernacular interfaces for farmer users, and ensuring payment security for transaction-enabled applications.',
    '["Apply for e-NAM technology partnership through SFAC portal", "Build prototype using e-NAM sandbox APIs to validate your solution concept", "Interview 10 potential users (farmers/traders/FPOs) to validate demand for your e-NAM solution", "Develop pricing model with unit economics analysis for your e-NAM-based business"]'::jsonb,
    '["e-NAM API Developer Portal - https://enam.gov.in/developers", "e-NAM Technology Partnership Application - https://sfacindia.com/enam-partners", "AgriTech Platform Case Studies - https://nasscom.in/agritech", "e-NAM Data Analytics Dashboard - https://enam.gov.in/analytics"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 4: PM-KISAN & Agriculture Schemes
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'PM-KISAN & Agriculture Schemes', 'Comprehensive guide to government schemes for farmers and AgriTech enterprises.', 4, NOW(), NOW())
    RETURNING id INTO v_m4_id;

    -- Lesson 4.1: PM-KISAN Implementation & Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m4_id, 10, 'PM-KISAN Implementation & Benefits',
    'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is India''s largest direct benefit transfer program for agriculture, providing Rs 6,000 annual income support to over 11 crore farmer families. Understanding PM-KISAN implementation is valuable for AgriTech entrepreneurs building farmer-facing applications, FPOs seeking to support member farmers, and startups exploring data partnerships with government.

PM-KISAN provides Rs 6,000 per year in three equal installments of Rs 2,000 each, transferred directly to farmer bank accounts. The program covers all landholding farmer families except those in exclusion categories including institutional landholders, farmer families with members in constitutional posts, government employees, pensioners, and income tax payers.

Eligibility verification relies on state land records linked to Aadhaar-seeded bank accounts. The verification process cross-references farmer claims against land registry databases (digitized under DILRMP), Aadhaar authentication confirms identity, and bank account validation ensures DBT capability. This digital infrastructure has enabled scheme scale while minimizing fraudulent claims.

The total outlay since 2019 launch exceeds Rs 3.04 lakh crore distributed to over 11.8 crore beneficiaries. The average disbursement per beneficiary is approximately Rs 25,000 over the program duration. State-wise coverage is highest in Uttar Pradesh (2.7 crore beneficiaries), followed by Maharashtra, Rajasthan, and Madhya Pradesh.

Registration process involves farmer application through Common Service Centers, state agriculture departments, or the PM-KISAN portal with self-registration option. Required documents include Aadhaar card, land ownership documents (khata, patta, or equivalent), and bank account details. The application undergoes state-level verification before central approval.

PM-KISAN mobile app enables farmers to check beneficiary status, update details, and receive notifications. The app has over 10 crore downloads and provides a reference architecture for government-farmer digital engagement. AgriTech applications can guide farmers through PM-KISAN registration and status tracking as a value-added service.

Data ecosystem opportunities arise from PM-KISAN''s comprehensive farmer database including demographics, landholding, and banking information. While direct data access requires government partnership, aggregated insights inform market sizing, farmer segmentation, and targeting for AgriTech services. Schemes like PM Kisan Maan Dhan (pension) and PM Fasal Bima Yojana (crop insurance) leverage PM-KISAN data for enrollment.

Implementation challenges include exclusion errors where eligible farmers are denied benefits due to land record discrepancies or Aadhaar linking failures. AgriTech solutions that help farmers resolve documentation issues, track application status, and navigate grievance redressal provide tangible value while building farmer relationships.

Integration with AgriTech business models can leverage PM-KISAN payment timing (April, August, December) for input sales timing, use PM-KISAN registration as a proxy for farmer verification, and bundle scheme awareness with other advisory services. Some AgriTech lenders use PM-KISAN receipts as income proof for credit assessment.',
    '["Analyze PM-KISAN beneficiary coverage in your target district using public dashboards", "Develop user journey for helping non-registered farmers complete PM-KISAN enrollment", "Map PM-KISAN payment cycle to your business model for timing optimization", "Research PM-KISAN data partnership requirements through state agriculture department"]'::jsonb,
    '["PM-KISAN Official Portal - https://pmkisan.gov.in", "PM-KISAN Dashboard & Statistics - https://pmkisan.gov.in/dashboard", "State Land Records Portals (Bhoomi, Bhulekh etc) - https://dolr.gov.in/dilrmp", "DBT Agriculture Mission - https://dbtbharat.gov.in/agriculture"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 4.2: Crop Insurance & Risk Management Schemes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m4_id, 11, 'Crop Insurance & Risk Management Schemes',
    'Agricultural risk management through crop insurance and related schemes protects farmers from production and market risks while creating opportunities for AgriTech innovation in risk assessment, claims processing, and advisory services. Understanding these schemes is essential for startups serving the agricultural sector.

Pradhan Mantri Fasal Bima Yojana (PMFBY) is India''s flagship crop insurance program covering over 5.5 crore farmer applications annually with sum insured exceeding Rs 2.75 lakh crore. Farmer premium is capped at 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops, with balance premium shared between central and state governments.

Coverage includes yield losses from natural calamities (drought, flood, hail, cyclone, pest/disease), prevented sowing/planting, post-harvest losses for up to 14 days for notified crops, and localized calamities (hailstorm, landslide, inundation). Claim assessment uses Crop Cutting Experiments (CCEs) to determine actual yield versus threshold yield at the insurance unit level (typically village/panchayat).

Technology-driven claim settlement has transformed PMFBY operations. Satellite imagery and AI-based yield estimation reduce reliance on manual CCEs, enabling faster claim processing. Drones capture crop damage evidence for localized calamity claims. Mobile apps enable farmers to report crop damage with geotagged photographs. These technology interventions have reduced claim settlement time from months to weeks.

AgriTech opportunities in crop insurance include remote sensing companies providing satellite imagery and analytics to insurers, drone service providers for damage assessment, mobile platforms for farmer enrollment and claim intimation, and AI companies developing yield estimation models. The insurance companies and government actively seek technology partnerships to improve scheme efficiency.

Restructured Weather Based Crop Insurance Scheme (RWBCIS) provides payouts based on weather parameter deviations from normal rather than actual yield losses. Automatic weather stations at block level provide reference data. Parametric triggers enable immediate payouts when adverse weather thresholds are breached. This scheme covers about 10% of insured farmers.

PM Kisan Maan Dhan Yojana is a pension scheme for small and marginal farmers providing Rs 3,000 monthly pension after age 60. Farmers contribute Rs 55-200 per month (based on entry age) with matching government contribution. The scheme leverages PM-KISAN infrastructure for enrollment and can be bundled with AgriTech services targeting older farmers.

Agricultural Infrastructure Fund (AIF) provides credit facilities for post-harvest infrastructure including warehouses, cold storage, and processing units with 3% interest subvention. The scheme has sanctioned over Rs 50,000 crore for 70,000+ projects. AgriTech startups can leverage AIF for infrastructure financing while serving farmers as aggregation points.

Accessing scheme benefits requires understanding complex eligibility criteria, application processes, and documentation requirements. AgriTech platforms that simplify scheme discovery, eligibility checking, and application tracking provide significant value to farmers while building engagement and data assets.',
    '["Map PMFBY coverage and notified crops in your target district for current season", "Research technology partnership opportunities with crop insurance companies", "Develop scheme eligibility checker for major agricultural schemes in your focus area", "Analyze AIF project sanction data for infrastructure gaps in your target geography"]'::jsonb,
    '["PMFBY Portal - https://pmfby.gov.in", "PMFBY Technology Guidelines - https://pmfby.gov.in/technology", "Agricultural Infrastructure Fund - https://agriinfra.dac.gov.in", "Crop Insurance Mobile App - https://pmfby.gov.in/app"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- =====================================================
    -- MODULE 5: Precision Farming & Smart Agriculture
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Precision Farming & Smart Agriculture', 'Implementing IoT, drones, and data-driven farming for improved yields and resource efficiency.', 5, NOW(), NOW())
    RETURNING id INTO v_m5_id;

    -- Lesson 5.1: IoT & Sensor Technologies for Farming
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 12, 'IoT & Sensor Technologies for Farming',
    'Internet of Things (IoT) technologies are transforming Indian agriculture by enabling real-time monitoring of soil conditions, weather, crop health, and irrigation systems. Understanding IoT deployment economics and operational requirements helps AgriTech entrepreneurs build viable sensor-based solutions for the Indian market.

Soil sensors measure parameters critical for precision agriculture including moisture content at multiple depths, temperature, electrical conductivity (proxy for salinity), pH levels, and nutrient content (nitrogen, phosphorus, potassium). Sensor costs range from Rs 500 for basic moisture sensors to Rs 25,000+ for multi-parameter devices with wireless connectivity.

Weather monitoring through automated weather stations (AWS) provides hyperlocal data for farm decisions. Key parameters include temperature, humidity, rainfall, wind speed/direction, solar radiation, and evapotranspiration. Mini weather stations suitable for farm deployment cost Rs 15,000-50,000 depending on sensor suite and connectivity options.

Connectivity options for rural IoT deployments include cellular (2G/4G), LoRaWAN, NB-IoT, and satellite. LoRaWAN offers optimal range (10-15km) and power efficiency for agricultural applications, with gateway costs of Rs 30,000-50,000 serving hundreds of sensors. Solar-powered sensor nodes with 5-year battery life minimize maintenance requirements.

Data platform requirements include time-series database for sensor data storage, real-time processing for alerts and triggers, visualization dashboards for farmer access, and integration APIs for third-party applications. Cloud platforms like AWS IoT, Azure IoT Hub, or Google Cloud IoT provide managed infrastructure, though cost optimization requires careful architecture design.

Irrigation automation represents the highest-value IoT application, enabling water savings of 25-40% while improving yields through optimal moisture management. Components include soil moisture sensors, weather data integration, pump controllers, valve actuators, and mobile/web dashboard. Government subsidies under PM Krishi Sinchai Yojana cover 55-75% of micro-irrigation system costs including automation.

Implementation challenges in Indian conditions include sensor durability in harsh environments (dust, heat, humidity), theft and vandalism in open fields, power availability in remote locations, connectivity gaps in rural areas, and farmer training for system operation. Successful deployments address these through ruggedized hardware, community ownership models, and simple user interfaces.

Business models for IoT in agriculture include hardware sales with annual service subscriptions, sensor-as-a-service with no upfront cost, bundling with insurance products where sensor data validates claims, and B2B models serving agribusinesses, FPOs, or government programs. Unit economics typically require 50+ hectare deployments to achieve viability for pure-play sensor businesses.

The Sub-Mission on Agricultural Mechanization (SMAM) provides subsidies of 40-50% on IoT and automation equipment for farmers and FPOs. Custom Hiring Centers operated by FPOs can access 80% subsidy, making precision agriculture equipment accessible to small farmers through shared services.',
    '["Evaluate 3 IoT sensor providers for your target application with cost-benefit analysis", "Design pilot deployment architecture for 10-hectare demonstration including hardware, connectivity, and platform", "Calculate unit economics for sensor-as-a-service model in your target geography", "Research SMAM subsidy application process for precision agriculture equipment"]'::jsonb,
    '["Digital Agriculture Mission - IoT Guidelines - https://agricoop.gov.in/dam-iot", "SMAM Subsidy Scheme - https://agrimachinery.nic.in/smam", "AWS IoT for Agriculture - https://aws.amazon.com/iot/agriculture", "LoRaWAN Deployment Guide for Agriculture - https://lora-alliance.org/agriculture"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 5.2: Agricultural Drones & Aerial Technology
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 13, 'Agricultural Drones & Aerial Technology',
    'Agricultural drones represent one of the fastest-growing AgriTech segments in India, with government support accelerating adoption through subsidies, favorable regulations, and integration into public programs. Understanding drone applications, regulations, and business models is essential for entrepreneurs in precision agriculture.

Primary agricultural applications include crop health monitoring through multispectral imaging, precision spraying of pesticides and nutrients, seed broadcasting for paddy and pasture, crop counting and yield estimation, and land surveying and mapping. Each application has distinct hardware requirements, operational parameters, and value propositions.

Spraying drones have achieved product-market fit with demonstrated 10x productivity versus manual spraying (10-12 acres per hour versus 1 acre), 90% reduction in water usage, 30% reduction in chemical usage through precise application, and reduced human exposure to hazardous chemicals. Payload capacity ranges from 10-25 liters with flight times of 10-20 minutes per battery.

Regulatory framework under DGCA Drone Rules 2021 requires drone registration on Digital Sky platform, pilot certification (Remote Pilot Certificate), operational approvals for commercial operations, and insurance coverage. Agricultural drones operating below 400 feet in uncontrolled airspace have simplified approval requirements. DGCA has approved specific drone models for agricultural use.

Government subsidies provide significant support for agricultural drone adoption. Under the Kisan Drone scheme, subsidies of 40% (up to Rs 4 lakh) are available for individual farmers, 50% for FPOs, SC/ST farmers, women, and northeastern states, 75% for agricultural institutions, and 100% for Custom Hiring Centers operated by FPOs. This subsidy structure makes FPO-operated drone services the most viable model.

Drone-as-a-service business model enables entrepreneurs to offer spraying services without farmers purchasing expensive equipment. Service pricing typically ranges Rs 400-600 per acre for spraying, with operators achieving Rs 15,000-25,000 daily revenue during peak season. Key success factors include geographic density of customers, quick turnaround time, and quality of spraying coverage.

Multispectral imaging for crop health monitoring uses vegetation indices (NDVI, NDRE) to identify stress before visible symptoms appear. Services include early pest/disease detection, irrigation management recommendations, and variable rate application maps. Monetization through advisory subscriptions or integration with input sales companies provides recurring revenue.

Operational considerations include weather dependency (wind speed below 15 km/h, no rain), battery management (6-8 batteries for full-day operation), chemical handling and safety training, maintenance and repair capabilities, and seasonal demand fluctuation. Successful operators develop diversified service portfolios including non-agricultural applications during off-season.

Training and certification requirements include DGCA Remote Pilot Certificate (10-day course, Rs 25,000-40,000), manufacturer-specific training for agricultural drones, and chemical handling certification from state agriculture departments. Drone pilot training centers have proliferated across India with government recognition.',
    '["Complete DGCA Remote Pilot Certificate training and examination", "Develop business plan for drone-as-a-service including equipment cost, operating expenses, and revenue projections", "Identify FPOs in your region interested in Custom Hiring Center subsidy for agricultural drones", "Map competitive landscape of drone service providers in your target geography"]'::jsonb,
    '["DGCA Drone Rules 2021 - https://digitalsky.dgca.gov.in/rules", "Kisan Drone Scheme Guidelines - https://agricoop.gov.in/kisan-drone", "Remote Pilot Training Organizations - https://digitalsky.dgca.gov.in/rpto", "Agricultural Drone Manufacturers Directory - https://dronesindia.gov.in/agriculture"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 5.3: Satellite Imagery & Remote Sensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 14, 'Satellite Imagery & Remote Sensing',
    'Satellite-based remote sensing provides scalable crop monitoring capabilities that complement ground-based sensors and drones. Understanding satellite data sources, analytical techniques, and application development enables AgriTech entrepreneurs to build intelligence services covering millions of hectares.

Satellite data sources range from free government programs to commercial high-resolution providers. Sentinel-2 (ESA) offers 10-20m resolution with 5-day revisit, ideal for vegetation monitoring over large areas. Landsat (NASA/USGS) provides 30m resolution with 16-day revisit and 40+ years historical archive. Indian satellites RESOURCESAT-2 and Cartosat provide additional coverage. Commercial providers like Planet (3m daily), Maxar (30cm), and Airbus offer higher resolution at premium pricing.

Key agricultural applications include crop type classification and acreage estimation, crop health monitoring through vegetation indices, yield prediction and harvest timing, drought and flood assessment, and farm boundary delineation. Accuracy levels vary by application, with crop classification achieving 85-95% accuracy and yield prediction within 10-15% of actual yields.

Vegetation indices computed from multispectral imagery quantify crop vigor and stress. Normalized Difference Vegetation Index (NDVI) using red and near-infrared bands is the most common metric. Enhanced indices like NDRE (using red edge band) better detect chlorophyll content and nitrogen status. Time-series analysis of indices reveals crop growth stages and anomalies.

Cloud computing platforms enable processing at scale without local infrastructure. Google Earth Engine provides free access to satellite archives with cloud processing for research and non-commercial use. AWS, Azure, and GCP offer commercial satellite data and processing services. These platforms reduce entry barriers for startups building satellite-based applications.

Advisory services integrate satellite insights with agronomic recommendations. Services include optimal sowing date guidance based on soil moisture and weather forecasts, irrigation scheduling using evapotranspiration models, pest and disease risk alerts from vegetation anomaly detection, and harvest timing optimization from crop maturity assessment. Delivery through mobile apps with vernacular support reaches farmers directly.

Insurance and finance applications represent growing markets for satellite analytics. Crop insurers use satellite yield estimation to validate claims and expedite settlements. Lenders use crop monitoring data for portfolio risk management and early warning of potential defaults. These B2B applications offer more predictable revenue than farmer-facing advisory services.

Building satellite analytics capabilities requires expertise in remote sensing, GIS, and machine learning. Pre-built APIs from providers like Descartes Labs, Planet Analytic Feeds, or Indian startups like SatSure and CropIn reduce development time. Alternatively, open-source tools (GDAL, Rasterio, scikit-learn) enable custom development with lower ongoing costs.

Integration with India AgriStack creates opportunities as the Digital Agriculture Mission develops national crop sown registry, farmer database, and land parcel database. Satellite-based crop monitoring will feed into this infrastructure, creating partnerships opportunities for companies with proven analytical capabilities.',
    '["Set up Google Earth Engine account and complete introductory tutorials", "Download and analyze Sentinel-2 imagery for your target geography over one crop season", "Develop prototype crop health monitoring service for a pilot area of 1000 hectares", "Research partnership opportunities with crop insurance companies for satellite analytics"]'::jsonb,
    '["Google Earth Engine for Agriculture - https://earthengine.google.com/agriculture", "Sentinel Hub Agricultural Applications - https://sentinel-hub.com/agriculture", "ISRO Bhuvan Geoportal - https://bhuvan.nrsc.gov.in", "FAO Earth Observation for Agriculture - https://www.fao.org/earth-observation"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 6: AgriFintech & Rural Finance
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'AgriFintech & Rural Finance', 'Building financial technology solutions for agriculture including lending, insurance, and payments.', 6, NOW(), NOW())
    RETURNING id INTO v_m6_id;

    -- Lesson 6.1: Agricultural Credit Ecosystem in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 15, 'Agricultural Credit Ecosystem in India',
    'The agricultural credit ecosystem in India presents massive opportunity for fintech innovation, with an estimated Rs 12 lakh crore credit gap despite government programs targeting universal financial inclusion. Understanding the current landscape, regulatory framework, and pain points enables entrepreneurs to build solutions that expand credit access while managing risk.

Institutional credit sources include commercial banks (target of 18% of adjusted net bank credit for agriculture), Regional Rural Banks (RRBs) with rural focus, cooperative banks at state, district, and primary levels, and NABARD as the apex development finance institution. Despite regulatory targets, over 50% of agricultural credit comes from informal sources at interest rates of 24-60% annually.

Kisan Credit Card (KCC) is the primary formal credit instrument for farmers, providing working capital for crop production, allied activities, and personal needs. KCC limits are set based on land holding and cropping pattern, with interest subvention reducing effective rate to 4% for timely repayment. Despite 7+ crore KCC accounts, utilization and renewal rates remain low due to documentation requirements and branch access challenges.

Alternative data for credit underwriting represents the key fintech opportunity. Traditional credit scoring fails in rural markets due to lack of formal income documentation and thin credit files. Innovative data sources include satellite imagery for land verification and crop monitoring, mobile usage patterns and digital transaction history, input purchase records from agri-retailers, government scheme enrollment (PM-KISAN, PMFBY), and social network analysis for community-based lending.

Regulatory pathways for agri-lending include NBFC registration for direct lending (minimum net owned fund Rs 2 crore for investment/loan company), NBFC-MFI for microfinance lending up to Rs 1.25 lakh, digital lending partnership with banks or NBFCs (LSP model), and peer-to-peer lending platform registration with RBI. Each pathway has distinct capital requirements, compliance burden, and operational constraints.

Embedded finance within agricultural value chains creates natural repayment mechanisms that reduce default risk. Input financing recovered through output procurement linkages has demonstrated default rates below 3%. This model requires integration with aggregators, FPOs, or processors who control produce offtake. Companies like DeHaat and Samunnati have built significant loan books through embedded finance approaches.

Technology infrastructure for agri-lending includes loan origination systems with vernacular interface and offline capability, underwriting engines integrating alternative data sources, loan management systems for disbursement, collection, and reporting, and customer communication through SMS, WhatsApp, and voice. Cloud-based lending platforms from providers like Nucleus, Finflux, or open-source alternatives reduce development time.

Collection challenges in rural markets require innovative approaches beyond traditional methods. Approaches include aligning repayment with harvest cash flows, group lending with joint liability, collection through trusted intermediaries (input dealers, FPO staff), and digital payment integration with UPI and Aadhaar-enabled payment systems. Behavioral interventions including commitment devices and social recognition improve repayment rates.

Interest rate caps under RBI guidelines limit pricing flexibility for small-value loans, requiring scale and efficiency to achieve viable unit economics. Priority sector lending certificates (PSLCs) provide additional revenue for lenders meeting agricultural lending targets.',
    '["Map credit demand and supply gap in your target geography through farmer and FPO interviews", "Evaluate alternative data sources available for credit underwriting in your target segment", "Analyze unit economics of agri-lending for different loan sizes and tenures", "Research partnership opportunities with NBFCs or banks for digital lending collaboration"]'::jsonb,
    '["RBI Master Direction on Digital Lending - https://rbi.org.in/digital-lending", "NABARD Rural Finance Guidelines - https://nabard.org/rural-finance", "Kisan Credit Card Scheme - https://pmkisan.gov.in/kcc", "AgriFintech Investment Landscape Report - https://omnivore.vc/agri-fintech"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 6.2: Building Agri-Credit Products
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 16, 'Building Agri-Credit Products',
    'Successful agri-credit products require careful design that balances farmer needs, risk management, and operational efficiency. This lesson covers product design principles, underwriting approaches, and portfolio management strategies for agricultural lending.

Crop production loans represent the largest agricultural credit segment, financing seeds, fertilizers, pesticides, labor, and machinery rental for crop cultivation. Loan size typically ranges Rs 10,000-50,000 per acre depending on crop and region. Tenure aligns with crop cycle (4-6 months for most crops), with bullet repayment at harvest. Interest rates under priority sector guidelines range 7-14% depending on lender type and risk category.

Agricultural term loans finance capital investments including farm equipment, irrigation systems, livestock, orchards, and farm infrastructure. Loan sizes range Rs 1-50 lakh with tenures of 3-10 years and monthly or quarterly repayment. Collateral requirements typically include hypothecation of financed asset plus additional security for larger loans. Equipment financing through manufacturer partnerships enables streamlined underwriting.

Warehouse receipt financing provides working capital against stored agricultural produce, enabling farmers to hold inventory for better prices rather than distress selling at harvest. Loan-to-value ratios of 60-70% against current market prices, with tenure of 3-6 months. WDRA-registered warehouses provide assurance of storage quality and produce verification.

Underwriting models for agriculture must account for production risk (weather, pests), price risk (market volatility), and repayment capacity (cash flow timing). Key underwriting parameters include land ownership verification (through state land records), cropping history (satellite imagery, input purchase records), irrigation status (bore well, canal, rainfed), historical yields and prices for the crop/region, existing debt obligations, and household income diversity.

Credit scoring for agriculture combines traditional financial data where available with alternative data sources. Models typically incorporate land quality scores from soil data and satellite imagery, crop risk scores from historical yield variability, farmer behavior scores from digital transaction patterns, and social scores from community references and group membership. Machine learning models trained on portfolio performance data continuously improve prediction accuracy.

Risk mitigation strategies include crop insurance linkage (mandatory PMFBY enrollment for loans above Rs 1 lakh), group lending structures where members guarantee each other, output market linkage ensuring repayment source, staggered disbursement aligned with input purchase timing, and weather-indexed loan covenants adjusting terms based on conditions.

Portfolio management requires monitoring of early warning indicators including crop condition from satellite imagery, local weather deviations from normal, market price movements, and borrower communication patterns. Proactive restructuring before default improves recovery rates and maintains farmer relationships. Geographic and crop diversification reduces correlation risk in the portfolio.

Collections strategy should align with agricultural cash flows. Flexible repayment windows around harvest time (2-4 weeks) accommodate selling timing variability. Field collection through agents reduces default from access barriers. Digital payment options (UPI, Aadhaar-enabled) provide convenience while reducing cash handling costs.',
    '["Design crop production loan product for your target crop including pricing, terms, and eligibility criteria", "Develop credit scoring model specification incorporating available data sources", "Create underwriting checklist and documentation requirements for pilot lending", "Design portfolio monitoring dashboard with early warning indicators"]'::jsonb,
    '["Agricultural Lending Best Practices - IFC - https://ifc.org/agri-lending", "Credit Risk in Agriculture - NABARD - https://nabard.org/credit-risk", "Alternative Data for Agri-Credit - https://cgap.org/alternative-data", "PM Fasal Bima Yojana Integration - https://pmfby.gov.in/lenders"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 6.3: Digital Payments & Financial Inclusion
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 17, 'Digital Payments & Financial Inclusion',
    'Digital payment adoption in rural India has accelerated dramatically, with UPI reaching over 80% of rural districts and Aadhaar-enabled payments providing universal access. AgriTech entrepreneurs can leverage this infrastructure to reduce transaction costs, improve farmer engagement, and build financial data trails that enable credit access.

UPI penetration in rural markets has exceeded expectations, driven by smartphone adoption, merchant acceptance incentives, and government direct benefit transfers. Monthly rural UPI transactions grew 5x between 2021-2025, with person-to-merchant payments driving volume growth. QR code acceptance at agricultural mandis, input shops, and village retail has become widespread.

Aadhaar-enabled Payment System (AePS) provides biometric-based transactions for populations without smartphones or bank branches. AePS enables cash withdrawal, balance inquiry, and fund transfer at Business Correspondent (BC) points. Over 1 crore AePS transactions occur daily, with high concentration in agricultural states. BC network expansion creates distribution opportunities for AgriTech services.

Payment integration in agricultural value chains creates operational efficiencies and data trails. Input purchases through digital payment improve working capital management for retailers while generating transaction history for farmer credit assessment. Output payments through direct farmer bank credit eliminate cash handling while providing proof of income. Service payments for mechanization, advisory, and insurance complete the digital record.

Financial data aggregation from digital transactions enables sophisticated farmer profiling. Account aggregator framework allows authorized access to bank account data with farmer consent. Transaction analysis reveals income patterns, expense categories, savings behavior, and creditworthiness indicators. This data powers underwriting models and personalized financial product recommendations.

Remittance services address the significant funds flow from urban migrant workers to rural farming families. Digital remittance through UPI apps has largely replaced traditional hawala channels, with lower costs and instant settlement. AgriTech platforms can capture remittance flows by positioning as the family financial hub, cross-selling input financing and savings products.

Savings and investment products tailored for agricultural households address underserved needs. Seasonal savings products aligned with harvest timing help farmers manage cash flow. Gold accumulation plans address cultural preferences for gold savings. Systematic investment plans adapted for irregular agricultural income enable wealth building. These products require SEBI/RBI licensing or partnerships with regulated entities.

Insurance distribution through digital channels expands protection coverage. Crop insurance enrollment through mobile apps with simplified workflows increases PMFBY adoption. Health insurance bundled with farmer loyalty programs addresses medical expense risk. Livestock insurance distributed through dairy cooperatives protects against animal loss. Insurance commission income supplements primary business revenue.

Building payment-led AgriTech businesses requires understanding regulatory requirements for payment aggregation, managing merchant relationships across rural geographies, handling cash-digital interoperability, and building trust through consistent service delivery. Successful models integrate payments within broader value propositions rather than competing on payments alone.',
    '["Map digital payment adoption and infrastructure in your target geography", "Design farmer payment journey for your platform including onboarding and transaction flows", "Evaluate Account Aggregator integration for farmer financial data access", "Research insurance distribution licensing and partnership requirements"]'::jsonb,
    '["NPCI UPI Ecosystem - https://npci.org.in/upi", "Aadhaar-enabled Payment System - https://uidai.gov.in/aeps", "Account Aggregator Framework - https://sahamati.org.in", "Digital Financial Inclusion Report - RBI - https://rbi.org.in/financial-inclusion"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 7: Supply Chain & Logistics Technology
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Supply Chain & Logistics Technology', 'Building efficient agricultural supply chains from farm to fork with technology solutions.', 7, NOW(), NOW())
    RETURNING id INTO v_m7_id;

    -- Lesson 7.1: Agricultural Cold Chain Infrastructure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 18, 'Agricultural Cold Chain Infrastructure',
    'India''s agricultural cold chain infrastructure gap results in estimated Rs 92,000 crore annual post-harvest losses, with only 4% of produce moving through cold chains versus 70% in developed countries. This presents massive opportunity for infrastructure investment and technology-enabled operations improvement.

Cold chain requirements vary by commodity. Fruits and vegetables require 0-15 degree Celsius storage depending on variety, with 85-95% relative humidity. Dairy requires 2-4 degrees with rapid cooling post-collection. Meat and poultry require -18 to -25 degrees for frozen storage. Each commodity has specific handling protocols, packaging requirements, and shelf life characteristics that determine infrastructure design.

Infrastructure components include precooling facilities at production clusters, pack houses for sorting, grading, and packaging, cold storage warehouses for inventory holding, refrigerated transport for inter-city movement, and retail cold storage for last-mile holding. Integration across these components through technology enables seamless cold chain management.

Government support under Pradhan Mantri Kisan SAMPADA Yojana provides capital subsidy of 35% (50% for northeastern states and difficult areas) for cold chain projects. The scheme has sanctioned Rs 40,000 crore for 7,000+ projects. Additional support under Agricultural Infrastructure Fund provides 3% interest subvention and credit guarantee for cold chain investments.

Business models include owned infrastructure with third-party operations (asset-light for operator), aggregator models connecting distributed cold storage capacity, and specialized logistics for specific commodities (dairy, pharma). Asset-light models using technology to optimize existing infrastructure have shown faster scaling with lower capital requirements.

IoT monitoring through temperature sensors, GPS tracking, and connectivity enables real-time visibility across the cold chain. Critical parameters include temperature deviations, door openings (break in cold chain), location and estimated arrival, and power status at storage facilities. Alert systems notify operators of deviations requiring intervention.

Temperature mapping and validation using data loggers documents cold chain integrity for food safety compliance and customer confidence. FSSAI regulations require temperature records for certain products. Blockchain-based records provide immutable evidence for premium market channels and export documentation.

Energy efficiency represents a significant operating cost component, with refrigeration consuming 50-70% of facility energy. Solar cold storage solutions have achieved viability for smaller facilities, with payback periods of 4-5 years. Variable frequency drives (VFDs) on compressors reduce energy consumption by 30-40% through capacity modulation.

Last-mile cold chain for e-commerce and retail delivery requires specialized solutions including insulated boxes with phase change materials for short-duration temperature maintenance, micro cold storage at dark stores and distribution points, and route optimization for refrigerated delivery vehicles. These solutions enable fresh produce delivery to urban consumers.',
    '["Map cold chain infrastructure gaps and capacity utilization in your target region", "Develop financial model for cold storage project including SAMPADA subsidy", "Evaluate IoT monitoring solutions and calculate deployment cost per facility", "Research solar cold storage technology providers and project economics"]'::jsonb,
    '["PM Kisan SAMPADA Yojana Guidelines - https://mofpi.gov.in/sampada", "NABARD Cold Chain Report - https://nabard.org/cold-chain", "FSSAI Food Safety Standards - https://fssai.gov.in/standards", "Cold Chain Technology Providers Directory - https://nccd.gov.in/providers"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 7.2: Farm-to-Fork Traceability Systems
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 19, 'Farm-to-Fork Traceability Systems',
    'Traceability systems that track agricultural products from farm to consumer are becoming essential for food safety compliance, quality differentiation, and consumer trust. Understanding traceability technologies and implementation approaches enables AgriTech entrepreneurs to serve growing demand from processors, retailers, and export markets.

Traceability requirements vary by market channel. Domestic organized retail increasingly demands source identification and basic handling records. Export markets require comprehensive documentation meeting destination country standards (EU, US, Japan, Middle East). Food safety regulations under FSSAI mandate batch traceability for processed foods with recall capability.

Key data elements captured in agricultural traceability include farm identification (location, farmer ID, certification status), production practices (inputs used, dates of operations), harvest details (date, quantity, quality parameters), post-harvest handling (storage, processing, transport), and custody transfers (each entity handling the product). GS1 standards provide globally recognized identification and data formats.

Technology architecture for traceability typically includes farm-level data capture through mobile apps or IoT devices, central database storing product journey information, integration APIs connecting supply chain participants, and consumer-facing interface (QR code scanning, web portal) for transparency. Cloud-based platforms reduce infrastructure requirements while enabling multi-party access.

QR codes on product packaging enable consumer access to traceability information. Scanning reveals farm source, production practices, handling history, and quality certifications. This transparency commands price premiums of 5-15% for products with verified origin and quality claims. QR-based engagement also enables direct farmer-consumer connection and loyalty programs.

Blockchain technology provides immutable, distributed records suitable for high-value chains requiring maximum trust. Applications include export documentation with tamper-proof records, premium product authentication preventing fraud, and multi-party supply chains where no single entity controls data. However, blockchain adds complexity and cost versus centralized alternatives for many applications.

Implementation challenges include data capture at fragmented farm level, maintaining chain of custody through aggregation, integrating legacy systems of supply chain participants, and ensuring data accuracy and preventing fraud. Successful implementations start with high-value chains where traceability premium justifies implementation cost, then expand as systems mature.

Business models include SaaS platforms charging per-SKU or per-transaction fees, implementation services with ongoing support contracts, and vertical integration where traceability enables premium product positioning. B2B models serving processors and exporters offer more predictable revenue than farmer-facing applications.

FSSAI Food Safety Compliance System (FoSCoS) requires licensing for food businesses with compliance documentation. Traceability platforms that integrate FSSAI compliance workflows provide added value by reducing regulatory burden for food businesses. Integration with APEDA TraceNet is required for certain agricultural exports.',
    '["Map traceability requirements for your target commodity and market channels", "Design data model for farm-to-fork traceability including all capture points", "Evaluate traceability platform providers and build vs buy decision", "Develop pilot implementation plan for 100-farmer traceability proof of concept"]'::jsonb,
    '["GS1 India Traceability Standards - https://gs1india.org/traceability", "FSSAI FoSCoS Portal - https://foscos.fssai.gov.in", "APEDA TraceNet System - https://apeda.gov.in/tracenet", "Blockchain for Food Supply Chain - https://ibm.com/food-trust"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 7.3: Agricultural Logistics Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 20, 'Agricultural Logistics Optimization',
    'Agricultural logistics in India involves moving over 300 million tonnes of produce annually through fragmented infrastructure, creating opportunities for technology-enabled optimization. Understanding logistics challenges and solution approaches helps entrepreneurs reduce wastage, improve farmer realization, and serve growing organized market demand.

First-mile aggregation from farms to collection points presents unique challenges including small lot sizes (often less than 100kg per farmer), quality variability requiring sorting at collection, timing sensitivity for perishables, and road infrastructure limitations in rural areas. Solutions include village-level collection centers, mobile collection vehicles, and digital scheduling to optimize collector routes.

Transportation modes include truck transport for bulk movement (dominates long-haul), train transport for specific corridors (Kisan Rail with 50% subsidy), and air transport for high-value perishables (reduced charges under Krishi Udan). Mode selection depends on distance, volume, value, and time sensitivity. Multimodal solutions combining rail/road optimize cost-speed tradeoffs.

Fleet management technology for agricultural transport includes GPS tracking for real-time visibility, route optimization considering load, destination, and traffic, driver behavior monitoring for fuel efficiency and safety, and maintenance scheduling to minimize breakdowns. Agricultural-specific features include temperature monitoring for refrigerated vehicles and compatibility with mandi timing and procedures.

Load matching platforms connect farmers and transporters, reducing empty running and improving truck utilization. Agricultural loads are challenging due to seasonal concentration, one-directional flows (rural to urban), and commodity-specific handling requirements. Successful platforms aggregate demand across multiple shippers and provide guaranteed payment to transporters.

Warehouse and distribution network design considers production geography (sourcing locations), demand centers (cities, processing facilities), infrastructure availability (roads, power, labor), and regulatory factors (mandi locations, interstate movement). Network optimization models determine optimal facility locations and capacities to minimize total logistics cost while meeting service levels.

Last-mile distribution to retail and food service requires different approaches than bulk logistics. Challenges include order fragmentation (small quantities to many locations), delivery windows (early morning for fresh), returns handling (quality rejection), and urban congestion. Solutions include dark stores/micro-warehouses, route optimization with dynamic scheduling, and electric vehicles for urban delivery.

Logistics technology providers in India include full-stack logistics companies (Rivigo, Delhivery with cold chain), freight marketplaces (BlackBuck, Porter), and specialized agricultural logistics (Ecozen, NinjaCart logistics). Build vs partner decisions depend on scale, differentiation needs, and capital availability.

Government initiatives supporting agricultural logistics include Kisan Rail with 50% tariff subsidy for notified commodities, Krishi Udan with reduced cargo charges from 16 airports, Gati Shakti multimodal infrastructure planning, and PM Gati Shakti National Master Plan integrating logistics planning. Entrepreneurs should leverage these programs for cost advantage.',
    '["Map agricultural commodity flows and logistics infrastructure in your target region", "Analyze first-mile aggregation cost structure and identify optimization opportunities", "Evaluate logistics technology providers for partnership or integration", "Research Kisan Rail and Krishi Udan eligibility and procedures for your commodities"]'::jsonb,
    '["Kisan Rail Scheme - https://indianrailways.gov.in/kisan-rail", "Krishi Udan Scheme - https://civilaviation.gov.in/krishi-udan", "PM Gati Shakti Portal - https://gatishakti.gov.in", "Agricultural Logistics Report - CII - https://cii.in/agri-logistics"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 8: APEDA Export & International Markets
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'APEDA Export & International Markets', 'Navigating agricultural product exports through APEDA registration and international market access.', 8, NOW(), NOW())
    RETURNING id INTO v_m8_id;

    -- Lesson 8.1: APEDA Registration & Export Licensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 21, 'APEDA Registration & Export Licensing',
    'Agricultural and Processed Food Products Export Development Authority (APEDA) is the statutory body responsible for promoting export of agricultural and processed food products from India. APEDA registration is mandatory for exporters of scheduled products and provides access to export promotion schemes, market intelligence, and trade facilitation services.

APEDA registration is required for export of fruits, vegetables, and their products, meat and meat products, poultry and poultry products, dairy products, confectionery, biscuits and bakery products, honey, jaggery and sugar products, cocoa products, alcoholic and non-alcoholic beverages, cereals and cereal products, groundnuts, peanuts, and walnuts, pickles, papads, chutneys, guar gum, floriculture products, and herbal and medicinal plants.

Registration process involves online application through APEDA portal (apeda.gov.in), document submission including company registration, GST certificate, IEC code, and bank details, payment of registration fee (Rs 5,000 for 5 years for exporters, Rs 3,000 for manufacturers), verification by APEDA regional office, and issuance of Registration-Cum-Membership Certificate (RCMC). Processing time is typically 7-14 days.

Benefits of APEDA registration include eligibility for export promotion schemes and subsidies, access to TraceNet for compliance with importing country requirements, participation in international trade fairs sponsored by APEDA, market access assistance for new markets, and recognition as legitimate agricultural exporter for banking and compliance purposes.

Export promotion schemes administered by APEDA include Market Access Initiative (MAI) providing 75-100% assistance for market development activities, Transport Assistance Scheme covering up to 50% of freight costs for specified products, Infrastructure Development Assistance for export-oriented facilities, Quality Development & Brand Promotion support, and Market Intelligence and Research support.

TraceNet is APEDA''s traceability system for agricultural exports, mandatory for certain products to specific destinations (particularly EU). The system tracks produce from farm to export container with documentation of production practices, processing, and handling. TraceNet registration is separate from APEDA registration and requires additional compliance procedures.

Export documentation requirements include commercial invoice, packing list, bill of lading/airway bill, certificate of origin (issued by Chamber of Commerce), phytosanitary certificate (for plant products, issued by Plant Quarantine), health certificate (for animal products, issued by FSSAI/EIC), and product-specific certificates (organic, halal, etc.) as required by destination.

Common compliance challenges include meeting maximum residue limits (MRLs) for pesticides in destination countries, phytosanitary requirements for specific pests, labeling requirements varying by country, documentation accuracy and completeness, and cold chain maintenance for perishables. APEDA provides guidance and testing facility references to help exporters meet requirements.',
    '["Complete APEDA registration application for your export business", "Identify scheduled products in your portfolio and specific APEDA compliance requirements", "Research export promotion schemes applicable to your products and prepare application", "Register on TraceNet and understand traceability documentation requirements"]'::jsonb,
    '["APEDA Registration Portal - https://apeda.gov.in/registration", "TraceNet System - https://apeda.gov.in/tracenet", "APEDA Export Schemes - https://apeda.gov.in/schemes", "Export Documentation Guide - https://dgft.gov.in/export-docs"]'::jsonb,
    45, 100, 1, NOW(), NOW());

    -- Lesson 8.2: International Market Access Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 22, 'International Market Access Strategy',
    'Successful agricultural export requires understanding destination market requirements, competitive positioning, and channel strategies. India''s agricultural exports reached $53 billion in 2024-25, with opportunities across diverse markets and product categories.

Major export destinations vary by product category. Middle East (UAE, Saudi Arabia) leads for rice, fruits, vegetables, and meat. Southeast Asia (Vietnam, Bangladesh, Malaysia) imports rice, spices, and processed foods. European Union imports organic products, spices, and processed foods despite stringent compliance. United States imports spices, processed foods, and organic products. African markets are growing for rice and processed foods.

Market research before entry should analyze import demand trends and growth, competitive landscape (other origin countries, price points), regulatory requirements and compliance cost, distribution channel structure, and consumer preferences and packaging requirements. APEDA market intelligence reports and trade missions provide valuable insights.

Product adaptation for export markets includes meeting quality and safety standards (MRLs, microbiological limits), sizing and grading to market preferences, packaging design meeting labeling requirements, shelf life considerations for transit time, and pricing strategy considering duties, logistics, and competition.

Export channel options include direct export to importers/distributors requiring relationship building and market knowledge, export through trading companies providing market access with margin sharing, online platforms (Alibaba, Amazon Global) for smaller volumes and market testing, and participation in trade fairs for buyer discovery. Most successful exporters combine multiple channels.

Sanitary and Phytosanitary (SPS) compliance is the primary technical barrier for agricultural exports. Requirements vary by destination: EU has the most stringent MRL limits requiring careful pesticide management, US FDA requires prior notice and facility registration, Gulf countries require halal certification for meat products, and Japan has comprehensive testing requirements. Investing in compliance capability is essential for premium market access.

Trade agreements improve market access through reduced tariffs. Key agreements for agricultural products include India-ASEAN FTA (zero duty on many products), India-Japan CEPA (preferential access for specific items), and ongoing negotiations for India-EU, India-UK, and India-GCC FTAs. Understanding agreement provisions enables competitive pricing in covered markets.

Export financing options include pre-shipment credit from banks at concessional rates, post-shipment credit until buyer payment receipt, Export Credit Guarantee Corporation (ECGC) insurance against buyer default, and factoring/forfaiting for immediate payment against receivables. Export documentation quality affects financing availability and cost.

Building export capability requires sustained investment over multiple seasons. Start with less demanding markets (Middle East, Southeast Asia) to build operational competence before targeting stringent markets (EU, Japan). Develop relationships with reliable logistics partners, testing laboratories, and compliance consultants.',
    '["Analyze top 5 destination markets for your product category with demand, competition, and requirements", "Develop compliance roadmap for your target market including testing, certification, and documentation", "Identify potential importers and distributors in target market through trade databases", "Prepare cost analysis including FOB, CIF, duties, and competitive pricing for target market"]'::jsonb,
    '["APEDA Export Statistics & Market Intelligence - https://apeda.gov.in/statistics", "India Trade Portal - FTA Database - https://indiantradeportal.in", "ECGC Export Credit Insurance - https://ecgc.in", "EU Import Requirements Database - https://trade.ec.europa.eu/access-to-markets"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 8.3: Export Documentation & Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 23, 'Export Documentation & Compliance',
    'Export documentation accuracy and compliance determine whether shipments clear customs smoothly and payments are received on time. This lesson covers the complete documentation workflow and compliance requirements for agricultural exports.

Pre-shipment documentation begins with export contract specifying product specifications, quantity, price (Incoterms), payment terms, shipping schedule, and documentation requirements. Letter of credit (L/C) terms must be carefully reviewed as any documentation discrepancy can result in payment rejection or delay.

Commercial invoice must match contract and L/C terms exactly, including product description in specified format, quantity and unit, unit price and total value in contract currency, Incoterms (FOB, CIF, etc.), buyer and seller details, and HS codes for customs classification. Any discrepancy triggers L/C rejection.

Packing list details container contents including carton/bag count, gross and net weights, dimensions, lot/batch identification, and marks and numbers matching physical packaging. Accurate packing list enables smooth customs clearance and cargo handling at destination.

Certificate of Origin verifies Indian origin for preferential tariff treatment under trade agreements or buyer requirements. Issued by authorized Chambers of Commerce, Export Promotion Councils, or APEDA. Application requires proof of manufacturing/processing in India and may require factory inspection for first-time issuance.

Phytosanitary certificate is mandatory for plant products, issued by Plant Quarantine stations after inspection confirming shipment is free from specified pests and meets destination country requirements. Pre-shipment inspection must be scheduled allowing time for testing if required. Different destinations have different pest lists and treatment requirements.

Health certificate for processed food exports is issued by FSSAI-authorized agencies or Export Inspection Council (EIC), certifying product meets food safety requirements. Laboratory testing may be required for microbiological parameters, additives, and contaminants. FSSAI licensing of export facility is prerequisite.

Bill of Lading (ocean) or Airway Bill (air) is the contract of carriage and title document. Key details include shipper and consignee, port of loading and discharge, container number and seal, freight payment terms, and notify party. Clean bill of lading (without damage notations) is typically required for L/C negotiation.

Customs procedures under Indian Customs Electronic Gateway (ICEGATE) include shipping bill filing with product details, value, and documentation, customs examination and out of charge, Authorized Economic Operator (AEO) status for expedited processing, and drawback claims for duty refund on inputs.

Common documentation errors causing delays or payment issues include product description mismatch between documents, weight or quantity discrepancies, missing or incorrect certificates, late shipment versus L/C deadline, and typographical errors in buyer name or address. Pre-shipment document review checklist prevents most errors.

Compliance monitoring requires staying current on destination country requirement changes, testing schedule to verify MRL compliance, and record keeping for traceability and audit. APEDA and industry associations provide alerts on regulatory changes affecting exports.',
    '["Create export documentation checklist specific to your product and target markets", "Establish relationships with testing laboratories, certification bodies, and customs brokers", "Process trial documentation set for sample shipment to validate procedures", "Set up compliance monitoring for destination country requirement changes"]'::jsonb,
    '["ICEGATE Customs Portal - https://icegate.gov.in", "Plant Quarantine Information System - https://plantquarantineindia.nic.in", "Export Inspection Council - https://eicindia.gov.in", "FSSAI Export Guidelines - https://fssai.gov.in/export"]'::jsonb,
    45, 100, 3, NOW(), NOW());

    -- =====================================================
    -- MODULE 9: Organic Certification & Sustainable Agriculture
    -- =====================================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Organic Certification & Sustainable Agriculture', 'Navigating NPOP certification, organic production, and sustainable farming practices.', 9, NOW(), NOW())
    RETURNING id INTO v_m9_id;

    -- Lesson 9.1: National Programme for Organic Production (NPOP)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 24, 'National Programme for Organic Production (NPOP)',
    'The National Programme for Organic Production (NPOP) is India''s regulatory framework for organic certification, equivalent to international standards including EU and USDA organic. Understanding NPOP enables farmers, FPOs, and agribusinesses to access premium organic markets domestically and internationally.

NPOP establishes standards for organic production covering crop production, animal husbandry, and processing. Key requirements include no synthetic chemicals (fertilizers, pesticides, hormones), maintaining soil health through organic practices, documented farm management plan, mandatory conversion period (2-3 years), and regular inspection and certification.

Certification pathway involves selecting an accredited certification body (20+ agencies accredited under NPOP), farm registration and initial assessment, developing organic system plan documenting practices, conversion period with annual inspections (minimum 2 years for annual crops, 3 years for perennials), and certification issuance after successful final inspection.

Certification bodies accredited under NPOP include government agencies like APEDA-empaneled certifiers and private certification bodies like OneCert, Control Union, ECOCERT, IMO, and SGS. Selection criteria include geographic coverage, cost structure, reputation with export buyers, and capability for additional certifications (EU organic, USDA NOP).

Cost of certification includes application and registration fees (Rs 5,000-15,000), annual inspection fees (Rs 3,000-10,000 per inspection plus travel), testing costs for soil and residue analysis (Rs 5,000-15,000), and certification fees based on area and production volume. Group certification reduces per-farm cost significantly.

Group certification through Internal Control System (ICS) enables smallholder farmers to certify collectively. The ICS organization (typically FPO or aggregator) implements internal quality management with documented procedures, internal inspections of all farmers annually, traceability from farm to sale, and external audit by certification body sampling 10-25% of farmers. This model has enabled organic certification for over 1 million small farmers in India.

Conversion period requirements prohibit organic labeling during the 2-3 year transition, create financial strain as farmers bear higher costs without premium prices. Support programs under Paramparagat Krishi Vikas Yojana (PKVY) provide Rs 50,000 per hectare over 3 years for conversion support including certification costs, inputs, and training.

Organic inputs must be sourced from approved sources or produced on-farm. Permitted inputs include organic manures (compost, vermicompost, green manure), biological pest controls (neem, trichoderma, NPV), and approved mineral inputs (rock phosphate, lime). Input certification and documentation is required for compliant production.

Maintaining certification requires annual renewal with inspection, documented compliance with organic standards, traceability records for all inputs and outputs, and corrective action for any non-conformities identified. Loss of certification results from prohibited substance use, inadequate documentation, or failed residue testing.',
    '["Select certification body based on your market requirements and obtain application materials", "Develop organic system plan documenting current practices and conversion plan", "Design Internal Control System if pursuing group certification", "Apply for PKVY support to offset conversion period costs"]'::jsonb,
    '["NPOP Standards & Guidelines - https://apeda.gov.in/npop", "Accredited Certification Bodies List - https://apeda.gov.in/certification-bodies", "Paramparagat Krishi Vikas Yojana - https://pgsindia-ncof.gov.in/pkvy", "Organic Farming Guidelines - ICAR - https://icar.org.in/organic"]'::jsonb,
    60, 150, 1, NOW(), NOW());

    -- Lesson 9.2: Participatory Guarantee System (PGS)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 25, 'Participatory Guarantee System (PGS)',
    'Participatory Guarantee System (PGS) provides an alternative organic certification pathway focused on local markets, with lower costs and community-based verification. Understanding PGS enables farmers and FPOs to access domestic organic premiums without the complexity and cost of third-party certification.

PGS-India is operated by the National Centre of Organic Farming (NCOF) under the Ministry of Agriculture. The system certifies organic produce for domestic sale only (not valid for export). Over 15 lakh farmers are registered under PGS-India, demonstrating significant adoption.

Certification process involves farmer registration on PGS-India portal through Regional Council, Local Group formation (minimum 5 farmers in geographic proximity), peer appraisal where group members inspect each others farms annually, Regional Council verification and approval, and PGS-Green or PGS-Organic certificate issuance.

Certification categories include PGS-Green for farms in conversion period (first 2 years), and PGS-Organic for farms completing conversion and meeting all requirements. Both categories permit domestic organic marketing with appropriate labeling.

Cost advantage over third-party certification is significant. PGS has no certification fees (government-subsidized), minimal inspection cost (peer appraisal by fellow farmers), and simple documentation requirements. This makes organic certification accessible for small farmers selling locally.

Local Group requirements include minimum 5 member farmers within accessible distance, regular meetings for knowledge sharing and planning, collective responsibility for member compliance, and documentation of farming practices and peer inspections.

Regional Council oversees multiple Local Groups in a district or region. Functions include Local Group registration and monitoring, training for farmers and lead resource persons, verification of peer appraisal reports, and certificate issuance recommendation to NCOF.

Marketing through PGS leverages India Organic label (Jaivik Bharat) for consumer recognition. Marketing channels include organic farmers markets (mandis), direct sale to consumers, local retail and restaurants, and online platforms targeting local delivery. PGS certification is increasingly recognized by organized retail for domestic organic procurement.

Limitations of PGS include domestic market only (no export eligibility), lower international recognition than NPOP, and variable implementation quality across regions. Farmers targeting export markets or large institutional buyers typically need third-party NPOP certification.

Combining PGS and NPOP certification optimizes market access: PGS for domestic sales during conversion period, transitioning to NPOP for export-quality production after full conversion. This approach maximizes revenue during the challenging conversion period.',
    '["Register Local Group on PGS-India portal with minimum 5 farmers", "Develop peer appraisal procedures and documentation templates for Local Group", "Identify Regional Council and complete Local Group registration process", "Develop marketing plan for PGS-certified produce in local markets"]'::jsonb,
    '["PGS-India Portal - https://pgsindia-ncof.gov.in", "PGS Operational Guidelines - https://pgsindia-ncof.gov.in/guidelines", "Jaivik Bharat (India Organic) Portal - https://jaivikbharat.fssai.gov.in", "NCOF Organic Farming Resources - https://ncof.gov.in"]'::jsonb,
    45, 100, 2, NOW(), NOW());

    -- Lesson 9.3: Sustainable Agriculture & Climate-Smart Farming
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 26, 'Sustainable Agriculture & Climate-Smart Farming',
    'Sustainable and climate-smart agriculture practices are becoming essential as climate variability increases and consumers demand environmentally responsible production. Understanding these practices enables farmers and AgriTech entrepreneurs to build resilient production systems while accessing emerging sustainability premium markets.

Climate-smart agriculture (CSA) encompasses practices that increase productivity and income sustainably, build resilience to climate variability, and reduce greenhouse gas emissions where possible. The approach recognizes that agricultural practices must adapt to changing conditions while contributing to mitigation efforts.

Soil health management through organic matter addition, minimal tillage, cover cropping, and diverse rotations improves water holding capacity, nutrient cycling, and carbon sequestration. Healthy soils demonstrate 20-30% better water use efficiency and improved resilience to weather extremes.

Water-efficient practices include micro-irrigation (drip, sprinkler) reducing water use by 30-50%, mulching to reduce evaporation, rainwater harvesting for supplemental irrigation, and deficit irrigation strategies based on crop growth stage. Government subsidies under PM Krishi Sinchai Yojana cover 55-75% of micro-irrigation system costs.

Integrated Pest Management (IPM) reduces chemical dependence through pest monitoring and economic threshold-based decisions, biological control using natural predators and pathogens, cultural practices disrupting pest cycles, and targeted chemical use only when necessary. IPM typically reduces pesticide use by 30-50% while maintaining yields.

Natural farming approaches including Zero Budget Natural Farming (ZBNF) and Subhash Palekar Natural Farming eliminate purchased inputs through on-farm input preparation (Jeevamrutha, Beejamrutha), multi-cropping for pest management, indigenous cow-based preparations, and integration with trees and livestock. Several states provide support programs for natural farming transition.

Carbon markets present emerging opportunity for farmers adopting sustainable practices. Sequestration through improved soil management, agroforestry, and reduced tillage generates carbon credits. Voluntary carbon markets pay $10-30 per tonne CO2 equivalent. Aggregation through FPOs or project developers is required for smallholder participation.

Sustainability certification beyond organic includes Rainforest Alliance for tropical commodities, GlobalG.A.P. for food safety and sustainability, Fair Trade for social standards, and regenerative certifications (emerging). Multiple certifications enable access to different market segments with premium pricing.

AgriTech opportunities in sustainable agriculture include precision application technology reducing input use, monitoring and measurement systems for sustainability metrics, advisory platforms promoting sustainable practices, and market linkages connecting sustainable producers with buyers. These opportunities align startup success with positive environmental impact.

Government programs supporting sustainable practices include PKVY for organic farming (Rs 50,000/ha over 3 years), NMSA for climate-smart agriculture pilots, MIDH for horticulture with sustainable practices, and state-specific natural farming missions. Leveraging these programs accelerates farmer transition to sustainable practices.',
    '["Assess current farm practices against climate-smart agriculture principles", "Develop transition plan for soil health improvement and water efficiency", "Research carbon credit eligibility and aggregation opportunities for your region", "Identify sustainability certifications relevant to your target market and product"]'::jsonb,
    '["National Mission for Sustainable Agriculture - https://nmsa.dac.gov.in", "PM Krishi Sinchai Yojana - https://pmksy.gov.in", "ICAR Climate-Smart Agriculture Resources - https://icar.org.in/climate-smart", "Verra Agriculture Carbon Projects - https://verra.org/agriculture"]'::jsonb,
    45, 100, 3, NOW(), NOW());

END $$;

COMMIT;
