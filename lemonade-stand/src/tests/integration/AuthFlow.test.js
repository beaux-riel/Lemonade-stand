import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { signIn, signUp, signOut } from '../../api/supabaseApi';

// Mock the API functions
jest.mock('../../api/supabaseApi');

// Create a custom render function for the App
const renderApp = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('user can navigate to login page and log in successfully', async () => {
    signIn.mockResolvedValueOnce({
      data: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          user_metadata: { full_name: 'Test User' }
        },
        session: { access_token: 'test-token' }
      },
      error: null
    });
    
    renderApp('/');
    
    // Navigate to login page
    fireEvent.click(screen.getByText('Log In'));
    
    // Check that we're on the login page
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    
    // Fill in the login form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Log In'));
    
    // Check that the signIn function was called with the correct arguments
    expect(signIn).toHaveBeenCalledWith('test@example.com', 'password123');
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Logged in successfully!')).toBeInTheDocument();
    });
  });

  test('user can navigate to register page and sign up successfully', async () => {
    signUp.mockResolvedValueOnce({
      data: {
        user: {
          id: 'new-user-id',
          email: 'new@example.com',
          user_metadata: { full_name: 'New User' }
        },
        session: { access_token: 'test-token' }
      },
      error: null
    });
    
    renderApp('/');
    
    // Navigate to register page
    fireEvent.click(screen.getByText('Register'));
    
    // Check that we're on the register page
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    
    // Fill in the registration form
    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'New User' }
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'new@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'newpassword123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Register'));
    
    // Check that the signUp function was called with the correct arguments
    expect(signUp).toHaveBeenCalledWith('new@example.com', 'newpassword123', 'New User');
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Registration successful! Please check your email to confirm your account.')).toBeInTheDocument();
    });
  });

  test('authenticated user can access protected routes', async () => {
    // Mock the auth context to simulate an authenticated user
    const authContextValue = {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: { full_name: 'Test User' }
      },
      session: { access_token: 'test-token' },
      loading: false,
      error: null,
      isAuthenticated: true
    };
    
    render(
      <MemoryRouter initialEntries={['/seller/dashboard']}>
        <App />
      </MemoryRouter>,
      { authContextValue }
    );
    
    // Check that we're on the seller dashboard
    await waitFor(() => {
      expect(screen.getByText('Seller Dashboard')).toBeInTheDocument();
    });
  });

  test('unauthenticated user is redirected from protected routes to login', async () => {
    // Mock the auth context to simulate an unauthenticated user
    const authContextValue = {
      user: null,
      session: null,
      loading: false,
      error: null,
      isAuthenticated: false
    };
    
    render(
      <MemoryRouter initialEntries={['/seller/dashboard']}>
        <App />
      </MemoryRouter>,
      { authContextValue }
    );
    
    // Check that we're redirected to the login page
    await waitFor(() => {
      expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    });
  });

  test('user can log out successfully', async () => {
    signOut.mockResolvedValueOnce({ error: null });
    
    // Mock the auth context to simulate an authenticated user
    const authContextValue = {
      user: {
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: { full_name: 'Test User' }
      },
      session: { access_token: 'test-token' },
      loading: false,
      error: null,
      isAuthenticated: true
    };
    
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
      { authContextValue }
    );
    
    // Open the user menu
    fireEvent.click(screen.getByText('Test User'));
    
    // Click the sign out button
    fireEvent.click(screen.getByText('Sign Out'));
    
    // Check that the signOut function was called
    expect(signOut).toHaveBeenCalled();
  });
});