import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

// GET - Load user email preferences by token
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400 }
      );
    }

    // Decode token to get userId and emailType
    let userId: string;
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      [userId] = decoded.split(':');
      
      if (!userId) {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Get user info
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('name, email')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Get email preferences
    const { data: preferences, error: prefsError } = await supabase
      .from('email_preferences')
      .select('*')
      .eq('user_id', userId)
      .single();

    // If no preferences exist, return defaults
    const defaultPreferences = {
      daily_reminders: true,
      weekly_reports: true,
      achievements: true,
      milestones: true,
      community_digest: true,
      product_updates: true,
      marketing_emails: true,
      unsubscribed_all: false,
    };

    return NextResponse.json({
      userName: userData.name,
      userEmail: userData.email,
      preferences: preferences || defaultPreferences,
    });

  } catch (error) {
    console.error('Email preferences GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Update user email preferences
export async function POST(request: NextRequest) {
  try {
    const { token, preferences } = await request.json();
    
    if (!token || !preferences) {
      return NextResponse.json(
        { error: 'Token and preferences required' },
        { status: 400 }
      );
    }

    // Decode token to get userId
    let userId: string;
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      [userId] = decoded.split(':');
      
      if (!userId) {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Verify user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare preferences data for database
    const prefsData = {
      user_id: userId,
      daily_reminders: preferences.dailyReminders ?? true,
      weekly_reports: preferences.weeklyReports ?? true,
      achievements: preferences.achievements ?? true,
      milestones: preferences.milestones ?? true,
      community_digest: preferences.communityDigest ?? true,
      product_updates: preferences.productUpdates ?? true,
      marketing_emails: preferences.marketingEmails ?? true,
      unsubscribed_all: preferences.unsubscribedAll ?? false,
      updated_at: new Date().toISOString(),
    };

    // Upsert email preferences
    const { error: upsertError } = await supabase
      .from('email_preferences')
      .upsert(prefsData, {
        onConflict: 'user_id',
      });

    if (upsertError) {
      console.error('Failed to update email preferences:', upsertError);
      return NextResponse.json(
        { error: 'Failed to update preferences' },
        { status: 500 }
      );
    }

    // Log the preference update
    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        user_id: userId,
        email_type: 'preference_update',
        subject: 'Email preferences updated',
        sent_to: '', // Will be filled by trigger if needed
        status: 'sent',
        metadata: { action: 'preferences_updated', preferences: prefsData },
        created_at: new Date().toISOString(),
      });

    if (logError) {
      console.error('Failed to log preference update:', logError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      success: true,
      message: 'Email preferences updated successfully',
    });

  } catch (error) {
    console.error('Email preferences POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Complete unsubscribe (unsubscribe from all)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token required' },
        { status: 400 }
      );
    }

    // Decode token to get userId
    let userId: string;
    try {
      const decoded = Buffer.from(token, 'base64').toString('utf8');
      [userId] = decoded.split(':');
      
      if (!userId) {
        throw new Error('Invalid token format');
      }
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Verify user exists
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Set all preferences to false and unsubscribed_all to true
    const prefsData = {
      user_id: userId,
      daily_reminders: false,
      weekly_reports: false,
      achievements: false,
      milestones: false,
      community_digest: false,
      product_updates: false,
      marketing_emails: false,
      unsubscribed_all: true,
      updated_at: new Date().toISOString(),
    };

    // Upsert email preferences
    const { error: upsertError } = await supabase
      .from('email_preferences')
      .upsert(prefsData, {
        onConflict: 'user_id',
      });

    if (upsertError) {
      console.error('Failed to unsubscribe user:', upsertError);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    // Log the unsubscribe
    const { error: logError } = await supabase
      .from('email_logs')
      .insert({
        user_id: userId,
        email_type: 'unsubscribe_all',
        subject: 'Unsubscribed from all emails',
        sent_to: userData.email,
        status: 'sent',
        metadata: { action: 'unsubscribe_all' },
        created_at: new Date().toISOString(),
      });

    if (logError) {
      console.error('Failed to log unsubscribe:', logError);
      // Don't fail the request if logging fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from all emails',
    });

  } catch (error) {
    console.error('Email unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}