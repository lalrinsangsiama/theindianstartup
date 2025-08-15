# Supabase Email Templates Setup

## Overview

This guide shows how to configure custom email templates in Supabase for The Indian Startup platform.

## Email Templates

### 1. Confirm Your Signup (Verification Email)

**Subject:** 🚀 Welcome to The Indian Startup! Please verify your email

**Body:**
```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-family: 'IBM Plex Mono', monospace; font-size: 24px; color: #111111; margin: 0;">THE INDIAN STARTUP</h1>
    <p style="color: #737373; font-size: 14px; margin-top: 5px;">Launch Your Startup in 30 Days</p>
  </div>

  <div style="background: #FFFFFF; border: 2px solid #111111; padding: 40px; margin-bottom: 30px;">
    <h2 style="font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: #111111; margin-top: 0;">Welcome aboard, Founder! 🎉</h2>
    
    <p style="color: #525252; font-size: 16px; line-height: 1.6;">
      You're just one click away from starting your 30-day journey to launch your startup with India-specific guidance.
    </p>

    <p style="color: #525252; font-size: 16px; line-height: 1.6;">
      Click the button below to verify your email and unlock:
    </p>

    <ul style="color: #525252; font-size: 16px; line-height: 1.8; margin: 20px 0;">
      <li>📚 30 days of structured lessons</li>
      <li>🇮🇳 India-specific compliance guidance</li>
      <li>🎮 Gamified learning with XP and badges</li>
      <li>🤝 Access to founder community</li>
      <li>📊 Startup portfolio builder</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #111111; color: #FFFFFF; padding: 14px 32px; text-decoration: none; font-family: 'IBM Plex Mono', monospace; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #111111; transition: all 0.3s;">
        Verify Email & Start Journey
      </a>
    </div>

    <p style="color: #737373; font-size: 14px; text-align: center;">
      Or copy and paste this link into your browser:<br>
      <span style="color: #525252; word-break: break-all;">{{ .ConfirmationURL }}</span>
    </p>
  </div>

  <div style="text-align: center; color: #737373; font-size: 14px;">
    <p>This link will expire in 24 hours.</p>
    <p>
      Having trouble? Contact us at 
      <a href="mailto:support@theindianstartup.in" style="color: #111111; text-decoration: underline;">support@theindianstartup.in</a>
    </p>
  </div>

  <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E5E5E5; text-align: center; color: #A3A3A3; font-size: 12px;">
    <p>
      © 2025 The Indian Startup. All rights reserved.<br>
      <a href="https://theindianstartup.in/terms" style="color: #737373;">Terms of Service</a> • 
      <a href="https://theindianstartup.in/privacy" style="color: #737373;">Privacy Policy</a>
    </p>
  </div>
</div>
```

### 2. Reset Password Email

**Subject:** 🔐 Reset your password for The Indian Startup

**Body:**
```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-family: 'IBM Plex Mono', monospace; font-size: 24px; color: #111111; margin: 0;">THE INDIAN STARTUP</h1>
  </div>

  <div style="background: #FFFFFF; border: 2px solid #111111; padding: 40px; margin-bottom: 30px;">
    <h2 style="font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: #111111; margin-top: 0;">Password Reset Request</h2>
    
    <p style="color: #525252; font-size: 16px; line-height: 1.6;">
      We received a request to reset your password. Click the button below to create a new password:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #111111; color: #FFFFFF; padding: 14px 32px; text-decoration: none; font-family: 'IBM Plex Mono', monospace; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
        Reset Password
      </a>
    </div>

    <p style="color: #737373; font-size: 14px; text-align: center;">
      Or copy and paste this link:<br>
      <span style="color: #525252; word-break: break-all;">{{ .ConfirmationURL }}</span>
    </p>

    <p style="color: #737373; font-size: 14px; margin-top: 30px;">
      If you didn't request this, please ignore this email. Your password won't be changed.
    </p>
  </div>

  <div style="text-align: center; color: #737373; font-size: 14px;">
    <p>This link will expire in 1 hour.</p>
    <p>
      Need help? Contact us at 
      <a href="mailto:support@theindianstartup.in" style="color: #111111; text-decoration: underline;">support@theindianstartup.in</a>
    </p>
  </div>
</div>
```

### 3. Magic Link Email

**Subject:** 🔗 Your login link for The Indian Startup

**Body:**
```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-family: 'IBM Plex Mono', monospace; font-size: 24px; color: #111111; margin: 0;">THE INDIAN STARTUP</h1>
  </div>

  <div style="background: #FFFFFF; border: 2px solid #111111; padding: 40px; margin-bottom: 30px;">
    <h2 style="font-family: 'IBM Plex Mono', monospace; font-size: 20px; color: #111111; margin-top: 0;">Your Login Link</h2>
    
    <p style="color: #525252; font-size: 16px; line-height: 1.6;">
      Click the button below to log in to your account:
    </p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; background: #111111; color: #FFFFFF; padding: 14px 32px; text-decoration: none; font-family: 'IBM Plex Mono', monospace; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
        Log In to Dashboard
      </a>
    </div>

    <p style="color: #737373; font-size: 14px; text-align: center;">
      This link will expire in 1 hour.
    </p>
  </div>

  <div style="text-align: center; color: #737373; font-size: 14px;">
    <p>
      Having trouble? Contact us at 
      <a href="mailto:support@theindianstartup.in" style="color: #111111; text-decoration: underline;">support@theindianstartup.in</a>
    </p>
  </div>
</div>
```

## How to Configure in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Email Templates**
3. For each template type:
   - Select the template (Confirm signup, Reset password, Magic link)
   - Replace the default subject and body with the templates above
   - Make sure to keep the `{{ .ConfirmationURL }}` placeholder intact
4. Save the changes

## Important Variables

- `{{ .ConfirmationURL }}` - The verification/reset link
- `{{ .Email }}` - User's email address
- `{{ .Token }}` - Verification token (if needed)

## Testing

After setting up the templates:
1. Test signup flow to check verification email
2. Test password reset flow
3. Ensure all links work correctly
4. Check email rendering in different clients

## Support Contact

All emails include the support contact: support@theindianstartup.in