'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient, getURL } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return error.message
  }

  const ADMIN_EMAILS = ['arundhati@ads.com', 'contactarundhatidesheth@gmail.com'];

  revalidatePath('/', 'layout')

  if (ADMIN_EMAILS.includes(email)) {
    redirect('/admin') // Redirect to admin dashboard
  } else {
    redirect('/account') // Redirect to private dashboard after login
  }
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  const origin = getURL()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  })

  if (error) {
    return error.message
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check your email to continue sign in process')
}

export async function signInWithGoogle() {
  const supabase = createClient()

  // Try to use NEXT_PUBLIC_SITE_URL, fallback to localhost for local dev
  const origin = getURL()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  })

  if (data.url) {
    redirect(data.url)
  }
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const origin = getURL()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/account/update-password`,
  })

  if (error) {
    return error.message
  }
  redirect('/forgot-password?message=' + encodeURIComponent('Check your email for the password reset link'))
}

export async function updatePassword(formData: FormData) {
  const supabase = createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return error.message
  }
  redirect('/account?message=' + encodeURIComponent('Password updated successfully'))
}
