async function trigger() {
    try {
        const res = await fetch('http://localhost:3001/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: 245000,
                cartItems: [{ product: { id: "prod_mock_final", title: "Arundhati Classic Diamond Tennis Bracelet", price: 245000, images: ["https://www.arundhatidesheth.com/cdn/shop/files/IMG_8709_1.jpg"] }, quantity: 1 }],
                guestName: "Demo Guest Viewer",
                guestEmail: "hello@admin-test.com",
                guestPhone: "+919876543210",
                shippingAddress: {
                    line1: "4B Seaview Apartments",
                    line2: "Carter Road, Bandra West",
                    city: "Mumbai",
                    state: "Maharashtra",
                    zip: "400050"
                }
            })
        });
        const data = await res.json();
        console.log("Successfully bridged Razorpay & Supabase natively:", data);
    } catch (e) {
        console.error(e);
    }
}
trigger();
