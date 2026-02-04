import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { z } from 'zod';

// C3: Typed schemas for each settings type (replacing z.any())
const NotificationSettings = z.object({
  emailUpdates: z.boolean().optional(),
  progressAlerts: z.boolean().optional(),
  communityNotifs: z.boolean().optional(),
  marketingEmails: z.boolean().optional(),
  dailyReminders: z.boolean().optional(),
  weeklyProgress: z.boolean().optional(),
  achievements: z.boolean().optional(),
  communityUpdates: z.boolean().optional(),
  expertSessions: z.boolean().optional(),
  marketing: z.boolean().optional(),
}).strict();

const PrivacySettings = z.object({
  profileVisibility: z.enum(['public', 'private', 'connections']).optional(),
  showEmail: z.boolean().optional(),
  showProgress: z.boolean().optional(),
  allowMessages: z.boolean().optional(),
  profileVisible: z.boolean().optional(),
  progressVisible: z.boolean().optional(),
  portfolioVisible: z.boolean().optional(),
  activityVisible: z.boolean().optional(),
}).strict();

const ProfileSettings = z.object({
  name: z.string().min(1).max(100).optional(),
  phone: z.string().max(20).optional(),
  startupName: z.string().max(200).optional(),
  industry: z.string().max(100).optional(),
  bio: z.string().max(500).optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')).nullable(),
  twitterUrl: z.string().url().optional().or(z.literal('')).nullable(),
}).strict();

// Discriminated union for type-safe settings validation
const settingsSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('notifications'), data: NotificationSettings }),
  z.object({ type: z.literal('privacy'), data: PrivacySettings }),
  z.object({ type: z.literal('profile'), data: ProfileSettings }),
]);

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
