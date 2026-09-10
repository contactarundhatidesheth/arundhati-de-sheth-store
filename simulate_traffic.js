async function sendEvent(type, id, referrer) {
    try {
        const res = await fetch('http://localhost:3000/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type, id, referrer })
        });
        console.log(`Sent ${type}: Status ${res.status}`);
    } catch (e) {
        console.error(e.message);
    }
}

async function run() {
    console.log('Simulating Traffic...');

    // 3 Instagram views
    await sendEvent('page_view', null, 'https://instagram.com/arundhatidesheth');
    await sendEvent('page_view', null, 'https://instagram.com/somepost');
    await sendEvent('page_view', null, 'https://l.instagram.com/');

    // 2 Google views
    await sendEvent('page_view', null, 'https://google.com');
    await sendEvent('page_view', null, 'https://google.co.in');

    // Product views
    await sendEvent('product_view', 'ephemerals-gold-ring-01', null);
    await sendEvent('product_view', 'ephemerals-gold-ring-01', null);
    await sendEvent('product_view', 'ephemerals-silver-necklace-02', null);

    // WhatsApp click
    await sendEvent('whatsapp_click', null, null);

    console.log('Traffic simulation complete');
}

run();
