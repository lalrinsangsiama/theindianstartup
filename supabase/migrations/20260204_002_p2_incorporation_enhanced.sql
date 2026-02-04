-- THE INDIAN STARTUP - P2: Incorporation & Compliance Kit - Enhanced Content
-- Migration: 20260204_002_p2_incorporation_enhanced.sql
-- Purpose: Enhance P2 course content to 500-800 words per lesson with India-specific data

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
    -- Get or create P2 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P2',
        'Incorporation & Compliance Kit',
        'Master Indian business incorporation and ongoing compliance. 40 days, 10 modules covering entity selection, MCA registration, GST, labor laws, contracts, and compliance automation. Includes all templates, checklists, and step-by-step portal guides.',
        4999,
        false,
        40,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P2';
    END IF;

    -- Clean existing modules and lessons
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Business Structure Selection (Days 1-4)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Business Structure Selection',
        'Master all business structures available in India. Make the optimal choice based on liability protection, tax implications, funding eligibility, and compliance burden.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Understanding Business Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Understanding Business Structures in India',
        'India offers 15+ distinct business structures, each with unique characteristics. The choice of structure impacts everything from personal liability to tax treatment to your ability to raise funding. 78% of DPIIT-recognized startups choose Private Limited Company structure, but that doesn''t mean it''s right for everyone.

Overview of primary structures: Sole Proprietorship is the simplest form with zero registration requirement - just start trading under your name or a trade name. However, there''s no separation between personal and business assets, meaning unlimited liability. Income taxed at individual slab rates (up to 30% + cess). Best for: freelancers, consultants, very small businesses. Estimated 10 million+ sole proprietorships in India.

Partnership Firm under Indian Partnership Act 1932 requires 2-20 partners sharing profits and losses. Unlimited liability for all partners - each partner''s personal assets can be seized for business debts. Taxed at flat 30% + surcharge + cess. Registration optional but recommended (Rs 500-2,000 at Registrar of Firms). Best for: family businesses, professional practices. Approximately 3 million registered partnerships.

Limited Liability Partnership (LLP) under LLP Act 2008 combines partnership flexibility with limited liability. Partners'' personal assets protected from business debts. Minimum 2 designated partners, no maximum. Taxed at 30% flat rate (no DDT unlike companies). Lower compliance than Pvt Ltd - no mandatory audit if turnover < Rs 40 lakh and capital < Rs 25 lakh. Registration: Rs 3,000-6,000 through MCA, 15-20 days. About 1.8 lakh registered LLPs. Best for: professional services, consulting, tech companies not seeking VC funding.

Private Limited Company under Companies Act 2013 is a separate legal entity with limited liability. Shareholders'' liability limited to their shareholding. Can issue ESOPs, raise equity from angels/VCs. Most compliant structure with mandatory audits, ROC filings, board meetings. Taxed at 25% for turnover < Rs 400 Cr (22% under new tax regime). Registration: Rs 7,000-15,000 through SPICe+, 7-15 days. Over 14 lakh active companies. Best for: any startup planning to scale or raise funding.

Key decision factors: Liability protection (crucial if business involves risk), Funding plans (VCs only invest in Pvt Ltd), Compliance tolerance (LLP has 50% less compliance), Tax optimization (effective rates differ by structure), Exit planning (Pvt Ltd shares easiest to transfer/sell).',
        '["Complete the Business Structure Assessment Quiz to identify your primary requirements", "Calculate estimated 5-year compliance costs for top 3 structures you''re considering (use provided calculator)", "Review 3 case studies of startups in your sector and their structure choices", "Draft initial pros/cons list for your top 2 structure options"]'::jsonb,
        '["Business Structure Comparison Matrix with 2024 data on costs, compliance, and taxes", "5-Year Compliance Cost Calculator comparing all structures", "Case Study Library: 20 Indian startups and their structure decisions", "Structure Selection Decision Tree"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Private Limited Company Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Private Limited Company Deep Dive',
        'Private Limited Company is the gold standard for Indian startups seeking growth and investment. Understanding its nuances helps you leverage its benefits while managing compliance burden.

Legal framework: Governed by Companies Act 2013 and Companies (Amendment) Act 2020. Regulated by Ministry of Corporate Affairs (MCA) through Registrar of Companies (ROC). Statutory requirements defined under various sections - most relevant: Section 2(68) defines private company, Section 149-172 cover directors, Section 173-195 cover meetings.

Formation requirements: Minimum 2 shareholders, maximum 200 (excluding employees with ESOPs). Minimum 2 directors, maximum 15 (can be increased by special resolution). At least one director must be Indian resident (stayed in India for 182+ days in previous calendar year). Directors need DIN (Director Identification Number) and DSC (Digital Signature Certificate).

Capital structure essentials: Authorized Capital is maximum shares company can issue - start with Rs 1-10 lakh for most startups. Stamp duty on authorized capital varies by state: Maharashtra 0.15%, Karnataka 0.3%, Delhi 0.15%. Paid-up Capital is what''s actually subscribed - can be as low as Rs 1 per share × number of shares. Share classes: Equity shares (voting rights), Preference shares (fixed dividend, priority in liquidation), ESOPs (employee incentive).

Director responsibilities under Companies Act: Fiduciary duties (Section 166): Act in good faith, exercise due care, avoid conflicts of interest. Compliance responsibilities: Ensure ROC filings, maintain books of accounts, hold board meetings. Personal liability scenarios: Fraud, non-compliance leading to penalties, wrongful trading while insolvent. Disqualification grounds (Section 164): Default in filing returns for 3 years, convicted of offenses.

Registered office requirements: Must have registered office from day 1 of incorporation. Can be residential address in most cases. Proof required: Ownership document OR Rent agreement + NOC from owner + Utility bill (within 2 months). Office can be virtual/co-working, but some banks prefer physical addresses. Address change within state: Rs 500 fee. Change across states: Rs 2,000-5,000 + newspaper advertisement.

Company name guidelines: Must include "Private Limited" at the end. Cannot be identical or similar to existing companies (check on MCA portal). Cannot use restricted words (bank, insurance, government, etc.) without approval. Cannot violate Emblems and Names Act. Must reflect business nature if using generic words. Reserve name via RUN form (Rs 1,000) - valid for 20 days, extendable once.',
        '["Review detailed Private Limited Company requirements against your startup plans", "Determine optimal authorized capital based on funding plans and stamp duty calculation", "Identify all director candidates and verify their eligibility (residency, DIN requirements)", "Prepare registered office proof documents"]'::jsonb,
        '["Private Limited Company Formation Checklist with step-by-step requirements", "Authorized Capital Calculator with state-wise stamp duty rates", "Director Eligibility Verification Checklist", "Registered Office Documentation Guide with NOC templates"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: LLP and Alternative Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'LLP and Alternative Structures',
        'For startups not planning to raise VC funding, LLP offers compelling advantages. Understanding alternative structures helps you make the optimal choice.

LLP in detail: Governed by Limited Liability Partnership Act 2008. Hybrid structure combining partnership flexibility with corporate limited liability. Partners'' personal assets protected - liability limited to their contribution. No minimum capital requirement. Two types of partners: Designated Partners (must have DPIN, handle compliance), General Partners (can be just contributors).

LLP compliance comparison with Pvt Ltd: Annual filings: LLP Form 11 (Annual Return) + Form 8 (Statement of Accounts) vs Pvt Ltd AOC-4 + MGT-7 + multiple forms. Audit: LLP audit required only if turnover > Rs 40 lakh OR capital > Rs 25 lakh. Pvt Ltd audit always mandatory. Board meetings: LLP - no mandatory meetings. Pvt Ltd - minimum 4 board meetings per year. Compliance cost: LLP Rs 20,000-40,000/year vs Pvt Ltd Rs 50,000-1,50,000/year.

LLP taxation: Flat rate 30% + 12% surcharge (if income > Rs 1 Cr) + 4% cess. No DDT on profit distribution to partners. Partners can take remuneration (deductible expense for LLP). AMT (Alternate Minimum Tax) at 18.5% applicable. No Section 80-IAC benefits (startup tax holiday) - available only to Pvt Ltd.

LLP limitations for startups: Cannot raise equity funding - VCs/angels typically don''t invest in LLPs. Complex conversion to Pvt Ltd if needed later (takes 2-3 months, costs Rs 30,000-50,000). ESOPs not as tax-efficient as in Pvt Ltd. Lower credibility perception in some markets.

One Person Company (OPC): Single shareholder alternative introduced in Companies Act 2013. Limited liability protection for solo founders. Must nominate a person who becomes shareholder if founder dies/incapacitated. Mandatory conversion to Pvt Ltd if: Paid-up capital exceeds Rs 50 lakh, OR Turnover exceeds Rs 2 crore. Compliance similar to Pvt Ltd but slightly relaxed (can have only 1 director).

Section 8 Company (Non-Profit): For social enterprises, NGOs, charitable organizations. Profits must be applied towards objectives, no dividend distribution. Objects must be: promotion of commerce, art, science, sports, education, research, social welfare, religion, charity, protection of environment. Benefits: 80G registration enables donors to claim tax deduction, Can receive CSR funds. Registration: Similar to Pvt Ltd but need license from Central Government (takes 3-6 months).

Partnership Firm (for completeness): Still relevant for traditional family businesses, professional services (law, CA firms). Unlimited liability is major drawback. Taxed at 30% flat rate. Simple registration at Registrar of Firms. Consider converting to LLP for liability protection.',
        '["Compare LLP vs Pvt Ltd using detailed comparison matrix for your specific situation", "If considering LLP, identify designated partners and understand their responsibilities", "Research OPC if you''re a solo founder - evaluate against Pvt Ltd with 1 shareholder", "If social enterprise, evaluate Section 8 Company benefits and requirements"]'::jsonb,
        '["LLP vs Pvt Ltd Detailed Comparison with case examples", "LLP Formation Guide with cost breakdown", "OPC Evaluation Framework with conversion triggers", "Section 8 Company Formation Guide"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Making Your Final Decision
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Making Your Final Structure Decision',
        'Decision time. Using the knowledge from Days 1-3, make an informed choice that will serve your startup for years. Remember: while structure can be changed later, it''s costly and time-consuming. Better to choose right the first time.

Decision framework walkthrough: Step 1 - Funding plans: If seeking VC/angel funding within 3 years, choose Pvt Ltd. Full stop. VCs won''t invest in LLPs, and conversion delays fundraising. Step 2 - Liability exposure: If your business carries risk (physical products, professional services, handling customer data), limited liability is essential. Sole proprietorship is out. Step 3 - Compliance tolerance: If you have minimal administrative support and want to focus 100% on business, LLP''s lower compliance is attractive. Step 4 - Tax optimization: Model your expected profits and compare effective tax rates. LLP''s 30% flat rate vs Pvt Ltd''s 22-25% + dividend distribution considerations. Step 5 - Long-term plans: If eventual exit/acquisition is the goal, Pvt Ltd share transfer is cleanest.

Common scenarios and recommendations: Tech startup planning to raise funding → Private Limited Company. Consulting firm with 2-3 partners → LLP. Solo freelancer testing business idea → Sole Proprietorship initially. Social impact organization → Section 8 Company. Professional services firm (CA, law) → LLP or Partnership. E-commerce business planning scale → Private Limited Company. Family business with succession plans → Private Limited Company.

Conversion paths: Sole Proprietorship to Pvt Ltd: Cleanest path - incorporate new company, transfer business. LLP to Pvt Ltd: Section 366 conversion, takes 2-3 months, requires fresh compliance setup. Partnership to LLP: Straightforward conversion under LLP Act, partners become designated partners. OPC to Pvt Ltd: Mandatory at thresholds, voluntary anytime.

When to get professional help: DIY is fine for: Basic structure selection, simple incorporations, single-founder scenarios. Get lawyer/CA for: Complex founder arrangements, foreign investors/directors, unusual business activities, sector-specific licensing requirements.

Cost of choosing wrong structure: Immediate costs: Conversion fees Rs 30,000-75,000, professional fees, delays. Opportunity costs: Delayed fundraising (3-6 months for conversion), credibility impact with investors/clients. Tax costs: Suboptimal structure could mean 5-10% higher effective tax rate over years.

