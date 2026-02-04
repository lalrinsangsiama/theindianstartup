-- THE INDIAN STARTUP - P5: Legal Stack - Bulletproof Framework - Enhanced Content (Modules 1-6)
-- Migration: 20260204_005_p5_legal_enhanced.sql
-- Purpose: Enhance P5 course content to 500-800 words per lesson with India-specific legal data
-- Note: This file contains Modules 1-6. Modules 7-12 are in a separate migration file.

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
BEGIN
    -- Get or create P5 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P5',
        'Legal Stack - Bulletproof Framework',
        'Build bulletproof legal infrastructure for your startup with comprehensive coverage of Indian corporate law, founder agreements, employment contracts, intellectual property protection, commercial agreements, and regulatory compliance. 45 days, 12 modules covering Companies Act 2013, Indian Contract Act 1872, Trademark Act 1999, labor laws, and sector-specific regulations.',
        7999,
        false,
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

    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P5';
    END IF;

    -- Clean existing modules and lessons
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Legal Foundation for Startups (Days 1-4)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Legal Foundation for Startups',
        'Understand entity structures, incorporation processes, and foundational legal documents. Master MOA/AOA drafting, MCA compliance, and corporate governance basics under Companies Act 2013.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Understanding Business Entity Structures in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Understanding Business Entity Structures in India',
        'Choosing the right legal structure is among the most consequential decisions for Indian startups. The Companies Act 2013 governs corporate entities, while the Limited Liability Partnership Act 2008 governs LLPs. Each structure has distinct implications for liability protection, taxation, fundraising capability, and compliance burden. Over 78% of DPIIT-recognized startups choose Private Limited Company structure, and understanding why requires examining all options.

Sole Proprietorship remains the simplest form with no separate legal entity. The individual and business are legally identical, meaning unlimited personal liability for business debts. Registration is optional through local municipal authorities or Shops and Establishments Act. Tax implications follow personal income tax slabs (up to 30% plus surcharge). Best suited for: freelancers, consultants, very small businesses without growth ambitions. Key limitation: Cannot raise equity funding, personal assets at risk.

Partnership Firm under Indian Partnership Act 1932 allows two or more persons sharing profits and losses. Unlimited liability extends to all partners personally. Registration through Registrar of Firms is optional but recommended for enforceability. Taxed at flat 30% rate. Challenges include difficulty in ownership transfer and raising external capital. Best suited for: professional practices (law firms, CA firms), family businesses without scale ambitions.

Limited Liability Partnership (LLP) under LLP Act 2008 offers separate legal entity status with limited liability protection. Partners'' personal assets are protected from business debts. Registration through MCA costs Rs 3,000-5,000 with 15-20 day processing. Taxed at 30% flat rate without Dividend Distribution Tax. Lower compliance than Private Limited but critical limitation: most VCs do not invest in LLPs as they cannot issue equity shares. Best suited for: consulting firms, professional services, businesses not seeking VC funding.

Private Limited Company under Companies Act 2013 is the gold standard for fundable startups. Separate legal entity with limited liability, can issue equity shares and ESOPs. Eligible for Startup India benefits, Section 80-IAC tax exemption, and angel tax exemption. Registration through MCA SPICe+ form costs Rs 7,000-15,000 with 7-15 day processing. Taxed at 25% for turnover below Rs 400 crore (22% if foregoing exemptions under Section 115BAA). Higher compliance: ROC annual filings, board meetings, statutory audits. Best suited for: any startup planning to raise funding or scale significantly.

One Person Company (OPC) under Section 2(62) of Companies Act 2013 allows single-person incorporation with limited liability. Mandatory conversion to Private Limited if paid-up capital exceeds Rs 50 lakh or turnover exceeds Rs 2 crore. Best suited for: solo founders testing before adding co-founders.

Section 8 Company (non-profit) allows charitable or social objectives with tax benefits for donors under Section 80G. Profits must be reinvested, can receive CSR funds under Schedule VII. Best suited for: impact-focused organizations, foundations.',
        '["Complete entity structure decision matrix scoring each option on: liability protection, tax efficiency, funding eligibility, compliance burden, and exit flexibility", "Calculate 5-year total compliance cost comparison for LLP vs Private Limited including registration, annual filings, audits, and professional fees", "Evaluate your startup against VC funding criteria - if planning to raise, Private Limited is almost mandatory", "Document your entity choice rationale in a one-page memo for future reference and investor due diligence"]'::jsonb,
        '["Entity Structure Comparison Matrix with 2026 tax rates and compliance costs", "Companies Act 2013 Key Provisions Guide for Startups", "LLP Act 2008 Compliance Checklist", "Entity Selection Decision Tree based on funding and scale plans"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Incorporation Process and MCA Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Incorporation Process and MCA Compliance',
        'The Ministry of Corporate Affairs (MCA) has streamlined incorporation through SPICe+ (Simplified Proforma for Incorporating Company Electronically Plus), enabling integrated registration with PAN, TAN, GST, EPFO, and ESIC in a single application. Understanding this process thoroughly prevents costly delays and ensures compliance from day one.

Pre-incorporation requirements begin with Digital Signature Certificate (DSC). Class 2 or Class 3 DSC is mandatory for all proposed directors and subscribers. Obtain from authorized Certifying Authorities: eMudhra (Rs 800-1,500), Sify, n-Code, or Capricorn. Processing takes 1-3 days. Validity period is 2-3 years. Foreign directors can also obtain DSC with additional documentation.

Director Identification Number (DIN) application is now integrated within SPICe+ form. Each director requires unique DIN. Existing DIN holders need not reapply. Foreign nationals can obtain DIN with passport and foreign address proof.

Name reservation through RUN (Reserve Unique Name) form or Part A of SPICe+. Government fee: Rs 1,000 per application. Rules: Name must not be identical or deceptively similar to existing companies (search MCA21 portal). Cannot use words prohibited under Emblems and Names (Prevention of Improper Use) Act 1950. Must include "Private Limited" at the end. Sector-specific words may require approvals (Bank, Insurance, Stock Exchange). Tips: Submit 2 names in priority order, check trademark conflicts on ipindiaservices.gov.in, avoid generic words that invite objections.

SPICe+ form (INC-32) is the integrated incorporation form. Part A handles name reservation, Part B handles incorporation. Linked forms: INC-33 (eMoA), INC-34 (eAoA), AGILE-PRO-S (GST, EPFO, ESIC, Profession Tax). Government fees: Rs 500 (authorized capital up to Rs 1 lakh), Rs 2,000 (up to Rs 5 lakh), Rs 5,000 (up to Rs 10 lakh), plus stamp duty varying by state.

Required documents for incorporation: Identity proof of directors (Aadhaar mandatory plus PAN). Address proof (Passport/Voter ID/Driving License within 2 months). Passport-size photographs. Registered office proof: Ownership document or Rent Agreement (notarized/registered) + NOC from owner + utility bill within 2 months. Declaration by first subscribers and directors (INC-9).

Memorandum of Association (MOA) under Section 4 defines company''s relationship with outside world. Includes: Name clause, Registered office clause (state), Object clause (main, ancillary, other objects), Liability clause, Capital clause, Subscription clause. Keep object clause broad for future pivots but specific enough for clarity.

Articles of Association (AOA) under Section 5 governs internal management. Table F of Schedule I provides model articles. Key provisions to customize: Share transfer restrictions, Board composition and quorum, Director appointment/removal, ESOP provisions, Investor protection clauses for fundraising.

Post-incorporation compliance (immediate): Apply for company PAN and TAN (auto-generated in SPICe+). Open current bank account with Certificate of Incorporation. Register for GST if applicable. Register under state Shops and Establishments Act within 30 days. File INC-20A (declaration of commencement of business) within 180 days.',
        '["Apply for DSC for all proposed directors from authorized Certifying Authorities - allow 2-3 days for processing", "Search and shortlist 5 company names on MCA21 portal and IP India trademark database", "Prepare all director KYC documents: Aadhaar, PAN, address proof, photographs - ensure all are current and legible", "Arrange registered office documentation: rental agreement with landlord NOC and recent utility bill"]'::jsonb,
        '["SPICe+ Form Filing Guide with step-by-step screenshots", "DSC Application Process for all authorized CAs", "Company Name Availability Checker with naming rules", "Director KYC Document Checklist with format specifications"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: MOA and AOA Drafting Best Practices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'MOA and AOA Drafting Best Practices',
        'The Memorandum of Association (MOA) and Articles of Association (AOA) are constitutional documents that govern your company''s existence and operations. Under Companies Act 2013, these documents have legal force and bind the company, its members, and its officers. Poorly drafted MOA/AOA create problems during fundraising, exits, and disputes.

MOA clauses analysis under Section 4 of Companies Act 2013: The Name Clause must include "Private Limited" for private companies and match exactly with ROC records. Any name change requires special resolution, ROC approval, and fresh Certificate of Incorporation.

The Registered Office Clause specifies the state where the company is registered. Changing to another state requires complex procedures under Section 13: special resolution, Regional Director approval, and compliance with creditor protection requirements. Choose strategically: Karnataka and Maharashtra have startup-friendly ecosystems, but consider proximity to operations and state-specific incentives.

The Object Clause under Section 4(1)(c) defines what business activities the company can undertake. Main objects: Core business activities the company will primarily pursue. Objects incidental or ancillary: Activities necessary to achieve main objects. Other objects: Additional activities the company may undertake. Strategy for startups: Draft broad objects covering potential pivots but avoid being so vague that it creates regulatory issues. VCs will scrutinize whether your actual business falls within stated objects.

The Liability Clause confirms members'' liability is limited to the amount unpaid on their shares. This is standard for limited companies and provides the fundamental liability protection.

The Capital Clause states authorized share capital - the maximum shares the company can issue. Starting recommendation: Rs 1-10 lakh authorized capital for early-stage startups. Increasing authorized capital later requires ordinary resolution plus ROC fees (Rs 500 per Rs 1 lakh increase or part thereof, subject to minimum Rs 2,500). The Subscription Clause records initial subscribers taking at least one share each.

AOA key provisions for startups under Section 5: Share Transfer Restrictions are mandatory for private companies under Section 2(68). Include board approval requirement for transfers, right of first refusal to existing shareholders, and lock-in periods for founders. These protect against unwanted shareholders and are investor expectations.

Board Composition provisions should specify minimum and maximum directors (2-15 for private companies), quorum for board meetings (one-third or two directors, whichever is higher), and nominee director rights for investors. Meeting Procedures should cover notice requirements (7 days minimum under Section 173), video conferencing allowance (Section 173(2)), and circular resolution provisions.

ESOP Framework in AOA establishes authority to issue employee stock options. Include specific article authorizing ESOP pool creation, vesting schedules, and exercise procedures. This avoids requiring AOA amendment when implementing ESOP scheme later.

