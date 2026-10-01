// ===== LANDING PAGE (HOME) =====
import { events } from '../data/events.js';
import { collaborators } from '../data/collaborators.js';
import { OutlineWord, StatsTable, ReticleFrame, SectionOverline, BorderGrid } from '../components.js';

export function initMatrixHero() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let w, h;
  const setSize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = document.getElementById('hero').offsetHeight;
  };
  setSize();
  window.addEventListener('resize', setSize);

  const cols = Math.floor(w / 14) + 1;
  const ypos = Array(cols).fill(0);
  let animationId;

  function render() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'; 
    ctx.font = '12px monospace';
    
    ypos.forEach((y, ind) => {
      const text = Math.random() > 0.5 ? Math.floor(Math.random() * 2).toString() : String.fromCharCode(Math.random() * 6 + 65);
      const x = ind * 14;
      ctx.fillText(text, x, y);
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
      else ypos[ind] = y + 14;
    });
    
    animationId = requestAnimationFrame(render);
  }
  render();
}

export function renderHome() {
  // Normalize event data source - sort by date and pick next upcoming
  const now = new Date();
  // Simple check assuming date is YYYY-MM-DD
  const futureEvents = [...events].filter(e => new Date(e.date) >= now).sort((a,b) => new Date(a.date) - new Date(b.date));
  const featuredEvent = futureEvents[0] || events[0];
  const upcomingEvents = futureEvents.length > 1 ? futureEvents.slice(1, 4) : events.slice(1, 4);


  return `
    <!-- HERO -->
    <section class="hero-v2 section" id="hero" style="position:relative; overflow:hidden; min-height:100vh;">
      <div class="container hero-container" style="position:relative; z-index:1; perspective: 1000px; display:flex; flex-direction:column; justify-content:space-between; padding-top: 2rem; padding-bottom: 2rem; min-height: 100vh;">
        
        <!-- Top Row -->
        <div class="hero-v2__tagrow" style="display:flex; justify-content:space-between; width:100%; font-family:var(--font-mono); font-size:0.65rem; color:var(--color-text-dim); letter-spacing:0.18em; text-transform:uppercase;">
          <div class="hero-v2__location"><span style="color:#ff1a1a; animation:blink 1.4s infinite;">●</span> SECURE CONNECTION // MANIT.AC.IN</div>
          <div class="hero-v2__clock" id="hero-clock">00:00:00 IST</div>
        </div>

        <!-- Center -->
        <div class="hero-v2__center hero-tilt" style="text-align: center; margin: auto 0; position: relative;">
          <h1 class="hero-v2__title glitch-container" style="margin:0;">
            <span class="hero-v2__line1 scramble-text" style="display:block; font-family:'Outfit', 'Arial Black', sans-serif; font-weight:900; font-size:clamp(3rem,8vw,7rem); -webkit-text-stroke: 1.5px #fff; color:transparent; line-height:1; letter-spacing:-0.03em;">CYBERSECURITY</span>
            <span class="hero-v2__line2" style="display:block; font-family:'Outfit', 'Arial Black', sans-serif; font-weight:900; font-size:clamp(2.5rem,7vw,6.5rem); color:#fff; line-height:1; margin-top:-0.5rem; letter-spacing:-0.03em;">OWASP CONSORTIUM</span>
          </h1>
          
          <p class="hero-v2__subtext typing-text" style="font-family:var(--font-mono); font-size:clamp(0.8rem, 2vw, 1rem); color:rgba(255,255,255,0.8); margin: 1.5rem auto; max-width: 600px; min-height: 3em;" id="hero-subtext"></p>

          <div class="hero-v2__actions" style="display:flex; flex-direction:column; align-items:center; gap: 1.5rem; margin-top: 2rem;">
            <div class="hero-v2__ctas" style="display:flex; gap: 1rem; justify-content:center;">
              <a href="#/events" class="btn btn--solid magnetic-btn">EXPLORE EVENTS →</a>
              <a href="#/about" class="btn btn--outline magnetic-btn">JOIN US</a>
            </div>
            <!-- Socials row -->
            <div id="hero-socials" style="display:flex; gap: 2rem;">
              <a href="https://instagram.com/owasp_nitb" class="hero-social-link" style="color:#fff; opacity:0.7; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a>
              <a href="https://linkedin.com/company/owaspnitb" class="hero-social-link" style="color:#fff; opacity:0.7; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="https://github.com/owasp-manit" class="hero-social-link" style="color:#fff; opacity:0.7; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
              <a href="https://youtube.com/@owasp_manit" class="hero-social-link" style="color:#fff; opacity:0.7; transition:0.3s;" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.7"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg></a>
            </div>
          </div>
        </div>

        <!-- Bottom -->
        <div class="hero-v2__bottom" style="display:flex; justify-content:space-between; align-items:flex-end; width:100%; position:relative; margin-top:2rem; flex-wrap:wrap; gap: 1rem;">
          
          <!-- Terminal panel (bottom-left) -->
          <div class="hero-v2__terminal os-window hero-tilt panel-bg" style="width:300px; padding:0.75rem; font-family:var(--font-mono); font-size:0.65rem; color:#fff; background: rgba(0,0,0,0.55); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
            <div style="color:var(--color-text-dim); margin-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:0.25rem;">terminal // session</div>
            <div id="hero-terminal-typing" style="color: #ff1a1a; min-height: 5em; white-space: pre-wrap; line-height: 1.4;"></div>
          </div>

          <!-- Stats strip -->
          <div class="hero-v2__stats hero-tilt panel-bg" style="display:flex; gap:2rem; padding:1rem 2rem; background: rgba(0,0,0,0.55); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; opacity: 1;">
            <div class="hero-v2__stat" style="display:flex; flex-direction:column; align-items:center;">
              <div class="hero-v2__stat-val" style="font-family:'Outfit',sans-serif; font-weight:900; font-size:1.8rem; color:#fff;"><span class="hero-v2__stat-num" data-target="200">0</span>+</div>
              <span class="hero-v2__stat-label" style="font-family:var(--font-mono); font-size:0.5rem; letter-spacing:0.1em; color:var(--color-text-dim);">MEMBERS</span>
            </div>
            <div style="width:1px; background:rgba(255,255,255,0.1);"></div>
            <div class="hero-v2__stat" style="display:flex; flex-direction:column; align-items:center;">
              <div class="hero-v2__stat-val" style="font-family:'Outfit',sans-serif; font-weight:900; font-size:1.8rem; color:#fff;"><span class="hero-v2__stat-num" data-target="15">0</span>+</div>
              <span class="hero-v2__stat-label" style="font-family:var(--font-mono); font-size:0.5rem; letter-spacing:0.1em; color:var(--color-text-dim);">EVENTS</span>
            </div>
            <div style="width:1px; background:rgba(255,255,255,0.1);"></div>
            <div class="hero-v2__stat" style="display:flex; flex-direction:column; align-items:center;">
              <div class="hero-v2__stat-val" style="font-family:'Outfit',sans-serif; font-weight:900; font-size:1.8rem; color:#fff;"><span class="hero-v2__stat-num" data-target="5">0</span>+</div>
              <span class="hero-v2__stat-label" style="font-family:var(--font-mono); font-size:0.5rem; letter-spacing:0.1em; color:var(--color-text-dim);">CTF COMPS</span>
            </div>
          </div>
          
          <div class="hero-v2__scroll-indicator hero-tilt" style="position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); display:flex; flex-direction:column; align-items:center; font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.2em; color:var(--color-text-dim);">
            <span>SCROLL</span>
            <span style="display:block; margin-top:0.5rem; font-size:1rem; animation:float 2s ease-in-out infinite;">&darr;</span>
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
          
          <!-- Socials -->
          <div class="footer__social-section">
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
        
        <!-- Giant outline OWASP between upper footer and bottom line -->
        <div class="footer__bg-text" aria-hidden="true">OWASP</div>

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
