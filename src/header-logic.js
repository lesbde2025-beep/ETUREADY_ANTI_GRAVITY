
// =========================================
// HEADER & NAVIGATION INTERACTIVITY
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header Effect
    const header = document.getElementById('main-header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Drawer
    const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const drawerLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileDrawer) {

        // Open
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active'); // CSS should handle .active
            document.body.style.overflow = 'hidden'; // Prevent body scroll
        });

        // Close via Button
        if (closeDrawerBtn) {
            closeDrawerBtn.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Close via clicking outside (optional but good UX)
        mobileDrawer.addEventListener('click', (e) => {
            if (e.target === mobileDrawer) {
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close on link click
        drawerLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 3. Search Overlay Toggle
    const searchBtns = document.querySelectorAll('.header-search-bar button, .mobile-search-btn'); // Adjust selectors as needed
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearchBtn = document.querySelector('.close-search');

    if (searchOverlay) {
        searchBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // If it's the main search button (magnifying glass)
                // We might want to focus the input instead of overlay if on desktop?
                // For now, let's assume overlay behavior for smaller screens or consistent behavior
                if (window.innerWidth < 992) {
                    e.preventDefault();
                    searchOverlay.classList.add('active');
                    const input = searchOverlay.querySelector('input');
                    if (input) setTimeout(() => input.focus(), 100);
                }
            });
        });

        if (closeSearchBtn) {
            closeSearchBtn.addEventListener('click', () => {
                searchOverlay.classList.remove('active');
            });
        }

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
            }
        });
    }

    // 4. Dropdown Toggle for Mobile (if needed inside drawer)
    // Currently drawer links are flat, which is good.

    // 5. Desktop Dropdown Interaction (CSS :hover handles it usually, but we added JS for click in some designs)
    // Our CSS uses .nav-item-dropdown:hover, so JS is not strictly needed for desktop dropdowns 
    // unless we want click-to-toggle on touch devices.
    const dropdownTriggers = document.querySelectorAll('.dropdown-trigger');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            // For touch devices where hover doesn't exist
            if (window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                const menu = trigger.nextElementSibling;
                if (menu) {
                    menu.style.visibility = (menu.style.visibility === 'visible') ? 'hidden' : 'visible';
                    menu.style.opacity = (menu.style.opacity === '1') ? '0' : '1';
                }
            }
        });
    });

});
