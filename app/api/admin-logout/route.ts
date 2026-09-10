import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    cookies().delete('admin_session_token');

    const origin = new URL(request.url).origin;
    return NextResponse.redirect(`${origin}/admin/login`);
}
