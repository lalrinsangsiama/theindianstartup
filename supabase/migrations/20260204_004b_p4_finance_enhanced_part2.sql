-- THE INDIAN STARTUP - P4: Finance Stack CFO-Level Mastery - Enhanced Content Part 2
-- Migration: 20260204_004b_p4_finance_enhanced_part2.sql
-- Purpose: Continue P4 course content - Modules 7-12 (Days 25-45)
-- Depends on: 20260204_004a_p4_finance_enhanced.sql (Modules 1-6)

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
    -- Get P4 product ID
    SELECT id INTO v_product_id FROM "Product" WHERE code = 'P4';

    -- ========================================
    -- MODULE 7: MIS & Financial Reporting (Days 25-28)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'MIS & Financial Reporting',
        'Build comprehensive Management Information Systems with real-time dashboards, KPI tracking, board reporting packs, and monthly management reports that drive strategic decision-making.',
        7,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_7_id;

    -- Day 25: MIS Dashboard Design
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        25,
        'MIS Dashboard Design and Implementation',
        'A well-designed Management Information System transforms raw financial data into actionable insights for founders, management, and investors. Indian startups that implement robust MIS frameworks from early stages consistently outperform peers in fundraising success and operational efficiency.

MIS Framework for Indian Startups: The foundation of effective MIS lies in identifying the right metrics for your stage and business model. Seed-stage startups should focus on runway metrics (months of runway remaining, burn rate trend), product metrics (user acquisition cost, activation rate), and basic unit economics. Series A companies need expanded dashboards covering revenue cohort analysis, department-wise burn allocation, and customer lifetime value projections. Beyond Series B, MIS sophistication should include segment-wise P&L, geographic performance, and predictive analytics.

Dashboard Architecture Best Practices: Implement a three-tier dashboard structure commonly used by successful Indian startups. The Executive Dashboard provides CEO and board-level visibility with 5-7 key metrics updated daily or weekly, focusing on runway, revenue growth, burn rate, and key operational metrics. The Operational Dashboard serves department heads with detailed functional metrics, updated in real-time where possible, covering sales pipeline, marketing spend efficiency, and customer support metrics. The Analytical Dashboard supports FP&A and strategy teams with deep-dive capabilities, historical trend analysis, cohort breakdowns, and scenario modeling.

Indian Context Considerations: Dashboard design must account for India-specific factors. GST reconciliation metrics should track GSTR-2A vs GSTR-3B mismatches, ITC utilization rate, and reverse charge liability. Banking metrics should monitor multiple bank account balances (most Indian startups maintain 3-5 accounts for operational reasons), fixed deposit maturity schedules, and working capital loan utilization. Compliance metrics should track TDS deposit timeliness, advance tax payment schedule adherence, and ROC filing status.

Technology Stack for MIS: Indian startups commonly use Zoho Analytics (Rs 15,000-50,000/month), Metabase (open source, self-hosted), or custom Superset implementations. For data integration, tools like Fivetran or Airbyte can connect Tally, Zoho Books, or other accounting systems to your analytics layer. Implementation timeline typically runs 4-8 weeks for basic dashboards, 3-6 months for comprehensive MIS. Budget Rs 2-5 lakh for initial setup plus Rs 50,000-2 lakh monthly for maintenance and enhancement.

Real-Time vs Batch Updates: Critical metrics like cash balance and runway should update daily (morning reconciliation). Revenue metrics can update daily or weekly depending on transaction volume. Cost metrics typically update monthly post-close. Avoid the temptation to make everything real-time as it increases complexity and cost without proportional benefit for most metrics.',
        '["Define 7-10 key metrics for executive dashboard based on your stage, business model, and investor expectations", "Select MIS technology stack considering integration with your accounting system (Tally, Zoho Books, or others)", "Design three-tier dashboard architecture with clear ownership and update frequency for each level", "Build India-specific compliance tracking into MIS framework covering GST, TDS, and ROC filing metrics"]'::jsonb,
        '["MIS Dashboard Template Library with stage-wise metric recommendations for Indian startups from seed to Series C", "Accounting System Integration Guide covering Tally, Zoho Books, and QuickBooks data extraction methods", "Dashboard Technology Comparison Matrix evaluating Zoho Analytics, Metabase, Superset, and Power BI for Indian startups", "Sample Executive Dashboard with 15+ commonly tracked metrics and visualization best practices"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 26: KPI Framework and Tracking
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        26,
        'KPI Framework and Performance Tracking',
        'Key Performance Indicators form the backbone of startup performance management. Indian investors increasingly expect founders to demonstrate KPI-driven decision making, with 78% of VCs citing clear metrics as a key factor in investment decisions according to recent industry surveys.

Financial KPIs for Indian Startups: Revenue metrics must account for Indian business realities. Track Gross Revenue, Net Revenue (after GST), and Realized Revenue (after bad debts and returns) as separate line items. Monthly Recurring Revenue (MRR) for SaaS businesses should exclude one-time implementation fees common in Indian enterprise sales. Annual Contract Value (ACV) should be tracked in INR with USD equivalent for investor reporting. Revenue concentration risk is critical given Indian market dynamics where top 5 customers often represent 60-80% of B2B startup revenue.

Profitability KPIs: Gross Margin should be calculated consistently, including payment gateway charges (Razorpay typically charges 2% for domestic transactions). Contribution Margin should allocate variable costs accurately, including delivery costs for D2C brands (Rs 60-150 per shipment in India). EBITDA margins for Indian startups typically range from -50% (early stage) to +15% (mature), with profitability expectations accelerating post-2022 funding winter.

Efficiency KPIs: Burn Multiple (Net Burn / Net New ARR) benchmarks for Indian startups are 2x for efficient, 3-4x for acceptable, and 5x+ requiring attention. Magic Number (Net New ARR / Sales & Marketing Spend) above 0.75 indicates efficient growth. Rule of 40 (Revenue Growth % + EBITDA Margin %) above 40 for growth-stage companies, though this benchmark is often relaxed for pre-Series B Indian startups.

Cash Management KPIs: Days Sales Outstanding (DSO) averages 45-60 days for Indian B2B companies versus 30-day standard terms due to payment culture. Track aging buckets: 0-30, 31-60, 61-90, 90+ days with escalation triggers. Cash Conversion Cycle is particularly important for inventory-based businesses, with Indian D2C brands typically seeing 60-90 day cycles. Runway calculation should use 3-month rolling average burn rather than last month to smooth volatility.

Operational KPIs by Business Model: SaaS companies should track Net Revenue Retention (benchmark: 100%+ for enterprise, 85%+ for SMB), Logo Churn (benchmark: below 3% monthly for enterprise), and Expansion Revenue percentage. D2C brands should track Repeat Purchase Rate (benchmark: 25%+ within 90 days), Average Order Value with trend analysis, and Customer Acquisition Cost by channel. Marketplaces should track Take Rate with supply-side and demand-side breakdown, Gross Merchandise Value, and Liquidity (successful transaction rate).',
        '["Define 15-20 KPIs across financial, operational, and efficiency categories aligned with your business model", "Establish KPI benchmarks using industry data and investor expectations for your stage and sector", "Build KPI tracking cadence with daily, weekly, and monthly review rhythms and accountability", "Create KPI alert thresholds that trigger management attention when metrics deviate from targets"]'::jsonb,
        '["Indian Startup KPI Benchmark Database with metrics by stage, sector, and business model from 200+ companies", "KPI Definition Templates ensuring consistent calculation methodology across finance and operations teams", "KPI Review Meeting Agenda Template with discussion frameworks for weekly and monthly reviews", "Investor-Ready KPI Presentation Format showing metric evolution, benchmarks, and improvement initiatives"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 27: Board Reporting Packs
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        27,
        'Board Reporting Pack Development',
        'Board reporting packs are critical communication tools between founders and investors. Well-structured board packs demonstrate operational maturity and build investor confidence, while poor reporting erodes trust and creates governance concerns.

