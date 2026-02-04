-- THE INDIAN STARTUP - P4: Finance Stack - CFO-Level Mastery - Enhanced Content (Part 1: Modules 1-6)
-- Migration: 20260204_004_p4_finance_enhanced.sql
-- Purpose: Enhance P4 course content to 500-800 words per lesson with India-specific financial data
-- Note: This file contains Modules 1-6 only. Modules 7-12 will be in a separate migration.

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
    -- Get or create P4 product
    INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        'P4',
        'Finance Stack - CFO-Level Mastery',
        'Build world-class financial infrastructure with complete accounting systems and strategic finance. 45 days, 12 modules covering GST compliance, income tax, TDS, MCA filings, FP&A, investor reporting, treasury management, and audit preparation. India-specific with Tally, Zoho Books, and complete regulatory compliance frameworks.',
        6999,
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
        SELECT id INTO v_product_id FROM "Product" WHERE code = 'P4';
    END IF;

    -- Clean existing modules and lessons
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

    -- ========================================
    -- MODULE 1: Financial Foundation & India Stack (Days 1-4)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Financial Foundation & India Stack',
        'Build the foundation of your startup financial infrastructure with India Stack integration. Master GST registration, Tally/Zoho Books setup, bank account opening, and digital payment systems.',
        0,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_1_id;

    -- Day 1: India Stack for Financial Infrastructure
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        1,
        'India Stack for Financial Infrastructure',
        'India Stack is a revolutionary digital infrastructure that enables startups to build financial systems with unprecedented efficiency. Understanding and leveraging India Stack gives your startup a significant operational advantage in managing finances, compliance, and payments.

India Stack components for finance: 1) Aadhaar-based eKYC enables instant customer verification at Rs 5-10 per verification versus Rs 100+ for physical KYC. This reduces onboarding costs by 90% for B2C finance applications. 2) UPI (Unified Payments Interface) processes 12+ billion transactions monthly worth Rs 18+ lakh crore, with zero MDR for merchants under Rs 2,000 transactions. Your startup can integrate UPI through Razorpay, Cashfree, or direct bank APIs. 3) DigiLocker provides verified document storage with 150+ crore documents issued. Use for employee onboarding and vendor KYC. 4) GST Network (GSTN) is the backbone for all indirect tax compliance with APIs for automated filing. 5) Account Aggregator framework (launched 2021) enables consent-based financial data sharing - revolutionary for lending and credit assessment.

Setting up your digital finance foundation: Start with these registrations in sequence - PAN (already have from incorporation), TAN for TDS (apply through NSDL, Rs 65 fee, 7 days processing), GST registration (if turnover exceeds Rs 40 lakh for goods or Rs 20 lakh for services, or mandatory for inter-state supply), Professional Tax registration (state-specific, required for employees), and EPFO/ESIC registration (mandatory if 20+ employees for EPFO, 10+ for ESIC).

Financial technology stack for Indian startups: Accounting software options by stage - Seed stage (Rs 0-1 Cr revenue): Zoho Books (Rs 750-2,500/month, excellent GST compliance), Tally Prime (Rs 18,000-54,000 perpetual license, most CA-friendly), or QuickBooks Online India (Rs 1,000-3,000/month, good for US investor reporting). Growth stage (Rs 1-10 Cr revenue): Add expense management (Zoho Expense, Fyle, Happay), payroll (Razorpay Payroll, greytHR, Zoho Payroll), and analytics (Zoho Analytics, Metabase). Scale stage (Rs 10+ Cr): Consider ERPs like SAP Business One, Oracle NetSuite, or Microsoft Dynamics.

Banking setup for startups: Open current account with startup-friendly bank - ICICI (dedicated startup banking program), HDFC (SmartUp account with preferential services), Kotak (811 digital banking for founders), or RBL (focused on startups with modern APIs). Consider two bank accounts: one for operations (payments, receipts) and one for reserves/investments. Essential banking features: Internet banking with maker-checker for dual authorization, NEFT/RTGS/IMPS facility, API banking capabilities for software integration, trade finance if importing/exporting, and escrow capabilities for marketplaces.

Pro tip: Negotiate with banks early - startup accounts can get free RTGS/NEFT, reduced forex margins, and fee waivers. ICICI and HDFC have dedicated startup relationship managers who can expedite approvals.',
        '["Apply for TAN if not already obtained - required before making any TDS payments within 30 days of incorporation", "Complete GST registration if applicable - gather premises proof, bank statement, and authorized signatory details", "Evaluate and select accounting software - set up trial accounts with Zoho Books and Tally Prime for comparison", "Open current account if not done - collect required documents and compare startup banking programs from ICICI, HDFC, and Kotak"]'::jsonb,
        '["TAN Application Guide with NSDL portal walkthrough", "GST Registration Checklist with document requirements", "Accounting Software Comparison Matrix (Tally vs Zoho vs QuickBooks)", "Startup Banking Program Comparison with feature matrix"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 2: Chart of Accounts Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        2,
        'Chart of Accounts Design for Indian Startups',
        'A well-designed Chart of Accounts (COA) is the foundation of your entire financial reporting system. In India, your COA must support Ind AS compliance, GST return filing, income tax computation, and investor reporting - all simultaneously. Getting this right from day one saves months of painful restructuring later.

COA structure principles: Follow the standard classification - Assets (what you own), Liabilities (what you owe), Equity (owner''s stake), Revenue (income earned), and Expenses (costs incurred). Within each, create sub-categories that map to Indian regulatory requirements and management reporting needs.

Essential account groups for Indian startups: Assets - Current Assets (Cash and Bank, Accounts Receivable, GST Input Credit, Prepaid Expenses, Inventory), Fixed Assets (Computer Equipment, Furniture, Office Equipment, Intangible Assets like software licenses and patents), and Investments. Liabilities - Current Liabilities (Accounts Payable, GST Output Payable, TDS Payable, Statutory Dues - PF/ESIC/PT, Salary Payable, Advance from Customers), Long-term Liabilities (Term Loans, Deferred Tax Liability). Equity - Share Capital (Authorized and Paid-up), Securities Premium, Retained Earnings, Other Reserves.

Revenue account design: Structure revenue accounts for GST compliance and business analysis. Example for SaaS: Subscription Revenue (GST @18%), Professional Services Revenue (GST @18%), Marketplace Commission (GST @18%), Export Revenue (Zero-rated). Maintain separate accounts for different GST rates if applicable - Software products might be 18% while training services could have different treatment.

Expense categories aligned with tax and GST: Personnel Costs (Salaries - not subject to GST, Professional Fees - 194J TDS @10%, Contractor Payments - 194C TDS @1-2%), Operating Expenses (Rent - 194I TDS @10% for >Rs 2.4L/year, Utilities - no TDS but may have GST, Software Subscriptions - 194J TDS @2%, reverse charge for foreign services), Marketing (Advertising - GST @18%, Events - GST @18%), Travel (Domestic - GST @5-12%, International - no GST).

Account coding structure: Use a logical numbering system - 1000s for Assets, 2000s for Liabilities, 3000s for Equity, 4000s for Revenue, 5000s for Cost of Goods Sold, 6000s for Operating Expenses, 7000s for Other Income, 8000s for Other Expenses. Leave gaps between account numbers (1010, 1020, 1030) to insert new accounts without renumbering.

Tally Prime COA setup: Tally uses a group-based hierarchy. Create groups matching your COA structure, then ledgers within groups. Enable GST classification for each ledger. Set up cost centers for department-wise tracking if needed. Zoho Books COA setup: Uses a flat account structure with parent-child relationships. Import your designed COA via Excel template. Configure tax rates and HSN/SAC codes for each revenue and expense account.

Common COA mistakes to avoid: Too few accounts (can''t get detailed analysis), too many accounts (maintenance nightmare), not mapping to GST (manual return preparation), not separating by TDS applicability (compliance issues), and mixing personal and business accounts (audit red flag).',
        '["Design your complete Chart of Accounts using the provided template - include all account codes, names, groups, and GST/TDS mapping", "Set up COA in your chosen accounting software - configure tax treatments and enable required classifications", "Create account master data for your first 10 vendors and 10 customers - include GST numbers and TDS applicability", "Establish opening balances if transitioning from previous system - ensure debits equal credits"]'::jsonb,
        '["Indian Startup Chart of Accounts Template with 200+ pre-configured accounts", "Tally Prime Setup Guide with GST configuration", "Zoho Books COA Import Template and Tutorial", "Account Code Design Best Practices Document"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 3: Bank Account Setup and Reconciliation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        3,
        'Bank Account Setup and Reconciliation Systems',
        'Bank accounts are the financial arteries of your startup. In India, where cash transactions still represent significant business activity and multiple payment modes coexist, proper bank setup and reconciliation processes are critical for accurate financial reporting and compliance.

Opening your startup current account: Required documents typically include: Certificate of Incorporation, MOA and AOA, Board Resolution for account opening and authorized signatories, PAN card of company, GST registration certificate (if registered), Address proof of registered office, Identity and address proof of all directors, and Photographs of directors and authorized signatories.

Bank selection criteria for startups: Evaluate based on: Branch/ATM network (HDFC and ICICI lead with 5,000+ branches each), Digital banking capabilities (API banking, bulk payments, auto-reconciliation), Forex capabilities (if planning international transactions), Fee structure (compare account maintenance, transaction fees, forex margins), Relationship banking (dedicated RM, faster resolution), and Startup program benefits (ICICI startup banking offers up to Rs 1 Cr limit, HDFC SmartUp has preferential forex rates).

Multiple account strategy: Consider maintaining: Primary operating account (for regular transactions, salary payments, vendor payments), Reserve/investment account (for surplus funds, FD linkage), Escrow account (if operating marketplace or collecting on behalf of others), and Foreign currency account (EEFC account for exporters to hold forex receipts). Benefits: Better fund management, clear audit trail, reduced fraud risk through segregation.

Setting up payment infrastructure: UPI integration through payment gateways (Razorpay setup takes 2-3 days, requires business documents), NEFT/RTGS for vendor payments (set up beneficiaries in bulk), corporate cards for employee expenses (HDFC, Amex, or virtual cards through Happay), and payment collection (link payment gateway to bank account for T+2 settlement).

Bank reconciliation fundamentals: Bank reconciliation matches your accounting records with bank statements to identify discrepancies. In India, reconciliation is complicated by: Multiple payment modes (cash, cheque, NEFT, RTGS, UPI, cards), Variable settlement times (UPI instant, cheques 3 days, international payments 2-5 days), Bank charges and interest often discovered only in statements, GST on bank charges (18% on most fees), and TCS on foreign remittances (5% on amounts exceeding Rs 7 lakh).

Reconciliation process: Daily reconciliation is ideal, weekly is minimum acceptable. Steps: Download bank statement (most banks allow automatic feed to Tally/Zoho), Match transactions using reference numbers, Identify unmatched items (timing differences vs. errors), Investigate and resolve discrepancies, Document reconciliation with sign-off.

