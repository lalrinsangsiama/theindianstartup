-- THE INDIAN STARTUP - P9: Government Schemes & Funding Mastery - Enhanced Content
-- Migration: 20260204_009_p9_govt_schemes_enhanced.sql
-- Purpose: Enhance P9 course content to 500-800 words per lesson with India-specific government scheme data
-- Duration: 21 days, 4 modules covering Startup India, SIDBI, BIRAC, DST, MSME schemes, and compliance

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_module_1_id TEXT;
    v_module_2_id TEXT;
    v_module_3_id TEXT;
    v_module_4_id TEXT;
BEGIN
    -- Get or create P9 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P9',
        'Government Schemes & Funding Mastery',
        'Access Rs 50 lakhs to Rs 5 crores in government funding through systematic scheme navigation. India''s most comprehensive guide to 200+ central and state government schemes for startups - from Startup India recognition to SIDBI Fund of Funds, BIRAC biotech grants, DST NIDHI programs, MSME schemes, and MUDRA loans. Master eligibility criteria, application processes, and post-approval compliance.',
        4999,
        false,
        21,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P9';
    END IF;

    -- Clean existing modules and lessons for P9
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Government Scheme Landscape (Days 1-5)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Government Scheme Landscape',
        'Understand the complete government funding ecosystem in India - from central ministries to state governments. Learn to identify, evaluate, and prioritize schemes worth Rs 8.5 lakh crore in annual disbursements.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Government Funding Ecosystem Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Government Funding Ecosystem Overview',
        'India''s government funding ecosystem represents one of the world''s largest sources of startup capital, with annual disbursements exceeding Rs 8.5 lakh crore across 200+ schemes. Yet less than 5% of eligible startups access these funds due to lack of awareness, complex application processes, and perceived bureaucratic hurdles. This module transforms you into a government funding expert.

The ecosystem operates across four hierarchical levels: Central Government Ministries (DPIIT, MSME, DST, DBT, MeitY), Autonomous Bodies (SIDBI, NABARD, BIRAC, NSIC), State Governments (28 states + 8 UTs with individual startup policies), and District-Level Implementation (DICs, KVIC, PMEGP). Each level offers distinct schemes with varying eligibility criteria, funding amounts, and application processes.

Key funding categories for startups: Equity/Venture Funding (SIDBI Fund of Funds Rs 10,000 Cr allocation, BIRAC BIG Rs 50L grants), Soft Loans (MUDRA Rs 10L-Rs 10Cr, CGTMSE collateral-free up to Rs 5Cr), Grants & Subsidies (PRAYAS Rs 10L, NIDHI-SSS Rs 10L-Rs 1Cr, PLI schemes), Interest Subvention (PMEGP 15-35% subsidy, Technology Upgradation 5% interest subsidy), and Tax Benefits (80-IAC 3-year tax holiday, Angel Tax exemption under Section 56).

Understanding the funding timeline is critical. Government schemes operate on financial year cycles (April-March), with most call-for-proposals issued in Q1 (April-June). Application windows typically remain open for 30-90 days. Processing times vary: DPIIT recognition takes 2-7 days, SIDBI applications 30-60 days, BIRAC grants 90-120 days, and state schemes 60-90 days. Plan your applications 6 months ahead.

The "scheme stacking" strategy allows eligible startups to access multiple non-overlapping schemes simultaneously. A biotech startup could potentially access: DPIIT recognition + BIRAC BIG grant (Rs 50L) + NIDHI-SSS (Rs 25L) + State biotech subsidy (Rs 15L) + CGTMSE loan (Rs 1Cr) = Rs 1.9Cr+ in total benefits. However, compliance requirements multiply with each scheme.

Common misconceptions debunked: Government funding is not "free money" - it comes with strict utilization norms, reporting requirements, and audit obligations. Political connections are not required - 95% of schemes have merit-based selection. Processing is not always slow - Startup India recognition now takes 2-7 days. Small startups can compete - many schemes specifically target early-stage companies.

Success factors: Documentation readiness (keep all certificates, registrations, and financials updated), timing (apply in Q1-Q2 when budgets are fresh), persistence (first applications often get rejected - learn and reapply), and relationships (build connections with scheme officers who can guide you through processes).',
        '["Map all government funding sources relevant to your startup - create a Funding Ecosystem Matrix with ministry, scheme name, amount, eligibility, and application window", "Identify your top 10 priority schemes based on eligibility match, funding amount, and application feasibility - rank by ROI (funding amount vs application effort)", "Calculate your total potential government funding: sum all schemes you could theoretically access if fully compliant - this becomes your North Star target", "Create a 12-month scheme application calendar with key dates: FY start, budget announcements, call-for-proposals, and application deadlines"]'::jsonb,
        '["Government Funding Ecosystem Map - visual hierarchy of 200+ schemes by ministry and category", "Ministry-wise Scheme Directory with scheme officer contact details and portal links", "Funding Amount Calculator - estimate total accessible funding based on your profile", "12-Month Scheme Calendar Template with historical application window data"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Startup India & DPIIT Recognition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Startup India & DPIIT Recognition',
        'Startup India, launched in 2016, is the flagship program transforming India''s entrepreneurial landscape. As of 2024, over 1.12 lakh startups have received DPIIT recognition, with 56% from Tier 2/3 cities. DPIIT recognition is the gateway to Rs 10,000+ crore in benefits and should be your first government funding milestone.

Eligibility criteria for DPIIT recognition: Entity age up to 10 years from incorporation (extended from original 7 years), Annual turnover not exceeding Rs 100 crore in any financial year, Entity type must be Private Limited, LLP, or Registered Partnership Firm (Sole proprietorships not eligible), Working towards innovation/improvement of products, processes, or services with scalable business model, and Not formed by splitting or reconstructing an existing business.

Benefits unlocked with DPIIT recognition: Self-Certification under 6 labor and 3 environmental laws (reduces compliance burden significantly), 80-IAC Tax Exemption eligibility (100% income tax exemption for 3 consecutive years out of first 10 years - requires Inter-Ministerial Board approval), Angel Tax Exemption under Section 56(2)(viib) - crucial for startups raising funds above fair market value, Fast-tracked Patent Application (80% rebate on patent filing fees plus expedited examination), Easy Winding Up (90 days vs standard 180 days under Insolvency Code), and Access to Government tenders reserved for startups (Rs 25,000 crore annual procurement).

The application process is straightforward: Register on Startup India Hub portal (startupindia.gov.in), fill the online application form with company details, upload incorporation certificate, describe your innovation (this is the most critical section), and submit. Processing time is 2-7 working days with 90%+ approval rate for genuine applications.

Critical tip for the "innovation" section: DPIIT looks for innovation in product, service, process, or business model. Generic descriptions like "we provide better service" get rejected. Specific descriptions work: "Our AI algorithm reduces loan default prediction error by 40% compared to traditional credit scoring, enabling lenders to serve 50 lakh additional MSME borrowers." Include quantifiable improvements, technical differentiators, and scalability potential.

Post-recognition steps: Apply for 80-IAC tax exemption (requires IMB approval, 60-90 day process), register on GeM (Government e-Marketplace) for Rs 3 lakh crore+ procurement opportunities, update all marketing materials with DPIIT recognition number, and connect with Startup India Hub for mentor matching and funding support.

Common rejection reasons and solutions: Ineligible entity type (convert to Pvt Ltd if needed), inadequate innovation description (rewrite with specific technical details), turnover exceeding Rs 100 Cr (not applicable for most early-stage), and form errors (review carefully before submission). Rejected applications can be resubmitted after addressing feedback.',
        '["Complete the DPIIT Recognition Application - register on Startup India Hub and gather all required documents: Certificate of Incorporation, PAN, brief about the entity, and innovation description", "Draft your innovation description using the 4-part framework: Problem Statement, Your Solution, Innovation Element, and Scalability Potential - aim for 500 words with specific metrics", "Register on GeM (gem.gov.in) as a seller to access Rs 3 lakh crore government procurement opportunities - complete all verification steps", "Create a post-recognition action plan: 80-IAC application timeline, patent filing if applicable, tender identification, and scheme applications enabled by recognition"]'::jsonb,
        '["DPIIT Recognition Application Checklist with document requirements and format specifications", "Innovation Description Template with 10 approved examples across sectors (SaaS, HealthTech, AgriTech, FinTech)", "GeM Registration Guide with category selection and catalog upload instructions", "Post-Recognition Benefits Tracker - which benefits to activate first and timeline"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: SIDBI Fund of Funds & Venture Funding
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'SIDBI Fund of Funds & Venture Funding',
        'SIDBI (Small Industries Development Bank of India) manages the Rs 10,000 crore Fund of Funds for Startups (FFS), India''s largest government-backed startup investment program. Unlike direct grants, FFS operates as an LP (Limited Partner) in SEBI-registered AIFs, which then invest in startups. Understanding this structure is crucial for accessing equity funding.

How Fund of Funds works: Government allocates Rs 10,000 Cr to SIDBI as Fund Manager. SIDBI commits capital to 100+ SEBI-registered Alternative Investment Funds (AIFs). These AIFs invest in DPIIT-recognized startups. Startups receive equity investment (not grants or loans). Typical investment size: Rs 25L to Rs 25Cr per startup depending on AIF focus.

