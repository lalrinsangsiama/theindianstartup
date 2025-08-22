# SQL Migration Plan for Supabase

## Files Found (29 total)

### ✅ Already Deployed (in supabase/migrations/)
- `supabase/migrations/002_modular_products_schema.sql` ✅
- `supabase/migrations/004_validate_migration.sql` ✅  
- `supabase/migrations/005_migration_fixes.sql` ✅
- `supabase/migrations/20240819_001_portfolio_system.sql` ✅
- `supabase/migrations/20240819_002_portfolio_seed_data.sql` ✅
- `supabase/migrations/20240819_003_blog_management_system.sql` ✅
- `supabase/migrations/20240821_001_p6_sales_course.sql` ✅
- `supabase/migrations/20240821_002_p7_state_schemes.sql` ✅
- `supabase/migrations/p1_premium_content_bulletproof.sql` ✅

### 🚨 High Priority - Need to Deploy
1. **Performance & System**
   - `migrations/performance_optimization.sql` - Database performance improvements
   - `src/db/migrations/add_increment_xp_function.sql` - XP system function
   - `migrations/support_system.sql` - Customer support system

2. **Course Content**
   - `scripts/p3-funding-mastery-complete.sql` - P3 Funding course content
   - `scripts/p5-legal-stack-complete.sql` - P5 Legal course content
   - `migrations/p2_complete_course_setup.sql` - P2 Incorporation course
   - `scripts/populate-p2-content.sql` - P2 content population
   - `migrations/p2_legal_activity_types.sql` - P2 legal activities

3. **Enhanced Features**
   - `migrations/p4_portfolio_activities.sql` - P4 Finance portfolio activities
   - `prisma/migrations/investor_database.sql` - Investor database schema
   - `prisma/seed-investors.sql` - Investor seed data

### 🔧 Security & RLS
   - `supabase-rls-setup.sql` - Row Level Security setup
   - `supabase-rls-setup-safe.sql` - Safe RLS setup

### 📋 Verification & Scripts
   - `verify_p1_migration.sql` - P1 migration verification
   - `scripts/verify-p5-migration.sql` - P5 migration verification

### 📦 Additional Course Files
   - `scripts/p6-sales-gtm-complete.sql` - P6 complete version
   - `scripts/p6-sales-gtm-complete-fixed.sql` - P6 fixed version

## Deployment Order
1. Performance & System foundations
2. Course content (P2, P3, P5)
3. Enhanced features (P4, Investors)
4. Security (RLS setup)
5. Verification scripts