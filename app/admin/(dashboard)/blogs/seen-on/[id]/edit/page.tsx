import React from 'react';
import { notFound } from 'next/navigation';
import { readDB } from '@/lib/db';
import SeenOnForm from '@/app/admin/components/SeenOnForm';

export default async function EditSeenOnFeature({ params }: { params: { id: string } }) {
    const db = await readDB();
    const feature = db.seenOnFeatures.find(f => f.id === params.id);

    if (!feature) return notFound();

    return <SeenOnForm initialData={feature} />;
}
