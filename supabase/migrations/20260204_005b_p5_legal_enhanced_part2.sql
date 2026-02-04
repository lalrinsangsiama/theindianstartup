-- THE INDIAN STARTUP - P5: Legal Stack - Bulletproof Framework - Enhanced Content Part 2
-- Migration: 20260204_005b_p5_legal_enhanced_part2.sql
-- Purpose: Continue P5 course content - Modules 7-12 (Days 25-45)
-- Depends on: Part 1 (modules 1-6 already created)
-- India-specific: DPDP Act 2023, IT Act 2000, Arbitration Act 1996, FEMA, Companies Act, MCA filings

BEGIN;

DO $$
DECLARE
    v_product_id TEXT;
    v_mod_7_id TEXT;
    v_mod_8_id TEXT;
    v_mod_9_id TEXT;
    v_mod_10_id TEXT;
    v_mod_11_id TEXT;
    v_mod_12_id TEXT;
BEGIN
    -- Get P5 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P5';

    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product P5 not found. Please ensure Part 1 migration has been run first.';
    END IF;

    -- ========================================
    -- MODULE 7: Data Privacy & IT Act (Days 25-28)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Data Privacy & IT Act Compliance',
        'Master India''s evolving data protection landscape including the Digital Personal Data Protection Act 2023, IT Act 2000, data localization requirements, and building privacy-compliant operations from the ground up.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 25: DPDP Act 2023 Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        25,
        'Digital Personal Data Protection Act 2023 Framework',
        'The Digital Personal Data Protection Act 2023 (DPDP Act) represents India''s most comprehensive data protection legislation, finally enacted after years of draft iterations. This law fundamentally changes how startups must handle personal data, with penalties up to Rs 250 crore for non-compliance. Understanding its framework is essential for every Indian founder.

Historical Context and Development: India''s journey toward comprehensive data protection began with the Justice B.N. Srikrishna Committee report in 2018. The Personal Data Protection Bill 2019 was introduced in Parliament but underwent extensive revisions. The DPDP Act 2023 was finally passed in August 2023, representing a streamlined approach compared to earlier drafts while maintaining robust protection principles. The Act received Presidential assent on August 11, 2023, though implementation rules are being phased in gradually.

Key Definitions Under DPDP Act 2023: Data Principal: The individual to whom the personal data relates - your users, customers, employees, and any individual whose data you collect. Data Fiduciary: Any person who alone or with others determines the purpose and means of processing personal data - essentially, your startup when it collects and uses personal data. Data Processor: Any person who processes personal data on behalf of a Data Fiduciary - your vendors, cloud providers, analytics services, and third-party tools. Personal Data: Any data about an individual who is identifiable by or in relation to such data - names, emails, phone numbers, addresses, but also device IDs, IP addresses, and behavioral data when linked to individuals. Significant Data Fiduciary: A Data Fiduciary designated by the Central Government based on volume of data processed, sensitivity, risk to electoral democracy, security of state, or public order - larger startups may be designated and face additional obligations.

Core Principles of the DPDP Act: Lawful Processing: Personal data can only be processed for lawful purposes with the consent of the Data Principal or for certain legitimate uses specified in the Act. Purpose Limitation: Data must be collected only for specified purposes communicated to the Data Principal, and cannot be used for incompatible purposes without fresh consent. Data Minimization: Only data necessary for the specified purpose should be collected - avoid collecting extensive personal information you do not need. Storage Limitation: Personal data should not be retained longer than necessary for the purpose, requiring startups to implement data retention policies and deletion mechanisms. Accuracy: Reasonable efforts must be made to ensure personal data is accurate and kept up to date.

Consent Requirements Under DPDP Act: Consent must be free, specific, informed, unconditional, and unambiguous. It must be given through clear affirmative action - pre-ticked boxes or silence do not constitute valid consent. The request for consent must be presented clearly and separately from other matters. Data Principals must be informed about the specific personal data to be collected and the purpose of processing. Consent can be withdrawn at any time through an easy mechanism, and withdrawal must be as easy as giving consent. For children (under 18), verifiable parental consent is required before processing.

Rights of Data Principals: Right to Access: Data Principals can request summary of their personal data being processed and processing activities. Right to Correction and Erasure: Right to have inaccurate data corrected and to request deletion when data is no longer necessary. Right to Grievance Redressal: Every Data Fiduciary must have a grievance mechanism and must respond within timelines to be specified. Right to Nominate: Data Principals can nominate another individual to exercise their rights in case of death or incapacity.

Exemptions and Legitimate Uses: The DPDP Act provides exemptions for certain processing without consent. These include: Processing necessary for compliance with any law. Processing for any function of the State authorized by law. Processing for responding to medical emergencies. Processing for employment purposes with certain conditions. Processing of publicly available personal data. Processing for research, archiving, or statistical purposes (with conditions).

Penalties Under DPDP Act 2023: The penalty structure is graduated based on severity. Failure to take reasonable security safeguards: Up to Rs 250 crore. Failure to notify Data Principal and Board of data breach: Up to Rs 200 crore. Non-compliance with obligations regarding children: Up to Rs 200 crore. Failure to comply with directions of the Board: Up to Rs 50 crore. Violation of provisions related to transfer of personal data outside India: Up to Rs 250 crore. Other contraventions: Up to Rs 50 crore. These are maximum penalties - actual penalties will depend on factors like nature, gravity, and duration of breach, actions taken to mitigate, and previous contraventions.',
        '["Conduct comprehensive data mapping exercise identifying all personal data collected, processed, and stored across your organization - document data sources, types, purposes, and flows", "Review and update privacy policies to meet DPDP Act requirements including clear disclosure of data collection purposes, retention periods, and Data Principal rights", "Implement consent management system with granular consent collection, easy withdrawal mechanisms, and audit trails of consent records", "Establish Data Protection Officer role or designated privacy point person and create grievance redressal mechanism for Data Principal requests"]'::jsonb,
        '["DPDP Act 2023 Complete Text with section-by-section analysis and practical interpretation for startups", "Data Mapping Template covering data inventory, processing purposes, legal basis, retention periods, and third-party sharing", "Consent Management Implementation Guide with UI/UX patterns, technical architecture, and audit requirements", "Privacy Policy Template meeting DPDP Act requirements with customization guidance for different business models"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 26: IT Act 2000 and Reasonable Security Practices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        26,
        'IT Act 2000 and Reasonable Security Practices',
        'The Information Technology Act 2000, along with its associated rules particularly the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011 (SPDI Rules), forms the foundational cybersecurity and data protection framework that continues to apply alongside the DPDP Act 2023 in India.

IT Act 2000 Overview: The Information Technology Act 2000 was India''s first legislation addressing electronic commerce and cybersecurity. Amended significantly in 2008, it provides the legal framework for electronic records, digital signatures, cyber crimes, and data protection. Key sections relevant to startups include Section 43 (unauthorized access and damage to computer systems), Section 43A (compensation for failure to protect data), Section 66 (computer-related offenses), Section 72A (disclosure of information in breach of lawful contract), and Section 79 (intermediary liability and safe harbor).

Section 43A and Body Corporate Liability: Under Section 43A, any body corporate possessing, dealing with, or handling sensitive personal data and being negligent in implementing reasonable security practices is liable to compensate persons affected by such negligence. Body corporate includes companies and firms - essentially all business entities. No upper limit on compensation specified - determined based on actual damages. This provision creates strong incentive for implementing robust security practices.

Sensitive Personal Data or Information (SPDI) Under 2011 Rules: The SPDI Rules define sensitive personal data as including: Password. Financial information (bank account, credit/debit card details). Physical, physiological, and mental health condition. Sexual orientation. Medical records and history. Biometric information. Any detail relating to the above provided to body corporate for providing service. Importantly, any information freely available in public domain or accessible under RTI Act is excluded.

Reasonable Security Practices Standard: The SPDI Rules specify that reasonable security practices mean security practices and procedures designed to protect information from unauthorized access, damage, use, modification, disclosure, or impairment. Compliance with IS/ISO/IEC 27001 is deemed compliance with reasonable security practices. Alternatively, documented information security program with comprehensive policies and procedures approved by competent authority, covering managerial, technical, operational, and physical security controls proportional to protected assets and nature of business also qualifies.

Key Requirements Under SPDI Rules: Privacy Policy Publication: Body corporate must publish privacy policy covering type of personal/sensitive information collected, purpose, disclosure practices, and security practices. Must be available on website and for viewing on request. Consent Requirements: Collection of SPDI requires consent and must be for lawful purpose connected with function or activity. Option to not provide data must be given (with disclosure that certain features may not work). Disclosure Restrictions: SPDI cannot be disclosed to third parties without prior permission unless for contracted service providers, legal requirements, or permitted by data subject. Data Retention: SPDI should not be retained longer than required for purposes or as required by law. Data Transfer: SPDI can be transferred to body corporate or person in India or outside that ensures same level of data protection, provided transfer is necessary or data subject has consented.

Section 79 Intermediary Safe Harbor: For platforms that host user content, Section 79 provides crucial safe harbor protection. Intermediary is not liable for third-party information if it does not initiate transmission, select receiver, or modify information. Must observe due diligence under Intermediary Guidelines Rules 2021. Must expeditiously remove content upon actual knowledge or court/government order. Due diligence requirements include publishing rules and regulations, privacy policy and user agreement, informing users of prohibited content, taking down unlawful content within 36 hours, deploying technology-based measures for certain content, and providing information to authorized government agencies.

IT Act Offenses and Penalties Relevant to Startups: Section 43: Unauthorized access, damage, denial of service, etc. - compensation up to Rs 1 crore per incident. Section 66: Dishonestly or fraudulently doing acts under Section 43 - imprisonment up to 3 years and/or fine up to Rs 5 lakh. Section 66C: Identity theft - imprisonment up to 3 years and fine up to Rs 1 lakh. Section 66D: Cheating by personation using computer resource - imprisonment up to 3 years and fine up to Rs 1 lakh. Section 72A: Disclosure of information by service provider in breach of lawful contract - imprisonment up to 3 years and fine up to Rs 5 lakh.',
        '["Conduct information security assessment against ISO 27001 framework - identify gaps and create remediation roadmap for compliance with reasonable security practices standard", "Implement documented information security policy covering access control, data encryption, incident response, and employee training - ensure policies are approved by management and regularly reviewed", "Review and update privacy policy to meet SPDI Rules requirements including clear disclosure of SPDI types collected, purposes, and third-party disclosure practices", "If operating as intermediary, review compliance with IT Intermediary Guidelines Rules 2021 including grievance officer appointment, content moderation procedures, and takedown response times"]'::jsonb,
        '["IT Act 2000 and SPDI Rules 2011 Annotated Text with practical guidance for startups on compliance requirements", "ISO 27001 Gap Assessment Template for startups covering key control areas with implementation priority guidance", "Information Security Policy Template Suite including access control, data classification, incident response, and acceptable use policies", "Intermediary Compliance Checklist covering IT Rules 2021 due diligence requirements for platforms"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 27: Data Localization and Cross-Border Transfer
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        27,
        'Data Localization and Cross-Border Transfer Requirements',
        'India''s data localization requirements have evolved significantly, with different sectors having varying requirements. Understanding these requirements is critical for startups using global cloud services, international vendors, or serving customers across borders.