Document your decision: Write a 1-page justification for your structure choice. Include: key factors considered, alternative structures evaluated, why chosen structure wins. This becomes part of your institutional memory and helps explain to future investors/partners.',
        '["Complete final decision matrix scoring each structure on your key criteria", "Document your structure decision with clear rationale (1-page memo)", "Prepare preliminary information for incorporation: founder details, proposed directors, registered office", "Create budget for incorporation including government fees, professional fees, and first-year compliance"]'::jsonb,
        '["Structure Decision Matrix Template with weighted scoring", "Structure Decision Documentation Template", "Incorporation Budget Calculator with all cost components", "Pre-Incorporation Information Checklist"]'::jsonb,
        60,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Pre-Incorporation Preparation (Days 5-8)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Pre-Incorporation Preparation',
        'Complete all prerequisites for incorporation including DSC, DIN, name approval, and document preparation. Get everything ready for seamless SPICe+ filing.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 5: Digital Signature Certificate
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        5,
        'Digital Signature Certificate (DSC)',
        'Digital Signature Certificate is the foundation of all MCA filings. Every director and subscriber needs a DSC to sign incorporation documents and subsequent company filings digitally.

What is DSC? A DSC is the digital equivalent of a physical signature. It''s issued by Certifying Authorities (CAs) licensed by the Controller of Certifying Authorities (CCA) under IT Act 2000. DSC contains: Name, public key, CA information, validity period. It''s stored on a USB token (Dongle) that plugs into your computer.

DSC classes for MCA: Class 2 DSC: Used for most MCA filings, income tax, GST. Validates identity through Aadhaar or other documents. Cost: Rs 800-1,200. Class 3 DSC: Higher security with in-person verification. Required for e-tendering, some high-value transactions. Cost: Rs 1,500-2,500. For incorporation, Class 2 is sufficient and most common.

Licensed Certifying Authorities in India: eMudhra (largest, good service), Sify, n-Code Solutions (GNFC), IDRBT, National Informatics Centre (NIC), CDAC. All are equivalent legally - choose based on price, service speed, and support. Most offer same-day or next-day issuance.

DSC application process: Step 1 - Choose CA and visit their website. Step 2 - Select DSC type (Class 2 for individuals). Step 3 - Fill application form: Full name (exactly as in PAN), email, phone, organization (optional). Step 4 - Upload documents: PAN card copy, Aadhaar (for video verification) or address proof, Passport photo. Step 5 - Video verification (most CAs): Quick video call to verify identity, show documents. Step 6 - Payment: Rs 800-1,500 depending on validity (1-3 years). Step 7 - Receive USB token by courier (2-5 days) or download e-token (same day for some CAs).

DSC installation and testing: Install DSC driver provided by CA. Insert USB token and install certificate on computer. Test at MCA portal by attempting to sign a draft document. Ensure Java is properly configured (MCA still uses Java applets). Keep backup: Note the password and store safely. Lost password means buying new DSC.

Common DSC issues: Name mismatch: DSC name must exactly match DIN/PAN. One extra space causes rejection. Address verification failure: Aadhaar address must be current. Update if needed. Browser compatibility: MCA works best with specific browser versions. Check MCA portal for latest compatibility. Token not recognized: Reinstall drivers, try different USB port, restart computer.

DSC for all directors/subscribers: Each person signing SPICe+ needs their own DSC. For 2 directors + 2 subscribers (if different): 4 DSCs needed. If directors are also subscribers (common): 2 DSCs sufficient. Foreign directors/subscribers: Need to visit Indian embassy/consulate or have documents apostilled.',
        '["Choose Certifying Authority based on price, service speed, and reviews", "Prepare required documents: PAN card, Aadhaar, passport photo in specified format", "Apply for DSC for all proposed directors and subscribers", "Test DSC installation and signing on MCA test portal"]'::jsonb,
        '["DSC Vendor Comparison with pricing and service ratings", "DSC Application Document Checklist with format specifications", "DSC Installation Guide for Windows/Mac", "DSC Troubleshooting Guide for common MCA issues"]'::jsonb,
        60,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 6: DIN and Initial Filings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Director Identification Number (DIN)',
        'DIN is a unique identification number for anyone wanting to become a director in an Indian company. Since SPICe+ integration, DIN is applied within the incorporation form itself, but understanding the concept and requirements is essential.

DIN basics: 8-digit unique number issued by MCA. Valid for lifetime (unless surrendered or disqualified). One person, one DIN - cannot have multiple. Required for: All directors of companies, Designated Partners of LLPs (DPIN). DIN is linked to: PAN, Aadhaar, email, phone number.

DIN through SPICe+: For first-time directors, DIN is allotted through SPICe+ Part B during incorporation. SPICe+ allows up to 3 DINs to be applied simultaneously. Directors with existing DIN don''t need new one - just provide existing DIN. If director already has DIN from another company, that DIN is used.

DIN eligibility requirements: Age: 18 years or above. No DIN disqualification under Section 164 (discussed in Day 2). No conviction for fraud under Companies Act. PAN mandatory for Indian directors. Passport mandatory for foreign directors.

Documents for DIN (within SPICe+): Indian directors: PAN card (mandatory), Aadhaar card (mandatory for address verification), Passport-size photograph (clear, white background). Foreign directors: Passport (mandatory), Address proof from home country (bank statement, utility bill), Passport-size photograph. All documents self-attested.

Director KYC requirements: Annual KYC: DIR-3 KYC form due every year by September 30. Non-filing: DIN deactivated. Reactivation: Rs 5,000 fee + pending KYC. First year: e-KYC sufficient through Aadhaar-based verification. Subsequent years: Either e-KYC (if Aadhaar verified) or physical DIR-3 KYC (with CA certification). Update requirements: Any change in address, email, phone must be updated via DIR-6 within 30 days.

DIN for LLPs (DPIN): Designated Partner Identification Number follows same concept. Applied through LLP Form FiLLiP. Same documents as DIN. DPIN and DIN are interchangeable if same person is DP in LLP and director in company.

Common DIN issues: Photograph rejected: Use white background, face clearly visible, recent photo. PAN-Aadhaar mismatch: Ensure name spelling matches exactly across documents. Multiple DIN attempt: If you applied for DIN earlier (even if rejected), mention in SPICe+ to avoid duplicate DIN issues. Foreign director verification: May require additional authentication through Indian embassy.',
        '["Verify DIN requirements for all proposed directors - check if any existing DIN", "Prepare all director documents: PAN, Aadhaar, photograph in correct specifications", "For foreign directors: arrange passport copy, address proof, and plan for verification", "Update any outdated information (address, email) if existing DIN holder"]'::jsonb,
        '["DIN Requirements Checklist by director type (Indian/Foreign)", "Director Document Preparation Guide with photo specifications", "Existing DIN Verification Guide on MCA portal", "Foreign Director Documentation Requirements"]'::jsonb,
        60,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 7: Company Name Selection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Company Name Selection & Approval',
        'Your company name is your first impression and a long-term brand asset. The MCA name approval process has specific rules that frequently trip up founders. Getting it right the first time saves days of delay.

Company naming rules under Companies Act 2013: Must include "Private Limited" at end (for Pvt Ltd). Must not be: Identical or too similar to existing company/LLP/trademark, Undesirable (vulgar, offensive, or misleading), Using restricted words without approval. Must indicate business nature if using generic/meaningless words. Must not violate Emblems and Names (Prevention of Improper Use) Act 1950.

Name availability check process: Step 1 - MCA portal search (mca.gov.in): Search existing company names, LLP names. Step 2 - Trademark search (ipindiaservices.gov.in): Check if name is registered trademark. Step 3 - Domain search: Check .com, .in availability for web presence. Step 4 - Social media: Check handle availability on key platforms.

Restricted words requiring approval: Words requiring Central Government approval: Bank, Insurance, Stock Exchange, Asset Reconstruction, Nidhi, Mutual Fund, Chit Fund. Words requiring relevant regulator approval: NBFC terms need RBI NOC, Insurance terms need IRDAI NOC. Words requiring other approvals: Names containing "India," "Bharat," "Nation" - need additional justification.

Common rejection reasons and how to avoid: "Too similar to existing company": Use unique prefix/suffix, add geographic indicator. "Undesirable name": Avoid generic words without distinctive element. "Doesn''t indicate business nature": Add descriptor (Technologies, Solutions, Ventures). "Resembles government body": Avoid words suggesting government affiliation. "Trademark conflict": Check trademark database before applying.

RUN (Reserve Unique Name) form: Cost: Rs 1,000 for up to 2 name options per application. Processing time: 1-3 business days. Validity: 20 days from approval (extendable once by 20 days). Resubmission: If rejected, can resubmit with new names within validity period. Within SPICe+: Can also apply for name within SPICe+ Part A (saves Rs 1,000 fee if doing together).

Name selection best practices: Option 1: Your strongest choice, unique and clearly indicates business. Option 2: Backup with slight variation. Tips: Shorter names easier to remember and fit on documents. Avoid hyphens, special characters - cause filing issues. Check pronunciation in Hindi and regional languages for national appeal. Consider future pivots - don''t be too narrow (e.g., "MumbaiCabs" limits expansion).

Post-approval name protection: Name approval ≠ trademark. Apply for trademark registration separately (Rs 4,500 for startups). Trademark gives exclusive right to use name commercially. Monitor for similar names - you can oppose trademark applications within 4 months.',
        '["Search MCA portal for 5-10 potential company names - document availability status", "Search trademark database for shortlisted names - eliminate conflicts", "Check domain and social media availability for top 3 names", "Apply for name approval via RUN form or prepare for SPICe+ Part A submission"]'::jsonb,
        '["Company Name Search Guide for MCA portal", "Trademark Search Tutorial for IP India", "Domain and Social Media Availability Checker Guide", "RUN Form Filing Guide with common rejection fixes"]'::jsonb,
        60,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 8: Document Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Document Preparation for Incorporation',
        'Proper document preparation is the difference between smooth incorporation and frustrating rejections. This day covers everything you need to have ready before filing SPICe+.

Director/Subscriber documents checklist: For each Indian director/subscriber: PAN card (color scan, clearly readable), Aadhaar card (both sides, for address verification), Passport-size photograph (JPEG, white background, 200-500KB), Address proof (if Aadhaar address different from residential: passport/voter ID/driving license). For foreign directors/subscribers: Passport (color scan, all relevant pages), Address proof from home country (bank statement/utility bill, not older than 2 months), Declaration of residential address, Apostilled/notarized as required.

Registered office documents: If owned property: Sale deed or property tax receipt, Utility bill (electricity/water/gas, not older than 2 months), NOC from owner if there are multiple owners. If rented property: Rent agreement (registered recommended, unregistered acceptable), NOC from landlord/owner (format in resources), Utility bill in landlord''s name, Landlord''s address proof. If co-working space: Rent agreement with co-working provider, NOC from co-working company, Utility bill not always available - some ROCs accept co-working agreement alone.

MOA and AOA preparation: Memorandum of Association (MOA): Defines company''s name, registered office state, objects, liability, capital. Objects clause: Main objects, Objects incidental to main objects, Other objects. Keep objects broad enough for future pivots but specific enough to be meaningful. Articles of Association (AOA): Internal rules for company management. Table F (default): Adequate for most startups but generic. Customized AOA: Add ESOP provisions, founder protection clauses, board composition rules.

Key MOA object clauses for tech startups: "To carry on the business of developing, designing, creating, manufacturing, selling software..." "To provide IT services, consulting, and technology solutions..." "To carry on e-commerce, marketplace, and online platform businesses..." Include: Import/export, investment activities, general business activities for flexibility.

Subscriber details: Subscribers are the first shareholders who sign the MOA. Often same as directors but can be different. Each subscriber must take at least 1 share. Typical setup: 2 founders each subscribing to 50% of initial shares. Subscriber sheet: Declaration signed by subscribers stating shares taken.

Capital subscription: Decide share value: Rs 10 per share is standard, but can be Rs 1 or Rs 100. Number of shares: Authorized capital ÷ share value = total shares possible. Initial subscription: Usually small (Rs 10,000-1,00,000), can increase later. Example: Rs 1 lakh authorized capital, Rs 10/share = 10,000 shares. Two founders take 5,000 each.

