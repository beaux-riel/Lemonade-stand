-- Create Stands table
CREATE TABLE IF NOT EXISTS public.stands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  location_lat DOUBLE PRECISION,
  location_lng DOUBLE PRECISION,
  address TEXT,
  image_url TEXT,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.stands ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Everyone can read active stands
CREATE POLICY "Everyone can read active stands" 
  ON public.stands 
  FOR SELECT 
  USING (is_active = true);

-- Owners can read their own stands (active or inactive)
CREATE POLICY "Owners can read own stands" 
  ON public.stands 
  FOR SELECT 
  USING (auth.uid() = owner_id);

-- Owners can insert their own stands
CREATE POLICY "Owners can insert own stands" 
  ON public.stands 
  FOR INSERT 
  WITH CHECK (auth.uid() = owner_id);

-- Owners can update their own stands
CREATE POLICY "Owners can update own stands" 
  ON public.stands 
  FOR UPDATE 
  USING (auth.uid() = owner_id);

-- Owners can delete their own stands
CREATE POLICY "Owners can delete own stands" 
  ON public.stands 
  FOR DELETE 
  USING (auth.uid() = owner_id);

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_stands_updated_at
BEFORE UPDATE ON public.stands
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();