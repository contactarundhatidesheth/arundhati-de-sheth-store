import React from 'react';
import YoutubeForm from '@/app/admin/components/YoutubeForm';
import { readDB } from '@/lib/db';

export default async function EditYoutubeVideo({ params }: { params: { id: string } }) {
    const db = await readDB();
    const video = db.youtubeVideos.find(v => v.id === params.id);

    if (!video) return <div>Video not found</div>;

    return <YoutubeForm initialData={video} />;
}
