import React, { useState, useEffect } from 'react';
import { MapView } from './map';
import { Alert } from './ui';

// Sample data for lemonade stands
const SAMPLE_STANDS = [
  {
    id: '1',
    name: 'Sunny Lemonade',
    description: 'The best lemonade in town! Made with fresh lemons and organic sugar.',
    location_lat: 40.7128,
    location_lng: -74.0060,
    address: '123 Main St, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Citrus Delight',
    description: 'Organic lemonade made fresh daily with a hint of mint.',
    location_lat: 40.7112,
    location_lng: -74.0055,
    address: '456 Park Ave, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '3',
    name: 'Lemon Zest',
    description: 'Refreshing lemonade with a zesty twist!',
    location_lat: 40.7135,
    location_lng: -74.0046,
    address: '789 Broadway, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Berry Lemonade',
    description: 'Classic lemonade infused with fresh berries.',
    location_lat: 40.7120,
    location_lng: -74.0080,
    address: '321 Berry St, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Lemonade Express',
    description: 'Quick and refreshing lemonade on the go!',
    location_lat: 40.7150,
    location_lng: -74.0070,
    address: '555 Express Ave, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
];

const MapShowcase = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Simulate loading stands from an API
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      try {
        // In a real app, this would be an API call
        setStands(SAMPLE_STANDS);
        setLoading(false);
      } catch (err) {
        setError('Failed to load lemonade stands. Please try again.');
        setLoading(false);
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [refreshKey]);
  
  // Handle refreshing stands
  const handleRefreshStands = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };
  
  // Handle viewing products
  const handleViewProducts = (stand) => {
    alert(`Viewing products for ${stand.name}`);
    // In a real app, this would navigate to a products page or open a modal
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">Find Lemonade Stands</h1>
      <p className="text-gray-600 mb-6">Discover refreshing lemonade stands near you</p>
      
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
      
      <MapView
        stands={stands}
        loading={loading}
        onRefreshStands={handleRefreshStands}
        onViewProducts={handleViewProducts}
      />
    </div>
  );
};

export default MapShowcase;