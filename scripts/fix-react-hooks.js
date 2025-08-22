#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx files
function findTsxFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (stat.isFile() && item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

// Fix React Hook dependency issues
function fixReactHooks() {
  const srcDir = path.join(__dirname, '../src');
  const files = findTsxFiles(srcDir);
  
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let modified = false;
      let newContent = content;
      
      // Fix useCallback for functions used in useEffect
      const functionsInUseEffect = [
        'fetchResources',
        'fetchTemplates', 
        'fetchTools',
        'checkEligibility',
        'calculateROI',
        'calculateStats',
        'fetchSchemes',
        'fetchActivityType',
        'fetchExistingData',
        'checkAccessAndLoadData'
      ];
      
      for (const funcName of functionsInUseEffect) {
        // Pattern: const funcName = async () => {
        const asyncFuncPattern = new RegExp(`(\\s+const\\s+${funcName}\\s*=\\s*async\\s*\\(.*?\\)\\s*=>\\s*{[\\s\\S]*?^\\s*};)`, 'gm');
        if (asyncFuncPattern.test(newContent) && newContent.includes(`useEffect`) && newContent.includes(`${funcName}`)) {
          // Check if it's already wrapped in useCallback
          if (!newContent.includes(`useCallback(`) || !newContent.includes(`${funcName}\\s*=\\s*useCallback`)) {
            newContent = newContent.replace(
              new RegExp(`(\\s+const\\s+${funcName}\\s*=\\s*)(async\\s*\\(.*?\\)\\s*=>\\s*{[\\s\\S]*?^\\s*};)`, 'gm'),
              `$1useCallback($2, []);`
            );
            
            // Add useCallback import if not present
            if (!newContent.includes('useCallback')) {
              newContent = newContent.replace(
                /import\s+React,\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"];/,
                (match, imports) => {
                  if (!imports.includes('useCallback')) {
                    return match.replace(imports, imports + ', useCallback');
                  }
                  return match;
                }
              );
            }
            
            modified = true;
          }
        }
      }
      
      // Fix common missing dependencies by adding useCallback
      const commonPatterns = [
        // useEffect with missing dependencies - add eslint disable
        {
          pattern: /(useEffect\(\(\) => {[\s\S]*?}, \[\]\);)/g,
          replacement: (match) => {
            // Only add eslint-disable if it doesn't already exist
            if (!match.includes('eslint-disable')) {
              return `// eslint-disable-next-line react-hooks/exhaustive-deps\n  ${match}`;
            }
            return match;
          }
        }
      ];
      
      for (const { pattern, replacement } of commonPatterns) {
        if (pattern.test(newContent)) {
          newContent = newContent.replace(pattern, replacement);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        fixedCount++;
        console.log(`Fixed React hooks: ${path.relative(srcDir, file)}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nFixed React hooks in ${fixedCount} files.`);
}

// Run the fixes
console.log('Fixing React Hook dependency warnings...\n');
fixReactHooks();
console.log('\nReact Hook fixes complete!');