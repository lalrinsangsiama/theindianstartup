import { 
  Rocket, 
  Search, 
  Palette, 
  Shield, 
  Code, 
  Users, 
  Award, 
  DollarSign, 
  FileText, 
  Target,
  Zap,
  Trophy,
  Star,
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  CheckCircle,
  Gift,
  Crown
} from 'lucide-react';

// Badge definitions with achievement criteria
export const BADGES = {
  // Journey Milestones
  STARTER: {
    id: 'starter',
    name: 'Starter',
    description: 'Complete Day 1 of your journey',
    icon: Rocket,
    color: 'bg-blue-500',
    criteria: { type: 'day_complete', value: 1 },
    xpReward: 0, // Already get XP for completing day
  },
  RESEARCHER: {
    id: 'researcher',
    name: 'Researcher',
    description: 'Complete market research & customer interviews',
    icon: Search,
    color: 'bg-purple-500',
    criteria: { type: 'day_complete', value: 4 },
    xpReward: 25,
  },
  BRAND_BUILDER: {
    id: 'brand_builder',
    name: 'Brand Builder',
    description: 'Secure domain and create logo',
    icon: Palette,
    color: 'bg-pink-500',
    criteria: { type: 'day_complete', value: 8 },
    xpReward: 30,
  },
  LEGALLY_READY: {
    id: 'legally_ready',
    name: 'Legally Ready',
    description: 'Complete compliance planning',
    icon: Shield,
    color: 'bg-green-500',
    criteria: { type: 'day_complete', value: 10 },
    xpReward: 40,
  },
  MVP_MASTER: {
    id: 'mvp_master',
    name: 'MVP Master',
    description: 'Launch working prototype',
    icon: Code,
    color: 'bg-indigo-500',
    criteria: { type: 'day_complete', value: 14 },
    xpReward: 50,
  },
  TESTING_CHAMPION: {
    id: 'testing_champion',
    name: 'Testing Champion',
    description: 'Get 10+ user feedback',
    icon: Users,
    color: 'bg-orange-500',
    criteria: { type: 'day_complete', value: 17 },
    xpReward: 40,
  },
  COMPLIANCE_HERO: {
    id: 'compliance_hero',
    name: 'Compliance Hero',
    description: 'Complete all regulatory tasks',
    icon: Award,
    color: 'bg-red-500',
    criteria: { type: 'day_complete', value: 20 },
    xpReward: 50,
  },
  SALES_STARTER: {
    id: 'sales_starter',
    name: 'Sales Starter',
    description: 'Get first paying customer',
    icon: DollarSign,
    color: 'bg-yellow-500',
    criteria: { type: 'day_complete', value: 24 },
    xpReward: 75,
  },
  PITCH_PERFECT: {
    id: 'pitch_perfect',
    name: 'Pitch Perfect',
    description: 'Complete pitch deck',
    icon: FileText,
    color: 'bg-teal-500',
    criteria: { type: 'day_complete', value: 29 },
    xpReward: 60,
  },
  LAUNCH_LEGEND: {
    id: 'launch_legend',
    name: 'Launch Legend',
    description: 'Complete all 30 days',
    icon: Target,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    criteria: { type: 'day_complete', value: 30 },
    xpReward: 100,
  },
  
  // Streak Badges
  CONSISTENT_STARTER: {
    id: 'consistent_starter',
    name: 'Consistent Starter',
    description: 'Maintain a 3-day streak',
    icon: Zap,
    color: 'bg-blue-400',
    criteria: { type: 'streak', value: 3 },
    xpReward: 0, // Already get XP for streak
  },
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: Calendar,
    color: 'bg-purple-400',
    criteria: { type: 'streak', value: 7 },
    xpReward: 0,
  },
  UNSTOPPABLE: {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Maintain a 14-day streak',
    icon: TrendingUp,
    color: 'bg-orange-400',
    criteria: { type: 'streak', value: 14 },
    xpReward: 0,
  },
  
  // XP Badges
  XP_COLLECTOR: {
    id: 'xp_collector',
    name: 'XP Collector',
    description: 'Earn 500 total XP',
    icon: Star,
    color: 'bg-yellow-400',
    criteria: { type: 'xp', value: 500 },
    xpReward: 50,
  },
  XP_MASTER: {
    id: 'xp_master',
    name: 'XP Master',
    description: 'Earn 1000 total XP',
    icon: Trophy,
    color: 'bg-yellow-500',
    criteria: { type: 'xp', value: 1000 },
    xpReward: 100,
  },
  XP_LEGEND: {
    id: 'xp_legend',
    name: 'XP Legend',
    description: 'Earn 2500 total XP',
    icon: Crown,
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    criteria: { type: 'xp', value: 2500 },
    xpReward: 200,
  },
  
  // Community Badges
  COMMUNITY_STARTER: {
    id: 'community_starter',
    name: 'Community Starter',
    description: 'Make your first community post',
    icon: MessageSquare,
    color: 'bg-green-400',
    criteria: { type: 'community_post', value: 1 },
    xpReward: 0, // Already get XP for posting
  },
  HELPFUL_FOUNDER: {
    id: 'helpful_founder',
    name: 'Helpful Founder',
    description: 'Help 5 fellow founders',
    icon: Heart,
    color: 'bg-red-400',
    criteria: { type: 'help_given', value: 5 },
    xpReward: 30,
  },
  
  // Special Badges
  EARLY_ADOPTER: {
    id: 'early_adopter',
    name: 'Early Adopter',
    description: 'Join during launch month',
    icon: Gift,
    color: 'bg-gradient-to-r from-purple-400 to-pink-400',
    criteria: { type: 'special', value: 'early_adopter' },
    xpReward: 50,
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all tasks every day for 7 days',
    icon: CheckCircle,
    color: 'bg-gradient-to-r from-green-400 to-blue-500',
    criteria: { type: 'perfect_week', value: 7 },
    xpReward: 75,
  },
} as const;