SEBI-registered AIFs funded by FFS include: Chiratae Ventures (tech-focused, Rs 5-50 Cr tickets), Blume Ventures (early-stage, Rs 50L-5 Cr), pi Ventures (deep-tech, Rs 2-15 Cr), Ankur Capital (impact, Rs 1-10 Cr), 3one4 Capital (consumer tech, Rs 2-20 Cr), and 50+ more. The full list is available on SIDBI''s website.

Accessing FFS-backed investment: DPIIT recognition is mandatory (apply first if not done). No direct application to SIDBI - you must approach participating AIFs. Prepare standard VC pitch materials: deck, financials, data room. Highlight government scheme eligibility in your pitch. AIF selection criteria typically include: scalable business model, strong founding team, large addressable market, and product-market fit evidence.

Beyond Fund of Funds, SIDBI offers direct schemes: SIDBI Make in India Soft Loan Fund (SMILE) - loans from Rs 25L to Rs 10Cr at 8-9% interest for manufacturing startups; Samridhi Fund - Rs 500 Cr for social enterprises in Tier 2/3 cities; and SIDBI Startup Mitra - online platform connecting startups with lenders and investors.

Credit Guarantee for Startups: SIDBI operates the Credit Guarantee Scheme for Startups (CGSS) providing collateral-free loans up to Rs 10 Cr. Banks lend to startups with CGSS guarantee covering 80% of default risk (90% for women-led startups). Processing: Apply through any CGSS-empaneled bank (40+ banks participate). Fee: 0.75-2% annual guarantee fee on outstanding loan amount.

State-level SIDBI initiatives: SIDBI operates in partnership with state governments. Example: Karnataka SIDBI initiative provides Rs 50L loans at 4% interest for local startups. Tamil Nadu partnership offers subsidized working capital. Check your state''s SIDBI branch for local schemes.

Pro tip: SIDBI relationships are valuable beyond immediate funding. SIDBI-backed startups get preferential treatment in bank loans, government tenders, and follow-on funding. Include SIDBI engagement as a credibility signal in investor pitches.',
        '["Research and list 20 AIFs funded by SIDBI Fund of Funds that match your sector, stage, and ticket size - include contact information for each", "Apply to SIDBI Startup Mitra platform (startups.sidbi.in) to create your investment-ready profile and access connected lenders", "Identify CGSS-empaneled banks in your city - visit 3 banks to understand their startup lending process and requirements", "Prepare FFS-ready pitch materials: update your investor deck to highlight DPIIT recognition and government scheme compatibility"]'::jsonb,
        '["SIDBI Fund of Funds AIF Directory with 100+ participating funds, ticket sizes, and sector focus", "SIDBI Startup Mitra Registration Guide with profile optimization tips", "CGSS Application Template with required documents and bank approach strategy", "Government-Compatible Pitch Deck Template highlighting scheme eligibility and compliance readiness"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: DST Schemes - NIDHI, PRAYAS & Innovation Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'DST Schemes - NIDHI, PRAYAS & Innovation Programs',
        'The Department of Science & Technology (DST) is a startup founder''s best friend for innovation funding. Through its National Initiative for Developing and Harnessing Innovations (NIDHI) umbrella, DST offers grants from Rs 10 lakh to Rs 1 crore requiring no equity dilution. These programs specifically target technology-driven startups with innovative products.

NIDHI Program Components: NIDHI-PRAYAS (Promoting and Accelerating Young and Aspiring Innovators and Startups) - Rs 10 lakh grant for prototype development. Eligibility: Indian citizen with innovative idea, maximum 3 innovators per project, age 18-35 preferred (relaxable). No equity dilution, no repayment required. Implementation: Through 21 PRAYAS Centers across India including IITs, NITs, and incubators. Application: Through designated PRAYAS centers, continuous intake with quarterly evaluation. Success rate: Approximately 15-20% of applications.

NIDHI-SSS (Seed Support System) - Rs 10 lakh to Rs 1 crore for early-stage startups. Eligibility: DPIIT-recognized startup, hosted at approved Technology Business Incubator (TBI), less than 3 years old. Funding mix: Rs 25L as grant + remaining as soft loan at 5% interest. Implementation: Through 150+ approved TBIs across India. Application: Apply through your host incubator (incubator applies to DST on your behalf).

NIDHI-EIR (Entrepreneur-in-Residence) - Rs 30,000/month fellowship for up to 18 months. Target: Graduating students, researchers, or early entrepreneurs working on innovative ideas. Provides stipend plus incubation support. Application: Through approved incubators offering EIR program.

NIDHI-TBI (Technology Business Incubators) - Grants for incubators, not startups directly. However, startups can access TBI resources: office space, prototyping labs, mentor networks, and seed funding. Apply to join a NIDHI-TBI in your city.

NIDHI-Accelerator - Rs 20 lakh grant per startup selected for government-supported accelerator programs. Duration: 3-6 month accelerator with mentorship, market access, and demo days. Partners: Atal Incubation Centers, IIM Incubators, and private accelerators.

Application Strategy for DST Schemes: Step 1 - Identify your nearest PRAYAS center or approved TBI (list on dst.gov.in). Step 2 - Connect with incubator team and understand their intake cycles. Step 3 - Prepare technical proposal emphasizing innovation, prototype feasibility, and commercialization plan. Step 4 - Budget carefully - DST scrutinizes financial projections intensely. Step 5 - Highlight social impact and Make in India potential.

PRAYAS Application Timeline: Q1 (Apr-Jun) - Best time to apply, fresh annual budget. Evaluation takes 60-90 days. Funding disbursement in 2-3 tranches based on milestone achievement. 12-month project duration is standard.

Pro Tip: DST evaluators are scientists, not business people. Lead with technical innovation and scientific rigor, not market size or revenue projections. Include patent potential, publication possibilities, and research collaboration aspects.',
        '["Identify your nearest PRAYAS Center (21 centers across India) or NIDHI-TBI - contact them to understand application process and current intake status", "Draft a PRAYAS-style technical proposal: Problem Statement, Proposed Innovation, Prototype Plan, Technical Approach, Milestones, and Budget (Rs 10L breakdown)", "Research EIR programs if you''re a student/researcher transitioning to entrepreneurship - apply to 3 programs simultaneously", "Map the DST ecosystem relevant to your sector: NIDHI programs + sector-specific schemes (TDB for commercialization, SERB for research grants)"]'::jsonb,
        '["PRAYAS Center Directory with 21 centers, contact details, and sector specializations", "NIDHI Application Template with technical proposal format and budget template", "EIR Program Comparison Chart covering 50+ programs with stipend, duration, and benefits", "DST Scheme Navigator - decision tree for choosing the right program based on stage and needs"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: BIRAC & Biotech Funding
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'BIRAC & Biotech Funding',
        'The Biotechnology Industry Research Assistance Council (BIRAC) under the Department of Biotechnology (DBT) is India''s premier funding agency for life sciences innovation. With annual disbursements of Rs 1,000+ crore, BIRAC has funded 4,000+ startups across healthcare, agriculture, industrial biotech, and clean energy. If your startup involves biology, biochemistry, or life sciences, BIRAC should be your primary government funding target.

BIRAC''s Flagship Programs: BIG (Biotechnology Ignition Grant) - Rs 50 lakh grant for early-stage proof-of-concept. Eligibility: Indian company/LLP less than 5 years old, working on biotechnology innovation, validated by BIRAC Technical Expert Committee. No equity dilution. Duration: 18 months. Application: Continuous intake through BIRAC website, evaluated quarterly. Success rate: 8-10% (highly competitive, 3,000+ applications annually).

SEED Fund - Rs 30 lakh to Rs 1 crore for product development after BIG. Eligibility: Successfully completed BIG project or equivalent validation. Co-funding may be required (25-50% contribution). Duration: 24 months. Application: Through BIRAC incubator network.

SPARSH (Social Innovation for Products Affordable and Relevant to Societal Health) - Rs 50 lakh to Rs 5 crore. Focus: Affordable healthcare innovations for rural/underserved populations. Special emphasis on diagnostics, medical devices, and vaccine technologies. Higher funding for greater social impact.

CRS (Contract Research Scheme) - For industry-academia partnerships. Company contributes 50%, BIRAC matches with Rs 25L-1Cr. Encourages collaboration with research institutions for product development.

BIPP (Biotechnology Industry Partnership Programme) - Larger-scale funding Rs 50L to Rs 50Cr. Target: Later-stage companies with validated technology seeking commercialization support. Significant industry co-investment required (50% for large enterprises, 25% for startups).

BIRAC AcE Fund - Equity funding up to Rs 1.5 Cr through empaneled accelerators. Combines Rs 50L grant + Rs 1Cr equity investment. Requires incubation at BIRAC-supported centers.

Application Strategy: BIRAC evaluates on scientific merit (40%), innovation potential (30%), and commercial viability (30%). Expert committees include scientists, clinicians, and industry veterans. Key success factors: Strong IP potential, clear regulatory pathway, pilot data demonstrating feasibility, and competent team with domain expertise.

Sector Eligibility: Healthcare/Pharma (diagnostics, therapeutics, medical devices, digital health with biomarker component), Agriculture (crop improvement, biofertilizers, animal health, aquaculture), Industrial Biotech (biofuels, enzymes, bioplastics, waste-to-value), and Clean Energy (biohydrogen, algal biofuels, microbial fuel cells).

