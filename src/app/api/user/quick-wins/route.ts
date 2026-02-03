import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';

const QUICK_WINS = [
  { id: 'complete-profile', xp: 25 },
  { id: 'set-goals', xp: 25 },
  { id: 'join-community', xp: 25 },
  { id: 'view-course', xp: 15 },
  { id: 'create-portfolio', xp: 25 },
  { id: 'first-lesson', xp: 35 },
];

const TOTAL_XP = QUICK_WINS.reduce((sum, win) => sum + win.xp, 0);
const BONUS_XP = 200;
const BONUS_HOURS = 24;

/**
 * GET /api/user/quick-wins
 * Get the user's quick wins status
 */
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    // Get user's quick wins data from metadata
    const { data: userData, error } = await supabase
      .from('User')
      .select('quickWins')
      .eq('id', user.id)
      .single();

    if (error) {
      // If column doesn't exist, return empty state
      if (error.code === '42703') {
        return NextResponse.json({
          completedWins: [],
          startedAt: null,
          bonusEarned: false,
          allComplete: false,
        });
      }
      throw error;
    }

    const quickWins = userData?.quickWins || {};

    return NextResponse.json({
      completedWins: quickWins.completed || [],
      startedAt: quickWins.startedAt || null,
      bonusEarned: quickWins.bonusEarned || false,
      allComplete: (quickWins.completed || []).length >= QUICK_WINS.length,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Get quick wins error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quick wins' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/user/quick-wins
 * Mark a quick win as complete
 */
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const { winId } = await request.json();

    const win = QUICK_WINS.find(w => w.id === winId);
    if (!win) {
      return NextResponse.json(
        { error: 'Invalid quick win' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get current quick wins state
    const { data: userData, error: fetchError } = await supabase
      .from('User')
      .select('quickWins, totalXP, badges')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      // Handle case where quickWins column doesn't exist
      if (fetchError.code === '42703') {
        // Column doesn't exist - create initial state
        const now = new Date().toISOString();
        const quickWins = {
          completed: [winId],
          startedAt: now,
          bonusEarned: false,
        };

        // Try to add quickWins column by updating with JSONB
        const { error: updateError } = await supabase.rpc('update_user_quick_wins', {
          p_user_id: user.id,
          p_quick_wins: quickWins,
          p_xp_earned: win.xp,
        });

        if (updateError) {
          logger.error('Failed to update quick wins:', updateError);
          // Fallback: just add XP using increment
          const { data: currentUser } = await supabase
            .from('User')
            .select('totalXP')
            .eq('id', user.id)
            .single();

          await supabase
            .from('User')
            .update({ totalXP: (currentUser?.totalXP || 0) + win.xp })
            .eq('id', user.id);
        }

        return NextResponse.json({
          success: true,
          xpEarned: win.xp,
          completedWins: [winId],
          bonusEarned: false,
          allComplete: false,
        });
      }
      throw fetchError;
    }

    const quickWins = userData?.quickWins || { completed: [], startedAt: null, bonusEarned: false };
    const completed = quickWins.completed || [];

    // Check if already completed
    if (completed.includes(winId)) {
      return NextResponse.json({
        success: true,
        xpEarned: 0,
        completedWins: completed,
        bonusEarned: quickWins.bonusEarned,
        allComplete: completed.length >= QUICK_WINS.length,
      });
    }

    // Mark as complete
    const now = new Date();
    const startedAt = quickWins.startedAt ? new Date(quickWins.startedAt) : now;
    const newCompleted = [...completed, winId];
    let xpEarned = win.xp;
    let bonusEarned = quickWins.bonusEarned || false;
    const allComplete = newCompleted.length >= QUICK_WINS.length;

    // Check for bonus
    if (allComplete && !bonusEarned) {
      const deadline = new Date(startedAt.getTime() + BONUS_HOURS * 60 * 60 * 1000);
      if (now <= deadline) {
        bonusEarned = true;
        xpEarned += BONUS_XP;
      }
    }

    // Update user
    const newQuickWins = {
      completed: newCompleted,
      startedAt: quickWins.startedAt || now.toISOString(),
      bonusEarned,
    };

    const currentXP = userData?.totalXP || 0;
    const badges = userData?.badges || [];

    // Add Fast Starter badge if bonus earned
    const newBadges = bonusEarned && !badges.includes('fast_starter')
      ? [...badges, 'fast_starter']
      : badges;

    const { error: updateError } = await supabase
      .from('User')
      .update({
        quickWins: newQuickWins,
        totalXP: currentXP + xpEarned,
        badges: newBadges,
      })
      .eq('id', user.id);

    if (updateError) {
      logger.error('Failed to update quick wins:', updateError);
      return NextResponse.json(
        { error: 'Failed to update progress' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      xpEarned,
      completedWins: newCompleted,
      bonusEarned,
      allComplete,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      return NextResponse.json({ error: 'Please login' }, { status: 401 });
    }

    logger.error('Complete quick win error:', error);
    return NextResponse.json(
      { error: 'Failed to complete quick win' },
      { status: 500 }
    );
  }
}
