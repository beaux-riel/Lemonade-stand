import React from 'react';
import PropTypes from 'prop-types';
import { Card, Loader, Button } from '../ui';
import { useNearbyStands } from '../../contexts/NearbyStandsContext';
import { useGeolocation } from '../../contexts/GeolocationContext';
import { formatDistance, getProximityDescription } from '../../services/geolocationService';

/**
 * NearbyStandsList component for displaying stands near the user
 */
const NearbyStandsList = ({
  onStandSelect,
  className = '',
  ...props
}) => {
  const { nearbyStands, loading, hasLocation, maxDistance, setMaxDistanceFilter } = useNearbyStands();
  const { getLocation, loading: locationLoading, error: locationError } = useGeolocation();

  // Distance options for the filter
  const distanceOptions = [
    { value: '', label: 'Any distance' },
    { value: '1', label: '1 mile' },
    { value: '5', label: '5 miles' },
    { value: '10', label: '10 miles' },
    { value: '25', label: '25 miles' }
  ];

  // Handle distance filter change
  const handleDistanceChange = (e) => {
    setMaxDistanceFilter(e.target.value);
  };

  return (
    <Card className={`h-full flex flex-col ${className}`} {...props}>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-display text-lemonade-blue-dark">Stands Near You</h2>
          
          <select
            className="text-sm border border-gray-300 rounded-md px-2 py-1"
            value={maxDistance || ''}
            onChange={handleDistanceChange}
            disabled={!hasLocation}
          >
            {distanceOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card.Header>

      <Card.Body className="flex-grow overflow-auto">
        {loading || locationLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader variant="yellow" size="md" />
          </div>
        ) : !hasLocation ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-gray-600 mb-4">
              {locationError 
                ? 'Location access was denied. Please enable location services to see stands near you.'
                : 'Enable location services to see stands near you.'}
            </p>
            <Button 
              variant="primary" 
              onClick={getLocation}
              disabled={locationLoading}
            >
              {locationLoading ? 'Getting Location...' : 'Enable Location'}
            </Button>
          </div>
        ) : nearbyStands.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-600">
              {maxDistance 
                ? `No stands found within ${maxDistance} miles of your location.` 
                : 'No stands found near your location.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4 p-2">
            {nearbyStands.map(stand => (
              <div 
                key={stand.id}
                className="p-4 bg-lemonade-yellow-light rounded-lg cursor-pointer hover:bg-lemonade-yellow-dark transition-colors"
                onClick={() => onStandSelect(stand)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-display text-lg">{stand.name}</h3>
                  {stand.distance !== null && (
                    <span className="text-xs bg-white px-2 py-1 rounded-full">
                      {stand.distance.toFixed(1)} miles
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-700 line-clamp-2">{stand.description}</p>
                
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-600">{stand.address}</p>
                  <span className="text-xs font-medium text-lemonade-blue-dark">
                    {getProximityDescription(stand.distance)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card.Body>

      <Card.Footer>
        <p className="text-sm text-gray-600">
          {hasLocation && (
            nearbyStands.length > 0 
              ? `${nearbyStands.length} ${nearbyStands.length === 1 ? 'stand' : 'stands'} found${maxDistance ? ` within ${maxDistance} miles` : ''}`
              : 'No stands found'
          )}
        </p>
      </Card.Footer>
    </Card>
  );
};

NearbyStandsList.propTypes = {
  onStandSelect: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default NearbyStandsList;