Investor Protection Provisions anticipate fundraising needs. Include reserved matters requiring investor consent, information rights, anti-dilution provisions, and drag-along/tag-along rights. Pre-emptive drafting saves legal costs during fundraising.',
        '["Draft Main Objects clause covering current business and 3 potential pivots with India-specific regulatory considerations", "Review standard AOA provisions against Table F of Schedule I and identify customizations needed for your startup", "Add ESOP authorization article in AOA to enable future employee option grants without amendment", "Include investor-friendly provisions anticipating Series A terms to avoid AOA amendment during fundraising"]'::jsonb,
        '["MOA Drafting Template with startup-specific object clauses by sector", "AOA Customization Checklist for Private Limited Companies", "ESOP Authorization Article Template for AOA", "Investor Protection Provisions Library for AOA"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Post-Incorporation Compliance and ROC Filings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Post-Incorporation Compliance and ROC Filings',
        'Compliance with Registrar of Companies (ROC) requirements is mandatory for all Indian companies. Non-compliance leads to penalties, director disqualifications, and complications during fundraising and exits. The Companies Act 2013 prescribes over 70 compliance requirements, but startups should focus on core obligations.

Immediate post-incorporation requirements (within 30-180 days): INC-20A (Declaration of Commencement of Business) must be filed within 180 days of incorporation. This declares that all subscribers have paid for shares subscribed and the company is ready to commence business. Non-filing penalty: Rs 50,000 on company plus Rs 1,000 per day of default.

First Board Meeting must be held within 30 days of incorporation under Section 173(1). Agenda includes: Appointment of first auditor (within 30 days), adoption of common seal (optional post-2015 amendment), opening bank accounts, issuing share certificates, and ratifying pre-incorporation contracts.

Share Certificates must be issued within 2 months of incorporation under Section 46. Format prescribed in Rules includes distinctive numbers, certificate number, class of shares, paid-up value, and signatures of directors.

Statutory Registers must be maintained at registered office: Register of Members (Section 88), Register of Directors and KMP (Section 170), Register of Charges (Section 85), Register of Contracts with Related Parties (Section 189), and Minutes Books for Board and General Meetings.

Annual compliance calendar for private companies: Within 30 days of AGM: File AOC-4 (Financial Statements) and MGT-7A (Annual Return). The Annual General Meeting must be held within 6 months of financial year end (by September 30 for March year-end). First AGM must be held within 9 months of first financial year end.

Financial Statements filing (AOC-4) under Section 137 includes Balance Sheet, Profit & Loss Statement, Cash Flow Statement, and Notes. Government fee: Rs 200 (if filed within 30 days). Late filing penalty: Rs 100 per day, up to Rs 3.6 lakh (12 x 300 x 100).

Annual Return (MGT-7A) under Section 92 summarizes company''s shareholding, indebtedness, and compliance status. Simplified form MGT-7A applicable to small companies and one-person companies. Government fee: Rs 200 (within 60 days of AGM).

Event-based ROC filings: DIR-12 for director appointment/resignation (within 30 days). SH-7 for increase in authorized capital (within 30 days). PAS-3 for allotment of shares (within 30 days). CHG-1 for creation of charge (within 30 days). MGT-14 for board resolutions requiring filing (within 30 days).

Compliance for Startup India recognition: ADT-1 for auditor appointment (within 15 days of AGM). DPT-3 for deposits declaration annually. Compliance Certificate from practicing professional for raising above Rs 50 lakh.

Director compliance under Section 164-167: Every director must maintain valid DSC. Annual KYC filing through DIR-3 KYC (by September 30 annually). Non-filing leads to DIN deactivation. Directors must attend at least one board meeting in every 12 months.

Penalties for non-compliance are substantial: Late filing attracts additional fees increasing with delay period. Prosecution provisions for willful defaults. Director disqualification under Section 164(2) for failing to file returns for 3 continuous years. Strike-off proceedings if company fails to commence business within 1 year or suspends business for 2 years.',
        '["Create company compliance calendar with all ROC filing deadlines for the next 12 months", "Set up statutory registers at registered office - physical or electronic as permitted", "Schedule first board meeting within 30 days and prepare agenda covering all mandatory items", "Implement reminder system for DIR-3 KYC and annual filing deadlines"]'::jsonb,
        '["ROC Annual Compliance Calendar Template for Private Limited Companies", "Statutory Registers Format and Maintenance Guide", "Board Meeting Agenda Template for First Meeting Post-Incorporation", "MCA Filing Fees Calculator with late fee computation"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Founder Agreements & Equity (Days 5-8)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Founder Agreements & Equity',
        'Create bulletproof founder agreements covering equity splits, vesting schedules, IP assignment, and dispute resolution. Master Shareholders Agreement (SHA) drafting and founder exit provisions.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 5: Founders Agreement Essentials
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        5,
        'Founders Agreement Essentials',
        'Co-founder conflicts rank as the second leading cause of startup failure after "no market need." In India, where personal relationships often precede business partnerships, having clear written agreements becomes even more critical - yet is frequently avoided due to cultural discomfort with "formal" discussions among friends and family. A Founders Agreement establishes ground rules before problems arise.

Why founders agreements matter: CB Insights research shows 23% of startups fail due to team issues. In India, this often manifests as disputes over equity, roles, or commitment levels. A well-drafted founders agreement prevents most disputes by addressing contentious issues upfront when relationships are good.

Legal status of founders agreements in India: Founders agreements are governed by Indian Contract Act 1872. Section 10 requires: Free consent, lawful consideration, lawful object, and capacity to contract. The agreement is a private contract between founders, distinct from the company''s constitutional documents (MOA/AOA).

Essential components of founders agreement: Parties and recitals section identifies all founders, their backgrounds, and the purpose of the agreement. It establishes the context and intent of the parties.

Equity split provisions must clearly state: Initial equity allocation with precise percentages. Basis for the split (contribution of idea, capital, skills, network, time commitment). Any differential rights attached to founder shares. Treatment of equity if founders join at different times.

Roles and responsibilities section defines: Primary domain responsibilities for each founder. Decision-making authority within their domain. Time commitment expectations (full-time, part-time, transition period). Non-compete and exclusivity during involvement.

Capital contributions clause covers: Initial capital requirements and who contributes what. Valuation methodology if non-cash contributions. Future capital call provisions and consequences of non-contribution. Treatment of loans vs equity by founders.

Vesting schedule provisions are critical for protecting all founders. Standard structure: 4-year vesting with 1-year cliff. Cliff meaning: No equity vests until 12-month mark, then first tranche (25%) vests. Monthly or quarterly vesting thereafter. Rationale: Protects against early departures where a co-founder leaves after months but retains full equity.

Acceleration provisions address vesting upon: Single trigger acceleration: Full vesting upon acquisition/change of control. Double trigger acceleration: Vesting only if both acquisition AND termination occur. Partial acceleration: 50% acceleration upon change of control.

Intellectual Property assignment is non-negotiable for fundraising: All IP created for the company belongs to the company, not individuals. Includes code, designs, content, inventions, trade secrets. Prior IP that founders bring in should be licensed or assigned. Clear warranties that no third-party IP rights are infringed.

Decision-making framework should specify: What decisions require unanimous founder consent. What decisions CEO/MD can make independently. Board vs founder decision authority. Deadlock resolution mechanisms (casting vote, mediation, shotgun clause).

Exit provisions must address: Voluntary exit (founder wants to leave). Involuntary exit (founder asked to leave). Death or disability. Breach of agreement.',
        '["Have explicit conversations with co-founders covering equity rationale, time commitment, roles, decision-making, and exit scenarios", "Document equity split with written justification that can withstand investor due diligence scrutiny", "Draft IP assignment provisions ensuring all prior and future IP is clearly assigned to the company", "Agree on decision-making framework specifying which decisions require unanimous consent vs CEO authority"]'::jsonb,
        '["Founders Agreement Template (India-compliant) with clause-by-clause explanations", "Equity Split Discussion Guide with conversation frameworks for difficult discussions", "IP Assignment Provisions Template covering prior IP and future creations", "Decision-Making Authority Matrix for founders"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 6: Vesting Schedules and Cliff Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Vesting Schedules and Cliff Structures',
        'Vesting is the mechanism by which founders and employees earn their equity over time. It protects all stakeholders from the scenario where someone receives equity and then leaves without contributing proportionally. Every sophisticated investor expects founder vesting, and its absence creates red flags during due diligence.

Understanding vesting mechanics: Vesting means equity is earned incrementally over a defined period based on continued service. Unvested equity can be forfeited upon departure. Vested equity is fully owned and typically cannot be clawed back.

Standard vesting structures: The industry standard is 4-year vesting with 1-year cliff. Year 1 (cliff): 0% vested until 12-month mark, then 25% vests immediately. Years 2-4: Remaining 75% vests monthly (2.08% per month) or quarterly (6.25% per quarter). Total: 100% vested after 4 years of continuous service.

Why the cliff exists: Protects against: Someone joining, receiving equity, and leaving within months. Situation where early departure leaves significant "dead equity" on cap table. Difficulty in fundraising when former founders hold large unvested positions. The cliff ensures minimum 1-year commitment before any equity is earned.

Cliff variations in Indian startups: 1-year cliff: Industry standard, protects against very early departures. 6-month cliff: Sometimes used for proven executives or later-stage hires. No cliff: Rare, only for highly trusted senior hires with proven track records.

Vesting period variations: 3-year vesting: Aggressive, sometimes used in competitive hiring or later stages. 4-year vesting: Standard for founders and early employees. 5-year vesting: Sometimes used for very senior hires or complex situations.

Acceleration provisions are critical exit mechanisms: Single trigger acceleration means 100% vesting upon change of control (acquisition). Founder-friendly but investor-unfriendly (acquirer inherits fully vested team). Double trigger acceleration means vesting accelerates only if both acquisition AND termination without cause occur. More balanced, protects founders while giving acquirer retention tools. Partial acceleration provides 25-50% acceleration upon change of control, remaining on normal schedule. Compromise position increasingly common in Indian term sheets.

Good leaver vs bad leaver provisions: Good leaver (voluntary resignation, death, disability, termination without cause) typically retains vested equity and sometimes accelerated vesting. Bad leaver (termination for cause, breach of duties, competing activity) may forfeit some or all equity, even vested portion in extreme cases.

Implementation in India: Vesting is documented in founders agreement and/or shareholders agreement. For ESOP recipients, vesting is documented in ESOP scheme and grant letters. Legal mechanism: Shares may be issued upfront with company repurchase right for unvested portion, or shares issued only upon vesting events.

Reverse vesting for founders: When founders already hold shares (pre-existing cap table), reverse vesting is used. Company has right to repurchase unvested shares at nominal value if founder departs. Economically equivalent to forward vesting but accommodates existing shareholding.

