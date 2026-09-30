// ===== LANDING PAGE (HOME) =====
import { events } from '../data/events.js';
import { collaborators } from '../data/collaborators.js';
import { OutlineWord, StatsTable, ReticleFrame, SectionOverline, BorderGrid } from '../components.js';

export function renderHome() {
  const featuredEvent = events.find(e => e.featured) || events[0];
  const upcomingEvents = events.filter(e => !e.featured).slice(0, 3);

  return `
    <!-- HERO -->
    <section class="hero-v2 section" id="hero">
      <div class="container hero-container">
        
        <div class="hero-v2__tagrow">
          <div class="hero-v2__location">SYS // MANIT.AC.IN</div>
          <div class="hero-v2__clock" id="hero-clock">00:00:00 IST</div>
        </div>
        
        <!-- Main Title -->
        <div class="hero-v2__title">
          <span class="hero-v2__line1 scramble-text">CYBERSECURITY</span>
          <span class="hero-v2__line2">OWASP CONSORTIUM</span>
        </div>
        
        <div class="hero-v2__rule"></div>
        
        <div class="hero-v2__desc-row">
          <p class="hero-v2__desc">
            MANIT Bhopal's official cybersecurity community. We learn, build, and secure systems through hands-on practice, open-source projects, and CTFs.
          </p>
          <div class="hero-v2__ctas">
            <a href="#/events" class="btn btn--solid magnetic-btn">EXPLORE EVENTS →</a>
            <a href="#/about" class="btn btn--outline magnetic-btn">JOIN US</a>
          </div>
        </div>
        
        <!-- The 3D background handles the visual aesthetic now -->

        <!-- Stats Strip -->
        <div class="hero-v2__stats">
          <div class="hero-v2__stat">
            <div class="hero-v2__stat-val">
              <span class="hero-v2__stat-num" data-target="200">0</span>
              <span class="hero-v2__stat-suffix">+</span>
            </div>
            <span class="hero-v2__stat-label">MEMBERS</span>
          </div>
          <div class="hero-v2__stat">
            <div class="hero-v2__stat-val">
              <span class="hero-v2__stat-num" data-target="15">0</span>
              <span class="hero-v2__stat-suffix">+</span>
            </div>
            <span class="hero-v2__stat-label">EVENTS</span>
          </div>
          <div class="hero-v2__stat">
            <div class="hero-v2__stat-val">
              <span class="hero-v2__stat-num" data-target="5">0</span>
              <span class="hero-v2__stat-suffix">+</span>
            </div>
            <span class="hero-v2__stat-label">CTF COMPS</span>
          </div>
          <div class="hero-v2__scroll-indicator">
            <div class="hero-v2__scroll-circle">SCROLL</div>
          </div>
        </div>
        
      </div>
    </section>

    <!-- ABOUT -->
    <section class="about section" id="about-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">about_us.exe</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:#ffffff;">● RUNNING</span>
          </div>
          <div class="about__inner">
            <div class="about__image-wrap reveal-left">
              ${ReticleFrame(`
                <img
                  class="about__image"
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"
                  alt="MANIT Bhopal Campus"
                  loading="lazy"
                  style="filter: grayscale(1) brightness(0.8); transition: filter 0.3s;"
                  onmouseover="this.style.filter='grayscale(0) brightness(1.1)'"
                  onmouseout="this.style.filter='grayscale(1) brightness(0.8)'"
                />
              `)}
              <span class="about__image-label">SYS // MANIT.BHOPAL.IN</span>
            </div>
            <div class="about__text">
              ${SectionOverline('01', 'ABOUT CYBERSECURITY OWASP CONSORTIUM', 'reveal-up')}
              <h2 class="section-title reveal-up">MORE THAN A ${OutlineWord('CLUB.')}</h2>
              <p class="about__desc reveal-up">
                A community built around cybersecurity. Cybersecurity OWASP Consortium at MANIT Bhopal focuses on
                cybersecurity education, practical security research, workshops, open-source
                projects and community building.
              </p>
              <div class="about__chips reveal-up" style="margin-bottom: 2rem;">
                ${StatsTable([
                  { value: '200+', label: 'MEMBERS' },
                  { value: '15+', label: 'EVENTS' },
                  { value: '5+', label: 'YEARS' }
                ])}
              </div>
              <a href="#/about" class="btn btn--outline reveal-up">LEARN MORE →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY WE EXIST -->
    <section class="why-section section" id="why-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">purpose.sh</span>
          </div>
          <div>
            <div class="why-section__header" style="padding: 2rem 2rem 0; margin-bottom: 0;">
              ${SectionOverline('02', 'OUR PURPOSE', 'reveal-up')}
              <h2 class="section-title reveal-up" style="margin-bottom: 1rem;">WHY WE ${OutlineWord('EXIST')}</h2>
            </div>
            <div class="why-section__grid" style="padding-top: 1rem;">
              <div class="why-card">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_01</span>
                </div>
                <h3 class="why-card__title">LEARN</h3>
                <p class="why-card__desc">Understand security beyond theory. Hands-on workshops, CTFs, and real-world vulnerability research.</p>
              </div>
              <div class="why-card">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_02</span>
                </div>
                <h3 class="why-card__title">BUILD</h3>
                <p class="why-card__desc">Create tools that solve real problems. Open-source security projects, scripts, and automation.</p>
              </div>
              <div class="why-card">
                <div class="why-card__header">
                  <span class="why-card__num">PROC_03</span>
                </div>
                <h3 class="why-card__title">DEFEND</h3>
                <p class="why-card__desc">Develop the mindset to secure what we build. Think like an attacker, defend like a professional.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EVENTS -->
    <section class="events-section section" id="events-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">events_log.txt</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:var(--color-text-dim);">[ ${events.length} records ]</span>
          </div>
          <div style="padding: 2rem;">
            <div class="events-section__header">
              <div class="events-section__header-text">
                ${SectionOverline('03', 'UPCOMING EVENTS', 'reveal-up')}
                <h2 class="section-title reveal-up">EVENTS &amp; ${OutlineWord('EXPERIENCES')}</h2>
                <p class="section-desc reveal-up">Explore workshops, CTFs, technical sessions, hackathons and more.</p>
              </div>
              <a href="#/events" class="btn btn--outline reveal-up">VIEW ALL EVENTS →</a>
            </div>

            <!-- Featured Event -->
            <div class="events__featured reveal-up">
              <div class="event-featured" data-event-id="${featuredEvent.id}">
                ${ReticleFrame(`
                  <img
                    class="event-featured__image"
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80"
                    alt="${featuredEvent.title}"
                    loading="lazy"
                    style="filter: grayscale(1) brightness(0.8);"
                  />
                `)}
                <div class="event-featured__overlay" style="background: rgba(0,0,0,0.6); border: 1px solid var(--color-border); padding: 2rem;">
                  <div class="event-featured__top-row">
                    <span class="event-featured__tag" style="border: 1px solid var(--color-border); padding: 0.25rem 0.5rem;">${featuredEvent.category}</span>
                    <span class="event-featured__badge" style="font-family: var(--font-mono);">[ FEATURED ]</span>
                  </div>
                  <span class="event-featured__date" style="font-family: var(--font-mono); letter-spacing: 0.1em;">${featuredEvent.day} ${featuredEvent.month} ${featuredEvent.year}</span>
                  <h3 class="event-featured__title" style="font-family: var(--font-display); font-size: 2.5rem; text-transform: uppercase;">${featuredEvent.title}</h3>
                  <p class="event-featured__desc">${featuredEvent.description}</p>
                  <div class="event-featured__meta" style="font-family: var(--font-mono); color: var(--color-text-dim);">
                    <span>LOC // ${featuredEvent.location}</span>
                    ${featuredEvent.speakers && featuredEvent.speakers.length > 0 && featuredEvent.speakers[0] && featuredEvent.speakers[0] !== 'undefined' ? `<span>SPK // ${featuredEvent.speakers[0]}</span>` : ''}
                  </div>
                  <div style="margin-top: 1.5rem;">
                    <span class="btn btn--outline" data-event-id="${featuredEvent.id}">KNOW MORE →</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Other Events Grid — animated cards -->
            <div class="events__grid scroll-track" style="margin-top: 2rem;">
              ${BorderGrid(upcomingEvents.map((event, i) => ({
                html: `
                  <div class="event-card__log-header" style="margin-bottom:1rem; border:none; padding:0; display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">
                    <span class="event-card__log-idx">[${String(i + 1).padStart(2, '0')}]</span>
                    <span class="event-card__tag" style="border:1px solid var(--color-border); padding:0.15rem 0.4rem;">${event.category}</span>
                    <span class="event-card__status">● UPCOMING</span>
                  </div>
                  <h4 class="event-card__title" style="margin-bottom:0.5rem; font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase;">${event.title}</h4>
                  <p class="event-card__desc" style="color:var(--color-text-secondary); margin-bottom:2rem; font-size:0.9rem;">${event.description}</p>
                  <div class="event-card__footer" style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); border-top:1px solid var(--color-border); padding-top:1rem;">
                    <span>LOC // ${event.location}</span>
                    <span class="event-card__cta" style="cursor:pointer; color:var(--color-white);" data-event-id="${event.id}">DETAILS →</span>
                  </div>
                `
              })))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COLLABORATIONS -->
    <section class="collabs section" id="collabs-section">
      <div class="container">
        <div class="os-window reveal-up">
          <div class="os-window__header">
            <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
            <span class="os-window__title">network.bat</span>
            <span style="margin-left:auto;font-family:var(--font-mono);font-size:9px;color:#ffffff;">● CONNECTED</span>
          </div>
          <div style="padding: 2rem;">
            <div class="collabs__header">
              ${SectionOverline('04', 'CONNECTED BY SECURITY', 'reveal-up')}
              <h2 class="section-title reveal-up">${OutlineWord('COLLABORATIONS')}</h2>
              <p class="section-desc reveal-up" style="margin:0 auto;">Working together for a stronger cybersecurity ecosystem.</p>
            </div>

            <!-- Network topology hub -->
            <div class="collabs__hub reveal-up">
              <div class="collabs__hub-center">
                <div class="collabs__hub-ring"></div>
                <div class="collabs__hub-ring collabs__hub-ring--2"></div>
                <span class="collabs__hub-label">OWASP<br/>MANIT</span>
              </div>
              <div class="collabs__nodes scroll-track">
                ${collaborators.map((c, i) => `
                  <a href="${c.url}" class="collab-node reveal-scale" style="--i:${i}">
                    <div class="collab-node__logo">
                      <img src="${c.logo}" alt="${c.abbr}" />
                    </div>
                    <span class="collab-node__name">${c.name}</span>
                    <span class="collab-node__status">NODE_${String(i + 1).padStart(2, '0')}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    ${renderFooter()}
  `;
}

export function renderFooter() {
  return `
    <!-- Marquee band above footer -->
    <div class="marquee-strip marquee-strip--footer">
      <div class="marquee-strip__track" id="marquee-track">
        <div class="marquee-strip__inner">
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
        </div>
        <div class="marquee-strip__inner" aria-hidden="true">
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">LEARN</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--outline">BUILD</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
          <span class="marquee-strip__item marquee-strip__item--solid">SECURE</span>
          <span class="marquee-strip__item marquee-strip__item--outline">&bull;</span>
        </div>
      </div>
    </div>
    <footer class="footer">
      <!-- Giant outline OWASP behind footer -->
      <div class="footer__bg-text" aria-hidden="true">OWASP</div>
      <div class="container">
        <div class="footer__inner">
          <!-- Brand block -->
          <div class="footer__brand">
            <div class="footer__logo-row">
              <img class="footer__logo" src="/src/assets/logo.png" alt="OWASP Logo" style="filter: grayscale(1) brightness(1.2);" />
              <div>
                <span class="footer__brand-name">CYBERSECURITY OWASP CONSORTIUM</span>
                <span class="footer__brand-sub">MANIT BHOPAL</span>
              </div>
            </div>
            <p class="footer__tagline">Learn. Build. Secure.</p>
          </div>
          <!-- Quick Links -->
          <div>
            <h4 class="footer__col-title">Quick Links</h4>
            <div class="footer__links">
              <a href="#/" class="footer__link">Home</a>
              <a href="#/about" class="footer__link">About Us</a>
              <a href="#/events" class="footer__link">Events</a>
              <a href="#/sponsors" class="footer__link">Sponsors</a>
            </div>
          </div>
          <!-- More -->
          <div>
            <h4 class="footer__col-title">More</h4>
            <div class="footer__links">
              <a href="#/team" class="footer__link">Team</a>
              <a href="#/gallery" class="footer__link">Gallery</a>
              <a href="#/contact" class="footer__link">Contact Us</a>
            </div>
          </div>
          <!-- Contact + Social -->
          <div>
            <h4 class="footer__col-title">Contact</h4>
            <div class="footer__links" style="margin-bottom:1.5rem;">
              <a href="mailto:owasp.chap.manit@gmail.com" class="footer__link">owasp.chap.manit@gmail.com</a>
              <span class="footer__link" style="cursor:default;">MANIT Bhopal, Madhya Pradesh</span>
            </div>
            <h4 class="footer__col-title">Follow Us</h4>
            <div class="footer__social">
              <a href="https://instagram.com/owasp_nitb" target="_blank" rel="noopener" class="footer__social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg>
              </a>
              <a href="https://linkedin.com/company/owaspnitb" target="_blank" rel="noopener" class="footer__social-icon" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://github.com/owasp-manit" target="_blank" rel="noopener" class="footer__social-icon" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
              </a>
              <a href="https://youtube.com/@owasp_manit" target="_blank" rel="noopener" class="footer__social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer__bottom">
          <span class="footer__copyright">&copy; ${new Date().getFullYear()} Cybersecurity OWASP Consortium, MANIT Bhopal. All rights reserved.</span>
          <span class="footer__status">
            <span class="footer__status-dot"></span>
            ALL SYSTEMS OPERATIONAL
          </span>
          <span class="footer__clock" id="footer-clock"></span>
          <a href="#" class="footer__top-btn" onclick="window.scrollTo({top:0,behavior:'smooth'}); return false;">BACK TO TOP &uarr;</a>
        </div>
      </div>
    </footer>
  `;
}
