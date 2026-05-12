import './style.css';
import emailjs from '@emailjs/browser';

// Import Web Components
import './components/SiteHeader.js';
import './components/SiteFooter.js';
import './components/AdPlacements.js';

// Import App Modules
import { initNewsletter } from './modules/Newsletter.js';
import { initEvents } from './modules/Events.js';
import { initDeals } from './modules/Deals.js';
import { initCarousels } from './modules/Carousels.js';
import { initAnimations } from './modules/Animations.js';
import { initArticleSystem } from './modules/ArticleSystem.js';

// Global Init
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize EmailJS
    try {
        emailjs.init("Uz8D84oA18HbPeDw3");
    } catch (e) {
        console.warn('EmailJS intialization failed', e);
    }

    // 2. Initialize Business Logic Modules
    initNewsletter();
    initEvents();
    initDeals();
    initArticleSystem();

    // 3. Initialize UI/UX Modules
    initCarousels();
    initAnimations();
});
