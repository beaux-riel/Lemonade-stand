import React, { createContext, useState, useEffect, useContext } from 'react';
import { useGeolocation } from './GeolocationContext';
import { useStands } from './StandContext';
import { findNearbyStands } from '../services/geolocationService';

// Create the context
export const NearbyStandsContext = createContext(null);

// Provider component
export const NearbyStandsProvider = ({ children }) => {
  const { location } = useGeolocation();
  const { stands, loading: standsLoading } = useStands();
  const [nearbyStands, setNearbyStands] = useState([]);
  const [maxDistance, setMaxDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update nearby stands when location, stands, or maxDistance changes
  useEffect(() => {
    if (standsLoading) {
      setLoading(true);
      return;
    }

    if (!location) {
      setNearbyStands([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const nearby = findNearbyStands(stands, location, maxDistance);
      setNearbyStands(nearby);
      setError(null);
    } catch (err) {
      console.error('Error finding nearby stands:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, stands, maxDistance, standsLoading]);

  // Set the maximum distance for nearby stands
  const setMaxDistanceFilter = (distance) => {
    setMaxDistance(distance === '' ? null : parseFloat(distance));
  };

  // Context value
  const value = {
    nearbyStands,
    maxDistance,
    loading,
    error,
    setMaxDistanceFilter,
    hasLocation: !!location,
  };

  return <NearbyStandsContext.Provider value={value}>{children}</NearbyStandsContext.Provider>;
};

// Custom hook to use the nearby stands context
export const useNearbyStands = () => {
  const context = useContext(NearbyStandsContext);
  if (context === null) {
    throw new Error('useNearbyStands must be used within a NearbyStandsProvider');
  }
  return context;
};

// No default export to ensure compatibility with Fast Refresh