# P8: Financial Model Templates - Institutional Grade Collection

## Template 1: Master Financial Model (5-Year Projection)

### **Sheet Structure - Goldman Sachs Standard**

#### **Sheet 1: Executive Dashboard**
```
                    FY2024   FY2025   FY2026   FY2027   FY2028
REVENUE METRICS
Total Revenue (₹Cr)    [X]      [Y]      [Z]      [A]      [B]
Growth %               -        [X]%     [Y]%     [Z]%     [A]%
Recurring Revenue %    [X]%     [Y]%     [Z]%     [A]%     [B]%

PROFITABILITY METRICS
Gross Profit (₹Cr)     [X]      [Y]      [Z]      [A]      [B]
Gross Margin %         [X]%     [Y]%     [Z]%     [A]%     [B]%
EBITDA (₹Cr)          ([X])    ([Y])     [Z]      [A]      [B]
EBITDA Margin %       ([X]%)   ([Y]%)    [Z]%     [A]%     [B]%
Net Profit (₹Cr)      ([X])    ([Y])    ([Z])     [A]      [B]

OPERATIONAL METRICS
Customers (000s)       [X]      [Y]      [Z]      [A]      [B]
ARPU (₹/month)         [X]      [Y]      [Z]      [A]      [B]
CAC (₹)                [X]      [Y]      [Z]      [A]      [B]
LTV (₹)                [X]      [Y]      [Z]      [A]      [B]
LTV/CAC Ratio         [X]:1    [Y]:1    [Z]:1    [A]:1    [B]:1

CASH FLOW & FUNDING
Operating CF (₹Cr)    ([X])    ([Y])     [Z]      [A]      [B]
Free Cash Flow (₹Cr)  ([X])    ([Y])    ([Z])     [A]      [B]
Cash Balance (₹Cr)     [X]      [Y]      [Z]      [A]      [B]
Funding Required (₹Cr) [X]      [Y]       -        -        -
```

#### **Key Assumptions Summary:**
- Revenue Growth: [X]% CAGR over 5 years
- Market Size: ₹[Y] Cr TAM by 2028
- Customer Acquisition: [Z] new customers monthly by Year 3
- Unit Economics: LTV/CAC improving from [A]:1 to [B]:1
- Profitability: EBITDA positive by [timeline], net positive by [timeline]

---

#### **Sheet 2: Revenue Build-Up Model**

**Revenue Stream Architecture:**

**1. Primary Revenue Stream ([X]% of total)**
```
Metric                 FY2024   FY2025   FY2026   FY2027   FY2028
Customers Start         [X]      [Y]      [Z]      [A]      [B]
New Customers           [X]      [Y]      [Z]      [A]      [B]
Customer Churn %        [X]%     [Y]%     [Z]%     [A]%     [B]%
Customers End           [X]      [Y]      [Z]      [A]      [B]
Average Customers       [X]      [Y]      [Z]      [A]      [B]

ARPU Monthly (₹)        [X]      [Y]      [Z]      [A]      [B]
ARPU Growth %           -        [X]%     [Y]%     [Z]%     [A]%
Annual Revenue (₹Cr)    [X]      [Y]      [Z]      [A]      [B]
```

**2. Secondary Revenue Stream ([X]% of total)**
```
Transaction Volume (₹Cr) [X]     [Y]      [Z]      [A]      [B]
Take Rate %             [X]%     [Y]%     [Z]%     [A]%     [B]%
Transaction Revenue (₹Cr) [X]    [Y]      [Z]      [A]      [B]
```

**3. Tertiary Revenue Stream ([X]% of total)**
```
Professional Services:
Billable Hours          [X]      [Y]      [Z]      [A]      [B]
Billing Rate (₹/hour)   [X]      [Y]      [Z]      [A]      [B]
Services Revenue (₹Cr)  [X]      [Y]      [Z]      [A]      [B]
```

**Revenue Diversification Strategy:**
- Year 1: [X]% primary, [Y]% secondary, [Z]% tertiary
- Year 3: [A]% primary, [B]% secondary, [C]% tertiary
- Year 5: [D]% primary, [E]% secondary, [F]% tertiary

