/**
 * Download all 50 Product Images from Google Drive
 * Run: node download_drive_products.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'public', 'products');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Drive File IDs for images 1–50
const DRIVE_FILES = [
  { id: '1QP8t3j5fAYgZHA29VUZc06DMLG05sK8z', name: '1.png' },
  { id: '14of5QJ7XCPqMrNjm4ReHyV-8qRS9DhZG', name: '2.png' },
  { id: '1-Dfss329eyDWMliqgI97maQ5OJG-EUkW', name: '3.png' },
  { id: '1srW4F6AV72GkXCXNtoo0Ar3VKXs8v9Yu', name: '4.png' },
  { id: '18dI_L8Ha5FQ5FWem09gOmvSbVvjRx5-0', name: '5.png' },
  { id: '1bN9YCSxk00-C4ZgHHytEZ58HN6J8US5D', name: '6.png' },
  { id: '1_j6VNYvl-nIQoBWnQNEnNN6ntBEzsllo', name: '7.png' },
  { id: '1fPsYovNcPQHIZh3EDGXUQoxGk6Tw6dwH', name: '8.png' },
  { id: '149JRXS8skBTV7Bmkfy85CuznWEk_lHCZ', name: '9.png' },
  { id: '11vmoVGp3tHheEMN6teNFP9wUMzI-wM_r', name: '10.png' },
  { id: '1IM3HAcnTWNN4tjfQUtzszn1A-pzS9EVD', name: '11.png' },
  { id: '1bH_jqdfGxqDfYml1x6NOYB41xr5cHAQg', name: '12.png' },
  { id: '1UrtOIM0inB_BJozaLl2rXEygfAy5x-O3', name: '13.png' },
  { id: '1oUjQJodiaKKVcT0Byy5_I6gpg8VBmBwn', name: '14.png' },
  { id: '1aQrg6pJCeuclIe0BFPEeLTz9acvNVgRt', name: '15.png' },
  { id: '1eKWrlb6LFk5p9juHzm3K9XxdnlKCWYne', name: '16.png' },
  { id: '138vdVrIz1wnkgcDdG3nfe1XPZawSvic0', name: '17.png' },
  { id: '1aDV95QXgoch_8oibCa93AkijcyFFKcfh', name: '18.png' },
  { id: '1cjEF8XCGgDvGjZ1X0Ck-e3qpBOjMs5ay', name: '19.png' },
  { id: '1bLayWL063xL2xaCrJmw-am_YE-biaf1o', name: '20.png' },
  { id: '1KU5QDtlIqqyg_4wQRnOrniOxCMXirWC6', name: '21.png' },
  { id: '19vrW87nbLNmLhscUFBlX1I0jb1Iuuphx', name: '22.png' },
  { id: '1OlWtJ3EGP9KsNyex3CBR3SEL83KOvdGx', name: '23.png' },
  { id: '1ghbTYQrjzG831bycnqf7BbyG3G8DzuVa', name: '24.png' },
  { id: '1dDhOoUIqaYO99O4jqOzk2IFlY2dP7wC9', name: '25.png' },
  { id: '1FL3Cs7Ix1JHRbPPcu-DEakBvujTlOWwP', name: '26.png' },
  { id: '1it9JOhW2_j6CDxHVy0wH5OiONS3uCr67', name: '27.png' },
  { id: '1Ef8R5xEjnNxfBfVVBRXeM1a5Vsfql41m', name: '28.png' },
  { id: '1dLvFYSAuugGG_aMrFd30RUBG-6xUq4M_', name: '29.png' },
  { id: '14l2iTDWtW-MWhcqQ5oXhFHlkLhYYwPSe', name: '30.png' },
  { id: '19NQqOqDGSmIucqE65adtznHPPCyoDSw6', name: '31.png' },
  { id: '16llB40_Hfi8Ga0w5QJUOYVArbFlwrO2l', name: '32.png' },
  { id: '1Npn8jYx8GPhJC_Y0FRUhlcZDlrtgvRwe', name: '33.png' },
  { id: '1IA70ryreH_xaBgFj33EEcXwYxk_l63PC', name: '34.png' },
  { id: '1FamHlsmMKY0GzRk-xjMrLDT9Z0FM3TgJ', name: '35.png' },
  { id: '1B-6lGgYQ9_33SUQQWldeZHm6w2mgfYhU', name: '36.png' },
  { id: '1-ncN6n_rc1xi8_st5Rz8TVnFYkTmWTId', name: '37.png' },
  { id: '1MgPLQvicqN4ZB5xFThjP_2ebv_1hQIxk', name: '38.png' },
  { id: '1suFTyl61q1i80OobRQt5L950thSm8HDW', name: '39.png' },
  { id: '1GUM5P-RKMMYpo2v6XWlh3SYhsRDOvkjI', name: '40.png' },
  { id: '1fOjWpiCwmSFepkxYf1Es3JTKLk2STvlI', name: '41.png' },
  { id: '1ytmJLdCfW32V7ZXvkFrGnSPqjoWUfYwq', name: '42.png' },
  { id: '1gyEZ-KFb2iWztph4BvpkAC3FQmPoz3lB', name: '43.png' },
  { id: '1wWe3oigehAkYrNBtLu1e5tPdEscmt2gI', name: '44.png' },
  { id: '1bAgJ5-_FynwYEH5EblBb0WS-xY7tslOU', name: '45.png' },
  { id: '1egaCHdH8Uz_cFtXUWU6_wZMFTImJY7Th', name: '46.png' },
  { id: '1T3tLjRFUag5bwFu6NXpqEIDFP6NFgyR-', name: '47.png' },
  { id: '1cJu2D8-RUsz2_pEpBvpQFEbvNoLCIE53', name: '48.png' },
  { id: '1TFwpmPrs6xMp_SAIO5eP6DinVfWrfq5e', name: '49.png' },
  { id: '1bgJMA7waLbytjDPXI-Z7nWq64epi4OBM', name: '50.png' },
];

function downloadFile(fileId, filename) {
  return new Promise((resolve, reject) => {
    const dest = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(dest)) {
      console.log(`⏭️  Skipping ${filename} (already exists)`);
      return resolve();
    }

    // Step 1: Hit the download URL — Google returns 303 to a confirm page
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

        // Check content type — if HTML, it's the confirm page; extract confirm token
        const contentType = res.headers['content-type'] || '';
        if (contentType.includes('text/html')) {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            // Extract confirm token from the page
            const match = body.match(/confirm=([0-9A-Za-z_\-]+)/) || body.match(/&amp;confirm=([^&"]+)/);
            if (match) {
              const confirmUrl = `https://drive.google.com/uc?export=download&confirm=${match[1]}&id=${fileId}`;
              return request(confirmUrl, redirectCount + 1, cookieStr);
            }
            // Try the newer Google Drive download format
            const altUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
            return request(altUrl, redirectCount + 1, cookieStr);
          });
          return;
        }

        // It's the actual file — pipe to disk
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
  console.log(`📁 Downloading ${DRIVE_FILES.length} product images to public/products/...\n`);
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
