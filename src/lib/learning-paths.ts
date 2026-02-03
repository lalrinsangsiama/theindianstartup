export interface UserProfile {
  industry?: string;
  experience?: 'beginner' | 'intermediate' | 'experienced' | 'expert';
  goals?: string[];
  interests?: string[];
  businessStage?: 'idea' | 'mvp' | 'growth' | 'scale';
  fundingStatus?: 'bootstrapped' | 'seeking' | 'funded';
  teamSize?: 'solo' | 'small' | 'medium' | 'large';
  techStack?: string[];
  primaryFocus?: 'tech' | 'sales' | 'marketing' | 'operations' | 'finance';
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  products: string[];
  estimatedDuration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  outcomes: string[];
  icon: string;
}

export const PREDEFINED_PATHS: Record<string, LearningPath> = {
  // Experience-based paths
  beginner_founder: {
    id: 'beginner_founder',
    name: 'First-Time Founder Path',
    description: 'Perfect for those starting their entrepreneurial journey',
    products: ['P1', 'P2', 'P9', 'P17'],
    estimatedDuration: '4 months',
    difficulty: 'beginner',
    outcomes: [
      'Launch your first startup',
      'Understand legal basics',
      'Access government funding',
      'Master product validation'
    ],
    icon: 'rocket'
  },

  experienced_founder: {
    id: 'experienced_founder',
    name: 'Scaling Expert Path',
    description: 'For founders ready to scale their existing startup',
    products: ['P3', 'P6', 'P12', 'P8', 'P16', 'P18', 'P30'],
    estimatedDuration: '6 months',
    difficulty: 'advanced',
    outcomes: [
      'Master advanced funding',
      'Build scalable sales engine',
      'Create investor-ready data room',
      'Scale operations and team',
      'Expand internationally'
    ],
    icon: 'trending-up'
  },

  // Focus-based paths
  tech_focused: {
    id: 'tech_focused',
    name: 'Tech Innovator Path',
    description: 'Build a technology-driven startup',
    products: ['P1', 'P10', 'P4', 'P5', 'P19', 'P29'],
    estimatedDuration: '6 months',
    difficulty: 'intermediate',
    outcomes: [
      'Launch tech product',
      'Protect intellectual property',
      'Build robust tech infrastructure',
      'Master SaaS and B2B growth'
    ],
    icon: 'cpu'
  },

  sales_focused: {
    id: 'sales_focused',
    name: 'Revenue Generator Path',
    description: 'Master sales and revenue generation',
    products: ['P6', 'P12', 'P3', 'P11', 'P22'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Build sales machine',
      'Master marketing channels',
      'Create strong brand presence',
      'Master e-commerce and D2C'
    ],
    icon: 'dollar-sign'
  },

  // Stage-based paths
  idea_stage: {
    id: 'idea_stage',
    name: 'Idea to MVP Path',
    description: 'Transform your idea into a working product',
    products: ['P1', 'P9', 'P2', 'P17'],
    estimatedDuration: '3 months',
    difficulty: 'beginner',
    outcomes: [
      'Validate your idea',
      'Build MVP',
      'Get first customers',
      'Master product development'
    ],
    icon: 'lightbulb'
  },

  growth_stage: {
    id: 'growth_stage',
    name: 'Growth Acceleration Path',
    description: 'Scale from MVP to market leader',
    products: ['P3', 'P6', 'P12', 'P11', 'P16', 'P18'],
    estimatedDuration: '6 months',
    difficulty: 'intermediate',
    outcomes: [
      'Raise funding',
      'Scale sales',
      'Build brand authority',
      'Build and scale team',
      'Optimize operations'
    ],
    icon: 'chart-line'
  },

  // Industry-specific paths
  ecommerce_path: {
    id: 'ecommerce_path',
    name: 'E-commerce Mastery Path',
    description: 'Build and scale an e-commerce business',
    products: ['P1', 'P12', 'P6', 'P4', 'P22', 'P18'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Launch online store',
      'Master digital marketing',
      'Optimize operations',
      'Master D2C and supply chain'
    ],
    icon: 'shopping-cart'
  },

  saas_path: {
    id: 'saas_path',
    name: 'SaaS Builder Path',
    description: 'Create a successful SaaS business',
    products: ['P1', 'P10', 'P3', 'P6', 'P19', 'P29', 'P30'],
    estimatedDuration: '7 months',
    difficulty: 'advanced',
    outcomes: [
      'Build SaaS product',
      'Protect IP',
      'Scale recurring revenue',
      'Master B2B growth',
      'Expand globally'
    ],
    icon: 'cloud'
  },

  // Comprehensive paths
  complete_founder: {
    id: 'complete_founder',
    name: 'Complete Founder Journey',
    description: 'Master every aspect of building a startup',
    products: [
      'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12',
      'P16', 'P17', 'P18', 'P19', 'P29', 'P30'
    ],
    estimatedDuration: '18 months',
    difficulty: 'advanced',
    outcomes: [
      'End-to-end startup mastery',
      'Multiple funding options',
      'Complete business toolkit',
      'Core functions excellence',
      'Global expansion ready'
    ],
    icon: 'crown'
  },

  // Fast track paths
  fast_track_funding: {
    id: 'fast_track_funding',
    name: 'Fast Track to Funding',
    description: 'Get funded in the shortest time possible',
    products: ['P9', 'P3', 'P8', 'P20'],
    estimatedDuration: '3 months',
    difficulty: 'intermediate',
    outcomes: [
      'Access government grants',
      'Prepare for investors',
      'Create data room',
      'Master FinTech funding landscape'
    ],
    icon: 'zap'
  },

  // NEW: Sector Specialist Paths
  sector_food_agri: {
    id: 'sector_food_agri',
    name: 'Food & AgriTech Specialist',
    description: 'Build a compliant food processing or agritech venture',
    products: ['P1', 'P2', 'P13', 'P18', 'P26'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Master FSSAI compliance',
      'Build food processing operations',
      'Navigate agritech ecosystem',
      'Access farm-to-fork subsidies'
    ],
    icon: 'leaf'
  },

  sector_healthtech: {
    id: 'sector_healthtech',
    name: 'HealthTech & Biotech Specialist',
    description: 'Navigate healthcare regulations and build health ventures',
    products: ['P1', 'P2', 'P5', 'P10', 'P21', 'P28'],
    estimatedDuration: '7 months',
    difficulty: 'advanced',
    outcomes: [
      'Master CDSCO compliance',
      'Navigate clinical trials',
      'Protect medical IP',
      'Access BIRAC funding'
    ],
    icon: 'heart-pulse'
  },

  sector_fintech: {
    id: 'sector_fintech',
    name: 'FinTech Specialist',
    description: 'Build compliant fintech products with RBI regulations',
    products: ['P1', 'P2', 'P4', 'P5', 'P19', 'P20'],
    estimatedDuration: '6 months',
    difficulty: 'advanced',
    outcomes: [
      'Master RBI regulations',
      'Build compliant payment systems',
      'Navigate PA/PG licensing',
      'Scale fintech operations'
    ],
    icon: 'wallet'
  },

  sector_cleantech: {
    id: 'sector_cleantech',
    name: 'CleanTech & Sustainability',
    description: 'Build green ventures with carbon credits and EV focus',
    products: ['P1', 'P2', 'P14', 'P15', 'P23'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Master ESG integration',
      'Navigate carbon credits',
      'Access ₹25,938 Cr PLI scheme',
      'Build EV/clean mobility venture'
    ],
    icon: 'wind'
  },

  sector_manufacturing: {
    id: 'sector_manufacturing',
    name: 'Manufacturing & Make in India',
    description: 'Access PLI schemes and build manufacturing excellence',
    products: ['P1', 'P2', 'P7', 'P18', 'P24'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Access 13 PLI schemes worth ₹1.97 lakh crore',
      'Master state incentives',
      'Build operations excellence',
      'Scale manufacturing'
    ],
    icon: 'factory'
  },

  sector_edtech: {
    id: 'sector_edtech',
    name: 'EdTech Specialist',
    description: 'Build compliant education technology ventures',
    products: ['P1', 'P2', 'P12', 'P19', 'P25'],
    estimatedDuration: '4 months',
    difficulty: 'intermediate',
    outcomes: [
      'Master NEP 2020 compliance',
      'Navigate UGC/AICTE approvals',
      'Build scalable LMS',
      'Market edtech products'
    ],
    icon: 'graduation-cap'
  },

  sector_proptech: {
    id: 'sector_proptech',
    name: 'PropTech & Real Estate',
    description: 'Navigate RERA and build proptech ventures',
    products: ['P1', 'P2', 'P5', 'P4', 'P27'],
    estimatedDuration: '4 months',
    difficulty: 'intermediate',
    outcomes: [
      'Master RERA compliance',
      'Build smart city solutions',
      'Navigate real estate regulations',
      'Scale proptech operations'
    ],
    icon: 'building'
  }
};

