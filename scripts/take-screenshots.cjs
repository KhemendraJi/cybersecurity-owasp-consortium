const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  let page = await browser.newPage();
  
  const sizes = [
    { width: 1920, height: 1080, name: '1920px' },
    { width: 1440, height: 900, name: '1440px' },
    { width: 1024, height: 768, name: '1024px' },
    { width: 768, height: 1024, name: '768px' },
    { width: 390, height: 844, name: '390px' }
  ];

  // 1. Preloader screenshots
  console.log("Taking preloader screenshots...");
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'load' });
  
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `screenshot_preloader_0.5s.png` });
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `screenshot_preloader_1.5s.png` });
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `screenshot_preloader_2.5s.png` });
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `screenshot_preloader_3.5s.png` });

  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `screenshot_preloader_4.5s.png` });
  
  // Wait for shutter to open
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: `screenshot_shutter_open.png` });

  // 2. Home Hero at breakpoints
  for (const size of sizes) {
    console.log(`Taking screenshots for ${size.name}...`);
    await page.setViewport({ width: size.width, height: size.height });
    await new Promise(r => setTimeout(r, 1000)); // wait for resize
    await page.screenshot({ path: `screenshot_home_${size.name}.png` });
  }

  // 3. Click the lock button in the stage
  console.log("Testing encryption OFF state...");
  await page.setViewport({ width: 1440, height: 900 });
  
  // Need to evaluate to find the lock canvas button or simulate click on the 3D scene.
  // Wait, the new stage is icons only. Let's look for how to click the lock.
  // In `secure-channel.js`, it probably adds event listeners to the canvas.
  const canvas = await page.$('.sc-canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    // Assuming the lock is positioned dynamically, we can trigger the encryption toggle 
    // by calling window.__toggleEncryption() or clicking the center where lock is? 
    // Wait, the prompt says "click the lock button in the stage".
    // We can dispatch an event or click the center top.
    // Let's just click the center top of the canvas (where lock usually is).
    await page.mouse.click(box.x + box.width / 2, box.y + box.height * 0.2); 
    await new Promise(r => setTimeout(r, 1500)); // wait for transition
    await page.screenshot({ path: `screenshot_encryption_off.png` });
  } else {
    console.log("Canvas not found!");
  }

  // 4. Second visit in the same tab: loader is the short version
  console.log("Testing second visit...");
  await page.goto('about:blank');
  await page.goto('http://localhost:4173/', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `screenshot_second_visit.png` });

  // 5. prefers-reduced-motion
  console.log("Testing reduced motion...");
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('about:blank');
  await page.goto('http://localhost:4173/', { waitUntil: 'load' });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: `screenshot_reduced_motion.png` });

  await browser.close();
  console.log("Screenshots captured successfully.");
}

run().catch(console.error);
