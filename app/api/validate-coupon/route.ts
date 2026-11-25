import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/utils/supabase-admin';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { code, cartTotal, cartItems } = await req.json();
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
    let appliesTo = 'ALL';
    let applicableProducts: string[] = [];

    try {
      if (section.image) {
        const meta = JSON.parse(section.image);
        minOrder = meta.minOrder || 0;
        appliesTo = meta.appliesTo || 'ALL';
        applicableProducts = Array.isArray(meta.applicableProducts) ? meta.applicableProducts : [];
      }
    } catch (e) {}

    const total = Number(cartTotal) || 0;
    if (minOrder > 0 && total < minOrder) {
      return NextResponse.json({
        error: `Minimum order amount for this coupon is ₹${minOrder.toLocaleString('en-IN')}`
      }, { status: 400 });
    }

    // Product eligibility checking
    const items = Array.isArray(cartItems) ? cartItems : [];
    let eligibleTotal = total;

    if (appliesTo === 'SELECTED') {
      if (applicableProducts.length === 0) {
        return NextResponse.json({
          error: 'This coupon is not configured for any products currently.'
        }, { status: 400 });
      }

      // Check which items in cart match applicable product IDs
      const matchingItems = items.filter((item: any) => {
        const pId = String(item?.product?.id || item?.id || '');
        return applicableProducts.includes(pId);
      });

      if (matchingItems.length === 0) {
        return NextResponse.json({
          error: 'This coupon code is not applicable to any of the items in your cart.'
        }, { status: 400 });
      }

      // Calculate total only for eligible products in cart
      eligibleTotal = matchingItems.reduce((sum: number, item: any) => {
        const itemPrice = Number(item?.product?.price || item?.price || 0);
        const itemQty = Number(item?.quantity || 1);
        return sum + (itemPrice * itemQty);
      }, 0);
    }

    let discountAmount = 0;
    if (discountType === 'PERCENTAGE') {
      discountAmount = Math.round((eligibleTotal * discountVal) / 100);
    } else {
      // Fixed discount cannot exceed eligible items total
      discountAmount = Math.min(eligibleTotal, discountVal);
    }

    // Extract product titles for display
    const applicableProductTitles = appliesTo === 'SELECTED'
      ? items
          .filter((item: any) => applicableProducts.includes(String(item?.product?.id || item?.id || '')))
          .map((item: any) => item?.product?.title || item?.title || 'Selected piece')
      : [];

    return NextResponse.json({
      valid: true,
      code: cleanCode,
      discountType,
      discountValue: discountVal,
      discountAmount,
      appliesTo,
      applicableProducts: appliesTo === 'SELECTED' ? applicableProducts : [],
      applicableProductTitles,
      finalTotal: Math.max(0, total - discountAmount),
      message: appliesTo === 'SELECTED' 
        ? `Coupon ${cleanCode} applied to eligible items!` 
        : `Coupon ${cleanCode} applied successfully!`
    });
  } catch (err: any) {
    console.error('Coupon validation error:', err);
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}
