# Geolocation Services

This directory contains services for working with geolocation in the Lemonade Stand application.

## Overview

The geolocation services provide the following functionality:

1. **User Location** - Getting and tracking the user's current location
2. **Distance Calculation** - Calculating distances between coordinates
3. **Geocoding** - Converting addresses to coordinates and vice versa
4. **Nearby Stands** - Finding and sorting stands by proximity to the user
5. **Formatting** - Formatting distances and proximity descriptions for display

## Files

- `geolocationService.js` - Contains all the geolocation-related functions

## User Location Functions

```javascript
// Get the user's current location
const location = await getCurrentLocation();

// Watch the user's location for changes
const watchId = watchLocation((location) => {
  console.log('Location updated:', location);
});

// Stop watching the user's location
clearLocationWatch(watchId);
```

## Distance Calculation Functions

```javascript
// Calculate distance between two locations
const distance = getDistanceBetween(
  { lat: 40.7128, lng: -74.0060 }, // New York
  { lat: 34.0522, lng: -118.2437 }, // Los Angeles
  'miles' // or 'km'
);

// Check if a location is nearby
const isNearby = isLocationNearby(
  userLocation,
  standLocation,
  10, // miles
  'miles'
);
```

## Geocoding Functions

```javascript
// Convert address to coordinates
const coordinates = await getLocationFromAddress('123 Main St, New York, NY');

// Convert coordinates to address
const address = await getAddressFromLocation({ lat: 40.7128, lng: -74.0060 });
```

## Nearby Stands Functions

```javascript
// Find stands near a location
const nearbyStands = findNearbyStands(
  allStands,
  userLocation,
  10, // max distance in miles (optional)
  'miles' // or 'km'
);
```

## Formatting Functions

```javascript
// Format a distance for display
const formattedDistance = formatDistance(2.5, 'miles'); // "2.5 miles away"

// Get a human-readable proximity description
const proximityDescription = getProximityDescription(0.3); // "Walking distance"
```

## Integration with React Contexts

The geolocation services are integrated with React contexts for easy access throughout the application:

- `GeolocationContext` - Provides user location state and functions
- `NearbyStandsContext` - Provides nearby stands state and functions

Example usage:

```javascript
import { useGeolocation } from '../contexts/GeolocationContext';
import { useNearbyStands } from '../contexts/NearbyStandsContext';

function MyComponent() {
  const { location, getLocation } = useGeolocation();
  const { nearbyStands, maxDistance, setMaxDistanceFilter } = useNearbyStands();

  // Use the data and functions
}
```

## Error Handling

All geolocation functions include proper error handling for cases such as:

- Geolocation not supported by the browser
- User denies location permission
- Geocoding service errors
- Network errors

## Browser Compatibility

The geolocation services use the browser's Geolocation API, which is supported by all modern browsers. For geocoding, the services use the Nominatim OpenStreetMap API, which is free and does not require an API key.