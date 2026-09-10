CREATE POLICY "Allow guest order insertion" 
ON public.orders FOR INSERT 
TO public 
WITH CHECK (
  user_id IS NULL OR user_id = auth.uid()
);
