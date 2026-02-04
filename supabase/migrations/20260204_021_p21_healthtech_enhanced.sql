-- THE INDIAN STARTUP - P21: HealthTech & Medical Devices - Enhanced Content
-- Migration: 20260204_021_p21_healthtech_enhanced.sql
-- Purpose: Enhance P21 course content to 500-800 words per lesson with India-specific HealthTech data
-- Course: 55 days, 11 modules covering complete HealthTech regulatory and business framework

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
    -- Get or create P21 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P21',
        'HealthTech & Medical Devices',
        'Complete HealthTech regulatory and business framework - 11 modules covering CDSCO compliance, MDR 2017 requirements, Telemedicine Practice Guidelines, ABDM integration with Ayushman Bharat, clinical trials under CT Rules 2019, pharmacy tech regulations, diagnostic technology, hospital management systems, HealthTech funding landscape, and global health compliance. India''s healthcare market projected at $372 billion by 2027.',
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P21';
    END IF;

    -- Clean existing modules and lessons for P21
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: HealthTech Overview (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'HealthTech Landscape in India',
        'Understand India''s HealthTech ecosystem comprehensively - market size of $372 billion by 2027, 8,000+ startups, regulatory environment with CDSCO, ICMR, NMC oversight, and emerging opportunities across telemedicine, diagnostics, medical devices, and digital health.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_1_id;

    -- Day 1: India HealthTech Market Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        1,
        'India HealthTech Market Overview',
        'India''s healthcare market is undergoing a transformative shift, projected to reach $372 billion by 2027 from approximately $190 billion in 2023, representing a CAGR of 18%. The HealthTech segment specifically is expected to grow from $5.4 billion in 2023 to $21 billion by 2027, driven by increasing smartphone penetration (750 million users), rising health awareness post-COVID, and government digital health initiatives.

The Indian HealthTech ecosystem comprises 8,000+ startups across multiple segments. Telemedicine dominates with platforms like Practo (valued at $1.4 billion), MFine, Tata Health, and Apollo 24/7 collectively serving 50 million+ consultations annually. The diagnostics segment includes Thyrocare, Metropolis, and digital-first players like 1mg (acquired by Tata for $450 million) and PharmEasy (valued at $5.6 billion pre-IPO). Medical devices represent a $15 billion market with domestic manufacturing at 25% and heavy import dependence from US, Germany, and China.

Key market drivers include the massive healthcare access gap - India has 0.7 physicians per 1,000 population versus WHO recommendation of 1:1,000, and 0.5 hospital beds per 1,000 versus 3:1,000 global average. This translates to 600 million Indians lacking access to quality healthcare within 5 km radius. Digital solutions bridge this gap through teleconsultation, remote diagnostics, and AI-powered screening.

Government initiatives are accelerating adoption. Ayushman Bharat Digital Mission (ABDM) launched in 2021 targets 500 million digital health IDs by 2025, with 450 million ABHA IDs already created. The National Digital Health Blueprint provides framework for interoperable health records. E-Sanjeevani government telemedicine platform has facilitated 100 million+ consultations. The Production Linked Incentive (PLI) scheme allocates Rs 3,420 crore for medical device manufacturing to boost domestic production.

Investment landscape shows strong momentum - Indian HealthTech startups raised $2.5 billion in 2021, $1.2 billion in 2022, and approximately $800 million in 2023 despite funding winter. Key investors include Sequoia, Lightspeed, Tiger Global, Temasek, and healthcare-focused funds like HealthQuad and Chiratae. Strategic investors from pharma (Cipla, Sun Pharma) and hospitals (Apollo, Manipal) are increasingly active. Average Series A is $8-15 million, Series B is $25-50 million in the sector.',
        '["Research current India HealthTech market size across segments: telemedicine, diagnostics, medical devices, pharma tech, hospital tech - use NASSCOM, IBEF, and consulting firm reports", "Map the top 30 HealthTech startups by funding raised - analyze their business models, unit economics claims, and growth trajectories", "Identify the healthcare access gaps in your target geography - quantify doctor shortage, hospital bed deficit, and diagnostic availability", "Study 3 successful HealthTech IPOs/exits: Thyrocare (acquired by PharmEasy), Max Healthcare REIT, Narayana Health - extract valuation drivers"]'::jsonb,
        '["India HealthTech Market Sizing Report with segment-wise TAM/SAM/SOM analysis from NASSCOM and FICCI studies", "HealthTech Startup Database with 500+ companies categorized by segment, funding, and business model", "Healthcare Access Gap Analysis Framework by district with government health data sources", "HealthTech Investor Landscape Map with fund thesis, check sizes, and portfolio companies"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: HealthTech Business Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        2,
        'HealthTech Business Models Deep Dive',
        'HealthTech business models in India span B2C, B2B, B2B2C, and hybrid approaches, each with distinct unit economics, regulatory requirements, and scaling dynamics. Understanding these models is essential for choosing the right market entry strategy.

B2C Direct-to-Consumer Models: Telemedicine platforms (Practo, MFine) generate revenue through consultation fees (Rs 200-800 per consult, platform takes 15-25% commission), subscription plans (Rs 500-2,000/month for unlimited consults), and cross-sell of medicines and diagnostics. Customer Acquisition Cost (CAC) ranges Rs 300-800, with Lifetime Value (LTV) of Rs 1,500-4,000 yielding 3-5x LTV:CAC ratio. E-pharmacy (1mg, PharmEasy, Netmeds) operates on gross margins of 15-18% on medicines, with average order value Rs 800-1,200. Chronic disease management drives retention with 4-6 orders per customer annually.

B2B Healthcare Enterprise Models: Hospital Information Systems (HIS) providers like Practo Ray, eHospital, and Insta by Practo charge Rs 50,000-5,00,000 annual licenses depending on bed count. Implementation revenue adds 30-50% of license value. Laboratory Information Management Systems (LIMS) from Agappe, Thyrocare, and specialized providers serve 75,000+ diagnostic labs in India. Pricing ranges from Rs 1 lakh for small labs to Rs 50 lakh+ for large chains. Hospital supply chain platforms (Medikabazaar, mSupply) operate on 8-15% take rates on Rs 80,000 crore annual hospital procurement market.

B2B2C Partnership Models: Insurance integration enables scale through cashless claim networks. Health insurers (Star Health, HDFC Ergo, ICICI Lombard) partner with HealthTech for pre-authorization, claim processing, and wellness programs. Revenue sharing 10-20% of premium or per-member-per-month fees of Rs 20-100. Corporate wellness (Healthifyme, GOQii, Cult.fit) charges Rs 2,000-10,000 per employee annually, with 500+ enterprise clients typical for scaled players. Pharma partnerships for patient support programs (PSPs) generate Rs 500-2,000 per patient enrolled, serving chronic disease management for Big Pharma.

D2C Medical Device Models: Home diagnostic devices (glucometers, BP monitors) operate on razor-blade model - device at cost, consumables at 60-70% gross margin. Connected device models add subscription revenue for data analytics. Emerging categories include pulse oximeters (post-COVID awareness), smart thermometers, and wearable ECG monitors.

Key metrics for HealthTech: Gross margin 40-70% depending on model, Net Revenue Retention should exceed 110% for B2B SaaS, Monthly consultation volume and repeat rate for telemedicine, GMV and take rate for marketplace models, Clinical outcomes for chronic care programs.',
        '["Analyze unit economics of 5 HealthTech business models relevant to your venture - calculate CAC, LTV, payback period, and gross margin using public company data and industry benchmarks", "Design your business model canvas specifically for healthcare - include regulatory compliance as key activity and clinical validation as value proposition element", "Identify the highest-margin opportunities in your chosen segment - compare B2C vs B2B vs B2B2C economics", "Calculate your path to profitability: what scale (users/transactions/enterprise clients) needed for break-even given your cost structure"]'::jsonb,
        '["HealthTech Business Model Canvas Template with healthcare-specific prompts for regulatory, clinical, and partnership considerations", "Unit Economics Calculator for HealthTech with benchmarks from funded startups across telemedicine, diagnostics, devices, and SaaS", "Revenue Model Comparison Matrix showing pros/cons of subscription, transaction, licensing, and hybrid approaches", "Path to Profitability Framework with milestone-based financial projections for different HealthTech models"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Healthcare Regulatory Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        3,
        'Healthcare Regulatory Environment Navigation',
        'India''s healthcare regulatory framework involves multiple agencies with overlapping jurisdictions. Successful HealthTech ventures must navigate this complex environment strategically, understanding which regulations apply to their specific products and services.

Central Drug Standard Control Organisation (CDSCO): Primary regulator for drugs and medical devices under Ministry of Health and Family Welfare. Administers Drugs and Cosmetics Act 1940 and Medical Device Rules 2017. Approves new drugs, clinical trials, medical device registration, and import licenses. CDSCO fee structure: Drug manufacturing license Rs 50,000-3,00,000, Medical device registration Rs 10,000-50,000, Import license Rs 15,000-1,00,000. Timeline: 3-12 months depending on device classification.

Indian Council of Medical Research (ICMR): Apex body for biomedical research. Issues National Ethical Guidelines for Biomedical Research (2017). Approves clinical trials involving Indian subjects. Regulates biobanking and genetic research. Critical for any clinical validation studies for HealthTech products.

National Medical Commission (NMC): Replaced Medical Council of India in 2020. Regulates medical education and practice. Issued Telemedicine Practice Guidelines 2020 enabling digital consultations. Maintains National Medical Register with 1.3 million registered doctors. Any telemedicine platform must ensure consultations by NMC-registered practitioners.

State Drug Controllers: Each state has Drug Controller enforcing central regulations locally. Manufacturing licenses issued at state level. Retail drug licenses for e-pharmacy operations. Coordination required for multi-state operations. Key states: Maharashtra (Mumbai - national coordinator), Karnataka, Tamil Nadu, Gujarat.

Food Safety and Standards Authority of India (FSSAI): Regulates nutraceuticals, functional foods, health supplements. License categories: Central (Rs 7,500, turnover >Rs 20 crore) and State (Rs 2,000-5,000). Registration for small operators (Rs 100). Essential for any HealthTech involving dietary products or supplements.

Bureau of Indian Standards (BIS): Voluntary certification for medical devices (IS 13450, IS 9001). Mandatory certification for certain electronic medical equipment. BIS license fee Rs 1,000-50,000 annually. Quality certification increasingly expected by hospitals and distributors.

Insurance Regulatory and Development Authority (IRDAI): Regulates health insurance products and TPAs. Relevant for HealthTech integrating with insurance: cashless networks, pre-authorization APIs, wellness programs linked to premiums. Guidelines on telemedicine coverage evolving.

Regulatory Strategy Approach: Phase 1 (0-6 months): Identify all applicable regulations, engage regulatory consultants, begin documentation. Phase 2 (6-12 months): Submit applications, conduct required testing, build compliance infrastructure. Phase 3 (Ongoing): Maintain licenses, track regulatory changes, expand approvals for new products.',
        '["Map all regulatory bodies applicable to your HealthTech venture - create matrix showing: regulator, applicable law/rule, license required, fee, timeline, and renewal requirements", "Engage specialized regulatory affairs consultant with healthcare experience - budget Rs 50,000-2,00,000 for initial regulatory strategy development", "Create regulatory compliance roadmap with milestones, dependencies, and resource requirements - include buffer for typical delays", "Study recent regulatory enforcement actions in HealthTech - understand compliance gaps that led to warnings or license cancellations"]'::jsonb,
        '["Healthcare Regulatory Matrix covering CDSCO, ICMR, NMC, State Drug Controllers, FSSAI, BIS, and IRDAI with application procedures", "Regulatory Consultant Directory with specialized firms for medical devices, telemedicine, digital therapeutics, and e-pharmacy", "Regulatory Compliance Roadmap Template with phase-wise milestones and typical timelines", "Regulatory Enforcement Case Studies from CDSCO and state authorities with lessons learned"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: HealthTech Funding Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        4,
        'HealthTech Investment Ecosystem',
        'HealthTech funding in India follows distinct patterns compared to general tech startups, with longer due diligence cycles, emphasis on clinical validation, and regulatory pathway clarity. Understanding investor expectations and sector-specific concerns is crucial for successful fundraising.

HealthTech-Focused Investors: HealthQuad (India''s first dedicated healthcare VC): $150 million AUM, typical check $2-15 million, portfolio includes Healthifyme, MedGenome, Tricog. Investment thesis: scalable healthcare access solutions with clinical outcomes focus. Chiratae Ventures: $1 billion+ AUM, healthcare is major vertical, backed Lenskart, PharmEasy, Tricog, Forus Health. Look for category leaders with defensible technology. Sequoia Capital India: Generalist with strong healthcare portfolio - Practo, 1mg, Pristyn Care. Series A focus $5-15 million, expect clear path to $100 million revenue. Lightspeed India: Backed Innovaccer ($3.2 billion valuation), HealthPlix, PharmEasy. Preference for healthcare data and SaaS. Omidyar Network India: Impact-focused, healthcare access thesis, backed Swasth Alliance, Villgro investees. Patient capital with longer horizons.

Sector-Specific Due Diligence: Clinical Validation: Investors scrutinize clinical evidence more than typical tech DD. For diagnostic devices: sensitivity, specificity, and comparison with gold standard. For digital therapeutics: peer-reviewed outcomes data, RCT results if applicable. Budget 6-12 months for clinical validation studies. Regulatory Pathway: Clarity on CDSCO classification, approval timeline, and post-market compliance. For telemedicine: NMC guideline compliance, RMP verification processes. For medical devices: Class A-D pathway, testing requirements, and CE/FDA if export planned. Reimbursement Strategy: How will payers (insurers, government, patients) cover the cost? Ayushman Bharat PM-JAY empanelment potential. Private insurance inclusion in cashless networks. Out-of-pocket willingness to pay validation.

Strategic Investors: Pharma Corporate Ventures: Cipla Health Ventures, Lupin Ventures, Sun Pharma Advanced Research. Invest for strategic access to digital health capabilities, patient engagement, and data. Check sizes $1-10 million with partnership angle. Hospital Chain Investments: Apollo Health & Lifestyle (invested in Practo, Navia Life Care), Manipal Group, Fortis. Looking for solutions enhancing their patient experience and operational efficiency. Medical Device Multinationals: GE Healthcare, Siemens Healthineers, Philips India run innovation programs. Partnership often precedes investment. Distribution and co-development opportunities.

Grants and Non-Dilutive Funding: BIRAC (Biotechnology Industry Research Assistance Council): BIG Scheme grants up to Rs 50 lakh for proof of concept, SBIRI/BIPP for product development up to Rs 5 crore. DBT Wellcome Trust India Alliance: Clinical and public health research fellowships up to Rs 3 crore. Grand Challenges India: Gates Foundation supported, specific calls for priority health areas. IUSSTF: Indo-US collaboration grants for healthcare technology development.',
        '["Create target list of 25 HealthTech-focused investors matching your stage and sector - research their portfolio, check size, and recent activity", "Develop clinical validation plan: what evidence will investors require, timeline and cost to generate, and interim milestones", "Prepare regulatory due diligence package: pathway assessment, timeline, compliance checklist, and key risk mitigations", "Identify 5 potential strategic investors (pharma, hospitals, device companies) and research their investment/partnership history"]'::jsonb,
        '["HealthTech Investor Database with 100+ investors categorized by stage, check size, sector focus, and portfolio companies", "Clinical Validation Framework for different HealthTech categories with evidence requirements and study design guidance", "Regulatory Due Diligence Checklist that anticipates investor questions with pre-prepared documentation", "Strategic Investor Engagement Playbook with approaches for pharma, hospital chains, and device multinationals"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Building HealthTech Team
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_1_id,
        5,
        'Building Your HealthTech Team',
        'HealthTech ventures require unique talent combining healthcare domain expertise, technology capabilities, and regulatory knowledge. Building the right team is often the difference between success and failure in this complex, regulated sector.

Mandatory Medical Leadership: Chief Medical Officer (CMO): For telemedicine platforms, medical device companies, and digital therapeutics, a qualified medical professional is essential. Requirements: MBBS minimum, MD/specialty preferred for credibility. Responsibilities: Clinical protocol development, medical oversight, KOL relationships, regulatory medical affairs. Compensation: Rs 40-80 lakh annually for experienced CMOs, can offset with equity (1-3%). Regulatory consideration: Telemedicine Practice Guidelines require consultations by Registered Medical Practitioners only.

Regulatory Affairs Function: Head of Regulatory Affairs: Critical hire for medical device and pharma tech companies. Background: Pharmacy/biomedical engineering with 5+ years CDSCO/regulatory experience. Key skills: CDSCO submission preparation, clinical trial coordination, quality management systems, and international regulatory (FDA, CE) knowledge. Compensation: Rs 20-40 lakh for experienced professionals. Alternative: Regulatory consultants for early-stage (Rs 1-3 lakh/month retainer).

Quality Assurance Team: Essential for medical device manufacturing and any ISO 13485 certified operations. QA Manager: Rs 15-25 lakh, responsible for QMS documentation, audit preparation, CAPA management. Lab/Testing Coordinator: For clinical validation studies and device testing coordination.

Technology Team Considerations: Healthcare Data Expertise: Engineers with experience in HL7 FHIR, DICOM, ICD-10 coding, and healthcare interoperability standards. Understanding of ABDM APIs and integration requirements. Security-First Development: HIPAA-equivalent practices even if not legally required in India. Familiarity with healthcare data privacy emerging under DPDP Act. AI/ML for Healthcare: If AI-based, team must understand clinical validation requirements for AI/ML medical devices. CDSCO SaMD guidance and international frameworks (FDA AI/ML action plan).

Clinical Advisory Board: Assemble 3-5 advisors across relevant specialties. Compensation: Rs 50,000-2,00,000 annually plus equity (0.1-0.25% each). Selection criteria: Academic credentials, clinical practice relevance, research publications, and industry connections. Meeting cadence: Quarterly formal meetings, ad-hoc consultations. Role: Protocol review, clinical validation guidance, KOL introductions, credibility for fundraising.

Key Hiring Sources: Healthcare professionals: LinkedIn, DocPlexus, medical college alumni networks. Regulatory affairs: OPPI (pharma association), AIMED (device association), specialized recruiters like ABC Consultants Healthcare. Quality professionals: ISO certification body networks, pharma company alumni. Technology: Standard tech hiring with healthcare experience premium (20-30% salary uplift).

Founder Profile Assessment: Ideal HealthTech founding team combines: Healthcare domain expert (clinician or healthcare administrator), Technology leader (product/engineering background), Business/operations lead (scaling and commercialization). Single founders should prioritize finding complementary co-founders before significant fundraising.',
        '["Define your team structure for next 18 months - identify must-have roles versus nice-to-have, with hiring timeline aligned to regulatory and product milestones", "Recruit clinical advisor board - reach out to 10 potential advisors, aim to close 3-5 with relevant expertise for your specific healthcare vertical", "Assess regulatory affairs needs - decide build vs buy (full-time hire vs consultant) based on regulatory complexity and budget", "Create hiring plan with job descriptions, compensation benchmarks, and sourcing strategy for each key role"]'::jsonb,
        '["HealthTech Org Chart Templates for different stages (pre-seed, seed, Series A) with role definitions and reporting structures", "Healthcare Professional Compensation Benchmarks for CMO, medical advisors, regulatory affairs, and quality roles", "Clinical Advisory Board Agreement Template with compensation, confidentiality, and commitment terms", "HealthTech Job Description Library with 20+ role templates covering clinical, regulatory, technology, and operations"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: CDSCO Compliance (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CDSCO Compliance Framework',
        'Master the Central Drugs Standard Control Organisation regulatory framework - understanding Drugs and Cosmetics Act 1940, Medical Device Rules 2017, CDSCO fee structures, SUGAM portal navigation, and building compliance infrastructure for sustainable operations.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_2_id;

    -- Day 6: CDSCO Structure and Authority
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        6,
        'CDSCO Structure and Regulatory Authority',
        'The Central Drugs Standard Control Organisation (CDSCO) is India''s national regulatory authority for pharmaceuticals and medical devices, operating under the Ministry of Health and Family Welfare. Understanding CDSCO''s structure, jurisdiction, and decision-making processes is fundamental for any HealthTech venture involving regulated products.

Organizational Structure: CDSCO headquarters is located in New Delhi with the Drugs Controller General of India (DCGI) as the apex authority. Current DCGI (as of 2024) oversees a team of approximately 350 technical officers. Six zonal offices handle regional coordination: North (New Delhi), South (Chennai), East (Kolkata), West (Mumbai), North-West (Ahmedabad), and North-East (Guwahati). Sub-zonal and port offices handle import clearances at major entry points.

Regulatory Jurisdiction: Drugs: New drug approvals, clinical trial permissions, import registrations, and post-market surveillance under Drugs and Cosmetics Act 1940. Medical Devices: Since MDR 2017, all medical devices brought under regulatory ambit with risk-based classification. Cosmetics: Registration and import licensing under D&C Act. Vaccines and Biologics: Specialized approval pathways with additional scrutiny. Combination Products: Drug-device combinations require coordinated evaluation.

Key Divisions for HealthTech: New Drugs Division: Handles new drug applications, clinical trial approvals, and bioequivalence studies. Timeline: 6-18 months for new drugs, 3-6 months for generics. Medical Device Division: Processes device registrations, manufacturing licenses, and import licenses. Post MDR 2017 transition, handling 40,000+ device registrations. Cosmetics Division: Health supplements, nutraceuticals when regulated as cosmetics. Import Registration: Dedicated team for import license processing at headquarters.

Decision-Making Process: Technical Committees: Subject Expert Committees (SECs) review applications and provide recommendations to DCGI. SEC meetings held monthly for different product categories. DCGI approval is final regulatory decision. Review Committees: Applicants can request review of rejected applications. Review Committee provides second opinion, DCGI decides on recommendations.

Interaction Channels: SUGAM Portal: Online submission system for all applications (sugam.cdsco.gov.in). Mandatory for most submissions since 2019. Pre-submission meetings: Available for complex applications, request through zonal office. Recommended for novel devices, combination products, and clinical trials. Industry liaison: CDSCO conducts stakeholder consultations on regulatory changes. Industry associations (AIMED, OPPI, IPA) facilitate engagement.

CDSCO Fee Structure Overview: Application Processing Fees: Manufacturing license (medical device): Rs 10,000-50,000 depending on class. Import license: Rs 15,000-1,00,000. Clinical trial approval: Rs 50,000-3,00,000. Retention Fees: Annual fees to maintain licenses, typically 25-50% of initial application fee. Testing Fees: Separate charges for CDSCO-empaneled labs, device testing Rs 50,000-5,00,000 depending on complexity.',
        '["Study CDSCO organizational structure - identify which division and zonal office handles your product category", "Create account on SUGAM portal (sugam.cdsco.gov.in) and familiarize with application submission interface", "Identify relevant Subject Expert Committee for your product - research meeting schedules and typical review timelines", "Connect with CDSCO zonal office for your region - understand local procedures and officer contacts for query resolution"]'::jsonb,
        '["CDSCO Organizational Chart with division responsibilities, zonal office jurisdictions, and officer directory", "SUGAM Portal User Guide with step-by-step screenshots for account creation and application submission", "SEC Meeting Schedule and Application Calendar showing submission deadlines for committee reviews", "CDSCO Fee Calculator covering application, retention, and testing fees for different product categories"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: Drugs and Cosmetics Act Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        7,
        'Drugs and Cosmetics Act 1940 Framework',
        'The Drugs and Cosmetics Act 1940 (D&C Act) and Drugs and Cosmetics Rules 1945 form the foundational legal framework for pharmaceutical and device regulation in India. Recent amendments have expanded scope to cover medical devices, cosmetics, and certain digital health products.

Act Structure and Key Provisions: Chapter I: Definitions including drugs, cosmetics, and now medical devices. Chapter II: The Drugs Technical Advisory Board (DTAB) composition and functions. Chapter III: Import regulations and prohibitions. Chapter IV: Manufacture, sale, and distribution regulations. Chapter IVA: Provisions for medical devices (added 2020). Chapter V: Clinical trials and new drugs. Chapter VI: Penalties and offenses.

Key Definitions Relevant to HealthTech: Drug (Section 3b): Includes medicines for diagnosis, treatment, mitigation, or prevention of disease. Expanded to include devices performing similar functions through software or hardware. Medical Device (Section 3(b)(iv)): Any instrument, apparatus, implant, software intended for diagnosis, prevention, monitoring, treatment, or investigation of disease. Software as Medical Device (SaMD) explicitly included. Cosmetic (Section 3(aaa)): Articles for cleansing, beautifying, promoting attractiveness. Nutraceuticals and health supplements may fall under cosmetics or foods depending on claims.

Schedule Classifications: Schedule H: Prescription drugs - sale only against valid prescription by registered medical practitioner. Includes most antibiotics, hormones, and controlled substances. Schedule H1: Drugs requiring additional record-keeping - includes certain antibiotics, anti-TB drugs. Prescription required, records maintained for 3 years. Schedule X: Narcotics and psychotropics - stringent controls, specialized licenses required. Schedule K: Drugs exempted from certain provisions for use by government institutions.

Penalties Under D&C Act: Manufacturing without license: Up to 3 years imprisonment and/or Rs 5,000 fine. Adulterated drugs: Up to 3 years and Rs 5,000 (not spurious), life imprisonment for spurious causing death. Misbranded drugs: Up to 3 years and Rs 5,000. Import violations: Up to 3 years and Rs 5,000 for first offense. Corporate liability: Directors and officers can be personally liable for company violations.

Recent Amendments Affecting HealthTech: Medical Devices (Amendment) Rules 2020: Brought all medical devices under regulatory control in phases. Class A (low risk) through Class D (high risk) classification introduced. Timeline: Class A-B mandatory from January 2022, Class C-D from April 2020. New Drugs and Clinical Trials Rules 2019: Streamlined clinical trial approval process. Reduced timelines: 30 working days for global trial applications. Defined compensation framework for clinical trial injuries. E-Pharmacy Draft Rules: Multiple versions circulated since 2018, final rules awaited. Permits online sale of drugs with prescription verification. State licensing for e-pharmacy operations.',
        '["Read key sections of Drugs and Cosmetics Act 1940 - focus on definitions (Chapter I), manufacturing provisions (Chapter IV), and penalties (Chapter VI)", "Determine which drug schedules apply to products on your platform - create compliance protocol for prescription verification if handling Schedule H/H1 drugs", "Study recent amendments: Medical Devices Rules 2020, New Drugs and Clinical Trials Rules 2019, and e-pharmacy draft rules for your specific relevance", "Consult with pharma regulatory expert to understand liability implications for your business model under D&C Act"]'::jsonb,
        '["Drugs and Cosmetics Act 1940 Annotated Summary with key sections highlighted and plain English explanations", "Drug Schedule Quick Reference Guide covering Schedule H, H1, X, and K with common examples", "D&C Act Penalty Matrix mapping violations to consequences for individuals and companies", "Recent Amendment Compilation covering 2019-2024 changes affecting HealthTech businesses"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: CDSCO Licensing Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        8,
        'CDSCO Licensing Procedures',
        'Obtaining CDSCO licenses requires systematic preparation, documentation, and engagement with the regulatory system. Different license types serve different purposes - manufacturing, import, wholesale, and retail - with distinct requirements and timelines.

Manufacturing License (Form 25/28): Applicable for: Companies manufacturing drugs or medical devices in India. Issuing authority: State Drug Controller (with CDSCO approval for specified categories). Key requirements: Qualified person (B.Pharm for drugs, qualified person per MDR for devices), premises meeting Good Manufacturing Practice (GMP/Schedule M) requirements, equipment and quality control capability, standard operating procedures. Timeline: 60-90 days for state license, additional 90-180 days if CDSCO approval required. Fees: Application Rs 10,000-50,000, annual retention Rs 5,000-25,000.

Import License (Form 10/10A): Applicable for: Importing finished drugs or medical devices for sale in India. Issuing authority: CDSCO headquarters (New Delhi). Requirements: Registration certificate from country of origin, GMP certificate of manufacturing site, free sale certificate, product dossier with specifications and test methods, authorized Indian agent appointment. Timeline: 90-180 days for drugs, 60-120 days for medical devices. Fees: Rs 15,000 per product (drugs), Rs 3,000-50,000 per device depending on class.

Wholesale License (Form 20B/21B): Applicable for: Distribution and wholesale of drugs and devices. Issuing authority: State Drug Controller. Requirements: Qualified person (diploma in pharmacy), premises requirements (storage conditions, security), record-keeping capability. Timeline: 30-60 days. Fees: Rs 1,000-5,000 (varies by state).

Retail License (Form 20/21): Applicable for: Retail sale of drugs to consumers. Issuing authority: State Drug Controller. Requirements: Registered pharmacist for Schedule H drugs, premises at ground floor with specified dimensions, storage conditions for drug categories. Timeline: 30-60 days. Fees: Rs 500-2,000 (varies by state). E-Pharmacy consideration: Draft rules propose central licensing for e-pharmacy operations.

Application Process Through SUGAM: Step 1: Create SUGAM account, complete organization profile. Step 2: Select application type, fill online form with company and product details. Step 3: Upload supporting documents (digitally signed). Step 4: Pay application fee online. Step 5: Application assigned to reviewing officer. Step 6: Query response if deficiencies noted (typically 15-day response window). Step 7: Inspection scheduled if applicable. Step 8: License issued digitally through SUGAM.

Common Reasons for Application Rejection: Incomplete documentation (35% of rejections) - missing test reports, GMP certificates, or authorization letters. Technical deficiencies (25%) - inadequate stability data, specification issues, or quality control gaps. Premises non-compliance (20%) - GMP deviations found during inspection. Personnel qualification issues (10%) - qualified person credentials not meeting requirements. Administrative issues (10%) - fee payment problems, signature mismatches.',
        '["Determine which CDSCO licenses you need for your business model - manufacturing, import, wholesale, or retail (potentially multiple)", "Prepare documentation package for primary license application - compile all required certificates, authorizations, and technical dossiers", "Engage qualified person meeting CDSCO requirements - for drugs (B.Pharm+), for devices (per MDR 2017 qualified person definition)", "Conduct pre-inspection readiness assessment of your premises against GMP/Schedule M requirements"]'::jsonb,
        '["License Type Decision Tree helping determine which CDSCO licenses apply to different business models", "SUGAM Application Walkthrough with screenshots for manufacturing, import, and retail license applications", "Documentation Checklist by License Type with sample formats for required certificates and declarations", "GMP Inspection Readiness Guide covering Schedule M requirements and common deficiency observations"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: CDSCO Fees and Timelines
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        9,
        'CDSCO Fee Structure and Timeline Management',
        'Understanding CDSCO fee structures and managing regulatory timelines effectively can significantly impact HealthTech venture planning and cash flow. Fees vary substantially based on product type, license category, and company size, while timelines can be optimized through strategic application management.

Medical Device Registration Fees (MDR 2017): Class A devices (low risk): Registration fee Rs 4,500 per device family, annual retention Rs 1,000. Class B devices (low-moderate risk): Registration fee Rs 8,000, annual retention Rs 2,000. Class C devices (moderate-high risk): Registration fee Rs 15,000, annual retention Rs 3,000. Class D devices (high risk): Registration fee Rs 25,000, annual retention Rs 5,000. Import registration: Additional Rs 3,000-10,000 depending on class. Manufacturing license: Rs 10,000-50,000 initial, Rs 5,000-25,000 annual retention.

Drug-Related Fees: New drug application (NDA): Rs 1,00,000-3,00,000 depending on category. Clinical trial approval: Rs 50,000 per trial (reduced from Rs 1,00,000 for Indian companies). Import registration: Rs 15,000-50,000 per product. Manufacturing license: Rs 10,000-1,00,000 depending on schedule and state. Bioequivalence study: Rs 30,000 application plus testing costs.

Testing and Certification Fees: CDSCO-empaneled lab testing: Rs 10,000-5,00,000 depending on device complexity and test requirements. Stability studies: Rs 50,000-2,00,000 for accelerated stability. Biocompatibility testing: Rs 2,00,000-10,00,000 depending on tests required. EMC/EMI testing: Rs 50,000-2,00,000 for electronic medical devices. Clinical performance testing: Rs 5,00,000-50,00,000 depending on study design.

Timeline Expectations by Application Type: Medical Device Registration: Class A: 30-60 days, Class B: 60-90 days, Class C: 90-120 days, Class D: 120-180 days. Import License: New products: 90-180 days, renewals: 30-60 days. Manufacturing License: State license: 60-90 days, CDSCO approval: additional 90-180 days. Clinical Trial Approval: Global trials: 30 working days, India-specific: 60-90 days.

Timeline Optimization Strategies: Pre-submission consultation: Request meeting with CDSCO for complex applications - clarifies requirements upfront, reduces query cycles. Complete documentation: Ensure all required documents are complete before submission - incomplete applications face 30-60 day delays per query cycle. Parallel processing: Submit testing samples while preparing application - testing often on critical path. State coordination: For manufacturing, coordinate state and central applications - avoid sequential delays. Query response speed: Respond to CDSCO queries within 7 days - maintain application priority.

Budget Planning for Regulatory: Startup Phase (Year 1): Medical device company: Rs 15-40 lakh (registrations, testing, licenses). Telemedicine platform: Rs 5-15 lakh (compliance setup, legal review). E-pharmacy: Rs 10-25 lakh (licenses across states, technology compliance). Ongoing (Annual): Retention fees: Rs 2-10 lakh. Compliance maintenance: Rs 5-15 lakh (updates, audits, renewals). Contingency buffer: 20-30% for unexpected requirements.',
        '["Create detailed regulatory budget for 3 years - itemize application fees, testing costs, retention fees, and compliance maintenance", "Map regulatory timeline with product development - identify critical path items where regulatory delays impact launch", "Develop query response protocol - assign responsibility, track deadlines, and maintain response quality", "Build relationship with CDSCO officers handling your applications - professional engagement speeds resolution"]'::jsonb,
        '["CDSCO Fee Calculator Excel covering all license types, device classes, and drug categories with current fee schedules", "Regulatory Timeline Gantt Template with typical durations and dependency mapping for medical device registration", "Query Management System Requirements for tracking CDSCO correspondence and response deadlines", "Regulatory Budget Template with 3-year projection including contingency provisions"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Building CDSCO Compliance Infrastructure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_2_id,
        10,
        'Building Sustainable Compliance Infrastructure',
        'Sustainable CDSCO compliance requires building organizational infrastructure that maintains regulatory requirements continuously, not just during license applications. This infrastructure becomes increasingly important as product portfolio and operational complexity grow.

Quality Management System (QMS): ISO 13485 Foundation: International standard for medical device QMS, increasingly expected by CDSCO. Certification cost: Rs 3-8 lakh initially, Rs 1-2 lakh annual surveillance. Key requirements: Document control, design controls, supplier management, CAPA, management review. Implementation timeline: 6-12 months for certification readiness. Schedule M Compliance: Indian GMP requirements for drug manufacturing. Covers premises, equipment, personnel, documentation, production controls. CDSCO inspects against Schedule M during manufacturing license approval.

Document Control System: Regulatory submissions: Maintain complete submission history with all correspondence. Dossier management: Technical documentation for each registered product, updated for changes. License management: Track all licenses, expiry dates, and renewal requirements. Change control: Document and assess changes for regulatory impact before implementation.

Pharmacovigilance System: Post-Market Surveillance: Mandatory adverse event reporting within 15 days (serious) or periodic (non-serious). Medical device vigilance: Report incidents, near-misses, and field safety corrective actions. Designated responsible person: Qualified Person for Pharmacovigilance (QPPV) for drug companies, Safety Officer for devices. System requirements: Adverse event database, trending analysis, regulatory reporting capability.

Regulatory Intelligence Function: Track regulatory changes: CDSCO notifications, gazette publications, and draft rules. Industry association membership: AIMED (devices), OPPI (pharma), IPA (pharma) provide regulatory updates. Competitor monitoring: Track competitor approvals, field safety notices, and regulatory actions. International harmonization: Monitor ICH, IMDRF guidelines influencing Indian regulations.

Compliance Training Program: New employee onboarding: Regulatory overview, SOPs, and role-specific compliance requirements. Annual refresher: Updates on regulatory changes, lessons from audits, and case studies. Specialized training: GMP, ISO 13485 internal auditor, pharmacovigilance, clinical trials. Documentation: Maintain training records as CDSCO may request during inspections.

Audit Readiness: Internal audits: Quarterly self-assessments against regulatory requirements. Mock inspections: Annual simulation of CDSCO inspection with external consultant. CAPA tracking: Systematic closure of audit findings with root cause analysis. Inspection preparation: Checklist for document assembly, personnel briefing, and facility readiness.

Technology Solutions for Compliance: Regulatory Information Management System (RIMS): Software for submission tracking, document management, and compliance calendaring. Options: Veeva Vault, MasterControl, or customized solutions. QMS Software: Electronic document control, training management, CAPA tracking. Cost: Rs 5-25 lakh annually depending on scale. Pharmacovigilance Database: Adverse event capture, signal detection, and regulatory reporting. Options: Oracle Argus, customized solutions, or outsourced services.',
        '["Implement basic QMS aligned with ISO 13485 requirements - start with document control, CAPA, and management review processes", "Set up pharmacovigilance/post-market surveillance system - define adverse event reporting procedures and responsible personnel", "Subscribe to regulatory intelligence sources - CDSCO website alerts, industry association newsletters, and regulatory news services", "Develop compliance training curriculum - create onboarding module and annual refresher schedule"]'::jsonb,
        '["ISO 13485 Implementation Roadmap with phase-wise activities and resource requirements", "Document Control SOP Template with procedures for creation, review, approval, and archival", "Pharmacovigilance System Setup Guide covering adverse event forms, escalation procedures, and reporting templates", "Compliance Technology Evaluation Matrix comparing RIMS and QMS software options for different scales"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 1-2 created successfully for P21';

END $$;

COMMIT;
