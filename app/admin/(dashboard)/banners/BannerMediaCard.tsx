'use client';

import React, { useState, useRef } from 'react';
import { saveBannerSection, getDirectUploadUrl } from '@/app/admin/actions';

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
  const initialType: 'image' | 'video' =
    banner.supportsVideo && (currentVideo ? 'video' : currentImage ? 'image' : banner.defaultMedia.endsWith('.mp4') ? 'video' : 'image');

  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialType);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.set('id', banner.id);
      formData.set('title', banner.label);
      if (banner.supportsVideo) {
        formData.set('mediaType', mediaType);
      }

      let activeImageUrl = currentImage;
      let activeVideoUrl = currentVideo;

      // 1. Direct upload video file if selected
      const videoFile = videoInputRef.current?.files?.[0];
      if (banner.supportsVideo && mediaType === 'video' && videoFile) {
        setUploadStatus(`Uploading video "${videoFile.name}" directly to storage...`);
        const { signedUrl, publicUrl } = await getDirectUploadUrl(videoFile.name, videoFile.type);

        const uploadRes = await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': videoFile.type || 'video/mp4',
          },
          body: videoFile,
        });

        if (!uploadRes.ok) {
          throw new Error(`Video upload failed (${uploadRes.status}): ${await uploadRes.text()}`);
        }

        activeVideoUrl = publicUrl;
      }

      // 2. Direct upload image file if selected
      const imageFile = imageInputRef.current?.files?.[0];
      if ((!banner.supportsVideo || mediaType === 'image') && imageFile) {
        setUploadStatus(`Uploading image "${imageFile.name}" directly to storage...`);
        const { signedUrl, publicUrl } = await getDirectUploadUrl(imageFile.name, imageFile.type);

        const uploadRes = await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': imageFile.type || 'image/jpeg',
          },
          body: imageFile,
        });

        if (!uploadRes.ok) {
          throw new Error(`Image upload failed (${uploadRes.status}): ${await uploadRes.text()}`);
        }

        activeImageUrl = publicUrl;
      }

      // Set media values
      setUploadStatus('Saving banner configuration...');
      formData.set('image', activeImageUrl);
      formData.set('link', mediaType === 'image' ? '' : activeVideoUrl);

      await saveBannerSection(formData);
    } catch (err: any) {
      console.error('Banner upload error:', err);
      setErrorMessage(err.message || 'Failed to upload media. Please try again.');
      setUploading(false);
    }
  };

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

      {errorMessage && (
        <div style={{ padding: '12px 16px', background: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px' }}>
          {errorMessage}
        </div>
      )}

      {uploading && uploadStatus && (
        <div style={{ padding: '12px 16px', background: '#f0f9ff', color: '#0369a1', border: '1px solid #bae6fd', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>⏳</span> {uploadStatus}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: '#222' }}>
              Upload Image File (from local drive)
            </label>
            <div style={{ background: '#fff', border: '1px dashed #ccc', padding: '16px', borderRadius: '4px' }}>
              <input
                ref={imageInputRef}
                type="file"
                name="imageFile"
                accept="image/*"
                style={{ fontSize: '0.85rem', width: '100%' }}
              />
              <p style={{ fontSize: '0.75rem', color: '#888', margin: '8px 0 0 0' }}>
                Choose an image (.jpg, .png, .webp) from your computer. It will be uploaded directly to storage, immediately replacing the image.
              </p>
            </div>
          </div>
        )}

        {banner.supportsVideo && mediaType === 'video' && (
          <div style={{ background: '#fcfcfc', border: '1px solid #ebebeb', borderRadius: '6px', padding: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px', color: '#222' }}>
              Upload Video File (from local drive)
            </label>
            <div style={{ background: '#fff', border: '1px dashed #ccc', padding: '16px', borderRadius: '4px' }}>
              <input
                ref={videoInputRef}
                type="file"
                name="videoFile"
                accept="video/mp4,video/webm,video/quicktime,video/*"
                style={{ fontSize: '0.85rem', width: '100%' }}
              />
              <p style={{ fontSize: '0.75rem', color: '#888', margin: '8px 0 0 0' }}>
                Choose an .mp4 or .webm video from your computer. It will be uploaded directly to storage, immediately replacing the video.
              </p>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              background: '#000',
              color: '#fff',
              padding: '10px 24px',
              borderRadius: '4px',
              border: 'none',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: uploading ? 'not-allowed' : 'pointer',
              opacity: uploading ? 0.7 : 1,
            }}
          >
            {uploading ? 'Uploading...' : 'Save Banner'}
          </button>
        </div>
      </form>
    </div>
  );
}
