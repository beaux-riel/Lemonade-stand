import React from 'react';
import PropTypes from 'prop-types';

/**
 * Alert component with child-friendly styling
 */
const Alert = ({
  children,
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  icon,
  title,
  ...props
}) => {
  // Base classes for all alerts
  const baseClasses = 'p-4 rounded-lg shadow-playful';
  
  // Variant classes (color schemes)
  const variantClasses = {
    info: 'bg-lemonade-blue-light text-lemonade-blue-dark',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-lemonade-yellow-light text-amber-800',
    error: 'bg-lemonade-pink-light text-lemonade-pink-dark',
  };
  
  // Combine all classes
  const alertClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${className}
  `;
  
  return (
    <div className={alertClasses} role="alert" {...props}>
      <div className="flex">
        {icon && (
          <div className="flex-shrink-0 mr-3">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="text-lg font-display mb-1">{title}</h3>
          )}
          <div className="text-sm">{children}</div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="flex-shrink-0 ml-auto -mx-1.5 -my-1.5 p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            onClick={onDismiss}
            aria-label="Dismiss"
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
  dismissible: PropTypes.bool,
  onDismiss: PropTypes.func,
  className: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default Alert;