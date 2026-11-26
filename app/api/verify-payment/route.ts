import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';
import { RAZORPAY_KEY_SECRET } from '@/lib/config/razorpay';

export async function POST(req: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const secret = RAZORPAY_KEY_SECRET;
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

    // Fetch the order to get full details for notifications and avoid double sends
    const { getSupabaseAdmin } = await import('@/utils/supabase-admin');
    const supabase = getSupabaseAdmin();
    
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('razorpay_order_id', razorpay_order_id)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching order before verification update:', fetchError);
    }

    const wasAlreadyPaid = existingOrder?.status === 'Paid';

    // Update the order in Supabase
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        razorpay_payment_id: razorpay_payment_id,
        status: 'Paid'
      })
      .eq('razorpay_order_id', razorpay_order_id);

    if (updateError) {
      console.error('Failed to update order status:', updateError);
      return NextResponse.json({ error: 'Payment verified, but database update failed' }, { status: 500 });
    }

    // Trigger emails only if this is the first time the order is marked Paid
    if (!wasAlreadyPaid && existingOrder) {
      try {
        const { sendOrderConfirmation, sendAdminOrderAlert } = await import('@/lib/email');
        const orderDetails = {
          orderId: existingOrder.id,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          customerEmail: existingOrder.user_email,
          customerPhone: existingOrder.user_phone,
          customerName: existingOrder.shipping_address?.name || '',
          amount: existingOrder.amount,
          shippingAddress: existingOrder.shipping_address,
          items: existingOrder.items
        };

        // Fire both emails asynchronously
        await Promise.allSettled([
          sendOrderConfirmation(orderDetails),
          sendAdminOrderAlert(orderDetails)
        ]);
      } catch (emailErr) {
        console.error('Email dispatch error in verify-payment:', emailErr);
      }
    }

    return NextResponse.json({ success: true, message: 'Payment verified successfully' });
  } catch (error: any) {
    console.error('Verify payment error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
