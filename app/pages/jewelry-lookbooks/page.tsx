'use client';
import React from 'react';

export default function JewelryLookbooksPage() {
  const catalogues = [
    {
      title: 'Bonded',
      description: 'A selection of thoughtful and meaningful fine jewels that would make an everlasting gift.',
      link: 'https://drive.google.com/file/d/1MQaLcFVZu4Sd3Oo1jF0cOn8A284o9ykp/view?usp=sharing',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Bonded_A_Rakshabhandan_Gifting_Guide.png?crop=center&height=1950&v=1787227227&width=1300'
    },
    {
      title: 'Decodent',
      description: 'A collection of fine and high-end jewels with Art Deco design influences, for the discerning collector.',
      link: 'https://drive.google.com/file/d/11mbSmNos-6wNh3VhEhAJYaYkuyOvu3Fd/view?usp=sharing',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2026-01-27_144230.png?crop=center&height=900&v=1769505173&width=600'
    },
    {
      title: 'Shadow Games 2025',
      description: 'A collection of fine jewels that could be the perfect accompaniment on your sunny escapade... and a perfect ally for life.',
      link: 'https://drive.google.com/file/d/1Tuty-w6Oye0wA9_SaNZu3kL-v0YHmzFq/view?usp=sharing',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Untitled_design_15.png?crop=center&height=1500&v=1757411098&width=1000'
    },
    {
      title: 'Prismatic',
      description: 'In my 7th edition of my JewelArt show, I’d like to draw your attention to the beauty of fine, design-led jewellery with coloured gem stones as the hero. And of course, you will find diamonds (done differently) too.',
      link: 'https://drive.google.com/file/d/16UfbZE84ItGHGBYKy9bddDlT3JCcLZH9/view?usp=sharing',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_130922.png?crop=center&height=825&v=1744098043&width=550'
    },
    {
      title: 'Gildedage',
      description: 'Experience the best of jewels that transcend trends, borders and conventions.',
      link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Gildedage_without_price_compressed.pdf?v=1708935823',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/e-invite-Final.jpg?v=1708933697&width=3000'
    },
    {
      title: 'Call for Cocktails',
      description: 'A capsule of modern and fresh fine jewels to wear during the holidays and beyond.',
      link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Call_for_the_cocktails_compressed.pdf?v=1709730900',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Call_for_the_cocktails_compressed_1__page-0001.jpg?v=1709731491&width=1200'
    },
    {
      title: 'Lightness Of Being',
      description: 'A design-led fine jewellery show.',
      link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Lightness_of_Being_book_Price.pdf?v=1708935547',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2024-02-26_at_2.04.21_PM.png?v=1708936623&width=550'
    },
    {
      title: 'Shadow Games',
      description: 'An eclectic mix of fine jewellery - to be worn often.',
      link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Shadow_games_compressed.pdf?v=1709642153',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/6ef918_dda50d76e89e497694803b84c6141c25_mv2.webp?crop=center&height=700&v=1708884745&width=700'
    },
    {
      title: 'Wave After Wave',
      description: 'Wave After Wave is a show of 200 jewels, hand-picked by me from all over India featuring a myriad of contemporary styles and genres.',
      link: 'https://cdn.shopify.com/s/files/1/0793/9247/3397/files/Wave_After_Wave_ADS_Price-compressed_compressed_1.pdf?v=1708935358',
      image: 'https://www.arundhatidesheth.com/cdn/shop/files/Screenshot_2025-04-08_154631.png?v=1744107417&width=600'
    }
  ];

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-main)', minHeight: '100vh', padding: '120px 24px' }}>
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '100px' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: 'var(--font-serif)', marginBottom: '24px', letterSpacing: '0.02em' }}>
            Catalogues
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6', fontWeight: 300 }}>
            Explore our curated collections, exhibitions, and lookbooks.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '80px 40px' }}>
          {catalogues.map((cat, index) => (
            <article key={index} style={{ display: 'flex', flexDirection: 'column', paddingBottom: '32px' }}>
              <a href={cat.link} target="_blank" rel="noopener noreferrer" style={{ display: 'block', overflow: 'hidden', marginBottom: '24px', background: 'var(--bg-secondary)', borderRadius: '2px', aspectRatio: '3/4' }}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} 
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} 
                />
              </a>
              <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>{cat.title}</h2>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '32px', flex: 1 }}>
                {cat.description}
              </p>
              <a 
                href={cat.link} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  alignSelf: 'flex-start',
                  fontSize: '0.8rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.15em', 
                  color: 'var(--text-main)', 
                  borderBottom: '1px solid var(--text-main)', 
                  paddingBottom: '4px', 
                  textDecoration: 'none', 
                  transition: 'opacity 0.3s' 
                }} 
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.5'} 
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                View Catalogue
              </a>
            </article>
          ))}
        </div>
        
      </div>
    </div>
  );
}
