import React from 'react';
import { readDB } from '@/lib/db';
import PageSectionForm from '@/app/admin/components/PageSectionForm';

export default async function EditMedia() {
    const db = await readDB();
    const section = db.pageSections.find(s => s.id === 'press-media') || {};

    return (
        <PageSectionForm
            sectionId="press-media"
            titlePrefix="Media Inquiries Section"
            initialData={section}
            showSubtitle={true}
            showImage={false}
            showLink={false}
        />
    );
}
