import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    allowedHosts: true, // Allows all hosts, solving loca.lt blocking
    port: 5173,
  },
  preview: {
    allowedHosts: true,
    port: 5173,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // Profiles
        etudiant: resolve(__dirname, 'etudiant.html'),
        alumni: resolve(__dirname, 'alumni.html'),
        bonsPlans: resolve(__dirname, 'bons-plans.html'),
        evenement: resolve(__dirname, 'evenement.html'),
        formation: resolve(__dirname, 'formation.html'),
        actus: resolve(__dirname, 'actus.html'),
        assos: resolve(__dirname, 'assos.html'),
        reseau: resolve(__dirname, 'reseau.html'),
        article: resolve(__dirname, 'article.html'),
        connexion: resolve(__dirname, 'connexion.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
        annuaireBde: resolve(__dirname, 'annuaire-bde.html'),
        partenaire: resolve(__dirname, 'partenaire.html'),
        bonPlan: resolve(__dirname, 'bon-plan.html'),
        bde: resolve(__dirname, 'bde.html'),
        enseignants: resolve(__dirname, 'enseignants.html'),
        parents: resolve(__dirname, 'parents.html'),
        // New Content Pages
        articleLogement: resolve(__dirname, 'article-apl.html'),
        articleApl: resolve(__dirname, 'article-apl.html'),
        articleBudget: resolve(__dirname, 'article-budget.html'),
        articleSecu: resolve(__dirname, 'article-secu.html'),
        articlePlanning: resolve(__dirname, 'article-planning-partiels.html'),
        articleIa: resolve(__dirname, 'article-ia-enseignement.html'),
        articleProjets: resolve(__dirname, 'article-appel-projets.html'),
        articleTemoignage: resolve(__dirname, 'article-temoignage-marie.html'),
        articleMentor: resolve(__dirname, 'article-devenir-mentor.html'),
        eventNuitBde: resolve(__dirname, 'evenement-nuit-bde.html'),
        eventLan: resolve(__dirname, 'evenement-lan-party.html'),
        eventSpeed: resolve(__dirname, 'evenement-speed-friendship.html'),
        eventSalon: resolve(__dirname, 'evenement-salon-emploi.html'),
        eventAfterwork: resolve(__dirname, 'evenement-afterwork-jeudi.html'),
        eventConseil: resolve(__dirname, 'evenement-conseil-vie-etudiante.html'),
        eventAlumni: resolve(__dirname, 'evenement-alumni-paris.html'),
        dealBoursorama: resolve(__dirname, 'bon-plan-boursorama.html'),
        dealBk: resolve(__dirname, 'bon-plan-bk.html'),
        dealApple: resolve(__dirname, 'bon-plan-apple.html'),
        dealBasicFit: resolve(__dirname, 'bon-plan-basic-fit.html'),
      },
    },
  },
});
