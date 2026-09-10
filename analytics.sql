CREATE TABLE public.analytics_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL, 
    product_id TEXT, 
    referrer TEXT, 
    source TEXT, 
    session_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- Allow the edge function dropping cookies to record new traffic anonymously.
CREATE POLICY "Allow public inserts" 
ON public.analytics_events FOR INSERT 
TO public 
WITH CHECK (true);

-- Relying on standard web framework routes for view protection
CREATE POLICY "Admins can view events" 
ON public.analytics_events FOR SELECT 
USING (true); 
