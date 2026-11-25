import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/utils/supabase-admin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { code, cartTotal } = await req.json();
    if (!code || typeof code !== 'string') {
      return NextResponse.json({ error: 'Please enter a coupon code' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const couponId = `coupon_${cleanCode}`;

    const supabase = getSupabaseAdmin();
    const { data: section, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('id', couponId)
      .maybeSingle();

    if (error || !section) {
      return NextResponse.json({ error: 'Invalid coupon code' }, { status: 404 });
    }

    if (section.link === 'inactive') {
      return NextResponse.json({ error: 'This coupon code has expired or is inactive' }, { status: 400 });
    }

    const discountType = section.subtitle === 'FIXED' ? 'FIXED' : 'PERCENTAGE';
    const discountVal = parseFloat(section.description) || 0;

    let minOrder = 0;
    try {
      if (section.image) {
        const meta = JSON.parse(section.image);
        minOrder = meta.minOrder || 0;
      }
    } catch (e) {}

    const total = Number(cartTotal) || 0;
    if (minOrder > 0 && total < minOrder) {
      return NextResponse.json({
        error: `Minimum order amount for this coupon is ₹${minOrder.toLocaleString('en-IN')}`
      }, { status: 400 });
    }

    let discountAmount = 0;
    if (discountType === 'PERCENTAGE') {
      discountAmount = Math.round((total * discountVal) / 100);
    } else {
      discountAmount = Math.min(total, discountVal);
    }

    return NextResponse.json({
      valid: true,
      code: cleanCode,
      discountType,
      discountValue: discountVal,
      discountAmount,
      finalTotal: Math.max(0, total - discountAmount),
      message: `Coupon ${cleanCode} applied successfully!`
    });
  } catch (err: any) {
    console.error('Coupon validation error:', err);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
