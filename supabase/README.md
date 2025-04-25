# Supabase Configuration for Lemonade Stand

This directory contains the configuration files for the Supabase project used by the Lemonade Stand application.

## Database Schema

The database consists of three main tables:

1. **Users** - Stores user information
2. **Stands** - Stores lemonade stand information
3. **Products** - Stores product information for each stand

## Setting Up Supabase

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Give your project a name (e.g., "Lemonade Stand")
4. Set a secure database password
5. Choose a region close to your users
6. Click "Create new project"

### 2. Run Database Migrations

After your project is created, you can run the migrations in one of two ways:

#### Option 1: Using the SQL Editor

1. Go to the SQL Editor in the Supabase Dashboard
2. Copy and paste the contents of each migration file in order:
   - `01_create_users_table.sql`
   - `02_create_stands_table.sql`
   - `03_create_products_table.sql`
3. Run the SQL commands

#### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

### 3. Seed the Database (Optional)

To add sample data:

1. Go to the SQL Editor in the Supabase Dashboard
2. Copy and paste the contents of `seed.sql`
3. Run the SQL commands

### 4. Configure Authentication

1. Go to Authentication > Settings in the Supabase Dashboard
2. Configure the Site URL to match your frontend application URL
3. Enable the Email provider for authentication
4. Optionally, configure additional providers (Google, GitHub, etc.)

### 5. Get API Keys for Frontend Integration

1. Go to Project Settings > API in the Supabase Dashboard
2. Copy the URL and anon/public key
3. Add these to your frontend application's environment variables:

```
REACT_APP_SUPABASE_URL=your-project-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
```

## Row Level Security (RLS) Policies

The database tables have RLS policies configured to ensure data security:

### Users Table
- Users can only read and update their own profiles

### Stands Table
- Everyone can read active stands
- Stand owners can read, insert, update, and delete their own stands

### Products Table
- Everyone can read available products from active stands
- Stand owners can read, insert, update, and delete products for their stands

## Database Relationships

- Each stand belongs to a user (owner)
- Each product belongs to a stand

## Automatic Triggers

- `updated_at` columns are automatically updated when records are modified
- New users in the auth.users table automatically create corresponding entries in the public.users table