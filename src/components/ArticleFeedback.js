class ArticleFeedback extends HTMLElement {
    constructor() {
        super();
        this.articleId = window.location.pathname;
        this.voted = localStorage.getItem(`voted_${this.articleId}`);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="article-feedback-card" style="margin-top: 3rem; padding: 2rem; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center;">
                <h3 style="margin-bottom: 1rem; color: #1e293b;">Cet article vous a-t-il été utile ?</h3>
                <div class="feedback-actions" style="display: flex; justify-content: center; gap: 1.5rem;">
                    <button class="feedback-btn like ${this.voted === 'like' ? 'active' : ''}" data-type="like" style="background: white; border: 1px solid #e2e8f0; padding: 0.8rem 1.5rem; border-radius: 50px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.5rem;">👍</span> <span class="count">0</span>
                    </button>
                    <button class="feedback-btn dislike ${this.voted === 'dislike' ? 'active' : ''}" data-type="dislike" style="background: white; border: 1px solid #e2e8f0; padding: 0.8rem 1.5rem; border-radius: 50px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 1.5rem;">👎</span> <span class="count">0</span>
                    </button>
                </div>
                <p class="feedback-msg" style="margin-top: 1rem; font-size: 0.9rem; color: #64748b; display: ${this.voted ? 'block' : 'none'};">Merci pour votre avis !</p>
            </div>

            <style>
                .feedback-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
                .feedback-btn.active.like { background: #dcfce7 !important; border-color: #22c55e !important; }
                .feedback-btn.active.dislike { background: #fee2e2 !important; border-color: #ef4444 !important; }
                .feedback-btn:disabled { cursor: not-allowed; opacity: 0.7; }
            </style>
        `;

        this.setupHandlers();
        this.updateCounts();
    }

    setupHandlers() {
        const btns = this.querySelectorAll('.feedback-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.voted) return;
                const type = btn.dataset.type;
                this.voted = type;
                localStorage.setItem(`voted_${this.articleId}`, type);
                this.render();
                // Simulate save to DB
                console.log(`Voted ${type} for ${this.articleId}`);
            });
        });
    }

    updateCounts() {
        // Here we would normally fetch global counts. 
        // For this demo, we simulate random counts.
        const likeCount = Math.floor(Math.random() * 100) + (this.voted === 'like' ? 1 : 0);
        const dislikeCount = Math.floor(Math.random() * 10) + (this.voted === 'dislike' ? 1 : 0);
        
        const likeEl = this.querySelector('.like .count');
        const dislikeEl = this.querySelector('.dislike .count');
        if (likeEl) likeEl.textContent = likeCount;
        if (dislikeEl) dislikeEl.textContent = dislikeCount;
    }
}

customElements.define('article-feedback', ArticleFeedback);
