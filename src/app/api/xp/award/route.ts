import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { 
  XP_EVENTS, 
  XPEventType, 
  calculateLevel, 
  calculateXPForNextLevel, 
  getLevelTitle,
  checkStreakBonus,
  checkMilestoneBonus
} from '@/lib/xp';
import { getNewBadges, BADGES } from '@/lib/badges';

export const dynamic = 'force-dynamic';

interface XPAwardRequest {
  eventType: XPEventType;
  metadata?: {
    day?: number;
    lessonId?: string;
    productCode?: string;
    moduleId?: string;
    activityId?: string;
  };
}

// POST - Award XP for an event
export async function POST(request: NextRequest) {
  try {
    const { eventType, metadata }: XPAwardRequest = await request.json();

    if (!eventType || !XP_EVENTS[eventType]) {
      return NextResponse.json(
        { error: 'Invalid event type' },
        { status: 400 }
      );
    }

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current user stats
    const { data: userData, error: userDataError } = await supabase
      .from('User')
      .select('totalXP, currentStreak, longestStreak, badges, createdAt')
      .eq('id', user.id)
      .single();

    if (userDataError || !userData) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const currentTotalXP = userData.totalXP || 0;
    const currentLevel = calculateLevel(currentTotalXP);
    const event = XP_EVENTS[eventType];
    
    // Calculate base XP and bonus XP
    let baseXP = event.points;
    let bonusXP = 0;
    let bonusDescriptions: string[] = [];

    // Check for streak bonuses
    if (metadata?.day && userData.currentStreak) {
      const streakBonus = checkStreakBonus(userData.currentStreak);
      if (streakBonus) {
        const streakEvent = XP_EVENTS[streakBonus];
        bonusXP += streakEvent.points;
        bonusDescriptions.push(streakEvent.description);
      }
    }

    // Check for milestone bonuses
    if (metadata?.day) {
      const milestoneBonus = checkMilestoneBonus(metadata.day);
      if (milestoneBonus) {
        const milestoneEvent = XP_EVENTS[milestoneBonus];
        bonusXP += milestoneEvent.points;
        bonusDescriptions.push(milestoneEvent.description);
      }
    }

    const totalXPAwarded = baseXP + bonusXP;
    const newTotalXP = currentTotalXP + totalXPAwarded;
    const newLevel = calculateLevel(newTotalXP);
    const isLevelUp = newLevel > currentLevel;

    // Record XP event
    const { error: xpEventError } = await supabase
      .from('XPEvent')
      .insert({
        userId: user.id,
        type: eventType,
        points: totalXPAwarded,
        description: event.description,
        metadata: metadata || {},
      });

    if (xpEventError) {
      logger.error('Error recording XP event:', xpEventError);
      return NextResponse.json(
        { error: 'Failed to record XP' },
        { status: 500 }
      );
    }

    // Update user's total XP and other stats
    const updateData: any = {
      totalXP: newTotalXP,
    };

    // Update streak if applicable
    if (eventType === 'DAILY_LESSON_COMPLETE') {
      const today = new Date();
      const lastActivity = userData.createdAt ? new Date(userData.createdAt) : today;
      const daysDiff = Math.floor((today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === 1) {
        // Continue streak
        updateData.currentStreak = (userData.currentStreak || 0) + 1;
        updateData.longestStreak = Math.max(updateData.currentStreak, userData.longestStreak || 0);
      } else if (daysDiff === 0) {
        // Same day, maintain streak
        updateData.currentStreak = userData.currentStreak || 1;
      } else {
        // Streak broken, reset
        updateData.currentStreak = 1;
      }
    }

    const { error: updateError } = await supabase
      .from('User')
      .update(updateData)
      .eq('id', user.id);

    if (updateError) {
      logger.error('Error updating user stats:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user stats' },
        { status: 500 }
      );
    }

    // Check for new badges
    const userStats = {
      currentDay: 1,
      currentStreak: updateData.currentStreak || userData.currentStreak || 0,
      totalXP: newTotalXP,
      communityPosts: 0, // TODO: Get from community posts table
      helpGiven: 0, // TODO: Get from community activity
      perfectDays: 0, // TODO: Calculate perfect completion days
      joinedAt: new Date(userData.createdAt || Date.now()),
    };

    const currentBadges = (userData.badges as string[]) || [];
    const newBadges = getNewBadges(currentBadges, userStats);
    const badgesAwarded: Array<{
      id: string;
      name: string;
      description: string;
      xpReward: number;
    }> = [];

    let additionalXP = 0;

    // Award new badges and their XP
    if (newBadges.length > 0) {
      const updatedBadges = [...currentBadges, ...newBadges];
      
      // Calculate additional XP from badge rewards
      newBadges.forEach(badgeId => {
        const badge = BADGES[badgeId];
        additionalXP += badge.xpReward;
        badgesAwarded.push({
          id: badgeId,
          name: badge.name,
          description: badge.description,
          xpReward: badge.xpReward,
        });
      });

      // Update badges and total XP (if badge XP rewards exist)
      const finalTotalXP = newTotalXP + additionalXP;
      
      await supabase
        .from('User')
        .update({
          badges: updatedBadges,
          totalXP: finalTotalXP
        })
        .eq('id', user.id);

      // Record badge XP events
      if (additionalXP > 0) {
        await supabase
          .from('XPEvent')
          .insert({
            userId: user.id,
            type: 'badge_reward',
            points: additionalXP,
            description: `Badge rewards: ${newBadges.join(', ')}`,
            metadata: { badges: newBadges },
          });
      }
    }

    const finalTotalXP = newTotalXP + additionalXP;
    const finalLevel = calculateLevel(finalTotalXP);
    const levelProgress = calculateXPForNextLevel(finalTotalXP);

    // Return comprehensive response
    return NextResponse.json({
      success: true,
      xp: {
        points: baseXP,
        bonusXP: bonusXP + additionalXP,
        description: event.description,
        bonusDescriptions,
        previousTotal: currentTotalXP,
        newTotal: finalTotalXP,
      },
      level: {
        previous: currentLevel,
        current: finalLevel,
        isLevelUp: finalLevel > currentLevel,
        title: getLevelTitle(finalLevel),
        progress: levelProgress,
      },
      badges: {
        unlocked: badgesAwarded,
        total: currentBadges.length + newBadges.length,
      },
      streak: {
        current: updateData.currentStreak || userData.currentStreak || 0,
        longest: updateData.longestStreak || userData.longestStreak || 0,
      },
    });

  } catch (error) {
    logger.error('XP award API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET - Get available XP events (for debugging/admin)
export async function GET() {
  try {
    const events = Object.entries(XP_EVENTS).map(([key, event]) => ({
      type: key,
      points: event.points,
      description: event.description,
    }));

    return NextResponse.json({
      events,
      total: events.length,
    });
  } catch (error) {
    logger.error('XP events API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}