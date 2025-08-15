// Base email layout wrapper
const emailLayout = (content: string, unsubscribeUrl?: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Indian Startup</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', Arial, sans-serif; background-color: #f5f5f5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">The Indian Startup</h1>
              <p style="color: #888888; margin: 8px 0 0 0; font-size: 14px;">Your 30-Day Journey to Launch</p>
            </td>
          </tr>
          <!-- Content -->
          <tr>
            <td style="padding: 32px 24px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9f9f9; padding: 24px; text-align: center; border-top: 1px solid #e5e5e5;">
              <p style="color: #666666; margin: 0 0 8px 0; font-size: 14px;">
                The Indian Startup | support@theindianstartup.in
              </p>
              <p style="color: #999999; margin: 0; font-size: 12px;">
                ${unsubscribeUrl ? `<a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline;">Unsubscribe</a> | ` : ''}
                <a href="https://theindianstartup.in/privacy" style="color: #999999; text-decoration: underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// Button component
const emailButton = (text: string, href: string) => `
  <table cellpadding="0" cellspacing="0" border="0" style="margin: 24px 0;">
    <tr>
      <td style="background-color: #10B981; border-radius: 6px;">
        <a href="${href}" style="display: inline-block; padding: 14px 28px; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 16px;">
          ${text}
        </a>
      </td>
    </tr>
  </table>
`;

export const emailTemplates = {
  welcome: (name: string, unsubscribeUrl?: string) => ({
    subject: 'Welcome to The Indian Startup 30-Day Sprint! 🚀',
    html: emailLayout(`
      <h2 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 700;">Welcome, ${name}! 🎉</h2>
      <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        You're about to embark on an exciting 30-day journey to launch your startup. We're thrilled to have you join our community of ambitious Indian founders!
      </p>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600;">What happens next?</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 12px 0;">✅ <strong>Day 1 is ready:</strong> Start with Idea Refinement & Goal Setting</li>
          <li style="margin: 0 0 12px 0;">📧 <strong>Daily reminders:</strong> We'll send you a nudge at 9 AM IST every day</li>
          <li style="margin: 0 0 12px 0;">🏆 <strong>Earn rewards:</strong> Complete tasks to earn XP and unlock achievement badges</li>
          <li style="margin: 0;">👥 <strong>Join the community:</strong> Connect with fellow founders on the same journey</li>
        </ul>
      </div>
      
      ${emailButton('Start Day 1 Now', 'https://theindianstartup.in/journey/day/1')}
      
      <p style="margin: 24px 0 16px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        <strong>Pro tip:</strong> Set aside 30-60 minutes each day for your startup journey. Consistency is key to success!
      </p>
      
      <p style="margin: 0; font-size: 14px; color: #666666;">
        Need help? Just reply to this email and we'll get back to you within 24 hours.
      </p>
      
      <p style="margin: 24px 0 0 0; font-size: 16px; color: #333333;">
        Best,<br>
        <strong>The Indian Startup Team</strong>
      </p>
    `, unsubscribeUrl),
    text: `Welcome ${name}! Your 30-day journey starts now. Visit your dashboard to begin: https://theindianstartup.in/journey/day/1`,
  }),

  dailyReminder: (name: string, day: number, dayTitle: string, streakDays: number, tasksCount: number, unsubscribeUrl?: string) => ({
    subject: `Day ${day}: ${dayTitle} - Ready for you! 📚`,
    html: emailLayout(`
      <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Good morning, ${name}! ☀️</h2>
      
      <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; padding: 16px; margin: 0 0 24px 0; border-radius: 4px;">
        <p style="margin: 0; font-size: 16px; color: #92400E;">
          <strong>🔥 ${streakDays} day streak!</strong> Keep it going!
        </p>
      </div>
      
      <h3 style="margin: 0 0 8px 0; font-size: 20px; font-weight: 600;">Today is Day ${day}</h3>
      <p style="margin: 0 0 24px 0; font-size: 18px; color: #555555;">
        <strong>${dayTitle}</strong>
      </p>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
        <p style="margin: 0 0 12px 0; font-size: 16px; color: #333333;">
          <strong>What you'll accomplish today:</strong>
        </p>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 8px 0;">Complete ${tasksCount} action items</li>
          <li style="margin: 0 0 8px 0;">Earn 20+ XP points</li>
          <li style="margin: 0;">Move one step closer to launch</li>
        </ul>
      </div>
      
      ${emailButton(`Start Day ${day}`, `https://theindianstartup.in/journey/day/${day}`)}
      
      <p style="margin: 0; font-size: 14px; color: #666666; font-style: italic;">
        "The secret of getting ahead is getting started." - Mark Twain
      </p>
    `, unsubscribeUrl),
    text: `Good morning ${name}! Day ${day} - ${dayTitle} is ready. You have a ${streakDays} day streak! Visit: https://theindianstartup.in/journey/day/${day}`,
  }),

  paymentConfirmation: (name: string, amount: number, orderId: string, invoiceUrl: string) => ({
    subject: 'Payment Confirmed - Welcome to The Indian Startup! 🎉',
    html: emailLayout(`
      <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700; color: #10B981;">Payment Successful! ✅</h2>
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        Hi ${name},<br><br>
        Thank you for joining The Indian Startup! Your payment has been confirmed and your account is now active.
      </p>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Payment Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #666666;">Order ID:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">${orderId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666;">Amount:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">₹${amount}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666666;">GST (18%):</td>
            <td style="padding: 8px 0; text-align: right;">₹${(amount * 0.18).toFixed(2)}</td>
          </tr>
          <tr style="border-top: 2px solid #e5e5e5;">
            <td style="padding: 8px 0; font-weight: 600;">Total:</td>
            <td style="padding: 8px 0; text-align: right; font-weight: 600;">₹${(amount * 1.18).toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #F0FDF4; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What you get:</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 12px 0;">✅ 365 days access to the 30-Day India Launch Sprint</li>
          <li style="margin: 0 0 12px 0;">📚 All templates, checklists, and resources</li>
          <li style="margin: 0 0 12px 0;">👥 Access to founder community</li>
          <li style="margin: 0 0 12px 0;">🏆 Gamification with XP and achievement badges</li>
          <li style="margin: 0;">📧 Daily reminders and progress tracking</li>
        </ul>
      </div>
      
      ${emailButton('Start Your Journey', 'https://theindianstartup.in/journey/day/1')}
      
      <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">
        <a href="${invoiceUrl}" style="color: #10B981; text-decoration: none;">Download Invoice</a> (GST compliant)
      </p>
    `),
    text: `Payment confirmed! Hi ${name}, your payment of ₹${amount} has been confirmed. Order ID: ${orderId}. Visit your dashboard: https://theindianstartup.in/dashboard`,
  }),

  achievementUnlocked: (name: string, badgeName: string, description: string, xpReward: number, unsubscribeUrl?: string) => ({
    subject: `🏆 Achievement Unlocked: ${badgeName}!`,
    html: emailLayout(`
      <div style="text-align: center; margin: 0 0 32px 0;">
        <div style="display: inline-block; background: linear-gradient(135deg, #FCD34D, #F59E0B); padding: 20px; border-radius: 50%; margin: 0 0 16px 0;">
          <span style="font-size: 48px;">🏆</span>
        </div>
        <h2 style="margin: 0; font-size: 28px; font-weight: 700;">Congratulations, ${name}!</h2>
      </div>
      
      <div style="background-color: #FEF3C7; border-radius: 8px; padding: 24px; margin: 0 0 24px 0; text-align: center;">
        <h3 style="margin: 0 0 8px 0; font-size: 24px; font-weight: 600; color: #92400E;">${badgeName}</h3>
        <p style="margin: 0 0 16px 0; font-size: 16px; color: #78350F;">${description}</p>
        ${xpReward > 0 ? `<p style="margin: 0; font-size: 18px; font-weight: 600; color: #92400E;">+${xpReward} Bonus XP!</p>` : ''}
      </div>
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333; text-align: center;">
        You're making incredible progress! Keep up the amazing work and unlock more achievements.
      </p>
      
      ${emailButton('View All Achievements', 'https://theindianstartup.in/gamification')}
    `, unsubscribeUrl),
    text: `Congratulations ${name}! You've unlocked the ${badgeName} achievement: ${description}. ${xpReward > 0 ? `+${xpReward} Bonus XP!` : ''} View your dashboard: https://theindianstartup.in/gamification`,
  }),

  weeklyProgress: (name: string, stats: {
    completedDays: number,
    totalXP: number,
    currentLevel: number,
    newBadges: string[],
    currentStreak: number,
    rank?: number,
  }, unsubscribeUrl?: string) => ({
    subject: `Your Weekly Progress Report 📊 - Level ${stats.currentLevel}`,
    html: emailLayout(`
      <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700;">Weekly Progress Report</h2>
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        Hi ${name},<br><br>
        Here's your progress summary for this week:
      </p>
      
      <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); border-radius: 8px; padding: 32px; margin: 0 0 24px 0; color: #ffffff; text-align: center;">
        <h3 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">Your Stats</h3>
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap;">
          <div style="margin: 0 12px 16px 12px;">
            <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.completedDays}</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Days Completed</p>
          </div>
          <div style="margin: 0 12px 16px 12px;">
            <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.totalXP}</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">XP Earned</p>
          </div>
          <div style="margin: 0 12px 16px 12px;">
            <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.currentStreak}</p>
            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Day Streak</p>
          </div>
        </div>
      </div>
      
      ${stats.newBadges.length > 0 ? `
        <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
          <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">🏆 New Badges Earned</h3>
          <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
            ${stats.newBadges.map(badge => `<li style="margin: 0 0 8px 0;">${badge}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        ${stats.completedDays === 7 ? 
          "Perfect week! You completed all 7 days. Keep this momentum going!" : 
          `You completed ${stats.completedDays} out of 7 days. ${stats.completedDays >= 5 ? "Great job!" : "Try to be more consistent next week!"}`
        }
      </p>
      
      ${emailButton('Continue Your Journey', 'https://theindianstartup.in/journey')}
    `, unsubscribeUrl),
    text: `Hi ${name}, your weekly progress: ${stats.completedDays}/7 days, ${stats.totalXP} XP, Level ${stats.currentLevel}. Continue: https://theindianstartup.in/journey`,
  }),

  milestoneReached: (name: string, milestone: string, nextMilestone: string, unsubscribeUrl?: string) => ({
    subject: `🎯 Milestone Reached: ${milestone}!`,
    html: emailLayout(`
      <div style="text-align: center; margin: 0 0 32px 0;">
        <div style="display: inline-block; background: linear-gradient(135deg, #10B981, #059669); padding: 20px; border-radius: 50%; margin: 0 0 16px 0;">
          <span style="font-size: 48px;">🎯</span>
        </div>
        <h2 style="margin: 0; font-size: 28px; font-weight: 700;">Milestone Reached!</h2>
      </div>
      
      <p style="margin: 0 0 24px 0; font-size: 18px; line-height: 1.6; color: #333333; text-align: center;">
        <strong>${name}, you've reached ${milestone}!</strong>
      </p>
      
      <div style="background-color: #F0FDF4; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <p style="margin: 0; font-size: 16px; color: #166534;">
          This is a significant achievement in your startup journey. Take a moment to celebrate your progress!
        </p>
      </div>
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        <strong>What's next?</strong> ${nextMilestone}
      </p>
      
      ${emailButton('Keep Going', 'https://theindianstartup.in/journey')}
    `, unsubscribeUrl),
    text: `Congratulations ${name}! You've reached ${milestone}. Next up: ${nextMilestone}. Continue: https://theindianstartup.in/journey`,
  }),

  inactiveReminder: (name: string, lastActiveDay: number, streakLost: boolean, unsubscribeUrl?: string) => ({
    subject: streakLost ? '🔥 Your streak needs you!' : 'We miss you! Continue your startup journey',
    html: emailLayout(`
      <h2 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 700;">Hi ${name}, we miss you!</h2>
      
      ${streakLost ? `
        <div style="background-color: #FEE2E2; border-left: 4px solid #EF4444; padding: 16px; margin: 0 0 24px 0; border-radius: 4px;">
          <p style="margin: 0; font-size: 16px; color: #991B1B;">
            <strong>⚠️ Your streak is about to break!</strong> Don't lose your progress.
          </p>
        </div>
      ` : ''}
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        You last worked on Day ${lastActiveDay} of your startup journey. Your future startup is waiting for you to continue!
      </p>
      
      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <p style="margin: 0 0 12px 0; font-size: 16px; color: #333333;">
          <strong>Remember why you started:</strong>
        </p>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 8px 0;">To turn your idea into reality</li>
          <li style="margin: 0 0 8px 0;">To build something meaningful</li>
          <li style="margin: 0;">To join India's startup revolution</li>
        </ul>
      </div>
      
      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        <strong>Just 30-60 minutes today</strong> can make all the difference. Don't let another day pass!
      </p>
      
      ${emailButton('Resume Journey', `https://theindianstartup.in/journey/day/${lastActiveDay + 1}`)}
      
      <p style="margin: 0; font-size: 14px; color: #666666; font-style: italic;">
        "The best time to plant a tree was 20 years ago. The second best time is now." - Chinese Proverb
      </p>
    `, unsubscribeUrl),
    text: `Hi ${name}, we miss you! You last worked on Day ${lastActiveDay}. ${streakLost ? 'Your streak is about to break!' : ''} Resume: https://theindianstartup.in/journey/day/${lastActiveDay + 1}`,
  }),

  // Utility functions for custom emails
  getEmailHeader: () => `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #000000; padding: 24px;">
      <tr>
        <td align="center">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">The Indian Startup</h1>
          <p style="color: #888888; margin: 8px 0 0 0; font-size: 14px;">Your 30-Day Journey to Launch</p>
        </td>
      </tr>
    </table>
  `,

  getEmailFooter: (unsubscribeUrl?: string) => `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #f9f9f9; padding: 24px; border-top: 1px solid #e5e5e5;">
      <tr>
        <td align="center">
          <p style="color: #666666; margin: 0 0 8px 0; font-size: 14px;">
            The Indian Startup | support@theindianstartup.in
          </p>
          <p style="color: #999999; margin: 0; font-size: 12px;">
            ${unsubscribeUrl ? `<a href="${unsubscribeUrl}" style="color: #999999; text-decoration: underline;">Unsubscribe</a> | ` : ''}
            <a href="https://theindianstartup.in/privacy" style="color: #999999; text-decoration: underline;">Privacy Policy</a>
          </p>
        </td>
      </tr>
    </table>
  `,
};