'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export const Hero: React.FC = () => {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const playVideos = async () => {
      try {
        if (video1Ref.current) await video1Ref.current.play();
        if (video2Ref.current) await video2Ref.current.play();
        setIsPlaying(true);
      } catch (e) {
        console.error('Autoplay failed', e);
      }
    };
    playVideos();
  }, []);

  const togglePlay = () => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (isPlaying) {
      v1.pause();
      v2.pause();
    } else {
      v1.play();
      v2.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        display: 'flex',
        overflow: 'hidden',
        background: '#000',
      }}
    >
      <div className="hero-inner" style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
      {/* Left Video */}
      <div className="hero-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <video
          ref={video1Ref}
          src="/videos/look1.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* subtle dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.12)',
          }}
        />
      </div>

      {/* Centre Divider */}
      <div
        className="hero-divider"
        style={{
          width: '1px',
          flexShrink: 0,
          background: 'rgba(255,255,255,0.25)',
          zIndex: 2,
        }}
      />

      {/* Right Video */}
      <div className="hero-panel" style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <video
          ref={video2Ref}
          src="/videos/look2.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {/* subtle dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.12)',
          }}
        />
      </div>


      </div>{/* end hero-inner */}

      {/* Play / Pause — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '40px',
          zIndex: 4,
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.5)',
            color: '#ffffff',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.borderColor = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          }}
        >
          {isPlaying ? (
            <Pause size={18} strokeWidth={1.5} />
          ) : (
            <Play size={18} strokeWidth={1.5} style={{ marginLeft: '2px' }} />
          )}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-inner { flex-direction: column !important; }
          .hero-divider { width: 100% !important; height: 1px !important; }
          .hero-panel { flex: none !important; width: 100% !important; height: 50vh !important; }
        }
      `}</style>
    </section>
  );
};
