// ===== SHARED COMPONENTS =====

export function OutlineWord(word, className = '') {
  return `<span class="outline-word ${className}">${word}</span>`;
}

export function ScrambleText(text, className = '') {
  return `<span class="scramble-text ${className}" data-scramble="${text}">${text}</span>`;
}

export function SectionOverline(number, label, className = '') {
  return `<span class="section-overline ${className}">${number} —— ${label}</span>`;
}

export function StatsTable(stats, className = '') {
  // stats = [{ value: '200+', label: 'Members' }, ...]
  return `
    <div class="bordered-stats-table ${className}">
      ${stats.map(s => `
        <div class="stat-cell">
          <span class="stat-value">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      `).join('')}
    </div>
  `;
}

export function BorderGrid(items, className = '') {
  // items = [{ html: '...' }, ...]
  return `
    <div class="border-grid ${className}">
      ${items.map(item => `
        <div class="border-grid__cell">
          ${item.html}
        </div>
      `).join('')}
    </div>
  `;
}

export function OSWindow(title, contentHtml, className = '') {
  return `
    <div class="os-window ${className}">
      <div class="os-window__header">
        <span class="os-window__dot"></span><span class="os-window__dot"></span><span class="os-window__dot"></span>
        <span class="os-window__title">${title}</span>
      </div>
      <div class="os-window__content">
        ${contentHtml}
      </div>
    </div>
  `;
}

export function ReticleFrame(contentHtml, className = '') {
  return `
    <div class="reticle-frame ${className}">
      ${contentHtml}
      <div class="reticle-corner reticle-corner--tl"></div>
      <div class="reticle-corner reticle-corner--tr"></div>
      <div class="reticle-corner reticle-corner--bl"></div>
      <div class="reticle-corner reticle-corner--br"></div>
    </div>
  `;
}
