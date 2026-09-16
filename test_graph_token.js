const fs = require('fs');

function getEnvVar(key) {
    const content = fs.readFileSync('.env.local', 'utf8');
    const match = content.match(new RegExp(`^${key}=(.*)$`, 'm'));
    return match ? match[1].trim() : '';
}

async function testFetch() {
    const tenant = getEnvVar('AZURE_TENANT_ID');
    const clientId = getEnvVar('AZURE_CLIENT_ID');
    const clientSecret = getEnvVar('AZURE_CLIENT_SECRET');
    const refreshToken = getEnvVar('AZURE_REFRESH_TOKEN');

    console.log("Tenant:", tenant);
    console.log("Client ID:", clientId);
    console.log("Client Secret:", clientSecret.substring(0, 5) + '...');
    console.log("Refresh Token:", refreshToken.substring(0, 15) + '...' + refreshToken.slice(-15));

    const params = new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: 'https://graph.microsoft.com/.default offline_access'
    });

    console.log("Params String:", params.toString().substring(0, 100) + '...');

    const response = await fetch(`https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
    });

    const data = await response.json();
    console.log("STATUS:", response.status);
    console.log("DATA:", data);
}

testFetch().catch(console.error);
