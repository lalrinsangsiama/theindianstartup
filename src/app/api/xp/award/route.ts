import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { XP_EVENTS, XPEventType, calculateLevel, getLevelTitle } from '@/lib/xp';
import { getNewBadges, BADGES } from '@/lib/badges';
import { EmailAutomation } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

// POST - Award XP to user
export async function POST(request: NextRequest) {
  try {
    const { eventType, metadata } = await request.json();

    // Get authenticated user
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate event type
    if (!XP_EVENTS[eventType as XPEventType]) {
      return NextResponse.json(
        { error: 'Invalid XP event type' },
        { status: 400 }
      );
    }

    const xpEvent = XP_EVENTS[eventType as XPEventType];

    // Get current user stats
    const { data: currentUser, error: userFetchError } = await supabase
      .from('users')
      .select('total_xp, current_streak, current_day, badges')
      .eq('id', user.id)
      .single();

    if (userFetchError || !currentUser) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const previousXP = currentUser.total_xp || 0;
    const newTotalXP = previousXP + xpEvent.points;
    const previousLevel = calculateLevel(previousXP);
    const newLevel = calculateLevel(newTotalXP);
    const isLevelUp = newLevel > previousLevel;

    // Create XP event record
    const { error: xpEventError } = await supabase
      .from('xp_events')
      .insert({
        user_id: user.id,
        type: xpEvent.type,
        points: xpEvent.points,
        description: xpEvent.description,
        created_at: new Date().toISOString(),
      });

    if (xpEventError) {
      console.error('Error creating XP event:', xpEventError);
      return NextResponse.json(
        { error: 'Failed to record XP event' },
        { status: 500 }
      );
    }

    // Update user's total XP
    const { error: updateError } = await supabase
      .from('users')
      .update({ total_xp: newTotalXP })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user XP:', updateError);
      return NextResponse.json(
        { error: 'Failed to update user XP' },
        { status: 500 }
      );
    }

    // Check for new badges
    const currentBadges = currentUser.badges || [];
    
    // Get additional user stats for badge checking
    const { count: communityPosts } = await supabase
      .from('posts')
      .select('id', { count: 'exact' })
      .eq('author_id', user.id);

    const userStats = {
      currentDay: currentUser.current_day || 1,
      currentStreak: currentUser.current_streak || 0,
      totalXP: newTotalXP,
      communityPosts: communityPosts || 0,
      helpGiven: 0, // TODO: Track this in database
      perfectDays: 0, // TODO: Track this in database
      joinedAt: new Date(), // TODO: Get from user created_at
    };

    const newBadges = getNewBadges(currentBadges, userStats);
    let badgeXPBonus = 0;
    const unlockedBadges = [];

    // Award new badges and calculate bonus XP
    if (newBadges.length > 0) {
      for (const badgeId of newBadges) {
        const badge = BADGES[badgeId];
        badgeXPBonus += badge.xpReward;
        unlockedBadges.push({
          id: badgeId,
          name: badge.name,
          description: badge.description,
          xpReward: badge.xpReward,
        });
      }

      // Update user badges
      const updatedBadges = [...currentBadges, ...newBadges];
      const { error: badgeUpdateError } = await supabase
        .from('users')
        .update({ 
          badges: updatedBadges,
          total_xp: newTotalXP + badgeXPBonus, // Add badge bonus XP
        })
        .eq('id', user.id);

      if (badgeUpdateError) {
        console.error('Error updating user badges:', badgeUpdateError);
      }

      // Create XP events for badge bonuses and send emails
      for (const badge of unlockedBadges) {
        if (badge.xpReward > 0) {
          await supabase
            .from('xp_events')
            .insert({
              user_id: user.id,
              type: 'achievement_unlock',
              points: badge.xpReward,
              description: `Unlocked "${badge.name}" badge`,
              created_at: new Date().toISOString(),
            });
        }

        // Send achievement email
        try {
          await EmailAutomation.sendAchievementEmail(user.id, badge.id);
        } catch (emailError) {
          console.error(`Failed to send achievement email for badge ${badge.id}:`, emailError);
          // Don't fail the XP award if email fails
        }
      }
    }

    const finalTotalXP = newTotalXP + badgeXPBonus;
    const finalLevel = calculateLevel(finalTotalXP);
    const finalIsLevelUp = finalLevel > previousLevel;

    return NextResponse.json({
      success: true,
      xp: {
        points: xpEvent.points,
        description: xpEvent.description,
        previousTotal: previousXP,
        newTotal: finalTotalXP,
        bonusXP: badgeXPBonus,
      },
      level: {
        previous: previousLevel,
        current: finalLevel,
        isLevelUp: finalIsLevelUp,
        title: getLevelTitle(finalLevel),
      },
      badges: {
        unlocked: unlockedBadges,
        total: currentBadges.length + newBadges.length,
      },
    });

  } catch (error) {
    console.error('Award XP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}