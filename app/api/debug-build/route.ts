import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Run tsc to check for type errors which usually break the Vercel build
    const { stdout, stderr } = await execPromise('npx tsc --noEmit');
    return new NextResponse("Build check passed:\n" + stdout, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  } catch (error: any) {
    const msg = error.stdout || error.stderr || error.message || String(error);
    return new NextResponse("Build check failed:\n" + msg, { status: 200, headers: { 'Content-Type': 'text/plain' } });
  }
}
