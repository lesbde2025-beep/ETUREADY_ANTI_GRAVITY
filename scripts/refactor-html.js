import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// Recursively find all HTML files
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                results = results.concat(getHtmlFiles(filePath));
            }
        } else if (file.endsWith('.html')) {
            results.push(filePath);
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(rootDir);
let modifiedCount = 0;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Replace Header
    // The header can be <header ...> ... </header>
    // Since some files have <header class="site-header-stacked" id="main-header"> and others have different spacing, 
    // a regex with DOTALL is best.
    const headerRegex = /<header\b[^>]*>[\s\S]*?<\/header>/i;
    content = content.replace(headerRegex, '<site-header></site-header>');

    // Replace Footer
    const footerRegex = /<footer\b[^>]*>[\s\S]*?<\/footer>/i;
    content = content.replace(footerRegex, '<site-footer></site-footer>');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log(`Refactored: ${path.basename(file)}`);
    }
});

console.log(`Refactoring complete. ${modifiedCount} files updated.`);
