import { getSupabaseAdmin } from '@/utils/supabase-admin';

export async function saveUpload(file: File): Promise<string> {
  const supabase = getSupabaseAdmin();
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
