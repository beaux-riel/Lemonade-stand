import React, { useRef, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

/**
 * Custom draggable marker component for the map
 * Allows users to drag and drop a marker to set a location
 */
const DraggableMarker = ({ 
  position, 
  onPositionChange, 
  popupContent, 
  icon,
  draggable = true
}) => {
  const markerRef = useRef(null);
  const map = useMap();
  const [markerPosition, setMarkerPosition] = useState(position);
  
  // Create a default icon if none is provided
  const defaultIcon = useMemo(() => {
    if (icon) return icon;
    
    // Create a custom draggable marker icon
    return new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }, [icon]);

  // Update marker position when the position prop changes
  useEffect(() => {
    if (position && position[0] && position[1]) {
      setMarkerPosition(position);
      
      // If this is the initial position (first render), center the map on it
      if (markerRef.current === null) {
        // This will run once when the marker is first created
        map.flyTo(position, map.getZoom(), {
          duration: 0.5
        });
      }
    }
  }, [position, map]);

  // Handle marker drag events
  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker) {
        const newPosition = marker.getLatLng();
        setMarkerPosition([newPosition.lat, newPosition.lng]);
        if (onPositionChange) {
          onPositionChange([newPosition.lat, newPosition.lng]);
        }
      }
    },
  };

  // We've moved the initial centering logic to the position update effect above

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={defaultIcon}
    >
      {popupContent && (
        <Popup>
          {popupContent}
        </Popup>
      )}
    </Marker>
  );
};

DraggableMarker.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  onPositionChange: PropTypes.func,
  popupContent: PropTypes.node,
  icon: PropTypes.instanceOf(L.Icon),
  draggable: PropTypes.bool
};

export default DraggableMarker;