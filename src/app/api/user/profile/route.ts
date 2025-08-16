import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

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

    // Get user profile with portfolio
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*)')
      .eq('id', user.id)
      .maybeSingle();

    // If user doesn't exist in our database yet, they haven't completed onboarding
    if (!userProfile) {
      console.log('User profile not found in database for user:', user.id);
      return NextResponse.json({
        user: null,
        hasCompletedOnboarding: false,
        needsOnboarding: true,
      });
    }

    // Check if user has completed onboarding
    // User has completed onboarding if they have a name set
    const hasCompletedOnboarding = !!(userProfile && userProfile.name);

    return NextResponse.json({
      user: {
        ...userProfile,
        portfolio: userProfile.StartupPortfolio?.[0] || null
      },
      hasCompletedOnboarding,
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();

    // Update user profile
    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({
        name: body.name,
        phone: body.phone,
      })
      .eq('id', user.id)
      .select('*')
      .maybeSingle();

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: updatedUser,
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}