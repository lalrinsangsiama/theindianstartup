# RLS Policy Application Guide

## Error Fix: "only WITH CHECK expression allowed for INSERT"

This error occurs because PostgreSQL requires specific syntax for INSERT policies. I've created two versions of the RLS policies:

1. **Original** (`prisma/rls-policies.sql`) - Now fixed
2. **Step-by-step** (`prisma/rls-policies-step-by-step.sql`) - Run section by section

## How to Apply RLS Policies

### Method 1: Run Step by Step (Recommended)

1. Go to Supabase SQL Editor
2. Open `prisma/rls-policies-step-by-step.sql`
3. Run each step separately:
   - Step 1: Enable RLS on all tables
   - Step 2: User table policies
   - Step 3: Subscription policies
   - etc.

This helps identify exactly which policy might have issues.

### Method 2: Run All at Once

Use the updated `prisma/rls-policies.sql` file which has the corrected syntax.

## Key Changes Made

1. **INSERT policies now use correct syntax:**
   ```sql
   -- Correct syntax
   CREATE POLICY "policy_name" ON "table_name"
     FOR INSERT 
     TO authenticated
     WITH CHECK (condition);
   ```

2. **Added role specifications:**
   - `TO authenticated` - for regular users
   - `TO service_role` - for backend operations

## If You Still Get Errors

### Check Table Names
Make sure all tables exist:
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

### Drop Existing Policies
If policies already exist:
```sql
-- Drop all policies on a table
DROP POLICY IF EXISTS "Users can view own profile" ON "User";
DROP POLICY IF EXISTS "Users can update own profile" ON "User";
-- etc for each policy
```

### Manual Policy Creation
If automated script fails, create policies manually through Supabase dashboard:

1. Go to Authentication → Policies
2. Click on each table
3. Add policies manually using the UI

## Testing RLS After Application

### Test 1: Check RLS is Enabled
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('User', 'Subscription', 'DailyProgress', 'StartupPortfolio', 'XPEvent', 'DailyLesson', 'Badge');
```

All should show `rowsecurity = true`.

### Test 2: Verify Policies
```sql
SELECT schemaname, tablename, policyname, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

This shows all active policies.

### Test 3: Test Access
Try to query as anonymous user (should fail):
```sql
-- This should return error or empty
SELECT * FROM "User";
```

## Common Issues and Solutions

### Issue: "relation does not exist"
**Solution**: Table names are case-sensitive. Use double quotes around table names.

### Issue: "permission denied for schema public"
**Solution**: Run as database owner or use service role.

### Issue: Policies not working
**Solution**: 
1. Check auth.uid() is returning correct value
2. Verify JWT is being sent with requests
3. Check policy conditions match your data

## After RLS is Applied

1. **Test authentication flow** - Sign up a test user
2. **Verify data isolation** - Users can only see their own data
3. **Test subscription access** - Lessons require active subscription
4. **Monitor logs** - Check for any permission denied errors

## Emergency: Disable RLS (Not Recommended)

If you need to temporarily disable RLS for debugging:
```sql
-- DANGER: Only for debugging!
ALTER TABLE "User" DISABLE ROW LEVEL SECURITY;
-- Remember to re-enable immediately after
```

## Next Steps

Once RLS is successfully applied:
1. Configure Supabase Auth with GoDaddy SMTP
2. Create authentication components
3. Implement protected routes
4. Test the complete auth flow