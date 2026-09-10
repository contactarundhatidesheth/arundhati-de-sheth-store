'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function verifyAdminOtp(otp: string) {
    if (otp === '369369') {
        cookies().set('admin_session_token', 'true', {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return { success: true };
    }

    return { success: false, error: 'Invalid OTP' };
}