Board Pack Structure for Indian Startups: The standard board pack follows a structured format refined by leading Indian VCs. Begin with Executive Summary (1-2 pages) covering key highlights, concerns, and decisions needed. Follow with Financial Performance (3-4 pages) including P&L summary, cash position, and variance analysis. Add Operational Metrics (2-3 pages) with business-specific KPIs and trends. Include Strategic Updates (2-3 pages) on key initiatives, competitive landscape, and market developments. End with Appendices containing detailed financials, team updates, and supporting data.

Financial Section Best Practices: Present P&L in a format familiar to Indian investors with GAAP-compliant structure showing Revenue, COGS, Gross Profit, Operating Expenses (by function), EBITDA, and Net Profit. Include budget variance analysis showing Actual vs Budget vs Last Year with percentage and absolute differences. Cash flow summary should highlight operating cash flow separately from investment and financing activities. Balance sheet summary should emphasize key items: cash position, receivables aging, payables, and debt.

Indian-Specific Board Reporting Elements: Include compliance status section covering GST filings (GSTR-1, GSTR-3B), TDS deposits and returns, advance tax payments, and ROC filings. Funding utilization summary comparing actual spend against investment thesis commitments. Related party transactions disclosure required under Companies Act if any director-connected transactions occurred.

Board Pack Timing and Distribution: Companies Act requires board meeting notice 7 days in advance with agenda. Board pack should be circulated at least 5 days before meeting for adequate review. Post-meeting minutes must be finalized within 30 days. Many institutional investors require pre-board calls with founders 2-3 days before formal meeting.

Common Board Pack Mistakes: Inconsistent metric definitions between periods causing confusion and credibility issues. Excessive length (keep to 15-20 pages maximum with appendices). Lack of forward-looking commentary beyond historical reporting. Missing competitive context that investors need to assess market position. Failure to highlight risks and mitigation strategies proactively.

Board Pack Preparation Timeline: T-15 days: Initiate financial close for reporting month. T-10 days: Complete preliminary financials and variance analysis. T-7 days: Draft narrative sections and gather departmental inputs. T-5 days: Internal review by CEO and leadership team. T-3 days: Final pack distribution to board members. T-1 day: Pre-board calls with key investors if needed.',
        '["Design board pack template with consistent structure for monthly or quarterly reporting", "Establish board pack preparation timeline with clear ownership for each section", "Build variance analysis framework explaining budget deviations with drivers and corrective actions", "Create compliance dashboard section tracking GST, TDS, ROC, and other regulatory requirements"]'::jsonb,
        '["Board Pack Template used by top-tier Indian startups with section-by-section guidance", "Financial Performance Section Template with P&L, cash flow, and balance sheet formats", "Variance Analysis Framework explaining common deviation categories and narrative approaches", "Compliance Dashboard Template covering all major Indian regulatory requirements for private companies"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 28: Monthly Closing and Reporting
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_7_id,
        28,
        'Monthly Closing and Management Reports',
        'A disciplined monthly close process ensures accurate, timely financial information for decision-making. Indian startups that achieve fast close (within 5 working days) consistently demonstrate better financial control and investor confidence.

Monthly Close Calendar for Indian Startups: Day 1-2: Transaction cut-off and preliminary bank reconciliation. Ensure all invoices, expenses, and receipts for the month are recorded. Complete payment gateway reconciliation (Razorpay, Cashfree settlements typically have 1-2 day lag). Day 3-4: Accruals and adjustments including salary accrual, vendor accruals for received but unbilled items, prepaid expense amortization, and deferred revenue recognition. Day 5-6: GST reconciliation comparing GSTR-2A with purchase records, ITC eligibility review, and output tax liability confirmation. Day 7-8: Management review and adjustment finalization. CFO or Finance Head reviews trial balance and approves adjustments. Day 9-10: Report generation and distribution.

Key Close Activities Unique to Indian Context: GST Reconciliation requires matching GSTR-2A (supplier-filed) with your purchase records. ITC claims depend on supplier compliance. Track mismatch categories: invoice not appearing in 2A, value differences, and GSTIN errors. Typical mismatch rate for Indian companies is 5-15% of ITC value requiring resolution.

TDS Compliance Integration: Month-end should include TDS deposit reconciliation (due 7th of following month). Verify all payments above threshold have appropriate TDS deduction. Track TDS certificates pending from customers (affects your tax credit). Prepare data for quarterly TDS return filing.

Payroll Close Coordination: Payroll typically processed by 25th of month with payment by 28th-30th. PF and ESI deposits due by 15th of following month (Rs 50,000 penalty for late PF deposit). Professional tax varies by state but typically due monthly or half-yearly.

Management Report Package: Monthly management reports should include three-statement financial package (P&L, Balance Sheet, Cash Flow), departmental expense analysis versus budget, key operational metrics dashboard, and cash runway projection. Distribute to leadership team by Day 10, board-level summary by Day 12-15.

Close Process Optimization: Automate bank reconciliation using feeds from major banks (HDFC, ICICI, Axis offer automated reconciliation feeds). Implement expense management tools (Fyle, Happay) for real-time expense capture eliminating month-end rushes. Use GST compliance software (ClearTax, Zoho GST) for automated reconciliation with GSTIN portal. Target close time progression: Year 1 at 15+ days, Year 2 at 10 days, Year 3+ at 5 working days or better.',
        '["Build month-end close calendar with specific tasks, owners, and deadlines for each day", "Implement GST reconciliation process comparing GSTR-2A with purchase records and tracking mismatches", "Automate bank reconciliation using feeds from your primary banks and accounting system integration", "Create management report package with standard distribution by Day 10 post month-end"]'::jsonb,
        '["Month-End Close Checklist with 50+ tasks organized by day and function", "GST Reconciliation Template tracking GSTR-2A mismatches with resolution workflow", "Bank Reconciliation Automation Guide covering major Indian banks and accounting system connections", "Management Report Template Package with P&L, Balance Sheet, Cash Flow, and KPI dashboard formats"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 8: Banking & Treasury Management (Days 29-32)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Banking & Treasury Management',
        'Master banking relationships, debt financing options including SIDBI loans, forex management for international transactions, and cash management strategies for optimal working capital.',
        8,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_8_id;

    -- Day 29: Banking Relationships
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        29,
        'Banking Relationship Management',
        'Strong banking relationships are foundational to startup financial operations. Indian startups typically maintain relationships with 3-5 banks serving different purposes, from operational accounts to term loans and forex transactions.

Bank Selection Framework for Startups: Primary Operating Bank handles day-to-day transactions, vendor payments, and salary disbursement. Choose based on branch network, digital banking capabilities, and relationship manager quality. HDFC Bank and ICICI Bank are preferred by 65% of funded Indian startups due to superior digital infrastructure. Axis Bank offers competitive startup banking packages. Kotak Mahindra Bank provides strong forex and treasury services.

Startup Banking Accounts Structure: Current Account for primary operations with typical zero-balance or Rs 10,000 minimum. Separate payroll account isolating salary payments for audit trail. Escrow account if required for investor funds or specific purposes. Fixed deposit accounts for parking surplus funds (current rates 6.5-7.5% for 1-year FDs).

SIDBI (Small Industries Development Bank of India): SIDBI offers specialized startup financing products that commercial banks often cannot match. SIDBI Startup Mitra loan ranges from Rs 25 lakh to Rs 10 crore with 100% funding of project cost possible. SIDBI Make in India Soft Loan provides Rs 10 lakh to Rs 1 crore at 8-9% interest for DPIIT-registered startups. SIDBI Venture Capital supports equity and quasi-equity investments.

SIDBI Loan Requirements: DPIIT recognition (Startup India registration) for favorable terms. Minimum 2 years of operations for most loan products. Audited financials for last 2-3 years. Project report detailing fund utilization. Promoter contribution typically 10-25% of project cost. Collateral requirements vary: CGTMSE cover available for loans up to Rs 5 crore (collateral-free).

Commercial Bank Loan Options: Working Capital Limits for funded startups typically at 20-30% of equity raised as overdraft facility. Term Loans for specific capital expenditure typically 3-7 year tenure with 9-12% interest rates. Bank Guarantees required for enterprise contracts and government tenders (margin money 10-25% of BG value).

