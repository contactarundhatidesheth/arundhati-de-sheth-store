import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { sendNewsletterWelcome } from '@/lib/email';
import { checkRateLimit } from '@/lib/anti-spam';

const DISPOSABLE_DOMAINS = [
    'mailinator.com', 'tempmail.com', 'guerrillamail.com', '10minutemail.com',
    'yopmail.com', 'trashmail.com', 'sharklasers.com', 'throwawaymail.com',
    'getairmail.com', 'dispostable.com', 'fakemailgenerator.com', 'mytemp.email',
    'burnermail.io', 'dropmail.me', 'temp-mail.org', 'crazymailing.com'
];

export async function POST(req: Request) {
    try {
        // Extract client IP address for rate limiting
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || 'unknown';

        const rateLimit = checkRateLimit(clientIp);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many requests. Please wait a moment.' },
                { status: 429 }
            );
        }

        const body = await req.json().catch(() => ({}));
        const { email, honeypot } = body;

        // 1. Honeypot check: If the hidden honeypot field has any value, bot triggered
        if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
            return NextResponse.json({ success: true, message: 'Successfully subscribed to the newsletter!' });
        }

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(trimmedEmail) || /\.{2,}/.test(trimmedEmail)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        const domain = trimmedEmail.split('@')[1] || '';
        if (DISPOSABLE_DOMAINS.includes(domain)) {
            // Silently absorb disposable bot emails without dispatching Graph API emails
            return NextResponse.json({ success: true, message: 'Successfully subscribed to the newsletter!' });
        }

        const supabase = createClient();

        // Insert email into newsletter_subscribers securely
        const { error: dbError } = await supabase.from('newsletter_subscribers').insert({
            email: trimmedEmail,
            created_at: new Date().toISOString()
        });

        if (dbError) {
            if (dbError.code === '23505') { // Postgres distinctive code for UNIQUE constraint violation
                return NextResponse.json({ error: 'You are already subscribed!' }, { status: 400 });
            }
            console.error('Newsletter Database Error:', dbError);
            return NextResponse.json({ error: 'Failed to subscribe to newsletter. Please try again.' }, { status: 500 });
        }

        try {
            await sendNewsletterWelcome(trimmedEmail);
        } catch (e) {
            console.error('Failed to send newsletter welcome: ', e);
        }

        return NextResponse.json({ success: true, message: 'Successfully subscribed to the newsletter!' });
    } catch (error: any) {
        console.error('Newsletter processing error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
