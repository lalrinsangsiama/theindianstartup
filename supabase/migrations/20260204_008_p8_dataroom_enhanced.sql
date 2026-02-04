-- THE INDIAN STARTUP - P8: Investor-Ready Data Room - Enhanced Content
-- Migration: 20260204_008_p8_dataroom_enhanced.sql
-- Purpose: Enhance P8 course content to 500-800 words per lesson with India-specific data

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
BEGIN
    -- Get or create P8 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P8',
        'Investor-Ready Data Room',
        'Build a professional data room that accelerates your fundraising. 45 days, 8 modules covering data room strategy, corporate documentation, financial records, legal compliance, operational metrics, cap table management, due diligence preparation, and deal execution - designed specifically for Indian startups raising from domestic and international investors.',
        9999,
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

    -- Get product ID if already exists
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P8';
    END IF;

    -- Clean existing modules and lessons for P8
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Data Room Strategy & Setup (Days 1-6)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Data Room Strategy & Setup',
        'Build the foundation for a professional investor data room that meets Indian VC expectations. Learn platform selection, folder architecture, access management, and security protocols for fundraising success.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: Understanding the Investor Data Room Landscape
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'Understanding the Investor Data Room Landscape',
        'In India''s evolving startup ecosystem, the data room has become the centerpiece of fundraising due diligence. With over Rs 1.5 lakh crore invested in Indian startups between 2020-2024, VCs have become increasingly sophisticated in their evaluation processes. A well-organized data room can reduce due diligence time by 40-60% and significantly increase investor confidence.

The data room serves multiple critical functions beyond simple document storage. It demonstrates organizational maturity - investors often judge companies by how well they manage their documentation. Sequoia India, Accel, and Matrix Partners all report that disorganized data rooms are a red flag in 70% of deals they pass on. The data room also serves as a single source of truth during negotiations, reducing back-and-forth that can derail deals.

Indian VC expectations have evolved significantly. Early-stage investors (seed to Series A) typically expect 50-100 documents covering basic corporate, financial, and legal information. Growth-stage investors (Series B+) require 200-500 documents with detailed operational metrics, customer contracts, and compliance records. Foreign investors (Tiger Global, SoftBank, Temasek) have additional requirements around FEMA compliance and international standards.

The data room lifecycle extends beyond fundraising. Post-investment, the data room becomes an ongoing repository for board materials, compliance records, and audit documentation. Companies that maintain evergreen data rooms report 50% faster subsequent fundraises. This is particularly important given that Indian startups raise an average of 4-6 rounds before exit.

Data room timing is critical. Start preparing your data room at least 3 months before active fundraising. This allows time to gather missing documents, clean up historical records, and address any compliance gaps. Rushing data room preparation during live fundraising often leads to errors that can kill deals.

Common data room mistakes by Indian founders include: mixing personal and company documents, incomplete ROC filings, missing board resolutions, unexecuted employee agreements, and poor version control. These issues extend due diligence timelines and create doubt about founder credibility.',
        '["Audit your current documentation state - list all existing documents across corporate, financial, legal, and operational categories", "Research and document investor expectations for your target funding stage - speak with 2-3 founders who recently raised similar rounds", "Create a data room gap analysis comparing your current state to required documents", "Set realistic timeline for data room completion with weekly milestones"]'::jsonb,
        '["Comprehensive Data Room Checklist by Funding Stage (Seed/Series A/B/C)", "Indian VC Due Diligence Expectations Guide with fund-specific requirements", "Data Room Gap Analysis Template with priority scoring", "Data Room Timeline Planner with 12-week preparation schedule"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Platform Selection for Indian Startups
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Platform Selection for Indian Startups',
        'Choosing the right data room platform is a critical early decision that affects security, user experience, and professional perception. The Indian market offers both international platforms and homegrown solutions, each with distinct advantages for different use cases.

International Virtual Data Room (VDR) platforms dominate large transactions. Intralinks (now SS&C) is the gold standard for PE deals and large transactions, costing Rs 50,000-2,00,000+ per deal but offering enterprise-grade security and unlimited storage. Datasite (formerly Merrill DataSite) is preferred by investment banks with similar pricing and features. These are overkill for seed and Series A rounds but become relevant for Series C+ and M&A.

Mid-tier platforms balance features and cost. Ansarada (Rs 25,000-75,000/month) offers AI-powered organization and excellent analytics. DealRoom (Rs 15,000-40,000/month) includes built-in project management. Box (Rs 1,000-3,000/user/month) offers good security with enterprise features. These are appropriate for Series A-B rounds with sophisticated investors.

Budget-friendly options work for early-stage. Google Drive (free with Workspace at Rs 136+/user/month) offers adequate security with proper configuration but lacks professional perception. Notion (Rs 500-1,500/user/month) works for internal organization but has limited external sharing controls. Docsend (Rs 2,000-8,000/month) excels for pitch decks with viewing analytics. Digify (Rs 1,000-3,000/month) is India-based with good features and local support.

Indian-specific considerations matter significantly. Data localization requirements under proposed DPDP Act may favor platforms with Indian data centers. Local support availability is crucial for time-sensitive DD responses. Integration with Indian document formats (Aadhaar, PAN, MCA filings) varies by platform. Some international platforms face UPI payment challenges.

Platform selection criteria should include: Security certifications (SOC 2, ISO 27001), access control granularity (folder, document, page-level), watermarking and download restrictions, activity tracking and analytics, ease of use for non-technical investors, mobile access, and customer support responsiveness.

For most seed to Series B Indian startups, the recommendation is: Start with Google Drive or Notion for internal organization, use Docsend for pitch materials, and migrate to Ansarada or Box for active DD with sophisticated investors.',
        '["Evaluate 5 data room platforms against your requirements using provided scoring matrix", "Request demos or trials from top 3 shortlisted platforms", "Calculate total cost of ownership including setup, monthly fees, and per-user charges for your expected investor volume", "Make platform selection decision and document rationale for team alignment"]'::jsonb,
        '["Data Room Platform Comparison Matrix with 20+ platforms rated on 15 criteria", "Platform Demo Request Template with key questions to ask", "Total Cost Calculator for data room platforms over 12-month period", "Platform Selection Decision Document Template"]'::jsonb,
        75,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Folder Architecture Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Folder Architecture Design',
        'A well-designed folder architecture transforms your data room from a document dump into an investor-friendly experience. Indian VCs process 50-100 investment opportunities monthly, so making your data room easy to navigate gives you a competitive advantage in capturing their limited attention.

The standard data room structure recommended by Indian investment banks follows a numbered hierarchy: 1.0 Corporate Documents, 2.0 Financial Information, 3.0 Legal Documents, 4.0 Business Operations, 5.0 Human Resources, 6.0 Intellectual Property, 7.0 Technology & Product, 8.0 Customers & Sales, 9.0 Marketing & Brand, 10.0 Regulatory & Compliance. Each main folder expands to 5-15 subfolders depending on company maturity.

Naming conventions must be systematic and consistent. Recommended format: [Section Number]-[Document Type]-[Description]-[Date YYYYMMDD]-[Version]. For example: "1.2-COI-Certificate of Incorporation-20230415-v1". Avoid special characters that break across systems. Use consistent date formats (YYYY-MM-DD recommended). Include version numbers on all documents that may be updated.

Document index creation is non-negotiable. Create a master index spreadsheet in the root folder listing every document with: Index number, Document name, Section, Description, Date, Status (current/historical), and Notes. Update this index whenever documents are added. The index serves as a roadmap for investors and shows organizational discipline.

Folder depth balance is important. Too shallow (everything in one folder) makes documents hard to find. Too deep (5+ folder levels) makes navigation frustrating. The sweet spot is 3-4 levels maximum. Use "README" or "START HERE" documents in main folders to guide navigation.

India-specific folder considerations include: Separate folders for MCA filings vs other corporate documents, Dedicated FEMA compliance section for foreign investment, State-specific compliance (professional tax, labor welfare, shop and establishment registrations), and Startup India/DPIIT recognition documents prominently placed.

Version control discipline prevents confusion during live DD. Maintain only current versions in main folders. Archive historical versions in clearly labeled subfolders. Use document comparison tools to highlight changes between versions. Never delete documents during active DD - only add and deprecate.',
        '["Design your complete folder structure with 3-4 hierarchy levels - create visual diagram", "Establish naming convention rules and document them for team reference", "Create master document index template with all required fields", "Set up folder structure in your chosen platform with placeholder documents"]'::jsonb,
        '["Standard Data Room Folder Structure Template with section descriptions", "Document Naming Convention Guide with examples", "Master Document Index Template (Excel/Sheets)", "Folder Structure Visual Template (Draw.io/Miro)"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Access Control & Permissions Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Access Control & Permissions Strategy',
        'Access control in your data room is both a security imperative and a strategic tool. Different stakeholders require different access levels, and managing this properly demonstrates sophisticated governance while protecting sensitive information from inappropriate disclosure.

Stakeholder access tiers should be clearly defined. Level 1 - Executive Summary: Pitch deck, one-pager, high-level metrics. Appropriate for initial outreach and cold intros. Level 2 - Standard Due Diligence: Corporate documents, financials, team information. For investors who have signed NDAs and expressed serious interest. Level 3 - Deep Due Diligence: Customer contracts, employee details, detailed legal documents. For investors in final stages with term sheet discussions. Level 4 - Closing/Exclusive: Sensitive competitive information, detailed cap table modeling. Only for investors with signed term sheets.

Permission granularity matters for compliance. Folder-level permissions work for most cases. Document-level permissions for highly sensitive items (employment contracts, customer names). Page-level permissions for redacting specific information while sharing rest of document. Download restrictions on sensitive documents force in-platform viewing. Print restrictions prevent unauthorized distribution.

Investor group management becomes complex during active fundraising. Create separate user groups for: Lead investor team, Co-investor teams (each separately), Legal advisors, Financial auditors, and Internal team members. This allows quick permission changes across groups and enables group-specific analytics.

Time-based access controls add security layers. Set automatic expiration on access after term sheet deadlines. Revoke access immediately after deal passes or closes. Use view-only access initially, adding download capability as relationship deepens.

Audit trail requirements in India are increasingly important. Track every document view, download, and access attempt. Generate weekly access reports during active fundraising. Maintain audit logs for compliance and potential disputes. Under the DPDP Act framework, data access logging may become mandatory.

Indian investor-specific considerations: Many Indian angels and small VCs are not familiar with sophisticated data room platforms. Provide simple PDF/viewer instructions. WhatsApp/phone support for access issues can differentiate your startup. Some traditional family offices prefer physical document review - be prepared for this request.',
        '["Define 4 access tiers with specific document lists for each tier", "Create user permission matrix mapping stakeholder types to access levels", "Set up access groups in your data room platform with appropriate permissions", "Document access request and approval workflow for your team"]'::jsonb,
        '["Access Tier Definition Template with document mapping", "User Permission Matrix Template", "Access Management Workflow Diagram", "Investor Data Room Onboarding Guide (to share with investors)"]'::jsonb,
        75,
        50,
        3,
        NOW(),
        NOW()
    );

    -- Day 5: Security & Confidentiality Protocols
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        5,
        'Security & Confidentiality Protocols',
        'Data room security protects both your company''s competitive advantages and sensitive information about employees, customers, and business partners. In India''s tight-knit startup ecosystem where investors talk to each other and compete for deals, information leakage can damage your fundraising and business operations.

NDA management is the first security layer. Require signed NDAs before granting data room access beyond Level 1 (executive summary). Use two-way NDAs to protect both parties. Include specific carve-outs for: publicly available information, prior knowledge, and information received from third parties. Set appropriate duration (typically 2-3 years for confidentiality obligations). Consider jurisdiction - Indian law is typically preferred, with arbitration in Mumbai or Delhi.

Document watermarking provides traceability. Dynamic watermarks should include: viewer name, email, access date/time, and company name. Visible watermarks deter casual sharing. Invisible watermarks enable forensic tracking if documents leak. Apply watermarks to all documents except public materials like company website screenshots.

Digital Rights Management (DRM) adds protection layers. Disable printing for sensitive documents during early DD stages. Disable downloading until relationship is established. Enable screen capture blocking on supported platforms (though this is imperfect). Use "self-destruct" features that revoke access to downloaded files.

