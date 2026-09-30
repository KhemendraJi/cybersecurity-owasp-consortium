// ===== MAIN ENTRY — OWASP CONSORTIUM MANIT BHOPAL =====
import './styles/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Router } from './router.js';
import { renderHome } from './pages/Home.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderEventsPage } from './pages/EventsPage.js';
import { renderGalleryPage } from './pages/GalleryPage.js';
import { renderSponsorsPage } from './pages/SponsorsPage.js';
import { renderTeamPage } from './pages/TeamPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { events } from './data/events.js';
import { initGraphics } from './graphics.js';

gsap.registerPlugin(ScrollTrigger);

// ── State ──
let secureScene = null;
let lenis = null;



// ============================================================
// SMOOTH SCROLLING (LENIS)
// ============================================================
function initLenis() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  window.lenis = lenis;

  lenis.on('scroll', (e) => {
    ScrollTrigger.update();
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// ============================================================
// BACKGROUNDS & 3D
// ============================================================
function initBackground() {
  // Start matrix rain
  // initMatrixBackground(); // Disabled in favor of tech-grid-bg
}

// ============================================================
// CUSTOM CURSOR REMOVED
// ============================================================

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav__close');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 50);
  });

  // Hamburger
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);

      if (isOpen) {
        const links = mobileNav.querySelectorAll('.mobile-nav__link');
        gsap.fromTo(links,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
        );
      }
    });

    // Close on link click or close button
    const closeNav = () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
    };
    
    mobileNavClose?.addEventListener('click', closeNav);
    
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }
}

// ============================================================
// HERO V2 ANIMATIONS
// ============================================================
function initHeroV2() {
  // IST Clock
  const clockEl = document.getElementById('hero-clock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
      }).format(now);
      clockEl.textContent = ist + ' IST';
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // Hero entrance: staggered fade-up (opacity starts at 0 in CSS)
  gsap.to('.hero-v2__tagrow', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.05 });
  gsap.to('.hero-v2__title',  { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.18 });
  gsap.to('.hero-v2__rule',   { opacity: 1,        duration: 0.5, ease: 'none',       delay: 0.28 });
  gsap.to('.hero-v2__desc-row',{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.36 });
  gsap.to('.hero-v2__stage',  { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.50 });
  gsap.to('.hero-v2__stats',  { opacity: 1,        duration: 0.6, ease: 'power2.out', delay: 0.65 });

  // Magnetic buttons
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.28;
      const dy = (e.clientY - cy) * 0.28;
      gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
    });
  });

  // Count-up stats on scroll
  const statNums = document.querySelectorAll('.hero-v2__stat-num[data-target]');
  if (statNums.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let current = 0;
          const step = target / 40;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = Math.floor(current);
            if (current >= target) clearInterval(timer);
          }, 30);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => observer.observe(el));
  }

  // Marquee speed reacts to scroll
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack && window.lenis) {
    window.lenis.on('scroll', (e) => {
      const speed = 22 - Math.abs(e.velocity) * 2;
      const clamped = Math.max(6, Math.min(30, speed));
      marqueeTrack.style.animationDuration = clamped + 's';
    });
  }
}

