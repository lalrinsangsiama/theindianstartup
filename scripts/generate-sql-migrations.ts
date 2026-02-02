/**
 * Course Content Migration Generator
 *
 * This script parses markdown course files and generates SQL migrations
 * for seeding lesson content into the database.
 *
 * Usage: npx ts-node scripts/generate-sql-migrations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface Lesson {
  day: number;
  title: string;
  briefContent: string;
  actionItems: string[];
  resources: string[];
  estimatedTime: number;
  xpReward: number;
}

interface Module {
  title: string;
  description: string;
  orderIndex: number;
  lessons: Lesson[];
}

interface CourseContent {
  productCode: string;
  modules: Module[];
}

// Product code to file mapping
const COURSE_FILES: Record<string, string> = {
  P1: 'p1_30day.md',
  P3: 'p3_fund.md',
  P4: 'p4_finance.md',
  P8: 'p8_investor.md',
  P11: 'p11_brand.md',
  P12: 'p12_marketing.md',
};

// Default XP rewards by module position
const XP_REWARDS = [50, 50, 75, 75, 100, 100, 125, 125, 150, 150, 200, 200];

function escapeSQL(text: string): string {
  if (!text) return '';
  return text
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .trim();
}

function parseMarkdownCourse(filePath: string, productCode: string): CourseContent {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  const modules: Module[] = [];
  let currentModule: Module | null = null;
  let currentLesson: Lesson | null = null;
  let currentSection = '';
  let dayCounter = 0;
  let moduleIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect module headers (## MODULE X: or ## Phase X:)
    const moduleMatch = line.match(/^##\s+(MODULE\s+\d+:|Phase\s+\d+:)\s*(.+)/i);
    if (moduleMatch) {
      if (currentLesson && currentModule) {
        currentModule.lessons.push(currentLesson);
        currentLesson = null;
      }
      if (currentModule) {
        modules.push(currentModule);
      }

      currentModule = {
        title: moduleMatch[2].trim().replace(/\(Days?\s+\d+.*\)/, '').trim(),
        description: '',
        orderIndex: moduleIndex++,
        lessons: [],
      };
      continue;
    }

    // Detect day headers (### Day X: or **Day X:)
    const dayMatch = line.match(/^###?\s*\*?\*?Day\s+(\d+):?\s*(.+)/i);
    if (dayMatch) {
      if (currentLesson && currentModule) {
        currentModule.lessons.push(currentLesson);
      }

      dayCounter = parseInt(dayMatch[1], 10);
      const lessonTitle = dayMatch[2].replace(/\*\*/g, '').trim();

      currentLesson = {
        day: dayCounter,
        title: lessonTitle,
        briefContent: '',
        actionItems: [],
        resources: [],
        estimatedTime: 45, // Default 45 minutes
        xpReward: XP_REWARDS[Math.min(moduleIndex, XP_REWARDS.length - 1)],
      };
      currentSection = 'content';
      continue;
    }

    // Detect section markers
    if (line.match(/\*\*Learning Objectives?:?\*\*/i) || line.match(/\*\*Overview:?\*\*/i)) {
      currentSection = 'objectives';
      continue;
    }
    if (line.match(/\*\*(?:Today's\s+)?Action Items?:?\*\*/i) || line.match(/\*\*Tasks?:?\*\*/i)) {
      currentSection = 'actions';
      continue;
    }
    if (line.match(/\*\*Resources?:?\*\*/i) || line.match(/\*\*Tools?:?\*\*/i)) {
      currentSection = 'resources';
      continue;
    }

    // Parse content based on current section
    if (currentLesson) {
      if (currentSection === 'content' || currentSection === 'objectives') {
        // Add to brief content (limit to first 500 chars for each lesson)
        if (currentLesson.briefContent.length < 1000 && line.trim()) {
          currentLesson.briefContent += line.trim() + ' ';
        }
      } else if (currentSection === 'actions') {
        // Parse action items
        const actionMatch = line.match(/^[\d\*\-\+]+\.?\s*(.+)/);
        if (actionMatch && actionMatch[1].trim().length > 5) {
          currentLesson.actionItems.push(actionMatch[1].trim());
        }
      } else if (currentSection === 'resources') {
        // Parse resources
        const resourceMatch = line.match(/^[\d\*\-\+]+\.?\s*(.+)/);
        if (resourceMatch && resourceMatch[1].trim().length > 5) {
          currentLesson.resources.push(resourceMatch[1].trim());
        }
      }
    }
  }

  // Add final lesson and module
  if (currentLesson && currentModule) {
    currentModule.lessons.push(currentLesson);
  }
  if (currentModule) {
    modules.push(currentModule);
  }

  // If no modules were found, create a default structure
  if (modules.length === 0) {
    modules.push({
      title: 'Course Content',
      description: 'Main course material',
      orderIndex: 0,
      lessons: [],
    });
  }

  return { productCode, modules };
}

