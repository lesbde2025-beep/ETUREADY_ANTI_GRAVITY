import fs from 'fs';
import path from 'path';

function extractArticleData(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Simple regex for demo (in production we'd use a parser like linkedom or cheerio)
    const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.trim() || 'No Title';
    const tag = html.match(/<span class="tag">([\s\S]*?)<\/span>/)?.[1]?.trim() || 'No Tag';
    const image = html.match(/<img[^>]+src="([^">]+)"/)?.[1] || 'No Image';
    
    // Extract main content - look for the div with line-height or specific article class
    const contentMatch = html.match(/<div style="line-height: 1.8;[^>]*>([\s\S]*?)<\/div>\s*<\/article>/);
    let content = contentMatch?.[1]?.trim() || 'No Content Found';
    
    // Clean up internal links if needed
    content = content.replace(/href="\/(.*?)\.html"/g, 'href="/$1"');

    return {
        file: path.basename(filePath),
        title,
        tag,
        image,
        contentLength: content.length,
        preview: content.substring(0, 100) + '...'
    };
}

const testFile = 'article-10-erreurs-premiere-annee.html';
console.log('--- Extraction Test ---');
console.log(JSON.stringify(extractArticleData(testFile), null, 2));
