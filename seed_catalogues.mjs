import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const originalCatalogues = [
    {
        title: 'Bonded',
        link: 'https://drive.google.com/file/d/1MQaLcFVZu4Sd3Oo1jF0cOn8A284o9ykp/view?usp=sharing',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Bonded_A_Rakshabhandan_Gifting_Guide.png?crop=center&height=1950&v=1787227227&width=1300'
    },
    {
        title: 'Decodent',
        link: 'https://drive.google.com/file/d/11mbSmNos-6wNh3VhEhAJYaYkuyOvu3Fd/view?usp=sharing',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?crop=center&height=900&v=1769505173&width=600'
    },
    {
        title: 'Shadow Games 2025',
        link: 'https://drive.google.com/file/d/1Tuty-w6Oye0wA9_SaNZu3kL-v0YHmzFq/view?usp=sharing',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Untitled_design_15.png?crop=center&height=1500&v=1757411098&width=1000'
    },
    {
        title: 'Prismatic',
        link: 'https://drive.google.com/file/d/16UfbZE84ItGHGBYKy9bddDlT3JCcLZH9/view?usp=sharing',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?crop=center&height=825&v=1744098043&width=550'
    },
    {
        title: 'Gildedage',
        link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Gildedage_without_price_compressed.pdf?v=1708935823',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/e-invite-Final.jpg?v=1708933697&width=3000'
    },
    {
        title: 'Call for Cocktails',
        link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Call_for_the_cocktails_compressed.pdf?v=1709730900',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1709731491&width=1200'
    },
    {
        title: 'Lightness Of Being',
        link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Lightness_of_Being_book_Price.pdf?v=1708935547',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708936623&width=550'
    },
    {
        title: 'Shadow Games',
        link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Shadow_games_compressed.pdf?v=1709642153',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/6ef918_dda50d76e89e497694803b84c6141c25_mv2.webp?crop=center&height=700&v=1708884745&width=700'
    },
    {
        title: 'Wave After Wave',
        link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Wave_After_Wave_ADS_Price-compressed_compressed_1.pdf?v=1708935358',
        image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_154631.png?v=1744107417&width=600'
    }
];

async function seed() {
    const { data: existing } = await supabase.from('catalogues').select('title');
    const existingTitles = existing ? existing.map(e => e.title) : [];

    let sequenceCount = 1;
    let addedCount = 0;

    for (const cat of originalCatalogues) {
        if (!existingTitles.includes(cat.title)) {
            const { error } = await supabase.from('catalogues').insert([
                {
                    id: Date.now().toString() + crypto.randomBytes(4).toString('hex'),
                    title: cat.title,
                    image: cat.image,
                    link: cat.link,
                    description: '',
                    year: '',
                    featured: false,
                    sequence: sequenceCount++
                }
            ]);
            if (error) {
                console.error(`Error inserting ${cat.title}:`, error);
            } else {
                console.log(`✅ Inserted ${cat.title}`);
                addedCount++;
            }
        } else {
            console.log(`⚠️ Skipped ${cat.title} (already exists)`);
        }
    }

    console.log(`\nFinished! Added ${addedCount} missing catalogues out of ${originalCatalogues.length}.`);
}

seed();
