import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  getCurrentLocation, 
  watchLocation, 
  clearLocationWatch,
  getAddressFromLocation
} from '../services/geolocationService';

// Create the context
export const GeolocationContext = createContext(null);

// Provider component
export const GeolocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('unknown'); // 'unknown', 'granted', 'denied', 'prompt'

  // Initialize location on mount
  useEffect(() => {
    // Check for geolocation permission
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' })
        .then(result => {
          setPermissionStatus(result.state);
          
          // Listen for permission changes
          result.onchange = () => {
            setPermissionStatus(result.state);
          };
          
          // If permission is granted, get location
          if (result.state === 'granted') {
            getLocation();
          }
        })
        .catch(err => {
          console.error('Error checking geolocation permission:', err);
        });
    } else {
      // Fallback for browsers that don't support permissions API
      getLocation();
    }
    
    // Clean up watch on unmount
    return () => {
      if (watchId) {
        clearLocationWatch(watchId);
      }
    };
  }, []);
  
  // Update address when location changes
  useEffect(() => {
    if (location) {
      updateAddress();
    }
  }, [location]);
  
  // Get the user's current location
  const getLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
    } catch (err) {
      console.error('Error getting location:', err);
      setError(err.message);
      
      // Update permission status if denied
      if (err.message === 'Location permission denied') {
        setPermissionStatus('denied');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Start watching the user's location
  const startWatchingLocation = () => {
    if (watchId) {
      clearLocationWatch(watchId);
    }
    
    try {
      const id = watchLocation((newLocation) => {
        setLocation(newLocation);
      });
      setWatchId(id);
    } catch (err) {
      console.error('Error watching location:', err);
      setError(err.message);
    }
  };
  
  // Stop watching the user's location
  const stopWatchingLocation = () => {
    if (watchId) {
      clearLocationWatch(watchId);
      setWatchId(null);
    }
  };
  
  // Update the address based on the current location
  const updateAddress = async () => {
    if (!location) return;
    
    try {
      const addressResult = await getAddressFromLocation(location);
      setAddress(addressResult);
    } catch (err) {
      console.error('Error getting address:', err);
      // Don't set error state here to avoid overriding location errors
    }
  };
  
  // Context value
  const value = {
    location,
    address,
    loading,
    error,
    permissionStatus,
    watchId: watchId !== null,
    getLocation,
    startWatchingLocation,
    stopWatchingLocation,
  };
  
  return <GeolocationContext.Provider value={value}>{children}</GeolocationContext.Provider>;
};

// Custom hook to use the geolocation context
export const useGeolocation = () => {
  const context = useContext(GeolocationContext);
  if (context === null) {
    throw new Error('useGeolocation must be used within a GeolocationProvider');
  }
  return context;
};

// No default export to ensure compatibility with Fast Refresh