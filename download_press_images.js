const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'pressimages');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { url: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=800', name: 'press-1.png' },
  { url: 'https://www.arundhatidesheth.com/cdn/shop/files/PASTELGIRANDOLEEARRINGS1_1.jpg?v=1708934384&width=800', name: 'press-2.jpg' },
  { url: 'https://www.arundhatidesheth.com/cdn/shop/files/DICERING4.jpg?v=1709288209&width=800', name: 'press-3.jpg' },
  { url: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708934384&width=800', name: 'press-4.png' },
  { url: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?v=1708934384&width=1600', name: 'press-hero.png' },
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

async function downloadAll() {
  for (const img of images) {
    const dest = path.join(dir, img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await download(img.url, dest);
      console.log(`Saved ${img.name}`);
    } catch (e) {
      console.error(`Failed to download ${img.name}`, e);
    }
  }
  console.log('Done downloading images.');
}

downloadAll();
