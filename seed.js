const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    'https://radmagmbzuubeqjrncot.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzc0MzgwMiwiZXhwIjoyMTAzMzE5ODAyfQ.QpclPWrif6Nlj4QrD2VBHp1OUw83hOU-IQEaJwuD58E'
);

async function main() {
    const { data, error } = await supabase.from('seen_on_features').upsert([
        {
            id: 'disha-patani',
            title: 'Disha Patani',
            subtitle: 'for Cosmopolitan, Feb \\'20',
      description: 'Disha Patani is on the cover of Cosmopolitan India in rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black enamel detailing and colourless diamond solitaires.',
            image1: '/whatsnewimages/disha1.jpg',
            image2: '/whatsnewimages/disha2.jpg',
            link: 'https://www.arundhatidesheth.com/pages/disha-patani',
            sequence: 3
        },
        {
            id: 'alia-bhatt',
            title: 'Alia Bhatt',
            subtitle: 'styled in Rings from Arundhati\\'s line at Le Mill for Filmfare 2019',
      description: 'She is wearing multiple rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black and white enamel detailing and colourless diamond solitaires. The pieces are contemporary and extremely easy to wear daily, or for occasions.',
            image1: '/whatsnewimages/alia1.jpg',
            image2: '/whatsnewimages/alia2.jpg',
            link: 'https://www.arundhatidesheth.com/pages/alia-bhatt-for-filmfare-glamour-style-awards-2019',
            sequence: 2
        },
        {
            id: 'priyanka-chopra',
            title: 'Priyanka Chopra Wedding Reception',
            subtitle: '',
            description: 'A last-minute phone call from Bride - Priyanka Chopra\\'s garment designers, led to a 48-hour hunt, identifying jewellery pieces for the ace actor\\'s glamorous Mumbai reception for her Bollywood fraternity. She wore a two-row diamond rivière necklace with two magnificent, yellow cut-cornered Cushion-shaped diamonds, Classic Diamond drop earrings featuring a pair of stellar natural Yellow hexagonal-shaped diamonds and a ring with a fancy yellow 7 carat cushion-cut diamond center.',
            image1: '/whatsnewimages/IMG-5690.jpg',
            image2: '/whatsnewimages/PC_Reception_Mumbai.jpg',
            link: 'https://www.arundhatidesheth.com/pages/priyanka-chopra',
            sequence: 1
        }
    ]);

    if (error) {
        console.error('Error inserting data:', error);
    } else {
        console.log('Successfully seeded seen_on_features!');
    }
}

main();
