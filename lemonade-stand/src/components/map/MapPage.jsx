import React, { useState, useEffect } from 'react';
import Map from './Map';
import StandListSidebar from './StandListSidebar';
import { Alert, Loader } from '../ui';
import { sortStandsByDistance } from '../../utils/distance';
import { getStands, subscribeToStands, unsubscribe } from '../../api/supabaseApi';

const MapPage = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStand, setSelectedStand] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState(null);
  
  // Fetch stands from Supabase
  useEffect(() => {
    const fetchStands = async () => {
      try {
        setLoading(true);
        const { data, error } = await getStands();
        
        if (error) {
          throw new Error(error.message);
        }
        
        setStands(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stands:', err);
        setError('Failed to load lemonade stands. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchStands();
    
    // Set up real-time subscription for new stands
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
        
        // If the updated stand is the selected one, update the selection
        if (selectedStand && selectedStand.id === payload.new.id) {
          setSelectedStand(payload.new);
        }
      } else if (payload.eventType === 'DELETE') {
        setStands(prevStands => 
          prevStands.filter(stand => stand.id !== payload.old.id)
        );
        
        // If the deleted stand is the selected one, clear the selection
        if (selectedStand && selectedStand.id === payload.old.id) {
          setSelectedStand(null);
        }
      }
    });
    
    // Clean up subscription on unmount
    return () => {
      unsubscribe(subscription);
    };
  }, [selectedStand]);
  
  // Sort stands by distance when user location changes
  useEffect(() => {
    if (userLocation && stands.length > 0) {
      const sortedStands = sortStandsByDistance(
        [...stands], // Create a copy to avoid modifying the original array
        userLocation.lat,
        userLocation.lng,
        'miles'
      );
      setStands(sortedStands);
    }
  }, [userLocation]);
  
  // Handle stand click
  const handleStandClick = (stand) => {
    setSelectedStand(stand);
    setMapCenter([stand.location_lat, stand.location_lng]);
    setMapZoom(16);
  };
  
  // Handle closing stand details
  const handleCloseStand = () => {
    setSelectedStand(null);
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    } else {
      setMapCenter([40.7128, -74.0060]); // Default to NYC
    }
    setMapZoom(13);
  };
  
  // Handle user location found
  const handleUserLocationFound = (latlng) => {
    if (latlng && latlng.lat && latlng.lng) {
      setUserLocation({
        lat: latlng.lat,
        lng: latlng.lng
      });
      
      // Center map on user location
      setMapCenter([latlng.lat, latlng.lng]);
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-4">Find Lemonade Stands</h1>
      
      {error && (
        <Alert variant="error" className="mb-4" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Map
            stands={stands}
            center={mapCenter}
            zoom={mapZoom}
            height="600px"
            showUserLocation={true}
            onStandClick={handleStandClick}
            onUserLocationFound={handleUserLocationFound}
            className={loading ? 'opacity-60' : ''}
          />
          
          {loading && (
            <div className="flex justify-center mt-4">
              <Loader size="lg" variant="yellow" showLabel label="Loading lemonade stands..." />
            </div>
          )}
        </div>
        
        {/* Stand list sidebar */}
        <div className="h-[600px]">
          <StandListSidebar
            stands={stands}
            loading={loading}
            selectedStand={selectedStand}
            onStandSelect={handleStandClick}
            onStandClose={handleCloseStand}
            userLocation={userLocation}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default MapPage;