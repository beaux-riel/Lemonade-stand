import supabase from "../supabaseClient";

/**
 * Script to add missing address fields to the users table in Supabase
 * 
 * This script adds the apt_suite and address_line2 columns to the users table
 * if they don't already exist.
 * 
 * Run this script with: node add-address-fields.js
 */
const addAddressFields = async () => {
  console.log("Checking and adding missing address fields to users table...");
  
  try {
    // Check if the columns already exist
    const { data: columnsData, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'users' });
    
    if (columnsError) {
      throw new Error(`Error checking columns: ${columnsError.message}`);
    }
    
    const columns = columnsData || [];
    const columnNames = columns.map(col => col.column_name);
    
    // Add apt_suite column if it doesn't exist
    if (!columnNames.includes('apt_suite')) {
      console.log("Adding apt_suite column to users table...");
      const { error: aptSuiteError } = await supabase
        .rpc('add_column_if_not_exists', { 
          table_name: 'users',
          column_name: 'apt_suite',
          column_type: 'text'
        });
      
      if (aptSuiteError) {
        throw new Error(`Error adding apt_suite column: ${aptSuiteError.message}`);
      }
      console.log("apt_suite column added successfully!");
    } else {
      console.log("apt_suite column already exists.");
    }
    
    // Add address_line2 column if it doesn't exist
    if (!columnNames.includes('address_line2')) {
      console.log("Adding address_line2 column to users table...");
      const { error: addressLine2Error } = await supabase
        .rpc('add_column_if_not_exists', { 
          table_name: 'users',
          column_name: 'address_line2',
          column_type: 'text'
        });
      
      if (addressLine2Error) {
        throw new Error(`Error adding address_line2 column: ${addressLine2Error.message}`);
      }
      console.log("address_line2 column added successfully!");
    } else {
      console.log("address_line2 column already exists.");
    }
    
    console.log("Address fields check completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error adding address fields:", error.message);
    return { success: false, error: error.message };
  }
};

// Execute the function if this script is run directly
if (require.main === module) {
  addAddressFields()
    .then(result => {
      if (result.success) {
        console.log("Script completed successfully!");
        process.exit(0);
      } else {
        console.error("Script failed:", result.error);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error("Unexpected error:", err);
      process.exit(1);
    });
}

export default addAddressFields;