export type BadgeId = keyof typeof BADGES;
export type BadgeDefinition = typeof BADGES[BadgeId];

// Check if user has earned a badge
export const checkBadgeEligibility = (
  badgeId: BadgeId,
  userStats: {
    currentDay: number;
    currentStreak: number;
    totalXP: number;
    communityPosts?: number;
    helpGiven?: number;
    perfectDays?: number;
    joinedAt?: Date;
  }
): boolean => {
  const badge = BADGES[badgeId];
  const { type, value } = badge.criteria;
  
  switch (type) {
    case 'day_complete':
      return userStats.currentDay >= value;
      
    case 'streak':
      return userStats.currentStreak >= value;
      
    case 'xp':
      return userStats.totalXP >= value;
      
    case 'community_post':
      return (userStats.communityPosts || 0) >= value;
      
    case 'help_given':
      return (userStats.helpGiven || 0) >= value;
      
    case 'perfect_week':
      return (userStats.perfectDays || 0) >= value;
      
    case 'special':
      if (value === 'early_adopter' && userStats.joinedAt) {
        // Check if joined within first month of launch
        const launchDate = new Date('2024-02-01'); // Set your launch date
        const oneMonthAfterLaunch = new Date(launchDate);
        oneMonthAfterLaunch.setMonth(oneMonthAfterLaunch.getMonth() + 1);
        return userStats.joinedAt <= oneMonthAfterLaunch;
      }
      return false;
      
    default:
      return false;
  }
};

// Get all badges user is eligible for but hasn't earned yet
export const getNewBadges = (
  currentBadges: string[],
  userStats: {
    currentDay: number;
    currentStreak: number;
    totalXP: number;
    communityPosts?: number;
    helpGiven?: number;
    perfectDays?: number;
    joinedAt?: Date;
  }
): BadgeId[] => {
  const newBadges: BadgeId[] = [];
  
  Object.keys(BADGES).forEach((badgeId) => {
    if (!currentBadges.includes(badgeId)) {
      if (checkBadgeEligibility(badgeId as BadgeId, userStats)) {
        newBadges.push(badgeId as BadgeId);
      }
    }
  });
  
  return newBadges;
};

// Get badge progress for display
export const getBadgeProgress = (
  badgeId: BadgeId,
  userStats: {
    currentDay: number;
    currentStreak: number;
    totalXP: number;
    communityPosts?: number;
    helpGiven?: number;
    perfectDays?: number;
  }
): { current: number; required: number; percentage: number } => {
  const badge = BADGES[badgeId];
  const { type, value } = badge.criteria;
  let current = 0;
  
  switch (type) {
    case 'day_complete':
      current = userStats.currentDay;
      break;
    case 'streak':
      current = userStats.currentStreak;
      break;
    case 'xp':
      current = userStats.totalXP;
      break;
    case 'community_post':
      current = userStats.communityPosts || 0;
      break;
    case 'help_given':
      current = userStats.helpGiven || 0;
      break;
    case 'perfect_week':
      current = userStats.perfectDays || 0;
      break;
    default:
      current = 0;
  }
  
  const percentage = Math.min(100, Math.round((current / (value as number)) * 100));
  
  return {
    current,
    required: value as number,
    percentage,
  };
};

// Sort badges by importance/rarity
export const sortBadges = (badges: BadgeId[]): BadgeId[] => {
  const rarityOrder = [
    'LAUNCH_LEGEND',
    'XP_LEGEND',
    'PERFECTIONIST',
    'EARLY_ADOPTER',
    'UNSTOPPABLE',
    'XP_MASTER',
    'COMPLIANCE_HERO',
    'SALES_STARTER',
    'PITCH_PERFECT',
    'TESTING_CHAMPION',
    'MVP_MASTER',
    'WEEK_WARRIOR',
    'XP_COLLECTOR',
    'HELPFUL_FOUNDER',
    'LEGALLY_READY',
    'BRAND_BUILDER',
    'RESEARCHER',
    'CONSISTENT_STARTER',
    'COMMUNITY_STARTER',
    'STARTER',
  ];
  
  return badges.sort((a, b) => {
    const aIndex = rarityOrder.indexOf(a);
    const bIndex = rarityOrder.indexOf(b);
    return aIndex - bIndex;
  });
};