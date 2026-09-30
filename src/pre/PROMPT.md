# Prompt for your coding agent (Antigravity)

```
CONTEXT
Vanilla JS + Vite site (custom router, GSAP, Lenis). NOT React. Strictly black and white.
I am giving you 5 finished files. Do NOT rewrite them or replace them with your own version.
Integrate them exactly as described, then verify with real screenshots.

FILES (copy into src/):
  icons.js               shared line-icon set (canvas drawn)
  secure-channel.js      3D hero stage (Three.js): icons on a 3D path, packets, attacker, shield
  secure-channel.css     stage styles
  preloader.js           fullscreen 3D preloader (2D canvas with 3D projection, no library)
  preloader-snippet.html markup + critical CSS for index.html (has 3 paste locations, marked)

TASKS
1. `npm i three` if it is not already a dependency (any version >= 0.150).
2. index.html: apply the three paste locations from preloader-snippet.html
   (html class="pl-lock", the <style>/<noscript> in <head>, the #preloader markup as the
   FIRST child of <body>, plus the failsafe <script> and the module script).
   Delete every older preloader / loader / boot-sequence code and CSS.
3. Home hero (remove, do not hide):
   - the old stage contents (secure_channel.sim header, empty area, event log line, the text toggles
     [SEND MESSAGE] [ENCRYPTION: ON] [SIMULATE ATTACK], the old HeroScene / TorusKnot / any old
     terminal-radar-hex panels)
   - Keep the club title (CYBERSECURITY outline / OWASP CONSORTIUM solid), the description,
     the two buttons and the stats strip exactly as they are.
   - In the stage's place put `<div id="hero-stage"></div>` and mount:
       const { mountSecureChannel } = await import('./secure-channel.js');
       heroStage = mountSecureChannel(document.getElementById('hero-stage'));
     Import './secure-channel.css' once. Call heroStage?.destroy() when the router leaves Home
     and mount again when it returns. The stage sets its own canvas size; do NOT give the container
     a fixed height in other CSS (the .sc-stage class already has clamp(420px, 62vh, 660px)).
   - The stage is icons only. Do not add text labels, log lines or captions to it.
4. Preloader wiring in main.js:
   - After the first route has rendered AND the hero stage has mounted (or failed), run:
       window.__appReady = true; window.dispatchEvent(new Event('app:ready'));
   - Do not start Lenis, GSAP ScrollTriggers, or the hero entrance animation until the loader is done:
       if (!window.__preloaderDone) await new Promise(r => addEventListener('preloader:done', r, { once: true }));
   - The site must be hidden behind the loader and only revealed by the shutter. No flash of the
     site before the loader, and no second loader.
5. Do not change anything else in the project. Do not add colors. Do not add gradients.

IF THE STAGE STILL LOOKS EMPTY
Open devtools and check, in this order: (a) is there a <canvas class="sc-canvas"> inside #hero-stage,
(b) is its height > 0, (c) console errors, (d) does the old code still cover it (z-index, overflow, a
second canvas). Fix the root cause. Do not paper over it.

VERIFY (Playwright / headless Chromium, real screenshots, no claims without a file)
- preloader at 0.5s, 1.5s, 2.5s, 3.5s, 4.5s and just after the shutter opens
- home hero at 1920, 1440, 1024, 768, 390 px (stage shows the 3D icon scene, not blank)
- click the lock button in the stage: encryption OFF must change the attacker's icon to an envelope
  and show the alert icon above Bob at the end
- second visit in the same tab: loader is the short version; Enter or Escape skips it
- prefers-reduced-motion: no loader animation, stage shows one static frame
Finish with a PASS/FAIL list, each item with its screenshot filename, plus `npm run build` output
and the bundle-size change. If anything is FAIL, fix it instead of describing it.
```
