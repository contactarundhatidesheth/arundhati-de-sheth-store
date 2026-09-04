'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { readDB, writeDB, Product, Catalogue, Blog, Testimonial } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

// --- PRODUCTS ---
export async function deleteProduct(id: string) {
  const db = readDB();
  db.products = db.products.filter(p => p.id !== id);
  writeDB(db);
  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  return { success: true };
}

export async function saveProduct(formData: FormData) {
  const db = readDB();
  
  const id = formData.get('id') as string;
  
  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const product: Product = {
    id: id || Date.now().toString(),
    handle: formData.get('handle') as string || Date.now().toString(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    category: formData.get('category') as any,
    metal: formData.get('metal') as any,
    collection: formData.get('collection') as any,
    tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
    images: [finalImageUrl],
    specs: {},
    isNew: formData.get('isNew') === 'on',
    inStock: true,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };
  
  if (id) {
    const index = db.products.findIndex(p => p.id === id);
    if (index >= 0) db.products[index] = product;
    else db.products.push(product);
  } else {
    db.products.push(product);
  }
  
  writeDB(db);
  revalidatePath('/admin/products');
  revalidatePath('/category/[category]');
  revalidatePath('/collections');
  redirect('/admin/products');
}

// --- CATALOGUES ---
export async function deleteCatalogue(id: string) {
  const db = readDB();
  db.catalogues = db.catalogues.filter(c => c.id !== id);
  writeDB(db);
  revalidatePath('/admin/catalogues');
  revalidatePath('/collections');
  return { success: true };
}

export async function saveCatalogue(formData: FormData) {
  const db = readDB();
  
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const catalogue: Catalogue = {
    id: id || Date.now().toString(),
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image: finalImageUrl,
    link: formData.get('link') as string,
    year: formData.get('year') as string,
    featured: formData.get('featured') === 'on',
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  if (id) {
    const index = db.catalogues.findIndex(c => c.id === id);
    if (index >= 0) db.catalogues[index] = catalogue;
    else db.catalogues.push(catalogue);
  } else {
    db.catalogues.push(catalogue);
  }

  writeDB(db);
  revalidatePath('/admin/catalogues');
  revalidatePath('/collections');
  redirect('/admin/catalogues');
}

// --- BLOGS ---
export async function deleteBlog(id: string) {
  const db = readDB();
  db.blogs = db.blogs.filter(b => b.id !== id);
  writeDB(db);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  return { success: true };
}

export async function saveBlog(formData: FormData) {
  const db = readDB();
  
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const blog: Blog = {
    id: id || Date.now().toString(),
    publication: formData.get('publication') as string,
    date: formData.get('date') as string,
    title: formData.get('title') as string,
    excerpt: formData.get('excerpt') as string,
    image: finalImageUrl,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  if (id) {
    const index = db.blogs.findIndex(b => b.id === id);
    if (index >= 0) db.blogs[index] = blog;
    else db.blogs.push(blog);
  } else {
    db.blogs.push(blog);
  }

  writeDB(db);
  revalidatePath('/admin/blogs');
  revalidatePath('/pages/whats-new');
  redirect('/admin/blogs');
}

// --- TESTIMONIALS ---
export async function deleteTestimonial(id: string) {
  const db = readDB();
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  writeDB(db);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true };
}

export async function saveTestimonial(formData: FormData) {
  const db = readDB();
  
  const id = formData.get('id') as string;

  const imageFile = formData.get('imageFile') as File | null;
  let finalImageUrl = formData.get('image') as string;
  if (imageFile && imageFile.size > 0) {
    finalImageUrl = await saveUpload(imageFile);
  }

  const testimonial: Testimonial = {
    id: id || Date.now().toString(),
    quote: formData.get('quote') as string,
    author: formData.get('author') as string,
    location: formData.get('location') as string,
    image: finalImageUrl,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  if (id) {
    const index = db.testimonials.findIndex(t => t.id === id);
    if (index >= 0) db.testimonials[index] = testimonial;
    else db.testimonials.push(testimonial);
  } else {
    db.testimonials.push(testimonial);
  }

  writeDB(db);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

// --- TIMELINE EVENTS ---
export async function deleteTimelineEvent(id: string) {
  const db = readDB();
  db.timelineEvents = db.timelineEvents.filter(t => t.id !== id);
  writeDB(db);
  revalidatePath('/admin/timeline');
  revalidatePath('/timeline');
  return { success: true };
}

export async function saveTimelineEvent(formData: FormData) {
  const db = readDB();
  
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
  
  const timelineEvent = {
    id: id || Date.now().toString(),
    date: formData.get('date') as string,
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    images: parsedImages,
    link: formData.get('link') as string || undefined,
    sequence: formData.get('sequence') ? parseInt(formData.get('sequence') as string) : 999
  };

  if (id) {
    const index = db.timelineEvents.findIndex(t => t.id === id);
    if (index >= 0) db.timelineEvents[index] = timelineEvent;
    else db.timelineEvents.push(timelineEvent);
  } else {
    db.timelineEvents.push(timelineEvent);
  }

  writeDB(db);
  revalidatePath('/admin/timeline');
  revalidatePath('/timeline');
  redirect('/admin/timeline');
}

// --- GLOBAL QUICK ACTIONS ---
export async function updateSequence(collection: string, id: string, sequence: number) {
  const db = readDB();
  const validCollections = ['products', 'catalogues', 'blogs', 'testimonials', 'timelineEvents'];
  
  if (validCollections.includes(collection)) {
    // @ts-ignore
    const item = db[collection].find((i: any) => i.id === id);
    if (item) {
      item.sequence = sequence;
      writeDB(db);
      
      // Revalidate common paths based on collection
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
  }
}
