import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendAbandonedCartEmail } from '@/lib/email';

// Required for Vercel Cron
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const supabase = createClient();

        // Calculate timestamp for 2 hours ago
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

        // Fetch all pending carts older than 2 hours
        const { data: abandonedCarts, error } = await supabase
            .from('abandoned_carts')
            .select('*')
            .eq('status', 'pending')
            .lt('updated_at', twoHoursAgo);

        if (error) {
            throw error;
        }

        if (!abandonedCarts || abandonedCarts.length === 0) {
            return NextResponse.json({ success: true, message: 'No abandoned carts to process' });
        }

        const notificationResults = [];

        for (const cart of abandonedCarts) {
            try {
                // Dispatch Azure logic
                await sendAbandonedCartEmail(cart.email, cart.cart_state);

                // Flag as emailed to prevent duplicates
                await supabase
                    .from('abandoned_carts')
                    .update({ status: 'emailed' })
                    .eq('id', cart.id);

                notificationResults.push({ id: cart.id, status: 'success' });
            } catch (err: any) {
                console.error(`Failed to send abandoned email to ${cart.email}:`, err);
                notificationResults.push({ id: cart.id, status: 'failed', reason: err.message });
            }
        }

        return NextResponse.json({ success: true, processed: notificationResults });
    } catch (error: any) {
        console.error('Cron job error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
