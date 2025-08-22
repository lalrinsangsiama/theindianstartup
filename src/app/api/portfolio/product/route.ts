import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { mvpDescription, features, userFeedback } = await req.json();

    // Update portfolio
    const portfolio = await prisma.startupPortfolio.upsert({
      where: { userId: user.id },
      update: {
        mvpDescription: mvpDescription,
        features: features || [],
        userFeedback: userFeedback || [],
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        mvpDescription: mvpDescription,
        features: features || [],
        userFeedback: userFeedback || [],
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    logger.error('Error updating portfolio product section:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}