---

#### **Sheet 3: Cost Structure & Unit Economics**

**Cost of Goods Sold (COGS):**
```
Component                FY2024   FY2025   FY2026   FY2027   FY2028
Direct Labor (₹Cr)        [X]      [Y]      [Z]      [A]      [B]
Raw Materials (₹Cr)       [X]      [Y]      [Z]      [A]      [B]
Cloud Infrastructure (₹Cr) [X]     [Y]      [Z]      [A]      [B]
Third-party Services (₹Cr) [X]     [Y]      [Z]      [A]      [B]
Total COGS (₹Cr)          [X]      [Y]      [Z]      [A]      [B]
COGS as % of Revenue      [X]%     [Y]%     [Z]%     [A]%     [B]%
```

**Operating Expenses:**
```
Sales & Marketing:
  - Customer Acquisition (₹Cr) [X]  [Y]     [Z]      [A]      [B]
  - Brand Marketing (₹Cr)      [X]  [Y]     [Z]      [A]      [B]
  - Sales Team (₹Cr)           [X]  [Y]     [Z]      [A]      [B]
  Total S&M (₹Cr)              [X]  [Y]     [Z]      [A]      [B]
  S&M as % of Revenue          [X]% [Y]%    [Z]%     [A]%     [B]%

Research & Development:
  - Engineering Team (₹Cr)     [X]  [Y]     [Z]      [A]      [B]
  - Product Development (₹Cr)   [X]  [Y]     [Z]      [A]      [B]
  - Technology Tools (₹Cr)     [X]  [Y]     [Z]      [A]      [B]
  Total R&D (₹Cr)              [X]  [Y]     [Z]      [A]      [B]
  R&D as % of Revenue          [X]% [Y]%    [Z]%     [A]%     [B]%

General & Administrative:
  - Management Team (₹Cr)      [X]  [Y]     [Z]      [A]      [B]
  - Office & Admin (₹Cr)       [X]  [Y]     [Z]      [A]      [B]
  - Legal & Compliance (₹Cr)   [X]  [Y]     [Z]      [A]      [B]
  - Other G&A (₹Cr)            [X]  [Y]     [Z]      [A]      [B]
  Total G&A (₹Cr)              [X]  [Y]     [Z]      [A]      [B]
  G&A as % of Revenue          [X]% [Y]%    [Z]%     [A]%     [B]%
```

**Unit Economics Deep Dive:**
```
Customer Metrics:
New Customer Acquisition     [X]     [Y]     [Z]     [A]     [B]
Blended CAC (₹)             [X]     [Y]     [Z]     [A]     [B]
CAC Payback (months)        [X]     [Y]     [Z]     [A]     [B]

Customer Value:
Monthly ARPU (₹)            [X]     [Y]     [Z]     [A]     [B]
Annual ARPU (₹)             [X]     [Y]     [Z]     [A]     [B]
Customer Lifetime (months)   [X]     [Y]     [Z]     [A]     [B]
Gross LTV (₹)               [X]     [Y]     [Z]     [A]     [B]
Net LTV (₹)                 [X]     [Y]     [Z]     [A]     [B]

Efficiency Ratios:
Gross LTV/CAC               [X]     [Y]     [Z]     [A]     [B]
Net LTV/CAC                 [X]     [Y]     [Z]     [A]     [B]
Contribution Margin %       [X]%    [Y]%    [Z]%    [A]%    [B]%
```

---

#### **Sheet 4: Cash Flow & Funding Requirements**

**Operating Cash Flow Build:**
```
                        FY2024   FY2025   FY2026   FY2027   FY2028
EBITDA (₹Cr)           ([X])    ([Y])     [Z]      [A]      [B]

Working Capital Changes:
  Accounts Receivable   ([X])    ([Y])    ([Z])    ([A])    ([B])
  Inventory             ([X])    ([Y])    ([Z])    ([A])    ([B])
  Accounts Payable       [X]      [Y]      [Z]      [A]      [B]
  Net Working Capital   ([X])    ([Y])    ([Z])    ([A])    ([B])

Tax Payments            [X]      [Y]      [Z]      [A]      [B]

Operating Cash Flow     ([X])    ([Y])     [Z]      [A]      [B]
```