Credit Facility Documentation: Sanctioned letter outlining terms, conditions, and covenants. Security documents including hypothecation of current assets, pledge of fixed deposits if any. Board resolution authorizing borrowing and specifying authorized signatories. Personal guarantees from promoters (common for early-stage lending). Insurance policies for assets offered as security.',
        '["Evaluate current banking relationships against operational needs and optimize bank account structure", "Explore SIDBI loan options if eligible for DPIIT-recognized startups with favorable terms", "Build relationship with dedicated relationship managers at primary banks for faster service", "Prepare comprehensive documentation package for credit facility applications"]'::jsonb,
        '["Bank Comparison Matrix evaluating HDFC, ICICI, Axis, Kotak, and SBI for startup banking needs", "SIDBI Loan Product Guide covering Startup Mitra, SMILE, and other relevant schemes", "Credit Facility Application Checklist with documentation requirements and timeline", "Banking Relationship Management Template for quarterly reviews with relationship managers"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 30: Debt Financing Options
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        30,
        'Debt Financing for Startups',
        'Debt financing has emerged as a critical tool for Indian startups, with venture debt market growing from Rs 500 crore in 2018 to Rs 4,500 crore in 2023. Understanding debt options enables strategic capital structure optimization without excessive dilution.

Venture Debt Landscape in India: Major venture debt providers include Trifecta Capital (Rs 25 lakh to Rs 50 crore), Alteria Capital (Rs 1 crore to Rs 75 crore), InnoVen Capital (Rs 1 crore to Rs 100 crore), and Stride Ventures (Rs 50 lakh to Rs 25 crore). Typical terms: 36-48 month tenure, interest rates 14-18% annualized, equity warrant coverage 10-20% of loan amount.

Venture Debt Eligibility: Minimum equity raise of Rs 2-5 crore from institutional investors. Revenue traction demonstrating business model viability. 18+ months runway post-debt to provide comfort on repayment. Clean cap table without complex legacy investor rights. Typical debt-to-equity ratio of 25-40% of last equity round.

Revenue-Based Financing (RBF): RBF has emerged as a non-dilutive option for revenue-generating startups. Providers include GetVantage, Velocity, Klub, and N+1 Capital. Loan amount typically 3-6 months of revenue (Rs 10 lakh to Rs 5 crore). Repayment as percentage of revenue (typically 5-15% of monthly revenue). Total repayment 1.3-1.8x principal over 6-18 months. Best suited for D2C brands, SaaS companies with predictable revenue.

Bank Term Loans: Traditional term loans available for startups with 2+ years of operations, audited profitability, or strong collateral. Interest rates of 9-12% significantly lower than venture debt. Tenure of 3-7 years with flexible repayment structures. Collateral typically required: property, fixed deposits, or CGTMSE coverage. Processing time of 4-8 weeks for sanctioning.

CGTMSE Coverage: Credit Guarantee Fund Trust for Micro and Small Enterprises enables collateral-free loans up to Rs 5 crore for eligible MSMEs. Guarantee coverage up to 85% of loan amount. Annual guarantee fee of 1-1.5% of outstanding amount. Available through most scheduled commercial banks. Reduces promoter personal guarantee requirements.

Working Capital Financing: Cash Credit or Overdraft based on receivables and inventory. Drawing power calculated on eligible current assets (typically 75% of receivables under 90 days, 50% of inventory). Interest charged only on utilized amount (currently 10-13%). Renewal annual with limit review based on financials.

Debt Structuring Considerations: Match debt tenure with asset life or payback period. Structure repayment to align with cash flow patterns (moratorium for initial months if needed). Negotiate covenants carefully (revenue covenants, DSCR, current ratio requirements). Ensure pre-payment flexibility for potential refinancing or early exit scenarios.',
        '["Assess debt financing options based on stage, revenue, and equity funding history", "Prepare financial projections and debt service coverage analysis for lender presentations", "Evaluate venture debt versus RBF based on revenue predictability and growth trajectory", "Negotiate key terms including covenants, prepayment rights, and warrant coverage"]'::jsonb,
        '["Venture Debt Provider Comparison covering Trifecta, Alteria, InnoVen, Stride with term sheets", "Revenue-Based Financing Calculator projecting total cost and cash flow impact", "CGTMSE Eligibility Guide with application process and documentation requirements", "Debt Term Sheet Negotiation Checklist covering key terms and common negotiating points"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 31: Forex Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        31,
        'Forex Management for Startups',
        'Foreign exchange management becomes critical as Indian startups engage in international transactions, receive foreign investment, or expand globally. RBI regulations under FEMA govern all forex transactions, requiring careful compliance.

Common Forex Scenarios for Startups: Inward remittance of equity investment from foreign investors (convertible instruments, equity shares). Export of services to foreign clients (SaaS subscriptions, IT services). Import of goods and services (cloud services, software licenses, hardware). Overseas subsidiary operations and intercompany transactions. Employee travel and foreign consultant payments.

FEMA Compliance Framework: All forex transactions must comply with Foreign Exchange Management Act, 1999. Key regulations: FEMA 20 (investment), FEMA 21 (export of goods and services), FEMA 3 (current account transactions). Authorized Dealer banks process forex transactions and report to RBI. Non-compliance penalties range from monetary fines to criminal prosecution for serious violations.

Forex Account Types: EEFC Account (Exchange Earner''s Foreign Currency) retains up to 100% of export earnings in foreign currency. RFC Account (Resident Foreign Currency) for individuals with foreign currency income. SNRR Account for foreign subsidiaries of Indian companies. Capital account transactions require specific RBI approval or automatic route compliance.

Hedging Strategies: Forward contracts lock in exchange rates for future receivables or payables (minimum USD 10,000 typically). Options provide flexibility with premium cost (more suitable for uncertain cash flows). Natural hedging matches foreign currency receivables with payables in same currency. Hedging ratio of 30-70% of expected exposure recommended for startups.

Export Receivable Management: Export proceeds must be realized within 9 months of export (12 months in some cases). Form 15CA/15CB required for outward remittances above Rs 5 lakh. SOFTEX filing for software exports through STPI or SEZ. Invoice documentation must specify payment terms and bank details.

Forex Banking Selection: Choose banks with strong forex desk and competitive rates. Compare TT buying and selling rates across banks (spreads vary 0.25-0.75% for major currencies). Swift charges of Rs 500-2,000 per transaction plus correspondent bank charges. Consider banks offering forex advisory for growing international operations.

Transfer Pricing Considerations: International transactions with related parties (subsidiaries, group companies) must be at arm''s length prices. Transfer pricing documentation required if aggregate value exceeds Rs 1 crore in a year. Transfer pricing audit triggered if documentation is inadequate. Engage transfer pricing advisor if regular intercompany transactions expected.',
        '["Identify all forex transaction types in your business and ensure FEMA compliance for each", "Set up appropriate forex accounts (EEFC if export revenue exists) with your bank", "Develop hedging policy for foreign currency exposure above threshold (suggest USD 50,000 monthly)", "Implement export receivable tracking to ensure realization within RBI-mandated timelines"]'::jsonb,
        '["FEMA Compliance Checklist for common startup forex scenarios with regulatory references", "Forex Bank Comparison covering rates, charges, and service quality for major banks", "Hedging Strategy Framework for startups with different exposure profiles", "Export Documentation Guide covering invoice format, SOFTEX, and Form 15CA/CB requirements"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 32: Cash and Treasury Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_8_id,
        32,
        'Cash and Treasury Management',
        'Effective cash management ensures startups never miss operational payments while maximizing returns on surplus funds. Indian startups have lost billions in value due to poor cash management, from unexpected cash crunches to suboptimal treasury returns.

Cash Flow Forecasting: Build 13-week rolling cash flow forecast as minimum standard. Weekly forecast for near-term (4 weeks): transaction-level detail including specific payables and receivables. Monthly forecast for medium-term (weeks 5-13): category-level projections based on patterns. Quarterly forecast for strategic planning: scenario-based projections tied to business plans.

Forecast Accuracy Improvement: Track forecast variance weekly to identify systematic errors. Common Indian startup cash flow volatility sources include: customer payment delays (average 15-30 days beyond terms), GST refund timing uncertainty (3-12 months for genuine claims), seasonal patterns in B2B and D2C businesses.

