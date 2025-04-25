import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';

// Mock auth context values
export const mockAuthContextValues = {
  authenticated: {
    user: {
      id: 'test-user-id',
      email: 'test@example.com',
      user_metadata: {
        full_name: 'Test User'
      }
    },
    session: { access_token: 'test-token' },
    loading: false,
    error: null,
    isAuthenticated: true
  },
  unauthenticated: {
    user: null,
    session: null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  loading: {
    user: null,
    session: null,
    loading: true,
    error: null,
    isAuthenticated: false
  },
  error: {
    user: null,
    session: null,
    loading: false,
    error: 'Authentication error',
    isAuthenticated: false
  }
};

// Mock stand context values
export const mockStandContextValues = {
  empty: {
    stands: [],
    loading: false,
    error: null
  },
  withStands: {
    stands: [
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
        expiration_time: new Date(Date.now() + 86400000).toISOString() // 24 hours from now
      },
      {
        id: 'stand-2',
        name: 'Test Stand 2',
        description: 'Test description 2',
        location_lat: 40.7129,
        location_lng: -74.0061,
        address: '456 Test Ave, New York, NY',
        image_url: null,
        owner_id: 'test-user-id',
        is_active: false,
        created_at: '2023-01-02T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z',
        expiration_time: new Date(Date.now() - 86400000).toISOString() // 24 hours ago (expired)
      }
    ],
    loading: false,
    error: null
  },
  loading: {
    stands: [],
    loading: true,
    error: null
  },
  error: {
    stands: [],
    loading: false,
    error: 'Failed to load stands'
  }
};

// Mock geolocation context values
export const mockGeolocationContextValues = {
  default: {
    location: {
      latitude: 40.7128,
      longitude: -74.0060,
      accuracy: 10
    },
    address: '123 Test St, New York, NY',
    loading: false,
    error: null,
    watchLocation: jest.fn()
  },
  loading: {
    location: null,
    address: null,
    loading: true,
    error: null,
    watchLocation: jest.fn()
  },
  error: {
    location: null,
    address: null,
    loading: false,
    error: 'Geolocation error',
    watchLocation: jest.fn()
  }
};

// Mock nearby stands context values
export const mockNearbyStandsContextValues = {
  empty: {
    nearbyStands: [],
    loading: false,
    error: null
  },
  withStands: {
    nearbyStands: [
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
        distance: 0.5,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: '2023-01-01T00:00:00Z'
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
        distance: 1.2,
        created_at: '2023-01-02T00:00:00Z',
        updated_at: '2023-01-02T00:00:00Z'
      }
    ],
    loading: false,
    error: null
  },
  loading: {
    nearbyStands: [],
    loading: true,
    error: null
  },
  error: {
    nearbyStands: [],
    loading: false,
    error: 'Failed to load nearby stands'
  }
};

// Mock products
export const mockProducts = [
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

// Custom render function that includes providers
function render(
  ui,
  {
    authContextValue = mockAuthContextValues.unauthenticated,
    standContextValue = mockStandContextValues.empty,
    geolocationContextValue = mockGeolocationContextValues.default,
    nearbyStandsContextValue = mockNearbyStandsContextValues.empty,
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    // Mock the context providers with our test values
    return (
      <BrowserRouter>
        <AuthProvider value={authContextValue}>
          <StandProvider value={standContextValue}>
            <GeolocationProvider value={geolocationContextValue}>
              <NearbyStandsProvider value={nearbyStandsContextValue}>
                {children}
              </NearbyStandsProvider>
            </GeolocationProvider>
          </StandProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// Re-export everything from testing-library
export * from '@testing-library/react';

// Override the render method
export { render };