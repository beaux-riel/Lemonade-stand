import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Tabs component with child-friendly styling
 */
const Tabs = ({
  children,
  defaultTab = 0,
  variant = 'default',
  className = '',
  onChange,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Extract tab items and panels from children
  const tabItems = React.Children.toArray(children).filter(
    child => child.type === TabItem
  );
  
  const tabPanels = React.Children.toArray(children).filter(
    child => child.type === TabPanel
  );
  
  // Handle tab change
  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };
  
  // Variant classes
  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'space-x-2',
    underline: 'border-b border-gray-200',
  };
  
  return (
    <div className={className} {...props}>
      {/* Tab navigation */}
      <div className={`flex ${variantClasses[variant]}`}>
        {tabItems.map((tabItem, index) => {
          const isActive = index === activeTab;
          
          // Clone the tab item with additional props
          return React.cloneElement(tabItem, {
            key: index,
            isActive,
            onClick: () => handleTabChange(index),
            variant,
          });
        })}
      </div>
      
      {/* Active tab panel */}
      {tabPanels[activeTab] && (
        <div className="mt-4">
          {tabPanels[activeTab]}
        </div>
      )}
    </div>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTab: PropTypes.number,
  variant: PropTypes.oneOf(['default', 'pills', 'underline']),
  className: PropTypes.string,
  onChange: PropTypes.func,
};

/**
 * Tab Item component
 */
const TabItem = ({
  children,
  isActive = false,
  onClick,
  variant = 'default',
  className = '',
  icon,
  disabled = false,
  ...props
}) => {
  // Base classes for all tab items
  const baseClasses = 'font-display transition-colors duration-200 focus:outline-none';
  
  // Variant specific classes
  const variantSpecificClasses = {
    default: `
      px-4 py-2 border-b-2 -mb-px
      ${isActive
        ? 'border-lemonade-yellow text-lemonade-yellow-dark'
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
    `,
    pills: `
      px-4 py-2 rounded-full
      ${isActive
        ? 'bg-lemonade-yellow text-gray-800'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}
    `,
    underline: `
      px-4 py-2
      ${isActive
        ? 'text-lemonade-blue-dark border-b-2 border-lemonade-blue'
        : 'text-gray-500 hover:text-gray-700'}
    `,
  };
  
  // Disabled classes
  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed'
    : 'cursor-pointer';
  
  // Combine all classes
  const tabItemClasses = `
    ${baseClasses}
    ${variantSpecificClasses[variant]}
    ${disabledClasses}
    ${className}
  `;
  
  return (
    <button
      className={tabItemClasses}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      {...props}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </div>
    </button>
  );
};

TabItem.propTypes = {
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'pills', 'underline']),
  className: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

/**
 * Tab Panel component
 */
const TabPanel = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={className}
      role="tabpanel"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

// Export all components
Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
export { TabItem, TabPanel };