Automating reconciliation: Tally Prime has built-in bank reconciliation with auto-matching. Zoho Books connects directly to bank feeds through open banking APIs (supported banks include ICICI, HDFC, Axis, Yes Bank). Third-party tools like Cointab or EnKash can handle complex multi-account reconciliation.

Cash management protocols: Even in digital India, cash handling protocols matter. Petty cash policy (keep under Rs 10,000, require receipts for all expenses), cash receipt documentation (issue computerized receipts, deposit within 24-48 hours), and cash expense limits (per Income Tax Section 40A, cash expenses above Rs 10,000 are disallowed for tax purposes).',
        '["Open current account if not done - schedule bank appointment with all required documents", "Set up internet banking with maker-checker authorization for payments above Rs 25,000", "Configure bank feeds in your accounting software - enable auto-reconciliation features", "Create bank reconciliation process document and schedule - assign responsibility and set weekly deadline"]'::jsonb,
        '["Bank Account Opening Checklist by bank with required documents", "Internet Banking Setup Guide with security best practices", "Bank Reconciliation Template in Excel with instruction", "Multi-Account Cash Management Policy Template"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 4: Financial Policies and Internal Controls
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_1_id,
        4,
        'Financial Policies and Internal Controls',
        'Financial policies and internal controls are not just for large companies - they protect your startup from fraud, ensure accurate reporting, and build investor confidence. Indian startups have lost crores to internal fraud and policy gaps. A basic control framework takes hours to set up but saves lakhs in prevented losses.

Core financial policies every startup needs: Expense Policy - defines what expenses are reimbursable, approval thresholds, and documentation requirements. Typical startup thresholds: Up to Rs 5,000 - manager approval, Rs 5,000-25,000 - finance lead approval, Rs 25,000-1,00,000 - CEO approval, Above Rs 1,00,000 - board approval for non-routine expenses. Document policy should cover: original bills required, GST invoice requirements for ITC claims, travel policy specifics (flight class, hotel ratings, daily allowances by city tier).

Procurement and Vendor Management Policy: Competitive quotes required above Rs 50,000 (minimum 3 quotes), approved vendor list maintenance, vendor KYC (PAN, GST, bank details verification), purchase order process for orders above Rs 25,000, goods receipt note (GRN) process for physical goods, and three-way matching (PO-GRN-Invoice) before payment.

Payment Authorization Matrix: Single authorization: Petty cash, small vendors up to Rs 10,000. Dual authorization (maker-checker): All payments Rs 10,000-5,00,000. Board/CEO + Finance: Payments above Rs 5,00,000. Statutory payments (GST, TDS): Dual authorization with deadline tracking. Salary payments: HR certification + Finance approval + CEO for bulk release. Implement in banking: Most corporate internet banking supports maker-checker. Configure different approval workflows by amount threshold.

Segregation of duties: The person who creates a payment should not be the one approving it. Minimum segregation for small teams - Person A: Creates invoices, enters bills, prepares payments. Person B: Approves payments, signs cheques, reconciles bank. Founder oversight: Review all payments above threshold, spot-check small payments weekly. As team grows: Separate accounting, accounts payable, accounts receivable, and treasury functions.

Asset management controls: Fixed asset register maintenance (required under Companies Act), asset tagging and periodic physical verification, laptop and equipment issuance records, software license tracking, and asset disposal policy with proper accounting treatment.

Revenue and receivables controls: Invoice approval before sending to customer, credit policy (payment terms, credit limits by customer category), dunning process for overdue receivables (Day 1 - invoice sent, Day 7 - payment reminder, Day 30 - follow-up call, Day 45 - formal demand, Day 60 - stop supply, Day 90+ - legal notice), bad debt provisioning policy, and sales return and credit note approval process.

Fraud prevention measures: Background verification for finance team hires, vacation policy (mandatory leave exposes fraud), surprise audits and reconciliation, vendor master changes require dual approval, bank statement review by someone other than payment processor, and whistleblower policy (even informal for small teams).

Documentation and audit trail: Every transaction must have supporting documentation. Maintain digital files organized by: Financial year > Month > Transaction type. Retention requirements: Invoices and vouchers - 8 years, Bank statements - 8 years, Agreements - 8 years from expiry, Tax records - 8 years. Use cloud storage (Google Drive, OneDrive) with proper access controls.',
        '["Draft and implement Expense Policy - define categories, thresholds, approval matrix, and documentation requirements", "Create Procurement Policy - establish quote requirements, vendor approval process, and PO workflow", "Set up payment authorization matrix in your banking system - configure maker-checker workflows", "Document internal control framework - create policy manual and communicate to team"]'::jsonb,
        '["Startup Financial Policy Templates Bundle (Expense, Procurement, Payment, Asset)", "Payment Authorization Matrix Template with role definitions", "Internal Control Checklist for Small Teams", "Document Retention Schedule per Indian regulations"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 2: Accounting Systems & Compliance (Days 5-8)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Accounting Systems & Compliance',
        'Master Indian Accounting Standards (Ind AS), statutory audit requirements, and month-end close processes. Build accounting systems that satisfy regulators, investors, and management reporting needs.',
        1,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_2_id;

    -- Day 5: Indian Accounting Standards Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        5,
        'Indian Accounting Standards Overview',
        'Indian accounting standards determine how you record transactions and present financial statements. For startups, the applicable framework depends on your company size. Understanding this early prevents costly restatements when you reach audit thresholds or raise institutional funding.

Accounting framework applicability: Accounting Standards (AS) apply to all companies by default - these are older standards based on Indian GAAP, simpler and less prescriptive. Ind AS (Indian Accounting Standards) are converged with IFRS and mandatory for: Companies with net worth Rs 250 crore+ or turnover Rs 500 crore+, Listed companies, and NBFCs with net worth Rs 250 crore+. Voluntary Ind AS adoption is allowed and recommended if you expect foreign investment or eventual public listing.

Key AS applicable to startups: AS 1 (Disclosure of Accounting Policies): Document your policies for revenue recognition, depreciation, foreign currency, etc. AS 2 (Valuation of Inventories): Cost or NRV, whichever lower; FIFO or weighted average. AS 4 (Contingencies and Events): Disclose contingent liabilities, provisions. AS 6 (Depreciation Accounting): Use prescribed rates under Companies Act Schedule II. AS 9 (Revenue Recognition): When significant risks/rewards transfer. AS 10 (Property, Plant and Equipment): Capitalization policy, component accounting. AS 13 (Investments): Classification, valuation at cost or fair value. AS 15 (Employee Benefits): Gratuity, leave encashment provisions. AS 16 (Borrowing Costs): Capitalize borrowing costs for qualifying assets. AS 17 (Segment Reporting): If turnover > Rs 500 Cr or total assets > Rs 50 Cr. AS 22 (Taxes on Income): Deferred tax asset/liability calculation.

Revenue recognition principles: Under AS 9, recognize revenue when: Significant risks and rewards transferred, No continuing managerial involvement, Revenue measurable reliably, and Economic benefits probable. For SaaS/subscription: Recognize ratably over subscription period, not upfront. For services: Percentage of completion or completed contract method. For products: On delivery/acceptance per contract terms.

Depreciation under Companies Act Schedule II: Computer equipment: 63.16% WDV or 31.67% SLM (effective life 3 years). Furniture: 18.10% WDV or 9.5% SLM (effective life 10 years). Vehicles: 31.23% WDV or 15.83% SLM (effective life 8 years). Office equipment: 18.10% WDV or 9.5% SLM. Software (intangible): Amortize over estimated useful life, typically 3-5 years. Startups typically use WDV (Written Down Value) method for tax alignment.

Provisions and contingencies: Provision for gratuity: Required if 10+ employees (actuarial valuation needed). Leave encashment: Provision for accumulated leave. Bad debts: Age-wise provisioning (0-90 days: 0%, 90-180: 25%, 180-365: 50%, 365+: 100% typical). Warranty: If applicable, based on historical claims. Contingent liabilities: Disclose litigation, disputed taxes without recognizing in accounts.

Common accounting mistakes by startups: Recognizing full contract value upfront for multi-year deals, not provisioning for gratuity/leave, capitalizing expenses that should be expensed, inconsistent treatment of similar transactions, not documenting accounting policy choices, and mixing personal and business expenses. These errors create problems during audits and due diligence.',
        '["Document your accounting policy choices for key areas - revenue, depreciation, inventory, provisions", "Calculate and record depreciation correctly using Schedule II rates for all fixed assets", "Assess provision requirements - gratuity applicability, leave policy, bad debt aging", "Create accounting policy document and get sign-off from your auditor or advisor"]'::jsonb,
        '["Indian Accounting Standards Summary for Startups (AS 1-22)", "Depreciation Rate Calculator per Schedule II", "Revenue Recognition Decision Tree by Business Model", "Accounting Policy Template with common startup choices"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 6: Bookkeeping Excellence
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        6,
        'Bookkeeping Excellence for Indian Startups',
        'Bookkeeping is the systematic recording of financial transactions. In India, where compliance requirements are stringent and auditors scrutinize details, excellent bookkeeping is non-negotiable. The goal is to maintain books that are accurate, complete, timely, and audit-ready at all times.

Daily bookkeeping routines: Every day, you should: Record all bank transactions from the previous day (receipts and payments), Enter all invoices raised to customers, Record all bills received from vendors, Update petty cash register if applicable, and Review and approve pending entries in accounting software. Best practice: Set 30 minutes each morning for bookkeeping catch-up. End-of-day bank balance should match books.

Transaction recording principles: Every entry needs: Date of transaction, Description/narration explaining the transaction, Supporting document reference, Party details (for GST and TDS compliance), and GST treatment (input eligible, reverse charge, exempt, etc.). Voucher types in Indian accounting: Receipt voucher (money in), Payment voucher (money out), Journal voucher (non-cash adjustments), Sales voucher (revenue), Purchase voucher (expenses/inventory), Contra voucher (bank to cash transfers).

Sales and revenue recording: For every sale, capture: Invoice number (sequential, as per GST requirements), Customer GSTIN (for B2B), Place of supply (determines CGST+SGST vs IGST), HSN/SAC code (4-8 digit code for goods/services), GST rate applied (5%/12%/18%/28%), and Payment terms and due date. Invoice requirements: All fields per Rule 46 of CGST Rules, digital signature or physical signature, QR code mandatory for B2C invoices above Rs 50,000, and E-invoice mandatory if turnover exceeds Rs 5 crore (from August 2023).

Purchase and expense recording: For every expense, capture: Vendor invoice details (number, date, GSTIN), Expense category mapping to COA, TDS applicability and rate, GST input credit eligibility, and Payment due date. Before recording, verify: Invoice is GST compliant (all mandatory fields present), Vendor GSTIN is active (check on GST portal), Invoice date is within financial year, and Goods/services actually received.

ITC (Input Tax Credit) tracking: Maintain detailed ITC register tracking: GSTIN of supplier, Invoice number and date, Taxable value, CGST/SGST/IGST amounts, and Eligibility status. Reconcile monthly against GSTR-2A/2B auto-populated data. Common ITC issues: Supplier didn''t file return (credit not available), Invoice details mismatch (GSTIN, invoice number), Invoice older than 1 year (time-barred), and Blocked credits (food, beverages, personal vehicles, etc.).

