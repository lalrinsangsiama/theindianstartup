import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../lib/supabase/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const onboardingSchema = z.object({
  founderName: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
  startupName: z.string().min(2, 'Startup name must be at least 2 characters').max(100, 'Startup name too long'),
  startupIdea: z.string().min(10, 'Please provide a detailed startup idea').max(500, 'Startup idea too long'),
  targetMarket: z.string().max(200, 'Target market description too long').optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Auth error in onboarding:', authError);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    
    const validation = onboardingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: validation.error.errors.map(err => ({ 
            field: err.path.join('.'), 
            message: err.message 
          }))
        },
        { status: 400 }
      );
    }

    const { founderName, phone, startupName, startupIdea, targetMarket } = validation.data;

    console.log('Updating user with data:', { founderName, phone, startupName, startupIdea, targetMarket });

    // Check if user already exists in our database
    const { data: existingUser } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*)')
      .eq('id', user.id)
      .maybeSingle();

    let updatedUser;

    if (existingUser) {
      // User exists, update their data
      const { data: userUpdate, error: updateError } = await supabase
        .from('User')
        .update({
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date().toISOString(), // Mark journey as started
        })
        .eq('id', user.id)
        .select('*, StartupPortfolio(*)')
        .maybeSingle();

      if (updateError) {
        console.error('User update error:', updateError);
        throw new Error(`Failed to update user: ${updateError.message}`);
      }

      // Update or create portfolio
      if (existingUser.StartupPortfolio && existingUser.StartupPortfolio.length > 0) {
        const { error: portfolioUpdateError } = await supabase
          .from('StartupPortfolio')
          .update({
            startupName,
            problemStatement: startupIdea,
            targetMarket: targetMarket ? { description: targetMarket } : null,
          })
          .eq('userId', user.id);

        if (portfolioUpdateError) {
          console.error('Portfolio update error:', portfolioUpdateError);
          throw new Error(`Failed to update portfolio: ${portfolioUpdateError.message}`);
        }
      } else {
        const { error: portfolioInsertError } = await supabase
          .from('StartupPortfolio')
          .insert({
            userId: user.id,
            startupName,
            problemStatement: startupIdea,
            targetMarket: targetMarket ? { description: targetMarket } : null,
          });

        if (portfolioInsertError) {
          console.error('Portfolio insert error:', portfolioInsertError);
          throw new Error(`Failed to create portfolio: ${portfolioInsertError.message}`);
        }
      }

      updatedUser = userUpdate;
    } else {
      // User doesn't exist, create new user
      const { data: newUser, error: insertError } = await supabase
        .from('User')
        .insert({
          id: user.id,
          email: user.email!,
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date().toISOString(), // Mark journey as started
        })
        .select('*')
        .maybeSingle();

      if (insertError) {
        console.error('User insert error:', insertError);
        throw new Error(`Failed to create user: ${insertError.message}`);
      }

      // Create portfolio
      const { error: portfolioInsertError } = await supabase
        .from('StartupPortfolio')
        .insert({
          userId: user.id,
          startupName,
          problemStatement: startupIdea,
          targetMarket: targetMarket ? { description: targetMarket } : null,
        });

      if (portfolioInsertError) {
        console.error('Portfolio insert error:', portfolioInsertError);
        throw new Error(`Failed to create portfolio: ${portfolioInsertError.message}`);
      }

      updatedUser = newUser;
    }

    // Create initial XP event for completing onboarding
    const { error: xpEventError } = await supabase
      .from('XPEvent')
      .insert({
        userId: user.id,
        type: 'onboarding_complete',
        points: 50,
        description: 'Completed onboarding and started the journey',
      });

    if (xpEventError) {
      console.error('XP event error:', xpEventError);
      // Don't throw error here, as the main onboarding is successful
    }

    // Update user's total XP
    const { error: xpUpdateError } = await supabase
      .from('User')
      .update({
        totalXP: 50,
      })
      .eq('id', user.id);

    if (xpUpdateError) {
      console.error('XP update error:', xpUpdateError);
      // Don't throw error here, as the main onboarding is successful
    }

    console.log('Onboarding completed successfully for user:', user.id);

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to save onboarding data';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}