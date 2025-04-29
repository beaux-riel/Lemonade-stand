import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Map from './Map';
import { Alert, Loader, Button } from '../ui';
import { ResponsiveMapLayout } from '../layout';
import { useGeolocation } from '../../contexts/GeolocationContext';
import { useStands } from '../../contexts/StandContext';
import { useNearbyStands } from '../../contexts/NearbyStandsContext';

// Lazy load components that aren't needed immediately
const StandListSidebar = lazy(() => import('./StandListSidebar'));
const NearbyStandsList = lazy(() => import('./NearbyStandsList'));

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
    if (latlng && latlng.lat && latlng.lng && 
        (mapCenter[0] !== latlng.lat || mapCenter[1] !== latlng.lng)) { // Only update if position has changed
      // Center map on user location
      setMapCenter([latlng.lat, latlng.lng]);
    }
  };
  
  // Memoize the displayed stands to prevent unnecessary re-renders
  const displayedStands = useMemo(() => {
    if (activeTab === 'nearby') {
      return nearbyStands;
    }
    return stands;
  }, [activeTab, nearbyStands, stands]);
  
  // Map component
  const mapComponent = (
    <>
      <Map
        stands={displayedStands}
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
  
  // Sidebar loading fallback
  const SidebarLoadingFallback = () => (
    <div className="flex items-center justify-center h-full">
      <Loader size="md" variant="yellow" showLabel label="Loading..." />
    </div>
  );

  // Memoize the stands data to prevent unnecessary re-renders
  const memoizedStands = useMemo(() => stands, [stands]);
  
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
      
      {/* Tab content with Suspense for lazy loading */}
      <div className="flex-grow">
        <Suspense fallback={<SidebarLoadingFallback />}>
          {activeTab === 'all' ? (
            <StandListSidebar
              stands={memoizedStands}
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
        </Suspense>
      </div>
    </div>
  );
  
  return (
    <div className="w-full">

        <div>
          <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
            Discover Lemonade Stands Near You
          </h1>
          <p className="text-gray-600 mb-4">
            Browse the map to discover refreshing lemonade stands in your area
          </p>
        </div>
      
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