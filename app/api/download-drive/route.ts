import { NextResponse } from 'next/server';
import https from 'https';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'timeline');

export const DRIVE_FILES = [
  { name: 'timeline-kamyen.jpg', id: '1USgAyhsc8QdeZcCzl_0ddF10CMXPMSWa' },
  { name: 'timeline-ads-masaba-amrapali.jpg', id: '17gthYbxzzV7OHw-Q6umlRNAifCbWcR_4' },
  { name: 'timeline-british-vogue.webp', id: '1zvMXYCXJaLO-pq-wiedIhclszmyztICD' },
  { name: 'timeline-call-for-cocktails-1.jpeg', id: '1yGfvGO0vjgnK3pCgES4CXlmF-_zRBqXd' },
  { name: 'timeline-call-for-cocktails-2.jpeg', id: '1c3NO_ykiny-mOmFL-8vLQ7jnysfq2gLb' },
  { name: 'timeline-ficci-flow.jpg', id: '1SH4acOv26XQmSJk7HIVSbQctVNlzcXxC' },
  { name: 'timeline-gilded-age-1.jpg', id: '16VYeRvn1k9zlYyh8aSofNnqqyUN4ewMM' },
  { name: 'timeline-gilded-age-2.jpg', id: '1Cx_zd1kwlKd1qgFjlM7hctSKsMGJsqhm' },
  { name: 'timeline-gilded-age-3.jpg', id: '1xUMMHxVRlWYLi7wzATPfhpNbMRDnCp3n' },
  { name: 'timeline-gilded-age-bom.jpg', id: '1pLlaNLXthkbORGPWV1DxhHTtU3ncAB-W' },
  { name: 'timeline-hindu-article.jpg', id: '18cWeUIZhIlumc0WEOLEv6uXb5-4V5XQ4' },
  { name: 'timeline-but-a-dream.jpeg', id: '1f2T-N_xrgYhhBvg_4dJK51QhZdD0k7SN' },
  { name: 'timeline-jewellery-advisor.jpg', id: '12IWYqFf-IwprFpsGGuJopUu3I4l1FcyC' },
  { name: 'timeline-le-mill.jpg', id: '1JqmNpaakJpeMruuT0xTtNZN-G0KgscqW' },
  { name: 'timeline-le-mill-2.jpeg', id: '1J-bKIHrB8DoB1GTKjS7fUj9Ow2vsP9js' },
  { name: 'timeline-lightness-of-being.jpg', id: '1_PCMzYnAxtt4Itrl2QKQwDsl9VeVbOax' },
  { name: 'timeline-lightness-of-being-2.jpg', id: '1RbX7Jx5t4IC1wkR8lCKTgW3jA5Nr0TKw' },
  { name: 'timeline-lightness-of-being-3.jpg', id: '1ln6dOKnvRo2VfpaDdxmjkcoRCaotvFT2' },
  { name: 'timeline-only-natural-diamonds.jpg', id: '1M_Fr6nYYKIdruiUkB4H2h76vcwLe840w' },
  { name: 'timeline-pc1-3594.jpg', id: '10xsGC4TxK6bM-68ifJDwjutLOD-N_E-E' },
  { name: 'timeline-prismatic-1.jpg', id: '17eIgILnldxMvCDJO8HguFP1ZBQQDsJTd' },
  { name: 'timeline-prismatic-mumbai.jpg', id: '1q6LbvrVrElUt2F72pkfThGNgyi52lRT3' },
  { name: 'timeline-remarkable-women-1.jpg', id: '1X4hK8bPq3tzodYNGMr4a81ElAKTOVeb_' },
  { name: 'timeline-remarkable-women-2.jpg', id: '1nnGu4eg3u6ZU7rMiQuwxMjIrFm8JpX-N' },
  { name: 'timeline-remarkable-women-2019.jpg', id: '1aNfTcGjyWf3zx37Q_egZkgwYRCgtW8-P' },
  { name: 'timeline-shadow-games-22-1.jpg', id: '1JqzTInuw6IT4j7QReNcyZSScfLLs7wAU' },
  { name: 'timeline-shadow-games-22-2.jpg', id: '1PVs1JHNPBEVXeQGH73e4ml0fWqhuebEI' },
];

function downloadFile(fileId: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dest = path.join(OUTPUT_DIR, filename);
    if (fs.existsSync(dest)) return resolve();

    const initialUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    function request(url: string, redirectCount: number, cookie: string | null) {
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
        const cookieStr = setCookie ? setCookie.map((c: string) => c.split(';')[0]).join('; ') : cookie;

        if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
          return request(res.headers.location!, redirectCount + 1, cookieStr || null);
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
              return request(confirmUrl, redirectCount + 1, cookieStr || null);
            }
            const altUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download&confirm=t`;
            return request(altUrl, redirectCount + 1, cookieStr || null);
          });
          return;
        }

        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', err => { fs.unlink(dest, () => {}); reject(err); });
      }).on('error', reject);
    }
    request(initialUrl, 0, null);
  });
}

export async function GET() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  
  let started = 0;
  for (const f of DRIVE_FILES) {
    const dest = path.join(OUTPUT_DIR, f.name);
    if (!fs.existsSync(dest)) {
      started++;
      downloadFile(f.id, f.name).catch(console.error);
    }
  }
  
  return NextResponse.json({ success: true, message: `Downloading ${started} new files in background...` });
}
