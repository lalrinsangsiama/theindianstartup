// XP Event Types and Points
export const XP_EVENTS = {
  // Daily Progress
  DAILY_LESSON_START: { points: 10, type: 'daily_lesson_start', description: 'Started daily lesson' },
  DAILY_LESSON_COMPLETE: { points: 20, type: 'daily_lesson_complete', description: 'Completed daily lesson' },
  TASK_COMPLETE: { points: 5, type: 'task_complete', description: 'Completed a task' },
  ALL_TASKS_COMPLETE: { points: 15, type: 'all_tasks_complete', description: 'Completed all tasks for the day' },
  EVENING_REFLECTION: { points: 10, type: 'evening_reflection', description: 'Completed evening reflection' },
  
  // Streak Bonuses
  STREAK_3_DAYS: { points: 25, type: 'streak_3_days', description: 'Maintained 3-day streak' },
  STREAK_7_DAYS: { points: 50, type: 'streak_7_days', description: 'Maintained 7-day streak' },
  STREAK_14_DAYS: { points: 100, type: 'streak_14_days', description: 'Maintained 14-day streak' },
  STREAK_30_DAYS: { points: 200, type: 'streak_30_days', description: 'Completed 30-day journey' },
  
  // Milestone Achievements
  WEEK_COMPLETE: { points: 100, type: 'week_complete', description: 'Completed a full week' },
  HALFWAY_POINT: { points: 150, type: 'halfway_point', description: 'Reached Day 15 - Halfway!' },
  JOURNEY_COMPLETE: { points: 500, type: 'journey_complete', description: 'Completed 30-day journey' },
  
  // Community Engagement
  FIRST_POST: { points: 20, type: 'first_post', description: 'Created first community post' },
  HELP_PEER: { points: 10, type: 'help_peer', description: 'Helped another founder' },
  RECEIVE_HELP: { points: 5, type: 'receive_help', description: 'Received helpful feedback' },
  SUCCESS_STORY: { points: 50, type: 'success_story', description: 'Shared success story' },
  
  // Ecosystem Contributions
  ECOSYSTEM_REVIEW: { points: 30, type: 'ecosystem_review', description: 'Added ecosystem review' },
  ECOSYSTEM_LISTING: { points: 50, type: 'ecosystem_listing', description: 'Added ecosystem listing' },
  
  // Announcement Engagement
  ANNOUNCEMENT_CREATE: { points: 40, type: 'announcement_create', description: 'Created announcement' },
  ANNOUNCEMENT_SAVE: { points: 5, type: 'announcement_save', description: 'Saved announcement' },
  ANNOUNCEMENT_CLICK: { points: 2, type: 'announcement_click', description: 'Engaged with announcement' },
  
  // Portfolio Progress
  PORTFOLIO_SECTION: { points: 25, type: 'portfolio_section', description: 'Completed portfolio section' },
  PORTFOLIO_COMPLETE: { points: 200, type: 'portfolio_complete', description: 'Completed entire portfolio' },
  
  // Special Achievements
  ONBOARDING_COMPLETE: { points: 50, type: 'onboarding_complete', description: 'Completed onboarding' },
  PROFILE_COMPLETE: { points: 30, type: 'profile_complete', description: 'Completed profile setup' },
  FIRST_PAYMENT: { points: 100, type: 'first_payment', description: 'Became a paid member' },
} as const;

export type XPEventType = keyof typeof XP_EVENTS;

// XP Level Calculation
export const calculateLevel = (totalXP: number): number => {
  // Level progression: 100 XP per level with increasing requirements
  // Level 1: 0-100 XP
  // Level 2: 100-250 XP (+150)
  // Level 3: 250-450 XP (+200)
  // Level 4: 450-700 XP (+250)
  // And so on...
  
  let level = 1;
  let xpRequired = 100;
  let xpAccumulated = 0;
  
  while (xpAccumulated + xpRequired <= totalXP) {
    xpAccumulated += xpRequired;
    level++;
    xpRequired += 50; // Each level requires 50 more XP than the previous
  }
  
  return level;
};

// Calculate XP needed for next level
export const calculateXPForNextLevel = (totalXP: number): { current: number; required: number; percentage: number } => {
  const level = calculateLevel(totalXP);
  let xpRequired = 100;
  let xpAccumulated = 0;
  
  // Calculate total XP needed to reach current level
  for (let i = 1; i < level; i++) {
    xpAccumulated += xpRequired;
    xpRequired += 50;
  }
  
  const xpInCurrentLevel = totalXP - xpAccumulated;
  const xpNeededForNextLevel = xpRequired;
  const percentage = Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100);
  
  return {
    current: xpInCurrentLevel,
    required: xpNeededForNextLevel,
    percentage,
  };
};

// Get level title based on XP level
export const getLevelTitle = (level: number): string => {
  const titles = [
    'Startup Dreamer',      // Level 1
    'Idea Explorer',        // Level 2
    'Market Researcher',    // Level 3
    'Brand Builder',        // Level 4
    'MVP Creator',          // Level 5
    'Product Launcher',     // Level 6
    'Growth Hacker',        // Level 7
    'Revenue Generator',    // Level 8
    'Scale Master',         // Level 9
    'Startup Veteran',      // Level 10
    'Serial Entrepreneur',  // Level 11+
  ];
  
  return titles[Math.min(level - 1, titles.length - 1)];
};

// Check if user should receive streak bonus
export const checkStreakBonus = (currentStreak: number): XPEventType | null => {
  switch (currentStreak) {
    case 3:
      return 'STREAK_3_DAYS';
    case 7:
      return 'STREAK_7_DAYS';
    case 14:
      return 'STREAK_14_DAYS';
    case 30:
      return 'STREAK_30_DAYS';
    default:
      return null;
  }
};

// Check if user should receive milestone bonus
export const checkMilestoneBonus = (currentDay: number): XPEventType | null => {
  switch (currentDay) {
    case 7:
      return 'WEEK_COMPLETE';
    case 14:
      return 'WEEK_COMPLETE';
    case 15:
      return 'HALFWAY_POINT';
    case 21:
      return 'WEEK_COMPLETE';
    case 28:
      return 'WEEK_COMPLETE';
    case 30:
      return 'JOURNEY_COMPLETE';
    default:
      return null;
  }
};

// Format XP with animation data
export interface XPAnimationData {
  points: number;
  title: string;
  description: string;
  level?: {
    before: number;
    after: number;
    isLevelUp: boolean;
  };
}

export const prepareXPAnimation = (
  eventType: XPEventType,
  previousTotalXP: number,
  newTotalXP: number
): XPAnimationData => {
  const event = XP_EVENTS[eventType];
  const levelBefore = calculateLevel(previousTotalXP);
  const levelAfter = calculateLevel(newTotalXP);
  
  return {
    points: event.points,
    title: `+${event.points} XP`,
    description: event.description,
    level: {
      before: levelBefore,
      after: levelAfter,
      isLevelUp: levelAfter > levelBefore,
    },
  };
};