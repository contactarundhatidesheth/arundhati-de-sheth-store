import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = [
    'products',
    'catalogues',
    'blogs',
    'testimonials',
    'timeline_events',
    'page_sections',
    'youtube_videos',
    'seen_on_features',
    'inquiries',
    'orders'
];

async function checkTables() {
    console.log("Checking Supabase tables...\n");
    for (const table of tables) {
        const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
        if (error) {
            console.log(`❌ Table '${table}' Error: ${error.message}`);
        } else {
            console.log(`✅ Table '${table}' OK - Count: ${count}`);
        }
    }
}

checkTables();
