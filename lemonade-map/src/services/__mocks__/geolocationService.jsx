/**
 * Mock Geolocation Service
 */

import { calculateDistance, sortStandsByDistance, filterStandsByDistance } from '../../utils/distance';

// Default location to use as fallback (San Francisco)
const DEFAULT_LOCATION = {
  lat: 37.7749,
  lng: -122.4194,
  accuracy: 5000, // 5km accuracy (very low)
  isFallback: true
};

/**
 * Check if the current context is secure (HTTPS or localhost)
 * 
 * @returns {boolean} - Whether the current context is secure
 */
export const isSecureContext = () => {
  // In tests, always return true
  return true;
};

/**
 * Get the user's current location using the browser's Geolocation API
 * 
 * @param {boolean} useFallback - Whether to use fallback location if geolocation fails
 * @returns {Promise<{lat: number, lng: number, accuracy: number, isFallback?: boolean}>} - The user's coordinates
 */
export const getCurrentLocation = (useFallback = true) => {
  return Promise.resolve(DEFAULT_LOCATION);
};

/**
 * Watch the user's location and call the callback when it changes
 * 
 * @param {Function} callback - Function to call when location changes
 * @param {boolean} useFallback - Whether to use fallback location if geolocation fails
 * @returns {number|null} - ID to use with clearWatch, or null if using fallback
 */
export const watchLocation = (callback, useFallback = true) => {
  callback(DEFAULT_LOCATION);
  return 123; // Mock watch ID
};

/**
 * Stop watching the user's location
 * 
 * @param {number|null} watchId - ID returned from watchLocation, or null if using fallback
 */
export const clearLocationWatch = (watchId) => {
  // Do nothing in mock
};

/**
 * Find stands near a location
 * 
 * @param {Array} stands - Array of stand objects
 * @param {Object} location - Location object with lat and lng properties
 * @param {number} maxDistance - Maximum distance in miles
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {Array} - Filtered and sorted array of stands
 */
export const findNearbyStands = (stands, location, maxDistance = null, unit = 'miles') => {
  if (!location || !stands || !stands.length) {
    return [];
  }

  // Add distance to each stand
  const standsWithDistance = sortStandsByDistance(
    [...stands],
    location.lat,
    location.lng,
    unit
  );

  // Filter by max distance if provided
  return maxDistance !== null
    ? filterStandsByDistance(standsWithDistance, maxDistance)
    : standsWithDistance;
};

/**
 * Get the address for a location using reverse geocoding
 * 
 * @param {Object} location - Location object with lat and lng properties
 * @returns {Promise<string>} - The address
 */
export const getAddressFromLocation = async (location) => {
  if (!location || !location.lat || !location.lng) {
    throw new Error('Invalid location');
  }

  return Promise.resolve('123 Test Street, Test City, Test State 12345');
};

/**
 * Get the location for an address using geocoding
 * 
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number}>} - The coordinates
 */
export const getLocationFromAddress = async (address) => {
  if (!address) {
    throw new Error('Address is required');
  }

  return Promise.resolve({ lat: 37.7749, lng: -122.4194 });
};

/**
 * Format a distance for display
 * 
 * @param {number} distance - The distance to format
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {string} - Formatted distance string
 */
export const formatDistance = (distance, unit = 'miles') => {
  if (distance === null || distance === undefined) {
    return 'Distance unknown';
  }

  // For very small distances
  if (distance < 0.1) {
    return `${(distance * 5280).toFixed(0)} feet away`;
  }

  // For distances less than 10 miles/km, show one decimal place
  if (distance < 10) {
    return `${distance.toFixed(1)} ${unit} away`;
  }

  // For larger distances, round to whole number
  return `${Math.round(distance)} ${unit} away`;
};

/**
 * Calculate the distance between two locations
 * 
 * @param {Object} location1 - First location with lat and lng properties
 * @param {Object} location2 - Second location with lat and lng properties
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {number} - The distance between the locations
 */
export const getDistanceBetween = (location1, location2, unit = 'miles') => {
  if (!location1 || !location2) {
    return null;
  }

  return calculateDistance(
    location1.lat,
    location1.lng,
    location2.lat,
    location2.lng,
    unit
  );
};

/**
 * Check if a location is within a certain distance of another location
 * 
 * @param {Object} location1 - First location with lat and lng properties
 * @param {Object} location2 - Second location with lat and lng properties
 * @param {number} maxDistance - Maximum distance
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {boolean} - Whether the locations are within the specified distance
 */
export const isLocationNearby = (location1, location2, maxDistance, unit = 'miles') => {
  const distance = getDistanceBetween(location1, location2, unit);
  return distance !== null && distance <= maxDistance;
};

/**
 * Get a human-readable description of a location's proximity
 * 
 * @param {number} distance - The distance
 * @returns {string} - Description of proximity
 */
export const getProximityDescription = (distance) => {
  if (distance === null || distance === undefined) {
    return 'Distance unknown';
  }

  if (distance < 0.1) {
    return 'Very close';
  } else if (distance < 0.5) {
    return 'Walking distance';
  } else if (distance < 1) {
    return 'Less than a mile away';
  } else if (distance < 5) {
    return 'A short drive away';
  } else if (distance < 20) {
    return 'Nearby';
  } else {
    return 'Far away';
  }
};