import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { EmailAutomation } from '@/lib/email-automation';

export const dynamic = 'force-dynamic';

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

    // Update user profile with onboarding data
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
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

    // Send welcome email after successful onboarding
    try {
      await EmailAutomation.sendWelcomeEmail(user.id);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the onboarding if email fails
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    );
  }
}