import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGeolocation } from '../../contexts/GeolocationContext';

// Fix for default marker icons in react-leaflet
// This is needed because the default markers use relative paths that don't work in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: null,
  iconUrl: null,
  shadowUrl: null,
});

// Custom lemonade stand marker icon
const createLemonadeIcon = () => new L.Icon({
  iconUrl: '/images/markers/lemonade-marker.svg',
  iconSize: [40, 48],
  iconAnchor: [20, 48],
  popupAnchor: [0, -48],
});

// Custom user location marker icon
const createUserLocationIcon = () => new L.Icon({
  iconUrl: '/images/markers/user-location.svg',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

// Component to handle map view updates
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
};

MapViewUpdater.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
};

// Component to handle user location - memoized to prevent unnecessary re-renders
const UserLocationMarker = memo(({ showUserLocation, onUserLocationFound }) => {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const map = useMap();
  const locationCircleRef = useRef(null);
  const { location, getLocation } = useGeolocation();
  
  // Memoize the icon creation
  const icon = useMemo(() => createUserLocationIcon(), []);
  
  // Update position when location changes from context
  useEffect(() => {
    if (location && showUserLocation) {
      const latlng = { lat: location.lat, lng: location.lng };
      setPosition([latlng.lat, latlng.lng]);
      setAccuracy(location.accuracy || 0);
      
      // Create or update accuracy circle
      if (locationCircleRef.current) {
        locationCircleRef.current.setLatLng(latlng);
        locationCircleRef.current.setRadius(location.accuracy || 100);
      } else {
        locationCircleRef.current = L.circle(latlng, {
          radius: location.accuracy || 100,
          color: '#4285F4',
          fillColor: '#4285F4',
          fillOpacity: 0.1,
          weight: 1,
        }).addTo(map);
      }
    }
  }, [position, map, showUserLocation]); // Use position instead of location to avoid circular dependency
  
  // Separate useEffect for notifying parent to prevent infinite loops
  useEffect(() => {
    if (position && onUserLocationFound) { // Use position instead of location to avoid circular dependency
      const latlng = { lat: position[0], lng: position[1] };
      onUserLocationFound(latlng);
    }
  }, [position, showUserLocation, onUserLocationFound]);
  
  // Use Leaflet's locate method as a fallback - optimized to reduce unnecessary work
  useEffect(() => {
    if (!showUserLocation) {
      if (locationCircleRef.current) {
        locationCircleRef.current.remove();
        locationCircleRef.current = null;
      }
      return;
    }
    
    // If we don't have a location from context, try to get it using Leaflet
    if (!location) {
      // Use a more efficient locate method for mobile
      map.locate({ 
        setView: true, 
        maxZoom: 16,
        enableHighAccuracy: false, // Less battery usage on mobile
        timeout: 10000, // Timeout after 10 seconds
        maximumAge: 60000 // Allow cached positions up to 1 minute old
      });
      
      const onLocationFound = (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setAccuracy(e.accuracy);
        
        // Create or update accuracy circle
        if (locationCircleRef.current) {
          locationCircleRef.current.setLatLng(e.latlng);
          locationCircleRef.current.setRadius(e.accuracy);
        } else {
          locationCircleRef.current = L.circle(e.latlng, {
            radius: e.accuracy,
            color: '#4285F4',
            fillColor: '#4285F4',
            fillOpacity: 0.1,
            weight: 1,
          }).addTo(map);
        }
        
        // We've moved the notification to a separate useEffect to prevent infinite loops
      };
      
      const onLocationError = (e) => {
        console.error('Error getting location from Leaflet:', e.message);
        // Try to get location using our geolocation service
        getLocation();
      };
      
      map.on('locationfound', onLocationFound);
      map.on('locationerror', onLocationError);
      
      return () => {
        map.off('locationfound', onLocationFound);
        map.off('locationerror', onLocationError);
      };
    }
    
    return () => {
      if (locationCircleRef.current) {
        locationCircleRef.current.remove();
        locationCircleRef.current = null;
      }
    };
  }, [map, showUserLocation, onUserLocationFound, location, getLocation]);
  
  // Only render the marker if we have a position
  return position ? (
    <Marker position={position} icon={icon}>
      <Popup>
        <div>
          <h3 className="font-display text-base">Your Location</h3>
          <p className="text-sm">Accuracy: {Math.round(accuracy)} meters</p>
        </div>
      </Popup>
    </Marker>
  ) : null;
});

UserLocationMarker.propTypes = {
  showUserLocation: PropTypes.bool,
  onUserLocationFound: PropTypes.func,
};

// Memoized StandMarker component to prevent unnecessary re-renders
const StandMarker = memo(({ stand, onStandClick }) => {
  // Memoize the icon creation
  const icon = useMemo(() => createLemonadeIcon(), []);
  
  return (
    <Marker
      key={stand.id}
      position={[stand.location_lat, stand.location_lng]}
      icon={icon}
      eventHandlers={{
        click: () => {
          if (onStandClick) {
            onStandClick(stand);
          }
        },
      }}
    >
      <Popup>
        <div className="text-center">
          <h3 className="font-display text-lg text-lemonade-yellow-dark">{stand.name}</h3>
          {stand.image_url && (
            <img 
              src={stand.image_url} 
              alt={stand.name}
              className="w-32 h-32 object-cover mx-auto my-2 rounded-lg"
              loading="lazy" // Add lazy loading for images
            />
          )}
          <p className="text-sm">{stand.description}</p>
          <p className="text-xs mt-2 text-gray-600">{stand.address}</p>
          <button
            className="mt-2 px-3 py-1 bg-lemonade-yellow text-gray-800 rounded-full text-sm font-display hover:bg-lemonade-yellow-dark"
            onClick={(e) => {
              e.stopPropagation();
              if (onStandClick) {
                onStandClick(stand);
              }
            }}
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
});

StandMarker.propTypes = {
  stand: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    location_lat: PropTypes.number.isRequired,
    location_lng: PropTypes.number.isRequired,
    address: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  onStandClick: PropTypes.func,
};

/**
 * Map component for displaying lemonade stands
 */
const Map = ({
  stands = [],
  center = [40.7128, -74.0060], // Default to New York City
  zoom = 13,
  height = '500px',
  showUserLocation = true,
  onStandClick,
  onUserLocationFound,
  className = '',
  ...props
}) => {
  // Memoize the stands array to prevent unnecessary re-renders
  const memoizedStands = useMemo(() => stands, [stands]);
  
  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-playful ${className}`}
      style={{ height }}
      {...props}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        // Add performance optimizations for mobile
        preferCanvas={true}
        attributionControl={false}
        minZoom={5}
        maxZoom={18}
        updateWhenZooming={false}
        updateWhenIdle={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <ZoomControl position="bottomright" />
        
        {/* Update map view when center or zoom changes */}
        <MapViewUpdater center={center} zoom={zoom} />
        
        {/* Show user location if enabled */}
        <UserLocationMarker 
          showUserLocation={showUserLocation} 
          onUserLocationFound={onUserLocationFound}
        />
        
        {/* Render lemonade stand markers */}
        {memoizedStands.map((stand) => (
          <StandMarker 
            key={stand.id} 
            stand={stand} 
            onStandClick={onStandClick} 
          />
        ))}
      </MapContainer>
    </div>
  );
};

Map.propTypes = {
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
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  height: PropTypes.string,
  showUserLocation: PropTypes.bool,
  onStandClick: PropTypes.func,
  onUserLocationFound: PropTypes.func,
  className: PropTypes.string,
};

export default Map;