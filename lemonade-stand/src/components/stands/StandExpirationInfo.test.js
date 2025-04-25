import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import StandExpirationInfo from './StandExpirationInfo';
import { extendStandExpiration } from '../../api/supabaseApi';

// Mock the API functions
jest.mock('../../api/supabaseApi');

describe('StandExpirationInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly for a stand with no expiration time', () => {
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: null
    };
    
    render(<StandExpirationInfo stand={stand} />);
    
    expect(screen.getByText('This stand does not have an expiration time set.')).toBeInTheDocument();
    expect(screen.getByText('Set 24-hour expiration')).toBeInTheDocument();
  });

  test('renders correctly for an active stand with expiration time', () => {
    // Set expiration time to 12 hours from now
    const expirationTime = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: expirationTime
    };
    
    render(<StandExpirationInfo stand={stand} />);
    
    expect(screen.getByText(/Time remaining:/)).toBeInTheDocument();
    expect(screen.getByText(/12 hours/)).toBeInTheDocument();
    expect(screen.getByText(/Expires on:/)).toBeInTheDocument();
    expect(screen.getByText('Extend by 24 Hours')).toBeInTheDocument();
  });

  test('renders correctly for a stand with critical time remaining', () => {
    // Set expiration time to 20 minutes from now
    const expirationTime = new Date(Date.now() + 20 * 60 * 1000).toISOString();
    
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: expirationTime
    };
    
    render(<StandExpirationInfo stand={stand} />);
    
    expect(screen.getByText(/Time remaining:/)).toBeInTheDocument();
    expect(screen.getByText(/20 minutes/)).toBeInTheDocument();
    // Should have orange styling for critical time
    const container = screen.getByText('Stand Visibility Status').closest('div').parentElement;
    expect(container).toHaveClass('bg-orange-50');
  });

  test('renders correctly for an expired stand', () => {
    // Set expiration time to 1 hour ago
    const expirationTime = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: expirationTime
    };
    
    render(<StandExpirationInfo stand={stand} />);
    
    expect(screen.getByText('This stand has expired and is no longer visible to the public.')).toBeInTheDocument();
    expect(screen.getByText('Reactivate Stand')).toBeInTheDocument();
    // Should have red styling for expired
    const container = screen.getByText('Stand Visibility Status').closest('div').parentElement;
    expect(container).toHaveClass('bg-red-50');
  });

  test('handles extending expiration time correctly', async () => {
    const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
    
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: expirationTime
    };
    
    const onExtend = jest.fn();
    
    // Mock the API response
    const updatedStand = {
      ...stand,
      expiration_time: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString()
    };
    
    extendStandExpiration.mockResolvedValueOnce({
      data: [updatedStand],
      error: null
    });
    
    render(<StandExpirationInfo stand={stand} onExtend={onExtend} />);
    
    // Click the extend button
    fireEvent.click(screen.getByText('Extend by 24 Hours'));
    
    // Check that the API function was called with the correct arguments
    expect(extendStandExpiration).toHaveBeenCalledWith('stand-1');
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Stand expiration extended successfully!')).toBeInTheDocument();
    });
    
    // Check that the onExtend callback was called with the updated stand
    expect(onExtend).toHaveBeenCalledWith(updatedStand);
  });

  test('handles API error correctly', async () => {
    const stand = {
      id: 'stand-1',
      name: 'Test Stand',
      expiration_time: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    };
    
    // Mock the API error
    extendStandExpiration.mockResolvedValueOnce({
      data: null,
      error: { message: 'Failed to extend expiration time' }
    });
    
    render(<StandExpirationInfo stand={stand} />);
    
    // Click the extend button
    fireEvent.click(screen.getByText('Extend by 24 Hours'));
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Failed to extend expiration time')).toBeInTheDocument();
    });
  });
});