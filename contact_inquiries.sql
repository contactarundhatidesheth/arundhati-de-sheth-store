-- contact_inquiries.sql

CREATE TABLE public.contact_inquiries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT DEFAULT 'General',
    message TEXT NOT NULL
);

-- Enable RLS
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow logged-in admins to view and delete inquiries
CREATE POLICY "Admins have full access to contact_inquiries" ON public.contact_inquiries 
FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

-- Allow the backend service role to insert inquiries (No public policy needed as getSupabaseAdmin() bypasses RLS).
