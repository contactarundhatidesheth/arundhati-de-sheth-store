import fs from 'fs';
import path from 'path';

function getEnvVar(key: string): string {
    if (process.env[key]) return process.env[key]!;
    try {
        const envPath = path.join(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const content = fs.readFileSync(envPath, 'utf8');
            const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
            if (match) return match[1].trim();
        }
    } catch (e) { }
    return '';
}

export async function getGraphAccessToken(): Promise<string> {
    const tenant = getEnvVar('AZURE_TENANT_ID');
    const clientId = getEnvVar('AZURE_CLIENT_ID');
    const clientSecret = getEnvVar('AZURE_CLIENT_SECRET');

    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'client_credentials',
        scope: 'https://graph.microsoft.com/.default'
    });

    const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
    });

    let data;
    const responseText = await response.text();
    try {
        data = JSON.parse(responseText);
    } catch (err) {
        data = { error: 'Invalid JSON response from Graph API token endpoint', text: responseText };
    }

    if (!response.ok) {
        console.error('Failed to get Graph token:', data);
        throw new Error('Graph Error: ' + JSON.stringify(data));
    }
    return data.access_token;
}

export async function sendGraphEmail(toAddress: string, subject: string, htmlContent: string) {
    const accessToken = await getGraphAccessToken();
    const fromAddress = getEnvVar('EMAIL_USER');

    const response = await fetch(`https://graph.microsoft.com/v1.0/users/${fromAddress}/sendMail`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: {
                subject: subject,
                body: { contentType: "HTML", content: htmlContent },
                toRecipients: [{ emailAddress: { address: toAddress } }]
            },
            saveToSentItems: "true"
        })
    });

    if (!response.ok) {
        let err;
        const responseText = await response.text();
        try {
            err = JSON.parse(responseText);
        } catch (e) {
            err = { error: { message: responseText || 'Empty response from Graph API' } };
        }
        console.error("Graph API Send Error:", err);
        throw new Error(err.error?.message || "Failed to send email via Graph API");
    }
}

