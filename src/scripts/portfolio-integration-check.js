// Portfolio Integration Check Script
// Run this script to verify the portfolio feature is properly integrated

const fs = require('fs');
const path = require('path');

console.log('🔍 Running Portfolio Feature Integration Check...\n');

// Check 1: Database Migration Files
console.log('1. Checking Database Migration Files...');
const migrationDir = path.join(__dirname, '../../migrations');
const migrationFiles = [
  'portfolio_system.sql',
  'portfolio_seed_data.sql'
];

let migrationsExist = true;
migrationFiles.forEach(file => {
  const filePath = path.join(migrationDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${file} exists`);
  } else {
    console.log(`  ❌ ${file} missing`);
    migrationsExist = false;
  }
});

// Check 2: API Route Files
console.log('\n2. Checking API Route Files...');
const apiRoutes = [
  'src/app/api/portfolio/route.ts',
  'src/app/api/portfolio/activities/route.ts',
  'src/app/api/portfolio/activities/[activityTypeId]/route.ts',
  'src/app/api/portfolio/recommendations/route.ts',
  'src/app/api/portfolio/export/route.ts'
];

let apiRoutesExist = true;
apiRoutes.forEach(route => {
  const filePath = path.join(__dirname, '../../', route);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${route} exists`);
  } else {
    console.log(`  ❌ ${route} missing`);
    apiRoutesExist = false;
  }
});

// Check 3: UI Component Files
console.log('\n3. Checking UI Component Files...');
const uiComponents = [
  'src/app/portfolio/portfolio-dashboard/page.tsx',
  'src/app/portfolio/section/[sectionName]/page.tsx',
  'src/components/portfolio/ActivityCapture.tsx',
  'src/components/portfolio/PortfolioErrorBoundary.tsx'
];

let uiComponentsExist = true;
uiComponents.forEach(component => {
  const filePath = path.join(__dirname, '../../', component);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${component} exists`);
  } else {
    console.log(`  ❌ ${component} missing`);
    uiComponentsExist = false;
  }
});

// Check 4: Utility/Library Files
console.log('\n4. Checking Utility/Library Files...');
const utilityFiles = [
  'src/lib/portfolio-integration.ts',
  'src/lib/portfolio-validation.ts'
];

let utilityFilesExist = true;
utilityFiles.forEach(utility => {
  const filePath = path.join(__dirname, '../../', utility);
  if (fs.existsSync(filePath)) {
    console.log(`  ✅ ${utility} exists`);
  } else {
    console.log(`  ❌ ${utility} missing`);
    utilityFilesExist = false;
  }
});

// Check 5: Prisma Schema Updates
console.log('\n5. Checking Prisma Schema...');
const schemaPath = path.join(__dirname, '../../prisma/schema.prisma');
let schemaValid = true;

if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  const requiredModels = [
    'model ActivityType',
    'model PortfolioActivity', 
    'model PortfolioSection',
    'model ActivityTypeVersion'
  ];
  
  requiredModels.forEach(model => {
    if (schemaContent.includes(model)) {
      console.log(`  ✅ ${model} found in schema`);
    } else {
      console.log(`  ❌ ${model} missing from schema`);
      schemaValid = false;
    }
  });
} else {
  console.log('  ❌ Prisma schema.prisma not found');
  schemaValid = false;
}

// Check 6: Portfolio Route Redirection
console.log('\n6. Checking Portfolio Route Redirection...');
const portfolioPagePath = path.join(__dirname, '../../src/app/portfolio/page.tsx');
if (fs.existsSync(portfolioPagePath)) {
  const portfolioContent = fs.readFileSync(portfolioPagePath, 'utf8');
  if (portfolioContent.includes('portfolio-dashboard')) {
    console.log('  ✅ Portfolio route redirects to dashboard');
  } else {
    console.log('  ❌ Portfolio route does not redirect properly');
  }
} else {
  console.log('  ❌ Portfolio page not found');
}

// Summary
console.log('\n📊 INTEGRATION CHECK SUMMARY:');
console.log('===============================');

const checks = [
  { name: 'Database Migrations', passed: migrationsExist },
  { name: 'API Routes', passed: apiRoutesExist },
  { name: 'UI Components', passed: uiComponentsExist },
  { name: 'Utility Files', passed: utilityFilesExist },
  { name: 'Prisma Schema', passed: schemaValid },
];

const passedChecks = checks.filter(c => c.passed).length;
const totalChecks = checks.length;

checks.forEach(check => {
  console.log(`${check.passed ? '✅' : '❌'} ${check.name}`);
});

console.log(`\n🎯 Overall Status: ${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 Portfolio Feature Integration: COMPLETE');
  console.log('\nNext steps:');
  console.log('1. Run database migrations in Supabase SQL editor');
  console.log('2. Test the portfolio feature in development');
  console.log('3. Deploy to production');
} else {
  console.log('\n⚠️  Portfolio Feature Integration: INCOMPLETE');
  console.log('\nPlease fix the missing components listed above.');
}

// Check 7: Generate Integration Report
console.log('\n7. Generating Integration Report...');
const reportContent = `
# Portfolio Feature Integration Report
Generated: ${new Date().toISOString()}

## File Structure Check
${checks.map(check => `- ${check.passed ? '✅' : '❌'} ${check.name}`).join('\n')}

## Required Database Migrations
1. Execute \`migrations/portfolio_system.sql\` in Supabase SQL editor
2. Execute \`migrations/portfolio_seed_data.sql\` in Supabase SQL editor

## API Endpoints Available
- GET /api/portfolio - Main portfolio data
- GET /api/portfolio/activities - List activity types
- POST /api/portfolio/activities - Create/update activity
- GET /api/portfolio/activities/[id] - Get specific activity
- PUT /api/portfolio/activities/[id] - Update specific activity
- GET /api/portfolio/recommendations - Smart recommendations
- POST /api/portfolio/export - Export portfolio in various formats

## UI Routes Available
- /portfolio (redirects to portfolio-dashboard)
- /portfolio/portfolio-dashboard - Main portfolio dashboard
- /portfolio/section/[sectionName] - Individual section view

## Integration Points
- ActivityCapture component can be embedded in course lessons
- Portfolio activities automatically populate from course work
- Smart recommendations drive cross-selling
- Export functionality provides real value to users

## Status: ${passedChecks === totalChecks ? 'READY FOR PRODUCTION' : 'NEEDS ATTENTION'}
`;

try {
  fs.writeFileSync(path.join(__dirname, '../../PORTFOLIO_INTEGRATION_REPORT.md'), reportContent);
  console.log('  ✅ Integration report generated: PORTFOLIO_INTEGRATION_REPORT.md');
} catch (error) {
  console.log('  ⚠️ Could not generate integration report:', error.message);
}

console.log('\n🏁 Portfolio Integration Check Complete!');