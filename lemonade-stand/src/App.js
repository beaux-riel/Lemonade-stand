import React, { useState } from 'react';
import ComponentShowcase from './components/ComponentShowcase';
import { MapPage } from './components/map';
import { SellerRegistrationPage } from './components/forms';
import { Button } from './components/ui';
import { MobileNavigation, DesktopNavigation, BottomNavigation } from './components/navigation';
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';
import SupabaseTest from './components/SupabaseTest';
import './styles/tailwind.css';

function App() {
  const [currentView, setCurrentView] = useState('map'); // 'map', 'register', 'showcase', or 'test'
  
  // Navigation items
  const navItems = [
    { id: 'map', label: 'Map View' },
    { id: 'register', label: 'Register Stand' },
    { id: 'showcase', label: 'Component Showcase' },
    { id: 'test', label: 'Supabase Test' }
  ];
  
  return (
    <AuthProvider>
      <StandProvider>
        <GeolocationProvider>
          <NearbyStandsProvider>
            <div className="min-h-screen bg-gray-100">
              <header className="bg-lemonade-yellow shadow-playful py-4 md:py-6 mb-4 md:mb-8 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex items-center justify-between md:block">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        {/* Mobile hamburger menu */}
                        <MobileNavigation 
                          currentView={currentView} 
                          onViewChange={setCurrentView}
                          navItems={navItems}
                        />
                        
                        {/* Logo and title */}
                        <div className="ml-2 md:ml-0">
                          <h1 className="text-2xl md:text-4xl font-display text-gray-800">Lemonade Stand</h1>
                          <p className="text-sm md:text-base text-gray-700 hidden md:block">A platform for managing lemonade stands and their products</p>
                        </div>
                      </div>
                      
                      {/* Desktop navigation */}
                      <DesktopNavigation 
                        currentView={currentView} 
                        onViewChange={setCurrentView}
                        navItems={navItems}
                      />
                    </div>
                  </div>
                </div>
              </header>
              
              <main className="pb-20 md:pb-12 px-4">
                <div className="max-w-6xl mx-auto">
                  {currentView === 'map' && <MapPage />}
                  {currentView === 'register' && <SellerRegistrationPage />}
                  {currentView === 'showcase' && <ComponentShowcase />}
                  {currentView === 'test' && <SupabaseTest />}
                </div>
              </main>
              
              {/* Mobile bottom navigation */}
              <BottomNavigation 
                currentView={currentView} 
                onViewChange={setCurrentView}
              />
            </div>
          </NearbyStandsProvider>
        </GeolocationProvider>
      </StandProvider>
    </AuthProvider>
  );
}

export default App;
