import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAuth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { user, error: authError } = await requireAuth();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get or create email preferences
    let preferences = await prisma.emailPreference.findUnique({
      where: { userId: user.id },
    });

    if (!preferences) {
      preferences = await prisma.emailPreference.create({
        data: { userId: user.id },
      });
    }

    return NextResponse.json({ preferences });

  } catch (error) {
    console.error('Get preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to get email preferences' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { user, error: authError } = await requireAuth();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await request.json();

    // Update preferences
    const preferences = await prisma.emailPreference.upsert({
      where: { userId: user.id },
      update: updates,
      create: {
        userId: user.id,
        ...updates,
      },
    });

    return NextResponse.json({ 
      success: true,
      preferences 
    });

  } catch (error) {
    console.error('Update preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to update email preferences' },
      { status: 500 }
    );
  }
}