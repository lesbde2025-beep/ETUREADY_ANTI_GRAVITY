class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <footer>
      <div class="footer-content">
        <div class="footer-col reveal">
          <div class="logo">Etu<span>Ready</span></div>
          <p>La plateforme vivante pour tous les étudiants. Nº1 sur l'infotainment de l'écosystème étudiant.</p>
          <div class="footer-social">
            <a href="#" class="social-link">𝕏</a>
            <a href="#" class="social-link">📸</a>
            <a href="#" class="social-link">🎬</a>
            <a href="#" class="social-link">💼</a>
          </div>
        </div>
        <div class="footer-col reveal">
          <h4>Profils</h4>
          <ul>
            <li><a href="/etudiant.html">Étudiants</a></li>
            <li><a href="/bde.html">BDE / Assos</a></li>
            <li><a href="/enseignants.html">Enseignants</a></li>
            <li><a href="/parents.html">Parents</a></li>
            <li><a href="/alumni.html">Alumni</a></li>
          </ul>
        </div>
        <div class="footer-col reveal">
          <h4>Pratique</h4>
          <ul>
            <li><a href="/bons-plans.html">Bons Plans</a></li>
            <li><a href="/formation.html">Orientation</a></li>
            <li><a href="/evenement.html">Agenda</a></li>
            <li><a href="/marketplace.html">Marketplace</a></li>
          </ul>
        </div>
        <div class="footer-col reveal">
          <h4>Légal</h4>
          <ul>
            <li><a href="/mentions-legales.html">Mentions légales</a></li>
            <li><a href="/contact.html">Contact</a></li>
            <li><a href="/faq.html">FAQ</a></li>
            <li><a href="/confidentialite.html">Confidentialité</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2026 EtuReady. Fait avec ❤️ pour la communauté étudiante.
      </div>
    </footer>
    `;

    // Initialize generic reveal logic if needed locally, although
    // it's usually handled by IntersectionObserver in main.js. Let's keep it in main.js
    // to observe all .reveal elements on the page, not just the footer.
  }
}

customElements.define('site-footer', SiteFooter);
