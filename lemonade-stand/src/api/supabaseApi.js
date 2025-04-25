import supabase from '../supabaseClient';

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
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  return { data, error };
};

export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select();
  return { data, error };
};

export const uploadUserAvatar = async (userId, file) => {
  // Get file extension
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('user_avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    
  if (error) {
    return { error };
  }
  
  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('user_avatars')
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
    .from('stands')
    .select('*')
    .eq('is_active', true);
  return { data, error };
};

export const getStandById = async (standId) => {
  const { data, error } = await supabase
    .from('stands')
    .select('*, products(*)')
    .eq('id', standId)
    .single();
  return { data, error };
};

export const getUserStands = async (userId) => {
  const { data, error } = await supabase
    .from('stands')
    .select('*')
    .eq('owner_id', userId);
  return { data, error };
};

export const createStand = async (standData) => {
  const { data, error } = await supabase
    .from('stands')
    .insert([standData])
    .select();
  return { data, error };
};

export const updateStand = async (standId, updates) => {
  const { data, error } = await supabase
    .from('stands')
    .update(updates)
    .eq('id', standId)
    .select();
  return { data, error };
};

export const deleteStand = async (standId) => {
  const { error } = await supabase
    .from('stands')
    .delete()
    .eq('id', standId);
  return { error };
};

export const uploadStandImage = async (standId, userId, file) => {
  // Create a unique file path
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${standId}/${timestamp}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('stand_images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    
  if (error) {
    return { error };
  }
  
  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('stand_images')
    .getPublicUrl(filePath);
    
  // Update stand with image URL
  const { data: standData, error: standError } = await updateStand(standId, {
    image_url: urlData.publicUrl,
  });
  
  return { data: standData, error: standError };
};

// Product functions
export const getProducts = async (standId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('stand_id', standId)
    .eq('is_available', true);
  return { data, error };
};

export const getAllProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, stands(*)')
    .eq('is_available', true)
    .eq('stands.is_active', true);
  return { data, error };
};

export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select();
  return { data, error };
};

export const updateProduct = async (productId, updates) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select();
  return { data, error };
};

export const deleteProduct = async (productId) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);
  return { error };
};

export const uploadProductImage = async (productId, standId, userId, file) => {
  // Create a unique file path
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/${standId}/${productId}/${timestamp}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('product_images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
    
  if (error) {
    return { error };
  }
  
  // Get the public URL
  const { data: urlData } = supabase.storage
    .from('product_images')
    .getPublicUrl(filePath);
    
  // Update product with image URL
  const { data: productData, error: productError } = await updateProduct(productId, {
    image_url: urlData.publicUrl,
  });
  
  return { data: productData, error: productError };
};

// Storage functions
export const uploadImage = async (bucket, filePath, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });
  return { data, error };
};

export const getImageUrl = (bucket, filePath) => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteImage = async (bucket, filePath) => {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([filePath]);
  return { error };
};

// Real-time subscriptions
export const subscribeToStands = (callback) => {
  const subscription = supabase
    .channel('public:stands')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'stands',
      filter: 'is_active=eq.true'
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
    
  return subscription;
};

export const subscribeToProducts = (standId, callback) => {
  const subscription = supabase
    .channel(`public:products:stand_id=eq.${standId}`)
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'products',
      filter: `stand_id=eq.${standId}`
    }, (payload) => {
      callback(payload);
    })
    .subscribe();
    
  return subscription;
};

export const unsubscribe = (subscription) => {
  supabase.removeChannel(subscription);
};