-- Test script for stand expiration logic

-- Check current time
SELECT NOW() AS current_time;

-- Check stands with their expiration times
SELECT 
  id, 
  name, 
  is_active, 
  created_at, 
  expiration_time,
  CASE 
    WHEN expiration_time IS NULL THEN 'No expiration set'
    WHEN expiration_time <= NOW() THEN 'Expired'
    ELSE 'Active'
  END AS status,
  CASE 
    WHEN expiration_time IS NULL THEN NULL
    WHEN expiration_time <= NOW() THEN '0'
    ELSE EXTRACT(EPOCH FROM (expiration_time - NOW()))/3600
  END AS hours_remaining
FROM 
  public.stands
ORDER BY 
  expiration_time ASC;

-- Manually run the cleanup function
SELECT cleanup_expired_stands() AS deactivated_stands;

-- Check stands after cleanup
SELECT 
  id, 
  name, 
  is_active, 
  created_at, 
  expiration_time,
  CASE 
    WHEN expiration_time IS NULL THEN 'No expiration set'
    WHEN expiration_time <= NOW() THEN 'Expired'
    ELSE 'Active'
  END AS status,
  CASE 
    WHEN expiration_time IS NULL THEN NULL
    WHEN expiration_time <= NOW() THEN '0'
    ELSE EXTRACT(EPOCH FROM (expiration_time - NOW()))/3600
  END AS hours_remaining
FROM 
  public.stands
ORDER BY 
  expiration_time ASC;

-- Test creating a new stand with automatic expiration time
INSERT INTO public.stands (
  name, 
  description, 
  location_lat, 
  location_lng, 
  address, 
  owner_id
) VALUES (
  'Test Expiration Stand',
  'This stand was created to test expiration logic',
  40.7128,
  -74.0060,
  '123 Test Street, New York, NY',
  (SELECT id FROM public.users LIMIT 1)
)
RETURNING id, name, created_at, expiration_time;

-- Test extending a stand's expiration time
UPDATE public.stands
SET expiration_time = NOW() + INTERVAL '48 hours'
WHERE name = 'Test Expiration Stand'
RETURNING id, name, expiration_time;

-- Test expiring a stand manually
UPDATE public.stands
SET expiration_time = NOW() - INTERVAL '1 hour'
WHERE name = 'Test Expiration Stand'
RETURNING id, name, expiration_time, is_active;

-- Run cleanup again to see if the stand gets deactivated
SELECT cleanup_expired_stands() AS deactivated_stands;

-- Check if the stand was deactivated
SELECT id, name, is_active, expiration_time
FROM public.stands
WHERE name = 'Test Expiration Stand';