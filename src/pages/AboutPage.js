// ===== ABOUT PAGE — Open Breathable Layout =====
import { renderFooter } from './Home.js';
import { OutlineWord, ReticleFrame, StatsTable, BorderGrid, SectionOverline } from '../components.js';

export function renderAboutPage() {
  const whatWeDo = [
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      title: 'Penetration Testing',
      desc: 'Ethical hacking workshops covering web, network, and mobile application security testing techniques.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`,
      title: 'CTF Competitions',
      desc: 'Capture The Flag events and training across web exploitation, crypto, forensics and reverse engineering.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
      title: 'Security Research',
      desc: 'Open-source vulnerability research, CVE documentation, and responsible disclosure practice.'
    },
    {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
      title: 'Tool Development',
      desc: 'Building security automation tools, scripts and utilities that solve real-world problems.'
    },
  ];

  const timeline = [
    { year: '2019', event: 'Cybersecurity OWASP Consortium chapter founded at MANIT Bhopal' },
    { year: '2020', event: 'First internal CTF competition with 80+ participants' },
    { year: '2021', event: 'Partnered with GDG Bhopal for security awareness events' },
    { year: '2022', event: 'Launched open-source security toolkit project' },
    { year: '2023', event: 'AWS Users Group collaboration — cloud security track' },
    { year: '2024', event: '200+ members, 15+ events, national CTF winners' },
  ];

  return `
    <div class="about-page">
      <div class="container">

        <!-- HERO -->
        <div class="about-page__hero">
          <div class="about-page__hero-left reveal-left">
            ${SectionOverline('01', 'ABOUT US', 'reveal-up')}
            <h1 class="hero-v2__title" style="margin-bottom: 2rem; display: flex; flex-direction: column;">
              <span class="hero-v2__line1 scramble-text">SECURING TOMORROW</span>
              <span class="hero-v2__line2 outline-word">TOGETHER.</span>
            </h1>
            <p class="about-page__main-desc reveal-up">
              Cybersecurity OWASP Consortium, MANIT Bhopal is a student-driven community dedicated to promoting cybersecurity awareness, learning and innovation.
            </p>
            <div class="about-page__hero-ctas" style="display:flex; gap:1rem; margin-top:2rem;">
              <a href="#/team" class="btn btn--solid">MEET THE TEAM →</a>
              <a href="#/contact" class="btn btn--outline">GET IN TOUCH</a>
            </div>
          </div>
          <div class="about-page__hero-right reveal-right" style="display:flex; justify-content:center; align-items:center;">
            <div class="about-page__image-wrap float-element">
              ${ReticleFrame(`
                <img
                  class="about-page__image"
                  src="https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80"
                  alt="MANIT Bhopal"
                  loading="lazy"
                  style="width:100%; aspect-ratio:4/5; object-fit:cover; filter: grayscale(1) brightness(0.7);"
                />
              `)}
              <span class="about-page__image-label" style="display:block; margin-top:1rem; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">SYS // MANIT.AC.IN — BHOPAL, MP</span>
            </div>
          </div>
        </div>

        <!-- STATS STRIP -->
        <div class="about-stats-strip reveal-up" style="margin: 4rem 0;">
          ${StatsTable([
            { value: '200+', label: 'Active Members' },
            { value: '15+', label: 'Events Hosted' },
            { value: '5+', label: 'CTF Competitions' },
            { value: '3+', label: 'Open-Source Projects' },
            { value: '5+', label: 'Years of Impact' }
          ])}
        </div>

        <!-- VISION / MISSION -->
        <!-- VISION / MISSION -->
        <div class="about-vm-section">
          <div class="about-vm-block reveal-left">
            <span class="about-vm-block__tag">// VISION</span>
            <h2 class="about-vm-block__heading">SHAPING THE FUTURE OF CYBERSECURITY.</h2>
            <p class="about-vm-block__desc">
              To build a safer digital world by empowering students with the right skills, knowledge and community. We envision a future where every developer thinks security-first.
            </p>
          </div>
          <div class="about-vm-block reveal-right" style="text-align: right;">
            <span class="about-vm-block__tag">// MISSION</span>
            <h2 class="about-vm-block__heading">EDUCATION, PRACTICE &amp; COLLABORATION.</h2>
            <p class="about-vm-block__desc" style="margin-left: auto;">
              To educate, enable and encourage the next generation of cybersecurity professionals through hands-on learning, events, research and collaboration with industry and academia.
            </p>
          </div>
        </div>

        <!-- WHAT WE DO -->
        <div class="about-whatwedo-section" style="margin-top: 6rem;">
          <div class="about-whatwedo-header reveal-up" style="margin-bottom: 2rem;">
            ${SectionOverline('02', 'PROGRAMS', 'reveal-up')}
            <h2 class="section-title">WHAT WE ${OutlineWord('DO')}</h2>
          </div>
          ${BorderGrid(whatWeDo.map((item, i) => ({
            html: `
              <div class="about-do-stagger-card__num" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); margin-bottom:1rem;">0${i + 1}</div>
              <div class="about-do-stagger-card__icon" style="margin-bottom:1rem; color:var(--color-white);">${item.icon}</div>
              <h3 class="about-do-stagger-card__title" style="font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase; margin-bottom:0.5rem;">${item.title}</h3>
              <p class="about-do-stagger-card__desc" style="color:var(--color-text-secondary); font-size:0.9rem;">${item.desc}</p>
            `
          })))}
        </div>

        <!-- TIMELINE -->
        <div class="about-timeline-section" style="margin-top: 6rem; padding-bottom: 4rem;">
          <div class="about-whatwedo-header reveal-up" style="margin-bottom:4rem;">
            <span class="section-overline">MILESTONES</span>
            <h2 class="section-title">OUR <span>JOURNEY</span></h2>
          </div>
          <div class="about-timeline-network" style="position:relative; width:100%; min-height:400px; border:1px solid rgba(255,255,255,0.1); padding:2rem; overflow:hidden;">
            <!-- Background Grid -->
            <div style="position:absolute; inset:0; background:linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size:40px 40px;"></div>
            
            <!-- Nodes -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; position:relative; z-index:1; padding-top:40px;">
              
              <!-- Connecting Line -->
              <div style="position:absolute; top:46px; left:20px; right:20px; height:2px; background:rgba(255,255,255,0.1); z-index:-1;" class="reveal-up">
                <div class="timeline-line-anim" style="width:100%; height:100%; background:var(--color-white); transform:scaleX(0); transform-origin:left; transition:transform 2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;"></div>
              </div>

              ${timeline.map((t, i) => `
                <div class="timeline-node reveal-up" style="--delay:${i * 0.1}s; flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; position:relative;">
                  <div class="timeline-node-dot" style="width:14px; height:14px; border-radius:50%; background:#000; border:2px solid #fff; margin-bottom:1rem; position:relative; box-shadow:0 0 10px rgba(255,255,255,0.8); z-index:2;">
                    <div style="position:absolute; inset:-4px; border:1px solid rgba(255,255,255,0.5); border-radius:50%; animation: pulse 2s infinite ${i * 0.2}s;"></div>
                  </div>
                  <div class="timeline-node-year" style="font-family:var(--font-mono); font-size:1.2rem; font-weight:bold; color:#fff; margin-bottom:0.5rem;">${t.year}</div>
                  <div class="timeline-node-desc" style="font-size:0.8rem; color:var(--color-text-secondary); max-width:140px;">${t.event}</div>
                </div>
              `).join('')}
            </div>
            
            <style>
              .reveal-up.is-revealed .timeline-line-anim { transform: scaleX(1) !important; }
              @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(2.5); opacity: 0; }
              }
              @media (max-width: 768px) {
                .about-timeline-network > div:nth-child(2) {
                  flex-direction: column;
                  align-items: flex-start;
                  gap: 3rem;
                }
                .about-timeline-network > div:nth-child(2) > div:first-child {
                  width: 2px !important;
                  height: 100% !important;
                  top: 20px !important;
                  left: 26px !important;
                }
                .timeline-line-anim {
                  transform-origin: top !important;
                  transform: scaleY(0);
                }
                .reveal-up.is-revealed .timeline-line-anim { transform: scaleY(1) !important; }
                .timeline-node {
                  flex-direction: row !important;
                  text-align: left !important;
                  align-items: flex-start !important;
                }
                .timeline-node-year { margin-bottom: 0 !important; margin-right: 1rem !important; }
                .timeline-node-dot { margin-bottom: 0 !important; margin-right: 1rem !important; }
                .timeline-node-desc { max-width: none !important; }
              }

            </style>
          </div>
        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
