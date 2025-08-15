# Deployment Instructions for The Indian Startup

## Status Check ✅

1. **NPM Dependencies** ✅ Installed
2. **Supabase** ✅ Connected and database schema created
3. **Razorpay** ✅ Keys configured (using LIVE keys)
4. **Prisma** ✅ Schema pushed to database
5. **Local Development** ✅ Server running

## Deploy to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial setup with Supabase and Razorpay"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Select your repository: `lalrinsangsiama/theindianstartup`
4. Click "Import"

### Step 3: Configure Environment Variables

Add these environment variables in Vercel dashboard:

```
NEXT_PUBLIC_SUPABASE_URL=https://enotnyhykuwnfiyzfoko.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVub3RueWh5a3V3bmZpeXpmb2tvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyMzgwODksImV4cCI6MjA3MDgxNDA4OX0.M68zcT5b_OfFVX9KWx_DdeY0C6O0TzRDAEhE34wibNI
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVub3RueWh5a3V3bmZpeXpmb2tvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTIzODA4OSwiZXhwIjoyMDcwODE0MDg5fQ.E0BCKrr9QfxMwWvUaZ48MOPpDT1KjALfZ_AaXFXx-Fo
DATABASE_URL=postgresql://postgres:TheIndianStartup123!%40%23@db.enotnyhykuwnfiyzfoko.supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:TheIndianStartup123!%40%23@db.enotnyhykuwnfiyzfoko.supabase.co:5432/postgres
RAZORPAY_KEY_ID=rzp_live_IkKLQEcs0DcLzW
RAZORPAY_KEY_SECRET=AvxAPL8Sw7sUDRgahTWhC1MZ
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_IkKLQEcs0DcLzW
NEXT_PUBLIC_APP_URL=https://theindianstartup.in
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (2-3 minutes)
3. Your app will be live at the generated Vercel URL

### Step 5: Add Custom Domain

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add `theindianstartup.in`
4. You'll see DNS records to add

### Step 6: Update GoDaddy DNS

Since you bought the domain from GoDaddy:

1. Log in to your GoDaddy account
2. Go to DNS Management for theindianstartup.in
3. Delete any existing A records
4. Add the DNS records shown by Vercel:
   - Usually an A record pointing to `76.76.21.21`
   - And a CNAME for `www` pointing to `cname.vercel-dns.com`

### Step 7: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours to propagate
- Your site will be available at https://theindianstartup.in once complete

## Important Notes

### Security Considerations

1. **Razorpay Keys**: You're using LIVE keys. For testing, consider creating a TEST account
2. **Database Password**: Contains special characters that are URL-encoded
3. **Service Key**: Keep the SUPABASE_SERVICE_KEY secure - it has admin access

### Next Steps After Deployment

1. Test the payment flow with a small amount
2. Set up Supabase Row Level Security (RLS) policies
3. Configure email sending with Resend
4. Set up monitoring with Vercel Analytics

### Troubleshooting

If deployment fails:
1. Check build logs in Vercel
2. Ensure all environment variables are set correctly
3. Verify database connection by checking Supabase logs

## Support

Email: support@theindianstartup.in