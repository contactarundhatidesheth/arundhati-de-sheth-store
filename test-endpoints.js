const crypto = require('crypto');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const secretMatch = env.match(/RAZORPAY_WEBHOOK_SECRET=(.+)/);
const secret = secretMatch ? secretMatch[1].trim() : '';

async function testEmail() {
    console.log('Testing Email endpoint...');
    try {
        const res = await fetch('http://localhost:3000/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Webhook & Email',
                email: 'connect@eyepune.com',
                phone: '1234567890',
                subject: 'Razorpay Integration & Email Test',
                message: 'This is a test message to verify the email integration works properly.'
            })
        });
        console.log('Email Response Status:', res.status);
        console.log('Email Response Body:', await res.text());
    } catch (err) {
        console.error('Email Test Failed:', err.message);
    }
}

async function testWebhook() {
    console.log('\nTesting Webhook endpoint...');
    try {
        const payload = {
            event: 'payment.captured',
            payload: {
                payment: {
                    entity: {
                        id: 'pay_test_webhook',
                        order_id: 'order_test_webhook'
                    }
                }
            }
        };
        const bodyText = JSON.stringify(payload);
        const signature = crypto.createHmac('sha256', secret).update(bodyText).digest('hex');

        const res = await fetch('http://localhost:3000/api/webhook/razorpay', {
            method: 'POST',
            headers: {
                'x-razorpay-signature': signature
            },
            body: bodyText
        });
        console.log('Webhook Response Status:', res.status);
        console.log('Webhook Response Body:', await res.text());
    } catch (err) {
        console.error('Webhook Test Failed:', err.message);
    }
}

testEmail().then(testWebhook);
