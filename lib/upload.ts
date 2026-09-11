import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://radmagmbzuubeqjrncot.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDM4MDIsImV4cCI6MjEwMzMxOTgwMn0.8G8FBlX11v8-CJjx9kvje-HhHss4f1MagZbYj40lFbY';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveUpload(file: File): Promise<string> {
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

  const { data, error } = await supabase.storage
    .from('media')
    .upload(filename, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Failed to upload to Supabase: ${error.message}`);
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filename);

  return publicUrl;
}
