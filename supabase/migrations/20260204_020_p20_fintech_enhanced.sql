-- THE INDIAN STARTUP - P20: FinTech Mastery - Enhanced Content
-- Migration: 20260204_020_p20_fintech_enhanced.sql
-- Complete course with detailed lessons, action items, and resources
-- Duration: 55 days | 11 modules | Price: Rs 8,999

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
    v_m10_id TEXT;
    v_m11_id TEXT;
BEGIN
    -- Upsert the product
    INSERT INTO "Product" (id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P20',
        'FinTech Mastery',
        'Master the Indian FinTech ecosystem from RBI regulations to crypto compliance. Learn PA/PG licensing, NBFC registration, UPI integration, digital lending guidelines, and build compliant financial products.',
        8999,
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

    -- Get the product ID (in case of conflict)
    IF v_product_id IS NULL THEN
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P20';
    END IF;

    -- Delete existing modules and lessons for clean re-insert
    DELETE FROM "Lesson" WHERE "moduleId" IN (SELECT id FROM "Module" WHERE "productId" = v_product_id);
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ============================================
    -- MODULE 1: FinTech Landscape India
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'FinTech Landscape India', 'Understand the Indian FinTech ecosystem, market size, key players, and emerging opportunities.', 1, NOW(), NOW())
    RETURNING id INTO v_m1_id;

    -- Lesson 1.1: Indian FinTech Market Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 1, 'Indian FinTech Market Overview',
    'India has emerged as the world''s third-largest FinTech ecosystem, valued at $50 billion in 2024 with projections to reach $150 billion by 2030. This meteoric rise is driven by unique factors: 750+ million internet users, 500+ million smartphone users, and a young, tech-savvy population with median age of 28 years. The JAM trinity (Jan Dhan accounts, Aadhaar, Mobile) has created unprecedented infrastructure for financial inclusion.

The ecosystem comprises 7,000+ FinTech startups across segments: Digital Payments (dominated by UPI with 12 billion monthly transactions), Digital Lending (₹3.5 lakh crore disbursed in FY24), InsurTech (15% annual growth), WealthTech (₹10 lakh crore AUM in digital platforms), and emerging segments like embedded finance and BNPL. Key unicorns include Razorpay ($7.5B valuation), PhonePe ($12B), CRED ($6.4B), and Zerodha (bootstrapped, profitable).

Government initiatives have been transformative. The India Stack comprising Aadhaar, UPI, DigiLocker, and Account Aggregator framework provides open APIs for innovation. GIFT City offers regulatory sandbox for global FinTech operations. RBI''s progressive approach includes regulatory sandboxes, cohort-based testing, and the upcoming Digital India Bill providing regulatory clarity.

Investment landscape shows $10 billion+ invested in Indian FinTech since 2020, with average deal sizes increasing from $5M to $25M. Series A/B funding remains strong despite global slowdown. Key investors include Tiger Global, Sequoia, SoftBank, and domestic funds like Elevation and Matrix. B2B FinTech and infrastructure plays are seeing higher valuations than B2C consumer apps.

Market opportunities exist in: Rural FinTech (only 30% rural penetration), SME lending (₹20 lakh crore credit gap), Cross-border payments ($125B remittance market), Green FinTech (ESG-linked products), and embedded finance in non-financial apps. Understanding these dynamics is essential for building successful FinTech ventures in India.',
    '["Map the Indian FinTech ecosystem identifying top 50 players across all segments", "Analyze funding trends and identify which sub-sectors are attracting maximum investment", "Research government initiatives (GIFT City, regulatory sandbox, Account Aggregator) and their implications", "Identify 5 underserved market segments with FinTech opportunities in India"]'::jsonb,
    '[{"title": "RBI Annual Report on FinTech", "url": "https://rbi.org.in/scripts/AnnualReportPublications.aspx", "type": "report"}, {"title": "NPCI Statistics Dashboard", "url": "https://www.npci.org.in/statistics", "type": "data"}, {"title": "Tracxn Indian FinTech Report", "url": "https://tracxn.com/explore/FinTech-Startups-in-India", "type": "research"}, {"title": "India Stack Official Portal", "url": "https://indiastack.org/", "type": "platform"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 1.2: FinTech Business Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 2, 'FinTech Business Models',
    'Indian FinTech operates through diverse business models, each with unique unit economics and regulatory requirements. Understanding these models is crucial for building sustainable ventures. Payment businesses operate on thin margins (0.1-0.3% MDR) requiring massive scale; Razorpay processes ₹7 lakh crore annually to achieve profitability.

B2B FinTech models include: Payment Infrastructure (APIs, gateways, orchestration) with 0.1-0.5% transaction fees; Banking-as-a-Service platforms enabling non-banks to offer financial products; Lending Infrastructure (credit scoring, collections, loan management) charging per-API or success fees; and Compliance-as-a-Service (KYC, AML, fraud detection) with SaaS pricing models.

B2C models span: Neo-banks and challenger banks (account fees, interchange); Digital lending apps (interest spread of 4-8% on personal loans); Investment platforms (brokerage, advisory fees, distribution commissions); Insurance distribution (15-35% first-year commission); and BNPL providers (merchant fees of 3-6% plus late payment charges).

Emerging hybrid models include: Embedded Finance where non-financial apps offer contextual financial products (Swiggy Money, Amazon Pay Later); Platform lending connecting borrowers with multiple lenders; Account Aggregator-based services monetizing consent-based data; and White-label solutions enabling any business to become a FinTech.

Revenue optimization strategies: Transaction-based revenue scales with volume but has margin pressure; Subscription/SaaS models provide predictable revenue; Lending carries credit risk but higher returns; Float income from escrow accounts (significant at scale); and ancillary services (analytics, insights, premium features). Successful FinTechs often combine multiple revenue streams. For example, Razorpay earns from payment processing, lending (Razorpay Capital), neo-banking (RazorpayX), and software subscriptions.

Unit economics benchmarks: Customer Acquisition Cost (CAC) should be recovered within 12-18 months; Lifetime Value (LTV) to CAC ratio should exceed 3x; Payment businesses need 1000+ transactions/merchant/month for profitability; Lending requires Net Interest Margin above 8% after credit costs.',
    '["Analyze unit economics of 5 successful Indian FinTech companies across different segments", "Build a financial model for your FinTech idea with detailed revenue and cost assumptions", "Compare B2B vs B2C FinTech models for capital efficiency and path to profitability", "Research embedded finance opportunities in your target industry vertical"]'::jsonb,
    '[{"title": "Redseer FinTech Economics Report", "url": "https://redseer.com/reports/fintech", "type": "research"}, {"title": "a16z FinTech Business Model Guide", "url": "https://a16z.com/fintech/", "type": "guide"}, {"title": "Razorpay FY24 Annual Report", "url": "https://razorpay.com/annual-report/", "type": "report"}, {"title": "BCG FinTech Control Tower", "url": "https://www.bcg.com/industries/financial-institutions/fintech", "type": "research"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 1.3: Key Players and Competition
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m1_id, 3, 'Key Players and Competition',
    'The Indian FinTech competitive landscape features established giants, well-funded unicorns, and nimble startups. Each segment has distinct dynamics requiring careful positioning strategy. In Digital Payments, PhonePe (47% UPI market share), Google Pay (34%), and Paytm (12%) dominate consumer payments. B2B payments see Razorpay, Cashfree, PayU, and CCAvenue competing on features, pricing, and developer experience.

Digital Lending is fragmented with different models: App-based lenders (KreditBee, MoneyTap, Navi) targeting salaried individuals; SME lenders (Lendingkart, NeoGrowth, Aye Finance) using alternative data; Embedded lenders (LazyPay, Simpl) integrated into checkout flows; and Co-lending partnerships between NBFCs and banks. The ₹2 lakh crore digital lending market is growing 30% annually.

WealthTech competition spans: Discount brokers (Zerodha, Groww, Upstox) with 15M+ active users each; Mutual fund platforms (Coin, Kuvera, Paytm Money) competing on zero-commission direct plans; Robo-advisors (Scripbox, Arthya) targeting hands-off investors; and Trading platforms (Dhan, Fyers) focusing on active traders with advanced tools.

InsurTech sees digital distributors (PolicyBazaar, Acko, Digit) alongside embedded insurance players (Onsurity for group health, Loop Health) and claim-tech startups. RegTech is emerging with KYC players (Signzy, Syntizen), fraud detection (Bureau, Fresco Logic), and compliance platforms (Cashflo, LegalWiz).

Competitive differentiation strategies: Technology moats (proprietary AI/ML, unique data sources); Distribution advantages (embedded partnerships, agent networks); Regulatory moats (scarce licenses like PA, NBFC, insurance); Customer experience (best NPS, fastest onboarding); and Vertical focus (deep expertise in specific use cases like truck driver loans or textile trader credit).

Building competitive intelligence: Track competitor funding, product launches, and hiring patterns; Monitor app store ratings and reviews for weakness identification; Analyze pricing strategies and feature matrices; Understand regulatory positioning and license holdings. Success requires finding underserved niches rather than competing head-on with well-funded incumbents.',
    '["Create a detailed competitive matrix for your target FinTech segment with feature comparison", "Identify 3-5 potential differentiation strategies for your FinTech venture", "Analyze customer reviews of top 5 competitors to identify pain points and opportunities", "Research competitor funding history, investor base, and strategic partnerships"]'::jsonb,
    '[{"title": "Tracxn FinTech Competitive Intelligence", "url": "https://tracxn.com/explore/FinTech-Startups-in-India", "type": "database"}, {"title": "Inc42 FinTech Unicorn Tracker", "url": "https://inc42.com/features/indian-startup-unicorn-tracker/", "type": "tracker"}, {"title": "Entrackr FinTech Funding Tracker", "url": "https://entrackr.com/", "type": "news"}, {"title": "App Annie FinTech App Rankings", "url": "https://www.data.ai/en/apps/ios/app-ranking/", "type": "analytics"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 2: RBI Regulations
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'RBI Regulations', 'Master RBI regulatory framework governing FinTech operations in India.', 2, NOW(), NOW())
    RETURNING id INTO v_m2_id;

    -- Lesson 2.1: RBI Regulatory Framework Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 4, 'RBI Regulatory Framework Overview',
    'The Reserve Bank of India (RBI) is the primary regulator for most FinTech activities in India, overseeing payments, lending, and banking services. Understanding RBI''s regulatory philosophy and framework is essential for compliant FinTech operations. RBI follows a "same activity, same regulation" principle meaning any entity performing regulated activities requires appropriate authorization.

Key regulatory categories include: Payment Systems regulated under Payment and Settlement Systems Act 2007 (PSSA); Non-Banking Financial Companies under RBI Act 1934; Banking and prepaid instruments under Banking Regulation Act 1949; and Foreign exchange under FEMA 1999. Each category has distinct licensing requirements, compliance obligations, and reporting mandates.

RBI''s FinTech approach has evolved from cautious (2015-2018) to enabling (2019-present). Key initiatives include: Regulatory Sandbox launched in 2019 allowing controlled testing of innovative products; Cohort-based approach for sector-specific innovation (retail payments, MSME lending, cross-border); Innovation Hub for research and development; and the Account Aggregator framework enabling consent-based data sharing.

License categories relevant for FinTech: Payment Aggregator (PA) license for merchant payment processing; Payment Gateway authorization for technology providers; Prepaid Payment Instruments (PPI) for wallets and prepaid cards; NBFC registration for lending activities; and Authorized Dealer category for forex operations. Many FinTechs operate under partnership models with licensed entities before obtaining own licenses.

Compliance framework includes: Master Directions providing detailed operational guidelines; Circulars for specific regulatory updates; FAQs clarifying implementation queries; and Returns/Reporting for regular compliance submissions. Key areas include KYC (Customer Due Diligence), AML (Anti-Money Laundering), data localization (payment data must be stored in India), and cyber security guidelines.

