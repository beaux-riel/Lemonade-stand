import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import PropTypes from "prop-types";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGeolocation } from "../../contexts/GeolocationContext";
import { isSecureContext } from "../../services/geolocationService";

// Detect iOS for specific fixes
L.Browser.safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
L.Browser.iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// Fix for default marker icons in react-leaflet
// This is needed because the default markers use relative paths that don't work in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom lemonade stand marker icon
const createLemonadeIcon = () => {
  // Get the base URL from the window location
  const baseUrl = window.location.origin;
  return new L.Icon({
    iconUrl: `${baseUrl}/images/markers/lemonade-marker.svg`,
    iconSize: [40, 48],
    iconAnchor: [20, 48],
    popupAnchor: [0, -48],
  });
};

// Custom user location marker icon
const createUserLocationIcon = () => {
  // Get the base URL from the window location
  const baseUrl = window.location.origin;
  return new L.Icon({
    iconUrl: `${baseUrl}/images/markers/user-location.svg`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Component to handle map view updates and iOS-specific fixes
const MapViewUpdater = ({ center, zoom }) => {
  const map = useMap();
  const previousCenterRef = useRef(center);
  const previousZoomRef = useRef(zoom);
  const initialRenderRef = useRef(true);

  useEffect(() => {
    // Only update the view if center or zoom has changed significantly
    // This prevents constant re-rendering when small GPS fluctuations occur
    const centerChanged = center && (!previousCenterRef.current || 
      Math.abs(previousCenterRef.current[0] - center[0]) > 0.0005 || 
      Math.abs(previousCenterRef.current[1] - center[1]) > 0.0005);
    
    const zoomChanged = zoom !== previousZoomRef.current;
    
    // Only update the view on initial render or when explicitly changed by user interaction
    // This prevents the map from resetting when location updates come in
    if ((initialRenderRef.current || (centerChanged && !map.isUserInteraction)) && center) {
      map.setView(center, zoom, { animate: true });
      previousCenterRef.current = center;
      previousZoomRef.current = zoom;
      initialRenderRef.current = false;
    } else if (zoomChanged) {
      // If only the zoom changed (not the center), update just the zoom
      map.setZoom(zoom, { animate: true });
      previousZoomRef.current = zoom;
    }
    
    // Apply iOS-specific fixes
    if (L.Browser.iOS) {
      // Fix for iOS Safari map rendering issues
      setTimeout(() => {
        map.invalidateSize();
      }, 100);
      
      // Fix for iOS momentum scrolling issues
      const container = map.getContainer();
      container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          e.stopPropagation();
        }
      }, { passive: false });
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
  const lastNotifiedPositionRef = useRef(null);
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
          color: "#4285F4",
          fillColor: "#4285F4",
          fillOpacity: 0.1,
          weight: 1,
        }).addTo(map);
      }
    }
  }, [location, map, showUserLocation]); // Use location instead of position to avoid circular dependency
  
  // Separate useEffect for notifying parent to prevent infinite loops
  useEffect(() => {
    if (position && onUserLocationFound && showUserLocation) {
      // Only notify parent ONCE when position is first set
      // This prevents continuous re-centering and re-zooming
      const latlng = { lat: position[0], lng: position[1] };
      
      // Only notify if this is the first time we're getting a location
      // or if the location has changed significantly (more than ~100 meters)
      if (!lastNotifiedPositionRef.current) {
        lastNotifiedPositionRef.current = latlng;
        onUserLocationFound(latlng);
      } else if (
        Math.abs(lastNotifiedPositionRef.current.lat - latlng.lat) > 0.001 || 
        Math.abs(lastNotifiedPositionRef.current.lng - latlng.lng) > 0.001
      ) {
        // Only update the reference, but don't call onUserLocationFound
        // This prevents the map from re-centering on location updates
        lastNotifiedPositionRef.current = latlng;
        // We intentionally don't call onUserLocationFound here
      }
    }
  }, [position, showUserLocation, onUserLocationFound]);
  
  // Use Leaflet's locate method as a fallback - only once at startup
  useEffect(() => {
    if (!showUserLocation) {
      if (locationCircleRef.current) {
        locationCircleRef.current.remove();
        locationCircleRef.current = null;
      }
      return;
    }

    // Check if we're in a secure context before trying to get location
    if (!isSecureContext()) {
      console.warn("Geolocation is not available in insecure contexts (non-HTTPS)");
      return;
    }

    // If we don't have a location from context, try to get it using Leaflet - only once
    if (!location && !position) {
      // Use a more efficient locate method for mobile - without watch mode
      map.locate({
        setView: true,
        maxZoom: 16,
        enableHighAccuracy: L.Browser.mobile, // Higher accuracy on mobile, especially for iOS
        timeout: 15000, // Longer timeout for iOS
        maximumAge: 300000, // Allow cached positions up to 5 minutes old
        watch: false, // Disable watch mode to prevent continuous updates
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
            color: "#4285F4",
            fillColor: "#4285F4",
            fillOpacity: 0.1,
            weight: 1,
          }).addTo(map);
        }

        // We've moved the notification to a separate useEffect to prevent infinite loops
      };

      const onLocationError = (e) => {
        console.error("Error getting location from Leaflet:", e.message);
        // Only try to get location using our geolocation service if we're in a secure context
        if (isSecureContext()) {
          getLocation();
        }
      };

      map.on("locationfound", onLocationFound);
      map.on("locationerror", onLocationError);

      return () => {
        map.off("locationfound", onLocationFound);
        map.off("locationerror", onLocationError);
      };
    }

    return () => {
      if (locationCircleRef.current) {
        locationCircleRef.current.remove();
        locationCircleRef.current = null;
      }
    };
  }, [map, showUserLocation, location, position, getLocation]);

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
          <h3 className="font-display text-lg text-lemonade-yellow-dark">
            {stand.name}
          </h3>
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
  center = [49.2827, 123.1207], // Default to Vancouver, BC
  zoom = 13,
  height = "500px",
  showUserLocation = true,
  onStandClick,
  onUserLocationFound,
  className = "",
  children,
  ...props
}) => {
  // Memoize the stands array to prevent unnecessary re-renders
  const memoizedStands = useMemo(() => stands, [stands]);

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-playful lemonade-map-container ${className}`}
      style={{ height }}
      {...props}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        // Add performance optimizations for mobile
        preferCanvas={true}
        attributionControl={false}
        minZoom={2}
        maxZoom={50}
        updateWhenZooming={false}
        updateWhenIdle={true}
        tap={true} // Enable tap for mobile
        dragging={!L.Browser.mobile ? true : true} // Ensure dragging works on mobile
        touchZoom={true} // Enable touch zoom for mobile
        doubleClickZoom={true}
        scrollWheelZoom={true}
        keyboard={true}
        bounceAtZoomLimits={false} // Prevent bounce effect at zoom limits on iOS
        // iOS-specific fixes
        tapTolerance={15} // Increase tap tolerance for iOS
        wheelDebounceTime={100} // Debounce wheel events
        whenCreated={(mapInstance) => {
          // Add a flag to track user interaction with the map
          mapInstance.isUserInteraction = false;
          
          // Add event listeners to detect user interaction
          mapInstance.on('dragstart', () => { mapInstance.isUserInteraction = true; });
          mapInstance.on('zoomstart', () => { mapInstance.isUserInteraction = true; });
          
          // Reset the flag after a delay when user interaction ends
          const resetInteractionFlag = () => {
            setTimeout(() => { mapInstance.isUserInteraction = false; }, 1000);
          };
          
          mapInstance.on('dragend', resetInteractionFlag);
          mapInstance.on('zoomend', resetInteractionFlag);
        }}
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
        
        {/* Render children components (like DraggableMarker) */}
        {children}
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
  children: PropTypes.node,
};

export default Map;
