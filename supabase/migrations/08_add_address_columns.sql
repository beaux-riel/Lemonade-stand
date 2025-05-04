-- Add missing address columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS apt_suite TEXT,
ADD COLUMN IF NOT EXISTS address_line2 TEXT;

-- Create or replace the function to add columns if they don't exist
CREATE OR REPLACE FUNCTION add_column_if_not_exists(
  table_name text,
  column_name text,
  column_type text
) RETURNS void AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_name = add_column_if_not_exists.table_name
    AND column_name = add_column_if_not_exists.column_name
  ) THEN
    EXECUTE format('ALTER TABLE %I ADD COLUMN %I %s', 
                  table_name, column_name, column_type);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create or replace the function to get table columns
CREATE OR REPLACE FUNCTION get_table_columns(table_name text)
RETURNS TABLE (
  column_name text,
  data_type text
) AS $$
BEGIN
  RETURN QUERY
  SELECT c.column_name::text, c.data_type::text
  FROM information_schema.columns c
  WHERE c.table_name = get_table_columns.table_name
  AND c.table_schema = 'public';
END;
$$ LANGUAGE plpgsql;