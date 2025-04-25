import React from 'react';
import PropTypes from 'prop-types';

/**
 * Toggle/Switch component with child-friendly styling
 */
const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  variant = 'yellow',
  size = 'md',
  label,
  labelPosition = 'right',
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: {
      container: 'w-8 h-4',
      circle: 'w-3 h-3',
      translate: 'translate-x-4',
      label: 'text-sm',
    },
    md: {
      container: 'w-11 h-6',
      circle: 'w-5 h-5',
      translate: 'translate-x-5',
      label: 'text-base',
    },
    lg: {
      container: 'w-14 h-7',
      circle: 'w-6 h-6',
      translate: 'translate-x-7',
      label: 'text-lg',
    },
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    yellow: 'bg-lemonade-yellow',
    blue: 'bg-lemonade-blue',
    pink: 'bg-lemonade-pink',
    green: 'bg-green-400',
  };
  
  // Label position classes
  const labelPositionClasses = {
    left: 'flex-row-reverse',
    right: 'flex-row',
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <label
      className={`inline-flex items-center ${labelPositionClasses[labelPosition]} ${disabledClasses} ${className}`}
    >
      <span className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <span
          className={`
            ${sizeClasses[size].container}
            block rounded-full transition-colors duration-200 ease-in-out
            ${checked ? variantClasses[variant] : 'bg-gray-200'}
          `}
        ></span>
        <span
          className={`
            ${sizeClasses[size].circle}
            absolute top-0.5 left-0.5 block rounded-full bg-white shadow
            transition-transform duration-200 ease-in-out
            ${checked ? sizeClasses[size].translate : 'translate-x-0'}
          `}
        ></span>
      </span>
      {label && (
        <span
          className={`${
            labelPosition === 'left' ? 'mr-3' : 'ml-3'
          } font-display ${sizeClasses[size].label} text-gray-700`}
        >
          {label}
        </span>
      )}
    </label>
  );
};

Toggle.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'green']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.node,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default Toggle;