Penalties for non-compliance are severe: Operating without license attracts up to ₹1 crore fine and imprisonment; Regulatory violations lead to license cancellation; Consumer complaints trigger RBI investigation; and repeated violations result in business prohibition. The regulatory environment rewards proactive compliance and transparent operations.',
    '["Map all RBI regulations applicable to your FinTech business model with specific circular references", "Create a compliance checklist covering KYC, AML, data localization, and reporting requirements", "Review RBI sandbox guidelines and assess eligibility for your product innovation", "Analyze recent RBI enforcement actions to understand compliance priorities and risks"]'::jsonb,
    '[{"title": "RBI Master Directions Portal", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx", "type": "regulation"}, {"title": "RBI Regulatory Sandbox Framework", "url": "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx?prid=47723", "type": "framework"}, {"title": "RBI Compliance Calendar", "url": "https://www.rbi.org.in/Scripts/BS_ViewComplianceCalendar.aspx", "type": "compliance"}, {"title": "RBI FAQs on Digital Lending", "url": "https://www.rbi.org.in/Scripts/FAQView.aspx", "type": "faq"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 2.2: KYC and AML Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 5, 'KYC and AML Requirements',
    'Know Your Customer (KYC) and Anti-Money Laundering (AML) compliance form the foundation of FinTech operations in India. RBI mandates tiered KYC based on transaction volumes and risk profiles. Non-compliance attracts severe penalties including license cancellation, making robust KYC/AML systems non-negotiable for FinTech ventures.

KYC tiers in India: Minimum KYC allows limited transactions (₹10,000/month for wallets) with basic identification; Full KYC requires OVD (Officially Valid Documents) verification enabling higher limits; Video KYC (V-KYC) introduced in 2020 enables remote onboarding with live verification; and CKYC (Central KYC) registry reduces redundant verification across financial institutions. Aadhaar-based e-KYC provides instant verification but requires explicit consent and UIDAI compliance.

Customer Due Diligence (CDD) requirements: Identity verification using PAN, Aadhaar, Passport, Voter ID, or Driving License; Address verification through utility bills, bank statements, or Aadhaar; Risk categorization (low, medium, high) based on customer profile; and Enhanced Due Diligence (EDD) for high-risk customers including PEPs (Politically Exposed Persons) and high-value transactions.

AML framework under Prevention of Money Laundering Act (PMLA): Transaction monitoring for suspicious patterns (structuring, layering); Suspicious Transaction Reports (STR) to Financial Intelligence Unit within 7 days; Cash Transaction Reports (CTR) for transactions above ₹10 lakhs; Record keeping for 5 years post-relationship; and Principal Officer appointment responsible for AML compliance.

Implementation best practices: Build or buy AML transaction monitoring systems with rule engines; Implement real-time fraud detection using ML models; Maintain audit trails for all KYC documents and decisions; Regular training for staff on AML red flags; and Annual AML audit by independent auditor. Third-party KYC providers (Signzy, IDfy, Perfios) can accelerate implementation but principal responsibility remains with the FinTech.

Digital lending specific requirements: Disbursement only to borrower''s verified bank account; No third-party involvement in fund transfer; Collection only from borrower''s registered bank account; and Complete disclosure of loan terms including APR. The 2022 Digital Lending Guidelines significantly tightened compliance requiring all customer interactions to be through regulated entity (RE) or their agents on record.',
    '["Design KYC flow for your FinTech covering all customer tiers with verification methods", "Evaluate KYC/AML technology vendors and compare costs, features, and integration complexity", "Create AML policy document covering transaction monitoring, STR filing, and record keeping", "Build risk scoring model for customer categorization based on profile and transaction patterns"]'::jsonb,
    '[{"title": "RBI Master Direction on KYC", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=11566", "type": "regulation"}, {"title": "PMLA Rules 2002", "url": "https://fiuindia.gov.in/pdfs/PMLA2002.pdf", "type": "law"}, {"title": "FIU-IND Reporting Portal", "url": "https://fiuindia.gov.in/", "type": "portal"}, {"title": "CKYC Registry", "url": "https://www.ckycindia.in/", "type": "registry"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 2.3: Data Localization and Privacy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m2_id, 6, 'Data Localization and Privacy',
    'India has implemented stringent data localization requirements for financial services, significantly impacting FinTech architecture and operations. The regulatory landscape continues evolving with the Digital Personal Data Protection Act 2023, requiring FinTechs to build privacy-first systems while ensuring regulatory compliance.

Payment data localization (RBI 2018 circular): All payment system data must be stored exclusively in India; Data includes full transaction details, customer information, and payment credentials; Foreign payment processors must establish local data centers; End-to-end transaction data for outbound cross-border payments can be shared externally; and Processing can happen abroad but data must return and reside in India within 24 hours.

Implementation requirements: Primary data center in India with disaster recovery also in India; Data classification framework identifying localized vs. non-localized data; Encryption requirements for data at rest and in transit; Access controls ensuring foreign personnel cannot access localized data; and Audit mechanisms demonstrating compliance. Cloud providers (AWS Mumbai, Azure India, GCP Mumbai) offer compliant infrastructure.

Digital Personal Data Protection Act 2023 implications: Consent-based data collection with clear purpose limitation; Data Principal rights including access, correction, and erasure; Data Fiduciary obligations for security and breach notification; Significant Data Fiduciaries face enhanced compliance requirements; and Cross-border transfer restrictions to notified countries only. Penalties up to ₹250 crore for violations.

Account Aggregator framework changes data sharing paradigm: Customer-consented data sharing between Financial Information Providers and Users; Eliminates need for bilateral data sharing agreements; Enables new business models like cash flow based lending; Technical standards (FIP, FIU, AA) require certification; and Eight categories of financial data covered including bank accounts, insurance, investments.

Privacy by design principles: Collect minimum necessary data; Implement data retention policies with automatic deletion; Anonymize data for analytics where possible; Build consent management systems with audit trails; and Regular privacy impact assessments. FinTechs should appoint Data Protection Officers and establish incident response procedures before the DPDP Act enforcement date.',
    '["Audit your data architecture for compliance with RBI data localization requirements", "Create data classification matrix identifying sensitive financial data requiring localization", "Develop privacy policy and consent framework aligned with DPDP Act 2023", "Evaluate Account Aggregator integration for consent-based data access"]'::jsonb,
    '[{"title": "RBI Data Localization Circular", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11244", "type": "regulation"}, {"title": "DPDP Act 2023 Full Text", "url": "https://www.meity.gov.in/writereaddata/files/Digital%20Personal%20Data%20Protection%20Act%202023.pdf", "type": "law"}, {"title": "ReBIT Account Aggregator Specs", "url": "https://api.rebit.org.in/", "type": "specification"}, {"title": "CERT-In Cyber Security Guidelines", "url": "https://www.cert-in.org.in/", "type": "security"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 3: Payment Aggregator Licensing
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Payment Aggregator Licensing', 'Complete guide to obtaining PA license from RBI.', 3, NOW(), NOW())
    RETURNING id INTO v_m3_id;

    -- Lesson 3.1: PA/PG Guidelines Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 7, 'PA/PG Guidelines Overview',
    'RBI introduced the Payment Aggregator and Payment Gateway Guidelines in March 2020, creating a distinct regulatory framework for entities facilitating merchant payments. Understanding the distinction between PA and PG, and the licensing requirements, is critical for building payment businesses in India.

Payment Aggregator (PA) definition: Entity that facilitates e-commerce transactions by receiving payments from customers and settling to merchants; Handles funds in escrow before merchant settlement; Examples include Razorpay, Cashfree, PayU, CCAvenue; Requires RBI authorization with ₹15 crore minimum net worth; and Subject to comprehensive regulatory compliance including KYC, AML, and cyber security.

Payment Gateway (PG) distinction: Provides technology infrastructure for payment processing; Does not handle funds (only routing and processing); Connects merchants to banks/payment networks; No RBI license required but must comply with PCI-DSS; and Examples include payment gateway APIs, tokenization services. Many entities operate as both PA and PG for different customer segments.

Licensing requirements for PA: Minimum net worth ₹15 crore (increased from ₹5 crore); Fit and proper criteria for directors and shareholders; Technology and security audit by CERT-In empaneled auditor; Robust KYC and AML framework; Escrow account with scheduled commercial bank; and Detailed business plan with five-year projections. Application fee is ₹1 lakh with annual compliance costs of ₹50-75 lakhs.

Timeline and process: Submit application via PRAVAAH portal with all documentation; RBI acknowledgment within 30 days; In-principle approval within 120 days if eligible; System audit and compliance verification; Final authorization after satisfactory audit; and Annual renewal subject to compliance. Currently 30+ entities hold PA authorization.

Existing entities transition: PAs operating before March 2020 had to apply by September 2021; Granted authorization to continue during application processing; Must demonstrate compliance with all new requirements; Several applications rejected for net worth or compliance failures. New entrants face stringent scrutiny given the mature regulatory framework.',
    '["Assess whether your business model requires PA license or can operate as PG only", "Calculate capital requirements including ₹15 crore net worth and operational runway", "Review fit and proper criteria for all directors and key shareholders", "Prepare detailed business plan with five-year financial projections for RBI application"]'::jsonb,
    '[{"title": "RBI PA/PG Master Direction", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=11822", "type": "regulation"}, {"title": "PRAVAAH Application Portal", "url": "https://pravaah.rbi.org.in/", "type": "portal"}, {"title": "RBI PA Authorization List", "url": "https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1289", "type": "database"}, {"title": "PA License Application Checklist", "url": "https://www.rbi.org.in/Scripts/bs_viewcontent.aspx?Id=3980", "type": "checklist"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 3.2: PA License Application Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 8, 'PA License Application Process',
    'Obtaining Payment Aggregator authorization from RBI requires meticulous preparation and substantial investment. The process typically takes 12-18 months from application to final authorization, with multiple stages of review and compliance verification.

Pre-application requirements: Incorporate company under Companies Act 2013 (LLP not eligible); Achieve ₹15 crore minimum net worth (paid-up capital + free reserves); Appoint Board with relevant experience in payments/technology/finance; Establish key management including CEO, CTO, CFO, and Compliance Officer; and Prepare comprehensive documentation including MOA/AOA, financial statements, and business plan.

Application documentation checklist: Company incorporation certificate and MOA/AOA; Board resolution authorizing PA application; Audited financials for last 3 years (or since incorporation); Net worth certificate from statutory auditor; KYC documents for all directors and shareholders with >10% stake; Fit and proper declarations; Technology architecture and security documentation; and Business plan with 5-year projections including transaction volumes and revenue.

Stage 1 - Application submission: Register on PRAVAAH portal and create application; Upload all documents in prescribed format; Pay application fee of ₹1,00,000; Submit signed physical copies to RBI; and Receive acknowledgment within 30 days.

Stage 2 - In-principle approval: RBI reviews documentation and may seek clarifications; Background verification of promoters and directors; Assessment of business plan viability; In-principle approval granted within 120 days if eligible; and Authorization to begin technology implementation.

Stage 3 - System audit and final approval: Engage CERT-In empaneled auditor for system audit; Implement all security requirements (encryption, access controls, DR); Demonstrate KYC/AML system functionality; Complete PCI-DSS certification; Submit audit reports to RBI; and Final authorization upon satisfactory compliance. Post-authorization, PAs must submit quarterly compliance reports and undergo annual audits.',
    '["Prepare complete documentation package as per RBI PA application checklist", "Engage CERT-In empaneled auditor for preliminary gap assessment", "Build or procure compliant technology infrastructure meeting RBI security requirements", "Establish escrow arrangement with scheduled commercial bank for merchant settlements"]'::jsonb,
    '[{"title": "RBI PA Application Form", "url": "https://pravaah.rbi.org.in/", "type": "form"}, {"title": "CERT-In Empaneled Auditors List", "url": "https://www.cert-in.org.in/", "type": "directory"}, {"title": "PCI-DSS Compliance Guide", "url": "https://www.pcisecuritystandards.org/", "type": "standard"}, {"title": "RBI Cyber Security Framework", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=10435", "type": "framework"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 3.3: Compliance and Operations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m3_id, 9, 'Compliance and Operations',
    'Operating as a licensed Payment Aggregator requires continuous compliance with RBI guidelines, regular reporting, and robust operational controls. The regulatory burden is significant but creates barriers to entry and customer trust. Understanding these obligations helps build sustainable payment businesses.

