import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const { docketId, emailOrPhone } = await req.json();

        if (!docketId || !emailOrPhone) {
            return NextResponse.json({ error: 'Docket ID and Identifier are required' }, { status: 400 });
        }

        const supabase = createClient();

        // Check if the docketId matches the shipping_address JSON tracking_number, or fallback to razorpay order id just in case
        const { data: order, error } = await supabase
            .from('orders')
            .select('*')
            .or(`shipping_address->>tracking_number.eq.${docketId},razorpay_order_id.eq.${docketId}`)
            .maybeSingle();

        if (error || !order) {
            return NextResponse.json({ error: 'Order not found' }, { status: 404 });
        }

        // Verify ownership of the order via email/phone match
        const cleanIdentifier = emailOrPhone.trim().toLowerCase();

        const emailMatch = order.user_email && order.user_email.toLowerCase() === cleanIdentifier;
        const phoneMatch = order.user_phone && order.user_phone.toLowerCase().replace(/\s/g, '') === cleanIdentifier.replace(/\s/g, '');

        if (!emailMatch && !phoneMatch) {
            return NextResponse.json({ error: 'Order found, but the email/phone does not match our records.' }, { status: 403 });
        }

        // Fetch Live Courier Tracking Details
        let courierDetails = null;
        if (order.shipping_address?.tracking_number) {
            try {
                const courierRes = await fetch(`https://secureglobal.in/api/api/Docket/TrackPracel?DocketRefNo=${order.shipping_address.tracking_number}`);
                const courierData = await courierRes.json();
                if (courierData.status_Code === 200 && courierData.data) {
                    courierDetails = courierData.data;
                }
            } catch (err) {
                console.error("Failed to securely fetch live courier tracking data:", err);
            }
        }

        // Scrub out sensitive IDs
        const safeOrder = {
            razorpay_order_id: order.razorpay_order_id,
            razorpay_payment_id: order.razorpay_payment_id,
            amount: order.amount,
            status: order.status,
            items: order.items,
            shipping_address: order.shipping_address,
            courierDetails: courierDetails,
            created_at: order.created_at
        };

        return NextResponse.json({ order: safeOrder });
    } catch (error) {
        console.error('Tracking error:', error);
        return NextResponse.json({ error: 'Failed to retrieve order' }, { status: 500 });
    }
}
