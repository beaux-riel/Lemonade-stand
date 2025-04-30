// Define mock products directly here to avoid circular dependencies
const mockProducts = [
  {
    id: 'product-1',
    name: 'Classic Lemonade',
    description: 'Our signature lemonade with the perfect balance of sweet and tart',
    price: 3.99,
    image_url: 'https://example.com/lemonade1.jpg',
    stand_id: 'stand-1',
    is_available: true,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z'
  },
  {
    id: 'product-2',
    name: 'Strawberry Lemonade',
    description: 'Classic lemonade with fresh strawberry puree',
    price: 4.99,
    image_url: 'https://example.com/lemonade2.jpg',
    stand_id: 'stand-1',
    is_available: true,
    created_at: '2023-01-02T00:00:00Z',
    updated_at: '2023-01-02T00:00:00Z'
  },
  {
    id: 'product-3',
    name: 'Mint Lemonade',
    description: 'Refreshing lemonade with fresh mint leaves',
    price: 4.49,
    image_url: null,
    stand_id: 'stand-1',
    is_available: false,
    created_at: '2023-01-03T00:00:00Z',
    updated_at: '2023-01-03T00:00:00Z'
  }
];

// Authentication functions
export const signUp = jest.fn().mockImplementation((email, password, fullName) => {
  if (email && password) {
    return Promise.resolve({
      data: {
        user: {
          id: 'test-user-id',
          email,
          user_metadata: { full_name: fullName }
        },
        session: { access_token: 'test-token' }
      },
      error: null
    });
  }
  return Promise.resolve({
    data: null,
    error: { message: 'Invalid email or password' }
  });
});

export const signIn = jest.fn().mockImplementation((email, password) => {
  if (email === 'test@example.com' && password === 'password123') {
    return Promise.resolve({
      data: {
        user: {
          id: 'test-user-id',
          email,
          user_metadata: { full_name: 'Test User' }
        },
        session: { access_token: 'test-token' }
      },
      error: null
    });
  }
  return Promise.resolve({
    data: null,
    error: { message: 'Invalid email or password' }
  });
});

export const signOut = jest.fn().mockResolvedValue({ error: null });

export const getCurrentUser = jest.fn().mockResolvedValue({
  data: {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: { full_name: 'Test User' }
    }
  },
  error: null
});

export const getSession = jest.fn().mockResolvedValue({
  data: {
    session: {
      access_token: 'test-token',
      user: {
        id: 'test-user-id',
        email: 'test@example.com'
      }
    }
  },
  error: null
});

export const resetPassword = jest.fn().mockResolvedValue({ data: {}, error: null });

export const updatePassword = jest.fn().mockResolvedValue({ data: {}, error: null });

// User profile functions
export const getUserProfile = jest.fn().mockResolvedValue({
  data: {
    id: 'test-user-id',
    email: 'test@example.com',
    full_name: 'Test User',
    avatar_url: 'https://example.com/avatar.jpg'
  },
  error: null
});

export const updateUserProfile = jest.fn().mockResolvedValue({
  data: {
    id: 'test-user-id',
    email: 'test@example.com',
    full_name: 'Updated User',
    avatar_url: 'https://example.com/avatar.jpg'
  },
  error: null
});

export const uploadUserAvatar = jest.fn().mockResolvedValue({
  data: {
    id: 'test-user-id',
    avatar_url: 'https://example.com/new-avatar.jpg'
  },
  error: null
});

// Stand functions
export const getStands = jest.fn().mockResolvedValue({
  data: [
    {
      id: 'stand-1',
      name: 'Test Stand 1',
      description: 'Test description 1',
      location_lat: 40.7128,
      location_lng: -74.0060,
      address: '123 Test St, New York, NY',
      image_url: 'https://example.com/image1.jpg',
      owner_id: 'test-user-id',
      is_active: true,
      created_at: '2023-01-01T00:00:00Z',
      updated_at: '2023-01-01T00:00:00Z',
      expiration_time: new Date(Date.now() + 86400000).toISOString()
    },
    {
      id: 'stand-2',
      name: 'Test Stand 2',
      description: 'Test description 2',
      location_lat: 40.7129,
      location_lng: -74.0061,
      address: '456 Test Ave, New York, NY',
      image_url: null,
      owner_id: 'other-user-id',
      is_active: true,
      created_at: '2023-01-02T00:00:00Z',
      updated_at: '2023-01-02T00:00:00Z',
      expiration_time: new Date(Date.now() + 86400000).toISOString()
    }
  ],
  error: null
});