Tax implications of vesting in India: For founders, no tax event at grant if shares issued at fair value. Vesting itself is generally not a taxable event. Sale of shares triggers capital gains (short-term if held less than 24 months, long-term otherwise). For ESOP recipients, perquisite tax applies at exercise on difference between FMV and exercise price.',
        '["Design vesting schedule for all founders - document cliff period, vesting frequency, and total vesting period", "Define acceleration triggers: single trigger, double trigger, or partial acceleration with specific percentages", "Draft good leaver and bad leaver provisions with clear definitions and consequences for each scenario", "Calculate tax implications of vesting structure under Income Tax Act for all founders"]'::jsonb,
        '["Vesting Schedule Calculator with visual timeline generator", "Acceleration Provisions Comparison Matrix with pros/cons for founders vs investors", "Good Leaver/Bad Leaver Definitions Template with Indian legal enforceability analysis", "Founder Equity Tax Planning Guide under Income Tax Act"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 7: Shareholders Agreement (SHA) Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Shareholders Agreement (SHA) Deep Dive',
        'The Shareholders Agreement (SHA) is the primary legal document governing relationships between shareholders, including founders, investors, and the company. While MOA/AOA are public documents filed with ROC, the SHA is a private contract that contains commercially sensitive provisions. Every funding round will result in a new or amended SHA.

SHA vs AOA: What goes where? The AOA is a public document, must be filed with ROC, and can be inspected by any person on payment of fee. It binds all current and future shareholders automatically. The SHA is a private contract, not filed with ROC, and binds only parties who sign it. Strategy: Keep commercially sensitive terms in SHA, ensure AOA doesn''t conflict with SHA provisions.

Core SHA components for Indian startups: Share Capital and Shareholding section documents current shareholding pattern with exact percentages. Records authorized and issued share capital. Specifies classes of shares if any (equity, preference, etc.). Includes cap table as schedule that updates with each transaction.

Transfer Restrictions are fundamental to private companies: Right of First Refusal (ROFR) gives existing shareholders the right to purchase shares before any third-party sale. Tag-Along Rights allow minority shareholders to join a sale by majority on same terms, protecting against majority selling to unfavorable buyer. Drag-Along Rights allow majority shareholders to force minority to sell to acquirer on same terms, enabling clean exits. Lock-in Periods restrict transfers for specified periods, typically 1-4 years for founders post-funding.

Board Composition and Governance: Specifies board size (typically 3-5 for early stage, growing with funding rounds). Allocates board seats: founders (1-2), investors (1-2 per round), independent (1 post-Series A typically). Defines board meeting frequency, quorum, and procedures. Establishes committee structures for compensation, audit, nomination.

Reserved Matters (Investor Protective Provisions): Critical decisions requiring investor consent: Change in business, capital structure changes, debt above threshold, key hirings/firings, related party transactions, annual budget approval, acquisitions/divestitures, IPO timing. These essentially give investors veto rights over major decisions.

Anti-Dilution Protection: Full ratchet adjusts conversion price to new lower price, severely founder-unfriendly. Weighted average (broad-based) adjusts price based on weighted impact of new round, market standard. Pay-to-play requires investors to participate pro-rata in down rounds to maintain anti-dilution.

Information Rights: Monthly/quarterly financial reports. Board meeting materials. Annual audited financials and budget. Inspection rights for records. These are standard and help investors monitor investment.

Exit Provisions: Liquidation preference determines payment priority in exit scenarios. 1x non-participating is founder-friendly (investors get their money back first, then share). 1x participating allows investors to get money back AND share in remaining proceeds. IPO provisions cover lock-up periods, registration rights.

Dispute Resolution: Governing law: Typically Indian law. Jurisdiction: Usually Delhi or Mumbai courts. Arbitration clause: SIAC (Singapore) for cross-border, or Indian arbitration institutions. Mediation: Sometimes required before arbitration.

Key negotiation points for founders: Push for broad-based weighted average anti-dilution over full ratchet. Limit reserved matters to truly significant decisions. Ensure drag-along threshold is high (75%+). Negotiate reasonable information rights that don''t burden operations. Get board seat guarantee for founders.',
        '["Map current and anticipated shareholding pattern including founder splits and ESOP pool reservation", "Draft transfer restrictions including ROFR, tag-along, drag-along, and lock-in provisions appropriate for your stage", "Define reserved matters list balancing investor protection with founder operational flexibility", "Establish board composition formula that scales with funding rounds while preserving founder influence"]'::jsonb,
        '["Shareholders Agreement Template for seed-stage Indian startups", "Reserved Matters Negotiation Guide with market-standard vs founder-friendly positions", "Anti-Dilution Provisions Explainer with calculation examples", "Board Composition Evolution Model from seed to Series C"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 8: Founder Exit and Dispute Resolution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Founder Exit and Dispute Resolution',
        'Founder departures are inevitable in a significant percentage of startups. A study of Y Combinator startups found that 65% had at least one founder leave before exit. Planning for this eventuality - while uncomfortable - prevents disputes that can destroy companies. Indian startup ecosystem has seen numerous high-profile founder disputes that proper documentation could have prevented.

Types of founder exits: Voluntary departure occurs when a founder chooses to leave for personal reasons, other opportunities, or burnout. Involuntary departure happens when other founders or the board ask a founder to leave due to performance, strategic misalignment, or misconduct. Death or disability creates unexpected departure requiring immediate succession planning. Retirement applies to longer-running startups where founders may want to step back.

Good leaver vs bad leaver framework: Good leaver typically includes: Resignation with proper notice (typically 3-6 months for founders). Termination without cause. Death or permanent disability. Retirement after specified age or tenure. Consequences: Retains all vested equity, may retain some unvested equity, non-compete may be waived.

Bad leaver typically includes: Termination for cause (fraud, breach of duty, gross negligence). Resignation without notice. Breach of non-compete or confidentiality. Criminal conviction affecting company. Consequences: May forfeit all unvested equity, may be required to sell vested equity at discount, strict enforcement of non-compete.

Buyback mechanisms for departing founders: Call option gives the company the right to repurchase unvested shares at fair value or nominal value. Put option gives the departing founder the right to sell shares back to the company (rare for founder agreements). Fair value determination through independent valuer, formula-based pricing, or last funding round price.

Valuation methodologies for buybacks: Last round price uses the most recent funding round price, simple but may not reflect current value. Formula-based uses predetermined formula (revenue multiple, EBITDA multiple), provides certainty. Independent valuation engages a registered valuer under Companies Act 2013, most accurate but expensive and time-consuming. Discount for bad leavers is typically 50-75% discount to fair value for bad leavers.

Non-compete provisions in India: Critical limitation: Non-compete clauses are largely unenforceable in India under Section 27 of Indian Contract Act 1872, which renders agreements in restraint of trade void. Exception: Non-competes during employment/engagement are enforceable. Post-termination non-competes are generally void unless: Limited in scope and duration, accompanied by reasonable consideration, and framed as non-solicitation rather than non-compete.

Practical approach to non-competes: Focus on non-solicitation of employees and customers rather than pure non-compete. Tie equity benefits to non-compete compliance (forfeit unvested equity if competing). Geographic and temporal limitations increase (but don''t guarantee) enforceability. Courts may consider reasonableness but still likely to strike down pure non-competes.

Dispute resolution mechanisms: Negotiation should always be the first step for any dispute. Mediation involves a neutral third party facilitating settlement, non-binding on parties. Arbitration is a binding private dispute resolution, faster than courts, award is enforceable. Litigation in courts should be the last resort due to delays (3-10 years for resolution in India).

Arbitration considerations for founders: Institutional arbitration (SIAC, ICC, LCIA) provides established rules and procedures. Ad-hoc arbitration offers more flexibility but requires agreement on procedure. Seat of arbitration determines procedural law (Singapore popular for cross-border, Mumbai/Delhi for domestic). Arbitrator selection through mutually agreed process or institutional appointment.

Deadlock resolution for 50-50 situations: Casting vote given to Chairman or specific founder. Shotgun clause (Russian Roulette) allows one founder to make offer, other must buy or sell at that price. External tiebreaker through an agreed advisor or arbitrator. Forced sale if deadlock persists beyond specified period.',
        '["Define good leaver and bad leaver scenarios specific to your startup with clear consequences for each", "Establish buyback mechanism with valuation methodology for departing founder shares", "Draft non-solicitation provisions that are enforceable under Indian law instead of unenforceable non-competes", "Select arbitration institution and establish dispute resolution procedure in founders agreement"]'::jsonb,
        '["Founder Exit Provisions Template with good/bad leaver definitions", "Buyback Valuation Methodologies Comparison with examples", "Non-Compete vs Non-Solicitation Drafting Guide for Indian law compliance", "Arbitration Clause Drafting Guide with SIAC and Indian arbitration institution options"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Employment Law & Contracts (Days 9-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Employment Law & Contracts',
        'Master Indian employment law covering offer letters, employment agreements, NDAs, and the limited enforceability of non-competes. Navigate labor codes, Shops and Establishments Act, and employee termination procedures.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 9: Indian Employment Law Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        9,
        'Indian Employment Law Framework',
        'Indian employment law is a complex web of central and state legislation that has recently undergone significant consolidation. The four new Labor Codes - Wages, Industrial Relations, Social Security, and Occupational Safety - have been enacted but implementation dates vary by state. Understanding this landscape is crucial for compliant hiring practices.

Constitutional foundation: Article 41 directs state to provide right to work. Article 42 mandates just and humane conditions of work. Article 43 requires living wage for workers. These Directive Principles guide labor legislation interpretation.

Central labor legislation (pre-Code era still applicable in most states): Payment of Wages Act 1936 regulates wage payment timing and deductions. Minimum Wages Act 1948 sets minimum wages by state and sector. Payment of Bonus Act 1965 mandates bonus for establishments with 20+ employees. Equal Remuneration Act 1976 prohibits gender-based wage discrimination.

The new Labor Codes (enacted but implementation pending in most states): Code on Wages 2019 consolidates Minimum Wages Act, Payment of Wages Act, Payment of Bonus Act, and Equal Remuneration Act. Code on Industrial Relations 2020 consolidates Trade Unions Act, Industrial Employment (Standing Orders) Act, Industrial Disputes Act. Code on Social Security 2020 consolidates EPF, ESI, Maternity Benefit, Gratuity, and other social security laws. Code on Occupational Safety, Health and Working Conditions 2020 consolidates Factories Act and other safety legislation.

State-specific legislation is mandatory: Shops and Establishments Act varies by state and governs working hours, holidays, leave, and employment conditions for commercial establishments. Karnataka Shops and Commercial Establishments Act 1961, Maharashtra Shops and Establishments Act 2017, Delhi Shops and Establishments Act 1954 have different provisions. Registration is mandatory within 30 days of commencing business or employing first worker.

Employee vs contractor distinction under Indian law: Control test examines whether the employer controls manner of work, not just result. Integration test asks whether the worker is integral to business operations. Economic reality test considers whether the worker is economically dependent on employer. Misclassification risks include: Deemed employment and associated compliance obligations, back-payment of PF, ESI, gratuity, penalties and prosecution under labor laws.

Statutory compliance thresholds for startups: EPF (Employees'' Provident Fund) applies to establishments with 20+ employees (mandatory) or voluntary registration for fewer. Current contribution: 12% each from employer and employee. ESI (Employees'' State Insurance) applies to establishments with 10+ employees in notified areas with wages up to Rs 21,000/month. Gratuity under Payment of Gratuity Act 1972 applies to establishments with 10+ employees, payable after 5 years of service. Professional Tax is state-specific, typically Rs 200-300/month deducted from employee salary.

