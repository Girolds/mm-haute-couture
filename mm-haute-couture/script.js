/* ==========================================================================
   MM HAUTE COUTURE — INTERACTIVE VANILLA JAVASCRIPT
   Author: Senior Front-End & Luxury UI/UX Specialist
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ------------------------------------------------------------------------
     1. STICKY HEADER BACKGROUND ON SCROLL
     ------------------------------------------------------------------------ */
  const header = document.querySelector('.header');

  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ------------------------------------------------------------------------
     2. MOBILE MENU DRAWER TOGGLE
     ------------------------------------------------------------------------ */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    const toggleMenu = () => {
      const isExpanded = mobileToggle.classList.contains('active');
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when clicking any navigation link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)) {
        toggleMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR ACTIVE NAV LINKS
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // Apenas remove ou adiciona a classe se o link for uma âncora interna (começa com #)
            if (href && href.startsWith('#')) {
              link.classList.remove('active');
              if (href === `#${id}`) {
                link.classList.add('active');
              }
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  /* ------------------------------------------------------------------------
     4. INTERACTIVE BOOKING FORM & VALIDATION
     ------------------------------------------------------------------------ */
  const bookingForm = document.getElementById('booking-form');
  const feedbackModal = document.getElementById('feedback-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalClientName = document.getElementById('modal-client-name');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve field values
      const name = document.getElementById('full-name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const phone = document.getElementById('phone')?.value.trim();
      const service = document.getElementById('service-type')?.value;

      // Validation
      if (!name || !email || !phone || !service) {
        alert('Please complete all required fields so we can curate your private consultation.');
        return;
      }

      // Email format check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // Populate success modal
      if (modalClientName) {
        modalClientName.textContent = name;
      }

      // Display feedback modal
      if (feedbackModal) {
        feedbackModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }

      // Reset form
      bookingForm.reset();
    });
  }

  // Close Modal Event Listener
  if (closeModalBtn && feedbackModal) {
    closeModalBtn.addEventListener('click', () => {
      feedbackModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    feedbackModal.addEventListener('click', (e) => {
      if (e.target === feedbackModal) {
        feedbackModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. SMOOTH SCROLL FOR ALL INTERNAL ANCHOR LINKS
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     6. FADE-IN SCROLL REVEAL ANIMATIONS (TOP LEVEL)
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

/* --------------------------------------------------------------------------
   7. INSTAGRAM GALLERY LIKE INTERACTION
   -------------------------------------------------------------------------- */
const instaCards = document.querySelectorAll('.instagram-card');

instaCards.forEach(card => {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    this.classList.toggle('is-liked');
  });
});
/* =========================================
   8. HERO CAROUSEL AUTO-SLIDE
   ========================================= */
const carouselImages = document.querySelectorAll('#hero-carousel .carousel-img');
let currentImgIndex = 0;

if (carouselImages.length > 0) {
  setInterval(() => {
    carouselImages[currentImgIndex].classList.remove('active');
    
    currentImgIndex = (currentImgIndex + 1) % carouselImages.length;
    
    carouselImages[currentImgIndex].classList.add('active');
    
  }, 4000);
}
});

/* ------------------------------------------------------------------------
     9. GALERIA EXPANDÍVEL & CARROSSEL PREVIEW (SISTEMA DE TOGGLE FLUIDO)
     ------------------------------------------------------------------------ */
  const expandBtn = document.getElementById('btn-expand-gallery');
  const collapseBtn = document.getElementById('btn-collapse-gallery');
  const expandableGallery = document.getElementById('gallery-more');
  const carouselPreview = document.getElementById('gallery-preview-carousel');

  // ABRIR GALERIA DETALHADA
  if (expandBtn && expandableGallery) {
    expandBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Oculta o carrossel inicial
      if (carouselPreview) {
        carouselPreview.classList.add('is-hidden');
      }

      // 2. Revela a grelha Bento com animação leve
      expandableGallery.classList.add('is-expanded');
      expandBtn.style.display = 'none';

      // 3. Força a ativação do scroll reveal nas fotos internas
      requestAnimationFrame(() => {
        const hiddenReveals = expandableGallery.querySelectorAll('.reveal-on-scroll');
        hiddenReveals.forEach(el => el.classList.add('reveal-active'));
      });
    });
  }
// FECHAR GALERIA DETALHADA (BOTAO RECOLHER INSTANTÂNEO)
  if (collapseBtn && expandableGallery) {
    collapseBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Rola imediatamente a tela para o início da galeria para evitar atrasos na animação de scroll longo
      const galleryWrapper = document.querySelector('.sticky-gallery-wrapper');
      if (galleryWrapper) {
        const headerOffset = 90;
        const elementPosition = galleryWrapper.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'instant' // Mudado para 'instant' para não congelar enquanto rola a galeria longa
        });
      }

      // 2. Oculta a grelha Bento e reapresenta o carrossel imediatamente após o ajuste do scroll
      requestAnimationFrame(() => {
        expandableGallery.classList.remove('is-expanded');

        if (carouselPreview) {
          carouselPreview.classList.remove('is-hidden');
        }
        if (expandBtn) {
          expandBtn.style.display = 'inline-block';
        }
      });
    });
  }

  // ABRIR GALERIA DETALHADA
  if (expandBtn && expandableGallery) {
    expandBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Pré-carrega todas as imagens da galeria de forma forçada na memória
      const galleryImages = expandableGallery.querySelectorAll('img');
      galleryImages.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        // Força o navegador a carregar a imagem na memória imediatamente
        const tempImg = new Image();
        tempImg.src = img.src;
      });

      // 2. Oculta o carrossel inicial
      if (carouselPreview) {
        carouselPreview.classList.add('is-hidden');
      }

      // 3. Revela a grelha Bento
      expandableGallery.classList.add('is-expanded');
      expandBtn.style.display = 'none';

      // 4. Ativa o aparecimento fluido das fotos
      requestAnimationFrame(() => {
        const hiddenReveals = expandableGallery.querySelectorAll('.reveal-on-scroll');
        hiddenReveals.forEach(el => el.classList.add('reveal-active'));
      });
    });
  }