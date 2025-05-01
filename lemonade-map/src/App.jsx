import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Get the base URL from the environment or default to '/'
let BASE_URL = '/';
try {
  // In production/development with Vite
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    BASE_URL = import.meta.env.BASE_URL || '/';
    console.log('Using BASE_URL:', BASE_URL);
  }
} catch (e) {
  // In test environment
  console.error('Error setting BASE_URL:', e);
  BASE_URL = '/';
}
import { AuthProvider } from './contexts/AuthContext';
import { StandProvider } from './contexts/StandContext';
import { GeolocationProvider } from './contexts/GeolocationContext';
import { NearbyStandsProvider } from './contexts/NearbyStandsContext';
import { ProtectedRoute } from './components/auth';
import { MainLayout } from './components/layout';
import { LoadingIndicator } from './components/ui';
import { ErrorBoundary } from './components/error';
import logger from './utils/logger';
import './styles/tailwind.css';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const SellerDashboardPage = lazy(() => import('./pages/SellerDashboardPage'));
const StandDetailPage = lazy(() => import('./pages/StandDetailPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const SellerRegistrationPage = lazy(() => import('./components/forms/SellerRegistrationPage'));
const ComponentShowcase = lazy(() => import('./components/ComponentShowcase'));
const SupabaseTest = lazy(() => import('./components/SupabaseTest'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <LoadingIndicator size="lg" variant="yellow" message="Loading application..." />
  </div>
);

function App() {
  // Log application startup
  logger.info('Application starting', { baseUrl: BASE_URL });
  
  return (
    <ErrorBoundary>
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
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      
                      {/* Protected routes */}
                      <Route path="/profile" element={<ProtectedRoute />}>
                        <Route index element={<ProfilePage />} />
                      </Route>
                      
                      <Route path="/seller" element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<SellerDashboardPage />} />
                        <Route path="stands/new" element={<SellerRegistrationPage />} />
                        <Route path="stands/:id" element={
                          <ErrorBoundary fallback={(error) => (
                            <div className="container mx-auto px-4 py-8">
                              <div className="bg-white rounded-xl shadow-md p-6 mb-4">
                                <h2 className="text-2xl font-display text-lemonade-blue-dark mb-4">
                                  Error Loading Stand
                                </h2>
                                <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-6">
                                  <p className="text-red-700 text-sm font-medium">
                                    {error?.message || 'Something went wrong while loading the stand details.'}
                                  </p>
                                </div>
                                <p className="text-gray-600 mb-6">
                                  Please try again or return to the dashboard.
                                </p>
                                <div className="flex space-x-3">
                                  <Link to="/seller/dashboard">
                                    <Button variant="primary">
                                      Back to Dashboard
                                    </Button>
                                  </Link>
                                  <Button 
                                    variant="secondary"
                                    onClick={() => window.location.reload()}
                                  >
                                    Try Again
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}>
                            <StandDetailPage />
                          </ErrorBoundary>
                        } />
                        <Route path="stands/:standId/products/new" element={<ProductDetailPage />} />
                        <Route path="stands/:standId/products/:productId" element={<ProductDetailPage />} />
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
    </ErrorBoundary>
  );
}

export default App;
