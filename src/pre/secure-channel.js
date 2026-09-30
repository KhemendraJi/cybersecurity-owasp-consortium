import * as THREE from 'three';
import { makeIconCanvas } from './icons.js';

/**
 * "The Secure Channel" hero stage.
 * Alice sends a message -> it is encrypted -> packets cross the internet ->
 * Mallory (attacker) taps the line -> encryption holds -> Bob receives it.
 * Icons only, white wireframe only. Toggle encryption OFF to see what an attacker reads.
 *
 *   const stage = mountSecureChannel(document.querySelector('#hero-stage'));
 *   stage.destroy();   // on route change
 */

const STEPS = [
  { key: 'compose',   icon: 'envelope', at: 0 },
  { key: 'encrypt',   icon: 'lock',     at: 2.6 },
  { key: 'route',     icon: 'globe',    at: 3.3 },
  { key: 'intercept', icon: 'hacker',   at: 5.5 },
  { key: 'deliver',   icon: 'check',    at: 9.3 },
];
const DUR = 13.5;
const NODES = [
  { icon: 'laptop', x: -8.5, y: 0,   z: 0 },
  { icon: 'router', x: -5.1, y: 0.3, z: -1.2 },
  { icon: 'globe',  x: -1.7, y: 0.9, z: -2.4 },
  { icon: 'cloud',  x: 1.7,  y: 0.9, z: -2.4 },
  { icon: 'server', x: 5.1,  y: 0.3, z: -1.2 },
  { icon: 'laptop', x: 8.5,  y: 0,   z: 0 },
];
const ICON_Y = 1.6;   // icon height above its platform
const PATH_Y = 0.4;   // height of the packet track above the platform
const T_LOCK = 0.09;  // where along the path encryption happens
const T_TAP = 0.5;    // where the attacker taps

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
const bump = (t, a, b) => Math.sin(Math.PI * clamp((t - a) / (b - a), 0, 1));

function packetT(time) {
  if (time < 1.4) return 0;
  if (time < 2.6) return T_LOCK * ease((time - 1.4) / 1.2);
  if (time < 3.3) return T_LOCK + 0.01 * ((time - 2.6) / 0.7);
  if (time < 9.3) return 0.1 + 0.82 * ((time - 3.3) / 6);
  if (time < 10.2) return 0.92 + 0.08 * ease((time - 9.3) / 0.9);
  return 1;
}

