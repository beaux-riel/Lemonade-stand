import React, { useState, useEffect } from 'react';
import Map from './Map';
import StandListSidebar from './StandListSidebar';
import NearbyStandsList from './NearbyStandsList';
import { Alert, Loader, Button } from '../ui';
import { ResponsiveMapLayout } from '../layout';
import { useGeolocation } from '../../contexts/GeolocationContext';
import { useStands } from '../../contexts/StandContext';
import { useNearbyStands } from '../../contexts/NearbyStandsContext';

const MapPage = () => {
  const { stands, loading, error: standsError } = useStands();
  const { location, getLocation, error: locationError } = useGeolocation();
  const { nearbyStands } = useNearbyStands();
  
  const [selectedStand, setSelectedStand] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to NYC
  const [mapZoom, setMapZoom] = useState(13);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'nearby'
  const [error, setError] = useState(null);
  
  // Set error from context errors
  useEffect(() => {
    if (standsError) {
      setError(standsError);
    } else if (locationError && activeTab === 'nearby') {
      setError(locationError);
    } else {
      setError(null);
    }
  }, [standsError, locationError, activeTab]);
  
  // Handle stand click
  const handleStandClick = (stand) => {
    setSelectedStand(stand);
    setMapCenter([stand.location_lat, stand.location_lng]);
    setMapZoom(16);
  };
  
  // Handle closing stand details
  const handleCloseStand = () => {
    setSelectedStand(null);
    if (location) {
      setMapCenter([location.lat, location.lng]);
    } else {
      setMapCenter([40.7128, -74.0060]); // Default to NYC
    }
    setMapZoom(13);
  };
  
  // Handle user location found
  const handleUserLocationFound = (latlng) => {
    if (latlng && latlng.lat && latlng.lng) {
      // Center map on user location
      setMapCenter([latlng.lat, latlng.lng]);
    }
  };
  
  // Get the stands to display based on active tab
  const getDisplayedStands = () => {
    if (activeTab === 'nearby') {
      return nearbyStands;
    }
    return stands;
  };
  
  // Map component
  const mapComponent = (
    <>
      <Map
        stands={getDisplayedStands()}
        center={mapCenter}
        zoom={mapZoom}
        height="calc(100vh - 200px)"
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
    </>
  );
  
  // Sidebar component with tabs
  const sidebarComponent = (
    <div className="h-[calc(100vh-200px)] flex flex-col">
      {/* Tab navigation */}
      <div className="flex mb-4">
        <Button
          variant={activeTab === 'all' ? 'primary' : 'outline'}
          className="flex-1 rounded-r-none"
          onClick={() => setActiveTab('all')}
        >
          All Stands
        </Button>
        <Button
          variant={activeTab === 'nearby' ? 'primary' : 'outline'}
          className="flex-1 rounded-l-none"
          onClick={() => {
            setActiveTab('nearby');
            if (!location) {
              getLocation();
            }
          }}
        >
          Near You
        </Button>
      </div>
      
      {/* Tab content */}
      <div className="flex-grow">
        {activeTab === 'all' ? (
          <StandListSidebar
            stands={stands}
            loading={loading}
            selectedStand={selectedStand}
            onStandSelect={handleStandClick}
            onStandClose={handleCloseStand}
            userLocation={location}
            className="h-full"
          />
        ) : (
          <NearbyStandsList
            onStandSelect={handleStandClick}
            className="h-full"
          />
        )}
      </div>
    </div>
  );
  
  return (
    <div className="w-full">
      <h1 className="text-2xl md:text-3xl font-display text-lemonade-blue-dark mb-4">Find Lemonade Stands</h1>
      
      {error && (
        <Alert variant="error" className="mb-4" dismissible onDismiss={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      <ResponsiveMapLayout
        mapComponent={mapComponent}
        sidebarComponent={sidebarComponent}
      />
    </div>
  );
};

export default MapPage;