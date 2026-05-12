import { authService } from '../auth-service.js';

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setupLogic();
  }

  render() {
    this.innerHTML = `
    <header class="site-header-stacked" id="main-header">
      <!-- Top Row: Brand, Search, Auth -->
      <div class="header-top-row">
        <div class="container header-inner">
          <div class="header-brand">
            <a href="/" class="header-logo">Etu<span>Ready</span></a>
            <span class="header-slogan"><span class="slogan-highlight">n°1</span> de l'infotainment sur le campus</span>
          </div>

          <!-- Search Bar -->
          <div class="header-search-bar">
            <input type="text" placeholder="Rechercher...">
            <button>🔍</button>
          </div>

          <!-- Auth / Profile -->
          <div class="auth-container">
            <a href="/connexion.html" class="btn-login-modern">Connexion</a>
          </div>

          <!-- Mobile Burger -->
          <button class="mobile-menu-btn" id="mobile-menu-toggle" aria-label="Menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>

      <!-- Bottom Row: Navigation -->
      <div class="header-bottom-row">
        <div class="container">
          <nav class="header-nav-main">
            <a href="/" class="nav-link">🏠 Accueil</a>
            <span class="nav-divider">|</span>
            <div class="nav-item-dropdown">
              <button class="nav-link dropdown-trigger">Les actus sur... ▾</button>
              <div class="dropdown-menu-modern">
                <a href="/etudiant.html">🎓 Étudiants</a>
                <a href="/etu-elles.html">🌸 EtuElles</a>
                <a href="/bde.html">🏆 BDE / Assos</a>
                <a href="/parents.html">👪 Parents</a>
                <a href="/enseignants.html">📚 Enseignants</a>
                <a href="/personnel-administratif.html">💼 Personnels</a>
                <a href="/alumni.html">🎓 Anciens / Alumni</a>
              </div>
            </div>
            <span class="nav-divider">|</span>
            <a href="/actus.html" class="nav-link">📰 Le Mag</a>
            <a href="/bons-plans.html" class="nav-link">🏷️ Bons Plans</a>
            <a href="/marketplace.html" class="nav-link">🛒 Market</a>
            <a href="/pass-etuready.html" class="nav-link nav-link-accent">💎 Le Pass</a>
            <a href="/evenement.html" class="nav-link">📅 Agenda</a>
            <a href="/formation.html" class="nav-link">🎓 Formation</a>
            <a href="/annuaire-bde.html" class="nav-link">📂 Annuaire</a>
          </nav>
        </div>
      </div>

      <!-- Search Overlay -->
      <div class="search-overlay" id="search-overlay">
        <div class="container search-container">
          <input type="text" placeholder="Rechercher..." autofocus>
          <button class="close-search">✕</button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-nav-drawer" id="mobile-drawer">
        <div class="drawer-header">
          <span class="drawer-title">Menu</span>
          <button class="close-drawer" id="close-drawer">✕</button>
        </div>
        <div class="drawer-content">
          <nav class="mobile-nav">
            <a href="/" class="mobile-link">🏠 Accueil</a>
            <div class="nav-item-dropdown" style="margin: 0.5rem 0;">
              <button class="dropdown-trigger mobile-link full-width" style="text-align: left; background: none; border: none; font-size: 1rem; cursor: pointer; padding: 0.8rem;">Les actus sur... ▾</button>
              <div class="dropdown-menu-modern" style="position: static; box-shadow: none; padding-left: 1rem; display: flex; transform: none; visibility: visible; opacity: 1;">
                <a href="/etudiant.html" class="mobile-link">🎓 Étudiants</a>
                <a href="/etu-elles.html" class="mobile-link">🌸 EtuElles</a>
                <a href="/bde.html" class="mobile-link">🏆 BDE / Assos</a>
                <a href="/parents.html" class="mobile-link">👪 Parents</a>
                <a href="/enseignants.html" class="mobile-link">📚 Enseignants</a>
                <a href="/personnel-administratif.html" class="mobile-link">💼 Personnels</a>
                <a href="/alumni.html" class="mobile-link">🎓 Anciens / Alumni</a>
              </div>
            </div>
            <a href="/actus.html" class="mobile-link">📰 Le Mag</a>
            <a href="/bons-plans.html" class="mobile-link">🏷️ Bons Plans</a>
            <a href="/marketplace.html" class="mobile-link">🛒 Market</a>
            <a href="/pass-etuready.html" class="mobile-link nav-link-accent">💎 Le Pass</a>
            <a href="/evenement.html" class="mobile-link">📅 Agenda</a>
            <a href="/formation.html" class="mobile-link">🎓 Formation</a>
            <a href="/annuaire-bde.html" class="mobile-link">📂 Annuaire</a>
          </nav>
        </div>
        <div class="drawer-footer">
          <a href="/connexion.html" class="btn-login-modern full-width" style="text-align: center; display: block;">Connexion</a>
        </div>
      </div>
    </header>
    `;
  }

  setupLogic() {
    this.setupAuthUI();
    this.setupMobileDrawer();
    this.setupSearchOverlay();
    this.setupStickyHeader();
    this.highlightActiveLink();
  }

  setupAuthUI() {
    // Auth State Management
    authService.onAuthStateChange((event, session) => {
      this.updateHeaderAuthUI(session?.user);
    });

    // Check initial session
    authService.getCurrentUser().then(user => {
      this.updateHeaderAuthUI(user);
    });
  }

  updateHeaderAuthUI(user) {
    const authContainer = this.querySelector('.btn-login-modern');
    const authWrapper = this.querySelector('.auth-container');
    if (!authWrapper) return;

    if (user) {
      const userMeta = user.user_metadata || {};
      const userName = userMeta.prenom || 'Mon Compte';
      let widget = authWrapper.querySelector('.user-profile-widget');

      if (!widget) {
        widget = document.createElement('div');
        widget.className = 'user-profile-widget';
        widget.innerHTML = `
          <button class="profile-btn">
              <div class="profile-avatar">${userName.charAt(0).toUpperCase()}</div>
              <span class="profile-name">${userName}</span>
          </button>
          <div class="dropdown-menu">
              <a href="/dashboard.html">📊 Tableau de bord</a>
              <a href="/profil.html">⚙️ Paramètres</a>
              <hr style="margin: 0.5rem 0; border-color: var(--border-light);">
              <a href="#" class="logout-btn">🚪 Déconnexion</a>
          </div>
        `;
        authWrapper.appendChild(widget);

        if (authContainer) authContainer.style.display = 'none';

        // Logout
        widget.querySelector('.logout-btn').addEventListener('click', async (e) => {
          e.preventDefault();
          e.stopPropagation();
          try {
            await authService.signOut();
            window.location.href = '/';
          } catch (error) {
            console.error('Logout error:', error);
            alert('Erreur lors de la déconnexion.');
          }
        });

        // Dropdown toggle
        const profileBtn = widget.querySelector('.profile-btn');
        const dropdownMenu = widget.querySelector('.dropdown-menu');
        profileBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          dropdownMenu.style.display = dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        document.addEventListener('click', (e) => {
          if (!widget.contains(e.target)) dropdownMenu.style.display = 'none';
        });
      }
    } else {
      if (authContainer) authContainer.style.display = 'block';
      const widget = authWrapper.querySelector('.user-profile-widget');
      if (widget) widget.remove();
    }
  }

  setupMobileDrawer() {
    const mobileToggle = this.querySelector('#mobile-menu-toggle');
    const mobileDrawer = this.querySelector('#mobile-drawer');
    const closeDrawerBtn = this.querySelector('#close-drawer');
    
    // Add backdrop if not exists
    let drawerBackdrop = document.querySelector('.drawer-backdrop');
    if (!drawerBackdrop) {
      drawerBackdrop = document.createElement('div');
      drawerBackdrop.className = 'drawer-backdrop';
      document.body.appendChild(drawerBackdrop);
    }

    const toggleDrawer = (show) => {
      if (!mobileDrawer) return;
      if (show) {
        mobileDrawer.classList.add('active');
        drawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        mobileDrawer.classList.remove('active');
        drawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    };

    if (mobileToggle) mobileToggle.addEventListener('click', () => toggleDrawer(true));
    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  setupSearchOverlay() {
    const searchToggles = this.querySelectorAll('.search-toggle, .header-search-bar button');
    const searchOverlay = this.querySelector('#search-overlay');
    const closeSearchBtn = searchOverlay?.querySelector('.close-search');

    if (searchOverlay) {
      searchToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          searchOverlay.classList.add('active');
          const input = searchOverlay.querySelector('input');
          if (input) setTimeout(() => input.focus(), 100);
        });
      });

      if (closeSearchBtn) {
        closeSearchBtn.addEventListener('click', () => {
          searchOverlay.classList.remove('active');
        });
      }
    }
  }

  setupStickyHeader() {
    const mainHeader = this.querySelector('#main-header');
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    });
  }

  highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('.nav-link, .mobile-link, .dropdown-menu-modern a');
    
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Handle root path vs index.html
      const isHome = (href === '/' || href === '/index.html');
      const isCurrentHome = (currentPath === '/' || currentPath === '/index.html' || currentPath === '');

      let isActive = false;
      if (isHome && isCurrentHome) {
        isActive = true;
      } else if (href !== '/' && (currentPath === href || currentPath.endsWith(href))) {
        isActive = true;
      }

      if (isActive) {
        link.classList.add('active');
        
        // If it's a dropdown link, highlight the trigger too
        const dropdown = link.closest('.nav-item-dropdown');
        if (dropdown) {
          const trigger = dropdown.querySelector('.dropdown-trigger');
          if (trigger) trigger.classList.add('active');
        }
      }
    });
  }
}

customElements.define('site-header', SiteHeader);