Expense documentation requirements: For tax deductibility, maintain: For bills above Rs 200: Bill or invoice. For travel: Tickets, hotel bills, boarding passes. For entertainment: Bills, attendee list, business purpose. For gifts: Bills, recipient details if above Rs 5,000. For employee reimbursements: Original bills, expense report, approval. Pro tip: Digitize all documents immediately using apps like CamScanner or Adobe Scan, organize in cloud folders by month.',
        '["Establish daily bookkeeping routine - document process and assign responsibility with 30-minute daily time block", "Set up expense documentation system - physical and digital filing with proper organization", "Create ITC tracking register - reconcile current month against GSTR-2B", "Audit your recent entries - verify documentation exists for last 20 transactions"]'::jsonb,
        '["Daily Bookkeeping Checklist with task list and timings", "Indian Invoice Compliance Checklist (GST Rule 46)", "ITC Tracking Register Template in Excel", "Expense Documentation Guide with retention requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 7: Month-End Close Process
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        7,
        'Month-End Close Process',
        'The month-end close process transforms raw transaction data into meaningful financial statements. For Indian startups, the close process must also ensure compliance with GST return timelines (GSTR-1 by 11th, GSTR-3B by 20th). A disciplined close enables faster decisions and builds investor confidence.

Month-end close timeline (recommended): Day 1-2 (1st-2nd of month): Complete all transaction recording for previous month, ensure all invoices and bills entered, complete bank reconciliation for all accounts. Day 3-4 (3rd-4th): Review and correct any coding errors, verify vendor/customer account balances, complete petty cash reconciliation. Day 5-6 (5th-6th): Calculate and record accruals (salary, rent, utilities), record depreciation, record prepaid expense amortization, calculate and record provisions. Day 7-8 (7th-8th): Inter-company reconciliation (if applicable), management review of P&L and Balance Sheet, generate variance analysis vs budget, prepare monthly reporting pack. Day 9-10 (9th-10th): GSTR-1 preparation and filing (due 11th), tax computation review, and final sign-off on month-end.

Essential close activities: Bank reconciliation: All bank accounts reconciled with zero unexplained differences. Ensure all receipts matched to invoices, all payments matched to bills. Accounts receivable review: Age all outstanding invoices, identify overdue amounts, initiate collection follow-up, assess bad debt provisions, reconcile subsidiary ledger to GL. Accounts payable review: Ensure all received goods/services have corresponding bills recorded, verify payment due dates, identify early payment discount opportunities, reconcile subsidiary ledger to GL.

Accruals and adjustments: Accrual accounting requires recording expenses when incurred, not when paid. Common accruals: Salary accrual (if paid after month-end), Rent accrual (if paid in arrears), Utility accrual (estimate based on prior months), Professional fee accrual (for ongoing services like CA fees), Interest accrual (on loans). Journal entry format: Debit expense account, Credit accrued expense liability. Reverse in subsequent month when actual payment recorded.

Depreciation recording: Calculate monthly depreciation for all fixed assets using rates from Companies Act Schedule II. Journal entry: Debit Depreciation Expense, Credit Accumulated Depreciation. Maintain fixed asset register with: Asset description, date of acquisition, original cost, depreciation method and rate, monthly depreciation amount, and accumulated depreciation and net book value.

Provision calculations: Gratuity provision: If 10+ employees, require actuarial valuation annually but book monthly estimate. Formula: (Last drawn salary x 15/26 x completed years) as rough estimate. Leave encashment: Based on leave policy and employee leave balances. Bad debt provision: Age-based calculation as per policy. Warranty provision: Historical claim rate x warranty period sales.

Financial statement preparation: After all adjustments, generate: Trial Balance (verify debits = credits), Profit & Loss Statement (revenue - expenses = profit/loss), Balance Sheet (assets = liabilities + equity), and Cash Flow Statement (operations + investing + financing activities). Review for reasonableness: Compare to prior month and prior year same month, investigate variances above 10%, ensure all ratios make sense.',
        '["Create month-end close checklist customized for your startup with specific tasks, owners, and deadlines", "Document accrual calculation methods for recurring items - salary, rent, utilities, professional fees", "Set up fixed asset register and depreciation schedule in your accounting software or Excel", "Perform complete month-end close for most recent month following the process"]'::jsonb,
        '["Month-End Close Checklist Template (15-day timeline)", "Accrual Journal Entry Templates with examples", "Fixed Asset Register and Depreciation Calculator", "Month-End Reporting Pack Template (P&L, BS, Cash Flow)"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 8: Statutory Audit Requirements
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_2_id,
        8,
        'Statutory Audit Requirements',
        'Every company incorporated under the Companies Act 2013 requires an annual statutory audit by a Chartered Accountant. For startups, the audit is not just compliance - it''s a credibility signal for investors, lenders, and large customers. Understanding audit requirements helps you prepare efficiently and avoid adverse observations.

Audit applicability: All companies (public and private) must get accounts audited annually under Section 139 of Companies Act, 2013. First audit must be conducted within 30 days of incorporation. Auditor appointment: Must be a practicing Chartered Accountant or CA firm. Board appoints first auditor, shareholders ratify at first AGM. Tenure: Individual CA can serve max 5 consecutive years, CA firm can serve max 10 consecutive years (2 terms of 5 years with cooling off). Auditor cannot be: Employee, director, or partner of the company, or someone holding significant financial interest.

Auditor selection criteria: Experience with startups (understands deferred revenue, ESOPs, investor reporting), fee reasonableness (Rs 20,000-75,000 typical for early-stage startup annual audit), responsiveness (will complete audit within timeline, available for investor queries), and network value (can provide references to VCs, help with due diligence). Red flags: Very low fees (indicates superficial audit), unavailability during key periods, no experience with your industry.

Audit timeline under Companies Act: Financial year ends: March 31. Board meeting to approve accounts: Within 60 days of AGM date. AGM (Annual General Meeting): Within 6 months of year end, i.e., by September 30. Auditor report and financials signed: Before AGM. ROC filing (AOC-4): Within 30 days of AGM. Practical timeline: April - books finalization, May - audit fieldwork, June - audit completion and report, July/August - board meeting and AGM, September - ROC filings.

Audit process overview: Planning phase: Auditor understands business, identifies risk areas, plans audit procedures. Fieldwork phase: Auditor tests transactions, reviews documents, verifies balances. Review phase: Senior auditor reviews work, identifies issues for resolution. Completion phase: Management representations obtained, audit report issued.

What auditors examine: Revenue testing - sample invoices, delivery proof, bank receipts. Expense testing - sample bills, approvals, payments. Bank confirmations - direct confirmation from banks of balances. Receivable/payable confirmations - confirmation from key parties. Fixed asset verification - physical verification, ownership documents. Provisions - basis of calculation, adequacy assessment. Related party transactions - board approvals, arm''s length pricing. Statutory compliance - GST, TDS, PF/ESIC, MCA filings.

Audit report types: Unqualified (clean): No material issues found - the goal. Qualified: Material issues found but limited in scope or effect - concerning but not fatal. Adverse: Material and pervasive issues - serious, affects investor confidence. Disclaimer: Unable to form opinion due to scope limitation - rare for startups.

Preparing for smooth audit: Throughout the year, maintain organized records (digital folders by month and transaction type), complete reconciliations monthly, document unusual transactions, ensure board minutes are updated, and keep statutory registers current. Pre-audit preparation: Prepare trial balance with comparatives, prepare schedule of all GL accounts, organize supporting documents, prepare related party transaction list, draft financial statements, and prepare notes to accounts.',
        '["Appoint statutory auditor if not done - get board resolution, issue appointment letter, and file ADT-1", "Create audit preparation checklist based on prior year or auditor requirements", "Organize current year records - ensure all months have complete documentation", "Schedule pre-audit meeting with auditor to understand expectations and timeline"]'::jsonb,
        '["Auditor Selection Criteria and Interview Questions", "Audit Timeline Planner with key dates", "Audit Preparation Checklist (100+ items)", "Sample Audit Representation Letter"]'::jsonb,
        90,
        50,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 3: GST Compliance Deep Dive (Days 9-12)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'GST Compliance Deep Dive',
        'Master GST compliance including registration, return filing (GSTR-1, GSTR-3B), input tax credit optimization, e-invoicing, and e-way bills. Navigate the complexities of India''s indirect tax system.',
        2,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_3_id;

    -- Day 9: GST Registration and Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        9,
        'GST Registration and Framework',
        'Goods and Services Tax (GST) is India''s unified indirect tax system implemented from July 1, 2017. For startups, GST compliance is mandatory once you cross thresholds, and voluntary registration often makes sense earlier for credibility and ITC benefits. Understanding the GST framework thoroughly is essential for financial planning.

GST registration thresholds: Mandatory registration if: Aggregate turnover exceeds Rs 40 lakh (Rs 20 lakh for special category states) for goods suppliers, or Rs 20 lakh (Rs 10 lakh for special category states) for service providers. Mandatory regardless of turnover for: Inter-state supply, E-commerce operators and sellers, TDS/TCS deductors, Casual taxable persons, and Persons required to pay reverse charge. Special category states: Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, Tripura, Himachal Pradesh, Uttarakhand.

Benefits of voluntary registration: Input Tax Credit on purchases even before turnover threshold, enhanced business credibility with B2B customers who need GST invoices, ability to sell on e-commerce platforms (most require GSTIN), inter-state sales capability, and government tender eligibility (most require GSTIN).

GST rate structure: 0% (Exempt): Essential food items, education, healthcare. 5%: Economy goods/services, restaurants (non-AC, non-alcohol), transport. 12%: Standard goods, processed foods, business class air travel. 18%: Most services, electronics, financial services. 28%: Luxury goods, automobiles, tobacco, aerated beverages. For startups: Most B2B services attract 18% GST, SaaS/software services are 18%, professional services are 18%, advertising services are 18%.

GST registration process: Step 1: Visit gst.gov.in and navigate to Services > Registration > New Registration. Step 2: Fill Part A with PAN, mobile, email for OTP verification. Step 3: Receive TRN (Temporary Reference Number) via email/SMS. Step 4: Fill Part B within 15 days with: Business details, promoter/partner details, authorized signatory details, principal place of business, additional places of business (if any), goods and services details (HSN/SAC codes), bank account details, and upload documents. Step 5: Verification and GSTIN issuance within 7 working days (typically 3-5 days).

Documents required: PAN of company, Certificate of Incorporation, MOA/AOA, Address proof of principal place of business (rent agreement + NOC from landlord + utility bill, or ownership documents), Bank account statement or passbook (first and last page), Photograph of authorized signatory, Letter of authorization or board resolution, and Digital Signature Certificate of authorized signatory.

