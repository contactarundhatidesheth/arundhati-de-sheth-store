import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { StorefrontLayout } from '@/components/StorefrontLayout';
import { Tracker } from '@/components/Tracker';

export const metadata: Metadata = {
  title: 'Arundhati De-Sheth | Fine Jewellery Consultancy',
  description: 'Curated 18K gold, 925 silver, and high jewellery pieces by Arundhati De-Sheth. Private client inquiries worldwide.',
  keywords: ['fine jewellery', 'high jewellery', '18K gold', '925 silver', 'bespoke', 'consultancy', 'Arundhati De-Sheth'],
  authors: [{ name: 'Arundhati De-Sheth' }],
  openGraph: {
    title: 'Arundhati De-Sheth | Fine Jewellery Consultancy',
    description: 'Curated fine jewellery designed around how clientele shop.',
    url: 'https://arundhatidesheth.com',
    siteName: 'Arundhati De-Sheth',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arundhati De-Sheth | Fine Jewellery Consultancy',
    description: 'Curated fine jewellery designed around how clientele shop.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Tracker />
        <CartProvider>
          <StorefrontLayout>
            {children}
          </StorefrontLayout>
        </CartProvider>
      </body>
    </html>
  );
}
