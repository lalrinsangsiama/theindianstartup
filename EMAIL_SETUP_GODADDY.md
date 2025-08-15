# Email Setup with GoDaddy

Since you're using GoDaddy email service (support@theindianstartup.in), here's how to integrate it with your platform:

## Option 1: Use Nodemailer with GoDaddy SMTP (Recommended)

### 1. Install Nodemailer
```bash
npm install nodemailer
npm install --save-dev @types/nodemailer
```

### 2. GoDaddy SMTP Settings
Add these to your `.env.local` and Vercel environment variables:

```env
# GoDaddy Email Configuration
EMAIL_HOST=smtpout.secureserver.net
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=support@theindianstartup.in
EMAIL_PASSWORD=your-godaddy-email-password
EMAIL_FROM="The Indian Startup <support@theindianstartup.in>"
```

**Alternative SMTP Settings** (if above doesn't work):
- Host: smtp.office365.com (if using Microsoft 365)
- Port: 587
- Secure: false
- TLS: true

### 3. Create Email Service
Create `src/lib/email.ts`:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '465'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
```

### 4. Create Email Templates
Create `src/lib/email-templates.ts`:

```typescript
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

  dailyReminder: (name: string, day: number) => ({
    subject: `Day ${day} is ready! Continue your startup journey 📚`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Good morning, ${name}!</h2>
        <p>Day ${day} of your startup journey is waiting for you.</p>
        <p><strong>Today's focus:</strong> ${getDayTitle(day)}</p>
        <p>You have a ${getStreakDays()} day streak going! Don't break it 🔥</p>
        <a href="https://theindianstartup.in/journey/day/${day}" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Start Day ${day}</a>
        <p>Remember: Consistency is key to success!</p>
      </div>
    `,
  }),

  purchaseConfirmation: (name: string, amount: number) => ({
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
        <p>Order ID: ${generateOrderId()}<br>
        Amount: ₹${amount}<br>
        GST (18%): ₹${(amount * 0.18).toFixed(2)}<br>
        Total: ₹${(amount * 1.18).toFixed(2)}</p>
        <a href="https://theindianstartup.in/dashboard" style="display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">Go to Dashboard</a>
        <p>Thank you for joining us!</p>
      </div>
    `,
  }),
};
```

## Option 2: Configure Supabase to Use GoDaddy SMTP

### In Supabase Dashboard:
1. Go to Authentication → Email Templates
2. Click on "SMTP Settings"
3. Enable "Custom SMTP"
4. Enter GoDaddy settings:
   - Host: smtpout.secureserver.net
   - Port: 465
   - Username: support@theindianstartup.in
   - Password: Your email password
   - Sender email: support@theindianstartup.in
   - Sender name: The Indian Startup

This will make Supabase send all auth emails (signup, password reset) through your GoDaddy email.

## Email Integration Points

### 1. Authentication Emails (via Supabase)
- Sign up confirmation
- Password reset
- Email change confirmation

### 2. Transactional Emails (via Nodemailer)
- Welcome email after payment
- Daily lesson reminders
- Achievement notifications
- Payment confirmations

### 3. Marketing Emails (Future)
- Weekly progress reports
- New feature announcements
- Community highlights

## Testing Email Setup

Create `src/app/api/test-email/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function GET() {
  try {
    const result = await sendEmail({
      to: 'your-test-email@gmail.com',
      subject: 'Test Email from The Indian Startup',
      html: '<h1>Test Email</h1><p>If you receive this, email is working!</p>',
      text: 'Test email - if you receive this, email is working!',
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Email test failed' }, { status: 500 });
  }
}
```

Then test by visiting: http://localhost:3000/api/test-email

## Important Security Notes

1. **Never commit email passwords to Git**
   - Always use environment variables
   - Add to .gitignore if needed

2. **GoDaddy Security**
   - Enable 2FA on your GoDaddy account
   - Use app-specific passwords if available
   - Monitor for suspicious activity

3. **Rate Limits**
   - GoDaddy typically limits to 250 emails/hour
   - Implement queuing for bulk emails
   - Use batch sending for daily reminders

## Troubleshooting

### Common Issues:

1. **"Authentication Failed"**
   - Check email and password
   - Ensure no special characters need escaping
   - Try with port 587 instead of 465

2. **"Connection Timeout"**
   - Try alternate host: smtp.office365.com
   - Check if GoDaddy requires app passwords
   - Verify firewall isn't blocking

3. **"Emails Going to Spam"**
   - Set up SPF records in GoDaddy DNS
   - Add DKIM if available
   - Use consistent "From" address

## Next Steps

1. ✅ Add email environment variables to .env.local
2. ✅ Install nodemailer
3. ✅ Create email service and templates
4. ✅ Configure Supabase SMTP settings
5. ✅ Test email sending
6. ✅ Add all email env vars to Vercel