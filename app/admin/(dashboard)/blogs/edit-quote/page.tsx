import React from 'react';
import { readDB } from '@/lib/db';
import PageSectionForm from '@/app/admin/components/PageSectionForm';

export default async function EditQuote() {
    const db = await readDB();
    const section = db.pageSections.find(s => s.id === 'press-quote') || {};

    return (
        <PageSectionForm
            sectionId="press-quote"
            titlePrefix="Quote Section"
            initialData={section}
            showSubtitle={true}
            showImage={false}
            showLink={false}
        />
    );
}
