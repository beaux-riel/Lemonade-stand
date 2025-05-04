import supabase from "../supabaseClient";

/**
 * Script to test if the address fields are working correctly
 * 
 * This script:
 * 1. Checks if the apt_suite and address_line2 columns exist in the users table
 * 2. Attempts to update a test user with these fields
 * 3. Verifies that the update was successful
 * 
 * Run this script with: node test-address-fields.js
 */
const testAddressFields = async (userId) => {
  if (!userId) {
    console.error("Error: User ID is required");
    return { success: false, error: "User ID is required" };
  }

  console.log(`Testing address fields for user ${userId}...`);
  
  try {
    // Step 1: Check if the columns exist
    console.log("Checking if address columns exist...");
    const { data: columnsData, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'users' });
    
    if (columnsError) {
      throw new Error(`Error checking columns: ${columnsError.message}`);
    }
    
    const columns = columnsData || [];
    const columnNames = columns.map(col => col.column_name);
    
    const hasAptSuite = columnNames.includes('apt_suite');
    const hasAddressLine2 = columnNames.includes('address_line2');
    
    console.log(`apt_suite column exists: ${hasAptSuite}`);
    console.log(`address_line2 column exists: ${hasAddressLine2}`);
    
    if (!hasAptSuite || !hasAddressLine2) {
      console.warn("Warning: One or more address columns are missing!");
      console.warn("Please run the add_address_columns.sql script first.");
      return { 
        success: false, 
        error: "Missing address columns in database",
        details: { hasAptSuite, hasAddressLine2 }
      };
    }
    
    // Step 2: Attempt to update a user with these fields
    console.log("Attempting to update user with address fields...");
    const testData = {
      apt_suite: "Test Suite 123",
      address_line2: "Test Address Line 2"
    };
    
    const { data: updateData, error: updateError } = await supabase
      .from("users")
      .update(testData)
      .eq("id", userId)
      .select();
    
    if (updateError) {
      throw new Error(`Error updating user: ${updateError.message}`);
    }
    
    console.log("Update successful!");
    
    // Step 3: Verify the update
    console.log("Verifying update...");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("apt_suite, address_line2")
      .eq("id", userId)
      .single();
    
    if (userError) {
      throw new Error(`Error fetching user: ${userError.message}`);
    }
    
    const verificationPassed = 
      userData.apt_suite === testData.apt_suite && 
      userData.address_line2 === testData.address_line2;
    
    console.log("Verification result:", verificationPassed ? "PASSED" : "FAILED");
    console.log("User data:", userData);
    
    return { 
      success: verificationPassed, 
      data: userData,
      details: { hasAptSuite, hasAddressLine2 }
    };
  } catch (error) {
    console.error("Error testing address fields:", error.message);
    return { success: false, error: error.message };
  }
};

// Execute the function if this script is run directly
if (require.main === module) {
  // Get user ID from command line arguments
  const userId = process.argv[2];
  
  if (!userId) {
    console.error("Error: Please provide a user ID as a command line argument");
    console.error("Usage: node test-address-fields.js USER_ID");
    process.exit(1);
  }
  
  testAddressFields(userId)
    .then(result => {
      if (result.success) {
        console.log("Test completed successfully!");
        process.exit(0);
      } else {
        console.error("Test failed:", result.error);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("Unexpected error:", err);
      process.exit(1);
    });
}

export default testAddressFields;