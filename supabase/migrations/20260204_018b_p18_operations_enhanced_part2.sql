-- THE INDIAN STARTUP - P18: Operations & Supply Chain - Enhanced Content Part 2
-- Migration: 20260204_018b_p18_operations_enhanced_part2.sql
-- Purpose: Continue P18 course content - Modules 5-8 (Days 21-40)
-- Depends on: 20260204_018a_p18_operations_enhanced_part1.sql

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_5_id TEXT;
    v_mod_6_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
BEGIN
    -- Get P18 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P18';

    -- ========================================
    -- MODULE 5: Quality Management Systems (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Quality Management Systems',
        'Build world-class quality infrastructure - ISO 9001 certification pathway, BIS standards compliance, Six Sigma methodology implementation, and creating a quality-driven organizational culture that reduces defects and improves customer satisfaction.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_5_id;

    -- Day 21: ISO 9001 Certification Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        21,
        'ISO 9001 Certification Framework for Indian Startups',
        'ISO 9001:2015 certification is the global gold standard for quality management systems, and obtaining it can transform your startup''s operational credibility. In India, the certification landscape offers diverse options with costs ranging from Rs 50,000 to Rs 2 lakh depending on organization size and complexity.

Understanding ISO 9001:2015 Structure: The standard follows a Plan-Do-Check-Act (PDCA) cycle with 10 core clauses. Clauses 1-3 cover scope and normative references. Clause 4 addresses organizational context - understanding your business environment and stakeholder needs. Clause 5 focuses on leadership commitment and quality policy. Clause 6 covers planning, risk assessment, and quality objectives. Clause 7 addresses support resources including competence, awareness, and documented information. Clause 8 is operational planning and control. Clauses 9-10 cover performance evaluation and continuous improvement.

Certification Cost Breakdown in India: For startups with 10-50 employees, expect certification costs of Rs 50,000-80,000 including consultant fees (Rs 30,000-50,000 for documentation support), certification body audit fees (Rs 15,000-25,000), and registration charges (Rs 5,000-10,000). Medium enterprises (50-200 employees) typically spend Rs 1-1.5 lakh. Larger organizations may invest Rs 1.5-2 lakh. Annual surveillance audits cost approximately Rs 15,000-25,000.

Major Certification Bodies in India: Bureau of Indian Standards (BIS) offers ISO certification through BIS Mark scheme. NABCB-accredited bodies include TUV India, Bureau Veritas, DNV-GL, SGS India, and Intertek. Choose accredited bodies recognized in your export markets - UKAS (UK), DAkkS (Germany), ANAB (USA) accreditation provides global recognition.

Implementation Timeline for Startups: Phase 1 (Months 1-2): Gap analysis against ISO requirements, management commitment, and project planning. A thorough gap analysis typically reveals 40-60% compliance in well-run startups. Phase 2 (Months 2-4): Documentation development including quality manual, procedures, work instructions, and forms. Focus on documenting what you actually do, not creating bureaucratic overhead. Phase 3 (Months 4-5): Implementation and training - deploy documented processes, train staff, and start record-keeping. Phase 4 (Month 5-6): Internal audit and management review to identify gaps before certification audit. Phase 5 (Month 6-7): Certification audit by external body, addressing any non-conformances, and certification issuance.

ROI of ISO Certification for Indian Startups: Customer acquisition - many B2B customers and government contracts require ISO certification. Export opportunities - ISO is minimum requirement for many international buyers. Operational efficiency - structured processes reduce waste and rework by 15-25%. Employee engagement - clear processes reduce confusion and improve productivity. Insurance premiums - some insurers offer 5-10% discounts for certified organizations. Investment readiness - demonstrates operational maturity to investors.',
        '["Conduct ISO 9001 gap analysis against all 10 clauses - score current compliance percentage and identify major gaps requiring documentation or process changes", "Select certification body based on your industry recognition needs and budget - obtain quotes from at least 3 accredited bodies", "Create 6-month implementation roadmap with clear milestones - assign responsibility for each clause implementation", "Calculate ROI projection for certification - estimate customer acquisition benefit, cost savings from improved processes, and export opportunities"]'::jsonb,
        '["ISO 9001:2015 Gap Analysis Checklist with clause-by-clause scoring methodology and compliance indicators", "Certification Body Comparison Matrix covering major Indian certifiers with costs, timelines, and industry specializations", "ISO Implementation Project Plan Template with detailed activities, dependencies, and resource requirements", "ROI Calculator for ISO Certification estimating customer benefits, efficiency gains, and implementation costs"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: BIS Standards and Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        22,
        'BIS Standards and Indian Product Certification',
        'Bureau of Indian Standards (BIS) is India''s national standards body, and understanding BIS certification is crucial for products sold in India. With over 21,000 Indian Standards covering diverse sectors, BIS compliance can be mandatory or voluntary depending on your product category.

BIS Certification Schemes: BIS operates multiple certification schemes. Product Certification Scheme (ISI Mark) is mandatory for 369 products across 14 categories including cement, LPG cylinders, electrical equipment, packaged drinking water, and steel products. Registration Scheme for electronic goods covers 51 categories requiring compulsory registration. Hallmarking Scheme is mandatory for gold jewellery. Foreign Manufacturers Certification Scheme (FMCS) applies to imported products requiring BIS certification.

Mandatory vs Voluntary Certification: Under Quality Control Orders (QCOs), the government mandates BIS certification for products impacting health, safety, or environment. As of 2024, mandatory certification covers steel products (42 categories), electrical appliances (18 categories), electronics and IT products (51 categories), cement, LPG equipment, and food products. Non-compliance attracts penalties up to Rs 2 lakh per offence and product seizure.

BIS Certification Process: Step 1 - Application submission through BIS MANAKONLINE portal with product details, test reports, and factory information. Step 2 - Document scrutiny by BIS (2-4 weeks). Step 3 - Factory inspection by BIS officials assessing manufacturing capability, quality control systems, and testing facilities (inspection fee Rs 9,000-15,000). Step 4 - Product testing at BIS-recognized laboratories. Step 5 - Grant of license (1-2 months post-inspection). Step 6 - Surveillance through periodic inspections and market sample testing.

Certification Costs Structure: Application fee ranges from Rs 1,000-5,000 depending on product type. Testing fees vary by product - electrical items Rs 10,000-50,000, steel products Rs 5,000-20,000, electronics Rs 15,000-80,000. Annual marking fee is 0.15-0.25% of marked production value (minimum Rs 1,000, maximum Rs 5 lakh). Inspection fees are Rs 9,000-15,000 per visit.

Industry-Specific BIS Standards: Electronics: IS 13252 (safety), IS 616 (household appliances). Electrical: IS 302 (safety of household appliances), IS 694 (PVC cables). Steel: IS 2062 (structural steel), IS 1786 (TMT bars). Food: IS 14543 (packaged drinking water), IS 7886 (edible oils). Textiles: IS 15035 (safety requirements).

Compliance Strategy for Startups: For mandatory products, budget 3-6 months for certification before market launch. For voluntary certification, evaluate customer requirements and competitive positioning. Consider BIS certification as quality differentiator even when not mandatory. Many government tenders and large corporate buyers prefer BIS-certified products.',
        '["Identify BIS standards applicable to your products - check mandatory certification requirements under Quality Control Orders", "Register on BIS MANAKONLINE portal and understand application requirements for your product category", "Identify BIS-recognized testing laboratories for your products - obtain testing quotations and timelines", "Create BIS certification budget and timeline for product launch planning"]'::jsonb,
        '["BIS Product Certification Guide covering application process, documentation requirements, and inspection preparation", "Mandatory BIS Certification Product List with QCO references and applicable standards by category", "BIS-Recognized Laboratory Directory searchable by product type, location, and testing capabilities", "BIS Certification Cost Calculator estimating fees, testing costs, and timeline for different product categories"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: Six Sigma Methodology
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        23,
        'Six Sigma Implementation for Indian Operations',
        'Six Sigma methodology has transformed operations across Indian industries, from Tata Steel achieving Rs 2,500 crore savings to Wipro reducing software defects by 60%. For startups, Lean Six Sigma offers a pragmatic approach to quality improvement without heavy statistical overhead.

Understanding Six Sigma Levels: Sigma level measures process capability - higher sigma means fewer defects. 1 Sigma: 691,462 defects per million opportunities (DPMO) - essentially random output. 2 Sigma: 308,538 DPMO - basic processes with high variation. 3 Sigma: 66,807 DPMO - average company performance. 4 Sigma: 6,210 DPMO - above-average quality. 5 Sigma: 233 DPMO - world-class quality. 6 Sigma: 3.4 DPMO - near-perfect quality. Most Indian startups operate at 2-3 sigma level initially. Reaching 4 sigma delivers significant competitive advantage.

DMAIC Methodology: Define Phase - Identify the problem, customer requirements, project scope, and team. Key tools: SIPOC diagram, Voice of Customer (VOC), project charter. Duration: 1-2 weeks for startup projects. Measure Phase - Collect baseline data on current process performance. Key tools: Process mapping, measurement system analysis, data collection plan. Calculate current sigma level and establish baseline metrics. Duration: 2-3 weeks. Analyze Phase - Identify root causes of defects and variation. Key tools: Fishbone diagram, 5 Whys, Pareto analysis, hypothesis testing. Find the vital few causes (typically 20% of causes create 80% of defects). Duration: 2-3 weeks. Improve Phase - Develop and implement solutions to address root causes. Key tools: Brainstorming, pilot testing, FMEA (Failure Mode and Effects Analysis). Test solutions before full deployment. Duration: 3-4 weeks. Control Phase - Sustain improvements and prevent backsliding. Key tools: Control charts, standard work, training, documentation. Hand over to process owners with monitoring mechanisms. Duration: 1-2 weeks.

Lean Six Sigma for Startups: Pure Six Sigma can be statistically heavy for small organizations. Lean Six Sigma combines waste elimination (Lean) with variation reduction (Six Sigma). Focus on quick wins: Apply 5S, visual management, and basic statistical tools. Start with Yellow Belt projects (4-8 week duration, limited scope) before attempting Green Belt projects (2-4 months, broader impact).

Six Sigma Belt System and Training in India: Yellow Belt: 2-day training, Rs 10,000-20,000, participates in projects. Green Belt: 5-day training + project, Rs 30,000-60,000, leads small projects. Black Belt: 20-day training + 2 projects, Rs 1-2 lakh, leads complex projects, coaches Green Belts. Master Black Belt: Extensive experience, Rs 2-5 lakh training, organization-wide deployment. Certification bodies in India: IASSC, ASQ, Indian Statistical Institute, industry-specific bodies.

ROI of Six Sigma Projects: Average Green Belt project delivers Rs 5-15 lakh annual savings. Black Belt projects typically save Rs 25-75 lakh annually. Implementation cost (training, tools, time) is typically recovered within 6-12 months. Indian organizations report 3-5x return on Six Sigma investment.',
        '["Calculate current sigma level for your key process - collect defect data and compute DPMO", "Select pilot Six Sigma project using criteria: customer impact, data availability, reasonable scope, and team capability", "Apply DMAIC methodology to pilot project - complete all five phases with documentation", "Train core team on basic Six Sigma tools - consider Yellow Belt certification for key personnel"]'::jsonb,
        '["Six Sigma Project Selection Matrix with scoring criteria for startup-appropriate projects", "DMAIC Toolkit with templates for each phase including project charter, SIPOC, and control charts", "Sigma Level Calculator with DPMO conversion and process capability interpretation", "Six Sigma Training Provider Directory covering major Indian certification programs with costs and formats"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: Quality Control and Inspection Systems
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        24,
        'Quality Control and Inspection Systems',
        'Effective quality control systems prevent defects from reaching customers while optimizing inspection costs. Indian startups often struggle with the balance between thoroughness and efficiency - implementing strategic inspection points can reduce quality costs by 30-40%.

Types of Quality Inspections: Incoming Inspection - Verify supplier-provided materials meet specifications before use. Sampling plans (AQL-based) reduce inspection effort while maintaining quality assurance. Use Indian Standard IS 2500 (equivalent to ISO 2859) for sampling schemes. Typical AQL for incoming materials: 0.65-2.5% depending on criticality. In-Process Inspection - Check quality at critical stages during production. Identify defects early before value is added. Statistical Process Control (SPC) charts monitor process stability. Process capability studies (Cp, Cpk) verify process meets specifications. Final Inspection - Comprehensive check before shipping to customer. May include functional testing, visual inspection, packaging verification. Consider risk-based inspection levels based on process stability.

Acceptance Quality Limit (AQL) Implementation: AQL defines acceptable defect percentage in a lot. Common AQL levels: Critical defects 0%, Major defects 1.0-2.5%, Minor defects 2.5-4.0%. Sampling plans specify sample size and accept/reject criteria. IS 2500 Part 1: Single sampling plans for lot-by-lot inspection. Part 2: Sequential sampling plans for smaller samples. Part 3: Skip-lot sampling for demonstrated quality.

Quality Control Costs in India: Prevention costs (training, process design): 5-10% of quality budget. Appraisal costs (inspection, testing): 20-30% of quality budget. Internal failure costs (rework, scrap): 30-40% of quality budget. External failure costs (returns, warranty, reputation): 30-40% of quality budget. Optimal strategy: Invest in prevention to reduce failure costs. Every rupee spent on prevention saves Rs 5-10 in failure costs.

Inspection Equipment and Methods: Visual inspection - training, lighting, magnification. Dimensional inspection - calipers (Rs 500-5,000), micrometers (Rs 1,000-15,000), CMM (Rs 10-50 lakh). Functional testing - application-specific test fixtures. Non-destructive testing - ultrasonic, radiography, dye penetrant. Testing laboratory outsourcing costs Rs 2,000-50,000 per test depending on complexity.

Quality Control Documentation: Inspection plans defining what, when, how, and who. Inspection checklists with clear accept/reject criteria. Inspection records with traceability to lots/batches. Non-conformance reports (NCR) for failed items. Corrective action tracking for systematic issues.

Building Quality Culture: Quality is everyone''s responsibility, not just QC department. Visual management boards showing quality metrics. Daily quality review in production meetings. Recognition programs for quality contributions. Regular quality training and awareness programs.',
        '["Design inspection plan covering incoming, in-process, and final inspection points with methods and frequencies", "Implement AQL-based sampling plan for incoming inspection - define AQL levels for different defect types", "Set up quality control documentation system including inspection checklists, records, and NCR process", "Calculate current cost of quality - estimate prevention, appraisal, and failure costs to identify improvement opportunities"]'::jsonb,
        '["Inspection Planning Template with process flow integration and control point identification", "AQL Sampling Table Reference based on IS 2500 with sample size and acceptance criteria", "Quality Control Forms Library including inspection checklists, NCR forms, and CAPA templates", "Cost of Quality Calculator with category breakdown and benchmark comparisons"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 25: Supplier Quality Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_5_id,
        25,
        'Supplier Quality Management',
        'Supplier quality directly impacts your product quality - in manufacturing, 40-60% of quality issues originate from purchased materials. Building robust supplier quality management (SQM) systems is essential for sustainable operations excellence in India''s diverse supplier landscape.

Supplier Quality Assessment Framework: Technical Capability - Manufacturing processes, equipment, technical expertise. Quality Systems - ISO certification, documented procedures, inspection capability. Financial Stability - Ability to invest in quality improvements and sustain operations. Delivery Performance - On-time delivery history, lead time reliability. Communication - Responsiveness, problem-solving approach. Scoring system: Rate each factor 1-5, weight by importance, calculate composite score. Minimum score threshold for approved suppliers (typically 3.0+).

Supplier Audit Process: Pre-audit preparation - Define audit scope, notify supplier, prepare checklist. On-site audit elements: Document review (quality manual, procedures, records), process observation (manufacturing, inspection, storage), employee interviews (quality awareness, training), sample inspection (verify stated capability). Post-audit: Audit report with findings and recommendations, corrective action requirements, follow-up verification. Audit frequency: Critical suppliers annually, standard suppliers every 2-3 years.

Supplier Quality Agreement (SQA): Key elements to include: Quality specifications and acceptance criteria, inspection and testing requirements, non-conformance handling procedure, corrective action expectations and timelines, change notification requirements, right to audit clause, quality metrics and reporting requirements. SQA should be part of supplier contract, not a separate document.

Supplier Development Programs: Identify strategic suppliers with quality gaps but improvement potential. Joint improvement projects: Share best practices, provide training, support capability building. Phased approach: Quick wins in first 3 months, systematic improvements over 12-18 months. Benefits: Improved quality, stronger relationship, potential cost reductions. Investment: Rs 2-10 lakh per supplier depending on scope. ROI typically 3-5x through quality improvements and cost savings.

Supplier Quality Metrics: Quality metrics - Incoming inspection pass rate (target: 98%+), Parts per million (PPM) defects (target varies by industry), Return to supplier rate. Delivery metrics - On-time delivery rate (target: 95%+), Lead time adherence. Responsiveness metrics - Corrective action response time (target: 48-72 hours), Resolution time for quality issues. Create supplier scorecard with monthly/quarterly reviews. Use metrics for supplier tiering and business allocation decisions.

Managing Supplier Non-Conformances: Containment - Stop use of defective material, identify affected scope. Root cause analysis - Require supplier RCA within defined timeline (typically 5-10 days). Corrective action - Verify effectiveness before resuming supply. Cost recovery - Charge back inspection, rework, and expediting costs. Escalation - Define consequences for repeated failures including reduced business or disqualification.',
        '["Create supplier quality assessment framework with weighted scoring criteria for your critical suppliers", "Develop supplier audit checklist covering technical, quality system, and process requirements", "Draft supplier quality agreement template covering specifications, testing, non-conformance, and corrective action", "Implement supplier scorecard system tracking quality, delivery, and responsiveness metrics monthly"]'::jsonb,
        '["Supplier Quality Assessment Scorecard with weighted criteria and scoring methodology", "Supplier Audit Checklist covering process capability, quality systems, and documentation review", "Supplier Quality Agreement Template with standard clauses and customization guidance", "Supplier Performance Dashboard Template with KPIs, trend charts, and exception alerts"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Logistics & Distribution (Days 26-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Logistics & Distribution',
        'Master Indian logistics infrastructure - last-mile delivery optimization, cold chain management, freight mode selection (road, rail, air), 3PL partnerships, and building cost-effective distribution networks across tier 1-3 cities.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_6_id;

    -- Day 26: Indian Logistics Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        26,
        'Indian Logistics Landscape and Cost Economics',
        'India''s logistics sector is valued at Rs 14 lakh crore (USD 180 billion) and accounts for 13-14% of GDP, compared to 8-9% in developed economies. Understanding this landscape is essential for building cost-competitive supply chains.

Logistics Cost Structure in India: Transportation costs typically represent 35-40% of total logistics spending. Warehousing accounts for 25-30%. Inventory carrying costs are 20-25%. Administrative and other costs make up 10-15%. High logistics costs result from infrastructure gaps, fragmented trucking industry (70% operate 1-5 trucks), and complex tax/regulatory environment (improving post-GST).

Road Freight Economics: Dominant mode handling 60% of freight volume. Trucking rates range from Rs 8-15 per km for full truck load (FTL) depending on route, truck type, and fuel prices. Key factors: Fuel (35-40% of operating cost), driver wages (15-20%), maintenance (10-15%), tolls (5-10%). Load optimization critical - empty return trips inflate costs by 30-40%. Part truck load (PTL/LTL) rates are Rs 1.5-4 per kg depending on distance and density.

Rail Freight Economics: Cost-effective for bulk commodities over long distances (500+ km). Container train rates approximately Rs 2-3 per ton-km, 30-40% cheaper than road for suitable cargo. Challenges: Limited last-mile connectivity, scheduling inflexibility, high minimum volumes. Dedicated Freight Corridors (Western and Eastern) improving speed and reliability. Private container train operators: Adani Logistics, Concor, Gateway Rail.

Air Freight Economics: Premium mode for time-sensitive and high-value goods. Domestic air cargo rates Rs 25-50 per kg depending on route and urgency. International air freight Rs 150-300 per kg to major destinations. Break-even vs road: Items with value density above Rs 1,000-2,000 per kg may justify air freight. Major cargo hubs: Mumbai, Delhi, Chennai, Bangalore, Hyderabad. Express cargo operators: BlueDart, DTDC, Delhivery, FedEx, DHL.

Sea Freight Economics: Most economical for international trade and coastal shipping. Container rates highly variable - currently Rs 1-2 lakh per 20'' container to Europe/US. Sagarmala initiative promoting coastal shipping as alternative to road. Major ports: JNPT (Mumbai), Mundra, Chennai, Vizag, Kolkata.

Logistics Cost Benchmarks by Industry: FMCG: 6-10% of revenue, Consumer electronics: 4-8%, Pharmaceuticals: 8-12%, Automotive: 5-8%, E-commerce: 15-25%. Logistics cost as percentage of product cost varies significantly by value density.',
        '["Map your current logistics cost structure - break down transportation, warehousing, inventory, and administrative costs as percentage of revenue", "Analyze freight mode economics for your key lanes - compare road, rail, and air costs for typical shipment profiles", "Identify logistics cost reduction opportunities - benchmark against industry averages and identify top 3 improvement areas", "Evaluate logistics service providers for key requirements - obtain quotes from 3-5 providers for major lanes"]'::jsonb,
        '["India Logistics Cost Benchmarking Report with industry-wise comparisons and regional variations", "Freight Rate Calculator comparing road, rail, and air economics for different shipment profiles", "Logistics Service Provider Directory covering transporters, 3PLs, and express cargo operators by region", "Logistics Cost Analysis Template for mapping cost structure and identifying improvement opportunities"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Last-Mile Delivery Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        27,
        'Last-Mile Delivery Optimization',
        'Last-mile delivery represents 40-50% of total logistics cost and is the most complex segment due to fragmented delivery points, traffic congestion, and customer availability challenges. Mastering last-mile is a critical competitive advantage in India''s e-commerce-driven market.

Last-Mile Delivery Models: Hub-and-Spoke Model - Shipments consolidated at city hub, distributed via smaller vehicles to delivery zones. Cost effective for volume, typical delivery time 24-48 hours. Used by Delhivery, DTDC, BlueDart for standard deliveries. Direct Injection Model - Goods shipped directly to delivery city, reducing transit time. Higher cost per shipment but faster delivery. Used for express and same-day delivery. Hyperlocal Model - Delivery from nearby store or dark store within 2-4 hours. Requires dense network of inventory points. Used by Dunzo, Swiggy Instamart, BigBasket.

Last-Mile Cost Drivers: Average last-mile cost in metros Rs 40-80 per delivery. Tier 2 cities: Rs 50-100 per delivery. Tier 3 and rural: Rs 80-150+ per delivery. Key cost components: Delivery person wage (Rs 15,000-25,000 per month), vehicle costs (Rs 3,000-8,000 per month for two-wheeler), fuel (Rs 5-15 per delivery), technology and management overhead.

Delivery Density and Efficiency: Deliveries per person per day is crucial metric - metros achieve 30-50 deliveries/day, smaller cities 15-25. Stop density (deliveries per square km) directly impacts cost efficiency. Route optimization can improve deliveries per day by 20-30%. Clustering deliveries by time slot reduces failed delivery attempts.

Failed Delivery Management: Industry average first-attempt delivery success: 75-85%. Failed delivery costs Rs 30-50 per reattempt. Root causes: Customer unavailable (40%), wrong address (25%), COD rejection (20%), other (15%). Mitigation strategies: Pre-delivery confirmation (SMS/WhatsApp), flexible delivery slots, delivery lockers/pickup points, encouraging prepaid orders.

Technology for Last-Mile: Route optimization software - Locus, FarEye, LogiNext (Rs 2-5 per delivery). Real-time tracking - Customer visibility reduces failed deliveries by 10-15%. Digital proof of delivery - Photo capture, e-signature, OTP verification. Delivery analytics - Performance dashboards, exception management.

Alternative Delivery Models: Delivery lockers - Amazon Lockers, Smartbox. Pickup points - Local store partnerships, post offices. Crowd-sourced delivery - Gig economy delivery partners for surge capacity. Drone delivery - Pilot projects by Dunzo, Spicejet Technik (regulatory restrictions apply).',
        '["Calculate your last-mile delivery cost per order including labor, vehicle, fuel, technology, and overhead components", "Implement delivery route optimization to improve deliveries per person per day - test route planning tools", "Develop failed delivery reduction strategy addressing customer availability, address accuracy, and COD rejection", "Evaluate alternative delivery models (lockers, pickup points) for cost-sensitive or difficult-to-serve areas"]'::jsonb,
        '["Last-Mile Cost Calculator with component breakdown and benchmark comparisons by city tier", "Route Optimization Tool Comparison covering Locus, FarEye, LogiNext with feature and pricing analysis", "Failed Delivery Analysis Framework with root cause categorization and mitigation strategies", "Alternative Delivery Model Evaluation covering lockers, pickup points, and partner networks"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28: Cold Chain Logistics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        28,
        'Cold Chain Infrastructure and Management',
        'India''s cold chain sector is valued at Rs 2 lakh crore and growing at 15% annually. With 30-40% of perishables lost due to inadequate cold chain, building robust temperature-controlled logistics is essential for food, pharma, and healthcare startups.

Cold Chain Infrastructure in India: Current cold storage capacity: 42 million metric tons (primarily bulk storage). Organized cold chain: Only 15-20% of total capacity. Geographic concentration: 50% capacity in UP, Punjab, West Bengal, Andhra Pradesh. Segments: Agriculture/food (80%), pharmaceuticals (15%), others (5%). Growth driven by e-grocery, pharma distribution, and quick commerce.

Temperature Zones and Requirements: Frozen (-18C and below): Ice cream, frozen foods, seafood. Requires refrigerated trucks, freezer storage. Chilled (2-8C): Dairy, fresh produce, vaccines, biologics. Most stringent requirements for pharma. Cool (8-15C): Chocolates, some fruits, certain medications. Controlled room temperature (15-25C): Many pharmaceuticals, temperature-sensitive electronics.

Cold Chain Cost Structure: Refrigerated transport costs 50-100% more than ambient transport. Reefer truck rates: Rs 15-25 per km (vs Rs 8-12 for ambient). Cold storage: Rs 2-5 per kg per month (vs Rs 1-2 for ambient). Energy costs represent 30-40% of cold chain operating expenses. Diesel generator backup essential - power outages can compromise entire cold chain.

Cold Chain Infrastructure Requirements: Pre-cooling facilities at farm gate/source. Refrigerated transport (reefer trucks, insulated containers). Cold storage at distribution centers. Last-mile cold delivery (insulated boxes, gel packs). Temperature monitoring throughout chain.

Cold Chain Technology: Temperature monitoring devices - Real-time GPS + temperature sensors (Rs 10,000-50,000 per vehicle). IoT sensors for storage facilities - Continuous monitoring, alerts for excursions. Data loggers - USB-based temperature recording for compliance documentation. Cold chain management software - Visibility, alerts, compliance reporting.

Regulatory Requirements: FSSAI requirements for food cold chain including temperature logs, vehicle hygiene. Schedule M requirements for pharma cold chain. WHO GDP (Good Distribution Practices) for pharmaceutical distribution. Cold chain validation and qualification requirements.

Cold Chain Partners in India: Integrated cold chain: Snowman Logistics, Coldex Logistics, V-Trans. Pharma specialized: Blue Dart Med Express, Mahindra Logistics Cold Chain. Technology providers: Emerson, Carrier, Thermo King for equipment. Cold storage developers: Sical Logistics, Mitsui, Allcargo.',
        '["Identify cold chain requirements for your products - define temperature zones, handling requirements, and compliance needs", "Map cold chain infrastructure gaps between your supply points and markets - identify facilities needed", "Evaluate cold chain service providers for your key routes - compare integrated vs specialized operators", "Implement temperature monitoring system for cold chain visibility and compliance documentation"]'::jsonb,
        '["Cold Chain Requirements Assessment covering temperature zones, handling protocols, and regulatory compliance", "Cold Chain Infrastructure Mapping Template for identifying gaps and investment needs", "Cold Chain Service Provider Comparison with capabilities, coverage, and pricing by region", "Temperature Monitoring Solution Guide covering devices, software, and implementation approach"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 29: Freight Mode Selection and Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        29,
        'Freight Mode Selection and Multi-Modal Optimization',
        'Optimizing freight mode selection can reduce transportation costs by 15-25% while meeting service requirements. Understanding trade-offs between cost, speed, reliability, and flexibility across road, rail, air, and multi-modal options is essential for supply chain optimization.

Mode Selection Decision Framework: Key factors to consider: Cost per kg/unit, transit time requirements, shipment size and frequency, product characteristics (value density, fragility, temperature sensitivity), service level requirements, environmental considerations.

Road Freight Detailed Analysis: Advantages - Flexibility, door-to-door service, suitable for any shipment size. Disadvantages - Higher cost for long distance, traffic/congestion delays, driver availability issues. Best fit - Distances under 500 km, time-sensitive shipments, fragmented deliveries. FTL economics: 14-18 ton trucks cost Rs 8-12 per km. Break-even distance vs rail: 400-600 km depending on cargo type.

Rail Freight Detailed Analysis: Advantages - Cost effective for bulk/heavy cargo, lower carbon footprint, reliable for long distances. Disadvantages - Limited flexibility, last-mile connectivity gaps, minimum volume requirements. Best fit - Bulk commodities, containerized cargo, distances over 500 km. Container train economics: Rs 80,000-1,20,000 for 40'' container Delhi-Mumbai. Private container operators offer better service than Indian Railways.

Air Freight Detailed Analysis: Advantages - Speed, reliability, security, suitable for high-value items. Disadvantages - High cost, size/weight limitations, airport-to-airport only. Best fit - Emergency shipments, high-value products, perishables requiring quick transit. Domestic air cargo: Rs 25-50 per kg depending on route. International: Rs 150-300+ per kg.

Multi-Modal Transportation: Rail + Road - Container by rail for trunk haul, truck for first/last mile. Cost savings 20-30% vs pure road for suitable lanes. Air + Road - Air for long distance, road for distribution. Used for time-critical inventory replenishment. Coastal + Road - Sea for port-to-port, road for inland distribution. Emerging option for North-South cargo.

Freight Consolidation Strategies: Milk run - Collect from multiple suppliers in single trip. Reduces per-shipment cost by 30-40%. Merge-in-transit - Consolidate shipments from different origins at hub. Cross-docking - Minimal storage, rapid transfer between inbound and outbound. Freight pooling - Share truck space with other shippers through aggregators.

Freight Technology Platforms: Digital freight platforms: Rivigo, BlackBuck, Porter connect shippers with transporters. Benefits: Price transparency, real-time tracking, reduced empty miles. Freight exchanges for spot market pricing. TMS (Transport Management Systems) for optimization.',
        '["Analyze current freight mode mix and identify optimization opportunities - calculate cost per kg by mode and lane", "Apply mode selection framework to top 10 shipping lanes - identify lanes where mode shift can reduce costs", "Evaluate freight consolidation opportunities - quantify potential savings from milk runs, merge-in-transit, or pooling", "Test digital freight platforms for at least one major lane - compare pricing and service with current carriers"]'::jsonb,
        '["Freight Mode Selection Decision Matrix with cost, speed, and suitability scoring by shipment profile", "Multi-Modal Route Optimizer comparing road, rail, air, and combined options for major lanes", "Freight Consolidation Analysis Template for calculating savings from different consolidation strategies", "Digital Freight Platform Comparison covering Rivigo, BlackBuck, Porter with pricing and service analysis"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 30: 3PL Selection and Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_6_id,
        30,
        '3PL Selection and Partnership Management',
        'Third-party logistics (3PL) providers handle Rs 5 lakh crore in India''s logistics market. For startups, choosing the right 3PL partner can accelerate growth while avoiding capital investment in logistics infrastructure. Effective 3PL management is a critical supply chain capability.

3PL Service Model Spectrum: Basic Transportation - Carrier management, freight forwarding. Cost: 2-4% of freight value. Warehousing and Distribution - Storage, inventory management, order fulfillment. Cost: Rs 15-40 per order fulfilled. Integrated Logistics - End-to-end supply chain management, customs, value-added services. Cost: 5-12% of supply chain spend. Lead Logistics Provider (LLP/4PL) - Design and manage entire logistics strategy using multiple 3PLs. Cost: Management fee + service costs.

Major 3PL Providers in India: Full-service 3PLs: DHL Supply Chain, Mahindra Logistics, Allcargo Logistics, TVS Supply Chain Solutions. E-commerce focused: Delhivery, Ecom Express, XpressBees, Shadowfax. Warehousing specialists: Embassy Industrial Parks, IndoSpace, Welspun One. Express cargo: BlueDart, DTDC, FedEx, Gati.

3PL Selection Criteria: Service capability - Geographic coverage, service offerings, industry expertise. Infrastructure - Warehouse network, fleet, technology systems. Performance track record - SLA achievement, references from similar clients. Technology integration - WMS capabilities, API integration, real-time visibility. Financial stability - Ability to scale with your growth, investment capacity. Cultural fit - Problem-solving approach, communication responsiveness.

3PL Contract Essentials: Scope of services clearly defined. Pricing structure - Per unit, per order, percentage, or hybrid. Volume commitments and pricing tiers. Service Level Agreements (SLAs) with penalties and incentives. Data ownership and integration requirements. Exit clause and transition support. Insurance and liability allocation.

3PL Performance Management: Key metrics to track: Order fulfillment accuracy (target: 99.5%+), On-time delivery rate (target: 95%+), Inventory accuracy (target: 99%+), Cost per order/shipment, Damage rate (target: less than 0.1%). Performance review cadence - Weekly operational, monthly business, quarterly strategic. Continuous improvement mechanism - Joint problem-solving, process optimization.

Common 3PL Pitfalls: Inadequate due diligence leading to capability mismatch. Poorly defined SLAs creating ambiguity. Over-dependence on single 3PL creating concentration risk. Insufficient technology integration limiting visibility. Weak contract terms constraining flexibility.',
        '["Define 3PL requirements covering services, geography, volume, and technology integration needs", "Evaluate 3-5 3PL providers against selection criteria - conduct site visits and reference checks", "Negotiate 3PL contract covering scope, pricing, SLAs, and performance incentives", "Implement 3PL performance management system with weekly metrics review and monthly business review"]'::jsonb,
        '["3PL Requirements Definition Template covering service scope, volumes, SLAs, and integration needs", "3PL Evaluation Scorecard with weighted criteria for service capability, infrastructure, and track record", "3PL Contract Checklist covering essential terms, SLAs, and risk mitigation clauses", "3PL Performance Dashboard Template with KPIs, trend analysis, and exception management"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Process Automation & Technology (Days 31-35)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Process Automation & Technology',
        'Build technology-enabled operations - ERP system selection (SAP Business One, Tally Prime, Zoho Inventory), Manufacturing Execution Systems (MES), IoT sensors for real-time monitoring, and creating integrated digital operations infrastructure.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 31: ERP Systems for Indian Startups
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        31,
        'ERP Systems for Indian Startups',
        'Enterprise Resource Planning (ERP) systems integrate core business processes - finance, inventory, procurement, production, and sales. For Indian startups, choosing the right ERP at the right time can provide competitive advantage while avoiding premature complexity.

When Do You Need ERP: Signs you''ve outgrown spreadsheets: Manual data entry errors increasing, inventory discrepancies above 5%, month-end close taking more than 5 days, difficulty tracking costs accurately, sales and operations disconnected. Typical ERP trigger point: Rs 5-10 crore annual revenue or 50+ employees.

ERP Options for Indian Startups: Entry Level (Rs 50,000-3 lakh/year): Tally Prime - India''s most popular accounting software, strong GST compliance, limited operations features. Zoho Inventory + Zoho Books - Cloud-based, good for e-commerce and trading, scalable pricing. ERPNext - Open source, manufacturing-capable, requires technical expertise.

Mid-Market (Rs 5-25 lakh/year): SAP Business One - Global leader, comprehensive features, strong partner ecosystem in India. Microsoft Dynamics 365 Business Central - Cloud-native, good integration with Office/Power Platform. Oracle NetSuite - Strong financials and multi-entity, popular with funded startups. Acumatica - Cloud ERP with manufacturing capabilities, consumption-based pricing.

Enterprise (Rs 50 lakh+ /year): SAP S/4HANA - Full enterprise ERP, significant implementation investment. Oracle ERP Cloud - Comprehensive suite, complex implementation.

ERP Selection Criteria: Functional fit - Does it support your core processes (manufacturing, distribution, services)? Industry capabilities - Pre-built configurations for your industry? Localization - GST compliance, Indian reporting, banking integration? Scalability - Can it grow with you to Rs 100+ crore revenue? Total cost of ownership - License + implementation + support + upgrades. Implementation partner - Quality of local partner ecosystem?

Implementation Best Practices: Phase 1 - Core finance (3-6 months): Chart of accounts, AP/AR, GST, banking. Phase 2 - Operations (3-6 months): Inventory, procurement, sales orders. Phase 3 - Advanced (ongoing): Production, planning, analytics. Key success factors: Executive sponsorship, dedicated project manager, data cleanup before migration, user training investment.

ERP Implementation Costs in India: Entry-level: Rs 2-5 lakh total (software + implementation). Mid-market: Rs 15-50 lakh (typically 2-3x software cost for implementation). Enterprise: Rs 1-5 crore (significant consulting investment).',
        '["Assess ERP readiness - evaluate current pain points, process maturity, and organizational readiness for ERP", "Define ERP requirements covering functional needs, user count, integration requirements, and budget constraints", "Evaluate 3-5 ERP options against requirements - request demos, reference calls, and total cost of ownership estimates", "Select implementation approach - phased rollout recommended, define Phase 1 scope focusing on core finance and operations"]'::jsonb,
        '["ERP Readiness Assessment Checklist with scoring for process maturity, data quality, and organizational factors", "ERP Requirements Template covering functional, technical, and integration requirements by module", "ERP Comparison Matrix for Indian startups comparing Tally, Zoho, SAP B1, and ERPNext across key criteria", "ERP Implementation Roadmap Template with phased approach, milestones, and resource requirements"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: Manufacturing Execution Systems (MES)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        32,
        'Manufacturing Execution Systems (MES)',
        'Manufacturing Execution Systems bridge the gap between enterprise planning (ERP) and shop floor control, providing real-time visibility into production operations. For Indian manufacturing startups, MES can improve productivity by 15-25% and reduce quality defects by 20-40%.

MES Core Functions (ISA-95 Standard): Operations Management - Production scheduling, dispatching, and tracking. Quality Management - In-process inspection, SPC, non-conformance handling. Performance Analysis - OEE monitoring, downtime tracking, productivity metrics. Maintenance Management - Preventive maintenance scheduling, equipment history. Labor Management - Time and attendance, skill tracking, certifications. Material Management - WIP tracking, lot traceability, consumption recording. Document Control - Work instructions, specifications, SOPs. Data Collection - Manual entry, barcode scanning, machine integration.

MES vs ERP: What Goes Where: ERP handles: Order management, procurement, financials, planning (days/weeks horizon). MES handles: Shop floor execution, real-time tracking, quality control, machine monitoring (hours/minutes horizon). Integration critical: Work orders flow from ERP to MES, production actuals flow back.

MES Options for Indian Manufacturing: Entry Level (Rs 10-50 lakh): Custom solutions using spreadsheets + barcode scanning. Basic MES: SFactrix.ai, Abordo, IntelliTrack. ERPNext Manufacturing module with extensions. Mid-Market (Rs 50 lakh-2 crore): AVEVA MES (formerly Wonderware), Rockwell FactoryTalk, GE Proficy. SAP MII (Manufacturing Integration and Intelligence). Enterprise (Rs 2+ crore): Siemens Opcenter, SAP Manufacturing Execution, Oracle Manufacturing Cloud.

Industry-Specific Considerations: Discrete manufacturing (auto components, electronics): Focus on routing, traceability, quality. Process manufacturing (chemicals, food): Focus on batch management, recipe control, compliance. Hybrid (pharma): Need both discrete and process capabilities, strong documentation.

MES Implementation Approach: Phase 1 - Foundation (2-3 months): Master data, production orders, basic data collection. Phase 2 - Quality (2-3 months): Inspection integration, non-conformance, SPC. Phase 3 - Performance (2-3 months): OEE tracking, downtime analysis, dashboards. Phase 4 - Advanced (ongoing): Predictive maintenance, advanced analytics, AI/ML.

ROI of MES Implementation: Typical benefits: OEE improvement 10-20%, quality defect reduction 20-40%, inventory reduction 15-25%, labor productivity improvement 10-20%. Payback period: 12-24 months for mid-market implementations.',
        '["Assess MES requirements based on manufacturing complexity, quality needs, and improvement objectives", "Map current shop floor processes and data flows to identify MES scope and integration points", "Evaluate MES options appropriate for your scale - consider starting with basic data collection before full MES", "Define MES implementation roadmap with phased approach - prioritize high-impact areas in Phase 1"]'::jsonb,
        '["MES Requirements Assessment covering production types, quality needs, and integration requirements", "Shop Floor Process Mapping Template for identifying MES scope and data collection points", "MES Solution Comparison for Indian manufacturing with pricing, capabilities, and implementation considerations", "MES ROI Calculator estimating benefits from OEE improvement, quality gains, and productivity increase"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: IoT and Sensor-Based Operations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        33,
        'IoT and Sensor-Based Operations Monitoring',
        'Industrial IoT (IIoT) transforms operations through real-time monitoring, predictive analytics, and automated control. India''s IIoT market is growing at 25% annually, driven by manufacturing modernization and digital transformation initiatives.

IoT Applications in Operations: Equipment Monitoring - Machine status, cycle times, production counts. Condition-based maintenance - Vibration, temperature, current monitoring to predict failures. Energy Management - Power consumption tracking, optimization, cost allocation. Environmental Monitoring - Temperature, humidity, air quality for process control and compliance. Asset Tracking - Real-time location of materials, tools, and equipment. Safety Monitoring - Worker safety, hazardous condition detection.

Sensor Types and Applications: Production Sensors: Proximity sensors for counting (Rs 500-5,000). Photoelectric sensors for presence detection (Rs 1,000-10,000). Encoders for position/speed measurement (Rs 3,000-30,000). Condition Monitoring: Vibration sensors for rotating equipment (Rs 5,000-50,000). Current sensors for motor health (Rs 2,000-15,000). Temperature sensors (thermocouples, RTDs) (Rs 500-5,000). Environmental: Temperature/humidity sensors (Rs 1,000-5,000). Air quality sensors (PM2.5, gases) (Rs 5,000-30,000). Flow meters for utilities (Rs 10,000-1,00,000).

IoT Architecture Layers: Edge Layer - Sensors, PLCs, gateways collecting data. Connectivity Layer - Industrial protocols (Modbus, OPC-UA), wireless (WiFi, LoRa, cellular). Platform Layer - Data storage, processing, analytics (cloud or on-premise). Application Layer - Dashboards, alerts, reports, integration with ERP/MES.

IoT Platform Options for Indian Manufacturing: Cloud Platforms: AWS IoT, Azure IoT Hub, Google Cloud IoT - scalable, pay-per-use, Rs 5,000-50,000/month. Thingsboard, Blynk - lower cost alternatives for smaller deployments. Industrial Platforms: Siemens MindSphere, PTC ThingWorx, GE Predix - comprehensive but expensive. Indian Startups: Altizon Datonis, Flutura Cerebra, SenseGiz - localized support and pricing.

Implementation Approach: Start small: Pilot with 2-3 machines or one production line. Prove value: Target specific problem (downtime reduction, energy optimization). Scale gradually: Expand based on pilot learnings. Build capabilities: Train team on IoT data interpretation and action.

IoT Cost Structure: Sensors and hardware: Rs 50,000-5,00,000 per production line. Connectivity infrastructure: Rs 1-5 lakh one-time. Platform subscription: Rs 5,000-50,000/month depending on scale. Implementation and integration: Rs 5-20 lakh. Ongoing support: 15-20% of initial cost annually.',
        '["Identify IoT use cases with highest impact for your operations - prioritize by value and implementation complexity", "Design IoT pilot project targeting one high-value use case - define sensors, connectivity, and platform requirements", "Select IoT platform appropriate for your scale - evaluate build vs buy and cloud vs on-premise options", "Implement IoT pilot with clear success metrics - plan for scale-up based on pilot learnings"]'::jsonb,
        '["IoT Use Case Prioritization Matrix with value and complexity scoring for manufacturing applications", "IoT Pilot Project Template covering scope, architecture, success metrics, and timeline", "Industrial IoT Platform Comparison covering AWS, Azure, ThingsBoard, and Indian options with pricing", "IoT Implementation Checklist covering sensors, connectivity, platform, and security considerations"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: Warehouse Management Systems (WMS)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        34,
        'Warehouse Management Systems (WMS)',
        'Warehouse Management Systems optimize storage, picking, packing, and shipping operations. For e-commerce and distribution businesses, WMS can improve order accuracy to 99.9%+ while reducing labor costs by 20-30%.

WMS Core Functions: Receiving - PO receiving, quality inspection, put-away direction. Storage - Location management, bin assignment, slotting optimization. Inventory - Real-time stock levels, lot/batch tracking, expiry management. Picking - Wave planning, pick path optimization, pick-to-light/voice. Packing - Pack verification, cartonization, shipping label generation. Shipping - Carrier selection, manifest generation, dock scheduling.

When You Need WMS: Trigger points: Order volume above 100-200 orders/day. SKU count above 500-1,000. Multiple warehouse locations. Customer expectations for same-day/next-day delivery. Inventory accuracy issues above 2-3%.

WMS Options for Indian Operations: Entry Level (Rs 25,000-1 lakh/month): Unicommerce - E-commerce focused, popular with D2C brands. Browntape - Multi-channel inventory management. Vinculum - Omnichannel order management. IncreFf - B2B and D2C fulfillment. Mid-Market (Rs 1-5 lakh/month): SAP Extended Warehouse Management. Oracle Warehouse Management Cloud. Blue Yonder (JDA) WMS. Manhattan Associates. Enterprise (Rs 5+ lakh/month): High Bay/ASRS integrated WMS. Custom implementations for complex operations.

WMS Selection Criteria: Industry fit - E-commerce, retail, manufacturing, or distribution focus. Integration capabilities - ERP, shipping carriers, marketplace connectivity. Scalability - Can it handle 10x volume growth? Implementation complexity - Cloud vs on-premise, customization needs. Mobile capabilities - Handheld device support, barcode scanning.

WMS Implementation Best Practices: Data preparation - SKU master cleanup, location mapping, barcode standardization. Process design - Define picking strategies, slotting rules, exception handling. Integration - ERP, shipping, marketplace connections. User training - Warehouse staff adoption is critical. Go-live support - Parallel running, contingency plans.

WMS ROI Metrics: Order accuracy improvement: 95% to 99.5%+. Picking productivity: 20-40% improvement. Inventory accuracy: 95% to 99%+. Order cycle time reduction: 30-50%. Space utilization improvement: 15-25%. Typical payback period: 6-12 months.',
        '["Assess WMS requirements based on order volume, SKU complexity, and integration needs", "Evaluate WMS options appropriate for your scale - request demos and reference calls from similar businesses", "Plan WMS implementation covering data preparation, process design, and integration requirements", "Define WMS success metrics and ROI targets - establish baseline measurements before implementation"]'::jsonb,
        '["WMS Requirements Assessment covering volume, complexity, and integration needs", "WMS Vendor Comparison for Indian e-commerce and distribution operations", "WMS Implementation Checklist with data preparation, process design, and go-live activities", "WMS ROI Calculator estimating benefits from accuracy, productivity, and space utilization improvements"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Operations Analytics and Dashboards
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        35,
        'Operations Analytics and Performance Dashboards',
        'Data-driven operations require visibility into key metrics through well-designed dashboards. Effective operations analytics transforms raw data into actionable insights that drive continuous improvement.

Operations Analytics Maturity Levels: Level 1 - Descriptive: What happened? Historical reporting, KPI tracking. Level 2 - Diagnostic: Why did it happen? Root cause analysis, drill-down. Level 3 - Predictive: What will happen? Forecasting, trend analysis. Level 4 - Prescriptive: What should we do? Optimization recommendations.

Key Operations Dashboards: Executive Dashboard: Overall OEE, order fulfillment rate, quality metrics, cost trends. Refresh: Daily. Audience: Leadership. Production Dashboard: Real-time machine status, WIP, production vs plan. Refresh: Real-time/hourly. Audience: Production managers. Quality Dashboard: Defect rates, inspection results, top quality issues. Refresh: Daily. Audience: Quality team. Inventory Dashboard: Stock levels, slow movers, stockout risk. Refresh: Daily. Audience: Supply chain. Logistics Dashboard: Delivery performance, cost per order, carrier metrics. Refresh: Daily. Audience: Logistics team.

Dashboard Design Principles: Focus on actionable metrics - What decision does this inform? Appropriate refresh frequency - Real-time where needed, daily for trends. Visual hierarchy - Most important metrics prominent. Drill-down capability - Summary to detail. Exception highlighting - Automatic alerts for out-of-range values. Mobile accessibility - Key metrics available on phone.

Analytics Tool Options: Entry Level (Free-Rs 5,000/user/month): Google Data Studio - Free, good for basic reporting. Microsoft Power BI - Rs 800/user/month, excellent data connectivity. Metabase - Open source, good for startups. Mid-Market (Rs 5,000-20,000/user/month): Tableau - Industry leader, strong visualization. Qlik Sense - Good for complex data models. Looker - Strong for embedded analytics. Enterprise: SAP Analytics Cloud, Oracle Analytics, custom solutions.

Data Infrastructure Requirements: Data warehouse - Consolidate data from ERP, MES, WMS, IoT. ETL processes - Extract, transform, load from source systems. Data quality - Ensure accuracy and consistency. Security - Role-based access, sensitive data protection.

Analytics Implementation Approach: Phase 1 - Foundation (1-2 months): Define KPIs, establish data sources, build basic dashboards. Phase 2 - Operationalize (2-3 months): Train users, establish review cadence, refine metrics. Phase 3 - Advanced (ongoing): Predictive analytics, ML models, automated alerts.',
        '["Define operations KPI framework with 5-7 key metrics per functional area - establish targets and measurement frequency", "Select analytics platform appropriate for your data sources and user needs - consider ease of use and integration", "Design and build operations dashboards for executive and functional teams - prioritize actionable insights", "Establish analytics governance including data ownership, refresh schedules, and review cadence"]'::jsonb,
        '["Operations KPI Framework with metrics, definitions, targets, and measurement methods by functional area", "Analytics Platform Comparison covering Power BI, Tableau, and Google Data Studio with pricing and capabilities", "Dashboard Design Templates for executive, production, quality, and logistics dashboards", "Analytics Implementation Roadmap with phases, activities, and success criteria"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Cost Optimization & Performance (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Cost Optimization & Performance',
        'Drive operational excellence through metrics - OEE optimization, labor productivity benchmarks for Indian industries, lean operations implementation, and building a culture of continuous improvement that delivers sustainable cost reductions.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 36: OEE and Equipment Effectiveness
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        36,
        'OEE and Equipment Effectiveness Optimization',
        'Overall Equipment Effectiveness (OEE) is the gold standard metric for manufacturing productivity, measuring how effectively equipment is utilized. World-class OEE is 85%+, while average Indian manufacturing operates at 45-60% OEE, representing significant improvement opportunity.

Understanding OEE Components: OEE = Availability x Performance x Quality. Availability - Percentage of planned production time the equipment is running. Losses: Breakdowns, changeovers, setup, material shortages, planned downtime. Target: 90%+. Performance - Actual speed vs designed speed. Losses: Slow cycles, minor stops, idling, reduced speed. Target: 95%+. Quality - Percentage of good parts produced. Losses: Defects, rework, startup rejects, process defects. Target: 99%+. World-class OEE: 90% x 95% x 99% = 85%+.

OEE Calculation Example: Shift length: 480 minutes. Planned downtime (breaks, meetings): 30 minutes. Unplanned downtime (breakdowns, changeovers): 60 minutes. Actual production time: 390 minutes. Ideal cycle time: 1 minute per unit. Actual output: 350 units. Defects: 10 units. Availability = 390/(480-30) = 86.7%. Performance = 350/390 = 89.7%. Quality = (350-10)/350 = 97.1%. OEE = 86.7% x 89.7% x 97.1% = 75.5%.

OEE Benchmarks by Industry: Auto components: World-class 85%, average 55-65%. Electronics: World-class 85%, average 60-70%. Pharmaceuticals: World-class 80%, average 45-55%. Food processing: World-class 75%, average 40-50%. Packaging: World-class 80%, average 50-60%.

Six Big Losses Framework: Availability losses: Equipment failure (breakdowns), Setup and adjustments (changeovers). Performance losses: Idling and minor stoppages, Reduced speed/slow cycles. Quality losses: Defects in process, Reduced yield (startup losses).

OEE Improvement Strategies: For Availability: Preventive maintenance programs (target 80%+ PM compliance). Quick changeover (SMED) techniques to reduce setup time by 50%+. Root cause analysis for recurring breakdowns. Spare parts management to reduce mean time to repair. For Performance: Standard work to reduce cycle time variation. Operator training on optimal running parameters. Line balancing to reduce bottlenecks. Autonomous maintenance to reduce minor stops. For Quality: Statistical process control (SPC) implementation. Mistake-proofing (poka-yoke) devices. Quality at source - operator self-inspection. First-pass yield improvement programs.

OEE Measurement System: Manual tracking: Operator logs, shift reports - low cost but error-prone. Semi-automated: Barcode scanning, simple sensors - moderate investment. Fully automated: PLC integration, real-time dashboards - higher investment, accurate data.',
        '["Calculate current OEE for your critical equipment - collect availability, performance, and quality data for one week", "Identify top OEE losses using Six Big Losses framework - prioritize improvements by impact", "Implement OEE measurement system appropriate for your scale - start with manual if needed, plan for automation", "Set OEE improvement targets by equipment and create action plans addressing top losses"]'::jsonb,
        '["OEE Calculation Template with availability, performance, and quality components and data collection forms", "Six Big Losses Analysis Framework with categorization and root cause identification", "OEE Measurement System Options comparing manual, semi-automated, and automated approaches", "OEE Improvement Action Plan Template with loss prioritization and improvement initiatives"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: Labor Productivity Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        37,
        'Labor Productivity Benchmarks and Optimization',
        'Labor productivity is a critical competitiveness factor for Indian operations. While India has labor cost advantages, productivity levels are often 20-40% below developed country benchmarks. Understanding and improving labor productivity is essential for sustainable growth.

Labor Productivity Metrics: Units per labor hour - Primary manufacturing metric. Revenue per employee - Overall organizational productivity. Value added per employee - Wealth creation measure. Labor cost as percentage of revenue - Cost efficiency indicator. Direct to indirect labor ratio - Overhead efficiency.

Indian Productivity Benchmarks by Industry: Manufacturing (organized sector): Rs 8-15 lakh revenue per employee annually. Auto components: 800-1,500 units per worker per day (varies by component). Electronics assembly: 100-200 units per worker per day. Garments: 8-15 pieces per worker per day. Food processing: Rs 15-30 lakh per employee. IT services: Rs 30-50 lakh per employee.

Productivity Comparison - India vs Global: Manufacturing productivity gap: India at 30-40% of developed country levels. Key factors: Technology adoption, skill levels, process efficiency, infrastructure. Closing the gap: 5-10% annual productivity improvement achievable with focused effort.

Productivity Improvement Levers: Work Study and Methods Improvement: Time and motion studies to identify waste. Method improvement to reduce non-value-added activities. Workstation design optimization (ergonomics, material placement). Standard work documentation and adherence.

Skill Development: Technical skills training (10-15% productivity impact). Multi-skilling for flexibility (reduces idle time). Supervisor development (first-line leader effectiveness). Quality skills (reduce rework and inspection time).

Incentive Systems: Piece-rate systems where applicable (20-40% productivity boost). Team-based incentives for collaborative processes. Gain-sharing programs (share productivity savings). Performance management linking pay to productivity.

Technology and Automation: Labor-saving equipment and fixtures. Process automation for repetitive tasks. Digital work instructions and guidance systems. Analytics for productivity monitoring.

Measuring and Tracking Productivity: Daily production tracking by worker/team. Labor efficiency ratio (standard hours / actual hours). Productivity trend analysis (weekly, monthly). Benchmarking across shifts, lines, facilities. Productivity dashboards visible to workers.

Cultural Factors in Indian Context: Respect for workers while driving performance. Addressing absenteeism (industry average 10-15%). Managing contract labor productivity. Engaging union leadership in improvement initiatives.',
        '["Calculate current labor productivity using relevant metrics for your operations - establish baselines by product, process, and worker", "Conduct work study on critical processes to identify waste and improvement opportunities", "Design productivity improvement program combining methods improvement, skill development, and incentives", "Implement productivity tracking system with daily visibility and regular review cadence"]'::jsonb,
        '["Labor Productivity Metrics Framework with calculations and industry benchmarks", "Work Study Methodology Guide covering time study, method study, and improvement techniques", "Productivity Improvement Playbook with levers for methods, skills, incentives, and technology", "Productivity Dashboard Template with daily tracking, trend analysis, and benchmarking"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: Lean Operations Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        38,
        'Lean Operations Implementation',
        'Lean manufacturing principles, originating from Toyota Production System, have transformed operations globally. For Indian startups, lean offers a systematic approach to eliminate waste, reduce costs, and improve quality without major capital investment.

Lean Fundamentals - Seven Wastes (TIMWOOD): Transportation - Unnecessary movement of materials. Inventory - Excess stock tying up capital. Motion - Unnecessary worker movement. Waiting - Idle time waiting for materials, information, or equipment. Overproduction - Producing more than needed. Over-processing - Doing more than customer requires. Defects - Rework, scrap, inspection.

Core Lean Tools: 5S (Sort, Set in Order, Shine, Standardize, Sustain): Foundation for organized workplace. Implementation time: 1-2 days per area. Investment: Minimal (cleaning supplies, labels, storage). Impact: 10-20% productivity improvement, foundation for other improvements.

Visual Management: Kanban boards for production control. Andon lights for problem signaling. Standard work displays. Performance dashboards visible on shop floor. Investment: Rs 10,000-50,000 per area.

Value Stream Mapping (VSM): Map current state of material and information flow. Identify waste and improvement opportunities. Design future state with reduced lead time. Implementation: 2-3 day workshop, then improvement projects. Impact: 30-50% lead time reduction typical.

Standard Work: Document best-known method for each task. Reduce variation and ensure consistency. Foundation for improvement (current standard becomes baseline). Components: Takt time, work sequence, standard WIP.

Quick Changeover (SMED): Reduce setup/changeover time by 50-90%. Convert internal setup (machine stopped) to external (machine running). Simplify remaining internal activities. Impact: Increased flexibility, reduced batch sizes, improved OEE.

Kaizen Events: Focused 3-5 day improvement workshops. Cross-functional team addresses specific problem. Implement solutions during the event. Typical savings: Rs 5-20 lakh per event.

Lean Implementation Roadmap: Phase 1 (Months 1-3): 5S implementation, visual management, basic training. Phase 2 (Months 3-6): Value stream mapping, quick changeover, standard work. Phase 3 (Months 6-12): Kanban, cellular manufacturing, continuous flow. Phase 4 (Ongoing): Advanced tools, supplier integration, continuous improvement culture.',
        '["Conduct waste walk to identify the seven wastes in your operations - quantify impact of each waste type", "Implement 5S in pilot area - complete all five steps with before/after documentation", "Create value stream map for your main product family - identify improvement opportunities", "Plan lean implementation roadmap with phased approach and clear milestones"]'::jsonb,
        '["Seven Wastes Identification Guide with examples and quantification methods for each waste type", "5S Implementation Toolkit with checklists, audit forms, and sustainment mechanisms", "Value Stream Mapping Guide with symbols, methodology, and future state design principles", "Lean Implementation Roadmap Template with phased approach and tool deployment sequence"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: Cost Reduction Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        39,
        'Systematic Cost Reduction Strategies',
        'Sustainable cost reduction requires systematic approach beyond one-time cuts. Indian startups can achieve 10-20% cost reduction annually through structured programs targeting material, labor, overhead, and logistics costs.

Cost Reduction Framework: Understand cost structure - Map costs by category (material, labor, overhead, logistics). Identify opportunities - Benchmark against industry, analyze variances. Prioritize initiatives - Impact vs effort matrix. Implement systematically - Project management approach. Sustain improvements - Monitor and prevent cost creep.

Material Cost Reduction (typically 40-60% of product cost): Strategic sourcing - Competitive bidding, supplier consolidation, global sourcing. Design optimization - Value engineering, material substitution, specification review. Yield improvement - Reduce scrap, optimize cut patterns, improve recipes. Supplier development - Joint cost reduction programs with key suppliers. Typical savings potential: 5-15% of material cost.

Labor Cost Reduction (typically 15-30% of product cost): Productivity improvement - Methods improvement, skill development, incentives. Automation - Replace manual tasks with machines where ROI justifies. Workforce optimization - Right-sizing, flexible labor models, contract labor strategy. Absenteeism reduction - Attendance incentives, engagement programs. Typical savings potential: 10-20% of labor cost.

Overhead Cost Reduction (typically 15-25% of product cost): Energy optimization - LED lighting, VFD drives, power factor correction, solar. Maintenance optimization - Preventive maintenance, condition-based maintenance. Administrative efficiency - Process automation, shared services, digitization. Facility optimization - Space utilization, rent renegotiation. Typical savings potential: 10-15% of overhead cost.

Logistics Cost Reduction (typically 5-15% of product cost): Mode optimization - Shift to lower-cost modes where service allows. Route optimization - Direct shipping, consolidation, milk runs. 3PL negotiation - Volume leverage, competitive bidding. Packaging optimization - Reduce material, improve cube utilization. Typical savings potential: 10-20% of logistics cost.

Cost Reduction Project Management: Establish cost reduction targets by category. Assign project owners for each initiative. Track progress weekly/monthly. Celebrate successes and recognize contributors. Build cost consciousness into culture.

Avoiding Cost Reduction Pitfalls: Don''t cut muscle with fat - Protect capabilities needed for growth. Consider total cost - Direct savings may increase other costs. Maintain quality - Short-term cost cuts can damage reputation. Engage suppliers - Collaborative approach better than adversarial.',
        '["Map your cost structure by category - identify top 10 cost elements representing 80% of total cost", "Identify cost reduction opportunities in each category - estimate savings potential and implementation effort", "Prioritize cost reduction initiatives using impact vs effort matrix - select top 5 for immediate action", "Create cost reduction project plans with owners, timelines, and tracking mechanisms"]'::jsonb,
        '["Cost Structure Analysis Template with category breakdown and benchmark comparisons", "Cost Reduction Opportunity Assessment covering material, labor, overhead, and logistics initiatives", "Cost Reduction Initiative Prioritization Matrix with impact and effort scoring", "Cost Reduction Project Tracker with initiative status, savings tracking, and accountability"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: Building Continuous Improvement Culture
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'Building Continuous Improvement Culture',
        'Sustainable operations excellence requires embedding continuous improvement into organizational culture. Companies with strong CI culture achieve 5-10% annual productivity gains and significantly higher employee engagement.

Elements of CI Culture: Leadership Commitment - Visible leadership involvement in improvement activities. Standard Work for Leaders - Gemba walks, daily management, problem-solving coaching. Resource allocation - Budget, time, training for improvement activities.

Employee Engagement: Suggestion systems - Kaizen teian programs collecting employee ideas. Small group activities - Quality circles, improvement teams. Recognition and rewards - Celebrate improvements, share success stories. Empowerment - Authority to implement improvements within boundaries.

Problem-Solving Discipline: Standard problem-solving methodology (A3, 8D, DMAIC). Training all employees on basic problem-solving. Coaching support for complex problems. Root cause focus - Not just fixing symptoms.

Visual Management: Performance metrics visible on shop floor. Improvement project status boards. Standard work displays. Abnormality highlighting through visual controls.

Gemba-Based Management: Leaders spend time on the shop floor (gemba). Direct observation of work processes. Engagement with frontline workers. Real-time problem identification and response.

Building CI Infrastructure: CI Organization Structure: CI leader/manager role. Improvement facilitators. Functional improvement representatives. Clear improvement governance. Improvement Process: Idea submission and evaluation process. Project selection criteria. Resource allocation mechanism. Progress review cadence. Results celebration.

CI Training Program: Awareness training for all employees (2-4 hours). Basic problem-solving for operators (1-2 days). Advanced problem-solving for leaders (3-5 days). CI facilitator certification (5-10 days).

Measuring CI Effectiveness: Number of improvements implemented per employee per year (target: 3-5). Savings per employee from improvements (target: Rs 10,000-50,000). Employee participation rate (target: 60%+). Problem resolution time. Customer complaint reduction.

Sustaining CI Culture: Regular CI reviews at leadership level. Integration with performance management. Continuous training and skill development. Benchmarking and external learning. Evolution of CI program maturity.',
        '["Assess current CI culture maturity - evaluate leadership commitment, employee engagement, and problem-solving capability", "Design CI program structure covering suggestion systems, improvement teams, and recognition mechanisms", "Develop CI training curriculum for all levels - plan rollout starting with leaders and facilitators", "Create CI metrics dashboard tracking participation, improvements, and savings"]'::jsonb,
        '["CI Culture Maturity Assessment with scoring across leadership, engagement, and process dimensions", "CI Program Design Template covering structure, processes, and recognition systems", "CI Training Curriculum Outline with modules for awareness, basic, and advanced problem-solving", "CI Metrics Dashboard Template tracking participation, improvements, and financial impact"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P18 Modules 5-8 (Days 21-40) created successfully';

END $$;

COMMIT;
