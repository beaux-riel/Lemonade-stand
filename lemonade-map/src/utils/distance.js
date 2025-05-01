/**
 * Utility functions for calculating distances between coordinates
 */

/**
 * Calculate the distance between two coordinates using the Haversine formula
 * 
 * @param {number} lat1 - Latitude of first point
 * @param {number} lng1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lng2 - Longitude of second point
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {number} - Distance in the specified unit
 */
export const calculateDistance = (lat1, lng1, lat2, lng2, unit = 'miles') => {
  // If any coordinate is missing, return null
  if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) {
    return null;
  }

  // Convert latitude and longitude from degrees to radians
  const radLat1 = (Math.PI * lat1) / 180;
  const radLng1 = (Math.PI * lng1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const radLng2 = (Math.PI * lng2) / 180;

  // Haversine formula
  const dLat = radLat2 - radLat1;
  const dLng = radLng2 - radLng1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Earth's radius in kilometers
  const earthRadius = 6371;
  
  // Calculate distance in kilometers
  const distanceKm = earthRadius * c;
  
  // Convert to miles if needed
  return unit === 'miles' ? distanceKm * 0.621371 : distanceKm;
};

/**
 * Sort stands by distance from a given location
 * 
 * @param {Array} stands - Array of stand objects with location_lat and location_lng properties
 * @param {number} userLat - User's latitude
 * @param {number} userLng - User's longitude
 * @param {string} unit - Unit of measurement ('miles' or 'km')
 * @returns {Array} - Sorted array of stands with distance property added
 */
export const sortStandsByDistance = (stands, userLat, userLng, unit = 'miles') => {
  // If user location is not available, return the original array
  if (userLat == null || userLng == null) {
    return stands;
  }

  // Add distance property to each stand
  const standsWithDistance = stands.map(stand => {
    const distance = calculateDistance(
      userLat,
      userLng,
      stand.location_lat,
      stand.location_lng,
      unit
    );

    return {
      ...stand,
      distance
    };
  });

  // Sort by distance (null distances at the end)
  return standsWithDistance.sort((a, b) => {
    if (a.distance === null && b.distance === null) return 0;
    if (a.distance === null) return 1;
    if (b.distance === null) return -1;
    return a.distance - b.distance;
  });
};

/**
 * Filter stands by maximum distance from a given location
 * 
 * @param {Array} stands - Array of stand objects with distance property
 * @param {number} maxDistance - Maximum distance to filter by
 * @returns {Array} - Filtered array of stands
 */
export const filterStandsByDistance = (stands, maxDistance) => {
  if (maxDistance === null || maxDistance === undefined) {
    return stands;
  }

  return stands.filter(stand => {
    const { distance, location_lat, location_lng } = stand;

    // If a numeric distance exists, filter by it
    if (typeof distance === 'number') {
      return distance <= maxDistance;
    }

    // If distance is missing but coordinates are present, include it
    if (location_lat != null && location_lng != null) {
      return true;
    }

    // Otherwise, exclude
    return false;
  });
};