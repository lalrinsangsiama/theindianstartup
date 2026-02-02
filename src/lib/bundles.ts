// Bundle configurations for The Indian Startup
export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  products: string[];
  price: number;
  originalPrice: number;
  savings: number;
  savingsPercent: number;
  mostPopular?: boolean;
  recommended?: boolean;
  targetAudience: string;
  description: string;
  outcomes: string[];
  icon?: string;
  color?: string;
}

export const BUNDLES: Record<string, Bundle> = {
  FOUNDATION: {
    id: "bundle_foundation",
    name: "Foundation Bundle",
    tagline: "Launch Right",
    products: ["P1", "P2", "P9"],
    price: 12999,
    originalPrice: 14997,
    savings: 2997,
    savingsPercent: 18,
    mostPopular: true,
    targetAudience: "first-time-founders",
    description: "Everything you need to launch your startup the right way - from idea to incorporation with government support.",
    outcomes: [
      "Launch your startup in 30 days",
      "Complete legal incorporation & compliance",
      "Access ₹20L-5Cr government funding",
      "Save ₹2,997 on individual prices"
    ],
    icon: "🚀",
    color: "blue"
  },
  
  GROWTH_ENGINE: {
    id: "bundle_growth",
    name: "Growth Engine Bundle",
    tagline: "Scale Revenue Fast",
    products: ["P3", "P6", "P12"],
    price: 19999,
    originalPrice: 27996,
    savings: 7996,
    savingsPercent: 28,
    targetAudience: "revenue-focused",
    description: "Transform your startup into a revenue-generating machine with complete funding, sales, and marketing mastery.",
    outcomes: [
      "Master the Indian funding ecosystem",
      "Build a scalable sales organization",
      "Create data-driven marketing engine",
      "Save ₹7,996 on individual prices"
    ],
    icon: "📈",
    color: "green"
  },
  
  COMPLIANCE_MASTER: {
    id: "bundle_compliance",
    name: "Compliance Master Bundle",
    tagline: "Build on Solid Foundation",
    products: ["P2", "P4", "P5"],
    price: 21999,
    originalPrice: 28996,
    savings: 6996,
    savingsPercent: 24,
    targetAudience: "serious-founders",
    description: "Build bulletproof legal and financial infrastructure that scales with your startup.",
    outcomes: [
      "Complete incorporation & ongoing compliance",
      "CFO-level financial systems",
      "Bulletproof legal framework",
      "Save ₹6,996 on individual prices"
    ],
    icon: "🛡️",
    color: "purple"
  },
  
  FUNDING_READY: {
    id: "bundle_funding",
    name: "Funding Ready Bundle",
    tagline: "Raise Capital Like a Pro",
    products: ["P3", "P4", "P8"],
    price: 24999,
    originalPrice: 34996,
    savings: 9996,
    savingsPercent: 28,
    targetAudience: "fundraising",
    description: "Everything you need to raise your next round - from preparation to closing.",
    outcomes: [
      "Complete funding strategy & execution",
      "Investor-grade financial systems",
      "Professional data room setup",
      "Save ₹9,996 on individual prices"
    ],
    icon: "💰",
    color: "yellow"
  },
  
  IP_INNOVATION: {
    id: "bundle_ip",
    name: "IP & Innovation Bundle",
    tagline: "Protect and Promote",
    products: ["P10", "P5", "P11"],
    price: 18999,
    originalPrice: 24996,
    savings: 5997,
    savingsPercent: 24,
    targetAudience: "tech-founders",
    description: "Protect your innovations and build a powerful brand that stands out.",
    outcomes: [
      "Complete patent strategy & filing",
      "Bulletproof legal protection",
      "Powerful brand & PR engine",
      "Save ₹5,997 on individual prices"
    ],
    icon: "💡",
    color: "orange"
  },
  
  MARKET_DOMINATION: {
    id: "bundle_market",
    name: "Market Domination Bundle",
    tagline: "Own Your Market",
    products: ["P6", "P11", "P12", "P7"],
    price: 29999,
    originalPrice: 41995,
    savings: 11995,
    savingsPercent: 28,
    targetAudience: "ambitious-founders",
    description: "Complete system to capture and dominate your market across India.",
    outcomes: [
      "Scalable sales organization",
      "National brand recognition",
      "Multi-channel marketing machine",
      "State-wise expansion strategy",
      "Save ₹11,995 on individual prices"
    ],
    icon: "👑",
    color: "red"
  },
  
  ACCELERATOR: {
    id: "bundle_accelerator",
    name: "Startup Accelerator",
    tagline: "Choose Your Path",
    products: [], // Dynamic - user selects 6
    price: 34999,
    originalPrice: 0, // Calculated based on selection
    savings: 0, // Calculated based on selection
    savingsPercent: 30,
    targetAudience: "custom-path",
    description: "Create your personalized learning path - choose any 6 courses that match your startup's needs.",
    outcomes: [
      "Customized curriculum for your needs",
      "Mix and match any 6 courses",
      "30% savings guaranteed",
      "Flexible learning path"
    ],
    icon: "🎯",
    color: "indigo"
  },
  
  ALL_ACCESS: {
    id: "bundle_all_access",
    name: "All-Access Mastermind",
    tagline: "Complete Founder Education",
    products: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12", "P13", "P14", "P15", "P16", "P17", "P18", "P19", "P20", "P21", "P22", "P23", "P24", "P25", "P26", "P27", "P28", "P29", "P30"],
    price: 149999,
    originalPrice: 224970,
    savings: 74971,
    savingsPercent: 33,
    recommended: true,
    targetAudience: "serious-founders",
    description: "Get lifetime access to all 30 courses - complete startup mastery from idea to global scale. India's ONLY comprehensive platform covering every startup function, sector, and market.",
    outcomes: [
      "All 30 comprehensive courses",
      "₹74,971 in total savings",
      "Priority support access",
      "Quarterly content updates",
      "Exclusive mastermind community",
      "Every function, sector, and market covered"
    ],
    icon: "🏆",
    color: "black"
  },

  CORE_FUNCTIONS: {
    id: "bundle_core_functions",
    name: "Core Functions Bundle",
    tagline: "Build Your Team & Product",
    products: ["P16", "P17", "P18", "P19"],
    price: 19999,
    originalPrice: 25996,
    savings: 5997,
    savingsPercent: 23,
    targetAudience: "scaling-founders",
    description: "Master the four pillars of startup operations - HR, product development, operations, and technology infrastructure.",
    outcomes: [
      "Complete HR and team building systems",
      "Product-market fit methodology",
      "Scalable operations framework",
      "CTO-level technology decisions",
      "Save ₹5,997 on individual prices"
    ],
    icon: "⚙️",
    color: "slate"
  },

  FINTECH_COMPLETE: {
    id: "bundle_fintech",
    name: "FinTech Complete Bundle",
    tagline: "Master Financial Services",
    products: ["P3", "P4", "P5", "P20"],
    price: 24999,
    originalPrice: 30996,
    savings: 5997,
    savingsPercent: 19,
    targetAudience: "fintech-founders",
    description: "Everything you need to build and scale a compliant FinTech startup in India - funding, finance, legal, and RBI regulations.",
    outcomes: [
      "Complete funding strategy",
      "CFO-level financial systems",
      "Bulletproof legal framework",
      "RBI compliance mastery",
      "Save ₹5,997 on individual prices"
    ],
    icon: "💳",
    color: "blue"
  },

  HEALTHTECH_COMPLETE: {
    id: "bundle_healthtech",
    name: "HealthTech Complete Bundle",
    tagline: "Build in Healthcare",
    products: ["P2", "P5", "P10", "P21"],
    price: 27999,
    originalPrice: 28996,
    savings: 997,
    savingsPercent: 3,
    targetAudience: "healthtech-founders",
    description: "Complete healthcare startup toolkit - incorporation, legal protection, IP strategy, and CDSCO compliance.",
    outcomes: [
      "Healthcare entity structure",
      "Medical device compliance",
      "IP protection for innovations",
      "CDSCO regulatory pathway",
      "Save on individual prices"
    ],
    icon: "🏥",
    color: "red"
  },

  ECOMMERCE_COMPLETE: {
    id: "bundle_ecommerce",
    name: "E-commerce Complete Bundle",
    tagline: "Sell Online Successfully",
    products: ["P6", "P12", "P22"],
    price: 19999,
    originalPrice: 24997,
    savings: 4998,
    savingsPercent: 20,
    targetAudience: "ecommerce-founders",
    description: "Everything to build a profitable e-commerce business - sales mastery, marketing engine, and D2C/marketplace operations.",
    outcomes: [
      "Complete sales organization",
      "Data-driven marketing machine",
      "E-commerce operations mastery",
      "Omnichannel strategy",
      "Save ₹4,998 on individual prices"
    ],
    icon: "🛒",
    color: "orange"
  },

  GREEN_ECONOMY: {
    id: "bundle_green",
    name: "Green Economy Bundle",
    tagline: "Build Sustainable Businesses",
    products: ["P15", "P23", "P24"],
    price: 22999,
    originalPrice: 27997,
    savings: 4998,
    savingsPercent: 18,
    targetAudience: "sustainability-founders",
    description: "Master the green economy - carbon credits, EV mobility, and sustainable manufacturing with PLI scheme access.",
    outcomes: [
      "Carbon credit business setup",
      "EV/Clean mobility expertise",
      "PLI scheme navigation",
      "Green finance access",
      "Save ₹4,998 on individual prices"
    ],
    icon: "🌱",
    color: "green"
  },

  DEEP_TECH: {
    id: "bundle_deep_tech",
    name: "Deep Tech Bundle",
    tagline: "Build Tech Companies",
    products: ["P10", "P19", "P28", "P29"],
    price: 27999,
    originalPrice: 32996,
    savings: 4997,
    savingsPercent: 15,
    targetAudience: "deep-tech-founders",
    description: "For serious tech founders - patents, infrastructure, biotech, and global SaaS expertise.",
    outcomes: [
      "Complete IP strategy",
      "CTO-level tech decisions",
      "Biotech regulatory pathway",
      "Global SaaS scaling",
      "Save ₹4,997 on individual prices"
    ],
    icon: "🔬",
    color: "purple"
  },

  SECTOR_MASTERY: {
    id: "bundle_sector",
    name: "Sector Mastery Bundle",
    tagline: "Specialized Industry Expertise",
    products: ["P13", "P14", "P15"],
    price: 20999,
    originalPrice: 26997,
    savings: 5998,
    savingsPercent: 22,
    targetAudience: "sector-focused",
    description: "Master specialized sectors with deep expertise in Food Processing, Impact/CSR, and Carbon Credits - India's fastest growing opportunities.",
    outcomes: [
      "Complete food processing mastery with FSSAI & export",
      "Access ₹25,000 Cr CSR market",
      "Build carbon credit business with Verra/Gold Standard",
      "Save ₹5,998 on individual prices"
    ],
    icon: "🌱",
    color: "emerald"
  },

  SUSTAINABILITY_IMPACT: {
    id: "bundle_sustainability",
    name: "Sustainability & Impact Bundle",
    tagline: "Build for Good & Profit",
    products: ["P14", "P15", "P9"],
    price: 18999,
    originalPrice: 23997,
    savings: 4998,
    savingsPercent: 21,
    targetAudience: "impact-founders",
    description: "Combine impact measurement, carbon credits, and government funding for maximum social and environmental returns.",
    outcomes: [
      "Master CSR & impact measurement",
      "Build carbon credit revenue streams",
      "Access government sustainability schemes",
      "Save ₹4,998 on individual prices"
    ],
    icon: "🌍",
    color: "green"
  }
};

