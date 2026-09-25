import { getSupabaseAdmin } from '@/utils/supabase-admin';

export async function saveUpload(file: File): Promise<string> {
  const supabase = getSupabaseAdmin();
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    throw new Error(`File format is not supported. Please upload an image or video.`);
  }

  if (['image/avif', 'image/heic', 'image/heif', 'image/tiff'].includes(file.type)) {
    throw new Error(`File format is not supported: Please use JPEG, PNG, or WebP.`);
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabase.storage
    .from('media')
    .upload(filename, buffer, {
      contentType: file.type,
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