GST compliance calendar: Monthly filers (turnover > Rs 5 Cr): GSTR-1 by 11th of following month, GSTR-3B by 20th of following month. Quarterly filers (QRMP scheme, turnover < Rs 5 Cr): GSTR-1 by 13th of month following quarter, GSTR-3B by 22nd/24th of month following quarter, IFF (Invoice Furnishing Facility) for monthly B2B invoices. Annual: GSTR-9 (annual return) by December 31, GSTR-9C (reconciliation statement) if turnover > Rs 5 Cr by December 31.

Place of Supply rules: Determining the place of supply is critical for charging CGST+SGST vs IGST. For goods: Generally, location where goods are delivered. For services: Location of recipient (B2B) or supplier (B2C). Inter-state supply (different states): IGST. Intra-state supply (same state): CGST + SGST (50% each). Example: If your company is in Karnataka and customer is in Maharashtra, charge IGST @18%. If both in Karnataka, charge CGST @9% + SGST @9%.',
        '["Complete GST registration if applicable - gather all required documents and file on gst.gov.in", "Identify HSN/SAC codes for your products/services - maintain master list for invoice compliance", "Determine appropriate filing frequency - monthly vs quarterly (QRMP) based on turnover", "Set up GST compliance calendar with all due dates and responsible persons"]'::jsonb,
        '["GST Registration Step-by-Step Guide with screenshots", "HSN/SAC Code Finder Tool and Master List", "GST Compliance Calendar Template (monthly reminders)", "Place of Supply Determination Flowchart"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 10: GSTR-1 and GSTR-3B Filing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        10,
        'GSTR-1 and GSTR-3B Return Filing',
        'GSTR-1 and GSTR-3B are the primary GST returns every registered business must file. GSTR-1 contains details of outward supplies (sales), while GSTR-3B is the summary return for tax payment. Accurate and timely filing is critical to avoid penalties and maintain ITC claims.

GSTR-1: Outward Supply Details: GSTR-1 captures all sales/supplies made during the period. It contains: B2B invoices (to registered persons) - invoice-wise details, B2C large invoices (>Rs 2.5 lakh to unregistered) - invoice-wise details, B2C small invoices (aggregate by rate), Export invoices, Credit/Debit notes issued, Nil rated and exempt supplies, and Advances received. Filing due date: 11th of following month (monthly filers) or 13th of month following quarter (quarterly filers).

GSTR-1 filing process: Step 1: Login to GST portal, go to Returns Dashboard. Step 2: Select period and click Prepare Online or Upload (JSON/Excel). Step 3: Enter B2B invoices with: Customer GSTIN (validate), Invoice number and date, Invoice value, Taxable value, and CGST/SGST/IGST amounts. Step 4: Enter B2C invoices, exports, credit notes. Step 5: Preview, verify totals, submit, and file with DSC or EVC.

Common GSTR-1 errors to avoid: Wrong GSTIN of customer (recipient won''t get ITC), Invoice number duplicates, Mismatch between invoice date and return period, Place of supply errors (IGST vs CGST+SGST), HSN code missing or incorrect (mandatory for turnover >Rs 5 Cr), and Late filing (Rs 50/day penalty for GSTR-1, Rs 20/day for nil returns).

GSTR-3B: Summary Return and Payment: GSTR-3B is a self-declared summary return for tax payment. It contains: Outward supplies (taxable, exempt, nil-rated), Inward supplies liable to reverse charge, ITC availed, and Tax payable and paid. Filing due date: 20th of following month (monthly filers) or 22nd/24th of month following quarter (quarterly filers). 22nd for Category X states, 24th for Category Y states.

GSTR-3B filing process: Step 1: Login, navigate to Returns Dashboard, select GSTR-3B. Step 2: Fill Table 3.1 - Outward supplies (auto-populated from GSTR-1, verify and adjust if needed). Step 3: Fill Table 4 - ITC claimed (verify against GSTR-2A/2B auto-populated data). Step 4: Fill Table 3.2 - Reverse charge supplies (imports, specified services). Step 5: Fill Table 5 - Interest, late fees if applicable. Step 6: Preview liability, make payment via electronic cash/credit ledger. Step 7: File with DSC or EVC.

ITC matching and GSTR-2A/2B: GSTR-2A is dynamic auto-populated statement of ITC based on supplier''s GSTR-1 filings. GSTR-2B is static monthly statement (generated on 14th). Rule: You can claim ITC only up to 105% of GSTR-2A/2B credits (earlier 110%, tightened to 105% from January 2022). Best practice: Download GSTR-2B on 14th, reconcile with your purchase register, follow up with suppliers for missing invoices before filing GSTR-3B.

Late filing consequences: GSTR-1 late: Rs 50/day (Rs 20 for nil return), max Rs 5,000 per return. GSTR-3B late: Rs 50/day (Rs 20 for nil return), max Rs 5,000 per return, plus interest @18% p.a. on unpaid tax. Continuous non-filing: GSTIN suspension/cancellation. E-way bill block: If GSTR-3B not filed for 2 consecutive periods.',
        '["Reconcile sales register with GSTR-1 data - ensure all invoices captured correctly", "Download and reconcile GSTR-2B with purchase register - identify ITC mismatches", "File GSTR-1 for current period following the complete process", "File GSTR-3B with correct ITC claim - verify payment calculation before submission"]'::jsonb,
        '["GSTR-1 Filing Tutorial with common error resolution", "GSTR-3B Filing Checklist with reconciliation steps", "GSTR-2A/2B Reconciliation Template in Excel", "GST Late Fee Calculator and Interest Calculator"]'::jsonb,
        120,
        75,
        1,
        NOW(),
        NOW()
    );

    -- Day 11: Input Tax Credit Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        11,
        'Input Tax Credit Optimization',
        'Input Tax Credit (ITC) allows you to reduce your GST liability by the GST paid on purchases. Effective ITC management can significantly improve cash flow. However, ITC rules are complex, and errors lead to blocked credits, penalties, and interest. Mastering ITC is essential for financial efficiency.

ITC eligibility conditions: To claim ITC, all conditions must be met: You must possess a valid tax invoice or debit note, Goods/services must be received, Tax must be actually paid to government by supplier (reflected in GSTR-2A/2B), You must have filed your GSTR-3B, and ITC claimed must be within time limit (earlier of September 30 following the FY or date of filing annual return).

Blocked credits (Section 17(5)): Certain inputs are specifically blocked from ITC: Motor vehicles (except for specified businesses like taxi, driving school, transportation), Food and beverages, outdoor catering (except for specified businesses), Membership of club, health, fitness center, Life/health insurance (except when obligatory for employees under law), Travel benefits for employees (LTC, vacation), Works contract for construction of immovable property (except plant and machinery), Goods/services for personal consumption, and Goods lost, stolen, destroyed, or written off.

Proportionate ITC for mixed supplies: If you make both taxable and exempt supplies, ITC must be reversed proportionally. Formula: ITC to be reversed = (Exempt turnover / Total turnover) x Common ITC. Example: If 20% of your revenue is exempt, reverse 20% of ITC on common inputs like rent, utilities, admin expenses.

ITC reconciliation best practices: Monthly reconciliation process: Day 14 - Download GSTR-2B from portal, Day 15-16 - Match with purchase register (invoice number, GSTIN, amount), Day 17-18 - Identify mismatches (missing in 2B, excess in 2B, value differences), Day 19 - Follow up with suppliers for corrections, and Day 20 - Claim verified ITC in GSTR-3B.

Common ITC issues and resolution: Missing invoices in GSTR-2B: Supplier hasn''t filed GSTR-1 - follow up, get filing confirmation before claiming. Invoice value mismatch: Could be supplier error or your error - verify original invoice, coordinate correction. GSTIN mismatch: If supplier entered wrong GSTIN, ITC not available - get credit note and fresh invoice. Duplicate invoices: System flags duplicates - verify and remove from claim. Time-barred ITC: Cannot claim if more than 1 year old - write off as cost.

ITC reversal situations: On non-payment to supplier within 180 days (Rule 37), On inputs used for exempt supplies, On capital goods sold before useful life, On inputs destroyed or lost, and On inputs used for non-business purposes. Reversal must be done along with interest @18% from the date of original credit.

ITC utilization order: IGST credit: First against IGST liability, then CGST, then SGST. CGST credit: First against CGST, then IGST (not SGST). SGST credit: First against SGST, then IGST (not CGST). Optimize by ensuring IGST credits are utilized first to improve cash position.

Cash vs credit ledger management: Electronic Cash Ledger: Actual cash deposited with government - use for interest, penalty, late fees. Electronic Credit Ledger: Accumulated ITC - use for tax liability offset. Maintain positive balance in cash ledger for statutory payments.',
        '["Set up systematic ITC reconciliation process - create monthly schedule and ownership", "Identify currently blocked credits in your books - assess if any claims need reversal", "Reconcile current period GSTR-2B with purchase register - resolve all mismatches", "Calculate and verify proportionate reversal if making exempt supplies"]'::jsonb,
        '["ITC Eligibility Checker Tool with blocked credit reference", "GSTR-2B Reconciliation Template with mismatch tracker", "ITC Reversal Calculator for Rule 37 and proportionate reversal", "Vendor GST Compliance Tracker for following up on filings"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 12: E-Invoicing and E-Way Bill
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_3_id,
        12,
        'E-Invoicing and E-Way Bill Compliance',
        'E-invoicing and e-way bills are mandatory digital compliance mechanisms under GST. E-invoicing applies to B2B transactions above turnover thresholds, while e-way bills apply to movement of goods above Rs 50,000. Both require real-time integration with government systems.

E-invoicing applicability: E-invoicing is mandatory for: Turnover > Rs 5 crore (from August 1, 2023). Previous thresholds: Rs 500 Cr (Oct 2020), Rs 100 Cr (Jan 2021), Rs 50 Cr (Apr 2021), Rs 20 Cr (Apr 2022), Rs 10 Cr (Oct 2022), Rs 5 Cr (Aug 2023). Exempted entities: SEZ units, insurers, banks, NBFCs, GTA, passenger transport, cinema tickets. Applies to: B2B invoices, B2G invoices, exports. Does not apply to: B2C invoices (QR code required instead for turnover > Rs 500 Cr).

E-invoice process flow: Step 1: Generate invoice in your accounting/billing system with all mandatory fields. Step 2: Create JSON file with invoice data in prescribed schema. Step 3: Upload JSON to Invoice Registration Portal (IRP) - 6 IRPs available including NIC, Clear, Cygnet, E&Y, IRIS, Vayana. Step 4: IRP validates data, generates IRN (Invoice Reference Number) and QR code. Step 5: IRP returns signed JSON with IRN and QR code. Step 6: Print invoice with IRN, QR code, and digital signature. Step 7: Share invoice with customer. Validation time: Real-time, within seconds.

E-invoice mandatory fields: Supplier and recipient GSTIN, Invoice number and date, Document type (invoice, credit note, debit note), HSN code (4-digit for turnover Rs 5-500 Cr, 6-digit above Rs 500 Cr), Item details with taxable value and tax amounts, Place of supply, and Reverse charge applicability.

