require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const NEWS_ARTICLES = [
    { title: "Must-have jewellery pieces for a bridal trousseau, hand-picked by an expert", publisher: "Brides Today", link: "https://www.bridestoday.in/watches-and-jewellery/story/gilded-guidance-743619-2024-02-24", image: "https://www.arundhatidesheth.com/cdn/shop/files/659d187356833-n-must-haves-in-a-bridal-trousseau-095706553-16x9.jpg" },
    { title: "Mid-Day Article - 23rd September 2023 - Some of the finest jewellery pieces", publisher: "Mid-Day", link: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-sunday-dossier-23306978", image: "https://www.arundhatidesheth.com/cdn/shop/files/mid_day_article.jpg" },
    { title: "Jewellery connoisseur, Arundhati De-Sheth sheds light on her love for natural diamonds", publisher: "Only Natural Diamonds", link: "https://www.naturaldiamonds.com/in/love-diamonds/jewellery-journey-inspiration-of-diamond-diva-arundhati-de-sheth/", image: "https://www.arundhatidesheth.com/cdn/shop/files/Hero-Banner-1_bf6ec802-9835-4d98-b949-22801ef3e621.webp" },
    { title: "Arundhati De-Sheth's Expert Curation: Elevating Jewellery to Art", publisher: "GJEPC Solitaire International", link: "https://gjepc.org/solitaire/arundhati-de-sheths-expert-curation-elevating-jewellery-to-art/", image: "https://www.arundhatidesheth.com/cdn/shop/files/ARUNDHATI.jpg" },
    { title: "Why jewellery consultants are the new personal shoppers", publisher: "Vogue", link: "https://www.vogue.in/fashion/content/why-jewellery-consultants-are-the-new-personal-shoppers", image: "https://www.arundhatidesheth.com/cdn/shop/files/VOGUE.png" },
    { title: "In 2021, Engaged Couples Are Hiring \"Ring Whisperers\" To Source Their Dream Design", publisher: "British Vogue", link: "https://www.vogue.co.uk/fashion/article/engagement-ring-concierge", image: "https://www.arundhatidesheth.com/cdn/shop/files/RG_15.2.21_Dina-kamal-engagement-ring-concierge-02.webp" },
    { title: "Curator of the exquisite, Arundhati De-Sheth is your go-to person for irresistible jewellery", publisher: "LUXEBOOK", link: "https://luxebook.in/arundhati-de-sheth-is-your-go-to-person-for-irresistible-jewellery/", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_c8a89625059f41bfa4c4431017984e3d_mv2_1.jpg" },
    { title: "Meet Arundhati De Sheth, the bespoke jewellery consultant", publisher: "The Hindu", link: "https://www.thehindu.com/life-and-style/luxury/meet-arundhati-de-sheth-the-bespoke-jewellery-consultant/article30050420.ece", image: "https://www.arundhatidesheth.com/cdn/shop/files/Image_for_THE_HINDU.jpg" },
    { title: "Happy Shiny Things - Feature", publisher: "GRAZIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_af843dfeb1ff411d814d72612595a29f_mv2.png" },
    { title: "Pieces to Wear at Your Wedding", publisher: "HARPER'S BAZAAR INDIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_c5497b11e7b4424d9b5fe1944602337a_mv2.jpg" },
    { title: "Insider Secrets & the Accessories to Covet", publisher: "HARPER'S BAZAAR INDIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_16b52900c968437dafcdb7c0018ccb3c_mv2.jpg" }
];

async function seed() {
    for (let i = 0; i < NEWS_ARTICLES.length; i++) {
        const item = NEWS_ARTICLES[i];
        const payload = {
            id: Date.now().toString() + i,
            publication: item.publisher,
            title: item.title,
            link: item.link,
            image: item.image,
            date: 'N/A',
            excerpt: '',
            sequence: i
        };

        // Check if it already exists to prevent duplicate runs
        const { data } = await supabase.from('blogs').select('*').eq('title', item.title).single();
        if (!data) {
            await supabase.from('blogs').insert(payload);
            console.log('Inserted: ' + item.title);
        } else {
            console.log('Skipped (Exists): ' + item.title);
        }
    }
    console.log('Seeded successfully!');
}

seed().catch(console.error);
