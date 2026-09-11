require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://radmagmbzuubeqjrncot.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseKey) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
    const tables = [
        'products',
        'catalogues',
        'blogs',
        'testimonials',
        'timeline_events',
        'orders',
        'order_items',
        'analytics_events'
    ];

    console.log("=== SUPABASE HEALTH CHECK ===");
    for (const table of tables) {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            if (error.code === '42P01') {
                console.log(`❌ Table missing: ${table}`);
            } else {
                console.log(`⚠️ Error accessing ${table}:`, error.message);
            }
        } else {
            console.log(`✅ Table exists: ${table}`);
        }
    }

    // Check storage bucket
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) {
        console.log("⚠️ Error accessing storage buckets:", bucketError.message);
    } else {
        const mediaBucket = buckets.find(b => b.name === 'media');
        if (mediaBucket) {
            console.log(`✅ Bucket exists: media`);
        } else {
            console.log(`❌ Bucket missing: media`);
        }
    }
}

checkTables();
