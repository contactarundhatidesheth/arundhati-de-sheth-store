import React from 'react';
import Image from 'next/image';

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally. All international orders are shipped via secure, fully insured couriers to ensure your pieces arrive safely. Shipping times and fees may vary depending on the destination."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is dispatched, you will receive an email containing your tracking number and a link to the courier's website. Our concierge team is also available to assist with any delivery inquiries."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns on all standard pieces within 14 days of delivery, provided they are in their original condition and packaging. Please note that bespoke and personalized items are final sale and cannot be returned."
  },
  {
    question: "Do you provide repairs for jewelry?",
    answer: "Absolutely. We stand by the quality of our craftsmanship. If your jewelry requires maintenance or repair, please contact us with your order details and we will arrange an assessment."
  },
  {
    question: "Can I request a custom piece?",
    answer: "We specialize in creating bespoke jewelry tailored to your vision. To begin the custom design process, please reach out via our contact page to schedule a private consultation."
  }
];

export default function FAQPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      {/* Container for split layout */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          /* On desktop, this will be overridden by a media query for flex-direction: row, 
             but we will use standard CSS grid/flex approaches here. Since we can't easily add media queries 
             in inline styles without a library, we'll use a standard wrapping technique or flex-wrap */
          flexWrap: 'wrap'
        }}
      >
        
        {/* Left Column (FAQ Content) */}
        <div 
          style={{ 
            flex: '1 1 50%', 
            minWidth: '320px', 
            padding: '140px 10% 100px',
            backgroundColor: '#ffffff'
          }}
        >
          <h1 
            style={{ 
              fontFamily: 'var(--font-sans)', 
              fontSize: '32px', 
              fontWeight: 400, 
              letterSpacing: '4.63px',
              textTransform: 'uppercase',
              color: '#010101',
              marginBottom: '80px'
            }}
          >
            FAQ: Frequently Asked Questions
          </h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
            {faqs.map((faq, index) => (
              <div key={index}>
                <h2 
                  style={{ 
                    fontFamily: 'var(--font-sans)', 
                    fontSize: '24px', 
                    fontWeight: 400,
                    letterSpacing: '3.78px',
                    color: '#010101',
                    textTransform: 'uppercase',
                    marginBottom: '24px'
                  }}
                >
                  {faq.question}
                </h2>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '15px', 
                    fontWeight: 400,
                    lineHeight: '36px',
                    color: '#010101',
                    maxWidth: '90%'
                  }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Image Gallery) */}
        <div 
          style={{ 
            flex: '1 1 50%', 
            minWidth: '320px', 
            position: 'relative',
            minHeight: '600px'
          }}
        >
          <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%' }}>
            <Image
              src="/images/arundhati-portrait.webp"
              alt="Editorial Portrait"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>

      </div>
    </div>
  );
}