DPDP Act 2023 Cross-Border Transfer Framework: The DPDP Act 2023 takes a relatively permissive approach to cross-border data transfers compared to earlier draft bills. Personal data may be transferred outside India to any country or territory except those specifically restricted by the Central Government through notification. The Government may restrict transfers to specific countries based on factors related to national security, public order, or other considerations. This is a departure from earlier proposals requiring data to be stored only in India. However, the Government retains power to notify countries to which transfer is prohibited - startups should monitor such notifications.

Sector-Specific Data Localization Requirements: Several sector regulators have imposed stricter localization requirements that override general DPDP Act provisions. RBI Payment Data Localization (April 2018): All payment system operators must store entire data relating to payment systems operated by them in India only. This includes full end-to-end transaction details, information collected, carried, and processed as part of the message/payment instruction. Foreign leg of transaction may be stored abroad but domestic leg must be in India. Applies to: Payment aggregators, payment gateways, card networks, wallets, UPI apps.

Insurance Regulatory and Development Authority of India (IRDAI): IRDAI has issued guidelines requiring insurance companies to store policyholder data within India. Cloud computing guidelines require servers to be located in India for core and critical systems. Outsourcing arrangements must ensure data remains in India.

Securities and Exchange Board of India (SEBI): SEBI regulated entities must ensure that critical systems and data are located in India. Cloud computing framework requires data and data centers to be in India. Regulated entities include stock brokers, depositories, mutual funds, and investment advisers.

Telecommunications: Telecom service providers must maintain call detail records and subscriber information within India. Cannot transfer CDRs outside India without government permission.

Healthcare: While no specific localization mandate yet, Health Data Management Policy 2022 recommends storing health data within India. ABDM architecture designed for India-based data storage.

Practical Implementation Strategies: Cloud Provider Selection: Major cloud providers (AWS, Azure, GCP) offer India regions with data residency guarantees. Mumbai and Hyderabad regions available. Configure services to use India regions only for localized data. Use provider-specific data residency controls and compliance certifications.

Data Classification for Localization: Classify data based on localization requirements. Create data inventory mapping data types to applicable localization rules. Implement technical controls preventing localized data from leaving India.

Vendor Due Diligence for International Services: SaaS tools often process data internationally. For each vendor, assess: Where is data stored? Can India-only storage be configured? What data is transferred to the vendor? Does it include localized data categories? Implement Data Processing Agreements with localization commitments.

Cross-Border Transfer Mechanisms: For non-localized data that can be transferred under DPDP Act, implement appropriate safeguards. Standard Contractual Clauses: While not mandated yet, incorporating data protection commitments in vendor contracts is prudent. Binding Corporate Rules: For intra-group transfers, establish internal policies ensuring consistent protection. Consent-Based Transfer: Obtain explicit consent for transfers disclosing destination countries.

Compliance Documentation: Maintain records of transfer assessments. Document legal basis for each cross-border transfer. Keep vendor agreements with data protection commitments. Prepare for potential regulatory inquiries.',
        '["Map all data flows identifying where personal data is stored and processed - document which data falls under sector-specific localization requirements (payments, insurance, securities, telecom)", "Configure cloud infrastructure to ensure localized data categories remain in India regions - implement technical controls preventing cross-border transfer of restricted data", "Conduct vendor assessment for all international SaaS tools - identify which tools process localized data and evaluate India-based alternatives or data residency configurations", "Implement Data Processing Agreements with all vendors processing personal data including data localization commitments where applicable"]'::jsonb,
        '["Data Localization Requirement Matrix mapping regulatory requirements by sector with specific data categories requiring localization", "Cloud Provider India Region Configuration Guide for AWS, Azure, GCP covering data residency settings and compliance certifications", "Vendor Due Diligence Questionnaire for data localization assessment with scoring methodology and risk categorization", "Data Processing Agreement Template with India-specific localization clauses and cross-border transfer provisions"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 28: Data Breach Response and Notification
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        28,
        'Data Breach Response and Notification Framework',
        'Data breach incidents are increasingly common, and startups must be prepared with robust response procedures. The DPDP Act 2023 mandates breach notification to both the Data Protection Board and affected Data Principals, with significant penalties for non-compliance reaching up to Rs 200 crore.

DPDP Act 2023 Breach Notification Requirements: Personal Data Breach Definition: A breach of any security safeguard resulting in unauthorized access, disclosure, or loss of personal data processed by a Data Fiduciary. Mandatory Notification: Data Fiduciaries must notify the Data Protection Board of India of any personal data breach. Data Fiduciaries must also notify affected Data Principals. Timeline: Specific timelines will be prescribed in rules - expect requirements similar to GDPR (72 hours to authority) and Indian sector regulators (6 hours for critical sectors). Content: Notification must include nature of breach, categories of data affected, likely consequences, and mitigation measures.

CERT-In Incident Reporting Requirements (2022 Directions): CERT-In (Indian Computer Emergency Response Team) issued mandatory incident reporting requirements effective June 2022. Covered entities include service providers, intermediaries, data centers, body corporates, and government organizations. Reportable incidents include: Targeted scanning/probing of critical networks, Compromise of critical systems, Unauthorized access to IT systems/data, Website defacements, Malicious code attacks, Attacks on servers and network equipment, Identity theft and spoofing, Data breaches and data leaks, Attacks on critical infrastructure and IoT devices.

Timeline: Incidents must be reported within 6 hours of noticing the incident. Reporting through CERT-In designated email and portal. Log Retention: Organizations must maintain logs of ICT systems for rolling 180 days within Indian jurisdiction.

Sector-Specific Breach Notification: RBI Cyber Security Framework: Banks and NBFCs must report cyber security incidents within 2-6 hours depending on severity. RBI has established 24x7 incident response center. IRDAI Requirements: Insurance companies must report cyber incidents to IRDAI and CERT-In. Chief Information Security Officer must be designated. SEBI Requirements: Stock exchanges, depositories must report within 6 hours. Market infrastructure institutions have specific reporting protocols.

Building a Data Breach Response Plan: 1. Preparation Phase: Establish Incident Response Team with defined roles. Identify external resources: forensics firm, legal counsel, PR agency. Create incident classification framework. Conduct tabletop exercises simulating breach scenarios.

2. Detection and Analysis: Implement monitoring systems for breach indicators. Establish procedures for employee reporting of suspected incidents. Create initial assessment checklist to determine if incident is reportable breach.

3. Containment and Eradication: Short-term containment: Isolate affected systems. Evidence preservation: Capture forensic images before remediation. Eradication: Remove threat actors and malicious code. Long-term containment: Implement additional security controls.

4. Notification Procedures: Determine notification requirements based on data involved. Prepare notifications for Data Protection Board, CERT-In, sector regulators, and affected individuals. Engage legal counsel to review notifications. Document all notification activities.

5. Recovery and Lessons Learned: Restore systems from clean backups. Monitor for recurrence. Conduct post-incident review. Update security controls and response procedures.

Breach Communication Best Practices: For Regulatory Notifications: Be factual and precise. Include all required elements. Avoid speculation - state what is known and unknown. Provide timeline for further updates. For Affected Individuals: Use clear, non-technical language. Explain what happened and what data was affected. Describe actions being taken. Provide specific steps individuals should take. Offer support mechanisms (dedicated helpline, credit monitoring if applicable).

Insurance Considerations: Cyber liability insurance should cover: Breach investigation and forensics costs. Notification and credit monitoring costs. Regulatory defense and penalties (where insurable). Business interruption losses. Third-party liability claims. Coverage amounts: Minimum Rs 1-5 crore for early-stage startups, scaling with data volume and sensitivity.',
        '["Develop comprehensive Data Breach Response Plan covering detection, containment, investigation, notification, and recovery phases with defined roles and escalation procedures", "Register with CERT-In portal and configure systems for 180-day log retention as required by CERT-In 2022 Directions", "Prepare template notifications for Data Protection Board, CERT-In, and sector-specific regulators - have legal counsel pre-review to enable rapid response", "Obtain cyber liability insurance with appropriate coverage for breach costs including investigation, notification, regulatory defense, and third-party claims"]'::jsonb,
        '["Data Breach Response Plan Template with phase-wise procedures, role assignments, and decision trees for incident classification", "CERT-In Incident Reporting Guide with portal registration walkthrough, reportable incident categories, and notification format", "Breach Notification Template Suite covering Data Protection Board, CERT-In, sector regulators, and affected individual communications", "Cyber Insurance Coverage Checklist with recommended coverage amounts by stage and industry vertical"]'::jsonb,
        90,
        60,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Investment Documentation (Days 29-32)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Investment Documentation Mastery',
        'Master the legal documentation for fundraising in India including term sheets, SAFE notes, Shareholders'' Agreements, Share Subscription Agreements, and navigating investor negotiations with founder-protective provisions.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 29: Term Sheets and Key Provisions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        29,
        'Term Sheets - Understanding and Negotiating Key Provisions',
        'The term sheet is the foundational document that sets the stage for your entire investor relationship. While non-binding (except for certain provisions), the terms agreed here will be translated into definitive legal agreements. Understanding each provision and its implications is critical before signing.

Term Sheet Overview and Legal Status: A term sheet outlines the principal terms of an investment, typically prepared by the lead investor after initial discussions. Most provisions are non-binding - they express intent but create no legal obligation to close the transaction. However, certain provisions are typically binding: exclusivity/no-shop period (preventing you from talking to other investors), confidentiality, and governing law. In India, term sheets follow formats similar to global VC practice with some India-specific elements.

Economic Terms - Valuation and Pricing: Pre-Money Valuation: Company valuation before the investment is made. Your ownership percentage is calculated as: Founder Ownership = Pre-Money / Post-Money (where Post-Money = Pre-Money + Investment). Option Pool Expansion: Investors often require expansion of ESOP pool before investment. If expansion is from pre-money valuation, founders bear the dilution entirely. Negotiate for post-money pool expansion or smaller pool size. Price Per Share: Investment amount divided by shares issued determines price per share for this round. Future rounds at lower price (down round) trigger anti-dilution protection.

Liquidation Preference: Defines how proceeds are distributed in an exit (acquisition, IPO, or liquidation). 1x Non-Participating: Investors get back their investment OR convert to common stock - whichever is higher. This is founder-friendly. 1x Participating: Investors get their investment back AND participate in remaining proceeds pro-rata. This is investor-friendly and effectively gives investors double-dip. Participating with Cap: Middle ground where participation is capped at a multiple (e.g., 2-3x). Multiple Liquidation Preference: 2x or 3x means investors get that multiple of investment before founders see any proceeds. Resist multiples above 1x.

Anti-Dilution Protection: Protects investors if future rounds are at lower valuation (down rounds). Full Ratchet: Investor''s price adjusted to new lower price entirely - very punitive to founders. Broad-Based Weighted Average: Adjustment considers both price and amount of new round - more balanced approach. Industry standard in India is broad-based weighted average with carve-outs for ESOPs and small bridge rounds.

Control Terms - Board Composition: Investor Board Seats: Number of board seats investors receive. Typical: 1 seat for Series A, sometimes 2 for larger rounds. Consider board size - 3-5 members is manageable, larger boards create governance overhead. Observer Rights: Investors may request board observer rights even without full board seat. Independent Directors: Some term sheets require independent directors - can be helpful for governance. Founder Board Control: Negotiate to maintain majority founder/management representation at least through Series A.

