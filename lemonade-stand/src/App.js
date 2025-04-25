import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';
import { ProtectedRoute } from './components/auth';
import { MainLayout } from './components/layout';
import { 
  HomePage, 
  LoginPage, 
  RegisterPage, 
  SellerDashboardPage, 
  NotFoundPage 
} from './pages';
import { SellerRegistrationPage } from './components/forms';
import ComponentShowcase from './components/ComponentShowcase';
import SupabaseTest from './components/SupabaseTest';
import './styles/tailwind.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <StandProvider>
          <GeolocationProvider>
            <NearbyStandsProvider>
              <MainLayout>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  
                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                    <Route path="/seller/stands/new" element={<SellerRegistrationPage />} />
                    <Route path="/seller/stands/:id" element={<div>Stand Detail Page (To be implemented)</div>} />
                  </Route>
                  
                  {/* Development/testing routes */}
                  <Route path="/showcase" element={<ComponentShowcase />} />
                  <Route path="/test" element={<SupabaseTest />} />
                  
                  {/* 404 route */}
                  <Route path="/404" element={<NotFoundPage />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </MainLayout>
            </NearbyStandsProvider>
          </GeolocationProvider>
        </StandProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
