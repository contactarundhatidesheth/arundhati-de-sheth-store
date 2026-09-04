import { Metadata } from 'next';
import { readDB } from '@/lib/db';
import ProductDetailClient from './ProductDetailClient';

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const db = await readDB();
  const product = db.products.find(p => p.handle === params.handle);
  
  if (!product) {
    return { title: 'Product Not Found | Arundhati De-Sheth' };
  }
  
  return {
    title: `${product.title} | Arundhati De-Sheth`,
    description: product.description.replace(/<[^>]+>/g, ''), // Strip HTML for description
    openGraph: {
      title: product.title,
      description: product.description.replace(/<[^>]+>/g, ''),
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 800,
          alt: product.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description.replace(/<[^>]+>/g, ''),
      images: [product.images[0]],
    }
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const db = await readDB();
  return <ProductDetailClient params={params} />;
}