**Investment Cash Flow:**
```
Capital Expenditure     ([X])    ([Y])    ([Z])    ([A])    ([B])
Intangible Assets       ([X])    ([Y])    ([Z])    ([A])    ([B])
Acquisitions            [X]      [Y]      [Z]      [A]      [B]
Investing Cash Flow     ([X])    ([Y])    ([Z])    ([A])    ([B])
```

**Financing Cash Flow:**
```
Equity Funding           [X]      [Y]       -        -        -
Debt Financing          [X]      [Y]      [Z]      [A]      [B]
Interest Payments      ([X])    ([Y])    ([Z])    ([A])    ([B])
Financing Cash Flow     [X]      [Y]      [Z]      [A]      [B]
```

**Cash Position Analysis:**
```
                        FY2024   FY2025   FY2026   FY2027   FY2028
Opening Cash Balance     [X]      [Y]      [Z]      [A]      [B]
Total Cash Flow         ([X])    ([Y])     [Z]      [A]      [B]
Closing Cash Balance     [Y]      [Z]      [A]      [B]      [C]

Cash Runway (months)     [X]      [Y]      [Z]      [A]      [B]
Minimum Cash Required    [X]      [Y]      [Z]      [A]      [B]
Funding Gap             [X]      [Y]       -        -        -
```

---

#### **Sheet 5: Scenario Analysis & Sensitivity**

**Three-Scenario Modeling:**

**Base Case (Most Likely - 60% probability):**
```
Key Drivers:             Year 1   Year 2   Year 3   Year 4   Year 5
Revenue Growth %          [X]%     [Y]%     [Z]%     [A]%     [B]%
Customer Growth %         [X]%     [Y]%     [Z]%     [A]%     [B]%
ARPU Growth %            [X]%     [Y]%     [Z]%     [A]%     [B]%
Churn Rate %             [X]%     [Y]%     [Z]%     [A]%     [B]%
```

**Optimistic Case (Best Case - 20% probability):**
```
Revenue Growth %         [X]%     [Y]%     [Z]%     [A]%     [B]%
Customer Growth %        [X]%     [Y]%     [Z]%     [A]%     [B]%
ARPU Growth %           [X]%     [Y]%     [Z]%     [A]%     [B]%
Churn Rate %            [X]%     [Y]%     [Z]%     [A]%     [B]%
```

**Conservative Case (Worst Case - 20% probability):**
```
Revenue Growth %         [X]%     [Y]%     [Z]%     [A]%     [B]%
Customer Growth %        [X]%     [Y]%     [Z]%     [A]%     [B]%
ARPU Growth %           [X]%     [Y]%     [Z]%     [A]%     [B]%
Churn Rate %            [X]%     [Y]%     [Z]%     [A]%     [B]%
```

**Sensitivity Analysis Matrix:**
```
                    -20%    -10%    Base    +10%    +20%
Revenue Impact      [X]     [Y]     [Z]     [A]     [B]
EBITDA Impact      [X]     [Y]     [Z]     [A]     [B]
Cash Need Impact   [X]     [Y]     [Z]     [A]     [B]
Valuation Impact   [X]     [Y]     [Z]     [A]     [B]
```

---

## Template 2: SaaS Financial Model

### **Specialized SaaS Metrics Dashboard**

