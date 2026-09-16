import { NextResponse } from 'next/server';
import { sendContactNotification, sendContactThankYou } from '@/lib/email';
import { getSupabaseAdmin } from '@/utils/supabase-admin';

export async function POST(req: Request) {
    try {
        const { name, email, phone, subject, message } = await req.json();

        // Ensure all required fields exist
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 1. Log to CRM Database
        const supabase = getSupabaseAdmin();
        const { error: dbError } = await supabase.from('contact_inquiries').insert([{
            name, email, phone, subject: subject || 'General', message
        }]);

        if (dbError) {
            console.error('Failed to log contact inquiry to database:', dbError);
            // We continue processing to ensure email delivers even if DB has an issue, but log it.
        }

        // 2. Notify Admin via Graph API
        await sendContactNotification(name, email, phone, subject, message);

        // 3. Dispatch automated Thank You Email back to the customer
        await sendContactThankYou(email, name, subject);

        return NextResponse.json({ success: true, messageId: 'graph-api-sent' });
    } catch (error: any) {
        console.error('Email send error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
