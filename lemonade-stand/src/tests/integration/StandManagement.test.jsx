import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { MemoryRouter } from 'react-router';
import App from '../../App';
import { 
  getUserStands, 
  getStandById, 
  createStand, 
  updateStand, 
  deleteStand,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../../api/supabaseApi';
import { mockAuthContextValues, mockStandContextValues } from '../../test-utils';

// Mock the API functions
jest.mock('../../api/supabaseApi');

describe('Stand Management Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    getUserStands.mockResolvedValue({
      data: mockStandContextValues.withStands.stands,
      error: null
    });
    
    getStandById.mockImplementation((standId) => {
      const stand = mockStandContextValues.withStands.stands.find(s => s.id === standId);
      return Promise.resolve({
        data: stand || null,
        error: stand ? null : { message: 'Stand not found' }
      });
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
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ],
        error: null
      });
    });
    
    deleteStand.mockResolvedValue({ error: null });
    
    getProducts.mockResolvedValue({
      data: [
        {
          id: 'product-1',
          name: 'Classic Lemonade',
          description: 'Our signature lemonade',
          price: 3.99,
          stand_id: 'stand-1',
          is_available: true
        }
      ],
      error: null
    });
    
    createProduct.mockResolvedValue({
      data: [
        {
          id: 'new-product-id',
          name: 'New Lemonade',
          description: 'A new lemonade flavor',
          price: 4.99,
          stand_id: 'stand-1',
          is_available: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ],
      error: null
    });
    
    updateProduct.mockImplementation((productId, updates) => {
      return Promise.resolve({
        data: [
          {
            id: productId,
            ...updates,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ],
        error: null
      });
    });
    
    deleteProduct.mockResolvedValue({ error: null });
  });

  test('authenticated user can view seller dashboard with stands', async () => {
    render(
      <MemoryRouter initialEntries={['/seller/dashboard']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Check that the dashboard is rendered
    await waitFor(() => {
      expect(screen.getByText('Seller Dashboard')).toBeInTheDocument();
    });
    
    // Check that the API was called to get user stands
    expect(getUserStands).toHaveBeenCalledWith('test-user-id');
    
    // Check that stands are displayed
    await waitFor(() => {
      expect(screen.getByText('Test Stand 1')).toBeInTheDocument();
    });
  });

  test('user can navigate to stand detail page', async () => {
    getStandById.mockResolvedValueOnce({
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
    
    render(
      <MemoryRouter initialEntries={['/seller/stands/stand-1']}>
        <App />
      </MemoryRouter>,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Check that the stand detail page is rendered
    await waitFor(() => {
      expect(screen.getByText('Test Stand 1')).toBeInTheDocument();
      expect(screen.getByText('Stand Details')).toBeInTheDocument();
    });
    
    // Check that the API was called to get stand details
    expect(getStandById).toHaveBeenCalledWith('stand-1');
  });

  test('user can update stand details', async () => {
    getStandById.mockResolvedValueOnce({
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
    
    updateStand.mockResolvedValueOnce({
      data: [
        {
          id: 'stand-1',
          name: 'Updated Stand Name',
          description: 'Updated description',
          location_lat: 40.7128,
          location_lng: -74.0060,
          address: '123 Test St, New York, NY',
          image_url: 'https://example.com/image1.jpg',
          owner_id: 'test-user-id',
          is_active: true,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: new Date().toISOString(),
          expiration_time: new Date(Date.now() + 86400000).toISOString()
        }
      ],
      error: null
    });
    
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
    
    // Update the description
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'Updated description' }
    });
    
    // Save the changes
    fireEvent.click(screen.getByText('Save Changes'));
    
    // Check that the API was called to update the stand
    await waitFor(() => {
      expect(updateStand).toHaveBeenCalledWith('stand-1', expect.objectContaining({
        name: 'Updated Stand Name',
        description: 'Updated description'
      }));
    });
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Stand updated successfully!')).toBeInTheDocument();
    });
  });

  test('user can deactivate a stand', async () => {
    getStandById.mockResolvedValueOnce({
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
    
    updateStand.mockResolvedValueOnce({
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
          is_active: false,
          created_at: '2023-01-01T00:00:00Z',
          updated_at: new Date().toISOString(),
          expiration_time: new Date(Date.now() + 86400000).toISOString()
        }
      ],
      error: null
    });
    
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
    
    // Click the deactivate button
    fireEvent.click(screen.getByText('Deactivate Stand'));
    
    // Check that the API was called to update the stand
    await waitFor(() => {
      expect(updateStand).toHaveBeenCalledWith('stand-1', expect.objectContaining({
        is_active: false
      }));
    });
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText('Stand deactivated successfully!')).toBeInTheDocument();
    });
  });

  test('user can delete a stand', async () => {
    getStandById.mockResolvedValueOnce({
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
    
    deleteStand.mockResolvedValueOnce({ error: null });
    
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
    
    // Click the delete button
    fireEvent.click(screen.getByText('Delete Stand'));
    
    // Confirm deletion in the modal
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to delete this stand?')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Delete Stand', { selector: 'button' }));
    
    // Check that the API was called to delete the stand
    await waitFor(() => {
      expect(deleteStand).toHaveBeenCalledWith('stand-1');
    });
  });
});