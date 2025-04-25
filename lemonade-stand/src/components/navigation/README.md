# Navigation Components

This directory contains components for navigation in the Lemonade Stand application.

## Overview

The navigation components provide different navigation patterns for different screen sizes, ensuring a good user experience on both mobile and desktop devices.

## Components

### MobileNavigation

The `MobileNavigation` component provides a hamburger menu for mobile devices:

```jsx
<MobileNavigation
  currentView="map"
  onViewChange={setCurrentView}
  navItems={[
    { id: 'map', label: 'Map View' },
    { id: 'register', label: 'Register Stand' },
    // ...
  ]}
/>
```

### DesktopNavigation

The `DesktopNavigation` component provides a horizontal navigation bar for desktop devices:

```jsx
<DesktopNavigation
  currentView="map"
  onViewChange={setCurrentView}
  navItems={[
    { id: 'map', label: 'Map View' },
    { id: 'register', label: 'Register Stand' },
    // ...
  ]}
/>
```

### BottomNavigation

The `BottomNavigation` component provides a bottom navigation bar for mobile devices:

```jsx
<BottomNavigation
  currentView="map"
  onViewChange={setCurrentView}
  navItems={[
    {
      id: 'map',
      label: 'Map',
      icon: <MapIcon />
    },
    // ...
  ]}
/>
```

## Mobile-Specific Interactions

The navigation components provide mobile-specific interactions:

### 1. Hamburger Menu

The `MobileNavigation` component provides a hamburger menu that expands to show navigation options when clicked.

### 2. Bottom Navigation Bar

The `BottomNavigation` component provides a fixed bottom navigation bar with icons and labels for quick access to main sections of the application.

### 3. Touch-Friendly Targets

All navigation components have touch-friendly targets that are large enough for comfortable interaction on mobile devices.

## Best Practices

1. **Consistency**: Maintain consistent navigation patterns across the application.

2. **Accessibility**: Ensure that navigation components are accessible to all users, including those using screen readers or keyboard navigation.

3. **Feedback**: Provide visual feedback for navigation actions, such as highlighting the active navigation item.

4. **Performance**: Optimize navigation components for performance, especially on mobile devices.

5. **Testing**: Test navigation components on various devices and screen sizes to ensure a consistent user experience.