Maternity Benefit Act 1961 (as amended 2017): Applies to establishments with 10+ employees. Provides 26 weeks paid maternity leave (12 weeks for adopting mothers). Work from home provisions mandatory where nature of work allows. Creche facility mandatory for establishments with 50+ employees.

Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act 2013: Applies to ALL employers regardless of size. Mandatory Internal Complaints Committee (ICC) for establishments with 10+ employees. Detailed policy, awareness programs, and annual reporting required. Non-compliance penalties: Up to Rs 50,000 and license cancellation for repeat offenses.',
        '["Determine applicable Shops and Establishments Act for your state and complete registration if not done", "Assess EPF and ESI applicability based on current employee count and wage levels", "Establish Sexual Harassment policy and constitute Internal Complaints Committee regardless of company size", "Create compliance calendar for all applicable labor law filings and renewals"]'::jsonb,
        '["Indian Labor Law Compliance Checklist by employee count threshold", "Shops and Establishments Registration Guide for major startup hubs", "POSH Act Compliance Kit with policy template and ICC constitution guide", "EPF and ESI Registration and Compliance Guide for startups"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 10: Employment Contracts and Offer Letters
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        10,
        'Employment Contracts and Offer Letters',
        'Employment documentation in India follows a two-stage process: offer letter followed by detailed employment agreement. While India follows employment-at-will doctrine for most private sector employees (excluding workmen under Industrial Disputes Act), proper documentation protects both parties and ensures compliance with applicable laws.

Offer letter vs employment agreement: The offer letter is a preliminary document extending the job offer with key terms. It becomes binding upon acceptance by candidate. Keep it concise - detailed terms go in employment agreement. The employment agreement is a comprehensive contract signed on joining, containing all terms and conditions of employment, and should be executed on stamp paper appropriate to the state.

Essential offer letter components: Position and reporting structure with clear job title and manager. Start date and location of work. Compensation details: Basic salary, HRA, special allowances, and total CTC breakdown. Variable pay and bonus structure. ESOP grant details if applicable (shares, vesting, exercise price). Notice period during probation and after confirmation. Background verification contingency. Validity period for accepting offer (typically 7-14 days).

Compensation structuring for tax efficiency: Basic salary forms the base for PF, gratuity, and leave encashment calculations. Keep at 40-50% of CTC to optimize tax. House Rent Allowance (HRA) is exempt up to specified limits under Section 10(13A) for those paying rent. Special Allowance is fully taxable but provides flexibility. Leave Travel Allowance allows two tax-free domestic trips in a block of 4 years. Reimbursements include telephone, fuel, books, and professional development as tax-efficient components.

Employment agreement key clauses: Job description and duties clause should be broad enough to allow role evolution but specific enough to set expectations. Include "other duties as assigned" language. Compensation clause specifies all elements: fixed, variable, benefits, ESOPs. Include salary review timing and process.

Probation provisions typically range from 3-6 months for most roles. Simplified termination during probation (typically 1-week notice). Confirmation process at end of probation should be documented. Extended probation provisions if performance concerns exist.

Confidentiality obligations define confidential information broadly: Trade secrets, customer lists, business plans, technical data, and employee information. Obligations survive termination (typically 2-3 years or perpetual for trade secrets). Include return of confidential materials upon termination.

Intellectual property assignment clause states that all IP created during employment and within scope of employment belongs to company. Includes code, inventions, designs, writings, and other works. "Work made for hire" doctrine under Copyright Act 1957. Moral rights waiver where permissible. Prior inventions exclusion with disclosure requirement.

Non-compete and non-solicitation provisions: Non-compete during employment is enforceable - employee cannot work for competitor while employed. Post-employment non-compete is unenforceable under Section 27, Indian Contract Act 1872. Non-solicitation of employees and customers is more likely enforceable if reasonable. Garden leave provisions may be used to restrict activity during notice period.

Termination provisions: Notice period varies by seniority - typically 1-3 months (longer for senior roles). Payment in lieu of notice as alternative to serving notice. Grounds for termination without notice (misconduct, breach of duty). Severance provisions if any (not statutorily required for non-workmen).

Dispute resolution and governing law: Specify governing law (Indian law) and jurisdiction. Include arbitration clause for senior employees. Employment tribunals have jurisdiction for certain disputes under labor laws.',
        '["Create standard offer letter template with all compensation components and contingencies", "Develop comprehensive employment agreement template with IP assignment, confidentiality, and compliant restrictive covenants", "Establish compensation structure template optimizing for tax efficiency within compliance requirements", "Define probation period, confirmation process, and notice period standards for different role levels"]'::jsonb,
        '["Offer Letter Template with compensation structure breakdown", "Employment Agreement Template (India-compliant) with clause explanations", "Compensation Structuring Guide for tax efficiency", "Employee Onboarding Checklist with documentation requirements"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 11: NDAs, Confidentiality, and Non-Competes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        11,
        'NDAs, Confidentiality, and Non-Competes',
        'Protecting confidential information and trade secrets is critical for startups. However, the legal framework for restrictive covenants in India differs significantly from common law countries. Understanding these limitations helps structure enforceable protections.

Non-Disclosure Agreements (NDAs) fundamentals: NDAs are confidentiality contracts protecting sensitive information. They are fully enforceable in India under Indian Contract Act 1872. They can be mutual (both parties share confidential information) or unilateral (one party discloses). Common use cases: Employee agreements, vendor discussions, investor due diligence, partnership negotiations, M&A exploration.

Essential NDA components: Definition of confidential information should be broad enough to cover all sensitive information but specific enough to be meaningful. Include: Technical information, business plans, customer data, financial information, and employee information. Specifically exclude: Public information, independently developed information, and information received from third parties without restriction.

Obligations of receiving party: Use confidential information only for permitted purpose. Protect with reasonable security measures (at least same as own confidential information). Limit disclosure to need-to-know basis. Return or destroy upon request or termination.

Term and survival: Agreement term during which information may be shared (typically 1-3 years). Survival period after termination for confidentiality obligations (typically 2-5 years or longer for trade secrets). Trade secrets may warrant perpetual confidentiality.

Permitted disclosures: Disclosure required by law or court order (with notice to disclosing party). Disclosure to professional advisors under confidentiality. Disclosure to employees with need-to-know.

Non-compete limitations in India: Section 27 of Indian Contract Act 1872 states "Every agreement by which any one is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void." This provision renders post-employment non-competes largely unenforceable. Key judicial precedents: Niranjan Shankar Golikari v. Century Spinning (1967) - Supreme Court upheld narrow non-compete during employment. Superintendence Company of India v. Krishan Murgai (1981) - Supreme Court struck down post-employment non-compete. Recent cases have consistently followed this principle, though courts may consider reasonableness.

What is enforceable in India: During employment non-compete - employee cannot work for competitor while employed (clearly enforceable). Non-solicitation of employees - reasonable restrictions on poaching former colleagues (likely enforceable if reasonable). Non-solicitation of customers - reasonable restrictions on soliciting employer''s customers (likely enforceable if limited). Garden leave - paying employee during notice period while restricting activity (enforceable if compensation continued). Forfeiture provisions - conditioning equity vesting or deferred compensation on non-compete compliance (structured carefully, may be enforceable).

Drafting enforceable restrictive covenants: Instead of "You shall not work for any competitor for 2 years," draft "You shall not solicit any employee of the Company for 12 months after termination" and "You shall not solicit any customer with whom you had direct dealings for 12 months." Include choice of law clause selecting jurisdiction more favorable to non-competes (Singapore, UK) - but enforceability in India remains doubtful.

Trade secret protection under Indian law: No specific trade secret legislation in India (unlike US Defend Trade Secrets Act). Protection available through: Breach of confidence under common law, contract (NDA breach), and Copyright Act for certain materials. Information Services v. Kapil Mohan (2018) - Delhi High Court provided guidance on trade secret protection.

Practical protection strategies: Implement robust information security policies. Segment access to sensitive information (need-to-know basis). Use technical controls (access logs, DRM, watermarking). Conduct exit interviews with confidentiality reminders. Send cease-and-desist letters promptly upon breach. Document trade secret status (marking, restricted access, regular review).',
        '["Develop standard NDA templates for different use cases: employee, vendor, investor, partnership", "Draft enforceable non-solicitation provisions focusing on employees and customers rather than pure non-compete", "Create trade secret protection policy with classification levels and access controls", "Establish exit process including confidentiality reminders and return of materials"]'::jsonb,
        '["NDA Template Library for different scenarios with customization guidance", "Non-Solicitation Drafting Guide for Indian law compliance", "Trade Secret Protection Policy Template", "Employee Exit Checklist with confidentiality procedures"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 12: Employee Termination and Separation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        12,
        'Employee Termination and Separation',
        'Employee termination in India requires careful navigation of legal requirements, which vary significantly based on employee classification (workman vs non-workman) and company size. Improper termination can lead to reinstatement orders, back-wages, and penalties. This lesson covers compliant termination procedures.

Employee classification under Industrial Disputes Act 1947: Workman includes any person employed in industry doing manual, unskilled, skilled, technical, operational, clerical, or supervisory work. Excludes: Managerial or administrative employees, employees in supervisory capacity earning above Rs 10,000/month. Most startup employees (engineers, managers, executives) are typically non-workmen.

Termination of non-workmen (most startup employees): Employment-at-will doctrine generally applies. Notice period as per employment contract (typically 1-3 months). Payment in lieu of notice as alternative. No statutory severance required (gratuity applicable if 5+ years service). Procedural fairness recommended even if not legally mandated.

Termination of workmen (if applicable): Industrial Disputes Act 1947 provides significant protections. Establishments with 100+ workers require government permission for retrenchment. Notice period and retrenchment compensation mandatory. Last-in-first-out principle applies for retrenchment. Procedural requirements must be strictly followed.

Types of termination: Resignation is voluntary termination by employee. Ensure written resignation letter. Process all dues including gratuity, leave encashment, PF settlement. Conduct exit interview and collect company property.

Termination with notice means employer-initiated termination with contractual notice. Provide written termination letter stating effective date. Pay all dues through last working day. Continue benefits during notice period.

Termination with payment in lieu of notice means immediate separation with notice period pay. Calculate notice period salary including all components. Process full and final settlement. Immediate handover of responsibilities and company property.

Termination for cause means dismissal without notice for gross misconduct. Requires documented misconduct and investigation. Domestic enquiry recommended for serious matters. Written show-cause notice with opportunity to respond. Clear documentation of grounds and process.

Grounds for termination for cause: Dishonesty, fraud, or theft. Gross negligence or willful damage. Insubordination or refusal to follow lawful instructions. Habitual absence without leave. Breach of confidentiality or fiduciary duty. Conviction for criminal offense. Sexual harassment or workplace violence.

Due process for termination for cause: Issue written charge sheet detailing alleged misconduct. Provide opportunity to respond (typically 7-14 days). Conduct domestic enquiry if serious matters (internal tribunal). Consider employee''s explanation before decision. Issue reasoned termination order if misconduct established.

