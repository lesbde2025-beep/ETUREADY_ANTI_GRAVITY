import '../components/ArticleFeedback.js';
import '../components/RelatedArticles.js';

export function initArticleSystem() {
    // Only target top-level articles in the main container (articles in detail pages)
    const article = document.querySelector('main.container > article');
    if (!article) return;

    // 1. Add Navigation Button (Back to Blog/Actus)
    if (!article.querySelector('.article-nav-top')) {
        const navTop = document.createElement('div');
        navTop.className = 'article-nav-top';
        navTop.style.marginBottom = '2rem';
        navTop.innerHTML = `
            <a href="/actus.html" class="back-link" style="display: inline-flex; align-items: center; gap: 8px; color: #4361ee; font-weight: 600; text-decoration: none; font-size: 0.95rem; transition: transform 0.2s;">
                <span style="font-size: 1.2rem;">←</span> Retour aux actualités
            </a>
        `;
        article.prepend(navTop);
        
        // Add hover effect
        const link = navTop.querySelector('.back-link');
        link.addEventListener('mouseenter', () => link.style.transform = 'translateX(-5px)');
        link.addEventListener('mouseleave', () => link.style.transform = 'translateX(0)');
    }

    // 2. Add Feedback Component at the end of article content
    if (!document.querySelector('article-feedback')) {
        const feedback = document.createElement('article-feedback');
        article.appendChild(feedback);
    }

    // 3. Add Related Articles Section after the article
    if (!document.querySelector('related-articles')) {
        const related = document.createElement('related-articles');
        // Insert after the main article but inside the same container
        article.after(related);
    }
}