// Helper functions
export function getBundlesByProduct(productCode: string): Bundle[] {
  return Object.values(BUNDLES).filter(bundle => 
    bundle.products.includes(productCode)
  );
}

export function calculateCustomBundlePrice(products: string[], productPrices: Record<string, number>): {
  original: number;
  discounted: number;
  savings: number;
  savingsPercent: number;
} {
  const original = products.reduce((sum, code) => sum + (productPrices[code] || 0), 0);
  
  // Discount tiers based on number of products
  let discountPercent = 0.15; // 15% for 2-3 products
  if (products.length >= 4 && products.length <= 5) discountPercent = 0.20; // 20% for 4-5
  if (products.length >= 6 && products.length <= 8) discountPercent = 0.25; // 25% for 6-8
  if (products.length >= 9) discountPercent = 0.30; // 30% for 9+
  
  const discounted = Math.round(original * (1 - discountPercent));
  const savings = original - discounted;
  const savingsPercent = Math.round(discountPercent * 100);
  
  return { original, discounted, savings, savingsPercent };
}

export function getBundleValue(bundle: Bundle, productPrices: Record<string, number>): number {
  // Calculate total value of products in bundle
  return bundle.products.reduce((sum, code) => sum + (productPrices[code] || 0), 0);
}

export function getRecommendedBundles(
  ownedProducts: string[],
  interests: string[]
): Bundle[] {
  // Logic to recommend bundles based on owned products and interests
  const recommendations: Bundle[] = [];
  
  // If user has no products, recommend Foundation
  if (ownedProducts.length === 0) {
    recommendations.push(BUNDLES.FOUNDATION);
  }
  
  // If user has some products, recommend bundles that complement
  if (ownedProducts.includes("P1") && !ownedProducts.includes("P3")) {
    recommendations.push(BUNDLES.GROWTH_ENGINE);
  }
  
  // Based on interests
  if (interests.includes("funding")) {
    recommendations.push(BUNDLES.FUNDING_READY);
  }
  
  if (interests.includes("technology") || interests.includes("saas")) {
    recommendations.push(BUNDLES.IP_INNOVATION);
  }
  
  // Always show All-Access as an option
  if (ownedProducts.length < 12) {
    recommendations.push(BUNDLES.ALL_ACCESS);
  }
  
  return recommendations.slice(0, 3); // Return top 3 recommendations
}

