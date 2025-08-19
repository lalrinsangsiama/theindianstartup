const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript files
const files = glob.sync('src/**/*.{ts,tsx}', { absolute: true });

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Fix all relative imports back to @ imports
  const patterns = [
    // Fix component imports
    { from: /from ['"]\.\.\/\.\.\/components\//g, to: "from '@/components/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/components\//g, to: "from '@/components/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/components\//g, to: "from '@/components/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/components\//g, to: "from '@/components/" },
    { from: /from ['"]\.\.\/components\//g, to: "from '@/components/" },
    
    // Fix lib imports
    { from: /from ['"]\.\.\/\.\.\/lib\//g, to: "from '@/lib/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/lib\//g, to: "from '@/lib/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/\.\.\/lib\//g, to: "from '@/lib/" },
    { from: /from ['"]\.\.\/lib\//g, to: "from '@/lib/" },
    
    // Fix context imports
    { from: /from ['"]\.\.\/\.\.\/contexts\//g, to: "from '@/contexts/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/contexts\//g, to: "from '@/contexts/" },
    { from: /from ['"]\.\.\/contexts\//g, to: "from '@/contexts/" },
    
    // Fix hooks imports
    { from: /from ['"]\.\.\/\.\.\/hooks\//g, to: "from '@/hooks/" },
    { from: /from ['"]\.\.\/\.\.\/\.\.\/hooks\//g, to: "from '@/hooks/" },
    { from: /from ['"]\.\.\/hooks\//g, to: "from '@/hooks/" },
  ];
  
  patterns.forEach(({ from, to }) => {
    const newContent = content.replace(from, to + "'");
    if (newContent !== content) {
      content = newContent;
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed: ${path.relative(process.cwd(), file)}`);
  }
});

console.log('Reverted to @ imports!');