Critical Timeline: BIG applications reviewed quarterly (Jan, Apr, Jul, Oct). Apply at least 2 months before review cycle. Budget Rs 50L carefully - typical allocation: Personnel (40%), Consumables (30%), Equipment (20%), Travel/Training (10%). Post-approval, funds released in 3 tranches: 40% upfront, 30% at mid-review, 30% on completion.',
        '["Assess your BIRAC eligibility - confirm your product/service involves biotechnology, life sciences, or related domains using BIRAC''s sector definitions", "Prepare BIG-style technical proposal: Hypothesis, Innovation, Proof-of-Concept Plan, Commercialization Path, IP Strategy, Team Competence - aim for 15 pages", "Identify BIRAC BioNest incubators in your region (50+ centers) - schedule meetings with 3 potential host incubators", "Create a BIRAC application calendar: next review cycle date, document preparation timeline, internal review dates, and submission deadline"]'::jsonb,
        '["BIRAC Eligibility Assessment Tool - questionnaire to determine which scheme fits your startup", "BIG Grant Application Template with section-wise guidance and successful examples", "BioNest Incubator Directory with 50+ centers, sector focus, and current openings", "BIRAC Budget Planning Template with approved cost categories and allocation norms"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Eligibility & Application Strategy (Days 6-11)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Eligibility & Application Strategy',
        'Master the art of government scheme applications. Learn eligibility assessment, documentation requirements, proposal writing, and submission strategies that maximize approval rates.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 6: MSME Schemes & Registration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'MSME Schemes & Registration',
        'The Ministry of MSME operates 50+ schemes supporting India''s 6.3 crore MSMEs, with annual scheme disbursements exceeding Rs 20,000 crore. The cornerstone is Udyam Registration, mandatory for accessing any MSME benefit. Understanding MSME classification and registering correctly is essential for startups.

Udyam Registration (replacing Udyog Aadhaar): Free registration through udyamregistration.gov.in. Classification based on investment and turnover: Micro Enterprise - Investment up to Rs 1 Cr, Turnover up to Rs 5 Cr. Small Enterprise - Investment up to Rs 10 Cr, Turnover up to Rs 50 Cr. Medium Enterprise - Investment up to Rs 50 Cr, Turnover up to Rs 250 Cr. Registration is Aadhaar-based, PAN-linked, and provides a unique Udyam Registration Number (URN) valid for lifetime.

Key MSME Schemes for Startups: CLCSS (Credit Linked Capital Subsidy Scheme) - 15% capital subsidy on technology upgradation up to Rs 15 lakh. Eligible: Manufacturing MSMEs upgrading technology. Application: Through banks with subsidy from SIDBI.

TREAD (Trade Related Entrepreneurship Assistance and Development) - For women entrepreneurs. Grant up to Rs 30 lakh (30% of project cost). Requires partnership with NGO for implementation.

ZED Certification - Quality certification with financial support. Subsidized certification cost (50-80% government contribution). Opens doors to large corporate supply chains and government contracts.

SFURTI (Scheme of Fund for Regeneration of Traditional Industries) - Rs 2.5 Cr for cluster development. Target: Artisan clusters, khadi, coir, honey, handloom. Supports 1,000+ artisans per cluster.

Procurement Policy: 25% mandatory government procurement from MSMEs. 3% from women-owned MSMEs. Register on GeM and CPP (Central Public Procurement Portal) to access Rs 75,000+ crore annual opportunities.

Interest Subvention: 2% interest subvention on all MSME loans through PSU banks. Additional 3% for timely repayment. Automatic benefit - ensure your bank applies it.

PMEGP (Prime Minister Employment Generation Programme) - Subsidy 15-35% on projects up to Rs 50L (manufacturing) or Rs 20L (service). For new enterprises in rural/urban areas. Margin money subsidy: 25% (rural) / 15% (urban) for general category, 35% (rural) / 25% (urban) for special categories. Application: Through KVIC, KVIB, or DIC offices.

Cluster Development Programme (CDP) - Common Facility Centers for manufacturing clusters. Shared testing labs, design centers, raw material banks. Rs 10 Cr per cluster with 70% central grant.

Registration Strategy: Complete Udyam Registration first (Day 1). Register on GeM for procurement (Day 2-3). Apply for ZED certification (improves credibility). Identify applicable subsidy schemes based on your activities. Build relationship with local DIC (District Industries Centre) - they''re your scheme access point.',
        '["Complete Udyam Registration on udyamregistration.gov.in - ensure correct classification (Micro/Small/Medium) based on investment and turnover", "Register your business on GeM (gem.gov.in) as a seller - complete all verification steps to become eligible for government procurement", "Visit your local DIC (District Industries Centre) and introduce your startup - get a list of state-specific MSME schemes available in your district", "Calculate your PMEGP eligibility if applicable: new manufacturing/service enterprise, project cost within limits, and location criteria - prepare subsidy application if eligible"]'::jsonb,
        '["Udyam Registration Walkthrough with screenshot guide and common error solutions", "GeM Seller Registration Complete Guide with catalog upload and bid participation instructions", "DIC Scheme Directory by State with scheme officer contacts and document requirements", "PMEGP Eligibility Calculator and Application Template with subsidy amount estimation"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 7: MUDRA Loans & Collateral-Free Funding
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'MUDRA Loans & Collateral-Free Funding',
        'Pradhan Mantri MUDRA Yojana (PMMY) has disbursed Rs 23+ lakh crore to 40+ crore borrowers since 2015, making it India''s largest micro-lending program. For early-stage startups unable to provide collateral, MUDRA provides a critical funding pathway with loans up to Rs 10 lakh without security requirements.

MUDRA Loan Categories: Shishu - Loans up to Rs 50,000. For very early-stage businesses, first-time entrepreneurs. Minimal documentation, fastest approval (1-2 weeks). Interest: 10-12% depending on bank.

Kishor - Loans from Rs 50,001 to Rs 5,00,000. For businesses with some track record seeking working capital or expansion. Requires basic financial documents. Interest: 10-14%, tenure up to 5 years.

Tarun - Loans from Rs 5,00,001 to Rs 10,00,000. For established businesses with clear growth plans. Requires detailed project report, 6+ months bank statements. Interest: 11-15%, tenure up to 7 years.

Eligibility: Non-corporate, non-farm small/micro enterprises. Manufacturing, trading, and service sector eligible. Existing businesses or new enterprises. No collateral required for loans up to Rs 10 lakh. Women entrepreneurs, SC/ST/OBC get priority processing.

Application Process: Choose lending institution - PSU banks, private banks, MFIs, NBFCs all participate. Shishu loans through any MUDRA-approved lender. Kishor/Tarun preferably through PSU banks (SBI, Bank of Baroda, PNB have dedicated MUDRA desks). Documentation: Aadhaar, PAN, address proof, business registration (Udyam), 6-month bank statement, business plan/project report.

MUDRA Plus Schemes: Mahila Udhyami Scheme - Women-focused with slightly lower interest rates. MUDRA for SC/ST entrepreneurs - Priority processing, possible interest subvention. MUDRA for manufacturing - Preference for Make in India aligned ventures.

Interest Subvention: PMMY loans carry 2% interest subvention through banks. Additional state-level subvention may apply (check with your state). Effective interest can be 6-10% with all subventions applied.

Rejection Prevention: Most MUDRA rejections occur due to poor documentation or unrealistic projections. Prepare solid business plan with conservative revenue estimates. Show clear repayment capacity through cash flow projections. Maintain clean personal CIBIL score (650+ recommended). Avoid applying during bank''s quarter-end when targets are stressed.

Scaling Beyond MUDRA: MUDRA loans are capped at Rs 10 lakh. For larger requirements, graduate to: Stand-Up India (Rs 10L - Rs 1Cr for women/SC/ST), CGTMSE-backed loans (up to Rs 5Cr collateral-free), SIDBI loans (Rs 25L - Rs 10Cr), or NSIC schemes for manufacturing.

Pro Tip: MUDRA is often the first government credit. Successful repayment builds your credit history and relationship with lenders, enabling access to larger facilities later. Treat it as credit-building, not just immediate funding.',
        '["Calculate your MUDRA eligibility - determine which category (Shishu/Kishor/Tarun) matches your funding requirement and business stage", "Prepare MUDRA application package: Aadhaar, PAN, Udyam certificate, business plan, bank statements, and project report with realistic projections", "Visit 3 PSU bank branches in your area to understand their MUDRA process - compare interest rates, processing time, and additional requirements", "If eligible, complete Stand-Up India registration on standupmitra.in as a backup option for loans Rs 10L-1Cr (women/SC/ST entrepreneurs)"]'::jsonb,
        '["MUDRA Loan Eligibility Calculator with category recommendation based on your requirements", "MUDRA Business Plan Template meeting bank documentation standards", "Bank-wise MUDRA Interest Rate Comparison (25 major banks with current rates)", "Stand-Up India Registration Guide for women and SC/ST entrepreneurs"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 8: CGTMSE & Credit Guarantee Schemes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'CGTMSE & Credit Guarantee Schemes',
        'The Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) is a game-changer for startups seeking substantial funding without collateral. CGTMSE provides credit guarantee to banks, enabling collateral-free loans up to Rs 5 crore for MSMEs. Since inception, CGTMSE has facilitated Rs 6+ lakh crore in credit to 80+ lakh enterprises.

