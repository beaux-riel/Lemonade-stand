-- Test queries for verifying Supabase setup
-- Run these in the SQL Editor to test your database setup

-- 1. Test user creation and RLS
-- First, create a test user through the Auth UI or API
-- Then run this query to verify the user was created in the public.users table
SELECT * FROM public.users;

-- 2. Test stand creation
-- This should be run as the authenticated user who owns the stand
INSERT INTO public.stands (name, description, location_lat, location_lng, address, owner_id)
VALUES ('Test Stand', 'A test lemonade stand', 40.7128, -74.0060, '123 Test St, New York, NY', auth.uid())
RETURNING *;

-- 3. Test product creation
-- This should be run as the authenticated user who owns the stand
INSERT INTO public.products (name, description, price, stand_id)
VALUES (
  'Test Lemonade', 
  'A test product', 
  3.99, 
  (SELECT id FROM public.stands WHERE owner_id = auth.uid() LIMIT 1)
)
RETURNING *;

-- 4. Test public access to stands
-- This should return all active stands
SELECT * FROM public.stands WHERE is_active = true;

-- 5. Test public access to products
-- This should return all available products from active stands
SELECT p.* 
FROM public.products p
JOIN public.stands s ON p.stand_id = s.id
WHERE p.is_available = true AND s.is_active = true;

-- 6. Test RLS for stands (should fail if not authenticated as the owner)
-- Replace 'stand_id' with an actual stand ID that the current user doesn't own
UPDATE public.stands SET name = 'Hacked Stand' WHERE id = 'stand_id';

-- 7. Test RLS for products (should fail if not authenticated as the stand owner)
-- Replace 'product_id' with an actual product ID that the current user doesn't own
UPDATE public.products SET price = 0.01 WHERE id = 'product_id';

-- 8. Test joining tables
-- Get all stands with their products
SELECT 
  s.id as stand_id,
  s.name as stand_name,
  s.description as stand_description,
  s.address,
  p.id as product_id,
  p.name as product_name,
  p.price
FROM public.stands s
LEFT JOIN public.products p ON s.id = p.stand_id
WHERE s.is_active = true AND (p.is_available = true OR p.is_available IS NULL)
ORDER BY s.name, p.name;