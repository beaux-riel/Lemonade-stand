// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { mockDeep } from 'jest-mock-extended';

// Polyfill for TextEncoder/TextDecoder
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;

// Mock Supabase
jest.mock('./supabaseClient', () => {
  return {
    __esModule: true,
    default: mockDeep()
  };
});

// Mock Leaflet
jest.mock('leaflet', () => {
  return {
    map: jest.fn().mockReturnValue({
      setView: jest.fn().mockReturnThis(),
      remove: jest.fn(),
      on: jest.fn(),
      off: jest.fn(),
    }),
    tileLayer: jest.fn().mockReturnValue({
      addTo: jest.fn().mockReturnThis(),
    }),
    marker: jest.fn().mockReturnValue({
      addTo: jest.fn().mockReturnThis(),
      bindPopup: jest.fn().mockReturnThis(),
      openPopup: jest.fn(),
    }),
    icon: jest.fn(),
    latLng: jest.fn(),
    DomUtil: {
      create: jest.fn(),
    },
    DomEvent: {
      disableClickPropagation: jest.fn(),
    },
  };
});

// Mock react-leaflet
jest.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }) => <div data-testid="map-marker">{children}</div>,
    Popup: ({ children }) => <div data-testid="map-popup">{children}</div>,
    useMap: () => ({
      setView: jest.fn(),
      flyTo: jest.fn(),
    }),
    useMapEvent: jest.fn(),
    useMapEvents: jest.fn(),
  };
});

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation(success => 
    success({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 10,
      },
    })
  ),
  watchPosition: jest.fn().mockImplementation(success => {
    success({
      coords: {
        latitude: 40.7128,
        longitude: -74.0060,
        accuracy: 10,
      },
    });
    return 123; // watchId
  }),
  clearWatch: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Reset mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
  localStorageMock.clear();
});
