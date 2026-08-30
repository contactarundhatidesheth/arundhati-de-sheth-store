const fs = require('fs');
const https = require('https');
const path = require('path');

const dir = path.join(__dirname, 'public', 'whatsnewimages');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const images = [
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Image_for_COSMOPOLITAN_2.png?v=1709671240', name: 'disha2.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Image_for_COSMOPOLITAN_1.png?v=1709671240', name: 'disha1.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/image.jpg?v=1709644310', name: 'alia2.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Alia.png?v=1709645225', name: 'alia1.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/image_15_6331350e-bd1e-48a8-b4dd-274e04ac034c.jpg?v=1689599173', name: 'PC_Reception_Mumbai.jpg' },
  { url: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/6ef918_f69fd5cb35184225ae4e24ec8cdcf7ad_mv2.jpg?v=1709674066', name: 'IMG-5690.jpg' },
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