export function getPremiumEmailTemplate(content: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arundhatidesheth.com';
    return `
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <style>
            :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
            }
            body { margin: 0; padding: 0; background-color: #FAFAFA; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
            table { border-collapse: collapse; }
            .container { max-width: 600px; margin: 0 auto; background-color: #FFFFFF; }
            .header { padding: 36px 20px; text-align: center; border-bottom: 1px solid #EAEAEA; }
            .logo-link { text-decoration: none; display: inline-block; }
            .content { padding: 48px 40px; color: #333333; line-height: 1.8; font-size: 14px; }
            .content h1 { font-family: 'Times New Roman', Times, serif; font-size: 22px; font-weight: normal; color: #111111; margin-top: 0; margin-bottom: 24px; letter-spacing: 0.5px; }
            .content p { margin: 0 0 16px 0; }
            .footer { padding: 40px 20px; text-align: center; background-color: #FAFAFA; color: #888888; font-size: 11px; letter-spacing: 1px; line-height: 1.5; }
            .divider { height: 1px; background-color: #EAEAEA; margin: 30px 0; }
            .receipt-table { width: 100%; margin-top: 20px; margin-bottom: 20px; }
            .receipt-table th { text-align: left; padding-bottom: 10px; border-bottom: 1px solid #EAEAEA; font-weight: normal; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
            .receipt-table td { padding: 15px 0; border-bottom: 1px solid #F5F5F5; }
            .receipt-total { border-top: 1px solid #111; padding-top: 15px; margin-top: 15px; text-align: right; }

            /* Dark mode overrides for modern email clients */
            @media (prefers-color-scheme: dark) {
                .brand-logo-img {
                    filter: invert(1) brightness(1.2) drop-shadow(0 0 1px rgba(255, 255, 255, 0.4)) !important;
                }
            }
            [data-ogsc] .brand-logo-img {
                filter: invert(1) brightness(1.2) drop-shadow(0 0 1px rgba(255, 255, 255, 0.4)) !important;
            }
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #FAFAFA;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #FAFAFA; width: 100%;">
            <tr>
                <td align="center" style="padding: 30px 15px;">
                    <table class="container" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #EAEAEA;">
                        <!-- Header with Brand Logo -->
                        <tr>
                            <td class="header" align="center" style="padding: 36px 20px; text-align: center; border-bottom: 1px solid #EAEAEA; background-color: #FFFFFF;">
                                <a href="https://www.arundhatidesheth.com" class="logo-link" target="_blank" style="text-decoration: none; display: inline-block;">
                                    <div style="background-color: #FFFFFF; padding: 12px 24px; border-radius: 6px; display: inline-block;">
                                        <img src="${baseUrl}/brand/logo.png" 
                                             class="brand-logo-img"
                                             alt="Arundhati De-Sheth" 
                                             width="210" 
                                             style="display: block; width: 210px; max-width: 100%; height: auto; margin: 0 auto; border: 0; outline: none; text-decoration: none; filter: drop-shadow(0 0 1px rgba(255,255,255,0.8));" />
                                    </div>
                                </a>
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td class="content" style="padding: 48px 40px; color: #333333; line-height: 1.8; font-size: 14px; background-color: #FFFFFF;">
                                ${content}
                                <br/>
                                <p style="margin: 0 0 16px 0;">Warm regards,<br/><strong>The Jewellery Confluence</strong></p>
                            </td>
                        </tr>
                        <!-- Footer -->
                        <tr>
                            <td class="footer" style="padding: 40px 20px; text-align: center; background-color: #FAFAFA; color: #888888; font-size: 11px; letter-spacing: 1px; line-height: 1.5; border-top: 1px solid #EAEAEA;">
                                <p style="margin: 0 0 6px 0; letter-spacing: 1.5px; text-transform: uppercase;">ARUNDHATI DE-SHETH | The Jewellery Confluence</p>
                                <p style="margin: 0 0 6px 0;">Mumbai, India</p>
                                <p style="margin-top: 15px; margin-bottom: 0;"><a href="https://www.arundhatidesheth.com" style="color: #888888; text-decoration: none;">www.arundhatidesheth.com</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

export async function sendNewsletterWelcome(email: string) {
    const html = getPremiumEmailTemplate(`
        <h1>Welcome to our World</h1>
        <p>Thank you for prescribing to the Arundhati De-Sheth newsletter. We are delighted to have you join our private network of fine jewellery connoisseurs.</p>
        <p>You will be the first to receive curation insights, early access to exclusive acquisitions, and sophisticated insights into the world of High Jewellery.</p>
    `);

    await sendGraphEmail(email, 'Welcome to Arundhati De-Sheth', html);
}

export interface OrderEmailDetails {
    orderId: string;
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    customerEmail: string;
    customerPhone?: string;
    customerName?: string;
    amount: number;
    shippingAddress?: {
        name?: string;
        address?: string;
        city?: string;
        state?: string;
        postal_code?: string;
        country?: string;
        phone?: string;
        coupon_applied?: string;
        discount_amount?: number;
    } | any;
    items?: Array<{
        product?: {
            title?: string;
            price?: number;
            selectedMetal?: string;
            selectedSize?: string;
            images?: string[];
            image?: string;
        };
        quantity?: number;
        title?: string;
        price?: number;
        metal?: string;
        size?: string;
    }>;
}

export async function sendOrderConfirmation(orderData: OrderEmailDetails | string, legacyOrderId?: string, legacyAmount?: number) {
    // Support backwards compatibility if called with (email, orderId, amount)
    let details: OrderEmailDetails;
    if (typeof orderData === 'string') {
        details = {
            customerEmail: orderData,
            orderId: legacyOrderId || 'Bespoke',
            amount: legacyAmount || 0
        };
    } else {
        details = orderData;
    }

    const { orderId, amount, customerEmail, shippingAddress, items, razorpayPaymentId } = details;
    const clientName = shippingAddress?.name || details.customerName || 'Valued Client';

    // Format items table rows
    let itemsHtml = '';
    if (items && Array.isArray(items) && items.length > 0) {
        itemsHtml = items.map(item => {
            const product = item.product || item;
            const title = product.title || (item as any).title || 'Bespoke Jewellery';
            const price = Number(product.price || (item as any).price || 0);
            const qty = Number(item.quantity || 1);
            const metal = product.selectedMetal || (product as any).metal || '';
            const size = product.selectedSize || (product as any).size || '';
            const image = (product.images && product.images[0]) || product.image || (item as any).image;

            const specs = [metal, size ? `Size: ${size}` : ''].filter(Boolean).join(' • ');

            return `
            <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top;">
                    ${image ? `<img src="${image}" alt="${title}" width="54" height="54" style="object-fit: cover; border-radius: 4px; float: left; margin-right: 14px; border: 1px solid #EAEAEA;" />` : ''}
                    <div>
                        <strong style="color: #111; font-size: 13.5px; display: block;">${title}</strong>
                        ${specs ? `<span style="color: #777; font-size: 12px; display: block; margin-top: 2px;">${specs}</span>` : ''}
                        <span style="color: #999; font-size: 12px; display: block; margin-top: 2px;">Qty: ${qty}</span>
                    </div>
                </td>
                <td style="text-align: right; padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top; font-size: 14px; font-weight: 500; color: #111;">
                    Rs. ${(price * qty).toLocaleString('en-IN')}
                </td>
            </tr>
            `;
        }).join('');
    } else {
        itemsHtml = `
            <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #F0F0F0; font-size: 14px;">Bespoke Acquisition</td>
                <td style="text-align: right; padding: 14px 0; border-bottom: 1px solid #F0F0F0; font-size: 14px;">Rs. ${amount.toLocaleString('en-IN')}</td>
            </tr>
        `;
    }

    // Format address
    let addressHtml = '';
    if (shippingAddress && (shippingAddress.address || shippingAddress.city)) {
        addressHtml = `
            <div style="background-color: #FAFAFA; border: 1px solid #EAEAEA; padding: 18px 20px; margin-top: 28px; border-radius: 4px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: 600;">Delivery Address</p>
                <p style="margin: 0; font-size: 13px; color: #333; line-height: 1.6;">
                    <strong>${shippingAddress.name || clientName}</strong><br/>
                    ${shippingAddress.address || ''}<br/>
                    ${[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code].filter(Boolean).join(', ')}<br/>
                    ${shippingAddress.country || 'India'}<br/>
                    ${shippingAddress.phone ? `Phone: ${shippingAddress.phone}` : ''}
                </p>
            </div>
        `;
    }

    const html = getPremiumEmailTemplate(`
        <h1>Order Confirmation</h1>
        <p>Dear ${clientName},</p>
        <p>Thank you for entrusting Arundhati De-Sheth with your acquisition. Your payment has been received and verified successfully. Your bespoke fine jewellery order is now being processed by our master atelier.</p>
        
        <div style="background-color: #FAFAFA; border-left: 2px solid #111; padding: 12px 16px; margin: 20px 0;">
            <p style="margin: 0; font-size: 12.5px; color: #444;">
                <strong>Order Reference:</strong> #${orderId.slice(0, 12)}<br/>
                ${razorpayPaymentId ? `<strong>Payment Reference:</strong> ${razorpayPaymentId}<br/>` : ''}
                <strong>Status:</strong> Confirmed & Paid
            </p>
        </div>

        <table class="receipt-table" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 24px;">
            <thead>
                <tr>
                    <th style="text-align: left; padding-bottom: 10px; border-bottom: 1px solid #DDD; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #777;">Item Details</th>
                    <th style="text-align: right; padding-bottom: 10px; border-bottom: 1px solid #DDD; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #777;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHtml}
            </tbody>
        </table>
        
        <div class="receipt-total" style="border-top: 1px solid #111; padding-top: 14px; margin-top: 16px; text-align: right;">
            <p style="margin: 0; font-size: 16px; color: #111;"><strong>Grand Total: Rs. ${amount.toLocaleString('en-IN')}</strong></p>
        </div>

        ${addressHtml}
        
        <p style="margin-top: 32px; font-size: 13.5px; color: #555;">
            Our client advisory team will notify you the moment your piece is securely packaged and dispatched with its secure transit tracking docket.
        </p>
    `);

    await sendGraphEmail(customerEmail, `Order Confirmation - #${orderId.slice(0, 8)} | Arundhati De-Sheth`, html);
}

