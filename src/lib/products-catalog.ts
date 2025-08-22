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
  ALL_ACCESS: {
    code: 'ALL_ACCESS',
    title: 'All-Access Bundle - Complete Startup Mastery',
    description: 'Get lifetime access to all 12 comprehensive products - complete startup mastery from idea to scale. Save ₹25,986 with the bundle!',
    price: 54999,
    isBundle: true,
    bundleProducts: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12']
  }
};