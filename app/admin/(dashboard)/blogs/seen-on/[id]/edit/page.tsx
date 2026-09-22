import React from 'react';
import SeenOnForm from '@/app/admin/components/SeenOnForm';
import { readDB } from '@/lib/db';

export default async function EditSeenOnFeature({ params }: { params: { id: string } }) {
    const db = await readDB();
    const feature = db.seenOnFeatures.find(f => f.id === params.id);

    if (!feature) return <div>Feature not found</div>;

    return <SeenOnForm initialData={feature} />;
}
