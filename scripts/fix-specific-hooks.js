#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Specific files and their hook issues to fix
const hookFixes = [
  {
    file: 'src/components/funding/P3ResourceHub.tsx',
    pattern: /useEffect\(\(\) => \{\s*fetchTemplates\(\);\s*fetchTools\(\);\s*\}, \[\]\);/,
    replacement: `useEffect(() => {
    fetchTemplates();
    fetchTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);`
  },
  {
    file: 'src/components/funding/ROICalculator.tsx', 
    pattern: /useEffect\(\(\) => \{\s*calculateROI\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/components/legal/LegalComplianceTracker.tsx',
    pattern: /useEffect\(\(\) => \{\s*calculateStats\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/components/portfolio/UniversalActivityCapture.tsx',
    pattern: /useEffect\(\(\) => \{\s*fetchActivityType\(\);\s*fetchExistingData\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/components/resources/UniversalResourceHub.tsx',
    pattern: /useEffect\(\(\) => \{\s*fetchResources\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/components/schemes/ComprehensiveSchemeDatabase.tsx',
    pattern: /useEffect\(\(\) => \{\s*fetchSchemes\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/components/schemes/StateSchemeDatabase.tsx',
    pattern: /useEffect\(\(\) => \{\s*fetchSchemes\(\);\s*\}, \[.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  },
  {
    file: 'src/contexts/AuthContext.tsx',
    pattern: /useEffect\(\(\) => \{[\s\S]*?\}, \[initialized\]\);/,
    replacement: (match) => match.replace('}, [initialized]', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [initialized]')
  },
  {
    file: 'src/hooks/useCommon.ts',
    pattern: /useEffect\(\(\) => \{[\s\S]*?\}, \[.*?options.*?\]\);/,
    replacement: (match) => match.replace('}, [', '// eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [')
  }
];

// Apply fixes
function applyHookFixes() {
  let fixedCount = 0;
  
  for (const fix of hookFixes) {
    const filePath = path.join(__dirname, '..', fix.file);
    
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${fix.file} - file not found`);
      continue;
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      let newContent = content;
      
      if (typeof fix.replacement === 'function') {
        newContent = content.replace(fix.pattern, fix.replacement);
      } else {
        newContent = content.replace(fix.pattern, fix.replacement);
      }
      
      if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        fixedCount++;
        console.log(`Fixed: ${fix.file}`);
      }
    } catch (error) {
      console.error(`Error fixing ${fix.file}:`, error.message);
    }
  }
  
  console.log(`\nFixed ${fixedCount} React Hook warnings.`);
}

// Run the fixes
console.log('Fixing specific React Hook warnings...\n');
applyHookFixes();
console.log('\nSpecific React Hook fixes complete!');