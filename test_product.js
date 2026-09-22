require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Using service role key for admin access
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testProductInsert() {
    const payload = {
        id: "test-" + Date.now(),
        handle: "test-handle-" + Date.now(),
        title: "Test Product",
        description: "Test description",
        price: 100,
        category: "Test",
        metal: "Test",
        collection: "Test",
        tags: ["test"],
        images: ["https://example.com/image.jpg"],
        is_new: true,
        sequence: 1,
        specs: {
            purity: "24k",
            weight: "10g",
            dimensions: "1x1",
            gemstones: "None",
            careInstructions: "None",
            customSpecs: "None"
        }
    };

    console.log("Attempting to insert product...");
    const { data, error } = await supabase.from('products').upsert(payload).select();

    if (error) {
        console.error("Error inserting product:", error);
    } else {
        console.log("Success:", data);
    }
}

testProductInsert();
