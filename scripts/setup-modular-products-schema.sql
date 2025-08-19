-- Setup Modular Product System Schema
-- Run this first to create the tables, then run the P9 data insertion

-- Create Product table
CREATE TABLE IF NOT EXISTS "Product" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    "isBundle" BOOLEAN DEFAULT false,
    "bundleProducts" JSONB,
    "estimatedDays" INTEGER,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Module table
CREATE TABLE IF NOT EXISTS "Module" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "productId" TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE
);

-- Create Lesson table
CREATE TABLE IF NOT EXISTS "Lesson" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "moduleId" TEXT NOT NULL,
    day INTEGER NOT NULL,
    title TEXT NOT NULL,
    "briefContent" TEXT,
    "actionItems" JSONB,
    resources JSONB,
    "estimatedTime" INTEGER DEFAULT 45,
    "xpReward" INTEGER DEFAULT 50,
    "orderIndex" INTEGER NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    FOREIGN KEY ("moduleId") REFERENCES "Module"(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_code ON "Product"(code);
CREATE INDEX IF NOT EXISTS idx_module_product ON "Module"("productId", "orderIndex");
CREATE INDEX IF NOT EXISTS idx_lesson_module ON "Lesson"("moduleId", day);

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_product_updated_at BEFORE UPDATE ON "Product" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_module_updated_at BEFORE UPDATE ON "Module" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lesson_updated_at BEFORE UPDATE ON "Lesson" FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verify tables created
SELECT 'Product table created' as status WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Product');
SELECT 'Module table created' as status WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Module');
SELECT 'Lesson table created' as status WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'Lesson');