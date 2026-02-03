export interface Achievement {
  id: string;
  title: string;
  description: string;
  xp: number;
  badge: string;
  icon: string;
  category: 'learning' | 'streak' | 'completion' | 'social' | 'milestone';
  condition: AchievementCondition;
  isSecret?: boolean;
}

export interface AchievementCondition {
  type: 'lesson_complete' | 'streak_days' | 'course_complete' | 'portfolio_complete' | 
        'xp_earned' | 'products_owned' | 'community_posts' | 'referrals' | 'custom';
  value: number;
  metadata?: Record<string, any>;
}

export const ACHIEVEMENT_SYSTEM: Record<string, Achievement> = {
  // Starter Achievements
  "first_lesson": {
    id: "first_lesson",
    title: "Quick Starter",
    description: "Complete your first lesson",
    xp: 100,
    badge: "🚀",
    icon: "rocket",
    category: "learning",
    condition: { type: "lesson_complete", value: 1 }
  },
  
  "early_bird": {
    id: "early_bird",
    title: "Early Bird",
    description: "Complete a lesson before 8 AM",
    xp: 50,
    badge: "🌅",
    icon: "sunrise",
    category: "learning",
    condition: { type: "custom", value: 1, metadata: { time: "before_8am" } }
  },
  
  "night_owl": {
    id: "night_owl",
    title: "Night Owl",
    description: "Complete a lesson after 10 PM",
    xp: 50,
    badge: "🦉",
    icon: "moon",
    category: "learning",
    condition: { type: "custom", value: 1, metadata: { time: "after_10pm" } }
  },
  
  // Streak Achievements
  "week_streak": {
    id: "week_streak",
    title: "Consistent Learner",
    description: "Maintain a 7-day learning streak",
    xp: 500,
    badge: "🔥",
    icon: "flame",
    category: "streak",
    condition: { type: "streak_days", value: 7 }
  },
  
  "fortnight_streak": {
    id: "fortnight_streak",
    title: "Dedication Pays",
    description: "Maintain a 14-day learning streak",
    xp: 1000,
    badge: "💪",
    icon: "muscle",
    category: "streak",
    condition: { type: "streak_days", value: 14 }
  },
  
  "month_streak": {
    id: "month_streak",
    title: "Unstoppable Force",
    description: "Maintain a 30-day learning streak",
    xp: 2000,
    badge: "⚡",
    icon: "zap",
    category: "streak",
    condition: { type: "streak_days", value: 30 }
  },
  
  // Course Completion Achievements
  "course_complete": {
    id: "course_complete",
    title: "Course Champion",
    description: "Complete your first course",
    xp: 1000,
    badge: "🏆",
    icon: "trophy",
    category: "completion",
    condition: { type: "course_complete", value: 1 }
  },
  
  "p1_master": {
    id: "p1_master",
    title: "Launch Master",
    description: "Complete the 30-Day Launch Sprint",
    xp: 1500,
    badge: "🚀",
    icon: "rocket",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P1" } }
  },
  
  "funding_expert": {
    id: "funding_expert",
    title: "Funding Expert",
    description: "Complete the Funding Mastery course",
    xp: 2000,
    badge: "💰",
    icon: "dollar-sign",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P3" } }
  },

  "food_processing_expert": {
    id: "food_processing_expert",
    title: "Food Industry Expert",
    description: "Complete the Food Processing Mastery course",
    xp: 1500,
    badge: "🍽️",
    icon: "utensils",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P13" } }
  },

  "impact_leader": {
    id: "impact_leader",
    title: "Impact Leader",
    description: "Complete the Impact & CSR Mastery course",
    xp: 1500,
    badge: "💚",
    icon: "heart",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P14" } }
  },

  "sustainability_champion": {
    id: "sustainability_champion",
    title: "Sustainability Champion",
    description: "Complete the Carbon Credits course",
    xp: 1500,
    badge: "🌱",
    icon: "leaf",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P15" } }
  },

  "hr_master": {
    id: "hr_master",
    title: "People Leader",
    description: "Complete HR & Team Building Mastery",
    xp: 1500,
    badge: "👥",
    icon: "users",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P16" } }
  },

  "product_guru": {
    id: "product_guru",
    title: "Product Guru",
    description: "Complete Product Development course",
    xp: 1500,
    badge: "💡",
    icon: "lightbulb",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P17" } }
  },

  "ops_excellence": {
    id: "ops_excellence",
    title: "Operations Excellence",
    description: "Complete Operations & Supply Chain",
    xp: 1500,
    badge: "⚙️",
    icon: "settings",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P18" } }
  },

  "tech_architect": {
    id: "tech_architect",
    title: "Tech Architect",
    description: "Complete Technology Stack course",
    xp: 1500,
    badge: "🖥️",
    icon: "server",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P19" } }
  },

  "fintech_pioneer": {
    id: "fintech_pioneer",
    title: "FinTech Pioneer",
    description: "Complete FinTech Mastery course",
    xp: 2000,
    badge: "💳",
    icon: "credit-card",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P20" } }
  },

  "healthtech_innovator": {
    id: "healthtech_innovator",
    title: "HealthTech Innovator",
    description: "Complete HealthTech course",
    xp: 2000,
    badge: "🏥",
    icon: "heart-pulse",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P21" } }
  },

  "ecommerce_mogul": {
    id: "ecommerce_mogul",
    title: "E-commerce Mogul",
    description: "Complete E-commerce & D2C Mastery",
    xp: 1500,
    badge: "🛒",
    icon: "shopping-cart",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P22" } }
  },

  "ev_pioneer": {
    id: "ev_pioneer",
    title: "EV Pioneer",
    description: "Complete EV & Clean Mobility course",
    xp: 2000,
    badge: "⚡",
    icon: "zap",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P23" } }
  },

  "manufacturing_master": {
    id: "manufacturing_master",
    title: "Make in India Master",
    description: "Complete Manufacturing course",
    xp: 2000,
    badge: "🏭",
    icon: "factory",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P24" } }
  },

  "edtech_innovator": {
    id: "edtech_innovator",
    title: "EdTech Innovator",
    description: "Complete EdTech Mastery course",
    xp: 1500,
    badge: "🎓",
    icon: "graduation-cap",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P25" } }
  },

  "agritech_champion": {
    id: "agritech_champion",
    title: "AgriTech Champion",
    description: "Complete AgriTech & Farm-to-Fork",
    xp: 1500,
    badge: "🌾",
    icon: "wheat",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P26" } }
  },

  "proptech_expert": {
    id: "proptech_expert",
    title: "PropTech Expert",
    description: "Complete Real Estate & PropTech",
    xp: 1500,
    badge: "🏠",
    icon: "building",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P27" } }
  },

  "biotech_pioneer": {
    id: "biotech_pioneer",
    title: "Biotech Pioneer",
    description: "Complete Biotech & Life Sciences",
    xp: 2000,
    badge: "🧬",
    icon: "dna",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P28" } }
  },

  "saas_master": {
    id: "saas_master",
    title: "SaaS Master",
    description: "Complete SaaS & B2B Tech Mastery",
    xp: 1500,
    badge: "☁️",
    icon: "cloud",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P29" } }
  },

  "global_entrepreneur": {
    id: "global_entrepreneur",
    title: "Global Entrepreneur",
    description: "Complete International Expansion",
    xp: 2000,
    badge: "🌍",
    icon: "globe",
    category: "completion",
    condition: { type: "course_complete", value: 1, metadata: { course: "P30" } }
  },

  // Portfolio Achievements
  "portfolio_complete": {
    id: "portfolio_complete",
    title: "Startup Ready",
    description: "Complete all sections of your startup portfolio",
    xp: 2000,
    badge: "📋",
    icon: "clipboard-check",
    category: "milestone",
    condition: { type: "portfolio_complete", value: 100 }
  },
  
  "portfolio_half": {
    id: "portfolio_half",
    title: "Making Progress",
    description: "Complete 50% of your startup portfolio",
    xp: 500,
    badge: "📊",
    icon: "chart-bar",
    category: "milestone",
    condition: { type: "portfolio_complete", value: 50 }
  },
  
  // XP Milestones
  "xp_1000": {
    id: "xp_1000",
    title: "Rising Star",
    description: "Earn 1,000 XP",
    xp: 200,
    badge: "⭐",
    icon: "star",
    category: "milestone",
    condition: { type: "xp_earned", value: 1000 }
  },
  
  "xp_5000": {
    id: "xp_5000",
    title: "Experienced Founder",
    description: "Earn 5,000 XP",
    xp: 500,
    badge: "🌟",
    icon: "sparkles",
    category: "milestone",
    condition: { type: "xp_earned", value: 5000 }
  },
  
  "xp_10000": {
    id: "xp_10000",
    title: "Startup Veteran",
    description: "Earn 10,000 XP",
    xp: 1000,
    badge: "💫",
    icon: "comet",
    category: "milestone",
    condition: { type: "xp_earned", value: 10000 }
  },
  
  // Product Collection
  "collector_3": {
    id: "collector_3",
    title: "Knowledge Seeker",
    description: "Own 3 different courses",
    xp: 300,
    badge: "📚",
    icon: "books",
    category: "milestone",
    condition: { type: "products_owned", value: 3 }
  },
  
  "collector_6": {
    id: "collector_6",
    title: "Serious Learner",
    description: "Own 6 different courses",
    xp: 600,
    badge: "🎓",
    icon: "graduation-cap",
    category: "milestone",
    condition: { type: "products_owned", value: 6 }
  },
  
  "all_access_owner": {
    id: "all_access_owner",
    title: "All Access VIP",
    description: "Own the All Access Bundle",
    xp: 2000,
    badge: "👑",
    icon: "crown",
    category: "milestone",
    condition: { type: "custom", value: 1, metadata: { product: "ALL_ACCESS" } }
  },

  "sector_specialist": {
    id: "sector_specialist",
    title: "Sector Specialist",
    description: "Complete 3 sector-specific courses (P13-P28)",
    xp: 3000,
    badge: "🎯",
    icon: "target",
    category: "milestone",
    condition: { type: "products_owned", value: 3, metadata: { codes: ["P13","P14","P15","P20","P21","P22","P23","P24","P25","P26","P27","P28"] } }
  },

  "full_stack_founder": {
    id: "full_stack_founder",
    title: "Full-Stack Founder",
    description: "Complete all core function courses (P16-P19)",
    xp: 5000,
    badge: "🏅",
    icon: "award",
    category: "milestone",
    condition: { type: "course_complete", value: 4, metadata: { codes: ["P16","P17","P18","P19"] } }
  },

  "ultimate_founder": {
    id: "ultimate_founder",
    title: "Ultimate Founder",
    description: "Complete all 30 courses",
    xp: 10000,
    badge: "👑",
    icon: "crown",
    category: "milestone",
    condition: { type: "course_complete", value: 30 }
  },

  // Social & Community
  "community_starter": {
    id: "community_starter",
    title: "Community Starter",
    description: "Make your first post in the community",
    xp: 100,
    badge: "💬",
    icon: "message-circle",
    category: "social",
    condition: { type: "community_posts", value: 1 }
  },
  
  "helpful_founder": {
    id: "helpful_founder",
    title: "Helpful Founder",
    description: "Help 10 other founders in the community",
    xp: 500,
    badge: "🤝",
    icon: "handshake",
    category: "social",
    condition: { type: "custom", value: 10, metadata: { type: "helps_given" } }
  },
  
  "referral_champion": {
    id: "referral_champion",
    title: "Referral Champion",
    description: "Refer 3 friends who join the platform",
    xp: 1000,
    badge: "🎯",
    icon: "target",
    category: "social",
    condition: { type: "referrals", value: 3 }
  },
  
  // Secret Achievements
  "perfectionist": {
    id: "perfectionist",
    title: "Perfectionist",
    description: "Complete a course with 100% completion in all activities",
    xp: 1000,
    badge: "💎",
    icon: "gem",
    category: "completion",
    condition: { type: "custom", value: 100, metadata: { type: "perfect_completion" } },
    isSecret: true
  },
  
  "speed_demon": {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Complete 5 lessons in a single day",
    xp: 500,
    badge: "⚡",
    icon: "zap",
    category: "learning",
    condition: { type: "custom", value: 5, metadata: { type: "lessons_per_day" } },
    isSecret: true
  }
};