Cash Buffer Guidelines: Early-stage startups (pre-revenue): maintain 18-24 months runway. Growth-stage (post-Series A): maintain 12-18 months runway with contingency. Buffer for unexpected events: 2-3 months additional operating expenses. Covenant headroom: if debt covenants exist, maintain 20% buffer above minimums.

Surplus Fund Investment: Treasury bill investments through banks offer 6.5-7% returns with sovereign safety. Fixed deposits with scheduled commercial banks provide 6.5-7.5% with guaranteed returns. Liquid mutual funds offer 6-7% with T+1 liquidity (suitable for amounts above Rs 50 lakh). Overnight funds provide lowest risk for very short-term parking.

Investment Policy Framework: Define authorized investments by credit quality (typically AA- and above for corporate investments). Set concentration limits (maximum 25% with any single counterparty). Establish maturity limits aligned with cash requirements. Specify approval authorities (e.g., CFO up to Rs 1 crore, board above).

Working Capital Optimization: Receivables management: 2% early payment discount can accelerate collections significantly (equivalent to 36% annualized return). Payables management: negotiate extended payment terms (45-60 days versus 30-day standard) with key vendors. Inventory optimization: Just-in-time principles reduce cash locked in stock. Advance from customers: especially for custom projects and enterprise contracts.

Cash Pooling Structures: Notional pooling aggregates balances across accounts for interest calculation (available with select banks). Physical pooling automatically sweeps surplus from operating accounts to investment accounts. Zero-balance accounts for subsidiaries or departments with automatic funding from main account. Consider pooling when average monthly balance exceeds Rs 50 lakh across accounts.',
        '["Build 13-week rolling cash flow forecast with weekly update discipline", "Define and implement cash buffer policy aligned with runway and covenant requirements", "Create treasury investment policy specifying authorized instruments, limits, and approval authorities", "Implement working capital optimization initiatives targeting receivables, payables, and inventory"]'::jsonb,
        '["13-Week Cash Flow Forecast Template with automated variance tracking and scenario analysis", "Treasury Investment Policy Template covering authorized instruments and approval framework", "Working Capital Optimization Playbook with tactics for receivables, payables, and inventory", "Cash Pooling Structure Guide comparing notional and physical pooling options"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 9: Investor Financial Reporting (Days 33-36)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Investor Financial Reporting',
        'Master investor-grade financial reporting including GAAP versus IFRS considerations, due diligence preparation, data room organization, and building trust through transparent financial communication.',
        9,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_9_id;

    -- Day 33: GAAP vs IFRS Considerations
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        33,
        'GAAP vs IFRS for Indian Startups',
        'Understanding accounting standards is critical for accurate financial reporting and investor communication. Indian startups primarily follow Ind AS (Indian Accounting Standards), which are converged with IFRS but have specific carve-outs and differences.

Ind AS Applicability for Startups: Listed companies: mandatory Ind AS adoption. Unlisted companies: Ind AS required if net worth exceeds Rs 250 crore or turnover exceeds Rs 500 crore. Other unlisted companies: may follow Ind AS voluntarily or use Accounting Standards (AS). Most startups follow AS until Ind AS threshold is triggered or investor preference dictates adoption.

Key Ind AS Standards for Startups: Ind AS 115 (Revenue Recognition) replaces AS 9 with five-step model: identify contract, identify performance obligations, determine transaction price, allocate to obligations, recognize when satisfied. Critical for SaaS businesses, marketplace platforms, and multi-element arrangements.

Ind AS 116 (Leases) requires most leases to be recognized on balance sheet as right-of-use asset and lease liability. Significantly impacts companies with office leases, equipment leases, or vehicle fleets. Short-term leases (under 12 months) and low-value leases exempt.

Ind AS 109 (Financial Instruments) affects convertible instruments accounting. CCDs and CCPs issued to investors may have embedded derivatives requiring bifurcation. Fair value measurement required for certain instruments. Complex for startups with multiple funding rounds at different valuations.

Ind AS 102 (Share-based Payment) requires ESOP expense recognition in P&L at fair value. Significant impact on reported profitability for startups with large ESOP pools. Requires option valuation using Black-Scholes or similar models.

US GAAP Considerations: If targeting US investors or potential US listing, understand key US GAAP differences. Revenue recognition broadly aligned post-ASC 606 adoption. Lease accounting similar post-ASC 842 adoption. ESOP accounting has some technical differences. May require US GAAP reconciliation for serious US investors.

Accounting Policy Choices: Document accounting policies consistently across periods. Key choices include revenue recognition timing, cost capitalization versus expensing, depreciation methods and useful lives, and inventory valuation method. Changes require disclosure and, in some cases, retrospective restatement.',
        '["Determine applicable accounting framework (AS versus Ind AS) based on thresholds and investor requirements", "Review Ind AS 115 implications for revenue recognition in your business model", "Assess Ind AS 116 impact if significant operating leases exist in business", "Understand Ind AS 102 requirements for ESOP expense recognition and ensure proper accounting"]'::jsonb,
        '["Ind AS Applicability Decision Tree with threshold calculations and voluntary adoption considerations", "Revenue Recognition Guide (Ind AS 115) with examples for SaaS, marketplace, and service businesses", "Lease Accounting Impact Calculator for Ind AS 116 adoption planning", "ESOP Accounting Guide covering valuation methods and expense recognition under Ind AS 102"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 34: Financial Due Diligence Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        34,
        'Financial Due Diligence Preparation',
        'Financial due diligence is a critical phase of any fundraising or M&A transaction. Preparation should begin months before anticipated transaction to ensure smooth process and minimize value-destructive discoveries.

Due Diligence Scope Overview: Financial due diligence typically covers: historical financial analysis (3 years), quality of earnings analysis, working capital assessment, debt and debt-like items, contingent liabilities, and forecasts and projections review. Timeline typically 3-6 weeks with 2-4 professionals from diligence firm.

Quality of Earnings Analysis: Diligence will normalize EBITDA for non-recurring items, related party transactions at non-market rates, accounting policy inconsistencies, and unrecorded liabilities. Common Indian startup adjustments include: founder salary below market rate (add back to show normalized cost), one-time legal or regulatory costs, COVID-related anomalies in 2020-2021 periods.

Historical Financial Preparation: Ensure audited financials are available for last 3 years (or since incorporation if shorter). Reconcile management accounts to audited financials and document differences. Prepare monthly management accounts with consistent format. Clean up accounting errors proactively before diligence begins.

Common Due Diligence Red Flags: Revenue concentration (top 5 customers more than 50%). Related party transactions at non-arm''s length prices. Inconsistent accounting policies across periods. Unreconciled intercompany balances. Pending litigation with material exposure. Tax positions with high audit risk. Non-compliance with statutory requirements.

Working Capital Analysis: Diligence will calculate normalized working capital for transaction structuring. Working capital target typically based on 12-month average. Identify seasonal patterns affecting working capital. Prepare aging analysis for receivables and payables.

Diligence Team Coordination: Appoint internal due diligence coordinator (typically CFO or Financial Controller). Create Q&A log to track all diligence queries and responses. Establish response time targets (24-48 hours for standard queries). Brief team members who will interact with diligence team.

Virtual Data Room Preparation: Organize all documents before diligence begins (see next lesson for detailed guidance). Maintain access logs for compliance and reference. Update documents promptly as requested. Consider separate rooms for different bidder groups in competitive processes.',
        '["Conduct internal due diligence readiness assessment 3-6 months before anticipated transaction", "Prepare quality of earnings bridge identifying and quantifying all normalizing adjustments", "Clean up historical accounting issues and ensure audited financials are reconciled to management accounts", "Appoint internal due diligence coordinator and establish query response protocols"]'::jsonb,
        '["Due Diligence Readiness Checklist covering financial, tax, legal, and operational areas", "Quality of Earnings Template with common adjustment categories for Indian startups", "Historical Financial Reconciliation Template bridging audited financials to management accounts", "Due Diligence Query Response Protocol with SLA and escalation procedures"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 35: Data Room Organization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        35,
        'Investor Data Room Organization',
        'A well-organized data room accelerates fundraising and M&A processes while demonstrating operational maturity. Poor data room organization signals to investors that company may have broader organizational issues.

