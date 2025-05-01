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

-- Create function to check for and deactivate expired stands
-- This is a standalone function that can be called by a scheduled job
CREATE OR REPLACE FUNCTION check_and_deactivate_expired_stands()
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

-- Create a function to check expiration on specific stand updates
-- This avoids the recursive trigger issue by not running on is_active updates
CREATE OR REPLACE FUNCTION check_stand_expiration()
RETURNS TRIGGER AS $$
BEGIN
  -- Skip if this is an update to is_active to avoid recursive triggers
  IF TG_OP = 'UPDATE' AND NEW.is_active IS DISTINCT FROM OLD.is_active THEN
    RETURN NEW;
  END IF;
  
  -- Check if the stand has expired
  IF NEW.expiration_time <= NOW() AND NEW.is_active = true THEN
    NEW.is_active := false;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to check expiration on individual stand updates
DROP TRIGGER IF EXISTS check_stand_expiration_trigger ON public.stands;
CREATE TRIGGER check_stand_expiration_trigger
BEFORE INSERT OR UPDATE ON public.stands
FOR EACH ROW
EXECUTE FUNCTION check_stand_expiration();

-- Create function for manual cleanup of expired stands
-- This is now just an alias for check_and_deactivate_expired_stands for backward compatibility
CREATE OR REPLACE FUNCTION cleanup_expired_stands()
RETURNS INTEGER AS $$
BEGIN
  RETURN check_and_deactivate_expired_stands();
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