export async function sendAdminOrderAlert(details: OrderEmailDetails) {
    const { orderId, amount, customerEmail, customerPhone, shippingAddress, items, razorpayPaymentId, razorpayOrderId } = details;
    const clientName = shippingAddress?.name || details.customerName || 'Client';

    // Format items
    let itemsSummary = '';
    if (items && Array.isArray(items)) {
        itemsSummary = items.map(item => {
            const product = item.product || item;
            const title = product.title || (item as any).title || 'Bespoke Item';
            const price = Number(product.price || (item as any).price || 0);
            const qty = Number(item.quantity || 1);
            const metal = product.selectedMetal || (product as any).metal || '';
            const size = product.selectedSize || (product as any).size || '';
            const specs = [metal, size ? `Size: ${size}` : ''].filter(Boolean).join(' | ');

            return `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                    <strong>${title}</strong> (x${qty})<br/>
                    ${specs ? `<span style="color: #666; font-size: 12px;">${specs}</span>` : ''}
                </td>
                <td style="text-align: right; padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                    Rs. ${(price * qty).toLocaleString('en-IN')}
                </td>
            </tr>`;
        }).join('');
    }

    const fullAddress = shippingAddress ? `
        ${shippingAddress.address || ''}<br/>
        ${[shippingAddress.city, shippingAddress.state, shippingAddress.postal_code].filter(Boolean).join(', ')}<br/>
        ${shippingAddress.country || 'India'}
    ` : 'Not provided';

    const phone = shippingAddress?.phone || customerPhone || 'Not provided';

    const htmlContent = getPremiumEmailTemplate(`
        <h1 style="color: #111;">New Order Received (Paid)</h1>
        <p style="font-size: 14px; color: #222;">A new order has been successfully placed and paid online on Arundhati De-Sheth.</p>
        
        <div style="background-color: #FAFAFA; border: 1px solid #EAEAEA; padding: 18px 20px; margin: 20px 0;">
            <p style="margin: 0 0 6px 0;"><strong>Order ID:</strong> #${orderId}</p>
            <p style="margin: 0 0 6px 0;"><strong>Total Paid:</strong> Rs. ${amount.toLocaleString('en-IN')}</p>
            <p style="margin: 0 0 6px 0;"><strong>Payment ID:</strong> ${razorpayPaymentId || 'N/A'}</p>
            <p style="margin: 0 0 6px 0;"><strong>Razorpay Order:</strong> ${razorpayOrderId || 'N/A'}</p>
            <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 12px 0;" />
            <p style="margin: 0 0 6px 0;"><strong>Customer Name:</strong> ${clientName}</p>
            <p style="margin: 0 0 6px 0;"><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
            <p style="margin: 0 0 6px 0;"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p style="margin: 0;"><strong>Shipping Destination:</strong><br/>${fullAddress}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="text-align: left; padding-bottom: 8px; border-bottom: 1px solid #111; font-size: 11px; text-transform: uppercase;">Purchased Items</th>
                    <th style="text-align: right; padding-bottom: 8px; border-bottom: 1px solid #111; font-size: 11px; text-transform: uppercase;">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${itemsSummary}
            </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
            <p style="margin: 0; font-size: 15px; font-weight: bold;">Total: Rs. ${amount.toLocaleString('en-IN')}</p>
        </div>

        <p style="margin-top: 30px; text-align: center;">
            <a href="https://www.arundhatidesheth.com/ad-admin/orders" style="display: inline-block; padding: 12px 24px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">View in Admin Panel</a>
        </p>
    `);

    // Notify primary atelier email & secondary email
    const recipients = ['arundhati@arundhatidesheth.com', 'contactarundhatidesheth@gmail.com'];
    for (const recipient of recipients) {
        try {
            await sendGraphEmail(recipient, `New Order Received: #${orderId.slice(0, 8)} (Rs. ${amount.toLocaleString('en-IN')})`, htmlContent);
        } catch (e) {
            console.error(`Failed to alert admin at ${recipient}:`, e);
        }
    }
}

