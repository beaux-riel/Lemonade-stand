// create-buckets-with-service-key.js
const { createClient } = require('@supabase/supabase-js');

// Replace these with your actual Supabase project values
const supabaseUrl = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || 'YOUR_SERVICE_ROLE_KEY'; // Use service role key, not anon key

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