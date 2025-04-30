import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui';

/**
 * MapControls component for controlling map features
 */
const MapControls = ({
  showUserLocation,
  onToggleUserLocation,
  onCenterUserLocation,
  onRefreshStands,
  className = '',
  ...props
}) => {
  return (
    <div 
      className={`flex flex-wrap gap-2 ${className}`}
      {...props}
    >
      <Button
        size="sm"
        variant={showUserLocation ? 'primary' : 'outline'}
        onClick={onToggleUserLocation}
      >
        {showUserLocation ? 'Hide My Location' : 'Show My Location'}
      </Button>
      
      <Button
        size="sm"
        variant="secondary"
        onClick={onCenterUserLocation}
        disabled={!showUserLocation}
      >
        Center on Me
      </Button>
      
      <Button
        size="sm"
        variant="accent"
        onClick={onRefreshStands}
      >
        Refresh Stands
      </Button>
    </div>
  );
};

MapControls.propTypes = {
  showUserLocation: PropTypes.bool,
  onToggleUserLocation: PropTypes.func,
  onCenterUserLocation: PropTypes.func,
  onRefreshStands: PropTypes.func,
  className: PropTypes.string,
};

export default MapControls;