Protective Provisions (Veto Rights): These are matters requiring investor consent, effectively giving investors veto power. Standard protective provisions include: Changes to share capital or rights. Issuance of new securities (except ESOP). Sale, merger, or liquidation of company. Changes to board size or composition. Amendment to constitutional documents. Transactions with related parties above threshold. Incurring debt above specified limit. Changing business or corporate form.

Negotiate to limit scope and include reasonable materiality thresholds. Avoid giving individual investor veto - require consent of majority of preferred.

Pro-Rata and Participation Rights: Pro-Rata Rights: Right to participate in future rounds to maintain ownership percentage. Super Pro-Rata: Right to invest more than pro-rata share - resist this as it can crowd out new investors. Right of First Refusal: Right to purchase shares before they''re sold to third parties. Pay-to-Play: Requires investors to participate in future rounds to maintain their rights - can be founder-friendly.

Information Rights: Investors typically receive: Monthly/quarterly financial statements, annual audited financials, annual budget, and cap table updates. Negotiate reasonable scope and timing. Ensure confidentiality provisions prevent misuse.',
        '["Before receiving term sheet, establish your must-haves and nice-to-haves on key terms - know your walk-away points on valuation, liquidation preference, and control provisions", "When reviewing term sheet, create term-by-term comparison with founder-friendly benchmarks - identify provisions requiring negotiation", "Engage experienced startup lawyer to review term sheet before signing - investment in legal advice here prevents costly mistakes in definitive documents", "If multiple term sheets, create comparison matrix on economic and control terms - don''t choose solely on valuation, consider investor quality and terms comprehensively"]'::jsonb,
        '["Term Sheet Anatomy Guide with clause-by-clause explanation of economic, control, and governance provisions with founder-friendly benchmarks", "Term Sheet Negotiation Playbook covering common negotiation positions, market standards in India, and red flags to avoid", "Term Sheet Comparison Template for evaluating multiple offers across valuation, liquidation preference, control, and investor quality dimensions", "Founder-Friendly Term Sheet Template as reference for what good terms look like in Indian context"]'::jsonb,
        90,
        60,
        0,
        NOW(),
        NOW()
    );

    -- Day 30: SAFE Notes and Convertible Instruments
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        30,
        'SAFE Notes and Convertible Instruments for Indian Startups',
        'Simple Agreements for Future Equity (SAFEs) and convertible notes have become popular instruments for early-stage fundraising due to their simplicity and speed. However, their use in India requires careful structuring to comply with Companies Act and exchange control regulations.

Understanding SAFE Notes: SAFE (Simple Agreement for Future Equity) was developed by Y Combinator in 2013 as a simpler alternative to convertible notes. Key characteristics: Not debt - no interest, no maturity date. Converts to equity upon triggering event (typically priced equity round). Conversion at discount and/or valuation cap. Simple 5-page document versus 20+ page convertible note.

SAFE Variants: Post-Money SAFE (YC Standard since 2018): Valuation cap is post-money including the SAFE itself. Clearer dilution calculation - investor knows exactly what percentage they''re getting. Pro-rata rights included. Pre-Money SAFE (Original): Valuation cap is pre-money. Conversion percentage depends on how much is raised in the equity round. Less clarity on dilution. MFN (Most Favored Nation) SAFE: No valuation cap, but if later SAFE has better terms, these terms apply. Used when valuation is particularly uncertain.

Discount vs Valuation Cap: Discount: SAFE converts at a percentage discount to the price per share in qualified financing. Typical: 10-20% discount. Valuation Cap: Maximum valuation at which SAFE converts, protecting investor from very high next-round valuation. Can have both: Converts at whichever results in lower price (better for investor).

Legal Considerations for SAFEs in India: Companies Act Compliance: SAFEs are considered hybrid instruments, not pure debt or equity. Section 42 (Private Placement): SAFEs may need to comply with private placement requirements. Section 71 (Debentures): If structured as debenture, requires debenture trustee and secured/unsecured classification.

RBI/FEMA Considerations for Foreign Investment: Foreign investors investing through SAFE face FEMA complications. FEMA recognizes only specific instruments: equity shares, CCDs, CCD alternatives. Pure SAFEs (as used in US) don''t fit neatly into FEMA categories. Compulsorily Convertible Debentures (CCDs) are the FEMA-compliant alternative with fixed conversion timeline (maximum 10 years, typically 18 months).

Structuring India-Compliant Convertible Instruments: Compulsorily Convertible Debentures (CCDs): Debt instrument that must convert to equity at or before maturity. Recognized under FEMA for foreign investment. Conversion price can be formula-based (linked to next equity round). Coupon rate can be nominal (0.001%) to minimize tax leakage. Requires board and shareholder approval, private placement compliance. Valuation report required at time of issuance for FDI pricing compliance.

Compulsorily Convertible Preference Shares (CCPS): Equity-like instrument with conversion feature. Counts as FDI from day one (unlike CCDs which are debt until conversion). Conversion ratio can be formula-based. Requires compliance with pricing guidelines for foreign investment.

Key Terms to Negotiate in Convertible Instruments: Valuation Cap: Primary protection mechanism. Negotiate realistic cap based on current traction. Discount Rate: Typically 15-20% for early stage. Qualified Financing Threshold: Minimum raise that triggers conversion. Set realistically - too high may never trigger. Conversion Mechanics: Automatic vs optional conversion. Timing of conversion. Most Favored Nation: Protection if later convertibles have better terms. Pro-Rata Rights: Right to participate in future rounds.

Documentation Requirements: Board Resolution approving issuance. Shareholders Resolution (special resolution for debentures). Private Placement Offer Letter. CCD/CCPS Subscription Agreement with conversion terms. Debenture Trust Deed (if applicable). RBI filings: FC-GPR within 30 days of allotment for foreign investment. Valuation Report from registered valuer.',
        '["Understand the regulatory constraints on using US-style SAFEs in India - consult with lawyer on appropriate instrument structure (CCD vs CCPS) for your investor profile", "If raising from Indian angels, evaluate whether simplified iSAFE format is acceptable or whether CCD structure is required", "For foreign investors, structure investment as CCD with appropriate conversion terms, coupon rate, and conversion timeline compliant with FEMA pricing guidelines", "Prepare required documentation: board resolutions, private placement compliance, valuation report, and ensure post-allotment RBI filings are completed within 30 days"]'::jsonb,
        '["India-Compliant SAFE Alternatives Guide comparing CCD, CCPS, and iSAFE structures with regulatory requirements and investor suitability", "CCD Term Sheet Template with founder-friendly provisions, conversion mechanics, and FEMA-compliant pricing structure", "Convertible Instrument Documentation Checklist covering board approvals, shareholder resolutions, private placement compliance, and RBI filings", "Conversion Mechanics Calculator modeling different scenarios of conversion under various valuation cap and discount combinations"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 31: Shareholders Agreement Deep Dive
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        31,
        'Shareholders Agreement - Critical Provisions and Negotiation',
        'The Shareholders'' Agreement (SHA) is the definitive document governing the relationship between founders, the company, and investors. Unlike the non-binding term sheet, the SHA creates legally enforceable rights and obligations that will govern your company for years.

SHA Structure and Parties: Parties: Company, all existing shareholders (founders), and new investors. The SHA binds all parties, creating a contractual framework alongside the company''s Articles of Association. SHAs typically require new shareholders to sign a Deed of Adherence to be bound by existing SHA terms. SHA should be consistent with Articles - amendments to Articles may be needed.

Equity and Capital Structure Provisions: Share Capital: Authorized and issued capital, share classes and their rights. ESOP Pool: Size of option pool, vesting schedules, administration. Future Issuances: Restrictions on issuing new shares without consent, anti-dilution mechanisms. Transfer Restrictions: Lock-in periods for founders (typically 2-4 years), restrictions on share transfers.

Governance Provisions in Detail: Board Composition: Specifies number of directors, nomination rights. Typically: Founders nominate 2-3, investors nominate 1-2, independents 0-1. Board Procedures: Meeting frequency (minimum quarterly), quorum requirements, voting thresholds. Reserved Matters: Matters requiring board supermajority or investor director consent. These effectively give investors veto over major decisions.

Common Reserved Matters (Negotiate Thresholds Carefully): Any change in share capital or rights attached to shares. Issuance of shares or options (except from approved ESOP pool). Sale, merger, acquisition, or liquidation. Material asset sales or acquisitions above threshold. Related party transactions above threshold. Annual budget approval. Debt above specified limit. Changes to business scope. Key executive appointments/removals. Dividend declarations.

Protective Provisions (Shareholder Level): Beyond board reserved matters, certain actions require consent of majority or supermajority of preferred shareholders. These typically include: Amendment of SHA or Articles. Changes to preferential rights. Redemption or buyback of shares. Creation of new share class ranking senior to preferred. IPO terms and timing.

Transfer Provisions: Right of First Refusal (ROFR): If shareholder wants to sell, other shareholders have right to buy first at same terms. Prevents unwanted third parties from becoming shareholders. Tag-Along (Co-Sale): If founders sell, investors can sell same proportion at same terms. Protects minority investors from being left behind in a sale. Drag-Along: If majority shareholders (typically defined threshold like 75%) agree to sell, they can compel all shareholders to sell. Enables clean exits. Negotiate for: Price floor, investor majority approval requirement.

Exit Provisions: Liquidation Preference: Detailed waterfall specifying distribution of proceeds. Redemption Rights: Investor right to require company to buy back shares after specified period (typically 5-7 years) if no liquidity event. Often triggers ESOP and founder buyouts first. IPO Provisions: Timeline for IPO planning, lock-up requirements, registration rights.

Founder Provisions (Protect These): Founder Vesting Continuation: Ensure existing vested equity is not affected. Employment Terms: Salary, role, reporting should be reasonable and not unilaterally changeable. Non-Compete Scope: Negotiate reasonable geographic and time limitations. Removal Protections: Require cause for founder removal from board/employment.

Representations and Warranties: Company makes representations about its legal status, compliance, financials, material contracts, IP ownership, litigation, etc. Founders may make additional representations. Materiality qualifiers and knowledge qualifiers help limit exposure. Disclosure Schedule lists known exceptions to representations.',
        '["Before SHA negotiation, prepare comprehensive list of your priorities on governance (board control, reserved matters thresholds), transfers (founder lock-in period, ROFR mechanics), and exits (drag-along triggers, redemption terms)", "Review each reserved matter carefully - negotiate appropriate thresholds based on materiality and ensure day-to-day operations are not impaired", "Protect founder positions through employment terms, vesting protection, removal provisions, and reasonable non-compete scope", "Coordinate SHA terms with Articles of Association - ensure consistency and make necessary amendments to Articles"]'::jsonb,
        '["SHA Clause-by-Clause Guide with explanation of each standard provision, founder-friendly positions, and negotiation strategies", "Reserved Matters Matrix comparing typical thresholds by round stage with guidance on which matters are negotiable", "Founder Protection Provisions Checklist covering employment, vesting, board, and non-compete protections", "SHA Review Checklist for identifying problematic provisions and ensuring completeness"]'::jsonb,
        90,
        60,
        2,
        NOW(),
        NOW()
    );

    -- Day 32: Share Subscription Agreement and Closing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        32,
        'Share Subscription Agreement and Transaction Closing',
        'The Share Subscription Agreement (SSA) governs the actual purchase of shares by investors. While the SHA addresses ongoing governance, the SSA focuses on the mechanics of this specific investment transaction, including conditions to closing, representations, and warranties.

