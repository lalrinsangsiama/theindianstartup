import { NextResponse } from 'next/server';
import { EmailAutomation } from '@/lib/email-automation';
import { prisma } from '@/lib/prisma';

// This endpoint should be called by a cron service at 9 AM IST daily
export async function POST(request: Request) {
  try {
    // Verify cron secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.CRON_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active users
    const activeUsers = await prisma.user.findMany({
      where: {
        subscription: {
          status: 'active',
          expiryDate: {
            gt: new Date(),
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        currentDay: true,
      },
    });

    let sent = 0;
    let errors = 0;

    // Send daily reminders
    for (const user of activeUsers) {
      try {
        // Only send if user hasn't completed all 30 days
        if (user.currentDay <= 30) {
          await EmailAutomation.sendDailyReminder(user.id);
          sent++;
        }
      } catch (error) {
        console.error(`Failed to send daily reminder to ${user.email}:`, error);
        errors++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Daily reminders sent to ${sent} users, ${errors} errors`,
      stats: { sent, errors, total: activeUsers.length },
    });

  } catch (error) {
    console.error('Daily reminders cron error:', error);
    return NextResponse.json(
      { error: 'Failed to send daily reminders' },
      { status: 500 }
    );
  }
}