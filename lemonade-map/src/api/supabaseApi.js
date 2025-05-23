import supabase from "../supabaseClient";

// Authentication functions
export const signUp = async (email, password, fullName) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { data, error };
};

export const resetPassword = async (email) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

// User profile functions
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from("users")
    .update(updates)
    .eq("id", userId)
    .select();
  return { data, error };
};

export const updateUserAddress = async (userId, addressData) => {
  try {
    // First get current preferences to preserve any existing preferences
    const { data: currentData, error: fetchError } = await getUserProfile(userId);
    
    if (fetchError) {
      return { error: fetchError };
    }
    
    // Ensure all address fields have at least empty string values to prevent null/undefined issues
    const sanitizedAddressData = {
      street: addressData.street || '',
      city: addressData.city || '',
      state: addressData.state || '',
      postal_code: addressData.postal_code || '',
      country: addressData.country || 'Canada',
      apt_suite: addressData.apt_suite || '',
      address_line2: addressData.address_line2 || '',
      useForSearch: addressData.useForSearch || false
    };
    
    // Create the full address string only if we have the minimum required fields
    let fullAddress = '';
    if (sanitizedAddressData.street && sanitizedAddressData.city && sanitizedAddressData.state) {
      fullAddress = `${sanitizedAddressData.street}${sanitizedAddressData.apt_suite ? `, ${sanitizedAddressData.apt_suite}` : ''}${sanitizedAddressData.address_line2 ? `, ${sanitizedAddressData.address_line2}` : ''}, ${sanitizedAddressData.city}, ${sanitizedAddressData.state} ${sanitizedAddressData.postal_code}, ${sanitizedAddressData.country}`;
    }
    
    // Merge with existing preferences or create new preferences object
    const currentPreferences = currentData?.preferences || {};
    const updatedPreferences = {
      ...currentPreferences,
      defaultSearchLocation: {
        address: fullAddress,
        useForSearch: sanitizedAddressData.useForSearch
      }
    };
    
    // Prepare the update object with all address fields
    const updateObj = {
      street: sanitizedAddressData.street,
      city: sanitizedAddressData.city,
      state: sanitizedAddressData.state,
      postal_code: sanitizedAddressData.postal_code,
      country: sanitizedAddressData.country,
      apt_suite: sanitizedAddressData.apt_suite,
      address_line2: sanitizedAddressData.address_line2,
      // Store the preferences as a JSON object
      preferences: updatedPreferences
    };
    
    // Update the user record
    const { data, error } = await supabase
      .from("users")
      .update(updateObj)
      .eq("id", userId)
      .select();
      
    if (error) {
      console.error("Error updating user address:", error);
      
      // If the error might be related to missing columns, run the add_address_columns function
      if (error.message && (error.message.includes('apt_suite') || error.message.includes('address_line2'))) {
        // Try to add the missing columns
        try {
          // First try to execute the add_column_if_not_exists function
          await supabase.rpc('add_column_if_not_exists', { 
            table_name: 'users', 
            column_name: 'apt_suite', 
            column_type: 'text' 
          });
          
          await supabase.rpc('add_column_if_not_exists', { 
            table_name: 'users', 
            column_name: 'address_line2', 
            column_type: 'text' 
          });
          
          // Try the update again after adding the columns
          const { data: retryData, error: retryError } = await supabase
            .from("users")
            .update(updateObj)
            .eq("id", userId)
            .select();
            
          if (retryError) {
            return { 
              data: null, 
              error: {
                ...retryError,
                message: "Address update failed after attempting to add missing columns. Please contact the administrator."
              }
            };
          }
          
          return { data: retryData, error: null };
        } catch (addColumnError) {
          return { 
            data: null, 
            error: {
              ...error,
              message: "Address update failed. The database is missing required columns. Please contact the administrator to run the add_address_columns.sql script."
            }
          };
        }
      }
      
      return { data: null, error };
    }
    
    return { data, error: null };
  } catch (err) {
    console.error("Unexpected error in updateUserAddress:", err);
    return { 
      data: null, 
      error: { 
        message: "An unexpected error occurred while updating your address. Please try again later." 
      } 
    };
  }
};

export const updateUserPreferences = async (userId, preferences) => {
  // First get current preferences
  const { data: currentData, error: fetchError } = await getUserProfile(userId);
  
  if (fetchError) {
    return { error: fetchError };
  }
  
  // Merge new preferences with existing ones
  const currentPreferences = currentData.preferences || {};
  const updatedPreferences = { ...currentPreferences, ...preferences };
  
  const { data, error } = await supabase
    .from("users")
    .update({
      preferences: updatedPreferences
    })
    .eq("id", userId)
    .select();
  
  return { data, error };
};

