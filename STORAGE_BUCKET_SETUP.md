# Supabase Storage Bucket Setup

This document provides instructions to fix the "Bucket not found" error that occurs when users try to save after editing a stand.

## The Issue

When a user attempts to save after editing a stand, they see the following error:

```
Error uploading image: Bucket not found
```

This error occurs because the application is trying to upload images to Supabase storage buckets that don't exist yet. The application requires the following storage buckets:

1. `stand_images` - For storing lemonade stand images
2. `product_images` - For storing product images
3. `user_avatars` - For storing user profile pictures

## Solution

Follow these steps to create the required storage buckets in your Supabase project:

### Option 1: Using the Supabase Dashboard (Recommended)

1. Log in to the [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Navigate to "Storage" in the left sidebar
4. Click "Create a new bucket"
5. Enter "stand_images" as the bucket name
6. Check "Public bucket" to make the bucket publicly accessible
7. Click "Create bucket"
8. Repeat steps 4-7 for "product_images" and "user_avatars" buckets

### Option 2: Using the Supabase Management API

If you prefer to create the buckets programmatically, you can use the Supabase Management API with your service role key:

1. Get your Supabase URL and service role key from the Supabase Dashboard:
   - Go to Project Settings > API
   - Copy the URL and service role key (not the anon/public key)

2. Create a script to set up the buckets (example provided in `create-buckets-with-service-key.js`):

```javascript
// create-buckets-with-service-key.js
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase project values
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY'; // Use service role key, not anon key

// Create Supabase client with admin privileges
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to create a bucket if it doesn't exist
async function createBucketIfNotExists(bucketName) {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error(`Error listing buckets: ${listError.message}`);
      return;
    }
    
    const bucketExists = buckets.some(bucket => bucket.name === bucketName);
    
    if (bucketExists) {
      console.log(`Bucket '${bucketName}' already exists.`);
    } else {
      // Create the bucket
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true // Make the bucket public
      });
      
      if (error) {
        console.error(`Error creating bucket '${bucketName}': ${error.message}`);
      } else {
        console.log(`Bucket '${bucketName}' created successfully.`);
      }
    }
  } catch (error) {
    console.error(`Unexpected error: ${error.message}`);
  }
}

// Main function to create all required buckets
async function createAllBuckets() {
  console.log('Creating storage buckets in Supabase...');
  
  // Create the required buckets
  await createBucketIfNotExists('stand_images');
  await createBucketIfNotExists('product_images');
  await createBucketIfNotExists('user_avatars');
  
  console.log('Bucket creation process completed.');
}

// Run the script
createAllBuckets();
```

3. Run the script:
```bash
node create-buckets-with-service-key.js
```

### Option 3: Using the Supabase CLI

If you have the Supabase CLI installed:

1. Log in to the Supabase CLI:
```bash
supabase login
```

2. Link to your project:
```bash
supabase link --project-ref YOUR_PROJECT_REF
```

3. Create the buckets:
```bash
supabase storage create-bucket stand_images --public
supabase storage create-bucket product_images --public
supabase storage create-bucket user_avatars --public
```

## Verifying the Fix

After creating the storage buckets:

1. Go back to your application
2. Try editing a stand and uploading an image
3. Save the changes
4. The error should no longer appear, and the image should be successfully uploaded

## Security Considerations

- The buckets are set to public to allow users to view the images without authentication
- Row-level security (RLS) policies are still in place to control who can upload/modify files
- If you need more restrictive access, you can modify the bucket settings and RLS policies in the Supabase Dashboard