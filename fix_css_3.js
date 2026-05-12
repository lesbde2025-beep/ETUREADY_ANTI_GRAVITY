
import fs from 'node:fs';
const path = 'src/style.css';

console.log('Reading style.css...');
let content = fs.readFileSync(path, 'utf8');

// The file seems to have garbage at the end like:
// transition: padding 0.3s ease;le(1);
// } }
// }

// We want to find the last valid rule start or known good block and truncate/rewrite.
// The last added block was .site-header-stacked.scrolled

const marker = '.site-header-stacked.scrolled {';
const index = content.lastIndexOf(marker);

if (index !== -1) {
    console.log('Found marker. Truncating and rewriting the last block.');

    // Keep everything up to the marker
    const validContent = content.substring(0, index);

    // Define the correct block
    const fixedBlock = `
.site-header-stacked.scrolled {
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  background: rgba(255, 255, 255, 0.98);
}

.site-header-stacked.scrolled .header-top-row {
  padding: 0.4rem 0;
  transition: padding 0.3s ease;
}
`;

    const newContent = validContent + fixedBlock;
    fs.writeFileSync(path, newContent);
    console.log('style.css repaired.');
} else {
    console.log('Marker not found. File structure might be different than expected.');
}