Full and final settlement components: Salary through last working day. Leave encashment for unutilized earned leave. Reimbursements due for expenses incurred. Gratuity (if 5+ years service completed under Payment of Gratuity Act). Bonus (proportionate if eligible under Payment of Bonus Act). ESOP treatment as per scheme (exercise period, forfeiture). Deductions: Notice period shortfall, advances, loans, damages.

Separation agreement and release: Consider mutual separation agreement for senior employees. Include: Settlement amount, release of claims, confidentiality, non-disparagement. Employee should have opportunity to seek legal advice. Reasonable consideration beyond statutory entitlements recommended.

Documentation requirements: Maintain personnel file with performance records. Document all warnings and counseling. Keep records of any investigation. Preserve termination letter and settlement documents. Retain records for 3 years minimum (longer for disputes).

Dispute prevention strategies: Maintain clear performance management documentation. Follow progressive discipline where appropriate (verbal warning, written warning, final warning). Ensure consistent treatment across similar situations. Consider legal review before terminating senior employees. Offer outplacement support where appropriate.',
        '["Create termination procedure documentation covering different termination types with required notices and timelines", "Develop full and final settlement calculation template with all statutory components", "Draft termination letter templates for resignation acceptance, notice termination, and termination for cause", "Establish domestic enquiry procedure for termination for cause situations"]'::jsonb,
        '["Termination Procedure Manual for non-workmen employees", "Full and Final Settlement Calculator with all components", "Termination Letter Templates for different scenarios", "Domestic Enquiry Procedure Guide with documentation templates"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Intellectual Property Protection (Days 13-16)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Intellectual Property Protection',
        'Master trademark registration (Rs 4,500 for startups), copyright protection, patent strategy, and trade secret safeguards. Navigate IP India processes and build a comprehensive IP portfolio.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 13: IP Portfolio Strategy for Startups
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        13,
        'IP Portfolio Strategy for Startups',
        'Intellectual property is often a startup''s most valuable asset, yet IP strategy is frequently an afterthought. A systematic approach to IP protection creates competitive moats, increases valuation, and prevents costly disputes. India offers significant cost advantages for IP protection, with trademark registration costing just Rs 4,500 for DPIIT-recognized startups.

Types of IP relevant to startups: Trademarks protect brand identifiers - names, logos, taglines, sounds, colors, and shapes that distinguish your goods/services. Patents protect inventions - novel, non-obvious, and useful technical solutions or processes. Copyrights protect original creative works - software code, content, designs, and artistic works. Trade secrets protect confidential business information - processes, formulas, customer lists, and know-how.

IP audit process for startups: Inventory step: List all potential IP assets - brand names, logos, inventions, software, content, processes. Categorize by IP type: What protection mechanism applies to each asset? Prioritize by value: Which assets are most critical to competitive advantage? Assess risk: What is the risk of infringement or loss? Plan protection: Develop timeline and budget for protection.

Budget allocation for startup IP: Trademarks should be the first priority - protect your brand name and logo. Cost: Rs 4,500 per class for DPIIT startups, Rs 9,000 for others. Budget Rs 15,000-30,000 for first 2-3 classes. Copyrights are free through creation but registration provides evidentiary benefit. Cost: Rs 500-2,000 per work. Budget Rs 5,000-10,000 for key software and content. Patents are expensive and time-consuming - consider only if genuine technical innovation exists. Cost: Rs 1,60,000+ for complete patent (filing through grant). Budget only for truly novel inventions with commercial potential. Trade secrets require investment in protection systems, not registration. Budget for access controls, security measures, and legal agreements.

IP strategy alignment with business stage: Pre-seed and Seed stage should focus on trademark applications for brand name and logo, copyright registration for software code, and robust NDA and employment IP assignment clauses. Series A stage should file patents if applicable (12-month provisional window), expand trademark portfolio internationally if expanding, and establish formal trade secret program. Growth stage should build comprehensive IP portfolio, consider defensive patents, and implement monitoring and enforcement program.

Founder IP considerations: Prior IP disclosure is critical where founders may have IP from previous employment. Conduct IP due diligence before incorporation. Ensure clean IP assignment from all founders. Consider whether prior employer could claim ownership.

IP in fundraising: VCs conduct IP due diligence - clean IP ownership is expected. IP portfolio contributes to valuation. Freedom to operate analysis may be required. Representations and warranties about IP in investment documents.

Government support for startup IP: Startup India IP facilitation provides fast-track examination (40-50% fee reduction). DPIIT recognition gives 80% rebate on patent filing fees, 50% rebate on trademark fees. Patent Agents provide facilitator support for application filing. State schemes in Karnataka, Maharashtra, and others reimburse IP registration costs.

Common IP mistakes by startups: Not filing trademarks before public launch (someone else may file first). Using contractor-created IP without assignment. Assuming software is automatically protected (it is, but prove it). Public disclosure before patent filing (destroys novelty). Underestimating trade secret protection requirements.',
        '["Conduct comprehensive IP audit identifying all brand names, inventions, software, content, and confidential processes", "Prioritize IP assets based on competitive importance and protection urgency", "Create IP protection budget and timeline for next 12 months", "Review all founder and employee agreements for IP assignment provisions"]'::jsonb,
        '["IP Audit Template with asset identification checklist", "IP Protection Budget Calculator for startups", "Startup India IP Benefits Guide with application process", "IP Due Diligence Checklist for fundraising preparation"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: Trademark Registration in India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        14,
        'Trademark Registration in India',
        'Trademarks are the most immediately important IP for startups, protecting brand identity that customers associate with your products and services. The Trade Marks Act 1999 governs trademark registration in India. DPIIT-recognized startups benefit from expedited examination and reduced fees.

What can be trademarked in India: Word marks include brand names, product names, and taglines. Device marks include logos, symbols, and graphical elements. Combination marks include word plus device together. Shape marks include product or packaging shapes (limited). Sound marks include distinctive audio sequences (relatively new). Color marks include single colors or combinations (difficult to register).

Trademark classification system: Nice Classification divides goods and services into 45 classes. Classes 1-34 cover goods, Classes 35-45 cover services. Multi-class filing allowed in India (separate fee per class). Key classes for tech startups: Class 9 (software, apps, electronics), Class 35 (advertising, business services), Class 42 (IT services, software development), Class 38 (telecommunication services).

Trademark search before filing: Search IP India database at ipindiaservices.gov.in (free). Search for identical and phonetically similar marks. Check same class and related classes. Search common law (unregistered) marks online. Consider professional comprehensive search (Rs 5,000-15,000).

Trademark filing process: Step 1: Prepare application with TM-A form (online through IP India portal). Applicant details (company, not individual for startups). Clear representation of mark. Goods/services specification. Priority claim if applicable (Paris Convention). Step 2: Pay fees - Rs 4,500 per class for DPIIT startups (e-filing), Rs 9,000 per class for others. Step 3: Examination - automatic for startups under expedited scheme (1-3 months). Step 4: Publication in Trade Marks Journal for 4 months opposition period. Step 5: Registration if no opposition or opposition overcome.

Timeline: Standard track takes 18-24 months from filing to registration. Expedited track for startups takes 6-12 months. Opposition can add 12-18 months if contested.

Examination objections and responses: Common objections include similarity to existing marks (Section 11), descriptive or generic marks (Section 9), deceptive or scandalous marks (Section 9), and geographical indications (Section 9). Response timeline is 30 days (extendable). Hearing may be required for contested matters.

Opposition proceedings: Any person can oppose within 4 months of publication. Counter-statement required within 2 months of opposition notice. Evidence filing by both parties. Hearing before Registrar. Appeal to Intellectual Property Appellate Board (now High Court).

Maintaining trademark registration: Registration valid for 10 years from application date. Renewal every 10 years (Rs 5,000 for startups, Rs 10,000 for others). File renewal 6 months before expiry (late renewal with penalty possible). Use requirement - non-use for 5+ years can lead to cancellation.

Trademark enforcement: Send cease and desist notice for infringement. File suit in District Court or High Court. Remedies: Injunction, damages, accounts of profits. Criminal prosecution available for trademark counterfeiting. Customs recordation for border protection against imports.

International trademark protection: Madrid Protocol for international registration (India is member). File through Indian registry for protection in 120+ countries. Significantly cheaper than individual country filings. Consider key markets: US, EU, UK, Singapore for tech startups.',
        '["Conduct comprehensive trademark search on IP India database for your brand name and logo", "Identify relevant Nice Classification classes for your goods and services", "Prepare and file trademark application through IP India portal with DPIIT startup benefit", "Create trademark watch strategy to monitor for similar applications"]'::jsonb,
        '["Trademark Search Guide with IP India portal navigation", "Nice Classification Guide for Tech Startups with class selection strategy", "TM-A Application Filing Tutorial with screenshot walkthrough", "Trademark Opposition Response Guide"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Copyright Protection for Software and Content
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        15,
        'Copyright Protection for Software and Content',
        'Copyright protects original creative works automatically upon creation, but registration provides significant evidentiary and enforcement benefits. For software startups, copyright is the primary protection mechanism for code, UI designs, content, and documentation. The Copyright Act 1957 governs copyright in India.

What copyright protects: Literary works include software source code, documentation, and written content. Artistic works include UI designs, graphics, logos (also trademark), and illustrations. Cinematograph films include videos, animations, and product demos. Sound recordings include podcasts, music, and audio content.

Copyright protection for software: Software code is protected as "literary work" under Copyright Act. Both source code and object code are protected. Protection is automatic upon creation (no registration required). Term: Author''s lifetime plus 60 years (or 60 years from publication for companies).

Copyright registration benefits: Prima facie evidence of ownership in court proceedings. Required for filing infringement suit in some jurisdictions. Enhances IP portfolio for fundraising/M&A. Deters potential infringers. Enables statutory damages claims.

Copyright registration process: Filing: Submit application through Copyright Office (copyright.gov.in). Form XIV for all works except cinematograph. Application fee: Rs 500 per work (Rs 2,000 for software). Required documents: Work copies, NOC from author (if different from applicant), power of attorney.

Examination and publication: 30-day waiting period for objections. Examination by Copyright Office. Registration certificate issued if no objections. Timeline: 2-3 months typically.

Work made for hire in India: Employer owns copyright for works created by employees in course of employment under Section 17. For contractors, ownership vests in contractor unless assigned. Critical: Ensure written assignment from all contractors and consultants.

Copyright assignment provisions: Must be in writing and signed by assignor. Specify rights assigned (reproduction, adaptation, distribution, communication). Territory and term of assignment. Consideration for assignment. Reversion rights after specified period (if applicable).

Open source software considerations: Using open source creates compliance obligations. Permissive licenses (MIT, Apache) allow proprietary use with attribution. Copyleft licenses (GPL) require derivative works to be open source. Conduct open source audit before fundraising. Maintain open source compliance documentation.

Copyright infringement and enforcement: Infringement: Unauthorized reproduction, adaptation, distribution, or communication. Civil remedies: Injunction, damages, accounts of profits. Criminal remedies: Fine and imprisonment for commercial piracy. Digital enforcement: Notice and takedown under IT Act and platform policies.

