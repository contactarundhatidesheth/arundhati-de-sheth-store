-- 1. PRODUCTS TABLE
CREATE TABLE public.products (
    id TEXT PRIMARY KEY,
    handle TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    price NUMERIC NOT NULL,
    compare_at_price NUMERIC,
    category TEXT NOT NULL,
    metal TEXT NOT NULL,
    collection TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    images TEXT[] DEFAULT '{}',
    specs JSONB,
    is_new BOOLEAN DEFAULT false,
    is_bespoke BOOLEAN DEFAULT false,
    is_price_on_request BOOLEAN DEFAULT false,
    in_stock BOOLEAN DEFAULT true,
    sequence INTEGER DEFAULT 999
);

-- 2. CATALOGUES TABLE
CREATE TABLE public.catalogues (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT NOT NULL,
    link TEXT NOT NULL,
    year TEXT,
    featured BOOLEAN DEFAULT false,
    sequence INTEGER DEFAULT 999
);

-- 3. BLOGS TABLE
CREATE TABLE public.blogs (
    id TEXT PRIMARY KEY,
    publication TEXT NOT NULL,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    excerpt TEXT,
    image TEXT NOT NULL,
    sequence INTEGER DEFAULT 999
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE public.testimonials (
    id TEXT PRIMARY KEY,
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    location TEXT,
    image TEXT NOT NULL,
    sequence INTEGER DEFAULT 999
);

-- 5. TIMELINE EVENTS TABLE
CREATE TABLE public.timeline_events (
    id TEXT PRIMARY KEY,
    date TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    images TEXT[] DEFAULT '{}',
    link TEXT,
    sequence INTEGER DEFAULT 999
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.catalogues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- POLICIES: Public Read Access
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public can view catalogues" ON public.catalogues FOR SELECT USING (true);
CREATE POLICY "Public can view blogs" ON public.blogs FOR SELECT USING (true);
CREATE POLICY "Public can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Public can view timeline_events" ON public.timeline_events FOR SELECT USING (true);

-- POLICIES: Admin Full Access
CREATE POLICY "Admins have full access to products" ON public.products FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
CREATE POLICY "Admins have full access to catalogues" ON public.catalogues FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
CREATE POLICY "Admins have full access to blogs" ON public.blogs FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
CREATE POLICY "Admins have full access to testimonials" ON public.testimonials FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
CREATE POLICY "Admins have full access to timeline_events" ON public.timeline_events FOR ALL USING ((auth.jwt() ->> 'email') IN ('arundhati@ads.com', 'contactarundhatidesheth@gmail.com'));
