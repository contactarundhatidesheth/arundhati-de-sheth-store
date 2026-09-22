import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
    const supabase = createClient();
    // Fetch one product just to get a valid ID
    const { data: prods } = await supabase.from('products').select('*').limit(1);
    if (!prods || prods.length === 0) return NextResponse.json({ error: 'No products' });

    const p = prods[0];

    // Try to update is_active to see the exact error
    const { error } = await supabase.from('products').update({ is_active: false }).eq('id', p.id);

    // Revert it immediately if it somehow succeeded
    if (!error) {
        await supabase.from('products').update({ is_active: p.is_active }).eq('id', p.id);
    }

    return NextResponse.json({
        supabaseError: error ? error.message : null,
        testedProduct: p.id,
        success: !error
    });
}
