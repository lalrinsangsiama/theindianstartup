-- THE INDIAN STARTUP - P28: Biotech & Life Sciences - Enhanced Content
-- Migration: 20260204_028_p28_biotech_enhanced.sql
-- Purpose: Enhance P28 course content to 500-800 words per lesson with India-specific data

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
    -- Get or create P28 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P28',
        'Biotech & Life Sciences',
        'Complete guide to biotech and life sciences business in India - CDSCO regulations, DCGI approvals, clinical trials under New Drugs and Clinical Trials Rules 2019, GMP manufacturing under Schedule M, BIRAC funding programs (BIG, SBIRI, AcE Fund), Medical Device Rules 2017, and research commercialization. Master the Rs 80,000 crore Indian biotech industry with practical, India-specific guidance.',
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

    -- Get product ID if already exists
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P28';
    END IF;

    -- Clean existing modules and lessons for P28
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Biotech Startup Foundation (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Biotech Startup Foundation',
        'Understand the Indian biotech landscape worth Rs 80,000 crore, business models, research translation pathways, and strategic planning for success in this high-growth deep-tech sector.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Indian Biotech Industry Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Indian Biotech Industry Overview',
        'India''s biotechnology industry is valued at Rs 80,000 crore (approximately $10 billion) and growing at 14% CAGR, making it one of the top 12 biotech destinations globally. The sector employs over 1 million people directly and contributes significantly to India''s pharma and healthcare ecosystem. India is the world''s largest producer of recombinant Hepatitis B vaccine, supplies 60% of global DPT vaccines, and manufactures 40% of generic medicines consumed in the USA.

The biotech sector in India is divided into key sub-sectors with varying maturity and opportunities. Biopharma is the largest segment at Rs 48,000 crore (60% of total), covering vaccines, therapeutics, biosimilars, and recombinant products. Major players include Biocon (Rs 9,000 crore revenue), Serum Institute of India (world''s largest vaccine manufacturer), Bharat Biotech, and Dr. Reddy''s biosimilar division. Bio-agriculture contributes Rs 8,000 crore (10%) covering Bt cotton, bio-fertilizers, and bio-pesticides. Bio-industrial sector at Rs 6,400 crore (8%) includes enzymes, biofuels, and bio-plastics. Bio-services at Rs 9,600 crore (12%) covers contract research (CROs), contract manufacturing (CMOs), and clinical trials. Bio-IT at Rs 4,800 crore (6%) includes bioinformatics, drug discovery platforms, and AI-driven diagnostics. Medical devices at Rs 3,200 crore (4%) encompasses IVD, implants, and diagnostic equipment.

Government initiatives are transforming the sector. The National Biotechnology Development Strategy 2021-25 targets $150 billion industry by 2025. BIRAC (Biotechnology Industry Research Assistance Council) has funded 1,500+ startups with Rs 2,500 crore since inception. The Production Linked Incentive (PLI) scheme for pharma provides Rs 15,000 crore for API and medical devices. Startup India provides tax benefits, easier compliance, and funding access. The Atal Innovation Mission supports biotech incubators across 50+ institutions.

Key success factors in Indian biotech include: strong scientific foundation (PhDs, research publications, patents), regulatory expertise (CDSCO, DCGI navigation), long development timelines (5-15 years typical), high capital requirements (Rs 50 crore to Rs 500 crore for drug development), and strategic partnerships (pharma collaborations, licensing deals). The industry faces challenges including 12-15 year drug development cycles, 90%+ failure rate in clinical development, Rs 500-2000 crore cost for new drug approval, and talent shortage in regulatory and clinical operations.

The opportunity window is now. With increasing government support, growing domestic market, cost advantage for clinical trials (60-70% lower than US), strong scientific talent pool, and COVID-19 accelerating healthcare investment, India''s biotech sector is poised for explosive growth. The sector attracted Rs 8,000 crore in private investment in 2023-24 alone.',
        '["Analyze market size and growth trends for your target biotech segment using DBT, BIRAC, and industry reports", "Identify top 10 players in your chosen sub-sector - study their business models, funding history, and competitive advantages", "Map the value chain from research to commercialization for your focus area - identify gaps and opportunities", "Calculate addressable market size using TAM-SAM-SOM framework with India-specific data"]'::jsonb,
        '["Industry Overview Template with DBT and BIRAC data sources", "Market Size Calculator with biotech-specific TAM-SAM-SOM methodology", "Value Chain Mapping Tool for life sciences commercialization", "Competitor Analysis Matrix with funding and pipeline benchmarks"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Biotech Business Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Biotech Business Model Selection',
        'Selecting the right business model is crucial for biotech success in India. Each model has distinct capital requirements, risk profiles, timeline to revenue, and scaling potential. Understanding these trade-offs before committing resources can save years and crores of rupees. Biotech uniquely offers multiple business models that can be combined or transitioned between.

Product Development Company model focuses on developing proprietary drugs, biologics, or devices through to approval. Capital requirement ranges from Rs 50 crore for medical devices to Rs 500 crore+ for novel biologics. Timeline to revenue is 5-15 years depending on product type. Risk is highest but reward potential is maximum with Rs 1,000 crore+ annual revenue possible. Success factors include strong IP portfolio, deep pockets or staged financing, regulatory expertise, and commercial partnerships. Examples include Biocon (biosimilars), Bharat Biotech (vaccines), and Strand Life Sciences (diagnostics). This model suits well-funded founders with deep domain expertise and patient capital.

Platform/Technology Licensing model develops enabling technologies licensed to multiple partners. Capital requirement of Rs 10-50 crore for platform development. Revenue starts in 2-5 years through licensing fees and royalties. Lower risk with diversified customer base. Success factors include defensible IP, broad applicability, and strong business development. Examples include Syngene''s integrated drug discovery platform and Jubilant Biosys computational platforms. Suitable for founders with strong scientific credentials and partnership capabilities.

Contract Research Organization (CRO) model provides research services to pharma and biotech companies. Capital requirement of Rs 5-25 crore for lab setup. Revenue begins within 6-12 months of operations. Lower risk with fee-for-service model. Success factors include scientific excellence, regulatory compliance, cost efficiency, and client relationships. Examples include Lambda Therapeutic Research, Veeda Clinical Research, and Lotus Labs. Growing opportunity with India conducting 2,000+ clinical trials annually.

Contract Manufacturing Organization (CMO/CDMO) model manufactures products for other companies. Capital requirement of Rs 25-100 crore for GMP facility. Revenue in 12-24 months after facility qualification. Medium risk with recurring revenue potential. Success factors include quality systems, regulatory approvals (WHO-GMP, US FDA), and operational excellence. Examples include Piramal Pharma Solutions, Kemwell Biopharma, and Aragen Life Sciences.

Diagnostics/Medical Devices model develops diagnostic tests or medical devices. Capital requirement of Rs 5-50 crore depending on complexity. Faster path to market (2-5 years) under Medical Device Rules 2017. Medium risk with regulatory pathway clearer than drugs. Examples include Molbio Diagnostics (molecular diagnostics), Trivitron Healthcare, and Transasia Bio-Medicals.

Hybrid Model combines multiple approaches. Many successful Indian biotechs operate hybrid models. Biocon combines proprietary products with services (Syngene). Dr. Reddy''s combines generics, biosimilars, and proprietary research. Consider starting with services for cash flow while building proprietary pipeline.',
        '["Evaluate each business model against your capital availability, expertise, risk appetite, and timeline expectations", "Create detailed financial projections for top 2 business models including development costs, timelines, and revenue scenarios", "Identify key success factors and risks for your chosen model - create mitigation strategies", "Define your unique value proposition and competitive moat that will differentiate you in the chosen model"]'::jsonb,
        '["Business Model Canvas Template adapted for biotech with Indian examples", "Financial Projection Model with stage-gated development costs and probability adjustments", "Risk Assessment Framework with biotech-specific failure rate data", "Value Proposition Designer with scientific differentiation tools"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Research Translation and IP Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Research Translation and IP Strategy',
        'Translating academic research into commercial products is the foundation of biotech entrepreneurship. India produces over 200,000 research papers annually in life sciences, yet commercialization rates remain low (under 5% of patents get licensed). Understanding the translation pathway and building a robust IP strategy from day one is essential for biotech success.

Research translation stages in biotech follow a structured pathway. Discovery/Basic Research (TRL 1-2) establishes proof of concept in laboratory settings at universities or research institutions. Applied Research (TRL 3-4) demonstrates feasibility and initial efficacy, typically where startups begin engagement. Development (TRL 5-6) involves prototype development, process optimization, and preclinical studies. Validation (TRL 7-8) includes clinical trials, regulatory submissions, and manufacturing scale-up. Commercialization (TRL 9) covers market launch, sales, and post-market surveillance. Each stage requires different capabilities, funding, and partnerships. Most biotech startups license technology at TRL 3-4 and develop through TRL 9.

Sourcing technology from Indian institutions involves key players including IITs, IISc, AIIMS, NCBS, CCMB, CSIR labs, and regional universities. Technology Transfer Offices (TTOs) manage IP licensing, with IIT Delhi, IIT Bombay, and IISc having mature TTOs. Typical licensing terms include upfront fee of Rs 10-50 lakh, royalties of 2-5% of net sales, milestone payments tied to development stages, and exclusive rights for defined fields and territories. BIRAC-PACE (Promoting Academic Research Conversion to Enterprise) specifically supports academic-startup collaborations with grants up to Rs 50 lakh.

IP strategy fundamentals for biotech require layered protection. Patent protection for novel molecules, formulations, processes, and devices provides 20-year protection term in India. Budget Rs 2-5 lakh per patent for Indian filing and Rs 15-25 lakh for international (PCT) filing. File early as biotech has 12-month grace period from publication. Trade secrets protect manufacturing processes, cell lines, and know-how through confidentiality agreements and restricted access. Regulatory exclusivity includes data exclusivity provisions, orphan drug designation, and pediatric extensions. Trademark protection covers brand names and product identifiers.

Patent filing strategy considerations include provisional filing to establish priority date (Rs 1,600 government fee), complete specification within 12 months, international filing via PCT route within 12 months of priority, national phase entry in key markets (US, EU, Japan, China) within 30-31 months. Consider freedom-to-operate (FTO) analysis early to avoid infringement of existing patents.

Indian Patent Act 1970 key provisions include Section 3(d) barring patents for new forms of known substances without enhanced efficacy, Section 3(j) barring patents for plants and animals, compulsory licensing provisions (Section 84), and pre-grant and post-grant opposition mechanisms. Understanding these provisions is crucial for patent strategy in India.

Technology licensing from foreign sources involves due diligence on IP strength and FTO, negotiating territory rights (India, Asia, global), understanding regulatory pathway in India, and currency and payment terms (RBI compliance for outward remittance).',
        '["Identify potential technology sources aligned with your business model from academic and research institutions", "Develop IP strategy covering patents, trade secrets, and regulatory exclusivity for your target products", "Conduct preliminary freedom-to-operate analysis for your technology area", "Create technology licensing term sheet template for negotiations with research institutions"]'::jsonb,
        '["Technology Scouting Template with TRL assessment criteria", "IP Strategy Framework covering patents, trade secrets, and data exclusivity", "Patent Filing Timeline with cost estimates for India and international", "Licensing Term Sheet Template with biotech-specific provisions"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Biotech Funding Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Biotech Funding Landscape in India',
        'Biotech ventures require significant capital over extended timelines, making funding strategy critical for success. Indian biotech has attracted Rs 15,000 crore in private investment over the past five years, with COVID-19 catalyzing investor interest. Understanding the funding ecosystem, stage-appropriate sources, and investor expectations enables strategic fundraising.

Government funding sources provide non-dilutive capital crucial for early stages. BIRAC (Biotechnology Industry Research Assistance Council) is the primary government funder. BIG (Biotechnology Ignition Grant) provides Rs 50 lakh for proof-of-concept, with 400+ grants awarded to date. SBIRI (Small Business Innovation Research Initiative) provides up to Rs 1 crore for product development. BIPP (Biotechnology Industry Partnership Programme) provides up to Rs 15 crore for late-stage development. AcE Fund (Accelerating Entrepreneurs) provides Rs 1 crore equity funding. SPARSH (Social Innovation Programme for Products Affordable and Relevant to Societal Health) focuses on affordable healthcare solutions. Success rate for BIRAC programs is 15-20%, with application process taking 3-6 months.

Department of Science and Technology (DST) schemes include NIDHI-PRAYAS for prototype development at Rs 10 lakh, TBI support through incubators, and SERB grants for fundamental research. ICMR funds health research with specific calls for clinical studies. State biotech policies in Karnataka, Telangana, Maharashtra, and Gujarat offer additional grants and incentives.

Private funding ecosystem for biotech includes Angel Investors and Networks such as Indian Angel Network with healthcare-focused angels, LetsVenture syndicates, and typical round size of Rs 50 lakh to Rs 2 crore for pre-seed to seed stages. Venture Capital firms active in Indian biotech include early-stage firms like Kalaari Capital, Accel Partners, and Blume Ventures, and healthcare-focused funds like OrbiMed, Sequoia India (healthcare), Healthquad, and Chiratae Ventures. Typical Series A rounds range from Rs 25-75 crore with Series B at Rs 100-250 crore.

Corporate venture and strategic investors include pharma company investment arms such as Johnson & Johnson Innovation, Merck Global Health Innovation Fund, and Cipla Innovation Council. Strategic partnerships often include milestone payments providing non-dilutive funding. Licensing deals with upfront payments of Rs 10-100 crore are common in biotech.

Biotech-specific funding considerations include staged financing matching development milestones, risk-adjusted valuations reflecting clinical trial failure rates, longer holding periods (7-12 years versus 5-7 for tech), and syndicated rounds spreading risk among multiple investors. Valuation methodologies include DCF with probability-adjusted NPV, comparables based on similar deals, milestone-based valuations, and sum-of-parts for multi-product pipelines.

Building investor-ready biotech company requires robust IP portfolio with freedom-to-operate, clear regulatory pathway, experienced management team, capital-efficient development plan, and defined milestones and go/no-go criteria. Investor expectations include 10x+ return potential for VC, clear exit pathway (IPO, M&A, licensing), and strong scientific advisory board.',
        '["Map relevant government funding programs to your development stage and apply to appropriate BIRAC scheme", "Identify 20 potential private investors with relevant biotech investment thesis and portfolio", "Create investor pitch deck with biotech-specific elements including IP, regulatory, and clinical strategy", "Develop staged funding plan aligned with development milestones and capital requirements"]'::jsonb,
        '["Government Funding Guide with BIRAC, DST, and state scheme details", "Investor Database with biotech-focused VCs and angels in India", "Pitch Deck Template optimized for biotech investor presentations", "Funding Roadmap Template with stage-wise capital requirements"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Team Building and Infrastructure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Team Building and Infrastructure Planning',
        'Biotech success depends critically on assembling the right team and establishing appropriate infrastructure. Unlike software startups, biotech requires specialized scientific talent, expensive laboratory equipment, and regulatory expertise from early stages. Strategic decisions on team composition and infrastructure significantly impact capital efficiency and development timelines.

Core team composition for biotech startups requires balance across disciplines. Scientific leadership needs a CSO/Scientific Founder with deep domain expertise (PhD plus industry experience preferred), research scientists for day-to-day R&D execution, and quality assurance from early stages for regulatory compliance. Business leadership requires a CEO with industry knowledge and fundraising ability, business development for partnerships and licensing, and regulatory affairs expertise (CDSCO experience critical). Operations needs project management for complex development programs, supply chain for specialized materials, and finance/admin for grant management and compliance.

Hiring biotech talent in India presents both opportunities and challenges. Talent pools include IITs, IISc, NCBS, CCMB, and NIPER for advanced degrees, pharma/biotech companies for experienced professionals, and returning diaspora with US/EU industry experience. Compensation benchmarks show research scientists with PhD at Rs 12-25 lakh per annum, regulatory affairs managers at Rs 15-30 lakh, quality heads at Rs 20-40 lakh, and CSO/VP level at Rs 50 lakh to Rs 1.5 crore plus equity. Equity compensation is typically 0.5-2% for early employees, with ESOPs under 10% total for team below CXO level.

Building Scientific Advisory Board (SAB) is crucial for biotech. Composition should include domain experts (leading researchers in your field), clinical advisors (practicing physicians for clinical strategy), regulatory experts (former CDSCO/FDA officials), and industry veterans (successful biotech executives). Compensation is typically Rs 2-5 lakh annually plus equity (0.1-0.5%). SAB adds credibility with investors and provides strategic guidance.

Infrastructure options and considerations include incubators and shared facilities. Bio-incubators such as C-CAMP Bangalore, ABLE Hyderabad, Venture Center Pune, and IKP Hyderabad offer lab space at Rs 500-1,500 per sq ft per month with shared equipment access, mentorship, and networking. Shared facilities from CSIR labs, university partnerships, and DBT-supported facilities enable asset-light early development. This is the recommended approach for the first 2-3 years.

Own laboratory setup costs vary by type. Basic biology lab requires Rs 50 lakh to Rs 1 crore covering biosafety cabinet, incubators, centrifuges, PCR, and basic analytics. Advanced R&D lab requires Rs 2-5 crore with HPLC, mass spectrometry, flow cytometry, and specialized equipment. Cell culture facility requires Rs 1-2 crore for sterile facility with controlled environment. Animal facility (if required) costs Rs 2-5 crore plus CPCSEA registration.

GMP manufacturing facility considerations include initial strategy of outsourcing to CDMOs for clinical supplies, building GMP facility only when commercial scale justified, and costs of Rs 25-100 crore for basic GMP facility. Location factors include proximity to talent (Bangalore, Hyderabad, Pune preferred), biotech cluster benefits, and state incentive policies.

Infrastructure planning principles involve starting lean with incubator/shared facilities, owning only what provides competitive advantage, outsourcing non-core capabilities, and scaling infrastructure with development stage.',
        '["Define organizational structure and key roles needed for first 2 years of operations", "Create hiring plan with timelines, compensation ranges, and sourcing strategies for critical roles", "Identify and shortlist Scientific Advisory Board candidates with relevant expertise", "Evaluate incubator and infrastructure options and create facility plan aligned with development needs"]'::jsonb,
        '["Organizational Design Template for biotech startups by stage", "Compensation Benchmarking Guide for biotech roles in India", "SAB Engagement Framework with terms and expectations", "Infrastructure Planning Checklist with build-buy-partner analysis"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Regulatory Landscape (Days 6-10)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Regulatory Landscape',
        'Navigate India''s biotech regulatory framework including CDSCO, DCGI, DBT, RCGM, GEAC, and state drug controllers. Understand approval pathways for drugs, biologics, and medical devices.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 6: CDSCO and Regulatory Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'CDSCO and Indian Drug Regulatory Framework',
        'The Central Drugs Standard Control Organisation (CDSCO) under the Ministry of Health and Family Welfare is India''s apex drug regulatory authority. Understanding CDSCO structure, functions, and approval processes is fundamental for any biotech venture developing drugs, biologics, or medical devices. The regulatory landscape has evolved significantly with New Drugs and Clinical Trials Rules 2019 and Medical Device Rules 2017.

CDSCO organizational structure has the Drugs Controller General of India (DCGI) as the head, with responsibilities including new drug approvals, clinical trial permissions, import licenses, and quality oversight. Six zonal offices handle regional licensing and inspections located in Mumbai, Kolkata, Chennai, Ahmedabad, Ghaziabad, and Hyderabad. Sub-zonal and port offices manage import clearances and routine inspections. CDSCO has approximately 400 technical staff with ongoing capacity expansion.

Key regulatory acts and rules include the Drugs and Cosmetics Act 1940 as the parent legislation, Drugs and Cosmetics Rules 1945 (amended regularly), New Drugs and Clinical Trials Rules 2019 (major update replacing Schedule Y), Medical Device Rules 2017 (separate pathway for devices), and Drugs (Prices Control) Order 2013 (NPPA jurisdiction).

New Drugs and Clinical Trials Rules 2019 is the landmark regulation modernizing clinical trial framework. Key provisions include defined timelines (90 days for clinical trial approval, 120 days for new drug approval), academic clinical trials with simplified process, compensation framework for trial-related injuries, ethics committee registration and oversight, and global clinical trial data acceptance (with conditions). The rules categorize new drugs and provide specific pathways for each.

Drug categories under CDSCO include New Chemical Entities (NCEs) requiring full development package (Phase I-III), New Biological Entities (NBEs) requiring biosimilar or novel biologic pathway, Similar Biologics (Biosimilars) under separate 2016 guidelines, Fixed Dose Combinations (FDCs) requiring rationality justification, and Phytopharmaceuticals under 2015 guidelines for standardized plant-based drugs.

CDSCO approval timelines (as per Rules) include clinical trial permission at 90 working days (often 4-6 months in practice), new drug approval at 120 working days, import registration at 90-120 working days, and manufacturing license at 60-90 working days (state authority with CDSCO NOC). These timelines assume complete applications with no queries.

Regulatory submission process involves pre-submission meeting (optional but recommended for novel products), application filing through SUGAM portal (online system), technical review by CDSCO division and expert committees, site inspection if required, and approval/rejection communication. Fees vary by category from Rs 50,000 for clinical trials to Rs 15 lakh for new drug applications.

Working with CDSCO best practices include engaging regulatory consultant with CDSCO experience, preparing comprehensive dossiers in CTD format, proactively addressing anticipated queries, building relationships with relevant divisions, and tracking application status through SUGAM portal.',
        '["Map CDSCO organizational structure and identify relevant divisions for your product type", "Study New Drugs and Clinical Trials Rules 2019 provisions applicable to your development program", "Create regulatory strategy document outlining approval pathway and timelines", "Register on SUGAM portal and familiarize with online submission process"]'::jsonb,
        '["CDSCO Organization Chart with division responsibilities", "New Drugs and Clinical Trials Rules 2019 summary with key provisions", "Regulatory Pathway Decision Tree for different product types", "SUGAM Portal User Guide with submission checklist"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: DBT and Biosafety Regulations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'DBT, Biosafety, and Genetic Engineering Regulations',
        'The Department of Biotechnology (DBT) under the Ministry of Science and Technology oversees biotechnology policy, research funding, and biosafety regulations in India. For companies working with genetically modified organisms (GMOs), recombinant DNA technology, or conducting certain categories of research, DBT approvals are mandatory in addition to CDSCO requirements.

DBT regulatory committees structure involves multiple bodies for different functions. RCGM (Review Committee on Genetic Manipulation) under DBT reviews contained research involving GMOs, approves rDNA research proposals, and monitors institutional biosafety. IBSC (Institutional Biosafety Committee) is mandatory for every organization working with GMOs, provides first-level review and monitoring, and reports to RCGM. GEAC (Genetic Engineering Appraisal Committee) under Ministry of Environment handles environmental release of GMOs, large-scale production approvals, and field trials for GM crops. SBCC (State Biotechnology Coordination Committee) and DLC (District Level Committee) handle state-level monitoring and enforcement.

Biosafety regulatory framework is governed by Rules for Manufacture, Use, Import, Export and Storage of Hazardous Microorganisms/Genetically Engineered Organisms or Cells 1989 under Environment Protection Act. Biosafety levels are defined as BSL-1 for low-risk agents requiring basic practices, BSL-2 for moderate-risk agents requiring limited access and PPE, BSL-3 for serious disease agents requiring controlled access and specialized ventilation, and BSL-4 for life-threatening agents with maximum containment.

IBSC establishment and functioning is mandatory for any organization working with GMOs or hazardous microorganisms. Composition requires a chairperson (senior scientist), biosafety officer, medical officer, scientist nominees, and DBT nominee. Functions include reviewing research proposals before RCGM submission, monitoring ongoing research, ensuring compliance with guidelines, and incident reporting to RCGM. Meeting frequency should be quarterly at minimum. Registration with DBT required, with annual renewal of IBSC composition.

RCGM approval process covers research involving recombinant DNA molecules, GMOs in contained conditions, cell lines with viral vectors, and gene therapy research. Application includes IBSC recommendation, project details with risk assessment, containment measures, waste disposal plans, and researcher qualifications. Timeline is 60-90 days for standard applications. Fee is Rs 10,000 for research proposals.

GEAC approval for environmental release handles GM crops for field trials and commercial cultivation, large-scale production of GMO-based products, and environmental applications of GMOs. This is a more stringent process with public consultation requirements. Timeline is 6-24 months depending on product type. Recent policy emphasizes case-by-case evaluation.

Recombinant DNA Safety Guidelines 2017 (updated) cover laboratory practice standards, containment requirements, transport of GMOs, and emergency response procedures. All biotech companies using rDNA technology must comply with these guidelines regardless of CDSCO requirements.

Import of GMOs and LMOs (Living Modified Organisms) requires RCGM/GEAC approval for research or commercial purposes, customs clearance with biosafety certification, and compliance with Cartagena Protocol on Biosafety.',
        '["Assess whether your research/products require DBT/RCGM/GEAC approvals in addition to CDSCO", "Establish Institutional Biosafety Committee with proper composition and register with DBT", "Develop biosafety manual and SOPs appropriate to your biosafety level requirements", "Map dual regulatory pathway if working with GMOs requiring both DBT and CDSCO approvals"]'::jsonb,
        '["DBT Regulatory Committee Flowchart with jurisdiction clarity", "IBSC Establishment Guide with composition and registration process", "Biosafety Manual Template with level-specific requirements", "RCGM Application Checklist with documentation requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: Drug Approval Categories and Pathways
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Drug Approval Categories and Pathways',
        'India provides multiple regulatory pathways for drug approval based on product type and development status globally. Understanding which pathway applies to your product and what data requirements exist is crucial for efficient development planning. The New Drugs and Clinical Trials Rules 2019 clarified many of these pathways.

New Drug Categories under Indian regulations define what requires approval as a new drug. A new drug includes drugs not previously used in India, drugs approved in India but proposed for new indications, drugs approved but with new dosage forms or routes, Fixed Dose Combinations not previously approved, and biological products including biosimilars. Importantly, a drug remains classified as "new" for 4 years after first approval in India.

New Chemical Entity (NCE) Pathway is the full development requirement. Preclinical data includes pharmacology, toxicology (acute, sub-chronic, chronic, reproductive, genotoxicity), and pharmacokinetics. Clinical trials require Phase I (20-50 subjects) for safety and PK, Phase II (100-300 subjects) for efficacy and dose-finding, and Phase III (300-3000 subjects) for confirmatory efficacy. Data requirements include full CMC (Chemistry, Manufacturing, Controls) dossier, clinical study reports, and integrated summary of safety and efficacy. Timeline is typically 8-12 years from discovery. Cost is Rs 500-2000 crore for full development.

Abbreviated Pathways for drugs approved abroad exist for drugs already approved in specified countries (US, UK, EU, Japan, Australia). Clinical trial requirements may be reduced, with Phase III bridging study typically sufficient. Requirements depend on ethnic sensitivity and disease prevalence differences. Significant savings in time (2-4 years) and cost (Rs 50-200 crore) are possible.

Similar Biologics (Biosimilar) Pathway under 2016 Guidelines covers biological products similar to approved reference biologics. Requirements include comprehensive quality comparability (analytical similarity), non-clinical comparability (limited studies), clinical comparability (PK/PD and often comparative efficacy trial), and immunogenicity assessment. Reference product must be approved in India or specified countries. Timeline is 6-8 years typically, with cost of Rs 200-500 crore for development.

Orphan Drug Framework in India has no formal orphan drug designation yet, but rare disease policy announced in 2021. Some provisions include expedited review for rare diseases and import of orphan drugs approved abroad. Formal orphan drug pathway expected to evolve.

Accelerated Approval Provisions under the new rules include breakthrough therapy designation equivalent (fast-track for serious conditions), conditional approval based on surrogate endpoints, and rolling submission for priority products. These provisions are relatively new with limited precedents.

Fixed Dose Combination (FDC) Pathway requires rationality justification (why combination needed), bioequivalence studies, and clinical safety/efficacy data for novel combinations. The rationality requirement has led to many FDC rejections. Ensure scientific justification is robust.

Pathway selection considerations include product novelty and available global data, target indication and unmet need, competitive landscape and time-to-market pressure, and capital availability and risk tolerance.',
        '["Determine appropriate regulatory pathway for your lead product based on its characteristics", "Identify reference products and comparators for abbreviated or biosimilar pathways", "Create development plan with data requirements for chosen pathway", "Estimate development timeline and costs for regulatory pathway"]'::jsonb,
        '["Drug Category Decision Matrix for pathway selection", "Development Requirements Checklist by approval pathway", "Biosimilar Development Guide under 2016 Guidelines", "Timeline and Cost Estimator for different pathways"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: Import and Export Regulations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Import and Export Regulations for Biotech',
        'Biotech companies frequently need to import raw materials, equipment, and reference standards while exporting products to global markets. Understanding import-export regulations specific to drugs, biologicals, and research materials is essential for operational efficiency and compliance. Multiple agencies govern these activities with specific requirements.

Import regulations for drugs and biologicals involve CDSCO import licensing under the Drugs and Cosmetics Act. Categories of imports include drugs for sale (Form 10 license), drugs for examination/test/analysis (Form 11), drugs for personal use (Form 12B), and new drugs for clinical trial (Form 12). Form 10 (Import License for Sale) requirements include registration of foreign manufacturer with CDSCO, appointment of authorized agent in India, product-specific approval, and WHO-GMP or equivalent certification of manufacturing site. Timeline is 90-120 days, with fees of Rs 50,000 per product.

Import for R&D and clinical trials requires CDSCO permission for clinical trial supplies, customs exemption for research materials possible under specific notifications, and IBSC/RCGM approval for GMO imports. Small quantities for research may have simplified procedures.

Import of controlled substances under NDPS Act requires authorization from Narcotics Commissioner for scheduled substances, separate license for psychotropic substances, and strict record-keeping and reporting requirements.

Customs procedures for biotech imports involve IEC (Import Export Code) from DGFT as mandatory first requirement, customs classification (HS codes for pharmaceutical products under Chapter 30), applicable duties (basic customs duty, IGST, health cess), cold chain requirements for temperature-sensitive biologicals, and port health officer clearance for biological materials.

Export regulations and opportunities position India as a significant pharma/biotech exporter with Rs 2 lakh crore annual pharma exports. CDSCO export registration includes Form 8 for drug export registration (site-specific), no pre-market approval for exports (unlike domestic sale), and Certificate of Pharmaceutical Product (CoPP) for regulated markets. WHO Prequalification for vaccines and essential medicines provides access to UN procurement and GAVI purchases, with Serum Institute and Bharat Biotech examples of prequalified manufacturers.

US FDA registration requires drug establishment registration annually, drug listing for all marketed products, and prior notice for FDA inspections. EU registration requires Certificate of GMP Compliance, Marketing Authorization through EMA or national agencies, and Qualified Person requirements.

Export incentives and schemes include RoDTEP (Remission of Duties and Taxes on Exported Products) providing 0.5-2% of FOB value for pharma products, SEZ and EOU benefits providing duty-free imports and tax benefits, PLI Scheme for pharmaceutical exports, and EPCG (Export Promotion Capital Goods) for duty-free equipment import against export obligation.

Transfer of technology across borders requires RBI approval for technology payments above thresholds, FEMA compliance for royalty and fee payments, withholding tax considerations, and registration of technology agreements (though no longer mandatory).

Compliance best practices include maintaining updated IEC and registrations, working with experienced customs broker for biological materials, ensuring cold chain integrity documentation, and keeping regulatory certificates current (CoPP, WHO-GMP, FDA registration).',
        '["Obtain IEC (Import Export Code) and understand applicable HS codes for your products", "Map import requirements for key raw materials and equipment needed for operations", "Identify export market requirements and plan registrations accordingly", "Create import-export compliance checklist with documentation requirements"]'::jsonb,
        '["Import License Application Guide for drugs and biologicals", "Export Market Registration Requirements by country", "Customs Procedures Checklist for biotech materials", "Export Incentive Calculator with scheme eligibility assessment"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: State Drug Licenses and Manufacturing Permits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'State Drug Licenses and Manufacturing Permits',
        'While CDSCO handles new drug approvals and import licensing, state drug regulatory authorities issue manufacturing and sales licenses. For biotech companies planning to manufacture in India, understanding state licensing requirements and the interplay between central and state authorities is essential. The process involves multiple approvals before commercial manufacturing can begin.

State Drug Regulatory Structure includes the State Drugs Controller as head of state drug regulatory authority, with Drug Inspectors handling field inspections and enforcement. Key states for biotech manufacturing include Maharashtra (Mumbai FDA being the largest), Gujarat, Karnataka, Telangana, Himachal Pradesh, and Tamil Nadu. Each state may have slightly different procedures despite common regulatory framework.

Manufacturing License Categories are defined under the Drugs and Cosmetics Rules. Form 25 covers manufacturing of drugs other than those specified in Schedules C, C1 and X. Form 25-A covers drugs specified in Schedule C and C1 (biological products, sera, vaccines). Form 28 covers manufacturing of drugs specified in Schedule X (narcotics). Form 25-B is specifically for large volume parenterals. Validity is typically 5 years with renewal required before expiry. Fees range from Rs 6,000 to Rs 25,000 depending on category and state.

Manufacturing license application requirements include premises details (site plan, building layout, room-wise function), equipment list with specifications, personnel details (technical staff qualifications), product list with formulation details, Master Formula Records, SOPs for manufacturing and quality control, stability data for products, and CDSCO NOC for new drugs and Schedule C/C1 products. Critical personnel requirements include Approved Technical Staff with B.Pharm minimum, in certain cases M.Pharm or PhD, and defined responsibilities for production and QC.

GMP Inspection and Compliance requires Schedule M compliance as mandatory for all drug manufacturing. Key Schedule M requirements cover premises (design, construction, maintenance), equipment (qualification, calibration), production (documentation, in-process controls), quality control (laboratory, testing), and documentation (batch records, SOPs, validation). Common inspection findings include documentation gaps, equipment calibration issues, environmental monitoring deficiencies, and personnel training records. Schedule M-II specifically covers additional requirements for biological products including cell bank characterization, viral clearance validation, cold chain requirements, and specific testing requirements.

WHO-GMP Certification is voluntary but increasingly important for export markets. It is issued by CDSCO upon satisfactory inspection, required for WHO prequalification, provides international credibility, and involves additional inspection fee of Rs 1 lakh.

Timeline for manufacturing license obtainment typically takes 3-6 months from application to license. Stage 1 (1-2 months) involves document submission and scrutiny. Stage 2 (1-2 months) covers premises inspection by drug inspector. Stage 3 (1-2 months) addresses additional queries and compliance. Stage 4 is license issuance upon satisfactory compliance.

Contract Manufacturing Considerations require Form 29 Loan License for manufacturing at third-party facility, both parties need appropriate licenses, and quality agreement is mandatory. This is a common approach for startups before building own facility.',
        '["Identify appropriate manufacturing license category for your products", "Assess GMP compliance requirements and gap analysis for planned facility", "Prepare manufacturing license application dossier with all required documentation", "Plan inspection readiness with Schedule M compliance checklist"]'::jsonb,
        '["State Drug License Application Guide by category", "Schedule M Compliance Checklist with common inspection findings", "Manufacturing Facility Design Guide meeting GMP requirements", "Contract Manufacturing Agreement Template with quality provisions"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Intellectual Property in Biotech (Days 11-15)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Intellectual Property in Biotech',
        'Master biotech IP strategy including patents for biologics, small molecules, and devices, trade secret protection for manufacturing processes, and technology licensing agreements.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 11: Biotech Patent Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        11,
        'Biotech Patent Fundamentals in India',
        'Patents are the cornerstone of biotech competitive advantage, providing 20 years of market exclusivity for novel inventions. Indian patent law has specific provisions affecting biotech, making India-specific patent strategy essential. With Rs 80,000 crore market at stake, robust patent protection is critical for attracting investment and achieving commercial success.

Indian Patents Act 1970 and biotech-specific provisions create a unique landscape. Section 3(c) excludes mere discovery of scientific principle from patentability, impacting patents on natural products. Section 3(d) bars patents on new forms of known substances unless enhanced efficacy is demonstrated - this significantly impacts incremental pharmaceutical innovation. Section 3(i) excludes methods of treatment from patentability (process claims must be for manufacturing, not treatment). Section 3(j) excludes plants, animals, seeds, and essentially biological processes. These provisions make Indian biotech patents more challenging to obtain than in US/EU.

Patentable subject matter in biotech includes novel chemical compounds and their pharmaceutical compositions, recombinant proteins and antibodies (with some limitations), manufacturing processes for biologicals, novel formulations and delivery systems, diagnostic methods (with limitations), and medical devices and their components. Not patentable in India are gene sequences in natural form, isolated natural products without modification, treatment methods, plants and animals per se, and traditional knowledge-based inventions.

Patent filing strategy for biotech involves provisional application filing to establish priority date (Rs 1,600 for startups under SIPP). Complete specification must be filed within 12 months with claims, description, and sequence listings where applicable. International filing via PCT route should happen within 12 months of priority date. National phase entry in India and other countries within 30-31 months. Examination request must be filed within 48 months (or faster through expedited examination). Publication occurs at 18 months from priority, with opposition possible.

Patent prosecution and examination at Indian Patent Office involves Form 18 request for examination. Average examination time is 3-5 years (being reduced under modernization efforts). First Examination Report (FER) typically includes objections based on novelty, inventive step, and Section 3 provisions. Response deadline is 12 months from FER (extendable by 3 months). Hearing before Controller if issues remain unresolved. Grant upon satisfactory examination.

Patent opposition mechanisms include pre-grant opposition under Section 25(1), filed after publication but before grant, with any person able to file with no fee. Post-grant opposition under Section 25(2) must be filed within 12 months of grant, with only interested persons able to file and fee of Rs 5,400. Common grounds include prior art, lack of inventive step, Section 3 exclusions, and insufficient disclosure.

Cost of patent protection in India ranges from Rs 50,000-2,00,000 per patent for Indian filing including attorney fees. International PCT filing costs Rs 2-3 lakh plus national phase costs. Maintenance fees are annual (called annuity) starting Year 3. Budget Rs 15-25 lakh per patent family over 20-year life. SIPP (Startups Intellectual Property Protection) provides 80% fee reduction for recognized startups plus expedited examination.',
        '["Assess patentability of your key innovations under Indian Patent Act provisions", "Develop patent filing timeline aligned with publication and development milestones", "Identify prior art and conduct preliminary patentability search", "Apply for startup recognition under DPIIT for SIPP benefits"]'::jsonb,
        '["Indian Patent Act Biotech Provisions Summary with case examples", "Patent Filing Timeline Template with milestone triggers", "Prior Art Search Guide for biotech inventions", "SIPP Application Guide with eligibility criteria"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 12: Biologic and Antibody Patents
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        12,
        'Patents for Biologics and Antibodies',
        'Biologics and antibodies represent one of the most complex areas of patent law, with multiple layers of protection possible and unique challenges in claim drafting. India''s biosimilar industry worth Rs 20,000 crore makes understanding biologic patents crucial for both innovators and biosimilar developers. The patent landscape determines market dynamics and development strategies.

Biologic patent types and claim strategies create layered protection. Composition of matter claims protect the molecule itself (protein sequence, antibody structure) and provide broadest protection. Process claims protect manufacturing methods including cell culture, purification, and formulation. Formulation claims protect specific compositions, excipients, and stability-enhancing elements. Use/method claims protect specific therapeutic applications (limited in India to manufacturing use). Device claims protect delivery systems and combination products.

Antibody-specific patent considerations require understanding that antibodies can be claimed by sequence (heavy and light chain), CDR (Complementarity Determining Region) sequences for specificity, epitope binding characteristics, functional properties (binding affinity, neutralization), and production methods. Patent thickets are common around major antibody targets with multiple overlapping patents. Freedom-to-operate analysis is critical before development investment.

Indian Patent Office approach to biologics has evolved with Sequence Listings required in prescribed format (ST.25 or ST.26), specific disclosure requirements for biological material deposits (if not reproducible from description), section 3(j) challenges for claims perceived as covering natural proteins, and increasing sophistication in biotech examination.

Biosimilar patent considerations for market entry require analyzing innovator patent portfolio (often 50-100 patents per biologic). Key analyses include identifying granted patents in India versus pending applications, claim scope interpretation under Indian law, potential invalidity arguments (prior art, Section 3(d)), and design-around opportunities for process and formulation. Patent term and data exclusivity should be checked, with no formal data exclusivity in India for biologics. Paragraph IV type certification is not required in India unlike US.

Building biologic patent portfolio should include filing composition claims early based on sequence, layering with process claims as manufacturing develops, formulation claims based on stability studies, use claims limited to manufacturing processes, and continuation applications for additional discoveries. International considerations include PCT filing for global coverage, priority country selection based on market size, and coordinating prosecution across jurisdictions.

Patent licensing and biosimilar market dynamics show innovators often licensing rather than litigating in India. Settlement and license agreements are common pre-launch. Consider in-licensing for market access versus developing own portfolio. The Indian biosimilar market provides faster market entry without patent challenges in many cases.

Patent portfolio management for biologics requires regular portfolio review and pruning, maintenance fee management (can be significant for large portfolios), freedom-to-operate updates as portfolio develops, and competitive intelligence on third-party filings.',
        '["Map patent landscape for your target biologic or antibody using patent databases", "Develop claim drafting strategy for maximum protection under Indian law", "Conduct freedom-to-operate analysis for biosimilar development targets", "Create patent portfolio development roadmap aligned with product development"]'::jsonb,
        '["Biologic Patent Landscape Analysis Template", "Antibody Claim Drafting Guide with Indian examples", "Freedom-to-Operate Analysis Framework for biosimilars", "Patent Portfolio Planning Tool with milestone triggers"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 13: Trade Secrets and Data Protection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Trade Secrets and Data Protection in Biotech',
        'Not all biotech IP should be patented. Trade secrets provide indefinite protection for information that cannot be easily reverse-engineered, making them ideal for certain manufacturing processes, cell lines, and know-how. India does not have specific trade secret legislation, but protection is available through contracts and common law principles.

Trade secrets versus patents decision framework helps determine optimal protection. Choose patents when the invention is easily reverse-engineered, when you need to prevent others from independent development, when you need to license the technology, and when 20 years protection is sufficient. Choose trade secrets when the secret can be maintained (not easily discoverable), when the information would be difficult to protect as a patent, when you want indefinite protection, and when the value is in know-how rather than the product itself.

Biotech trade secret categories include cell lines and production strains (expression levels, stability characteristics), fermentation and manufacturing process parameters, purification and formulation know-how, quality control methods and specifications, supplier relationships and raw material sources, and clinical development strategies.

Trade secret protection mechanisms in India rely on Contract Law for primary protection through NDAs, employment agreements, and service agreements. Breach of confidence is recognized under common law principles. The Information Technology Act 2000 covers electronic information protection. Competition law may apply in certain contexts. No registration system exists since protection is through maintaining secrecy.

Implementing trade secret protection requires identification and classification by creating an inventory of trade secrets with confidentiality levels and access requirements. Physical security measures include restricted access areas, visitor logs, and secure storage. Digital security encompasses access controls, encryption, monitoring systems, and audit trails. Contractual protection involves NDAs for external parties, employment agreement confidentiality clauses, and post-employment restrictions.

Employee management for trade secrets requires clear confidentiality obligations in employment contracts, identified scope of confidential information, training on confidentiality obligations, exit interviews with reminders, and post-employment non-compete provisions (enforceability varies by state). Non-compete provisions should be reasonable in scope and duration (courts may not enforce overly broad restrictions).

Regulatory data protection considerations apply because clinical trial data submitted to CDSCO may have some protection. India does not have formal data exclusivity period for pharmaceutical data. Third parties cannot access dossiers but may rely on regulatory approval. Data submitted to CDSCO should be treated with appropriate confidentiality expectations.

Trade secret enforcement involves civil remedies through injunctions, damages, and account of profits. Criminal remedies may apply under IT Act for electronic theft. Practical challenges include proving misappropriation, maintaining secrecy even during litigation, and cross-border enforcement. Documentation is key with timestamped records of trade secret creation and protection measures.

Balancing transparency and secrecy in biotech is important because scientific publication is valued but may compromise secrecy. Consider defensive publications for non-core innovations, filing patents for publishable inventions, and maintaining trade secret protection for manufacturing details.',
        '["Conduct trade secret audit to identify and classify confidential information", "Develop trade secret protection policy with physical and digital security measures", "Review and update employee confidentiality agreements and exit procedures", "Create NDA templates for different relationship types (suppliers, collaborators, investors)"]'::jsonb,
        '["Trade Secret Identification Worksheet with classification criteria", "Trade Secret Protection Policy Template for biotech", "NDA Templates for various stakeholder relationships", "Employee Confidentiality Agreement with biotech provisions"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 14: Technology Licensing Agreements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'Technology Licensing Agreements',
        'Technology licensing is fundamental to biotech business models, enabling access to innovations without full acquisition and monetizing internal R&D. Indian biotech companies engage in both in-licensing (acquiring technology) and out-licensing (monetizing technology). Understanding licensing structures and negotiation strategies is essential for maximizing value.

Types of biotech licensing arrangements include Exclusive License granting sole rights in defined territory/field (highest value, Rs 50 crore+ upfront possible for promising assets), Non-exclusive License allowing multiple licensees in same market (lower value per license but diversified revenue), and Co-exclusive License granting limited exclusivity shared with licensor and/or limited licensees. Sublicense rights allow the licensee to further license to others, adding flexibility and value.

Key licensing agreement terms include Scope Definition specifying licensed IP (patents, know-how, trademarks), field of use (therapeutic area, indication), territory (India, Asia, global), and duration (patent term, fixed period, perpetual for know-how). Financial Terms include upfront payment (Rs 10 lakh to Rs 100 crore depending on asset stage and potential), milestone payments (development, regulatory, commercial), royalties (2-15% of net sales, varying by product type), and minimum royalties or payments (ensuring licensor minimum return).

Development and commercialization obligations specify who conducts development, timeline and milestone requirements, diligence obligations (use commercially reasonable efforts), and reporting requirements. IP provisions cover ownership of improvements, prosecution and maintenance responsibilities, infringement handling, and representations and warranties on IP.

Licensing valuation methods for biotech include Risk-adjusted NPV using DCF with probability of success adjustments (common: Phase I 50%, Phase II 30%, Phase III 60%, approval 90%), Comparable Transactions using recent deals for similar assets/stages, and Rule of Thumb guidelines such as 25% rule for profit sharing and stage-based multiples of development cost. Negotiation leverage depends on asset uniqueness, competitive landscape, and relative negotiating positions.

License agreement structure and key clauses include Definitions (precisely defining licensed IP, products, territory), Grant of Rights (scope, exclusivity, sublicensing), Financial Terms (all payment obligations clearly specified), Development and Commercialization (obligations, timelines, reporting), Intellectual Property (ownership, prosecution, enforcement), Representations and Warranties (IP ownership, non-infringement), Indemnification (allocation of liability), Term and Termination (duration, termination triggers, consequences), and Governing Law and Dispute Resolution (typically arbitration for cross-border deals).

India-specific licensing considerations include RBI compliance for outbound royalty payments with annual cap of 5% of domestic sales or 8% of exports for automatic approval, Technology transfer agreements no longer requiring mandatory registration, withholding tax of 10% on royalties (may be reduced under tax treaties), and Transfer pricing requirements for related party transactions.

Academic institution licensing follows different dynamics, with TTOs having standard terms, often requiring equity in addition to royalties, sponsored research arrangements, and milestone-heavy structures with lower upfront payments.',
        '["Identify technology licensing needs (in-licensing or out-licensing opportunities)", "Develop term sheet template for licensing negotiations with key business terms", "Understand valuation methodologies and benchmark comparable transactions", "Create licensing negotiation strategy with priorities and walk-away points"]'::jsonb,
        '["Technology Licensing Term Sheet Template with key provisions", "Licensing Valuation Calculator with risk-adjusted NPV methodology", "Comparable Transactions Database for biotech licensing deals", "Licensing Negotiation Checklist with strategy framework"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 15: Freedom to Operate and IP Due Diligence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Freedom to Operate and IP Due Diligence',
        'Freedom to operate (FTO) analysis and IP due diligence are critical risk management tools for biotech. FTO ensures your products do not infringe third-party patents, while IP due diligence verifies the value and risks of IP assets during transactions. Investors, partners, and acquirers require robust FTO and due diligence before major commitments.

Freedom to Operate Analysis Framework involves Search Strategy that is comprehensive and covers relevant patent databases (Indian Patent Office, USPTO, EPO, WIPO), keyword and classification searches, assignee searches for key competitors, and citation analysis for patent families. Claim Analysis examines granted patent claims in relevant jurisdictions, identifies potentially infringed claims, and notes that pending applications may also pose future risk.

FTO opinion structure includes Scope Definition specifying product/process being analyzed, jurisdictions covered, and date of analysis. Search Methodology covers databases, search terms, and date range. Identified Patents lists potentially relevant patents organized by risk level. Claim Analysis provides detailed analysis of relevant claims. Risk Assessment provides overall infringement risk classification. Recommendations suggest design-arounds, licensing, or invalidity challenges.

Risk categories and responses classify High Risk as probable infringement of valid, enforceable patent requiring design-around, license negotiation, or invalidity challenge before proceeding. Medium Risk means possible infringement or validity questions exist requiring further analysis, monitoring patent status, and developing contingency plans. Low Risk means unlikely infringement with clear non-infringement arguments available, requiring documentation of analysis and periodic review.

IP Due Diligence for biotech transactions covers patents to examine ownership chain (assignments recorded), prosecution history (amendments, admissions), maintenance fee status, and pending oppositions or litigation. For trade secrets, evaluate documentation and protection measures, employee agreements, and third-party access history. Regulatory exclusivity considerations include data exclusivity status (limited in India), orphan drug designations, and pediatric exclusivity. Freedom to operate requires an FTO opinion for key products and identification of required licenses.

Due diligence scope varies by transaction type. For acquisitions, comprehensive review of all IP assets, liabilities, and agreements is needed. For investment, focus on key value-driving IP and FTO for lead products. For licensing, verify licensor''s right to grant license and IP validity. For collaboration, ensure clear IP ownership for jointly developed innovations.

Managing FTO risks involves Design-Around Strategies to modify product/process to avoid infringement while maintaining functionality, which is often the most cost-effective approach. Licensing negotiations secure rights from patent holder with consideration of license terms and costs. Invalidity Challenges use pre-grant or post-grant opposition in India and corresponding inter partes review or reexamination in the US to invalidate blocking patents. Insurance through IP insurance may cover defense costs and damages.

FTO and due diligence best practices include conducting FTO early in development (before major investment), updating FTO as product evolves, documenting opinions and rationale, engaging experienced patent counsel, and budgeting Rs 5-20 lakh for comprehensive FTO analysis.',
        '["Conduct preliminary FTO search for your lead product using patent databases", "Identify potentially blocking patents and assess infringement risk", "Develop IP due diligence checklist for upcoming transactions", "Create FTO risk register with mitigation strategies for identified risks"]'::jsonb,
        '["FTO Analysis Template with search methodology and claim analysis framework", "IP Due Diligence Checklist for biotech transactions", "Patent Database Search Guide for Indian and international patents", "FTO Risk Register Template with mitigation tracking"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Laboratory Setup & GLP Compliance (Days 16-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Laboratory Setup & GLP Compliance',
        'Design and establish biotech laboratory facilities meeting GLP standards, biosafety requirements, and regulatory expectations for equipment qualification and data integrity.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 16: Laboratory Design and Biosafety
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        16,
        'Laboratory Design and Biosafety Levels',
        'Laboratory design in biotech must balance scientific functionality with safety, regulatory compliance, and cost efficiency. Biosafety level requirements determine facility specifications, operating procedures, and capital investment. Poor laboratory design can compromise research quality, endanger personnel, and create regulatory issues.

Biosafety Level (BSL) Classification determines facility requirements. BSL-1 is for work with well-characterized agents not known to cause disease in healthy adults. Requirements include standard laboratory practices, no special containment, hand washing facilities, and bench-top work acceptable. Cost is Rs 15-25 lakh per 1000 sq ft for basic setup.

BSL-2 is for work with moderate-risk agents present in the community. Requirements include BSL-1 plus limited access during operations, biohazard warning signs, sharps precautions, biosafety cabinet for aerosol-generating procedures, decontamination procedures, and medical surveillance for personnel. Cost is Rs 30-50 lakh per 1000 sq ft.

BSL-3 is for work with indigenous or exotic agents with potential for aerosol transmission. Requirements include BSL-2 plus physical separation from access corridors, self-closing double-door access, directional airflow with HEPA exhaust, all work in biosafety cabinets, respiratory protection, and dedicated handwashing and eyewash. Cost is Rs 75 lakh to Rs 1.5 crore per 1000 sq ft.

BSL-4 is for work with dangerous and exotic agents posing high risk of life-threatening disease. Requirements include BSL-3 plus full-body positive pressure suits, chemical shower for decontamination, separate building or isolated zone, and dedicated air and waste systems. Cost is Rs 5-10 crore per 1000 sq ft. Very few BSL-4 facilities exist in India (NIV Pune, ICMR-NICED).

Laboratory layout design principles require unidirectional workflow from clean to dirty areas, separation of activities by risk level, adequate space for equipment and personnel movement (minimum 4.5 sqm per person), emergency egress routes (minimum 2 exits for labs above certain size), and support areas (storage, waste holding, equipment rooms). Zone planning should separate office/admin areas from laboratory areas, include gowning/degowning areas at zone transitions, and provide material airlocks where required.

Laboratory infrastructure requirements include HVAC systems providing minimum 6 air changes per hour for BSL-2 and 12 for BSL-3, directional airflow (negative pressure in containment), HEPA filtration for exhaust in BSL-3+, and temperature and humidity control for sensitive work. Electrical systems need emergency power (UPS and generator backup), isolated circuits for sensitive equipment, and adequate outlets (one per linear meter of bench minimum). Plumbing includes specialized drainage for biowaste, emergency shower and eyewash stations, and deionized water supply for sensitive applications.

Biosafety cabinet selection by type includes Type A2 for general microbiological work with exhaust to room (HEPA filtered) at Rs 4-8 lakh. Type B1 is for work with small quantities of volatile chemicals with dedicated exhaust at Rs 8-15 lakh. Type B2 is for work with volatile chemicals and radionuclides with 100% exhaust at Rs 15-25 lakh. Class III Glove Boxes provide maximum containment for BSL-4 work at Rs 25-50 lakh.

Laboratory design process involves needs assessment (activities, volumes, growth), conceptual design with workflow optimization, detailed design with MEP specifications, regulatory review and approval, construction and fit-out, and commissioning and validation.',
        '["Determine biosafety level requirements for your planned research activities", "Develop laboratory layout design with proper workflow and zoning", "Specify HVAC and utility requirements based on biosafety level", "Create equipment specifications and procurement plan for laboratory setup"]'::jsonb,
        '["Biosafety Level Requirements Checklist by BSL classification", "Laboratory Layout Design Template with workflow optimization", "HVAC Specification Guide for biotech laboratories", "Laboratory Equipment Procurement Checklist with vendor list"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 17: GLP Principles and Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        17,
        'GLP Principles and Implementation',
        'Good Laboratory Practice (GLP) is a quality system for non-clinical safety studies intended for regulatory submission. CDSCO requires GLP compliance for preclinical studies supporting new drug applications. Understanding GLP principles and implementation is essential for biotech companies planning to conduct in-house non-clinical studies or outsource to GLP-certified facilities.

GLP regulatory framework in India is based on Schedule L-1 of Drugs and Cosmetics Rules covering GLP requirements. The National GLP Compliance Monitoring Authority (NGCMA) under DST certifies GLP test facilities. India is a full member of OECD Mutual Acceptance of Data (MAD) since 2011, meaning GLP studies conducted in India are accepted by all OECD member countries. As of 2024, approximately 40 test facilities in India hold NGCMA GLP certification.

GLP principles cover ten key elements. Test Facility Organization requires defined organizational structure, clear responsibilities for management and study personnel, and adequate staffing with appropriate qualifications. Quality Assurance Programme requires independent QAU (Quality Assurance Unit), study inspections and audits, process inspections, and reporting to management. Facilities must be of suitable size, construction, and location with separation of activities and appropriate environmental controls. Apparatus, Materials, and Reagents must be suitable design and capacity with proper maintenance, calibration, and labeling.

Test Systems (biological systems used in studies) require proper housing and care for animals, characterization of cell lines and microbial systems, and handling procedures to ensure integrity. Test and Reference Items require proper characterization, handling and storage, identity verification, and stability data. SOPs must be written for all activities with authorization, distribution control, and deviation procedures. Study Plan (Protocol) must be approved before study start and contain specified elements with documented amendments.

Conduct of Study requires protocol compliance, accurate and timely recording of data, and reporting of unexpected findings. Reporting of Study Results requires final reports containing specified elements including materials and methods, results, QA statement, and study director signature. Storage and Retention of Records and Materials requires defined retention periods (typically 15 years or longer), secure storage conditions, and archiving procedures.

GLP implementation roadmap for biotech companies spans Week 1-4 for gap assessment and planning, Week 5-12 for SOP development and training, Week 13-20 for implementation and dry runs, Week 21-24 for internal audits and corrections, and Week 25+ for NGCMA certification application. Typical implementation time is 12-18 months.

Costs of GLP implementation include facility modifications of Rs 25-50 lakh depending on current state, documentation and SOP development of Rs 10-20 lakh with consultancy, training of Rs 5-10 lakh, and NGCMA certification fees and inspection costs of Rs 5-10 lakh. Total investment is Rs 50 lakh to Rs 1 crore for GLP certification.

Outsourcing versus building GLP capability is an important decision. Consider outsourcing for early-stage companies with limited studies. The number of Indian GLP-certified CROs is growing (Vimta Labs, Lambda, Syngene). Building in-house capability is appropriate if studies are core to your value proposition or if study volume justifies investment.',
        '["Assess GLP requirements for your development program and regulatory strategy", "Conduct gap analysis against GLP principles for existing laboratory facilities", "Develop GLP implementation plan with timeline and resource requirements", "Evaluate build versus outsource decision for GLP studies"]'::jsonb,
        '["GLP Principles Summary with Schedule L-1 requirements", "GLP Gap Analysis Checklist for biotech laboratories", "GLP Implementation Roadmap with milestone timeline", "NGCMA Certified Facility Directory with capabilities"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Continue with more days...
    -- Day 18: Equipment Qualification and Validation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        18,
        'Equipment Qualification and Validation',
        'Equipment qualification ensures that laboratory instruments perform as intended and produce reliable results. For GLP studies and GMP manufacturing, documented equipment qualification is mandatory. Understanding the qualification lifecycle and validation requirements enables compliant operations and regulatory acceptance.

Equipment qualification lifecycle follows a defined sequence. User Requirements Specification (URS) documents what the equipment must do, covering performance requirements, capacity needs, environmental conditions, and regulatory requirements. The URS forms the basis for vendor selection and qualification.

Design Qualification (DQ) verifies that the proposed design meets URS requirements. This includes vendor assessment, design review against URS, and documentation of design acceptability. Conducted before procurement, it ensures equipment will meet needs.

Installation Qualification (IQ) verifies equipment is installed according to specifications. Elements include verification of correct delivery and installation, utility connections (power, gas, water), safety features, and documentation (manuals, certificates). Conducted at installation before use.

Operational Qualification (OQ) verifies equipment operates correctly across operating range. Elements include testing of all functions, alarm and interlock testing, environmental condition verification, and calibration verification. Conducted after IQ before routine use.

Performance Qualification (PQ) verifies equipment performs as required under actual use conditions. Elements include testing with actual samples or simulated loads, extended operation verification, and operator competency verification. Conducted after OQ, may be combined with process validation.

Key biotech equipment requiring qualification includes analytical instruments (HPLC, mass spectrometry, PCR), cell culture equipment (incubators, biosafety cabinets, bioreactors), storage equipment (freezers, refrigerators, cryogenic storage), environmental monitoring systems, and water purification systems.

Calibration requirements ensure measuring instruments provide accurate results. Parameters include temperature (incubators, freezers, rooms), pressure (autoclaves, bioreactors), volume (pipettes, dispensers), and analytical instrument calibration (standards, reference materials). Frequency varies by instrument and use. Typically quarterly to annually with verification between calibrations. Documentation includes calibration certificates, traceability to national standards (NPL India or equivalent), and out-of-calibration investigation.

Computer System Validation (CSV) is increasingly important as laboratory equipment incorporates software. CSV requirements include documented requirements, design qualification, testing (installation, operational, performance), data integrity controls, and change management. GAMP 5 guidelines provide framework for risk-based CSV approach. 21 CFR Part 11 equivalent requirements apply in India for electronic records.

Validation documentation requirements include protocols (pre-approved plans for qualification activities), execution records (actual results with deviations documented), reports (summary with conclusions and approvals), and ongoing monitoring (periodic review and requalification). Documentation retention is minimum 15 years for GLP studies.

Common qualification deficiencies found during audits include incomplete URS or missing link to qualification, undocumented deviations during qualification, overdue calibration or maintenance, and inadequate CSV documentation.',
        '["Create equipment master list with qualification status and requirements", "Develop URS templates for key equipment types", "Establish calibration program with schedules and responsibilities", "Implement qualification documentation system with templates and approval workflows"]'::jsonb,
        '["Equipment Qualification Protocol Templates (IQ, OQ, PQ)", "Calibration Schedule Template with frequency guidelines", "Computer System Validation Framework based on GAMP 5", "Equipment Master List Template with status tracking"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 19: Data Integrity and Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'Data Integrity and Documentation Practices',
        'Data integrity is foundational to all regulatory submissions and scientific credibility. Regulators including CDSCO and international agencies have significantly increased focus on data integrity, with serious findings leading to warning letters, import bans, and criminal prosecution. Establishing robust data integrity practices from the beginning protects your company and enables regulatory success.

ALCOA+ principles define data integrity requirements. Attributable means data can be traced to the person who generated it with date, time, and signature. Legible means data is readable and permanent with no erasures. Contemporaneous means data is recorded at the time of the activity. Original means data is the first recording (or certified copy). Accurate means data is correct, truthful, and complete. The Plus represents additional expectations of Complete (all data including results that do not support conclusions), Consistent (data is logically connected and follows expected sequences), Enduring (data is recorded on appropriate media that will last), and Available (data can be retrieved when needed throughout required retention period).

Electronic data integrity presents unique challenges. Audit trails should be automatic and unalterable, system-generated, and include who, what, and when for each entry. User access controls require unique user IDs for each person, role-based access permissions, password controls, and automatic logout. Backup and archiving ensures regular backup with verification, secure archive storage, and tested restoration procedures. Electronic signatures require intent, meaning, and link to the signed data.

Paper documentation practices require laboratory notebooks with bound, numbered pages, entries in permanent ink with corrections by single line-through (initialed and dated), no blank spaces (line through unused portions), and real-time entries (not transcribed from scratch paper). Raw data handling requires all original data to be retained, source data identified and protected, and copies certified and traceable.

Common data integrity issues include back-dating of records (among the most serious findings), test into compliance through repeated testing until passing results, hidden or deleted data that should have been retained, shared user IDs preventing individual accountability, and missing audit trails or disabled audit trail features.

Data integrity program implementation requires governance including data integrity policy, defined roles and responsibilities, and management oversight. Training should cover initial and refresher training for all personnel, specific training for data generators, and training documentation. Monitoring involves self-inspections and audits, audit trail review, and exception reporting. Response means procedures for investigating failures, CAPA (Corrective and Preventive Action), and regulatory notification if required.

Regulatory expectations and consequences have increased scrutiny in recent years. US FDA Warning Letters specifically cite data integrity failures. CDSCO has issued guidelines on data integrity in pharmaceutical sector. EU Annex 11 addresses electronic record requirements. Consequences include inspection findings, rejection of applications, product recalls, import alerts, and criminal prosecution.

Data integrity assessment checklist should cover whether all personnel are uniquely identified in systems, whether audit trails are enabled and reviewed, whether there are procedures for handling out-of-specification results, whether backup and archiving is verified, and whether training is documented and current.',
        '["Develop data integrity policy covering paper and electronic records", "Assess current data systems against ALCOA+ principles", "Implement audit trail review procedures for electronic systems", "Train all personnel on data integrity requirements and expectations"]'::jsonb,
        '["Data Integrity Policy Template for biotech organizations", "ALCOA+ Compliance Assessment Checklist", "Electronic System Audit Trail Review Protocol", "Data Integrity Training Materials with case studies"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 20: Laboratory Quality Management System
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Laboratory Quality Management System',
        'A comprehensive Quality Management System (QMS) integrates all quality-related activities into a coherent framework. For biotech laboratories, the QMS ensures consistent, reliable results while meeting GLP, GMP, and other regulatory requirements. A well-designed QMS improves efficiency, reduces errors, and facilitates regulatory compliance.

QMS framework for biotech laboratories builds on ISO 9001 foundation adapted for laboratory operations. Key QMS elements include Quality Manual (top-level document defining quality policy and system), procedures (how activities are performed), work instructions (detailed step-by-step instructions), forms and templates (standardized data collection tools), and records (evidence of activities performed).

Document control ensures documents are current, approved, and available. Requirements include unique identification and version control, review and approval before use, controlled distribution, change management, and obsolete document handling. Master document register tracks all controlled documents. Electronic document management systems increasingly used (e.g., MasterControl, Veeva).

Change control manages changes to prevent unintended consequences. Scope includes equipment, methods, materials, and personnel changes. Process involves change request, impact assessment, approval, implementation, and verification. Documentation requirements include change history and effectiveness checks.

Deviation and CAPA management handles deviations when planned procedures are not followed. Requirements include documentation of what happened, impact assessment, immediate correction, and root cause investigation. CAPA (Corrective and Preventive Action) is the system for addressing root causes through corrective action to prevent recurrence and preventive action to prevent occurrence. Effectiveness verification ensures actions achieved intended results.

Internal audit program provides independent assessment of QMS effectiveness. Requirements include annual coverage of all QMS elements, trained auditors (independent of area audited), documented findings, and corrective action follow-up. Audit types include system audits, process audits, and product/study audits.

Management review ensures ongoing suitability and effectiveness of QMS. Inputs include audit results, customer feedback, process performance, CAPA status, and changes affecting QMS. Outputs include improvement decisions, resource needs, and quality objectives. Frequency should be at least annual, with quarterly reviews recommended.

Training management ensures personnel competency. Requirements include training needs assessment, training plans, training delivery and documentation, and competency assessment. Training records should include topic, date, trainer, trainee acknowledgment, and competency evidence.

Supplier qualification ensures external materials and services meet requirements. Elements include supplier assessment and approval, incoming material inspection, performance monitoring, and re-qualification periodic assessment.

QMS implementation for biotech startups should start with essentials (document control, training, basic SOPs), build incrementally as organization grows, leverage templates and external expertise, and integrate with regulatory requirements (GLP, GMP). Costs include QMS software at Rs 5-15 lakh for basic systems, consultant support at Rs 5-10 lakh for implementation, and ongoing maintenance at Rs 2-5 lakh annually.',
        '["Develop quality manual defining QMS scope and structure", "Implement document control system with templates and procedures", "Establish CAPA process for handling deviations and improvements", "Create internal audit program with trained auditors and schedule"]'::jsonb,
        '["Quality Manual Template for biotech laboratories", "Document Control SOP with workflow procedures", "CAPA System Implementation Guide with forms", "Internal Audit Program Template with checklist"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Pre-Clinical Development (Days 21-25)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Pre-Clinical Development',
        'Navigate pre-clinical studies including animal testing under CPCSEA guidelines, toxicology requirements, pharmacokinetics, and IND-enabling studies for regulatory submissions.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 21: Pre-Clinical Development Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        21,
        'Pre-Clinical Development Strategy',
        'Pre-clinical development bridges discovery research and human clinical trials, generating safety and efficacy data required for regulatory approval to test in humans. In India, pre-clinical requirements are defined under New Drugs and Clinical Trials Rules 2019, with CPCSEA governing animal studies. Strategic pre-clinical planning can save Rs 10-50 crore and 2-3 years in development time.

Pre-clinical development objectives include demonstrating pharmacological activity in relevant disease models, establishing safety profile sufficient for initial human dosing, characterizing pharmacokinetic properties (ADME - Absorption, Distribution, Metabolism, Excretion), identifying potential toxicities and target organs, and supporting dose selection for first-in-human studies.

Indian regulatory requirements under Schedule II of New Drugs and Clinical Trials Rules 2019 specify pre-clinical studies for different drug categories. For NCEs (New Chemical Entities), pharmacology studies include primary pharmacodynamics, secondary pharmacodynamics, and safety pharmacology (cardiovascular, CNS, respiratory). Pharmacokinetic studies cover absorption, distribution, metabolism, and excretion in relevant species. Toxicology studies include acute toxicity (two species, two routes), repeated dose toxicity (duration based on clinical trial duration), genotoxicity (Ames test, chromosome aberration, mouse micronucleus), reproductive toxicity (if applicable), and carcinogenicity (if warranted).

For biologics, additional requirements include immunogenicity assessment, species selection justification (based on target binding), and extended pharmacokinetic characterization.

Species selection is critical for relevance. Rodent species (rats, mice) are used for initial toxicology with lower cost at Rs 50,000-2 lakh per study. Non-rodent species (dogs, non-human primates) provide higher relevance for human extrapolation but higher cost at Rs 10-50 lakh per study. Selection criteria include pharmacological responsiveness, metabolic similarity to humans, and historical database availability.

Pre-clinical development timeline typically spans Month 1-6 for pharmacology and preliminary toxicology, Month 7-12 for GLP toxicology studies, Month 13-18 for IND-enabling studies and dossier preparation, and Month 18+ for regulatory submission. Total investment is typically Rs 3-15 crore depending on molecule type and required studies.

Outsourcing pre-clinical studies is common and often more efficient. Indian CROs with pre-clinical capabilities include Vivo Bio Tech (Hyderabad), Bioneeds India (Bangalore), Lambda Therapeutic Research (Ahmedabad), and Syngene International (Bangalore). Selection criteria include GLP certification (for regulatory studies), relevant species availability, study type expertise, regulatory submission experience, and timeline and cost competitiveness.

Pre-clinical to clinical translation challenges are significant. Animal to human translation has high uncertainty, with up to 90% of drugs showing efficacy in animals failing in humans. Mitigation strategies include using multiple models, biomarker development, and human tissue studies where possible.',
        '["Develop pre-clinical development plan aligned with target product profile", "Identify required studies based on drug category and regulatory pathway", "Select species for pharmacology and toxicology studies with scientific rationale", "Evaluate CROs for pre-clinical study outsourcing"]'::jsonb,
        '["Pre-Clinical Development Planning Template", "Regulatory Requirements Checklist by drug category", "Species Selection Guide with rationale framework", "CRO Evaluation Matrix for pre-clinical services"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: CPCSEA and Animal Studies
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        22,
        'CPCSEA Guidelines and Animal Studies',
        'Animal experimentation in India is regulated by the Committee for the Purpose of Control and Supervision of Experiments on Animals (CPCSEA) under the Ministry of Environment, Forest and Climate Change. Compliance with CPCSEA guidelines is mandatory for all animal research, and violations can result in facility closure and criminal prosecution. Understanding CPCSEA requirements protects both animals and your research program.

CPCSEA regulatory framework is established under Prevention of Cruelty to Animals Act 1960 and Breeding of and Experiments on Animals (Control and Supervision) Rules 1998 (amended 2001, 2006). CPCSEA functions include registering establishments for animal experiments, appointing nominees to IASCs, inspecting animal facilities, and recommending action against non-compliant establishments.

Registration requirements mandate that any establishment conducting animal experiments must register with CPCSEA. Application requirements include establishment details and infrastructure, animal species and numbers proposed, qualified personnel, veterinary facilities, and Institutional Animal Ethics Committee composition. Registration validity is initially 3 years, then 5 years upon renewal. Fees are nominal at Rs 2,500 for registration.

Institutional Animal Ethics Committee (IAEC) is mandatory for all registered establishments. Composition requires a main nominee from CPCSEA, link nominee from CPCSEA, scientist from outside institution, socially aware person nominated by CPCSEA, scientist in-charge of animal facility, biological scientist, and veterinarian. Functions include reviewing and approving all animal experiment protocols, monitoring ongoing experiments, ensuring animal welfare, and reporting to CPCSEA.

Protocol approval requirements include scientific justification for animal use, species and number justification (3Rs principle), experimental design with statistical rationale, procedures and interventions, anesthesia and analgesia plans, humane endpoints, and fate of animals post-experiment. The 3Rs principle requires Replacement (use alternatives where possible), Reduction (use minimum animals for statistical validity), and Refinement (minimize pain and distress).

Animal housing and care requirements under CPCSEA guidelines specify housing (space, temperature, humidity, light cycle), nutrition (species-appropriate diet and water), veterinary care (health monitoring, treatment), and enrichment (social housing, environmental complexity). Specific requirements vary by species. Example for rats includes temperature of 20-26 degrees C, humidity of 30-70%, light cycle of 12:12 hours, and floor area of minimum 300 sq cm per adult rat.

Animal facility categories include Small Animal Facility for rodents, rabbits with basic requirements and cost of Rs 25-50 lakh setup. Large Animal Facility for dogs, primates requires higher investment with specialized housing at Rs 1-3 crore setup. GLP Animal Facility requires additional documentation, QA oversight at Rs 2-5 crore for certified facility.

Humane endpoints define criteria for early termination to prevent unnecessary suffering. Categories include clinical signs (weight loss greater than 20%, immobility, inability to eat/drink), tumor burden limits, and pain indicators. Implementation requires training personnel, clear documentation, and veterinary oversight.

CPCSEA compliance challenges include inspector visits (often unannounced), documentation requirements, nominee availability for IAEC meetings, and evolving guidelines. Best practices include proactive IAEC engagement, maintaining comprehensive records, regular internal audits, and building relationship with CPCSEA office.',
        '["Apply for CPCSEA registration if planning in-house animal studies", "Establish Institutional Animal Ethics Committee with required composition", "Develop animal housing and care SOPs meeting CPCSEA guidelines", "Create protocol approval process with 3Rs documentation"]'::jsonb,
        '["CPCSEA Registration Application Guide", "IAEC Composition and Function Guidelines", "Animal Housing Requirements by species", "Protocol Approval Template with 3Rs framework"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23-25: Toxicology Studies (condensed for brevity, following same pattern)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        23,
        'Toxicology Studies for IND-Enabling',
        'Toxicology studies form the foundation of safety assessment, providing data required to initiate human clinical trials. Indian regulations under New Drugs and Clinical Trials Rules 2019 specify toxicology requirements that must be completed before first-in-human dosing. Strategic toxicology planning balances thoroughness with efficiency to support development timelines.

Acute toxicity studies determine single-dose toxicity and help establish dose ranges for subsequent studies. Requirements include two species (one rodent, one non-rodent), two routes of administration (intended route plus one other), observation period of 14 days with reversibility assessment, and endpoints including mortality, clinical signs, body weight, gross necropsy. GLP requirement means these may be done in GLP or non-GLP depending on regulatory strategy. Cost is Rs 5-10 lakh per species.

Repeat dose toxicity studies assess toxicity from multiple doses, supporting clinical trial duration. Duration requirements specify 2-4 week studies for Phase I up to 14 days, 4-week studies for Phase I/II up to 1 month, 3-month studies for Phase II up to 3 months, 6-month (rodent) and 9-month (non-rodent) for Phase III and longer. Study design includes two species, three dose levels plus control, daily dosing and observation, comprehensive clinical pathology, organ weight measurements, and histopathology of 30+ tissues. GLP is required for regulatory submission. Cost is Rs 30-80 lakh per study depending on duration and species.

Genotoxicity studies assess potential to cause genetic damage. Standard battery includes the Ames test (bacterial reverse mutation) at Rs 3-5 lakh, in vitro chromosome aberration or micronucleus at Rs 4-6 lakh, and in vivo micronucleus (rodent bone marrow) at Rs 5-8 lakh. All three required before Phase II, with at least Ames and one other before Phase I. Positive findings require follow-up testing and risk assessment.

Safety pharmacology studies assess effects on vital organ systems. Core battery includes cardiovascular (hERG assay plus telemetered dog study) at Rs 15-25 lakh, CNS (Irwin test or FOB in rodents) at Rs 5-10 lakh, and respiratory (whole body plethysmography) at Rs 5-10 lakh. Required before first human dose.

Reproductive toxicity studies are required if women of childbearing potential included in trials. Segments include fertility and early embryonic development (Segment I), embryo-fetal development (Segment II) - required before women of childbearing potential exposed, and pre- and postnatal development (Segment III). Timing can be phased with clinical development. Cost is Rs 25-50 lakh per segment.

NOAEL (No Observed Adverse Effect Level) determination from toxicology studies establishes the highest dose without adverse effects, forms basis for human starting dose calculation using allometric scaling, and safety margins of typically 10-fold for MRSD (Maximum Recommended Starting Dose).

Toxicology study management requires study director oversight, sponsor monitoring visits, data review and interpretation, and regulatory compilation (CTD Module 4).',
        '["Develop toxicology study program aligned with clinical development plan", "Identify GLP CRO partners for toxicology studies", "Create toxicology budget and timeline for IND-enabling package", "Establish study monitoring and data review procedures"]'::jsonb,
        '["Toxicology Study Requirements by development phase", "GLP Toxicology CRO Directory with capabilities", "Study Protocol Templates for key toxicology studies", "NOAEL to Human Dose Calculation Guide"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Clinical Trial Design & Execution (Days 26-32)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Clinical Trial Design & Execution',
        'Master clinical trial design, CTRI registration, ethics committee processes, site selection, and trial execution under New Drugs and Clinical Trials Rules 2019.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 26: Clinical Trial Framework in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        26,
        'Clinical Trial Framework in India',
        'India conducts approximately 2,000+ clinical trials annually, making it a significant global player. The New Drugs and Clinical Trials Rules 2019 modernized the regulatory framework, providing defined timelines and clearer requirements. India offers cost advantages (60-70% lower than US), diverse patient population, English-speaking physicians, and growing infrastructure, making it attractive for clinical development.

Clinical Trial Phases and Objectives progress through defined stages. Phase I trials involve 20-100 healthy volunteers to assess safety, tolerability, pharmacokinetics with dose escalation design, taking 6-12 months and costing Rs 2-5 crore. Phase II trials involve 100-500 patients with the target condition to evaluate efficacy signals, dose-response, and safety with randomized controlled design, taking 12-24 months and costing Rs 10-30 crore. Phase III trials involve 500-5,000 patients to confirm efficacy, monitor adverse events, and compare to standard of care with pivotal studies for registration, taking 24-48 months and costing Rs 50-200 crore. Phase IV trials involve approved drugs to assess post-marketing safety, rare adverse events, and long-term effects with observational or interventional design.

Clinical Trial Application (CTA) Requirements under Form CT-04 include covering letter and Form CT-04, investigator brochure (IB), clinical trial protocol, informed consent document, chemistry, manufacturing, and control (CMC) data, pre-clinical data summary (Module 4), ethics committee approvals, investigator CVs and declarations, insurance certificate, audio-visual materials for consent (if applicable), and undertaking regarding compensation.

CDSCO Clinical Trial Approval Process follows defined steps. Pre-submission meeting (optional) discusses protocol and requirements. Application submission is via SUGAM portal with prescribed fees (Rs 50,000 base plus Rs 1,000 per site). Initial review ensures completeness within 15 days. Technical review by Subject Expert Committee takes 30-60 days. Site inspection may occur if required. Approval or rejection letter is issued. Statutory timeline is 90 working days, with actual timeline typically 3-6 months.

Clinical Trials Registry - India (CTRI) is mandatory registration before enrollment of first participant. Requirements include trial registration before participant enrollment, unique CTRI number (CTRI/Year/Number format), public access to trial information, and updates for significant amendments. Registration at ctri.nic.in is free. Information required includes trial title, sponsors, investigators, design, endpoints, enrollment criteria, and sites.

Academic Clinical Trials have simplified provisions under new rules. Definition covers trials conducted by academic or research institution, not for regulatory approval or commercial purpose. Simplified requirements include shortened application form, expedited review (30 days), and reduced documentation. Insurance requirements may be modified. Examples include investigator-initiated trials and research without commercial intent.

Compensation for clinical trial injury is detailed under the 2019 Rules. Categories include trial-related injury requiring compensation by sponsor, trial-related death requiring compensation by sponsor, non-trial-related injury or death with no compensation required. Compensation determination is by CDSCO-appointed expert committee with formula-based calculation for death (based on age and minimum wage). Insurance requirements mandate valid clinical trial insurance, minimum coverage specified per participant, and sponsor remains ultimately responsible.',
        '["Study New Drugs and Clinical Trials Rules 2019 provisions for your trial type", "Prepare Clinical Trial Application dossier with all required components", "Register trial on CTRI with complete information", "Develop clinical trial insurance strategy with adequate coverage"]'::jsonb,
        '["Clinical Trial Application Checklist under 2019 Rules", "CTRI Registration Guide with required fields", "Clinical Trial Protocol Template with ICH-GCP elements", "Compensation Framework under New Rules"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 27: Ethics Committee and Informed Consent
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        27,
        'Ethics Committee Approval and Informed Consent',
        'Ethics Committee (EC) approval is mandatory before initiating any clinical trial in India. The 2019 Rules established a registration system for Ethics Committees and defined composition and functioning requirements. Robust informed consent processes protect participants and ensure trial validity. EC delays are among the most common causes of trial timeline slippage.

Ethics Committee Registration under the 2019 Rules requires all ECs reviewing clinical trials to register with CDSCO. Registration requirements include EC standard operating procedures, member CVs and conflict of interest declarations, infrastructure details, and fee schedule. Registration validity is 5 years with renewal process. Registered EC list is available on CDSCO website. Unregistered ECs cannot review clinical trials.

EC Composition Requirements mandate minimum 7 members including medical scientist, non-medical scientist, legal expert, social scientist or NGO representative, philosopher/ethicist/theologian, lay person from community, and one member of opposite sex. EC types include Institutional ECs (hospital or institution-based) and Independent ECs (not affiliated with trial sites).

EC Review Process involves submission of application with protocol, IB, ICF, investigator details, insurance certificate, and other trial documents. Initial review ensures completeness within 7 days. Full committee review at convened meeting with quorum requirements. Decision options include approval, request for modifications, or rejection. Timeline is typically 30-60 days from complete submission. Re-review is required for protocol amendments and annual review for ongoing trials.

Key EC Review Considerations include scientific validity (is the research question valid and design appropriate), risk-benefit assessment (do potential benefits justify risks to participants), vulnerable population protection (special safeguards for children, pregnant women, prisoners), informed consent adequacy (is information complete and comprehensible), investigator qualifications (adequate training and resources), and compensation and insurance (adequate protection for participants).

Informed Consent Process under ICH-GCP and Indian regulations requires information disclosure covering trial purpose and procedures, potential risks and benefits, alternatives to participation, confidentiality provisions, compensation for injury, voluntary nature of participation, and right to withdraw without penalty. Comprehension verification ensures participants understand information, with opportunity for questions and clear communication. Documentation requirements include participant signature and date, legally authorized representative for incapable participants, witness signature (mandatory in India), and investigator signature.

Informed Consent Document (ICD) Requirements include plain language (8th grade reading level), local language versions, all required elements per regulations, CDSCO template available, and version control and dating.

Audio-Visual Consent Requirements under 2019 Rules mandate audio-visual recording of informed consent process. Requirements include recording of consent process with participant agreement, secure storage of recordings, and retention for specified period. Implementation challenges include privacy concerns, technical requirements, and storage management. Exemptions may apply for certain trial types or participant preferences.

Vulnerable Population Protections require additional safeguards for children (assent plus parent/guardian consent), pregnant women (special risk consideration), prisoners (non-coercive environment), cognitively impaired (legally authorized representative), and economically disadvantaged (ensure no undue inducement).',
        '["Identify appropriate Ethics Committee(s) for your trial sites", "Develop Ethics Committee submission package with all required documents", "Create informed consent document in required languages", "Establish audio-visual consent recording procedures"]'::jsonb,
        '["Registered Ethics Committee Directory", "EC Submission Checklist with document requirements", "Informed Consent Document Template with all required elements", "Audio-Visual Consent SOP Template"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 28-32: Additional clinical trial lessons (condensed)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        28,
        'Site Selection and Trial Execution',
        'Clinical trial site selection significantly impacts trial quality, timelines, and costs. India has over 3,500 potential clinical trial sites, but quality varies significantly. Rigorous site selection and monitoring are essential for successful trial execution and data integrity.

Site Selection Criteria evaluate multiple factors. Patient access assesses disease prevalence in catchment area, competitive trial landscape, and historical enrollment rates. Infrastructure evaluates facility adequacy, equipment availability, pharmacy and laboratory capabilities, and data management systems. Experience considers GCP training and certification, prior trial conduct, regulatory inspection history, and therapeutic area expertise. Personnel assesses principal investigator qualifications, sub-investigator availability, study coordinator capacity, and research pharmacist access.

Site Feasibility Assessment Process involves feasibility questionnaire distribution covering capabilities and interest, site selection visits for shortlisted sites, capability verification and gap assessment, enrollment projection and timeline estimation, and budget negotiation and agreement.

Clinical Trial Agreement (CTA) covers scope of work and responsibilities, budget and payment terms, IP ownership provisions, publication rights, confidentiality obligations, insurance and indemnification, and termination provisions. Negotiation timeline is typically 4-8 weeks.

Site Initiation and Training involves site initiation visit (SIV) covering protocol training, GCP refresher, role assignments, document and system review, and mock enrollment. Investigator meeting brings all site teams together for training alignment and experience sharing. Documentation includes site-specific training logs, delegation logs, and signature logs.

Trial Monitoring ensures GCP compliance and data quality. Monitoring types include on-site monitoring with periodic visits (4-8 weekly), remote/centralized monitoring using data review without site visits, and risk-based monitoring with a combination approach based on site risk. Monitor responsibilities include source data verification, protocol compliance review, safety monitoring, regulatory document maintenance, and issue escalation. Monitoring frequency depends on enrollment rate, data complexity, and site performance.

Data Management in clinical trials involves Case Report Form (CRF) design (paper or electronic), data entry and verification procedures, query generation and resolution, medical coding (MedDRA for adverse events, WHO Drug for medications), database lock procedures, and CDISC standards compliance for submission.

Safety Reporting Requirements mandate reporting of Serious Adverse Events within 24 hours to EC and sponsor, SUSARs (Suspected Unexpected Serious Adverse Reactions) within specified timelines to CDSCO, annual safety reports, and final safety analysis. SAE assessment determines causality (related, possibly related, not related) and expectedness (listed in IB or not).

Trial Closeout involves last patient last visit, data cleaning and query resolution, database lock, site close-out visits, regulatory document archiving, and final study report. Document retention is minimum 25 years under Indian regulations.',
        '["Develop site selection criteria and feasibility assessment process", "Create clinical trial agreement template with key provisions", "Establish monitoring plan with frequency and visit types", "Design data management workflow with quality controls"]'::jsonb,
        '["Site Selection Criteria Checklist", "Clinical Trial Agreement Template", "Monitoring Plan Template with risk-based approach", "Data Management SOP with quality standards"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: GMP Manufacturing (Days 33-38)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'GMP Manufacturing',
        'Master pharmaceutical GMP manufacturing under Schedule M, WHO-GMP certification, facility design, process validation, and quality systems for drug and biologic production.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 33: Schedule M GMP Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        33,
        'Schedule M GMP Requirements',
        'Schedule M of the Drugs and Cosmetics Rules defines Good Manufacturing Practice requirements for pharmaceutical manufacturing in India. Compliance with Schedule M is mandatory for obtaining and maintaining a manufacturing license. Understanding these requirements is fundamental for any biotech company planning to manufacture drugs or biologics.

Schedule M Structure covers multiple parts. Part I addresses GMP for premises, plant, and equipment covering location and surroundings, building and premises, water system, disposal of waste, warehousing, production area, ancillary areas, quality control area, personnel, health, clothing, and sanitation, manufacturing operations, and documentation.

Part I-A covers GMP for specific product categories including sterile products, oral solid dosages, oral liquids, topical products, metered-dose inhalers, active pharmaceutical ingredients, and biological products including vaccines.

Part I-B covers GMP for blood and blood products with specialized requirements.

Part II addresses requirements for plant and equipment covering water systems, air handling systems, process equipment, and validation requirements.

Key Schedule M Requirements for premises specify that production area should be minimum 10 sq meters per equipment with adequate ceiling height of 3 meters minimum. Environmental controls for sterile products require Grade A (ISO 5) for filling, Grade B (ISO 7) for background, Grade C (ISO 8) for preparation, and Grade D (ISO 9) for component preparation. Non-sterile products require appropriate controls based on product type.

Water system requirements under Schedule M specify Purified Water for most pharmaceutical use, Water for Injection for parenteral and sterile products, quality specifications per Indian Pharmacopoeia, and validation of water system qualification.

Documentation requirements include site master file, batch manufacturing records, standard operating procedures, specifications and test procedures, and stability studies. Document control requires approval, distribution, revision control, and retention.

Personnel requirements mandate qualified head of production and quality control, ongoing training program, health monitoring, and hygiene practices.

Quality Control requirements include adequate laboratory facilities, testing per pharmacopoeial specifications, release testing and stability studies, and reference standards management.

Schedule M-II specifically addresses GMP for Blood and Blood Products with additional requirements for donor screening, component preparation, storage conditions, and traceability.

Schedule M compliance assessment involves gap analysis against requirements, remediation planning and budgeting, implementation of improvements, pre-approval inspection readiness, and ongoing compliance maintenance.

Common Schedule M inspection findings include inadequate environmental monitoring, documentation gaps in batch records, insufficient validation, cross-contamination prevention deficiencies, and training record inadequacies.',
        '["Conduct Schedule M gap analysis for current or planned facility", "Develop remediation plan for identified compliance gaps", "Create site master file documenting facility and systems", "Establish inspection readiness program with mock inspections"]'::jsonb,
        '["Schedule M Compliance Checklist with detailed requirements", "Site Master File Template with required sections", "Gap Analysis Tool for GMP assessment", "Inspection Readiness Checklist"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 34-38: Additional GMP lessons (condensed)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        34,
        'WHO-GMP and International Certifications',
        'WHO-GMP certification enables participation in international procurement programs and provides credibility for export markets. Over 200 Indian manufacturing sites hold WHO-GMP certification. For biotech companies targeting global markets, WHO-GMP and other international certifications are often essential for commercial success.

WHO-GMP Certification Process requires facility compliance with WHO GMP guidelines. Application is through CDSCO with prescribed fees of Rs 1 lakh. CDSCO inspection using WHO checklist follows. Certificate issued if compliant, valid for 3 years. WHO Prequalification is a separate, more rigorous program for access to UN procurement and GAVI purchases.

WHO GMP additional requirements beyond Schedule M include more comprehensive validation requirements, stricter documentation standards, stability requirements per ICH guidelines, complaint handling and recall procedures, and self-inspection program.

US FDA Registration and Inspection is required for export to the US market. Annual registration of manufacturing establishment via FDA''s online system is required. FDA inspection may be pre-approval (for new applications) or surveillance (routine). Warning letters result from significant violations. Import alerts can block products from entering US.

EU GMP Compliance for European market access requires EU GMP compliance demonstrated through inspection, Certificate of GMP compliance from competent authority, Qualified Person requirements, and compliance with Annex requirements (Annex 1 for sterile products, Annex 2 for biologicals).

PIC/S (Pharmaceutical Inspection Co-operation Scheme) provides international GMP cooperation framework. India became a PIC/S member in 2024. Benefits include mutual recognition among member authorities and harmonized inspection approaches.

Japanese PMDA Requirements for Japan market entry require PMDA registration and GMP inspection, J-GMP compliance (largely harmonized with ICH), and specific documentation requirements.

Certification Strategy for Biotech Companies should prioritize based on target markets. Indian market only requires Schedule M compliance. Export markets require Schedule M plus WHO-GMP as baseline, US market requires FDA registration with inspection readiness, and EU market requires EU GMP compliance.

Multi-certification efficiency can be achieved by building quality system to highest required standard, maintaining single documentation set meeting multiple requirements, and coordinating inspection timing where possible.

Investment for certifications includes WHO-GMP certification costs of Rs 5-15 lakh including preparation, FDA inspection readiness of Rs 20-50 lakh for facility and system upgrades, and ongoing compliance maintenance of Rs 10-25 lakh annually.',
        '["Assess certification requirements based on target markets", "Develop certification roadmap with priorities and timelines", "Gap analysis against WHO-GMP and target market requirements", "Build quality systems meeting highest applicable standard"]'::jsonb,
        '["WHO-GMP Requirements Checklist", "International GMP Comparison Matrix", "Certification Roadmap Template", "FDA Inspection Readiness Guide"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: CDSCO Approvals & Drug Registration (Days 39-44)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'CDSCO Approvals & Drug Registration',
        'Navigate new drug applications (NDA), abbreviated NDA, biosimilar approvals, and post-approval requirements for marketing authorization in India.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 39: New Drug Application Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        39,
        'New Drug Application Process',
        'The New Drug Application (NDA) is the regulatory submission seeking approval to market a new drug in India. CDSCO evaluates safety, efficacy, and quality data to make approval decisions. Understanding NDA requirements and the review process enables efficient regulatory strategy and timely market access.

NDA Submission Requirements under Form 44 cover administrative information including applicant details, drug product information, and proposed labeling. Quality documentation in CTD Module 3 includes drug substance and drug product information, manufacturing process, specifications and analytical methods, stability data, and container closure system. Non-clinical documentation in CTD Module 4 covers pharmacology studies, pharmacokinetic studies, and toxicology studies. Clinical documentation in CTD Module 5 includes clinical pharmacology, efficacy studies, and safety data.

CTD (Common Technical Document) Format is the internationally harmonized format adopted by CDSCO. Structure includes Module 1 for regional administrative information, Module 2 for summaries (quality, non-clinical, clinical), Module 3 for quality (CMC) documentation, Module 4 for non-clinical study reports, and Module 5 for clinical study reports.

NDA Review Process begins with application submission via SUGAM portal with fees of Rs 15 lakh for NDA. Validation ensures completeness within 30 days. Technical review by CDSCO divisions follows, with Subject Expert Committee review for complex products. Additional information requests may extend review. Manufacturing site inspection if required. Approval letter or rejection with reasons issued. Statutory timeline is 120 working days, with actual timeline typically 9-18 months.

Categories of New Drug Approval include new chemical entities (NCEs) or new biological entities (NBEs) requiring complete development package. New indications for approved drugs may have reduced requirements based on existing data. New dosage forms require bioequivalence or comparative studies. New combinations (FDCs) require rationality justification and clinical evidence.

Accelerated Approval Provisions under 2019 Rules include priority review for serious conditions with unmet need, breakthrough therapy pathway for substantial improvement, conditional approval based on surrogate endpoints, and rolling submission for priority products. These provisions are relatively new with evolving implementation.

Post-Approval Requirements for marketed products include periodic safety update reports (PSURs), post-marketing surveillance, labeling updates as required, and variation applications for changes.

NDA Success Factors include complete and high-quality dossier, proactive communication with CDSCO, addressing queries promptly and thoroughly, inspection readiness, and experienced regulatory affairs team.

Common NDA Deficiencies include incomplete stability data, manufacturing process validation gaps, clinical data quality issues, inconsistent documentation, and labeling non-compliance.',
        '["Develop NDA submission strategy and timeline", "Prepare CTD-format dossier with all required modules", "Conduct pre-submission quality review of application", "Establish communication plan with CDSCO during review"]'::jsonb,
        '["NDA Submission Checklist with CTD requirements", "CTD Module Templates for quality and clinical sections", "Regulatory Timeline Planning Tool", "Query Response Strategy Guide"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 40-44: Additional registration lessons (condensed)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        40,
        'Biosimilar Approval Pathway',
        'India has been a leader in biosimilar development and approval, with the first biosimilar approved in 2000. The Similar Biologics Guidelines 2016 provide a clear regulatory pathway. India''s biosimilar market is Rs 20,000 crore and growing at 15% annually, offering significant opportunities for biotech companies.

Similar Biologics Guidelines 2016 provide the regulatory framework. Definition covers biological products similar to approved reference biological products, without meaningful clinical differences in safety, purity, and potency. Regulatory pathway requires demonstration of similarity through quality, non-clinical, and clinical comparisons.

Biosimilar Development Requirements include Quality (Analytical) Similarity requiring comprehensive physicochemical characterization, biological activity comparison, impurity profile comparison, and statistical comparison methodology. Structure, purity, potency, and other quality attributes must be highly similar.

Non-clinical Similarity Assessment requires comparative in vitro studies (receptor binding, biological activity), comparative in vivo PK study (usually in relevant animal species), and toxicology assessment (at least one repeat-dose comparative study). Reduced package compared to originator development.

Clinical Similarity Demonstration requires comparative PK study (bioequivalence demonstration), comparative PD study if feasible and relevant, comparative efficacy and safety study (may be required), and immunogenicity assessment.

Reference Biologic Selection must be approved in India or specified countries. Same reference should be used throughout development. Sourcing considerations include supply continuity.

Extrapolation of Indications may be allowed based on totality of evidence if mechanism of action is same, target is same across indications, and similarity demonstrated is relevant to all indications. Regulatory discussion recommended before relying on extrapolation.

Interchangeability is not currently addressed in Indian guidelines. Automatic substitution provisions do not exist. May evolve with more experience.

Biosimilar Market Entry Strategy includes target product selection (large market biologics with patent expiry), reference product analysis (characterization and IP assessment), development timeline (typically 6-8 years), and manufacturing investment (Rs 200-500 crore for biologics facility). Key success factors include analytical capability excellence, regulatory expertise, manufacturing quality, and commercial partnerships.

Indian Biosimilar Success Stories include Biocon Semglee (insulin glargine) approved in US, Zydus Cadila biosimilars in multiple markets, Dr. Reddy''s rituximab and other biosimilars, and Reliance Life Sciences filgrastim.',
        '["Assess biosimilar opportunities against portfolio criteria", "Develop biosimilar development plan with regulatory strategy", "Build analytical capabilities for biosimilar characterization", "Establish reference product sourcing strategy"]'::jsonb,
        '["Similar Biologics Guidelines 2016 Summary", "Biosimilar Development Planning Template", "Analytical Similarity Assessment Framework", "Reference Product Sourcing Guide"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: BIRAC & Government Funding (Days 45-50)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'BIRAC & Government Funding',
        'Access government funding through BIRAC programs (BIG, SBIRI, AcE Fund), DBT grants, DST schemes, and state biotech policies for non-dilutive capital.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- Day 45: BIRAC Funding Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        45,
        'BIRAC Funding Programs',
        'BIRAC (Biotechnology Industry Research Assistance Council) is the primary government funding agency for biotech innovation in India. Since 2012, BIRAC has supported 1,500+ startups with Rs 2,500 crore in funding. BIRAC programs cover different stages from ideation to commercialization, providing crucial non-dilutive capital for biotech development.

BIG (Biotechnology Ignition Grant) is the flagship early-stage program. Funding amount is up to Rs 50 lakh as grant (no equity). Eligibility covers startups, entrepreneurs, and researchers with innovative ideas. Focus is on proof-of-concept for novel biotech products or technologies. Duration is 18 months. Selection involves application review and presentation to selection committee.

Application requirements include technical proposal with innovation description, team credentials and capability, work plan with milestones, budget justification, and IP status and strategy. Success rate is approximately 15-20%. 400+ grants awarded to date. Application cycles are typically quarterly with announcements on BIRAC website.

SBIRI (Small Business Innovation Research Initiative) is for late proof-of-concept to early development. Funding amount up to Rs 1 crore for Phase I and Rs 5 crore for Phase II as grant-in-aid. Eligibility covers companies registered in India with biotech focus. Focus is on advanced development towards commercialization. Duration is Phase I of 12-18 months and Phase II of 24-36 months.

BIPP (Biotechnology Industry Partnership Programme) provides high-risk, high-reward partnership support. Funding amount up to Rs 15-20 crore with cost sharing (50-70% from BIRAC). Eligibility covers established companies with development capability. Focus is on late-stage development, clinical trials, and scale-up. Requires significant company investment matching.

SPARSH (Social Innovation Programme for Products Affordable and Relevant to Societal Health) provides grant support for affordable healthcare solutions. Focus is on products addressing public health challenges. Requirements include affordability commitment and social impact orientation.

AcE Fund (Accelerating Entrepreneurs) is equity funding. Funding amount is up to Rs 1 crore as equity investment. Co-investment with approved partners. Eligibility covers BIRAC-supported startups seeking growth capital. Newer program with evolving parameters.

BIRAC Application Best Practices include clear articulation of innovation and differentiation, strong team with relevant expertise, realistic milestones and budget, IP strategy alignment, and market potential demonstration. Common rejection reasons are lack of novelty or differentiation, weak team capabilities, unrealistic projections, and incomplete applications.

BIRAC Network Benefits beyond funding include BioNEST incubation support, mentorship and networking, industry connections, and follow-on funding pathways.',
        '["Identify appropriate BIRAC program for your development stage", "Develop BIRAC application with strong technical and commercial case", "Build relationships with BIRAC-supported incubators", "Create milestone-based development plan for funding proposal"]'::jsonb,
        '["BIRAC Program Comparison Guide", "BIG Application Template with tips", "SBIRI Proposal Format and guidelines", "BIRAC Success Story Database for inspiration"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 46-50: Additional funding and state policy lessons (condensed)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_9_id,
        46,
        'DST, ICMR and Other Government Funding',
        'Beyond BIRAC, multiple government agencies provide funding for biotech research and development. Strategic use of these diverse funding sources can significantly extend runway and reduce dilution. Understanding the landscape enables optimal funding mix for different development stages.

DST (Department of Science and Technology) Programs include NIDHI-PRAYAS providing up to Rs 10 lakh for prototype development through Technology Business Incubators. NIDHI-EIR provides Rs 3.75 lakh monthly as fellowship for entrepreneurs-in-residence. NIDHI-SEED provides up to Rs 1 crore for startups through TBIs. TDP (Technology Development Programme) provides Rs 50 lakh to Rs 2 crore for technology development.

ICMR (Indian Council of Medical Research) Funding focuses on health research. Ad-hoc research projects provide Rs 10-50 lakh for investigator-initiated research. Task Force studies provide larger funding for programmatic research. Industry collaboration provides co-funded research partnerships.

CSIR (Council of Scientific and Industrial Research) Programs include FTT (Fast Track Translational) projects and technology licensing from CSIR labs. Collaboration opportunities with 38 CSIR laboratories.

DBT (Department of Biotechnology) Programs beyond BIRAC include DBT Research Grants for academic research and Centres of Excellence funding.

State Biotech Policies provide additional support. Karnataka Biotech Policy offers capital subsidy up to 20%, stamp duty exemption, quality certification reimbursement, and Bangalore Bio cluster benefits. Telangana Life Sciences Policy offers land at subsidized rates, capital subsidy provisions, and Genome Valley infrastructure. Maharashtra Biotech Policy provides incentives for biotech manufacturing and R&D investment support. Gujarat Biotech Policy offers capital subsidy, interest subsidy, and single-window clearance.

Combining Government Funding Sources requires understanding that most programs can be combined with non-overlapping costs. Approach should be staged funding aligned with development milestones. Compliance consideration is that each funder has reporting requirements. Example pathway would be PRAYAS for prototype followed by BIG for proof of concept, then SBIRI for development, then BIPP for scale-up.

Government Funding Best Practices include building relationship with program managers, attending BIRAC workshops and events, seeking feedback on unsuccessful applications, and maintaining excellent compliance and reporting.',
        '["Map all relevant government funding programs to development plan", "Apply to multiple complementary programs strategically", "Leverage state biotech policies for location decisions", "Build relationships with funding agency program managers"]'::jsonb,
        '["Government Funding Programs Directory", "State Biotech Policy Comparison Matrix", "Funding Combination Strategy Guide", "Program Manager Contact Database"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Diagnostics & Medical Devices (Days 51-54)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Diagnostics & Medical Devices',
        'Navigate Medical Device Rules 2017, IVD regulations, CDSCO device registration, and quality management systems for diagnostic and device development.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Day 51: Medical Device Rules 2017
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_10_id,
        51,
        'Medical Device Rules 2017 Overview',
        'Medical Device Rules 2017 established a comprehensive regulatory framework for medical devices in India, separating device regulation from drugs. India''s medical device market is Rs 70,000 crore and growing at 15% annually. Understanding the device regulatory pathway enables faster market access compared to drug development timelines.

Medical Device Classification determines regulatory requirements. Class A devices are low risk (non-invasive, temporary contact) such as tongue depressors and examination gloves. Class B devices are low-moderate risk such as hypodermic needles and suction equipment. Class C devices are moderate-high risk such as ventilators and bone fixation devices. Class D devices are high risk such as heart valves and implantable defibrillators.

IVD (In Vitro Diagnostic) Classification also follows risk categories. Class A IVDs are low risk such as specimen receptacles. Class B IVDs are moderate risk such as pregnancy tests. Class C IVDs are high risk such as blood glucose monitors. Class D IVDs are highest risk such as HIV diagnostics and blood grouping.

Regulatory Pathways by Class vary significantly. Class A and B Registration requires application to CDSCO, documentation of quality management system, device master file submission, and timeline of 45-90 days. Class C and D Approval requires more extensive application, clinical data may be required, manufacturing site inspection, and timeline of 90-180 days.

Manufacturing License Requirements under the rules include site and facility requirements meeting QMS standards, equipment and personnel qualifications, quality management system per ISO 13485, and state licensing plus CDSCO approval for notified devices.

Import Registration for foreign devices requires authorized Indian agent appointment, application with device documentation, clinical data as applicable, and Indian distributor arrangements.

Clinical Investigation Requirements for devices vary by risk and novelty. Class A and B typically do not require clinical investigation. Class C and D may require clinical investigation. Pre-market clinical study requires CDSCO approval.

Quality Management System Requirements call for ISO 13485 compliance for medical device manufacturers, design and development controls, production and process controls, and post-market surveillance.

Device Master File Contents include device description and intended use, design and manufacturing specifications, performance specifications, labeling and packaging, and quality control procedures.

Medical Device Market Opportunity in India shows the market growing from Rs 70,000 crore to Rs 1.5 lakh crore by 2030. High import dependence (70-80% imported) presents domestic manufacturing opportunity. Focus areas include diagnostics, implants, and digital health devices.',
        '["Determine device classification for your products", "Assess regulatory pathway requirements based on classification", "Implement ISO 13485 quality management system", "Prepare device registration dossier"]'::jsonb,
        '["Medical Device Classification Guide", "MDR 2017 Registration Checklist", "ISO 13485 Implementation Guide", "Device Master File Template"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Contract Research & Manufacturing (Days 55-57)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Contract Research & Manufacturing',
        'Leverage Indian CRO/CDMO ecosystem for development services, manufacturing partnerships, and global contract opportunities in the CRAMS sector.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_11_id;

    -- Day 55: CRO/CDMO Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_11_id,
        55,
        'Indian CRO/CDMO Landscape',
        'India''s Contract Research and Manufacturing Services (CRAMS) sector is worth Rs 40,000 crore and growing at 12% annually. For biotech startups, outsourcing to CROs and CDMOs enables capital-efficient development without building all capabilities in-house. Understanding the landscape enables optimal partner selection.

CRO (Contract Research Organization) Services cover discovery services including target identification, hit-to-lead optimization, and medicinal chemistry. Pre-clinical services include pharmacology, toxicology, and DMPK. Clinical services include trial management, data management, and regulatory affairs.

Major Indian CROs include Syngene International providing integrated discovery to development at Rs 3,000 crore revenue. Lambda Therapeutic Research specializes in clinical research with 25+ years experience. Veeda Clinical Research focuses on BA/BE and early phase clinical trials. Lotus Labs provides bioanalytical and clinical services. Jubilant Biosys offers discovery and development services.

CDMO (Contract Development and Manufacturing Organization) Services cover process development including scale-up and technology transfer, clinical manufacturing for trial supplies, and commercial manufacturing for registered products.

Major Indian CDMOs include Piramal Pharma Solutions for API and formulation CDMO. Aragen Life Sciences (formerly GVK Biosciences) provides discovery to manufacturing. Kemwell Biopharma specializes in biologics CDMO. Laurus Labs provides API development and manufacturing. Biocon Biologics offers biologics contract manufacturing.

CRO/CDMO Selection Criteria include capability alignment (relevant expertise and experience), regulatory compliance (GLP, GMP certifications as required), capacity availability (timeline compatibility), quality systems (track record and references), and cost competitiveness (value rather than lowest cost).

Engagement Models vary by need. Fee-for-service involves fixed price for defined scope and is most common. FTE-based pricing uses dedicated resources at hourly/daily rates. Risk-sharing provides milestone-based payments with success bonuses. Partnership involves equity or royalty arrangements for deeper alignment.

Quality Agreement Requirements for outsourcing cover responsibilities and scope definition, quality standards and specifications, change control procedures, deviation and CAPA handling, audit rights, and regulatory inspection handling.

Managing CRO/CDMO Relationships requires clear scope and expectations, regular communication and oversight, milestone tracking and review, quality monitoring, and relationship management beyond contract.

Build vs Outsource Decision Factors include capital efficiency (outsourcing preserves capital), capability building (insourcing builds long-term capabilities), control and flexibility, competitive advantage (what should be proprietary), and volume and continuity requirements.',
        '["Assess capabilities needed for development program", "Identify and shortlist potential CRO/CDMO partners", "Develop RFP for key outsourcing requirements", "Establish partner management framework"]'::jsonb,
        '["Indian CRO/CDMO Directory with capabilities", "Partner Selection Criteria Checklist", "RFP Template for CRO/CDMO services", "Quality Agreement Template"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 12: Biotech Business Development (Days 58-60)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Biotech Business Development',
        'Master biotech deal-making including licensing, partnerships, M&A, and exit strategies for value realization and commercial success.',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_12_id;

    -- Day 58: Biotech Deal Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_12_id,
        58,
        'Biotech Deal Structures and Partnerships',
        'Business development is critical for biotech value creation, enabling access to capital, capabilities, and markets. Indian biotech deals have grown significantly, with Rs 5,000 crore in partnership and licensing deals annually. Understanding deal structures enables optimal value capture and strategic positioning.

Licensing Deal Structures include Out-licensing where you license your technology/product to another party. Components include upfront payment (Rs 10 lakh to Rs 500 crore depending on stage and potential), milestone payments (development, regulatory, commercial), royalties (5-15% of net sales typically), and territory and field definitions. Value increases with development stage progression.

In-licensing involves acquiring rights from others for your development and commercialization. Considerations include upfront cost versus milestone-heavy structures, manufacturing rights, and exclusivity scope.

Co-development Partnerships involve shared development costs and responsibilities, joint IP ownership or defined allocation, profit sharing in defined territories, and governance structures for decision-making.

Research Collaboration types include sponsored research with academic institutions, joint research programs with industry partners, and fee-for-service versus milestone-based structures.

Manufacturing Partnerships include supply agreements for products you market, contract manufacturing for third parties, and technology transfer arrangements.

Deal Valuation Approaches include risk-adjusted NPV using DCF with probability of success factors and discount rates of 15-25% for biotech. Comparables analysis uses similar deals as benchmarks with databases like Biopharma Dealmakers. Cost-based valuation uses development cost invested as floor value.

Negotiation Considerations include understanding partner''s strategic priorities, maintaining optionality where possible, balancing upfront value versus long-term potential, protecting core IP and strategic flexibility, and clear governance and decision rights.

Indian Biotech Partnership Examples include Biocon-Mylan (now Viatris) with a global biosimilar partnership, Dr. Reddy''s-Merck Serono collaboration, and numerous Serum Institute partnerships.

Deal Process typically takes 6-12 months with stages including partner identification and outreach, confidentiality agreement, due diligence, term sheet negotiation, definitive agreement, and closing and implementation.

Business Development Function Requirements include market and competitive intelligence, relationship building with potential partners, deal structuring expertise, project management for deal process, and cross-functional coordination.',
        '["Develop business development strategy aligned with corporate goals", "Identify potential partnership targets in priority areas", "Build deal valuation capability with financial modeling", "Create partnership pitch materials and data room"]'::jsonb,
        '["Deal Structure Framework for biotech transactions", "Licensing Term Sheet Template", "Deal Valuation Model with risk adjustment", "Partnership Target Identification Guide"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 59-60: Exit Strategies and Final Lessons
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_12_id,
        59,
        'Exit Strategies and M&A',
        'Exit planning should begin early, shaping development strategy and value creation efforts. Indian biotech has seen significant exit activity including IPOs and acquisitions. Understanding exit pathways enables strategic positioning for value realization.

Exit Pathway Options include IPO (Initial Public Offering) with public market listing on BSE/NSE. Biotech IPOs have increased in India with examples including Syngene, Laurus Labs, and Gland Pharma. Requirements include financial track record, corporate governance, and SEBI compliance. Timing depends on market conditions and company maturity. Valuation multiples are 15-40x EBITDA for established biotech.

Trade Sale (M&A) involves acquisition by strategic buyer, typically pharmaceutical or larger biotech company. Premiums are often 30-100% over trading value. Drivers include pipeline assets, technology platforms, or market access.

Licensing as Exit involves significant licensing deal providing liquidity through upfront payment. May include milestone participation. Partial exit maintaining ongoing interest.

Secondary Sale involves sale of shares to financial or strategic investor without company sale. Provides liquidity for existing investors. May include management participation.

M&A Process for Sellers takes 6-12 months and involves preparation (information memorandum, data room), process (auction versus negotiated sale), due diligence, negotiation and documentation, closing conditions and execution.

Valuation in M&A uses multiple methodologies. Comparable transactions uses similar biotech acquisitions as benchmarks. DCF with probability adjustment accounts for pipeline risk. Strategic premium considers value to buyer beyond standalone. Sum-of-parts values multiple assets or programs separately.

Indian Biotech M&A Examples include Gland Pharma acquisition by Fosun Pharma for Rs 8,500 crore, Piramal acquiring Allergan generics, and various smaller technology acquisitions.

Exit Readiness Factors include IP strength and protection, regulatory pathway clarity, data quality and integrity, management team capability, clean corporate structure, and audited financials.

Planning for Exit involves setting exit timeline horizon, building value drivers systematically, maintaining optionality across pathways, developing relationships with potential acquirers, and keeping corporate structure clean and deal-ready.

Congratulations on completing P28 Biotech and Life Sciences! You now have comprehensive knowledge of building a biotech business in India. Success requires scientific excellence, regulatory expertise, and strategic business development. The opportunities in Indian biotech are immense. Your journey from here is about disciplined execution and continuous learning.',
        '["Develop exit strategy aligned with investor expectations", "Build exit readiness across identified value drivers", "Maintain relationships with potential strategic partners and acquirers", "Prepare company for due diligence at any time"]'::jsonb,
        '["Exit Strategy Planning Framework", "M&A Process Guide for biotech sellers", "Due Diligence Preparation Checklist", "Valuation Methodology Guide for biotech"]'::jsonb,
        120,
        100,
        1,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P28 Biotech & Life Sciences course created successfully with 12 modules and 60 days of lessons';

END $$;

COMMIT;
