#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Simple and safe fix: revert all &apos; and &quot; back to normal quotes in JS/TS strings
function fixAllEntities() {
  const srcDir = path.join(__dirname, '../src');
  
  console.log('Reverting all problematic entity encodings...\n');
  
  // Use ripgrep to find and replace all occurrences safely
  try {
    // Fix &apos; back to ' in JavaScript contexts
    execSync(`find "${srcDir}" -name "*.tsx" -exec sed -i '' 's/&apos;/'"'"'/g' {} +`, { stdio: 'inherit' });
    
    // Fix &quot; back to " in JavaScript contexts
    execSync(`find "${srcDir}" -name "*.tsx" -exec sed -i '' 's/&quot;/"/g' {} +`, { stdio: 'inherit' });
    
    console.log('Successfully reverted all entity encodings.');
  } catch (error) {
    console.error('Error during entity fixes:', error.message);
  }
}

// Run the fixes
fixAllEntities();