export async function sendOrderTrackingEmail(recipientEmail: string, recipientName: string, orderId: string, trackingNumber: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arundhatidesheth.com';
    const portalUrl = `${baseUrl}/track`;

    const html = getPremiumEmailTemplate(`
        <h1>Order Dispatch Confirmation</h1>
        <p>Dear ${recipientName || 'Client'},</p>
        <p>We are pleased to inform you that your bespoke fine jewellery order (<strong>#${orderId.slice(0, 8)}</strong>) has been packaged and securely dispatched.</p>
        
        <div style="background: #FAFAFA; padding: 24px; border: 1px solid #EAEAEA; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Docket Tracking Number</p>
            <p style="margin: 8px 0 0 0; font-size: 24px; font-family: monospace; font-weight: 600; color: #333;">${trackingNumber}</p>
        </div>

        <p>Your logistics carrier is Secure Global Logistics. You can monitor the exact location of your shipment live through our tracking portal: <br/><br/><a href="${portalUrl}" style="display: inline-block; padding: 10px 20px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">Track Your Order</a></p>
        
        <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #EAEAEA;">If you require direct advisory regarding your delivery, our studio is readily available.</p>
    `);

    try {
        await sendGraphEmail(recipientEmail, `Order Shipped - Tracking Details for #${orderId.slice(0, 8)}`, html);
        return true;
    } catch (e) {
        console.error("Order tracking dispatch error:", e);
        return false;
    }
}

