import React from 'react';
import { readDB } from '@/lib/db';
import PageSectionForm from '@/app/admin/components/PageSectionForm';

export default async function EditHero() {
    const db = await readDB();
    const section = db.pageSections.find(s => s.id === 'press-hero') || {};

    return (
        <PageSectionForm
            sectionId="press-hero"
            titlePrefix="Press Hero Settings"
            initialData={section}
            showSubtitle={true}
            showImage={true}
            showLink={false}
        />
    );
}
