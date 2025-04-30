import React from 'react';
import PropTypes from 'prop-types';

/**
 * Loading indicator component with different sizes and variants
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the loading indicator (sm, md, lg)
 * @param {string} props.variant - Color variant (blue, yellow, white)
 * @param {boolean} props.fullScreen - Whether to display the loader full screen
 * @param {string} props.message - Optional message to display with the loader
 * @returns {JSX.Element} - Loading indicator component
 */
const LoadingIndicator = ({ 
  size = 'md', 
  variant = 'blue',
  fullScreen = false,
  message = 'Loading...'
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-t-2 border-b-2'
  };
  
  // Variant classes
  const variantClasses = {
    blue: 'border-lemonade-blue',
    yellow: 'border-lemonade-yellow',
    white: 'border-white'
  };
  
  // Combine classes
  const spinnerClasses = `animate-spin rounded-full ${sizeClasses[size]} ${variantClasses[variant]}`;
  
  // Full screen wrapper
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="text-center">
          <div className={spinnerClasses}></div>
          {message && (
            <p className="mt-4 text-white font-medium">{message}</p>
          )}
        </div>
      </div>
    );
  }
  
  // Regular display
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={spinnerClasses}></div>
      {message && (
        <p className="mt-2 text-gray-600 text-sm">{message}</p>
      )}
    </div>
  );
};

LoadingIndicator.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['blue', 'yellow', 'white']),
  fullScreen: PropTypes.bool,
  message: PropTypes.string
};

export default LoadingIndicator;