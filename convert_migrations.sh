#!/bin/bash

# Migration Schema Converter
# Converts lowercase/snake_case schema to PascalCase/camelCase schema

set -e

# Files to convert
FILES=(
    "supabase/migrations/20260204_011_p11_branding_enhanced.sql"
    "supabase/migrations/20260204_020_p20_fintech_enhanced.sql"
    "supabase/migrations/20260204_026_p26_agritech_enhanced.sql"
    "supabase/migrations/20260204_029_p29_saas_enhanced.sql"
)

convert_file() {
    local file="$1"
    local backup="${file}.bak"
    
    echo "Converting: $file"
    
    # Create backup
    cp "$file" "$backup"
    
    # Apply all sed transformations
    sed -i '' \
        -e 's/INTO products/INTO "Product"/g' \
        -e 's/INTO modules/INTO "Module"/g' \
        -e 's/INTO lessons/INTO "Lesson"/g' \
        -e 's/FROM products/FROM "Product"/g' \
        -e 's/FROM modules/FROM "Module"/g' \
        -e 's/FROM lessons/FROM "Lesson"/g' \
        -e 's/products p/\"Product\" p/g' \
        -e 's/modules m/\"Module\" m/g' \
        -e 's/lessons l/\"Lesson\" l/g' \
        -e 's/p\.id/p."id"/g' \
        -e 's/m\.id/m."id"/g' \
        -e 's/p\.code/p."code"/g' \
        -e 's/m\.product_id/m."productId"/g' \
        -e 's/l\.module_id/l."moduleId"/g' \
        "$file"
    
    # Column name mappings for INSERT statements
    sed -i '' \
        -e 's/(id, code, title, description, price, duration_days, is_active, currency, created_at, updated_at)/("id", "code", "title", "description", "price", "estimatedDays", "createdAt", "updatedAt")/g' \
        -e 's/(id, product_id, title, description, order_index, created_at, updated_at)/("id", "productId", "title", "description", "orderIndex", "createdAt", "updatedAt")/g' \
        -e 's/(id, module_id, title, description, order_index, duration_minutes, brief_content, action_items, xp_reward, created_at, updated_at)/("id", "moduleId", "title", "description", "orderIndex", "estimatedTime", "briefContent", "actionItems", "xpReward", "createdAt", "updatedAt")/g' \
        "$file"
    
    # Remove is_active and currency values from Product inserts
    # This is complex - we need to remove ", true, 'INR'" from value lists
    sed -i '' \
        -e "s/, true, 'INR', NOW(), NOW()/, NOW(), NOW()/g" \
        "$file"
    
    # Fix UUID to TEXT for variable declarations
    sed -i '' \
        -e 's/v_product_id UUID;/v_product_id TEXT;/g' \
        -e 's/v_module_id UUID;/v_module_id TEXT;/g' \
        -e 's/product_id UUID;/product_id TEXT;/g' \
        -e 's/module_id UUID;/module_id TEXT;/g' \
        "$file"
    
    # Fix gen_random_uuid() to use text casting if needed
    sed -i '' \
        -e 's/gen_random_uuid()/gen_random_uuid()::TEXT/g' \
        "$file"
    
    # Add transaction wrappers if missing
    if ! grep -q "^BEGIN;" "$file"; then
        # Add BEGIN at the start (after any comments)
        sed -i '' '1s/^/BEGIN;\n\n/' "$file"
    fi
    
    if ! grep -q "^COMMIT;" "$file"; then
        # Add COMMIT at the end
        echo -e "\nCOMMIT;" >> "$file"
    fi
    
    echo "  Converted successfully. Backup: $backup"
}

# Main execution
echo "=== Migration Schema Converter ==="
echo ""

for file in "${FILES[@]}"; do
    if [[ -f "$file" ]]; then
        convert_file "$file"
    else
        echo "WARNING: File not found: $file"
    fi
done

echo ""
echo "=== Conversion Complete ==="
echo ""
echo "To verify changes:"
echo "  diff supabase/migrations/20260204_011_p11_branding_enhanced.sql.bak supabase/migrations/20260204_011_p11_branding_enhanced.sql"
echo ""
echo "To restore from backup:"
echo "  for f in supabase/migrations/*.bak; do mv \"\$f\" \"\${f%.bak}\"; done"

