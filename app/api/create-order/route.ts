import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from '@/lib/config/razorpay';

export async function POST(req: Request) {
  try {
    const { amount, cartItems, guestName, guestEmail, guestPhone, shippingAddress, couponCode, discountAmount } = await req.json();

    if (!guestName || !guestEmail || !guestPhone) {
      return NextResponse.json({ error: 'Name, Email and Phone are required for checkout' }, { status: 400 });
    }

    // Check if keys exist
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Razorpay keys not configured' },
        { status: 500 }
      );
    }

    // Create an order via Razorpay API
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64'),
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Amount in paise (multiply by 100)
        currency: 'INR',
        receipt: `receipt_${Date.now()}`
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.description || 'Razorpay Order Creation Failed');
    }

    const supabase = createClient();

    // Insert pending order into Supabase
    const { error: dbError } = await supabase.from('orders').insert({
      user_id: null,
      user_email: guestEmail,
      user_phone: guestPhone,
      razorpay_order_id: data.id,
      amount: amount,
      status: 'Pending',
      shipping_address: {
        ...shippingAddress,
        name: guestName,
        tracking_number: null,
        coupon_applied: couponCode || null,
        discount_amount: discountAmount || 0
      },
      items: cartItems
    });

    if (dbError) {
      console.error('Database Error:', dbError);
      throw new Error('Failed to save order to database');
    }

    // Flag any pending abandoned carts for this email as 'recovered' to halt automated emails
    await supabase.from('abandoned_carts').update({ status: 'recovered', updated_at: new Date().toISOString() }).eq('email', guestEmail);

    return NextResponse.json({ orderId: data.id, keyId: RAZORPAY_KEY_ID });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
