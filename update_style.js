import fs from 'node:fs';
const path = 'src/style.css';
let content = fs.readFileSync(path, 'utf8');

// New CSS Content
const newCss = `
/* --- Header & Navigation (Stacked Modern) --- */
.site-header-stacked {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  z-index: 1000;
  position: sticky;
  top: 0;
  transition: all 0.3s ease;
}

/* Row 1: Brand, Search, Auth */
.header-top-row {
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(0,0,0,0.03);
}

.header-top-row .header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.header-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.header-logo {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--primary-color);
  letter-spacing: -0.03em;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.header-logo span {
  color: var(--secondary-color);
}

/* Visible Search Bar */
.header-search-bar {
  flex: 1;
  max-width: 500px;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: 50px;
  padding: 0.4rem 0.5rem 0.4rem 1rem;
  transition: all 0.2s;
}

.header-search-bar:focus-within {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.header-search-bar input {
  border: none;
  background: none;
  flex: 1;
  outline: none;
  font-size: 0.9rem;
  color: var(--text-main);
}

.header-search-bar button {
  background: var(--primary-color);
  border: none;
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.header-search-bar button:hover {
  background: var(--primary-dark);
}

/* Auth */
.auth-container {
  flex-shrink: 0;
}

.btn-login-modern {
  background: var(--primary-color);
  color: white;
  padding: 0.5rem 1.2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
}

.btn-login-modern:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
}

/* Row 2: Navigation Scroll */
.header-bottom-row {
  height: 48px;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.5);
  border-bottom: 1px solid rgba(0,0,0,0.05); /* Slight separation */
}

.header-nav-scroll {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  padding-bottom: 0; /* No scrollbar space if hidden */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
  height: 100%;
  width: 100%; /* Take full width */
}

.header-nav-scroll::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.header-nav-scroll .nav-link {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-secondary);
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.header-nav-scroll .nav-link:hover {
  color: var(--primary-color);
  background: rgba(0,0,0,0.03);
}

.nav-link-accent {
  color: var(--secondary-color) !important;
  font-weight: 700 !important;
}

.nav-divider {
  color: var(--border-light);
  font-size: 0.8rem;
  margin: 0 0.2rem;
  opacity: 0.5;
}


/* Mobile & Responsive */
.mobile-menu-btn {
  display: none; /* Hidden on Desktop */
}

/* Search Overlay (Mobile) */
.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Full screen overlay on mobile */
  background: rgba(255,255,255,0.98);
  z-index: 1005;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  backdrop-filter: blur(10px);
}

.search-overlay.active {
  transform: translateY(0);
}

.search-container {
  width: 90%;
  max-width: 600px;
  display: flex;
  gap: 10px;
}

.search-container input {
  flex: 1;
  font-size: 1.2rem;
  padding: 1rem;
  border: 1px solid var(--border-light);
  border-radius: 50px;
}

.close-search {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

/* Wrapper for specific mobile overrides */
@media (max-width: 992px) {
  .header-bottom-row {
    display: none; /* Hide nav row on mobile */
  }

  /* Hide desktop elements on mobile */
  .header-search-bar {
    display: none; 
  }

  .auth-container {
    display: none; 
  }
  
  .mobile-menu-btn {
    display: flex;
    border: none;
    background: none;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .mobile-menu-btn .bar {
    width: 24px;
    height: 2px;
    background: var(--text-main);
    transition: all 0.3s;
  }

  /* Adjust Drawer */
  .mobile-nav-drawer {
    box-shadow: -5px 0 20px rgba(0,0,0,0.1);
  }
}

/* Mobile Drawer Styles */
.mobile-nav-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: white;
  z-index: 2000;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.mobile-nav-drawer.active {
  transform: translateX(0);
}

.drawer-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-weight: 700;
  font-size: 1.1rem;
}

.close-drawer {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  padding: 0.8rem;
  border-radius: 8px;
  font-weight: 600;
  color: var(--text-main);
  text-decoration: none;
}

.mobile-link:hover {
  background: var(--bg-body);
  color: var(--primary-color);
}

.drawer-footer {
  padding: 1rem;
  border-top: 1px solid var(--border-light);
}

.full-width {
  width: 100%;
  display: block;
  text-align: center;
}
`;

// Find Start and End
// Start: /* --- Header & Navigation (Fixed & Robust - Modernized) --- */
// End: /* Decorative Blobs */

const startMarker = "/* --- Header & Navigation (Fixed & Robust - Modernized) --- */";
const endMarker = "/* Decorative Blobs */";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    console.log("Found markers. Replacing...");
    const before = content.substring(0, startIndex);
    const after = content.substring(endIndex);

    const newContent = before + newCss + "\n\n" + after;
    fs.writeFileSync(path, newContent);
    console.log("Style updated successfully.");
} else {
    console.log("Markers not found.");
    // Fallback: try finding just the start
    if (startIndex !== -1) {
        console.log("Found start only. Checking relative end...");
        // Try finding the Responsive Breakpoints end
        const altEnd = content.indexOf("/* Decorative Blobs */");
        if (altEnd !== -1) {
            // ...
        }
        console.log("Could not safely replace. Dumping markers info:");
        console.log("Start Index:", startIndex);
        console.log("End Index:", endIndex);
    } else {
        console.log("Start marker not found:", startMarker);
    }
}
