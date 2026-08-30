/**
 * Download Timeline images from Google Drive
 * Run: node download_timeline_images.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'timeline');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DRIVE_FILES = [
  { id: '17gthYbxzzV7OHw-Q6umlRNAifCbWcR_4', name: 'timeline-ads-masaba-amrapali.jpg' },
  { id: '16VYeRvn1k9zlYyh8aSofNnqqyUN4ewMM', name: 'timeline-gilded-age-1.jpg' },
  { id: '1Cx_zd1kwlKd1qgFjlM7hctSKsMGJsqhm', name: 'timeline-gilded-age-2.jpg' },
  { id: '1xUMMHxVRlWYLi7wzATPfhpNbMRDnCp3n', name: 'timeline-gilded-age-3.jpg' },
  { id: '1pLlaNLXthkbORGPWV1DxhHTtU3ncAB-W', name: 'timeline-gilded-age-bom.jpg' },
  { id: '1JqmNpaakJpeMruuT0xTtNZN-G0KgscqW', name: 'timeline-le-mill.jpg' },
  { id: '1_PCMzYnAxtt4Itrl2QKQwDsl9VeVbOax', name: 'timeline-lightness-of-being.jpg' },
  { id: '1M_Fr6nYYKIdruiUkB4H2h76vcwLe840w', name: 'timeline-only-natural-diamonds.jpg' },
  { id: '1q6LbvrVrElUt2F72pkfThGNgyi52lRT3', name: 'timeline-prismatic-mumbai.jpg' },
  { id: '1X4hK8bPq3tzodYNGMr4a81ElAKTOVeb_', name: 'timeline-remarkable-women-1.jpg' },
  { id: '1nnGu4eg3u6ZU7rMiQuwxMjIrFm8JpX-N', name: 'timeline-remarkable-women-2.jpg' },
  { id: '1aNfTcGjyWf3zx37Q_egZkgwYRCgtW8-P', name: 'timeline-remarkable-women-2019.jpg' },
  { id: '1wNoqXOTKnqnjWLdDhHinlEvEd5oG8oC0', name: 'timeline-shadow-games.jpg' },
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
  console.log(`📁 Downloading ${DRIVE_FILES.length} Timeline images to public/timeline/...\n`);
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