export const getStandById = jest.fn().mockImplementation((standId) => {
  if (standId === 'stand-1') {
    return Promise.resolve({
      data: {
        id: 'stand-1',
        name: 'Test Stand 1',
        description: 'Test description 1',
        location_lat: 40.7128,
        location_lng: -74.0060,
        address: '123 Test St, New York, NY',
        image_url: 'https://example.com/image1.jpg',
        owner_id: 'test-user-id',
        is_active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z',
        expiration_time: new Date(Date.now() + 86400000).toISOString(),
        products: mockProducts
      },
      error: null
    });
  }
  return Promise.resolve({
    data: null,
    error: { message: 'Stand not found' }
  });
});

export const getUserStands = jest.fn().mockImplementation((userId) => {
  if (userId === 'test-user-id') {
    return Promise.resolve({
      data: [
        {
          id: 'stand-1',
          name: 'Test Stand 1',
          description: 'Test description 1',
          location_lat: 40.7128,
          location_lng: -74.0060,
          address: '123 Test St, New York, NY',
          image_url: 'https://example.com/image1.jpg',
          owner_id: 'test-user-id',
          is_active: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: '2023-01-01T00:00:00Z',
          expiration_time: new Date(Date.now() + 86400000).toISOString()
        }
      ],
      error: null
    });
  }
  return Promise.resolve({
    data: [],
    error: null
  });
});

export const createStand = jest.fn().mockImplementation((standData) => {
  return Promise.resolve({
    data: [
      {
        id: 'new-stand-id',
        ...standData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    error: null
  });
});

export const updateStand = jest.fn().mockImplementation((standId, updates) => {
  return Promise.resolve({
    data: [
      {
        id: standId,
        name: updates.name || 'Test Stand',
        description: updates.description || 'Test description',
        location_lat: updates.location_lat || 40.7128,
        location_lng: updates.location_lng || -74.0060,
        address: updates.address || '123 Test St, New York, NY',
        image_url: 'https://example.com/image1.jpg',
        owner_id: 'test-user-id',
        is_active: updates.is_active !== undefined ? updates.is_active : true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
        expiration_time: updates.expiration_time || new Date(Date.now() + 86400000).toISOString()
      }
    ],
    error: null
  });
});

export const extendStandExpiration = jest.fn().mockImplementation((standId, hoursToExtend = 24) => {
  const newExpirationTime = new Date(Date.now() + hoursToExtend * 60 * 60 * 1000).toISOString();
  return Promise.resolve({
    data: [
      {
        id: standId,
        name: 'Test Stand',
        description: 'Test description',
        location_lat: 40.7128,
        location_lng: -74.0060,
        address: '123 Test St, New York, NY',
        image_url: 'https://example.com/image1.jpg',
        owner_id: 'test-user-id',
        is_active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
        expiration_time: newExpirationTime
      }
    ],
    error: null
  });
});

export const deleteStand = jest.fn().mockResolvedValue({ error: null });

export const uploadStandImage = jest.fn().mockResolvedValue({
  data: { path: 'test-user-id/stand-1/image.jpg' },
  error: null
});

// Product functions
export const getProducts = jest.fn().mockImplementation((standId) => {
  if (standId === 'stand-1') {
    return Promise.resolve({
      data: mockProducts,
      error: null
    });
  }
  return Promise.resolve({
    data: [],
    error: null
  });
});

export const getAllProducts = jest.fn().mockResolvedValue({
  data: mockProducts.map(product => ({
    ...product,
    stands: {
      id: 'stand-1',
      name: 'Test Stand 1',
      owner_id: 'test-user-id'
    }
  })),
  error: null
});

export const createProduct = jest.fn().mockImplementation((productData) => {
  return Promise.resolve({
    data: [
      {
        id: 'new-product-id',
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ],
    error: null
  });
});

export const updateProduct = jest.fn().mockImplementation((productId, updates) => {
  return Promise.resolve({
    data: [
      {
        id: productId,
        name: updates.name || 'Test Product',
        description: updates.description || 'Test description',
        price: updates.price || 3.99,
        image_url: 'https://example.com/product.jpg',
        stand_id: updates.stand_id || 'stand-1',
        is_available: updates.is_available !== undefined ? updates.is_available : true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: new Date().toISOString()
      }
    ],
    error: null
  });
});

export const deleteProduct = jest.fn().mockResolvedValue({ error: null });

export const uploadProductImage = jest.fn().mockResolvedValue({
  data: { path: 'test-user-id/stand-1/product-1/image.jpg' },
  error: null
});

// Storage functions
export const uploadImage = jest.fn().mockResolvedValue({
  data: { path: 'test-path/image.jpg' },
  error: null
});

export const getImageUrl = jest.fn().mockReturnValue('https://example.com/image.jpg');

export const deleteImage = jest.fn().mockResolvedValue({ error: null });

// Real-time subscriptions
export const subscribeToStands = jest.fn().mockReturnValue({
  unsubscribe: jest.fn()
});

export const subscribeToProducts = jest.fn().mockReturnValue({
  unsubscribe: jest.fn()
});

export const unsubscribe = jest.fn();