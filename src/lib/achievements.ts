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