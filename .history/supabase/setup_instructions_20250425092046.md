# Supabase Project Setup Instructions

This document provides step-by-step instructions for setting up your Supabase project for the Lemonade Stand application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Click "New Project"
3. Enter project details:
   - Name: "Lemonade Stand" (or your preferred name)
   - Database Password: Create a secure password
   - Region: Choose a region close to your users
4. Click "Create new project"
5. Wait for your project to be provisioned (this may take a few minutes)

## 2. Run Database Migrations

After your project is created, you need to set up the database schema:

1. Go to the SQL Editor in the Supabase Dashboard
2. Create a new query
3. Copy and paste the contents of each migration file in order:
   - `01_create_users_table.sql`
   - `02_create_stands_table.sql`
   - `03_create_products_table.sql`
   - `04_storage_policies.sql`
4. Run the SQL commands

## 3. Set Up Storage Buckets

1. Go to Storage in the Supabase Dashboard
2. Create three new buckets:
   - `stand_images`
   - `product_images`
   - `user_avatars`
3. For each bucket, set the privacy to "Public"

## 4. Configure Authentication

1. Go to Authentication > Settings in the Supabase Dashboard
2. Under "Site URL", enter your frontend application URL (e.g., `http://localhost:3000`)
3. Under "Additional Redirect URLs", add any additional URLs (e.g., production URL)
4. Save changes

## 5. Get API Keys for Frontend Integration

1. Go to Project Settings > API in the Supabase Dashboard
2. Copy the URL and anon/public key
3. Create a `.env` file in the frontend project root:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 6. Test the Setup

To verify your setup:

1. Go to the Table Editor in the Supabase Dashboard
2. You should see the following tables:
   - `users`
   - `stands`
   - `products`
3. Go to Authentication > Users
4. Create a test user
5. Verify that a corresponding entry is created in the `users` table

## 7. Optional: Seed the Database

To add sample data:

1. Go to the SQL Editor in the Supabase Dashboard
2. Create a new query
3. Copy and paste the contents of `seed.sql`
4. Run the SQL commands

## Troubleshooting

If you encounter issues:

1. Check the Supabase logs in the Dashboard
2. Verify that all migrations ran successfully
3. Ensure that RLS policies are correctly configured
4. Test API endpoints using the API documentation in the Supabase Dashboard
