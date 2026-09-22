import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { readDB } from '@/lib/db';

export default async function WhatsNewPage() {
  const db = await readDB();

  // Seeder successful, cache just needs to be busted via Server Action

  const sortedBlogs = [...db.blogs]
    .filter(b => !b.publication?.toLowerCase().includes('youtube') && !b.publication?.toLowerCase().includes('seen on'))
    .sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  const legacyYoutube = [...db.blogs]
    .filter(b => b.publication?.toLowerCase().includes('youtube'))
    .map(b => {
      let vidId = b.link || b.excerpt || '';
      if (vidId.includes('v=')) vidId = vidId.split('v=')[1].split('&')[0];
      else if (vidId.includes('youtu.be/')) vidId = vidId.split('youtu.be/')[1].split('?')[0];
      return { id: b.id, title: b.title, video_id: vidId, sequence: b.sequence };
    });

  const legacySeenOn = [...db.blogs]
    .filter(b => b.publication?.toLowerCase().includes('seen on'))
    .map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.publication,
      description: b.title,
      image1: b.image || '',
      image2: '',
      link: b.link || '',
      sequence: b.sequence
    }));

  const sortedYoutube = [...db.youtubeVideos, ...legacyYoutube].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));
  const sortedSeenOn = [...db.seenOnFeatures, ...legacySeenOn].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#000000', paddingBottom: '120px' }}>

      {/* Hero Header */}
      <section style={{ position: 'relative', width: '100%', height: '85vh', overflow: 'hidden', background: '#000' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <img
            src="/brand/logo-white.png"
            alt="Press & Editorial"
            style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 1, padding: '40px' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 'clamp(30px, 5vw, 60px)', left: 'clamp(20px, 5vw, 60px)', right: '20px', zIndex: 10 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            fontWeight: '300',
            fontFamily: 'var(--font-serif)',
            color: '#fff',
            margin: '0 0 16px 0',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontStyle: 'italic'
          }}>
            Press
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontWeight: '300', maxWidth: '560px', marginBottom: '32px' }}>
            A selection of editorial features, interviews, and celebrity stylings.
          </p>
        </div>
      </section>

      {/* 1. In The News */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
          {sortedBlogs.map((article) => (
            <a key={article.id} href={article.link || '#'} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '24px', background: '#F5F5F5' }}>
                <Image src={article.image || '/pressimages/press-hero.png'} alt={article.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', fontWeight: '400', marginBottom: '16px' }}>
                {article.title}
              </h3>
              <p style={{ fontSize: '14px', fontFamily: 'var(--font-serif)', color: '#666', marginTop: 'auto' }}>
                {article.publication}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* 2. WATCH */}
      {sortedYoutube.length > 0 && (
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '80px 24px' }}>
          <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '64px', textAlign: 'center' }}>
            WATCH
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px' }}>
            {sortedYoutube.map((video) => {
              const rawId = video.video_id || '';
              const safeVidId = rawId.includes('v=') ? rawId.split('v=')[1].split('&')[0] :
                rawId.includes('youtu.be/') ? rawId.split('youtu.be/')[1].split('?')[0] :
                  rawId.includes('/embed/') ? rawId.split('/embed/')[1].split('?')[0] :
                    rawId;
              return (
                <div key={video.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: '100%', aspectRatio: '16/9', marginBottom: '24px' }}>
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${safeVidId}`}
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
              );
            })}
          </div>
        </section>
      )}

      {/* 3. Seen On */}
      {sortedSeenOn.length > 0 && (
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '120px 24px' }}>
          <h2 style={{ fontSize: '34.5px', fontFamily: 'var(--font-serif)', fontStyle: 'italic', marginBottom: '80px', textAlign: 'center' }}>
            Seen On
          </h2>

          {sortedSeenOn.map((feature, idx) => (
            <div key={feature.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', alignItems: 'center', marginBottom: '120px' }}>

              {/* Optional secondary structure based on index could be added, but we strictly map to mirror original JSX */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                {feature.image2 ? (
                  <Image src={feature.image2} alt={feature.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <Image src="/pressimages/press-hero.png" alt="Fallback" fill style={{ objectFit: 'cover' }} />
                )}
              </div>

              <div style={{ textAlign: 'center', padding: '0 24px' }}>
                <h4 style={{ fontSize: '26.8px', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>{feature.title}</h4>
                <h6 style={{ fontSize: '19.1px', fontFamily: 'var(--font-serif)', marginBottom: '32px', color: '#666', whiteSpace: 'pre-wrap' }}>{feature.subtitle}</h6>
                <hr style={{ width: '50px', border: 'none', borderTop: '1px solid #000', margin: '0 auto 32px' }} />
                <p style={{ fontSize: '15px', fontFamily: 'Figtree, sans-serif', lineHeight: '22.5px', marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
                  {feature.description}
                </p>
                {feature.link && (
                  <Link href={feature.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontSize: '11.6px', fontFamily: 'Figtree, sans-serif', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #000', paddingBottom: '4px', textDecoration: 'none', color: '#000' }}>
                    See More
                  </Link>
                )}
              </div>

              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', background: '#F5F5F5' }}>
                {feature.image1 ? (
                  <Image src={feature.image1} alt={feature.title} fill style={{ objectFit: 'cover' }} />
                ) : (
                  <Image src="/pressimages/press-hero.png" alt="Fallback" fill style={{ objectFit: 'cover' }} />
                )}
              </div>

            </div>
          ))}

        </section>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
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
      `}} />
    </div>
  );
}
