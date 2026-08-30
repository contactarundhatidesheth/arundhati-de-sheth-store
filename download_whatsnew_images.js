const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'whatsnewimages');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/files/disha2.jpg', name: 'disha2.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/files/disha1.jpg', name: 'disha1.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/files/alia2.jpg', name: 'alia2.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/files/alia1.jpg', name: 'alia1.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/files/PC_Reception_Mumbai.jpg', name: 'PC_Reception_Mumbai.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0275/0287/0572/products/IMG-5690.jpg', name: 'IMG-5690.jpg' },
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
