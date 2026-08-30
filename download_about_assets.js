/**
 * Download About Me assets from Google Drive
 * Run: node download_about_assets.js
 * 
 * HOW TO GET FILE IDs:
 * 1. Open the Drive folder: https://drive.google.com/drive/folders/1oHxGsDZ8lJakCV0mbIreaVI0XaDz11P2
 * 2. Open "About me" folder
 * 3. Right-click each file → "Get link" → copy the ID from the URL
 *    e.g. https://drive.google.com/file/d/XXXX_FILE_ID_XXXX/view → use XXXX_FILE_ID_XXXX
 * 4. Replace the IDs below and re-run this script
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const FILES = [
  // UPDATE THESE IDs from your Drive "About me" folder:
  { id: 'ABOUT_VIDEO_FILE_ID',   name: 'about-video.mp4',    dir: 'public/videos' },
  { id: 'ABOUT_PORTRAIT_FILE_ID', name: 'arundhati-portrait.webp', dir: 'public/images' },
  // Landing Page videos:
  { id: 'LOOK1_VIDEO_FILE_ID',   name: 'look1.mp4',          dir: 'public/videos' },
  { id: 'LOOK2_VIDEO_FILE_ID',   name: 'look2.mp4',          dir: 'public/videos' },
];

function downloadFile(fileId, filename, outputDir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    const dest = path.join(__dirname, outputDir, filename);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      return resolve();
    }

    const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    function request(url, redirectCount, cookie) {
      if (redirectCount > 10) return reject(new Error('Too many redirects'));
      const opts = new URL(url);
      const reqOpts = {
        hostname: opts.hostname,
        path: opts.pathname + opts.search,
        headers: { 'User-Agent': 'Mozilla/5.0', ...(cookie ? { 'Cookie': cookie } : {}) }
      };
      https.get(reqOpts, (res) => {
        const cookieStr = (res.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ') || cookie;
        if ([301, 302, 303].includes(res.statusCode)) return request(res.headers.location, redirectCount + 1, cookieStr);
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));

        const contentType = res.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            const match = body.match(/confirm=([0-9A-Za-z_\-]+)/);
            if (match) return request(`https://drive.google.com/uc?export=download&confirm=${match[1]}&id=${fileId}`, redirectCount + 1, cookieStr);
            return request(`https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`, redirectCount + 1, cookieStr);
          });
          return;
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log(`✅ Downloaded ${filename}`); resolve(); });
        file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      }).on('error', reject);
    }
    request(initialUrl, 0, null);
  });
}

async function main() {
  for (const f of FILES) {
    if (f.id.includes('FILE_ID')) {
      console.log(`⚠️  Skipping ${f.name} — replace the placeholder ID first`);
      continue;
    }
    try { await downloadFile(f.id, f.name, f.dir); }
    catch (e) { console.error(`❌ Failed ${f.name}:`, e.message); }
  }
  console.log('\n🎉 Done! Re-run after updating the IDs.');
}
main();
