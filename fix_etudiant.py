import os
import re

file_path = r"c:\Users\Sabry\Desktop\Projets\Projet LES BDE\SmartStud Anti Gravity\etudiant.html"
index_path = r"c:\Users\Sabry\Desktop\Projets\Projet LES BDE\SmartStud Anti Gravity\index.html"

# Read both files
with open(file_path, "r", encoding="utf-8") as f:
    etud_content = f.read()
    
with open(index_path, "r", encoding="utf-8") as f:
    index_content = f.read()

# Extract header and footer from index.html
header_match = re.search(r'(<header.*?</header>)', index_content, re.DOTALL)
if header_match:
    good_header = header_match.group(1)
else:
    good_header = ""

footer_match = re.search(r'(<footer.*</footer>)', index_content, re.DOTALL)
if footer_match:
    good_footer = footer_match.group(1)
else:
    good_footer = ""

# Replace header in etudiant.html
if good_header:
    etud_content = re.sub(r'<header.*?</header>', good_header, etud_content, flags=re.DOTALL)

# Replace footer in etudiant.html. Note the broken footer in etud_content
# It looks like:
# <footer>
#        <div class="footer-écontent">
#            <div class="footer-écol èreveal">
#                <footer>...</footer>
if good_footer:
    etud_content = re.sub(r'<footer>.*</footer>', good_footer, etud_content, flags=re.DOTALL)
    # the above regex might eat too much if there are multiple footers, let's just strip everything from the first <footer> to the end, then append the good footer + script + body/html tags.
    footer_start = etud_content.find("<footer>")
    if footer_start != -1:
        etud_content = etud_content[:footer_start] + good_footer + "\n  <script type=\"module\" src=\"/src/main.js\"></script>\n</body>\n</html>\n"

# Now fix the text
replacements = {
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
    
    # special characters replacement due to encoding loss
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
    "dj": "déjà", # just in case
    "": "é", # catchal for remaining ones, but 'à' is also possible! Need to be careful.
}

# we'll do the specific ones first
for k, v in replacements.items():
    if k != "":
         etud_content = etud_content.replace(k, v)

# any remaining "" -> "e" probably? Let's just avoid a catch-all for now.

with open(file_path, "w", encoding="utf-8") as f:
    f.write(etud_content)
    
print("Correction applied!")