SSA Purpose and Relationship to Other Documents: The SSA is the contract for the sale and purchase of shares in this specific financing round. Typically executed simultaneously with SHA, with cross-references between documents. SSA covers: Who is buying, what they''re buying, at what price, subject to what conditions, with what representations. Often combined with SHA in a single document for simplicity, particularly in early rounds.

Key SSA Provisions: Subscription and Allotment: Specifies exact number and class of shares being subscribed. Price per share and aggregate investment amount. Timing of payment and share allotment.

Conditions Precedent to Closing: Investor obligations to close are typically conditional on: Execution of all transaction documents (SHA, employment agreements, IP assignments). Board and shareholder approvals. No material adverse change in company. Completion of legal due diligence to investor satisfaction. Receipt of specified regulatory approvals (if any). Legal opinion from company counsel. Representations and warranties being true at closing.

Representations and Warranties in Detail: Company Representations: Organization and Good Standing: Company is validly incorporated and in good standing. Authorization: Transaction is properly authorized by board and shareholders. Capitalization: Cap table is accurate, no undisclosed equity grants. No Conflicts: Transaction doesn''t violate any law, contract, or organizational document. Financial Statements: Financials provided are accurate and prepared consistently. Compliance: Company complies with applicable laws and regulations. Material Contracts: All material contracts disclosed, no defaults. Intellectual Property: Company owns or has rights to all IP used in business. Litigation: No pending or threatened litigation not disclosed. Taxes: All taxes properly filed and paid. Employees: Proper employment arrangements, no disputes.

Founder Representations (if required): Accuracy of information provided during diligence. No conflicts with prior employment. IP assignment compliance. Good character and background.

Disclosure Schedule: Lists exceptions to representations. Buyer''s knowledge of disclosed matters prevents later claims. Careful preparation critical - disclose anything potentially problematic. Better to over-disclose than face warranty claims later.

Indemnification Provisions: Founders and/or company may indemnify investors for losses arising from breach of representations. Key negotiations: Survival period (how long representations last). Cap on indemnity (often limited to investment amount for founders, higher for company). Basket/deductible before indemnity kicks in. Carve-outs for fraud or intentional breach.

Transaction Closing Process: Pre-Closing: Finalize and circulate all documents. Complete conditions precedent. Prepare funds for transfer. Schedule signing/closing meeting. Signing: Execute all transaction documents. Deliver signed documents to all parties.

Payment and Allotment: Investor transfers subscription amount to company bank account. For foreign investors: funds received through proper banking channels with FIRC. Company allots shares to investor. Share certificates issued (or statement in lieu for demat).

Post-Closing Filings (Critical for Compliance): Within 15 days: File MGT-14 (board resolutions) with ROC. Within 30 days: File PAS-3 (return of allotment) with ROC. Within 30 days: File FC-GPR with RBI (for foreign investment). Within 60 days: Issue share certificates. Update company registers: Register of Members, Register of Directors.

Cap Table Update: Update cap table reflecting new issuance. Distribute updated cap table to all shareholders. Update ESOP pool records if applicable.',
        '["Prepare comprehensive Disclosure Schedule capturing all exceptions to representations - engage with legal counsel to ensure nothing material is omitted", "Create closing checklist tracking all documents, approvals, and conditions precedent with responsible parties and deadlines", "Coordinate with company secretary or legal counsel on post-closing filings: MGT-14, PAS-3, FC-GPR (for FDI) - set reminders for filing deadlines", "Establish closing funds flow: ensure company bank account can receive foreign currency (if applicable) and coordinate wire timing with investor"]'::jsonb,
        '["SSA Template with founder-friendly indemnification provisions, reasonable representation scope, and comprehensive closing mechanics", "Disclosure Schedule Template with category-wise organization and guidance on what to disclose under each representation", "Transaction Closing Checklist covering all documents, approvals, signings, and post-closing filings with responsibility assignments", "Post-Closing Filing Guide for ROC filings (MGT-14, PAS-3) and RBI filings (FC-GPR) with timelines and consequences of delay"]'::jsonb,
        90,
        60,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Corporate Governance (Days 33-36)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Corporate Governance Framework',
        'Implement best-practice corporate governance for startups including board meeting procedures, corporate resolutions, statutory registers, and annual compliance under the Companies Act 2013.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 33: Board Governance and Meetings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        33,
        'Board Governance and Meeting Procedures',
        'Effective board governance is not just a legal requirement but a competitive advantage. Well-run boards provide strategic guidance, accountability, and credibility with investors, partners, and customers. Understanding and implementing proper board procedures from the early stages builds good governance habits that scale.

Board Composition Under Companies Act 2013: Minimum Directors: Private company: minimum 2 directors. Public company: minimum 3 directors. Maximum 15 directors (can increase with special resolution). One Person Company: minimum 1 director (and nominee director). Director Qualifications: Must be an individual (not company or firm). DIN (Director Identification Number) required. Minimum one director resident in India (stayed in India for at least 182 days in previous calendar year).

Small Company Exemptions (Important for Startups): Small Company Definition (Section 2(85)): Paid-up capital not exceeding Rs 4 crore AND turnover not exceeding Rs 40 crore. Exemptions include: Cash flow statement not required in financials. Only 2 board meetings per year required (instead of 4). Rotation of auditors not mandatory. CSR provisions not applicable. Lower filing fees.

Board Meeting Requirements: Frequency: First meeting within 30 days of incorporation. Minimum 4 meetings per year (2 for small company). Gap between meetings not more than 120 days. Quorum: One-third of total strength or 2 directors, whichever is higher. Interested directors not counted in quorum for that matter. Notice: 7 days advance notice required. Shorter notice allowed if at least one independent director (if any) agrees. Video Conference permitted for most matters.

Conducting Board Meetings: Notice Requirements: Written notice to all directors at registered address. Must include date, time, venue (physical or video), agenda items. Supporting documents for agenda items should accompany notice.

Agenda Preparation: Standard items: Confirmation of previous minutes, matters arising, financial review. Strategic items: Business updates, key decisions requiring board approval. Compliance items: Disclosure review, regulatory updates. Reserved matters as per SHA requiring board approval.

Meeting Procedure: Chairperson calls meeting to order, confirms quorum. Previous meeting minutes reviewed and confirmed. Agenda items presented and discussed. Resolutions proposed, voted upon, results recorded. Action items assigned with timelines. Date of next meeting confirmed.

Minutes of Meeting: Required Contents Under Section 118: Date, time, venue of meeting. Names of directors present. Nature of interest of directors if any matter has interested director. Summary of discussion and decisions. Dissenting views (if director requests recording). Resolutions passed with voting pattern.

Timeline: Draft minutes within 15 days of meeting. Circulate to all directors for comments. Finalize and enter in minutes book within 30 days. Sign by chairperson of meeting or subsequent meeting.

Preservation: Minutes books maintained at registered office. Preserved permanently (8 years minimum for certain records).

Video Conference Meetings: Permitted under Section 173(2) for most matters. Excluded matters: Approval of annual financial statements. Approval of Board''s Report. Approval of prospectus. Audit Committee meetings for specified matters. Requirements for valid VC meeting: Proper recording of proceedings required. Scheduled start and end time. Roll call to confirm attendance. Chairperson ensures all participants can hear and participate.',
        '["Establish board meeting calendar scheduling minimum required meetings (4 per year, or 2 if small company) with 120-day gap compliance", "Create standardized board pack template including notice, agenda, supporting documents, and previous meeting minutes", "Implement minutes documentation process ensuring draft within 15 days, finalization within 30 days, and proper maintenance of minutes book", "Set up compliant video conferencing capability for board meetings with recording, attendance confirmation, and proper documentation procedures"]'::jsonb,
        '["Board Meeting Calendar Template with 120-day gap calculation and small company exemption applicability assessment", "Board Pack Template with notice format, agenda structure, and supporting document organization", "Minutes of Meeting Template meeting Section 118 requirements with sample resolutions for common board actions", "Video Conference Meeting Protocol covering technology requirements, attendance confirmation, and recording procedures"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 34: Corporate Resolutions and Decision-Making
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        34,
        'Corporate Resolutions and Decision-Making Framework',
        'Corporate decisions in a company must be made through proper resolutions - either by the board of directors or by shareholders. Understanding which decisions require which type of resolution and the procedures for each is fundamental to corporate governance compliance.

Board Resolutions: Types of Board Resolutions: Ordinary Resolution: Passed by simple majority of directors present and voting. Used for routine business matters. Special Resolution (Board Level): Some matters require unanimous or supermajority board approval as per Articles or SHA. Not a Companies Act term but contractual requirement.

Common Matters Requiring Board Resolution: Approval of financial statements and Board''s Report. Recommendation of dividend. Making calls on shares. Authorizing buy-back of shares (with shareholder approval). Approving related party transactions. Borrowing money (within limits). Investing funds. Granting loans or guarantees. Appointment of key managerial personnel. Approving contracts above specified value.

Circular Resolution (Resolution by Circulation): For urgent matters requiring board approval between meetings. Procedure: Draft resolution circulated to all directors. Each director signs indicating approval or dissent. Requires approval by majority of directors entitled to vote. Minimum one-third or 2 directors (whichever higher) must approve. Cannot be used if any director requests matter be discussed at meeting. Must be noted in minutes of next board meeting.

Shareholder Resolutions: Ordinary Resolution (Section 114): Requires simple majority (more than 50%) of members present and voting. Used for: Adoption of annual accounts. Declaration of dividend. Appointment of auditors. Appointment/removal of directors (except as otherwise required). Approval of related party transactions (with interested party abstaining).

Special Resolution (Section 114): Requires 75% majority of members present and voting. Also requires 21 days'' notice specifying intention to propose as special resolution. Used for: Alteration of Articles of Association. Alteration of Memorandum (objects, name, etc.). Issue of shares on preferential basis. Buy-back of shares. Reduction of share capital. Change of registered office from one state to another. Conversion of company (public to private or vice versa). Removal of auditor before term completion.

Shareholder Meetings: Annual General Meeting (AGM): Must be held within 6 months of financial year end (15 months for first AGM from incorporation). Gap between AGMs not more than 15 months. Business: Adoption of accounts, declaration of dividend, appointment of auditors, appointment of directors retiring by rotation.

Extraordinary General Meeting (EGM): Called when any business requiring shareholder approval cannot wait for AGM. Board can call EGM on its own motion. Shareholders holding 10%+ of paid-up capital can requisition EGM.

Notice Requirements: AGM: 21 clear days (can be shorter with 95% shareholder consent). EGM with special resolution: 21 clear days. EGM with ordinary resolution: 21 clear days (or shorter with consent).

Written Resolutions (Private Companies): Private companies can pass resolutions without holding meeting. Circulation to all members. Approval by requisite majority (based on shareholding, not votes present). Minimum signature by members holding majority voting rights. Cannot be used for director removal.

