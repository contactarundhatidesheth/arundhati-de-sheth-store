import React from 'react';
import { getSupabaseAdmin } from '@/utils/supabase-admin';
import { deleteInquiry } from '@/app/admin/actions';

export default async function InquiriesPage() {
    const supabase = getSupabaseAdmin();
    const { data: inquiries, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error("Failed to load inquiries:", error);
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)' }}>Contact Inquiries</h1>
            </div>

            <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #eaeaea', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eaeaea', background: '#fafafa' }}>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Date</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Name</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Email</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Phone</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Subject</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Message</th>
                            <th style={{ padding: '16px 24px', fontWeight: '500', fontSize: '0.9rem', color: '#666' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!inquiries || inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={7} style={{ padding: '64px', textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                                    No inquiries found in the database.
                                </td>
                            </tr>
                        ) : (
                            inquiries.map((inq: any) => (
                                <tr key={inq.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                                    <td style={{ padding: '16px 24px', fontSize: '0.85rem', color: '#666' }}>
                                        {new Date(inq.created_at).toLocaleString()}
                                    </td>
                                    <td style={{ padding: '16px 24px', fontWeight: '500' }}>{inq.name}</td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <a href={`mailto:${inq.email}`} style={{ color: '#0066cc', textDecoration: 'none' }}>{inq.email}</a>
                                    </td>
                                    <td style={{ padding: '16px 24px', color: '#666', fontSize: '0.9rem' }}>{inq.phone || '-'}</td>
                                    <td style={{ padding: '16px 24px', fontSize: '0.9rem' }}>{inq.subject || 'General'}</td>
                                    <td style={{ padding: '16px 24px', maxWidth: '300px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                                        {inq.message}
                                    </td>
                                    <td style={{ padding: '16px 24px' }}>
                                        <form action={async () => {
                                            'use server';
                                            await deleteInquiry(inq.id);
                                        }}>
                                            <button type="submit" style={{ color: 'red', background: 'transparent', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
