import React from 'react';
import TimelineClient from './TimelineClient';
import { readDB } from '@/lib/db';

export default async function TimelinePage() {
  const db = await readDB();
  return <TimelineClient timelineEvents={db.timelineEvents} />;
}