Secure communication protocols complement data room security. Use encrypted email (ProtonMail, or platform-built messaging) for sensitive discussions. Avoid sharing document links over WhatsApp without password protection. Document all verbal disclosures in writing for audit purposes. Never discuss highly sensitive matters over regular phone calls.

Information barriers within your company are often overlooked. Limit internal access to data room to essential personnel. Brief team members on confidentiality obligations. Document who has access and what they can discuss externally. Update access immediately when employees leave.

Breach response preparation is essential. Document breach notification procedures required under NDAs. Prepare template communications for different breach scenarios. Know your legal recourse under Indian Contract Act and IT Act. Maintain relationship with IP/confidentiality lawyers for rapid response. Consider cyber insurance that covers data breaches.',
        '["Draft or update your standard NDA template with legal counsel review", "Configure watermarking on all data room documents with dynamic fields", "Set up document access restrictions (download, print, copy) by document category", "Document information barrier policies for internal team members"]'::jsonb,
        '["Mutual NDA Template (India-compliant) with customization guide", "Watermark Configuration Guide by platform", "Document Security Settings Checklist", "Information Barrier Policy Template"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 6: Data Room Launch Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        6,
        'Data Room Launch Preparation',
        'Before opening your data room to investors, a systematic quality assurance process ensures professional presentation and prevents embarrassing gaps during live due diligence. This preparation phase typically takes 3-5 days and saves weeks of fire-fighting later.

Pre-launch checklist execution is methodical. Document completeness: Every folder should have at least placeholder documents. Navigation test: Can someone unfamiliar find specific documents within 2 minutes? Mobile access: Test on iOS and Android - many investors review on mobile. Load testing: Ensure documents open quickly; optimize large PDFs.

Document quality review catches common issues. Format consistency: All documents in PDF format for viewing stability. Resolution: Scanned documents must be legible (300 DPI minimum). Completeness: Multi-page documents must have all pages. Currency: Dates on documents should reflect current validity. Signatures: All signed documents must have clear, visible signatures.

Cross-reference validation ensures consistency. Financial figures in pitch deck match audited statements. Employee count in team section matches HR records. Customer numbers in business overview match customer list. Cap table matches shareholder agreements and ROC filings. This validation prevents investor confusion and trust issues.

Internal team briefing prepares everyone for DD interactions. Brief all founders and key team members on data room contents. Assign document owners responsible for questions about their sections. Create FAQ document anticipating common investor questions. Establish response SLA (4-8 hours during active DD) and escalation paths.

Soft launch to friendly investors validates the experience. Invite 2-3 friendly investors or advisors for preview access. Request explicit feedback on navigation, completeness, and presentation. Test the full access request and NDA workflow. Incorporate feedback before wider launch.

