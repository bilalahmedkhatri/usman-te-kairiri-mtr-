Short demo recording instructions — Header animation

1) Start your dev server

   npm run dev

2) Install Playwright browsers (if you haven't already)

   npx playwright install --with-deps

3) Run the recorder script

   node scripts/record-header.js

   (Or use the npm script: npm run record:header)

4) After the script completes you will find WebM files in:

   tmp/desktop/  (desktop recording)
   tmp/mobile/   (mobile/hamburger recording)

5) Convert the webm to GIF (use ffmpeg):

   ffmpeg -i tmp/desktop/<VIDEO_FILE>.webm -vf fps=15,scale=800:-1 -ss 0 -t 4 demo-desktop.gif

   ffmpeg -i tmp/mobile/<VIDEO_FILE>.webm -vf fps=15,scale=390:-1 -ss 0 -t 4 demo-mobile.gif

Notes
- Set DEV_URL if your site is served on a different URL: DEV_URL=http://localhost:3001 node scripts/record-header.js
- This helper uses Playwright; you only need Playwright installed to run it (npx playwright install).
- The script is a basic capture tool; modify it to increase captured time, emulate touch interactions, or capture a different viewport size.
