import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Navigation component with child-friendly styling
 */
const Navigation = ({
  brand,
  items = [],
  variant = 'yellow',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Base classes for the navigation
  const baseClasses = 'font-display shadow-playful';
  
  // Variant classes (color schemes)
  const variantClasses = {
    yellow: 'bg-lemonade-yellow text-gray-800',
    blue: 'bg-lemonade-blue text-white',
    pink: 'bg-lemonade-pink text-white',
    white: 'bg-white text-gray-800',
  };
  
  // Combine all classes
  const navClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <nav className={navClasses} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/logo */}
          <div className="flex-shrink-0 flex items-center">
            {brand}
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-75 transition-colors duration-200 ${
                    item.active ? 'bg-white bg-opacity-20 font-bold' : ''
                  }`}
                  aria-current={item.active ? 'page' : undefined}
                  onClick={item.onClick}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} md:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-75 transition-colors duration-200 ${
                item.active ? 'bg-white bg-opacity-20 font-bold' : ''
              }`}
              aria-current={item.active ? 'page' : undefined}
              onClick={item.onClick}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  brand: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      href: PropTypes.string,
      active: PropTypes.bool,
      onClick: PropTypes.func,
    })
  ),
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'white']),
  className: PropTypes.string,
};

export default Navigation;