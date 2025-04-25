import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Dropdown/Menu component with child-friendly styling
 */
const Dropdown = ({
  trigger,
  children,
  align = 'left',
  width = 'auto',
  variant = 'white',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  // Close dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };
  
  // Alignment classes
  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };
  
  // Width classes
  const widthClasses = {
    auto: 'min-w-max',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    xl: 'w-72',
    full: 'w-full',
  };
  
  // Variant classes
  const variantClasses = {
    white: 'bg-white',
    yellow: 'bg-lemonade-yellow-light',
    blue: 'bg-lemonade-blue-light',
    pink: 'bg-lemonade-pink-light',
  };
  
  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef} {...props}>
      {/* Trigger element */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`
            absolute z-10 mt-2 rounded-xl shadow-playful
            ${alignClasses[align]}
            ${widthClasses[width]}
            ${variantClasses[variant]}
          `}
        >
          <div className="py-1 rounded-xl overflow-hidden">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  closeDropdown,
                });
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'right', 'center']),
  width: PropTypes.oneOf(['auto', 'sm', 'md', 'lg', 'xl', 'full']),
  variant: PropTypes.oneOf(['white', 'yellow', 'blue', 'pink']),
  className: PropTypes.string,
};

/**
 * Dropdown Item component
 */
const DropdownItem = ({
  children,
  onClick,
  closeDropdown,
  disabled = false,
  className = '',
  ...props
}) => {
  // Handle click
  const handleClick = (e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }
    
    if (closeDropdown) {
      closeDropdown();
    }
  };
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <div
      className={`
        px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-display
        ${disabledClasses}
        ${className}
      `}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

DropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  closeDropdown: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

/**
 * Dropdown Divider component
 */
const DropdownDivider = ({ className = '', ...props }) => {
  return (
    <div
      className={`my-1 h-px bg-gray-200 ${className}`}
      {...props}
    ></div>
  );
};

DropdownDivider.propTypes = {
  className: PropTypes.string,
};

/**
 * Dropdown Header component
 */
const DropdownHeader = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

DropdownHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Export all components
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Header = DropdownHeader;

export default Dropdown;