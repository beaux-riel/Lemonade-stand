import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component with child-friendly styling
 */
const Card = ({
  children,
  variant = 'default',
  rounded = 'lg',
  shadow = true,
  className = '',
  onClick,
  hover = false,
  ...props
}) => {
  // Base classes for all cards
  const baseClasses = 'overflow-hidden transition-all duration-200';
  
  // Rounded corner classes
  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
  };
  
  // Shadow classes
  const shadowClass = shadow ? 'shadow-playful' : '';
  
  // Variant classes (color schemes)
  const variantClasses = {
    default: 'bg-white',
    yellow: 'bg-lemonade-yellow-light',
    pink: 'bg-lemonade-pink-light',
    blue: 'bg-lemonade-blue-light',
    outlined: 'bg-white border-2 border-lemonade-yellow',
  };
  
  // Hover effect classes
  const hoverClasses = hover ? 'hover:shadow-playful-lg hover:-translate-y-1' : '';
  
  // Clickable classes
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  // Combine all classes
  const cardClasses = `
    ${baseClasses}
    ${roundedClasses[rounded]}
    ${shadowClass}
    ${variantClasses[variant]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `;
  
  return (
    <div
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'yellow', 'pink', 'blue', 'outlined']),
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  shadow: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
};

/**
 * Card Header component
 */
const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card Body component
 */
const CardBody = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

/**
 * Card Footer component
 */
const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Export all components
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;