// Helper function to check if an achievement is unlocked
export function checkAchievementUnlocked(
  achievement: Achievement,
  userStats: {
    lessonsCompleted: number;
    streakDays: number;
    coursesCompleted: string[];
    portfolioCompletion: number;
    totalXP: number;
    productsOwned: string[];
    communityPosts: number;
    referrals: number;
    customData?: Record<string, any>;
  }
): boolean {
  const { condition } = achievement;
  
  switch (condition.type) {
    case 'lesson_complete':
      return userStats.lessonsCompleted >= condition.value;
      
    case 'streak_days':
      return userStats.streakDays >= condition.value;
      
    case 'course_complete':
      if (condition.metadata?.course) {
        return userStats.coursesCompleted.includes(condition.metadata.course);
      }
      return userStats.coursesCompleted.length >= condition.value;
      
    case 'portfolio_complete':
      return userStats.portfolioCompletion >= condition.value;
      
    case 'xp_earned':
      return userStats.totalXP >= condition.value;
      
    case 'products_owned':
      return userStats.productsOwned.length >= condition.value;
      
    case 'community_posts':
      return userStats.communityPosts >= condition.value;
      
    case 'referrals':
      return userStats.referrals >= condition.value;
      
    case 'custom':
      // Handle custom conditions based on metadata
      if (condition.metadata?.product === 'ALL_ACCESS') {
        return userStats.productsOwned.includes('ALL_ACCESS');
      }
      // Add more custom condition checks as needed
      return false;
      
    default:
      return false;
  }
}

