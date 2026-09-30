import { drawIcon } from './icons.js';

/**
 * Fullscreen 3D preloader: a message is sent, encrypted, routed across the internet,
 * an attacker fails to read it, it arrives, camera dives into Bob's laptop, shutter opens.
 * Pure 2D canvas with a hand-rolled 3D projection, so it needs no library and starts instantly.
 *
 * Contract with the app:
 *   - the app dispatches `window.dispatchEvent(new Event('app:ready'))` (or sets window.__appReady = true)
 *     once the first route (and hero scene) has mounted. The loader holds at 95% until then.
 *   - the loader dispatches `preloader:done` after the shutter opens and sets window.__preloaderDone = true.
 */

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const bump = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a), 0, 1));
const lerp = (a, b, t) => a + (b - a) * t;

const NODES = [
  [-8.5, 0, 0, 'laptop'], [-5.1, 0.3, -1.2, 'router'], [-1.7, 0.9, -2.4, 'globe'],
  [1.7, 0.9, -2.4, 'cloud'], [5.1, 0.3, -1.2, 'server'], [8.5, 0, 0, 'laptop'],
];
const MAL = [0, 0, 3.4];
const ICON_Y = 1.6, PATH_Y = 0.4;
const T_LOCK = 0.09, T_TAP = 0.5;
const END = 5.35;            // story seconds until shutter
const LOOP_START = 1.9, LOOP_END = 3.4;   // travelling beat that repeats while assets are still loading

