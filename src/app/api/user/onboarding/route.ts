import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

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

    // Parse request body
    const body = await request.json();
    const { founderName, phone, startupName, startupIdea, targetMarket } = body;

    // Validate required fields
    if (!founderName || !phone || !startupName || !startupIdea) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Updating user with data:', { founderName, phone, startupName, startupIdea, targetMarket });

    // Check if user already exists in our database
    const { data: existingUser } = await supabase
      .from('User')
      .select('*, StartupPortfolio(*)')
      .eq('id', user.id)
      .single();

    let updatedUser;

    if (existingUser) {
      // User exists, update their data
      const { data: userUpdate } = await supabase
        .from('User')
        .update({
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date().toISOString(), // Mark journey as started
        })
        .eq('id', user.id)
        .select('*, StartupPortfolio(*)')
        .single();

      // Update or create portfolio
      if (existingUser.StartupPortfolio && existingUser.StartupPortfolio.length > 0) {
        await supabase
          .from('StartupPortfolio')
          .update({
            startupName,
            problemStatement: startupIdea,
            targetMarket: targetMarket ? { description: targetMarket } : null,
          })
          .eq('userId', user.id);
      } else {
        await supabase
          .from('StartupPortfolio')
          .insert({
            userId: user.id,
            startupName,
            problemStatement: startupIdea,
            targetMarket: targetMarket ? { description: targetMarket } : null,
          });
      }

      updatedUser = userUpdate;
    } else {
      // User doesn't exist, create new user
      const { data: newUser } = await supabase
        .from('User')
        .insert({
          id: user.id,
          email: user.email!,
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date().toISOString(), // Mark journey as started
        })
        .select('*')
        .single();

      // Create portfolio
      await supabase
        .from('StartupPortfolio')
        .insert({
          userId: user.id,
          startupName,
          problemStatement: startupIdea,
          targetMarket: targetMarket ? { description: targetMarket } : null,
        });

      updatedUser = newUser;
    }

    // Create initial XP event for completing onboarding
    await supabase
      .from('XPEvent')
      .insert({
        userId: user.id,
        type: 'onboarding_complete',
        points: 50,
        description: 'Completed onboarding and started the journey',
      });

    // Update user's total XP
    await supabase
      .from('User')
      .update({
        totalXP: 50,
      })
      .eq('id', user.id);

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