Launch communication preparation creates professionalism. Draft access invitation email template with clear instructions. Prepare "How to Navigate Our Data Room" one-pager. Set up support channel (dedicated email or phone) for access issues. Create FAQ document addressing common investor questions about the data room itself.',
        '["Complete pre-launch checklist across all data room sections", "Conduct document quality review and fix identified issues", "Perform cross-reference validation between key documents", "Execute soft launch with 2-3 friendly advisors and incorporate feedback"]'::jsonb,
        '["Pre-Launch Quality Assurance Checklist (100+ items)", "Document Quality Review Standards Guide", "Cross-Reference Validation Matrix", "Data Room Launch Communication Templates"]'::jsonb,
        120,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Corporate Documents (Days 7-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Corporate Documents',
        'Organize and prepare all corporate documentation required by Indian and foreign investors. Master MCA filings, board resolutions, statutory registers, and governance documents.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 7: MCA Incorporation Documents
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'MCA Incorporation Documents',
        'Ministry of Corporate Affairs (MCA) incorporation documents form the foundation of your corporate documentation. These documents establish your company''s legal existence and are scrutinized in every investment transaction. Missing or inconsistent MCA documents are among the top 5 reasons Indian deals fail in due diligence.

Certificate of Incorporation (COI) is your company''s birth certificate. Verify the COI shows correct: Company name, CIN (Corporate Identification Number), Date of incorporation, Registered office state, and PAN (assigned post-2019 incorporations). Download fresh copy from MCA portal to ensure authenticity. Note: COI format changed in 2020 - both old and new formats are valid.

Memorandum of Association (MOA) defines what your company can legally do. Review objects clause to ensure it covers your actual business activities. Main objects should describe core business; ancillary objects support main business. Check subscriber details match current shareholding records. MOA amendments require shareholder approval and ROC filing - ensure all amendments are properly filed.

Articles of Association (AOA) governs internal management. Standard Table F applies unless customized. Key clauses to verify: Share transfer restrictions, Board composition rules, Quorum requirements, ESOP provisions (if any), and Investor protection clauses from previous rounds. Ensure current AOA reflects all amendments from previous investment rounds.

PAN and TAN documentation establishes tax identity. Company PAN card copy (applied during incorporation post-2019). TAN (Tax Deduction Account Number) for TDS compliance. GST registration certificate(s) - may have multiple for different states. GSTIN for each registered state with jurisdiction details.

Registered office documentation proves business location. Current address proof: Lease/rent agreement OR ownership document. NOC from property owner for commercial use. Utility bill (recent, within 2 months). Form INC-22 if address changed post-incorporation.

Name and object change documentation, if applicable. Special resolution approving change, Fresh COI reflecting new name/CIN (CIN changes with name), MOA amendments, Updated PAN card, and Brand trademark registrations (if applicable).',
        '["Download and verify all MCA incorporation documents from MCA21 portal", "Create summary sheet of key incorporation details for quick investor reference", "Identify and document any gaps or inconsistencies in incorporation records", "Organize documents in data room with clear labeling and version information"]'::jsonb,
        '["MCA Document Checklist with download instructions", "Incorporation Summary Template", "Common Incorporation Issues and Remediation Guide", "MCA21 Portal Navigation Guide"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 8: Board & Governance Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Board & Governance Documentation',
        'Board and governance documentation demonstrates your company operates with proper oversight and legal compliance. Indian investors, particularly institutional funds with LP governance requirements, carefully review governance documentation as a proxy for founder maturity and operational discipline.

Board meeting minutes document all major decisions. Indian companies must hold minimum 4 board meetings per year (gap not exceeding 120 days). Minutes should include: Date, time, venue (physical or video), Attendees with quorum confirmation, Agenda items and discussions, Resolutions passed with voting record, and Director signatures. Historical minutes from incorporation to present must be complete - gaps raise red flags.

Board resolutions are binding decisions. Maintain signed copies of all resolutions including: Appointment/resignation of directors, Bank account operations, Borrowings and investments, Share allotments, ESOP grants, Major contracts above threshold, and Related party transactions. Circular resolutions (without meeting) are valid but must follow proper procedure.

Director documentation establishes director identity and eligibility. For each current and past director: DIR-3 KYC compliance status, DIN (Director Identification Number), Appointment letter, Consent to act (Form DIR-2), Declaration of non-disqualification (Form DIR-8), and Resignation letter (if applicable).

Committee documentation, if applicable, shows governance maturity. Audit Committee (mandatory if applicable): composition, charter, meeting minutes. Nomination and Remuneration Committee: policies and meeting records. CSR Committee (if turnover/net worth threshold crossed): CSR policy and reports.

Statutory registers must be current and complete. Register of Members (Form MGT-1): All shareholders with shareholding history. Register of Directors and KMP (Form MBP-1): Current and past directors. Register of Charges: All secured borrowings. Register of Contracts with Related Parties (Form MBP-4): All related party transactions.

Annual compliance documents demonstrate ongoing compliance. Annual Returns (Form MGT-7/MGT-7A): Filed within 60 days of AGM. AGM notices and minutes: Attendance, resolutions, director reports. Financial statements filed with ROC: Balance sheet, P&L, notes. Director''s Report with required disclosures.',
        '["Compile all board meeting minutes from incorporation to present", "Create board resolution register with summary of all resolutions passed", "Gather complete director documentation for all current and former directors", "Update and verify all statutory registers are current"]'::jsonb,
        '["Board Minutes Template with required elements", "Board Resolution Register Template", "Director Documentation Checklist", "Statutory Register Update Guide"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 9: Startup India & DPIIT Recognition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        9,
        'Startup India & DPIIT Recognition',
        'DPIIT (Department for Promotion of Industry and Internal Trade) recognition provides significant benefits and serves as a credibility signal to investors. As of 2024, over 1.12 lakh startups are DPIIT-recognized. While not mandatory for fundraising, recognition demonstrates legitimacy and unlocks valuable benefits.

DPIIT recognition criteria define eligibility. Your company must be: Incorporated as Private Limited, LLP, or Partnership (not sole proprietorship), Less than 10 years from incorporation date, Annual turnover below Rs 100 crore in any financial year, Working towards innovation or improvement of products/services/processes, and Not formed by splitting or restructuring existing business.

Recognition benefits provide tangible value. Tax benefits: 3-year tax holiday under Section 80-IAC (must apply separately). Compliance simplification: Self-certification for 6 labor laws and 3 environmental laws. IPR benefits: 80% rebate on patent filing fees, 50% rebate on trademark fees, fast-track examination. Funding access: Fund of Funds eligibility, easier bank lending. Government procurement: Exemption from prior turnover/experience requirements on GeM.

Application process is straightforward. Register on Startup India portal (startupindia.gov.in), Fill application with company and business details, Upload: Incorporation certificate, Brief description of business (innovation focus), and Director/Partner details. Recognition typically granted within 3-7 working days.

Post-recognition documentation to maintain includes: Recognition certificate with unique recognition number, Tax exemption application (Form 1 to DPIIT, Form 2 to CBDT if approved), Self-certification forms used, and Annual information update submissions.

For investors, DPIIT recognition signals: Regulatory compliance awareness, Innovation-focused business model, Eligibility for government incentives that reduce burn, and Startup identity (vs lifestyle business).

Common issues to address before applying: Business description must emphasize innovation/scalability (not just a business), Ensure company is not a holding company of another business, Related party structures may complicate recognition, and Prior recognition of founders'' other entities may affect eligibility.',
        '["Check DPIIT recognition eligibility using provided criteria checklist", "If eligible, complete Startup India registration and submit application", "If already recognized, gather and organize all recognition documentation", "Create summary document of recognition status and benefits utilized"]'::jsonb,
        '["DPIIT Recognition Eligibility Checklist", "Application Process Step-by-Step Guide", "Recognition Documentation Organizer", "Benefits Utilization Tracker"]'::jsonb,
        60,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 10: Previous Investment Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        10,
        'Previous Investment Documentation',
        'For startups that have raised previous rounds, investment documentation is intensely scrutinized. New investors need to understand existing rights, restrictions, and obligations before investing. Incomplete or inconsistent investment documentation is among the most common causes of deal delays in Indian fundraising.

Term sheets from all previous rounds document deal terms. Even non-binding term sheets provide context for final agreements. Highlight key economic terms: valuation, round size, major investors. Note any terms that didn''t make it to final agreements (shows negotiation history).

Share Subscription Agreements (SSA) govern share purchases. For each round: SSA with all schedules and annexures, Representations and warranties given, Conditions precedent (and evidence of satisfaction), and Closing documents (board resolutions, share certificates).

Shareholders'' Agreements (SHA) create ongoing obligations. Current SHA in effect (typically most recent round''s SHA supersedes earlier ones). Key sections investors focus on: Protective provisions (what requires investor approval), Information rights (reporting obligations), Board composition rights, Anti-dilution provisions, Liquidation preferences, and Exit rights (drag-along, tag-along, ROFR).

Convertible instruments require special attention. Convertible notes: Principal, interest rate, maturity, conversion triggers, valuation cap, discount. SAFEs (Simple Agreement for Future Equity): Popular in India now, note conversion mechanics. CCPS (Compulsorily Convertible Preference Shares): Conversion ratio, trigger events. Outstanding convertible instruments affect fully-diluted cap table.

Rights created by previous investments include: Board seats and observer rights, Veto rights on specific matters (fundraising, M&A, key hires), Information and audit rights, Participation rights in future rounds, and Exit-related rights.

Amendments and waivers to previous agreements must be documented. Any modifications to original agreements, Waivers granted (e.g., anti-dilution waiver in subsequent round), and Consents obtained for specific transactions.

Side letters, if any, contain additional investor-specific terms. Some investors negotiate additional rights via side letters. These must be disclosed to new investors. Common side letter items: MFN (most favored nation) provisions, Additional information rights, and Board observer rights.',
        '["Compile all term sheets, SSAs, and SHAs from previous investment rounds", "Create summary document of all investor rights and obligations currently in effect", "Document all convertible instruments with conversion mechanics", "Identify any outstanding investor consents or waivers needed for new round"]'::jsonb,
        '["Investment Documentation Checklist by Round Type", "Investor Rights Summary Template", "Convertible Instrument Tracker", "Consent and Waiver Register"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 11: ROC Filings & Compliance Records
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        11,
        'ROC Filings & Compliance Records',
        'Registrar of Companies (ROC) filings create the public record of your company''s existence and major events. Investors and their legal counsel verify data room documents against ROC records. Discrepancies between your documents and ROC filings can derail deals or require costly remediation.

Annual filing compliance demonstrates ongoing operation. Form AOC-4: Financial statements filing (within 30 days of AGM). Form MGT-7/MGT-7A: Annual return (within 60 days of AGM). Form ADT-1: Appointment of auditor (within 15 days of AGM). These forms create the compliance track record investors expect.

Event-based filings document major corporate events. Share-related: PAS-3 (allotment within 30 days), SH-7 (increase in authorized capital), MGT-14 (special resolutions). Director-related: DIR-12 (appointment/resignation within 30 days), Form DIR-3 KYC (annual). Charge-related: CHG-1 (creation within 30 days), CHG-4 (modification/satisfaction). Address-related: INC-22 (registered office change).

Master data verification on MCA portal is essential. Download your company''s master data from MCA21 portal. Verify: Company status (active), Authorized capital, Paid-up capital, Director list, Registered office address, and Latest filing dates. Any discrepancies require immediate rectification.

Common ROC compliance issues include: Delayed filings with penalties, Incorrect share allotment filings, Missing director appointment filings, Charge registration gaps, and DIN KYC defaults. These issues require compounding applications or rectification filings.

Filing timeline tracker ensures ongoing compliance. Create calendar with: All statutory due dates, Filing completion dates, Acknowledgment numbers, and Follow-up required (if any). Delayed filings attract penalties: Rs 100/day for most forms, and some violations attract disqualification risks.

For foreign investors, certain ROC filings are scrutinized more closely. FC-GPR and FC-TRS filings (foreign investment reporting), Sectoral cap compliance evidence, and FIPB/government approval documents (if applicable for your sector).',
        '["Download and review company master data from MCA21 portal", "Create comprehensive list of all ROC filings made since incorporation", "Identify any filing gaps or discrepancies requiring remediation", "Set up compliance calendar for ongoing filing requirements"]'::jsonb,
        '["ROC Filing Checklist by Event Type", "MCA21 Master Data Verification Guide", "Compliance Gap Remediation Guide", "ROC Compliance Calendar Template"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 12: Corporate Document Quality Assurance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        12,
        'Corporate Document Quality Assurance',
        'Before moving to financial documentation, conduct a comprehensive quality assurance review of all corporate documents. This review catches inconsistencies, gaps, and formatting issues that would otherwise surface during investor due diligence - when fixing them becomes much more difficult.

Document authenticity verification ensures originals exist. For all critical documents: Do you have originals (or certified copies)? Are originals stored securely (bank locker or fireproof safe)? Can you produce originals if requested during DD? For ROC filings: Can you download fresh copies from MCA21? For bank documents: Can you get certified copies from bank?

Signature verification catches execution issues. Are all documents that require signatures properly signed? Are signatures legible and from authorized persons? Do signature dates match resolution dates authorizing execution? For multi-party agreements: Do all parties'' signatures exist?

Cross-document consistency review is critical. Shareholder names match across: MOA subscriber pages, Share certificates, SHA schedules, ROC filings. Director names match across: Board resolutions, MCA filings, Bank authorizations. Company details match across all documents: Correct CIN, Correct registered address, Correct company name (exact spelling).

Completeness review against checklist ensures nothing is missing. Review against comprehensive corporate document checklist. For each required document: Present (Y/N), Current (Y/N), Quality acceptable (Y/N). Create remediation plan for any gaps.

Document currency assessment identifies outdated items. Are all documents current or appropriately marked as historical? Do you have latest versions of: AOA (with all amendments), SHA (most recent round), Board composition, Authorized signatories. Historical documents should be clearly labeled with date range.

Remediation planning addresses identified issues. Categorize issues by: Criticality (deal-breaker, moderate, minor), Remediation effort (simple, moderate, complex), Cost (legal fees, filing fees, penalties). Prioritize high-criticality, simple-remediation items first. Engage legal counsel for complex remediation.',
        '["Conduct document authenticity verification for all critical documents", "Perform signature verification on all signed documents", "Complete cross-document consistency review", "Create remediation plan for identified issues with timeline and ownership"]'::jsonb,
        '["Document Authenticity Verification Checklist", "Signature Verification Guide", "Cross-Document Consistency Matrix", "Remediation Planning Template with Priority Framework"]'::jsonb,
        120,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: Financial Documentation (Days 13-18)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Financial Documentation',
        'Prepare comprehensive financial documentation that meets investor expectations. Master financial statement preparation, model building, unit economics, and tax compliance records.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 13: Audited Financial Statements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        13,
        'Audited Financial Statements',
        'Audited financial statements form the bedrock of financial due diligence. In India, all private limited companies must have their accounts audited annually by a practicing Chartered Accountant. The quality and consistency of your audited financials significantly impact investor confidence.

Audit requirements for Indian startups include: Statutory audit by practicing CA or CA firm, Compliance with applicable accounting standards (Ind AS for larger companies, or Indian GAAP), CARO 2020 reporting (Companies Auditor''s Report Order), and Directors'' Responsibility Statement.

Required financial statements include: Balance Sheet, Statement of Profit and Loss, Cash Flow Statement (if applicable), Statement of Changes in Equity (Ind AS), and Notes to Accounts with accounting policies.

Historical financial compilation for data room should include all years from incorporation. For each financial year: Audited financial statements (signed copy), Auditor''s report (independent auditor''s report), Board''s report, and ROC filing acknowledgment (Form AOC-4).

Audit quality signals matter to sophisticated investors. Clean audit report (unqualified opinion) is ideal. Emphasis of Matter paragraphs - understand and be prepared to explain. Qualified opinions are red flags - must be addressed before fundraising. Material weaknesses in internal controls require remediation.

Management accounts bridge audit year-ends to current date. Monthly or quarterly MIS for current period (post last audit). Should reconcile with audited numbers at year-end. Include: Revenue, gross margin, EBITDA, cash position, and key KPIs. Professional investors expect MIS within 15-20 days of month-end.

Pro forma adjustments may be needed for: One-time or extraordinary items, Related party transaction normalizations, Pre-operational expenses, and Accounting policy changes. Document all adjustments clearly with supporting rationale.

Auditor selection and relationship matters. Big 4 or top mid-tier auditors (Grant Thornton, BDO, RSM) increase credibility for larger rounds. Ensure auditor is independent (no related party issues). Audit fees should be reasonable (Rs 50,000-5,00,000 depending on complexity). Get auditor consent for sharing audit reports with investors.',
        '["Compile all audited financial statements from incorporation to present", "Review auditor reports for any qualifications or emphasis of matter", "Prepare management accounts for current period with reconciliation to last audit", "Create financial summary showing year-over-year trends"]'::jsonb,
        '["Audited Financial Statements Checklist", "Audit Report Analysis Guide (Understanding Qualifications)", "Management Accounts Template", "Financial Year-over-Year Trend Analysis Template"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: Financial Model Building
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        14,
        'Financial Model Building',
        'A robust financial model demonstrates your understanding of business economics and planning capability. Indian VCs spend significant time in your financial model testing assumptions and scenarios. A well-built model can accelerate deal closure; a poor model raises questions about founder capability.

Financial model structure for Indian startups should include: Cover sheet with version control and scenario toggle, Assumptions sheet with clearly labeled inputs, Revenue build-up from unit economics, Expense breakdown by category and department, P&L statement (monthly for 2 years, quarterly/annual for years 3-5), Balance sheet projections, Cash flow statement, and Key metrics dashboard.

Revenue modeling must be bottoms-up and defensible. For SaaS: # of leads × conversion rate × ARPU × retention, For marketplace: GMV × take rate, For D2C: # customers × average order value × purchase frequency, For B2B services: # of clients × contract value. Avoid top-down models ("We''ll capture 1% of Rs X crore market") - investors see through these immediately.

Expense modeling should reflect Indian cost structures. Team costs: Include salary + benefits + ESOPs at realistic Indian rates, Plan hiring timeline aligned with revenue milestones. Infrastructure: Indian server costs (AWS Mumbai pricing), Office space at realistic city rates (Rs 50-150/sq ft in metros). Marketing: CAC assumptions based on channel benchmarks for India.

Key metrics to model and track include: Gross margin and contribution margin, Customer Acquisition Cost (CAC) and payback period, Lifetime Value (LTV) and LTV:CAC ratio, Burn rate and runway, Revenue growth rate and retention, and Breakeven timeline.

Scenario planning demonstrates risk awareness. Base case: Your expected outcome, Upside case: Things go better than expected, and Downside case: Things go worse (what if growth is 50% of base?). Show key assumption sensitivities: What happens if CAC increases 30%? What if retention drops 10%?

Model quality signals include: Formulas reference assumptions (no hardcoded numbers), Consistent time periods and date references, Error checks built in (balance sheet balances, cash reconciles), Clear documentation of methodology, and Version control with change log.

Common modeling mistakes to avoid: Hockey stick growth without driver justification, Expense growth lagging revenue growth unrealistically, Ignoring working capital requirements, Overoptimistic hiring timelines, and Underestimating regulatory/compliance costs.',
        '["Build or update your financial model with complete 3-5 year projections", "Document all key assumptions with data sources and rationale", "Create scenario analysis with base, upside, and downside cases", "Add sensitivity analysis for top 5 critical assumptions"]'::jsonb,
        '["Financial Model Template for Indian Startups (Excel/Sheets)", "Revenue Model Building Guide by Business Type", "Indian Cost Structure Benchmarks (Salaries, Rent, Marketing)", "Scenario and Sensitivity Analysis Guide"]'::jsonb,
        180,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Unit Economics Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        15,
        'Unit Economics Deep Dive',
        'Unit economics - the direct revenues and costs associated with a single unit of your business - is the foundation investors use to evaluate business viability. In the post-2022 environment where profitability matters, Indian VCs intensely scrutinize unit economics before investing.

Unit definition varies by business model. For SaaS: One customer account, For marketplace: One transaction, For D2C: One customer, For B2B services: One client or one project, For subscription: One subscription. Choose the unit that best represents your value creation cycle.

Customer Acquisition Cost (CAC) calculation is critical. CAC = (Sales & Marketing Expenses) / (New Customers Acquired). Include in numerator: Advertising spend (all channels), Marketing team salaries, Sales team salaries (if applicable), Marketing tools and software, and Content creation costs. Time period: Calculate monthly, quarterly, and annual CAC. Payback period: Months to recover CAC from gross profit.

Lifetime Value (LTV) estimation requires retention data. LTV = (Average Revenue Per User × Gross Margin %) / Churn Rate, Or: LTV = ARPU × Gross Margin × Average Customer Lifespan. For early-stage with limited data: Use cohort analysis with available months and extrapolate conservatively. Show methodology transparently - investors appreciate honesty about data limitations.

LTV:CAC ratio benchmarks for Indian startups. Healthy SaaS: LTV:CAC > 3:1 with payback < 12 months. Marketplace: LTV:CAC > 2:1 (lower margin business). D2C: LTV:CAC > 3:1 with payback < 6 months (higher churn). B2B: LTV:CAC > 5:1 acceptable with longer payback.

Contribution margin analysis shows path to profitability. Revenue per unit minus Variable costs per unit = Contribution margin. Variable costs include: COGS, Payment gateway fees (2-3% for Razorpay), Shipping/delivery costs, and Customer success costs (if variable). Fixed costs are excluded from unit economics.

Cohort analysis demonstrates improvement over time. Track cohorts by acquisition month. Show: Revenue retention, Logo retention, Expansion revenue, and Unit economics by cohort. Improving cohorts signal product-market fit; deteriorating cohorts are red flags.

India-specific unit economics considerations include: Payment failure rates (5-15% in India) affect conversion, COD (cash on delivery) costs for D2C (1-3% of order value), GST impact on margins (18% on services), and Regional variations in CAC and LTV across metros vs tier 2/3.',
        '["Calculate complete CAC breakdown by channel with methodology documentation", "Build LTV model with cohort analysis where data permits", "Compute contribution margin for your business unit", "Create unit economics dashboard showing trends over time"]'::jsonb,
        '["CAC Calculation Template with Channel Attribution", "LTV Calculation Model with Cohort Analysis", "Contribution Margin Calculator", "Unit Economics Dashboard Template"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Revenue & Growth Metrics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        16,
        'Revenue & Growth Metrics',
        'Revenue and growth metrics tell the story of your business trajectory. How you present these metrics - with appropriate segmentation, trend analysis, and honest acknowledgment of challenges - demonstrates analytical maturity to investors.

Revenue breakdown by segment provides clarity. By product/service line: Show contribution of each product to total revenue. By customer segment: Enterprise vs SMB vs Consumer, or by industry vertical. By geography: Metros vs Tier 2/3, or by state if regionally concentrated. By contract type: Subscription vs transactional, recurring vs one-time.

Growth rate calculations must be consistent. Month-over-Month (MoM): (Current Month - Previous Month) / Previous Month. Use for early-stage, high-growth companies. Quarter-over-Quarter (QoQ): Better for showing trends, reducing monthly noise. Year-over-Year (YoY): Required for companies with seasonal patterns. CAGR: For multi-year growth story.

SaaS-specific metrics if applicable include: Monthly Recurring Revenue (MRR) and breakdown by New, Expansion, Contraction, Churned. Annual Recurring Revenue (ARR) for enterprise SaaS. Net Revenue Retention (NRR): Should be >100% for healthy SaaS. Gross Revenue Retention (GRR): Shows true customer retention.

Marketplace and transaction metrics include: Gross Merchandise Value (GMV), Net revenue (GMV × take rate), Take rate trends, Transaction volume and average order value, and Buyer and seller metrics separately.

D2C and retail metrics include: Gross revenue vs net revenue (after returns), Average Order Value (AOV), Orders per customer, Repeat purchase rate, and Return/refund rate.

Growth quality analysis matters beyond headline numbers. Revenue quality: Recurring vs non-recurring, Contractual vs transactional. Customer concentration: Revenue from top 10 customers (>30% is risky). Cohort revenue trends: Are new cohorts performing better or worse? Seasonality: Explain cyclical patterns if present.

Chart and visualization standards for data room: Use consistent date ranges across all charts. Show absolute numbers AND growth rates. Include trend lines where meaningful. Highlight inflection points with annotations. Monthly granularity for last 2 years, quarterly before that.',
        '["Create revenue breakdown by product, segment, geography, and contract type", "Calculate and document growth rates (MoM, QoQ, YoY) for all key metrics", "Build customer concentration analysis showing top customer revenue share", "Create investor-ready revenue dashboard with visualizations"]'::jsonb,
        '["Revenue Segmentation Analysis Template", "Growth Rate Calculator with Multiple Time Periods", "Customer Concentration Analysis Tool", "Revenue Dashboard Template with Charts"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 17: Tax & GST Compliance Records
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        17,
        'Tax & GST Compliance Records',
        'Tax compliance documentation is scrutinized heavily in Indian startup due diligence. Tax liabilities can become investor liabilities post-investment, so investors verify compliance carefully. Clean tax records also indicate operational discipline and proper financial management.

Income Tax compliance documentation includes: All ITRs (Income Tax Returns) filed since incorporation. Tax computation sheets for each year. Advance tax challans (quarterly payments). Assessment orders, if any (scrutiny assessments completed). Pending assessment notices and status. Tax audit reports (if turnover exceeds Rs 1 crore).

GST compliance records are extensive. GSTIN registration certificate(s) for each state. Monthly returns: GSTR-1 (outward supplies), GSTR-3B (summary return). Annual returns: GSTR-9 and GSTR-9C (reconciliation). E-way bills for goods movement (if applicable). Input Tax Credit (ITC) reconciliation with books.

TDS (Tax Deducted at Source) compliance demonstrates payroll and vendor discipline. TDS returns: Form 24Q (salaries), Form 26Q (non-salary payments). TDS certificates issued: Form 16 (employees), Form 16A (vendors). TDS payment challans matching return filings.

Other tax compliance documentation: Professional Tax registration and returns (state-specific). Provident Fund (PF) and ESI returns. Labour Welfare Fund contributions. Property/rental TDS if applicable.

Tax planning and incentives documentation: Startup India Section 80-IAC tax holiday application and approval. R&D tax deduction claims under Section 35. SEZ benefits documentation if applicable. Any advance rulings obtained.

Tax litigation and contingencies require special attention. List all pending tax disputes with status and potential liability. Assessment orders under appeal with tribunal/court status. Provisions made in books for contingent tax liabilities. Legal opinions on significant tax positions taken.

Common tax compliance issues in Indian startups include: GST ITC mismatches requiring reconciliation, TDS deposit delays attracting interest, Incorrect HSN/SAC code classifications, Intercompany transaction documentation gaps, and Transfer pricing documentation gaps (if international entities exist).',
        '["Compile all income tax returns and assessment records from incorporation", "Gather complete GST compliance records (returns, reconciliations, ITC ledger)", "Document TDS compliance with return filing and payment evidence", "Create tax compliance status summary with any pending issues highlighted"]'::jsonb,
        '["Income Tax Compliance Checklist", "GST Compliance Documentation List", "TDS Compliance Verification Template", "Tax Compliance Summary Dashboard"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 18: Financial Due Diligence Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        18,
        'Financial Due Diligence Preparation',
        'Financial due diligence is often the most time-intensive part of the investment process. Sophisticated investors engage Big 4 or top accounting firms for FDD, and these teams have standardized checklists covering 200+ items. Preparing for this scrutiny in advance dramatically reduces deal timeline and stress.

Standard FDD scope covers several areas. Quality of Earnings (QoE): Analysis of revenue recognition, expense classification, normalizing adjustments. Working capital: Analysis of receivables, payables, inventory trends. Related party transactions: Identification and arms-length validation. Off-balance sheet items: Contingencies, commitments, guarantees. Accounting policy assessment: Consistency and appropriateness.

Pre-FDD preparation checklist includes: Reconcile all bank accounts to books, Clear aged receivables or provide explanations, Reconcile GST liability per books vs GST portal, Reconcile TDS payable per books vs traces portal, Document all related party transactions with pricing rationale, and Prepare list of contingent liabilities with assessment.

Common FDD red flags to address proactively: Revenue recognition issues (recognizing revenue before delivery), Expense capitalization concerns (capitalizing what should be expensed), Related party transactions at non-market rates, Unusual year-end adjustments, Significant manual journal entries, and Weak segregation of duties.

Management representation letter preparation: Understand what representations you''ll need to make. Common representations include: Books are accurate and complete, All liabilities are recorded, No fraud or illegal acts, Related party transactions disclosed, and Going concern confirmation.

Creating a financial data room tour document helps FDD teams. One-page guide to financial documentation organization. Summary of accounting policies. List of significant estimates and judgments. Known issues and remediation status. Contact person for financial questions.

Anticipating questions and preparing answers: Why did revenue grow/decline in specific periods? Explain major expense categories and trends. Justify working capital fluctuations. Explain any restatements or audit adjustments. Document customer acquisition cost and payback trends.',
        '["Complete pre-FDD reconciliation checklist (bank, GST, TDS, receivables)", "Identify and document all related party transactions with pricing justification", "Prepare list of contingent liabilities with legal assessment", "Create FDD preparation summary document anticipating key questions"]'::jsonb,
        '["Pre-FDD Reconciliation Checklist", "Related Party Transaction Documentation Template", "Contingent Liability Register", "FDD Preparation Guide with Common Questions"]'::jsonb,
        120,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Legal & Compliance Records (Days 19-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Legal & Compliance Records',
        'Organize all legal documents and compliance records required for investor due diligence. Cover material contracts, employment documentation, IP records, and regulatory compliance.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 19: Material Contracts Compilation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        19,
        'Material Contracts Compilation',
        'Material contracts define your business relationships and obligations. Investors review these to understand revenue concentration, supply dependencies, competitive restrictions, and potential liabilities. A comprehensive contract compilation reveals business maturity and risk profile.

Defining "material" contracts for your business: Value threshold: Typically contracts above Rs 10-25 lakh annual value, or top 10 by value. Strategic importance: Contracts critical to operations regardless of value. Term length: Long-term commitments (>1 year) are generally material. Rights granted: Exclusive arrangements, IP licenses, non-competes. Liability exposure: Contracts with significant penalty or indemnity clauses.

Customer contracts compilation should include: Master Service Agreements (MSAs) with top 10-20 customers. Individual Statements of Work (SOWs) or Order Forms. Subscription agreements (for SaaS). Revenue share or commission agreements. Service Level Agreements (SLAs) with penalty provisions.

Vendor contracts compilation should include: Technology and infrastructure contracts (AWS, Google Cloud, etc.). Critical service providers (payment gateway, logistics, etc.). Outsourcing agreements (development, customer support, etc.). Equipment leases. Office lease agreements.

Partnership and channel contracts include: Reseller or distribution agreements. API partnerships and data sharing agreements. Co-marketing agreements. Referral arrangements. White-label or OEM agreements.

For each material contract, create a summary covering: Parties and execution date. Term and renewal provisions. Key commercial terms (pricing, volume commitments). Termination provisions and notice periods. Change of control provisions (critical for M&A). Exclusivity or non-compete restrictions. Confidentiality obligations. Liability caps and indemnities. Governing law and dispute resolution.

Contract organization in data room: Folder by contract category (customer, vendor, partnership). Include executed copy AND summary sheet for each contract. Highlight contracts expiring within 12 months. Flag contracts with change of control provisions.',
        '["Identify all material contracts using defined criteria", "Gather executed copies of all material contracts", "Create contract summary sheet for each material contract", "Organize contracts in data room by category with index"]'::jsonb,
        '["Material Contract Identification Criteria Template", "Contract Summary Sheet Template", "Contract Index Template", "Contract Key Terms Extraction Guide"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 20: Customer & Revenue Contracts
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        20,
        'Customer & Revenue Contracts',
        'Customer contracts directly support revenue figures and are scrutinized to validate revenue claims, understand business model sustainability, and assess customer risk concentration. Investors often sample verify contracts against reported revenue.

Customer contract types vary by business model. SaaS/Subscription: Subscription agreements, order forms, MSAs. Marketplace: Terms of service, merchant agreements. B2B Services: Service agreements, project contracts, retainers. D2C: Usually standard terms and conditions (no individual contracts).

Top customer contract deep dive is essential. For your top 10 customers by revenue: Complete contract stack (MSA + all addendums/SOWs). Revenue history (to validate contract vs actual revenue). Payment history (any collection issues?). Contract status (active, renewing, churned). Key contact and relationship strength.

Contract verification against revenue ensures consistency. Sample verify: Contract value × time = reported revenue. Check for any revenue recognized before contract execution. Verify revenue recognition timing matches delivery milestones. Document any discrepancies with explanation.

Customer contract risk assessment covers several areas. Concentration risk: % revenue from top customer (>20% is risky), % revenue from top 5 customers (>50% is concerning). Renewal risk: Contracts expiring within 12 months without renewal commitment. Payment risk: Customers with payment delays or disputes. Termination risk: Customers with termination notice or at-risk relationships.

Standard contract terms analysis: Payment terms: Net 30/45/60/90 - affects working capital. Auto-renewal provisions: Important for revenue predictability. Termination for convenience: What notice is required? Price escalation clauses: Annual increases built in? Penalty provisions: SLA penalties, early termination fees. Exclusivity: Any exclusive arrangements limiting other opportunities?

Customer reference readiness preparation: Identify 5-10 customers willing to serve as references. Brief them on potential investor reference calls. Prepare talking points they can use. Ensure contracts allow reference communication.',
        '["Compile complete contract documentation for top 10 customers", "Verify contract values against revenue records for top 20 customers", "Create customer contract risk assessment summary", "Prepare customer reference list with briefing materials"]'::jsonb,
        '["Customer Contract Compilation Checklist", "Contract-Revenue Reconciliation Template", "Customer Risk Assessment Matrix", "Reference Customer Briefing Guide"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 21: Employment & HR Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        21,
        'Employment & HR Documentation',
        'Employment documentation reveals company culture, retention capability, and compliance maturity. Indian labor law compliance is complex and varies by state, making this area a common source of due diligence findings. Well-organized HR documentation signals operational excellence.

Employment contract coverage is foundational. All employees should have written employment agreements. Key clauses investors verify: Job description and reporting structure, Compensation and benefits, Notice period and termination terms, Non-disclosure obligations, Assignment of inventions/IP, Non-compete and non-solicit (enforceability varies by state), and Dispute resolution.

Offer letters and appointment letters differ. Offer letter: Pre-joining, conditional. Appointment letter: Post-joining, confirms employment. Both should be present for each employee. Verify offer terms match appointment terms.

Employee register and records include: Complete employee list with joining dates, designations, compensation. Resignation and termination records with exit documentation. Full and final settlement records. Employee personal files (KYC, background verification).

ESOP documentation requires special attention. ESOP scheme document approved by shareholders. Individual ESOP grant letters. Vesting schedules and exercise records. ESOP pool utilization summary. Tax treatment documentation (perquisite valuation).

Statutory compliance documentation: Provident Fund: Registration, monthly contributions (form 12A), annual returns. ESI: Registration (if applicable), monthly contributions, returns. Professional Tax: State-specific registration and payments. Gratuity: Provision calculation, insurance (if trust not formed). Labour Welfare Fund: State-specific contributions.

Policy documentation shows HR maturity. Leave policy and leave records. Code of conduct. Anti-harassment policy (POSH compliance). Work from home/remote work policy. Data protection and confidentiality policy. Performance management documentation.

Contractor vs employee classification is scrutinized. Independent contractor agreements. Verification of contractor classification (substance over form). No misclassification of employees as contractors (common compliance risk).',
        '["Compile employment agreements for all employees with verification against HR records", "Gather complete ESOP documentation including scheme and individual grants", "Document statutory compliance status (PF, ESI, PT, Gratuity)", "Organize all HR policies and verify they are current and communicated"]'::jsonb,
        '["Employment Agreement Checklist", "ESOP Documentation Organizer", "Statutory Compliance Status Template", "HR Policy Inventory Template"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 22: Intellectual Property Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        22,
        'Intellectual Property Documentation',
        'Intellectual property documentation establishes what the company owns and how it''s protected. For tech startups especially, IP often represents significant enterprise value. Investors verify that IP is properly assigned to the company and adequately protected.

IP assignment to company is critical. All IP created by founders must be assigned to the company. Technology Assignment Agreement from each founder. Employment agreements with IP assignment clauses. Contractor agreements with work-for-hire and IP assignment provisions. Verify no IP was created before incorporation that remains with founders.

Trademark documentation protects brand. Trademark registrations (domestic and international). Trademark applications pending. Opposition proceedings if any. Domain name registrations. Brand guidelines and usage policies.

Patent documentation protects innovations. Patent applications filed (Indian and international). Patents granted with certificates. Patent search reports showing freedom to operate. Invention disclosure records. Inventor assignment agreements.

Copyright documentation covers creative works. Software copyright registrations (optional but valuable). Content copyrights. User-generated content licensing. Open source software usage audit.

Trade secret protection processes: Confidentiality agreements with all employees and contractors. Information security policies. Physical and digital access controls. Exit interview protocols for departing employees.

Third-party IP licenses documentation: All software licenses (commercial and open source). Content licenses. Technology licenses. API usage agreements. Data licenses.

IP due diligence common issues: Founder IP not assigned to company. Pre-incorporation IP ownership unclear. Open source license compliance issues (GPL contamination). Missing contractor IP assignments. Expired domain registrations. Trademark conflicts not resolved.',
        '["Compile all IP assignments from founders, employees, and contractors", "Gather trademark and patent documentation with current status", "Audit third-party IP licenses including open source compliance", "Create IP portfolio summary with protection status"]'::jsonb,
        '["IP Assignment Verification Checklist", "Trademark and Patent Registry Template", "Open Source License Audit Guide", "IP Portfolio Summary Template"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 23: Regulatory & Sector Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        23,
        'Regulatory & Sector Compliance',
        'Regulatory compliance requirements vary significantly by sector and business model. Indian investors are increasingly sophisticated about regulatory risks, particularly in sectors like fintech, healthtech, and edtech where regulations are evolving rapidly. Demonstrating regulatory awareness and compliance is a key differentiator.

General business registrations applicable to most startups: Shop and Establishment Act registration (state-specific). Professional Tax registration (state-specific). Trade License from local municipal corporation. Fire safety certificate for office premises. Signage permissions if applicable.

Sector-specific compliance varies significantly. Fintech: RBI registrations (PA/PG, NBFC, prepaid instruments). Healthtech: CDSCO licenses, clinical establishment registration, ABDM integration. Edtech: UGC/AICTE approvals for degree-granting, professional certifications. E-commerce: Consumer Protection Act compliance, FDI policy compliance. Food tech: FSSAI license (central or state based on turnover).

Data protection and privacy compliance: IT Act 2000 compliance (reasonable security practices). SPDI Rules compliance (if handling sensitive personal data). Upcoming DPDP Act preparation. GDPR compliance (if serving EU customers). Industry-specific data regulations (RBI data localization for payment data).

Environmental and safety compliance if applicable: Pollution control board consents (for manufacturing). Hazardous waste authorization. Environment clearances for certain activities.

Foreign exchange compliance (FEMA): FC-GPR filings for foreign investment received. FC-TRS for share transfers involving foreign parties. Annual Return on Foreign Liabilities and Assets (FLA). ODI filings for overseas investments. External Commercial Borrowing compliance if loans from abroad.

Licensing and permit register creation: List all licenses, permits, and registrations. Document: License name, Issuing authority, License number, Issue date and validity, Renewal requirements, and Compliance status. Flag any licenses expiring within 12 months or requiring renewal action.',
        '["Identify all regulatory requirements applicable to your business and sector", "Compile all licenses, permits, and registrations with validity status", "Document data protection compliance measures", "Create regulatory compliance status summary for data room"]'::jsonb,
        '["Regulatory Requirement Identifier by Sector", "License and Permit Register Template", "Data Protection Compliance Checklist", "FEMA Compliance Documentation Guide"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 24: Litigation & Dispute Records
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        24,
        'Litigation & Dispute Records',
        'Litigation and dispute disclosure is a legal requirement in investment transactions. Failure to disclose material disputes can lead to deal termination or post-closing claims. A transparent and well-documented approach to disputes actually builds investor confidence rather than undermining it.

Litigation register creation must be comprehensive. Document all pending litigation as plaintiff or defendant. Include: Court/forum and case number, Parties involved, Nature of dispute, Amount at stake, Current status and next hearing, Legal counsel handling, Management assessment of outcome, and Provision made in accounts (if any).

Types of disputes to document include: Customer disputes: Contract claims, service issues. Employee disputes: Wrongful termination, harassment claims, labor court matters. Vendor disputes: Payment disputes, breach claims. Regulatory proceedings: Show cause notices, enforcement actions. IP disputes: Infringement claims, opposition proceedings. Tax disputes: Assessment appeals, refund claims.

Threatened disputes require disclosure. Cease and desist letters received. Legal notices received (even if not followed by litigation). Known potential claims (customer complaints likely to escalate). Regulatory inquiries that may lead to proceedings.

Disclosure approach best practices: Organize by case type and materiality. Provide factual summary without legal opinions (unless from counsel). Include management''s good faith assessment of risk. Show provisions made in financial statements. Include legal counsel contact for detailed questions.

Risk assessment categories: Low: Nuisance claims likely to settle or dismiss without material impact. Medium: Claims with uncertain outcome and moderate potential liability. High: Claims with significant probability of adverse outcome and material impact. Document rationale for risk assessment.

Historical litigation also matters. Resolved cases in past 3-5 years. Settlement amounts and terms (if not confidential). Cases that set precedent affecting business.

Insurance coverage for litigation: D&O insurance (Directors and Officers liability). E&O insurance (Errors and Omissions). Cyber liability insurance. General liability insurance. Document coverage limits and claims made.',
        '["Create comprehensive litigation register for all pending matters", "Document all threatened disputes and legal notices received", "Prepare risk assessment for each material dispute", "Verify insurance coverage for litigation-related liabilities"]'::jsonb,
        '["Litigation Register Template", "Dispute Risk Assessment Framework", "Legal Notice Tracker", "Insurance Coverage Summary Template"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Operational Metrics & KPIs (Days 25-30)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Operational Metrics & KPIs',
        'Document operational metrics that demonstrate business health and trajectory. Cover product metrics, customer analytics, team composition, and competitive positioning.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 25: Product & Technology Metrics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        25,
        'Product & Technology Metrics',
        'Product and technology metrics demonstrate product-market fit and technical execution capability. Indian tech investors increasingly focus on engagement metrics alongside growth, seeking evidence of sustainable rather than growth-at-all-costs businesses.

User engagement metrics vary by product type. For apps/platforms: Daily Active Users (DAU), Weekly Active Users (WAU), Monthly Active Users (MAU). DAU/MAU ratio indicates "stickiness" (>20% is healthy for most consumer apps). Session frequency and duration. Feature adoption rates.

Conversion funnel metrics reveal efficiency. Top of funnel: Traffic sources, visitor numbers. Conversion rates at each stage: Visit → Sign-up → Activation → Paid. Time to convert: Days from sign-up to first purchase. Drop-off analysis: Where do users abandon?

Retention and engagement metrics: Day 1, Day 7, Day 30 retention by cohort. User return frequency. Net Promoter Score (NPS). Customer satisfaction scores.

Technical infrastructure metrics show scalability: Uptime/availability (target: 99.9%+). Response time/latency. Error rates. System capacity vs utilization. Scalability test results.

Development velocity and quality: Sprint velocity trends. Deployment frequency. Bug escape rate. Technical debt assessment. Security vulnerability status.

Product roadmap documentation: Completed features with impact assessment. Current development priorities. 12-month roadmap with milestone dates. Competitive feature comparison.

Infrastructure and technology stack: Architecture diagram (high-level). Technology stack documentation. Third-party service dependencies. Data flow and storage architecture. Security and compliance measures.

India-specific technology considerations: Mobile-first optimization (90%+ Indian internet users on mobile). Vernacular/multi-language support. Low bandwidth optimization. UPI and Indian payment integration. Aadhaar/DigiLocker integration readiness.',
        '["Compile user engagement metrics with historical trends", "Document conversion funnel with stage-by-stage analysis", "Create retention cohort analysis", "Prepare technology stack and architecture documentation"]'::jsonb,
        '["User Engagement Metrics Dashboard Template", "Conversion Funnel Analysis Template", "Cohort Retention Analysis Template", "Technology Stack Documentation Guide"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 26: Customer Analytics & Insights
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        26,
        'Customer Analytics & Insights',
        'Customer analytics demonstrate your understanding of who your customers are and how they behave. Sophisticated investors look beyond topline customer counts to understand customer quality, behavior patterns, and predictability.

Customer segmentation analysis provides clarity. By value tier: Premium, Standard, Basic, or by annual revenue contribution. By engagement level: Power users, regular users, at-risk users. By acquisition channel: Organic, paid, referral, partner. By geography: Metro, Tier 2, Tier 3, or by state. By industry/vertical: For B2B businesses.

Customer behavior analysis reveals usage patterns. Purchase patterns: Frequency, basket size, timing. Usage patterns: Features used, frequency, depth. Support patterns: Ticket volume, issue types, resolution. Churn patterns: Warning signs before churn, churn timing.

Customer satisfaction measurement: NPS (Net Promoter Score) with trend over time. CSAT (Customer Satisfaction) scores by touchpoint. Customer reviews and ratings (app store, Google, etc.). Customer testimonials and case studies. Complaints and escalations tracking.

Cohort analysis by acquisition month: Revenue retention by cohort. Logo retention by cohort. Expansion revenue by cohort. Are newer cohorts better or worse than older ones?

Customer concentration analysis (critical for B2B): Revenue from top 1/5/10/20 customers. Customer dependency assessment. Key account risk analysis.

Churn analysis: Churn rate by segment and cohort. Churn reasons categorization. Win-back success rates. Early warning indicators identified.

Customer insights documentation: Key customer personas (data-validated). Customer journey maps. Voice of customer summaries. Customer feedback themes.',
        '["Create customer segmentation analysis by value, engagement, and acquisition channel", "Build cohort analysis showing retention and revenue trends", "Document customer satisfaction metrics with trend analysis", "Prepare customer concentration and churn analysis"]'::jsonb,
        '["Customer Segmentation Analysis Template", "Cohort Analysis Model", "NPS and CSAT Tracking Template", "Customer Concentration Analysis Tool"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 27: Team & Organization Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        27,
        'Team & Organization Documentation',
        'Team documentation helps investors assess execution capability. Indian startups often differentiate on team quality, especially in crowded markets. How you present your team signals both current capability and ability to attract talent.

Organization structure documentation: Current org chart with reporting relationships. Planned org chart post-funding. Headcount by function: Engineering, Product, Sales, Marketing, Operations, G&A. Contractor and consultant usage. Open positions and hiring plans.

Leadership team profiles: Founder bios with relevant experience and achievements. CXO/VP-level bio summaries. LinkedIn profile links. Board members and advisors. Key achievements and domain expertise.

Team experience analysis: Prior startup experience (founded, early employee). Domain expertise relevant to business. Educational background (for technical roles especially). Prior company pedigree (big tech, successful startups).

Hiring and retention metrics: Headcount growth over time. Turnover rate by function. Average tenure. Offer acceptance rate. Time to fill open positions.

Compensation philosophy documentation: Salary bands by level and function. ESOP philosophy and allocation. Benefits summary. Comparison to market rates.

Key person risk assessment: Identification of critical personnel. Knowledge concentration in specific individuals. Succession planning or cross-training status. Retention arrangements for key personnel.

Culture and values documentation: Articulated company values. Culture manifestation examples. Employee survey results (engagement, satisfaction). Glassdoor and other review site ratings.

India-specific team considerations: Remote vs office distribution. Geographic distribution (metro vs distributed). Visa and work authorization (if employing foreigners). Key employee non-compete enforceability (varies by state).',
        '["Create current and planned organization charts", "Prepare leadership team profile summaries", "Document hiring and retention metrics", "Compile key person risk assessment"]'::jsonb,
        '["Organization Chart Template", "Leadership Bio Template", "Hiring Metrics Dashboard", "Key Person Risk Assessment Framework"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 28: Business Plan & Strategy Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        28,
        'Business Plan & Strategy Documentation',
        'Business plan documentation demonstrates strategic thinking and planning capability. While investors know plans will change, the quality of planning reflects founder sophistication and ability to think through business challenges systematically.

Executive summary captures the opportunity. One-page company overview. Problem statement and solution. Market opportunity (TAM/SAM/SOM). Business model summary. Traction highlights. Funding ask and use of funds.

Market analysis documentation: TAM/SAM/SOM calculation with methodology. Market trends and tailwinds. Competitive landscape analysis. Positioning and differentiation. Barriers to entry and moats.

Business model documentation: Revenue model explanation. Pricing strategy and rationale. Unit economics summary. Path to profitability.

Go-to-market strategy: Customer acquisition channels. Sales process (if applicable). Partnership strategy. Marketing strategy overview.

Growth strategy and roadmap: 12-24 month strategic priorities. Key milestones and timeline. Growth hypotheses and experiments. Expansion plans (geographic, product, segment).

Competitive positioning: Direct and indirect competitor mapping. Competitive advantages/moats. Feature comparison matrix. Differentiation sustainability.

Risk assessment: Key risks identified. Mitigation strategies. Contingency plans.

Use of funds documentation: Detailed budget for new funding. Hiring plan with timeline. Technology investment. Marketing investment. Working capital requirements. Runway extension achieved.',
        '["Create or update executive summary (one-pager)", "Document market analysis with supporting data sources", "Prepare detailed use of funds with timeline", "Create growth roadmap with milestones"]'::jsonb,
        '["Executive Summary Template", "Market Analysis Documentation Guide", "Use of Funds Template with Categories", "Strategic Roadmap Template"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 29: Pitch Materials Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        29,
        'Pitch Materials Optimization',
        'Pitch materials are often the first impression investors have of your company. Before accessing the data room, they''ve typically seen your pitch deck. Ensuring consistency between pitch deck claims and data room documentation is critical for credibility.

Pitch deck for data room: Full version (15-25 slides) for detailed review. Includes slides you might skip in live presentation. Every claim should be supportable by data room documents. Common structure: Cover, Problem, Solution, Market, Product, Traction, Business Model, Competition, Team, Financials, Ask.

Deck-to-data room mapping: Every metric in deck has source document in data room. Every claim has supporting evidence. Customer logos match customer contract files. Team bios match employment records. Financial projections match financial model.

One-pager/executive summary: Single-page company overview for initial sharing. Often the most viewed document. Update regularly with latest metrics.

Founder/CEO memo or letter: Personal narrative from founder(s). Vision, motivation, journey. Builds emotional connection beyond numbers.

FAQ document: Answers to 20-30 common investor questions. Proactively addresses likely concerns. Shows preparedness and transparency.

Video assets (if applicable): Product demo video. Customer testimonial videos. Team/culture video. Founder pitch video (2-3 minutes).

Appendix materials: Detailed financial model (linked from main deck). Technical architecture deep dive. Regulatory compliance details. Competitive feature matrix. Customer case studies.

Presentation consistency check: Visual design consistent across all materials. Latest logo and branding applied. Consistent data points (don''t have different numbers in different documents). Updated for current period.',
        '["Audit pitch deck for consistency with data room documents", "Create deck-to-data room mapping document", "Update or create one-pager executive summary", "Develop investor FAQ document with 20+ questions"]'::jsonb,
        '["Pitch Deck Best Practices Guide", "Deck-to-Data Room Mapping Template", "One-Pager Template", "Investor FAQ Template"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 30: Customer & Traction Evidence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        30,
        'Customer & Traction Evidence',
        'Traction evidence transforms claims into credibility. Indian investors increasingly want proof points beyond financials - customer testimonials, case studies, and usage data that demonstrate real market validation.

Customer testimonials collection: Written testimonials from satisfied customers. Video testimonials (highly impactful). Permission to use and share documented. Variety of customer types represented.

Case studies development: 3-5 detailed case studies showing: Customer challenge, Your solution implementation, Measurable results achieved. Include customer quotes and data. Get customer approval for sharing.

Customer logo board: Logos of notable customers (with permission). Organized by industry or segment. Recognizable brands featured prominently.

Reference customer list: 5-10 customers willing to speak with investors. Briefed on what to expect. Variety of use cases represented. Includes contact information.

Metrics verification documents: Screenshots of analytics dashboards. Third-party verification where possible. Month-by-month data exports.

Social proof compilation: Media coverage and press mentions. Awards and recognitions. Industry analyst mentions. Partnership announcements.

User-generated content: Customer reviews (app store, G2, Capterra). Social media mentions. Community engagement evidence.

Milestone achievement documentation: Key company milestones with dates. Growth achievement highlights. Product launch history. Funding milestones (if public).',
        '["Collect customer testimonials (5-10 written, 2-3 video if possible)", "Develop 3-5 customer case studies with measurable results", "Prepare reference customer list with briefing", "Compile social proof documentation (press, awards, reviews)"]'::jsonb,
        '["Customer Testimonial Collection Guide", "Case Study Development Template", "Reference Customer Preparation Guide", "Social Proof Compilation Template"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Cap Table & Equity (Days 31-36)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Cap Table & Equity',
        'Master cap table management and equity documentation using Indian tools like Qapita and EquityList. Understand ESOP administration, ownership tracking, and valuation documentation.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 31: Cap Table Fundamentals
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        31,
        'Cap Table Fundamentals',
        'The cap table (capitalization table) is the definitive record of company ownership. It tracks all equity holders and their ownership percentages. A clean, accurate cap table is essential for fundraising - investors will verify it against ROC filings and legal documents.

Cap table basics for Indian startups: Shows all shareholders and their ownership. Distinguishes between share classes (equity, preference). Shows vested and unvested ESOP pools. Includes convertible instruments (notes, SAFEs, CCPS).

Key cap table views required: Current ownership: Who owns what right now (issued shares only). Fully diluted: Includes all options and convertibles as if converted. Pro forma: Post-investment ownership showing new round impact.

Cap table management tools for Indian startups: Qapita: India-focused, comprehensive, from Singapore. Pricing: $500-2000/year. EquityList: Indian platform, ESOP-focused. Pricing: Rs 25,000-1,00,000/year. Carta: US-focused but used by some Indian startups with US entities. Trica: Indian platform for cap table and ESOP. Excel: Still used by early-stage startups, but error-prone.

Share class complexity in Indian startups: Equity shares: Standard ownership with voting rights. CCPS (Compulsorily Convertible Preference Shares): Most common for VC investments. Non-convertible preference shares: Rare in startups. Each class may have different rights (liquidation preference, anti-dilution).

Cap table reconciliation with ROC: MCA filings show shareholding pattern. Cap table must match ROC records exactly. Form MGT-7 (annual return) shows shareholders. Share certificates should match both.

Common cap table issues: Rounding errors accumulating over rounds. Missing ESOP pool or incorrect pool size. Convertible notes not properly modeled. Historical transactions not documented. Founder shares not properly vested.',
        '["Review or create cap table with current shareholding", "Reconcile cap table against ROC filings (MGT-7)", "Verify share certificates exist for all shareholders", "Evaluate cap table management tools for your needs"]'::jsonb,
        '["Cap Table Template (Excel) with Fully Diluted View", "Cap Table to ROC Reconciliation Checklist", "Cap Table Tool Comparison Matrix", "Share Class Documentation Guide"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 32: ESOP Pool & Administration
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        32,
        'ESOP Pool & Administration',
        'ESOP (Employee Stock Option Plan) documentation is scrutinized in due diligence as it affects ownership dilution and creates tax/compliance obligations. Proper ESOP administration demonstrates HR sophistication and helps attract talent - a key investor concern.

ESOP scheme documentation: ESOP Plan document approved by shareholders. Special resolution for scheme adoption. Trust deed (if ESOP trust formed). Scheme rules covering eligibility, vesting, exercise.

Individual grant documentation: Grant letters for each optionee. Board/compensation committee approval for grants. Acceptance of grant by employee. Exercise price documentation (fair market value justification).

Vesting schedule management: Standard 4-year vesting with 1-year cliff is norm. Track vesting status for each grant. Document any accelerated vesting (change of control, performance).

ESOP pool utilization tracking: Total pool authorized (as % of equity). Granted but unvested. Vested but unexercised. Exercised (converted to shares). Forfeited/lapsed. Available for future grants.

Exercise and taxation: Exercise process documentation. Fair Market Value determination for tax (typically by registered valuer). Tax withholding calculations (treated as perquisite income). Reporting in employee Form 16.

ESOP compliance requirements: Companies Act compliance (Section 62). SEBI regulations (if listed company - rare for startups). Tax compliance at exercise and sale. ROC filings for share allotment on exercise.

Common ESOP issues in Indian startups: ESOP pool not properly carved out in cap table. Missing grant letters or approvals. FMV valuation not done at grant. Incorrect tax treatment at exercise. Departed employees with unvested options not properly handled.',
        '["Compile ESOP scheme documentation and shareholder approvals", "Create ESOP grant register with all individual grants", "Verify vesting schedules and track current vesting status", "Calculate ESOP pool utilization and available pool"]'::jsonb,
        '["ESOP Scheme Document Checklist", "ESOP Grant Register Template", "Vesting Schedule Tracker", "ESOP Pool Utilization Calculator"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 33: Valuation Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        33,
        'Valuation Documentation',
        'Valuation documentation serves multiple purposes: historical valuations justify prices paid by previous investors, current valuations support ESOP grants and regulatory filings, and valuation methodology understanding helps in negotiations. Indian regulatory requirements add specific valuation documentation needs.

Types of valuation documentation: 409A / Fair Market Value: For ESOP grants (registered valuer report). Transaction valuation: Price paid in funding rounds. Regulatory valuation: For FEMA compliance, share transfers. Internal valuation: For planning and tracking.

Historical round valuations: Document pre-money and post-money for each round. Show valuation methodology used. Link to investment documents that establish value.

409A equivalent in India: Registered valuer report required for ESOP grant pricing. Typically done annually or at significant events. Valuation methods: DCF, comparable transactions, comparable companies. Must be by IBBI-registered valuer for compliance.

FEMA valuation requirements: Foreign investment must be at fair value (for inbound). Share transfers to/from foreigners need valuation. Methods prescribed by FEMA: DCF for Indian companies, internationally accepted methods for foreign companies.

Valuation support documentation: Financial projections underlying DCF. Comparable company analysis. Comparable transaction analysis. Market multiples used with sources.

Valuation vendor selection: Registered valuers for regulatory compliance: IBBI registered list. Big 4 and mid-tier accounting firms for sophistication. Independent valuation firms: Grant Thornton, Duff & Phelps, etc.

Valuation documentation for data room: Latest 409A/FMV report. Summary of historical round valuations. Valuation methodology explanation. Supporting financial projections.',
        '["Compile historical valuation documents from all funding rounds", "Obtain or verify current FMV valuation report (for ESOP purposes)", "Document valuation methodology and supporting assumptions", "Create valuation history summary for data room"]'::jsonb,
        '["Valuation Documentation Checklist", "Registered Valuer Selection Guide", "Valuation History Summary Template", "FEMA Valuation Requirements Guide"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 34: Ownership Change Documentation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        34,
        'Ownership Change Documentation',
        'Every change in company ownership creates documentation requirements. Secondary sales, founder departures, employee exercises, and investor transfers all need proper documentation. Missing documentation creates title issues that can delay or derail transactions.

Share allotment documentation (primary issuance): Board resolution approving allotment. Form PAS-3 filed with ROC (within 30 days). Share certificates issued. Updated register of members. Payment receipt/bank statement.

Share transfer documentation (secondary sales): Share transfer form (Form SH-4). Board approval for transfer (or waiver of ROFR). Valuation report (if required by FEMA). Stamp duty payment. Updated share certificates. Updated register of members.

FEMA compliance for transfers involving foreigners: Prior approval requirements (if applicable). Fair value compliance. FC-TRS filing (within 60 days of transfer). Annual FLA reporting impact.

Employee ESOP exercise documentation: Exercise notice from employee. Board/committee approval. Payment of exercise price. Tax deduction at source. PAS-3 filing. Share certificate issuance.

Founder/early employee departures: Treatment of unvested shares/options (forfeiture). Treatment of vested but unexercised options (exercise window). Share buyback (if applicable). Updated cap table.

Common ownership documentation issues: Missing share transfer forms from early transfers. Incomplete ROFR waiver documentation. FEMA filings not done for foreign transfers. Share certificates not issued or lost. Register of members not updated.',
        '["Compile all share allotment documentation from incorporation to present", "Gather all share transfer documentation including secondary sales", "Verify FEMA compliance documentation for any foreign investor transfers", "Update register of members and reconcile with cap table"]'::jsonb,
        '["Share Allotment Documentation Checklist", "Share Transfer Documentation Guide", "FEMA Transfer Compliance Checklist", "Register of Members Template"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 35: Investor Rights & Preferences
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        35,
        'Investor Rights & Preferences',
        'Investor rights created by previous rounds directly affect new investor calculations and negotiations. Understanding and documenting these rights clearly helps new investors model their potential returns and identify negotiation points.

Liquidation preferences: 1x non-participating: Investor gets money back OR converts to common (whichever is higher). 1x participating: Investor gets money back AND participates in remaining distribution. Participating cap: Participation limited to certain multiple. Seniority/parity: Which investors get paid first in liquidation.

Anti-dilution provisions: Full ratchet: Price adjusted to any lower price (aggressive). Weighted average (broad-based): Most common, price adjusted based on formula. Weighted average (narrow-based): Less common, smaller adjustment. Pay-to-play: Protection conditioned on participating in down rounds.

Pro-rata/participation rights: Right to participate in future rounds to maintain ownership. May be conditional (e.g., only if investing above threshold). Allocation priority: First come vs pro-rata vs other.

Board and governance rights: Board seat rights (who has them, conditions). Board observer rights. Consent rights (what requires investor approval). Information rights (monthly, quarterly, annual reports). Audit rights.

Exit-related rights: Drag-along: Majority can force others to sell. Tag-along: Right to participate in others'' sales. Right of first refusal (ROFR): Company/investors can match any offer. Co-sale rights.

Founder-specific provisions: Vesting: Founder share vesting requirements. Lock-up: Restrictions on founder sales. Non-compete: Post-departure competition restrictions. Key person provisions: Insurance, full-time commitment.

Rights summary creation: Create matrix showing all investor rights by investor. Highlight any unusual or non-standard provisions. Identify rights requiring waiver for new round.',
        '["Create investor rights summary matrix from all SHAs and investment documents", "Calculate impact of liquidation preferences on exit scenarios", "Document anti-dilution provisions and potential dilution impact", "Identify any rights requiring waiver or amendment for new round"]'::jsonb,
        '["Investor Rights Summary Matrix Template", "Liquidation Preference Calculator", "Anti-Dilution Impact Analysis Tool", "Rights Waiver Requirement Checklist"]'::jsonb,
        120,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 36: Cap Table Scenario Modeling
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        36,
        'Cap Table Scenario Modeling',
        'Cap table scenario modeling allows you to understand dilution impact and negotiate effectively. Investors will build their own models - having your model ready demonstrates sophistication and allows you to identify and address issues proactively.

Pro forma cap table for new round: Show current cap table and proposed new round. Model at different valuations (range). Show founder dilution at each scenario. Show existing investor dilution.

Round structure modeling: Primary investment: New shares issued, company receives cash. Secondary component (if any): Existing shares sold, no new cash to company. ESOP pool expansion: Often required by new investors.

Dilution analysis: Calculate dilution for founders. Calculate dilution for existing investors. Show absolute ownership and percentage ownership changes. Model multiple valuation scenarios.

Option pool shuffle: New investors often require expanded option pool. This dilutes pre-money, effectively reducing valuation. Model pool expansion scenarios. Understand impact on all parties.

Exit waterfall analysis: Model exit scenarios at different valuations. Show proceeds distribution based on liquidation preferences. Calculate returns for each investor class. Identify "preference overhang" scenarios.

Round comparison scenarios: Compare term sheets from different investors. Model ownership, board control, and exit economics. Consider non-economic terms impact.

Key scenario outputs: Founder ownership post-round. Control provisions (board seats, voting). Exit proceeds at different valuations. Dilution from future assumed rounds.',
        '["Build pro forma cap table at proposed round terms", "Model dilution impact on founders and existing investors", "Create exit waterfall analysis at various exit valuations", "Prepare negotiation scenarios with different term combinations"]'::jsonb,
        '["Pro Forma Cap Table Template", "Dilution Analysis Calculator", "Exit Waterfall Model", "Term Sheet Comparison Tool"]'::jsonb,
        120,
        100,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 7: Due Diligence Preparation (Days 37-42)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Due Diligence Preparation',
        'Prepare your team for investor due diligence. Master DD request handling, red flag mitigation, disclosure preparation, and management presentation skills.',
        6,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_7_id;

    -- Day 37: DD Checklist & Timeline Planning
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        37,
        'DD Checklist & Timeline Planning',
        'Due diligence is a structured process with predictable steps and timelines. Understanding the typical DD process helps you prepare effectively and manage investor expectations. Indian DD processes have specific characteristics shaped by local regulations and investor preferences.

Typical DD phases in Indian fundraising: Phase 1 - Preliminary review (1-2 weeks): Basic documents, financial summary, key terms alignment. Phase 2 - Detailed DD (3-6 weeks): Full document review, management meetings, expert calls. Phase 3 - Completion (1-2 weeks): Final document collection, disclosure schedules, closing documents.

DD workstreams typically include: Legal DD: Corporate, contracts, compliance, IP, litigation. Financial DD: Quality of earnings, working capital, tax. Technical DD: Architecture review, code review, security. Commercial DD: Market, competition, customer validation. HR DD: Team, compensation, compliance.

Standard DD request list categories: Corporate/constitutional documents (20-30 items). Shareholding/equity documents (15-20 items). Financial documents (25-35 items). Contracts (20-30 items). Employment/HR (15-20 items). IP/technology (10-15 items). Regulatory/compliance (15-25 items). Business/operations (15-20 items).

DD project management setup: Assign DD coordinator from your team. Create DD response tracker (who owns what, status). Establish communication channels with DD team. Set up secure document sharing (data room access). Plan for management time commitment (20-40% during active DD).

Timeline management strategies: Build buffer into your timeline assumptions. Identify items that need external parties (auditors, lawyers, valuers). Start long-lead items immediately (e.g., legal opinions). Track and communicate delays proactively.

DD red flag categories to pre-address: Show-stoppers: Issues that will kill the deal (resolve before starting). Material concerns: Issues that will affect terms (have remediation plan). Minor issues: Normal cleanup items (address during DD).',
        '["Download and review comprehensive DD checklist for your funding stage", "Create DD project plan with timeline and ownership assignments", "Identify long-lead items requiring immediate action", "Set up DD communication and tracking infrastructure"]'::jsonb,
        '["Comprehensive DD Checklist (200+ items)", "DD Project Plan Template", "DD Tracker Spreadsheet", "DD Timeline Management Guide"]'::jsonb,
        90,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 38: Red Flag Identification & Mitigation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        38,
        'Red Flag Identification & Mitigation',
        'Proactively identifying and addressing red flags before DD starts demonstrates founder maturity and prevents deal-killing surprises. Indian startup DD commonly surfaces specific issues that can be anticipated and mitigated.

Corporate red flags: Missing or delayed ROC filings. Board composition not matching SHA requirements. Related party transactions without proper approval. Director disqualification issues. Registered office compliance issues. Mitigation: Work with CS/lawyer to file/rectify.

Financial red flags: Qualified audit opinions. Significant related party transactions. Cash vs accrual mismatches. Unusual year-end adjustments. Tax non-compliance or disputes. Mitigation: Engage auditors/tax advisors for remediation.

Legal red flags: Unsigned or missing contracts. IP not assigned to company. Non-compete enforceability concerns. Pending litigation with material exposure. Regulatory non-compliance. Mitigation: Engage legal counsel for cleanup.

Equity red flags: Cap table doesn''t match ROC filings. Missing share certificates. FEMA non-compliance for foreign shareholders. ESOP scheme irregularities. Previous round documents missing. Mitigation: Prioritize cap table cleanup with legal support.

HR red flags: Employee misclassification. PF/ESI non-compliance. Missing employment agreements. POSH compliance gaps. Key person flight risk. Mitigation: HR audit and compliance catch-up.

Creating red flag remediation plan: List all potential issues. Assess: Severity (deal-breaker, material, minor), Remediation effort and cost, Timeline to remediate. Prioritize: Address deal-breakers first. Document: Keep record of all remediation actions.',
        '["Conduct systematic red flag assessment across all DD categories", "Prioritize issues by severity and create remediation plan", "Engage advisors (legal, tax, CS) for technical remediation", "Document remediation actions and evidence"]'::jsonb,
        '["Red Flag Assessment Checklist by Category", "Issue Severity Assessment Framework", "Remediation Plan Template", "Advisor Engagement Guide for DD Preparation"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 39: Disclosure Schedule Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        39,
        'Disclosure Schedule Preparation',
        'Disclosure schedules are annexures to investment agreements where you disclose exceptions to representations and warranties. Proper disclosure protects you post-closing; incomplete disclosure creates liability. Indian transactions typically use standard disclosure formats that can be prepared in advance.

Purpose of disclosure schedules: Carve out specific items from general representations. Provide detail on matters referenced in agreement. Create record of known issues at closing. Allocate risk between company and investor.

Common disclosure schedule categories: Capitalization: Detailed cap table, option grants, convertibles. Material contracts: List of all contracts meeting materiality threshold. Intellectual property: IP registrations, licenses, assignments. Litigation: Pending and threatened legal matters. Tax matters: Open years, ongoing disputes, claims. Employee matters: Key employees, compensation, disputes. Insurance: Policies in force, claims history. Compliance: Licenses, permits, regulatory matters.

Preparation approach: Start with comprehensive document review. Extract disclosable items from data room documents. Organize by disclosure schedule category. Cross-reference to supporting documents. Review for completeness with legal counsel.

Drafting standards: Be specific: "Pending GST appeal for FY 2021-22 for Rs X" not "Tax matters." Be complete: Disclose everything that might be relevant. Be accurate: Verify facts before disclosing. Be clear: Avoid ambiguous language.

Disclosure letter format: Introduction identifying the agreement. General disclosures applicable to all representations. Specific disclosures organized by section/schedule. Attached documents referenced in disclosures.

Review and approval process: Initial draft by management. Legal counsel review for completeness and accuracy. Board review for significant disclosures. Final version tied to agreement schedules.',
        '["Review all representations in investment agreement requiring disclosure", "Create initial disclosure schedule drafts by category", "Gather supporting documents for each disclosure item", "Review drafts with legal counsel for completeness"]'::jsonb,
        '["Disclosure Schedule Template by Category", "Representation to Disclosure Mapping Guide", "Disclosure Drafting Standards", "Disclosure Review Checklist"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 40: Management Presentation Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        40,
        'Management Presentation Preparation',
        'Management presentations during DD give investors direct access to the team. These sessions often determine whether investors proceed - poor presentations have killed deals with strong fundamentals. Preparation and practice are essential.

Types of management meetings: Initial pitch: High-level story, team introduction (30-60 minutes). Deep-dive sessions: Detailed functional reviews (2-4 hours each). Expert sessions: Technical, financial, legal deep-dives. Final management meeting: Address remaining questions, confirm commitment.

Deep-dive session topics typically include: Business overview and strategy. Financial review with CFO/Finance head. Technology/product review with CTO/Product head. Sales and marketing review. Operations review. Team and culture.

Presentation structure for deep-dives: Executive summary (5 minutes). Detailed functional review (30-45 minutes). Data and metrics walkthrough (20-30 minutes). Q&A (30-60 minutes).

Team preparation: Brief all presenters on overall narrative consistency. Prepare each presenter for their section. Anticipate tough questions and prepare answers. Practice handling "I don''t know" responses professionally. Assign roles: presenter, note-taker, follow-up owner.

Common investor questions to prepare for: Why did you start this company? Walk through your business model economics. Explain your competitive positioning. What are the biggest risks to your business? How will you use the funds? What happens if this funding doesn''t close?

Practice sessions: Full dry run with friendly advisor as "investor." Record and review for improvement areas. Time each section to ensure coverage. Practice pivoting from prepared content to Q&A.',
        '["Create management presentation deck for DD deep-dive sessions", "Prepare briefing documents for each presenter on their sections", "Develop Q&A document with anticipated questions and answers", "Conduct at least 2 practice sessions with feedback"]'::jsonb,
        '["Management Presentation Deck Template", "Deep-Dive Session Guide by Function", "Top 100 Investor Questions with Answer Frameworks", "Presentation Practice Feedback Template"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- Day 41: Expert Calls & Reference Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        41,
        'Expert Calls & Reference Preparation',
        'Investors conduct reference calls with customers, partners, former colleagues, and industry experts. These back-channel references often carry more weight than prepared materials. Preparing your references ensures they support your story effectively.

Types of reference calls: Customer references: Usage experience, value delivered, satisfaction. Partner references: Working relationship, reliability. Employee/former employee references: Culture, leadership, work environment. Industry expert references: Market validation, competitive position. Investor references: Previous investors'' experience.

Customer reference preparation: Identify 5-10 willing reference customers. Variety: Different use cases, company sizes, tenures. Brief them: What to expect, key points about the investment. Provide talking points (without scripting). Get permission for contact information sharing.

Partner reference preparation: Key partners who can speak to relationship. Brief on confidentiality (don''t disclose competitive info). Focus on professionalism and reliability themes.

Personal reference preparation: Former colleagues who can speak to founder capability. Board members or advisors. Previous investors (if applicable). Mentors in the ecosystem.

Briefing your references effectively: Explain the fundraising context (who, how much, what for). Share the narrative you''re telling. Highlight key points you hope they''ll reinforce. Address any concerns they might raise. Thank them and keep them informed.

Back-channel reference management: Assume investors will find references you don''t provide. Maintain good relationships even with departed employees. Address any negative relationships proactively. Industry is small - reputation matters.',
        '["Identify and contact 5-10 customers willing to be references", "Brief all references on the fundraising and key messages", "Prepare reference list document with contact details and context", "Address any potentially negative references proactively"]'::jsonb,
        '["Reference Customer Selection Criteria", "Reference Briefing Template", "Reference List Document Format", "Back-channel Reference Management Guide"]'::jsonb,
        90,
        75,
        4,
        NOW(),
        NOW()
    );

    -- Day 42: DD Response System Setup
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_7_id,
        42,
        'DD Response System Setup',
        'Active DD involves continuous requests for documents, clarifications, and meetings. A systematic response process ensures nothing falls through cracks and demonstrates operational excellence. Poor DD response management is a common deal-killer.

DD request tracking system: Central log of all requests received. Categorization by type (document, clarification, meeting). Assignment of owner for each request. Status tracking (received, in progress, completed). Due date and priority tracking. Link to response/document provided.

Response workflow: Request received and logged. Assigned to appropriate owner. Draft response prepared. Internal review (legal/founder as appropriate). Response submitted. Confirmation of receipt.

Service level expectations: Simple document retrieval: Same day. Complex document compilation: 2-3 business days. Clarification questions: 24-48 hours. Meeting requests: Respond within 24 hours with availability. Escalate anything blocking DD progress immediately.

Quality standards for responses: Answer the question asked (not tangentially related). Provide supporting documents where helpful. Be clear about limitations or caveats. Maintain consistency with previous responses. Professional tone throughout.

Communication protocols: Single point of contact for DD queries. Regular status updates to investor DD lead. Proactive communication on delays. Summary of outstanding items weekly.

Post-DD documentation: Archive all DD correspondence. Document all commitments made during DD. Track any issues for post-closing remediation. Create closing checklist from DD findings.',
        '["Set up DD request tracking system with all required fields", "Document DD response workflow and assign team roles", "Communicate response SLAs and quality standards to team", "Create DD communication protocol with investor"]'::jsonb,
        '["DD Request Tracker Template", "Response Workflow Diagram", "DD Communication Templates", "DD Quality Checklist"]'::jsonb,
        90,
        75,
        5,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Deal Execution (Days 43-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Deal Execution',
        'Navigate the final stages of deal execution from term sheet to closing. Master transaction documentation, closing procedures, and post-closing data room management.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_8_id;

    -- Day 43: Transaction Document Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        43,
        'Transaction Document Preparation',
        'Transaction documents formalize the investment and create binding obligations. Understanding these documents helps you negotiate effectively and ensures no surprises at closing. Indian transaction documentation has specific formats and regulatory requirements.

Core transaction documents: Share Subscription Agreement (SSA): Primary investment document covering price, conditions, representations. Shareholders'' Agreement (SHA): Ongoing governance, rights, restrictions. Amendment to AOA: Incorporates SHA provisions into constitutional documents. Board/shareholder resolutions: Approvals required for transaction.

Key SSA sections to understand: Subscription details: Shares, price, payment mechanism. Conditions precedent: What must happen before closing. Representations and warranties: Your factual statements about the company. Indemnification: Your liability if representations are false. Closing mechanics: How closing actually happens.

Key SHA sections to understand: Board composition and voting. Protective provisions (investor veto rights). Information rights. Transfer restrictions (ROFR, tag, drag). Exit provisions. Non-compete and exclusivity.

Supporting transaction documents: Legal opinion from company counsel. Officer''s certificate. Compliance certificate. Funds flow memo. Closing checklist.

Indian regulatory documents: FC-GPR filing (foreign investment reporting). Valuation certificate for FEMA compliance. ROC filings (PAS-3, MGT-14, etc.). RBI approval (if required for sector).

Document review process: Receive drafts from investor counsel. Internal review with your counsel. Prepare comments/markup. Negotiate through counsel. Final execution versions.',
        '["Review and understand all transaction document drafts", "Prepare comments on SSA and SHA with legal counsel", "Ensure all supporting documents are ready for closing", "Understand FEMA and regulatory filing requirements"]'::jsonb,
        '["Transaction Document Glossary", "SSA Key Terms Checklist", "SHA Negotiation Points Guide", "FEMA Compliance Document List"]'::jsonb,
        120,
        75,
        0,
        NOW(),
        NOW()
    );

    -- Day 44: Closing Process Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        44,
        'Closing Process Management',
        'The closing process converts signed documents into actual investment. This phase requires careful coordination between multiple parties - company, investors, lawyers, and banks. In India, currency controls and regulatory filings add complexity.

Pre-closing preparation: Conditions precedent checklist: Track satisfaction of all CPs. Board meeting preparation: Resolutions for allotment, SHA adoption. Shareholder meeting (if required): Special resolutions. Bank account: FCNR/regular account for receiving foreign funds. Share certificates: Ready for issuance.

Closing day sequence (typical): Morning: Final CP confirmation call. Signatures: Sign all transaction documents. Funds flow: Wire transfer initiated. Board meeting: Allot shares, adopt SHA, update registers. Documentation: Share certificates, updated cap table. Filings: Initiate ROC and RBI filings.

Post-closing filings (India-specific): PAS-3: Share allotment return to ROC (within 30 days). FC-GPR: Foreign investment reporting to RBI (within 30 days). MGT-14: Special resolutions filing. Form DIR-12: Director appointments (if any).

Closing checklist management: Master checklist tracking all closing items. Clear ownership for each item. Status updates at least daily during closing week. Escalation protocol for delays.

Common closing delays: Bank issues: SWIFT codes, correspondent banks, remittance purpose codes. Document execution: Signature pages, notarization requirements. CP satisfaction: Last-minute issues discovered. Regulatory: Waiting for approvals or clearances.

Post-closing administration: Update all registers (members, directors, charges). Issue share certificates. Update bank signatories if required. Board observer setup. Information rights implementation.',
        '["Create closing conditions precedent tracker and verify satisfaction", "Prepare all board and shareholder meeting materials", "Coordinate with bank on funds receipt readiness", "Develop closing day timeline with all parties"]'::jsonb,
        '["Conditions Precedent Tracker", "Closing Day Timeline Template", "Post-Closing Filing Checklist", "Share Certificate Preparation Guide"]'::jsonb,
        120,
        100,
        1,
        NOW(),
        NOW()
    );

    -- Day 45: Post-Closing Data Room & Maintenance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_8_id,
        45,
        'Post-Closing Data Room & Maintenance',
        'A data room doesn''t end at closing - it becomes an ongoing corporate repository. Post-closing organization and maintenance practices set you up for future fundraising, M&A readiness, and good governance. Companies with evergreen data rooms raise future rounds 50% faster.

