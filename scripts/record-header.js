/*
  Quick recording helper using Playwright to capture short webm clips of the header in
  desktop and mobile sizes. Steps to use (see DEMO_INSTRUCTIONS.md for more details):

  1) Start the dev server (e.g. `npm run dev`)
  2) Install playwright browsers: `npx playwright install --with-deps`
  3) Run this script: `node scripts/record-header.js`
  4) Videos will be written to `tmp/desktop/` and `tmp/mobile/` as webm files; convert with ffmpeg to GIF.

  Notes:
  - This script assumes the app is available at http://localhost:3000. Set DEV_URL env var to change.
  - Requires Node >= 16 and Playwright installed (npx playwright install to add browsers).
*/

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const url = process.env.DEV_URL || 'http://localhost:3000';
  const outDir = path.resolve(process.cwd(), 'tmp');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  console.log(`Recording header demo from ${url} — this assumes your dev server is running.`);

  const browser = await chromium.launch();

  try {
    // Desktop clip
    const desktopDir = path.join(outDir, 'desktop');
    if (!fs.existsSync(desktopDir)) fs.mkdirSync(desktopDir, { recursive: true });

    const desktopCtx = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      recordVideo: { dir: desktopDir, size: { width: 1280, height: 720 } },
    });

    const page = await desktopCtx.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // Allow time for entrance animations
    await page.waitForTimeout(1500);

    // Trigger a small scroll to show header scroll state
    await page.evaluate(() => window.scrollTo({ top: 120, behavior: 'smooth' }));
    await page.waitForTimeout(1100);

    // close so Playwright finalizes the recorded video
    await page.close();
    await desktopCtx.close();

    // Mobile clip (emulate mobile size and open hamburger)
    const mobileDir = path.join(outDir, 'mobile');
    if (!fs.existsSync(mobileDir)) fs.mkdirSync(mobileDir, { recursive: true });

    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      recordVideo: { dir: mobileDir, size: { width: 390, height: 844 } },
    });

    const page2 = await mobileCtx.newPage();
    await page2.goto(url, { waitUntil: 'networkidle' });
    await page2.waitForTimeout(700);

    // Safely click the hamburger (aria-label should match)
    const openSelector = 'button[aria-label="Open menu"]';
    const closeSelector = 'button[aria-label="Close menu"]';

    if (await page2.$(openSelector)) {
      await page2.click(openSelector);
      await page2.waitForTimeout(900);
      // Optionally close
      if (await page2.$(closeSelector)) {
        await page2.click(closeSelector);
        await page2.waitForTimeout(300);
      }
    }

    await page2.close();
    await mobileCtx.close();

    console.log('Recording complete. Check `tmp/desktop` and `tmp/mobile` for .webm files.');
    console.log('Convert to GIF with ffmpeg, for example:');
    console.log("ffmpeg -i tmp/desktop/your_video.webm -vf fps=15,scale=800:-1 -ss 0 -t 4 demo-desktop.gif");
  } catch (err) {
    console.error('Error during recording:', err);
  } finally {
    await browser.close();
  }
})();
