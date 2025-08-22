#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Files to skip
const SKIP_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/scripts/**',
  '**/logger.ts',
  '**/logger.js',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
];

// Function to replace console statements
function replaceConsoleStatements(content, filePath) {
  let modified = content;
  let hasChanges = false;
  
  // Check if logger is already imported
  const hasLoggerImport = /import.*logger.*from.*['"]@\/lib\/logger['"]/.test(content);
  
  // Patterns to replace
  const replacements = [
    {
      // console.log(...) -> logger.info(...)
      pattern: /console\.log\(/g,
      replacement: 'logger.info(',
      needsImport: true,
    },
    {
      // console.error(...) -> logger.error(...)
      pattern: /console\.error\(/g,
      replacement: 'logger.error(',
      needsImport: true,
    },
    {
      // console.warn(...) -> logger.warn(...)
      pattern: /console\.warn\(/g,
      replacement: 'logger.warn(',
      needsImport: true,
    },
    {
      // console.debug(...) -> logger.debug(...)
      pattern: /console\.debug\(/g,
      replacement: 'logger.debug(',
      needsImport: true,
    },
  ];
  
  // Apply replacements
  replacements.forEach(({ pattern, replacement, needsImport }) => {
    if (pattern.test(modified)) {
      modified = modified.replace(pattern, replacement);
      hasChanges = true;
    }
  });
  
  // Add import if needed and not already present
  if (hasChanges && !hasLoggerImport) {
    // Find the right place to add import
    const importMatch = modified.match(/^(import[\s\S]*?from\s+['"][^'"]+['"];?\s*\n)/m);
    
    if (importMatch) {
      // Add after last import
      const lastImportIndex = modified.lastIndexOf(importMatch[0]) + importMatch[0].length;
      modified = 
        modified.slice(0, lastImportIndex) +
        "import { logger } from '@/lib/logger';\n" +
        modified.slice(lastImportIndex);
    } else {
      // Add at the beginning of file
      // Check if file starts with 'use client' or 'use server'
      const useDirectiveMatch = modified.match(/^(['"]use\s+(client|server)['"];?\s*\n)/);
      
      if (useDirectiveMatch) {
        // Add after use directive
        modified = 
          useDirectiveMatch[0] +
          "\nimport { logger } from '@/lib/logger';\n" +
          modified.slice(useDirectiveMatch[0].length);
      } else {
        // Add at the very beginning
        modified = "import { logger } from '@/lib/logger';\n\n" + modified;
      }
    }
  }
  
  return { content: modified, hasChanges };
}

// Process files
function processFiles() {
  const files = glob.sync('src/**/*.{ts,tsx}', {
    ignore: SKIP_PATTERNS,
  });
  
  let totalFiles = 0;
  let modifiedFiles = 0;
  
  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: newContent, hasChanges } = replaceConsoleStatements(content, filePath);
    
    if (hasChanges) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Modified: ${filePath}`);
      modifiedFiles++;
    }
    
    totalFiles++;
  });
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total files scanned: ${totalFiles}`);
  console.log(`   Files modified: ${modifiedFiles}`);
  console.log(`   Console statements replaced with logger! 🎉\n`);
}

// Run the script
console.log('🔍 Scanning for console statements...\n');
processFiles();