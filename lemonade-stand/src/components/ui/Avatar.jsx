import React from 'react';
import PropTypes from 'prop-types';

/**
 * Avatar component with child-friendly styling
 */
const Avatar = ({
  src,
  alt,
  size = 'md',
  variant = 'circle',
  status,
  initials,
  className = '',
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };
  
  // Variant classes (shape)
  const variantClasses = {
    circle: 'rounded-full',
    square: 'rounded-lg',
    rounded: 'rounded-xl',
  };
  
  // Status classes
  const statusClasses = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
    away: 'bg-yellow-400',
  };
  
  // Status size classes
  const statusSizeClasses = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-3.5 h-3.5',
    '2xl': 'w-4 h-4',
  };
  
  // Combine all classes
  const avatarClasses = `
    inline-flex items-center justify-center overflow-hidden bg-lemonade-blue-light text-lemonade-blue-dark font-display
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;
  
  // Generate initials from alt text if not provided
  const getInitials = () => {
    if (initials) return initials;
    if (!alt) return '';
    
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <div className="relative inline-block">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={avatarClasses}
          {...props}
        />
      ) : (
        <div className={avatarClasses} {...props}>
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span
          className={`absolute bottom-0 right-0 block rounded-full ring-2 ring-white ${statusClasses[status]} ${statusSizeClasses[size]}`}
        ></span>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  variant: PropTypes.oneOf(['circle', 'square', 'rounded']),
  status: PropTypes.oneOf(['online', 'offline', 'busy', 'away']),
  initials: PropTypes.string,
  className: PropTypes.string,
};

/**
 * Avatar Group component
 */
const AvatarGroup = ({
  children,
  max,
  size = 'md',
  className = '',
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const totalAvatars = childrenArray.length;
  const displayAvatars = max ? childrenArray.slice(0, max) : childrenArray;
  const remainingAvatars = max && totalAvatars > max ? totalAvatars - max : 0;
  
  // Size classes for the +X avatar
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
    '2xl': 'w-20 h-20 text-2xl',
  };
  
  return (
    <div
      className={`flex -space-x-2 overflow-hidden ${className}`}
      {...props}
    >
      {displayAvatars.map((child, index) => (
        <div key={index} className="relative inline-block">
          {React.cloneElement(child, {
            size: child.props.size || size,
          })}
        </div>
      ))}
      
      {remainingAvatars > 0 && (
        <div
          className={`
            relative inline-flex items-center justify-center rounded-full bg-lemonade-pink-light text-lemonade-pink-dark font-display
            ${sizeClasses[size]}
          `}
        >
          +{remainingAvatars}
        </div>
      )}
    </div>
  );
};

AvatarGroup.propTypes = {
  children: PropTypes.node.isRequired,
  max: PropTypes.number,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  className: PropTypes.string,
};

// Export all components
Avatar.Group = AvatarGroup;

export default Avatar;