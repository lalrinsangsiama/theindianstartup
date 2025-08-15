export const emailTemplates = {
  welcome: (name: string) => ({
    subject: 'Welcome to The Indian Startup 30-Day Sprint! 🚀',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome, ${name}!</h1>
        <p>You're about to embark on an exciting 30-day journey to launch your startup.</p>
        <p>Here's what happens next:</p>
        <ul>
          <li>✅ Your Day 1 lesson is ready in your dashboard</li>
          <li>📧 You'll receive daily reminders at 9 AM IST</li>
          <li>🏆 Complete tasks to earn XP and badges</li>
        </ul>
        <a href="https://theindianstartup.in/dashboard" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Start Day 1</a>
        <p>Need help? Just reply to this email.</p>
        <p>Best,<br>The Indian Startup Team</p>
      </div>
    `,
    text: `Welcome ${name}! Your 30-day journey starts now. Visit your dashboard to begin: https://theindianstartup.in/dashboard`,
  }),

  dailyReminder: (name: string, day: number, dayTitle: string, streakDays: number) => ({
    subject: `Day ${day} is ready! Continue your startup journey 📚`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Good morning, ${name}!</h2>
        <p>Day ${day} of your startup journey is waiting for you.</p>
        <p><strong>Today's focus:</strong> ${dayTitle}</p>
        <p>You have a ${streakDays} day streak going! Don't break it 🔥</p>
        <a href="https://theindianstartup.in/journey/day/${day}" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Start Day ${day}</a>
        <p>Remember: Consistency is key to success!</p>
      </div>
    `,
    text: `Good morning ${name}! Day ${day} - ${dayTitle} is ready. You have a ${streakDays} day streak! Visit: https://theindianstartup.in/journey/day/${day}`,
  }),

  purchaseConfirmation: (name: string, amount: number, orderId: string) => ({
    subject: 'Payment Confirmed - Welcome to The Indian Startup! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Payment Successful!</h1>
        <p>Hi ${name},</p>
        <p>Your payment of ₹${amount} has been confirmed.</p>
        <p><strong>What you get:</strong></p>
        <ul>
          <li>✅ 365 days access to the 30-Day India Launch Sprint</li>
          <li>✅ All templates and resources</li>
          <li>✅ Community access</li>
          <li>✅ Achievement badges</li>
        </ul>
        <p><strong>Invoice Details:</strong></p>
        <p>Order ID: ${orderId}<br>
        Amount: ₹${amount}<br>
        GST (18%): ₹${(amount * 0.18).toFixed(2)}<br>
        Total: ₹${(amount * 1.18).toFixed(2)}</p>
        <a href="https://theindianstartup.in/dashboard" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Go to Dashboard</a>
        <p>Thank you for joining us!</p>
      </div>
    `,
    text: `Payment confirmed! Hi ${name}, your payment of ₹${amount} has been confirmed. Order ID: ${orderId}. Visit your dashboard: https://theindianstartup.in/dashboard`,
  }),

  achievementUnlocked: (name: string, badgeName: string, description: string) => ({
    subject: `🏆 Achievement Unlocked: ${badgeName}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>🎉 Congratulations, ${name}!</h1>
        <p>You've unlocked a new achievement:</p>
        <div style="background: #F3F4F6; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <h2 style="margin: 0; color: #10B981;">🏆 ${badgeName}</h2>
          <p style="margin: 10px 0 0 0;">${description}</p>
        </div>
        <p>Keep up the great work! View all your achievements in your dashboard.</p>
        <a href="https://theindianstartup.in/dashboard" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">View Dashboard</a>
      </div>
    `,
    text: `Congratulations ${name}! You've unlocked the ${badgeName} achievement: ${description}. View your dashboard: https://theindianstartup.in/dashboard`,
  }),

  weeklyProgress: (name: string, completedDays: number, totalXP: number, rank: number) => ({
    subject: `Your Weekly Progress Report 📊`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Weekly Progress Report</h1>
        <p>Hi ${name}, here's your progress this week:</p>
        <div style="background: #F3F4F6; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p><strong>📅 Days Completed:</strong> ${completedDays}/7</p>
          <p><strong>⭐ Total XP Earned:</strong> ${totalXP}</p>
          <p><strong>🏅 Current Rank:</strong> #${rank}</p>
        </div>
        <p>Keep pushing forward! You're doing amazing.</p>
        <a href="https://theindianstartup.in/journey" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Continue Journey</a>
      </div>
    `,
    text: `Hi ${name}, your weekly progress: ${completedDays}/7 days completed, ${totalXP} XP earned, Rank #${rank}. Continue: https://theindianstartup.in/journey`,
  }),
};