async function run() {
    console.log('--- Testing Guest Order Creation ---');
    let orderId = '';
    try {
        const res = await fetch('http://localhost:3000/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 25000,
                cartItems: [{ product: { id: 1, title: 'Test Guest Item', price: 25000, images: [''] }, quantity: 1 }],
                shippingAddress: {},
                guestEmail: 'guest_shopper@example.com',
                guestPhone: '5551234567'
            })
        });

        console.log('Create Order Status:', res.status);
        const data = await res.json();
        console.log('Create Order Response:', data);

        if (res.ok && data.orderId) {
            orderId = data.orderId;
        } else {
            process.exit(1);
        }
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }

    console.log('\n--- Testing Guest Tracking Portal ---');
    try {
        const res = await fetch('http://localhost:3000/api/track-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orderId: orderId,
                emailOrPhone: '555 123 4567' // test phone with spaces to ensure trim works
            })
        });

        console.log('Track Order Status:', res.status);
        const data = await res.json();
        console.log('Track Order Details:', data.order ? data.order.razorpay_order_id : data.error);

    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
}
run();
