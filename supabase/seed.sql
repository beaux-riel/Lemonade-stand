-- Seed data for testing purposes
-- Note: In a real application, you would not seed user data like this
-- This is just for demonstration purposes

-- Insert a test user (this would normally be created through auth signup)
INSERT INTO public.users (id, email, full_name)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'test@example.com', 'Test User')
ON CONFLICT (id) DO NOTHING;

-- Insert some test stands
INSERT INTO public.stands (name, description, location_lat, location_lng, address, owner_id)
VALUES 
  ('Sunny Lemonade', 'The best lemonade in town!', 40.7128, -74.0060, '123 Main St, New York, NY', '00000000-0000-0000-0000-000000000001'),
  ('Citrus Delight', 'Organic lemonade made fresh daily', 40.7112, -74.0055, '456 Park Ave, New York, NY', '00000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

-- Insert some test products
INSERT INTO public.products (name, description, price, stand_id)
VALUES 
  ('Classic Lemonade', 'Our original recipe', 3.50, (SELECT id FROM public.stands WHERE name = 'Sunny Lemonade' LIMIT 1)),
  ('Strawberry Lemonade', 'With fresh strawberries', 4.00, (SELECT id FROM public.stands WHERE name = 'Sunny Lemonade' LIMIT 1)),
  ('Mint Lemonade', 'Refreshing mint flavor', 4.00, (SELECT id FROM public.stands WHERE name = 'Citrus Delight' LIMIT 1)),
  ('Honey Lemonade', 'Sweetened with local honey', 4.50, (SELECT id FROM public.stands WHERE name = 'Citrus Delight' LIMIT 1))
ON CONFLICT DO NOTHING;