Data Room Platform Selection: Dedicated virtual data room (VDR) providers include Datasite (formerly Merrill Datasite), Intralinks, Firmex, and Digify. Costs range from Rs 50,000 to Rs 5 lakh per transaction depending on size and features. Google Drive or Dropbox acceptable for early-stage fundraising but lack audit trails and granular permissions. Key features: document-level permissions, view tracking, watermarking, and Q&A management.

Standard Data Room Structure: Section 1 - Corporate Documents: Certificate of Incorporation, Memorandum and Articles, board and shareholder resolutions, shareholder agreements, share capital history.

Section 2 - Financial Information: Audited financials (last 3 years), management accounts (monthly for last 2 years), financial projections and model, accounting policies document.

Section 3 - Tax and Compliance: Income tax returns and assessments, GST returns and reconciliation, TDS returns and certificates, ROC filings (annual returns, director forms).

Section 4 - Contracts and Agreements: Customer contracts (top 20 by revenue), vendor agreements (top 10 by spend), employment agreements (leadership), ESOP documentation.

Section 5 - Intellectual Property: Trademark registrations, patent filings if any, domain registrations, software licenses.

Section 6 - Legal and Litigation: Pending litigation summary, regulatory notices, material correspondence with authorities.

Section 7 - HR and Team: Organization chart, employee list with compensation summary, employment policies, POSH compliance documentation.

Section 8 - Insurance: All policy documents, claims history, coverage summary.

Indian-Specific Documentation: Include Startup India (DPIIT) recognition certificate if applicable. MSME registration (Udyam) documentation. Industry-specific licenses (FSSAI, drug license, NBFC registration, etc.). Foreign investment filings (FC-GPR, FC-TRS for existing foreign shareholders).

Data Room Maintenance: Update documents as new information becomes available. Version control with clear naming conventions (use dates, avoid "final_v2_revised"). Remove outdated documents rather than accumulating versions. Track frequently requested documents for future data rooms.',
        '["Set up virtual data room using appropriate platform for transaction size and complexity", "Organize existing documents into standard data room structure with clear indexing", "Identify and fill documentation gaps by creating missing policies, agreements, or summaries", "Implement version control and document management process for ongoing maintenance"]'::jsonb,
        '["Data Room Structure Template with section-by-section document checklist for Indian startups", "VDR Platform Comparison Matrix covering Datasite, Intralinks, Firmex with pricing", "Indian-Specific Documentation Checklist for regulatory and compliance documents", "Document Version Control Protocol ensuring consistent naming and organization"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 36: Investor Update Best Practices
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_9_id,
        36,
        'Investor Update and Communication',
        'Regular, transparent investor communication builds trust and positions founders for future fundraising success. Best-in-class founders treat investor updates as relationship-building tools, not compliance obligations.

Investor Update Cadence: Monthly updates for seed and early-stage investors who are often more hands-on. Quarterly updates for later-stage investors with established governance. Weekly updates during active fundraising rounds. Real-time updates for material events (major customer wins, key hires, pivots).

Monthly Update Structure: Opening with 3-5 key highlights or headlines (2-3 sentences each). Metrics dashboard with 5-7 KPIs showing current, prior month, and trend. Financial summary including cash position, burn rate, and runway. Product and engineering update covering releases, roadmap progress. Sales and marketing update with pipeline and conversion metrics. Team update covering key hires, departures, organization changes. Asks section where investors can help (intros, advice, opportunities). Closing with upcoming milestones and priorities.

Metrics Best Practices: Maintain consistent metric definitions across updates. Show trends (minimum 3-month history) rather than single point values. Include benchmarks where relevant (industry averages, prior targets). Address underperformance proactively with explanation and corrective actions.

Financial Communication Guidelines: Report cash position as of specific date (typically month-end). Show runway in months with clear calculation methodology. Separate one-time expenses from recurring burn. Compare actual versus budget with variance explanations.

Addressing Challenges: Be proactive about sharing bad news (founders who hide problems lose trust permanently). Frame challenges with context, impact assessment, and remediation plan. Seek advice from investors who may have relevant experience. Demonstrate learning and adaptation rather than making excuses.

Communication Channels: Email remains primary channel for formal updates. Investor portal or shared drive for detailed materials. WhatsApp groups common in Indian ecosystem for informal communication. One-on-one calls for sensitive matters or seeking specific help.

Update Distribution Logistics: Send on consistent schedule (e.g., 10th of each month for prior month). Use BCC for investor group emails (protect investor identity). Maintain distribution list accuracy as investor base evolves. Archive all updates for institutional memory.',
        '["Establish monthly investor update discipline with consistent format and timing", "Define 5-7 key metrics for investor dashboard with clear calculation methodology", "Create investor update template that balances transparency with conciseness", "Build investor communication protocol for different scenarios (routine, positive, challenging)"]'::jsonb,
        '["Monthly Investor Update Template used by successful Indian founders with customization guidance", "Investor Metrics Dashboard Template with formatting and visualization best practices", "Challenging News Communication Framework with timing and framing guidance", "Investor Relationship Management Tracker for maintaining communication across investor base"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 10: Financial Controls & Audit (Days 37-40)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Financial Controls & Audit',
        'Establish robust internal controls, prepare for statutory audit, select and work with Chartered Accountants, and build audit-ready financial processes.',
        10,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_10_id;

    -- Day 37: Internal Controls Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        37,
        'Internal Controls Framework',
        'Internal controls prevent fraud, ensure accuracy, and build investor confidence. Startups that implement controls early avoid painful remediation during due diligence and scale operations more reliably.

COSO Framework Application: The Committee of Sponsoring Organizations (COSO) framework provides comprehensive internal control structure. Five components: Control Environment (tone at top, ethics, competence), Risk Assessment (identify and analyze risks), Control Activities (policies and procedures), Information and Communication (relevant information flows), Monitoring Activities (ongoing evaluation and remediation).

Startup Control Environment: Founder commitment to integrity and accuracy sets tone. Clear policies documented and communicated. Competent personnel in financial roles. Audit committee or board finance oversight (may be investor representative).

Key Control Areas for Startups: Revenue controls include customer contract approval, order verification, billing accuracy, and revenue recognition timing. Expense controls cover purchase authorization (approval matrix by amount), vendor verification (prevent fictitious vendors), expense reimbursement review, and payment authorization.

Cash controls require dual authorization for payments above threshold (suggest Rs 25,000), bank reconciliation by non-transacting person, and fixed deposit and investment oversight. Payroll controls need hire authorization, salary change approvals, payroll review before processing, and ghost employee prevention.

Segregation of Duties: Fundamental control preventing fraud through separation of custody, authorization, and recording. Example: person who approves vendor invoices should not process payments. Challenging for small teams but essential duties to separate: check signing from accounts payable, bank reconciliation from cash handling, payroll preparation from approval.

Control Documentation: Policy documents define what controls should exist. Procedure documents describe how to execute controls. Control matrices map controls to risks and processes. Evidence retention demonstrates controls operated (signatures, logs, approvals).

Control Testing: Periodic testing verifies controls operate as designed. Walkthrough testing traces transaction through complete process. Sample testing examines population of transactions for control evidence. Exception investigation addresses failed controls promptly.

Startup-Appropriate Implementation: Controls should be proportionate to risk and company size. Focus on high-risk areas first: cash, revenue, high-value expenses. Automate where possible using approval workflows in accounting software. Scale controls as company grows rather than implementing everything at once.',
        '["Assess current control environment using COSO framework as reference", "Implement segregation of duties for key financial processes, even with small team", "Document critical controls in policy and procedure format for consistency", "Establish control testing routine with monthly or quarterly review of high-risk areas"]'::jsonb,
        '["Internal Controls Assessment Template covering COSO framework components", "Segregation of Duties Matrix for startup finance functions", "Financial Policy Template Library covering expense, payment, and revenue policies", "Control Testing Schedule with procedures for each major control area"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 38: Statutory Audit Preparation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        38,
        'Statutory Audit Preparation',
        'Statutory audit is mandatory for all companies under Companies Act, 2013. Well-prepared companies complete audits faster with fewer adjustments and build auditor confidence for future periods.

