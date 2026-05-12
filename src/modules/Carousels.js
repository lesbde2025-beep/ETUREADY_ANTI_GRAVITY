export function initCarousels() {
  // Main Hero Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const dots = document.querySelectorAll('.dot');

  if (slides.length > 0) {
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');
      currentSlide = index;
    }

    function nextSlide() {
      let next = currentSlide + 1;
      if (next >= slides.length) next = 0;
      showSlide(next);
    }

    function prevSlide() {
      let prev = currentSlide - 1;
      if (prev < 0) prev = slides.length - 1;
      showSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showSlide(index);
        resetTimer();
      });
    });

    let timer = setInterval(nextSlide, slideInterval);

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(nextSlide, slideInterval);
    }
  }

  // Avatar Carousel Logic (Infinite 360)
  const avatarGrid = document.getElementById('avatar-grid');
  const avatarPrev = document.getElementById('avatar-prev');
  const avatarNext = document.getElementById('avatar-next');

  if (avatarGrid && avatarPrev && avatarNext) {
    const cardWidth = 176; // width + gap
    const children = Array.from(avatarGrid.children);

    children.forEach(child => {
      const clone = child.cloneNode(true);
      clone.classList.add('clone');
      avatarGrid.appendChild(clone);
    });

    children.reverse().forEach(child => {
      const clone = child.cloneNode(true);
      clone.classList.add('clone');
      avatarGrid.insertBefore(clone, avatarGrid.firstChild);
    });

    const startPos = children.length * cardWidth;
    avatarGrid.scrollLeft = startPos;

    avatarGrid.addEventListener('scroll', () => {
      if (avatarGrid.scrollLeft < 50 || avatarGrid.scrollLeft > (avatarGrid.scrollWidth / 3) * 2) {
        const singleSetWidth = children.length * cardWidth;
        if (avatarGrid.scrollLeft < 50) {
          avatarGrid.style.scrollBehavior = 'auto';
          avatarGrid.scrollLeft += singleSetWidth;
          setTimeout(() => avatarGrid.style.scrollBehavior = 'smooth', 50);
        } else if (avatarGrid.scrollLeft > (avatarGrid.scrollWidth - avatarGrid.clientWidth - 50)) {
          avatarGrid.style.scrollBehavior = 'auto';
          avatarGrid.scrollLeft -= singleSetWidth;
          setTimeout(() => avatarGrid.style.scrollBehavior = 'smooth', 50);
        }
      }
    });

    avatarPrev.addEventListener('click', () => avatarGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' }));
    avatarNext.addEventListener('click', () => avatarGrid.scrollBy({ left: cardWidth, behavior: 'smooth' }));
  }

  // Deals Carousel Logic
  const dealsCarousel = document.getElementById('deals-carousel');
  const dealsPrev = document.getElementById('deals-prev');
  const dealsNext = document.getElementById('deals-next');

  if (dealsCarousel && dealsPrev && dealsNext) {
    dealsPrev.addEventListener('click', () => dealsCarousel.scrollBy({ left: -320, behavior: 'smooth' }));
    dealsNext.addEventListener('click', () => dealsCarousel.scrollBy({ left: 320, behavior: 'smooth' }));
  }
}
