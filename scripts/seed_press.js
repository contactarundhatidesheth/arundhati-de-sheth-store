require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const legacyPress = [
    {
        title: "Must-have jewellery pieces for a bridal trousseau, hand-picked by an expert",
        publication: "Brides Today",
        link: "https://www.bridestoday.in/watches-and-jewellery/story/gilded-guidance-743619-2024-02-24"
    },
    {
        title: "Mid-Day Article - 23rd September 2023 - Some of the finest jewellery pieces",
        publication: "Mid-Day",
        link: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-sunday-dossier-23306978"
    },
    {
        title: "Jewellery connoisseur, Arundhati De-Sheth sheds light on her love for natural diamonds",
        publication: "Only Natural Diamonds",
        link: "https://www.naturaldiamonds.com/in/love-diamonds/jewellery-journey-inspiration-of-diamond-diva-arundhati-de-sheth/"
    },
    {
        title: "Arundhati De-Sheth’s Expert Curation: Elevating Jewellery to Art",
        publication: "GJEPC Solitaire International",
        link: "https://gjepc.org/solitaire/arundhati-de-sheths-expert-curation-elevating-jewellery-to-art/"
    },
    {
        title: "Why jewellery consultants are the new personal shoppers",
        publication: "Vogue",
        link: "https://www.vogue.in/fashion/content/why-jewellery-consultants-are-the-new-personal-shoppers"
    },
    {
        title: "In 2021, Engaged Couples Are Hiring “Ring Whisperers” To Source Their Dream Design",
        publication: "British Vogue",
        link: "https://www.vogue.co.uk/fashion/article/engagement-ring-concierge"
    },
    {
        title: "Curator of the exquisite, Arundhati De-Sheth is your go-to person for irresistible jewellery",
        publication: "LUXEBOOK",
        link: "https://luxebook.in/arundhati-de-sheth-is-your-go-to-person-for-irresistible-jewellery/"
    },
    {
        title: "Meet Arundhati De Sheth, the bespoke jewellery consultant",
        publication: "The Hindu",
        link: "https://www.thehindu.com/life-and-style/luxury/meet-arundhati-de-sheth-the-bespoke-jewellery-consultant/article30050420.ece"
    },
    {
        title: "Happy Shiny Things - Feature",
        publication: "GRAZIA",
        link: "https://www.arundhatidesheth.com/blogs/news/happy-shiny-things"
    },
    {
        title: "Pieces to Wear at Your Wedding",
        publication: "HARPER'S BAZAAR INDIA",
        link: "https://www.arundhatidesheth.com/blogs/news/pieces-to-wear-at-your-wedding"
    },
    {
        title: "Insider Secrets & the Accessories to Covet",
        publication: "HARPER'S BAZAAR INDIA",
        link: "https://www.arundhatidesheth.com/blogs/news/pieces-to-wear-at-your-wedding"
    },
    {
        title: "A Love For Exquisite Jewels With Arundhati De-Sheth",
        publication: "YouTube - Watch",
        link: "https://www.youtube.com/watch?v=Eq5pvXOYCBQ"
    },
    {
        title: "Arundhati De-Sheth | France Alumni Ambassador 2021-23",
        publication: "YouTube - Watch",
        link: "https://www.youtube.com/watch?v=gceVmPM0jPM"
    },
    {
        title: "Everyday Diamond Essentials | Vogue India x Natural Diamond",
        publication: "YouTube - Watch",
        link: "https://www.youtube.com/watch?v=8Nox5-GGDus"
    },
    {
        title: "In conversation with Arundhati De Seth",
        publication: "YouTube - Watch",
        link: "https://www.youtube.com/watch?v=ef33KBbhz-c"
    }
];

async function seed() {
    console.log('Clearing existing old blogs...');
    await supabase.from('blogs').delete().neq('id', '999999'); // Delete all

    console.log('Seeding ' + legacyPress.length + ' legacy press articles...');

    let seq = 1;
    const insertPayloads = legacyPress.map(press => ({
        id: Date.now().toString() + Math.random().toString().slice(2, 6),
        title: press.title,
        publication: press.publication,
        date: '2024',
        excerpt: press.excerpt || ('Featured in ' + press.publication + '|||' + press.link),
        image: '/pressimages/press-1.png',
        sequence: seq++
    }));

    const { data, error } = await supabase.from('blogs').upsert(insertPayloads);

    if (error) {
        console.error('Error seeding:', error);
    } else {
        console.log('Successfully seeded legacy press articles!');
    }
}

seed();
