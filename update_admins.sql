-- Run this script in your Supabase SQL Editor to update all admin policies

-- 1. Drop existing admin policies if they exist
DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;
DROP POLICY IF EXISTS "Admins have full access to catalogues" ON public.catalogues;
DROP POLICY IF EXISTS "Admins have full access to blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins have full access to testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins have full access to timeline_events" ON public.timeline_events;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;

-- 2. Recreate admin policies allowing access for both admin emails
CREATE POLICY "Admins have full access to products" 
ON public.products FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

CREATE POLICY "Admins have full access to catalogues" 
ON public.catalogues FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

CREATE POLICY "Admins have full access to blogs" 
ON public.blogs FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

CREATE POLICY "Admins have full access to testimonials" 
ON public.testimonials FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

CREATE POLICY "Admins have full access to timeline_events" 
ON public.timeline_events FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));

CREATE POLICY "Admins can view all orders" 
ON public.orders FOR ALL 
USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
