-- THE INDIAN STARTUP - P15: Carbon Credits & Sustainability - Enhanced Content
-- Migration: 20260204_015_p15_carbon_credits_enhanced.sql
-- Purpose: Enhanced P15 with 500-800 word briefContent, 4 actionItems, 4 resources per lesson
-- India-specific data: BEE PAT scheme, SEBI BRSR, ICM regulations, IEX REC trading, MNRE subsidies

BEGIN;

-- Update P15 product with enhanced description
INSERT INTO "Product" (id, code, title, description, price, "isBundle", "estimatedDays", "createdAt", "updatedAt")
VALUES (
    gen_random_uuid()::text,
    'P15',
    'Carbon Credits & Sustainability Mastery',
    'Master carbon credits and sustainability with India-specific expertise covering GHG Protocol accounting, Verra VCS and Gold Standard certifications, Indian Carbon Market (ICM) regulations, BEE PAT scheme compliance, SEBI BRSR framework, green finance instruments, REC trading on IEX/PXIL, MNRE subsidies, and Net Zero strategy development. Build a profitable carbon business in India''s rapidly growing climate economy.',
    9999,
    false,
    60,
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
-- Pattern: UPDATE with WHERE clause on title matching within P15 product
-- ============================================================================

-- Day 1: Climate Science Fundamentals (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Greenhouse gases (GHGs) are the foundation of climate science and carbon markets. Understanding their properties is essential for anyone entering the carbon credits business. The six major GHGs covered under the Kyoto Protocol are: Carbon Dioxide (CO2) comprising 76% of global emissions with a 100-year atmospheric lifespan; Methane (CH4) at 16% of emissions with a 12-year lifespan but 80x the warming potential of CO2 over 20 years; Nitrous Oxide (N2O) at 6% with 114-year lifespan and 298x warming potential; and F-gases (HFCs, PFCs, SF6, NF3) at 2% but with lifespans of thousands of years and warming potentials up to 23,000x CO2.

Global Warming Potential (GWP) standardizes all gases to CO2 equivalent (CO2e), enabling comparison and trading. Current atmospheric CO2 concentration stands at 420 ppm versus pre-industrial levels of 280 ppm - a 50% increase driving unprecedented warming. The planet has already warmed 1.1 degrees Celsius above pre-industrial levels, with impacts visible across India: erratic monsoons, increasing cyclone intensity, Himalayan glacier retreat, and rising sea levels threatening coastal cities.

India-specific climate impacts are severe. The country loses an estimated 5.4% of GDP annually to climate-related events. Heat waves killed over 24,000 people between 1992-2015. Agricultural productivity faces 4-9% decline per degree of warming. Mumbai, Chennai, and Kolkata face significant flood risks from sea level rise. The Hindu Kush Himalayan glaciers providing water to 240 million Indians are retreating rapidly.

The IPCC Sixth Assessment Report (AR6) confirms limiting warming to 1.5 degrees Celsius requires 45% emission reduction by 2030 and net zero by 2050 globally. India committed to net zero by 2070 at COP26, recognizing its development needs while acknowledging climate urgency. This creates a massive market opportunity - India needs an estimated $10 trillion in climate investment through 2070.

Carbon markets emerge from this scientific foundation. When you calculate a company''s carbon footprint, you''re measuring their contribution to atmospheric GHG concentrations. When you develop a carbon credit project, you''re quantifying avoided or removed emissions in CO2e terms. Understanding climate science credibly positions you to advise clients and develop projects.',
    "actionItems" = '[
        {"title": "Study GHG properties and GWP values", "description": "Create a reference sheet with all six Kyoto Protocol gases, their sources, atmospheric lifetimes, and GWP values for 20-year and 100-year horizons"},
        {"title": "Review IPCC AR6 Summary for Policymakers", "description": "Download and study the 40-page SPM document focusing on observed changes, future projections, and mitigation pathways"},
        {"title": "Analyze India climate vulnerability data", "description": "Research state-wise climate vulnerability indices from MoEFCC and identify high-risk regions and sectors"},
        {"title": "Practice CO2e conversions", "description": "Calculate CO2e for sample scenarios: 100 kg methane emissions, 50 kg N2O from fertilizers, 10 kg HFC-134a refrigerant leak"}
    ]'::jsonb,
    "resources" = '[
        {"title": "IPCC AR6 Working Group Reports", "url": "https://www.ipcc.ch/assessment-report/ar6/", "type": "report"},
        {"title": "India State Action Plans on Climate Change", "url": "https://moef.gov.in/en/division/environment-divisions/climate-changecc-2/state-action-plan-on-climate-change/", "type": "government"},
        {"title": "GHG Protocol GWP Values Reference", "url": "https://ghgprotocol.org/calculation-tools", "type": "tool"},
        {"title": "India Climate Vulnerability Assessment - CEEW", "url": "https://www.ceew.in/publications/mapping-climate-risks-india", "type": "research"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'Climate Science Fundamentals';

-- Day 2: India's NDCs and Net Zero 2070 (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'India''s climate commitments under the Paris Agreement create both obligations and opportunities for carbon market participants. The Nationally Determined Contributions (NDCs) updated in August 2022 set ambitious targets: reduce emission intensity of GDP by 45% by 2030 from 2005 levels (up from original 33-35%); achieve 50% cumulative electric power installed capacity from non-fossil fuel sources by 2030 (up from 40%); and create additional carbon sink of 2.5-3 billion tonnes CO2 equivalent through forest and tree cover.

Understanding the distinction between emission intensity and absolute emissions is crucial. India''s NDC targets emission intensity - emissions per unit of GDP - not absolute emissions. This allows continued economic growth while improving efficiency. India''s current emission intensity is approximately 0.26 kg CO2e per rupee of GDP, down from 0.37 in 2005. The 45% reduction target requires reaching approximately 0.20 kg CO2e per rupee by 2030.

Prime Minister Modi announced India''s Net Zero 2070 target at COP26 Glasgow, making India the last major economy to set a net zero date. While later than Western targets (2050), this reflects India''s development priorities and historical responsibility arguments. India is the world''s third-largest emitter (2.9 billion tonnes CO2e annually) but has among the lowest per capita emissions at 1.9 tonnes versus 15.5 tonnes for USA and 7.6 for China.

Eight National Missions under the National Action Plan on Climate Change drive implementation. The National Solar Mission targets 280 GW solar by 2030 - currently at 70+ GW. The National Mission for Enhanced Energy Efficiency covers the PAT scheme discussed later. The Green India Mission targets 5 million hectares of forest cover addition. Each mission creates carbon credit opportunities.

State-level implementation varies significantly. Gujarat, Karnataka, Maharashtra, and Rajasthan lead in renewable energy deployment. Northeastern states have forest carbon potential. Industrial states like Tamil Nadu and Odisha face CCTS compliance requirements. Understanding state-wise opportunities helps target your carbon business development.

The LiFE (Lifestyle for Environment) initiative launched at COP26 promotes sustainable consumption. While primarily behavioral, it signals government focus on demand-side interventions and creates opportunities for carbon credit programs targeting household and community-level emissions reductions.

India''s NDC implementation requires estimated annual investment of $170 billion through 2030. Carbon finance, green bonds, and climate funds will provide significant portions. This creates a substantial market for carbon professionals who can help channel finance to eligible projects and verify emission reductions.',
    "actionItems" = '[
        {"title": "Download and analyze India NDC document", "description": "Study the full updated NDC submission from August 2022 including sector-wise targets, policies, and implementation mechanisms"},
        {"title": "Calculate emission intensity trends", "description": "Using GDP and emissions data from 2005-2023, chart India emission intensity trajectory and required 2030 pathway"},
        {"title": "Map National Missions to carbon opportunities", "description": "For each of the 8 National Missions, identify specific carbon credit project types and methodologies that could apply"},
        {"title": "Research state climate action plans", "description": "Download SAPCCs for 5 major states and identify priority sectors and potential carbon projects in each"}
    ]'::jsonb,
    "resources" = '[
        {"title": "India Updated NDC 2022 Submission", "url": "https://unfccc.int/NDCREG", "type": "government"},
        {"title": "National Action Plan on Climate Change", "url": "https://dst.gov.in/national-action-plan-climate-change", "type": "government"},
        {"title": "India GHG Emissions Profile - Climate Watch", "url": "https://www.climatewatchdata.org/countries/IND", "type": "data"},
        {"title": "State Action Plans on Climate Change Repository", "url": "https://moef.gov.in/en/division/environment-divisions/climate-changecc-2/state-action-plan-on-climate-change/", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'India''s NDCs and Net Zero 2070';

-- Day 3: Global Carbon Markets Overview (Enhanced)
UPDATE "Lesson" SET
    "briefContent" = 'Carbon markets are mechanisms for trading greenhouse gas emission allowances or credits, creating financial incentives for emission reductions. Understanding the global carbon market landscape is essential before diving into India-specific opportunities. Two distinct market types exist: compliance markets (regulated cap-and-trade systems) and voluntary carbon markets (VCM).

Compliance markets are government-mandated systems where regulated entities must hold allowances equal to their emissions. The European Union Emissions Trading System (EU ETS) is the largest, covering 10,000+ installations accounting for 40% of EU emissions. Carbon prices reached Euro 100/tonne in 2023. China launched its national ETS in 2021, now the world''s largest by coverage (4 billion tonnes annually) though prices remain low at $8-10/tonne. Other compliance markets operate in California, South Korea, New Zealand, and increasingly across jurisdictions.

The Voluntary Carbon Market allows companies and individuals to voluntarily purchase carbon credits to offset emissions. Global VCM transaction volumes reached $2 billion in 2021 and are projected to grow to $10-50 billion by 2030. Unlike compliance markets with standardized allowances, VCM features diverse project types with varying quality and pricing. Nature-based solutions (forestry, land use) trade at $5-20 per tonne while technology-based removals (direct air capture) command $200-1,000+ per tonne.

Credit types differ fundamentally. Avoidance/reduction credits represent emissions prevented from occurring - renewable energy displacing fossil fuels, forest protection avoiding deforestation, efficient cookstoves replacing traditional chulhas. Removal credits represent CO2 captured from atmosphere - afforestation/reforestation, soil carbon sequestration, direct air capture, enhanced weathering. Removal credits command premiums as they address existing atmospheric CO2 rather than just slowing additions.

Major registries maintain credit standards and track ownership. Verra (Verified Carbon Standard - VCS) is the largest with 1,900+ registered projects and 1+ billion credits issued. Gold Standard emphasizes sustainable development co-benefits with ~2,500 projects. American Carbon Registry (ACR) and Climate Action Reserve (CAR) focus on North American projects. Each registry has approved methodologies, validation/verification requirements, and quality standards.

India''s position in global carbon markets is significant. Indian projects have generated 300+ million carbon credits historically, primarily in renewable energy and energy efficiency. However, market dynamics are shifting. The Clean Development Mechanism (CDM) under Kyoto Protocol issued most historical Indian credits but has wound down. VCM demand increasingly favors removal projects and high-quality nature-based solutions over renewable energy. Indian project developers must adapt to these preferences while the domestic Indian Carbon Market emerges.',
    "actionItems" = '[
        {"title": "Map global carbon market ecosystem", "description": "Create a comprehensive diagram showing compliance markets (EU ETS, China ETS, others), VCM registries, and interconnections"},
        {"title": "Analyze credit price trends by type", "description": "Research and chart 5-year price trends for: EU allowances, VCS nature-based, VCS renewable energy, Gold Standard, removal credits"},
        {"title": "Study registry market shares", "description": "Calculate credit issuance volumes and market shares for Verra, Gold Standard, ACR, and CAR over past 3 years"},
        {"title": "Assess India historical credit issuance", "description": "Research CDM and VCM credits issued from Indian projects by type, volume, and current status"}
    ]'::jsonb,
    "resources" = '[
        {"title": "State of the Voluntary Carbon Markets Report", "url": "https://www.ecosystemmarketplace.com/carbon-markets/", "type": "report"},
        {"title": "Verra Registry and Project Database", "url": "https://registry.verra.org/", "type": "registry"},
        {"title": "Gold Standard Impact Registry", "url": "https://registry.goldstandard.org/", "type": "registry"},
        {"title": "World Bank Carbon Pricing Dashboard", "url": "https://carbonpricingdashboard.worldbank.org/", "type": "data"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'Global Carbon Markets Overview';

-- Day 4: India Carbon Credit Trading Scheme (CCTS) - Enhanced with ICM regulations
UPDATE "Lesson" SET
    "briefContent" = 'The Indian Carbon Market (ICM) represents India''s most significant climate policy development, establishing the country''s first compliance carbon market through the Carbon Credit Trading Scheme (CCTS). Notified in June 2023 under the Energy Conservation (Amendment) Act 2022, CCTS creates mandatory emission reduction obligations for designated consumers and enables carbon credit trading to meet these targets.

CCTS operates under the Bureau of Energy Efficiency (BEE) as the administrator, with the Ministry of Power providing oversight. The scheme builds on India''s decade-long experience with the Perform, Achieve and Trade (PAT) scheme, which successfully reduced industrial energy consumption by 92 million tonnes of oil equivalent across seven cycles. CCTS expands this framework to cover greenhouse gas emissions directly rather than just energy efficiency.

Initially, CCTS covers energy-intensive industries: thermal power plants (25 MW and above), iron and steel (30,000 TPA crude steel), cement (30,000 TPA clinker), petroleum refineries (1 MTPA), aluminium (30,000 TPA), chlor-alkali (50,000 TPA caustic soda), pulp and paper (30,000 TPA), and petrochemicals (100,000 TPA). Additional sectors will be notified progressively. Approximately 1,000+ industrial units fall under initial coverage.

The compliance mechanism works through Carbon Credit Certificates (CCCs). BEE sets emission intensity targets for each designated consumer based on sector benchmarks. Facilities exceeding targets earn CCCs; those failing must purchase CCCs from surplus facilities or face penalties. One CCC equals one tonne CO2 equivalent reduced. Trading occurs on designated power exchanges - Indian Energy Exchange (IEX) and Power Exchange India Limited (PXIL).

Timeline for CCTS implementation spans 2023-2026. The 2023-2025 period serves as a transition phase with voluntary participation and market development. Mandatory compliance begins from FY 2026-27. Initial focus is on Scope 1 emissions; Scope 2 coverage may follow. The government has indicated prices may initially be supported through floor prices to ensure market viability.

The non-compliance market segment under CCTS allows registered voluntary offset projects to generate tradeable carbon credits. This creates opportunities for project developers outside the designated consumer categories. Eligible project types include renewable energy, forestry, waste management, and energy efficiency in non-covered sectors. Registration and verification procedures are being developed with potential linkage to international standards.

For carbon market professionals, CCTS creates immediate opportunities. Designated consumers need help calculating baselines, identifying reduction opportunities, and developing compliance strategies. Project developers can register offset projects. Trading desks can facilitate CCC transactions. Verification bodies gain new accreditation opportunities. The compliance market provides more predictable demand than voluntary markets.',
    "actionItems" = '[
        {"title": "Study CCTS notification and rules", "description": "Download the June 2023 gazette notification and subsequent amendments to understand legal framework, definitions, and procedures"},
        {"title": "Map designated consumers in your region", "description": "Using industrial databases, identify facilities in your state/region that fall under CCTS coverage thresholds"},
        {"title": "Analyze PAT scheme learnings", "description": "Study PAT cycle results to understand trading patterns, price discovery, and compliance rates that inform CCTS design"},
        {"title": "Develop CCTS advisory service offering", "description": "Create a service package for designated consumers covering baseline setting, target achievement strategies, and trading support"}
    ]'::jsonb,
    "resources" = '[
        {"title": "CCTS Gazette Notification - Ministry of Power", "url": "https://powermin.gov.in/", "type": "government"},
        {"title": "Bureau of Energy Efficiency - CCTS Portal", "url": "https://beeindia.gov.in/", "type": "government"},
        {"title": "Indian Energy Exchange - Carbon Trading", "url": "https://www.iexindia.com/", "type": "exchange"},
        {"title": "PAT Scheme Results and Analysis - BEE", "url": "https://beeindia.gov.in/content/pat-3", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'India Carbon Credit Trading Scheme (CCTS)';

-- Day 46: India REC Market - Enhanced with IEX trading details
UPDATE "Lesson" SET
    "briefContent" = 'Renewable Energy Certificates (RECs) in India represent a market-based mechanism enabling renewable energy generators to monetize the environmental attributes of their generation, separate from the underlying electricity. Understanding the India REC market is essential for carbon professionals as it intersects with Scope 2 emissions accounting and corporate renewable procurement strategies.

The India REC mechanism was introduced in 2010 by the Central Electricity Regulatory Commission (CERC) to promote renewable energy and help obligated entities meet Renewable Purchase Obligations (RPOs). Distribution companies (DISCOMs), open access consumers, and captive power producers face RPOs requiring them to source specified percentages of electricity from renewable sources. Current RPO targets reach 24.61% by FY 2026-27, with specific carve-outs for solar (10.5%), wind, hydropower, and other renewables.

Trading occurs on two power exchanges: Indian Energy Exchange (IEX) and Power Exchange India Limited (PXIL). IEX dominates with approximately 95% market share. Trading sessions occur on the last Wednesday of each month through double-sided closed auction. Participants submit buy and sell bids; the exchange determines market clearing price and matched volumes. Recent trading volumes range from 5-15 lakh RECs monthly.

Two REC categories exist: Solar RECs and Non-Solar RECs. Historically, these traded at different prices with solar commanding premiums. Price bands were regulated with floor (Rs 1,000) and forbearance (Rs 2,500-3,500) prices. Recent CERC amendments have unified categories and moved toward market-determined pricing while maintaining price caps. Average trading prices have ranged from Rs 1,000-2,000 per REC in recent years.

Key changes in 2022-2023 transformed the market. REC validity was extended from 365 days to perpetual, eliminating wastage of unsold certificates. The multiplier system was revised - large hydro, pumped storage, and waste-to-energy now receive multiplied RECs (1.5-2x) to incentivize these technologies. Banking and forward trading are being introduced for price discovery and hedging. Integration with CCTS is planned, potentially allowing REC-CCC conversions.

For generators, REC registration requires CERC accreditation and state nodal agency certification. Eligible projects include solar, wind, small hydro (up to 25 MW), biomass, bagasse cogeneration, and urban/industrial waste-to-energy. Generation metering must meet specified accuracy standards. Monthly issuance occurs based on verified generation data.

Corporate buyers use RECs for RPO compliance and Scope 2 emission claims. However, international frameworks like RE100 and GHG Protocol market-based accounting have specific requirements. India RECs may not qualify for international claims unless certain additionality criteria are met. This creates demand for International RECs (I-RECs) discussed in the next lesson.

Business opportunities in the REC market include: trading services helping buyers and sellers optimize timing and pricing; advisory services for REC registration and accreditation; compliance management for obligated entities; and portfolio optimization combining RECs with PPAs and open access for corporate buyers.',
    "actionItems" = '[
        {"title": "Register on IEX/PXIL trading platforms", "description": "Create trading accounts on both exchanges, complete KYC requirements, and understand bidding interfaces and settlement procedures"},
        {"title": "Analyze REC price trends and volumes", "description": "Download 3 years of REC trading data from IEX and chart price trends, volumes, and seasonal patterns"},
        {"title": "Map RPO requirements by state", "description": "Compile state-wise RPO targets, compliance mechanisms, and penalty provisions from respective SERC regulations"},
        {"title": "Develop REC advisory service", "description": "Create service offerings for REC generation registration, trading strategy, and compliance management for obligated entities"}
    ]'::jsonb,
    "resources" = '[
        {"title": "IEX REC Trading Portal and Data", "url": "https://www.iexindia.com/marketdata/rec_trading.aspx", "type": "exchange"},
        {"title": "CERC REC Regulations and Amendments", "url": "https://cercind.gov.in/", "type": "government"},
        {"title": "MNRE RPO Compliance Framework", "url": "https://mnre.gov.in/", "type": "government"},
        {"title": "State-wise RPO Trajectories - MNRE", "url": "https://rpo.gov.in/", "type": "government"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'India Renewable Energy Certificate Market';

-- Day 55: SEBI BRSR Framework Deep Dive - Enhanced
UPDATE "Lesson" SET
    "briefContent" = 'The Business Responsibility and Sustainability Report (BRSR) framework mandated by SEBI represents India''s most comprehensive sustainability disclosure requirement. Understanding BRSR is essential for carbon professionals as it creates significant demand for GHG accounting, target setting, and sustainability advisory services.

BRSR replaced the Business Responsibility Report (BRR) from FY 2022-23, initially mandatory for top 1000 listed companies by market capitalization. SEBI subsequently extended requirements through BRSR Core for value chain disclosures from FY 2024-25, impacting thousands of additional companies as suppliers to listed entities. This cascading requirement dramatically expands the market for sustainability services.

The BRSR framework structure comprises three sections. Section A covers general disclosures: company overview, products/services, operations, employees, and holding/subsidiary information. Section B addresses management and process disclosures across nine principles derived from the National Guidelines on Responsible Business Conduct (NGRBC). Section C requires principle-wise performance disclosures with essential (mandatory) and leadership (voluntary) indicators.

The nine NGRBC principles span: P1-Ethical conduct; P2-Sustainable products/services; P3-Employee wellbeing; P4-Stakeholder responsiveness; P5-Human rights; P6-Environmental protection; P7-Public policy; P8-Inclusive growth; P9-Customer value. Each principle has specific disclosure requirements with quantitative metrics.

Principle 6 (Environment) contains the most extensive climate-related requirements. Essential indicators include: total energy consumed and intensity; disclosure of energy consumption reduction initiatives; water withdrawal and discharge data; air emissions including GHG emissions (Scope 1 and 2); waste generation and management; environmental compliance status. Leadership indicators cover Scope 3 emissions, water positive assessments, biodiversity assessments, and environmental impact assessments.

GHG disclosure requirements under BRSR Principle 6 specify reporting of Scope 1 (direct emissions), Scope 2 (purchased energy), and optionally Scope 3 (value chain) in metric tonnes CO2 equivalent. Companies must disclose emissions intensity per rupee of turnover. Reduction targets and progress must be reported. Third-party verification of GHG data is required under BRSR Core for large value chain partners.

BRSR Core intensifies requirements for value chain partners of top 250 companies from FY 2024-25. Key metrics requiring mandatory disclosure and assurance include: GHG emissions, water consumption, waste generation, energy consumption, diversity metrics, and safety indicators. This creates massive demand as thousands of MSMEs in supply chains of listed companies now require GHG accounting capabilities.

Assurance requirements are evolving. Currently, BRSR requires management certification but allows voluntary external assurance. SEBI has indicated mandatory limited assurance will phase in progressively. BRSR Core already requires reasonable assurance for specified metrics. This creates opportunities for sustainability assurance providers meeting ISAE 3000 or equivalent standards.

For carbon professionals, BRSR creates multiple revenue streams: GHG inventory development, Scope 3 screening and calculation, target setting aligned with SBTi, BRSR report preparation, assurance readiness, and ongoing sustainability management system implementation.',
    "actionItems" = '[
        {"title": "Master BRSR format and requirements", "description": "Download BRSR reporting format from SEBI and create detailed checklist of all essential and leadership indicators with data requirements"},
        {"title": "Analyze sample BRSR reports", "description": "Review BRSR disclosures from 10 large listed companies across sectors to understand reporting practices and quality variations"},
        {"title": "Map BRSR Core value chain requirements", "description": "Study BRSR Core circular to understand which metrics require value chain disclosure and assurance timelines"},
        {"title": "Develop BRSR advisory service package", "description": "Create comprehensive service offering covering gap assessment, data systems, report preparation, and assurance readiness"}
    ]'::jsonb,
    "resources" = '[
        {"title": "SEBI BRSR Circular and Format", "url": "https://www.sebi.gov.in/legal/circulars/may-2021/business-responsibility-and-sustainability-reporting-by-listed-entities_50096.html", "type": "government"},
        {"title": "BRSR Core Framework - SEBI", "url": "https://www.sebi.gov.in/", "type": "government"},
        {"title": "National Guidelines on Responsible Business Conduct", "url": "https://www.mca.gov.in/Ministry/pdf/NationalGuildeline_15032019.pdf", "type": "government"},
        {"title": "BRSR Reporting Examples - NSE", "url": "https://www.nseindia.com/", "type": "exchange"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'SEBI BRSR Framework Deep Dive';

-- Day 40: Green Finance Landscape in India - Enhanced
UPDATE "Lesson" SET
    "briefContent" = 'Green finance in India has emerged as a critical enabler of the country''s climate transition, with cumulative green bond issuances exceeding $25 billion and growing rapidly. Understanding the green finance landscape is essential for carbon professionals as it provides the capital foundation for carbon credit projects and sustainability initiatives.

The Indian green finance ecosystem comprises multiple instruments and participants. Green bonds are debt instruments where proceeds are exclusively used for environmentally beneficial projects. SEBI issued green bond guidelines in 2017, updated in 2023 to align with international standards. Eligible categories include renewable energy, energy efficiency, clean transportation, sustainable water management, climate change adaptation, green buildings, and biodiversity conservation. Indian issuers include government entities (IREDA, IRFC, SBI), corporates (Greenko, ReNew, Adani Green), and multilateral development banks operating in India.

State Bank of India has been a pioneer, issuing India''s first green bond in 2018 and remaining a significant player. The sovereign green bond program launched in January 2023 marked a watershed moment, with the Government of India issuing Rs 16,000 crore in the first tranche. Sovereign green bonds typically price 5-10 basis points below comparable conventional bonds - the "greenium" reflecting investor demand. Proceeds fund projects under the Framework for Sovereign Green Bonds covering renewable energy, energy efficiency, clean transportation, climate change adaptation, and sustainable water management.

The green bond issuance process requires developing a Green Bond Framework documenting use of proceeds, project selection, fund management, and reporting commitments. External review through Second Party Opinions (SPO) from agencies like Sustainalytics, Vigeo Eiris, or CICERO provides credibility. Post-issuance, annual allocation reporting and impact reporting are expected. SEBI mandates external review for listed green bonds and requires disclosure of proceeds utilization and environmental impact.

Beyond green bonds, sustainability-linked loans (SLLs) have grown rapidly in India. Unlike use-of-proceeds instruments, SLLs link interest rates to achieving Sustainability Performance Targets (SPTs) regardless of fund usage. Common SPTs include emission intensity reduction, renewable energy procurement, water efficiency, and diversity metrics. Major Indian banks including HDFC, ICICI, Axis, and Yes Bank offer SLL products with typical margin adjustments of 5-25 basis points for target achievement.

Climate funds provide concessional capital for high-impact projects. The Green Climate Fund (GCF) has approved over $1 billion for Indian projects through accredited entities including NABARD, SIDBI, and Yes Bank. GCF financing structures include grants, concessional loans, equity, and guarantees. Projects must demonstrate climate impact, country ownership, and transformational potential. The Global Environment Facility (GEF) and Adaptation Fund also finance Indian climate projects.

Blended finance combines concessional capital with commercial investment to de-risk projects. The India Clean Energy Finance Initiative, backed by USAID, provides first-loss guarantees for distributed renewable energy lending. SIDBI administers multiple credit lines with DFI backing for MSME clean energy investments. The National Clean Energy Fund, though largely exhausted, demonstrated government willingness to subsidize clean energy deployment.

For carbon professionals, green finance knowledge enables multiple value propositions: helping clients access green bonds and SLLs; structuring carbon credit projects to attract climate fund investment; developing blended finance proposals; and advising on green finance disclosure requirements. Carbon credits can enhance project returns making green finance more accessible.',
    "actionItems" = '[
        {"title": "Map India green finance ecosystem", "description": "Create comprehensive database of green bond issuers, SLL providers, climate funds, and blended finance facilities active in India"},
        {"title": "Study sovereign green bond framework", "description": "Download and analyze India Sovereign Green Bond Framework to understand eligible categories, selection criteria, and reporting requirements"},
        {"title": "Analyze green bond issuances", "description": "Research 10 recent Indian green bond issuances covering terms, pricing, SPO providers, and use of proceeds to understand market practices"},
        {"title": "Develop green finance advisory capability", "description": "Create service offerings helping clients access green bonds, SLLs, and climate funds with focus on integrating carbon credit revenues"}
    ]'::jsonb,
    "resources" = '[
        {"title": "SEBI Green Bond Guidelines", "url": "https://www.sebi.gov.in/legal/circulars/feb-2023/disclosure-requirements-for-issuance-and-listing-of-green-debt-securities_67920.html", "type": "government"},
        {"title": "India Sovereign Green Bond Framework", "url": "https://dea.gov.in/", "type": "government"},
        {"title": "Green Climate Fund India Portfolio", "url": "https://www.greenclimate.fund/countries/india", "type": "fund"},
        {"title": "Climate Bonds Initiative India Report", "url": "https://www.climatebonds.net/resources/reports", "type": "research"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'Green Finance Landscape in India';

-- Day 5: Carbon Business Opportunities in India - Enhanced
UPDATE "Lesson" SET
    "briefContent" = 'The carbon market in India presents substantial business opportunities across multiple segments, driven by regulatory developments, corporate sustainability commitments, and international market demand. Understanding these opportunities helps you identify the right entry point for your carbon business venture.

Project development involves creating carbon credit generating assets. In India, promising project types include: distributed renewable energy (rooftop solar, small wind) serving SME and residential segments; improved cookstoves and clean cooking solutions reaching the 100+ million households still using traditional biomass; forestry and afforestation projects leveraging India''s Green India Mission targets; agricultural soil carbon sequestration across 140 million hectares of farmland; waste-to-energy and methane capture from landfills and agricultural waste; and industrial energy efficiency projects eligible under CCTS.

Trading and brokerage opportunities emerge from growing transaction volumes. With CCTS creating mandatory compliance demand and voluntary market growth from corporate net zero commitments, trading desks can facilitate transactions between credit generators and buyers. Success requires market intelligence, relationship networks, and understanding of credit quality factors. Entry barriers are relatively low but margins compress as markets mature.

Advisory and consulting services address growing corporate demand. Services include: carbon footprint measurement (GHG inventories); BRSR compliance and sustainability reporting; Science Based Targets development; Net Zero strategy and roadmaps; CCTS compliance strategy for designated consumers; carbon credit procurement for offsetting; and supply chain sustainability programs. The BRSR mandate alone creates addressable market of 1000+ listed companies plus their value chain partners.

Technology platforms serve growing infrastructure needs. Opportunities include: carbon accounting software for GHG inventory management; MRV (Monitoring, Reporting, Verification) platforms using IoT and satellite data; carbon credit marketplaces and trading platforms; ESG data management systems; and supply chain traceability solutions. Technology solutions can scale beyond advisory services but require significant upfront investment.

Corporate carbon credit buyers represent the primary demand segment. Over 200 Indian companies have committed to Net Zero or Science Based Targets. Major buyers include IT services (Infosys, Wipro, TCS have ambitious climate goals), manufacturing multinationals with India operations, and consumer brands seeking to offset product emissions. Buyer preferences increasingly favor high-quality credits with verified co-benefits, creating premium pricing for well-designed projects.

Financial services opportunities include carbon credit-backed lending, climate insurance products, carbon derivatives trading, and green finance advisory. As markets mature, financial innovation accelerates. Carbon credits can serve as collateral for project financing, and carbon price hedging instruments help manage volatility.

The market sizing suggests significant potential. India''s voluntary carbon market is estimated at $50-100 million currently, projected to grow to $1+ billion by 2030. CCTS compliance market could add billions more depending on price levels. Green finance market exceeds $25 billion in bonds alone. Carbon advisory services market for listed companies runs into hundreds of crores annually.

Entry strategy depends on your background and resources. Technical backgrounds suit project development and MRV technology. Finance backgrounds align with trading and green finance. Business backgrounds fit advisory and platform business models. Starting with advisory services offers lower capital requirements and faster revenue while building market knowledge for larger opportunities.',
    "actionItems" = '[
        {"title": "Assess personal fit for carbon business models", "description": "Evaluate your background, skills, network, and capital against requirements for project development, trading, advisory, and technology ventures"},
        {"title": "Research corporate sustainability commitments", "description": "Create database of Indian companies with Net Zero, SBTi, or RE100 commitments as potential clients for various carbon services"},
        {"title": "Analyze competitor landscape", "description": "Map existing carbon advisory firms, project developers, and technology providers in India with their positioning and service offerings"},
        {"title": "Develop initial business model canvas", "description": "Create business model canvas for your chosen carbon business segment covering value proposition, customer segments, channels, and revenue model"}
    ]'::jsonb,
    "resources" = '[
        {"title": "Science Based Targets - India Companies", "url": "https://sciencebasedtargets.org/companies-taking-action", "type": "database"},
        {"title": "CDP India Disclosure Data", "url": "https://www.cdp.net/en/responses", "type": "data"},
        {"title": "India Carbon Market Landscape - CEEW", "url": "https://www.ceew.in/", "type": "research"},
        {"title": "Voluntary Carbon Market Reports - Ecosystem Marketplace", "url": "https://www.ecosystemmarketplace.com/", "type": "report"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'Carbon Business Opportunities in India';

-- Day 6: GHG Protocol Overview - Enhanced
UPDATE "Lesson" SET
    "briefContent" = 'The GHG Protocol is the world''s most widely used greenhouse gas accounting standard, forming the foundation of corporate carbon footprinting, regulatory compliance, and carbon credit project development. Mastering GHG Protocol is non-negotiable for carbon professionals working in India or globally.

Developed by the World Resources Institute (WRI) and World Business Council for Sustainable Development (WBCSD), the GHG Protocol comprises several complementary standards. The Corporate Standard (2001, revised 2004) covers organizational GHG inventories - Scope 1 and 2 emissions. The Scope 3 Standard (2011) extends to value chain emissions. The Corporate Value Chain Standard provides detailed Scope 3 guidance. The Product Standard enables product-level carbon footprints. The Project Protocol governs project-level GHG accounting for offset credits. The Mitigation Goal Standard helps set and track emission reduction targets.

Five accounting principles underpin GHG Protocol. Relevance ensures the GHG inventory appropriately reflects emissions and serves decision-making needs. Completeness requires accounting for all emission sources within chosen boundaries with disclosed exclusions. Consistency enables meaningful comparison over time through consistent methodologies. Transparency requires clear documentation allowing third-party verification. Accuracy minimizes bias and uncertainty in quantification.

The Corporate Standard is most relevant for Indian corporate reporting including BRSR compliance. It requires reporting direct emissions (Scope 1), indirect emissions from purchased energy (Scope 2), and optionally other indirect emissions (Scope 3). Setting organizational boundaries involves choosing between equity share, financial control, or operational control approaches - operational control is most common and recommended for BRSR.

Emission calculation follows the fundamental equation: Activity Data multiplied by Emission Factor equals Emissions. Activity data represents the quantity of emission-generating activity (liters of diesel, kWh electricity, km traveled). Emission factors convert activity data to GHG emissions (kg CO2e per liter diesel, per kWh, per km). Factors can be default (IPCC, national databases) or supplier-specific for greater accuracy.

India-specific emission factors are essential for accurate reporting. The Central Electricity Authority publishes annual grid emission factors - currently around 0.82 kg CO2/kWh nationally but varying regionally from 0.7 (southern grid with more renewables) to 1.0 (northern grid with more coal). MoEFCC and IPCC provide fuel combustion factors. Industry associations publish sector-specific factors for processes like cement and steel.

For BRSR compliance, companies must report Scope 1 and 2 emissions in absolute terms (tonnes CO2e) and intensity terms (per rupee turnover or appropriate denominator). Scope 3 is currently optional but increasingly expected. The BRSR format specifies disclosure categories broadly aligned with GHG Protocol.

Carbon credit projects require project-level GHG accounting following the GHG Protocol Project Protocol or standard-specific methodologies (Verra, Gold Standard). This involves establishing baselines, calculating project emissions, and quantifying reductions - all requiring rigorous application of GHG Protocol principles.

GHG Protocol training and certification programs are available. The GHG Management Institute offers accredited courses. Many consulting firms provide corporate training. Building strong GHG Protocol expertise differentiates your carbon advisory services.',
    "actionItems" = '[
        {"title": "Download and study all GHG Protocol standards", "description": "Access Corporate Standard, Scope 3 Standard, and Project Protocol documents from GHG Protocol website and study thoroughly"},
        {"title": "Practice corporate GHG inventory development", "description": "Using sample company data, develop complete Scope 1 and 2 inventory following GHG Protocol Corporate Standard methodology"},
        {"title": "Compile India emission factor database", "description": "Create comprehensive database of India-specific emission factors from CEA, IPCC, MoEFCC, and industry sources with update schedules"},
        {"title": "Map GHG Protocol to BRSR requirements", "description": "Create detailed crosswalk between GHG Protocol disclosure requirements and BRSR Principle 6 indicators"}
    ]'::jsonb,
    "resources" = '[
        {"title": "GHG Protocol Standards Library", "url": "https://ghgprotocol.org/standards", "type": "standard"},
        {"title": "CEA CO2 Baseline Database", "url": "https://cea.nic.in/", "type": "government"},
        {"title": "IPCC Emission Factor Database", "url": "https://www.ipcc-nggip.iges.or.jp/EFDB/main.php", "type": "database"},
        {"title": "GHG Protocol Calculation Tools", "url": "https://ghgprotocol.org/calculation-tools", "type": "tool"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'GHG Protocol Overview';

-- Day 50: Net Zero Fundamentals - Enhanced
UPDATE "Lesson" SET
    "briefContent" = 'Net Zero has become the defining climate commitment for corporations and nations, representing the ultimate destination of decarbonization journeys. Understanding Net Zero fundamentals is critical for carbon professionals advising organizations or developing projects that contribute to Net Zero pathways.

Net Zero means achieving a balance between greenhouse gas emissions produced and emissions removed from the atmosphere. Crucially, Net Zero is NOT the same as Carbon Neutral. Carbon Neutral allows unlimited offsetting of ongoing emissions through carbon credits. Net Zero requires deep decarbonization (typically 90-95% emission reductions) with offsets only permitted for truly unavoidable residual emissions. This distinction fundamentally changes the role of carbon credits in corporate climate strategy.

The Science Based Targets initiative (SBTi) Corporate Net Zero Standard, launched in October 2021, sets the benchmark for credible corporate Net Zero commitments. It requires: near-term targets covering 5-10 years aligned with 1.5 degree Celsius pathways; long-term targets achieving at least 90% value chain emission reductions before 2050; and neutralization of residual emissions (the remaining <10%) through permanent carbon dioxide removals.

SBTi explicitly states that carbon credits cannot count toward near-term emission reduction targets. They can only be used for: Beyond Value Chain Mitigation (BVCM) - investing in climate action beyond a company''s value chain while reducing own emissions; and neutralizing residual emissions after achieving 90%+ reductions. This significantly constrains carbon credit use compared to Carbon Neutral frameworks.

For Indian companies, Net Zero timeline considerations differ from global corporates. India''s national Net Zero 2070 target provides policy context. However, companies in global supply chains face customer pressure for earlier targets. SBTi requires long-term targets by 2050 regardless of national context. Over 100 Indian companies have committed to SBTi, with more joining regularly.

Net Zero pathway development involves several steps. First, establish comprehensive baseline emissions across Scope 1, 2, and 3. Second, set near-term targets (typically 4.2% absolute reduction annually for 1.5 degree alignment). Third, identify and prioritize decarbonization levers through marginal abatement cost curve analysis. Fourth, set long-term Net Zero target with interim milestones. Fifth, plan for neutralization of truly unavoidable residual emissions.

Decarbonization levers in the Indian context include: energy efficiency improvements (often negative cost - saving money while reducing emissions); renewable energy procurement through PPAs, open access, or RECs; electrification of processes and fleets; process changes in hard-to-abate sectors; value chain engagement for Scope 3 reductions; and potentially emerging technologies like green hydrogen for specific applications.

The role of carbon credits in Net Zero shifts from primary compliance mechanism to supplementary action. BVCM represents investing in high-quality carbon credits or climate projects beyond what''s needed for your own targets - a form of climate philanthropy and leadership. Neutralization requires permanent carbon dioxide removal credits (direct air capture, biochar, enhanced weathering) rather than avoidance credits.

For carbon professionals, Net Zero creates significant advisory opportunity. Companies need help with: baseline assessment; target setting and SBTi submission; decarbonization roadmap development; implementation planning and tracking; and eventually neutralization strategy. The shift away from offsetting means deeper, longer-term engagements rather than simple credit procurement.',
    "actionItems" = '[
        {"title": "Study SBTi Net Zero Standard", "description": "Download and thoroughly analyze the SBTi Corporate Net Zero Standard including criteria, methods, and validation requirements"},
        {"title": "Analyze Indian Net Zero commitments", "description": "Research 20 Indian companies with Net Zero or SBTi commitments to understand their targets, timelines, and decarbonization strategies"},
        {"title": "Develop Net Zero advisory framework", "description": "Create comprehensive service methodology for helping companies set Net Zero targets, develop pathways, and achieve SBTi validation"},
        {"title": "Understand neutralization requirements", "description": "Research carbon dioxide removal technologies and credit types eligible for Net Zero neutralization under SBTi standards"}
    ]'::jsonb,
    "resources" = '[
        {"title": "SBTi Corporate Net Zero Standard", "url": "https://sciencebasedtargets.org/net-zero", "type": "standard"},
        {"title": "SBTi Companies Taking Action", "url": "https://sciencebasedtargets.org/companies-taking-action", "type": "database"},
        {"title": "Net Zero Tracker", "url": "https://zerotracker.net/", "type": "tool"},
        {"title": "Oxford Principles for Net Zero Aligned Offsetting", "url": "https://www.ox.ac.uk/", "type": "guidance"}
    ]'::jsonb,
    "updatedAt" = NOW()
WHERE "moduleId" IN (
    SELECT m.id FROM "Module" m
    JOIN "Product" p ON m."productId" = p.id
    WHERE p.code = 'P15'
) AND title = 'Net Zero Fundamentals';

COMMIT;