Merchant onboarding requirements: KYC verification of all merchants (individual or business); Website/app review for prohibited products (gambling, crypto, adult content); Business verification including GST registration, bank account, and PAN; Agreement execution with prescribed terms including chargeback liability; and Ongoing monitoring for suspicious activity or terms violation. Merchant due diligence must be documented and auditable.

Escrow account operations: Maintain designated escrow account with scheduled commercial bank; Customer funds must be credited to escrow within T+1 of transaction; Merchant settlements from escrow within T+1 to T+3 as agreed; No fund utilization for own business purposes; Reconciliation and audit trails for all movements; and Interest earned belongs to PA (significant revenue at scale).

Reporting obligations: Quarterly returns on transaction volumes, merchant count, and complaints; Annual compliance certificate from statutory auditor; Immediate reporting of security incidents to RBI and CERT-In; STR filing to FIU-IND for suspicious transactions; and Board-approved cyber security policy with annual review.

Customer protection requirements: Prominent display of merchant details on payment page; Clear refund and cancellation policies; Complaint resolution within 30 days; Escalation matrix including RBI Ombudsman; Transaction SMS/email notifications; and Data protection as per RBI guidelines.

Annual compliance costs typically include: Statutory audit (₹5-10 lakhs); System audit by CERT-In empaneled auditor (₹8-15 lakhs); PCI-DSS certification (₹10-20 lakhs); Compliance team salaries (₹25-40 lakhs); Technology infrastructure and security (₹15-25 lakhs); and Insurance and legal (₹5-10 lakhs). Total annual compliance budget of ₹70 lakhs to ₹1.2 crore is typical for mid-sized PAs.',
    '["Design merchant onboarding workflow with KYC verification and website review process", "Establish escrow account relationship with bank including reconciliation procedures", "Create compliance calendar covering all RBI reporting deadlines and audit requirements", "Build customer complaint management system with escalation matrix and SLA tracking"]'::jsonb,
    '[{"title": "RBI PA Compliance Requirements", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=11822", "type": "regulation"}, {"title": "RBI Ombudsman Scheme", "url": "https://cms.rbi.org.in/", "type": "portal"}, {"title": "NPCI Dispute Resolution Guidelines", "url": "https://www.npci.org.in/", "type": "guideline"}, {"title": "RBI Return Filing Portal", "url": "https://cosmos.rbi.org.in/", "type": "portal"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 4: UPI Integration
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'UPI Integration', 'Technical and business guide to integrating with India''s UPI ecosystem.', 4, NOW(), NOW())
    RETURNING id INTO v_m4_id;

    -- Lesson 4.1: UPI Architecture and Ecosystem
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m4_id, 10, 'UPI Architecture and Ecosystem',
    'Unified Payments Interface (UPI) has revolutionized Indian payments, processing over 12 billion transactions monthly worth ₹18+ lakh crore. Understanding UPI''s architecture is essential for building payment products in India. Developed by NPCI, UPI enables instant, 24/7 interbank transfers using virtual payment addresses.

UPI ecosystem participants: NPCI (National Payments Corporation of India) operates UPI infrastructure and sets rules; PSP Banks (Payment Service Provider) provide UPI services through their apps; Issuer Banks hold customer accounts and process debits; Acquirer Banks/PAs onboard merchants and process credits; TPAPs (Third Party Application Providers) like PhonePe, Google Pay operate consumer apps; and Merchants receive payments via QR codes or payment links.

Technical architecture: VPA (Virtual Payment Address) like name@bankpsp maps to bank account; UPI PIN authenticates transactions (2FA - device binding + PIN); Request flow: TPAP → PSP Bank → NPCI Switch → Issuer Bank → Account; Real-time settlement with immediate credit to beneficiary; and API-based architecture with JSON payloads and secure encryption.

Transaction types: P2P (Person to Person) transfers between individuals; P2M (Person to Merchant) payments for commerce; UPI Collect requests (pull payments initiated by payee); UPI Intent for app-to-app payments; UPI AutoPay for recurring mandates (up to ₹1 lakh); and UPI 123PAY for feature phone users. QR codes (Static and Dynamic) enable offline merchant payments.

UPI market dynamics: PhonePe leads with 47% market share, followed by Google Pay (34%) and Paytm (12%); Transaction success rate averages 96%+ across the system; Zero MDR on UPI P2M transactions (merchants pay nothing); PSP banks earn incentive from government (₹1,300 crore annually); and New entrants include WhatsApp Pay, Amazon Pay, and bank apps.

Business opportunities in UPI ecosystem: Merchant acquiring with value-added services (analytics, credit); Bill payments and subscription management; Cross-border UPI (Singapore, UAE, France linkages); UPI for IoT payments and transit; Credit on UPI (RuPay credit card linking); and UPI Lite for small-value offline transactions.',
    '["Study NPCI UPI technical specifications and understand API flows for each transaction type", "Map UPI ecosystem participants and identify integration requirements for your use case", "Analyze market share trends and identify opportunities in underserved UPI segments", "Evaluate UPI business models for monetization given zero MDR environment"]'::jsonb,
    '[{"title": "NPCI UPI Product Overview", "url": "https://www.npci.org.in/what-we-do/upi/product-overview", "type": "documentation"}, {"title": "UPI Technical Specifications", "url": "https://www.npci.org.in/PDF/npci/upi/Product-Collateral/UPI-2.0-Presentation.pdf", "type": "specification"}, {"title": "NPCI Monthly Statistics", "url": "https://www.npci.org.in/statistics", "type": "data"}, {"title": "UPI Linking with International Networks", "url": "https://www.npci.org.in/what-we-do/upi/upi-international", "type": "documentation"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 4.2: UPI Integration Methods
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m4_id, 11, 'UPI Integration Methods',
    'Integrating UPI into your application can be achieved through multiple methods depending on your license status, use case, and technical requirements. Understanding each approach helps choose the optimal integration strategy for your FinTech product.

Integration via Payment Aggregators: Easiest method for most businesses; Use APIs from Razorpay, Cashfree, PayU, or similar licensed PAs; Typical integration: Generate payment link/intent → Customer completes on UPI app → Webhook callback for status; MDR charges (0.3-0.5% though passed to merchant as zero); No direct NPCI relationship required; and Settlement T+1 or T+2 to your bank account.

PSP Bank partnership model: For apps wanting deeper UPI integration; Partner with a bank to become TPAP (Third Party Application Provider); Requirements: Security audit, compliance framework, bank sponsorship; User binds bank account to your app for payments; Revenue share model with PSP bank; and Examples: PhonePe (YES Bank initially), Google Pay (multiple banks).

Direct NPCI membership: For banks and large entities; Requires NPCI membership (different tiers); Direct API integration with UPI switch; Higher control and lower transaction costs; Significant technical and compliance investment; and Typically for entities processing 100M+ transactions monthly.

Technical implementation considerations: UPI Intent enables seamless app switch for payments; UPI Collect initiates pull requests (lower success rate); QR code generation for offline/static payments; Webhooks for asynchronous status updates (critical for reliability); Idempotency handling for duplicate callbacks; and Error handling for the 50+ UPI failure codes.

UPI SDK integration: NPCI provides SDK for registered TPAPs; Handles device binding, PIN entry, and secure communication; Regular updates required for security patches; Testing in UAT environment before production; and Compliance with UPI branding guidelines mandatory.

Advanced UPI features: UPI Autopay for recurring payments (subscriptions, EMIs) up to ₹1 lakh; UPI Lite for small transactions (up to ₹500) without PIN; UPI 123PAY for feature phones via IVR; Credit line on UPI for instant credit access; and UPI for IPO applications, mutual funds, and insurance.',
    '["Evaluate integration methods and select appropriate approach for your use case and scale", "Implement UPI payment flow using PA APIs with proper error handling and webhooks", "Test all UPI failure scenarios and implement user-friendly error messages", "Design QR code strategy for offline merchant payments if applicable"]'::jsonb,
    '[{"title": "Razorpay UPI Integration Guide", "url": "https://razorpay.com/docs/payments/payment-methods/upi/", "type": "documentation"}, {"title": "Cashfree UPI API Documentation", "url": "https://docs.cashfree.com/docs/upi", "type": "documentation"}, {"title": "NPCI TPAP Guidelines", "url": "https://www.npci.org.in/what-we-do/upi/3rd-party-apps", "type": "guideline"}, {"title": "UPI Error Codes Reference", "url": "https://www.npci.org.in/PDF/npci/upi/circular/UPI-Response-Codes.pdf", "type": "reference"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 4.3: UPI Business Strategy
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m4_id, 12, 'UPI Business Strategy',
    'Building sustainable businesses around UPI requires creative strategies given the zero MDR environment for P2M transactions. Successful UPI businesses monetize through adjacent services, data insights, and ecosystem value rather than transaction fees.

Zero MDR impact and alternatives: Government absorbs MDR for UPI P2M (merchants pay nothing); PSP banks receive government incentive (₹1,300 crore pool annually); For FinTechs, direct UPI revenue is minimal; Monetization must come from value-added services; and Premium features (instant settlement, analytics, invoicing) can command fees.

Successful UPI business models: Merchant services platforms combining UPI with POS, inventory, and accounting; Lending based on UPI transaction data (cash flow-based underwriting); Subscription management using UPI Autopay; Bill aggregation platforms earning from billers; and Cross-border remittance using UPI international linkages.

Data and analytics opportunities: Transaction pattern analysis for credit scoring; Merchant category insights for targeted offers; Customer spending behavior for personalization; Fraud detection services based on anomaly detection; and Aggregate market intelligence (anonymized) for enterprise clients.

UPI for specific verticals: E-commerce: Payment links, refund automation, COD digitization; Offline retail: QR payments, billing integration, loyalty programs; Transit: Contactless payments, season passes, parking; Healthcare: OPD payments, insurance claims, pharmacy; and Education: Fee collection, recurring payments, international student payments.

Building competitive advantage: Superior success rates through bank relationship management; Faster settlements (T+0 vs T+2) as premium offering; Better reconciliation and reporting tools; Omnichannel support (UPI + cards + wallets + BNPL); Integration ecosystem with accounting, ERP, and CRM; and Superior customer support for payment issues.

Future UPI opportunities: Credit on UPI expanding rapidly (RuPay credit card linking); UPI for offline small merchants (250M+ opportunity); Cross-border UPI to 10+ countries by 2025; UPI for B2B payments and supply chain; and Conversational payments via WhatsApp and voice assistants.',
    '["Design value-added service strategy around UPI payments for your target merchants", "Build unit economics model showing path to profitability despite zero MDR", "Identify 3-5 vertical-specific UPI use cases with monetization potential", "Develop data strategy leveraging UPI transaction insights for adjacent services"]'::jsonb,
    '[{"title": "RBI Zero MDR Notification", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11778", "type": "regulation"}, {"title": "NPCI Credit Line on UPI", "url": "https://www.npci.org.in/what-we-do/upi/upi-credit-line", "type": "product"}, {"title": "UPI International Expansion", "url": "https://www.npci.org.in/what-we-do/upi/upi-international", "type": "documentation"}, {"title": "Merchant Payments Report - BCG/PhonePe", "url": "https://www.phonepe.com/pulse/", "type": "research"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 5: NBFC Registration
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'NBFC Registration', 'Complete guide to registering and operating an NBFC in India.', 5, NOW(), NOW())
    RETURNING id INTO v_m5_id;

    -- Lesson 5.1: NBFC Categories and Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 13, 'NBFC Categories and Requirements',
    'Non-Banking Financial Companies (NBFCs) are crucial for India''s credit ecosystem, providing ₹35+ lakh crore in loans. RBI regulates NBFCs under a scale-based framework with different compliance requirements based on size and systemic importance. Understanding NBFC categories helps choose the appropriate license for your lending business.

