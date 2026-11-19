import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://radmagmbzuubeqjrncot.supabase.co';
const DEFAULT_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4Nzc0MzgwMiwiZXhwIjoyMTAzMzE5ODAyfQ.QpclPWrif6Nlj4QrD2VBHp1OUw83hOU-IQEaJwuD58E';

export const getSupabaseAdmin = () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || DEFAULT_SERVICE_ROLE_KEY;

    return createClient(
        supabaseUrl,
        supabaseServiceKey
    );
};
