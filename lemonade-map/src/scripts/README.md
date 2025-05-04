# Address Fields Fix

This directory contains scripts to fix the issue with user addresses not being saved to Supabase.

## Problem

The user address data was not being saved to Supabase because the database table was missing the `apt_suite` and `address_line2` fields that the frontend code was trying to use. This caused address updates to fail silently.

## Solution

We've implemented the following fixes:

1. Enhanced the `updateUserAddress` function in `supabaseApi.js` to:
   - Check if the required columns exist in the database
   - Conditionally include the fields in the update operation
   - Provide better error handling and user feedback

2. Updated the ProfilePage component to:
   - Display clear success/error messages
   - Scroll to the message after submission
   - Simplify the address update process

3. Created SQL scripts to add the missing columns to the Supabase database

## How to Fix the Database

To add the missing columns to the Supabase database, you need to run the SQL script in the Supabase SQL Editor:

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy the contents of `add_address_columns.sql` and paste it into the SQL Editor
4. Run the script

Alternatively, you can use the JavaScript utility `add-address-fields.js` to add the columns programmatically:

```bash
# Navigate to the project directory
cd lemonade-map

# Install dependencies if needed
npm install

# Run the script
node -r esm src/scripts/add-address-fields.js
```

## Verification

After applying these fixes:

1. User addresses should be saved correctly to Supabase
2. Success/error messages should display on the Profile page after saving
3. The address form should include both `apt_suite` and `address_line2` fields

If you encounter any issues, please check the browser console for error messages and ensure that the SQL script was executed successfully.