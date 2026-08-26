'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollVideoCanvasProps {
  /** Path to extracted frames in public folder (without leading slash) */
  framesPath?: string;
  /** Total number of extracted frames */
  frameCount?: number;
  /** Height of scroll container */
  scrollHeight?: string;
  /** Children rendered as overlay content */
  children?: React.ReactNode;
  /** Padding around the overlay content */
  padding?: string;
}

export const ScrollVideoCanvas: React.FC<ScrollVideoCanvasProps> = ({
  framesPath = 'video-frames/frame-',
  frameCount = 300,
  scrollHeight = '200vh',
  children,
  padding = '24px',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  // Preload all frame images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/${framesPath}${frameNum}.png`;

      img.onload = () => {
        loaded++;
        if (loaded === frameCount) {
          setLoadedImages([...images]);
          setIsReady(true);
        }
      };

      img.onerror = () => {
        loaded++;
        if (loaded === frameCount) {
          setLoadedImages([...images]);
          setIsReady(true);
        }
      };

      images.push(img);
    }
  }, [framesPath, frameCount]);

  // Scroll-driven frame rendering
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas || !isReady) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full section size
    const resizeCanvas = () => {
      if (section) {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.bottom < -100 || rect.top > windowHeight * 2.5) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Calculate scroll progress (0 to 1)
      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (rect.height + windowHeight)
      ));

      // Map progress to frame index
      const frameIndex = Math.min(
        loadedImages.length - 1,
        Math.floor(scrollProgress * loadedImages.length)
      );

      // Draw frame covering the entire canvas
      if (loadedImages[frameIndex] && loadedImages[frameIndex].complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Cover logic: scale image to cover canvas while maintaining aspect ratio
        const img = loadedImages[frameIndex];
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = canvas.width / canvas.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        if (imgRatio > canvasRatio) {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        } else {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loadedImages, isReady]);

  return (
    <div
      ref={sectionRef}
      style={{
        height: scrollHeight,
        position: 'relative',
        overflow: 'hidden',
        background: '#1A1A1A',
      }}
    >
      {/* Full-background canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.45)',
        zIndex: 1,
      }} />

      {/* Loading state */}
      {!isReady && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-light)',
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          zIndex: 2,
        }}>
          Loading frames...
        </div>
      )}

      {/* Overlay content */}
      {children && (
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding,
        }}>
          <div style={{
            background: 'rgba(26, 26, 26, 0.75)',
            backdropFilter: 'blur(12px)',
            padding: 'clamp(40px, 6vw, 80px) 24px',
            textAlign: 'center',
            color: '#FAF9F7',
            maxWidth: '700px',
            width: '100%',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--text-on-dark-faint)',
            pointerEvents: 'auto',
          }}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};
