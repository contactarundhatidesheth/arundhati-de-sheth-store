require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function createTestOrder() {
    // Use a predictable mock ID or razorpay ID
    const testRazorpayId = "order_test_secure_global";

    const { data, error } = await supabase.from('orders').insert({
        razorpay_order_id: testRazorpayId,
        user_email: "tracking@test.com",
        user_phone: "0000000000",
        amount: 9999,
        status: "Shipped",
        shipping_address: {
            name: "Test Tracker",
            tracking_number: "SGLJAI29898"
        },
        items: []
    }).select();

    if (error) {
        console.error("Failed to inject test order:", error);
    } else {
        console.log("SUCCESS. Created order with Razorpay ID:", testRazorpayId);
    }
}

createTestOrder();
