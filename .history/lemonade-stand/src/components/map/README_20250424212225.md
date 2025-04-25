# Lemonade Stand Map Components

This directory contains map-related components for the Lemonade Stand application, built using Leaflet.js and react-leaflet.

## Components

### Map

The core map component that displays a map with lemonade stand markers and user location.

```jsx
import { Map } from './components/map';

<Map
  stands={stands}
  center={[40.7128, -74.0060]}
  zoom={13}
  height="500px"
  showUserLocation={true}
  onStandClick={handleStandClick}
/>
```

#### Props

- `stands`: Array of lemonade stand objects with location data
- `center`: Array of [latitude, longitude] for the map center
- `zoom`: Zoom level (1-18)
- `height`: CSS height for the map container
- `showUserLocation`: Boolean to show/hide user's location
- `onStandClick`: Function called when a stand marker is clicked
- `className`: Additional CSS classes

### MapControls

Controls for the map, such as toggling user location and refreshing stands.

```jsx
import { MapControls } from './components/map';

<MapControls
  showUserLocation={showUserLocation}
  onToggleUserLocation={handleToggleUserLocation}
  onCenterUserLocation={handleCenterUserLocation}
  onRefreshStands={handleRefreshStands}
/>
```

#### Props

- `showUserLocation`: Boolean indicating if user location is shown
- `onToggleUserLocation`: Function to toggle user location visibility
- `onCenterUserLocation`: Function to center map on user location
- `onRefreshStands`: Function to refresh lemonade stands data
- `className`: Additional CSS classes

### StandCard

Card component to display details about a selected lemonade stand.

```jsx
import { StandCard } from './components/map';

<StandCard
  stand={selectedStand}
  onViewProducts={handleViewProducts}
  onClose={handleCloseStandCard}
/>
```

#### Props

- `stand`: Lemonade stand object with details
- `onViewProducts`: Function called when "View Products" button is clicked
- `onClose`: Function called when "Close" button is clicked
- `className`: Additional CSS classes

### MapView

A complete map view that combines Map, MapControls, and StandCard components.

```jsx
import { MapView } from './components/map';

<MapView
  stands={stands}
  loading={loading}
  onRefreshStands={handleRefreshStands}
  onViewProducts={handleViewProducts}
/>
```

#### Props

- `stands`: Array of lemonade stand objects
- `loading`: Boolean indicating if stands are loading
- `onRefreshStands`: Function to refresh lemonade stands data
- `onViewProducts`: Function called when "View Products" button is clicked
- `className`: Additional CSS classes

## Stand Object Structure

```javascript
{
  id: "1",
  name: "Sunny Lemonade",
  description: "The best lemonade in town!",
  location_lat: 40.7128,
  location_lng: -74.0060,
  address: "123 Main St, New York, NY",
  image_url: "https://example.com/image.jpg",
  distance: 0.5 // optional, distance in miles
}
```

## Custom Markers

The map uses custom SVG markers:

- `/public/images/markers/lemonade-marker.svg`: Marker for lemonade stands
- `/public/images/markers/user-location.svg`: Marker for user's location

## Features

- Interactive map with custom markers
- Geolocation to show user's current position
- Configurable zoom levels and initial view settings
- Responsive design that works on mobile and desktop
- Popup information windows for lemonade stands
- Detailed stand information card
- Map controls for user interaction