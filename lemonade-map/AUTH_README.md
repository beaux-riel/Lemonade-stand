# Authentication Implementation Guide

This document provides an overview of the authentication system implemented in the Lemonade Stand application.

## Overview

The authentication system uses Supabase Auth for user authentication and authorization. It includes:

- User sign-up and login functionality
- Protected routes for seller dashboard
- Anonymous browsing for buyers looking for stands

## Authentication Flow

1. **User Registration**: Users can create an account with email and password
2. **User Login**: Registered users can log in to access protected features
3. **Session Management**: User sessions are managed by Supabase and stored securely
4. **Protected Routes**: Certain routes are only accessible to authenticated users

## Components

### Authentication Components

- `AuthForm`: Reusable component for login and registration
- `ProtectedRoute`: Higher-order component that redirects unauthenticated users

### Context

- `AuthContext`: Provides authentication state and methods throughout the application

### API

- `supabaseApi.js`: Contains all authentication-related API calls to Supabase

## Routes

### Public Routes

- `/`: Home page with map view of lemonade stands (accessible to all users)
- `/login`: Login page
- `/register`: Registration page

### Protected Routes

- `/seller/dashboard`: Dashboard for managing lemonade stands (requires authentication)
- `/seller/stands/new`: Form to create a new lemonade stand (requires authentication)
- `/seller/stands/:id`: Details page for a specific stand (requires authentication)

## Usage

### Checking Authentication Status

```jsx
import { useAuth } from "../contexts/AuthContext";

function MyComponent() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.email}!</p>
      ) : (
        <p>Please log in to access this feature.</p>
      )}
    </div>
  );
}
```

### Authentication API Calls

```jsx
import { signIn, signUp, signOut } from "../api/supabaseApi";

// Sign up
const handleSignUp = async (email, password, fullName) => {
  const { data, error } = await signUp(email, password, fullName);
  if (error) {
    console.error("Error signing up:", error);
  } else {
    console.log("Signed up successfully!");
  }
};

// Sign in
const handleSignIn = async (email, password) => {
  const { data, error } = await signIn(email, password);
  if (error) {
    console.error("Error signing in:", error);
  } else {
    console.log("Signed in successfully!");
  }
};

// Sign out
const handleSignOut = async () => {
  const { error } = await signOut();
  if (error) {
    console.error("Error signing out:", error);
  } else {
    console.log("Signed out successfully!");
  }
};
```

## Security Considerations

1. **Row Level Security (RLS)**: Supabase tables have RLS policies to ensure users can only access their own data
2. **Protected Routes**: Client-side route protection prevents unauthorized access to seller features
3. **Token Management**: Authentication tokens are securely managed by Supabase
4. **Input Validation**: All user inputs are validated before processing

## Configuration

To configure Supabase authentication:

1. Create a `.env` file in the root directory (or copy from `.env.example`)
2. Add your Supabase URL and anon key:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Future Enhancements

- Social login (Google, Facebook, etc.)
- Email verification
- Password reset functionality
- Role-based access control (admin, seller, buyer)
- Two-factor authentication
