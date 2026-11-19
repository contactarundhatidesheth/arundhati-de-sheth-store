import { createBrowserClient } from '@supabase/ssr'

const DEFAULT_SUPABASE_URL = 'https://radmagmbzuubeqjrncot.supabase.co';
const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhZG1hZ21ienV1YmVxanJuY290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc3NDM4MDIsImV4cCI6MjEwMzMxOTgwMn0.8G8FBlX11v8-CJjx9kvje-HhHss4f1MagZbYj40lFbY';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_ANON_KEY
  )
}