Statutory Audit Requirements: All companies (private and public) must have annual statutory audit. Appointment of auditor at first AGM, typically for 5-year term. Rotation requirements: individual auditor rotates after 5 years, audit firm after 10 years. Audit report forms part of annual return filed with ROC.

Audit Timeline Planning: Financial year end: typically March 31 for Indian companies. Books closure: within 60 days of year end. Audit completion: within 6 months of year end for AGM. AGM deadline: within 6 months of financial year end. ROC filing: within 30 days of AGM.

Audit Preparation Checklist: Pre-audit (April): complete all year-end entries, prepare trial balance, gather supporting documents. Audit kickoff (May): auditor planning meeting, information request list, access arrangement. Fieldwork (May-June): auditor on-site work, query response, adjustment discussions. Draft financials (June-July): review draft accounts, discuss disclosures, management representation. Sign-off (July-August): finalize adjustments, sign financial statements, auditor signs report.

Key Audit Areas for Startups: Revenue recognition: contracts, performance obligations, timing of recognition. Fixed assets: additions, disposals, depreciation calculation. Related party transactions: identification, disclosure, arm''s length pricing. Equity and convertible instruments: share capital changes, instrument terms, fair value.

Audit Documentation Preparation: General ledger trial balance with sub-ledger reconciliation. Bank statements and reconciliation for all accounts. Fixed asset register with additions and disposals. Receivables and payables aging with confirmation letters. Inventory count sheets and valuation workings. Tax computation and payment evidence.

Common Audit Issues: Unrecorded liabilities discovered during audit. Revenue cut-off errors at year end. Inadequate documentation for related party transactions. ESOP valuation and expense recognition issues. Prior period errors requiring restatement.

Audit Adjustments Management: Review all proposed adjustments carefully before accepting. Distinguish between errors (must correct) and judgmental differences (may discuss). Track cumulative effect of adjustments on key metrics. Document reason for each adjustment for future reference.',
        '["Create year-end closing schedule working backward from AGM deadline", "Prepare audit readiness checklist with specific document and reconciliation requirements", "Schedule audit kickoff meeting 4-6 weeks before planned fieldwork", "Establish query response process with assigned owners and target turnaround times"]'::jsonb,
        '["Statutory Audit Timeline Template with milestones from year-end to filing", "Audit Preparation Checklist organized by financial statement line item", "Auditor Information Request List covering standard documentation requirements", "Audit Adjustment Tracker with categorization and cumulative impact calculation"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 39: CA Selection and Management
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        39,
        'Chartered Accountant Selection and Management',
        'Selecting the right Chartered Accountant firm is a critical decision that affects audit quality, regulatory compliance, and often investor confidence. Understanding the CA landscape and managing the relationship effectively is essential.

CA Firm Categories in India: Big 4 firms (Deloitte, PwC, EY, KPMG) serve large listed companies and major PE-backed companies. Fees start at Rs 10-15 lakh for private company audit. Mid-tier firms (BDO, Grant Thornton, RSM, Nexia) serve Series B+ funded startups with fees of Rs 5-10 lakh. Boutique firms serve early-stage startups with fees of Rs 25,000 to Rs 2 lakh. Solo practitioners serve micro companies with fees of Rs 10,000 to Rs 50,000.

Selection Criteria for Startups: Industry experience is crucial as auditors unfamiliar with your business model will ask wrong questions and miss real issues. Technology sector expertise increasingly important for SaaS, marketplace, and fintech models. Client profile should include similar-stage startups to understand your context. Partner attention matters since smaller client may get more attention from boutique firm.

Fee Negotiation: Statutory audit fees for early-stage startups typically Rs 25,000 to Rs 1 lakh. Tax audit (if applicable) adds Rs 15,000 to Rs 50,000. GST audit (if applicable) adds Rs 15,000 to Rs 50,000. Transfer pricing certification adds Rs 50,000 to Rs 2 lakh. Bundled pricing usually provides 10-20% discount.

Engagement Letter Review: Scope of work clearly defining services included. Fee structure including base fee, hourly rates for additional work, expense reimbursement. Timeline commitments for deliverables. Limitation of liability clauses (standard but review carefully). Confidentiality provisions.

Managing the Relationship: Regular communication prevents year-end surprises. Quarterly check-ins on emerging issues. Proactive disclosure of significant transactions. Seek input on accounting treatment before implementing.

Auditor Change Considerations: Change auditor only for good reasons (quality, responsiveness, cost). New auditor will conduct more extensive first-year procedures. Transition planning required for smooth handover. ICAI ethical requirements apply to auditor resignation and appointment.

Common Friction Points: Audit fees increasing faster than scope justifies. Slow response to queries during the year. Conservative positions on accounting treatments. Qualification threats that feel disproportionate. Manage expectations upfront and address issues directly.',
        '["Evaluate current CA relationship against selection criteria and consider alternatives if warranted", "Negotiate comprehensive engagement covering audit, tax, and compliance services with bundled pricing", "Establish quarterly communication rhythm with audit partner for proactive issue identification", "Review engagement letter carefully for scope, fees, and timeline commitments"]'::jsonb,
        '["CA Firm Evaluation Matrix covering Big 4, mid-tier, boutique, and solo practitioner options", "Audit Fee Benchmark Guide with typical ranges by company stage and complexity", "Engagement Letter Review Checklist highlighting key terms to negotiate", "CA Relationship Management Calendar with quarterly and annual touchpoints"]'::jsonb,
        90,
        50,
        2,
        NOW(),
        NOW()
    );

    -- Day 40: Audit-Ready Processes
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_10_id,
        40,
        'Building Audit-Ready Financial Processes',
        'Audit-ready processes ensure smooth annual audits and build foundation for internal control attestation as company scales. Implementing these processes early prevents painful remediation later.

Documentation Standards: Every financial transaction should have documentary evidence. Invoices: supplier invoice or self-generated for sales. Payments: bank statement, payment advice, authorization evidence. Contracts: signed agreements for significant commitments. Approvals: documented authorization per policy.

Record Retention Requirements: Companies Act requires 8-year retention for accounting records. Income Tax Act requires 6-year retention from end of relevant assessment year. GST requires 6-year retention from due date of annual return. Practical recommendation: 8 years for all financial records.

Electronic Record Standards: Electronic records valid under IT Act, 2000. Maintain audit trail of electronic record creation and modification. Backup procedures ensure records are not lost. Access controls prevent unauthorized modification.

Reconciliation Discipline: Bank reconciliation: minimum monthly, ideally daily review. Accounts receivable: monthly aging review and customer statement reconciliation. Accounts payable: monthly vendor statement reconciliation. Intercompany: monthly reconciliation with group entities. Inventory: periodic physical verification (quarterly or annual minimum).

Cutoff Procedures: Revenue cutoff ensures sales recorded in correct period based on delivery or service completion. Expense cutoff ensures liabilities recorded when obligation arises. Cash cutoff matches bank transactions to correct period. Inventory cutoff aligns receipts and shipments with inventory records.

Journal Entry Controls: Supporting documentation for all manual journal entries. Reviewer different from preparer (segregation of duties). Recurring entries reviewed for continued appropriateness. Year-end entries receive heightened scrutiny.

Audit Trail Preservation: Accounting software audit trail should not be disabled. Document reason for voided or deleted transactions. Maintain log of chart of accounts changes. Preserve period-end trial balances before adjustments.

Process Documentation: Document standard operating procedures for key financial processes. Update procedures when process changes. Train new finance team members on documented procedures. Review procedures annually for relevance.',
        '["Implement documentation standards ensuring every transaction has supporting evidence", "Establish monthly reconciliation routine for bank, receivables, payables, and intercompany", "Build journal entry control process with review, approval, and supporting documentation", "Document key financial processes in standard operating procedure format"]'::jsonb,
        '["Documentation Standards Policy covering evidence requirements by transaction type", "Monthly Reconciliation Checklist with procedures and sign-off requirements", "Journal Entry Control Template with approval workflow and documentation standards", "Financial Process SOP Template for documenting key accounting processes"]'::jsonb,
        90,
        75,
        3,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 11: Payroll & Employee Finance (Days 41-43)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Payroll & Employee Finance',
        'Master Indian payroll compliance including Provident Fund (12% contribution), ESI, gratuity calculations, professional tax, and ESOP accounting for equity compensation.',
        11,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_11_id;

    -- Day 41: Payroll Compliance Framework
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        41,
        'Indian Payroll Compliance Framework',
        'Indian payroll involves multiple statutory compliance requirements. Non-compliance carries significant penalties including personal liability for directors. Understanding and systematizing these requirements is essential for every startup.

