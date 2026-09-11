import { createClient } from '@supabase/supabase-js';

export const getSupabaseAdmin = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
        throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set in the environment.');
    }

    if (!supabaseServiceKey) {
        // Warning log for Vercel edge/build time issues instead of silent fallback.
        console.warn('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing. Admin features may fail.');
    }

    return createClient(
        supabaseUrl,
        supabaseServiceKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzc0MzgwMiwiZXhwIjoyMTAzMzE5ODAyfQ.QpclPWrif6Nlj4QrD2VBHp1OUw83hOU-IQEaJwuD58E'
    );
};
