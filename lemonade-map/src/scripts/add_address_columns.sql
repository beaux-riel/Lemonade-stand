-- SQL script to add missing address columns to the users table
-- Run this in the Supabase SQL Editor

-- Function to add a column if it doesn't exist
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

-- Function to get all columns in a table
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

-- Add apt_suite column if it doesn't exist
SELECT add_column_if_not_exists('users', 'apt_suite', 'text');

-- Add address_line2 column if it doesn't exist
SELECT add_column_if_not_exists('users', 'address_line2', 'text');

-- Verify the columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'public'
AND column_name IN ('apt_suite', 'address_line2');