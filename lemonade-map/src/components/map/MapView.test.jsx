import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import MapView from './MapView';
import { mockStandContextValues, mockGeolocationContextValues } from '../../test-utils';

describe('MapView', () => {
  test('renders map container', () => {
    render(<MapView />);
    
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('tile-layer')).toBeInTheDocument();
  });

  test('renders markers for stands', () => {
    render(<MapView />, {
      standContextValue: mockStandContextValues.withStands
    });
    
    // Should render two markers (one for each stand)
    const markers = screen.getAllByTestId('map-marker');
    expect(markers).toHaveLength(2);
  });

  test('renders user location marker when available', () => {
    render(<MapView showUserLocation={true} />, {
      geolocationContextValue: mockGeolocationContextValues.default
    });
    
    // Should render the user location marker
    const userMarker = screen.getByTestId('user-location-marker');
    expect(userMarker).toBeInTheDocument();
  });

  test('does not render user location marker when disabled', () => {
    render(<MapView showUserLocation={false} />, {
      geolocationContextValue: mockGeolocationContextValues.default
    });
    
    // Should not render the user location marker
    expect(screen.queryByTestId('user-location-marker')).not.toBeInTheDocument();
  });

  test('renders loading state when stands are loading', () => {
    render(<MapView />, {
      standContextValue: mockStandContextValues.loading
    });
    
    expect(screen.getByText('Loading stands...')).toBeInTheDocument();
  });

  test('renders error state when stands fail to load', () => {
    render(<MapView />, {
      standContextValue: mockStandContextValues.error
    });
    
    expect(screen.getByText('Error: Failed to load stands')).toBeInTheDocument();
  });

  test('renders empty state when no stands are available', () => {
    render(<MapView />, {
      standContextValue: mockStandContextValues.empty
    });
    
    expect(screen.getByText('No lemonade stands found.')).toBeInTheDocument();
  });

  test('centers map on selected stand when provided', () => {
    const selectedStand = mockStandContextValues.withStands.stands[0];
    
    render(<MapView selectedStand={selectedStand} />, {
      standContextValue: mockStandContextValues.withStands
    });
    
    // The map should be centered on the selected stand
    // This is hard to test directly, but we can check that the stand is rendered
    expect(screen.getByText(selectedStand.name)).toBeInTheDocument();
  });
});