import React, { useState } from 'react';
import ComponentShowcase from './components/ComponentShowcase';
import { MapPage } from './components/map';
import { SellerRegistrationPage } from './components/forms';
import { Button, Loader } from './components/ui';
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';
import SupabaseTest from './components/SupabaseTest';
import './styles/tailwind.css';

function App() {
  const [currentView, setCurrentView] = useState('map'); // 'map', 'register', 'showcase', or 'test'
  
  return (
    <AuthProvider>
      <StandProvider>
        <GeolocationProvider>
          <NearbyStandsProvider>
            <div className="min-h-screen bg-gray-100">
              <header className="bg-lemonade-yellow shadow-playful py-6 mb-8">
                <div className="max-w-6xl mx-auto px-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h1 className="text-4xl font-display text-gray-800">Lemonade Stand</h1>
                      <p className="text-gray-700">A platform for managing lemonade stands and their products</p>
                    </div>
                    <div className="mt-4 md:mt-0 space-x-2">
                      <Button 
                        variant={currentView === 'map' ? 'primary' : 'outline'} 
                        onClick={() => setCurrentView('map')}
                      >
                        Map View
                      </Button>
                      <Button 
                        variant={currentView === 'register' ? 'primary' : 'outline'} 
                        onClick={() => setCurrentView('register')}
                      >
                        Register Stand
                      </Button>
                      <Button 
                        variant={currentView === 'showcase' ? 'primary' : 'outline'} 
                        onClick={() => setCurrentView('showcase')}
                      >
                        Component Showcase
                      </Button>
                      <Button 
                        variant={currentView === 'test' ? 'primary' : 'outline'} 
                        onClick={() => setCurrentView('test')}
                      >
                        Supabase Test
                      </Button>
                    </div>
                  </div>
                </div>
              </header>
              <main className="pb-12">
                {currentView === 'map' && <MapPage />}
                {currentView === 'register' && <SellerRegistrationPage />}
                {currentView === 'showcase' && <ComponentShowcase />}
                {currentView === 'test' && <SupabaseTest />}
              </main>
            </div>
          </NearbyStandsProvider>
        </GeolocationProvider>
      </StandProvider>
    </AuthProvider>
  );
}

export default App;
