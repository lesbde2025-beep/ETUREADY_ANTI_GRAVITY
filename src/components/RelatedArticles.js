class RelatedArticles extends HTMLElement {
    constructor() {
        super();
        this.articles = [];
    }

    async connectedCallback() {
        try {
            const response = await fetch('/src/data/articles.json');
            this.articles = await response.json();
            this.render();
        } catch (error) {
            console.error('Failed to load related articles', error);
        }
    }

    render() {
        const currentPath = window.location.pathname;
        // Filter out current article and pick 3 random ones
        const filtered = this.articles.filter(a => a.url !== currentPath);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        if (selected.length === 0) return;

        this.innerHTML = `
            <section class="related-articles-section" style="margin-top: 5rem; border-top: 1px solid #e2e8f0; padding-top: 3rem;">
                <h2 style="font-size: 1.8rem; margin-bottom: 2rem; color: #1e293b;">🎓 Les étudiants ont aussi consulté...</h2>
                <div class="grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
                    ${selected.map(article => `
                        <article class="card-modern" style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #f1f5f9; transition: transform 0.2s;">
                            <div class="card-img" style="height: 160px; background: url('${article.image}') center/cover;"></div>
                            <div class="card-body" style="padding: 1.5rem;">
                                <span class="tag" style="background: #eef2ff; color: #4361ee; padding: 4px 10px; border-radius: 4px; font-size: 0.8rem; font-weight: 600;">${article.tag}</span>
                                <h3 style="margin: 1rem 0 0.5rem; font-size: 1.1rem; line-height: 1.4; color: #1e293b;">${article.title}</h3>
                                <a href="${article.url}" style="color: #4361ee; font-weight: 600; font-size: 0.9rem; text-decoration: none; display: flex; align-items: center; gap: 4px;">
                                    Lire la suite <span>→</span>
                                </a>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>

            <style>
                .card-modern:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
            </style>
        `;
    }
}

customElements.define('related-articles', RelatedArticles);
