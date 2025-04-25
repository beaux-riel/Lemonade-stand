import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip component with child-friendly styling
 */
const Tooltip = ({
  children,
  content,
  position = 'top',
  variant = 'dark',
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };
  
  // Arrow position classes
  const arrowPositionClasses = {
    top: 'top-full left-1/2 transform -translate-x-1/2 border-t-4 border-l-4 border-r-0 border-b-0',
    bottom: 'bottom-full left-1/2 transform -translate-x-1/2 border-b-4 border-r-4 border-l-0 border-t-0',
    left: 'left-full top-1/2 transform -translate-y-1/2 border-l-4 border-b-4 border-r-0 border-t-0',
    right: 'right-full top-1/2 transform -translate-y-1/2 border-r-4 border-t-4 border-l-0 border-b-0',
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    dark: 'bg-gray-800 text-white',
    yellow: 'bg-lemonade-yellow text-gray-800',
    blue: 'bg-lemonade-blue text-white',
    pink: 'bg-lemonade-pink text-white',
  };
  
  // Arrow variant classes
  const arrowVariantClasses = {
    dark: 'border-gray-800',
    yellow: 'border-lemonade-yellow',
    blue: 'border-lemonade-blue',
    pink: 'border-lemonade-pink',
  };
  
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      
      {isVisible && (
        <div
          className={`
            absolute z-10 px-3 py-2 text-sm font-display rounded-lg shadow-playful whitespace-nowrap
            ${positionClasses[position]}
            ${variantClasses[variant]}
            ${className}
          `}
          role="tooltip"
        >
          {content}
          <div
            className={`
              absolute w-2 h-2 transform rotate-45
              ${arrowPositionClasses[position]}
              ${arrowVariantClasses[variant]}
            `}
          ></div>
        </div>
      )}
    </div>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  variant: PropTypes.oneOf(['dark', 'yellow', 'blue', 'pink']),
  className: PropTypes.string,
};

export default Tooltip;