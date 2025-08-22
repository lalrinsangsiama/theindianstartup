import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const progressiveOnboardingSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(2).max(100).optional(),
  phone: z.string().regex(/^[6-9]\d{9}$/).optional().or(z.literal('')),
  goals: z.string().max(500).optional(),
  experience: z.enum(['beginner', 'intermediate', 'experienced']).optional().or(z.literal('')),
  onboardingStep: z.number().min(1).max(3),
  onboardingSkipped: z.boolean(),
  completedSteps: z.array(z.number())
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
    
    const validation = progressiveOnboardingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.errors 
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('User')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (existingUser) {
      // Update existing user with new data
      const updateData: any = {};
      
      if (data.name) updateData.name = data.name;
      if (data.phone) updateData.phone = data.phone.replace(/\D/g, '');
      
      // Store onboarding metadata in bio field temporarily
      // In production, you'd want to add proper fields to the schema
      const onboardingMeta = {
        step: data.onboardingStep,
        completedSteps: data.completedSteps,
        goals: data.goals,
        experience: data.experience,
        lastUpdated: new Date().toISOString()
      };
      
      updateData.bio = JSON.stringify(onboardingMeta);

      const { error: updateError } = await supabase
        .from('User')
        .update(updateData)
        .eq('id', user.id);

      if (updateError) {
        throw new Error(`Failed to update user: ${updateError.message}`);
      }
    } else {
      // Create new user
      const insertData: any = {
        id: user.id,
        email: data.email || user.email!,
        name: data.name || null,
        phone: data.phone ? data.phone.replace(/\D/g, '') : null,
      };

      // Store onboarding metadata
      const onboardingMeta = {
        step: data.onboardingStep,
        completedSteps: data.completedSteps,
        goals: data.goals,
        experience: data.experience,
        lastUpdated: new Date().toISOString()
      };
      
      insertData.bio = JSON.stringify(onboardingMeta);

      const { error: insertError } = await supabase
        .from('User')
        .insert(insertData);

      if (insertError) {
        throw new Error(`Failed to create user: ${insertError.message}`);
      }
    }

    // Award XP for completing steps (if not already awarded)
    if (data.completedSteps.length > 0 && !data.onboardingSkipped) {
      const xpPerStep = 10;
      const totalXP = data.completedSteps.length * xpPerStep;
      
      // Update total XP
      const { error: xpError } = await supabase.rpc('increment_user_xp', {
        user_id: user.id,
        xp_amount: totalXP
      });

      if (xpError) {
        logger.error('Failed to update XP:', xpError);
      }
    }

    return NextResponse.json({
      success: true,
      onboardingStep: data.onboardingStep,
      completedSteps: data.completedSteps
    });
  } catch (error) {
    logger.error('Progressive onboarding error:', error);
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save onboarding progress' },
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

    // Get user data
    const { data: userData } = await supabase
      .from('User')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!userData || !userData.bio) {
      return NextResponse.json({
        onboardingStep: 1,
        completedSteps: [],
        data: {}
      });
    }

    try {
      const onboardingMeta = JSON.parse(userData.bio);
      return NextResponse.json({
        onboardingStep: onboardingMeta.step || 1,
        completedSteps: onboardingMeta.completedSteps || [],
        data: {
          email: userData.email,
          name: userData.name,
          phone: userData.phone,
          goals: onboardingMeta.goals,
          experience: onboardingMeta.experience
        }
      });
    } catch (e) {
      // If bio is not valid JSON, return default
      return NextResponse.json({
        onboardingStep: 1,
        completedSteps: [],
        data: {
          email: userData.email,
          name: userData.name,
          phone: userData.phone
        }
      });
    }
  } catch (error) {
    logger.error('Get onboarding status error:', error);
    
    return NextResponse.json(
      { error: 'Failed to get onboarding status' },
      { status: 500 }
    );
  }
}