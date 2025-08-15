import { sendEmail } from '@/lib/email';
import { emailTemplates } from '@/lib/email-templates';
import { BADGES } from '@/lib/badges';
import { prisma } from '@/lib/prisma';

// Email automation types
export type EmailType = 
  | 'welcome'
  | 'daily_reminder'
  | 'payment_confirmation'
  | 'achievement_unlocked'
  | 'weekly_progress'
  | 'milestone_reached'
  | 'inactive_reminder';

export interface EmailJob {
  userId: string;
  emailType: EmailType;
  scheduledFor: Date;
  data: Record<string, any>;
  status: 'pending' | 'sent' | 'failed';
}

// Email automation triggers
export class EmailAutomation {
  // Send welcome email immediately after signup
  static async sendWelcomeEmail(userId: string) {
    try {
      // Check email preferences
      const canSend = await this.checkEmailPreference(userId, 'onboarding');
      if (!canSend) return;
      
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      
      if (!user) return;
      
      // Generate unsubscribe URL
      const unsubscribeUrl = this.generateUnsubscribeUrl(userId, 'onboarding');
      
      // Send email
      const template = emailTemplates.welcome(user.name, unsubscribeUrl);
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'welcome');
      
    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }

  // Send payment confirmation email
  static async sendPaymentConfirmation(
    userId: string, 
    amount: number, 
    orderId: string,
    invoiceUrl: string
  ) {
    try {
      // Always send payment confirmations
      
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      
      if (!user) return;
      
      // Send email
      const template = emailTemplates.paymentConfirmation(
        user.name,
        amount,
        orderId,
        invoiceUrl
      );
      
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'payment_confirmation');
      
    } catch (error) {
      console.error('Failed to send payment confirmation:', error);
    }
  }

  // Send achievement unlocked email
  static async sendAchievementEmail(userId: string, badgeId: string) {
    try {
      // Check email preferences
      const canSend = await this.checkEmailPreference(userId, 'achievements');
      if (!canSend) return;
      
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      
      if (!user) return;
      
      // Get badge details
      const badge = BADGES[badgeId as keyof typeof BADGES];
      if (!badge) return;
      
      // Generate unsubscribe URL
      const unsubscribeUrl = this.generateUnsubscribeUrl(userId, 'achievements');
      
      // Send email
      const template = emailTemplates.achievementUnlocked(
        user.name,
        badge.name,
        badge.description,
        badge.xpReward,
        unsubscribeUrl
      );
      
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'achievement_unlocked', { badgeId });
      
    } catch (error) {
      console.error('Failed to send achievement email:', error);
    }
  }

  // Send daily reminder email (scheduled for 9 AM IST)
  static async sendDailyReminder(userId: string) {
    try {
      // Check email preferences
      const canSend = await this.checkEmailPreference(userId, 'dailyReminders');
      if (!canSend) return;
      
      // Get user data with progress
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
          name: true, 
          email: true, 
          currentDay: true, 
          currentStreak: true 
        },
      });
      
      if (!user) return;
      
      // Check if user has already completed today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayProgress = await prisma.dailyProgress.findUnique({
        where: {
          userId_day: {
            userId,
            day: user.currentDay + 1,
          },
        },
        select: { completedAt: true },
      });
      
      // Don't send if already completed
      if (todayProgress?.completedAt) return;
      
      // Get lesson details
      const nextDay = user.currentDay + 1;
      if (nextDay > 30) return; // Journey complete
      
      const lesson = await prisma.dailyLesson.findUnique({
        where: { day: nextDay },
        select: { title: true, actionItems: true },
      });
      
      if (!lesson) return;
      
      // Count tasks
      const tasksCount = Array.isArray(lesson.actionItems) 
        ? lesson.actionItems.length 
        : 3;
      
      // Generate unsubscribe URL
      const unsubscribeUrl = this.generateUnsubscribeUrl(userId, 'daily_reminders');
      
      // Send email
      const template = emailTemplates.dailyReminder(
        user.name,
        nextDay,
        lesson.title,
        user.currentStreak || 0,
        tasksCount,
        unsubscribeUrl
      );
      
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'daily_reminder', { day: nextDay });
      
    } catch (error) {
      console.error('Failed to send daily reminder:', error);
    }
  }

  // Send weekly progress report (scheduled for Sundays)
  static async sendWeeklyProgress(userId: string) {
    try {
      // Check email preferences
      const canSend = await this.checkEmailPreference(userId, 'weeklyReports');
      if (!canSend) return;
      
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { 
          name: true, 
          email: true, 
          totalXP: true, 
          currentStreak: true, 
          badges: true 
        },
      });
      
      if (!user) return;
      
      // Get this week's progress
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const weekProgress = await prisma.dailyProgress.findMany({
        where: {
          userId,
          completedAt: {
            gte: weekAgo,
            not: null,
          },
        },
        select: { day: true, completedAt: true },
      });
      
      const completedDays = weekProgress.length;
      
      // Get XP earned this week
      const weekXP = await prisma.xPEvent.findMany({
        where: {
          userId,
          createdAt: { gte: weekAgo },
        },
        select: { points: true },
      });
      
      const weeklyXP = weekXP.reduce((sum, event) => sum + event.points, 0);
      
      // Get level
      const currentLevel = Math.floor(user.totalXP / 100) + 1;
      
      // Check for new badges this week
      const newBadges: string[] = []; // TODO: Track badge unlock dates
      
      // Generate unsubscribe URL
      const unsubscribeUrl = this.generateUnsubscribeUrl(userId, 'weekly_reports');
      
      // Send email
      const template = emailTemplates.weeklyProgress(
        user.name,
        {
          completedDays,
          totalXP: weeklyXP,
          currentLevel,
          newBadges,
          currentStreak: user.currentStreak || 0,
        },
        unsubscribeUrl
      );
      
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'weekly_progress');
      
    } catch (error) {
      console.error('Failed to send weekly progress:', error);
    }
  }

  // Send milestone reached email
  static async sendMilestoneEmail(userId: string, milestone: string, nextMilestone: string) {
    try {
      // Check email preferences
      const canSend = await this.checkEmailPreference(userId, 'milestones');
      if (!canSend) return;
      
      // Get user data
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { name: true, email: true },
      });
      
      if (!user) return;
      
      // Generate unsubscribe URL
      const unsubscribeUrl = this.generateUnsubscribeUrl(userId, 'milestones');
      
      // Send email
      const template = emailTemplates.milestoneReached(
        user.name,
        milestone,
        nextMilestone,
        unsubscribeUrl
      );
      
      await sendEmail({
        to: user.email,
        ...template,
      });
      
      // Log email sent
      await this.logEmailSent(userId, 'milestone_reached', { milestone });
      
    } catch (error) {
      console.error('Failed to send milestone email:', error);
    }
  }

  // Send inactive reminder (scheduled check)
  static async sendInactiveReminders() {
    try {
      // Find users who haven't been active for 2+ days
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      
      // Get inactive users with active subscriptions
      const inactiveUsers = await prisma.user.findMany({
        where: {
          subscription: {
            status: 'active',
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          currentDay: true,
          currentStreak: true,
        },
      });
      
      if (!inactiveUsers || inactiveUsers.length === 0) return;
      
      // Send reminders
      for (const user of inactiveUsers) {
        // Check email preferences
        const canSend = await this.checkEmailPreference(user.id, 'reminders');
        if (!canSend) continue;
        
        // Check last activity
        const lastProgress = await prisma.dailyProgress.findFirst({
          where: { userId: user.id },
          orderBy: { day: 'desc' },
          select: { completedAt: true },
        });
        
        if (!lastProgress || !lastProgress.completedAt) continue;
        
        const daysSinceActive = Math.floor(
          (Date.now() - new Date(lastProgress.completedAt).getTime()) / 
          (1000 * 60 * 60 * 24)
        );
        
        // Only send if 2-3 days inactive
        if (daysSinceActive < 2 || daysSinceActive > 3) continue;
        
        const streakLost = daysSinceActive === 2 && user.currentStreak > 0;
        
        // Generate unsubscribe URL
        const unsubscribeUrl = this.generateUnsubscribeUrl(user.id, 'reminders');
        
        // Send email
        const template = emailTemplates.inactiveReminder(
          user.name,
          user.currentDay || 0,
          streakLost,
          unsubscribeUrl
        );
        
        await sendEmail({
          to: user.email,
          ...template,
        });
        
        // Log email sent
        await this.logEmailSent(user.id, 'inactive_reminder');
      }
      
    } catch (error) {
      console.error('Failed to send inactive reminders:', error);
    }
  }

  // Helper: Generate unsubscribe URL
  private static generateUnsubscribeUrl(userId: string, emailType: string): string {
    const token = Buffer.from(`${userId}:${emailType}`).toString('base64');
    return `https://theindianstartup.in/unsubscribe?token=${token}`;
  }

  // Helper: Log email sent
  private static async logEmailSent(
    userId: string, 
    emailType: string, 
    metadata?: Record<string, any>
  ) {
    try {
      // Get user email for logging
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      });
      
      if (!user) return;
      
      await prisma.emailLog.create({
        data: {
          userId,
          emailType,
          subject: `Email type: ${emailType}`,
          sentTo: user.email,
          status: 'sent',
          metadata,
        },
      });
    } catch (error) {
      console.error('Failed to log email:', error);
    }
  }

  // Check user's email preferences
  static async checkEmailPreference(userId: string, emailType: string): Promise<boolean> {
    try {
      const preferences = await prisma.emailPreference.findUnique({
        where: { userId },
      });
      
      if (!preferences) return true; // Default to sending
      
      // Check if globally unsubscribed
      if (preferences.unsubscribedAll) return false;
      
      // Check specific preference
      switch (emailType) {
        case 'dailyReminders':
          return preferences.dailyReminders;
        case 'weeklyReports':
          return preferences.weeklyReports;
        case 'achievements':
          return preferences.achievements;
        case 'milestones':
          return preferences.milestones;
        case 'onboarding':
          return true; // Always send onboarding emails
        default:
          return true;
      }
    } catch (error) {
      console.error('Failed to check email preferences:', error);
      return true; // Default to sending
    }
  }

  // Send admin notification for critical feedback
  static async sendAdminNotification(data: {
    subject: string;
    message: string;
    priority?: 'low' | 'medium' | 'high';
  }) {
    try {
      await sendEmail({
        to: 'support@theindianstartup.in',
        subject: `[Admin Alert] ${data.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: ${data.priority === 'high' ? '#fee' : '#f9f9f9'}; padding: 20px; border-radius: 8px;">
              ${data.message}
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #666;">
                This is an automated notification from The Indian Startup platform.
              </p>
            </div>
          </div>
        `,
      });
    } catch (error) {
      console.error('Failed to send admin notification:', error);
    }
  }

  // Send thank you email for feedback
  static async sendThankYouForFeedback(email: string, data: {
    type: string;
    title: string;
    userName: string;
  }) {
    try {
      const { getEmailHeader, getEmailFooter } = emailTemplates;
      
      await sendEmail({
        to: email,
        subject: 'Thank you for your feedback!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            ${getEmailHeader()}
            
            <div style="padding: 30px;">
              <h1 style="color: #000; margin-bottom: 20px;">Thank You for Your Feedback! 🙏</h1>
              
              <p>Hi ${data.userName},</p>
              
              <p>Thank you for taking the time to share your feedback about The Indian Startup platform. 
              We truly appreciate your input!</p>
              
              <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #000;">
                <h3 style="margin-top: 0; color: #000;">Your Feedback</h3>
                <p><strong>Type:</strong> ${data.type.charAt(0).toUpperCase() + data.type.slice(1)}</p>
                <p><strong>Title:</strong> ${data.title}</p>
              </div>
              
              <p>Our team reviews all feedback carefully. If your submission requires a response, 
              we'll get back to you within 2-3 business days.</p>
              
              <p>Your feedback helps us improve the platform for all Indian founders. Thank you for 
              being part of our community!</p>
              
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" 
                   style="background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
                  Continue Your Journey
                </a>
              </div>
              
              <p>Best regards,<br>
              The Indian Startup Team</p>
            </div>
            
            ${getEmailFooter()}
          </div>
        `,
      });
    } catch (error) {
      console.error('Failed to send thank you email:', error);
    }
  }
}