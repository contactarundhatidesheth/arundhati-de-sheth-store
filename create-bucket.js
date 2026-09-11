import { createClient } from '@supabase/supabase-js';

async function createMediaBucket() {
    const supabaseUrl = 'https://radmagmbzuubeqjrncot.supabase.co';
    const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzc0MzgwMiwiZXhwIjoyMTAzMzE5ODAyfQ.QpclPWrif6Nlj4QrD2VBHp1OUw83hOU-IQEaJwuD58E';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("Connecting to Supabase Admin interface...");

    try {
        const { data, error } = await supabase.storage.createBucket('media', {
            public: true,
            allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4'],
            fileSizeLimit: 10485760 // 10MB
        });

        if (error) {
            if (error.message.includes('already exists') || error.code === 'BucketAlreadyExists') {
                console.log("Bucket already exists. Ignoring.");
                await supabase.storage.updateBucket('media', { public: true });
            } else {
                console.error("Failed to create bucket:", error);
                process.exit(1);
            }
        } else {
            console.log("✅ Successfully created `media` bucket in Supabase production:", data);
        }

    } catch (e) {
        console.error("Exception:", e);
    }
}

createMediaBucket();