export function generateLearningPath(user: UserProfile): LearningPath {
  // Priority-based path selection
  
  // 1. Check experience level first
  if (user.experience === 'beginner' && !user.primaryFocus) {
    return PREDEFINED_PATHS.beginner_founder;
  }
  
  if (user.experience === 'experienced' || user.experience === 'expert') {
    return PREDEFINED_PATHS.experienced_founder;
  }
  
  // 2. Check primary focus
  if (user.primaryFocus === 'tech') {
    return PREDEFINED_PATHS.tech_focused;
  }
  
  if (user.primaryFocus === 'sales' || user.primaryFocus === 'marketing') {
    return PREDEFINED_PATHS.sales_focused;
  }
  
  // 3. Check business stage
  if (user.businessStage === 'idea') {
    return PREDEFINED_PATHS.idea_stage;
  }
  
  if (user.businessStage === 'growth' || user.businessStage === 'scale') {
    return PREDEFINED_PATHS.growth_stage;
  }
  
  // 4. Check funding status
  if (user.fundingStatus === 'seeking') {
    return PREDEFINED_PATHS.fast_track_funding;
  }
  
  // 5. Industry-specific paths
  if (user.industry?.toLowerCase().includes('ecommerce') || 
      user.industry?.toLowerCase().includes('retail')) {
    return PREDEFINED_PATHS.ecommerce_path;
  }
  
  if (user.industry?.toLowerCase().includes('saas') || 
      user.industry?.toLowerCase().includes('software')) {
    return PREDEFINED_PATHS.saas_path;
  }
  
  // Default path based on experience
  const defaultPaths = {
    beginner: PREDEFINED_PATHS.beginner_founder,
    intermediate: PREDEFINED_PATHS.growth_stage,
    experienced: PREDEFINED_PATHS.experienced_founder,
    expert: PREDEFINED_PATHS.complete_founder
  };
  
  return defaultPaths[user.experience || 'beginner'] || PREDEFINED_PATHS.beginner_founder;
}

