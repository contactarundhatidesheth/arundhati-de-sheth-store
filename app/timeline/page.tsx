import React from 'react';
import TimelineClient from './TimelineClient';
import { readDB } from '@/lib/db';

export default function TimelinePage() {
  const db = readDB();
  return <TimelineClient timelineEvents={db.timelineEvents} />;
}
