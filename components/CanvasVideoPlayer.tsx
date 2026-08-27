'use client';

import React, { useRef, useEffect, useState } from 'react';

interface CanvasVideoPlayerProps {
  totalFrames: number;
  isPlaying: boolean;
}

export const CanvasVideoPlayer: React.FC<CanvasVideoPlayerProps> = ({ totalFrames, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(1);
  const requestRef = useRef<number>();
  const [loadedFrames, setLoadedFrames] = useState(0);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(4, '0');
      img.src = `/video-frames/frame-${frameString}.png`;
      img.onload = () => {
        loadedCount++;
        setLoadedFrames(loadedCount);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [totalFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();
    const fps = 24; // Assuming 24fps
    const frameInterval = 1000 / fps;

    const animate = (time: number) => {
      if (isPlaying) {
        const deltaTime = time - lastTime;
        
        if (deltaTime >= frameInterval) {
          const img = imagesRef.current[frameRef.current - 1];
          if (img && img.complete) {
            // Draw image covering the canvas (object-fit: cover equivalent)
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
              drawHeight = canvas.width / imgRatio;
              offsetY = (canvas.height - drawHeight) / 2;
            } else {
              drawWidth = canvas.height * imgRatio;
              offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          }

          frameRef.current = (frameRef.current % totalFrames) + 1;
          lastTime = time;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, totalFrames]);

  // Handle resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial size

    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, background: '#000' }}>
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
      {loadedFrames < totalFrames * 0.1 && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
          Loading Experience... {Math.round((loadedFrames / totalFrames) * 100)}%
        </div>
      )}
    </div>
  );
};
