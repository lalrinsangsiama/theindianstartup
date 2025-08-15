import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { EmailAutomation } from '@/lib/email-automation';
import { requireAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { user, error: authError } = await requireAuth();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { badgeId } = await request.json();
    
    if (!badgeId) {
      return NextResponse.json(
        { error: 'Badge ID is required' },
        { status: 400 }
      );
    }

    // Send achievement email
    await EmailAutomation.sendAchievementEmail(user.id, badgeId);

    return NextResponse.json({ 
      success: true,
      message: 'Achievement email sent' 
    });

  } catch (error) {
    console.error('Achievement email error:', error);
    return NextResponse.json(
      { error: 'Failed to send achievement email' },
      { status: 500 }
    );
  }
}