NBFC categories by activity: NBFC-ICC (Investment and Credit Company) - most common, can lend and invest; NBFC-MFI (Microfinance Institution) - focus on low-income borrowers, 85%+ qualifying assets; NBFC-Factor - factoring/invoice discounting only; NBFC-P2P (Peer to Peer Lending) - platform connecting lenders and borrowers; NBFC-AA (Account Aggregator) - consent-based financial data sharing; and HFC (Housing Finance Company) - now regulated by RBI, housing loan focus.

Scale-based regulation framework (October 2022): Base Layer - NBFCs with assets below ₹1,000 crore; Middle Layer - assets ₹1,000-10,000 crore plus specific categories; Upper Layer - systemically important NBFCs identified by RBI; and Top Layer - currently empty, for exceptional circumstances. Higher layers face stricter capital, governance, and disclosure requirements.

Minimum requirements for NBFC registration: Net Owned Funds (NOF) of ₹10 crore minimum (increased from ₹2 crore in 2022); For NBFC-P2P and NBFC-AA, NOF is ₹2 crore; Company must be registered under Companies Act; Directors must meet fit and proper criteria; and Business plan demonstrating lending expertise required.

Key regulatory metrics: Capital adequacy ratio (CRAR) minimum 15% (higher than banks); NPA recognition at 90 days (aligned with banks); Asset classification and provisioning norms; Concentration limits (single borrower 20%, group 25% of NOF); and Liquidity Coverage Ratio for larger NBFCs.

Restricted activities: NBFCs cannot accept demand deposits; Public deposits allowed only for specific categories with restrictions; No foreign currency lending (except specific approvals); and Certain sectors like agriculture have directed lending if taking public deposits.',
    '["Evaluate NBFC categories and identify the most suitable license type for your lending model", "Calculate capital requirements based on projected loan book and regulatory ratios", "Review scale-based regulation framework and plan compliance roadmap as you grow", "Assess fit and proper criteria for proposed directors and prepare documentation"]'::jsonb,
    '[{"title": "RBI NBFC Master Direction", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=12550", "type": "regulation"}, {"title": "RBI Scale Based Regulation", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12179", "type": "framework"}, {"title": "NBFC Registration FAQ", "url": "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=92", "type": "faq"}, {"title": "RBI NBFC Registration Portal", "url": "https://cosmos.rbi.org.in/", "type": "portal"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 5.2: NBFC Registration Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 14, 'NBFC Registration Process',
    'Obtaining NBFC registration from RBI requires substantial preparation and typically takes 6-12 months. The process has become more stringent post-2022 with increased capital requirements and enhanced scrutiny of promoters. Understanding each step helps ensure successful registration.

Pre-application setup: Incorporate company under Companies Act 2013 with appropriate objects clause; Raise minimum ₹10 crore as Net Owned Funds (paid-up capital + free reserves - intangible assets); Appoint Board with relevant experience in finance, banking, or lending; Identify CEO with minimum 10 years experience in financial services; and Prepare detailed business plan with 5-year projections.

Documentation requirements: Certificate of Incorporation and MOA/AOA; Board resolution for NBFC application; Audited financials (or projected for new company); NOF certificate from statutory auditor; Directors'' KYC and fit and proper declarations; Shareholding pattern with ultimate beneficial owners; Business plan including target segment, products, sourcing, and risk management; and Fair Practice Code and KYC policy drafts.

Application submission via COSMOS portal: Register on RBI''s COSMOS portal; Fill online application form with company details; Upload all documents in prescribed format; Pay application fee (₹10,000 for non-refundable fee); and Submit physical copies to regional RBI office.

RBI review process: Acknowledgment within 30 days of complete application; Regional office conducts preliminary review; Background verification of promoters and directors; RBI may seek additional clarifications (multiple rounds common); Technical review of business plan and policies; and Certificate of Registration (CoR) issued if satisfied.

Common rejection reasons: Insufficient NOF or capital not in accessible form; Promoter/director background issues or lack of experience; Unclear or unrealistic business plan; Inadequate risk management framework; and Objects clause not aligned with NBFC activities. Post-registration, NBFC must commence business within 6 months and file regular returns.',
    '["Incorporate company with NBFC-appropriate objects clause in MOA", "Raise and park ₹10 crore NOF with supporting auditor certificate", "Prepare comprehensive business plan addressing all RBI requirements", "Draft Fair Practice Code and KYC policy as per RBI guidelines"]'::jsonb,
    '[{"title": "COSMOS Portal for NBFC Application", "url": "https://cosmos.rbi.org.in/", "type": "portal"}, {"title": "RBI NBFC Application Checklist", "url": "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=92", "type": "checklist"}, {"title": "RBI Fair Practice Code Guidelines", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12031", "type": "guideline"}, {"title": "NBFC Fit and Proper Criteria", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12168", "type": "regulation"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 5.3: NBFC-P2P Specific Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m5_id, 15, 'NBFC-P2P Specific Requirements',
    'NBFC-P2P (Peer to Peer Lending Platforms) operate under specific RBI regulations allowing them to connect lenders and borrowers through technology platforms. With 26 registered P2P NBFCs in India, this category offers lower capital requirements but stringent operational restrictions. Understanding P2P regulations is essential for building lending marketplaces.

NBFC-P2P specific requirements: Minimum Net Owned Funds of ₹2 crore (lower than regular NBFC); Leverage ratio not exceeding 2 (total outside liabilities/NOF); Must operate only as intermediary, cannot lend own funds; Cannot provide credit guarantee or credit enhancement; and Technology platform must be proprietary, not white-labeled.

Lender and borrower limits: Individual lender exposure limited to ₹50 lakhs across all P2P platforms; Single borrower limit of ₹10 lakhs aggregate across platforms; Maximum loan tenure of 36 months; No institutional lenders initially (now allowed with conditions); and Platform must maintain database with CRILC (Central Repository of Large Credits).

Operational requirements: Funds must flow through escrow accounts maintained with banks; P2P cannot handle cash directly; KYC mandatory for both lenders and borrowers; Credit assessment data must be disclosed to lenders; Loan agreement between lender and borrower (platform is facilitator); and Recovery mechanisms limited to soft collection, no coercive practices.

Disclosure and reporting: Display all charges, fees upfront; Risk acknowledgment from lenders; Publish portfolio performance data; Monthly data submission to RBI; and Annual audit by statutory and system auditors.

Business model considerations: Revenue from registration fees, service fees, and convenience fees; Typical fee structure: 2-4% from borrowers, 1-2% from lenders; Unit economics challenging at small scale; Need 10,000+ active lender-borrower pairs for viability; Co-lending tie-ups with banks/NBFCs emerging; and Niche focus (SME, education, medical) showing better traction than generic personal loans.

Key P2P platforms in India include Faircent (largest), LenDenClub, Liquiloans, and i2iFunding. The sector has disbursed ₹10,000+ crore cumulatively with average default rates of 3-5%.',
    '["Analyze P2P business model viability with realistic lender-borrower projections", "Design platform architecture meeting NBFC-P2P technology requirements", "Create lender risk disclosure framework and borrower credit assessment methodology", "Establish escrow account relationship and fund flow mechanism with partner bank"]'::jsonb,
    '[{"title": "RBI NBFC-P2P Master Direction", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=11137", "type": "regulation"}, {"title": "RBI P2P FAQ", "url": "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=130", "type": "faq"}, {"title": "FLPA (Fintech Lenders Association) Guidelines", "url": "https://www.dlai.in/", "type": "industry"}, {"title": "P2P Platform Comparison", "url": "https://www.paisabazaar.com/p2p-lending/", "type": "comparison"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 6: Lending Business
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Lending Business', 'Building and operating digital lending business in India.', 6, NOW(), NOW())
    RETURNING id INTO v_m6_id;

    -- Lesson 6.1: Digital Lending Guidelines 2022
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 16, 'Digital Lending Guidelines 2022',
    'RBI''s Digital Lending Guidelines issued in September 2022 fundamentally transformed the lending landscape, bringing all digital lending under strict regulatory oversight. These guidelines apply to all lending involving digital interfaces, affecting NBFCs, banks, and their technology partners. Compliance is mandatory and violations attract severe penalties.

Key definitions under guidelines: Digital Lending - remote or online lending through digital technologies; Regulated Entity (RE) - banks, NBFCs with lending license; Lending Service Provider (LSP) - agents of RE providing services; Digital Lending Apps (DLA) - mobile/web applications for lending functions; and First Loss Default Guarantee (FLDG) - credit enhancement by third parties.

Core regulatory requirements: All loans must be disbursed directly to borrower''s verified bank account; No pass-through accounts or third-party disbursements allowed; All loan servicing in RE''s name (not LSP brand); Complete fee disclosure before loan acceptance; and Cooling-off period allowing borrowers to exit without penalty.

LSP regulations: LSP must be formally appointed by RE with Board approval; Due diligence on LSP required before empanelment; LSP activities limited to customer acquisition, documentation, and servicing; LSP cannot collect repayments in cash or pool funds; and RE responsible for LSP conduct and compliance.

FLDG framework (clarified August 2023): FLDG from LSP/DLA capped at 5% of loan portfolio; Must be backed by cash deposits or bank guarantees; FLDG provider subject to due diligence; Invocation only after RE exhausts recovery efforts; and FLDG arrangements must be disclosed to borrowers.

Impact on existing models: Many app-based lenders had to restructure as LSPs or get NBFC license; BNPL providers brought under digital lending framework; Lead generation businesses face RE empanelment requirements; Collection agencies need RE contracts; and Marketing restrictions (no false claims of instant approval).

Consumer protection measures: Key Fact Statement (KFS) with APR disclosure mandatory; Automatic access to credit bureaus for disputes; Grievance redressal with escalation to RBI; Ban on automatic debit without explicit consent; and Data privacy protections with purpose limitation.',
    '["Map your lending business model to Digital Lending Guidelines requirements", "Create LSP empanelment framework if operating as technology provider", "Design Key Fact Statement template with full APR and fee disclosure", "Implement borrower consent and cooling-off period mechanisms"]'::jsonb,
    '[{"title": "RBI Digital Lending Guidelines", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12382", "type": "regulation"}, {"title": "RBI FLDG Clarification", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12524", "type": "regulation"}, {"title": "Digital Lending FAQ", "url": "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=155", "type": "faq"}, {"title": "DLAI Fair Practice Code", "url": "https://www.dlai.in/fair-practices-code", "type": "guideline"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 6.2: Credit Assessment and Underwriting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 17, 'Credit Assessment and Underwriting',
    'Credit assessment is the foundation of profitable lending. Digital lending enables new data sources and real-time decisioning, but also introduces unique risks. Building robust underwriting systems requires combining traditional credit data with alternative signals while managing model risk and regulatory compliance.

Traditional credit data sources: Credit bureau reports (CIBIL, Experian, Equifax, CRIF Highmark); Bank statements (income, spending, existing obligations); ITR and Form 16 for income verification; KYC documents for identity and address; and Employment verification for salaried individuals. Bureau scores above 700 are typically low-risk; below 650 requires additional scrutiny.

Alternative data for thin-file customers: Account Aggregator data (consented bank statement analysis); UPI transaction patterns (frequency, merchants, amounts); Mobile data (with consent) - app usage, contacts, location stability; E-commerce purchase history and payment patterns; GST returns for business lending; and Social/professional profiles for identity validation.

