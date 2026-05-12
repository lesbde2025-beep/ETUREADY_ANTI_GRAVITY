import fs from 'fs';
import path from 'path';

const dir = process.cwd();
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // 1. Fix vite.svg globally
  content = content.replace(/href="\/vite\.svg"/g, 'href="/public/vite.svg"');
  
  // 2. Fix etudiant.html typo
  if (file === 'etudiant.html') {
    content = content.replace(/article-boites-outils-etudes\.html/g, 'article-boite-outils-etudes.html');
  }

  // 3. Replace general href="#" based on link text or context
  content = content.replace(/href="#"([^>]*)>Mettre à jour mon profil<\/a>/g, 'href="/profil.html"$1>Mettre à jour mon profil</a>');
  content = content.replace(/href="#"([^>]*)>Mot de passe oublié \?<\/a>/g, 'href="/mot-de-passe-oublie.html"$1>Mot de passe oublié ?</a>');
  content = content.replace(/href="#"([^>]*)>(Voir le replay|Lire l\'info|Réserver|Voir le menu)<\/a>/g, 'href="/article-detail.html"$1>$2</a>');
  content = content.replace(/href="#"([^>]*)>(Télécharger le dossier|Devenir mentor|M'inscrire mainte[^<]+|Profiter de l'offre en ligne|Inscrire mon Asso Gratuitement)<\/a>/g, 'href="/formulaire-generique.html"$1>$2</a>');
  content = content.replace(/href="#"([^>]*)>Accéder au store Éducation<\/a>/g, 'href="https://www.apple.com/fr-edu/store" target="_blank"$1>Accéder au store Éducation</a>');
  
  // Replace specific links in assos.html
  if (file === 'assos.html') {
    content = content.replace(/href="#"([^>]*)>L'assurance<\/a>/g, 'href="/article-bde-droit-asso.html"$1>L\'assurance</a>');
    content = content.replace(/href="#"([^>]*)>Gérer un budget<\/a>/g, 'href="/article-bde-gerer-budget-asso.html"$1>Gérer un budget</a>');
    content = content.replace(/href="#"([^>]*)>Vendre des goodies<\/a>/g, 'href="/boutique-goodies.html"$1>Vendre des goodies</a>');
  }

  // Handle annuaire-bde.html map areas
  if (file === 'annuaire-bde.html') {
    content = content.replace(/region\.getAttribute\('data-name'\)/g, "region.getAttribute('data-region')");
    content = content.replace(/const regions = document\.querySelectorAll\('\.region'\);/g, "const regions = document.querySelectorAll('.directory-map area');");
    content = content.replace(/region\.addEventListener\('click', \(\) => {/g, "region.addEventListener('click', (e) => {\n                e.preventDefault();");
    // Fix the typo in region loop (annuaire-bde.html has an empty href="#" area which is handled below)
  }

  // Handle remaining generic empty links
  content = content.replace(/<a href="#" class="(category-item[^>]*)">/g, '<a href="/article-detail.html" class="$1">');
  content = content.replace(/href="#" class="btn"/gi, 'href="/article-detail.html" class="btn"');
  content = content.replace(/href="#" class="btn-theme"/gi, 'href="/formulaire-generique.html" class="btn-theme"');
  content = content.replace(/href="#" class="card([\w\s-]*)"/gi, 'href="/article-detail.html" class="card$1"');
  content = content.replace(/href="#" class="btn-primary"/gi, 'href="/formulaire-generique.html" class="btn-primary"');
  content = content.replace(/href="#"/g, 'href="javascript:void(0)"');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${file}`);
  }
});
