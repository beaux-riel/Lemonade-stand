// create-buckets.js
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a bucket if it doesn't exist
async function createBucketIfNotExists(bucketName) {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      console.error(`Error listing buckets: ${listError.message}`);
      return;
    }

    const bucketExists = buckets.some((bucket) => bucket.name === bucketName);

    if (bucketExists) {
      console.log(`Bucket '${bucketName}' already exists.`);
    } else {
      // Create the bucket
      const { data, error } = await supabase.storage.createBucket(bucketName, {
        public: true, // Make the bucket public
      });

      if (error) {
        console.error(
          `Error creating bucket '${bucketName}': ${error.message}`
        );
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
  console.log("Creating storage buckets in Supabase...");

  // Create the required buckets
  await createBucketIfNotExists("stand-images");
  await createBucketIfNotExists("product-images");
  await createBucketIfNotExists("user-avatars");

  console.log("Bucket creation process completed.");
}

// Run the script
createAllBuckets();
