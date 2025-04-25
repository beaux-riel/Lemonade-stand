import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui';

/**
 * Desktop navigation component with horizontal buttons
 */
const DesktopNavigation = ({ 
  currentView, 
  onViewChange,
  navItems = [
    { id: 'map', label: 'Map View' },
    { id: 'register', label: 'Register Stand' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'test', label: 'Supabase Test' }
  ]
}) => {
  return (
    <div className="hidden md:flex space-x-2">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant={currentView === item.id ? 'primary' : 'outline'}
          onClick={() => onViewChange(item.id)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
};

DesktopNavigation.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default DesktopNavigation;