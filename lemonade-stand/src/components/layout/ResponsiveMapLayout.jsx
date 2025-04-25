import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui';

/**
 * Responsive layout component for the map page
 * On mobile, it shows either the map or the sidebar with a toggle button
 * On desktop, it shows both side by side
 */
const ResponsiveMapLayout = ({
  mapComponent,
  sidebarComponent,
  className = '',
}) => {
  const [showMap, setShowMap] = useState(true);

  // Toggle between map and sidebar on mobile
  const toggleView = () => {
    setShowMap(!showMap);
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile toggle button */}
      <div className="lg:hidden flex justify-center mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={showMap ? 'primary' : 'outline'}
            className="rounded-r-none"
            onClick={() => setShowMap(true)}
          >
            Map
          </Button>
          <Button
            variant={!showMap ? 'primary' : 'outline'}
            className="rounded-l-none"
            onClick={() => setShowMap(false)}
          >
            List
          </Button>
        </div>
      </div>

      {/* Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - hidden on mobile when showing sidebar */}
        <div className={`lg:col-span-2 ${!showMap ? 'hidden lg:block' : ''}`}>
          {mapComponent}
        </div>

        {/* Sidebar - hidden on mobile when showing map */}
        <div className={`${showMap ? 'hidden lg:block' : ''}`}>
          {sidebarComponent}
        </div>
      </div>
    </div>
  );
};

ResponsiveMapLayout.propTypes = {
  mapComponent: PropTypes.node.isRequired,
  sidebarComponent: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ResponsiveMapLayout;