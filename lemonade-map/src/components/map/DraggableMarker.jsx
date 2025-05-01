import React, { useRef, useEffect, useState } from 'react';
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

  // Update marker position when the position prop changes
  useEffect(() => {
    if (position && position[0] && position[1]) {
      setMarkerPosition(position);
    }
  }, [position]);

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

  // Center map on marker when it's created
  useEffect(() => {
    if (markerPosition && markerPosition[0] && markerPosition[1]) {
      map.setView(markerPosition, map.getZoom());
    }
  }, []);

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={markerPosition}
      ref={markerRef}
      icon={icon}
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