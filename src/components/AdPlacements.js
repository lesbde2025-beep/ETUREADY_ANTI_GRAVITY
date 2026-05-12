// Shared ad styles
const adStyles = `
<style>
  .ad-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
    text-align: center;
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    box-shadow: 0 4px 6px rgba(0,0,0,0.02);
  }
  .ad-container:hover {
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
    border-color: #cbd5e1;
    transform: translateY(-2px);
  }
  .ad-badge {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(0,0,0,0.05);
    color: #64748b;
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 2px 6px;
    border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .ad-sponsor {
    font-size: 0.8rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .ad-title {
    font-size: 1.25rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .ad-copy {
    font-size: 0.95rem;
    color: #475569;
    margin-bottom: 1.5rem;
  }
  .ad-cta {
    background: #0f172a;
    color: white;
    padding: 0.6rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
    display: inline-block;
    transition: background 0.2s;
  }
  .ad-container:hover .ad-cta {
    background: #3b82f6;
  }
  
  /* Ensure Custom Elements render as blocks */
  ad-top-banner, ad-sidebar, ad-in-content, ad-footer-banner {
    display: block;
    width: 100%;
  }

  /* Variations */
  .ad-top-banner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 0.8rem 2rem;
    border-radius: 0;
    border-left: none;
    border-right: none;
    border-top: none;
    background: linear-gradient(90deg, #f8fafc, #f1f5f9);
    position: relative;
    z-index: 1005;
  }
  .ad-top-banner .ad-content-wrapper {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .ad-top-banner .ad-title {
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 700;
  }
  .ad-top-banner .ad-sponsor {
    margin-bottom: 0;
    font-size: 0.75rem;
    color: #10b981;
  }
  .ad-top-banner .ad-cta {
    padding: 0.4rem 1rem;
    font-size: 0.8rem;
  }
  
  .ad-sidebar {
    position: sticky;
    top: 100px;
    margin-bottom: 2rem;
  }
  .ad-sidebar .ad-image {
    width: 100%;
    height: 150px;
    background: #e2e8f0;
    border-radius: 8px;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
  }

  .ad-footer-banner {
    flex-direction: row;
    gap: 2rem;
    padding: 3rem;
    background: #1e293b;
    color: white;
    border: none;
    border-radius: 16px;
    margin: 4rem auto;
    max-width: 1200px;
    text-align: left;
  }
  .ad-footer-banner .ad-title {
    color: white;
    font-size: 1.8rem;
  }
  .ad-footer-banner .ad-copy {
    color: #94a3b8;
    font-size: 1.1rem;
    margin-bottom: 0;
  }
  .ad-footer-banner .ad-badge {
    background: rgba(255,255,255,0.1);
    color: #cbd5e1;
  }
  .ad-footer-banner .ad-sponsor {
    color: #38bdf8;
  }

  @media (max-width: 768px) {
    .ad-top-banner {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    .ad-top-banner .ad-content-wrapper {
      flex-direction: column;
      gap: 0.5rem;
    }
    .ad-footer-banner {
      flex-direction: column;
      text-align: center;
      padding: 2rem;
      margin: 2rem 1rem;
    }
  }
</style>
`;

class AdTopBanner extends HTMLElement {
  connectedCallback() {
    const sponsor = this.getAttribute('sponsor') || 'Partenaire';
    const title = this.getAttribute('title') || 'Offre étudiante exclusive';
    const cta = this.getAttribute('cta') || 'Découvrir';
    
    this.innerHTML = `
      ${adStyles}
      <a href="#" class="ad-container ad-top-banner">
        <span class="ad-badge">Sponsorisé</span>
        <div class="ad-content-wrapper">
          <div class="ad-sponsor">${sponsor}</div>
          <div>
            <div class="ad-title">${title}</div>
          </div>
        </div>
        <div class="ad-cta">${cta}</div>
      </a>
    `;
  }
}

class AdSidebar extends HTMLElement {
  connectedCallback() {
    const sponsor = this.getAttribute('sponsor') || 'Partenaire';
    const title = this.getAttribute('title') || 'Offre spéciale';
    const copy = this.getAttribute('copy') || 'Profitez de cet avantage réservé aux étudiants.';
    const cta = this.getAttribute('cta') || 'En savoir plus';
    const icon = this.getAttribute('icon') || '🎁';
    
    this.innerHTML = `
      ${adStyles}
      <a href="#" class="ad-container ad-sidebar">
        <span class="ad-badge">Sponsorisé</span>
        <div class="ad-image">${icon}</div>
        <div class="ad-sponsor">${sponsor}</div>
        <div class="ad-title">${title}</div>
        <div class="ad-copy">${copy}</div>
        <div class="ad-cta">${cta}</div>
      </a>
    `;
  }
}

class AdInContent extends HTMLElement {
  connectedCallback() {
    const sponsor = this.getAttribute('sponsor') || 'Partenaire';
    const title = this.getAttribute('title') || 'Découvrez notre offre';
    const copy = this.getAttribute('copy') || 'Une opportunité à ne pas manquer pour votre vie étudiante.';
    const cta = this.getAttribute('cta') || "Profiter de l'offre";
    
    this.innerHTML = `
      ${adStyles}
      <a href="#" class="ad-container" style="margin: 2rem 0; max-width: 800px; margin-left: auto; margin-right: auto;">
        <span class="ad-badge">Publicité</span>
        <div class="ad-sponsor">${sponsor}</div>
        <div class="ad-title">${title}</div>
        <div class="ad-copy">${copy}</div>
        <div class="ad-cta">${cta}</div>
      </a>
    `;
  }
}

class AdFooterBanner extends HTMLElement {
  connectedCallback() {
    const sponsor = this.getAttribute('sponsor') || 'Partenaire';
    const title = this.getAttribute('title') || 'Prêt à passer au niveau supérieur ?';
    const copy = this.getAttribute('copy') || "Rejoignez des milliers d'étudiants qui nous font confiance au quotidien.";
    const cta = this.getAttribute('cta') || 'Ouvrir mon compte';
    
    this.innerHTML = `
      ${adStyles}
      <div style="padding: 0 1rem;">
          <a href="#" class="ad-container ad-footer-banner">
            <span class="ad-badge">Partenaire</span>
            <div style="flex: 1;">
              <div class="ad-sponsor">${sponsor}</div>
              <div class="ad-title">${title}</div>
              <div class="ad-copy">${copy}</div>
            </div>
            <div style="display: flex; align-items: center;">
                <div class="ad-cta" style="background: white; color: #0f172a; padding: 1rem 2rem; font-size: 1.1rem;">${cta}</div>
            </div>
          </a>
      </div>
    `;
  }
}

customElements.define('ad-top-banner', AdTopBanner);
customElements.define('ad-sidebar', AdSidebar);
customElements.define('ad-in-content', AdInContent);
customElements.define('ad-footer-banner', AdFooterBanner);