Underwriting model components: Application scorecards using logistic regression or ML models; Bureau score incorporation with risk weights; Income estimation from bank statements and GST; Debt-to-income calculation for affordability; and Policy rules for cutoffs, exceptions, and overrides.

Model development best practices: Train on historical data with 12-24 month performance window; Feature engineering focusing on predictive variables; Separate models for different customer segments; Regular model validation and recalibration; and Champion-challenger testing for improvements.

Fraud detection in underwriting: Device fingerprinting for repeat applications; Velocity checks on applications per device/phone/email; Image fraud detection for document manipulation; Identity verification through face match and liveliness; and Network analysis for organized fraud rings.

Pricing and risk-based decisions: Risk-based pricing with APR varying by score band; Loan amount limits based on income and risk; Tenure restrictions for higher-risk segments; Processing fee variations; and Cross-sell propensity for repeat customers. Best-in-class digital lenders achieve 90%+ automation with sub-2% NPA through robust underwriting.',
    '["Design credit scorecard incorporating bureau scores and alternative data signals", "Evaluate Account Aggregator integration for bank statement analysis", "Build fraud detection rules covering application, identity, and device fraud", "Create risk-based pricing matrix with APR tiers by customer segment"]'::jsonb,
    '[{"title": "CIBIL Score Understanding", "url": "https://www.cibil.com/", "type": "bureau"}, {"title": "Account Aggregator Framework", "url": "https://sahamati.org.in/", "type": "framework"}, {"title": "RBI Guidelines on Credit Information", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=9787", "type": "regulation"}, {"title": "Bureau.id for KYC/Fraud", "url": "https://bureau.id/", "type": "vendor"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 6.3: Collections and Recovery
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m6_id, 18, 'Collections and Recovery',
    'Collections and recovery significantly impact lending profitability. India''s digital lending industry faces 5-15% default rates, making efficient collections essential. However, aggressive practices have attracted regulatory scrutiny, requiring balanced approaches that maximize recovery while ensuring compliance and customer dignity.

Collection strategy framework: Pre-due date reminders (SMS, email, app notifications); Due date follow-ups for missed payments; Early bucket (1-30 DPD) soft collections; Middle bucket (31-90 DPD) intensive engagement; Late bucket (90+ DPD) legal and recovery actions; and Write-off and recovery post charge-off.

RBI Fair Practice Code requirements: No harassment or intimidation of borrowers; Contact only between 8 AM and 7 PM; No contact with third parties (employer, family) for regular collections; Collection agents must identify themselves and represent RE; No obscene language, physical intimidation, or public shaming; and Provide complete statement of dues on request.

Digital collection tools: Auto-debit (NACH/e-mandate) for scheduled repayments; UPI Autopay for recurring collections; Payment reminders via WhatsApp, SMS, email; Self-service payment links for convenience; Chatbots for negotiation and restructuring; and AI-based optimal contact time prediction.

Collections analytics: Roll rate analysis (movement between DPD buckets); Collector efficiency metrics (PTP conversion, amount collected); Right party contact rates; Promise-to-pay conversion; Recovery rate by vintage; and Cost per rupee collected.

Legal recovery mechanisms: SARFAESI Act for secured loans above ₹1 lakh; DRT (Debt Recovery Tribunal) for claims above ₹20 lakhs; Arbitration for faster resolution; Lok Adalat for amicable settlement; and IBC for corporate borrowers. Legal recovery typically takes 18-36 months and recovers 30-40% of dues.

Restructuring and settlement: One-time settlement (OTS) for unlikely-to-recover accounts; EMI restructuring for temporary hardship; Top-up loans for good-track customers needing relief; Moratorium during emergencies (COVID precedent); and Write-off with continued soft collection. Best practices suggest settling at 60-70% for 90+ DPD accounts to optimize NPV of recovery.',
    '["Design collection waterfall with appropriate treatment for each delinquency bucket", "Build collection technology stack including auto-debit, reminders, and payment links", "Create collection agent script ensuring Fair Practice Code compliance", "Develop settlement matrix with authorization levels for different DPD and amount combinations"]'::jsonb,
    '[{"title": "RBI Fair Practice Code for NBFCs", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=12031", "type": "regulation"}, {"title": "SARFAESI Act Summary", "url": "https://www.indiacode.nic.in/handle/123456789/1972", "type": "law"}, {"title": "DRT Procedures", "url": "https://drt.gov.in/", "type": "legal"}, {"title": "NACIN Collection Best Practices", "url": "https://www.credgenics.com/resources", "type": "guideline"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 7: Insurance Tech (IRDAI)
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Insurance Tech (IRDAI)', 'Building InsurTech ventures under IRDAI regulatory framework.', 7, NOW(), NOW())
    RETURNING id INTO v_m7_id;

    -- Lesson 7.1: InsurTech Landscape India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 19, 'InsurTech Landscape India',
    'India''s insurance market presents massive opportunity with only 4.2% insurance penetration (vs. 7% global average) and ₹6 lakh crore premium potential. InsurTech is transforming distribution, underwriting, and claims through technology, with the sector attracting $2 billion+ investment since 2020.

Market overview: Life insurance market at ₹7.5 lakh crore premium annually; General insurance at ₹2.5 lakh crore with motor (40%) and health (30%) dominating; 24 life insurers and 34 general insurers; LIC still commands 60%+ life market share; and Private players (HDFC Life, ICICI Pru, SBI Life) gaining ground.

InsurTech categories: Digital distributors (PolicyBazaar, Acko, Digit, TATA AIG Digital); Point-of-sale integrators (Onsurity, Plum for group health); Claim-tech providers (ClaimBuddy, MediBuddy); Insurance infrastructure (Artivatic for underwriting, Riskcovry for APIs); and Embedded insurance enablers.

Regulatory framework under IRDAI: Insurance Regulatory and Development Authority of India governs all insurance; Sandbox framework enables controlled innovation; Web aggregator guidelines for comparison platforms; Brokerage and corporate agent licensing for distribution; and New regulations enabling insurers to issue digital policies.

Distribution channels: Individual agents (still 50%+ of distribution); Corporate agents (banks, NBFCs, retailers); Brokers (independent advisors for complex risks); Web aggregators (online comparison and purchase); and Point-of-sale persons for simple products. Commissions vary: 15-35% first year for life, 10-20% for general insurance.

Technology opportunities: Underwriting automation using AI for risk assessment; Telematics for usage-based motor insurance; Wearables integration for health insurance pricing; Claims automation with AI document processing; Fraud detection using data analytics; and Vernacular interfaces for tier-2/3 distribution.

Investment landscape: PolicyBazaar IPO (2021) at $6B+ valuation; Digit, Acko achieved unicorn status; Series A/B funding continues despite slowdown; B2B InsurTech (infrastructure, API) attracting interest; and Embedded insurance seeing rapid growth.',
    '["Map the InsurTech ecosystem identifying top players, investors, and emerging trends", "Analyze insurance penetration gaps and identify high-potential product-market combinations", "Research IRDAI regulatory sandbox and identify innovation opportunities", "Evaluate B2B vs B2C InsurTech models for your venture"]'::jsonb,
    '[{"title": "IRDAI Annual Report", "url": "https://www.irdai.gov.in/admincms/cms/frmGeneral_List.aspx?DF=AR&mid=11.1", "type": "report"}, {"title": "IRDAI Sandbox Regulations", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo4358", "type": "regulation"}, {"title": "India InsurTech Report - BCG", "url": "https://www.bcg.com/industries/insurance", "type": "research"}, {"title": "PolicyBazaar IPO Prospectus", "url": "https://www.sebi.gov.in/", "type": "filing"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 7.2: Insurance Distribution Licensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 20, 'Insurance Distribution Licensing',
    'Distributing insurance in India requires appropriate IRDAI licensing. Understanding the various distribution licenses helps choose the right model for your InsurTech venture. Each license type has distinct requirements, limitations, and revenue potential.

Individual agent license: Simplest form of distribution license; Training (50 hours for life, 50 for general) and exam required; Tied to single insurer (cannot multi-brand); Commission-based income (15-35% first year life); 12 lakh+ agents in India; and Not suitable for tech platform models.

Corporate Agent (CA) license: Entity license to distribute for up to 3 insurers per category; Categories: life, general, health (so up to 9 insurers total); Capital requirement: varies by entity type (₹10-50 lakhs); Training requirements for specified persons; and Suitable for banks, NBFCs, retailers adding insurance. IRDAI allows any entity including startups to apply.

Insurance Broker license: Can distribute products from all insurers; Three categories: Direct (placement only), Reinsurance, and Composite; Capital requirement: ₹75 lakhs for direct broker; Extensive compliance including E&O insurance; Annual license renewal with fee; and Suitable for independent advisory platforms.

Insurance Web Aggregator (IWA) license: Specifically for online comparison platforms; Capital requirement: ₹50 lakhs; Can compare quotes and redirect to insurer/broker; Lead generation with commission sharing model; Only 10 licensed web aggregators currently; and PolicyBazaar, Coverfox operate under this license.

Point of Sale Person (PoSP): Simplified distribution for specified products; Training: 15 hours; Limited to products with sum insured up to ₹5 lakhs; Can sell motor, health, travel, and personal accident; Popular for embedded distribution models; and Fintech companies use PoSP for integrated insurance.

Recent regulatory changes: BIMA SUGAM platform for policy issuance and claims; Ease of onboarding for tech-based distributors; Sandbox for innovative distribution models; Common e-insurance account for policy portability; and Increased digitization requirements for all channels.',
    '["Evaluate distribution license options and select appropriate model for your InsurTech", "Calculate capital and compliance requirements for chosen license type", "Design distribution technology platform meeting IRDAI requirements", "Identify insurer partnerships for product sourcing post-licensing"]'::jsonb,
    '[{"title": "IRDAI Corporate Agent Regulations", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo3851", "type": "regulation"}, {"title": "IRDAI Broker Regulations", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo3852", "type": "regulation"}, {"title": "Web Aggregator Guidelines", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo4070", "type": "guideline"}, {"title": "PoSP Guidelines", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo4069", "type": "guideline"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 7.3: Embedded Insurance Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m7_id, 21, 'Embedded Insurance Models',
    'Embedded insurance integrates coverage into non-insurance products and services at the point of need, dramatically improving conversion and customer experience. This model is transforming insurance distribution globally and India is seeing rapid adoption across e-commerce, travel, mobility, and financial services.

Embedded insurance fundamentals: Insurance sold at the point of sale of another product/service; Coverage contextual to the purchase (travel insurance with flights); Simplified underwriting (often single-click purchase); Micro-premiums for specific, time-bound risks; and Higher conversion due to relevance and convenience. Examples: phone damage cover with smartphone purchase, transit insurance with shipping.

Popular embedded insurance categories: E-commerce: Product warranty extension, damage protection, return shipping; Travel: Trip cancellation, baggage loss, medical emergency; Mobility: Per-ride or per-day motor insurance, EV battery cover; FinTech: Loan protection, card fraud protection, account balance insurance; Gig economy: Per-gig accident cover, equipment protection; and Health: OPD covers, pharmacy benefit, teleconsultation.

Building embedded insurance: Platform (distributor) needs appropriate license (CA, PoSP, or partnership); Insurance product designed for the use case (bite-sized coverage); API integration for real-time quote and policy issuance; Claims process simplified (often automated for small claims); and Revenue share between platform and insurer (typically 10-30% of premium to platform).

Technical implementation: RESTful APIs for quote, purchase, and claims; Customer data passed for underwriting (minimal for embedded); Digital policy document delivery (email, in-app); Claims initiation through platform interface; and Settlement to platform for distribution to customer.

InsurTech infrastructure providers: Companies like Riskcovry, Turtlemint provide white-label embedded insurance; Pre-integrated with multiple insurers; API-first approach for easy platform integration; Compliance handled by infrastructure provider; and Enable non-insurance companies to offer insurance seamlessly.

