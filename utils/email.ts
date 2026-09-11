import nodemailer from 'nodemailer';

/**
 * Universal safe email transporter configured for Outlook/Office365.
 * Will gracefully decline sending if credentials are not specified in the environment.
 */
export const sendOrderTrackingEmail = async (
    recipientEmail: string,
    recipientName: string,
    orderId: string,
    trackingNumber: string
) => {
    const { EMAIL_USER, EMAIL_PASS } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS || EMAIL_PASS === 'YOUR_APP_PASSWORD_HERE') {
        console.warn('⚠️ SMTP Email not dispatched. EMAIL_PASS is missing or invalid in environment.', { recipientEmail, trackingNumber });
        return false;
    }

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        const portalUrl = 'https://arundhati-de-sheth-store.vercel.app/track';

        const mailOptions = {
            from: `"Arundhati De-Sheth" <${EMAIL_USER}>`,
            to: recipientEmail,
            subject: `Order Shipped - Tracking Details for #${orderId.slice(0, 8)}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2 style="font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em; border-bottom: 1px solid #eaeaea; padding-bottom: 16px;">Order Dispatch Confirmation</h2>
          <p style="font-size: 16px; margin-top: 24px;">Dear ${recipientName || 'Client'},</p>
          <p style="font-size: 16px; line-height: 1.6;">
            We are pleased to inform you that your bespoke fine jewellery order (<strong>#${orderId.slice(0, 8)}</strong>) has been packaged and securely dispatched.
          </p>
          
          <div style="background: #f9f9f9; padding: 24px; border: 1px dashed #ccc; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Docket Tracking Number</p>
            <p style="margin: 8px 0 0 0; font-size: 24px; font-family: monospace; font-weight: 600;">${trackingNumber}</p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            Your logistics carrier is Secure Global Logistics. You can monitor the exact location of your shipment live through our portal:
          </p>
          
          <a href="${portalUrl}" style="display: inline-block; background: #000; color: #fff; text-decoration: none; padding: 14px 28px; text-transform: uppercase; letter-spacing: 0.1em; font-size: 14px; margin-top: 16px;">
            Track Your Order
          </a>

          <p style="font-size: 14px; color: #666; margin-top: 48px; border-top: 1px solid #eaeaea; padding-top: 24px;">
            If you have any questions or require advisory regarding your delivery, please contact our studio directly.<br><br>
            Arundhati De-Sheth Fine Jewellery<br>
            <a href="https://arundhati-de-sheth-store.vercel.app" style="color: #666;">www.arundhatidesheth.com</a>
          </p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`✉️ Dispatched Tracking Email to ${recipientEmail}: ${info.messageId}`);
        return true;
    } catch (error) {
        console.error('❌ Nodemailer Exception:', error);
        return false;
    }
};
