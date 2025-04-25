import React, { useState, useEffect } from 'react';
import Map from './Map';
import StandListSidebar from './StandListSidebar';
import { Alert, Loader } from '../ui';
import { sortStandsByDistance } from '../../utils/distance';

// Sample data for lemonade stands
const SAMPLE_STANDS = [
  {
    id: '1',
    name: 'Sunny Lemonade',
    description: 'The best lemonade in town! Made with fresh lemons and organic sugar.',
    location_lat: 40.7128,
    location_lng: -74.0060,
    address: '123 Main St, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Citrus Delight',
    description: 'Organic lemonade made fresh daily with a hint of mint.',
    location_lat: 40.7112,
    location_lng: -74.0055,
    address: '456 Park Ave, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Lemon Paradise',
    description: 'Refreshing lemonade with a twist! Try our signature flavors.',
    location_lat: 40.7135,
    location_lng: -74.0046,
    address: '789 Broadway, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'Berry Lemonade',
    description: 'Classic lemonade infused with fresh berries.',
    location_lat: 40.7120,
    location_lng: -74.0080,
    address: '321 Berry St, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    name: 'Lemonade Express',
    description: 'Quick and refreshing lemonade on the go!',
    location_lat: 40.7150,
    location_lng: -74.0070,
    address: '555 Express Ave, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const MapPage = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStand, setSelectedStand] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [mapZoom, setMapZoom] = useState(13);
  const [userLocation, setUserLocation] = useState(null);
  
  // Simulate loading data from an API
  useEffect(() => {
    const fetchStands = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Set sample data
        setStands(SAMPLE_STANDS);
        setLoading(false);
      } catch (err) {
        setError('Failed to load lemonade stands. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchStands();
  }, []);
  
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
  }, [userLocation, stands.length, stands]);
  
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
        <Alert variant="error" className="mb-4">
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