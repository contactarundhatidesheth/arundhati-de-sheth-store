require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function checkOrders() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from('orders').select('*');
    if (error) {
        console.error('Error fetching orders:', error.message);
    } else {
        console.log('Orders found with Anon Key:', data.length);
        console.log(data.map(o => o.id));
    }
}
checkOrders();