Resolution Filing with ROC: Many resolutions must be filed with Registrar of Companies. Form MGT-14 within 30 days of passing. Resolutions requiring filing include: Special resolutions. Ordinary resolutions (specified categories: voluntary winding up, appointment of auditors to fill casual vacancy, etc.). Board resolutions for specified matters (borrowing limits, investment limits, etc.). Late filing penalties: Normal fee plus additional fee (2-12 times normal fee depending on delay).',
        '["Create resolution library covering common board and shareholder decisions with proper format and voting requirements", "Implement resolution tracking system documenting all resolutions passed, date, type, and filing status", "Establish ROC filing workflow for MGT-14 ensuring timely filing within 30 days of resolution passing", "Train team on difference between matters requiring ordinary vs special resolution and board vs shareholder approval"]'::jsonb,
        '["Board Resolution Template Library covering 25+ common resolutions with proper format and recording requirements", "Shareholder Resolution Guide distinguishing ordinary and special resolution requirements with notice and majority requirements", "Resolution Tracking Register template for documenting all corporate resolutions with filing status", "MGT-14 Filing Guide with step-by-step process, timeline, and late filing penalty calculation"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 35: Statutory Registers and Records
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        35,
        'Statutory Registers and Corporate Records Management',
        'Companies Act 2013 mandates maintenance of various statutory registers and records. These documents serve as official records of the company''s ownership, governance, and key transactions. Proper maintenance is a legal requirement, and these records are critical during due diligence, audits, and regulatory inspections.

Register of Members (Section 88): Purpose: Official record of all shareholders showing name, address, shares held, and payment status. Contents: Name, address, and occupation of each member. Number and class of shares held. Amount paid/unpaid on shares. Date of becoming/ceasing to be member. Distinctive numbers of shares. Maintenance: Kept at registered office (or other notified place). Open for member inspection during business hours. Must be updated within 7 days of any change.

Index of Members (Section 88): Required if members exceed 50. Sufficient indication to enable entry for each member to be readily found.

Register of Directors and KMP (Section 170): Required for all companies. Contents for each director: Name, DIN, present and permanent address, nationality, occupation. Date of birth, date of appointment, terms. Directorships in other companies. Similar details for Key Managerial Personnel. Filed with ROC in Form DIR-12 on any change.

Register of Directors'' Shareholding (Section 170): Contents: Shares/debentures held by directors, spouse, and children. Changes must be recorded within 7 days. Basis for insider trading compliance.

Register of Charges (Section 85): Records all charges (security interests) created on company assets. Details: Nature of charge, property charged, amount secured, charge holder details. Must register with ROC within 30 days of charge creation. Charge creation Form CHG-1, modification Form CHG-2, satisfaction Form CHG-4.

Register of Significant Beneficial Owners (Section 90): Recent requirement (2019) for reporting beneficial ownership. Declaration required from persons holding significant beneficial interest (exceeding 10%). Company maintains register and files with ROC.

Minutes Books: As discussed, minutes of board meetings, committee meetings, and general meetings. Preserved for 8 years (permanently advisable).

Books of Account (Section 128): Financial records maintained at registered office. Includes: All money received and expended. All sales and purchases. Assets and liabilities. Cost records (if applicable). Must be preserved for 8 financial years preceding current year.

Record Retention Requirements: Permanent Retention: Memorandum and Articles of Association. Register of Members. Register of Directors. Minutes books. Records related to formation. 8 Years: Books of account. Vouchers and supporting documents. 5-10 Years: Employment records. Tax records. Contracts (varies by contract).

Due Diligence Readiness: Well-maintained records enable smooth due diligence. Organize records for quick retrieval. Index and digitize key documents. Create summary sheets for each register. Regular internal audit of record completeness.',
        '["Audit existing statutory registers for completeness - ensure Register of Members, Directors, Charges, and others are current and accurate", "Implement register update procedures with defined timelines (within 7 days of change) and responsible persons", "Digitize all statutory registers while maintaining physical originals as required - implement backup procedures", "Create due diligence ready file with indexed copies of all registers, key resolutions, and corporate documents"]'::jsonb,
        '["Statutory Register Compliance Checklist covering all mandatory registers with format and update requirements", "Register of Members Template with all required fields and change tracking", "Corporate Records Retention Schedule with required retention periods by document type", "Due Diligence Document Organization Guide for maintaining investment-ready records"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 36: Annual Compliance and Filings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        36,
        'Annual Compliance Calendar and MCA Filings',
        'Every company registered in India must comply with annual filing requirements under the Companies Act 2013. The Ministry of Corporate Affairs (MCA) portal is the primary interface for these filings. Missing deadlines results in penalties and can lead to company being marked as defaulting or even struck off.

Annual Filing Overview: Two key annual filings for all companies: AOC-4: Financial Statements. MGT-7/MGT-7A: Annual Return. These filings must be completed after each financial year (typically April to March). Deadlines are strict with escalating penalties for delays.

AOC-4 Filing (Financial Statements): Contents: Balance Sheet. Profit and Loss Account. Cash Flow Statement (not required for small company or OPC). Notes to Accounts. Auditor''s Report. Board''s Report.

Deadline: Within 30 days of AGM. Since AGM must be within 6 months of year-end, AOC-4 deadline effectively is October 30 for March year-end companies.

Attachments: Financial statements (signed by director and auditor). Board''s Report. Auditor''s Report. Declaration regarding annual return. Statement of subsidiary details (if applicable).

Certification: Chartered Accountant certification required if company does not have Company Secretary.

MGT-7/MGT-7A (Annual Return): MGT-7A: Simplified annual return for One Person Company and small companies. MGT-7: Detailed annual return for others.

Contents: Registered office and company details. Principal business activities. Shareholding pattern. Share transfers during year. Details of holding/subsidiary companies. Members and debenture holders details. Directors and KMP details. Meetings held during year. Remuneration of directors and KMP. Matters relating to certification of compliances.

Deadline: Within 60 days of AGM. Effective deadline: November 29 for March year-end companies.

Certification: MGT-7 must be certified by practicing Company Secretary for companies with paid-up capital of Rs 10 crore+ or turnover Rs 50 crore+.

Other Annual Compliances: ADT-1 (Auditor Appointment): Within 15 days of AGM where auditor appointed. DIR-3 KYC: Annual KYC for all directors - due September 30 each year. Failure to file: DIN deactivated and Rs 5,000 penalty. BEN-2 (Significant Beneficial Ownership): If applicable, filed when declarations received.

Penalty Structure for Late Filing: Normal Fee + Additional Fee based on delay. Up to 30 days: 2x normal fee. 30-60 days: 4x normal fee. 60-90 days: 6x normal fee. 90-180 days: 10x normal fee. Beyond 180 days: 12x normal fee. For AOC-4: Additional Rs 100/day for continued default. For MGT-7: Additional Rs 100/day for continued default.

Non-Filing Consequences: Company marked as defaulter on MCA portal. Directors disqualified if defaults in 3 consecutive years. Company can be struck off register for continuous defaults. Difficulties in getting bank loans, contracts, due diligence.

