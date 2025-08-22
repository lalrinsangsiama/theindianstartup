#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to fix broken JSX entities that are causing syntax errors
function fixBrokenJsxEntities() {
  const srcDir = path.join(__dirname, '../src');
  
  // Find files with broken entities
  const brokenPatterns = [
    { 
      pattern: /(['"]\w+)&apos;([^'"]*['"])/g, 
      replacement: "$1'$2",
      description: "Fix &apos; inside JavaScript strings"
    },
    { 
      pattern: /(['"]\w+)&quot;([^'"]*['"])/g, 
      replacement: '$1"$2',
      description: "Fix &quot; inside JavaScript strings"
    },
    {
      pattern: /(case\s+['"]\w+)&apos;([^'"]*['"])/g,
      replacement: "$1'$2", 
      description: "Fix &apos; inside case statements"
    },
    {
      pattern: /(window\.open\([^,]+,\s*['"]\w+['"]\s*,\s*['"]\w+)&apos;([^'"]*['"])/g,
      replacement: "$1'$2",
      description: "Fix &apos; in window.open calls"
    },
    {
      pattern: /(size:\s*['"]\d+\s*KB)&apos;(['"]\s*,)/g,
      replacement: "$1'$2",
      description: "Fix &apos; in size properties"
    },
    {
      pattern: /(error.*['"]\w+[^'"]*)&apos;([^'"]*['"]\s*[\);])/g,
      replacement: "$1'$2",
      description: "Fix &apos; in error messages"
    }
  ];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
        fixFileEntities(fullPath);
      }
    }
  }
  
  function fixFileEntities(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      let modified = false;
      
      for (const { pattern, replacement, description } of brokenPatterns) {
        const beforeFix = newContent;
        newContent = newContent.replace(pattern, replacement);
        
        if (newContent !== beforeFix) {
          modified = true;
          console.log(`Fixed in ${path.relative(srcDir, filePath)}: ${description}`);
        }
      }
      
      if (modified) {
        fs.writeFileSync(filePath, newContent, 'utf8');
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
  
  console.log('Fixing broken JSX entities that cause syntax errors...\n');
  traverse(srcDir);
  console.log('\nJSX entity syntax fixes complete!');
}

// Run the fixes
fixBrokenJsxEntities();