Digital content protection: Digital Rights Management (DRM) for software and content. Terms of service restricting copying and redistribution. Watermarking and tracking for leak detection. DMCA/IT Act takedown procedures.

User-generated content considerations: Platform terms should include license grant from users. Clear terms on ownership vs. license. Content moderation policies. Safe harbor protections under IT Act Section 79.',
        '["Register copyright for core software codebase and key creative assets through Copyright Office", "Audit all contractor and employee agreements for proper copyright assignment provisions", "Conduct open source software audit and ensure license compliance", "Create content protection policy covering DRM, watermarking, and takedown procedures"]'::jsonb,
        '["Copyright Registration Guide for software and content", "Copyright Assignment Agreement Template for contractors", "Open Source License Compliance Guide with risk assessment", "Content Protection Policy Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Patent Basics and Trade Secret Protection
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        16,
        'Patent Basics and Trade Secret Protection',
        'Patents protect inventions but require significant investment and public disclosure. Trade secrets protect confidential information indefinitely but require robust protection systems. Understanding when to use each protection mechanism is crucial for startup IP strategy.

Patent fundamentals under Patents Act 1970: Patentable subject matter includes processes, machines, manufactures, and compositions of matter. Patentability requirements: Novelty (not publicly known before filing), Inventive step (non-obvious to skilled person), Industrial applicability (capable of being made or used).

What cannot be patented in India under Section 3: Mathematical methods and algorithms (Section 3(k)). Business methods and computer programs "per se" (Section 3(k)). Scientific principles and abstract theories. Methods of agriculture or horticulture. Mere discovery of new property of known substance.

Software patents in India: Pure software is not patentable under Section 3(k). Software with technical effect or hardware interaction may be patentable. Technical contribution analysis is key. Example: Algorithm alone is not patentable, but algorithm implemented in hardware for specific technical purpose may be.

Patent application process: Provisional application establishes priority date with basic disclosure. Rs 1,600 for startups (Rs 4,000 for others). Must file complete specification within 12 months. Complete specification includes full disclosure of invention with claims. Rs 4,000 for startups (Rs 8,000 for others). Examination request required within 48 months (Rs 4,000 for startups).

Patent timeline and costs: Total cost for startup: Rs 1,60,000-2,50,000 (filing through grant including attorney fees). Timeline: 3-5 years from filing to grant. Expedited examination available for startups (1-2 years).

Patent vs trade secret decision: Choose patents when the invention can be reverse-engineered, you need exclusivity to license or enforce, investor expectations require patent portfolio, or industry practice favors patents (pharma, hardware). Choose trade secrets when the information cannot be reverse-engineered (Coca-Cola formula), patent protection is unavailable (business methods), maintaining secrecy is feasible, or the invention has short commercial life (faster than patent grant).

Trade secret protection framework: Unlike patents, trade secrets are not registered. Protection comes from maintaining secrecy. No specific trade secret statute in India (unlike US DTSA). Protection through: Contract (NDAs, employment agreements), Breach of confidence doctrine, Copyright for documented processes.

Establishing trade secret protection: Identification: Document what constitutes trade secrets. Classification: Mark documents as confidential with appropriate handling. Access control: Limit access to need-to-know basis with audit trails. Physical security: Locked storage, secure facilities. Digital security: Encryption, access controls, monitoring. Agreements: NDA, employment confidentiality, vendor agreements. Training: Regular employee awareness on confidentiality obligations.

Misappropriation claims: Elements to prove: Information was secret, reasonable steps taken to maintain secrecy, and defendant acquired through improper means or breach of confidence. Remedies: Injunction, damages, accounts of profits.

Employee knowledge vs trade secrets: Employees can use general skills and knowledge in new employment. Specific trade secrets cannot be used or disclosed. Distinction is often litigated - documentation helps. Non-solicitation more enforceable than non-compete in India.

Trade secret due diligence for fundraising: Investors will assess trade secret protection practices. Document protection measures and access logs. Maintain inventory of trade secrets with protection status. Include representations in investment documents.',
        '["Evaluate whether any innovations warrant patent protection based on novelty, commercial value, and cost-benefit", "Create trade secret inventory identifying all confidential business information requiring protection", "Implement trade secret protection program with classification, access controls, and documentation", "Develop patent vs trade secret decision framework for future innovations"]'::jsonb,
        '["Patent Filing Decision Framework with cost-benefit analysis", "Trade Secret Inventory Template with classification levels", "Trade Secret Protection Program Implementation Guide", "Patent Application Process Guide for Indian startups"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Contract Law & Commercial Agreements (Days 17-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Contract Law & Commercial Agreements',
        'Master the Indian Contract Act 1872, draft bulletproof customer contracts, vendor agreements, and SLAs. Learn negotiation strategies and liability limitation techniques.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 17: Indian Contract Act 1872 Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        17,
        'Indian Contract Act 1872 Fundamentals',
        'The Indian Contract Act 1872 is the foundational legislation governing all contracts in India. Understanding its core principles is essential for drafting enforceable agreements and avoiding common pitfalls that render contracts void or voidable.

Elements of a valid contract under Section 10: Offer and acceptance (Sections 2-9): Clear offer by one party and unconditional acceptance by another. Counter-offer is rejection plus new offer. Acceptance must be communicated to offeror. Free consent (Sections 13-22): Consent not obtained by coercion, undue influence, fraud, misrepresentation, or mistake. Consent obtained through these means makes contract voidable. Lawful consideration (Sections 2(d), 23-25): Something of value exchanged by both parties. Past consideration is valid in India (unlike common law). Consideration need not be adequate but must be real. Lawful object (Section 23): Contract purpose must not be illegal, immoral, or against public policy. Examples of unlawful objects: Restraint of trade, restraint of marriage, and restraint of legal proceedings. Capacity to contract (Sections 11-12): Parties must be of legal age (18 years), of sound mind, and not disqualified by law. Contracts with minors are void (not just voidable).

Void vs voidable contracts: Void contracts (Section 2(j)) have no legal effect from beginning. Examples: Contracts with minors, contracts with unlawful consideration. Voidable contracts (Section 2(i)) are valid until avoided by aggrieved party. Examples: Contracts induced by coercion, undue influence, fraud.

Key contractual concepts: Privity of contract: Only parties to contract can sue or be sued under it. Third-party beneficiaries cannot enforce. Exception: Agent can bind principal. Consideration: Must flow from promisee, can be past or present, need not be adequate. "Agreement to agree" is not enforceable - terms must be certain.

Performance and breach: Reciprocal promises (Section 51): When one party''s performance depends on other''s performance. Time as essence (Section 55): If time is essence, late performance is breach. If not, reasonable time is implied. Anticipatory breach (Section 39): One party indicating they will not perform before due date.

Remedies for breach: Damages (Sections 73-74): Ordinary damages for direct loss from breach. Special damages if foreseeable at time of contracting. Liquidated damages if pre-agreed and reasonable. Specific performance (under Specific Relief Act 1963): Court orders performance of contract. Available when damages are inadequate remedy. Injunction: Restraining order preventing breach. Available for negative covenants.

Limitation periods: Contract claims must be filed within 3 years from cause of action (Limitation Act 1963). Acknowledgment in writing restarts limitation. Part payment also restarts limitation.

Stamping requirements: Contracts must be executed on stamp paper of appropriate value. Stamp duty varies by state and contract type. Unstamped contracts are inadmissible as evidence. Can be stamped later with penalty.

E-contracts and digital signatures: Information Technology Act 2000 recognizes electronic contracts. Digital signatures have legal validity equivalent to physical signatures. Click-wrap and browse-wrap agreements are generally enforceable. Electronic records are admissible as evidence.

Contract interpretation principles: Contra proferentem: Ambiguity construed against drafter. Ejusdem generis: General words limited by specific words preceding them. Express terms override implied terms. Written terms override oral representations.',
        '["Review all existing contracts for compliance with Indian Contract Act essentials", "Identify any contracts that may be void or voidable and remediate", "Ensure all contracts are properly stamped as per state stamp duty requirements", "Create contract review checklist based on Indian Contract Act requirements"]'::jsonb,
        '["Indian Contract Act 1872 Summary for Business Context", "Contract Validity Checklist covering all Section 10 requirements", "State-wise Stamp Duty Chart for common contract types", "Contract Interpretation Principles Guide"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 18: Customer Contracts and Terms of Service
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        18,
        'Customer Contracts and Terms of Service',
        'Customer agreements vary significantly between B2B (negotiated contracts) and B2C (standard terms). Both require careful drafting to protect the company while maintaining customer trust. Consumer Protection Act 2019 adds specific requirements for B2C relationships.

B2C Terms of Service structure: Terms of Service (ToS) or Terms and Conditions govern the relationship with consumer users. They are typically non-negotiable standard form contracts. Enforceability depends on: Clear presentation and acceptance mechanism, reasonable terms (unfair terms may be struck down), compliance with Consumer Protection Act 2019.

Essential ToS components: Service description defines what you provide and don''t provide. Limitations on scope prevent unrealistic expectations. Features may change notice reserves right to modify service.

Account and usage terms cover registration requirements and accuracy of information. Prohibited uses and acceptable use policy. Account security responsibilities. Suspension and termination rights.

Payment terms address pricing and billing cycles. Auto-renewal terms (with clear disclosure). Refund policy (required under Consumer Protection Act). Payment method and currency.

Intellectual property section defines who owns what. User content license grant to platform. Platform content restrictions. Trademark usage guidelines.

Limitation of liability and disclaimer: Services provided "as is" with limited warranties. Cap on liability (typically fees paid or fixed amount). Exclusion of consequential damages. Disclaimer of third-party content/services.

Indemnification requires users to indemnify for their violations. Carve out company''s own negligence. Reasonable scope - overly broad may be unenforceable.

Dispute resolution specifies governing law and jurisdiction. Arbitration clause (individual, not class). Notice requirements before legal action.

Privacy and data addresses reference to Privacy Policy. Data usage and sharing. User data portability and deletion rights.

Consumer Protection Act 2019 compliance: Unfair trade practices prohibition (Section 2(47)). Unfair contract terms can be declared void (Section 2(46)). No exclusion of statutory consumer rights. Clear disclosure of material terms. Product liability for defective services (Section 84).

B2B Master Services Agreement (MSA) structure: Unlike B2C, B2B contracts are often negotiated. MSA provides framework with SOWs for specific projects.

MSA key provisions: Services and deliverables with detailed scope in SOW. Acceptance criteria and process. Change order procedure for scope changes. Service levels (SLAs) with remedies for breach.

Commercial terms include pricing and payment terms (Net 30-60 typical in India). Invoicing requirements and disputes. Tax treatment (GST, TDS). Price adjustment mechanisms for long-term contracts.

IP provisions cover IP ownership (customer-specific vs. pre-existing vs. new). License grants for software/platform. Work product ownership (usually customer for custom work). Background IP carve-out.

