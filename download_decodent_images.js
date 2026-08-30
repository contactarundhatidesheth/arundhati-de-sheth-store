/**
 * Download Decodent 2026 images from Google Drive
 * Run: node download_decodent_images.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'decodent');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const DRIVE_FILES = [
  { id: '1fnBmZzGZkiueBbvni4dIiUTJgR4qrCEd', name: 'decodent-001.jpg' },
  { id: '1JEDguAbISC4Qgk3Vv9Sibj_Lfasaszk2', name: 'decodent-002.jpg' },
  { id: '15EL1vzQsmb9sNa1VWgrgcP6BjXEMK4zz', name: 'decodent-003.jpg' },
  { id: '1iVGmmtPPRJVugmWc0ItyoZarQt1Br6ZK', name: 'decodent-004.jpg' },
  { id: '1yYdkHEsVrcrgUp7_jSr6KH1TkoD9yCxc', name: 'decodent-005.jpg' },
  { id: '1BECXj6NtodQ42HlOTX0ofUmA4XCmO6z2', name: 'decodent-006.jpg' },
  { id: '1N18je79ohAooIXaVmWYP_7iKH3YQHwxv', name: 'decodent-007.jpg' },
  { id: '1tnTJoq0bV_98hWlo4DeYxqfh36wiFiXZ', name: 'decodent-008.jpg' },
  { id: '1ZcFPjoLg1PA9Sa-27zFqpuATJtyF8sCb', name: 'decodent-009.jpg' },
  { id: '1uji-E64zIDQvFzuFYOJp4k8EQl0MXCMo', name: 'decodent-010.jpg' },
  { id: '1D59of8fWVFtMI1mqcaBnW8KcGQq_s2hG', name: 'decodent-011.jpg' },
  { id: '1pwd86s8zNDl_GU3EPySZXYJ806ys8Nty', name: 'decodent-012.jpg' },
  { id: '12LPeZvyTz32igho6Wa7dSpwqZvu_K6bz', name: 'decodent-013.jpg' },
  { id: '1aIEcp3C14Yw0RT5YbD4CVSP51w3d5u_G', name: 'decodent-014.jpg' },
  { id: '1Rj-f5ejloFuEqOSOoKu5dJUG9_0_4jAV', name: 'decodent-015.jpg' },
  { id: '1_JaoLWg3EWsYUIbNlMUgm-l-YgRJ66YC', name: 'decodent-016.jpg' },
  { id: '1CG_qpNHho1K9Q8auaQls-odIxiu3z3kn', name: 'decodent-017.jpg' },
  { id: '1jmKGSIwWQ_9Lttw8TqArfm4-Kb4NesQr', name: 'decodent-018.jpg' },
  { id: '1afZP3A3JPTMX5LxD3W111tvl6AL3f432', name: 'decodent-019.jpg' },
  { id: '1l6luzsChPNz_oGc-xNpV0DQgnxZVKwP-', name: 'decodent-020.jpg' },
  { id: '1i7ezOah0lRaAaOZUNkQqqcZy3ieZnWKw', name: 'decodent-021.jpg' },
  { id: '1U8lMBG-bSuUBWSwiOnkoe6IDwVcgb4EX', name: 'decodent-022.jpg' },
  { id: '1Yqwul2eTc_uQ1Rb8EtTE3XT-nnq-2EyS', name: 'decodent-023.jpg' },
  { id: '1VGn1JerILl6UFgMdnlqKPmWnffJfLuNk', name: 'decodent-024.jpg' },
  { id: '1cDCfNmogj_eNkeVRYWsgNrzdjPWuwqjl', name: 'decodent-025.jpg' },
  { id: '16Emz6xRZeZexgDeykIMOr9Rxv2HCG0yj', name: 'decodent-026.jpg' },
  { id: '1cOm1hNPh24aIncOgYHmw9WJsPwoNShC0', name: 'decodent-027.jpg' },
  { id: '13x_ThmtuE_46wTabWFI5LtiBbq-BQImM', name: 'decodent-028.jpg' },
  { id: '1cGVPp8aSrlvX29_QdfQVNcldteK8SSHQ', name: 'decodent-029.jpg' },
  { id: '163rstQGDKRbE15xz2mzmLQQ1dD4VFLUD', name: 'decodent-030.jpg' },
  { id: '1mcX2BwCYbR9nEmVa1o9QmlMmFSKHqZDA', name: 'decodent-031.jpg' },
  { id: '1cTHHA2aU3Ev0pAFRDAoudfgiucafWKu9', name: 'decodent-032.jpg' },
  { id: '1KQGPns9aRX5UH2O5Lwmn3un-O85UyK0g', name: 'decodent-033.jpg' },
  { id: '1CRGvbUETHDxdDKIMgAqrpkGpT3ACvLTR', name: 'decodent-034.jpg' },
  { id: '1k385Dc0LpULV1sTskiDTk9VaN4TBx7RY', name: 'decodent-035.jpg' },
  { id: '16Xlk5TRnu8aHyUdDNv70cAfoZJsw9c6F', name: 'decodent-036.jpg' },
  { id: '1dvR3wlov4XZYKrPeqq2w2kMFbygb2wTY', name: 'decodent-037.jpg' },
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
  console.log(`📁 Downloading ${DRIVE_FILES.length} Decodent 2026 images to public/decodent/...\n`);
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
