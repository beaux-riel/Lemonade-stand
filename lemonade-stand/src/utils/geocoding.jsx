/**
 * Utility functions for geocoding addresses
 */

/**
 * Geocode an address to get latitude and longitude
 * Uses the Nominatim OpenStreetMap API
 * 
 * @param {string} address - The address to geocode
 * @returns {Promise<{lat: number, lng: number} | null>} - The coordinates or null if not found
 */
export const geocodeAddress = async (address) => {
  try {
    // Use Nominatim OpenStreetMap API for geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'LemonadeStandApp/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }

    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    throw error;
  }
};

/**
 * Reverse geocode coordinates to get an address
 * Uses the Nominatim OpenStreetMap API
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @returns {Promise<string | null>} - The address or null if not found
 */
export const reverseGeocode = async (lat, lng) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'LemonadeStandApp/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.display_name) {
      return data.display_name;
    }

    return null;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};