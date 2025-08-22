# Scripts Directory Migration Status

## ✅ Already Migrated (2/10)
- `p6-sales-gtm-database-ready.sql` → `supabase/migrations/20240821_001_p6_sales_course.sql`
- `p7-state-scheme-complete.sql` → `supabase/migrations/20240821_002_p7_state_schemes.sql`

## ❓ Still Need Migration (8/10)

### High Priority Course Content
1. **p3-funding-mastery-complete.sql** - P3 Funding course content (89KB)
2. **p5-legal-stack-complete.sql** - P5 Legal course content  
3. **populate-p2-content.sql** - P2 Incorporation course content

### Alternative/Fixed Versions
4. **p5-legal-stack-final.sql** - P5 final version
5. **p5-legal-stack-fixed.sql** - P5 fixed version
6. **p6-sales-gtm-complete.sql** - P6 complete version (alternative)
7. **p6-sales-gtm-complete-fixed.sql** - P6 fixed version (alternative)

### Verification Scripts
8. **verify-p5-migration.sql** - P5 deployment verification

## Migration Plan
1. Deploy P3 funding course (largest content file)
2. Deploy P5 legal course (choose best version)
3. Deploy P2 content population
4. Run verification scripts
5. Update migration tracking

## Table Schema Issues Expected
- Scripts may use lowercase table names (`products` vs `"Product"`)
- Some may reference non-existent columns
- Will need to handle gracefully with proper error reporting