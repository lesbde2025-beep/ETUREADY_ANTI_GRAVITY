export async function initDeals() {
    const dealsGrid = document.getElementById('dealsGrid');
    if (!dealsGrid) return;
  
    let deals = [];
    try {
        const res = await fetch('/src/data/deals.json');
        if (res.ok) deals = await res.json();
    } catch (e) {
        console.error("Failed to fetch deals", e);
    }
  
    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, tag => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
        }[tag]));
    }

    // Attach to window so HTML buttons like <button onclick="renderDeals(...)"> continue working
    window.renderDeals = function (regionFilter = 'all', cityFilter = 'all', categoryFilter = 'all') {
        dealsGrid.innerHTML = '';
        
        const regionF = String(regionFilter);
        const cityF = String(cityFilter);
        const categoryF = String(categoryFilter);
  
        const filteredDeals = deals.filter(deal => {
            const matchRegion = regionF === 'all' || deal.region === regionF || deal.region === 'National';
            const matchCity = cityF === 'all' || deal.city === cityF || deal.city === 'all';
            const matchCategory = categoryF === 'all' || deal.category === categoryF;
            return matchRegion && matchCity && matchCategory;
        });
  
        if (filteredDeals.length === 0) {
            dealsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: var(--text-muted);">Aucun bon plan ne correspond à vos filtres.</div>';
            return;
        }
  
        filteredDeals.forEach(deal => {
            const card = document.createElement('div');
            card.className = 'deal-card reveal active';
            
            // Modern styling for the card
            card.style.background = 'white';
            card.style.borderRadius = '24px';
            card.style.padding = '2rem';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.border = '1px solid rgba(0,0,0,0.04)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
            card.style.height = '100%';
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.cursor = 'default';
            
            // Interactive hover effect
            card.onmouseover = () => { card.style.transform = 'translateY(-5px)'; card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'; card.style.borderColor = 'rgba(139, 92, 246, 0.3)'; };
            card.onmouseout = () => { card.style.transform = 'translateY(0)'; card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; card.style.borderColor = 'rgba(0,0,0,0.04)'; };

            // Use encodeURIComponent to safely pass titles with quotes (e.g. Domino's) to inline JS
            const safeTitleForJS = encodeURIComponent(deal.title);

            card.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 1.75rem;">
                <div style="width: 72px; height: 72px; background: #f8fafc; border-radius: 20px; padding: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid rgba(0,0,0,0.05);">
                    <img src="${escapeHTML(deal.logo)}" alt="Logo" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div style="flex: 1; overflow: hidden;">
                    <span style="display: inline-block; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--secondary-color); background: rgba(139, 92, 246, 0.1); padding: 0.35rem 0.7rem; border-radius: 8px; margin-bottom: 0.5rem;">
                        ${escapeHTML(deal.tag)}
                    </span>
                    <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${escapeHTML(deal.title)}">
                        ${escapeHTML(deal.title)}
                    </h3>
                </div>
            </div>
            
            <p style="font-size: 1rem; color: #475569; line-height: 1.7; margin: 0 0 1.75rem 0; flex: 1;">
                ${escapeHTML(deal.description)}
            </p>
            
            <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.75rem; padding: 1rem; background: #f8fafc; border-radius: 14px; border: 1px solid rgba(0,0,0,0.02);">
                <span style="font-size: 1.2rem;">📍</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: #334155;">${escapeHTML(deal.region)}</span>
            </div>
            
            <button style="width: 100%; padding: 1rem; font-weight: 800; font-size: 1rem; border-radius: 16px; background: #0f172a; color: white; border: none; transition: all 0.3s ease; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 0.5rem;" 
                onmouseover="this.style.background='var(--secondary-color)'; this.style.transform='scale(1.02)'" 
                onmouseout="this.style.background='#0f172a'; this.style.transform='scale(1)'" 
                data-title="${escapeHTML(deal.title)}"
                onclick="copyPromo(event)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                Obtenir le code
            </button>
            `;
            dealsGrid.appendChild(card);
        });
    };
  
    window.copyPromo = function(event) {
        const btn = event.currentTarget || event.target;
        const title = btn.getAttribute('data-title') || 'PROMO';
        
        // Generate a realistic looking promo code based on the title
        const cleanTitle = title.replace(/[^a-zA-Z]/g, '').substring(0, 5).toUpperCase();
        const code = `${cleanTitle}STUDENT`;
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            // Update button UI to show success
            const originalText = btn.innerHTML;
            const originalBg = btn.style.background;
            
            btn.innerHTML = `✅ Copié : <strong style="letter-spacing: 1px;">${code}</strong>`;
            btn.style.background = '#10b981'; // Green success color
            btn.style.color = 'white';
            
            // Revert after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = originalBg;
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy', err);
            // Fallback if clipboard fails
            btn.innerHTML = `Code : <strong>${code}</strong>`;
        });
    };
  
    // Filters Setup
    const regionSelect = document.getElementById('regionFilter');
    const citySelect = document.getElementById('cityFilter');
    const categorySelect = document.getElementById('categoryFilter');
  
    function applySelectFilters() {
        const region = regionSelect ? regionSelect.value : 'all';
        const city = citySelect ? citySelect.value : 'all';
        const category = categorySelect ? categorySelect.value : 'all';
        window.renderDeals(region, city, category);
        document.querySelectorAll('.category-chip').forEach(btn => btn.classList.remove('active'));
    }

    if (regionSelect) regionSelect.addEventListener('change', applySelectFilters);
    if (citySelect) citySelect.addEventListener('change', applySelectFilters);
    if (categorySelect) categorySelect.addEventListener('change', applySelectFilters);
  
    document.querySelectorAll('.category-chip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const cat = e.target.getAttribute('data-filter');
            const currentRegion = regionSelect ? regionSelect.value : 'all';
            const currentCity = citySelect ? citySelect.value : 'all';
            
            if (categorySelect) categorySelect.value = cat; // Sync dropdown
            
            window.renderDeals(currentRegion, currentCity, cat);
        });
    });
  
    // Initial Render
    window.renderDeals();
}
