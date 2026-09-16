import { getPremiumEmailTemplate } from '@/lib/email';

export default function PreviewEmails() {
    const newsletter = getPremiumEmailTemplate(`
        <h1>Welcome to our World</h1>
        <p>Thank you for subscribing to the Arundhati De-Sheth newsletter. We are delighted to have you join our private network of fine jewellery connoisseurs.</p>
        <p>You will be the first to receive curation insights, early access to exclusive acquisitions, and sophisticated insights into the world of High Jewellery.</p>
    `);

    const order = getPremiumEmailTemplate(`
        <h1>Order Confirmation</h1>
        <p>Thank you for entrusting Arundhati De-Sheth with your acquisition. Your order has been successfully placed and is currently being processed by our atelier.</p>
        <table class="receipt-table" cellpadding="0" cellspacing="0" style="width: 100%; margin-top: 20px; margin-bottom: 20px;">
            <tr>
                <th style="text-align: left; padding-bottom: 10px; border-bottom: 1px solid #EAEAEA; font-weight: normal; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Order Reference</th>
                <th style="text-align: right; padding-bottom: 10px; border-bottom: 1px solid #EAEAEA; font-weight: normal; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Amount</th>
            </tr>
            <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #F5F5F5;">#ORD-998877</td>
                <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #F5F5F5;">Rs. 4,50,000</td>
            </tr>
        </table>
        <div class="receipt-total" style="border-top: 1px solid #111; padding-top: 15px; margin-top: 15px; text-align: right;">
            <p style="margin:0; font-size: 16px;"><strong>Total: Rs. 4,50,000</strong></p>
        </div>
        <p style="margin-top: 30px;">Our client advisory team will gently notify you the moment your piece has been dispatched.</p>
    `);

    const contact = getPremiumEmailTemplate(`
        <h1>Client Inquiry</h1>
        <div style="background-color: #FAFAFA; padding: 20px; border: 1px solid #EAEAEA;">
            <p style="margin-top:0;"><strong>Client Name:</strong> Alexandra DuPont</p>
            <p><strong>Email Address:</strong> alexandra@example.com</p>
            <p><strong>Phone:</strong> +91 90000 11111</p>
            <p><strong>Subject:</strong> Private Viewing Inquiry</p>
        </div>
        <div class="divider" style="height: 1px; background-color: #EAEAEA; margin: 30px 0;"></div>
        <p><strong>Client Message:</strong></p>
        <p style="font-style: italic; border-left: 2px solid #111; padding-left: 15px;">I am incredibly interested in commissioning a bespoke diamond necklace for an upcoming gala event. Could I reserve a private viewing session at the atelier?</p>
    `);

    return (
        <div style={{ padding: '40px', backgroundColor: '#e5e5e5', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center' }}>
            <h1 style={{ fontFamily: 'sans-serif', letterSpacing: '2px', textTransform: 'uppercase', color: '#333' }}>Email Template Previews</h1>

            <div style={{ width: '100%', maxWidth: '800px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'sans-serif' }}>1. Newsletter Welcome</h2>
                <div dangerouslySetInnerHTML={{ __html: newsletter }} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            </div>

            <div style={{ width: '100%', maxWidth: '800px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'sans-serif' }}>2. Order Confirmation</h2>
                <div dangerouslySetInnerHTML={{ __html: order }} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            </div>

            <div style={{ width: '100%', maxWidth: '800px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'sans-serif' }}>3. Contact Submissions</h2>
                <div dangerouslySetInnerHTML={{ __html: contact }} style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }} />
            </div>
        </div>
    );
}
