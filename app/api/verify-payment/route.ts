import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ error: 'Razorpay secret not configured' }, { status: 500 });
    }

    // Verify signature
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid Payment Signature' }, { status: 400 });
    }

    // Update the order in Supabase
    const supabase = createClient();
    const { error } = await supabase
      .from('orders')
      .update({
        razorpay_payment_id: razorpay_payment_id,
        status: 'Paid'
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (error) {
      console.error('Failed to update order status:', error);
      // We still return success to the client because the payment was actually successful,
      // but ideally we should have a retry mechanism or alert the admin.
      return NextResponse.json({ error: 'Payment verified, but database update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Payment verified successfully' });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
