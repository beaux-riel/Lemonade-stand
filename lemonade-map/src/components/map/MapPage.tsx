// src/components/MapPage.tsx
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import Map from "./Map";
import { Alert, Loader, Button } from "../ui";
import { ResponsiveMapLayout } from "../layout";
import { useGeolocation } from "../../contexts/GeolocationContext";
import { useStands } from "../../contexts/StandContext";
import { useNearbyStands } from "../../contexts/NearbyStandsContext";
import { useAuth } from "../../contexts/AuthContext";

// Lazy load components that aren't needed immediately
const StandListSidebar = lazy(() => import("./StandListSidebar"));
const NearbyStandsList = lazy(() => import("./NearbyStandsList"));

interface MapPageProps {
  /**
   * Height for the Map container. Accepts any valid CSS height value.
   * Defaults to full-page layout if not provided.
   */
  mapHeight?: string;
}

const MapPage: React.FC<MapPageProps> = ({
  mapHeight = "calc(100vh - 200px)",
}) => {
  const { stands, loading: standsLoading, error: standsError } = useStands();
  const { location, getLocation, error: locationError } = useGeolocation();
  const { nearbyStands } = useNearbyStands();
  const { initializing: authInitializing } = useAuth();

  const [selectedStand, setSelectedStand] = useState<any>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    40.7128, -74.006,
  ]);
  const [mapZoom, setMapZoom] = useState<number>(13);
  const [activeTab, setActiveTab] = useState<"all" | "nearby">("all");
  const [error, setError] = useState<string | null>(null);

  // Determine if we're in a loading state
  const loading = standsLoading || authInitializing;

  // Sync context errors
  useEffect(() => {
    if (standsError) setError(standsError);
    else if (locationError && activeTab === "nearby") setError(locationError);
    else setError(null);
  }, [standsError, locationError, activeTab]);

  // Handle stand click
  const handleStandClick = (stand: any) => {
    setSelectedStand(stand);
    setMapCenter([stand.location_lat, stand.location_lng]);
    setMapZoom(16);
  };

  // Close stand details
  const handleCloseStand = () => {
    setSelectedStand(null);
    if (location) setMapCenter([location.lat, location.lng]);
    else setMapCenter([40.7128, -74.006]);
    setMapZoom(13);
  };

  // Center map on user location if changed significantly
  const handleUserLocationFound = (latlng: { lat: number; lng: number }) => {
    if (!latlng) return;
    
    // Only update map center if:
    // 1. This is the first location update (initial centering)
    // 2. The user has explicitly requested to center on their location
    // 3. The location has changed significantly (more than ~100 meters)
    const isSignificantChange = 
      Math.abs(mapCenter[0] - latlng.lat) > 0.001 || 
      Math.abs(mapCenter[1] - latlng.lng) > 0.001;
      
    // Use a ref to track if this is the first location update
    const isFirstLocationUpdate = !location;
    
    if (isFirstLocationUpdate || isSignificantChange) {
      setMapCenter([latlng.lat, latlng.lng]);
    }
  };

  // Determine which stands to show
  const displayedStands = useMemo(
    () => (activeTab === "nearby" ? nearbyStands : stands),
    [activeTab, nearbyStands, stands]
  );

  // Map rendering block
  const mapComponent = (
    <>
      <Map
        stands={displayedStands}
        center={mapCenter}
        zoom={mapZoom}
        height={mapHeight}
        showUserLocation
        onStandClick={handleStandClick}
        onUserLocationFound={handleUserLocationFound}
        className={loading ? "opacity-60" : ""}
      />
      {loading && (
        <div className="flex justify-center mt-4">
          <Loader
            size="lg"
            variant="yellow"
            showLabel
            label="Loading lemonade stands..."
          />
        </div>
      )}
    </>
  );

  // Sidebar loading fallback
  const SidebarLoadingFallback = () => (
    <div className="flex items-center justify-center h-full">
      <Loader size="md" variant="yellow" showLabel label="Loading..." />
    </div>
  );

  // Memoize stands list
  const memoizedStands = useMemo(() => stands, [stands]);

  // Sidebar with tabs
  const sidebarComponent = (
    <div className="flex flex-col h-full">
      <div className="flex mb-4">
        <Button
          variant={activeTab === "all" ? "primary" : "outline"}
          className="flex-1 rounded-r-none"
          onClick={() => setActiveTab("all")}
        >
          All Stands
        </Button>
        <Button
          variant={activeTab === "nearby" ? "primary" : "outline"}
          className="flex-1 rounded-l-none"
          onClick={() => {
            setActiveTab("nearby");
            if (!location) getLocation();
          }}
        >
          Near You
        </Button>
      </div>
      <div className="flex-grow">
        <Suspense fallback={<SidebarLoadingFallback />}>
          {activeTab === "all" ? (
            <StandListSidebar
              stands={memoizedStands}
              loading={loading}
              selectedStand={selectedStand}
              onStandSelect={handleStandClick}
              onStandClose={handleCloseStand}
              userLocation={location}
              className="h-full"
            />
          ) : (
            <NearbyStandsList
              onStandSelect={handleStandClick}
              className="h-full"
            />
          )}
        </Suspense>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="mb-4 flex-shrink-0">
        <h1 className="text-3xl font-display text-lemonade-blue-dark mb-2">
          Discover Lemonade Stands Near You
        </h1>
        <p className="text-gray-600">
          Browse the map to discover refreshing lemonade stands in your area
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="error"
          className="mb-4 flex-shrink-0"
          dismissible
          onDismiss={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Map & Sidebar Layout */}
      <div className="flex-1 flex">
        <ResponsiveMapLayout
          mapComponent={<div className="h-full w-full">{mapComponent}</div>}
          sidebarComponent={<div className="h-full">{sidebarComponent}</div>}
        />
      </div>
    </div>
  );
};

export default MapPage;
