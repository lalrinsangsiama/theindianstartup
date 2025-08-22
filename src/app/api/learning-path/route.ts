import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { generateLearningPath, getNextRecommendedProduct, UserProfile } from '@/lib/learning-paths';

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

    // Get user data
    const { data: userData, error: userError } = await supabase
      .from('User')
      .select(`
        *,
        purchases:Purchase(
          productCode,
          status
        )
      `)
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse user profile from bio (if stored there) or use defaults
    let userProfile: UserProfile = {
      experience: 'beginner',
      businessStage: 'idea'
    };

    // Try to parse bio for stored profile data
    if (userData.bio) {
      try {
        const bioData = JSON.parse(userData.bio);
        userProfile = {
          experience: bioData.experience || 'beginner',
          goals: bioData.goals ? bioData.goals.split(',') : [],
          businessStage: bioData.businessStage || 'idea',
          primaryFocus: bioData.primaryFocus
        };
      } catch (e) {
        // Bio is not JSON, use defaults
      }
    }

    // Get completed products
    const completedProducts = userData.purchases
      ?.filter((p: any) => p.status === 'completed')
      .map((p: any) => p.productCode) || [];

    // Generate learning path
    const learningPath = generateLearningPath(userProfile);

    // Get next recommended product
    const nextProductCode = getNextRecommendedProduct(completedProducts, userProfile);

    // Get all products for reference
    const { data: allProducts } = await supabase
      .from('Product')
      .select('*')
      .eq('isActive', true)
      .order('sortOrder');

    return NextResponse.json({
      userProfile,
      learningPath,
      nextRecommendedProduct: nextProductCode,
      completedProducts,
      allProducts: allProducts || []
    });
  } catch (error) {
    logger.error('Get learning path error:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate learning path' },
      { status: 500 }
    );
  }
}

// Update user profile preferences
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

    const body = await request.json();
    const { experience, goals, businessStage, primaryFocus, industry } = body;

    // Create profile object
    const profile: UserProfile = {
      experience,
      goals,
      businessStage,
      primaryFocus,
      industry
    };

    // Store in bio field (temporary solution)
    const profileData = {
      experience,
      goals: goals?.join(','),
      businessStage,
      primaryFocus,
      industry,
      updatedAt: new Date().toISOString()
    };

    const { error: updateError } = await supabase
      .from('User')
      .update({
        bio: JSON.stringify(profileData)
      })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Failed to update profile');
    }

    // Generate new learning path
    const learningPath = generateLearningPath(profile);

    return NextResponse.json({
      success: true,
      learningPath
    });
  } catch (error) {
    logger.error('Update learning path error:', error);
    
    return NextResponse.json(
      { error: 'Failed to update learning path' },
      { status: 500 }
    );
  }
}