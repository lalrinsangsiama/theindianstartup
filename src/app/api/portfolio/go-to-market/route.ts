import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { salesStrategy, customerPersonas, salesChannels } = await req.json();

    // Update portfolio
    const portfolio = await prisma.startupPortfolio.upsert({
      where: { userId: user.id },
      update: {
        salesStrategy: {
          salesStrategy: salesStrategy,
          salesChannels: salesChannels || [],
        },
        customerPersonas: customerPersonas || [],
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        salesStrategy: {
          salesStrategy: salesStrategy,
          salesChannels: salesChannels || [],
        },
        customerPersonas: customerPersonas || [],
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio go-to-market section:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}