// Shared line-icon set. Every icon is drawn stroke-only inside a -50..50 box.
// Used by the hero scene (as sprite textures), the preloader (2D canvas) and the UI buttons.
const TAU = Math.PI * 2;
const PI = Math.PI;

const line = (c, x1, y1, x2, y2) => { c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); };
const poly = (c, pts, close) => {
  c.beginPath();
  pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
  if (close) c.closePath();
  c.stroke();
};
const circ = (c, x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.stroke(); };
const dot = (c, x, y, r = 2.4) => { c.beginPath(); c.arc(x, y, r, 0, TAU); c.fill(); };
const arc = (c, x, y, r, a0, a1) => { c.beginPath(); c.arc(x, y, r, a0, a1); c.stroke(); };
const rr = (c, x, y, w, h, r) => {
  c.beginPath();
  if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
  c.stroke();
};
const ell = (c, x, y, rx, ry, a0 = 0, a1 = TAU) => { c.beginPath(); c.ellipse(x, y, rx, ry, 0, a0, a1); c.stroke(); };

const ICONS = {
  laptop(c) {
    rr(c, -32, -34, 64, 44, 4);
    line(c, -22, -22, -2, -22); line(c, -22, -12, 14, -12); line(c, -22, -2, 4, -2);
    poly(c, [[-44, 18], [44, 18], [38, 30], [-38, 30]], true);
    line(c, -8, 24, 8, 24);
  },
  router(c) {
    rr(c, -38, 6, 76, 26, 4);
    line(c, -24, 6, -30, -26); line(c, 24, 6, 30, -26);
    dot(c, -24, 19); dot(c, -12, 19); line(c, 6, 19, 28, 19);
    arc(c, 0, 0, 11, PI * 1.2, PI * 1.8); arc(c, 0, 0, 22, PI * 1.2, PI * 1.8);
  },
  globe(c) {
    circ(c, 0, 0, 36); ell(c, 0, 0, 14, 36);
    line(c, -36, 0, 36, 0); line(c, -31, -18, 31, -18); line(c, -31, 18, 31, 18);
  },
  cloud(c) {
    c.beginPath();
    c.moveTo(-30, 24);
    c.bezierCurveTo(-46, 24, -46, 0, -28, -2);
    c.bezierCurveTo(-28, -26, 8, -32, 14, -10);
    c.bezierCurveTo(38, -14, 44, 24, 26, 24);
    c.closePath(); c.stroke();
  },
  server(c) {
    [-36, -12, 12].forEach((y) => { rr(c, -34, y, 68, 22, 3); dot(c, -23, y + 11, 2); line(c, -10, y + 11, 22, y + 11); });
  },
  database(c) {
    ell(c, 0, -24, 30, 10); line(c, -30, -24, -30, 24); line(c, 30, -24, 30, 24);
    ell(c, 0, 0, 30, 10, 0, PI); ell(c, 0, 24, 30, 10, 0, PI);
  },
  lock(c, open) {
    rr(c, -24, -2, 48, 36, 4);
    c.beginPath(); c.moveTo(-14, -2); c.lineTo(-14, -16); c.arc(0, -16, 14, PI, 0);
    c.lineTo(14, open ? -8 : -2); c.stroke();
    circ(c, 0, 12, 4); line(c, 0, 16, 0, 24);
  },
  unlock(c) { ICONS.lock(c, true); },
  shield(c) {
    c.beginPath();
    c.moveTo(0, -40); c.lineTo(30, -28); c.lineTo(30, 0);
    c.quadraticCurveTo(30, 28, 0, 42); c.quadraticCurveTo(-30, 28, -30, 0);
    c.lineTo(-30, -28); c.closePath(); c.stroke();
    poly(c, [[-12, 2], [-3, 12], [14, -10]]);
  },
  user(c) {
    circ(c, 0, -16, 13);
    c.beginPath(); c.moveTo(-30, 34); c.quadraticCurveTo(-30, 8, 0, 8); c.quadraticCurveTo(30, 8, 30, 34); c.stroke();
  },
  hacker(c) {
    c.beginPath();
    c.moveTo(-32, 38); c.lineTo(-32, -4); c.bezierCurveTo(-32, -44, 32, -44, 32, -4); c.lineTo(32, 38);
    c.closePath(); c.stroke();
    ell(c, 0, -4, 15, 18);
    dot(c, -6, -6, 2.4); dot(c, 6, -6, 2.4); line(c, -5, 7, 5, 7);
    poly(c, [[-32, 20], [0, 36], [32, 20]]);
  },
  envelope(c) {
    rr(c, -36, -24, 72, 48, 3); poly(c, [[-36, -24], [0, 6], [36, -24]]);
  },
  cipher(c) {
    rr(c, -34, -34, 68, 68, 6);
    c.save(); c.translate(0, 2); c.scale(0.55, 0.55); c.lineWidth /= 0.55; ICONS.lock(c); c.restore();
    [[-24, -24], [24, -24], [-24, 24], [24, 24]].forEach(([x, y]) => dot(c, x, y, 1.8));
  },
  cube(c) {
    poly(c, [[0, -38], [33, -19], [33, 19], [0, 38], [-33, 19], [-33, -19]], true);
    poly(c, [[-33, -19], [0, 0], [33, -19]]); line(c, 0, 0, 0, 38);
  },
  key(c) {
    circ(c, -20, 0, 14); circ(c, -20, 0, 4);
    line(c, -6, 0, 38, 0); line(c, 26, 0, 26, 12); line(c, 36, 0, 36, 9);
  },
  bug(c) {
    ell(c, 0, 6, 16, 22); circ(c, 0, -22, 8); line(c, 0, -14, 0, 28);
    [[-16, -2, -34, -10], [-16, 8, -36, 8], [-14, 20, -32, 30]].forEach(([a, b, x, y]) => { line(c, a, b, x, y); line(c, -a, b, -x, y); });
    line(c, -4, -29, -10, -40); line(c, 4, -29, 10, -40);
  },
  terminal(c) {
    rr(c, -40, -30, 80, 60, 4); poly(c, [[-26, -12], [-12, 0], [-26, 12]]); line(c, -4, 14, 16, 14);
  },
  wifi(c) {
    [12, 26, 40].forEach((r) => arc(c, 0, 18, r, PI * 1.25, PI * 1.75)); dot(c, 0, 20, 3);
  },
  eye(c) {
    c.beginPath(); c.moveTo(-42, 0); c.quadraticCurveTo(0, -38, 42, 0); c.quadraticCurveTo(0, 38, -42, 0); c.stroke();
    circ(c, 0, 0, 12); dot(c, 0, 0, 4);
  },
  x(c) { circ(c, 0, 0, 34); line(c, -14, -14, 14, 14); line(c, 14, -14, -14, 14); },
  check(c) { circ(c, 0, 0, 34); poly(c, [[-15, 0], [-4, 11], [16, -11]]); },
  alert(c) {
    poly(c, [[0, -38], [40, 32], [-40, 32]], true); line(c, 0, -12, 0, 10); dot(c, 0, 22, 2.6);
  },
  replay(c) {
    arc(c, 0, 0, 28, -PI * 0.15, PI * 1.45);
    poly(c, [[26, -36], [25, -13], [6, -17]]);
  },
  skip(c) { poly(c, [[-22, -22], [-2, 0], [-22, 22]]); poly(c, [[4, -22], [24, 0], [4, 22]]); },
};

export const ICON_NAMES = Object.keys(ICONS);

/** Draw an icon centred at (x, y). `size` is the pixel width of the 100-unit box. */
export function drawIcon(c, name, x, y, size, o = {}) {
  const fn = ICONS[name];
  if (!fn || size < 1) return;
  const s = size / 100;
  c.save();
  c.translate(x, y); c.scale(s, s);
  c.globalAlpha *= o.alpha ?? 1;
  c.strokeStyle = c.fillStyle = o.color || '#fff';
  c.lineWidth = o.lw ?? Math.max(3.2, 1.5 / s);
  c.lineCap = 'round'; c.lineJoin = 'round';
  fn(c);
  c.restore();
}

/** Square canvas with one icon, ready to be used as a texture or dropped into the DOM. */
export function makeIconCanvas(name, px = 256) {
  const cv = document.createElement('canvas');
  cv.width = cv.height = px;
  drawIcon(cv.getContext('2d'), name, px / 2, px / 2, px * 0.86, { lw: 3.4 });
  return cv;
}
