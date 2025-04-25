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
    .eq('id', userId);
  return { data, error };
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

// Product functions
export const getProducts = async (standId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('stand_id', standId)
    .eq('is_available', true);
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