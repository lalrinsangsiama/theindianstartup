import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { errorResponse, successResponse } from '@/lib/api-utils';
import { PURCHASE_STATUS } from '@/lib/constants';
import { userProfileUpdateSchema, validateRequest, validationErrorResponse } from '@/lib/validation-schemas';
import { applyUserRateLimit } from '@/lib/rate-limit';

interface PurchaseRecord {
  id: string;
  status: string;
  expiresAt: string;
  productCode: string;
  amount: number;
}

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

    // If user doesn't exist in our database yet, return 404
    if (!userProfile) {
      logger.info('User profile not found in database for user:', { userId: user.id });
      return NextResponse.json(
        {
          error: 'Profile not found',
          code: 'PROFILE_NOT_FOUND',
          needsProfileCreation: true,
        },
        { status: 404 }
      );
    }

    // Onboarding is always considered complete (onboarding flow removed)
    const hasCompletedOnboarding = true;

    // Check for active purchases
    const activePurchases = (userProfile?.purchases as PurchaseRecord[] | undefined)?.filter((purchase) =>
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

    // H2: Apply correct rate limiting: 10 profile updates per hour
    const { allowed, headers } = await applyUserRateLimit(user.id, 'profileUpdate');
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many profile updates. Please try again later.' },
        { status: 429, headers }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = validateRequest(userProfileUpdateSchema, body);

    if (!validation.success) {
      return NextResponse.json(
        validationErrorResponse(validation),
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Update user profile with validated data
    const { data: updatedUser, error: updateError } = await supabase
      .from('User')
      .update({
        name: validatedData.name,
        phone: validatedData.phone,
        bio: validatedData.bio || null,
        linkedinUrl: validatedData.linkedinUrl || null,
        twitterUrl: validatedData.twitterUrl || null,
        websiteUrl: validatedData.websiteUrl || null,
        avatar: validatedData.avatar || null,
        updatedAt: new Date().toISOString(),
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