// Generate custom path based on multiple factors
export function generateCustomPath(user: UserProfile): string[] {
  const recommendedProducts: Set<string> = new Set();

  // Core products based on experience
  if (user.experience === 'beginner') {
    recommendedProducts.add('P1'); // Launch Sprint
    recommendedProducts.add('P2'); // Incorporation
    recommendedProducts.add('P17'); // Product Development
  }

  // Add based on business stage
  switch (user.businessStage) {
    case 'idea':
      recommendedProducts.add('P1');
      recommendedProducts.add('P9'); // Government schemes
      recommendedProducts.add('P17'); // Product validation
      break;
    case 'mvp':
      recommendedProducts.add('P6'); // Sales & GTM
      recommendedProducts.add('P12'); // Marketing
      recommendedProducts.add('P17'); // Product Development
      break;
    case 'growth':
      recommendedProducts.add('P3'); // Funding
      recommendedProducts.add('P6'); // Sales
      recommendedProducts.add('P12'); // Marketing
      recommendedProducts.add('P16'); // HR & Team
      recommendedProducts.add('P18'); // Operations
      break;
    case 'scale':
      recommendedProducts.add('P8'); // Data Room
      recommendedProducts.add('P4'); // Finance Stack
      recommendedProducts.add('P5'); // Legal Stack
      recommendedProducts.add('P16'); // HR & Team
      recommendedProducts.add('P30'); // International Expansion
      break;
  }

  // Add based on primary focus
  switch (user.primaryFocus) {
    case 'tech':
      recommendedProducts.add('P10'); // Patents
      recommendedProducts.add('P19'); // Technology Stack
      recommendedProducts.add('P29'); // SaaS & B2B
      break;
    case 'sales':
    case 'marketing':
      recommendedProducts.add('P6'); // Sales
      recommendedProducts.add('P12'); // Marketing
      recommendedProducts.add('P11'); // Branding & PR
      recommendedProducts.add('P22'); // E-commerce & D2C
      break;
    case 'finance':
      recommendedProducts.add('P4'); // Finance Stack
      recommendedProducts.add('P3'); // Funding
      recommendedProducts.add('P20'); // FinTech Mastery
      break;
    case 'operations':
      recommendedProducts.add('P2'); // Compliance
      recommendedProducts.add('P5'); // Legal
      recommendedProducts.add('P7'); // State schemes
      recommendedProducts.add('P18'); // Operations & Supply Chain
      break;
  }

  // Add based on funding status
  if (user.fundingStatus === 'seeking') {
    recommendedProducts.add('P3'); // Funding
    recommendedProducts.add('P8'); // Data Room
    recommendedProducts.add('P9'); // Government schemes
  }

  // Add based on industry (expanded for P13-P30)
  const industry = user.industry?.toLowerCase() || '';
  if (industry.includes('food') || industry.includes('fmcg')) {
    recommendedProducts.add('P13'); // Food Processing
    recommendedProducts.add('P26'); // AgriTech
  }
  if (industry.includes('health') || industry.includes('medical') || industry.includes('pharma')) {
    recommendedProducts.add('P21'); // HealthTech
    recommendedProducts.add('P28'); // Biotech
  }
  if (industry.includes('fintech') || industry.includes('banking') || industry.includes('payment')) {
    recommendedProducts.add('P20'); // FinTech
  }
  if (industry.includes('ecommerce') || industry.includes('retail') || industry.includes('d2c')) {
    recommendedProducts.add('P22'); // E-commerce & D2C
  }
  if (industry.includes('ev') || industry.includes('electric') || industry.includes('mobility') || industry.includes('clean')) {
    recommendedProducts.add('P23'); // EV & Clean Mobility
    recommendedProducts.add('P15'); // Carbon Credits & Sustainability
  }
  if (industry.includes('manufacturing') || industry.includes('make in india')) {
    recommendedProducts.add('P24'); // Manufacturing
  }
  if (industry.includes('edtech') || industry.includes('education') || industry.includes('learning')) {
    recommendedProducts.add('P25'); // EdTech
  }
  if (industry.includes('agri') || industry.includes('farm') || industry.includes('agriculture')) {
    recommendedProducts.add('P26'); // AgriTech
  }
  if (industry.includes('real estate') || industry.includes('proptech') || industry.includes('property')) {
    recommendedProducts.add('P27'); // PropTech
  }
  if (industry.includes('saas') || industry.includes('software') || industry.includes('b2b')) {
    recommendedProducts.add('P29'); // SaaS & B2B
  }
  if (industry.includes('impact') || industry.includes('social') || industry.includes('ngo') || industry.includes('csr')) {
    recommendedProducts.add('P14'); // Impact & CSR
  }

  // Convert to array and limit to 8 products max for manageable path
  return Array.from(recommendedProducts).slice(0, 8);
}

