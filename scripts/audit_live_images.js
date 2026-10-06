const https = require('https');
const http = require('http');

function fetchUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(url);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).toString();
          return fetchUrl(redirectUrl).then(resolve);
        }
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
          resolve({ status: res.statusCode, data, headers: res.headers });
        });
      });
      req.on('error', (err) => resolve({ error: err.message }));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({ error: 'Timeout' });
      });
    } catch (e) {
      resolve({ error: e.message });
    }
  });
}

function checkImage(imgUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(imgUrl);
      const client = parsed.protocol === 'https:' ? https : http;
      const req = client.request(imgUrl, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, imgUrl).toString();
          return checkImage(redirectUrl).then(resolve);
        }
        resolve({ url: imgUrl, status: res.statusCode, contentType: res.headers['content-type'] });
      });
      req.on('error', (err) => resolve({ url: imgUrl, error: err.message }));
      req.setTimeout(10000, () => {
        req.destroy();
        resolve({ url: imgUrl, error: 'Timeout' });
      });
      req.end();
    } catch (e) {
      resolve({ url: imgUrl, error: e.message });
    }
  });
}

const pagesToCheck = [
  'https://www.arundhatidesheth.com/',
  'https://www.arundhatidesheth.com/about',
  'https://www.arundhatidesheth.com/collections',
  'https://www.arundhatidesheth.com/category/all-products',
  'https://www.arundhatidesheth.com/category/ephemerals',
  'https://www.arundhatidesheth.com/category/perennials',
  'https://www.arundhatidesheth.com/timeline',
  'https://www.arundhatidesheth.com/pages/whats-new',
  'https://www.arundhatidesheth.com/contact',
  'https://www.arundhatidesheth.com/faq',
  'https://www.arundhatidesheth.com/shipping',
  'https://www.arundhatidesheth.com/terms',
  'https://www.arundhatidesheth.com/payment',
];

async function run() {
  console.log('Testing direct brand assets...');
  const brandAssets = [
    'https://www.arundhatidesheth.com/brand/logo.png',
    'https://www.arundhatidesheth.com/brand/logo-black.png',
    'https://www.arundhatidesheth.com/logo.png',
  ];
  for (const asset of brandAssets) {
    const res = await checkImage(asset);
    console.log(`Asset: ${asset} -> Status: ${res.status} (${res.contentType || res.error})`);
  }

  console.log('\nScanning pages for image URLs...');
  const allImageUrls = new Set();
  const pageErrors = [];

  for (const pageUrl of pagesToCheck) {
    const res = await fetchUrl(pageUrl);
    if (res.error || res.status !== 200) {
      pageErrors.push(`${pageUrl} returned status ${res.status || res.error}`);
      continue;
    }
    // Extract img src and background images
    const regex = /<img[^>]+src=["']([^"']+)["']/gi;
    let match;
    let count = 0;
    while ((match = regex.exec(res.data)) !== null) {
      let src = match[1].replace(/&amp;/g, '&');
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = new URL(src, pageUrl).toString();
      allImageUrls.add(src);
      count++;
    }
    console.log(`Page ${pageUrl}: found ${count} images.`);
  }

  console.log(`\nFound ${allImageUrls.size} unique image URLs to test.`);
  const failedImages = [];
  let checked = 0;
  for (const img of Array.from(allImageUrls)) {
    const res = await checkImage(img);
    checked++;
    if (res.status !== 200) {
      console.log(`[FAILED ${res.status || res.error}] ${img}`);
      failedImages.push({ url: img, status: res.status, error: res.error });
    }
  }

  console.log(`\nAudit completed: ${checked} checked, ${failedImages.length} failed, ${pageErrors.length} page errors.`);
  if (failedImages.length > 0) {
    console.log('Failed images detail:', JSON.stringify(failedImages, null, 2));
  }
}

run();
