import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { BADGES } from '@/lib/badges';
import { EmailAutomation } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { badgeId, userId } = await request.json();
    
    if (!badgeId || !userId) {
      return NextResponse.json(
        { error: 'Badge ID and User ID are required' },
        { status: 400 }
      );
    }

    // Verify badge exists
    const badge = BADGES[badgeId as keyof typeof BADGES];
    if (!badge) {
      return NextResponse.json(
        { error: 'Invalid badge ID' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get user from session for security
    const { data: { user: sessionUser }, error: userError } = await supabase.auth.getUser();
    if (userError || !sessionUser) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For now, only allow users to award badges to themselves
    // In future, you might allow admins to award badges to other users
    if (sessionUser.id !== userId) {
      return NextResponse.json(
        { error: 'Can only award badges to yourself' },
        { status: 403 }
      );
    }

    // Get user data
    const { data: userData, error: userFetchError } = await supabase
      .from('users')
      .select('badges, total_xp')
      .eq('id', userId)
      .single();

    if (userFetchError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user already has this badge
    const currentBadges = userData.badges || [];
    if (currentBadges.includes(badgeId)) {
      return NextResponse.json(
        { error: 'Badge already awarded' },
        { status: 400 }
      );
    }

    // Award the badge
    const updatedBadges = [...currentBadges, badgeId];
    const xpReward = badge.xpReward || 0;
    const newTotalXP = userData.total_xp + xpReward;

    // Update user with new badge and XP
    const { error: updateError } = await supabase
      .from('users')
      .update({
        badges: updatedBadges,
        total_xp: newTotalXP,
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to update user badges:', updateError);
      return NextResponse.json(
        { error: 'Failed to award badge' },
        { status: 500 }
      );
    }

    // Create XP event for badge award
    if (xpReward > 0) {
      const { error: xpError } = await supabase
        .from('xp_events')
        .insert({
          user_id: userId,
          type: 'badge_earned',
          points: xpReward,
          description: `Earned badge: ${badge.name}`,
        });

      if (xpError) {
        console.error('Failed to create XP event:', xpError);
      }
    }

    // Send achievement email (async, don't wait)
    EmailAutomation.sendAchievementEmail(userId, badgeId).catch(error => {
      console.error('Failed to send achievement email:', error);
    });

    // Check for milestone achievements
    checkForMilestones(userId, updatedBadges.length, newTotalXP);

    return NextResponse.json({
      success: true,
      badge: {
        id: badgeId,
        name: badge.name,
        description: badge.description,
        xpReward,
      },
      newTotalXP,
      totalBadges: updatedBadges.length,
    });

  } catch (error) {
    console.error('Badge award error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Check for milestone achievements and send emails
async function checkForMilestones(userId: string, badgeCount: number, totalXP: number) {
  try {
    // Badge milestones
    if (badgeCount === 5) {
      await EmailAutomation.sendMilestoneEmail(
        userId,
        'First 5 Badges Earned!',
        '10 badges - Badge Collector'
      );
    } else if (badgeCount === 10) {
      await EmailAutomation.sendMilestoneEmail(
        userId,
        'Badge Collector - 10 Badges!',
        '15 badges - Badge Master'
      );
    }

    // XP milestones
    const level = Math.floor(totalXP / 100) + 1;
    if (level === 5) {
      await EmailAutomation.sendMilestoneEmail(
        userId,
        'Level 5 Reached!',
        'Level 10 - Expert Founder'
      );
    } else if (level === 10) {
      await EmailAutomation.sendMilestoneEmail(
        userId,
        'Level 10 - Expert Founder!',
        'Level 20 - Startup Master'
      );
    }
  } catch (error) {
    console.error('Failed to check milestones:', error);
  }
}

// GET endpoint to check badge eligibility
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const badgeId = searchParams.get('badgeId');
    
    if (!badgeId) {
      return NextResponse.json(
        { error: 'Badge ID required' },
        { status: 400 }
      );
    }

    const badge = BADGES[badgeId as keyof typeof BADGES];
    if (!badge) {
      return NextResponse.json(
        { error: 'Invalid badge ID' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user data to check eligibility
    const { data: userData, error: userFetchError } = await supabase
      .from('users')
      .select('badges, current_day, total_xp')
      .eq('id', user.id)
      .single();

    if (userFetchError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const currentBadges = userData.badges || [];
    const hasBadge = currentBadges.includes(badgeId);
    
    // Check basic requirements
    let eligible = true;
    let reason = '';

    if (hasBadge) {
      eligible = false;
      reason = 'Badge already earned';
    } else {
      // Check criteria based on badge type
      const criteria = badge.criteria;
      
      if (criteria.type === 'day_complete' && userData.current_day < criteria.value) {
        eligible = false;
        reason = `Requires completing day ${criteria.value}`;
      } else if (criteria.type === 'xp' && userData.total_xp < criteria.value) {
        eligible = false;
        reason = `Requires ${criteria.value} XP`;
      } else if (criteria.type === 'streak' && userData.current_day < criteria.value) {
        eligible = false;
        reason = `Requires ${criteria.value} day streak`;
      }
    }

    return NextResponse.json({
      badge: {
        id: badgeId,
        name: badge.name,
        description: badge.description,
        xpReward: badge.xpReward,
      },
      eligible,
      reason,
      hasBadge,
      userProgress: {
        currentDay: userData.current_day,
        totalXP: userData.total_xp,
        badgeCount: currentBadges.length,
      },
    });

  } catch (error) {
    console.error('Badge eligibility check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}