Confidentiality section addresses mutual confidentiality obligations. Definition of confidential information. Permitted disclosures. Survival period (typically 2-5 years post-termination).

Representations and warranties: Service quality warranties (professional standards, compliance with specifications). Non-infringement warranty. Compliance with laws. Warranty disclaimer for specific items.

Liability and indemnification: Mutual indemnification for IP infringement and third-party claims. Cap on liability (typically 12-24 months fees). Exclusion of consequential damages. Carve-outs for willful misconduct, confidentiality breach.',
        '["Draft comprehensive Terms of Service compliant with Consumer Protection Act 2019 for B2C platform", "Create B2B Master Services Agreement template with balanced provisions", "Develop Statement of Work (SOW) template for project-based engagements", "Review liability limitation provisions for enforceability under Indian law"]'::jsonb,
        '["Terms of Service Template for SaaS/platform businesses", "B2B Master Services Agreement Template with negotiation notes", "Statement of Work Template with pricing and deliverable formats", "Consumer Protection Act 2019 Compliance Checklist for online businesses"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 19: Vendor Agreements and Procurement
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        19,
        'Vendor Agreements and Procurement',
        'Vendor relationships are critical for startups, from cloud services and software tools to contractors and professional services. Proper vendor agreements protect against service disruptions, data breaches, and vendor lock-in while ensuring compliance obligations flow through the supply chain.

Vendor agreement fundamentals: Unlike customer agreements where you hold leverage, vendor agreements often start from vendor''s standard terms. Key negotiation areas: SLA commitments and remedies, data protection and security, liability caps and insurance, termination and transition rights.

Services agreement key provisions: Scope of services with detailed description with exclusions. Service levels (SLAs) with measurable metrics, reporting requirements, and breach remedies. Personnel with qualifications, key personnel provisions, and replacement rights. Subcontracting with restrictions on subcontracting, flow-down of obligations.

Data protection and security: Data processing agreement (DPA) required if vendor processes personal data. Security standards (ISO 27001, SOC 2) with audit rights. Breach notification obligations (typically 24-72 hours). Data localization if required by sector regulations. Return/deletion of data upon termination.

Intellectual property provisions: IP ownership in deliverables (should vest in customer for custom work). License to vendor IP embedded in deliverables. Escrow for critical software (source code access if vendor fails). Non-infringement warranty and indemnity.

Business continuity: Disaster recovery and business continuity commitments. Force majeure provisions and limitations. Step-in rights in case of vendor failure. Termination assistance obligations.

Financial and commercial terms: Pricing model (fixed, time and materials, outcome-based). Payment terms and invoicing. Price adjustment mechanisms. Most favored customer clause. Audit rights for usage-based pricing.

Liability and insurance: Vendor liability cap (push for higher than customer-facing). Mandatory insurance coverage (professional liability, cyber liability). Indemnification for IP infringement, data breaches, and personnel issues.

Termination provisions: Termination for convenience with notice (30-90 days typical). Termination for cause with cure period. Transition assistance period and obligations. Data return and destruction timelines.

Software/SaaS vendor specific considerations: Subscription terms and renewal. Feature deprecation and API changes. Data portability and export formats. Uptime commitments (99.9% = 8.76 hours downtime/year). Support levels and response times.

Cloud services (AWS, GCP, Azure): Standard terms are largely non-negotiable for startups. Focus on: Data processing addendum, data location options, and security certifications. Enterprise agreements available at scale with better terms.

Professional services vendors: Clear deliverables and acceptance criteria. Milestone-based payment tied to deliverables. IP assignment for work product. Background checks and confidentiality.

Contractor vs vendor: Individual contractors need employment-like agreements (engagement letter). Ensure no employment relationship created. Proper TDS compliance (10% under Section 194J for professional services). GST treatment (reverse charge for some services).

Vendor management best practices: Maintain vendor register with contract details. Calendar renewal and termination dates. Regular vendor performance reviews. Periodic market benchmarking. Exit planning for critical vendors.',
        '["Audit existing vendor agreements for SLA commitments, data protection, and termination rights", "Create vendor agreement template for common procurement scenarios", "Implement vendor management system with contract tracking and renewal alerts", "Develop vendor security assessment questionnaire for data-processing vendors"]'::jsonb,
        '["Vendor Agreement Template with balanced provisions", "Data Processing Agreement (DPA) Template for vendor relationships", "Vendor Security Assessment Questionnaire", "Vendor Management Best Practices Guide"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 20: SLAs and Performance Guarantees
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        20,
        'SLAs and Performance Guarantees',
        'Service Level Agreements (SLAs) translate service commitments into measurable, enforceable terms. For SaaS and service businesses, SLAs are central to customer relationships. For procurement, SLAs ensure vendors deliver as promised. Proper SLA design balances customer protection with operational feasibility.

SLA structure and components: Service description defines what specific services are covered. Scope boundaries clarify what is excluded from SLA coverage.

Performance metrics section defines measurable KPIs: Availability/uptime (percentage of time service is operational), Response time (how quickly requests are processed), Resolution time (how long to fix issues), Throughput (transactions per second, concurrent users), Error rates (acceptable failure percentages).

Measurement methodology covers how metrics are calculated. Exclusions from measurement (scheduled maintenance, force majeure). Measurement period (monthly, quarterly). Reporting frequency and format.

Service credits and remedies specify credits for SLA misses. Thresholds for credits (graduated or cliff). Credit calculation methodology. Credit caps (typically 10-100% of monthly fees). Whether credits are exclusive remedy.

Escalation procedures detail levels of escalation for issues. Contact information and response times. Executive escalation triggers.

Common SLA metrics for tech services: Uptime/availability examples include 99.9% (three nines) allowing 8.76 hours downtime/year, 99.95% allowing 4.38 hours downtime/year, and 99.99% (four nines) allowing 52.6 minutes downtime/year. Calculation: (Total time - Downtime) / Total time x 100.

Response time SLAs: P1 (Critical) with service down affecting all users requires 15-minute response and 4-hour resolution. P2 (High) with major feature unavailable requires 1-hour response and 8-hour resolution. P3 (Medium) with feature impaired but workaround available requires 4-hour response and 24-hour resolution. P4 (Low) with minor issues or questions requires 24-hour response and best effort resolution.

Support availability: 24/7/365 for critical systems. Business hours (typically 9 AM - 6 PM IST) for standard support. Premium support tiers with enhanced response times.

Service credit structures: Per-incident credits provide fixed credit per SLA breach. Tiered credits give increasing credits for worse performance. Monthly aggregate credits are based on aggregate performance over period.

Example credit structure for uptime: 99.9% or above means 0% credit. 99.0% to 99.9% means 10% credit. 95.0% to 99.0% means 25% credit. Below 95.0% means 50% credit plus termination right.

SLA enforcement considerations: Service credits should be automatic and not require claims. Regular reporting keeps both parties informed. Clear exclusions prevent gaming (maintenance windows, customer-caused issues). Termination right for persistent SLA failures.

SLA negotiation strategies as a customer: Push for meaningful service credits (not just 5-10%). Require credit caps of at least 100% of affected month fees. Include termination right for repeated SLA failures. Get audit rights for uptime measurement. Negotiate specific carve-outs relevant to your use case.

SLA drafting strategies as a provider: Start conservative and build track record. Exclude items outside your control (third-party services, customer actions). Include reasonable maintenance windows. Cap credits at reasonable percentage (25-50% typical). Make credits sole and exclusive remedy.

SLA monitoring and reporting: Implement monitoring tools for automated measurement. Dashboard for real-time visibility. Monthly/quarterly SLA reports to customers. Root cause analysis for SLA misses. Continuous improvement process.',
        '["Define SLA metrics appropriate for your service offering with measurable KPIs", "Create service credit structure that is meaningful but operationally sustainable", "Implement SLA monitoring and reporting infrastructure", "Review vendor SLAs for adequacy and negotiate improvements where needed"]'::jsonb,
        '["SLA Template for SaaS services with common metrics", "Service Credit Calculator with different structures", "SLA Monitoring Tools Comparison (Datadog, New Relic, etc.)", "SLA Negotiation Playbook for customers and vendors"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Regulatory Compliance Framework (Days 21-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Regulatory Compliance Framework',
        'Navigate sector-specific licensing requirements including FSSAI for food, RBI for fintech, IRDAI for insurance, and CDSCO for healthcare. Build a compliance framework that scales with your business.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 21: Sector-Specific Regulatory Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        21,
        'Sector-Specific Regulatory Landscape',
        'India''s regulatory landscape is complex, with sector-specific regulators adding layers beyond general corporate compliance. Startups must identify applicable regulations early to avoid costly pivots or shutdowns. Many promising startups have failed due to regulatory surprises that proper planning could have avoided.

General vs sector-specific regulation: General regulations apply to all businesses: Companies Act, labor laws, tax compliance, and data protection. Sector-specific regulations add additional requirements based on business activity. Licensing requirements may require approval before commencing operations.

Key sectoral regulators in India: Financial services fall under RBI (Reserve Bank of India) for banking, payments, and lending, SEBI (Securities and Exchange Board) for capital markets and investment advisory, and IRDAI (Insurance Regulatory and Development Authority) for insurance products and distribution.

Healthcare and pharmaceuticals fall under CDSCO (Central Drugs Standard Control Organisation) for drugs and medical devices, FSSAI (Food Safety and Standards Authority) for food products, and AYUSH Ministry for traditional medicine.

Telecommunications and technology fall under TRAI (Telecom Regulatory Authority) for telecom services and DoT (Department of Telecom) for licensing, MeitY for IT and digital services.

Other sectors include BIS (Bureau of Indian Standards) for product standards, DGCA for aviation and drones, and PFRDA for pension products.

Fintech regulatory requirements: Payment aggregators and gateways require RBI PA/PG license under PA Guidelines 2020. Minimum net worth Rs 15 crore (Rs 25 crore by 2024). Technology audit and security compliance. Escrow account requirements.

NBFCs (Non-Banking Financial Companies) require RBI NBFC license for lending activities. Minimum NOF Rs 2 crore (Rs 10 crore for new licenses). Fair practices code compliance. RBI reporting and supervision.

Investment advisory requires SEBI registration under Investment Advisers Regulations 2013. Qualification requirements for principals. Net worth Rs 50 lakh (Rs 1 crore for corporates). Client suitability and disclosure requirements.

Account aggregators operate under RBI AA framework for consent-based data sharing. NBFC-AA license required. Technology and security standards.

Healthcare and pharma regulatory requirements: Medical devices require CDSCO registration/license under Medical Devices Rules 2017. Classification-based approval requirements. Clinical investigation requirements for certain classes. Import license for foreign-manufactured devices.

Telemedicine services must follow Telemedicine Practice Guidelines 2020. Registered medical practitioner requirement. Prescription and consultation standards. Technology platform requirements.

E-pharmacy is regulated under Drugs and Cosmetics Act 1940, with varied state-level regulations. Many states have not formalized e-pharmacy licensing. Draft E-Pharmacy Rules pending finalization.

