import { renderFooter } from './Home.js';
import { OutlineWord, SectionOverline, BorderGrid } from '../components.js';

const tiers = [
  {
    id: 'platinum',
    label: 'PLATINUM',
    rank: '01',
    benefits: ['Logo on all event materials', 'Featured speaking slot', 'Premium banner placement', 'Social media spotlight'],
    partners: [
      { name: 'AWS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'Google', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original-wordmark.svg' },
    ]
  },
  {
    id: 'gold',
    label: 'GOLD',
    rank: '02',
    benefits: ['Logo on website', 'Event banner placement', 'Social media mention', 'Newsletter feature'],
    partners: [
      { name: 'Cloudflare', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original-wordmark.svg' },
      { name: 'DigitalOcean', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/digitalocean/digitalocean-original-wordmark.svg' },
    ]
  },
  {
    id: 'community',
    label: 'COMMUNITY',
    rank: '03',
    benefits: ['Logo on website', 'Social media mention', 'Community thank-you'],
    partners: [
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original-wordmark.svg' },
      { name: 'GitLab', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original-wordmark.svg' },
      { name: 'Linux', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
    ]
  },
];

export function renderSponsorsPage() {
  return `
    <div class="sponsors-page">
      <div class="container">

        <!-- HERO -->
        <div class="sponsors-hero reveal-up" style="border-bottom:1px solid var(--color-border); padding-bottom:4rem; margin-bottom:4rem;">
          ${SectionOverline('01', 'NETWORK PARTNERS', 'reveal-up')}
          <h1 class="hero-v2__title" style="margin-bottom: 2rem;">
            <span class="hero-v2__line1 scramble-text">OUR</span>
            <span class="hero-v2__line2 outline-word">SPONSORS</span>
          </h1>
          <p class="sponsors-hero__desc" style="max-width:600px; color:var(--color-text-secondary);">
            We thank our partners and sponsors for supporting the cybersecurity community at MANIT Bhopal. Their backing makes every event, workshop, and competition possible.
          </p>
        </div>

        <!-- TIER SECTIONS -->
        ${tiers.map(tier => `
          <div class="sponsors-tier-section reveal-up" style="margin-bottom:6rem;">
            <div class="sponsors-tier-section__header" style="display:flex; align-items:flex-end; gap:2rem; border-bottom:1px solid var(--color-border); padding-bottom:1rem; margin-bottom:2rem;">
              <div class="sponsors-tier-section__rank" style="font-family:var(--font-mono); font-size:3rem; color:var(--color-text-dim); line-height:1;">${tier.rank}</div>
              <div class="sponsors-tier-section__meta">
                <h2 class="sponsors-tier-section__label" style="font-family:var(--font-display); font-size:1.5rem; text-transform:uppercase;">— ${tier.label}</h2>
                <div class="sponsors-tier-section__benefits" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); display:flex; gap:1rem; flex-wrap:wrap; margin-top:0.5rem;">
                  ${tier.benefits.map(b => `<span>[ ${b} ]</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="sponsors-tier__logos">
              ${tier.partners.map(p => `
                <div class="sponsors-logo-card border-draw" style="padding:2rem; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1rem; border:1px solid var(--color-border); background:rgba(255,255,255,0.02);">
                  <img src="${p.logo}" alt="${p.name}" class="sponsors-logo-card__img" style="filter:grayscale(1) brightness(2.5); transition:filter 0.3s; width:80px; height:80px; object-fit:contain; opacity:0.85;" onmouseover="this.style.filter='grayscale(0) brightness(1)';this.style.opacity='1'" onmouseout="this.style.filter='grayscale(1) brightness(2.5)';this.style.opacity='0.85'" />
                  <span class="sponsors-logo-card__name" style="font-family:var(--font-mono); font-size:0.75rem; letter-spacing:0.05em;">${p.name}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <!-- BECOME A SPONSOR -->
        <div class="sponsors-cta-section reveal-up" style="margin-top:8rem; border-top:1px solid var(--color-border); padding-top:4rem;">
          <div class="sponsors-cta-section__header" style="margin-bottom:3rem;">
            ${SectionOverline('02', 'BECOME A SPONSOR', 'reveal-up')}
            <h2 class="sponsors-cta-section__heading" style="font-family:var(--font-display); font-size:3rem; text-transform:uppercase;">PARTNER WITH ${OutlineWord('US')}</h2>
            <p class="sponsors-cta-section__desc" style="color:var(--color-text-secondary); max-width:600px;">
              Interested in supporting Cybersecurity OWASP Consortium events at MANIT Bhopal?<br/>Fill out the application — our team responds within 48 hours.
            </p>
          </div>

          <form id="sponsor-form" class="sponsor-form__row">
            <div class="cf-group" style="display:flex; flex-direction:column; gap:0.5rem;">
              <label class="cf-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">COMPANY NAME</label>
              <input type="text" class="cf-input" placeholder="Acme Corp" id="sp-company" required style="background:transparent; border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0;" />
            </div>
            <div class="cf-group" style="display:flex; flex-direction:column; gap:0.5rem;">
              <label class="cf-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">CONTACT EMAIL</label>
              <input type="email" class="cf-input" placeholder="contact@company.com" id="sp-email" required style="background:transparent; border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0;" />
            </div>
            <div class="cf-group" style="display:flex; flex-direction:column; gap:0.5rem;">
              <label class="cf-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">CONTACT PERSON</label>
              <input type="text" class="cf-input" placeholder="Jane Smith" id="sp-contact" required style="background:transparent; border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0;" />
            </div>
            <div class="cf-group" style="display:flex; flex-direction:column; gap:0.5rem;">
              <label class="cf-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">TIER INTEREST</label>
              <select class="cf-input cf-select" id="sp-tier" required style="background:var(--color-black); border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0;">
                <option value="">— Select a tier —</option>
                <option value="platinum">Tier 01 // Platinum</option>
                <option value="gold">Tier 02 // Gold</option>
                <option value="community">Tier 03 // Community</option>
                <option value="custom">Custom Package</option>
              </select>
            </div>
            <div class="cf-group cf-group--full" style="grid-column: 1 / -1; display:flex; flex-direction:column; gap:0.5rem;">
              <label class="cf-label" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">MESSAGE</label>
              <textarea class="cf-input cf-textarea" placeholder="Tell us about your company and what kind of collaboration you're looking for..." id="sp-message" required style="background:transparent; border:1px solid var(--color-border); padding:1rem; color:var(--color-white); font-family:var(--font-sans); border-radius:0; min-height:150px;"></textarea>
            </div>
            <div class="cf-submit cf-group--full" style="grid-column: 1 / -1; display:flex; justify-content:space-between; align-items:center;">
              <button class="btn btn--outline" type="submit" id="sp-submit">
                SUBMIT APPLICATION →
              </button>
              <span class="cf-note" style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">Response within 48 hours</span>
            </div>
          </form>
        </div>

      </div>
    </div>
    ${renderFooter()}
  `;
}