// Get next achievable achievements for a user
export function getNextAchievements(
  userStats: Parameters<typeof checkAchievementUnlocked>[1],
  unlockedAchievements: string[]
): Achievement[] {
  const achievements = Object.values(ACHIEVEMENT_SYSTEM);
  const locked = achievements.filter(a => !unlockedAchievements.includes(a.id));
  
  // Calculate progress for each locked achievement
  const withProgress = locked.map(achievement => {
    let progress = 0;
    let target = achievement.condition.value;
    
    switch (achievement.condition.type) {
      case 'lesson_complete':
        progress = userStats.lessonsCompleted;
        break;
      case 'streak_days':
        progress = userStats.streakDays;
        break;
      case 'xp_earned':
        progress = userStats.totalXP;
        break;
      case 'products_owned':
        progress = userStats.productsOwned.length;
        break;
      case 'portfolio_complete':
        progress = userStats.portfolioCompletion;
        break;
    }
    
    const progressPercent = Math.min((progress / target) * 100, 100);
    
    return {
      ...achievement,
      progress,
      target,
      progressPercent
    };
  });
  
  // Return top 3 closest to completion, excluding secret achievements
  return withProgress
    .filter(a => !a.isSecret)
    .sort((a, b) => b.progressPercent - a.progressPercent)
    .slice(0, 3);
}