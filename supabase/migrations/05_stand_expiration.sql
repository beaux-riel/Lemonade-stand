-- Add expiration_time column to stands table
ALTER TABLE public.stands 
ADD COLUMN IF NOT EXISTS expiration_time TIMESTAMP WITH TIME ZONE;

-- Update existing stands to have an expiration time at midnight of their creation day
UPDATE public.stands
SET expiration_time = (DATE_TRUNC('day', created_at) + INTERVAL '1 day' - INTERVAL '1 second')::TIMESTAMP WITH TIME ZONE
WHERE expiration_time IS NULL;

-- Create function to set expiration time on new stands to midnight of the current day
CREATE OR REPLACE FUNCTION set_stand_expiration_time()
RETURNS TRIGGER AS $$
BEGIN
  -- Set expiration time to midnight of the current day (23:59:59)
  NEW.expiration_time := (DATE_TRUNC('day', NEW.created_at) + INTERVAL '1 day' - INTERVAL '1 second')::TIMESTAMP WITH TIME ZONE;
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

-- Create function to reopen an expired stand
CREATE OR REPLACE FUNCTION reopen_stand(stand_id UUID)
RETURNS SETOF stands AS $$
BEGIN
  -- Set expiration time to midnight of the current day (23:59:59) and reactivate the stand
  RETURN QUERY
  UPDATE public.stands
  SET 
    expiration_time = (DATE_TRUNC('day', NOW()) + INTERVAL '1 day' - INTERVAL '1 second')::TIMESTAMP WITH TIME ZONE,
    is_active = true
  WHERE id = stand_id
  RETURNING *;
END;
$$ LANGUAGE plpgsql;