Food business regulatory requirements: FSSAI license is mandatory for all food businesses. Basic registration (Rs 100/year) for petty manufacturers below threshold. State license for medium operations. Central license for large operations, importers, or multi-state.

FoSCoS (Food Safety Compliance System) is the online platform for licensing and compliance.

Labeling and packaging requirements have detailed requirements under FSSAI regulations.

EdTech regulatory considerations: No specific licensing (unlike fintech), but consumer protection and advertising regulations apply. UGC regulations for partnerships with universities. AICTE for technical education partnerships. NEP 2020 may bring new regulatory framework.',
        '["Map all sector-specific regulators applicable to your business model with their licensing requirements", "Assess licensing requirements and timelines for each applicable regulation", "Identify regulatory risks and pivot scenarios if primary model faces restrictions", "Create regulatory compliance budget including licensing fees, professional costs, and ongoing compliance"]'::jsonb,
        '["Sector-wise Regulator Directory with contact information and websites", "Fintech Licensing Guide covering PA, NBFC, and Investment Advisory", "Healthcare Regulatory Compliance Checklist", "FSSAI Licensing Guide for food startups"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: Licensing and Registration Procedures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        22,
        'Licensing and Registration Procedures',
        'Obtaining regulatory licenses requires careful preparation, documentation, and often significant time. Understanding the process helps plan business timelines and avoid costly delays. This lesson covers procedures for common startup licenses.

FSSAI licensing process: Registration vs License: Registration for petty food businesses (turnover below Rs 12 lakh), License required for others.

State FSSAI License for medium enterprises (Rs 12 lakh - Rs 20 crore turnover). Documents: Form B application, food safety management plan, layout plan, list of equipment, water test report. Timeline: 30-60 days. Fee: Rs 2,000-5,000 per year based on production capacity.

Central FSSAI License for large enterprises, importers, multi-state operations. Additional requirements: NOC from municipality, IEC (for imports), quality control certificate. Timeline: 60-90 days. Fee: Rs 7,500-25,000 per year.

Process: Apply on FoSCoS portal, document upload, inspection, license issuance. License valid for 1-5 years (choose at application).

RBI Payment Aggregator license process: Eligibility: Company incorporated under Companies Act, minimum net worth Rs 15 crore. Existing PAs had to apply by June 2022, new applicants can apply anytime.

Application process: Apply through PRAVAAH portal. Submit business plan, IT systems documentation, compliance policies. System audit by CERT-In empanelled auditor. RBI assessment and queries. In-principle approval followed by final license.

Timeline: 12-18 months from application to license. Key requirements: Escrow account mechanism, nodal account, merchant due diligence, and information security.

NBFC registration process: Eligibility: Company registered under Companies Act, minimum NOF Rs 10 crore.

Application process: Apply to regional RBI office. Business plan with 5-year projections. Directors'' qualifications and backgrounds. Infrastructure and systems. RBI assessment and in-person discussions. Certificate of Registration issuance.

Timeline: 6-12 months. Ongoing requirements: Capital adequacy, asset classification, RBI returns.

Import Export Code (IEC): Required for: Any import or export of goods/services. Issuing authority: DGFT (Directorate General of Foreign Trade).

Process: Apply online at DGFT portal. Documents: PAN, Aadhaar, bank account, address proof. Fee: Rs 500. Timeline: 1-3 days. Validity: Lifetime (no renewal needed).

Shop and Establishment Registration: Required for: All commercial establishments. Issuing authority: State labor department.

Process varies by state. Generally: Apply online or offline with business details. Documents: Identity proof, address proof, list of employees. Fee: Rs 100-5,000 depending on state and establishment size. Timeline: 7-30 days.

Professional Tax Registration: Required in: Most states for employers and certain professionals. Rate: Typically Rs 200-300 per month deducted from employees. Process: Register with state PT department. File monthly/annual returns and remit tax.

GST Registration: Required when: Turnover exceeds Rs 20 lakh (Rs 10 lakh for special category states) or making inter-state supplies. Process: Apply on GST portal. Documents: PAN, address proof, bank details. Timeline: 3-7 days (with Aadhaar authentication).

Trade License: Required for: Operating business in a municipal area. Issuing authority: Municipal corporation. Process and fees vary by city. Typically annual renewal required.',
        '["Identify all licenses required for your business and create application timeline", "Prepare documentation packages for each license application", "Apply for basic registrations: Shop & Establishment, Professional Tax, GST if applicable", "Initiate sector-specific license applications with realistic timeline expectations"]'::jsonb,
        '["License Application Checklist with documents required for each", "FSSAI Application Guide with FoSCoS portal navigation", "RBI PA License Application Guide", "GST Registration Step-by-Step Guide"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: Ongoing Compliance Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        23,
        'Ongoing Compliance Management',
        'Obtaining licenses is just the beginning - maintaining compliance requires systematic ongoing effort. Non-compliance can result in penalties, license suspension, or criminal prosecution. Building a compliance management system early prevents problems as the company scales.

Compliance calendar approach: Identify all periodic compliance requirements. Map deadlines throughout the year. Assign responsibility for each compliance. Build reminder systems (T-30, T-15, T-7 days before deadline). Document completion with evidence.

Major compliance categories: Corporate compliance includes ROC annual filings (AOC-4, MGT-7A), board meetings (minimum 4 per year), AGM (within 6 months of year-end), statutory audit, and director KYC (annually).

Tax compliance includes GST returns (monthly GSTR-1, GSTR-3B; annual GSTR-9), TDS returns (quarterly), income tax return (annual), advance tax (quarterly), and transfer pricing (if applicable).

Labor compliance includes PF returns and payments (monthly), ESI returns (half-yearly), professional tax (monthly/annual by state), bonus (annual), and gratuity provisions.

Sector-specific compliance varies: FSSAI return (annual), RBI returns (monthly/quarterly for regulated entities), SEBI filings (for listed/regulated entities).

Compliance management system implementation: Compliance register: Maintain a master list of all applicable compliances. Include: Regulation, frequency, deadline, responsible person, and status. Update as new regulations apply or change.

Documentation: Maintain evidence of all compliance completed. Organize by regulation and period. Accessible for audit/inspection at any time.

Technology tools: Compliance management software (LegalDesk, Legasis, Zoho). Calendar integration for deadlines. Workflow automation for approvals. Audit trail maintenance.

Audit and inspection preparedness: Maintain inspection-ready documentation. Train relevant staff on inspection protocols. Know your rights during inspections. Post-inspection follow-up procedures.

Common compliance failures and consequences: Late ROC filings result in additional fees, potential strike-off. GST non-compliance results in interest, penalties, registration cancellation. Labor law violations result in penalties, prosecution, employee claims. Sector license violations result in license suspension/cancellation, criminal prosecution.

Compliance officer role: For regulated entities, designated compliance officer may be required. Responsibilities: Ensuring compliance, reporting to board, liaison with regulators. Qualifications may be prescribed by regulation.

Internal audit function: Even before statutory requirement, internal compliance audit is valuable. Quarterly self-assessment of compliance status. Gap identification and remediation. Preparation for external audits.

Regulatory change monitoring: Regulations change frequently - new rules, amendments, circulars. Sources: Official gazettes, regulator websites, legal databases. Professional advisors should provide updates. Industry associations often circulate regulatory changes.

Compliance budget: Legal and professional fees for ongoing advice. Compliance software and tools. Audit fees (internal and external). Filing fees and penalties buffer. Training and awareness programs.',
        '["Create master compliance calendar covering all corporate, tax, labor, and sector-specific requirements", "Implement compliance management system with tracking and reminders", "Establish documentation standards for compliance evidence", "Develop inspection preparedness protocol for regulatory visits"]'::jsonb,
        '["Master Compliance Calendar Template for Indian startups", "Compliance Management Software Comparison Guide", "Inspection Preparedness Checklist", "Regulatory Update Sources Directory"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: Building a Scalable Compliance Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        24,
        'Building a Scalable Compliance Framework',
        'As startups grow, compliance complexity increases exponentially - more employees trigger new labor laws, geographic expansion brings new jurisdictions, funding rounds add investor compliance requirements, and new products may require additional licenses. Building a scalable framework from the start prevents compliance debt that becomes expensive to fix later.

Compliance maturity model: Stage 1 - Reactive: Compliance handled ad-hoc as issues arise. No systematic tracking. Common in very early startups.

Stage 2 - Basic: Compliance calendar exists. Designated person (often founder) tracks deadlines. Basic documentation maintained.

Stage 3 - Managed: Compliance management system implemented. Clear ownership and accountability. Regular compliance reviews. External advisors engaged.

Stage 4 - Optimized: Automated compliance workflows. Proactive regulatory monitoring. Compliance integrated into business processes. Board-level oversight.

Designing scalable compliance architecture: Centralized compliance function: Even if one person initially, designate compliance responsibility. Create reporting line to senior management/board. Define scope and authority.

Policy framework: Develop written policies for key compliance areas. Code of conduct and ethics policy. Anti-corruption and anti-bribery policy. Data protection and privacy policy. Information security policy. Whistleblower policy.

Process documentation: Standard operating procedures for compliance tasks. Checklists and templates for recurring activities. Approval workflows for regulated activities. Exception handling procedures.

Technology infrastructure: Compliance management software as system of record. Integration with HR, finance, and operations systems. Automated reminders and escalations. Audit trail and reporting capabilities.

Compliance due diligence for expansion: New geography assessment: Identify applicable regulations before expansion. State-specific labor laws, professional tax, etc. Local licensing requirements. Timeline incorporation into business plan.

New product/service assessment: Regulatory analysis before launch. Required licenses and approvals. Compliance cost in unit economics. Go/no-go decision framework.

M&A and investment compliance: Due diligence on target/partner compliance status. Representations and warranties on compliance. Indemnities for pre-closing non-compliance. Post-closing compliance integration.

Third-party compliance management: Vendor compliance requirements in contracts. Customer compliance obligations (KYC, data protection). Partner compliance certifications. Supply chain compliance monitoring.

Board and investor compliance: Board-level compliance reporting (quarterly). Compliance representation in investment documents. Material compliance issues disclosure. Post-investment compliance covenants.

Compliance cost optimization: Prioritize high-risk areas for investment. Leverage technology for routine compliance. Outsource where cost-effective (payroll, secretarial). Group compliance where possible (multi-state registration).

Building compliance culture: Tone from top - leadership commitment to compliance. Training and awareness programs. Whistleblower mechanisms without retaliation. Compliance in performance evaluations. Consequences for non-compliance.

Compliance metrics and KPIs: On-time compliance percentage. Audit findings and closure rate. Training completion rates. Incident response times. Compliance cost per employee.',
        '["Design compliance organization structure appropriate for current stage with growth path", "Develop core compliance policies: Code of Conduct, Data Protection, Information Security", "Create compliance due diligence checklist for new geographies, products, and partnerships", "Establish compliance reporting to board with defined metrics and frequency"]'::jsonb,
        '["Compliance Maturity Assessment Tool", "Core Compliance Policy Templates Pack", "Expansion Compliance Due Diligence Checklist", "Board Compliance Reporting Template"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
