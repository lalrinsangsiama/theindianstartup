import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { PURCHASE_STATUS } from '@/lib/constants';
import { validateName, validatePhone, validateURL } from '@/lib/validation';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return errorResponse('Unauthorized', 401);
    }

    // Get user profile with portfolio and purchases
    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*), purchases:Purchase(*)')
      .eq('id', user.id)
      .maybeSingle();

    // Removed debug logging

    // If user doesn't exist in our database yet, they haven't completed onboarding
    if (!userProfile) {
      logger.info('User profile not found in database for user:', user.id);
      return NextResponse.json({
        user: null,
        hasCompletedOnboarding: false,
        needsOnboarding: true,
      });
    }

    // Check if user has completed onboarding
    // User has completed onboarding if they have a name set
    const hasCompletedOnboarding = !!(userProfile && userProfile.name);

    // Check for active purchases
    const activePurchases = userProfile?.purchases?.filter((purchase: any) => 
      purchase.status === 'completed' && 
      new Date(purchase.expiresAt) > new Date()
    ) || [];
    
    const hasActiveAccess = activePurchases.length > 0;

    const response = NextResponse.json({
      user: {
        ...userProfile,
        portfolio: userProfile.StartupPortfolio?.[0] || null,
        activePurchases,
        hasActiveAccess
      },
      hasCompletedOnboarding,
    });

    // Add cache headers for better performance
    response.headers.set('Cache-Control', 'private, max-age=300, stale-while-revalidate=600');
    return response;
  } catch (error) {
    logger.error('Profile fetch error:', error);
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
      return errorResponse('Unauthorized', 401);
    }

    // Parse request body
    const body = await request.json();

    // Update user profile
    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({
        name: body.name,
        phone: body.phone,
        bio: body.bio || null,
        linkedinUrl: body.linkedinUrl || null,
        twitterUrl: body.twitterUrl || null,
        websiteUrl: body.websiteUrl || null,
      })
      .eq('id', user.id)
      .select('*, StartupPortfolio(*)')
      .maybeSingle();

    if (updateError) {
      logger.error('Profile update error:', updateError);
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: updatedUser,
    });
  } catch (error) {
    logger.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}