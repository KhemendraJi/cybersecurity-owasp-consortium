// ===== EVENTS PAGE =====
import { events } from '../data/events.js';
import { renderFooter } from './Home.js';
import { BorderGrid } from '../components.js';

export function renderEventsPage() {
  const categories = ['All', 'Workshop', 'CTF', 'Tech Talk', 'Hackathon'];
  const now = new Date();

  // Split events into upcoming and past based on date
  const upcomingEvents = events.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastEvents = events.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date) - new Date(a.date));

  return `
    <div class="events-page">
      <div class="container">

        <!-- Page Hero -->
        <div class="events-page__hero reveal-up">
          <span class="section-overline">EVENTS DATABASE</span>
          <h1 class="events-page__heading">ALL <span>EVENTS</span></h1>
          <p class="section-desc">Workshops, CTFs, talks, hackathons and more — past and upcoming.</p>
          <div class="events-page__hero-stats">
            <div class="ephs">
              <span class="ephs__num">${events.length}</span>
              <span class="ephs__label">Total Events</span>
            </div>
            <div class="ephs__sep"></div>
            <div class="ephs">
              <span class="ephs__num" style="color:#ffffff;">${upcomingEvents.length}</span>
              <span class="ephs__label">Upcoming</span>
            </div>
            <div class="ephs__sep"></div>
            <div class="ephs">
              <span class="ephs__num" style="color:var(--color-text-dim);">${pastEvents.length}</span>
              <span class="ephs__label">Completed</span>
            </div>
          </div>
        </div>

        <!-- NEXT EVENT PANEL -->
        ${upcomingEvents.length > 0 ? (() => {
          const nextEvent = upcomingEvents[0];
          return `
          <div class="next-event-panel reveal-up" style="border:1px solid var(--color-border); background:rgba(255,255,255,0.02); backdrop-filter:blur(10px); padding:2rem; margin-bottom:3rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); margin-bottom:0.5rem;">SYS // NEXT_EVENT</div>
              <h2 style="font-family:var(--font-display); font-size:2.5rem; text-transform:uppercase; margin-bottom:0.5rem; color:var(--color-white);">${nextEvent.title}</h2>
              <div style="font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim);">${nextEvent.day} ${nextEvent.month} ${nextEvent.year} | LOC // ${nextEvent.location}</div>
            </div>
            <div id="countdown" data-date="${nextEvent.date}" style="display:flex; gap:1.5rem; text-align:center;">
              <div><div id="cd-d" style="font-family:var(--font-display); font-size:2.5rem; color:var(--color-white); line-height:1;">00</div><div style="font-family:var(--font-mono); font-size:0.6rem; color:var(--color-text-dim);">DAYS</div></div>
              <div><div id="cd-h" style="font-family:var(--font-display); font-size:2.5rem; color:var(--color-white); line-height:1;">00</div><div style="font-family:var(--font-mono); font-size:0.6rem; color:var(--color-text-dim);">HOURS</div></div>
              <div><div id="cd-m" style="font-family:var(--font-display); font-size:2.5rem; color:var(--color-white); line-height:1;">00</div><div style="font-family:var(--font-mono); font-size:0.6rem; color:var(--color-text-dim);">MINS</div></div>
              <div><div id="cd-s" style="font-family:var(--font-display); font-size:2.5rem; color:var(--color-white); line-height:1;">00</div><div style="font-family:var(--font-mono); font-size:0.6rem; color:var(--color-text-dim);">SECS</div></div>
            </div>
          </div>
          <script>
            function updateCD(){
              const cd = document.getElementById('countdown');
              if(!cd) return;
              const target = new Date(cd.getAttribute('data-date')).getTime();
              const now = new Date().getTime();
              const diff = target - now;
              if(diff < 0) return;
              const d = Math.floor(diff / (1000 * 60 * 60 * 24));
              const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const s = Math.floor((diff % (1000 * 60)) / 1000);
              document.getElementById('cd-d').innerText = d.toString().padStart(2,'0');
              document.getElementById('cd-h').innerText = h.toString().padStart(2,'0');
              document.getElementById('cd-m').innerText = m.toString().padStart(2,'0');
              document.getElementById('cd-s').innerText = s.toString().padStart(2,'0');
            }
            setInterval(updateCD, 1000);
            updateCD();
          </script>
          `;
        })() : ''}

        <!-- Toolbar -->
        <div class="events-toolbar reveal-up" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2rem; border-bottom:1px solid var(--color-border); padding-bottom:1rem;">
          <div class="events-filter__body" style="display:flex; gap:0.5rem; border:none; padding:0; background:transparent;">
            ${categories.map((cat, i) => `
              <button class="filter-pill ${i === 0 ? 'active' : ''}" data-event-filter="${cat}" style="background:transparent; border:1px solid var(--color-border); color:var(--color-text-dim); padding:0.25rem 0.75rem; font-family:var(--font-mono); font-size:0.7rem; cursor:pointer; transition:all 0.2s;" onmouseover="this.style.background='var(--color-white)'; this.style.color='var(--color-black)';" onmouseout="if(!this.classList.contains('active')) { this.style.background='transparent'; this.style.color='var(--color-text-dim)'; }">
                ${cat}
              </button>
            `).join('')}
          </div>
          <div style="display:flex; gap:1rem; align-items:center;">
            <input type="text" placeholder="Search events..." style="background:transparent; border:1px solid var(--color-border); padding:0.4rem 1rem; color:var(--color-white); font-family:var(--font-mono); font-size:0.75rem; outline:none;" />
            <div style="display:flex; border:1px solid var(--color-border); font-family:var(--font-mono); font-size:0.7rem;">
              <button style="background:var(--color-white); color:var(--color-black); border:none; padding:0.4rem 0.75rem; cursor:pointer;" onclick="showView('grid')">GRID</button>
              <button style="background:transparent; color:var(--color-text-dim); border:none; border-left:1px solid var(--color-border); padding:0.4rem 0.75rem; cursor:pointer;" onclick="showView('timeline')">TIMELINE</button>
              <button style="background:transparent; color:var(--color-text-dim); border:none; border-left:1px solid var(--color-border); padding:0.4rem 0.75rem; cursor:pointer;" onclick="showView('terminal')">TERMINAL</button>
            </div>
          </div>
        </div>

        <script>
          function showView(view) {
            document.getElementById('view-grid').style.display = view === 'grid' ? 'grid' : 'none';
            document.getElementById('view-timeline').style.display = view === 'timeline' ? 'block' : 'none';
            document.getElementById('view-terminal').style.display = view === 'terminal' ? 'block' : 'none';
          }
        </script>

        <!-- UPCOMING EVENTS VIEWS -->
        ${upcomingEvents.length > 0 ? `
        <div class="events-section-block reveal-up" style="margin-bottom:4rem;">
          <!-- GRID VIEW -->
          <div id="view-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:1rem; grid-auto-rows:1fr;">
            ${upcomingEvents.map((event, i) => `
              <div class="event-card" data-category="${event.category}" style="${i === 0 ? 'grid-column: span 2;' : ''} border:1px solid var(--color-border); background:rgba(255,255,255,0.03); backdrop-filter:blur(5px); padding:2rem; position:relative; transition:background 0.3s; cursor:pointer; display:flex; flex-direction:column;">
                <div style="margin-bottom:1rem; display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">
                  <span>ENTRY_${String(i + 1).padStart(3, '0')}</span>
                  <span style="border:1px solid var(--color-border); padding:0.15rem 0.4rem;">${event.category}</span>
                  <span>● UPCOMING</span>
                </div>
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); margin-bottom:0.5rem;">${event.day} ${event.month} ${event.year}</div>
                <h4 style="margin-bottom:0.5rem; font-family:var(--font-display); font-size:1.4rem; text-transform:uppercase; line-height:1.1;">${event.title}</h4>
                <p style="color:var(--color-text-secondary); margin-bottom:1.5rem; font-size:0.9rem; line-height:1.55; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; flex-grow:1;">${event.description}</p>
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); border-top:1px solid var(--color-border); padding-top:1rem; margin-top:auto;">
                  <span>LOC // ${event.location}</span>
                  <span style="cursor:pointer; color:var(--color-white);" data-event-id="${event.id}">REGISTER →</span>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- TIMELINE VIEW -->
          <div id="view-timeline" style="display:none; overflow-x:auto; padding:2rem 0; white-space:nowrap;">
            <div style="display:inline-flex; align-items:center; position:relative; padding-top:2rem;">
              <div style="position:absolute; top:2.5rem; left:0; right:0; height:2px; background:var(--color-border);"></div>
              ${upcomingEvents.map((event, i) => `
                <div style="position:relative; width:300px; padding:0 2rem;">
                  <div style="width:12px; height:12px; border-radius:50%; background:var(--color-white); margin:0 auto; position:relative; z-index:2; border:2px solid var(--color-black);"></div>
                  <div style="margin-top:1.5rem; text-align:center; white-space:normal;">
                    <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); margin-bottom:0.5rem;">${event.day} ${event.month} ${event.year}</div>
                    <div style="font-family:var(--font-display); font-size:1.1rem; text-transform:uppercase;">${event.title}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TERMINAL VIEW -->
          <div id="view-terminal" style="display:none; background:rgba(0,0,0,0.8); border:1px solid var(--color-border); padding:2rem; font-family:var(--font-mono); font-size:0.85rem; color:var(--color-text-dim);">
            <div style="color:var(--color-white); margin-bottom:1rem;">$ ls -l events/upcoming</div>
            <table style="width:100%; border-collapse:collapse;">
              ${upcomingEvents.map(event => `
                <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
                  <td style="padding:0.5rem 0;">-rw-r--r--</td>
                  <td style="padding:0.5rem 1rem;">1 root root</td>
                  <td style="padding:0.5rem 1rem; color:var(--color-white);">${event.day} ${event.month}</td>
                  <td style="padding:0.5rem 1rem;">${event.title.replace(/\s+/g, '_').toLowerCase()}.md</td>
                  <td style="padding:0.5rem 0; text-align:right;"><span style="border:1px solid var(--color-border); padding:0.1rem 0.3rem; font-size:0.7rem;">${event.category}</span></td>
                </tr>
              `).join('')}
            </table>
          </div>
        </div>
        ` : ''}

        <!-- PAST EVENTS (HORIZONTAL TRACK) -->
        ${pastEvents.length > 0 ? `
        <div class="events-section-block events-section-block--past reveal-up">
          <div class="events-section-block__header" style="margin-bottom:1.5rem;">
            <div class="events-section-block__indicator events-section-block__indicator--past"></div>
            <span class="events-section-block__label">PAST EVENTS</span>
            <span class="events-section-block__count">${pastEvents.length} completed</span>
          </div>

          <div style="display:flex; gap:1.5rem; overflow-x:auto; padding-bottom:2rem; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; opacity:0.6; cursor:grab;">
            ${pastEvents.map((event, i) => `
              <div class="event-card" data-category="${event.category}" style="flex:0 0 350px; scroll-snap-align: start; border:1px solid var(--color-border); background:rgba(255,255,255,0.02); padding:2rem; position:relative; display:flex; flex-direction:column; height:100%;">
                <div style="margin-bottom:1rem; display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim);">
                  <span>ARCHIVE_${String(i + 1).padStart(3, '0')}</span>
                  <span style="border:1px solid var(--color-border); padding:0.15rem 0.4rem;">${event.category}</span>
                </div>
                <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); margin-bottom:0.5rem;">${event.day} ${event.month} ${event.year}</div>
                <h4 style="margin-bottom:0.5rem; font-family:var(--font-display); font-size:1.2rem; text-transform:uppercase; line-height:1.1; color:var(--color-text-secondary);">${event.title}</h4>
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.75rem; color:var(--color-text-dim); border-top:1px solid var(--color-border); padding-top:1rem; margin-top:auto;">
                  <span>LOC // ${event.location}</span>
                  <span style="cursor:pointer;" data-event-id="${event.id}">VIEW DETAILS →</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Empty state if no events at all -->
        ${events.length === 0 ? `
        <div class="events-page__empty">
          <span class="events-page__empty-icon">📭</span>
          <p>No events found. Check back soon.</p>
        </div>
        ` : ''}

      </div>
    </div>
    ${renderFooter()}
  `;
}