Declaration and consent forms: INC-9: Declaration by first directors and subscribers (no conviction, not disqualified, etc.). DIR-2: Consent to act as director. INC-8: Declaration by professional (CA/CS/Advocate) certifying compliance. These are embedded within SPICe+ but understanding their content helps.',
        '["Compile all director/subscriber documents in specified formats - create organized folder", "Arrange registered office documents: agreement, NOC, utility bill", "Draft MOA with appropriate object clauses for your business", "Prepare capital subscription details: share value, number of shares, allocation among subscribers"]'::jsonb,
        '["Director Document Checklist with format specifications", "Registered Office Documentation Templates (NOC, declaration formats)", "MOA Template with standard object clauses for different business types", "Capital Structure Planning Worksheet"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Continue with remaining modules (3-10)...
    -- For brevity, I'll add the module structures and a sample of lessons

    -- ========================================
    -- MODULE 3: SPICe+ Incorporation (Days 9-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'SPICe+ Incorporation Process',
        'Execute the incorporation through MCA''s SPICe+ form. Get your Certificate of Incorporation along with PAN, TAN, GSTIN, ESIC, and EPFO registrations in one integrated process.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 9: SPICe+ Form Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        9,
        'SPICe+ Form Overview and Portal Navigation',
        'SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus) is MCA''s integrated incorporation form. Introduced in 2020, it consolidates what previously required multiple separate applications into a single unified process. Understanding its structure is essential for smooth filing.

SPICe+ structure: Part A - Name Reservation: Similar to standalone RUN form. Apply for up to 2 name options. Fee: Rs 1,000 (included in total SPICe+ fee). Approval time: 1-3 days. Part B - Incorporation: Company details, director information, capital, MOA/AOA. Applied after Part A approval. Fee: Based on authorized capital. Integrated services: PAN, TAN, GSTIN, ESIC, EPFO (opt-in).

SPICe+ integrated services: PAN (Permanent Account Number): Automatic allotment based on company details. TAN (Tax Deduction Account Number): For TDS compliance, automatic. GSTIN: Optional but recommended - saves separate application later. ESIC: For companies with 10+ employees - can opt-in. EPFO: For companies with 20+ employees - can opt-in. Professional Tax: Some states (Maharashtra, Karnataka) integrated.

SPICe+ fee structure: Name reservation: Rs 1,000 (Part A). Incorporation fee: Based on authorized capital - Up to Rs 1 lakh: Rs 500, Rs 1-5 lakh: Rs 2,000, Rs 5-10 lakh: Rs 5,000, Above Rs 10 lakh: Rs 5,000 + Rs 500 per Rs 1 lakh. Stamp duty: State-specific (separately paid). Professional (CS/CA) certification: Rs 1,000 fee to MCA. Total government cost for typical startup (Rs 1 lakh authorized): Rs 4,500 + stamp duty.

MCA portal navigation: URL: mca.gov.in. Create account: Individual user registration with email, mobile, PAN. V3 portal: New interface launched 2024, more user-friendly. SPICe+ location: MCA Services → Company → Incorporation → SPICe+. Form filling: Online form with save draft option. Attachment upload: PDF format, size limits specified per document.

Pre-requisites before starting SPICe+: All directors have DSC issued and tested. DIN numbers noted (for existing directors). Name availability confirmed (through search). All documents scanned in correct format. Authorized capital and share structure decided. Registered office documents ready. Professional engaged (CA/CS/Advocate) for certification.

Common portal issues and solutions: Session timeout: Save draft frequently (every 10 minutes). DSC not recognized: Check Java version, try different browser (Firefox often works better). Upload failure: Compress PDFs, ensure under size limit. Payment failure: Retry with different card/netbanking, contact MCA helpdesk. Form stuck in queue: Weekend submissions may take longer to process.',
        '["Create MCA portal account and complete profile with PAN verification", "Gather all required information in one document for easy reference during form filling", "Prepare all attachments in specified PDF format with correct naming convention", "Do a dry run of SPICe+ Part A to understand form fields and navigation"]'::jsonb,
        '["MCA Portal Registration Guide with step-by-step screenshots", "SPICe+ Information Compilation Template", "Document Preparation Specifications (size, format, naming)", "SPICe+ Form Field Reference Guide"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Add remaining lessons for Module 3 (Days 10-12)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_3_id, 10, 'MOA and AOA Drafting', 'The Memorandum of Association and Articles of Association are your company''s constitutional documents. While templates exist, customization for your specific needs is important, especially if planning to raise funding or issue ESOPs.

MOA deep dive: The MOA contains 6 clauses that define your company''s fundamental character: 1) Name Clause: Full company name including "Private Limited". 2) Registered Office Clause: State where registered office is situated (not full address). 3) Objects Clause: Main objects, objects incidental/ancillary to main objects, other objects. 4) Liability Clause: Statement that members'' liability is limited to their shareholding. 5) Capital Clause: Authorized capital and division into shares. 6) Subscription Clause: Subscribers'' details and shares taken.

Objects clause drafting strategy: Be broad enough for future pivots but specific enough to be meaningful. Include: Technology and software development, E-commerce and marketplace operations, Consulting and professional services, Investment and financial activities, Import and export business. Standard format: "To carry on the business of..." followed by specific activities.

AOA customization for startups: Table F (Companies Act 2013) provides default articles but consider adding: ESOP provisions (for future employee incentives), Drag-along and tag-along rights (for investor protection), Anti-dilution provisions (for founder protection), Board composition and voting rules, Share transfer restrictions and right of first refusal. Investor-friendly AOA makes future fundraising smoother.

Filing MOA and AOA: MOA: Filed as INC-33 attachment within SPICe+. AOA: Filed as INC-34 attachment within SPICe+. Both need to be digitally signed by subscribers and witness. Professional (CS/CA/Advocate) certification required via INC-8.

Professional assistance consideration: DIY: Possible with templates, suitable for simple 2-founder structures. Professional help recommended for: Complex shareholder arrangements, Foreign shareholders/directors, Industry-specific regulations, Investor-ready documentation.', '["Draft MOA with comprehensive objects clause covering your current and potential future business activities", "Review Table F AOA and identify sections needing customization for your startup", "Add ESOP provisions to AOA if planning employee stock options", "Get professional review of MOA/AOA before finalizing"]'::jsonb, '["MOA Template with expanded objects clause for tech startups", "AOA Customization Checklist with investor-friendly provisions", "ESOP Clause Templates for Articles", "MOA/AOA Review Checklist"]'::jsonb, 90, 75, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_3_id, 11, 'SPICe+ Filing and Submission', 'With all documents ready, it''s time to file SPICe+. This lesson walks through the actual filing process, common errors, and how to handle resubmissions.

SPICe+ Part A filing: Login to MCA portal → Company Services → Incorporation → SPICe+ Part A. Fill company details: Proposed name (2 options), Main division (NIC code), Description of main activities. Upload: Board resolution or authorization letter. Pay fee: Rs 1,000 via netbanking/card. Submit for processing. Timeline: 1-3 working days for approval/rejection.

SPICe+ Part B filing (after Part A approval): Part B unlocks once name is approved. Multiple sections to complete: Section 1: Company Details - Name (auto-populated), Main division, Business description, PAN/TAN details. Section 2: Registered Office - Full address, proof upload. Section 3: Capital Structure - Authorized capital, number of shares, face value. Section 4: Subscriber Details - For each subscriber: name, PAN, DIN (if director), shares taken. Section 5: Director Details - For each director: DIN (existing or new), designation, address.

Attachment uploads: a_MOA (INC-33), e_AOA (INC-34), proof_of_office, utility_bill, id_proof of subscribers (PAN), address_proof of directors. Size limits: Each file max 2-6 MB depending on type. Naming convention: Specific prefix required.

Digital signature process: All directors and subscribers sign via DSC. Order of signing: Professional (certifying CA/CS) → Directors → Subscribers. Signing done through MCA portal using USB token. Ensure DSC is valid and recognized by portal before starting.

Payment and submission: Calculate total fee based on authorized capital + stamps. Pay via netbanking, debit card, or credit card. Stamp duty: Paid separately via state portal or within SPICe+ for some states. After payment, form submitted to ROC queue.

Post-submission tracking: SRN (Service Request Number) generated upon submission. Track status: MCA Services → Track Status. Statuses: Under Process, Pending for Resubmission, Approved, Rejected. Resubmission: If ROC raises queries, respond within 15 days. Timeline: 3-7 working days for approval after successful submission.', '["Complete SPICe+ Part A filing with both name options", "After name approval, begin Part B filing with all prepared information", "Upload all attachments in correct format with proper naming", "Complete DSC signing by all directors and subscribers and submit"]'::jsonb, '["SPICe+ Part A Filing Guide with field-by-field instructions", "SPICe+ Part B Filing Guide with screenshots", "Attachment Naming and Format Reference", "DSC Signing Sequence and Troubleshooting"]'::jsonb, 120, 75, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_3_id, 12, 'Certificate of Incorporation and Post-Incorporation', 'Congratulations! Once SPICe+ is approved, you receive your Certificate of Incorporation (COI). But incorporation is just the beginning - immediate post-incorporation actions set up your company for compliant operations.

Certificate of Incorporation: Downloaded from MCA portal upon approval. Contains: Company name, CIN (Corporate Identification Number), Date of incorporation, PAN (allotted automatically), TAN (allotted automatically). COI is your company''s "birth certificate" - required for all official purposes. Keep multiple copies: Digital (PDF), printed, laminated.

CIN explained: 21-character alphanumeric code, Example: U72200MH2024PTC123456. Format: U/L + NIC Code + State Code + Year + Company Type + ROC Serial. CIN used in all government filings, contracts, official documents.

Immediate post-incorporation actions (within 30 days): Open bank account: Required for all business transactions. Board meeting: First board meeting within 30 days. Appoint first auditor: Appointment within 30 days (tenure until first AGM). Issue share certificates: Within 2 months of incorporation. Maintain statutory registers: Register of members, directors, charges, etc. Display name and CIN: On all official documents, office premises.

Bank account opening: Documents: COI, MOA/AOA, PAN card, Board resolution for account opening, Director KYC documents. Banks commonly used by startups: ICICI, HDFC, Kotak (good startup support), RazorpayX, Open (neo-banks for better integration). Timeline: 1-2 weeks for traditional banks, 3-5 days for neo-banks. Minimum balance: Varies Rs 0-25,000 depending on account type.

First board meeting requirements: Items to transact: Appointment of first auditor, Note incorporation and share allotment, Authorize bank account opening, Appoint company secretary (if turnover > Rs 10 Cr), Other business as required. Documentation: Notice of meeting, attendance register, minutes of meeting. File with ROC: Not required for first board meeting, but maintain records.

Statutory registers to set up: Register of Members (Form MGT-1), Register of Directors and KMP (Form MBP-1), Register of Charges (Form CHG-7), Minutes books (board and general meetings), Register of loans, guarantees, and security (Section 186). Physical or electronic: Both acceptable, but records must be maintained at registered office.', '["Download and securely store Certificate of Incorporation with all associated documents", "Initiate bank account opening with required documents", "Conduct first board meeting within 30 days covering all required agenda items", "Set up statutory registers and minute books"]'::jsonb, '["Post-Incorporation Checklist with 30-day timeline", "Bank Account Opening Document Checklist", "First Board Meeting Agenda Template", "Statutory Register Setup Guide"]'::jsonb, 90, 100, 3, NOW(), NOW());

    -- ========================================
    -- MODULE 4-10: Create structures
    -- ========================================

    -- MODULE 4: GST Registration & Compliance (Days 13-16)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'GST Registration & Compliance',
        'Complete GST registration and establish ongoing compliance systems. Understand input tax credit, filing requirements, and e-invoicing.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_4_id, 13, 'GST Registration Process', 'GST (Goods and Services Tax) registration is mandatory for businesses with annual turnover exceeding Rs 20 lakh (Rs 10 lakh for special category states) or for certain categories regardless of turnover. Understanding when and how to register is essential.

GST registration thresholds: Normal taxpayer: Rs 20 lakh turnover (Rs 10 lakh for special states: Manipur, Mizoram, Nagaland, Tripura). Composition scheme: Rs 1.5 crore turnover (lower rate but no ITC). Mandatory registration regardless of turnover: Inter-state supply of goods, E-commerce sellers, Casual taxable persons, Input service distributors, TDS/TCS deductors.

GST through SPICe+: If opted during incorporation, GSTIN is allotted automatically. Provisional ID provided initially, converted to permanent GSTIN. If not opted, apply separately through gst.gov.in. Separate registration required if operating in multiple states.

Standalone GST registration process: Step 1 - Visit gst.gov.in, click Services → Registration → New Registration. Step 2 - Enter basic details (PAN, email, mobile), verify via OTP. Step 3 - TRN (Temporary Reference Number) generated. Step 4 - Complete application (Form GST REG-01): Part A - Basic details (auto-populated from TRN), Part B - Business details, promoter details, principal place of business, additional places, bank account, authorized signatory. Step 5 - Upload documents: PAN, Aadhaar, address proof, photos, authorization letter. Step 6 - Verify via DSC or EVC. Step 7 - ARN generated, application processed in 3-7 days.

