import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loader component with child-friendly styling
 */
const Loader = ({
  size = 'md',
  variant = 'yellow',
  className = '',
  label = 'Loading...',
  showLabel = false,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    yellow: 'text-lemonade-yellow',
    blue: 'text-lemonade-blue',
    pink: 'text-lemonade-pink',
  };
  
  // Combine all classes
  const loaderClasses = `
    animate-spin
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <div className="flex flex-col items-center justify-center" {...props}>
      <svg
        className={loaderClasses}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {showLabel && (
        <span className="mt-2 font-display text-gray-600">{label}</span>
      )}
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink']),
  className: PropTypes.string,
  label: PropTypes.string,
  showLabel: PropTypes.bool,
};

export default Loader;