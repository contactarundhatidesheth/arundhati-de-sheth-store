/**
 * Download Brand Assets from Google Drive
 * Run: node download_brand_assets.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'brand');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DRIVE_FILES = [
  { id: '1X5YYGbGLp3ciTlkjNWQJ4GCGYecheP_0', name: 'logo-pattern.pdf' },
  { id: '1SM8xW1226aBHJFLHtGw12CwkIlxxtgTn', name: 'logo-black.png' },
  { id: '1AC4co9BKj7ioKZ2OcmbO-dbxbplbhAhn', name: 'logo-white.png' },
  { id: '14P5lpdRcImbOwQ_V4IkZuL5xz5mXhY1D', name: 'ads-logo-black.png' },
  { id: '1EUC2GkjflP1lukaV21A3_MtxZEBC4XEK', name: 'ads-logo-grey.png' },
  { id: '1vsAjK6X50ToQq8EQcg5dLXRSj4ZFZH9E', name: 'ads-logo-03.png' },
  { id: '1Cq3MpwPCIJPvDwNtXME9vBDS3Vih0wtJ', name: 'ads-logo-011.png' },
];

function downloadFile(fileId, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(OUTPUT_DIR, filename);
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
        headers: {
          'User-Agent': 'Mozilla/5.0',
          ...(cookie ? { 'Cookie': cookie } : {})
        }
      };
      https.get(reqOpts, (res) => {
        const setCookie = res.headers['set-cookie'];
        const cookieStr = setCookie ? setCookie.map(c => c.split(';')[0]).join('; ') : cookie;

        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
          return request(res.headers.location, redirectCount + 1, cookieStr);
        }

        if (res.statusCode !== 200) {
          return reject(new Error(`HTTP ${res.statusCode} for ${filename}`));
        }

        const contentType = res.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            const match = body.match(/confirm=([0-9A-Za-z_\-]+)/) || body.match(/&amp;confirm=([^&"]+)/);
            if (match) {
              const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${match[1]}&id=${fileId}`;
              return request(confirmUrl, redirectCount + 1, cookieStr);
            }
            const altUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
            return request(altUrl, redirectCount + 1, cookieStr);
          });
          return;
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✅ Downloaded ${filename}`);
          resolve();
        });
        file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      }).on('error', reject);
    }

    request(initialUrl, 0, null);
  });
}

async function main() {
  console.log(`📁 Downloading ${DRIVE_FILES.length} brand assets to public/brand/...\n`);
  for (const f of DRIVE_FILES) {
    try {
      await downloadFile(f.id, f.name);
    } catch (e) {
      console.error(`❌ Failed ${f.name}:`, e.message);
    }
  }
  console.log('\n🎉 Done!');
}

main();
