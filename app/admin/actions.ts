'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSupabaseAdmin as getAdminClient } from '@/utils/supabase-admin';
import { saveUpload } from '@/lib/upload';

// --- PRODUCTS ---
export async function deleteProduct(id: string) {
  const supabase = getAdminClient();
  await supabase.from('products').delete().eq('id', id);
  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  revalidatePath('/');
  return { success: true };
}

export async function removeOptionFromGlobal(field: string, optionToRemove: string) {
  const supabase = getAdminClient();
  const { data: products } = await supabase.from('products').select('*');
  if (!products) return { success: false };

  for (const p of products) {
    let changed = false;
    let newValue = p[field] || '';

    if (field === 'metal') { // metal supports multiple comma separated values
      const arr = newValue.split(',').map((s: string) => s.trim()).filter(Boolean);
      if (arr.includes(optionToRemove)) {
        newValue = arr.filter((x: string) => x !== optionToRemove).join(', ');
        changed = true;
      }
    } else { // category, collection are single value fields
      if (newValue.trim() === optionToRemove.trim()) {
        newValue = '';
        changed = true;
      }
    }

    if (changed) {
      // Upsert the whole product or update just the field
      await supabase.from('products').update({ [field]: newValue }).eq('id', p.id);
    }
  }

  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  revalidatePath('/');
  return { success: true };
}