How CGTMSE Works: CGTMSE (joint initiative of SIDBI and GoI) guarantees loans to MSMEs. Banks lend to MSMEs with CGTMSE guarantee covering default risk. Guarantee coverage: 75% (general), 80% (women entrepreneurs, NER), 85% (micro enterprises with loans up to Rs 5L). If borrower defaults, CGTMSE pays the bank the guaranteed portion. Annual Guarantee Fee (AGF): 0.75% to 2% of loan outstanding, paid by borrower.

Loan Parameters: Maximum loan: Rs 5 crore (recently enhanced from Rs 2 crore). No collateral or third-party guarantee required. Tenure: 5-7 years for term loans, 1 year renewable for working capital. Interest: Bank''s MCLR + spread (typically 9-12% currently). Eligible activities: Manufacturing, service sector, retail trade.

Application Process: Step 1 - Prepare project report with detailed financials. Step 2 - Approach any CGTMSE Member Lending Institution (MLI) - 150+ banks and NBFCs participate. Step 3 - Bank evaluates proposal on merit (CIBIL score 650+, viable business plan). Step 4 - Bank sanctions loan and registers with CGTMSE. Step 5 - Bank disburses loan, borrower pays AGF. Processing time: 3-8 weeks depending on bank.

Documentation Requirements: Business plan / Project report with 5-year projections. Udyam Registration Certificate. Last 2-3 years ITR (for existing businesses). 12-month bank statements. KYC documents of promoters. Quotations for equipment/machinery (for term loans). Collateral valuation not required (that''s the point!).

CGSS (Credit Guarantee Scheme for Startups): Specifically for DPIIT-recognized startups. Higher guarantee coverage: 80% (90% for women-led startups). Maximum loan: Rs 10 crore. Managed by SIDBI through empaneled banks.

CGTMSE vs Traditional Loans: Without CGTMSE, banks demand 100-150% collateral. With CGTMSE, same loan available with zero collateral. AGF (1-2%) is far cheaper than collateral opportunity cost. However, personal guarantee of promoters is still typically required.

Success Tips: Choose banks with CGTMSE familiarity - PSU banks process more CGTMSE loans. Highlight job creation potential (banks track this for priority sector lending). Start with lower amount and scale up - successful Rs 25L loan makes Rs 1Cr loan easier. Maintain clean repayment record - 90-day delays can trigger CGTMSE invocation.

Pro Tip: Some startups approach CGTMSE-backed lending as "loss-covered debt" and take excessive risk. This is wrong. CGTMSE covers the bank''s loss, not your obligation. Default impacts your CIBIL, business reputation, and future credit access. Treat CGTMSE loans with same seriousness as any other debt.',
        '["Check your CGTMSE eligibility: MSME classification, sector eligibility, and loan amount requirement - use the CGTMSE eligibility tool", "Prepare a CGTMSE-ready project report with detailed financials, cash flow projections, and clear repayment schedule", "Identify 5 CGTMSE MLIs (Member Lending Institutions) in your city - prioritize PSU banks with dedicated MSME branches", "Calculate your total funding capacity using CGTMSE: maximum loan eligible + guarantee coverage percentage + estimated AGF cost over loan tenure"]'::jsonb,
        '["CGTMSE Eligibility Checker with sector and loan amount validation", "CGTMSE Project Report Template meeting bank standards with financial model", "MLI Bank Directory with CGTMSE-specialist branch contacts across cities", "AGF Calculator and Total Cost of Borrowing Comparison Tool"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 9: State Government Schemes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'State Government Schemes',
        'India''s 28 states and 8 Union Territories operate individual startup policies with combined annual disbursements exceeding Rs 15,000 crore. State schemes often provide faster approvals, higher subsidies, and more accessible support than central schemes. Strategic state selection and registration can unlock significant benefits.

Top State Startup Ecosystems (2024 DPIIT Rankings): Best Performers: Karnataka (Rs 2,000 Cr annual commitment, 10% seed funding subsidy), Gujarat (Rs 500 Cr fund, 25% capital subsidy), Maharashtra (Rs 5,000 Cr corpus, interest-free loans), Tamil Nadu (Rs 500 Cr fund, incubation subsidies), Telangana (T-Hub, Rs 100 Cr seed fund). Emerging Leaders: Kerala (KSUM schemes, Rs 2 Cr seed funding), Rajasthan (iStart, Rs 10L seed funding), Uttar Pradesh (Rs 1,000 Cr fund), Madhya Pradesh (Rs 50L seed funding), Odisha (Startup Odisha, Rs 10L prototype grant).

Common State Scheme Categories: Seed Funding: Rs 5L - Rs 50L grants/equity for early-stage startups. Typically requires incubation at state-approved center. Example: Karnataka offers Rs 50L seed funding with 10% equity.

Capital Subsidy: 15-35% subsidy on equipment, machinery, and infrastructure. Higher for manufacturing, priority sectors, and backward districts. Example: Gujarat provides 25% capital subsidy up to Rs 35L.

Interest Subvention: 5-9% interest subsidy on term loans. Reduces effective borrowing cost significantly. Example: Maharashtra offers 5% interest subvention for 5 years.

Rent Reimbursement: 50-100% rent subsidy for office/manufacturing space. Duration: 2-5 years typically. Example: Telangana reimburses 50% rent up to Rs 2L/month.

Patent/IP Support: Rs 2L - Rs 10L reimbursement on patent filing costs. Covers domestic and international patents. Example: Karnataka reimburses Rs 2L (Indian) / Rs 10L (international) patents.

Marketing/Exhibition Support: Rs 50K - Rs 5L for trade shows, exhibitions, and marketing. Supports market development activities. Example: Gujarat provides Rs 5L for participation in international exhibitions.

State Registration Process: Each state operates a dedicated startup portal. Registration typically requires: State incorporation/presence, startup declaration/affidavit, and basic documentation. Many states accept DPIIT recognition as automatic qualification.

Multi-State Strategy: Incorporate in startup-friendly state (Karnataka, Gujarat, Maharashtra). Operate/manufacture in states with specific industry subsidies. Establish R&D in states with innovation incentives. Hire in states with employment subsidies. Note: State schemes typically require registered presence (office, GST registration, employees) in that state.

Pro Tip: State schemes are often under-subscribed compared to central schemes. Competition is lower, processing faster, and scheme officers more accessible. Build relationships with your State Startup Nodal Officer - they can guide you through available schemes and expedite processing.',
        '["Map your state''s startup schemes - visit your state startup portal and list all applicable schemes with eligibility criteria and amounts", "Register on your state''s startup portal (if separate from DPIIT) - complete the registration process to become eligible for state benefits", "Schedule a meeting with your District Industries Centre (DIC) and State Startup Nodal Officer - understand priority schemes and application process", "Evaluate multi-state strategy: compare 3 potential states for incorporation, operations, and benefits - calculate total accessible incentives in each scenario"]'::jsonb,
        '["State-wise Startup Scheme Directory covering all 28 states + 8 UTs with scheme details", "State Startup Portal Registration Guide with URLs and documentation requirements", "DIC and State Nodal Officer Contact Directory for all states", "Multi-State Benefit Calculator comparing total incentives across different state combinations"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 10: Application Documentation Mastery
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Application Documentation Mastery',
        'Government scheme applications are document-intensive, and incomplete or incorrect documentation is the primary rejection reason (65% of rejections). Creating a comprehensive document repository and maintaining scheme-ready status reduces application time from weeks to days and dramatically improves approval rates.

Universal Documentation Requirements: Entity Documents: Certificate of Incorporation, MOA/AOA (for Pvt Ltd), Partnership Deed (for LLP/Partnership), PAN of entity, GST Registration Certificate, Udyam Registration Certificate, DPIIT Recognition Certificate, and Company/LLP registration extract.

Promoter Documents: Aadhaar and PAN of all directors/partners, Educational qualifications proof, Previous employment/experience certificates, Address proof (Passport/Voter ID/Utility Bill), Passport-size photographs, and Personal CIBIL/credit report.

Financial Documents: Audited financial statements (last 3 years), ITR acknowledgments (last 3 years), Bank statements (12-24 months), Projected financials (3-5 year projections), Cost of project and means of finance, and CA certificates for various declarations.

Operational Documents: Property lease/rental agreement, Key equipment/asset purchase documents, Major contracts and MOUs, Employee count documentation (PF/ESI), and IP registrations (if any).

Scheme-Specific Documents: Technical project proposal (innovation schemes), Business plan/DPR (loan schemes), Social impact assessment (impact schemes), R&D expenditure proof (R&D incentives), and Export documentation (export schemes).

Documentation Quality Standards: All certificates must be original or notarized copies. Documents should be self-attested by authorized signatory. Financial statements must be CA certified. Projections should be accompanied by assumption notes. Bilingual documents (English + regional) for state schemes.

Document Repository Best Practices: Create physical file + digital folder structure. Name files consistently: [Document Type]_[Entity Name]_[Date]. Keep multiple certified copies of frequently used documents. Update repository monthly with new financial data. Maintain version control for projections and business plans.

Common Documentation Errors: Mismatched company names across documents. Expired registrations or certificates. Unsigned or undated documents. Incomplete financial statements. Non-CA certified statements where required. Blurry or illegible scanned copies. Missing director/partner signatures.

Pre-Application Checklist: Entity compliance current (MCA filings, GST returns up to date). All registrations valid (Udyam, DPIIT, GST, PAN). Financial statements for latest FY available. Projections prepared with reasonable assumptions. All promoter documents collected and verified. Document repository organized and accessible.