function catmull(pts, per) {
  const P = [pts[0], ...pts, pts[pts.length - 1]], out = [];
  for (let i = 1; i < P.length - 2; i++) {
    for (let k = 0; k < per; k++) {
      const t = k / per, t2 = t * t, t3 = t2 * t;
      out.push([0, 1, 2].map((a) => 0.5 * (2 * P[i][a] + (-P[i - 1][a] + P[i + 1][a]) * t +
        (2 * P[i - 1][a] - 5 * P[i][a] + 4 * P[i + 1][a] - P[i + 2][a]) * t2 +
        (-P[i - 1][a] + 3 * P[i][a] - 3 * P[i + 1][a] + P[i + 2][a]) * t3)));
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const PATH = catmull(NODES.map((n) => [n[0], n[1] + PATH_Y, n[2]]), 24);
function pathAt(t) {
  const f = clamp(t, 0, 1) * (PATH.length - 1), i = Math.min(PATH.length - 2, Math.floor(f)), u = f - i;
  return [0, 1, 2].map((a) => lerp(PATH[i][a], PATH[i + 1][a], u));
}

/** Draw one frame of the story at story-time `s` seconds. Exported so it can be tested headlessly. */
export function drawStory(c, W, H, s) {
  c.clearRect(0, 0, W, H);
  const U = Math.min(W / (W < H ? 17 : 22), H / 9.5);
  const intro = ease(clamp(s / 1.3, 0, 1));
  const dive = ease(clamp((s - 4.3) / 1.0, 0, 1));
  const bobTop = [NODES[5][0], NODES[5][1] + ICON_Y, NODES[5][2]];
  const target = [lerp(0, bobTop[0], dive), lerp(1, bobTop[1], dive), lerp(-0.6, bobTop[2], dive)];
  const yaw = lerp(lerp(-0.95, -0.22, intro) + Math.sin(s * 0.6) * 0.05, 0, dive);
  const pitch = lerp(lerp(0.6, 0.27, intro), 0.02, dive);
  const dist = lerp(lerp(21, 14, intro), 3.4, dive);
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const FOC = U * 14;

  const proj = (p) => {
    const x0 = p[0] - target[0], y0 = p[1] - target[1], z0 = p[2] - target[2];
    const x = x0 * cy - z0 * sy, z = x0 * sy + z0 * cy;
    const y2 = y0 * cp - z * sp, z2 = y0 * sp + z * cp + dist;
    if (z2 < 0.6) return null;
    const f = FOC / z2;
    return { x: W / 2 + x * f, y: H / 2 - y2 * f + H * 0.04, f, z: z2 };
  };
  const stroke = (pts, alpha, w = 1.2, dash) => {
    const q = pts.map(proj); if (q.some((v) => !v) || alpha <= 0.01) return;
    c.save(); c.globalAlpha = alpha; c.strokeStyle = '#fff'; c.lineWidth = w; c.setLineDash(dash || []);
    c.beginPath(); q.forEach((v, i) => (i ? c.lineTo(v.x, v.y) : c.moveTo(v.x, v.y))); c.stroke(); c.restore();
  };
  const others = 1 - dive;

  // floor grid
  const gIn = clamp(s / 0.8, 0, 1) * others;
  for (let i = -12; i <= 12; i += 2) {
    stroke([[i, -0.45, -9], [i, -0.45, 8]], 0.14 * gIn);
    stroke([[-12, -0.45, i * 0.7], [12, -0.45, i * 0.7]], 0.14 * gIn);
  }

  // path + travelled part
  const pT = clamp((s - 1.4) / 2.6, 0, 1);
  stroke(PATH, 0.28 * clamp((s - 0.5) / 0.6, 0, 1) * others, 1.2);
  stroke(PATH.slice(0, Math.max(2, Math.floor(pT * (PATH.length - 1)))), 0.95 * (s > 1.4 ? 1 : 0) * others, 1.6);

  // icon queue (sorted by depth so near icons draw on top)
  const q = [];
  const addIcon = (name, p, size, alpha) => {
    const v = proj(p); if (!v || alpha <= 0.01) return;
    q.push({ name, x: v.x, y: v.y, size: size * v.f, alpha, z: v.z });
  };
  const hex = (cx, cy0, cz, r, a, w = 1.2) => {
    const pts = []; for (let k = 0; k <= 6; k++) pts.push([cx + Math.cos((k / 6) * 6.283) * r, cy0, cz + Math.sin((k / 6) * 6.283) * r]);
    stroke(pts, a, w);
  };
  const ringArcs = (cx, cy0, cz, r, a, rot) => {
    for (let k = 0; k < 6; k++) {
      const pts = []; const a0 = rot + (k / 6) * 6.283 + 0.12, a1 = rot + ((k + 1) / 6) * 6.283 - 0.12;
      for (let j = 0; j <= 8; j++) { const u = lerp(a0, a1, j / 8); pts.push([cx + Math.cos(u) * r, cy0, cz + Math.sin(u) * r]); }
      stroke(pts, a, 1);
    }
  };

  NODES.forEach((n, i) => {
    const isBob = i === 5;
    const a = clamp((s - 0.5 - i * 0.12) / 0.4, 0, 1) * (isBob ? 1 : others);
    hex(n[0], n[1], n[2], 0.95, 0.75 * a); ringArcs(n[0], n[1] + 0.02, n[2], 1.45, 0.45 * a, s * (i % 2 ? -0.4 : 0.4));
    const pop = ease(a);
    addIcon(n[3], [n[0], n[1] + ICON_Y, n[2]], 2.1 * (0.6 + 0.4 * pop), a);
    if (i === 0 || isBob) addIcon('user', [n[0] + (isBob ? 1.9 : -1.9), n[1] + ICON_Y, n[2]], 1.1, 0.8 * a * (isBob ? 1 : others));
  });

  // encryption ring
  const pl = pathAt(T_LOCK), lockPulse = clamp(1 - Math.abs(s - 2.05) / 0.45, 0, 1);
  const ringPts = (p, r, n = 40) => Array.from({ length: n + 1 }, (_, k) => { const u = (k / n) * 6.283; return [p[0] + Math.sin(u) * r * 0.5, p[1] + Math.cos(u) * r, p[2] + Math.sin(u) * r * 0.85]; });
  const lockIn = clamp((s - 1.0) / 0.4, 0, 1) * others;
  stroke(ringPts(pl, 0.85 * (1 + 0.3 * lockPulse)), (0.45 + 0.55 * lockPulse) * lockIn, 1.4);
  addIcon('lock', [pl[0], pl[1] + 1.35, pl[2]], 0.95, lockIn);

  // attacker + tap + shield
  const malIn = clamp((s - 1.9) / 0.5, 0, 1) * others;
  if (malIn > 0) {
    hex(MAL[0], MAL[1], MAL[2], 0.95, 0.75 * malIn); ringArcs(MAL[0], MAL[1] + 0.02, MAL[2], 1.45, 0.45 * malIn, s * 0.4);
    addIcon('hacker', [MAL[0], MAL[1] + ICON_Y, MAL[2]], 2.2, malIn);
    const tap = clamp(bump(s, 2.4, 3.1) * 1.6, 0, 1) * others, pt = pathAt(T_TAP);
    stroke([[MAL[0], MAL[1] + ICON_Y + 1.1, MAL[2]], pt], 0.6 * tap, 1.3, [6, 5]);
    stroke(ringPts(pt, 1.25 * (1 + 0.15 * Math.sin(s * 9))), 0.9 * tap, 1.5);
    addIcon('shield', [pt[0], pt[1] + 1.9, pt[2]], 1.1, tap);
    addIcon(tap > 0.3 ? 'lock' : 'eye', [MAL[0] + 2.4, MAL[1] + ICON_Y, MAL[2]], 0.85, (0.35 + 0.65 * tap) * malIn);
  }

  // packet + segments
  const pv = clamp((s - 0.9) / 0.4, 0, 1) * clamp((END - 0.3 - s) / 0.3, 0, 1);
  if (pv > 0) {
    const p = pathAt(pT), bob = Math.sin(s * 3) * 0.05;
    const enc = pT >= T_LOCK && pT < 0.965;
    [3, 2, 1].forEach((k) => { if (pT > 0.1 && pT < 0.985) { const f = pathAt(pT - 0.028 * k); addIcon('cube', [f[0], f[1] + 0.35, f[2]], 0.45, 0.6 * pv * others); } });
    addIcon('cube', [p[0], p[1] + 0.4 + bob, p[2]], 0.75, pv);
    addIcon(enc ? 'cipher' : 'envelope', [p[0], p[1] + 1.2 + bob, p[2]], 0.95, pv);
  }
  const vd = ease(clamp((s - 4.0) / 0.4, 0, 1));
  addIcon('check', [bobTop[0], bobTop[1] + 1.9, bobTop[2]], 1.3 * vd, vd);

  q.sort((a, b) => b.z - a.z).forEach((i) => drawIcon(c, i.name, i.x, i.y, i.size, { alpha: i.alpha }));

  // step pips (screen space)
  const stage = s < 1.4 ? 0 : s < 1.9 ? 1 : s < 2.4 ? 2 : s < 3.1 ? 3 : 4;
  ['envelope', 'lock', 'globe', 'hacker', 'check'].forEach((n, i) => {
    const size = Math.min(30, W * 0.06), x = W / 2 + (i - 2) * size * 1.9, y = H - 46;
    drawIcon(c, n, x, y, size, { alpha: (i === stage ? 1 : i < stage ? 0.55 : 0.22) * others });
  });
}

/* ------------------------------ DOM driver ------------------------------ */
function run(root) {
  const cv = root.querySelector('#pl-canvas'), c = cv.getContext('2d');
  const countEl = root.querySelector('.pl-count'), bar = root.querySelector('.pl-bar'), skipBtn = root.querySelector('.pl-skip');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let seen = false; try { seen = sessionStorage.getItem('pl-seen') === '1'; } catch (e) {}
  const speed = seen ? 2.4 : 1;
  const MAX_WAIT = 9; // seconds; never trap the visitor

  // real readiness: fonts + window load + the app's own signal
  const prog = { fonts: !document.fonts, load: document.readyState === 'complete', app: !!window.__appReady };
  document.fonts?.ready.then(() => { prog.fonts = true; });
  if (!prog.load) window.addEventListener('load', () => { prog.load = true; }, { once: true });
  if (!prog.app) window.addEventListener('app:ready', () => { prog.app = true; }, { once: true });
  const ready = () => prog.fonts && prog.load && prog.app;

  let done = false, s = 0, shown = 0, elapsed = 0, last = performance.now(), raf = 0, W = 0, H = 0;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const fit = () => {
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  fit(); window.addEventListener('resize', fit);

  function finish() {
    if (done) return; done = true;
    try { sessionStorage.setItem('pl-seen', '1'); } catch (e) {}
    cancelAnimationFrame(raf);
    countEl.textContent = '100'; bar.style.transform = 'scaleX(1)';
    root.classList.add('pl-exit');
    setTimeout(() => {
      root.remove();
      document.documentElement.classList.remove('pl-lock');
      window.__preloaderDone = true;
      window.dispatchEvent(new Event('preloader:done'));
    }, 900);
    window.removeEventListener('resize', fit); window.removeEventListener('keydown', onKey);
  }
  const onKey = (e) => { if (['Enter', 'Escape', ' '].includes(e.key)) finish(); };
  window.addEventListener('keydown', onKey);
  root.addEventListener('click', finish);
  skipBtn?.addEventListener('click', (e) => { e.stopPropagation(); finish(); });

  if (reduce) { // no animation: wait for real readiness, then open
    const iv = setInterval(() => { if (ready() || performance.now() > 3000) { clearInterval(iv); finish(); } }, 100);
    return;
  }

  function frame(now) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000); last = now; elapsed += dt;
    let next = s + dt * speed;
    if (next >= LOOP_END && !ready() && elapsed < MAX_WAIT) next = LOOP_START + (next - LOOP_END); // keep packets travelling until the site is ready
    s = next;
    const storyPct = clamp(s / 4.6, 0, 1) * 100;
    const target = ready() ? storyPct : Math.min(storyPct, 95);
    shown = Math.max(shown, shown + (target - shown) * 0.2);
    countEl.textContent = String(Math.round(shown)).padStart(3, '0');
    bar.style.transform = `scaleX(${shown / 100})`;
    drawStory(c, W, H, s);
    if (s >= END && (ready() || elapsed >= MAX_WAIT)) finish();
  }
  raf = requestAnimationFrame(frame);
}

if (typeof document !== 'undefined') {
  const root = document.getElementById('preloader');
  if (root) run(root);
}
