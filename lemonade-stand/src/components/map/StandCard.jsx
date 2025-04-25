import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Badge } from '../ui';
import { formatDistance, getProximityDescription } from '../../services/geolocationService';

/**
 * StandCard component for displaying lemonade stand information
 */
const StandCard = ({
  stand,
  onViewProducts,
  onClose,
  className = '',
  ...props
}) => {
  if (!stand) return null;
  
  return (
    <Card
      className={`w-full ${className}`}
      variant="yellow"
      hover={false}
      {...props}
    >
      <Card.Header className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-display text-lemonade-yellow-dark truncate">{stand.name}</h3>
          <p className="text-xs md:text-sm text-gray-600 truncate">{stand.address}</p>
        </div>
        <div className="flex flex-col items-end gap-1 md:gap-2 ml-2">
          <Badge variant="yellow" className="text-xs md:text-sm">Open</Badge>
          {stand.distance !== null && stand.distance !== undefined && (
            <Badge variant="blue" className="text-xs md:text-sm">{getProximityDescription(stand.distance)}</Badge>
          )}
        </div>
      </Card.Header>
      
      <Card.Body>
        {stand.image_url && (
          <div className="relative w-full h-32 md:h-48 mb-4">
            <img 
              src={stand.image_url} 
              alt={stand.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
        
        <p className="text-sm md:text-base text-gray-700">{stand.description}</p>
        
        <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm text-gray-600">
          <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span>
            {stand.distance !== null && stand.distance !== undefined 
              ? formatDistance(stand.distance, 'miles')
              : 'Distance unknown'}
          </span>
        </div>
      </Card.Body>
      
      <Card.Footer className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <Button
          variant="outline"
          onClick={onClose}
          size="sm"
          className="w-full sm:w-auto text-sm"
        >
          Back to Map
        </Button>
        
        {onViewProducts && (
          <Button
            variant="primary"
            onClick={() => onViewProducts(stand)}
            size="sm"
            className="w-full sm:w-auto text-sm"
          >
            View Products
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
};

StandCard.propTypes = {
  stand: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    address: PropTypes.string,
    image_url: PropTypes.string,
    distance: PropTypes.number,
  }),
  onViewProducts: PropTypes.func,
  onClose: PropTypes.func,
  className: PropTypes.string,
};

export default StandCard;