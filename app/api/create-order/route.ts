import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { amount, cartItems, shippingAddress } = await req.json();

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if keys exist
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
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
        Authorization: 'Basic ' + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64'),
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

    // Insert pending order into Supabase
    const { error: dbError } = await supabase.from('orders').insert({
      user_id: user.id,
      user_email: user.email,
      razorpay_order_id: data.id,
      amount: amount,
      status: 'Pending',
      shipping_address: shippingAddress,
      items: cartItems
    });

    if (dbError) {
      console.error('Database Error:', dbError);
      throw new Error('Failed to save order to database');
    }

    return NextResponse.json({ orderId: data.id, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
