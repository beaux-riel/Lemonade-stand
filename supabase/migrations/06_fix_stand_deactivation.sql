-- Fix for the "stack depth limit exceeded" error when deactivating stands
-- This migration replaces the problematic triggers with a more robust solution

-- Drop the problematic trigger
DROP TRIGGER IF EXISTS check_expired_stands_trigger ON public.stands;

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

-- Update the cleanup_expired_stands function to use our new function
CREATE OR REPLACE FUNCTION cleanup_expired_stands()
RETURNS INTEGER AS $$
BEGIN
  RETURN check_and_deactivate_expired_stands();
END;
$$ LANGUAGE plpgsql;

-- Drop the old deactivate_expired_stands function if it exists
DROP FUNCTION IF EXISTS deactivate_expired_stands();