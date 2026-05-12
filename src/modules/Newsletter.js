export async function initNewsletter() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  if (newsletterForms.length === 0) return;

  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (input && input.value) {
        const serviceID = 'service_lp3u209';
        const templateID = 'template_42q1htr';

        const templateParams = {
          email: input.value,
          to_name: input.value.split('@')[0],
          message: `Bienvenue chez EtuReady !\n\nVoici vos bons plans exclusifs :\n- 🍔 Burger King : -20% (Code: ETUREADYBK25)\n- 💻 Apple Education : Jusqu'à 150€ offerts\n- 🎵 Spotify Premium : 3 mois offerts\n- 🚆 SNCF Connect : -30% avec la Carte Avantage\n\nA très vite !`
        };

        const btn = form.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Envoi en cours...';
        btn.disabled = true;

        if (typeof emailjs === 'undefined') {
          alert('Erreur : EmailJS non chargé.');
          btn.textContent = originalText;
          btn.disabled = false;
          return;
        }

        try {
          emailjs.send(serviceID, templateID, templateParams)
            .then(() => {
              alert('Email envoyé avec succès ! Vérifiez votre boîte de réception.');
              input.value = '';
              btn.textContent = originalText;
              btn.disabled = false;
            }, (err) => {
              console.error('FAILED...', err);
              alert('Erreur EmailJS. Réessayez plus tard.');
              btn.textContent = originalText;
              btn.disabled = false;
            });
        } catch (error) {
          console.error(error);
          btn.textContent = originalText;
          btn.disabled = false;
        }
      }
    });
  });
}
