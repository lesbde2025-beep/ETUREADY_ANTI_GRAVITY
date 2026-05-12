
import fs from 'node:fs';

const files = ['etudiant.html', 'enseignants.html'];

// Since regex on the replacement character '' is often problematic because tools interpret it differently,
// we will detect the common pattern of failure.
// In the step output (e.g., Step 614), we see '' instead of 'é'.
// This '' is the Replacement Character U+FFFD (buffer: EF BF BD).

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`Skipping ${file} - not found`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');

    // We will define replacements based on the CONTEXT of the corruption shown in the logs.

    const contextReplacements = [
        // Title
        { from: 'Espace tudiant', to: 'Espace Étudiant' },
        { from: 'tudiants', to: 'étudiants' }, // generic plural
        { from: 'tudiant', to: 'étudiant' }, // generic singular

        // Etudiant.html specifics
        { from: 'Tout pour russir tes tudes', to: 'Tout pour réussir tes études' },
        { from: 'de la vie tudiante', to: 'de la vie étudiante' },
        {
            from: 'Bienvenue dans ton espace ! Ici, c\'est ton QG : que tu sois au lyce ou dj  la fac',
            to: 'Bienvenue dans ton espace ! Ici, c\'est ton QG : que tu sois au lycée ou déjà à la fac'
        },
        {
            from: 'tout ce qu\'il\n                te faut pour russir et kiffer ta vie',
            to: 'tout ce qu\'il\n                te faut pour réussir et kiffer ta vie'
        },
        { from: '?? Avant Bac : Prep\' Zen', to: '🎓 Avant Bac : Prep\' Zen' }, // Emojis also often break
        { from: 'Lyce (1re & Terminale)', to: 'Lycée (1ère & Terminale)' },
        { from: 'Choisis sa voie', to: 'Choisis sa voie' }, // Already fine? No "?? Choisir sa voie"
        { from: '?? Choisir sa voie', to: '🎯 Choisir sa voie' },
        { from: 'Specialits du Bac, filires d\'avenir', to: 'Spécialités du Bac, filières d\'avenir' },
        { from: 'sur la procdure Parcoursup', to: 'sur la procédure Parcoursup' },
        {
            from: 'Dossier Parcoursup :\n                                    tapes\n                                    cls',
            to: 'Dossier Parcoursup :\n                                    étapes\n                                    clés'
        },
        {
            from: 'Quiz : Quelle filire\n                                    pour moi ?',
            to: 'Quiz : Quelle filière\n                                    pour moi ?'
        },
        { from: 'Classement des coles', to: 'Classement des écoles' },
        { from: 'Russir le Bac', to: 'Réussir le Bac' },
        { from: 'Mthodes & Rvisions', to: 'Méthodes & Révisions' },
        {
            from: 'Fiches de rvision, grand oral, et gestion du stress',
            to: 'Fiches de révision, grand oral, et gestion du stress'
        },
        {
            from: 'Prparer le Grand\n                                    Oral',
            to: 'Préparer le Grand\n                                    Oral'
        },
        {
            from: 'Techniques de\n                                    mmorisation',
            to: 'Techniques de\n                                    mémorisation'
        },
        { from: 'Inspiration', to: 'Inspiration' },
        { from: 'Dcouverte Mtiers', to: 'Découverte Métiers' },
        { from: 'fiches mtiers concrtes et des tmoignages', to: 'fiches métiers concrètes et des témoignages' },
        { from: 'Les mtiers de l\'IA', to: 'Les métiers de l\'IA' },
        {
            from: 'Salons tudiants \n                                    venir',
            to: 'Salons étudiants à\n                                    venir'
        },
        { from: '?? Post Bac : En Mode Expert', to: '🎓 Post Bac : En Mode Expert' },
        { from: 'Techniques d\'tude & Organisation', to: 'Techniques d\'étude & Organisation' },
        { from: 'meilleures mthodes pour valider son anne', to: 'meilleures méthodes pour valider son année' },
        { from: 'Mon Parcours & Mon Avenir', to: 'Mon Parcours & Mon Avenir' },
        { from: 'Se rorienter, trouver un stage, partir en csure', to: 'Se réorienter, trouver un stage, partir en césure' },
        { from: 'tudes  l\'tranger', to: 'Études à l\'étranger' },
        {
            from: 'Anne de\n                                    csure',
            to: 'Année de\n                                    césure'
        },
        { from: 'Sant / Bien-tre', to: 'Santé / Bien-être' },
        { from: 'Sant Mentale & quilibre', to: 'Santé Mentale & Équilibre' },
        { from: 'Grer le stress, l\'anxit', to: 'Gérer le stress, l\'anxiété' },
        {
            from: 'prendre soin de soi (et de sa\n                            tte)',
            to: 'prendre soin de soi (et de sa\n                            tête)'
        },
        { from: 'Dbrouille & Vie Adulte', to: 'Débrouille & Vie Adulte' },
        { from: 'Grer son budget, cuisiner quilibr', to: 'Gérer son budget, cuisiner équilibré' },
        { from: 'kit de survie de l\'tudiant', to: 'kit de survie de l\'étudiant' },
        { from: 'L\'IA au service de tes tudes', to: 'L\'IA au service de tes études' },
        { from: 'outils  connatre', to: 'outils à connaître' },
        { from: 'Bourses sur critres sociaux', to: 'Bourses sur critères sociaux' },
        { from: 'aides rgionales... Ne passe pas  ct', to: 'aides régionales... Ne passe pas à côté' },
        { from: 'Sponsoris', to: 'Sponsorisé' },
        { from: '?? Mode de Vie : Smart Life', to: '🌴 Mode de Vie : Smart Life' },
        { from: 'Soires', to: 'Soirées' },
        { from: 'Arme', to: 'Armée' },
        { from: '?? Espace Tests & Quiz', to: '🧩 Espace Tests & Quiz' },
        { from: 'Dtente & Orientation', to: 'Détente & Orientation' },
        { from: 'Quelle filire est faite pour toi ?', to: 'Quelle filière est faite pour toi ?' },
        {
            from: 'Tu hsites encore ? Fais ce test rapide pour trouver ta voie idale',
            to: 'Tu hésites encore ? Fais ce test rapide pour trouver ta voie idéale'
        },
        { from: 'Faire le test ?', to: 'Faire le test →' },
        { from: 'Quel tudiant es-tu en soire ?', to: 'Quel étudiant es-tu en soirée ?' },
        {
            from: 'Plutt roi du dancefloor ou pilier de bar ? Dcouvre ton profil ftard',
            to: 'Plutôt roi du dancefloor ou pilier de bar ? Découvre ton profil fêtard'
        },
        { from: 'Timidit', to: 'Timidité' },
        { from: 'Grand timide ou juste rserv ?', to: 'Grand timide ou juste réservé ?' },
        { from: 'mieux grer ta prise de parole', to: 'mieux gérer ta prise de parole' },
        { from: '?? Ton Agenda : Ne Rate Rien', to: '📅 Ton Agenda : Ne Rate Rien' },
        { from: 'Soires, WEI, vnements pro', to: 'Soirées, WEI, événements pro' },
        {
            from: 'Crer /\n                                    Rejoindre une asso',
            to: 'Créer /\n                                    Rejoindre une asso'
        },
        { from: 'tudiant-entrepreneur', to: 'étudiant-entrepreneur' },
        { from: 'Bnvolat & Impact', to: 'Bénévolat & Impact' },
        { from: 'donne du sens  tes tudes', to: 'donne du sens à tes études' },
        { from: 'Assos colos', to: 'Assos écolos' },
        { from: 'Reois les meilleurs bons plans', to: 'Reçois les meilleurs bons plans' },
        { from: 'dates de soires', to: 'dates de soirées' },
        { from: 'Ton email tudiant', to: 'Ton email étudiant' },
        { from: 'La parole aux tudiants', to: 'La parole aux étudiants' },
        { from: 'trouv mon stage de fin d\'tudes grce', to: 'trouvé mon stage de fin d\'études grâce' },
        { from: 'adaptes  nos profils', to: 'adaptées à nos profils' },
        {
            from: 'conomiser pas mal\n                        d\'argent cette anne',
            to: 'économiser pas mal\n                        d\'argent cette année'
        },
        { from: 'L\'ambiance aux soires est top', to: 'L\'ambiance aux soirées est top' },
        { from: 'Hte de la prochaine', to: 'Hâte de la prochaine' },
        { from: '??', to: '•' }, // Footer links ?? ?? ?? ?? likely icons. 
        // NOTE: In Step 614, icons are shown as '??'. We should replace them if possible, or just remove.

        // Enseignants.html specifics
        { from: 'Pdagogie, carrire et vie quotidienne', to: 'Pédagogie, carrière et vie quotidienne' },
        { from: 'Bienvenue sur l\'espace ddi aux enseignants', to: 'Bienvenue sur l\'espace dédié aux enseignants' },
        {
            from: 'Accdez  des ressources pdagogiques innovantes, grez\n                votre carrire',
            to: 'Accédez à des ressources pédagogiques innovantes, gérez\n                votre carrière'
        },
        { from: '?? Mtier & Pdagogie', to: '🎓 Métier & Pédagogie' },
        { from: 'Enseigner & Innover', to: 'Enseigner & Innover' },
        { from: 'Stratgies pdagogiques, classe inverse', to: 'Stratégies pédagogiques, classe inversée' },
        { from: 'Comprendre les tudiants', to: 'Comprendre les étudiants' },
        { from: 'Psychologie tudiante, gestion de classe et lves DYS', to: 'Psychologie étudiante, gestion de classe et élèves DYS' },
        {
            from: 'Grer\n                                une\n                                classe',
            to: 'Gérer\n                                une\n                                classe'
        },
        { from: 'Matriel & Outils', to: 'Matériel & Outils' },
        {
            from: 'Top 10 outils\n                        numriques',
            to: 'Top 10 outils\n                        numériques'
        },
        { from: 'Pdagogie Ludique', to: 'Pédagogie Ludique' },
        { from: 'Quel type de pdagogue tes-vous ?', to: 'Quel type de pédagogue êtes-vous ?' },
        { from: 'Socit', to: 'Société' },
        { from: 'nouvelle gnration', to: 'nouvelle génération' },
        { from: 'Savez-vous reprer ChatGPT ?', to: 'Savez-vous repérer ChatGPT ?' },
        { from: 'dtecter l\'IA', to: 'détecter l\'IA' },
        { from: '?? Carrire & Responsabilits', to: '💼 Carrière & Responsabilités' },
        { from: 'volution Carrire', to: 'Évolution Carrière' },
        { from: 'Postes Priv/Public', to: 'Postes Privé/Public' },
        { from: 'Sant au Travail', to: 'Santé au Travail' },
        { from: '?? Mode de Vie Enseignant', to: '🏡 Mode de Vie Enseignant' },
        { from: 'dmnagement, frais rels', to: 'déménagement, frais réels' },
        { from: 'Fiscalit', to: 'Fiscalité' },
        { from: 'communaut tudiante', to: 'communauté étudiante' },
        { from: 'N1', to: 'Nº1' },
        { from: 'cosystme', to: 'écosystème' },
        { from: 'Lgal', to: 'Légal' },
        { from: 'Mentions lgales', to: 'Mentions légales' },
        { from: 'Confidentialit', to: 'Confidentialité' },
        { from: 'Conseil de la vie tudiante', to: 'Conseil de la vie étudiante' },
        { from: 'Runion trimestrielle sur l\'amnagement', to: 'Réunion trimestrielle sur l\'aménagement' },
        { from: 'Nouveaux outils numriques', to: 'Nouveaux outils numériques' }
    ];

    contextReplacements.forEach(rep => {
        // Create a regex for the 'from' pattern, handling line breaks and spaces loosely if needed
        // Using .replace with string replaces only the first occurrence, need global.
        // But some 'from' strings are long sentences.
        // We'll iterate and replace all occurrences.

        // Escape special regex chars in 'from' just in case, except '' which we want to match literally
        // (assuming '' is strictly matching the corruption)
        // Actually, if we use strings in .replace in modern Node, it replaces first. .replaceAll replaces all.

        if (content.includes(rep.from)) {
            content = content.replaceAll(rep.from, rep.to);
        }
    });

    // Generic fallback for any remaining '' followed by common letters
    content = content.replaceAll(/tud/g, 'étud');
    content = content.replaceAll(/co/g, 'éco');
    content = content.replaceAll(/lve/g, 'élève');
    content = content.replaceAll(/re/g, 'ère'); // 1re -> 1ère

    // Final cleanup of remaining isolated '??' or '' that might be icons or accents
    // If it's "?? ", it's likely an icon bullet point.
    content = content.replaceAll('?? ', '🔹 ');
    content = content.replaceAll('? ', '➜ '); // "Voir le test ?" -> "Voir le test ➜"

    fs.writeFileSync(file, content);
    console.log(`Repaired ${file}`);
});
