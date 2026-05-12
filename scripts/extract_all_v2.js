import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputExtractedDir = path.join(rootDir, 'extracted_data');

if (!fs.existsSync(outputExtractedDir)) {
    fs.mkdirSync(outputExtractedDir);
}

function cleanHtml(html) {
    if (!html) return '';
    return html
        .replace(/style="[^"]*"/g, '') // Remove inline styles for cleaner CMS import
        .replace(/class="[^"]*"/g, '') // Remove classes
        .replace(/\s+/g, ' ')
        .trim();
}

function extractArticleData(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    // Extraction base
    const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.trim() || 'Sans Titre';
    const tag = html.match(/<span class="tag">([\s\S]*?)<\/span>/)?.[1]?.trim() || 'Général';
    
    // Main content (looks for the article wrapper or main container)
    let content = '';
    const articleMatch = html.match(/<div style="line-height: 1.8;[^>]*>([\s\S]*?)<\/div>\s*<\/article>/);
    if (articleMatch) {
        content = cleanHtml(articleMatch[1]);
    } else {
        // Fallback to deal cards if it's a bon-plan
        const dealMatch = html.match(/<div class="deal-info">([\s\S]*?)<\/div>\s*<\/div>\s*<\/main>/);
        if (dealMatch) content = cleanHtml(dealMatch[1]);
    }

    // Image
    let image = html.match(/<img[^>]+src="([^">]+)"/)?.[1] || '';
    if (image.startsWith('/')) image = image.substring(1); // relative path

    // Date/Author
    const metaMatch = html.match(/<div style="color: #666;[^>]*>Publié le (.*?) par (.*?)<\/div>/);
    const date = metaMatch?.[1] || '';
    const author = metaMatch?.[2] || 'EtuReady';

    return {
        id: fileName.replace('.html', ''),
        sourceFile: fileName,
        type: fileName.startsWith('article-') ? 'article' : 'deal',
        title,
        tag,
        image,
        date,
        author,
        content
    };
}

function extractQuizData(filePath) {
    const html = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);

    const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.trim() || 'Sans Titre';
    
    // Flexible match for questions array (questions or qs)
    const jsMatch = html.match(/const (?:questions|qs) = (\[[\s\S]*?\]);/);
    let questions = [];
    if (jsMatch) {
        questions = jsMatch[1];
    }

    // Attempt to extract profiles from object or if/else blocks
    const profilesMatch = html.match(/const profiles = ({[\s\S]*?});/);
    let profiles = profilesMatch ? profilesMatch[1] : '';
    
    if (!profiles) {
        // Fallback: look for profile titles in if/else blocks (common in some files)
        const profileTitles = [...html.matchAll(/t = "(.*?)"/g)].map(m => m[1]);
        if (profileTitles.length > 0) {
            profiles = JSON.stringify({ note: "Extracted from logic", profiles: profileTitles });
        }
    }

    return {
        id: fileName.replace('.html', ''),
        sourceFile: fileName,
        title,
        questionsRaw: questions,
        profilesRaw: profiles || '{}'
    };
}

const files = fs.readdirSync(rootDir);
const articles = [];
const deals = [];
const quizzes = [];
const events = [];

console.log(`Scanning ${files.length} files...`);

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (!fs.statSync(filePath).isFile() || !file.endsWith('.html')) return;

    if (file.startsWith('article-')) {
        articles.push(extractArticleData(filePath));
    } else if (file.startsWith('bon-plan-')) {
        deals.push(extractArticleData(filePath));
    } else if (file.startsWith('quiz-')) {
        quizzes.push(extractQuizData(filePath));
    } else if (file.startsWith('evenement-')) {
        // We'll treat events like deals for now as they have similar simple layouts
        events.push(extractArticleData(filePath));
    }
});

fs.writeFileSync(path.join(outputExtractedDir, 'articles.json'), JSON.stringify(articles, null, 2));
fs.writeFileSync(path.join(outputExtractedDir, 'deals.json'), JSON.stringify(deals, null, 2));
fs.writeFileSync(path.join(outputExtractedDir, 'quizzes.json'), JSON.stringify(quizzes, null, 2));
fs.writeFileSync(path.join(outputExtractedDir, 'events.json'), JSON.stringify(events, null, 2));

console.log(`Extraction complete!`);
console.log(`- Articles: ${articles.length}`);
console.log(`- Bons Plans: ${deals.length}`);
console.log(`- Quiz: ${quizzes.length}`);
console.log(`- Événements: ${events.length}`);
console.log(`Files saved in: ${outputExtractedDir}`);
