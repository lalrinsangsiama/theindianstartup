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
    products: ['P1', 'P2', 'P9'],
    estimatedDuration: '3 months',
    difficulty: 'beginner',
    outcomes: [
      'Launch your first startup',
      'Understand legal basics',
      'Access government funding'
    ],
    icon: 'rocket'
  },
  
  experienced_founder: {
    id: 'experienced_founder',
    name: 'Scaling Expert Path',
    description: 'For founders ready to scale their existing startup',
    products: ['P3', 'P6', 'P12', 'P8'],
    estimatedDuration: '4 months',
    difficulty: 'advanced',
    outcomes: [
      'Master advanced funding',
      'Build scalable sales engine',
      'Create investor-ready data room'
    ],
    icon: 'trending-up'
  },
  
  // Focus-based paths
  tech_focused: {
    id: 'tech_focused',
    name: 'Tech Innovator Path',
    description: 'Build a technology-driven startup',
    products: ['P1', 'P10', 'P4', 'P5'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Launch tech product',
      'Protect intellectual property',
      'Build robust tech infrastructure'
    ],
    icon: 'cpu'
  },
  
  sales_focused: {
    id: 'sales_focused',
    name: 'Revenue Generator Path',
    description: 'Master sales and revenue generation',
    products: ['P6', 'P12', 'P3', 'P11'],
    estimatedDuration: '4 months',
    difficulty: 'intermediate',
    outcomes: [
      'Build sales machine',
      'Master marketing channels',
      'Create strong brand presence'
    ],
    icon: 'dollar-sign'
  },
  
  // Stage-based paths
  idea_stage: {
    id: 'idea_stage',
    name: 'Idea to MVP Path',
    description: 'Transform your idea into a working product',
    products: ['P1', 'P9', 'P2'],
    estimatedDuration: '2.5 months',
    difficulty: 'beginner',
    outcomes: [
      'Validate your idea',
      'Build MVP',
      'Get first customers'
    ],
    icon: 'lightbulb'
  },
  
  growth_stage: {
    id: 'growth_stage',
    name: 'Growth Acceleration Path',
    description: 'Scale from MVP to market leader',
    products: ['P3', 'P6', 'P12', 'P11'],
    estimatedDuration: '5 months',
    difficulty: 'intermediate',
    outcomes: [
      'Raise funding',
      'Scale sales',
      'Build brand authority'
    ],
    icon: 'chart-line'
  },
  
  // Industry-specific paths
  ecommerce_path: {
    id: 'ecommerce_path',
    name: 'E-commerce Mastery Path',
    description: 'Build and scale an e-commerce business',
    products: ['P1', 'P12', 'P6', 'P4'],
    estimatedDuration: '4 months',
    difficulty: 'intermediate',
    outcomes: [
      'Launch online store',
      'Master digital marketing',
      'Optimize operations'
    ],
    icon: 'shopping-cart'
  },
  
  saas_path: {
    id: 'saas_path',
    name: 'SaaS Builder Path',
    description: 'Create a successful SaaS business',
    products: ['P1', 'P10', 'P3', 'P6'],
    estimatedDuration: '5 months',
    difficulty: 'advanced',
    outcomes: [
      'Build SaaS product',
      'Protect IP',
      'Scale recurring revenue'
    ],
    icon: 'cloud'
  },
  
  // Comprehensive paths
  complete_founder: {
    id: 'complete_founder',
    name: 'Complete Founder Journey',
    description: 'Master every aspect of building a startup',
    products: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'],
    estimatedDuration: '12 months',
    difficulty: 'advanced',
    outcomes: [
      'End-to-end startup mastery',
      'Multiple funding options',
      'Complete business toolkit'
    ],
    icon: 'crown'
  },
  
  // Fast track paths
  fast_track_funding: {
    id: 'fast_track_funding',
    name: 'Fast Track to Funding',
    description: 'Get funded in the shortest time possible',
    products: ['P9', 'P3', 'P8'],
    estimatedDuration: '2 months',
    difficulty: 'intermediate',
    outcomes: [
      'Access government grants',
      'Prepare for investors',
      'Create data room'
    ],
    icon: 'zap'
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
  }
  
  // Add based on business stage
  switch (user.businessStage) {
    case 'idea':
      recommendedProducts.add('P1');
      recommendedProducts.add('P9'); // Government schemes
      break;
    case 'mvp':
      recommendedProducts.add('P6'); // Sales & GTM
      recommendedProducts.add('P12'); // Marketing
      break;
    case 'growth':
      recommendedProducts.add('P3'); // Funding
      recommendedProducts.add('P6'); // Sales
      recommendedProducts.add('P12'); // Marketing
      break;
    case 'scale':
      recommendedProducts.add('P8'); // Data Room
      recommendedProducts.add('P4'); // Finance Stack
      recommendedProducts.add('P5'); // Legal Stack
      break;
  }
  
  // Add based on primary focus
  switch (user.primaryFocus) {
    case 'tech':
      recommendedProducts.add('P10'); // Patents
      recommendedProducts.add('P4'); // Finance
      break;
    case 'sales':
    case 'marketing':
      recommendedProducts.add('P6'); // Sales
      recommendedProducts.add('P12'); // Marketing
      recommendedProducts.add('P11'); // Branding & PR
      break;
    case 'finance':
      recommendedProducts.add('P4'); // Finance Stack
      recommendedProducts.add('P3'); // Funding
      break;
    case 'operations':
      recommendedProducts.add('P2'); // Compliance
      recommendedProducts.add('P5'); // Legal
      recommendedProducts.add('P7'); // State schemes
      break;
  }
  
  // Add based on funding status
  if (user.fundingStatus === 'seeking') {
    recommendedProducts.add('P3'); // Funding
    recommendedProducts.add('P8'); // Data Room
    recommendedProducts.add('P9'); // Government schemes
  }
  
  // Convert to array and limit to 6 products max for manageable path
  return Array.from(recommendedProducts).slice(0, 6);
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
  const allProducts = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'];
  const remainingProducts = allProducts.filter(p => !completedProducts.includes(p));
  
  if (remainingProducts.length === 0) {
    return null; // All products completed!
  }
  
  // Recommend based on logical progression
  const progressionMap: Record<string, string[]> = {
    'P1': ['P2', 'P9', 'P6'], // After launch, incorporate or get funding or start selling
    'P2': ['P5', 'P4', 'P7'], // After incorporation, legal/finance/state benefits
    'P3': ['P8', 'P4'], // After funding knowledge, data room and finance
    'P6': ['P12', 'P11'], // After sales, marketing and branding
    'P9': ['P3', 'P7'], // After government schemes, try private funding or state schemes
    'P10': ['P5', 'P3'], // After patents, legal protection and funding
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