// Product catalog for client-side usage
export interface Product {
  code: string;
  title: string;
  description: string;
  price: number;
  isBundle?: boolean;
  bundleProducts?: string[];
  comingSoon?: boolean;
  waitlistEnabled?: boolean;
}

// Product catalog - client-safe version
export const PRODUCTS: Record<string, Product> = {
  P1: {
    code: 'P1',
    title: '30-Day India Launch Sprint',
    description: 'Learn to build a startup from idea to launch with daily lessons, action plans and India-specific guidance.',
    price: 4999
  },
  P2: {
    code: 'P2', 
    title: 'Incorporation & Compliance Kit - Complete',
    description: 'Master Indian business incorporation and compliance with 12 comprehensive modules, 45 detailed lessons, and 80+ professional templates. Complete legal framework for bulletproof business setup.',
    price: 4999
  },
  P3: {
    code: 'P3',
    title: 'Funding in India - Complete Mastery',
    description: 'Master the Indian funding ecosystem with 12 modules, 60 comprehensive lessons, and access to 22+ verified investors. Complete funding strategy from bootstrapping to IPO.',
    price: 5999
  },
  P4: {
    code: 'P4',
    title: 'Finance Stack - CFO-Level Mastery',
    description: 'Transform into a CFO-level financial leader with complete financial infrastructure, compliance mastery, and strategic finance expertise. 60-day comprehensive course with comprehensive premium templates.',
    price: 6999
  },
  P5: {
    code: 'P5',
    title: 'Legal Stack - Bulletproof Legal Framework',
    description: 'Build bulletproof legal infrastructure with 12 comprehensive modules, 45 expert lessons, and 120+ professional legal templates. Complete litigation-proof business protection.',
    price: 7999
  },
  P6: {
    code: 'P6',
    title: 'Sales & GTM in India - Master Course',
    description: 'Transform into a revenue-generating machine with 10 modules, 60 comprehensive lessons, and 53+ sales resources. Complete India-specific sales mastery.',
    price: 6999
  },
  P7: {
    code: 'P7',
    title: 'State-wise Scheme Map - Complete Navigation',
    description: 'Master all 28 states and 8 UTs with 10 comprehensive modules, 30 detailed lessons, and strategic location optimization for maximum government benefits.',
    price: 4999
  },
  P8: {
    code: 'P8',
    title: 'Investor-Ready Data Room Mastery',
    description: 'Build investment banking-grade data rooms with 8 comprehensive modules, 63 detailed lessons, and 70+ professional resources. Accelerate fundraising by 60%.',
    price: 9999
  },
  P9: {
    code: 'P9',
    title: 'Government Schemes & Funding Mastery - Complete 21-Day Transformation',
    description: 'Master the ₹8.5 lakh crore government ecosystem with 4 comprehensive modules, 21 detailed lessons, and strategic government partnerships that unlock ₹2Cr-₹50Cr+ opportunities.',
    price: 4999
  },
  P10: {
    code: 'P10',
    title: 'Patent Mastery for Indian Startups',
    description: 'Master intellectual property with 12 comprehensive modules, 60 detailed lessons, and complete IP strategy framework. Build a ₹50 crore IP portfolio through expert patent mastery.',
    price: 7999
  },
  P11: {
    code: 'P11',
    title: 'Branding & Public Relations Mastery',
    description: 'Transform into an industry leader with 12 comprehensive modules, 93 expert lessons, and complete brand-building resources. Complete PR mastery and media dominance.',
    price: 7999
  },
  P12: {
    code: 'P12',
    title: 'Marketing Mastery - Complete Growth Engine',
    description: 'Build a data-driven marketing machine with 12 comprehensive modules, 60 detailed lessons, and expert guidance from Flipkart, Zomato, and Nykaa leadership teams. Complete growth engine mastery.',
    price: 9999
  },
  P13: {
    code: 'P13',
    title: 'Food Processing Mastery',
    description: 'Complete guide to food processing business in India - FSSAI compliance, manufacturing setup, quality certifications, cold chain logistics, government subsidies (PMFME, PMKSY, PLI), and APEDA export regulations.',
    price: 7999
  },
  P14: {
    code: 'P14',
    title: 'Impact & CSR Mastery',
    description: 'Master India\'s ₹25,000 Cr CSR ecosystem with Schedule VII compliance, social enterprise registration, IRIS+ impact measurement, corporate partnership development, and ESG integration.',
    price: 8999
  },
  P15: {
    code: 'P15',
    title: 'Carbon Credits & Sustainability',
    description: 'Build a carbon business with GHG Protocol accounting, Verra VCS and Gold Standard certifications, carbon credit trading, green finance, Net Zero strategy, and SEBI BRSR compliance.',
    price: 9999
  },
  T13: {
    code: 'T13',
    title: 'Food Processing Toolkit',
    description: 'Essential toolkit for food processing entrepreneurs - 12 premium templates including FSSAI applications, HACCP plans, cold chain calculators, and export documentation.',
    price: 3999
  },
  T14: {
    code: 'T14',
    title: 'Impact/CSR Toolkit',
    description: 'Complete CSR engagement toolkit - 12 templates for proposals, impact reports, NGO registrations, and corporate partnership agreements plus 8 interactive calculators.',
    price: 3999
  },
  T15: {
    code: 'T15',
    title: 'Carbon Credits Toolkit',
    description: 'Professional carbon business toolkit - 12 templates for project design documents, carbon accounting, trading agreements, and green finance applications plus 8 calculators.',
    price: 3999
  },
  // Phase 1: Core Functions (P16-P19)
  P16: {
    code: 'P16',
    title: 'HR & Team Building Mastery',
    description: 'Complete HR infrastructure from recruitment to scaling - 9 modules covering hiring, compensation, ESOPs, labor compliance, performance management, and POSH compliance. 63% of Indian startups lack structured HR.',
    price: 5999
  },
  P17: {
    code: 'P17',
    title: 'Product Development & Validation',
    description: 'Master product-market fit with 10 modules covering customer discovery, MVP design, user research, agile methodology, product metrics, growth experimentation, and product leadership. 90% of SaaS startups fail from poor product-market fit.',
    price: 6999
  },
  P18: {
    code: 'P18',
    title: 'Operations & Supply Chain Mastery',
    description: 'Build scalable operations with 8 modules covering process design, supply chain management, vendor development, quality systems, inventory optimization, and operational scaling.',
    price: 5999
  },
  P19: {
    code: 'P19',
    title: 'Technology Stack & Infrastructure',
    description: 'Build robust technical infrastructure with 9 modules covering architecture design, cloud strategy, DevOps, security, scalability, technical debt management, and CTO-level decision making.',
    price: 6999
  },
  // Phase 2: High-Growth Sectors (P20-P24)
  P20: {
    code: 'P20',
    title: 'FinTech Mastery',
    description: 'Navigate India\'s ₹1 trillion+ FinTech market with 11 modules covering RBI regulations, PA/PG licensing, digital lending guidelines, NBFC registration, InsurTech, WealthTech, crypto compliance, and Account Aggregator framework.',
    price: 8999
  },
  P21: {
    code: 'P21',
    title: 'HealthTech & Medical Devices',
    description: 'Master India\'s top-funded sector with 11 modules covering telemedicine regulations, CDSCO compliance, medical device classification, clinical trials, ABDM integration, and healthcare partnerships.',
    price: 8999
  },
  P22: {
    code: 'P22',
    title: 'E-commerce & D2C Mastery',
    description: 'Build profitable e-commerce with 10 modules covering business models, Consumer Protection Act compliance, marketplace selling, D2C website optimization, logistics, and omnichannel scaling.',
    price: 7999
  },
  P23: {
    code: 'P23',
    title: 'EV & Clean Mobility',
    description: 'Access ₹25,938 Cr PLI scheme with 11 modules covering FAME II subsidies, vehicle homologation, battery supply chain, charging infrastructure, manufacturing setup, and EV fleet models.',
    price: 8999
  },
  P24: {
    code: 'P24',
    title: 'Manufacturing & Make in India',
    description: 'Master 13 PLI schemes worth ₹1.97 lakh crore with 11 modules covering factory setup, quality certifications, SEZ benefits, export manufacturing, and Industry 4.0 automation.',
    price: 8999
  },
  // Phase 3: Emerging Sectors (P25-P28)
  P25: {
    code: 'P25',
    title: 'EdTech Mastery',
    description: 'Navigate NEP 2020 compliance with 9 modules covering UGC ODL guidelines, AICTE approvals, content creation, LMS technology, student data privacy, and EdTech monetization models.',
    price: 6999
  },
  P26: {
    code: 'P26',
    title: 'AgriTech & Farm-to-Fork',
    description: 'Build agricultural ventures with 9 modules covering FPO formation, APMC reforms, e-NAM integration, farm mechanization, government schemes (PM-KISAN, PMFBY), cold chain, and APEDA exports.',
    price: 6999
  },
  P27: {
    code: 'P27',
    title: 'Real Estate & PropTech',
    description: 'Master real estate technology with 10 modules covering RERA compliance, construction permits, PropTech innovations, real estate finance, co-living/co-working licensing, and smart city integration.',
    price: 7999
  },
  P28: {
    code: 'P28',
    title: 'Biotech & Life Sciences',
    description: 'Navigate drug development with 12 modules covering CDSCO regulations, clinical trials, GMP manufacturing, biosimilars pathway, medical devices, BIRAC funding, and global regulatory pathways.',
    price: 9999
  },
  // Phase 4: Advanced & Global (P29-P30)
  P29: {
    code: 'P29',
    title: 'SaaS & B2B Tech Mastery',
    description: 'Build global SaaS with 10 modules covering pricing models, SaaS metrics (ARR, NRR, LTV), product-led growth, enterprise sales, global compliance (GDPR, SOC 2), and international expansion.',
    price: 7999
  },
  P30: {
    code: 'P30',
    title: 'International Expansion',
    description: 'Go global with 11 modules covering FEMA compliance, US/EU/MENA market entry, export procedures, international payments, global hiring (EOR), transfer pricing, and international IP protection.',
    price: 9999
  },
  // Toolkits for new courses (T16-T30)
  T16: {
    code: 'T16',
    title: 'HR & Team Toolkit',
    description: 'Essential HR toolkit - 15 templates including offer letters, employment contracts, ESOP agreements, POSH policies, and 8 interactive tools like salary benchmarking and PF/ESI calculators.',
    price: 3499
  },
  T17: {
    code: 'T17',
    title: 'Product Development Toolkit',
    description: 'Product management toolkit - 12 templates for PRDs, user personas, roadmaps, and 10 tools including TAM calculator, feature prioritization matrix, and experiment tracker.',
    price: 3499
  },
  T18: {
    code: 'T18',
    title: 'Operations Toolkit',
    description: 'Operations management toolkit - 15 templates for SOPs, vendor agreements, quality manuals, and 8 tools for inventory optimization and process mapping.',
    price: 3499
  },
  T19: {
    code: 'T19',
    title: 'Technology Stack Toolkit',
    description: 'CTO toolkit - 10 templates for architecture documentation, security policies, and 12 tools for tech stack evaluation, cloud cost optimization, and security assessment.',
    price: 3499
  },
  T20: {
    code: 'T20',
    title: 'FinTech Toolkit',
    description: 'FinTech compliance toolkit - 12 templates for RBI applications, KYC policies, and 10 tools including compliance checkers and loan eligibility calculators.',
    price: 3999
  },
  T21: {
    code: 'T21',
    title: 'HealthTech Toolkit',
    description: 'Healthcare startup toolkit - 15 templates for CDSCO applications, clinical protocols, and 8 tools for device classification and regulatory pathway planning.',
    price: 3999
  },
  T22: {
    code: 'T22',
    title: 'E-commerce Toolkit',
    description: 'E-commerce operations toolkit - 12 templates for seller agreements, return policies, and 10 tools for unit economics, pricing optimization, and logistics planning.',
    price: 3499
  },
  T23: {
    code: 'T23',
    title: 'EV & Mobility Toolkit',
    description: 'EV startup toolkit - 12 templates for PLI applications, homologation documents, and 8 tools for subsidy calculations and DVA compliance tracking.',
    price: 3999
  },
  T24: {
    code: 'T24',
    title: 'Manufacturing Toolkit',
    description: 'Manufacturing excellence toolkit - 15 templates for factory licensing, PLI applications, and 10 tools for capacity planning and export documentation.',
    price: 3999
  },
  T25: {
    code: 'T25',
    title: 'EdTech Toolkit',
    description: 'EdTech launch toolkit - 10 templates for UGC applications, content licensing, and 8 tools for LMS comparison and student engagement tracking.',
    price: 3499
  },
  T26: {
    code: 'T26',
    title: 'AgriTech Toolkit',
    description: 'AgriTech toolkit - 12 templates for FPO registration, APEDA applications, and 8 tools for crop planning and subsidy eligibility assessment.',
    price: 3499
  },
  T27: {
    code: 'T27',
    title: 'PropTech Toolkit',
    description: 'Real estate tech toolkit - 12 templates for RERA registration, lease agreements, and 8 tools for property valuation and compliance tracking.',
    price: 3499
  },
  T28: {
    code: 'T28',
    title: 'Biotech Toolkit',
    description: 'Biotech regulatory toolkit - 15 templates for CDSCO applications, clinical trial protocols, and 10 tools for regulatory pathway mapping and GMP compliance.',
    price: 3999
  },
  T29: {
    code: 'T29',
    title: 'SaaS Toolkit',
    description: 'SaaS business toolkit - 10 templates for terms of service, DPA, SLA agreements, and 12 tools for pricing optimization, churn analysis, and metrics dashboards.',
    price: 3499
  },
  T30: {
    code: 'T30',
    title: 'International Expansion Toolkit',
    description: 'Global expansion toolkit - 15 templates for FEMA filings, international contracts, and 8 tools for market assessment and entity structure planning.',
    price: 3999
  },
  ALL_ACCESS: {
    code: 'ALL_ACCESS',
    title: 'All-Access Mastermind - Complete Founder Education',
    description: 'Get lifetime access to all 30 comprehensive courses - complete startup mastery from idea to global scale covering every function, sector, and market. Save ₹74,971 with the ultimate bundle!',
    price: 149999,
    isBundle: true,
    bundleProducts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12', 'P13', 'P14', 'P15', 'P16', 'P17', 'P18', 'P19', 'P20', 'P21', 'P22', 'P23', 'P24', 'P25', 'P26', 'P27', 'P28', 'P29', 'P30']
  },
  SECTOR_MASTERY: {
    code: 'SECTOR_MASTERY',
    title: 'Sector Mastery Bundle',
    description: 'Master specialized sectors with all three sector-specific courses and toolkits - Food Processing, Impact/CSR, and Carbon Credits. Save ₹5,997 with the bundle!',
    price: 20999,
    isBundle: true,
    bundleProducts: ['P13', 'P14', 'P15', 'T13', 'T14', 'T15']
  }
};