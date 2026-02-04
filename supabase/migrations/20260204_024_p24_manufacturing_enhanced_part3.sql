-- THE INDIAN STARTUP - P24: Manufacturing & Make in India Mastery - Part 3
-- Migration: 20260204_024_p24_manufacturing_enhanced_part3.sql
-- Purpose: Modules 8-11 (Days 36-55) - Export, Defense, Semiconductor

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
    v_mod_11_id TEXT;
BEGIN
    -- Get P24 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P24';

    -- ========================================
    -- MODULE 8: Export from India (Days 36-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Export from India - Manufacturing',
        'Master export strategies for manufactured goods - IEC registration, export documentation, customs procedures, RoDTEP benefits, export promotion schemes, market access strategies, and building export-ready manufacturing capabilities.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 36: Export Basics and IEC Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        36,
        'Export Basics and IEC Registration',
        'India''s merchandise exports reached $450+ billion, with manufactured goods contributing 75%+. Understanding export fundamentals and obtaining necessary registrations is the first step to accessing global markets.

Export Landscape: Top manufactured exports: Petroleum products, gems and jewelry, pharmaceuticals, automobiles and parts, machinery, textiles, chemicals, electronics. Key markets: USA (18%), UAE (7%), China (5%), Netherlands (4%), UK (3%). Growth sectors: Pharmaceuticals, electronics, auto components, engineering goods.

Importer Exporter Code (IEC): Mandatory registration for any import/export activity. Issued by DGFT (Directorate General of Foreign Trade). Lifetime validity (no renewal needed). PAN-based (one IEC per PAN).

IEC Registration Process: Online application through DGFT portal (dgft.gov.in). Documents required: PAN card, Aadhaar, bank account details (cancelled cheque), business registration (GST/Udyam). Fee: Rs 500. Processing time: 1-3 working days. Immediate digital certificate issuance.

AD Code Registration: Authorized Dealer Code from bank. Required for foreign exchange transactions. Links IEC to bank account. Enables receipt of export proceeds.

Export Promotion Councils (EPCs): Sector-specific councils under Ministry of Commerce. Membership provides: Market intelligence, trade fair participation, buyer-seller meets, certificate of origin issuance. Key EPCs for manufacturing: EEPC (Engineering), Pharmexcil (Pharma), CITI (Textiles), CAPEXIL (Chemicals), TEXPROCIL (Cotton Textiles).

RCMC (Registration Cum Membership Certificate): Issued by relevant EPC. Required for accessing certain export benefits. Enables participation in MAI (Market Access Initiative) programs. Annual fee based on export turnover.

Export Documentation: Commercial Invoice: Description, quantity, value, terms. Packing List: Detailed packaging information. Bill of Lading/Airway Bill: Transport document. Certificate of Origin: For FTA benefits. Shipping Bill: Customs declaration.

Export Finance: Pre-shipment finance: Working capital for export orders. Post-shipment finance: Against shipping documents. ECGC insurance: Export credit guarantee. Interest subvention: 3-5% reduced interest for certain sectors.',
        '["Apply for IEC through DGFT portal with complete documentation", "Complete AD Code registration with your bank for forex transactions", "Join relevant Export Promotion Council and obtain RCMC", "Set up export documentation system with standard formats"]'::jsonb,
        '["IEC Application Step-by-Step Guide with screenshots", "Export Documentation Templates Pack (Invoice, Packing List, etc.)", "Export Promotion Council Directory with membership benefits", "Export Finance Options Guide with bank schemes and rates"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 37: Export Incentives and RoDTEP
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        37,
        'Export Incentives and RoDTEP Scheme',
        'India offers multiple export incentive schemes to enhance competitiveness of manufactured exports. Understanding and maximizing these benefits significantly impacts export profitability.

RoDTEP (Remission of Duties and Taxes on Exported Products): Replaced MEIS from January 2021. Refunds embedded central, state, and local taxes not otherwise refunded. WTO-compliant scheme. Coverage: 8,555 tariff lines at 8-digit level. Rates: 0.3% to 4.3% of FOB value depending on product. Claim process: Auto-generated scrip based on shipping bill, tradeable or usable for import duty payment.

Duty Drawback Scheme: Refund of customs duty paid on imported inputs. Two types: All Industry Rates (AIR) - standard rates by product, Brand Rate - actual duty based on inputs used. Claim: Through shipping bill, direct credit to bank account. Higher rates for value addition.

Advance Authorization: Duty-free import of inputs for export production. Application to DGFT with export obligation. Validity: 12 months for import, 18 months for export obligation. Benefits: Zero customs duty on inputs used in exports.

EPCG (Export Promotion Capital Goods): Import capital goods at zero duty. Export obligation: 6x the duty saved over 6 years. Useful for new machinery acquisition. Application through DGFT.

Special Economic Zones (SEZ): Units in SEZ enjoy: Duty-free imports, income tax benefits (sunset clause applied), single window clearance, simplified compliance. Suitable for export-focused manufacturing. 268 operational SEZs across India.

Status Holder Benefits: Recognition based on export performance. Categories: One Star (Rs 3 crore exports), Two Star (Rs 25 crore), Three Star (Rs 100 crore), Four Star (Rs 500 crore), Five Star (Rs 2,500 crore). Benefits: Priority customs clearance, self-certification, fix bank realization period.

Export Finance Interest Subvention: 3% interest subvention on pre and post-shipment credit. Available for MSME manufacturers. Claim through banks.

Common Mistakes: Not claiming RoDTEP due to documentation gaps. Missing duty drawback timelines. Export obligation default in Advance Authorization. Incorrect HS code classification affecting benefits.',
        '["Calculate applicable RoDTEP rates for your export products", "Evaluate Advance Authorization for regular imported inputs", "Assess EPCG benefits for planned machinery imports", "Set up system to track and claim all applicable export benefits"]'::jsonb,
        '["RoDTEP Rate Finder with product-wise rates and calculation", "Export Incentive Comparison Calculator", "Advance Authorization Application Guide", "Export Benefit Tracking System Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 38: Customs and Shipping Procedures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        38,
        'Customs and Shipping Procedures',
        'Efficient customs clearance and logistics are critical for export competitiveness. Understanding procedures, documentation, and best practices ensures smooth shipments and customer satisfaction.

Customs Clearance Process: Pre-shipment: Shipping bill filing on ICEGATE. Factory stuffing: For full container loads (FCL). Container Freight Station (CFS): For less than container loads (LCL). Customs examination: Physical or document-based. Let Export Order (LEO): Clearance for export.

Shipping Bill Types: Free Shipping Bill: For exports without duty drawback claims. Drawback Shipping Bill: For duty drawback claims. EPCG Shipping Bill: For EPCG obligation fulfillment. Advance Authorization Shipping Bill: For AA obligation.

ICEGATE Portal: Online customs filing platform. Shipping bill submission. Duty drawback claims. RoDTEP scrip generation. Document upload and tracking.

Key Documents for Customs: Commercial invoice (multiple copies). Packing list. Bill of lading/Airway bill. Certificate of origin (for FTA benefits). Insurance certificate. Quality/inspection certificates. AD code and bank realization certificate.

Incoterms 2020: FOB (Free on Board): Seller delivers to vessel, buyer bears freight and risk. CIF (Cost, Insurance, Freight): Seller bears freight and insurance to destination port. Ex-Works: Buyer bears all costs from seller premises. DDP (Delivered Duty Paid): Seller delivers duty-paid to buyer location.

Shipping Options: Sea freight: Most economical for bulk, 15-45 days transit. Air freight: Fastest, 2-5 days, premium cost. Multimodal: Combination for cost-time optimization.

Freight Forwarders: Selection: Experience, network, rates, tracking capability. Services: Booking, documentation, customs clearance, insurance. Key players: DHL, FedEx, Maersk, Kuehne+Nagel, Indian forwarders.

Common Export Delays: Document discrepancies. Customs examination requirements. Payment/LC issues. Destination country compliance. Avoid through: Standard documentation, AEO status, pre-clearance checks.',
        '["Set up ICEGATE account and understand shipping bill filing process", "Establish relationships with 2-3 reliable freight forwarders", "Create standard export documentation checklist and templates", "Understand Incoterms and select appropriate terms for your exports"]'::jsonb,
        '["ICEGATE Registration and Shipping Bill Guide", "Export Documentation Checklist by Shipment Type", "Freight Forwarder Evaluation and Selection Framework", "Incoterms 2020 Quick Reference with cost/risk implications"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 39: Export Market Access
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        39,
        'Export Market Access Strategies',
        'Successful exporting requires systematic market identification, entry strategy, and relationship building. Understanding trade agreements and market access tools enables strategic expansion.

Market Selection Framework: Market size and growth: GDP, import volumes, growth rates. Competition analysis: Existing suppliers, domestic production. Trade barriers: Tariffs, non-tariff measures, standards. Logistics: Distance, shipping routes, transit time. Payment risk: Country risk, forex stability. Cultural fit: Language, business practices.

India''s Trade Agreements: FTAs providing preferential tariffs: ASEAN-India FTA: 10 ASEAN countries, significant tariff reductions. India-Japan CEPA: Zero/reduced duty on most items. India-Korea CEPA: Tariff elimination on 80%+ items. SAFTA: South Asian countries. India-UAE CEPA (2022): Comprehensive agreement, zero duty on 80%+ items. India-Australia ECTA (2022): Zero duty on 85%+ Indian exports.

Utilization: Obtain Certificate of Origin from EPC. Ensure Rules of Origin compliance. Claim preferential tariff at destination.

Market Access Initiative (MAI): Government scheme for export promotion. Funding for: Trade fairs, buyer-seller meets, market studies. Apply through relevant EPC.

Trade Fairs and Exhibitions: Physical presence in target markets. Key platforms: Canton Fair (China), Automechanika (Germany), MEDICA (Medical), PackExpo (Packaging). ITPO (India Trade Promotion Organisation) organizes Indian participation.

E-commerce Exports: Growing channel for manufactured goods. Platforms: Amazon Global, eBay, Alibaba. Benefits: Direct customer access, lower entry barriers. Challenges: Returns handling, compliance.

Building Export Relationships: Quality and reliability are non-negotiable. Start small, prove capability, scale gradually. Visit markets and customers personally. Understand customer requirements deeply. Provide responsive communication. Consider local representation or distributor.',
        '["Identify 3-5 target export markets using systematic evaluation criteria", "Analyze applicable FTAs and potential tariff savings for target markets", "Plan participation in relevant trade fairs in next 12 months", "Develop market entry strategy for priority market"]'::jsonb,
        '["Export Market Selection Framework with scoring methodology", "India FTA Benefits Guide with product-wise tariff comparison", "Trade Fair Calendar for manufacturing sectors", "Market Entry Strategy Template with channel options"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 40: Building Export-Ready Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        40,
        'Building Export-Ready Manufacturing',
        'Export success requires manufacturing capabilities that meet international quality standards, compliance requirements, and delivery expectations. Building export readiness is a systematic process.

Quality Requirements: International certifications essential: ISO 9001 as minimum, sector-specific (IATF 16949 for auto, AS9100 for aerospace). Product certifications: CE marking for EU, UL for US, specific country certifications. Testing: NABL-accredited lab reports internationally recognized.

Compliance Requirements: Product safety standards: EU directives, US regulations. Environmental compliance: RoHS, REACH for chemicals. Social compliance: SA8000, BSCI, SEDEX for apparel. Labeling and packaging: Country-specific requirements.

Production Capability: Capacity for export volumes: Export orders can be large and regular. Quality consistency: Same quality batch to batch. Flexibility: Accommodate customer specifications. Traceability: Lot tracking from raw material to finished goods.

Documentation Capability: Quality certificates and test reports. Material certifications. Compliance declarations. Product technical files.

Delivery Reliability: Meet committed delivery dates. Packaging for international transit. Buffer stock for critical customers.

Export Costing: Include all costs: Production, packaging, inland freight, port charges, freight forwarder fees, documentation. Factor currency fluctuation risk. Include export incentive benefits in pricing. Ensure competitive landed cost at destination.

Common Export Readiness Gaps: Quality inconsistency. Certification gaps. Documentation inadequacy. Delivery unreliability. Communication responsiveness.

Export Readiness Assessment: Quality systems: Score 1-5. Certifications: List gaps. Production capacity: Export volume capability. Documentation: Completeness check. Delivery: Track record analysis.

Building Capability: Phase 1: ISO 9001 and basic product certifications. Phase 2: Sector-specific certifications. Phase 3: Market-specific compliance. Phase 4: Scale and continuous improvement.',
        '["Conduct export readiness assessment across quality, certifications, capacity, and documentation", "Identify certification gaps for target markets and create achievement roadmap", "Develop export costing model including all cost elements and incentives", "Build export documentation capability with complete technical file"]'::jsonb,
        '["Export Readiness Assessment Checklist with scoring criteria", "Certification Requirements by Market Guide", "Export Costing Template with all cost components", "Technical Documentation File Structure for exports"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Defense Manufacturing (Days 41-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Defense Manufacturing Opportunity',
        'Tap into India''s Rs 1 lakh crore+ defense procurement - Make in India for defense, industrial licensing, DPSUs and OFBs as customers, defense export policy, and offset requirements creating private sector opportunities.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 41: Defense Manufacturing Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        41,
        'Defense Manufacturing Landscape in India',
        'India is the world''s third-largest military spender with Rs 5.93 lakh crore defense budget (2024-25), of which Rs 1.72 lakh crore is capital acquisition. The push for self-reliance creates massive opportunities for private manufacturers.

Defense Budget Structure: Revenue expenditure: Salaries, maintenance, operations. Capital expenditure: New equipment acquisition (focus area). Capital budget growth: 7-10% annually. Indigenous procurement target: 75% of capital budget.

Atmanirbhar Bharat in Defense: Self-reliance push through: Positive indigenization lists (Items banned for import). Indigenous content requirements in procurement. Defense Production Corridors (UP and Tamil Nadu). Increased FDI limit (74% automatic, 100% government route).

Major Acquisition Categories: Aircraft and helicopters: Rs 50,000+ crore annually. Naval vessels: Rs 30,000+ crore. Missiles and ammunition: Rs 25,000+ crore. Vehicles and tanks: Rs 15,000+ crore. Electronics and communication: Rs 20,000+ crore. Personal equipment and clothing: Rs 5,000+ crore.

Defense Customers: Armed Forces: Indian Army, Navy, Air Force, Coast Guard. Defense PSUs: HAL, BEL, BDL, BEML, MDL, GSL, GRSE, HSL. Ordnance Factories: Now corporatized as 7 DPSUs. DRDO: R&D organization, technology development.

Private Sector Entry Points: Tier 1 supplier to DPSUs: Sub-systems, assemblies. Tier 2/3 supplier: Components, raw materials. Direct contracts: Certain categories open to private sector. Joint ventures: With foreign OEMs for Make in India. Offset obligations: Mandated for large import contracts.

Key Private Players: L&T Defense: Naval, missiles, aerospace. Tata Advanced Systems: Aerospace, land systems. Bharat Forge: Artillery, defense vehicles. Mahindra Defense: Vehicles, naval systems. Adani Defense: Ammunition, aerospace. Kalyani Group: Artillery, ammunition.

Market Access: Registration with MOD/DPSUs. MSME and startup opportunities. Defense corridors offer land and incentives.',
        '["Study defense budget allocation and identify relevant procurement categories", "Map potential customers: DPSUs, armed forces, defense corridor units", "Analyze private sector success stories in your capability area", "Assess product-market fit for defense applications"]'::jsonb,
        '["Defense Budget Analysis with procurement category breakdown", "Defense Customer Directory with contact points and procurement processes", "Private Sector Defense Success Stories compilation", "Defense Market Entry Assessment Framework"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: Defense Industrial Licensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        42,
        'Defense Industrial Licensing',
        'Manufacturing defense items requires Industrial License from DPIIT. Understanding the licensing framework, categories, and process is essential for entering defense manufacturing.

Industrial License Requirement: Defense items listed under Arms Act 1959. Schedule to Industries (Development and Regulation) Act. Certain items exempted from licensing (dual-use with civilian applications). License required before manufacturing commences.

Licensed Categories: Small arms and ammunition. Military vehicles and components. Military aircraft and helicopters. Naval vessels and submarines. Missiles and guided weapons. Military electronics and communications. Explosives and propellants. Armor and protective equipment.

Exempted Categories (No License Needed): Certain dual-use items with civilian applications. Components not directly controlled. Specific list available from DPIIT. Verify before assuming exemption.

Application Process: Online application through DPIIT portal. Security clearance from MHA (Ministry of Home Affairs). State government NOC in some cases. Processing time: 4-8 weeks (expedited recently). License validity: Initially 3 years, renewable.

Required Documents: Company registration documents. PAN, GST registration. Board resolution authorizing application. Detailed project report. Security arrangement plan. Foreign equity details (if any). Technical collaboration details.

FDI in Defense: 74% allowed under automatic route. 100% under government route for modern technology. Prior security clearance required. Annual compliance certification.

Post-License Compliance: Annual manufacturing return. Production capacity reporting. Any capacity enhancement requires amendment. Change in shareholding requires approval. Export requires separate approval.

Recent Simplifications: Single window clearance for defense licenses. Reduced processing time. Self-certification for certain compliances. Parallel processing of clearances.

Common Issues: Incomplete applications causing delays. Security clearance delays for certain backgrounds. Misunderstanding of licensed vs exempted items. Non-compliance with post-license requirements.',
        '["Determine if your intended products require industrial license for defense", "Prepare complete application documentation with all required clearances", "Apply through DPIIT portal with accurate product descriptions", "Establish compliance system for post-license requirements"]'::jsonb,
        '["Defense Industrial License Application Guide with required documents", "Licensed vs Exempted Products Classification Guide", "FDI in Defense Compliance Framework", "Post-License Compliance Checklist and Calendar"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: Becoming a Defense Supplier
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        43,
        'Becoming a Defense Supplier',
        'Entering the defense supply chain requires systematic vendor registration, qualification, and relationship building. Understanding the procurement process and customer requirements is critical for success.

Vendor Registration: Central Vendor Registration: MOD vendor directory. DPSU-specific registration: Each DPSU maintains vendor list. Portal-based: Most DPSUs have online registration.

Key Registration Requirements: Company profile and capabilities. Quality certifications (ISO 9001 minimum). Financial statements (3 years). Manufacturing facility details. Product portfolio and specifications. References from other customers.

DPSU Vendor Development: HAL: Major aerospace buyer, multiple divisions. BEL: Electronics and communication systems. BDL: Missiles and guided weapons. BEML: Heavy vehicles and equipment. Shipyards: MDL, GSL, GRSE, HSL. Each has specific vendor development programs.

Qualification Process: Technical evaluation: Product specifications, testing. Quality system audit: Factory assessment. Financial evaluation: Stability, capacity. Trial orders: Prove capability with small quantities. Approval: Addition to approved vendor list.

Procurement Categories: Capital Acquisition: Major equipment through DAP (Defense Acquisition Procedure). Revenue Procurement: Spares, consumables through DPM. Direct contracts: For certain categories.

Procurement Channels: GeM (Government e-Marketplace): Growing platform for defense procurement. E-tender portals: DPSU-specific tender systems. Direct nomination: For specialized items. Rate contracts: For regular requirements.

Pricing and Payment: L1 basis common (lowest price wins). Quality-price trade-off in some categories. Payment terms: 30-60 days typically. Advance for MSMEs possible.

Building Relationships: Understand customer requirements deeply. Provide reliable quality and delivery. Responsive to customer queries. Participate in vendor meets. Visit customer facilities.

MSME Opportunities: 25% procurement reserved for MSMEs. Startup India benefits applicable. Simplified processes for small vendors. Idef (Innovations for Defence Excellence) for innovators.',
        '["Register as vendor with relevant DPSUs for your product category", "Prepare complete vendor qualification documentation package", "Identify specific opportunities through GeM and DPSU tender portals", "Plan visits to DPSU vendor development cells"]'::jsonb,
        '["DPSU Vendor Registration Guide with portal links and requirements", "Vendor Qualification Documentation Checklist", "Defense Procurement Opportunity Tracker", "DPSU Vendor Meet and Exhibition Calendar"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 44: Defense Export Policy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        44,
        'Defense Exports from India',
        'India''s defense exports reached Rs 21,083 crore in FY24, with Rs 50,000 crore target by 2028-29. Understanding export policy, procedures, and opportunities enables participation in this growing segment.

Defense Export Growth: FY17: Rs 1,521 crore. FY24: Rs 21,083 crore (14x growth). Target: Rs 50,000 crore by FY28-29. Major exports: Dornier aircraft, artillery, naval vessels, ammunition, personal equipment.

Export Policy Framework: Procedure for Export of Defense Articles (PEDA). Standard Operating Procedure for defense exports. End User Certificate requirements. Re-transfer restrictions.

Export Authorization Categories: Category A (Positive List): Pre-approved for export, streamlined process. Category B: Case-by-case approval required. Prohibited: Items not approved for export.

Export Approval Process: Application to Department of Defence Production. Security clearance for certain destinations. End User Certificate from importing country. MEA clearance for sensitive destinations. Processing time: 2-4 weeks for Category A.

Required Documents: Company authorization for defense manufacturing. Product specifications and classification. End User Certificate. Contract or order details. Compliance declarations.

Key Export Markets: Friendly foreign countries as notified. Priority markets: Southeast Asia, Middle East, Africa. Defense cooperation agreements guide preferences. Government-to-government deals for major platforms.

Lines of Credit: GOI extends defense LoC to friendly countries. Creates demand for Indian defense products. Current LoCs to Vietnam, Bangladesh, Myanmar, others.

Export Promotion: DefExpo: Biennial defense exhibition in India. International defense exhibitions: Participate through MOD/DPSUs. Government-to-government marketing support. Defence Attaché assistance in missions.

Private Sector Export: Growing participation. Joint ventures with foreign OEMs. Sub-contracting from DPSUs. Direct contracts for certain items.

Offset Benefits: Import contracts >Rs 2,000 crore require 30% offset. Offset fulfilled through: Direct purchase from Indian vendors, technology transfer, JV establishment. Creates demand for Indian defense manufacturers.',
        '["Assess export potential for your defense products", "Understand export authorization requirements for your product category", "Identify target markets based on India defense cooperation agreements", "Plan participation in DefExpo and international defense exhibitions"]'::jsonb,
        '["Defense Export Authorization Guide with category-wise procedures", "End User Certificate Template and Requirements", "Defense Exhibition Calendar with participation guidance", "Offset Opportunity Assessment Framework"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 45: Defense Manufacturing Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        45,
        'Defense Manufacturing Strategy',
        'Strategic planning for defense manufacturing requires understanding the unique characteristics of this sector and building sustainable competitive advantages.

Defense Market Characteristics: Long procurement cycles (2-7 years). Stringent quality requirements. Relationship-intensive business. Payment security (government customer). Volume uncertainty. Technology obsolescence risk.

Strategic Options: Tier 1 System Integrator: High complexity, high investment, limited players. Sub-system Supplier: Medium complexity, growing opportunities. Component Manufacturer: Entry-level, price competitive. Technology Partner: R&D collaboration with DPSUs/DRDO. Offset Fulfillment: Partnership with foreign OEMs.

Capability Building: Quality systems: AS9100 for aerospace, IATF 16949 for vehicles. Testing facilities: MIL-STD compliance testing. Design capability: Move up value chain. Technology partnerships: Access to advanced technology. Capacity: Dedicated defense manufacturing lines.

Defense Production Corridors: Uttar Pradesh Corridor: Lucknow-Kanpur-Agra-Aligarh-Chitrakoot. Tamil Nadu Corridor: Chennai-Hosur-Coimbatore-Salem-Tiruchirappalli. Benefits: Land at subsidized rates, plug-and-play infrastructure, single window clearance, incentives.

Financial Considerations: Working capital intensive. Delayed payments historically (improving). MSME preference in procurement. EMD and security deposit requirements. Insurance requirements.

Risk Management: Customer concentration risk. Technology obsolescence. Policy change impact. Contract execution risks. Mitigation through diversification, continuous upgradation.

Growth Path: Year 1-2: Vendor registration, trial orders. Year 3-4: Regular supply, expanded product range. Year 5+: Sub-system level, exports, technology upgrades.

Success Factors: Quality consistency above all. Delivery reliability. Cost competitiveness. Relationship building. Continuous capability upgradation. Patience for long cycles.',
        '["Develop defense manufacturing strategy aligned with your capabilities", "Evaluate defense corridor location for new facility or expansion", "Create 5-year roadmap for capability building and market penetration", "Identify partnership opportunities with foreign OEMs or DPSUs"]'::jsonb,
        '["Defense Manufacturing Strategy Template", "Defense Corridor Benefits Comparison", "Capability Building Roadmap Framework", "Defense Partnership Opportunity Assessment"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Semiconductor Opportunity (Days 46-50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Semiconductor Manufacturing Opportunity',
        'Understand India''s semiconductor mission - Rs 76,000 crore incentives, fab projects, OSAT and ATMP opportunities, display manufacturing, design-linked incentive scheme, and building semiconductor ecosystem participation.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 46: India Semiconductor Mission
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        46,
        'India Semiconductor Mission Overview',
        'India Semiconductor Mission (ISM) aims to build a complete semiconductor ecosystem with Rs 76,000 crore incentives. This strategic initiative creates unprecedented opportunities across the semiconductor value chain.

Why Semiconductors Matter: Global market: $600+ billion, growing to $1 trillion by 2030. India imports: $25+ billion annually (100% import dependent). Strategic importance: Defense, telecom, automotive, consumer electronics. Supply chain vulnerability: COVID and geopolitical disruptions highlighted risks.

India Semiconductor Mission: Launched December 2021. Budget: Rs 76,000 crore. Objective: Build semiconductor manufacturing ecosystem. Components: Fab incentives, ATMP/OSAT, Display fab, Design-linked incentive.

Incentive Structure: Semiconductor Fabs: 50% of project cost (up to Rs 22,900 crore per project). Display Fabs: 50% of project cost (up to Rs 12,000 crore). Compound Semiconductors/OSAT/ATMP: 50% of capital expenditure (up to Rs 4,400 crore). Design-Linked Incentive: Up to Rs 1,500 crore for chip design companies.

Approved Projects: Tata Electronics: OSAT facility in Gujarat (Rs 27,000 crore). Tata Electronics: Fab at Dholera with Powerchip (Rs 91,000 crore). Micron: ATMP in Gujarat ($2.75 billion). CG Power: OSAT with Renesas (Rs 7,600 crore). Kaynes Technology: OSAT (Rs 3,300 crore).

Semiconductor Value Chain: Design: Chip architecture and circuit design. Front-end manufacturing (Fab): Wafer fabrication, 100+ process steps. Back-end (ATMP/OSAT): Assembly, Testing, Marking, Packaging. Equipment and materials: Manufacturing equipment, chemicals, gases.

India''s Current Position: Strong in design: 20% of global chip design engineers in India. Weak in manufacturing: No commercial fabs currently. Growing in packaging: New OSAT facilities approved. Equipment: Minimal local capability.

Opportunity for Manufacturers: Not fabrication (massive capital), but: Facility construction and infrastructure. Cleanroom equipment and components. Process chemicals and gases. Handling equipment. Packaging materials. Testing equipment and services.',
        '["Study India Semiconductor Mission incentive structure and approved projects", "Identify supply chain opportunities in semiconductor manufacturing ecosystem", "Assess your capabilities relevance to semiconductor ecosystem needs", "Connect with ISM and approved project developers for opportunity identification"]'::jsonb,
        '["India Semiconductor Mission Complete Guide with incentive details", "Semiconductor Value Chain Overview for non-specialists", "Approved Project Status Tracker with implementation timelines", "Semiconductor Ecosystem Opportunity Map for manufacturers"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 47: OSAT and ATMP Opportunities
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        47,
        'OSAT and ATMP Manufacturing',
        'Outsourced Semiconductor Assembly and Test (OSAT) and Assembly, Testing, Marking, and Packaging (ATMP) represent more accessible entry points into semiconductor manufacturing compared to fabs.

OSAT/ATMP Overview: After wafer fabrication, chips need: Dicing (cutting individual chips from wafer). Bonding (connecting chip to package). Packaging (protective enclosure). Testing (functionality verification). Marking (labeling and identification). Lower capital intensity than fabs: Rs 3,000-30,000 crore vs Rs 1 lakh crore+.

Approved OSAT Projects: Tata Electronics, Gujarat: Rs 27,000 crore investment. Focus: Flip-chip, advanced packaging. Micron, Gujarat: $2.75 billion investment. Focus: DRAM packaging and test. CG Power with Renesas: Rs 7,600 crore. Focus: Automotive semiconductors. Kaynes Technology: Rs 3,300 crore. Focus: Industrial and automotive chips.

ISM Incentive for OSAT: 50% of capital expenditure. Up to Rs 4,400 crore incentive. Minimum investment threshold: Rs 150 crore. Employment requirements linked.

OSAT Supply Chain Needs: Packaging materials: Lead frames, substrates, bonding wire, mold compounds. Equipment: Wire bonders, die bonders, molding equipment, test handlers. Cleanroom infrastructure: HVAC, filtration, flooring. Chemicals: Cleaning solvents, fluxes, adhesives. Testing services: Burn-in, reliability testing.

Opportunities for Indian Manufacturers: Lead frame manufacturing: Metal stamping/etching capability. Packaging substrate: PCB manufacturing extension. Bonding wire: Specialty wire manufacturing. Test fixtures: Precision engineering. Handling equipment: Automation expertise. Facility construction: Cleanroom specialists.

Getting Started: Understand OSAT process flow. Identify specific product/service opportunity. Connect with approved OSAT projects. Quality certification for semiconductor industry. Technical partnerships if needed.

Global OSAT Landscape: Major players: ASE (Taiwan), Amkor (US), JCET (China). India entering through partnerships. Technology transfer arrangements common.',
        '["Study OSAT process flow and identify applicable opportunities from your capabilities", "Connect with approved OSAT projects for vendor development opportunities", "Assess quality and technology gaps for semiconductor supply chain participation", "Explore partnership opportunities with global OSAT equipment/material suppliers"]'::jsonb,
        '["OSAT Process Flow and Supply Chain Requirements Guide", "Approved OSAT Project Contact and Vendor Development Information", "OSAT Quality Requirements and Certification Guide", "OSAT Equipment and Materials Supplier Directory"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 48: Display Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        48,
        'Display Manufacturing Ecosystem',
        'Display panels are critical components for smartphones, TVs, laptops, and automotive. India imports $8+ billion displays annually, creating opportunity under semiconductor mission incentives.

Display Technology Types: LCD (Liquid Crystal Display): Mature technology, large TV panels. OLED (Organic LED): Premium smartphones, TVs. AMOLED (Active Matrix OLED): Flexible, high-end devices. Mini-LED: Emerging technology, backlighting. Micro-LED: Next-generation, very high cost.

India Display Market: Import: $8+ billion annually. Key applications: Smartphones (40%), TVs (25%), laptops/monitors (20%), automotive (growing). Current domestic manufacturing: Minimal, limited to module assembly.

ISM Display Fab Incentive: 50% of project cost support. Up to Rs 12,000 crore per project. Target: AMOLED and LCD manufacturing. Minimum investment thresholds apply.

Approved Projects: Vedanta-Foxconn: Initially proposed, later restructured. New applications expected: Multiple companies in discussions. Focus areas: Mobile display and TV panels.

Display Manufacturing Process: Array (TFT) fabrication: Semiconductor-like process on glass. Cell process: Liquid crystal or OLED deposition. Module assembly: Backlight, drivers, touch integration. Panel assembly: Integration with product.

Supply Chain Opportunities: Glass substrates: High-purity specialty glass. Chemicals: Photoresists, etchants, cleaners. Films and foils: Polarizers, optical films. Backlight units: LED backlighting systems. Touch panels: Overlay integration. Module assembly: Lower-end entry point.

Indian Companies in Display: Dixon Technologies: TV assembly, moving to modules. Optiemus: Mobile display modules. Component suppliers: Various for assembly operations.

Entry Strategies: Start with module assembly (lower investment). Supply components to assembly operations. Partner with global display companies. Target automotive displays (growing segment).

Challenges: Technology barrier very high for panel manufacturing. Capital intensive. Ecosystem needs building. Competition from established Asian players.',
        '["Understand display technology evolution and India opportunity", "Identify display supply chain opportunities matching your capabilities", "Connect with display module assemblers for component supply opportunities", "Assess automotive display segment as growing opportunity"]'::jsonb,
        '["Display Technology Overview for non-specialists", "Display Supply Chain Opportunity Map", "Display Module Assembly Business Model Guide", "Automotive Display Market Analysis"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 49: Compound Semiconductors and Specialty Chips
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        49,
        'Compound Semiconductors and Emerging Opportunities',
        'Compound semiconductors (GaN, SiC) and specialty chips represent emerging opportunities with lower capital requirements than silicon fabs. These are strategic areas with growing applications in EVs, 5G, and defense.

Compound Semiconductors: Made from multiple elements (vs pure silicon). Types: Gallium Nitride (GaN), Silicon Carbide (SiC), Gallium Arsenide (GaAs). Applications: Power electronics, RF/5G, LED, sensors. Growing faster than silicon (20%+ CAGR).

GaN Applications: 5G infrastructure: Base stations, power amplifiers. Fast charging: Smartphone and laptop chargers. EV: On-board chargers, inverters. Defense: Radar, electronic warfare.

SiC Applications: EV powertrains: Inverters, converters (Tesla uses SiC). Industrial: Motor drives, power supplies. Renewable energy: Solar inverters, wind turbines.

ISM Compound Semiconductor Incentive: 50% of capital expenditure. Lower investment threshold than silicon fabs. Focus on strategic applications.

Indian Opportunities: Research institutes: IISC, IITs have compound semiconductor research. Startups: Emerging in power electronics using GaN/SiC. Government labs: GAETEC, SCL have some capability.

Sensor Chips: MEMS sensors: Accelerometers, gyroscopes, pressure sensors. Image sensors: Camera modules. Gas sensors: Air quality, industrial safety. Applications: Automotive, IoT, smartphones. Lower capital than digital chips. India has some capability through labs.

Photonics and Optoelectronics: LEDs: Significant manufacturing in India. Laser diodes: Growing applications. Optical sensors: Ranging, proximity. Fiber optic components: Telecom infrastructure.

Opportunity Assessment: Lower capital than silicon fabs. Strategic importance recognized. Growing applications (EV, 5G). Niche focus possible.

Getting Started: Understand specific technology area deeply. Connect with research institutions. Identify application-specific opportunities. Consider technology licensing. Start with packaging/testing if manufacturing complex.',
        '["Study compound semiconductor applications and growth drivers", "Identify specific opportunity area: GaN, SiC, MEMS, or photonics", "Connect with research institutions for technology collaboration", "Assess EV and 5G supply chain opportunities in your capability area"]'::jsonb,
        '["Compound Semiconductor Technology Guide", "GaN and SiC Application Analysis", "MEMS Sensor Market and Manufacturing Overview", "Research Institution Collaboration Framework"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 50: Building Semiconductor Ecosystem Participation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        50,
        'Building Semiconductor Ecosystem Participation',
        'Participating in India''s semiconductor ecosystem requires strategic positioning based on capabilities and realistic assessment of opportunities. Multiple entry points exist for different types of manufacturers.

Ecosystem Mapping: Direct manufacturing: Fabs, OSAT (very high capital). Equipment manufacturing: Process equipment, handling systems. Materials and chemicals: Specialty chemicals, gases, substrates. Infrastructure: Cleanrooms, utilities, facility management. Services: Testing, calibration, maintenance.

Opportunity by Capability: Precision engineering: Test fixtures, handling equipment, custom parts. Chemical manufacturing: Process chemicals, cleaning agents, specialty gases. Electronics: Test equipment, sensors, control systems. Metals and materials: Lead frames, bonding wire, heat sinks. Construction: Cleanroom construction, MEP.

Connecting with Projects: Approved project vendor development: Contact project management offices. Industry associations: IESA (India Electronics and Semiconductor Association). Government facilitation: ISM vendor meets.

Quality Requirements: Cleanroom manufacturing experience. Contamination control. Traceability systems. Statistical process control. Industry-specific certifications.

Capability Building: Training programs: IESA, research institutions. Technology partnerships: Global semiconductor equipment companies. Quality upgrades: ISO certifications, industry-specific standards. R&D investment: Product development for semiconductor applications.

Location Strategy: Gujarat: Multiple approved projects (Micron, Tata). Karnataka: Existing electronics ecosystem. Tamil Nadu: Manufacturing expertise. Proximity to approved projects advantageous.

Realistic Assessment: Not everyone can participate directly. Identify where you add value. Start small, prove capability. Build semiconductor track record. Long-term commitment required.

5-Year Strategy: Year 1: Ecosystem understanding, capability assessment. Year 2: Initial customer connections, trial opportunities. Year 3: Regular supply, quality establishment. Year 4: Product/service expansion. Year 5: Semiconductor as significant business segment.',
        '["Map your capabilities against semiconductor ecosystem requirements", "Connect with approved projects and IESA for opportunity identification", "Assess and address quality gaps for semiconductor supply chain participation", "Develop 5-year roadmap for semiconductor ecosystem participation"]'::jsonb,
        '["Semiconductor Ecosystem Opportunity Matrix by capability type", "Approved Project Vendor Development Contact Guide", "Semiconductor Quality Requirements and Gap Assessment", "Semiconductor Business Development Roadmap Template"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Scaling and Success (Days 51-55)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Scaling Manufacturing Success',
        'Scale your manufacturing venture strategically - capacity expansion, multi-location strategy, mergers and acquisitions, building management depth, succession planning, and creating lasting manufacturing enterprises.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_11_id;

    -- Day 51: Capacity Expansion Strategies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        51,
        'Capacity Expansion Strategies',
        'Scaling manufacturing capacity requires careful planning to balance growth with efficiency and quality. Understanding expansion options and their implications enables sustainable growth.

Expansion Triggers: Demand exceeding capacity (>85% utilization). Customer requirements for volume commitment. New customer/market opportunity. Technology upgrade requirement. Competitive positioning.

Expansion Options: Option 1 - Optimize Existing: Eliminate bottlenecks. Improve OEE. Additional shifts. Quick wins with minimal investment.

Option 2 - Expand Current Facility: Building extension. Additional equipment. Higher investment, maintain location benefits.

Option 3 - New Facility: Greenfield site. Fresh layout optimization. Significant investment and time.

Option 4 - Acquisition: Buy existing capacity. Faster market entry. Integration challenges.

Capacity Planning: Demand forecasting: Customer commitments, market analysis. Capacity calculation: Available hours x efficiency x yield. Lead time consideration: Equipment procurement 6-18 months. Phase-wise expansion: Avoid overcapacity.

Equipment Strategy: Make vs buy capacity analysis. New vs used equipment trade-off. Technology upgrade opportunity. Vendor negotiations for volume.

Location for Expansion: Same location: Simpler management, talent continuity. New location: Access new talent pool, risk diversification. Factors: Customer proximity, talent, incentives, supply chain.

Financing Expansion: Internal accruals: Sustainable but limited. Term loan: Standard equipment financing. MSME schemes: Credit guarantee, interest subvention. PLI incentives: Sector-specific support. Equity: For large expansions.

Execution Excellence: Project management rigor. Parallel activities to compress timeline. Quality systems extension. Talent readiness. Customer communication.

Common Expansion Mistakes: Overestimating demand. Underestimating timeline. Neglecting quality during scale-up. Talent shortage at startup. Working capital crunch.',
        '["Analyze current capacity utilization and identify expansion triggers", "Evaluate expansion options: optimize, expand, new facility, or acquire", "Develop capacity expansion plan with phasing and investment requirements", "Plan talent and systems readiness for expanded capacity"]'::jsonb,
        '["Capacity Planning Calculator with demand-supply analysis", "Expansion Options Evaluation Framework", "Equipment Procurement and Installation Timeline Template", "Expansion Project Management Checklist"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 52: Multi-Location Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        52,
        'Multi-Location Manufacturing Strategy',
        'Growing manufacturers eventually operate multiple facilities. Managing multi-location operations requires structured approach to maintain consistency while leveraging location advantages.

Reasons for Multi-Location: Customer proximity: Reduce logistics cost and lead time. Risk diversification: Single location vulnerability. Talent access: Tap different labor markets. Incentive optimization: State-wise incentive arbitrage. Acquisition integration: Growth through M&A.

Organization Structure Options: Centralized: All decisions at headquarters, standardization focus. Decentralized: Location autonomy, local responsiveness. Hybrid: Central strategy, local execution.

Key Functions Management: Production Planning: Central master planning vs local scheduling. Quality: Central standards, local execution, cross-audits. Procurement: Central sourcing, local delivery. HR: Central policies, local hiring and management. Finance: Central treasury, local operations accounting.

Technology Enablement: ERP system: Single instance across locations. Production monitoring: Centralized dashboards. Video conferencing: Regular virtual connects. Document management: Central repository.

Performance Management: Common KPIs across locations. Benchmarking between plants. Best practice sharing mechanisms. Recognition for top performers.

Leadership Development: Location heads with P&L responsibility. Rotation for development. Central training programs. Career paths across locations.

Challenges: Maintaining consistent quality. Communication gaps. Local vs central tension. Talent retention across locations. Different regulatory environments.

Best Practices from Indian Manufacturers: TVS Group: Multiple locations with strong culture. Bharat Forge: Technology centers with production facilities. Dixon: Hub and spoke model. Motherson Sumi: Decentralized with strong processes.',
        '["Define organization structure for multi-location operations", "Establish common processes and systems across locations", "Create performance benchmarking framework across plants", "Develop leadership pipeline for location management"]'::jsonb,
        '["Multi-Location Organization Structure Options Guide", "Cross-Location Process Standardization Framework", "Plant Performance Benchmarking System Design", "Multi-Site Leadership Development Program"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 53: M&A in Manufacturing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        53,
        'Mergers and Acquisitions for Growth',
        'Acquisitions can accelerate growth by adding capacity, capabilities, customers, or markets. Understanding M&A strategy and execution is valuable for both buyers and potential acquisition targets.

M&A Rationale in Manufacturing: Capacity acquisition: Buy vs build time advantage. Capability addition: Technology, certifications, expertise. Customer access: Established relationships, contracts. Geographic expansion: New regions, export markets. Vertical integration: Supply chain control. Consolidation: Scale advantages, competition reduction.

Target Identification: Strategic fit: Product/market alignment. Financial health: Sustainable operations. Synergy potential: Revenue and cost synergies. Cultural compatibility: Management style, values. Valuation reasonability: Affordable within strategy.

Due Diligence Areas: Financial: Audited statements, working capital, debt, projections. Legal: Contracts, litigation, compliance, IP. Operational: Capacity, technology, quality systems, customers. HR: Key people, labor relations, compensation. Environmental: Compliance, liabilities.

Valuation Methods: Asset-based: Net asset value, replacement cost. Earnings-based: P/E multiple, EBITDA multiple. DCF: Discounted cash flow projection. Transaction comparables: Similar deals in sector. Manufacturing typically: 4-8x EBITDA depending on sector and growth.

Deal Structure: Asset purchase: Specific assets, liabilities excluded. Share purchase: Entire company including liabilities. Merger: Combination into single entity. Slump sale: Business undertaking transfer.

Post-Merger Integration: Integration planning: Start before deal close. Quick wins: Early visible improvements. Culture integration: Leadership alignment, communication. Systems integration: ERP, processes, standards. Synergy realization: Track against projections.

Common M&A Failures: Overpaying: Over-optimistic synergies. Integration neglect: Deal fever fades post-close. Culture clash: Management conflict. Customer loss: Transition disruption. Key people departure: Retention failure.',
        '["Define M&A strategy aligned with growth objectives", "Identify potential acquisition targets in your sector", "Build M&A capability: advisors, due diligence process, integration playbook", "Prepare your company for potential acquisition (if exit is objective)"]'::jsonb,
        '["M&A Strategy Development Framework", "Acquisition Target Screening Criteria", "Due Diligence Checklist for Manufacturing Companies", "Post-Merger Integration Playbook"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 54: Building Management Depth
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        54,
        'Building Management Depth',
        'Sustainable manufacturing success requires depth of management beyond founders. Building leadership capability enables scaling, reduces key-person risk, and creates organizational longevity.

Why Management Depth Matters: Founder bandwidth limitation. Scaling requires delegation. Key-person risk mitigation. Succession readiness. Investor/partner confidence.

Leadership Positions: Operations Head: Production, quality, maintenance. Finance Head: Accounting, treasury, compliance. Commercial Head: Sales, marketing, customer management. HR Head: People, culture, administration. Technology/R&D Head: Product development, process improvement.

Hiring Strategy: Promote from within: Deep knowledge, proven loyalty. Hire externally: Fresh perspective, new capabilities. Balance approach: Mix based on role criticality.

Hiring Criteria: Technical competence: Functional expertise. Leadership ability: Team building, decision making. Cultural fit: Values alignment. Growth potential: Can scale with company. Integrity: Non-negotiable.

Compensation Approach: Market competitive base salary. Performance-based variable. Long-term incentive: ESOPs for key positions. Benefits: Healthcare, learning budget.

Development Programs: Functional training: Technical skill building. Leadership development: Management skills, strategy. External exposure: Industry conferences, peer networks. Mentoring: Founder or board mentor assignment.

Delegation Framework: Start with operational decisions. Progress to tactical decisions. Eventually strategic input. Maintain visibility through reviews. Allow mistakes for learning.

Performance Management: Clear objectives and KPIs. Regular reviews (monthly/quarterly). Feedback culture. Consequence management. Recognition for achievement.

Retention Strategy: Career growth visibility. Challenging assignments. Autonomy with accountability. Equity participation. Purpose alignment.',
        '["Assess current management depth against scaling requirements", "Identify critical positions for strengthening", "Develop hiring or promotion plan for key positions", "Create leadership development program for high-potential employees"]'::jsonb,
        '["Management Depth Assessment Framework", "Leadership Position Profile Templates", "ESOP Design Guide for Manufacturing Companies", "Leadership Development Program Design"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 55: Creating Manufacturing Legacy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        55,
        'Creating Lasting Manufacturing Legacy',
        'Building a manufacturing enterprise that outlasts founders requires intentional effort on governance, succession, and institutionalization. The goal is creating an enduring institution that continues to create value.

Indian Manufacturing Dynasties: Tata Group: 150+ years, professional management. Godrej: 125+ years, family and professional leadership. Mahindra: 75+ years, transformed across generations. TVS Group: 100+ years, diversified manufacturing. Lessons: Institutionalization, adaptation, values.

Governance Framework: Board of Directors: Independent directors for perspective. Advisory board: Industry experts for guidance. Family council: If family business, formal governance. Policies: Clear decision rights, conflict resolution.

Succession Planning: Identify potential successors: Internal and external options. Development plans: Prepare candidates over 3-5 years. Testing ground: Increasing responsibility assignments. Decision timeline: Clear succession trigger points. Communication: Stakeholder management.

Institutionalization: Documented processes: Reduce person dependency. Strong systems: ERP, quality systems, controls. Culture codification: Values, behaviors, practices. Knowledge management: Capture institutional knowledge.

Family Business Considerations: Family employment policy: Merit-based criteria. Ownership vs management separation. Dividend policy: Family income expectations. Next generation development: Education, exposure, entry.

Exit Options: Continue building: Multi-generational vision. Professional management: Family as owners only. Strategic sale: To larger player in industry. PE/Growth capital: Partial exit with growth partner. IPO: Public listing for liquidity and growth.

Legacy Beyond Wealth: Employment creation. Skill development. Community impact. Industry contribution. Innovation and technology.

Reflection Questions: What do you want the company to be in 25 years? Who will lead the company after you? What values must endure? How will you balance family and business? What legacy do you want to leave?',
        '["Define your long-term vision for the manufacturing enterprise", "Establish governance framework appropriate for company stage", "Begin succession planning with potential successor identification", "Document core values and practices for institutional memory"]'::jsonb,
        '["Governance Framework Design Guide for Manufacturing Companies", "Succession Planning Process and Timeline", "Family Business Governance Best Practices", "Exit Options Analysis for Manufacturing Entrepreneurs"]'::jsonb,
        90,
        100,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 8-11 created successfully for P24';

END $$;

COMMIT;
