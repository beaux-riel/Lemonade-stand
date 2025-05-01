-- Update Users table to add address fields and preferences
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS street TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS postal_code TEXT,
ADD COLUMN IF NOT EXISTS country TEXT DEFAULT 'United States',
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS bio TEXT,
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Add comment to explain the preferences column
COMMENT ON COLUMN public.users.preferences IS 'User preferences including default search location, notification settings, etc.';