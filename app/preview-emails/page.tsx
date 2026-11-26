import { getPremiumEmailTemplate } from '@/lib/email';

export default function PreviewEmails() {
    // 1. Customer Order Confirmation
    const orderConfirmation = getPremiumEmailTemplate(`
        <h1>Order Confirmation</h1>
        <p>Dear Natasha Kapoor,</p>
        <p>Thank you for entrusting Arundhati De-Sheth with your acquisition. Your payment has been received and verified successfully. Your bespoke fine jewellery order is now being processed by our master atelier.</p>
        
        <div style="background-color: #FAFAFA; border-left: 2px solid #111; padding: 12px 16px; margin: 20px 0;">
            <p style="margin: 0; font-size: 12.5px; color: #444;">
                <strong>Order Reference:</strong> #ORD-84920412<br/>
                <strong>Payment Reference:</strong> pay_P98afxK1208a<br/>
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
                <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top;">
                        <img src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=120&auto=format&fit=crop&q=80" alt="Rose Cut Solitaire Ring" width="54" height="54" style="object-fit: cover; border-radius: 4px; float: left; margin-right: 14px; border: 1px solid #EAEAEA;" />
                        <div>
                            <strong style="color: #111; font-size: 13.5px; display: block;">Rose Cut Solitaire Ring</strong>
                            <span style="color: #777; font-size: 12px; display: block; margin-top: 2px;">18k Rose Gold • Size: 14 (54mm)</span>
                            <span style="color: #999; font-size: 12px; display: block; margin-top: 2px;">Qty: 1</span>
                        </div>
                    </td>
                    <td style="text-align: right; padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top; font-size: 14px; font-weight: 500; color: #111;">
                        Rs. 2,85,000
                    </td>
                </tr>
                <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top;">
                        <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=120&auto=format&fit=crop&q=80" alt="Fluted Diamond Cuff" width="54" height="54" style="object-fit: cover; border-radius: 4px; float: left; margin-right: 14px; border: 1px solid #EAEAEA;" />
                        <div>
                            <strong style="color: #111; font-size: 13.5px; display: block;">Fluted Diamond Cuff</strong>
                            <span style="color: #777; font-size: 12px; display: block; margin-top: 2px;">18k Yellow Gold</span>
                            <span style="color: #999; font-size: 12px; display: block; margin-top: 2px;">Qty: 1</span>
                        </div>
                    </td>
                    <td style="text-align: right; padding: 14px 0; border-bottom: 1px solid #F0F0F0; vertical-align: top; font-size: 14px; font-weight: 500; color: #111;">
                        Rs. 1,65,000
                    </td>
                </tr>
            </tbody>
        </table>
        
        <div class="receipt-total" style="border-top: 1px solid #111; padding-top: 14px; margin-top: 16px; text-align: right;">
            <p style="margin: 0; font-size: 16px; color: #111;"><strong>Grand Total: Rs. 4,50,000</strong></p>
        </div>

        <div style="background-color: #FAFAFA; border: 1px solid #EAEAEA; padding: 18px 20px; margin-top: 28px; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #888; font-weight: 600;">Delivery Address</p>
            <p style="margin: 0; font-size: 13px; color: #333; line-height: 1.6;">
                <strong>Natasha Kapoor</strong><br/>
                Flat 14A, Sea Face Towers, Worli<br/>
                Mumbai, Maharashtra, 400018<br/>
                India<br/>
                Phone: +91 98200 12345
            </p>
        </div>
        
        <p style="margin-top: 32px; font-size: 13.5px; color: #555;">
            Our client advisory team will notify you the moment your piece is securely packaged and dispatched with its secure transit tracking docket.
        </p>
    `);

    // 2. Atelier / Admin New Order Alert
    const adminAlert = getPremiumEmailTemplate(`
        <h1 style="color: #111;">New Order Received (Paid)</h1>
        <p style="font-size: 14px; color: #222;">A new order has been successfully placed and paid online on Arundhati De-Sheth.</p>
        
        <div style="background-color: #FAFAFA; border: 1px solid #EAEAEA; padding: 18px 20px; margin: 20px 0;">
            <p style="margin: 0 0 6px 0;"><strong>Order ID:</strong> #ORD-84920412</p>
            <p style="margin: 0 0 6px 0;"><strong>Total Paid:</strong> Rs. 4,50,000</p>
            <p style="margin: 0 0 6px 0;"><strong>Payment ID:</strong> pay_P98afxK1208a</p>
            <p style="margin: 0 0 6px 0;"><strong>Razorpay Order:</strong> order_NqLz8fB918j</p>
            <hr style="border: none; border-top: 1px solid #EAEAEA; margin: 12px 0;" />
            <p style="margin: 0 0 6px 0;"><strong>Customer Name:</strong> Natasha Kapoor</p>
            <p style="margin: 0 0 6px 0;"><strong>Email:</strong> <a href="mailto:natasha.k@example.com">natasha.k@example.com</a></p>
            <p style="margin: 0 0 6px 0;"><strong>Phone:</strong> <a href="tel:+919820012345">+91 98200 12345</a></p>
            <p style="margin: 0;"><strong>Shipping Destination:</strong><br/>
                Flat 14A, Sea Face Towers, Worli<br/>
                Mumbai, Maharashtra, 400018<br/>
                India
            </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <thead>
                <tr>
                    <th style="text-align: left; padding-bottom: 8px; border-bottom: 1px solid #111; font-size: 11px; text-transform: uppercase;">Purchased Items</th>
                    <th style="text-align: right; padding-bottom: 8px; border-bottom: 1px solid #111; font-size: 11px; text-transform: uppercase;">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                        <strong>Rose Cut Solitaire Ring</strong> (x1)<br/>
                        <span style="color: #666; font-size: 12px;">18k Rose Gold | Size: 14 (54mm)</span>
                    </td>
                    <td style="text-align: right; padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                        Rs. 2,85,000
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                        <strong>Fluted Diamond Cuff</strong> (x1)<br/>
                        <span style="color: #666; font-size: 12px;">18k Yellow Gold</span>
                    </td>
                    <td style="text-align: right; padding: 10px 0; border-bottom: 1px solid #EEE; font-size: 13px;">
                        Rs. 1,65,000
                    </td>
                </tr>
            </tbody>
        </table>

        <div style="margin-top: 20px; text-align: right;">
            <p style="margin: 0; font-size: 15px; font-weight: bold;">Total: Rs. 4,50,000</p>
        </div>

        <p style="margin-top: 30px; text-align: center;">
            <a href="https://www.arundhatidesheth.com/ad-admin/orders" style="display: inline-block; padding: 12px 24px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">View in Admin Panel</a>
        </p>
    `);

    // 3. Order Shipped / Tracking Docket
    const tracking = getPremiumEmailTemplate(`
        <h1>Order Dispatch Confirmation</h1>
        <p>Dear Natasha Kapoor,</p>
        <p>We are pleased to inform you that your bespoke fine jewellery order (<strong>#ORD-84920412</strong>) has been packaged and securely dispatched.</p>
        
        <div style="background: #FAFAFA; padding: 24px; border: 1px solid #EAEAEA; margin: 32px 0;">
            <p style="margin: 0; font-size: 14px; color: #888; text-transform: uppercase; letter-spacing: 1px;">Docket Tracking Number</p>
            <p style="margin: 8px 0 0 0; font-size: 24px; font-family: monospace; font-weight: 600; color: #333;">SEC-99887766-IN</p>
        </div>

        <p>Your logistics carrier is Secure Global Logistics. You can monitor the exact location of your shipment live through our tracking portal: <br/><br/><a href="https://www.arundhatidesheth.com/track" style="display: inline-block; padding: 10px 20px; background-color: #111; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; font-size: 12px;">Track Your Order</a></p>
        
        <p style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #EAEAEA;">If you require direct advisory regarding your delivery, our studio is readily available.</p>
    `);

    // 4. Newsletter Welcome
    const newsletter = getPremiumEmailTemplate(`
        <h1>Welcome to our World</h1>
        <p>Thank you for subscribing to the Arundhati De-Sheth newsletter. We are delighted to have you join our private network of fine jewellery connoisseurs.</p>
        <p>You will be the first to receive curation insights, early access to exclusive acquisitions, and sophisticated insights into the world of High Jewellery.</p>
    `);

    return (
        <div style={{ paddingTop: '130px', paddingBottom: '90px', paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#F4F4F4', display: 'flex', flexDirection: 'column', gap: '60px', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    Live Email Templates
                </span>
                <h1 style={{ fontFamily: 'var(--font-serif, "Source Serif 4", serif)', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontSize: '28px', fontWeight: 400, margin: 0 }}>
                    Arundhati De-Sheth Automated Communications
                </h1>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                    Sent via Microsoft Graph API (<code style={{ background: '#EAEAEA', padding: '2px 6px', borderRadius: '3px' }}>arundhati@arundhatidesheth.com</code>)
                </p>
            </div>

            {/* Template 1: Customer Order Confirmation */}
            <div style={{ width: '100%', maxWidth: '680px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontWeight: 600 }}>
                            1. Customer Order Confirmation
                        </h2>
                        <span style={{ fontSize: '12px', color: '#777' }}>Dispatched to customer upon successful payment capture</span>
                    </div>
                    <span style={{ background: '#111', color: '#FFF', fontSize: '10px', padding: '4px 8px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '2px' }}>Client Facing</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: orderConfirmation }} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
            </div>

            {/* Template 2: Atelier Admin Alert */}
            <div style={{ width: '100%', maxWidth: '680px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontWeight: 600 }}>
                            2. Atelier / Admin New Order Alert
                        </h2>
                        <span style={{ fontSize: '12px', color: '#777' }}>Sent immediately to arundhati@ & contactarundhatidesheth@gmail.com</span>
                    </div>
                    <span style={{ background: '#B8860B', color: '#FFF', fontSize: '10px', padding: '4px 8px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '2px' }}>Internal Atelier Alert</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: adminAlert }} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
            </div>

            {/* Template 3: Order Dispatched / Tracking Docket */}
            <div style={{ width: '100%', maxWidth: '680px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontWeight: 600 }}>
                            3. Order Dispatched & Tracking Docket
                        </h2>
                        <span style={{ fontSize: '12px', color: '#777' }}>Dispatched when admin assigns docket number in orders panel</span>
                    </div>
                    <span style={{ background: '#111', color: '#FFF', fontSize: '10px', padding: '4px 8px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '2px' }}>Client Facing</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: tracking }} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
            </div>

            {/* Template 4: Newsletter Welcome */}
            <div style={{ width: '100%', maxWidth: '680px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                        <h2 style={{ margin: 0, fontFamily: 'Montserrat, sans-serif', fontSize: '15px', letterSpacing: '1px', textTransform: 'uppercase', color: '#111', fontWeight: 600 }}>
                            4. Newsletter Welcome
                        </h2>
                        <span style={{ fontSize: '12px', color: '#777' }}>Dispatched upon newsletter subscription from footer</span>
                    </div>
                    <span style={{ background: '#111', color: '#FFF', fontSize: '10px', padding: '4px 8px', letterSpacing: '1px', textTransform: 'uppercase', borderRadius: '2px' }}>Client Facing</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: newsletter }} style={{ borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} />
            </div>
        </div>
    );
}
