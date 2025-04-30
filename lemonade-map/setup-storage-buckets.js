import { createClient } from "@supabase/supabase-js";

// Load environment variables
const supabaseUrl =
  process.env.VITE_SUPABASE_URL || "https://hbnrwzumdonidkrakaqk.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  prompt("Enter your Supabase service role key: ");

if (!supabaseServiceKey) {
  console.error("Error: Supabase service role key is required");
  process.exit(1);
}

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// List of buckets to create
const bucketsToCreate = [
  { name: "stand-images", public: true },
  { name: "product-images", public: true },
  { name: "user-avatars", public: true },
];

async function setupBuckets() {
  console.log("Setting up Supabase storage buckets...");

  try {
    // Get existing buckets
    const { data: existingBuckets, error: listError } =
      await supabase.storage.listBuckets();

    if (listError) {
      throw new Error(`Error listing buckets: ${listError.message}`);
    }

    console.log("Existing buckets:", existingBuckets?.map((b) => b.name) || []);

    // Create each bucket if it doesn't exist
    for (const bucket of bucketsToCreate) {
      const bucketExists = existingBuckets?.some((b) => b.name === bucket.name);

      if (bucketExists) {
        console.log(`Bucket '${bucket.name}' already exists`);
      } else {
        console.log(`Creating bucket '${bucket.name}'...`);

        const { data, error } = await supabase.storage.createBucket(
          bucket.name,
          {
            public: bucket.public,
          }
        );

        if (error) {
          console.error(
            `Error creating bucket '${bucket.name}':`,
            error.message
          );
        } else {
          console.log(`Bucket '${bucket.name}' created successfully`);
        }
      }

      // Update bucket policies to make it public if needed
      if (bucket.public) {
        console.log(
          `Setting public access policy for bucket '${bucket.name}'...`
        );

        const { error: policyError } = await supabase.storage
          .from(bucket.name)
          .getPublicUrl("test");

        if (policyError) {
          console.error(
            `Error setting public policy for bucket '${bucket.name}':`,
            policyError.message
          );
        } else {
          console.log(`Public access policy set for bucket '${bucket.name}'`);
        }
      }
    }

    console.log("Storage bucket setup completed successfully!");
  } catch (error) {
    console.error("Error setting up storage buckets:", error.message);
  }
}

// Run the setup
setupBuckets();
