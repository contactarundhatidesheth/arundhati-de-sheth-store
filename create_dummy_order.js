require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function insertDummyOrder() {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const dummyOrder = {
        user_id: null,
        user_email: "demo_guest@example.com",
        user_phone: "+919876543210",
        razorpay_order_id: "order_DUMMY_DEMO_999",
        amount: 145000,
        status: 'Pending',
        shipping_address: {
            name: "Demo Customer",
            line1: "4B Seaview Apartments",
            line2: "Carter Road, Bandra West",
            city: "Mumbai",
            state: "Maharashtra",
            zip: "400050",
            tracking_number: null
        },
        items: [
            { product: { id: "mock_1", title: "Arundhati Classic Diamond Tennis Bracelet", price: 145000, images: ["https://www.arundhatidesheth.com/cdn/shop/files/IMG_8709_1.jpg"] }, quantity: 1 }
        ]
    };

    const { data, error } = await supabase.from('orders').insert([dummyOrder]).select();
    if (error) {
        console.error('Error inserting mock order:', error);
    } else {
        console.log('Dummy order strictly created:', data[0].id);
    }
}

insertDummyOrder();
