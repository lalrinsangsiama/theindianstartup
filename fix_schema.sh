#!/bin/bash
# Fix schema for P11, P20, P26 migration files

for FILE in supabase/migrations/20260204_011_p11_branding_enhanced.sql supabase/migrations/20260204_020_p20_fintech_enhanced.sql supabase/migrations/20260204_026_p26_agritech_enhanced.sql; do
    if [ -f "$FILE" ]; then
        echo "Processing: $FILE"
        cp "$FILE" "${FILE}.bak"
        
        # Replace table names (lowercase to quoted PascalCase)
        sed -i '' 's/INTO products/INTO "Product"/g' "$FILE"
        sed -i '' 's/INTO modules/INTO "Module"/g' "$FILE"
        sed -i '' 's/INTO lessons/INTO "Lesson"/g' "$FILE"
        sed -i '' 's/FROM products/FROM "Product"/g' "$FILE"
        sed -i '' 's/FROM modules/FROM "Module"/g' "$FILE"
        sed -i '' 's/FROM lessons/FROM "Lesson"/g' "$FILE"
        sed -i '' 's/DELETE FROM "Lesson" WHERE module_id/DELETE FROM "Lesson" WHERE "moduleId"/g' "$FILE"
        sed -i '' 's/DELETE FROM "Module" WHERE product_id/DELETE FROM "Module" WHERE "productId"/g' "$FILE"
        sed -i '' 's/SELECT id FROM "Module" WHERE product_id/SELECT id FROM "Module" WHERE "productId"/g' "$FILE"
        sed -i '' 's/SELECT id FROM "Product" WHERE code/SELECT id FROM "Product" WHERE code/g' "$FILE"
        
        # Replace variable types
        sed -i '' 's/v_product_id UUID/v_product_id TEXT/g' "$FILE"
        sed -i '' 's/v_module_id UUID/v_module_id TEXT/g' "$FILE"
        
        # Replace column names in Products INSERT - handle the various patterns
        sed -i '' 's/(code, title, description, price, currency, duration_days, is_active)/(id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")/g' "$FILE"
        sed -i '' 's/(code, title, description, price, duration_days, is_active, created_at, updated_at)/(id, code, title, description, price, "estimatedDays", "createdAt", "updatedAt")/g' "$FILE"
        
        # Replace column names in Modules INSERT
        sed -i '' 's/(product_id, title, description, order_index, duration_days)/("productId", title, description, "orderIndex", "createdAt", "updatedAt")/g' "$FILE"
        
        # Handle ON CONFLICT DO UPDATE
        sed -i '' 's/duration_days = EXCLUDED.duration_days/"estimatedDays" = EXCLUDED."estimatedDays"/g' "$FILE"
        sed -i '' 's/is_active = EXCLUDED.is_active/"updatedAt" = NOW()/g' "$FILE"
        
        echo "  Done: $FILE"
    fi
done
echo "Schema fix complete"