Documents required for GST: PAN of business/proprietor, Aadhaar of proprietor/partners/directors, Business address proof (rent agreement, electricity bill), Bank account statement or cancelled cheque, Photograph of proprietor/partners/directors, Constitution document (COI for company, Partnership deed for firm), Authorization letter and DSC of authorized signatory.

GSTIN structure: 15-digit alphanumeric, Example: 27AABCU9603R1Z5. Format: First 2 digits - State code, Next 10 digits - PAN, 13th digit - Entity number (Z for company), 14th digit - Blank (for future use), 15th digit - Check digit. Note: One PAN can have multiple GSTINs (one per state of operation).

Post-registration compliance: Display GSTIN at principal place of business. Issue GST-compliant invoices for all taxable supplies. File returns as per schedule (covered in Day 16). Maintain records for at least 6 years.', '["Determine if GST registration is required for your business - check turnover and nature of supply", "If applying separately, gather all required documents in specified formats", "Apply for GST registration through gst.gov.in portal", "After registration, update invoicing system with GSTIN and configure GST rates"]'::jsonb, '["GST Registration Requirement Checker", "GST Registration Document Checklist", "GST Portal Navigation Guide", "GST Invoice Template with all mandatory fields"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 14, 'GST Compliance Infrastructure', 'Setting up GST compliance infrastructure from Day 1 saves significant pain later. This covers invoicing, input tax credit, and record-keeping requirements.

GST invoice requirements: Mandatory fields: GSTIN of supplier, consecutive serial number, Date of issue, Name, address, GSTIN of recipient (if registered), HSN code (4-8 digits based on turnover), Description of goods/services, Quantity and unit, Total value, Taxable value, Tax rate and amount (CGST, SGST/IGST), Place of supply (for services), Signature or digital signature.

HSN code requirements: Turnover > Rs 5 crore: 6-digit HSN mandatory. Turnover Rs 1.5-5 crore: 4-digit HSN mandatory. Turnover < Rs 1.5 crore: HSN optional but recommended. SAC (Service Accounting Code): 6-digit code for services. Find codes: cbic-gst.gov.in HSN/SAC finder tool.

Input Tax Credit (ITC) fundamentals: ITC allows you to reduce GST payable by claiming credit for GST paid on purchases. Eligible ITC: GST on goods/services used for business, GST on capital goods. Blocked ITC (cannot claim): Motor vehicles (some exceptions), Food and beverages, Health services, Rent-a-cab, Personal consumption. ITC conditions: Must have valid tax invoice, Must have received goods/services, Must file returns, Supplier must have filed their returns.

ITC reconciliation: Match your purchase data with GSTR-2A (auto-populated from suppliers). Mismatch means: Supplier hasn''t filed return (common issue in India), Invoice details don''t match, Fake invoices (fraud risk). Regular reconciliation (monthly) prevents ITC loss at year-end.

Record-keeping requirements: Invoice register (sales and purchases), Stock register, Production/manufacturing records, Input-output records, E-way bill records. Retention period: 72 months (6 years) from due date of annual return. Format: Physical or electronic, but must be producible on demand.

Accounting software setup: Essential features: GST-compliant invoicing, HSN/SAC code master, ITC tracking, Return preparation. Popular options: Tally (most accountants familiar), Zoho Books (cloud, startup-friendly), ClearTax (good for compliance), Busy Accounting (affordable). Recommendation: Use cloud software for accessibility and automatic updates.', '["Set up GST-compliant invoicing with all mandatory fields and HSN codes", "Create purchase tracking system for ITC claims", "Implement ITC reconciliation process (monthly) with GSTR-2A matching", "Select and configure accounting software with GST features"]'::jsonb, '["GST Invoice Format Template with field explanations", "HSN Code Finder Guide for common categories", "ITC Tracking Spreadsheet Template", "Accounting Software Comparison for startups"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 15, 'E-Invoicing and E-Way Bill', 'E-invoicing and e-way bills are mandatory for businesses above certain thresholds. Understanding these requirements helps avoid penalties and operational disruptions.

E-invoicing overview: Mandatory for businesses with aggregate turnover above Rs 5 crore (threshold reduced progressively from Rs 500 crore in 2020). System: Generate Invoice Reference Number (IRN) on IRP (Invoice Registration Portal) before issuing invoice to customer. Benefits: Auto-population of GSTR-1, reduced data entry, improved compliance.

E-invoice process: Generate invoice in your system with required fields. Upload to IRP (einvoice1.gst.gov.in) via API or GSP. IRP validates and returns: IRN (unique invoice number), QR code (to be printed on invoice), Digitally signed invoice. Issue invoice with QR code to customer. Timeline: E-invoice must be generated before or at time of delivery.

E-invoice technical implementation: Direct API: Technical expertise required, suitable for high volumes. GSP (GST Suvidha Provider): Third-party service, easier integration. Accounting software: Many have built-in e-invoice (Tally, Zoho, ClearTax). Manual (for low volumes): einvoice1.gst.gov.in portal for one-by-one generation.

E-Way Bill requirements: Mandatory for: Movement of goods valued above Rs 50,000, Inter-state movement regardless of value (some states). Who generates: Supplier (for sales), Transporter (if supplier doesn''t), Recipient (for unregistered supplier).

E-Way Bill process: Generate on ewaybillgst.gov.in before goods movement. Details required: GSTIN of supplier and recipient, Place of dispatch and delivery, HSN code and value of goods, Transport document number, Vehicle number (can be updated later). Validity: Up to 100 km - 1 day, For every 100 km additional - 1 day. Part A: Invoice details, Part B: Vehicle details (can be generated later).

Penalties for non-compliance: E-invoicing: Penalty Rs 10,000 per invoice or 100% of tax (whichever is higher). E-way bill: Penalty Rs 10,000 or tax sought to be evaded. Detention: Goods can be detained for missing e-way bill. Defense: Keep backup of generation attempts in case of technical failures.', '["Determine if e-invoicing is applicable based on turnover threshold", "If applicable, register on IRP and set up integration with accounting software", "Understand e-way bill requirements for your goods movement patterns", "Set up e-way bill generation process integrated with invoicing"]'::jsonb, '["E-Invoicing Applicability Checker", "IRP Registration and Setup Guide", "E-Way Bill Generation Tutorial", "E-Invoice Integration Options for different software"]'::jsonb, 60, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_4_id, 16, 'GST Return Filing', 'GST compliance requires regular return filing. Missing deadlines attracts interest, penalties, and can block ITC claims. Setting up a systematic filing process is essential.

GST return calendar: GSTR-1: Outward supplies (sales). Monthly: By 11th of next month, Quarterly (QRMP): By 13th of month following quarter. GSTR-3B: Summary return with tax payment. Monthly: By 20th of next month, Quarterly (QRMP): By 22nd/24th of month following quarter. GSTR-9: Annual return (due December 31 of next year). GSTR-9C: Reconciliation statement (if turnover > Rs 5 crore).

QRMP scheme: For businesses with turnover up to Rs 5 crore. Quarterly filing of GSTR-1 and GSTR-3B. Monthly payment through PMT-06 by 25th (using challan). Invoice Furnishing Facility (IFF): Optional monthly upload of B2B invoices for faster ITC to recipients. Benefit: Reduced filing frequency (4 vs 12 times per year).

GSTR-1 filing process: Compile all outward supplies for the period. Categorize: B2B (business to business) - invoice-wise details, B2C (business to consumer) - consolidated, Exports, credit/debit notes. Upload via: Portal (gst.gov.in), Offline tool (download, fill, upload), Accounting software direct filing. Review auto-drafted GSTR-1 from e-invoices (if applicable). Submit and file with DSC/EVC.

GSTR-3B filing process: Auto-populated from GSTR-1 and GSTR-2A. Review values: Output tax liability (from sales), Input tax credit (from purchases), Net tax payable. Make payment if tax payable (cash or ITC). File return with DSC/EVC.

ITC claim best practices: Reconcile purchases with GSTR-2A before filing GSTR-3B. Claim ITC only on invoices appearing in GSTR-2A (to avoid mismatches). Follow up with vendors who haven''t filed their returns. Reverse ITC on invoices older than 180 days without payment.

Penalties for late filing: Late fee: Rs 50/day (Rs 25 CGST + Rs 25 SGST), maximum Rs 10,000 per return. Nil return: Rs 20/day (Rs 10 CGST + Rs 10 SGST). Interest: 18% p.a. on tax unpaid. ITC blocking: If GSTR-3B not filed for 2 consecutive months, ITC blocked in GSTR-2B.', '["Set up GST return filing calendar with reminders 5 days before each due date", "Choose filing mode: direct portal, offline tool, or accounting software", "Create monthly checklist for data compilation before filing", "Evaluate QRMP scheme eligibility and opt-in if beneficial"]'::jsonb, '["GST Return Filing Calendar (auto-updating)", "GSTR-1 Data Compilation Template", "GSTR-3B Filing Checklist", "ITC Reconciliation Guide"]'::jsonb, 90, 75, 3, NOW(), NOW());

    -- MODULE 5: Banking & Financial Setup (Days 17-20)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Banking & Financial Setup',
        'Establish corporate banking relationships, payment gateway integration, accounting systems, and financial controls for professional financial management.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    (gen_random_uuid()::text, v_module_5_id, 17, 'Corporate Bank Account Opening', 'Your corporate bank account is the financial backbone of your company. Choosing the right bank and account type impacts your daily operations, payment processing, and even fundraising perception.

Bank selection criteria: Branch network vs digital-first: Traditional banks (SBI, ICICI, HDFC) have branches everywhere but slower processes. Digital-first (Kotak 811, RBL, IDFC First) offer faster processing but limited branches. Startup-focused services: Some banks have dedicated startup banking teams (ICICI Startup, HDFC Startup). Integration capabilities: API access for accounting software, payment gateway, payroll. Cash management: Important if dealing with cash (retail, distribution). International transactions: SWIFT capabilities, forex desk (important for SaaS/export).

Account types for startups: Current Account: Primary operating account. No interest, minimum balance Rs 10,000-25,000. Savings Account: Not allowed for companies (only individuals, HUFs, societies). Fixed Deposits: Park excess funds, earn 5-7% interest. EEFC Account: Foreign currency account for export earnings. Overdraft: Working capital facility linked to current account.

Documentation for bank account: Certificate of Incorporation (original for sighting), MOA and AOA (certified copies), PAN card of company, Board Resolution: Resolution for opening account, naming authorized signatories, defining signing authority (singly, jointly, either of any two, etc.). Director KYC: PAN, Aadhaar, address proof, photos for all directors. Company rubber stamp: Order immediately after incorporation. GST certificate: If registered.

Board resolution format: Critical contents: Account to be opened with [Bank Name] [Branch], Authorized signatories: [Names], Signing authority: Single/Joint (specify), Transaction limits (optional). Get template from bank and customize. Must be signed by directors and stamped.

Process timeline: Application submission: Day 1. Document verification: Day 1-3. Field verification (some banks): Day 3-5. Account activation: Day 5-10. Cheque book/debit card: Day 7-15. Internet banking: Same day as activation.

Neo-banks for startups: RazorpayX: Integrated with payment gateway, API-first, current account with ICICI/RBL backend. Open: Good accounting integration, automated reconciliation. Jupiter: Consumer-focused but has business accounts. Benefits: Faster account opening (3-5 days), Better tech integration, Often zero minimum balance. Limitations: No branch banking, Limited cash handling, Newer platforms (stability concerns).', '["Research and select 2-3 banks based on your requirements (branch access, digital features, startup support)", "Prepare Board Resolution for account opening with correct format and authorized signatories", "Compile all required documents in original and copies", "Apply for account with primary bank and have backup option"]'::jsonb, '["Bank Comparison Matrix for startups", "Board Resolution Template for bank account opening", "Bank Account Opening Document Checklist", "Neo-Bank Comparison Guide"]'::jsonb, 60, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 18, 'Payment Gateway Setup', 'Payment gateway is essential for online transactions. In India, Razorpay dominates the startup ecosystem, but understanding alternatives helps you make the right choice.

Payment gateway options in India: Razorpay: Market leader for startups. 2% transaction fee. Supports UPI, cards, netbanking, wallets. Good documentation, easy integration. Cashfree: Competitive rates (1.9-2%). Strong UPI Auto Pay feature. Good for subscription businesses. PayU: Established player, enterprise-friendly. Higher rates but negotiable at volume. CCAvenue: Oldest in India. Most payment options. Higher fees, dated interface. Juspay: Payment orchestration layer. Use multiple gateways through single integration.

Transaction fees comparison: Razorpay: 2% for most payments (UPI, cards, netbanking). UPI at 0% for transactions under Rs 2,000. Cashfree: 1.75-2% depending on volume commitment. PayU: 2-2.5% standard, negotiable at Rs 10L+ monthly volume. Industry average: 2% of transaction value. Factor into pricing: If your margin is 20%, payment gateway takes 10% of your margin.

Integration approaches: No-code (fastest): Razorpay Payment Pages/Links - create payment links without coding. Low-code: Razorpay Button - embed payment button with simple HTML. Standard integration: API integration for custom checkout experience. Complete customization: Build entire checkout with API, most flexibility.

KYC and activation: Razorpay KYC documents: Business PAN, GST certificate, Bank account details, Director KYC (Aadhaar, PAN), Business proof (incorporation docs). Timeline: Sandbox access: Immediate. Production access: 3-5 working days after KYC. Settlement cycle: T+2 days (can be T+1 at higher volume).

Essential features to configure: Payment methods: Enable UPI, cards, netbanking at minimum. Add wallets if target audience uses them. Webhook setup: Get notified of payment success/failure in real-time. Refund handling: Configure refund capabilities. Subscription/recurring: If SaaS model, set up recurring billing. International payments: Razorpay, Stripe (via partners), or PayPal for foreign customers.

Security and compliance: PCI-DSS: Payment gateways handle compliance. Never store card data on your servers. Secure webhook endpoints: Verify webhook signatures. Test mode: Always test thoroughly before going live.', '["Compare payment gateways and select primary option based on your needs", "Complete KYC documentation submission for selected gateway", "Set up sandbox/test account and integrate with your product", "Configure webhooks, refund handling, and essential payment methods"]'::jsonb, '["Payment Gateway Comparison Matrix", "Razorpay KYC Document Checklist", "Integration Approach Selection Guide", "Webhook Setup and Testing Guide"]'::jsonb, 60, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 19, 'Accounting System Setup', 'Professional accounting from Day 1 makes fundraising, compliance, and decision-making easier. Choose the right system and set it up correctly.

Accounting software options: Tally ERP 9/Prime: Industry standard in India. Most CAs/accountants familiar. License: Rs 22,500-54,000 one-time. Local installation (not cloud). Zoho Books: Cloud-based, good for startups. Free for revenue < Rs 50L, then Rs 1,500-4,500/month. Good integrations with other Zoho apps and payment gateways. ClearTax: Strong compliance focus, GST built-in. Rs 750-2,500/month. Good for DIY compliance. QuickBooks: International standard, popular with US-facing businesses. Rs 400-1,000/month. Good if US entity planned.

Chart of Accounts setup: Standard structure: Assets (1xxx), Liabilities (2xxx), Income (3xxx), Expenses (4xxx). Customize for your business: Specific expense categories you''ll track, Multiple bank accounts, Cost center tracking (if multiple products/locations).

Financial record-keeping requirements under Companies Act: Books of accounts: Cash book, general ledger, accounts receivable/payable. Maintenance location: Registered office (can be electronic with backup). Retention period: 8 years from end of relevant financial year. Board access: Books must be open to directors during business hours.

Accounting method: Accrual basis: Recognize revenue when earned, expenses when incurred. Required for companies with turnover > Rs 1 crore or if maintaining books on Tally/software. Cash basis: Recognize when cash changes hands. Simpler but not compliant for most companies.

Opening entries: Record initial capital contribution, Any assets brought in by founders, Any expenses already incurred (pre-incorporation expenses). Set proper date: Use incorporation date or first transaction date.

Integration setup: Bank feeds: Connect bank account for automatic transaction import. Payment gateway: Sync Razorpay/Cashfree transactions. GST: Configure GSTIN, HSN codes, tax rates. Payroll: If using separate payroll software, set up integration.', '["Select accounting software based on your scale, budget, and CA familiarity", "Set up chart of accounts customized for your business model", "Configure GST settings, tax rates, and HSN codes in accounting system", "Connect bank account and payment gateway for automated reconciliation"]'::jsonb, '["Accounting Software Comparison for Indian startups", "Standard Chart of Accounts Template", "Accounting System Initial Setup Checklist", "Bank and Gateway Integration Guide"]'::jsonb, 60, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_5_id, 20, 'Financial Controls and Policies', 'Proper financial controls prevent fraud, enable accurate reporting, and build investor confidence. Set them up early while scale is manageable.

Approval matrix design: Define who can approve what level of expense: Up to Rs 10,000: Any one director/founder. Rs 10,000-50,000: Specific director or CFO equivalent. Rs 50,000-2,00,000: Two directors jointly. Above Rs 2,00,000: Board approval (unless budgeted). Document in Board Resolution and communicate to team.

Bank mandate structure: Multiple signatories on bank account (both/all founders). Transaction limits for single authority. Dual authorization for large transfers. Separate cards with individual limits. No personal cards for business expenses.

Expense policy essentials: What''s reimbursable: Travel (class, daily allowance), Communication, Software subscriptions, Client entertainment. What''s not: Personal expenses, Family expenses, Non-work-related items. Approval process: Pre-approval for expenses above Rs X, Receipt mandatory, Submission within 7 days. Payment: Monthly reimbursement cycle, Direct deposit to employee accounts.

Petty cash management: If needed, maintain small petty cash (Rs 5,000-20,000). Proper petty cash book. Weekly reconciliation. Replenishment approval. Most startups avoid petty cash by using digital payments/cards.

Audit trail requirements: All transactions must have supporting documents. No cash transactions where bank transfer possible. Sequential numbering for invoices, vouchers. Regular backup of financial data (if local software). User access logs in accounting software.

Monthly financial discipline: Bank reconciliation: Match bank statement with books monthly. Accounts receivable review: Follow up on overdue payments. Accounts payable review: Ensure timely payment to avoid relationship issues. Cash flow forecast: Maintain 3-month rolling forecast. Financial review meeting: Monthly review with co-founders.', '["Design and document approval matrix for expenses of different values", "Set up bank mandate with proper authorization structure", "Create expense policy document and communicate to team", "Establish monthly financial review rhythm"]'::jsonb, '["Approval Matrix Template", "Expense Policy Document Template", "Monthly Financial Checklist", "Cash Flow Forecast Template"]'::jsonb, 60, 50, 3, NOW(), NOW());

    -- Add remaining modules 6-10 with lessons following similar pattern...
    -- MODULE 6: Licenses & Permits (Days 21-24)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Licenses & Permits',
        'Obtain business licenses required for legal operations including Shop & Establishment, Professional Tax, and industry-specific permits.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- MODULE 7: Employment & Labor Compliance (Days 25-28)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Employment & Labor Compliance',
        'Master EPF, ESI, and labor law compliance. Create employment documentation and ensure statutory compliance for employees.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- MODULE 8: Contracts & Agreements (Days 29-32)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Contracts & Agreements',
        'Draft and manage essential business contracts including founder agreements, vendor contracts, client agreements, and NDAs.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- MODULE 9: Ongoing Compliance (Days 33-36)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Ongoing Compliance',
        'Master annual compliance requirements including ROC filings, board meetings, statutory registers, and income tax compliance.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_9_id;

    -- MODULE 10: Compliance Automation (Days 37-40)
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Compliance Automation & Scaling',
        'Automate compliance processes, set up monitoring dashboards, and prepare systems for business scaling.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_10_id;

    -- Add sample lessons for remaining modules
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES
    -- Module 6 Lessons
    (gen_random_uuid()::text, v_module_6_id, 21, 'Shop & Establishment Registration', 'Shop and Establishment Act registration is mandatory for any premises where business is conducted with employees. The Act is state-specific, with each state having its own rules, but the core requirements are similar across India.

Legal framework: Governed by respective State Shop and Establishment Acts. Purpose: Regulate working conditions, hours, holidays, employment of women and children. Applicability: All commercial establishments employing one or more persons. Timeline: Register within 30 days of commencing business.

State-wise variations: Maharashtra: Online registration through maitri.mahaonline.gov.in. Fee: Rs 500-5,000 based on employee count. Karnataka: Online through seva.karnataka.gov.in. Fee: Rs 500-2,500. Delhi: Through delhi.gov.in labour department. Fee: Rs 500-1,000. Most states now have online registration with 7-15 day processing.

Registration requirements: Application form (state-specific), Proof of premises (rent agreement/ownership), Identity proof of proprietor/directors, Photograph of establishment, Employee list (if any), Fee challan.

Compliance obligations: Display: Registration certificate prominently displayed. Work hours: Generally 9 hours/day, 48 hours/week with variations by state. Weekly holiday: One paid holiday per week mandatory. Overtime: Must be compensated at 2x normal rate. Records: Maintain register of employees, wages, attendance.

Renewal and updates: Validity: Some states issue lifetime registration, others require annual renewal. Address change: Inform authority within 15 days. Closure: Inform authority within 15 days of closure. Penalty: Operating without registration: Rs 500-5,000 fine.', '["Identify the Shop and Establishment Act applicable to your state of operation", "Gather required documents: premises proof, identity documents, establishment details", "Apply for registration through state portal", "Display registration certificate upon receipt"]'::jsonb, '["State-wise Shop & Establishment Portal Directory", "Registration Document Checklist by State", "Application Form Filling Guide", "Compliance Obligations Summary"]'::jsonb, 60, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 22, 'Professional Tax Registration', 'Professional Tax is a state-level tax on professions, trades, and employment. As an employer, you need to register, deduct from employee salaries, and remit to the government.

Applicability: States with PT: Karnataka, Maharashtra, Gujarat, West Bengal, Telangana, Andhra Pradesh, Tamil Nadu, Kerala, Madhya Pradesh, Assam, and others. States without PT: Delhi, Haryana, Rajasthan, Punjab, Chandigarh, Uttarakhand. Two registrations: PT registration for company (employer), PT deduction obligation for employees.

PT rates (vary by state): Maharashtra: Up to Rs 21,000/month: Rs 175. Above Rs 21,000/month: Rs 200 (max). Karnataka: Up to Rs 15,000: Nil. Rs 15,001-25,000: Rs 200. Above Rs 25,000: Rs 200 for 11 months, Rs 300 for February. Gujarat: Varies by salary slab, max Rs 200/month.

Registration process: Employer registration (PTEC): Register on state commercial tax website. Submit: PAN, COI, address proof. Fee: Rs 500-2,500 one-time. Get PTEC (Professional Tax Enrollment Certificate). Employee deduction registration (PTRC): Register as deductor for employees. Submit: PTEC, employee list. Monthly/quarterly filing and payment obligations.

Compliance: Deduct PT from employee salaries at applicable rate. Remit to government by 15th of following month (varies by state). File monthly/quarterly returns (varies by state). Issue Form 16 equivalent to employees for PT deducted. Annual reconciliation filing.

Penalties: Late payment: Interest 1-2% per month. Non-registration: Rs 5-50 per day of default. Wrong deduction: Penalty equal to tax amount.', '["Determine PT applicability based on state of operation", "Register for PTEC (employer registration) on state portal", "Set up payroll system to deduct PT at applicable rates", "Create PT payment and filing calendar"]'::jsonb, '["Professional Tax Rate Chart by State", "PT Registration Guide by State", "PT Deduction Calculator", "PT Compliance Calendar"]'::jsonb, 60, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 23, 'Industry-Specific Licenses', 'Depending on your industry, you may need specific licenses beyond general business registrations. Identifying and obtaining these early prevents operational disruptions.

Technology/SaaS: Generally no specific license required for pure software. If handling payment data: PCI-DSS compliance (through payment gateway). If collecting personal data: Privacy policy, data protection compliance (upcoming DPDPA). If providing financial services: RBI registration may be required.

E-commerce: FDI compliance (marketplace vs inventory model). If consumer products: BIS certification for certain categories. If food products: FSSAI registration/license. Consumer Protection Act compliance. Legal Metrology compliance for packaged goods.

Healthcare/Wellness: CDSCO registration for medical devices. State drug license for pharmaceuticals. Clinical establishment registration (state-level). Telemedicine: Guidelines compliance (though not licensed).

Food business: FSSAI registration (turnover <Rs 12L) or license (>Rs 12L). Trade license from local municipal corporation. Packaging and labeling compliance. For manufacturing: Additional factory licenses.

Education/EdTech: Currently largely unregulated. If awarding degrees/certificates: UGC/AICTE/State Board approvals. If K-12 curriculum: State education board approvals. For foreign students: FRRO compliance.

Financial services: NBFC: RBI registration (3-6 month process). Payment Aggregator: RBI PA license (new guidelines). Peer-to-peer lending: RBI NBFC-P2P registration. Insurance: IRDAI registration.

Quick license requirement check: Create list of all activities your business will undertake. For each activity, research if license/registration required. Timeline: Many licenses take 3-6 months - plan ahead. Non-compliance: Can result in business closure, not just fines.', '["Create comprehensive list of all business activities planned", "Research license requirements for each activity using provided checklist", "Identify licenses needed and their application process", "Create timeline and budget for obtaining required licenses"]'::jsonb, '["Industry-Specific License Requirement Checker", "License Application Process Guide by Industry", "Regulatory Body Directory", "License Timeline and Cost Estimator"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_6_id, 24, 'License Compliance Management', 'Licenses aren''t one-time - they require ongoing compliance, renewals, and updates. Setting up a management system prevents costly lapses.

License inventory creation: List all licenses obtained: Name, Number, Issuing authority, Issue date, Validity, Renewal date. Include: Shop & Establishment, GST, Professional Tax, Industry-specific, Trade license, Fire NOC (if applicable).

Renewal management: Create calendar with: Renewal dates (set reminder 60 days before), Documents required for renewal, Fees payable, Contact at issuing authority. Common renewal periods: Annual: Most business licenses, trade licenses. 5 years: GST registration (for composition dealers). Lifetime/perpetual: Some Shop & Establishment registrations.

Compliance tracking: For each license, track: Filing requirements (monthly, quarterly, annual), Payment obligations, Display requirements, Record-keeping requirements. Create checklist for each license period.

Change management: When changes occur (address, directors, business activity): Identify which licenses need amendment. File amendment within stipulated time (usually 15-30 days). Pay amendment fees if applicable. Update license inventory.

Audit preparation: Maintain organized files: Original licenses, Renewal receipts, Correspondence with authorities, Compliance records. Segregate by license type. Digital backup recommended. Accessibility: Produce within 24-48 hours if authority asks.

Non-compliance consequences: Operating without valid license: Closure notice, Penalty 5-50x annual fee. Lapsed license: May need fresh application (losing seniority/benefits). Repeated non-compliance: Potential criminal prosecution for certain licenses.', '["Create master license inventory with all current licenses and key details", "Set up renewal calendar with 60-day advance reminders", "Establish compliance tracking system for ongoing obligations", "Create organized filing system for all license documents"]'::jsonb, '["License Inventory Template", "Renewal Calendar Template", "Compliance Tracking Checklist", "Document Organization Guide"]'::jsonb, 60, 75, 3, NOW(), NOW()),

    -- Module 7 Sample Lessons
    (gen_random_uuid()::text, v_module_7_id, 25, 'EPF Registration and Compliance', 'Employee Provident Fund (EPF) is a mandatory social security scheme for establishments with 20 or more employees. Understanding and complying with EPF is essential as you scale your team.

EPF applicability: Mandatory for establishments with 20+ employees (including contract workers). Voluntary registration available for establishments with fewer employees. Once registered, remains applicable even if employee count drops below 20. Covers employees earning up to Rs 15,000/month (can extend to higher-paid with consent).

Contribution rates (as of 2024): Employee contribution: 12% of basic + DA. Employer contribution: 12% of basic + DA (split as: 3.67% to EPF, 8.33% to EPS). Admin charges: 0.5% of wages (minimum Rs 500 if wages <Rs 1 lakh). EDLI contribution: 0.5% of wages (maximum Rs 15,000 base).

Registration process: Online registration at unifiedportal-emp.epfindia.gov.in. Documents required: PAN of establishment, COI/Partnership deed, Address proof, Bank details, Employee details (Aadhaar, PAN, bank account). Processing time: 7-15 days. UAN (Universal Account Number) generated for each employee.

Monthly compliance: Calculate EPF for each employee. Deduct employee share from salary. Deposit total contribution (employee + employer) by 15th of following month. Generate ECR (Electronic Challan cum Return). File monthly returns on portal.

Key forms: Form 11: New employee declaration (submitted by employee). Form 2: Employee nomination. Form 5: New member registration. Form 10: Claim for withdrawal. Form 19: Final PF settlement.

Penalties: Late deposit: 12% p.a. simple interest + damages up to 25% of arrears. Non-registration: Rs 10,000 penalty + prosecution. Non-deposit: Employer contribution + 1-2% monthly interest + damages.', '["Determine EPF applicability based on current and projected employee count", "Register on EPF portal if applicable (or plan for registration at threshold)", "Set up payroll system for EPF calculation and deduction", "Create compliance calendar for monthly EPF deposits and returns"]'::jsonb, '["EPF Registration Guide with step-by-step portal navigation", "EPF Calculation Spreadsheet Template", "Monthly EPF Compliance Checklist", "UAN Generation Guide for Employees"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    -- Continue with remaining lessons for modules 7-10...
    (gen_random_uuid()::text, v_module_7_id, 26, 'ESI Registration and Benefits', 'Employee State Insurance (ESI) provides medical, cash, and other benefits to employees and their dependents. Understanding ESI helps you provide better employee benefits while ensuring compliance.

ESI applicability: Mandatory for establishments with 10+ employees in notified areas (most urban areas). Employee eligibility: Gross salary up to Rs 21,000/month. Coverage: Employee and dependents (spouse, children, dependent parents).

Contribution rates: Employee: 0.75% of gross wages. Employer: 3.25% of gross wages. Total: 4% of wages. Note: Significantly lower than EPF rates but provides comprehensive health coverage.

Benefits provided: Medical benefit: Free medical care at ESI hospitals/dispensaries for employee and family. Sickness benefit: 70% of wages for up to 91 days in a year during sickness. Maternity benefit: Full wages for 26 weeks. Disability benefit: 90% of wages for temporary disablement, pension for permanent. Dependent benefit: Pension to dependents if employee dies. Funeral expenses: Rs 15,000 lump sum.

Registration process: Online registration at esic.gov.in. Documents: PAN, COI, address proof, employee details. 17-digit ESIC code allotted. Employee IP numbers generated.

Monthly compliance: Calculate ESI on gross wages (including OT, allowances). Deduct employee share. Deposit total by 15th of following month. File monthly contribution details online.

Employee communication: Educate employees about ESI benefits. Provide ESIC card/number. List nearest ESI dispensaries/hospitals. Process for claiming benefits.', '["Determine ESI applicability for your establishment", "Register on ESIC portal if applicable", "Set up payroll for ESI calculation and deduction", "Communicate ESI benefits and claiming process to employees"]'::jsonb, '["ESI Registration Guide", "ESI Calculation Template", "ESI Benefits Summary for Employees", "Nearest ESI Facility Finder"]'::jsonb, 60, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_7_id, 27, 'Employment Documentation', 'Proper employment documentation protects both company and employees. Creating comprehensive documentation from Day 1 prevents disputes and supports compliance.

Offer letter essentials: Job title and reporting structure. Start date and probation period. Compensation: CTC breakdown, payment schedule. Working hours and location. Benefits overview. Conditions: Background check, documents required.

Employment contract (Appointment Letter): Detailed terms building on offer letter. Duties and responsibilities. Confidentiality obligations. IP assignment clause (crucial for tech companies). Non-compete provisions (limited enforceability in India). Termination provisions: notice period, grounds. Governing law and dispute resolution.

HR policy documents: Leave policy: Types, entitlement, approval process, encashment. Attendance policy: Work hours, flexibility, overtime. Code of conduct: Expected behavior, dos and don''ts. POSH policy: Sexual harassment prevention (mandatory for 10+ employees). IT/security policy: Device usage, data handling. Remote work policy: If applicable.

Employee file documentation: Personal information form. Identity and address proofs. Educational certificates. Previous employment documents. Bank account details for salary. Emergency contact information. Signed employment contract. Policy acknowledgment forms.

Statutory documentation: Form 11 (EPF): New joiner declaration. Form 2 (EPF): Nomination form. Form 1 (ESI): Declaration form. Gratuity nomination: Form F.

Exit documentation: Resignation acceptance. Experience/relieving letter. Full and final settlement. Form 15G/15H for PF withdrawal (if eligible). No dues clearance.', '["Create employment contract template with all essential clauses", "Draft core HR policies: leave, attendance, code of conduct", "Set up employee file checklist and document collection process", "Create offer letter template customized for your company"]'::jsonb, '["Employment Contract Template (India-compliant)", "HR Policy Templates Pack", "Employee File Checklist", "Offer Letter Template"]'::jsonb, 90, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_7_id, 28, 'Labor Law Compliance Calendar', 'Multiple labor laws with different compliance requirements can be overwhelming. A systematic compliance calendar ensures nothing is missed.

Monthly compliance: EPF payment and ECR filing: By 15th. ESI payment and filing: By 15th. Professional Tax remittance: By 15th (state-specific). Salary payment: As per contract (usually 7th). Leave register update: Continuous.

Quarterly compliance: Professional Tax returns: Some states require quarterly. TDS deposit: By 7th of following month (monthly for most). TDS return (24Q for salaries): By 31st of month following quarter.

Half-yearly compliance: Labor welfare fund contribution: Some states (July and January). Form 3A (EPF): Half-yearly statement.

Annual compliance: Annual PT return: Usually by May 31. Annual EPF return: Form 3A and 6A by April 30. Gratuity valuation: For accounting purposes. Leave encashment/lapse: As per policy. Bonus payment: By November 30 (for eligible employees). Form 16 issuance: By June 15.

Statutory returns and registers: Muster roll: Daily attendance record. Wage register: Monthly salary details. Leave register: Leave applications and approvals. OT register: Overtime hours and payment. Form A/B: Annual return under Shops Act.

Inspection readiness: Keep all registers updated and accessible. Display mandatory notices/abstracts. Maintain inspection ready file: Licenses, registrations, policy documents.

Audit trail: Document all compliance actions. Keep payment challans and receipts. Maintain correspondence with authorities. Screenshot of online submissions.', '["Create comprehensive labor law compliance calendar with all due dates", "Set up automated reminders for each compliance item", "Assign compliance responsibilities to specific team members", "Create monthly compliance checklist for review"]'::jsonb, '["Labor Law Compliance Calendar (auto-updating)", "Monthly Compliance Checklist Template", "Inspection Readiness Checklist", "Compliance Responsibility Matrix"]'::jsonb, 60, 75, 3, NOW(), NOW()),

    -- Module 8-10 Sample Lessons
    (gen_random_uuid()::text, v_module_8_id, 29, 'Founders Agreement', 'A founders agreement is arguably the most important document for a startup with multiple founders. It prevents disputes by clearly documenting expectations, equity, and exit scenarios upfront.

Why founders agreements matter: 65% of high-potential startups fail due to co-founder conflict (Noam Wasserman, Harvard). Most conflicts arise from undocumented assumptions. Early-stage disagreements, when unresolved, compound over time. Investor due diligence always asks for founder agreement.

Key provisions to include: Equity split and rationale: Document not just the split but why it''s fair. Include any future adjustments agreed upon. Vesting schedule: Standard: 4-year vesting, 1-year cliff. Accelerations: Single trigger (100% on acquisition) or double trigger (acquisition + termination). Reverse vesting for already-issued shares.

Roles and responsibilities: Who is CEO, CTO, etc.? Decision-making authority by domain. What requires unanimous consent? Commitment: Full-time vs part-time? Outside activities permitted? Moonlighting restrictions.

IP assignment: All IP created for company belongs to company. Includes: code, designs, inventions, content, trade secrets. Pre-existing IP: License to company or assign? Future IP: Automatic assignment clause.

Exit scenarios: Voluntary departure: What happens to unvested shares? Vested shares? Good leaver vs bad leaver treatment. Termination: Grounds for removal from board/management. Notice period and transition obligations. Death/disability: What happens to shares? Insurance considerations. Buy-back rights: Company or other founders can repurchase shares.

Non-compete and non-solicit: Non-compete: Limited enforceability in India (Section 27, Indian Contract Act). Can restrict competing during employment. Post-employment restrictions: debatable enforceability. Non-solicitation: Restrictions on hiring away employees. Generally more enforceable than non-compete.

Dispute resolution: Mediation first: Informal resolution attempt. Arbitration: Faster than courts, confidential. Governing law: Usually state where company is registered.', '["Have explicit conversations with co-founders covering all key areas", "Draft founders agreement using provided template and customize", "Include IP assignment clause and get it reviewed by legal counsel", "Execute the agreement (consider notarization for extra protection)"]'::jsonb, '["Founders Agreement Template (comprehensive)", "Equity Split Discussion Framework", "Vesting Schedule Calculator", "Co-founder Conversation Guide"]'::jsonb, 90, 75, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 30, 'Vendor and Client Contracts', 'Professional vendor and client contracts protect your business, ensure clear expectations, and prevent costly disputes. Templates are a starting point, but understanding key provisions is essential.

Vendor contract essentials: Scope of work: Detailed description of deliverables, timelines, and specifications. Vague scope is the #1 source of disputes. Payment terms: Amount, milestones, invoice process. Net 30 is standard, but negotiate based on relationship. Pricing changes: How and when prices can change. Lock-in period and escalation caps.

Key vendor contract clauses: Service levels (SLA): Define acceptable performance. Penalties for non-performance. Measurement and reporting requirements. Confidentiality: Protect your business information. Define what''s confidential and duration. Return/destroy obligations. IP ownership: Who owns work product? Especially important for development/design vendors. Assignment vs license. Termination: Notice period (30-90 days typical). Exit assistance obligations. Data return/deletion.

Client contract essentials: Services/products description: Clear deliverables. Acceptance criteria if applicable. What''s included and excluded. Pricing and payment: Total price or rate structure. Payment schedule and terms. Late payment consequences.

Key client contract clauses: Limitation of liability: Cap liability at contract value or specific amount. Exclude indirect/consequential damages. Important: Don''t accept unlimited liability. Warranties: What you''re guaranteeing. For how long. Remedies if warranty breached. Indemnification: Who bears risk for third-party claims. Carve out for IP infringement, negligence. Be careful with broad indemnities. Intellectual property: Who owns deliverables? Background IP vs foreground IP. License grants.

India-specific considerations: Stamp duty: Certain contracts require stamp duty. Rate varies by state and contract type. Can be adjudicated for legal validity. Jurisdiction: Choose where disputes will be resolved. Indian courts can take years - consider arbitration. Force majeure: Include comprehensive clause (COVID taught us this). Electronic execution: Valid under IT Act 2000 for most contracts.', '["Create vendor contract template covering scope, payment, SLA, and termination", "Create client contract template with appropriate liability limits", "Review existing vendor relationships and document with proper contracts", "Establish contract review process for future agreements"]'::jsonb, '["Vendor Contract Template", "Client Contract Template", "Contract Clause Library", "Contract Negotiation Guide"]'::jsonb, 90, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 31, 'NDA and Confidentiality', 'Non-Disclosure Agreements protect your business secrets when sharing information with potential partners, employees, investors, and vendors. Understanding when and how to use NDAs is essential.

When to use NDAs: Before sharing proprietary information with: Potential partners, Potential investors (though some refuse), Vendors/contractors, New employees. Situations to protect: Business plans and strategies, Customer lists and data, Technology and source code, Financial information, Trade secrets.

Types of NDAs: Mutual NDA: Both parties share and protect information. Used for: potential partnerships, joint ventures, merger discussions. One-way NDA: Only one party shares. Used for: employee onboarding, vendor discussions, investor meetings.

Key NDA provisions: Definition of confidential information: Be specific: what''s covered and what''s not. Usually excludes: publicly available info, independently developed info, info received from third parties, info disclosed by law/court order. Purpose limitation: Can only use information for stated purpose. Cannot use for competitive advantage or any other purpose.

Obligations: Protect information with reasonable care (same as own confidential info). Limit access to need-to-know personnel. Notify discloser of any breach immediately. No reverse engineering (for technical info).

Duration: During relationship + 2-5 years after. Trade secrets: Some argue indefinite protection. Practical approach: 3-5 years for most business info, longer for core IP.

Return/destruction: Upon termination or request: Return all copies, Destroy copies (with confirmation), Exception: legally required retention.

Remedies: Injunctive relief: Court order to stop breach. Damages: Compensation for losses. Non-exclusive remedies: Can pursue both.

Common NDA mistakes: Too broad definition: Makes entire NDA unenforceable. Too long duration: Unusual terms get pushed back on. Missing exceptions: Need carve-outs for legal obligations, public info. No governing law: Specify jurisdiction.

Practical tips: Keep NDA reasonable - overly aggressive terms get rejected. Have both versions ready (mutual and one-way). Track signed NDAs and expiration dates. Don''t over-rely on NDAs - they''re hard to enforce across borders.', '["Create mutual NDA template for partnership discussions", "Create one-way NDA template for sharing with vendors and employees", "Set up NDA tracking system with expiration alerts", "Define internal protocol: when to use NDA, who can sign"]'::jsonb, '["Mutual NDA Template", "One-Way NDA Template", "NDA Tracking Spreadsheet", "When to Use NDA Decision Guide"]'::jsonb, 60, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_8_id, 32, 'Contract Management System', 'As your contract volume grows, systematic management becomes essential. A contract management system ensures nothing falls through the cracks and supports quick retrieval when needed.

Contract management components: Repository: Central storage for all contracts. Tracking: Key dates, obligations, renewals. Workflow: Approval processes, signing. Analytics: Spend analysis, vendor performance.

DIY vs software solutions: DIY (for early stage): Google Drive/Dropbox organized folders, Spreadsheet for tracking key dates, Calendar alerts for renewals. Cost: Free.

Simple tools: Notion (free-paid): Good for small contract volumes, Airtable (free-paid): Database approach, flexible. Cost: Rs 0-2,000/month.

Dedicated contract management: ContractPodAi, Ironclad, Icertis (enterprise). Features: Electronic signature, automated workflows, AI extraction. Cost: Rs 5,000-50,000/month (enterprise pricing).

Contract repository organization: Folder structure: By type (Vendor, Client, Employment, Legal), By status (Active, Expired, Terminated), By entity (if multiple companies). Naming convention: [Type]_[Party Name]_[YYYY-MM-DD]_[Version]. Example: Vendor_AcmeSoftware_2024-01-15_v2.pdf.

Key dates to track: Start date, End date/renewal date, Notice period deadline (when to decide renewal), Payment milestones, SLA review dates, Price escalation dates.

Contract review workflow: Draft/receive contract → Initial review (relevant team) → Legal review (for significant contracts) → Negotiation rounds → Final approval (based on value thresholds) → Signature → File in repository → Set alerts.

Ongoing management: Monthly: Review contracts expiring in 90 days. Quarterly: Vendor performance review against SLAs. Annually: Full contract audit - are all active contracts in repository?

Security considerations: Access control: Who can view which contracts? Version control: Prevent unauthorized modifications. Backup: Regular backup of contract repository. Confidentiality: Contracts contain sensitive terms.', '["Set up contract repository with organized folder structure and naming convention", "Create contract tracking spreadsheet with all key dates and obligations", "Define contract review and approval workflow based on value thresholds", "Establish monthly/quarterly contract review routine"]'::jsonb, '["Contract Repository Setup Guide", "Contract Tracking Template", "Contract Approval Workflow Template", "Contract Management Software Comparison"]'::jsonb, 60, 50, 3, NOW(), NOW()),

    -- Module 9 Lessons
    (gen_random_uuid()::text, v_module_9_id, 33, 'Annual ROC Filings', 'Annual filings with Registrar of Companies are mandatory for all companies. Missing deadlines attracts penalties and can result in company being struck off.

Annual filing overview: Form AOC-4: Financial statements filing. Form MGT-7/MGT-7A: Annual return. Due: Within 30 days of AGM (financial statements), Within 60 days of AGM (annual return). AGM due: Within 6 months from financial year end (September 30 for March year-end). First year: 9 months from incorporation.

Form AOC-4 (Financial Statements): Contents: Balance sheet, P&L statement, Cash flow statement (if applicable), Notes to accounts, Directors'' Report, Auditors'' Report. Attachments: Signed financial statements, Board report, Auditors'' report. Fee: Based on authorized capital (Rs 200-600). Signing: By Director and Company Secretary (if applicable).

Form MGT-7/MGT-7A (Annual Return): MGT-7: Full annual return (for large companies). MGT-7A: Abridged return (for small companies and OPCs). Contents: Company details, registered office, principal business. Directors and KMP details. Shareholders details and changes. Indebtedness, If applicable: Details of annual general meeting.

Small company criteria: Paid-up capital ≤ Rs 4 crore AND Turnover ≤ Rs 40 crore. Benefits: Can file MGT-7A instead of MGT-7, No cash flow statement required, Lighter penalty structure.

Penalties for delayed filing: AOC-4: Rs 100/day for company + Rs 100/day for officer in default. MGT-7: Rs 100/day for company + Rs 50/day for officer in default. Maximum: Rs 10 lakh per form. After 270 days default: Company name can be struck off.

Filing process: Prepare documents (financial statements, reports). Get Board approval for financial statements. Hold AGM and get shareholder approval. Within 30 days of AGM: File AOC-4. Within 60 days of AGM: File MGT-7/MGT-7A. Sign with DSC of Director.', '["Prepare annual financial statements with help of auditor/CA", "Schedule and conduct AGM within statutory deadline", "File AOC-4 within 30 days of AGM", "File MGT-7/MGT-7A within 60 days of AGM"]'::jsonb, '["Annual Filing Checklist with deadlines", "AOC-4 Filing Guide", "MGT-7/MGT-7A Filing Guide", "AGM Preparation Checklist"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 34, 'Board Meetings and Minutes', 'Board meetings are not just compliance - they''re governance mechanisms for strategic decisions. Proper conduct and documentation is essential.

Board meeting requirements: Frequency: Minimum 4 meetings per year. Gap: Not more than 120 days between meetings. First meeting: Within 30 days of incorporation. Quorum: 1/3 of total directors or 2, whichever is higher.

Notice requirements: Duration: 7 days advance notice. Mode: Written notice to registered address or email. Contents: Day, date, time, venue, agenda items. Shorter notice: Allowed if all directors consent.

Meeting conduct: Chairman: Board elects chairman. If chairman absent, directors choose one. Agenda: Follow agenda, additional items with majority consent. Voting: Usually by show of hands, demand for poll if required. Chairman has casting vote in case of tie.

Items typically covered in board meetings: Financial review: Monthly/quarterly performance. Compliance update: Status of various filings. Business decisions: Major contracts, investments, borrowings. Statutory appointments: Auditors, company secretary. Shareholder matters: Dividend, rights issue, etc.

Minutes documentation: Contents: Date, time, venue, Attendees and absentees, Agenda items discussed, Decisions taken (resolution wise), Dissent if any (recorded on request).

Signing: Within 30 days by Chairman of meeting (or next meeting). Page-wise initials recommended.

Storage: Minutes book maintained at registered office. Electronic minutes allowed with proper security.

Common board meeting mistakes: No proper notice, Inadequate quorum, Minutes not signed within 30 days, Resolutions not properly worded, Not maintaining minutes book.', '["Create annual board meeting calendar with at least 4 meetings scheduled", "Prepare and send proper notice for upcoming board meeting", "Conduct board meeting with appropriate agenda and quorum", "Document minutes within 30 days and get chairman''s signature"]'::jsonb, '["Board Meeting Calendar Template", "Board Meeting Notice Format", "Board Meeting Agenda Template", "Minutes Documentation Template"]'::jsonb, 60, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 35, 'Statutory Registers', 'Companies Act requires maintenance of various registers. These registers document company history and are produced during inspections and due diligence.

Register of Members (Section 88): Contents: Name, address, shares held, Date of becoming/ceasing to be member, Amount paid/unpaid on shares. Update: Within 7 days of any change. Format: Form MGT-1.

Register of Directors and KMP (Section 170): Contents: Director particulars, DIN, Shareholding, Date of appointment/cessation, Other directorships. Update: Within 30 days of appointment/change. Format: Form MBP-1.

Register of Charges (Section 85): Contents: Charge details (property charged, amount, lender). Registration: Within 30 days of creating charge. Satisfaction: File when charge is satisfied/paid off.

Other important registers: Register of Share Transfers, Register of Contracts with related parties, Register of Loans, guarantees, and security, Register of investments not held in company name.

Minutes books (Sections 118-120): Board meeting minutes, General meeting minutes. Preserved for: 8 years from date of meeting. Page numbering: Consecutive, no blanks.

Register maintenance rules: Location: At registered office (can be at other place with Board resolution). Format: Physical or electronic (proper backup required). Inspection: Open to members during business hours. Copies: Members entitled to copies (fee chargeable).

Digitization: Electronic registers permitted. Must have: Backup systems, Audit trail, Restricted access. Print capability on demand.', '["Set up all required statutory registers (physical or electronic)", "Update Register of Members with current shareholding", "Update Register of Directors with all director details", "Establish process for keeping registers current"]'::jsonb, '["Statutory Register Templates Pack", "Register Update Procedure Guide", "Electronic Register Setup Guide", "Register Inspection Readiness Checklist"]'::jsonb, 60, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_9_id, 36, 'Income Tax Compliance', 'Income tax compliance for companies includes advance tax, TDS obligations, and annual return filing. Systematic management prevents penalties and supports cash flow planning.

Corporate tax rates (FY 2023-24): Normal rate: 25% (for turnover < Rs 400 crore). New regime: 22% (if foregoing exemptions/deductions). Startup exemption: 100% tax holiday for 3 consecutive years out of first 10 years (with conditions). MAT: 15% of book profits.

Advance tax obligations: Who: If tax liability exceeds Rs 10,000 for the year. Schedule: By June 15: 15% of annual tax, By September 15: 45% of annual tax, By December 15: 75% of annual tax, By March 15: 100% of annual tax. Penalty for shortfall: Interest at 1% per month.

TDS compliance: Salary (192): Monthly deposit by 7th. Rent (194I): If exceeds Rs 2.4 lakh/year. Professional fees (194J): If exceeds Rs 30,000/year. Contractor payments (194C): Various thresholds. Interest (194A): If exceeds Rs 5,000/year (for individuals). Returns: 24Q (salary), 26Q (non-salary) - quarterly.

Annual return filing: Form: ITR-6 for companies. Due date: October 31 (if audit required, which is all companies). Audit report: Form 3CD along with return. Late filing: Rs 5,000 if filed by December 31, Rs 10,000 if later.

Tax planning opportunities: Section 80-IAC: Startup tax exemption (100% for 3/10 years). Section 35: R&D expenditure deduction (150-200%). Section 10(10C): Leave encashment exemption for employees. Depreciation: Higher rates for certain assets. Loss carry forward: Business loss 8 years, capital loss varies.

Working with tax advisors: Chartered Accountant required for audit. Tax planning: Engage early in financial year. Compliance: Outsource or have dedicated resource. Budget: Rs 50,000-2,00,000/year for typical startup.', '["Set up advance tax calculation and payment calendar", "Establish TDS deduction, deposit, and return filing process", "Identify applicable tax exemptions and planning opportunities", "Engage CA for audit and tax return filing"]'::jsonb, '["Income Tax Compliance Calendar", "Advance Tax Calculator", "TDS Rate Chart and Thresholds", "Tax Planning Opportunities Checklist"]'::jsonb, 90, 75, 3, NOW(), NOW()),

    -- Module 10 Lessons
    (gen_random_uuid()::text, v_module_10_id, 37, 'Compliance Dashboard Setup', 'A compliance dashboard provides real-time visibility into your compliance status. Setting one up transforms compliance from reactive to proactive.

Dashboard purpose: Track: All compliance obligations across regulations, Due dates and status, Responsible persons, Historical compliance performance. Alert: Upcoming deadlines, Overdue items, Risk areas.

Dashboard components: Calendar view: All deadlines by date. Status board: Green (done), Yellow (upcoming), Red (overdue). Category view: By regulation (MCA, GST, Labor, etc.). Owner view: By responsible person. Trend view: Compliance rate over time.

DIY dashboard options: Google Sheets + Calendar: Simple spreadsheet with calendar integration, Free, good for early stage. Notion: Database with calendar views, More flexible, good templates available, Free for small teams. Airtable: Powerful database with automations, Multiple views and alerts, Free tier available.

Dedicated compliance software: TaxManager, ClearCompliance, LegalDesk. Features: Pre-built compliance calendars, Automatic due date updates, Document management, Audit trail. Cost: Rs 2,000-10,000/month.

Building your dashboard: Step 1 - List all compliance obligations: Regulation, Frequency, Due date logic, Forms/documents, Responsible person. Step 2 - Set up tracking: Each item as a record, Status field (pending, completed, overdue), Due date with formula for recurring items. Step 3 - Create views: Calendar view for upcoming, Kanban for status tracking, Table for detailed information. Step 4 - Add automation: Email/notification alerts, Status updates based on dates.

Alert configuration: First alert: 14 days before due date. Second alert: 7 days before due date. Urgent alert: 3 days before due date. Overdue alert: Daily until resolved. Escalation: To management if overdue > 3 days.

Review rhythm: Daily: Check dashboard for overdue and today''s items. Weekly: Review upcoming 2 weeks, assign resources. Monthly: Analyze compliance rate, identify improvement areas. Quarterly: Full compliance audit against regulations.', '["List all compliance obligations across regulations with due date logic", "Set up compliance tracking dashboard using chosen tool", "Configure alerts for upcoming and overdue items", "Establish daily/weekly review rhythm for compliance monitoring"]'::jsonb, '["Compliance Obligation Master List Template", "Dashboard Setup Guide for Notion/Airtable/Sheets", "Alert Configuration Guide", "Compliance Review Checklist"]'::jsonb, 90, 50, 0, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 38, 'Automation Tools and Integration', 'Automating routine compliance tasks saves time, reduces errors, and ensures consistency. The right tools can handle much of the compliance burden.

Automation opportunities: Data entry: Auto-populate forms from master data. Calculations: Tax calculations, contribution amounts. Filing: Direct submission from accounting software. Reminders: Automatic alerts based on calendar. Reconciliation: Bank to books, ITC matching.

Tool categories: Accounting + compliance: Zoho Books, QuickBooks - GST filing built-in, ClearTax Books - compliance-focused. Payroll + compliance: Zoho Payroll, GreytHR, Keka - auto-calculate and deposit PF/ESI. ROC compliance: LegalDesk, Vakilsearch - filing automation. Multi-purpose: Zapier, Make (Integromat) - connect different tools.

Key integrations to set up: Bank → Accounting software: Auto-import transactions. Payment gateway → Accounting: Auto-record sales. Payroll → Accounting: Salary journal entries. Accounting → GST portal: Direct return filing. Calendar → Notifications: Deadline alerts.

Zapier/Make automation examples: When invoice created → Add to GST tracking sheet. When bank transaction imported → Notify finance team. When due date approaches → Send Slack/email reminder. When form filed → Update compliance dashboard.

Document automation: Use templates with merge fields. Auto-generate standard letters, certificates. E-signature integration (DigiSign, Aadhar eSign). Auto-file in organized folders.

Cost-benefit analysis: Manual compliance cost: Finance person salary + CA fees + time spent. Automation cost: Software subscriptions + setup time. Typically: Automation pays off at 10+ compliance items. Additional benefits: Fewer errors, better audit trail, reduced stress.

Implementation approach: Start small: Automate highest-frequency, most error-prone tasks first. Prove value: Document time saved and errors prevented. Expand gradually: Add more automations as comfort grows. Maintain: Review automations quarterly, update as regulations change.', '["Identify top 5 compliance tasks suitable for automation", "Select automation tools based on your current tech stack", "Set up 2-3 key integrations (bank feeds, payment gateway, payroll)", "Create simple Zapier/Make automations for reminders and tracking"]'::jsonb, '["Automation Opportunity Assessment Template", "Integration Setup Guides for popular tools", "Zapier/Make Recipe Library for compliance", "Automation ROI Calculator"]'::jsonb, 60, 50, 1, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 39, 'Scaling Compliance Systems', 'As your business grows, compliance complexity increases. Preparing your systems for scale prevents growing pains later.

Scaling triggers: Employee growth: PF/ESI thresholds, HR compliance complexity. Revenue growth: GST thresholds, audit requirements, TDS volumes. Geographic expansion: Multi-state compliance, local regulations. Entity expansion: Subsidiary/group company compliance.

Multi-state compliance: GST: Separate registration per state. Professional Tax: State-specific registrations and rates. Shop & Establishment: Different rules per state. Labor laws: State variations on leave, wages.

Entity structuring considerations: Holding company: For investments and IP. Operating company: Day-to-day business. Subsidiary: For different business lines or geographies. LLP: For professional services or specific projects. Group compliance: Consolidated reporting requirements.

International considerations: Indian company selling globally: GST export provisions, FEMA compliance for receipts, Transfer pricing if related parties. Foreign subsidiary: Incorporation in target country, Local compliance requirements, Reporting to Indian parent.

Compliance team evolution: 0-20 employees: Founder handles, CA for filing. 20-50 employees: Part-time compliance person, dedicated CA. 50-100 employees: Full-time compliance/finance person. 100+ employees: Compliance team, possibly in-house CA/CS.

Process documentation: Why: Ensures consistency regardless of who handles. Reduces training time for new team members. Supports delegation. What to document: Step-by-step procedures, Checklist for each compliance item, Exception handling, Escalation paths.

Technology scaling: Start: Spreadsheets and basic tools. Growing: Dedicated compliance software. Scaling: ERP integration, automated workflows. Enterprise: Compliance as part of GRC (Governance, Risk, Compliance).', '["Identify upcoming scaling triggers and associated compliance needs", "Plan for multi-state compliance if geographic expansion planned", "Document key compliance processes for knowledge transfer", "Evaluate compliance technology needs for next 12-24 months"]'::jsonb, '["Scaling Trigger Checklist with compliance implications", "Multi-State Compliance Guide", "Process Documentation Template", "Technology Scaling Roadmap"]'::jsonb, 60, 50, 2, NOW(), NOW()),

    (gen_random_uuid()::text, v_module_10_id, 40, 'Compliance Audit and Review', 'Regular compliance audits identify gaps before they become problems. A structured audit process ensures comprehensive coverage and continuous improvement.

Compliance audit purpose: Verify: Are all obligations being met? Identify: Gaps, near-misses, and improvement areas. Document: Compliance evidence for external audits/due diligence. Improve: Processes and controls.

Audit scope: Corporate compliance: ROC filings, board meetings, statutory registers. Tax compliance: GST, TDS, income tax, advance tax. Labor compliance: PF, ESI, PT, labor law returns. Operational compliance: Industry licenses, permits, renewals.

Self-audit process: Step 1 - Prepare checklist: List all compliance requirements. Organize by regulation/frequency. Step 2 - Gather evidence: Filings acknowledgments, payment challans, minutes, registers. Step 3 - Verify: Compare obligations to evidence. Check timeliness (filed before due date?). Verify accuracy (correct amounts, complete info?). Step 4 - Document findings: Compliant items, Gaps and non-compliance, Near-misses (last-minute filings). Step 5 - Remediate: Create action plan for gaps. Assign responsibility and deadlines.

Gap prioritization: Critical: Active non-compliance, potential penalties. High: Missing documentation, upcoming deadlines at risk. Medium: Process improvements needed. Low: Nice-to-have enhancements.

Audit frequency: Monthly: Quick review of that month''s compliance. Quarterly: More thorough review across all areas. Annually: Comprehensive audit, often before statutory audit.

External audit preparation: What auditors check: Compliance status, Control effectiveness, Document availability. Preparation: Organize documents by category, Prepare reconciliations in advance, Brief team on audit process. Common findings: Missing supporting documents, Delayed filings, Inadequate segregation of duties.

Continuous improvement: After each audit: Root cause analysis for gaps. Process improvement for near-misses. Update procedures and checklists. Track improvement over time.

Congratulations on completing P2: Incorporation & Compliance Kit! You now have a solid foundation in Indian business compliance. Continue maintaining your systems and stay updated on regulatory changes.', '["Conduct comprehensive compliance self-audit using provided checklist", "Document findings: compliant, gaps, and improvement areas", "Create remediation plan for identified gaps with owners and deadlines", "Establish quarterly audit rhythm for ongoing compliance monitoring"]'::jsonb, '["Comprehensive Compliance Audit Checklist", "Audit Findings Documentation Template", "Gap Remediation Plan Template", "Audit Schedule and Rhythm Guide"]'::jsonb, 90, 100, 3, NOW(), NOW());

    RAISE NOTICE 'P2 Enhanced Content: Successfully created 10 modules with 40 lessons with comprehensive India-specific content';

END $$;

COMMIT;