Unit economics: Premium per transaction: ₹10-500 for micro-insurance; Attach rate: 5-15% typical, up to 30% for well-designed; Commission: 10-30% of premium; Customer acquisition cost: near-zero (embedded in existing journey); and LTV through renewals and cross-sell. Success requires product-market fit, seamless UX, and claims excellence.',
    '["Identify 3-5 embedded insurance opportunities in your platform or target industry", "Design insurance product specifications for embedded distribution", "Evaluate InsurTech infrastructure providers for API-based integration", "Build business case with attach rate assumptions and unit economics"]'::jsonb,
    '[{"title": "Riskcovry Embedded Insurance Platform", "url": "https://www.riskcovry.com/", "type": "platform"}, {"title": "Turtlemint Distribution APIs", "url": "https://www.turtlemint.com/", "type": "platform"}, {"title": "IRDAI Microinsurance Guidelines", "url": "https://www.irdai.gov.in/ADMINCMS/cms/frmGeneral_Layout.aspx?page=PageNo3657", "type": "regulation"}, {"title": "Embedded Insurance Report - Lightyear", "url": "https://www.linkedin.com/company/lightyear-insurtech/", "type": "research"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 8: WealthTech
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'WealthTech', 'Building wealth management and investment technology platforms.', 8, NOW(), NOW())
    RETURNING id INTO v_m8_id;

    -- Lesson 8.1: WealthTech Landscape India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 22, 'WealthTech Landscape India',
    'India''s WealthTech sector has exploded with 100+ million investors now participating in capital markets, up from 40 million pre-COVID. Assets under management in mutual funds crossed ₹50 lakh crore, and retail participation in equities reached all-time highs. Technology platforms have democratized investing, creating massive opportunities.

Market landscape: Mutual funds AUM: ₹50+ lakh crore (35% CAGR since 2020); Demat accounts: 130+ million (3x growth since 2020); Direct equity investors: 80+ million active; PMS/AIF segment growing at 40%+ annually; and Systematic Investment Plans (SIPs): ₹17,000+ crore monthly inflows.

WealthTech categories: Discount brokers (Zerodha, Groww, Upstox, Angel One) offering low-cost trading; Mutual fund platforms (Coin, Kuvera, Paytm Money) for direct plan investing; Robo-advisors (Scripbox, Arthya, ETMONEY) providing automated portfolios; Trading platforms (Dhan, Fyers) for active traders; Alternative investments (Grip, Wint Wealth) for fixed income and alternatives; and Smallcase for thematic investing.

Regulatory framework: SEBI (Securities and Exchange Board of India) regulates all investment activities; Stock broker registration required for equity/derivatives trading; RIA (Registered Investment Adviser) license for personalized advice; Mutual fund distributor registration (ARN) for MF sales; and Portfolio Management Services (PMS) license for discretionary management.

Business models: Brokerage (flat fee or percentage of trade value); Distribution commission (from AMCs for regular plans); Advisory fees (% of AUM or fixed fee); Subscription for premium features; and Account opening charges, margin funding interest.

Market dynamics: Zero brokerage on delivery trades (led by Zerodha, now industry standard); Direct plans eliminating distributor commissions; SEBI pushing for fee-based advisory vs commission; Consolidation with larger players acquiring smaller ones; and International investing gaining traction (Vested, INDmoney).

Customer segments: First-time investors (mass market, app-first); Active traders (need advanced tools, low latency); HNIs (want personalized service, alternatives); and NRIs (specialized compliance requirements).',
    '["Map the WealthTech competitive landscape identifying gaps and opportunities", "Analyze customer segments and identify underserved needs in wealth management", "Research regulatory requirements for your target WealthTech activity", "Evaluate business models for sustainability given zero-brokerage trends"]'::jsonb,
    '[{"title": "SEBI Annual Report", "url": "https://www.sebi.gov.in/reports-and-statistics/publications/annual-reports.html", "type": "report"}, {"title": "AMFI Industry Data", "url": "https://www.amfiindia.com/research-information/aum-data", "type": "data"}, {"title": "NSE Market Statistics", "url": "https://www.nseindia.com/market-data", "type": "data"}, {"title": "Zerodha Varsity", "url": "https://zerodha.com/varsity/", "type": "education"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 8.2: Investment Advisory Licensing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 23, 'Investment Advisory Licensing',
    'Providing investment advice in India requires appropriate SEBI registration. The regulatory framework distinguishes between execution-only platforms, distribution, and advisory services. Understanding these distinctions is crucial for compliant WealthTech operations.

Stock Broker registration: Required for executing trades in securities (equity, derivatives, currency, commodities); Categories: Trading Member (for exchange trades) and Clearing Member; Net worth requirement: ₹1 crore for trading member, ₹3 crore+ for clearing; Exchange membership fee: ₹10-50 lakhs depending on segment; and Extensive compliance including margin requirements, risk management, and investor protection.

Investment Adviser (IA/RIA) registration: Required for providing personalized investment advice; SEBI (Investment Advisers) Regulations 2013 as amended; Individual IA: net worth ₹5 lakhs, qualification (CFA/CFP/postgraduate in finance), 5 years experience; Non-individual IA: net worth ₹50 lakhs, principal officer meeting individual requirements; Fee-only model mandated (cannot earn commission from products); and Must maintain arm''s length from distribution.

Research Analyst (RA) registration: Required for publishing investment research and recommendations; Net worth: ₹5 lakhs (individual), ₹25 lakhs (corporate); Qualification: graduation + certification (NISM Series XV); Cannot provide personalized advice (general recommendations only); and Many finfluencers operate under RA registration.

Mutual Fund Distributor (ARN): AMFI Registration Number for distributing mutual fund schemes; Exam: NISM Series V-A certification; Earn trail commission from AMCs (0.5-1% annually); Can recommend (not advise) suitable schemes; and ARN holders cannot charge clients directly.

Portfolio Management Services (PMS): Discretionary management of client portfolios; Minimum investment: ₹50 lakhs per client; Net worth requirement: ₹5 crores; Extensive reporting and audit requirements; and SEBI approval required before launch.

Compliance technology: SEBI requires all registered entities to maintain electronic records; Trade surveillance and manipulation detection; Client reporting and consent management; KYC compliance via KRA (KYC Registration Agency); and Grievance redressal mechanism mandatory.',
    '["Determine appropriate registration category for your WealthTech service model", "Calculate capital and compliance requirements for chosen registration", "Identify qualification and experience requirements for key personnel", "Design client onboarding flow meeting KRA and SEBI KYC requirements"]'::jsonb,
    '[{"title": "SEBI Investment Advisers Regulations", "url": "https://www.sebi.gov.in/legal/regulations/jan-2020/securities-and-exchange-board-of-india-investment-advisers-regulations-2013-last-amended-on-january-08-2020-_45790.html", "type": "regulation"}, {"title": "SEBI Stock Broker Regulations", "url": "https://www.sebi.gov.in/legal/regulations/apr-2021/securities-and-exchange-board-of-india-stock-brokers-regulations-1992_49549.html", "type": "regulation"}, {"title": "AMFI ARN Registration", "url": "https://www.amfiindia.com/distributor-corner/become-mutual-fund-distributor", "type": "registration"}, {"title": "NISM Certifications", "url": "https://www.nism.ac.in/certification/", "type": "certification"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 8.3: Building WealthTech Products
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m8_id, 24, 'Building WealthTech Products',
    'Building successful WealthTech products requires balancing user experience, regulatory compliance, and sustainable business models. The Indian market has evolved rapidly, and differentiation requires deep understanding of customer needs and technology capabilities.

Product design principles: Simplify complexity without oversimplifying risk; Mobile-first design (80%+ users on mobile); Vernacular support for tier-2/3 penetration; Education integrated into investment journey; and Gamification balanced with responsible investing. Successful products guide users through decisions rather than overwhelming with options.

Key WealthTech features: Portfolio analytics: holdings, returns (XIRR), asset allocation; Goal-based investing: linking investments to life goals; SIP management: setup, modification, pause, step-up; Research and insights: stock screeners, fund comparison, market news; Alerts and notifications: price alerts, portfolio updates, corporate actions; and Tax optimization: tax-loss harvesting, LTCG/STCG tracking.

Technology stack considerations: Real-time market data feeds (NSE, BSE, exchange connectivity); Order management system integration; Mutual fund order routing (BSE Star MF, MF Central); Depository (CDSL, NSDL) integration for holdings; Payment gateway integration for lump sum and SIP; and Mobile app with biometric authentication.

API and data providers: Market data: NSE, BSE, Global (for US stocks); Mutual funds: BSE Star MF, CAMS, Karvy for order routing; Holdings: CDSL, NSDL depository APIs; Analytics: Morningstar, Value Research for fund data; and KYC: CAMS KRA, CVL KRA for KYC verification.

Compliance integration: Order records retention for 5 years minimum; Client suitability assessment before recommendations; Risk profiling with documented methodology; Terms of service and disclosures as per SEBI format; and Grievance mechanism with escalation to SEBI.

Unit economics benchmarks: Customer acquisition cost: ₹200-500 for app install, ₹1,000-2,000 for active user; AUM per user: ₹10,000-50,000 for mass market, ₹5-50 lakhs for HNI; Revenue per user: ₹500-2,000 annually (commission/subscription); and Payback period: 18-36 months typical.',
    '["Design core product features based on target customer segment needs", "Evaluate technology vendors for market data, order routing, and depository integration", "Build compliance framework including suitability assessment and record keeping", "Develop unit economics model with realistic CAC, AUM, and revenue assumptions"]'::jsonb,
    '[{"title": "BSE Star MF Platform", "url": "https://www.bsestarmf.in/", "type": "platform"}, {"title": "CDSL Developer Portal", "url": "https://www.cdslindia.com/", "type": "api"}, {"title": "NSE Market Data Products", "url": "https://www.nseindia.com/products", "type": "data"}, {"title": "Morningstar India", "url": "https://www.morningstar.in/", "type": "research"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 9: Crypto & Blockchain
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Crypto & Blockchain', 'Understanding crypto regulations and blockchain applications in Indian FinTech.', 9, NOW(), NOW())
    RETURNING id INTO v_m9_id;

    -- Lesson 9.1: Crypto Regulatory Landscape India
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 25, 'Crypto Regulatory Landscape India',
    'India''s crypto regulatory landscape has been tumultuous, moving from proposed ban to recognition as an asset class with heavy taxation. Understanding the current framework is essential for any crypto or blockchain venture in India, though regulatory uncertainty continues.

Regulatory history: 2018 RBI circular effectively banned crypto (banks couldn''t serve exchanges); 2020 Supreme Court struck down RBI circular as unconstitutional; 2022 Budget introduced 30% tax on crypto gains + 1% TDS; 2024 Financial Intelligence Unit (FIU) brought exchanges under PMLA; and Ongoing discussions about comprehensive crypto legislation.

Current legal status: Crypto is legal to hold and trade in India; Not recognized as legal tender or currency; Treated as Virtual Digital Asset (VDA) for tax purposes; Exchanges must register with FIU and comply with PMLA; and Banks can service crypto businesses (after 2020 SC ruling).

Tax framework (harsh by global standards): 30% flat tax on crypto gains (no distinction between short/long term); No deduction of expenses except acquisition cost; No set-off against other income or carry-forward of losses; 1% TDS on all crypto transactions above ₹10,000; and Gift of crypto taxable in recipient''s hands.

FIU-IND compliance requirements: Registration as Reporting Entity mandatory for exchanges; KYC equivalent to banking KYC standards; Suspicious Transaction Reports (STR) filing; Customer Due Diligence and enhanced diligence for high-risk; and Record keeping for 5 years post-relationship.