// Get next recommended product based on completed products
export function getNextRecommendedProduct(
  completedProducts: string[],
  userProfile: UserProfile
): string | null {
  const path = generateLearningPath(userProfile);
  const pathProducts = path.products;

  // Find first product in path that's not completed
  for (const product of pathProducts) {
    if (!completedProducts.includes(product)) {
      return product;
    }
  }

  // If all path products completed, recommend based on gaps
  const allProducts = [
    // Foundation courses (P1-P12)
    'P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12',
    // Sector-Specific (P13-P15)
    'P13', 'P14', 'P15',
    // Core Functions (P16-P19)
    'P16', 'P17', 'P18', 'P19',
    // High-Growth Sectors (P20-P24)
    'P20', 'P21', 'P22', 'P23', 'P24',
    // Emerging Sectors (P25-P28)
    'P25', 'P26', 'P27', 'P28',
    // Advanced & Global (P29-P30)
    'P29', 'P30'
  ];
  const remainingProducts = allProducts.filter(p => !completedProducts.includes(p));

  if (remainingProducts.length === 0) {
    return null; // All products completed!
  }

  // Recommend based on logical progression - expanded for all 30 courses
  const progressionMap: Record<string, string[]> = {
    // Foundation progressions
    'P1': ['P2', 'P9', 'P6', 'P17'], // After launch, incorporate or get funding or start selling or product dev
    'P2': ['P5', 'P4', 'P7', 'P16'], // After incorporation, legal/finance/state benefits/HR
    'P3': ['P8', 'P4', 'P20'], // After funding knowledge, data room, finance, or fintech
    'P4': ['P3', 'P8', 'P20'], // After finance, funding or fintech
    'P5': ['P10', 'P2', 'P4'], // After legal, patents or compliance or finance
    'P6': ['P12', 'P11', 'P22'], // After sales, marketing and branding or e-commerce
    'P7': ['P9', 'P24', 'P7'], // After state schemes, govt schemes or manufacturing
    'P8': ['P3', 'P30'], // After data room, funding or international
    'P9': ['P3', 'P7', 'P24'], // After government schemes, private funding, state schemes, or manufacturing
    'P10': ['P5', 'P3', 'P21', 'P28'], // After patents, legal or funding or healthtech/biotech
    'P11': ['P12', 'P6', 'P14'], // After branding, marketing or sales or impact/CSR
    'P12': ['P6', 'P11', 'P22', 'P25'], // After marketing, sales or branding or e-commerce/edtech

    // Sector-Specific progressions (P13-P15)
    'P13': ['P18', 'P26', 'P24'], // Food processing -> operations, agritech, manufacturing
    'P14': ['P15', 'P11', 'P3'], // Impact/CSR -> sustainability, branding, funding
    'P15': ['P14', 'P23', 'P24'], // Sustainability -> impact, EV, manufacturing

    // Core Functions progressions (P16-P19)
    'P16': ['P18', 'P4', 'P5'], // HR -> operations, finance, legal
    'P17': ['P19', 'P6', 'P29'], // Product dev -> tech stack, sales, SaaS
    'P18': ['P16', 'P24', 'P22'], // Operations -> HR, manufacturing, e-commerce
    'P19': ['P17', 'P29', 'P20'], // Tech stack -> product dev, SaaS, fintech

    // High-Growth Sectors progressions (P20-P24)
    'P20': ['P4', 'P19', 'P30'], // FinTech -> finance, tech, international
    'P21': ['P10', 'P28', 'P5'], // HealthTech -> patents, biotech, legal
    'P22': ['P12', 'P18', 'P6'], // E-commerce -> marketing, operations, sales
    'P23': ['P15', 'P24', 'P19'], // EV -> sustainability, manufacturing, tech
    'P24': ['P18', 'P7', 'P23'], // Manufacturing -> operations, state schemes, EV

    // Emerging Sectors progressions (P25-P28)
    'P25': ['P12', 'P17', 'P19'], // EdTech -> marketing, product, tech
    'P26': ['P13', 'P18', 'P24'], // AgriTech -> food processing, operations, manufacturing
    'P27': ['P5', 'P4', 'P19'], // PropTech -> legal, finance, tech
    'P28': ['P21', 'P10', 'P3'], // Biotech -> healthtech, patents, funding

    // Advanced progressions (P29-P30)
    'P29': ['P19', 'P17', 'P30'], // SaaS -> tech, product, international
    'P30': ['P5', 'P4', 'P8'] // International -> legal, finance, data room
  };

  // Find recommendations based on last completed product
  const lastCompleted = completedProducts[completedProducts.length - 1];
  const nextOptions = progressionMap[lastCompleted] || [];

  for (const option of nextOptions) {
    if (remainingProducts.includes(option)) {
      return option;
    }
  }

  // Default to first remaining product
  return remainingProducts[0];
}