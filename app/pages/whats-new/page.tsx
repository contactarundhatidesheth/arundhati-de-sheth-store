import React from 'react';
import { readDB } from '@/lib/db';
import WhatsNewClient from './WhatsNewClient';

export default async function WhatsNewPage() {
  const db = await readDB();
  return <WhatsNewClient blogs={db.blogs} />;
}
