import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { 
  signIn, 
  getSession, 
  getCurrentUser,
  getUserStands,
  getStandById,
  createStand,
  updateStand
} from '../../api/supabaseApi';
import { mockAuthContextValues } from '../../test-utils';

// Mock the API functions
jest.mock('../../api/supabaseApi');

describe('Data Persistence Across Browsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Clear localStorage
    localStorage.clear();
    
    // Default mock implementations
    signIn.mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          user_metadata: { full_name: 'Test User' }
        },
        session: { 
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
          expires_at: Date.now() + 3600000 // 1 hour from now
        }
      },
      error: null
    });
    
    getSession.mockResolvedValue({
      data: {
        session: {
          access_token: 'test-token',
          refresh_token: 'test-refresh-token',
          expires_at: Date.now() + 3600000,
          user: {
            id: 'test-user-id',
            email: 'test@example.com'
          }
        }
      },
      error: null
    });
    
    getCurrentUser.mockResolvedValue({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          user_metadata: { full_name: 'Test User' }
        }
      },
      error: null
    });
    
    getUserStands.mockResolvedValue({
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
    
    getStandById.mockResolvedValue({
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
        products: []
      },
      error: null
    });
    
    createStand.mockResolvedValue({
      data: [
        {
          id: 'new-stand-id',
          name: 'New Test Stand',
          description: 'A new test stand',
          location_lat: 40.7128,
          location_lng: -74.0060,
          address: '123 New St, New York, NY',
          owner_id: 'test-user-id',
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          expiration_time: new Date(Date.now() + 86400000).toISOString()
        }
      ],
      error: null
    });
    
    updateStand.mockImplementation((standId, updates) => {
      return Promise.resolve({
        data: [
          {
            id: standId,
            ...updates,
            owner_id: 'test-user-id',
            created_at: '2023-01-01T00:00:00Z',
            updated_at: new Date().toISOString()
          }
        ],
        error: null
      });
    });
  });

  test('session is persisted in localStorage and restored on page reload', async () => {
    // First render - user logs in
    const { unmount } = render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );
    
    // Fill in the login form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Log In'));
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Logged in successfully!')).toBeInTheDocument();
    });
    
    // Check that the session was stored in localStorage
    expect(localStorage.getItem).toHaveBeenCalledWith('supabase.auth.token');
    
    // Unmount the component to simulate closing the browser
    unmount();
    
    // Mock the localStorage.getItem to return a session
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'supabase.auth.token') {
        return JSON.stringify({
          currentSession: {
            access_token: 'test-token',
            refresh_token: 'test-refresh-token',
            expires_at: Date.now() + 3600000,
            user: {
              id: 'test-user-id',
              email: 'test@example.com'
            }
          }
        });
      }
      return null;
    });
    
    // Second render - simulate reopening the browser
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    
    // Check that getSession was called to restore the session
    expect(getSession).toHaveBeenCalled();
    
    // Check that the user is still authenticated
    await waitFor(() => {
      // The user's name should be visible in the header
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  test('stand data is persisted after creation and can be accessed in another browser', async () => {
    // First render - user creates a stand
    render(
      <MemoryRouter initialEntries={['/seller/stands/new']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Wait for the form to load
    await waitFor(() => {
      expect(screen.getByText('Register Your Lemonade Stand')).toBeInTheDocument();
    });
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Stand Name'), {
      target: { value: 'New Test Stand' }
    });
    
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'A new test stand' }
    });
    
    fireEvent.change(screen.getByLabelText('Address'), {
      target: { value: '123 New St, New York, NY' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Register Stand'));
    
    // Check that the createStand function was called
    await waitFor(() => {
      expect(createStand).toHaveBeenCalledWith(expect.objectContaining({
        name: 'New Test Stand',
        description: 'A new test stand',
        address: '123 New St, New York, NY'
      }));
    });
    
    // Second render - simulate opening in another browser and viewing the stand
    render(
      <MemoryRouter initialEntries={['/seller/stands/new-stand-id']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Mock the getStandById to return the newly created stand
    getStandById.mockResolvedValueOnce({
      data: {
        id: 'new-stand-id',
        name: 'New Test Stand',
        description: 'A new test stand',
        location_lat: 40.7128,
        location_lng: -74.0060,
        address: '123 New St, New York, NY',
        image_url: null,
        owner_id: 'test-user-id',
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        expiration_time: new Date(Date.now() + 86400000).toISOString(),
        products: []
      },
      error: null
    });
    
    // Check that the stand details are displayed
    await waitFor(() => {
      expect(screen.getByText('New Test Stand')).toBeInTheDocument();
      expect(screen.getByText('A new test stand')).toBeInTheDocument();
      expect(screen.getByText('123 New St, New York, NY')).toBeInTheDocument();
    });
  });

  test('stand updates are persisted and visible across browsers', async () => {
    // First render - user updates a stand
    render(
      <MemoryRouter initialEntries={['/seller/stands/stand-1']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Wait for the stand detail page to load
    await waitFor(() => {
      expect(screen.getByText('Test Stand 1')).toBeInTheDocument();
    });
    
    // Click the edit button
    fireEvent.click(screen.getByText('Edit Details'));
    
    // Update the stand name
    fireEvent.change(screen.getByLabelText('Stand Name'), {
      target: { value: 'Updated Stand Name' }
    });
    
    // Save the changes
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Check that the updateStand function was called
    await waitFor(() => {
      expect(updateStand).toHaveBeenCalledWith('stand-1', expect.objectContaining({
        name: 'Updated Stand Name'
      }));
    });
    
    // Second render - simulate opening in another browser
    render(
      <MemoryRouter initialEntries={['/seller/stands/stand-1']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Mock the getStandById to return the updated stand
    getStandById.mockResolvedValueOnce({
      data: {
        id: 'stand-1',
        name: 'Updated Stand Name',
        description: 'Test description 1',
        location_lat: 40.7128,
        location_lng: -74.0060,
        address: '123 Test St, New York, NY',
        image_url: 'https://example.com/image1.jpg',
        owner_id: 'test-user-id',
        is_active: true,
        created_at: '2023-01-01T00:00:00Z',
        updated_at: new Date().toISOString(),
        expiration_time: new Date(Date.now() + 86400000).toISOString(),
        products: []
      },
      error: null
    });
    
    // Check that the updated stand name is displayed
    await waitFor(() => {
      expect(screen.getByText('Updated Stand Name')).toBeInTheDocument();
    });
  });
});