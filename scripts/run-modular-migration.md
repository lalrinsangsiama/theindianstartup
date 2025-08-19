# Database Migration Guide: Modular Products System

## Overview
This migration transforms the platform from a single product (30-day journey) to a modular system with 8 individual products (P1-P8) plus an All-Access bundle.

## Pre-Migration Checklist
- [ ] Backup your database
- [ ] Note down any active purchases
- [ ] Ensure no active users are making purchases

## Migration Steps

### 1. Connect to Supabase SQL Editor
Go to your Supabase dashboard → SQL Editor

### 2. Run Migration Scripts in Order

#### Step 1: Main Schema Migration
```sql
-- Copy and paste the contents of:
-- supabase/migrations/002_modular_products_schema.sql
```

This creates:
- Product table with P1-P8 products
- Module and Lesson tables for content structure
- LessonProgress and ModuleProgress tracking tables
- Updates Purchase table for multiple products
- Creates helper functions and RLS policies

#### Step 2: P1 Content Migration
```sql
-- Copy and paste the contents of:
-- supabase/migrations/003_p1_content_migration.sql
```

This creates:
- 4 modules for P1 (30-Day India Launch Sprint)
- 30 lessons with proper structure
- Migrates existing DailyLesson content if available
- Creates views and functions for P1 progress tracking

### 3. Verify Migration

Run these queries to verify the migration succeeded:

```sql
-- Check products are created
SELECT code, title, price FROM "Product" ORDER BY code;

-- Check P1 modules are created
SELECT m.title, COUNT(l.id) as lesson_count
FROM "Module" m
JOIN "Lesson" l ON l."moduleId" = m.id
JOIN "Product" p ON m."productId" = p.id
WHERE p.code = 'P1'
GROUP BY m.id, m.title
ORDER BY m."orderIndex";

-- Check existing purchases were migrated
SELECT "userId", "productCode", "productName", "expiresAt"
FROM "Purchase"
WHERE status = 'completed'
ORDER BY "createdAt" DESC
LIMIT 10;

-- Test product access function
SELECT check_product_access('your-user-id', 'P1');
```

### 4. Update Environment

After migration, the application will automatically use the new schema. The code already references:
- New product codes (P1-P8, ALL_ACCESS)
- ProductProtectedRoute for access control
- Updated purchase APIs

### 5. Test the System

1. **Test Product Access**:
   - Visit `/journey` - should require P1 access
   - Visit `/pricing` - should show all 8 products + bundle

2. **Test Purchase Flow**:
   - Try purchasing P1 for ₹999
   - Verify access is granted for 1 year
   - Check dashboard shows owned product

3. **Test Bundle Logic**:
   - Purchase ALL_ACCESS bundle
   - Verify access to all products

## Rollback (if needed)

If you need to rollback:

```sql
-- Copy and paste the contents of:
-- supabase/migrations/002_modular_products_rollback.sql
```

**WARNING**: Rollback will delete all data in the new tables!

## Post-Migration

1. **Monitor**: Check logs for any errors
2. **Communicate**: Inform users about new product structure
3. **Support**: Be ready to help users understand the changes

## Common Issues

### Issue: Existing purchases not showing
**Solution**: Check that productCode was set correctly:
```sql
UPDATE "Purchase" 
SET "productCode" = 'P1' 
WHERE "productType" = '30_day_guide' 
AND "productCode" IS NULL;
```

### Issue: Access not working for ALL_ACCESS
**Solution**: Verify the check_product_access function:
```sql
SELECT check_product_access('user-id', 'P1');
-- Should return true for users with ALL_ACCESS
```

### Issue: Progress not tracking
**Solution**: Ensure purchase has valid expiresAt:
```sql
UPDATE "Purchase"
SET "expiresAt" = "accessEndDate"
WHERE "expiresAt" IS NULL
AND "accessEndDate" IS NOT NULL;
```

## Support
If you encounter issues:
1. Check Supabase logs
2. Verify RLS policies are enabled
3. Test with SQL queries first
4. Check browser console for API errors