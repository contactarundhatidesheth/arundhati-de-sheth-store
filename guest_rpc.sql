CREATE OR REPLACE FUNCTION get_tracking_order(p_razorpay_order_id text)
RETURNS SETOF public.orders
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT * FROM public.orders WHERE razorpay_order_id = p_razorpay_order_id LIMIT 1;
$$;
