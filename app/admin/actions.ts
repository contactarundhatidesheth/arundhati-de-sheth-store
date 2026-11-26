'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getSupabaseAdmin as getAdminClient } from '@/utils/supabase-admin';
import { saveUpload } from '@/lib/upload';

// --- PRODUCTS ---
export async function updateProductInventory(id: string, stock: number, isMadeToOrder?: boolean) {
  const supabase = getAdminClient();
  const { data: product } = await supabase.from('products').select('specs, in_stock').eq('id', id).single();
  const existingSpecs = (product?.specs as Record<string, any>) || {};

  const updatedSpecs = {
    ...existingSpecs,
    stock: Number(stock) >= 0 ? Number(stock) : 0,
    ...(typeof isMadeToOrder === 'boolean' ? { isMadeToOrder } : {})
  };

  const willBeInStock = (updatedSpecs.stock > 0) || Boolean(updatedSpecs.isMadeToOrder);

  const { error } = await supabase
    .from('products')
    .update({
      specs: updatedSpecs,
      in_stock: willBeInStock
    })
    .eq('id', id);

  if (error) {
    console.error("Failed to update product inventory:", error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  revalidatePath('/');
  return { success: true };
}

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

  const rawStock = formData.get('stock');
  const stock = rawStock !== null && rawStock !== '' ? Math.max(0, parseInt(rawStock as string, 10)) : 1;
  const isMadeToOrder = formData.get('isMadeToOrder') === 'on';
  const leadTime = (formData.get('leadTime') as string || '2–3 weeks').trim();
  const inStock = stock > 0 || isMadeToOrder;

  const payload = {
    id: id || Date.now().toString(),
    handle: ((formData.get('handle') as string) || Date.now().toString()).trim(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    category: formData.get('category') as string,
    metal: formData.get('metal') as string,
    collection: formData.get('collection') as string,
    tags: submittedTags,
    images: parsedImages,
    is_new: formData.get('isNew') === 'on',
    is_price_on_request: formData.get('isPriceOnRequest') === 'on',
    in_stock: inStock,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999,
    specs: {
      purity: formData.get('purity') as string || '',
      weight: formData.get('weight') as string || '',
      dimensions: formData.get('dimensions') as string || '',
      gemstones: formData.get('gemstones') as string || '',
      careInstructions: formData.get('careInstructions') as string || '',
      customSpecs: formData.get('customSpecs') as string || '',
      stock,
      isMadeToOrder,
      leadTime
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
    image: finalImageUrl || '',
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
  revalidatePath('/pages/seen-on/[id]');
  revalidatePath('/');
  return { success: true, error: null };
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
  revalidatePath('/pages/seen-on/[id]');
  revalidatePath('/');
  return { success: true, error: null };
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

// Generate presigned upload URL to allow direct client upload of large media (e.g. videos) bypassing Cloudflare 100MB / worker limits
export async function getDirectUploadUrl(filename: string, fileType: string) {
  const supabase = getAdminClient();
  const safeFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.\-_]/g, '')}`;

  const { data, error } = await supabase.storage
    .from('media')
    .createSignedUploadUrl(safeFilename);

  if (error || !data) {
    throw new Error(error?.message || 'Failed to generate signed upload URL');
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(safeFilename);

  return {
    signedUrl: data.signedUrl,
    token: data.token,
    path: data.path,
    publicUrl
  };
}

// --- BANNER MANAGEMENT ---
export async function saveBannerSection(formData: FormData) {
  const supabase = getAdminClient();
  const id = formData.get('id') as string;
  const mediaType = formData.get('mediaType') as string | null;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = (formData.get('image') as string) || '';
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const videoFile = formData.get('videoFile') as File | null;
  let finalLink = (formData.get('link') as string) || '';
  if (videoFile && videoFile.size > 0) {
    finalLink = await saveUpload(videoFile);
  }

  // If user explicitly chose Image, clear the video link so video doesn't override image
  if (mediaType === 'image') {
    finalLink = '';
  }

  // Format Google Drive links into streamable direct download URLs if entered
  const formatMediaUrl = (url: string) => {
    if (!url) return '';
    const fileIdMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${fileIdMatch[1]}`;
    }
    const openIdMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
    if (openIdMatch && openIdMatch[1]) {
      return `https://drive.google.com/uc?export=download&id=${openIdMatch[1]}`;
    }
    return url;
  };

  const payload = {
    id: id,
    title: (formData.get('title') as string) || '',
    subtitle: (formData.get('subtitle') as string) || '',
    description: (formData.get('description') as string) || '',
    image: formatMediaUrl(finalImageUrl),
    link: formatMediaUrl(finalLink),
  };

  const { error } = await supabase.from('page_sections').upsert(payload);
  if (error) {
    console.error('Failed to update banner section:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/banners');
  revalidatePath('/about');
  revalidatePath('/collections');
  revalidatePath('/category/all-products');
  revalidatePath('/press');
  revalidatePath('/contact');
  revalidatePath('/');
  redirect('/admin/banners?success=true');
}

// --- COUPON MANAGEMENT ---
export async function saveCoupon(formData: FormData) {
  const supabase = getAdminClient();
  const rawCode = (formData.get('code') as string || '').trim().toUpperCase();
  if (!rawCode) throw new Error('Coupon code is required');

  const discountType = (formData.get('discountType') as string) || 'PERCENTAGE'; // PERCENTAGE or FIXED
  const discountValue = (formData.get('discountValue') as string) || '10';
  const minOrder = (formData.get('minOrder') as string) || '0';
  const status = (formData.get('status') as string) || 'active'; // active or inactive
  const appliesTo = (formData.get('appliesTo') as string) || 'ALL'; // ALL or SELECTED

  // Get selected product IDs
  const applicableProducts = formData.getAll('applicableProducts').map(v => String(v));

  const couponId = `coupon_${rawCode}`;
  const metadata = JSON.stringify({
    minOrder: Number(minOrder) || 0,
    appliesTo,
    applicableProducts,
    updatedAt: new Date().toISOString()
  });

  const payload = {
    id: couponId,
    title: rawCode,
    subtitle: discountType,
    description: discountValue,
    link: status,
    image: metadata
  };

  const { error } = await supabase.from('page_sections').upsert(payload);
  if (error) {
    console.error('Failed to save coupon:', error);
    throw new Error(error.message);
  }

  revalidatePath('/admin/coupons');
  revalidatePath('/cart');
  redirect('/admin/coupons?success=true');
}

export async function deleteCoupon(code: string) {
  const supabase = getAdminClient();
  const couponId = code.startsWith('coupon_') ? code : `coupon_${code.trim().toUpperCase()}`;
  await supabase.from('page_sections').delete().eq('id', couponId);
  revalidatePath('/admin/coupons');
  revalidatePath('/cart');
  return { success: true };
}

export async function toggleCouponStatus(code: string, currentStatus: string) {
  const supabase = getAdminClient();
  const couponId = code.startsWith('coupon_') ? code : `coupon_${code.trim().toUpperCase()}`;
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
  await supabase.from('page_sections').update({ link: newStatus }).eq('id', couponId);
  revalidatePath('/admin/coupons');
  revalidatePath('/cart');
  return { success: true };
}
