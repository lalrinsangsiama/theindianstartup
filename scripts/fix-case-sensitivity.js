#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to recursively find all .tsx and .ts files
function findSourceFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && (item.endsWith('.tsx') || item.endsWith('.ts'))) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Fix case sensitivity issues
function fixCaseSensitivity() {
  const srcDir = path.join(__dirname, '../src');
  const files = findSourceFiles(srcDir);
  
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let modified = false;
      let newContent = content;
      
      // Fix Badge import case sensitivity
      if (newContent.includes("@/components/ui/badge")) {
        newContent = newContent.replace(/@\/components\/ui\/badge/g, "@/components/ui/Badge");
        modified = true;
      }
      
      // Fix Button import case sensitivity  
      if (newContent.includes("@/components/ui/button")) {
        newContent = newContent.replace(/@\/components\/ui\/button/g, "@/components/ui/Button");
        modified = true;
      }
      
      // Fix other potential case issues
      if (newContent.includes("@/components/ui/card")) {
        newContent = newContent.replace(/@\/components\/ui\/card/g, "@/components/ui/Card");
        modified = true;
      }
      
      if (newContent.includes("@/components/ui/input")) {
        newContent = newContent.replace(/@\/components\/ui\/input/g, "@/components/ui/Input");
        modified = true;
      }
      
      if (newContent.includes("@/components/ui/tabs")) {
        newContent = newContent.replace(/@\/components\/ui\/tabs/g, "@/components/ui/Tabs");
        modified = true;
      }
      
      if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        fixedCount++;
        console.log(`Fixed: ${path.relative(srcDir, file)}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nFixed ${fixedCount} files with case sensitivity issues.`);
}

// Run the fixes
console.log('Fixing case sensitivity issues...\n');
fixCaseSensitivity();
console.log('\nCase sensitivity fixes complete!');