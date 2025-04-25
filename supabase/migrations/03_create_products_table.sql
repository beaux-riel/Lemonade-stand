-- Create Products table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  stand_id UUID NOT NULL REFERENCES public.stands(id) ON DELETE CASCADE,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Everyone can read available products from active stands
CREATE POLICY "Everyone can read available products" 
  ON public.products 
  FOR SELECT 
  USING (
    is_available = true AND 
    EXISTS (
      SELECT 1 FROM public.stands 
      WHERE stands.id = products.stand_id AND stands.is_active = true
    )
  );

-- Stand owners can read all their products
CREATE POLICY "Stand owners can read all their products" 
  ON public.products 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.stands 
      WHERE stands.id = products.stand_id AND stands.owner_id = auth.uid()
    )
  );

-- Stand owners can insert products for their stands
CREATE POLICY "Stand owners can insert products" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stands 
      WHERE stands.id = products.stand_id AND stands.owner_id = auth.uid()
    )
  );

-- Stand owners can update their products
CREATE POLICY "Stand owners can update their products" 
  ON public.products 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.stands 
      WHERE stands.id = products.stand_id AND stands.owner_id = auth.uid()
    )
  );

-- Stand owners can delete their products
CREATE POLICY "Stand owners can delete their products" 
  ON public.products 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.stands 
      WHERE stands.id = products.stand_id AND stands.owner_id = auth.uid()
    )
  );

-- Create a trigger to update the updated_at column
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();