Pro Tip: Invest in a good scanner and create high-quality PDF versions of all documents. Many online portals reject low-quality scans. Use consistent file naming and maintain a master checklist that you update monthly.',
        '["Audit your current document repository against the universal requirements checklist - identify all missing or outdated documents", "Create a standardized document repository structure: physical files + digital folders with consistent naming conventions", "Prepare CA-certified copies of all financial documents for the latest available financial year", "Build your scheme-ready master folder with 5 copies of universal documents ready for immediate application"]'::jsonb,
        '["Universal Government Scheme Documentation Checklist with 50+ document types", "Document Repository Template with folder structure and naming conventions", "CA Certificate Formats for common government scheme requirements", "Pre-Application Compliance Audit Checklist ensuring scheme-ready status"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- Day 11: Proposal Writing & Submission Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'Proposal Writing & Submission Strategy',
        'A well-crafted proposal is the difference between approval and rejection. Government evaluators review hundreds of applications - your proposal must be clear, compelling, and complete. This lesson provides the framework for writing winning proposals across all scheme types.

Proposal Structure for Grant/Subsidy Schemes: Executive Summary (1 page): Clear problem statement, your solution, funding ask, and expected outcomes. Write this last but place it first.

Organization Profile (2-3 pages): Entity details, team qualifications, track record, and infrastructure. Emphasize relevant experience and capability.

Problem Statement (2-3 pages): Quantify the problem with India-specific data. Show market size, current gaps, and why intervention is needed. Use government reports and publications as references.

Proposed Solution (5-8 pages): Technical approach and methodology. Innovation elements and differentiation. Implementation plan with milestones. Technology/IP if applicable. Scalability and replication potential.

Impact Assessment (2-3 pages): Direct beneficiaries and impact metrics. Job creation potential (government loves this). Social/environmental impact. Alignment with government priorities (Make in India, Atmanirbhar Bharat, etc.).

Financial Plan (3-5 pages): Total project cost with detailed breakdown. Funding sources (government ask + own contribution). Utilization timeline and cash flow. Sustainability beyond grant period.

Team & Governance (2-3 pages): Core team credentials. Advisory board/mentors. Governance structure. Risk mitigation.

Writing Best Practices: Use government terminology and align with scheme objectives. Be specific with numbers - avoid vague statements. Include credible third-party validation. Follow exact format if prescribed. Proofread multiple times - typos suggest carelessness.

Budget Preparation Guidelines: Categories: Personnel, Equipment, Consumables, Travel, Outsourcing, Contingency. Personnel: Market rates, not inflated (evaluators know salaries). Equipment: Get 3 quotations for items above Rs 50K. Contingency: Maximum 5% typically allowed. Own contribution: Show clearly if required. Justify every line item in notes.

Submission Strategy: Timing: Apply early in the window (not last day). Completeness: Triple-check all attachments. Hard copies: If required, courier well before deadline. Acknowledgment: Obtain submission receipt/ID. Follow-up: Note expected timeline and follow up appropriately.

Post-Submission Protocol: Track application status regularly. Respond to queries within 48 hours. Prepare for presentation/interview if called. Keep all original documents ready for verification. Do not make committed expenditures until approval confirmed.

Pro Tip: Build relationships with scheme officers before applying. Attend scheme workshops, clarification meetings, and industry consultations. Officers who recognize you and understand your work are more likely to provide guidance and expedite processing.',
        '["Write a complete proposal for your priority scheme using the standard structure - aim for 20-30 pages with all sections", "Prepare a detailed budget using the government format - include 3 quotations for major equipment items", "Identify upcoming scheme submission windows (next 6 months) and create your application calendar", "Practice your 5-minute proposal pitch - prepare for potential evaluation panel presentation"]'::jsonb,
        '["Government Proposal Template with section-by-section guidance and examples", "Budget Preparation Template in government-approved format with justification notes", "Scheme Window Calendar 2024-25 for major central and state schemes", "Proposal Evaluation Criteria Guide - how evaluators score applications"]'::jsonb,
        120,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Grant & Subsidy Navigation (Days 12-16)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Grant & Subsidy Navigation',
        'Deep dive into specific grant, subsidy, and incentive programs. Master SIDBI, MUDRA, CGTMSE, R&D grants, export incentives, and capital subsidies.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 12: PLI Schemes & Manufacturing Incentives
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        12,
        'PLI Schemes & Manufacturing Incentives',
        'The Production Linked Incentive (PLI) scheme represents India''s most ambitious manufacturing push - Rs 1.97 lakh crore committed across 14 sectors to boost domestic production and exports. While primarily designed for large manufacturers, startups can participate directly in select sectors or indirectly through value chain integration.

PLI Scheme Overview by Sector: Electronics & IT Hardware (Rs 7,325 Cr) - Mobile phones, laptops, tablets. Minimum investment: Rs 250 Cr for new entrants, Rs 1,000 Cr for existing. Incentive: 4-6% of incremental sales over 4-6 years.

Pharmaceuticals (Rs 15,000 Cr) - Bulk drugs and medical devices. Category 1 (bulk drugs): Minimum investment varies by product. Category 2 (medical devices): Lower thresholds, startup accessible. Incentive: 5-20% of incremental sales.

Telecom & Networking (Rs 12,195 Cr) - 4G/5G equipment, IoT devices. Minimum investment: Rs 10-100 Cr depending on category. Incentive: 4-7% of incremental sales.

Food Processing (Rs 10,900 Cr) - Ready-to-eat, marine products, mozzarella. Lower thresholds accessible to SMEs. Incentive: 4-10% of sales/export revenue.

Textiles (Rs 10,683 Cr) - MMF apparel, MMF fabrics, technical textiles. Minimum investment: Rs 100-300 Cr. Incentive: 7-11% based on investment and tenure.

White Goods (Rs 6,238 Cr) - ACs, LED lights. Minimum investment: Rs 7.5-100 Cr (lower for components). Incentive: 4-6% of incremental sales.

High-Efficiency Solar Modules (Rs 4,500 Cr) - Solar cells and modules. Minimum capacity: 1 GW. Incentive: Rs 2.5-3/Watt.

Auto Components (Rs 25,938 Cr) - Electric vehicles and components. Champion OEM or Component Champion categories. Incentive: 8-18% of sales.

Specialty Steel (Rs 6,322 Cr) - Coated steel, electrical steel. Minimum investment: Rs 300-1,000 Cr. Incentive: 4-12% of incremental sales.

Additional PLI Sectors: Drones (Rs 120 Cr), Advanced Chemistry Cell (Rs 18,100 Cr), and Semiconductor (Rs 76,000 Cr).

Startup Participation Strategies: Direct participation feasible in: Food Processing, Medical Devices, Drones, and Select Pharmaceutical APIs. Indirect participation through: Value chain supplier to PLI beneficiaries (B2B opportunities). OEM partnerships (co-manufacturing arrangements). Technology licensing to larger PLI participants. Component manufacturing for PLI end products.

Application Process: Applications through sector-specific ministry portals. Typically annual windows (check sector ministry websites). Detailed project report with investment and production commitment. Bank guarantee/security deposit often required. Performance monitoring through quarterly/annual reviews.

Compliance Requirements: Investment commitment within 2-3 years. Production/sales targets in years 3-6. Domestic value addition requirements. Annual audit by third party. Failure to meet targets results in incentive clawback.',
        '["Identify PLI schemes where your startup can participate directly - check minimum investment thresholds and eligibility criteria for each relevant sector", "If direct PLI participation is not feasible, map the value chain of 3 PLI sectors and identify B2B opportunities as a supplier or technology partner", "Study 5 PLI beneficiaries in your target sector - understand their vendor development needs and approach for partnerships", "Calculate potential PLI benefits if applicable: investment amount, expected sales, incentive rate, and total incentive over scheme tenure"]'::jsonb,
        '["PLI Scheme Summary Matrix with all 14 sectors, investment thresholds, and incentive rates", "PLI Value Chain Opportunity Map for startup participation in supplier/technology roles", "PLI Beneficiary Database with contact information for vendor development", "PLI Benefit Calculator for direct participation estimation"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 13: R&D Tax Incentives & Innovation Grants
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'R&D Tax Incentives & Innovation Grants',
        'India offers substantial tax incentives for research and development, with deductions ranging from 100-150% of R&D expenditure. Combined with DSIR recognition and sector-specific R&D grants, startups can significantly reduce tax liability while funding innovation.

Section 35(2AB) - Weighted Deduction for In-House R&D: Eligibility: Company engaged in manufacturing or providing services, with R&D facility approved by DSIR. Benefit: 100% deduction on revenue R&D expenditure (previously 150%, now 100% post-2020). 100% deduction on capital R&D expenditure with depreciation. Applicable to: R&D personnel salaries, consumables, equipment, utility costs for R&D facility.

DSIR Recognition Process: Apply to Department of Scientific & Industrial Research for R&D unit recognition. Requirements: Dedicated R&D space, qualified personnel, R&D program documentation, and minimum R&D spend. Processing: 90-180 days, annual renewal required. Benefits unlocked: Section 35(2AB) eligibility, customs duty exemption on R&D imports, and credibility for innovation grants.

Section 35(1)(ii) - Donations to Research Associations: If you sponsor research at approved institutions (IITs, IISc, CSIR labs). Benefit: 175% deduction on donation amount. Strategy: Partner with research institutions for joint R&D and claim donation deductions.

Patent Box Regime (Section 115BBF): Concessional tax rate of 10% on royalty income from patents. Applies to patents developed and registered in India. Significant benefit for IP-driven startups licensing technology.

