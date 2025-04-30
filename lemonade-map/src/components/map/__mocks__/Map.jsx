import React from 'react';

// Mock Map component
const Map = ({ center, zoom, markers, onMarkerClick }) => {
  return (
    <div data-testid="map-container">
      <div data-testid="map-center">{JSON.stringify(center)}</div>
      <div data-testid="map-zoom">{zoom}</div>
      <div data-testid="map-markers">
        {markers && markers.map((marker, index) => (
          <div 
            key={index} 
            data-testid={`map-marker-${index}`}
            onClick={() => onMarkerClick && onMarkerClick(marker)}
          >
            {marker.popup && <div data-testid={`map-popup-${index}`}>{marker.popup}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;