Provident Fund (PF) Compliance: Applicable to establishments with 20+ employees. Employee contribution: 12% of basic salary + DA (deducted from salary). Employer contribution: 12% of basic salary + DA (additional to CTC). Wage ceiling: Rs 15,000 per month (contributions mandatory up to this limit, voluntary above). Deposit due date: 15th of following month (Rs 50,000 penalty per day for delay). EPF return: monthly electronic challan-cum-return (ECR).

Employee State Insurance (ESI) Compliance: Applicable to establishments with 10+ employees in notified areas. Wage ceiling: Rs 21,000 per month (employees below this are covered). Employee contribution: 0.75% of wages. Employer contribution: 3.25% of wages. Deposit due date: 15th of following month. ESI return: half-yearly contribution statement.

Professional Tax: State-level tax with different rates and slabs by state. Maharashtra: up to Rs 200 per month (Rs 2,500 maximum annual). Karnataka: up to Rs 200 per month. Tamil Nadu: up to Rs 208.33 per month. Delhi: no professional tax. Deducted from employee salary and deposited to state government.

Labour Welfare Fund: State-level contribution varying by state. Typically nominal (Rs 20-50 per employee per year). Half-yearly or annual deposits depending on state.

TDS on Salary: Employer must deduct TDS based on employee declared investments and tax liability. Consider Section 80C (Rs 1.5 lakh limit), 80D (health insurance), HRA exemption, standard deduction (Rs 50,000). Deposit TDS by 7th of following month. File quarterly return (Form 24Q) by end of following month.

Gratuity Liability: Payable to employees with 5+ years of continuous service. Calculation: Last drawn salary x 15/26 x years of service. Maximum gratuity: Rs 20 lakh (enhanced from Rs 10 lakh in 2018). Liability accrues from day one, even if payment only after 5 years. Provision should be made in books for gratuity liability (actuarial valuation for larger companies).

Minimum Wages: Minimum wages vary by state and skill category. Must ensure all employees receive at least applicable minimum wage. Statutory bonus: payment of bonus to employees earning less than Rs 21,000 per month.',
        '["Audit current payroll compliance status across PF, ESI, PT, and TDS requirements", "Implement monthly compliance calendar with deposit and return filing deadlines", "Calculate and provide for gratuity liability in financial statements", "Review salary structures to ensure minimum wage compliance across all locations"]'::jsonb,
        '["Payroll Compliance Calendar with state-wise deposit and filing deadlines", "PF and ESI Registration Guide with documentation and process requirements", "Gratuity Calculation Worksheet with provision estimation methodology", "State-wise Professional Tax Rate Matrix covering major Indian states"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 42: Salary Structure Optimization
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        42,
        'Salary Structure and Tax Optimization',
        'Optimal salary structuring maximizes employee take-home pay while ensuring statutory compliance. Understanding allowance components and their tax implications enables competitive compensation packages.

Salary Components Overview: Basic Salary forms foundation for statutory calculations (PF, gratuity). Standard practice: 40-50% of CTC as basic salary. Lower basic reduces PF contribution but may affect gratuity and bonus. Dearness Allowance (DA) treated same as basic for PF purposes.

House Rent Allowance (HRA): Tax exempt to the extent of least of: actual HRA received, rent paid minus 10% of salary, or 50% of salary (metros) / 40% of salary (non-metros). Requires rent receipts for claims above Rs 1 lakh annually. Employees not paying rent cannot claim HRA exemption.

Leave Travel Allowance (LTA): Exempt for actual travel expenses for self and family. Claimable twice in a block of 4 years. Only domestic travel eligible; no food, hotel expenses. Proof of travel (tickets) required.

Special Allowances: Various allowances can be structured based on role. Children education allowance: Rs 100 per month per child (max 2 children) exempt. Hostel expenditure: Rs 300 per month per child exempt. Transport allowance: Rs 1,600 per month exempt for specified employees. Food coupons (meal vouchers): Rs 50 per meal tax-free (but GST on excess).

Reimbursement Components: Telephone and internet reimbursement against actual bills. Books and periodicals for professional development. Professional development and training expenses. Medical reimbursement (no longer separately exempt but can be part of flexi benefits).

New Tax Regime Considerations: New tax regime (optional from FY 2020-21) offers lower tax rates but removes most exemptions. No HRA, LTA, 80C benefits under new regime. Simple salary structure works better under new regime. Employees should evaluate which regime is more beneficial based on actual investments and expenses.

Sample CTC Breakup (Rs 15 lakh annual): Basic: Rs 6,00,000 (40%). HRA: Rs 3,00,000 (20%). Special Allowance: Rs 2,40,000 (16%). LTA: Rs 60,000 (4%). Employer PF: Rs 72,000 (4.8%). Employer ESI: Nil (above wage ceiling). Gratuity: Rs 28,846 (1.9%). Medical Insurance: Rs 25,000 (1.7%). Variable/Bonus: Rs 1,74,154 (11.6%).',
        '["Review current salary structures and optimize for employee tax efficiency", "Implement policy for reimbursement components with documentation requirements", "Create salary structure templates for different CTC levels with component breakdowns", "Educate employees on old versus new tax regime choice and documentation needs"]'::jsonb,
        '["Salary Structure Calculator optimizing components for different CTC levels", "Allowance and Exemption Guide with documentation requirements and limits", "Reimbursement Policy Template covering eligible expenses and claim procedures", "Old vs New Tax Regime Comparison Tool helping employees choose optimal regime"]'::jsonb,
        90,
        50,
        1,
        NOW(),
        NOW()
    );

    -- Day 43: ESOP Accounting and Compliance
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_11_id,
        43,
        'ESOP Accounting and Compliance',
        'Employee Stock Option Plans are critical for startup talent acquisition and retention. Proper ESOP accounting under Ind AS 102 and tax compliance is essential for accurate financial reporting and employee trust.

ESOP Legal Framework: Companies Act, 2013 governs ESOP implementation. Private companies must ensure ESOP plan approved by board and shareholders. ESOP pool typically 10-20% of fully diluted capital. Vesting schedule commonly 4 years with 1-year cliff.

ESOP Accounting under Ind AS 102: Fair value of options determined at grant date. Fair value expensed over vesting period. Example: 10,000 options with fair value Rs 50 each, 4-year vesting results in expense of Rs 1,25,000 per year. No cash flow impact but reduces reported profits.

Option Valuation Methods: Black-Scholes model most commonly used. Key inputs: current share price, exercise price, expected volatility, risk-free rate, expected term. Independent valuation recommended (merchant banker or valuation expert). Valuation typically costs Rs 25,000 to Rs 1 lakh depending on complexity.

Tax Treatment for Employees: Taxable event 1 (at exercise): difference between FMV at exercise and exercise price taxed as perquisite (salary income). Taxable event 2 (at sale): difference between sale price and FMV at exercise taxed as capital gains. Short-term gains if held less than 24 months (for unlisted); long-term otherwise. Employees often face cash flow challenge as tax liability arises at exercise before liquidity event.

Employer TDS Obligations: Employer must deduct TDS on perquisite value at exercise. TDS calculated at employee''s marginal tax rate. Creates cash outflow for employees equal to exercise price plus TDS. Some companies offer loans or cashless exercise to address this.

ESOP Pool Tracking: Maintain grant register with employee details, grant date, number of options, exercise price, vesting schedule. Track vesting status and forfeited options. Monitor exercised options and shares issued. Reconcile pool utilization to authorized pool.