Technology Development Board (TDB) Grants: Under DST, provides soft loans for technology commercialization. Funding: Rs 50L to Rs 10Cr at subsidized interest (5-7%). Eligibility: Indian company commercializing indigenous technology. Emphasis on Make in India and import substitution.

RKVY-RAFTAAR (Agri R&D): For agritech startups and incubators. Grants up to Rs 5L for idea validation, Rs 25L for prototype development. Through agri-business incubators across India.

MeitY R&D Schemes: For IT/electronics startups. TIDE 2.0: Rs 7 Cr per incubatee company. Multiplier Grants Scheme: Industry-academia R&D collaboration.

ICMR & DHR (Health R&D): For healthtech and medical research. Extramural Research: Rs 10L-1Cr for health research projects. Grand Challenges: Specific call-for-proposals with larger grants.

R&D Documentation Requirements: Clear separation of R&D and non-R&D expenses. Time tracking for R&D personnel. Equipment usage logs for R&D facilities. Project documentation linking expenses to R&D activities. Third-party validation for DSIR claims.

Tax Planning Strategy: Get DSIR recognition before March to claim current FY benefits. Maintain meticulous R&D expense documentation. Separate R&D cost center in accounting. File claims with ITR, supporting documents on request. Consider Patent Box for IP income structuring.',
        '["Evaluate your DSIR recognition eligibility - assess if you have dedicated R&D space, qualified personnel, and documented R&D activities", "Calculate your R&D expenditure for the current financial year - categorize into personnel, consumables, equipment, and overhead", "Identify research institution partnership opportunities for joint R&D and Section 35(1)(ii) deduction eligibility", "Prepare DSIR application if eligible - gather R&D program documentation, facility details, and personnel qualifications"]'::jsonb,
        '["DSIR Recognition Application Guide with eligibility checklist and documentation requirements", "R&D Expenditure Tracking Template with cost center categorization", "Research Institution Partnership Directory with collaboration contact points", "R&D Tax Benefit Calculator with Section 35(2AB) and Patent Box projections"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 14: Export Promotion Schemes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'Export Promotion Schemes',
        'India''s export incentive ecosystem offers 15-30% effective benefits on export revenue through duty remission, tax refunds, and promotional support. For startups with export potential, these schemes can transform unit economics and provide competitive advantage in global markets.

RoDTEP (Remission of Duties and Taxes on Exported Products): Replaced MEIS from January 2021. Refunds central/state duties and taxes not refunded under other schemes. Rates: 0.3-4.3% of FOB value depending on product category. 8555 tariff lines covered across sectors. Scrips transferable and tradeable on commodity exchanges.

SEIS (Service Exports from India Scheme): For service exporters (IT services, consulting, etc.). Rates: 3-7% of net foreign exchange earned. Covered services: IT/ITeS, tourism, healthcare, education, entertainment. Scrips can be used for import duty payment or sold.

EPCG (Export Promotion Capital Goods Scheme): Zero duty on capital goods imports. Export obligation: 6x duty saved over 6 years. Example: Import Rs 1Cr machinery at zero duty vs 10% duty (Rs 10L), export Rs 60L over 6 years. Beneficial for manufacturing exporters.

Advance Authorization: Duty-free import of inputs for export production. Actual user condition - cannot sell imported inputs domestically. Covered: Raw materials, components, consumables for export products.

DFIA (Duty Free Import Authorization): Post-export reward for duty-free imports. Based on SION (Standard Input-Output Norms). Transferable permits.

Export Credit: Interest Equalization Scheme - 3-5% interest subvention on export credit. ECGC (Export Credit Guarantee Corporation) - Insurance against buyer default. Export Factoring - Working capital against export receivables.

MAI (Market Access Initiative): Rs 25 Cr annual allocation for market development. Covers: Trade fair participation (up to Rs 5L per event), export promotion material, and market studies. Apply through EPCs (Export Promotion Councils).

Trade Infrastructure for Export Scheme (TIES): For states developing export infrastructure. Common testing labs, cold chains, warehouses. States apply, startups benefit from infrastructure.

SEZ Benefits: Tax holiday under Section 10AA (100% for 5 years, 50% for next 5 years). Duty-free imports for SEZ operations. GST exemption on supplies to SEZ units. Location in notified SEZ required.

Districts as Export Hubs: New initiative to develop district-level export capacity. District Export Promotion Committees (DEPCs) provide local support. Cluster-based incentives and infrastructure development.

Export Documentation Requirements: IEC (Import-Export Code) - mandatory for any export. Bill of Lading/Airway Bill. Shipping Bill. Invoice and Packing List. Certificate of Origin. FIRC (Foreign Inward Remittance Certificate) for SEIS claims.',
        '["Apply for IEC (Import-Export Code) on DGFT portal if not already obtained - essential for any export transaction", "Identify RoDTEP/SEIS rates applicable to your products/services using the DGFT rate finder tool", "Calculate potential export benefits: current/projected export revenue x applicable incentive rates across all schemes", "Register with relevant Export Promotion Council (EPC) for your sector - access MAI support and trade fair participation"]'::jsonb,
        '["IEC Application Guide with documentation requirements and portal walkthrough", "RoDTEP/SEIS Rate Finder Tool with all product and service categories", "Export Benefit Calculator projecting total incentives across all applicable schemes", "EPC Directory with sector-wise councils and membership benefits"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 15: Social Impact & CSR Funding
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Social Impact & CSR Funding',
        'India''s mandatory CSR regime (Section 135) creates a Rs 25,000+ crore annual funding pool for social impact initiatives. Impact-focused startups can access this capital through strategic positioning, Section 8 partnerships, and innovative program design that aligns corporate objectives with social outcomes.

CSR Landscape Overview: Mandatory CSR: Companies with net worth Rs 500 Cr+, turnover Rs 1,000 Cr+, or profit Rs 5 Cr+ must spend 2% of average net profit on CSR. Total pool: Rs 25,000-30,000 Cr annually (growing each year). Key spenders: Reliance Industries (Rs 1,000+ Cr), TCS (Rs 700+ Cr), HDFC Bank (Rs 650+ Cr), Infosys (Rs 350+ Cr), and thousands of mid-tier companies.

Schedule VII Eligible Activities: Education, Healthcare, Sanitation, Environment, Rural development, Sports, Art and culture, Armed forces welfare, Technology incubators for Schedule VII activities, and Disaster management.

For-Profit Startup CSR Access Strategies: Technology Partnership: Provide technology solutions to corporates implementing CSR projects. Example: EdTech platform deployed in CSR-funded schools.

Implementation Partner: Execute CSR programs on behalf of corporates. Requires operational capability and impact measurement expertise. Revenue model: Implementation fee + technology platform fee.

Section 8 Partnership: Partner with Section 8 company (non-profit) for CSR eligibility. Your technology/solution deployed through Section 8 structure. Revenue through licensing, service fees, or social enterprise model.

Incubation: CSR funds can support technology incubators. Position your startup for corporate incubation programs funded through CSR.

Social Enterprise Registration: Register on NGO Darpan (ngo.india.gov.in) for visibility to CSR donors. Complete CSR registration through MCA for direct CSR receipt (Section 8 companies only).

Impact Investment & Blended Finance: Impact Investors: Aavishkaar, Ankur Capital, Unitus Ventures, Menterra - invest in for-profit social enterprises. Development Finance: SIDBI Impact Funds, World Bank linkages, NABARD rural programs. Blended Finance: Mix of grant + equity + debt for impact ventures.

Government Social Sector Schemes: PMKVY (Skill Development): Rs 12,000 Cr allocation for skill training. NRLM (Livelihoods): Rs 15,000 Cr for rural livelihoods. POSHAN Abhiyan: Rs 9,000 Cr for nutrition programs. Swachh Bharat: Ongoing sanitation infrastructure funding. Ayushman Bharat: Rs 6,000+ Cr health program implementation.

Social Impact Measurement: Impact investors and CSR funders require measurable outcomes. Frameworks: SROI (Social Return on Investment), IRIS+ metrics, SDG alignment. Third-party impact assessment adds credibility.

Pro Tip: Large corporates prefer working with few, reliable implementation partners rather than many small vendors. Position for multi-year, multi-crore engagements rather than one-time projects. Track record and impact documentation are essential.',
        '["Map your startup''s alignment with Schedule VII CSR activities - identify which categories your solution addresses", "Research 20 large CSR spenders in relevant sectors - understand their CSR focus areas and implementation partner requirements", "Identify potential Section 8 partnership opportunities - connect with 5 non-profits whose mission aligns with your solution", "Register on NGO Darpan if applicable - complete organizational profile for CSR donor visibility"]'::jsonb,
        '["Schedule VII Category Mapping Tool for CSR eligibility assessment", "Top 100 CSR Spenders Database with focus areas, CSR heads, and implementation partner contacts", "Section 8 Partnership Framework including legal structure and revenue models", "Impact Measurement Template with SROI calculation and SDG alignment"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 16: Sector-Specific Government Programs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'Sector-Specific Government Programs',
        'Beyond horizontal schemes available to all startups, India operates 100+ sector-specific programs with targeted funding, regulatory support, and market access. Identifying and accessing your sector''s programs can unlock Rs 50L to Rs 50Cr in dedicated support.

