import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';

// Get the base URL from the environment or default to '/'
let BASE_URL = '/';
try {
  // In production/development with Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    BASE_URL = import.meta.env.BASE_URL || '/';
  }
} catch (e) {
  // In test environment
  BASE_URL = '/';
}
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';
import { ProtectedRoute } from './components/auth';
import { MainLayout } from './components/layout';
import { Loader } from './components/ui';
import './styles/tailwind.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SellerDashboardPage = lazy(() => import('./pages/SellerDashboardPage'));
const StandDetailPage = lazy(() => import('./pages/StandDetailPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const SellerRegistrationPage = lazy(() => import('./components/forms/SellerRegistrationPage'));
const ComponentShowcase = lazy(() => import('./components/ComponentShowcase'));
const SupabaseTest = lazy(() => import('./components/SupabaseTest'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader size="lg" variant="yellow" showLabel label="Loading..." />
  </div>
);

function App() {
  return (
    <Router basename={BASE_URL}>
      <AuthProvider>
        <StandProvider>
          <GeolocationProvider>
            <NearbyStandsProvider>
              <MainLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/seller/dashboard" element={<SellerDashboardPage />} />
                      <Route path="/seller/stands/new" element={<SellerRegistrationPage />} />
                      <Route path="/seller/stands/:id" element={<StandDetailPage />} />
                      <Route path="/seller/stands/:standId/products/new" element={<ProductDetailPage />} />
                      <Route path="/seller/stands/:standId/products/:productId" element={<ProductDetailPage />} />
                    </Route>
                    
                    {/* Development/testing routes */}
                    <Route path="/showcase" element={<ComponentShowcase />} />
                    <Route path="/test" element={<SupabaseTest />} />
                    
                    {/* 404 route */}
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Routes>
                </Suspense>
              </MainLayout>
            </NearbyStandsProvider>
          </GeolocationProvider>
        </StandProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