export async function saveProduct(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;

  const imageInputs = formData.get('images') as string;
  let parsedImages = imageInputs ? imageInputs.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Robust parsing to catch multiple or single files depending on how the server parses multipart form data
  const files: File[] = [];
  const multiFiles = formData.getAll('imageFiles');
  if (multiFiles && multiFiles.length > 0) {
    multiFiles.forEach(f => files.push(f as File));
  } else {
    const singleFile = formData.get('imageFiles');
    if (singleFile) files.push(singleFile as File);
  }

  const uploadedUrls: string[] = [];
  for (const file of files) {
    if (file && typeof file.size === 'number' && file.size > 0 && file.name && file.name !== 'undefined') {
      const url = await saveUpload(file);
      uploadedUrls.push(url);
    }
  }

  if (uploadedUrls.length > 0) {
    // Bring newly uploaded to front, followed by old parsed images
    parsedImages = [...uploadedUrls, ...parsedImages];
  }

  const submittedTags = formData.get('tags') ? (formData.get('tags') as string).split(',').map(t => t.trim()).filter(Boolean) : [];
  if (formData.get('isActive') !== 'on') {
    if (!submittedTags.includes('_HIDDEN')) submittedTags.push('_HIDDEN');
  } else {
    const idx = submittedTags.indexOf('_HIDDEN');
    if (idx > -1) submittedTags.splice(idx, 1);
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
    tags: submittedTags,
    images: parsedImages,
    is_new: formData.get('isNew') === 'on',
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999,
    specs: {
      purity: formData.get('purity') as string || '',
      weight: formData.get('weight') as string || '',
      dimensions: formData.get('dimensions') as string || '',
      gemstones: formData.get('gemstones') as string || '',
      careInstructions: formData.get('careInstructions') as string || '',
      customSpecs: formData.get('customSpecs') as string || ''
    }
  };

  const { error } = await supabase.from('products').upsert(payload);
  if (error) {
    console.error("Failed to insert product:", error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  revalidatePath('/');
  revalidatePath('/product/' + payload.handle);
  redirect('/admin/products');
}

// --- CATALOGUES ---
export async function deleteCatalogue(id: string) {
  const supabase = getAdminClient();
  await supabase.from('catalogues').delete().eq('id', id);
  revalidatePath('/admin/catalogues');
  revalidatePath('/collections');
  revalidatePath('/');
  return { success: true };
}

export async function saveCatalogue(formData: FormData) {
  const supabase = getAdminClient();
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
  revalidatePath('/');
  redirect('/admin/catalogues');
}

// --- BLOGS ---
export async function deleteBlog(id: string) {
  const supabase = getAdminClient();
  await supabase.from('blogs').delete().eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  revalidatePath('/');
  return { success: true };
}

export async function saveBlog(formData: FormData) {
  const supabase = getAdminClient();
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
    excerpt: (formData.get('excerpt') as string) + '|||' + (formData.get('link') as string || ''),
    image: finalImageUrl,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('blogs').upsert(payload);

  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  revalidatePath('/');
  redirect('/admin/blogs');
}

// --- TESTIMONIALS ---
export async function deleteTestimonial(id: string) {
  const supabase = getAdminClient();
  await supabase.from('testimonials').delete().eq('id', id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}

export async function deleteInquiry(id: string) {
  const supabase = getAdminClient();
  await supabase.from('contact_inquiries').delete().eq('id', id);
  revalidatePath('/admin/inquiries');
  return { success: true };
}

export async function saveTestimonial(formData: FormData) {
  const supabase = getAdminClient();
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
  const supabase = getAdminClient();
  await supabase.from('timeline_events').delete().eq('id', id);
  revalidatePath('/admin/timeline');
  revalidatePath('/timeline');
  revalidatePath('/');
  return { success: true };
}

export async function saveTimelineEvent(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;

  const imageInputs = formData.get('images') as string;
  let parsedImages = imageInputs ? imageInputs.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Robust parsing to catch multiple or single files depending on how the server parses multipart form data
  const files: File[] = [];
  const multiFiles = formData.getAll('imageFiles');
  if (multiFiles && multiFiles.length > 0) {
    multiFiles.forEach(f => files.push(f as File));
  } else {
    const singleFile = formData.get('imageFiles');
    if (singleFile) files.push(singleFile as File);
  }

  // To let the newest uploaded files feature prominently (index 0), unshift them.
  const uploadedUrls: string[] = [];
  for (const file of files) {
    if (file && typeof file.size === 'number' && file.size > 0 && file.name && file.name !== 'undefined') {
      const uploadedUrl = await saveUpload(file);
      uploadedUrls.push(uploadedUrl);
    }
  }

  if (uploadedUrls.length > 0) {
    // Bring newly uploaded to front, followed by old parsed images
    parsedImages = [...uploadedUrls, ...parsedImages];
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
  revalidatePath('/');
  redirect('/admin/timeline');
}

// --- YOUTUBE VIDEOS ---
export async function deleteYoutubeVideo(id: string) {
  const supabase = getAdminClient();
  await supabase.from('youtube_videos').delete().eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  return { success: true };
}

export async function saveYoutubeVideo(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;

  const payload = {
    id: id || Date.now().toString(),
    title: formData.get('title') as string,
    video_id: formData.get('video_id') as string,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('youtube_videos').upsert(payload);

  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  redirect('/admin/blogs');
}

// --- SEEN ON FEATURES ---
export async function deleteSeenOnFeature(id: string) {
  const supabase = getAdminClient();
  await supabase.from('seen_on_features').delete().eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  return { success: true };
}

export async function saveSeenOnFeature(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;

  const existingInputs = formData.get('existing_images') as string;
  let parsedImages = existingInputs ? existingInputs.split(',').map(s => s.trim()).filter(Boolean) : [];

  const files: File[] = [];
  const multiFiles = formData.getAll('imageFiles');
  if (multiFiles && multiFiles.length > 0) {
    multiFiles.forEach(f => files.push(f as File));
  }

  const uploadedUrls: string[] = [];
  try {
    for (const file of files) {
      if (file && typeof file.size === 'number' && file.size > 0 && file.name && file.name !== 'undefined') {
        const uploadedUrl = await saveUpload(file);
        uploadedUrls.push(uploadedUrl);
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'File upload failed due to size limits.' };
  }

  if (uploadedUrls.length > 0) {
    parsedImages = [...parsedImages, ...uploadedUrls];
  }

  const payload = {
    id: id || Date.now().toString(),
    title: formData.get('title') as string || '',
    subtitle: formData.get('subtitle') as string || '',
    description: formData.get('description') as string || '',
    image1: parsedImages.join(','),
    image2: '',
    link: formData.get('link') as string || '',
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  await supabase.from('seen_on_features').upsert(payload);

  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  redirect('/admin/blogs');
}

// --- GLOBAL QUICK ACTIONS ---
export async function updateSequence(collection: string, id: string, sequence: number) {
  const supabase = getAdminClient();

  // Note: collection name mapping
  let table = collection;
  if (collection === 'timelineEvents') table = 'timeline_events';
  if (collection === 'youtubeVideos') table = 'youtube_videos';
  if (collection === 'seenOnFeatures') table = 'seen_on_features';

  await supabase.from(table).update({ sequence }).eq('id', id);

  if (collection === 'products') {
    revalidatePath('/admin/products');
    revalidatePath('/category/[category]');
    revalidatePath('/collections');
    revalidatePath('/');
  } else if (collection === 'catalogues') {
    revalidatePath('/admin/catalogues');
    revalidatePath('/collections');
    revalidatePath('/');
  } else if (collection === 'blogs' || collection === 'youtubeVideos' || collection === 'seenOnFeatures') {
    revalidatePath('/admin/blogs');
    revalidatePath('/pages/whats-new');
    revalidatePath('/');
  } else if (collection === 'testimonials') {
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
  } else if (collection === 'timelineEvents') {
    revalidatePath('/admin/timeline');
    revalidatePath('/timeline');
    revalidatePath('/');
  }
}

// --- PAGE SECTIONS ---
export async function savePageSection(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const payload = {
    id: id,
    title: formData.get('title') as string || '',
    subtitle: formData.get('subtitle') as string || '',
    description: formData.get('description') as string || '',
    image: finalImageUrl || '',
    link: formData.get('link') as string || '',
  };

  const { error } = await supabase.from('page_sections').upsert(payload);
  if (error) {
    console.error("Failed to insert page section:", error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/blogs');
  revalidatePath('/press');
  redirect('/admin/blogs');
}
