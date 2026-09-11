import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

async function testUpload() {
    const supabaseUrl = 'https://radmagmbzuubeqjrncot.supabase.co';
    const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzc0MzgwMiwiZXhwIjoyMTAzMzE5ODAyfQ.QpclPWrif6Nlj4QrD2VBHp1OUw83hOU-IQEaJwuD58E';

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    console.log("Supabase Client initialized with Service Role Key (fallback)");

    try {
        const fileBuffer = fs.readFileSync('./hero-exact.png');
        console.log("Read local image hero-exact.png successfully.");

        const filename = `test-direct-upload-${Date.now()}.png`;

        const { data, error } = await supabase.storage
            .from('media')
            .upload(filename, fileBuffer, {
                contentType: 'image/png',
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage Error:", error);
            process.exit(1);
        }

        console.log("Upload Success:", data);

    } catch (e) {
        console.error("Runtime exception:", e);
    }
}

testUpload();
