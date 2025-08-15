import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

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
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: { portfolio: true }
    });

    let updatedUser;

    if (existingUser) {
      // User exists, update their data
      updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date(), // Mark journey as started
          portfolio: existingUser.portfolio ? {
            update: {
              startupName,
              problemStatement: startupIdea,
              targetMarket: targetMarket ? { description: targetMarket } : undefined,
            }
          } : {
            create: {
              startupName,
              problemStatement: startupIdea,
              targetMarket: targetMarket ? { description: targetMarket } : undefined,
            }
          }
        },
        include: {
          portfolio: true,
        },
      });
    } else {
      // User doesn't exist, create new user
      updatedUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email!,
          name: founderName,
          phone: phone.replace(/\D/g, ''), // Remove non-digits
          startedAt: new Date(), // Mark journey as started
          portfolio: {
            create: {
              startupName,
              problemStatement: startupIdea,
              targetMarket: targetMarket ? { description: targetMarket } : undefined,
            },
          },
        },
        include: {
          portfolio: true,
        },
      });
    }

    // Create initial XP event for completing onboarding
    await prisma.xPEvent.create({
      data: {
        userId: user.id,
        type: 'onboarding_complete',
        points: 50,
        description: 'Completed onboarding and started the journey',
      },
    });

    // Update user's total XP
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalXP: 50,
      },
    });

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