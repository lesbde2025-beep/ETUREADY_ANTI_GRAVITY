const fs = require('fs');
const glob = require('glob');

function removeMenuFromHtml(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Regular expression to match the mobile menu and the comment preceding it
    // It captures everything from the comment until the start of the next comment (Search Overlay)
    const regex1 = /[ \t]*<!-- Mobile Navigation Drawer -->[\s\S]*?<\/div>[\s\n]*<!-- Search Overlay/g;

    if (regex1.test(content)) {
        const newContent = content.replace(regex1, '<!-- Search Overlay');
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${filePath} using Search Overlay bounds.`);
        return;
    }

    const regex2 = /[ \t]*<!-- Mobile Navigation Drawer -->[\s\S]*?(?=<\/header>)/g;
    if (regex2.test(content)) {
        const match = content.match(regex2)[0];
        // Ensure we matched something reasonable (not the whole file)
        if (match.length < 5000) {
            const newContent = content.replace(regex2, '');
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated ${filePath} using header bounds.`);
            return;
        }
    }

    // Try a more specific div parsing if the above failed
    // Match <div class="mobile-nav-drawer" id="mobile-drawer"> ... up to its closing </div>
    // Assuming 2 nested levels of divs inside.
    const regex3 = /[ \t]*<!-- Mobile Navigation Drawer -->[\s\n]*<div class="mobile-nav-drawer" id="mobile-drawer">([\s\S]*?)<\/div>[\s\n]*<\/div>[\s\n]*<\/div>/g;

    if (regex3.test(content)) {
        const newContent = content.replace(regex3, '');
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${filePath} using nested div bounds.`);
    } else {
        console.log(`Could not safely match menu in ${filePath}`);
    }
}

// Find all html files
const files = require('child_process').execSync('dir /b /s *.html', { encoding: 'utf8' }).split('\r\n').filter(Boolean);

files.forEach(file => {
    if (!file.includes('node_modules')) {
        try {
            removeMenuFromHtml(file);
        } catch (e) {
            console.error(`Error processing ${file}: ${e.message}`);
        }
    }
});
