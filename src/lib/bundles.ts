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
    products: ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "P12"],
    price: 54999,
    originalPrice: 80985,
    savings: 25986,
    savingsPercent: 32,
    recommended: true,
    targetAudience: "serious-founders",
    description: "Get lifetime access to all 12 courses and build your billion-dollar startup with India's most comprehensive founder education.",
    outcomes: [
      "All 12 comprehensive courses",
      "₹25,986 in total savings",
      "Priority support access",
      "Quarterly content updates",
      "Exclusive mastermind community"
    ],
    icon: "🏆",
    color: "black"
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