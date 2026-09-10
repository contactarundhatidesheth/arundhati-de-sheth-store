require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testDB() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from('newsletter_subscribers').select('*').limit(1);
    if (error) {
        console.log('Error testing newsletter:', error.message);
    } else {
        console.log('Success! Table newsletter_subscribers exists:', data);
    }
}

testDB();
