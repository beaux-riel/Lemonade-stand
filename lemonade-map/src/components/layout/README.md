# Mobile-Responsive Layout Components

This directory contains components for creating mobile-responsive layouts in the Lemonade Stand application.

## Overview

The mobile-responsive layout components ensure that the application works well on all device sizes, from mobile phones to desktop computers. The components use Tailwind CSS's responsive utility classes to adjust the layout based on the screen size.

## Components

### ResponsiveMapLayout

The `ResponsiveMapLayout` component provides a responsive layout for the map page:

- On mobile devices, it shows either the map or the sidebar with a toggle button to switch between them.
- On desktop devices, it shows both the map and the sidebar side by side.

```jsx
<ResponsiveMapLayout
  mapComponent={<Map />}
  sidebarComponent={<Sidebar />}
/>
```

## Responsive Design Patterns

The application uses the following responsive design patterns:

### 1. Mobile-First Approach

All components are designed with a mobile-first approach, starting with the mobile layout and then adding responsive utility classes to adjust the layout for larger screens.

### 2. Responsive Grid Layout

The application uses CSS Grid for layout, with different column configurations for different screen sizes:

```jsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <div className="lg:col-span-2">
    {/* Map component */}
  </div>
  <div>
    {/* Sidebar component */}
  </div>
</div>
```

### 3. Responsive Typography

Text sizes are adjusted based on screen size:

```jsx
<h1 className="text-2xl md:text-3xl font-display">Heading</h1>
<p className="text-sm md:text-base">Paragraph</p>
```

### 4. Responsive Spacing

Padding and margin are adjusted based on screen size:

```jsx
<div className="p-2 md:p-4">Content</div>
```

### 5. Responsive Component Layout

Components adjust their layout based on screen size:

```jsx
<div className="flex flex-col sm:flex-row">
  <div className="sm:w-1/3">Image</div>
  <div className="sm:w-2/3">Content</div>
</div>
```

### 6. Responsive Navigation

The application uses different navigation patterns for different screen sizes:

- On mobile devices, it uses a bottom navigation bar and a hamburger menu.
- On desktop devices, it uses a horizontal navigation bar.

## Breakpoints

The application uses the following breakpoints:

- `sm`: 640px and above
- `md`: 768px and above
- `lg`: 1024px and above
- `xl`: 1280px and above
- `2xl`: 1536px and above

## Best Practices

1. **Mobile-First Approach**: Always start with the mobile layout and then add responsive utility classes for larger screens.

2. **Responsive Images**: Use responsive image techniques to ensure that images load appropriately for different screen sizes.

3. **Touch-Friendly UI**: Ensure that interactive elements are large enough for touch interaction on mobile devices.

4. **Performance Optimization**: Optimize performance for mobile devices by minimizing JavaScript execution and reducing the size of assets.

5. **Testing**: Test the application on various devices and screen sizes to ensure a consistent user experience.