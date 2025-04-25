# Lemonade Stand Project

A full-stack web application for managing lemonade stands and their products. This project uses React for the frontend and Supabase for the backend.

## Project Structure

- `/lemonade-stand/` - Frontend React application
- `/supabase/` - Supabase configuration and database migrations

## Supabase Setup

The project uses Supabase for:
- User authentication and authorization
- Database storage with Row Level Security
- File storage for images
- Real-time updates

### Database Schema

The database consists of three main tables:
1. **Users** - Stores user information
2. **Stands** - Stores lemonade stand information
3. **Products** - Stores product information for each stand

### Row Level Security (RLS)

All tables have Row Level Security policies configured to ensure data security:
- Users can only access and modify their own data
- Public users can only view active stands and available products

For detailed Supabase setup instructions, see:
- [/supabase/README.md](./supabase/README.md) - Backend setup
- [/lemonade-stand/SUPABASE_SETUP.md](./lemonade-stand/SUPABASE_SETUP.md) - Frontend integration

## Getting Started

1. Set up a Supabase project following the instructions in `/supabase/README.md`
2. Configure the frontend to connect to your Supabase project following the instructions in `/lemonade-stand/SUPABASE_SETUP.md`
3. Start the frontend development server:

```bash
cd lemonade-stand
npm install
npm start
```

## Features

- User authentication (signup, login, password reset)
- User profile management
- Create and manage lemonade stands
- Add, update, and remove products
- Upload images for stands and products
- View all active stands on a map
- Real-time updates when data changes