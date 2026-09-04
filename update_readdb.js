const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/timeline/page.tsx',
  'app/product/[handle]/page.tsx',
  'app/admin/actions.ts',
  'app/api/db/route.ts',
  'app/api/track/route.ts',
  'app/api/migrate/route.ts',
  'app/admin/(dashboard)/blogs/page.tsx',
  'app/admin/(dashboard)/blogs/[id]/edit/page.tsx',
  'app/admin/(dashboard)/timeline/page.tsx',
  'app/admin/(dashboard)/page.tsx',
  'app/admin/(dashboard)/timeline/[id]/edit/page.tsx',
  'app/admin/(dashboard)/products/page.tsx',
  'app/admin/(dashboard)/products/[id]/edit/page.tsx',
  'app/admin/(dashboard)/testimonials/page.tsx',
  'app/admin/(dashboard)/testimonials/[id]/edit/page.tsx',
  'app/admin/(dashboard)/catalogues/page.tsx',
  'app/admin/(dashboard)/catalogues/[id]/edit/page.tsx',
  'app/collections/page.tsx',
  'app/collections/[id]/page.tsx',
  'app/pages/whats-new/page.tsx',
  'app/category/[category]/page.tsx',
  'app/page.tsx'
];

function updateFiles(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.next') {
        updateFiles(fullPath);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('readDB()') && !content.includes('await readDB()')) {
        // Replace const db = readDB() with const db = await readDB()
        content = content.replace(/const (\w+) = readDB\(\);/g, 'const $1 = await readDB();');
        
        // Ensure function is async
        // Match export default function XYZ or export function XYZ
        content = content.replace(/export default function (\w+)/g, 'export default async function $1');
        content = content.replace(/export function (\w+)/g, 'export async function $1');
        
        // Special case for GET/POST handlers
        content = content.replace(/export async async function/g, 'export async function'); // in case it was already async

        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

updateFiles(path.join(__dirname, 'app'));
console.log('Update complete.');