Post-closing data room organization: Archive closing round documents in dedicated folder. Update all documents reflecting new round (cap table, SHA, etc.). Remove access for DD team members not continuing. Add new investor team members as appropriate. Document new information rights and reporting obligations.

Closing documentation to add: Executed transaction documents (all signatures). Closing certificates and deliverables. Board resolutions from closing. Updated share certificates. Post-closing regulatory filings.

Ongoing data room maintenance: Monthly: Add new material contracts, board materials. Quarterly: Financial updates, compliance filings. Annually: Audited financials, annual returns, regulatory renewals. As needed: Material events, team changes, customer changes.

Governance documentation cadence: Board materials added before each meeting. Board minutes added within 2 weeks of meeting. Shareholder communications archived. Consent and waiver documentation.

Information rights compliance: Understand reporting obligations from SHA. Set up automated reminders for reporting deadlines. Create template reports for recurring requirements. Track delivery and confirmation of receipt.

Next round preparation: Keep data room current continuously. Address any post-closing remediation items. Build relationship with investors through strong reporting. Document learnings from this round for next time.

Data room audit recommendations: Quarterly review of data room completeness. Annual deep review aligned with audit. External review before starting next fundraise.',
        '["Organize all closing documentation in data room", "Update access permissions for post-closing period", "Set up ongoing maintenance calendar and responsibilities", "Document information rights and reporting schedule"]'::jsonb,
        '["Post-Closing Documentation Checklist", "Data Room Maintenance Calendar", "Information Rights Tracking Template", "Next Round Preparation Guide"]'::jsonb,
        90,
        100,
        2,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