export const uploadUserAvatar = async (userId, file) => {
  // Get file extension
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("user-avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error };
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from("user-avatars")
    .getPublicUrl(filePath);

  // Update user profile with avatar URL
  const { data: userData, error: userError } = await updateUserProfile(userId, {
    avatar_url: urlData.publicUrl,
  });

  return { data: userData, error: userError };
};

// Stand functions
export const getStands = async () => {
  const { data, error } = await supabase
    .from("stands")
    .select("*")
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching stands:", error);
  } else {
    console.log("Fetched stands:", data);
  }

  return { data, error };
};

export const getStandById = async (standId) => {
  try {
    if (!standId) {
      return { data: null, error: new Error('Stand ID is required') };
    }
    
    const { data, error } = await supabase
      .from("stands")
      .select("*, products(*)")
      .eq("id", standId)
      .single();
      
    if (error) {
      console.error('Error fetching stand by ID:', error);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Unexpected error in getStandById:', err);
    return { data: null, error: err };
  }
};

export const getUserStands = async (userId) => {
  const { data, error } = await supabase
    .from("stands")
    .select("*")
    .eq("owner_id", userId);
  return { data, error };
};

export const createStand = async (standData) => {
  const { data, error } = await supabase
    .from("stands")
    .insert([standData])
    .select();
  return { data, error };
};

export const updateStand = async (standId, updates) => {
  const { data, error } = await supabase
    .from("stands")
    .update(updates)
    .eq("id", standId)
    .select();
  return { data, error };
};

export const extendStandExpiration = async (standId) => {
  // First get the current stand to check its expiration time
  const { data: stand, error: fetchError } = await supabase
    .from("stands")
    .select("expiration_time, is_active")
    .eq("id", standId)
    .single();

  if (fetchError) {
    return { error: fetchError };
  }

  const now = new Date();
  const currentExpiration = stand.expiration_time
    ? new Date(stand.expiration_time)
    : null;

  // If the stand is expired or inactive, use the reopen_stand function
  if (!stand.is_active || (currentExpiration && currentExpiration < now)) {
    const { data, error } = await supabase
      .rpc("reopen_stand", { stand_id: standId })
      .single();

    return { data, error };
  } else {
    // If the stand is still active, just return the current stand data
    return {
      data: [stand],
      message: "Stand is already active until midnight today.",
    };
  }
};

// Function to explicitly reopen a stand (for the reopen button)
export const reopenStand = async (standId) => {
  const { data, error } = await supabase
    .rpc("reopen_stand", { stand_id: standId })
    .single();

  return { data, error };
};

export const deleteStand = async (standId) => {
  const { error } = await supabase.from("stands").delete().eq("id", standId);
  return { error };
};

export const uploadStandImage = async (standId, userId, file) => {
  // Create a unique file path
  const timestamp = Date.now();
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${standId}/${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("stand-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error };
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from("stand-images")
    .getPublicUrl(filePath);

  // Update stand with image URL
  const { data: standData, error: standError } = await updateStand(standId, {
    image_url: urlData.publicUrl,
  });

  return { data: standData, error: standError };
};

// Product functions
export const getProducts = async (standId) => {
  try {
    if (!standId) {
      return { data: null, error: new Error('Stand ID is required') };
    }
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("stand_id", standId);
      
    if (error) {
      console.error('Error fetching products for stand:', error);
    }
    
    return { data: data || [], error };
  } catch (err) {
    console.error('Unexpected error in getProducts:', err);
    return { data: [], error: err };
  }
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("*, stands!inner(*)")
    .eq("is_available", true)
    .eq("stands.is_active", true);
  return { data, error };
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from("products")
    .insert([productData])
    .select();
  return { data, error };
};

export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", productId)
    .select();
  return { data, error };
};

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);
  return { error };
};

export const uploadProductImage = async (productId, standId, userId, file) => {
  // Create a unique file path
  const timestamp = Date.now();
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${standId}/${productId}/${timestamp}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { error };
  }

  // Get the public URL
  const { data: urlData } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  // Update product with image URL
  const { data: productData, error: productError } = await updateProduct(
    productId,
    {
      image_url: urlData.publicUrl,
    }
  );

  return { data: productData, error: productError };
};

// Storage functions
export const uploadImage = async (bucket, filePath, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });
  return { data, error };
};

export const getImageUrl = (bucket, filePath) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteImage = async (bucket, filePath) => {
  const { error } = await supabase.storage.from(bucket).remove([filePath]);
  return { error };
};

// Real-time subscriptions
export const subscribeToStands = (callback) => {
  const subscription = supabase
    .channel("public:stands")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "stands",
        filter: "is_active=eq.true",
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};

export const subscribeToProducts = (standId, callback) => {
  const subscription = supabase
    .channel(`public:products:stand_id=eq.${standId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "products",
        filter: `stand_id=eq.${standId}`,
      },
      (payload) => {
        callback(payload);
      }
    )
    .subscribe();

  return subscription;
};

export const unsubscribe = (subscription) => {
  supabase.removeChannel(subscription);
};
