import React from 'react';
import PropTypes from 'prop-types';

/**
 * Badge component with child-friendly styling
 */
const Badge = ({
  children,
  variant = 'yellow',
  size = 'md',
  rounded = 'full',
  className = '',
  ...props
}) => {
  // Base classes for all badges
  const baseClasses = 'inline-flex items-center justify-center font-display';
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };
  
  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-lg',
    full: 'rounded-full',
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    yellow: 'bg-lemonade-yellow text-gray-800',
    blue: 'bg-lemonade-blue text-white',
    pink: 'bg-lemonade-pink text-white',
    green: 'bg-green-400 text-white',
    red: 'bg-red-400 text-white',
    gray: 'bg-gray-200 text-gray-800',
    outline: 'bg-white border border-lemonade-yellow text-gray-800',
  };
  
  // Combine all classes
  const badgeClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <span className={badgeClasses} {...props}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'green', 'red', 'gray', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'full']),
  className: PropTypes.string,
};

export default Badge;