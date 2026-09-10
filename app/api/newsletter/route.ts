import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
        }

        const supabase = createClient();

        // Insert email into newsletter_subscribers securely
        const { error: dbError } = await supabase.from('newsletter_subscribers').insert({
            email: email,
            created_at: new Date().toISOString()
        });

        if (dbError) {
            if (dbError.code === '23505') { // Postgres distinctive code for UNIQUE constraint violation
                return NextResponse.json({ error: 'You are already subscribed!' }, { status: 400 });
            }
            console.error('Newsletter Database Error:', dbError);
            return NextResponse.json({ error: 'Failed to subscribe to newsletter. Please try again.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Successfully subscribed to the newsletter!' });
    } catch (error: any) {
        console.error('Newsletter processing error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
