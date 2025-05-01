import { calculateDistance, sortStandsByDistance, filterStandsByDistance } from '../../utils/distance';

describe('distance utility functions', () => {
  describe('calculateDistance function', () => {
    test('should return null for missing coordinates', () => {
      expect(calculateDistance(null, 0, 1, 2)).toBeNull();
      expect(calculateDistance(0, null, 1, 2)).toBeNull();
      expect(calculateDistance(0, 1, null, 2)).toBeNull();
      expect(calculateDistance(0, 1, 2, null)).toBeNull();
    });

    test('should calculate distance in miles correctly', () => {
      // Distance between New York City (40.7128, -74.0060) and Los Angeles (34.0522, -118.2437)
      const distance = calculateDistance(40.7128, -74.0060, 34.0522, -118.2437);
      expect(distance).toBeGreaterThan(2400); // Should be around 2450 miles
    });

    test('should calculate distance in kilometers correctly', () => {
      const distance = calculateDistance(
        40.7128, -74.0060,
        34.0522, -118.2437,
        'km'
      );
      expect(distance).toBeGreaterThan(3900); // Should be around 3950 km
    });

    test('should handle same coordinates', () => {
      const distance = calculateDistance(40.7128, -74.0060, 40.7128, -74.0060);
      expect(distance).toBeCloseTo(0); // Should be very close to 0
    });
  });

  describe('sortStandsByDistance function', () => {
    test('should sort stands by distance correctly', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2', location_lat: 34.0522, location_lng: -118.2437 }
      ];
      
      const sorted = sortStandsByDistance(stands, 40.7128, -74.0060);
      expect(sorted[0].id).toBe('1'); // Stand 1 should be closer
    });

    test('should handle missing user location', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2', location_lat: 34.0522, location_lng: -118.2437 }
      ];
      
      const sorted = sortStandsByDistance(stands, null, null);
      expect(sorted).toEqual(stands); // Should return original array
    });

    test('should handle stands with missing coordinates', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2' } // Missing coordinates
      ];
      
      const sorted = sortStandsByDistance(stands, 40.7128, -74.0060);
      expect(sorted[0].id).toBe('1'); // Stand 1 should be first
    });
  });

  describe('filterStandsByDistance function', () => {
    test('should filter stands by distance correctly', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2', location_lat: 34.0522, location_lng: -118.2437 }
      ];
      
      // Add distances to stands
      const standsWithDistance = sortStandsByDistance(stands, 40.7128, -74.0060);
      
      const filtered = filterStandsByDistance(standsWithDistance, 5); // Filter by 5 miles
      expect(filtered).toHaveLength(1); // Only stand 1 should be within 5 miles
    });

    test('should handle null max distance', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2' } // Missing coordinates
      ];
      
      const filtered = filterStandsByDistance(stands, null);
      expect(filtered).toEqual(stands); // Should return original array
    });

    test('should handle stands with missing distance', () => {
      const stands = [
        { id: '1', location_lat: 40.7128, location_lng: -74.0060 },
        { id: '2' } // Missing coordinates
      ];
      
      const filtered = filterStandsByDistance(stands, 5);
      expect(filtered).toHaveLength(1); // Only stand 1 should be included
    });
  });
});