import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const DEFAULT_SUPABASE_URL = 'https://radmagmbzuubeqjrncot.supabase.co';
const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDM4MDIsImV4cCI6MjEwMzMxOTgwMn0.8G8FBlX11v8-CJjx9kvje-HhHss4f1MagZbYj40lFbY';

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routing check based on admin session cookie
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginRoute = pathname.startsWith('/admin/login') || pathname.startsWith('/admin/reset-password');
  const adminCookie = request.cookies.get('admin_session_token')?.value;

  if (isAdminRoute && !isLoginRoute && adminCookie !== 'true') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    return NextResponse.redirect(url)
  }

  // Only invoke Supabase auth check if on auth-sensitive routes to conserve Cloudflare Worker CPU limits
  const isAuthRoute = pathname.startsWith('/auth') || pathname.startsWith('/cart') || pathname.startsWith('/account');
  if (!isAuthRoute) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  await supabase.auth.getUser()

  return supabaseResponse
}