FinTech & Digital Payments: RBI Regulatory Sandbox - Test innovative solutions with regulatory relaxation. IFSCA Sandbox - International financial services innovation at GIFT City. NPCI Partnership - Integration opportunities with UPI, RuPay, NACH. SIDBI FinTech - Rs 500 Cr fund for fintech startups.

HealthTech & Pharma: BIRAC schemes (covered in Day 5). PM-ABHIM - Health infrastructure with technology integration. Ayushman Bharat Digital Mission - ABHA integration opportunities. ICMR grants for clinical research. CDSCO accelerated approval for innovations.

AgriTech: RKVY-RAFTAAR - Rs 25L grants through agri-incubators. PM-KISAN integration opportunities. eNAM market linkage platform. ICAR partnership programs for research commercialization. NABARD Agri startup fund.

CleanTech & Sustainability: FAME II - Electric vehicle incentives up to 40% subsidy. PLI for Solar - Manufacturing incentives for solar equipment. Green bonds and climate finance through SIDBI. Waste-to-energy support under Swachh Bharat.

EdTech: DIKSHA platform integration for content providers. PM eVIDYA - Content development opportunities. Skill India partnerships under NSDC. State education department procurement programs.

Defense & Aerospace: iDEX (Innovations for Defence Excellence) - Rs 1.5 Cr prototype grants. DRDO TDF (Technology Development Fund) - Rs 10 Cr grants. Defense procurement preferences for Indian startups. IN-SPACe - Private space sector participation.

Textiles & Fashion: TUF (Technology Upgradation Fund) - 5% interest subvention. SITP (Scheme for Integrated Textile Parks) - Infrastructure subsidies. Export incentives through AEPC. Design support through NID partnerships.

Electronics & Hardware: SPECS (Scheme for Promotion of Manufacturing of Electronic Components) - 25% capital subsidy. EMC 2.0 - Manufacturing cluster support. PLI for electronics (covered in Day 12). Design-linked incentives under DLI scheme.

Tourism & Hospitality: Swadesh Darshan - Destination development support. PRASHAD - Pilgrimage site development. State tourism incentives for hotels and services.

Application Strategy for Sector Schemes: Identify your primary ministry (each sector has a nodal ministry). Subscribe to ministry announcements and scheme notifications. Attend sector-specific industry consultations and workshops. Build relationships with sector-specific scheme officers. Apply for pilot/demonstration projects - foot in the door.',
        '["Identify your sector''s nodal ministry and department - subscribe to their scheme announcements and industry newsletters", "List all sector-specific schemes applicable to your startup - create a sector scheme matrix with eligibility, funding, and timelines", "Research 3 sector-specific success stories - understand how similar startups accessed government support in your sector", "Apply for at least 2 sector-specific programs in the next 90 days - prioritize by funding amount and eligibility match"]'::jsonb,
        '["Sector-Ministry Mapping Directory with nodal officers and scheme announcement channels", "Sector Scheme Matrix Template for organizing sector-specific opportunities", "Sector Success Story Database with case studies of government-funded startups", "Sector Scheme Application Tracker with deadlines and requirements"]'::jsonb,
        90,
        50,
        4,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Compliance & Optimization (Days 17-21)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Compliance & Optimization',
        'Ensure post-approval compliance and maximize benefits through strategic planning. Master fund utilization, reporting, audits, and relationship management with government bodies.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 17: Post-Approval Compliance Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        17,
        'Post-Approval Compliance Framework',
        'Receiving government funding approval is just the beginning - maintaining compliance determines whether you keep benefits and access future funding. Non-compliance consequences range from grant recovery with interest (12-18%) to blacklisting from future schemes. Establish robust compliance systems from day one.

Universal Compliance Requirements: Fund Utilization Certificate (UC): Mandatory for all grants. CA-certified statement showing how funds were used. Due within 30-60 days of project completion. Format prescribed by scheme guidelines.

Quarterly Progress Reports (QPR): Technical and financial progress updates. Milestone achievement documentation. Deviation explanations with justification. Typically due by 15th of month following quarter end.

Annual Returns: Annual audited statements specific to scheme. Scheme-wise expenditure breakup. Target vs achievement reporting.

Physical Verification: On-site inspections by scheme officers. Verification of assets purchased with grant funds. Employee and activity verification.

Scheme-Specific Compliance: DPIIT Recognition: Maintain turnover below Rs 100 Cr. Continue innovation activities. File annual returns with Startup India.

BIRAC Grants: Quarterly scientific progress reports. Equipment procurement through prescribed process. Publication with BIRAC acknowledgment. IP sharing as per agreement.

SIDBI/Bank Loans: Quarterly stock and book debt statements. No diversion of funds warning. Maintain current ratio and other covenants. Timely interest and principal payment.

State Schemes: Employment generation proof. Continuous operations requirement. Local sourcing compliance. Investment verification.

Common Compliance Failures: Late or incomplete reporting (40% of issues). Unauthorized expenditure heads (25%). Missing documentation for claimed expenses (20%). Deviation from approved project without permission (10%). Asset disposal without approval (5%).

Compliance Infrastructure Setup: Dedicated compliance officer/function. Scheme-wise document folders. Compliance calendar with deadlines. Audit trail for all scheme-related transactions. Regular internal compliance reviews.

Deviation Management: Seek prior approval for any project deviation. Document reasons and revised approach. Obtain written approval before proceeding. Maintain deviation log with approvals.

Recovery and Blacklisting: Minor delays: Warning letters, extension possible. Significant non-compliance: Partial recovery with interest. Fraud or misrepresentation: Full recovery + penalty + blacklisting. Blacklisting period: 2-5 years, affects all government schemes.',
        '["Create your scheme compliance calendar with all reporting deadlines - set reminders 15 days before each due date", "Designate a compliance owner in your team (even if part-time initially) - document their responsibilities and reporting process", "Set up scheme-wise documentation folders (physical + digital) - establish filing system for all scheme-related paperwork", "Prepare your first progress report template - align format with scheme requirements and establish information flow"]'::jsonb,
        '["Scheme Compliance Calendar Template with all major scheme deadlines", "Compliance Owner Job Description and responsibility matrix", "Scheme Documentation Filing System with folder structure and checklist", "Progress Report Template Pack for common government schemes (BIRAC, DST, SIDBI, State)"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 18: Fund Utilization & Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        18,
        'Fund Utilization & Reporting',
        'Government funds come with strict utilization norms - spending outside approved heads or timelines can result in recovery with interest. Master fund management to ensure clean audits and position for future funding.

Fund Disbursement Patterns: Most schemes disburse in tranches: Tranche 1 (30-40%): On approval and initial documentation. Tranche 2 (30-40%): On achievement of mid-project milestones and UC for Tranche 1. Tranche 3 (20-30%): On project completion and final UC submission. Some schemes require bank guarantee for advance releases.

Approved Expenditure Heads: Personnel: Salaries for project staff as per approved budget. Maximum salary limits often prescribed (Rs 50K-1L/month for scientists). Include allowances, EPF, and gratuity if approved. Equipment: As per approved equipment list with quotations. Procurement through prescribed process (3 quotes for >Rs 50K). Cannot exceed approved amount per item. Consumables: Lab materials, raw materials for R&D. Should match project activities. Detailed logs required. Travel: Domestic/international travel as approved. Air travel class restrictions may apply. Pre-approval for international travel. Contingency: 5-10% of budget for unforeseen expenses. Should be actual contingencies, not general spending.

Expenditure Documentation: For every rupee spent from government funds: Invoice/bill with GST details. Payment proof (bank transfer, no cash for amounts >Rs 2000). Receiving report or delivery challan. For equipment: installation and commissioning report. Connection to approved budget head and project activity.

Common Utilization Mistakes: Spending on unapproved heads (biggest issue). Advancing money without documentation. Personal expenses mixed with project expenses. Equipment purchase from related parties without disclosure. Claiming expenses incurred before sanction date. Spending beyond approved budget line items.

Reporting Best Practices: Maintain real-time expense tracking (don''t wait for quarter end). Photograph major purchases and activities. Keep attendance records for project personnel. Document milestone achievement with evidence. Flag deviations early with written explanations.

Utilization Certificate (UC) Requirements: CA certification of fund utilization. Segregated bank account statement. Item-wise expenditure with supporting documents. Unspent balance reporting and treatment. Auditor verification of physical assets.

Interest on Unspent Funds: Government funds must be kept in separate bank account. Interest earned belongs to government (usually). Unspent balance beyond project period must be returned. Apply for extension if more time needed.',
        '["Open a dedicated bank account for government funds if not already done - keep scheme funds separate from operating funds", "Set up expense tracking system with budget head mapping - every expense should be tagged to approved budget line", "Create a fund utilization register linking each expense to invoice, payment proof, and project activity", "Prepare a mock UC using current expenses - identify documentation gaps and fix before actual reporting deadline"]'::jsonb,
        '["Scheme-wise Budget Tracking Template with approved head mapping", "Expense Documentation Checklist ensuring complete audit trail", "Utilization Certificate Format with CA certification requirements", "Fund Reconciliation Template matching bank statements to expense records"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 19: Government Audit Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'Government Audit Preparation',
        'Government audits range from routine compliance checks to intensive CAG (Comptroller and Auditor General) investigations. Proper preparation ensures smooth audits and positions you favorably for future funding. Treat audits as an opportunity to demonstrate excellence, not a threat to survive.

Types of Government Audits: Internal Audit: Conducted by scheme implementing agency. Focus: Compliance with scheme guidelines. Frequency: Often annual for active grants.

