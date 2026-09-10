import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const { orderId, emailOrPhone } = await req.json();

        if (!orderId || !emailOrPhone) {
            return NextResponse.json({ error: 'Order ID and Identifier are required' }, { status: 400 });
        }

        const supabase = createClient();

        // We search the orders table securely via RPC (bypasses RLS specifically for this order ID)
        const { data: order } = await supabase
            .rpc('get_tracking_order', { p_razorpay_order_id: orderId })
            .single();

        if (!order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Verify ownership of the order via email/phone match
        const cleanIdentifier = emailOrPhone.trim().toLowerCase();

        const emailMatch = order.user_email && order.user_email.toLowerCase() === cleanIdentifier;
        const phoneMatch = order.user_phone && order.user_phone.toLowerCase().replace(/\s/g, '') === cleanIdentifier.replace(/\s/g, '');

        if (!emailMatch && !phoneMatch) {
            return NextResponse.json({ error: 'Order found, but the email/phone does not match our records.' }, { status: 403 });
        }

        // Scrub out sensitive IDs
        const safeOrder = {
            razorpay_order_id: order.razorpay_order_id,
            razorpay_payment_id: order.razorpay_payment_id,
            amount: order.amount,
            status: order.status,
            items: order.items,
            created_at: order.created_at
        };

        return NextResponse.json({ order: safeOrder });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 500 });
    }
}