Major exchanges in India: WazirX (largest by volume, now under scrutiny); CoinDCX (Singapore-headquartered, VC-backed); CoinSwitch (consumer-focused, paused new signups); and Zebpay, Bitbns (surviving smaller players). Several international exchanges (Binance) blocked by FIU for non-compliance.

Regulatory outlook: Comprehensive crypto bill expected but timing uncertain; RBI continues advocating for ban on private crypto; Digital Rupee (CBDC) pilot ongoing since 2022; and International coordination through FATF and G20 discussions.',
    '["Map current crypto regulations covering tax, FIU compliance, and banking access", "Analyze regulatory risks and develop contingency plans for different regulatory scenarios", "Research FIU-IND registration requirements for crypto businesses", "Study international crypto regulations for comparison and potential regulatory arbitrage"]'::jsonb,
    '[{"title": "FIU-IND VDA Service Provider Notice", "url": "https://fiuindia.gov.in/", "type": "regulation"}, {"title": "Income Tax Act VDA Provisions", "url": "https://incometaxindia.gov.in/", "type": "law"}, {"title": "Supreme Court Crypto Judgment 2020", "url": "https://main.sci.gov.in/", "type": "judgment"}, {"title": "RBI CBDC Concept Note", "url": "https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218", "type": "report"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 9.2: Blockchain Applications in Finance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 26, 'Blockchain Applications in Finance',
    'Beyond cryptocurrency speculation, blockchain technology offers compelling applications in Indian financial services. Enterprise blockchain and DLT (Distributed Ledger Technology) solutions are gaining adoption for trade finance, identity verification, and cross-border settlements. Understanding these applications helps identify sustainable blockchain business opportunities.

Trade finance and supply chain finance: Letter of Credit digitization reducing processing from days to hours; Invoice financing with immutable audit trails; Supply chain transparency for export/import; RBI piloting blockchain for trade finance documentation; and IBBIC (Indian Banks Blockchain Infrastructure Company) consortium.

Cross-border payments: Faster, cheaper remittances using blockchain rails; RBI exploring blockchain for interbank settlement; SWIFT exploring DLT integration; Singapore-India linkages potentially leveraging blockchain; and CBDC interoperability discussions.

KYC and identity management: Blockchain-based KYC sharing between financial institutions; CKYC integration with distributed verification; Document attestation and verification; and Privacy-preserving identity (zero-knowledge proofs).

Securities and capital markets: Dematerialization and settlement using blockchain; Corporate actions automation (dividends, voting); Fractional ownership of assets (tokenization); and SEBI sandbox experiments with tokenized securities.

Insurance applications: Claims verification and fraud detection; Reinsurance treaty management; Parametric insurance with automatic triggers; and Policy portability and verification.

Technology implementation considerations: Permissioned vs permissionless blockchain selection; Hyperledger Fabric popular for enterprise (IBBIC uses it); Smart contract development and auditing; Integration with existing core banking/insurance systems; and Scalability and performance requirements.

Challenges and limitations: Regulatory uncertainty beyond specific sandboxes; Integration complexity with legacy systems; Skill scarcity for blockchain development; Consortium coordination challenges; and ROI justification vs traditional databases. Most successful implementations start with specific pain points (reconciliation, trust, auditability) rather than technology-first approaches.',
    '["Identify 3-5 blockchain use cases relevant to your target financial services segment", "Evaluate permissioned blockchain platforms (Hyperledger, R3 Corda, private Ethereum)", "Research existing blockchain consortiums and pilots in Indian financial services", "Assess build vs buy vs join consortium decision for blockchain implementation"]'::jsonb,
    '[{"title": "IBBIC - Indian Banks Blockchain Infrastructure", "url": "https://ibbic.co.in/", "type": "consortium"}, {"title": "RBI Distributed Ledger Report", "url": "https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx", "type": "report"}, {"title": "Hyperledger Fabric Documentation", "url": "https://hyperledger-fabric.readthedocs.io/", "type": "documentation"}, {"title": "SEBI Blockchain Sandbox", "url": "https://www.sebi.gov.in/legal/circulars/may-2019/framework-for-regulatory-sandbox_43058.html", "type": "sandbox"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 9.3: Digital Rupee (CBDC)
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m9_id, 27, 'Digital Rupee (CBDC)',
    'The Digital Rupee, India''s Central Bank Digital Currency (CBDC), represents a significant opportunity for FinTech innovation. Launched in pilot in November 2022, it aims to reduce cash handling costs, improve monetary policy transmission, and provide a digital alternative to private cryptocurrencies.

Digital Rupee overview: Issued by RBI as digital form of sovereign currency; Legal tender status (unlike crypto); Two variants: e₹-W (Wholesale) for interbank settlement, e₹-R (Retail) for public use; Technology: Possibly blockchain-based but centralized control; and Objective: Reduce cash printing costs (₹4,000+ crore annually).

Wholesale CBDC (e₹-W): Launched November 2022 for settlement of government securities; Nine banks participating in pilot; Used for interbank transactions; Reduces settlement risk and improves efficiency; and Foundation for future DvP (Delivery vs Payment) systems.

Retail CBDC (e₹-R): Launched December 2022 in select cities; 1.3 million users and 300,000 merchants by 2024; Available through bank apps (SBI, HDFC, ICICI, YES, etc.); Person-to-person and merchant payments enabled; and QR code-based acceptance at merchants.

Technical architecture: Token-based system (like physical cash, anonymous bearer instruments); Wallet-based system for storage and transactions; Offline functionality planned for rural areas; Interoperability with UPI being explored; and Programmable money features possible (conditional transfers).

FinTech opportunities with Digital Rupee: Wallet development and management services; Merchant acceptance infrastructure; Integration with existing payment systems; Cross-border CBDC interoperability; Programmable payment applications; and Data analytics and insights (anonymized).

Challenges and considerations: Privacy concerns with central visibility of transactions; Competition with successful UPI ecosystem; Adoption incentives for users and merchants; Technology scalability for billion+ users; and Offline functionality implementation.

International context: 130+ countries exploring CBDCs; China''s e-CNY most advanced major economy CBDC; Cross-border CBDC projects (mBridge, Dunbar); India participating in G20 CBDC discussions; and Potential for CBDC to replace correspondent banking.',
    '["Study Digital Rupee pilot results and understand user/merchant adoption patterns", "Identify FinTech opportunities around CBDC infrastructure and services", "Analyze competitive dynamics between UPI and Digital Rupee", "Research international CBDC developments for insights applicable to India"]'::jsonb,
    '[{"title": "RBI Digital Rupee Portal", "url": "https://www.rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218", "type": "official"}, {"title": "RBI CBDC Concept Note", "url": "https://rbi.org.in/Scripts/PublicationReportDetails.aspx?UrlPage=&ID=1218", "type": "report"}, {"title": "BIS CBDC Tracker", "url": "https://www.bis.org/about/bisih/topics/cbdc.htm", "type": "research"}, {"title": "Atlantic Council CBDC Tracker", "url": "https://www.atlanticcouncil.org/cbdctracker/", "type": "tracker"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 10: Open Banking
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'Open Banking', 'Leveraging Account Aggregator and open banking frameworks in India.', 10, NOW(), NOW())
    RETURNING id INTO v_m10_id;

    -- Lesson 10.1: Account Aggregator Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m10_id, 28, 'Account Aggregator Framework',
    'India''s Account Aggregator (AA) framework is a revolutionary consent-based data sharing system enabling individuals to share their financial data digitally. Launched in 2021, it''s transforming lending, wealth management, and personal finance through seamless, secure data access with user consent.

Account Aggregator ecosystem: Account Aggregator (AA): Licensed entity facilitating data sharing; Financial Information Provider (FIP): Data source (banks, NBFCs, insurers, AMCs); Financial Information User (FIU): Entity requesting data for services; and Customer: Individual providing consent for data sharing. Currently 8 licensed AAs: OneMoney, Finvu, CAMS FinServ, NSDL e-Gov, Perfios, PhonePe, Yodlee, and CRIF.

Data categories covered under AA: Bank account statements and balances; Deposit accounts (FD, RD); Mutual fund holdings and transactions; Insurance policies; Pension fund accounts; Equity holdings (demat); and Tax information (future expansion).

How AA works: Customer initiates consent on FIU platform; Consent request routed through AA to FIP; Customer authenticates and approves on FIP interface; FIP shares encrypted data with AA; AA routes data to FIU; and FIU processes data for agreed purpose.

Technical standards (ReBIT specifications): FIP, FIU, and AA APIs standardized by ReBIT (Reserve Bank Information Technology); End-to-end encryption with customer keys; Consent artifacts with granular permissions; Data cannot be stored by AA (pure routing); and Audit trails for all data requests.

Business applications enabled by AA: Cash flow-based lending: Instant underwriting using bank statements; GST data for SME credit: Business verification and revenue assessment; Wealth aggregation: Consolidated view across financial institutions; Personal finance management: Spending insights and recommendations; Insurance underwriting: Financial health assessment; and Fraud detection: Cross-referencing across institutions.

Adoption statistics: 60+ million consent-linked accounts; 1+ million monthly data pulls; 100+ FIPs and FIUs live; Significant uptake in MSME lending; and Consumer adoption accelerating.',
    '["Study ReBIT technical specifications for AA, FIP, and FIU integration", "Identify use cases where AA data can enhance your FinTech product", "Evaluate AA integration options: direct FIU certification vs TSP partnership", "Design consent management flow for optimal customer experience"]'::jsonb,
    '[{"title": "Sahamati - AA Ecosystem Portal", "url": "https://sahamati.org.in/", "type": "ecosystem"}, {"title": "ReBIT Technical Specifications", "url": "https://api.rebit.org.in/", "type": "specification"}, {"title": "RBI Account Aggregator Master Direction", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterDirections.aspx?id=10598", "type": "regulation"}, {"title": "AA Sandbox Guide", "url": "https://sahamati.org.in/sandbox/", "type": "sandbox"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 10.2: FIU Integration and Implementation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m10_id, 29, 'FIU Integration and Implementation',
    'Becoming a Financial Information User (FIU) enables FinTechs to access customer financial data through the Account Aggregator framework. The integration involves regulatory certification, technical implementation, and operational compliance. Understanding this process helps accelerate AA-powered product launches.

FIU eligibility and registration: Must be an RBI/SEBI/IRDAI/PFRDA regulated entity; Or partner with a regulated entity as Technology Service Provider (TSP); Apply for FIU certification through Sahamati certification process; Technical readiness assessment required; and Go-live post certification approval.

TSP route for startups: Technology Service Provider operates on behalf of certified FIU; Lower regulatory barrier for FinTech startups; TSP handles AA integration, FIU manages customer relationship; Revenue share model between TSP and FIU; and Examples: Finvu, Setu, Perfios offer TSP services.

Technical integration components: Consent Manager: Build UI for consent request and management; AA Gateway: Route consent and data requests to AAs; Data Processor: Parse and analyze received FI data; Key Management: Handle encryption/decryption of customer data; and Notification Handler: Process status updates from AA ecosystem.

API integration flow: Discovery: Get list of accounts at FIPs for customer; Consent Request: Create consent artifact with purpose, data types, duration; Consent Status: Poll for customer approval; FI Request: Request financial information post-consent; FI Status: Check data fetch status; and Data Decryption: Decrypt received financial data.

Data handling requirements: Data purpose must match consent artifact exactly; Retention only for consented duration; No sharing with unauthorized parties; Audit trail of all data access; Customer right to revoke consent anytime; and Grievance mechanism for data-related complaints.

