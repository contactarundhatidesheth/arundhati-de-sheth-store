import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
        // Redirect to Microsoft login
        const tenant = process.env.AZURE_TENANT_ID;
        const clientId = process.env.AZURE_CLIENT_ID;
        const redirectUri = 'http://localhost:3000/api/email-auth';
        return NextResponse.redirect(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&response_mode=query&scope=offline_access%20https%3A%2F%2Fgraph.microsoft.com%2FMail.Send&state=12345`);
    }

    // Exchange code for token
    try {
        const response = await fetch(`https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                client_id: process.env.AZURE_CLIENT_ID!,
                client_secret: process.env.AZURE_CLIENT_SECRET!,
                code,
                redirect_uri: 'http://localhost:3000/api/email-auth',
                grant_type: 'authorization_code'
            })
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: 'Auth Failed', details: data });
        }

        return NextResponse.json({
            instructions: "SUCCESS! Please copy the refreshToken below and paste it into your .env.local file. Then restart your development server.",
            env_variable_to_add: `AZURE_REFRESH_TOKEN=${data.refresh_token}`,
            full_data: data
        });

    } catch (e: any) {
        return NextResponse.json({ error: String(e) });
    }
}
