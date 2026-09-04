import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, id, referrer } = body;
    
    const db = await readDB();
    if (!db.analytics) return NextResponse.json({ error: 'DB not ready' }, { status: 500 });
    
    // Get today's date string (e.g. YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];

    if (type === 'page_view') {
      db.analytics.visitors += 1;
      db.analytics.dailyVisitors[today] = (db.analytics.dailyVisitors[today] || 0) + 1;
      
      // Track Referrer if exists
      if (referrer) {
        let source = 'Direct';
        if (referrer.includes('instagram.com')) source = 'Instagram';
        else if (referrer.includes('google.')) source = 'Google Search';
        else if (referrer.includes('arundhatidesheth.com')) source = 'Internal';
        else if (referrer !== '') source = 'Other Referral';
        
        if (source !== 'Internal') {
          db.analytics.referrers[source] = (db.analytics.referrers[source] || 0) + 1;
        }
      }
    } else if (type === 'product_view' && id) {
      db.analytics.productViews[id] = (db.analytics.productViews[id] || 0) + 1;
    } else if (type === 'whatsapp_click') {
      db.analytics.whatsappClicks += 1;
    }

    // TODO: Implement Supabase analytics tracking
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}
