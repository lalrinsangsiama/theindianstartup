# Supabase Security Setup Guide

## 🚨 CRITICAL: Enable Row Level Security (RLS)

Without RLS, all your data is publicly accessible! Follow these steps immediately:

## Step 1: Apply RLS Policies

### Option A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/enotnyhykuwnfiyzfoko
2. Click on "SQL Editor" in the left sidebar
3. Copy the entire contents of `prisma/rls-policies.sql`
4. Paste into the SQL editor
5. Click "Run" to execute

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref enotnyhykuwnfiyzfoko

# Apply RLS policies
supabase db push prisma/rls-policies.sql
```

## Step 2: Configure Authentication in Supabase

1. **Email Templates** (for GoDaddy SMTP):
   - Go to Authentication → Email Templates
   - Click "Enable Custom SMTP"
   - Enter these settings:
     ```
     Host: smtpout.secureserver.net
     Port: 465
     Username: support@theindianstartup.in
     Password: [Your GoDaddy password]
     Sender email: support@theindianstartup.in
     Sender name: The Indian Startup
     ```

2. **Auth Settings**:
   - Go to Authentication → Settings
   - Under "Auth Providers", ensure Email is enabled
   - Set these options:
     - Enable email confirmations: ON
     - Enable email OTP: OFF (use password-based auth)
     - Minimum password length: 8

3. **Email Templates to Customize**:
   - Confirmation Email
   - Password Reset
   - Magic Link (if using)

## Step 3: Verify RLS is Working

Run this test query in SQL Editor:

```sql
-- Check if RLS is enabled on all tables
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('User', 'Subscription', 'DailyProgress', 'StartupPortfolio', 'XPEvent', 'DailyLesson', 'Badge');
```

All tables should show `rowsecurity = true`.

## Step 4: Create Service Role Key Usage

The service role key (in your .env) bypasses RLS and should only be used for:
- Payment webhook processing
- Admin operations
- System-awarded XP events

Never expose this key to the client side!

## RLS Policies Summary

### User Table
- ✅ Users can view/update their own profile
- ❌ Users cannot view other users' data
- ✅ Service role has full access

### Subscription Table
- ✅ Users can view their own subscription
- ❌ Users cannot create/modify subscriptions
- ✅ Only service role can manage (via payment webhooks)

### DailyProgress Table
- ✅ Users can view/update their own progress
- ❌ Cannot access other users' progress

### StartupPortfolio Table
- ✅ Users can fully manage their own portfolio
- ❌ Portfolios are private to each user

### XPEvent Table
- ✅ Users can view their own XP history
- ❌ Only system can award XP (via service role)

### DailyLesson Table
- ✅ Authenticated users with active subscription can view
- ❌ No access without valid subscription

### Badge Table
- ✅ All authenticated users can view available badges

## Testing RLS

Create a test file `test-rls.js`:

```javascript
const { createClient } = require('@supabase/supabase-js');

// Using anon key (respects RLS)
const supabase = createClient(
  'https://enotnyhykuwnfiyzfoko.supabase.co',
  'your-anon-key'
);

async function testRLS() {
  // This should return empty array (no auth)
  const { data, error } = await supabase
    .from('User')
    .select('*');
    
  console.log('Unauthenticated query:', data, error);
}

testRLS();
```

## Important Security Notes

1. **Never disable RLS** on production tables
2. **Test all policies** before going live
3. **Use service role sparingly** - only for backend operations
4. **Monitor failed requests** in Supabase logs
5. **Regular security audits** of your policies

## Next Steps

After enabling RLS:
1. ✅ Test authentication flow
2. ✅ Verify data access restrictions
3. ✅ Set up auth UI components
4. ✅ Implement protected routes

## Troubleshooting

### "Permission denied" errors
- Check if user is authenticated
- Verify RLS policies are correct
- Ensure subscription is active (for lesson access)

### Auth emails not sending
- Verify SMTP settings in Supabase
- Check GoDaddy email credentials
- Look for errors in Auth Logs

### Service role operations failing
- Verify service key is correct
- Check if using service client (not anon client)
- Review function security settings