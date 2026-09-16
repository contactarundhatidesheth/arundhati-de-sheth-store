import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const { email, phone, cart } = await req.json();

        if (!email || !cart || cart.length === 0) {
            return NextResponse.json({ error: 'Missing required cart data' }, { status: 400 });
        }

        const supabase = createClient();

        // Check if there is already a pending cart for this email
        const { data: existingCart } = await supabase
            .from('abandoned_carts')
            .select('id')
            .eq('email', email)
            .eq('status', 'pending')
            .single();

        if (existingCart) {
            // Update the existing pending cart
            const { error: updateError } = await supabase
                .from('abandoned_carts')
                .update({ phone, cart_state: cart, updated_at: new Date().toISOString() })
                .eq('id', existingCart.id);

            if (updateError) throw updateError;
        } else {
            // Insert a completely new pending cart
            const { error: insertError } = await supabase
                .from('abandoned_carts')
                .insert([{ email, phone, cart_state: cart, status: 'pending' }]);

            if (insertError) throw insertError;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Failed to log cart state:', error);
        return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
    }
}
