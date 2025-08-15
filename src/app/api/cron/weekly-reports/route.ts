import { NextResponse } from 'next/server';
import { EmailAutomation } from '@/lib/email-automation';
import { prisma } from '@/lib/prisma';

// This endpoint should be called by a cron service every Sunday at 10 AM IST
export async function POST(request: Request) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active users who have been active in the past week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const activeUsers = await prisma.user.findMany({
      where: {
        subscription: {
          status: 'active',
          expiryDate: {
            gt: new Date(),
          },
        },
        dailyProgress: {
          some: {
            completedAt: {
              gte: weekAgo,
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    let sent = 0;
    let errors = 0;

    // Send weekly progress reports
    for (const user of activeUsers) {
      try {
        await EmailAutomation.sendWeeklyProgress(user.id);
        sent++;
      } catch (error) {
        console.error(`Failed to send weekly report to ${user.email}:`, error);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Weekly reports sent to ${sent} users, ${errors} errors`,
      stats: { sent, errors, total: activeUsers.length },
    });

  } catch (error) {
    console.error('Weekly reports cron error:', error);
    return NextResponse.json(
      { error: 'Failed to send weekly reports' },
      { status: 500 }
    );
  }
}