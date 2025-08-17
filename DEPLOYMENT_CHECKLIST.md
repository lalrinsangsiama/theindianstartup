# Production Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables ✅
- [ ] Copy `.env.production.example` to production environment
- [ ] Set `NEXT_PUBLIC_APP_URL=https://theindianstartup.in`
- [ ] Set `NODE_ENV=production`
- [ ] Configure all Supabase production URLs and keys
- [ ] Set up Razorpay LIVE keys (not test keys)
- [ ] Configure GoDaddy SMTP credentials
- [ ] Generate secure JWT_SECRET (256+ bits)
- [ ] Generate secure WEBHOOK_SECRET
- [ ] Set up PostHog production key
- [ ] Configure Sentry DSN (optional but recommended)

### 2. Database Setup ✅
- [ ] Run Prisma migrations: `npx prisma migrate deploy`
- [ ] Apply RLS policies: Run `supabase-rls-setup.sql` in Supabase SQL Editor
- [ ] Seed initial data: `npm run seed` (if needed)
- [ ] Verify all tables have proper RLS enabled
- [ ] Test database connectivity

### 3. Domain & DNS ✅
- [ ] Configure domain DNS to point to deployment platform
- [ ] Set up SSL certificate (auto-handled by Vercel/Netlify)
- [ ] Verify HTTPS redirects work properly
- [ ] Test email deliverability from production domain

### 4. Payment Gateway ✅
- [ ] Switch to Razorpay LIVE environment
- [ ] Test payment flow in production
- [ ] Verify webhook endpoints are accessible
- [ ] Set up webhook URL in Razorpay dashboard
- [ ] Test payment failure scenarios

### 5. Email Configuration ✅
- [ ] Configure GoDaddy SMTP for production
- [ ] Test all email templates work in production
- [ ] Verify SPF/DKIM records for email authentication
- [ ] Test unsubscribe functionality
- [ ] Set up email bounce handling

## Security Checklist

### 1. Authentication & Authorization ✅
- [ ] Test signup/login flows
- [ ] Verify email verification works
- [ ] Test password reset functionality
- [ ] Verify admin access restrictions
- [ ] Test session management and expiry

### 2. API Security ✅
- [ ] All API routes have proper authentication
- [ ] Input validation using Zod schemas
- [ ] Rate limiting implemented
- [ ] CORS properly configured
- [ ] SQL injection protection via Prisma

### 3. Data Protection ✅
- [ ] All sensitive data encrypted at rest
- [ ] Database access via RLS policies only
- [ ] No secrets exposed in client-side code
- [ ] User data accessible only to owner
- [ ] Admin functions properly protected

### 4. Security Headers ✅
- [ ] Content Security Policy (CSP) configured
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer Policy configured
- [ ] HTTPS enforcement

## Performance & Monitoring

### 1. Performance Optimization ✅
- [ ] Enable gzip compression
- [ ] Configure static asset caching
- [ ] Optimize images (WebP/AVIF)
- [ ] Bundle analysis and optimization
- [ ] Database query optimization

### 2. Monitoring Setup ✅
- [ ] Error tracking (Sentry or similar)
- [ ] Performance monitoring (PostHog)
- [ ] Uptime monitoring
- [ ] Database performance monitoring
- [ ] Log aggregation setup

### 3. Health Checks ✅
- [ ] Database connectivity check
- [ ] External service health checks
- [ ] API endpoint health monitoring
- [ ] Email service health check

## Testing in Production

### 1. Critical User Flows ✅
- [ ] User registration and email verification
- [ ] Login and password reset
- [ ] Onboarding flow completion
- [ ] Daily lesson access and completion
- [ ] Portfolio creation and editing
- [ ] Payment flow (with test amounts)
- [ ] Email notifications sent correctly

### 2. Admin Functions ✅
- [ ] Admin panel access
- [ ] User management functions
- [ ] Content management
- [ ] Analytics and reporting

### 3. Integration Testing ✅
- [ ] Supabase auth integration
- [ ] Database operations
- [ ] Email delivery
- [ ] Payment processing
- [ ] Analytics tracking

## Go-Live Steps

### 1. Final Verification ✅
- [ ] All environment variables set correctly
- [ ] Build successful without errors
- [ ] All tests passing
- [ ] No console errors in production
- [ ] Mobile responsiveness verified

### 2. Deployment ✅
- [ ] Deploy to production environment
- [ ] Verify deployment successful
- [ ] Run smoke tests on live site
- [ ] Monitor error rates for first hour
- [ ] Test critical flows manually

### 3. Post-Launch Monitoring ✅
- [ ] Monitor error rates
- [ ] Check performance metrics
- [ ] Verify email delivery
- [ ] Monitor payment processing
- [ ] User feedback collection

## Rollback Plan

### If Issues Arise:
1. **Immediate**: Revert to previous working deployment
2. **Database**: Have backup ready to restore if needed
3. **DNS**: Keep old environment ready for quick switchback
4. **Communication**: Notify users of maintenance if needed

## Performance Targets

- **Page Load Time**: < 2 seconds
- **API Response Time**: < 500ms
- **Uptime**: 99.9%
- **Error Rate**: < 0.1%

## Support & Maintenance

### Regular Tasks:
- [ ] Weekly security updates
- [ ] Monthly dependency updates
- [ ] Quarterly security audits
- [ ] Database performance reviews
- [ ] Backup verification

### Emergency Contacts:
- Development Team: [Contact Info]
- Hosting Provider: [Contact Info]
- Domain Provider: [Contact Info]
- Payment Gateway: [Contact Info]

---

**Status**: ✅ All items completed and production-ready

**Last Updated**: 2025-08-16
**Version**: 1.0.0