Implementation best practices: Minimize data requested to reduce consent friction; Clear, transparent consent language; Quick data processing post-receipt; Graceful handling of partial data (some FIPs may fail); Multiple AA connectivity for reliability; and Robust error handling for AA ecosystem failures.',
    '["Evaluate FIU certification vs TSP partnership for your regulatory status", "Design consent artifact specifications for your use case", "Build technical architecture for AA integration components", "Implement data processing pipeline for financial information analysis"]'::jsonb,
    '[{"title": "ReBIT API Specifications", "url": "https://api.rebit.org.in/", "type": "api"}, {"title": "Setu AA Integration Guide", "url": "https://docs.setu.co/data/account-aggregator/", "type": "documentation"}, {"title": "Finvu Developer Documentation", "url": "https://finvu.in/developer", "type": "documentation"}, {"title": "Sahamati Certification Process", "url": "https://sahamati.org.in/certification/", "type": "certification"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 10.3: Open Banking Business Models
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m10_id, 30, 'Open Banking Business Models',
    'Open banking through Account Aggregator creates opportunities for new financial products and services built on customer-consented data. Understanding emerging business models helps identify sustainable opportunities beyond the initial data access innovation.

Data-driven lending models: Cash flow-based underwriting: Analyze bank statements for income stability, expense patterns; Working capital assessment: Real-time cash flow for SME credit lines; Invoice financing: Verify receivables against bank credits; Personal loan optimization: Instant eligibility based on financial health; and MSME lending: Combine GST data with bank statements for holistic assessment. Lenders report 30-50% faster underwriting and 20% lower NPAs with AA data.

Wealth and investment applications: Net worth aggregation: Consolidated view of all financial assets; Robo-advisory inputs: Portfolio rebalancing based on actual holdings; Financial planning: Goal gap analysis with current financial position; Tax optimization: Cross-asset tax-loss harvesting recommendations; and Insurance needs: Protection gap analysis from financial data.

Personal finance management: Spending categorization: AI-based expense classification; Subscription tracking: Identify recurring payments; Bill negotiation: Benchmark and optimize regular expenses; Savings recommendations: Automated sweep to better instruments; and Credit score insights: Explain and improve credit health.

B2B data services: Credit bureau enhancement: Additional data layer for thin-file customers; Fraud detection: Cross-institutional anomaly detection; Compliance verification: Source of funds for AML purposes; and Benchmarking: Industry-level financial health metrics.

Monetization strategies: Per-pull pricing: Charge per AA data fetch (₹2-50 per pull depending on use case); Success fee: Charge on loan disbursement or investment conversion; Subscription: Monthly fee for continuous monitoring services; Freemium: Basic insights free, premium features paid; and B2B API licensing: Data processing and insights as service.

Market evolution and opportunities: GST data integration expanding SME use cases; Insurance and pension data coming online; Cross-border data sharing discussions; Real-time consent for embedded finance; and Sector-specific data schemas (healthcare, education) in discussion. Early movers building data processing capabilities and customer trust will have significant advantages as ecosystem matures.',
    '["Identify 3-5 AA-enabled product opportunities for your target segment", "Design pricing model for AA-powered services", "Build data analytics capabilities for financial information processing", "Develop customer trust strategy for consent-based data services"]'::jsonb,
    '[{"title": "iSPIRT Open Credit Enablement Network", "url": "https://ispirt.in/ocen/", "type": "framework"}, {"title": "DEPA Concept Paper", "url": "https://niti.gov.in/sites/default/files/2020-09/DEPA-Book_0.pdf", "type": "paper"}, {"title": "AA-Powered Lending Case Studies", "url": "https://sahamati.org.in/resources/", "type": "case-study"}, {"title": "Fintech Association AA Working Group", "url": "https://www.dlai.in/", "type": "industry"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    -- ============================================
    -- MODULE 11: FinTech Compliance
    -- ============================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_product_id, 'FinTech Compliance', 'Building robust compliance infrastructure for FinTech operations.', 11, NOW(), NOW())
    RETURNING id INTO v_m11_id;

    -- Lesson 11.1: Compliance Framework Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m11_id, 31, 'Compliance Framework Design',
    'FinTech compliance is complex, spanning multiple regulators (RBI, SEBI, IRDAI, MEITY) and evolving rapidly. Building a robust compliance framework from inception protects against regulatory action, builds customer trust, and enables faster scaling. This requires dedicated resources, technology investment, and cultural commitment.

Compliance function structure: Chief Compliance Officer (CCO) with Board access; Compliance team scaled to business complexity; Clear escalation paths for regulatory issues; Independence from business units; and Regular Board reporting on compliance status.

Key compliance domains for FinTech: Regulatory licensing: Ensuring all activities are properly licensed; KYC/AML: Customer identification and monitoring; Data protection: Privacy compliance under DPDP Act and IT Act; Consumer protection: Fair practices, disclosure, grievance redressal; Cyber security: CERT-In, RBI cyber security requirements; and Financial reporting: Regulatory returns, audit requirements.

Compliance technology (RegTech): KYC automation: Digital verification, e-KYC, video KYC; Transaction monitoring: Rule-based and ML-based suspicious activity detection; Regulatory reporting: Automated return generation and filing; Policy management: Version control, attestation, training tracking; and Audit trail: Comprehensive logging of compliance decisions.

Risk-based compliance approach: Categorize risks by likelihood and impact; Prioritize controls for high-risk areas; Streamline low-risk processes; Regular risk assessment updates; and Document risk acceptance decisions.

Compliance calendar management: Map all regulatory deadlines (returns, renewals, reports); Automated reminders and escalations; Track filing completion and acknowledgments; Maintain compliance certificate repository; and Plan for audit cycles (statutory, regulatory, internal).

Vendor and partner compliance: Due diligence on all vendors handling customer data; Contractual compliance obligations; Regular vendor audits; and Incident notification requirements.',
    '["Map all applicable regulations and create compliance obligation register", "Design compliance organization structure with clear roles and escalations", "Evaluate RegTech solutions for KYC, monitoring, and reporting automation", "Create compliance calendar with all regulatory deadlines and responsibilities"]'::jsonb,
    '[{"title": "RBI Compliance Requirements Master List", "url": "https://www.rbi.org.in/Scripts/BS_ViewMasterCirculardetails.aspx", "type": "regulation"}, {"title": "CERT-In Compliance Guidelines", "url": "https://www.cert-in.org.in/", "type": "guideline"}, {"title": "Signzy RegTech Platform", "url": "https://signzy.com/", "type": "vendor"}, {"title": "Compliance Calendar Template", "url": "https://www.icsi.edu/compliance/", "type": "template"}]'::jsonb,
    90, 100, 1, NOW(), NOW());

    -- Lesson 11.2: Cyber Security Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m11_id, 32, 'Cyber Security Compliance',
    'Cyber security is critical for FinTech, with regulatory requirements from RBI, CERT-In, and sector-specific mandates. Data breaches can result in regulatory action, financial penalties, and reputational damage. Building security-first culture with appropriate controls is essential for sustainable FinTech operations.

RBI cyber security framework: Master Direction on IT Risk Management; Security Operations Centre (SOC) requirements; Incident response and reporting obligations; Board-level cyber security committee; and Annual cyber security audit by CERT-In empaneled auditor.

CERT-In requirements (2022 Direction): Incident reporting within 6 hours of detection; 22 types of incidents requiring reporting; Log retention for 180 days minimum; ICT infrastructure synchronization with NTP servers; and KYC and transaction records for 5 years.

Security controls framework: Network security: Firewalls, IDS/IPS, network segmentation; Application security: Secure SDLC, OWASP compliance, penetration testing; Data security: Encryption at rest and transit, data masking, DLP; Identity management: Multi-factor authentication, privileged access management; and Endpoint security: Anti-malware, mobile device management.

Key compliance activities: Annual VAPT (Vulnerability Assessment and Penetration Testing); Quarterly vulnerability scanning; ISO 27001 certification (recommended); PCI-DSS compliance for card data handling; SOC 2 Type II for B2B FinTech; and Regular security awareness training.

Incident response readiness: Documented incident response plan; Defined roles and responsibilities; Communication protocols (internal, regulatory, customer); Forensic capabilities or vendor relationship; and Regular incident response drills.

Security governance: Information security policy approved by Board; Risk assessment methodology; Asset classification and handling; Third-party security assessment; and Security metrics and KPIs.

Common security gaps in FinTech: Inadequate API security (authentication, rate limiting); Poor secrets management (hardcoded credentials); Insufficient logging and monitoring; Lack of encryption for sensitive data; and Delayed security patching.',
    '["Conduct gap assessment against RBI cyber security framework", "Implement CERT-In compliance including logging and incident reporting capability", "Design security architecture with appropriate controls for each layer", "Establish incident response plan with clear escalations and communication protocols"]'::jsonb,
    '[{"title": "RBI IT Risk Management Framework", "url": "https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=10435", "type": "regulation"}, {"title": "CERT-In Directions 2022", "url": "https://www.cert-in.org.in/Directions70B.jsp", "type": "regulation"}, {"title": "PCI-DSS Standards", "url": "https://www.pcisecuritystandards.org/", "type": "standard"}, {"title": "OWASP Top 10", "url": "https://owasp.org/www-project-top-ten/", "type": "guideline"}]'::jsonb,
    90, 100, 2, NOW(), NOW());

    -- Lesson 11.3: Regulatory Relationship Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (gen_random_uuid()::text, v_m11_id, 33, 'Regulatory Relationship Management',
    'FinTech success requires positive regulatory relationships. Proactive engagement, transparent communication, and industry participation help navigate regulatory changes and build goodwill. Understanding regulatory priorities and demonstrating commitment to compliance creates competitive advantage.

Regulatory engagement principles: Proactive disclosure: Report issues before they escalate; Transparent communication: Honest, complete responses to queries; Timely compliance: Meet all deadlines, seek extensions early if needed; Constructive feedback: Participate in consultation processes; and Industry participation: Engage through associations and forums.

Key regulatory touchpoints: License applications and renewals; Regulatory inspections and audits; Compliance returns and reporting; Consultation papers and feedback; and Regulatory sandbox participation.

Building regulator relationships: Assign dedicated regulatory relationship manager; Regular courtesy meetings (where permitted); Prompt, complete responses to regulatory queries; Proactive updates on material changes; and Participation in industry events with regulators.

Handling regulatory inspections: Prepare documentation in advance; Designate inspection coordinators; Provide comfortable working space for inspectors; Respond to information requests promptly; and Document all interactions and information shared.

Regulatory violations and remediation: Self-identify and report before regulator discovery; Develop comprehensive remediation plan; Implement controls to prevent recurrence; Document remediation completion; and Consider voluntary disgorgement if customer harm occurred.

Industry associations and collective engagement: DLAI (Digital Lenders Association of India); IAMAI (Internet and Mobile Association of India); NASSCOM FinTech Council; FICCI FinTech Committee; and Participation amplifies voice and provides early regulatory intelligence.

Regulatory change management: Monitor regulatory developments (RBI, SEBI, IRDAI); Analyze impact of proposed regulations; Prepare implementation plans; Engage through consultation process; and Train teams on new requirements.

Future regulatory trends to watch: Comprehensive FinTech legislation; Digital Personal Data Protection implementation; Crypto regulatory framework; AI/ML guidelines for financial services; and Cross-border regulatory coordination.',
    '["Develop regulatory engagement strategy with key touchpoints and responsible owners", "Join relevant industry associations and participate in regulatory discussions", "Create regulatory change monitoring and impact assessment process", "Build regulatory inspection readiness checklist and conduct mock inspections"]'::jsonb,
    '[{"title": "DLAI - Digital Lenders Association", "url": "https://www.dlai.in/", "type": "association"}, {"title": "IAMAI FinTech Council", "url": "https://www.iamai.in/", "type": "association"}, {"title": "RBI Consultation Papers", "url": "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx", "type": "regulation"}, {"title": "SEBI Consultation Papers", "url": "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=2&ssid=11", "type": "regulation"}]'::jsonb,
    90, 100, 3, NOW(), NOW());

    RAISE NOTICE 'P20: FinTech Mastery course created/updated successfully with 11 modules and 33 lessons';
END $$;

COMMIT;
