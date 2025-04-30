import React from 'react';
import PropTypes from 'prop-types';

/**
 * Progress component with child-friendly styling
 */
const Progress = ({
  value = 0,
  max = 100,
  variant = 'yellow',
  size = 'md',
  showLabel = false,
  labelPosition = 'right',
  animated = false,
  striped = false,
  rounded = true,
  className = '',
  ...props
}) => {
  // Calculate percentage
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  // Size classes
  const sizeClasses = {
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6',
    xl: 'h-8',
  };
  
  // Label size classes
  const labelSizeClasses = {
    xs: 'text-xs',
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    yellow: 'bg-lemonade-yellow',
    blue: 'bg-lemonade-blue',
    pink: 'bg-lemonade-pink',
    green: 'bg-green-400',
    red: 'bg-red-400',
  };
  
  // Animation classes
  const animationClass = animated ? 'animate-pulse' : '';
  
  // Striped classes
  const stripedClass = striped
    ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1rem_1rem]'
    : '';
  
  // Rounded classes
  const roundedClass = rounded ? 'rounded-full' : '';
  
  // Label position classes
  const labelPositionClasses = {
    top: 'flex-col',
    right: 'items-center',
    bottom: 'flex-col-reverse',
    left: 'flex-row-reverse items-center',
    inside: '',
  };
  
  return (
    <div
      className={`${showLabel && labelPosition !== 'inside' ? 'flex gap-2' : ''} ${
        showLabel ? labelPositionClasses[labelPosition] : ''
      } ${className}`}
      {...props}
    >
      <div className={`w-full bg-gray-200 ${roundedClass} overflow-hidden`}>
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} ${animationClass} ${stripedClass} ${roundedClass} transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin="0"
          aria-valuemax={max}
        >
          {showLabel && labelPosition === 'inside' && size !== 'xs' && size !== 'sm' && (
            <span className={`px-2 text-white font-display ${labelSizeClasses[size]}`}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
      
      {showLabel && labelPosition !== 'inside' && (
        <span className={`font-display ${labelSizeClasses[size]} text-gray-700`}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};

Progress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'green', 'red']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  showLabel: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'inside']),
  animated: PropTypes.bool,
  striped: PropTypes.bool,
  rounded: PropTypes.bool,
  className: PropTypes.string,
};

export default Progress;