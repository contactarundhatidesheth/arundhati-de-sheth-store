import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, id, referrer } = body;

    let source = 'Direct';
    if (referrer) {
      if (referrer.includes('instagram.com')) source = 'Instagram';
      else if (referrer.includes('google.')) source = 'Google Search';
      else if (referrer.includes('arundhatidesheth.com')) source = 'Internal';
      else if (referrer !== '') source = 'Other Referral';
    }

    const supabase = createClient();
    const { error } = await supabase.from('analytics_events').insert({
      event_type: type,
      product_id: id || null,
      referrer: referrer || null,
      source: source
    });

    if (error) {
      console.error('Analytics DB Error:', error);
      return NextResponse.json({ error: 'Failed DB insertion' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracker Error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}

