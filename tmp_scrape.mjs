import fs from 'fs';

const urls = [
    'https://www.arundhatidesheth.com/pages/disha-patani',
    'https://www.arundhatidesheth.com/pages/alia-bhatt-for-filmfare-glamour-style-awards-2019',
    'https://www.arundhatidesheth.com/pages/priyanka-chopra'
];

async function run() {
    for (const url of urls) {
        const res = await fetch(url);
        const html = await res.text();
        const matches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)];

        console.log(`\n=== Images for ${url.split('/').pop()} ===`);

        const uniqueLinks = new Set();
        for (const match of matches) {
            let src = match[1];
            if (src.startsWith('//')) src = 'https:' + src;
            // Filter out tiny icons or tracking pixels
            if (!src.includes('cdn/shop') || src.includes('.gif') || src.includes('icon')) continue;

            // Clean shopify crop sizes if possible (e.g. _100x100)
            src = src.replace(/_[0-9]+x[0-9]+(\.[a-z]+)$/i, '$1');
            uniqueLinks.add(src);
        }

        for (const link of uniqueLinks) {
            console.log(link);
        }
    }
}

run();
