const fs = require('fs');

function fixSpacedText(content) {
    // Find where the spacing starts
    // Look for a pattern like ` / /   =` or `d o c u m e n t`
    const lines = content.split('\n');
    let newLines = [];
    for (let line of lines) {
        // Check if the line looks like it's unnecessarily spaced
        // E.g., ratio of spaces to non-spaces is very high, and almost every other char is a space.
        if (line.match(/^(?:. )+.?$/) && line.length > 20) {
            // It's likely spaced text
            // Let's remove every other space, but wait, a naive replace might be dangerous.
            // Easiest is to split by ' ' but that removes legitimate spaces.
            // If it's literally 'a b c', we can just take every even index:
            let fixed = '';
            for (let i = 0; i < line.length; i += 2) {
                fixed += line[i];
            }
            newLines.push(fixed);
        } else {
            newLines.push(line);
        }
    }
    return newLines.join('\n');
}

let mainPath = 'src/main.js';
let mainContent = fs.readFileSync(mainPath, 'utf8');
let fixedMain = fixSpacedText(mainContent);
fs.writeFileSync(mainPath, fixedMain);

let stylePath = 'src/style.css';
let styleContent = fs.readFileSync(stylePath, 'utf8');
let fixedStyle = fixSpacedText(styleContent);
fs.writeFileSync(stylePath, fixedStyle);

console.log("Fixed files");
