import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import AuthForm from './AuthForm';
import { signIn, signUp, signOut } from '../../api/supabaseApi';

// Mock the API functions
jest.mock('../../api/supabaseApi');

describe('AuthForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders login form by default', () => {
    render(<AuthForm />);
    
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText("Don't have an account? Register")).toBeInTheDocument();
  });

  test('renders registration form when initialMode is register', () => {
    render(<AuthForm initialMode="register" />);
    
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Already have an account? Log in')).toBeInTheDocument();
  });

  test('toggles between login and register modes', () => {
    render(<AuthForm />);
    
    // Initially in login mode
    expect(screen.getByText('Log In')).toBeInTheDocument();
    
    // Click to switch to register mode
    fireEvent.click(screen.getByText("Don't have an account? Register"));
    
    // Now in register mode
    expect(screen.getByText('Register')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    
    // Click to switch back to login mode
    fireEvent.click(screen.getByText('Already have an account? Log in'));
    
    // Back in login mode
    expect(screen.getByText('Log In')).toBeInTheDocument();
    expect(screen.queryByLabelText('Full Name')).not.toBeInTheDocument();
  });

  test('handles login submission correctly', async () => {
    signIn.mockResolvedValueOnce({
      data: { user: { email: 'test@example.com' }, session: {} },
      error: null
    });
    
    render(<AuthForm />);
    
    // Fill in the form
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

  test('handles login error correctly', async () => {
    signIn.mockResolvedValueOnce({
      data: null,
      error: { message: 'Invalid email or password' }
    });
    
    render(<AuthForm />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpassword' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('Log In'));
    
    // Check that the signIn function was called
    expect(signIn).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
  });

  test('handles registration submission correctly', async () => {
    signUp.mockResolvedValueOnce({
      data: { user: { email: 'new@example.com' }, session: {} },
      error: null
    });
    
    render(<AuthForm initialMode="register" />);
    
    // Fill in the form
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

  test('displays user profile when authenticated', () => {
    const authContextValue = {
      user: {
        email: 'test@example.com',
        user_metadata: { full_name: 'Test User' }
      },
      isAuthenticated: true
    };
    
    render(<AuthForm />, { authContextValue });
    
    expect(screen.getByText('Your Profile')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('handles logout correctly', async () => {
    signOut.mockResolvedValueOnce({ error: null });
    
    const authContextValue = {
      user: {
        email: 'test@example.com',
        user_metadata: { full_name: 'Test User' }
      },
      isAuthenticated: true
    };
    
    render(<AuthForm />, { authContextValue });
    
    // Click the logout button
    fireEvent.click(screen.getByText('Log Out'));
    
    // Check that the signOut function was called
    expect(signOut).toHaveBeenCalled();
    
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText('Logged out successfully!')).toBeInTheDocument();
    });
  });
});