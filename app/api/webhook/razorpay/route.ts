import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const bodyText = await req.text();
        const signature = req.headers.get('x-razorpay-signature');
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!signature || !secret) {
            return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
        }

        // Verify the signature
        const expectedSignature = crypto
            .createHmac('sha256', secret)
            .update(bodyText)
            .digest('hex');

        if (expectedSignature !== signature) {
            return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
        }

        const event = JSON.parse(bodyText);

        // Handle the event
        const supabase = createClient();
        if (event.event === 'payment.captured' || event.event === 'order.paid') {
            const paymentEntity = event.payload.payment.entity;
            const orderId = paymentEntity.order_id;
            const paymentId = paymentEntity.id;

            // Update the database
            const { error } = await supabase
                .from('orders')
                .update({
                    razorpay_payment_id: paymentId,
                    status: 'Paid'
                })
                .eq('razorpay_order_id', orderId);

            if (error) {
                console.error('Webhook Db Error:', error);
                return NextResponse.json({ error: 'Failed DB Update' }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.error('Webhook Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