Cap Table Integration: ESOP pool should be clearly reflected in cap table. Show granted, vested, exercised, and available options. Calculate fully diluted shareholding including ESOP pool. Investors typically require ESOP expansion from existing shareholding before investment.

ESOP Communication: Clear communication builds employee understanding and appreciation. Provide annual ESOP statements showing grant details, vesting status, and estimated value. Explain tax implications at each stage. Update employees on company valuation changes affecting option value.',
        '["Implement Ind AS 102 compliant ESOP expense recognition with proper valuation support", "Set up ESOP tracking system for grants, vesting, exercises, and forfeitures", "Calculate and provision for employer obligations including TDS at exercise", "Create employee ESOP communication including annual statements and tax guidance"]'::jsonb,
        '["ESOP Valuation Guide covering Black-Scholes methodology and input determination", "ESOP Accounting Template for Ind AS 102 expense calculation and journal entries", "ESOP Grant Register Template tracking all option grants and their status", "Employee ESOP Statement Template with vesting schedule, valuation, and tax implications"]'::jsonb,
        90,
        75,
        2,
        NOW(),
        NOW()
    );

    -- ========================================
    -- MODULE 12: Financial Technology Stack (Days 44-45)
    -- ========================================
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        'Financial Technology Stack',
        'Build modern finance infrastructure with the right accounting software, payment gateways, automation tools, and integration architecture for scalable financial operations.',
        12,
        NOW(),
        NOW()
    )
    RETURNING id INTO v_mod_12_id;

    -- Day 44: Accounting Software and Tools
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        44,
        'Accounting Software and Finance Tools',
        'Selecting the right accounting software and complementary finance tools creates foundation for scalable financial operations. Indian startups have access to excellent local solutions optimized for Indian compliance requirements.

Accounting Software Options: Tally Prime remains the most widely used accounting software in India with strong GST compliance and CA familiarity. Costs Rs 18,000-54,000 for perpetual license. Zoho Books offers cloud-native solution with excellent automation and integration. Rs 750-2,500 per month for small teams. QuickBooks India provides cloud solution with multi-currency and project accounting. Rs 800-3,000 per month. Busy is popular among traditional businesses with strong inventory management. Rs 9,000-30,000 perpetual license.

Selection Criteria for Startups: GST compliance is table stakes since all options handle basic GST. Multi-location and branch accounting if operations span multiple states. Inventory management for product businesses. Project accounting for service businesses and agencies. Bank integration for automated reconciliation. API availability for custom integrations. CA accessibility since your accountant needs to work in the system.

Expense Management Tools: Fyle offers AI-powered expense management with credit card integration. Rs 350-500 per user per month. Happay provides travel and expense platform with corporate cards. Pricing varies by features. Zoho Expense integrates with Zoho ecosystem. Rs 200-400 per user per month. These tools eliminate manual expense entry and improve policy compliance.

Payroll Software: Razorpay Payroll (formerly Opfin) offers full-stack payroll with PF, ESI integration. Rs 30-100 per employee per month. Zoho Payroll provides Indian-compliant payroll with leave management. Rs 40-80 per employee per month. greytHR offers comprehensive HRMS with payroll. Rs 25-75 per employee per month.

Invoicing and Billing: Zoho Invoice is free for basic needs with professional templates. Razorpay Invoice integrates with payment gateway. Sleek Bill offers GST-compliant invoicing. E-invoicing mandatory above Rs 5 crore turnover; ensure software supports IRN generation.

GST Compliance Tools: ClearTax offers complete GST compliance platform with return filing and reconciliation. Rs 500-2,000 per month. Zoho GST integrates with Zoho Books. Rs 300-1,000 per month. GSTN-compliant tools reduce manual effort and errors.

Integration Architecture: Design data flow between systems: CRM to invoicing to accounting to banking. Use Zapier or custom APIs for automation. Single source of truth for each data type. Regular reconciliation between systems.',
        '["Evaluate accounting software options against selection criteria and current needs", "Implement expense management tool to eliminate manual expense processing", "Select and deploy payroll software with statutory compliance automation", "Design integration architecture connecting all financial systems"]'::jsonb,
        '["Accounting Software Comparison Matrix covering Tally, Zoho Books, QuickBooks, Busy for Indian startups", "Expense Management Tool Guide comparing Fyle, Happay, Zoho Expense features and pricing", "Payroll Software Selection Checklist with compliance and integration requirements", "Finance Tech Stack Architecture Template showing data flows and integration points"]'::jsonb,
        90,
        50,
        0,
        NOW(),
        NOW()
    );

    -- Day 45: Payment Gateways and Automation
    INSERT INTO "Lesson" (id, "moduleId", day, title, "briefContent", "actionItems", resources, "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_mod_12_id,
        45,
        'Payment Gateways and Financial Automation',
        'Payment gateway selection and financial process automation are critical for scalable operations. Indian payment infrastructure has evolved significantly, offering startups sophisticated tools for collection, disbursement, and reconciliation.

Payment Gateway Options: Razorpay is the market leader with comprehensive product suite. Standard pricing: 2% for domestic cards, 3% for international, UPI at 0% (RBI mandate). Features: payment links, invoices, subscriptions, payouts, and banking. Cashfree offers competitive pricing with strong payout capabilities. Similar pricing to Razorpay with focus on disbursement. PayU provides enterprise-grade gateway with strong fraud prevention. Suitable for high-volume transactions. CCAvenue is legacy player with broad bank coverage, being gradually replaced by newer options.

Payment Gateway Selection Criteria: Transaction volume and expected growth trajectory. Domestic versus international payment mix. Subscription and recurring payment requirements. Payout and vendor disbursement needs. Integration complexity with existing systems. Settlement timeline (T+2 standard, T+1 or instant available at premium).

Reconciliation Automation: Payment gateway reconciliation: daily matching of gateway settlements with bank credits. Invoice reconciliation: matching payments to outstanding invoices. GST reconciliation: automated GSTR-2A matching. Bank reconciliation: automated feeds and rule-based matching.

Accounts Payable Automation: Vendor invoice processing: OCR-based data extraction from invoice images. Approval workflows: amount-based routing and escalation. Payment processing: batch payment file generation for bank upload. Three-way matching: PO, GRN, and invoice matching for procurement.

Accounts Receivable Automation: Invoice generation: automated invoicing from CRM or project management tools. Payment reminders: automated dunning sequences for overdue invoices. Collections dashboard: aging analysis and collector task management. Customer portal: self-service invoice access and payment.

Financial Reporting Automation: Dashboard refresh: scheduled updates for management dashboards. Report distribution: automated email delivery of key reports. Alert system: threshold-based notifications for critical metrics.

Vendor Payment Tools: RazorpayX offers business banking with automated vendor payments. API-based payments enabling programmatic disbursement. Virtual accounts for vendor-wise collection tracking. Bulk payout processing for salaries, reimbursements, and vendor payments.

Implementation Roadmap: Phase 1 (Month 1-2): Core accounting and payment gateway setup. Phase 2 (Month 3-4): Expense management and payroll automation. Phase 3 (Month 5-6): Advanced reconciliation and reporting automation. Phase 4 (Ongoing): Continuous improvement and new tool evaluation.

Security Considerations: PCI-DSS compliance for payment data handling (outsourced to gateway). Two-factor authentication for financial systems. IP whitelisting for payment APIs. Regular access review and role cleanup.',
        '["Select and implement payment gateway based on transaction profile and feature requirements", "Automate payment gateway reconciliation with daily matching to bank settlements", "Implement accounts payable workflow with invoice processing, approval, and payment automation", "Build automated financial reporting with scheduled dashboard updates and alert notifications"]'::jsonb,
        '["Payment Gateway Comparison covering Razorpay, Cashfree, PayU with pricing and feature analysis", "Reconciliation Automation Guide with implementation approach for payment, invoice, and bank reconciliation", "AP Automation Workflow Design Template with approval matrix and integration specifications", "Financial Automation Roadmap Template with phased implementation plan and resource requirements"]'::jsonb,
        90,
        75,
        1,
        NOW(),
        NOW()
    );

    RAISE NOTICE 'Modules 7-12 (Days 25-45) created successfully for P4: Finance Stack CFO-Level Mastery';

END $$;

COMMIT;
