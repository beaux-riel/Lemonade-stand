-- Add expiration_time column to stands table
ALTER TABLE public.stands 
ADD COLUMN IF NOT EXISTS expiration_time TIMESTAMP WITH TIME ZONE;

-- Update existing stands to have an expiration time 24 hours from creation
UPDATE public.stands
SET expiration_time = created_at + INTERVAL '24 hours'
WHERE expiration_time IS NULL;

-- Create function to set expiration time on new stands
CREATE OR REPLACE FUNCTION set_stand_expiration_time()
RETURNS TRIGGER AS $$
BEGIN
  NEW.expiration_time := NEW.created_at + INTERVAL '24 hours';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set expiration time on new stands
DROP TRIGGER IF EXISTS set_stand_expiration_time_trigger ON public.stands;
CREATE TRIGGER set_stand_expiration_time_trigger
BEFORE INSERT ON public.stands
FOR EACH ROW
EXECUTE FUNCTION set_stand_expiration_time();

-- Create function to automatically deactivate expired stands
CREATE OR REPLACE FUNCTION deactivate_expired_stands()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.stands
  SET is_active = false
  WHERE expiration_time <= NOW()
  AND is_active = true;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check for expired stands on any stand update
DROP TRIGGER IF EXISTS check_expired_stands_trigger ON public.stands;
CREATE TRIGGER check_expired_stands_trigger
AFTER UPDATE ON public.stands
FOR EACH STATEMENT
EXECUTE FUNCTION deactivate_expired_stands();

-- Create function for manual cleanup of expired stands
CREATE OR REPLACE FUNCTION cleanup_expired_stands()
RETURNS INTEGER AS $$
DECLARE
  affected_rows INTEGER;
BEGIN
  UPDATE public.stands
  SET is_active = false
  WHERE expiration_time <= NOW()
  AND is_active = true;
  
  GET DIAGNOSTICS affected_rows = ROW_COUNT;
  RETURN affected_rows;
END;
$$ LANGUAGE plpgsql;