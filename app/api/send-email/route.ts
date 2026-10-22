import { NextResponse } from 'next/server';
import { sendContactNotification, sendContactThankYou } from '@/lib/email';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import { validateInquiry, checkRateLimit, isDuplicateInquiry } from '@/lib/anti-spam';

export async function POST(req: Request) {
    try {
        // Extract client IP address for rate limiting
        const forwardedFor = req.headers.get('x-forwarded-for');
        const realIp = req.headers.get('x-real-ip');
        const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || 'unknown';

        // 1. IP Rate Limiting
        const rateLimit = checkRateLimit(clientIp);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                { error: 'Too many submissions. Please wait a moment before submitting again.' },
                { status: 429, headers: { 'Retry-After': String(rateLimit.retryAfter || 10) } }
            );
        }

        const body = await req.json().catch(() => ({}));
        const { name, email, phone, subject, message, honeypot, formLoadedAt } = body;

        // 2. Anti-Spam Validation (Honeypot, Timing, Heuristic, Email syntax)
        const validation = validateInquiry({
            name,
            email,
            phone,
            subject,
            message,
            honeypot,
            formLoadedAt
        });

        if (validation.isSpam) {
            console.warn(`[AntiSpam] Blocked spam inquiry (${validation.reason}) from IP ${clientIp}:`, {
                name,
                email,
                subject
            });
            // Return silent success to trick bots into thinking their submission succeeded
            return NextResponse.json({ success: true, messageId: 'received' });
        }

        if (!validation.isValid) {
            return NextResponse.json(
                { error: 'Please check your inputs and provide valid contact details.' },
                { status: 400 }
            );
        }

        // 3. Deduplication check (prevents double-clicks, back-to-back refreshes within 5 mins)
        if (isDuplicateInquiry({ email: email!, name: name!, message: message! })) {
            console.log(`[AntiSpam] Suppressed duplicate inquiry from ${email} within 5 minutes.`);
            return NextResponse.json({ success: true, duplicate: true, messageId: 'duplicate-suppressed' });
        }

        // 4. Log to CRM Database
        const supabase = getSupabaseAdmin();
        const { error: dbError } = await supabase.from('contact_inquiries').insert([{
            name: name.trim(),
            email: email.trim().toLowerCase(),
            phone: phone ? phone.trim() : null,
            subject: subject || 'General Inquiry',
            message: message.trim()
        }]);

        if (dbError) {
            console.error('Failed to log contact inquiry to database:', dbError);
        }

        // 5. Notify Admin via Graph API
        await sendContactNotification(name.trim(), email.trim(), phone ? phone.trim() : '', subject || 'General Inquiry', message.trim());

        // 6. Dispatch automated Thank You Email back to the customer
        await sendContactThankYou(email.trim(), name.trim(), subject || 'General Inquiry');

        return NextResponse.json({ success: true, messageId: 'graph-api-sent' });
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
