# Supabase API Integration

This directory contains the Supabase API integration for the Lemonade Stand application.

## Overview

The Supabase API integration provides the following functionality:

1. **Authentication** - User registration, login, logout, and password reset
2. **User Profiles** - Fetching and updating user profiles
3. **Stands** - Creating, reading, updating, and deleting lemonade stands
4. **Products** - Managing products for each stand
5. **Storage** - Uploading and managing images for stands, products, and user avatars
6. **Real-time Subscriptions** - Live updates for stands and products

## Files

- `supabaseClient.js` - Creates and exports the Supabase client instance
- `supabaseApi.js` - Contains all the API functions for interacting with Supabase

## Authentication Functions

```javascript
// Register a new user
const { data, error } = await signUp(email, password, fullName);

// Log in an existing user
const { data, error } = await signIn(email, password);

// Log out the current user
const { error } = await signOut();

// Get the current user
const { data, error } = await getCurrentUser();

// Reset password
const { data, error } = await resetPassword(email);

// Update password
const { data, error } = await updatePassword(newPassword);

// Get the current session
const { data, error } = await getSession();
```

## User Profile Functions

```javascript
// Get a user's profile
const { data, error } = await getUserProfile(userId);

// Update a user's profile
const { data, error } = await updateUserProfile(userId, updates);

// Upload a user avatar
const { data, error } = await uploadUserAvatar(userId, file);
```

## Stand Functions

```javascript
// Get all active stands
const { data, error } = await getStands();

// Get a specific stand by ID
const { data, error } = await getStandById(standId);

// Get stands owned by a user
const { data, error } = await getUserStands(userId);

// Create a new stand
const { data, error } = await createStand(standData);

// Update a stand
const { data, error } = await updateStand(standId, updates);

// Delete a stand
const { error } = await deleteStand(standId);

// Upload a stand image
const { data, error } = await uploadStandImage(standId, userId, file);
```

## Product Functions

```javascript
// Get products for a stand
const { data, error } = await getProducts(standId);

// Get all products
const { data, error } = await getAllProducts();

// Create a new product
const { data, error } = await createProduct(productData);

// Update a product
const { data, error } = await updateProduct(productId, updates);

// Delete a product
const { error } = await deleteProduct(productId);

// Upload a product image
const { data, error } = await uploadProductImage(productId, standId, userId, file);
```

## Storage Functions

```javascript
// Upload an image to a storage bucket
const { data, error } = await uploadImage(bucket, filePath, file);

// Get the public URL for an image
const publicUrl = getImageUrl(bucket, filePath);

// Delete an image
const { error } = await deleteImage(bucket, filePath);
```

## Real-time Subscriptions

```javascript
// Subscribe to changes in stands
const subscription = subscribeToStands((payload) => {
  // Handle the payload
  console.log('Stand changed:', payload);
});

// Subscribe to changes in products for a specific stand
const subscription = subscribeToProducts(standId, (payload) => {
  // Handle the payload
  console.log('Product changed:', payload);
});

// Unsubscribe from a subscription
unsubscribe(subscription);
```

## Error Handling

All API functions return an object with `data` and `error` properties. You should always check for errors before using the data:

```javascript
const { data, error } = await getStands();

if (error) {
  console.error('Error fetching stands:', error);
  // Handle the error
} else {
  // Use the data
  console.log('Stands:', data);
}
```

## Context Integration

The API functions are integrated with React contexts for easy access throughout the application:

- `AuthContext` - Provides authentication state and user information
- `StandContext` - Provides stand data and real-time updates

Example usage:

```javascript
import { useAuth } from '../contexts/AuthContext';
import { useStands } from '../contexts/StandContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  const { stands, loading } = useStands();

  // Use the data
}
```