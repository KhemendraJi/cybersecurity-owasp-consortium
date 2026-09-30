// ===== SPA ROUTER =====
import { gsap } from 'gsap';

export class Router {
  constructor(onRoute) {
    this.onRoute = onRoute;
    this.currentRoute = null;
    this.routes = {
      '/': 'home',
      '/about': 'about',
      '/events': 'events',
      '/gallery': 'gallery',
      '/sponsors': 'sponsors',
      '/team': 'team',
      '/contact': 'contact',
    };

    window.addEventListener('hashchange', () => this.handleRoute());
    // Handle link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (link) {
        const href = link.getAttribute('href');
        if (href.startsWith('#/') || href === '#/') {
          e.preventDefault();
          window.location.hash = href.slice(1);
        }
      }
    });
  }

  getRoute() {
    const hash = window.location.hash.slice(1) || '/';
    return hash;
  }

  getRouteName() {
    return this.routes[this.getRoute()] || 'home';
  }

  async handleRoute() {
    const route = this.getRoute();
    if (route === this.currentRoute) return;

    const previousRoute = this.currentRoute;
    this.currentRoute = route;
    const routeName = this.routes[route] || 'home';

    // Update navbar active state
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.toggle('active', link.dataset.nav === routeName);
    });

    // Toggle giant background text
    const giantBgText = document.getElementById('giant-bg-text');
    if (giantBgText) {
      if (routeName === 'home') giantBgText.classList.remove('show');
      else giantBgText.classList.add('show');
    }

    // Close mobile nav if open
    const mobileNav = document.getElementById('mobile-nav');
    const hamburger = document.querySelector('.navbar__hamburger');
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger?.classList.remove('open');
    }

    if (previousRoute !== null) {
      await this.transition(routeName);
    } else {
      this.onRoute(routeName);
    }
  }

  async transition(routeName) {
    const container = document.getElementById('page-container');
    const preloader = document.getElementById('preloader');
    const shutterTop = document.querySelector('.pl-top');
    const shutterBottom = document.querySelector('.pl-bottom');

    if (preloader) {
      preloader.style.display = 'block';
      preloader.style.pointerEvents = 'auto';
      // Hide preloader content except shutters
      const canvas = document.getElementById('pl-canvas');
      const hud = document.querySelector('.pl-hud');
      if (canvas) canvas.style.opacity = '0';
      if (hud) hud.style.opacity = '0';

      // Close shutters
      shutterTop.style.transition = 'none';
      shutterBottom.style.transition = 'none';
      await gsap.to([shutterTop, shutterBottom], {
        y: '0%',
        duration: 0.3,
        ease: 'power2.in'
      });
    }

    // Swap content
    this.onRoute(routeName);

    // Scroll to top
    window.scrollTo(0, 0);
    if (window.lenis) window.lenis.scrollTo(0, { immediate: true });

    // Set page container to normal
    gsap.set(container, { opacity: 1, y: 0 });

    if (preloader) {
      // Open shutters
      gsap.to(shutterTop, {
        y: '-101%',
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1
      });
      gsap.to(shutterBottom, {
        y: '101%',
        duration: 0.4,
        ease: 'power3.out',
        delay: 0.1,
        onComplete: () => {
          preloader.style.display = 'none';
          preloader.style.pointerEvents = 'none';
        }
      });
    }
  }

  init() {
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.handleRoute();
  }
}
