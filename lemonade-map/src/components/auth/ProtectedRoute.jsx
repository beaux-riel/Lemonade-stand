import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LoadingIndicator } from '../ui';

/**
 * ProtectedRoute component that redirects to login if user is not authenticated
 * @param {Object} props - Component props
 * @param {string} props.redirectPath - Path to redirect to if not authenticated
 * @returns {JSX.Element} - Protected route component
 */
const ProtectedRoute = ({ redirectPath = '/login' }) => {
  const { isAuthenticated, loading, initializing, user } = useAuth();
  const location = useLocation();
  
  // Log authentication state for debugging
  useEffect(() => {
    console.log('ProtectedRoute - Auth State:', { 
      isAuthenticated, 
      loading,
      initializing,
      path: location.pathname,
      user: user ? 'User exists' : 'No user'
    });
  }, [isAuthenticated, loading, initializing, location.pathname, user]);
  
  // Show loading state while auth is being checked
  if (initializing || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingIndicator 
          size="md" 
          variant="blue" 
          message="Checking authentication..." 
        />
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to', redirectPath);
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // Render the protected content
  console.log('User authenticated, rendering protected content');
  return <Outlet />;
};

export default ProtectedRoute;