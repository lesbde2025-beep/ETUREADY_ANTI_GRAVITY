import fs from 'fs';
import path from 'path';

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const allLinks = new Map();

function addLink(file, link) {
    if (!link) return;
    if (link.startsWith('http') || link.startsWith('mailto:') || link.startsWith('tel:') || link.startsWith('#') || link.startsWith('javascript:')) return;
    
    // clean link (remove hash/query)
    let cleanLink = link.split('#')[0].split('?')[0];
    if (!cleanLink) return;

    if (!allLinks.has(file)) allLinks.set(file, new Set());
    allLinks.get(file).add(cleanLink);
}

files.forEach(file => {
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  
  // href="link"
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    addLink(file, match[1]);
  }
  
  // onClick window.location.href
  const locRegex = /window\.location\.href\s*=\s*['"]([^'"]+)['"]/g;
  while ((match = locRegex.exec(content)) !== null) {
    addLink(file, match[1]);
  }
  
  const onclickRegex = /onclick=["'][^"']*window\.location\.href\s*=\s*['"]([^'"]+)['"]/g;
  while ((match = onclickRegex.exec(content)) !== null) {
    addLink(file, match[1]);
  }
  
  const onclickLocRegex = /onclick=["'][^"']*location\.href\s*=\s*['"]([^'"]+)['"]/g;
  while ((match = onclickLocRegex.exec(content)) !== null) {
    addLink(file, match[1]);
  }
  
  // Catch standard window.location too
  const windowLocRegex = /window\.location\s*=\s*['"]([^'"]+)['"]/g;
  while ((match = windowLocRegex.exec(content)) !== null) {
      addLink(file, match[1]);
  }
});

const missingMap = new Map();

allLinks.forEach((links, file) => {
  links.forEach(link => {
    let target = path.join(dir, link);
    if (!fs.existsSync(target)) {
      if (!missingMap.has(link)) missingMap.set(link, new Set());
      missingMap.get(link).add(file);
    }
  });
});

console.log('--- MISSING INTERNAL LINKS ---');
missingMap.forEach((sources, missing) => {
  console.log(`- ${missing} (from: ${Array.from(sources).join(', ')})`);
});
