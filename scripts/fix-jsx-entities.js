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

// Fix unescaped entities in JSX
function fixJsxEntities() {
  const srcDir = path.join(__dirname, '../src');
  const files = findTsxFiles(srcDir);
  
  let fixedCount = 0;
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let modified = false;
      let newContent = content;
      
      // Fix unescaped apostrophes in JSX content
      // Look for patterns like >text with ' text<
      newContent = newContent.replace(/>([^<>]*)'([^<>]*)</g, (match, before, after) => {
        // Only replace if we're inside JSX content (between > and <)
        return `>${before}&apos;${after}<`;
      });
      
      // Fix unescaped quotes in JSX content
      newContent = newContent.replace(/>([^<>]*)"([^<>]*)</g, (match, before, after) => {
        // Only replace if we're inside JSX content and not already escaped
        if (!before.includes('&quot;') && !after.includes('&quot;')) {
          return `>${before}&quot;${after}<`;
        }
        return match;
      });
      
      // Fix specific patterns in text content
      const patterns = [
        // Common apostrophe patterns
        { from: /(\w)'(\w)/g, to: '$1&apos;$2' },  // word'word
        { from: /(\w)'s(\s|<)/g, to: '$1&apos;s$2' },  // word's
        { from: /(\w)'t(\s|<)/g, to: '$1&apos;t$2' },  // won't, can't, etc.
        { from: /(\w)'re(\s|<)/g, to: '$1&apos;re$2' },  // they're, we're
        { from: /(\w)'ll(\s|<)/g, to: '$1&apos;ll$2' },  // we'll, I'll
        { from: /(\w)'ve(\s|<)/g, to: '$1&apos;ve$2' },  // I've, we've
        { from: /(\w)'d(\s|<)/g, to: '$1&apos;d$2' },  // I'd, we'd
        
        // Specific problematic phrases
        { from: /India's/g, to: 'India&apos;s' },
        { from: /startup's/g, to: 'startup&apos;s' },
        { from: /founder's/g, to: 'founder&apos;s' },
        { from: /business's/g, to: 'business&apos;s' },
        { from: /company's/g, to: 'company&apos;s' },
        { from: /don't/g, to: 'don&apos;t' },
        { from: /won't/g, to: 'won&apos;t' },
        { from: /can't/g, to: 'can&apos;t' },
        { from: /isn't/g, to: 'isn&apos;t' },
        { from: /aren't/g, to: 'aren&apos;t' },
        { from: /doesn't/g, to: 'doesn&apos;t' },
        { from: /haven't/g, to: 'haven&apos;t' },
        { from: /hasn't/g, to: 'hasn&apos;t' },
        { from: /you're/g, to: 'you&apos;re' },
        { from: /we're/g, to: 'we&apos;re' },
        { from: /they're/g, to: 'they&apos;re' },
        { from: /you'll/g, to: 'you&apos;ll' },
        { from: /we'll/g, to: 'we&apos;ll' },
        { from: /I'll/g, to: 'I&apos;ll' },
        { from: /you've/g, to: 'you&apos;ve' },
        { from: /we've/g, to: 'we&apos;ve' },
        { from: /I've/g, to: 'I&apos;ve' },
      ];
      
      // Apply patterns only to JSX content (not inside strings)
      for (const { from, to } of patterns) {
        const beforeReplace = newContent;
        
        // Only replace in JSX content, not in string literals
        newContent = newContent.replace(from, (match, ...groups) => {
          // Simple heuristic: if surrounded by quotes, don't replace
          const index = newContent.indexOf(match);
          const before = newContent.substring(Math.max(0, index - 50), index);
          const after = newContent.substring(index + match.length, Math.min(newContent.length, index + match.length + 50));
          
          // Skip if inside string literals
          if (before.includes('"') && after.includes('"') && 
              before.lastIndexOf('"') > before.lastIndexOf('>')) {
            return match;
          }
          if (before.includes("'") && after.includes("'") && 
              before.lastIndexOf("'") > before.lastIndexOf('>')) {
            return match;
          }
          
          return to.replace(/\$(\d+)/g, (_, n) => groups[n - 1] || '');
        });
        
        if (newContent !== beforeReplace) {
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(file, newContent, 'utf8');
        fixedCount++;
        console.log(`Fixed JSX entities: ${path.relative(srcDir, file)}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`\nFixed JSX entities in ${fixedCount} files.`);
}

// Run the fixes
console.log('Fixing unescaped entities in JSX...\n');
fixJsxEntities();
console.log('\nJSX entity fixes complete!');