E-invoice integration options: API integration: Direct system-to-IRP integration (recommended for volume >100 invoices/day). GSP (GST Suvidha Provider) integration: Through intermediaries like Clear, Tally, Zoho. Manual upload: Bulk upload via IRP portal (for low volumes). ERP integration: SAP, Oracle, Microsoft Dynamics have built-in e-invoicing. Costs: API integration Rs 5,000-50,000 setup, Rs 1-3 per invoice. GSP integration often included in accounting software subscription.

E-Way Bill requirements: E-way bill is required for movement of goods worth > Rs 50,000 (value includes GST). Required for: Inter-state movement (all goods), Intra-state movement (state-specific thresholds). Generator: Supplier (for regular sales), Recipient (for purchase from unregistered person), or Transporter.

E-way bill contents: Part A: GSTIN of supplier and recipient, Place of dispatch and delivery, Document details, HSN code, Value and tax amounts. Part B: Vehicle number, transporter details. Validity: Based on distance - Up to 200 km: 1 day, Every additional 200 km: 1 additional day. Distance calculated via NIC portal mapping.

E-way bill process: Option 1: Generate on ewaybillgst.gov.in by logging in, entering Part A details, generating EWB number, then updating Part B (vehicle details). Option 2: Through ERP/accounting software with API integration. Option 3: Via SMS for simple transactions (limited fields). Can be generated up to 15 days in advance.

Consequences of non-compliance: E-invoice not generated: Invoice not valid, ITC blocked for recipient, penalty under Section 122 (Rs 10,000 or tax evaded). E-way bill not generated: Goods can be detained, penalty up to Rs 10,000 or tax amount (whichever higher), goods released only after penalty payment.',
        '["Assess e-invoicing applicability based on turnover - if applicable, choose IRP and integration method", "Integrate e-invoicing with your accounting software - test with sample invoices before go-live", "Set up e-way bill generation process - create SOP for logistics team", "Create compliance checklist for invoice and e-way bill validity requirements"]'::jsonb,
        '["E-Invoice Implementation Guide with IRP comparison", "E-Invoice JSON Schema Reference Document", "E-Way Bill Generation SOP Template", "E-Invoice and E-Way Bill Compliance Checklist"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 4: Income Tax & TDS (Days 13-16)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Income Tax & TDS',
        'Master corporate income tax compliance and TDS (Tax Deducted at Source) management. Learn tax rates, advance tax payments, TDS sections and rates, return filing, and tax planning strategies.',
        3,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_4_id;

    -- Day 13: Corporate Income Tax Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        13,
        'Corporate Income Tax Framework',
        'Corporate income tax is levied on the profits of companies incorporated in India. Understanding the tax structure, rates, and planning opportunities is essential for optimizing your startup''s tax position. Recent reforms have made Indian corporate tax rates among the most competitive globally.

Corporate tax rates (FY 2024-25): Standard rate: 25% for companies with turnover up to Rs 400 crore in FY 2022-23, 30% for others. New regime rate (Section 115BAA): 22% flat rate, available to all domestic companies, but no exemptions/deductions allowed except depreciation. New manufacturing company rate (Section 115BAB): 15% for companies incorporated on/after October 1, 2019, manufacturing activity started by March 31, 2024 (extended deadlines may apply). Effective tax rates (including surcharge and cess): 25.17% under new regime (22% + 10% surcharge + 4% cess), 17.16% for new manufacturing companies.

Choosing between old and new regime: Old regime (25%/30%): Can claim all exemptions and deductions - 80-IA/80-IAC (startup benefits), 35(1)(ii) scientific research, depreciation benefits, carried forward losses, and Section 10AA for SEZ units. New regime (22%/15%): Lower rate but no exemptions except depreciation. Best for: Companies with few deductions to claim. Analysis needed: Compare tax liability under both regimes annually. Most startups with significant R&D, startup benefits, or losses should use old regime.

Taxable income computation: Start with profit as per books, then add back disallowed expenses (Section 40 and 43B disallowances, excessive director remuneration, personal expenses, donations above limits, penalties, and provisions), then subtract allowed deductions (depreciation as per IT Act, additional depreciation for new assets, amortization of certain expenditure, carried forward losses set off, and deductions under Chapter VI-A). This equals taxable income for applying tax rate.

Key disallowances under Section 40A: Cash payment exceeding Rs 10,000: Not allowed as deduction. Payment to relatives at excessive rates: Disallowed to extent of excess. Payment without TDS deduction: 30% of expense disallowed if TDS not deducted. Payment not deducted via banking channels: Disallowed for specified payments.

Section 43B (Allowed only on payment basis): Statutory dues (GST, customs, excise), Employer''s contribution to PF/ESI/gratuity, Interest on loans from public financial institutions, Leave encashment, and Bonus/commission to employees. These expenses are deductible only in the year actually paid, regardless of when accrued.

Depreciation under Income Tax: Different from accounting depreciation under Companies Act. IT depreciation is block-based with prescribed rates: Computer and software: 40% WDV, Plant and machinery: 15% WDV, Furniture: 10% WDV, Buildings: 10% WDV, and Intangible assets (patents, copyrights, licenses): 25% WDV. Additional depreciation: 20% extra in first year for new plant and machinery (for manufacturing). Full year depreciation allowed if asset used for 180+ days, otherwise half.

MAT (Minimum Alternate Tax): MAT @15% of book profit applies if tax under normal provisions is less than 15% of book profit. Book profit = Net profit as per P&L + specified additions - specified deductions. MAT credit available: Excess MAT paid over normal tax can be carried forward for 15 years. Not applicable to companies under Section 115BAA/115BAB new regimes.',
        '["Calculate your estimated corporate tax liability under both old and new regimes", "Identify all available deductions and exemptions applicable to your startup", "Review expense records for Section 40A and 43B compliance - identify any disallowances", "Create depreciation schedule per Income Tax Act for all fixed assets"]'::jsonb,
        '["Corporate Tax Rate Comparison Tool (Old vs New Regime)", "Taxable Income Computation Template", "Depreciation Calculator as per Income Tax Act", "Section 40A and 43B Compliance Checklist"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 14: TDS Compliance Essentials
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        14,
        'TDS Compliance Essentials',
        'Tax Deducted at Source (TDS) is a mechanism where the payer deducts tax at the time of payment and deposits it with the government. As a startup making payments to vendors, employees, and contractors, you''re responsible for TDS compliance. Non-compliance attracts penalties and your expense deduction can be disallowed.

TDS obligations for startups: You must deduct TDS when making payments above threshold limits to: Contractors and professionals (194C, 194J), Landlords (194I), Employees (192), Interest payments (194A), Commission payments (194H), and Foreign payments (195).

Key TDS sections and rates for startups: Section 192 (Salary): As per slab rates applicable to employee. Section 194A (Interest other than banks): 10% if interest exceeds Rs 40,000/year (Rs 50,000 for senior citizens). Section 194C (Contractor payments): 1% for individuals/HUF, 2% for companies if single payment > Rs 30,000 or aggregate > Rs 1,00,000 in FY. Section 194H (Commission/brokerage): 5% if amount exceeds Rs 15,000 in FY. Section 194I (Rent): 10% for land/building, 2% for plant/machinery/equipment if rent exceeds Rs 2,40,000/year. Section 194J (Professional/technical fees): 10% for professional fees, 2% for technical services, royalty, and non-compete fees if payment exceeds Rs 30,000 in FY. Section 195 (Foreign payments): Rates vary based on nature and DTAA - typically 10-40%.

194C vs 194J distinction: This is the most common confusion for startups. 194C (1%/2%): Work contracts - output-based, deliverable-focused (software development project, manufacturing contract, construction). 194J (10%/2%): Professional services - skill/expertise-based (legal advice, accounting, consulting, managerial services, technical services). Example: Hiring a developer for fixed output = 194C @1%. Hiring same developer as consultant for ongoing advisory = 194J @10%.

TDS process and timelines: Step 1 - Deduct: At time of payment or credit to party''s account, whichever is earlier. Step 2 - Deposit: By 7th of the following month. Exception: March deductions can be deposited by April 30. Step 3 - Return filing: Quarterly returns - Q1 by July 31, Q2 by Oct 31, Q3 by Jan 31, Q4 by May 31. Step 4 - Issue Form 16/16A: Form 16 to employees by June 15, Form 16A to other deductees within 15 days of quarterly return filing.

TDS return forms: Form 24Q: Salary TDS (Section 192). Form 26Q: Non-salary TDS (all other sections). Form 27Q: TDS on payments to non-residents (Section 195). File through TRACES portal or authorized intermediaries like TIN-NSDL.

Lower/nil TDS certificate: Deductees expecting tax refund can apply for lower TDS certificate under Section 197. Your startup can also apply if you expect losses and want to avoid TDS on receipts. Application through TRACES portal, certificate valid for one FY.

Consequences of non-compliance: Late deposit: Interest @1% per month from date of deduction to deposit. Non-deduction: Interest @1% per month from date payable to date of deduction. Late return filing: Rs 200 per day until filed, maximum up to TDS amount. No return filed: Penalty up to Rs 10,000 to Rs 1,00,000. Most critical: If TDS not deducted, 30% of expense disallowed under Section 40(a)(ia).',
        '["Map all your payment types to applicable TDS sections - create vendor master with TDS rates", "Set up TDS deduction tracking in accounting software - configure automatic TDS calculation", "Verify TDS deposits are being made by 7th of each month - review last 6 months", "Create TDS compliance calendar with all quarterly return deadlines"]'::jsonb,
        '["TDS Rate Chart FY 2024-25 with thresholds and exceptions", "TDS Section Applicability Decision Tree", "TDS Return Filing Guide (24Q, 26Q, 27Q)", "194C vs 194J Determination Checklist"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 15: Advance Tax Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        15,
        'Advance Tax Planning and Management',
        'Advance tax is the system of paying income tax in installments during the financial year itself, rather than in one lump sum at year-end. If your estimated tax liability exceeds Rs 10,000 in a year, you must pay advance tax. Proper planning avoids interest penalties and improves cash flow management.

Advance tax due dates: For companies (and all assesses opting for presumptive taxation): June 15: 15% of total tax liability, September 15: 45% of total tax liability (cumulative), December 15: 75% of total tax liability (cumulative), March 15: 100% of total tax liability (cumulative). For individuals/HUF/firms (not opting for presumptive): Same dates and percentages apply.

Advance tax calculation: Step 1 - Estimate annual profit based on current trends and projections. Step 2 - Compute taxable income (add backs, deductions). Step 3 - Calculate tax at applicable rates. Step 4 - Deduct TDS credits expected on income (interest, professional income). Step 5 - Remaining amount is advance tax payable. Example: Estimated profit Rs 50 lakh, tax @25.17% = Rs 12.58 lakh, less TDS credits Rs 2 lakh = Advance tax Rs 10.58 lakh.

