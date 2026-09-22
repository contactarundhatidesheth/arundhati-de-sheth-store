import React from 'react';
import Link from 'next/link';
import { readDB } from '@/lib/db';
import { deleteBlog, deleteYoutubeVideo, deleteSeenOnFeature } from '@/app/admin/actions';
import SequenceEditor from '../SequenceEditor';

export default async function AdminBlogs() {
  const db = await readDB();
  const sortedBlogs = [...db.blogs].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  // Filter out blogs that were manually added as YouTube or Seen On so they don't clutter the main list
  const actualArticles = sortedBlogs.filter(b => !b.publication.toLowerCase().includes('youtube') && !b.publication.toLowerCase().includes('seen on'));
  const legacyYoutubeBlogs = sortedBlogs.filter(b => b.publication.toLowerCase().includes('youtube'));
  const legacySeenOnBlogs = sortedBlogs.filter(b => b.publication.toLowerCase().includes('seen on'));

  const unifiedYoutube = [
    ...db.youtubeVideos.map(v => ({ ...v, isLegacy: false })),
    ...legacyYoutubeBlogs.map(b => ({
      id: b.id,
      title: b.title,
      video_id: 'Legacy (Uses Link)',
      sequence: b.sequence,
      isLegacy: true,
      originalBlog: b
    }))
  ].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  const unifiedSeenOn = [
    ...db.seenOnFeatures.map(f => ({ ...f, isLegacy: false })),
    ...legacySeenOnBlogs.map(b => ({
      id: b.id,
      title: b.title,
      subtitle: b.publication,
      description: b.title,
      image1: b.image || '',
      image2: '',
      link: b.link || '',
      sequence: b.sequence,
      isLegacy: true,
      originalBlog: b
    }))
  ].sort((a, b) => (a.sequence || 999) - (b.sequence || 999));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Press & Blogs (What&apos;s New)</h1>
      </div>



      {/* SECTION 1: ARTICLES */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>Articles (In The News)</h2>
          <Link href="/admin/blogs/new" style={{ background: '#111', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Add Article
          </Link>
        </div>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Cover</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Publication</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Title</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {actualArticles.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    No press articles found. Create one to get started.
                  </td>
                </tr>
              ) : (
                actualArticles.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                    <td style={{ padding: '16px 24px' }}><SequenceEditor collection="blogs" id={b.id} initialSequence={b.sequence ?? ''} /></td>
                    <td style={{ padding: '16px 24px' }}><img src={b.image || '/pressimages/press-hero.png'} alt={b.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                    <td style={{ padding: '16px 24px', fontWeight: '500' }}>{b.publication}</td>
                    <td style={{ padding: '16px 24px', color: '#666' }}>{b.title}</td>
                    <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                      <Link href={`/admin/blogs/${b.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                      <form action={async () => { 'use server'; await deleteBlog(b.id); }}>
                        <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: YOUTUBE VIDEOS */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>YouTube Videos (Watch)</h2>
          <Link href="/admin/blogs/youtube/new" style={{ background: '#111', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Add Video
          </Link>
        </div>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Video ID</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Title</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unifiedYoutube.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    No YouTube videos found.
                  </td>
                </tr>
              ) : (
                unifiedYoutube.map(v => (
                  <tr key={v.id} style={{ borderBottom: '1px solid #eaeaea', background: v.isLegacy ? '#fffdf5' : 'transparent' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <SequenceEditor collection={v.isLegacy ? "blogs" : "youtubeVideos"} id={v.id} initialSequence={v.sequence ?? ''} />
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: v.isLegacy ? '#888' : '#333' }}>
                      {v.video_id}
                    </td>
                    <td style={{ padding: '16px 24px', color: '#666' }}>{v.title}</td>
                    <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                      {v.isLegacy ? (
                        <>
                          <Link href={`/admin/blogs/${v.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit as Blog</Link>
                          <form action={async () => { 'use server'; await deleteBlog(v.id); }}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                          </form>
                        </>
                      ) : (
                        <>
                          <Link href={`/admin/blogs/youtube/${v.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                          <form action={async () => { 'use server'; await deleteYoutubeVideo(v.id); }}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                          </form>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: SEEN ON FEATURES */}
      <div style={{ marginBottom: '64px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)' }}>Celebrity Features (Seen On)</h2>
          <Link href="/admin/blogs/seen-on/new" style={{ background: '#111', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Add Seen On Feature
          </Link>
        </div>
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Seq</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Images</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Celebrity</th>
                <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unifiedSeenOn.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                    No Seen On features found.
                  </td>
                </tr>
              ) : (
                unifiedSeenOn.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid #eaeaea', background: f.isLegacy ? '#fffdf5' : 'transparent' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <SequenceEditor collection={f.isLegacy ? "blogs" : "seenOnFeatures"} id={f.id} initialSequence={f.sequence ?? ''} />
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {f.image1 && <img src={f.image1} alt="Col 1" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px', border: f.isLegacy ? '2px dashed #ccc' : 'none' }} />}
                        {f.image2 && <img src={f.image2} alt="Col 2" style={{ width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontWeight: '500', color: f.isLegacy ? '#888' : '#333' }}>
                      {f.title}
                      {f.isLegacy && <span style={{ fontSize: '11px', background: '#eee', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Legacy</span>}
                    </td>
                    <td style={{ padding: '16px 24px', display: 'flex', gap: '16px' }}>
                      {f.isLegacy ? (
                        <>
                          <Link href={`/admin/blogs/${f.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit as Blog</Link>
                          <form action={async () => { 'use server'; await deleteBlog(f.id); }}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                          </form>
                        </>
                      ) : (
                        <>
                          <Link href={`/admin/blogs/seen-on/${f.id}/edit`} style={{ color: '#0066cc', textDecoration: 'underline' }}>Edit</Link>
                          <form action={async () => { 'use server'; await deleteSeenOnFeature(f.id); }}>
                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                          </form>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
