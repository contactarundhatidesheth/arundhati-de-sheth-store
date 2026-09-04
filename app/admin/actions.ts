'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { saveUpload } from '@/lib/upload';

// --- PRODUCTS ---
export async function deleteProduct(id: string) {
  const supabase = createClient();
  await supabase.from('products').delete().eq('id', id);
  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  return { success: true };
}

export async function saveProduct(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;
  
  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const payload = {
    id: id || Date.now().toString(),
    handle: formData.get('handle') as string || Date.now().toString(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    category: formData.get('category') as string,
    metal: formData.get('metal') as string,
    collection: formData.get('collection') as string,
    tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
    images: finalImageUrl ? [finalImageUrl] : [], // TODO handle existing images better in real implementation
    is_new: formData.get('isNew') === 'on',
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };
  
  await supabase.from('products').upsert(payload);
  
  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  redirect('/admin/products');
}

// --- CATALOGUES ---
export async function deleteCatalogue(id: string) {
  const supabase = createClient();
  await supabase.from('catalogues').delete().eq('id', id);
  revalidatePath('/admin/catalogues');
  revalidatePath('/collections');
  return { success: true };
}

export async function saveCatalogue(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const payload = {
    id: id || Date.now().toString(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image: finalImageUrl,
    link: formData.get('link') as string,
    year: formData.get('year') as string,
    featured: formData.get('featured') === 'on',
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('catalogues').upsert(payload);

  revalidatePath('/admin/catalogues');
  revalidatePath('/collections');
  redirect('/admin/catalogues');
}

// --- BLOGS ---
export async function deleteBlog(id: string) {
  const supabase = createClient();
  await supabase.from('blogs').delete().eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  return { success: true };
}

export async function saveBlog(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const payload = {
    id: id || Date.now().toString(),
    publication: formData.get('publication') as string,
    date: formData.get('date') as string,
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    image: finalImageUrl,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('blogs').upsert(payload);

  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  redirect('/admin/blogs');
}

// --- TESTIMONIALS ---
export async function deleteTestimonial(id: string) {
  const supabase = createClient();
  await supabase.from('testimonials').delete().eq('id', id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}

export async function saveTestimonial(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const payload = {
    id: id || Date.now().toString(),
    quote: formData.get('quote') as string,
    author: formData.get('author') as string,
    location: formData.get('location') as string,
    image: finalImageUrl,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('testimonials').upsert(payload);

  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

// --- TIMELINE EVENTS ---
export async function deleteTimelineEvent(id: string) {
  const supabase = createClient();
  await supabase.from('timeline_events').delete().eq('id', id);
  revalidatePath('/admin/timeline');
  revalidatePath('/timeline');
  return { success: true };
}

export async function saveTimelineEvent(formData: FormData) {
  const supabase = createClient();
  const id = formData.get('id') as string;
  
  const imageInputs = formData.get('images') as string;
  const parsedImages = imageInputs ? imageInputs.split(',').map(s => s.trim()).filter(Boolean) : [];
  
  const imageFiles = formData.getAll('imageFiles') as File[];
  for (const file of imageFiles) {
    if (file && file.size > 0) {
      const uploadedUrl = await saveUpload(file);
      parsedImages.push(uploadedUrl);
    }
  }

  const payload = {
    id: id || Date.now().toString(),
    date: formData.get('date') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    images: parsedImages,
    link: formData.get('link') as string || null,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('timeline_events').upsert(payload);

  revalidatePath('/admin/timeline');
  revalidatePath('/timeline');
  redirect('/admin/timeline');
}

// --- GLOBAL QUICK ACTIONS ---
export async function updateSequence(collection: string, id: string, sequence: number) {
  const supabase = createClient();
  
  // Note: collection name mapping
  let table = collection;
  if (collection === 'timelineEvents') table = 'timeline_events';

  await supabase.from(table).update({ sequence }).eq('id', id);
  
  if (collection === 'products') {
    revalidatePath('/admin/products');
    revalidatePath('/category/[category]');
    revalidatePath('/collections');
  } else if (collection === 'catalogues') {
    revalidatePath('/admin/catalogues');
    revalidatePath('/collections');
  } else if (collection === 'blogs') {
    revalidatePath('/admin/blogs');
    revalidatePath('/pages/whats-new');
  } else if (collection === 'testimonials') {
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  } else if (collection === 'timelineEvents') {
    revalidatePath('/admin/timeline');
    revalidatePath('/timeline');
  }
}
