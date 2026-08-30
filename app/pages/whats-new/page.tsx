'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/config/site';

const NEWS_ARTICLES = [
  { title: "Must-have jewellery pieces for a bridal trousseau, hand-picked by an expert", publisher: "Brides Today", link: "https://www.bridestoday.in/watches-and-jewellery/story/gilded-guidance-743619-2024-02-24", image: "https://www.arundhatidesheth.com/cdn/shop/files/659d187356833-n-must-haves-in-a-bridal-trousseau-095706553-16x9.jpg" },
  { title: "Mid-Day Article - 23rd September 2023 - Some of the finest jewellery pieces", publisher: "Mid-Day", link: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-sunday-dossier-23306978", image: "https://www.arundhatidesheth.com/cdn/shop/files/mid_day_article.jpg" },
  { title: "Jewellery connoisseur, Arundhati De-Sheth sheds light on her love for natural diamonds", publisher: "Only Natural Diamonds", link: "https://www.naturaldiamonds.com/in/love-diamonds/jewellery-journey-inspiration-of-diamond-diva-arundhati-de-sheth/", image: "https://www.arundhatidesheth.com/cdn/shop/files/Hero-Banner-1_bf6ec802-9835-4d98-b949-22801ef3e621.webp" },
  { title: "Arundhati De-Sheth's Expert Curation: Elevating Jewellery to Art", publisher: "GJEPC Solitaire International", link: "https://gjepc.org/solitaire/arundhati-de-sheths-expert-curation-elevating-jewellery-to-art/", image: "https://www.arundhatidesheth.com/cdn/shop/files/ARUNDHATI.jpg" },
  { title: "Why jewellery consultants are the new personal shoppers", publisher: "Vogue", link: "https://www.vogue.in/fashion/content/why-jewellery-consultants-are-the-new-personal-shoppers", image: "https://www.arundhatidesheth.com/cdn/shop/files/VOGUE.png" },
  { title: "In 2021, Engaged Couples Are Hiring \"Ring Whisperers\" To Source Their Dream Design", publisher: "British Vogue", link: "https://www.vogue.co.uk/fashion/article/engagement-ring-concierge", image: "https://www.arundhatidesheth.com/cdn/shop/files/RG_15.2.21_Dina-kamal-engagement-ring-concierge-02.webp" },
  { title: "Curator of the exquisite, Arundhati De-Sheth is your go-to person for irresistible jewellery", publisher: "LUXEBOOK", link: "https://luxebook.in/arundhati-de-sheth-is-your-go-to-person-for-irresistible-jewellery/", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_c8a89625059f41bfa4c4431017984e3d_mv2_1.jpg" },
  { title: "Meet Arundhati De Sheth, the bespoke jewellery consultant", publisher: "The Hindu", link: "https://www.thehindu.com/life-and-style/luxury/meet-arundhati-de-sheth-the-bespoke-jewellery-consultant/article30050420.ece", image: "https://www.arundhatidesheth.com/cdn/shop/files/Image_for_THE_HINDU.jpg" },
  { title: "Happy Shiny Things - Feature", publisher: "GRAZIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_af843dfeb1ff411d814d72612595a29f_mv2.png" },
  { title: "Pieces to Wear at Your Wedding", publisher: "HARPER'S BAZAAR INDIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_c5497b11e7b4424d9b5fe1944602337a_mv2.jpg" },
  { title: "Insider Secrets & the Accessories to Covet", publisher: "HARPER'S BAZAAR INDIA", link: "#", image: "https://www.arundhatidesheth.com/cdn/shop/files/6ef918_16b52900c968437dafcdb7c0018ccb3c_mv2.jpg" }
];

const VIDEOS = [
  { id: "Eq5pvXOYCBQ", title: "A Love For Exquisite Jewels With Arundhati De-Sheth" },
  { id: "gceVmPM0jPM", title: "Arundhati De-Sheth | France Alumni Ambassador 2021-23" },
  { id: "8Nox5-GGDus", title: "Everyday Diamond Essentials | Vogue India x Natural Diamond" },
  { id: "ef33KBbhz-c", title: "In conversation with Arundhati De Seth" }
];

export default function WhatsNewPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', paddingBottom: '120px' }}>
      
      {/* 1. In The News */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '64px', textAlign: 'center' }}>
          In The News
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
          {NEWS_ARTICLES.map((article, idx) => (
            <a key={idx} href={article.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '24px', background: '#F5F5F5' }}>
                <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', fontWeight: '400', marginBottom: '16px' }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', color: '#666', marginTop: 'auto' }}>
                {article.publisher}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 2. WATCH */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
        <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '64px', textAlign: 'center' }}>
          WATCH
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
          {VIDEOS.map((video) => (
            <div key={video.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '24px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <h3 style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', fontWeight: '400' }}>
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Seen On */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>
        <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '80px', textAlign: 'center' }}>
          Seen On
        </h2>

        {/* Disha Patani */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
            <Image src="/whatsnewimages/disha2.jpg" alt="Disha Patani" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Disha Patani</h4>
            <h6 style={{ fontSize: '19.1px', fontFamily: 'var(--font-serif)', marginBottom: '32px', color: '#666' }}>for Cosmopolitan, Feb &apos;20</h6>
            <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
            <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
              Disha Patani is on the cover of Cosmopolitan India in rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black enamel detailing and colourless diamond solitaires.
            </p>
            <Link href="https://www.arundhatidesheth.com/pages/disha-patani" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
              See More
            </Link>
          </div>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
            <Image src="/whatsnewimages/disha1.jpg" alt="Disha Patani" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Alia Bhatt */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
            <Image src="/whatsnewimages/alia2.jpg" alt="Alia Bhatt" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>Alia Bhatt</h4>
            <h6 style={{ fontSize: '19.1px', fontFamily: 'var(--font-serif)', marginBottom: '32px', color: '#666' }}>styled in Rings from Arundhati&apos;s line at Le Mill<br/>for Filmfare 2019</h6>
            <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
            <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
              She is wearing multiple rings from the Arundhati De-Sheth line currently available exclusively at Le Mill boutique, Mumbai. Each piece is set in 18k gold, with black and white enamel detailing and colourless diamond solitaires. The pieces are contemporary and extremely easy to wear daily, or for occasions.
            </p>
            <Link href="https://www.arundhatidesheth.com/pages/alia-bhatt-for-filmfare-glamour-style-awards-2019" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
              See More
            </Link>
          </div>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
            <Image src="/whatsnewimages/alia1.jpg" alt="Alia Bhatt" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

        {/* Priyanka Chopra */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
             <Image src="/whatsnewimages/PC_Reception_Mumbai.jpg" alt="Priyanka Chopra" fill style={{ objectFit: 'cover' }} />
          </div>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '32px' }}>Priyanka Chopra Wedding Reception</h4>
            <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
            <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '16px' }}>
              A last-minute phone call from Bride - Priyanka Chopra&apos;s garment designers, led to a 48-hour hunt, identifying jewellery pieces for the ace actor&apos;s glamorous Mumbai reception for her Bollywood fraternity.
            </p>
            <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px' }}>
              She wore a two-row diamond rivière necklace with two magnificent, yellow cut-cornered Cushion-shaped diamonds, Classic Diamond drop earrings featuring a pair of stellar natural Yellow hexagonal-shaped diamonds and a ring with a fancy yellow 7 carat cushion-cut diamond center.
            </p>
            <Link href="https://www.arundhatidesheth.com/pages/priyanka-chopra" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
              See More
            </Link>
          </div>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
            {/* Note: I couldn't find the exact second PC image from the scraper, using a placeholder product image to maintain the strict 3-col layout */}
             <Image src="/whatsnewimages/IMG-5690.jpg" alt="Jewelry" fill style={{ objectFit: 'cover' }} />
          </div>
        </div>

      </section>

      <style jsx>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 600px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
