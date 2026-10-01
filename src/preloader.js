export function initMatrixRain(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let w, h;
  const setSize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };
  setSize();
  window.addEventListener('resize', setSize);

  const cols = Math.floor(w / 14) + 1;
  const ypos = Array(cols).fill(0);
  let animationId;

  function render() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = '#444'; // faint hex/binary
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
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', setSize);
  };
}

function run(root) {
  // First visit check
  let seen = false;
  try { seen = sessionStorage.getItem('pl-seen') === '1'; } catch (e) {}
  
  if (seen) {
    root.remove();
    document.documentElement.classList.remove('pl-lock');
    window.__preloaderDone = true;
    window.dispatchEvent(new Event('preloader:done'));
    return;
  }

  // Set up DOM
  root.innerHTML = `
    <canvas id="pl-canvas" style="position:absolute;inset:0;opacity:0.2;"></canvas>
    <div style="position:relative; z-index:10; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100%; width:100%; max-width:800px; margin:0 auto; padding:2rem;">
      <div id="pl-logs" style="font-family:'JetBrains Mono', monospace; color:#ccc; font-size:14px; width:100%; min-height:100px; margin-bottom:2rem;"></div>
      <div style="display:flex; justify-content:space-between; width:100%; font-family:'JetBrains Mono', monospace; font-size:12px; color:#888; margin-bottom:0.5rem;">
        <span>SYS.LOAD //</span>
        <span><span id="pl-count" style="font-size:3rem; color:#fff;">000</span>%</span>
      </div>
      <div style="width:100%; height:2px; background:#222; position:relative; overflow:hidden;">
        <div id="pl-bar" style="position:absolute; top:0; left:0; height:100%; width:0%; background:#fff; transition:width 0.1s linear;"></div>
      </div>
      <button id="pl-skip" style="margin-top:2rem; background:none; border:none; color:#666; font-family:'JetBrains Mono', monospace; cursor:pointer; padding:0.5rem;">[ SKIP_SEQ ]</button>
    </div>
    <div id="pl-top" style="position:absolute; top:0; left:0; width:100%; height:50%; background:#000; z-index:-1; transition:transform 0.8s cubic-bezier(0.8, 0, 0.2, 1);"></div>
    <div id="pl-bottom" style="position:absolute; bottom:0; left:0; width:100%; height:50%; background:#000; z-index:-1; transition:transform 0.8s cubic-bezier(0.8, 0, 0.2, 1);"></div>
  `;

  const cleanupMatrix = initMatrixRain('pl-canvas');

  const logs = [
    "> INITIALIZING OWASP_MANIT...",
    "> LOADING SECURITY MODULES",
    "> ESTABLISHING SECURE CONNECTION",
    "> ACCESS GRANTED"
  ];
  
  const logContainer = document.getElementById('pl-logs');
  const countEl = document.getElementById('pl-count');
  const bar = document.getElementById('pl-bar');
  const skipBtn = document.getElementById('pl-skip');
  
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let done = false;
  
  function finish() {
    if (done) return; done = true;
    try { sessionStorage.setItem('pl-seen', '1'); } catch (e) {}
    
    if (cleanupMatrix) cleanupMatrix();

    if (reduce) {
      root.style.transition = 'opacity 0.5s';
      root.style.opacity = '0';
      setTimeout(() => {
        root.remove();
        document.documentElement.classList.remove('pl-lock');
        window.__preloaderDone = true;
        window.dispatchEvent(new Event('preloader:done'));
      }, 500);
    } else {
      // Glitch text out
      const glitch = setInterval(() => {
        countEl.style.transform = `translate(${Math.random()*10-5}px, ${Math.random()*10-5}px)`;
        countEl.style.opacity = Math.random();
      }, 50);
      
      setTimeout(() => {
        clearInterval(glitch);
        countEl.style.transform = 'none';
        countEl.style.opacity = '1';
        
        // Split open
        root.style.background = 'transparent';
        document.getElementById('pl-canvas').style.opacity = '0';
        root.querySelector('div').style.opacity = '0';
        
        document.getElementById('pl-top').style.transform = 'translateY(-100%)';
        document.getElementById('pl-bottom').style.transform = 'translateY(100%)';
        
        setTimeout(() => {
          root.remove();
          document.documentElement.classList.remove('pl-lock');
          window.__preloaderDone = true;
          window.dispatchEvent(new Event('preloader:done'));
        }, 800);
      }, 300);
    }
  }

  skipBtn.addEventListener('click', finish);

  let p = 0;
  let logIdx = -1;
  const duration = 3000;
  const interval = 30;
  const step = 100 / (duration / interval);
  
  const timer = setInterval(() => {
    p += step;
    if (p > 100) p = 100;
    
    countEl.innerText = Math.floor(p).toString().padStart(3, '0');
    bar.style.width = p + '%';
    
    const nextLog = Math.floor(p / 25);
    if (nextLog > logIdx && nextLog < logs.length) {
      logIdx = nextLog;
      const div = document.createElement('div');
      div.innerText = logs[logIdx];
      logContainer.appendChild(div);
    }
    
    if (p >= 100) {
      clearInterval(timer);
      setTimeout(finish, 200);
    }
  }, interval);
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('preloader');
  if (root) run(root);
}
