'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { CanvasVideoPlayer } from './CanvasVideoPlayer';

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 0, 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      overflow: 'hidden',
      background: '#000000'
    }}>
      
      <CanvasVideoPlayer totalFrames={300} isPlaying={isPlaying} />

      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        background: 'rgba(0, 0, 0, 0.15)',
        zIndex: 1
      }} />

      {/* Bottom Left: Play/Pause Controls */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        zIndex: 2,
      }}>
        <button 
          onClick={togglePlay}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            color: '#ffffff',
            background: 'transparent',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          }}
        >
          {isPlaying ? <Pause size={18} strokeWidth={1.5} /> : <Play size={18} strokeWidth={1.5} style={{ marginLeft: '2px' }} />}
        </button>
      </div>

    </section>
  );
};
