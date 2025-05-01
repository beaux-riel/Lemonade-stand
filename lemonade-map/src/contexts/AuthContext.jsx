import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, getSession } from '../api/supabaseApi';
import supabase from '../supabaseClient';
import logger from '../utils/logger';

// Create the context
export const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        logger.info('Initializing authentication');
        setInitializing(true);
        
        // Get current session
        const { data: sessionData, error: sessionError } = await getSession();
        
        if (sessionError) {
          throw new Error(`Session error: ${sessionError.message}`);
        }
        
        logger.authEvent('session_check', { 
          hasSession: !!sessionData?.session,
          sessionExpiry: sessionData?.session?.expires_at
        });
        
        setSession(sessionData?.session || null);
        
        // Get user data if session exists
        if (sessionData?.session) {
          const { data: userData, error: userError } = await getCurrentUser();
          
          if (userError) {
            throw new Error(`User data error: ${userError.message}`);
          }
          
          logger.authEvent('user_loaded', { 
            userId: userData?.user?.id,
            email: userData?.user?.email
          });
          
          setUser(userData?.user || null);
        } else {
          logger.authEvent('no_session');
        }
      } catch (err) {
        logger.error('Error initializing auth', err, { source: 'AuthContext.initAuth' });
        setError(err.message);
      } finally {
        setLoading(false);
        setInitializing(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        logger.authEvent(event, { sessionExists: !!session });
        setSession(session);
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          try {
            const { data, error: userError } = await getCurrentUser();
            
            if (userError) {
              throw new Error(`Failed to get user data: ${userError.message}`);
            }
            
            logger.authEvent('user_updated', { 
              userId: data?.user?.id,
              email: data?.user?.email
            });
            
            setUser(data?.user || null);
          } catch (err) {
            logger.error('Error updating user data', err, { event });
            setError(err.message);
          }
        } else if (event === 'SIGNED_OUT') {
          logger.authEvent('signed_out');
          setUser(null);
        }
      }
    );

    // Clean up subscription
    return () => {
      if (authListener && authListener.subscription) {
        logger.info('Cleaning up auth subscription');
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Context value
  const value = {
    user,
    session,
    loading,
    error,
    initializing,
    setError,
    isAuthenticated: !!user,
    clearError: () => setError(null)
  };

  // Render children immediately instead of showing a full-screen loader
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// No default export to ensure compatibility with Fast Refresh