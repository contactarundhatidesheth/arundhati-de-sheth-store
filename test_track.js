require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testFetch() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data, error } = await supabase.from('orders').select('*').eq('razorpay_order_id', 'order_TaVbPx10Id3ggH');
    if (error) {
        console.error('Error fetching order:', error.message);
    } else {
        console.log('Order lookup returned:', data.length);
        console.log(data);
    }
}
testFetch();
