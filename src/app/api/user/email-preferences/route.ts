import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const emailPreferencesSchema = z.object({
  emailFrequency: z.enum(['daily', 'weekly', 'never']),
  emailTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  unsubscribeAll: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    const validation = emailPreferencesSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Invalid email preferences', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const { emailFrequency, emailTime, unsubscribeAll } = validation.data;

    // For now, we'll store these preferences in the User table
    // Note: You would need to add an emailPreferences JSON column to the User table
    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({
        // Store as JSON in a preferences field
        emailPreferences: {
          frequency: emailFrequency,
          time: emailTime,
          unsubscribeAll,
          updatedAt: new Date().toISOString()
        }
      })
      .eq('id', user.id)
      .select('*')
      .maybeSingle();

    if (updateError) {
      console.error('Email preferences update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update email preferences' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      preferences: {
        emailFrequency,
        emailTime,
        unsubscribeAll
      }
    });
  } catch (error) {
    console.error('Email preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to save email preferences' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's email preferences
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('emailPreferences')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('Failed to fetch email preferences:', profileError);
      return NextResponse.json(
        { error: 'Failed to fetch email preferences' },
        { status: 500 }
      );
    }

    // Return default preferences if none are set
    const defaultPreferences = {
      emailFrequency: 'daily',
      emailTime: '09:00',
      unsubscribeAll: false
    };

    const preferences = userProfile?.emailPreferences || defaultPreferences;

    return NextResponse.json({
      preferences
    });
  } catch (error) {
    console.error('Get email preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to get email preferences' },
      { status: 500 }
    );
  }
}