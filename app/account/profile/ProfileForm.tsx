'use client';

import React, { useState } from 'react';
import { updateProfile } from './actions';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ProfileForm({ initialData, email }: { initialData: any, email: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Extract phone parts
  const fullPhone = initialData.phone || '';
  const initialCountryCode = fullPhone.includes(' ') ? fullPhone.split(' ')[0] : '+91';
  const initialPhoneNumber = fullPhone.includes(' ') ? fullPhone.substring(fullPhone.indexOf(' ') + 1) : fullPhone;

  // Extract address
  const address = initialData.shipping_address || {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    
    if (result?.error) {
      setErrorMsg(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      {errorMsg && (
        <div style={{ padding: '12px', marginBottom: '24px', background: '#FFF0F0', color: '#D32F2F', fontSize: '0.85rem' }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
            Email Address (Cannot be changed)
          </label>
          <input 
            type="email" 
            value={email}
            disabled
            style={{
              width: '100%',
              padding: '16px',
              border: '1px solid var(--border-light)',
              background: '#f9f9f9',
              fontFamily: 'inherit',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              First Name
            </label>
            <input 
              type="text" 
              name="firstName"
              defaultValue={initialData.first_name || ''}
              required
              className="input-field"
              style={{ border: '1px solid var(--border)', padding: '16px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              Last Name
            </label>
            <input 
              type="text" 
              name="lastName"
              defaultValue={initialData.last_name || ''}
              required
              className="input-field"
              style={{ border: '1px solid var(--border)', padding: '16px' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              Phone Number
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <select 
                name="countryCode"
                defaultValue={initialCountryCode}
                className="input-field"
                style={{ border: '1px solid var(--border)', padding: '16px', width: '100px', cursor: 'pointer', background: 'var(--bg-primary)' }}
              >
                <option value="+91">+91 (IN)</option>
                <option value="+1">+1 (US/CA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+971">+971 (UAE)</option>
                <option value="+65">+65 (SG)</option>
                <option value="+61">+61 (AU)</option>
                <option value="+33">+33 (FR)</option>
                <option value="+39">+39 (IT)</option>
              </select>
              <input 
                type="tel" 
                name="phone"
                defaultValue={initialPhoneNumber}
                className="input-field"
                style={{ border: '1px solid var(--border)', padding: '16px', flex: 1 }}
              />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
              Ring Size (Optional)
            </label>
            <input 
              type="text" 
              name="ringSize"
              defaultValue={initialData.ring_size || ''}
              placeholder="e.g. US 6, IND 12"
              className="input-field"
              style={{ border: '1px solid var(--border)', padding: '16px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
            Birthday (Optional)
          </label>
          <input 
            type="date" 
            name="birthday"
            defaultValue={initialData.birthday || ''}
            className="input-field"
            style={{ border: '1px solid var(--border)', padding: '16px' }}
          />
        </div>

        <div>
          <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-serif)', marginBottom: '16px', color: '#000', borderBottom: '1px solid var(--border-light)', paddingBottom: '8px' }}>
            Primary Shipping Address
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                Flat / House No. & Building Name
              </label>
              <input 
                type="text"
                name="addressLine1"
                defaultValue={address.line1 || ''}
                className="input-field"
                style={{ border: '1px solid var(--border)', padding: '16px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                Street Address / Area
              </label>
              <input 
                type="text"
                name="addressLine2"
                defaultValue={address.line2 || ''}
                className="input-field"
                style={{ border: '1px solid var(--border)', padding: '16px' }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                Landmark (Optional)
              </label>
              <input 
                type="text"
                name="landmark"
                defaultValue={address.landmark || ''}
                className="input-field"
                style={{ border: '1px solid var(--border)', padding: '16px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                  City
                </label>
                <input 
                  type="text"
                  name="city"
                  defaultValue={address.city || ''}
                  className="input-field"
                  style={{ border: '1px solid var(--border)', padding: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                  State / Province
                </label>
                <input 
                  type="text"
                  name="state"
                  defaultValue={address.state || ''}
                  className="input-field"
                  style={{ border: '1px solid var(--border)', padding: '16px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                  Postal / Zip Code
                </label>
                <input 
                  type="text"
                  name="postalCode"
                  defaultValue={address.postalCode || ''}
                  className="input-field"
                  style={{ border: '1px solid var(--border)', padding: '16px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: '#000' }}>
                  Country
                </label>
                <input 
                  type="text"
                  name="country"
                  defaultValue={address.country || 'India'}
                  className="input-field"
                  style={{ border: '1px solid var(--border)', padding: '16px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <button 
            type="submit"
            disabled={isLoading}
            className="btn-primary"
            style={{
              flex: 1,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'wait' : 'pointer'
            }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <Link href="/account" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Cancel
          </Link>
        </div>

      </form>
    </div>
  );
}
