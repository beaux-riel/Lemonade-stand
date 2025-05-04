import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Map from './Map';
import MapControls from './MapControls';
import StandCard from './StandCard';
import { Card, Loader } from '../ui';
import './Map.css'; // Ensure CSS is imported

/**
 * MapView component that combines Map, MapControls, and StandCard
 */
const MapView = ({
  stands = [],
  loading = false,
  onRefreshStands,
  onViewProducts,
  className = '',
  ...props
}) => {
  const [showUserLocation, setShowUserLocation] = useState(true);
  const [selectedStand, setSelectedStand] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);
  const [userPosition, setUserPosition] = useState(null);
  
  // Get user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      // Check if running on iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
      const options = {
        enableHighAccuracy: isIOS, // Higher accuracy on iOS
        timeout: isIOS ? 15000 : 10000, // Longer timeout for iOS
        maximumAge: 30000
      };
      
      // Use a ref to track if we've already set the initial position
      // to prevent multiple updates
      const hasSetInitialPosition = React.useRef(false);
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          
          // Only set the map center once on initial load
          // and only if no stands are selected
          if (!selectedStand && !hasSetInitialPosition.current) {
            hasSetInitialPosition.current = true;
            setMapCenter([latitude, longitude]);
          }
        },
        (error) => {
          console.error('Error getting user location:', error);
          // Default to a central location if geolocation fails
          if (!mapCenter && stands.length > 0) {
            // Use the first stand's location as default
            setMapCenter([stands[0].location_lat, stands[0].location_lng]);
          } else if (!mapCenter) {
            // Default to New York City if no stands
            setMapCenter([40.7128, -74.0060]);
          }
        },
        options
      );
    }
  }, []);
  
  // Handle toggling user location
  const handleToggleUserLocation = () => {
    setShowUserLocation(!showUserLocation);
  };
  
  // Handle centering on user location
  const handleCenterUserLocation = () => {
    if (userPosition) {
      setMapCenter(userPosition);
      setMapZoom(16);
    }
  };
  
  // Handle stand click
  const handleStandClick = (stand) => {
    setSelectedStand(stand);
    setMapCenter([stand.location_lat, stand.location_lng]);
    setMapZoom(16);
  };
  
  // Handle closing stand card
  const handleCloseStandCard = () => {
    setSelectedStand(null);
  };
  
  // Calculate default map center if not set
  const defaultCenter = mapCenter || 
    (stands.length > 0 ? [stands[0].location_lat, stands[0].location_lng] : [40.7128, -74.0060]);
  
  return (
    <div className={`${className}`} {...props}>
      <div className="mb-4">
        <MapControls
          showUserLocation={showUserLocation}
          onToggleUserLocation={handleToggleUserLocation}
          onCenterUserLocation={handleCenterUserLocation}
          onRefreshStands={onRefreshStands}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          {loading ? (
            <Card className="flex items-center justify-center" style={{ height: '500px' }}>
              <Loader size="lg" variant="yellow" showLabel label="Loading map..." />
            </Card>
          ) : (
            <Map
              stands={stands}
              center={defaultCenter}
              zoom={mapZoom}
              height="500px"
              showUserLocation={showUserLocation}
              onStandClick={handleStandClick}
            />
          )}
        </div>
        
        <div>
          {selectedStand ? (
            <StandCard
              stand={selectedStand}
              onViewProducts={onViewProducts}
              onClose={handleCloseStandCard}
            />
          ) : (
            <Card>
              <Card.Header>
                <h3 className="text-xl font-display">Lemonade Stands</h3>
              </Card.Header>
              <Card.Body>
                <p>
                  {stands.length > 0
                    ? `Found ${stands.length} lemonade stands near you. Click on a marker to see details.`
                    : 'No lemonade stands found. Try refreshing or changing your location.'}
                </p>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

MapView.propTypes = {
  stands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      location_lat: PropTypes.number.isRequired,
      location_lng: PropTypes.number.isRequired,
      address: PropTypes.string,
      image_url: PropTypes.string,
    })
  ),
  loading: PropTypes.bool,
  onRefreshStands: PropTypes.func,
  onViewProducts: PropTypes.func,
  className: PropTypes.string,
};

export default MapView;