Statutory Audit: CA certification of financial statements and fund utilization. Required for most grants and loans. You engage the CA, but they verify to scheme requirements.

Third-Party Verification: Independent agency engaged by government. Physical verification of assets and activities. Beneficiary verification in social schemes.

CAG Audit: Supreme audit institution of India. Can audit any government-funded program/entity. Deep investigation with wide powers. Findings become part of public parliamentary record.

Audit Preparation Checklist: Document Readiness: All original documents organized and accessible. Chronological filing of transactions. Complete voucher series without gaps. Bank statements reconciled.

Physical Verification Prep: All assets tagged and inventory current. Equipment functional and in use. Disposal records for any written-off assets. Photographs of major assets.

Personnel Verification: Employee records with joining dates. Attendance and leave records. Salary payment evidence. Qualification certificates on file.

Project Documentation: Approved project proposal. Sanction letter and all amendments. Progress reports and correspondence. Milestone achievement evidence.

During the Audit: Single point of contact for auditors. Respond promptly to document requests. Do not volunteer unnecessary information. Clarify questions before responding. Maintain detailed records of auditor queries and responses.

Responding to Audit Observations: Draft Audit Report: Initial findings shared for response. Take seriously - this is your chance to clarify. Respond with documentation, not just explanations. Acknowledge genuine issues and propose corrections.

Final Audit Report: Incorporates your response. Unresolved issues become formal observations. Action Taken Report (ATR) required within stipulated time.

Audit Red Flags to Avoid: Unexplained expenditure patterns. Documentation that doesn''t match claimed activities. Assets not found or not in use. Employees who cannot be verified. Deviation from approved activities without permission. Conflict of interest transactions.

Pro Tip: Conduct mock internal audits quarterly. Better to find issues yourself than have auditors discover them. Many startups engage CA firms for pre-audit reviews.',
        '["Conduct internal audit readiness assessment - walk through your documentation as if you were the auditor", "Create audit response protocol: who responds, information approval process, and document handover procedure", "Organize physical assets for verification - ensure all scheme-funded assets are tagged, functional, and accessible", "Prepare audit file with all essential documents - sanction letter, amendments, progress reports, UCs, and correspondence"]'::jsonb,
        '["Internal Audit Readiness Checklist covering documentation, assets, and personnel", "Audit Response Protocol Template with roles and approval workflow", "Asset Verification Preparation Guide with tagging and inventory templates", "Audit Query Response Template with professional response formats"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 20: Benefit Stacking & Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Benefit Stacking & Optimization',
        'Strategic startups don''t just access one government scheme - they systematically stack multiple compatible schemes to maximize total benefit. With proper planning, a single startup can access Rs 50L to Rs 5Cr+ across 5-10 schemes simultaneously without violating any norms.

Benefit Stacking Framework: Layer 1 - Recognition & Registration (foundational, unlocks other schemes): DPIIT Recognition, Udyam Registration, State Startup Registration, IEC Code. Cost: Free. Time: 1-2 weeks each.

Layer 2 - Tax Benefits (reduce cash outflow): 80-IAC Tax Holiday (3 years of 10), Angel Tax Exemption (Section 56), R&D Deduction (Section 35), Patent Box (Section 115BBF). Benefit: 15-30% tax savings.

Layer 3 - Grant Funding (non-dilutive capital): DST NIDHI (Rs 10L-1Cr), BIRAC BIG (Rs 50L), State Seed Funds (Rs 10-50L), Innovation Grants (Rs 5-25L). Benefit: Rs 50L-2Cr in grants.

Layer 4 - Credit Support (leverage without full collateral): MUDRA (Rs 10L), CGTMSE (Rs 5Cr), CGSS (Rs 10Cr), Interest Subvention (2-5% savings). Benefit: Access Rs 10L-5Cr in debt.

Layer 5 - Operational Subsidies (reduce ongoing costs): Capital Subsidy (15-35%), Rent Reimbursement (50-100%), Power Tariff Subsidy, Employment Incentive. Benefit: 10-20% cost reduction.

Layer 6 - Market Access (revenue support): Government Procurement (GeM, CPPP), Export Incentives (RoDTEP, SEIS), PLI Incentives. Benefit: Revenue enhancement.

Stacking Rules & Restrictions: Same expense cannot be claimed under multiple schemes (double-dipping prohibited). Some schemes explicitly exclude beneficiaries of other schemes. Grant funding may reduce eligibility for equity schemes. Read scheme guidelines carefully for exclusions. When in doubt, disclose and seek clarification.

Optimization Strategies: Timing Optimization: Apply for time-sensitive schemes first (annual windows). Sequence applications to build on each approval. Use one approval as credibility for next application.

Entity Structure Optimization: Consider subsidiary for sector-specific schemes. LLP vs Pvt Ltd implications for certain schemes. State-specific entity for state scheme access.

Investment Optimization: Time capex to match capital subsidy windows. Consider lease vs buy based on scheme applicability. Structure R&D spend for maximum deduction.

Case Study - Maximum Benefit Stack: A Bangalore-based HealthTech startup achieved: DPIIT Recognition + 80-IAC (Rs 0 tax for 3 years), BIRAC BIG Grant (Rs 50L), Karnataka Seed Fund (Rs 25L), CGTMSE Loan (Rs 50L), Karnataka Capital Subsidy (Rs 15L), Patent cost reimbursement (Rs 5L). Total benefit: Rs 1.45 Cr in 18 months.',
        '["Map your current scheme access - list all schemes you have applied for, received, or are eligible for", "Create your benefit stack plan - prioritize schemes by layer and create 12-month application roadmap", "Calculate total potential benefit - sum all accessible schemes with realistic probability-weighted values", "Identify stacking conflicts - review scheme guidelines for exclusions and ensure no double-dipping risk"]'::jsonb,
        '["Benefit Stack Planning Template with 6-layer framework", "Scheme Compatibility Matrix showing which schemes can be combined", "12-Month Scheme Application Roadmap Template", "Total Benefit Calculator with probability-weighted projections"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 21: Long-Term Government Relationship Building
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'Long-Term Government Relationship Building',
        'The startups that consistently access government funding treat it as relationship, not transaction. Long-term engagement with government ecosystem players - scheme officers, ministry officials, incubators, and industry associations - creates sustainable advantages for funding access, policy influence, and market opportunities.

Key Government Relationship Categories: Scheme Officers: Direct point of contact for specific schemes. Build relationship through clean compliance and professional engagement. They can expedite processing, provide early scheme information, and advocate for your applications.

Ministry Officials: Policy-level decision makers. Engage through industry consultations, startup showcases, and formal representations. Can influence policy in your favor and create tailored opportunities.

Incubators & TBIs: Gateway to DST, BIRAC, and state schemes. Many schemes require incubation for eligibility. Ongoing relationship enables repeated access.

Industry Associations: NASSCOM, CII, FICCI, and sector associations. Represent startup interests to government. Access to exclusive government events and delegations.

Relationship Building Strategies: Clean Track Record: Best relationship builder is flawless compliance. On-time reports, clean audits, and milestone achievement create goodwill. Officers recommend reliable startups for future opportunities.

Active Participation: Attend government-organized events and workshops. Volunteer for pilot programs and demonstrations. Participate in industry consultations. Showcase at government exhibitions (India International Trade Fair, etc.).

Thought Leadership: Contribute to policy discussions and white papers. Provide data and insights when government seeks industry input. Position as domain expert for media commentary on policy.

Success Stories: Document and share your scheme success story. Testimonials used in government communications. Case studies for future scheme promotion. Creates positive attribution to supporting officials.

Networking Tactics: Connect with scheme officers on LinkedIn professionally. Follow and engage with ministry social media handles. Attend Startup India and state startup events. Join incubator alumni networks. Participate in hackathons and challenges organized by government.

Ongoing Engagement Calendar: Quarterly: Progress update to key scheme officers (even when not required). Bi-annual: Participation in at least one government event. Annual: Industry association membership renewal and engagement. Continuous: Policy monitoring and consultation participation.

Graduating to Larger Opportunities: Government vendor registration and prequalification. Large tender participation as your capability grows. International trade delegations and export promotion. Government-to-government initiatives (G2G) partnerships. Public-private partnership (PPP) project participation.

Warning Signs to Avoid: Never offer bribes or "facilitation payments" - it''s illegal and counterproductive. Don''t make promises you cannot keep. Avoid adversarial relationships even when frustrated. Don''t speak negatively about government processes publicly.

Final Word: Government funding in India is substantial, growing, and increasingly accessible. The founders who succeed treat it as a long-term strategic capability, not a one-time transaction. Invest in learning the ecosystem, building relationships, and maintaining excellence. Your government funding capability becomes a competitive moat over time.',
        '["Identify your top 10 government relationship targets - scheme officers, ministry contacts, and ecosystem players to cultivate", "Create your government engagement calendar - events, consultations, and touchpoints for the next 12 months", "Document your scheme success story - prepare case study for sharing with government and media", "Set up monitoring for scheme announcements, policy changes, and government events using Google Alerts, ministry newsletters, and industry association communications"]'::jsonb,
        '["Government Relationship CRM Template for tracking contacts and interactions", "Government Engagement Calendar with major events, consultations, and deadlines", "Scheme Success Story Template for testimonials and case studies", "Policy Monitoring Setup Guide with alert configuration and source list"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