function generateSQL(course: CourseContent): string {
  const { productCode, modules } = course;

  let sql = `-- THE INDIAN STARTUP - ${productCode} Course Content
-- Migration: 20260129_010_${productCode.toLowerCase()}_content.sql
-- Generated: ${new Date().toISOString()}
-- Purpose: Seed comprehensive lesson content for ${productCode}

BEGIN;

-- Get product ID
DO $$
DECLARE
    v_product_id TEXT;
    v_module_id TEXT;
BEGIN
    -- Get product
    SELECT id INTO v_product_id FROM "Product" WHERE code = '${productCode}';

    IF v_product_id IS NULL THEN
        RAISE EXCEPTION 'Product ${productCode} not found';
    END IF;

    -- Delete existing modules and lessons for clean insert
    DELETE FROM "Lesson" WHERE "moduleId" IN (
        SELECT id FROM "Module" WHERE "productId" = v_product_id
    );
    DELETE FROM "Module" WHERE "productId" = v_product_id;

`;

  let lessonCounter = 0;

  modules.forEach((module, moduleIndex) => {
    sql += `
    -- Module ${moduleIndex + 1}: ${module.title}
    INSERT INTO "Module" (id, "productId", title, description, "orderIndex", "createdAt", "updatedAt")
    VALUES (
        gen_random_uuid()::text,
        v_product_id,
        '${escapeSQL(module.title)}',
        '${escapeSQL(module.description || module.title)}',
        ${moduleIndex},
        NOW(),
        NOW()
    )
    RETURNING id INTO v_module_id;

`;

    module.lessons.forEach((lesson, lessonIndex) => {
      lessonCounter++;
      const actionItemsJson = JSON.stringify(lesson.actionItems.slice(0, 10));
      const resourcesJson = JSON.stringify(lesson.resources.slice(0, 5));
      const briefContent = lesson.briefContent.substring(0, 1000).trim();

      sql += `    -- Day ${lesson.day}: ${lesson.title}
    INSERT INTO "Lesson" (
        id, "moduleId", day, title, "briefContent", "actionItems", resources,
        "estimatedTime", "xpReward", "orderIndex", "createdAt", "updatedAt"
    ) VALUES (
        gen_random_uuid()::text,
        v_module_id,
        ${lesson.day},
        '${escapeSQL(lesson.title)}',
        '${escapeSQL(briefContent)}',
        '${escapeSQL(actionItemsJson)}'::jsonb,
        '${escapeSQL(resourcesJson)}'::jsonb,
        ${lesson.estimatedTime},
        ${lesson.xpReward},
        ${lessonIndex},
        NOW(),
        NOW()
    );

`;
    });
  });

  sql += `
    RAISE NOTICE '${productCode}: Inserted ${modules.length} modules with ${lessonCounter} lessons';
END $$;

COMMIT;

-- Verify insertion
SELECT
    p.code,
    COUNT(DISTINCT m.id) as modules,
    COUNT(l.id) as lessons
FROM "Product" p
LEFT JOIN "Module" m ON p.id = m."productId"
LEFT JOIN "Lesson" l ON m.id = l."moduleId"
WHERE p.code = '${productCode}'
GROUP BY p.code;
`;

  return sql;
}

async function main() {
  const coursesDir = path.join(__dirname, '..', 'courses');
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');

  console.log('Course Content Migration Generator');
  console.log('==================================\n');

  let totalModules = 0;
  let totalLessons = 0;

  for (const [productCode, filename] of Object.entries(COURSE_FILES)) {
    const filePath = path.join(coursesDir, filename);

    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${productCode}: File not found (${filename})`);
      continue;
    }

    console.log(`📖 Processing ${productCode}: ${filename}`);

    try {
      const course = parseMarkdownCourse(filePath, productCode);
      const sql = generateSQL(course);

      const migrationFile = `20260129_01${Object.keys(COURSE_FILES).indexOf(productCode)}_${productCode.toLowerCase()}_content.sql`;
      const migrationPath = path.join(migrationsDir, migrationFile);

      fs.writeFileSync(migrationPath, sql);

      const moduleCount = course.modules.length;
      const lessonCount = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

      totalModules += moduleCount;
      totalLessons += lessonCount;

      console.log(`   ✅ Generated: ${migrationFile}`);
      console.log(`   📊 ${moduleCount} modules, ${lessonCount} lessons\n`);
    } catch (error) {
      console.error(`   ❌ Error processing ${productCode}:`, error);
    }
  }

  console.log('==================================');
  console.log(`Total: ${totalModules} modules, ${totalLessons} lessons`);
  console.log('\nTo apply migrations, run:');
  console.log('PGPASSWORD=\'[password]\' psql -h db.xxx.supabase.co -p 5432 -U postgres -d postgres -f supabase/migrations/[migration-file].sql');
}

main().catch(console.error);
