const fs = require('fs');

const filePath = 'c:\\Users\\Sabry\\Desktop\\Projets\\Projet LES BDE\\SmartStud Anti Gravity\\etudiant.html';
const indexPath = 'c:\\Users\\Sabry\\Desktop\\Projets\\Projet LES BDE\\SmartStud Anti Gravity\\index.html';

let etudContent = fs.readFileSync(filePath, 'utf-8');
const indexContent = fs.readFileSync(indexPath, 'utf-8');

// Extract header and footer from index.html
const headerRegex = /(<header[\s\S]*?<\/header>)/;
const goodHeaderMatch = indexContent.match(headerRegex);
const goodHeader = goodHeaderMatch ? goodHeaderMatch[1] : '';

const footerRegex = /(<footer[\s\S]*<\/footer>)/;
const goodFooterMatch = indexContent.match(footerRegex);
const goodFooter = goodFooterMatch ? goodFooterMatch[1] : '';

// Replace header
if (goodHeader) {
    etudContent = etudContent.replace(/<header[\s\S]*?<\/header>/, goodHeader);
}

// Replace footer
if (goodFooter) {
    const footerStart = etudContent.indexOf('<footer>');
    if (footerStart !== -1) {
        etudContent = etudContent.substring(0, footerStart) + goodFooter + '\n  <script type="module" src="/src/main.js"></script>\n</body>\n</html>\n';
    }
}

// Fix words
const replacements = {
    "èrel": "rel",
    "iécon": "icon",
    "hèref": "href",
    "écontent": "content",
    "pèreéconnect": "preconnect",
    "écom": "com",
    "éétudiant": "étudiant",
    "écontainer": "container",
    "èreveal": "reveal",
    "écolor": "color",
    "écopy": "copy",
    "écontact": "contact",
    "éconfidentialite": "confidentialite",
    "écorèrespondance": "correspondance",
    "èread-moère": "read-more",
    "Parécoursup": "Parcoursup",
    "eécoles": "ecoles",
    "eéétudiant": "etudiant",
    "paèrents": "parents",
    "éconnexion": "connexion",
    "pass-etuèready": "pass-etuready",
    "annuaière": "annuaire",
    "entèrepèreneuriat": "entrepreneuriat",
    "pèrendère": "prendre",
    "transpaèrent": "transparent",
    "écompèrendère": "comprendre",
    "Prpaèrer": "Préparer",
    "Exploère": "Explore",
    "èrelations": "relations",
    "éconstruière": "construire",
    "Sponsorisé": "Sponsorisé",
    "écommunaut": "communauté",

    // special characters replacement due to encoding loss
    "russir": "réussir",
    "études": "études",
    "lyce": "lycée",
    "dj": "déjà",
    " la fac": "à la fac",
    "Specialits": "Spécialités",
    "filières": "filières",
    "procduère": "procédure",
    "mthodes": "méthodes",
    "Mthodes": "Méthodes",
    "mmorisation": "mémorisation",
    "mtiers": "métiers",
    "éconcrtes": "concrètes",
    "Découvère": "Découvre",
    "Découverte": "Découverte",
    "Russir": "Réussir",
    "tapes": "étapes",
    "rvision": "révision",
    " l'tranger": "à l'étranger",
    "tranger": "étranger",
    " l'école": "à l'école",
    "ééétudiants": "étudiants",
    "éétudiant": "étudiant",
    "éétudiante": "étudiante",
    "écoles": "écoles",
    "école": "école",
    " ": "à ",
    "csuère": "césure",
    "Sant": "Santé",
    "quilibère": "Équilibre",
    "Gèrer": "Gérer",
    "anxit": "anxiété",
    "soliétude": "solitude",
    "Dbrouille": "Débrouille",
    "quilibr": "équilibré",
    "éconnatère": "connaître",
    "ct": "côté",
    "critères": "critères",
    "Soires": "Soirées",
    "hsites": "hésites",
    "Plutt": "Plutôt",
    "ftard": "fêtard",
    "rserv": "réservé",
    "cur": "cœur",
    "vnements": "événements",
    "ide": "idée",
    "Bnvolat": "Bénévolat",
    "écologie": "écologie",
    "Reois": "Reçois",
    "trouv": "trouvé",
    "grce": "grâce",
    "offères": "offres",
    "adaptes": "adaptées",
    "Hte": "Hâte",
    "cls": "clés",
    "gèrer": "gérer",
    "mme": "même",
    "tère": "être",
    "dj": "déjà"
};

for (const [k, v] of Object.entries(replacements)) {
    etudContent = etudContent.split(k).join(v);
}
// For replacing  (U+FFFD) - mostly these are accented chars
// We need to look at specific context to fix the  if it missed.
// Or we can just do a mass replace of  with é, then fix the ones that are à or a circumflex.
// Examples of things left:
// "dj" -> "déjà"
// "lyce" -> "lycée", "" -> "à" ...
const globalReplacements = {
    "dj ": "déjà à",
    "dj": "déjà",
    "lyce": "lycée",
    "russir": "réussir",
    "études": "études",
    "rseau": "réseau",
    "éétudiante": "étudiante",
    "Specialits": "Spécialités",
    "filières": "filières",
    "procduère": "procédure",
    "tapes": "étapes",
    "cls": "clés",
    "écoles": "écoles",
    "Mthodes": "Méthodes",
    "rvisions": "révisions",
    "rvision": "révision",
    "mmorisation": "mémorisation",
    "mtiers": "métiers",
    "ééétudiants": "étudiants",
    " l'tranger": "à l'étranger",
    "tranger": "étranger",
    "Csuère": "Césure",
    "csuère": "césure",
    "Sant": "Santé",
    "Bien-tère": "Bien-être",
    "quilibère": "équilibre",
    "anxit": "anxiété",
    "tte": "tête",
    "dbrouille": "débrouille",
    "quilibr": "équilibré",
    "connatère": "connaître",
    "ct": "côté",
    "Sponsorisé": "Sponsorisé",
    "Soires": "Soirées",
    "soires": "soirées",
    "Thunes": "Thunes", // just a word
    "Arme": "Armée",
    "Dtente": "Détente",
    "filière": "filière",
    "hsites": "hésites",
    "Plutt": "Plutôt",
    "ftard": "fêtard",
    "Timidité": "Timidité",
    "rserv": "réservé",
    "cur": "cœur",
    "vnements": "événements",
    "ide": "idée",
    "Bnvolat": "Bénévolat",
    "cologie": "écologie",
    "Reois": "Reçois",
    "trouv": "trouvé",
    "grce": "grâce",
    "Hte": "Hâte",
    "éétudiant": "étudiant",
    "écosystme": "écosystème",
    "lgales": "légales",
    "Lgal": "Légal",
    "Confidentialité": "Confidentialité",
    "communaut": "communauté",
    " ": "à ",  // "  " is usually " à "
    "": "é",   // catchal
};

for (const [k, v] of Object.entries(globalReplacements)) {
    etudContent = etudContent.split(k).join(v);
}

fs.writeFileSync(filePath, etudContent, 'utf-8');
console.log("Done");