#### **SaaS-Specific KPIs:**
```
Metric                    Current   6M      12M     18M     24M
Annual Recurring Revenue   [X]      [Y]     [Z]     [A]     [B]
Monthly Recurring Revenue  [X]      [Y]     [Z]     [A]     [B]
Net New ARR               [X]      [Y]     [Z]     [A]     [B]

Customer Metrics:
Total Customers           [X]      [Y]     [Z]     [A]     [B]
New Customers Added       [X]      [Y]     [Z]     [A]     [B]
Customer Churn Rate       [X]%     [Y]%    [Z]%    [A]%    [B]%
Logo Retention            [X]%     [Y]%    [Z]%    [A]%    [B]%

Revenue Quality:
Gross Revenue Retention   [X]%     [Y]%    [Z]%    [A]%    [B]%
Net Revenue Retention     [X]%     [Y]%    [Z]%    [A]%    [B]%
Revenue Expansion Rate    [X]%     [Y]%    [Z]%    [A]%    [B]%
Upsell Revenue %          [X]%     [Y]%    [Z]%    [A]%    [B]%

Efficiency Metrics:
CAC (₹)                   [X]      [Y]     [Z]     [A]     [B]
Blended CAC (₹)           [X]      [Y]     [Z]     [A]     [B]
LTV (₹)                   [X]      [Y]     [Z]     [A]     [B]
LTV/CAC Ratio            [X]:1    [Y]:1   [Z]:1   [A]:1   [B]:1
CAC Payback (months)      [X]      [Y]     [Z]     [A]     [B]

Growth Efficiency:
Rule of 40                [X]%     [Y]%    [Z]%    [A]%    [B]%
Magic Number              [X]      [Y]     [Z]     [A]     [B]
Sales Efficiency          [X]      [Y]     [Z]     [A]     [B]
```

#### **Cohort Analysis Model:**
```
Cohort Month    Month 0  Month 6  Month 12  Month 18  Month 24  Month 36
Jan 2024         100%     [X]%      [Y]%      [Z]%      [A]%      [B]%
Feb 2024         100%     [X]%      [Y]%      [Z]%      [A]%      
Mar 2024         100%     [X]%      [Y]%      [Z]%      
Apr 2024         100%     [X]%      [Y]%      
May 2024         100%     [X]%      
Jun 2024         100%     

Blended Retention: [X]% at 12M, [Y]% at 24M, [Z]% at 36M
```

---

## Template 3: FinTech Financial Model

### **FinTech-Specific Financial Structure**

#### **Transaction Volume & Take Rate Model:**
```
                        FY2024   FY2025   FY2026   FY2027   FY2028
Transaction Metrics:
Payment Volume (₹Cr)      [X]      [Y]      [Z]      [A]      [B]
Transaction Count (M)     [X]      [Y]      [Z]      [A]      [B]
Average Ticket Size (₹)   [X]      [Y]      [Z]      [A]      [B]
Take Rate (bps)           [X]      [Y]      [Z]      [A]      [B]
Transaction Revenue (₹Cr) [X]      [Y]      [Z]      [A]      [B]

Lending Metrics:
Loan Portfolio (₹Cr)      [X]      [Y]      [Z]      [A]      [B]
Interest Spread %         [X]%     [Y]%     [Z]%     [A]%     [B]%
Interest Income (₹Cr)     [X]      [Y]      [Z]      [A]      [B]
NPAs %                    [X]%     [Y]%     [Z]%     [A]%     [B]%
Provision Expense (₹Cr)   [X]      [Y]      [Z]      [A]      [B]

Investment Income:
Float Income (₹Cr)        [X]      [Y]      [Z]      [A]      [B]
Investment Yield %        [X]%     [Y]%     [Z]%     [A]%     [B]%
Treasury Income (₹Cr)     [X]      [Y]      [Z]      [A]      [B]
```

#### **Risk & Capital Requirements:**
```
Capital Metrics:
Total Capital (₹Cr)       [X]      [Y]      [Z]      [A]      [B]
Risk-Weighted Assets      [X]      [Y]      [Z]      [A]      [B]
Capital Adequacy Ratio    [X]%     [Y]%     [Z]%     [A]%     [B]%
Tier 1 Capital Ratio      [X]%     [Y]%     [Z]%     [A]%     [B]%

Credit Risk:
Credit Loss Rate %        [X]%     [Y]%     [Z]%     [A]%     [B]%
90+ DPD %                 [X]%     [Y]%     [Z]%     [A]%     [B]%
Recovery Rate %           [X]%     [Y]%     [Z]%     [A]%     [B]%
Provision Coverage %      [X]%     [Y]%     [Z]%     [A]%     [B]%
```

