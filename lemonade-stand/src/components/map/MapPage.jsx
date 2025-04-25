import React, { useState, useEffect } from 'react';
import Map from './Map';
import { Card, Button, Alert, Loader } from '../ui';

// Sample data for lemonade stands
const SAMPLE_STANDS = [
  {
    id: '1',
    name: 'Sunny Lemonade',
    description: 'The best lemonade in town!',
    location_lat: 40.7128,
    location_lng: -74.0060,
    address: '123 Main St, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'Citrus Delight',
    description: 'Organic lemonade made fresh daily',
    location_lat: 40.7112,
    location_lng: -74.0055,
    address: '456 Park Ave, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Lemon Paradise',
    description: 'Refreshing lemonade with a twist',
    location_lat: 40.7135,
    location_lng: -74.0046,
    address: '789 Broadway, New York, NY',
    image_url: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];

const MapPage = () => {
  const [stands, setStands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStand, setSelectedStand] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]);
  const [mapZoom, setMapZoom] = useState(13);
  
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
  
  // Handle stand click
  const handleStandClick = (stand) => {
    setSelectedStand(stand);
    setMapCenter([stand.location_lat, stand.location_lng]);
    setMapZoom(16);
  };
  
  // Handle user location found
  const handleUserLocationFound = (latlng) => {
    console.log('User location found:', latlng);
    // You could find nearby stands here
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
        
        {/* Stand details or list */}
        <div>
          {selectedStand ? (
            <Card variant="yellow" className="sticky top-4">
              <Card.Header>
                <h2 className="text-xl font-display">{selectedStand.name}</h2>
              </Card.Header>
              
              {selectedStand.image_url && (
                <img 
                  src={selectedStand.image_url} 
                  alt={selectedStand.name}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <Card.Body>
                <p className="mb-2">{selectedStand.description}</p>
                
                <div className="text-sm text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {selectedStand.address}
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => {
                      // This would open a details page in a real app
                      alert(`View details for ${selectedStand.name}`);
                    }}
                  >
                    View Menu
                  </Button>
                  
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => {
                      // Open directions in Google Maps
                      const url = `https://www.google.com/maps/dir/?api=1&destination=${selectedStand.location_lat},${selectedStand.location_lng}`;
                      window.open(url, '_blank');
                    }}
                  >
                    Get Directions
                  </Button>
                </div>
              </Card.Body>
              
              <Card.Footer>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setSelectedStand(null)}
                >
                  Back to List
                </Button>
              </Card.Footer>
            </Card>
          ) : (
            <Card>
              <Card.Header>
                <h2 className="text-xl font-display">Lemonade Stands</h2>
              </Card.Header>
              
              <Card.Body>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <Loader variant="yellow" />
                  </div>
                ) : stands.length > 0 ? (
                  <div className="space-y-4">
                    {stands.map(stand => (
                      <div 
                        key={stand.id} 
                        className="p-3 bg-lemonade-yellow-light rounded-lg cursor-pointer hover:bg-lemonade-yellow-dark transition-colors"
                        onClick={() => handleStandClick(stand)}
                      >
                        <h3 className="font-display text-lg">{stand.name}</h3>
                        <p className="text-sm text-gray-700 line-clamp-2">{stand.description}</p>
                        <p className="text-xs text-gray-600 mt-1">{stand.address}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No lemonade stands found in this area.</p>
                )}
              </Card.Body>
              
              <Card.Footer>
                <p className="text-sm text-gray-600">
                  Click on a stand to view details or see its location on the map.
                </p>
              </Card.Footer>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPage;