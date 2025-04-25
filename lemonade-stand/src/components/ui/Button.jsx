import React from 'react';
import PropTypes from 'prop-types';

/**
 * Button component with child-friendly styling
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  rounded = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  animated = false,
  ...props
}) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-display transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
    xl: 'py-4 px-8 text-xl',
  };
  
  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  };
  
  // Variant classes (color schemes)
  const variantClasses = {
    primary: 'bg-lemonade-yellow shadow-playful text-gray-800 hover:bg-lemonade-yellow-dark focus:ring-lemonade-yellow-dark',
    secondary: 'bg-lemonade-blue shadow-playful text-white hover:bg-lemonade-blue-dark focus:ring-lemonade-blue-dark',
    accent: 'bg-lemonade-pink shadow-playful text-white hover:bg-lemonade-pink-dark focus:ring-lemonade-pink-dark',
    outline: 'bg-white border-2 border-lemonade-yellow text-gray-800 hover:bg-lemonade-yellow-light focus:ring-lemonade-yellow',
    ghost: 'bg-transparent hover:bg-lemonade-yellow-light text-gray-800 focus:ring-lemonade-yellow',
  };
  
  // Animation classes
  const animationClass = animated ? 'hover:animate-wiggle' : '';
  
  // Width classes
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${sizeClasses[size]}
    ${roundedClasses[rounded]}
    ${variantClasses[variant]}
    ${widthClass}
    ${disabledClasses}
    ${animationClass}
    ${className}
  `;
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'accent', 'outline', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'full']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
  animated: PropTypes.bool,
};

export default Button;