Compliance Calendar Implementation: April: Initiate financial statement preparation. May: Complete financials, begin audit. June: Finalize audit, prepare Board''s Report. July-September: Hold AGM (within 6 months of year-end). September 30: DIR-3 KYC due for all directors. October 30: AOC-4 filing deadline (within 30 days of AGM). November 29: MGT-7/MGT-7A deadline (within 60 days of AGM).',
        '["Create company-specific compliance calendar with all annual filing deadlines, responsible persons, and reminder triggers at 30, 15, and 7 days before each deadline", "Establish financial statement preparation process ensuring audit completion and AGM scheduling allows for AOC-4 and MGT-7 filing within deadlines", "Complete DIR-3 KYC for all directors before September 30 each year to avoid DIN deactivation", "Implement annual compliance health check process reviewing all filings, registers, and outstanding compliances before financial year end"]'::jsonb,
        '["Annual Compliance Calendar Template with all MCA filing deadlines, advance preparation requirements, and penalty calculations", "AOC-4 Filing Checklist with document requirements, certification needs, and step-by-step MCA portal guidance", "MGT-7 Annual Return Preparation Guide with data gathering requirements, certification thresholds, and filing procedure", "Compliance Health Check Worksheet for annual review of all statutory compliances with remediation tracking"]'::jsonb,
        90,
        60,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Dispute Resolution (Days 37-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Dispute Resolution Framework',
        'Master dispute resolution in India including commercial arbitration under the Arbitration and Conciliation Act 1996, mediation, litigation strategy, and designing effective dispute resolution clauses.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 37: Arbitration Under Indian Law
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        37,
        'Commercial Arbitration Under the Arbitration and Conciliation Act 1996',
        'Arbitration has become the preferred dispute resolution mechanism for commercial contracts in India due to its flexibility, confidentiality, and (theoretically) faster resolution. The Arbitration and Conciliation Act 1996, significantly amended in 2015, 2019, and 2021, provides the legal framework.

Why Arbitration for Startups: Speed: Arbitration is designed to be faster than court litigation, though Indian arbitration has historically faced delays. Flexibility: Parties choose arbitrators, procedures, language, and venue. Confidentiality: Unlike court proceedings, arbitration is private. Expertise: Arbitrators with subject matter expertise can be selected. Enforceability: Awards enforceable internationally under New York Convention.

Arbitration Act 1996 Structure: Part I: Domestic arbitration and international commercial arbitration seated in India. Part II: Enforcement of certain foreign awards (New York Convention and Geneva Convention). Part III: Conciliation proceedings.

Types of Arbitration: Ad Hoc Arbitration: Parties design their own procedure. Suitable for smaller disputes with experienced parties. Risk of procedural disputes and delays.

Institutional Arbitration: Administered by established institutions. Popular Indian institutions: Mumbai Centre for International Arbitration (MCIA), Delhi International Arbitration Centre (DIAC), Indian Council of Arbitration (ICA). International institutions used in India: Singapore International Arbitration Centre (SIAC), ICC, LCIA. Advantages: Established rules, administrative support, panel of arbitrators.

Drafting Effective Arbitration Clauses: Essential Elements: Agreement to arbitrate all disputes arising from contract. Seat of arbitration (jurisdiction whose procedural law applies). Venue (physical location of hearings - can differ from seat). Rules governing arbitration (institutional rules or ad hoc). Number of arbitrators (1 or 3). Language of arbitration. Governing law of contract (substantive law).

Sample Institutional Arbitration Clause: Any dispute arising out of or in connection with this Agreement shall be finally settled by arbitration administered by [Institution] in accordance with its Arbitration Rules. The seat of arbitration shall be [City, India]. The Tribunal shall consist of [one/three] arbitrator(s). The language of arbitration shall be English. The governing law of this Agreement shall be the laws of India.

Ad Hoc Arbitration Clause: Include reference to Arbitration Act 1996. Specify appointing authority for arbitrators if parties cannot agree. Detail procedural rules (or reference standard rules).

Key 2015/2019/2021 Amendments: Timeline: Award must be made within 12 months of tribunal constitution, extendable by 6 months by parties. Court can extend in exceptional circumstances. Automatic Stay Removed: Filing challenge to award no longer automatically stays enforcement. Stay only if court grants. Qualification of Arbitrators: Eighth Schedule specifies qualifications. Independence requirements strengthened. Institutional Arbitration Promoted: Arbitration Council of India to grade institutions. Institutional arbitrations encouraged over ad hoc.

Seat vs Venue Significance: Seat determines supervisory court jurisdiction and applicable procedural law. Venue is merely location of hearings. If only venue specified, courts may interpret it as seat. Be explicit about seat in arbitration clause.

Costs of Arbitration: Arbitrator fees: Schedule IV provides indicative fee schedule based on claim value. Institutional administration fees vary. Legal costs often significant. Small claims (under Rs 1 crore) may not be cost-effective for full arbitration.',
        '["Review all commercial contracts for arbitration clause adequacy - ensure seat, rules, number of arbitrators, and language are clearly specified", "Select preferred arbitration institution based on nature of counterparties - MCIA/DIAC for domestic, SIAC for international", "Create standard arbitration clause for different contract types (customer, vendor, partner) with appropriate variations", "Understand cost-benefit of arbitration vs other dispute resolution for different dispute values"]'::jsonb,
        '["Arbitration Act 1996 Key Provisions Guide covering domestic and international arbitration with 2015/2019/2021 amendments", "Arbitration Clause Template Library with variations for institutional vs ad hoc, domestic vs international, different seat options", "Arbitration Institution Comparison covering MCIA, DIAC, SIAC with fee schedules, rules summary, and selection guidance", "Arbitration Cost Estimator by claim value covering arbitrator fees, institutional fees, and typical legal costs"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 38: Mediation and Alternative Dispute Resolution
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        38,
        'Mediation and Alternative Dispute Resolution Mechanisms',
        'While arbitration receives more attention, mediation and other ADR mechanisms can be more appropriate for many commercial disputes, particularly when preserving business relationships is important. The Mediation Act 2023 has now provided a comprehensive framework for mediation in India.

Mediation Overview: Mediation is a facilitated negotiation where a neutral third party (mediator) helps parties reach a mutually acceptable resolution. Key characteristics: Voluntary (parties control outcome), confidential, flexible, relationship-preserving. Unlike arbitration, mediator does not impose a decision.

Mediation Act 2023: India enacted the Mediation Act 2023, providing first comprehensive legislation for mediation. Key Provisions: Mediation can be court-referred or private. Pre-litigation mediation encouraged (Section 5). Mediated settlement agreements are enforceable like court decrees. Mediators must be registered and qualified. Mediation to be completed within 180 days (extendable by 180 days).

When Mediation is Appropriate: Ongoing Business Relationship: When parties need to continue working together (supplier-customer, partners). Desire for Confidentiality: Mediation is private, unlike court proceedings. Cost Sensitivity: Mediation is typically cheaper than arbitration or litigation. Time Sensitivity: Mediation can resolve disputes in days/weeks rather than months/years. Creative Solutions: Mediator can help parties find non-legal solutions (modified contract, additional business). When parties want control over outcome.

Mediation Process: Initiation: Agreement to mediate (in contract or by subsequent agreement). Selection of Mediator: From institutional panel or mutually agreed. Opening Statements: Each party presents their perspective. Joint and Private Sessions: Mediator meets parties together and separately. Negotiation Facilitation: Mediator helps identify interests, generate options. Settlement: If reached, documented in settlement agreement. If not reached, parties can proceed to arbitration or litigation.

Conciliation Under Arbitration Act: Part III of Arbitration Act 1996 covers conciliation. Conciliation is similar to mediation but conciliator may propose settlement terms. Settlement agreement has same status as arbitral award.

Multi-Tier Dispute Resolution Clauses: Best practice is combining multiple mechanisms. Example: Step 1: Negotiation between designated executives (14-30 days). Step 2: Mediation through specified institution (30-60 days). Step 3: Arbitration if mediation fails.

Benefits: Encourages early resolution. Preserves relationships through initial collaborative steps. Clear escalation path if early steps fail.

Enforceability: Courts generally enforce multi-tier clauses. Must follow steps before initiating arbitration. Clearly specify timeframes and conditions for escalation.

Lok Adalat and Consumer Forums: Lok Adalat (People''s Court): Free alternative for certain disputes. Pre-litigation and pending case referrals. No court fee for settlement. Award is decree, non-appealable. Suitable for smaller disputes.

Consumer Dispute Redressal Forums: For consumer disputes (business-to-consumer). Three-tier system: District, State, National based on claim value. Simplified procedure, faster than regular courts. Consumer Protection Act 2019 expanded scope.

Online Dispute Resolution (ODR): Emerging Mechanism: Increasing adoption for e-commerce, small-value disputes. Platforms provide mediation/arbitration through video conference. Government promoting ODR for certain categories. Cost-effective for small-value, high-volume disputes.',
        '["Evaluate dispute profile to determine where mediation may be appropriate - focus on ongoing relationship disputes and situations requiring creative solutions", "Draft multi-tier dispute resolution clause combining negotiation, mediation, and arbitration with appropriate timeframes for each step", "Identify qualified mediators or mediation institutions for potential future use - understand process and typical costs", "For consumer-facing business, understand Consumer Forum jurisdiction and procedure as customers may choose this route"]'::jsonb,
        '["Mediation Act 2023 Overview with key provisions, mediator qualifications, and enforcement of settlement agreements", "Multi-Tier Dispute Resolution Clause Template with negotiation-mediation-arbitration escalation and clear trigger conditions", "Mediation Institution Directory covering MCPC, private mediation services, and ODR platforms with fee structures", "Dispute Resolution Method Selection Guide matching dispute characteristics to appropriate mechanism"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 39: Litigation Strategy and Court Proceedings
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        39,
        'Litigation Strategy and Navigating Court Proceedings',
        'Despite preference for arbitration and mediation, startups may find themselves in litigation - whether as plaintiff or defendant. Understanding the Indian court system, litigation strategy, and procedures helps manage legal risk and make informed decisions about when and how to litigate.

Indian Court System Overview: Supreme Court of India: Highest court, hears appeals on Constitutional matters, significant legal questions. High Courts: One per state/group of states, appellate and original jurisdiction. District Courts: Trial courts for most civil and criminal matters. Specialized Courts/Tribunals: NCLT (Company matters), NCLAT, DRAT, Consumer Forums, etc.

Civil Jurisdiction for Commercial Disputes: District Court: Claims up to Rs 1 crore (varies by state). High Court Original Side: Claims above threshold (Delhi: Rs 2 crore, Mumbai: Rs 1 crore). Commercial Courts: Established under Commercial Courts Act 2015 for commercial disputes above Rs 3 lakh. Designated at District and High Court level. Intended for faster resolution of commercial disputes.

Commercial Courts Act 2015: Applicability: Commercial disputes of specified value (Rs 3 lakh+). Covers: Contracts, intellectual property, partnership, joint ventures, construction, insurance, maritime law. Features: Designated commercial judges. Strict case management (Section 16). Mandatory Pre-Institution Mediation (Section 12A) before filing. Summary judgment available (Order XIII-A). Reduced adjournments.

Litigation Timeline Reality: Despite reforms, Indian litigation remains slow. District Court to disposal: 3-7 years average. High Court appeals: 2-5 years additional. Supreme Court: 2-5 years additional. Commercial Courts: Designed for 1-2 years, actual may be longer.

When to Consider Litigation: Injunctive Relief: When immediate court order needed (intellectual property infringement, breach of restrictive covenant). Non-Arbitrable Disputes: Criminal matters, certain statutory disputes. Public Enforcement Need: When setting public precedent is important. Recovery of Undisputed Amounts: Summary suits for clear debt recovery. Nominal Claim for Larger Settlement: Sometimes filing initiates serious negotiation.

Litigation Strategy Considerations: Before Filing: Assess likelihood of success objectively. Calculate cost-benefit (litigation costs vs potential recovery). Consider business relationship impact. Evaluate defendant''s ability to satisfy judgment. Review contract for dispute resolution requirements.

Litigation as Plaintiff: Documentation: Ensure all documents supporting claim are preserved and organized. Evidence: Identify witnesses and expert needs. Pleadings: Clear, concise plaint with proper relief sought. Interim Relief: Consider whether emergency relief needed. Venue: Choose appropriate forum (if options exist).

Litigation as Defendant: Early Assessment: Engage counsel immediately upon receiving notice. Limitation: Note limitation for response/counter-claim. Defense Strategy: Jurisdictional challenges, merits defense, settlement approach. Counter-Claims: Identify potential counter-claims.

Interim Relief (Injunctions): Types: Temporary injunction (during trial), interim mandatory injunction. Requirements: Prima facie case, irreparable injury, balance of convenience. Common Uses: Trademark infringement, employee non-compete, data breach, property disputes. Speed: Urgent matters can be heard within days.

Cost of Litigation: Court fees based on claim value (varies by state, typically 1-10%). Legal fees: Senior counsel Rs 5 lakh - Rs 50 lakh+ per appearance. Junior counsel/associates: Rs 50,000 - Rs 5 lakh per hearing. Document preparation, travel, experts add significantly. Small disputes may have disproportionate legal costs.',
        '["Develop litigation risk assessment framework for evaluating when to pursue or defend litigation based on likelihood of success, cost-benefit, and business considerations", "Establish document preservation policy ensuring relevant documents are retained when disputes arise - implement litigation hold procedures", "Identify and vet litigation counsel (external law firms) before disputes arise so you have trusted advisors when needed", "Understand interim relief options - when faced with urgent matters, know that injunctive relief is available within days"]'::jsonb,
        '["Litigation Cost-Benefit Analysis Framework with factors for evaluating litigation decisions", "Document Preservation and Litigation Hold Policy Template with trigger events and procedures", "Court Selection Guide covering District Court, High Court, Commercial Court jurisdiction with venue considerations", "Litigation Timeline Planner with realistic expectations for different court levels and matter types"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 40: Managing Active Disputes and Settlement
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        40,
        'Managing Active Disputes and Settlement Strategies',
        'Active dispute management requires coordination of legal strategy, business considerations, and communication. Most commercial disputes settle before final judgment, making settlement strategy a critical competency.

Dispute Management Framework: When Dispute Arises: Immediate Actions: Preserve all relevant documents. Note limitation periods for legal action. Brief management/board as appropriate. Engage legal counsel for preliminary assessment. Do not make admissions or commitments without legal advice. Assessment Phase: Factual investigation - what happened, who was involved, what documentation exists. Legal analysis - rights, obligations, potential claims and defenses. Relationship assessment - ongoing relationship value, reputational considerations. Commercial analysis - dispute value, cost of resolution, business impact.

Dispute Escalation Internally: Clear escalation protocols based on dispute value and nature. Small disputes: Business team with legal guidance. Medium disputes: Legal team leadership with executive briefing. Large disputes: Executive/board oversight with external counsel.

Working with Legal Counsel: Selection: Match counsel expertise to dispute type. Commercial litigation, arbitration, and sector expertise all relevant. Consider cost structure (hourly, retainer, contingency where permitted). Engagement: Clear scope of engagement. Defined communication protocols. Regular updates and strategy reviews. Budget agreement and tracking.

Settlement Strategy: Timing: Many disputes settle - settlement can occur at any stage. Early settlement: Lower costs, preserved relationship, faster resolution. Late settlement: Better information through discovery, but higher costs. Settlement Value Analysis: Best case outcome value. Worst case outcome value. Probability-weighted expected value. Add: Litigation cost savings, time value, certainty premium. Subtract: Strategic value of precedent, relationship damage from appearing weak.

Settlement Negotiation Approaches: Interest-Based Negotiation: Focus on underlying interests rather than positions. Creative solutions beyond the legal claim (future business, modified arrangements). Without Prejudice Communication: Settlement discussions are privileged. Clear marking of settlement communications as without prejudice. Avoids creating admissions.

Documentation: All settlement communications documented. Final settlement in comprehensive written agreement. Consider confidentiality, non-disparagement, release scope.

Settlement Agreement Essentials: Recitals: Background of dispute (without admissions). Settlement Terms: Payment amounts, timing, method. Mutual Releases: Scope of claims released (be specific). Non-Admission: Statement that settlement is not admission of liability. Confidentiality: Whether settlement terms are confidential. Non-Disparagement: Restrictions on negative statements. Representations: Limited to authority to enter agreement. Governing Law and Jurisdiction: For any disputes about settlement itself. Execution: Proper signing authority, consider notarization.

Post-Settlement: Implement settlement terms promptly. Document completion. Update risk registers and lessons learned. Consider if underlying issues require process changes.

Insurance Considerations: D&O Insurance: May cover director liability in disputes. Professional Indemnity: May cover professional services claims. General Liability: May cover third-party claims. Early notification to insurers when disputes arise. Insurers may have right to participate in defense/settlement.',
        '["Establish dispute management protocol specifying escalation triggers, documentation requirements, and decision authority based on dispute value", "Create settlement value analysis framework incorporating expected value calculation, cost savings, and strategic considerations", "Develop settlement agreement template with comprehensive release, confidentiality, and non-disparagement provisions", "Review insurance policies to understand coverage for different dispute types and notification requirements"]'::jsonb,
        '["Dispute Management Protocol Template with escalation matrix, documentation requirements, and communication guidelines", "Settlement Value Analysis Worksheet with expected value calculation, cost factors, and decision criteria", "Settlement Agreement Template with comprehensive provisions for commercial dispute resolution", "Insurance Coverage Review Checklist for dispute-related claims with notification procedures"]'::jsonb,
        90,
        60,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Exit & M&A Legal Framework (Days 41-43)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Exit & M&A Legal Framework',
        'Navigate the legal aspects of exit transactions including due diligence, deal structuring (asset vs share deals), representations and warranties, indemnification, and regulatory approvals.',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_11_id;

    -- Day 41: M&A Transaction Structures
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        41,
        'M&A Transaction Structures - Asset vs Share Deals',
        'Understanding M&A transaction structures is essential for founders - whether you''re being acquired, acquiring another company, or planning eventual exit. The choice between asset purchase and share purchase has significant legal, tax, and operational implications.

Overview of Exit/Acquisition Structures: Share Purchase (Stock Deal): Buyer acquires shares of target company from shareholders. Company continues with all assets, liabilities, contracts, and employees. Sellers receive cash/shares for their equity stake.

Asset Purchase: Buyer acquires specific assets (and sometimes specific liabilities) from target company. Company continues to exist (often wound up after transaction). Cherry-pick assets; exclude unwanted liabilities.

Merger/Amalgamation: Two companies combine into one. Court-supervised process under Companies Act. Target merges into acquirer (or new entity formed).

Slump Sale: Sale of undertaking as going concern. Assets and liabilities transferred together. Special tax treatment under Income Tax Act.

Share Purchase Characteristics: Advantages for Buyers: Continuity - contracts, licenses, employees transfer automatically. Simpler documentation. No consent requirements for contract assignments.

Disadvantages for Buyers: Inherits all liabilities, including unknown/contingent liabilities. No step-up in tax basis of assets. Historical compliance issues become buyer''s problems.

Advantages for Sellers: Cleaner exit - sell shares, walk away. Capital gains treatment on sale proceeds. No issues with asset title transfer.

Seller Protections Needed: Comprehensive representations and warranties. Robust indemnification provisions. Escrow for indemnity claims.

Asset Purchase Characteristics: Advantages for Buyers: Select specific assets. Avoid unwanted liabilities (with exceptions). Potential tax step-up on acquired assets.

Disadvantages for Buyers: Third-party consents needed for contract assignments. Employees must be separately hired. Licenses may not transfer. More complex documentation.

For Sellers: May retain unwanted assets. May have ongoing liability even for transferred assets. Company remains with residual issues.

Merger/Amalgamation Process: Companies Act 2013 Part: Sections 230-240 govern. Requires: Board approval. Shareholders approval (majority in number representing 75% in value). Creditors approval (similar threshold). NCLT application and sanction.

Timeline: 6-12 months typical. Effective from date specified in NCLT order.

Tax Considerations: Generally tax-neutral if structured properly. Specific conditions under Section 47 for tax-neutral treatment.

Slump Sale: Definition: Transfer of undertaking as going concern for lump sum consideration. Section 2(42C): Undertaking must be transferred as whole, not individual assets. Tax Treatment: Capital gains on difference between consideration and net worth of undertaking. Potential for lower tax than asset sale.

Conditions: Must transfer entire undertaking. Liabilities of undertaking must be assumed. Cannot selectively exclude assets.

Choosing the Right Structure: Factors: Liability profile (known and unknown). Contract and license transferability. Tax efficiency for both parties. Regulatory approvals required. Time constraints. Financing requirements.',
        '["Understand the legal and tax implications of different exit structures - asset sale, share sale, merger, slump sale - in the Indian context", "Evaluate your company''s liability profile and contract assignability to understand which structure acquirers may prefer", "If planning exit, ensure contracts with key customers and suppliers have reasonable assignment provisions", "Maintain clean corporate records and compliance history to maximize value in share sale structure"]'::jsonb,
        '["M&A Structure Comparison Guide covering share purchase, asset purchase, merger, and slump sale with legal, tax, and operational implications", "Exit Structure Selection Framework with decision factors and typical use cases for each structure", "Contract Assignability Audit Template for reviewing key contracts for change of control and assignment provisions", "Pre-Exit Compliance Checklist for ensuring company is ready for M&A due diligence"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: Due Diligence - Seller Preparation and Buyer Perspective
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        42,
        'Due Diligence - Preparation and Navigation',
        'Due diligence is the investigative process where buyers examine target companies before acquisition. For founders, understanding both sides - how to prepare your company for due diligence and what to expect when acquiring others - is valuable knowledge.

Purpose of Due Diligence: For Buyers: Verify representations made by seller. Identify risks and liabilities. Value the target accurately. Plan integration. Negotiate protections (price adjustment, indemnities, conditions).

For Sellers: Demonstrate company value. Maintain negotiating credibility. Identify issues before buyer finds them. Control narrative around problems.

Types of Due Diligence: Legal Due Diligence: Corporate structure and authorization. Contracts and commitments. Intellectual property. Litigation and disputes. Compliance and regulatory. Employment matters. Real estate and assets.

Financial Due Diligence: Historical financial performance. Quality of earnings analysis. Working capital analysis. Debt and liabilities. Tax positions.

Commercial Due Diligence: Market analysis. Customer relationships. Competitive position. Growth potential.

Technical/IT Due Diligence: Technology stack and architecture. Intellectual property (code ownership). Security and compliance. Technical debt.

HR Due Diligence: Key employee retention risk. Employment terms and liabilities. Culture assessment.

Legal Due Diligence Deep Dive: Corporate Records: Memorandum and Articles of Association. Shareholder agreements, all amendments. Board and shareholder resolutions. Register of Members, share transfers. Director details, KMP appointments.

Contracts Review: Customer contracts (especially top 10-20). Supplier and vendor agreements. Partnership and joint venture agreements. Licensing agreements (IP, software). Financing documents. Insurance policies.

IP Matters: IP registrations (trademarks, patents, copyrights). IP assignment from founders and employees. License agreements (inbound and outbound). Open source usage and compliance. Domain name ownership.

Litigation and Disputes: Pending litigation and arbitration. Threatened claims. Material dispute history. Regulatory investigations.

Compliance: Statutory filings and registrations. Sector-specific licenses and permits. Environmental compliance. Data protection compliance.

Seller Due Diligence Preparation: Create virtual data room with organized documents. Index all documents logically by category. Prepare management presentations. Anticipate questions and prepare responses for sensitive areas. Complete internal audit to identify and address issues before DD. Update all statutory filings and corporate records.

Data Room Organization: Clear folder structure. Consistent naming convention. Index/tracker for all documents. Version control for updated documents. Access controls and audit logging.

Managing the DD Process: Designate DD coordinator. Set up Q&A process with response tracking. Coordinate responses across functions. Document all requests and responses. Maintain privilege for sensitive communications.

Common DD Red Flags: Missing or unsigned documents. Undisclosed related party transactions. IP assignment gaps. Non-compliance with statutory filings. Undisclosed litigation or disputes. Customer concentration risk. Key person dependencies.',
        '["Create due diligence readiness checklist and begin organizing documents in virtual data room structure even before active M&A discussions", "Conduct internal due diligence to identify and address potential red flags before external scrutiny", "Ensure all corporate records are complete - signed agreements, updated registers, filed returns - as gaps create negotiating weakness", "Review all IP assignments from founders, employees, and contractors to ensure clean chain of title"]'::jsonb,
        '["Due Diligence Document Request List covering 200+ typical requests across legal, financial, commercial, technical, and HR categories", "Virtual Data Room Setup Guide with folder structure template, naming conventions, and access control best practices", "Due Diligence Red Flag Identification Checklist for internal pre-assessment before buyer engagement", "IP Chain of Title Audit Template for verifying complete assignment from all creators"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: Definitive Agreements and Closing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        43,
        'M&A Definitive Agreements and Transaction Closing',
        'After due diligence and negotiations, M&A transactions are documented in definitive agreements - comprehensive legal contracts that govern the acquisition. Understanding these agreements is critical for founders whether selling their company or acquiring others.

Share Purchase Agreement (SPA) - Key Provisions: Parties and Recitals: Identifies buyer, sellers, target company. Background of transaction. Provides context for interpretation.

Purchase and Sale: Specifies shares being purchased. Purchase price (fixed, formula-based, or with adjustments). Payment terms and mechanics.

Representations and Warranties: Statements of fact about company and sellers. Company Reps (given by company or sellers): Corporate organization and standing. Capitalization and ownership. Financial statements accuracy. Material contracts. Intellectual property. Litigation and disputes. Tax compliance. Employee matters. Environmental compliance. Regulatory compliance.

Seller Reps: Authority to sell. Valid title to shares. No broker fees.

Qualification of Reps: Materiality qualifiers (material, Material Adverse Effect). Knowledge qualifiers (to seller''s knowledge). Temporal qualifiers (as of date, as of closing).

Disclosure Schedule: Lists exceptions to representations. Buyer cannot claim breach for disclosed matters. Comprehensive disclosure protects seller.

Covenants: Pre-Closing Covenants: Conduct business in ordinary course. No material actions without consent. Access for further due diligence. Cooperation on regulatory approvals.

Post-Closing Covenants: Non-compete and non-solicitation. Transition assistance. Employee retention arrangements.

Conditions Precedent to Closing: Accuracy of representations at closing. Completion of required consents and approvals. No Material Adverse Effect. Delivery of required documents.

Indemnification: Indemnification Obligations: Sellers indemnify buyer for breaches of representations, undisclosed liabilities. Buyer may indemnify for its breaches.

Limitations on Indemnity: Survival periods (how long reps survive closing - typically 12-24 months, longer for fundamental reps). Baskets/Deductibles (threshold before indemnity kicks in). Caps (maximum indemnity, often percentage of purchase price or escrow amount). Exclusions (fraud, fundamental reps may be carved out from limitations).

Escrow: Portion of purchase price held in escrow to satisfy indemnity claims. Typically 10-20% for 12-24 months. Escrow agent holds funds subject to release conditions.

Purchase Price Adjustments: Working Capital Adjustment: Price adjusted based on working capital at closing vs target. Calculated post-closing with true-up payment. Earnout: Portion of price contingent on post-closing performance. Protects buyer; gives seller upside if business performs. Careful drafting to avoid disputes.

Closing Mechanics: Sign and Close: Transaction signs and closes simultaneously. Used when no regulatory approvals or third-party consents needed.

Deferred Closing: Sign definitive agreements, close later after conditions satisfied. Used when regulatory approval, shareholder approval, or material consents required.

Closing Deliverables: Seller: Share certificates (or transfer instruments). Board and shareholder resolutions. Officer certificates. Legal opinion. Good standing certificates.

Buyer: Payment of purchase price. Board resolutions. Officer certificates.

Post-Closing Integration: Announcement communication. Employee communications. Customer and vendor notifications. System integrations. Brand transition.',
        '["Understand key negotiation points in definitive agreements - representations scope, indemnification caps and baskets, escrow amounts, earnout structures", "When selling, negotiate for comprehensive disclosure schedule, reasonable survival periods, and clear indemnity limitations", "Plan closing mechanics carefully - sign-and-close vs deferred closing based on approval requirements", "Prepare for post-closing integration from legal perspective - contract novations, regulatory notifications, employee communications"]'::jsonb,
        '["Share Purchase Agreement Anatomy Guide with clause-by-clause explanation of standard provisions and negotiation points", "Representations and Warranties Negotiation Guide covering seller-friendly vs buyer-friendly positions", "Indemnification Provisions Comparison showing market terms for caps, baskets, survival, and escrow", "M&A Closing Checklist with comprehensive list of closing deliverables and post-closing actions"]'::jsonb,
        90,
        60,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 12: International Legal Considerations (Days 44-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'International Legal Considerations',
        'Navigate cross-border legal requirements including international contract drafting, FEMA compliance for foreign exchange, overseas investment structures, and managing multi-jurisdictional legal risks.',
        12,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_12_id;

    -- Day 44: Cross-Border Contracts and Governing Law
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        44,
        'Cross-Border Contracts - Governing Law and Jurisdiction',
        'As Indian startups expand globally, cross-border contracts become common - with foreign customers, vendors, partners, and investors. Proper structuring of governing law, jurisdiction, and dispute resolution clauses is critical to managing international legal risk.

Governing Law Basics: Governing Law (Choice of Law): The substantive law that will be applied to interpret the contract and determine rights and obligations. Different from jurisdiction (which court/tribunal will hear disputes). Parties generally have freedom to choose governing law.

Why Governing Law Matters: Different countries have different contract law principles. Some laws are more favorable to certain provisions (limitation of liability, liquidated damages, etc.). Familiarity and predictability - know what rules apply. May affect enforceability of certain provisions.

Common Governing Law Choices for Indian Companies: Indian Law: Most comfortable and predictable for Indian party. Appropriate when Indian company has stronger bargaining position. Required for certain contracts (employment of Indian employees, real estate in India). Consider: Foreign parties may resist if unfamiliar with Indian law.

English Law: Internationally respected, well-developed commercial law. Common choice for international contracts. Indian legal system familiar with English law principles. Popular for cross-border investment documents, international sale contracts.

Singapore Law: Rising popularity for Asia-Pacific transactions. Modern, commercially-oriented legal system. Good for contracts with Asian counterparties. Singapore arbitration (SIAC) often paired with Singapore law.

US Law (typically New York or Delaware): Common for US counterparties. New York for commercial contracts, Delaware for corporate matters. Indian parties should have US counsel review.

Jurisdiction Clause: Jurisdiction specifies which courts can hear disputes. Exclusive Jurisdiction: Only specified courts can hear disputes. Non-Exclusive Jurisdiction: Specified courts can hear, but other courts not excluded.

Considerations: Where are the parties located? Where are assets for enforcement? Court efficiency and expertise. Cost of litigation in that jurisdiction.

Connection to Arbitration: If arbitration clause included, court jurisdiction becomes less relevant for main disputes. Courts still relevant for interim relief, arbitration support, award enforcement.

Practical Approach for Indian Startups: Selling to Foreign Customers: Try for Indian governing law, Indian seat arbitration. Acceptable compromise: English/Singapore law, Singapore seat arbitration. Avoid: Foreign courts as exclusive jurisdiction.

Buying from Foreign Vendors: Foreign law may be unavoidable for standard vendor terms. Understand key differences from Indian law. Negotiate materiality thresholds, limitation of liability.

Investment from Foreign Investors: Often negotiate for foreign governing law (Singapore, UK). Acceptable - investors have legitimate concerns about enforcing rights in India. Ensure Indian counsel reviews foreign law provisions.

Partnership/JV with Foreign Party: Neutral governing law (Singapore, English) often compromise. Seat of arbitration important for procedural law.

Currency and Payment Terms: Specify currency clearly. Address exchange rate risk (who bears fluctuation). Payment mechanics - bank account details, wire instructions. FEMA compliance for receiving foreign currency.

International Trade Terms (Incoterms): For sale of goods, Incoterms define delivery, risk, and cost responsibilities. Common terms: FOB (Free on Board), CIF (Cost, Insurance, Freight), DDP (Delivered Duty Paid). Explicitly reference Incoterms 2020 and specify applicable term.',
        '["Develop standard positions on governing law and jurisdiction for different contract types - customer contracts, vendor contracts, partnerships", "For international customer contracts, draft appropriate governing law and dispute resolution clauses that balance business needs with legal risk", "When accepting foreign governing law, engage local counsel to review key provisions that may differ from Indian law expectations", "Ensure international contracts address currency, exchange rate risk, and FEMA-compliant payment mechanics"]'::jsonb,
        '["Governing Law Selection Guide comparing Indian, English, Singapore, and US law for common commercial provisions", "International Contract Clause Library with governing law, jurisdiction, and arbitration clause variations", "Cross-Border Contract Checklist covering currency, Incoterms, payment mechanics, and regulatory compliance", "Foreign Law Red Flags Guide highlighting key provisions that may differ from Indian law expectations"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 45: FEMA Compliance for International Transactions
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        45,
        'FEMA Compliance for Cross-Border Transactions',
        'The Foreign Exchange Management Act 1999 (FEMA) and its regulations govern all cross-border transactions involving Indian entities and residents. Non-compliance can result in penalties up to three times the amount involved. Every Indian startup engaging in international business must understand FEMA requirements.

FEMA Overview: FEMA replaced FERA (Foreign Exchange Regulation Act) in 1999, shifting from control to management of foreign exchange. Key Principles: All transactions in foreign exchange are regulated. Capital account transactions require permission or must fit automatic route. Current account transactions generally permitted with some restrictions.

Current Account vs Capital Account: Current Account Transactions: Trade in goods and services. Interest payments. Short-term banking transactions. Generally freely permitted under FEMA.

Capital Account Transactions: Acquisition of foreign assets or liabilities. Investment transactions. Borrowing from foreign sources. Require compliance with specific regulations.

Foreign Direct Investment (FDI) Regulations: FDI Inflow (Foreign Investment into India): Automatic Route: No prior approval needed, just comply with conditions and file. Most sectors permit 100% FDI under automatic route. Government Route: Prior approval from concerned Ministry required. Sectors: Defense (above 74%), telecom, insurance (above 74%), etc.

Pricing Guidelines: Fresh Issuance: Not less than fair market value determined by internationally accepted pricing methodology. DCF method with justification of projections. SEBI formula for listed companies. Transfer of Shares: Sale to non-resident not less than fair value. Purchase from non-resident not more than fair value. Valuation by Chartered Accountant or SEBI registered merchant banker.

Reporting Requirements: Advance Reporting: Within 30 days of receiving inward remittance. Form for reporting Foreign Inward Remittance. FC-GPR Filing: Within 30 days of allotment of shares. Compulsory form for all equity issuances to non-residents. Annual Return: Annual Return on Foreign Liabilities and Assets (FLA Return). Due by July 15 each year.

External Commercial Borrowings (ECB): Indian companies can borrow from foreign sources under ECB framework. Eligible Borrowers: Companies, LLPs, microfinance institutions, etc. Recognized Lenders: International banks, foreign equity holders, international capital markets. Minimum Average Maturity: 3-5 years depending on amount. All-in-Cost Ceiling: Interest rate cap (benchmark + spread). End-Use Restrictions: General corporate use, capital expenditure, working capital (with conditions).

Reporting: ECB-2 monthly return. Form 83 for loan registration.

Overseas Direct Investment (ODI): Investment by Indian entities in foreign entities. Automatic Route: Investment up to 400% of net worth. General permission for bonafide business purposes. Prior Approval Route: Investment in financial services, real estate, banking abroad.

Annual Performance Report (APR) required. Compliance with Overseas Investment Rules 2022.

Liberalised Remittance Scheme (LRS): Individuals can remit up to USD 250,000 per financial year for permitted purposes. Purposes: Education, medical, travel, gifts, investment in equity/debt abroad. Not for purchase of immovable property or lottery tickets.

Common FEMA Compliance Issues for Startups: Late FC-GPR Filing: Penalty proceedings, compounding required. Pricing Non-Compliance: Shares issued below fair value to foreign investors. Instrument Non-Compliance: Using instruments not recognized under FEMA (pure SAFEs). Downstream Investment: FDI invested further without compliance. Reporting Failures: Late or missed annual returns.

Compounding of Contraventions: RBI empowered to compound (settle) contraventions. Compounding fee based on: Amount involved, duration of contravention, nature of contravention. Alternative to prosecution for violations. Better to compound early than face extended proceedings.',
        '["Map all current and potential cross-border transactions - inward investment, outward investment, borrowings, services exports/imports - against FEMA requirements", "Establish FEMA compliance calendar with all reporting deadlines: Advance Reporting (30 days from receipt), FC-GPR (30 days from allotment), FLA Return (July 15)", "For each equity issuance to non-residents, ensure pricing compliance with fair value determination by qualified valuer using accepted methodology", "If any historical FEMA violations identified, initiate compounding process with RBI to regularize before violations compound further"]'::jsonb,
        '["FEMA Compliance Framework Guide covering FDI, ECB, ODI, and LRS with automatic vs approval route determination", "FDI Pricing and Valuation Requirements with methodology guidance and documentation needs", "FEMA Reporting Calendar Template with all filing deadlines, forms, and responsible parties", "FEMA Compounding Procedure Guide for regularizing contraventions with fee calculation and application process"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'P5 Legal Stack - Modules 7-12 (Days 25-45) created successfully';

END $$;

COMMIT;