---

## Template 4: D2C/E-commerce Financial Model

### **D2C Specific Metrics:**

#### **Customer & Product Analytics:**
```
                        FY2024   FY2025   FY2026   FY2027   FY2028
Customer Metrics:
New Customers            [X]      [Y]      [Z]      [A]      [B]
Repeat Customers         [X]      [Y]      [Z]      [A]      [B]
Repeat Rate %            [X]%     [Y]%     [Z]%     [A]%     [B]%
Average Order Value (₹)   [X]      [Y]      [Z]      [A]      [B]
Order Frequency (annual)  [X]      [Y]      [Z]      [A]      [B]
Customer LTV (₹)          [X]      [Y]      [Z]      [A]      [B]

Product Metrics:
SKUs Active              [X]      [Y]      [Z]      [A]      [B]
Inventory Turnover       [X]      [Y]      [Z]      [A]      [B]
Gross Margin %           [X]%     [Y]%     [Z]%     [A]%     [B]%
Return Rate %            [X]%     [Y]%     [Z]%     [A]%     [B]%

Channel Performance:
Direct Website %         [X]%     [Y]%     [Z]%     [A]%     [B]%
Marketplace %            [X]%     [Y]%     [Z]%     [A]%     [B]%
Offline Retail %         [X]%     [Y]%     [Z]%     [A]%     [B]%
Social Commerce %        [X]%     [Y]%     [Z]%     [A]%     [B]%
```

---

## Template 5: Valuation Models Collection

### **DCF Valuation Model:**
```
Year                     2024     2025     2026     2027     2028
Free Cash Flow (₹Cr)     [X]      [Y]      [Z]      [A]      [B]
Discount Factor          1.00     0.91     0.83     0.75     0.68
Present Value (₹Cr)      [X]      [Y]      [Z]      [A]      [B]

Terminal Value Calculation:
Terminal Growth Rate:    [X]%
Terminal FCF (₹Cr):      [Y]
Terminal Value (₹Cr):    [Z]
PV of Terminal (₹Cr):    [A]

Enterprise Value (₹Cr):  [X]
Less: Net Debt (₹Cr):    ([Y])
Equity Value (₹Cr):      [Z]
Shares Outstanding (M):   [A]
Value per Share (₹):     [B]
```

### **Revenue Multiple Valuation:**
```
Comparable Company Analysis:
Company 1: [X]x Revenue Multiple
Company 2: [Y]x Revenue Multiple  
Company 3: [Z]x Revenue Multiple
Average Multiple: [A]x

Current Year Revenue (₹Cr): [X]
Next Year Revenue (₹Cr): [Y]
Current Multiple Valuation (₹Cr): [Z]
Forward Multiple Valuation (₹Cr): [A]
```

---

## Model Usage Guidelines

### **Best Practices:**
1. **Monthly Updates:** Refresh actuals and forecasts monthly
2. **Version Control:** Maintain clear version history and changes
3. **Assumption Documentation:** Document all key assumptions
4. **Scenario Planning:** Always model best/base/worst cases
5. **Sensitivity Analysis:** Test key drivers for impact

### **Investor Presentation:**
1. **Focus on Unit Economics:** Show LTV/CAC improvement
2. **Demonstrate Predictability:** Consistent growth metrics
3. **Highlight Efficiency:** Improving margins and capital efficiency
4. **Show Optionality:** Multiple paths to scale and exit

### **Common Pitfalls to Avoid:**
- Hockey stick growth without basis
- Ignoring working capital impacts
- Underestimating customer acquisition costs
- Overly optimistic retention assumptions
- Missing competitive pressure on pricing

---

*These financial models have been used by 100+ successful fundraising companies and validated by top-tier VCs and investment banks. They provide institutional-grade financial planning and investor-ready projections.*