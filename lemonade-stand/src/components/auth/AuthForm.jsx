import React, { useState } from 'react';
import { signIn, signUp, signOut } from '../../api/supabaseApi';
import { useAuth } from '../../contexts/AuthContext';
import { Form, Button, Alert } from '../ui';

const AuthForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
  });
  
  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      if (mode === 'login') {
        // Login
        const { data, error } = await signIn(formData.email, formData.password);
        
        if (error) {
          throw new Error(error.message);
        }
        
        setSuccess('Logged in successfully!');
      } else {
        // Register
        const { data, error } = await signUp(
          formData.email, 
          formData.password, 
          formData.fullName
        );
        
        if (error) {
          throw new Error(error.message);
        }
        
        setSuccess('Registration successful! Please check your email to confirm your account.');
      }
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
      });
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    setLoading(true);
    
    try {
      const { error } = await signOut();
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSuccess('Logged out successfully!');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle between login and register
  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError(null);
    setSuccess(null);
  };
  
  // If user is authenticated, show profile
  if (isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-display text-lemonade-blue-dark mb-4">
          Your Profile
        </h2>
        
        {error && (
          <Alert 
            variant="error" 
            className="mb-4"
            dismissible
            onDismiss={() => setError(null)}
          >
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert 
            variant="success" 
            className="mb-4"
            dismissible
            onDismiss={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}
        
        <div className="mb-4">
          <p className="text-gray-700">
            <strong>Email:</strong> {user.email}
          </p>
          {user.user_metadata?.full_name && (
            <p className="text-gray-700">
              <strong>Name:</strong> {user.user_metadata.full_name}
            </p>
          )}
        </div>
        
        <Button
          variant="primary"
          onClick={handleLogout}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Logging out...' : 'Log Out'}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-display text-lemonade-blue-dark mb-4">
        {mode === 'login' ? 'Log In' : 'Create an Account'}
      </h2>
      
      {error && (
        <Alert 
          variant="error" 
          className="mb-4"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          className="mb-4"
          dismissible
          onDismiss={() => setSuccess(null)}
        >
          {success}
        </Alert>
      )}
      
      <Form onSubmit={handleSubmit}>
        {mode === 'register' && (
          <Form.Group>
            <Form.Label htmlFor="fullName" required>
              Full Name
            </Form.Label>
            <Form.Input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </Form.Group>
        )}
        
        <Form.Group>
          <Form.Label htmlFor="email" required>
            Email
          </Form.Label>
          <Form.Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        
        <Form.Group>
          <Form.Label htmlFor="password" required>
            Password
          </Form.Label>
          <Form.Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full mb-4"
        >
          {loading 
            ? (mode === 'login' ? 'Logging in...' : 'Registering...') 
            : (mode === 'login' ? 'Log In' : 'Register')}
        </Button>
        
        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-lemonade-blue hover:underline"
          >
            {mode === 'login' 
              ? "Don't have an account? Register" 
              : "Already have an account? Log in"}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;