// ============================================================
// SCROLL ANIMATIONS (GSAP SCROLLTRIGGER)
// ============================================================
function initScrollAnimations() {
  // Kill existing triggers
  ScrollTrigger.getAll().forEach(t => t.kill());

  // Hero Parallax
  if (document.querySelector('.hero__3d-container')) {
    gsap.to('.hero__3d-container', {
      scale: 0.7,
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Hide social bar when footer is in view
  if (document.querySelector('.footer')) {
    ScrollTrigger.create({
      trigger: '.footer',
      start: 'top 90%',
      onEnter: () => document.getElementById('social-bar')?.classList.add('social-bar--hidden'),
      onLeaveBack: () => document.getElementById('social-bar')?.classList.remove('social-bar--hidden')
    });
  }

  // Reveal animations
  gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 40 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  gsap.utils.toArray('.reveal-scale').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

}

// ============================================================
// EVENT MODAL
// ============================================================
function initEventModal() {
  const modal = document.getElementById('event-modal');
  const backdrop = modal.querySelector('.event-modal__backdrop');
  const content = modal.querySelector('.event-modal__content');

  function openModal(eventId) {
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) return;

    content.innerHTML = `
      <button class="event-modal__close" aria-label="Close">✕</button>
      <img class="event-modal__image" src="${event.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'}" alt="${event.title}" />
      <div class="event-modal__body">
        <span class="event-modal__tag">${event.category}</span>
        <h2 class="event-modal__title">${event.title}</h2>
        <div class="event-modal__meta">
          <div class="event-modal__meta-item">📅 <span>${event.day} ${event.month} ${event.year}</span></div>
          <div class="event-modal__meta-item">📍 <span>${event.location}</span></div>
          ${event.venue ? `<div class="event-modal__meta-item">🏛 <span>${event.venue}</span></div>` : ''}
        </div>
        <div class="event-modal__divider"></div>
        <h3 class="event-modal__desc-title">About the Event</h3>
        <p class="event-modal__desc">${event.fullDescription || event.description}</p>
        ${event.speakers && event.speakers.length > 0 ? `
          <h3 class="event-modal__desc-title">Speakers</h3>
          <p class="event-modal__desc">${event.speakers.join(', ')}</p>
        ` : ''}
        <div class="event-modal__cta-row">
          <a href="${event.registrationLink || '#'}" class="btn btn--primary">Register <span class="btn-arrow">→</span></a>
          <button class="btn event-modal__close-btn">Close</button>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(content,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Close handlers
    const closeBtn = content.querySelector('.event-modal__close');
    const closeBtnAlt = content.querySelector('.event-modal__close-btn');
    const closeModal = () => {
      gsap.to(content, {
        opacity: 0, scale: 0.95, y: 20,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    };

    closeBtn?.addEventListener('click', closeModal);
    closeBtnAlt?.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
  }

  // Delegate click for event cards
  document.addEventListener('click', (e) => {
    const eventTrigger = e.target.closest('[data-event-id]');
    if (eventTrigger) {
      openModal(eventTrigger.dataset.eventId);
    }
  });

  // ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// ============================================================
// CTF FILTER
// ============================================================
function initCTFFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-ctf-filter]');
    if (!tab) return;

    const filter = tab.dataset.ctfFilter;
    const grid = document.getElementById('ctf-challenges-grid');
    if (!grid) return;

    // Update active tab
    tab.closest('.ctf-categories__tabs')?.querySelectorAll('.ctf-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter cards
    grid.querySelectorAll('.challenge-card').forEach(card => {
      const cat = card.dataset.ctfCategory;
      card.style.display = (filter === 'All' || cat === filter) ? '' : 'none';
    });
  });
}

// ============================================================
// EVENTS PAGE FILTER
// ============================================================
function initEventsFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-event-filter]');
    if (!tab) return;

    const filter = tab.dataset.eventFilter;

    // Update active tab
    tab.closest('.events-filter__body')?.querySelectorAll('.filter-pill').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter cards in all grids
    document.querySelectorAll('.event-card[data-category]').forEach(card => {
      const cat = card.dataset.category;
      const matches = filter === 'All' || cat.toUpperCase() === filter.toUpperCase();
      card.style.display = matches ? '' : 'none';
    });

    // Hide section blocks if all their cards are hidden
    document.querySelectorAll('.events-section-block').forEach(block => {
      const grid = block.querySelector('.events-page__grid');
      if (!grid) return;
      const visible = Array.from(grid.querySelectorAll('.event-card')).some(c => c.style.display !== 'none');
      block.style.display = visible ? '' : 'none';
    });
  });
}

// ============================================================
// GALLERY FILTER
// ============================================================
function initGalleryFilter() {
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-gallery-filter]');
    if (!tab) return;

    const filter = tab.dataset.galleryFilter;

    // Update active tab
    tab.closest('.gallery-filters__pills')?.querySelectorAll('.filter-pill').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Filter frames
    document.querySelectorAll('.gallery-frame').forEach(frame => {
      const cat = frame.dataset.category;
      const matches = filter === 'All' || cat.toUpperCase() === filter.toUpperCase();
      frame.style.display = matches ? '' : 'none';
    });
  });
}

// ============================================================
// ROUTER — PAGE RENDERING
// ============================================================
function renderPage(routeName) {
  const container = document.getElementById('page-container');

  const pages = {
    home: renderHome,
    about: renderAboutPage,
    events: renderEventsPage,
    gallery: renderGalleryPage,
    sponsors: renderSponsorsPage,
    team: renderTeamPage,
    contact: renderContactPage,
  };

  const renderFn = pages[routeName] || pages.home;
  container.innerHTML = renderFn();

  if (routeName === 'home') {
    if (window.__preloaderDone) {
      requestAnimationFrame(() => {
        initHeroV2();
      });
    }
  } else {
    if (!window.__appReady) {
      window.__appReady = true;
      window.dispatchEvent(new Event('app:ready'));
    }
  }

  // Re-initialize scroll animations after content change (only if preloader done)
  if (window.__preloaderDone) {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      initScrollAnimations();
    });
  }
}

// ============================================================
// INIT
// ============================================================
async function init() {
  // Initialize router (renders initial page, dispatches app:ready)
  const router = new Router(renderPage);
  router.init();

  if (!window.__preloaderDone) {
    await new Promise(r => addEventListener('preloader:done', r, { once: true }));
  }

  // Initialize systems after preloader
  initLenis();
  initBackground();
  initNavbar();
  initEventModal();
  initEventsFilter();
  initGalleryFilter();

  // Initialize Team interactions
  document.addEventListener('mouseover', (e) => {
    const card = e.target.closest('.team-member-card');
    const hud = document.getElementById('team-stats-hud');
    if (card && hud) {
      document.getElementById('hud-name').innerText = card.dataset.memberName;
      document.getElementById('hud-role').innerText = card.dataset.memberRole;
      document.getElementById('hud-level').innerText = card.dataset.memberLevel;
      document.getElementById('hud-nodes').innerText = card.dataset.memberNodes;
      hud.classList.add('visible');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const card = e.target.closest('.team-member-card');
    const hud = document.getElementById('team-stats-hud');
    if (card && hud) {
      hud.classList.remove('visible');
    }
  });

  // Hacking decrypt on Event click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-event-id]');
    if (!btn) return;
    const title = document.querySelector('.event-modal__title');
    if (title) {
      const original = title.innerText;
      const chars = '!<>-_\\\\/[]{}—=+*^?#_0123456789X@$';
      let frame = 0;
      const totalFrames = 20;
      const update = () => {
        let result = '';
        for (let i = 0; i < original.length; i++) {
          if (frame > (totalFrames * (i / original.length))) {
            result += original[i];
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        title.innerText = result;
        if (frame < totalFrames) {
          frame++;
          setTimeout(() => requestAnimationFrame(update), 30);
        } else {
          title.innerText = original;
        }
      };
      update();
    }
  });

  // Gallery cylinder rotation
  if (window.lenis) {
    window.lenis.on('scroll', (e) => {
      const cylinder = document.getElementById('gallery-cylinder');
      if (cylinder) {
        const angle = (e.animatedScroll / 2000) * 360;
        cylinder.style.transform = `rotateY(${angle}deg)`;
      }
    });
  }

  // Initial scroll animation setup
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    initScrollAnimations();
    const currentHash = window.location.hash || '#/';
    if (currentHash === '#/') {
      initHeroV2();
    }
  });

  // Footer clock
  const updateFooterClock = () => {
    const el = document.getElementById('footer-clock');
    if (!el) return;
    const now = new Date();
    const ist = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).format(now);
    el.textContent = ist + ' IST';
  };
  setInterval(updateFooterClock, 1000);
  updateFooterClock();

  // Glass specular highlight on mouse move
  document.addEventListener('mousemove', (e) => {
    document.querySelectorAll('.glass-specular').forEach(el => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mouse-x', x + '%');
      el.style.setProperty('--mouse-y', y + '%');
    });
  });

  // Initialize new 3D graphics & cursor
  initGraphics();
}

// Start
init();
