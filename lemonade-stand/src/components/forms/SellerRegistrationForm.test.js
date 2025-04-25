import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import SellerRegistrationForm from './SellerRegistrationForm';
import { createStand } from '../../api/supabaseApi';
import { mockAuthContextValues } from '../../test-utils';

// Mock the API functions
jest.mock('../../api/supabaseApi');

describe('SellerRegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form correctly', () => {
    render(<SellerRegistrationForm />, {
      authContextValue: mockAuthContextValues.authenticated
    });
    
    expect(screen.getByText('Register Your Lemonade Stand')).toBeInTheDocument();
    expect(screen.getByLabelText('Stand Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByText('Register Stand')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    render(<SellerRegistrationForm />, {
      authContextValue: mockAuthContextValues.authenticated
    });
    
    // Submit the form without filling in required fields
    fireEvent.click(screen.getByText('Register Stand'));
    
    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByText('Stand name is required')).toBeInTheDocument();
    });
  });

  test('handles form submission correctly', async () => {
    createStand.mockResolvedValueOnce({
      data: [
        {
          id: 'new-stand-id',
          name: 'Test Lemonade Stand',
          description: 'A test stand',
          address: '123 Test St',
          location_lat: 40.7128,
          location_lng: -74.0060,
          owner_id: 'test-user-id'
        }
      ],
      error: null
    });
    
    const onSuccess = jest.fn();
    
    render(
      <SellerRegistrationForm onSuccess={onSuccess} />,
      { authContextValue: mockAuthContextValues.authenticated }
    );
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Stand Name'), {
      target: { value: 'Test Lemonade Stand' }
    });
    
    fireEvent.change(screen.getByLabelText('Description'), {
      target: { value: 'A test stand' }
    });
    
    fireEvent.change(screen.getByLabelText('Address'), {
      target: { value: '123 Test St' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Register Stand'));
    
    // Check that the createStand function was called with the correct arguments
    await waitFor(() => {
      expect(createStand).toHaveBeenCalledWith({
        name: 'Test Lemonade Stand',
        description: 'A test stand',
        address: '123 Test St',
        location_lat: expect.any(Number),
        location_lng: expect.any(Number),
        owner_id: 'test-user-id',
        is_active: true
      });
    });
    
    // Check that the success callback was called
    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledWith({
        id: 'new-stand-id',
        name: 'Test Lemonade Stand',
        description: 'A test stand',
        address: '123 Test St',
        location_lat: 40.7128,
        location_lng: -74.0060,
        owner_id: 'test-user-id'
      });
    });
    
    // Check for success message
    expect(screen.getByText('Stand registered successfully!')).toBeInTheDocument();
  });

  test('handles API error correctly', async () => {
    createStand.mockResolvedValueOnce({
      data: null,
      error: { message: 'Failed to create stand' }
    });
    
    render(<SellerRegistrationForm />, {
      authContextValue: mockAuthContextValues.authenticated
    });
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Stand Name'), {
      target: { value: 'Test Lemonade Stand' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Register Stand'));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText('Failed to create stand')).toBeInTheDocument();
    });
  });

  test('redirects to login if user is not authenticated', () => {
    render(<SellerRegistrationForm />, {
      authContextValue: mockAuthContextValues.unauthenticated
    });
    
    expect(screen.getByText('Please log in to register a stand')).toBeInTheDocument();
    expect(screen.getByText('Log In')).toBeInTheDocument();
  });
});