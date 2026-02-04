-- THE INDIAN STARTUP - P16: HR & Team Building Mastery - Enhanced Content
-- Migration: 20260204_016_p16_hr_team_enhanced.sql
-- Purpose: Enhanced P16 with 500-800 word briefContent, 4 actionItems, 4 resources per lesson
-- India-specific data: EPF (12%), ESI (0.75%+3.25%), POSH Act, ESOP taxation, gratuity, labor law thresholds

BEGIN;

-- Update P16 product with enhanced description
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'P16',
    'HR & Team Building Mastery',
    'Complete HR infrastructure mastery for Indian startups covering hiring strategy, compensation design, ESOP structuring with tax optimization, EPF/ESI/Professional Tax compliance, POSH Act requirements, performance management systems, employee engagement, and HR technology implementation. Navigate India labor laws confidently while building world-class teams.',
    5999,
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
    "updatedAt" = NOW();

-- ============================================================================
-- ENHANCED LESSON UPDATES WITH 500-800 WORD BRIEFCONTENT
-- Pattern: UPDATE with WHERE clause on title matching within P16 product
-- ============================================================================

-- Day 1: Hiring Strategy for Startups (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Building a successful startup in India begins with assembling the right team, yet hiring remains one of the most challenging aspects of entrepreneurship. Studies indicate that 63% of Indian startups cite team-related issues as a primary factor in their struggles, making strategic hiring a critical competency for founders. Understanding the unique dynamics of startup hiring in the Indian context is essential for building a high-performing organization.

Startup hiring differs fundamentally from corporate recruitment. Early-stage startups typically cannot compete on compensation alone, requiring a compelling vision, equity participation, and growth opportunities to attract talent. The Indian talent market presents unique characteristics: a large pool of technically skilled graduates but significant variation in practical capabilities; strong preference for established brands among risk-averse candidates; regional salary variations of 30-50% between metros and tier-2 cities; and increasing importance of remote work flexibility post-pandemic.

The founding team composition sets the trajectory for your startup. Complementary skills matter more than similar backgrounds. A technical founder benefits from a business-oriented co-founder. Diversity in thinking styles, functional expertise, and network access strengthens the team. Research shows that founding teams with prior working relationships have higher success rates due to established trust and communication patterns.

Developing a hiring philosophy provides the framework for all recruitment decisions. Culture-first hiring prioritizes alignment with company values and working style, then assesses skills. Skills-first hiring prioritizes technical capabilities, then evaluates cultural fit. Most successful startups blend both approaches, with non-negotiable culture criteria and minimum skill thresholds. Your philosophy should be explicit, documented, and consistently applied.

Organization design at different stages requires thoughtful planning. Pre-product-market-fit startups (typically under 10 people) need generalists who can wear multiple hats. Post-PMF scaling (10-50) requires beginning specialization with clear role definitions. Growth stage (50-200) demands professional management layers and structured processes. Plan your org structure 18 months ahead to anticipate hiring needs and avoid reactive recruitment.

The critical first ten hires deserve exceptional attention. These individuals shape your culture, set performance standards, and often become future leaders. Common early hires for Indian startups include: technical lead/CTO-level engineer, full-stack developers, product manager, sales lead (especially for B2B), operations manager, and finance/compliance person. Prioritize based on your specific business model and immediate needs.

Hiring budget planning involves more than salary costs. Factor in recruitment costs (job postings, recruiter fees averaging 8-15% of annual salary, employee referral bonuses), onboarding costs (equipment, training time, productivity ramp), and statutory costs (12% employer PF contribution, 3.25% ESI for applicable employees, gratuity provisioning). Total employee cost typically exceeds CTC by 15-25%.

Building your employer brand starts before you actively recruit. Maintain active presence on LinkedIn showcasing team culture and achievements. Encourage employees to share their experiences. Participate in startup community events. A strong employer brand reduces time-to-hire and improves candidate quality. Indian candidates increasingly research companies on Glassdoor, AmbitionBox, and LinkedIn before applying.',
    "actionItems" = '[
        {"title": "Document your hiring philosophy", "description": "Write a 1-page hiring philosophy covering culture vs skills priority, diversity commitment, risk tolerance for unconventional candidates, and non-negotiable criteria"},
        {"title": "Create 18-month organization chart", "description": "Map current team structure and planned additions for next 18 months including reporting lines, team sizes, and key role requirements"},
        {"title": "Identify top 5 critical hires", "description": "Prioritize your most important hires with job requirements, ideal candidate profile, compensation range, and timeline for each role"},
        {"title": "Calculate true hiring costs", "description": "Build a spreadsheet calculating total cost per hire including salary, statutory contributions (PF 12%, ESI if applicable), recruitment costs, equipment, and onboarding"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Startup Hiring Playbook - YC Library", "url": "https://www.ycombinator.com/library/", "type": "guide"},
        {"title": "India Salary Benchmarks - AmbitionBox", "url": "https://www.ambitionbox.com/salaries", "type": "data"},
        {"title": "EPFO Employer Guidelines", "url": "https://www.epfindia.gov.in/site_en/For_Employers.php", "type": "government"},
        {"title": "Org Design for Startups - First Round Review", "url": "https://review.firstround.com/", "type": "article"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'Hiring Strategy for Startups';

-- Day 16: Salary Benchmarking in India (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Compensation benchmarking in India requires navigating a complex landscape of regional variations, industry differences, and rapidly evolving market rates. Effective benchmarking ensures you attract quality talent while maintaining financial sustainability. Understanding Indian compensation dynamics is essential for making competitive yet prudent offers.

India salary data sources vary in reliability and coverage. Glassdoor and AmbitionBox provide crowd-sourced data useful for general ranges but with self-reporting biases. LinkedIn Salary Insights offers verified data for premium subscribers. Specialized surveys from Aon, Mercer, and Willis Towers Watson provide comprehensive data but at significant cost (Rs 2-10 lakhs annually). Startup-specific surveys from platforms like Cutshort, HasJob, and angel.co focus on the ecosystem. For early-stage startups, combining multiple free sources often suffices.

Regional salary variations in India are substantial. Bangalore commands the highest salaries for tech roles, followed by Hyderabad, Delhi NCR, Mumbai, and Pune. A senior software engineer might command Rs 30-45 lakhs in Bangalore but Rs 22-35 lakhs in Chennai or Kolkata for equivalent experience. Tier-2 cities like Jaipur, Indore, and Kochi offer 25-40% lower costs with improving talent pools. Remote work has partially compressed these differences but regional arbitrage remains significant.

Experience-level compensation bands in Indian startups typically follow patterns. Entry-level engineers (0-2 years): Rs 4-12 lakhs depending on college tier and skills. Mid-level (3-6 years): Rs 12-30 lakhs with wide variation based on specialization. Senior (7-12 years): Rs 25-50 lakhs. Staff/Principal (12+ years): Rs 45-80 lakhs or more. Management roles command 20-40% premiums over individual contributor equivalents.

Developing your compensation philosophy involves several decisions. What percentile do you target - 50th (median), 60th, or 75th of market? Lower percentiles require stronger equity and growth propositions. How do you balance cash versus equity? Early-stage startups often offer 20-30% below market cash compensated by meaningful equity. How transparent is compensation internally? Full transparency is trending but requires robust frameworks.

Creating salary bands provides structure for consistent decision-making. Define levels clearly (Engineer I, II, III, Senior, Staff, Principal). Set bands with minimum, midpoint, and maximum for each level. Typical band width is 20-30% allowing growth within level. Document criteria for level transitions. Review bands annually against market data.

The CTC (Cost to Company) structure in India typically includes basic salary (40-50% of CTC, basis for PF and gratuity calculations), HRA (40-50% of basic for metro cities, 30-40% for non-metros), special allowances, and variable pay. Structuring CTC optimally balances tax efficiency for employees with compliance requirements. For example, lower basic reduces PF outflow but affects gratuity calculations.

Total rewards extend beyond cash compensation. Factor in ESOPs (discussed in detail in upcoming lessons), health insurance (family floater policies averaging Rs 5,000-15,000 per employee annually), learning allowances, remote work support, meal benefits, and other perquisites. Quantify total rewards value when presenting offers to help candidates compare fairly with higher-cash offers from larger companies.

Compensation review cycles in Indian startups typically occur annually, though high-growth companies may do semi-annual reviews. Time reviews to account for increment cycles at competitors (typically January-April). Budget 8-15% of payroll for annual increments, distributed based on performance. Address market corrections separately from performance raises to maintain integrity of both.',
    "actionItems" = '[
        {"title": "Research salary benchmarks for key roles", "description": "Using 3+ sources (Glassdoor, AmbitionBox, LinkedIn), compile salary ranges for your 5 most critical roles by experience level and location"},
        {"title": "Define compensation percentile target", "description": "Decide and document your target market percentile (50th, 60th, 75th) with rationale based on your funding stage, brand strength, and equity proposition"},
        {"title": "Create salary band structure", "description": "Design salary bands for all levels in your organization with minimum, midpoint, maximum, and clear criteria for band placement and progression"},
        {"title": "Build CTC structure template", "description": "Create optimized CTC breakdown template balancing employee tax efficiency with statutory compliance including basic, HRA, special allowances, and variable components"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Glassdoor India Salary Data", "url": "https://www.glassdoor.co.in/Salaries/", "type": "data"},
        {"title": "AmbitionBox Salary Insights", "url": "https://www.ambitionbox.com/salaries", "type": "data"},
        {"title": "Aon India Salary Survey", "url": "https://www.aon.com/india/", "type": "report"},
        {"title": "Income Tax Salary Structuring Guide", "url": "https://www.incometax.gov.in/", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'Salary Benchmarking in India';

-- Day 17: ESOP Design Fundamentals (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Employee Stock Ownership Plans (ESOPs) are powerful tools for attracting and retaining talent in Indian startups, allowing employees to participate in the company value creation. Well-designed ESOPs align employee incentives with company success while managing dilution concerns. Understanding ESOP mechanics is crucial for both founders and HR leaders.

The ESOP pool represents shares reserved for employee grants, typically ranging from 10-20% of fully diluted equity. Early-stage startups often start with 10-12% pools, expanding with funding rounds. VCs generally expect ESOP pools to be established or topped up pre-investment, meaning existing shareholders bear dilution. Pool size should accommodate 3-4 years of grants based on hiring plans.

Vesting schedules determine when employees gain ownership of granted options. The standard structure is 4-year vesting with 1-year cliff: no options vest in year one, then 25% vests at the 1-year anniversary, and remaining options vest monthly or quarterly over years 2-4. Some companies use 3-year vesting for competitive advantage. The cliff protects against very early departures while monthly vesting rewards ongoing contribution.

Grant guidelines establish how much equity different roles and levels receive. Common frameworks include: founding team members (1-5% for key early hires), senior leadership (0.5-2%), senior individual contributors (0.1-0.5%), mid-level employees (0.05-0.2%), and junior employees (0.01-0.1%). Ranges depend on stage - early employees receive more equity for risk taken. Document guidelines to ensure consistency and fairness.

Exercise price is the amount employees pay to convert options into shares. In India, exercise price must be at least fair market value (FMV) determined by registered valuer for unlisted companies. Many startups set exercise price at latest valuation or slight discount. Lower exercise prices increase employee benefit but may have tax implications. Strike price decisions affect both employee value proposition and company tax treatment.

Option agreements should clearly document: number of options granted, vesting schedule, exercise price, exercise window (period to exercise after vesting), expiration date, treatment on termination (typically 30-90 days to exercise vested options), and any acceleration provisions. Use standard templates reviewed by legal counsel familiar with Indian startup ESOPs.

ESOP communication is often undervalued. Many Indian employees, especially from non-startup backgrounds, struggle to value equity appropriately. Create educational materials explaining: how options work, potential value scenarios at different exit valuations, vesting mechanics, and tax implications. Provide equity value calculators and conduct annual equity education sessions.

Acceleration provisions specify situations where vesting speeds up. Single-trigger acceleration vests some or all options upon acquisition. Double-trigger requires both acquisition AND termination/demotion. Full acceleration for all employees can complicate acquisitions; consider acceleration only for senior leaders or partial acceleration. Good leaver versus bad leaver provisions address termination scenarios.

Refresher grants keep long-tenured employees engaged after initial grants fully vest. Plan for 2-4 year refresh cycles granting additional options based on performance and level. Without refreshers, equity incentive diminishes over time as employees have nothing left to vest. Budget refreshers in your ESOP pool planning.',
    "actionItems" = '[
        {"title": "Determine ESOP pool size", "description": "Calculate required ESOP pool based on 4-year hiring plan, grant guidelines by level, and expected refresh grants. Target 10-15% for early-stage startups"},
        {"title": "Design vesting schedule", "description": "Document your vesting structure including cliff period, vesting frequency (monthly/quarterly), and total vesting duration with rationale for choices"},
        {"title": "Create grant guidelines by level", "description": "Build comprehensive grant guidelines covering all roles and levels with ranges based on stage of joining, market data, and dilution tolerance"},
        {"title": "Prepare equity education materials", "description": "Develop employee-friendly materials explaining option mechanics, potential value scenarios, vesting, and tax implications with worked examples"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Index Ventures ESOP Guide", "url": "https://www.indexventures.com/optionplan/", "type": "guide"},
        {"title": "Carta ESOP Calculator", "url": "https://carta.com/equity-calculator/", "type": "tool"},
        {"title": "Companies Act 2013 - ESOP Provisions", "url": "https://www.mca.gov.in/", "type": "government"},
        {"title": "SEBI ESOP Guidelines", "url": "https://www.sebi.gov.in/", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'ESOP Design Fundamentals';

-- Day 18: ESOP Tax Implications (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'ESOP taxation in India is complex, with tax events occurring at multiple stages of the option lifecycle. Understanding these implications is essential for both employers designing plans and employees making exercise decisions. Proper tax planning can significantly impact the net value employees realize from their equity.

The ESOP lifecycle has four potential tax events: grant, vesting, exercise, and sale. In India, the primary tax events are exercise and sale, though recent provisions have modified timing for startup employees. At grant, when options are awarded, there is generally no tax implication as no economic benefit has transferred. At vesting, when options become exercisable, there is also typically no immediate tax - this differs from RSUs where vesting triggers taxation.

At exercise, when employees pay the exercise price to acquire shares, perquisite taxation applies. The perquisite value equals fair market value (FMV) at exercise minus exercise price paid. This is taxed as salary income at the employee marginal tax rate, potentially up to 30% plus surcharge and cess. For example, if FMV is Rs 1,000 and exercise price is Rs 100, the Rs 900 perquisite adds to taxable salary.

Section 80-IAC provides relief for eligible startups. For employees of DPIIT-recognized startups, ESOP perquisite taxation is deferred until the earliest of: 5 years from exercise; sale of shares; or cessation of employment. This addresses the cash flow problem where employees owed tax before any liquidity event. However, the startup must be DPIIT-recognized and meet eligibility criteria including turnover limits and incorporation date requirements.

At sale, capital gains tax applies on the difference between sale price and FMV at exercise (which was the cost basis for tax purposes). Short-term capital gains (shares held less than 24 months for unlisted companies) are taxed at the individual marginal rate. Long-term capital gains (held 24+ months) are taxed at 20% with indexation benefit. For listed company shares acquired through ESOP, different rates apply (15% STCG, 10% LTCG above Rs 1 lakh).

Employer TDS obligations require attention. When employees exercise options, the employer must deduct TDS on the perquisite value as part of salary. For startups eligible under Section 80-IAC, TDS is deferred but must be deducted when any of the trigger events occurs. Maintain careful records of grants, exercises, and employee status to ensure compliance.

Employee decision-making should balance tax efficiency with risk management. Exercising early when valuations are lower reduces perquisite tax but requires paying exercise price and taking company risk. Delaying exercise preserves optionality but may result in higher tax on larger gains. For startup employees, Section 80-IAC deferral reduces urgency but the eventual tax liability remains.

83(b) equivalent planning is not available in India as in the US, but strategic exercise timing achieves similar results. Advise employees to consider exercise timing based on: current FMV versus expected future growth, personal liquidity, tax bracket, and company liquidity event timeline. Financial planning conversations should be standard for employees with significant ESOP grants.

Reporting requirements include Form 12BA for perquisite reporting in salary TDS returns. Maintain ESOP registers as required under Companies Act. Provide employees Form 16 reflecting ESOP perquisites. Annual information returns may require ESOP transaction disclosure. Consult with tax advisors to ensure complete compliance.',
    "actionItems" = '[
        {"title": "Understand Section 80-IAC eligibility", "description": "Verify if your startup qualifies for DPIIT recognition and Section 80-IAC ESOP tax benefits including incorporation date, turnover limits, and innovation criteria"},
        {"title": "Create ESOP tax guide for employees", "description": "Develop clear documentation explaining tax events at exercise and sale, Section 80-IAC benefits if applicable, and worked examples with different scenarios"},
        {"title": "Set up TDS compliance processes", "description": "Establish processes for tracking ESOP exercises, calculating perquisite values, deducting appropriate TDS, and reporting in Form 12BA"},
        {"title": "Plan exercise timing workshops", "description": "Design workshop content helping employees evaluate optimal exercise timing considering FMV trends, personal tax situation, and liquidity expectations"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Income Tax Act - ESOP Provisions", "url": "https://www.incometax.gov.in/", "type": "government"},
        {"title": "Section 80-IAC Startup Benefits", "url": "https://www.startupindia.gov.in/", "type": "government"},
        {"title": "CBDT ESOP Taxation Circulars", "url": "https://incometaxindia.gov.in/Pages/communications/circulars.aspx", "type": "government"},
        {"title": "Startup ESOP Taxation Guide - Economic Times", "url": "https://economictimes.indiatimes.com/", "type": "article"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'ESOP Tax Implications';

-- Day 21: PF & ESI Compliance (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Employees Provident Fund (EPF) and Employees State Insurance (ESI) are mandatory social security schemes for Indian employers. Understanding eligibility thresholds, contribution rates, and compliance requirements is essential for startups to avoid penalties while optimizing costs. These statutory benefits significantly impact total employee cost and require systematic administration.

EPF applicability is determined by establishment size. Any establishment with 20 or more employees must register with EPFO within one month of reaching the threshold. Once registered, coverage continues even if employee count falls below 20. Employees earning up to Rs 15,000 per month basic + DA are mandatorily covered; those earning above can be excluded or voluntarily enrolled. Most startups choose to cover all employees regardless of salary for equity and retention purposes.

EPF contribution rates total 24% of basic wages plus dearness allowance. The employer contributes 12%: 3.67% to EPF account (employee retirement), 8.33% to EPS (Employees Pension Scheme, capped at Rs 15,000 basic), and 0.50% to EDLI (life insurance). The employee contributes 12% entirely to EPF. Additionally, employers pay 0.50% administration charges and 0.50% EDLI admin charges on total wages. Total employer liability is approximately 13% of basic wages.

The Rs 15,000 wage ceiling creates structuring considerations. PF is mandatory only on basic up to Rs 15,000 for new employees earning more. However, for employees enrolled before the ceiling increase, existing contribution levels may apply. Many startups contribute on actual basic (not just Rs 15,000) as an employee benefit, but this increases employer cost. Document your policy clearly.

ESI applicability has different thresholds. Establishments with 10 or more employees in notified areas must register if any employee earns up to Rs 21,000 per month gross wages. ESI provides medical, disability, maternity, and unemployment benefits. Once registered, employers cannot de-register even if employee count falls. Coverage is mandatory for employees earning up to Rs 21,000; higher earners are excluded.

ESI contribution rates are employer 3.25% and employee 0.75% of gross wages, totaling 4%. The employee contribution is relatively modest compared to EPF. ESI benefits include medical care for employee and family at ESI hospitals/dispensaries, sickness benefit (70% of wages during certified illness), maternity benefit (100% wages for 26 weeks), and disablement/dependent benefits.

Registration and filing requirements demand systematic attention. EPF registration is done online through the Unified Portal. Monthly ECR (Electronic Challan cum Return) filing is required by 15th of following month. ESI registration through ESIC portal requires 10+ employees in covered areas. Monthly contributions due by 15th with half-yearly returns. Both require Aadhaar linking for employees. Late payment attracts 12% annual interest and potential prosecution.

Startup-specific considerations affect compliance strategy. New startups often delay registration until reaching thresholds, which is permissible but requires tracking. Remote/distributed teams may trigger ESI in multiple states if employees are located in notified areas. Contractor versus employee classification affects coverage - misclassification exposes significant liability. Internship and consultant arrangements should be carefully structured.

Common compliance failures include: late registration, incorrect wage base calculations, delayed monthly payments, failure to update employee exits promptly, and not enrolling all eligible employees. EPFO and ESIC conduct inspections and can impose penalties including imprisonment for persistent defaulters. Engage experienced payroll partners or compliance consultants to ensure accuracy.',
    "actionItems" = '[
        {"title": "Determine EPF and ESI applicability", "description": "Assess current employee count, salary levels, and locations against EPF (20+ employees) and ESI (10+ with employees under Rs 21,000) thresholds"},
        {"title": "Complete registrations if required", "description": "Register on EPFO Unified Portal and ESIC portal if thresholds are met, gathering required documents including PAN, incorporation certificate, and bank details"},
        {"title": "Set up monthly contribution calendar", "description": "Create compliance calendar with ECR filing dates (15th monthly), ESI payment dates, and half-yearly return deadlines with owner assignments"},
        {"title": "Calculate statutory cost impact", "description": "Build spreadsheet calculating EPF (12% + admin) and ESI (3.25%) costs for current workforce and projected hires to budget accurately"}
    ]'::jsonb,
    "resources" = '[
        {"title": "EPFO Unified Portal", "url": "https://unifiedportal.epfindia.gov.in/", "type": "government"},
        {"title": "ESIC Employer Portal", "url": "https://www.esic.in/", "type": "government"},
        {"title": "EPF and Miscellaneous Provisions Act 1952", "url": "https://www.epfindia.gov.in/site_docs/PDFs/Downloads_PDFs/EPFAct1952.pdf", "type": "government"},
        {"title": "ESI Act 1948 and Rules", "url": "https://www.esic.in/web/portal/act-regulations", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'PF & ESI Compliance';

-- Day 22: Gratuity & Statutory Bonus (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Gratuity and statutory bonus are significant employer liabilities in India, requiring proper provisioning and compliance. Gratuity rewards long-tenured employees upon separation, while statutory bonus shares company profits with eligible workers. Understanding calculation methodologies and compliance requirements protects against unexpected liabilities.

Gratuity under the Payment of Gratuity Act 1972 applies to establishments with 10 or more employees. Once applicable, the Act continues to apply even if employee count falls below 10. Employees become eligible after completing 5 years of continuous service (4 years 240 days counted as 5 years per Supreme Court ruling). Gratuity is payable upon resignation, retirement, death, or disablement. Maximum gratuity is capped at Rs 20 lakhs per the 2018 amendment.

Gratuity calculation uses the formula: (Last drawn basic + DA) multiplied by 15 multiplied by completed years of service divided by 26. For example, an employee with Rs 50,000 basic completing 10 years receives: (50,000 x 15 x 10) / 26 = Rs 2,88,462. The divisor of 26 (working days per month) makes the effective rate about 57.7% of monthly basic per year of service. For employees not covered under the Act, companies can have more generous policies.

Gratuity provisioning requires systematic accounting. Most companies create gratuity provisions based on actuarial valuations conducted annually. Actuarial calculation considers current salaries, expected salary growth, employee age and tenure distribution, expected attrition, and discount rates. AS-15 (revised) and Ind-AS 19 require defined benefit accounting for gratuity. Engage certified actuaries for accurate provisioning.

Gratuity funding options include pay-as-you-go (funded from operations when liability arises), gratuity trust (irrevocable trust with tax benefits under Section 36(1)(v)), or gratuity insurance (LIC and private insurers offer group gratuity policies). Gratuity trusts require minimum 8-10 employees for LIC approval and involve setup and ongoing compliance costs. Insurance policies transfer investment risk to insurers with premiums based on actuarial projections.

Statutory bonus under the Payment of Bonus Act 1965 applies to establishments with 20+ employees and employees earning up to Rs 21,000 per month. Minimum bonus is 8.33% of earned wages (or Rs 100, whichever is higher). Maximum bonus is 20% of earned wages. Allocable surplus from profits determines actual bonus between minimum and maximum. Bonus is calculated on basic + DA up to Rs 7,000 per month wage ceiling.

Bonus calculation involves several steps. First, determine gross profits per Section 4 (computed differently from accounting profit). Second, make prior charges deductions (depreciation, development rebate, direct taxes). Third, compute available surplus. Fourth, calculate allocable surplus (67% of available surplus for non-banking companies). Fifth, set-on and set-off adjustments from previous years. Finally, distribute within 8.33-20% range based on allocable surplus.

Bonus payment timeline requires payment within 8 months of accounting year close. For most companies following April-March year, bonus is due by November 30. Failure to pay attracts penalties including imprisonment up to 6 months and fines. Many companies pay bonus during Diwali as custom, well before the statutory deadline.

Professional tax varies by state and is not a central statute. Different states have different thresholds and rates. Maharashtra charges Rs 200 per month for salaries above Rs 10,000. Karnataka charges Rs 200 per month above Rs 15,000. Employers must register in each state where employees work, deduct from salaries, and remit monthly. Maximum professional tax is Rs 2,500 per year per the Constitution limit.',
    "actionItems" = '[
        {"title": "Calculate current gratuity liability", "description": "List all employees with 4+ years tenure, calculate gratuity using statutory formula, and determine total provisioning required for balance sheet"},
        {"title": "Evaluate gratuity funding options", "description": "Compare pay-as-you-go versus gratuity trust versus insurance policies for your situation considering employee count, cash flow, and tax efficiency"},
        {"title": "Determine bonus applicability and calculate", "description": "Verify if Payment of Bonus Act applies (20+ employees), identify eligible employees (under Rs 21,000), and calculate minimum 8.33% bonus provision"},
        {"title": "Set up professional tax compliance", "description": "Identify states where employees are located, research applicable rates and thresholds, register as employer, and set up monthly deduction and remittance"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Payment of Gratuity Act 1972", "url": "https://labour.gov.in/sites/default/files/ThePaymentofGratuityAct1972.pdf", "type": "government"},
        {"title": "Payment of Bonus Act 1965", "url": "https://labour.gov.in/sites/default/files/ThePaymentofBonusAct1965.pdf", "type": "government"},
        {"title": "LIC Gratuity Scheme", "url": "https://licindia.in/group-schemes", "type": "insurance"},
        {"title": "State Professional Tax Rates Compilation", "url": "https://www.incometax.gov.in/", "type": "reference"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'Gratuity & Statutory Bonus';

-- Day 32: POSH Compliance (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'The Prevention of Sexual Harassment (POSH) Act 2013 mandates comprehensive workplace protections against sexual harassment. Compliance is mandatory for all organizations with 10 or more employees, requiring formation of Internal Complaints Committees, policy documentation, and regular training. Beyond legal compliance, effective POSH implementation creates safer, more inclusive workplaces.

Sexual harassment under the Act includes unwelcome physical contact, sexual advances, requests for sexual favors, sexually colored remarks, showing pornography, and any other unwelcome physical, verbal, or non-verbal conduct of sexual nature. The Act explicitly covers quid pro quo harassment (employment benefits conditioned on sexual compliance) and hostile work environment (conduct creating intimidating or offensive atmosphere).

The Internal Complaints Committee (ICC) must be constituted by every organization with 10+ employees. ICC composition requires: Presiding Officer who must be a senior woman employee (mandatory), minimum two members from employees committed to women causes or with legal/social work experience, and one external member from NGO or person familiar with sexual harassment issues. At least half of ICC members must be women. ICC members serve maximum 3-year terms.

ICC procedures are quasi-judicial. Complaints must be filed within 3 months of incident (extendable by 3 months for valid reasons). ICC must complete inquiry within 90 days. Both parties can present witnesses and evidence. Principles of natural justice apply - respondent has right to be heard. ICC submits recommendations within 10 days of completing inquiry. Employer must act on recommendations within 60 days. Appeals lie with appellate authority within 90 days.

Employer obligations extend beyond ICC formation. Display POSH policy and ICC details at conspicuous places in workplace. Organize awareness programs and orientation for ICC members. Provide safe working environment including security staff and time-based safety measures. Assist complainant in filing criminal complaint if requested. Ensure no retaliation against complainant. File annual report to District Officer by January 31 each year.

The annual report must contain: number of complaints received, number disposed of, number pending for more than 90 days, number of workshops conducted, and nature of action taken. Even nil reports must be filed if no complaints were received. Non-filing of annual reports attracts penalties including fines up to Rs 50,000 and potential cancellation of business license for repeat offenses.

Training requirements are often underestimated. ICC members should receive detailed training on legal provisions, inquiry procedures, documentation, and sensitivity. All employees should receive awareness training explaining what constitutes harassment, how to report, complaint procedures, and anti-retaliation protections. Conduct training at onboarding and annually thereafter. Document training attendance for compliance records.

Remote work creates new POSH considerations. Harassment can occur through video calls, messaging platforms, emails, or social media. Your policy should explicitly cover digital harassment. ICC has jurisdiction over incidents occurring during work from home. Evidence preservation for digital harassment requires screenshot protocols and platform log requests.

Practical implementation involves several steps. Draft comprehensive POSH policy aligned with Act requirements. Form ICC with proper composition and formal notification. Train ICC members on procedures. Conduct organization-wide awareness sessions. Establish confidential complaint mechanisms (email, hotline). Create documentation templates for complaints, inquiries, and recommendations. Set up annual report filing calendar.',
    "actionItems" = '[
        {"title": "Form Internal Complaints Committee", "description": "Identify senior woman employee as Presiding Officer, nominate 2+ internal members and 1 external member, ensure 50%+ women, issue formal constitution notification"},
        {"title": "Draft comprehensive POSH policy", "description": "Create detailed policy covering definitions, examples, complaint procedures, ICC details, inquiry process, confidentiality, and anti-retaliation provisions"},
        {"title": "Schedule POSH training programs", "description": "Plan ICC member training (detailed legal and procedural) and organization-wide awareness sessions. Set up recurring annual training calendar"},
        {"title": "Establish complaint mechanism", "description": "Create confidential complaint channels including dedicated email, physical drop box if applicable, and clear escalation to ICC with documentation protocols"}
    ]'::jsonb,
    "resources" = '[
        {"title": "POSH Act 2013 Full Text", "url": "https://wcd.nic.in/act/sexual-harassment-women-workplace-prevention-prohibition-and-redressal-act-2013", "type": "government"},
        {"title": "POSH Rules 2013", "url": "https://wcd.nic.in/", "type": "government"},
        {"title": "Ministry of Women and Child Development POSH Resources", "url": "https://wcd.nic.in/", "type": "government"},
        {"title": "POSH Compliance Handbook - NASSCOM", "url": "https://nasscom.in/", "type": "guide"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'POSH Compliance';

-- Day 26: OKR Implementation (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Objectives and Key Results (OKRs) provide a goal-setting framework that aligns individual contributions with company strategy. Popularized by Intel and Google, OKRs help startups maintain focus and accountability during rapid growth. Effective OKR implementation transforms how teams prioritize work and measure success.

OKR fundamentals distinguish Objectives from Key Results. Objectives are qualitative, inspirational statements of what you want to achieve - they should be memorable and motivating. Key Results are quantitative metrics proving whether the objective was achieved - they must be measurable with clear success criteria. Each objective typically has 2-5 key results. The combination creates both direction (what) and measurement (how we know).

OKR anatomy follows specific patterns. Good objectives are: ambitious yet achievable, qualitative and inspirational, time-bound (usually quarterly), action-oriented with verbs. Examples include "Become the preferred HR platform for Indian startups" or "Build a world-class engineering culture." Good key results are: specific and measurable, have clear numerical targets, are outcome-focused (not activities), and are genuinely indicative of objective achievement.

OKR hierarchy cascades from company to team to individual. Company OKRs reflect strategic priorities for the quarter - typically 3-5 objectives. Team OKRs show how each team contributes to company objectives. Individual OKRs connect personal work to team goals. Not every level needs OKRs for everything - focus on priorities. Alignment happens through conversation, not mechanical cascade.

OKR scoring typically uses 0-1 scale where 0.7-0.8 is considered success for stretch goals. Score of 1.0 suggests the goal was not ambitious enough. Scores below 0.4 indicate fundamental problems - wrong goal, poor execution, or changed circumstances. Google popularized the concept that consistently hitting 100% means you are not stretching enough. However, some companies prefer 0-100% scoring aligned with target achievement.

OKR cadence for most startups involves quarterly cycles. Annual OKRs may complement quarterly ones for longer-term strategic goals. Monthly check-ins track progress and identify blockers. Weekly team discussions review key result progress. End-of-quarter scoring and reflection happens in final week. New quarter OKRs are set in first week based on learnings and evolving priorities.

Common OKR mistakes to avoid include: setting too many OKRs (dilutes focus - maximum 3-5 objectives), confusing key results with tasks (outputs versus outcomes), making OKRs identical to job descriptions (should be stretch goals), lacking alignment across levels, not updating when circumstances change, using OKRs punitively for performance evaluation, and skipping the reflection and learning process.

OKRs in Indian startup context require adaptation. Rapid pivots may require mid-quarter OKR adjustments - build flexibility into your process. Team unfamiliarity with goal-setting frameworks requires more training and coaching. Cultural tendency to avoid failing at committed targets may need reframing around stretch goals. Remote and distributed teams need more frequent check-ins and clearer documentation.

OKR tools range from simple (Google Sheets, Notion) to dedicated platforms (Lattice, 15Five, Ally.io, Perdoo). Start simple to learn the methodology before investing in tools. Key features to evaluate: cascade visualization, progress tracking, check-in workflows, analytics, and integrations with communication tools. Most startups under 50 employees do fine with spreadsheets.',
    "actionItems" = '[
        {"title": "Define company-level OKRs", "description": "Draft 3-5 company objectives for next quarter with 2-4 measurable key results each. Ensure they reflect strategic priorities and are genuinely ambitious"},
        {"title": "Cascade to team OKRs", "description": "Work with team leads to develop team OKRs that clearly connect to company objectives while reflecting team-specific contributions and capabilities"},
        {"title": "Set up OKR review cadence", "description": "Establish weekly team check-ins, monthly company reviews, and quarterly scoring and reflection sessions with calendar invites and clear agendas"},
        {"title": "Train team on OKR methodology", "description": "Conduct training session covering OKR fundamentals, good versus bad examples, scoring approach, and your specific implementation process"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Measure What Matters by John Doerr", "url": "https://www.whatmatters.com/", "type": "book"},
        {"title": "Google re:Work OKR Guide", "url": "https://rework.withgoogle.com/guides/set-goals-with-okrs/", "type": "guide"},
        {"title": "OKR Examples Database", "url": "https://www.whatmatters.com/get-examples", "type": "templates"},
        {"title": "Lattice OKR Platform", "url": "https://lattice.com/okrs", "type": "tool"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'OKR Implementation';

-- Day 36: Employee Engagement (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Employee engagement directly impacts productivity, retention, and company culture. Engaged employees are emotionally committed to their organization, going beyond basic job requirements to contribute discretionary effort. In the competitive Indian talent market, building high engagement is a strategic imperative for startups seeking to retain talent against deep-pocketed competitors.

Employee Net Promoter Score (eNPS) provides a simple engagement metric. The single question asks employees how likely they are to recommend the company as a place to work on a 0-10 scale. Promoters (9-10) minus Detractors (0-6) as a percentage yields eNPS. Scores range from -100 to +100. Scores above 0 are acceptable, above 30 are good, and above 50 are excellent. eNPS works as a trend indicator and early warning system rather than comprehensive engagement measure.

Comprehensive engagement surveys measure multiple dimensions: job satisfaction, relationship with manager, career development, compensation perception, work-life balance, alignment with company mission, psychological safety, and resource adequacy. Standard frameworks like Gallup Q12 provide validated questions enabling benchmarking. Conduct comprehensive surveys annually or semi-annually, with pulse surveys quarterly.

Survey administration best practices ensure quality data. Guarantee anonymity - use third-party tools if needed for credibility. Require minimum team sizes (5-7) for manager-level reporting to protect anonymity. Achieve high response rates (80%+) through communication and leadership emphasis. Keep surveys short (15-20 minutes maximum). Send reminders without being pushy. Share results transparently.

Turning insights into action differentiates high-performing organizations. Analyze results by team, tenure, level, and demographics to identify patterns. Prioritize 2-3 focus areas rather than trying to fix everything. Create action plans with specific initiatives, owners, and timelines. Communicate both results and planned actions to build trust. Follow up on commitments - nothing destroys engagement faster than ignored feedback.

Engagement drivers in Indian startups often include: learning and growth opportunities (especially important for younger workforce), recognition and appreciation, autonomy and ownership, connection to company mission, manager relationship quality, and fair compensation. Work-life balance has become increasingly important post-pandemic. Remote work flexibility is now a baseline expectation in many roles.

Engagement rituals build culture and connection. All-hands meetings (weekly or biweekly) share company updates and celebrate wins. Town halls provide Q&A opportunities with leadership. Team offsites (quarterly) build relationships outside work context. Celebration of personal milestones (birthdays, work anniversaries) shows individual appreciation. Founder coffee chats maintain connection as company scales.

Manager impact on engagement is disproportionate - the saying "people leave managers, not companies" reflects research. Train managers on coaching conversations, feedback delivery, career development discussions, and recognition. Hold managers accountable for team engagement scores. Provide tools and time for one-on-ones. Some engagement variance across teams is normal, but persistent gaps indicate manager development needs.

Remote and hybrid engagement requires intentional effort. Virtual social events, online recognition programs, digital collaboration tools, and periodic in-person gatherings maintain connection. Over-communicate in remote settings - information gaps breed disengagement. Ensure remote employees have equal voice in meetings. Watch for isolation indicators and check in proactively.',
    "actionItems" = '[
        {"title": "Implement eNPS tracking", "description": "Set up quarterly eNPS survey using simple tool (Typeform, Google Forms). Establish baseline, set improvement targets, and create trend tracking dashboard"},
        {"title": "Design comprehensive engagement survey", "description": "Create annual engagement survey covering key dimensions. Plan administration timeline, communication strategy, and results analysis approach"},
        {"title": "Create engagement improvement plan", "description": "Based on current feedback or anticipated gaps, develop 2-3 priority initiatives with specific actions, owners, success metrics, and timelines"},
        {"title": "Establish engagement rituals", "description": "Design regular engagement activities including all-hands meetings, recognition programs, team events, and informal connection opportunities with calendar and budget"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Gallup Q12 Employee Engagement", "url": "https://www.gallup.com/q12/", "type": "research"},
        {"title": "Culture Amp Engagement Platform", "url": "https://www.cultureamp.com/", "type": "tool"},
        {"title": "15Five Employee Engagement", "url": "https://www.15five.com/", "type": "tool"},
        {"title": "First Round Review - Culture Articles", "url": "https://review.firstround.com/", "type": "articles"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'Employee Engagement';

-- Day 41: HRIS Selection & Implementation (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Human Resource Information Systems (HRIS) centralize employee data and automate HR processes, becoming essential as startups scale beyond 30-50 employees. Selecting the right HRIS involves evaluating features against current needs and growth trajectory. Successful implementation requires careful planning, data migration, and change management.

HRIS core modules typically include employee database (personal info, employment details, documents), time and attendance tracking, leave management, payroll integration or processing, performance management, recruitment/ATS, and reporting/analytics. Advanced features include learning management, succession planning, compensation management, and employee self-service portals. Most startups need core modules initially with ability to add advanced features.

Indian HRIS market options span global and local vendors. Global platforms include BambooHR (user-friendly, SMB-focused, limited India compliance), Workday (enterprise-grade, expensive, full-featured), and SAP SuccessFactors (comprehensive, complex implementation). India-focused platforms include Keka (strong India compliance, good UX, growing feature set), Zoho People (affordable, integrates with Zoho ecosystem), Darwinbox (enterprise features, India-focused), and greytHR (strong payroll, compliance focus, SMB-oriented).

Evaluation criteria should include: India statutory compliance (PF, ESI, Professional Tax, TDS calculations), user experience for both HR and employees, mobile app quality, integration capabilities with existing tools, implementation support and timeline, pricing model (per employee per month typically Rs 50-150 for core features), customer support quality, data security certifications, and scalability for your growth plans.

Selection process recommendations: Start with requirements documentation listing must-have versus nice-to-have features. Shortlist 3-4 vendors based on initial research. Request demos focused on your specific use cases. Check references with similar-sized companies in India. Negotiate pricing and contract terms. Pilot with limited group if possible. Plan for 2-4 month implementation timeline.

Implementation phases follow structured approach. Phase 1 (Discovery): Document current processes, identify gaps, define success metrics, and assign project team. Phase 2 (Configuration): Set up organization structure, configure modules, customize workflows, and define approval hierarchies. Phase 3 (Data Migration): Clean existing data, map to new system fields, perform test migrations, and validate accuracy. Phase 4 (Training): Train HR team thoroughly, create employee guides, and conduct orientation sessions. Phase 5 (Go-Live): Launch with monitoring, address issues quickly, and gather feedback.

Data migration challenges are common. Employee data often exists in multiple spreadsheets with inconsistencies. Historical records may be incomplete or inaccurate. Statutory data (PF numbers, UAN, ESI IPs) must be exact. Plan significant time for data cleaning before migration. Validate migrated data thoroughly with spot checks and reports comparison.

Change management ensures adoption. Communicate benefits clearly to employees and managers. Address concerns about self-service expectations. Provide sufficient training - most implementation issues stem from inadequate training. Identify champions in each team to support peers. Plan for initial productivity dip during transition. Monitor adoption metrics and address resistance proactively.

Integration considerations link HRIS with other systems. Payroll integration is critical if using separate payroll provider. Accounting software integration streamlines salary posting. Communication tools (Slack, Teams) enable notifications. ATS integration creates seamless recruit-to-hire flow. SSO integration simplifies access. Document all integration requirements during evaluation.',
    "actionItems" = '[
        {"title": "Document HRIS requirements", "description": "Create comprehensive requirements list covering core HR, payroll, compliance, reporting, and integration needs with must-have versus nice-to-have prioritization"},
        {"title": "Evaluate 3-4 HRIS vendors", "description": "Shortlist vendors based on requirements fit, request demos, check India compliance capabilities, and gather pricing for comparison"},
        {"title": "Plan implementation approach", "description": "Develop implementation project plan with phases, timeline, resource requirements, data migration strategy, and success metrics"},
        {"title": "Prepare change management plan", "description": "Design communication strategy, training curriculum, champion identification, and adoption tracking to ensure successful HRIS rollout"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Keka HR Platform", "url": "https://www.keka.com/", "type": "tool"},
        {"title": "Zoho People", "url": "https://www.zoho.com/people/", "type": "tool"},
        {"title": "Darwinbox HRMS", "url": "https://darwinbox.com/", "type": "tool"},
        {"title": "greytHR", "url": "https://www.greythr.com/", "type": "tool"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P16'
) AND title = 'HRIS Selection & Implementation';

COMMIT;
