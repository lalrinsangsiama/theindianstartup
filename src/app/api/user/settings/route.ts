import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

const settingsSchema = z.object({
  type: z.enum(['notifications', 'privacy', 'profile']),
  data: z.record(z.any())
});

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth();
    const supabase = createClient();

    // Get user settings from user_metadata or a settings table
    const { data: profile, error } = await supabase
      .from('UserProfile')
      .select('settings, notificationPreferences, privacySettings')
      .eq('userId', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      logger.error('Failed to fetch settings', { error });
      return NextResponse.json(
        { error: 'Failed to fetch settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      notifications: profile?.notificationPreferences || {
        emailUpdates: true,
        progressAlerts: true,
        communityNotifs: false,
        marketingEmails: false
      },
      privacy: profile?.privacySettings || {
        profileVisibility: 'private',
        showProgress: false,
        allowMessages: true
      },
      settings: profile?.settings || {}
    });

  } catch (error) {
    logger.error('Settings fetch error', { error });
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await request.json();

    const validation = settingsSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      );
    }

    const { type, data } = validation.data;
    const supabase = createClient();

    // Build update object based on setting type
    let updateData: Record<string, unknown> = {};

    switch (type) {
      case 'notifications':
        updateData = { notificationPreferences: data };
        break;
      case 'privacy':
        updateData = { privacySettings: data };
        break;
      case 'profile':
        updateData = {
          name: data.name,
          phone: data.phone,
          startupName: data.startupName,
          industry: data.industry
        };
        break;
    }

    // Update the user profile
    const { error } = await supabase
      .from('UserProfile')
      .update(updateData)
      .eq('userId', user.id);

    if (error) {
      logger.error('Failed to update settings', { error, type });
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      );
    }

    logger.info('Settings updated', { userId: user.id, type });

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully'
    });

  } catch (error) {
    logger.error('Settings update error', { error });
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
