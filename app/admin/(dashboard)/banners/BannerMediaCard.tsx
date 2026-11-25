'use client';

import React, { useState } from 'react';
import { saveBannerSection } from '@/app/admin/actions';

interface BannerConfig {
  id: string;
  label: string;
  page: string;
  description: string;
  defaultMedia: string;
  supportsVideo?: boolean;
}

interface BannerMediaCardProps {
  banner: BannerConfig;
  currentImage: string;
  currentVideo: string;
}

export function BannerMediaCard({ banner, currentImage, currentVideo }: BannerMediaCardProps) {
  // Determine initial media type: if banner supports video and has a video set, or defaults to video
  const initialType: 'image' | 'video' =
    banner.supportsVideo && (currentVideo ? 'video' : currentImage ? 'image' : banner.defaultMedia.endsWith('.mp4') ? 'video' : 'image');

  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialType);

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #eaeaea',
        padding: '28px 32px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', fontWeight: 600 }}>
            {banner.page}
          </span>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 500, margin: '4px 0 6px' }}>
            {banner.label}
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#666', margin: 0 }}>
            {banner.description}
          </p>
        </div>
      </div>

      {/* Preview of current media */}
      <div style={{ marginBottom: '20px', padding: '14px 16px', background: '#fafafa', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
        <p style={{ fontSize: '0.75rem', color: '#888', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
          Current Active Source:
        </p>
        <div style={{ fontSize: '0.85rem', color: '#111', wordBreak: 'break-all' }}>
          {currentVideo ? (
            <div>
              <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#000', color: '#fff', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '8px' }}>
                Video
              </span>
              <span>{currentVideo}</span>
            </div>
          ) : currentImage ? (
            <div>
              <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#e5e5e5', color: '#111', fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '8px' }}>
                Image
              </span>
              <span>{currentImage}</span>
            </div>
          ) : (
            <span style={{ color: '#999', fontStyle: 'italic' }}>Default: {banner.defaultMedia}</span>
          )}
        </div>
      </div>

      <form action={saveBannerSection} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="hidden" name="id" value={banner.id} />
        <input type="hidden" name="title" value={banner.label} />
        {banner.supportsVideo && <input type="hidden" name="mediaType" value={mediaType} />}

        {/* Media Type Selector if banner supports video */}
        {banner.supportsVideo && (
          <div style={{ marginBottom: '6px' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#555', marginBottom: '8px' }}>
              Choose Media Format:
            </label>
            <div style={{ display: 'inline-flex', background: '#f5f5f5', padding: '4px', borderRadius: '6px', gap: '4px' }}>
              <button
                type="button"
                onClick={() => setMediaType('image')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: mediaType === 'image' ? 600 : 400,
                  background: mediaType === 'image' ? '#000' : 'transparent',
                  color: mediaType === 'image' ? '#fff' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>📷</span> Image
              </button>
              <button
                type="button"
                onClick={() => setMediaType('video')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: mediaType === 'video' ? 600 : 400,
                  background: mediaType === 'video' ? '#000' : 'transparent',
                  color: mediaType === 'video' ? '#fff' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>🎬</span> Video
              </button>
            </div>
          </div>
        )}

        {/* Conditionally rendered inputs based on choice */}
        {(!banner.supportsVideo || mediaType === 'image') && (
          <div style={{ background: '#fcfcfc', border: '1px solid #ebebeb', borderRadius: '6px', padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#222' }}>
              Image URL (or upload image file below)
            </label>
            <input
              type="text"
              name="image"
              defaultValue={currentImage}
              placeholder={banner.defaultMedia.endsWith('.mp4') ? 'https://.../hero.jpg' : banner.defaultMedia}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
                background: '#fff'
              }}
            />
            <div style={{ marginTop: '12px' }}>
              <label style={{ fontSize: '0.78rem', color: '#555', display: 'block', marginBottom: '4px', fontWeight: 500 }}>
                Or upload new image file:
              </label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                style={{ fontSize: '0.85rem' }}
              />
            </div>
          </div>
        )}

        {banner.supportsVideo && mediaType === 'video' && (
          <div style={{ background: '#fcfcfc', border: '1px solid #ebebeb', borderRadius: '6px', padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: '#222' }}>
              Video URL (.mp4 or stream URL)
            </label>
            <input
              type="text"
              name="link"
              defaultValue={currentVideo || (banner.defaultMedia.endsWith('.mp4') ? banner.defaultMedia : '')}
              placeholder={banner.defaultMedia.endsWith('.mp4') ? banner.defaultMedia : 'https://.../video.mp4'}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                fontSize: '0.9rem',
                background: '#fff'
              }}
            />
            <p style={{ fontSize: '0.78rem', color: '#777', marginTop: '8px', lineHeight: '1.4', margin: '8px 0 12px 0' }}>
              When video is selected, this video will play in the background on the live site.
            </p>

            {/* Optional Fallback Poster image for video */}
            <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '12px', marginTop: '8px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: '#666', marginBottom: '4px' }}>
                Optional Fallback Poster / Preview Image URL:
              </label>
              <input
                type="text"
                name="image"
                defaultValue={currentImage}
                placeholder="https://.../fallback-poster.jpg"
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  fontSize: '0.85rem',
                  background: '#fff'
                }}
              />
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="submit"
            style={{
              background: '#000',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
            }}
          >
            Save Banner
          </button>
        </div>
      </form>
    </div>
  );
}