export async function sendAbandonedCartEmail(email: string, cartItems: any[]) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.arundhatidesheth.com';
    const portalUrl = `${baseUrl}/cart`;

    let itemsHtml = '';
    let total = 0;
    for (const item of cartItems) {
        let title = item?.product?.title || 'Bespoke Item';
        let price = item?.product?.price || 0;
        let qty = item?.quantity || 1;
        total += (price * qty);
        itemsHtml += `
            <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #F5F5F5; font-size: 14px;">${title} <strong>(x${qty})</strong></td>
                <td style="text-align: right; padding: 15px 0; border-bottom: 1px solid #F5F5F5;">Rs. ${(price * qty).toLocaleString('en-IN')}</td>
            </tr>
        `;
    }

    const html = getPremiumEmailTemplate(`
        <h1>You left something behind</h1>
        <p>We noticed that you reserved items in your cart but were momentarily interrupted before finalizing the acquisition.</p>
        
        <p>Your curated selections have been temporarily secured in our atelier cache. We invite you to complete your checkout at your earliest convenience.</p>

        <table class="receipt-table" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
            <tr>
                <th>Reserved Curation</th>
                <th style="text-align: right;">Amount</th>
            </tr>
            ${itemsHtml}
        </table>
        
        <div class="receipt-total">
            <p style="margin:0; font-size: 16px;"><strong>Reserved Total: Rs. ${total.toLocaleString('en-IN')}</strong></p>
        </div>

        <p style="margin-top: 40px; text-align: center;">
            <a href="${portalUrl}" style="display: inline-block; padding: 14px 28px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 1.5px; font-size: 12px;">Return to Checkout</a>
        </p>
    `);

    await sendGraphEmail(email, "Your Arundhati De-Sheth Cart", html);
}

export async function sendContactNotification(name: string, email: string, phone: string, subject: string, message: string) {
    const htmlContent = getPremiumEmailTemplate(`
        <h1>Client Inquiry</h1>
        <div style="background-color: #FAFAFA; padding: 20px; border: 1px solid #EAEAEA;">
            <p style="margin-top:0;"><strong>Client Name:</strong> ${name}</p>
            <p><strong>Email Address:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${subject}</p>
        </div>
        <div class="divider"></div>
        <p><strong>Client Message:</strong></p>
        <p style="font-style: italic; border-left: 2px solid #111; padding-left: 15px;">${message}</p>
    `);

    // Sends the notification to the admin dashboard (store owner) regarding a customer's inquiry
    await sendGraphEmail('arundhati@arundhatidesheth.com', `New Client Inquiry: ${subject || 'General'}`, htmlContent);
}

export async function sendContactThankYou(email: string, name: string, subject: string) {
    const fromAddress = getEnvVar('EMAIL_USER').toLowerCase().trim();
    const normalizedEmail = (email || '').toLowerCase().trim();

    // Prevent duplicate emails to store owner / atelier inbox
    if (
        normalizedEmail === 'arundhati@arundhatidesheth.com' ||
        normalizedEmail === 'contact@arundhatidesheth.com' ||
        (fromAddress && normalizedEmail === fromAddress)
    ) {
        return;
    }

    const htmlContent = getPremiumEmailTemplate(`
        <h1>Thank You</h1>
        <p>Dear ${name},</p>
        <p>We are writing to confirm that we have received your inquiry regarding <em>"${subject || 'General Information'}"</em>.</p>
        <p>A member of our advisory team will review your message thoroughly and provide a personalized response within 24 business hours.</p>
        
        <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #EAEAEA;">
        If you have urgent requirements, our Churchgate studio is also available for direct advisory.
        </p>
        <p style="text-align: center; margin-top: 20px;">
            <a href="https://www.arundhatidesheth.com/" style="display: inline-block; padding: 14px 28px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 1.5px; font-size: 12px;">Back to Collections</a>
        </p>
    `);

    try {
        await sendGraphEmail(email, "Your Inquiry is Received - Arundhati De-Sheth", htmlContent);
    } catch (e) {
        console.error("Failed to dispatch client thank you email:", e);
    }
}

