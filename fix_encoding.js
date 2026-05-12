
import fs from 'node:fs';

const files = ['etudiant.html', 'enseignants.html'];

// Dictionary of fixable patterns. Order matters (longer words first to avoid partial replacements).
// We assume the corrupted character is '' (U+FFFD).
const replacements = [
    // Common words
    { pattern: /tudiant/gi, replacement: 'étudiant' },
    { pattern: /tudes/gi, replacement: 'études' },
    { pattern: /russir/gi, replacement: 'réussir' },
    { pattern: /pdagogi/gi, replacement: 'pédagogi' }, // pédagogie, pédagogique
    { pattern: /Pdagogi/g, replacement: 'Pédagogi' },
    { pattern: /carrire/gi, replacement: 'carrière' },
    { pattern: /mtier/gi, replacement: 'métier' },
    { pattern: /Mtier/g, replacement: 'Métier' },
    { pattern: /socit/gi, replacement: 'société' },
    { pattern: /rseau/gi, replacement: 'réseau' },
    { pattern: /dj/gi, replacement: 'déjà' },
    { pattern: /lyce/gi, replacement: 'lycée' },
    { pattern: /1re/g, replacement: '1ère' },
    { pattern: /spcialit/gi, replacement: 'spécialité' },
    { pattern: /filire/gi, replacement: 'filière' },
    { pattern: /procdure/gi, replacement: 'procédure' },
    { pattern: /cls/gi, replacement: 'clés' },
    { pattern: /mthod/gi, replacement: 'méthod' }, // méthode, méthodologie
    { pattern: /rvision/gi, replacement: 'révision' },
    { pattern: /mmorisation/gi, replacement: 'mémorisation' },
    { pattern: /confrence/gi, replacement: 'conférence' },
    { pattern: /tmoignage/gi, replacement: 'témoignage' },
    { pattern: /concrte/gi, replacement: 'concrète' },
    { pattern: /prparer/gi, replacement: 'préparer' },
    { pattern: /grer/gi, replacement: 'gérer' },
    { pattern: /gnration/gi, replacement: 'génération' },
    { pattern: /reprer/gi, replacement: 'repérer' },
    { pattern: /dtecter/gi, replacement: 'détecter' },
    { pattern: /capacit/gi, replacement: 'capacité' },
    { pattern: /trs /gi, replacement: 'très ' }, // space to avoid partial
    { pattern: /dmnagement/gi, replacement: 'déménagement' },
    { pattern: /rel/gi, replacement: 'réel' },
    { pattern: /conomis/gi, replacement: 'économis' },
    { pattern: /anne/gi, replacement: 'année' },
    { pattern: /soire/gi, replacement: 'soirée' },
    { pattern: /hte/gi, replacement: 'hâte' },
    { pattern: /runion/gi, replacement: 'réunion' },
    { pattern: /amnagement/gi, replacement: 'aménagement' },
    { pattern: /numrique/gi, replacement: 'numérique' },
    { pattern: /systme/gi, replacement: 'système' },
    { pattern: /cosystme/gi, replacement: 'écosystème' },
    { pattern: /lgal/gi, replacement: 'légal' },
    { pattern: /lgale/gi, replacement: 'légale' },
    { pattern: /confidentialit/gi, replacement: 'confidentialité' },
    { pattern: /tranger/gi, replacement: 'étranger' },
    { pattern: /bnvolat/gi, replacement: 'bénévolat' },
    { pattern: /bnfici/gi, replacement: 'bénéfici' },
    { pattern: /colos/gi, replacement: 'écolos' },
    { pattern: /cologi/gi, replacement: 'écologi' },
    { pattern: /priv/gi, replacement: 'privé' },
    { pattern: /responsabilit/gi, replacement: 'responsabilité' },
    { pattern: /libert/gi, replacement: 'liberté' },
    { pattern: /actualit/gi, replacement: 'actualité' },
    { pattern: /crer/gi, replacement: 'créer' },
    { pattern: /cration/gi, replacement: 'création' },
    { pattern: /lve/gi, replacement: 'élève' },
    { pattern: /tre/gi, replacement: 'être' },
    { pattern: /  /g, replacement: ' à ' }, // Isolated 'a' accent grave
    { pattern: /n/g, replacement: 'N°' }, // N1 -> N°1
    { pattern: //g, replacement: 'é' }, // Fallback for remaining common accents (risky but most likely é)
];

files.forEach(file => {
    if (!fs.existsSync(file)) {
        console.log(`Skipping ${file} - not found`);
        return;
    }

    let content = fs.readFileSync(file, 'utf8');
    let originalMatchCount = (content.match(//g) || []).length;
    
    if (originalMatchCount === 0) {
        // Also check for literal '??' if encoding was totally lost in display or strict mode
        // But the user file view showed '', so we stick to that first.
        console.log(`No '' found in ${file}. Checking for double question marks...`);
        // Heuristic for '?? ' -> 'à ' or similar?
        // Maybe the file view was smart and the file on disk is different?
        // Let's assume the previous view_file was accurate to the node fs read.
    }

    replacements.forEach(({ pattern, replacement }) => {
        content = content.replace(pattern, (match) => {
            // Preservation of case for simple strings is handled by regex /i and explicit replacements
            // For general function we'd need more logic, but here we mapped lowercase/uppercase in some cases
            // or we use valid casing in replacement.
            // Simple replace is OK for fixed strings.
            return replacement;
        });
    });

    let remaining = (content.match(//g) || []).length;
        console.log(`Processed ${file}: Fixed approx ${originalMatchCount - remaining} issues. Remaining '': ${remaining}`);

    fs.writeFileSync(file, content);
});
