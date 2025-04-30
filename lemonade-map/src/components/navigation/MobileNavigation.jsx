import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui';

/**
 * Mobile navigation component with hamburger menu
 */
const MobileNavigation = ({ 
  currentView, 
  onViewChange,
  navItems = [
    { id: 'map', label: 'Map View' },
    { id: 'register', label: 'Register Stand' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'test', label: 'Supabase Test' }
  ]
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavItemClick = (viewId) => {
    onViewChange(viewId);
    setIsMenuOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        className="flex items-center p-2 rounded-md text-gray-800 hover:bg-lemonade-yellow-dark focus:outline-none focus:ring-2 focus:ring-lemonade-yellow-dark"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white shadow-lg rounded-b-lg mt-1 py-2 px-4 border-t border-gray-200 transition-all duration-200 ease-in-out">
          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? 'primary' : 'ghost'}
                size="md"
                fullWidth
                onClick={() => handleNavItemClick(item.id)}
                className="justify-start"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

MobileNavigation.propTypes = {
  currentView: PropTypes.string.isRequired,
  onViewChange: PropTypes.func.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  )
};

export default MobileNavigation;