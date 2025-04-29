import React, { createContext, useState, useEffect, useContext } from 'react';
import { getStands, subscribeToStands, unsubscribe } from '../api/supabaseApi';

// Create the context
export const StandContext = createContext(null);

// Provider component
export const StandProvider = ({ children }) => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStand, setSelectedStand] = useState(null);

  // Fetch stands on mount
  useEffect(() => {
    const fetchStands = async () => {
      try {
        setLoading(true);
        const { data, error } = await getStands();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setStands(data || []);
      } catch (err) {
        console.error('Error fetching stands:', err);
        setError('Failed to load lemonade stands. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStands();
    
    // Set up real-time subscription for stands
    const subscription = subscribeToStands((payload) => {
      console.log('Real-time stand update:', payload);
      
      if (payload.eventType === 'INSERT') {
        setStands(prevStands => [...prevStands, payload.new]);
      } else if (payload.eventType === 'UPDATE') {
        setStands(prevStands => 
          prevStands.map(stand => 
            stand.id === payload.new.id ? payload.new : stand
          )
        );
      } else if (payload.eventType === 'DELETE') {
        setStands(prevStands => 
          prevStands.filter(stand => stand.id !== payload.old.id)
        );
      }
    });
    
    // Clean up subscription on unmount
    return () => {
      unsubscribe(subscription);
    };
  }, []); // No dependencies to avoid unnecessary refetching
  
  // Handle selected stand updates separately
  useEffect(() => {
    const handleRealtimeUpdates = (payload) => {
      if (!selectedStand) return;
      
      if (payload.eventType === 'UPDATE' && selectedStand.id === payload.new.id) {
        setSelectedStand(payload.new);
      } else if (payload.eventType === 'DELETE' && selectedStand.id === payload.old.id) {
        setSelectedStand(null);
      }
    };
    
    const subscription = subscribeToStands(handleRealtimeUpdates);
    
    return () => {
      unsubscribe(subscription);
    };
  }, [selectedStand]);

  // Context value
  const value = {
    stands,
    loading,
    error,
    selectedStand,
    setSelectedStand,
    setError,
  };

  return <StandContext.Provider value={value}>{children}</StandContext.Provider>;
};

// Custom hook to use the stand context
export const useStands = () => {
  const context = useContext(StandContext);
  if (context === null) {
    throw new Error('useStands must be used within a StandProvider');
  }
  return context;
};

// No default export to ensure compatibility with Fast Refresh