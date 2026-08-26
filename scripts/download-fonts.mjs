import { createWriteStream, mkdirSync } from 'fs';
import { get } from 'https';
import { join } from 'path';

const fontsDir = join(process.cwd(), 'public', 'fonts');
mkdirSync(fontsDir, { recursive: true });

const files = [
  {
    url: 'https://github.com/CowboyCollective/CopperplateCC/raw/refs/heads/master/fonts/ttf/CopperplateCC-Bold.ttf',
    dest: join(fontsDir, 'CopperplateCC-Bold.ttf'),
  },
  {
    url: 'https://github.com/CowboyCollective/CopperplateCC/raw/refs/heads/master/fonts/ttf/CopperplateCC-Heavy.ttf',
    dest: join(fontsDir, 'CopperplateCC-Heavy.ttf'),
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    const request = get(url, (response) => {
      // Follow redirects
      if (response.statusCode === 302 || response.statusCode === 301) {
        file.close();
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${dest}`);
        resolve();
      });
    });
    request.on('error', (err) => {
      file.close();
      reject(err);
    });
  });
}

for (const f of files) {
  console.log(`Downloading ${f.url}...`);
  await download(f.url, f.dest);
}

console.log('All fonts downloaded!');
