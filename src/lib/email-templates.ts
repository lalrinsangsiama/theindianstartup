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
      
      ${emailButton('View All Achievements', 'https://theindianstartup.in/dashboard')}
    `, unsubscribeUrl),
    text: `Congratulations ${name}! You've unlocked the ${badgeName} achievement: ${description}. ${xpReward > 0 ? `+${xpReward} Bonus XP!` : ''} View your dashboard: https://theindianstartup.in/dashboard`,
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

  // Welcome Email Sequence Templates
  welcomeDay1: (name: string, unsubscribeUrl?: string) => ({
    subject: '🌟 Day 1 Tips: Get the Most Out of Your Startup Journey',
    html: emailLayout(`
      <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Great job on starting Day 1, ${name}! 🎉</h2>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        You've taken the first step! Here are some tips to maximize your learning experience:
      </p>

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">💡 Pro Tips for Success</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 12px 0;"><strong>Set a daily time:</strong> Block 30-60 minutes at the same time each day</li>
          <li style="margin: 0 0 12px 0;"><strong>Take notes:</strong> Keep a startup journal for your insights</li>
          <li style="margin: 0 0 12px 0;"><strong>Complete the tasks:</strong> Each day has actionable exercises - do them!</li>
          <li style="margin: 0 0 12px 0;"><strong>Ask questions:</strong> Use the community forum when you're stuck</li>
          <li style="margin: 0;"><strong>Build your portfolio:</strong> Update it as you progress</li>
        </ul>
      </div>

      <div style="background-color: #EEF2FF; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
        <p style="margin: 0; font-size: 16px; color: #4338CA;">
          <strong>🎯 Today's Goal:</strong> Complete your Idea Canvas and set your 30-day milestones
        </p>
      </div>

      ${emailButton('Continue Day 1', 'https://theindianstartup.in/journey/day/1')}

      <p style="margin: 0; font-size: 14px; color: #666666;">
        Remember: Consistency beats intensity. Even 15 minutes a day keeps the momentum going!
      </p>
    `, unsubscribeUrl),
    text: `Great job starting Day 1, ${name}! Pro tips: Set a daily time, take notes, complete tasks, ask questions in the community, and build your portfolio. Continue at: https://theindianstartup.in/journey/day/1`,
  }),

  welcomeDay3: (name: string, completedDays: number, unsubscribeUrl?: string) => ({
    subject: '👋 Checking in: How\'s your startup journey going?',
    html: emailLayout(`
      <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700;">Hey ${name}! 👋</h2>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        It's been 3 days since you joined! We wanted to check in and see how things are going.
      </p>

      ${completedDays > 0 ? `
        <div style="background-color: #F0FDF4; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
          <p style="margin: 0; font-size: 16px; color: #166534;">
            <strong>✅ You've completed ${completedDays} day${completedDays > 1 ? 's' : ''}!</strong> You're off to a great start.
          </p>
        </div>
      ` : `
        <div style="background-color: #FEF3C7; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
          <p style="margin: 0; font-size: 16px; color: #92400E;">
            <strong>⏰ Haven't started yet?</strong> That's okay! The best time to start is now.
          </p>
        </div>
      `}

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Common Questions from Founders</h3>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #555555;">
          <strong>Q: I'm stuck on a concept. What should I do?</strong><br>
          A: Post in our community! Fellow founders and our team are here to help.
        </p>
        <p style="margin: 0 0 12px 0; font-size: 15px; color: #555555;">
          <strong>Q: Can I skip ahead?</strong><br>
          A: We recommend going in order, but you can jump to any day if needed.
        </p>
        <p style="margin: 0; font-size: 15px; color: #555555;">
          <strong>Q: How do I update my startup portfolio?</strong><br>
          A: Visit the Portfolio section in your dashboard anytime!
        </p>
      </div>

      ${emailButton('Continue Your Journey', 'https://theindianstartup.in/journey')}

      <p style="margin: 24px 0 0 0; font-size: 14px; color: #666666;">
        Need personal help? Just reply to this email and we'll assist you within 24 hours.
      </p>
    `, unsubscribeUrl),
    text: `Hey ${name}! It's been 3 days. ${completedDays > 0 ? `You've completed ${completedDays} days - great start!` : 'Ready to begin?'} Continue at: https://theindianstartup.in/journey`,
  }),

  welcomeDay7: (name: string, stats: { completedDays: number; totalXP: number; badges: string[] }, unsubscribeUrl?: string) => ({
    subject: '🎊 Week 1 Complete! Your Progress Report',
    html: emailLayout(`
      <div style="text-align: center; margin: 0 0 32px 0;">
        <div style="display: inline-block; background: linear-gradient(135deg, #10B981, #059669); padding: 16px; border-radius: 50%; margin: 0 0 16px 0;">
          <span style="font-size: 40px;">🎊</span>
        </div>
        <h2 style="margin: 0; font-size: 28px; font-weight: 700;">Week 1 Complete!</h2>
      </div>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333; text-align: center;">
        Congratulations ${name}! You've been on your startup journey for a full week.
      </p>

      <div style="background: linear-gradient(135deg, #3B82F6, #8B5CF6); border-radius: 12px; padding: 32px; margin: 0 0 24px 0; color: #ffffff;">
        <h3 style="margin: 0 0 24px 0; font-size: 18px; font-weight: 600; text-align: center;">Your Week 1 Stats</h3>
        <table style="width: 100%; text-align: center;">
          <tr>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 32px; font-weight: 700;">${stats.completedDays}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Days Completed</p>
            </td>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 32px; font-weight: 700;">${stats.totalXP}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">XP Earned</p>
            </td>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 32px; font-weight: 700;">${stats.badges.length}</p>
              <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Badges Earned</p>
            </td>
          </tr>
        </table>
      </div>

      ${stats.completedDays >= 5 ? `
        <div style="background-color: #F0FDF4; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
          <p style="margin: 0; font-size: 16px; color: #166534;">
            <strong>🌟 Outstanding!</strong> You're in the top 20% of founders who complete 5+ days in their first week!
          </p>
        </div>
      ` : `
        <div style="background-color: #FEF3C7; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
          <p style="margin: 0; font-size: 16px; color: #92400E;">
            <strong>💪 Keep pushing!</strong> Week 2 is where real momentum builds. Aim for 5 days this week!
          </p>
        </div>
      `}

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What's Coming in Week 2</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 8px 0;">Market validation techniques</li>
          <li style="margin: 0 0 8px 0;">Building your MVP roadmap</li>
          <li style="margin: 0 0 8px 0;">Customer discovery interviews</li>
          <li style="margin: 0;">Financial planning basics</li>
        </ul>
      </div>

      ${emailButton('Start Week 2', 'https://theindianstartup.in/journey')}
    `, unsubscribeUrl),
    text: `Week 1 Complete, ${name}! Stats: ${stats.completedDays} days, ${stats.totalXP} XP, ${stats.badges.length} badges. Keep going at: https://theindianstartup.in/journey`,
  }),

  welcomeDay14: (name: string, stats: { completedDays: number; portfolioProgress: number }, unsubscribeUrl?: string) => ({
    subject: '🌟 Halfway There! 14 Days of Your Startup Journey',
    html: emailLayout(`
      <div style="text-align: center; margin: 0 0 32px 0;">
        <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700;">Halfway There! 🌟</h2>
        <p style="margin: 0; font-size: 16px; color: #666666;">14 days into your startup journey</p>
      </div>

      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #333333;">
        Hi ${name},<br><br>
        You're now at the midpoint of your 30-day journey! This is the perfect time to reflect on your progress and gear up for the exciting second half.
      </p>

      <div style="background-color: #f9f9f9; border-radius: 12px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">Your Progress at Day 14</h3>
        <div style="display: flex; align-items: center; margin: 0 0 16px 0;">
          <div style="flex: 1; background-color: #E5E7EB; border-radius: 9999px; height: 12px; margin-right: 12px;">
            <div style="background: linear-gradient(to right, #10B981, #059669); height: 12px; border-radius: 9999px; width: ${Math.min(100, (stats.completedDays / 14) * 100)}%;"></div>
          </div>
          <span style="font-weight: 600;">${stats.completedDays}/14 days</span>
        </div>
        <p style="margin: 0; font-size: 14px; color: #666666;">
          Portfolio completion: ${stats.portfolioProgress}%
        </p>
      </div>

      <div style="background-color: #EEF2FF; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #4338CA;">What's Ahead in Days 15-30</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 8px 0;">🚀 Launch strategy and execution</li>
          <li style="margin: 0 0 8px 0;">💰 Funding and investor readiness</li>
          <li style="margin: 0 0 8px 0;">📈 Growth hacking techniques</li>
          <li style="margin: 0 0 8px 0;">⚖️ Legal and compliance essentials</li>
          <li style="margin: 0;">🎯 Your 90-day action plan</li>
        </ul>
      </div>

      <div style="background-color: #FEF3C7; border-radius: 8px; padding: 20px; margin: 0 0 24px 0;">
        <p style="margin: 0; font-size: 16px; color: #92400E;">
          <strong>🎯 Mid-Journey Challenge:</strong> This week, share your startup idea in the community and get feedback from at least 3 fellow founders!
        </p>
      </div>

      ${emailButton('Continue to Day 15', 'https://theindianstartup.in/journey')}

      <p style="margin: 24px 0 0 0; font-size: 14px; color: #666666; text-align: center;">
        "You're closer to your goal than when you started. Keep going!"
      </p>
    `, unsubscribeUrl),
    text: `Halfway there, ${name}! You've completed ${stats.completedDays}/14 days. The exciting second half awaits with launch strategy, funding prep, and more. Continue at: https://theindianstartup.in/journey`,
  }),

  welcomeDay30: (name: string, stats: { totalXP: number; badges: string[]; portfolioProgress: number }, unsubscribeUrl?: string) => ({
    subject: '🎓 Congratulations! You Completed the 30-Day Sprint!',
    html: emailLayout(`
      <div style="text-align: center; margin: 0 0 32px 0;">
        <div style="display: inline-block; background: linear-gradient(135deg, #F59E0B, #D97706); padding: 24px; border-radius: 50%; margin: 0 0 16px 0;">
          <span style="font-size: 56px;">🎓</span>
        </div>
        <h2 style="margin: 0; font-size: 32px; font-weight: 700;">Congratulations, ${name}!</h2>
        <p style="margin: 8px 0 0 0; font-size: 18px; color: #666666;">You've completed the 30-Day India Launch Sprint!</p>
      </div>

      <div style="background: linear-gradient(135deg, #1E3A8A, #7C3AED); border-radius: 12px; padding: 32px; margin: 0 0 24px 0; color: #ffffff; text-align: center;">
        <h3 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">🏆 Your Final Stats</h3>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.totalXP}</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Total XP</p>
            </td>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.badges.length}</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Badges</p>
            </td>
            <td style="padding: 0 10px;">
              <p style="margin: 0; font-size: 36px; font-weight: 700;">${stats.portfolioProgress}%</p>
              <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">Portfolio</p>
            </td>
          </tr>
        </table>
      </div>

      <div style="background-color: #F0FDF4; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #166534;">🎖️ Your Achievements</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #166534;">
          <li style="margin: 0 0 8px 0;">Completed the full 30-day curriculum</li>
          <li style="margin: 0 0 8px 0;">Built your startup portfolio</li>
          <li style="margin: 0 0 8px 0;">Mastered India-specific startup strategies</li>
          <li style="margin: 0;">Joined the founder community</li>
        </ul>
      </div>

      <div style="background-color: #f9f9f9; border-radius: 8px; padding: 24px; margin: 0 0 24px 0;">
        <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600;">What's Next?</h3>
        <ul style="margin: 0; padding: 0 0 0 20px; color: #555555;">
          <li style="margin: 0 0 12px 0;">📜 <strong>Download your certificate</strong> from your dashboard</li>
          <li style="margin: 0 0 12px 0;">🔄 <strong>Review and revisit</strong> any day's content anytime (365-day access)</li>
          <li style="margin: 0 0 12px 0;">📚 <strong>Explore advanced courses:</strong> Funding Mastery, Legal Stack, Sales & GTM</li>
          <li style="margin: 0 0 12px 0;">👥 <strong>Stay connected</strong> with the community</li>
          <li style="margin: 0;">🚀 <strong>Take action</strong> on your 90-day plan!</li>
        </ul>
      </div>

      ${emailButton('View Your Certificate', 'https://theindianstartup.in/dashboard')}

      <div style="margin: 32px 0 0 0; padding: 24px; border: 2px solid #000; border-radius: 8px; text-align: center;">
        <h3 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600;">Ready for the Next Level?</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">
          Unlock all 30 courses with All-Access and continue your growth journey!
        </p>
        <a href="https://theindianstartup.in/pricing" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">
          Explore All Courses
        </a>
      </div>

      <p style="margin: 32px 0 0 0; font-size: 14px; color: #666666; text-align: center;">
        Thank you for being part of The Indian Startup journey. We can't wait to see what you build! 💪
      </p>
    `, unsubscribeUrl),
    text: `Congratulations ${name}! You've completed the 30-Day India Launch Sprint! Total XP: ${stats.totalXP}, Badges: ${stats.badges.length}. Download your certificate and explore advanced courses at: https://theindianstartup.in/dashboard`,
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