import { renderFooter } from './Home.js';
import { OutlineWord, SectionOverline, ReticleFrame } from '../components.js';

const galleryEvents = [
  {
    id: 'evt-1',
    title: 'CyberHunter 2.0',
    date: 'Feb 2026',
    desc: 'Advanced cybersecurity competition with real-world challenge tracks.',
    align: 'left',
    photos: [
      { url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&q=80', size: 'tall' }
    ]
  },
  {
    id: 'evt-2',
    title: 'OWASP CTF',
    date: 'May 2025',
    desc: 'Vulnerability exploitation challenges based on OWASP Top 10.',
    align: 'right',
    photos: [
      { url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=900&q=80', size: 'tall' },
      { url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80', size: 'wide' }
    ]
  },
  {
    id: 'evt-3',
    title: 'Noobathon',
    date: 'Oct 2025',
    desc: 'Beginner hackathon introducing core InfoSec and UI/UX challenges.',
    align: 'left',
    photos: [
      { url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80', size: 'wide' },
      { url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80', size: 'tall' }
    ]
  }
];

export function renderGalleryPage() {
  return `
    <div class="gallery-page container">
      
      <div class="gallery-page__hero">
        <div class="gallery-page__heading-wrap">
          ${SectionOverline('04', 'GALLERY', '')}
          <h1 class="hero-v2__title">
            <span class="hero-v2__line1 scramble-text">EVENT</span>
            <span class="hero-v2__line2 outline-word">CUTOUTS</span>
          </h1>
        </div>
        <div class="gallery-page__hero-meta">
          <span class="gallery-page__count">${galleryEvents.length} EVENTS</span>
          <span class="gallery-page__count">${galleryEvents.reduce((acc, ev) => acc + ev.photos.length, 0)} CAPTURES</span>
        </div>
      </div>

      <div class="gallery-spiral-container">
        <div class="gallery-spiral-line"></div>
        
        ${galleryEvents.map((event) => `
          <div class="gallery-event-cutout gallery-event-cutout--${event.align}">
            <div class="gallery-cutout-meta">
              <span class="gallery-spiral-node"></span>
              <span class="gallery-cutout-date">${event.date}</span>
              <h3 class="gallery-cutout-title">${event.title}</h3>
              <p class="gallery-cutout-desc">${event.desc}</p>
            </div>
            
            <div class="gallery-cutout-photos">
              ${event.photos.map(photo => `
                <div class="gallery-frame gallery-frame--${photo.size}">
                  <div class="gallery-frame__corner gallery-frame__corner--tl"></div>
                  <div class="gallery-frame__corner gallery-frame__corner--tr"></div>
                  <div class="gallery-frame__corner gallery-frame__corner--bl"></div>
                  <div class="gallery-frame__corner gallery-frame__corner--br"></div>
                  <img src="${photo.url}" alt="${event.title}" class="gallery-frame__img" loading="lazy" />
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
        
      </div>
      
    </div>
    ${renderFooter()}
  `;
}
