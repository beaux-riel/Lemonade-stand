/**
 * Geolocation Service
 * 
 * This service provides functions for working with geolocation,
 * including getting the user's current location, calculating distances,
 * and geocoding addresses.
 */

import { geocodeAddress, reverseGeocode } from '../utils/geocoding';
import { calculateDistance, sortStandsByDistance, filterStandsByDistance } from '../utils/distance';

/**
 * Check if the current context is secure (HTTPS or localhost)
 * 
 * @returns {boolean} - Whether the current context is secure
 */
export const isSecureContext = () => {
  // In development, we'll consider all contexts secure to allow geolocation to work
  if (import.meta.env.DEV) {
    return true;
  }
  
  // In production, check for secure context
  return window.isSecureContext || 
         window.location.protocol === 'https:' ||
         window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.includes('all-hands.dev') ||
         window.location.hostname.includes('prod-runtime.all-hands.dev'); // Allow our development domains
};

// Default location to use as fallback (San Francisco)
const DEFAULT_LOCATION = {
  lat: 37.7749,
  lng: -122.4194,
  accuracy: 5000, // 5km accuracy (very low)
  isFallback: true
};

/**
 * Get the user's current location using the browser's Geolocation API
 * 
 * @param {boolean} useFallback - Whether to use fallback location if geolocation fails
 * @returns {Promise<{lat: number, lng: number, accuracy: number, isFallback?: boolean}>} - The user's coordinates
 * @throws {Error} - If geolocation is not supported or permission is denied and useFallback is false
 */
export const getCurrentLocation = (useFallback = true) => {
  return new Promise((resolve, reject) => {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      if (useFallback) {
        console.warn('Geolocation is not supported by your browser. Using default location.');
        resolve(DEFAULT_LOCATION);
      } else {
        reject(new Error('Geolocation is not supported by your browser'));
      }
      return;
    }

    // Try to get the location regardless of secure context
    // This will work on localhost and secure contexts
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            isFallback: false
          });
        },
        (error) => {
          let errorMessage = 'Unknown error occurred while getting location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          // If we're not in a secure context and got a permission denied error,
          // provide a more helpful message
          if (!isSecureContext() && error.code === error.PERMISSION_DENIED) {
            errorMessage = 'Geolocation requires a secure context (HTTPS). Please use HTTPS or localhost.';
          }
          
          if (useFallback) {
            console.warn(`${errorMessage}. Using default location.`);
            resolve(DEFAULT_LOCATION);
          } else {
            reject(new Error(errorMessage));
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000 // 1 minute
        }
      );
    } catch (e) {
      // Catch any unexpected errors
      if (useFallback) {
        console.warn(`Geolocation error: ${e.message}. Using default location.`);
        resolve(DEFAULT_LOCATION);
      } else {
        reject(new Error(`Geolocation error: ${e.message}`));
      }
    }
  });
};

/**
 * Watch the user's location and call the callback when it changes
 * 
 * @param {Function} callback - Function to call when location changes
 * @param {boolean} useFallback - Whether to use fallback location if geolocation fails
 * @returns {number|null} - ID to use with clearWatch, or null if using fallback
 */
export const watchLocation = (callback, useFallback = true) => {
  if (!navigator.geolocation) {
    if (useFallback) {
      console.warn('Geolocation is not supported by your browser. Using default location.');
      callback(DEFAULT_LOCATION);
      return null;
    } else {
      throw new Error('Geolocation is not supported by your browser');
    }
  }

  try {
    let hasReceivedLocation = false;
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        hasReceivedLocation = true;
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          isFallback: false
        });
      },
      (error) => {
        // Log the error but don't throw it to avoid breaking the app
        console.error('Error watching location:', error);
        
        // If we're not in a secure context and got a permission denied error,
        // provide a more helpful message
        if (!isSecureContext() && error.code === error.PERMISSION_DENIED) {
          console.warn('Geolocation requires a secure context (HTTPS). Please use HTTPS or localhost.');
        }
        
        // Use fallback location if enabled and we haven't received a real location yet
        if (useFallback && !hasReceivedLocation) {
          console.warn('Using default location due to geolocation error.');
          callback(DEFAULT_LOCATION);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000 // 30 seconds
      }
    );
    
    // If we're using fallback, immediately provide the default location
    // This ensures the user sees something right away
    if (useFallback && !hasReceivedLocation) {
      setTimeout(() => {
        if (!hasReceivedLocation) {
          console.warn('No location received yet. Using default location temporarily.');
          callback(DEFAULT_LOCATION);
        }
      }, 1000);
    }
    
    return watchId;
  } catch (e) {
    console.error('Unexpected error setting up location watch:', e);
    
    if (useFallback) {
      console.warn(`Geolocation watch error: ${e.message}. Using default location.`);
      callback(DEFAULT_LOCATION);
      return null;
    } else {
      throw new Error(`Geolocation watch error: ${e.message}`);
    }
  }
};

/**
 * Stop watching the user's location
 * 
 * @param {number|null} watchId - ID returned from watchLocation, or null if using fallback
 */
export const clearLocationWatch = (watchId) => {
  if (navigator.geolocation && watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
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

  return reverseGeocode(location.lat, location.lng);
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

  return geocodeAddress(address);
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