export function getUpgradeOptions(
  currentBundle: string,
  ownedProducts: string[]
): Bundle[] {
  const upgrades: Bundle[] = [];
  const current = BUNDLES[currentBundle];
  
  if (!current) return [BUNDLES.ALL_ACCESS];
  
  // Find bundles that include current products + more
  Object.values(BUNDLES).forEach(bundle => {
    if (bundle.id === currentBundle) return;
    
    const hasAllCurrent = current.products.every(p => bundle.products.includes(p));
    const hasMoreProducts = bundle.products.length > current.products.length;
    
    if (hasAllCurrent && hasMoreProducts) {
      upgrades.push(bundle);
    }
  });
  
  // Always include All-Access as ultimate upgrade
  if (currentBundle !== 'ALL_ACCESS') {
    upgrades.push(BUNDLES.ALL_ACCESS);
  }
  
  return upgrades;
}

// Bundle comparison utility
export function compareBundles(bundleIds: string[]): {
  bundles: Bundle[];
  allProducts: string[];
  productMatrix: Record<string, Record<string, boolean>>;
} {
  const bundles = bundleIds.map(id => BUNDLES[id]).filter(Boolean);
  const allProducts = new Set<string>();
  
  bundles.forEach(bundle => {
    bundle.products.forEach(p => allProducts.add(p));
  });
  
  const productMatrix: Record<string, Record<string, boolean>> = {};
  
  bundles.forEach(bundle => {
    productMatrix[bundle.id] = {};
    Array.from(allProducts).forEach(product => {
      productMatrix[bundle.id][product] = bundle.products.includes(product);
    });
  });
  
  return {
    bundles,
    allProducts: Array.from(allProducts),
    productMatrix
  };
}