export function mountSecureChannel(host, opts = {}) {
  if (!host) return null;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  host.classList.add('sc-stage');
  const canvas = document.createElement('canvas');
  canvas.className = 'sc-canvas';
  canvas.setAttribute('role', 'img');
  canvas.setAttribute('aria-label', 'Animation: a message is encrypted, travels across the internet, an attacker fails to read it, and it is delivered safely.');
  host.prepend(canvas);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (err) {
    console.warn('[secure-channel] WebGL unavailable', err);
    host.classList.add('sc-fallback');
    canvas.remove();
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 20, 50);
  const camera = new THREE.PerspectiveCamera(38, 2, 0.1, 120);
  const world = new THREE.Group();
  scene.add(world);

  /* ---------- helpers ---------- */
  const mats = [];
  const lineMat = (o = 0.6) => {
    const m = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: o });
    mats.push(m); return m;
  };
  const texCache = {};
  const tex = (name) => {
    if (!texCache[name]) {
      const t = new THREE.CanvasTexture(makeIconCanvas(name, 256));
      if ('colorSpace' in t) t.colorSpace = THREE.SRGBColorSpace;
      texCache[name] = t;
    }
    return texCache[name];
  };
  const sprite = (name, size, op = 1) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex(name), transparent: true, opacity: op, depthWrite: false }));
    s.scale.set(size, size, 1);
    s.userData = { name, size };
    return s;
  };
  const setIcon = (s, name) => {
    if (s.userData.name === name) return;
    s.userData.name = name;
    s.material.map = tex(name);
    s.material.needsUpdate = true;
  };
  const circlePts = (r, n = 64) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      return new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0);
    });
  const loop = (r, o) => new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(circlePts(r)), lineMat(o));
  const arcRing = (r, o, segs = 6) => {
    const pts = [];
    for (let k = 0; k < segs; k++) {
      const a0 = (k / segs) * Math.PI * 2 + 0.12, a1 = ((k + 1) / segs) * Math.PI * 2 - 0.12;
      for (let j = 0; j < 8; j++) {
        const u = a0 + ((a1 - a0) * j) / 8, v = a0 + ((a1 - a0) * (j + 1)) / 8;
        pts.push(new THREE.Vector3(Math.cos(u) * r, Math.sin(u) * r, 0), new THREE.Vector3(Math.cos(v) * r, Math.sin(v) * r, 0));
      }
    }
    return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), lineMat(o));
  };
  const wire = (geo, o) => new THREE.LineSegments(new THREE.EdgesGeometry(geo), lineMat(o));

  /* ---------- floor + ambient particles ---------- */
  const grid = new THREE.GridHelper(44, 44, 0xffffff, 0xffffff);
  grid.position.y = -0.45;
  grid.material.transparent = true; grid.material.opacity = 0.09;
  world.add(grid);

  const N = 240;
  const pPos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 24;
    pPos[i * 3 + 1] = -0.4 + Math.random() * 5.4;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.4, depthWrite: false });
  world.add(new THREE.Points(pGeo, pMat));

  /* ---------- nodes ---------- */
  const rings = [];
  const nodeSprites = [];
  NODES.forEach((n, i) => {
    const g = new THREE.Group();
    g.position.set(n.x, n.y, n.z);
    const base = wire(new THREE.CylinderGeometry(0.95, 0.95, 0.16, 6), 0.75);
    g.add(base);
    const ring = arcRing(1.45, 0.5);
    ring.rotation.x = Math.PI / 2; ring.position.y = 0.02;
    g.add(ring); rings.push(ring);
    const sp = sprite(n.icon, 2.1);
    sp.position.y = ICON_Y;
    g.add(sp); nodeSprites.push(sp);
    world.add(g);
  });
  const alice = NODES[0], bob = NODES[NODES.length - 1];
  const aliceUser = sprite('user', 1.1, 0.8); aliceUser.position.set(alice.x - 1.9, alice.y + ICON_Y, alice.z); world.add(aliceUser);
  const bobUser = sprite('user', 1.1, 0.8); bobUser.position.set(bob.x + 1.9, bob.y + ICON_Y, bob.z); world.add(bobUser);

  /* ---------- packet track ---------- */
  const path = new THREE.CatmullRomCurve3(NODES.map((n) => new THREE.Vector3(n.x, n.y + PATH_Y, n.z)), false, 'catmullrom', 0.5);
  const SEG = 180;
  const spaced = path.getSpacedPoints(SEG);
  world.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(spaced), lineMat(0.28)));
  const progGeo = new THREE.BufferGeometry().setFromPoints(spaced);
  const progLine = new THREE.Line(progGeo, lineMat(0.95));
  world.add(progLine);

  const packet = new THREE.Group();
  const cube = wire(new THREE.BoxGeometry(0.55, 0.55, 0.55), 1);
  packet.add(cube);
  const packetSprite = sprite('envelope', 0.95); packetSprite.position.y = 0.85;
  packet.add(packetSprite);
  world.add(packet);
  const followers = [0, 1, 2].map(() => {
    const f = wire(new THREE.BoxGeometry(0.3, 0.3, 0.3), 0.6);
    world.add(f); return f;
  });

  /* ---------- encryption ring ---------- */
  const pLock = path.getPointAt(T_LOCK);
  const lockRing = loop(0.85, 0.7);
  lockRing.position.copy(pLock); lockRing.rotation.y = Math.PI / 2 - 0.55;
  world.add(lockRing);
  const lockSprite = sprite('lock', 0.95);
  lockSprite.position.set(pLock.x, pLock.y + 1.35, pLock.z);
  world.add(lockSprite);

  /* ---------- attacker ---------- */
  const mal = new THREE.Vector3(0, 0, 3.4);
  const malBase = wire(new THREE.CylinderGeometry(0.95, 0.95, 0.16, 6), 0.75);
  malBase.position.copy(mal); world.add(malBase);
  const malRing = arcRing(1.45, 0.5); malRing.rotation.x = Math.PI / 2; malRing.position.set(mal.x, mal.y + 0.02, mal.z);
  world.add(malRing); rings.push(malRing);
  const malSprite = sprite('hacker', 2.2);
  malSprite.position.set(mal.x, mal.y + ICON_Y, mal.z); world.add(malSprite);
  const seenFrame = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.62, -0.62, 0), new THREE.Vector3(0.62, -0.62, 0), new THREE.Vector3(0.62, 0.62, 0), new THREE.Vector3(-0.62, 0.62, 0),
  ]), lineMat(0.5));
  seenFrame.position.set(mal.x + 2.4, mal.y + ICON_Y, mal.z); world.add(seenFrame);
  const seen = sprite('eye', 0.85, 0.5); seen.position.copy(seenFrame.position); world.add(seen);

  const pTap = path.getPointAt(T_TAP);
  const tapGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(mal.x, mal.y + ICON_Y + 1.1, mal.z), pTap]);
  const tapMat = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.22, gapSize: 0.14, transparent: true, opacity: 0 });
  mats.push(tapMat);
  const tapLine = new THREE.Line(tapGeo, tapMat); tapLine.computeLineDistances(); world.add(tapLine);

  const shieldRing = loop(1.25, 0);
  shieldRing.position.copy(pTap); shieldRing.rotation.y = Math.PI / 2 - 0.55; world.add(shieldRing);
  const shieldSprite = sprite('shield', 1.1, 0); shieldSprite.position.set(pTap.x, pTap.y + 1.9, pTap.z); world.add(shieldSprite);

  /* ---------- verdict above Bob + floating tech icons ---------- */
  const verdict = sprite('check', 1.3, 0); verdict.position.set(bob.x, bob.y + ICON_Y + 1.9, bob.z); world.add(verdict);
  const floaters = [
    ['terminal', alice.x - 1.4, 3.6, alice.z + 0.4, 0.9],
    ['wifi', NODES[1].x, 3.3, NODES[1].z, 0.85],
    ['key', -3.4, 3.7, -2.6, 0.8],
    ['database', 3.5, 3.7, -2.6, 0.9],
    ['bug', -2.3, 1.6, 3.2, 0.8],
    ['terminal', bob.x + 1.4, 3.6, bob.z + 0.4, 0.9],
    ['server', NODES[4].x, 3.3, NODES[4].z, 0.85],
  ].map(([name, x, y, z, size], i) => {
    const s = sprite(name, size, 0.45); s.position.set(x, y, z); s.userData.by = y; s.userData.i = i; world.add(s); return s;
  });

  /* ---------- UI (icons only) ---------- */
  const ui = document.createElement('div'); ui.className = 'sc-ui';
  const stepsEl = document.createElement('div'); stepsEl.className = 'sc-steps';
  const pips = STEPS.map((s) => {
    const p = document.createElement('span'); p.className = 'sc-pip'; p.title = s.key; p.append(makeIconCanvas(s.icon, 64)); stepsEl.append(p); return p;
  });
  const controls = document.createElement('div'); controls.className = 'sc-controls';
  const mkBtn = (icon, label, fn) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'sc-btn'; b.title = label; b.setAttribute('aria-label', label);
    b.append(makeIconCanvas(icon, 64)); b.addEventListener('click', fn); controls.append(b); return b;
  };
  const state = { time: 0, enc: true };
  mkBtn('replay', 'Replay', () => { state.time = 0; });
  const encBtn = mkBtn('lock', 'Encryption on', () => {
    state.enc = !state.enc;
    encBtn.replaceChildren(makeIconCanvas(state.enc ? 'lock' : 'unlock', 64));
    encBtn.title = state.enc ? 'Encryption on' : 'Encryption off';
    encBtn.setAttribute('aria-label', encBtn.title);
    encBtn.setAttribute('aria-pressed', String(!state.enc));
    encBtn.classList.toggle('is-off', !state.enc);
    state.time = 0;
  });
  mkBtn('hacker', 'Simulate attack', () => { state.time = 4.8; });
  ui.append(stepsEl, controls); host.append(ui);

  let activeStep = -1;
  function setStep(time) {
    let idx = 0;
    STEPS.forEach((s, i) => { if (time >= s.at) idx = i; });
    if (idx === activeStep) return;
    activeStep = idx;
    pips.forEach((p, i) => { p.classList.toggle('is-active', i === idx); p.classList.toggle('is-done', i < idx); });
    if (opts.onStep) opts.onStep(STEPS[idx].key, { encrypted: state.enc });
  }

  /* ---------- sizing ---------- */
  let baseDist = 16;
  function resize() {
    const w = host.clientWidth || 1, h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const th = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    baseDist = Math.max(11.8 / (th * camera.aspect), 6.2 / th);
    scene.fog.near = baseDist + 6; scene.fog.far = baseDist + 30;
    renderer.render(scene, camera);
  }
  const ro = new ResizeObserver(resize); ro.observe(host);

  /* ---------- interaction ---------- */
  let mx = 0, my = 0, dragYaw = 0, dragging = false, lastX = 0;
  const onMove = (e) => {
    const r = host.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width - 0.5) * 2; my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    if (dragging) { dragYaw = clamp(dragYaw + (e.clientX - lastX) * 0.006, -0.9, 0.9); lastX = e.clientX; }
  };
  const onDown = (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture?.(e.pointerId); };
  const onUp = () => { dragging = false; };
  const onLeave = () => { mx = 0; my = 0; };
  host.addEventListener('pointermove', onMove);
  host.addEventListener('pointerleave', onLeave);
  canvas.addEventListener('pointerdown', onDown);
  window.addEventListener('pointerup', onUp);

  /* ---------- per-frame update ---------- */
  const lookAt = new THREE.Vector3(0, 1.1, -0.6);
  function step(dt) {
    if (!reduce) state.time += dt;
    if (state.time > DUR) state.time = 0;
    const time = state.time, enc = state.enc, t = packetT(time);
    setStep(time);

    // camera + world drift
    if (!dragging) dragYaw += (0 - dragYaw) * 0.02;
    world.rotation.y += ((mx * 0.2 + dragYaw + Math.sin(time * 0.2) * 0.05) - world.rotation.y) * 0.06;
    const push = bump(time, 5.2, 7.6);
    camera.position.set(mx * 0.8, baseDist * 0.24 - my * 0.6, baseDist * (1 - 0.1 * push));
    camera.lookAt(lookAt);

    // node rings, floaters, particles
    rings.forEach((r, i) => { r.rotation.z += dt * (i % 2 ? -0.4 : 0.4); });
    floaters.forEach((f) => { f.position.y = f.userData.by + Math.sin(time * 0.8 + f.userData.i) * 0.12; });
    const arr = pGeo.attributes.position.array;
    for (let i = 0; i < N; i++) { arr[i * 3 + 1] += dt * 0.16; if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -0.4; }
    pGeo.attributes.position.needsUpdate = true;

    // Alice types
    nodeSprites[0].material.opacity = time < 1.4 ? 0.7 + 0.3 * Math.sin(time * 14) : 1;

    // packet
    const vis = clamp((time - 0.3) / 0.4, 0, 1) * clamp((DUR - 0.6 - time) / 0.5, 0, 1);
    packet.visible = vis > 0;
    packet.scale.setScalar(ease(vis));
    packet.position.copy(path.getPointAt(t)); packet.position.y += 0.4 + Math.sin(time * 3) * 0.05;
    cube.rotation.y += dt * 1.6;
    const encrypted = enc && t >= T_LOCK && t < 0.965;
    setIcon(packetSprite, encrypted ? 'cipher' : 'envelope');
    followers.forEach((f, i) => {
      f.visible = vis > 0 && t > 0.1 && t < 0.985;
      f.position.copy(path.getPointAt(clamp(t - 0.028 * (i + 1), 0, 1))); f.position.y += 0.4;
      f.rotation.y += dt * 2;
    });
    progGeo.setDrawRange(0, Math.max(2, Math.floor(t * SEG)));

    // encryption ring
    const pulse = clamp(1 - Math.abs(time - 2.75) / 0.5, 0, 1);
    lockRing.scale.setScalar(1 + 0.3 * pulse);
    lockRing.material.opacity = enc ? 0.45 + 0.55 * pulse : 0.1;
    setIcon(lockSprite, enc ? 'lock' : 'unlock');
    lockSprite.material.opacity = enc ? 1 : 0.5;

    // attacker + shield
    const tap = clamp(bump(time, 5.3, 7.4) * 1.6, 0, 1);
    tapMat.opacity = tap * (enc ? 0.55 : 1) * (enc ? 1 : 0.7 + 0.3 * Math.sin(time * 40));
    setIcon(seen, tap > 0.3 ? (enc ? 'lock' : 'envelope') : 'eye');
    seen.material.opacity = 0.35 + 0.65 * tap; seenFrame.material.opacity = 0.3 + 0.7 * tap;
    malSprite.scale.setScalar(2.2 * (1 + 0.06 * tap * (enc ? 0 : Math.sin(time * 30))));
    shieldRing.material.opacity = enc ? tap * 0.9 : 0;
    shieldRing.scale.setScalar(1 + 0.2 * Math.sin(time * 6) * tap);
    shieldSprite.material.opacity = enc ? tap : 0;
    cube.material.opacity = !enc && tap > 0.5 ? 0.35 + 0.65 * Math.abs(Math.sin(time * 25)) : 1;
    world.position.x = !enc ? (Math.random() - 0.5) * 0.06 * tap : 0;

    // arrival
    const v = ease(clamp((time - 10.0) / 0.5, 0, 1)) * clamp((DUR - 0.5 - time) / 0.5, 0, 1);
    setIcon(verdict, enc ? 'check' : 'alert');
    verdict.material.opacity = v; verdict.scale.setScalar(1.3 * v || 0.001);
    nodeSprites[nodeSprites.length - 1].scale.setScalar(2.1 * (1 + 0.08 * bump(time, 9.6, 10.6)));
  }

  /* ---------- run loop ---------- */
  let raf = 0, last = performance.now(), visible = true;
  const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; last = performance.now(); });
  io.observe(host);
  function tick(now) {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    step(dt); renderer.render(scene, camera);
  }
  if (reduce) state.time = 6.6;
  resize(); step(0); renderer.render(scene, camera);
  if (!reduce) raf = requestAnimationFrame(tick);

  return {
    replay() { state.time = 0; },
    setEncryption(on) { if (state.enc !== on) encBtn.click(); },
    attack() { state.time = 4.8; },
    destroy() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener('pointermove', onMove); host.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointerup', onUp);
      scene.traverse((o) => { o.geometry?.dispose?.(); if (o.material && !mats.includes(o.material)) o.material.dispose?.(); });
      mats.forEach((m) => m.dispose()); Object.values(texCache).forEach((t) => t.dispose());
      renderer.dispose(); canvas.remove(); ui.remove(); host.classList.remove('sc-stage');
    },
  };
}