Interest for short payment: Section 234B (Default in payment): 1% per month on shortfall if advance tax paid is less than 90% of assessed tax. Calculated from April 1 to date of assessment. Section 234C (Deferment): 1% per month for each quarter where cumulative payment is less than prescribed percentage. Calculated for 3 months per installment.

Advance tax payment process: Generate challan through: TIN-NSDL e-payment (https://onlineservices.tin.egov-nsdl.com/etaxnew/tdsnontds.jsp) or OLTAS payment through net banking. Select: Challan No. ITNS 280, Tax applicable: Companies, Type of payment: Advance Tax (100). Enter: PAN, assessment year, and amount. Pay through net banking and save challan receipt (BSR code and challan serial number needed for return filing).

Advance tax planning strategies: Quarterly review: Conduct profit review before each advance tax date, adjust estimates based on actual performance. TDS optimization: Maximize TDS on income (avoid lower TDS certificates unless necessary) to reduce advance tax burden. Expenditure timing: Accelerate allowable expenses in high-profit quarters. Defer income legally: If possible, defer revenue recognition to next quarter. Loss offset: If expecting losses, reduce advance tax accordingly (document basis).

Cash flow management: Advance tax represents 25-35% of profits paid upfront. Plan cash reserves: Keep 3-month advance tax provision. Coordinate with: VC funding rounds (ensure funds available), Major expenditure timing, Revenue collection cycles.

Common mistakes: Ignoring advance tax until year-end (results in interest), Not adjusting for TDS credits (overpayment), Using wrong challan codes (causes credit issues), and Not maintaining challan records (problems in return filing).',
        '["Estimate your advance tax liability for current FY - use projection template", "Set up quarterly profit review process - schedule review meetings before advance tax dates", "Pay advance tax due for current quarter if applicable", "Create advance tax tracking register - record all challans with details"]'::jsonb,
        '["Advance Tax Calculator with quarterly breakup", "Advance Tax Challan Payment Guide", "Interest Calculator for Section 234B and 234C", "Advance Tax Planning Calendar with review triggers"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 16: Income Tax Return Filing
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_4_id,
        16,
        'Income Tax Return Filing for Companies',
        'Filing the Income Tax Return (ITR) is the annual culmination of your tax compliance. For companies, ITR-6 is the applicable form. The return must be filed by October 31 (extended frequently by government). A properly filed return with accurate information prevents scrutiny and ensures timely refunds.

ITR forms for companies: ITR-6: For all companies except those claiming exemption under Section 11 (charitable trusts). ITR-7: For trusts, political parties, and institutions. Private limited startups file ITR-6.

ITR-6 components: Part A-GEN: General information (company details, filing status). Part A-BS: Balance Sheet items. Part A-PL: Profit & Loss items. Part A-OI: Other information (TDS, advance tax, tax on distributed profits). Part A-QD: Quantitative details (for manufacturing/trading). Schedule-BP: Computation of business income. Schedule-DPM: Depreciation. Schedule-DOA: Details of other assets. Schedule-AL: Asset-liability statement. Schedule-DI: Details of investments. Multiple other schedules for deductions, brought forward losses, foreign income, etc.

ITR filing process: Step 1 - Prepare financial statements audited/certified as per Companies Act. Step 2 - Compute taxable income with all adjustments. Step 3 - Reconcile TDS credits with Form 26AS/AIS (Annual Information Statement). Step 4 - Verify advance tax payments. Step 5 - Download pre-filled XML from income tax portal or use utility. Step 6 - Fill/update all schedules in offline utility or online. Step 7 - Validate and compute tax. Step 8 - Pay self-assessment tax if any (use Challan 280). Step 9 - Submit return. Step 10 - Verify through DSC (mandatory for companies).

Form 26AS and AIS reconciliation: Form 26AS shows: TDS credits from all deductors, advance tax/self-assessment tax paid, high-value transactions, and refunds received. AIS (Annual Information Statement) shows: All financial transactions reported by various parties (banks, mutual funds, property registrations, etc.). Reconciliation: Match all TDS shown with your records, identify missing TDS (follow up with deductors for correction), verify tax payments match challans, and note any unexplained transactions for response if queried.

Tax audit requirements: Tax audit under Section 44AB mandatory if: Turnover exceeds Rs 1 crore (Rs 10 crore if 95%+ transactions through banking channels), or claiming lower profits than presumptive rates under Sections 44AD/44AE. Audit report: Form 3CD filed electronically by tax auditor by September 30. Coordinates with: ITR filing due date extended to October 31 if tax audit applicable.

Return filing deadlines: Without tax audit: July 31 (frequently extended). With tax audit: October 31 (frequently extended). Transfer pricing applicable: November 30. Belated return: December 31 (with penalty Rs 5,000-10,000). Revised return: Within time limit for belated return or completion of assessment.

Post-filing actions: Verify acknowledgment (ITR-V) received. Track processing status on income tax portal. Respond to any notices within timeline. If refund expected: Monitor refund status, ensure bank account details correct. If demand raised: Review demand, file rectification or appeal if incorrect.',
        '["Reconcile Form 26AS and AIS with your books - identify and resolve all discrepancies", "Prepare tax computation statement with all schedules and working notes", "Compile all supporting documents for deductions claimed", "File ITR-6 or coordinate with tax consultant for filing - verify with DSC"]'::jsonb,
        '["ITR-6 Filing Guide with Schedule-wise Instructions", "Form 26AS and AIS Reconciliation Template", "Tax Computation Template for Companies", "ITR Filing Checklist with Document Requirements"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 5: Startup Tax Benefits (Days 17-20)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Startup Tax Benefits',
        'Unlock tax benefits available to DPIIT-recognized startups including Section 80-IAC tax holiday, Angel Tax exemption, ESOP taxation deferral, and other incentives under Startup India scheme.',
        4,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_5_id;

    -- Day 17: DPIIT Recognition and Benefits Overview
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        17,
        'DPIIT Recognition and Startup Benefits Overview',
        'Department for Promotion of Industry and Internal Trade (DPIIT) recognition unlocks significant tax and regulatory benefits for eligible startups. As of 2024, over 1,12,000 startups are DPIIT recognized. The recognition is free and takes only 2-3 weeks to obtain. Every eligible startup should get recognized immediately.

DPIIT recognition eligibility: Entity type: Private Limited Company, Partnership Firm, or LLP. Age: Not more than 10 years from date of incorporation/registration. Turnover: Not exceeding Rs 100 crore in any financial year since incorporation. Nature: Working towards innovation, development, or improvement of products/processes/services, OR having scalable business model with high potential for employment generation or wealth creation. Exclusion: Not formed by splitting or reconstruction of existing business.

DPIIT recognition process: Step 1: Register on Startup India portal (https://www.startupindia.gov.in). Step 2: Fill online recognition application with: Entity details (CIN/LLPIN, incorporation date), Brief write-up on nature of business (what you do, how it''s innovative), Self-certification of eligibility conditions, and Supporting documents (incorporation certificate, PAN). Step 3: Submit application. Step 4: Recognition certificate issued within 2-3 working days (if compliant). Step 5: Download certificate and unique recognition number.

Benefits of DPIIT recognition: Tax benefits: Section 80-IAC tax holiday eligibility, Angel Tax exemption under Section 56(2)(viib), and ESOP taxation deferral for employees. Regulatory benefits: Self-certification for 9 labor and environment laws (reduces compliance burden), Fast-track patent examination (80% fee reduction), and easier public procurement (exemption from prior experience/turnover criteria). Funding access: Startup India Seed Fund Scheme eligibility, Fund of Funds access through SEBI-registered AIFs, and Credit Guarantee Scheme for Startups. Other benefits: Free facilitation of IP applications, Relaxed norms for public procurement, and Access to government incubators and accelerators.

Self-certification compliance: DPIIT-recognized startups can self-certify compliance with 6 labor laws and 3 environment laws for 3 years from incorporation. Labor laws covered: Industrial Disputes Act, Trade Unions Act, Building & Construction Workers Act, Inter-State Migrant Workers Act, Payment of Gratuity Act, Contract Labor Act. Environment laws covered: Water (Prevention and Control of Pollution) Act, Air (Prevention and Control of Pollution) Act, Environment Protection Act. Note: Still need to maintain proper records and comply with substantive provisions.

Startup India Seed Fund Scheme: Eligibility: DPIIT-recognized, incorporated < 2 years, not received > Rs 10 lakh funding. Benefits: Up to Rs 50 lakh for concept/prototype development, up to Rs 25 lakh for market entry/commercialization. Process: Apply through participating incubators, evaluation, and disbursal. Currently 126 incubators empaneled with Rs 945 crore sanctioned.

Credit Guarantee Scheme: Provides credit guarantee to scheduled commercial banks and NBFCs for loans to DPIIT-recognized startups. Coverage: Up to Rs 10 crore. Guarantee: Up to 85% for loans up to Rs 5 crore, 75% for loans between Rs 5-10 crore. Benefit: Enables startups to get loans without collateral or third-party guarantee.',
        '["Apply for DPIIT recognition if not already registered - prepare business write-up highlighting innovation", "Download and review recognition certificate - note recognition number for future applications", "Identify all applicable benefits and create action plan to avail each", "Register for Startup India Hub and explore available programs"]'::jsonb,
        '["DPIIT Recognition Application Guide with sample write-ups", "Startup India Benefits Summary Document", "Self-Certification Compliance Checklist", "Startup India Seed Fund Application Guide"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 18: Section 80-IAC Tax Holiday
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        18,
        'Section 80-IAC Tax Holiday',
        'Section 80-IAC provides a 100% tax holiday for 3 consecutive years out of the first 10 years of incorporation. This is a powerful benefit that can save startups crores in taxes during their early profitable years. However, strict conditions apply and prior approval is required.

Section 80-IAC eligibility conditions: Company incorporated between April 1, 2016 and March 31, 2025 (extended multiple times). DPIIT recognized startup. Total turnover does not exceed Rs 100 crore in any year claiming deduction. Engaged in eligible business (innovation, development, deployment of new products/processes/services driven by technology or IP). Prior approval from Inter-Ministerial Board (IMB) of Certification required.

IMB application process: Step 1: Obtain DPIIT recognition first (prerequisite). Step 2: Apply online through Startup India portal for IMB certification. Step 3: Provide detailed documentation including: Business plan, Details of innovation and technology, Revenue projections, Employment generation plan, and Auditor certificate on turnover. Step 4: IMB evaluates and may call for presentation. Step 5: Certification issued if eligible. Timeline: 45-60 days typically.

Claiming the deduction: Once IMB certified, you can claim deduction in your ITR. Claim in any 3 consecutive years out of first 10 years from incorporation. Deduction equals 100% of profits derived from eligible business. No need to claim in first profitable year - can choose optimal years. Example: Incorporated 2020, profitable from 2023. Can claim deduction in AY 2024-25, 2025-26, 2026-27 (or any 3 consecutive years until 2030).

Tax computation with 80-IAC: Gross total income: Rs 1 crore. Less: Section 80-IAC deduction: Rs 1 crore. Taxable income: Nil. Tax payable: Nil. Important: Only profits from eligible business qualify. If multiple business segments, maintain separate accounts.

MAT implications: Even with 80-IAC deduction, MAT may apply. MAT @15% of book profit is minimum tax. 80-IAC reduces normal tax to nil, but MAT still applicable. MAT credit: Excess MAT paid can be carried forward for 15 years. Can be utilized when normal tax exceeds MAT in future years.

Planning considerations: Timing the claim: Delay if early years have low profits, claim in higher profit years for maximum benefit. Three-year window: Choose 3 years with highest profits for maximum tax savings. MAT planning: In early profitable years, MAT credit buildup may be advantageous. Documentation: Maintain detailed records of eligible business income, auditor certificate on eligibility.

Common pitfalls: Not applying for IMB certification in time. Claiming before certification received (invalid). Not maintaining separate accounts for eligible vs ineligible income. Crossing Rs 100 crore turnover threshold. Not choosing consecutive years for claim.',
        '["Assess Section 80-IAC eligibility for your startup - verify all conditions", "Apply for IMB certification if eligible - prepare comprehensive business documentation", "Plan optimal years for claiming deduction based on profit projections", "Set up separate accounting for eligible business income if multiple segments"]'::jsonb,
        '["Section 80-IAC Eligibility Checker with conditions checklist", "IMB Application Guide with document list", "Tax Holiday Planning Calculator", "80-IAC Claim Documentation Requirements"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 19: Angel Tax Exemption
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        19,
        'Angel Tax Exemption (Section 56(2)(viib))',
        'Angel Tax refers to Section 56(2)(viib) which taxes share premium received by startups above fair market value (FMV). This controversial provision has been a significant concern for startup funding. However, DPIIT-recognized startups can avail exemption from this provision, subject to conditions.

How Angel Tax works: When a startup issues shares to investors at a premium, and that premium exceeds the Fair Market Value (FMV), the excess is treated as income of the company and taxed at 30% (plus surcharge and cess). Example: FMV per share = Rs 100. Issue price = Rs 500. Premium above FMV = Rs 400 per share. If 10,000 shares issued, taxable income = Rs 40 lakh. Tax @35% = Rs 14 lakh.

FMV determination methods: For unlisted shares, FMV must be computed as per Rule 11UA: Discounted Cash Flow (DCF) method: Based on future cash flow projections discounted to present value. Book Value method: Net asset value divided by number of shares. Both valuations should be from registered merchant banker. Startups typically use DCF as it captures growth potential.

Exemption for DPIIT-recognized startups: DPIIT-recognized startups are exempt from Section 56(2)(viib) if: Aggregate paid-up share capital and share premium after the investment does not exceed Rs 25 crore. Investor is: Indian resident individual or HUF, or Category I or II AIF registered with SEBI, or Listed company with net worth > Rs 100 crore or turnover > Rs 250 crore, or Non-resident (subject to FEMA compliance).

Conditions for exemption: Investor should not have invested in land, building (other than for business), loans/advances to specified persons, motor vehicle/aircraft/yacht (above Rs 10 lakh), jewelry/precious stones, or archaeological collections. Startup should not invest in these prohibited assets for 7 years after share issue. Returns must be filed declaring the investment details.

Obtaining exemption: Step 1: Ensure DPIIT recognition is valid. Step 2: Verify investment and post-investment capital is within Rs 25 crore. Step 3: Confirm investor eligibility category. Step 4: Obtain valuation report from merchant banker for documentation. Step 5: File Form 2 (declaration under Section 56(2)(viib) exemption) with income tax department. Step 6: Disclose in ITR under appropriate schedule.

Budget 2023 developments: Exemption threshold increased from Rs 10 crore to Rs 25 crore. Cost inflation index allowed for computing FMV in certain cases. Category I and II AIFs added as eligible investors.

Documentation requirements: DPIIT recognition certificate. Valuation report from SEBI-registered merchant banker. Investor declaration on eligibility and fund source. Board resolution approving the investment. Share subscription agreement. Form 2 filing acknowledgment.

Risk mitigation: Always obtain merchant banker valuation even if claiming exemption. Ensure investor provides required declarations. Maintain 7-year investment restriction compliance. File Form 2 proactively before assessment. Keep complete paper trail for potential scrutiny.',
        '["Verify DPIIT recognition is current and valid for angel tax exemption", "Assess current and proposed investments against Rs 25 crore threshold", "Verify investor eligibility under exemption categories", "Obtain merchant banker valuation and file Form 2 declaration"]'::jsonb,
        '["Angel Tax Exemption Eligibility Calculator", "Form 2 Filing Guide with sample declaration", "Investor Eligibility Verification Checklist", "Merchant Banker Valuation Requirements Document"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 20: ESOP Taxation and Other Startup Benefits
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_5_id,
        20,
        'ESOP Taxation and Other Startup Benefits',
        'Employee Stock Option Plans (ESOPs) are critical for startups to attract talent without heavy cash compensation. However, ESOP taxation in India has historically been challenging as tax was triggered at exercise even without liquidity. Recent reforms provide significant relief for DPIIT-recognized startup employees.

ESOP basics: Grant: Company grants options to employee (no tax event). Vesting: Options vest over time per schedule (no tax event). Exercise: Employee exercises option, pays exercise price, receives shares - this was traditionally the tax trigger. Sale: Employee sells shares and pays capital gains tax.

Traditional ESOP taxation (Non-DPIIT startups): At exercise, the difference between Fair Market Value (FMV) on exercise date and exercise price is treated as perquisite (salary income) taxed at applicable slab rates. Problem: Employee pays tax without any cash receipt - tax on paper gains. Example: Exercise price Rs 10, FMV at exercise Rs 1,000. Perquisite = Rs 990 per share. On 1,000 shares = Rs 9.9 lakh taxable as salary. Tax @30% = Rs 2.97 lakh due immediately.

ESOP deferral for DPIIT-recognized startups: Section 191(2B) allows deferral of TDS on ESOP perquisites for eligible employees of DPIIT-recognized startups. Tax payment deferred until earliest of: 5 years from end of year in which ESOP exercised, Date of sale of shares, and Date of employee leaving the company. Benefit: Employees don''t face immediate tax burden without liquidity.

Eligibility for deferral: Company must be DPIIT-recognized startup. Employee exercises ESOPs in shares of the startup. All ESOP exercises in eligible startups qualify. Employer reports in Form 24Q but doesn''t deduct TDS. Employee includes in ITR but claims deferral.

Employer compliance for ESOP deferral: Report ESOP exercises in Form 24Q quarterly return. Don''t deduct TDS at exercise (deviation from normal requirement). Maintain register of ESOP exercises and employee status. Track deferral period end dates for each employee. Notify employee if employment ends (tax becomes due). Deduct TDS on sale of shares if applicable.

Capital gains on ESOP sale: When shares are sold: Cost of acquisition = FMV on exercise date (the perquisited amount). Sale price minus FMV = Capital gains. If held > 24 months from exercise: Long-term capital gains @20% with indexation. If held < 24 months: Short-term capital gains at slab rates. Example: FMV at exercise Rs 1,000, sale price Rs 1,500. Capital gains = Rs 500 per share.

Other startup tax benefits: Patent Box regime: Royalty from patents registered in India taxed at concessional 10% (Section 115BBF). R&D expenditure: Weighted deduction of 100% on revenue R&D expenditure (Section 35). Though super deduction of 200% has been discontinued. Carry forward losses: Losses can be carried forward for 8 years and set off against profits. For startups with Section 79 relaxation, change in shareholding due to funding doesn''t affect loss carry forward.

Section 79 relaxation: Normally, if more than 49% shareholding changes, brought forward losses cannot be set off. For DPIIT-recognized startups: Relaxation allows losses to be carried forward even if shareholding changes due to: Fresh equity funding, Merger, Demerger, or Reconstruction. Condition: Beneficial owner of shares remains the same.',
        '["Design ESOP scheme considering tax implications for employees", "Implement ESOP deferral compliance for DPIIT-recognized startup", "Track ESOP exercises and deferral timelines in HR system", "Communicate ESOP tax benefits to employees - create employee guide"]'::jsonb,
        '["ESOP Tax Calculator for Employees", "ESOP Deferral Compliance Checklist for Employers", "Section 79 Loss Carry Forward Assessment Tool", "Complete Startup Tax Benefits Summary Sheet"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 6: Financial Planning & Budgeting (Days 21-24)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Financial Planning & Budgeting',
        'Master cash flow management, working capital optimization, runway planning, and budget creation. Build the financial planning capabilities essential for startup survival and growth.',
        5,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_6_id;

    -- Day 21: Cash Flow Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        21,
        'Cash Flow Management for Startups',
        'Cash flow is the lifeblood of startups. Profitable companies can fail if they run out of cash, while unprofitable companies can survive with good cash management. In India, where payment cycles are long and cash flow unpredictable, mastering cash flow management is essential for survival.

Understanding cash flow: Cash flow differs from profit. Profit is accounting concept (revenue minus expenses), while cash flow is actual money in and out. Timing differences create gaps: Revenue recognized when earned (invoice sent), but cash received later (30-90 days). Expense recognized when incurred, but cash paid later (or earlier for prepayments).

Cash flow statement components: Operating activities: Cash from core business - customer receipts minus vendor payments, salary, rent, etc. Investing activities: Cash for long-term assets - equipment purchases, investments. Financing activities: Cash from funding - equity raised, loans received, loan repayments. Net cash flow: Sum of all three = change in cash balance.

Cash flow forecasting: 13-week rolling cash forecast is the gold standard for startups. Week-by-week projection for next 13 weeks showing: Opening cash balance, Expected cash inflows (customer payments by customer, other receipts), Expected cash outflows (salary, rent, vendors, taxes, loan payments), Closing cash balance, and Minimum cash threshold line.

Cash inflow management: Faster collections: Offer early payment discounts (2% 10 net 30), send invoices immediately (same day as delivery), follow up on overdue within 3 days, consider invoice factoring for large receivables. Payment terms: Negotiate favorable terms with large customers, consider advance payments or milestone billing, annual contracts with upfront payment for SaaS. Collection efficiency metrics: DSO (Days Sales Outstanding) = (AR / Revenue) x Days. Target: 30-45 days for B2B, 0-7 days for B2C.

Cash outflow management: Payment terms: Negotiate longer terms with vendors (45-60 days standard), use credit period fully (don''t pay early without benefit), prioritize payments (statutory first, then critical vendors, then others). Expense control: Categorize expenses as critical (cannot defer), important (can defer 2-4 weeks), and optional (can defer indefinitely). Fixed vs variable: Convert fixed costs to variable where possible (cloud vs own servers, co-working vs lease).

Working capital optimization: Working capital = Current Assets - Current Liabilities. For startups, focus on: Inventory (if applicable) - reduce days inventory outstanding, Receivables - reduce DSO through faster collection, Payables - increase DPO (Days Payable Outstanding) through negotiation. Working capital cycle = DIO + DSO - DPO. Negative working capital cycle means you collect before you pay - ideal for cash flow.

Cash reserves policy: Maintain minimum 3 months operating expenses as cash reserve. Separate operating account from reserve account. Don''t touch reserves except for genuine emergencies. Invest reserves in liquid instruments (FDs, liquid funds) for some return.

Cash flow red flags: More than 50% of AR overdue beyond terms. Cash balance trending down over 4+ weeks. Payables aging significantly increasing. Struggling to meet payroll dates. Using credit cards for operating expenses.',
        '["Create 13-week cash flow forecast for your startup - populate with actual data and projections", "Calculate your DSO and DPO - identify improvement opportunities", "Establish cash reserve policy and target reserve amount (3 months minimum)", "Set up weekly cash review meeting and cash flow reporting process"]'::jsonb,
        '["13-Week Cash Flow Forecast Template", "DSO and DPO Calculator", "Cash Flow Improvement Checklist", "Working Capital Optimization Guide"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 22: Runway Planning and Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        22,
        'Runway Planning and Management',
        'Runway is the number of months until your startup runs out of cash at current burn rate. It''s the most critical metric for startup survival. VCs expect 18-24 months runway after funding. Running low on runway limits strategic options and forces desperate decisions.

Runway calculation: Simple runway: Cash Balance / Monthly Burn Rate = Months of runway. Example: Rs 2 crore cash / Rs 25 lakh monthly burn = 8 months runway. More accurate: Include expected revenue changes, planned expense changes, and one-time items. Formula: Cash + Expected Revenue - Expected Expenses over time = Runway to zero.

Burn rate understanding: Gross burn: Total monthly cash outflow (all expenses). Net burn: Gross burn minus monthly revenue. For pre-revenue startups, gross burn = net burn. Example: Gross burn Rs 30 lakh, revenue Rs 10 lakh, net burn Rs 20 lakh. If you have Rs 2 crore cash, gross runway is 6.7 months but net runway is 10 months.

Burn rate benchmarks by stage: Pre-seed/Seed: Rs 10-25 lakh/month (team of 3-8). Series A: Rs 40-80 lakh/month (team of 15-30). Series B: Rs 1-2 crore/month (team of 50-100). These vary significantly by sector, city, and business model.

Runway management strategies: Revenue acceleration: Faster product development, more aggressive sales, new revenue streams. Expense optimization: Headcount planning (largest expense), office/infrastructure rightsizing, vendor renegotiation, defer non-critical spending. Emergency measures (if <6 months runway): Hiring freeze, salary cuts (founder first), office downgrade, and pivot to revenue focus.

Founder salary considerations: Early stage: Many founders take no salary or minimal (Rs 50,000-1,00,000). Seed stage: Rs 1-2 lakh/month is common. Series A: Rs 2-4 lakh/month reasonable. Principle: Founder salary should be enough to not worry about personal finances, but not so much that you''re comfortable. VCs scrutinize founder salaries.

Runway planning for fundraising: Start fundraising with 9-12 months runway remaining. Fundraising takes 4-6 months for most startups. Buffer for delays and negotiations. Never start with <6 months - you''ll be negotiating from weakness. Post-funding runway: Target 18-24 months. This provides enough time to hit milestones for next round.

Scenario planning: Build three scenarios - Base case (expected performance), Best case (everything goes right), and Worst case (significant headwinds). Calculate runway under each scenario. Plan actions for worst case: What do you cut? When do you cut? What triggers action?

Communication with stakeholders: Monthly runway update to board and investors. If runway drops below 9 months, increase frequency and develop action plan. Be transparent - investors can help more with early warning. Surprising investors with cash crisis destroys trust.',
        '["Calculate current runway using both gross and net burn methods", "Build three-scenario runway model (base, best, worst case)", "Identify expense reduction levers with quantified impact on runway", "Create fundraising timeline based on runway - start at 9-12 months remaining"]'::jsonb,
        '["Runway Calculator with Scenario Modeling", "Burn Rate Benchmark Guide by Stage and Sector", "Expense Reduction Playbook for Startups", "Fundraising Timeline Planner based on Runway"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 23: Budget Creation and Monitoring
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        23,
        'Budget Creation and Monitoring',
        'A budget translates your business plan into financial terms. It forces prioritization, enables accountability, and provides a benchmark for performance monitoring. Even early-stage startups benefit from disciplined budgeting - it instills financial rigor that becomes essential as you scale.

Annual budget components: Revenue budget: Monthly revenue projections by product/segment, assumptions documented (growth rates, pricing, conversions), realistic targets based on historical data and market. Expense budget: Personnel costs (salaries, benefits, hiring plan), Operating expenses (rent, utilities, software, travel), Marketing and sales expenses, Technology and infrastructure, and Professional fees (legal, CA, consultants). Capital budget: Equipment purchases, software licenses (if capitalized), and office setup costs. Cash budget: Integrates revenue and expense with timing considerations.

Budgeting approaches: Top-down: Set overall targets, allocate to departments. Good for: Growth targets, cost control. Risk: May be unrealistic at ground level. Bottom-up: Each function builds budget, roll up to total. Good for: Realistic estimates, ownership. Risk: May be too conservative, lacks coordination. Zero-based budgeting (ZBB): Justify every expense from zero. Good for: Cost optimization, challenging assumptions. Risk: Time-consuming, may cut necessary expenses. Recommended: Combination - top-down targets, bottom-up build, ZBB for selected categories.

Budget timeline: Month 10-11 of FY: Start budget process, set targets, gather input. Month 11-12: Draft budgets, review, iterate. Month 12: Finalize and approve budget for next FY. Monthly: Actual vs budget review, re-forecast if needed.

Building the revenue budget: Step 1: Define revenue drivers (customers, orders, ARPU, etc.). Step 2: Project each driver month by month. Step 3: Apply pricing and conversion rates. Step 4: Calculate revenue. Step 5: Sanity check against historical growth and market data. Document assumptions for each: "Expecting 15% M-o-M growth based on Q3 run rate" is better than unexplained numbers.

Building the expense budget: Fixed costs: Rent (known), salaries (based on current team + hiring plan), software subscriptions (known commitments). Variable costs: Sales commission (% of revenue), cloud costs (scaling with usage), marketing (% of revenue or fixed campaigns). Semi-variable: Can be either - travel, professional fees. Build month by month, accounting for: Timing of new hires (full month cost only from joining), annual increases, one-time costs (events, equipment).

Budget monitoring: Monthly budget review process: Pull actual results from accounting system, compare to budget line by line, calculate variance (Actual - Budget) and variance %, investigate variances >10%, document explanations, decide on corrective actions. Create variance analysis report with: Revenue vs budget (overall and by segment), Expenses vs budget (by category), Net income vs budget, and Commentary on significant variances.

Re-forecasting: Budget is your plan, forecast is your updated expectation. Re-forecast quarterly (or monthly in high-growth phase). Update remaining months based on actual trends. Creates more accurate cash flow projections. Don''t change budget - it remains the benchmark; forecast updates expectations.

Common budgeting mistakes: Over-optimistic revenue (hope is not a strategy). Underestimating hiring timeline and costs. Not budgeting for tax payments. Forgetting one-time costs (events, legal, audits). Not building contingency buffer (5-10% of expenses).',
        '["Create annual budget for next FY with monthly detail - revenue, expenses, and cash", "Document all budget assumptions clearly for future reference", "Set up monthly budget review process with variance analysis template", "Build re-forecast model for quarterly updates"]'::jsonb,
        '["Annual Budget Template with auto-calculations", "Revenue Budget Builder by Business Model", "Expense Budget Template with Categories", "Variance Analysis Report Template"]'::jsonb,
        120,
        75,
        2,
        NOW(),
        NOW()
    );

    -- Day 24: Financial Modeling Basics
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_module_6_id,
        24,
        'Financial Modeling Basics for Startups',
        'A financial model is a tool that projects your business''s financial future based on assumptions and drivers. For startups, financial models are essential for fundraising, strategic planning, and performance tracking. Building a robust model demonstrates financial sophistication to investors.

Financial model components: Assumptions sheet: All input variables in one place (growth rates, pricing, conversion rates, costs). Revenue model: Detailed build-up of how revenue is generated. Operating model: Expense projections tied to revenue and headcount. Financial statements: P&L, Balance Sheet, Cash Flow Statement. Metrics and KPIs: Calculated outputs investors care about.

Building a revenue model: Identify revenue drivers for your business model. SaaS example: Number of trials x trial-to-paid conversion x average revenue per user x churn rate. E-commerce: Website visits x conversion rate x average order value x orders per customer. Marketplace: Listings x transactions per listing x take rate. Build bottom-up from these drivers rather than top-down from market size.

Driver-based modeling: Link everything to key drivers, not arbitrary growth rates. Example: Revenue = Customers x ARPU. Customers = Previous customers + new customers - churned customers. New customers = Marketing spend / CAC. This creates logical, testable model where changing one assumption flows through entire model.

Three-statement model: P&L flows to Balance Sheet and Cash Flow. Balance Sheet: Assets = Liabilities + Equity. Cash from P&L (net income) flows to retained earnings. Cash Flow Statement: Start with net income, adjust for non-cash items (depreciation), adjust for working capital changes, add investing/financing activities, end with cash balance (must match Balance Sheet cash).

Model time horizons: Detailed monthly: Current year and next year. Quarterly: Year 2-3. Annual: Year 4-5. More detail in near term where visibility is higher.

Scenario analysis: Build three scenarios into your model. Base case: Your expected outcome. Upside case: Things go better than expected (20-30% above base). Downside case: Things go worse (20-30% below base). Show how unit economics and runway change under each. Investors appreciate founders who have thought through scenarios.

Key startup metrics to model: Unit economics: CAC (Customer Acquisition Cost), LTV (Lifetime Value), LTV/CAC ratio (should be >3), CAC payback period. Growth metrics: MRR/ARR growth, customer growth, NRR (Net Revenue Retention). Profitability: Gross margin, contribution margin, operating margin, EBITDA. Cash metrics: Burn rate, runway, cash conversion cycle.

Model best practices: One assumption, one cell (don''t hardcode in formulas). Color coding: Blue for inputs, black for formulas, green for links. No circular references. Document assumptions and sources. Version control (date each version). Separate historical actuals from projections. Error checks built in (Balance Sheet balances, signs correct).

Presentation for investors: Summary page with key metrics and charts. Clear assumption documentation. Scenario toggle for upside/downside. Sensitivity analysis on key assumptions. Professional formatting (consistent fonts, aligned numbers).',
        '["Build basic financial model with revenue drivers, operating expenses, and key metrics", "Create assumption sheet with all inputs documented and sourced", "Develop three scenarios (base, upside, downside) in your model", "Calculate and present key unit economics and growth metrics"]'::jsonb,
        '["Startup Financial Model Template (SaaS, E-commerce, Marketplace versions)", "Revenue Model Builder by Business Type", "Unit Economics Calculator Template", "Financial Modeling Best Practices Guide"]'::jsonb,
        120,
        75,
        3,
        NOW(),
        NOW()
    );

END $$;

COMMIT;
